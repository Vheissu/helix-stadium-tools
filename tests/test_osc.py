import unittest

from helix.osc import build_osc, decode_osc, pad4


class TestOsc(unittest.TestCase):
    def test_pad4_alignment(self):
        self.assertEqual(len(pad4(b"abc")), 4)
        self.assertEqual(pad4(b"abcd"), b"abcd")
        self.assertEqual(pad4(b""), b"")

    def test_build_osc_rejects_bad_address(self):
        with self.assertRaises(ValueError):
            build_osc("Foo", "i", [1])

    def test_build_osc_rejects_bad_typetag(self):
        with self.assertRaises(ValueError):
            build_osc("/Foo", "x", [1])

    def test_build_osc_rejects_non_bytes_blob(self):
        with self.assertRaises(ValueError):
            build_osc("/Foo", "b", ["not-bytes"])

    def test_round_trip_basic(self):
        msg = build_osc("/Foo", "ifs", [1, 0.5, "bar"])
        decoded = decode_osc(msg)
        self.assertIsNotNone(decoded)
        addr, typetags, vals = decoded
        self.assertEqual(addr, "/Foo")
        self.assertEqual(typetags, ",ifs")
        self.assertEqual(vals[0], 1)
        self.assertAlmostEqual(vals[1], 0.5, places=6)
        self.assertEqual(vals[2], "bar")

    def test_blob_decode(self):
        msg = build_osc("/Blob", "b", [b"abc"])
        decoded = decode_osc(msg)
        self.assertIsNotNone(decoded)
        _addr, _tt, vals = decoded
        self.assertEqual(vals[0], b"abc")

    def test_decode_osc_requires_null_terminated_address(self):
        self.assertIsNone(decode_osc(b"/Foo"))

    def test_decode_osc_unknown_typetag(self):
        addr = pad4(b"/Foo\x00")
        tags = pad4(b",x\x00")
        payload = b"\x00\x00\x00\x05"
        msg = addr + tags + payload
        decoded = decode_osc(msg)
        self.assertIsNotNone(decoded)
        _addr, _tt, vals = decoded
        self.assertEqual(vals[0], ("?", "x"))

    def test_decode_osc_incomplete_int_payload(self):
        addr = pad4(b"/Foo\x00")
        tags = pad4(b",i\x00")
        msg = addr + tags + b"\x00\x01"
        decoded = decode_osc(msg)
        self.assertIsNotNone(decoded)
        _addr, _tt, vals = decoded
        self.assertIsNone(vals[0])


if __name__ == "__main__":
    unittest.main()
