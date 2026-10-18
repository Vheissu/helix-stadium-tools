import React, { useEffect, useRef } from 'react';
import { AccessibilityInfo, StyleSheet, Text, type TextProps, type ViewInstance } from 'react-native';
import { COLORS } from '../theme/colors';
import { useAccessibilityPreferences } from './AccessibilityPreferences';

export function AccessibleText({ style, numberOfLines, ...props }: TextProps) {
  const { accessibleLayout, screenReader } = useAccessibilityPreferences();
  const linear = accessibleLayout || screenReader;
  const flat = StyleSheet.flatten(style) ?? {};
  const size = Math.max(flat.fontSize ?? 16, 16);
  return <Text {...props} numberOfLines={linear ? undefined : numberOfLines} style={[style, linear && {
    fontSize: size, lineHeight: Math.max(flat.lineHeight ?? 0, size * 1.35),
    ...(flat.color === COLORS.muted ? { color: '#b7b8c0' } : {}),
  }]} />;
}
export function ScreenHeading({ children, focusKey, style }: { children: React.ReactNode; focusKey: string; style?: TextProps['style'] }) {
  const ref = useRef<ViewInstance>(null);
  const { screenReader } = useAccessibilityPreferences();
  useEffect(() => {
    if (!screenReader) return;
    const timer = setTimeout(() => { if (ref.current) AccessibilityInfo.sendAccessibilityEvent(ref.current, 'focus'); }, 200);
    return () => clearTimeout(timer);
  }, [screenReader, focusKey]);
  return <Text ref={ref} accessibilityRole="header" style={style}>{children}</Text>;
}
