#!/usr/bin/env python3
"""Probe Helix Stadium for live tuner-related property values and push updates."""

from __future__ import annotations

import argparse
import socket
import time

from helix.blobs import (
    build_property_blob,
    decode_msgpack_blob,
    decode_property_blob,
    normalize_fourcc_map,
)
from helix.osc import build_osc, decode_osc_payloads

from osc_session import ZMTPStream, handshake_messages, zmtp_handshake


DEFAULT_PATTERNS = ["*tuner*", "*note*", "*freq*", "*pitch*"]


def recv_osc_events(stream: ZMTPStream, timeout: float = 1.5):
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            flags, payload = stream.recv_frame()
        except (socket.timeout, TimeoutError):
            continue
        if flags is None:
            return None
        if flags & 0x04:
            continue
        if flags & 0x01:
            continue
        events = [evt for evt in decode_osc_payloads(payload) if evt and evt[0].startswith("/")]
        if events:
            return events
    return []


def drain(stream: ZMTPStream, timeout: float):
    end = time.time() + timeout
    events = []
    while time.time() < end:
        decoded = recv_osc_events(stream, timeout=0.05)
        if decoded:
            events.extend(decoded)
    return events


def request_values(stream: ZMTPStream, next_cmd: int, pattern: str):
    stream.send_frame(build_osc("/MatchingPropertyValuesGet", "is", [next_cmd, pattern]))
    deadline = time.time() + 2.5
    while time.time() < deadline:
        decoded = recv_osc_events(stream, timeout=0.15)
        if not decoded:
            continue
        for evt in decoded:
            addr, _tt, vals = evt
            if addr != "/getMatchingPropertyValues" or not vals or vals[0] != next_cmd:
                continue
            blob = vals[2] if len(vals) > 2 and isinstance(vals[2], (bytes, bytearray)) else None
            payload = normalize_fourcc_map(decode_msgpack_blob(blob)) if blob else {}
            return payload.get("vals", []), next_cmd + 1
    raise TimeoutError(f"Timed out waiting for /getMatchingPropertyValues ({pattern})")


def set_property(stream: ZMTPStream, next_cmd: int, key: str, value: int | float, value_type: str = "i"):
    blob = build_property_blob(key, value, value_type)
    stream.send_frame(build_osc("/PropertyValueSet", "iib", [next_cmd, 0, blob]))
    deadline = time.time() + 2.5
    while time.time() < deadline:
        decoded = recv_osc_events(stream, timeout=0.15)
        if not decoded:
            continue
        for evt in decoded:
            addr, _tt, vals = evt
            if addr in ("/success", "/status") and vals and vals[0] == next_cmd:
                return next_cmd + 1
    raise TimeoutError(f"Timed out waiting for property ack ({key})")


def format_event(evt):
    addr, typetags, vals = evt
    rendered = [val if not isinstance(val, (bytes, bytearray)) else f"<blob:{len(val)}>" for val in vals]
    lines = [f"{addr} {typetags} {rendered}"]
    for val in vals:
        if not isinstance(val, (bytes, bytearray)):
            continue
        prop = decode_property_blob(val)
        if prop:
            prop_key = prop.get("key") or prop.get("key_") or "<unknown>"
            prop_type = prop.get("type") or prop.get("type_") or "?"
            prop_value = prop.get("value")
            if prop_value is None:
                prop_value = prop.get("val_")
            lines.append(f"  property {prop_key} ({prop_type}) = {prop_value}")
            continue
        decoded = decode_msgpack_blob(val)
        if decoded is not None:
            lines.append(f"  blob {normalize_fourcc_map(decoded)}")
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--host", default="p35x1.local")
    parser.add_argument("--port-2001", type=int, default=2001)
    parser.add_argument("--port-2002", type=int, default=2002)
    parser.add_argument("--duration", type=float, default=20.0)
    parser.add_argument(
        "--pattern",
        action="append",
        default=[],
        help="Wildcard pattern passed to /MatchingPropertyValuesGet. May be repeated.",
    )
    parser.add_argument(
        "--set-playview",
        action="store_true",
        help="Temporarily set global.playview.activated=1 while probing, then restore it to 0.",
    )
    args = parser.parse_args()

    sock_2001 = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock_2002 = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock_2001.settimeout(0.25)
    sock_2002.settimeout(0.25)
    sock_2001.connect((args.host, args.port_2001))
    sock_2002.connect((args.host, args.port_2002))

    stream_2001 = ZMTPStream(sock_2001)
    stream_2002 = ZMTPStream(sock_2002)
    zmtp_handshake(stream_2001, "SUB", identity=None)
    stream_2001.send_frame(b"\x01")
    zmtp_handshake(stream_2002, "DEALER", identity=b"")

    msgs, next_cmd = handshake_messages(0)
    for addr, typetags, vals in msgs:
        stream_2002.send_frame(build_osc(addr, typetags, vals))

    drain(stream_2002, 1.0)
    drain(stream_2001, 0.5)

    patterns = args.pattern or DEFAULT_PATTERNS
    print("Initial property scan:")
    for pattern in patterns:
        try:
            values, next_cmd = request_values(stream_2002, next_cmd, pattern)
        except TimeoutError as exc:
            print(f"  {pattern}: {exc}")
            continue
        print(f"  {pattern}: {len(values)} match(es)")
        for item in values:
            print(f"    {item}")

    if args.set_playview:
        print("Enabling play view for probe...")
        next_cmd = set_property(stream_2002, next_cmd, "global.playview.activated", 1, "i")
        drain(stream_2001, 0.5)

    print(f"Listening for {args.duration:.1f}s. Open the tuner and pluck a note now.")
    deadline = time.time() + max(args.duration, 0.0)
    try:
        while time.time() < deadline:
            events = recv_osc_events(stream_2001, timeout=0.25)
            if not events:
                continue
            for evt in events:
                if evt[0] == "/heartbeat":
                    continue
                print(format_event(evt))
    finally:
        if args.set_playview:
            try:
                set_property(stream_2002, next_cmd, "global.playview.activated", 0, "i")
            except TimeoutError:
                pass
        sock_2001.close()
        sock_2002.close()


if __name__ == "__main__":
    main()
