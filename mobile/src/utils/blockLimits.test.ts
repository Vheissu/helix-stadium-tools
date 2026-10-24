import assert from 'node:assert/strict';
import test from 'node:test';
import { blockLimitReason } from './blockLimits';
import type { SignalFlowGrid } from '../types/signalFlow';
const grid = (): SignalFlowGrid => Array.from({ length: 4 }, () => Array(12).fill(null));
const amp = { id: 536, kind: 'amp', name: 'US Deluxe' };
test('two amps share the A/B budget and replacement does not count twice', () => {
  const g = grid(); g[0][3] = amp;
  assert.equal(blockLimitReason(g, { path: 1, block: 3 }, amp), null);
  g[1][3] = amp;
  assert.match(blockLimitReason(g, { path: 0, block: 4 }, amp)!, /two amps/);
  assert.equal(blockLimitReason(g, { path: 0, block: 3 }, amp), null);
  assert.equal(blockLimitReason(g, { path: 2, block: 3 }, amp), null);
  assert.ok(blockLimitReason(g, { path: 1, block: 4 }, { id: 600, kind: 'preamp' }));
});
test('cab and auto-cab, Poly effects and preset-wide looper limits are enforced', () => {
  const g = grid(); g[0][2] = { id: 1, kind: 'cab', name: 'Cab' }; g[1][2] = { id: 2, kind: 'cab', name: 'Cab' };
  assert.match(blockLimitReason(g, { path: 0, block: 1 }, amp, true)!, /Auto-cab/);
  assert.equal(blockLimitReason(g, { path: 0, block: 1 }, amp), null);
  g[0][4] = { id: 482, kind: 'dynamics', name: 'Feedbacker' };
  assert.ok(blockLimitReason(g, { path: 1, block: 5 }, { id: 520, kind: 'pitch_synth' }));
  g[0][5] = { id: 1, kind: 'looper', name: 'Looper' };
  assert.ok(blockLimitReason(g, { path: 3, block: 4 }, { id: 2, kind: 'looper' }));
});

test('all four public Clone types share a two-per-path limit', () => {
  const g = grid(); g[0][3] = { id: 839, kind: 'distortion', name: 'Distortion Clone' }; g[1][3] = { id: 836, kind: 'amp', name: 'Amp Clone' };
  for (const id of [836, 838, 839, 840]) assert.match(blockLimitReason(g, { path: 1, block: 4 }, { id, kind: 'distortion' })!, /two Clone/);
  assert.equal(blockLimitReason(g, { path: 0, block: 3 }, { id: 840, kind: 'preamp' }), null);
});
