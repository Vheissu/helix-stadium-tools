import unittest

from helix.blobs import build_property_blob, decode_property_blob


class TestBlobs(unittest.TestCase):
    def test_property_blob_round_trip(self):
        try:
            import msgpack  # noqa: F401
        except Exception:
            self.skipTest("msgpack not installed")
        key = "preset.floorboard.stomp.a.7.label"
        label = "MY LABEL"
        blob = build_property_blob(key, label, "s")
        decoded = decode_property_blob(blob)
        self.assertIsInstance(decoded, dict)
        self.assertEqual(decoded.get("key_"), key)
        self.assertEqual(decoded.get("type"), "s")
        self.assertEqual(decoded.get("val_"), label)


if __name__ == "__main__":
    unittest.main()
