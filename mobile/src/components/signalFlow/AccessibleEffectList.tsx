import React, { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, StyleSheet, View, type ViewInstance } from 'react-native';
import { announce, useAccessibilityPreferences } from '../../accessibility/AccessibilityPreferences';
import { AccessibleText as Text } from '../../accessibility/AccessibleText';
import { Action } from '../../accessibility/controls';
import { COLORS } from '../../theme/colors';
import { visibleBlockIndices } from '../../utils/blockMove';
import type { BlockIndex } from '../../types/signalFlow';
import type { DraggableEffectListProps } from './DraggableEffectList';

type Pickup = { index: number; name: string; signature: string };

export function AccessibleEffectList({ blocks, pathIndex, selectedSlot, onSelectSlot, onOpenSlotMenu, onReorder, onToggleEnabled, availablePositions }: Omit<DraggableEffectListProps, 'onOpenSlotMenu'> & { onOpenSlotMenu?: DraggableEffectListProps['onOpenSlotMenu'] }) {
  const { screenReader } = useAccessibilityPreferences();
  const [pickup, setPickup] = useState<Pickup | null>(null);
  const [moving, setMoving] = useState(false);
  const busy = useRef(false);
  const mounted = useRef(true);
  const targets = useRef<(ViewInstance | null)[]>([]);
  const focusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // A changed path invalidates a pending pick-up, including changes from the device.
  const signature = JSON.stringify([blocks, availablePositions]);
  const latestSignature = useRef(signature);
  latestSignature.current = signature;
  const picked = pickup?.signature === signature ? pickup : null;
  const path = ['1A', '1B', '2A', '2B'][pathIndex];
  const indices = visibleBlockIndices(blocks, availablePositions);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; if (focusTimer.current) clearTimeout(focusTimer.current); };
  }, []);
  useEffect(() => {
    if (pickup && pickup.signature !== signature && !busy.current) {
      setPickup(null);
      announce('Move cancelled because the path changed.');
    }
  }, [pickup, signature]);

  const focus = (index: number) => {
    if (!screenReader) return;
    if (focusTimer.current) clearTimeout(focusTimer.current);
    focusTimer.current = setTimeout(() => {
      const target = targets.current[index];
      if (target) AccessibilityInfo.sendAccessibilityEvent(target, 'focus');
    }, 200);
  };
  const cancel = () => {
    if (busy.current || !picked) return;
    setPickup(null);
    announce(`Move cancelled. ${picked.name} remains at position ${picked.index + 1}.`);
    focus(picked.index);
  };
  const move = async (from: number, to: number) => {
    if (busy.current || signature !== latestSignature.current || !indices.includes(to) || !blocks[from]) return;
    if (from === to) { cancel(); return; }
    busy.current = true;
    setMoving(true);
    const name = blocks[from]!.name;
    let success = false;
    try { success = await onReorder(pathIndex, from, to) === true; }
    catch { /* Keep an interrupted device operation from becoming an unhandled rejection. */ }
    finally {
      busy.current = false;
      if (mounted.current) {
        setMoving(false);
        setPickup(null);
        announce(success ? `Moved ${name} to path ${path}, position ${to + 1}.` : `Could not finish moving ${name}. Check the path before trying again.`);
        focus(success ? to : from);
      }
    }
  };

  return <View>
    <Text accessibilityRole="header" style={styles.heading}>Path {path}</Text>
    {picked && <View style={styles.moveInstructions}>
      <Text style={styles.text}>Moving {picked.name}. Choose a position in path {path}, then activate Drop here. Other blocks shift to make room.</Text>
      <Action disabled={moving} accessibilityLabel={`Cancel moving ${picked.name}`} onPress={cancel} style={[styles.outline, styles.cancel, moving && styles.disabled]}><Text style={styles.text}>Cancel move</Text></Action>
    </View>}
    {indices.map((index) => {
      const block = blocks[index];
      const slot = { path: pathIndex, block: index as BlockIndex };
      const selected = selectedSlot?.path === pathIndex && selectedSlot.block === index;
      const name = block?.name ?? 'Empty slot';
      const location = `path ${path}, position ${index + 1}`;
      if (picked) return <Action key={index} ref={view => { targets.current[index] = view; }} disabled={moving}
        accessibilityLabel={index === picked.index ? `Keep ${picked.name} at ${location}` : `Drop ${picked.name} at ${location}${block ? `, currently ${name}` : ', empty position'}`}
        accessibilityHint="Other blocks shift to make room."
        onPress={() => { void move(picked.index, index); }} style={styles.dropTarget}>
        <Text style={styles.name}>{index + 1}. {name}</Text>
        <Text style={styles.text}>{index === picked.index ? 'Keep here' : 'Drop here'}</Text>
      </Action>;
      if (!block) return <Action key={index} ref={view => { targets.current[index] = view; }} disabled={moving} onPress={() => onSelectSlot(slot)} accessibilityLabel={`Add block, ${location}`} style={styles.addRow}>
        <Text style={styles.text}>Add block at position {index + 1}</Text>
      </Action>;
      return <View key={index} style={styles.block}>
        <Action ref={view => { targets.current[index] = view; }} disabled={moving} onPress={() => onSelectSlot(slot)} accessibilityLabel={`Edit ${name}, ${location}`}
          accessibilityValue={{ text: block.enabled === false ? 'Bypassed' : 'Enabled' }} accessibilityState={{ selected }}>
          <Text style={styles.name}>{index + 1}. {name}</Text>
          <Text style={styles.text}>{block.enabled === false ? 'Bypassed' : 'Enabled'}</Text>
        </Action>
        <View style={styles.actions}>
          <Action disabled={moving} accessibilityLabel={`${block.enabled === false ? 'Enable' : 'Bypass'} ${name}, ${location}`} onPress={() => onToggleEnabled(slot)} style={[styles.outline, styles.button, moving && styles.disabled]}><Text style={styles.text}>{block.enabled === false ? 'Enable' : 'Bypass'}</Text></Action>
          {onOpenSlotMenu && <Action disabled={moving} accessibilityLabel={`Options for ${name}, ${location}`} onPress={() => onOpenSlotMenu(slot)} style={[styles.outline, styles.button, moving && styles.disabled]}><Text style={styles.text}>Options</Text></Action>}
          <Action disabled={moving} accessibilityLabel={`Pick up ${name}, ${location}`} accessibilityHint="Choose a destination, then activate Drop here."
            onPress={() => { setPickup({ index, name, signature }); announce(`Picked up ${name}. Choose a position in path ${path} and activate Drop here, or Cancel move.`); focus(index); }} style={[styles.outline, styles.button, moving && styles.disabled]}><Text style={styles.text}>Pick up</Text></Action>
          <Action accessibilityLabel={`Move ${name} earlier, ${location}`} disabled={moving || !indices.includes(index - 1)} onPress={() => { void move(index, index - 1); }} style={[styles.outline, styles.button, (moving || !indices.includes(index - 1)) && styles.disabled]}><Text style={styles.text}>Move earlier</Text></Action>
          <Action accessibilityLabel={`Move ${name} later, ${location}`} disabled={moving || !indices.includes(index + 1)} onPress={() => { void move(index, index + 1); }} style={[styles.outline, styles.button, (moving || !indices.includes(index + 1)) && styles.disabled]}><Text style={styles.text}>Move later</Text></Action>
        </View>
      </View>;
    })}
  </View>;
}

const styles = StyleSheet.create({
  heading: { color: COLORS.text, fontSize: 20, paddingVertical: 12 },
  text: { color: COLORS.text, fontSize: 16 },
  name: { color: COLORS.text, fontSize: 18 },
  // Visible button outlines for low-vision list layout; even rows rather than a ragged wrap.
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  outline: { alignItems: 'center', borderWidth: 1, borderColor: COLORS.muted, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 },
  button: { flexGrow: 1, flexBasis: 128 },
  cancel: { alignSelf: 'flex-start', paddingHorizontal: 16 },
  disabled: { opacity: 0.45 },
  addRow: { paddingVertical: 12, borderBottomWidth: 1, borderColor: COLORS.stroke },
  block: { paddingVertical: 12, gap: 8, borderBottomWidth: 1, borderColor: COLORS.stroke },
  moveInstructions: { gap: 8, paddingVertical: 12 },
  dropTarget: { borderWidth: 1, borderColor: COLORS.muted, borderRadius: 8, padding: 12, marginVertical: 6, gap: 8 },
});
