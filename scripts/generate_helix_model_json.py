#!/usr/bin/env python3
"""Generate Helix Stadium model JSON for amps and effects.

Outputs three JSON files:
- guitar_amps.json
- bass_amps.json
- effects.json

Data sources are read from the installed Helix Stadium app bundle.
"""
import argparse
import copy
import json
import os
import re
from pathlib import Path

DEFAULT_APP_RES = "/Applications/Line6/Helix Stadium.app/Contents/Resources"
DEFAULT_UIDEFS = f"{DEFAULT_APP_RES}/P35ModelUIDefs.json"
DEFAULT_PARAM_META = f"{DEFAULT_APP_RES}/meta-data/parameter-meta"
DEFAULT_CONTROLS = f"{DEFAULT_APP_RES}/P35Controls.json"
DEFAULT_MODEL_META_DB = f"{DEFAULT_APP_RES}/ModelMetadataStore.sqlite3"
DEFAULT_BASED_ON_OVERRIDES = str(Path(__file__).with_name("based_on_overrides.json"))

EFFECT_CATEGORIES = {
    "delay",
    "distortion",
    "dynamics",
    "eq",
    "filter",
    "fxloop",
    "looper",
    "modulation",
    "pitch",
    "reverb",
    "synth",
    "volume",
    "wah",
}

CAB_CATEGORIES = {
    "cab_ir_interp",
    "ir",
}

EXCLUDE_CATEGORIES = {
    "amp",
    "preamp",
    "input",
    "output",
    "send",
    "return",
    "split",
    "join",
    "none",
    "harness",
}

TYPE_LABELS = {
    "amp": "Amp",
    "preamp": "Preamp",
    "cab_ir_interp": "Cab",
    "ir": "IR",
    "delay": "Delay",
    "distortion": "Distortion",
    "dynamics": "Dynamics",
    "eq": "EQ",
    "filter": "Filter",
    "fxloop": "FX Loop",
    "looper": "Looper",
    "modulation": "Modulation",
    "pitch": "Pitch",
    "reverb": "Reverb",
    "synth": "Synth",
    "volume": "Volume",
    "wah": "Wah",
}

UNIT_OVERRIDES = {
    "percent": "%",
}

SYNTHETIC_MODEL_FALLBACKS = {
    "HD2_PluginMono1": {"id": 416, "template_key": "HD2_FXLoopMono1", "usage": 0.0},
    "HD2_PluginStereo1_2": {"id": 262, "template_key": "HD2_FXLoopStereo1_2", "usage": 0.0},
    "HD2_PluginMono2": {"id": 419, "template_key": "HD2_FXLoopMono2", "usage": 0.0},
    "HD2_PluginMono3": {"id": 417, "template_key": "HD2_FXLoopMono3", "usage": 0.0},
    "HD2_PluginStereo3_4": {"id": 263, "template_key": "HD2_FXLoopStereo3_4", "usage": 0.0},
    "HD2_PluginMono4": {"id": 418, "template_key": "HD2_FXLoopMono4", "usage": 0.0},
}


def resolve_default_modeldefs_path(app_res: str = DEFAULT_APP_RES, prefix: str = "p35md-") -> str:
    modeldefs_dir = Path(app_res) / "modeldefs"
    candidates = list(modeldefs_dir.glob(f"{prefix}*.bin"))
    if not candidates:
        return str(modeldefs_dir / f"{prefix}1_2_0_0.bin")

    def version_key(path: Path):
        stem = path.stem
        version_text = stem[len(prefix):] if stem.startswith(prefix) else stem
        parts = []
        for piece in version_text.split("_"):
            try:
                parts.append(int(piece))
            except ValueError:
                parts.append(-1)
        return tuple(parts)

    return str(max(candidates, key=version_key))


DEFAULT_MODELDEFS = resolve_default_modeldefs_path()


def normalise_key(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", value.lower())


def augment_modeldefs_with_synthetic_entries(modeldefs):
    if not isinstance(modeldefs, dict):
        return modeldefs
    for key, spec in SYNTHETIC_MODEL_FALLBACKS.items():
        if key in modeldefs:
            continue
        template = modeldefs.get(spec["template_key"])
        if not isinstance(template, dict):
            continue
        info = copy.deepcopy(template)
        info["id"] = spec["id"]
        info["usage"] = spec.get("usage", info.get("usage"))
        modeldefs[key] = info
    return modeldefs


def param_meta_has_content(params) -> bool:
    if not isinstance(params, dict):
        return False
    return any(bool(value) for value in params.values())


def load_modeldefs(path: str):
    if not os.path.exists(path):
        raise FileNotFoundError(path)
    try:
        import msgpack  # type: ignore
    except Exception as exc:
        raise SystemExit(f"msgpack is required to parse modeldefs: {exc}")
    with open(path, "rb") as f:
        unpacker = msgpack.Unpacker(f, raw=False)
        last = None
        for obj in unpacker:
            last = obj
    if not isinstance(last, dict):
        raise ValueError("modeldefs did not yield a dict")
    return augment_modeldefs_with_synthetic_entries(last)


def load_uidefs(path: str):
    if not os.path.exists(path):
        raise FileNotFoundError(path)
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def load_controls(path: str):
    if not os.path.exists(path):
        return {}
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def normalize_based_on(value):
    if not value:
        return None
    text = value
    text = text.replace("Â", "")
    text = text.replace("®", "")
    text = text.replace("™", "")
    text = text.replace("©", "")
    text = re.sub(r"\s+", " ", text).strip()
    return text or None


def load_based_on_db(path: str):
    if not os.path.exists(path):
        return {}, {}
    try:
        import sqlite3
    except Exception:
        return {}, {}
    conn = sqlite3.connect(path)
    cur = conn.cursor()
    try:
        cur.execute("SELECT modelID, model, description FROM model_meta")
    except Exception:
        conn.close()
        return {}, {}
    by_id_sets = {}
    by_name_sets = {}
    for model_id, model_name, desc in cur.fetchall():
        if not desc:
            continue
        if model_id is not None:
            by_id_sets.setdefault(model_id, set()).add(desc)
        if model_name:
            by_name_sets.setdefault(model_name, set()).add(desc)
    conn.close()
    by_id = {}
    for key, vals in by_id_sets.items():
        if len(vals) == 1:
            by_id[key] = normalize_based_on(next(iter(vals)))
    by_name = {}
    by_name_norm = {}
    for key, vals in by_name_sets.items():
        if len(vals) == 1:
            value = normalize_based_on(next(iter(vals)))
            if not value:
                continue
            by_name[key] = value
            norm = normalise_key(key)
            by_name_norm.setdefault(norm, set()).add(value)
    # keep only non-ambiguous normalised names
    for key, vals in list(by_name_norm.items()):
        if len(vals) != 1:
            by_name_norm.pop(key, None)
    by_name_norm = {k: next(iter(v)) for k, v in by_name_norm.items()}
    return by_id, {**by_name, **by_name_norm}


def load_based_on_overrides(path: str):
    if not path or not os.path.exists(path):
        return {}
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception:
        return {}
    overrides = {}
    if isinstance(data, dict):
        for name, value in data.items():
            if not name or not value:
                continue
            overrides[normalise_key(name)] = normalize_based_on(value)
    return overrides


def resolve_based_on(name: str, model_id, overrides, by_id, by_name):
    if name:
        override = overrides.get(normalise_key(name))
        if override:
            return override
    if model_id is not None and model_id in by_id:
        return by_id[model_id]
    if name and name in by_name:
        return by_name[name]
    if name:
        norm = normalise_key(name)
        if norm in by_name:
            return by_name[norm]
    return None


def load_param_meta(root: str):
    meta = {}
    meta_by_symbol = {}
    for dirpath, _dirnames, filenames in os.walk(root):
        for name in filenames:
            if not name.endswith(".json"):
                continue
            path = os.path.join(dirpath, name)
            try:
                with open(path, "r", encoding="utf-8") as f:
                    data = json.load(f)
            except Exception:
                continue
            category = data.get("category")
            display_name = data.get("display_name")
            params = data.get("parameters-en") or {}
            symbol = data.get("symbol") or data.get("model_sym")
            if not category or not display_name:
                continue
            meta.setdefault((category, display_name), {})
            meta[(category, display_name)].update(params)
            if symbol:
                meta_by_symbol[symbol] = {
                    "category": category,
                    "display_name": display_name,
                    "params": params,
                }
    return meta, meta_by_symbol


def get_param_meta_for_model(meta, meta_by_symbol, model_key, category, display_name):
    def lookup(model_key_value, category_value, display_name_value):
        symbols = []
        if model_key_value.startswith("Agoura_"):
            rest = model_key_value[len("Agoura_"):]
            if rest.startswith("Amp"):
                symbols.append("ModelID::k" + rest.replace("Amp", "AmpAgoura", 1))
            elif rest.startswith("Preamp"):
                symbols.append("ModelID::k" + rest.replace("Preamp", "PreampAgoura", 1))
            else:
                symbols.append("ModelID::k" + rest)
        else:
            if "_" in model_key_value:
                symbols.append("ModelID::k" + model_key_value.split("_", 1)[1])
            else:
                symbols.append("ModelID::k" + model_key_value)
        for sym in symbols:
            if sym in meta_by_symbol:
                return meta_by_symbol[sym]["params"]
        if (category_value, display_name_value) in meta:
            return meta[(category_value, display_name_value)]
        for (cat, name), params in meta.items():
            if name == display_name_value:
                return params
        return {}

    # Try symbol-based lookup first
    params = lookup(model_key, category, display_name)
    if param_meta_has_content(params):
        return params
    fallback = SYNTHETIC_MODEL_FALLBACKS.get(model_key)
    if fallback:
        return lookup(fallback["template_key"], category, display_name.replace("Plugin", "FX Loop"))
    return params


def find_description(param_meta, candidates):
    for key in candidates:
        if not key:
            continue
        if key in param_meta and param_meta[key]:
            return param_meta[key]
    # normalised match
    norm_map = {normalise_key(k): v for k, v in param_meta.items() if v}
    for key in candidates:
        if not key:
            continue
        norm = normalise_key(key)
        if norm in norm_map:
            return norm_map[norm]
    return None


def compute_display_range(raw_min, raw_max, display_tag, controls):
    if not display_tag or not isinstance(display_tag, str):
        return None, None
    ctrl = controls.get(display_tag)
    if not isinstance(ctrl, dict):
        return None, None
    if "minDisplayValue" in ctrl or "maxDisplayValue" in ctrl:
        return ctrl.get("minDisplayValue"), ctrl.get("maxDisplayValue")
    scale = ctrl.get("dspToDisplayScale")
    if isinstance(scale, (int, float)):
        return raw_min * scale, raw_max * scale
    return None, None


def compute_display_value(raw_value, display_tag, controls):
    if raw_value is None:
        return None
    if not display_tag or not isinstance(display_tag, str):
        return raw_value
    ctrl = controls.get(display_tag)
    if not isinstance(ctrl, dict):
        return raw_value
    scale = ctrl.get("dspToDisplayScale")
    if isinstance(scale, (int, float)):
        return raw_value * scale
    return raw_value


def clean_number(value):
    if isinstance(value, bool) or value is None:
        return value
    if isinstance(value, int):
        return value
    if isinstance(value, float):
        if value.is_integer():
            return int(value)
        return round(value, 6)
    return value


def parse_unit_from_format(fmt: str):
    if not isinstance(fmt, str) or not fmt:
        return None
    # Convert escaped percent to literal
    s = fmt.replace("%%", "%")
    # Remove numeric printf format specifiers like %.1f
    s = re.sub(r"%[-+0-9.#]*[a-zA-Z]", "", s)
    s = s.strip()
    if not s:
        return None
    # Remove digits and punctuation left over
    s = re.sub(r"[0-9.,]+", "", s).strip()
    if not s:
        return None
    # Keep simple ASCII unit tokens
    match = re.search(r"[%A-Za-z/]+", s)
    if not match:
        return None
    return match.group(0)


def infer_unit(display_tag, controls):
    if not display_tag or not isinstance(display_tag, str):
        return "unitless"
    if display_tag in UNIT_OVERRIDES:
        return UNIT_OVERRIDES[display_tag]
    ctrl = controls.get(display_tag)
    units = []
    if isinstance(ctrl, dict):
        fmt = ctrl.get("formatUnits")
        if isinstance(fmt, str):
            unit = parse_unit_from_format(fmt)
            if unit:
                units.append(unit)
        elif isinstance(fmt, list):
            for item in fmt:
                if isinstance(item, dict):
                    unit = parse_unit_from_format(item.get("formatUnits"))
                    if unit:
                        units.append(unit)
        fmt_list = ctrl.get("format")
        if isinstance(fmt_list, list):
            for item in fmt_list:
                if isinstance(item, dict):
                    unit = parse_unit_from_format(item.get("formatUnits"))
                    if unit:
                        units.append(unit)
    units = [u for u in units if u]
    if units:
        # Prefer ms when both ms/sec are present (values are ms after scaling)
        if "ms" in units:
            return "ms"
        if "%" in units:
            return "%"
        return units[0]
    tag = display_tag.lower()
    if "ms" in tag:
        return "ms"
    if "sec" in tag:
        return "sec"
    if "hz" in tag:
        return "Hz"
    if "db" in tag:
        return "dB"
    if "percent" in tag or "pct" in tag:
        return "%"
    return "unitless"


def build_param_list(model_key, model_info, uidef, param_meta, controls):
    params = []
    model_params = model_info.get("params") or {}
    ui_params = {}
    ui_param_keys = set()
    if isinstance(uidef, dict):
        for p in uidef.get("params", []):
            pid = p.get("id")
            if pid:
                ui_param_keys.add(pid)
                ui_params[pid] = {
                    "name": p.get("name"),
                    "desc_key": p.get("desc_key"),
                    "display_tag": p.get("display_tag"),
                }
                if p.get("desc_key"):
                    ui_param_keys.add(p.get("desc_key"))
    for pkey, pinfo in model_params.items():
        if not isinstance(pinfo, dict):
            continue
        if ui_param_keys and pkey not in ui_param_keys:
            # skip hidden params
            continue
        raw_min = pinfo.get("min")
        raw_max = pinfo.get("max")
        raw_def = pinfo.get("def")
        ui = ui_params.get(pkey, {})
        name = ui.get("name") or pkey
        desc_key = ui.get("desc_key") or pkey
        display_tag = ui.get("display_tag")
        options = None
        if isinstance(display_tag, list):
            options = display_tag
            display_tag = None
        desc = find_description(param_meta, [desc_key, pkey, name])
        display_min, display_max = compute_display_range(raw_min, raw_max, display_tag, controls)
        display_def = compute_display_value(raw_def, display_tag, controls)
        entry = {
            "name": name,
            "description": desc or "",
        }
        if options:
            idx = None
            if isinstance(raw_def, (int, float)):
                if isinstance(raw_min, (int, float)):
                    idx = int(round(raw_def - raw_min))
                else:
                    idx = int(round(raw_def))
            if idx is not None and 0 <= idx < len(options):
                entry["default"] = options[idx]
            entry["options"] = options
        else:
            entry["min"] = clean_number(display_min if display_min is not None else raw_min)
            entry["max"] = clean_number(display_max if display_max is not None else raw_max)
            entry["default"] = clean_number(display_def)
            entry["unit"] = infer_unit(display_tag, controls)
        params.append(entry)
    return params


def is_legacy(uidef):
    if not isinstance(uidef, dict):
        return False
    focus = uidef.get("focus_bg_image") or ""
    if "LEGACY" in focus.upper():
        return True
    name = uidef.get("name") or ""
    if "legacy" in name.lower():
        return True
    return False


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--modeldefs", default=DEFAULT_MODELDEFS)
    ap.add_argument("--uidefs", default=DEFAULT_UIDEFS)
    ap.add_argument("--param-meta", default=DEFAULT_PARAM_META)
    ap.add_argument("--controls", default=DEFAULT_CONTROLS)
    ap.add_argument("--model-meta-db", default=DEFAULT_MODEL_META_DB)
    ap.add_argument("--based-on-overrides", default=DEFAULT_BASED_ON_OVERRIDES)
    ap.add_argument("--out-dir", default="/Users/dwayne/Code/helix-editor/generated/helix-models")
    args = ap.parse_args()

    modeldefs = load_modeldefs(args.modeldefs)
    uidefs = load_uidefs(args.uidefs)
    controls = load_controls(args.controls)
    param_meta_all, param_meta_by_symbol = load_param_meta(args.param_meta)
    based_on_by_id, based_on_by_name = load_based_on_db(args.model_meta_db)
    based_on_overrides = load_based_on_overrides(args.based_on_overrides)

    guitar_amps = []
    bass_amps = []
    effects = []
    guitar_cabs = []
    bass_cabs = []
    ir_cabs = []

    for model_key, model_info in modeldefs.items():
        if not isinstance(model_info, dict):
            continue
        category = model_info.get("category")
        if not category:
            continue
        uidef = uidefs.get(model_key, {})
        if is_legacy(uidef):
            continue
        name = uidef.get("name") or model_key
        model_class = uidef.get("class")
        dsp = uidef.get("dsp")
        is_agoura = model_key.startswith("Agoura_") or dsp == "agoura"
        model_id = model_info.get("id")
        based_on = resolve_based_on(name, model_id, based_on_overrides, based_on_by_id, based_on_by_name)

        if category in ("amp", "preamp"):
            if model_class == "Guitar":
                group = guitar_amps
            elif model_class == "Bass":
                group = bass_amps
            else:
                continue
            param_meta = get_param_meta_for_model(param_meta_all, param_meta_by_symbol, model_key, category, name)
            params = build_param_list(model_key, model_info, uidef, param_meta, controls)
            group.append({
                "name": name,
                "type": TYPE_LABELS.get(category, category.title()),
                "is_agoura": is_agoura,
                "based_on": based_on,
                "params": params,
            })
            continue

        if category in CAB_CATEGORIES:
            if model_class == "Bass":
                group = bass_cabs
            elif model_class == "IR" or category == "ir":
                group = ir_cabs
            else:
                group = guitar_cabs
            meta_category = "cab" if category == "cab_ir_interp" else category
            param_meta = get_param_meta_for_model(param_meta_all, param_meta_by_symbol, model_key, meta_category, name)
            params = build_param_list(model_key, model_info, uidef, param_meta, controls)
            group.append({
                "name": name,
                "type": TYPE_LABELS.get(category, category.title()),
                "is_agoura": is_agoura,
                "based_on": based_on,
                "params": params,
            })
            continue

        if category in EFFECT_CATEGORIES:
            param_meta = get_param_meta_for_model(param_meta_all, param_meta_by_symbol, model_key, category, name)
            params = build_param_list(model_key, model_info, uidef, param_meta, controls)
            effects.append({
                "name": name,
                "type": TYPE_LABELS.get(category, category.title()),
                "is_agoura": is_agoura,
                "based_on": based_on,
                "params": params,
            })
            continue

        # Ignore non-effect infrastructure blocks
        if category in EXCLUDE_CATEGORIES:
            continue

    guitar_amps.sort(key=lambda x: x["name"])
    bass_amps.sort(key=lambda x: x["name"])
    effects.sort(key=lambda x: x["name"])
    guitar_cabs.sort(key=lambda x: x["name"])
    bass_cabs.sort(key=lambda x: x["name"])
    ir_cabs.sort(key=lambda x: x["name"])

    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    (out_dir / "guitar_amps.json").write_text(json.dumps(guitar_amps, indent=2))
    (out_dir / "bass_amps.json").write_text(json.dumps(bass_amps, indent=2))
    (out_dir / "effects.json").write_text(json.dumps(effects, indent=2))
    (out_dir / "guitar_cabs.json").write_text(json.dumps(guitar_cabs, indent=2))
    (out_dir / "bass_cabs.json").write_text(json.dumps(bass_cabs, indent=2))
    (out_dir / "ir_cabs.json").write_text(json.dumps(ir_cabs, indent=2))
    (out_dir / "all_models.json").write_text(json.dumps({
        "guitar_amps": guitar_amps,
        "bass_amps": bass_amps,
        "effects": effects,
        "guitar_cabs": guitar_cabs,
        "bass_cabs": bass_cabs,
        "ir_cabs": ir_cabs,
    }, indent=2))

    def build_compact(models):
        param_defs = []
        param_index = {}

        def intern_param(param):
            key = json.dumps(param, sort_keys=True, separators=(",", ":"))
            if key in param_index:
                return param_index[key]
            idx = len(param_defs)
            param_index[key] = idx
            param_defs.append(param)
            return idx

        compact_models = []
        for model in models:
            param_ids = [intern_param(p) for p in model.get("params", [])]
            compact_model = {k: v for k, v in model.items() if k != "params"}
            compact_model["param_ids"] = param_ids
            compact_models.append(compact_model)

        return {"param_defs": param_defs, "models": compact_models}

    groups = {
        "guitar_amps": guitar_amps,
        "bass_amps": bass_amps,
        "effects": effects,
        "guitar_cabs": guitar_cabs,
        "bass_cabs": bass_cabs,
        "ir_cabs": ir_cabs,
    }

    print(
        f"wrote {len(guitar_amps)} guitar amps, {len(bass_amps)} bass amps, {len(effects)} effects, "
        f"{len(guitar_cabs)} guitar cabs, {len(bass_cabs)} bass cabs, {len(ir_cabs)} ir cabs to {out_dir}"
    )


if __name__ == "__main__":
    main()
