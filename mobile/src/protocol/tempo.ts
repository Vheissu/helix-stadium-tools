export const MIN_TEMPO_BPM = 20;
export const MAX_TEMPO_BPM = 240;
const TEMPO_KEYS = ['server.snapshot.tempo.bpm', 'preset.tempo.bpm', 'global.tempo.bpm'] as const;

export function isTempoBpm(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= MIN_TEMPO_BPM && value <= MAX_TEMPO_BPM;
}

export function validateTempoProperty(key: string, value: unknown, type: string) {
  if ((TEMPO_KEYS as readonly string[]).includes(key) && (type !== 'f' || !isTempoBpm(value))) {
    throw new Error('Tempo must be a float from 20 to 240 BPM.');
  }
}

/** Measure on the phone: network latency must not become the tap interval. */
export class TapTempo {
  private lastTap: number | null = null;
  private intervals: number[] = [];

  reset() { this.lastTap = null; this.intervals = []; }

  tap(now: number): number | null {
    if (!Number.isFinite(now)) { this.reset(); return null; }
    const previous = this.lastTap;
    if (previous === null || now < previous || now - previous > 60000 / MIN_TEMPO_BPM) {
      this.lastTap = now; this.intervals = []; return null;
    }
    const interval = now - previous;
    // Ignore duplicate/accidental taps without moving the last valid beat.
    if (interval < 60000 / MAX_TEMPO_BPM) return null;
    this.lastTap = now;
    this.intervals = [...this.intervals.slice(-3), interval];
    const average = this.intervals.reduce((sum, value) => sum + value, 0) / this.intervals.length;
    return Math.round(60000 / average * 100) / 100;
  }
}

type Property = { key: string | null; type: string | null; value: unknown } | null;
export interface TempoTransport {
  getProperty(key: string): Promise<Property>;
  setPropertyWait(key: string, value: number, type: 'f'): Promise<unknown>;
}

/** One operation at a time; never queue or retry time-sensitive tempo writes. */
export class TempoController {
  private pending = false;
  private closed = false;
  private revision = 0;
  private taps = new TapTempo();

  constructor(private io: TempoTransport) {}

  reset() { this.revision += 1; this.taps.reset(); }

  close() { this.closed = true; this.reset(); }

  async tap(now: number): Promise<number | null> {
    if (this.closed) return null;
    const bpm = this.taps.tap(now);
    return bpm === null ? null : this.update(() => bpm);
  }

  async adjust(delta: number): Promise<number | null> {
    this.taps.reset();
    if (!Number.isFinite(delta)) throw new Error('Invalid tempo adjustment.');
    return this.update(current => Math.max(MIN_TEMPO_BPM, Math.min(MAX_TEMPO_BPM, Math.round(current + delta))));
  }

  private async update(next: (current: number) => number): Promise<number | null> {
    if (this.closed || this.pending) return null;
    this.pending = true;
    const revision = this.revision;
    const cancelled = () => this.closed || revision !== this.revision;
    try {
      const mode = await this.io.getProperty('global.tempo.select');
      if (cancelled()) return null;
      if (mode?.key !== 'global.tempo.select' || mode.type !== 'i' ||
          typeof mode.value !== 'number' || !Number.isInteger(mode.value) || mode.value < 0 || mode.value > 2) {
        throw new Error('Could not read the tempo mode. Sync the device before adjusting tempo.');
      }
      const key = TEMPO_KEYS[mode.value];
      const current = await this.io.getProperty(key);
      if (cancelled()) return null;
      if (current?.key !== key || current.type !== 'f' || !isTempoBpm(current.value)) {
        throw new Error('Could not read a valid tempo. Check the tempo on the device before trying again.');
      }
      const bpm = next(current.value);
      validateTempoProperty(key, bpm, 'f');
      if (Math.abs(current.value - bpm) < 0.005) return current.value;
      await this.io.setPropertyWait(key, bpm, 'f');
      if (cancelled()) return null;
      const confirmed = await this.io.getProperty(key);
      if (cancelled()) return null;
      if (confirmed?.key !== key || confirmed.type !== 'f' || !isTempoBpm(confirmed.value) || Math.abs(confirmed.value - bpm) > 0.01) {
        throw new Error('Tempo was not confirmed. Sync the device before trying again.');
      }
      return confirmed.value;
    } catch (error) {
      this.taps.reset();
      throw error;
    } finally {
      this.pending = false;
    }
  }
}
