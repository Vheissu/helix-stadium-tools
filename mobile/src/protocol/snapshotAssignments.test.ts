import assert from 'node:assert/strict';
import test from 'node:test';
import { changeSnapshotAssignment, readSnapshotParameters, snapshotAssignmentCommand, type SnapshotAssignmentTransport } from './snapshotAssignments';
import { snapshotMetadataChanged } from './presetCreation';
const target = { presetId: 5, flow: 0, blockId: 2, modelId: 10, snapshotIndex: 0 };
const state = (assigned = false, controller = 0) => ({ cg__: { asnp: 0 }, sfg_: { flow: [{ blks: [2, { id__: 2, mdls: [{ id__: 10, parm: [{ pid_: 1, valu: 0.5, snap: assigned, tid_: assigned ? 8 : 0, cid_: controller }] }] }] }] } });
function io(overrides: Partial<SnapshotAssignmentTransport> = {}): SnapshotAssignmentTransport {
  let assigned = false;
  return { activeId: async () => 5, state: async () => state(assigned), send: async () => { assigned = true; return [1, 8, 0]; }, ...overrides };
}
test('assignment uses current value and verifies actual readback', async () => {
  const result = await changeSnapshotAssignment(io(), target, 1, true, 'f'); assert.equal(result[0].assigned, true);
  const p = readSnapshotParameters(state(), target)[0];
  assert.deepEqual(snapshotAssignmentCommand(target, p, true, 'f'), { address: '/assignSnapParam', types: 'iiiif', args: [0, 2, 0, 1, 0.5] });
});
test('removal addresses the target, not the parameter or controller', async () => {
  let assigned = true;
  await changeSnapshotAssignment(io({ state: async () => state(assigned), send: async cmd => {
    assert.deepEqual(cmd, { address: '/removeSnapshotTarget', types: 'i', args: [8] }); assigned = false; return [1, 0, 0];
  } }), target, 1, false, 'f');
});
test('stale preset, snapshot, model or a competing controller prevents writes', async () => {
  let writes = 0; const send = async () => { writes++; return [1, 8, 0]; };
  for (const overrides of [{ activeId: async () => 6 }, { state: async () => ({ ...state(), cg__: { asnp: 1 } }) },
    { state: async () => state(false, 3) }]) await assert.rejects(changeSnapshotAssignment(io({ ...overrides, send }), target, 1, true, 'f'));
  await assert.rejects(changeSnapshotAssignment(io({ send }), { ...target, modelId: 11 }, 1, true, 'f'));
  assert.equal(writes, 0);
});
test('failed and misleading acknowledgements cannot report success', async () => {
  for (const reply of [null, [1, 0, 0], [1, -1, 0], [1, 8, -1]]) await assert.rejects(changeSnapshotAssignment(io({ send: async () => reply }), target, 1, true, 'f'));
  await assert.rejects(changeSnapshotAssignment(io({ state: async () => state(false) }), target, 1, true, 'f'), /has not confirmed/);
});
test('unchanged assignments are a no-op and malformed removal ids are rejected', async () => {
  await changeSnapshotAssignment(io({ send: async () => { throw new Error('must not send'); } }), target, 1, false, 'f');
  assert.throws(() => snapshotAssignmentCommand(target, readSnapshotParameters(state(), target)[0], false, 'f'));
});
test('snapshot membership detects unsaved changes even when snapshot names stay the same', () => {
  const snapshot = { si__: 0, name: 'Verse', vald: true };
  const saved = { cg__: { entt: { snps: [snapshot], ctm_: { stid: [3, 1] } } } };
  const live = (stid: unknown) => ({ cg__: { entt: { snps: [snapshot], ctm_: { stid } } } });
  assert.equal(snapshotMetadataChanged(live([1, 3]), saved), false);
  assert.equal(snapshotMetadataChanged(live([1, 3, 4]), saved), true);
  assert.equal(snapshotMetadataChanged(live([1]), saved), true);
  assert.equal(snapshotMetadataChanged(live(null), saved), null);
});
