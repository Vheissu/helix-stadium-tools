#!/usr/bin/env python3
"""Add missing stereo variants, routing blocks, and IO models to mobile data files.

The Helix device reports stereo model IDs when blocks are on a stereo signal
path, but blockTypes.json only contained mono variants.  This script clones
each mono entry for its stereo counterpart so the mobile app can resolve all
model IDs to human-readable names.

It also adds join/split routing blocks and any missing IO models.
"""

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BLOCK_TYPES_PATH = ROOT / "mobile" / "src" / "data" / "blockTypes.json"
IO_MODELS_PATH = ROOT / "mobile" / "src" / "data" / "ioModels.json"
MODEL_ID_MAP_PATH = ROOT / "generated" / "helix-models" / "model_id_map.json"


def load_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def save_json(path, data):
    Path(path).write_text(json.dumps(data, indent=2, sort_keys=False) + "\n", encoding="utf-8")


def main():
    block_types = load_json(BLOCK_TYPES_PATH)
    io_models = load_json(IO_MODELS_PATH)
    model_id_map = load_json(MODEL_ID_MAP_PATH)
    catalogue = model_id_map["models"]

    # ---- Build indexes ----
    # All IDs currently in blockTypes
    existing_ids = set()
    key_to_entry = {}  # model key -> (bt_category, entry)
    for group_key, group in block_types.items():
        for m in group.get("models", []):
            existing_ids.add(m["id"])
            key_to_entry[m["key"]] = (group_key, m)

    # All IDs currently in ioModels
    existing_io_ids = set()
    for section in ("inputs", "outputs"):
        for m in io_models.get(section, {}).get("models", []):
            existing_io_ids.add(m["id"])

    # ---- 1. Add missing stereo variants to blockTypes ----
    added_stereo = 0
    for entry in catalogue:
        key = entry.get("key", "")
        model_id = entry.get("id")
        if "Stereo" not in key:
            continue
        if model_id in existing_ids:
            continue

        # Find mono counterpart
        mono_key = key.replace("Stereo", "Mono")
        if mono_key not in key_to_entry:
            continue

        bt_cat, mono_entry = key_to_entry[mono_key]
        stereo_entry = {
            "id": model_id,
            "name": mono_entry["name"],
            "key": key,
            "category": mono_entry.get("category", bt_cat),
            "usage": mono_entry.get("usage", 0),
            "params": mono_entry.get("params", []),
        }
        block_types[bt_cat]["models"].append(stereo_entry)
        existing_ids.add(model_id)
        added_stereo += 1

    # ---- 2. Add routing blocks (join/split) ----
    routing_models = []
    for entry in catalogue:
        cat = entry.get("category")
        model_id = entry.get("id")
        if cat not in ("join", "split"):
            continue
        if model_id in existing_ids:
            continue
        routing_models.append({
            "id": model_id,
            "name": entry.get("name") or entry.get("key", ""),
            "key": entry.get("key", ""),
            "category": cat,
            "usage": 0,
            "params": [],
        })
        existing_ids.add(model_id)

    if routing_models:
        if "routing" not in block_types:
            block_types["routing"] = {
                "label": "Split / Merge",
                "models": [],
            }
        block_types["routing"]["models"].extend(routing_models)

    # ---- 3. Add missing IO models ----
    added_io = 0
    for entry in catalogue:
        cat = entry.get("category")
        model_id = entry.get("id")
        if cat not in ("input", "output"):
            continue
        if model_id in existing_io_ids:
            continue
        section = "inputs" if cat == "input" else "outputs"
        io_models[section]["models"].append({
            "id": model_id,
            "name": entry.get("name") or entry.get("key", ""),
            "params": [],
        })
        existing_io_ids.add(model_id)
        added_io += 1

    # ---- Save ----
    save_json(BLOCK_TYPES_PATH, block_types)
    save_json(IO_MODELS_PATH, io_models)

    print(f"Added {added_stereo} stereo variants to blockTypes.json")
    print(f"Added {len(routing_models)} routing blocks to blockTypes.json")
    print(f"Added {added_io} missing IO models to ioModels.json")
    print(f"Total models in blockTypes.json: {sum(len(g.get('models', [])) for g in block_types.values())}")


if __name__ == "__main__":
    main()
