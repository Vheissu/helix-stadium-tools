import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, AppState, Easing, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '../theme/colors';
import { MOTION } from '../theme/motion';

/** The existing launch emblem, with its original proportions and colours. */
export function BrandMark({ size = 48, active = false }: { size?: number; active?: boolean }) {
  const opacity = useRef(new Animated.Value(1)).current;
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [foreground, setForeground] = useState(AppState.currentState === 'active');
  useEffect(() => {
    let mounted = true;
    let receivedEvent = false;
    const motion = AccessibilityInfo.addEventListener('reduceMotionChanged', reduced => {
      receivedEvent = true;
      setMotionAllowed(!reduced);
    });
    void AccessibilityInfo.isReduceMotionEnabled().then(reduced => {
      if (mounted && !receivedEvent) setMotionAllowed(!reduced);
    }).catch(() => {});
    const state = AppState.addEventListener('change', value => setForeground(value === 'active'));
    return () => { mounted = false; motion.remove(); state.remove(); };
  }, []);
  useEffect(() => {
    opacity.setValue(1);
    if (!active || !motionAllowed || !foreground) return;
    const pulse = Animated.loop(Animated.sequence([
      Animated.timing(opacity, { toValue: 0.45, duration: MOTION.activity, easing: Easing.inOut(Easing.quad), useNativeDriver: true, isInteraction: false }),
      Animated.timing(opacity, { toValue: 1, duration: MOTION.activity, easing: Easing.inOut(Easing.quad), useNativeDriver: true, isInteraction: false }),
    ]));
    pulse.start();
    return () => { pulse.stop(); opacity.setValue(1); };
  }, [active, foreground, motionAllowed, opacity]);
  const height = size * 1.25;
  return <View style={{ width: size, height }} accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
    <Svg width={size} height={height} viewBox="240 170 544 680">
      <Path fill={COLORS.text} d="M248 256 363 183V372L775 599V768L661 843V662L250 456Z" />
    </Svg>
    <Animated.View style={{ position: 'absolute', inset: 0, opacity }}>
      <Svg width={size} height={height} viewBox="240 170 544 680">
        <Path fill={COLORS.brand} d="M659 249 776 177V455L674 511 531 437 660 369Z" />
        <Path fill={COLORS.brand} d="M249 563 328 517 476 598 362 671V771L249 842Z" />
      </Svg>
    </Animated.View>
  </View>;
}
