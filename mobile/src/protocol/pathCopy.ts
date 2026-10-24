import { findFlows } from '../utils/helixState';
import { isRoutingModel, isSplitModel } from '../utils/routing';
import { readBlockAt } from './blockCommands';
import { applyCopiedSettings, copiedSettingsMatch, extractBlockSettings, type BlockCopyTransport } from './blockCopy';
import { confirmCopyPreset, copyOperationError, withAutoCabDisabled } from './copyOperation';
import type { HelixPathClipboard } from './helixClient';
import { validatePathPaste } from './pathPaste';

const effectPositions = [...Array.from({ length: 12 }, (_, index) => index + 1), ...Array.from({ length: 12 }, (_, index) => index + 15)];
const copyPositions = [0, ...effectPositions.slice(0, 12), 13, 14, ...effectPositions.slice(12), 27];

export function capturePathSettings(state: unknown, sourcePath: number): HelixPathClipboard {
  if (![0, 1].includes(sourcePath) || !findFlows(state)?.[sourcePath]) throw new Error('Could not read the source path. Sync and try again.');
  return { sourcePath, entries: copyPositions.flatMap(position => {
    const block = readBlockAt(state, sourcePath, position);
    if (block?.mdls?.length) return [extractBlockSettings(block, position)];
    // An absent B endpoint means None. Include it so a destination's independent
    // input/output cannot survive a whole-path replacement accidentally.
    if (position === 14 || position === 27) return [{ position, modelId: position === 14 ? 771 : 789, enabled: true, params: [] }];
    return [];
  }) };
}

/** The first/last A routing node determines whether a B endpoint is independent. */
export function copiedEndpointIsDerived(clipboard: HelixPathClipboard, position: number): boolean {
  const nodes = clipboard.entries.filter(entry => entry.position >= 1 && entry.position <= 12 && isRoutingModel(entry.modelId))
    .sort((left, right) => left.position - right.position);
  if (!nodes.length) return false;
  return position === 14 ? isSplitModel(nodes[0].modelId) : position === 27 && !isSplitModel(nodes[nodes.length - 1].modelId);
}

export function pathEndpointWrites(clipboard: HelixPathClipboard, state: unknown, targetPath: number) {
  return ([14, 27] as const).flatMap(position => {
    const noneModel = position === 14 ? 771 : 789;
    const copied = clipboard.entries.find(entry => entry.position === position);
    const desired = copied && !copiedEndpointIsDerived(clipboard, position) ? copied : { position, modelId: noneModel, enabled: true, params: [] };
    const existing = readBlockAt(state, targetPath, position)?.mdls?.[0]?.id__;
    // None is a reset, not a block to create under an attached split/merge.
    if (desired.modelId === noneModel && (existing === undefined || existing === noneModel)) return [];
    return [desired];
  });
}

export interface PathCopyTransport extends BlockCopyTransport {
  clear(flow: number, position: number): Promise<unknown>;
  link(flow: number, position: number, modelId: number, linkedFlow: number, linkedPosition: number): Promise<unknown>;
}

export async function pastePathSettings(io: PathCopyTransport, clipboard: HelixPathClipboard, targetPath: number, presetId: number, dspLimit = 66) {
  let changed = false;
  let warning: string | null = null;
  const check = () => confirmCopyPreset(() => io.activeId(), presetId);
  try {
    if (!clipboard) throw new Error('No copied path is available.');
    const blockCount = clipboard.entries.filter(entry => effectPositions.includes(entry.position)).length;
    if (!blockCount) throw new Error('This path has no amp, effect or routing blocks to copy.');
    await check();
    const state = await io.state();
    await check();
    if (!findFlows(state)?.[targetPath]) throw new Error('Could not read the destination path. Sync and try again.');
    validatePathPaste(clipboard, state, targetPath, dspLimit);
    const result = await withAutoCabDisabled({ read: () => io.autoCab(), write: enabled => io.setAutoCab(enabled) }, async () => {
      await check();
      const fresh = await io.state();
      if (!findFlows(fresh)?.[targetPath]) throw new Error('Could not read the destination path. Sync and try again.');
      validatePathPaste(clipboard, fresh, targetPath, dspLimit);
      const occupied = effectPositions.filter(position => readBlockAt(fresh, targetPath, position)?.mdls?.length);
      for (const position of occupied) { await check(); changed = true; await io.clear(targetPath, position); }
      await check();
      const cleared = await io.state();
      if (effectPositions.some(position => readBlockAt(cleared, targetPath, position)?.mdls?.length)) throw new Error('The Stadium has not confirmed the cleared positions. Sync and inspect the path before saving.');
      // Set independent B endpoints before installing any new split/merge nodes.
      const endpoints = pathEndpointWrites(clipboard, cleared, targetPath);
      for (const entry of endpoints) {
        await check(); changed = true;
        await io.model(targetPath, entry.position, entry.modelId);
      }
      if (endpoints.length) {
        const updatedIO = await io.state();
        await check();
        for (const entry of endpoints) {
          const actual = readBlockAt(updatedIO, targetPath, entry.position)?.mdls?.[0]?.id__;
          const none = entry.modelId === (entry.position === 14 ? 771 : 789);
          if (actual !== entry.modelId && !(none && actual === undefined)) throw new Error('The Stadium has not confirmed the copied input/output. Sync and inspect the path before saving.');
        }
      }
      for (const entry of clipboard.entries.filter(entry => entry.position !== 14 && entry.position !== 27)) {
        await check(); changed = true;
        await io.model(targetPath, entry.position, entry.modelId);
      }
      for (const entry of clipboard.entries) {
        await check();
        if (!isRoutingModel(entry.modelId) || typeof entry.linkFlow !== 'number' || typeof entry.linkPosition !== 'number') continue;
        await io.link(targetPath, entry.position, entry.modelId, entry.linkFlow === clipboard.sourcePath ? targetPath : entry.linkFlow, entry.linkPosition);
      }
      const defaults = await io.state();
      for (const entry of clipboard.entries) {
        if (copiedEndpointIsDerived(clipboard, entry.position)) continue;
        await applyCopiedSettings(io, targetPath, entry, readBlockAt(defaults, targetPath, entry.position), check, effectPositions.includes(entry.position));
      }
      await check();
      const confirmed = await io.state();
      await check();
      for (const entry of clipboard.entries) {
        if (copiedEndpointIsDerived(clipboard, entry.position)) continue;
        const actual = readBlockAt(confirmed, targetPath, entry.position);
        const absentNone = !actual?.mdls?.length && ((entry.position === 14 && entry.modelId === 771) || (entry.position === 27 && entry.modelId === 789)) && entry.params.length === 0 && !entry.harnessParams?.length;
        if (absentNone) continue;
        const expectedFlow = entry.linkFlow === clipboard.sourcePath ? targetPath : entry.linkFlow;
        if ((isRoutingModel(entry.modelId) && (actual?.bblk !== entry.linkPosition || actual?.bflw !== expectedFlow)) ||
            !copiedSettingsMatch(actual, entry, effectPositions.includes(entry.position))) throw new Error('The Stadium has not confirmed every copied setting. Sync and inspect the path before saving.');
      }
      if (effectPositions.some(position => !clipboard.entries.some(entry => entry.position === position) && readBlockAt(confirmed, targetPath, position)?.mdls?.length)) throw new Error('The Stadium has not confirmed the cleared positions. Sync and inspect the path before saving.');
      return confirmed;
    });
    warning = result.warning;
    await check();
    return { sourcePath: clipboard.sourcePath, targetPath, entryCount: blockCount,
      routingEntryCount: clipboard.entries.filter(entry => isRoutingModel(entry.modelId)).length, state: result.value, warning };
  } catch (error) { throw copyOperationError(error, changed, warning); }
}
