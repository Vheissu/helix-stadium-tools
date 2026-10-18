export const formatTempoBpm = (value: number | null | undefined): string => {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return '\u2014';
  }

  const rounded = Number(value.toFixed(1));
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
};

/** Stadium positions are zero-based; each bank contains A, B, C and D. */
export const formatPresetPosition = (position: number | null | undefined): string => {
  if (typeof position !== 'number' || !Number.isSafeInteger(position) || position < 0) return '\u2014';
  return `${Math.floor(position / 4) + 1}${'ABCD'[position % 4]}`;
};
