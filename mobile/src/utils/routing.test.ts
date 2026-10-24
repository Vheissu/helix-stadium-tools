import assert from 'node:assert/strict';
import test from 'node:test';
import { isDerivedRoutingIO, routingInsertReason, routingLinkChoices } from './routing';
import { computeBranchSegments } from './routingLayout';
import { formatParamValue } from './paramFormat';
import type { SignalFlowGrid } from '../types/signalFlow';
const empty = (): SignalFlowGrid => Array.from({ length: 4 }, () => Array(12).fill(null));
const node = (id: number, linkPosition: number) => ({ id, kind: 'routing', name: 'Custom label', linkPosition });
test('routing insertion is limited to row A and preserves split/merge roles', () => {
  const grid = empty();
  assert.equal(routingInsertReason(grid, { path: 0, block: 2 }, 475), null);
  assert.match(routingInsertReason(grid, { path: 1, block: 2 }, 475)!, /row 1A/);
  grid[0][2] = node(475, 17);
  for (const id of [474, 475, 476, 477]) assert.equal(routingInsertReason(grid, { path: 0, block: 2 }, id), null);
  for (const id of [478, 536]) assert.ok(routingInsertReason(grid, { path: 0, block: 2 }, id));
  grid[0][2] = { id: 536, kind: 'amp', name: 'Amp' };
  assert.match(routingInsertReason(grid, { path: 0, block: 2 }, 475)!, /empty position/);
});
test('empty dual-amp branch is visible before adding its first amp', () => {
  const grid = empty(); grid[0][2] = node(475, 17); grid[0][7] = node(478, 22);
  assert.equal(computeBranchSegments(grid[0], grid[1]).length, 1);
  assert.equal(isDerivedRoutingIO(grid, 1, 'input'), true);
  assert.equal(isDerivedRoutingIO(grid, 1, 'output'), true);
  assert.equal(isDerivedRoutingIO(grid, 0, 'input'), false);
});
test('independent input, output and multiple branches expose only real IO', () => {
  const grid = empty(); grid[0][7] = node(478, 22);
  assert.equal(isDerivedRoutingIO(grid, 1, 'input'), false);
  assert.equal(isDerivedRoutingIO(grid, 1, 'output'), true);
  assert.deepEqual(computeBranchSegments(grid[0], grid[1]), [{ splitColumn: null, mergeColumn: 7, from: 0, to: 7 }]);
  grid[0][9] = node(475, 24);
  assert.equal(isDerivedRoutingIO(grid, 1, 'output'), false);
  assert.equal(computeBranchSegments(grid[0], grid[1]).length, 2);
});
test('branch connection choices stay between adjacent endpoints and inside row B', () => {
  const grid = empty(); grid[2][2] = node(475, 17); grid[2][7] = node(478, 22);
  assert.deepEqual(routingLinkChoices(grid, { path: 2, block: 2 }), [15, 16, 17, 18, 19, 20, 21, 22]);
  assert.deepEqual(routingLinkChoices(grid, { path: 2, block: 7 }), [17, 18, 19, 20, 21, 22, 23, 24, 25, 26]);
  assert.deepEqual(routingLinkChoices(grid, { path: 3, block: 2 }), []);
});
test('split balance, route-to and merge pan values name the side correctly', () => {
  const format = (value: number, unit: string) => formatParamValue(value, 0, 1, -100, 100, unit, 'f');
  assert.equal(format(0, 'Left'), 'L 100.0'); assert.equal(format(0.5, 'Left'), 'Center'); assert.equal(format(1, 'Left'), 'R 100.0');
  assert.equal(format(0, 'A'), 'A 100.0'); assert.equal(format(0.5, 'A'), 'Even split'); assert.equal(format(1, 'A'), 'B 100.0');
});

test('new routing nodes cannot create overlapping split paths', () => {
  const grid = empty(); grid[0][2] = node(475, 17); grid[0][7] = node(478, 22);
  assert.match(routingInsertReason(grid, { path: 0, block: 4 }, 475)!, /merge/);
  assert.match(routingInsertReason(grid, { path: 0, block: 5 }, 478)!, /split/);
  assert.equal(routingInsertReason(grid, { path: 0, block: 9 }, 475), null);
});
