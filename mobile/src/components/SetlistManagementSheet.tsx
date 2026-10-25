import { useEffect, useState, type ReactNode } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { AccessibleText as Text } from '../accessibility/AccessibleText';
import { COLORS } from '../theme/colors';
import { validateSetlistName } from '../protocol/setlists';
import { BottomSheet } from './BottomSheet';
import { LibraryButton, libraryStyles } from './LibraryChrome';

export function SetlistManagementSheet({ visible, creating, selectedName, sourceName, busy, error, onClose, onBack, onSubmit, children }: {
  visible: boolean;
  creating: boolean;
  selectedName?: string;
  sourceName?: string;
  busy: boolean;
  error: string;
  onClose: () => void;
  onBack: () => void;
  onSubmit: (name: string) => void;
  children: ReactNode;
}) {
  const [name, setName] = useState('');
  useEffect(() => {
    if (creating) setName(sourceName ? `${[...sourceName].slice(0, 27).join('')} copy` : '');
  }, [creating, sourceName]);
  let validation = '';
  try { validateSetlistName(name); } catch (reason) { validation = reason instanceof Error ? reason.message : 'Enter a setlist name.'; }
  const duplicate = sourceName !== undefined;
  const submit = () => { if (!busy && !validation) onSubmit(name); };
  return <BottomSheet visible={visible} title={creating ? (duplicate ? 'Duplicate setlist' : 'New setlist') : 'Setlist options'}
    subtitle={creating ? undefined : selectedName} closeDisabled={busy} onClose={onClose}
    onBack={creating && duplicate ? onBack : undefined} backLabel="Back to setlist options"
    footer={creating ? <LibraryButton label={busy ? (duplicate ? 'Duplicating…' : 'Creating…') : (duplicate ? 'Duplicate setlist' : 'Create setlist')}
      primary disabled={busy || !!validation} onPress={submit} /> : undefined}>
    {creating ? <ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag" contentContainerStyle={styles.content}>
      <Text style={libraryStyles.muted}>{duplicate
        ? 'Keeps the same presets and running order, including empty positions. Preset edits will apply in both setlists.'
        : 'Give your setlist a name, then add presets in the order you want to play them.'}</Text>
      <View style={styles.field}>
        <Text style={libraryStyles.section}>Setlist name</Text>
        <TextInput accessibilityLabel={duplicate ? 'Duplicate setlist name' : 'New setlist name'} editable={!busy} value={name} onChangeText={setName}
          placeholder="e.g. Friday night" placeholderTextColor={COLORS.muted} autoCapitalize="sentences" autoCorrect={false}
          maxLength={64} returnKeyType="done" onSubmitEditing={submit} style={styles.input} />
        <Text style={libraryStyles.muted}>{[...name.trim()].length} / 32 characters</Text>
      </View>
      {!!name.trim() && !!validation && <Text accessibilityLiveRegion="polite" style={styles.error}>{validation}</Text>}
      {!!error && <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text>}
    </ScrollView> : children}
  </BottomSheet>;
}

const styles = StyleSheet.create({
  content: { gap: 16, paddingBottom: 20 },
  field: { gap: 8 },
  input: { minHeight: 52, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, backgroundColor: COLORS.control, color: COLORS.text, fontSize: 17 },
  error: { color: COLORS.danger, fontSize: 15, lineHeight: 22 },
});
