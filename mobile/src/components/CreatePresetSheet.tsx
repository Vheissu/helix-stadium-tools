import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Keyboard, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Action } from '../accessibility/controls';
import { AccessibleText as Text } from '../accessibility/AccessibleText';
import { isEmptyUserSlot, validatePresetName, type UserPresetSlot } from '../protocol/presetCreation';
import { formatPresetPosition } from '../utils/format';
import { COLORS, FONT } from '../theme/colors';
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
  const create = () => {
    try { const validName = validatePresetName(name); Keyboard.dismiss(); onCreate(validName); } catch (problem) { setValidation((problem as Error).message); }
  };
  // The slot list fills a fixed-height sheet; the create button lives in the
  // footer so the keyboard or a long error never pushes it out of reach.
  return <BottomSheet visible={position !== null} closeDisabled={busy} title={choosing ? 'Choose an empty slot' : 'Create preset'} onClose={onClose}
    fill={choosing} onBack={choosing ? () => setChoosing(false) : undefined} backLabel="Back to preset details"
    footer={choosing ? undefined : <Action disabled={busy || !available} accessibilityState={{ busy }}
      style={({ pressed }) => [styles.create, pressed && styles.createPressed, (busy || !available) && styles.createDisabled]} onPress={create}>
      {busy && <ActivityIndicator color={COLORS.bg} />}
      <Text style={styles.createText}>{busy ? 'Creating preset…' : 'Create and open preset'}</Text>
    </Action>}>
    {choosing ? <>
      <TextInput accessibilityLabel="Find an empty slot" placeholder="Find slot, e.g. 44D" placeholderTextColor={COLORS.muted} value={query} onChangeText={setQuery} autoCapitalize="characters" autoCorrect={false} style={styles.input} />
      <FlatList style={styles.list} keyboardShouldPersistTaps="handled" data={matchingSlots} keyExtractor={slot => String(slot.posi)}
        ListEmptyComponent={<Text style={styles.text}>No empty slots match that label.</Text>}
        renderItem={({ item }) => <Action accessibilityLabel={`Choose empty slot ${formatPresetPosition(item.posi)}`}
          accessibilityState={{ selected: item.posi === position }} style={styles.slot}
          onPress={() => { Keyboard.dismiss(); onPosition(item.posi!); setChoosing(false); }}>
          <Text style={[styles.text, item.posi === position && styles.current]}>{formatPresetPosition(item.posi)} · Empty slot</Text>
        </Action>} />
    </> : <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.form}>
      <Text style={styles.text}>Start with a blank signal chain in User Presets.</Text>
      <Action disabled={busy} accessibilityLabel={`Destination slot ${formatPresetPosition(position)}, change slot`} onPress={() => { Keyboard.dismiss(); setChoosing(true); }} style={[styles.slot, styles.destination]}>
        <View style={styles.flex}><Text style={styles.label}>Destination</Text><Text style={styles.text}>Slot {formatPresetPosition(position)}</Text></View>
        <Text style={styles.action}>Change slot</Text>
      </Action>
      <Text style={styles.label}>Preset name</Text>
      <TextInput accessibilityLabel="New preset name" value={name} onChangeText={text => { setName(text); setValidation(''); }}
        editable={!busy} maxLength={32} autoCapitalize="words" autoCorrect={false} style={styles.input} />
      {!!(validation || error) && <Text accessibilityRole="alert" style={styles.error}>{validation || error}</Text>}
      {!available && !busy && <Text style={styles.text}>This slot is now occupied. Choose another empty slot or close this sheet to inspect it.</Text>}
    </ScrollView>}
  </BottomSheet>;
}
const styles = StyleSheet.create({
  form: { gap: 12, paddingBottom: 8 }, flex: { flex: 1, minWidth: 0, gap: 2 },
  text: { color: COLORS.text, fontSize: 16, lineHeight: 22, flexShrink: 1 },
  label: { color: COLORS.muted, ...FONT.semibold, fontSize: 13, lineHeight: 18 },
  action: { color: COLORS.accent, ...FONT.semibold, fontSize: 15, flexShrink: 0 },
  current: { ...FONT.semibold },
  list: { flex: 1 },
  slot: { minHeight: 48, flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: COLORS.stroke },
  destination: { minHeight: 56 },
  input: { minHeight: 48, color: COLORS.text, fontSize: 17, padding: 12, borderWidth: 1, borderColor: COLORS.stroke, borderRadius: 10, marginBottom: 4 },
  error: { color: COLORS.danger, fontSize: 16, lineHeight: 22 },
  // Primary action on the sheet surface: bone fill, never panel-on-panel.
  create: { minHeight: 52, flexDirection: 'row', justifyContent: 'center', gap: 12, alignItems: 'center', paddingHorizontal: 16, borderRadius: 10, backgroundColor: COLORS.accent },
  createPressed: { opacity: 0.85 },
  createDisabled: { opacity: 0.45 },
  createText: { color: COLORS.bg, ...FONT.semibold, fontSize: 16, flexShrink: 1, textAlign: 'center' },
});
