import unittest

from scripts.generate_mobile_models_json import build_mobile_models


class TestGenerateMobileModelsJson(unittest.TestCase):
    def test_build_mobile_models_uses_block_catalog_groups(self):
        block_types = {
            "amp": {"models": [{"id": 1, "name": "Amp", "based_on": "Real Amp", "key": "AmpKey", "category": "amp"}]},
            "preamp": {"models": [{"id": 2, "name": "Preamp", "key": "PreampKey", "category": "preamp"}]},
            "cab": {"models": [{"id": 3, "name": "Cab", "key": "CabKey", "category": "cab_ir_interp"}]},
            "delay": {"models": [{"id": 4, "name": "Delay", "key": "DelayKey", "category": "delay"}]},
        }

        output = build_mobile_models(block_types)

        self.assertEqual(
            output["amps"],
            [{"id": 1, "name": "Amp", "based_on": "Real Amp", "key": "AmpKey", "category": "amp"}],
        )
        self.assertEqual(
            output["preamps"],
            [{"id": 2, "name": "Preamp", "based_on": None, "key": "PreampKey", "category": "preamp"}],
        )
        self.assertEqual(
            output["cabs"],
            [{"id": 3, "name": "Cab", "based_on": None, "key": "CabKey", "category": "cab_ir_interp"}],
        )


if __name__ == "__main__":
    unittest.main()
