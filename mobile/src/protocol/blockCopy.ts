import catalog from '../data/blockTypes.json';
import type { BlockSlot, SignalFlowGrid } from '../types/signalFlow';
import { blockLimitReason } from '../utils/blockLimits';
import { coerceHelixBoolean, findFlows } from '../utils/helixState';
import { isRoutingModel } from '../utils/routing';
import { activeBranchPositions, policyGrid, readBlockAt, type LiveBlock } from './blockCommands';
import { confirmCopyPreset, copyOperationError, withAutoCabDisabled } from './copyOperation';
import type { HelixPathClipboardEntry } from './helixClient';
import { clipboardParameterType, copiedValueMatches } from './pathPaste';

const models = new Map(Object.entries(catalog).flatMap(([kind, group]) => group.models.map(model => [model.id, { ...model, kind }] as const)));
const libraryModels = new Set([468, 836, 838, 839, 840]);
const effectPosition = (position: number) => Number.isInteger(position) && ((position >= 1 && position <= 12) || (position >= 15 && position <= 26));

export type BlockSettingsCopy = { sourceFlow: number; sourcePosition: number; name: string; settings: HelixPathClipboardEntry };
type Parameter = { pid_: number; valu: unknown };

export function extractBlockSettings(block: LiveBlock, position: number): HelixPathClipboardEntry {
  if (block.mdls?.length !== 1) throw new Error('Copy this block in the desktop editor to keep both cab models.');
  const rawModel = block.mdls![0] as Record<string, unknown>;
  const modelId = block.mdls[0].id__;
  if (libraryModels.has(modelId) || (typeof rawModel.cid_ === 'number' && rawModel.cid_ !== 0) ||
      (typeof rawModel.lbid === 'number' && rawModel.lbid >= 0)) throw new Error('Copy this block in the desktop editor to keep its IR or Clone file reference.');
  const parameters = (items: unknown): HelixPathClipboardEntry['params'] => {
    if (!Array.isArray(items)) return [];
    return items.map((item: Parameter) => {
      if (!item || typeof item !== 'object' || !Number.isInteger(item.pid_) || !(typeof item.valu === 'boolean' || (typeof item.valu === 'number' && Number.isFinite(item.valu)))) throw new Error('This block has a setting that must be copied in the desktop editor.');
      return { paramId: item.pid_, value: item.valu as number | boolean };
    });
  };
  const harness = block.hrns as { parm?: Parameter[] } | undefined;
  return { position, modelId, enabled: coerceHelixBoolean(block.enbl, true),
    params: parameters(rawModel.parm), harnessParams: parameters(harness?.parm),
    ...(typeof block.bflw === 'number' && typeof block.bblk === 'number' ? { linkFlow: block.bflw, linkPosition: block.bblk } : {}) };
}

export function captureBlockSettings(state: unknown, target: { flow: number; position: number; modelId: number; instanceId?: number }): BlockSettingsCopy {
  if (![0, 1].includes(target.flow) || !effectPosition(target.position)) throw new Error('Choose an amp or effect block to copy.');
  const block = readBlockAt(state, target.flow, target.position);
  if (!block || block.mdls?.[0]?.id__ !== target.modelId || (target.instanceId !== undefined && block.id__ !== target.instanceId)) throw new Error('The block changed. Choose it again before copying.');
  const model = models.get(target.modelId);
  if (!model) throw new Error('This block is unrecognised. Copy it in the desktop editor.');
  if (isRoutingModel(model.id)) throw new Error('Copy split and merge routing with Copy path.');
  return { sourceFlow: target.flow, sourcePosition: target.position, name: model.name, settings: extractBlockSettings(block, target.position) };
}

export function blockCopyDestinationReason(grid: SignalFlowGrid, slot: BlockSlot, modelId: number, dspLimit = 66): string | null {
  const model = models.get(modelId);
  if (!model || isRoutingModel(modelId) || libraryModels.has(modelId)) return 'Copy this block in the desktop editor.';
  if (grid[slot.path]?.[slot.block]) return 'Choose an empty position.';
  const reason = blockLimitReason(grid, slot, model);
  if (reason) return reason;
  const flow = Math.floor(slot.path / 2);
  const usage = [...grid[flow * 2], ...grid[flow * 2 + 1]].reduce((sum, block) => sum + (block ? block.usage ?? Infinity : 0), 0);
  if (![66, 82].includes(dspLimit) || !Number.isFinite(model.usage) || usage + model.usage > dspLimit) return 'There is not enough processing capacity on this path.';
  return null;
}

export interface BlockCopyTransport {
  activeId(): Promise<number | null>;
  state(): Promise<unknown>;
  autoCab(): Promise<boolean | null>;
  setAutoCab(enabled: boolean): Promise<unknown>;
  model(flow: number, position: number, modelId: number): Promise<unknown>;
  enabled(flow: number, position: number, enabled: boolean): Promise<unknown>;
  parameter(flow: number, position: number, paramId: number, value: number | boolean, type: 'i' | 'f' | 'b', harness: boolean): Promise<unknown>;
}

export async function applyCopiedSettings(io: Pick<BlockCopyTransport, 'enabled' | 'parameter'>, flow: number, entry: HelixPathClipboardEntry,
  defaults: LiveBlock | null, check: () => Promise<void>, writeBypass = true) {
  await check();
  if (writeBypass && coerceHelixBoolean(defaults?.enbl, true) !== entry.enabled) await io.enabled(flow, entry.position, entry.enabled);
  const harness = defaults?.hrns as { parm?: Parameter[] } | undefined;
  for (const [parameters, existing, isHarness] of [
    [entry.params, defaults?.mdls?.[0]?.parm, false],
    [entry.harnessParams ?? [], harness?.parm, true],
  ] as const) {
    for (const parameter of parameters) {
      if (copiedValueMatches(existing?.find(item => item.pid_ === parameter.paramId)?.valu, parameter.value)) continue;
      await check();
      await io.parameter(flow, entry.position, parameter.paramId, parameter.value,
        clipboardParameterType(entry.modelId, parameter.paramId, parameter.value, isHarness), isHarness);
    }
  }
}

export function copiedSettingsMatch(actual: LiveBlock | null, entry: HelixPathClipboardEntry, checkBypass = true): boolean {
  const harness = actual?.hrns as { parm?: Parameter[] } | undefined;
  return actual?.mdls?.length === 1 && actual.mdls[0].id__ === entry.modelId &&
    (!checkBypass || coerceHelixBoolean(actual.enbl, true) === entry.enabled) &&
    entry.params.every(param => copiedValueMatches(actual.mdls?.[0]?.parm?.find(item => item.pid_ === param.paramId)?.valu, param.value)) &&
    (entry.harnessParams ?? []).every(param => copiedValueMatches(harness?.parm?.find(item => item.pid_ === param.paramId)?.valu, param.value));
}

export async function copyBlockSettings(io: BlockCopyTransport, copy: BlockSettingsCopy, target: { presetId: number; flow: number; position: number; dspLimit?: number }) {
  let changed = false;
  let warning: string | null = null;
  const check = () => confirmCopyPreset(() => io.activeId(), target.presetId);
  try {
    if (![0, 1].includes(target.flow) || !effectPosition(target.position)) throw new Error('Choose an empty amp or effect position.');
    const slot: BlockSlot = { path: (target.flow * 2 + (target.position >= 15 ? 1 : 0)) as BlockSlot['path'], block: (target.position >= 15 ? target.position - 15 : target.position - 1) as BlockSlot['block'] };
    const validateDestination = async () => {
      await check();
      const state = await io.state();
      if (!findFlows(state)?.[target.flow]) throw new Error('Could not read the destination path. Sync and try again.');
      const grid = policyGrid(state);
      if (target.position >= 15 && !activeBranchPositions(state, grid, target.flow).has(slot.block)) throw new Error('Choose a position on an active branch. Add a split to create a new branch.');
      const reason = blockCopyDestinationReason(grid, slot, copy.settings.modelId, target.dspLimit);
      if (reason) throw new Error(reason);
      await check();
    };
    await validateDestination();
    const result = await withAutoCabDisabled({ read: () => io.autoCab(), write: enabled => io.setAutoCab(enabled) }, async () => {
      try {
        // The destination may have changed while the global preference was read.
        await validateDestination();
        const entry = { ...copy.settings, position: target.position };
        changed = true;
        await io.model(target.flow, target.position, entry.modelId);
        await check();
        const defaults = readBlockAt(await io.state(), target.flow, target.position);
        if (defaults?.mdls?.[0]?.id__ !== entry.modelId) throw new Error('The Stadium did not confirm the new block. Sync before trying again.');
        await applyCopiedSettings(io, target.flow, entry, defaults, check);
        const state = await io.state();
        await check();
        if (!copiedSettingsMatch(readBlockAt(state, target.flow, target.position), entry)) throw new Error('The Stadium did not confirm every copied setting. Sync and inspect the new block before saving.');
        return state;
      } catch (error) { throw copyOperationError(error, changed); }
    });
    warning = result.warning;
    await check();
    return result;
  } catch (error) { throw copyOperationError(error, changed, warning); }
}
