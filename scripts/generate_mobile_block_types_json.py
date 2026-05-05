#!/usr/bin/env python3
"""Regenerate mobile blockTypes.json with parameter metadata."""

import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from scripts.generate_helix_model_json import (  # noqa: E402
    DEFAULT_APP_RES,
    DEFAULT_CONTROLS,
    DEFAULT_MODELDEFS,
    DEFAULT_PARAM_META,
    DEFAULT_UIDEFS,
    build_detailed_param_list,
    get_param_meta_for_model,
    load_controls,
    load_based_on_db,
    load_based_on_overrides,
    load_modeldefs,
    load_param_meta,
    load_uidefs,
    resolve_based_on,
    DEFAULT_BASED_ON_OVERRIDES,
    DEFAULT_MODEL_META_DB,
)

DEFAULT_INPUT = ROOT / "mobile" / "src" / "data" / "blockTypes.json"
DEFAULT_MODEL_CATALOG = str(Path(DEFAULT_APP_RES) / "P35ModelCatalog.json")

CATALOG_GROUPS = {
    "Amp": ("amp", "Amp"),
    "Preamp": ("preamp", "Preamp"),
    "Cab": ("cab", "Cab"),
    "Distortion": ("distortion", "Distortion"),
    "Delay": ("delay", "Delay"),
    "Reverb": ("reverb", "Reverb"),
    "Modulation": ("modulation", "Modulation"),
    "Dynamics": ("dynamics", "Dynamics"),
    "EQ": ("eq", "EQ"),
    "Pitch/Synth": ("pitch_synth", "Pitch / Synth"),
    "Wah/Filter": ("wah_filter", "Wah / Filter"),
    "Volume/Pan": ("volume_pan", "Volume / Pan"),
    "Looper": ("looper", "Looper"),
    "FX Loop": ("fx_loop", "FX Loop"),
    "Split": ("routing", "Split / Merge"),
    "Merge": ("routing", "Split / Merge"),
}


def build_block_param_list(model_key, model_info, uidef, param_meta, controls):
    return build_detailed_param_list(model_key, model_info, uidef, param_meta, controls)


def load_model_catalog(path: str):
    catalog_path = Path(path)
    if not catalog_path.exists():
        return []
    data = json.loads(catalog_path.read_text(encoding="utf-8"))
    if isinstance(data, dict):
        categories = data.get("categories", [])
    elif isinstance(data, list):
        categories = data
    else:
        categories = []
    return [category for category in categories if isinstance(category, dict)]


def build_catalog_model_entry(
    model_key,
    modeldefs,
    uidefs,
    param_meta_all,
    param_meta_by_symbol,
    controls,
    based_on_overrides=None,
    based_on_by_id=None,
    based_on_by_name=None,
):
    model_info = modeldefs.get(model_key)
    uidef = uidefs.get(model_key)
    if not isinstance(model_info, dict) or not isinstance(uidef, dict):
        return None

    category = model_info.get("category")
    display_name = uidef.get("name") or model_key
    model_id = model_info.get("id")
    meta_category = "cab" if category == "cab_ir_interp" else category
    param_meta = get_param_meta_for_model(
        param_meta_all,
        param_meta_by_symbol,
        model_key,
        meta_category,
        display_name,
    )
    return {
        "id": model_id,
        "name": display_name,
        "based_on": resolve_based_on(
            display_name,
            model_id,
            based_on_overrides or {},
            based_on_by_id or {},
            based_on_by_name or {},
        ),
        "key": model_key,
        "category": category,
        "usage": float(model_info.get("usage", 0) or 0),
        "params": build_block_param_list(model_key, model_info, uidef, param_meta, controls),
    }


def add_missing_catalog_models(
    block_types,
    catalog_categories,
    modeldefs,
    uidefs,
    param_meta_all,
    param_meta_by_symbol,
    controls,
    based_on_overrides=None,
    based_on_by_id=None,
    based_on_by_name=None,
):
    existing_keys = set()
    existing_ids = set()
    for group in block_types.values():
        models = group.get("models", [])
        if not isinstance(models, list):
            continue
        for model in models:
            if model.get("key"):
                existing_keys.add(model.get("key"))
            if isinstance(model.get("id"), int):
                existing_ids.add(model.get("id"))

    added = 0
    skipped = []
    for category in catalog_categories:
        category_name = category.get("name")
        group_spec = CATALOG_GROUPS.get(category_name)
        if not group_spec:
            continue
        group_key, label = group_spec
        group = block_types.setdefault(group_key, {"label": label, "models": []})
        if not isinstance(group.get("models"), list):
            group["models"] = []

        for model_key in category.get("models", []):
            if not model_key or model_key in existing_keys:
                continue
            entry = build_catalog_model_entry(
                model_key,
                modeldefs,
                uidefs,
                param_meta_all,
                param_meta_by_symbol,
                controls,
                based_on_overrides,
                based_on_by_id,
                based_on_by_name,
            )
            if not entry:
                skipped.append(model_key)
                continue
            model_id = entry.get("id")
            if isinstance(model_id, int) and model_id in existing_ids:
                continue
            group["models"].append(entry)
            existing_keys.add(model_key)
            if isinstance(model_id, int):
                existing_ids.add(model_id)
            added += 1
    return added, skipped


def preserve_missing_model_entry(model):
    if not isinstance(model.get("params"), list):
        model["params"] = []
    if model.get("usage") is None:
        model["usage"] = 0


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--input", default=str(DEFAULT_INPUT))
    ap.add_argument("--output", default=str(DEFAULT_INPUT))
    ap.add_argument("--modeldefs", default=DEFAULT_MODELDEFS)
    ap.add_argument("--uidefs", default=DEFAULT_UIDEFS)
    ap.add_argument("--catalog", default=DEFAULT_MODEL_CATALOG)
    ap.add_argument("--controls", default=DEFAULT_CONTROLS)
    ap.add_argument("--param-meta", default=DEFAULT_PARAM_META)
    ap.add_argument("--model-meta-db", default=DEFAULT_MODEL_META_DB)
    ap.add_argument("--based-on-overrides", default=DEFAULT_BASED_ON_OVERRIDES)
    args = ap.parse_args()

    block_types = json.loads(Path(args.input).read_text(encoding="utf-8"))
    modeldefs = load_modeldefs(args.modeldefs)
    uidefs = load_uidefs(args.uidefs)
    catalog_categories = load_model_catalog(args.catalog)
    controls = load_controls(args.controls)
    param_meta_all, param_meta_by_symbol = load_param_meta(args.param_meta)
    based_on_by_id, based_on_by_name = load_based_on_db(args.model_meta_db)
    based_on_overrides = load_based_on_overrides(args.based_on_overrides)
    usage_by_id = {}
    for info in modeldefs.values():
        if not isinstance(info, dict):
            continue
        model_id = info.get("id")
        usage = info.get("usage")
        if isinstance(model_id, int) and isinstance(usage, (int, float)):
            usage_by_id[model_id] = float(usage)

    missing_models = []
    updated = 0
    for group in block_types.values():
        models = group.get("models", [])
        if not isinstance(models, list):
            continue
        for model in models:
            model_key = model.get("key")
            if not model_key:
                continue
            model_info = modeldefs.get(model_key)
            uidef = uidefs.get(model_key)
            if not isinstance(model_info, dict) or not isinstance(uidef, dict):
                missing_models.append(model_key)
                # Preserve inherited metadata for synthetic/stereo clones that do not
                # have standalone modeldefs entries in the app bundle.
                preserve_missing_model_entry(model)
                continue
            model_id = model_info.get("id")
            category = model_info.get("category")
            display_name = uidef.get("name") or model.get("name") or model_key
            meta_category = "cab" if category == "cab_ir_interp" else category
            param_meta = get_param_meta_for_model(
                param_meta_all,
                param_meta_by_symbol,
                model_key,
                meta_category,
                display_name,
            )
            model["params"] = build_block_param_list(model_key, model_info, uidef, param_meta, controls)
            model["usage"] = usage_by_id.get(model_id, model.get("usage", 0) or 0)
            model["based_on"] = resolve_based_on(
                display_name,
                model_id,
                based_on_overrides,
                based_on_by_id,
                based_on_by_name,
            )
            updated += 1

    added, skipped_catalog_models = add_missing_catalog_models(
        block_types,
        catalog_categories,
        modeldefs,
        uidefs,
        param_meta_all,
        param_meta_by_symbol,
        controls,
        based_on_overrides,
        based_on_by_id,
        based_on_by_name,
    )

    output_path = Path(args.output)
    output_path.write_text(json.dumps(block_types, indent=2, sort_keys=False), encoding="utf-8")
    print(
        f"Wrote {output_path} "
        f"({updated} models updated, {added} models added, "
        f"{len(missing_models)} inherited entries preserved)"
    )
    if missing_models:
        print("Inherited entries without standalone modeldefs:")
        for key in missing_models[:20]:
            print(f"  - {key}")
        if len(missing_models) > 20:
            print(f"  ... and {len(missing_models) - 20} more")
    if skipped_catalog_models:
        print("Skipped catalog models without defs:")
        for key in skipped_catalog_models[:20]:
            print(f"  - {key}")
        if len(skipped_catalog_models) > 20:
            print(f"  ... and {len(skipped_catalog_models) - 20} more")


if __name__ == "__main__":
    main()
