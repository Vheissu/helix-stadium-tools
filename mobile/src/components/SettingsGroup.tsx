import { Children, type ReactNode } from 'react';
import { StyleSheet, Switch, View, useWindowDimensions } from 'react-native';
import { AccessibleText as Text } from '../accessibility/AccessibleText';
import { Action } from '../accessibility/controls';
import { COLORS, FONT } from '../theme/colors';
import { UtilityIcon, type UtilityIconName } from './UtilityIcon';

export function SettingsGroup({ title, children, footer, elevated = false }: { title: string; children: ReactNode; footer?: string; elevated?: boolean }) {
  return <View style={styles.group}>
    <Text accessibilityRole="header" style={styles.groupTitle}>{title}</Text>
    <View style={[styles.surface, elevated && { backgroundColor: COLORS.control }]}>{Children.toArray(children).map((child, index) => <View key={index}>
      {index > 0 && <View style={styles.separator} />}{child}
    </View>)}</View>
    {footer && <Text style={styles.footer}>{footer}</Text>}
  </View>;
}

export function SettingsRow({ label, hint, value, icon, onPress, disabled = false }: {
  label: string; hint?: string; value?: string; icon?: UtilityIconName; onPress: () => void; disabled?: boolean;
}) {
  const { fontScale } = useWindowDimensions();
  // At larger text sizes the value moves under the label instead of squeezing it.
  const stacked = fontScale > 1.3;
  return <Action disabled={disabled} onPress={onPress} accessibilityLabel={[label, value, hint].filter(Boolean).join('. ')}
    style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
    {icon && <View style={styles.icon}><UtilityIcon name={icon} /></View>}
    <View style={styles.text}><Text style={[styles.label, disabled && styles.disabled]}>{label}</Text>{hint && <Text style={styles.hint}>{hint}</Text>}
      {value && stacked && <Text style={[styles.hint, FONT.numeric]}>{value}</Text>}</View>
    {value && !stacked && <Text numberOfLines={2} style={styles.value}>{value}</Text>}
    <View style={styles.chevron}><UtilityIcon name="chevron" size={16} color={COLORS.faint} /></View>
  </Action>;
}

export function SettingsToggle({ label, hint, value, onChange, accessibilityLabel, disabled = false }: {
  label: string; hint?: string; value: boolean; onChange: (value: boolean) => void; accessibilityLabel?: string; disabled?: boolean;
}) {
  return <Action disabled={disabled} onPress={() => onChange(!value)} accessibilityRole="switch"
    accessibilityLabel={accessibilityLabel ?? label} accessibilityHint={hint} accessibilityState={{ checked: value, disabled }}
    style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
    <View style={styles.text}><Text style={[styles.label, disabled && styles.disabled]}>{label}</Text>{hint && <Text style={styles.hint}>{hint}</Text>}</View>
    <View style={styles.switch} pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <Switch value={value} disabled={disabled} accessible={false} trackColor={{ false: COLORS.raised, true: COLORS.text }} thumbColor={value ? COLORS.bg : COLORS.muted} ios_backgroundColor={COLORS.raised} />
    </View>
  </Action>;
}

const styles = StyleSheet.create({
  group: { gap: 8, marginTop: 24 },
  groupTitle: { color: COLORS.muted, ...FONT.semibold, fontSize: 15, lineHeight: 20, paddingHorizontal: 4 },
  surface: { borderRadius: 16, backgroundColor: COLORS.panel, overflow: 'hidden' },
  separator: { height: StyleSheet.hairlineWidth, backgroundColor: COLORS.stroke, marginHorizontal: 16 },
  row: { flexDirection: 'row', gap: 14, alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, minHeight: 56 },
  pressed: { backgroundColor: COLORS.raised },
  icon: { width: 24, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' },
  text: { flex: 1, minWidth: 0 },
  label: { color: COLORS.text, ...FONT.medium, fontSize: 16, lineHeight: 22 },
  hint: { color: COLORS.muted, fontSize: 15, lineHeight: 20, marginTop: 2 },
  value: { color: COLORS.muted, fontSize: 15, lineHeight: 20, ...FONT.numeric, flexShrink: 1, maxWidth: '45%', textAlign: 'right' },
  chevron: { width: 16, alignItems: 'center' },
  switch: { flexShrink: 0 },
  footer: { color: COLORS.muted, fontSize: 14, lineHeight: 20, paddingHorizontal: 4 },
  disabled: { color: COLORS.muted },
});
