"""Helpers for working with normalized Helix edit buffer state."""

from .blobs import normalize_fourcc_map


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


def _flow_for_row(state, row: int):
    if state is None:
        return None
    flows = state.get("sfg_", {}).get("flow", [])
    if not isinstance(flows, list):
        return None
    flow_idx = row // 2
    if flow_idx < 0 or flow_idx >= len(flows):
        return None
    flow = flows[flow_idx]
    if not isinstance(flow, dict):
        return None
    return flow


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
                return idx, blk if isinstance(blk, dict) else None
    bmap = flow.get("bmap")
    if isinstance(bmap, list) and len(bmap) > pos:
        return bmap[pos], None
    return None, None


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
