import assert from 'node:assert/strict';
import test from 'node:test';

import type { BlockData, IOGrid, SignalFlowGrid } from '../types/signalFlow';
import { detectVirtualNamRoute } from './virtualNam';

const emptyGrid = (): SignalFlowGrid =>
  Array.from({ length: 4 }, () => Array.from({ length: 12 }, () => null));

const routeIO = (): IOGrid => [
  {
    input: { blockId: 0, modelId: 770, name: 'Instrument 1', params: {} },
    output: { blockId: 13, modelId: 785, name: 'USB 3/4', params: { '1': 0 } },
  },
  {
    input: { blockId: 14, modelId: 762, name: 'USB 3/4', params: { '1': 0 } },
    output: {
      blockId: 27,
      modelId: 783,
      name: 'Matrix 1/4", XLR, Phones',
      params: { '1': 0.5, '2': -18 },
    },
  },
  { input: null, output: null },
  { input: null, output: null },
];

const gainBlock: BlockData = {
  id: 282,
  name: 'Gain',
  kind: 'volume_pan',
  enabled: true,
  params: { '1': 0 },
};

test('detectVirtualNamRoute recognises the complete dual-mono route', () => {
  const grid = emptyGrid();
  grid[1][0] = gainBlock;

  const route = detectVirtualNamRoute(grid, routeIO());

  assert.equal(route?.ready, true);
  assert.equal(route?.profile.modelName, 'GRANO V1 - 808 V30');
  assert.equal(route?.profile.nativeNamUsage, 0);
  assert.equal(route?.profile.nativeRouteOverhead, 0.8);
  assert.equal(route?.profile.armAverageEstimateMin, 8);
  assert.equal(route?.profile.armAverageEstimateMax, 10);
});

test('detectVirtualNamRoute flags the legacy one-channel return', () => {
  const route = detectVirtualNamRoute(emptyGrid(), routeIO());

  assert.equal(route?.ready, false);
  assert.equal(route?.sendPanIsolated, true);
  assert.equal(route?.monoReturnReady, false);
});

test('detectVirtualNamRoute ignores an ordinary preset', () => {
  const io = routeIO();
  io[0].output = { blockId: 13, modelId: 783, name: 'Matrix', params: {} };

  assert.equal(detectVirtualNamRoute(emptyGrid(), io), null);
});
