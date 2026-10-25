import assert from 'node:assert/strict';
import test from 'node:test';
import { executeStompCommands, readStompCommands, type StompCommandTransport, type StompCommandPlan } from './stompCommands';

// Command fields copied from the verified spare preset readback; entity order differs from slot order.
const command = (cid_: number) => ({
  cid_, type: 6, func: 1, pvlb: 1, pvla: 0, behv: 0, dlay: 0, thrs: 0, goid: 0,
  trig: 1, pvlc: cid_ === 1 ? 16 : 15, pvlg: cid_ === 1 ? 119 : 118,
  pvlh: cid_ === 1 ? 73 : 74, togl: false, curv: 5,
  tid_: cid_ + 29, pvld: -1, pvle: -1, pvlf: -1, pvli: 0, pvlj: 100, pvlk: 1, pvll: 0,
  ...Object.fromEntries('abcdefghijkl'.split('').map(suffix => [`psp${suffix}`, false])),
});
const fixture = () => ({ wrapped: { cg__: {
  asnp: 2,
  entt: {
    srcs: [{ id__: 1, type: 1, ctxt: 2, locl: 25, byps: false, mtyp: 0, mtms: 0, cnt1: 0, cnt2: 0, cnt3: 0, cmds: [1, 2] }],
    cmnd: [command(2), command(1)],
    ctrl: [{ cid_: 1, trig: 1, type: 1 }],
  },
} } });
type State = ReturnType<typeof fixture>;
const graph = (state: State) => state.wrapped.cg__;
const planFor = (state: State): StompCommandPlan => {
  const result = readStompCommands(state, 'b', 1);
  assert.ok(result.plan, result.reason ?? 'Expected an eligible plan');
  return result.plan;
};

function transport(state = fixture()) {
  const sends: { address: string; types: string; args: number[] }[] = [];
  const reads: string[] = [];
  const io: StompCommandTransport = {
    activeId: async () => { reads.push('active'); return 933; },
    state: async () => { reads.push('state'); return state; },
    isCurrent: () => true,
    send: async request => { sends.push(request); return [sends.length, request.args[0], 0]; },
  };
  return { state, io, sends, reads };
}

test('reads stored command slots in order despite entity order and mixed controllers, without mutation', () => {
  const state = fixture();
  const before = structuredClone(state);
  const plan = planFor(state);
  assert.deepEqual(plan.commandIds, [1, 2]);
  assert.equal(plan.snapshotIndex, 2);
  assert.equal(plan.sourceId, 1);
  assert.deepEqual(state, before);
  assert.equal(readStompCommands(state, 'a', 1).plan, null);
  for (const number of [-1, 0, 6, 12, 1.5, NaN]) assert.equal(readStompCommands(state, 'b', number).plan, null);
  for (const number of [1, 2, 3, 4, 5, 7, 8, 9, 10, 11]) {
    graph(state).entt.srcs[0].locl = 24 + number;
    assert.ok(readStompCommands(state, 'b', number).plan);
  }
});

test('accepts one command with either empty slot, and identifies no commands', () => {
  for (const cmds of [[1, -1], [-1, 2]]) {
    const state = fixture();
    graph(state).entt.srcs[0].cmds = cmds;
    assert.deepEqual(planFor(state).commandIds, cmds.filter(id => id !== -1));
  }
  const state = fixture();
  graph(state).entt.srcs[0].cmds = [-1, -1];
  assert.match(readStompCommands(state, 'b', 1).reason!, /No commands/);
});

test('rejects malformed, ambiguous and invalid source assignments', () => {
  const mutations: ((value: any) => void)[] = [
    value => { value.entt = null; },
    value => { value.entt.srcs = []; },
    value => { value.entt.srcs.push({ ...value.entt.srcs[0] }); },
    value => { value.entt.srcs.push({ ...value.entt.srcs[0], locl: 26 }); },
    value => { value.entt.srcs.push({ ...value.entt.srcs[0], id__: 2, locl: 26, cmds: [-1, 2] }); },
    ...['id__', 'type', 'ctxt', 'locl', 'mtyp', 'mtms', 'cnt1', 'cnt2', 'cnt3'].map(field =>
      (value: any) => { value.entt.srcs[0][field] = -1; }),
    ...[null, [], [1], [1, 2, -1], [1, 1], [1, 0], [1, -2], [1, '2'], [1, 1.5], [1, NaN], new Array(2)].map(cmds =>
      (value: any) => { value.entt.srcs[0].cmds = cmds; }),
    ...[undefined, -1, 8, 2.5, '2', NaN].map(snapshot => (value: any) => { value.asnp = snapshot; }),
  ];
  for (const mutate of mutations) {
    const state = fixture();
    mutate(graph(state));
    assert.equal(readStompCommands(state, 'b', 1).plan, null);
  }
  assert.equal(readStompCommands(null, 'b', 1).plan, null);
});

test('current source bypass state does not disable commands or invalidate their configuration', () => {
  const state = fixture();
  const before = planFor(state);
  graph(state).entt.srcs[0].byps = true;
  assert.equal(planFor(state).fingerprint, before.fingerprint);
});

test('rejects entire groups with missing, duplicate or unsupported command assignments', () => {
  const mutations: ((value: any) => void)[] = [
    value => { value.cmnd = null; },
    value => { value.cmnd.pop(); },
    value => { value.cmnd.push({ ...value.cmnd[0] }); },
    ...['type', 'func', 'pvlb', 'pvla', 'behv', 'dlay', 'thrs', 'goid', 'trig', 'curv'].map(field =>
      (value: any) => { value.cmnd[0][field] = 42; }),
    ...'abcdefghijkl'.split('').flatMap(suffix => [true, undefined, 0].map(flag =>
      (value: any) => { value.cmnd[0][`psp${suffix}`] = flag; })),
    ...[0, 17, 1.5, '16', null].map(channel => (value: any) => { value.cmnd[0].pvlc = channel; }),
    ...['pvlg', 'pvlh'].flatMap(field => [-1, 128, 1.5, '73', NaN].map(setting =>
      (value: any) => { value.cmnd[0][field] = setting; })),
  ];
  for (const mutate of mutations) {
    const state = fixture();
    mutate(graph(state).entt);
    assert.equal(readStompCommands(state, 'b', 1).plan, null);
  }
});

test('fingerprints ignore runtime toggles and key order, but include source, slot order, command settings and snapshot', () => {
  const state = fixture();
  const expected = planFor(state);
  graph(state).entt.cmnd[0].togl = true;
  graph(state).entt.cmnd[1] = Object.fromEntries(Object.entries(graph(state).entt.cmnd[1]).reverse()) as ReturnType<typeof command>;
  assert.equal(planFor(state).fingerprint, expected.fingerprint);
  const mutations: ((state: State) => void)[] = [
    state => { graph(state).asnp = 3; },
    state => { graph(state).entt.srcs[0].cmds.reverse(); },
    state => { graph(state).entt.srcs[0].id__ = 2; graph(state).entt.cmnd.forEach(cmd => { cmd.trig = 2; }); },
    state => { graph(state).entt.cmnd[0].pvlh = 75; },
  ];
  for (const mutate of mutations) {
    const changed = fixture();
    mutate(changed);
    assert.notEqual(planFor(changed).fingerprint, expected.fingerprint);
  }
});

test('executes exactly once in slot order, checks twice per send, and accepts runtime toggle changes', async () => {
  const { state, io, sends, reads } = transport();
  const expected = planFor(state);
  const original = io.send;
  io.send = async request => {
    const reply = await original(request);
    graph(state).entt.cmnd.forEach(cmd => { cmd.togl = !cmd.togl; });
    return reply;
  };
  const result = await executeStompCommands(io, 933, expected);
  assert.deepEqual(result, { status: 'complete', confirmed: 2, attempted: 2, total: 2, message: '2 of 2 commands confirmed.' });
  assert.deepEqual(sends, [1, 2].map(id => ({ address: '/ExecuteCommand', types: 'i', args: [id] })));
  assert.deepEqual(reads, ['active', 'state', 'active', 'active', 'state', 'active']);
});

test('stale preset, snapshot and configuration stop before first or second send', async () => {
  for (const afterFirst of [false, true]) {
    for (const stale of ['preset', 'snapshot', 'config', 'slots', 'timing', 'source']) {
      const { state, io, sends } = transport();
      const expected = planFor(state);
      let currentId = 933;
      io.activeId = async () => currentId;
      const mutate = () => {
        if (stale === 'preset') currentId = 934;
        if (stale === 'snapshot') graph(state).asnp = 3;
        if (stale === 'config') graph(state).entt.cmnd[0].pvlh = 75;
        if (stale === 'slots') graph(state).entt.srcs[0].cmds.reverse();
        if (stale === 'timing') graph(state).entt.srcs[0].mtms = 1;
        if (stale === 'source') { graph(state).entt.srcs[0].id__ = 2; graph(state).entt.cmnd.forEach(cmd => { cmd.trig = 2; }); }
      };
      if (afterFirst) {
        const original = io.send;
        io.send = async request => { const reply = await original(request); mutate(); return reply; };
      } else mutate();
      const result = await executeStompCommands(io, 933, expected);
      assert.equal(result.status, 'stopped', stale);
      assert.equal(result.confirmed, afterFirst ? 1 : 0, stale);
      assert.equal(result.attempted, afterFirst ? 1 : 0, stale);
      assert.equal(sends.length, afterFirst ? 1 : 0, stale);
      assert.match(result.message, new RegExp(`${afterFirst ? 1 : 2} commands? remain`));
    }
  }
});

test('guards disconnects at every read boundary and immediately before send', async () => {
  for (const disconnectCheck of [1, 2, 3, 4, 5, 6, 7, 8]) {
    const { state, io, sends } = transport();
    let checks = 0;
    io.isCurrent = () => ++checks !== disconnectCheck;
    const result = await executeStompCommands(io, 933, planFor(state));
    assert.equal(result.status, 'stopped');
    assert.equal(sends.length, disconnectCheck <= 4 ? 0 : 1);
    assert.equal(result.confirmed, sends.length);
    assert.equal(result.attempted, sends.length);
  }
  const { state, io, sends } = transport();
  let activeReads = 0;
  io.activeId = async () => ++activeReads === 2 ? null : 933;
  assert.equal((await executeStompCommands(io, 933, planFor(state))).status, 'stopped');
  assert.equal(sends.length, 0);
});

test('missing, malformed, nonzero and thrown acknowledgements stop without retries', async () => {
  const replies = [undefined, null, [], [1, 1], [1, 1, 0, 0], [0, 1, 0], [-1, 1, 0], [1.5, 1, 0],
    ['1', 1, 0], [1, '1', 0], [1, 1, '0'], [1, 1, false], [1, 99, 0], [1, 1, 1], [1, 1, -1], new Error('timeout')];
  for (const afterFirst of [false, true]) {
    for (const reply of replies) {
      const { state, io, sends } = transport();
      const original = io.send;
      io.send = async request => {
        const success = await original(request);
        if (afterFirst && sends.length === 1) return success;
        if (reply instanceof Error) throw reply;
        return reply;
      };
      const result = await executeStompCommands(io, 933, planFor(state));
      assert.equal(result.status, 'unconfirmed');
      assert.equal(result.confirmed, afterFirst ? 1 : 0);
      assert.equal(result.attempted, afterFirst ? 2 : 1);
      assert.equal(result.total, 2);
      assert.equal(sends.length, result.attempted);
      assert.match(result.message, /1 command may have run without confirmation/);
      assert.match(result.message, afterFirst ? /0 commands remain unsent/ : /1 command remains unsent/);
      assert.match(result.message, /Nothing was retried/);
      assert.doesNotMatch(result.message, /timeout|ExecuteCommand|933/);
    }
  }
});

test('read errors are stopped with no uncertain send and caller plan changes cannot alter execution', async () => {
  const { state, io, sends } = transport();
  io.state = async () => { throw new Error('private details'); };
  assert.deepEqual({ ...(await executeStompCommands(io, 933, planFor(state))), message: '' },
    { status: 'stopped', confirmed: 0, attempted: 0, total: 2, message: '' });
  assert.equal(sends.length, 0);
  const next = transport();
  const plan = planFor(next.state);
  next.io.activeId = async () => { plan.commandIds.reverse(); plan.snapshotIndex = 7; return 933; };
  assert.equal((await executeStompCommands(next.io, 933, plan)).status, 'complete');
  assert.deepEqual(next.sends.map(request => request.args[0]), [1, 2]);
});

test('a late acknowledgement after a timeout cannot resume a stopped run', async () => {
  const { state, io, sends } = transport();
  let lateReply: (value: unknown) => void = () => {};
  io.send = request => {
    sends.push(request);
    return new Promise((resolve, reject) => {
      lateReply = resolve;
      reject(new Error('timeout'));
    });
  };
  const result = await executeStompCommands(io, 933, planFor(state));
  assert.equal(result.status, 'unconfirmed');
  assert.equal(result.confirmed, 0);
  assert.equal(result.attempted, 1);
  lateReply([1, 1, 0]);
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(sends.length, 1);
  assert.equal(result.status, 'unconfirmed');
  assert.equal(result.confirmed, 0);
});
