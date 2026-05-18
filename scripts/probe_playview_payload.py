#!/usr/bin/env python3
"""Poll Helix Stadium play view payloads and print decoded diffs."""

from __future__ import annotations

import argparse
import socket
import time

from osc_session import ZMTPStream, handshake_messages, zmtp_handshake

from helix.blobs import (
    build_property_blob,
    decode_msgpack_blob,
    decode_property_blob,
    normalize_fourcc_map,
)
from helix.osc import build_osc, decode_osc_payloads


def recv_events(stream: ZMTPStream, timeout: float = 0.25):
    stream.sock.settimeout(timeout)
    deadline = time.time() + timeout
    events = []
    while time.time() < deadline:
        try:
            flags, payload = stream.recv_frame()
        except TimeoutError:
            continue
        if flags is None:
            break
        if flags & 0x04 or flags & 0x01:
            continue
        events.extend([evt for evt in decode_osc_payloads(payload) if evt and evt[0].startswith("/")])
    return events


def drain(stream: ZMTPStream, timeout: float):
    end = time.time() + timeout
    events = []
    while time.time() < end:
        events.extend(recv_events(stream, timeout=0.03))
    return events


def set_property(stream_2002: ZMTPStream, stream_2001: ZMTPStream, next_cmd: int, key: str, value, value_type: str = "i"):
    blob = build_property_blob(key, value, value_type)
    stream_2002.send_frame(build_osc("/PropertyValueSet", "iib", [next_cmd, 0, blob]))
    deadline = time.time() + 1.0
    while time.time() < deadline:
        for evt in recv_events(stream_2002, timeout=0.05):
            addr, _tt, vals = evt
            if addr in ("/success", "/status") and vals and vals[0] == next_cmd:
                drain(stream_2001, 0.1)
                return next_cmd + 1
    raise TimeoutError(f"Timed out waiting for PropertyValueSet ack ({key})")


def flush_payload(stream_2002: ZMTPStream, stream_2001: ZMTPStream, next_cmd: int):
    stream_2002.send_frame(build_osc("/playviewFlushCache", "i", [next_cmd]))
    deadline = time.time() + 1.0
    response_seen = False
    while time.time() < deadline:
        for evt in recv_events(stream_2002, timeout=0.05):
            if evt[0] == "/playviewFlushCache" and evt[2] and evt[2][1] == next_cmd:
                response_seen = True
        for evt in recv_events(stream_2001, timeout=0.05):
            addr, _tt, vals = evt
            if addr != "/setPropertyValue" or len(vals) < 3 or not isinstance(vals[2], (bytes, bytearray)):
                continue
            prop = decode_property_blob(vals[2])
            if not prop:
                continue
            key = prop.get("key") or prop.get("key_")
            if key != "volatile.payload":
                continue
            raw_value = prop.get("value")
            if raw_value is None:
                raw_value = prop.get("val_")
            decoded = normalize_fourcc_map(decode_msgpack_blob(raw_value)) if isinstance(raw_value, (bytes, bytearray)) else raw_value
            return decoded, next_cmd + 1
        if response_seen:
            continue
    return None, next_cmd + 1


def diff_payload(before: dict, after: dict):
    keys = sorted(set(before) | set(after))
    changes = []
    for key in keys:
        old = before.get(key)
        new = after.get(key)
        if old != new:
            changes.append((key, old, new))
    return changes


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--host", default="p35x1.local")
    parser.add_argument("--duration", type=float, default=15.0)
    parser.add_argument("--interval", type=float, default=0.2)
    parser.add_argument(
        "--activate-playview",
        action="store_true",
        help="Temporarily set global.playview.activated=1 before probing and restore to 0 on exit.",
    )
    args = parser.parse_args()

    sock_2001 = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock_2002 = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock_2001.connect((args.host, 2001))
    sock_2002.connect((args.host, 2002))

    stream_2001 = ZMTPStream(sock_2001)
    stream_2002 = ZMTPStream(sock_2002)
    zmtp_handshake(stream_2001, "SUB", identity=None)
    stream_2001.send_frame(b"\x01")
    zmtp_handshake(stream_2002, "DEALER", identity=b"")

    msgs, next_cmd = handshake_messages(0)
    for addr, typetags, vals in msgs:
        stream_2002.send_frame(build_osc(addr, typetags, vals))

    drain(stream_2001, 0.5)
    drain(stream_2002, 0.5)

    if args.activate_playview:
        next_cmd = set_property(stream_2002, stream_2001, next_cmd, "global.playview.activated", 1, "i")
        stream_2002.send_frame(build_osc("/playviewShow", "i", [next_cmd]))
        next_cmd += 1
        drain(stream_2002, 0.2)
        drain(stream_2001, 0.2)
        stream_2002.send_frame(build_osc("/playviewInvalidateCache", "i", [next_cmd]))
        next_cmd += 1
        drain(stream_2002, 0.2)
        drain(stream_2001, 0.2)

    payload, next_cmd = flush_payload(stream_2002, stream_2001, next_cmd)
    print("Initial playview payload:")
    print(payload)

    last_payload = payload or {}
    deadline = time.time() + max(args.duration, 0.0)
    while time.time() < deadline:
        payload, next_cmd = flush_payload(stream_2002, stream_2001, next_cmd)
        if payload is not None:
            changes = diff_payload(last_payload, payload)
            if changes:
                print(f"\n{time.strftime('%H:%M:%S')} {len(changes)} payload change(s):")
                for key, old, new in changes:
                    print(f"  {key}: {old!r} -> {new!r}")
                last_payload = payload
        time.sleep(max(args.interval, 0.05))

    if args.activate_playview:
        try:
            set_property(stream_2002, stream_2001, next_cmd, "global.playview.activated", 0, "i")
        except TimeoutError:
            pass

    sock_2001.close()
    sock_2002.close()


if __name__ == "__main__":
    main()
