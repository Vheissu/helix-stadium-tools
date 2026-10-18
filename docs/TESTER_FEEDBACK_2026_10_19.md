# Tester feedback — 19 October 2026

No native rebuild or store submission is part of this pass.

## Save and preset positions

The mobile save command previously sent only the command id and content id. The public Stadium 1.4 desktop editor sends four integers: command id, content id, flow, and block. Whole-preset saves use `-1` for both selectors. Its serializer is at `0x100206e98`; the ordinary save caller reads optional `flow` and `block` fields and defaults both to `-1` before calling through `0x1002642ac`.

The corrected mobile implementation sends those arguments, validates the acknowledgement, and waits for the same preset to report no unsaved changes. It rejects invalid destinations, stale preset selections, device errors, missing replies, and switches during confirmation. The UI shows Saving until confirmation and keeps failures visible. It no longer clears the edited flag immediately after sending a command. A raw preset with `rcid = 0` now uses its own valid id; an empty setlist reference is not treated as writable content.

This is a code-level explanation for the report, not a reproduced hardware result. Saving and reloading a spare preset on a Stadium remains the required release check.

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

The mobile suite passes 61 tests, including an exact OSC packet fixture and save-state tests for acknowledgement failure, timeouts, invalid destinations, setlist references, preset switches, and delayed clean state. Type checking passes. Lint has no errors and three existing warnings. No hardware presets were modified.
