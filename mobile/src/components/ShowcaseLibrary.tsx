import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, AppState, StyleSheet, View } from 'react-native';
import { Action } from '../accessibility/controls';
import { AccessibleText as Text } from '../accessibility/AccessibleText';
import { COLORS } from '../theme/colors';
import type { HelixClient } from '../protocol/helixClient';
import { songDuration, type ShowcaseSong, type ShowcaseTransportAction } from '../protocol/showcase';

interface Props { client: HelixClient | null; onBusy: (busy: boolean) => void; onSongChange: () => void; }
export function ShowcaseLibrary({ client, onBusy, onSongChange }: Props) {
  const [songs, setSongs] = useState<ShowcaseSong[]>([]), [activeId, setActiveId] = useState<number | null>(null);
  const [transport, setTransport] = useState<number | null>(null), [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const mounted = useRef(true);
  const busy = loading;
  const refresh = useCallback(async (quiet = false) => {
    if (!client) return;
    if (!quiet) setLoading(true);
    try {
      const nextSongs = await client.getShowcaseSongs(); const id = await client.getActiveSongId(); const state = await client.getTransportState();
      if (mounted.current) { setSongs(nextSongs); setActiveId(id); setTransport(state?.[0] ?? null); }
    } catch (problem) { if (mounted.current && !quiet) setError((problem as Error).message); }
    finally { if (mounted.current && !quiet) setLoading(false); }
  }, [client]);
  useEffect(() => { mounted.current = true; void refresh(); return () => { mounted.current = false; }; }, [refresh]);
  useEffect(() => { onBusy(busy); return () => onBusy(false); }, [busy, onBusy]);
  useEffect(() => {
    if (!client) return;
    let pending = false;
    const timer = setInterval(() => {
      if (AppState.currentState !== 'active' || pending) return;
      pending = true;
      void Promise.all([client.getActiveSongId(), client.getTransportState()]).then(([id, state]) => { if (mounted.current) { setActiveId(id); setTransport(state?.[0] ?? null); } }).catch(() => {}).finally(() => { pending = false; });
    }, 2500);
    return () => clearInterval(timer);
  }, [client, refresh]);
  const control = async (action: ShowcaseTransportAction) => {
    if (!client || activeId === null) return;
    setLoading(true); setError('');
    try { const state = await client.controlShowcase(action, activeId); setTransport(state?.[0] ?? null); onSongChange(); }
    catch (problem) { setError((problem as Error).message); }
    finally { setLoading(false); }
  };
  const active = songs.find(song => song.id === activeId);
  return <View style={styles.container}>
    <View style={styles.heading}><Text accessibilityRole="header" style={styles.title}>Showcase</Text><Text style={styles.muted}>{songs.length} / 256 songs</Text></View>
    <Text style={styles.body}>Browse and play songs already stored on your Stadium.</Text>
    <View style={styles.actions}>
      <Action style={styles.secondary} disabled={busy || !client} onPress={() => { setError(''); void refresh(); }}><Text style={styles.body}>Refresh</Text></Action>
    </View>
    {!!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
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
    {!loading && !songs.length && <Text style={styles.muted}>Your song library is empty. Add songs with the official Stadium editor, then refresh this list.</Text>}
  </View>;
}
const styles = StyleSheet.create({
  container: { gap: 14 }, heading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 },
  title: { color: COLORS.text, fontSize: 28, fontWeight: '600' }, body: { color: COLORS.text, fontSize: 16, lineHeight: 23, flexShrink: 1 }, muted: { color: COLORS.muted, fontSize: 14, lineHeight: 21 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  secondary: { paddingHorizontal: 16, paddingVertical: 12, borderWidth: 1, borderColor: COLORS.stroke, borderRadius: 8, alignItems: 'center' },
  player: { backgroundColor: COLORS.panel, padding: 18, borderRadius: 12, gap: 12 }, song: { padding: 14, borderBottomWidth: 1, borderColor: COLORS.stroke, flexDirection: 'row', alignItems: 'center', gap: 12 }, activeSong: { backgroundColor: COLORS.panelAlt, borderLeftWidth: 3, borderLeftColor: COLORS.signal },
  songText: { flex: 1, gap: 5 }, songTitle: { color: COLORS.text, fontSize: 18, fontWeight: '600' },
  error: { color: COLORS.danger, fontSize: 16, lineHeight: 23 },
});
