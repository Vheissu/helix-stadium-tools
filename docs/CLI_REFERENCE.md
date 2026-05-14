# CLI Reference

Per-script reference for the tools in `scripts/`. Run each script with `--help`
for the authoritative flag list.

- [Capture and decode workflow](#capture-and-decode-workflow)
- [`scripts/osc_pcap_dump.py`](#scriptsosc_pcap_dumppy)
- [`scripts/osc_client.py`](#scriptsosc_clientpy)
- [`scripts/osc_session.py`](#scriptsosc_sessionpy)
- [`scripts/helix_control.py`](#scriptshelix_controlpy)
- [`scripts/set_scribble_label.py`](#scriptsset_scribble_labelpy)
- [Model extraction](#model-extraction)
- [Refreshing data for new app versions](#refreshing-data-for-new-app-versions)

## Capture and decode workflow

1. Capture traffic while editing (macOS example):

   ```bash
   sudo tcpdump -i en0 -s 0 -w /tmp/helix-stadium.pcap tcp port 2001 or tcp port 2002
   ```

   Important:

   - Make changes in the macOS editor app, not on the device touchscreen.
     Device-local edits do not hit the network and will not appear in the capture.
   - If the capture file is around 24 bytes, it is empty (no packets captured).
   - After stopping capture, ensure you can read the file:

     ```bash
     sudo chown "$USER" /tmp/helix-stadium.pcap
     ```

   Live decode (streaming):

   ```bash
   sudo tcpdump -i en0 -s 0 -U -w - tcp port 2001 or tcp port 2002 | \
     python3 scripts/osc_pcap_dump.py --reassemble -
   ```

2. Parse the pcap:

   ```bash
   python3 scripts/osc_pcap_dump.py /tmp/helix-stadium.pcap
   ```

   For larger packets or reassembly issues, add `--reassemble`:

   ```bash
   python3 scripts/osc_pcap_dump.py --reassemble /tmp/helix-stadium.pcap
   ```

3. Optional: decode parameter names using model defs:

   ```bash
   python3 scripts/osc_pcap_dump.py /tmp/helix-stadium.pcap \
     --modeldefs "/Applications/Line6/Helix Stadium.app/Contents/Resources/modeldefs/p35md-26002601-1_2_0_0.bin"
   ```

## scripts/osc_pcap_dump.py

Parses a pcap/pcapng capture and prints decoded OSC messages.

Key features:

- Detects port 2001 (framed OSC inside ZMTP data frames) and port 2002 (raw OSC inside ZMTP data frames)
- Tracks `/ModelSet` and `/setModelWithMID` to map block to model automatically
- Resolves parameter IDs to names using `modeldefs` (msgpack)
- Optional manual `block_map.json` support for older captures

Useful flags:

- `--ports 2001,2002` (default)
- `--model <name>` maps indices against a specific model
- `--model-file <path>` defaults to `P35ModelUIDefs.json`
- `--modeldefs <path>` for MID to model lookup
- `--block-map <path>` for manual block mapping
- `--reassemble` recommended for ZMTP streams; frames often split across TCP segments
- `--show-topics` prints ZMTP topic frames (port 2001)

## scripts/osc_client.py

A minimal OSC-over-TCP client.

- Default behaviour is read-only: connect and print incoming frames.
- Optional `--send` to transmit a single OSC message.
- Does not implement the ZMTP handshake, so it is best for passive observation
  or quick experiments. If the device drops the connection, use
  `osc_session.py` or `helix_control.py` instead.

Examples:

```bash
# Listen to device -> editor updates
python3 scripts/osc_client.py --host p35x1.local --port 2001

# Send a one-off command to port 2002
python3 scripts/osc_client.py --host p35x1.local --port 2002 \
  --send /ParamValueSet iiiiifi 1 0 2 0 5 0.7 -1

# Send a command and exit
python3 scripts/osc_client.py --host p35x1.local --port 2002 \
  --send /SetSnapshotName iis 100 0 "Lyrics A" --send-only
```

## scripts/osc_session.py

ZMTP-aware client that performs the correct handshake and keeps both sockets
open.

```bash
# Run the handshake and print responses
python3 scripts/osc_session.py --host p35x1.local

# Rename snapshot 0
python3 scripts/osc_session.py --host p35x1.local --snapshot 0 "Verse A"
```

## scripts/helix_control.py

Programmatic control tool that performs the ZMTP handshake and applies actions.

### Common examples

```bash
# Rename a snapshot
python3 scripts/helix_control.py snapshot-name --index 0 --name "Verse A"

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

# Read the global Matrix Mixer state
python3 scripts/helix_control.py get-matrix-mixer

# Show the active preset content ref
python3 scripts/helix_control.py get-active-preset
```

### Presets and setlists

```bash
# List visible setlists
python3 scripts/helix_control.py list-setlists

# List presets from the user preset pool
python3 scripts/helix_control.py list-presets --root user

# List presets from a specific setlist or container
python3 scripts/helix_control.py list-presets --container-cid 500

# Load a preset by container position
python3 scripts/helix_control.py load-preset --container-cid 500 --position 5

# Load a preset directly by content id
python3 scripts/helix_control.py load-preset --cid 508

# Save the current active preset back to its backing content slot
python3 scripts/helix_control.py save-preset

# Rename the backing raw preset content
python3 scripts/helix_control.py rename-content --cid 507 --name "Glory Belongs Test (HB)"
```

### Snapshots

```bash
# Read snapshot metadata
python3 scripts/helix_control.py get-snapshot-count
python3 scripts/helix_control.py get-active-snapshot
python3 scripts/helix_control.py get-preset-edited
python3 scripts/helix_control.py list-snapshots
python3 scripts/helix_control.py get-snapshot-targets --index 0

# Activate snapshot 4 (zero-based index)
python3 scripts/helix_control.py activate-snapshot --index 4

# Copy snapshot 1 onto snapshot 2
python3 scripts/helix_control.py copy-snapshot --source 1 --target 2

# Rename snapshot 1
python3 scripts/helix_control.py snapshot-name --index 0 --name "Snapshot 1"

# Set snapshot 1 to the desktop-app colour name "Off"
python3 scripts/helix_control.py snapshot-color --index 0 --color off
```

### Content I/O

```bash
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

# Add raw preset 507 to setlist 500 as a new entry, then remove that returned cid
python3 scripts/helix_control.py add-to-container --container-cid 500 --content-ids 507 --position 6
python3 scripts/helix_control.py remove-content --container-cid 500 --content-ids NEW_SETLIST_ENTRY_CID

# Reorder setlist entries by insertion index
python3 scripts/helix_control.py reorder-content --container-cid 500 --content-ids 508 --position 6
```

### Signal flow and blocks

```bash
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
```

### Monitor and batch actions

```bash
# Watch push updates for 15 seconds
python3 scripts/helix_control.py --duration 15 monitor

# Increase timeout/retry policy
python3 scripts/helix_control.py --timeout 6 --retries 2 --retry-delay 0.2 \
  snapshot-name --index 0 --name "Verse A"

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

### Supported action ops

- `snapshot_name` / `rename_snapshot` / `rename-snapshot` (`index`, `name`)
- `activate_snapshot` / `activate-snapshot` (`index`, optional `wait`)
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
- `split_destination` / `split-destination` (`path`, `position`, `linked_flow`, `linked_position`)
- `join_origin` / `join-origin` (`path`, `position`, `linked_flow`, `linked_position`)
- `insert_block` / `insert-block` (`path`, `block`, `model_id` or `model`, `slot`, `auto_cab`, `clear`, `clear_blocks`)
- `io_set` / `io-set` (`row`, `type`, `model_id` or `model`)
- `io_param` / `io-param` (`row`, `type`, `param_id` or `param`, `value`)
- `block_param` / `block-param` (`row`, `position`, `param_id` or `param`, `value`, `slot`, `flags`)
- `param_value` (`path`, `block`, `param_id`, `value`, `slot`, `flags`)
- `block_enable` (`path`, `block`, `enabled`)
- `model_set` (`path`, `block`, `model_id`, `slot`)
- `osc` (`address`, `typetags`, `args`)

### Notes

- The CLI auto-discovers the first `_stadiumserver._tcp` Bonjour service when
  `--host` is omitted.
- Use `discover` to print the resolved host/port pair, or `discover --all` to
  list visible instances.
- `scribble_label` and `property_set` require `msgpack` to be installed.
- The CLI fails fast on missing acknowledgements instead of silently succeeding
  after a timeout.
- `monitor` and `--listen` decode wrapped port `2001` push traffic, including
  heartbeats and edit notifications.
- `copy-path` overwrites the target path's realised IO/effect/routing slots,
  including the live split/join nodes the device materialises in the edit
  buffer.
- Derived shadow routing markers are ignored during path copy because the
  device does not expose them as normal insertable blocks.

## scripts/set_scribble_label.py

Set a footswitch scribble-strip label without editing snapshots.

This script does not perform the ZMTP handshake. If the device drops the
connection, use `helix_control.py` instead.

```bash
python3 scripts/set_scribble_label.py --host p35x1.local --stomp a.7 --label "MY LABEL"
```

Advanced:

- `--key` to set a raw property key (for example,
  `preset.floorboard.stomp.a.7.label`)
- `--cmd-id` and `--property-id` to mirror specific captures (defaults are fine
  in normal use)

## Model extraction

The model-extraction scripts read the installed editor app bundle and write
human-readable JSON into `generated/helix-models/`. The output is designed for
AI prompt grounding and for downstream tools that prefer named ranges, options,
and units.

### scripts/generate_helix_model_json.py

Generates JSON catalogues for amps, bass amps, effects, and cabs.

Inputs (from the app bundle):

- `modeldefs/*.bin` (msgpack): parameter IDs, ranges, defaults
- `P35ModelUIDefs.json`: display names and parameter labels
- `P35Controls.json`: unit and scale metadata
- `meta-data/parameter-meta/*/*.json`: parameter descriptions
- `ModelMetadataStore.sqlite3`: "based on" metadata
- `scripts/based_on_overrides.json`: missing "based on" entries

Output: `generated/helix-models/`

```bash
python3 scripts/generate_helix_model_json.py
```

### scripts/generate_model_id_map.py

Generates a full mapping of all model keys to model IDs (MIDs) and display
names.

Output: `generated/helix-models/model_id_map.json`

```bash
python3 scripts/generate_model_id_map.py
```

### scripts/generate_helix_gpt_knowledge.py

Generates upload-ready Markdown knowledge files for a Custom GPT. Output is
aimed at retrieval-friendly upload files and includes model keys, model IDs,
metadata-derived DSP usage estimates, parameter descriptions, raw ranges,
display ranges, defaults, and discrete valid values.

Output: `generated/helix-gpt-knowledge/`

```bash
python3 scripts/generate_helix_gpt_knowledge.py
```

Recommended usage:

- Paste `generated/helix-gpt-knowledge/custom-gpt-instructions.md` into the
  Custom GPT instructions field.
- Paste `generated/helix-gpt-knowledge/project-instructions.md` into a ChatGPT
  Project instructions field if you decide to use a Project.
- Upload the files inside `generated/helix-gpt-knowledge/upload-ready/` as
  knowledge files.
- Use `generated/helix-gpt-knowledge/upload-plan.md` for the exact upload
  checklist.
- If the GPT builder throws a save error, try the smaller fallback pack in
  `generated/helix-gpt-knowledge/minimal-upload-ready/`.
- Regenerate the folder whenever the desktop app bundle changes.

### scripts/build_gpt_knowledge_pdf.py

Bundles the Markdown files in `generated/helix-gpt-knowledge/upload-ready/`
into one searchable PDF. Useful for testing whether the GPT builder accepts a
single knowledge file more reliably than a multi-file upload.

```bash
python3 scripts/build_gpt_knowledge_pdf.py
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

- If a param has discrete options, the entry outputs `options` and `default`
  (string).
- Otherwise it outputs `min`, `max`, `default`, and `unit`.

### `based_on` handling

`based_on` is resolved in this order:

1. `scripts/based_on_overrides.json` (official Line 6 model list)
2. `ModelMetadataStore.sqlite3` by model ID
3. `ModelMetadataStore.sqlite3` by name (non-ambiguous matches only)

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

### Refreshing `based_on_overrides.json`

`scripts/based_on_overrides.json` was built from the official Helix Stadium
Models list (the page includes "Based on*" columns for amps and effects).
There is no bundled fetch script. To refresh, scrape the table rows and
rebuild the JSON mapping of `model name -> based on`.

## Refreshing data for new app versions

When the editor app updates, these files may change:

- `modeldefs/*.bin`
- `P35ModelUIDefs.json`
- `P35Controls.json`
- `ModelMetadataStore.sqlite3`

The scripts auto-select the newest `p35md-*` modeldefs file in the installed
app bundle. Regenerate the shared catalogues first, then refresh the mobile
app data:

```bash
python3 scripts/generate_helix_model_json.py
python3 scripts/generate_model_id_map.py
python3 scripts/generate_io_models_json.py
python3 scripts/generate_mobile_block_types_json.py
python3 scripts/add_missing_mobile_models.py
python3 scripts/generate_mobile_models_json.py
```
