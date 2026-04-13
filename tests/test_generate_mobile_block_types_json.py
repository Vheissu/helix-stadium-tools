import unittest

from scripts.generate_mobile_block_types_json import preserve_missing_model_entry


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


if __name__ == "__main__":
    unittest.main()
