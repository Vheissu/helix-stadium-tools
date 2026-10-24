/** Positions per row on the Stadium grid. */
const COLUMN_COUNT = 12;

/**
 * Sizes for the phone signal-flow grid. Both rows scroll sideways together
 * beside a fixed row-label column, so every position keeps a full-size target
 * and a readable name instead of shrinking to fit the screen.
 */
export interface PhoneLaneMetrics {
  /** Row labels stay put on the left while the lanes scroll. */
  gutterW: number;
  /** Width of the scrolling window beside the labels. */
  viewport: number;
  padH: number;
  padV: number;
  gap: number;
  pillW: number;
  col: number;
  tile: number;
  nameGap: number;
  nameSize: number;
  nameLineHeight: number;
  nameLines: number;
  /** Space kept under every tile for its name at the current text size. */
  nameBlock: number;
  laneHeight: number;
  wireY: number;
  trackX: number;
  /** Full lane width: both endpoints and all twelve positions. */
  width: number;
  maxOffset: number;
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

/**
 * `fontScale` is the system text size. Names render up to twice their base
 * size, so lane heights are reserved for that; widths only ever grow with it.
 */
export function measurePhoneLanes(available: number, fontScale = 1, largeText = false): PhoneLaneMetrics {
  const textScale = clamp(Number.isFinite(fontScale) && fontScale > 0 ? fontScale : 1, 0.5, 2);
  const grow = Math.max(textScale, 1);
  const gutterW = Math.round(18 + 22 * grow);
  const viewport = Math.max(0, available - gutterW);
  const padH = 6;
  const padV = 8;
  const gap = 6;
  const nameGap = 6;
  const pillW = Math.round(96 + 40 * (grow - 1));
  // Wide screens spread the columns out; narrow ones scroll at full size.
  const fitted = (viewport - padH * 2 - pillW * 2 - gap * 2) / COLUMN_COUNT;
  const col = Math.max(Math.round(100 + 24 * (grow - 1)), fitted);
  const tile = clamp(Math.round(col * 0.68), 64, 72);
  const nameSize = largeText ? 16 : 14;
  const nameLineHeight = Math.round(nameSize * 1.3);
  const nameLines = grow >= 1.3 ? 3 : 2;
  const nameBlock = Math.ceil(nameLines * nameLineHeight * textScale) + 2;
  const width = padH * 2 + pillW * 2 + gap * 2 + col * COLUMN_COUNT;
  return {
    gutterW,
    viewport,
    padH,
    padV,
    gap,
    pillW,
    col,
    tile,
    nameGap,
    nameSize,
    nameLineHeight,
    nameLines,
    nameBlock,
    laneHeight: padV * 2 + tile + nameGap + nameBlock,
    wireY: padV + tile / 2,
    trackX: padH + pillW + gap,
    width,
    maxOffset: Math.max(0, Math.round(width - viewport)),
  };
}

/** Scroll offset that centres a column in the window, kept inside the lanes. */
export function centeredColumnOffset(metrics: PhoneLaneMetrics, column: number): number {
  const left = metrics.trackX + metrics.col * column;
  const centred = left - (metrics.viewport - metrics.col) / 2;
  // Go all the way to an end rather than leave a sliver of it showing.
  if (centred < metrics.col / 2) return 0;
  if (centred > metrics.maxOffset - metrics.col / 2) return metrics.maxOffset;
  return clamp(Math.round(centred), 0, metrics.maxOffset);
}

/** Where to scroll so a column is fully in view, or null when it already is. */
export function revealColumnOffset(metrics: PhoneLaneMetrics, column: number, offset: number): number | null {
  const left = metrics.trackX + metrics.col * column;
  const right = left + metrics.col;
  if (left >= offset - 1 && right <= offset + metrics.viewport + 1) return null;
  return centeredColumnOffset(metrics, column);
}

/** Resting points for a swipe: the start, each column's left edge, and the end. */
export function columnSnapOffsets(metrics: PhoneLaneMetrics): number[] {
  if (metrics.maxOffset <= 0) return [];
  const offsets = [0];
  for (let column = 0; column < COLUMN_COUNT; column += 1) {
    const x = Math.round(metrics.trackX + metrics.col * column);
    if (x > 0 && x < metrics.maxOffset) offsets.push(x);
  }
  offsets.push(metrics.maxOffset);
  return offsets;
}
