import React, { useRef } from 'react';
import { Pressable as NativePressable, type PressableProps, StyleSheet, Text, View, type ViewInstance } from 'react-native';
import { COLORS } from '../theme/colors';
import { rememberAction, useAccessibilityPreferences } from './AccessibilityPreferences';

/** Keep labels supplied by each screen; provide consistent role and disabled semantics. */
export function Action({ style, accessibilityState, accessibilityRole = 'button', onPress, onLongPress, ...props }: PressableProps) {
  const target = useRef<ViewInstance>(null);
  return <NativePressable ref={target} accessibilityRole={accessibilityRole} {...props}
    onLongPress={onLongPress ? (event) => { rememberAction(target.current); onLongPress(event); } : undefined}
    onPress={(event) => { rememberAction(target.current); onPress?.(event); }}
    accessibilityState={{ disabled: !!props.disabled, ...accessibilityState }}
    style={(state) => {
      const resolved = typeof style === 'function' ? style(state) : style;
      const flat = StyleSheet.flatten(resolved);
      return [styles.action, resolved, { minWidth: Math.max(Number(flat?.minWidth) || 0, 48), minHeight: Math.max(Number(flat?.minHeight) || 0, 48) }];
    }} />;
}
export function AccessibilitySettings() {
  const { preference, setPreference } = useAccessibilityPreferences();
  return <View style={styles.settings}>
    <Text accessibilityRole="header" style={styles.title}>Accessibility</Text>
    <Text style={styles.body}>List layout gives each block its own controls, with buttons to move blocks and adjust values. Automatic uses this layout with VoiceOver or TalkBack.</Text>
    {(['automatic', 'list', 'visual'] as const).map((value) => <Action key={value}
      accessibilityRole="radio" accessibilityState={{ checked: preference === value }}
      onPress={() => setPreference(value)} style={[styles.choice, preference === value && styles.selected]}>
      <Text style={styles.body}>{value === 'automatic' ? 'Automatic' : value === 'list' ? 'List layout' : 'Visual layout'}{preference === value ? ' · Selected' : ''}</Text>
    </Action>)}
  </View>;
}
const styles = StyleSheet.create({
  action: { minWidth: 48, minHeight: 48, justifyContent: 'center' },
  settings: { gap: 10, paddingVertical: 12 },
  title: { color: COLORS.text, fontSize: 20, fontWeight: '600' },
  body: { color: COLORS.text, fontSize: 16, lineHeight: 24, flexShrink: 1 },
  choice: { padding: 12, borderWidth: 1, borderColor: COLORS.stroke, borderRadius: 8 },
  selected: { borderColor: COLORS.accent },
});
