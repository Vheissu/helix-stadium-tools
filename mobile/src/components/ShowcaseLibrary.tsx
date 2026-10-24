import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, AppState, FlatList, StyleSheet, View } from 'react-native';
import { LibraryButton, libraryStyles } from './LibraryChrome';
import { UtilityIcon } from './UtilityIcon';
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
  const [refreshing, setRefreshing] = useState(false);
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
  return <FlatList style={{ flex: 1 }} contentContainerStyle={[libraryStyles.content, { paddingTop: 0 }]} data={songs}
    keyExtractor={song => String(song.id)} refreshing={refreshing} onRefresh={() => { if (!busy) { setError(''); setRefreshing(true); void refresh().finally(() => { if (mounted.current) setRefreshing(false); }); } }}
    ListHeaderComponent={<View style={styles.container}>
      <Text style={styles.body}>Songs stored on your Stadium.</Text>
      {!!error && <Text accessibilityRole="alert" style={styles.error}>Couldn’t complete that action. Check your Stadium connection and try again.</Text>}
      {active && <View style={styles.player}>
        <View style={styles.heading}><UtilityIcon name="play" color={COLORS.brand} /><Text style={styles.muted}>ON YOUR STADIUM</Text></View>
        <Text style={styles.playerTitle}>{active.name}</Text>
        <Text accessibilityLiveRegion="polite" style={styles.muted}>{transport === 1 ? 'Playing' : transport === 3 || transport === 0 ? 'Not playing' : 'Playback status unavailable'}</Text>
        <View style={styles.actions}>
          {(['play', 'pause', 'stop'] as const).map(action => <LibraryButton key={action} disabled={busy} primary={action === 'play'} icon={action}
            label={action[0].toUpperCase() + action.slice(1)} onPress={() => { void control(action); }} />)}
        </View>
      </View>}
      <View style={styles.heading}><Text accessibilityRole="header" style={styles.title}>Songs</Text><Text style={styles.muted}>{songs.length} / 256</Text></View>
      {loading && songs.length === 0 && <ActivityIndicator color={COLORS.text} />}
    </View>}
    ListEmptyComponent={!loading ? <View style={{ gap: 16 }}>{!error && <Text style={styles.muted}>No songs here yet. Add songs with the official Stadium editor, then refresh.</Text>}
      <LibraryButton label="Refresh songs" disabled={busy || !client} onPress={() => { setError(''); void refresh(); }} /></View> : undefined}
    renderItem={({ item: song, index }) => <Action disabled={busy} accessibilityLabel={`Load song ${song.name}`} accessibilityState={{ selected: song.id === activeId }}
      style={({ pressed }) => [styles.song, song.id === activeId && styles.activeSong, pressed && { backgroundColor: COLORS.raised }]} onPress={() => {
        if (!client) return; setLoading(true); setError('');
        void client.selectShowcaseSong(song.id).then(() => { onSongChange(); return refresh(true); }).catch(problem => setError(problem.message)).finally(() => setLoading(false));
      }}>
      <Text style={styles.position}>{String(index + 1).padStart(2, '0')}</Text>
      <View style={styles.songText}><Text style={styles.songTitle}>{song.name}</Text>{song.id === activeId && <Text style={styles.muted}>Selected</Text>}</View>
      <Text style={styles.muted}>{song.duration > 0 ? songDuration(song.duration) : ''}</Text>
    </Action>} />;
}
const styles = StyleSheet.create({
  container: { gap: 16, paddingBottom: 20 }, heading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 },
  title: { color: COLORS.text, fontSize: 18, fontWeight: '600' }, body: { color: COLORS.text, fontSize: 16, lineHeight: 23, flexShrink: 1 }, muted: { color: COLORS.muted, fontSize: 15, lineHeight: 21 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  secondary: { paddingHorizontal: 16, paddingVertical: 12, borderWidth: 1, borderColor: COLORS.stroke, borderRadius: 8, alignItems: 'center' },
  player: { backgroundColor: COLORS.panel, padding: 18, borderRadius: 12, gap: 12 }, song: { padding: 14, borderBottomWidth: 1, borderColor: COLORS.hairline, minHeight: 76, flexDirection: 'row', alignItems: 'center', gap: 12 }, activeSong: { backgroundColor: COLORS.control, borderRadius: 12, borderBottomColor: 'transparent' },
  songText: { flex: 1, gap: 5 }, songTitle: { color: COLORS.text, fontSize: 18, fontWeight: '600' },
  playerTitle: { color: COLORS.text, fontSize: 24, fontWeight: '600' },
  position: { color: COLORS.muted, fontVariant: ['tabular-nums'], fontSize: 15 },
  error: { color: COLORS.danger, fontSize: 16, lineHeight: 23 },
});
