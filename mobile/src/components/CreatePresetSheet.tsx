import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Keyboard, ScrollView, StyleSheet, TextInput } from 'react-native';
import { Action } from '../accessibility/controls';
import { AccessibleText as Text } from '../accessibility/AccessibleText';
import { isEmptyUserSlot, validatePresetName, type UserPresetSlot } from '../protocol/presetCreation';
import { formatPresetPosition } from '../utils/format';
import { COLORS } from '../theme/colors';
import { BottomSheet } from './BottomSheet';

interface Props {
  position: number | null; slots: UserPresetSlot[]; busy: boolean; error: string;
  onPosition: (position: number) => void; onCreate: (name: string) => void; onClose: () => void;
}
export function CreatePresetSheet({ position, slots, busy, error, onPosition, onCreate, onClose }: Props) {
  const [name, setName] = useState('New Preset');
  const [choosing, setChoosing] = useState(false);
  const [validation, setValidation] = useState('');
  const [query, setQuery] = useState('');
  const emptySlots = slots.filter(isEmptyUserSlot);
  const matchingSlots = emptySlots.filter(slot => formatPresetPosition(slot.posi).toLowerCase().includes(query.trim().toLowerCase()));
  const available = emptySlots.some(slot => slot.posi === position);
  useEffect(() => {
    if (position === null) { setName('New Preset'); setChoosing(false); setValidation(''); setQuery(''); }
  }, [position]);
  return <BottomSheet visible={position !== null} closeDisabled={busy} title={choosing ? 'Choose an empty slot' : 'Create preset'} onClose={onClose}>
    {choosing ? <>
      <Action onPress={() => setChoosing(false)}><Text style={styles.action}>Back to preset details</Text></Action>
      <TextInput accessibilityLabel="Find an empty slot" placeholder="Find slot, e.g. 44D" placeholderTextColor={COLORS.muted} value={query} onChangeText={setQuery} autoCapitalize="characters" autoCorrect={false} style={styles.input} />
      <FlatList keyboardShouldPersistTaps="handled" data={matchingSlots} keyExtractor={slot => String(slot.posi)}
        ListEmptyComponent={<Text style={styles.text}>No empty slots match that label.</Text>}
        renderItem={({ item }) => <Action accessibilityLabel={`Choose empty slot ${formatPresetPosition(item.posi)}`}
          accessibilityState={{ selected: item.posi === position }} style={styles.slot}
          onPress={() => { Keyboard.dismiss(); onPosition(item.posi!); setChoosing(false); }}>
          <Text style={styles.text}>{formatPresetPosition(item.posi)} · Empty slot</Text>
        </Action>} />
    </> : <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.form}>
      <Text style={styles.text}>Start with a blank signal chain in User Presets.</Text>
      <Action disabled={busy} accessibilityLabel={`Destination slot ${formatPresetPosition(position)}, change slot`} onPress={() => { Keyboard.dismiss(); setChoosing(true); }} style={styles.slot}>
        <Text style={styles.text}>Slot {formatPresetPosition(position)}</Text><Text style={styles.action}>Change slot</Text>
      </Action>
      <Text style={styles.text}>Preset name</Text>
      <TextInput accessibilityLabel="New preset name" value={name} onChangeText={text => { setName(text); setValidation(''); }}
        editable={!busy} maxLength={32} autoCapitalize="words" autoCorrect={false} style={styles.input} />
      {!!(validation || error) && <Text accessibilityRole="alert" style={styles.error}>{validation || error}</Text>}
      {!available && !busy && <Text style={styles.text}>This slot is now occupied. Choose another empty slot or close this sheet to inspect it.</Text>}
      <Action disabled={busy || !available} accessibilityState={{ busy }} style={styles.create} onPress={() => {
        try { const validName = validatePresetName(name); Keyboard.dismiss(); onCreate(validName); } catch (problem) { setValidation((problem as Error).message); }
      }}>
        {busy && <ActivityIndicator color={COLORS.text} />}
        <Text style={styles.text}>{busy ? 'Creating preset…' : 'Create and open preset'}</Text>
      </Action>
    </ScrollView>}
  </BottomSheet>;
}
const styles = StyleSheet.create({
  form: { gap: 12 }, text: { color: COLORS.text, fontSize: 16, flexShrink: 1 }, action: { color: COLORS.signal, fontSize: 16 },
  slot: { minHeight: 48, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: COLORS.stroke },
  input: { minHeight: 48, color: COLORS.text, fontSize: 17, padding: 12, borderWidth: 1, borderColor: COLORS.stroke, borderRadius: 8 },
  error: { color: COLORS.danger, fontSize: 16 },
  create: { minHeight: 48, flexDirection: 'row', justifyContent: 'center', gap: 12, alignItems: 'center', padding: 12, borderRadius: 8, backgroundColor: COLORS.panel },
});
