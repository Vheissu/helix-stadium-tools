import { useEffect, useRef, useState } from 'react';
import { AppState, NativeModules, StyleSheet, View, useWindowDimensions } from 'react-native';
import { AccessibleText as Text } from '../accessibility/AccessibleText';
import { Action } from '../accessibility/controls';
import { formatDiscoveryError, startStadiumSearch, type StadiumDevice } from '../utils/stadiumDiscovery';
import { COLORS, FONT } from '../theme/colors';
import { UtilityIcon } from './UtilityIcon';

interface StadiumSearchProps {
  host: string;
  port: number;
  disabled: boolean;
  onSelect: (device: StadiumDevice) => void;
  onActivityChange?: (searching: boolean) => void;
}

export function StadiumSearch({ host, port, disabled, onSelect, onActivityChange }: StadiumSearchProps) {
  const [devices, setDevices] = useState<StadiumDevice[]>([]);
  const [searching, setSearching] = useState(false);
  const [message, setMessage] = useState('');
  const [problem, setProblem] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const current = useRef<ReturnType<typeof startStadiumSearch> | null>(null);
  const userStopped = useRef(false);
  const { fontScale } = useWindowDimensions();
  const stackHeader = fontScale > 1.5;
  useEffect(() => {
    onActivityChange?.(searching);
    return () => onActivityChange?.(false);
  }, [searching, onActivityChange]);

  useEffect(() => {
    if (disabled) { setSearching(false); return; }
    let active = true;
    userStopped.current = false;
    setDevices([]);
    setProblem(false);
    setSearching(true);
    setMessage('Searching for Stadiums…');
    const search = startStadiumSearch(NativeModules.StadiumDiscovery ?? null);
    current.current = search;
    void search.result.then(found => {
      if (!active || userStopped.current) return;
      setDevices(found);
      setMessage(found.length ? 'Choose your Stadium, then tap Connect.' : 'No Stadium found. Check Wi-Fi, search again or enter its address.');
    }).catch(error => {
      if (active && !userStopped.current) { setProblem(true); setMessage(formatDiscoveryError(error)); }
    }).finally(() => {
      if (active) setSearching(false);
    });
    const subscription = AppState.addEventListener('change', state => {
      if (state === 'background') {
        active = false;
        search.cancel();
        setSearching(false);
        setMessage('Search paused. Tap Search again when you return.');
      }
    });
    return () => {
      active = false;
      search.cancel();
      subscription.remove();
      if (current.current === search) current.current = null;
    };
  }, [attempt, disabled]);

  return (
    <View style={styles.section}>
      <View style={[styles.header, stackHeader && styles.headerStacked]}>
        <Text accessibilityRole="header" style={styles.title}>Nearby Stadiums</Text>
        <Action disabled={disabled} accessibilityLabel={searching ? 'Stop searching for Stadiums' : 'Search for Stadiums again'}
          onPress={() => {
            if (searching) {
              userStopped.current = true;
              current.current?.cancel();
              setSearching(false);
              setMessage('Search stopped. Search again or enter an address.');
            } else setAttempt(value => value + 1);
          }} style={({ pressed }) => [styles.headerAction, stackHeader && styles.headerActionStacked, pressed && { opacity: 0.6 }, disabled && { opacity: 0.45 }]}>
          <Text style={styles.action}>{searching ? 'Stop' : 'Search again'}</Text>
        </Action>
      </View>
      {devices.length === 0 && <View style={styles.empty}>
        <UtilityIcon name="wifi" size={28} color={searching ? COLORS.text : COLORS.muted} />
        <View style={styles.emptyText}><Text style={styles.emptyTitle}>{searching ? 'Finding your Stadium' : problem ? 'Search unavailable' : 'Nothing nearby yet'}</Text>
        <Text accessibilityLiveRegion="polite" style={styles.hint}>{message}</Text></View>
      </View>}
      {devices.length > 0 && <Text accessibilityLiveRegion="polite" style={styles.hint}>{devices.length} {devices.length === 1 ? 'Stadium found' : 'Stadiums found'}</Text>}
      <View accessibilityRole="radiogroup" accessibilityLabel="Nearby Stadiums" style={styles.devices}>{devices.map(device => {
        const selected = host.toLowerCase().replace(/\.$/, '') === device.host.toLowerCase() && port === device.port;
        return <Action key={`${device.host}:${device.port}`} disabled={disabled}
          accessibilityRole="radio" accessibilityLabel={`Choose ${device.name}, ${device.host}`} accessibilityState={{ checked: selected }}
          accessibilityHint="Selects this Stadium. Then tap Connect."
          style={({ pressed }) => [styles.device, selected && styles.selected, pressed && styles.pressed]} onPress={() => onSelect(device)}>
          <View style={styles.deviceIcon}><UtilityIcon name="device" size={34} color={selected ? COLORS.text : COLORS.muted} /></View>
          <View style={styles.deviceText}><Text style={styles.name}>{device.name}</Text>
          {device.host.toLowerCase() !== `${device.name.toLowerCase()}.local` && <Text style={styles.hint}>{device.host}</Text>}</View>
          <View style={[styles.selection, selected && styles.selectionActive]}>{selected && <UtilityIcon name="check" size={16} color={COLORS.bg} />}</View>
        </Action>;
      })}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: 10 },
  devices: { gap: 10 },
  // One row: the title shrinks and wraps, the action stays trailing.
  header: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  title: { color: COLORS.text, ...FONT.semibold, fontSize: 15, lineHeight: 20, flex: 1, minWidth: 0 },
  headerAction: { flexShrink: 0, alignItems: 'flex-end', paddingLeft: 8 },
  headerStacked: { flexDirection: 'column', alignItems: 'stretch', gap: 0 },
  headerActionStacked: { alignItems: 'flex-start', paddingLeft: 0 },
  action: { color: COLORS.accent, ...FONT.semibold, fontSize: 15, textAlign: 'right' },
  hint: { color: COLORS.muted, ...FONT.body, fontSize: 15, lineHeight: 21 },
  device: { padding: 16, gap: 14, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: 'transparent', borderRadius: 16, backgroundColor: COLORS.panel },
  selected: { borderColor: COLORS.accentMid, backgroundColor: COLORS.control },
  pressed: { backgroundColor: COLORS.raised },
  name: { color: COLORS.text, ...FONT.semibold, fontSize: 18, marginBottom: 3 },
  deviceText: { flex: 1, minWidth: 0 },
  deviceIcon: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  selection: { width: 22, height: 22, borderRadius: 11, borderWidth: 1, borderColor: COLORS.wire, alignItems: 'center', justifyContent: 'center' },
  selectionActive: { borderColor: COLORS.text, backgroundColor: COLORS.text },
  empty: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 20, backgroundColor: COLORS.panel, borderRadius: 16, minHeight: 112 },
  emptyText: { flex: 1, minWidth: 0 },
  emptyTitle: { color: COLORS.text, ...FONT.medium, fontSize: 17, marginBottom: 6 },
});
