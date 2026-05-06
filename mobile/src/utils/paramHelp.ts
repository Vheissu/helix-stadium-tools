// Resolves help text for a parameter.
//
// The mobile catalogues (blockTypes.json, ioModels.json) already include
// per-parameter `description` strings sourced from the desktop editor — those
// are our primary source of truth and cover ~99% of params. The standalone
// paramHelp.json catalogue extracted from `parameter-meta` exists as a
// safety net for params that lack an inline description (typically IO models
// and a handful of edge cases). It is keyed by the desktop editor's internal
// model_id which does NOT match our protocol model ids, so the fallback
// match is best-effort by param name.

import paramHelp from '../data/paramHelp.json';

type ParamHelpEntry = {
  category?: string | null;
  name?: string | null;
  params: Record<string, string>;
};

type ParamLike = {
  name?: string | null;
  description?: string | null;
};

const HELP: Record<string, ParamHelpEntry> = paramHelp as Record<string, ParamHelpEntry>;

const normalise = (raw: string) => raw.toLowerCase().replace(/[^a-z0-9]/g, '');

const lookupByName = (paramName: string): string | null => {
  // Walk the whole catalogue — slow in theory, fine in practice (~700 models).
  // Returns the first match. A param name like "Decay" appears across many
  // reverb models with the same description, so a global lookup is acceptable
  // when the protocol model_id can't index us into the right entry directly.
  const target = normalise(paramName);
  for (const entry of Object.values(HELP)) {
    for (const key of Object.keys(entry.params)) {
      if (normalise(key) === target) {
        const value = entry.params[key];
        if (value) return value;
      }
    }
  }
  return null;
};

export const getParamHelp = (param: ParamLike | null | undefined): string | null => {
  if (!param) return null;
  const inline = (param.description ?? '').trim();
  if (inline) return inline;
  if (!param.name) return null;
  return lookupByName(param.name);
};
