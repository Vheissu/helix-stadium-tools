import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, useWindowDimensions } from 'react-native';
import Svg, { Line, Rect, Text as SvgText } from 'react-native-svg';
import { AccessibleText as Text } from '../accessibility/AccessibleText';
import { Action } from '../accessibility/controls';
import { announce, useAccessibilityPreferences } from '../accessibility/AccessibilityPreferences';
import { AccessibleParameter } from '../accessibility/AccessibleParameter';
import { COLORS } from '../theme/colors';
import { FOCUS_POINTS, focusChanges, getFocusDefinition, normalizeFocusPoint, type FocusChange, type FocusPoint, type FocusValue } from '../utils/focus';
import { FocusSurface } from './FocusSurface';
import { ParamSlider } from './ParamSlider';

export interface FocusModelParam {
  id: number | null; key: string; name: string; type: 'f' | 'i' | 'b'; min: number; max: number; def: FocusValue;
  display_min?: number; display_max?: number; unit?: string | null; options?: string[] | null; harness?: boolean;
}
export interface FocusModel { id: number; key: string; category: string; params: FocusModelParam[] }
export function focusKind(model: FocusModel): 'xy' | 'cab' | 'eq' | 'clone' | null {
  if (getFocusDefinition(model.id)) return 'xy';
  if (model.params.some(p => p.key === 'Position') && model.params.some(p => p.key === 'Distance')) return 'cab';
  if (model.category === 'eq') return 'eq';
  if (model.key.includes('FlexNet')) return 'clone';
  return null;
}
interface Props {
  model: FocusModel; read: () => Promise<Record<number, FocusValue>>;
  apply: (changes: FocusChange[]) => Promise<Record<number, FocusValue>>;
  onBusy: (busy: boolean) => void; onDrag: (dragging: boolean) => void;
}

export function FocusView({ model, read, apply, onBusy, onDrag }: Props) {
  const { accessibleLayout, screenReader } = useAccessibilityPreferences();
  const definition = getFocusDefinition(model.id);
  const kind = focusKind(model);
  const [values, setValues] = useState<Record<number, FocusValue> | null>(null);
  const [point, setPoint] = useState<FocusPoint>({ x: 0, y: 0 });
  const [positioned, setPositioned] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [precise, setPrecise] = useState(false);
  const { height: windowHeight, fontScale } = useWindowDimensions();
  const listLayout = accessibleLayout || screenReader || fontScale > 1.3;
  const original = useRef<Record<number, FocusValue> | null>(null);
  const pending = useRef(new Map<number, FocusChange>());
  const running = useRef(false);
  const mounted = useRef(true);
  const callbacks = useRef({ read, apply, onBusy, onDrag });
  callbacks.current = { read, apply, onBusy, onDrag };
  const lastPoint = useRef(point);
  const selectedPoint = useRef<number | null>(null);
  const lastQueuedPoint = useRef<FocusPoint | null>(null);

  useEffect(() => {
    mounted.current = true;
    const queueToClear = pending.current;
    void callbacks.current.read().then(result => {
      if (!mounted.current) return;
      original.current = result; setValues(result);
      if (kind === 'cab') {
        const position = model.params.find(p => p.key === 'Position')!;
        const distance = model.params.find(p => p.key === 'Distance')!;
        const next = { x: (Number(result[position.id!]) - position.min) / (position.max - position.min) * 2 - 1,
          y: (Number(result[distance.id!]) - distance.min) / (distance.max - distance.min) * 2 - 1 };
        lastPoint.current = next; setPoint(next); setPositioned(true);
      }
    }).catch(problem => { if (mounted.current) setError(problem.message); });
    return () => { mounted.current = false; queueToClear.clear(); callbacks.current.onDrag(false); };
    // This component is keyed by preset, model, block and snapshot in its parent.
  }, [kind, model.id, model.params]);

  const queue = (changes: FocusChange[]) => {
    if (!original.current || error) return;
    for (const change of changes) pending.current.set(change.id, change);
    setValues(previous => ({ ...previous, ...Object.fromEntries(changes.map(c => [c.id, c.value])) }));
    if (running.current) return;
    running.current = true; setBusy(true); callbacks.current.onBusy(true);
    void (async () => {
      try {
        while (mounted.current && pending.current.size) {
          const batch = [...pending.current.values()]; pending.current.clear();
          const confirmed = await callbacks.current.apply(batch);
          if (mounted.current) setValues({ ...confirmed, ...Object.fromEntries([...pending.current.values()].map(c => [c.id, c.value])) });
        }
      } catch (problem) {
        pending.current.clear();
        if (mounted.current) { const message = problem instanceof Error ? problem.message : 'The Focus adjustment failed.'; setError(message); announce(message); }
      } finally {
        running.current = false;
        callbacks.current.onBusy(false);
        if (mounted.current) setBusy(false);
      }
    })();
  };
  const move = (next: FocusPoint) => {
    const normal = normalizeFocusPoint(next);
    lastPoint.current = normal; setPoint(normal); setPositioned(true);
    if (lastQueuedPoint.current?.x === normal.x && lastQueuedPoint.current?.y === normal.y) return;
    lastQueuedPoint.current = normal;
    if (definition) queue(focusChanges(definition, normal));
    else if (kind === 'cab') {
      queue(['Position', 'Distance'].map((key, index) => {
        const param = model.params.find(p => p.key === key)!;
        let value = param.min + ((index ? normal.y : normal.x) + 1) / 2 * (param.max - param.min);
        if (key === 'Distance') value = Math.round(value * 4) / 4;
        return { id: param.id!, key, type: param.type, value };
      }));
    }
  };
  const controls = model.params.filter(param => param.id !== null && !param.harness && values?.[param.id!] !== undefined &&
    (kind !== 'cab' || ['Mic', 'Position', 'Distance', 'Angle', 'LowCut', 'HighCut', 'Level', 'Pan', 'Delay'].includes(param.key)));
  const toneControls = controls.filter(param => param.unit === 'dB' && /gain|low|mid|high|bass|treble|level|\d+(hz|k)/i.test(param.key));
  const pad = kind === 'xy' || kind === 'cab';

  if (!values) return <View style={styles.section}>{error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : <><ActivityIndicator color={COLORS.text} /><Text style={styles.body}>Reading the current tone…</Text></>}</View>;
  return <View style={styles.section}>
    {!pad && <Text accessibilityRole="header" style={styles.title}>{kind === 'eq' ? 'EQ bands' : 'Clone tone'}</Text>}
    {!!error && <Text accessibilityRole="alert" style={styles.error}>{error} Close and reopen Focus View to read the current values.</Text>}
    {pad && !listLayout && <FocusSurface category={model.category} cabinet={kind === 'cab'} names={definition?.names}
      point={point} positioned={positioned} selected={selectedPoint.current} disabled={!!error}
      height={Math.max(360, Math.min(480, windowHeight - 420))}
      onMove={next => { selectedPoint.current = null; move(next); }}
      onSelect={index => { selectedPoint.current = index; move(FOCUS_POINTS[index]); announce(`${definition!.names[index]} selected`, false); }}
      onDrag={dragging => callbacks.current.onDrag(dragging)} />}
    {definition && listLayout && <View style={styles.points}>{[2, 4, 0, 1, 3].map(index => <Action key={index}
      disabled={!!error} accessibilityLabel={`${definition.names[index]}, ${index === 0 ? 'centre' : index === 1 ? 'bottom left' : index === 2 ? 'top left' : index === 3 ? 'bottom right' : 'top right'} Focus point`}
      accessibilityState={{ selected: positioned && selectedPoint.current === index }} style={[styles.point, positioned && selectedPoint.current === index && styles.pointSelected]}
      onPress={() => { selectedPoint.current = index; move(FOCUS_POINTS[index]); announce(`${definition.names[index]} selected`, false); }}>
      <Text style={styles.pointLabel}>{definition.names[index]}</Text>
    </Action>)}</View>}
    {pad && <View style={styles.caption}>
      <Text accessibilityLiveRegion="polite" style={styles.status}>{error ? 'Adjustment stopped' : busy ? 'Adjusting…' : definition ? !positioned ? 'Current tone' : selectedPoint.current !== null ? definition.names[selectedPoint.current] : 'Custom blend' : 'Mic placement'}</Text>
      {!listLayout && <Text style={styles.hint}>{kind === 'xy' ? 'Tap a tone · Drag to blend' : 'Drag to position'}</Text>}
    </View>}
    {kind === 'xy' && !error && <>
      {!listLayout && <Action accessibilityState={{ expanded: precise }} onPress={() => setPrecise(!precise)} style={styles.preciseToggle}>
        <Text style={styles.pointLabel}>Adjust precisely</Text><Text style={styles.pointLabel}>{precise ? '−' : '+'}</Text>
      </Action>}
      {(listLayout || precise) && <>
        <AccessibleParameter label="Focus X, left to right" type="i" min={-100} max={100} value={Math.round(point.x * 100)} onChange={value => { selectedPoint.current = null; move({ ...lastPoint.current, x: Number(value) / 100 }); }} />
        <AccessibleParameter label="Focus Y, bottom to top" type="i" min={-100} max={100} value={Math.round(point.y * 100)} onChange={value => { selectedPoint.current = null; move({ ...lastPoint.current, y: Number(value) / 100 }); }} />
      </>}
    </>}
    {(kind === 'eq' || kind === 'clone') && toneControls.length > 0 && <View accessible accessibilityLabel={`Tone levels: ${toneControls.map(p => `${p.name} ${Number(values[p.id!]).toFixed(1)} dB`).join(', ')}`}>
      <Svg pointerEvents="none" width="100%" height={160} viewBox="0 0 300 160">
        <Line x1={0} y1={80} x2={300} y2={80} stroke={COLORS.muted} />
        {toneControls.map((param, index) => { const x = (index + 0.5) * 300 / toneControls.length; const gain = Math.max(-24, Math.min(24, Number(values[param.id!]))); const y = 80 - gain * 2.5;
          return <React.Fragment key={param.id}><Rect x={x - 6} y={Math.min(y, 80)} width={12} height={Math.max(1, Math.abs(y - 80))} fill={COLORS.signal} /><SvgText x={x} y={152} fill={COLORS.muted} fontSize={9} textAnchor="middle">{param.name.slice(0, 10)}</SvgText></React.Fragment>; })}
      </Svg>
    </View>}
    {kind !== 'xy' && !error && controls.map(param => <ParamSlider key={param.id} label={param.name} value={values[param.id!] ?? param.def}
      min={param.min} max={param.max} type={param.type} options={param.options}
      step={kind === 'cab' && param.key === 'Distance' ? 0.25 : undefined} precision={kind === 'cab' && param.key === 'Distance' ? 2 : undefined}
      unit={kind === 'cab' && param.key === 'Distance' ? 'inches' : kind === 'cab' && param.key === 'Position' ? null : param.unit} displayMin={param.display_min} displayMax={param.display_max}
      onDragChange={dragging => callbacks.current.onDrag(dragging)} onChange={value => {
        lastQueuedPoint.current = null;
        const next = param.key === 'Distance' && kind === 'cab' ? Math.round(Number(value) * 4) / 4 : value;
        queue([{ id: param.id!, key: param.key, type: param.type, value: next }]);
        if (kind === 'cab' && (param.key === 'Position' || param.key === 'Distance')) {
          const axis = (Number(next) - param.min) / (param.max - param.min) * 2 - 1;
          const nextPoint = { ...lastPoint.current, [param.key === 'Position' ? 'x' : 'y']: axis }; lastPoint.current = nextPoint; setPoint(nextPoint);
        }
      }} />)}
    <Action disabled={busy || !!error} style={styles.restore} onPress={() => {
      lastQueuedPoint.current = null;
      const params = definition?.params ?? controls;
      queue(params.filter(param => param.id !== null && original.current?.[param.id!] !== undefined).map(param => ({ id: param.id!, key: param.key, type: param.type, value: original.current![param.id!] })));
      selectedPoint.current = null;
      if (kind === 'cab') {
        const position = model.params.find(p => p.key === 'Position')!, distance = model.params.find(p => p.key === 'Distance')!;
        const next = { x: (Number(original.current![position.id!]) - position.min) / (position.max - position.min) * 2 - 1,
          y: (Number(original.current![distance.id!]) - distance.min) / (distance.max - distance.min) * 2 - 1 };
        lastPoint.current = next; setPoint(next); setPositioned(true);
      } else { lastPoint.current = { x: 0, y: 0 }; setPoint(lastPoint.current); setPositioned(false); }
      announce('Restoring the tone from when Focus View opened', false);
    }}><Text style={styles.pointLabel}>Restore starting tone</Text></Action>
  </View>;
}
const styles = StyleSheet.create({
  section: { gap: 14, paddingTop: 14 },
  title: { fontSize: 20, color: COLORS.text }, body: { fontSize: 16, lineHeight: 23, color: COLORS.muted }, error: { color: COLORS.danger, fontSize: 16 },
  caption: { gap: 4 }, status: { color: COLORS.text, fontSize: 16, fontWeight: '500' }, hint: { color: '#a7a8b0', fontSize: 15, lineHeight: 21 },
  points: { gap: 8 }, point: { minHeight: 48, justifyContent: 'center', padding: 12, borderWidth: 1, borderColor: COLORS.stroke, borderRadius: 6 },
  pointLabel: { color: COLORS.text, fontSize: 16 }, pointSelected: { borderColor: COLORS.accent, backgroundColor: COLORS.accentDim },
  preciseToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: COLORS.stroke, paddingVertical: 12 },
  restore: { minHeight: 48, alignSelf: 'flex-start', paddingVertical: 12 },
});
