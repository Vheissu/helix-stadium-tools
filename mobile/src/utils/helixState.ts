export type HelixStateNode = Record<string, unknown>;

const isObject = (value: unknown): value is HelixStateNode =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const maybeExtractFlows = (value: unknown) => {
  if (isObject(value)) {
    const sfg = value.sfg_;
    if (isObject(sfg) && Array.isArray(sfg.flow)) {
      return sfg.flow;
    }
    if (Array.isArray(value.flow)) {
      return value.flow;
    }
  }
  return null;
};

export const findFirstKey = (value: unknown, targetKey: string): unknown => {
  const queue: unknown[] = [value];
  const seen = new Set<object>();

  while (queue.length) {
    const current = queue.shift();
    if (!current || typeof current !== 'object') continue;
    if (seen.has(current)) continue;
    seen.add(current);

    if (isObject(current) && Object.prototype.hasOwnProperty.call(current, targetKey)) {
      return current[targetKey];
    }

    if (Array.isArray(current)) {
      queue.push(...current);
    } else {
      queue.push(...Object.values(current));
    }
  }

  return null;
};

export const findFlows = (state: unknown): unknown[] | null => {
  const directMatch = maybeExtractFlows(state);
  if (directMatch) {
    return directMatch;
  }

  const queue: unknown[] = [state];
  const seen = new Set<object>();

  while (queue.length) {
    const current = queue.shift();
    if (!current || typeof current !== 'object') continue;
    if (seen.has(current)) continue;
    seen.add(current);

    const nestedMatch = maybeExtractFlows(current);
    if (nestedMatch) {
      return nestedMatch;
    }

    if (Array.isArray(current)) {
      queue.push(...current);
    } else {
      queue.push(...Object.values(current));
    }
  }

  return null;
};

export const hasFlowState = (state: unknown) => findFlows(state) !== null;

export const coerceHelixBoolean = (value: unknown, fallback = true): boolean => {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value !== 0;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (!normalized) return fallback;
    if (['0', 'false', 'off', 'disabled'].includes(normalized)) return false;
    if (['1', 'true', 'on', 'enabled'].includes(normalized)) return true;
    const numeric = Number(normalized);
    return Number.isFinite(numeric) ? numeric !== 0 : fallback;
  }
  return fallback;
};

export type SnapshotRef = HelixStateNode & {
  index: number;
};

export const extractSnapshots = (state: unknown): SnapshotRef[] => {
  const snapshots = findFirstKey(state, 'snps');
  if (!Array.isArray(snapshots)) return [];

  return snapshots
    .filter((item): item is HelixStateNode => isObject(item))
    .map((item) => {
      const index = Number(item.si__);
      return {
        ...item,
        index: Number.isFinite(index) ? index : -1,
      };
    })
    .filter((item) => item.index >= 0)
    .sort((left, right) => left.index - right.index);
};
