#!/usr/bin/env python3
"""Generate the compact mobile amp, preamp, and cab model list."""

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_BLOCK_TYPES = ROOT / "mobile" / "src" / "data" / "blockTypes.json"
DEFAULT_OUTPUT = ROOT / "mobile" / "src" / "data" / "models.json"

MODEL_GROUPS = {
    "amp": "amps",
    "preamp": "preamps",
    "cab": "cabs",
}


def build_mobile_models(block_types):
    output = {output_key: [] for output_key in MODEL_GROUPS.values()}
    for block_group, output_key in MODEL_GROUPS.items():
        group = block_types.get(block_group, {})
        models = group.get("models", [])
        if not isinstance(models, list):
            continue
        for model in models:
            if not isinstance(model, dict):
                continue
            output[output_key].append(
                {
                    "id": model.get("id"),
                    "name": model.get("name"),
                    "based_on": model.get("based_on"),
                    "key": model.get("key"),
                    "category": model.get("category"),
                }
            )
    return output


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--block-types", default=str(DEFAULT_BLOCK_TYPES))
    ap.add_argument("--output", default=str(DEFAULT_OUTPUT))
    args = ap.parse_args()

    block_types = json.loads(Path(args.block_types).read_text(encoding="utf-8"))
    output = build_mobile_models(block_types)
    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(output, indent=2, sort_keys=False), encoding="utf-8")
    print(
        f"Wrote {output_path} "
        f"({len(output['amps'])} amps, {len(output['preamps'])} preamps, {len(output['cabs'])} cabs)"
    )


if __name__ == "__main__":
    main()
