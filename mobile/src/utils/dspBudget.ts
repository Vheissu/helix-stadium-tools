// These are catalogue estimates, not measurements of the device's CPU load.
export const STANDARD_DSP_CAP = 66;
export const EXTENDED_DSP_CAP = 82;

export const getDspLimit = (extended = false) => extended ? EXTENDED_DSP_CAP : STANDARD_DSP_CAP;

export function getDspHeadroom(pathUsage: number, replacedUsage = 0, extended = false) {
  if (![pathUsage, replacedUsage].every((value) => Number.isFinite(value) && value >= 0)) {
    return Number.NEGATIVE_INFINITY;
  }
  // Preserve negative headroom: an already-overloaded path must not accept
  // even a zero-cost insertion when the override is switched off.
  return getDspLimit(extended) - pathUsage + replacedUsage;
}

export function fitsDspBudget(requiredUsage: number, headroom: number) {
  return Number.isFinite(requiredUsage) && requiredUsage >= 0 &&
    Number.isFinite(headroom) && requiredUsage <= headroom;
}
