import unittest

from scripts.add_missing_mobile_models import (
    build_routing_model_entry,
    hydrate_existing_routing_models,
)


class TestAddMissingMobileModelsHelpers(unittest.TestCase):
    def test_build_routing_model_entry_uses_hydrated_metadata(self):
        routing_metadata = {
            "P35_AppDSPJoin": {
                "name": "Mixer",
                "category": "join",
                "usage": 1.5,
                "params": [{"id": 1, "key": "A Level"}],
            }
        }

        entry = build_routing_model_entry(
            {"id": 478, "name": "Join", "key": "P35_AppDSPJoin", "category": "join"},
            routing_metadata,
        )

        self.assertEqual(entry["name"], "Mixer")
        self.assertEqual(entry["category"], "join")
        self.assertEqual(entry["usage"], 1.5)
        self.assertEqual(entry["params"], [{"id": 1, "key": "A Level"}])

    def test_hydrate_existing_routing_models_updates_stale_entries(self):
        routing_metadata = {
            "P35_AppDSPSplitY": {
                "name": "Y",
                "category": "split",
                "usage": 1.5,
                "params": [{"id": 1, "key": "BalanceA"}],
            }
        }
        block_types = {
            "routing": {
                "label": "Split / Merge",
                "models": [
                    {
                        "id": 475,
                        "name": "Old Y",
                        "key": "P35_AppDSPSplitY",
                        "category": "split",
                        "usage": 0,
                        "params": [],
                    }
                ],
            }
        }

        updated = hydrate_existing_routing_models(block_types, routing_metadata)

        self.assertEqual(updated, 1)
        model = block_types["routing"]["models"][0]
        self.assertEqual(model["name"], "Y")
        self.assertEqual(model["usage"], 1.5)
        self.assertEqual(model["params"], [{"id": 1, "key": "BalanceA"}])


if __name__ == "__main__":
    unittest.main()
