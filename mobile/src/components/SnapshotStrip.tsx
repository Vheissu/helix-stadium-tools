import { ScrollView, StyleSheet, View } from 'react-native';
import { AccessibleText as Text } from '../accessibility/AccessibleText';
import { Action as Pressable } from '../accessibility/controls';
import { COLORS, FONT, blendHexColors } from '../theme/colors';
import { EqualGrid } from './EqualGrid';

export interface SnapshotChip {
  index: number;
  name: string;
  color: string;
}

interface SnapshotStripProps {
  snapshots: SnapshotChip[];
  activeIndex: number | null;
  disabled?: boolean;
  /** Tablet: equal-width grid in `columns` columns. Phone: one scrolling row. */
  columns?: number;
  onActivate: (index: number) => void;
}

/** Every snapshot by name and colour, one tap away from the editor. */
export function SnapshotStrip({ snapshots, activeIndex, disabled, columns, onActivate }: SnapshotStripProps) {
  if (!snapshots.length) return null;
  const chips = snapshots.map((snapshot) => {
    const active = snapshot.index === activeIndex;
    return (
      <Pressable
        key={snapshot.index}
        accessibilityRole="tab"
        accessibilityLabel={`Snapshot ${snapshot.index + 1}, ${snapshot.name}`}
        accessibilityState={{ selected: active }}
        disabled={disabled}
        onPress={() => onActivate(snapshot.index)}
        style={({ pressed }) => [
          styles.chip,
          active && { backgroundColor: blendHexColors(COLORS.bg, snapshot.color, 0.22), borderColor: snapshot.color },
          pressed && !active && styles.chipPressed,
          disabled && styles.chipDisabled,
        ]}
      >
        <View style={[styles.swatch, { backgroundColor: snapshot.color }]} />
        <Text style={styles.number}>{snapshot.index + 1}</Text>
        <Text style={[styles.name, active && styles.nameActive]} numberOfLines={1}>{snapshot.name}</Text>
      </Pressable>
    );
  });
  if (columns) {
    // Equal cells with a padded last row, so 8 snapshots in 3 columns don't stretch the last two.
    return <EqualGrid accessibilityRole="tablist" columns={[columns]}>{chips}</EqualGrid>;
  }
  return (
    <ScrollView accessibilityRole="tablist" horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {chips}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 8,
    paddingRight: 16,
  },
  chip: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.panel,
    backgroundColor: COLORS.panel,
  },
  chipPressed: {
    backgroundColor: COLORS.control,
  },
  chipDisabled: {
    opacity: 0.5,
  },
  swatch: {
    width: 12,
    height: 12,
    borderRadius: 3,
  },
  number: {
    color: COLORS.muted,
    ...FONT.numeric,
    fontSize: 13,
  },
  name: {
    flexShrink: 1,
    color: COLORS.text,
    ...FONT.semibold,
    fontSize: 15,
  },
  nameActive: {
    ...FONT.bold,
  },
});
