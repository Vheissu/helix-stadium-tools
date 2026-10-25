import { readBlockAt } from './blockCommands';
import { findFirstKey } from '../utils/helixState';
import type { FocusTarget } from './focusSession';

export interface SnapshotParameter { id: number; value: number | boolean; assigned: boolean; targetId: number; controllerId: number }
export type SnapshotAssignmentTarget = FocusTarget;
interface LiveParameter { pid_: number; valu: number | boolean; snap?: boolean; tid_?: number; cid_?: number }
export function readSnapshotParameters(state: unknown, target: SnapshotAssignmentTarget): SnapshotParameter[] {
  const model = readBlockAt(state, target.flow, target.blockId)?.mdls?.[target.slot ?? 0];
  if (model?.id__ !== target.modelId || (findFirstKey(state, 'cg__') as { asnp?: number } | null)?.asnp !== target.snapshotIndex) {
    throw new Error('The block or snapshot changed. Close and reopen Snapshot controls.');
  }
  return ((model.parm ?? []) as LiveParameter[]).filter(p => Number.isInteger(p.pid_) &&
    (typeof p.valu === 'boolean' || (typeof p.valu === 'number' && Number.isFinite(p.valu))))
    .map(p => ({ id: p.pid_, value: p.valu, assigned: p.snap === true, targetId: p.tid_ ?? 0, controllerId: p.cid_ ?? 0 }));
}
export function snapshotAssignmentCommand(target: SnapshotAssignmentTarget, parameter: SnapshotParameter, assigned: boolean, type: 'f' | 'i' | 'b') {
  if (!assigned) {
    if (!Number.isInteger(parameter.targetId) || parameter.targetId <= 0) throw new Error('The snapshot assignment could not be read. Refresh and try again.');
    return { address: '/removeSnapshotTarget', types: 'i', args: [parameter.targetId] };
  }
  const tag = type === 'b' ? (parameter.value ? 'T' : 'F') : type;
  return { address: '/assignSnapParam', types: `iiii${tag}`, args: [target.flow, target.blockId, target.slot ?? 0, parameter.id, parameter.value] };
}
export interface SnapshotAssignmentTransport {
  activeId: () => Promise<number | null>;
  state: () => Promise<unknown>;
  send: (command: ReturnType<typeof snapshotAssignmentCommand>) => Promise<unknown>;
}
export async function changeSnapshotAssignment(io: SnapshotAssignmentTransport, target: SnapshotAssignmentTarget, id: number, assigned: boolean, type: 'f' | 'i' | 'b') {
  const read = async () => {
    if (await io.activeId() !== target.presetId) throw new Error('The preset changed. Close and reopen Snapshot controls.');
    const values = readSnapshotParameters(await io.state(), target);
    if (await io.activeId() !== target.presetId) throw new Error('The preset changed. Close and reopen Snapshot controls.');
    return values;
  };
  const before = await read();
  const parameter = before.find(p => p.id === id);
  if (!parameter) throw new Error('This parameter is unavailable on the Stadium.');
  if (parameter.assigned === assigned) return before;
  if (parameter.controllerId > 0) throw new Error('This parameter has another controller assignment. Change that assignment on the Stadium first.');
  const reply = await io.send(snapshotAssignmentCommand(target, parameter, assigned, type));
  // Assign returns the allocated target id, not zero; remove returns zero.
  if (!Array.isArray(reply) || reply.length < 3 || !Number.isInteger(reply[0]) || !Number.isInteger(reply[1]) ||
      (assigned ? reply[1] <= 0 : reply[1] !== 0) || !Number.isInteger(reply[2]) || reply[2] < 0) {
    throw new Error('The snapshot assignment was not confirmed. Refresh before trying again.');
  }
  const after = await read();
  const changed = after.find(p => p.id === id);
  if (changed?.assigned !== assigned || (assigned && changed.targetId !== reply[1])) throw new Error('The Stadium has not confirmed the snapshot assignment. Refresh before trying again.');
  return after;
}
