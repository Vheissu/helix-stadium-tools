# Helix Stadium XL Editor Protocol — Technical Details

This document captures the observed on‑wire behaviour of the Helix Stadium XL editor protocol. It is intended to guide future implementations and tooling. Everything here is reverse‑engineered from local captures and may change with firmware or editor updates.

## Overview

The editor communicates over TCP and uses OSC payloads wrapped inside ZeroMQ ZMTP 3.0 frames. Two ports are used:

- **2001**: Device → editor updates and heartbeats (ZMTP `ROUTER` → client `SUB`).
- **2002**: Editor → device control messages (ZMTP `ROUTER` ← client `DEALER`).

Without the ZMTP handshake the device will reset the TCP connection. Once the ZMTP handshake is complete, OSC payloads are exchanged inside ZMTP data frames.

## Discovery

The device advertises `_stadiumserver._tcp` via Bonjour. Example on macOS:

```bash
/usr/bin/dns-sd -B _stadiumserver._tcp
/usr/bin/dns-sd -L p35x1 _stadiumserver._tcp
```

This yields the hostname (e.g. `p35x1.local`) and the TCP ports.

The Python tooling in this repo now uses the same discovery path when `--host` is omitted: browse `_stadiumserver._tcp`, resolve the first visible instance, then connect to the advertised port and the adjacent command port.

## ZMTP 3.0 handshake

Both ports require the standard ZMTP 3.0 handshake:

1) **Client greeting** (64 bytes, `NULL` mechanism).
2) **Server greeting** (64 bytes).
3) **READY command** frame describing socket type.
4) **READY command** reply from server.

Observed socket types:

- Port **2002**: client `DEALER`, server `ROUTER`
- Port **2001**: client `SUB`, server `ROUTER`

### SUBSCRIBE on port 2001

After the READY exchange on port 2001, the client sends a SUBSCRIBE frame. The editor subscribes to all topics by sending an empty subscription. On the wire this appears as a short data frame with a single byte payload `0x01`.

### ZMTP framing

Each ZMTP frame is:

- **Short frame**: `flags (1 byte)` + `length (1 byte)` + payload
- **Long frame**: `flags (1 byte)` with bit `0x02` set + `length (8 bytes, big‑endian)` + payload

The `flags` byte also uses:

- `0x04` — command frame (READY)
- `0x01` — more frames (multipart / topic)

### Command vs data frames

After the handshake, the editor and device exchange **data frames** that contain OSC payloads. Command frames are only used during the handshake.

## OSC payloads

OSC payloads follow the standard OSC layout: address string, type tag string, then typed arguments.

### Port 2002 (editor → device)

ZMTP data frames contain **raw OSC packets**. Example:

```
/ParamValueSet ,iiiiifi [cmdId, path, block, 0, paramId, value, -1]
```

### Port 2001 (device → editor)

OSC payloads are wrapped in a 12‑byte header before the OSC message body:

- u16 version (observed `0x0108`)
- 6 bytes reserved (zero)
- u16 sequence
- u16 OSC message length

Example decoded payload:

```
/setParamValue ,iiiiiif [sessionId, cmdId, path, block, 0, paramId, value]
```

### Common OSC addresses

- `/ParamValueSet` (editor → device)
- `/setParamValue` (device → editor)
- `/BlockEnableSet` (editor → device)
- `/setBlockEnable` (device → editor)
- `/ModelSet` and `/setModelWithMID` (model change / model ID mapping)
- `/GetContentRef`, `/GetContainerContents`, `/GetContentData`, and `/GetContentPath` (library/content browsing)
- `/LoadPresetWithCID` and `/LoadPresetAtContainerPosition` (preset recall)
- `/SnapshotCountGet`, `/ActiveSnapshotIndexGet`, `/SnapshotTargetsGet`, and `/activateSnapshot` (snapshot navigation)
- `/SetSnapshotName` and `/setSnapshotName` (snapshot naming)
- `/CopySnapshot` and `/SnapshotColorSet` (snapshot copy / color)
- `/PropertyValueSet` and `/setPropertyValue` (property updates, including scribble strips)
- `/heartbeat` (device → editor)
- `/status` (device → editor, on port 2002)

## Auto-cab insertion

The editor toggles auto-cab insertion via a global property:

```
/PropertyValueSet ,iib [cmdId, 0, <blob for key=global.modelselect.addcabblock, type=i, val_=0|1>]
```

When `global.modelselect.addcabblock` is **1**, inserting an amp into an *empty* block via `/ModelSet` causes the device to auto-insert a matching cab immediately after the amp. When the setting is **0**, `/ModelSet` inserts only the amp.

## Snapshot naming

Editor command:

```
/SetSnapshotName ,iis [cmdId, snapshotIndex, "Name"]
```

Device response on port 2001:

```
/setSnapshotName ,iiis [sessionId, cmdId, snapshotIndex, "Name"]
```

Acknowledgement on port 2002:

```
/status ,iii [cmdId, 0, 1]
```

## Snapshot recall

Verified editor command:

```
/activateSnapshot ,iii [cmdId, snapshotIndex, 0]
```

Observed device push on port 2001:

```
/activateSnapshot ,iii [sessionId, cmdId, snapshotIndex]
```

Notes:

- `/ActiveSnapshotIndexGet` returns `/getActiveSnapshotIndex ,ii [cmdId, snapshotIndex]`
- `/SnapshotCountGet` returns `/getSnapshotCount ,ii [cmdId, snapshotCount]`
- The `/status` payload for `/activateSnapshot` does not follow the usual `0,0 == success` pattern, so clients should confirm snapshot changes by polling `ActiveSnapshotIndexGet` or by watching the port-2001 push event.

Additional snapshot commands verified against a live device:

```
/CopySnapshot ,iii [cmdId, sourceSnapshotIndex, targetSnapshotIndex]
/SnapshotColorSet ,iii [cmdId, snapshotIndex, colorEnum]
/SnapshotTargetsGet ,ii [cmdId, snapshotIndex]
```

Observed acknowledgement on port 2002:

```
/status ,iii [cmdId, 0, 1]
```

The second status field still appears to be the error code; the trailing `1` looks more like a change/result flag than a failure.

Observed `SnapshotTargetsGet` response:

```
/getSnapshotTargets ,iibi [cmdId, 0, <msgpack blob>, 0]
```

Decoded blob values looked like a flat list of raw assignment ids. Example for one
snapshot:

```
[16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 15, 14, 13, 12, 11, 10, 9, 8, 7, 5, 4, 3, 2]
```

## Content library browsing

The editor uses content ids (`cid_`) and container ids to browse presets and setlists.

Verified requests:

```
/GetContentRef ,ii [cmdId, contentId]
/GetContainerContents ,ii [cmdId, containerId]
/GetContentData ,ii [cmdId, contentId]
/GetContentPath ,ii [cmdId, contentId]
```

Observed responses reuse the same OSC address and return a msgpack blob plus a trailing integer:

```
/GetContentRef ,ibi [cmdId, <blob>, 0]
/GetContainerContents ,ibi [cmdId, <blob>, 0]
/GetContentData ,ibi [cmdId, <blob>, 0]
/GetContentPath ,isi [cmdId, "<path>", 0]
```

Useful container ids observed on a live device:

- `-1` — Factory Presets
- `-2` — User Presets
- `-5` — Setlist Directory

Example `GetContentRef` fields:

- `cid_` — content id
- `ccid` — parent container id
- `cctp` — parent container type
- `name` — display name
- `posi` — zero-based position inside the container
- `rcid` — backing raw preset id for setlist entries
- `type` — observed `1` for setlist refs and `2` for raw preset refs

Practical notes:

- Setlist entries are often references to a backing raw preset (`rcid`).
- Renaming the active preset by its setlist reference id may be a no-op; renaming the backing raw id updates both the raw item and the active preset label.

## Preset recall

Confirmed working requests:

```
/LoadPresetWithCID ,ii [cmdId, contentId]
/LoadPresetAtContainerPosition ,iii [cmdId, containerId, position]
```

Observed acknowledgement on port 2002:

```
/status ,iii [cmdId, 0, 0]
```

Practical notes:

- `server.active.preset.id` exposes the currently active preset content id via `PropertyValueGet`.
- `LoadPresetWithCID` works with both raw preset ids (for example entries from `-2`) and setlist content refs.
- `LoadPresetAtContainerPosition` is the simplest way to recall the item currently shown in a browsed container list.

## Preset save and content attrs

Additional live requests:

```
/SavePresetWithCID ,ii [cmdId, contentId]
/SetContentAttrs ,iib [cmdId, contentId, <msgpack attrs blob>]
/SetContentData ,iib [cmdId, contentId, <msgpack blob>]
/SetContentPath ,iis [cmdId, contentId, "<path>"]
```

Observed behaviour:

- `SavePresetWithCID` accepts the request but did not emit a synchronous `/status` acknowledgement during testing.
- `SetContentAttrs` responds with `/status ,iii [cmdId, 0, 1]` on success.
- `SetContentData` responds with `/status ,iii [cmdId, 0, 1]` on success.
- `SetContentPath` responds with `/status ,iii [cmdId, 0, 1]` on success.
- Re-sending the `GetContentRef` attrs blob through `SetContentAttrs` succeeds.
- Re-sending the current `GetContentData` blob through `SetContentData` succeeds.
- Updating the `name` field in that attrs blob successfully renames:
  - raw preset ids (for example the `rcid` behind an active setlist entry)
  - setlist container ids

Additional live content-management requests:

```
/GetAllContentInfo ,ii [cmdId, contentType]
/SetContentInfo ,iiss [cmdId, contentType, key, value]
/GetContentInfo ,iis [cmdId, contentType, name]
/DeleteContentInfo ,iis [cmdId, contentType, key]
/FindContentMatches ,iiss [cmdId, contentType, query, location]
/AddContentsToContainer ,iibiii [cmdId, containerId, <msgpack [contentIds...]>, position, flagA, flagB]
/ReorderContainerContent ,iibi [cmdId, containerId, <msgpack [contentIds...]>, position]
/RemoveContent ,iib [cmdId, containerId, <msgpack [contentIds...]>]
```

Observed responses:

```
/GetAllContentInfo ,iibi [cmdId, contentType, <msgpack blob>, status]
/GetContentInfo ,iisi [cmdId, contentType, "<string>", value]
/FindContentInfo ,iissbi [cmdId, contentType, "<string>", "<string>", <msgpack blob>, value]
/status ,iii [cmdId, 0, 1]
```

Practical notes:

- `AddContentsToContainer` with `flagA=0` and `flagB=0` was verified to add a raw preset id to a setlist as a new setlist entry without removing the backing raw preset from the user library.
- `RemoveContent` with the setlist container id removes those created setlist-entry refs cleanly.
- `ReorderContainerContent` uses an insertion index, not a final position. For forward moves, appending to the end of a 6-item container required `position=6`, not `position=5`.
- `SetContentInfo`, `GetContentInfo`, `GetAllContentInfo`, and `DeleteContentInfo` all work against the device's content-info store.
- `GetContentInfo` and `FindContentMatches` return valid responses from the device, but the higher-level meaning of the string/value fields returned by `FindContentMatches` is still unresolved.

Commands present in the desktop app binary but still unverified or unresolved on the device:

- `/CreateContent`

Current live probe status:

- The desktop app binary still contains the `/CreateContent` route string.
- A direct network probe against the current device returned `/error ,iis [cmdId, 0, "Msg dispatch failed: /CreateContent is NOT known!!!"]`.
- Do not ship a public `CreateContent` wrapper yet; the transport or preconditions are still unresolved.

## Direct clear + structural routing commands

Confirmed live:

```
/clrBlock ,iii [cmdId, flow, position]
```

Notes:

- `/clrBlock` clears by visible flow position, not by the raw `bmap` block id.
- `/clrBlock` returns `/status ,iii [cmdId, 0, 1]` on success.

Confirmed live:

```
/SplitDestinationSet ,iiiii [cmdId, flow, position, linkedFlow, linkedBlock]
/JoinOriginSet ,iiiii [cmdId, flow, position, linkedFlow, linkedBlock]
```

Notes:

- The device accepts the `iiiii` request shape for both commands.
- `flow` and `position` are the visible path/flow indices for the split or join node being edited.
- `linkedFlow` and `linkedBlock` are also visible flow/position values, not raw `bmap` ids.
- `SplitDestinationSet` updates the split node's `bflw`/`bblk` link immediately.
- `JoinOriginSet` updates the join node's `bflw`/`bblk` link immediately.
- Invalid value combinations return `/status` with `[-4, 1]`.
- Path copy should treat the concrete split/join nodes as copyable routing blocks and ignore any extra derived shadow markers that appear only in the graph representation.

## Agenda commands (batch actions)

Some editor actions are sent via `/doAgenda` with a msgpack blob containing a list of small command objects. Observed example when using **Clear all blocks**:

```
/doAgenda ,ib [cmdId, <blob>]
```

Decoded msgpack (example):

```
[
  {"bloc": 1, "cmnd": "clrb", "flow": 0},
  {"bloc": 2, "cmnd": "clrb", "flow": 0}
]
```

Notes:

- `cmnd: "clrb"` appears to mean **clear block**.
- `bloc` is a block index in the path (see edit buffer state).
- `flow` appears to be the path/flow identifier (0 in the example).

This suggests that batched operations (clear, insert, etc.) may be expressed via `/doAgenda` entries. We need more captures to fully enumerate `cmnd` values.

## Scribble strip labels

Scribble labels are sent via `/PropertyValueSet` with a msgpack blob. The blob format:

```
payload = b"lavppgsm" + msgpack({ key_, type, val_ })
```

Where:

- `key_` is a FourCC int (`"key_"`) mapping to a string like:
  - `preset.floorboard.stomp.a.7.label`
- `type` is a FourCC int (`"type"`) with value `"s"` for strings.
- `val_` is a FourCC int (`"val_"`) with the label string.

The editor also updates related properties like `preset.floorboard.stomp.a.7.topidx`.

## Preset notes

Notes text updates are sent via `/PropertyValueSet` with:

- `key_`: `preset.meta.info`
- `type`: `s`
- `val_`: full notes text (including newlines)

The notes panel open/close events appear as `volatile.presetinfo.open` and
`volatile.presetinfo.close` (type `i`, value `1`). These look like UI
commands rather than persistent preset state.

## Matrix Mixer device updates

Hardware-side Matrix Mixer edits are emitted on the subscribed device stream
after the port 2001 SUB handshake. A live read-only subscription captured these
events while changing Matrix controls on the Helix itself:

- `/syncMixChannelVolume ,iiiif [session, event_id, output_layer, channel, level_db]`
- `/syncMixChannelPan ,iiiif [session, event_id, output_layer, channel, pan]`
- `/syncMixChannelMute ,iiiii [session, event_id, output_layer, channel, enabled]`
- `/syncMixChannelSolo ,iiiii [session, event_id, output_layer, channel, enabled]`
- `/syncMixAttachedOut ,iii [session, event_id, output_layer]`

The observed volume range is `-120.0` to `6.0`, matching the UI's `-120 dB`
minimum and `+6.00 dB` maximum. A UI stop at `0.00 dB` emitted
`0.000337966` in one live capture, so clients should round display values and
compare near-zero values with tolerance.

The observed pan range is normalised from `-1.0` to `1.0`: UI `L100` emits
`-1.0`, centre emits `0.0`, and UI `R100` emits `1.0`. Intermediate UI values
map proportionally, for example `L65` near `-0.65` and `R42` near `0.42`.
Mute and solo values are integer booleans (`1` enabled, `0` disabled).

Observed output layers:

- `1`: 1/4" Matrix Mixer, selected with LED index `14`
- `2`: XLR Matrix Mixer, selected with LED index `15`
- `3`: Phones Matrix Mixer, selected with LED index `16`

Selecting an output layer emits `/syncMixAttachedOut` twice, followed by LED
updates for the three Matrix output buttons. Captures across XLR, 1/4", and
Phones saw channel ids including `5` and `14` through `18`. Those ids line up
with the group of controls changed during testing (paths, song, count-in,
USB 1/2, and Bluetooth), but the exact channel-id-to-label mapping still needs
a one-control-at-a-time capture.

Reusable capture helper:

```
python3 scripts/matrix_mixer_monitor.py --host auto --duration 60 --include-led
```

Confirmed write commands use the same `sync` addresses without the leading
session/event fields. Send these on the command socket:

- `/syncMixChannelVolume ,iiif [cmd_id, output_layer, channel, level_db]`
- `/syncMixChannelPan ,iiif [cmd_id, output_layer, channel, pan]`
- `/syncMixChannelMute ,iiii [cmd_id, output_layer, channel, enabled]`
- `/syncMixChannelSolo ,iiii [cmd_id, output_layer, channel, enabled]`

The device replies on the command socket with `/success ,ii [cmd_id, 0]` and
then pushes the matching subscribed update with `[session, cmd_id, output_layer,
channel, value]`. This was verified on layer `1` (1/4" Matrix Mixer), channel
`5`, by setting volume to `6.0`, `0.0`, and `-120.0`; pan to `-1.0`, `0.0`,
and `1.0`; and mute/solo to `1` and back to `0`.

The desktop binary also contains `/syncMatrixMixer`, `/syncMixerLinkedOutputs`,
and `/MixerSave`, but those were not observed in these captures. These captures
prove Matrix state tracking and direct Matrix channel control are possible.
Persistence/save behaviour is not confirmed yet.

## Model ID mapping

Model IDs in `/ModelSet` and `/setModelWithMID` do **not** match `ModelMetadataStore.sqlite3`. They match the `id` field in the modeldefs msgpack file:

```
/Applications/Line6/Helix Stadium.app/Contents/Resources/modeldefs/p35md-*.bin
```

Each model entry provides:

- `id` (used on the wire)
- `params` (param name → param info)

Parameter IDs can be mapped to names using the `params` map for the model in use.

## Input/Output blocks in EditBufferState

Input/Output blocks live inside each `sfg_.flow` entry, alongside standard blocks. The `blks` list is usually encoded as alternating `[pos, block]` pairs:

- Row A positions: `0` (Input), `1–12` (blocks), `13` (Output)
- Row B positions: `14` (Input), `15–26` (blocks), `27` (Output)

`bmap` still exposes useful structure, but live testing shows that writes on the second flow are keyed by visible position. In practice:

- `/clrBlock` uses `flow + position`
- `/ModelSet`, `/BlockEnableSet`, and `/ParamValueSet` work reliably with visible positions on flow 1
- raw `bmap` ids on flow 1 acknowledge but do not reliably change the device state

Row B inputs (1B/2B) are derived from the split and are not directly configurable in the editor UI.

## Remote access

The device exposes a Remote Access setting (Allow / Deny / Require PIN). If PIN is required, additional authorisation steps are expected. This flow is not yet reverse engineered.

## Practical implementation notes

- Always perform the ZMTP handshake before sending OSC.
- Handle long ZMTP frames (8‑byte length) or large responses will be corrupted.
- Port 2001 requires a SUBSCRIBE frame (empty topic) to receive updates.
- Keep a single session open when issuing multiple commands; the device responds with `/status` per command.
- Expect `/heartbeat` messages at a steady cadence on port 2001.
- The device->editor stream on port 2001 may arrive as either raw OSC or OSC wrapped in the 12-byte Helix header, so clients should handle both forms.
- Use short socket poll timeouts inside longer command deadlines; otherwise a blocking `recv()` can bypass the higher-level retry and timeout policy.

## Reference tooling in this repo

- `scripts/osc_session.py` — ZMTP handshake + simple command send.
- `scripts/helix_control.py` — programmatic control tool (CLI + batch JSON).
- `scripts/osc_pcap_dump.py` — decode pcaps, including ZMTP frame parsing and topics.

## Safety

This is reverse‑engineered behaviour. Use a spare preset when experimenting, and respect Line 6’s licensing and support policies.

## Live decode workflow

If you want to discover new commands, you can stream a capture directly into the decoder:

```bash
sudo tcpdump -i en0 -s 0 -U -w - tcp port 2001 or tcp port 2002 | \
  python3 scripts/osc_pcap_dump.py --reassemble -
```

## Capture gotchas

- Edits made on the **device itself** do not traverse the editor-to-device
  command stream. Device-to-client subscriptions can still receive hardware
  state updates such as Matrix Mixer sync events.
- Use the **macOS editor app** for any actions you want to observe.
- If your `.pcap` file is ~24 bytes, no packets were captured; re‑run the capture and ensure the editor is connected.
