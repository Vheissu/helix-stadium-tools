import unittest

from scripts.generate_mobile_block_types_json import (
    add_missing_catalog_models,
    build_catalog_model_entry,
    preserve_missing_model_entry,
)


class TestGenerateMobileBlockTypesJsonBehavior(unittest.TestCase):
    def test_missing_modeldefs_should_preserve_existing_param_metadata(self):
        model = {
            "key": "HD2_DistSomeStereoClone",
            "usage": 3.6,
            "params": [{"id": 1, "key": "Drive"}],
        }

        preserve_missing_model_entry(model)

        self.assertEqual(model["usage"], 3.6)
        self.assertEqual(model["params"], [{"id": 1, "key": "Drive"}])

    def test_catalog_models_are_added_to_existing_mobile_groups(self):
        block_types = {
            "amp": {
                "label": "Amp",
                "models": [
                    {
                        "id": 1,
                        "name": "Existing Amp",
                        "key": "ExistingAmp",
                        "category": "amp",
                        "usage": 1.0,
                        "params": [],
                    }
                ],
            }
        }
        catalog = [{"name": "Amp", "models": ["ExistingAmp", "NewAmp"]}]
        modeldefs = {
            "NewAmp": {
                "id": 2,
                "category": "amp",
                "usage": 4.5,
                "params": {
                    "Drive": {"id": 10, "type": "f", "min": 0, "max": 10, "def": 5},
                },
            }
        }
        uidefs = {
            "NewAmp": {
                "name": "New Amp",
                "params": [{"id": "Drive", "name": "Drive"}],
            }
        }

        added, skipped = add_missing_catalog_models(
            block_types,
            catalog,
            modeldefs,
            {},
            uidefs,
            {},
            {},
            {},
            {"newamp": "Real Amp"},
            {},
            {},
        )

        self.assertEqual(added, 1)
        self.assertEqual(skipped, [])
        self.assertEqual([model["key"] for model in block_types["amp"]["models"]], ["ExistingAmp", "NewAmp"])
        self.assertEqual(block_types["amp"]["models"][1]["based_on"], "Real Amp")
        self.assertEqual(block_types["amp"]["models"][1]["usage"], 4.5)
        self.assertEqual(block_types["amp"]["models"][1]["params"][0]["key"], "Drive")

    def test_catalog_model_includes_harness_params_from_desktop_uidef(self):
        modeldefs = {
            "HX2_CompressorDeluxeCompMono": {
                "id": 33,
                "category": "dynamics",
                "harness": 830,
                "usage": 2.1,
                "params": {
                    "Threshold": {"id": 1, "type": "f", "min": -60, "max": 0, "def": -37.1},
                },
            },
            "P35_AppFxHarnessDynamicsMono": {
                "id": 830,
                "category": "harness",
                "params": {
                    "ControlSource": {"id": 1, "type": "i", "min": 0, "max": 13, "def": 0},
                },
            },
        }
        uidefs = {
            "HX2_CompressorDeluxeCompMono": {
                "name": "Deluxe Comp",
                "params": [
                    {"id": "ControlSource", "harness": True, "name": "Sidechain", "display_tag": "sidechain"},
                    {"id": "Threshold", "name": "Threshold", "display_tag": "volume"},
                ],
            }
        }
        controls = {
            "sidechain": {
                "isDiscrete": True,
                "format": ["Off", "Instrument 1", "Instrument 2"],
            }
        }

        entry = build_catalog_model_entry(
            "HX2_CompressorDeluxeCompMono",
            modeldefs,
            {33: modeldefs["HX2_CompressorDeluxeCompMono"], 830: modeldefs["P35_AppFxHarnessDynamicsMono"]},
            uidefs,
            {},
            {},
            controls,
        )

        self.assertIsNotNone(entry)
        sidechain = entry["params"][0]
        self.assertEqual(sidechain["key"], "ControlSource")
        self.assertEqual(sidechain["name"], "Sidechain")
        self.assertEqual(sidechain["id"], 1)
        self.assertTrue(sidechain["harness"])
        self.assertEqual(sidechain["type"], "i")
        self.assertEqual(sidechain["min"], 0)
        self.assertEqual(sidechain["max"], 13)
        self.assertEqual(sidechain["def"], 0)
        self.assertEqual(sidechain["options"], ["Off", "Instrument 1", "Instrument 2"])


if __name__ == "__main__":
    unittest.main()
