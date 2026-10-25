import { findFirstKey } from '../utils/helixState';

type Entity = Record<string, unknown>;

export interface StompCommandPlan {
  number: number;
  snapshotIndex: number;
  sourceId: number;
  commandIds: number[];
  fingerprint: string;
}

export interface StompCommandTransport {
  activeId: () => Promise<number | null>;
  state: () => Promise<unknown>;
  isCurrent: () => boolean;
  send: (command: { address: string; types: string; args: number[] }) => Promise<unknown>;
}

export interface StompRunResult {
  status: 'complete' | 'stopped' | 'unconfirmed';
  confirmed: number;
  attempted: number;
  total: number;
  message: string;
}

const object = (value: unknown): value is Entity =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
const integer = (value: unknown, min: number, max: number): value is number =>
  typeof value === 'number' && Number.isInteger(value) && value >= min && value <= max;
const id = (value: unknown): value is number => integer(value, 1, 0x7fffffff);
const unavailable = (reason: string) => ({ plan: null, reason });
const snapshotFlags = 'abcdefghijkl'.split('').map(suffix => `psp${suffix}`);

/** Stable configuration identity, independent of object key insertion order. */
function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (object(value)) {
    return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonical(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value) ?? 'undefined';
}

/** Only the existing, hardware-verified immediate Press MIDI CC commands are eligible. */
export function readStompCommands(state: unknown, bank: 'a' | 'b', number: number): {
  plan: StompCommandPlan | null;
  reason: string | null;
} {
  if (bank !== 'b') return unavailable('Commands are available for Stomp B only.');
  if (![1, 2, 3, 4, 5, 7, 8, 9, 10, 11].includes(number)) {
    return unavailable('Commands are unavailable for this switch.');
  }
  const graph = findFirstKey(state, 'cg__');
  if (!object(graph) || !object(graph.entt) || !Array.isArray(graph.entt.srcs)) {
    return unavailable('Switch assignments could not be read.');
  }
  const sources = graph.entt.srcs.filter(object);
  const matching = sources.filter(source => source.type === 1 && source.ctxt === 2 && source.locl === 24 + number);
  if (matching.length !== 1) return unavailable('Switch assignments could not be verified.');
  const source = matching[0];
  if (!id(source.id__) || sources.filter(item => item.id__ === source.id__).length !== 1) {
    return unavailable('Switch assignments could not be verified.');
  }
  const slots = source.cmds;
  if (!Array.isArray(slots) || slots.length !== 2 ||
      ![0, 1].every(slot => slots[slot] === -1 || id(slots[slot]))) {
    return unavailable('Command assignments could not be verified.');
  }
  const commandIds = slots.filter((value): value is number => value !== -1);
  if (!commandIds.length) return unavailable('No commands are assigned to this switch.');
  if (new Set(commandIds).size !== commandIds.length) return unavailable('Command assignments could not be verified.');
  if (sources.some(other => other !== source && Array.isArray(other.cmds) &&
      commandIds.some(commandId => (other.cmds as unknown[]).includes(commandId)))) {
    return unavailable('Command assignments could not be verified.');
  }
  if (source.mtyp !== 0 || source.mtms !== 0 || source.cnt1 !== 0 || source.cnt2 !== 0 || source.cnt3 !== 0) {
    return unavailable('This switch setup has not been verified for remote commands.');
  }
  if (!integer(graph.asnp, 0, 7)) return unavailable('The current snapshot could not be verified.');
  if (!Array.isArray(graph.entt.cmnd)) return unavailable('Command assignments could not be read.');
  const entities = graph.entt.cmnd.filter(object);
  const commands: Entity[] = [];
  for (const commandId of commandIds) {
    const matches = entities.filter(command => command.cid_ === commandId);
    if (matches.length !== 1) return unavailable('Command assignments could not be verified.');
    const command = matches[0];
    if (command.type !== 6 || command.func !== 1 || command.pvlb !== 1) {
      return unavailable('Only MIDI CC commands can currently run from the app.');
    }
    if (command.pvla !== 0 || command.behv !== 0 || command.dlay !== 0 || command.thrs !== 0 || command.goid !== 0 || command.curv !== 5) {
      return unavailable('Only immediate Press commands can currently run from the app.');
    }
    if (command.trig !== source.id__ || !snapshotFlags.every(flag => command[flag] === false)) {
      return unavailable('This command setup has not been verified for remote use.');
    }
    if (!integer(command.pvlc, 1, 16) || !integer(command.pvlg, 0, 127) || !integer(command.pvlh, 0, 127)) {
      return unavailable('The MIDI command settings could not be verified.');
    }
    // Execution changes togl even for Press commands. It is runtime state, not configuration.
    const configuration = Object.fromEntries(Object.entries(command).filter(([key]) => key !== 'togl'));
    commands.push(configuration);
  }
  return {
    plan: {
      number,
      snapshotIndex: graph.asnp,
      sourceId: source.id__,
      commandIds,
      fingerprint: canonical({ snapshotIndex: graph.asnp, source: Object.fromEntries(Object.entries(source).filter(([key]) => key !== 'byps')), commands }),
    },
    reason: null,
  };
}

const samePlan = (current: StompCommandPlan, expected: StompCommandPlan) =>
  current.number === expected.number && current.sourceId === expected.sourceId &&
  current.snapshotIndex === expected.snapshotIndex && current.fingerprint === expected.fingerprint &&
  current.commandIds.length === expected.commandIds.length &&
  current.commandIds.every((commandId, slot) => commandId === expected.commandIds[slot]);

function stoppedResult(confirmed: number, attempted: number, total: number, reason: string): StompRunResult {
  const remaining = total - attempted;
  const uncertain = attempted > confirmed;
  return {
    status: uncertain ? 'unconfirmed' : 'stopped',
    confirmed, attempted, total,
    message: `${confirmed} of ${total} commands confirmed. ${uncertain ? '1 command may have run without confirmation. ' : ''}${remaining} ${remaining === 1 ? 'command remains' : 'commands remain'} unsent. Nothing was retried. ${reason}`,
  };
}

/** Run each stored command once, checking the current selection and configuration before every send. */
export async function executeStompCommands(
  io: StompCommandTransport, presetId: number, expected: StompCommandPlan,
): Promise<StompRunResult> {
  // Copy the caller's plan before awaiting so UI refreshes cannot change the approved group.
  const plan = { ...expected, commandIds: [...expected.commandIds] };
  const total = plan.commandIds.length;
  let attempted = 0;
  let confirmed = 0;
  if (!id(presetId) || total < 1 || total > 2) {
    return stoppedResult(confirmed, attempted, total, 'Refresh the switch assignments before trying again.');
  }
  for (const commandId of plan.commandIds) {
    try {
      if (!io.isCurrent()) return stoppedResult(confirmed, attempted, total, 'The connection or selection changed.');
      const before = await io.activeId();
      if (!io.isCurrent()) return stoppedResult(confirmed, attempted, total, 'The connection or selection changed.');
      const state = await io.state();
      if (!io.isCurrent()) return stoppedResult(confirmed, attempted, total, 'The connection or selection changed.');
      const after = await io.activeId();
      if (before !== presetId || after !== presetId) {
        return stoppedResult(confirmed, attempted, total, 'The selected preset changed or could not be verified.');
      }
      const current = readStompCommands(state, 'b', plan.number).plan;
      if (!current || !samePlan(current, plan)) {
        return stoppedResult(confirmed, attempted, total, 'The snapshot or switch assignments changed. Refresh before trying again.');
      }
      if (!io.isCurrent()) return stoppedResult(confirmed, attempted, total, 'The connection or selection changed.');
    } catch {
      return stoppedResult(confirmed, attempted, total, 'The current switch assignments could not be verified.');
    }
    attempted += 1;
    try {
      const reply = await io.send({ address: '/ExecuteCommand', types: 'i', args: [commandId] });
      if (!Array.isArray(reply) || reply.length !== 3 || !id(reply[0]) ||
          !id(reply[1]) || reply[1] !== commandId || reply[2] !== 0) {
        return stoppedResult(confirmed, attempted, total, 'Check connected equipment before running again.');
      }
      confirmed += 1;
    } catch {
      return stoppedResult(confirmed, attempted, total, 'Check connected equipment before running again.');
    }
  }
  return { status: 'complete', confirmed, attempted, total, message: `${confirmed} of ${total} commands confirmed.` };
}
