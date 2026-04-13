#!/usr/bin/env python3
"""Regenerate mobile blockTypes.json with parameter metadata."""

import argparse
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
    clean_number,
    compute_display_range,
    compute_display_value,
    find_description,
    get_param_meta_for_model,
    infer_unit,
    load_controls,
    load_modeldefs,
    load_param_meta,
    load_uidefs,
)

DEFAULT_INPUT = ROOT / "mobile" / "src" / "data" / "blockTypes.json"


def resolve_options(display_tag, control, param_type: str):
    if isinstance(display_tag, list):
        return [str(item) for item in display_tag]
    if isinstance(control, dict) and control.get("isDiscrete") and isinstance(control.get("format"), list):
        options = control.get("format")
        if all(isinstance(item, str) for item in options):
            return list(options)
    if param_type == "b":
        return ["Off", "On"]
    return None


def build_block_param_list(model_key, model_info, uidef, param_meta, controls):
    params = []
    model_params = model_info.get("params") or {}
    if not isinstance(model_params, dict):
        return params
    if not isinstance(uidef, dict):
        return params
    for item in uidef.get("params", []):
        if not isinstance(item, dict):
            continue
        param_key = item.get("id")
        if not param_key:
            continue
        info = model_params.get(param_key)
        if not isinstance(info, dict):
            continue
        param_type = str(info.get("type") or "f")
        display_tag = item.get("display_tag")
        control_key = display_tag if isinstance(display_tag, str) else None
        control = controls.get(control_key) if control_key else None
        raw_min = info.get("min")
        raw_max = info.get("max")
        raw_default = info.get("def")
        display_min, display_max = compute_display_range(raw_min, raw_max, control_key, controls)
        display_default = compute_display_value(raw_default, control_key, controls)
        options = resolve_options(display_tag, control, param_type)
        desc_key = item.get("desc_key") or param_key
        desc = find_description(param_meta, [desc_key, param_key, item.get("name")])
        params.append(
            {
                "id": info.get("id"),
                "key": param_key,
                "name": item.get("name") or param_key,
                "type": param_type,
                "min": clean_number(raw_min),
                "max": clean_number(raw_max),
                "def": clean_number(raw_default),
                "display_min": clean_number(display_min if display_min is not None else raw_min),
                "display_max": clean_number(display_max if display_max is not None else raw_max),
                "display_def": clean_number(display_default if display_default is not None else raw_default),
                "unit": infer_unit(control_key, controls),
                "options": options,
                "description": desc or "",
            }
        )
    return params


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
    ap.add_argument("--controls", default=DEFAULT_CONTROLS)
    ap.add_argument("--param-meta", default=DEFAULT_PARAM_META)
    args = ap.parse_args()

    block_types = json.loads(Path(args.input).read_text(encoding="utf-8"))
    modeldefs = load_modeldefs(args.modeldefs)
    uidefs = load_uidefs(args.uidefs)
    controls = load_controls(args.controls)
    param_meta_all, param_meta_by_symbol = load_param_meta(args.param_meta)
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
            updated += 1

    output_path = Path(args.output)
    output_path.write_text(json.dumps(block_types, indent=2, sort_keys=False), encoding="utf-8")
    print(f"Wrote {output_path} ({updated} models updated, {len(missing_models)} missing)")
    if missing_models:
        print("Missing model defs:")
        for key in missing_models[:20]:
            print(f"  - {key}")
        if len(missing_models) > 20:
            print(f"  ... and {len(missing_models) - 20} more")


if __name__ == "__main__":
    main()
