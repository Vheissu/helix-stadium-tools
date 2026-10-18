import catalogue from '../data/focusModels.json';

export type FocusValue = number | boolean;
export type FocusRegion = 0 | 1 | 2 | 3 | 4;
export interface FocusParameter {
  id: number; key: string; behavior: 'interpolate' | 'quantize';
  type: 'f' | 'i' | 'b'; min: number; max: number; values: FocusValue[];
}
export interface FocusDefinition { key: string; names: string[]; params: FocusParameter[] }
export interface FocusChange { id: number; key: string; type: 'f' | 'i' | 'b'; value: FocusValue }
export interface FocusPoint { x: number; y: number }
const models = catalogue as unknown as Record<string, FocusDefinition>;
export const getFocusDefinition = (id: number): FocusDefinition | null => models[String(id)] ?? null;
export const FOCUS_POINTS: readonly FocusPoint[] = [
  { x: 0, y: 0 }, { x: -1, y: -1 }, { x: -1, y: 1 }, { x: 1, y: -1 }, { x: 1, y: 1 },
];

export function normalizeFocusPoint(point: FocusPoint): FocusPoint {
  if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) throw new Error('Choose a valid Focus position.');
  const axis = (value: number) => {
    const bounded = Math.max(-1, Math.min(1, value));
    const rounded = Math.sign(bounded) * Math.round(Math.abs(bounded) * 100) / 100;
    return rounded === 0 ? 0 : rounded;
  };
  return { x: axis(point.x), y: axis(point.y) };
}

/** Stadium 1.4 uses four triangles, each joining the origin to one outside edge. */
export function focusWeights(point: FocusPoint): Array<{ region: FocusRegion; weight: number }> {
  const { x, y } = normalizeFocusPoint(point);
  const f32 = Math.fround;
  const diagonal = f32(Math.SQRT1_2);
  // Keep the firmware's float32 rotations: rounding affects discrete-choice boundaries.
  const sx = f32(f32(x) * diagonal), sy = f32(f32(y) * diagonal);
  let major: number, minor: number, first: FocusRegion, second: FocusRegion;
  if (x >= 0 && x > -y && x >= y) { major = sx; minor = sy; first = 4; second = 3; }
  else if (y > Math.abs(x)) { major = sy; minor = -sx; first = 2; second = 4; }
  else if (-x >= Math.abs(y) && x < 0) { major = -sx; minor = -sy; first = 1; second = 2; }
  else { major = -sy; minor = sx; first = 3; second = 1; }
  const part = f32(minor * diagonal);
  const a = f32(major * diagonal + part), b = f32(major * diagonal - part);
  const centre = f32(f32(1 - a) - b);
  const clamp = (value: number) => Math.max(0, Math.min(1, value));
  return [{ region: 0, weight: clamp(centre) }, { region: first, weight: clamp(a) }, { region: second, weight: clamp(b) }];
}

export function focusChanges(definition: FocusDefinition, point: FocusPoint): FocusChange[] {
  const weights = focusWeights(point);
  const strongest = weights.reduce((best, item) => item.weight > best.weight ? item : best);
  return definition.params.map(param => {
    const mixed = param.behavior === 'quantize'
      ? Number(param.values[strongest.region])
      : weights.reduce((sum, item) => Math.fround(sum + Math.fround(Number(param.values[item.region])) * item.weight), 0);
    if (!Number.isFinite(mixed) || !Number.isFinite(param.min) || !Number.isFinite(param.max) || param.min > param.max) {
      throw new Error('This model has an invalid Focus definition.');
    }
    const limited = Math.max(param.min, Math.min(param.max, mixed));
    const value = param.type === 'b' ? limited >= 0.5 : param.type === 'i' ? Math.floor(limited + 0.5) : limited;
    return { id: param.id, key: param.key, type: param.type, value };
  });
}

export const focusMatches = (changes: FocusChange[], values: Record<string, FocusValue>) =>
  changes.every(change => values[change.key] !== undefined &&
    (typeof change.value === 'boolean' ? Boolean(values[change.key]) === change.value : Math.abs(Number(values[change.key]) - change.value) <= 0.00002 * Math.max(1, Math.abs(change.value))));
