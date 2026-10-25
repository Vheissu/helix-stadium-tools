import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { AccessibleText as Text } from '../accessibility/AccessibleText';
import { Action } from '../accessibility/controls';
import { COLORS, FONT } from '../theme/colors';
import type { StompSwitchPlan } from '../protocol/stompSwitch';
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
  onStompSwitch: (plan: StompSwitchPlan) => void;
  stompBusyNumber: number | null;
  stompDisabled: boolean;
  stompNotice: string | null;
  onRefresh: () => void;
  refreshDisabled?: boolean;
  colorFor: (value: number | null | undefined) => string;
};

export function PerformControls(props: Props) {
  const { width, fontScale } = useWindowDimensions();
  const columns = fontScale > 1.3 || width < 360 ? 1 : width >= 760 ? 5 : 2;
  // Eight snapshots fill two even rows of four; ten footswitches fill rows of five.
  const snapshotColumns = columns === 5 ? 4 : columns;
  // Stack the view switcher before "Snapshots" outgrows a third of the row.
  const stackTabs = fontScale > 1.3;
  const switches = props.view === 'snapshots' ? null : props.banks?.[props.view];
  return <View style={styles.section}>
    <View accessibilityRole="tablist" accessibilityLabel="Perform view" style={[styles.selector, stackTabs && styles.selectorStacked]}>
      {([['a', 'Stomp A'], ['b', 'Stomp B'], ['snapshots', 'Snapshots']] as const).map(([view, label]) =>
        <Action key={view} disabled={props.stompBusyNumber !== null} accessibilityRole="tab" accessibilityState={{ selected: props.view === view }}
          accessibilityLabel={label} onPress={() => props.onViewChange(view)}
          style={[styles.tab, stackTabs && styles.tabStacked, props.view === view && styles.tabSelected]}>
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
            style={[styles.tile, { width: `${100 / snapshotColumns - (snapshotColumns > 1 ? 2 : 0)}%` }, active && styles.tileSelected]}>
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
      <Text style={styles.hint}>Tap a switch to use its assigned controls.</Text>
      {props.stompNotice && <Text accessibilityLiveRegion="polite" style={styles.notice}>{props.stompNotice}</Text>}
      {switches ? <View style={styles.grid}>
        {switches.map(item => {
          const { plan, active, reason } = item.control;
          const busy = props.stompBusyNumber === item.number;
          const disabled = props.stompDisabled || props.stompBusyNumber !== null || !plan;
          const status = busy ? 'Switching…' : active === true ? 'On' : active === false ? 'Off'
            : plan ? 'Press' : item.assigned ? 'Unavailable' : 'Unassigned';
          const hint = !plan ? reason ?? 'This switch is unavailable. Refresh to read its assignments.'
            : plan.controllers.some(controller => controller.target.parameter !== null)
              ? 'Tap to change the assigned controls. After a parameter change here, the first physical press may repeat that value.'
              : 'Tap to press this switch.';
          return <Action key={item.number} disabled={disabled} accessibilityRole={active !== null ? 'switch' : 'button'}
            accessibilityLabel={`Stomp ${props.view.toUpperCase()}${item.number}, ${item.label}, ${status}`}
            accessibilityHint={hint}
            accessibilityState={{ busy, ...(active !== null ? { checked: active } : {}) }}
            onPress={() => { if (plan) props.onStompSwitch(plan); }}
            style={({ pressed }) => [styles.tile, { width: `${100 / columns - (columns > 1 ? 2 : 0)}%` },
              active === true && styles.tileSelected, !plan && styles.tileUnavailable, pressed && styles.tilePressed]}>
            <View style={styles.tileHeader}>
              <View style={[styles.swatch, { backgroundColor: props.colorFor(item.color) }]} />
              <Text style={styles.number}>{props.view.toUpperCase()}{item.number}</Text>
              <Text style={[styles.status, active === true && styles.statusOn, !plan && styles.unassigned]}>{status}</Text>
            </View>
            <Text style={[styles.name, !item.assigned && item.label === 'Unassigned' && styles.unassigned]}>{item.label}</Text>
            <Text style={styles.hint}>{hint}</Text>
          </Action>;
        })}
      </View> : <Text style={styles.hint}>Switch assignments are unavailable. Refresh to read the current preset.</Text>}
    </>}
    <Action accessibilityLabel="Refresh snapshots and stomp assignments" disabled={props.refreshDisabled} onPress={props.onRefresh} style={styles.refresh}>
      <Text style={styles.refreshText}>Refresh</Text>
    </Action>
  </View>;
}

const styles = StyleSheet.create({
  section: { gap: 12 },
  selector: { flexDirection: 'row', gap: 4, padding: 4, backgroundColor: COLORS.panel, borderRadius: 10 },
  selectorStacked: { flexDirection: 'column' },
  tab: { flex: 1, minWidth: 0, alignItems: 'center', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 10 },
  tabStacked: { flexGrow: 0, flexShrink: 0, flexBasis: 'auto' },
  tabSelected: { backgroundColor: COLORS.text },
  tabText: { color: COLORS.text, ...FONT.semibold, fontSize: 15, textAlign: 'center' },
  tabTextSelected: { color: COLORS.bg },
  heading: { color: COLORS.text, ...FONT.semibold, fontSize: 18 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  tile: { backgroundColor: COLORS.panel, borderColor: COLORS.panel, borderWidth: 2, borderRadius: 12, padding: 12, gap: 10, minHeight: 88 },
  tileSelected: { backgroundColor: COLORS.raised, borderColor: COLORS.accent },
  tileUnavailable: { borderColor: COLORS.stroke },
  tilePressed: { backgroundColor: COLORS.control },
  tileHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  swatch: { width: 12, height: 12, borderRadius: 6 },
  number: { color: COLORS.text, ...FONT.numeric, fontSize: 15 },
  active: { color: COLORS.signal, ...FONT.semibold, fontSize: 13 },
  status: { color: COLORS.text, ...FONT.semibold, fontSize: 15, flexShrink: 1 },
  statusOn: { color: COLORS.signal },
  name: { color: COLORS.text, ...FONT.body, fontSize: 16, lineHeight: 22 },
  unassigned: { color: COLORS.muted },
  hint: { color: COLORS.muted, ...FONT.body, fontSize: 15, lineHeight: 22 },
  notice: { color: COLORS.text, ...FONT.body, fontSize: 15, lineHeight: 22 },
  refresh: { alignSelf: 'flex-start', paddingHorizontal: 14, borderRadius: 12, backgroundColor: COLORS.control },
  refreshText: { color: COLORS.text, ...FONT.semibold, fontSize: 15 },
});
