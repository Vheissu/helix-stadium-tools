import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Action } from '../accessibility/controls';
import { AccessibleText as Text } from '../accessibility/AccessibleText';
import { COLORS } from '../theme/colors';
import { ROUTING_DESCRIPTIONS, SPLIT_MODELS, isSplitModel, routingName } from '../utils/routing';
import { EqualGrid } from './EqualGrid';
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

/** Grid labels stop growing at 2x so cells stay square-ish; columns drop instead. */
const GRID_TEXT_CAP = 2;

export function RoutingControls({ modelId, row, linkPosition, choices, disabled, onType, onLink }: Props) {
  const split = isSplitModel(modelId);
  const scale = Math.min(useWindowDimensions().fontScale, GRID_TEXT_CAP);
  const position = linkPosition !== undefined ? linkPosition - 14 : null;
  const summary = split
    ? `Branch starts on ${row}${position !== null ? ` · position ${position}` : ''}`
    : `Merge takes ${row} through${position !== null ? ` position ${position}` : ''}`;
  return <View style={styles.section}>
    <View style={styles.heading}>
      <SplitMergeIcon type={split ? 'split' : 'merge'} size={28} />
      <Text accessibilityRole="header" style={styles.title}>{split ? 'Parallel path' : 'Merge branches'}</Text>
    </View>
    <Text style={styles.description}>{ROUTING_DESCRIPTIONS[modelId]}</Text>
    {split && <EqualGrid columns={[4, 2, 1]} minCell={Math.round(96 * scale)} accessibilityRole="radiogroup" accessibilityLabel="Split type">
      {SPLIT_MODELS.map(id => <Action key={id} accessibilityRole="radio"
        accessibilityLabel={routingName(id)} accessibilityState={{ checked: modelId === id }} disabled={disabled}
        onPress={() => onType(id)} style={[styles.cell, modelId === id && styles.selected]}>
        <Text maxFontSizeMultiplier={GRID_TEXT_CAP} style={styles.cellText}>{routingName(id).replace('Split ', '')}</Text>
      </Action>)}
    </EqualGrid>}
    <Text style={styles.label}>{summary}</Text>
    <EqualGrid columns={[12, 6, 4, 3, 2]} minCell={Math.max(48, Math.round(20 * scale + 16))}
      accessibilityRole="radiogroup" accessibilityLabel={`${row} position`}>
      {Array.from({ length: 12 }, (_, index) => index + 15).map(position => <Action key={position}
        accessibilityRole="radio" accessibilityLabel={`${row}, position ${position - 14}`}
        accessibilityState={{ checked: position === linkPosition }} disabled={disabled || !choices.includes(position)}
        onPress={() => onLink(position)} style={[styles.cell, position === linkPosition && styles.selected,
          !choices.includes(position) && styles.unavailable]}>
        <Text maxFontSizeMultiplier={GRID_TEXT_CAP} style={styles.cellText}>{position - 14}</Text>
      </Action>)}
    </EqualGrid>
  </View>;
}

const styles = StyleSheet.create({
  section: { gap: 12, paddingBottom: 20, marginBottom: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: COLORS.stroke },
  heading: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  title: { color: COLORS.text, fontSize: 18, fontWeight: '600', flexShrink: 1 },
  description: { color: COLORS.muted, fontSize: 15, lineHeight: 21 },
  label: { color: COLORS.text, fontSize: 16, lineHeight: 22, fontWeight: '600' },
  // Every cell keeps a 2pt border so selecting one never shifts its label.
  cell: { minHeight: 48, paddingHorizontal: 6, alignItems: 'center', justifyContent: 'center', borderRadius: 8, backgroundColor: COLORS.control, borderWidth: 2, borderColor: COLORS.stroke },
  cellText: { color: COLORS.text, fontSize: 16, textAlign: 'center' },
  selected: { borderColor: COLORS.accent, backgroundColor: COLORS.raised },
  unavailable: { opacity: 0.35 },
});
