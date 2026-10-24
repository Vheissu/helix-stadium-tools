# Mobile routing and block editing

The mobile editor supports the four released split types: Y, A/B, Crossover
and Dynamic, plus the Merge Mixer. Split / Merge is the first category in
the block picker. Routing nodes are added to row A; their connected row-B
positions appear in both the visual and accessible lists, including an empty
branch.

For dual amps:

1. Add a Split Y at an empty position on row A.
2. Add an amp on each row, after the split.
3. Add a Merge Mixer later on row A.
4. Tap the merge to adjust each branch's level, pan and polarity.
5. Save when the routing and sound are right.

Each primary path shares its DSP and block-count limits across A and B.
The picker checks the public amp/preamp, cab, Clone, Poly and looper limits.
An input fed by a split, or an output feeding a merge, is labelled accordingly.
Independent branch inputs and outputs are editable. Path 2 cannot route its
output back into Path 2.

## Moving and recovering edits

**Move** offers empty positions on the same row, another branch, or the other
primary path. Split and merge nodes stay on their original row A and cannot
cross another routing node. Moving them also moves their row-B connection,
matching the device's native operation.

Dragging effects within one row uses native adjacent swaps. The app no longer
clears and recreates the moved range. Parameters, secondary models, harness
settings, stable block identities and snapshot/controller targets stay with
the blocks. A drag stays within one branch and does not reorder routing nodes.

Undo and Redo act on the entire preset. A multi-position drag is one undoable
operation. The device's own limitation still applies: undoing a removed block
does not necessarily restore its bypass/stomp/controller assignments.

Path paste requires confirmation, checks the destination's routing and resource
limits, and restores Auto-cab after use. It copies current settings and routing;
it does not claim to copy snapshot/controller assignments. Paths containing a
block with multiple cab models are rejected before clearing anything. Use the
desktop editor for those copies. A failed paste requires inspection before saving.

## Verified public protocol operations

The ordinary command replies below use `[commandId, 0, historyState]`. The
agenda reply instead includes a changed flag: `[commandId, 1, historyState]`
was observed for both one and two swaps.

```text
/moveBlock ,iiiii [commandId, sourceFlow, sourcePosition, targetFlow, targetPosition]
/doAgenda ,ib [commandId, msgpack([
  {cmnd: 0x73776170, flow: 0, blk0: 5, blk1: 6},
  {cmnd: 0x73776170, flow: 0, blk0: 6, blk1: 7}
])]
/undo ,i [commandId]
/redo ,i [commandId]
```

`0x73776170` is the FourCC `swap`. Positions are visible positions: 1–12 on
A and 15–26 on B. The native move is used only with an empty destination.
On the tested device, direct `/swapBlocks` and moves onto an occupied position
acknowledged without changing the edit buffer. The app uses the verified agenda
for reordering and verifies every resulting block identity instead of treating
the acknowledgement alone as proof.

On 24 October 2026, tests used the existing **HELYON Save Test** preset, with no
saves. A Y split, US Deluxe Nrm on A, Brit Plexi Brt on B, and Merge Mixer were
read back from the device and displayed by the desktop editor. All four split
types and branch connection changes were exercised through the iPhone simulator.
Native moves within a row and between primary paths preserved the complete raw
amp block and controller graph. Different bypass values in two snapshots survived.
The two-swap agenda preserved both blocks and the graph, and one Undo restored
their original positions. Split and merge movement was also checked: parameters
and the controller graph stayed intact while their branch endpoints moved.
The accessible Move later action swapped an amp with an occupied delay slot,
and Undo restored them. A fresh app session pasted the dual-amp path successfully;
readback matched all models, settings, bypass states and branch connections.
The original preset and snapshot were restored after testing, and the spare
preset's saved signal flow was unchanged.

Automated tests cover acknowledgements, visible versus internal block IDs,
stale presets, stale move sources, topology, readback failures, native move plans,
resource limits and path-paste validation. Physical phone USB, Android gestures
and audible signal quality need separate hardware checks.

## Public references

- [Stadium signal path routing](https://manuals.line6.com/en/helix-stadium/live/signal-path-routing)
- [Split and merge parameters](https://manuals.line6.com/en/helix-stadium/live/input-output-and-mix-blocks)
- [Public block-count limits](https://manuals.line6.com/en/helix-stadium/live/dynamic-dsp)
- [Moving, copying and clearing blocks](https://manuals.line6.com/en/helix-stadium/live/building-and-editing-tones)
