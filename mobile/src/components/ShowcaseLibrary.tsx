import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, AppState, Keyboard, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { File, Paths } from 'expo-file-system';
import { Action } from '../accessibility/controls';
import { AccessibleText as Text } from '../accessibility/AccessibleText';
import { COLORS } from '../theme/colors';
import type { HelixClient } from '../protocol/helixClient';
import { songDuration, validateSongName, validateSongTiming, type ShowcaseSong, type ShowcaseTransportAction } from '../protocol/showcase';
import { songUploadAvailable, uploadShowcaseSong, type PickedTrack, type UploadProgress } from '../services/showcaseUpload';
import { BottomSheet } from './BottomSheet';

interface Props { client: HelixClient | null; onBusy: (busy: boolean) => void; onSongChange: () => void; }
export function ShowcaseLibrary({ client, onBusy, onSongChange }: Props) {
  const [songs, setSongs] = useState<ShowcaseSong[]>([]), [activeId, setActiveId] = useState<number | null>(null);
  const [transport, setTransport] = useState<number | null>(null), [loading, setLoading] = useState(false);
  const [error, setError] = useState(''), [notice, setNotice] = useState(''), [sheet, setSheet] = useState(false);
  const [name, setName] = useState(''), [tempo, setTempo] = useState('120'), [beats, setBeats] = useState('4'), [unit, setUnit] = useState('4');
  const [tracks, setTracks] = useState<PickedTrack[]>([]), [progress, setProgress] = useState<UploadProgress | null>(null);
  const controller = useRef<AbortController | null>(null), picked = useRef<PickedTrack[]>([]), mounted = useRef(true), working = useRef(false);
  const busy = loading || progress !== null;
  const refresh = useCallback(async (quiet = false) => {
    if (!client) return;
    if (!quiet) setLoading(true);
    try {
      const nextSongs = await client.getShowcaseSongs(); const id = await client.getActiveSongId(); const state = await client.getTransportState();
      if (mounted.current) { setSongs(nextSongs); setActiveId(id); setTransport(state?.[0] ?? null); }
    } catch (problem) { if (mounted.current && !quiet) setError((problem as Error).message); }
    finally { if (mounted.current && !quiet) setLoading(false); }
  }, [client]);
  const cleanupPicked = useCallback(() => {
    for (const track of picked.current) { const file = new File(track.uri); if (file.uri.startsWith(Paths.cache.uri) && file.exists) file.delete(); }
    picked.current = [];
  }, []);
  useEffect(() => { mounted.current = true; void refresh(); return () => { mounted.current = false; controller.current?.abort(); if (!working.current) cleanupPicked(); }; }, [refresh, cleanupPicked]);
  useEffect(() => { onBusy(busy); return () => onBusy(false); }, [busy, onBusy]);
  useEffect(() => {
    if (!client) return;
    let pending = false;
    const timer = setInterval(() => {
      if (AppState.currentState !== 'active' || working.current || pending) return;
      pending = true;
      void Promise.all([client.getActiveSongId(), client.getTransportState()]).then(([id, state]) => { if (mounted.current) { setActiveId(id); setTransport(state?.[0] ?? null); } }).catch(() => {}).finally(() => { pending = false; });
    }, 2500);
    return () => clearInterval(timer);
  }, [client, refresh]);
  const chooseFiles = async () => {
    setError('');
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: ['audio/wav', 'audio/x-wav', 'audio/vnd.wave'], multiple: true, copyToCacheDirectory: true });
      if (result.canceled) return;
      if (result.assets.length > 8) { for (const asset of result.assets) { const file = new File(asset.uri); if (file.uri.startsWith(Paths.cache.uri) && file.exists) file.delete(); } throw new Error('Choose no more than 8 audio tracks.'); }
      cleanupPicked();
      const next = result.assets.map(asset => ({ uri: asset.uri, name: asset.name.replace(/\.wav$/i, '').slice(0, 64) || 'Track' }));
      picked.current = next; setTracks(next); if (!name.trim() && next[0]) setName(next[0].name);
    } catch (problem) { setError((problem as Error).message); }
  };
  const control = async (action: ShowcaseTransportAction) => {
    if (!client || activeId === null) return;
    setLoading(true); setError('');
    try { const state = await client.controlShowcase(action, activeId); setTransport(state?.[0] ?? null); onSongChange(); }
    catch (problem) { setError((problem as Error).message); }
    finally { setLoading(false); }
  };
  const upload = async () => {
    if (!client || working.current) return;
    setError(''); setNotice('');
    try { validateSongName(name); validateSongTiming(Number(tempo), Number(beats), Number(unit)); if (!tracks.length) throw new Error('Choose at least one WAV track.'); }
    catch (problem) { setError((problem as Error).message); return; }
    Keyboard.dismiss(); working.current = true; const abort = new AbortController(); controller.current = abort;
    try {
      const song = await uploadShowcaseSong({ client, details: { name, tempo: Number(tempo), beats: Number(beats), beatUnit: Number(unit) }, tracks, signal: abort.signal,
        onProgress: next => { if (mounted.current) setProgress(next); },
        confirmIdentity: (host, fingerprint, changed) => new Promise(resolve => Alert.alert(changed ? 'Device identity changed' : 'Allow song uploads?', `${changed ? 'This device has a different identity than last time. Continue only if you recently updated or reset your Stadium.\n\n' : 'Pair song uploads with your connected Stadium.\n\n'}${host}\n${fingerprint}`, [{ text: 'Cancel', style: 'cancel', onPress: () => resolve(false) }, { text: changed ? 'Trust updated device' : 'Pair device', onPress: () => resolve(true) }], { cancelable: false })),
      });
      if (mounted.current) { setSongs(current => [...current.filter(item => item.id !== song.id), song].sort((a, b) => a.position - b.position)); setNotice(`${song.name} is ready on your Stadium.`); setSheet(false); setName(''); setTracks([]); }
      cleanupPicked(); await refresh(true);
    } catch (problem) { if (mounted.current) setError((problem as Error).message); }
    finally { working.current = false; controller.current = null; if (mounted.current) setProgress(null); else cleanupPicked(); }
  };
  const active = songs.find(song => song.id === activeId);
  const progressLabel = progress ? `${{ checking: 'Checking audio', preparing: 'Preparing song', uploading: 'Uploading song', importing: 'Importing on Stadium' }[progress.stage]}${progress.fraction > 0 ? ` · ${Math.round(progress.fraction * 100)}%` : '…'}` : '';
  return <View style={styles.container}>
    <View style={styles.heading}><Text accessibilityRole="header" style={styles.title}>Showcase</Text><Text style={styles.muted}>{songs.length} / 256 songs</Text></View>
    <Text style={styles.body}>Upload backing tracks and play songs from your Stadium.</Text>
    <View style={styles.actions}>
      <Action style={styles.primary} disabled={busy || !client || !songUploadAvailable} onPress={() => { setError(''); setSheet(true); }}><Text style={styles.primaryText}>Upload song</Text></Action>
      <Action style={styles.secondary} disabled={busy || !client} onPress={() => { setError(''); void refresh(); }}><Text style={styles.body}>Refresh</Text></Action>
    </View>
    {!songUploadAvailable && <Text style={styles.muted}>Song uploads are unavailable in this build.</Text>}
    {!!notice && <Text accessibilityLiveRegion="polite" style={styles.success}>{notice}</Text>}
    {!!error && !sheet && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
    {active && <View style={styles.player}>
      <Text style={styles.muted}>ON YOUR STADIUM</Text><Text style={styles.songTitle}>{active.name}</Text>
      <Text accessibilityLiveRegion="polite" style={styles.muted}>{transport === 1 ? 'Playing' : transport === 3 || transport === 0 ? 'Not playing' : 'Playback status unavailable'}</Text>
      <View style={styles.actions}>
        {(['play', 'pause', 'stop'] as const).map(action => <Action key={action} disabled={busy} style={styles.secondary} accessibilityLabel={`${action[0].toUpperCase() + action.slice(1)} song`} onPress={() => { void control(action); }}><Text style={styles.body}>{action[0].toUpperCase() + action.slice(1)}</Text></Action>)}
      </View>
    </View>}
    {loading && <ActivityIndicator color={COLORS.text} />}
    {songs.map(song => <Action key={song.id} disabled={busy} accessibilityLabel={`Load song ${song.name}`} accessibilityState={{ selected: song.id === activeId }} style={[styles.song, song.id === activeId && styles.activeSong]} onPress={() => {
      if (!client) return; setLoading(true); setError('');
      void client.selectShowcaseSong(song.id).then(() => { onSongChange(); return refresh(true); }).catch(problem => setError(problem.message)).finally(() => setLoading(false));
    }}><View style={styles.songText}><Text style={styles.songTitle}>{song.name}</Text><Text style={styles.muted}>{song.id === activeId ? 'Selected' : 'Tap to load'}</Text></View><Text style={styles.muted}>{song.duration > 0 ? songDuration(song.duration) : ''}</Text></Action>)}
    {!loading && !songs.length && <Text style={styles.muted}>Your song library is empty. Upload a backing track or a set of stems to get started.</Text>}
    <BottomSheet visible={sheet} title="Upload song" closeDisabled={progress !== null} onClose={() => { setSheet(false); setError(''); }}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.form}>
        <Text style={styles.body}>Choose 1–8 WAV tracks: 48 kHz, 16-bit, mono or stereo, up to 13 minutes. Stems should all start at the same point. A microSD card must be inserted in the Stadium.</Text>
        <Action disabled={progress !== null} onPress={() => { void chooseFiles(); }} style={styles.secondary}><Text style={styles.body}>{tracks.length ? 'Change audio files' : 'Choose audio files'}</Text></Action>
        {tracks.map((track, index) => <View key={track.uri} style={styles.track}><Text style={styles.muted}>Track {index + 1}</Text><TextInput accessibilityLabel={`Track ${index + 1} name`} style={styles.input} editable={!progress} maxLength={64} value={track.name} onChangeText={value => setTracks(current => current.map((item, i) => i === index ? { ...item, name: value } : item))} /></View>)}
        <Text style={styles.body}>Song name</Text><TextInput accessibilityLabel="Song name" style={styles.input} value={name} onChangeText={setName} maxLength={64} editable={!progress} autoCorrect={false} />
        <View style={styles.timing}>
          <View style={styles.field}><Text style={styles.body}>Tempo (BPM)</Text><TextInput accessibilityLabel="Song tempo" style={styles.input} value={tempo} onChangeText={setTempo} keyboardType="decimal-pad" editable={!progress} /></View>
          <View style={styles.field}><Text style={styles.body}>Beats</Text><TextInput accessibilityLabel="Beats per bar" style={styles.input} value={beats} onChangeText={setBeats} keyboardType="number-pad" editable={!progress} /></View>
          <View style={styles.field}><Text style={styles.body}>Beat unit</Text><TextInput accessibilityLabel="Beat unit" style={styles.input} value={unit} onChangeText={setUnit} keyboardType="number-pad" editable={!progress} /></View>
        </View>
        {!!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
        {progress ? <View style={styles.form}><Text accessibilityLiveRegion="polite" style={styles.body}>{progressLabel}</Text><View accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 100, now: Math.round(progress.fraction * 100) }} style={styles.progressTrack}><View style={[styles.progressFill, { width: `${progress.fraction * 100}%` }]} /></View>
          <Text style={styles.muted}>{progress.cancellable ? 'Keep HELYON open while uploading.' : 'The Stadium is importing your song. Keep HELYON open until it finishes.'}</Text>
          {progress.cancellable && <Action onPress={() => controller.current?.abort()} style={styles.secondary}><Text style={styles.body}>Cancel upload</Text></Action>}
        </View> : <Action disabled={!tracks.length} style={styles.primary} onPress={() => { void upload(); }}><Text style={styles.primaryText}>Upload to Stadium</Text></Action>}
      </ScrollView>
    </BottomSheet>
  </View>;
}
const styles = StyleSheet.create({
  container: { gap: 14 }, heading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 },
  title: { color: COLORS.text, fontSize: 28, fontWeight: '600' }, body: { color: COLORS.text, fontSize: 16, lineHeight: 23, flexShrink: 1 }, muted: { color: COLORS.muted, fontSize: 14, lineHeight: 21 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 }, primary: { paddingHorizontal: 18, paddingVertical: 12, borderRadius: 8, backgroundColor: COLORS.text, alignItems: 'center' }, primaryText: { color: COLORS.bg, fontSize: 16, fontWeight: '600' },
  secondary: { paddingHorizontal: 16, paddingVertical: 12, borderWidth: 1, borderColor: COLORS.stroke, borderRadius: 8, alignItems: 'center' },
  player: { backgroundColor: COLORS.panel, padding: 18, borderRadius: 12, gap: 12 }, song: { padding: 14, borderBottomWidth: 1, borderColor: COLORS.stroke, flexDirection: 'row', alignItems: 'center', gap: 12 }, activeSong: { backgroundColor: COLORS.panelAlt, borderLeftWidth: 3, borderLeftColor: COLORS.signal },
  songText: { flex: 1, gap: 5 }, songTitle: { color: COLORS.text, fontSize: 18, fontWeight: '600' }, form: { gap: 14, paddingBottom: 24 }, track: { gap: 6 },
  input: { minHeight: 48, borderWidth: 1, borderColor: COLORS.stroke, borderRadius: 8, color: COLORS.text, fontSize: 16, padding: 12 }, timing: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 }, field: { flex: 1, minWidth: 85, gap: 8 },
  error: { color: COLORS.danger, fontSize: 16, lineHeight: 23 }, success: { color: COLORS.signal, fontSize: 16 }, progressTrack: { height: 6, borderRadius: 3, backgroundColor: COLORS.stroke, overflow: 'hidden' }, progressFill: { height: 6, backgroundColor: COLORS.signal },
});
