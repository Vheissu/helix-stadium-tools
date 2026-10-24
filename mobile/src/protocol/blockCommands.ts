import { findFlows } from '../utils/helixState';
import { isRoutingModel, isSplitModel } from '../utils/routing';
import catalog from '../data/blockTypes.json';
import { blockLimitReason } from '../utils/blockLimits';
import { branchColumns, computeBranchSegments } from '../utils/routingLayout';
import type { BlockSlot, SignalFlowGrid } from '../types/signalFlow';

const modelPolicy = new Map(Object.entries(catalog).flatMap(([kind, group]) => group.models.map(model => [model.id, { id: model.id, name: model.name, kind, usage: model.usage }] as const)));

export interface LiveBlock {
  [key: string]: unknown;
  id__?: number;
  enbl?: boolean;
  bflw?: number;
  bblk?: number;
  mdls?: Array<{ id__: number; parm?: Array<{ pid_: number; valu: number | boolean }> }>;
}

/** Edit buffers use either position/block pairs or an indexed block map. */
export function readBlockAt(state: unknown, flowIndex: number, position: number): LiveBlock | null {
  const flow = findFlows(state)?.[flowIndex] as { blks?: unknown; blk?: unknown; blocks?: unknown; bmap?: number[] } | undefined;
  const blocks = flow?.blks ?? flow?.blk ?? flow?.blocks;
  if (!blocks || typeof blocks !== 'object') return null;
  if (!Array.isArray(blocks)) return asBlock((blocks as Record<number, unknown>)[flow?.bmap?.[position] ?? position]);
  if (typeof blocks[0] === 'number') {
    for (let index = 0; index < blocks.length - 1; index += 2) {
      if (blocks[index] === position) return asBlock(blocks[index + 1]);
    }
    return null;
  }
  return asBlock(blocks[flow?.bmap?.[position] ?? position]);
}

function requirePresetId(presetId: number) {
  if (!Number.isInteger(presetId) || presetId <= 0) throw new Error('Sync the current preset before editing.');
}

export function policyGrid(state: unknown): SignalFlowGrid {
  return Array.from({ length: 4 }, (_, row) => Array.from({ length: 12 }, (_, column) => {
    const block = readBlockAt(state, Math.floor(row / 2), column + (row % 2 ? 15 : 1));
    const id = block?.mdls?.[0]?.id__;
    if (id === undefined) return null;
    const model = modelPolicy.get(id);
    return { ...(model ?? { id, kind: 'unknown', name: 'Unrecognised block', usage: Infinity }),
      usage: block!.mdls!.reduce((sum, item) => sum + (modelPolicy.get(item.id__)?.usage ?? Infinity), 0),
      linkPosition: block?.bblk };
  }));
}

export function activeBranchPositions(state: unknown, grid: SignalFlowGrid, flow: number) {
  const input = readBlockAt(state, flow, 14)?.mdls?.[0]?.id__;
  const output = readBlockAt(state, flow, 27)?.mdls?.[0]?.id__;
  const independent = (input !== undefined && input !== 771) || (output !== undefined && output !== 789);
  return branchColumns(computeBranchSegments(grid[flow * 2], grid[flow * 2 + 1], independent));
}

export function validateMovePolicy(state: unknown, fromFlow: number, from: number, toFlow: number, to: number, dspLimit = 66) {
  if (![66, 82].includes(dspLimit)) throw new Error('Choose a supported processing budget.');
  const grid = policyGrid(state);
  const sourceRow = fromFlow * 2 + (from >= 15 ? 1 : 0);
  const sourceColumn = from >= 15 ? from - 15 : from - 1;
  const target: BlockSlot = { path: (toFlow * 2 + (to >= 15 ? 1 : 0)) as BlockSlot['path'], block: (to >= 15 ? to - 15 : to - 1) as BlockSlot['block'] };
  const block = grid[sourceRow]?.[sourceColumn];
  if (!block || !modelPolicy.has(block.id)) throw new Error('This block is unrecognised. Move it in the desktop editor.');
  if (isRoutingModel(block.id)) {
    if (fromFlow !== toFlow || from > 12 || to > 12) throw new Error('Move split and merge nodes within their row A.');
    for (let position = Math.min(from, to); position <= Math.max(from, to); position++) {
      if (position !== from && grid[sourceRow][position - 1] && isRoutingModel(grid[sourceRow][position - 1]!.id)) throw new Error('Keep this node between its neighbouring split and merge.');
    }
  }
  if (to >= 15 && !activeBranchPositions(state, grid, toFlow).has(target.block)) throw new Error('Choose a position on an active branch.');
  grid[sourceRow][sourceColumn] = null;
  const reason = blockLimitReason(grid, target, block);
  if (reason) throw new Error(reason);
  if (fromFlow !== toFlow) {
    const usage = [...grid[toFlow * 2], ...grid[toFlow * 2 + 1]].reduce((sum, item) => sum + (item?.usage ?? 0), 0);
    if (!Number.isFinite(block.usage) || usage + block.usage! > dspLimit) throw new Error('There is not enough processing capacity on this path.');
  }
}

function asBlock(value: unknown): LiveBlock | null {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as LiveBlock : null;
}

export function routingLinkCommand(flow: number, position: number, modelId: number, linkedPosition: number) {
  if (![0, 1].includes(flow) || !Number.isInteger(position) || position < 1 || position > 12 ||
      !isRoutingModel(modelId) || !Number.isInteger(linkedPosition) || linkedPosition < 15 || linkedPosition > 26) {
    throw new Error('Choose a split or merge on row A and a position on its row B.');
  }
  return { address: isSplitModel(modelId) ? '/SplitDestinationSet' : '/JoinOriginSet', types: 'iiii', args: [flow, position, flow, linkedPosition] };
}

export function requireBlockAcknowledgement(values: unknown): void {
  if (!Array.isArray(values) || values.length < 3 || !Number.isInteger(values[0]) || values[1] !== 0 ||
      !Number.isInteger(values[2]) || values[2] < 0) {
    throw new Error('The Stadium did not confirm the block change. Sync the preset before trying again.');
  }
}

export interface RoutingTransport {
  activeId(): Promise<number | null>;
  state(): Promise<unknown>;
  send(address: string, types: string, args: number[]): Promise<unknown>;
}

async function checkActivePreset(io: RoutingTransport, presetId: number, action: string) {
  const current = await io.activeId();
  if (current === null) throw new Error('Could not confirm the current preset. Sync and try again.');
  if (current !== presetId) throw new Error(`The preset changed. Sync before ${action}.`);
}

export function moveBlockCommand(fromFlow: number, fromPosition: number, toFlow: number, toPosition: number) {
  const effectPosition = (position: number) => Number.isInteger(position) &&
    ((position >= 1 && position <= 12) || (position >= 15 && position <= 26));
  if (![0, 1].includes(fromFlow) || ![0, 1].includes(toFlow) || !effectPosition(fromPosition) || !effectPosition(toPosition) ||
      (fromFlow === toFlow && fromPosition === toPosition)) throw new Error('Choose a different block position.');
  return { address: '/moveBlock', types: 'iiii', args: [fromFlow, fromPosition, toFlow, toPosition] };
}

export async function moveBlockAndConfirm(io: RoutingTransport, target: {
  presetId: number; fromFlow: number; fromPosition: number; toFlow: number; toPosition: number;
  modelId: number; instanceId?: number; dspLimit?: number;
}): Promise<unknown> {
  requirePresetId(target.presetId);
  const command = moveBlockCommand(target.fromFlow, target.fromPosition, target.toFlow, target.toPosition);
  const checkPreset = () => checkActivePreset(io, target.presetId, 'moving a block');
  await checkPreset();
  const before = await io.state();
  const source = readBlockAt(before, target.fromFlow, target.fromPosition);
  if (!source || source.mdls?.[0]?.id__ !== target.modelId ||
      (target.instanceId !== undefined && source.id__ !== target.instanceId)) throw new Error('The block changed. Sync before moving it.');
  if (isRoutingModel(target.modelId) && (target.fromFlow !== target.toFlow || target.fromPosition > 12 || target.toPosition > 12)) {
    throw new Error('Move split and merge nodes within their row A.');
  }
  if (readBlockAt(before, target.toFlow, target.toPosition)?.mdls?.length) throw new Error('Choose an empty destination for this move.');
  validateMovePolicy(before, target.fromFlow, target.fromPosition, target.toFlow, target.toPosition, target.dspLimit);
  await checkPreset();
  requireBlockAcknowledgement(await io.send(command.address, command.types, command.args));
  const after = await io.state();
  await checkPreset();
  const moved = readBlockAt(after, target.toFlow, target.toPosition);
  if (moved?.id__ !== source.id__ || moved?.mdls?.[0]?.id__ !== target.modelId || readBlockAt(after, target.fromFlow, target.fromPosition)?.mdls?.length) {
    throw new Error('The Stadium has not confirmed the move. Sync before trying again.');
  }
  return after;
}

export interface ReorderTransport extends RoutingTransport {
  agenda(commands: Array<Record<string, number>>): Promise<unknown>;
}

export function planBlockReorder(state: unknown, flow: number, from: number, to: number, knownModels: ReadonlySet<number>) {
  moveBlockCommand(flow, from, flow, to);
  if ((from <= 12) !== (to <= 12)) throw new Error('Reorder within one row. Use Move to choose another row.');
  const low = Math.min(from, to), high = Math.max(from, to);
  if (from >= 15) {
    const positions = activeBranchPositions(state, policyGrid(state), flow);
    for (let position = low; position <= high; position++) if (!positions.has(position - 15)) throw new Error('Reorder within one branch. Use Move to choose another branch.');
  }
  const before = Array.from({ length: high - low + 1 }, (_, index) => readBlockAt(state, flow, low + index));
  if (before.some(block => block?.mdls?.length && !knownModels.has(block.mdls[0].id__))) throw new Error('This row includes an unrecognised block. Move it in the desktop editor.');
  if (before.some(block => block?.mdls?.length && isRoutingModel(block.mdls[0].id__))) {
    throw new Error('Move effects between split and merge nodes. Routing nodes stay in place.');
  }
  if (!readBlockAt(state, flow, from)?.mdls?.length) throw new Error('The source block is no longer there.');
  const expected = [...before];
  const [block] = expected.splice(from - low, 1);
  expected.splice(to - low, 0, block);
  const step = from < to ? 1 : -1;
  const commands = [];
  for (let position = from; position !== to; position += step) {
    commands.push({ cmnd: 0x73776170, flow, blk0: position, blk1: position + step }); // 'swap'
  }
  return { commands, low, expected };
}

/** Agenda reports a changed flag (0/1), unlike ordinary zero-status commands. */
export function requireAgendaAcknowledgement(values: unknown): void {
  if (values === null) throw new Error('The move timed out. Sync to check whether it was applied; Undo can restore a completed move.');
  if (!Array.isArray(values) || values.length < 3 || !Number.isInteger(values[0]) ||
      ![0, 1].includes(values[1]) || !Number.isInteger(values[2]) || values[2] < 0) {
    throw new Error('The Stadium did not confirm the move. Sync before trying again.');
  }
}

export async function reorderBlockAndConfirm(io: ReorderTransport, target: {
  presetId: number; flow: number; from: number; to: number; modelId: number; instanceId?: number;
}, knownModels: ReadonlySet<number>): Promise<unknown> {
  requirePresetId(target.presetId);
  const check = () => checkActivePreset(io, target.presetId, 'moving a block');
  await check();
  const before = await io.state();
  const source = readBlockAt(before, target.flow, target.from);
  if (source?.mdls?.[0]?.id__ !== target.modelId || (target.instanceId !== undefined && source.id__ !== target.instanceId)) {
    throw new Error('The source block changed. Sync before moving it.');
  }
  const plan = planBlockReorder(before, target.flow, target.from, target.to, knownModels);
  await check();
  requireAgendaAcknowledgement(await io.agenda(plan.commands));
  const after = await io.state();
  await check();
  if (plan.expected.some((block, index) => {
    const actual = readBlockAt(after, target.flow, plan.low + index);
    return block?.mdls?.length ? actual?.id__ !== block.id__ || actual?.mdls?.[0]?.id__ !== block.mdls[0].id__ : !!actual?.mdls?.length;
  })) throw new Error('The Stadium has not confirmed the reordered blocks. Sync before trying again.');
  return after;
}

/** Verify the preset and node before writing, and the actual link after writing. */
export async function changeRoutingLink(io: RoutingTransport, target: {
  presetId: number; flow: number; position: number; modelId: number; linkedPosition: number; instanceId?: number;
}): Promise<unknown> {
  requirePresetId(target.presetId);
  const command = routingLinkCommand(target.flow, target.position, target.modelId, target.linkedPosition);
  const checkPreset = () => checkActivePreset(io, target.presetId, 'editing its routing');
  await checkPreset();
  const beforeState = await io.state();
  const before = readBlockAt(beforeState, target.flow, target.position);
  if (before?.mdls?.[0]?.id__ !== target.modelId || (target.instanceId !== undefined && before.id__ !== target.instanceId)) throw new Error('The block changed. Sync the preset before editing its routing.');
  for (const direction of [-1, 1]) {
    for (let position = target.position + direction; position >= 1 && position <= 12; position += direction) {
      const neighbour = readBlockAt(beforeState, target.flow, position);
      if (!neighbour?.mdls?.length || !isRoutingModel(neighbour.mdls[0].id__)) continue;
      if (typeof neighbour.bblk === 'number' && (direction < 0 ? target.linkedPosition < neighbour.bblk : target.linkedPosition > neighbour.bblk)) throw new Error('The neighbouring branch changed. Sync before changing this connection.');
      break;
    }
  }
  await checkPreset();
  requireBlockAcknowledgement(await io.send(command.address, command.types, command.args));
  const state = await io.state();
  await checkPreset();
  const after = readBlockAt(state, target.flow, target.position);
  if (after?.mdls?.[0]?.id__ !== target.modelId || after.bflw !== target.flow || after.bblk !== target.linkedPosition) {
    throw new Error('The Stadium has not confirmed the new connection. Sync the preset before trying again.');
  }
  return state;
}
