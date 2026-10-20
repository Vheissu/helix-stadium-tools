/** The editor exposes one empty position after the last block, up to 12 slots. */
export function visibleBlockCount<T>(blocks: readonly (T | null)[]): number {
  const last = blocks.reduce<number>((result, block, index) => block !== null ? index : result, -1);
  return Math.min(last + 2, blocks.length, 12);
}

/** Move within a path without replacing the destination or losing empty slots. */
export function reorderPathBlocks<T>(blocks: readonly (T | null)[], from: number, to: number): (T | null)[] | null {
  const count = visibleBlockCount(blocks);
  if (!Number.isInteger(from) || !Number.isInteger(to) || from < 0 || to < 0 || from >= count || to >= count || blocks[from] === null || from === to) return null;
  const next = [...blocks];
  const [block] = next.splice(from, 1);
  next.splice(to, 0, block);
  return next;
}
