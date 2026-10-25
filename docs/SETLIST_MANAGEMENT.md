# Setlist management

The mobile Library screen can create, rename, duplicate, delete and reorder setlists. Its picker searches setlist names. Existing controls add and remove presets and move them earlier or later in a setlist.

New setlists start empty and are selected in the app without loading a preset. Duplicate copies the running order, including empty positions and repeated presets. Both setlists reference the same User presets; changing a preset affects every setlist that uses it. Delete removes only the setlist and its references. The app asks for confirmation and refuses to delete the setlist containing the active preset.

The limits are 122 setlists and 128 preset positions per setlist, as described in the [Line 6 manual](https://manuals.line6.com/en/helix-stadium/live/presets). Names in the app are limited to 32 characters. Import and export of setlist files are not part of this change.

## Device commands

Verified on Stadium firmware 1.4.1 on 25 October 2026:

| Action | Request, including command ID | Confirmation |
| --- | --- | --- |
| Create | `/CreateContent ,iiiib [cmdId, -5, position, 1003, msgpack({name})]` | `/status [cmdId, allocatedId, result]`; read back the new reference, directory and empty contents |
| Rename | `/SetContentAttrs ,iib [cmdId, setlistId, updatedReference]` | Ordinary status acknowledgement, then read the directory name |
| Add references | `/AddContentsToContainer ,iibiii [cmdId, setlistId, msgpack(rawPresetIds), position, 0, 0]` | Ordinary status acknowledgement |
| Reorder setlists | `/ReorderContainerContent ,iibi [cmdId, -5, msgpack(setlistIds), insertionIndex]` | Ordinary status acknowledgement, then compare directory order |
| Delete setlists | `/RemoveContent ,iib [cmdId, -5, msgpack(setlistIds)]` | Ordinary status acknowledgement, then verify absence from the directory |

Setlist containers have `type=1003`, `ccid=-5` and `boun=128`. Their preset entries have `type=1` and an `rcid` pointing to the backing User preset. Creation needs only a string-keyed `name` attribute; the device fills in the container metadata. A new setlist returns 128 empty placeholders. Deleting a setlist compacts directory positions.

Duplication creates a new container, adds backing preset IDs at their original positions, and verifies every resulting position and reference. It never writes preset bodies or loads a preset. Only complete reads are used for mutations. Library commands require an acknowledgement; a timeout is not success. An uncertain creation or partial copy returns to the refreshed library with an explanation instead of leaving the form ready to submit again. Writes are never automatically retried or rolled back.

## Verification

- The unchanged mobile protocol client ran over a desktop TCP adapter against the Stadium.
- Created empty setlists, renamed them, moved them in both directions, and deleted them.
- Duplicated positions 0, 1, 5 and 127, including the same backing preset more than once. The copied positions and references matched exactly.
- Created and duplicated setlists through the app on the 375-point iPhone simulator. Search and the duplicate-sheet transition were checked visually.
- Names containing 32 accented characters and 32 emoji round-tripped without truncation.
- Removed all four temporary setlists. The four original setlists, their entries, all 165 occupied User preset records, and the active preset reference and edited flag exactly matched the pre-test snapshot.
- Unit tests cover invalid names and references, capacity, negative or missing acknowledgements, lost replies, partial duplication, active-setlist deletion guards, and read-back failures.

The existing Factory Presets container query timed out on the test unit, both with and without the `stadium` SKU filter. The app now exposes a failed read with a retry action instead of treating it as an empty source. Duplication was verified with User presets; the Factory-source case remains unverified. Packet capture was unavailable without a local administrator password; verification used the mobile client and device read-back.
