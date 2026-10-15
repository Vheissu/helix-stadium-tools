import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import scripts.generate_helix_model_json as generate_helix_model_json
from scripts.generate_helix_model_json import (
    DEFAULT_OUT_DIR,
    SYNTHETIC_MODEL_FALLBACKS,
    augment_modeldefs_with_synthetic_entries,
    get_param_meta_for_model,
)


class TestGenerateModelJsonHelpers(unittest.TestCase):
    def test_catalog_resolves_stereo_ui_and_uses_stereo_parameters(self):
        modeldefs = {"VibeStereo": {
            "id": 2, "category": "modulation", "params": {
                "Spread": {"id": 5, "min": 0, "max": 1, "def": 0.5, "type": "f"},
                "Hidden": {"id": 9, "min": 0, "max": 10, "def": 1, "type": "f"},
            },
        }}
        ui = {"VibeMono": {"name": "Vibe", "params": [
            {"id": "Spread", "name": "Stereo Spread", "display_tag": "percent"},
        ]}}
        with tempfile.TemporaryDirectory() as directory:
            with patch("sys.argv", ["generate", "--out-dir", directory]), \
                    patch.object(generate_helix_model_json, "load_modeldefs", return_value=modeldefs), \
                    patch.object(generate_helix_model_json, "load_uidefs", return_value=ui), \
                    patch.object(generate_helix_model_json, "load_controls", return_value={}), \
                    patch.object(generate_helix_model_json, "load_param_meta", return_value=({}, {})), \
                    patch.object(generate_helix_model_json, "load_based_on_db", return_value=({}, {})), \
                    patch.object(generate_helix_model_json, "load_based_on_overrides", return_value={}):
                generate_helix_model_json.main()
            effects = json.loads((Path(directory) / "effects.json").read_text())
        self.assertEqual(len(effects), 1)
        self.assertEqual(effects[0]["name"], "Vibe")
        self.assertEqual(len(effects[0]["params"]), 1)
        self.assertEqual(effects[0]["params"][0]["name"], "Stereo Spread")
        self.assertEqual(effects[0]["params"][0]["default"], 0.5)

    def test_default_output_dir_is_repo_relative(self):
        repo_root = Path(generate_helix_model_json.__file__).resolve().parents[1]
        self.assertEqual(DEFAULT_OUT_DIR, repo_root / "generated" / "helix-models")

    def test_augment_modeldefs_adds_plugin_fallbacks(self):
        modeldefs = {
            "HD2_FXLoopMono1": {
                "id": 277,
                "category": "fxloop",
                "usage": 1.3,
                "params": {
                    "Send": {"id": 1, "type": "f", "min": -60, "max": 6, "def": 0},
                    "Return": {"id": 2, "type": "f", "min": -60, "max": 6, "def": 0},
                    "Mix": {"id": 3, "type": "f", "min": 0, "max": 1, "def": 1},
                },
            }
        }

        augmented = augment_modeldefs_with_synthetic_entries(modeldefs)

        self.assertIn("HD2_PluginMono1", augmented)
        self.assertEqual(augmented["HD2_PluginMono1"]["id"], 416)
        self.assertEqual(augmented["HD2_PluginMono1"]["usage"], 0.0)
        self.assertFalse(augmented["HD2_PluginMono1"]["available"])
        self.assertTrue(augmented["HD2_PluginMono1"]["synthetic_fallback"])
        self.assertEqual(augmented["HD2_PluginMono1"]["params"]["Mix"]["id"], 3)
        self.assertEqual(augmented["HD2_FXLoopMono1"]["id"], 277)
        self.assertEqual(augmented["HD2_FXLoopMono1"]["usage"], 1.3)

    def test_get_param_meta_for_model_falls_back_from_plugin_to_fx_loop(self):
        meta = {
            ("fxloop", "Plugin 1"): {"Send": "", "Return": "", "Mix": ""},
            ("fxloop", "FX Loop 1"): {
                "Send": "Send level",
                "Return": "Return level",
                "Mix": "Loop mix",
            },
        }

        params = get_param_meta_for_model(meta, {}, "HD2_PluginMono1", "fxloop", "Plugin 1")

        self.assertEqual(params["Send"], "Send level")
        self.assertEqual(params["Return"], "Return level")
        self.assertEqual(params["Mix"], "Loop mix")

    def test_plugin_fallback_table_has_unique_ids(self):
        ids = [entry["id"] for entry in SYNTHETIC_MODEL_FALLBACKS.values()]
        self.assertEqual(len(ids), len(set(ids)))


if __name__ == "__main__":
    unittest.main()
