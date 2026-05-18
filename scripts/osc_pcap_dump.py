#!/usr/bin/env python3
"""Parse Helix Stadium OSC-over-TCP frames from a pcap/pcapng capture.

Usage:
  python3 scripts/osc_pcap_dump.py /tmp/helix-stadium.pcap
"""
import argparse
import json
import os
import socket
import struct
import sys
from datetime import datetime

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from helix.blobs import decode_property_blob  # noqa: E402
from scripts.generate_helix_model_json import (
    resolve_default_modeldefs_path,  # noqa: E402
)

DEFAULT_PCAP = "/tmp/helix-stadium.pcap"
DEFAULT_PORTS = "2001,2002"
DEFAULT_MODEL_UIDEFS = "/Applications/Line6/Helix Stadium.app/Contents/Resources/P35ModelUIDefs.json"
DEFAULT_BLOCK_MAP = None
DEFAULT_MODELDEFS = resolve_default_modeldefs_path()
ZMTP_GREETING_LEN = 64
PCAPNG_BLOCK_SHB = 0x0A0D0D0A
PCAPNG_BLOCK_IDB = 0x00000001
PCAPNG_BLOCK_SPB = 0x00000003
PCAPNG_BLOCK_EPB = 0x00000006


class PrefixedReader:
    def __init__(self, prefix: bytes, fh):
        self._prefix = prefix
        self._fh = fh

    def read(self, size: int = -1) -> bytes:
        if not self._prefix:
            return self._fh.read(size)
        if size == -1:
            data = self._prefix + self._fh.read()
            self._prefix = b""
            return data
        if size <= len(self._prefix):
            data = self._prefix[:size]
            self._prefix = self._prefix[size:]
            return data
        data = self._prefix
        self._prefix = b""
        rest = self._fh.read(size - len(data))
        return data + rest


def parse_pcap(path):
    if path == "-":
        fh = sys.stdin.buffer
    else:
        fh = open(path, "rb")
    with fh:
        prefix = fh.read(4)
        if not prefix:
            return
        reader = PrefixedReader(prefix, fh)
        if prefix == b"\x0a\x0d\x0d\x0a":
            yield from parse_pcapng_stream(reader)
        else:
            yield from parse_pcap_stream(reader)


def parse_pcap_stream(f):
    gh = f.read(24)
    if len(gh) < 24:
        raise SystemExit("bad pcap: too short")
    magic = gh[:4]
    if magic == b"\xd4\xc3\xb2\xa1":
        endian = "<"
    elif magic == b"\xa1\xb2\xc3\xd4":
        endian = ">"
    elif magic == b"\x4d\x3c\xb2\xa1":
        endian = "<"
    elif magic == b"\xa1\xb2\x3c\x4d":
        endian = ">"
    else:
        raise SystemExit(f"unknown pcap magic {magic!r}")
    linktype = struct.unpack(endian + "I", gh[20:24])[0]
    while True:
        hdr = f.read(16)
        if not hdr:
            break
        if len(hdr) < 16:
            break
        ts_sec, ts_usec, incl_len, _orig_len = struct.unpack(endian + "IIII", hdr)
        data = f.read(incl_len)
        if len(data) < incl_len:
            break
        ts = ts_sec + ts_usec / 1e6
        yield ts, data, linktype


def parse_pcapng_stream(f):
    endian = "<"
    seq_ts = 0
    linktypes = []
    while True:
        hdr = f.read(8)
        if not hdr:
            break
        if len(hdr) < 8:
            break
        bt_le, bl_le = struct.unpack("<II", hdr)
        bt_be, bl_be = struct.unpack(">II", hdr)
        if bt_le == PCAPNG_BLOCK_SHB or bt_be == PCAPNG_BLOCK_SHB:
            block_len = bl_le if bt_le == PCAPNG_BLOCK_SHB else bl_be
            if block_len < 12:
                break
            body = f.read(block_len - 8)
            if len(body) < block_len - 8:
                break
            bom = body[:4]
            if bom == b"\x4d\x3c\x2b\x1a":
                endian = "<"
            elif bom == b"\x1a\x2b\x3c\x4d":
                endian = ">"
            continue

        if endian == "<":
            block_type, block_len = bt_le, bl_le
        else:
            block_type, block_len = bt_be, bl_be

        if block_len < 12:
            break
        body = f.read(block_len - 8)
        if len(body) < block_len - 8:
            break

        if block_type == PCAPNG_BLOCK_EPB:
            if len(body) < 20:
                continue
            if_id, ts_high, ts_low, cap_len, _orig_len = struct.unpack(
                endian + "IIIII", body[:20]
            )
            pkt = body[20:20 + cap_len]
            linktype = linktypes[if_id] if if_id < len(linktypes) else None
            yield seq_ts, pkt, linktype
            seq_ts += 1
        elif block_type == PCAPNG_BLOCK_SPB:
            if len(body) < 4:
                continue
            orig_len = struct.unpack(endian + "I", body[:4])[0]
            cap_len = min(orig_len, block_len - 16)
            pkt = body[4:4 + cap_len]
            linktype = linktypes[0] if linktypes else None
            yield seq_ts, pkt, linktype
            seq_ts += 1
        elif block_type == PCAPNG_BLOCK_IDB:
            if len(body) < 8:
                continue
            linktype = struct.unpack(endian + "H", body[:2])[0]
            linktypes.append(linktype)
        else:
            continue


def parse_eth_ip_tcp(pkt, linktype=None):
    if linktype in (0, 108):
        if len(pkt) < 4:
            return None
        ip = pkt[4:]
        return parse_ip_tcp(ip)
    if linktype == 101:
        return parse_ip_tcp(pkt)
    if len(pkt) < 14:
        return None
    eth_type = struct.unpack("!H", pkt[12:14])[0]
    if eth_type != 0x0800:
        return None
    ip = pkt[14:]
    return parse_ip_tcp(ip)


def parse_ip_tcp(ip):
    if len(ip) < 20:
        return None
    ihl = (ip[0] & 0x0F) * 4
    if len(ip) < ihl:
        return None
    if ip[9] != 6:
        return None
    src = socket.inet_ntoa(ip[12:16])
    dst = socket.inet_ntoa(ip[16:20])
    tcp = ip[ihl:]
    if len(tcp) < 20:
        return None
    sport, dport, seq, _ack, off_flags = struct.unpack("!HHIIH", tcp[:14])
    data_offset = (off_flags >> 12) * 4
    if len(tcp) < data_offset:
        return None
    payload = tcp[data_offset:]
    return src, dst, sport, dport, seq, payload


def reassemble_stream(segments):
    # segments: list of (seq, payload, ts)
    if not segments:
        return []
    segments.sort(key=lambda x: x[0])
    out = []
    buf = b""
    expected = None
    ts = None
    for seq, payload, seg_ts in segments:
        if not payload:
            continue
        if expected is None:
            expected = seq + len(payload)
            buf += payload
            ts = seg_ts
            continue
        if seq < expected:
            overlap = expected - seq
            if overlap >= len(payload):
                continue
            payload = payload[overlap:]
        elif seq > expected:
            # Gap in stream: flush current buffer as a chunk.
            if buf:
                out.append((ts or seg_ts, buf))
            buf = b""
        buf += payload
        expected = seq + len(payload)
        ts = seg_ts
    if buf:
        out.append((ts, buf))
    return out


def looks_like_zmtp_greeting(payload):
    return (
        len(payload) >= ZMTP_GREETING_LEN
        and payload[0] == 0xFF
        and payload[9] == 0x7F
    )


def parse_zmtp_frames(payload, resync=False):
    frames = []
    off = 0
    if looks_like_zmtp_greeting(payload):
        off = ZMTP_GREETING_LEN
    while off + 2 <= len(payload):
        flags = payload[off]
        off += 1
        if flags & 0x02:
            if off + 8 > len(payload):
                if resync:
                    off += 1
                    continue
                break
            size = int.from_bytes(payload[off:off+8], "big")
            off += 8
        else:
            size = payload[off]
            off += 1
        if off + size > len(payload):
            if resync:
                off += 1
                continue
            break
        frame = payload[off:off+size]
        off += size
        frames.append((flags, frame))
    return frames


def format_topic(topic):
    if topic is None:
        return None
    try:
        text = topic.decode("utf-8")
        if text and all(32 <= ord(ch) <= 126 for ch in text):
            return text
    except Exception:
        pass
    return topic.hex()


def decode_osc(msg):
    # address
    addr_end = msg.find(b"\x00")
    if addr_end == -1:
        return None
    addr = msg[:addr_end].decode(errors="replace")
    idx = addr_end + 1
    idx += (4 - (idx % 4)) % 4

    # typetags
    if idx >= len(msg) or msg[idx:idx+1] != b",":
        return addr, None, []
    tt_end = msg.find(b"\x00", idx)
    if tt_end == -1:
        return addr, None, []
    typetags = msg[idx:tt_end].decode(errors="replace")
    idx = tt_end + 1
    idx += (4 - (idx % 4)) % 4

    # args
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


def parse_frames(payload, resync=False):
    frames = []
    off = 0
    if not resync:
        while off + 12 <= len(payload):
            header = payload[off:off+12]
            version = struct.unpack(">H", header[:2])[0]
            seq = struct.unpack(">H", header[8:10])[0]
            msg_len = struct.unpack(">H", header[10:12])[0]
            if off + 12 + msg_len > len(payload):
                break
            msg = payload[off+12:off+12+msg_len]
            frames.append((version, seq, msg_len, msg))
            off += 12 + msg_len
        return frames

    while off + 12 <= len(payload):
        header = payload[off:off+12]
        version = struct.unpack(">H", header[:2])[0]
        if version != 0x0108:
            off += 1
            continue
        msg_len = struct.unpack(">H", header[10:12])[0]
        if msg_len == 0 or off + 12 + msg_len > len(payload):
            off += 1
            continue
        msg = payload[off+12:off+12+msg_len]
        if not msg or msg[:1] != b"/":
            off += 1
            continue
        seq = struct.unpack(">H", header[8:10])[0]
        frames.append((version, seq, msg_len, msg))
        off += 12 + msg_len
    return frames


def parse_lenpref_frames(payload, resync=False):
    frames = []
    off = 0
    if not resync:
        while off + 2 <= len(payload):
            msg_len = struct.unpack(">H", payload[off:off+2])[0]
            off += 2
            if off + msg_len > len(payload):
                break
            msg = payload[off:off+msg_len]
            frames.append((msg_len, msg))
            off += msg_len
        return frames

    while off + 2 <= len(payload):
        msg_len = struct.unpack(">H", payload[off:off+2])[0]
        if msg_len == 0 or off + 2 + msg_len > len(payload):
            off += 1
            continue
        msg = payload[off+2:off+2+msg_len]
        if not msg or msg[:1] != b"/":
            off += 1
            continue
        frames.append((msg_len, msg))
        off += 2 + msg_len
    return frames


def load_model_params(model_key, model_file):
    if not model_key:
        return None, None
    if not os.path.exists(model_file):
        print(f"warn: model defs not found: {model_file}", file=sys.stderr)
        return None, None
    with open(model_file, encoding="utf-8") as f:
        data = json.load(f)
    # Direct key match
    if model_key in data:
        params = data[model_key].get("params", [])
        return model_key, params
    # Fuzzy name match against 'name'
    needle = model_key.lower()
    matches = []
    for key, val in data.items():
        name = str(val.get("name", "")).lower()
        if needle == name or needle in name:
            matches.append(key)
    if len(matches) == 1:
        key = matches[0]
        params = data[key].get("params", [])
        return key, params
    if matches:
        print(f"warn: model '{model_key}' matched multiple keys: {', '.join(matches)}", file=sys.stderr)
    else:
        print(f"warn: model '{model_key}' not found in {model_file}", file=sys.stderr)
    return None, None


def param_name(params, idx):
    if params is None:
        return None
    if 0 <= idx < len(params):
        return params[idx].get("id") or params[idx].get("name")
    return None


def load_block_map(path, model_file):
    if not path:
        return {}
    if not os.path.exists(path):
        print(f"warn: block map not found: {path}", file=sys.stderr)
        return {}
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    out = {}
    for key, val in data.items():
        if isinstance(val, str):
            model_key = val
            offset = 0
        elif isinstance(val, dict):
            model_key = val.get("model")
            offset = int(val.get("offset", 0))
        else:
            continue
        resolved_key, params = load_model_params(model_key, model_file)
        if params is None:
            continue
        out[key] = {"model": resolved_key, "params": params, "offset": offset}
    return out


def load_modeldefs_map(path):
    if not path:
        return {}
    if not os.path.exists(path):
        print(f"warn: modeldefs not found: {path}", file=sys.stderr)
        return {}
    try:
        import msgpack  # type: ignore
    except Exception as exc:
        print(f"warn: msgpack not available: {exc}", file=sys.stderr)
        return {}
    with open(path, "rb") as f:
        unpacker = msgpack.Unpacker(f, raw=False)
        last = None
        for obj in unpacker:
            last = obj
    if not isinstance(last, dict):
        print("warn: modeldefs did not yield a dict", file=sys.stderr)
        return {}
    mid_map = {}
    for key, val in last.items():
        if not isinstance(val, dict):
            continue
        mid = val.get("id")
        if not isinstance(mid, int):
            continue
        params = val.get("params", {})
        param_id_to_name = {}
        if isinstance(params, dict):
            for pname, pinfo in params.items():
                if isinstance(pinfo, dict) and "id" in pinfo:
                    pid = pinfo.get("id")
                    if isinstance(pid, int):
                        param_id_to_name[pid] = pname
        mid_map[mid] = {"key": key, "params_by_id": param_id_to_name}
    return mid_map


def format_vals(vals):
    out = []
    for val in vals:
        if isinstance(val, (bytes, bytearray)):
            out.append(f"<blob:{len(val)}>")
        else:
            out.append(val)
    return out


def render_row(
    ts,
    src,
    dst,
    sport,
    dport,
    proto,
    version,
    seq,
    msg_len,
    addr,
    typetags,
    vals,
    topic,
    args,
    params,
    block_map,
    block_models,
    mid_map,
):
    ts_s = datetime.fromtimestamp(ts).strftime("%H:%M:%S.%f")[:-3]
    dir_s = f"{src}:{sport} -> {dst}:{dport}"
    suffix = ""
    prop_detail = ""
    if args.decode_properties and addr in ("/PropertyValueSet", "/setPropertyValue") and vals:
        blob = vals[-1]
        if isinstance(blob, (bytes, bytearray)):
            decoded = decode_property_blob(blob)
            if decoded is not None:
                prop_detail = f" prop={decoded}"
    # Update dynamic block model map from /ModelSet or /setModelWithMID
    if addr in ("/ModelSet", "/setModelWithMID") and vals:
        try:
            if addr == "/ModelSet":
                path = int(vals[1])
                block = int(vals[2])
                mid = int(vals[4])
            else:
                path = int(vals[2])
                block = int(vals[3])
                mid = int(vals[5])
            key = f"{path}/{block}"
            if mid in mid_map:
                block_models[key] = mid_map[mid]
        except Exception:
            pass
    if addr in ("/ModelSet", "/setModelWithMID") and vals:
        try:
            if addr == "/ModelSet":
                path = int(vals[1])
                block = int(vals[2])
                mid = int(vals[4])
            else:
                path = int(vals[2])
                block = int(vals[3])
                mid = int(vals[5])
            key = f"{path}/{block}"
            model_key = mid_map.get(mid, {}).get("key")
            if model_key:
                suffix = f" block={key} model={model_key} mid={mid}"
            else:
                suffix = f" block={key} mid={mid}"
        except Exception:
            pass
    if addr in ("/setParamValue", "/ParamValueSet") and vals:
        try:
            if addr == "/setParamValue":
                path = int(vals[2])
                block = int(vals[3])
                pidx = int(vals[5])
            else:
                path = int(vals[1])
                block = int(vals[2])
                pidx = int(vals[4])
            key = f"{path}/{block}"
            if key in block_map:
                info = block_map[key]
                ui_idx = pidx - info["offset"]
                pname = param_name(info["params"], ui_idx)
                if pname:
                    suffix = f" block={key} model={info['model']} param[{ui_idx}]={pname}"
                else:
                    suffix = f" block={key} model={info['model']} param_idx={pidx}"
            elif key in block_models:
                info = block_models[key]
                pname = info.get("params_by_id", {}).get(pidx)
                if pname:
                    suffix = f" block={key} model={info['key']} param_id={pidx} param={pname}"
                else:
                    suffix = f" block={key} model={info['key']} param_id={pidx}"
            elif params:
                pname = param_name(params, pidx)
                if pname:
                    suffix = f" param[{pidx}]={pname}"
        except Exception:
            pass
    elif addr in ("/setBlockEnable", "/BlockEnableSet") and vals:
        try:
            if addr == "/setBlockEnable":
                path = int(vals[2])
                block = int(vals[3])
            else:
                path = int(vals[1])
                block = int(vals[2])
            key = f"{path}/{block}"
            if key in block_map:
                info = block_map[key]
                suffix = f" block={key} model={info['model']}"
            elif key in block_models:
                info = block_models[key]
                suffix = f" block={key} model={info['key']}"
        except Exception:
            pass
    topic_s = ""
    if args.show_topics and topic is not None:
        topic_s = f" topic={format_topic(topic)}"
    vals_out = format_vals(vals)
    if proto == "osc2001":
        if version is None:
            print(f"{ts_s} {proto} len={msg_len:3d} {dir_s}{topic_s} {addr} {typetags} {vals_out}{suffix}{prop_detail}")
        else:
            print(f"{ts_s} {proto} v{version:#x} seq={seq} len={msg_len:3d} {dir_s}{topic_s} {addr} {typetags} {vals_out}{suffix}{prop_detail}")
    else:
        print(f"{ts_s} {proto} len={msg_len:3d} {dir_s} {addr} {typetags} {vals_out}{suffix}{prop_detail}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("pcap", nargs="?", default=DEFAULT_PCAP)
    ap.add_argument("--ports", default=DEFAULT_PORTS, help="Comma-separated ports to decode (default: 2001,2002)")
    ap.add_argument("--model", help="Model key or name from P35ModelUIDefs.json")
    ap.add_argument("--model-file", default=DEFAULT_MODEL_UIDEFS, help="Path to P35ModelUIDefs.json")
    ap.add_argument("--modeldefs", default=DEFAULT_MODELDEFS, help="Path to modeldefs msgpack (.bin) for MID->model mapping")
    ap.add_argument("--block-map", default=DEFAULT_BLOCK_MAP, help="JSON map of path/block -> {model, offset}")
    ap.add_argument("--reassemble", action="store_true", help="Reassemble TCP streams before decoding")
    ap.add_argument("--show-topics", action="store_true", help="Show ZMTP topic frames (port 2001)")
    ap.add_argument("--decode-properties", action="store_true", help="Decode PropertyValueSet blobs when possible")
    args = ap.parse_args()

    pcap = args.pcap
    ports = {int(p.strip()) for p in args.ports.split(",") if p.strip()}
    model_key, params = load_model_params(args.model, args.model_file)
    block_map = load_block_map(args.block_map, args.model_file)
    mid_map = load_modeldefs_map(args.modeldefs)
    block_models = {}
    rows = []
    streaming = args.pcap == "-"
    if streaming and args.reassemble:
        print("note: --reassemble with stdin prints only after Ctrl-C", file=sys.stderr)
    try:
        if args.reassemble:
            flows = {}
            try:
                for ts, pkt, linktype in parse_pcap(pcap):
                    parsed = parse_eth_ip_tcp(pkt, linktype)
                    if not parsed:
                        continue
                    src, dst, sport, dport, seq, payload = parsed
                    if sport not in ports and dport not in ports:
                        continue
                    key = (src, dst, sport, dport)
                    flows.setdefault(key, []).append((seq, payload, ts))
            except KeyboardInterrupt:
                pass
            for (src, dst, sport, dport), segments in flows.items():
                port = sport if sport in ports else dport
                for ts, payload in reassemble_stream(segments):
                    if not payload:
                        continue
                    pending_topic = None
                    for flags, frame in parse_zmtp_frames(payload, resync=True):
                        if flags & 0x04:
                            # ZMTP command frame (READY/HELLO/etc.)
                            continue
                        if flags & 0x01:
                            # Multipart/topic frame; capture and apply to next data frame.
                            pending_topic = frame
                            continue
                        if port == 2001:
                            parsed = False
                            for version, seq, msg_len, msg in parse_frames(frame, resync=True):
                                decoded = decode_osc(msg)
                                if not decoded:
                                    continue
                                addr, typetags, vals = decoded
                                row = (ts, src, dst, sport, dport, "osc2001", version, seq, msg_len, addr, typetags, vals, pending_topic)
                                if streaming:
                                    render_row(*row, args, params, block_map, block_models, mid_map)
                                else:
                                    rows.append(row)
                                parsed = True
                            if not parsed:
                                # Some device frames arrive as raw OSC without the 12-byte header.
                                decoded = decode_osc(frame)
                                if decoded:
                                    addr, typetags, vals = decoded
                                    row = (ts, src, dst, sport, dport, "osc2001", None, None, len(frame), addr, typetags, vals, pending_topic)
                                    if streaming:
                                        render_row(*row, args, params, block_map, block_models, mid_map)
                                    else:
                                        rows.append(row)
                        elif port == 2002:
                            decoded = decode_osc(frame)
                            if not decoded:
                                continue
                            addr, typetags, vals = decoded
                            row = (ts, src, dst, sport, dport, "osc2002", None, None, len(frame), addr, typetags, vals, None)
                            if streaming:
                                render_row(*row, args, params, block_map, block_models, mid_map)
                            else:
                                rows.append(row)
                        pending_topic = None
        else:
            try:
                for ts, pkt, linktype in parse_pcap(pcap):
                    parsed = parse_eth_ip_tcp(pkt, linktype)
                    if not parsed:
                        continue
                    src, dst, sport, dport, _seq, payload = parsed
                    if sport not in ports and dport not in ports:
                        continue
                    if not payload:
                        continue
                    port = sport if sport in ports else dport
                    pending_topic = None
                    for flags, frame in parse_zmtp_frames(payload):
                        if flags & 0x04:
                            continue
                        if flags & 0x01:
                            pending_topic = frame
                            continue
                        if port == 2001:
                            parsed = False
                            for version, seq, msg_len, msg in parse_frames(frame):
                                decoded = decode_osc(msg)
                                if not decoded:
                                    continue
                                addr, typetags, vals = decoded
                                row = (ts, src, dst, sport, dport, "osc2001", version, seq, msg_len, addr, typetags, vals, pending_topic)
                                if streaming:
                                    render_row(*row, args, params, block_map, block_models, mid_map)
                                else:
                                    rows.append(row)
                                parsed = True
                            if not parsed:
                                # Some device frames arrive as raw OSC without the 12-byte header.
                                decoded = decode_osc(frame)
                                if decoded:
                                    addr, typetags, vals = decoded
                                    row = (ts, src, dst, sport, dport, "osc2001", None, None, len(frame), addr, typetags, vals, pending_topic)
                                    if streaming:
                                        render_row(*row, args, params, block_map, block_models, mid_map)
                                    else:
                                        rows.append(row)
                        elif port == 2002:
                            decoded = decode_osc(frame)
                            if not decoded:
                                continue
                            addr, typetags, vals = decoded
                            row = (ts, src, dst, sport, dport, "osc2002", None, None, len(frame), addr, typetags, vals, None)
                            if streaming:
                                render_row(*row, args, params, block_map, block_models, mid_map)
                            else:
                                rows.append(row)
                        pending_topic = None
            except KeyboardInterrupt:
                pass
    except KeyboardInterrupt:
        pass

    for row in rows:
        render_row(*row, args, params, block_map, block_models, mid_map)


if __name__ == "__main__":
    main()
