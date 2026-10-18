import assert from 'node:assert/strict';
import test from 'node:test';
import { applyFocusChanges, type FocusTarget, type FocusTransport } from './focusSession';
import type { FocusChange } from '../utils/focus';
const target: FocusTarget = { presetId: 904, flow: 0, blockId: 1, modelId: 628, snapshotIndex: 0 };
const changes: FocusChange[] = [{ id: 1, key: 'Drive', type: 'f', value: 0.8 }];
const harness = () => {
  const device = { preset: 904, model: 628, snapshot: 0, drive: 0.33, writes: 0 };
  const io: FocusTransport = {
    activeId: async () => device.preset,
    state: async () => ({ cg__: { asnp: device.snapshot }, sfg_: { flow: [{ blks: [1, { id__: 1, mdls: [{ id__: device.model, parm: [{ pid_: 1, valu: device.drive }] }] }] }] } }),
    write: async change => { device.writes++; device.drive = Number(change.value); },
  };
  return { device, io };
};
test('Focus reports success only after reading the requested value from the same block', async () => {
  const { device, io } = harness(); const values = await applyFocusChanges(io, target, changes);
  assert.equal(values[1], 0.8); assert.equal(device.writes, 1);
});
test('preset, model and snapshot changes prevent Focus writes', async () => {
  for (const field of ['preset', 'model', 'snapshot'] as const) {
    const { device, io } = harness(); device[field]++;
    await assert.rejects(applyFocusChanges(io, target, changes), /changed/); assert.equal(device.writes, 0);
  }
});
test('unavailable parameters and non-finite values are rejected before writing', async () => {
  for (const change of [{ ...changes[0], id: 999 }, { ...changes[0], value: NaN }]) {
    const { device, io } = harness(); await assert.rejects(applyFocusChanges(io, target, [change]), /unavailable/); assert.equal(device.writes, 0);
  }
});
test('an accepted command with an unchanged readback is not a successful Focus adjustment', async () => {
  const { io } = harness(); io.write = async () => {};
  await assert.rejects(applyFocusChanges(io, target, changes), /not confirmed every/);
});
test('device errors and preset switches during the write propagate without false success', async () => {
  const first = harness(); first.io.write = async () => { throw new Error('Device refused'); };
  await assert.rejects(applyFocusChanges(first.io, target, changes), /Device refused/);
  const second = harness(); second.io.write = async () => { second.device.preset++; };
  await assert.rejects(applyFocusChanges(second.io, target, changes), /changed/);
});
test('missing or malformed parameter readback cannot confirm a Focus adjustment', async () => {
  const { io } = harness();
  io.write = async () => {
    io.state = async () => ({ cg__: { asnp: 0 }, sfg_: { flow: [{ blks: [1, { id__: 1, mdls: [{ id__: 628, parm: [] }] }] }] } });
  };
  await assert.rejects(applyFocusChanges(io, target, changes), /not confirmed every/);
});
