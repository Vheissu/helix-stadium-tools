import { useAccessibilityPreferences } from '../../accessibility/AccessibilityPreferences';
import { AccessibleEffectList } from './AccessibleEffectList';
import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
  type LayoutChangeEvent,
  type ViewInstance,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { BlockIcon } from '../../icons/BlockIcons';
import { BLOCK_IMAGES } from '../../icons/CategoryImages';
import { COLORS, FONT, getBlockAppearance } from '../../theme/colors';
import type { BlockData, BlockIndex, BlockSlot, PathIndex } from '../../types/signalFlow';


export interface DraggableEffectListProps {
  blocks: (BlockData | null)[];
  pathIndex: PathIndex;
  selectedSlot: BlockSlot | null;
  onSelectSlot: (slot: BlockSlot) => void;
  onOpenSlotMenu: (slot: BlockSlot) => void;
  onReorder: (pathIndex: PathIndex, fromSlot: number, toSlot: number) => Promise<boolean>;
  onToggleEnabled: (slot: BlockSlot) => void;
  kindLabel: (kind: string) => string;
  /** Called when drag starts — parent should disable ScrollView */
  onDragStart?: () => void;
  /** Called when drag ends — parent should re-enable ScrollView */
  onDragEnd?: () => void;
}

const VisualEffectList: React.FC<DraggableEffectListProps> = React.memo(
  ({
    blocks,
    pathIndex,
    selectedSlot,
    onSelectSlot,
    onOpenSlotMenu,
    onReorder,
    onToggleEnabled,
    kindLabel,
    onDragStart,
    onDragEnd,
  }) => {
    // ── Drag render state ───────────────────────────────────────
    const [dragInfo, setDragInfo] = useState<{
      fromSlot: number;
      targetSlot: number;
      block: BlockData;
    } | null>(null);

    // ── Refs (no re-renders) ──────────────────────────────────
    const dragYAnim = useRef(new Animated.Value(0)).current;
    const isDragReady = useRef(false);
    const containerHasResponder = useRef(false);
    const dragFromSlotRef = useRef(0);
    const dragBlockRef = useRef<BlockData | null>(null);
    const dragTargetRef = useRef(0);

    // Layout measurements
    const containerRef = useRef<ViewInstance>(null);
    const containerPageY = useRef(0);
    const itemYPositions = useRef<number[]>([]);
    const itemHeights = useRef<number[]>([]);

    // ── Visible items ─────────────────────────────────────────
    const lastPopulated = blocks.reduce((last, b, i) => (b ? i : last), -1);
    const visibleCount = Math.min(lastPopulated + 2, 12);

    // ── Layout handlers ───────────────────────────────────────
    const measureContainer = useCallback(() => {
      containerRef.current?.measureInWindow((_x: number, y: number) => {
        containerPageY.current = y;
      });
    }, []);

    const onItemLayout = useCallback((index: number, e: LayoutChangeEvent) => {
      const { y, height } = e.nativeEvent.layout;
      itemYPositions.current[index] = y;
      itemHeights.current[index] = height;
    }, []);

    // ── Compute target slot from screen Y ─────────────────────
    const computeTarget = useCallback(
      (pageY: number): number => {
        const localY = pageY - containerPageY.current;
        for (let i = 0; i < visibleCount; i++) {
          const y = itemYPositions.current[i];
          const h = itemHeights.current[i];
          if (y === undefined || h === undefined) continue;
          if (localY < y + h / 2) return i;
        }
        return Math.max(visibleCount - 1, 0);
      },
      [visibleCount],
    );

    // ── Drag lifecycle ────────────────────────────────────────
    const handleLongPress = useCallback(
      (slotIndex: number, _e: GestureResponderEvent) => {
        const block = blocks[slotIndex];
        if (!block) return;

        // Re-measure container position (may have scrolled)
        measureContainer();

        isDragReady.current = true;
        dragFromSlotRef.current = slotIndex;
        dragBlockRef.current = block;
        dragTargetRef.current = slotIndex;

        // Position overlay at the item's location
        const itemY = itemYPositions.current[slotIndex] ?? 0;
        dragYAnim.setValue(itemY);

        setDragInfo({ fromSlot: slotIndex, targetSlot: slotIndex, block });
        onDragStart?.();
      },
      [blocks, dragYAnim, measureContainer, onDragStart],
    );

    const handlePressOut = useCallback(
      (slotIndex: number) => {
        if (isDragReady.current && !containerHasResponder.current) {
          // Long press happened but user released without dragging → slot menu
          isDragReady.current = false;
          dragBlockRef.current = null;
          setDragInfo(null);
          onDragEnd?.();
          onOpenSlotMenu({ path: pathIndex, block: slotIndex as BlockIndex });
        }
      },
      [onDragEnd, onOpenSlotMenu, pathIndex],
    );

    const cleanupDrag = useCallback(() => {
      isDragReady.current = false;
      containerHasResponder.current = false;
      dragBlockRef.current = null;
      setDragInfo(null);
      onDragEnd?.();
    }, [onDragEnd]);

    // ── Container responder (captures moves during drag) ──────
    const onMoveShouldCapture = useCallback(() => isDragReady.current, []);

    const onGrant = useCallback(() => {
      containerHasResponder.current = true;
    }, []);

    const onMove = useCallback(
      (e: GestureResponderEvent) => {
        const pageY = e.nativeEvent.pageY;
        const cTop = containerPageY.current;
        const halfH = (itemHeights.current[dragFromSlotRef.current] ?? 60) / 2;
        dragYAnim.setValue(pageY - cTop - halfH);

        const t = computeTarget(pageY);
        if (t !== dragTargetRef.current) {
          dragTargetRef.current = t;
          setDragInfo((prev) => (prev ? { ...prev, targetSlot: t } : null));
        }
      },
      [computeTarget, dragYAnim],
    );

    const onRelease = useCallback(() => {
      const from = dragFromSlotRef.current;
      const to = dragTargetRef.current;
      if (from !== to) {
        onReorder(pathIndex, from, to);
      }
      cleanupDrag();
    }, [cleanupDrag, onReorder, pathIndex]);

    // ── Build display-order items ─────────────────────────────
    const buildDisplayItems = (): { block: BlockData | null; realIndex: number }[] => {
      const items: { block: BlockData | null; realIndex: number }[] = [];
      for (let i = 0; i < visibleCount; i++) {
        items.push({ block: blocks[i], realIndex: i });
      }
      if (!dragInfo || dragInfo.fromSlot === dragInfo.targetSlot) return items;

      const result = [...items];
      const [dragged] = result.splice(dragInfo.fromSlot, 1);
      result.splice(dragInfo.targetSlot, 0, dragged);
      return result;
    };

    const displayItems = buildDisplayItems();
    const dragging = dragInfo !== null;

    // ── Render ────────────────────────────────────────────────
    return (
      <View
        ref={containerRef}
        onLayout={measureContainer}
        onMoveShouldSetResponderCapture={onMoveShouldCapture}
        onResponderGrant={onGrant}
        onResponderMove={onMove}
        onResponderRelease={onRelease}
        onResponderTerminate={cleanupDrag}
        style={styles.wrapper}
      >
        <View style={styles.effectList}>
          {displayItems.map((item, displayIdx) => {
            const { block, realIndex } = item;
            const isDraggedItem = dragging && realIndex === dragInfo.fromSlot;

            return (
              <View
                key={`slot-${realIndex}`}
                onLayout={(e) => onItemLayout(displayIdx, e)}
              >
                <EffectRow
                  block={block}
                  realIndex={realIndex}
                  pathIndex={pathIndex}
                  isBeingDragged={isDraggedItem}
                  isSelected={
                    selectedSlot?.path === pathIndex &&
                    selectedSlot?.block === realIndex
                  }
                  onToggleEnabled={() =>
                    onToggleEnabled({
                      path: pathIndex,
                      block: realIndex as BlockIndex,
                    })
                  }
                  kindLabel={kindLabel}
                  onPress={() =>
                    onSelectSlot({
                      path: pathIndex,
                      block: realIndex as BlockIndex,
                    })
                  }
                  onLongPress={(e) => handleLongPress(realIndex, e)}
                  onPressOut={() => handlePressOut(realIndex)}
                />
              </View>
            );
          })}
        </View>

        {/* More slots */}
        {lastPopulated + 2 < 12 && !dragging && (
          <Pressable
            style={styles.moreSlotsBtn}
            onPress={() =>
              onSelectSlot({
                path: pathIndex,
                block: Math.min(lastPopulated + 2, 11) as BlockIndex,
              })
            }
          >
            <Text style={styles.moreSlotsText}>
              {12 - (lastPopulated + 2)} more slots
            </Text>
          </Pressable>
        )}

        {/* Floating drag overlay */}
        {dragging && dragBlockRef.current && (
          <Animated.View
            pointerEvents="none"
            style={[styles.dragOverlay, { top: dragYAnim }]}
          >
            <DragOverlayCard block={dragBlockRef.current} kindLabel={kindLabel} />
          </Animated.View>
        )}
      </View>
    );
  },
);

// ── EffectRow sub-component ─────────────────────────────────────
interface EffectRowProps {
  block: BlockData | null;
  realIndex: number;
  pathIndex: PathIndex;
  isBeingDragged: boolean;
  isSelected: boolean;
  kindLabel: (kind: string) => string;
  onToggleEnabled: () => void;
  onPress: () => void;
  onLongPress: (e: GestureResponderEvent) => void;
  onPressOut: () => void;
}

const EffectRow: React.FC<EffectRowProps> = React.memo(
  ({
    block,
    realIndex,
    isBeingDragged,
    isSelected,
    kindLabel,
    onToggleEnabled,
    onPress,
    onLongPress,
    onPressOut,
  }) => {
    if (!block) {
      return (
        <Pressable accessibilityRole="button" accessibilityLabel={`Add block at position ${realIndex + 1}`} style={styles.emptyRow} onPress={onPress}>
          <View style={styles.emptySlotNum}>
            <Text style={styles.emptySlotNumText}>{realIndex + 1}</Text>
          </View>
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <Path
              d="M12 5v14M5 12h14"
              stroke={COLORS.muted}
              strokeWidth={1.5}
              strokeLinecap="round"
            />
          </Svg>
        </Pressable>
      );
    }

    const enabled = block.enabled !== false;
    const appearance = getBlockAppearance(block.kind, enabled, COLORS.bg);
    const blockImage = BLOCK_IMAGES[block.kind] ?? null;

    if (isBeingDragged) {
      return (
        <View style={styles.dragPlaceholder}>
          <View
            style={[styles.dragPlaceholderBar, { backgroundColor: COLORS.accent }]}
          />
        </View>
      );
    }

    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Edit ${block.name}`}
        accessibilityState={{ selected: isSelected }}
        style={({ pressed }) => [
          styles.effectRow,
          (isSelected || pressed) && styles.effectRowSelected,
        ]}
        onPress={onPress}
        onLongPress={onLongPress}
        onPressOut={onPressOut}
        delayLongPress={350}
      >
        <View
          style={[
            styles.effectIconWrap,
            {
              backgroundColor: appearance.fill,
              borderColor: appearance.outline,
              borderStyle: appearance.outlineStyle,
            },
          ]}
        >
          {blockImage ? (
            <Image
              source={blockImage}
              style={[styles.effectIcon, { tintColor: appearance.icon }]}
              resizeMode="contain"
            />
          ) : (
            <BlockIcon type={block.kind} size={22} color={appearance.icon} />
          )}
        </View>
        <View style={styles.effectInfo}>
          <Text style={[styles.effectName, { color: appearance.name }]} numberOfLines={1}>
            {block.name}
          </Text>
          <Text style={styles.effectKind} numberOfLines={1}>
            {kindLabel(block.kind)}{enabled ? '' : ' · Bypassed'}
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${enabled ? 'Bypass' : 'Enable'} ${block.name}`}
          style={({ pressed }) => [
            styles.powerBtn,
            enabled && { backgroundColor: appearance.fill, borderColor: appearance.accent },
            pressed && styles.powerBtnPressed,
          ]}
          hitSlop={8}
          onPress={(event) => {
            event.stopPropagation?.();
            onToggleEnabled();
          }}
        >
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Path
              d="M12 3v5M16.24 7.76a6 6 0 11-8.49 0"
              stroke={enabled ? appearance.accent : COLORS.muted}
              strokeWidth={2}
              strokeLinecap="round"
            />
          </Svg>
        </Pressable>
      </Pressable>
    );
  },
);

// ── DragOverlayCard sub-component ───────────────────────────────
const DragOverlayCard: React.FC<{
  block: BlockData;
  kindLabel: (kind: string) => string;
}> = React.memo(({ block, kindLabel }) => {
  const enabled = block.enabled !== false;
  const appearance = getBlockAppearance(block.kind, enabled, COLORS.raised);
  const blockImage = BLOCK_IMAGES[block.kind] ?? null;

  return (
    <View style={[styles.effectRow, styles.dragCard, { borderColor: appearance.accent }]}>
      <View
        style={[
          styles.effectIconWrap,
          {
            backgroundColor: appearance.fill,
            borderColor: appearance.outline,
            borderStyle: appearance.outlineStyle,
          },
        ]}
      >
        {blockImage ? (
          <Image
            source={blockImage}
            style={[styles.effectIcon, { tintColor: appearance.icon }]}
            resizeMode="contain"
          />
        ) : (
          <BlockIcon type={block.kind} size={22} color={appearance.icon} />
        )}
      </View>
      <View style={styles.effectInfo}>
        <Text style={[styles.effectName, { color: appearance.name }]} numberOfLines={1}>
          {block.name}
        </Text>
        <Text style={styles.effectKind} numberOfLines={1}>
          {kindLabel(block.kind)}
        </Text>
      </View>
    </View>
  );
});

// ── Styles ──────────────────────────────────────────────────────
const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  effectList: {
    gap: 2,
  },

  /* ── Block row ─────────────────────── */
  effectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 64,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    borderRadius: 0,
  },
  effectRowSelected: {
    backgroundColor: COLORS.panel,
    borderRadius: 12,
    borderTopColor: 'transparent',
  },
  effectIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  effectIcon: { width: 24, height: 24 },
  effectInfo: { flex: 1, gap: 2 },
  effectName: {
    color: COLORS.text,
    ...FONT.semibold,
    fontSize: 17,
  },
  effectKind: {
    color: COLORS.muted,
    ...FONT.body,
    fontSize: 13,
  },
  powerBtn: {
    width: 48,
    height: 48,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.control,
    backgroundColor: COLORS.control,
    alignItems: 'center',
    justifyContent: 'center',
  },
  powerBtnPressed: {
    opacity: 0.8,
  },

  /* ── Empty slot ────────────────────── */
  emptyRow: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.hairline,
    opacity: 0.4,
  },
  emptySlotNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptySlotNumText: {
    color: COLORS.muted,
    ...FONT.numeric,
    fontSize: 10,
  },
  moreSlotsBtn: {
    minHeight: 48,
    paddingVertical: 10,
    paddingHorizontal: 0,
    alignItems: 'center',
  },
  moreSlotsText: {
    color: COLORS.muted,
    ...FONT.numeric,
    fontSize: 11,
    opacity: 0.6,
  },

  /* ── Drag placeholder ──────────────── */
  dragPlaceholder: {
    minHeight: 56,
    marginHorizontal: 16,
    marginVertical: 2,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: COLORS.accent,
    borderStyle: 'dashed',
    backgroundColor: `${COLORS.accent}08`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dragPlaceholderBar: {
    width: 40,
    height: 3,
    borderRadius: 1.5,
    opacity: 0.4,
  },

  /* ── Floating overlay ──────────────── */
  dragOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 100,
  },
  dragCard: {
    borderWidth: 1.5,
    borderRadius: 10,
    backgroundColor: COLORS.panel,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 10,
  },
});

export function DraggableEffectList(props: DraggableEffectListProps) {
  const { accessibleLayout, screenReader } = useAccessibilityPreferences();
  if (!accessibleLayout && !screenReader) return <VisualEffectList {...props} />;
  return <AccessibleEffectList {...props} />;
}
