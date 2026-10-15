import unittest

from scripts.add_missing_mobile_models import (
    add_missing_io_models,
    add_missing_stereo_models,
    build_routing_model_entry,
    hydrate_existing_routing_models,
)


class TestAddMissingMobileModelsHelpers(unittest.TestCase):
    def test_stereo_import_uses_own_parameters_defaults_and_dsp(self):
        mono = {
            "id": 1, "key": "VibeMono", "name": "Vibe", "based_on": "Example",
            "usage": 1.0, "params": [{"id": 5, "key": "Level"}],
        }
        blocks = {"modulation": {"models": [mono]}}
        catalogue = [{"id": 2, "key": "VibeStereo"}]
        defs = {"VibeStereo": {
            "id": 2, "category": "modulation", "usage": 1.6,
            "params": {
                "Spread": {"id": 5, "type": "f", "min": 0, "max": 1, "def": 0.5},
                "Level": {"id": 6, "type": "f", "min": -60, "max": 6, "def": 0},
            },
        }}
        ui = {"VibeMono": {"name": "Vibe", "params": [
            {"id": "Spread", "name": "Spread", "stereo_only": True},
            {"id": "Level", "name": "Level"},
        ]}}

        added = add_missing_stereo_models(blocks, catalogue, defs, ui, {}, {}, {})

        self.assertEqual(added, 1)
        stereo = blocks["modulation"]["models"][1]
        self.assertEqual(stereo["usage"], 1.6)
        self.assertEqual(stereo["based_on"], "Example")
        self.assertEqual([(p["key"], p["id"]) for p in stereo["params"]],
                         [("Spread", 5), ("Level", 6)])
        self.assertEqual(stereo["params"][0]["def"], 0.5)
        self.assertEqual(mono["params"], [{"id": 5, "key": "Level"}])
        self.assertEqual(add_missing_stereo_models(blocks, catalogue, defs, ui, {}, {}, {}), 0)

    def test_stereo_import_skips_missing_or_unavailable_definitions(self):
        blocks = {"fx_loop": {"models": [{"id": 1, "key": "LoopMono"}]}}
        catalogue = [{"id": 2, "key": "LoopStereo"}]
        ui = {"LoopMono": {"name": "Loop", "params": []}}
        self.assertEqual(add_missing_stereo_models(blocks, catalogue, {}, ui, {}, {}, {}), 0)
        defs = {"LoopStereo": {"id": 2, "available": False}}
        self.assertEqual(add_missing_stereo_models(blocks, catalogue, defs, ui, {}, {}, {}), 0)
        self.assertEqual(len(blocks["fx_loop"]["models"]), 1)

    def test_io_backfill_keeps_none_but_skips_unnamed_and_unavailable_models(self):
        io = {"inputs": {"models": []}, "outputs": {"models": []}}
        catalogue = [
            {"id": 1, "category": "output", "name": "None"},
            {"id": 2, "category": "output", "key": "HiddenOutput", "name": None},
            {"id": 3, "category": "input", "name": "Unavailable", "available": False},
            {"id": None, "category": "input", "name": "Unresolved"},
        ]
        self.assertEqual(add_missing_io_models(io, catalogue), 1)
        self.assertEqual(io["outputs"]["models"], [{"id": 1, "name": "None", "params": []}])
        self.assertEqual(io["inputs"]["models"], [])
        self.assertEqual(add_missing_io_models(io, catalogue), 0)

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
