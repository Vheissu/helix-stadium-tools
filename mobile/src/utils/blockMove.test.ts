import assert from 'node:assert/strict';
import test from 'node:test';
import { dropRange, movedIndex, reorderPathBlocks, visibleBlockCount } from './blockMove';

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

test('positions follow a reorder so selection can track the moved block', () => {
  const blocks = ['a', 'b', 'c', 'd', null];
  const next = reorderPathBlocks(blocks, 0, 2)!;
  blocks.forEach((block, index) => {
    if (block) assert.equal(next[movedIndex(index, 0, 2)], block);
  });
  const back = reorderPathBlocks(blocks, 3, 1)!;
  blocks.forEach((block, index) => {
    if (block) assert.equal(back[movedIndex(index, 3, 1)], block);
  });
});

test('drags stay between routing nodes and inside the visible positions', () => {
  const fixed = (block: string) => block === 'split' || block === 'merge';
  const row = ['comp', 'drive', 'split', 'amp', 'cab', 'merge', 'delay', null, null, null, null, null];
  assert.deepEqual(dropRange(row, 0, fixed), [0, 1]);
  assert.deepEqual(dropRange(row, 3, fixed), [3, 4]);
  assert.deepEqual(dropRange(row, 6, fixed), [6, 7]);
  assert.equal(dropRange(row, 2, fixed), null);
  assert.equal(dropRange(row, 8, fixed), null);
  assert.deepEqual(dropRange(['amp', null, 'reverb', null], 2, fixed), [0, 3]);
});

test('parallel branch positions remain available before the first block', async () => {
  const { visibleBlockIndices } = await import('./blockMove');
  const empty = Array(12).fill(null);
  assert.deepEqual(visibleBlockIndices(empty, [3, 4, 5, 6]), [3, 4, 5, 6]);
  empty[4] = 'Amp';
  assert.equal(reorderPathBlocks(empty, 4, 2, [3, 4, 5, 6]), null);
  assert.equal(reorderPathBlocks(empty, 4, 6, [3, 4, 5, 6])?.[6], 'Amp');
});

test('move sheets retain the selected instance even when another identical model takes its slot', async () => {
  const { matchesMoveSource } = await import('./blockMove');
  const source = { modelId: 536, instanceId: 5 };
  assert.equal(matchesMoveSource({ id: 536, instanceId: 5 }, source), true);
  assert.equal(matchesMoveSource({ id: 536, instanceId: 6 }, source), false);
  assert.equal(matchesMoveSource({ id: 594, instanceId: 5 }, source), false);
  assert.equal(matchesMoveSource(null, source), false);
});
