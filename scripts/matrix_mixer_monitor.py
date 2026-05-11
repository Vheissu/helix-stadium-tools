#!/usr/bin/env python3
"""Monitor Helix Stadium Matrix Mixer updates from the device push stream."""

from __future__ import annotations

import argparse
from collections import Counter, defaultdict
import json
import os
import socket
import sys
import time

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from helix.discovery import discover_first_service  # noqa: E402
from helix.matrix_mixer import (  # noqa: E402
    MATRIX_LAYER_LABELS as LAYER_LABELS,
    MATRIX_SYNC_ADDRESSES,
    apply_matrix_mixer_event,
)
from helix.osc import decode_osc_payloads  # noqa: E402
from helix.zmtp import ZMTPStream, zmtp_handshake  # noqa: E402


MATRIX_ADDRESSES = {
    "/syncMatrixMixer",
    "/syncMixerLinkedOutputs",
    *MATRIX_SYNC_ADDRESSES,
}

LED_LABELS = {
    14: '1/4"',
    15: "XLR",
    16: "Phones",
}


def parse_args():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--host", default="auto", help="Device host, or 'auto' for Bonjour discovery.")
    parser.add_argument("--port", type=int, default=2001, help="Device push stream port.")
    parser.add_argument("--duration", type=float, default=60.0, help="Seconds to listen.")
    parser.add_argument("--timeout", type=float, default=0.25, help="Socket poll timeout in seconds.")
    parser.add_argument("--discover-timeout", type=float, default=5.0)
    parser.add_argument("--include-led", action="store_true", help="Also print Matrix output LED selection events.")
    parser.add_argument("--all", action="store_true", help="Print every non-heartbeat event, not just Matrix events.")
    return parser.parse_args()


def resolve_target(host: str, port: int, discover_timeout: float):
    if host.strip().lower() != "auto":
        return host, port
    service = discover_first_service(timeout=discover_timeout)
    resolved_port = service.port if port == 2001 else port
    return service.host, resolved_port


def clean_value(value):
    if isinstance(value, (bytes, bytearray)):
        return f"<blob:{len(value)}>"
    return value


def layer_from_event(address: str, values):
    if address == "/syncMixAttachedOut" and len(values) >= 3:
        return values[2]
    if address.startswith("/syncMixChannel") and len(values) >= 3:
        return values[2]
    return None


def channel_from_event(address: str, values):
    if address.startswith("/syncMixChannel") and len(values) >= 4:
        return values[3]
    return None


def describe_event(address: str, typetags: str, values, elapsed: float):
    cleaned = [clean_value(value) for value in values]
    event = {
        "t": round(elapsed, 3),
        "addr": address,
        "typetags": typetags,
        "vals": cleaned,
    }

    layer = layer_from_event(address, values)
    if isinstance(layer, int):
        event["layer"] = layer
        event["layer_label"] = LAYER_LABELS.get(layer, f"layer {layer}")

    channel = channel_from_event(address, values)
    if isinstance(channel, int):
        event["channel"] = channel

    if address == "/setLED" and len(values) >= 5:
        led_index = values[2]
        if isinstance(led_index, int):
            event["led_index"] = led_index
            event["led_label"] = LED_LABELS.get(led_index, f"LED {led_index}")
        event["led_value"] = values[4]

    return event


def recv_events(stream: ZMTPStream):
    flags, payload = stream.recv_frame()
    if flags is None or not payload:
        return []
    if flags & 0x04 or flags & 0x01:
        return []
    return [event for event in decode_osc_payloads(payload) if event and event[0].startswith("/")]


def main():
    args = parse_args()
    host, port = resolve_target(args.host, args.port, args.discover_timeout)

    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(args.timeout)
    sock.connect((host, port))
    stream = ZMTPStream(sock)
    zmtp_handshake(stream, "SUB", identity=None)
    stream.send_frame(b"\x01")

    print(f"Listening to {host}:{port} for {args.duration:.1f}s")
    print("Change Matrix Mixer controls on the Helix now.")

    counts = Counter()
    layer_counts = defaultdict(Counter)
    channel_counts = defaultdict(Counter)
    matrix_state = None
    heartbeats = 0
    start = time.monotonic()
    deadline = start + max(args.duration, 0.0)

    try:
        while time.monotonic() < deadline:
            for address, typetags, values in recv_events(stream):
                if address == "/heartbeat":
                    heartbeats += 1
                    continue
                should_print = args.all or address in MATRIX_ADDRESSES or (args.include_led and address == "/setLED")
                if not should_print:
                    continue

                elapsed = time.monotonic() - start
                event = describe_event(address, typetags, values, elapsed)
                print(json.dumps(event), flush=True)
                matrix_state = apply_matrix_mixer_event(matrix_state, address, values)

                counts[address] += 1
                layer = event.get("layer")
                channel = event.get("channel")
                if layer is not None:
                    layer_counts[str(layer)][address] += 1
                if layer is not None and channel is not None:
                    channel_counts[f"{layer}:{channel}"][address] += 1
    finally:
        sock.close()

    summary = {
        "done": True,
        "heartbeats": heartbeats,
        "counts": dict(counts),
        "layers": {key: dict(value) for key, value in layer_counts.items()},
        "layer_channels": {key: dict(value) for key, value in channel_counts.items()},
        "matrix_state": matrix_state,
    }
    print(json.dumps(summary))


if __name__ == "__main__":
    main()
