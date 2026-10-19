import { useEffect, useRef, useState } from 'react';
import { AppState, NativeModules, StyleSheet, View } from 'react-native';
import { AccessibleText as Text } from '../accessibility/AccessibleText';
import { Action } from '../accessibility/controls';
import { startStadiumSearch, type StadiumDevice } from '../utils/stadiumDiscovery';
import { COLORS, FONTS } from '../theme/colors';

interface StadiumSearchProps {
  host: string;
  port: number;
  disabled: boolean;
  onSelect: (device: StadiumDevice) => void;
}

export function StadiumSearch({ host, port, disabled, onSelect }: StadiumSearchProps) {
  const [devices, setDevices] = useState<StadiumDevice[]>([]);
  const [searching, setSearching] = useState(false);
  const [message, setMessage] = useState('');
  const [attempt, setAttempt] = useState(0);
  const current = useRef<ReturnType<typeof startStadiumSearch> | null>(null);
  const userStopped = useRef(false);

  useEffect(() => {
    if (disabled) { setSearching(false); return; }
    let active = true;
    userStopped.current = false;
    setDevices([]);
    setSearching(true);
    setMessage('Searching for Stadiums…');
    const search = startStadiumSearch(NativeModules.StadiumDiscovery ?? null);
    current.current = search;
    void search.result.then(found => {
      if (!active || userStopped.current) return;
      setDevices(found);
      setMessage(found.length ? 'Choose your Stadium, then tap Connect.' : 'No Stadium found. Check that both devices use the same Wi-Fi, then search again or enter an address below.');
    }).catch(error => {
      if (active) setMessage(error instanceof Error ? error.message : 'Could not search this network. Check Wi-Fi and Local Network access, then try again.');
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
      <View style={styles.header}>
        <Text accessibilityRole="header" style={styles.title}>Stadiums on your network</Text>
        <Action disabled={disabled} accessibilityLabel={searching ? 'Stop searching for Stadiums' : 'Search for Stadiums again'}
          onPress={() => {
            if (searching) {
              userStopped.current = true;
              current.current?.cancel();
              setSearching(false);
              setMessage('Search stopped. You can enter an address below.');
            } else setAttempt(value => value + 1);
          }}>
          <Text style={styles.action}>{searching ? 'Stop' : 'Search again'}</Text>
        </Action>
      </View>
      <Text accessibilityLiveRegion="polite" style={styles.hint}>{message}</Text>
      {devices.map(device => {
        const selected = host.toLowerCase().replace(/\.$/, '') === device.host.toLowerCase() && port === device.port;
        return <Action key={`${device.host}:${device.port}`} disabled={disabled}
          accessibilityLabel={`Choose ${device.name}, ${device.host}`} accessibilityState={{ selected }}
          style={[styles.device, selected && styles.selected]} onPress={() => onSelect(device)}>
          <Text style={styles.name}>{device.name}{selected ? ' · Selected' : ''}</Text>
          <Text style={styles.hint}>{device.host}</Text>
        </Action>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: 6 },
  header: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  title: { color: COLORS.text, fontFamily: FONTS.bodySemi, fontSize: 15, flexShrink: 1 },
  action: { color: COLORS.accent, fontFamily: FONTS.bodySemi, fontSize: 14 },
  hint: { color: COLORS.muted, fontFamily: FONTS.body, fontSize: 14, lineHeight: 20 },
  device: { padding: 12, gap: 4, borderWidth: 1, borderColor: COLORS.stroke, borderRadius: 4, backgroundColor: COLORS.panel },
  selected: { borderColor: COLORS.signal },
  name: { color: COLORS.text, fontFamily: FONTS.bodySemi, fontSize: 16 },
});
