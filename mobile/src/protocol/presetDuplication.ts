import { Buffer } from 'buffer';
import { isEmptyUserSlot, PresetCreationError, validatePresetName, type UserPresetSlot } from './presetCreation';
import { presetStorageId } from './presetSave';
import { formatPresetPosition } from '../utils/format';

export interface DuplicatePresetReference extends UserPresetSlot { rcid?: number; altp?: number; colr?: number; dvcp?: string }
export interface PresetDuplicationTransport {
  reference: (id: number) => Promise<DuplicatePresetReference | null>;
  data: (id: number) => Promise<Buffer | null>;
  slots: () => Promise<UserPresetSlot[] | null>;
  allocate: (position: number, name: string, source: DuplicatePresetReference) => Promise<number>;
  write: (id: number, data: Buffer) => Promise<void>;
}

/** Copy saved native bytes to a new User preset. Never load or write the source. */
export async function duplicatePreset(io: PresetDuplicationTransport, sourceId: number, position: number, draft: string) {
  const name = validatePresetName(draft);
  if (!Number.isInteger(sourceId) || sourceId <= 0 || sourceId > 0x7fffffff) throw new Error('Choose a saved preset to duplicate.');
  if (!Number.isInteger(position) || position < 0 || position >= 512) throw new Error('Choose a valid User Preset slot.');
  const selected = await io.reference(sourceId);
  if (selected?.cid_ !== sourceId || !(selected.type === 2 || (selected.type === 1 && selected.altp === 2))) {
    throw new Error('The source preset is no longer available. Refresh the library.');
  }
  const storageId = presetStorageId(sourceId, selected);
  const source = storageId === sourceId ? selected : storageId === null ? null : await io.reference(storageId);
  if (!source || source.cid_ !== storageId || source.type !== 2) throw new Error('The saved source preset could not be read.');
  const bytes = await io.data(storageId!);
  if (!bytes || bytes.length <= 8 || [95, 115, 98, 101, 112, 103, 115, 109].some((value, index) => bytes[index] !== value)) throw new Error('The saved source preset contents could not be read.');
  const slot = (await io.slots())?.find(item => item.posi === position);
  if (!slot || !isEmptyUserSlot(slot)) throw new Error(`Slot ${formatPresetPosition(position)} is no longer empty. Choose another slot.`);
  let id: number | null = null;
  try {
    id = await io.allocate(position, name, source);
    if (id === storageId || id === sourceId) throw new Error('The Stadium did not allocate an independent preset.');
    const reference = await io.reference(id);
    if (reference?.cid_ !== id || reference.ccid !== -2 || reference.posi !== position || reference.name !== name || reference.type !== 2 || reference.rcid !== undefined) {
      throw new Error('The duplicate preset location could not be verified.');
    }
    await io.write(id, bytes);
    if (!(await io.data(id))?.equals(bytes)) throw new Error('The duplicate preset contents could not be verified.');
    return { reference, loaded: false };
  } catch (error) {
    const detail = error instanceof Error ? error.message : 'The connection was interrupted.';
    throw new PresetCreationError(`${detail} Check slot ${formatPresetPosition(position)} before trying again.`, id, position);
  }
}
