"""Helpers for msgpack property blobs."""
import struct


def fourcc_int(text: str) -> int:
    if len(text) != 4:
        raise ValueError("fourcc must be 4 chars")
    return int.from_bytes(text.encode(), "big")


def fourcc_str(value: int):
    if not isinstance(value, int):
        return None
    try:
        raw = value.to_bytes(4, "big", signed=False)
        if all(32 <= b <= 126 for b in raw):
            return raw.decode()
    except Exception:
        return None
    return None


def decode_msgpack_blob(blob: bytes):
    try:
        import msgpack  # type: ignore
    except Exception:
        return None
    for offset in (0, 4, 8, 12, 16):
        try:
            return msgpack.unpackb(blob[offset:], raw=False, strict_map_key=False)
        except Exception:
            continue
    return None


def normalize_fourcc_map(obj):
    if isinstance(obj, dict):
        out = {}
        for key, val in obj.items():
            new_key = fourcc_str(key) or key
            out[new_key] = normalize_fourcc_map(val)
        return out
    if isinstance(obj, list):
        return [normalize_fourcc_map(v) for v in obj]
    return obj


def decode_property_blob(blob: bytes):
    decoded = decode_msgpack_blob(blob)
    if decoded is None:
        return None
    decoded = normalize_fourcc_map(decoded)
    return decoded


def build_property_blob(key: str, value, value_type: str = "s") -> bytes:
    try:
        import msgpack  # type: ignore
    except Exception as exc:
        raise SystemExit(f"msgpack is required: {exc}")
    payload = {
        fourcc_int("key_"): key,
        fourcc_int("type"): value_type,
        fourcc_int("val_"): value,
    }
    return b"lavppgsm" + msgpack.packb(payload, use_bin_type=True)
