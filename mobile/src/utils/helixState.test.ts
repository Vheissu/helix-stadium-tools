import assert from 'node:assert/strict';
import test from 'node:test';

import { coerceHelixBoolean, extractSnapshots, findFirstKey, findFlows, hasFlowState } from './helixState';

test('findFlows returns the first nested flow array', () => {
  const state = {
    payload: {
      sfg_: {
        flow: [{ id: 'path-1a' }, { id: 'path-2a' }],
      },
    },
  };

  assert.deepEqual(findFlows(state), [{ id: 'path-1a' }, { id: 'path-2a' }]);
});

test('findFlows returns null when no flow state is present', () => {
  assert.equal(findFlows({ payload: { other: [] } }), null);
  assert.equal(hasFlowState({ payload: { other: [] } }), false);
});

test('findFirstKey walks nested arrays and objects', () => {
  const state = {
    items: [{ meta: { snps: ['a', 'b'] } }],
  };

  assert.deepEqual(findFirstKey(state, 'snps'), ['a', 'b']);
});

test('coerceHelixBoolean handles numeric and boolean device flags', () => {
  assert.equal(coerceHelixBoolean(1), true);
  assert.equal(coerceHelixBoolean(0), false);
  assert.equal(coerceHelixBoolean(true), true);
  assert.equal(coerceHelixBoolean(false), false);
  assert.equal(coerceHelixBoolean(undefined), true);
  assert.equal(coerceHelixBoolean(null, false), false);
  assert.equal(coerceHelixBoolean('0'), false);
  assert.equal(coerceHelixBoolean('enabled'), true);
});

test('extractSnapshots filters invalid entries and sorts by index', () => {
  const state = {
    content: {
      snps: [{ si__: 2, name: 'Third' }, { name: 'Missing index' }, { si__: 0, name: 'First' }],
    },
  };

  assert.deepEqual(extractSnapshots(state), [
    { si__: 0, name: 'First', index: 0 },
    { si__: 2, name: 'Third', index: 2 },
  ]);
});
