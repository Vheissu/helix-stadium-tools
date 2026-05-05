import unittest

from scripts.generate_mobile_block_types_json import add_missing_catalog_models, preserve_missing_model_entry


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


if __name__ == "__main__":
    unittest.main()
