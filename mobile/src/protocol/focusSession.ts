import { findFlows } from '../utils/helixState';
import type { FocusChange, FocusValue } from '../utils/focus';

export interface FocusTarget {
  presetId: number; flow: number; blockId: number; modelId: number; snapshotIndex: number; slot?: number;
}
export interface FocusTransport {
  activeId: () => Promise<number | null>;
  state: () => Promise<unknown>;
  write: (change: FocusChange) => Promise<void>;
}

export function readFocusValues(state: unknown, target: FocusTarget): Record<number, FocusValue> {
  const flow = findFlows(state)?.[target.flow] as { blks?: Array<unknown> } | undefined;
  const block = flow?.blks?.find(item => !!item && typeof item === 'object' && (item as { id__?: number }).id__ === target.blockId) as
    { mdls?: Array<{ id__?: number; parm?: Array<{ pid_: number; valu: FocusValue }> }> } | undefined;
  const model = block?.mdls?.[target.slot ?? 0];
  const snapshot = (state as { cg__?: { asnp?: number } })?.cg__?.asnp;
  if (model?.id__ !== target.modelId || snapshot !== target.snapshotIndex) {
    throw new Error('The block or snapshot changed. Reopen Focus View before adjusting it.');
  }
  return Object.fromEntries((model.parm ?? []).filter(param => Number.isInteger(param.pid_) &&
    (typeof param.valu === 'boolean' || (typeof param.valu === 'number' && Number.isFinite(param.valu))))
    .map(param => [param.pid_, param.valu]));
}

export async function applyFocusChanges(io: FocusTransport, target: FocusTarget, changes: readonly FocusChange[]) {
  const identity = async () => {
    if (await io.activeId() !== target.presetId) throw new Error('The active preset changed. Reopen Focus View before adjusting it.');
    const values = readFocusValues(await io.state(), target);
    if (await io.activeId() !== target.presetId) throw new Error('The active preset changed. Reopen Focus View before adjusting it.');
    return values;
  };
  const before = await identity();
  if (changes.some(change => before[change.id] === undefined ||
      (typeof change.value !== 'boolean' && !Number.isFinite(change.value)))) {
    throw new Error('Some Focus controls are unavailable on this device. Sync the preset and try again.');
  }
  const changed = changes.filter(change => before[change.id] !== change.value);
  // Apply switches first (including tempo sync), then the continuous values they govern.
  for (const group of [changed.filter(c => c.type !== 'f'), changed.filter(c => c.type === 'f')]) {
    for (let offset = 0; offset < group.length; offset += 4) {
      await identity();
      const replies = await Promise.allSettled(group.slice(offset, offset + 4).map(change => io.write(change)));
      const failure = replies.find(reply => reply.status === 'rejected');
      if (failure?.status === 'rejected') throw failure.reason;
    }
  }
  const after = await identity();
  if (changes.some(change => after[change.id] === undefined || (typeof change.value === 'boolean'
    ? Boolean(after[change.id]) !== change.value
    : Math.abs(Number(after[change.id]) - change.value) > 0.00005 * Math.max(1, Math.abs(change.value))))) {
    throw new Error('The Stadium has not confirmed every Focus value. Sync the preset before adjusting again.');
  }
  return after;
}
