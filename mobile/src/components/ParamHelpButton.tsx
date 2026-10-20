import { AccessibleText as Text } from '../accessibility/AccessibleText';
import { Action as Pressable } from '../accessibility/controls';
import { useAccessibilityPreferences } from '../accessibility/AccessibilityPreferences';
import React from 'react';
import { StyleSheet } from 'react-native';
import { COLORS, FONTS, colorWithAlpha } from '../theme/colors';

interface ParamHelpButtonProps {
  onPress: () => void;
  accentColor?: string;
  size?: number;
  label?: string;
}

/**
 * Small circular "?" affordance shown next to a parameter label. Tapping
 * surfaces the help text the desktop editor displays for that parameter.
 */
export const ParamHelpButton: React.FC<ParamHelpButtonProps> = ({
  onPress,
  accentColor = COLORS.muted,
  size = 18,
  label = "Show help for this parameter",
}) => {
  const { accessibleLayout, screenReader } = useAccessibilityPreferences();
  const textLabel = accessibleLayout || screenReader;
  return (
    <Pressable
      onPress={onPress}
      hitSlop={10}
      style={({ pressed }) => [
        styles.btn,
        {
          minWidth: Math.max(size, 48),
          minHeight: Math.max(size, 48),
          padding: textLabel ? 8 : 0,
          borderRadius: size / 2,
          borderColor: colorWithAlpha(accentColor, 0.55),
          backgroundColor: colorWithAlpha(accentColor, 0.08),
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={[styles.glyph, { color: textLabel ? COLORS.text : accentColor, fontSize: textLabel ? 16 : size * 0.62 }]}>{textLabel ? 'Help' : '?'}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  glyph: {
    fontFamily: FONTS.bodySemi,
    lineHeight: undefined,
    includeFontPadding: false,
    textAlign: 'center',
  },
});
