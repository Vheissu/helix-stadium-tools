import unittest

from helix.osc import build_osc, decode_osc


class TestOsc(unittest.TestCase):
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


if __name__ == "__main__":
    unittest.main()
