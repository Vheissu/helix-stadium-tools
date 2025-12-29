#!/usr/bin/env python3
"""Set Helix Stadium scribble-strip label via PropertyValueSet.

Example:
  python3 scripts/set_scribble_label.py --host p35x1.local --stomp a.7 --label "MY LABEL"
"""
import argparse
import socket
import struct


def pad4(data: bytes) -> bytes:
    return data + (b"\x00" * ((4 - (len(data) % 4)) % 4))


def build_osc(address: str, typetags: str, args):
    if not address.startswith("/"):
        raise ValueError("OSC address must start with '/'")
    addr = pad4(address.encode() + b"\x00")
    tt = pad4(("," + typetags).encode() + b"\x00")
    payload = b""
    for t, a in zip(typetags, args):
        if t == "i":
            payload += struct.pack(">i", int(a))
        elif t == "f":
            payload += struct.pack(">f", float(a))
        elif t == "s":
            payload += pad4(str(a).encode() + b"\x00")
        elif t == "b":
            if not isinstance(a, (bytes, bytearray)):
                raise ValueError("blob arg must be bytes")
            payload += struct.pack(">I", len(a))
            payload += a
            payload += b"\x00" * ((4 - (len(a) % 4)) % 4)
        else:
            raise ValueError(f"unsupported typetag: {t}")
    return addr + tt + payload


def build_lenpref(msg: bytes) -> bytes:
    if len(msg) > 0xFFFF:
        raise ValueError("OSC message too large")
    return struct.pack(">H", len(msg)) + msg


def fourcc_int(text: str) -> int:
    if len(text) != 4:
        raise ValueError("fourcc must be 4 chars")
    return int.from_bytes(text.encode(), "big")


def parse_stomp(value: str):
    # Accept forms: a.7, A7, b12
    val = value.strip()
    if "." in val:
        bank, idx = val.split(".", 1)
    else:
        bank = val[0]
        idx = val[1:]
    bank = bank.lower()
    if bank not in ("a", "b", "c", "d"):
        raise ValueError("stomp bank must be a, b, c, or d")
    try:
        index = int(idx)
    except ValueError as exc:
        raise ValueError("stomp index must be an integer") from exc
    return bank, index


def build_property_blob(key: str, value: str, value_type: str = "s") -> bytes:
    try:
        import msgpack  # type: ignore
    except Exception as exc:
        raise SystemExit(f"msgpack is required: {exc}")
    payload = {
        fourcc_int("key_"): key,
        fourcc_int("type"): value_type,
        fourcc_int("val_"): value,
    }
    return b"lavppgsm" + msgpack.packb(payload, use_bin_type=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--host", default="p35x1.local")
    ap.add_argument("--port", type=int, default=2002)
    ap.add_argument("--stomp", help="Stomp identifier like a.7 or A7")
    ap.add_argument("--key", help="Direct property key override (advanced)")
    ap.add_argument("--label", required=True, help="Label text")
    ap.add_argument("--cmd-id", type=int, default=1)
    ap.add_argument("--property-id", type=int, default=0)
    args = ap.parse_args()

    if not args.key and not args.stomp:
        raise SystemExit("must supply --stomp or --key")

    if args.key:
        key = args.key
    else:
        bank, index = parse_stomp(args.stomp)
        key = f"preset.floorboard.stomp.{bank}.{index}.label"

    blob = build_property_blob(key, args.label, "s")

    msg = build_osc("/PropertyValueSet", "iib", [args.cmd_id, args.property_id, blob])
    frame = build_lenpref(msg)

    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.connect((args.host, args.port))
    sock.sendall(frame)
    sock.close()


if __name__ == "__main__":
    main()
