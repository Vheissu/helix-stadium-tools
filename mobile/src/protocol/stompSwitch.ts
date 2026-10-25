import { findFirstKey } from '../utils/helixState';
import { readBlockAt } from './blockCommands';
import type { StompRunResult } from './stompCommands';

type Entity = Record<string, unknown>;
type Value = number | boolean;
type Target = { flow: number; position: number; instanceId: number; modelId: number; slot: number; parameter: number | null };
export type StompController = { id: number; target: Target; low: Value; high: Value };
export interface StompSwitchPlan {
  bank: 'a' | 'b'; number: number; sourceId: number; snapshotIndex: number;
  controllers: StompController[]; commandIds: number[]; input: 0 | 1; fingerprint: string;
}
export interface StompSwitchTransport {
  activeId(): Promise<number | null>;
  state(): Promise<unknown>;
  isCurrent(): boolean;
  controller(id: number, value: number): Promise<unknown>;
  command(id: number): Promise<unknown>;
}
const object = (v: unknown): v is Entity => !!v && typeof v === 'object' && !Array.isArray(v);
const integer = (v: unknown, min = 0, max = 0x7fffffff): v is number => typeof v === 'number' && Number.isInteger(v) && v >= min && v <= max;
const value = (v: unknown): v is Value => typeof v === 'boolean' || (typeof v === 'number' && Number.isFinite(v));
const records = (v: unknown): Entity[] => Array.isArray(v) ? v.filter(object) : [];
const near = (a: Value, b: Value) => typeof a === 'boolean' || typeof b === 'boolean'
  ? Boolean(a) === Boolean(b) : Math.abs(a - b) <= 0.00005 * Math.max(1, Math.abs(b));
function canonical(v: unknown): string {
  if (Array.isArray(v)) return `[${v.map(canonical).join(',')}]`;
  if (object(v)) return `{${Object.keys(v).sort().map(k => `${JSON.stringify(k)}:${canonical(v[k])}`).join(',')}}`;
  return JSON.stringify(v) ?? 'undefined';
}
const configuration = (entity: Entity, runtime: string[]) => Object.fromEntries(Object.entries(entity).filter(([key]) => !runtime.includes(key)));
const unavailable = (reason: string) => ({ plan: null, active: null, reason });

function targetValue(state: unknown, target: Target): Value | null {
  const block = readBlockAt(state, target.flow, target.position);
  if (block?.id__ !== target.instanceId || block.mdls?.[target.slot]?.id__ !== target.modelId) return null;
  if (target.parameter === null) return value(block.enbl) ? Boolean(block.enbl) : null;
  const parameters = block.mdls[target.slot].parm?.filter(p => p.pid_ === target.parameter) ?? [];
  return parameters.length === 1 && value(parameters[0].valu) ? parameters[0].valu : null;
}

/** Match stable block identities rather than treating global graph IDs as path positions. */
function locate(state: unknown, target: Entity): Target | null {
  if (!integer(target.eID_) || !integer(target.mmid) || !integer(target.slot, 0, 31)) return null;
  if (target.type !== 1 && target.type !== 2) return null;
  if (target.type === 2 && !integer(target.pid_)) return null;
  const matches: Target[] = [];
  for (let flow = 0; flow < 2; flow++) for (let position = 0; position < 28; position++) {
    const block = readBlockAt(state, flow, position);
    if (block?.id__ === target.eID_ && block.mdls?.[target.slot]?.id__ === target.mmid) {
      matches.push({ flow, position, instanceId: target.eID_, modelId: target.mmid, slot: target.slot,
        parameter: target.type === 1 ? null : target.pid_ as number });
    }
  }
  return matches.length === 1 ? matches[0] : null;
}

/** Read a switch from the current edit buffer, including unsaved assignments. */
export function readStompSwitch(state: unknown, bank: 'a' | 'b', number: number): {
  plan: StompSwitchPlan | null; active: boolean | null; reason: string | null;
} {
  if (!['a', 'b'].includes(bank) || ![1, 2, 3, 4, 5, 7, 8, 9, 10, 11].includes(number)) return unavailable('This is a dedicated Stadium switch.');
  const graph = findFirstKey(state, 'cg__');
  if (!object(graph) || !object(graph.entt) || !integer(graph.asnp, 0, 7)) return unavailable('Refresh to read the current switch assignments.');
  const entities = graph.entt, sources = records(entities.srcs);
  if (!Array.isArray(entities.srcs) || !Array.isArray(entities.ctrl) || !Array.isArray(entities.trgs) ||
      !Array.isArray(entities.cmnd) || !object(entities.sm__) || !Array.isArray(entities.sm__.scid) || entities.sm__.scid.length % 2 !== 0) {
    return unavailable('Refresh to read the complete switch assignments.');
  }
  const matches = sources.filter(s => s.type === 1 && s.ctxt === (bank === 'a' ? 1 : 2) && s.locl === 24 + number);
  if (!matches.length) return unavailable('No effects or commands are assigned.');
  if (matches.length !== 1 || !integer(matches[0].id__, 1)) return unavailable('Refresh to verify this switch.');
  const source = matches[0];
  if (sources.filter(s => s.id__ === source.id__).length !== 1) return unavailable('Refresh to verify this switch.');
  // byps is the current switch state, not a configuration flag disabling the switch.
  if (source.mtyp !== 0 || source.mtms !== 0 || source.cnt1 !== 0 || source.cnt2 !== 0 || source.cnt3 !== 0) {
    return unavailable('This timed switch setup needs the Stadium footswitch.');
  }
  if (!Array.isArray(source.cmds) || source.cmds.length !== 2 || !source.cmds.every(id => id === -1 || integer(id, 1))) {
    return unavailable('Refresh to verify the switch commands.');
  }
  const commandIds = source.cmds.filter((id): id is number => id !== -1);
  if (new Set(commandIds).size !== commandIds.length) return unavailable('Refresh to verify the switch commands.');
  const commands: Entity[] = [];
  for (const id of commandIds) {
    const found = records(entities.cmnd).filter(c => c.cid_ === id);
    if (found.length !== 1 || found[0].trig !== source.id__) return unavailable('Refresh to verify the switch commands.');
    if (sources.some(s => s !== source && Array.isArray(s.cmds) && s.cmds.includes(id))) return unavailable('Refresh to verify the switch commands.');
    const command = found[0];
    if (!integer(command.type, 1, 7)) return unavailable('This command type is unavailable on this device.');
    // ExecuteCommand evaluates the stored command, but does not synthesize hardware
    // edges or schedule delayed actions. Only commands assigned to Press run on a tap.
    if (command.behv !== 0 || command.pvla !== 0 || command.dlay !== 0) {
      return unavailable('Release, Hold, Toggle and delayed commands need the Stadium footswitch.');
    }
    if (command.type === 4 && command.func === 2) return unavailable('This command uses a dedicated Stadium switch.');
    commands.push(configuration(found[0], ['togl']));
  }
  const map = object(entities.sm__) ? entities.sm__.scid : null;
  const mappings: unknown[] = [];
  if (Array.isArray(map)) for (let i = 0; i + 1 < map.length; i += 2) if (map[i] === source.id__) mappings.push(map[i + 1]);
  if (mappings.length > 1 || (mappings.length && !Array.isArray(mappings[0]))) return unavailable('Refresh to verify the assigned effects.');
  const ids = (mappings[0] ?? []) as unknown[];
  if (!ids.every(id => integer(id, 1)) || new Set(ids).size !== ids.length) return unavailable('Refresh to verify the assigned effects.');
  const linked = records(entities.ctrl).filter(c => c.trig === source.id__);
  if (linked.length !== ids.length || linked.some(c => !integer(c.cid_, 1) || !ids.includes(c.cid_))) return unavailable('Refresh to verify the assigned effects.');
  const controllers: StompController[] = [], fingerprints: unknown[] = [], positions: Array<0 | 1 | null> = [], enabled: Array<boolean | null> = [];
  for (const id of ids) {
    const found = records(entities.ctrl).filter(c => c.cid_ === id);
    if (found.length !== 1 || found[0].trig !== source.id__) return unavailable('Refresh to verify the assigned effects.');
    const controller = found[0];
    const targets = records(entities.trgs).filter(t => t.id__ === controller.tid_);
    if (targets.length !== 1 || !integer(controller.type, 1, 3) || !value(controller.min_) || !value(controller.max_)) {
      return unavailable('This switch includes an unavailable assignment.');
    }
    if (controller.behv !== 0) return unavailable('Momentary and continuous assignments need the Stadium footswitch.');
    if (controller.dlay !== 0 || controller.thrs !== 0 || controller.goid !== 0) return unavailable('This timed assignment needs the Stadium footswitch.');
    const target = locate(state, targets[0]);
    if (!target) return unavailable('The assigned block changed. Refresh the preset.');
    // Controller bypass values are bypass polarity; edit-buffer enbl uses enable polarity.
    const endpoint = (v: Value) => controller.type === 1 ? Boolean(v) : controller.type === 2 ? Math.round(Number(v)) : Number(v);
    const low = target.parameter === null ? !controller.min_ : endpoint(controller.min_);
    const high = target.parameter === null ? !controller.max_ : endpoint(controller.max_);
    const current = targetValue(state, target);
    if (current === null) return unavailable('Refresh to read the assigned values.');
    controllers.push({ id: id as number, target, low, high });
    enabled.push(target.parameter === null ? Boolean(current) : near(current, low) && near(current, high) ? null
      : near(current, high) ? true : near(current, low) ? false : null);
    positions.push(near(current, low) && near(current, high) ? null : near(current, high) ? 1 : near(current, low) ? 0
      : Math.abs(Number(current) - Number(high)) < Math.abs(Number(current) - Number(low)) ? 1 : 0);
    fingerprints.push({ controller: configuration(controller, ['togl']), target: targets[0], location: target });
  }
  if (!controllers.length && !commandIds.length) return unavailable('No effects or commands are assigned.');
  const active = enabled.length && enabled.every(p => p === true) ? true : enabled.length && enabled.every(p => p === false) ? false : null;
  const reference = positions.find(p => p !== null);
  const input: 0 | 1 = reference === 1 ? 0 : 1;
  return { plan: { bank, number, sourceId: source.id__ as number, snapshotIndex: graph.asnp, controllers, commandIds, input,
    fingerprint: canonical({ source: configuration(source, ['byps']), controllers: fingerprints, commands }) }, active, reason: null };
}

/** Execute a configured switch once. Never replay a command after an uncertain acknowledgement. */
export async function executeStompSwitch(io: StompSwitchTransport, presetId: number, expected: StompSwitchPlan): Promise<StompRunResult & { state?: unknown }> {
  let attempted = 0, confirmed = 0;
  const total = expected.controllers.length + expected.commandIds.length;
  const stopped = (message: string) => ({ status: attempted > confirmed ? 'unconfirmed' as const : 'stopped' as const,
    attempted, confirmed, total, message: `${confirmed} of ${total} actions confirmed. ${message} Nothing was retried.` });
  if (!integer(presetId, 1) || total < 1 || total > 128) return stopped('Refresh before pressing this switch.');
  const check = async () => {
    if (!io.isCurrent() || await io.activeId() !== presetId) throw Error('The connection or selected preset changed.');
    const state = await io.state();
    if (!io.isCurrent() || await io.activeId() !== presetId) throw Error('The connection or selected preset changed.');
    const current = readStompSwitch(state, expected.bank, expected.number).plan;
    if (!current || current.snapshotIndex !== expected.snapshotIndex || current.fingerprint !== expected.fingerprint) {
      throw Error('The snapshot or switch assignments changed. Refresh before trying again.');
    }
    return { current, state };
  };
  try {
    const { current } = await check();
    if (current.controllers.length) {
      if (!io.isCurrent()) return stopped('The connection or selection changed.');
      const replies = await Promise.allSettled(current.controllers.map(async controller => {
        attempted++;
        const reply = await io.controller(controller.id, current.input);
        if (!Array.isArray(reply) || reply.length !== 3 || !integer(reply[0], 1) || reply[1] !== 0 || !integer(reply[2])) throw Error('The Stadium did not confirm an effect change.');
        return controller;
      }));
      const { state } = await check();
      for (const reply of replies) {
        if (reply.status === 'fulfilled') {
          const actual = targetValue(state, reply.value.target);
          if (actual !== null && near(actual, current.input ? reply.value.high : reply.value.low)) confirmed++;
        }
      }
      if (confirmed !== current.controllers.length) return stopped('Some assigned values were not confirmed. Refresh and check the preset.');
    }
    for (const id of current.commandIds) {
      await check();
      if (!io.isCurrent()) return stopped('The connection or selection changed.');
      attempted++;
      const reply = await io.command(id);
      if (!Array.isArray(reply) || reply.length !== 3 || !integer(reply[0], 1) || reply[1] !== id || reply[2] !== 0) return stopped('Check the preset and connected equipment before pressing again.');
      confirmed++;
    }
    // A configured final command may legitimately select another snapshot or preset.
    // Its acknowledgement confirms the action; do not turn that success into a failure.
    let state: unknown;
    try {
      if (io.isCurrent() && await io.activeId() === presetId) {
        const candidate = await io.state();
        if (io.isCurrent() && await io.activeId() === presetId && io.isCurrent()) state = candidate;
      }
    } catch { /* A later refresh can read the confirmed result. */ }
    return { status: 'complete', attempted, confirmed, total, state, message: 'Switch applied.' };
  } catch (error) {
    return stopped(error instanceof Error ? error.message : 'Refresh and check the connection.');
  }
}
