import Svg, { Path } from 'react-native-svg';
import { getLastAction, useAccessibilityPreferences } from '../accessibility/AccessibilityPreferences';
import { AccessibleText as Text } from '../accessibility/AccessibleText';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Keyboard, KeyboardAvoidingView, Platform, Modal, Pressable, StyleSheet, View, useWindowDimensions, type ViewInstance } from 'react-native';
import { SafeAreaInsetsContext, initialWindowMetrics } from 'react-native-safe-area-context';
import { COLORS, FONT } from '../theme/colors';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  closeDisabled?: boolean;
  children: React.ReactNode;
  /** Give the sheet a definite height so a list body can use `flex: 1` instead of a fixed height. */
  fill?: boolean;
  /** Pinned below the body, outside any scroll view, so primary actions never clip. */
  footer?: React.ReactNode;
  /** Shows a back control before the title for sheets with steps. */
  onBack?: () => void;
  backLabel?: string;
}

const NO_INSETS = { top: 0, bottom: 0, left: 0, right: 0 };
const GUTTER = 20;

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  title,
  subtitle,
  closeDisabled = false,
  children,
  fill = false,
  footer,
  onBack,
  backLabel = 'Back',
}) => {
  const { screenReader, reduceMotion } = useAccessibilityPreferences();
  // Read the context directly so a sheet outside a provider still renders.
  const insets = useContext(SafeAreaInsetsContext) ?? initialWindowMetrics?.insets ?? NO_INSETS;
  const { width, height } = useWindowDimensions();
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const heading = useRef<ViewInstance>(null);
  const opener = useRef<ViewInstance | null>(null);
  const wasOpen = useRef(false);
  const shownTitle = useRef<string | null>(null);
  useEffect(() => {
    if (visible && !wasOpen.current) opener.current = getLastAction();
    const closing = wasOpen.current && !visible;
    wasOpen.current = visible;
    if (closing) Keyboard.dismiss();
    if (closing && screenReader) {
      const timer = setTimeout(() => { if (opener.current) AccessibilityInfo.sendAccessibilityEvent(opener.current, 'focus'); }, 250);
      return () => clearTimeout(timer);
    }
  }, [visible, screenReader]);
  // Stepped sheets swap their title in place; move focus to the new heading.
  useEffect(() => {
    if (!visible) { shownTitle.current = null; return; }
    const next = title ?? '';
    const changed = shownTitle.current !== null && shownTitle.current !== next;
    shownTitle.current = next;
    if (!changed || !screenReader) return;
    const timer = setTimeout(() => { if (heading.current) AccessibilityInfo.sendAccessibilityEvent(heading.current, 'focus'); }, 150);
    return () => clearTimeout(timer);
  }, [visible, title, screenReader]);
  useEffect(() => {
    if (!visible) return;
    const show = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', () => setKeyboardOpen(true));
    const hide = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', () => setKeyboardOpen(false));
    return () => { show.remove(); hide.remove(); setKeyboardOpen(false); };
  }, [visible]);
  // Fully release the native modal between openings. Retaining hidden modal
  // hosts can leave a reopened sheet absent from the iOS accessibility tree.
  if (!visible) return null;
  const requestClose = () => { if (!closeDisabled) onClose(); };
  // Hardware back and the VoiceOver escape gesture step back before closing.
  const requestBack = () => { if (closeDisabled) return; if (onBack) onBack(); else onClose(); };
  const phoneLandscape = width > height && height < 500;
  const sheetHeight = Math.min(height * (phoneLandscape ? 0.92 : 0.85), height - insets.top - 12);
  const label = title ?? 'Options';
  return <Modal visible={visible} transparent animationType={reduceMotion ? 'none' : 'slide'} onRequestClose={requestBack}
    supportedOrientations={['portrait', 'landscape']}
    onShow={() => { if (screenReader && heading.current) AccessibilityInfo.sendAccessibilityEvent(heading.current, 'focus'); }}>
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.backdrop, { paddingLeft: insets.left, paddingRight: insets.right }]}>
      <Pressable disabled={closeDisabled} accessible={false} importantForAccessibility="no" style={styles.dismiss} onPress={requestClose} />
      <View style={[styles.sheet, fill ? { height: sheetHeight } : { maxHeight: sheetHeight },
        { paddingBottom: keyboardOpen ? 12 : Math.max(insets.bottom + 12, 16) }]}
        accessibilityViewIsModal onAccessibilityEscape={requestBack}>
        <View style={styles.handleBar} accessible={false} />
        <View style={styles.header}>
          {onBack && <Pressable disabled={closeDisabled} accessibilityState={{ disabled: closeDisabled }} accessibilityRole="button"
            accessibilityLabel={backLabel} onPress={onBack} style={({ pressed }) => [styles.iconButton, styles.backButton, pressed && styles.pressed, closeDisabled && styles.disabled]}>
            <Svg width={22} height={22} viewBox="0 0 24 24" accessible={false}><Path d="m14 5-7 7 7 7" fill="none" stroke={COLORS.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></Svg>
          </Pressable>}
          <View style={styles.headerText} ref={heading} accessible accessibilityRole="header"
            accessibilityLabel={subtitle ? `${label}, ${subtitle}` : label}>
            <Text maxFontSizeMultiplier={1.5} numberOfLines={2} style={styles.title}>{label}</Text>
            {subtitle && <Text maxFontSizeMultiplier={1.5} numberOfLines={2} style={styles.subtitle}>{subtitle}</Text>}
          </View>
          <Pressable disabled={closeDisabled} accessibilityState={{ disabled: closeDisabled }} accessibilityRole="button" onPress={requestClose}
            accessibilityLabel={`Close ${title ?? 'options'}`} style={({ pressed }) => [styles.iconButton, styles.closeButton, pressed && styles.pressed, closeDisabled && styles.disabled]}>
            <Svg width={20} height={20} viewBox="0 0 24 24" accessible={false}><Path d="M6 6l12 12M18 6L6 18" stroke={COLORS.text} strokeWidth={2} strokeLinecap="round" /></Svg>
          </Pressable>
        </View>
        <View style={fill ? styles.bodyFill : styles.body}>{children}</View>
        {footer ? <View style={styles.footer}>{footer}</View> : null}
      </View>
    </KeyboardAvoidingView>
  </Modal>;
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'flex-end',
  },
  dismiss: {
    flex: 1,
  },
  sheet: {
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
    // Shrinks with the keyboard instead of pushing its header off screen.
    flexShrink: 1,
    minHeight: 0,
    backgroundColor: COLORS.panel,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: GUTTER,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.stroke,
  },
  handleBar: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.stroke,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  header: {
    flexShrink: 0,
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  headerText: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 4,
    gap: 2,
  },
  title: {
    color: COLORS.text,
    ...FONT.semibold,
    fontSize: 18,
    lineHeight: 22,
  },
  subtitle: {
    color: COLORS.muted,
    ...FONT.numeric,
    fontSize: 14,
    lineHeight: 18,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Pull the glyphs onto the gutter so they line up with the body text.
  backButton: { marginLeft: -13 },
  closeButton: { marginRight: -14 },
  pressed: { backgroundColor: COLORS.control },
  disabled: { opacity: 0.4 },
  body: {
    flexShrink: 1,
    minHeight: 0,
  },
  bodyFill: {
    flex: 1,
    minHeight: 0,
  },
  footer: {
    flexShrink: 0,
    marginHorizontal: -GUTTER,
    paddingHorizontal: GUTTER,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.stroke,
  },
});
