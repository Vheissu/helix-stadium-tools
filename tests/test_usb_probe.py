"""Tests for the USB bulk probe helpers."""

from __future__ import annotations

import importlib.util
from pathlib import Path
import sys
import unittest


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


if __name__ == "__main__":
    unittest.main()
