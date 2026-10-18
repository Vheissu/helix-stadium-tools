import Svg, { Path } from 'react-native-svg';
import { getLastAction, useAccessibilityPreferences } from '../accessibility/AccessibilityPreferences';
import React, { useEffect, useRef } from 'react';
import { AccessibilityInfo, Keyboard, KeyboardAvoidingView, Platform, Modal, Pressable, StyleSheet, Text, View, type ViewInstance } from 'react-native';
import { COLORS, FONTS } from '../theme/colors';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  closeDisabled?: boolean;
  children: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  title,
  subtitle,
  closeDisabled = false,
  children,
}) => {
  const { screenReader, reduceMotion } = useAccessibilityPreferences();
  const heading = useRef<ViewInstance>(null);
  const opener = useRef<ViewInstance | null>(null);
  const wasOpen = useRef(false);
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
  const requestClose = () => { if (!closeDisabled) onClose(); };
  return <Modal visible={visible} transparent animationType={reduceMotion ? 'none' : 'slide'} onRequestClose={requestClose}
    onShow={() => { if (screenReader && heading.current) AccessibilityInfo.sendAccessibilityEvent(heading.current, 'focus'); }}>
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.backdrop}>
      <Pressable disabled={closeDisabled} accessible={false} importantForAccessibility="no" style={styles.dismiss} onPress={requestClose} />
      <View style={styles.sheet} accessibilityViewIsModal onAccessibilityEscape={requestClose}>
        <View style={styles.handleBar} accessible={false} />
        <View style={styles.header}>
          <View style={styles.headerText} ref={heading} accessible accessibilityRole="header" accessibilityLabel={title ?? 'Options'}>
            <Text style={styles.title}>{title ?? 'Options'}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
          <Pressable disabled={closeDisabled} accessibilityState={{ disabled: closeDisabled }} accessibilityRole="button" onPress={requestClose} accessibilityLabel={`Close ${title ?? 'options'}`} style={styles.closeBtn}>
            <Svg width={20} height={20} viewBox="0 0 24 24" accessible={false}><Path d="M6 6l12 12M18 6L6 18" stroke={COLORS.text} strokeWidth={2} strokeLinecap="round" /></Svg>
          </Pressable>
        </View>
        {children}
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
    backgroundColor: COLORS.panel,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 34,
    maxHeight: '85%',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.stroke,
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.stroke,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 18,
  },
  header: {
    flexShrink: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  headerText: {
    flex: 1,
  },
  title: {
    color: COLORS.text,
    fontFamily: FONTS.display,
    fontSize: 20,
    letterSpacing: 0.3,
  },
  subtitle: {
    color: COLORS.muted,
    fontFamily: FONTS.mono,
    fontSize: 11,
    marginTop: 4,
    letterSpacing: 0.3,
  },
  closeBtn: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: COLORS.panelAlt,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    alignItems: 'center',
    justifyContent: 'center',
  },
  close: {
    color: COLORS.muted,
    fontSize: 20,
    lineHeight: 22,
  },
});
