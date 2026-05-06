// Looks up parameter help text extracted from the desktop editor.
//
// The catalogue is keyed by string(model_id). Param names occasionally drift
// between the desktop editor strings and our protocol output (extra spaces,
// capitalisation), so we fall back to a normalised match when an exact key
// miss happens.

import paramHelp from '../data/paramHelp.json';

type ParamHelpEntry = {
  category?: string | null;
  name?: string | null;
  params: Record<string, string>;
};

const HELP: Record<string, ParamHelpEntry> = paramHelp as Record<string, ParamHelpEntry>;

const normalise = (raw: string) => raw.toLowerCase().replace(/[^a-z0-9]/g, '');

export const lookupParamHelp = (
  modelId: number | null | undefined,
  paramName: string | null | undefined,
): string | null => {
  if (!modelId || !paramName) return null;
  const entry = HELP[String(modelId)];
  if (!entry) return null;
  const direct = entry.params[paramName];
  if (direct) return direct;
  const target = normalise(paramName);
  for (const key of Object.keys(entry.params)) {
    if (normalise(key) === target) return entry.params[key];
  }
  return null;
};

export const lookupModelHelpName = (modelId: number | null | undefined): string | null => {
  if (!modelId) return null;
  return HELP[String(modelId)]?.name ?? null;
};
