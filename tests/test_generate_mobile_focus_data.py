import json
import tempfile
import unittest
from pathlib import Path

from scripts.generate_mobile_focus_data import REGIONS, generate


class FocusDataTests(unittest.TestCase):
    def run_generation(self, key='HD2_AmpExample', parameter='Drive', native_parameter=None, native_id=1, values=None):
        values = values or [0, 0.25, 0.5, 0.75, 1]
        stem = 'AmpAgouraExample' if key.startswith('Agoura_') else 'AmpExample'
        with tempfile.TemporaryDirectory() as directory:
            source = Path(directory)
            source.joinpath(stem + '.json').write_text(json.dumps({
                'modelName': 'Example',
                'params': {parameter: {'id': 1, 'behavior': 'interpolate'}, 'Ignored': {'id': 2, 'behavior': 'exclude'}},
                'regions': {region: {'name': region, parameter: value} for region, value in zip(REGIONS, values)},
            }))
            native = {key: {'id': native_id, 'params': {native_parameter or parameter: {'id': 1, 'type': 'f', 'min': 0, 'max': 1}}}}
            catalogue = {'amp': {'models': [{'id': 1, 'key': key, 'params': []}]}}
            return generate(source, native, catalogue)

    def test_hidden_native_parameters_are_included_and_exclusions_are_omitted(self):
        result, report = self.run_generation()
        self.assertEqual(len(result['1']['params']), 1)
        self.assertEqual(result['1']['params'][0]['key'], 'Drive')
        self.assertEqual(report, {'skipped': [], 'bounded': []})

    def test_agoura_names_and_decimal_parameter_names_resolve_to_native_keys(self):
        result, report = self.run_generation('Agoura_AmpExample', '2.2 KHz', '2_2 KHz')
        self.assertEqual(result['1']['params'][0]['key'], '2_2 KHz')
        self.assertEqual(report['skipped'], [])

    def test_mismatched_model_ids_are_not_published(self):
        result, report = self.run_generation(native_id=99)
        self.assertEqual(result, {})
        self.assertEqual(len(report['skipped']), 1)

    def test_out_of_range_factory_points_are_reported_for_runtime_clamping(self):
        result, report = self.run_generation(values=[-1, 0, 0.5, 1, 2])
        self.assertEqual(len(report['bounded']), 2)
        self.assertEqual(result['1']['params'][0]['min'], 0)
        self.assertEqual(result['1']['params'][0]['max'], 1)


if __name__ == '__main__':
    unittest.main()
