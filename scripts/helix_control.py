#!/usr/bin/env python3
"""Programmatic Helix Stadium control over the editor protocol (ZMTP + OSC).

Supports both single actions via CLI flags and batch execution from JSON.
"""
import argparse
import json
import os
import sys
import time
import re
from pathlib import Path

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from helix import HelixDiscoveryError, HelixSession, HelixSessionError, browse_services, discover_first_service  # noqa: E402
from helix.editbuffer import (  # noqa: E402
    extract_active_model_id,
    find_io_block,
    find_signal_block,
    normalize_edit_buffer,
    parse_row,
)


DEFAULT_APP_RES = "/Applications/Line6/Helix Stadium.app/Contents/Resources"
DEFAULT_MODELDEFS = f"{DEFAULT_APP_RES}/modeldefs/p35md-26002601-1_2_0_0.bin"
DEFAULT_UIDEFS = f"{DEFAULT_APP_RES}/P35ModelUIDefs.json"
DEFAULT_MODEL_MAP = str(Path(__file__).resolve().parents[1] / "generated" / "helix-models" / "model_id_map.json")


def parse_stomp(value: str):
    val = value.strip()
    if "." in val:
        bank, idx = val.split(".", 1)
    else:
        bank = val[0]
        idx = val[1:]
    bank = bank.lower()
    if bank not in ("a", "b", "c", "d"):
        raise ValueError("stomp bank must be a, b, c, or d")
    try:
        index = int(idx)
    except ValueError as exc:
        raise ValueError("stomp index must be an integer") from exc
    return bank, index


def parse_bool(value: str):
    val = value.strip().lower()
    if val in ("1", "true", "yes", "on", "enable", "enabled"):
        return True
    if val in ("0", "false", "no", "off", "disable", "disabled"):
        return False
    raise ValueError(f"invalid boolean value: {value!r}")


def parse_visibility(value: str):
    val = value.strip().lower()
    if val in ("1", "true", "yes", "on", "enable", "enabled", "show", "open", "visible"):
        return True
    if val in ("0", "false", "no", "off", "disable", "disabled", "hide", "close", "hidden"):
        return False
    raise ValueError(f"invalid visibility value: {value!r}")


def parse_param_value(value: str):
    try:
        return float(value)
    except ValueError:
        return 1.0 if parse_bool(value) else 0.0


def parse_blocks(value: str):
    parts = [p.strip() for p in value.split(",") if p.strip()]
    return [int(p) for p in parts]


def normalize_query(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", value.lower())


def load_model_map(path: str):
    if not path or not os.path.exists(path):
        return None
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    if isinstance(data, dict) and isinstance(data.get("models"), list):
        return data["models"]
    if isinstance(data, list):
        return data
    return None


def load_modeldefs(path: str):
    if not os.path.exists(path):
        return None
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
        return None
    return last


def load_uidefs(path: str):
    if not os.path.exists(path):
        return None
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def load_edit_buffer(session: HelixSession):
    return normalize_edit_buffer(session.get_edit_buffer_state())


def resolve_io_model_id(query: str, modeldefs_path: str, uidefs_path: str):
    if query is None:
        return None
    if str(query).isdigit():
        return int(query)
    modeldefs = load_modeldefs(modeldefs_path)
    if not modeldefs:
        raise SystemExit("modeldefs not found; install the Helix app or pass --modeldefs")
    uidefs = load_uidefs(uidefs_path)
    needle = normalize_query(query)
    for key, info in modeldefs.items():
        if not isinstance(info, dict):
            continue
        if info.get("category") not in ("input", "output"):
            continue
        if normalize_query(key) == needle:
            return info.get("id")
        if isinstance(uidefs, dict):
            name = uidefs.get(key, {}).get("name")
            if name and normalize_query(name) == needle:
                return info.get("id")
    return None


def resolve_param_id(modeldefs, model_id: int, param_key: str):
    needle = normalize_query(param_key)
    for info in modeldefs.values():
        if not isinstance(info, dict):
            continue
        if info.get("id") != model_id:
            continue
        params = info.get("params", {})
        if not isinstance(params, dict):
            continue
        for key, entry in params.items():
            if normalize_query(key) == needle and isinstance(entry, dict):
                return entry.get("id")
    return None


def resolve_model_id(query: str, model_map_path: str, modeldefs_path: str, uidefs_path: str):
    if query.isdigit():
        return int(query)
    models = load_model_map(model_map_path)
    if models is None:
        modeldefs = load_modeldefs(modeldefs_path)
        uidefs = load_uidefs(uidefs_path)
        if not modeldefs:
            raise SystemExit("modeldefs not found; supply --model-map or install the Helix app")
        models = []
        for key, info in modeldefs.items():
            ui = uidefs.get(key, {}) if isinstance(uidefs, dict) else {}
            models.append(
                {
                    "key": key,
                    "id": info.get("id"),
                    "name": ui.get("name"),
                }
            )

    normalized = normalize_query(query)
    exact_key = [m for m in models if m.get("key") == query]
    if exact_key:
        mid = exact_key[0].get("id")
        if mid is None:
            raise SystemExit(f"model key '{query}' has no id")
        return int(mid)
    ci_key = [m for m in models if str(m.get("key", "")).lower() == query.lower()]
    if ci_key:
        mid = ci_key[0].get("id")
        if mid is None:
            raise SystemExit(f"model key '{query}' has no id")
        return int(mid)
    exact_name = [m for m in models if str(m.get("name", "")).lower() == query.lower()]
    if exact_name:
        mids = {m.get("id") for m in exact_name}
        if len(mids) == 1:
            mid = exact_name[0].get("id")
            if mid is None:
                raise SystemExit(f"model name '{query}' has no id")
            return int(mid)
        raise SystemExit(f"model name '{query}' is ambiguous; use --model-id or --model-key")
    norm_matches = [m for m in models if normalize_query(str(m.get("name", ""))) == normalized]
    if norm_matches:
        mids = {m.get("id") for m in norm_matches}
        if len(mids) == 1:
            mid = norm_matches[0].get("id")
            if mid is None:
                raise SystemExit(f"model name '{query}' has no id")
            return int(mid)
        raise SystemExit(f"model name '{query}' is ambiguous; use --model-id or --model-key")
    norm_key_matches = [m for m in models if normalize_query(str(m.get("key", ""))) == normalized]
    if norm_key_matches:
        mid = norm_key_matches[0].get("id")
        if mid is None:
            raise SystemExit(f"model key '{query}' has no id")
        return int(mid)
    raise SystemExit(f"unknown model '{query}' (use --model-id or update model map)")


def resolve_block_param_target(state, row: int, position: int):
    block_id, block = find_signal_block(state, row, position)
    if block_id is None:
        raise SystemExit("unable to resolve block id; sync or check row/position")
    if not isinstance(block, dict):
        raise SystemExit("target block is empty or unavailable in the current edit buffer")
    return int(block_id), block


def resolve_named_param_id(modeldefs_path: str, model_id: int, param_key: str):
    modeldefs = load_modeldefs(modeldefs_path)
    if not modeldefs:
        raise SystemExit("modeldefs not found; install the Helix app or pass --modeldefs")
    param_id = resolve_param_id(modeldefs, int(model_id), param_key)
    if param_id is None:
        raise SystemExit(f"unable to resolve param id for '{param_key}' on model {model_id}")
    return int(param_id)


def format_event(decoded):
    addr, typetags, vals = decoded
    rendered = json.dumps(json_safe(vals))
    return f"{addr} {typetags} {rendered}"


def json_print(value):
    print(json.dumps(json_safe(value), indent=2, sort_keys=True))


def json_safe(value):
    if isinstance(value, bytes):
        try:
            text = value.decode("utf-8")
            if text and all(32 <= ord(ch) <= 126 for ch in text):
                return text
        except Exception:
            pass
        return value.hex()
    if isinstance(value, dict):
        return {json_safe(k): json_safe(v) for k, v in value.items()}
    if isinstance(value, list):
        return [json_safe(v) for v in value]
    return value


def iter_actions_from_file(path):
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    if isinstance(data, dict):
        data = data.get("actions", [])
    if not isinstance(data, list):
        raise SystemExit("actions file must be a list or {\"actions\": [...]} object")
    return data


def apply_action(session, cmd_id: int, action: dict) -> int:
    op = action.get("op")
    if op in ("snapshot_name", "rename_snapshot", "rename-snapshot"):
        session.set_snapshot_name(int(action["index"]), str(action["name"]), wait_status=True)
        return cmd_id + 1
    if op == "scribble_label":
        if "key" in action:
            key = action["key"]
        else:
            bank, idx = parse_stomp(action["stomp"])
            key = f"preset.floorboard.stomp.{bank}.{idx}.label"
        session.set_property(key, str(action["label"]), "s", wait_status=True)
        return cmd_id + 1
    if op == "property_set":
        session.set_property(
            action["key"],
            action["value"],
            action.get("value_type", "s"),
            int(action.get("property_id", 0)),
            wait_status=True,
        )
        return cmd_id + 1
    if op in ("preset_notes", "preset-notes", "notes_text", "notes-text", "notes"):
        session.set_preset_notes(str(action["text"]), wait_status=True)
        return cmd_id + 1
    if op in ("preset_notes_visible", "preset-notes-visible", "notes_visible", "notes-visible"):
        visible = action.get("visible")
        if visible is None and "show" in action:
            visible = action["show"]
        if isinstance(visible, str):
            visible = parse_visibility(visible)
        session.set_preset_notes_visible(bool(visible), wait_status=True)
        return cmd_id + 1
    if op in ("set_autocab", "set-autocab"):
        enabled = action.get("enabled", True)
        if isinstance(enabled, str):
            enabled = parse_bool(enabled)
        session.set_auto_cab(bool(enabled), wait_status=True)
        return cmd_id + 1
    if op in ("clear_blocks", "clear-blocks"):
        blocks = action.get("blocks", [])
        if isinstance(blocks, int):
            blocks = [blocks]
        session.clear_blocks(int(action.get("path", 0)), [int(b) for b in blocks], wait_status=True)
        return cmd_id + 1
    if op in ("clear_all_blocks", "clear-all-blocks", "clear_all", "clear-all"):
        path = action.get("path")
        if path is not None:
            path = int(path)
        session.clear_all_blocks(path, wait_status=True)
        return cmd_id + 1
    if op in ("insert_block", "insert-block"):
        auto_cab = action.get("auto_cab")
        if isinstance(auto_cab, str):
            auto_cab = parse_bool(auto_cab)
        elif auto_cab is not None:
            auto_cab = bool(auto_cab)
        clear_blocks = action.get("clear_blocks")
        if isinstance(clear_blocks, int):
            clear_blocks = [clear_blocks]
        if isinstance(clear_blocks, list):
            clear_blocks = [int(b) for b in clear_blocks]
        model_id = action.get("model_id")
        model = action.get("model")
        if model_id is None and model:
            model_id = resolve_model_id(
                str(model),
                action.get("model_map", DEFAULT_MODEL_MAP),
                action.get("modeldefs", DEFAULT_MODELDEFS),
                action.get("uidefs", DEFAULT_UIDEFS),
            )
        if model_id is None:
            raise SystemExit("insert_block requires model_id or model")
        session.insert_block(
            int(action.get("path", 0)),
            int(action["block"]),
            int(model_id),
            int(action.get("slot", 0)),
            auto_cab=auto_cab,
            clear=bool(action.get("clear", False)),
            clear_blocks=clear_blocks,
            wait_status=True,
        )
        return cmd_id + 1
    if op in ("io_set", "io-set"):
        row = parse_row(str(action.get("row")))
        io_type = str(action.get("type", "input")).lower()
        model_id = action.get("model_id")
        model = action.get("model")
        if model_id is None and model:
            model_id = resolve_io_model_id(
                str(model),
                action.get("modeldefs", DEFAULT_MODELDEFS),
                action.get("uidefs", DEFAULT_UIDEFS),
            )
        if model_id is None:
            raise SystemExit("io_set requires model_id or model")
        state = load_edit_buffer(session)
        block_id, _blk = find_io_block(state, row, io_type)
        if block_id is None:
            raise SystemExit("unable to resolve IO block id; sync or check row/type")
        session.set_model(row // 2, int(block_id), int(model_id), int(action.get("slot", 0)), wait_status=True)
        return cmd_id + 1
    if op in ("io_param", "io-param"):
        row = parse_row(str(action.get("row")))
        io_type = str(action.get("type", "input")).lower()
        state = load_edit_buffer(session)
        block_id, blk = find_io_block(state, row, io_type)
        if block_id is None:
            raise SystemExit("unable to resolve IO block id; sync or check row/type")
        param_id = action.get("param_id")
        if param_id is None:
            param_key = action.get("param")
            if not param_key:
                raise SystemExit("io_param requires param_id or param")
            model_id = extract_active_model_id(blk)
            if model_id is None:
                raise SystemExit("unable to resolve IO model id for param lookup")
            param_id = resolve_named_param_id(action.get("modeldefs", DEFAULT_MODELDEFS), int(model_id), str(param_key))
        value = action.get("value")
        if isinstance(value, str):
            value = parse_param_value(value)
        session.set_param_value(
            row // 2,
            int(block_id),
            int(param_id),
            value,
            int(action.get("slot", 0)),
            int(action.get("flags", -1)),
            wait_status=True,
        )
        return cmd_id + 1
    if op in ("block_param", "block-param"):
        row = parse_row(str(action.get("row")))
        position = int(action.get("position"))
        state = load_edit_buffer(session)
        block_id, blk = resolve_block_param_target(state, row, position)
        param_id = action.get("param_id")
        if param_id is None:
            param_key = action.get("param")
            if not param_key:
                raise SystemExit("block_param requires param_id or param")
            model_id = extract_active_model_id(blk)
            if model_id is None:
                raise SystemExit("unable to resolve block model id for param lookup")
            param_id = resolve_named_param_id(action.get("modeldefs", DEFAULT_MODELDEFS), int(model_id), str(param_key))
        value = action.get("value")
        if isinstance(value, str):
            value = parse_param_value(value)
        session.set_param_value(
            row // 2,
            int(block_id),
            int(param_id),
            value,
            int(action.get("slot", 0)),
            int(action.get("flags", -1)),
            wait_status=True,
        )
        return cmd_id + 1
    if op == "param_value":
        session.set_param_value(
            int(action["path"]),
            int(action["block"]),
            int(action["param_id"]),
            action["value"],
            int(action.get("slot", 0)),
            int(action.get("flags", -1)),
            wait_status=True,
        )
        return cmd_id + 1
    if op == "block_enable":
        session.set_block_enable(
            int(action["path"]),
            int(action["block"]),
            int(action["enabled"]),
            wait_status=True,
        )
        return cmd_id + 1
    if op == "model_set":
        session.set_model(
            int(action["path"]),
            int(action["block"]),
            int(action["model_id"]),
            int(action.get("slot", 0)),
            wait_status=True,
        )
        return cmd_id + 1
    if op == "osc":
        session.send(action["address"], action["typetags"], action.get("args", []))
        return cmd_id + 1
    raise SystemExit(f"unknown op: {op}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--host", help="Device hostname. Omit or use 'auto' to discover via Bonjour.")
    ap.add_argument("--port-2001", type=int, default=2001)
    ap.add_argument("--port-2002", type=int, default=2002)
    ap.add_argument("--cmd-base", type=int, default=1)
    ap.add_argument("--timeout", type=float, default=5.0)
    ap.add_argument("--retries", type=int, default=1)
    ap.add_argument("--retry-delay", type=float, default=0.1)
    ap.add_argument("--discover-timeout", type=float, default=5.0, help="Seconds to wait for Bonjour discovery")
    ap.add_argument("--actions", help="JSON file with action list")
    ap.add_argument("--duration", type=float, default=1.0, help="Seconds to wait before closing")
    ap.add_argument("--listen", action="store_true", help="Print incoming frames while waiting")

    sub = ap.add_subparsers(dest="cmd")
    snap = sub.add_parser("snapshot-name")
    snap.add_argument("--index", type=int, required=True)
    snap.add_argument("--name", required=True)

    scribble = sub.add_parser("scribble-label")
    scribble.add_argument("--stomp", help="e.g., a.7 or A7")
    scribble.add_argument("--key", help="Direct property key override")
    scribble.add_argument("--label", required=True)

    notes = sub.add_parser("preset-notes")
    notes.add_argument("--text", required=True)

    notes_vis = sub.add_parser("preset-notes-visible")
    notes_vis.add_argument("--visible", required=True, help="show/hide/on/off/true/false")

    get_prop = sub.add_parser("get-property")
    get_prop.add_argument("--key", required=True)

    sub.add_parser("get-product-info")
    sub.add_parser("get-edit-buffer")
    set_autocab = sub.add_parser("set-autocab")
    set_autocab.add_argument("--enabled", required=True, help="on/off/true/false/1/0")

    insert_block = sub.add_parser("insert-block")
    insert_block.add_argument("--path", type=int, default=0)
    insert_block.add_argument("--block", type=int, required=True)
    insert_block.add_argument("--model-id", type=int)
    insert_block.add_argument("--model", help="Model name or key (resolved to model ID)")
    insert_block.add_argument("--model-map", default=DEFAULT_MODEL_MAP, help="Path to model_id_map.json")
    insert_block.add_argument("--modeldefs", default=DEFAULT_MODELDEFS, help="Path to modeldefs .bin")
    insert_block.add_argument("--uidefs", default=DEFAULT_UIDEFS, help="Path to P35ModelUIDefs.json")
    insert_block.add_argument("--slot", type=int, default=0)
    insert_block.add_argument("--auto-cab", choices=("on", "off", "leave"), default="leave")
    insert_block.add_argument("--clear", action="store_true", help="Clear block and next slot before inserting")
    insert_block.add_argument("--clear-blocks", help="Comma-separated block indices to clear before inserting")

    io_set = sub.add_parser("io-set")
    io_set.add_argument("--row", required=True, help="Row label (1A, 1B, 2A, 2B) or index 0-3")
    io_set.add_argument("--type", choices=("input", "output"), required=True)
    io_set.add_argument("--model-id", type=int)
    io_set.add_argument("--model", help="Model key or display name (resolved via app resources)")
    io_set.add_argument("--modeldefs", default=DEFAULT_MODELDEFS, help="Path to modeldefs .bin")
    io_set.add_argument("--uidefs", default=DEFAULT_UIDEFS, help="Path to P35ModelUIDefs.json")

    io_param = sub.add_parser("io-param")
    io_param.add_argument("--row", required=True, help="Row label (1A, 1B, 2A, 2B) or index 0-3")
    io_param.add_argument("--type", choices=("input", "output"), required=True)
    io_param.add_argument("--param-id", type=int)
    io_param.add_argument("--param", help="Parameter key (e.g., Pad, Trim, gain, pan)")
    io_param.add_argument("--value", required=True, help="Value to set (number or boolean)")
    io_param.add_argument("--modeldefs", default=DEFAULT_MODELDEFS, help="Path to modeldefs .bin")
    io_param.add_argument("--uidefs", default=DEFAULT_UIDEFS, help="Path to P35ModelUIDefs.json")

    block_param = sub.add_parser("block-param")
    block_param.add_argument("--row", required=True, help="Row label (1A, 1B, 2A, 2B) or index 0-3")
    block_param.add_argument("--position", type=int, required=True, help="Visible block position within the row (1-12)")
    block_param.add_argument("--param-id", type=int)
    block_param.add_argument("--param", help="Parameter key (for example Drive, Bass, Level)")
    block_param.add_argument("--value", required=True, help="Value to set (number or boolean)")
    block_param.add_argument("--slot", type=int, default=0, help="Model slot for dual-model blocks")
    block_param.add_argument("--flags", type=int, default=-1)
    block_param.add_argument("--modeldefs", default=DEFAULT_MODELDEFS, help="Path to modeldefs .bin")

    clear_all = sub.add_parser("clear-all-blocks")
    clear_all.add_argument("--path", type=int, help="Optional path/flow index to clear (default: all)")
    clear_all_short = sub.add_parser("clear-all")
    clear_all_short.add_argument("--path", type=int, help="Optional path/flow index to clear (default: all)")

    discover = sub.add_parser("discover")
    discover.add_argument("--all", action="store_true", help="List all visible Helix services instead of resolving the first one")

    sub.add_parser("monitor")

    args = ap.parse_args()

    if args.cmd == "discover":
        try:
            if args.all:
                json_print(browse_services(timeout=args.discover_timeout))
            else:
                service = discover_first_service(timeout=args.discover_timeout)
                json_print(service.__dict__)
            return
        except HelixDiscoveryError as exc:
            raise SystemExit(str(exc)) from exc

    session = HelixSession(
        args.host,
        args.port_2001,
        args.port_2002,
        timeout=args.timeout,
        retries=args.retries,
        retry_delay=args.retry_delay,
        discover_timeout=args.discover_timeout,
        raise_on_timeout=True,
    )
    session._cmd_id = args.cmd_base
    try:
        session.connect()
        cmd_id = session._cmd_id

        if args.actions:
            for action in iter_actions_from_file(args.actions):
                cmd_id = apply_action(session, cmd_id, action)
        elif args.cmd == "snapshot-name":
            session.set_snapshot_name(args.index, args.name, wait_status=True)
        elif args.cmd == "scribble-label":
            if not args.key and not args.stomp:
                raise SystemExit("must supply --stomp or --key")
            key = args.key
            if not key:
                bank, idx = parse_stomp(args.stomp)
                key = f"preset.floorboard.stomp.{bank}.{idx}.label"
            session.set_property(key, args.label, "s", wait_status=True)
        elif args.cmd == "preset-notes":
            session.set_preset_notes(args.text, wait_status=True)
        elif args.cmd == "preset-notes-visible":
            session.set_preset_notes_visible(parse_visibility(args.visible), wait_status=True)
        elif args.cmd == "get-property":
            value = session.get_property(args.key)
            json_print(value)
            return
        elif args.cmd == "get-product-info":
            value = session.get_product_info()
            json_print(value)
            return
        elif args.cmd == "get-edit-buffer":
            value = session.get_edit_buffer_state()
            json_print(value)
            return
        elif args.cmd == "set-autocab":
            session.set_auto_cab(parse_bool(args.enabled), wait_status=True)
        elif args.cmd == "insert-block":
            if args.model_id is None and not args.model:
                raise SystemExit("insert-block requires --model-id or --model")
            if args.model_id is not None and args.model:
                raise SystemExit("use either --model-id or --model, not both")
            auto_cab = None
            if args.auto_cab != "leave":
                auto_cab = True if args.auto_cab == "on" else False
            clear_blocks = None
            if args.clear_blocks:
                clear_blocks = parse_blocks(args.clear_blocks)
            elif args.clear:
                clear_blocks = [args.block, args.block + 1]
            model_id = args.model_id
            if model_id is None:
                model_id = resolve_model_id(args.model, args.model_map, args.modeldefs, args.uidefs)
            session.insert_block(
                args.path,
                args.block,
                int(model_id),
                args.slot,
                auto_cab=auto_cab,
                clear_blocks=clear_blocks,
                wait_status=True,
            )
        elif args.cmd == "io-set":
            row = parse_row(args.row)
            model_id = args.model_id
            if model_id is None and args.model:
                model_id = resolve_io_model_id(args.model, args.modeldefs, args.uidefs)
            if model_id is None:
                raise SystemExit("io-set requires --model-id or --model")
            state = load_edit_buffer(session)
            block_id, _blk = find_io_block(state, row, args.type)
            if block_id is None:
                raise SystemExit("unable to resolve IO block id; run get-edit-buffer first")
            session.set_model(row // 2, int(block_id), int(model_id), 0, wait_status=True)
        elif args.cmd == "io-param":
            row = parse_row(args.row)
            state = load_edit_buffer(session)
            block_id, blk = find_io_block(state, row, args.type)
            if block_id is None:
                raise SystemExit("unable to resolve IO block id; run get-edit-buffer first")
            param_id = args.param_id
            if param_id is None:
                if not args.param:
                    raise SystemExit("io-param requires --param-id or --param")
                model_id = extract_active_model_id(blk)
                if model_id is None:
                    raise SystemExit("unable to resolve IO model id for param lookup")
                param_id = resolve_named_param_id(args.modeldefs, int(model_id), str(args.param))
            value = parse_param_value(args.value)
            session.set_param_value(row // 2, int(block_id), int(param_id), value, 0, -1, wait_status=True)
        elif args.cmd == "block-param":
            row = parse_row(args.row)
            state = load_edit_buffer(session)
            block_id, blk = resolve_block_param_target(state, row, args.position)
            param_id = args.param_id
            if param_id is None:
                if not args.param:
                    raise SystemExit("block-param requires --param-id or --param")
                model_id = extract_active_model_id(blk)
                if model_id is None:
                    raise SystemExit("unable to resolve block model id for param lookup")
                param_id = resolve_named_param_id(args.modeldefs, int(model_id), str(args.param))
            value = parse_param_value(args.value)
            session.set_param_value(
                row // 2,
                int(block_id),
                int(param_id),
                value,
                args.slot,
                args.flags,
                wait_status=True,
            )
        elif args.cmd == "clear-all-blocks":
            session.clear_all_blocks(args.path, wait_status=True)
        elif args.cmd == "clear-all":
            session.clear_all_blocks(args.path, wait_status=True)
        elif args.cmd != "monitor":
            raise SystemExit("provide --actions or a subcommand")

        if args.listen or args.cmd == "monitor":
            end = time.time() + args.duration
            while time.time() < end:
                decoded = session.recv_update(timeout=max(0.0, end - time.time()))
                if decoded:
                    print(format_event(decoded))
        else:
            time.sleep(args.duration)
    except (HelixDiscoveryError, HelixSessionError) as exc:
        raise SystemExit(str(exc)) from exc
    finally:
        session.close()


if __name__ == "__main__":
    main()
