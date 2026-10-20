import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { AccessibleText as Text } from '../accessibility/AccessibleText';
import { Action } from '../accessibility/controls';
import { COLORS, FONTS } from '../theme/colors';
import type { PerformView, StompBanks } from '../utils/perform';

export type PerformSnapshot = { index: number; name?: string; colr?: number };
type Props = {
  view: PerformView;
  onViewChange: (view: PerformView) => void;
  banks: StompBanks | null;
  snapshots: PerformSnapshot[];
  snapshotCount: number;
  activeSnapshotIndex: number | null;
  onSnapshot: (index: number) => void;
  snapshotDisabled?: boolean;
  onRefresh: () => void;
  colorFor: (value: number | null | undefined) => string;
};

export function PerformControls(props: Props) {
  const { width, fontScale } = useWindowDimensions();
  const columns = fontScale > 1.5 || width < 360 ? 1 : width >= 760 ? 5 : 2;
  const switches = props.view === 'snapshots' ? null : props.banks?.[props.view];
  return <View style={styles.section}>
    <View accessibilityRole="tablist" accessibilityLabel="Perform view" style={styles.selector}>
      {([['a', 'Stomp A'], ['b', 'Stomp B'], ['snapshots', 'Snapshots']] as const).map(([view, label]) =>
        <Action key={view} accessibilityRole="tab" accessibilityState={{ selected: props.view === view }}
          accessibilityLabel={label} onPress={() => props.onViewChange(view)}
          style={[styles.tab, fontScale > 1.5 && styles.tabLargeText, props.view === view && styles.tabSelected]}>
          <Text style={[styles.tabText, props.view === view && styles.tabTextSelected]}>{label}</Text>
        </Action>)}
    </View>
    {props.view === 'snapshots' ? <>
      <Text accessibilityRole="header" style={styles.heading}>Snapshots</Text>
      {props.snapshotCount > 0 ? <View style={styles.grid}>
        {Array.from({ length: Math.min(8, props.snapshotCount) }, (_, index) => {
          const snapshot = props.snapshots.find(s => s.index === index);
          const active = props.activeSnapshotIndex === index;
          const name = snapshot?.name?.trim() || `Snapshot ${index + 1}`;
          return <Action key={index} accessibilityLabel={`Activate snapshot ${index + 1}, ${name}`}
            accessibilityState={{ selected: active }} disabled={props.snapshotDisabled} onPress={() => props.onSnapshot(index)}
            style={[styles.tile, { width: `${100 / columns - (columns > 1 ? 2 : 0)}%` }, active && styles.tileSelected]}>
            <View style={styles.tileHeader}>
              <View style={[styles.swatch, { backgroundColor: props.colorFor(snapshot?.colr) }]} />
              <Text style={styles.number}>{index + 1}</Text>
              {active && <Text style={styles.active}>Active</Text>}
            </View>
            <Text style={styles.name}>{name}</Text>
          </Action>;
        })}
      </View> : <Text style={styles.hint}>No snapshots loaded. Refresh to read the current preset.</Text>}
    </> : <>
      <Text accessibilityRole="header" style={styles.heading}>Stomp {props.view.toUpperCase()}</Text>
      <Text style={styles.hint}>View your switch assignments here. Use the Stadium footswitches to trigger them.</Text>
      {switches ? <View style={styles.grid}>
        {switches.map(item => <View key={item.number} accessible accessibilityRole="text"
          accessibilityLabel={`Stomp ${props.view.toUpperCase()}${item.number}, ${item.label}`}
          style={[styles.tile, { width: `${100 / columns - (columns > 1 ? 2 : 0)}%` }]}>
          <View style={styles.tileHeader}>
            <View style={[styles.swatch, { backgroundColor: props.colorFor(item.color) }]} />
            <Text style={styles.number}>{props.view.toUpperCase()}{item.number}</Text>
          </View>
          <Text style={[styles.name, !item.assigned && item.label === 'Unassigned' && styles.unassigned]}>{item.label}</Text>
        </View>)}
      </View> : <Text style={styles.hint}>Switch assignments are unavailable. Refresh to read the current preset.</Text>}
    </>}
    <Action accessibilityLabel="Refresh snapshots and stomp assignments" onPress={props.onRefresh} style={styles.refresh}>
      <Text style={styles.refreshText}>Refresh</Text>
    </Action>
  </View>;
}

const styles = StyleSheet.create({
  section: { gap: 12 },
  selector: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, padding: 4, backgroundColor: COLORS.panel, borderRadius: 10 },
  tab: { flexGrow: 1, flexBasis: 96, alignItems: 'center', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 10 },
  tabLargeText: { flexBasis: '100%' },
  tabSelected: { backgroundColor: COLORS.text },
  tabText: { color: COLORS.text, fontFamily: FONTS.bodySemi, fontSize: 15, textAlign: 'center' },
  tabTextSelected: { color: COLORS.bg },
  heading: { color: COLORS.text, fontFamily: FONTS.bodySemi, fontSize: 18 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  tile: { backgroundColor: COLORS.panelAlt, borderColor: COLORS.stroke, borderWidth: 1, borderRadius: 8, padding: 12, gap: 10, minHeight: 88 },
  tileSelected: { borderColor: COLORS.accent, backgroundColor: COLORS.accentDim },
  tileHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  swatch: { width: 12, height: 12, borderRadius: 6 },
  number: { color: COLORS.text, fontFamily: FONTS.mono, fontSize: 15 },
  active: { color: COLORS.signal, fontFamily: FONTS.bodySemi, fontSize: 13 },
  name: { color: COLORS.text, fontFamily: FONTS.body, fontSize: 16, lineHeight: 22 },
  unassigned: { color: COLORS.muted },
  hint: { color: COLORS.muted, fontFamily: FONTS.body, fontSize: 15, lineHeight: 22 },
  refresh: { alignSelf: 'flex-start', paddingHorizontal: 14, borderRadius: 6, borderWidth: 1, borderColor: COLORS.stroke },
  refreshText: { color: COLORS.text, fontFamily: FONTS.bodySemi, fontSize: 15 },
});
