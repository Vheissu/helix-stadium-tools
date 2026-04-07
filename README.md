# Helix Stadium XL Editor Protocol + Model Extractor

[![codecov](https://codecov.io/gh/Vheissu/helix-stadium-tools/branch/main/graph/badge.svg)](https://codecov.io/gh/Vheissu/helix-stadium-tools)

This repo contains tools and data extraction scripts for understanding the Helix Stadium XL editor protocol and generating structured model metadata suitable for AI-driven preset builders.

> **Disclaimer:** This is an unofficial, independent open-source project and is not affiliated with, endorsed by, or associated with Yamaha Guitar Group, Line 6, or any of their subsidiaries. All trademarks, logos, and brand names (including but not limited to "Helix", "Line 6", and "Yamaha") are the property of their respective owners and are used here solely for identification purposes. Use of these names does not imply any affiliation or endorsement.

All paths assume the macOS editor app is installed at:

- `/Applications/Line6/Helix Stadium.app`

Note: The mobile prototype (see `mobile/`) uses per-model DSP `usage` values from the modeldefs bundle and applies a conservative **70 usage** cap per path for meters/grey-out.

## Repo layout

- `scripts/`
  - `osc_pcap_dump.py` - Parse OSC-over-TCP traffic captured in a pcap.
  - `osc_client.py` - Minimal OSC-over-TCP client (read-only by default).
  - `osc_session.py` - ZMTP-aware session client that performs the handshake and can send commands.
  - `helix_control.py` - Programmatic control tool (batch actions, snapshot names, scribble labels, etc.).
  - `helix_usb_probe.py` - Inspect the connected device's USB interfaces and endpoints via libusb.
  - `set_scribble_label.py` - Set a footswitch scribble-strip label via PropertyValueSet.
  - `generate_helix_model_json.py` - Build JSON model catalogs (amps/bass/effects/cabs).
  - `based_on_overrides.json` - Official "based on" mappings scraped from Line 6's model list page.
  - `block_map.json` - Optional manual block-to-model mapping for decoding older captures.
- `docs/TECHNICAL_DETAILS.md` - Protocol details (handshake, framing, OSC messages).
- `docs/USB_TRANSPORT_NOTES.md` - Current findings on USB-C and Bluetooth transport surfaces.
- `generated/helix-models/`
  - `guitar_amps.json`
  - `bass_amps.json`
  - `effects.json`
  - `guitar_cabs.json`
  - `bass_cabs.json`
  - `ir_cabs.json`
  - `all_models.json`

## Requirements

- Python 3.10+ recommended
- `msgpack` (required for modeldefs parsing)
- Standard library only for everything else

Install msgpack:

```bash
python3 -m pip install msgpack
```

Install dev dependencies:

```bash
python3 -m pip install -r requirements-dev.txt
```

## Quick library example

```python
from helix import HelixSession

with HelixSession(
    None,  # auto-discover via Bonjour
    timeout=5.0,
    retries=2,
    retry_delay=0.1,
    discover_timeout=5.0,
    raise_on_timeout=True,
) as session:
    info = session.get_product_info()
    print(info)
    session.set_snapshot_name(0, "Dwayne!")
    update = session.recv_update(timeout=1.0)
    print(update)
```

## Testing

Run unit tests:

```bash
python3 -m unittest discover -s tests
```

Run tests with coverage:

```bash
python3 -m coverage run -m unittest discover -s tests
python3 -m coverage report -m
python3 -m coverage xml
```

## USB transport reconnaissance

The current editor protocol in this repo covers the network path. For USB-C and
Bluetooth reconnaissance, see [`docs/USB_TRANSPORT_NOTES.md`](docs/USB_TRANSPORT_NOTES.md).

To inspect the live USB descriptor layout of a connected device:

```bash
python3 scripts/helix_usb_probe.py
```

To verify that the private vendor interface is claimable and perform a passive
bulk-IN read:

```bash
python3 scripts/helix_usb_probe.py --claim-interface 6 --read-endpoint 0x85
```

To send the same read-only bootstrap commands the desktop app uses on the
vendor bulk interface:

```bash
python3 scripts/helix_usb_probe.py \
  --claim-interface 6 \
  --write-endpoint 0x04 \
  --read-endpoint 0x85 \
  --send-command version \
  --send-command status \
  --read-attempts 5 \
  --read-interval-ms 200
```

On the device used for validation, `version` returned the 4-byte value
`0x13010535`. The update-state command `status` initially returned `idle`, and
after sending `abort` it returned `abort`.

The probe also supports deeper experiments:

```bash
python3 scripts/helix_usb_probe.py \
  --claim-interface 6 \
  --write-endpoint 0x04 \
  --read-endpoint 0x85 \
  --send-command-payload size=78563412 \
  --read-attempts 5 \
  --read-interval-ms 200

python3 scripts/helix_usb_probe.py \
  --claim-interface 6 \
  --write-endpoint 0x04 \
  --read-endpoint 0x85 \
  --send-chunk-hex 2f50726f64756374496e666f476574000000002c69000000000001 \
  --read-attempts 5 \
  --read-interval-ms 200
```

The second example sends a type-2 binary frame carrying a read-only OSC
`/ProductInfoGet` request. In current testing it produced no USB response,
which suggests the existing vendor interface is still update-oriented rather
than a hidden OSC edit tunnel.

Additional preset-level USB experiments reached the same conclusion: a type-2
frame carrying raw `/LoadPresetWithCID` OSC did not change the active preset,
and wrapping OSC with the 12-byte `0x0108` header used on TCP port `2001`
likewise produced no USB response or preset change.

## Protocol overview (observed)

Helix Stadium XL editor traffic uses OSC over TCP with two ports. Both ports are wrapped in a ZeroMQ ZMTP 3.0 handshake and framing layer:

- **Port 2001**: Device -> editor (SUB/ROUTER).
  - ZMTP handshake required (client identifies as `SUB`, server as `ROUTER`).
  - Client must send a one-byte subscribe frame (`0x01`) to receive topics.
  - ZMTP data frames contain OSC messages wrapped in a 12-byte header:
    - u16 version (observed `0x0108`)
    - 6 bytes reserved (zero)
    - u16 sequence
    - u16 OSC message length
- **Port 2002**: Editor -> device (DEALER/ROUTER).
  - ZMTP handshake required (client identifies as `DEALER`, server as `ROUTER`).
  - ZMTP data frames contain raw OSC messages.

ZMTP framing notes:

- Short frames: 1-byte flags + 1-byte length.
- Long frames: flags include `0x02` (or `0x06` for command frames) and length is 8-byte big-endian.

Common OSC addresses seen in captures:

- `/ParamValueSet` (editor -> device)
- `/setParamValue` (device -> editor)
- `/BlockEnableSet` (editor -> device)
- `/setBlockEnable` (device -> editor)
- `/ModelSet` and `/setModelWithMID` (model change / model ID mapping)
- `/GetContentRef`, `/GetContainerContents`, `/GetContentData`, and `/GetContentPath` (library/content browsing)
- `/LoadPresetWithCID`, `/LoadPresetAtContainerPosition`, `/SavePresetWithCID`, `/SetContentAttrs`, `/SetContentData`, `/SetContentPath`, `/AddContentsToContainer`, `/ReorderContainerContent`, and `/RemoveContent` (preset/content operations)
- `/ActiveSnapshotIndexGet`, `/SnapshotCountGet`, `/SnapshotTargetsGet`, `/activateSnapshot`, `/CopySnapshot`, `/SnapshotColorSet`, and `/SetSnapshotName` (snapshot navigation)
- `/heartbeat` (device -> editor)

Notes:

- This repo only decodes the above framing and the OSC payloads; it does not attempt to implement the full editor protocol.
- Captures are assumed to be Ethernet + IPv4 + TCP (no VLAN parsing).

## Listener / capture workflow

1) Capture traffic while editing (macOS example):

```bash
sudo tcpdump -i en0 -s 0 -w /tmp/helix-stadium.pcap tcp port 2001 or tcp port 2002
```

Important:

- **Make changes in the macOS editor app**, not on the device touchscreen. Device‑local edits won’t hit the network and won’t appear in the capture.
- If the capture file is ~24 bytes, it’s empty (no packets captured).
- After stopping capture, ensure you can read the file:
  ```bash
  sudo chown "$USER" /tmp/helix-stadium.pcap
  ```

Live decode (streaming):

```bash
sudo tcpdump -i en0 -s 0 -U -w - tcp port 2001 or tcp port 2002 | \
  python3 scripts/osc_pcap_dump.py --reassemble -
```

2) Parse the pcap:

```bash
python3 scripts/osc_pcap_dump.py /tmp/helix-stadium.pcap
```

If the capture has larger packets or reassembly issues, add `--reassemble`:

```bash
python3 scripts/osc_pcap_dump.py --reassemble /tmp/helix-stadium.pcap
```

3) Optional: decode parameter names using model defs:

```bash
python3 scripts/osc_pcap_dump.py /tmp/helix-stadium.pcap \
  --modeldefs "/Applications/Line6/Helix Stadium.app/Contents/Resources/modeldefs/p35md-26002601-1_2_0_0.bin"
```

## scripts/osc_pcap_dump.py

Parses a pcap/pcapng capture and prints decoded OSC messages.

Key features:

- Detects port 2001 (framed OSC inside ZMTP data frames) and port 2002 (raw OSC inside ZMTP data frames)
- Tracks `/ModelSet` and `/setModelWithMID` to map block -> model automatically
- Resolves parameter IDs to names using `modeldefs` (msgpack)
- Optional manual `block_map.json` support for older captures

Useful flags:

- `--ports 2001,2002` (default)
- `--model <name>` to map indices against a specific model
- `--model-file <path>` (defaults to `P35ModelUIDefs.json`)
- `--modeldefs <path>` for MID -> model lookup
- `--block-map <path>` for manual block mapping
- `--reassemble` strongly recommended for ZMTP streams (frames often split across TCP segments)
- `--show-topics` to print ZMTP topic frames (port 2001)

## scripts/osc_client.py

A minimal OSC-over-TCP client.

- Default behavior is **read-only**: connect and print incoming frames
- Optional `--send` to transmit a single OSC message
- Does **not** implement the ZMTP handshake, so it is best used for passive observation or quick experiments

Examples:

```bash
# Listen to device -> editor updates
python3 scripts/osc_client.py --host p35x1.local --port 2001

# Send a one-off command to port 2002
python3 scripts/osc_client.py --host p35x1.local --port 2002 \
  --send /ParamValueSet iiiiifi 1 0 2 0 5 0.7 -1
```

If you only want to send a command and exit (common with port 2002), add `--send-only`:

```bash
python3 scripts/osc_client.py --host p35x1.local --port 2002 \
  --send /SetSnapshotName iis 100 0 "Lyrics A" --send-only
```

If the device drops the connection, use `osc_session.py` instead.

## scripts/osc_session.py

ZMTP-aware client that performs the correct handshake and keeps both sockets open.

Examples:

```bash
# Run the handshake and print responses
python3 scripts/osc_session.py --host p35x1.local

# Rename snapshot 0
python3 scripts/osc_session.py --host p35x1.local --snapshot 0 "Dwayne!"
```

## scripts/helix_control.py

Programmatic control tool that performs the ZMTP handshake and applies actions.

Examples:

```bash
# Rename a snapshot
python3 scripts/helix_control.py snapshot-name --index 0 --name "Dwayne!"

# Update a scribble strip label
python3 scripts/helix_control.py scribble-label --stomp a.7 --label "MY LABEL"

# Show the auto-discovered device details
python3 scripts/helix_control.py discover

# Read a property value
python3 scripts/helix_control.py get-property --key global.remote.access

# Read product info
python3 scripts/helix_control.py get-product-info

# Read the edit buffer state (large blob)
python3 scripts/helix_control.py get-edit-buffer

# Show the active preset content ref
python3 scripts/helix_control.py get-active-preset

# List visible setlists
python3 scripts/helix_control.py list-setlists

# List presets from the user preset pool
python3 scripts/helix_control.py list-presets --root user

# List presets from a specific setlist/container
python3 scripts/helix_control.py list-presets --container-cid 500

# Load a preset by container position
python3 scripts/helix_control.py load-preset --container-cid 500 --position 5

# Load a preset directly by content id
python3 scripts/helix_control.py load-preset --cid 508

# Read snapshot metadata
python3 scripts/helix_control.py get-snapshot-count
python3 scripts/helix_control.py get-active-snapshot
python3 scripts/helix_control.py get-preset-edited
python3 scripts/helix_control.py list-snapshots
python3 scripts/helix_control.py get-snapshot-targets --index 0

# Activate snapshot 4 (zero-based index)
python3 scripts/helix_control.py activate-snapshot --index 4

# Copy snapshot 2 onto snapshot 3
python3 scripts/helix_control.py copy-snapshot --source 1 --target 2

# Rename snapshot 1
python3 scripts/helix_control.py snapshot-name --index 0 --name "Snapshot 1"

# Set snapshot 1 to the desktop-app color name "Off"
python3 scripts/helix_control.py snapshot-color --index 0 --color off

# Rename the backing raw preset content
python3 scripts/helix_control.py rename-content --cid 507 --name "Glory Belongs Test (HB)"

# Save the current active preset back to its backing content slot
python3 scripts/helix_control.py save-preset

# Show the device content path for a raw preset id
python3 scripts/helix_control.py get-content-path --cid 507

# Write the raw preset content blob to disk
python3 scripts/helix_control.py get-content-data --cid 507 --output /tmp/preset-507.bin

# Probe the device-backed content info/search routes
python3 scripts/helix_control.py get-content-info --content-type 0 --name "Glory Belongs Test (HB)"
python3 scripts/helix_control.py find-content --content-type 0 --query "Glory"

# Re-send the current path/blob back to the same raw preset id
python3 scripts/helix_control.py set-content-path --cid 507 --path ""
python3 scripts/helix_control.py set-content-data --cid 507 --input /tmp/preset-507.bin

# Add the raw preset 507 to setlist 500 as a new ref, then remove that returned setlist-entry cid again
python3 scripts/helix_control.py add-to-container --container-cid 500 --content-ids 507 --position 6
python3 scripts/helix_control.py remove-content --container-cid 500 --content-ids NEW_SETLIST_ENTRY_CID

# Reorder setlist entries by insertion index
python3 scripts/helix_control.py reorder-content --container-cid 500 --content-ids 508 --position 6

# Toggle auto-cab insertion
python3 scripts/helix_control.py set-autocab --enabled on

# Insert a block (clears target + next slot, optionally toggles auto-cab)
python3 scripts/helix_control.py insert-block --path 0 --block 1 --model-id 749 --auto-cab on --clear

# Insert a block by human-friendly name (resolved via model map/resources)
python3 scripts/helix_control.py insert-block --path 0 --block 1 --model "US Tweedman" --auto-cab on --clear

# Set a parameter on an IO block by name
python3 scripts/helix_control.py io-param --row 1A --type input --param Pad --value on

# Set a parameter on a visible signal block by row + position
python3 scripts/helix_control.py block-param --row 1A --position 3 --param Drive --value 6.0

# Clear all blocks (both paths)
python3 scripts/helix_control.py clear-all-blocks

# Clear all blocks on a single path/flow
python3 scripts/helix_control.py clear-all-blocks --path 0

# Short alias
python3 scripts/helix_control.py clear-all

# Watch push updates for 15 seconds
python3 scripts/helix_control.py --duration 15 monitor

# Increase timeout/retry policy
python3 scripts/helix_control.py --timeout 6 --retries 2 --retry-delay 0.2 \
  snapshot-name --index 0 --name "Dwayne!"

# Run a batch of actions
cat > /tmp/helix-actions.json <<'JSON'
[
  {"op": "snapshot_name", "index": 0, "name": "Lyrics A"},
  {"op": "scribble_label", "stomp": "a.7", "label": "CHORUS"},
  {"op": "block_enable", "path": 1, "block": 6, "enabled": 1}
]
JSON
python3 scripts/helix_control.py --actions /tmp/helix-actions.json
```

Supported action ops:

- `snapshot_name` (`index`, `name`)
- `rename_snapshot` / `rename-snapshot` (alias of `snapshot_name`)
- `activate_snapshot` / `activate-snapshot` (`index`, optional `wait`)
- `snapshot_name` / `rename_snapshot` / `rename-snapshot` (`index`, `name`)
- `copy_snapshot` / `copy-snapshot` (`source`, `target`)
- `snapshot_color` / `snapshot-color` (`index`, `color`)
- `load_preset` / `load-preset` (`cid` or `container_cid`/`root` + `position`, optional `wait`)
- `save_preset` / `save-preset` (optional `cid`, optional `wait`)
- `rename_content` / `rename-content` (`cid`, `name`)
- `add_contents_to_container` / `add-contents-to-container` (`container_cid`, `content_ids`, `position`, optional `flag_a`, optional `flag_b`)
- `remove_content` / `remove-content` (`container_cid`, `content_ids`)
- `reorder_container_content` / `reorder-container-content` (`container_cid`, `content_ids`, `position`)
- `set_content_path` / `set-content-path` (`cid`, `path`)
- `set_content_data` / `set-content-data` (`cid`, `input` or `path`)
- `set_content_info` / `set-content-info` (`content_type`, `key`, `value`)
- `delete_content_info` / `delete-content-info` (`content_type`, `key`)
- `scribble_label` (`stomp` or `key`, `label`)
- `property_set` (`key`, `value`, `value_type`, `property_id`)
- `preset_notes` / `notes` (`text`)
- `preset_notes_visible` / `notes_visible` (`visible` or `show`)
- `set_autocab` / `set-autocab` (`enabled`)
- `clear_blocks` / `clear-blocks` (`path`, `blocks`)
- `clear_all_blocks` / `clear-all-blocks` (`path`)
- `copy_path` / `copy-path` (`source_path`, `target_path`)
- `insert_block` / `insert-block` (`path`, `block`, `model_id` or `model`, `slot`, `auto_cab`, `clear`, `clear_blocks`)
- `io_set` / `io-set` (`row`, `type`, `model_id` or `model`)
- `io_param` / `io-param` (`row`, `type`, `param_id` or `param`, `value`)
- `block_param` / `block-param` (`row`, `position`, `param_id` or `param`, `value`, `slot`, `flags`)
- `param_value` (`path`, `block`, `param_id`, `value`, `slot`, `flags`)
- `block_enable` (`path`, `block`, `enabled`)
- `model_set` (`path`, `block`, `model_id`, `slot`)
- `osc` (`address`, `typetags`, `args`)

Notes:

- The CLI auto-discovers the first `_stadiumserver._tcp` Bonjour service when `--host` is omitted.
- Use `discover` to print the resolved host/port pair or `discover --all` to list visible instances.
- `scribble_label` and `property_set` require `msgpack` to be installed.
- The CLI now fails fast on missing acknowledgements instead of silently succeeding after a timeout.
- `monitor` and `--listen` decode wrapped port `2001` push traffic, including heartbeats and edit notifications.
- `copy-path` overwrites the target path's standard IO/effect slots. Split/join routing nodes are not duplicated yet, so complex parallel-path routing still needs manual follow-up.

## scripts/set_scribble_label.py

Set a footswitch scribble-strip label without editing snapshots.

Note: this script does not perform the ZMTP handshake. If the device drops the connection, use `helix_control.py` instead.

Example:

```bash
python3 scripts/set_scribble_label.py --host p35x1.local --stomp a.7 --label \"MY LABEL\"
```

Advanced:

- `--key` to set a raw property key (e.g., `preset.floorboard.stomp.a.7.label`)
- `--cmd-id` and `--property-id` if you want to mirror specific captures (defaults are fine)

## Model extraction for AI usage

### scripts/generate_helix_model_json.py

Generates JSON catalogs for amps, bass amps, effects, and cabs. The output is designed for AI prompt grounding and uses human-readable names, ranges, options, and units.

Inputs (from the app bundle):

- `modeldefs/*.bin` (msgpack) - parameter IDs, ranges, defaults
- `P35ModelUIDefs.json` - display names + parameter labels
- `P35Controls.json` - unit/scale metadata
- `meta-data/parameter-meta/*/*.json` - parameter descriptions
- `ModelMetadataStore.sqlite3` - "based on" metadata
- `scripts/based_on_overrides.json` - missing "based on" entries

Output location:

- `generated/helix-models/`

Run:

```bash
python3 scripts/generate_helix_model_json.py
```

### scripts/generate_model_id_map.py

Generates a full mapping of **all** model keys to model IDs (MIDs) and display names.

Output:

- `generated/helix-models/model_id_map.json`

Run:

```bash
python3 scripts/generate_model_id_map.py
```

### Output schema

Each block entry looks like:

```json
{
  "name": "Brit Plexi",
  "type": "Amp",
  "is_agoura": false,
  "based_on": "Marshall Super Lead 100 (Normal, Bright & Jumped channels)",
  "params": [
    {
      "name": "Channel",
      "description": "Selects the amp channel or which input is connected. \"Jumped\" jumps between the Normal and Bright channels.",
      "default": "Jumped",
      "options": ["Normal", "Bright", "Jumped"]
    },
    {
      "name": "Drive",
      "description": "Controls the amount of drive or saturation.",
      "min": 0,
      "max": 10,
      "default": 5,
      "unit": "unitless"
    }
  ]
}
```

Param rules:

- If a param has discrete options, it outputs `options` + `default` (string)
- Otherwise it outputs `min`, `max`, `default`, and `unit`

### based_on handling

`based_on` is resolved in this order:

1) `scripts/based_on_overrides.json` (official Line 6 model list)
2) `ModelMetadataStore.sqlite3` by model ID
3) `ModelMetadataStore.sqlite3` by name (non-ambiguous matches only)

If no reliable match is found, `based_on` is `null`.

### Combined output

`all_models.json` is a single JSON object containing all groups:

```json
{
  "guitar_amps": [],
  "bass_amps": [],
  "effects": [],
  "guitar_cabs": [],
  "bass_cabs": [],
  "ir_cabs": []
}
```


### Refreshing based_on_overrides.json

`scripts/based_on_overrides.json` was built from the official "Helix Stadium Models" list (the page includes "Based on*" columns for amps and effects). There is no bundled fetch script yet; if you want to refresh it, scrape the table rows and rebuild the JSON mapping of `model name -> based on`.

If you want this automated, add a small script that parses the HTML tables and rewrites `scripts/based_on_overrides.json`.

## Updating for new app versions

When the editor app updates, these files may change:

- `modeldefs/*.bin`
- `P35ModelUIDefs.json`
- `P35Controls.json`
- `ModelMetadataStore.sqlite3`

Update the paths if the versioned `modeldefs` filename changes, then regenerate:

```bash
python3 scripts/generate_helix_model_json.py
```

## Notes and caution

- This repository is for research and automation. Ensure your usage complies with the Line 6 EULA and local law.
- The protocol details here are observational and may change with firmware or editor updates.
