import { findFirstKey } from './helixState';

export type PerformView = 'a' | 'b' | 'snapshots';
export type StompSwitch = { number: number; label: string; color: number | null; assigned: boolean };
export type StompBanks = Record<'a' | 'b', StompSwitch[]>;
const SWITCHES = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11];
const record = (value: unknown): Record<string, unknown> | null =>
  value !== null && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : null;
const records = (value: unknown) => Array.isArray(value) ? value.map(record).filter(item => item !== null) : [];

/** Read the two preset banks. MODE (6) and TAP (12) are dedicated switches. */
export function extractStompBanks(state: unknown, modelName: (id: number, paramId?: number) => string | undefined): StompBanks | null {
  const properties = records(findFirstKey(state, 'pm__'));
  const graph = record(findFirstKey(state, 'cg__'));
  const entities = record(graph?.entt);
  if (!properties.some(p => typeof p.key_ === 'string' && p.key_.startsWith('preset.floorboard.stomp.')) && !entities) return null;
  const values = new Map(properties.map(p => [p.key_, p.val_]));
  const sources = records(entities?.srcs);
  const controls = records(entities?.ctrl);
  const targets = records(entities?.trgs);
  const sourceMap = record(entities?.sm__)?.scid;
  const controllerIds = new Map<unknown, unknown[]>();
  if (Array.isArray(sourceMap)) {
    for (let i = 0; i + 1 < sourceMap.length; i += 2) {
      if (Array.isArray(sourceMap[i + 1])) controllerIds.set(sourceMap[i], sourceMap[i + 1]);
    }
  }
  const bank = (key: 'a' | 'b') => SWITCHES.map(number => {
    // Captured Stadium source graph: local switches 25..36; contexts 1=A, 9=B.
    const assignedSources = sources.filter(s => s.type === 1 && s.ctxt === (key === 'a' ? 1 : 9) && s.locl === 24 + number);
    const assignedControls = assignedSources.flatMap(s => (controllerIds.get(s.id__) ?? [])
      .flatMap(id => controls.filter(c => c.cid_ === id)));
    const assignedTargets = assignedControls.flatMap(c => targets.filter(t => t.id__ === c.tid_));
    const names = [...new Set(assignedTargets.flatMap(t => typeof t.mmid === 'number' ? [modelName(t.mmid,
      t.type === 2 && typeof t.pid_ === 'number' ? t.pid_ : undefined)].filter((name): name is string => !!name) : []))];
    const hasCommands = assignedSources.some(s => Array.isArray(s.cmds) && s.cmds.some(id => typeof id === 'number' && id >= 0));
    const custom = values.get(`preset.floorboard.stomp.${key}.${number}.label`);
    const label = typeof custom === 'string' ? custom.trim() : '';
    const assigned = assignedControls.length > 0 || hasCommands;
    const color = values.get(`preset.floorboard.stomp.${key}.${number}.color`);
    return { number, label: label || (hasCommands ? [...names, 'Command'].join(' + ') : names.join(' + ')) || (assigned ? 'Assigned' : 'Unassigned'),
      color: typeof color === 'number' && Number.isInteger(color) && color >= 0 && color <= 11 ? color : null, assigned };
  });
  return { a: bank('a'), b: bank('b') };
}
