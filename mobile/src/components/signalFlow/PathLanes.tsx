import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, Image, PanResponder, Platform, ScrollView, StyleSheet, Text as NativeText, View, useWindowDimensions, type LayoutChangeEvent, type NativeScrollEvent, type NativeSyntheticEvent, type ScrollViewInstance, type ViewInstance } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { AccessibleText as Text } from '../../accessibility/AccessibleText';
import { useAccessibilityPreferences } from '../../accessibility/AccessibilityPreferences';
import { Action as Pressable } from '../../accessibility/controls';
import { BlockIcon } from '../../icons/BlockIcons';
import { BLOCK_IMAGES } from '../../icons/CategoryImages';
import { COLORS, FONT, getBlockAppearance } from '../../theme/colors';
import { dropRange, movedIndex } from '../../utils/blockMove';
import { branchColumns, computeBranchSegments, isMergeBlock, isRoutingBlock, linkedColumn, type BranchSegment } from '../../utils/routingLayout';
import { centeredColumnOffset, columnSnapOffsets, measurePhoneLanes, revealColumnOffset, type PhoneLaneMetrics } from '../../utils/phoneLaneLayout';
import type { BlockData, BlockIndex, BlockSlot, IOType, PathIndex } from '../../types/signalFlow';

type RowIO = { input: string | null; output: string | null };

interface PathLanesProps {
  pathNumber: 1 | 2;
  rowA: (BlockData | null)[];
  rowB: (BlockData | null)[];
  ioA: RowIO;
  ioB: RowIO;
  /** Row B has its own input or output block configured. */
  rowBHasIO?: boolean;
  inputALabel?: string | null;
  inputBLabel?: string | null;
  selectedSlot: BlockSlot | null;
  onSelectSlot?: (slot: BlockSlot) => void;
  onOpenSlotMenu?: (slot: BlockSlot) => void;
  onSelectIO?: (row: PathIndex, type: IOType) => void;
  /** Drop a dragged block on another position in the same row. */
  onMoveBlock?: (row: PathIndex, from: number, to: number) => void;
  /** A drag started or ended; parents should stop scrolling while one is active. */
  onDragActive?: (active: boolean) => void;
  kindLabel?: (kind: string) => string;
  /** Phone overview: small solid tiles, no names, the whole path is one target. */
  compact?: boolean;
  /**
   * Phone grid: full-size tiles with names, both rows scrolling sideways
   * together beside fixed row labels. Ignored when `compact` is set.
   */
  phone?: boolean;
  selected?: boolean;
  onPress?: () => void;
}

const COLUMNS = 12;
const LANE_GAP = 8;
const FADE_W = 28;
// Read left to right like the signal: one line in and two out, or two in and one out.
const SPLIT_GLYPH = 'M3 12h7M10 12l9-6M10 12l9 6';
const MERGE_GLYPH = 'M5 6l9 6M5 18l9-6M14 12h7';
const PLUS_GLYPH = 'M12 5v14M5 12h14';

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
const columns = Array.from({ length: COLUMNS }, (_, column) => column);
const usableName = (name: string | null | undefined) =>
  name && name !== 'None' && name !== 'Unknown I/O' ? name : null;
const blockName = (block: BlockData) => block.customName?.trim() || block.name;
// Split/merge nodes and the branch ends that link to them keep their positions:
// a move recreates blocks by model, which would drop those links.
const isFixedBlock = (block: BlockData) => isRoutingBlock(block) || typeof block.linkPosition === 'number';
// Let long model names wrap after a slash or hyphen instead of mid-word.
const wrappableText = (text: string) => text.replace(/([/-])/g, '$1\u200B');
const wrappableName = (block: BlockData) => wrappableText(blockName(block));

type NameMode = 'inside' | 'below' | 'none';

interface DragState {
  row: PathIndex;
  from: number;
  to: number;
  range: [number, number];
  dx: number;
}

interface Geometry {
  width: number;
  padH: number;
  padV: number;
  pillW: number;
  gap: number;
  col: number;
  tile: number;
  nameMode: NameMode;
  laneHeight: number;
  wireY: number;
  trackX: number;
  scroll: boolean;
}

function measure(available: number, compact: boolean): Geometry {
  if (compact) {
    const padH = 6;
    const pillW = 24;
    const gap = 4;
    const col = (available - padH * 2 - pillW - gap - 4) / COLUMNS;
    const tile = clamp(Math.floor(col - 5), 12, 20);
    const padV = 5;
    return { width: available, padH, padV, pillW, gap, col, tile, nameMode: 'none', laneHeight: tile + padV * 2, wireY: padV + tile / 2, trackX: padH + pillW + gap, scroll: false };
  }
  const padH = 8;
  const gap = 8;
  const pillW = clamp(Math.round(available * 0.075), 64, 96);
  let col = (available - padH * 2 - pillW * 2 - gap * 2) / COLUMNS;
  // Narrow windows keep usable targets and scroll sideways instead of shrinking.
  const scroll = col < 50;
  if (scroll) col = 52;
  const tile = clamp(Math.floor(col - 8), 44, 76);
  const nameMode: NameMode = tile >= 70 ? 'inside' : col >= 56 ? 'below' : 'none';
  const padV = 8;
  // Names under the tiles get two lines so long model names stay readable.
  const laneHeight = padV * 2 + tile + (nameMode === 'below' ? 32 : 0);
  const width = scroll ? padH * 2 + pillW * 2 + gap * 2 + col * COLUMNS : available;
  return { width, padH, padV, pillW, gap, col, tile, nameMode, laneHeight, wireY: padV + tile / 2, trackX: padH + pillW + gap, scroll };
}

const RouteGlyph = ({ merge, size }: { merge: boolean; size: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d={merge ? MERGE_GLYPH : SPLIT_GLYPH} stroke={COLORS.text} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Shades a lane edge that has more positions beyond it.
const EdgeFade = ({ id, side, height, opacity }: { id: string; side: 'left' | 'right'; height: number; opacity: Animated.AnimatedInterpolation<number> }) => (
  <Animated.View pointerEvents="none" style={[styles.fade, side === 'left' ? { left: 0 } : { right: 0 }, { height, opacity }]}>
    <Svg width={FADE_W} height={height}>
      <Defs>
        <LinearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor={COLORS.bg} stopOpacity={side === 'left' ? 1 : 0} />
          <Stop offset="1" stopColor={COLORS.bg} stopOpacity={side === 'left' ? 0 : 1} />
        </LinearGradient>
      </Defs>
      <Rect width={FADE_W} height={height} fill={`url(#${id})`} />
    </Svg>
  </Animated.View>
);

/**
 * A grid cell that can slide sideways. While a block is dragged the other
 * cells ease into their previewed positions; the dragged cell tracks the
 * finger. Cells never unmount mid-drag, so the touch is never lost.
 */
function ShiftCell({ offset, animate, lifted, width, children }: { offset: number; animate: boolean; lifted: boolean; width: number; children: React.ReactNode }) {
  const value = useRef(new Animated.Value(offset)).current;
  useEffect(() => {
    if (!animate) {
      value.setValue(offset);
      return;
    }
    Animated.timing(value, { toValue: offset, duration: 140, easing: Easing.out(Easing.cubic), useNativeDriver: Platform.OS !== 'web' }).start();
  }, [animate, offset, value]);
  return (
    <Animated.View style={[{ width, alignItems: 'center', transform: [{ translateX: value }, { scale: lifted ? 1.08 : 1 }] }, lifted && styles.lifted]}>
      {children}
    </Animated.View>
  );
}

/**
 * One path drawn as stacked lanes: row A, then row B beneath it.
 *
 * Both rows share the same twelve columns, so a split, its branch and its
 * merge line up the way they do on the Stadium. Every position is drawn,
 * filled or not, so the grid reads as a grid even in a sparse preset.
 */
export const PathLanes: React.FC<PathLanesProps> = React.memo(({
  pathNumber,
  rowA,
  rowB,
  ioA,
  ioB,
  rowBHasIO = false,
  inputALabel,
  inputBLabel,
  selectedSlot,
  onSelectSlot,
  onOpenSlotMenu,
  onSelectIO,
  onMoveBlock,
  onDragActive,
  kindLabel,
  compact = false,
  phone = false,
  selected = false,
  onPress,
}) => {
  const [available, setAvailable] = useState(0);
  const rowAIndex = ((pathNumber - 1) * 2) as PathIndex;
  const rowBIndex = (rowAIndex + 1) as PathIndex;
  const labelA = `${pathNumber}A`;
  const labelB = `${pathNumber}B`;
  const segments = useMemo(() => computeBranchSegments(rowA, rowB, rowBHasIO), [rowA, rowB, rowBHasIO]);
  const branch = useMemo(() => branchColumns(segments), [segments]);
  const { fontScale } = useWindowDimensions();
  const { reduceMotion, accessibleLayout } = useAccessibilityPreferences();
  const phoneMetrics = useMemo(
    () => (phone && !compact ? measurePhoneLanes(available, fontScale, accessibleLayout) : null),
    [phone, compact, available, fontScale, accessibleLayout],
  );
  const g = useMemo<Geometry | null>(() => {
    if (available <= 0) return null;
    if (phoneMetrics) return { ...phoneMetrics, nameMode: 'below', scroll: true };
    return measure(available, compact);
  }, [available, compact, phoneMetrics]);
  const [drag, setDragState] = useState<DragState | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const dragMoved = useRef(false);
  const trackOrigin = useRef(0);
  const trackRefs = useRef<Partial<Record<PathIndex, ViewInstance | null>>>({});
  const latest = useRef({ onMoveBlock, onDragActive, onOpenSlotMenu, geometry: g, reduceMotion });
  latest.current = { onMoveBlock, onDragActive, onOpenSlotMenu, geometry: g, reduceMotion };

  const setDrag = (next: DragState | null) => {
    dragRef.current = next;
    setDragState(next);
  };

  // Phone lanes scroll sideways; the offset is tracked without re-rendering.
  const scrollRef = useRef<ScrollViewInstance>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollOffset = useRef(0);
  const panning = useRef(false);
  const contentReady = useRef(false);
  const pendingScroll = useRef<number | null>(null);
  const shownPath = useRef<number | null>(null);
  const snapOffsets = useMemo(() => (phoneMetrics && phoneMetrics.maxOffset > 0 ? columnSnapOffsets(phoneMetrics) : undefined), [phoneMetrics]);
  const onLanesScroll = useMemo(() => Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: Platform.OS !== 'web',
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => { scrollOffset.current = event.nativeEvent.contentOffset.x; },
    },
  ), [scrollX]);

  const scrollLanesTo = (x: number, animated: boolean) => {
    scrollOffset.current = x;
    if (!contentReady.current) {
      pendingScroll.current = x;
      return;
    }
    scrollRef.current?.scrollTo({ x, animated });
  };

  const onLanesSized = () => {
    contentReady.current = true;
    if (pendingScroll.current === null) return;
    scrollRef.current?.scrollTo({ x: pendingScroll.current, animated: false });
    pendingScroll.current = null;
  };

  // Keep the selected block in view when the lanes first appear (such as on
  // return from its editor), when switching paths, and when it is chosen
  // somewhere else. Parameter updates never move the lanes, and neither does
  // a selection change while the user is panning.
  const selectedColumn = selectedSlot && (selectedSlot.path === rowAIndex || selectedSlot.path === rowBIndex) ? selectedSlot.block : null;
  const firstOccupiedColumn = columns.find(column => rowA[column] || rowB[column]) ?? 0;
  useEffect(() => {
    if (!phoneMetrics || !g) return;
    const switched = shownPath.current !== pathNumber;
    shownPath.current = pathNumber;
    if (switched) {
      scrollLanesTo(centeredColumnOffset(phoneMetrics, selectedColumn ?? firstOccupiedColumn), false);
      return;
    }
    if (selectedColumn === null || panning.current) return;
    const target = revealColumnOffset(phoneMetrics, selectedColumn, scrollOffset.current);
    if (target !== null) scrollLanesTo(target, !reduceMotion);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneMetrics, pathNumber, selectedColumn, firstOccupiedColumn]);

  const rowBlocks = (rowIndex: PathIndex) => (rowIndex === rowAIndex ? rowA : rowB);

  // Where a block may be dropped: between fixed nodes, and inside its branch on row B.
  const dragRange = (rowIndex: PathIndex, column: number): [number, number] | null => {
    if (!onMoveBlock) return null;
    const range = dropRange(rowBlocks(rowIndex), column, isFixedBlock);
    if (!range || rowIndex === rowAIndex) return range;
    const segment = segments.find((item) => column >= item.from && column <= item.to);
    if (!segment) return null;
    const low = Math.max(range[0], segment.from);
    const high = Math.min(range[1], segment.to);
    return low < high ? [low, high] : null;
  };

  // A long press lifts the block. Dragging then previews the reorder live;
  // releasing without moving opens the block's menu instead.
  const liftBlock = (rowIndex: PathIndex, column: number) => {
    const slot = { path: rowIndex, block: column as BlockIndex };
    const range = dragRange(rowIndex, column);
    if (!range) {
      onOpenSlotMenu?.(slot);
      return;
    }
    dragMoved.current = false;
    trackRefs.current[rowIndex]?.measureInWindow((x) => { trackOrigin.current = x; });
    setDrag({ row: rowIndex, from: column, to: column, range, dx: 0 });
    onDragActive?.(true);
  };

  const endDrag = (commit: boolean) => {
    const current = dragRef.current;
    if (!current) return;
    setDrag(null);
    latest.current.onDragActive?.(false);
    if (!commit) return;
    if (!dragMoved.current) {
      latest.current.onOpenSlotMenu?.({ path: current.row, block: current.from as BlockIndex });
    } else if (current.to !== current.from) {
      latest.current.onMoveBlock?.(current.row, current.from, current.to);
    }
  };

  const responder = useMemo(() => PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => {
      if (!dragRef.current) return false;
      dragMoved.current = true;
      return true;
    },
    onPanResponderTerminationRequest: () => false,
    onPanResponderMove: (_, gesture) => {
      const current = dragRef.current;
      const geometry = latest.current.geometry;
      if (!current || !geometry) return;
      const column = Math.floor((gesture.moveX - trackOrigin.current) / geometry.col);
      const to = clamp(column, current.range[0], current.range[1]);
      // The lifted block can lean a little past the last drop position, no further.
      const reach = geometry.col * 0.4;
      const dx = clamp(gesture.dx, (current.range[0] - current.from) * geometry.col - reach, (current.range[1] - current.from) * geometry.col + reach);
      setDrag({ ...current, to, dx });
    },
    onPanResponderRelease: () => endDrag(true),
    onPanResponderTerminate: () => endDrag(false),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);

  const onLayout = (event: LayoutChangeEvent) => {
    const next = Math.round(event.nativeEvent.layout.width);
    if (next !== available) setAvailable(next);
  };

  const describe = (block: BlockData, row: string, column: number) => {
    const kind = kindLabel ? kindLabel(block.kind) : block.kind;
    return `${blockName(block)}, ${kind}, row ${row}, position ${column + 1}${block.enabled === false ? ', bypassed' : ''}`;
  };

  const moveActionsFor = (range: [number, number] | null, column: number) => (range ? [
    ...(column > range[0] ? [{ name: 'moveEarlier', label: 'Move earlier' }] : []),
    ...(column < range[1] ? [{ name: 'moveLater', label: 'Move later' }] : []),
  ] : []);

  // Phone cells: the tile and the name under it are one target, the full
  // column wide. Split and merge nodes get their names too.
  const renderPhoneBlock = (block: BlockData, rowIndex: PathIndex, rowLabel: string, column: number, m: PhoneLaneMetrics) => {
    const enabled = block.enabled !== false;
    const isSelected = selectedSlot?.path === rowIndex && selectedSlot?.block === column;
    const slot = { path: rowIndex, block: column as BlockIndex };
    const routing = isRoutingBlock(block);
    const merge = routing && isMergeBlock(block);
    const range = routing ? null : dragRange(rowIndex, column);
    const appearance = getBlockAppearance(block.kind, enabled, COLORS.panel);
    const image = BLOCK_IMAGES[block.kind] ?? null;
    const iconSize = Math.round(m.tile * 0.46);
    const node = Math.round(m.tile * 0.5);
    const hint = routing ? undefined
      : range ? 'Opens the block. Touch and hold, then drag to move it.'
        : onOpenSlotMenu ? 'Opens the block. Touch and hold for more options.' : 'Opens the block\'s parameters';
    return (
      <Pressable
        accessibilityLabel={routing ? `${blockName(block)}, ${merge ? 'merge' : 'split'}, row ${rowLabel}, position ${column + 1}` : describe(block, rowLabel, column)}
        accessibilityHint={hint}
        accessibilityState={{ selected: isSelected }}
        accessibilityActions={moveActionsFor(range, column)}
        onAccessibilityAction={(event) => {
          if (event.nativeEvent.actionName === 'moveEarlier') onMoveBlock?.(rowIndex, column, column - 1);
          if (event.nativeEvent.actionName === 'moveLater') onMoveBlock?.(rowIndex, column, column + 1);
        }}
        onPress={onSelectSlot ? () => onSelectSlot(slot) : undefined}
        onLongPress={routing ? (onOpenSlotMenu ? () => onOpenSlotMenu(slot) : undefined) : () => liftBlock(rowIndex, column)}
        onPressOut={routing ? undefined : () => { if (dragRef.current && !dragMoved.current) endDrag(true); }}
        delayLongPress={350}
        style={({ pressed }) => [styles.phoneCell, { width: m.col - 8, height: m.laneHeight - m.padV * 2 }, pressed && styles.phoneCellPressed]}
      >
        {routing ? (
          <View style={{ width: m.tile, height: m.tile, alignItems: 'center', justifyContent: 'center' }}>
            <View style={[styles.routeNode, { width: node, height: node, borderRadius: node / 2 }, isSelected && styles.routeNodeSelected]}>
              <RouteGlyph merge={merge} size={node * 0.52} />
            </View>
          </View>
        ) : (
          <View style={[styles.tile, styles.phoneTile, {
            width: m.tile,
            height: m.tile,
            backgroundColor: appearance.fill,
            borderColor: appearance.outline,
            borderStyle: appearance.outlineStyle,
          }]}>
            {image ? (
              <Image source={image} style={{ width: iconSize, height: iconSize, tintColor: appearance.icon }} resizeMode="contain" />
            ) : (
              <BlockIcon type={block.kind} size={iconSize} color={appearance.icon} />
            )}
          </View>
        )}
        {/* Lane heights are fixed so both rows and their labels line up; screen readers get the full name. */}
        <NativeText
          style={[styles.phoneName, {
            maxWidth: m.col - 8,
            marginTop: m.nameGap,
            fontSize: m.nameSize,
            lineHeight: m.nameLineHeight,
            color: routing || !enabled ? COLORS.muted : COLORS.text,
          }, routing && styles.phoneRouteName]}
          numberOfLines={m.nameLines}
          maxFontSizeMultiplier={2}
        >
          {wrappableName(block)}
        </NativeText>
      </Pressable>
    );
  };

  const renderPhoneEmpty = (rowIndex: PathIndex, rowLabel: string, column: number, m: PhoneLaneMetrics) => (
    <Pressable
      accessibilityLabel={`Add block, row ${rowLabel}, position ${column + 1}`}
      onPress={onSelectSlot ? () => onSelectSlot({ path: rowIndex, block: column as BlockIndex }) : undefined}
      style={[styles.phoneCell, { width: m.col - 8, height: m.laneHeight - m.padV * 2 }]}
    >
      {({ pressed }) => (
        <View style={[styles.phoneEmpty, { width: m.tile, height: m.tile }, pressed && styles.phoneEmptyPressed]}>
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
            <Path d={PLUS_GLYPH} stroke={COLORS.faint} strokeWidth={2} strokeLinecap="round" />
          </Svg>
        </View>
      )}
    </Pressable>
  );

  // Row labels sit outside the scrolling lanes so they stay visible.
  const renderRowLabel = (label: string, m: PhoneLaneMetrics) => (
    <View accessible accessibilityLabel={`Row ${label}`} style={[styles.rowGutter, { height: m.laneHeight, paddingTop: m.padV }]}>
      <View style={{ height: m.tile, justifyContent: 'center' }}>
        <Text style={styles.rowLabel} maxFontSizeMultiplier={2}>{label}</Text>
      </View>
    </View>
  );

  const renderTile = (block: BlockData, rowIndex: PathIndex, rowLabel: string, column: number, geometry: Geometry) => {
    if (phoneMetrics) return renderPhoneBlock(block, rowIndex, rowLabel, column, phoneMetrics);
    const enabled = block.enabled !== false;
    const isSelected = selectedSlot?.path === rowIndex && selectedSlot?.block === column;
    const slot = { path: rowIndex, block: column as BlockIndex };
    if (isRoutingBlock(block)) {
      const merge = isMergeBlock(block);
      const node = clamp(Math.round(geometry.tile * 0.46), 26, 34);
      if (compact) {
        return <View style={[styles.miniNode, { width: geometry.tile * 0.6, height: geometry.tile * 0.6, borderRadius: geometry.tile * 0.3 }]} />;
      }
      return (
        <Pressable
          accessibilityLabel={`${blockName(block)}, ${merge ? 'merge' : 'split'}, row ${rowLabel}, position ${column + 1}`}
          accessibilityState={{ selected: isSelected }}
          onPress={onSelectSlot ? () => onSelectSlot(slot) : undefined}
          onLongPress={onOpenSlotMenu ? () => onOpenSlotMenu(slot) : undefined}
          delayLongPress={350}
          style={{ width: geometry.tile, height: geometry.tile, alignItems: 'center', justifyContent: 'center' }}
        >
          <View style={[styles.routeNode, { width: node, height: node, borderRadius: node / 2 }, isSelected && styles.routeNodeSelected]}>
            <RouteGlyph merge={merge} size={node * 0.52} />
          </View>
          {geometry.nameMode === 'inside' && (
            <Text style={[styles.routeName, { top: geometry.tile / 2 + node / 2 + 3 }]} numberOfLines={1}>{blockName(block)}</Text>
          )}
        </Pressable>
      );
    }
    const appearance = getBlockAppearance(block.kind, enabled, COLORS.panel);
    const image = BLOCK_IMAGES[block.kind] ?? null;
    const range = !compact ? dragRange(rowIndex, column) : null;
    const moveActions = moveActionsFor(range, column);
    if (compact) {
      return (
        <View style={[styles.miniTile, {
          width: geometry.tile,
          height: geometry.tile,
          backgroundColor: enabled ? appearance.accent : COLORS.panel,
          borderColor: appearance.outline,
        }]} />
      );
    }
    const iconSize = Math.round(geometry.tile * (geometry.nameMode === 'inside' ? 0.36 : 0.48));
    return (
      <Pressable
        accessibilityLabel={describe(block, rowLabel, column)}
        accessibilityHint={range ? 'Opens the block. Touch and hold, then drag to move it.' : 'Opens the block\'s parameters'}
        accessibilityState={{ selected: isSelected }}
        accessibilityActions={moveActions}
        onAccessibilityAction={(event) => {
          if (event.nativeEvent.actionName === 'moveEarlier') onMoveBlock?.(rowIndex, column, column - 1);
          if (event.nativeEvent.actionName === 'moveLater') onMoveBlock?.(rowIndex, column, column + 1);
        }}
        onPress={onSelectSlot ? () => onSelectSlot(slot) : undefined}
        onLongPress={() => liftBlock(rowIndex, column)}
        onPressOut={() => { if (dragRef.current && !dragMoved.current) endDrag(true); }}
        delayLongPress={350}
        style={({ pressed }) => [styles.tile, {
          width: geometry.tile,
          height: geometry.tile,
          backgroundColor: appearance.fill,
          borderColor: appearance.outline,
          borderStyle: appearance.outlineStyle,
          justifyContent: geometry.nameMode === 'inside' ? 'flex-start' : 'center',
          paddingTop: geometry.nameMode === 'inside' ? 10 : 0,
        }, pressed && styles.tilePressed]}
      >
        {image ? (
          <Image source={image} style={{ width: iconSize, height: iconSize, tintColor: appearance.icon }} resizeMode="contain" />
        ) : (
          <BlockIcon type={block.kind} size={iconSize} color={appearance.icon} />
        )}
        {geometry.nameMode === 'inside' && (
          <Text style={[styles.tileName, { color: appearance.name }]} numberOfLines={2} maxFontSizeMultiplier={1.2}>{wrappableName(block)}</Text>
        )}
      </Pressable>
    );
  };

  const renderCell = (rowIndex: PathIndex, rowLabel: string, column: number, geometry: Geometry, onBranch: boolean) => {
    const block = rowBlocks(rowIndex)[column] ?? null;
    const dragging = drag?.row === rowIndex;
    const lifted = dragging && column === drag.from;
    const offset = !dragging ? 0 : lifted ? drag.dx : (movedIndex(column, drag.from, drag.to) - column) * geometry.col;
    const isSelected = !!block && selectedSlot?.path === rowIndex && selectedSlot?.block === column && !isRoutingBlock(block);
    // Leave a band of lane colour between the tile and the ring.
    const ringInset = compact ? 4 : 5;
    const ringSize = Math.max(geometry.tile, compact ? 0 : 48) + ringInset * 2;
    return (
      <ShiftCell key={column} width={geometry.col} offset={offset} animate={dragging && !lifted && !reduceMotion} lifted={lifted}>
        {isSelected && (
          <View pointerEvents="none" style={[styles.selectedRing, {
            width: ringSize,
            height: ringSize,
            borderRadius: compact ? 8 : 17,
            top: -ringInset,
            left: (geometry.col - ringSize) / 2,
          }]} />
        )}
        {block ? renderTile(block, rowIndex, rowLabel, column, geometry) : onBranch ? (
          compact ? (
            <View style={[styles.miniEmpty, { width: geometry.tile, height: geometry.tile }]} />
          ) : phoneMetrics ? renderPhoneEmpty(rowIndex, rowLabel, column, phoneMetrics) : (
            <Pressable
              accessibilityLabel={`Add block, row ${rowLabel}, position ${column + 1}`}
              onPress={onSelectSlot ? () => onSelectSlot({ path: rowIndex, block: column as BlockIndex }) : undefined}
              style={({ pressed }) => [styles.emptyCell, { width: geometry.tile, height: geometry.tile }, pressed && styles.emptyCellPressed]}
            >
              <View style={styles.emptyDot} />
            </Pressable>
          )
        ) : (
          <View style={{ width: geometry.tile, height: geometry.tile }} />
        )}
        {geometry.nameMode === 'below' && !phoneMetrics && (
          <Text style={[styles.belowName, { width: geometry.col - 2, color: block && block.enabled !== false ? COLORS.text : COLORS.muted }]} numberOfLines={2} maxFontSizeMultiplier={1.2}>
            {block ? wrappableName(block) : ''}
          </Text>
        )}
      </ShiftCell>
    );
  };

  const renderPill = (rowIndex: PathIndex, type: IOType, label: string, value: string, geometry: Geometry, inactive: boolean) => {
    if (compact) {
      return type === 'input'
        ? <Text style={[styles.miniLabel, { width: geometry.pillW }]} maxFontSizeMultiplier={1.2}>{label}</Text>
        : null;
    }
    const pressable = !!onSelectIO && !inactive;
    if (phoneMetrics) {
      return (
        <Pressable
          accessibilityLabel={`Row ${label} ${type}, ${value}`}
          disabled={!pressable}
          onPress={pressable ? () => onSelectIO?.(rowIndex, type) : undefined}
          style={({ pressed }) => [styles.pill, styles.phonePill, { width: geometry.pillW, height: geometry.laneHeight - geometry.padV * 2 }, inactive && styles.pillInactive, pressed && styles.pillPressed]}
        >
          <NativeText style={styles.phonePillCaption} numberOfLines={1} maxFontSizeMultiplier={2}>
            {type === 'input' ? 'In' : 'Out'}
          </NativeText>
          <NativeText style={[styles.pillValue, { fontSize: phoneMetrics.nameSize, lineHeight: phoneMetrics.nameLineHeight }]} numberOfLines={phoneMetrics.nameLines + 1} maxFontSizeMultiplier={2}>
            {wrappableText(value)}
          </NativeText>
        </Pressable>
      );
    }
    return (
      <Pressable
        accessibilityLabel={`Row ${label} ${type}, ${value}`}
        disabled={!pressable}
        onPress={pressable ? () => onSelectIO?.(rowIndex, type) : undefined}
        style={({ pressed }) => [styles.pill, { width: geometry.pillW, height: geometry.tile, paddingHorizontal: geometry.pillW < 80 ? 7 : 10 }, inactive && styles.pillInactive, pressed && styles.pillPressed]}
      >
        <Text style={type === 'input' ? styles.pillRow : styles.pillCaption} numberOfLines={1} maxFontSizeMultiplier={1.2}>
          {type === 'input' ? label : 'Out'}
        </Text>
        <Text style={type === 'input' ? styles.pillCaption : styles.pillValue} numberOfLines={2} maxFontSizeMultiplier={1.2}>{value}</Text>
      </Pressable>
    );
  };

  const columnCenter = (geometry: Geometry, column: number) => geometry.trackX + geometry.col * column + geometry.col / 2;

  const renderBranchWires = (geometry: Geometry, segment: BranchSegment, key: number) => {
    const fullRow = segment.splitColumn === null;
    const left = fullRow ? geometry.padH + geometry.pillW : columnCenter(geometry, segment.from);
    const right = segment.mergeColumn === null
      ? geometry.width - geometry.padH - geometry.pillW
      : columnCenter(geometry, segment.to);
    return <View key={`wire-${key}`} style={[styles.wire, { left, width: Math.max(right - left, 2), top: geometry.wireY - 1 }]} />;
  };

  const connectorColumns = segments.flatMap((segment) =>
    [segment.splitColumn, segment.mergeColumn].filter((column): column is number => column !== null));

  // Dashed outline where the lifted block will land.
  const renderDropTarget = (rowIndex: PathIndex, geometry: Geometry) => {
    if (drag?.row !== rowIndex) return null;
    return (
      <View pointerEvents="none" style={[styles.dropTarget, {
        left: geometry.trackX + geometry.col * drag.to + (geometry.col - geometry.tile) / 2,
        top: geometry.padV,
        width: geometry.tile,
        height: geometry.tile,
      }]} />
    );
  };

  const renderLanes = (geometry: Geometry) => {
    const bActive = segments.length > 0;
    const allMerged = bActive && segments.every((segment) => segment.mergeColumn !== null);
    const laneBHeight = bActive ? geometry.laneHeight : compact ? 12 : 40;
    const laneStyle = compact ? styles.miniLane : phoneMetrics ? [styles.lane, styles.phoneLane] : styles.lane;
    return (
      <View style={{ width: geometry.width, gap: compact ? 4 : LANE_GAP }} {...(compact ? {} : responder.panHandlers)}>
        <View style={[laneStyle, { height: geometry.laneHeight, paddingHorizontal: geometry.padH, paddingVertical: geometry.padV }]}>
          <View style={[styles.wire, { left: geometry.padH + geometry.pillW, right: geometry.padH + (compact ? 0 : geometry.pillW), top: geometry.wireY - 1 }]} />
          {connectorColumns.map((column) => (
            <View key={`a-${column}`} style={[styles.connector, { left: columnCenter(geometry, column) - 1, top: geometry.wireY, height: geometry.laneHeight - geometry.wireY }]} />
          ))}
          {renderPill(rowAIndex, 'input', labelA, inputALabel ?? usableName(ioA.input) ?? 'Input', geometry, !!inputALabel)}
          {!compact && <View style={{ width: geometry.gap }} />}
          {compact && <View style={{ width: geometry.gap }} />}
          {renderDropTarget(rowAIndex, geometry)}
          <View ref={(view) => { trackRefs.current[rowAIndex] = view; }} style={styles.track}>
            {columns.map((column) => renderCell(rowAIndex, labelA, column, geometry, true))}
          </View>
          {!compact && <View style={{ width: geometry.gap }} />}
          {renderPill(rowAIndex, 'output', labelA, usableName(ioA.output) ?? 'Output', geometry, false)}
        </View>

        {bActive ? (
          <View style={[laneStyle, { height: laneBHeight, paddingHorizontal: geometry.padH, paddingVertical: geometry.padV }]}>
            {segments.map((segment, index) => renderBranchWires(geometry, segment, index))}
            {connectorColumns.map((column) => (
              <View key={`b-${column}`} style={[styles.connector, { left: columnCenter(geometry, linkedColumn(rowA[column], column)) - 1, top: 0, height: geometry.wireY }]} />
            ))}
            {renderPill(rowBIndex, 'input', labelB, inputBLabel ?? (segments.some((segment) => segment.splitColumn === null) ? (usableName(ioB.input) ?? 'Input') : 'From split'), geometry, !!inputBLabel || !segments.some((segment) => segment.splitColumn === null))}
            <View style={{ width: geometry.gap }} />
            {renderDropTarget(rowBIndex, geometry)}
            <View ref={(view) => { trackRefs.current[rowBIndex] = view; }} style={styles.track}>
              {columns.map((column) => renderCell(rowBIndex, labelB, column, geometry, branch.has(column)))}
            </View>
            {!compact && <View style={{ width: geometry.gap }} />}
            {renderPill(rowBIndex, 'output', labelB, allMerged ? `Into ${labelA}` : (usableName(ioB.output) ?? 'Output'), geometry, allMerged)}
          </View>
        ) : phoneMetrics ? null : (
          <View style={[laneStyle, styles.laneIdle, { height: laneBHeight, paddingHorizontal: geometry.padH }]}>
            <Text style={[compact ? styles.miniLabel : styles.idleRow, { width: geometry.pillW }]} maxFontSizeMultiplier={1.2}>{labelB}</Text>
            {!compact && <Text style={styles.idleText} maxFontSizeMultiplier={1.2}>No split. Add a split block to row {labelA} to branch here.</Text>}
          </View>
        )}

        <Svg pointerEvents="none" width={geometry.width} height={compact ? 4 : LANE_GAP}
          style={{ position: 'absolute', left: 0, top: geometry.laneHeight }}>
          {connectorColumns.map(column => <Path key={`gap-${column}`}
            d={`M ${columnCenter(geometry, column)} 0 L ${columnCenter(geometry, linkedColumn(rowA[column], column))} ${compact ? 4 : LANE_GAP}`}
            stroke={COLORS.wire} strokeWidth={2} fill="none" />)}
        </Svg>
      </View>
    );
  };

  const filled = [...rowA, ...rowB].filter((block) => block && !isRoutingBlock(block)).length;

  if (compact) {
    return (
      <Pressable
        accessibilityLabel={`Path ${pathNumber}, ${filled} ${filled === 1 ? 'block' : 'blocks'}${selected ? ', selected' : ''}`}
        accessibilityState={{ selected }}
        onPress={onPress}
        style={({ pressed }) => [styles.miniPath, selected && styles.miniPathSelected, pressed && styles.miniPathPressed]}
      >
        <View onLayout={onLayout}>{g ? renderLanes(g) : <View style={{ height: 52 }} />}</View>
      </Pressable>
    );
  }

  if (phoneMetrics) {
    const m = phoneMetrics;
    if (!g) return <View onLayout={onLayout} style={{ height: m.laneHeight * 2 + LANE_GAP }} />;
    const bActive = segments.length > 0;
    const lanesHeight = bActive ? m.laneHeight * 2 + LANE_GAP : m.laneHeight;
    const scrolls = m.maxOffset > 0;
    const thumbW = scrolls ? Math.max(32, Math.round((m.viewport * m.viewport) / m.width)) : 0;
    return (
      <View onLayout={onLayout}>
        {scrolls && <Text style={styles.phoneGridHint} maxFontSizeMultiplier={2}>Swipe across to explore. Tap a block to edit.</Text>}
        <View style={styles.phoneGrid}>
          <View style={{ width: m.gutterW, gap: LANE_GAP }}>
            {renderRowLabel(labelA, m)}
            {bActive && renderRowLabel(labelB, m)}
          </View>
          <View style={{ width: m.viewport, height: lanesHeight }}>
            <Animated.ScrollView
              ref={scrollRef}
              horizontal
              scrollEnabled={!drag}
              showsHorizontalScrollIndicator={false}
              onScroll={onLanesScroll}
              scrollEventThrottle={16}
              onScrollBeginDrag={() => { panning.current = true; }}
              onScrollEndDrag={() => { panning.current = false; }}
              onMomentumScrollBegin={() => { panning.current = true; }}
              onMomentumScrollEnd={() => { panning.current = false; }}
              onContentSizeChange={onLanesSized}
              snapToOffsets={snapOffsets}
              style={{ width: m.viewport, height: lanesHeight }}
            >
              {renderLanes(g)}
            </Animated.ScrollView>
            {scrolls && (
              <EdgeFade
                id={`lanes-${pathNumber}-start`}
                side="left"
                height={lanesHeight}
                opacity={scrollX.interpolate({ inputRange: [0, FADE_W], outputRange: [0, 1], extrapolate: 'clamp' })}
              />
            )}
            {scrolls && (
              <EdgeFade
                id={`lanes-${pathNumber}-end`}
                side="right"
                height={lanesHeight}
                opacity={scrollX.interpolate({ inputRange: [m.maxOffset - FADE_W, m.maxOffset], outputRange: [1, 0], extrapolate: 'clamp' })}
              />
            )}
          </View>
        </View>
        {!bActive && (
          <View style={styles.phoneIdle}>
            <View style={{ width: m.gutterW, alignItems: 'center' }}>
              <Text style={[styles.rowLabel, styles.rowLabelIdle]} maxFontSizeMultiplier={2}>{labelB}</Text>
            </View>
            <Text style={styles.phoneIdleText} maxFontSizeMultiplier={2}>No split. Add a split block to row {labelA} to branch here.</Text>
          </View>
        )}
        {/* Shows how much of the row is in view and that the rest is a swipe away. */}
        {scrolls && (
          <View pointerEvents="none" style={[styles.scrollTrack, { marginLeft: m.gutterW, width: m.viewport }]}>
            <Animated.View style={[styles.scrollThumb, {
              width: thumbW,
              transform: [{ translateX: scrollX.interpolate({ inputRange: [0, m.maxOffset], outputRange: [0, m.viewport - thumbW], extrapolate: 'clamp' }) }],
            }]} />
          </View>
        )}
      </View>
    );
  }

  return (
    <View onLayout={onLayout}>
      {g ? (g.scroll ? (
        <ScrollView horizontal scrollEnabled={!drag} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 8 }}>
          {renderLanes(g)}
        </ScrollView>
      ) : renderLanes(g)) : <View style={{ height: 180 }} />}
    </View>
  );
});

const styles = StyleSheet.create({
  lane: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 14,
    backgroundColor: COLORS.panel,
  },
  laneIdle: {
    alignItems: 'center',
    gap: 8,
    opacity: 0.85,
  },
  track: {
    flexDirection: 'row',
  },
  wire: {
    position: 'absolute',
    height: 2,
    backgroundColor: COLORS.wire,
  },
  connector: {
    position: 'absolute',
    width: 2,
    backgroundColor: COLORS.wire,
  },
  pill: {
    borderRadius: 10,
    backgroundColor: COLORS.raised,
    paddingHorizontal: 10,
    justifyContent: 'center',
    gap: 2,
  },
  pillInactive: {
    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.stroke,
  },
  pillPressed: {
    backgroundColor: COLORS.stroke,
  },
  pillRow: {
    color: COLORS.text,
    ...FONT.bold,
    fontSize: 15,
  },
  pillCaption: {
    color: COLORS.muted,
    ...FONT.body,
    fontSize: 12,
  },
  pillValue: {
    color: COLORS.text,
    ...FONT.semibold,
    fontSize: 13,
  },
  tile: {
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 2,
  },
  tilePressed: {
    transform: [{ scale: 0.97 }],
  },
  tileName: {
    ...FONT.semibold,
    fontSize: 11,
    lineHeight: 13,
    textAlign: 'center',
  },
  lifted: {
    zIndex: 10,
  },
  dropTarget: {
    position: 'absolute',
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.accent,
    backgroundColor: 'rgba(236, 233, 225, 0.06)',
  },
  belowName: {
    marginTop: 4,
    ...FONT.semibold,
    fontSize: 11,
    lineHeight: 14,
    textAlign: 'center',
  },
  selectedRing: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
  emptyCell: {
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.035)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCellPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
  },
  emptyDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#4a4a53',
    backgroundColor: COLORS.panel,
  },
  routeNode: {
    borderWidth: 2,
    borderColor: '#9a9aa3',
    backgroundColor: '#202025',
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeNodeSelected: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.raised,
  },
  routeName: {
    position: 'absolute',
    left: -6,
    right: -6,
    color: COLORS.muted,
    ...FONT.body,
    fontSize: 11,
    textAlign: 'center',
  },
  idleRow: {
    color: COLORS.muted,
    ...FONT.bold,
    fontSize: 15,
    paddingLeft: 10,
  },
  idleText: {
    flex: 1,
    color: COLORS.muted,
    ...FONT.body,
    fontSize: 13,
  },
  miniPath: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    padding: 3,
  },
  miniPathSelected: {
    borderColor: COLORS.accent,
  },
  miniPathPressed: {
    backgroundColor: COLORS.hairline,
  },
  miniLane: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: COLORS.panel,
  },
  miniLabel: {
    color: COLORS.text,
    ...FONT.bold,
    fontSize: 12,
  },
  miniTile: {
    borderRadius: 5,
    borderWidth: 2,
  },
  miniNode: {
    borderWidth: 2,
    borderColor: '#9a9aa3',
    backgroundColor: '#202025',
  },
  miniEmpty: {
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.045)',
  },
  phoneGrid: {
    flexDirection: 'row',
  },
  phoneGridHint: { color: COLORS.muted, ...FONT.body, fontSize: 13, marginBottom: 10 },
  rowGutter: {
    alignItems: 'center',
    backgroundColor: COLORS.panel,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: COLORS.stroke,
  },
  rowLabel: {
    color: COLORS.text,
    ...FONT.bold,
    fontSize: 15,
  },
  rowLabelIdle: {
    color: COLORS.muted,
  },
  phoneLane: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  phoneCell: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  phoneCellPressed: {
    transform: [{ scale: 0.97 }],
  },
  phoneTile: {
    justifyContent: 'center',
  },
  phoneName: {
    ...FONT.semibold,
    textAlign: 'center',
  },
  // Sits on the branch wire like a label, hiding the line behind the text.
  phoneRouteName: {
    backgroundColor: COLORS.panel,
    paddingHorizontal: 4,
    borderRadius: 4,
    overflow: 'hidden',
  },
  phoneEmpty: {
    borderRadius: 12,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#3a3a42',
    backgroundColor: COLORS.panelAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneEmptyPressed: {
    backgroundColor: COLORS.raised,
  },
  phonePill: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  phonePillCaption: {
    color: COLORS.muted,
    ...FONT.body,
    fontSize: 13,
    lineHeight: 17,
  },
  phoneIdle: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    marginTop: LANE_GAP,
    paddingVertical: 10,
    paddingRight: 12,
    borderRadius: 14,
    backgroundColor: COLORS.panel,
  },
  phoneIdleText: {
    flex: 1,
    color: COLORS.muted,
    ...FONT.body,
    fontSize: 14,
  },
  fade: {
    position: 'absolute',
    top: 0,
    width: FADE_W,
  },
  scrollTrack: {
    height: 4,
    marginTop: 10,
    borderRadius: 2,
    backgroundColor: COLORS.hairline,
    overflow: 'hidden',
  },
  scrollThumb: {
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.faint,
  },
});
