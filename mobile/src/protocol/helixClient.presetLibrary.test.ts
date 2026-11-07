import assert from 'node:assert/strict';
import Module from 'node:module';
import test from 'node:test';
import { Buffer } from 'buffer';
import { encode } from '@msgpack/msgpack';

const moduleLoader = Module as any;
const originalLoad = moduleLoader._load;
let Client: typeof import('./helixClient').HelixClient;
try {
  moduleLoader._load = function (name: string, ...args: any[]) {
    if (name === 'react-native-tcp-socket') return { createConnection: () => { throw new Error('Native sockets are disabled in tests'); } };
    if (name === 'react-native') return { NativeModules: {}, NativeEventEmitter: class {} };
    return originalLoad.call(this, name, ...args);
  };
  Client = require('./helixClient').HelixClient;
} finally {
  moduleLoader._load = originalLoad;
}

// Captured factory-library records use a record-count array header followed by
// four separate fields; they are not ordinary MessagePack arrays of objects.
function libraryBlob(records: Array<{ cid_: number; name: string }>) {
  return Buffer.concat([Buffer.from([0xdc, records.length >> 8, records.length & 255]),
    ...records.flatMap(record => [record.cid_, 6, record.name, 'ALL'].map(value => Buffer.from(encode(value))))]);
}

function reference(id: number, position: number) {
  return { cid_: id, ccid: -1, cctp: 1000, type: 2, name: `Factory ${id}`, posi: position, lock: true, blck: 6 };
}

test('factory browsing uses library selector zero and preserves actual slot and lock metadata', async () => {
  const client = new Client('test.invalid');
  const calls: unknown[][] = [];
  (client as any).request = async (address: string, types: string, args: unknown[], reply: string) => {
    calls.push([address, types, args, reply]);
    if (address === '/LibraryContentGet') return [1, 0, libraryBlob([{ cid_: 151, name: 'First' }, { cid_: 152, name: 'Second' }])];
    if (address === '/GetContentRef') return [2, Buffer.from(encode(reference(args[0] as number, args[0] === 151 ? 8 : 2)))];
    throw new Error(`Unexpected request ${address}`);
  };
  assert.deepEqual(await client.getContainerContents(-1, undefined, true), [reference(152, 2), reference(151, 8)]);
  assert.deepEqual(calls[0], ['/LibraryContentGet', 'i', [0], '/getPresetLibraryContent']);
  assert.deepEqual(calls.slice(1).map(call => call[0]), ['/GetContentRef', '/GetContentRef']);
});

test('factory SKU filters remain explicit and user/setlist requests retain the container route', async () => {
  const client = new Client('test.invalid');
  const calls: unknown[][] = [];
  (client as any).request = async (address: string, types: string, args: unknown[]) => {
    calls.push([address, types, args]);
    return address === '/LibraryContentGetWithSku' ? [1, 0, libraryBlob([])] : [1, Buffer.from(encode([]))];
  };
  assert.deepEqual(await client.getContainerContents(-1, 'stadium', true), []);
  assert.deepEqual(await client.getContainerContents(-2, undefined, true), []);
  assert.deepEqual(await client.getContainerContents(100, undefined, true), []);
  assert.deepEqual(calls, [
    ['/LibraryContentGetWithSku', 'is', [0, 'stadium']],
    ['/GetContainerContents', 'i', [-2]],
    ['/GetContainerContents', 'i', [100]],
  ]);
});

test('unreadable factory catalogs and incomplete references fail instead of masquerading as empty libraries', async () => {
  const client = new Client('test.invalid');
  (client as any).request = async () => null;
  await assert.rejects(client.getContainerContents(-1, undefined, true), /Factory presets could not be read/);
  for (const invalid of [null, reference(999, 0), { ...reference(151, 0), ccid: -2 }, { ...reference(151, 0), posi: undefined }]) {
    (client as any).request = async (address: string) => address === '/LibraryContentGet'
      ? [1, 0, libraryBlob([{ cid_: 151, name: 'First' }])]
      : [2, Buffer.from(encode(invalid))];
    await assert.rejects(client.getContainerContents(-1, undefined, true), /Factory preset details could not be read/);
  }
});

test('factory reference hydration bounds simultaneous device requests', async () => {
  const client = new Client('test.invalid');
  const records = Array.from({ length: 19 }, (_, index) => ({ cid_: 151 + index, name: `Factory ${index}` }));
  let pending = 0, maximum = 0;
  client.getLibraryContent = async () => records.map(record => ({ ...record, type: 6, sku: 'ALL' }));
  client.getContentRef = async id => {
    pending++; maximum = Math.max(maximum, pending);
    await new Promise(resolve => setImmediate(resolve));
    pending--;
    return reference(id, id - 151);
  };
  assert.equal((await client.getContainerContents(-1, undefined, true)).length, records.length);
  assert.equal(maximum, 8);
});
