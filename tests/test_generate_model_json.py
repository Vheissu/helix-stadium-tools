import unittest

from scripts.generate_helix_model_json import (
    SYNTHETIC_MODEL_FALLBACKS,
    augment_modeldefs_with_synthetic_entries,
    get_param_meta_for_model,
)


class TestGenerateModelJsonHelpers(unittest.TestCase):
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
