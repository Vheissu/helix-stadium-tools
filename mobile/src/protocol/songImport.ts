import { MAX_SONGS, validateSongName, type ShowcaseSong } from './showcase';
export interface SongIngestion { archive_name: string; details: string; progress_percent: number; res: number; song_name?: string; }
export function parseSongIngestion(value: unknown, filename: string): SongIngestion | null {
  if (!value || typeof value !== 'object') return null;
  const result = value as Partial<SongIngestion>;
  if (result.archive_name !== filename.replace(/\.p35song$/, '') || typeof result.details !== 'string' || typeof result.res !== 'number' || !Number.isFinite(result.res)) return null;
  return { ...result, progress_percent: typeof result.progress_percent === 'number' ? Math.max(0, Math.min(100, result.progress_percent)) : 0 } as SongIngestion;
}
export function confirmedSongId(result: SongIngestion) {
  if (result.res !== 0 || !result.details.includes('audio_write_confirmed=true')) return null;
  const match = /Content CID:\s*(\d+)/.exec(result.details);
  const id = match ? Number(match[1]) : 0;
  return Number.isInteger(id) && id > 0 && id <= 0x7fffffff ? id : null;
}
export function requireAvailableSongName(name: string, songs: ShowcaseSong[]) {
  const normalized = validateSongName(name).normalize('NFC').toLocaleLowerCase('en-US');
  if (songs.length >= MAX_SONGS) throw new Error('The Stadium song library is full. Remove a song on the Stadium before uploading another.');
  if (songs.some(song => song.name.trim().normalize('NFC').toLocaleLowerCase('en-US') === normalized)) throw new Error('A song with this name already exists. Choose a different name to keep the existing song.');
}
