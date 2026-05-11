"""Global Matrix Mixer state helpers."""

from __future__ import annotations

from copy import deepcopy
from typing import Any

MATRIX_MIXER_PROPERTY = "server.mixer.state"

MATRIX_SYNC_ADDRESSES = {
    "/syncMixAttachedOut",
    "/syncMixChannelMute",
    "/syncMixChannelPan",
    "/syncMixChannelSolo",
    "/syncMixChannelVolume",
}

MATRIX_LAYER_LABELS = {
    1: '1/4"',
    2: "XLR",
    3: "Phones",
}

MATRIX_CHANNEL_LABELS = {
    1: "Path 1A",
    2: "Path 1B",
    3: "Path 2A",
    4: "Path 2B",
    5: "Paths",
    6: "Track 1",
    7: "Track 2",
    8: "Track 3",
    9: "Track 4",
    10: "Track 5",
    11: "Track 6",
    12: "Track 7",
    13: "Track 8",
    14: "Song",
    15: "Click",
    16: "Count",
    17: "USB 1/2",
    18: "Bluetooth",
    19: "AUX In",
    20: "Nexus 1",
    21: "Nexus 2",
    22: "Nexus 3",
    23: "Nexus 4",
}


def coerce_number(value: Any):
    if isinstance(value, bool):
        return 1 if value else 0
    if isinstance(value, (int, float)):
        return value
    if isinstance(value, str):
        try:
            return float(value)
        except ValueError:
            return None
    return None


def coerce_bool(value: Any):
    if isinstance(value, bool):
        return value
    number = coerce_number(value)
    if number is None:
        return None
    return number != 0


def find_first_key(value: Any, target_key: str):
    queue = [value]
    seen = set()
    while queue:
        current = queue.pop(0)
        if not isinstance(current, (dict, list)):
            continue
        marker = id(current)
        if marker in seen:
            continue
        seen.add(marker)
        if isinstance(current, dict):
            if target_key in current:
                return current[target_key]
            queue.extend(current.values())
        else:
            queue.extend(current)
    return None


def pick_first(mapping: dict[str, Any], keys: tuple[str, ...]):
    for key in keys:
        if key in mapping:
            return mapping[key]
    return None


def parse_channel(raw: Any, fallback_id: int):
    channel_name = None
    if isinstance(raw, dict):
        channel_id = coerce_number(
            pick_first(raw, ("chnl", "chan", "ch__", "cid_", "id__", "id", "idx", "src_"))
        )
        volume = coerce_number(pick_first(raw, ("vol_", "vol", "lvl_", "level", "gain", "gain_")))
        pan = coerce_number(pick_first(raw, ("pan_", "pan")))
        mute = coerce_bool(pick_first(raw, ("mute", "mut_", "muted")))
        solo = coerce_bool(pick_first(raw, ("solo", "sol_")))
        name = raw.get("name")
        if isinstance(name, str) and name:
            channel_name = name
    elif isinstance(raw, (list, tuple)):
        channel_id = coerce_number(raw[0]) if len(raw) > 0 else None
        volume = coerce_number(raw[1]) if len(raw) > 1 else None
        pan = coerce_number(raw[2]) if len(raw) > 2 else None
        mute = coerce_bool(raw[3]) if len(raw) > 3 else None
        solo = coerce_bool(raw[4]) if len(raw) > 4 else None
    else:
        channel_id = None
        volume = None
        pan = None
        mute = None
        solo = None

    channel_number = int(channel_id) if channel_id is not None else fallback_id
    return {
        "id": channel_number,
        "label": channel_name or MATRIX_CHANNEL_LABELS.get(channel_number, f"Channel {channel_number}"),
        "volume_db": volume,
        "pan": pan,
        "mute": mute,
        "solo": solo,
    }


def layer_channel_items(raw: dict[str, Any]):
    items = []

    home = raw.get("home")
    if isinstance(home, dict):
        home_channels = home.get("chan")
        if isinstance(home_channels, list):
            items.extend(home_channels)
        if isinstance(home.get("mix_"), dict):
            items.append(home["mix_"])

    song = raw.get("song")
    if isinstance(song, dict):
        song_channels = song.get("chan")
        if isinstance(song_channels, list):
            items.extend(song_channels)
        if isinstance(song.get("mix_"), dict):
            items.append(song["mix_"])

    for key in ("clik", "cntn", "usbn", "bt__", "auxn"):
        if isinstance(raw.get(key), dict):
            items.append(raw[key])

    nxus = raw.get("nxus")
    if isinstance(nxus, list):
        items.extend(item for item in nxus if isinstance(item, dict))

    return items


def parse_layer(raw: Any, fallback_id: int):
    layer_name = None
    if isinstance(raw, dict):
        output = raw.get("out_")
        if isinstance(output, dict):
            layer_id = coerce_number(pick_first(output, ("dst_", "dst", "id", "src_")))
            name = output.get("name")
            if isinstance(name, str) and name:
                layer_name = name
        else:
            layer_id = None
        if layer_id is None:
            layer_id = coerce_number(
                pick_first(raw, ("lyr_", "lyr", "layer", "out_", "output", "id__", "id", "idx"))
            )
        channel_items = pick_first(raw, ("chns", "chans", "channels", "chnl", "strips", "strip"))
        if not isinstance(channel_items, list):
            channel_items = layer_channel_items(raw)
    elif isinstance(raw, list):
        layer_id = None
        channel_items = raw
    else:
        layer_id = None
        channel_items = []

    layer_number = int(layer_id) if layer_id is not None else fallback_id
    if not isinstance(channel_items, list):
        channel_items = []

    channels = [parse_channel(channel, index + 1) for index, channel in enumerate(channel_items)]
    channels.sort(key=lambda channel: channel["id"])
    return {
        "id": layer_number,
        "label": layer_name or MATRIX_LAYER_LABELS.get(layer_number, f"Output {layer_number}"),
        "channels": channels,
    }


def parse_matrix_mixer_state(value: Any):
    """Normalise a decoded `server.mixer.state` value into a stable dict."""

    state_value = value
    if isinstance(value, dict) and ("val_" in value or "val" in value or "value" in value):
        state_value = value.get("val_", value.get("val", value.get("value")))

    layers_value = find_first_key(state_value, "lyrs")
    if not isinstance(layers_value, list):
        return None

    layers = [parse_layer(layer, index + 1) for index, layer in enumerate(layers_value)]
    layers.sort(key=lambda layer: layer["id"])
    attached = coerce_number(find_first_key(state_value, "atto"))
    if attached is None:
        attached = coerce_number(find_first_key(state_value, "aout"))
    attached_layer = int(attached) if attached is not None else None
    if attached_layer not in MATRIX_LAYER_LABELS:
        attached_layer = layers[0]["id"] if layers else None

    return {
        "attached_layer": attached_layer,
        "layers": layers,
    }


def apply_matrix_mixer_event(state: dict[str, Any] | None, address: str, values):
    """Apply one Matrix Mixer sync event to a normalised state copy."""

    if address not in MATRIX_SYNC_ADDRESSES or not isinstance(values, (list, tuple)):
        return state
    if address == "/syncMixAttachedOut":
        if len(values) < 3:
            return state
        layer = coerce_number(values[2])
        if layer is None:
            return state
        next_state = deepcopy(state) if state else {"attached_layer": None, "layers": []}
        next_state["attached_layer"] = int(layer)
        return next_state
    if len(values) < 5:
        return state

    layer = coerce_number(values[2])
    channel = coerce_number(values[3])
    if layer is None or channel is None:
        return state

    field = {
        "/syncMixChannelVolume": "volume_db",
        "/syncMixChannelPan": "pan",
        "/syncMixChannelMute": "mute",
        "/syncMixChannelSolo": "solo",
    }.get(address)
    if not field:
        return state

    raw_value = values[4]
    value = coerce_bool(raw_value) if field in {"mute", "solo"} else coerce_number(raw_value)
    next_state = deepcopy(state) if state else {"attached_layer": int(layer), "layers": []}
    layer_number = int(layer)
    channel_number = int(channel)
    layer_state = next((item for item in next_state["layers"] if item.get("id") == layer_number), None)
    if layer_state is None:
        layer_state = {
            "id": layer_number,
            "label": MATRIX_LAYER_LABELS.get(layer_number, f"Output {layer_number}"),
            "channels": [],
        }
        next_state["layers"].append(layer_state)
        next_state["layers"].sort(key=lambda item: item["id"])

    channel_state = next((item for item in layer_state["channels"] if item.get("id") == channel_number), None)
    if channel_state is None:
        channel_state = {
            "id": channel_number,
            "label": MATRIX_CHANNEL_LABELS.get(channel_number, f"Channel {channel_number}"),
            "volume_db": None,
            "pan": None,
            "mute": None,
            "solo": None,
        }
        layer_state["channels"].append(channel_state)
        layer_state["channels"].sort(key=lambda item: item["id"])

    channel_state[field] = value
    return next_state
