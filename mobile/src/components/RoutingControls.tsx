import { StyleSheet, View } from 'react-native';
import { Action } from '../accessibility/controls';
import { AccessibleText as Text } from '../accessibility/AccessibleText';
import { COLORS } from '../theme/colors';
import { ROUTING_DESCRIPTIONS, SPLIT_MODELS, isSplitModel, routingName } from '../utils/routing';
import { SplitMergeIcon } from './signalFlow/SplitMergeIcon';

interface Props {
  modelId: number;
  row: string;
  linkPosition?: number;
  choices: number[];
  disabled: boolean;
  onType: (id: number) => void;
  onLink: (position: number) => void;
}

export function RoutingControls({ modelId, row, linkPosition, choices, disabled, onType, onLink }: Props) {
  const split = isSplitModel(modelId);
  return <View style={styles.section}>
    <View style={styles.heading}>
      <SplitMergeIcon type={split ? 'split' : 'merge'} size={28} />
      <Text accessibilityRole="header" style={styles.title}>{split ? 'Parallel path' : 'Merge branches'}</Text>
    </View>
    <Text style={styles.description}>{ROUTING_DESCRIPTIONS[modelId]}</Text>
    {split && <View style={styles.types}>
      {SPLIT_MODELS.map(id => <Action key={id} accessibilityRole="radio"
        accessibilityLabel={routingName(id)} accessibilityState={{ checked: modelId === id }} disabled={disabled}
        onPress={() => onType(id)} style={[styles.type, modelId === id && styles.selected]}>
        <Text style={styles.text}>{routingName(id).replace('Split ', '')}{modelId === id ? ' ✓' : ''}</Text>
      </Action>)}
    </View>}
    <Text style={styles.label}>{split ? `Branch starts on ${row}` : `Merge takes ${row} through`}</Text>
    <Text style={styles.description}>Position {linkPosition !== undefined ? linkPosition - 14 : '—'}. Tap a position to change it.</Text>
    <View style={styles.positions}>
      {Array.from({ length: 12 }, (_, index) => index + 15).map(position => <Action key={position}
        accessibilityRole="radio" accessibilityLabel={`${row}, position ${position - 14}`}
        accessibilityState={{ checked: position === linkPosition }} disabled={disabled || !choices.includes(position)}
        onPress={() => onLink(position)} style={[styles.position, position === linkPosition && styles.selected,
          !choices.includes(position) && styles.unavailable]}>
        <Text style={styles.text}>{position - 14}</Text>
      </Action>)}
    </View>
  </View>;
}

const styles = StyleSheet.create({
  section: { gap: 12, paddingBottom: 20, marginBottom: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: COLORS.stroke },
  heading: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  title: { color: COLORS.text, fontSize: 18, fontWeight: '600', flexShrink: 1 },
  text: { color: COLORS.text, fontSize: 16 },
  description: { color: COLORS.muted, fontSize: 15, lineHeight: 21 },
  label: { color: COLORS.text, fontSize: 16, fontWeight: '600' },
  types: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  type: { paddingHorizontal: 14, paddingVertical: 12, minHeight: 48, borderRadius: 8, backgroundColor: COLORS.control, borderWidth: 1, borderColor: COLORS.stroke },
  positions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  position: { minWidth: 48, minHeight: 48, alignItems: 'center', justifyContent: 'center', borderRadius: 8, backgroundColor: COLORS.control, borderWidth: 1, borderColor: COLORS.stroke },
  selected: { borderColor: COLORS.accent, backgroundColor: COLORS.raised },
  unavailable: { opacity: 0.35 },
});
