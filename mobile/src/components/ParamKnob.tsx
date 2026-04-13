import React, { useRef, useState } from 'react';
import { PanResponder, Pressable, StyleSheet, Text, TextInput, View, Modal } from 'react-native';
import Svg, { Circle, Path, Line } from 'react-native-svg';
import { COLORS, FONTS } from '../theme/colors';

interface ParamKnobProps {
  label: string;
  value: number | boolean;
  min: number;
  max: number;
  unit?: string | null;
  displayMin?: number;
  displayMax?: number;
  options?: string[] | null;
  type: 'i' | 'f' | 'b';
  onChange: (value: number | boolean) => void;
  accentColor?: string;
}

const KNOB_SIZE = 64;
const STROKE_WIDTH = 3.5;
const RADIUS = (KNOB_SIZE - STROKE_WIDTH) / 2;
const CENTER = KNOB_SIZE / 2;
const START_ANGLE = 135;
const END_ANGLE = 405;
const SWEEP = END_ANGLE - START_ANGLE;
const DRAG_SENSITIVITY = 180; // pixels for full min→max sweep

const polarToCartesian = (cx: number, cy: number, r: number, angleDeg: number) => {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

const describeArc = (cx: number, cy: number, r: number, startDeg: number, endDeg: number) => {
  const start = polarToCartesian(cx, cy, r, endDeg);
  const end = polarToCartesian(cx, cy, r, startDeg);
  const largeArcFlag = endDeg - startDeg <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
};

const formatValue = (
  val: number | boolean, min: number, max: number,
  displayMin?: number, displayMax?: number,
  unit?: string | null, type?: 'i' | 'f' | 'b',
  options?: string[] | null,
): string => {
  if (type === 'b') return val ? 'On' : 'Off';
  if (options && options.length) {
    const idx = typeof val === 'boolean' ? (val ? 1 : 0) : Math.round(Number(val)) - min;
    if (idx >= 0 && idx < options.length) return options[idx];
  }
  const numeric = typeof val === 'boolean' ? (val ? 1 : 0) : Number(val);
  if (typeof displayMin === 'number' && typeof displayMax === 'number') {
    const range = max - min;
    const t = range > 0 ? (numeric - min) / range : 0;
    const displayVal = displayMin + t * (displayMax - displayMin);
    const formatted = type === 'i' ? Math.round(displayVal).toString() : displayVal.toFixed(1);
    return unit && unit !== 'unitless' ? `${formatted} ${unit}` : formatted;
  }
  const formatted = type === 'i' ? Math.round(numeric).toString() : numeric.toFixed(1);
  return unit && unit !== 'unitless' ? `${formatted} ${unit}` : formatted;
};

/** Renders the SVG knob arc, needle, and center dot */
const KnobSvg = ({ norm, accent }: { norm: number; accent: string }) => {
  const angle = START_ANGLE + norm * SWEEP;
  const inner = polarToCartesian(CENTER, CENTER, 8, angle);
  const outer = polarToCartesian(CENTER, CENTER, RADIUS - 6, angle);
  return (
    <Svg width={KNOB_SIZE} height={KNOB_SIZE}>
      <Path d={describeArc(CENTER, CENTER, RADIUS, START_ANGLE, END_ANGLE)}
        stroke={COLORS.stroke} strokeWidth={STROKE_WIDTH} fill="none" strokeLinecap="round" />
      {norm > 0.01 && (
        <Path d={describeArc(CENTER, CENTER, RADIUS, START_ANGLE, angle)}
          stroke={accent} strokeWidth={STROKE_WIDTH} fill="none" strokeLinecap="round" />
      )}
      <Circle cx={CENTER} cy={CENTER} r={2} fill={accent} />
      <Line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y}
        stroke="#fff" strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
};

export const ParamKnob: React.FC<ParamKnobProps> = React.memo(({
  label, value, min, max, unit, displayMin, displayMax,
  options, type, onChange, accentColor = COLORS.accent,
}) => {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState('');
  const [dragging, setDragging] = useState(false);

  const numericValue = typeof value === 'boolean' ? (value ? 1 : 0) : Number(value);
  const range = max - min;
  const normalized = range > 0 ? Math.max(0, Math.min(1, (numericValue - min) / range)) : 0;

  // ── Refs for stable PanResponder access ────────────────────────
  const propsRef = useRef({ onChange, min, max, type, normalized, range, numericValue, displayMin, displayMax });
  propsRef.current = { onChange, min, max, type, normalized, range, numericValue, displayMin, displayMax };
  const startNormRef = useRef(0);
  const didDragRef = useRef(false);
  const lastEmittedRef = useRef(numericValue);

  // ── Tap handler (opens numeric edit modal) ─────────────────────
  const openEditModal = () => {
    const { displayMin: dMin, displayMax: dMax, normalized: n, numericValue: nv, type: t } = propsRef.current;
    const rawDisplay = typeof dMin === 'number' && typeof dMax === 'number'
      ? dMin + n * (dMax - dMin)
      : nv;
    setEditText(t === 'i' ? Math.round(rawDisplay).toString() : rawDisplay.toFixed(1));
    setEditing(true);
  };
  const openEditRef = useRef(openEditModal);
  openEditRef.current = openEditModal;

  // ── PanResponder for drag-to-adjust ────────────────────────────
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, { dy }) => Math.abs(dy) > 4,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: () => {
        startNormRef.current = propsRef.current.normalized;
        didDragRef.current = false;
        lastEmittedRef.current = propsRef.current.numericValue;
      },
      onPanResponderMove: (_, { dy }) => {
        if (Math.abs(dy) < 4) return;
        didDragRef.current = true;
        const p = propsRef.current;
        const delta = -dy / DRAG_SENSITIVITY;
        const newNorm = Math.max(0, Math.min(1, startNormRef.current + delta));
        const raw = p.min + newNorm * p.range;
        const clamped = p.type === 'i' ? Math.round(raw) : Math.round(raw * 1000) / 1000;
        const final = Math.max(p.min, Math.min(p.max, clamped));
        // Only emit if value actually changed
        if (final !== lastEmittedRef.current) {
          lastEmittedRef.current = final;
          p.onChange(final);
        }
      },
      onPanResponderRelease: () => {
        if (!didDragRef.current) {
          openEditRef.current();
        }
      },
    })
  ).current;

  // ── Boolean toggle ─────────────────────────────────────────────
  if (type === 'b' && (!options || options.length <= 2)) {
    const isOn = typeof value === 'boolean' ? value : Number(value) > 0;
    const labels = options && options.length === 2 ? options : ['Off', 'On'];
    const angle = isOn ? END_ANGLE : START_ANGLE;
    const inner = polarToCartesian(CENTER, CENTER, 8, angle);
    const outer = polarToCartesian(CENTER, CENTER, RADIUS - 6, angle);
    return (
      <Pressable style={styles.container} onPress={() => onChange(!isOn)}>
        <View style={styles.knobWrap}>
          <Svg width={KNOB_SIZE} height={KNOB_SIZE}>
            <Path d={describeArc(CENTER, CENTER, RADIUS, START_ANGLE, END_ANGLE)}
              stroke={COLORS.stroke} strokeWidth={STROKE_WIDTH} fill="none" strokeLinecap="round" />
            {isOn && (
              <Path d={describeArc(CENTER, CENTER, RADIUS, START_ANGLE, END_ANGLE)}
                stroke={accentColor} strokeWidth={STROKE_WIDTH} fill="none" strokeLinecap="round" />
            )}
            <Circle cx={CENTER} cy={CENTER} r={2} fill={isOn ? accentColor : COLORS.muted} />
            <Line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y}
              stroke={isOn ? '#fff' : COLORS.muted} strokeWidth={2} strokeLinecap="round" />
          </Svg>
        </View>
        <Text style={styles.label} numberOfLines={1}>{label}</Text>
        <Text style={[styles.value, isOn && { color: accentColor }]}>{isOn ? labels[1] : labels[0]}</Text>
      </Pressable>
    );
  }

  // ── Option selector (tap to cycle) ─────────────────────────────
  if (options && options.length) {
    const currentIdx = Math.round(numericValue) - min;
    const displayLabel = currentIdx >= 0 && currentIdx < options.length ? options[currentIdx] : String(numericValue);
    const optNorm = options.length > 1 ? currentIdx / (options.length - 1) : 0;
    return (
      <Pressable
        style={styles.container}
        onPress={() => onChange(min + ((currentIdx + 1) % options.length))}
      >
        <View style={styles.knobWrap}>
          <KnobSvg norm={optNorm} accent={accentColor} />
        </View>
        <Text style={styles.label} numberOfLines={1}>{label}</Text>
        <Text style={[styles.value, { color: accentColor }]} numberOfLines={1}>{displayLabel}</Text>
      </Pressable>
    );
  }

  // ── Numeric knob with drag + tap-to-edit ───────────────────────
  const displayText = formatValue(value, min, max, displayMin, displayMax, unit, type, options);

  const handleEditSubmit = () => {
    const parsed = Number(editText);
    if (Number.isFinite(parsed)) {
      if (typeof displayMin === 'number' && typeof displayMax === 'number') {
        const displayRange = displayMax - displayMin;
        const t = displayRange > 0 ? (parsed - displayMin) / displayRange : 0;
        const raw = min + t * range;
        onChange(Math.max(min, Math.min(max, type === 'i' ? Math.round(raw) : raw)));
      } else {
        onChange(Math.max(min, Math.min(max, type === 'i' ? Math.round(parsed) : parsed)));
      }
    }
    setEditing(false);
  };

  return (
    <>
      <View style={styles.container} {...panResponder.panHandlers}>
        <View style={styles.knobWrap}>
          <KnobSvg norm={normalized} accent={accentColor} />
        </View>
        <Text style={styles.label} numberOfLines={1}>{label}</Text>
        <Text style={[styles.value, { color: accentColor }]} numberOfLines={1}>{displayText}</Text>
      </View>

      {/* Precise edit modal (opens on tap) */}
      <Modal visible={editing} transparent animationType="fade" onRequestClose={() => setEditing(false)}>
        <Pressable style={styles.editBackdrop} onPress={() => setEditing(false)}>
          <View style={styles.editCard} onStartShouldSetResponder={() => true}>
            <Text style={styles.editLabel}>{label}</Text>
            <TextInput
              style={styles.editInput}
              value={editText}
              onChangeText={setEditText}
              keyboardType="numeric"
              autoFocus
              selectTextOnFocus
              onSubmitEditing={handleEditSubmit}
              returnKeyType="done"
            />
            {unit && unit !== 'unitless' && <Text style={styles.editUnit}>{unit}</Text>}
            <View style={styles.editActions}>
              <Pressable style={styles.editCancel} onPress={() => setEditing(false)}>
                <Text style={styles.editCancelText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.editConfirm} onPress={handleEditSubmit}>
                <Text style={styles.editConfirmText}>Set</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 80,
    gap: 4,
  },
  knobWrap: {
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: COLORS.muted,
    fontFamily: FONTS.bodySemi,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    textAlign: 'center',
  },
  value: {
    color: COLORS.text,
    fontFamily: FONTS.light,
    fontSize: 11,
    textAlign: 'center',
  },
  editBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editCard: {
    backgroundColor: COLORS.panel,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    padding: 24,
    width: 240,
    alignItems: 'center',
    gap: 12,
  },
  editLabel: {
    color: COLORS.muted,
    fontFamily: FONTS.bodySemi,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  editInput: {
    width: '100%',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.accent,
    backgroundColor: COLORS.panelAlt,
    color: COLORS.text,
    fontFamily: FONTS.mono,
    fontSize: 20,
    textAlign: 'center',
  },
  editUnit: {
    color: COLORS.muted,
    fontFamily: FONTS.mono,
    fontSize: 12,
  },
  editActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  editCancel: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    alignItems: 'center',
  },
  editCancelText: {
    color: COLORS.muted,
    fontFamily: FONTS.bodySemi,
    fontSize: 14,
  },
  editConfirm: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
  },
  editConfirmText: {
    color: COLORS.bg,
    fontFamily: FONTS.bodySemi,
    fontSize: 14,
  },
});
