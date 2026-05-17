#!/usr/bin/env python3
"""Generate IO model JSON (inputs/outputs) for the mobile app."""
import argparse
import json
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from scripts.generate_helix_model_json import (  # noqa: E402
    DEFAULT_APP_RES,
    DEFAULT_CONTROLS,
    DEFAULT_MODELDEFS,
    DEFAULT_UIDEFS,
    load_controls,
    load_modeldefs,
    load_uidefs,
)

DEFAULT_MODEL_CATALOG = f"{DEFAULT_APP_RES}/P35ModelCatalog.json"
DEFAULT_OUTPUT = ROOT / "mobile" / "src" / "data" / "ioModels.json"


def load_catalog(path: str):
    if not os.path.exists(path):
        raise FileNotFoundError(path)
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def find_category(catalog, name: str):
    if isinstance(catalog, dict) and "categories" in catalog:
        categories = catalog.get("categories", [])
    elif isinstance(catalog, list):
        categories = catalog
    else:
        categories = []
    for entry in categories:
        if isinstance(entry, dict) and entry.get("name") == name:
            return entry
    return None


def build_param_list(model_key, modeldef, uidef, controls):
    params = []
    if not modeldef or not uidef:
        return params
    params_map = modeldef.get("params", {}) if isinstance(modeldef, dict) else {}
    uiparams = uidef.get("params", []) if isinstance(uidef, dict) else []
    for item in uiparams:
        if not isinstance(item, dict):
            continue
        key = item.get("id")
        if not key:
            continue
        info = params_map.get(key)
        faux = bool(item.get("faux"))
        if not faux and not isinstance(info, dict):
            continue
        display_tag = item.get("display_tag")
        options = None
        if isinstance(display_tag, list):
            options = display_tag
        elif isinstance(display_tag, str):
            ctrl = controls.get(display_tag)
            if isinstance(ctrl, dict) and ctrl.get("isDiscrete") and isinstance(ctrl.get("format"), list):
                options = ctrl.get("format")
        if faux:
            params.append(
                {
                    "id": None,
                    "key": key,
                    "name": item.get("name") or key,
                    "type": "i",
                    "min": item.get("min"),
                    "max": item.get("max"),
                    "def": item.get("def"),
                    "display_tag": display_tag,
                    "options": options,
                    "faux": True,
                    "property_key": key,
                }
            )
        else:
            params.append(
                {
                    "id": info.get("id"),
                    "key": key,
                    "name": item.get("name") or key,
                    "type": info.get("type"),
                    "min": info.get("min"),
                    "max": info.get("max"),
                    "def": info.get("def"),
                    "display_tag": display_tag,
                    "options": options,
                    "faux": False,
                    "property_key": None,
                }
            )
    return params


def build_models(category, modeldefs, uidefs, controls):
    models = []
    if not category:
        return models
    for model_key in category.get("models", []):
        modeldef = modeldefs.get(model_key)
        uidef = uidefs.get(model_key)
        if not isinstance(modeldef, dict) or not isinstance(uidef, dict):
            continue
        params = build_param_list(model_key, modeldef, uidef, controls)
        models.append(
            {
                "id": modeldef.get("id"),
                "key": model_key,
                "name": uidef.get("name") or model_key,
                "params": params,
            }
        )
    return models


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--catalog", default=DEFAULT_MODEL_CATALOG)
    ap.add_argument("--modeldefs", default=DEFAULT_MODELDEFS)
    ap.add_argument("--uidefs", default=DEFAULT_UIDEFS)
    ap.add_argument("--controls", default=DEFAULT_CONTROLS)
    ap.add_argument("--output", default=str(DEFAULT_OUTPUT))
    args = ap.parse_args()

    catalog = load_catalog(args.catalog)
    modeldefs = load_modeldefs(args.modeldefs)
    uidefs = load_uidefs(args.uidefs)
    controls = load_controls(args.controls)

    input_cat = find_category(catalog, "Input")
    output_cat = find_category(catalog, "Output")

    data = {
        "inputs": {
            "label": "Input",
            "models": build_models(input_cat, modeldefs, uidefs, controls),
        },
        "outputs": {
            "label": "Output",
            "models": build_models(output_cat, modeldefs, uidefs, controls),
        },
    }

    out_path = Path(args.output)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(data, indent=2, sort_keys=False), encoding="utf-8")
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    main()
