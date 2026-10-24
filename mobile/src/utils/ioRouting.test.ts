import assert from 'node:assert/strict';
import test from 'node:test';
import { derivedIOReason, ioModelAllowed } from './ioRouting';
test('Path 2 outputs cannot feed back into Path 2', () => {
  for (const id of [779, 784, 788]) {
    assert.equal(ioModelAllowed(0, 'output', id), true);
    assert.equal(ioModelAllowed(1, 'output', id), true);
    assert.equal(ioModelAllowed(2, 'output', id), false);
    assert.equal(ioModelAllowed(3, 'output', id), false);
  }
  assert.equal(ioModelAllowed(2, 'output', 783), true);
});
test('inputs fed by Path 1 cannot be replaced independently', () => {
  const grid = Array.from({ length: 4 }, () => Array(12).fill(null));
  const io = [{ input: null, output: { modelId: 779, blockId: 13, name: 'Path 2A', params: {} } }];
  assert.equal(derivedIOReason(grid, io, 2, 'input'), 'From Path 1');
  assert.equal(derivedIOReason(grid, io, 3, 'input'), null);
});

test('an unused merged branch output does not reserve the next path input', () => {
  const grid = Array.from({ length: 4 }, () => Array(12).fill(null));
  grid[0][2] = { id: 475, kind: 'routing', name: 'Y' }; grid[0][6] = { id: 478, kind: 'routing', name: 'Mixer' };
  const io = [{ input: null, output: null }, { input: null, output: { modelId: 788, blockId: 27, name: 'Path 2A+B', params: {} } }];
  assert.equal(derivedIOReason(grid, io, 2, 'input'), null);
  assert.equal(derivedIOReason(grid, io, 3, 'input'), null);
});
