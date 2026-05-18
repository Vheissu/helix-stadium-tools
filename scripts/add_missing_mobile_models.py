#!/usr/bin/env python3
"""Add missing stereo variants, routing blocks, and IO models to mobile data files.

The Helix device reports stereo model IDs when blocks are on a stereo signal
path, but blockTypes.json only contained mono variants.  This script clones
each mono entry for its stereo counterpart so the mobile app can resolve all
model IDs to human-readable names.

It also adds join/split routing blocks and any missing IO models.
"""

import copy
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from scripts.generate_helix_model_json import (  # noqa: E402
    DEFAULT_CONTROLS,
    DEFAULT_MODELDEFS,
    DEFAULT_PARAM_META,
    DEFAULT_UIDEFS,
    get_param_meta_for_model,
    index_modeldefs_by_id,
    load_controls,
    load_modeldefs,
    load_param_meta,
    load_uidefs,
    resolve_harness_model_info,
)
from scripts.generate_mobile_block_types_json import (  # noqa: E402
    build_block_param_list,
)

BLOCK_TYPES_PATH = ROOT / "mobile" / "src" / "data" / "blockTypes.json"
IO_MODELS_PATH = ROOT / "mobile" / "src" / "data" / "ioModels.json"
MODEL_ID_MAP_PATH = ROOT / "generated" / "helix-models" / "model_id_map.json"


def load_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def save_json(path, data):
    Path(path).write_text(json.dumps(data, indent=2, sort_keys=False) + "\n", encoding="utf-8")


def build_routing_metadata():
    modeldefs = load_modeldefs(DEFAULT_MODELDEFS)
    modeldefs_by_id = index_modeldefs_by_id(modeldefs)
    uidefs = load_uidefs(DEFAULT_UIDEFS)
    controls = load_controls(DEFAULT_CONTROLS)
    param_meta_all, param_meta_by_symbol = load_param_meta(DEFAULT_PARAM_META)
    metadata = {}
    for model_key, model_info in modeldefs.items():
        if not isinstance(model_info, dict):
            continue
        category = model_info.get("category")
        if category not in ("split", "join"):
            continue
        uidef = uidefs.get(model_key)
        if not isinstance(uidef, dict):
            continue
        display_name = uidef.get("name") or model_key
        param_meta = get_param_meta_for_model(
            param_meta_all,
            param_meta_by_symbol,
            model_key,
            category,
            display_name,
        )
        harness_model_info = resolve_harness_model_info(model_info, modeldefs_by_id)
        metadata[model_key] = {
            "name": display_name,
            "category": category,
            "usage": float(model_info.get("usage", 0) or 0),
            "params": build_block_param_list(
                model_key,
                model_info,
                uidef,
                param_meta,
                controls,
                harness_model_info,
            ),
        }
    return metadata


def build_routing_model_entry(entry, routing_metadata):
    key = entry.get("key", "")
    meta = routing_metadata.get(key, {})
    return {
        "id": entry.get("id"),
        "name": meta.get("name") or entry.get("name") or key,
        "key": key,
        "category": meta.get("category") or entry.get("category"),
        "usage": meta.get("usage", 0),
        "params": copy.deepcopy(meta.get("params", [])),
    }


def hydrate_existing_routing_models(block_types, routing_metadata):
    updated = 0
    for group in block_types.values():
        models = group.get("models", [])
        if not isinstance(models, list):
            continue
        for model in models:
            key = model.get("key")
            meta = routing_metadata.get(key)
            if not meta:
                continue
            next_name = meta.get("name") or model.get("name")
            next_category = meta.get("category") or model.get("category")
            next_usage = meta.get("usage", model.get("usage", 0))
            next_params = copy.deepcopy(meta.get("params", []))
            changed = (
                model.get("name") != next_name
                or model.get("category") != next_category
                or model.get("usage") != next_usage
                or model.get("params") != next_params
            )
            model["name"] = next_name
            model["category"] = next_category
            model["usage"] = next_usage
            model["params"] = next_params
            if changed:
                updated += 1
    return updated


def main():
    block_types = load_json(BLOCK_TYPES_PATH)
    io_models = load_json(IO_MODELS_PATH)
    model_id_map = load_json(MODEL_ID_MAP_PATH)
    catalogue = model_id_map["models"]
    routing_metadata = build_routing_metadata()

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

    hydrated_routing = hydrate_existing_routing_models(block_types, routing_metadata)

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
        routing_models.append(build_routing_model_entry(entry, routing_metadata))
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
    print(f"Hydrated {hydrated_routing} existing routing blocks in blockTypes.json")
    print(f"Added {len(routing_models)} routing blocks to blockTypes.json")
    print(f"Added {added_io} missing IO models to ioModels.json")
    print(f"Total models in blockTypes.json: {sum(len(g.get('models', [])) for g in block_types.values())}")


if __name__ == "__main__":
    main()
