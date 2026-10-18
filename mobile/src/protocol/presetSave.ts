export interface PresetReference {
  cid_?: number;
  rcid?: number;
  type?: number;
}
const isContentId = (value: unknown): value is number =>
  typeof value === 'number' && Number.isInteger(value) && value > 0 && value <= 0x7fffffff;

export function presetStorageId(activeId: number | null, reference: PresetReference | null): number | null {
  if (isContentId(reference?.rcid)) return reference.rcid;
  // A setlist entry without a backing preset is not a writable preset.
  if (reference?.type === 1) return null;
  return isContentId(activeId) ? activeId : null;
}

/** Whole-preset save: the desktop editor sends flow=-1 and block=-1. */
export function presetSaveCommand(contentId: number) {
  if (!isContentId(contentId)) throw new Error('This preset does not have a saved location yet. Save it to a User Preset location on the Stadium first.');
  return { address: '/SavePresetWithCID', types: 'iii', args: [contentId, -1, -1] } as const;
}

export interface PresetSaveTransport {
  sendSave: (contentId: number) => Promise<void>;
  getActivePresetContentId: () => Promise<number | null>;
  getContentRef: (contentId: number) => Promise<PresetReference | null>;
  isPresetEdited: () => Promise<boolean | null>;
}

async function checkIdentity(io: PresetSaveTransport, contentId: number) {
  const activeId = await io.getActivePresetContentId();
  if (activeId === null) throw new Error('Could not read the active preset from the Stadium.');
  const reference = await io.getContentRef(activeId);
  if (!reference) throw new Error('Could not read the preset location from the Stadium.');
  if (presetStorageId(activeId, reference) !== contentId) {
    throw new Error('The active preset changed. Check the current preset before saving again.');
  }
  if (await io.getActivePresetContentId() !== activeId) {
    throw new Error('The active preset changed. Check the current preset before saving again.');
  }
  return activeId;
}

export async function savePresetAndConfirm(
  io: PresetSaveTransport,
  contentId: number,
  options: { attempts?: number; pause?: () => Promise<void> } = {},
): Promise<void> {
  presetSaveCommand(contentId); // Reject invalid destinations before any device interaction.
  const originalActiveId = await checkIdentity(io, contentId);
  await io.sendSave(contentId);
  const attempts = options.attempts ?? 8;
  const pause = options.pause ?? (() => new Promise<void>((resolve) => setTimeout(resolve, 250)));
  for (let attempt = 0; attempt < attempts; attempt++) {
    // Check identity on either side of the dirty flag so switching presets
    // cannot make another preset's clean state confirm this save.
    const before = await io.getActivePresetContentId();
    if (before !== originalActiveId) throw new Error('The active preset changed before saving could be confirmed.');
    const edited = await io.isPresetEdited();
    const after = await io.getActivePresetContentId();
    if (after !== originalActiveId) throw new Error('The active preset changed before saving could be confirmed.');
    if (edited === false) {
      await checkIdentity(io, contentId);
      return;
    }
    if (attempt < attempts - 1) await pause();
  }
  throw new Error('The Stadium has not confirmed the save. Your changes may still be unsaved; check the device before leaving this preset.');
}

export function requireSaveAcknowledgement(values: unknown): void {
  if (!Array.isArray(values) || values.length < 3 || !Number.isInteger(values[0]) || values[1] !== 0 || !Number.isInteger(values[2]) || values[2] < 0) {
    throw new Error('The Stadium did not accept the save request. Your changes have not been confirmed as saved.');
  }
}
