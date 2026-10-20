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
      { id__: 14, type: 1, ctxt: 9, locl: 25, cmds: [-1, -1] },
      { id__: 20, type: 1, ctxt: 0, locl: 25, cmds: [-1, -1] },
    ],
    sm__: { scid: [4, [6], 14, [20, 21], 20, [22]] },
    ctrl: [{ cid_: 6, tid_: 17 }, { cid_: 20, tid_: 18 }, { cid_: 21, tid_: 19 }, { cid_: 22, tid_: 20 }],
    trgs: [{ id__: 17, mmid: 628 }, { id__: 18, mmid: 310 }, { id__: 19, mmid: 628 }, { id__: 20, mmid: 999 }],
  } },
});

test('stomp banks isolate A and B assignments and prefer custom labels', () => {
  const banks = extractStompBanks(fixture(), names)!;
  assert.deepEqual(banks.a[0], { number: 1, label: 'Lead boost', color: 2, assigned: true });
  assert.deepEqual(banks.b[0], { number: 1, label: 'Delay + US Deluxe', color: 8, assigned: true });
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
