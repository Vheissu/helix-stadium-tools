import assert from 'node:assert/strict';
import test from 'node:test';
import { buildOsc } from './osc';
import { presetSaveCommand, presetStorageId, requireSaveAcknowledgement, savePresetAndConfirm, type PresetSaveTransport } from './presetSave';

const io = (overrides: Partial<PresetSaveTransport> = {}): PresetSaveTransport => ({
  sendSave: async () => {}, getActivePresetContentId: async () => 200,
  getContentRef: async () => ({ type: 1, rcid: 42 }), isPresetEdited: async () => false, ...overrides,
});
const fast = { pause: async () => {}, attempts: 3 };

test('whole-preset save packet includes both desktop-editor selector sentinels', () => {
  const command = presetSaveCommand(42);
  const wire = buildOsc(command.address, `i${command.types}`, [7, ...command.args]);
  assert.equal(wire.toString('hex'), '2f536176655072657365745769746843494400002c69696969000000000000070000002affffffffffffffff');
});
test('preset destinations resolve setlist references and reject empty placeholders', () => {
  assert.equal(presetStorageId(200, { type: 1, rcid: 42 }), 42);
  assert.equal(presetStorageId(42, { type: 2, rcid: 0 }), 42);
  assert.equal(presetStorageId(200, { type: 1, rcid: 0 }), null);
  for (const value of [0, -1, NaN, Infinity, 0.5, 2147483648]) assert.throws(() => presetSaveCommand(value));
});
test('save acknowledgement rejects failures, missing and malformed replies', () => {
  requireSaveAcknowledgement([7, 0, 1]);
  requireSaveAcknowledgement([7, 0, 0]);
  for (const value of [null, [], [7], [7, 0], [7, -1, 0], [7, 0, -21], [7, '0', 1]]) assert.throws(() => requireSaveAcknowledgement(value));
});
test('save waits for the device dirty flag instead of assuming an acknowledged command saved', async () => {
  const events: string[] = []; let reads = 0;
  await savePresetAndConfirm(io({ sendSave: async (id) => { events.push(`save:${id}`); }, isPresetEdited: async () => { events.push('read'); return ++reads < 3; } }), 42, fast);
  assert.deepEqual(events, ['save:42', 'read', 'read', 'read']);
});
test('dirty or unavailable state never reports a successful save', async () => {
  for (const value of [true, null]) await assert.rejects(savePresetAndConfirm(io({ isPresetEdited: async () => value }), 42, fast), /not confirmed/);
});
test('device rejection propagates without checking a clean flag', async () => {
  let reads = 0;
  await assert.rejects(savePresetAndConfirm(io({ sendSave: async () => { throw new Error('Save rejected'); }, isPresetEdited: async () => { reads++; return false; } }), 42, fast), /Save rejected/);
  assert.equal(reads, 0);
});
test('a stale destination is rejected before a write', async () => {
  let writes = 0;
  await assert.rejects(savePresetAndConfirm(io({ sendSave: async () => { writes++; } }), 43, fast), /active preset changed/);
  assert.equal(writes, 0);
});
test('switching presets during confirmation cannot borrow the new presets clean flag', async () => {
  let active = 200;
  await assert.rejects(savePresetAndConfirm(io({ getActivePresetContentId: async () => active, isPresetEdited: async () => { active = 201; return false; } }), 42, fast), /active preset changed/);
});
test('a missing reference or disconnect stops saving without sending a command', async () => {
  let writes = 0;
  for (const override of [{ getContentRef: async () => null }, { getActivePresetContentId: async () => null }]) {
    await assert.rejects(savePresetAndConfirm(io({ sendSave: async () => { writes++; }, ...override }), 42, fast), /Could not read/);
  }
  assert.equal(writes, 0);
});

test('switching presets while resolving the save destination prevents the write', async () => {
  let active = 200; let writes = 0;
  await assert.rejects(savePresetAndConfirm(io({
    getActivePresetContentId: async () => active,
    getContentRef: async () => { active = 201; return { type: 1, rcid: 42 }; },
    sendSave: async () => { writes++; },
  }), 42, fast), /active preset changed/);
  assert.equal(writes, 0);
});

test('snapshot-only edits can be saved when the device reports a clean preset', async () => {
  let saves = 0;
  await savePresetAndConfirm(io({
    sendSave: async () => { requireSaveAcknowledgement([7, 0, 0]); saves++; },
    isPresetEdited: async () => false,
  }), 42, fast);
  assert.equal(saves, 1);
});
