import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Action } from '../accessibility/controls';
import { AccessibleText as Text } from '../accessibility/AccessibleText';
import { COLORS } from '../theme/colors';
import type { BlockSlot, PathIndex } from '../types/signalFlow';
import { BottomSheet } from './BottomSheet';
import { EqualGrid } from './EqualGrid';

const ROWS = ['1A', '1B', '2A', '2B'];
const GRID_TEXT_CAP = 2;

export interface MoveDestination { slot: BlockSlot; reason: string | null; }
export function MoveBlockSheet({ name, destinations, busy, onMove, onClose, routing = false, action = 'move' }: {
  name: string | null; destinations: MoveDestination[]; busy: boolean;
  routing?: boolean;
  action?: 'move' | 'copy';
  onMove: (slot: BlockSlot) => void; onClose: () => void;
}) {
  const verb = action === 'copy' ? 'Copy' : 'Move';
  const scale = Math.min(useWindowDimensions().fontScale, GRID_TEXT_CAP);
  // Every row group shares one column count, so cells line up from group to group.
  const minCell = Math.max(48, Math.round(20 * scale + 16));
  const hint = action === 'copy' ? 'Copies settings and bypass. Snapshot and controller assignments stay behind. The original block stays in place.'
    : routing ? 'Moving a split or merge also moves its connection to row B. Its parameter settings stay the same.'
    : 'Keeps its settings and assignments.';
  const footnote = routing && action !== 'copy' ? null
    : action === 'copy' ? 'Add a split first to copy onto a new branch.' : 'Add a split first to move it onto a new branch.';
  return <BottomSheet visible={name !== null} title={`${verb} ${name ?? 'block'}`} subtitle="Choose an empty position" closeDisabled={busy} onClose={onClose}>
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
      <Text style={styles.hint}>{hint}</Text>
      {([0, 1, 2, 3] as PathIndex[]).map(row => {
        const choices = destinations.filter(destination => destination.slot.path === row);
        if (!choices.length) return null;
        const reason = choices.every(choice => !!choice.reason) ? choices[0].reason : null;
        return <View key={row} style={styles.group}>
          <Text accessibilityRole="header" style={styles.heading}>Row {ROWS[row]}</Text>
          {!!reason && <Text style={styles.hint}>{reason}</Text>}
          <EqualGrid columns={[12, 6, 4, 3, 2]} minCell={minCell}>
            {choices.map(({ slot, reason }) => <Action key={slot.block} disabled={busy || !!reason}
              accessibilityLabel={`${verb} to ${ROWS[row]}, position ${slot.block + 1}${reason ? `. ${reason}` : ''}`}
              onPress={() => onMove(slot)} style={[styles.position, !!reason && styles.disabled]}>
              <Text maxFontSizeMultiplier={GRID_TEXT_CAP} style={styles.text}>{slot.block + 1}</Text>
            </Action>)}
          </EqualGrid>
        </View>;
      })}
      {destinations.length === 0 && <Text style={styles.hint}>No empty positions are available. Remove a block to make room.</Text>}
      {destinations.length > 0 && footnote && <Text style={styles.footnote}>{footnote}</Text>}
    </ScrollView>
  </BottomSheet>;
}
const styles = StyleSheet.create({
  content: { paddingBottom: 16, gap: 20 },
  group: { gap: 8 },
  heading: { color: COLORS.muted, fontSize: 13, lineHeight: 18, fontWeight: '600' },
  hint: { color: COLORS.muted, fontSize: 15, lineHeight: 21 },
  footnote: { color: COLORS.muted, fontSize: 13, lineHeight: 18 },
  position: { minHeight: 48, borderRadius: 8, backgroundColor: COLORS.control, borderWidth: 1, borderColor: COLORS.stroke, alignItems: 'center', justifyContent: 'center' },
  text: { color: COLORS.text, fontSize: 16, textAlign: 'center' },
  disabled: { opacity: 0.4 },
});
