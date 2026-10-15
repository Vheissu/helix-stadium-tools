"""Regression checks for the data shipped with the mobile editor (no app install needed)."""

import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class TestModelCatalogIntegrity(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        blocks = json.loads((ROOT / "mobile/src/data/blockTypes.json").read_text())
        cls.models = {model["key"]: model for group in blocks.values() for model in group["models"]}

    def test_new_amp_choices_are_preserved(self):
        brit = {p["key"]: p for p in self.models["Agoura_AmpBritSL100"]["params"]}
        self.assertEqual(brit["Channel"]["options"], ["Normal", "Bright", "Jumped"])
        self.assertEqual(brit["Era"]["options"], ["'67", "'68", "'70", "'71"])
        omega = {p["key"]: p for p in self.models["Agoura_AmpOmegaGrano"]["params"]}
        self.assertEqual(omega["NFB"]["options"], ["Open", "Closed"])

    def test_new_stereo_effects_have_their_own_dsp_estimates(self):
        expected = {
            "HD2_VibratoEssexVibeStereo": 1.6,
            "HD2_ChorusDimensionWStereo": 3.3,
            "HD2_DistRockBoxBoostStereo": 9.0,
            "HD2_DistRockBoxStereo": 4.7,
            "HD2_DistMercatorStereo": 10.0,
            "HD2_DistPortaBox424Stereo": 5.0,
        }
        for key, usage in expected.items():
            with self.subTest(key=key):
                self.assertEqual(self.models[key]["usage"], usage)
        boost = {p["key"]: p for p in self.models["HD2_DistRockBoxBoostStereo"]["params"]}
        self.assertEqual(boost["Boost"]["def"], 0.5)

    def test_essex_stereo_level_does_not_write_spread(self):
        mono = {p["key"]: p for p in self.models["HD2_VibratoEssexVibeMono"]["params"]}
        stereo = {p["key"]: p for p in self.models["HD2_VibratoEssexVibeStereo"]["params"]}
        self.assertNotIn("Spread", mono)
        self.assertEqual(mono["Level"]["id"], 5)
        self.assertEqual(stereo["Spread"]["id"], 5)
        self.assertEqual(stereo["Level"]["id"], 6)

    def test_hidden_io_definitions_are_not_picker_options(self):
        io = json.loads((ROOT / "mobile/src/data/ioModels.json").read_text())
        models = [model for group in io.values() for model in group["models"]]
        hidden_ids = {776, 777, *range(848, 853), *range(861, 868)}
        self.assertFalse(hidden_ids.intersection(model["id"] for model in models))
        self.assertIn(789, [model["id"] for model in io["outputs"]["models"]])


if __name__ == "__main__":
    unittest.main()
