import assert from 'node:assert/strict';
import test from 'node:test';
import { extractStompBanks } from './perform';

const names = (id: number) => ({ 310: 'Delay', 628: 'US Deluxe' }[id]);
const fixture = () => ({
  pm__: [
    { key_: 'preset.floorboard.stomp.a.1.label', val_: ' Lead boost ' },
    { key_: 'preset.floorboard.stomp.a.1.color', val_: 2 },
    { key_: 'preset.floorboard.stomp.b.1.color', val_: 8 },
  ],
  cg__: { entt: {
    srcs: [
      { id__: 4, type: 1, ctxt: 1, locl: 25, cmds: [-1, -1] },
      { id__: 14, type: 1, ctxt: 2, locl: 25, cmds: [-1, -1] },
      { id__: 20, type: 1, ctxt: 0, locl: 25, cmds: [-1, -1] },
      { id__: 21, type: 1, ctxt: 9, locl: 25, cmds: [50, -1] },
    ],
    sm__: { scid: [4, [6], 14, [20, 21], 20, [22]] },
    ctrl: [{ cid_: 6, tid_: 17 }, { cid_: 20, tid_: 18 }, { cid_: 21, tid_: 19 }, { cid_: 22, tid_: 20 }],
    trgs: [{ id__: 17, mmid: 628 }, { id__: 18, mmid: 310 }, { id__: 19, mmid: 628 }, { id__: 20, mmid: 999 }],
  } },
});

test('stomp banks isolate A and B assignments and prefer custom labels', () => {
  const banks = extractStompBanks(fixture(), names)!;
  const { commands: aCommands, control: aControl, ...aFirst } = banks.a[0];
  const { commands: bCommands, control: bControl, ...bFirst } = banks.b[0];
  assert.equal(aCommands.plan, null);
  assert.equal(bCommands.plan, null);
  assert.equal(aControl.plan, null);
  assert.equal(bControl.plan, null);
  assert.deepEqual(aFirst, { number: 1, label: 'Lead boost', color: 2, assigned: true });
  assert.deepEqual(bFirst, { number: 1, label: 'Delay + US Deluxe', color: 8, assigned: true });
  assert.equal(banks.a[1].label, 'Unassigned');
  assert.deepEqual(banks.a.map(s => s.number), [1, 2, 3, 4, 5, 7, 8, 9, 10, 11]);
});

test('automatic labels follow targets, deduplicate models, and handle unknown models', () => {
  const state = fixture();
  state.pm__ = [];
  state.cg__.entt.trgs[2].mmid = 310;
  assert.equal(extractStompBanks(state, names)!.b[0].label, 'Delay');
  assert.equal(extractStompBanks(state, () => undefined)!.a[0].label, 'Assigned');
});

test('missing state differs from an empty bank and malformed mappings do not invent assignments', () => {
  assert.equal(extractStompBanks(null, names), null);
  assert.equal(extractStompBanks({ other: [] }, names), null);
  const banks = extractStompBanks({ payload: { pm__: [null, { key_: 'preset.floorboard.stomp.a.1.color', val_: '8' }],
    cg__: { entt: { srcs: [null, { type: 1, ctxt: 1, locl: 25 }], sm__: { scid: [1, 'broken', 2] } } } } }, names)!;
  assert.ok(banks.a.every(s => !s.assigned && s.label === 'Unassigned'));
  assert.equal(banks.a[0].color, null);
});

test('a refresh replaces old bank data and leaves the device state untouched', () => {
  const state = fixture();
  const before = structuredClone(state);
  extractStompBanks(state, names);
  assert.deepEqual(state, before);
  assert.equal(extractStompBanks({ pm__: [{ key_: 'preset.floorboard.stomp.a.1.label', val_: '' }] }, names)!.a[0].label, 'Unassigned');
});

test('parameter targets retain their control names and command switches are not called unassigned', () => {
  const state = fixture();
  state.pm__ = [];
  const targets = state.cg__.entt.trgs as Array<{ id__: number; mmid: number; type?: number; pid_?: number }>;
  targets[1].type = 2;
  targets[1].pid_ = 7;
  const banks = extractStompBanks(state, (id, param) => param === undefined ? names(id) : `${names(id)} control ${param}`)!;
  assert.equal(banks.b[0].label, 'Delay control 7 + US Deluxe');
  state.cg__.entt.srcs[0].cmds = [0, -1];
  state.cg__.entt.sm__.scid = [];
  assert.equal(extractStompBanks(state, names)!.a[0].label, 'Command');
});

test('assigned labels do not make incomplete switch controls actionable', () => {
  const banks = extractStompBanks(fixture(), names)!;
  for (const bank of [banks.a, banks.b]) {
    assert.equal(bank[0].assigned, true);
    assert.equal(bank[0].control.plan, null);
    assert.equal(bank[0].control.active, null);
    assert.equal(typeof bank[0].control.reason, 'string');
    assert.ok(bank[0].control.reason!.length > 0);
  }
});

test('custom names remain visible when a switch has no actionable assignments', () => {
  const state = {
    pm__: [{ key_: 'preset.floorboard.stomp.b.7.label', val_: ' Song ending ' }],
    cg__: { entt: { srcs: [], ctrl: [], trgs: [], sm__: { scid: [] } } },
  };
  const item = extractStompBanks(state, names)!.b.find(item => item.number === 7)!;
  assert.equal(item.label, 'Song ending');
  assert.equal(item.assigned, false);
  assert.equal(item.control.plan, null);
  assert.equal(item.control.active, null);
  assert.ok(item.control.reason);
});

const controllableFixture = () => ({
  pm__: fixture().pm__,
  sfg_: { flow: [
    { blks: [9, { id__: 777, enbl: true, mdls: [{ id__: 310, parm: [{ pid_: 7, valu: 0.25 }] }] }] },
    { blks: [3, { id__: 42, enbl: true, mdls: [{ id__: 628 }] }] },
  ] },
  cg__: { asnp: 2, entt: {
    srcs: [
      { id__: 4, type: 1, ctxt: 1, locl: 25, byps: true, mtyp: 0, mtms: 0, cnt1: 0, cnt2: 0, cnt3: 0, cmds: [-1, -1] },
      { id__: 14, type: 1, ctxt: 2, locl: 25, byps: false, mtyp: 0, mtms: 0, cnt1: 0, cnt2: 0, cnt3: 0, cmds: [-1, -1] },
    ],
    sm__: { scid: [4, [6], 14, [20]] },
    ctrl: [
      { cid_: 6, trig: 4, tid_: 17, type: 1, min_: 1, max_: 0, behv: 0, dlay: 0, thrs: 0, goid: 0 },
      { cid_: 20, trig: 14, tid_: 18, type: 3, min_: 0.25, max_: 0.75, behv: 0, dlay: 0, thrs: 0, goid: 0 },
    ],
    trgs: [
      { id__: 17, eID_: 42, mmid: 628, slot: 0, type: 1 },
      { id__: 18, eID_: 777, mmid: 310, slot: 0, type: 2, pid_: 7 },
    ],
    cmnd: [],
  } },
});

test('both banks expose usable controls and live status independently of source bypass state', () => {
  const state = controllableFixture();
  const before = structuredClone(state);
  const banks = extractStompBanks(state, (id, parameter) => parameter === undefined ? names(id) : `${names(id)} control ${parameter}`)!;
  const a = banks.a[0], b = banks.b[0];
  assert.equal(a.label, 'Lead boost');
  assert.equal(b.label, 'Delay control 7');
  assert.equal(a.control.active, true);
  assert.equal(b.control.active, false);
  assert.equal(a.control.reason, null);
  assert.equal(b.control.reason, null);
  assert.ok(a.control.plan);
  assert.ok(b.control.plan);
  assert.equal(a.control.plan.bank, 'a');
  assert.equal(b.control.plan.bank, 'b');
  assert.equal(a.control.plan.sourceId, 4);
  assert.equal(b.control.plan.sourceId, 14);
  assert.deepEqual(a.control.plan.controllers[0].target,
    { flow: 1, position: 3, instanceId: 42, modelId: 628, slot: 0, parameter: null });
  assert.deepEqual(b.control.plan.controllers[0].target,
    { flow: 0, position: 9, instanceId: 777, modelId: 310, slot: 0, parameter: 7 });
  assert.equal(banks.a[1].control.plan, null);
  assert.equal(banks.b[1].control.plan, null);
  assert.deepEqual(state, before);
});

test('a refreshed bank replaces On and Off metadata without losing its assignment', () => {
  const state = controllableFixture();
  const before = extractStompBanks(state, names)!.a[0];
  state.cg__.entt.srcs[0].byps = false;
  const block = state.sfg_.flow[1].blks[1] as { enbl: boolean };
  block.enbl = false;
  const after = extractStompBanks(state, names)!.a[0];
  assert.equal(before.control.active, true);
  assert.equal(after.control.active, false);
  assert.ok(before.control.plan);
  assert.ok(after.control.plan);
  assert.equal(after.control.plan.fingerprint, before.control.plan.fingerprint);
  assert.equal(after.label, before.label);
  assert.equal(after.assigned, true);
});
