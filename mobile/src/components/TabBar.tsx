import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../theme/colors';

export type TabKey = 'flow' | 'preset' | 'setlists' | 'settings';

interface TabBarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  connected: boolean;
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
  { key: 'flow', label: 'Flow', Icon: FlowIcon },
  { key: 'preset', label: 'Preset', Icon: PresetIcon },
  { key: 'setlists', label: 'Setlists', Icon: SetlistsIcon },
  { key: 'settings', label: 'Settings', Icon: DeviceIcon },
];

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange, connected }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {TABS.map(({ key, label, Icon }) => {
        const active = activeTab === key;
        const color = active ? COLORS.accent : COLORS.muted;
        return (
          <Pressable key={key} style={styles.tab} onPress={() => onTabChange(key)}>
            <View style={styles.iconWrap}>
              <Icon color={color} size={22} />
              {key === 'settings' && (
                <View
                  style={[
                    styles.connDot,
                    { backgroundColor: connected ? COLORS.accent : COLORS.danger },
                  ]}
                />
              )}
            </View>
            <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
            {active && <View style={styles.activeBar} />}
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.panel,
    borderTopWidth: 1,
    borderTopColor: COLORS.stroke,
    paddingTop: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    position: 'relative',
  },
  iconWrap: {
    position: 'relative',
  },
  label: {
    color: COLORS.muted,
    fontFamily: FONTS.bodySemi,
    fontSize: 10,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  labelActive: {
    color: COLORS.accent,
  },
  activeBar: {
    position: 'absolute',
    top: -10,
    width: 28,
    height: 2,
    borderRadius: 1,
    backgroundColor: COLORS.accent,
  },
  connDot: {
    position: 'absolute',
    top: -2,
    right: -5,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    borderWidth: 1.5,
    borderColor: COLORS.panel,
  },
});
