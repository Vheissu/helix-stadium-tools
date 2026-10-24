import assert from 'node:assert/strict';
import test from 'node:test';
import { changeRoutingLink, readBlockAt, requireBlockAcknowledgement, routingLinkCommand, type RoutingTransport } from './blockCommands';
const state = (link = 17, model = 475) => ({ sfg_: { flow: [{ blks: [3, { id__: 42, bflw: 0, bblk: link, mdls: [{ id__: model }] }] }] } });
test('block lookup resolves visible positions even when internal IDs differ', () => {
  assert.equal(readBlockAt(state(), 0, 3)?.id__, 42); assert.equal(readBlockAt(state(), 0, 42), null);
  assert.equal(readBlockAt({ flow: [{ bmap: [1], blks: [null, { id__: 42 }] }] }, 0, 0)?.id__, 42);
  assert.equal(readBlockAt(null, 0, 0), null);
});
test('routing commands use visible positions and the same DSP path', () => {
  assert.deepEqual(routingLinkCommand(1, 3, 475, 17), { address: '/SplitDestinationSet', types: 'iiii', args: [1, 3, 1, 17] });
  assert.equal(routingLinkCommand(0, 8, 478, 22).address, '/JoinOriginSet');
  for (const args of [[2, 3, 475, 17], [0, 15, 475, 17], [0, 3, 536, 17], [0, 3, 475, 27], [0, 3, 475, NaN]]) assert.throws(() => routingLinkCommand(...args as [number, number, number, number]));
});
test('timeout, refusal and malformed block acknowledgements are failures', () => {
  for (const values of [null, [], [1], [1, 0], [1, -4, 1], [1, '0', 1], [1, 0, -1]]) assert.throws(() => requireBlockAcknowledgement(values));
  for (const values of [[1, 0, 1], [2, 0, 3]]) assert.doesNotThrow(() => requireBlockAcknowledgement(values));
});
const target = { presetId: 904, flow: 0, position: 3, modelId: 475, linkedPosition: 18 };
const harness = () => {
  const device = { preset: 904, link: 17, model: 475, writes: 0 };
  const io: RoutingTransport = { activeId: async () => device.preset, state: async () => state(device.link, device.model), send: async () => { device.writes++; device.link = 18; return [1, 0, 1]; } };
  return { device, io };
};
test('connection changes require matching preset, model and confirmed readback', async () => {
  const { device, io } = harness(); await changeRoutingLink(io, target); assert.equal(device.writes, 1);
  for (const field of ['preset', 'model'] as const) { const h = harness(); h.device[field]++; await assert.rejects(changeRoutingLink(h.io, target), /changed/); assert.equal(h.device.writes, 0); }
});
test('unchanged links, failed writes and preset switches never report success', async () => {
  const h = harness(); h.io.send = async () => [1, 0, 1]; await assert.rejects(changeRoutingLink(h.io, target), /not confirmed/);
  h.io.send = async () => [1, -4, 1]; await assert.rejects(changeRoutingLink(h.io, target), /did not confirm/);
  h.io.send = async () => { h.device.preset++; return [1, 0, 1]; }; await assert.rejects(changeRoutingLink(h.io, target), /preset changed/);
});

import { moveBlockAndConfirm, moveBlockCommand, planBlockReorder, reorderBlockAndConfirm, requireAgendaAcknowledgement, type ReorderTransport } from './blockCommands';
const amp = { id__: 5, snap: true, tid_: 3, mdls: [{ id__: 536, parm: [{ pid_: 1, valu: 0.45 }] }] };
const delay = { id__: 6, mdls: [{ id__: 125 }] };
const reorderState = (swapped = false) => ({ flow: [{ blks: swapped ? [5, delay, 7, amp] : [5, amp, 6, delay] }] });
const known = new Set([536, 125, 475]);
test('native reorder plans adjacent swaps through occupied and empty positions without clearing', () => {
  const plan = planBlockReorder(reorderState(), 0, 5, 7, known);
  assert.deepEqual(plan.commands, [{ cmnd: 0x73776170, flow: 0, blk0: 5, blk1: 6 }, { cmnd: 0x73776170, flow: 0, blk0: 6, blk1: 7 }]);
  assert.deepEqual(plan.expected, [delay, null, amp]);
  assert.equal(plan.low, 5);
});
test('native moves reject IO, row-boundary reorder, routing nodes and unknown models', () => {
  for (const args of [[0, 0, 0, 5], [0, 13, 0, 5], [0, 5, 0, 14], [0, 5, 2, 6]]) assert.throws(() => moveBlockCommand(...args as [number, number, number, number]));
  assert.throws(() => planBlockReorder(reorderState(), 0, 5, 19, known), /one row/);
  assert.throws(() => planBlockReorder(reorderState(), 0, 5, 7, new Set([536])), /unrecognised/);
  assert.throws(() => planBlockReorder({ flow: [{ blks: [5, amp, 6, { mdls: [{ id__: 475 }] }] }] }, 0, 5, 7, known), /Routing nodes/);
});
test('agenda acknowledgement accepts the captured changed flag, not arbitrary positive codes', () => {
  requireAgendaAcknowledgement([3, 1, 1]); requireAgendaAcknowledgement([3, 0, 1]);
  for (const values of [null, [3], [3, 2, 1], [3, -4, 1], [3, 1, -1]]) assert.throws(() => requireAgendaAcknowledgement(values));
});
test('native reorder checks every resulting block identity and rejects accepted no-ops', async () => {
  let moved = false;
  const io: ReorderTransport = { activeId: async () => 904, state: async () => reorderState(moved), send: async () => [], agenda: async () => { moved = true; return [3, 1, 1]; } };
  const target = { presetId: 904, flow: 0, from: 5, to: 7, modelId: 536, instanceId: 5 };
  await reorderBlockAndConfirm(io, target, known);
  moved = false; io.agenda = async () => [3, 1, 1];
  await assert.rejects(reorderBlockAndConfirm(io, target, known), /not confirmed/);
  await assert.rejects(reorderBlockAndConfirm(io, { ...target, instanceId: 42 }, known), /source block changed/);
});
test('moving to another path preserves identity and refuses occupied destinations before sending', async () => {
  let moved = false; let writes = 0;
  const io: RoutingTransport = { activeId: async () => 904, state: async () => ({ flow: [{ blks: moved ? [] : [5, amp] }, { blks: moved ? [2, amp] : [] }] }),
    send: async () => { moved = true; writes++; return [3, 0, 1]; } };
  const target = { presetId: 904, fromFlow: 0, fromPosition: 5, toFlow: 1, toPosition: 2, modelId: 536, instanceId: 5 };
  await moveBlockAndConfirm(io, target); assert.equal(writes, 1);
  moved = false; io.state = async () => ({ flow: [{ blks: [5, amp] }, { blks: [2, delay] }] });
  await assert.rejects(moveBlockAndConfirm(io, target), /empty destination/); assert.equal(writes, 1);
});
