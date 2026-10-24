import React, { useContext } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, TextInput, View, useWindowDimensions } from 'react-native';
import { SafeAreaInsetsContext, initialWindowMetrics } from 'react-native-safe-area-context';
import { AccessibleText as Text } from '../accessibility/AccessibleText';
import { useAccessibilityPreferences } from '../accessibility/AccessibilityPreferences';
import { Action } from '../accessibility/controls';
import { COLORS, FONT } from '../theme/colors';

interface ParamValueEditorProps {
  visible: boolean;
  label: string;
  unit?: string | null;
  value: string;
  /** Show a keyboard with a minus key. Defaults on so negative ranges are never blocked. */
  allowNegative?: boolean;
  onChangeValue: (text: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const NO_INSETS = { top: 0, bottom: 0, left: 0, right: 0 };

/** Exact-value entry shared by the visual slider and knob. Parsing stays with the caller. */
export function ParamValueEditor({ visible, label, unit, value, allowNegative = true, onChangeValue, onSubmit, onCancel }: ParamValueEditorProps) {
  const { width, fontScale } = useWindowDimensions();
  const { reduceMotion } = useAccessibilityPreferences();
  const insets = useContext(SafeAreaInsetsContext) ?? initialWindowMetrics?.insets ?? NO_INSETS;
  // Release the native modal when closed, matching BottomSheet; autofocus then runs on every open.
  if (!visible) return null;
  const unitText = unit && unit !== 'unitless' ? unit : null;
  // The iOS decimal pad has no minus key. Android's numeric keyboard is already signed and decimal.
  const keyboardType = allowNegative && Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric';
  const cardWidth = Math.min(320, width - insets.left - insets.right - 48);
  const stackActions = fontScale >= 1.8;
  return (
    <Modal visible transparent animationType={reduceMotion ? 'none' : 'fade'} onRequestClose={onCancel}
      supportedOrientations={['portrait', 'landscape']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.backdrop}>
        {/* Scrolls when the largest text sizes or a short landscape screen can't fit the card. */}
        <ScrollView keyboardShouldPersistTaps="handled" bounces={false} showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scroll, {
            paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16,
            paddingLeft: insets.left + 24, paddingRight: insets.right + 24,
          }]}>
          <Pressable accessible={false} importantForAccessibility="no" style={StyleSheet.absoluteFill} onPress={onCancel} />
          <View style={[styles.card, { width: cardWidth }]} accessibilityViewIsModal onAccessibilityEscape={onCancel}>
            <Text accessibilityRole="header" maxFontSizeMultiplier={2} style={styles.label}>{label}</Text>
            <TextInput
              accessibilityLabel={`${label} value${unitText ? ` in ${unitText}` : ''}`}
              style={styles.input}
              maxFontSizeMultiplier={2}
              value={value}
              onChangeText={onChangeValue}
              keyboardType={keyboardType}
              autoCorrect={false}
              autoCapitalize="none"
              autoFocus
              selectTextOnFocus
              onSubmitEditing={onSubmit}
              returnKeyType="done"
            />
            {unitText && <Text maxFontSizeMultiplier={2} style={styles.unit}>{unitText}</Text>}
            <View style={[styles.actions, stackActions && styles.actionsStacked]}>
              <Action onPress={onCancel} style={({ pressed }) => [styles.button, stackActions && styles.buttonStacked, styles.cancel, pressed && styles.pressed]}>
                <Text maxFontSizeMultiplier={2} numberOfLines={1} style={styles.cancelText}>Cancel</Text>
              </Action>
              <Action accessibilityLabel={`Set ${label}`} onPress={onSubmit} style={({ pressed }) => [styles.button, stackActions && styles.buttonStacked, styles.confirm, pressed && styles.pressed]}>
                <Text maxFontSizeMultiplier={2} numberOfLines={1} style={styles.confirmText}>Set</Text>
              </Action>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: COLORS.panel,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    padding: 20,
    alignItems: 'stretch',
    gap: 12,
  },
  label: {
    color: COLORS.text,
    ...FONT.semibold,
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
  },
  input: {
    minHeight: 48,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.accent,
    backgroundColor: COLORS.panelAlt,
    color: COLORS.text,
    ...FONT.numeric,
    fontSize: 20,
    textAlign: 'center',
  },
  unit: {
    color: COLORS.muted,
    ...FONT.numeric,
    fontSize: 13,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  actionsStacked: {
    flexDirection: 'column',
  },
  button: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  // Column children must size to content, not to a zero flex basis.
  buttonStacked: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
  },
  cancel: { backgroundColor: COLORS.control },
  confirm: { backgroundColor: COLORS.accent },
  pressed: { opacity: 0.8 },
  cancelText: { color: COLORS.text, ...FONT.semibold, fontSize: 15 },
  confirmText: { color: COLORS.bg, ...FONT.semibold, fontSize: 15 },
});
