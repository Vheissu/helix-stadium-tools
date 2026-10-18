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
  return <View style={styles.container}>
    {namedBoolean ? <View style={{ gap: 8 }}>
      <Text style={styles.text}>{label}</Text>
      <View style={styles.row}>{options!.map((option, index) => <Action key={option}
        accessibilityRole="radio" accessibilityLabel={`${label}, ${option}`} accessibilityState={{ checked: Boolean(value) === (index === 1) }}
        onPress={() => { onChange(index === 1); announce(`${label}, ${option}`, false); }} style={styles.button}>
        <Text style={styles.text}>{option}{Boolean(value) === (index === 1) ? ' · Selected' : ''}</Text>
      </Action>)}</View>
    </View> : type === 'b' ? <View style={styles.row}>
      <Text style={styles.text}>{label}</Text>
      <Switch accessibilityLabel={label} value={Boolean(value)} onValueChange={onChange} />
    </View> : <>
      <View accessible accessibilityRole="adjustable" accessibilityLabel={label}
        accessibilityValue={{ min, max, now: Number(value), text: display }}
        accessibilityHint="Adjust the value, or use the decrease and increase buttons."
        accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
        onAccessibilityAction={({ nativeEvent }) => {
          if (nativeEvent.actionName === 'increment') change(1);
          if (nativeEvent.actionName === 'decrement') change(-1);
        }} style={styles.readout}>
        <Text style={styles.text}>{label}</Text><Text style={styles.value}>{display}</Text>
      </View>
      <View style={styles.row}>
        <Action accessibilityLabel={`Decrease ${label}`} disabled={lower} onPress={() => change(-1, true)} style={styles.button}><Text style={styles.text}>Decrease</Text></Action>
        <Action accessibilityLabel={`Increase ${label}`} disabled={upper} onPress={() => change(1, true)} style={styles.button}><Text style={styles.text}>Increase</Text></Action>
        {!!options?.length && <Action accessibilityLabel={`Choose ${label}`} onPress={() => setChoosing(true)} style={styles.button}><Text style={styles.text}>Choose value</Text></Action>}
        {!options?.length && <Action accessibilityLabel={`Enter ${label} value`} onPress={open} style={styles.button}><Text style={styles.text}>Enter value</Text></Action>}
      </View>
    </>}
    {helpAdornment}
    <BottomSheet visible={choosing} onClose={() => setChoosing(false)} title={`Choose ${label}`}>
      <ScrollView>{options?.map((option, index) => <Action key={index} accessibilityRole="radio"
        accessibilityLabel={`${label}, ${option}`} accessibilityState={{ checked: Number(value) === min + index }}
        disabled={min + index > max} onPress={() => { onChange(min + index); setChoosing(false); announce(`${label}, ${option}`, false); }}>
        <Text style={styles.text}>{option}{Number(value) === min + index ? ' · Selected' : ''}</Text>
      </Action>)}</ScrollView>
    </BottomSheet>
    <BottomSheet visible={editing} onClose={() => setEditing(false)} title={`Set ${label}`}>
      <ScrollView keyboardShouldPersistTaps="handled"><Text style={styles.text}>Range: {displayMin ?? min} to {displayMax ?? max}{unit && unit !== 'unitless' ? ` ${unit}` : ''}</Text>
      <TextInput accessibilityLabel={`${label} value${unit && unit !== 'unitless' ? ` in ${unit}` : ''}`} style={styles.input}
        value={text} onChangeText={setText} keyboardType="numbers-and-punctuation" selectTextOnFocus />
      {!!error && <Text accessibilityRole="alert" style={styles.text}>{error}</Text>}
      <Action onPress={() => {
        const next = parseParameterInput(text, props);
        if (next === null) { const message = 'Enter a number within the displayed range.'; setError(message); announce(message); return; }
        onChange(next); setEditing(false); announce(`${label}, ${formatParamValue(next, min, max, displayMin, displayMax, unit, type, options, precision)}`, false);
      }}><Text style={styles.text}>Set value</Text></Action>
    </ScrollView></BottomSheet>
  </View>;
}
const styles = StyleSheet.create({
  container: { width: '100%', gap: 8, paddingVertical: 12, borderBottomWidth: 1, borderColor: COLORS.stroke },
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 12 },
  readout: { minHeight: 48, gap: 4 },
  text: { color: COLORS.text, fontSize: 16, flexShrink: 1 },
  value: { color: COLORS.text, fontSize: 20 },
  button: { borderWidth: 1, borderColor: COLORS.muted, borderRadius: 8, padding: 12 },
  input: { color: COLORS.text, borderWidth: 1, borderColor: COLORS.muted, minHeight: 48, fontSize: 20, padding: 12, marginVertical: 12 },
});
