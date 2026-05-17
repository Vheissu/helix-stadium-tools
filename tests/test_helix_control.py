"""Tests for the pure parsing/resolver helpers and the action dispatcher in
scripts/helix_control.py.

These exercise the CLI surface without touching a device: parsing functions
are pure, and apply_action is driven against a recording fake session.
"""
import json
import tempfile
import unittest
from pathlib import Path

import scripts.helix_control as hc


class TestParsers(unittest.TestCase):
    def test_parse_stomp_dotted_and_compact(self):
        self.assertEqual(hc.parse_stomp("a.7"), ("a", 7))
        self.assertEqual(hc.parse_stomp("A7"), ("a", 7))
        self.assertEqual(hc.parse_stomp(" b.12 "), ("b", 12))

    def test_parse_stomp_rejects_bad_bank_and_index(self):
        with self.assertRaises(ValueError):
            hc.parse_stomp("e.1")
        with self.assertRaises(ValueError):
            hc.parse_stomp("a.x")

    def test_parse_bool_truthy_falsy_and_invalid(self):
        for token in ("1", "true", "YES", "on", "Enabled"):
            self.assertTrue(hc.parse_bool(token))
        for token in ("0", "false", "no", "OFF", "disabled"):
            self.assertFalse(hc.parse_bool(token))
        with self.assertRaises(ValueError):
            hc.parse_bool("maybe")

    def test_parse_visibility(self):
        self.assertTrue(hc.parse_visibility("show"))
        self.assertFalse(hc.parse_visibility("hide"))
        with self.assertRaises(ValueError):
            hc.parse_visibility("flicker")

    def test_parse_param_value_number_then_bool(self):
        self.assertEqual(hc.parse_param_value("1.5"), 1.5)
        self.assertEqual(hc.parse_param_value("0"), 0.0)
        self.assertIs(hc.parse_param_value("on"), True)
        self.assertIs(hc.parse_param_value("off"), False)

    def test_parse_blocks_and_content_ids(self):
        self.assertEqual(hc.parse_blocks("1, 2 ,3"), [1, 2, 3])
        self.assertEqual(hc.parse_blocks(""), [])
        self.assertEqual(hc.parse_content_ids("4, 5"), [4, 5])
        with self.assertRaises(ValueError):
            hc.parse_content_ids("")
        with self.assertRaises(ValueError):
            hc.parse_content_ids("x")

    def test_resolve_content_root(self):
        self.assertEqual(hc.resolve_content_root("factory"), hc.FACTORY_PRESETS_CID)
        self.assertEqual(hc.resolve_content_root("USER"), hc.USER_PRESETS_CID)
        self.assertEqual(hc.resolve_content_root("setlists"), hc.SETLIST_DIRECTORY_CID)
        with self.assertRaises(ValueError):
            hc.resolve_content_root("nope")

    def test_normalize_query_strips_non_alnum(self):
        self.assertEqual(hc.normalize_query("Dark Orange!"), "darkorange")
        self.assertEqual(hc.normalize_query("US Deluxe Nrm"), "usdeluxenrm")

    def test_parse_snapshot_color_int_digit_and_named(self):
        self.assertEqual(hc.parse_snapshot_color(3), 3)
        self.assertEqual(hc.parse_snapshot_color("3"), 3)
        self.assertEqual(hc.parse_snapshot_color("-1"), -1)
        self.assertEqual(hc.parse_snapshot_color("Dark Orange"), 3)
        self.assertEqual(hc.parse_snapshot_color("blue"), 8)
        with self.assertRaises(ValueError):
            hc.parse_snapshot_color("chartreuse")


class TestJsonSafe(unittest.TestCase):
    def test_printable_bytes_decode_to_text(self):
        self.assertEqual(hc.json_safe(b"hello"), "hello")

    def test_non_printable_bytes_become_hex(self):
        self.assertEqual(hc.json_safe(b"\x00\xff"), "00ff")

    def test_nested_structures_recurse(self):
        out = hc.json_safe({b"k": [b"v", 1, {"n": b"\x01"}]})
        self.assertEqual(out, {"k": ["v", 1, {"n": "01"}]})


class TestModelMap(unittest.TestCase):
    def _write(self, payload):
        path = Path(tempfile.mkdtemp()) / "models.json"
        path.write_text(json.dumps(payload), encoding="utf-8")
        return str(path)

    def test_load_model_map_object_and_list_and_missing(self):
        models = [{"key": "K", "id": 1, "name": "Name"}]
        self.assertEqual(hc.load_model_map(self._write({"models": models})), models)
        self.assertEqual(hc.load_model_map(self._write(models)), models)
        self.assertIsNone(hc.load_model_map(self._write({"other": 1})))
        self.assertIsNone(hc.load_model_map("/no/such/file.json"))

    def test_resolve_model_id_digit_passthrough(self):
        self.assertEqual(hc.resolve_model_id("42", "", "", ""), 42)

    def test_resolve_model_id_by_key_and_name(self):
        models = [
            {"key": "US_Deluxe", "id": 10, "name": "US Deluxe Nrm"},
            {"key": "Brit_2204", "id": 11, "name": "Brit 2204"},
        ]
        path = self._write({"models": models})
        self.assertEqual(hc.resolve_model_id("US_Deluxe", path, "", ""), 10)
        self.assertEqual(hc.resolve_model_id("us_deluxe", path, "", ""), 10)
        self.assertEqual(hc.resolve_model_id("Brit 2204", path, "", ""), 11)
        # Normalised name match.
        self.assertEqual(hc.resolve_model_id("brit2204", path, "", ""), 11)

    def test_resolve_model_id_ambiguous_and_unknown(self):
        models = [
            {"key": "A", "id": 1, "name": "Same"},
            {"key": "B", "id": 2, "name": "Same"},
        ]
        path = self._write({"models": models})
        with self.assertRaises(SystemExit):
            hc.resolve_model_id("Same", path, "", "")
        with self.assertRaises(SystemExit):
            hc.resolve_model_id("Missing", path, "", "")

    def test_resolve_model_id_key_without_id(self):
        path = self._write({"models": [{"key": "K", "id": None, "name": "N"}]})
        with self.assertRaises(SystemExit):
            hc.resolve_model_id("K", path, "", "")

    def test_resolve_param_id_normalised_lookup(self):
        modeldefs = {
            "Amp": {"id": 5, "params": {"Drive Knob": {"id": 7}, "Bass": {"id": 8}}},
        }
        self.assertEqual(hc.resolve_param_id(modeldefs, 5, "driveknob"), 7)
        self.assertIsNone(hc.resolve_param_id(modeldefs, 5, "nope"))
        self.assertIsNone(hc.resolve_param_id(modeldefs, 999, "Bass"))


class TestResolveIoModelId(unittest.TestCase):
    def test_digit_passthrough(self):
        self.assertEqual(hc.resolve_io_model_id("3", "", ""), 3)

    def test_resolves_via_modeldefs_and_uidefs(self):
        modeldefs = {
            "InMulti": {"id": 20, "category": "input"},
            "OutMain": {"id": 21, "category": "output"},
            "AmpThing": {"id": 99, "category": "amp"},
        }
        uidefs = {"OutMain": {"name": "Main Out"}}
        orig_md, orig_ui = hc.load_modeldefs, hc.load_uidefs
        hc.load_modeldefs = lambda _p: modeldefs
        hc.load_uidefs = lambda _p: uidefs
        try:
            self.assertEqual(hc.resolve_io_model_id("InMulti", "x", "y"), 20)
            self.assertEqual(hc.resolve_io_model_id("Main Out", "x", "y"), 21)
            self.assertIsNone(hc.resolve_io_model_id("AmpThing", "x", "y"))
        finally:
            hc.load_modeldefs, hc.load_uidefs = orig_md, orig_ui


class TestDecorateSnapshot(unittest.TestCase):
    def test_filters_none_and_maps_color(self):
        out = hc.decorate_snapshot(
            {"si__": 0, "name": "Verse", "colr": 3, "bpm_": 120,
             "tamv": [1, 2, 3, 4], "iras": [9]}
        )
        self.assertEqual(out["name"], "Verse")
        self.assertEqual(out["color_name"], "Dark Orange")
        self.assertEqual(out["target_value_count"], 2)
        self.assertEqual(out["ir_assignment_count"], 1)
        self.assertNotIn("exsw", out)


class TestIterActionsFromFile(unittest.TestCase):
    def _write(self, payload):
        path = Path(tempfile.mkdtemp()) / "actions.json"
        path.write_text(json.dumps(payload), encoding="utf-8")
        return str(path)

    def test_plain_list(self):
        self.assertEqual(hc.iter_actions_from_file(self._write([{"op": "x"}])), [{"op": "x"}])

    def test_actions_object(self):
        self.assertEqual(hc.iter_actions_from_file(self._write({"actions": [1]})), [1])

    def test_invalid_shape(self):
        with self.assertRaises(SystemExit):
            hc.iter_actions_from_file(self._write("not-a-list"))


class FakeSession:
    """Records every call; returns canned values where the dispatcher reads them."""

    def __init__(self):
        self.calls = []
        self.active_ref = {"rcid": 77}
        self.active_cid = 77

    def __getattr__(self, name):
        def recorder(*args, **kwargs):
            self.calls.append((name, args, kwargs))
            return None
        return recorder

    def get_active_preset_ref(self):
        self.calls.append(("get_active_preset_ref", (), {}))
        return self.active_ref

    def get_active_preset_content_id(self):
        self.calls.append(("get_active_preset_content_id", (), {}))
        return self.active_cid

    def names(self):
        return [c[0] for c in self.calls]


class TestApplyAction(unittest.TestCase):
    def setUp(self):
        self.s = FakeSession()

    def test_returns_incremented_cmd_id(self):
        nxt = hc.apply_action(self.s, 5, {"op": "snapshot_name", "index": 0, "name": "A"})
        self.assertEqual(nxt, 6)
        self.assertIn("set_snapshot_name", self.s.names())

    def test_activate_snapshot_parses_string_wait(self):
        hc.apply_action(self.s, 1, {"op": "activate-snapshot", "index": 2, "wait": "false"})
        name, args, kwargs = self.s.calls[0]
        self.assertEqual(name, "activate_snapshot")
        self.assertEqual(args[0], 2)
        self.assertIs(kwargs["wait_change"], False)

    def test_snapshot_color_named(self):
        hc.apply_action(self.s, 1, {"op": "snapshot_color", "index": 0, "color": "blue"})
        name, args, _ = self.s.calls[0]
        self.assertEqual(name, "set_snapshot_color")
        self.assertEqual(args[1], 8)

    def test_load_preset_with_cid(self):
        hc.apply_action(self.s, 1, {"op": "load_preset", "cid": 123, "wait": "true"})
        self.assertEqual(self.s.calls[0][0], "load_preset_with_cid")

    def test_load_preset_with_root_and_position(self):
        hc.apply_action(self.s, 1, {"op": "load_preset", "root": "user", "position": 4})
        name, args, _ = self.s.calls[0]
        self.assertEqual(name, "load_preset_at_container_position")
        self.assertEqual(args[0], hc.USER_PRESETS_CID)
        self.assertEqual(args[1], 4)

    def test_load_preset_missing_target_raises(self):
        with self.assertRaises(SystemExit):
            hc.apply_action(self.s, 1, {"op": "load_preset"})

    def test_save_preset_falls_back_to_active_ref(self):
        hc.apply_action(self.s, 1, {"op": "save_preset"})
        self.assertIn("get_active_preset_ref", self.s.names())
        save = [c for c in self.s.calls if c[0] == "save_preset_with_cid"][0]
        self.assertEqual(save[1][0], 77)

    def test_scribble_label_via_stomp_builds_key(self):
        hc.apply_action(self.s, 1, {"op": "scribble_label", "stomp": "a.3", "label": "Lead"})
        name, args, _ = self.s.calls[0]
        self.assertEqual(name, "set_property")
        self.assertEqual(args[0], "preset.floorboard.stomp.a.3.label")
        self.assertEqual(args[1], "Lead")

    def test_property_set_passthrough(self):
        hc.apply_action(
            self.s, 1,
            {"op": "property_set", "key": "k", "value": 1, "value_type": "i", "property_id": 2},
        )
        name, args, _ = self.s.calls[0]
        self.assertEqual(name, "set_property")
        self.assertEqual(args[:4], ("k", 1, "i", 2))

    def test_preset_notes_visible_accepts_show(self):
        hc.apply_action(self.s, 1, {"op": "notes-visible", "show": "show"})
        name, args, _ = self.s.calls[0]
        self.assertEqual(name, "set_preset_notes_visible")
        self.assertIs(args[0], True)

    def test_set_autocab_string(self):
        hc.apply_action(self.s, 1, {"op": "set_autocab", "enabled": "off"})
        self.assertIs(self.s.calls[0][1][0], False)

    def test_clear_blocks_scalar_promoted_to_list(self):
        hc.apply_action(self.s, 1, {"op": "clear_blocks", "blocks": 4, "path": 1})
        name, args, _ = self.s.calls[0]
        self.assertEqual(name, "clear_blocks")
        self.assertEqual(args[0], 1)
        self.assertEqual(args[1], [4])

    def test_insert_block_with_explicit_model_id(self):
        hc.apply_action(self.s, 1, {"op": "insert_block", "block": 2, "model_id": 99})
        self.assertEqual(self.s.calls[0][0], "insert_block")

    def test_osc_passthrough(self):
        hc.apply_action(self.s, 1, {"op": "osc", "address": "/X", "typetags": "i", "args": [1]})
        self.assertEqual(self.s.calls[0], ("send", ("/X", "i", [1]), {}))

    def test_unknown_op_raises(self):
        with self.assertRaises(SystemExit):
            hc.apply_action(self.s, 1, {"op": "does-not-exist"})


if __name__ == "__main__":
    unittest.main()
