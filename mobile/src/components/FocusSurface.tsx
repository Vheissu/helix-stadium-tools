import React, { useRef, useState } from 'react';
import { Image, StyleSheet, View, type GestureResponderEvent } from 'react-native';
import Svg, { Line, Polygon } from 'react-native-svg';
import { AccessibleText as Text } from '../accessibility/AccessibleText';
import { Action } from '../accessibility/controls';
import { COLORS, colorWithAlpha, getBlockColor } from '../theme/colors';
import type { FocusPoint } from '../utils/focus';

// Original artwork, generated for HELYON. Prompts live beside the bundled assets.
const ARTWORK = {
  pedal: require('../../assets/focus/pedal-v1.png'),
  amplifier: require('../../assets/focus/amplifier-v1.png'),
  cabinet: require('../../assets/focus/cabinet-v1.png'),
};
const POINT_LABELS = ['centre', 'bottom left', 'top left', 'bottom right', 'top right'];
const POSITIONS = [
  { left: '22%', right: '22%', top: '50%' },
  { left: 14, right: '54%', bottom: 16 },
  { left: 14, right: '54%', top: 16 },
  { left: '54%', right: 14, bottom: 16 },
  { left: '54%', right: 14, top: 16 },
] as const;

interface Props {
  category: string; cabinet: boolean; names?: readonly string[];
  point: FocusPoint; positioned: boolean; selected: number | null;
  disabled: boolean; height: number;
  onMove: (point: FocusPoint) => void; onSelect: (index: number) => void;
  onDrag: (dragging: boolean) => void;
}

/** Labels are real controls above the gesture surface, never baked into the image. */
export function FocusSurface({ category, cabinet, names, point, positioned, selected, disabled, height, onMove, onSelect, onDrag }: Props) {
  const [size, setSize] = useState({ width: 1, height: 1 });
  const origin = useRef({ x: 0, y: 0 });
  const accent = getBlockColor(category);
  const artwork = cabinet ? ARTWORK.cabinet : category === 'amp' || category === 'preamp' ? ARTWORK.amplifier : ARTWORK.pedal;
  const touch = (event: GestureResponderEvent) => onMove({
    x: (event.nativeEvent.pageX - origin.current.x) / size.width * 2 - 1,
    y: 1 - (event.nativeEvent.pageY - origin.current.y) / size.height * 2,
  });
  return <View style={[styles.surface, { height }, disabled && styles.disabled]} onLayout={({ nativeEvent }) => setSize(nativeEvent.layout)}>
    <Image accessible={false} source={artwork} resizeMode="cover" style={[StyleSheet.absoluteFill, { width: '100%', height: '100%' }]} />
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.shade]} />
    <Svg pointerEvents="none" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={StyleSheet.absoluteFill}>
      {!cabinet && <>
        <Polygon points="0,0 100,0 50,50" fill={colorWithAlpha(accent, 0.035)} />
        <Polygon points="0,100 100,100 50,50" fill={colorWithAlpha(accent, 0.07)} />
        <Line x1={0} y1={0} x2={100} y2={100} stroke="rgba(255,255,255,0.18)" strokeWidth={0.2} />
        <Line x1={0} y1={100} x2={100} y2={0} stroke="rgba(255,255,255,0.18)" strokeWidth={0.2} />
      </>}
      <Line x1={50} y1={0} x2={50} y2={100} stroke="rgba(255,255,255,0.12)" strokeWidth={0.2} strokeDasharray="1 2" />
      <Line x1={0} y1={50} x2={100} y2={50} stroke="rgba(255,255,255,0.12)" strokeWidth={0.2} strokeDasharray="1 2" />
    </Svg>
    <View accessible={false} style={StyleSheet.absoluteFill}
      onStartShouldSetResponder={() => !disabled} onMoveShouldSetResponder={() => !disabled}
      onResponderGrant={event => {
        const { pageX, pageY, locationX, locationY } = event.nativeEvent;
        origin.current = { x: pageX - locationX, y: pageY - locationY };
        onDrag(true); touch(event);
      }}
      onResponderMove={touch} onResponderRelease={event => { touch(event); onDrag(false); }}
      onResponderTerminate={() => onDrag(false)} onResponderTerminationRequest={() => false} />
    {positioned && <View pointerEvents="none" style={[styles.cursor, { borderColor: accent,
      left: Math.max(2, Math.min(size.width - 38, (point.x + 1) / 2 * size.width - 18)),
      top: Math.max(2, Math.min(size.height - 38, (1 - point.y) / 2 * size.height - 18)),
    }]}><View style={styles.cursorDot} /></View>}
    {names && [2, 4, 0, 1, 3].map(index => <Action key={index} disabled={disabled}
      accessibilityLabel={`${names[index]}, ${POINT_LABELS[index]} Focus point`}
      accessibilityState={{ selected: positioned && selected === index }}
      onPress={() => onSelect(index)} style={({ pressed }) => [styles.tone, POSITIONS[index],
        (pressed || selected === index && positioned) && { backgroundColor: '#191b20', borderColor: accent }]}>
      <View style={[styles.toneDot, { backgroundColor: positioned && selected === index ? accent : '#bcbdbf' }]} />
      <Text style={styles.toneName}>{names[index]}</Text>
    </Action>)}
    {cabinet && <View pointerEvents="none" style={styles.cabLabels}>
      <Text style={styles.axis}>Far</Text><View style={styles.axisRow}><Text style={styles.axis}>Centre</Text><Text style={styles.axis}>Edge</Text></View><Text style={styles.axis}>Near</Text>
    </View>}
  </View>;
}
const styles = StyleSheet.create({
  surface: { overflow: 'hidden', borderRadius: 12, borderWidth: 1, borderColor: '#33353b', backgroundColor: COLORS.panel },
  shade: { backgroundColor: 'rgba(5,7,10,0.25)' }, disabled: { opacity: 0.5 },
  tone: { position: 'absolute', paddingHorizontal: 10, paddingVertical: 10, gap: 7,
    borderRadius: 6, borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)', backgroundColor: 'rgba(8,10,14,0.86)' },
  toneName: { fontSize: 16, lineHeight: 20, fontWeight: '600', color: '#f8f7f3' },
  toneDot: { width: 5, height: 5, borderRadius: 3 },
  cursor: { position: 'absolute', width: 36, height: 36, borderRadius: 18, borderWidth: 2,
    backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' },
  cursorDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: '#fff' },
  cabLabels: { ...StyleSheet.absoluteFill, padding: 16, justifyContent: 'space-between', alignItems: 'center' },
  axisRow: { width: '100%', flexDirection: 'row', justifyContent: 'space-between' },
  axis: { color: '#fff', fontSize: 16, fontWeight: '600', backgroundColor: 'rgba(8,10,14,0.86)', padding: 8, borderRadius: 4 },
});
