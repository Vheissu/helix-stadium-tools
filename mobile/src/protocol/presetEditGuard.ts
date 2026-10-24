/** A device preset notification arrives before its new grid. Never edit that gap. */
export class PresetEditGuard {
  private revision = 0;
  private presetId: number | null = null;

  invalidate() { this.presetId = null; this.revision++; }
  beginSync() { return this.revision; }
  acceptSync(revision: number, presetId: number | null): boolean {
    if (revision !== this.revision || presetId === null || !Number.isInteger(presetId) || presetId <= 0) return false;
    this.presetId = presetId;
    return true;
  }
  ready(presetId: number | null): boolean { return presetId !== null && this.presetId === presetId; }
  isSynced(): boolean { return this.presetId !== null; }
}

export function blockActionMessage(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  if (/processing|resource|headroom|capacity/i.test(message)) return 'There is not enough processing capacity for this change.';
  if (/timed? ?out|no response|decode failed/i.test(message)) return 'The Stadium did not respond. Sync to check whether the change was applied.';
  if (/\/[A-Za-z]|status[=:]/.test(message)) return 'The Stadium refused this change. Sync the preset and check the available space and routing.';
  return message;
}
