import assert from 'node:assert/strict';
import test from 'node:test';
import { captureBlockSettings, copyBlockSettings, type BlockCopyTransport } from './blockCopy';
import { CopyOperationError } from './copyOperation';
import { readBlockAt, type LiveBlock } from './blockCommands';

const source = (): LiveBlock => ({ id__: 42, enbl: false, snap: true, tid_: 12,
  mdls: [{ id__: 536, parm: [{ pid_: 1, valu: 0.42 }, { pid_: 5, valu: 0 }] }],
  hrns: { parm: [{ pid_: 11, valu: true }] } });
const captureTarget = { flow: 0, position: 5, modelId: 536, instanceId: 42 };
const destination = { presetId: 904, flow: 1, position: 3 };
function fixture() {
  const original = source();
  const state = { flow: [{ blks: [5, original] as (number | LiveBlock)[] }, { blks: [] as (number | LiveBlock)[] }] };
  const writes: unknown[][] = [];
  let preset: number | null = 904;
  const io: BlockCopyTransport = {
    activeId: async () => preset, state: async () => state,
    autoCab: async () => false, setAutoCab: async () => { throw new Error('Already disabled'); },
    model: async (flow, position, modelId) => {
      writes.push(['model', flow, position, modelId]);
      state.flow[flow].blks.push(position, { id__: 100, enbl: true, mdls: [{ id__: modelId, parm: [{ pid_: 1, valu: 0.5 }, { pid_: 5, valu: 0 }] }], hrns: { parm: [{ pid_: 11, valu: false }] } });
    },
    enabled: async (flow, position, value) => { writes.push(['enabled', value]); readBlockAt(state, flow, position)!.enbl = value; },
    parameter: async (flow, position, id, value, type, harness) => {
      writes.push(['parameter', id, value, type, harness]);
      const block = readBlockAt(state, flow, position)!;
      const params = harness ? (block.hrns as { parm: Array<{ pid_: number; valu: number | boolean }> }).parm : block.mdls![0].parm!;
      params.find(param => param.pid_ === id)!.valu = value;
    },
  };
  return { state, io, writes, original, switchPreset: (value: number | null) => { preset = value; }, copy: captureBlockSettings(state, captureTarget) };
}

test('copy between primary paths keeps current settings, bypass and harness values without changing the source', async () => {
  const h = fixture(); const before = structuredClone(h.original);
  const result = await copyBlockSettings(h.io, h.copy, destination);
  assert.equal(result.warning, null); assert.deepEqual(h.original, before);
  const copied = readBlockAt(h.state, 1, 3)!;
  assert.equal(copied.id__, 100); assert.equal(copied.enbl, false);
  assert.equal(copied.mdls![0].parm![0].valu, 0.42);
  assert.deepEqual(h.writes.filter(write => write[0] === 'parameter'), [['parameter', 1, 0.42, 'f', false], ['parameter', 11, true, 'b', true]]);
  assert.equal(copied.tid_, undefined); // Current settings only; the source's assignment IDs are never reused.
});

test('capture freezes settings and rejects changed blocks, multi-model cabs, routing and file-backed blocks', () => {
  const h = fixture(); h.original.mdls![0].parm![0].valu = 0.9;
  assert.equal(h.copy.settings.params[0].value, 0.42);
  assert.throws(() => captureBlockSettings(h.state, { ...captureTarget, instanceId: 99 }), /block changed/);
  for (const [id, pattern] of [[475, /Copy path/], [468, /file reference/], [836, /file reference/]] as const) {
    h.original.mdls = [{ id__: id }];
    assert.throws(() => captureBlockSettings(h.state, { ...captureTarget, modelId: id }), pattern);
  }
  h.original.mdls = [{ id__: 536 }, { id__: 536 }];
  assert.throws(() => captureBlockSettings(h.state, captureTarget), /both cab models/);
  h.original.mdls = [{ id__: 536, parm: [null] as unknown as Array<{ pid_: number; valu: number }> }];
  assert.throws(() => captureBlockSettings(h.state, captureTarget), /must be copied in the desktop/);
});

test('occupied slots, inactive branches and excess amp counts are rejected before a write', async () => {
  for (const scenario of ['occupied', 'branch', 'amps'] as const) {
    const h = fixture();
    if (scenario === 'occupied') h.state.flow[1].blks.push(3, source());
    if (scenario === 'amps') h.state.flow[1].blks.push(1, source(), 2, source());
    await assert.rejects(copyBlockSettings(h.io, h.copy, { ...destination, position: scenario === 'branch' ? 19 : 3 }), error => {
      assert.ok(error instanceof CopyOperationError); assert.equal(error.mayHaveChanged, false); return true;
    });
    assert.equal(h.writes.length, 0);
  }
});

test('a destination occupied during preflight is never overwritten', async () => {
  const h = fixture();
  h.io.autoCab = async () => { h.state.flow[1].blks.push(3, source()); return false; };
  await assert.rejects(copyBlockSettings(h.io, h.copy, destination), /empty position/);
  assert.equal(h.writes.length, 0);
});

test('preset changes stop subsequent writes and no-op parameter replies fail readback', async () => {
  const h = fixture(); const model = h.io.model;
  h.io.model = async (...args) => { await model(...args); h.switchPreset(905); };
  await assert.rejects(copyBlockSettings(h.io, h.copy, destination), error => {
    assert.ok(error instanceof CopyOperationError); assert.equal(error.mayHaveChanged, true); return true;
  });
  assert.equal(h.writes.length, 1);
  const noOp = fixture(); noOp.io.parameter = async () => {};
  await assert.rejects(copyBlockSettings(noOp.io, noOp.copy, destination), /every copied setting/);
});

test('copy into an existing B branch uses visible branch positions', async () => {
  const h = fixture();
  h.state.flow[1].blks.push(2, { mdls: [{ id__: 475 }], bblk: 17 }, 8, { mdls: [{ id__: 478 }], bblk: 22 });
  await copyBlockSettings(h.io, h.copy, { ...destination, position: 19 });
  assert.equal(readBlockAt(h.state, 1, 19)?.mdls?.[0]?.id__, 536);
});
