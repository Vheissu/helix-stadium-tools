import assert from 'node:assert/strict';
import test from 'node:test';
import { reorderPathBlocks, visibleBlockCount } from './blockMove';

const amp = { id: 1, params: { gain: 0.42 }, enabled: false };
const delay = { id: 2, params: { time: 0.7 }, enabled: true };

test('moving onto another block inserts without replacing it and preserves settings', () => {
  const original = [amp, delay, null, null];
  const next = reorderPathBlocks(original, 0, 1)!;
  assert.deepEqual(next, [delay, amp, null, null]);
  assert.equal(next[1], amp);
  assert.deepEqual(original, [amp, delay, null, null]);
  assert.deepEqual(reorderPathBlocks(next, 1, 0), original);
});

test('moving through empty positions preserves gaps and the path capacity', () => {
  assert.deepEqual(reorderPathBlocks([amp, null, delay, null], 0, 3), [null, delay, null, amp]);
  assert.equal(visibleBlockCount(Array(12).fill(null)), 1);
  assert.equal(visibleBlockCount([amp, delay, null, null]), 3);
  assert.equal(visibleBlockCount(Array(12).fill(amp)), 12);
});

test('rejects missing sources, hidden positions, invalid indices and unchanged moves', () => {
  const blocks = [amp, delay, null, null];
  for (const [from, to] of [[2, 0], [0, 3], [-1, 0], [0, -1], [0.5, 1], [0, NaN], [0, 0], [12, 0]]) {
    assert.equal(reorderPathBlocks(blocks, from, to), null, `${from} to ${to}`);
  }
  assert.equal(reorderPathBlocks([], 0, 1), null);
});
