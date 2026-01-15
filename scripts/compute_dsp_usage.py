#!/usr/bin/env python3
"""Compute per-flow DSP usage totals from an EditBufferState JSON dump."""
import argparse
import json
import os
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT))

from helix.blobs import normalize_fourcc_map  # noqa: E402
from scripts.generate_helix_model_json import (  # noqa: E402
    DEFAULT_MODELDEFS,
    load_modeldefs,
)


def coerce_numeric_keys(obj):
    if isinstance(obj, dict):
        out = {}
        for key, val in obj.items():
            new_key = key
            if isinstance(key, str) and key.isdigit():
                try:
                    new_key = int(key)
                except Exception:
                    new_key = key
            out[new_key] = coerce_numeric_keys(val)
        return out
    if isinstance(obj, list):
        return [coerce_numeric_keys(v) for v in obj]
    return obj


def load_edit_buffer(path: str):
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return normalize_fourcc_map(coerce_numeric_keys(data))


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


def iter_models(flow):
    if not isinstance(flow, dict):
        return
    blks = flow.get("blks", [])
    if not isinstance(blks, list):
        return
    for block_index, block in enumerate(blks):
        if not isinstance(block, dict):
            continue
        models = block.get("mdls", [])
        if not isinstance(models, list) or not models:
            continue
        for model_index, model in enumerate(models):
            if not isinstance(model, dict):
                continue
            yield block_index, model_index, model.get("id__")


def compute_usage(state, usage_by_id, verbose=False):
    flows = state.get("sfg_", {}).get("flow", [])
    totals = []
    for flow_index, flow in enumerate(flows):
        total = 0.0
        missing = set()
        entries = []
        for block_index, model_index, model_id in iter_models(flow):
            usage = None
            if isinstance(model_id, int):
                usage = usage_by_id.get(model_id)
            if usage is None and model_id is not None:
                missing.add(model_id)
            if isinstance(usage, (int, float)):
                total += usage
            if verbose:
                entries.append((block_index, model_index, model_id, usage))
        totals.append((flow_index, total, missing, entries))
    return totals


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("edit_buffer", help="Path to EditBufferState JSON dump")
    ap.add_argument("--modeldefs", default=DEFAULT_MODELDEFS, help="Path to modeldefs .bin")
    ap.add_argument("--verbose", action="store_true", help="Print per-block model usage entries")
    args = ap.parse_args()

    if not os.path.exists(args.edit_buffer):
        raise SystemExit(f"Edit buffer not found: {args.edit_buffer}")
    if not os.path.exists(args.modeldefs):
        raise SystemExit(f"Modeldefs not found: {args.modeldefs}")

    usage_by_id = build_usage_lookup(args.modeldefs)
    state = load_edit_buffer(args.edit_buffer)

    totals = compute_usage(state, usage_by_id, verbose=args.verbose)
    overall = 0.0

    for flow_index, total, missing, entries in totals:
        overall += total
        missing_count = len(missing)
        print(f"flow {flow_index}: usage {total:.2f} (missing models: {missing_count})")
        if args.verbose:
            for block_index, model_index, model_id, usage in entries:
                usage_str = "unknown" if usage is None else f"{usage:.2f}"
                print(f"  block {block_index:02d} model[{model_index}] id={model_id} usage={usage_str}")
            if missing_count:
                missing_str = ", ".join(str(v) for v in sorted(missing))
                print(f"  missing model ids: {missing_str}")

    print(f"total usage: {overall:.2f}")


if __name__ == "__main__":
    main()
