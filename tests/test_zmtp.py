import unittest

from helix.zmtp import ZMTPStream, recv_exact, zmtp_handshake, zmtp_ready_payload


class FakeSocket:
    def __init__(self):
        self.data = b""

    def sendall(self, payload: bytes):
        self.data += payload


class FakeRecvSocket:
    def __init__(self, chunks):
        self._chunks = list(chunks)
        self.sent = b""

    def recv(self, _size: int):
        if not self._chunks:
            return b""
        return self._chunks.pop(0)

    def sendall(self, payload: bytes):
        self.sent += payload


class TimeoutRecvSocket(FakeRecvSocket):
    def recv(self, _size: int):
        raise TimeoutError()


class NoReadyStream:
    def __init__(self, sock):
        self.sock = sock
        self.sent = []

    def send_frame(self, payload: bytes, flags: int = 0x00):
        self.sent.append((flags, payload))

    def recv_frame(self):
        return None, None


class ReadyStream(NoReadyStream):
    def recv_frame(self):
        return 0x00, b"READY"


class TestZmtp(unittest.TestCase):
    def test_short_frame(self):
        sock = FakeSocket()
        stream = ZMTPStream(sock)
        stream.send_frame(b"abc", flags=0x00)
        self.assertEqual(sock.data, b"\x00\x03abc")

    def test_long_frame(self):
        sock = FakeSocket()
        stream = ZMTPStream(sock)
        payload = b"a" * 300
        stream.send_frame(payload, flags=0x00)
        self.assertEqual(sock.data[0], 0x02)
        size = int.from_bytes(sock.data[1:9], "big")
        self.assertEqual(size, 300)
        self.assertEqual(sock.data[9:], payload)

    def test_ready_payload_contains_socket_type(self):
        payload = zmtp_ready_payload("DEALER", identity=b"")
        self.assertIn(b"Socket-Type", payload)
        self.assertIn(b"DEALER", payload)

    def test_ready_payload_includes_identity(self):
        payload = zmtp_ready_payload("SUB", identity=b"client-1")
        self.assertIn(b"Identity", payload)
        self.assertIn(b"client-1", payload)

    def test_ready_payload_without_identity(self):
        payload = zmtp_ready_payload("SUB", identity=None)
        self.assertNotIn(b"Identity", payload)

    def test_recv_frame_short(self):
        data = b"\x00\x03abc"
        sock = FakeRecvSocket([data[:1], data[1:]])
        stream = ZMTPStream(sock)
        flags, payload = stream.recv_frame()
        self.assertEqual(flags, 0x00)
        self.assertEqual(payload, b"abc")

    def test_recv_frame_long(self):
        payload = b"a" * 300
        frame = bytes([0x02]) + len(payload).to_bytes(8, "big") + payload
        sock = FakeRecvSocket([frame[:10], frame[10:]])
        stream = ZMTPStream(sock)
        flags, received = stream.recv_frame()
        self.assertEqual(flags, 0x02)
        self.assertEqual(received, payload)

    def test_recv_frame_long_header_split(self):
        payload = b"a" * 300
        frame = bytes([0x02]) + len(payload).to_bytes(8, "big") + payload
        sock = FakeRecvSocket([frame[:3], frame[3:15], frame[15:]])
        stream = ZMTPStream(sock)
        flags, received = stream.recv_frame()
        self.assertEqual(flags, 0x02)
        self.assertEqual(received, payload)

    def test_recv_frame_short_payload_split(self):
        frame = b"\x00\x05hello"
        sock = FakeRecvSocket([frame[:3], frame[3:]])
        stream = ZMTPStream(sock)
        flags, payload = stream.recv_frame()
        self.assertEqual(flags, 0x00)
        self.assertEqual(payload, b"hello")

    def test_recv_frame_empty_socket_returns_none(self):
        sock = FakeRecvSocket([])
        stream = ZMTPStream(sock)
        flags, payload = stream.recv_frame()
        self.assertIsNone(flags)
        self.assertIsNone(payload)

    def test_recv_frame_timeout_returns_none(self):
        stream = ZMTPStream(TimeoutRecvSocket([]))
        flags, payload = stream.recv_frame()
        self.assertIsNone(flags)
        self.assertIsNone(payload)

    def test_recv_exact_reads_all_bytes(self):
        sock = FakeRecvSocket([b"ab", b"cd", b"ef"])
        self.assertEqual(recv_exact(sock, 6), b"abcdef")

    def test_recv_exact_raises_on_close(self):
        sock = FakeRecvSocket([b""])
        with self.assertRaises(ConnectionError):
            recv_exact(sock, 1)

    def test_handshake_requires_ready(self):
        greeting = b"x" * 64
        sock = FakeRecvSocket([greeting])
        stream = NoReadyStream(sock)
        with self.assertRaises(ConnectionError):
            zmtp_handshake(stream, "DEALER", identity=b"")

    def test_handshake_succeeds_with_ready(self):
        greeting = b"x" * 64
        sock = FakeRecvSocket([greeting])
        stream = ReadyStream(sock)
        zmtp_handshake(stream, "DEALER", identity=b"")


if __name__ == "__main__":
    unittest.main()
