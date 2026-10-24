type Slot = { cid_?: number; posi?: number };

export const populatedSlots = <T extends Slot>(items: T[]): T[] => items.filter(item => Number.isInteger(item.cid_) && item.cid_! > 0);

/** Stadium setlists include all 128 slots, including placeholders without a content id. */
export function setlistAppendPosition(items: Slot[], count: number): number {
  if (!Number.isInteger(count) || count < 1) throw new Error('Select presets to add.');
  if (!items.length) throw new Error('Could not read the setlist order. Refresh and try again.');
  const occupied = populatedSlots(items);
  if (occupied.some(item => !Number.isInteger(item.posi) || item.posi! < 0 || item.posi! >= 128)) {
    throw new Error('Could not read the setlist order. Refresh and try again.');
  }
  const position = occupied.reduce((next, item) => Math.max(next, item.posi! + 1), 0);
  if (position + count > 128) throw new Error('There is not enough room at the end of this setlist. Choose another setlist or rearrange it on the Stadium.');
  return position;
}

export function setlistMovePosition(items: Slot[], position: number | undefined, delta: -1 | 1): number | null {
  const ordered = populatedSlots(items).filter(item => Number.isInteger(item.posi)).sort((a, b) => a.posi! - b.posi!);
  const index = ordered.findIndex(item => item.posi === position);
  const neighbor = index >= 0 ? ordered[index + delta] : undefined;
  return neighbor ? neighbor.posi! + (delta > 0 ? 1 : 0) : null;
}
