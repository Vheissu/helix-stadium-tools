import { AccessibleText as Text } from '../accessibility/AccessibleText';
import React from 'react';
import { Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONT } from '../theme/colors';

export type TabKey = 'flow' | 'preset' | 'setlists' | 'matrix' | 'settings';

interface TabBarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  connected: boolean;
  /** `rail` stacks the tabs down the left edge for wide tablet layouts. */
  variant?: 'bar' | 'rail';
}

const FlowIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 12L6 8L9 16L12 6L15 18L18 10L21 12"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const PresetIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const SetlistsIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M7 6h14M7 12h14M7 18h14"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
    <Circle cx="3.5" cy="6" r="1.1" fill={color} />
    <Circle cx="3.5" cy="12" r="1.1" fill={color} />
    <Circle cx="3.5" cy="18" r="1.1" fill={color} />
  </Svg>
);

const MatrixIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 5v14M12 5v14M18 5v14" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    <Path d="M4 9h4M10 15h4M16 11h4" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
  </Svg>
);

const DeviceIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 12.55a11 11 0 0114 0"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
    <Path
      d="M8.53 16.11a6 6 0 016.95 0"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
    <Circle cx="12" cy="20" r="1.2" fill={color} />
  </Svg>
);

const TABS: Array<{ key: TabKey; label: string; Icon: typeof FlowIcon }> = [
  { key: 'flow', label: 'Edit', Icon: FlowIcon },
  { key: 'preset', label: 'Presets', Icon: PresetIcon },
  { key: 'setlists', label: 'Library', Icon: SetlistsIcon },
  { key: 'matrix', label: 'Mixer', Icon: MatrixIcon },
  { key: 'settings', label: 'Settings', Icon: DeviceIcon },
];

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange, connected, variant = 'bar' }) => {
  const insets = useSafeAreaInsets();
  const { fontScale } = useWindowDimensions();
  const rail = variant === 'rail';
  return (
    <View accessibilityRole="tablist" style={rail ? styles.rail : [styles.container, { paddingBottom: Math.max(insets.bottom, 6) }]}>
      {TABS.map(({ key, label, Icon }) => {
        const active = activeTab === key;
        const color = active ? COLORS.text : COLORS.muted;
        return (
          <Pressable accessibilityRole="tab" accessibilityState={{ selected: active }} accessibilityLabel={label} accessibilityValue={key === 'settings' ? { text: connected ? 'Connected' : 'Disconnected' } : undefined} key={key} style={rail ? [styles.railTab, active && styles.railTabActive] : [styles.tab, fontScale > 1.5 && { flexBasis: '33%', flexGrow: 1, flexShrink: 0, paddingVertical: 8 }]} onPress={() => onTabChange(key)}>
            <View style={styles.iconWrap} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
              <Icon color={color} size={22} />
              {key === 'settings' && (
                <View
                  style={[
                    styles.connDot,
                    { backgroundColor: connected ? COLORS.signal : COLORS.danger },
                  ]}
                />
              )}
            </View>
            <Text maxFontSizeMultiplier={1.5} style={[styles.label, active && styles.labelActive]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  rail: {
    width: 80,
    paddingTop: 12,
    paddingHorizontal: 8,
    gap: 6,
    backgroundColor: COLORS.bg,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: COLORS.stroke,
  },
  railTab: {
    minHeight: 60,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  railTabActive: {
    backgroundColor: COLORS.control,
  },
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: COLORS.bg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.stroke,
    paddingTop: 10,
  },
  tab: {
    minHeight: 48,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    position: 'relative',
    paddingBottom: 2,
  },
  iconWrap: {
    position: 'relative',
  },
  label: {
    maxWidth: '100%',
    textAlign: 'center',
    color: COLORS.muted,
    ...FONT.body,
    fontSize: 11,
    letterSpacing: 0.1,
  },
  labelActive: {
    color: COLORS.text,
    ...FONT.semibold,
  },
  connDot: {
    position: 'absolute',
    top: -2,
    right: -5,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    borderWidth: 1.5,
    borderColor: COLORS.bg,
  },
});
