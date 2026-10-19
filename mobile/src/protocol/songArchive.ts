import { Gzip } from 'fflate';
import { Buffer } from 'buffer';
import { MAX_SONG_SECONDS, MAX_SONG_TRACKS, validateSongName, validateSongTiming } from './showcase';

export interface AudioSource { name: string; size: number; read: (offset: number, length: number) => Promise<Uint8Array>; }
export interface SongTrack extends AudioSource { duration: number; checksum: number; }
export interface SongDetails { name: string; tempo: number; beats: number; beatUnit: number; }
const CHUNK = 65536;
const table = Uint32Array.from({ length: 256 }, (_, n) => { let value = n; for (let i = 0; i < 8; i++) value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1; return value >>> 0; });
export function crc32(bytes: Uint8Array, previous = 0) {
  let value = previous ^ 0xffffffff;
  for (const byte of bytes) value = table[(value ^ byte) & 255] ^ (value >>> 8);
  return (value ^ 0xffffffff) >>> 0;
}
const text = (bytes: Uint8Array) => Buffer.from(bytes).toString('ascii');
async function readExact(source: AudioSource, offset: number, length: number) {
  if (offset < 0 || length < 0 || offset + length > source.size) throw new Error(`${source.name} is incomplete or damaged.`);
  const bytes = await source.read(offset, length);
  if (bytes.length !== length) throw new Error(`${source.name} could not be read completely.`);
  return bytes;
}
export async function inspectWav(source: AudioSource, signal?: AbortSignal): Promise<SongTrack> {
  const header = Buffer.from(await readExact(source, 0, 12));
  if (text(header.subarray(0, 4)) !== 'RIFF' || text(header.subarray(8, 12)) !== 'WAVE' || header.readUInt32LE(4) + 8 !== source.size) throw new Error(`${source.name}: choose a standard WAV file.`);
  let offset = 12, bytesPerSecond = 0, alignment = 0, dataSize = 0, chunks = 0;
  while (offset + 8 <= source.size) {
    signal?.throwIfAborted();
    if (++chunks > 10000) throw new Error(`${source.name} has too many audio sections.`);
    const chunk = Buffer.from(await readExact(source, offset, 8)); const length = chunk.readUInt32LE(4); const id = text(chunk.subarray(0, 4));
    if (offset + 8 + length > source.size) throw new Error(`${source.name} is incomplete or damaged.`);
    if (id === 'fmt ') {
      if (bytesPerSecond || length < 16) throw new Error(`${source.name} has an invalid audio format.`);
      const format = Buffer.from(await readExact(source, offset + 8, 16));
      const channels = format.readUInt16LE(2), rate = format.readUInt32LE(4), bits = format.readUInt16LE(14);
      if (format.readUInt16LE(0) !== 1 || ![1, 2].includes(channels) || rate !== 48000 || bits !== 16) throw new Error(`${source.name}: export as 48 kHz, 16-bit WAV, mono or stereo.`);
      alignment = channels * 2; bytesPerSecond = rate * alignment;
      if (format.readUInt16LE(12) !== alignment || format.readUInt32LE(8) !== bytesPerSecond) throw new Error(`${source.name} has invalid audio timing.`);
    }
    if (id === 'data') { if (dataSize) throw new Error(`${source.name} contains multiple audio sections.`); dataSize = length; }
    offset += 8 + length + (length % 2);
  }
  const duration = dataSize / bytesPerSecond;
  if (!dataSize || !alignment || dataSize % alignment || !Number.isFinite(duration) || duration <= 0 || duration > MAX_SONG_SECONDS) throw new Error(`${source.name}: audio must be no longer than 13 minutes.`);
  let checksum = 0;
  for (let position = 0; position < source.size; position += CHUNK) {
    signal?.throwIfAborted(); checksum = crc32(await readExact(source, position, Math.min(CHUNK, source.size - position)), checksum);
  }
  return { ...source, duration, checksum };
}
export function songMetadata(details: SongDetails, tracks: SongTrack[]) {
  const name = validateSongName(details.name); validateSongTiming(details.tempo, details.beats, details.beatUnit);
  if (!tracks.length || tracks.length > MAX_SONG_TRACKS) throw new Error('Choose between 1 and 8 audio tracks.');
  const duration = Math.max(...tracks.map(track => track.duration));
  // Positions use 240 ticks per quarter note; the final flag rounds up so audio is never cut short.
  const ticksPerBeat = 240 * 4 / details.beatUnit;
  const ticks = Math.ceil(duration * details.tempo * 240 / 60);
  const barTicks = ticksPerBeat * details.beats;
  const bar = Math.floor(ticks / barTicks) + 1, beat = Math.floor((ticks % barTicks) / ticksPerBeat) + 1, tick = ticks % ticksPerBeat + 1;
  const end = `${String(bar).padStart(3, '0')}-${String(beat).padStart(2, '0')}.${String(tick).padStart(3, '0')}`;
  return { name, ppqn: 240, 'bypass-flags': false,
    params: '16;0;0;Off;Guitar;Right;Standard;0;Off;0.0;0.0;0.0;0.0;0.0;0.0;0.0;0.0',
    flags: [`001-01.001|START;;9;${details.tempo};0;${details.beats};${details.beatUnit};Off;false;[Current];[Current];[Current]`, `${end}|END;;5;Off;8.0;Pause;Off;2.0`],
    tracks: tracks.map((track, i) => ({ name: validateSongName(track.name, 'track'), filename: `Audio/song/Track${i + 1}.wav` })),
  };
}
function tarHeader(path: string, size: number) {
  const header = Buffer.alloc(512); header.write(`./${path}`, 0, 100, 'utf8');
  for (const [offset, length, value] of [[100, 8, 0o644], [108, 8, 0], [116, 8, 0], [124, 12, size], [136, 12, 0]]) header.write(value.toString(8).padStart(length - 1, '0') + '\0', offset, length, 'ascii');
  header.fill(32, 148, 156); header[156] = 48; header.write('ustar\0', 257, 'ascii'); header.write('00', 263, 'ascii');
  const sum = header.reduce((total, byte) => total + byte, 0); header.write(sum.toString(8).padStart(6, '0') + '\0 ', 148, 8, 'ascii');
  return header;
}
export async function buildSongArchive(details: SongDetails, tracks: SongTrack[], write: (bytes: Uint8Array) => Promise<void>, signal?: AbortSignal, onProgress?: (fraction: number) => void) {
  const metadata = Buffer.from(JSON.stringify(songMetadata(details, tracks)), 'utf8');
  const files = [{ path: 'song.json', type: 'application/showcase', size: metadata.length, checksum: crc32(metadata) }, ...tracks.map((track, i) => ({ path: `Audio/song/Track${i + 1}.wav`, type: 'audio/wav', size: track.size, checksum: track.checksum }))];
  const manifest = Buffer.from(JSON.stringify(files), 'utf8');
  const total = tracks.reduce((sum, track) => sum + track.size, 0);
  if (total > 1000000000) throw new Error('These tracks are too large. Keep the combined audio below 1 GB.');
  const header = Buffer.alloc(24); header.writeUInt32LE(0x59474747, 0); header.writeUInt32LE(0x534f4e47, 8); header.writeUInt32LE(0x100, 16); await write(header);
  let pending: Uint8Array[] = [], written = 24, processed = 0;
  const gzip = new Gzip({ level: total < 1048576 ? 0 : 1, mtime: 0 }, bytes => { pending.push(bytes); });
  const push = async (bytes: Uint8Array, final = false) => {
    signal?.throwIfAborted(); gzip.push(bytes, final);
    const chunks = pending; pending = [];
    for (const chunk of chunks) { written += chunk.length; if (written > 1073741824) throw new Error('The prepared song is too large.'); await write(chunk); }
  };
  const smallFile = async (path: string, bytes: Uint8Array) => { await push(tarHeader(path, bytes.length)); await push(bytes); await push(new Uint8Array((512 - bytes.length % 512) % 512)); };
  await smallFile('manifest.json', manifest); await smallFile('song.json', metadata);
  for (let i = 0; i < tracks.length; i++) {
    const track = tracks[i]; await push(tarHeader(`Audio/song/Track${i + 1}.wav`, track.size)); let actualCrc = 0;
    for (let offset = 0; offset < track.size; offset += CHUNK) {
      const bytes = await readExact(track, offset, Math.min(CHUNK, track.size - offset)); actualCrc = crc32(bytes, actualCrc); await push(bytes); processed += bytes.length; onProgress?.(processed / total);
    }
    if (actualCrc !== track.checksum) throw new Error(`${track.name} changed while preparing the song. Choose it again.`);
    await push(new Uint8Array((512 - track.size % 512) % 512));
  }
  await push(new Uint8Array(1024), true);
  if (written < 1024) throw new Error('The song archive is too small for the Stadium.');
  return { bytes: written, duration: Math.max(...tracks.map(track => track.duration)) };
}
