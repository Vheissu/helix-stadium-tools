import { Buffer } from 'buffer';
import { encode } from '@msgpack/msgpack';

export const SETLIST_DIRECTORY_ID = -5;
export const SETLIST_TYPE = 1003;
export const MAX_SETLISTS = 122;
export const MAX_SETLIST_PRESETS = 128;

export interface SetlistReference {
  cid_: number;
  ccid: number;
  type: number;
  posi: number;
  name: string;
  boun?: number;
}
export interface SetlistEntry {
  cid_: number;
  ccid: number;
  type: number;
  posi: number;
  rcid: number;
  name?: string;
}

export interface SetlistTransport {
  directory: () => Promise<unknown>;
  entries: (id: number) => Promise<unknown>;
  reference: (id: number) => Promise<unknown>;
  activeReference: () => Promise<unknown>;
  allocate: (position: number, name: string) => Promise<unknown>;
  add: (id: number, presets: number[], position: number) => Promise<unknown>;
  remove: (parentId: number, ids: number[]) => Promise<unknown>;
  rename: (id: number, name: string) => Promise<unknown>;
  reorder: (parentId: number, ids: number[], position: number) => Promise<unknown>;
}

const validId = (id: unknown): id is number => typeof id === 'number' && Number.isInteger(id) && id > 0 && id <= 0x7fffffff;
const record = (value: unknown): Record<string, unknown> | null => value !== null && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : null;
const validPosition = (position: unknown, limit: number): position is number => typeof position === 'number' && Number.isInteger(position) && position >= 0 && position < limit;

export function validateSetlistName(draft: string): string {
  const name = draft.trim();
  if (!name || [...name].length > 32 || [...name].some(character => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127)) {
    throw new Error('Enter a setlist name from 1 to 32 characters.');
  }
  return name;
}

export function parseSetlists(value: unknown): SetlistReference[] {
  if (!Array.isArray(value)) throw new Error('The setlists could not be read. Refresh before trying again.');
  const ids = new Set<number>();
  const positions = new Set<number>();
  const result: SetlistReference[] = [];
  for (const item of value) {
    const ref = record(item);
    if (!ref || !validId(ref.cid_) || ref.ccid !== SETLIST_DIRECTORY_ID || ref.type !== SETLIST_TYPE ||
        !validPosition(ref.posi, MAX_SETLISTS) || typeof ref.name !== 'string' || ids.has(ref.cid_) || positions.has(ref.posi)) {
      throw new Error('The setlist details are incomplete. Refresh before trying again.');
    }
    ids.add(ref.cid_); positions.add(ref.posi);
    result.push(ref as unknown as SetlistReference);
  }
  return result.sort((a, b) => a.posi - b.posi);
}

export function parseSetlistEntries(value: unknown, containerId: number): SetlistEntry[] {
  if (!Array.isArray(value)) throw new Error('The presets in this setlist could not be read. Refresh before trying again.');
  const positions = new Set<number>();
  const ids = new Set<number>();
  const entries: SetlistEntry[] = [];
  for (const item of value) {
    const ref = record(item);
    if (!ref || !validPosition(ref.posi, MAX_SETLIST_PRESETS) || positions.has(ref.posi)) {
      throw new Error('The setlist order is incomplete. Refresh before trying again.');
    }
    positions.add(ref.posi);
    // The device includes empty placeholders for unused preset locations.
    if (ref.cid_ === undefined || ref.cid_ === 0) continue;
    if (!validId(ref.cid_) || !validId(ref.rcid) || ref.type !== 1 || ref.ccid !== containerId || ids.has(ref.cid_)) {
      throw new Error('A preset reference could not be read. Refresh before trying again.');
    }
    ids.add(ref.cid_);
    entries.push(ref as unknown as SetlistEntry);
  }
  return entries.sort((a, b) => a.posi - b.posi);
}

export function requireLibraryAcknowledgement(response: unknown): void {
  if (!Array.isArray(response) || response.length < 3 || !Number.isInteger(response[0]) || response[1] !== 0 ||
      !Number.isInteger(response[2]) || response[2] < 0) {
    throw new Error('The Stadium did not confirm the library change. Refresh before trying again.');
  }
}

export function createdSetlistId(response: unknown): number {
  if (!Array.isArray(response) || response.length < 3 || !Number.isInteger(response[0]) || !validId(response[1]) ||
      !Number.isInteger(response[2]) || response[2] < 0) {
    throw new Error('The Stadium did not confirm setlist creation. Refresh before trying again.');
  }
  return response[1];
}

export function setlistCreationCommand(position: number, draft: string) {
  if (!validPosition(position, MAX_SETLISTS)) throw new Error('There is no room for another setlist.');
  const name = validateSetlistName(draft);
  return { address: '/CreateContent', types: 'iiib', args: [SETLIST_DIRECTORY_ID, position, SETLIST_TYPE, Buffer.from(encode({ name }))] };
}

export class SetlistOperationError extends Error {
  constructor(message: string, public readonly setlistId: number | null) {
    super(message); this.name = 'SetlistOperationError';
  }
}

async function readSetlist(io: SetlistTransport, id: number): Promise<SetlistReference> {
  if (!validId(id)) throw new Error('Choose a setlist first.');
  const list = parseSetlists(await io.directory()).find(item => item.cid_ === id);
  if (!list) throw new Error('This setlist is no longer available. Refresh and choose another.');
  return list;
}

/** Creation never loads a preset or touches the current edit buffer. */
export async function createSetlist(io: SetlistTransport, draft: string): Promise<SetlistReference> {
  const name = validateSetlistName(draft);
  const directory = parseSetlists(await io.directory());
  const position = directory.reduce((next, item) => Math.max(next, item.posi + 1), 0);
  if (directory.length >= MAX_SETLISTS) throw new Error('The Stadium already has 122 setlists. Delete one before creating another.');
  if (position >= MAX_SETLISTS) throw new Error('There is no room after the last setlist. Reorder the setlists on your Stadium, then refresh.');
  let id: number | null = null;
  try {
    id = createdSetlistId(await io.allocate(position, name));
    const ref = parseSetlists([await io.reference(id)])[0];
    if (directory.some(item => item.cid_ === id) || ref.cid_ !== id || ref.name !== name || ref.posi !== position || ref.boun !== MAX_SETLIST_PRESETS ||
        !parseSetlists(await io.directory()).some(item => item.cid_ === id && item.name === name)) {
      throw new Error('The new setlist could not be verified.');
    }
    if (parseSetlistEntries(await io.entries(id), id).length !== 0) throw new Error('The new setlist was not empty.');
    return ref;
  } catch (error) {
    const detail = error instanceof Error ? error.message : 'The connection was interrupted.';
    throw new SetlistOperationError(`${detail} Check for “${name}” before trying to create it again.`, id);
  }
}

/** Copies references and their positions, preserving intentional gaps and repeated presets. */
export async function duplicateSetlist(io: SetlistTransport, sourceId: number, draft: string): Promise<SetlistReference> {
  const name = validateSetlistName(draft);
  await readSetlist(io, sourceId);
  const source = parseSetlistEntries(await io.entries(sourceId), sourceId);
  // Only existing User presets are linked; this cannot create duplicate preset files.
  for (const id of new Set(source.map(item => item.rcid))) {
    const preset = record(await io.reference(id));
    if (preset?.cid_ !== id || preset.ccid !== -2 || preset.type !== 2) {
      throw new Error('A preset in this setlist is no longer in User Presets. Refresh before duplicating.');
    }
  }
  const created = await createSetlist(io, name);
  try {
    // Adding at the original locations retains gaps; contiguous entries can share a request.
    for (let index = 0; index < source.length;) {
      const start = source[index];
      const presets = [start.rcid];
      index++;
      while (index < source.length && source[index].posi === start.posi + presets.length) presets.push(source[index++].rcid);
      requireLibraryAcknowledgement(await io.add(created.cid_, presets, start.posi));
    }
    const copied = parseSetlistEntries(await io.entries(created.cid_), created.cid_);
    if (copied.length !== source.length || copied.some((item, index) => item.posi !== source[index].posi || item.rcid !== source[index].rcid)) {
      throw new Error('The copied preset order could not be verified.');
    }
    return created;
  } catch (error) {
    const detail = error instanceof Error ? error.message : 'The connection was interrupted.';
    // Keep a partial copy visible; deleting or retrying could discard a concurrent device edit.
    throw new SetlistOperationError(`“${name}” was created, but its presets were not fully confirmed. ${detail} Check the new setlist before duplicating again.`, created.cid_);
  }
}

export async function renameSetlist(io: SetlistTransport, id: number, draft: string): Promise<void> {
  const name = validateSetlistName(draft);
  await readSetlist(io, id);
  requireLibraryAcknowledgement(await io.rename(id, name));
  if ((await readSetlist(io, id)).name !== name) throw new Error('The new setlist name was not confirmed. Refresh before trying again.');
}

export async function deleteSetlist(io: SetlistTransport, id: number): Promise<void> {
  await readSetlist(io, id);
  const active = record(await io.activeReference());
  if (!active || !validId(active.cid_)) throw new Error('The active preset could not be checked. Refresh before deleting this setlist.');
  if (active.ccid === id) throw new Error('Load a preset outside this setlist before deleting it.');
  requireLibraryAcknowledgement(await io.remove(SETLIST_DIRECTORY_ID, [id]));
  if (parseSetlists(await io.directory()).some(item => item.cid_ === id)) throw new Error('The setlist deletion was not confirmed. Refresh before trying again.');
}

export async function moveSetlist(io: SetlistTransport, id: number, direction: -1 | 1): Promise<void> {
  if (!validId(id) || (direction !== -1 && direction !== 1)) throw new Error('Choose a valid setlist move.');
  const before = parseSetlists(await io.directory());
  const index = before.findIndex(item => item.cid_ === id);
  if (index < 0) throw new Error('This setlist is no longer available. Refresh and choose another.');
  const neighbor = before[index + direction];
  if (!neighbor) throw new Error('This setlist is already at the end of the list.');
  const expected = before.map(item => item.cid_);
  [expected[index], expected[index + direction]] = [expected[index + direction], expected[index]];
  requireLibraryAcknowledgement(await io.reorder(SETLIST_DIRECTORY_ID, [id], neighbor.posi + (direction > 0 ? 1 : 0)));
  const after = parseSetlists(await io.directory()).map(item => item.cid_);
  if (after.length !== expected.length || after.some((item, position) => item !== expected[position])) {
    throw new Error('The new setlist order was not confirmed. Refresh before trying again.');
  }
}
