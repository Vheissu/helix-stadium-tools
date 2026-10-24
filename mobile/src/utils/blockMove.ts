/** The editor exposes one empty position after the last block, up to 12 slots. */
export function matchesMoveSource(block: { id: number; instanceId?: number } | null | undefined, source: { modelId: number; instanceId?: number }): boolean {
  return !!block && block.id === source.modelId && block.instanceId === source.instanceId;
}

export function visibleBlockCount<T>(blocks: readonly (T | null)[]): number {
  const last = blocks.reduce<number>((result, block, index) => block !== null ? index : result, -1);
  return Math.min(last + 2, blocks.length, 12);
}

/** Move within a path without replacing the destination or losing empty slots. */
export function reorderPathBlocks<T>(blocks: readonly (T | null)[], from: number, to: number, availablePositions?: readonly number[]): (T | null)[] | null {
  const count = availablePositions ? blocks.length : visibleBlockCount(blocks);
  if (availablePositions && !availablePositions.includes(to)) return null;
  if (!Number.isInteger(from) || !Number.isInteger(to) || from < 0 || to < 0 || from >= count || to >= count || blocks[from] === null || from === to) return null;
  const next = [...blocks];
  const [block] = next.splice(from, 1);
  next.splice(to, 0, block);
  return next;
}

/** An empty parallel branch must expose its actual positions, even before its first block. */
export function visibleBlockIndices<T>(blocks: readonly (T | null)[], availablePositions?: readonly number[]): number[] {
  if (!availablePositions) return Array.from({ length: visibleBlockCount(blocks) }, (_, index) => index);
  return blocks.flatMap((block, index) => block || availablePositions.includes(index) ? [index] : []);
}

/** Where a position ends up after `reorderPathBlocks(blocks, from, to)`. */
export function movedIndex(index: number, from: number, to: number): number {
  if (index === from) return to;
  if (from < to && index > from && index <= to) return index - 1;
  if (to < from && index >= to && index < from) return index + 1;
  return index;
}

/**
 * Positions a block can be dropped on by dragging within its row.
 *
 * A move rewrites every position between source and target, which would
 * recreate split and merge nodes without their row-B links. Drags therefore
 * stay between the nearest routing nodes, and routing nodes do not move.
 */
export function dropRange<T>(blocks: readonly (T | null)[], from: number, isFixed: (block: T) => boolean): [number, number] | null {
  const source = blocks[from];
  if (source === null || source === undefined || isFixed(source)) return null;
  let low = from;
  while (low > 0 && !(blocks[low - 1] !== null && isFixed(blocks[low - 1] as T))) low -= 1;
  let high = from;
  const last = visibleBlockCount(blocks) - 1;
  while (high < last && !(blocks[high + 1] !== null && isFixed(blocks[high + 1] as T))) high += 1;
  return [low, high];
}
