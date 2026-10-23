import assert from 'node:assert/strict';
import test from 'node:test';
import { branchColumns, computeBranchSegments, isMergeBlock } from './routingLayout';

const block = (kind: string, name: string, linkPosition?: number) => ({ kind, name, ...(linkPosition === undefined ? {} : { linkPosition }) });
const row = (cells: Record<number, ReturnType<typeof block>>) => Array.from({ length: 12 }, (_, column) => cells[column] ?? null);

test('a branch can start and end in different columns from its split and merge', () => {
  // Captured edit buffer, path 1: Y at position 9 feeds row B from position 19;
  // Mixer at position 10 collects row B up to position 26.
  const rowA = row({ 0: block('dynamics', 'Deluxe Comp'), 8: block('routing', 'Y', 19), 9: block('routing', 'Mixer', 26), 11: block('reverb', 'Dynamic Hall') });
  const rowB = row({ 4: block('pitch_synth', 'Dual Pitch'), 11: block('modulation', 'Tremolo/Autopan') });
  assert.deepEqual(computeBranchSegments(rowA, rowB), [{ splitColumn: 8, mergeColumn: 9, from: 4, to: 11 }]);
});

test('aligned branches stay between their split and merge columns', () => {
  // Captured edit buffer, path 2: Y at position 5, Mixer at position 7.
  const rowA = row({ 4: block('routing', 'Y', 19), 5: block('amp', 'US Tweedman'), 6: block('routing', 'Mixer', 21) });
  const rowB = row({ 5: block('amp', 'Brit Plexi') });
  const segments = computeBranchSegments(rowA, rowB);
  assert.deepEqual(segments, [{ splitColumn: 4, mergeColumn: 6, from: 4, to: 6 }]);
  assert.deepEqual([...branchColumns(segments)], [4, 5, 6]);
});

test('several splits pair with the next free merge, and an open split runs to row B output', () => {
  const rowA = row({ 1: block('routing', 'A/B'), 3: block('routing', 'Mixer'), 6: block('routing', 'Y') });
  assert.deepEqual(computeBranchSegments(rowA, row({})), [
    { splitColumn: 1, mergeColumn: 3, from: 1, to: 3 },
    { splitColumn: 6, mergeColumn: null, from: 6, to: 11 },
  ]);
});

test('row B without a split is drawn as a whole row; an empty path has no branch', () => {
  assert.deepEqual(computeBranchSegments(row({}), row({ 2: block('delay', 'Cosmos Echo') })), [{ splitColumn: null, mergeColumn: null, from: 0, to: 11 }]);
  assert.deepEqual(computeBranchSegments(row({}), row({}), true), [{ splitColumn: null, mergeColumn: null, from: 0, to: 11 }]);
  assert.deepEqual(computeBranchSegments(row({ 0: block('amp', 'Agua 51') }), row({})), []);
});

test('links outside row B fall back to the node column', () => {
  const rowA = row({ 2: block('routing', 'Crossover', 99), 5: block('routing', 'Mixer', 3) });
  assert.deepEqual(computeBranchSegments(rowA, row({})), [{ splitColumn: 2, mergeColumn: 5, from: 2, to: 5 }]);
  assert.equal(isMergeBlock(block('routing', 'Mixer')), true);
  assert.equal(isMergeBlock(block('routing', 'Dynamic')), false);
  assert.equal(isMergeBlock(block('reverb', 'Mixer')), false);
});
