#!/usr/bin/env python3
"""Extract Stadium Focus points with model-defined parameter limits."""
import argparse
import json
import math
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from scripts.generate_helix_model_json import (  # noqa: E402
    DEFAULT_MODELDEFS,
    load_modeldefs,
)

REGIONS = ('origin', 'x_min_y_min', 'x_min_y_max', 'x_max_y_min', 'x_max_y_max')


def generate(source, definitions, catalogue):
    files = {p.stem: p for p in source.rglob('*.json')}
    result, skipped, bounded = {}, [], []
    for group in catalogue.values():
        for model in group['models']:
            key = model['key']
            suffix = key.split('_', 1)[-1]
            if key.startswith('Agoura_Amp'):
                suffix = suffix.replace('Amp', 'AmpAgoura', 1)
            file = files.get(key) or files.get(suffix)
            if file is None:
                continue
            data = json.loads(file.read_text())
            modeldef = definitions.get(key, {})
            if modeldef.get('id') != model['id']:
                skipped.append({'model': key, 'parameter': '*', 'reason': 'Catalogue and native model ids differ'})
                continue
            native = modeldef.get('params', {})
            parameters = []
            for name, spec in data['params'].items():
                if spec['behavior'] == 'exclude':
                    continue
                native_name = name if name in native else name.replace('.', '_')
                meta = native.get(native_name)
                if not meta or meta.get('id') != spec['id'] or meta.get('type') not in ('f', 'i', 'b'):
                    skipped.append({'model': key, 'parameter': name, 'reason': 'No matching native parameter'})
                    continue
                low, high = float(meta['min']), float(meta['max'])
                values = [data['regions'][r].get(name) for r in REGIONS]
                if not all(isinstance(v, (int, float, bool)) and math.isfinite(v) for v in values):
                    skipped.append({'model': key, 'parameter': name, 'reason': 'Missing region value'})
                    continue
                for region, value in zip(REGIONS, values, strict=True):
                    if value < low - 0.0001 or value > high + 0.0001:
                        bounded.append({'model': key, 'parameter': name, 'region': region, 'value': value, 'min': low, 'max': high})
                # Preserve source points; the client clamps the computed result to native limits.
                parameters.append({'id': spec['id'], 'key': native_name, 'behavior': spec['behavior'], 'type': meta['type'], 'min': low, 'max': high, 'values': values})
            if parameters:
                result[str(model['id'])] = {'key': key, 'names': [data['regions'][r]['name'] for r in REGIONS], 'params': parameters}
    return result, {'skipped': skipped, 'bounded': bounded}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, required=True)
    parser.add_argument('--modeldefs', default=DEFAULT_MODELDEFS)
    parser.add_argument('--output', type=Path, default=ROOT / 'mobile/src/data/focusModels.json')
    parser.add_argument('--report', type=Path)
    args = parser.parse_args()
    if not args.source.is_dir():
        parser.error('Focus definition directory does not exist')
    catalogue = json.loads((ROOT / 'mobile/src/data/blockTypes.json').read_text())
    result, report = generate(args.source, load_modeldefs(args.modeldefs), catalogue)
    if not result:
        parser.error('No matching Focus definitions found; existing output was not changed')
    args.output.write_text(json.dumps(result, indent=2) + '\n')
    if args.report:
        args.report.write_text(json.dumps(report, indent=2) + '\n')
    print(f"Generated {len(result)} Focus models; {len(report['skipped'])} unsupported parameters omitted; {len(report['bounded'])} source points require native-limit clamping")


if __name__ == '__main__':
    main()
