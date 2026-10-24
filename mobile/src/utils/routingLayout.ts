/** Visible row-B positions are 15–26; columns are 0–11 in both rows. */
const ROW_B_FIRST_POSITION = 15;
const COLUMN_COUNT = 12;

type RoutingCell = { id?: number; kind: string; name: string; modelName?: string; linkPosition?: number } | null;

/** A stretch of row B that runs alongside row A between a split and a merge. */
export interface BranchSegment {
  /** Row-A column of the split node, or null when row B is fed as a whole row. */
  splitColumn: number | null;
  /** Row-A column of the merge node, or null when the branch ends at row B's output. */
  mergeColumn: number | null;
  /** First and last row-B columns covered by the branch wire. */
  from: number;
  to: number;
}

export const isRoutingBlock = (block: RoutingCell): boolean => block?.kind === 'routing';

/** Mixer nodes close a branch; every other routing model opens one. */
export const isMergeBlock = (block: RoutingCell): boolean =>
  isRoutingBlock(block) && (block?.id === 478 || /mixer|merge|join/i.test(block?.modelName ?? block?.name ?? ''));

export const linkedColumn = (block: RoutingCell, fallback: number) => {
  const column = typeof block?.linkPosition === 'number' ? block.linkPosition - ROW_B_FIRST_POSITION : NaN;
  return Number.isInteger(column) && column >= 0 && column < COLUMN_COUNT ? column : fallback;
};

/**
 * Work out where row B runs for one path.
 *
 * Stadium stores split and merge nodes in row A. Each one links to the row-B
 * position where its branch starts or ends, and that column can differ from
 * the node's own column. Several split/merge pairs may share one path. When
 * row B has content but no split feeds it, it is treated as a whole row.
 */
export function computeBranchSegments(rowA: readonly RoutingCell[], rowB: readonly RoutingCell[], rowBHasIO = false): BranchSegment[] {
  const splits: number[] = [];
  const merges: number[] = [];
  rowA.forEach((block, column) => {
    if (!isRoutingBlock(block)) return;
    (isMergeBlock(block) ? merges : splits).push(column);
  });

  const segments: BranchSegment[] = [];
  const usedMerges = new Set<number>();
  for (const splitColumn of splits) {
    const start = linkedColumn(rowA[splitColumn], splitColumn);
    const mergeColumn = merges.find((column) => column > splitColumn && !usedMerges.has(column)) ?? null;
    if (mergeColumn === null) {
      segments.push({ splitColumn, mergeColumn: null, from: start, to: COLUMN_COUNT - 1 });
      continue;
    }
    usedMerges.add(mergeColumn);
    const end = linkedColumn(rowA[mergeColumn], mergeColumn);
    segments.push({
      splitColumn,
      mergeColumn,
      from: Math.min(start, end),
      to: Math.max(start, end),
    });
  }

  // A merge without a preceding split is fed by row B's independent input.
  for (const mergeColumn of merges) {
    if (usedMerges.has(mergeColumn)) continue;
    segments.push({ splitColumn: null, mergeColumn, from: 0, to: linkedColumn(rowA[mergeColumn], mergeColumn) });
  }

  if (!segments.length && (rowBHasIO || rowB.some((block) => block !== null))) {
    segments.push({ splitColumn: null, mergeColumn: null, from: 0, to: COLUMN_COUNT - 1 });
  }
  return segments.sort((a, b) => a.from - b.from);
}

/** Row-B columns that sit on a branch wire, where an empty slot can take a block. */
export function branchColumns(segments: readonly BranchSegment[]): Set<number> {
  const columns = new Set<number>();
  for (const segment of segments) {
    for (let column = segment.from; column <= segment.to; column += 1) columns.add(column);
  }
  return columns;
}
