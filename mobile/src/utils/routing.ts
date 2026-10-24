import type { BlockData, BlockSlot, IOType, SignalFlowGrid } from '../types/signalFlow';

export const SPLIT_MODELS = [475, 477, 476, 474] as const;
export const MERGE_MODEL = 478;
export const isSplitModel = (id: number) => SPLIT_MODELS.some(value => value === id);
export const isRoutingModel = (id: number) => isSplitModel(id) || id === MERGE_MODEL;

export const ROUTING_DESCRIPTIONS: Record<number, string> = {
  475: 'Send the signal to both branches. Useful for dual amps or parallel effects.',
  477: 'Blend between branches A and B with the Route To control.',
  476: 'Send high and low frequencies to different branches.',
  474: 'Route between branches according to how hard you play.',
  478: 'Bring both branches together. Adjust their levels, pan and polarity.',
};

export function routingName(id: number): string {
  return ({ 475: 'Split Y', 477: 'Split A/B', 476: 'Split Crossover', 474: 'Split Dynamic', 478: 'Merge Mixer' } as Record<number, string>)[id] ?? 'Routing';
}

/** Routing nodes live on A. A split can change type without replacing its branch. */
export function routingInsertReason(grid: SignalFlowGrid, slot: BlockSlot, modelId: number): string | null {
  const current = grid[slot.path]?.[slot.block];
  if (!isRoutingModel(modelId)) return current && isRoutingModel(current.id) ? 'Choose a split type here. Remove the routing node before adding an effect.' : null;
  if (slot.path % 2 === 1) return `Add split and merge blocks to row ${slot.path < 2 ? '1A' : '2A'}.`;
  if (current && !isRoutingModel(current.id)) return 'Choose an empty position for a split or merge.';
  if (current && isSplitModel(current.id) !== isSplitModel(modelId)) return 'Remove this routing node before changing between split and merge.';
  if (!current) {
    const row = grid[slot.path];
    const previous = row.slice(0, slot.block).reverse().find(block => block && isRoutingModel(block.id));
    const next = row.slice(slot.block + 1).find(block => block && isRoutingModel(block.id));
    if ([previous, next].some(block => block && isSplitModel(block.id) === isSplitModel(modelId))) return isSplitModel(modelId)
      ? 'Place a merge between separate split paths.' : 'Place a split between separate merge blocks.';
  }
  return null;
}

/** A real B input/output remains editable when that end is not attached to A. */
export function isDerivedRoutingIO(grid: SignalFlowGrid, row: number, type: IOType): boolean {
  if (row % 2 === 0) return false;
  const nodes = (grid[row - 1] ?? []).filter((block): block is BlockData => !!block && isRoutingModel(block.id));
  if (!nodes.length) return false;
  return type === 'input' ? isSplitModel(nodes[0].id) : nodes[nodes.length - 1].id === MERGE_MODEL;
}

/** Limit branch endpoints to the gap between adjacent routing endpoints on B. */
export function routingLinkChoices(grid: SignalFlowGrid, slot: BlockSlot): number[] {
  const row = grid[slot.path] ?? [];
  const current = row[slot.block];
  if (slot.path % 2 || !current || !isRoutingModel(current.id)) return [];
  const previous = row.slice(0, slot.block).reverse().find(block => block && isRoutingModel(block.id));
  const next = row.slice(slot.block + 1).find(block => block && isRoutingModel(block.id));
  const low = typeof previous?.linkPosition === 'number' ? previous.linkPosition : 15;
  const high = typeof next?.linkPosition === 'number' ? next.linkPosition : 26;
  // A split and a merge may connect to the same B position, as on the desktop.
  return Array.from({ length: 12 }, (_, index) => index + 15).filter(position => position >= low && position <= high);
}
