import { AccessibleText as Text } from '../accessibility/AccessibleText';
import { Action as Pressable } from '../accessibility/controls';
import { useAccessibilityPreferences } from '../accessibility/AccessibilityPreferences';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS, FONT, colorWithAlpha } from '../theme/colors';
import { UtilityIcon } from './UtilityIcon';

interface ParamHelpButtonProps {
  onPress: () => void;
  accentColor?: string;
  size?: number;
  label?: string;
  /** Bare glyph that sits just after a label; the 48pt target extends to the right. */
  inline?: boolean;
}

/**
 * Small circular "?" affordance shown next to a parameter label. Tapping
 * surfaces the help text the desktop editor displays for that parameter.
 * The 48pt minimum from `Action` is the whole target: no extra hitSlop, so it
 * never overlaps the value or slider beside it.
 */
export const ParamHelpButton: React.FC<ParamHelpButtonProps> = ({
  onPress,
  accentColor = COLORS.muted,
  size = 18,
  label = "Show help for this parameter",
  inline = false,
}) => {
  const { accessibleLayout, screenReader } = useAccessibilityPreferences();
  const textLabel = accessibleLayout || screenReader;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        inline && !textLabel && styles.inline,
        textLabel && styles.textButton,
        { opacity: pressed ? 0.6 : 1 },
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      {textLabel ? (
        <Text style={[styles.glyph, { color: COLORS.text, fontSize: 16 }]}>Help</Text>
      ) : inline ? (
        <UtilityIcon name="help" size={Math.min(size, 18)} color={accentColor} strokeWidth={1.8} />
      ) : (
        // The visible mark stays small; the touch area around it does not.
        <View style={[styles.mark, { width: size + 4, height: size + 4, borderRadius: (size + 4) / 2, borderColor: colorWithAlpha(accentColor, 0.6) }]}>
          <Text maxFontSizeMultiplier={1.5} style={[styles.glyph, { color: accentColor, fontSize: size * 0.62 }]}>?</Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inline: {
    alignItems: 'flex-start',
    paddingLeft: 6,
  },
  textButton: {
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.stroke,
  },
  mark: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  glyph: {
    ...FONT.semibold,
    lineHeight: undefined,
    includeFontPadding: false,
    textAlign: 'center',
  },
});
