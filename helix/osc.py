"""OSC helpers for Helix Stadium traffic."""
import struct


def pad4(data: bytes) -> bytes:
    return data + (b"\x00" * ((4 - (len(data) % 4)) % 4))


def build_osc(address: str, typetags: str, args):
    if not address.startswith("/"):
        raise ValueError("OSC address must start with '/'")
    addr = pad4(address.encode() + b"\x00")
    tt = pad4(("," + typetags).encode() + b"\x00")
    payload = b""
    for t, a in zip(typetags, args):
        if t == "i":
            payload += struct.pack(">i", int(a))
        elif t == "h":
            payload += struct.pack(">q", int(a))
        elif t == "f":
            payload += struct.pack(">f", float(a))
        elif t == "s":
            payload += pad4(str(a).encode() + b"\x00")
        elif t == "b":
            if not isinstance(a, (bytes, bytearray)):
                raise ValueError("blob arg must be bytes")
            payload += struct.pack(">I", len(a))
            payload += a
            payload += b"\x00" * ((4 - (len(a) % 4)) % 4)
        else:
            raise ValueError(f"unsupported typetag: {t}")
    return addr + tt + payload


def decode_osc(msg: bytes):
    addr_end = msg.find(b"\x00")
    if addr_end == -1:
        return None
    addr = msg[:addr_end].decode(errors="replace")
    idx = addr_end + 1
    idx += (4 - (idx % 4)) % 4

    if idx >= len(msg) or msg[idx:idx+1] != b",":
        return addr, None, []
    tt_end = msg.find(b"\x00", idx)
    if tt_end == -1:
        return addr, None, []
    typetags = msg[idx:tt_end].decode(errors="replace")
    idx = tt_end + 1
    idx += (4 - (idx % 4)) % 4

    vals = []
    for ch in typetags[1:]:
        if ch == "i":
            if idx + 4 > len(msg):
                vals.append(None)
                break
            vals.append(struct.unpack(">i", msg[idx:idx+4])[0])
            idx += 4
        elif ch == "h":
            if idx + 8 > len(msg):
                vals.append(None)
                break
            vals.append(struct.unpack(">q", msg[idx:idx+8])[0])
            idx += 8
        elif ch == "f":
            if idx + 4 > len(msg):
                vals.append(None)
                break
            vals.append(struct.unpack(">f", msg[idx:idx+4])[0])
            idx += 4
        elif ch == "s":
            end = msg.find(b"\x00", idx)
            if end == -1:
                vals.append(None)
                break
            vals.append(msg[idx:end].decode(errors="replace"))
            idx = end + 1
            idx += (4 - (idx % 4)) % 4
        elif ch == "b":
            if idx + 4 > len(msg):
                vals.append(None)
                break
            blen = struct.unpack(">I", msg[idx:idx+4])[0]
            idx += 4
            if idx + blen > len(msg):
                vals.append(f"<blob:{blen}?>")
                break
            vals.append(msg[idx:idx+blen])
            idx += blen
            idx += (4 - (idx % 4)) % 4
        else:
            vals.append(("?", ch))
            idx += 4
    return addr, typetags, vals
