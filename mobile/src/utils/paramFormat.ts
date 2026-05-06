// Shared value formatter for parameter controls (knobs and sliders).

export type ParamValueType = 'i' | 'f' | 'b';

export const formatParamValue = (
  val: number | boolean,
  min: number,
  max: number,
  displayMin?: number,
  displayMax?: number,
  unit?: string | null,
  type?: ParamValueType,
  options?: string[] | null,
): string => {
  if (type === 'b') return val ? 'On' : 'Off';
  if (options && options.length) {
    const idx = typeof val === 'boolean' ? (val ? 1 : 0) : Math.round(Number(val)) - min;
    if (idx >= 0 && idx < options.length) return options[idx];
  }
  const numeric = typeof val === 'boolean' ? (val ? 1 : 0) : Number(val);
  if (typeof displayMin === 'number' && typeof displayMax === 'number') {
    const range = max - min;
    const t = range > 0 ? (numeric - min) / range : 0;
    const displayVal = displayMin + t * (displayMax - displayMin);
    const formatted = type === 'i' ? Math.round(displayVal).toString() : displayVal.toFixed(1);
    return unit && unit !== 'unitless' ? `${formatted} ${unit}` : formatted;
  }
  const formatted = type === 'i' ? Math.round(numeric).toString() : numeric.toFixed(1);
  return unit && unit !== 'unitless' ? `${formatted} ${unit}` : formatted;
};
