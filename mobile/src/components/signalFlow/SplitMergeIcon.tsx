import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS, SIGNAL_FLOW } from '../../theme/colors';

interface SplitMergeIconProps {
  type: 'split' | 'merge';
  size?: number;
}

const SplitIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 12H8M8 12L12 6H20M8 12L12 18H20"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const MergeIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 6H12L16 12M4 18H12L16 12M16 12H20"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const SplitMergeIcon: React.FC<SplitMergeIconProps> = ({
  type,
  size = SIGNAL_FLOW.splitIconSize
}) => (
  <View style={[styles.container, { width: size + 8, height: size + 8, borderRadius: (size + 8) / 2 }]}>
    {type === 'split' ? (
      <SplitIcon size={size} color={COLORS.text} />
    ) : (
      <MergeIcon size={size} color={COLORS.text} />
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.stroke,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
