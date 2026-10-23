import { AccessibleText as Text } from '../accessibility/AccessibleText';
import { Action as Pressable } from '../accessibility/controls';
import { useAccessibilityPreferences } from '../accessibility/AccessibilityPreferences';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS, FONT, colorWithAlpha } from '../theme/colors';

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
          minWidth: Math.max(size, 44),
          minHeight: Math.max(size, 44),
          padding: textLabel ? 8 : 0,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      {textLabel ? (
        <Text style={[styles.glyph, { color: COLORS.text, fontSize: 16 }]}>Help</Text>
      ) : (
        // The visible mark stays small; the touch area around it does not.
        <View style={[styles.mark, { width: size + 4, height: size + 4, borderRadius: (size + 4) / 2, borderColor: colorWithAlpha(accentColor, 0.6) }]}>
          <Text style={[styles.glyph, { color: accentColor, fontSize: size * 0.62 }]}>?</Text>
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
