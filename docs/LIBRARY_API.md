# Python Library API (`helix`)

The `helix` package is the public, importable surface behind the scripts in
`scripts/`. It speaks the Helix Stadium editor protocol (ZMTP + OSC over TCP)
and exposes a high-level session client plus the lower-level codecs and
discovery helpers it is built from.

This document is a practical reference. For wire-level detail see
[TECHNICAL_DETAILS.md](TECHNICAL_DETAILS.md); for the command-line tools see
[CLI_REFERENCE.md](CLI_REFERENCE.md).

> Treat device, model-count, routing, and DSP limits as authoritative. The
> library does not bypass them, and a command the device accepts out of range
> is a device/validation quirk, not a supported feature.

## Install

```bash
python3 -m pip install -e .          # library + msgpack
python3 -m pip install -e ".[dev]"   # plus coverage, ruff, pyright
```

`msgpack` is the only runtime dependency. Python 3.10+ is required.

## Quick start

```python
from helix import HelixSession

# host=None (or "auto") resolves the device via Bonjour.
session = HelixSession("p35x1.local")
session.connect()
try:
    print(session.get_product_info())
    print("snapshots:", session.get_snapshot_count())
    session.set_snapshot_name(0, "Verse A", wait_status=True)
finally:
    session.close()
```

## Package exports

Everything below is re-exported from the top-level `helix` namespace.

| Symbol | Kind | Purpose |
| --- | --- | --- |
| `HelixSession` | class | High-level connected client (main entry point). |
| `HelixSessionError` | exception | Base for all session failures. |
| `HelixTimeoutError` | exception | Expected response did not arrive in time. |
| `HelixStatusError` | exception | Device acknowledged a command with a non-zero status. |
| `HelixDiscoveryError` | exception | Bonjour discovery failed. |
| `HelixService` | dataclass | Resolved device (`instance`, `host`, `port`, …). |
| `browse_services`, `discover_first_service`, `resolve_service` | func | Bonjour discovery. |
| `build_osc`, `decode_osc` | func | OSC message codec. |
| `build_property_blob`, `decode_property_blob`, `decode_msgpack_blob` | func | msgpack blob codec. |
| `parse_matrix_mixer_state`, `apply_matrix_mixer_event` | func | Matrix Mixer decoding. |
| `MATRIX_MIXER_PROPERTY`, `MATRIX_CHANNEL_LABELS`, `MATRIX_LAYER_LABELS` | const | Matrix Mixer keys/labels. |
| `FACTORY_PRESETS_CID`, `USER_PRESETS_CID`, `SETLIST_DIRECTORY_CID` | const | Well-known container content ids. |
| `SNAPSHOT_COLOR_NAMES` | const | Snapshot colour enum → display name. |

## `HelixSession`

```python
HelixSession(
    host: str | None,
    port_2001: int = 2001,
    port_2002: int = 2002,
    timeout: float = 5.0,
    retries: int = 1,
    retry_delay: float = 0.1,
    discover_timeout: float = 5.0,
    raise_on_timeout: bool = False,
    strict_status: bool = True,
)
```

- `host`: device hostname/IP. `None` or `"auto"` triggers Bonjour discovery.
- `raise_on_timeout`: when `True`, missing responses raise `HelixTimeoutError`
  instead of returning `None`.
- `strict_status`: when `True`, a non-zero device status raises
  `HelixStatusError`.

### Lifecycle

| Method | Notes |
| --- | --- |
| `connect()` | Opens both sockets, runs the ZMTP handshake, resolves Bonjour if needed. |
| `close()` | Closes sockets. Safe to call multiple times. |
| `recv_update(timeout=None)` | Pull the next pushed event (`(address, typetags, values)`), or `None`. |

`HelixSession` is usable as a context manager is **not** assumed — call
`connect()` / `close()` explicitly (a `try/finally` is the expected pattern).

### Reads / queries

`get_product_info`, `get_property(key)`, `get_edit_buffer_state`,
`get_matrix_mixer_state`, `get_active_preset_content_id`,
`get_active_preset_ref`, `get_content_ref(cid)`, `get_content_path(cid)`,
`get_content_data(cid)`, `get_content_data_decoded(cid)`,
`get_content_info(type, name)`, `get_all_content_info(type)`,
`find_content_matches(type, query, location="")`, `get_container_contents(cid)`,
`list_factory_presets`, `list_user_presets`, `list_setlists`,
`is_preset_edited`, `get_auto_cab_enabled`, `get_snapshot_count`,
`get_active_snapshot_index`, `get_snapshots`, `get_snapshot_targets(index)`.

Query helpers return decoded Python structures, or `None` when the device does
not answer (unless `raise_on_timeout=True`).

### Snapshots

| Method | Description |
| --- | --- |
| `set_snapshot_name(index, name, wait_status=True)` | Rename a snapshot. |
| `activate_snapshot(index, wait_change=True)` | Switch the active snapshot. |
| `copy_snapshot(source, target, wait_status=True)` | Duplicate a snapshot. |
| `set_snapshot_color(index, color, wait_status=True)` | Set colour (see `SNAPSHOT_COLOR_NAMES`). |

### Presets and content library

`load_preset_with_cid(cid, wait_change=True)`,
`load_preset_at_container_position(container_cid, position, wait_change=True)`,
`save_preset_with_cid(cid, wait_clean=True)` (verified: polls the unsaved-edits
flag and returns `{"saved": True}` / `{"saved": False, "reason": ...}`),
`rename_content(cid, name)`,
`set_content_path(cid, path)`, `set_content_data(cid, data)`,
`set_content_attrs(cid, attrs)`, `add_contents_to_container(...)`,
`reorder_container_content(...)`, `remove_content(container_cid, content_ids)`,
`set_content_info(...)`, `delete_content_info(...)`.

Use the `*_CID` constants for the factory/user/setlist roots.

### Edit buffer: blocks, params, routing

`insert_block(...)`, `set_model(path, block, model_id, slot=0)`,
`set_block_enable(path, block, enabled)`,
`set_param_value(path, block, param_id, value, slot=0, flags=-1)`,
`set_harness_param_value(...)`, `clear_blocks(flow, blocks)`,
`clear_block_position(flow, position)`, `clear_positions(flow, positions)`,
`clear_all_blocks(path=None)`, `copy_path(source_path, target_path)`,
`set_split_destination(...)`, `set_join_origin(...)`.

### Misc setters and escape hatches

`set_property(key, value, value_type="s", property_id=0)`,
`set_preset_notes(text)`, `set_preset_notes_visible(visible)`,
`set_auto_cab(enabled)`, `do_agenda(commands)`, and the raw
`send(address, typetags, args)` / `send_and_wait_status(...)` /
`request(...)` primitives for protocol work not yet wrapped by a helper.

Mutating methods take `wait_status=True` (or `wait_change` / `wait_clean`) to
block until the device confirms the operation; pass `False` to fire-and-forget.

## OSC codec (`helix.osc`)

```python
from helix import build_osc, decode_osc

msg = build_osc("/PresetName", "s", ["Verse A"])
addr, typetags, values = decode_osc(msg)
```

`build_osc(address, typetags, args)` encodes; `decode_osc(msg)` returns
`(address, typetags, values)` or `None` on a malformed message. Supported
type tags: `i` (int32), `h` (int64), `f` (float32), `s` (string), `b` (blob),
`T`/`F` (booleans, no payload).

## msgpack blobs (`helix.blobs`)

`build_property_blob(key, value, value_type="s")` builds the
`PropertyValueSet` payload; `decode_property_blob(blob)` and
`decode_msgpack_blob(blob)` decode device blobs back into Python values.
Four-character-code maps can be normalised with `normalize_fourcc_map`.

## Discovery (`helix.discovery`)

Bonjour browsing via the system `dns-sd` (macOS). `browse_services(timeout=5.0)`
lists visible `_stadiumserver._tcp` instances; `resolve_service(instance)`
resolves one to a `HelixService`; `discover_first_service()` does both and is
what `HelixSession` calls when `host` is omitted. Failures raise
`HelixDiscoveryError`.

## Matrix Mixer (`helix.matrix_mixer`)

`parse_matrix_mixer_state(value)` decodes the mixer property into structured
channel/layer data; `apply_matrix_mixer_event(state, event)` folds a pushed
update into an existing state. `MATRIX_CHANNEL_LABELS` / `MATRIX_LAYER_LABELS`
provide human-readable names and `MATRIX_MIXER_PROPERTY` is the property key to
request.

## Errors

All session failures derive from `HelixSessionError`. Catch that for a coarse
net, or the specific subclasses (`HelixTimeoutError`, `HelixStatusError`) and
`HelixDiscoveryError` for finer handling.
