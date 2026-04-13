import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../theme/colors';

interface ConnectionGateProps {
  host: string;
  onHostChange: (value: string) => void;
  onConnect: () => void;
  connecting: boolean;
  status: string;
}

const PulseRing = ({ delay, size }: { delay: number; size: number }) => {
  const scale = useRef(new Animated.Value(0.6)).current;
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1,
            duration: 2400,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 2400,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scale, { toValue: 0.6, duration: 0, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0.5, duration: 0, useNativeDriver: true }),
        ]),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [delay, scale, opacity]);

  return (
    <Animated.View
      style={[
        styles.pulseRing,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          transform: [{ scale }],
          opacity,
        },
      ]}
    />
  );
};

const WifiIcon = ({ size, color }: { size: number; color: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M2 8.82a15 15 0 0120 0"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
    <Path
      d="M5 12.86a11 11 0 0114 0"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
    <Path
      d="M8.5 16.43a6 6 0 017 0"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
    <Circle cx="12" cy="20" r="1.5" fill={color} />
  </Svg>
);

const SpinnerDot = () => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
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
  onHostChange,
  onConnect,
  connecting,
  status,
}) => {
  const hasError = status.startsWith('Connection failed');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {/* Top spacer */}
          <View style={styles.spacer} />

          {/* Icon area with pulse rings */}
          <View style={styles.iconArea}>
            <PulseRing delay={0} size={160} />
            <PulseRing delay={800} size={160} />
            <PulseRing delay={1600} size={160} />
            <View style={styles.iconCircle}>
              <WifiIcon size={36} color={COLORS.accent} />
            </View>
          </View>

          {/* Branding */}
          <Text style={styles.title}>Stadium Remote</Text>
          <Text style={styles.subtitle}>
            Connect to your Helix Stadium to get started
          </Text>

          {/* Connection form */}
          <View style={styles.form}>
            <View style={styles.inputWrap}>
              <Text style={styles.inputLabel}>DEVICE ADDRESS</Text>
              <TextInput
                style={styles.input}
                value={host}
                onChangeText={onHostChange}
                placeholder="p35x1.local or IP address"
                placeholderTextColor={COLORS.muted}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!connecting}
                returnKeyType="go"
                onSubmitEditing={onConnect}
              />
            </View>

            <Pressable
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

            {/* Status message */}
            {hasError && (
              <View style={styles.errorRow}>
                <View style={styles.errorDot} />
                <Text style={styles.errorText}>
                  {status.replace('Connection failed: ', '')}
                </Text>
              </View>
            )}
          </View>

          {/* Bottom info */}
          <View style={styles.bottomInfo}>
            <Text style={styles.hint}>
              Make sure your device is on the same Wi-Fi network{'\n'}
              and Remote Access is enabled
            </Text>
          </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  spacer: {
    flex: 1,
    minHeight: 20,
  },

  /* Icon area */
  iconArea: {
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  pulseRing: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.accentDim,
    borderWidth: 1,
    borderColor: COLORS.accentMid,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Branding */
  title: {
    fontSize: 28,
    color: COLORS.text,
    fontFamily: FONTS.display,
    letterSpacing: 1,
    marginBottom: 10,
  },
  subtitle: {
    color: COLORS.muted,
    fontFamily: FONTS.body,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
  },

  /* Form */
  form: {
    width: '100%',
    gap: 16,
  },
  inputWrap: {
    gap: 8,
  },
  inputLabel: {
    color: COLORS.muted,
    fontFamily: FONTS.mono,
    fontSize: 10,
    letterSpacing: 2,
  },
  input: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    color: COLORS.text,
    fontFamily: FONTS.mono,
    fontSize: 16,
    backgroundColor: COLORS.panel,
  },
  connectBtn: {
    paddingVertical: 18,
    borderRadius: 14,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectBtnDisabled: {
    opacity: 0.7,
  },
  connectBtnText: {
    color: COLORS.bg,
    fontFamily: FONTS.display,
    fontSize: 16,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  connectingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  /* Spinner */
  spinner: {
    width: 20,
    height: 20,
  },
  spinnerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.bg,
  },

  /* Error */
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 4,
  },
  errorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.danger,
  },
  errorText: {
    color: COLORS.danger,
    fontFamily: FONTS.mono,
    fontSize: 13,
    flex: 1,
  },

  /* Bottom info */
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
    opacity: 0.6,
    marginBottom: 12,
  },
});
