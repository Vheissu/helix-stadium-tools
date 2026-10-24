import assert from 'node:assert/strict';
import test from 'node:test';
import { capturePathSettings, pastePathSettings, type PathCopyTransport } from './pathCopy';
import { readBlockAt, type LiveBlock } from './blockCommands';
import { CopyOperationError } from './copyOperation';
import catalog from '../data/blockTypes.json';

function fixture(independentInput = false) {
  const flows: Array<Record<number, LiveBlock>> = [{
    0: { mdls: [{ id__: 770, parm: [] }] },
    3: { bflw: 0, bblk: 17, mdls: [{ id__: 475, parm: [{ pid_: 1, valu: 0.5 }] }] },
    5: { enbl: false, mdls: [{ id__: 536, parm: [{ pid_: 1, valu: 0.42 }] }] },
    8: { bflw: 0, bblk: 22, mdls: [{ id__: 478, parm: [{ pid_: 1, valu: 0.7 }] }] },
    13: { mdls: [{ id__: 783, parm: [] }] },
    19: { enbl: true, mdls: [{ id__: 594, parm: [] }] },
  }, {
    0: { mdls: [{ id__: 770 }] }, 2: { mdls: [{ id__: 125 }, { id__: 125 }] },
    13: { mdls: [{ id__: 783 }] }, 14: { mdls: [{ id__: 774 }] }, 27: { mdls: [{ id__: 790 }] },
  }];
  if (independentInput) {
    flows[0][14] = { mdls: [{ id__: 774, parm: [{ pid_: 1, valu: 1 }] }] };
    delete flows[0][3]; // An independent B input can run into a merge without a split.
  }
  const state = () => ({ flow: flows.map(blks => ({ blks })) });
  const copy = capturePathSettings(state(), 0);
  const writes: unknown[][] = [];
  let enabled: boolean | null = true, preset: number | null = 904;
  const io: PathCopyTransport = {
    activeId: async () => preset, state: async () => structuredClone(state()),
    autoCab: async () => enabled, setAutoCab: async value => { writes.push(['autocab', value]); enabled = value; },
    clear: async (flow, position) => { writes.push(['clear', flow, position]); delete flows[flow][position]; },
    model: async (flow, position, modelId) => {
      writes.push(['model', flow, position, modelId]);
      if (modelId === 771 || modelId === 789) {
        assert.ok(!Object.values(flows[flow]).some(block => [475, 478].includes(block.mdls![0].id__)), 'Never write None under a split/merge');
        delete flows[flow][position]; return;
      }
      const entry = copy.entries.find(item => item.position === position)!;
      flows[flow][position] = { enbl: true, mdls: [{ id__: modelId, parm: entry.params.map(item => ({ pid_: item.paramId, valu: 0 })) }] };
    },
    link: async (flow, position, _id, linkedFlow, linkedPosition) => {
      writes.push(['link', flow, position, linkedFlow, linkedPosition]);
      Object.assign(flows[flow][position], { bflw: linkedFlow, bblk: linkedPosition });
    },
    enabled: async (flow, position, value) => { writes.push(['enabled', value]); flows[flow][position].enbl = value; },
    parameter: async (flow, position, id, value) => {
      writes.push(['param', position, id, value]); flows[flow][position].mdls![0].parm!.find(item => item.pid_ === id)!.valu = value;
    },
  };
  return { flows, state, copy, io, writes, switchPreset: (value: number | null) => { preset = value; }, autoCab: (value: boolean | null) => { enabled = value; } };
}

test('whole-path copying includes independent B inputs and explicit empty B endpoints', () => {
  const empty = fixture().copy.entries;
  assert.equal(empty.find(entry => entry.position === 14)?.modelId, 771);
  assert.equal(empty.find(entry => entry.position === 27)?.modelId, 789);
  const independent = fixture(true).copy.entries.find(entry => entry.position === 14)!;
  assert.equal(independent.modelId, 774); assert.deepEqual(independent.params, [{ paramId: 1, value: 1 }]);
});

test('path paste clears the destination first, maps both branch links and preserves the original path', async () => {
  const h = fixture(); const original = structuredClone(h.flows[0]);
  const result = await pastePathSettings(h.io, h.copy, 1, 904);
  assert.deepEqual(h.flows[0], original);
  assert.deepEqual(h.writes.slice(0, 5), [['autocab', false], ['clear', 1, 2], ['model', 1, 14, 771], ['model', 1, 27, 789], ['model', 1, 0, 770]]);
  assert.deepEqual(h.writes.at(-1), ['autocab', true]);
  assert.equal(h.flows[1][3].bflw, 1); assert.equal(h.flows[1][8].bflw, 1);
  assert.equal(readBlockAt(result.state, 1, 5)?.enbl, false);
  assert.equal(readBlockAt(result.state, 1, 5)?.mdls?.[0]?.parm?.[0].valu, 0.42);
  assert.equal(h.flows[1][14], undefined); assert.equal(h.flows[1][27], undefined);
});

test('an independent B input is restored with its settings', async () => {
  const h = fixture(true);
  await pastePathSettings(h.io, h.copy, 1, 904);
  assert.equal(h.flows[1][14].mdls?.[0].id__, 774);
  assert.equal(h.flows[1][14].mdls?.[0].parm?.[0].valu, 1);
});

test('B endpoints are reset before new routing and absent endpoints are never created under routing', async () => {
  const h = fixture(); h.flows[1][3] = { mdls: [{ id__: 475 }], bblk: 17 };
  h.flows[1][9] = { mdls: [{ id__: 478 }], bblk: 23 };
  await pastePathSettings(h.io, h.copy, 1, 904);
  const blank = fixture(); delete blank.flows[1][14]; delete blank.flows[1][27];
  await pastePathSettings(blank.io, blank.copy, 1, 904);
  assert.equal(blank.writes.some(write => write[0] === 'model' && [14, 27].includes(write[2] as number)), false);
});

test('a no-op B endpoint reset is detected before a split can hide the old connection', async () => {
  const h = fixture(); const model = h.io.model;
  h.io.model = async (flow, position, id) => { if (position !== 14) await model(flow, position, id); };
  await assert.rejects(pastePathSettings(h.io, h.copy, 1, 904), /copied input\/output/);
  assert.equal(h.flows[1][14].mdls?.[0].id__, 774);
  assert.equal(h.writes.some(write => write[0] === 'model' && write[2] === 3), false);
});

test('path limits are rechecked after Auto-Cab reads and empty copies cannot clear a destination', async () => {
  const h = fixture(); const looper = catalog.looper.models[0].id;
  h.copy.entries.push({ position: 10, modelId: looper, enabled: true, params: [] });
  const setAutoCab = h.io.setAutoCab;
  h.io.setAutoCab = async value => { await setAutoCab(value); if (!value) h.flows[0][10] = { mdls: [{ id__: looper }] }; };
  await assert.rejects(pastePathSettings(h.io, h.copy, 1, 904), /one looper/);
  assert.equal(h.writes.some(write => write[0] === 'clear' || write[0] === 'model'), false);
  const empty = fixture(); empty.copy.entries = empty.copy.entries.filter(entry => [0, 13, 14, 27].includes(entry.position));
  await assert.rejects(pastePathSettings(empty.io, empty.copy, 1, 904), /no amp, effect or routing/);
  assert.equal(empty.writes.length, 0);
});

test('preflight refusals and unreadable preferences leave the destination untouched', async () => {
  for (const scenario of ['same-path', 'dsp', 'preset', 'autocab'] as const) {
    const h = fixture(); const before = structuredClone(h.flows);
    if (scenario === 'preset') h.switchPreset(null);
    if (scenario === 'autocab') h.autoCab(null);
    await assert.rejects(pastePathSettings(h.io, h.copy, scenario === 'same-path' ? 0 : 1, 904, scenario === 'dsp' ? 1 : 66), error => {
      assert.ok(error instanceof CopyOperationError); assert.equal(error.mayHaveChanged, false); return true;
    });
    assert.deepEqual(h.flows, before); assert.equal(h.writes.length, 0);
  }
});

test('preset changes after a clear stop the paste and still restore Auto-Cab', async () => {
  const h = fixture(); const clear = h.io.clear;
  h.io.clear = async (...args) => { await clear(...args); h.switchPreset(905); };
  await assert.rejects(pastePathSettings(h.io, h.copy, 1, 904), error => {
    assert.ok(error instanceof CopyOperationError); assert.equal(error.mayHaveChanged, true); return true;
  });
  assert.deepEqual(h.writes, [['autocab', false], ['clear', 1, 2], ['autocab', true]]);
});

test('readback catches accepted no-op clears and writes', async () => {
  for (const command of ['clear', 'parameter'] as const) {
    const h = fixture(); h.io[command] = async () => {};
    await assert.rejects(pastePathSettings(h.io, h.copy, 1, 904), /not confirmed/);
    assert.deepEqual(h.writes.at(-1), ['autocab', true]);
  }
});

test('Auto-Cab restore failures do not replace confirmed results or the original parameter error', async () => {
  for (const failPaste of [false, true]) {
    const h = fixture();
    h.io.setAutoCab = async value => { if (value) throw new Error('Restore timed out'); h.autoCab(false); };
    if (failPaste) h.io.parameter = async () => { throw new Error('Parameter refused'); };
    if (failPaste) await assert.rejects(pastePathSettings(h.io, h.copy, 1, 904), error => {
      assert.ok(error instanceof CopyOperationError); assert.equal(error.message, 'Parameter refused');
      assert.match(error.warning!, /Auto-Cab/); assert.equal(error.mayHaveChanged, true); return true;
    });
    else assert.match((await pastePathSettings(h.io, h.copy, 1, 904)).warning!, /Auto-Cab/);
  }
});
