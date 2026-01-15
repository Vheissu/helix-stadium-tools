import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS, FONTS, SIGNAL_FLOW } from '../../theme/colors';

interface IONodeProps {
  type: 'input' | 'output';
  size?: number;
  label?: string;
  value?: string;
  onPress?: () => void;
}

const InputIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 3L9 21M9 21L15 15M9 21L3 15"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="rotate(-90 12 12)"
    />
  </Svg>
);

const OutputIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 3L15 21M15 21L21 15M15 21L9 15"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="rotate(-90 12 12)"
    />
  </Svg>
);

export const IONode: React.FC<IONodeProps> = ({
  type,
  size = SIGNAL_FLOW.nodeSize,
  label,
  value,
  onPress,
}) => (
  <Pressable style={styles.container} onPress={onPress}>
    <View style={[styles.node, { width: size, height: size, borderRadius: size / 2 }]}>
      {type === 'input' ? (
        <InputIcon size={size * 0.5} color={COLORS.muted} />
      ) : (
        <OutputIcon size={size * 0.5} color={COLORS.muted} />
      )}
    </View>
    <Text style={styles.label}>{label ?? (type === 'input' ? 'Input' : 'Output')}</Text>
    {value ? <Text style={styles.value}>{value}</Text> : null}
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 72,
    gap: 4,
  },
  node: {
    backgroundColor: COLORS.panelAlt,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: COLORS.muted,
    fontFamily: FONTS.mono,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  value: {
    color: COLORS.text,
    fontFamily: FONTS.body,
    fontSize: 11,
    textAlign: 'center',
  },
});
