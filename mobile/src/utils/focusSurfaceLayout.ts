import { normalizeFocusPoint, type FocusPoint } from './focus';

export const FOCUS_INSET = 36;
export function focusSurfacePosition(point: FocusPoint, width: number, height: number) {
  const normalized = normalizeFocusPoint(point);
  return { x: FOCUS_INSET + (normalized.x + 1) / 2 * Math.max(1, width - FOCUS_INSET * 2),
    y: FOCUS_INSET + (1 - normalized.y) / 2 * Math.max(1, height - FOCUS_INSET * 2) };
}
export function focusPointAtPosition(x: number, y: number, width: number, height: number): FocusPoint {
  return normalizeFocusPoint({ x: (x - FOCUS_INSET) / Math.max(1, width - FOCUS_INSET * 2) * 2 - 1,
    y: 1 - (y - FOCUS_INSET) / Math.max(1, height - FOCUS_INSET * 2) * 2 });
}
