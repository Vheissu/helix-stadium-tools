#!/usr/bin/env python3
"""Open both Helix Stadium OSC TCP sockets, run the editor handshake, and optionally send a command.

This mirrors the editor's "connection step": it opens port 2001 (device push) and 2002 (editor->device),
runs the observed handshake queries, then keeps both sockets open to receive responses and heartbeats.
"""
import argparse
import socket
import struct
import threading
import time


def pad4(data: bytes) -> bytes:
    return data + (b"\x00" * ((4 - (len(data) % 4)) % 4))


def build_osc(address: str, typetags: str, args):
    if not address.startswith("/"):
        raise ValueError("OSC address must start with '/'")
    addr = pad4(address.encode() + b"\x00")
    tt = pad4(("," + typetags).encode() + b"\x00")
    payload = b""
    for t, a in zip(typetags, args, strict=False):
        if t == "i":
            payload += struct.pack(">i", int(a))
        elif t == "h":
            payload += struct.pack(">q", int(a))
        elif t == "f":
            payload += struct.pack(">f", float(a))
        elif t == "s":
            payload += pad4(str(a).encode() + b"\x00")
        else:
            raise ValueError(f"unsupported typetag: {t}")
    return addr + tt + payload


CLIENT_GREETING = bytes.fromhex(
    "ff00000000000000017f03004e554c4c"
    "00000000000000000000000000000000"
    "00000000000000000000000000000000"
    "00000000000000000000000000000000"
)


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
        elif ch == "h":
            if idx + 8 > len(msg):
                vals.append(None)
                break
            vals.append(struct.unpack(">q", msg[idx:idx+8])[0])
            idx += 8
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
        elif ch == "T":
            vals.append(True)
        elif ch == "F":
            vals.append(False)
        else:
            vals.append(("?", ch))
            idx += 4
    return addr, typetags, vals


def recv_exact(sock, size: int) -> bytes:
    buf = b""
    while len(buf) < size:
        chunk = sock.recv(size - len(buf))
        if not chunk:
            raise ConnectionError("socket closed during handshake")
        buf += chunk
    return buf


class ZMTPStream:
    def __init__(self, sock):
        self.sock = sock
        self.buf = b""

    def send_frame(self, payload: bytes, flags: int = 0x00):
        if len(payload) < 256:
            frame = bytes([flags, len(payload)]) + payload
        else:
            frame = bytes([flags | 0x02]) + struct.pack(">Q", len(payload)) + payload
        self.sock.sendall(frame)

    def recv_frame(self):
        while True:
            if len(self.buf) >= 2:
                flags = self.buf[0]
                if flags & 0x02:
                    if len(self.buf) < 9:
                        pass
                    else:
                        size = int.from_bytes(self.buf[1:9], "big")
                        off = 9
                        if len(self.buf) >= off + size:
                            payload = self.buf[off:off+size]
                            self.buf = self.buf[off+size:]
                            return flags, payload
                else:
                    size = self.buf[1]
                    off = 2
                    if len(self.buf) >= off + size:
                        payload = self.buf[off:off+size]
                        self.buf = self.buf[off+size:]
                        return flags, payload
            data = self.sock.recv(4096)
            if not data:
                return None, None
            self.buf += data


def zmtp_ready_payload(socket_type: str, identity: bytes | None):
    payload = bytes([len("READY")]) + b"READY"
    payload += bytes([len("Socket-Type")]) + b"Socket-Type"
    payload += struct.pack(">I", len(socket_type)) + socket_type.encode()
    if identity is not None:
        payload += bytes([len("Identity")]) + b"Identity"
        payload += struct.pack(">I", len(identity)) + identity
    return payload


def zmtp_handshake(stream: ZMTPStream, socket_type: str, identity: bytes | None):
    stream.sock.sendall(CLIENT_GREETING)
    _ = recv_exact(stream.sock, 64)
    ready = zmtp_ready_payload(socket_type, identity)
    stream.send_frame(ready, flags=0x04)
    # Read server READY command frame (ignore payload)
    flags, _payload = stream.recv_frame()
    if flags is None:
        raise ConnectionError("no READY from server")


def handshake_messages(cmd_id_start: int):
    msgs = []
    cmd_id = cmd_id_start

    def add(addr, typetags, *args):
        nonlocal cmd_id
        msgs.append((addr, typetags, [cmd_id, *args]))
        cmd_id += 1

    add("/ProductInfoGet", "i")
    add("/EditBufferStateGet", "i")
    add("/PropertyValueGet", "is", "globals.eq")
    add("/PropertyValueGet", "is", "global.tempo.select")
    add("/PropertyValueGet", "is", "global.remote.pin")
    add("/PropertyValueGet", "is", "global.tempo.bpm")
    add("/PropertyValueGet", "is", "global.remote.pin")
    add("/PropertyValueGet", "is", "global.modelselect.addcabblock")
    add("/PropertyValueGet", "is", "global.numbering.presets")
    add("/PropertyValueGet", "is", "global.numbering.setlists")
    add("/PropertyValueGet", "is", "global.out.usb.12")
    add("/PropertyValueGet", "is", "global.remote.access")
    add("/PropertyValueGet", "is", "global.remote.pin")
    add("/PropertyValueGet", "is", "global.snapshot.edits")
    add("/GetContentRef", "ii", -1)
    add("/PropertyValueGet", "is", "global.remote.access")
    add("/GetContainerContents", "ii", -1)
    add("/GetContentRef", "ii", -2)
    add("/GetContainerContents", "ii", -2)
    add("/GetContentRef", "ii", -5)
    add("/GetContainerContents", "ii", -5)
    add("/GetContainerContents", "ii", 239)
    add("/GetContainerContents", "ii", 295)
    add("/GetContainerContents", "ii", 344)
    add("/GetContentRef", "ii", -8)
    add("/GetContainerContents", "ii", -8)
    add("/GetContainerContents", "ii", 292)
    add("/GetContentRef", "ii", -12)
    add("/GetContainerContents", "ii", -12)
    add("/GetContentRef", "ii", -3)
    add("/GetContainerContents", "ii", -3)
    add("/GetContentRef", "ii", -6)
    add("/GetContainerContents", "ii", -6)
    add("/GetContentRef", "ii", -7)
    add("/GetContainerContents", "ii", -7)
    add("/GetContentRef", "ii", -11)
    add("/GetContainerContents", "ii", -11)
    add("/PropertyValueGet", "is", "server.active.preset.id")
    return msgs, cmd_id


class Reader(threading.Thread):
    def __init__(self, stream, label, heartbeat_event=None, show_topic=False):
        super().__init__(daemon=True)
        self.stream = stream
        self.label = label
        self.heartbeat_event = heartbeat_event
        self.show_topic = show_topic
        self.stopped = threading.Event()

    def run(self):
        try:
            pending = None
            while True:
                flags, payload = self.stream.recv_frame()
                if flags is None:
                    break
                if flags & 0x04:
                    # ZMTP command frame; ignore in steady-state.
                    continue
                if flags & 0x01:
                    pending = payload
                    continue
                msg = payload
                parsed = decode_osc(msg)
                if parsed is None:
                    continue
                addr, typetags, vals = parsed
                if not addr.startswith("/"):
                    continue
                if pending is not None and self.show_topic:
                    topic = pending.hex()
                    pending = None
                    print(f"{self.label} topic={topic} {addr} {typetags} {vals}")
                else:
                    pending = None
                    print(f"{self.label} {addr} {typetags} {vals}")
                if self.heartbeat_event and addr == "/heartbeat":
                    self.heartbeat_event.set()
        except Exception:
            pass
        finally:
            self.stopped.set()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--host", default="p35x1.local")
    ap.add_argument("--port-2001", type=int, default=2001)
    ap.add_argument("--port-2002", type=int, default=2002)
    ap.add_argument("--cmd-base", type=int, default=0, help="Starting command id")
    ap.add_argument("--no-handshake", action="store_true", help="Skip handshake queries")
    ap.add_argument("--wait-heartbeat", action="store_true", help="Wait for heartbeat before sending command")
    ap.add_argument("--snapshot", nargs=2, metavar=("INDEX", "NAME"), help="Send /SetSnapshotName")
    ap.add_argument("--duration", type=float, default=8.0, help="Seconds to wait after sending")
    args = ap.parse_args()

    sock_2001 = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock_2002 = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock_2001.connect((args.host, args.port_2001))
    sock_2002.connect((args.host, args.port_2002))

    stream_2001 = ZMTPStream(sock_2001)
    stream_2002 = ZMTPStream(sock_2002)

    # ZMTP handshakes (observed: SUB on 2001, DEALER on 2002)
    zmtp_handshake(stream_2001, "SUB", identity=None)
    stream_2001.send_frame(b"\x01")  # SUBSCRIBE to all topics
    zmtp_handshake(stream_2002, "DEALER", identity=b"")

    heartbeat_event = threading.Event()
    reader_2001 = Reader(stream_2001, "2001>", heartbeat_event=heartbeat_event, show_topic=True)
    reader_2002 = Reader(stream_2002, "2002>", show_topic=False)
    reader_2001.start()
    reader_2002.start()

    next_cmd = args.cmd_base
    if not args.no_handshake:
        msgs, next_cmd = handshake_messages(next_cmd)
        for addr, typetags, vals in msgs:
            msg = build_osc(addr, typetags, vals)
            stream_2002.send_frame(msg)

    if args.wait_heartbeat:
        heartbeat_event.wait(timeout=10.0)

    if args.snapshot:
        snap_idx = int(args.snapshot[0])
        snap_name = args.snapshot[1]
        msg = build_osc("/SetSnapshotName", "iis", [next_cmd, snap_idx, snap_name])
        stream_2002.send_frame(msg)
        next_cmd += 1

    time.sleep(args.duration)
    sock_2001.close()
    sock_2002.close()


if __name__ == "__main__":
    main()
