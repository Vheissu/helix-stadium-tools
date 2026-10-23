import type { HelixClient } from './helixClient';

/**
 * Development stand-in for a connected Stadium, used with the sample preset.
 *
 * Every command resolves without doing anything, so the editor's optimistic
 * updates stay on screen. Reads resolve to null, which the editor treats as
 * "no new state" and leaves the local preset alone.
 */
export function createDemoClient(): HelixClient {
  const resolveNull = () => Promise.resolve(null);
  // Library reads return lists on a real Stadium; an empty one means "no presets".
  const resolveEmpty = () => Promise.resolve([]);
  const listReads = new Set(['getContainerContents', 'getSnapshots']);
  const stub: ProxyHandler<object> = {
    get(_target, key) {
      if (key === 'then') return undefined;
      if (key === 'tempo') return new Proxy({}, stub);
      return typeof key === 'string' && listReads.has(key) ? resolveEmpty : resolveNull;
    },
  };
  return new Proxy({}, stub) as unknown as HelixClient;
}
