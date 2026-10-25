import assert from 'node:assert/strict';
import test from 'node:test';
import { Buffer } from 'buffer';
import blank from '../data/blankPreset.json';
import { duplicatePreset, type PresetDuplicationTransport } from './presetDuplication';
import { PresetCreationError } from './presetCreation';
const bytes = Buffer.from(blank.data, 'base64');
const source = { cid_: 5, ccid: -2, posi: 0, name: 'Original', type: 2 };
const copy = { cid_: 90, ccid: -2, posi: 8, name: 'Copy', type: 2 };
function transport(overrides: Partial<PresetDuplicationTransport> = {}): PresetDuplicationTransport {
  return { reference: async id => id === 5 ? source : id === 6 ? { cid_: 6, type: 1, altp: 2, rcid: 5 } : copy,
    data: async () => bytes, slots: async () => [{ ccid: -2, posi: 8 }], allocate: async () => 90, write: async () => {}, ...overrides };
}
test('a setlist entry resolves to saved native contents and creates an independent preset', async () => {
  const reads: number[] = []; const writes: number[] = [];
  const result = await duplicatePreset(transport({ data: async id => { reads.push(id); return bytes; },
    write: async (id, data) => { writes.push(id); assert.ok(data.equals(bytes)); } }), 6, 8, ' Copy ');
  assert.deepEqual(reads, [5, 90]); assert.deepEqual(writes, [90]); assert.equal(result.loaded, false);
});
test('invalid sources and unreadable saved contents never allocate', async () => {
  let allocations = 0;
  const allocate = async () => { allocations++; return 90; };
  for (const reference of [null, { ...source, type: 1003 }, { cid_: 5, type: 1, altp: 2 }, { ...source, cid_: 7 }]) {
    await assert.rejects(duplicatePreset(transport({ allocate, reference: async () => reference }), 5, 8, 'Copy'));
  }
  for (const data of [null, Buffer.alloc(0), Buffer.from('error blob')]) await assert.rejects(duplicatePreset(transport({ allocate, data: async () => data }), 5, 8, 'Copy'));
  assert.equal(allocations, 0);
});
test('an occupied or unknown destination is rejected without writing', async () => {
  let allocations = 0;
  for (const slots of [null, [], [copy], [{ ccid: -1, posi: 8 }]]) await assert.rejects(duplicatePreset(transport({ slots: async () => slots, allocate: async () => { allocations++; return 90; } }), 5, 8, 'Copy'));
  assert.equal(allocations, 0);
});
test('source id or wrong allocated location can never be overwritten', async () => {
  let writes = 0;
  for (const overrides of [{ allocate: async () => 5 }, { reference: async (id: number) => id === 5 ? source : { ...copy, posi: 9 } },
    { reference: async (id: number) => id === 5 ? source : { ...copy, rcid: 5 } }]) {
    await assert.rejects(duplicatePreset(transport({ ...overrides, write: async () => { writes++; } }), 5, 8, 'Copy'));
  }
  assert.equal(writes, 0);
});
test('a failed write or verification reports the allocated slot and never retries', async () => {
  for (const failure of ['write', 'read']) {
    let writes = 0;
    await assert.rejects(duplicatePreset(transport({ write: async () => { writes++; if (failure === 'write') throw new Error('Disconnected'); },
      data: async id => id === 5 ? bytes : Buffer.from('wrong') }), 5, 8, 'Copy'), error => {
      assert.ok(error instanceof PresetCreationError); assert.equal(error.contentId, 90); assert.equal(error.position, 8); return true;
    }); assert.equal(writes, 1);
  }
});
