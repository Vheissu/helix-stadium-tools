import { formatPresetPosition } from '../utils/format';
import { extractSnapshots } from '../utils/helixState';
import { Buffer } from 'buffer';
import { encode } from '@msgpack/msgpack';

export interface UserPresetSlot {
  cid_?: number; ccid?: number; posi?: number; name?: string; type?: number;
}
export interface PresetCreationTransport {
  getSlots: () => Promise<UserPresetSlot[] | null>;
  getActiveId: () => Promise<number | null>;
  isEdited: () => Promise<boolean | null>;
  allocate: (position: number, name: string) => Promise<number>;
  getReference: (id: number) => Promise<UserPresetSlot | null>;
  writeBlank: (id: number) => Promise<void>;
  verifyBlank: (id: number) => Promise<boolean>;
  load: (id: number) => Promise<void>;
}

export const isEmptyUserSlot = (item: UserPresetSlot) =>
  item.ccid === -2 && Number.isInteger(item.posi) && item.posi! >= 0 && item.posi! < 512 &&
  (item.cid_ === undefined || item.cid_ === 0);

export function snapshotMetadataChanged(live: unknown, stored: unknown): boolean | null {
  const current = extractSnapshots(live), saved = extractSnapshots(stored);
  if (!current.length || !saved.length) return null;
  const metadata = (items: typeof current) => items.map(item => [item.index, item.name ?? null, item.colr ?? null, item.vald ?? null]);
  return JSON.stringify(metadata(current)) !== JSON.stringify(metadata(saved));
}

export function validatePresetName(name: string) {
  const trimmed = name.trim();
  if (!trimmed || [...trimmed].length > 32 || [...trimmed].some(character => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127)) {
    throw new Error('Enter a preset name from 1 to 32 characters.');
  }
  return trimmed;
}

export function presetCreationCommand(position: number, name: string) {
  if (!Number.isInteger(position) || position < 0 || position >= 512) throw new Error('Choose a valid User Preset slot.');
  const attrs = Buffer.from(encode({ blck: -1, colr: 0, dvcp: 'ALL', flow: -1, name: validatePresetName(name) }));
  return { address: '/CreateContent', types: 'iiib', args: [-2, position, 2, attrs] };
}

export function createdPresetId(response: unknown): number {
  // CreateContent returns the allocated id in the status field, unlike SavePresetWithCID.
  if (!Array.isArray(response) || response.length < 3 || !Number.isInteger(response[0]) ||
      !Number.isInteger(response[1]) || response[1] <= 0 || response[1] > 0x7fffffff ||
      !Number.isInteger(response[2]) || response[2] < 0) {
    throw new Error('The Stadium did not confirm preset creation. Refresh the slot before trying again.');
  }
  return response[1];
}

export class PresetCreationError extends Error {
  constructor(message: string, public readonly contentId: number | null, public readonly position: number) {
    super(message); this.name = 'PresetCreationError';
  }
}

/** Allocate only into a freshly checked empty User location; never replace content. */
export async function createEmptyPreset(io: PresetCreationTransport, position: number, draft: string) {
  if (!Number.isInteger(position) || position < 0 || position >= 512) throw new Error('Choose a valid User Preset slot.');
  const name = validatePresetName(draft);
  const originalId = await io.getActiveId();
  if (originalId === null || await io.isEdited() !== false) throw new Error('Save your current changes before creating a preset.');
  const slots = await io.getSlots();
  const slot = slots?.find(item => item.posi === position);
  if (!slot || !isEmptyUserSlot(slot)) throw new Error(`Slot ${formatPresetPosition(position)} is no longer empty. Choose another slot.`);
  let id: number | null = null;
  try {
    id = await io.allocate(position, name);
    const reference = await io.getReference(id);
    if (reference?.cid_ !== id || reference.ccid !== -2 || reference.posi !== position || reference.name !== name || reference.type !== 2) {
      throw new Error('The new preset location could not be verified.');
    }
    await io.writeBlank(id);
    if (!await io.verifyBlank(id)) throw new Error('The new preset contents could not be verified.');
    // A physical preset change or a new edit must not be discarded by finishing this operation.
    let loaded = false;
    if (await io.getActiveId() === originalId && await io.isEdited() === false && await io.getActiveId() === originalId) {
      await io.load(id); loaded = true;
    }
    return { reference, loaded };
  } catch (error) {
    const detail = error instanceof Error ? error.message : 'The connection was interrupted.';
    // A missing reply may still have allocated content. Do not retry or delete automatically.
    throw new PresetCreationError(`${detail} Check slot ${formatPresetPosition(position)} before trying again.`, id, position);
  }
}
