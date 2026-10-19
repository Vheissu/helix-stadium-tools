import test from 'node:test';
import assert from 'node:assert/strict';
import { gunzipSync } from 'node:zlib';
import { buildSongArchive, crc32, inspectWav, songMetadata, type AudioSource } from './songArchive';
import { confirmedSongId, parseSongIngestion, requireAvailableSongName } from './songImport';
import { parseShowcaseSongs, resolveShowcaseSongs, requireShowcaseAcknowledgement, songSelectionCommand, songTransportCommand, validateSongName, validateSongTiming } from './showcase';
function wav(seconds = 1, channels = 2) {
  const size = seconds * 48000 * channels * 2; const bytes = Buffer.alloc(44 + size);
  bytes.write('RIFF'); bytes.writeUInt32LE(bytes.length - 8, 4); bytes.write('WAVEfmt ', 8); bytes.writeUInt32LE(16, 16);
  bytes.writeUInt16LE(1, 20); bytes.writeUInt16LE(channels, 22); bytes.writeUInt32LE(48000, 24); bytes.writeUInt32LE(48000 * channels * 2, 28);
  bytes.writeUInt16LE(channels * 2, 32); bytes.writeUInt16LE(16, 34); bytes.write('data', 36); bytes.writeUInt32LE(size, 40); return bytes;
}
const source = (bytes: Buffer, name = 'Backing'): AudioSource => ({ name, size: bytes.length, read: async (offset, length) => bytes.subarray(offset, offset + length) });
const details = { name: 'A song', tempo: 120, beats: 4, beatUnit: 4 };
function untar(buffer: Buffer) {
  const files = new Map<string, Buffer>(); let offset = 0;
  while (offset + 512 <= buffer.length && buffer[offset] !== 0) {
    const header = buffer.subarray(offset, offset + 512); const name = header.subarray(0, 100).toString().replace(/\0.*$/, '');
    const checksum = parseInt(header.subarray(148, 154).toString(), 8);
    assert.equal(header.reduce((sum, byte, index) => sum + (index >= 148 && index < 156 ? 32 : byte), 0), checksum);
    const size = parseInt(header.subarray(124, 136).toString().replace(/\0.*$/, ''), 8);
    files.set(name, buffer.subarray(offset + 512, offset + 512 + size)); offset += 512 + Math.ceil(size / 512) * 512;
  }
  return files;
}
test('WAV inspection accepts supported mono/stereo and standard CRC32', async () => {
  assert.equal(crc32(Buffer.from('123456789')), 0xcbf43926);
  assert.equal(crc32(Buffer.from('56789'), crc32(Buffer.from('1234'))), 0xcbf43926);
  for (const channels of [1, 2]) { const bytes = wav(1, channels); const track = await inspectWav(source(bytes)); assert.equal(track.duration, 1); assert.equal(track.checksum, crc32(bytes)); }
});
test('WAV inspection rejects unsupported, corrupt, truncated and excessive duration audio', async () => {
  for (const [offset, value] of [[20, 3], [22, 6], [34, 24], [32, 3]]) { const bytes = wav(); bytes.writeUInt16LE(value, offset); await assert.rejects(inspectWav(source(bytes))); }
  const wrongRate = wav(); wrongRate.writeUInt32LE(44100, 24); await assert.rejects(inspectWav(source(wrongRate)), /48 kHz/);
  const truncated = wav().subarray(0, 100); await assert.rejects(inspectWav(source(truncated)));
  const bytes = wav(); await assert.rejects(inspectWav({ ...source(bytes), read: async () => new Uint8Array(0) }), /read completely/);
  const header = wav(0); header.writeUInt32LE(781 * 192000 + 36, 4); header.writeUInt32LE(781 * 192000, 40);
  await assert.rejects(inspectWav({ name: 'Too long', size: 781 * 192000 + 44, read: async (offset, length) => header.subarray(offset, offset + length) }), /13 minutes/);
});
test('archive roundtrip preserves every byte, manifests and metadata', async () => {
  const audio = wav(); const track = await inspectWav(source(audio)); const chunks: Uint8Array[] = [];
  await buildSongArchive(details, [track], async bytes => { chunks.push(bytes); }); const archive = Buffer.concat(chunks);
  assert.ok(archive.length >= 1024); assert.equal(archive.readBigUInt64LE(0), 0x59474747n); assert.equal(archive.readBigUInt64LE(8), 0x534f4e47n); assert.equal(archive.readBigUInt64LE(16), 0x100n);
  const files = untar(gunzipSync(archive.subarray(24))); assert.deepEqual(files.get('./Audio/song/Track1.wav'), audio);
  const manifest = JSON.parse(files.get('./manifest.json')!.toString());
  for (const entry of manifest) { assert.equal(files.get('./' + entry.path)!.length, entry.size); assert.equal(crc32(files.get('./' + entry.path)!), entry.checksum); }
  const song = JSON.parse(files.get('./song.json')!.toString()); assert.equal(song.name, details.name); assert.ok(song.flags[0].endsWith('[Current];[Current];[Current]')); assert.ok(song.flags[1].startsWith('001-03.001|END'));
});
test('archive catches changed files and cancellation before transfer', async () => {
  const bytes = wav(); const track = await inspectWav(source(bytes)); bytes[100] = 1;
  await assert.rejects(buildSongArchive(details, [track], async () => {}), /changed/);
  const abort = new AbortController(); abort.abort(); await assert.rejects(inspectWav(source(wav()), abort.signal));
  await assert.rejects(buildSongArchive(details, [track], async () => {}, abort.signal));
});
test('song metadata handles odd time signatures and rejects invalid names, counts and timing', async () => {
  const track = await inspectWav(source(wav(1)));
  assert.ok(songMetadata({ ...details, beats: 7, beatUnit: 8 }, [track]).flags[1].startsWith('001-05.001'));
  assert.throws(() => songMetadata(details, [])); assert.throws(() => songMetadata(details, Array(9).fill(track)));
  for (const name of ['', '  ', 'bad\nname', 'a'.repeat(65)]) assert.throws(() => validateSongName(name));
  for (const tempo of [0, 241, NaN]) assert.throws(() => validateSongTiming(tempo, 4, 4));
  assert.throws(() => validateSongTiming(120, 0, 4)); assert.throws(() => validateSongTiming(120, 4, 3));
});
test('song library excludes empty placeholders and prevents duplicate names', () => {
  const songs = parseShowcaseSongs([{ cid_: 1, ccid: -7, type: 4, posi: 0, name: 'Café', leng: 20 }, { ccid: -7, type: 2, posi: 1, name: 'Empty' }, { cid_: 2, ccid: -2, type: 2, posi: 0, name: 'Preset' }]);
  assert.equal(songs.length, 1); assert.throws(() => requireAvailableSongName(' CAFE\u0301 ', songs), /already exists/);
  assert.throws(() => requireAvailableSongName('New', Array(256).fill(songs[0])), /full/);
  assert.throws(() => parseShowcaseSongs(null)); assert.throws(() => parseShowcaseSongs([{ cid_: 1, ccid: -7, type: 4, posi: -1, name: 'Broken' }]));
});
test('import confirmation correlates operation and requires confirmed audio write', () => {
  const base = { archive_name: 'helyon-123', details: 'Progress', progress_percent: 100, res: 0 };
  assert.equal(parseSongIngestion(base, 'helyon-other.p35song'), null);
  assert.equal(confirmedSongId(parseSongIngestion(base, 'helyon-123.p35song')!), null);
  const final = { ...base, details: 'Song archive processed successfully (audio_write_confirmed=true). Song ID: 909, Content CID: 909' };
  assert.equal(confirmedSongId(final), 909); assert.equal(confirmedSongId({ ...final, res: -1 }), null);
});
test('Showcase commands use validated IDs and native acknowledgements', () => {
  assert.deepEqual(songSelectionCommand(42), { address: '/SetCurrentSong', types: 'i', args: [42] });
  assert.deepEqual(songTransportCommand('stop'), { address: '/TransportStop', types: '', args: [] });
  for (const value of [0, -7, NaN, 2147483648]) assert.throws(() => songSelectionCommand(value));
  requireShowcaseAcknowledgement([1, 0, 0]); for (const value of [null, [1], [1, -1, 0], [1, 0, -1]]) assert.throws(() => requireShowcaseAcknowledgement(value));
});

test('library reconciliation includes confirmed imports and excludes deleted stale entries', async () => {
  const row = (cid_: number, posi: number) => ({ cid_, posi, ccid: -7, type: 4, name: `Song ${cid_}`, leng: 20 });
  const checked: number[] = [];
  const songs = await resolveShowcaseSongs([row(1, 0)], [row(1, 0), row(2, 1), row(3, 2)], [4, 4], async id => { checked.push(id); return id === 3 ? null : row(id, id - 1); });
  assert.deepEqual(songs.map(song => song.id), [1, 2, 4]); assert.deepEqual(checked, [2, 3, 4]);
  await assert.rejects(resolveShowcaseSongs(null, [], [], async () => null));
});
