"""Tests for the USB bulk probe helpers."""

from __future__ import annotations

import importlib.util
import sys
import unittest
from pathlib import Path

from helix.osc import build_osc

SCRIPT_PATH = Path(__file__).resolve().parents[1] / "scripts" / "helix_usb_probe.py"
SPEC = importlib.util.spec_from_file_location("helix_usb_probe", SCRIPT_PATH)
assert SPEC and SPEC.loader
MODULE = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = MODULE
SPEC.loader.exec_module(MODULE)


class USBProbeHelpersTest(unittest.TestCase):
    def test_build_text_command_matches_version_bootstrap(self):
        payload = MODULE.build_text_command("version")
        self.assertEqual(payload[:10], bytes.fromhex("01070076657273696f6e"))
        self.assertEqual(len(payload), MODULE.DEFAULT_TRANSFER_SIZE)

    def test_build_text_command_matches_status_bootstrap(self):
        payload = MODULE.build_text_command("status")
        self.assertEqual(payload[:9], bytes.fromhex("010600737461747573"))
        self.assertEqual(len(payload), MODULE.DEFAULT_TRANSFER_SIZE)

    def test_version_response_is_described_as_little_endian_u32(self):
        details = MODULE.describe_command_response("version", bytes.fromhex("01002600"))
        self.assertEqual(details, ["version_le=0x00260001 (2490369)"])

    def test_build_command_with_payload_appends_suffix_after_command(self):
        payload = MODULE.build_command_with_payload("size", bytes.fromhex("78563412"))
        self.assertEqual(payload[:11], bytes.fromhex("01040073697a6578563412"))
        self.assertEqual(len(payload), MODULE.DEFAULT_TRANSFER_SIZE)

    def test_build_chunk_frame_sets_type_and_16bit_length(self):
        payload = MODULE.build_chunk_frame(bytes.fromhex("aabbcc"))
        self.assertEqual(payload[:6], bytes.fromhex("020300aabbcc"))
        self.assertEqual(len(payload), MODULE.DEFAULT_TRANSFER_SIZE)

    def test_describe_possible_osc_decodes_raw_osc_payload(self):
        payload = build_osc("/status", "iii", [7, 0, 0])
        details = MODULE.describe_possible_osc(payload)
        self.assertEqual(details, ["osc=/status ,iii [7, 0, 0]"])

    def test_collect_read_attempts_runs_multiple_times(self):
        responses = iter([(0, b"a"), (-7, b""), (0, b"b")])
        calls: list[int] = []

        def read_once():
            calls.append(1)
            return next(responses)

        results = MODULE.collect_read_attempts(read_once, attempts=3, delay_ms=0)
        self.assertEqual(results, [(0, b"a"), (-7, b""), (0, b"b")])
        self.assertEqual(len(calls), 3)


if __name__ == "__main__":
    unittest.main()
