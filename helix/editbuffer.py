"""Helpers for working with normalized Helix edit buffer state."""

from .blobs import normalize_fourcc_map

COPYABLE_FLOW_POSITIONS = tuple([0, *range(1, 13), 13, *range(15, 27), 27])
CLEARABLE_FLOW_POSITIONS = tuple([*range(1, 13), *range(15, 27)])


def coerce_numeric_keys(obj):
    if isinstance(obj, dict):
        out = {}
        for key, val in obj.items():
            new_key = key
            if isinstance(key, str) and key.isdigit():
                new_key = int(key)
            out[new_key] = coerce_numeric_keys(val)
        return out
    if isinstance(obj, list):
        return [coerce_numeric_keys(v) for v in obj]
    return obj


def normalize_edit_buffer(raw):
    if raw is None:
        return None
    return normalize_fourcc_map(coerce_numeric_keys(raw))


def parse_row(value: str) -> int:
    text = value.strip().upper()
    if text in ("1A", "A1"):
        return 0
    if text in ("1B", "B1"):
        return 1
    if text in ("2A", "A2"):
        return 2
    if text in ("2B", "B2"):
        return 3
    if text.isdigit():
        idx = int(text)
        if idx in (0, 1, 2, 3):
            return idx
    raise ValueError(f"invalid row: {value!r} (expected 1A, 1B, 2A, 2B, or 0-3)")


def row_block_position(row: int, position: int) -> int:
    if position < 1 or position > 12:
        raise ValueError(f"invalid block position: {position!r} (expected 1-12)")
    return position if row % 2 == 0 else 14 + position


def _flows(state):
    if state is None:
        return []
    return state.get("sfg_", {}).get("flow", [])


def _flow_for_index(state, flow_index: int):
    flows = _flows(state)
    if not isinstance(flows, list):
        return None
    if flow_index < 0 or flow_index >= len(flows):
        return None
    flow = flows[flow_index]
    if not isinstance(flow, dict):
        return None
    return flow


def _flow_for_row(state, row: int):
    return _flow_for_index(state, row // 2)


def _resolve_flow_block(flow, pos: int):
    blks = flow.get("blks", [])
    if isinstance(blks, list) and len(blks) > 1 and isinstance(blks[0], int):
        for idx in range(1, len(blks), 2):
            blk_pos = blks[idx - 1]
            blk = blks[idx]
            if blk_pos == pos:
                bmap = flow.get("bmap")
                if isinstance(bmap, list) and len(bmap) > pos:
                    return bmap[pos], blk if isinstance(blk, dict) else None
                if isinstance(blk, dict):
                    block_id = blk.get("id__")
                    if isinstance(block_id, int):
                        return block_id, blk
                return None, None
        return None, None
    bmap = flow.get("bmap")
    if isinstance(bmap, list) and len(bmap) > pos:
        block_id = bmap[pos]
        if isinstance(block_id, int) and isinstance(blks, list) and 0 <= block_id < len(blks):
            block = blks[block_id]
            return block_id, block if isinstance(block, dict) else None
        return block_id, None
    return None, None


def flow_block_map(state, flow_index: int, positions=None):
    flow = _flow_for_index(state, flow_index)
    if flow is None:
        return {}
    if positions is None:
        positions = COPYABLE_FLOW_POSITIONS
    out = {}
    for pos in positions:
        block_id, _block = _resolve_flow_block(flow, int(pos))
        if isinstance(block_id, int):
            out[int(pos)] = block_id
    return out


def flow_position_map(state, flow_index: int, positions=None):
    return {block_id: position for position, block_id in flow_block_map(state, flow_index, positions=positions).items()}


def extract_flow_clipboard(state, flow_index: int, positions=None):
    flow = _flow_for_index(state, flow_index)
    if flow is None:
        return []
    if positions is None:
        positions = COPYABLE_FLOW_POSITIONS
    blks = flow.get("blks", [])
    if not isinstance(blks, list):
        return []
    entries = []
    for pos in positions:
        block_id, block = _resolve_flow_block(flow, int(pos))
        if not isinstance(block_id, int) or not isinstance(block, dict):
            continue
        models = block.get("mdls", [])
        if not isinstance(models, list) or not models or not isinstance(models[0], dict):
            continue
        model = models[0]
        model_id = model.get("id__")
        if not isinstance(model_id, int):
            continue
        params = []
        for param in model.get("parm", []):
            if not isinstance(param, dict):
                continue
            param_id = param.get("pid_")
            if not isinstance(param_id, int):
                continue
            value = param.get("valu")
            if not isinstance(value, (bool, int, float)):
                continue
            params.append({"param_id": param_id, "value": value})
        entries.append(
            {
                "position": int(pos),
                "block_id": block_id,
                "model_id": model_id,
                "enabled": bool(block.get("enbl", True)),
                "params": params,
                **(
                    {
                        "link_flow": int(block.get("bflw")),
                        "link_position": int(block.get("bblk")),
                    }
                    if isinstance(block.get("bflw"), int) and isinstance(block.get("bblk"), int)
                    else {}
                ),
            }
        )
    return entries


def find_io_block(state, row: int, io_type: str):
    flow = _flow_for_row(state, row)
    if flow is None:
        return None, None
    local_row = row % 2
    if io_type == "input":
        pos = 0 if local_row == 0 else 14
    else:
        pos = 13 if local_row == 0 else 27
    return _resolve_flow_block(flow, pos)


def find_signal_block(state, row: int, position: int):
    flow = _flow_for_row(state, row)
    if flow is None:
        return None, None
    return _resolve_flow_block(flow, row_block_position(row, position))


def extract_active_model_id(block):
    if not isinstance(block, dict):
        return None
    models = block.get("mdls", [])
    if not isinstance(models, list):
        return None
    for model in models:
        if isinstance(model, dict) and model.get("id__") is not None:
            return model.get("id__")
    return None
