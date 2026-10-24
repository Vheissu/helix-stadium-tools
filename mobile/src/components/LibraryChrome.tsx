import type { ReactNode } from 'react';
import { StyleSheet, TextInput, View, useWindowDimensions } from 'react-native';
import { AccessibleText as Text, ScreenHeading } from '../accessibility/AccessibleText';
import { Action } from '../accessibility/controls';
import { COLORS, FONT } from '../theme/colors';
import { BrandMark } from './BrandMark';
import { UtilityIcon, type UtilityIconName } from './UtilityIcon';

export function LibraryHeading({ title, focusKey, children }: { title: string; focusKey: string; children?: ReactNode }) {
  return <View style={libraryStyles.heading}>
    <ScreenHeading maxFontSizeMultiplier={1.5} focusKey={focusKey} style={libraryStyles.title}>{title}</ScreenHeading>
    {children ?? <BrandMark size={30} />}
  </View>;
}

export function LibraryButton({ label, icon, onPress, disabled = false, primary = false }: {
  label: string; icon?: UtilityIconName; onPress: () => void; disabled?: boolean; primary?: boolean;
}) {
  return <Action accessibilityLabel={label} disabled={disabled} onPress={onPress}
    style={({ pressed }) => [libraryStyles.button, primary && libraryStyles.primary, pressed && { opacity: 0.75 }, disabled && { opacity: 0.45 }]}>
    {icon && <UtilityIcon name={icon} color={primary ? COLORS.bg : COLORS.text} size={18} />}
    <Text style={[libraryStyles.buttonText, primary && { color: COLORS.bg }]}>{label}</Text>
  </Action>;
}

export function LibrarySearch({ value, onChange, placeholder = 'Search presets', label = 'Search presets' }: {
  value: string; onChange: (value: string) => void; placeholder?: string; label?: string;
}) {
  return <View style={libraryStyles.search}>
    <UtilityIcon name="search" size={20} />
    <TextInput accessibilityLabel={label} value={value} onChangeText={onChange} style={libraryStyles.searchInput}
      placeholder={placeholder} placeholderTextColor={COLORS.muted} autoCorrect={false} autoCapitalize="none" returnKeyType="search" />
    {!!value && <Action accessibilityLabel="Clear search" onPress={() => onChange('')} style={libraryStyles.iconButton}><UtilityIcon name="close" size={18} /></Action>}
  </View>;
}

export function LibrarySegments<T extends string>({ options, value, onChange, disabled = false, label }: {
  options: readonly (readonly [T, string])[]; value: T; onChange: (value: T) => void; disabled?: boolean; label: string;
}) {
  const { fontScale } = useWindowDimensions();
  return <View accessibilityRole="tablist" accessibilityLabel={label} style={libraryStyles.segments}>
    {options.map(([key, title]) => <Action key={key} disabled={disabled} accessibilityRole="tab" accessibilityState={{ selected: value === key, disabled }}
      onPress={() => onChange(key)} style={[libraryStyles.segment, fontScale > 1.5 && { flexBasis: '100%' }, value === key && libraryStyles.segmentSelected]}>
      <Text style={[libraryStyles.segmentText, value === key && { color: COLORS.text }]}>{title}</Text>
    </Action>)}
  </View>;
}

export function LibraryRow({ title, position, selected = false, empty = false, disabled = false, onPress, onOptions, accessibilityLabel }: {
  title: string; position: string; selected?: boolean; empty?: boolean; disabled?: boolean;
  onPress: () => void; onOptions?: () => void; accessibilityLabel: string;
}) {
  const { fontScale } = useWindowDimensions();
  return <View style={[libraryStyles.row, selected && libraryStyles.selectedRow]}>
    <Action disabled={disabled} accessibilityState={{ selected }} accessibilityLabel={accessibilityLabel}
      onPress={onPress} onLongPress={onOptions} style={({ pressed }) => [libraryStyles.rowMain, fontScale > 1.5 && { flexDirection: 'column', alignItems: 'flex-start' }, pressed && libraryStyles.pressed]}>
      <Text style={[libraryStyles.position, selected && { color: COLORS.text }]}>{position}</Text>
      <View style={libraryStyles.rowCopy}><Text style={[libraryStyles.rowTitle, empty && { color: COLORS.muted }]}>{title}</Text>
        {selected && <Text style={libraryStyles.rowHint}>Active preset</Text>}
      </View>
      {selected && fontScale <= 1.5 && <UtilityIcon name="check" color={COLORS.text} size={18} />}
    </Action>
    {onOptions && <Action disabled={disabled} accessibilityLabel={`Options for ${title}`} onPress={onOptions} style={({ pressed }) => [libraryStyles.iconButton, pressed && libraryStyles.pressed]}>
      <UtilityIcon name="more" size={22} />
    </Action>}
  </View>;
}

export const libraryStyles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 32, width: '100%', maxWidth: 820, alignSelf: 'center' },
  heading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 20 },
  title: { color: COLORS.text, ...FONT.bold, fontSize: 28, flex: 1 },
  header: { gap: 16, paddingBottom: 20 },
  toolbar: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center' },
  button: { minHeight: 48, flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12, backgroundColor: COLORS.control },
  primary: { backgroundColor: COLORS.text },
  buttonText: { color: COLORS.text, ...FONT.semibold, fontSize: 15 },
  iconButton: { width: 48, minHeight: 48, alignItems: 'center', justifyContent: 'center', borderRadius: 10 },
  search: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingLeft: 14, borderRadius: 12, backgroundColor: COLORS.control },
  searchInput: { flex: 1, minWidth: 0, minHeight: 50, paddingVertical: 12, color: COLORS.text, fontSize: 16 },
  segments: { flexDirection: 'row', flexWrap: 'wrap', padding: 4, gap: 4, borderRadius: 12, backgroundColor: COLORS.panel },
  segment: { flexGrow: 1, flexBasis: 80, paddingVertical: 12, paddingHorizontal: 12, minHeight: 48, alignItems: 'center', justifyContent: 'center', borderRadius: 9 },
  segmentSelected: { backgroundColor: COLORS.raised },
  segmentText: { color: COLORS.muted, ...FONT.semibold, fontSize: 15 },
  section: { color: COLORS.muted, fontSize: 15, ...FONT.semibold },
  muted: { color: COLORS.muted, fontSize: 15, lineHeight: 22 },
  row: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.hairline, minHeight: 72 },
  selectedRow: { backgroundColor: COLORS.control, borderRadius: 12, borderBottomColor: 'transparent', borderLeftWidth: 2, borderLeftColor: COLORS.brand },
  rowMain: { flex: 1, flexDirection: 'row', gap: 14, alignItems: 'center', paddingHorizontal: 12, paddingVertical: 17, minHeight: 72, borderRadius: 12 },
  rowCopy: { flex: 1, gap: 4 },
  rowTitle: { color: COLORS.text, ...FONT.medium, fontSize: 16, lineHeight: 22 },
  rowHint: { color: COLORS.muted, fontSize: 14 },
  position: { color: COLORS.muted, ...FONT.numeric, fontSize: 15, minWidth: 32 },
  pressed: { backgroundColor: COLORS.raised },
});
