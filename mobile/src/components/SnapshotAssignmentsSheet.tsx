import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { AccessibleText as Text } from '../accessibility/AccessibleText';
import { Action } from '../accessibility/controls';
import { COLORS, FONT } from '../theme/colors';
import type { SnapshotParameter } from '../protocol/snapshotAssignments';
import { BottomSheet } from './BottomSheet';

type Parameter = { id: number; name: string; type: 'f' | 'i' | 'b' };
interface Props {
  identity: string | null; name: string; parameters: Parameter[];
  read: () => Promise<SnapshotParameter[]>;
  change: (id: number, assigned: boolean, type: Parameter['type']) => Promise<SnapshotParameter[]>;
  onClose: () => void;
}
export function SnapshotAssignmentsSheet(props: Props) {
  const [values, setValues] = useState<SnapshotParameter[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const operations = useRef<symbol | null>(null);
  const pending = useRef(false);
  const callbacks = useRef(props); callbacks.current = props;
  useEffect(() => {
    const token = Symbol('snapshot assignment'); operations.current = token;
    setValues([]); setError('');
    if (!props.identity) return;
    pending.current = true; setBusy(true);
    callbacks.current.read().then(result => { if (token === operations.current) setValues(result); })
      .catch(problem => { if (token === operations.current) setError(problem instanceof Error ? problem.message : 'Could not read snapshot assignments.'); })
      .finally(() => { if (token === operations.current) { pending.current = false; setBusy(false); } });
    return () => { operations.current = null; pending.current = false; };
  }, [props.identity]);
  const change = async (parameter: Parameter, value: SnapshotParameter) => {
    if (pending.current) return;
    const token = Symbol('snapshot assignment'); operations.current = token;
    pending.current = true; setBusy(true); setError('');
    try {
      const result = await props.change(parameter.id, !value.assigned, parameter.type);
      if (token === operations.current) setValues(result);
    } catch (problem) {
      if (token === operations.current) { setError(problem instanceof Error ? problem.message : 'The assignment was not confirmed.'); setValues([]); }
    } finally { if (token === operations.current) { pending.current = false; setBusy(false); } }
  };
  return <BottomSheet visible={!!props.identity} title="Snapshot controls" subtitle={props.name} fill closeDisabled={busy} onClose={props.onClose}>
    <Text style={styles.hint}>Turn on the parameters you want snapshots to control. Then select each snapshot, adjust its values and save the preset.</Text>
    {!!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
    {busy && <ActivityIndicator accessibilityLabel="Updating snapshot controls" color={COLORS.accent} />}
    <FlatList data={props.parameters} keyExtractor={p => String(p.id)} style={styles.list}
      ListEmptyComponent={<Text style={styles.hint}>No parameters are available for snapshot control.</Text>}
      renderItem={({ item }) => {
        const value = values.find(p => p.id === item.id);
        const unavailable = !value || value.controllerId > 0;
        return <Action accessibilityRole="switch" accessibilityLabel={`${item.name}, snapshot control`}
          accessibilityState={{ checked: value?.assigned ?? false, disabled: busy || unavailable }} disabled={busy || unavailable}
          onPress={() => { if (value) void change(item, value); }} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
          <View style={styles.copy}><Text style={styles.name}>{item.name}</Text>
            {value?.controllerId ? <Text style={styles.detail}>Another controller is assigned</Text> : !value && !busy ? <Text style={styles.detail}>Unavailable. Close and reopen to refresh.</Text> : null}
          </View>
          <Text style={[styles.state, value?.assigned && styles.assigned]}>{value ? (value.assigned ? 'On' : 'Off') : '—'}</Text>
        </Action>;
      }} />
  </BottomSheet>;
}
const styles = StyleSheet.create({
  list: { flex: 1 }, hint: { color: COLORS.muted, fontSize: 15, lineHeight: 22, marginBottom: 16 },
  error: { color: COLORS.danger, fontSize: 15, lineHeight: 22, marginBottom: 12 },
  row: { minHeight: 64, flexDirection: 'row', gap: 16, alignItems: 'center', paddingVertical: 12, paddingHorizontal: 8, borderBottomColor: COLORS.stroke, borderBottomWidth: StyleSheet.hairlineWidth },
  copy: { flex: 1, gap: 4 }, name: { color: COLORS.text, fontSize: 17, ...FONT.medium },
  detail: { color: COLORS.muted, fontSize: 14, lineHeight: 20 }, state: { color: COLORS.muted, fontSize: 16, ...FONT.semibold },
  assigned: { color: COLORS.accent }, pressed: { backgroundColor: COLORS.raised },
});
