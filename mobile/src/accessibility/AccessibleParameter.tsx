import React, { useRef, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { BottomSheet } from '../components/BottomSheet';
import { COLORS } from '../theme/colors';
import { formatParamValue } from '../utils/paramFormat';
import { Action } from './controls';
import { adjustParameter, parseParameterInput, type ParameterRange } from './parameter';
import { announce } from './AccessibilityPreferences';

export interface AccessibleParameterProps extends ParameterRange {
  precision?: number;
  label: string; value: number | boolean; unit?: string | null;
  onChange: (value: number | boolean) => void; helpAdornment?: React.ReactNode;
}
export function AccessibleParameter(props: AccessibleParameterProps) {
  const { label, value, min, max, type, options, displayMin, displayMax, unit, onChange, helpAdornment, precision } = props;
  const [editing, setEditing] = useState(false);
  const [choosing, setChoosing] = useState(false);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const latest = useRef(value);
  latest.current = value;
  const namedBoolean = type === 'b' && options?.length === 2 && !(options[0].toLowerCase() === 'off' && options[1].toLowerCase() === 'on');
  const display = formatParamValue(value, min, max, displayMin, displayMax, unit, type, options, precision);
  const change = (direction: -1 | 1, button = false) => {
    const next = adjustParameter(latest.current, direction, props);
    latest.current = next;
    onChange(next);
    if (button || Platform.OS === 'android') announce(`${label}, ${formatParamValue(next, min, max, displayMin, displayMax, unit, type, options, precision)}`, false);
  };
  const lower = adjustParameter(value, -1, props) === value;
  const upper = adjustParameter(value, 1, props) === value;
  const open = () => {
    const numeric = Number(value);
    const shown = displayMin !== undefined && displayMax !== undefined && max !== min
      ? displayMin + (numeric - min) / (max - min) * (displayMax - displayMin) : numeric;
    setText(String(Number(shown.toFixed(6)))); setError(''); setEditing(true);
  };
  const submit = () => {
    const next = parseParameterInput(text, props);
    if (next === null) { const message = 'Enter a number within the displayed range.'; setError(message); announce(message); return; }
    onChange(next); setEditing(false); announce(`${label}, ${formatParamValue(next, min, max, displayMin, displayMax, unit, type, options, precision)}`, false);
  };
  const unitText = unit && unit !== 'unitless' ? unit : null;
  return <View style={styles.container}>
    {namedBoolean ? <View style={{ gap: 8 }}>
      <Text style={styles.text}>{label}</Text>
      <View style={styles.row}>{options!.map((option, index) => {
        const checked = Boolean(value) === (index === 1);
        return <Action key={option}
          accessibilityRole="radio" accessibilityLabel={`${label}, ${option}`} accessibilityState={{ checked }}
          onPress={() => { onChange(index === 1); announce(`${label}, ${option}`, false); }} style={[styles.button, checked && styles.selected]}>
          <Text style={styles.buttonText}>{option}{checked ? ' · Selected' : ''}</Text>
        </Action>;
      })}</View>
    </View> : type === 'b' ? <View style={styles.switchRow}>
      <Text style={[styles.text, styles.grow]}>{label}</Text>
      <Switch accessibilityLabel={label} value={Boolean(value)} onValueChange={onChange} />
    </View> : <>
      <View accessible accessibilityRole="adjustable" accessibilityLabel={label}
        accessibilityValue={{ min, max, now: Number(value), text: display }}
        accessibilityHint={Platform.OS === 'ios' ? 'Swipe up or down to adjust. You can also use the decrease and increase buttons.' : 'Use adjustment actions, or the decrease and increase buttons.'}
        accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
        onAccessibilityAction={({ nativeEvent }) => {
          if (nativeEvent.actionName === 'increment') change(1);
          if (nativeEvent.actionName === 'decrement') change(-1);
        }} style={styles.readout}>
        <Text style={styles.text}>{label}</Text><Text style={styles.value}>{display}</Text>
      </View>
      <View style={styles.row}>
        <Action accessibilityLabel={`Decrease ${label}`} disabled={lower} onPress={() => change(-1, true)} style={[styles.button, lower && styles.disabled]}><Text style={styles.buttonText}>Decrease</Text></Action>
        <Action accessibilityLabel={`Increase ${label}`} disabled={upper} onPress={() => change(1, true)} style={[styles.button, upper && styles.disabled]}><Text style={styles.buttonText}>Increase</Text></Action>
        {!!options?.length && <Action accessibilityLabel={`Choose ${label}`} onPress={() => setChoosing(true)} style={styles.button}><Text style={styles.buttonText}>Choose value</Text></Action>}
        {!options?.length && <Action accessibilityLabel={`Enter ${label} value`} onPress={open} style={styles.button}><Text style={styles.buttonText}>Enter value</Text></Action>}
      </View>
    </>}
    {helpAdornment ? <View style={styles.help}>{helpAdornment}</View> : null}
    <BottomSheet visible={choosing} onClose={() => setChoosing(false)} title={`Choose ${label}`} fill={(options?.length ?? 0) > 8}>
      <ScrollView>{options?.map((option, index) => {
        const checked = Number(value) === min + index;
        return <Action key={index} accessibilityRole="radio"
          accessibilityLabel={`${label}, ${option}`} accessibilityState={{ checked }}
          disabled={min + index > max} onPress={() => { onChange(min + index); setChoosing(false); announce(`${label}, ${option}`, false); }}
          style={[styles.option, index > 0 && styles.optionDivider, min + index > max && styles.disabled]}>
          <Text style={[styles.text, styles.grow, checked && styles.optionChecked]}>{option}{checked ? ' · Selected' : ''}</Text>
        </Action>;
      })}</ScrollView>
    </BottomSheet>
    <BottomSheet visible={editing} onClose={() => setEditing(false)} title={`Set ${label}`}
      footer={<Action onPress={submit} style={styles.primary}><Text style={styles.primaryText}>Set value</Text></Action>}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.editBody}>
        <Text style={styles.text}>Range: {displayMin ?? min} to {displayMax ?? max}{unitText ? ` ${unitText}` : ''}</Text>
        <TextInput accessibilityLabel={`${label} value${unitText ? ` in ${unitText}` : ''}`} style={styles.input}
          value={text} onChangeText={setText} keyboardType="numbers-and-punctuation" selectTextOnFocus
          returnKeyType="done" onSubmitEditing={submit} />
        {!!error && <Text accessibilityRole="alert" style={[styles.text, styles.error]}>{error}</Text>}
      </ScrollView>
    </BottomSheet>
  </View>;
}
const styles = StyleSheet.create({
  container: { width: '100%', gap: 8, paddingVertical: 12, borderBottomWidth: 1, borderColor: COLORS.stroke },
  // Buttons share a row while they fit, then each takes a full row instead of leaving one orphan.
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'stretch', gap: 8 },
  switchRow: { flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 48 },
  grow: { flex: 1, minWidth: 0 },
  readout: { minHeight: 48, gap: 4 },
  text: { color: COLORS.text, fontSize: 16, lineHeight: 22, flexShrink: 1 },
  value: { color: COLORS.text, fontSize: 20, lineHeight: 26 },
  button: { flexGrow: 1, flexBasis: 128, alignItems: 'center', borderWidth: 1, borderColor: COLORS.muted, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 },
  buttonText: { color: COLORS.text, fontSize: 16, lineHeight: 22, textAlign: 'center' },
  selected: { borderWidth: 2, borderColor: COLORS.accent, backgroundColor: COLORS.raised },
  disabled: { opacity: 0.45 },
  help: { alignSelf: 'flex-start' },
  option: { minHeight: 52, flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  optionDivider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: COLORS.stroke },
  optionChecked: { fontWeight: '600' },
  editBody: { gap: 12, paddingBottom: 12 },
  input: { color: COLORS.text, borderWidth: 1, borderColor: COLORS.muted, borderRadius: 10, minHeight: 48, fontSize: 20, paddingHorizontal: 12, paddingVertical: 10 },
  error: { color: COLORS.danger },
  primary: { borderRadius: 10, backgroundColor: COLORS.accent, alignItems: 'center', paddingHorizontal: 16 },
  primaryText: { color: COLORS.bg, fontSize: 17, lineHeight: 22, fontWeight: '600' },
});
