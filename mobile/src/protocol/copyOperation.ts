export class CopyOperationError extends Error {
  constructor(message: string, readonly mayHaveChanged = false, readonly warning: string | null = null) {
    super(message);
    this.name = 'CopyOperationError';
  }
}

export function copyOperationError(error: unknown, mayHaveChanged = false, warning: string | null = null) {
  return new CopyOperationError(error instanceof Error ? error.message : String(error),
    mayHaveChanged || (error instanceof CopyOperationError && error.mayHaveChanged),
    warning ?? (error instanceof CopyOperationError ? error.warning : null));
}

export async function confirmCopyPreset(read: () => Promise<number | null>, expected: number) {
  if (!Number.isInteger(expected) || expected <= 0) throw new Error('Sync the current preset before copying.');
  const actual = await read();
  if (actual === null) throw new Error('Could not confirm the current preset. Sync and try again.');
  if (actual !== expected) throw new Error('The preset changed. Sync before copying.');
}

/** Restore the global preference even after a failed write, without hiding the copy result. */
export async function withAutoCabDisabled<T>(io: {
  read(): Promise<boolean | null>;
  write(enabled: boolean): Promise<unknown>;
}, operation: () => Promise<T>): Promise<{ value: T; warning: string | null }> {
  const enabled = await io.read();
  if (enabled === null) throw new CopyOperationError('Could not read Auto-Cab. Sync before copying.');
  let value: T | undefined;
  let failure: unknown;
  let failed = false;
  let warning: string | null = null;
  try {
    if (enabled) {
      await io.write(false);
      if (await io.read() !== false) throw new Error('Could not turn Auto-Cab off for this copy. Sync and try again.');
    }
    value = await operation();
  } catch (error) {
    failed = true;
    failure = error;
  } finally {
    if (enabled) {
      let restored = false;
      for (let attempt = 0; attempt < 2 && !restored; attempt++) {
        try { await io.write(true); } catch { /* A lost acknowledgement may still mean the write worked. */ }
        try { restored = await io.read() === true; } catch { /* Retry once, then report recovery separately. */ }
      }
      if (!restored) warning = 'Auto-Cab could not be confirmed back on. Check Auto-Cab in Settings before adding another amp.';
    }
  }
  if (failed) throw copyOperationError(failure, false, warning);
  return { value: value as T, warning };
}
