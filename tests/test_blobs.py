import builtins
import unittest
from unittest import mock

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
        self.assertIsNone(fourcc_str(1 << 40))
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

    def test_decode_msgpack_blob_missing_dependency(self):
        def fake_import(name, *args, **kwargs):
            if name == "msgpack":
                raise ImportError("no msgpack")
            return builtins.__import__(name, *args, **kwargs)

        with mock.patch("builtins.__import__", side_effect=fake_import):
            self.assertIsNone(decode_msgpack_blob(b"anything"))

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

    def test_decode_property_blob_none(self):
        with mock.patch("helix.blobs.decode_msgpack_blob", return_value=None):
            self.assertIsNone(decode_property_blob(b"nope"))

    def test_tempo_float_wire_type_and_range(self):
        for key in ("global.tempo.bpm", "preset.tempo.bpm", "server.snapshot.tempo.bpm"):
            for bpm in (20, 120, 120.75, 240):
                blob = build_property_blob(key, bpm, "f")
                self.assertEqual(blob[-5], 0xca)
                decoded = decode_property_blob(blob)
                self.assertEqual(decoded["type"], "f")
                self.assertIsInstance(decoded["val_"], float)
                self.assertEqual(decoded["val_"], bpm)
            with self.assertRaises(ValueError):
                build_property_blob(key, 121, "i")
            for value in (0, 19.99, 240.01, 300, float("nan"), float("inf"), "120", True):
                with self.subTest(key=key, value=value), self.assertRaises(ValueError):
                    build_property_blob(key, value, "f")

    def test_float_properties_reject_nonfinite_and_mismatched_values(self):
        for value in (float("nan"), float("inf"), -float("inf"), 1e40, "1.5", None, True):
            with self.subTest(value=value), self.assertRaises(ValueError):
                build_property_blob("test.float", value, "f")

    def test_build_property_blob_missing_dependency(self):
        def fake_import(name, *args, **kwargs):
            if name == "msgpack":
                raise ImportError("no msgpack")
            return builtins.__import__(name, *args, **kwargs)

        with mock.patch("builtins.__import__", side_effect=fake_import):
            with self.assertRaises(SystemExit):
                build_property_blob("k", "v", "s")


if __name__ == "__main__":
    unittest.main()
