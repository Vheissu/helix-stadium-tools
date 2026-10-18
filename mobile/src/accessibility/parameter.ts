export interface ParameterRange {
  min: number; max: number; type: 'i' | 'f' | 'b';
  displayMin?: number; displayMax?: number; options?: string[] | null;
  step?: number;
}
export function parameterStep(p: ParameterRange): number {
  if (p.type === 'b' || p.type === 'i' || p.options?.length) return 1;
  if (p.step !== undefined && Number.isFinite(p.step) && p.step > 0) return p.step;
  const span = p.max - p.min;
  const displaySpan = Math.abs((p.displayMax ?? p.max) - (p.displayMin ?? p.min));
  // One displayed tenth for small ranges; 1% for large ranges. Exact entry remains available.
  const displayStep = displaySpan <= 20 ? 0.1 : displaySpan <= 200 ? 1 : displaySpan / 100;
  return displaySpan > 0 ? span * displayStep / displaySpan : 0;
}
export function adjustParameter(value: number | boolean, direction: -1 | 1, p: ParameterRange): number | boolean {
  if (p.type === 'b') return direction > 0;
  const max = p.options?.length ? Math.min(p.max, p.min + p.options.length - 1) : p.max;
  const current = Number.isFinite(Number(value)) ? Number(value) : p.min;
  return Math.max(p.min, Math.min(max, Number((current + direction * parameterStep(p)).toFixed(10))));
}
export function parseParameterInput(text: string, p: ParameterRange): number | null {
  if (!/^[+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)$/.test(text.trim())) return null;
  const displayed = Number(text.trim().replace(',', '.'));
  if (!Number.isFinite(displayed)) return null;
  const hasDisplay = p.displayMin !== undefined && p.displayMax !== undefined;
  const low = hasDisplay ? Math.min(p.displayMin!, p.displayMax!) : p.min;
  const high = hasDisplay ? Math.max(p.displayMin!, p.displayMax!) : p.max;
  if (displayed < low || displayed > high) return null;
  const span = (p.displayMax ?? p.max) - (p.displayMin ?? p.min);
  const raw = hasDisplay && span !== 0 ? p.min + (displayed - p.displayMin!) / span * (p.max - p.min) : displayed;
  const stepped = p.step !== undefined && Number.isFinite(p.step) && p.step > 0 ? p.min + Math.round((raw - p.min) / p.step) * p.step : raw;
  return Math.max(p.min, Math.min(p.max, p.type === 'i' ? Math.round(raw) : stepped));
}
