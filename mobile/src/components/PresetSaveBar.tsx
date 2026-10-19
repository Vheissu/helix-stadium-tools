import { View, StyleSheet } from 'react-native';
import { AccessibleText as Text } from '../accessibility/AccessibleText';
import { Action } from '../accessibility/controls';
import { COLORS, FONTS } from '../theme/colors';

interface PresetSaveBarProps {
  name: string;
  edited: boolean | null;
  saving: boolean;
  saved: boolean;
  disabled: boolean;
  onSave: () => void;
}

export function PresetSaveBar({ name, edited, saving, saved, disabled, onSave }: PresetSaveBarProps) {
  const message = saving ? 'Saving to Stadium…'
    : edited ? 'Unsaved changes · Tap Save to keep'
    : saved ? 'Saved to Stadium'
    : 'Tap Save to keep edits on the Stadium';
  return (
    <View style={styles.bar}>
      <View style={styles.copy}>
        <Text style={styles.name}>{name}</Text>
        <Text accessibilityLiveRegion="polite" style={[styles.hint, edited && styles.unsaved]}>{message}</Text>
      </View>
      <Action accessibilityLabel={`Save ${name} to the Stadium`} accessibilityState={{ busy: saving }}
        disabled={disabled || saving} onPress={onSave}
        style={[styles.button, (disabled || saving) && styles.disabled]}>
        <Text style={styles.buttonText}>{saving ? 'Saving…' : 'Save'}</Text>
      </Action>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.stroke },
  copy: { flexGrow: 1, flexShrink: 1, flexBasis: 200, gap: 3 },
  name: { color: COLORS.text, fontFamily: FONTS.bodySemi, fontSize: 15 },
  hint: { color: COLORS.muted, fontFamily: FONTS.body, fontSize: 13, lineHeight: 18 },
  unsaved: { color: COLORS.warn },
  button: { paddingHorizontal: 16, borderRadius: 4, backgroundColor: COLORS.accent, alignItems: 'center' },
  buttonText: { color: COLORS.bg, fontFamily: FONTS.bodySemi, fontSize: 15 },
  disabled: { opacity: 0.5 },
});
