import { useAccessibilityPreferences } from '../accessibility/AccessibilityPreferences';
import { AccessibleText as Text } from '../accessibility/AccessibleText';
import { Action as Pressable } from '../accessibility/controls';
import { AccessibilitySettings } from '../accessibility/controls';
import React, { useEffect, useRef } from 'react';
import {
  AccessibilityInfo,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import Svg, { Rect, Circle } from 'react-native-svg';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { AppInfo } from './AppInfo';
import { StadiumSearch } from './StadiumSearch';
import type { StadiumDevice } from '../utils/stadiumDiscovery';
import appConfig from '../../app.json';
import { COLORS, FONTS } from '../theme/colors';
import { getConnectionErrorMessage } from '../utils/connection';
import {
  getConnectionHint,
  type ConnectionTransport,
} from '../utils/connectionTransport';

interface ConnectionGateProps {
  host: string;
  port: number;
  onHostChange: (value: string) => void;
  onDeviceSelect: (device: StadiumDevice) => void;
  transport: ConnectionTransport;
  onTransportChange: (value: ConnectionTransport) => void;
  onConnect: () => void;
  onPreview: () => void;
  connecting: boolean;
  status: string;
}

const DeviceMark = ({ pulse }: { pulse: boolean }) => {
  const opacity = useRef(new Animated.Value(pulse ? 0.45 : 1)).current;

  useEffect(() => {
    if (!pulse) {
      opacity.setValue(1);
      return;
    }
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.45,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
    let disposed = false;
    const updateMotion = (reduce: boolean) => {
      anim.stop();
      opacity.setValue(1);
      if (!reduce && !disposed) anim.start();
    };
    void AccessibilityInfo.isReduceMotionEnabled().then(updateMotion);
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', updateMotion);
    return () => { disposed = true; anim.stop(); subscription.remove(); };
  }, [pulse, opacity]);

  return (
    <View style={styles.deviceMark} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <Svg width={120} height={48} viewBox="0 0 120 48">
        <Rect x="2" y="6" width="116" height="36" rx="6" stroke={COLORS.stroke} strokeWidth={1} fill={COLORS.panel} />
        <Rect x="14" y="14" width="44" height="20" rx="3" fill={COLORS.bg} stroke={COLORS.stroke} strokeWidth={0.75} />
        <Circle cx="74" cy="24" r="3" fill={COLORS.muted} />
        <Circle cx="86" cy="24" r="3" fill={COLORS.muted} />
        <Circle cx="98" cy="24" r="3" fill={COLORS.muted} />
        <Circle cx="110" cy="24" r="3" fill={COLORS.muted} />
      </Svg>
      <Animated.View style={[styles.deviceDot, { opacity }]} />
    </View>
  );
};

const SpinnerDot = () => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    animation.start();
    return () => animation.stop();
  }, [rotation]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]}>
      <View style={styles.spinnerDot} />
    </Animated.View>
  );
};

export const ConnectionGate: React.FC<ConnectionGateProps> = ({
  host,
  port,
  onHostChange,
  onDeviceSelect,
  transport,
  onTransportChange,
  onConnect,
  onPreview,
  connecting,
  status,
}) => {
  const { accessibleLayout, screenReader } = useAccessibilityPreferences();
  const { fontScale } = useWindowDimensions();
  const stackChoices = accessibleLayout || screenReader || fontScale > 1.3;
  const errorMessage = getConnectionErrorMessage(status);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.spacer} />

          <DeviceMark pulse={!connecting} />

          <Text accessibilityRole="header" style={styles.title}>{appConfig.expo.name}</Text>
          <Text style={styles.subtitle}>
            Unofficial mobile editor for the Helix Stadium
          </Text>

          <View style={styles.form}>
            <View style={styles.transportWrap}>
              <Text style={styles.inputLabel}>Connection</Text>
              <View style={[styles.transportRow, stackChoices && { flexDirection: 'column' }]}>
                {(['auto', 'usb', 'wifi'] as const).map((option) => {
                  const selected = transport === option;
                  const label = option === 'auto' ? 'Automatic' : option === 'usb' ? 'USB' : 'Wi-Fi';
                  return (
                    <Pressable
                      key={option}
                      style={[styles.transportButton, selected && styles.transportButtonSelected, stackChoices && { flex: 0, alignSelf: 'stretch' }]}
                      onPress={() => onTransportChange(option)}
                      disabled={connecting}
                      accessibilityRole="button"
                      accessibilityState={{ selected, disabled: connecting }}
                    >
                      <Text style={[styles.transportText, selected && styles.transportTextSelected]}>
                        {label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {!(Platform.OS === 'android' && transport === 'usb') && <>
            <StadiumSearch host={host} port={port} disabled={connecting} onSelect={onDeviceSelect} />
            <View style={styles.inputWrap}>
              <Text style={styles.inputLabel}>Or enter a device name or IP address</Text>
              <TextInput
                accessibilityLabel="Device name or IP address"
                style={styles.input}
                value={host}
                onChangeText={onHostChange}
                placeholder="Device name or IP address"
                placeholderTextColor={COLORS.muted}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!connecting}
                returnKeyType="go"
                onSubmitEditing={onConnect}
              />
              <Text style={styles.addressHint}>
                On your Stadium, open Menu → Wi-Fi. The IP address is at the bottom of the right sidebar once connected.
              </Text>
            </View></>}

            <Text style={styles.addressHint}>
              Set Global Settings → Preferences → Remote Access to Allow on your Stadium.
            </Text>

            <Pressable
              accessibilityRole="button"
              accessibilityState={{ disabled: connecting }}
              style={[styles.connectBtn, connecting && styles.connectBtnDisabled]}
              onPress={onConnect}
              disabled={connecting}
            >
              {connecting ? (
                <View style={styles.connectingRow}>
                  <SpinnerDot />
                  <Text style={styles.connectBtnText}>Connecting</Text>
                </View>
              ) : (
                <Text style={styles.connectBtnText}>Connect</Text>
              )}
            </Pressable>

            {errorMessage && (
              <View style={styles.errorRow}>
                <View style={styles.errorDot} />
                <Text accessibilityRole="alert" style={styles.errorText}>{errorMessage}</Text>
              </View>
            )}
          </View>

          <Pressable style={styles.previewButton} accessibilityRole="button" disabled={connecting} onPress={onPreview}>
            <Text style={styles.transportText}>Try offline preview</Text>
          </Pressable>
          <View style={styles.bottomInfo}>
            <Text style={styles.hint}>
              {getConnectionHint(transport)}
            </Text>
            <AccessibilitySettings />
          <AppInfo />
          </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContent: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: 560, alignSelf: 'center' },
  previewButton: { minHeight: 48, justifyContent: 'center', marginTop: 12 },
  spacer: {
    flex: 1,
    minHeight: 20,
  },

  deviceMark: {
    width: 120,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  deviceDot: {
    position: 'absolute',
    top: 14,
    right: 30,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.signal,
  },

  title: {
    fontSize: 26,
    color: COLORS.text,
    fontFamily: FONTS.display,
    letterSpacing: 0.1,
    marginBottom: 6,
  },
  subtitle: {
    color: COLORS.muted,
    fontFamily: FONTS.body,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },

  form: {
    width: '100%',
    gap: 14,
  },
  inputWrap: {
    gap: 6,
  },
  transportWrap: {
    gap: 8,
  },
  transportRow: {
    flexDirection: 'row',
    gap: 8,
  },
  transportButton: {
    flex: 1,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    backgroundColor: COLORS.panel,
  },
  transportButtonSelected: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.accent,
  },
  transportText: {
    color: COLORS.muted,
    fontFamily: FONTS.bodySemi,
    fontSize: 13,
  },
  transportTextSelected: {
    color: COLORS.bg,
  },
  inputLabel: {
    color: COLORS.muted,
    fontFamily: FONTS.body,
    fontSize: 13,
  },
  addressHint: {
    color: COLORS.muted,
    fontFamily: FONTS.body,
    fontSize: 14,
    lineHeight: 20,
  },
  input: {
    padding: 14,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    color: COLORS.text,
    fontFamily: FONTS.mono,
    fontSize: 16,
    backgroundColor: COLORS.panel,
  },
  connectBtn: {
    paddingVertical: 16,
    borderRadius: 4,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectBtnDisabled: {
    opacity: 0.7,
  },
  connectBtnText: {
    color: COLORS.bg,
    fontFamily: FONTS.bodySemi,
    fontSize: 16,
    letterSpacing: 0.1,
  },
  connectingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  spinner: {
    width: 18,
    height: 18,
  },
  spinnerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.bg,
  },

  errorRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingHorizontal: 4,
  },
  errorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.danger,
    marginTop: 6,
  },
  errorText: {
    color: COLORS.danger,
    fontFamily: FONTS.body,
    fontSize: 13,
    lineHeight: 18,
    flex: 1,
  },

  bottomInfo: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 24,
    minHeight: 80,
  },
  hint: {
    color: COLORS.muted,
    fontFamily: FONTS.body,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 12,
  },
});
