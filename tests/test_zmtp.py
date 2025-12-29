import unittest

from helix.zmtp import ZMTPStream, zmtp_ready_payload


class FakeSocket:
    def __init__(self):
        self.data = b""

    def sendall(self, payload: bytes):
        self.data += payload


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


if __name__ == "__main__":
    unittest.main()
