import React, { useCallback, useRef, useState } from 'react';
import { PanResponder, Pressable, StyleSheet, Text, TextInput, View, Modal } from 'react-native';
import Svg, { Circle, Path, Line, Defs, RadialGradient, Stop } from 'react-native-svg';
import { COLORS, FONTS, colorWithAlpha } from '../theme/colors';
import { formatParamValue } from '../utils/paramFormat';

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
  /** Notifies parent when a drag starts/ends so it can lock its ScrollView. */
  onDragChange?: (dragging: boolean) => void;
  /** Optional help-icon adornment rendered next to the knob label. */
  helpAdornment?: React.ReactNode;
}

const KNOB_SIZE = 68;
const STROKE_WIDTH = 4;
const RADIUS = (KNOB_SIZE - STROKE_WIDTH) / 2;
const CENTER = KNOB_SIZE / 2;
const FACE_RADIUS = RADIUS - 6;
const TICK_INNER = FACE_RADIUS - 12;
const TICK_OUTER = FACE_RADIUS - 2;
const START_ANGLE = 135;
const END_ANGLE = 405;
const SWEEP = END_ANGLE - START_ANGLE;
const NUMERIC_DRAG_PX = 180; // pixels for full min→max sweep on numeric knobs
const OPTION_STEP_PX = 32;   // pixels per option step on option/list knobs

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


interface KnobBodyProps {
  norm: number;
  accent: string;
  active?: boolean;
}

/**
 * Renders the knob: machined dial face, perimeter arc, value-fill arc, and a
 * compact rim tick indicating the current position. Tries to feel like a piece
 * of pro-audio hardware rather than a stock SVG widget.
 */
const KnobBody: React.FC<KnobBodyProps> = ({ norm, accent, active = true }) => {
  const angle = START_ANGLE + norm * SWEEP;
  const tickInner = polarToCartesian(CENTER, CENTER, TICK_INNER, angle);
  const tickOuter = polarToCartesian(CENTER, CENTER, TICK_OUTER, angle);
  return (
    <Svg width={KNOB_SIZE} height={KNOB_SIZE}>
      <Defs>
        <RadialGradient id="knobFace" cx="50%" cy="38%" rx="55%" ry="55%">
          <Stop offset="0%" stopColor="#1f242c" stopOpacity={1} />
          <Stop offset="100%" stopColor="#0a0d12" stopOpacity={1} />
        </RadialGradient>
      </Defs>

      {/* Recessed cup shadow (slightly larger than face, behind everything) */}
      <Circle cx={CENTER} cy={CENTER} r={FACE_RADIUS + 1.5} fill="#05070b" />
      {/* Knob face — subtle radial gradient suggesting machined metal */}
      <Circle cx={CENTER} cy={CENTER} r={FACE_RADIUS} fill="url(#knobFace)" />
      {/* Inner rim highlight — 1px lighter ring at top of the face */}
      <Circle
        cx={CENTER}
        cy={CENTER}
        r={FACE_RADIUS - 0.5}
        stroke="rgba(255,255,255,0.04)"
        strokeWidth={1}
        fill="none"
      />

      {/* Outer track */}
      <Path
        d={describeArc(CENTER, CENTER, RADIUS, START_ANGLE, END_ANGLE)}
        stroke={COLORS.stroke}
        strokeWidth={STROKE_WIDTH}
        fill="none"
        strokeLinecap="round"
      />
      {/* Active fill */}
      {active && norm > 0.01 && (
        <Path
          d={describeArc(CENTER, CENTER, RADIUS, START_ANGLE, angle)}
          stroke={accent}
          strokeWidth={STROKE_WIDTH}
          fill="none"
          strokeLinecap="round"
        />
      )}

      {/* Rim tick indicator — short, sits inside the dial face only */}
      <Line
        x1={tickInner.x}
        y1={tickInner.y}
        x2={tickOuter.x}
        y2={tickOuter.y}
        stroke={active ? '#f4f5f7' : COLORS.muted}
        strokeWidth={2.4}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export const ParamKnob: React.FC<ParamKnobProps> = React.memo(({
  label, value, min, max, unit, displayMin, displayMax,
  options, type, onChange, accentColor = COLORS.accent, onDragChange, helpAdornment,
}) => {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState('');

  // Boolean knob (no options or 2-option toggle treated as on/off)
  const isBooleanToggle = type === 'b' && (!options || options.length <= 2);
  // Option-list knob with discrete steps (e.g., wave shape)
  const isOptionList = !isBooleanToggle && options !== null && options !== undefined && options.length > 0;
  // Numeric knob (continuous)
  const isNumeric = !isBooleanToggle && !isOptionList;

  const numericValue = typeof value === 'boolean' ? (value ? 1 : 0) : Number(value);
  const range = max - min;
  const normalized = (() => {
    if (isBooleanToggle) {
      const isOn = typeof value === 'boolean' ? value : Number(value) > 0;
      return isOn ? 1 : 0;
    }
    if (isOptionList && options) {
      const idx = Math.round(numericValue) - min;
      const last = options.length - 1;
      return last > 0 ? Math.max(0, Math.min(1, idx / last)) : 0;
    }
    return range > 0 ? Math.max(0, Math.min(1, (numericValue - min) / range)) : 0;
  })();

  // Refs keep PanResponder closure stable across re-renders.
  const propsRef = useRef({
    onChange, min, max, type, normalized, range, numericValue,
    displayMin, displayMax, isBooleanToggle, isOptionList, optionCount: options?.length ?? 0,
    onDragChange,
  });
  propsRef.current = {
    onChange, min, max, type, normalized, range, numericValue,
    displayMin, displayMax, isBooleanToggle, isOptionList, optionCount: options?.length ?? 0,
    onDragChange,
  };
  const startNormRef = useRef(0);
  const didDragRef = useRef(false);
  const lastEmittedRef = useRef<number | boolean>(numericValue);

  // ── Tap handler (opens numeric edit modal for continuous knobs only) ─
  const openEditModal = useCallback(() => {
    const { displayMin: dMin, displayMax: dMax, normalized: n, numericValue: nv, type: t } = propsRef.current;
    const rawDisplay = typeof dMin === 'number' && typeof dMax === 'number'
      ? dMin + n * (dMax - dMin)
      : nv;
    setEditText(t === 'i' ? Math.round(rawDisplay).toString() : rawDisplay.toFixed(1));
    setEditing(true);
  }, []);
  const openEditRef = useRef(openEditModal);
  openEditRef.current = openEditModal;

  // Tap/release (no drag): cycle for option list, toggle for boolean, edit modal for numeric.
  const handleTap = useCallback(() => {
    const p = propsRef.current;
    if (p.isBooleanToggle) {
      const current = typeof value === 'boolean' ? value : Number(value) > 0;
      p.onChange(!current);
      return;
    }
    if (p.isOptionList && p.optionCount > 0) {
      const idx = Math.round(p.numericValue) - p.min;
      const next = (idx + 1) % p.optionCount;
      p.onChange(p.min + next);
      return;
    }
    openEditRef.current();
  }, [value]);

  // ── Unified PanResponder: works for numeric, option list, and boolean ─
  const panResponder = useRef(
    PanResponder.create({
      // Claim the touch immediately so the parent ScrollView never wins.
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      // Do not yield to siblings (e.g., parent scroll view trying to reclaim).
      onPanResponderTerminationRequest: () => false,
      onShouldBlockNativeResponder: () => true,

      onPanResponderGrant: () => {
        startNormRef.current = propsRef.current.normalized;
        didDragRef.current = false;
        lastEmittedRef.current = propsRef.current.numericValue;
        propsRef.current.onDragChange?.(true);
      },

      onPanResponderMove: (_, { dy }) => {
        const p = propsRef.current;
        if (Math.abs(dy) < 3) return;
        didDragRef.current = true;

        if (p.isBooleanToggle) {
          // Drag up → On, drag down → Off (uses dy direction, not magnitude).
          const target = -dy / 24;
          const isOn = (startNormRef.current + target) >= 0.5;
          if (lastEmittedRef.current !== isOn) {
            lastEmittedRef.current = isOn;
            p.onChange(isOn);
          }
          return;
        }

        if (p.isOptionList && p.optionCount > 0) {
          // Each OPTION_STEP_PX of vertical travel changes the option by 1.
          const last = p.optionCount - 1;
          const startIdx = Math.round(startNormRef.current * last);
          const stepDelta = Math.round(-dy / OPTION_STEP_PX);
          const nextIdx = Math.max(0, Math.min(last, startIdx + stepDelta));
          const nextValue = p.min + nextIdx;
          if (lastEmittedRef.current !== nextValue) {
            lastEmittedRef.current = nextValue;
            p.onChange(nextValue);
          }
          return;
        }

        // Continuous numeric.
        const delta = -dy / NUMERIC_DRAG_PX;
        const newNorm = Math.max(0, Math.min(1, startNormRef.current + delta));
        const raw = p.min + newNorm * p.range;
        const clamped = p.type === 'i' ? Math.round(raw) : Math.round(raw * 1000) / 1000;
        const final = Math.max(p.min, Math.min(p.max, clamped));
        if (final !== lastEmittedRef.current) {
          lastEmittedRef.current = final;
          p.onChange(final);
        }
      },

      onPanResponderRelease: () => {
        propsRef.current.onDragChange?.(false);
        if (!didDragRef.current) handleTap();
      },
      onPanResponderTerminate: () => {
        propsRef.current.onDragChange?.(false);
      },
    })
  ).current;

  // ── Render ──────────────────────────────────────────────────────
  const isOn = isBooleanToggle ? (typeof value === 'boolean' ? value : Number(value) > 0) : true;
  const accent = isBooleanToggle && !isOn ? COLORS.muted : accentColor;
  const displayText = isBooleanToggle
    ? (options && options.length === 2 ? options : ['Off', 'On'])[isOn ? 1 : 0]
    : formatParamValue(value, min, max, displayMin, displayMax, unit, type, options);

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
          <KnobBody norm={normalized} accent={accent} active={isOn} />
          {helpAdornment ? <View style={styles.helpAdornment}>{helpAdornment}</View> : null}
        </View>
        <Text style={styles.label} numberOfLines={1}>{label}</Text>
        <Text
          style={[
            styles.value,
            { color: isBooleanToggle && !isOn ? COLORS.muted : colorWithAlpha(accentColor, 0.95) },
          ]}
          numberOfLines={1}
        >
          {displayText}
        </Text>
      </View>

      {/* Precise edit modal — only relevant for continuous knobs */}
      {isNumeric && (
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
      )}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 78,
    gap: 6,
    paddingVertical: 4,
  },
  knobWrap: {
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpAdornment: {
    position: 'absolute',
    top: -4,
    right: -4,
  },
  label: {
    color: COLORS.muted,
    fontFamily: FONTS.bodySemi,
    fontSize: 9.5,
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    textAlign: 'center',
  },
  value: {
    color: COLORS.text,
    fontFamily: FONTS.mono,
    fontSize: 11,
    letterSpacing: 0.2,
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
