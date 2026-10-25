import React, { useRef, useState } from 'react';
import { Image, StyleSheet, View, type GestureResponderEvent, type ViewInstance } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { AccessibleText as Text } from '../accessibility/AccessibleText';
import { Action } from '../accessibility/controls';
import { COLORS, FONT, colorWithAlpha, getBlockColor } from '../theme/colors';
import { FOCUS_POINTS, focusWeights, type FocusPoint } from '../utils/focus';
import { FOCUS_INSET, focusPointAtPosition, focusSurfacePosition } from '../utils/focusSurfaceLayout';

// Original artwork, generated for HELYON. Prompts live beside the bundled assets.
const ARTWORK = {
  pedal: require('../../assets/focus/pedal-v1.png'),
  amplifier: require('../../assets/focus/amplifier-v1.png'),
  cabinet: require('../../assets/focus/cabinet-v1.png'),
};
const POINT_LABELS = ['centre', 'bottom left', 'top left', 'bottom right', 'top right'];

interface Props {
  category: string; cabinet: boolean; names?: readonly string[];
  point: FocusPoint; positioned: boolean; selected: number | null;
  disabled: boolean; height: number;
  onMove: (point: FocusPoint) => void; onSelect: (index: number) => void;
  onDrag: (dragging: boolean) => void;
}

/** Tone markers retain real touch targets while leaving the blend surface open. */
export function FocusSurface({ category, cabinet, names, point, positioned, selected, disabled, height, onMove, onSelect, onDrag }: Props) {
  const [size, setSize] = useState({ width: 320, height });
  const surface = useRef<ViewInstance>(null);
  const touchStart = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const markerMoved = useRef(false);
  const origin = useRef({ x: 0, y: 0 });
  const accent = getBlockColor(category);
  const artwork = cabinet ? ARTWORK.cabinet : category === 'amp' || category === 'preamp' ? ARTWORK.amplifier : ARTWORK.pedal;
  const position = focusSurfacePosition(point, size.width, size.height);
  const weights = positioned && !cabinet ? focusWeights(point) : [];
  const touch = (event: GestureResponderEvent) => onMove(focusPointAtPosition(
    event.nativeEvent.pageX - origin.current.x, event.nativeEvent.pageY - origin.current.y, size.width, size.height));
  const right = size.width - FOCUS_INSET, bottom = size.height - FOCUS_INSET;
  const compactMarkers = size.width < 520;
  return <View ref={surface} style={[styles.surface, { height: compactMarkers ? Math.max(400, height) : height }, disabled && styles.disabled]}
    onLayout={({ nativeEvent }) => setSize(nativeEvent.layout)}
    onStartShouldSetResponderCapture={event => {
      touchStart.current = { x: event.nativeEvent.pageX, y: event.nativeEvent.pageY };
      surface.current?.measureInWindow((x, y) => { origin.current = { x, y }; });
      return false;
    }}
    onStartShouldSetResponder={() => !disabled}
    onMoveShouldSetResponderCapture={event => !disabled && Math.hypot(
      event.nativeEvent.pageX - touchStart.current.x, event.nativeEvent.pageY - touchStart.current.y) > 6}
    onResponderGrant={event => {
      dragging.current = true; onDrag(true);
      const { pageX, pageY } = event.nativeEvent;
      surface.current?.measureInWindow((x, y) => {
        origin.current = { x, y };
        if (dragging.current) onMove(focusPointAtPosition(pageX - x, pageY - y, size.width, size.height));
      });
    }}
    onResponderMove={touch}
    onResponderRelease={event => { dragging.current = false; touch(event); onDrag(false); }}
    onResponderTerminate={() => { dragging.current = false; onDrag(false); }}
    onResponderTerminationRequest={() => false}>
    <Image pointerEvents="none" accessible={false} source={artwork} resizeMode="cover" style={[StyleSheet.absoluteFill, { width: '100%', height: '100%' }]} />
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.shade]} />
    <Svg pointerEvents="none" width="100%" height="100%" viewBox={`0 0 ${size.width} ${size.height}`} style={StyleSheet.absoluteFill}>
      {!cabinet && FOCUS_POINTS.slice(1).map((p, index) => {
        const end = focusSurfacePosition(p, size.width, size.height);
        return <Line key={index} x1={size.width / 2} y1={size.height / 2} x2={end.x} y2={end.y} stroke="rgba(236,233,225,0.16)" strokeWidth={1} />;
      })}
      <Line x1={size.width / 2} y1={FOCUS_INSET} x2={size.width / 2} y2={bottom} stroke="rgba(236,233,225,0.10)" strokeWidth={1} strokeDasharray="2 6" />
      <Line x1={FOCUS_INSET} y1={size.height / 2} x2={right} y2={size.height / 2} stroke="rgba(236,233,225,0.10)" strokeWidth={1} strokeDasharray="2 6" />
      {selected === null && weights.filter(weight => weight.weight > 0.01).map(weight => {
        const end = focusSurfacePosition(FOCUS_POINTS[weight.region], size.width, size.height);
        return <Line key={weight.region} x1={position.x} y1={position.y} x2={end.x} y2={end.y}
          stroke={colorWithAlpha(accent, 0.15 + weight.weight * 0.45)} strokeWidth={1.5} />;
      })}
    </Svg>
    {names && [2, 4, 0, 1, 3].map(index => {
      const active = positioned && selected === index;
      const top = index === 2 || index === 4;
      const end = index === 3 || index === 4;
      const centre = index === 0;
      const influence = weights.find(weight => weight.region === index)?.weight ?? 0;
      return <View key={index} pointerEvents="box-none" style={centre ? { position: 'absolute', left: 0, right: 0, top: size.height / 2 - 24, alignItems: 'center' } : StyleSheet.absoluteFill}><Action disabled={disabled}
        accessibilityLabel={`${names[index]}, ${POINT_LABELS[index]} Focus point`}
        accessibilityHint="Select this tone. Use Adjust precisely for X and Y controls."
        accessibilityState={{ selected: active }} onPress={() => { if (!markerMoved.current) onSelect(index); }}
        onPressIn={() => { markerMoved.current = false; onDrag(true); }}
        onPressOut={() => { if (!dragging.current) onDrag(false); }}
        onTouchMove={event => {
          if (disabled || dragging.current) return;
          if (Math.hypot(event.nativeEvent.pageX - touchStart.current.x, event.nativeEvent.pageY - touchStart.current.y) <= 6) return;
          markerMoved.current = true; onDrag(true); touch(event);
        }}
        onTouchEnd={event => {
          // Some input sources coalesce a drag into start/end events. Preserve its final position.
          if (!disabled && !dragging.current && Math.hypot(event.nativeEvent.pageX - touchStart.current.x,
            event.nativeEvent.pageY - touchStart.current.y) > 6) { markerMoved.current = true; touch(event); }
          if (!dragging.current) onDrag(false);
        }}
        onTouchCancel={() => { if (!dragging.current) onDrag(false); }}
        style={({ pressed }) => [styles.tone, centre ? { position: 'relative', maxWidth: size.width * 0.6, alignItems: 'center' }
          : { maxWidth: size.width / 2 - 24, ...(top ? { top: FOCUS_INSET - 24, alignItems: 'flex-start' } : { bottom: FOCUS_INSET - 24, alignItems: 'flex-end' }),
            ...(end ? { right: FOCUS_INSET - 24, flexDirection: 'row-reverse' } : { left: FOCUS_INSET - 24, flexDirection: 'row' }),
            ...(compactMarkers ? { flexDirection: top ? 'column' : 'column-reverse', alignItems: end ? 'flex-end' : 'flex-start' } : {}) },
          pressed && styles.pressed]}>
        <View style={styles.markerTarget}>
          <View style={[styles.marker, { borderColor: active ? accent : colorWithAlpha(COLORS.text, 0.6),
            backgroundColor: active ? accent : COLORS.bg }, influence > 0 && !active && { borderColor: colorWithAlpha(accent, 0.5 + influence * 0.5) }]}>
            <View style={[styles.markerDot, active && styles.markerDotActive]} />
          </View>
          {active && <View pointerEvents="none" style={[styles.selectedRing, { borderColor: colorWithAlpha(accent, 0.55) }]} />}
        </View>
        <View style={[styles.label, centre ? styles.centreLabel : compactMarkers ? styles.compactLabel : styles.cornerLabel, active && styles.labelSelected]}>
          <Text numberOfLines={centre ? 1 : 2} maxFontSizeMultiplier={1.2} style={[styles.toneName, active && styles.toneNameSelected]}>{names[index]}</Text>
        </View>
      </Action></View>;
    })}
    {positioned && (cabinet || selected === null) && <View pointerEvents="none" style={[styles.cursor, {
      borderColor: accent, left: position.x - 19, top: position.y - 19,
    }]}><View style={styles.cursorInner}><View style={[styles.cursorDot, { backgroundColor: accent }]} /></View></View>}
    {cabinet && <View pointerEvents="none" style={styles.cabLabels}>
      <Text style={styles.axis}>Far</Text><View style={styles.axisRow}><Text style={styles.axis}>Centre</Text><Text style={styles.axis}>Edge</Text></View><Text style={styles.axis}>Near</Text>
    </View>}
  </View>;
}
const styles = StyleSheet.create({
  surface: { overflow: 'hidden', borderRadius: 16, borderWidth: StyleSheet.hairlineWidth, borderColor: COLORS.stroke, backgroundColor: COLORS.panel },
  shade: { backgroundColor: 'rgba(5,7,10,0.42)' }, disabled: { opacity: 0.5 },
  tone: { position: 'absolute', gap: 0 }, pressed: { opacity: 0.85 },
  markerTarget: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  marker: { width: 26, height: 26, borderRadius: 13, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  markerDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: COLORS.text },
  markerDotActive: { width: 7, height: 7, borderRadius: 4, backgroundColor: COLORS.bg },
  selectedRing: { position: 'absolute', width: 38, height: 38, borderRadius: 19, borderWidth: 1 },
  label: { backgroundColor: 'rgba(10,10,12,0.78)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, flexShrink: 1 },
  cornerLabel: { marginVertical: 8 }, compactLabel: { marginVertical: 2 }, centreLabel: { marginTop: 2 },
  labelSelected: { backgroundColor: COLORS.text },
  toneName: { fontSize: 15, lineHeight: 20, ...FONT.medium, color: COLORS.text, flexShrink: 1 },
  toneNameSelected: { color: COLORS.bg, ...FONT.semibold },
  cursor: { position: 'absolute', width: 38, height: 38, borderRadius: 19, borderWidth: 2,
    backgroundColor: 'rgba(10,10,12,0.7)', alignItems: 'center', justifyContent: 'center' },
  cursorInner: { width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: COLORS.text, alignItems: 'center', justifyContent: 'center' },
  cursorDot: { width: 6, height: 6, borderRadius: 3 },
  cabLabels: { ...StyleSheet.absoluteFill, padding: 12, justifyContent: 'space-between', alignItems: 'center' },
  axisRow: { width: '100%', flexDirection: 'row', justifyContent: 'space-between' },
  axis: { color: COLORS.text, fontSize: 15, ...FONT.medium, backgroundColor: 'rgba(10,10,12,0.78)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
});
