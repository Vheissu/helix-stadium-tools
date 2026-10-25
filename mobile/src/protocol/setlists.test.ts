import assert from 'node:assert/strict';
import test from 'node:test';
import { decode } from '@msgpack/msgpack';
import { Buffer } from 'buffer';
import {
  createSetlist, createdSetlistId, deleteSetlist, duplicateSetlist, moveSetlist, parseSetlistEntries, parseSetlists,
  renameSetlist, requireLibraryAcknowledgement, setlistCreationCommand, SetlistOperationError, validateSetlistName,
  type SetlistEntry, type SetlistReference, type SetlistTransport,
} from './setlists';

const reference = (id = 100, position = 0, name = 'Friday'): SetlistReference => ({ cid_: id, ccid: -5, type: 1003, posi: position, name, boun: 128 });
const entry = (id: number, position: number, preset = 20, container = 100): SetlistEntry => ({ cid_: id, ccid: container, type: 1, posi: position, rcid: preset });
const accepted = [1, 0, 1];

function fixture(initial = [reference()]) {
  let directory = structuredClone(initial);
  const contents = new Map<number, SetlistEntry[]>(initial.map(item => [item.cid_, []]));
  const calls: Array<{ action: string; args: unknown[] }> = [];
  let nextId = 500;
  const io: SetlistTransport = {
    directory: async () => structuredClone(directory),
    entries: async id => structuredClone(contents.get(id) ?? []),
    reference: async id => structuredClone(directory.find(item => item.cid_ === id) ?? { cid_: id, ccid: -2, type: 2, name: 'Preset' }),
    activeReference: async () => ({ cid_: 20, ccid: -2, type: 2 }),
    allocate: async (position, name) => {
      calls.push({ action: 'create', args: [position, name] });
      const item = reference(nextId++, position, name);
      directory.push(item); contents.set(item.cid_, []);
      return [1, item.cid_, 1];
    },
    add: async (id, presets, position) => {
      calls.push({ action: 'add', args: [id, presets, position] });
      const items = contents.get(id)!;
      items.push(...presets.map((preset, index) => entry(nextId++, position + index, preset, id)));
      return accepted;
    },
    remove: async (parent, ids) => {
      calls.push({ action: 'remove', args: [parent, ids] });
      directory = directory.filter(item => !ids.includes(item.cid_));
      return accepted;
    },
    rename: async (id, name) => {
      calls.push({ action: 'rename', args: [id, name] });
      directory.find(item => item.cid_ === id)!.name = name;
      return accepted;
    },
    reorder: async (parent, ids, position) => {
      calls.push({ action: 'reorder', args: [parent, ids, position] });
      const from = directory.findIndex(item => item.cid_ === ids[0]);
      const [moving] = directory.splice(from, 1);
      directory.splice(position > from ? position - 1 : position, 0, moving);
      directory.forEach((item, posi) => { item.posi = posi; });
      return accepted;
    },
  };
  return { io, contents, calls };
}

test('setlist names are trimmed and reject empty, long and control-character names', () => {
  assert.equal(validateSetlistName('  Friday night  '), 'Friday night');
  assert.equal(validateSetlistName('🎸'.repeat(32)), '🎸'.repeat(32));
  for (const name of ['', '  ', 'a'.repeat(33), 'Live\nSet', 'Live\u0000Set', 'Live\u007fSet']) assert.throws(() => validateSetlistName(name));
});

test('creation addresses the setlist directory and setlist container type, with string attrs', () => {
  const command = setlistCreationCommand(4, ' Friday ');
  assert.equal(command.address, '/CreateContent');
  assert.equal(command.types, 'iiib');
  assert.deepEqual(command.args.slice(0, 3), [-5, 4, 1003]);
  assert.deepEqual(decode(command.args[3] as Buffer), { name: 'Friday' });
  for (const position of [-1, 122, 1.1, NaN, Infinity]) assert.throws(() => setlistCreationCommand(position, 'Friday'));
});

test('creation and ordinary library acknowledgements have different status meanings', () => {
  assert.equal(createdSetlistId([15, 900, 0]), 900);
  requireLibraryAcknowledgement([15, 0, 0]);
  for (const value of [null, [], [1, 0], [1, 0, -1], [1, -4, 1], ['1', 0, 1], [1, 0, '1'], [1, 900, 1]]) {
    assert.throws(() => requireLibraryAcknowledgement(value));
  }
  for (const value of [null, [], [1, 0, 1], [1, -4, 1], [1, 900, -1], [1, 900.5, 1], [1, 0x80000000, 1], ['1', 900, 1]]) {
    assert.throws(() => createdSetlistId(value));
  }
});

test('directory reads reject wrong parents, alias refs, duplicate identities and invalid positions', () => {
  assert.deepEqual(parseSetlists([]), []);
  assert.deepEqual(parseSetlists([reference(2, 1), reference(1, 0)]).map(item => item.cid_), [1, 2]);
  for (const value of [null, {}, [null], [{ ...reference(), ccid: -2 }], [{ ...reference(), type: 1 }],
    [{ ...reference(), posi: 122 }], [{ ...reference(), cid_: 0 }], [reference(), reference()],
    [reference(), reference(101, 0)], [{ ...reference(), name: null }]]) assert.throws(() => parseSetlists(value));
});

test('entry reads retain gaps and repeated backing presets but reject broken references', () => {
  const entries = [entry(1, 0), { posi: 1 }, entry(2, 2), { posi: 127 }];
  assert.deepEqual(parseSetlistEntries(entries, 100).map(item => [item.posi, item.rcid]), [[0, 20], [2, 20]]);
  for (const value of [null, [entry(1, 128)], [{ ...entry(1, 0), rcid: undefined }],
    [entry(1, 0, 20, 101)], [entry(1, 0), entry(1, 1)], [entry(1, 0), { posi: 0 }], [{ posi: 0, cid_: -1 }]]) {
    assert.throws(() => parseSetlistEntries(value, 100));
  }
});

test('an empty library can create its first setlist without loading or changing a preset', async () => {
  const f = fixture([]);
  const result = await createSetlist(f.io, ' New show ');
  assert.equal(result.name, 'New show'); assert.equal(result.posi, 0);
  assert.deepEqual(f.calls, [{ action: 'create', args: [0, 'New show'] }]);
});

test('new setlists append after the latest directory and verify the allocated result', async () => {
  const f = fixture([reference(100, 0), reference(101, 1)]);
  const result = await createSetlist(f.io, 'Saturday');
  assert.equal(result.cid_, 500); assert.equal(result.posi, 2);
  assert.deepEqual(f.calls[0], { action: 'create', args: [2, 'Saturday'] });
});

test('full or unreadable directories cannot allocate a setlist', async () => {
  for (const value of [null, Array.from({ length: 122 }, (_, index) => reference(index + 1, index)), [reference(100, 121)]]) {
    const f = fixture(); f.io.directory = async () => value;
    await assert.rejects(createSetlist(f.io, 'New'));
    assert.equal(f.calls.length, 0);
  }
});

test('ambiguous creation replies are never retried and tell the user to check for the new name', async () => {
  const f = fixture(); let allocations = 0;
  f.io.allocate = async () => { allocations++; throw new Error('Disconnected'); };
  await assert.rejects(createSetlist(f.io, 'Friday copy'), error => {
    assert.ok(error instanceof SetlistOperationError); assert.equal(error.setlistId, null);
    assert.match(error.message, /Friday copy/); return true;
  });
  assert.equal(allocations, 1);
});

test('mismatched new references and unexpected contents never report successful creation', async () => {
  for (const mismatch of ['name', 'parent', 'position', 'bound', 'contents']) {
    const f = fixture();
    if (mismatch === 'contents') f.io.entries = async id => [entry(50, 0, 20, id)];
    else {
      const read = f.io.reference;
      f.io.reference = async id => ({ ...await read(id) as object, ...{
        name: { name: 'Another' }, parent: { ccid: -2 }, position: { posi: 99 }, bound: { boun: 256 },
      }[mismatch] });
    }
    await assert.rejects(createSetlist(f.io, 'Saturday'), SetlistOperationError);
    assert.equal(f.calls.filter(call => call.action === 'create').length, 1);
    assert.equal(f.calls.some(call => call.action === 'remove'), false);
  }
});

test('duplication preserves gaps, repeated presets and the final slot using backing preset ids', async () => {
  const f = fixture();
  f.contents.set(100, [entry(300, 0, 20), entry(301, 1, 20), entry(302, 5, 21), entry(303, 127, 22)]);
  const created = await duplicateSetlist(f.io, 100, 'Copy');
  assert.deepEqual(f.calls.filter(call => call.action === 'add'), [
    { action: 'add', args: [created.cid_, [20, 20], 0] },
    { action: 'add', args: [created.cid_, [21], 5] },
    { action: 'add', args: [created.cid_, [22], 127] },
  ]);
  assert.deepEqual(f.contents.get(created.cid_)?.map(item => [item.posi, item.rcid]), [[0, 20], [1, 20], [5, 21], [127, 22]]);
});

test('empty setlists can be duplicated without adding any presets', async () => {
  const f = fixture(); await duplicateSetlist(f.io, 100, 'Empty copy');
  assert.deepEqual(f.calls.map(call => call.action), ['create']);
});

test('a missing source or backing preset stops duplication before allocation', async () => {
  for (const missing of ['source', 'backing']) {
    const f = fixture(); f.contents.set(100, [entry(300, 0)]);
    if (missing === 'backing') f.io.reference = async () => null;
    await assert.rejects(duplicateSetlist(f.io, missing === 'source' ? 999 : 100, 'Copy'));
    assert.equal(f.calls.length, 0);
  }
});

test('partial duplication keeps its new id and does not delete or retry the copy', async () => {
  const f = fixture(); f.contents.set(100, [entry(300, 0)]);
  let adds = 0; f.io.add = async () => { adds++; return [1, -4, 1]; };
  await assert.rejects(duplicateSetlist(f.io, 100, 'Copy'), error => {
    assert.ok(error instanceof SetlistOperationError); assert.equal(error.setlistId, 500);
    assert.match(error.message, /presets were not fully confirmed/); return true;
  });
  assert.equal(adds, 1); assert.equal(f.calls.some(call => call.action === 'remove'), false);
});

test('acknowledged duplication still fails if the resulting order is wrong', async () => {
  const f = fixture(); f.contents.set(100, [entry(300, 5)]);
  f.io.add = async (id) => { f.contents.set(id, [entry(301, 0, 20, id)]); return accepted; };
  await assert.rejects(duplicateSetlist(f.io, 100, 'Copy'), /order could not be verified/);
});

test('rename requires both acknowledgement and the new directory name', async () => {
  const f = fixture(); await renameSetlist(f.io, 100, ' New name ');
  assert.deepEqual(f.calls, [{ action: 'rename', args: [100, 'New name'] }]);
  f.io.rename = async () => accepted;
  await assert.rejects(renameSetlist(f.io, 100, 'Unchanged'), /not confirmed/);
  f.io.rename = async () => null;
  await assert.rejects(renameSetlist(f.io, 100, 'Unchanged'), /did not confirm/);
});

test('deletion targets only a verified setlist container and confirms it disappeared', async () => {
  const f = fixture(); await deleteSetlist(f.io, 100);
  assert.deepEqual(f.calls, [{ action: 'remove', args: [-5, [100]] }]);
  const stale = fixture(); stale.io.remove = async () => accepted;
  await assert.rejects(deleteSetlist(stale.io, 100), /not confirmed/);
});

test('active setlists, unknown active state and arbitrary ids cannot be deleted', async () => {
  for (const active of [null, {}, { cid_: 300, ccid: 100, type: 1 }]) {
    const f = fixture(); f.io.activeReference = async () => active;
    await assert.rejects(deleteSetlist(f.io, 100)); assert.equal(f.calls.length, 0);
  }
  for (const id of [-5, -2, 0, 20, 999, NaN]) {
    const f = fixture(); await assert.rejects(deleteSetlist(f.io, id)); assert.equal(f.calls.length, 0);
  }
});

test('setlist moves use insertion boundaries and confirm directory order', async () => {
  const f = fixture([reference(100, 0), reference(101, 1), reference(102, 2)]);
  await moveSetlist(f.io, 100, 1);
  assert.deepEqual(f.calls[0], { action: 'reorder', args: [-5, [100], 2] });
  assert.deepEqual(parseSetlists(await f.io.directory()).map(item => item.cid_), [101, 100, 102]);
  await moveSetlist(f.io, 100, -1);
  assert.deepEqual(f.calls[1], { action: 'reorder', args: [-5, [100], 0] });
  await assert.rejects(moveSetlist(f.io, 100, -1), /already at the end/);
  f.io.reorder = async () => accepted;
  await assert.rejects(moveSetlist(f.io, 100, 1), /not confirmed/);
});
