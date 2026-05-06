import React, { useCallback, useRef, useState } from 'react';
import {
  LayoutChangeEvent,
  Modal,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { COLORS, FONTS, colorWithAlpha } from '../theme/colors';
import { formatParamValue } from '../utils/paramFormat';

interface ParamSliderProps {
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
  /** Called when a drag starts/ends so parent ScrollView can lock. */
  onDragChange?: (dragging: boolean) => void;
  /** Optional help-icon adornment rendered next to the label. */
  helpAdornment?: React.ReactNode;
  /** Slightly taller bar on tablet for more comfortable touch. */
  rowHeight?: number;
}

const DEFAULT_TRACK_HEIGHT = 36;
const TRACK_PAD_H = 14;
const MARKER_WIDTH = 10;

/**
 * Horizontal slider row. The whole bar is the track — drag the marker block to
 * adjust, or tap anywhere on the track to jump-to. Long-press the row to type
 * a precise value (continuous numerics only).
 *
 * For discrete option lists, the marker snaps to evenly spaced stops.
 *
 * Accent color is the block's category color. The fill is a tinted overlay so
 * the label/value text stays legible even on bright categories.
 */
export const ParamSlider: React.FC<ParamSliderProps> = React.memo(({
  label,
  value,
  min,
  max,
  unit,
  displayMin,
  displayMax,
  options,
  type,
  onChange,
  accentColor = COLORS.accent,
  onDragChange,
  helpAdornment,
  rowHeight: rowHeightProp,
}) => {
  // The "row height" prop now controls the track (bar) height. The header row
  // (label + value + help) sits above the bar at its own intrinsic height.
  const trackHeight = rowHeightProp ?? DEFAULT_TRACK_HEIGHT;
  const [trackWidth, setTrackWidth] = useState(0);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState('');

  const isOptionList = options !== null && options !== undefined && options.length > 1;
  const numericValue = typeof value === 'boolean' ? (value ? 1 : 0) : Number(value);
  const range = max - min;

  const normalized = (() => {
    if (isOptionList && options) {
      const idx = Math.round(numericValue) - min;
      const last = options.length - 1;
      return last > 0 ? Math.max(0, Math.min(1, idx / last)) : 0;
    }
    return range > 0 ? Math.max(0, Math.min(1, (numericValue - min) / range)) : 0;
  })();

  // Stable refs for the PanResponder closure
  const propsRef = useRef({
    onChange, min, max, type, range, options, isOptionList, trackWidth,
    onDragChange,
  });
  propsRef.current = {
    onChange, min, max, type, range, options, isOptionList, trackWidth,
    onDragChange,
  };
  const lastEmittedRef = useRef<number | boolean>(numericValue);
  const didDragRef = useRef(false);

  const valueFromTouchX = useCallback((x: number) => {
    const p = propsRef.current;
    const w = Math.max(1, p.trackWidth - TRACK_PAD_H * 2);
    const clamped = Math.max(0, Math.min(w, x - TRACK_PAD_H));
    const norm = clamped / w;
    if (p.isOptionList && p.options) {
      const last = p.options.length - 1;
      const idx = Math.round(norm * last);
      return p.min + Math.max(0, Math.min(last, idx));
    }
    const raw = p.min + norm * p.range;
    if (p.type === 'i') return Math.round(raw);
    // 0.1 resolution feels right for typical helix params
    return Math.round(raw * 10) / 10;
  }, []);

  const emit = useCallback((next: number | boolean) => {
    const p = propsRef.current;
    if (lastEmittedRef.current !== next) {
      lastEmittedRef.current = next;
      p.onChange(next);
    }
  }, []);

  const openEditModal = useCallback(() => {
    if (isOptionList) return;
    const display = (() => {
      if (typeof displayMin === 'number' && typeof displayMax === 'number') {
        const t = range > 0 ? (numericValue - min) / range : 0;
        return displayMin + t * (displayMax - displayMin);
      }
      return numericValue;
    })();
    setEditText(type === 'i' ? Math.round(display).toString() : display.toFixed(1));
    setEditing(true);
  }, [displayMin, displayMax, isOptionList, max, min, numericValue, range, type]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderTerminationRequest: () => false,
      onShouldBlockNativeResponder: () => true,

      onPanResponderGrant: (evt) => {
        didDragRef.current = false;
        propsRef.current.onDragChange?.(true);
        // Tap-to-jump: emit immediately on touch-down at locationX
        const x = evt.nativeEvent.locationX;
        emit(valueFromTouchX(x));
      },

      onPanResponderMove: (evt, gesture) => {
        if (Math.abs(gesture.dx) >= 2) didDragRef.current = true;
        const x = evt.nativeEvent.locationX;
        emit(valueFromTouchX(x));
      },

      onPanResponderRelease: () => {
        propsRef.current.onDragChange?.(false);
      },
      onPanResponderTerminate: () => {
        propsRef.current.onDragChange?.(false);
      },
    })
  ).current;

  const onTrackLayout = useCallback((event: LayoutChangeEvent) => {
    setTrackWidth(event.nativeEvent.layout.width);
  }, []);

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

  const fillWidth = Math.max(0, Math.min(1, normalized)) * Math.max(0, trackWidth - TRACK_PAD_H * 2);
  const markerLeft = TRACK_PAD_H + fillWidth - MARKER_WIDTH / 2;

  const fillColor = colorWithAlpha(accentColor, 0.32);
  const trackBackground = COLORS.panelAlt;
  const valueText = formatParamValue(value, min, max, displayMin, displayMax, unit, type, options);

  const tickPositions = isOptionList && options
    ? options.map((_, i) => {
        const last = options.length - 1;
        return last > 0 ? i / last : 0;
      })
    : [];

  return (
    <>
      <View style={styles.row}>
        {/* Header row: label (left, expands), value + help (right). The value
            can grow to fit any option-list label without squeezing the bar. */}
        <View style={styles.header}>
          <Text style={styles.label} numberOfLines={1}>
            {label}
          </Text>
          <View style={styles.headerRight}>
            <Pressable
              onPress={openEditModal}
              disabled={isOptionList}
              hitSlop={6}
              style={styles.valueWrap}
            >
              <Text style={[styles.value, { color: COLORS.text }]} numberOfLines={1}>
                {valueText}
              </Text>
            </Pressable>
            {helpAdornment ? <View style={styles.helpWrap}>{helpAdornment}</View> : null}
          </View>
        </View>
        {/* Slider track — full width, no overlaid text. */}
        <View
          style={[
            styles.track,
            { height: trackHeight, backgroundColor: trackBackground, borderColor: COLORS.stroke },
          ]}
          onLayout={onTrackLayout}
          {...panResponder.panHandlers}
        >
          <View
            pointerEvents="none"
            style={[styles.fill, { width: TRACK_PAD_H + fillWidth, backgroundColor: fillColor }]}
          />
          {tickPositions.length > 0 && trackWidth > 0 && tickPositions.map((t, i) => {
            const cx = TRACK_PAD_H + t * (trackWidth - TRACK_PAD_H * 2);
            return (
              <View
                key={`tick-${i}`}
                pointerEvents="none"
                style={[styles.tick, { left: cx - 0.5, backgroundColor: colorWithAlpha(COLORS.muted, 0.5) }]}
              />
            );
          })}
          {trackWidth > 0 && (
            <View
              pointerEvents="none"
              style={[
                styles.marker,
                {
                  left: markerLeft,
                  backgroundColor: accentColor,
                  shadowColor: accentColor,
                },
              ]}
            />
          )}
        </View>
      </View>

      {!isOptionList && (
        <Modal
          visible={editing}
          transparent
          animationType="fade"
          onRequestClose={() => setEditing(false)}
        >
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
                <Pressable
                  style={[styles.editConfirm, { backgroundColor: accentColor }]}
                  onPress={handleEditSubmit}
                >
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
  row: {
    width: '100%',
    paddingVertical: 4,
    gap: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    gap: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },
  track: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  tick: {
    position: 'absolute',
    top: 12,
    bottom: 12,
    width: 1,
  },
  marker: {
    position: 'absolute',
    top: 6,
    bottom: 6,
    width: MARKER_WIDTH,
    borderRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 4,
  },
  label: {
    flex: 1,
    color: COLORS.text,
    fontFamily: FONTS.bodySemi,
    fontSize: 14,
    letterSpacing: 0.2,
  },
  helpWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueWrap: {
    paddingVertical: 4,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  value: {
    fontFamily: FONTS.mono,
    fontSize: 13,
    letterSpacing: 0.2,
    textAlign: 'right',
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
    alignItems: 'center',
  },
  editConfirmText: {
    color: COLORS.bg,
    fontFamily: FONTS.bodySemi,
    fontSize: 14,
  },
});
