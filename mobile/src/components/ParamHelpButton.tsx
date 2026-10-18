import { AccessibleText as Text } from '../accessibility/AccessibleText';
import { Action as Pressable } from '../accessibility/controls';
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
  return (
    <Pressable
      onPress={onPress}
      hitSlop={10}
      style={({ pressed }) => [
        styles.btn,
        {
          width: Math.max(size, 48),
          height: Math.max(size, 48),
          borderRadius: size / 2,
          borderColor: colorWithAlpha(accentColor, 0.55),
          backgroundColor: colorWithAlpha(accentColor, 0.08),
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={[styles.glyph, { color: accentColor, fontSize: size * 0.62 }]}>?</Text>
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
