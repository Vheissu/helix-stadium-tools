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
import Svg, { Rect, Circle } from 'react-native-svg';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../theme/colors';
import { getConnectionErrorMessage } from '../utils/connection';

interface ConnectionGateProps {
  host: string;
  onHostChange: (value: string) => void;
  onConnect: () => void;
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
    anim.start();
    return () => anim.stop();
  }, [pulse, opacity]);

  return (
    <View style={styles.deviceMark}>
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
  const errorMessage = getConnectionErrorMessage(status);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.spacer} />

          <DeviceMark pulse={!connecting} />

          <Text style={styles.title}>Helix Stadium</Text>
          <Text style={styles.subtitle}>
            Edit and control your device over Wi-Fi.
          </Text>

          <View style={styles.form}>
            <View style={styles.inputWrap}>
              <Text style={styles.inputLabel}>Device address</Text>
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

            {errorMessage && (
              <View style={styles.errorRow}>
                <View style={styles.errorDot} />
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            )}
          </View>

          <View style={styles.bottomInfo}>
            <Text style={styles.hint}>
              Same Wi-Fi network. Remote Access on.
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

  deviceMark: {
    width: 120,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 36,
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
    marginBottom: 36,
  },

  form: {
    width: '100%',
    gap: 14,
  },
  inputWrap: {
    gap: 6,
  },
  inputLabel: {
    color: COLORS.muted,
    fontFamily: FONTS.body,
    fontSize: 13,
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
