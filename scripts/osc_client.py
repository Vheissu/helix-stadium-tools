#!/usr/bin/env python3
"""Minimal Helix Stadium OSC-over-TCP client.

Default behavior is read-only: connect and print incoming frames.
You can optionally send a single OSC message with a custom header.
"""
import argparse
import socket
import struct
import sys
import time


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
        else:
            raise ValueError(f"unsupported typetag: {t}")
    return addr + tt + payload


def build_frame(msg: bytes, seq: int, version: int = 0x0108) -> bytes:
    if len(msg) > 0xFFFF:
        raise ValueError("OSC message too large")
    header = struct.pack(">H", version)
    header += b"\x00" * 6
    header += struct.pack(">H", seq & 0xFFFF)
    header += struct.pack(">H", len(msg))
    return header + msg


def build_lenpref(msg: bytes) -> bytes:
    if len(msg) > 0xFFFF:
        raise ValueError("OSC message too large")
    return struct.pack(">H", len(msg)) + msg


def decode_osc(msg: bytes):
    addr_end = msg.find(b"\x00")
    if addr_end == -1:
        return None
    addr = msg[:addr_end].decode(errors="replace")
    idx = addr_end + 1
    idx += (4 - (idx % 4)) % 4
    if idx >= len(msg) or msg[idx:idx+1] != b",":
        return addr, None, []
    tt_end = msg.find(b"\x00", idx)
    if tt_end == -1:
        return addr, None, []
    typetags = msg[idx:tt_end].decode(errors="replace")
    idx = tt_end + 1
    idx += (4 - (idx % 4)) % 4
    vals = []
    for ch in typetags[1:]:
        if ch == "i":
            if idx + 4 > len(msg):
                vals.append(None)
                break
            vals.append(struct.unpack(">i", msg[idx:idx+4])[0])
            idx += 4
        elif ch == "f":
            if idx + 4 > len(msg):
                vals.append(None)
                break
            vals.append(struct.unpack(">f", msg[idx:idx+4])[0])
            idx += 4
        elif ch == "s":
            end = msg.find(b"\x00", idx)
            if end == -1:
                vals.append(None)
                break
            vals.append(msg[idx:end].decode(errors="replace"))
            idx = end + 1
            idx += (4 - (idx % 4)) % 4
        elif ch == "b":
            if idx + 4 > len(msg):
                vals.append(None)
                break
            blen = struct.unpack(">I", msg[idx:idx+4])[0]
            idx += 4
            if idx + blen > len(msg):
                vals.append(f"<blob:{blen}?>")
                break
            vals.append(f"<blob:{blen}>")
            idx += blen
            idx += (4 - (idx % 4)) % 4
        else:
            vals.append(("?", ch))
            idx += 4
    return addr, typetags, vals


def recv_frames(sock):
    buf = b""
    while True:
        data = sock.recv(4096)
        if not data:
            break
        buf += data
        while len(buf) >= 12:
            version = struct.unpack(">H", buf[:2])[0]
            seq = struct.unpack(">H", buf[8:10])[0]
            msg_len = struct.unpack(">H", buf[10:12])[0]
            if len(buf) < 12 + msg_len:
                break
            msg = buf[12:12+msg_len]
            yield version, seq, msg_len, msg
            buf = buf[12+msg_len:]


def recv_lenpref(sock):
    buf = b""
    while True:
        data = sock.recv(4096)
        if not data:
            break
        buf += data
        while len(buf) >= 2:
            msg_len = struct.unpack(">H", buf[:2])[0]
            if len(buf) < 2 + msg_len:
                break
            msg = buf[2:2+msg_len]
            yield msg_len, msg
            buf = buf[2+msg_len:]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--host", default="p35x1.local")
    ap.add_argument("--port", type=int, default=2001)
    ap.add_argument("--send", nargs="+", help="Send one OSC message: <addr> <typetags> <args...>")
    ap.add_argument("--send-only", action="store_true", help="Send message and exit without reading")
    ap.add_argument("--seq", type=int, default=1, help="Sequence number for outgoing frame")
    ap.add_argument("--version", type=lambda x: int(x, 0), default=0x0108)
    ap.add_argument("--timeout", type=float, default=5.0)
    ap.add_argument("--mode", choices=["auto", "osc2001", "osc2002"], default="auto")
    args = ap.parse_args()

    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(args.timeout)
    sock.connect((args.host, args.port))
    sock.settimeout(None)

    mode = args.mode
    if mode == "auto":
        mode = "osc2002" if args.port == 2002 else "osc2001"

    if args.send:
        if len(args.send) < 2:
            raise SystemExit("--send requires <addr> <typetags> <args...>")
        addr = args.send[0]
        typetags = args.send[1]
        send_args = args.send[2:]
        if len(send_args) != len(typetags):
            raise SystemExit("arg count must match typetags length")
        msg = build_osc(addr, typetags, send_args)
        if mode == "osc2001":
            frame = build_frame(msg, seq=args.seq, version=args.version)
        else:
            frame = build_lenpref(msg)
        sock.sendall(frame)
        if args.send_only:
            sock.close()
            return

    try:
        if mode == "osc2001":
            for version, seq, msg_len, msg in recv_frames(sock):
                addr, typetags, vals = decode_osc(msg)
                print(f"v{version:#x} seq={seq} len={msg_len:3d} {addr} {typetags} {vals}")
        else:
            for msg_len, msg in recv_lenpref(sock):
                addr, typetags, vals = decode_osc(msg)
                print(f"len={msg_len:3d} {addr} {typetags} {vals}")
    except (ConnectionResetError, BrokenPipeError):
        # Device closed the socket; treat as normal for send-only workflows.
        pass
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
