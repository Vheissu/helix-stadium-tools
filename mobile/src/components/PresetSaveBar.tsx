import { useContext } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { AccessibleText as Text } from '../accessibility/AccessibleText';
import { Action } from '../accessibility/controls';
import { COLORS, FONT } from '../theme/colors';

interface PresetSaveBarProps {
  name: string;
  edited: boolean | null;
  saving: boolean;
  saved: boolean;
  disabled: boolean;
  preview?: boolean;
  /** `bottom` pins the bar to the screen edge: top divider plus the bottom safe area. */
  placement?: 'inline' | 'bottom';
  onSave: () => void;
}

export function PresetSaveBar({ name, edited, saving, saved, disabled, preview = false, placement = 'inline', onSave }: PresetSaveBarProps) {
  const { fontScale } = useWindowDimensions();
  const insets = useContext(SafeAreaInsetsContext);
  const bottom = placement === 'bottom';
  const largeText = fontScale > 1.5;
  // A clean preset needs no status line; the name alone says what Save acts on.
  const message = preview ? 'Preview · edits are not saved'
    : saving ? 'Saving to Stadium…'
    : edited ? 'Unsaved changes'
    : saved ? 'Saved to Stadium'
    : null;
  const primary = edited === true && !saving && !disabled;
  return (
    <View style={[styles.bar, bottom ? [styles.bottom, {
      paddingBottom: Math.max(insets?.bottom ?? 0, 8),
    }] : styles.inline, largeText && styles.stacked]}>
      <View style={[styles.copy, largeText && styles.copyStacked]}>
        <Text style={styles.name} numberOfLines={2}>{name}</Text>
        {message && <Text accessibilityLiveRegion="polite" numberOfLines={2} style={[styles.hint, edited && !saving && styles.unsaved]}>{message}</Text>}
      </View>
      <Action accessibilityLabel={`Save ${name} to the Stadium`} accessibilityState={{ busy: saving }}
        disabled={disabled || saving} onPress={onSave}
        style={({ pressed }) => [styles.button, primary ? styles.primary : styles.quiet, pressed && styles.pressed, (disabled || saving) && styles.disabled]}>
        <Text maxFontSizeMultiplier={2} numberOfLines={1} style={[styles.buttonText, primary && styles.primaryText]}>{saving ? 'Saving…' : 'Save'}</Text>
      </Action>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 8 },
  inline: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.stroke },
  bottom: { backgroundColor: COLORS.bg, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: COLORS.stroke },
  stacked: { flexDirection: 'column', alignItems: 'stretch' },
  copy: { flex: 1, minWidth: 0, gap: 2 },
  copyStacked: { flex: 0, flexBasis: 'auto', width: '100%' },
  name: { color: COLORS.text, ...FONT.semibold, fontSize: 15, lineHeight: 20 },
  hint: { color: COLORS.muted, ...FONT.body, fontSize: 13, lineHeight: 18 },
  unsaved: { color: COLORS.warn },
  button: { minWidth: 72, paddingHorizontal: 16, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  primary: { backgroundColor: COLORS.accent },
  quiet: { backgroundColor: COLORS.control },
  pressed: { opacity: 0.8 },
  buttonText: { color: COLORS.text, ...FONT.semibold, fontSize: 15 },
  primaryText: { color: COLORS.bg },
  disabled: { opacity: 0.4 },
});
