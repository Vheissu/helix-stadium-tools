# Preset copies, snapshot controls and expanded Focus View

Verified on 25 October 2026 against the connected Helix Stadium XL, with the
mobile app running in iPhone SE and iPad Pro simulators. These changes have not
been submitted to the stores.

## Preset duplication

Open a preset's options in User Presets, Factory Presets or a setlist and choose
**Duplicate preset**. Select an empty User Preset slot and name the copy. The
current preset stays open. Duplication copies the saved version; unsaved edits
are excluded.

The implementation resolves setlist references to their backing preset, reads
its native payload, checks that the destination is still empty, allocates an
independent preset and verifies the written bytes. It never loads or writes the
source. Partial failures identify the destination for inspection and are not
retried automatically.

Hardware checks copied a 32,698-byte preset through a setlist reference and a
19,882-byte User preset through the iPhone UI. Both copies matched their source
bytes exactly; the active preset and original contents were unchanged. After
testing, both temporary copies were removed and the original preset and
snapshot restored. All 165 occupied User slots and four setlists matched the
starting state, and the original preset bytes were unchanged.

## Snapshot parameter controls

Open an amp or effect and select **Snapshot controls**. Enable the parameters
that should change with snapshots, select each snapshot, adjust its values and
save. Disable a parameter in the same sheet to remove its snapshot assignment.
Parameters with an existing controller assignment are protected. Harness and
synthetic controls are excluded from this initial parameter picker.

Verified commands:

- `/assignSnapParam ,iiiiiV [cmd_id, flow, block, model_slot, parameter_id, value]`,
  where `V` is `f`, `i`, `T` or `F`. Its status reply contains the allocated
  snapshot target ID in the status position: `[cmd_id, target_id, 0]`.
- `/removeSnapshotTarget ,ii [cmd_id, target_id]`, with status `[cmd_id, 0, 0]`.
- Readback uses the model parameter's `snap` and `tid_` fields. Preset, model,
  block and snapshot identity are checked around reads.

Assignment changes can leave `volatile.preset.edited` clear. Unsaved-change
checks also compare snapshot target membership with the saved preset. An
unconfirmed write triggers a refresh instead of retaining a misleading Saved
indicator.

Hardware verification assigned a compressor parameter, saved different values
in two snapshots, reloaded the preset and confirmed each value returned with
its snapshot. Unassignment also survived save and reload. A separate tablet UI
check assigned the US Tweedman Normal Drive parameter and saved it.

## Focus View

**Expand** hides the signal chain and gives Focus View the editor area. Save
remains available. **Restore** brings back the signal chain. Expanded state is
cleared when Focus View closes and cannot hide the signal chain when the
selected model has no Focus View.

Five compact tone markers replace the wide label bars. Selection uses a filled
marker and contrasting label; a custom blend shows its position and the tones
contributing to it. Markers support taps and dragging, including inputs that
coalesce a drag into start/end events. Phone labels have bounded line counts
and text scaling; larger accessibility sizes retain the existing list layout.
Phone and tablet taps, blends and tablet Expand/Restore were checked in the app.

## Stomp B and MIDI: unfinished

The official editor's captured Stomp B1 assignment request is:

```
/attachCommandWithType ,iiiiiiib
[cmd_id, 1, 25, 2, 0, 6, 0, msgpack_empty_array]
```

This confirms footswitch source contexts **1 = Stomp A, 2 = Stomp B**; the app's
previous context 9 lookup for B was incorrect and is fixed. Source local ID is
24 plus the footswitch number.

A physical B1 press produced `/stomp` events on the device event stream and two
`/executeCommand` notifications for its two assigned commands. These are device
notifications, not confirmed editor requests. Sending `/stomp`,
`/executeCommand` and `/setCommandToggle` to the editor command connection was
rejected with `Msg dispatch failed: <address> is NOT known!!!`. No remote Stomp
button has been enabled.

A separate `/SendMidiMessage` test **did produce USB MIDI output**, captured by
CoreMIDI as `BF 77 49` (channel 16, CC 119, value 73). That proves direct network
MIDI output through USB, not remote execution of a switch's assignments. The
physical MIDI Out port remains unverified because no five-pin MIDI cable was
available. Do not describe remote Stomp triggering or both output ports as
verified.

A [follow-up hardware investigation](REMOTE_STOMP_TRIGGER_RESEARCH.md) tested
controller activation and source enable requests against a physical B1 press.
The source enable path changes the assigned bypass state, but none of the eight
additional remote tests executed the switch's two MIDI commands.

## Checks

- Mobile TypeScript check passed.
- 245 mobile tests passed.
- 406 Python tests passed.
- ESLint: no errors; two existing App.tsx hook dependency warnings.
- Claude reviewed the duplication, snapshot and layout changes. Findings about
  stale duplicate identities, uncertain save state and expanded-view recovery
  were addressed.

Local hardware readbacks, MIDI capture, review output and screenshots are in
`.codex-artifacts/stomp-duplicate/` (not included in source control).
