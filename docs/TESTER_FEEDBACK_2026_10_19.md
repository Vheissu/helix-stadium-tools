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

Still to implement. The app currently browses returned content records; it does not provide the complete empty-location and template workflow. A preset with no writable destination now gets an explicit message instead of a false save indication.

The hardware exposes 512 User Preset locations. The desktop editor's creation path allocates content before saving it and placing it in the selected container. A correct implementation needs an empty-location picker, template or blank-preset initialization, a name and destination, replacement confirmation for occupied locations, and save/reload verification. It must not invent writable content ids from row numbers. See [Line 6's preset workflow](https://manuals.line6.com/en/helix-stadium/live/presets).

## Focus View

Feasible, with additional implementation and validation. The local public 1.4 firmware contains 674 model-specific Focus View definitions, including named points, parameter ids, and interpolation behaviour. That is useful evidence for reproducing the controls through ordinary parameter updates. It is not yet a working mobile Focus View.

The next pass should cover supported model matching, interpolation and discrete parameters, cab microphone positioning, and accessible named-point and axis controls. Check results against the desktop editor before shipping. [The official application guide](https://manuals.line6.com/en/helix-stadium/live/helix-stadium-edit-application) describes its Focus View.

## Showcase songs and stem separation

Treat importing prepared audio tracks and splitting a full mix as separate features. The existing mobile helpers expose only some transport state; they do not implement a song importer.

Line 6's 1.4 stem separation sends audio to its cloud service and requires a signed-in Line 6 account in the official application. A mobile implementation needs an authorised service integration or a separately chosen separation service, as well as song packaging, upload progress, cancellation, and storage handling. Do not assume that an editor transport connection provides cloud stem separation. See [the 1.4 release notes](https://kb.line6.com/helix-stadium-1-4-release-notes) and [Creating Showcase Songs](https://manuals.line6.com/en/helix-stadium/live/song-view).

## Checks

The mobile suite passes 62 tests, including an exact OSC packet fixture and save-state tests for acknowledgement failure, timeouts, invalid destinations, setlist references, preset switches, and delayed clean state. Type checking passes. Lint has no errors and three existing warnings. Hardware verification changed only the disposable preset in `44C`, then restored its tested values. No native build or store submission was run.
