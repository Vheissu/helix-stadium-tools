# Tester feedback — 19 October 2026

The follow-up pass uses a free local iOS simulator build connected to the real Stadium over Wi-Fi. No EAS build or store submission was run.

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

The interpolation matches the extracted 1.4 arithmetic routine, including float32 boundary behavior and discrete parameters. Live tests covered two amps, tremolo, delay, cabinet placement and graphic EQ, with save/reload verification. The follow-up simulator pass created a preset in slot 128D, added 2204 Mod, applied pad positions and a named Focus tone, saved through the UI, and verified all 12 values after loading another preset and returning. Automated continuous dragging could not be verified: the simulator automation delivered drag attempts as taps, including in ordinary scroll views. A real touch-device check remains for drag feel.

## Showcase songs and stem separation

Implemented local song upload and Showcase library/playback controls. The native iOS simulator selected files through Files, uploaded a stereo WAV and a two-track mono/stereo song, and received the device's confirmed-audio import result. The song list includes the new records after reconnecting. Native Play, Pause, resume and Stop were checked against live transport state. Cancelling during preparation left the song library unchanged and no staged archive on the device.

The implementation includes track/song names, tempo and time signature, streaming archive preparation, identity-pinned file transfer, progress, cancellation before import, duplicate-name checks and explicit import confirmation. It accepts prepared 48 kHz, 16-bit PCM WAV files; it does not convert other audio formats, edit playlists/flags, or perform cloud stem separation. See [Showcase](SHOWCASE.md) for usage, format limits, credentials and protocol details.

Testing caught and fixed a native typed-array crash, file permissions that prevented the device importer from reading the archive, and incomplete generic song-library queries. The final listing uses explicit Stadium-family queries and direct content-reference checks.

## Checks

The mobile suite passes 98 tests, including an exact OSC packet fixture and save-state tests for acknowledgement failure, timeouts, invalid destinations, setlist references, preset switches, and delayed clean state. Type checking passes. Lint has no errors and two existing warnings. Hardware verification used spare presets, removed the temporary creations, and left `44C` and the User library restored. The local iOS Release simulator build passed, and the Android transfer module compiled. Android runtime upload testing and real-phone touch gestures remain unverified. No paid build or store submission was run.
