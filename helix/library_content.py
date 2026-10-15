"""Decode the Stadium's flattened preset-library content reply."""


def decode_library_content(blob: bytes):
    """Return content references, or None for an incomplete/invalid reply.

    Unlike a standard MessagePack array, the header counts records, each of
    which is four consecutive values: content ID, type, name, and SKU.
    """
    import msgpack

    if not isinstance(blob, (bytes, bytearray)):
        return None
    try:
        unpacker = msgpack.Unpacker(raw=False, strict_map_key=False)
        unpacker.feed(blob)
        count = unpacker.read_array_header()
        if count > (len(blob) - unpacker.tell()) // 4:
            return None
        entries = []
        for _ in range(count):
            content_id, content_type, name, sku = (unpacker.unpack() for _ in range(4))
            if (type(content_id) is not int or type(content_type) is not int
                    or not isinstance(name, str) or not isinstance(sku, str)):
                return None
            entries.append({"cid_": content_id, "type": content_type, "name": name, "sku": sku})
        return entries if unpacker.tell() == len(blob) else None
    except (ValueError, TypeError, msgpack.OutOfData, msgpack.FormatError, msgpack.StackError):
        return None
