#!/usr/bin/env python3
"""Annotate mobile blockTypes.json with DSP usage from modeldefs."""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from scripts.generate_helix_model_json import (  # noqa: E402
    DEFAULT_MODELDEFS,
    load_modeldefs,
)

BLOCK_TYPES_PATH = ROOT / "mobile" / "src" / "data" / "blockTypes.json"


def build_usage_lookup(modeldefs_path: str):
    modeldefs = load_modeldefs(modeldefs_path)
    usage_by_id = {}
    for info in modeldefs.values():
        if not isinstance(info, dict):
            continue
        model_id = info.get("id")
        usage = info.get("usage")
        if isinstance(model_id, int) and isinstance(usage, (int, float)):
            usage_by_id[model_id] = float(usage)
    return usage_by_id


def main():
    if not BLOCK_TYPES_PATH.exists():
        raise SystemExit(f"Missing {BLOCK_TYPES_PATH}")
    usage_by_id = build_usage_lookup(DEFAULT_MODELDEFS)
    data = json.loads(BLOCK_TYPES_PATH.read_text(encoding="utf-8"))
    updated = 0
    missing = 0
    for group in data.values():
        for model in group.get("models", []):
            model_id = model.get("id")
            usage = usage_by_id.get(model_id)
            if usage is None:
                model["usage"] = 0
                missing += 1
            else:
                model["usage"] = usage
                updated += 1
    BLOCK_TYPES_PATH.write_text(json.dumps(data, indent=2, sort_keys=False), encoding="utf-8")
    print(f"Updated {updated} models; missing usage for {missing}.")


if __name__ == "__main__":
    main()
