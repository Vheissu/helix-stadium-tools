import { ScrollView, StyleSheet, View } from 'react-native';
import { Action } from '../accessibility/controls';
import { AccessibleText as Text } from '../accessibility/AccessibleText';
import { COLORS } from '../theme/colors';
import type { BlockSlot, PathIndex } from '../types/signalFlow';
import { BottomSheet } from './BottomSheet';

export interface MoveDestination { slot: BlockSlot; reason: string | null; }
export function MoveBlockSheet({ name, destinations, busy, onMove, onClose, routing = false }: {
  name: string | null; destinations: MoveDestination[]; busy: boolean;
  routing?: boolean;
  onMove: (slot: BlockSlot) => void; onClose: () => void;
}) {
  return <BottomSheet visible={name !== null} title={`Move ${name ?? 'block'}`} subtitle="Choose an empty position" closeDisabled={busy} onClose={onClose}>
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
      <Text style={styles.hint}>{routing ? 'Moving a split or merge also moves its connection to row B. Its parameter settings stay the same.' : 'The block keeps its settings and assignments. Add a split first to move it onto a new branch.'}</Text>
      {([0, 1, 2, 3] as PathIndex[]).map(row => {
        const choices = destinations.filter(destination => destination.slot.path === row);
        if (!choices.length) return null;
        const reason = choices.every(choice => !!choice.reason) ? choices[0].reason : null;
        return <View key={row} style={styles.group}>
          <Text accessibilityRole="header" style={styles.heading}>Row {['1A', '1B', '2A', '2B'][row]}</Text>
          {!!reason && <Text style={styles.hint}>{reason}</Text>}
          <View style={styles.positions}>
            {choices.map(({ slot, reason }) => <Action key={slot.block} disabled={busy || !!reason}
              accessibilityLabel={`Move to ${['1A', '1B', '2A', '2B'][row]}, position ${slot.block + 1}${reason ? `. ${reason}` : ''}`}
              onPress={() => onMove(slot)} style={[styles.position, !!reason && styles.disabled]}>
              <Text style={styles.text}>{slot.block + 1}</Text>
            </Action>)}
          </View>
        </View>;
      })}
      {destinations.length === 0 && <Text style={styles.hint}>No empty positions are available. Remove a block to make room.</Text>}
    </ScrollView>
  </BottomSheet>;
}
const styles = StyleSheet.create({
  content: { paddingBottom: 16, gap: 20 },
  group: { gap: 10 },
  heading: { color: COLORS.text, fontSize: 17, fontWeight: '600' },
  hint: { color: COLORS.muted, fontSize: 15, lineHeight: 21 },
  positions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  position: { minWidth: 48, minHeight: 48, borderRadius: 8, backgroundColor: COLORS.control, borderWidth: 1, borderColor: COLORS.stroke, alignItems: 'center', justifyContent: 'center' },
  text: { color: COLORS.text, fontSize: 16 },
  disabled: { opacity: 0.4 },
});
