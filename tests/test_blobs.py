import unittest

from helix.blobs import (
    build_property_blob,
    decode_msgpack_blob,
    decode_property_blob,
    fourcc_int,
    fourcc_str,
    normalize_fourcc_map,
)


class TestBlobs(unittest.TestCase):
    def test_fourcc_helpers(self):
        value = fourcc_int("test")
        self.assertEqual(fourcc_str(value), "test")
        self.assertIsNone(fourcc_str("test"))
        self.assertIsNone(fourcc_str(0))
        with self.assertRaises(ValueError):
            fourcc_int("abc")

    def test_decode_msgpack_blob_with_prefix(self):
        try:
            import msgpack  # noqa: F401
        except Exception:
            self.skipTest("msgpack not installed")
        payload = {"foo": "bar", 123: 456}
        blob = b"lavppgsm" + msgpack.packb(payload, use_bin_type=True)
        decoded = decode_msgpack_blob(blob)
        self.assertEqual(decoded, payload)

    def test_decode_msgpack_blob_invalid(self):
        try:
            import msgpack  # noqa: F401
        except Exception:
            self.skipTest("msgpack not installed")
        self.assertIsNone(decode_msgpack_blob(b"not msgpack"))

    def test_normalize_fourcc_map_nested(self):
        data = {fourcc_int("test"): {fourcc_int("key_"): [1, {fourcc_int("val_"): "ok"}]}}
        normalized = normalize_fourcc_map(data)
        self.assertIn("test", normalized)
        self.assertIn("key_", normalized["test"])
        self.assertEqual(normalized["test"]["key_"][1]["val_"], "ok")

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
