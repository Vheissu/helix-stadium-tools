# Tester feedback — 19 October 2026

No native rebuild or store submission is part of this pass.

## Save and preset positions

The mobile save command previously sent only the command id and content id. The public Stadium 1.4 desktop editor sends four integers: command id, content id, flow, and block. Whole-preset saves use `-1` for both selectors. Its serializer is at `0x100206e98`; the ordinary save caller reads optional `flow` and `block` fields and defaults both to `-1` before calling through `0x1002642ac`.

The corrected mobile implementation sends those arguments, validates the acknowledgement, and waits for the same preset to report no unsaved changes. It rejects invalid destinations, stale preset selections, device errors, missing replies, and switches during confirmation. The UI shows Saving until confirmation and keeps failures visible. It no longer clears the edited flag immediately after sending a command. A raw preset with `rcid = 0` now uses its own valid id; an empty setlist reference is not treated as writable content.

Hardware save/reload validation passed on 19 October 2026 using the user-created `HELYON Save Test` in slot `44C`. The test ran the unchanged mobile `HelixClient` and save-confirmation code on the Mac, with Node TCP replacing the native socket adapter. It did not rebuild or run the new phone UI.

The test changed Path 1A's output level from 0 dB to -1 dB, confirmed the unsaved flag, saved, disconnected and reconnected, then loaded another preset and returned. The -1 dB value persisted. Restoring 0 dB passed the same save/reload check.

A second check renamed snapshot 1 to `SAVE VERIFIED`. This exposed an additional UI bug: the device did not mark the preset edited, although the stored content had not changed. The Preset tab now keeps Save visible whenever a preset is loaded. Explicitly saving the snapshot rename worked, and the name survived reconnecting and switching presets. Restoring `SNAPSHOT 1` also persisted. The snapshot-only save returned `[cmdId, 0, 0]`; the output-level save returned `[cmdId, 0, 1]`. Both are successful replies.

All four save/reload cycles passed. The test preset's level and snapshot name were restored; its only differences from the initial content were removal of the selected-flow and selected-block metadata (`self` and `selb`). The second test restored its baseline bytes exactly. The previously selected song preset was reloaded, its stored content hash was unchanged, and the device reported no unsaved edits. Raw replies and backups are retained locally under `.codex-artifacts/save-validation/`.

Preset positions now use bank letters throughout the preset list, setlist list, current-preset header, performance view, action sheet, and add-to-setlist list. The twentieth slot is `5D`; the first and last user slots are `1A` and `128D`. Searches accept those labels and retain ordinary numeric position searches.

## Creating presets from empty locations

Implemented. Empty User slots now open a creation sheet, and the User library has a New preset action. The sheet accepts a name and an empty destination, searchable by bank label. Creation checks the destination again, initializes and verifies a native blank preset, then opens it. Occupied slots and unsaved changes are protected, including snapshot renames that do not set the device's edited flag.

Creation, editing, saving and reloading passed on the Stadium. Temporary records were removed and the original User library was verified unchanged. Details are in [Preset creation and Focus View](PRESET_CREATION_AND_FOCUS.md).

## Focus View

Implemented in the block editor and Offline preview. The app includes 670 factory X/Y definitions with named points, a touch pad, accessible axis controls and restoration of the starting tone. Cabinets have mic placement controls; EQ and clone models have focused tone controls.

The interpolation matches the extracted 1.4 arithmetic routine, including float32 boundary behavior and discrete parameters. Live tests covered two amps, tremolo, delay, cabinet placement and graphic EQ, with save/reload verification. The new native screens have not been rebuilt; browser component checks and the live protocol tests were performed separately.

## Showcase songs and stem separation

Treat importing prepared audio tracks and splitting a full mix as separate features. The existing mobile helpers expose only some transport state; they do not implement a song importer.

Line 6's 1.4 stem separation sends audio to its cloud service and requires a signed-in Line 6 account in the official application. A mobile implementation needs an authorised service integration or a separately chosen separation service, as well as song packaging, upload progress, cancellation, and storage handling. Do not assume that an editor transport connection provides cloud stem separation. See [the 1.4 release notes](https://kb.line6.com/helix-stadium-1-4-release-notes) and [Creating Showcase Songs](https://manuals.line6.com/en/helix-stadium/live/song-view).

## Checks

The mobile suite passes 89 tests, including an exact OSC packet fixture and save-state tests for acknowledgement failure, timeouts, invalid destinations, setlist references, preset switches, and delayed clean state. Type checking passes. Lint has no errors and two existing warnings. Hardware verification used spare presets, removed the temporary creations, and left `44C` and the User library restored. No native build or store submission was run.
