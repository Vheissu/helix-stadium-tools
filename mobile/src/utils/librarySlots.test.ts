import { test } from 'node:test';
import assert from 'node:assert/strict';
import { populatedSlots, setlistAppendPosition, setlistMovePosition } from './librarySlots';

test('fixed-size setlist placeholders are not presets or append positions', () => {
  const slots = Array.from({ length: 128 }, (_, posi) => posi < 4 ? { posi, cid_: 898 + posi } : { posi });
  assert.equal(populatedSlots(slots).length, 4);
  assert.equal(setlistAppendPosition(slots, 2), 4);
  assert.equal(setlistAppendPosition(slots.map(({ posi }) => ({ posi })), 1), 0);
  assert.equal(setlistMovePosition(slots, 3, 1), null);
});

test('setlist positions retain gaps, capacity and insertion-boundary semantics', () => {
  const slots = [{ cid_: 1, posi: 0 }, { cid_: 2, posi: 5 }, { cid_: 3, posi: 127 }];
  assert.equal(setlistMovePosition(slots, 0, 1), 6);
  assert.equal(setlistMovePosition(slots, 5, -1), 0);
  assert.equal(setlistMovePosition(slots, 0, -1), null);
  assert.equal(setlistMovePosition(slots, undefined, 1), null);
  assert.throws(() => setlistAppendPosition(slots, 1), /not enough room/);
  assert.throws(() => setlistAppendPosition([{ cid_: 1 }], 1), /Could not read/);
  assert.throws(() => setlistAppendPosition([], 0), /Select presets/);
  assert.throws(() => setlistAppendPosition([], 1), /Could not read/);
  assert.equal(setlistAppendPosition([{ cid_: 1, posi: 126 }], 1), 127);
});
