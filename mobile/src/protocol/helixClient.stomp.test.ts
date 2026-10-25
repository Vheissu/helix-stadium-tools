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

// New complete-switch integration cases deliberately retain the original command-only regressions above.
import { readStompSwitch } from './stompSwitch';

function switchSetup() {
  const client = new Client('test.invalid');
  const internal = client as any;
  const state: any = fixture();
  state.cg__.entt.srcs[0].byps = true;
  state.cg__.entt.sm__ = { scid: [1, [11]] };
  state.cg__.entt.ctrl = [{ cid_: 11, trig: 1, tid_: 21, type: 1, min_: false, max_: true, behv: 0, curv: 5, dlay: 0, thrs: 0, goid: 0, togl: false }];
  state.cg__.entt.trgs = [{ id__: 21, eID_: 40, mmid: 33, slot: 0, pid_: 0, type: 1, enty: 2 }];
  state.sfg_ = { flow: [{ blks: [] }, { blks: [12, { id__: 40, cid_: 11, enbl: 1, mdls: [{ id__: 33, parm: [] }] }] }] };
  const parsed = readStompSwitch(state, 'b', 1);
  assert.ok(parsed.plan, parsed.reason ?? 'Expected a complete-switch plan');
  client.getActivePresetContentId = async options => { assert.deepEqual(options, { commandConnectionOnly: true }); return 933; };
  client.getEditBufferState = async options => { assert.deepEqual(options, { fresh: true }); return state; };
  return { client, internal, state, plan: parsed.plan };
}

test('complete-switch client sends normalized native values and ignores colliding notification acknowledgements', async () => {
  const { client, internal, state, plan } = switchSetup();
  const sent: Array<{ address: string; types: string; args: number[] }> = [];
  internal.sendOsc = (address: string, types: string, args: number[]) => {
    sent.push({ address, types, args });
    const [requestId, id, value] = args;
    const expectedAddress = address === '/ControllerValueSet' ? '/status' : '/executeCommand';
    const reply = address === '/ControllerValueSet' ? [requestId, 0, 1] : [requestId, id, 0];
    internal.dispatchEvent({ addr: expectedAddress, typetags: 'iii', vals: reply });
    internal.dispatchEvent({ addr: '/error', typetags: 'ii', vals: [requestId, -1] });
    assert.equal(internal.pendingResponses.has(`${expectedAddress}:${requestId}`), true);
    if (address === '/ControllerValueSet') {
      assert.equal(id, 11); assert.equal(value, 1);
      state.sfg_.flow[1].blks[1].enbl = 0;
      internal.dispatchEvent({ addr: '/setControllerValue', typetags: 'iiif', vals: [requestId, 99, id, value] });
    }
    internal.dispatchEvent({ addr: expectedAddress, typetags: 'iii', vals: reply }, true);
  };
  const result = await client.pressStompSwitch(933, plan);
  assert.equal(result.status, 'complete'); assert.equal(result.confirmed, 3);
  assert.deepEqual(sent.map(call => [call.address, call.types, ...call.args.slice(1)]), [
    ['/ControllerValueSet', 'iif', 11, 1], ['/ExecuteCommand', 'ii', 1], ['/ExecuteCommand', 'ii', 2],
  ]);
  assert.equal(internal.runningStompCommands, false);
});

test('complete switches share a synchronous lock with command-only groups in both directions', async () => {
  for (const first of ['switch', 'commands']) {
    const { client, internal, plan } = switchSetup();
    let release!: (value: number) => void;
    client.getActivePresetContentId = () => new Promise(resolve => { release = resolve; });
    internal.sendOsc = () => { throw Error('No request should be sent'); };
    const running = first === 'switch' ? client.pressStompSwitch(933, plan) : client.runStompCommands(933, readStompCommands(fixture(), 'b', 1).plan!);
    const second = first === 'switch' ? await client.runStompCommands(933, readStompCommands(fixture(), 'b', 1).plan!) : await client.pressStompSwitch(933, plan);
    assert.equal(second.status, 'stopped'); assert.equal(second.attempted, 0);
    client.close(); release(933);
    const result = await running;
    assert.equal(result.attempted, 0); assert.equal(internal.runningStompCommands, false);
  }
});

test('same-instance reconnect cancels complete switch before any controller or command send', async () => {
  const { client, internal, plan } = switchSetup();
  internal.openConnection = async () => {};
  client.getActivePresetContentId = async () => { await client.connect(); return 933; };
  let sends = 0; internal.sendOsc = () => { sends++; };
  const result = await client.pressStompSwitch(933, plan);
  assert.equal(result.status, 'stopped'); assert.equal(result.attempted, 0); assert.equal(sends, 0);
});

test('native success for an ignored controller cannot unlock complete-switch commands', async () => {
  const { client, internal, plan } = switchSetup();
  const sent: string[] = [];
  internal.sendOsc = (address: string, _types: string, args: number[]) => {
    sent.push(address);
    assert.equal(address, '/ControllerValueSet');
    internal.dispatchEvent({ addr: '/status', typetags: 'iii', vals: [args[0], 0, 0] }, true);
  };
  const result = await client.pressStompSwitch(933, plan);
  assert.equal(result.status, 'unconfirmed'); assert.equal(result.confirmed, 0); assert.equal(result.attempted, 1);
  assert.deepEqual(sent, ['/ControllerValueSet']); assert.equal(internal.runningStompCommands, false);
});

test('disconnect after a controller acknowledgement prevents remaining complete-switch commands', async () => {
  const { client, internal, state, plan } = switchSetup();
  const sent: string[] = [];
  internal.sendOsc = (address: string, _types: string, args: number[]) => {
    sent.push(address); assert.equal(address, '/ControllerValueSet');
    state.sfg_.flow[1].blks[1].enbl = 0;
    internal.dispatchEvent({ addr: '/status', typetags: 'iii', vals: [args[0], 0, 1] }, true);
    client.close();
  };
  const result = await client.pressStompSwitch(933, plan);
  assert.equal(result.status, 'unconfirmed'); assert.equal(result.attempted, 1);
  assert.deepEqual(sent, ['/ControllerValueSet']); assert.equal(internal.runningStompCommands, false);
});

test('a final stored Program Change remains complete when its snapshot event invalidates the client guard', async () => {
  const { client, internal, state } = switchSetup();
  state.cg__.entt.srcs[0].cmds = [1, -1];
  state.cg__.entt.cmnd = [{ ...state.cg__.entt.cmnd[0], func: 0, pvlb: 0 }];
  const parsed = readStompSwitch(state, 'b', 1);
  assert.ok(parsed.plan, parsed.reason ?? 'Expected a Program Change plan');
  const sent: string[] = [];
  internal.sendOsc = (address: string, _types: string, args: number[]) => {
    sent.push(address);
    if (address === '/ControllerValueSet') {
      state.sfg_.flow[1].blks[1].enbl = 0;
      internal.dispatchEvent({ addr: '/status', typetags: 'iii', vals: [args[0], 0, 1] }, true);
    } else {
      state.cg__.asnp = 3;
      internal.dispatchEvent({ addr: '/activateSnapshot', typetags: 'iii', vals: [42, args[0], 3] });
      internal.dispatchEvent({ addr: '/executeCommand', typetags: 'iii', vals: [args[0], args[1], 0] }, true);
    }
  };
  const result = await client.pressStompSwitch(933, parsed.plan);
  assert.equal(result.status, 'complete'); assert.equal(result.confirmed, 2);
  assert.deepEqual(sent, ['/ControllerValueSet', '/ExecuteCommand']); assert.equal(internal.runningStompCommands, false);
});
