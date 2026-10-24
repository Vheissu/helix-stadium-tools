import React, { useCallback, useRef, useState } from 'react';
import { Pressable as NativePressable, type PressableProps, ScrollView, StyleSheet, View, type ViewInstance } from 'react-native';
import { AccessibleText as Text } from './AccessibleText';
import { COLORS } from '../theme/colors';
import { rememberAction, useAccessibilityPreferences } from './AccessibilityPreferences';
import { BottomSheet } from '../components/BottomSheet';
import { UtilityIcon } from '../components/UtilityIcon';

/** Keep labels supplied by each screen; provide consistent role and disabled semantics. */
export function Action({ ref, style, accessibilityState, accessibilityRole = 'button', onPress, onLongPress, ...props }: PressableProps & { ref?: React.Ref<ViewInstance> }) {
  const target = useRef<ViewInstance>(null);
  const setTarget = useCallback((view: ViewInstance | null) => {
    target.current = view;
    if (typeof ref === 'function') ref(view);
    else if (ref) ref.current = view;
  }, [ref]);
  return <NativePressable ref={setTarget} accessibilityRole={accessibilityRole} {...props}
    onLongPress={onLongPress ? (event) => { rememberAction(target.current); onLongPress(event); } : undefined}
    onPress={(event) => { rememberAction(target.current); onPress?.(event); }}
    accessibilityState={{ disabled: !!props.disabled, ...accessibilityState }}
    style={(state) => {
      const resolved = typeof style === 'function' ? style(state) : style;
      const flat = StyleSheet.flatten(resolved);
      return [styles.action, resolved, { minWidth: Math.max(Number(flat?.minWidth) || 0, 48), minHeight: Math.max(Number(flat?.minHeight) || 0, 48) }];
    }} />;
}
export function AccessibilitySettings({ compact = false, showHeading = true, elevated = false }: { compact?: boolean; showHeading?: boolean; elevated?: boolean }) {
  const { preference, setPreference } = useAccessibilityPreferences();
  const [open, setOpen] = useState(false);
  const content = <View style={styles.settings}>
    {!compact && showHeading && <Text accessibilityRole="header" style={styles.title}>Display & accessibility</Text>}
    <View style={[styles.choices, (compact || elevated) && { backgroundColor: COLORS.control }]} accessibilityRole="radiogroup" accessibilityLabel="Editor layout">
    {(['automatic', 'list', 'visual'] as const).map((value) => <Action key={value}
      accessibilityRole="radio" accessibilityState={{ checked: preference === value }}
      accessibilityLabel={value === 'automatic' ? 'Automatic layout' : value === 'list' ? 'List layout' : 'Visual layout'}
      onPress={() => setPreference(value)} style={({ pressed }) => [styles.choice, value !== 'automatic' && styles.choiceSeparator, preference === value && styles.selected, pressed && styles.choicePressed]}>
      <View style={styles.choiceText}><Text style={styles.choiceTitle}>{value === 'automatic' ? 'Automatic' : value === 'list' ? 'List layout' : 'Visual layout'}</Text>
        <Text style={styles.description}>{value === 'automatic' ? 'Adapts to your screen reader' : value === 'list' ? 'Text controls for every block' : 'A visual map of your signal path'}</Text></View>
      <View style={[styles.radio, preference === value && styles.radioSelected]}>{preference === value && <UtilityIcon name="check" size={15} color={COLORS.bg} />}</View>
    </Action>)}
    </View>
    <Text style={styles.description}>List layout includes exact parameter entry and increase/decrease controls. Pick up a block, then choose where to drop it.</Text>
  </View>;
  if (!compact) return content;
  return <>
    <Action accessibilityLabel="Display and accessibility" onPress={() => setOpen(true)} style={({ pressed }) => [styles.compact, pressed && styles.choicePressed]}>
      <UtilityIcon name="accessibility" size={19} /><Text style={styles.compactText}>Accessibility</Text>
    </Action>
    <BottomSheet visible={open} onClose={() => setOpen(false)} title="Display & accessibility">
      <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>{content}</ScrollView>
    </BottomSheet>
  </>;
}
const styles = StyleSheet.create({
  action: { minWidth: 48, minHeight: 48, justifyContent: 'center' },
  settings: { gap: 14, paddingVertical: 12 },
  title: { color: COLORS.muted, fontSize: 13, fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase' },
  body: { color: COLORS.muted, fontSize: 16, lineHeight: 24, flexShrink: 1 },
  choices: { backgroundColor: COLORS.panel, borderRadius: 16, overflow: 'hidden' },
  choice: { padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14 },
  choiceSeparator: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: COLORS.stroke },
  choiceText: { flex: 1 },
  choiceTitle: { color: COLORS.text, fontSize: 17, fontWeight: '500', marginBottom: 4 },
  description: { color: COLORS.muted, fontSize: 15, lineHeight: 22 },
  selected: { backgroundColor: COLORS.control },
  choicePressed: { backgroundColor: COLORS.raised },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 1, borderColor: COLORS.wire, alignItems: 'center', justifyContent: 'center' },
  radioSelected: { backgroundColor: COLORS.text, borderColor: COLORS.text },
  compact: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 8, borderRadius: 8, maxWidth: '100%' },
  compactText: { color: COLORS.muted, fontSize: 14, flexShrink: 1 },
});
