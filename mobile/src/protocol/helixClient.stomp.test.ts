import assert from 'node:assert/strict';
import Module from 'node:module';
import test from 'node:test';
import { Buffer } from 'buffer';
import { encode } from '@msgpack/msgpack';
import { buildPropertyBlob } from './propertyBlob';
import { readStompCommands } from './stompCommands';

// Keep native sockets unavailable: these tests exercise the real client with an in-memory peer.
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

function fixture() {
  const command = (cid_: number) => ({
    cid_, type: 6, func: 1, pvlb: 1, pvla: 0, behv: 0, dlay: 0, thrs: 0, goid: 0,
    trig: 1, pvlc: 16, pvlg: 119, pvlh: 73, togl: false, curv: 5,
    ...Object.fromEntries('abcdefghijkl'.split('').map(suffix => [`psp${suffix}`, false])),
  });
  return { cg__: { asnp: 0, entt: {
    srcs: [{ id__: 1, type: 1, ctxt: 2, locl: 25, byps: false, mtyp: 0, mtms: 0, cnt1: 0, cnt2: 0, cnt3: 0, cmds: [1, 2] }],
    cmnd: [command(1), command(2)],
  } } };
}

function setup() {
  const client = new Client('test.invalid');
  const internal = client as any;
  const state = fixture();
  const plan = readStompCommands(state, 'b', 1).plan!;
  client.getActivePresetContentId = async options => { assert.deepEqual(options, { commandConnectionOnly: true }); return 933; };
  client.getEditBufferState = async options => { assert.deepEqual(options, { fresh: true }); return state; };
  return { client, internal, state, plan };
}

test('execution notifications and status responses cannot consume the command acknowledgement', async () => {
  const { client, internal, plan } = setup();
  const sent: string[] = [];
  internal.sendOsc = (address: string, _types: string, args: number[]) => {
    sent.push(address);
    const [requestId, commandId] = args;
    internal.dispatchEvent({ addr: '/executeCommand', typetags: 'iiii', vals: [requestId, 99, commandId, 0] });
    internal.dispatchEvent({ addr: '/executeCommand', typetags: 'iii', vals: [requestId, commandId, 0] });
    internal.dispatchEvent({ addr: '/executeCommand', typetags: 'iiii', vals: [requestId, 99, commandId, 0] }, true);
    internal.dispatchEvent({ addr: '/status', typetags: 'iii', vals: [requestId, 0, 0] }, true);
    internal.dispatchEvent({ addr: '/error', typetags: 'ii', vals: [requestId, -1] });
    assert.equal(internal.pendingResponses.has(`/executeCommand:${requestId}`), true);
    internal.dispatchEvent({ addr: '/executeCommand', typetags: 'iii', vals: [requestId, commandId, 0] }, true);
  };
  assert.equal((await client.runStompCommands(933, plan)).status, 'complete');
  assert.deepEqual(sent, ['/ExecuteCommand', '/ExecuteCommand']);
});

test('overlapping groups stop synchronously without sending and the lock releases afterwards', async () => {
  const { client, internal, plan } = setup();
  let release!: (value: number) => void;
  client.getActivePresetContentId = () => new Promise(resolve => { release = resolve; });
  internal.sendOsc = () => { throw new Error('No commands should be sent'); };
  const running = client.runStompCommands(933, plan);
  assert.deepEqual(await client.runStompCommands(933, plan), {
    status: 'stopped', confirmed: 0, attempted: 0, total: 2,
    message: 'Another command group is running. No commands were sent.',
  });
  client.close();
  release(933);
  assert.equal((await running).attempted, 0);
  assert.equal(internal.runningStompCommands, false);
});

test('reconnecting the same client cancels a group before any execution', async () => {
  const { client, internal, plan } = setup();
  internal.openConnection = async () => {};
  client.getActivePresetContentId = async () => { await client.connect(); return 933; };
  internal.sendOsc = () => { throw new Error('No commands should be sent'); };
  assert.equal((await client.runStompCommands(933, plan)).attempted, 0);
});

test('snapshot and command configuration notifications cancel the remaining group', async () => {
  for (const address of ['/activateSnapshot', '/setCommandParamVal', '/attachCommand', '/setSourceEnable', '/setComponentContext']) {
    const { client, internal, plan } = setup();
    let sends = 0;
    internal.sendOsc = (_address: string, _types: string, args: number[]) => {
      sends += 1;
      internal.dispatchEvent({ addr: address, typetags: '', vals: [] });
      internal.dispatchEvent({ addr: '/executeCommand', typetags: 'iii', vals: [args[0], args[1], 0] }, true);
    };
    const result = await client.runStompCommands(933, plan);
    assert.equal(result.status, 'stopped', address);
    assert.equal(result.confirmed, 1, address);
    assert.equal(sends, 1, address);
  }
});

test('fresh edit-buffer reads reject malformed replies rather than using a recent cached state', async () => {
  const client = new Client('test.invalid');
  const internal = client as any;
  const state = fixture();
  internal.request = async () => [10, Buffer.from([0xc1])];
  internal.lastEditBufferResponse = { vals: [9, Buffer.from(encode(state))], receivedAt: Date.now() };
  assert.deepEqual(await client.getEditBufferState(), state);
  await assert.rejects(client.getEditBufferState({ fresh: true }), /decode failed/);
});

test('fresh edit-buffer reads require command-connection replies even when notification counters collide', async () => {
  const client = new Client('test.invalid');
  const internal = client as any;
  const state = fixture();
  const stale = fixture();
  stale.cg__.asnp = 1;
  internal.sendOsc = (_address: string, _types: string, args: number[]) => {
    const requestId = args[0];
    const notification = { typetags: 'ib', vals: [requestId, Buffer.from(encode(stale))] };
    internal.dispatchEvent({ addr: '/getEditBufferState', ...notification });
    assert.equal(internal.pendingResponses.has(`/getEditBufferState:${requestId}`), true);
    internal.dispatchEvent({ addr: '/editBufferState', ...notification });
    assert.equal(internal.pendingResponses.has(`/getEditBufferState:${requestId}`), true);
    internal.dispatchEvent({ addr: '/error', typetags: 'ii', vals: [requestId, -1] });
    assert.equal(internal.pendingResponses.has(`/getEditBufferState:${requestId}`), true);
    internal.dispatchEvent({ addr: '/getEditBufferState', typetags: 'ib', vals: [requestId, Buffer.from(encode(state))] }, true);
  };
  assert.deepEqual(await client.getEditBufferState({ fresh: true }), state);
  assert.equal(internal.commandConnectionResponses.size, 0);
});

test('ordinary edit-buffer reads retain notification reply compatibility', async () => {
  const client = new Client('test.invalid');
  const internal = client as any;
  const state = fixture();
  internal.sendOsc = (_address: string, _types: string, args: number[]) => {
    internal.dispatchEvent({ addr: '/getEditBufferState', typetags: 'ib', vals: [args[0], Buffer.from(encode(state))] });
  };
  assert.deepEqual(await client.getEditBufferState(), state);
});


test('guarded active preset reads ignore notification replies and errors with colliding counters', async () => {
  const client = new Client('test.invalid');
  const internal = client as any;
  internal.sendOsc = (_address: string, _types: string, args: number[]) => {
    const requestId = args[0];
    internal.dispatchEvent({ addr: '/getPropertyValue', typetags: 'ib',
      vals: [requestId, buildPropertyBlob('server.active.preset.id', 123, 'i')] });
    internal.dispatchEvent({ addr: '/error', typetags: 'ii', vals: [requestId, -1] });
    assert.equal(internal.pendingResponses.has(`/getPropertyValue:${requestId}`), true);
    internal.dispatchEvent({ addr: '/getPropertyValue', typetags: 'ib',
      vals: [requestId, buildPropertyBlob('server.active.preset.id', 933, 'i')] }, true);
  };
  assert.equal(await client.getActivePresetContentId({ commandConnectionOnly: true }), 933);
  assert.equal(internal.commandConnectionResponses.size, 0);
});
