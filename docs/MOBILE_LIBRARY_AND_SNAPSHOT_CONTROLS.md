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

## Stomp B stored commands

Open **Perform**, select **Stomp B** and choose **Run commands** on an eligible
switch. The app reads the switch's existing assignments and runs its immediate
MIDI CC Press commands in order. Their settings stay on the Stadium.

Bypass and parameter changes still require the physical footswitch. The app
states that limitation even when a switch combines those controllers with MIDI
commands. Stomp A, Release, Hold, Toggle, delayed commands and snapshot-controlled
command values remain unavailable. Disabled switches show the reason.

Every command requires a fresh check of the selected preset, snapshot and
assignment configuration. A changed selection or connection stops the group.
The result gives the confirmed count and the number left unsent. If a response
is missing or cannot be accepted, one command may already have run; the app
reports that uncertainty and never retries the group automatically. Check
connected equipment before running again.

Live verification used one group from the iPhone simulator UI and four groups
through the same client and executor in a test harness. Four groups completed.
The fifth dropped the first command's response and correctly stopped with zero
confirmed, one possibly executed and one unsent command. Nine requests produced
exactly nine captured USB MIDI CC messages, with no automatic retries. An
unsaved device-side CC value of 81 was used while the saved bytes stayed
unchanged, then restored to 73.

The gap between a pair's messages was 135.26 ms in the UI run and 104.14 to
112.15 ms in the harness. Fresh assignment checks between sends add this delay.
Groups are not atomic; equipment can receive the first command even if the
second is never sent. Use the physical footswitch for timing-sensitive pairs.
The [firmware trace](STOMP_FIRMWARE_TRACE.md) has the request and capture details.
Five-pin MIDI Out and full physical switch behaviour remain unverified.

A Release assignment was checked in the app: **Run commands** was disabled and
the Press-only explanation was visible and available to accessibility tools.
After restoring Press, temporary preset 934 was removed. The original
`Thank God I'm Free C (SC)` preset and snapshot 2 were restored; all 165 occupied
User slots and four setlists matched the baseline, the original preset bytes
were identical and no unsaved changes remained. Stored command configuration
(excluding runtime toggle state) and switch/bypass assignments were unchanged.
Loading the original preset emitted its normal bank-select and program-change
messages, recorded separately from the nine test CCs.

## Checks

- Mobile TypeScript check passed.
- 264 mobile tests passed, including 11 stored-command parser and executor tests
  and eight client integration tests.
- Earlier library and snapshot validation: 406 Python tests passed.
- ESLint: no errors; two existing App.tsx hook dependency warnings.
- Claude reviewed the duplication, snapshot and layout changes. Findings about
  stale duplicate identities, uncertain save state and expanded-view recovery
  were addressed.

Local hardware readbacks, MIDI capture, review output and screenshots are in
`.codex-artifacts/stomp-duplicate/` (not included in source control).
