import assert from 'node:assert/strict';
import test from 'node:test';
import { executeStompSwitch, readStompSwitch, type StompSwitchPlan, type StompSwitchTransport } from './stompSwitch';

type Entity = Record<string, any>;
const source = (id: number, ctxt = 2) => ({ id__: id, type: 1, ctxt, locl: 25, byps: true, mtyp: 0, mtms: 0, cnt1: 0, cnt2: 0, cnt3: 0, cmds: [-1, -1] });
const controller = (id: number, tid: number, low: number | boolean, high: number | boolean) => ({ cid_: id, tid_: tid, trig: 1, type: typeof low === 'boolean' ? 1 : 3, min_: low, max_: high, togl: false, behv: 0, curv: 5, dlay: 0, thrs: 0, goid: 0 });
const command = (id: number) => ({ cid_: id, tid_: id + 100, trig: 1, type: 6, func: 1, pvla: 0, pvlb: 1, pvlc: 1, pvlg: 119, pvlh: 73, behv: 0, curv: 5, dlay: 0, thrs: 0, goid: 0, togl: false, ...Object.fromEntries('abcdefghijkl'.split('').map(letter => [`psp${letter}`, false])) });
function fixture(): Entity {
  return {
    cg__: { asnp: 2, entt: {
      srcs: [source(1), source(9, 1)], sm__: { scid: [1, [11], 9, [19]] },
      ctrl: [controller(11, 21, false, true), { ...controller(19, 29, false, true), trig: 9 }],
      trgs: [{ id__: 21, type: 1, enty: 2, eID_: 40, mmid: 33, slot: 0, pid_: 0 }, { id__: 29, type: 1, enty: 2, eID_: 7, mmid: 34, slot: 0, pid_: 0 }], cmnd: [],
      snps: [{ si__: 7, tamv: [] }, { si__: 2, tamv: [21, false] }],
    } },
    sfg_: { flow: [{ blks: [3, { id__: 7, cid_: 19, enbl: 0, mdls: [{ id__: 34, parm: [] }] }] }, { blks: [12, { id__: 40, cid_: 11, enbl: 1, mdls: [{ id__: 33, parm: [] }] }] }] },
  };
}
const entities = (state: Entity) => state.cg__.entt;
function planFor(state: Entity, bank: 'a' | 'b' = 'b'): StompSwitchPlan {
  const result = readStompSwitch(state, bank, 1); assert.ok(result.plan, result.reason ?? 'Expected a switch plan'); return result.plan;
}
function addParameter(state: Entity, low = -12, high = 6, initial = low) {
  const e = entities(state); e.sm__.scid[1].push(12); e.ctrl.push(controller(12, 22, low, high));
  e.trgs.push({ id__: 22, type: 2, enty: 3, eID_: 40, mmid: 33, slot: 0, pid_: 7 });
  state.sfg_.flow[1].blks[1].mdls[0].parm.push({ pid_: 7, valu: initial, cid_: 12, tid_: 22 });
}
function addCommands(state: Entity, commands = [command(31), command(32)]) {
  entities(state).srcs[0].cmds = commands.map(c => c.cid_).concat([-1, -1]).slice(0, 2); entities(state).cmnd = commands;
}
/** Native inputs are normalized; the device maps stored bounds and bypass polarity. */
function peer(state = fixture()) {
  const calls: Array<{ kind: 'controller' | 'command'; id: number; value?: number }> = []; let active = 933;
  const io: StompSwitchTransport = {
    activeId: async () => active, state: async () => state, isCurrent: () => true,
    controller: async (id, input) => {
      calls.push({ kind: 'controller', id, value: input });
      const c = entities(state).ctrl.find((item: Entity) => item.cid_ === id);
      if (!c) return [100, 0, 0]; // The real native endpoint succeeds for unknown IDs.
      const t = entities(state).trgs.find((item: Entity) => item.id__ === c.tid_);
      const blocks = state.sfg_.flow.flatMap((flow: Entity) => flow.blks.filter((b: unknown) => b && typeof b === 'object'));
      const b = blocks.find((block: Entity) => block.id__ === t.eID_);
      const raw = Number(c.min_) + input * (Number(c.max_) - Number(c.min_));
      const mapped = c.type === 1 ? Boolean(input ? c.max_ : c.min_) : c.type === 2 ? Math.round(raw) : raw;
      if (t.type === 1) b.enbl = Number(!mapped); else b.mdls[t.slot].parm.find((p: Entity) => p.pid_ === t.pid_).valu = mapped;
      return [100, 0, 1]; // Runtime togl/byps intentionally remain unchanged.
    },
    command: async id => { calls.push({ kind: 'command', id }); return [101, id, 0]; },
  };
  return { state, calls, io, setActive: (id: number) => { active = id; } };
}

test('reads byps:true, resolves global block identity, isolates A/B, and leaves state untouched', () => {
  const state = fixture(), before = structuredClone(state), b = planFor(state), a = planFor(state, 'a');
  assert.deepEqual(b.controllers.map(c => c.id), [11]); assert.deepEqual(a.controllers.map(c => c.id), [19]);
  assert.deepEqual(b.controllers[0].target, { flow: 1, position: 12, instanceId: 40, modelId: 33, slot: 0, parameter: null });
  assert.equal(b.snapshotIndex, 2); assert.deepEqual(state, before);
  for (const number of [0, 6, 12, 1.5]) assert.equal(readStompSwitch(state, 'b', number).plan, null);
});

test('normalized writes preserve parameter ranges and reversed bypass endpoints over repeated presses', async () => {
  const p = peer(); addParameter(p.state);
  entities(p.state).ctrl.push(controller(13, 23, true, false)); entities(p.state).sm__.scid[1].push(13);
  entities(p.state).trgs.push({ id__: 23, type: 1, enty: 2, eID_: 41, mmid: 35, slot: 0, pid_: 0 });
  p.state.sfg_.flow[1].blks.push(15, { id__: 41, cid_: 13, enbl: 0, mdls: [{ id__: 35, parm: [] }] });
  assert.equal((await executeStompSwitch(p.io, 933, planFor(p.state))).status, 'complete');
  assert.deepEqual(p.calls.map(c => c.value), [1, 1, 1]); assert.equal(p.state.sfg_.flow[1].blks[1].enbl, 0);
  assert.equal(p.state.sfg_.flow[1].blks[1].mdls[0].parm[0].valu, 6); assert.equal(p.state.sfg_.flow[1].blks[3].enbl, 1);
  assert.ok(entities(p.state).ctrl.every((c: Entity) => c.togl === false));
  assert.equal((await executeStompSwitch(p.io, 933, planFor(p.state))).status, 'complete');
  assert.deepEqual(p.calls.slice(3).map(c => c.value), [0, 0, 0]); assert.equal(p.state.sfg_.flow[1].blks[1].mdls[0].parm[0].valu, -12);
});

test('mixed current outputs choose one normalized input and preserve descending parameter endpoints', async () => {
  const p = peer(); addParameter(p.state, 80, 20, 20);
  // Both effects are enabled even though their normalized endpoint positions differ.
  assert.equal(readStompSwitch(p.state, 'b', 1).active, true); const plan = planFor(p.state); assert.equal(plan.input, 1);
  assert.equal((await executeStompSwitch(p.io, 933, plan)).status, 'complete'); assert.deepEqual(p.calls.map(c => c.value), [1, 1]);
  assert.equal(p.state.sfg_.flow[1].blks[1].mdls[0].parm[0].valu, 20);
});

test('runtime source byps and controller/command toggles do not change configuration identity', async () => {
  const p = peer(); addCommands(p.state); const plan = planFor(p.state);
  entities(p.state).srcs[0].byps = false; entities(p.state).ctrl[0].togl = true; entities(p.state).cmnd[0].togl = true;
  assert.equal(planFor(p.state).fingerprint, plan.fingerprint); assert.equal((await executeStompSwitch(p.io, 933, plan)).status, 'complete');
});

test('malformed or ambiguous source/controller/target mappings never become executable', () => {
  const mutations: Array<(s: Entity) => void> = [
    s => { entities(s).srcs.push({ ...entities(s).srcs[0] }); }, s => { entities(s).sm__.scid[1] = [11, 11]; },
    s => { entities(s).sm__.scid[1] = [999]; }, s => { entities(s).ctrl[0].trig = 9; }, s => { entities(s).ctrl.push({ ...entities(s).ctrl[0] }); },
    s => { entities(s).ctrl[0].tid_ = 999; }, s => { entities(s).trgs.push({ ...entities(s).trgs[0] }); },
    s => { entities(s).trgs[0].eID_ = 999; }, s => { entities(s).trgs[0].mmid = 999; }, s => { entities(s).ctrl[0].max_ = NaN; }, s => { entities(s).ctrl[0].type = '1'; },
    s => { entities(s).srcs[0].cmds = [31, 31]; }, s => { entities(s).srcs[0].cmds = [31, -1]; },
  ];
  for (const mutate of mutations) { const s = fixture(); mutate(s); assert.equal(readStompSwitch(s, 'b', 1).plan, null); }
});

test('stale preset, snapshot, model, endpoints, command slots, and controller IDs stop before any sends', async () => {
  const mutations: Array<(p: ReturnType<typeof peer>) => void> = [p => p.setActive(934), p => { p.state.cg__.asnp = 3; },
    p => { p.state.sfg_.flow[1].blks[1].mdls[0].id__ = 999; }, p => { entities(p.state).ctrl[0].min_ = true; },
    p => { entities(p.state).ctrl[0].cid_ = 99; }, p => { entities(p.state).srcs[0].cmds.reverse(); }];
  for (const mutate of mutations) {
    const p = peer(); addCommands(p.state, [command(31)]); const plan = planFor(p.state); mutate(p);
    const result = await executeStompSwitch(p.io, 933, plan); assert.equal(result.status, 'stopped'); assert.equal(result.attempted, 0); assert.deepEqual(p.calls, []);
  }
});

test('native status zero cannot confirm an ignored controller or authorize subsequent commands', async () => {
  const p = peer(); addCommands(p.state); p.io.controller = async id => { p.calls.push({ kind: 'controller', id }); return [100, 0, 0]; };
  const result = await executeStompSwitch(p.io, 933, planFor(p.state));
  assert.equal(result.status, 'unconfirmed'); assert.equal(result.confirmed, 0); assert.equal(result.attempted, 1); assert.deepEqual(p.calls.map(c => c.kind), ['controller']);
});

test('missing controller ack stays uncertain even if its target changed and no commands follow', async () => {
  const p = peer(); addCommands(p.state); const apply = p.io.controller;
  p.io.controller = async (id, input) => { await apply(id, input); throw Error('reply lost'); };
  const result = await executeStompSwitch(p.io, 933, planFor(p.state));
  assert.equal(result.status, 'unconfirmed'); assert.equal(result.confirmed, 0); assert.equal(p.calls.length, 1); assert.equal(p.state.sfg_.flow[1].blks[1].enbl, 0);
});

test('Program Change uses its stored ID; an uncertain command is never replayed or followed by another', async () => {
  const p = peer(); addCommands(p.state, [{ ...command(31), func: 0, pvlb: 0, pvlg: 0, pvlh: 0 }, command(32)]);
  p.io.command = async id => { p.calls.push({ kind: 'command', id }); return [101, id, -1]; };
  const result = await executeStompSwitch(p.io, 933, planFor(p.state));
  assert.equal(result.status, 'unconfirmed'); assert.equal(result.confirmed, 1); assert.equal(result.attempted, 2);
  assert.deepEqual(p.calls, [{ kind: 'controller', id: 11, value: 1 }, { kind: 'command', id: 31 }]);
});

test('confirmed final stored command can change snapshot or preset without becoming a failed switch', async () => {
  for (const change of ['snapshot', 'preset']) {
    const p = peer(); addCommands(p.state, [{ ...command(31), func: 0, pvlb: 0 }]);
    p.io.command = async id => { p.calls.push({ kind: 'command', id }); if (change === 'snapshot') p.state.cg__.asnp = 3; else p.setActive(934); return [101, id, 0]; };
    const result = await executeStompSwitch(p.io, 933, planFor(p.state)); assert.equal(result.status, 'complete', change); assert.equal(result.confirmed, 2, change); assert.equal(p.calls.length, 2, change);
  }
});

test('a preset-changing first command stops the remaining command without replay', async () => {
  const p = peer(); addCommands(p.state);
  p.io.command = async id => { p.calls.push({ kind: 'command', id }); p.setActive(934); return [101, id, 0]; };
  const result = await executeStompSwitch(p.io, 933, planFor(p.state)); assert.equal(result.status, 'stopped'); assert.equal(result.confirmed, 2); assert.equal(result.attempted, 2); assert.deepEqual(p.calls.map(c => c.id), [11, 31]);
});


test('float parameter bounds stay fractional and integer controller bounds follow native rounding', async () => {
  for (const type of [2, 3]) {
    const p = peer(); addParameter(p.state, 0.25, 9.75, type === 2 ? 0 : 0.25);
    entities(p.state).ctrl.find((c: Entity) => c.cid_ === 12).type = type;
    const result = await executeStompSwitch(p.io, 933, planFor(p.state));
    assert.equal(result.status, 'complete');
    assert.equal(p.state.sfg_.flow[1].blks[1].mdls[0].parm[0].valu, type === 2 ? 10 : 9.75);
    assert.deepEqual(p.calls.map(c => c.value), [1, 1]);
  }
});

test('a command-only Program Change switch needs no effect controller or enabled source flag', async () => {
  const p = peer(); entities(p.state).sm__.scid[1] = [];
  entities(p.state).ctrl = entities(p.state).ctrl.filter((c: Entity) => c.trig !== 1);
  addCommands(p.state, [{ ...command(31), func: 0, pvlb: 0 }]);
  const result = await executeStompSwitch(p.io, 933, planFor(p.state));
  assert.equal(result.status, 'complete'); assert.equal(result.confirmed, 1);
  assert.deepEqual(p.calls, [{ kind: 'command', id: 31 }]);
});

test('immediate Press commands retain native stored execution across command classes 1 through 7', async () => {
  for (const type of [1, 2, 3, 4, 5, 6, 7]) {
    const p = peer(); entities(p.state).sm__.scid[1] = [];
    entities(p.state).ctrl = entities(p.state).ctrl.filter((c: Entity) => c.trig !== 1);
    // Common serialized fields identify the action; the app sends only the stored ID.
    addCommands(p.state, [{ ...command(31), type }]);
    const result = await executeStompSwitch(p.io, 933, planFor(p.state));
    assert.equal(result.status, 'complete', `native command class ${type}`);
    assert.deepEqual(p.calls, [{ kind: 'command', id: 31 }]);
  }
});

test('unsupported action phases, delays, behavior and unknown command classes reject the entire group', () => {
  for (const setting of [{ pvla: 1 }, { pvla: 2 }, { pvla: 3 }, { dlay: 125 }, { behv: 1 }, { type: 0 }, { type: 8 }, { type: '6' }]) {
    const state = fixture(); addCommands(state, [command(31), { ...command(32), ...setting } as ReturnType<typeof command>]);
    assert.equal(readStompSwitch(state, 'b', 1).plan, null, JSON.stringify(setting));
  }
});

test('dedicated native switch actions are not executed from a normal Stomp source', () => {
  const state = fixture();
  addCommands(state, [{ ...command(31), type: 4, func: 2 }]);
  assert.equal(readStompSwitch(state, 'b', 1).plan, null);
  assert.match(readStompSwitch(state, 'b', 1).reason!, /dedicated/);
});

test('a tap cannot latch a momentary or continuous assignment', () => {
  for (const behavior of [1, 2, undefined, '0']) {
    const state = fixture();
    entities(state).ctrl[0].behv = behavior;
    assert.equal(readStompSwitch(state, 'b', 1).plan, null);
    assert.match(readStompSwitch(state, 'b', 1).reason!, /Momentary/);
  }
});

test('intermediate and constant parameter endpoints do not invent an On or Off state', () => {
  for (const [low, high, current] of [[0, 1, 0.9], [0.5, 0.5, 0.5]]) {
    const state = fixture();
    addParameter(state, low, high, current);
    entities(state).ctrl.shift();
    entities(state).sm__.scid[1] = [12];
    const read = readStompSwitch(state, 'b', 1);
    assert.ok(read.plan);
    assert.equal(read.active, null);
  }
});

test('an incomplete control graph never authorizes even a command-only press', () => {
  for (const field of ['ctrl', 'trgs', 'cmnd', 'sm__']) for (const malformed of [undefined, null, 'missing']) {
    const state = fixture();
    addCommands(state, [command(31)]);
    entities(state)[field] = malformed;
    assert.equal(readStompSwitch(state, 'b', 1).plan, null);
  }
});

test('confirmed actions omit final state when the selected preset changes during its read', async () => {
  const p = peer();
  let reads = 0;
  const original = p.io.state;
  p.io.state = async () => {
    const state = await original();
    if (++reads === 3) p.setActive(934);
    return state;
  };
  const result = await executeStompSwitch(p.io, 933, planFor(p.state));
  assert.equal(result.status, 'complete');
  assert.equal(result.confirmed, 1);
  assert.equal(result.state, undefined);
});
