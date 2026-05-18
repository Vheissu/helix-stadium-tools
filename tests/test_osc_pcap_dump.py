"""Tests for scripts/osc_pcap_dump.py.

Covers the OSC/ZMTP frame decoders, the TCP reassembly heuristic, Ethernet/IP
parsing, and an end-to-end run of parse_pcap over a synthesized classic pcap.
"""
import io
import struct
import tempfile
import unittest
from pathlib import Path

import scripts.osc_pcap_dump as opd


def build_osc(addr: str, typetags: str, args) -> bytes:
    def pad4(b: bytes) -> bytes:
        return b + b"\x00" * ((4 - len(b) % 4) % 4)

    msg = pad4(addr.encode() + b"\x00")
    msg += pad4(("," + typetags).encode() + b"\x00")
    for tag, value in zip(typetags, args, strict=True):
        if tag == "i":
            msg += struct.pack(">i", value)
        elif tag == "h":
            msg += struct.pack(">q", value)
        elif tag == "f":
            msg += struct.pack(">f", value)
        elif tag == "s":
            msg += pad4(value.encode() + b"\x00")
        elif tag == "b":
            msg += struct.pack(">I", len(value)) + pad4(value)
    return msg


def header_2001(msg: bytes, version: int = 0x0108, seq: int = 1) -> bytes:
    return struct.pack(">H6xHH", version, seq, len(msg)) + msg


class TestDecodeOsc(unittest.TestCase):
    def test_round_trip_mixed_args(self):
        msg = build_osc("/Foo", "ifsb", [7, 0.5, "hi", b"\x01\x02"])
        addr, tt, vals = opd.decode_osc(msg)
        self.assertEqual(addr, "/Foo")
        self.assertEqual(tt, ",ifsb")
        self.assertEqual(vals[0], 7)
        self.assertAlmostEqual(vals[1], 0.5, places=6)
        self.assertEqual(vals[2], "hi")
        self.assertEqual(vals[3], b"\x01\x02")

    def test_long_int(self):
        _addr, _tt, vals = opd.decode_osc(build_osc("/L", "h", [2**40]))
        self.assertEqual(vals[0], 2**40)

    def test_no_null_address_returns_none(self):
        self.assertIsNone(opd.decode_osc(b"nonull"))

    def test_missing_typetag_marker(self):
        msg = b"/Foo\x00\x00\x00\x00abcd"
        self.assertEqual(opd.decode_osc(msg), ("/Foo", None, []))

    def test_unknown_typetag_placeholder(self):
        msg = build_osc("/Foo", "", [])[:-0] + b""
        # Manually craft an unknown tag 'z'.
        def pad4(b):
            return b + b"\x00" * ((4 - len(b) % 4) % 4)
        msg = pad4(b"/Foo\x00") + pad4(b",z\x00") + b"\x00\x00\x00\x00"
        _addr, _tt, vals = opd.decode_osc(msg)
        self.assertEqual(vals[0], ("?", "z"))

    def test_truncated_blob_marked(self):
        def pad4(b):
            return b + b"\x00" * ((4 - len(b) % 4) % 4)
        msg = pad4(b"/B\x00") + pad4(b",b\x00") + struct.pack(">I", 9) + b"hi"
        _addr, _tt, vals = opd.decode_osc(msg)
        self.assertEqual(vals[0], "<blob:9?>")

    def test_truncated_int_yields_none(self):
        def pad4(b):
            return b + b"\x00" * ((4 - len(b) % 4) % 4)
        msg = pad4(b"/I\x00") + pad4(b",i\x00") + b"\x00\x01"
        _addr, _tt, vals = opd.decode_osc(msg)
        self.assertIsNone(vals[0])


class TestZmtpFrames(unittest.TestCase):
    def test_greeting_detection(self):
        greeting = b"\xff" + b"\x00" * 8 + b"\x7f" + b"\x00" * 54
        self.assertTrue(opd.looks_like_zmtp_greeting(greeting))
        self.assertFalse(opd.looks_like_zmtp_greeting(b"short"))

    def test_short_frame(self):
        body = b"hello"
        payload = bytes([0x00, len(body)]) + body
        self.assertEqual(opd.parse_zmtp_frames(payload), [(0x00, body)])

    def test_long_frame_flag(self):
        body = b"x" * 300
        payload = bytes([0x02]) + len(body).to_bytes(8, "big") + body
        flags, frame = opd.parse_zmtp_frames(payload)[0]
        self.assertEqual(flags, 0x02)
        self.assertEqual(frame, body)

    def test_resync_skips_garbage(self):
        body = b"abcd"
        good = bytes([0x00, len(body)]) + body
        frames = opd.parse_zmtp_frames(b"\xff\xff" + good, resync=True)
        self.assertIn((0x00, body), frames)


class TestHeaderFrameParsers(unittest.TestCase):
    def test_parse_frames_strict(self):
        msg = build_osc("/A", "i", [1])
        frames = opd.parse_frames(header_2001(msg, seq=5))
        self.assertEqual(len(frames), 1)
        version, seq, msg_len, body = frames[0]
        self.assertEqual(version, 0x0108)
        self.assertEqual(seq, 5)
        self.assertEqual(msg_len, len(msg))
        self.assertEqual(body, msg)

    def test_parse_frames_resync_filters_non_osc(self):
        msg = build_osc("/Ok", "i", [2])
        payload = b"\x99\x99garbage" + header_2001(msg)
        frames = opd.parse_frames(payload, resync=True)
        self.assertEqual([f[3] for f in frames], [msg])

    def test_parse_lenpref_frames(self):
        msg = build_osc("/L", "s", ["x"])
        payload = struct.pack(">H", len(msg)) + msg
        self.assertEqual(opd.parse_lenpref_frames(payload), [(len(msg), msg)])

    def test_parse_lenpref_frames_resync(self):
        msg = build_osc("/L", "s", ["y"])
        payload = b"\x00\x00" + struct.pack(">H", len(msg)) + msg
        frames = opd.parse_lenpref_frames(payload, resync=True)
        self.assertEqual([f[1] for f in frames], [msg])


class TestReassembleStream(unittest.TestCase):
    def test_orders_and_concatenates(self):
        segs = [(10, b"world", 2.0), (5, b"hello", 1.0)]
        out = opd.reassemble_stream(segs)
        # ts tracks the last segment of a contiguous run.
        self.assertEqual(out, [(2.0, b"helloworld")])

    def test_overlap_trimmed(self):
        segs = [(0, b"abcd", 1.0), (2, b"cdef", 1.1)]
        out = opd.reassemble_stream(segs)
        self.assertEqual(out, [(1.1, b"abcdef")])

    def test_gap_flushes_chunk(self):
        segs = [(0, b"abcd", 1.0), (100, b"zzzz", 2.0)]
        out = opd.reassemble_stream(segs)
        self.assertEqual(out, [(1.0, b"abcd"), (2.0, b"zzzz")])

    def test_empty(self):
        self.assertEqual(opd.reassemble_stream([]), [])


class TestEthIpTcp(unittest.TestCase):
    @staticmethod
    def make_packet(payload: bytes, sport=40000, dport=2001, with_eth=True) -> bytes:
        tcp = struct.pack(">HHIIHHHH", sport, dport, 1, 0, 5 << 12, 0, 0, 0) + payload
        ip = struct.pack(
            ">BBHHHBBH4s4s",
            0x45, 0, 20 + len(tcp), 0, 0, 64, 6, 0,
            bytes([10, 0, 0, 1]), bytes([10, 0, 0, 2]),
        ) + tcp
        if not with_eth:
            return ip
        eth = b"\x00" * 6 + b"\x00" * 6 + struct.pack(">H", 0x0800)
        return eth + ip

    def test_ethernet_frame(self):
        pkt = self.make_packet(b"DATA")
        parsed = opd.parse_eth_ip_tcp(pkt, linktype=1)
        self.assertIsNotNone(parsed)
        src, dst, sport, dport, _seq, payload = parsed
        self.assertEqual(src, "10.0.0.1")
        self.assertEqual(dst, "10.0.0.2")
        self.assertEqual(dport, 2001)
        self.assertEqual(payload, b"DATA")

    def test_null_loopback_linktype(self):
        ip_pkt = self.make_packet(b"X", with_eth=False)
        pkt = b"\x02\x00\x00\x00" + ip_pkt  # 4-byte BSD loopback family header
        parsed = opd.parse_eth_ip_tcp(pkt, linktype=0)
        self.assertIsNotNone(parsed)
        self.assertEqual(parsed[5], b"X")

    def test_non_ip_ethertype_rejected(self):
        eth = b"\x00" * 12 + struct.pack(">H", 0x86DD)
        self.assertIsNone(opd.parse_eth_ip_tcp(eth + b"junk", linktype=1))

    def test_non_tcp_protocol_rejected(self):
        ip = struct.pack(
            ">BBHHHBBH4s4s",
            0x45, 0, 28, 0, 0, 64, 17, 0,
            bytes([1, 1, 1, 1]), bytes([2, 2, 2, 2]),
        ) + b"\x00" * 8
        self.assertIsNone(opd.parse_ip_tcp(ip))


class TestSmallHelpers(unittest.TestCase):
    def test_format_topic_text_and_hex(self):
        self.assertIsNone(opd.format_topic(None))
        self.assertEqual(opd.format_topic(b"topic"), "topic")
        self.assertEqual(opd.format_topic(b"\x00\xff"), "00ff")

    def test_format_vals_summarizes_bytes(self):
        self.assertEqual(opd.format_vals([b"abc", 5, "s"]), ["<blob:3>", 5, "s"])

    def test_param_name_bounds(self):
        params = [{"id": "Gain"}, {"name": "Bass"}]
        self.assertEqual(opd.param_name(params, 0), "Gain")
        self.assertEqual(opd.param_name(params, 1), "Bass")
        self.assertIsNone(opd.param_name(params, 9))
        self.assertIsNone(opd.param_name(None, 0))

    def test_prefixed_reader(self):
        r = opd.PrefixedReader(b"ABCD", io.BytesIO(b"EFGH"))
        self.assertEqual(r.read(2), b"AB")
        self.assertEqual(r.read(4), b"CDEF")
        self.assertEqual(r.read(), b"GH")


class TestParsePcapEndToEnd(unittest.TestCase):
    def test_classic_pcap_round_trip(self):
        msg = build_osc("/PresetName", "s", ["Verse A"])
        pkt = TestEthIpTcp.make_packet(header_2001(msg), dport=2001)
        # Classic little-endian pcap: global header + one record.
        global_hdr = struct.pack("<IHHiIII", 0xA1B2C3D4, 2, 4, 0, 0, 65535, 1)
        rec_hdr = struct.pack("<IIII", 1700000000, 0, len(pkt), len(pkt))
        path = Path(tempfile.mkdtemp()) / "cap.pcap"
        path.write_bytes(global_hdr + rec_hdr + pkt)

        records = list(opd.parse_pcap(str(path)))
        self.assertEqual(len(records), 1)
        ts, data, linktype = records[0]
        self.assertEqual(linktype, 1)
        src, dst, sport, dport, _seq, payload = opd.parse_eth_ip_tcp(data, linktype)
        self.assertEqual(dport, 2001)
        version, seq, _len, body = opd.parse_frames(payload)[0]
        self.assertEqual(version, 0x0108)
        addr, _tt, vals = opd.decode_osc(body)
        self.assertEqual(addr, "/PresetName")
        self.assertEqual(vals[0], "Verse A")

    def test_empty_file_yields_nothing(self):
        path = Path(tempfile.mkdtemp()) / "empty.pcap"
        path.write_bytes(b"")
        self.assertEqual(list(opd.parse_pcap(str(path))), [])


if __name__ == "__main__":
    unittest.main()
