export const SONG_LIBRARY_ID = -7;
export const MAX_SONGS = 256;
export const MAX_SONG_TRACKS = 8;
export const MAX_SONG_SECONDS = 13 * 60;

export interface ShowcaseSong {
  id: number;
  name: string;
  position: number;
  duration: number;
}

export function parseShowcaseSongs(value: unknown): ShowcaseSong[] {
  if (!Array.isArray(value)) throw new Error('The song library could not be read. Try refreshing it.');
  const songs: ShowcaseSong[] = [];
  const seen = new Set<number>();
  for (const item of value) {
    if (!item || typeof item !== 'object') continue;
    const { cid_, ccid, type, name, posi, leng } = item;
    // Empty slots are returned as preset-shaped placeholders. They are not songs.
    if (ccid !== SONG_LIBRARY_ID || type !== 4 || !Number.isInteger(cid_) || cid_ <= 0) continue;
    if (seen.has(cid_) || typeof name !== 'string' || !Number.isInteger(posi) || posi < 0) {
      throw new Error('The song library returned incomplete details. Try refreshing it.');
    }
    seen.add(cid_);
    songs.push({ id: cid_, name, position: posi, duration: typeof leng === 'number' && Number.isFinite(leng) && leng >= 0 ? leng : 0 });
  }
  return songs.sort((a, b) => a.position - b.position);
}

export function validateSongName(value: string, label = 'song') {
  const name = value.trim();
  if (!name || [...name].length > 64 || [...name].some(character => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127)) {
    throw new Error(`Enter a ${label} name from 1 to 64 characters.`);
  }
  return name;
}

export function validateSongTiming(tempo: number, beats: number, beatUnit: number) {
  if (!Number.isFinite(tempo) || tempo < 20 || tempo > 240) throw new Error('Enter a tempo from 20 to 240 BPM.');
  if (!Number.isInteger(beats) || beats < 1 || beats > 16 || ![2, 4, 8, 16].includes(beatUnit)) {
    throw new Error('Choose a time signature with 1–16 beats and a beat unit of 2, 4, 8 or 16.');
  }
}

export function songSelectionCommand(id: number) {
  if (!Number.isInteger(id) || id <= 0 || id > 0x7fffffff) throw new Error('Choose a valid song.');
  return { address: '/SetCurrentSong', types: 'i', args: [id] };
}

const TRANSPORT_COMMANDS = {
  play: '/TransportPlay', pause: '/TransportPause', stop: '/TransportStop',
} as const;
export type ShowcaseTransportAction = keyof typeof TRANSPORT_COMMANDS;

export function songTransportCommand(action: ShowcaseTransportAction) {
  const address = TRANSPORT_COMMANDS[action];
  if (!address) throw new Error('Choose a valid playback action.');
  return { address, types: '', args: [] };
}

export function requireShowcaseAcknowledgement(value: unknown) {
  if (!Array.isArray(value) || value.length < 3 || !Number.isInteger(value[0]) || value[1] !== 0 ||
      !Number.isInteger(value[2]) || value[2] < 0) {
    throw new Error('The Stadium did not confirm the song command. Refresh before trying again.');
  }
}

export function songDuration(seconds: number) {
  const duration = Math.max(0, Math.round(seconds));
  return `${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, '0')}`;
}

/** Reconcile firmware views while checking entries absent from the unfiltered list. */
export async function resolveShowcaseSongs(unfiltered: unknown, filtered: unknown, recentIds: Iterable<number>, getReference: (id: number) => Promise<unknown>) {
  const songs = parseShowcaseSongs(unfiltered);
  const candidates = new Set([...parseShowcaseSongs(filtered).map(song => song.id), ...recentIds]);
  for (const id of candidates) {
    if (songs.some(song => song.id === id)) continue;
    const current = parseShowcaseSongs([await getReference(id)]);
    if (current.length) songs.push(current[0]);
  }
  return songs.sort((a, b) => a.position - b.position);
}
