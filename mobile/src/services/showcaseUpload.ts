import { NativeEventEmitter, NativeModules } from 'react-native';
import { File, FileMode, Paths, type FileHandle } from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import credentials from '../generated/transfer-credentials.json';
import { buildSongArchive, inspectWav, type AudioSource, type SongDetails } from '../protocol/songArchive';
import { confirmedSongId, parseSongIngestion, requireAvailableSongName } from '../protocol/songImport';
import type { HelixClient } from '../protocol/helixClient';
import { parseShowcaseSongs, type ShowcaseSong } from '../protocol/showcase';

interface TransferProgress { jobId: string; bytes: number; total: number; phase?: 'ready'; }
interface TransferModule {
  newJob(): Promise<string>; probe(host: string): Promise<{ fingerprint: string }>;
  upload(options: { jobId: string; host: string; fingerprint: string; keys: string[]; uri: string; filename: string }): Promise<{ committed: boolean }>;
  commit(jobId: string): void; cancel(jobId: string): void;
  addListener(event: string): void; removeListeners(count: number): void;
}
const transfer = NativeModules.StadiumTransfer as TransferModule | undefined;
export const songUploadAvailable = !!transfer && credentials.keys.length > 0;
export type PickedTrack = { uri: string; name: string };
export type UploadProgress = { stage: 'checking' | 'preparing' | 'uploading' | 'importing'; fraction: number; cancellable: boolean };
export async function uploadShowcaseSong(options: {
  client: HelixClient; details: SongDetails; tracks: PickedTrack[]; signal: AbortSignal;
  onProgress: (progress: UploadProgress) => void;
  confirmIdentity: (host: string, fingerprint: string, changed: boolean) => Promise<boolean>;
}): Promise<ShowcaseSong> {
  if (!transfer || !credentials.keys.length) throw new Error('Song uploads are unavailable in this build.');
  const { client, details, tracks, signal, onProgress } = options;
  const checkDestination = async () => {
    signal.throwIfAborted();
    if ((await client.getProperty('volatile.sdcard.inserted'))?.value !== 1) throw new Error('Insert a microSD card into the Stadium before uploading a song.');
    requireAvailableSongName(details.name, await client.getShowcaseSongs());
  };
  onProgress({ stage: 'checking', fraction: 0, cancellable: true }); await checkDestination();
  const host = client.getDeviceHost(); const { fingerprint } = await transfer.probe(host);
  const identityKey = `showcase-device-identity:${host.toLowerCase()}`; const saved = await AsyncStorage.getItem(identityKey);
  if (saved !== fingerprint) {
    if (!await options.confirmIdentity(host, fingerprint, saved !== null)) throw new Error('Song upload cancelled.');
    signal.throwIfAborted(); await AsyncStorage.setItem(identityKey, fingerprint);
  }
  const jobId = await transfer.newJob(); const filename = `helyon-${jobId}.p35song`;
  const prepared = new File(Paths.cache, filename); const handles: FileHandle[] = [];
  let output: FileHandle | null = null, nativeActive = false, committed = false, beforeCommitError: Error | null = null;
  let ingestion: { id?: number; error?: Error } | null = null;
  let notifyIngestion: (() => void) | null = null;
  const unsubscribe = client.subscribeEvents(event => {
    if (event.property?.key !== 'volatile.song.ingestion.result') return;
    const result = parseSongIngestion(event.property.value, filename); if (!result) return;
    onProgress({ stage: 'importing', fraction: result.progress_percent / 100, cancellable: false });
    if (result.res < 0) ingestion = { error: new Error('The Stadium could not import this song. Check the microSD card and audio files, then refresh the library.') };
    const id = confirmedSongId(result); if (id) ingestion = { id };
    if (ingestion) notifyIngestion?.();
  });
  const abort = () => { if (nativeActive && !committed) transfer.cancel(jobId); };
  signal.addEventListener('abort', abort);
  const emitter = new NativeEventEmitter(transfer);
  let committing = false;
  const progressListener = emitter.addListener('StadiumSongUploadProgress', (value: object) => {
    const event = value as TransferProgress;
    if (event.jobId !== jobId) return;
    if (event.phase !== 'ready') { onProgress({ stage: 'uploading', fraction: event.total > 0 ? event.bytes / event.total : 0, cancellable: true }); return; }
    if (committing) return; committing = true;
    void checkDestination().then(() => {
      signal.throwIfAborted(); committed = true;
      onProgress({ stage: 'importing', fraction: 0, cancellable: false }); transfer.commit(jobId);
    }).catch(error => { beforeCommitError = error; transfer.cancel(jobId); });
  });
  try {
    if (tracks.length < 1 || tracks.length > 8) throw new Error('Choose between 1 and 8 audio tracks.');
    if (tracks.reduce((sum, track) => sum + new File(track.uri).size, 0) > 1000000000) throw new Error('Keep the combined audio below 1 GB.');
    const inspected = [];
    for (let i = 0; i < tracks.length; i++) {
      signal.throwIfAborted(); const item = tracks[i]; const file = new File(item.uri); const handle = file.open(FileMode.ReadOnly); handles.push(handle);
      const source: AudioSource = { name: item.name, size: file.size, read: async (offset, length) => { handle.offset = offset; return handle.readBytes(length); } };
      inspected.push(await inspectWav(source, signal)); onProgress({ stage: 'checking', fraction: (i + 1) / tracks.length, cancellable: true });
    }
    prepared.create(); output = prepared.open(FileMode.WriteOnly);
    await buildSongArchive(details, inspected, bytes => output!.writeBytes(Uint8Array.from(bytes)), signal, fraction => onProgress({ stage: 'preparing', fraction, cancellable: true }));
    output.close(); output = null;
    await checkDestination(); nativeActive = true;
    await transfer.upload({ jobId, host, fingerprint, keys: credentials.keys, uri: prepared.uri, filename });
    nativeActive = false; committed = true;
    if (!ingestion) await new Promise<void>(resolve => {
      const timeout = setTimeout(resolve, 120000);
      notifyIngestion = () => { clearTimeout(timeout); resolve(); };
    });
    const result = ingestion as { id?: number; error?: Error } | null;
    if (result?.error) throw result.error;
    if (!result?.id) throw new Error('The song was uploaded, but import is not yet confirmed. Refresh the song library before trying again.');
    for (let attempt = 0; attempt < 20; attempt++) {
      const song = parseShowcaseSongs([await client.getContentRef(result.id!, true)]).find(item => item.id === result.id && item.name === details.name.trim());
      if (song) return song;
      await new Promise(resolve => setTimeout(resolve, 250));
    }
    throw new Error('The Stadium imported the song, but the library has not refreshed yet. Refresh before trying again.');
  } catch (error) {
    if (beforeCommitError) throw beforeCommitError;
    if (signal.aborted && !committed) throw new Error('Song upload cancelled.', { cause: error });
    throw error;
  } finally {
    unsubscribe(); progressListener.remove(); signal.removeEventListener('abort', abort);
    if (nativeActive && !committed) transfer.cancel(jobId);
    output?.close(); for (const handle of handles) handle.close();
    if (prepared.exists) prepared.delete();
  }
}
