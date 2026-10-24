import catalog from '../data/blockTypes.json';
import ioCatalog from '../data/ioModels.json';
import type { SignalFlowGrid, BlockSlot } from '../types/signalFlow';
import type { HelixPathClipboard } from './helixClient';
import { readBlockAt } from './blockCommands';
import { blockLimitReason } from '../utils/blockLimits';
import { ioModelAllowed } from '../utils/ioRouting';

const models = new Map(Object.entries(catalog).flatMap(([kind, group]) => group.models.map(model => [model.id, { ...model, kind }] as const)));

export function copiedValueMatches(actual: unknown, expected: number | boolean): boolean {
  if (typeof expected === 'boolean') return actual === expected || actual === (expected ? 1 : 0);
  return typeof actual === 'number' && Number.isFinite(actual) && Math.abs(actual - expected) <= 0.00005 * Math.max(1, Math.abs(expected));
}

export function clipboardParameterType(modelId: number, paramId: number, value: number | boolean, harness = false): 'i' | 'f' | 'b' {
  const model = models.get(modelId) ?? [...ioCatalog.inputs.models, ...ioCatalog.outputs.models].find(item => item.id === modelId);
  const parameter = model?.params.find(item => item.id === paramId && Boolean((item as { harness?: boolean }).harness) === harness);
  if (parameter?.type === 'i' || parameter?.type === 'f' || parameter?.type === 'b') return parameter.type;
  return typeof value === 'boolean' ? 'b' : Number.isInteger(value) ? 'i' : 'f';
}

export function validatePathPaste(clipboard: HelixPathClipboard, state: unknown, target: number, dspLimit: number) {
  if (![0, 1].includes(target) || target === clipboard.sourcePath) throw new Error('Choose the other primary path.');
  const grid: SignalFlowGrid = Array.from({ length: 4 }, () => Array(12).fill(null));
  // Keep the other path when checking preset-wide limits such as one looper.
  for (let row = 0; row < 4; row++) {
    if (Math.floor(row / 2) === target) continue;
    for (let index = 0; index < 12; index++) {
      const block = readBlockAt(state, Math.floor(row / 2), index + (row % 2 ? 15 : 1));
      const id = block?.mdls?.[0]?.id__;
      const model = id === undefined ? undefined : models.get(id);
      if (model) grid[row][index] = { id: model.id, name: model.name, kind: model.kind, usage: model.usage };
    }
  }
  let usage = 0;
  for (const entry of clipboard.entries) {
    if (entry.position === 13 || entry.position === 27) {
      if (!ioModelAllowed(target * 2, 'output', entry.modelId)) throw new Error('This copied output feeds Path 2. Choose a physical output before copying it onto Path 2.');
      continue;
    }
    if (entry.position === 0 || entry.position === 14) continue;
    const model = models.get(entry.modelId);
    if (!model) throw new Error('This path includes an unrecognised block. Copy it in the desktop editor.');
    const slot: BlockSlot = { path: (target * 2 + (entry.position >= 15 ? 1 : 0)) as BlockSlot['path'], block: (entry.position >= 15 ? entry.position - 15 : entry.position - 1) as BlockSlot['block'] };
    if (slot.block < 0 || slot.block >= 12) throw new Error('The copied path contains an invalid position.');
    const reason = blockLimitReason(grid, slot, model);
    if (reason) throw new Error(reason);
    grid[slot.path][slot.block] = { id: model.id, name: model.name, kind: model.kind, usage: model.usage };
    usage += model.usage ?? 0;
  }
  if (usage > dspLimit) throw new Error('There is not enough processing capacity for this copied path.');
}
