"""ZeroMQ ZMTP 3.0 helpers."""
import struct

CLIENT_GREETING = bytes.fromhex(
    "ff00000000000000017f03004e554c4c"
    "00000000000000000000000000000000"
    "00000000000000000000000000000000"
    "00000000000000000000000000000000"
)


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
            try:
                data = self.sock.recv(4096)
            except TimeoutError:
                return None, None
            if not data:
                return None, None
            self.buf += data


def recv_exact(sock, size: int) -> bytes:
    buf = b""
    while len(buf) < size:
        chunk = sock.recv(size - len(buf))
        if not chunk:
            raise ConnectionError("socket closed during handshake")
        buf += chunk
    return buf


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
    flags, _payload = stream.recv_frame()
    if flags is None:
        raise ConnectionError("no READY from server")
