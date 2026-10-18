import assert from 'node:assert/strict';
import test from 'node:test';
import { Buffer } from 'buffer';
import { decode } from '@msgpack/msgpack';
import blank from '../data/blankPreset.json';
import { createHash } from 'node:crypto';
import { createEmptyPreset, createdPresetId, isEmptyUserSlot, presetCreationCommand, snapshotMetadataChanged, validatePresetName, PresetCreationError, type PresetCreationTransport } from './presetCreation';

const empty = { ccid: -2, posi: 174, type: 2 };
const reference = { ...empty, cid_: 904, name: 'New Preset' };
const transport = (overrides: Partial<PresetCreationTransport> = {}): PresetCreationTransport => ({
  getSlots: async () => [empty], getActiveId: async () => 10, isEdited: async () => false,
  allocate: async () => 904, getReference: async () => reference, writeBlank: async () => {},
  verifyBlank: async () => true, load: async () => {}, ...overrides,
});

test('creation uses a freshly verified empty User slot, then verifies content before loading', async () => {
  const calls: string[] = [];
  const result = await createEmptyPreset(transport({
    getSlots: async () => { calls.push('slots'); return [empty]; },
    allocate: async (position, name) => { calls.push(`create:${position}:${name}`); return 904; },
    writeBlank: async () => { calls.push('write'); }, verifyBlank: async () => { calls.push('verify'); return true; },
    load: async () => { calls.push('load'); },
  }), 174, ' New Preset ');
  assert.equal(result.loaded, true);
  assert.deepEqual(calls, ['slots', 'create:174:New Preset', 'write', 'verify', 'load']);
});
test('occupied, malformed, unknown and non-User slots cause no allocation', async () => {
  let writes = 0;
  for (const slots of [null, [], [reference], [{ ...empty, ccid: -1 }], [{ ...empty, cid_: -5 }]]) {
    await assert.rejects(createEmptyPreset(transport({ getSlots: async () => slots, allocate: async () => { writes++; return 904; } }), 174, 'New Preset'));
  }
  assert.equal(writes, 0);
  assert.equal(isEmptyUserSlot(empty), true);
});
test('unsaved or unknown current state stops creation before a write', async () => {
  let writes = 0;
  for (const dirty of [true, null]) await assert.rejects(createEmptyPreset(transport({ isEdited: async () => dirty, allocate: async () => { writes++; return 904; } }), 174, 'New Preset'), /Save your current changes/);
  assert.equal(writes, 0);
});
test('changing the current preset or editing it during creation does not discard that work', async () => {
  for (const change of ['preset', 'edit']) {
    let id = 10; let dirty = false; let loads = 0;
    const result = await createEmptyPreset(transport({ getActiveId: async () => id, isEdited: async () => dirty,
      writeBlank: async () => { if (change === 'preset') id = 20; else dirty = true; }, load: async () => { loads++; },
    }), 174, 'New Preset');
    assert.equal(result.loaded, false); assert.equal(loads, 0);
  }
});
test('a mismatched allocated location is never initialized', async () => {
  let writes = 0;
  await assert.rejects(createEmptyPreset(transport({ getReference: async () => ({ ...reference, posi: 175 }), writeBlank: async () => { writes++; } }), 174, 'New Preset'), /location could not be verified/);
  assert.equal(writes, 0);
});
test('an interrupted creation reports its known location without retrying or loading', async () => {
  let allocations = 0; let loads = 0;
  await assert.rejects(createEmptyPreset(transport({ allocate: async () => { allocations++; return 904; }, writeBlank: async () => { throw new Error('Disconnected'); }, load: async () => { loads++; } }), 174, 'New Preset'), error => {
    assert.ok(error instanceof PresetCreationError); assert.equal(error.contentId, 904); assert.match(error.message, /44C/); return true;
  });
  assert.equal(allocations, 1); assert.equal(loads, 0);
});
test('a failed content readback does not load an incomplete preset', async () => {
  let loads = 0;
  await assert.rejects(createEmptyPreset(transport({ verifyBlank: async () => false, load: async () => { loads++; } }), 174, 'New Preset'), /contents could not be verified/);
  assert.equal(loads, 0);
});
test('CreateContent acknowledgements return an allocated id, not a zero status', () => {
  assert.equal(createdPresetId([6, 905, 0]), 905);
  for (const bad of [null, [], [6, 0, 0], [6, -1, 0], [6, 5, -1], [6, '905', 0], [6, 0.2, 0]]) assert.throws(() => createdPresetId(bad));
});
test('creation attributes use string map keys while preserving the User destination and preset type', () => {
  const command = presetCreationCommand(174, 'Verse A');
  assert.equal(command.types, 'iiib');
  assert.deepEqual(command.args.slice(0, 3), [-2, 174, 2]);
  assert.deepEqual(decode(command.args[3] as Buffer), { blck: -1, colr: 0, dvcp: 'ALL', flow: -1, name: 'Verse A' });
});
test('preset names and slot limits reject invalid input before device work', async () => {
  for (const name of ['', '  ', 'a'.repeat(33), 'Bad\nName']) assert.throws(() => validatePresetName(name));
  assert.equal(validatePresetName('  Verse A  '), 'Verse A');
  for (const position of [-1, 512, NaN, 0.5]) await assert.rejects(createEmptyPreset(transport(), position, 'New Preset'));
});
test('snapshot edits missed by the device dirty flag still prevent discarding unsaved work', () => {
  const saved = { snps: [{ si__: 0, name: 'Verse', colr: 1, vald: true }, { si__: 1, vald: false }] };
  const reordered = { snps: [...saved.snps].reverse() };
  assert.equal(snapshotMetadataChanged(reordered, saved), false);
  for (const change of [{ name: 'Chorus' }, { colr: 2 }, { vald: false }]) {
    assert.equal(snapshotMetadataChanged({ snps: [{ ...saved.snps[0], ...change }, saved.snps[1]] }, saved), true);
  }
  assert.equal(snapshotMetadataChanged(null, saved), null);
});
test('blank preset preserves the native payload types and contains only empty routing', () => {
  const bytes = Buffer.from(blank.data, 'base64');
  assert.equal(createHash('sha256').update(bytes).digest('hex'), blank.sha256);
  assert.equal(bytes.subarray(0, 8).toString(), '_sbepgsm');
  const raw = decode(bytes.subarray(8)) as Record<number, any>;
  const key = (name: string) => Buffer.from(name).readUInt32BE(0);
  const flows = raw[key('sfg_')][key('flow')];
  assert.equal(flows.length, 2);
  for (const flow of flows) assert.deepEqual(flow[key('blks')].filter((_: unknown, index: number) => index % 2 === 0), [0, 13, 14, 27]);
  const entity = raw[key('cg__')][key('entt')];
  for (const collection of ['cmnd', 'ctrl', 'srcs', 'trgs']) assert.deepEqual(entity[key(collection)], []);
  const notes = raw[key('pm__')].find((p: Record<number, unknown>) => p[key('key_')] === 'preset.meta.info');
  assert.equal(notes[key('val_')], '');
});
