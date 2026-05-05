#!/usr/bin/env python3
"""Generate upload-ready Markdown knowledge files for a Helix Stadium custom GPT."""

import argparse
import math
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from scripts.generate_helix_model_json import (  # noqa: E402
    CAB_CATEGORIES,
    DEFAULT_BASED_ON_OVERRIDES,
    DEFAULT_CONTROLS,
    DEFAULT_MODELDEFS,
    DEFAULT_MODEL_META_DB,
    DEFAULT_PARAM_META,
    DEFAULT_UIDEFS,
    EFFECT_CATEGORIES,
    EXCLUDE_CATEGORIES,
    TYPE_LABELS,
    build_detailed_param_list,
    get_param_meta_for_model,
    is_legacy,
    load_based_on_db,
    load_based_on_overrides,
    load_controls,
    load_modeldefs,
    load_param_meta,
    load_uidefs,
    resolve_based_on,
)

DEFAULT_OUT_DIR = ROOT / "generated" / "helix-gpt-knowledge"

CATEGORY_SPECS = [
    {
        "key": "guitar-amps-and-preamps",
        "title": "Guitar amps and preamps",
        "description": "Guitar amp and preamp blocks extracted from the Helix Stadium desktop app bundle.",
    },
    {
        "key": "bass-amps-and-preamps",
        "title": "Bass amps and preamps",
        "description": "Bass amp and preamp blocks extracted from the Helix Stadium desktop app bundle.",
    },
    {
        "key": "effects-delay",
        "title": "Effects: delay",
        "description": "Delay blocks extracted from the Helix Stadium desktop app bundle.",
    },
    {
        "key": "effects-distortion",
        "title": "Effects: distortion",
        "description": "Distortion blocks extracted from the Helix Stadium desktop app bundle.",
    },
    {
        "key": "effects-dynamics",
        "title": "Effects: dynamics",
        "description": "Dynamics blocks extracted from the Helix Stadium desktop app bundle.",
    },
    {
        "key": "effects-eq",
        "title": "Effects: EQ",
        "description": "EQ blocks extracted from the Helix Stadium desktop app bundle.",
    },
    {
        "key": "effects-filter",
        "title": "Effects: filter",
        "description": "Filter blocks extracted from the Helix Stadium desktop app bundle.",
    },
    {
        "key": "effects-fxloop",
        "title": "Effects: FX Loop",
        "description": "FX Loop blocks extracted from the Helix Stadium desktop app bundle.",
    },
    {
        "key": "effects-looper",
        "title": "Effects: looper",
        "description": "Looper blocks extracted from the Helix Stadium desktop app bundle.",
    },
    {
        "key": "effects-modulation",
        "title": "Effects: modulation",
        "description": "Modulation blocks extracted from the Helix Stadium desktop app bundle.",
    },
    {
        "key": "effects-pitch",
        "title": "Effects: pitch",
        "description": "Pitch blocks extracted from the Helix Stadium desktop app bundle.",
    },
    {
        "key": "effects-reverb",
        "title": "Effects: reverb",
        "description": "Reverb blocks extracted from the Helix Stadium desktop app bundle.",
    },
    {
        "key": "effects-synth",
        "title": "Effects: synth",
        "description": "Synth blocks extracted from the Helix Stadium desktop app bundle.",
    },
    {
        "key": "effects-volume",
        "title": "Effects: volume",
        "description": "Volume and pan blocks extracted from the Helix Stadium desktop app bundle.",
    },
    {
        "key": "effects-wah",
        "title": "Effects: wah",
        "description": "Wah blocks extracted from the Helix Stadium desktop app bundle.",
    },
    {
        "key": "guitar-cabs",
        "title": "Guitar cabs",
        "description": "Guitar cab blocks extracted from the Helix Stadium desktop app bundle.",
    },
    {
        "key": "bass-cabs",
        "title": "Bass cabs",
        "description": "Bass cab blocks extracted from the Helix Stadium desktop app bundle.",
    },
    {
        "key": "ir-cabs",
        "title": "IR cabs",
        "description": "IR cab blocks extracted from the Helix Stadium desktop app bundle.",
    },
]

UPLOAD_PACK_SPECS = [
    {
        "title": "Guitar amps and preamps",
        "description": "Upload-ready knowledge for guitar amp and preamp blocks.",
        "filename_prefix": "guitar-amps-and-preamps",
        "group_keys": ["guitar-amps-and-preamps"],
        "split_into": 3,
    },
    {
        "title": "Bass amps and preamps",
        "description": "Upload-ready knowledge for bass amp and preamp blocks.",
        "filename": "bass-amps-and-preamps.md",
        "group_keys": ["bass-amps-and-preamps"],
    },
    {
        "title": "All cabs and IRs",
        "description": "Upload-ready knowledge for guitar cabs, bass cabs, and IR cabs.",
        "filename": "all-cabs-and-irs.md",
        "group_keys": ["guitar-cabs", "bass-cabs", "ir-cabs"],
    },
    {
        "title": "Effects: drive, dynamics, EQ, filter, and utility",
        "description": "Upload-ready knowledge for distortion, dynamics, EQ, filter, FX Loop, looper, and volume/pan blocks.",
        "filename": "effects-drive-dynamics-eq-filter-utility.md",
        "group_keys": [
            "effects-distortion",
            "effects-dynamics",
            "effects-eq",
            "effects-filter",
            "effects-fxloop",
            "effects-looper",
            "effects-volume",
        ],
    },
    {
        "title": "Effects: delay and reverb",
        "description": "Upload-ready knowledge for delay and reverb blocks.",
        "filename": "effects-delay-and-reverb.md",
        "group_keys": ["effects-delay", "effects-reverb"],
    },
    {
        "title": "Effects: modulation, pitch, synth, and wah",
        "description": "Upload-ready knowledge for modulation, pitch, synth, and wah blocks.",
        "filename": "effects-modulation-pitch-synth-wah.md",
        "group_keys": ["effects-modulation", "effects-pitch", "effects-synth", "effects-wah"],
    },
]

MINIMAL_UPLOAD_PACK_SPECS = [
    {
        "title": "Amps and preamps",
        "description": "Minimal upload pack covering guitar and bass amp and preamp blocks.",
        "filename_prefix": "amps-and-preamps",
        "group_keys": ["guitar-amps-and-preamps", "bass-amps-and-preamps"],
        "split_into": 2,
    },
    {
        "title": "Cabs and IRs",
        "description": "Minimal upload pack covering guitar cabs, bass cabs, and IR cabs.",
        "filename": "cabs-and-irs.md",
        "group_keys": ["guitar-cabs", "bass-cabs", "ir-cabs"],
    },
    {
        "title": "All effects",
        "description": "Minimal upload pack covering all effect categories.",
        "filename": "all-effects.md",
        "group_keys": [
            "effects-distortion",
            "effects-dynamics",
            "effects-eq",
            "effects-filter",
            "effects-fxloop",
            "effects-looper",
            "effects-volume",
            "effects-delay",
            "effects-reverb",
            "effects-modulation",
            "effects-pitch",
            "effects-synth",
            "effects-wah",
        ],
    },
]


def format_scalar(value):
    if isinstance(value, bool):
        return "On" if value else "Off"
    return str(value)


def format_display_range(param):
    unit = param.get("unit") or "unitless"
    return f"`{format_scalar(param.get('display_min'))}` to `{format_scalar(param.get('display_max'))}` {unit}"


def format_raw_range(param):
    return f"`{format_scalar(param.get('min'))}` to `{format_scalar(param.get('max'))}`"


def format_param_line(param):
    parts = [
        f"`{param['name']}` (`key: {param['key']}`, `id: {param['id']}`, `type: {param['type']}`):",
    ]
    options = param.get("options")
    if options:
        valid_values = ", ".join(f"`{option}`" for option in options)
        default_value = param.get("display_def")
        raw_default = param.get("def")
        raw_min = param.get("min")
        if isinstance(raw_default, (int, float)) and isinstance(raw_min, (int, float)):
            default_index = int(round(raw_default - raw_min))
            if 0 <= default_index < len(options):
                default_value = options[default_index]
        parts.append(f"valid values {valid_values}; default `{format_scalar(default_value)}`.")
    else:
        parts.append(
            f"display range {format_display_range(param)}; default `{format_scalar(param.get('display_def'))}`."
        )
    raw_range = format_raw_range(param)
    parts.append(f"Raw range {raw_range}; raw default `{format_scalar(param.get('def'))}`.")
    description = (param.get("description") or "").strip()
    if description:
        parts.append(description)
    return " ".join(parts)


def format_optional_text(value, fallback):
    if value in (None, ""):
        return fallback
    return str(value)


def render_model_section(model):
    lines = [
        f"## {model['name']}",
        "",
        f"- Model key: `{model['key']}`",
        f"- Model ID: `{model['id']}`",
        f"- Type: {model['type']}",
        f"- Category: `{model['category']}`",
        f"- Class: {format_optional_text(model.get('class'), 'Unknown')}",
        f"- DSP usage: {format_optional_text(model.get('usage'), 'Unknown')}",
        f"- Based on: {format_optional_text(model.get('based_on'), 'Unknown')}",
        f"- Agoura model: {'Yes' if model.get('is_agoura') else 'No'}",
        "",
        "### Parameters",
    ]
    if model["params"]:
        lines.append("")
        for param in model["params"]:
            lines.append(f"- {format_param_line(param)}")
    else:
        lines.extend(["", "- No editable parameters were extracted for this model."])
    return "\n".join(lines)


def render_knowledge_document(title, description, models, generated_at, upload_note=True):
    lines = [
        f"# {title}",
        "",
        description,
        "",
        f"Generated from the installed Helix Stadium desktop app bundle on {generated_at}.",
        "",
    ]
    if upload_note:
        lines.extend(
            [
                "Use display values for normal user-facing answers. Use model keys, IDs, and raw ranges only when the user asks for automation or low-level control details.",
                "",
            ]
        )
    lines.append(f"Model count: {len(models)}")
    for model in models:
        lines.extend(["", "---", "", render_model_section(model)])
    return "\n".join(lines).strip() + "\n"


def render_instructions_document(generated_at):
    return (
        "# Helix Stadium Custom GPT Instructions\n\n"
        "Paste the block below into the GPT Instructions field.\n\n"
        f"Knowledge snapshot generated on {generated_at}.\n\n"
        "## Role\n\n"
        "- You are a Helix Stadium tone designer and product guide.\n"
        "- Use the uploaded Helix Stadium knowledge files as the source of truth for model names, parameter names, valid values, defaults, ranges, units, model keys, model IDs, and DSP usage.\n\n"
        "## Scope\n\n"
        "- Help with tone design, tone matching, preset building, snapshots, signal flow, parallel paths, splits and merges, gain staging, global settings, ins and outs, DSP tradeoffs, Helix Native migration, and MIDI or controller ideas.\n"
        "- When a request depends on exact Stadium models, parameters, or values, stay grounded in the uploaded knowledge files.\n\n"
        "## Grounding rules\n\n"
        "- Verify every block, model, parameter, option, and value against the uploaded knowledge files before you mention it.\n"
        "- If something is not verified by the uploaded knowledge, say: `I can't verify that from the uploaded Helix Stadium knowledge files.`\n"
        "- Never invent models, parameters, value ranges, option labels, routing capabilities, hardware limits, or hidden features.\n"
        "- If a requested model does not exist in the knowledge files, say so clearly and offer the closest verified alternative.\n"
        "- Use display values in normal user-facing answers. Use model keys, model IDs, parameter keys, parameter IDs, or raw ranges only when the user asks for scripting, MIDI, automation, or troubleshooting detail.\n"
        "- You may give general tone-shaping advice when it does not depend on undocumented Helix Stadium specifics. If needed, label it as general tone advice rather than a verified product fact.\n\n"
        "## How to answer\n\n"
        "1. Determine the target device. Assume Helix Stadium unless the user names another Helix-family unit.\n"
        "2. Pull verified blocks and parameters from the uploaded knowledge files.\n"
        "3. If the request is specific enough, answer immediately. If critical context is missing, ask up to 3 targeted questions. Good clarification topics include artist or song, guitar and pickups, tuning, monitoring setup, and intended use. If a reasonable assumption is possible, make it and label it under `Assumptions`.\n"
        "4. When hardware limits matter, adapt to the specific unit mentioned. Helix Stadium usually has plenty of DSP, but Agoura amp models should be treated as DSP-heavy.\n"
        "5. When the user asks for a tone match, prioritize feel, dynamics, and mix fit over soloed exactness.\n\n"
        "## Preset response format\n\n"
        "When the user asks for a preset, patch, snapshot layout, or tone recipe, use this structure:\n\n"
        "1. `Summary`  \n"
        "2 to 3 sentences on the tone goal and approach.\n\n"
        "2. `Signal chain`  \n"
        "List every block from Input to Output in order. For each block, give the verified model name and any key routing note.\n\n"
        "3. `Block settings`  \n"
        "Give concrete starting values for the important blocks. Only include parameters that you can verify from the uploaded knowledge.\n\n"
        "4. `Snapshots and control changes`  \n"
        "List snapshot names, what changes per snapshot, and any important controller assignments.\n\n"
        "5. `Tweak guide`  \n"
        "Give 5 to 7 direct tweaks for brightness, low end, compression, gain, and ambience.\n\n"
        "## Refinement mode\n\n"
        "- When the user reports how the patch feels on their rig, keep the core structure first and propose targeted parameter changes before replacing whole blocks.\n"
        "- Name the exact parameters to change and roughly how much.\n\n"
        "## Good examples\n\n"
        "- Good: `I can't verify a model with that exact name in the uploaded Helix Stadium knowledge files. The closest verified alternatives are ...`\n"
        "- Good: `Assumptions: humbuckers, FRFR monitor, standard tuning.`\n"
        "- Bad: inventing a block, parameter, or exact value that is not in the uploaded knowledge files.\n"
    )


def render_project_instructions_document(generated_at):
    return (
        "# Helix Stadium Project Instructions\n\n"
        "Paste the block below into the ChatGPT Project instructions field.\n\n"
        f"Knowledge snapshot generated on {generated_at}.\n\n"
        "## Role\n\n"
        "- You are a Helix Stadium tone designer, preset builder, and practical product guide.\n"
        "- Use this project's uploaded Helix Stadium files as the source of truth for model names, parameter names, valid values, defaults, ranges, units, model keys, model IDs, and DSP usage.\n"
        "- Also use prior chats in this same project as working context for the user's rig, preferences, earlier preset attempts, and previous tweak results.\n\n"
        "## Grounding rules\n\n"
        "- Verify every block, model, parameter, option, and exact value against the uploaded project files before stating it as a Helix Stadium fact.\n"
        "- If something is not verified by the uploaded project files, say: `I can't verify that from this project's Helix Stadium files.`\n"
        "- Never invent models, parameters, ranges, option labels, routing features, hardware limits, or hidden behaviors.\n"
        "- If a requested model is not present in the uploaded files, say so clearly and offer the closest verified alternative.\n"
        "- Use display values in normal answers. Use model keys, IDs, parameter keys, parameter IDs, or raw ranges only for scripting, MIDI, automation, or troubleshooting.\n"
        "- General tone advice is allowed, but label it as general tone advice if it is not a verified Helix Stadium-specific fact.\n\n"
        "## How to work in this project\n\n"
        "1. Prefer the uploaded Helix Stadium files first.\n"
        "2. Then use earlier chats in this same project to keep continuity with the user's rig and previous iterations.\n"
        "3. If the request is specific enough, answer immediately. If critical context is missing, ask up to 3 targeted questions. Good topics include artist or song, guitar and pickups, tuning, monitoring setup, and intended use.\n"
        "4. If a reasonable assumption is possible, make it and label it under `Assumptions`.\n"
        "5. When hardware limits matter, adapt to the specific unit mentioned. Assume Helix Stadium unless the user names another Helix-family unit. Treat Agoura amp models as DSP-heavy.\n"
        "6. When the user is refining a sound over multiple turns, keep the core patch first and suggest targeted parameter changes before replacing blocks.\n\n"
        "## Preset response format\n\n"
        "When the user asks for a preset, patch, snapshot layout, or tone recipe, use this structure:\n\n"
        "1. `Summary`\n"
        "- 2 to 3 sentences on the tone goal and approach.\n\n"
        "2. `Signal chain`\n"
        "- List every block from Input to Output in order, with verified model names and any key routing notes.\n\n"
        "3. `Block settings`\n"
        "- Give concrete starting values for the important blocks.\n"
        "- Only include parameters that are verified by the uploaded project files.\n\n"
        "4. `Snapshots and control changes`\n"
        "- List snapshot names, what changes per snapshot, and any important controller assignments.\n\n"
        "5. `Tweak guide`\n"
        "- Give 5 to 7 direct tweaks for brightness, low end, compression, gain, and ambience.\n\n"
        "## Continuity rules\n\n"
        "- Keep track of confirmed project context such as guitar, pickups, tuning, monitoring, output destination, and what previous tweaks helped or hurt.\n"
        "- If a previous project chat established facts about the user's rig, reuse them instead of asking again unless something seems inconsistent.\n"
        "- If the user changes direction, acknowledge the new goal and continue from the latest confirmed project context.\n"
    )


def build_category_groups():
    return {spec["key"]: [] for spec in CATEGORY_SPECS}


def classify_group(model_key, model_info, uidef):
    del model_key
    category = model_info.get("category")
    if category in ("amp", "preamp"):
        model_class = uidef.get("class")
        if model_class == "Guitar":
            return "guitar-amps-and-preamps"
        if model_class == "Bass":
            return "bass-amps-and-preamps"
        return None
    if category in CAB_CATEGORIES:
        model_class = uidef.get("class")
        if category == "ir" or model_class == "IR":
            return "ir-cabs"
        if model_class == "Bass":
            return "bass-cabs"
        return "guitar-cabs"
    if category in EFFECT_CATEGORIES:
        return f"effects-{category}"
    if category in EXCLUDE_CATEGORIES:
        return None
    return None


def build_model_entry(
    model_key,
    model_info,
    uidef,
    controls,
    param_meta_all,
    param_meta_by_symbol,
    based_on_overrides,
    based_on_by_id,
    based_on_by_name,
):
    category = model_info.get("category")
    name = uidef.get("name") or model_key
    model_id = model_info.get("id")
    based_on = resolve_based_on(name, model_id, based_on_overrides, based_on_by_id, based_on_by_name)
    meta_category = "cab" if category == "cab_ir_interp" else category
    param_meta = get_param_meta_for_model(param_meta_all, param_meta_by_symbol, model_key, meta_category, name)
    params = build_detailed_param_list(model_key, model_info, uidef, param_meta, controls)
    return {
        "key": model_key,
        "id": model_id,
        "name": name,
        "type": TYPE_LABELS.get(category, category.title()),
        "category": category,
        "class": uidef.get("class"),
        "usage": model_info.get("usage"),
        "is_agoura": model_key.startswith("Agoura_") or uidef.get("dsp") == "agoura",
        "based_on": based_on,
        "params": params,
    }


def load_models_for_docs(args):
    modeldefs = load_modeldefs(args.modeldefs)
    uidefs = load_uidefs(args.uidefs)
    controls = load_controls(args.controls)
    param_meta_all, param_meta_by_symbol = load_param_meta(args.param_meta)
    based_on_by_id, based_on_by_name = load_based_on_db(args.model_meta_db)
    based_on_overrides = load_based_on_overrides(args.based_on_overrides)

    groups = build_category_groups()
    for model_key, model_info in modeldefs.items():
        if not isinstance(model_info, dict):
            continue
        category = model_info.get("category")
        if not category:
            continue
        uidef = uidefs.get(model_key, {})
        if is_legacy(uidef):
            continue
        group_key = classify_group(model_key, model_info, uidef)
        if not group_key or group_key not in groups:
            continue
        groups[group_key].append(
            build_model_entry(
                model_key,
                model_info,
                uidef,
                controls,
                param_meta_all,
                param_meta_by_symbol,
                based_on_overrides,
                based_on_by_id,
                based_on_by_name,
            )
        )
    for models in groups.values():
        models.sort(key=lambda model: model["name"])
    return groups


def model_weight(model):
    return len(render_model_section(model))


def split_models_by_weight(models, chunk_count):
    if chunk_count <= 1 or len(models) <= 1:
        return [models]

    weights = [model_weight(model) for model in models]
    remaining_total = sum(weights)
    remaining_chunks = chunk_count
    start = 0
    chunks = []

    while remaining_chunks > 1 and start < len(models):
        target = remaining_total / remaining_chunks
        min_tail_size = remaining_chunks - 1
        cumulative = 0
        end = start
        last_viable_end = len(models) - min_tail_size

        while end < last_viable_end:
            next_weight = weights[end]
            if cumulative and cumulative + next_weight > target:
                break
            cumulative += next_weight
            end += 1

        if end == start:
            cumulative = weights[start]
            end = start + 1

        chunks.append(models[start:end])
        start = end
        remaining_total -= cumulative
        remaining_chunks -= 1

    if start < len(models):
        chunks.append(models[start:])

    return chunks


def first_label_char(name):
    for char in name:
        if char.isalpha():
            return char.upper()
        if char.isdigit():
            return "0-9"
    return "misc"


def slug_label(label):
    if label == "0-9":
        return "0-9"
    return label.lower()


def chunk_range_label(models):
    start_label = first_label_char(models[0]["name"])
    end_label = first_label_char(models[-1]["name"])
    if start_label == end_label:
        return start_label, slug_label(start_label)
    return f"{start_label} to {end_label}", f"{slug_label(start_label)}-to-{slug_label(end_label)}"


def build_document_set(groups, generated_at, pack_specs):
    documents = []
    for spec in pack_specs:
        models = []
        for group_key in spec["group_keys"]:
            models.extend(groups.get(group_key, []))
        models.sort(key=lambda model: model["name"])
        if not models:
            continue
        split_into = int(spec.get("split_into") or 1)
        chunks = split_models_by_weight(models, split_into)
        for index, chunk in enumerate(chunks, start=1):
            if split_into > 1:
                range_title, range_slug = chunk_range_label(chunk)
                title = f"{spec['title']} ({range_title})"
                filename = f"{spec['filename_prefix']}-{range_slug}.md"
            else:
                title = spec["title"]
                filename = spec["filename"]
            content = render_knowledge_document(title, spec["description"], chunk, generated_at)
            documents.append(
                {
                    "title": title,
                    "filename": filename,
                    "models": chunk,
                    "content": content,
                    "index": len(documents) + 1,
                }
            )
    return documents


def build_upload_documents(groups, generated_at):
    return build_document_set(groups, generated_at, UPLOAD_PACK_SPECS)


def build_minimal_upload_documents(groups, generated_at):
    return build_document_set(groups, generated_at, MINIMAL_UPLOAD_PACK_SPECS)


def render_upload_plan(documents, minimal_documents):
    lines = [
        "# Upload plan",
        "",
        "Upload the files in `upload-ready/` as the Custom GPT knowledge set.",
        "",
        "This pack is intentionally kept to a small number of text-forward Markdown files so retrieval stays focused and the upload set remains compatible with stricter per-GPT file-count limits.",
        "",
        f"Upload-ready file count: {len(documents)}",
        "",
        "## Files",
        "",
    ]
    for doc in documents:
        size_kb = math.ceil(len(doc["content"].encode("utf-8")) / 1024)
        lines.append(
            f"- `upload-ready/{doc['filename']}`: {len(doc['models'])} models, about {size_kb} KB"
        )
    lines.extend(
        [
            "",
            "## Minimal fallback upload set",
            "",
            "If the GPT builder keeps failing to save, try the smaller pack in `minimal-upload-ready/` first.",
            "",
        ]
    )
    for doc in minimal_documents:
        size_kb = math.ceil(len(doc["content"].encode("utf-8")) / 1024)
        lines.append(
            f"- `minimal-upload-ready/{doc['filename']}`: {len(doc['models'])} models, about {size_kb} KB"
        )
    lines.extend(
        [
            "",
            "## Do not upload",
            "",
            "- `custom-gpt-instructions.md`: paste this into the GPT Instructions field instead.",
            "- `model-index.md`: supporting lookup document for humans.",
            "- `README.md`: supporting notes for this folder.",
        ]
    )
    return "\n".join(lines).strip() + "\n"


def render_index_document(documents, minimal_documents, generated_at):
    lines = [
        "# Helix Stadium custom GPT knowledge index",
        "",
        f"Generated on {generated_at}.",
        "",
        "This index is for manual lookup while building or validating the GPT. It is not required as a knowledge upload.",
        "",
        "## Upload-ready documents",
        "",
    ]
    for doc in documents:
        lines.append(f"- `{doc['filename']}`: {len(doc['models'])} models")
    lines.extend(["", "## Minimal fallback documents", ""])
    for doc in minimal_documents:
        lines.append(f"- `{doc['filename']}`: {len(doc['models'])} models")
    lines.append("")
    for doc in documents:
        lines.append(f"## {doc['title']}")
        lines.append("")
        for model in doc["models"]:
            lines.append(f"- {model['name']} (`{model['key']}`, ID `{model['id']}`)")
        lines.append("")
    for doc in minimal_documents:
        lines.append(f"## Minimal: {doc['title']}")
        lines.append("")
        for model in doc["models"]:
            lines.append(f"- {model['name']} (`{model['key']}`, ID `{model['id']}`)")
        lines.append("")
    return "\n".join(lines).strip() + "\n"


def clear_previous_outputs(out_dir: Path):
    if not out_dir.exists():
        return
    for path in out_dir.rglob("*.md"):
        path.unlink()


def write_documents(documents, minimal_documents, out_dir: Path, generated_at: str):
    clear_previous_outputs(out_dir)
    upload_dir = out_dir / "upload-ready"
    minimal_upload_dir = out_dir / "minimal-upload-ready"
    upload_dir.mkdir(parents=True, exist_ok=True)
    minimal_upload_dir.mkdir(parents=True, exist_ok=True)

    for doc in documents:
        (upload_dir / doc["filename"]).write_text(doc["content"], encoding="utf-8")
    for doc in minimal_documents:
        (minimal_upload_dir / doc["filename"]).write_text(doc["content"], encoding="utf-8")

    (out_dir / "custom-gpt-instructions.md").write_text(
        render_instructions_document(generated_at),
        encoding="utf-8",
    )
    (out_dir / "project-instructions.md").write_text(
        render_project_instructions_document(generated_at),
        encoding="utf-8",
    )
    (out_dir / "model-index.md").write_text(
        render_index_document(documents, minimal_documents, generated_at),
        encoding="utf-8",
    )
    (out_dir / "upload-plan.md").write_text(
        render_upload_plan(documents, minimal_documents),
        encoding="utf-8",
    )
    readme = (
        "# Helix Stadium custom GPT knowledge\n\n"
        f"Generated on {generated_at} by `python3 scripts/generate_helix_gpt_knowledge.py`.\n\n"
        "Folder layout:\n\n"
        "- `upload-ready/`: upload these Markdown files as GPT knowledge.\n"
        "- `minimal-upload-ready/`: smaller fallback pack for save/debugging issues.\n"
        "- `custom-gpt-instructions.md`: paste into the GPT Instructions field.\n"
        "- `project-instructions.md`: paste into a ChatGPT Project instructions field.\n"
        "- `upload-plan.md`: quick checklist with file counts and approximate sizes.\n"
        "- `model-index.md`: manual lookup reference while testing.\n"
    )
    (out_dir / "README.md").write_text(readme, encoding="utf-8")


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--modeldefs", default=DEFAULT_MODELDEFS)
    parser.add_argument("--uidefs", default=DEFAULT_UIDEFS)
    parser.add_argument("--param-meta", default=DEFAULT_PARAM_META)
    parser.add_argument("--controls", default=DEFAULT_CONTROLS)
    parser.add_argument("--model-meta-db", default=DEFAULT_MODEL_META_DB)
    parser.add_argument("--based-on-overrides", default=DEFAULT_BASED_ON_OVERRIDES)
    parser.add_argument("--out-dir", default=str(DEFAULT_OUT_DIR))
    return parser.parse_args()


def main():
    args = parse_args()
    generated_at = datetime.now(timezone.utc).isoformat()
    groups = load_models_for_docs(args)
    documents = build_upload_documents(groups, generated_at)
    minimal_documents = build_minimal_upload_documents(groups, generated_at)
    out_dir = Path(args.out_dir)
    write_documents(documents, minimal_documents, out_dir, generated_at)
    total_models = sum(len(doc["models"]) for doc in documents)
    print(
        f"Wrote {len(documents)} upload-ready files and {len(minimal_documents)} minimal files "
        f"with {total_models} models to {out_dir}"
    )


if __name__ == "__main__":
    main()
