import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, Image, PanResponder, Platform, ScrollView, StyleSheet, View, type LayoutChangeEvent, type ViewInstance } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { AccessibleText as Text } from '../../accessibility/AccessibleText';
import { useAccessibilityPreferences } from '../../accessibility/AccessibilityPreferences';
import { Action as Pressable } from '../../accessibility/controls';
import { BlockIcon } from '../../icons/BlockIcons';
import { BLOCK_IMAGES } from '../../icons/CategoryImages';
import { COLORS, FONT, getBlockAppearance } from '../../theme/colors';
import { dropRange, movedIndex } from '../../utils/blockMove';
import { branchColumns, computeBranchSegments, isMergeBlock, isRoutingBlock, type BranchSegment } from '../../utils/routingLayout';
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
  selected?: boolean;
  onPress?: () => void;
}

const COLUMNS = 12;
const LANE_GAP = 8;
// Read left to right like the signal: one line in and two out, or two in and one out.
const SPLIT_GLYPH = 'M3 12h7M10 12l9-6M10 12l9 6';
const MERGE_GLYPH = 'M5 6l9 6M5 18l9-6M14 12h7';

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
const columns = Array.from({ length: COLUMNS }, (_, column) => column);
const usableName = (name: string | null | undefined) =>
  name && name !== 'None' && name !== 'Unknown I/O' ? name : null;
const blockName = (block: BlockData) => block.customName?.trim() || block.name;
// Split/merge nodes and the branch ends that link to them keep their positions:
// a move recreates blocks by model, which would drop those links.
const isFixedBlock = (block: BlockData) => isRoutingBlock(block) || typeof block.linkPosition === 'number';
// Let long model names wrap after a slash or hyphen instead of mid-word.
const wrappableName = (block: BlockData) => blockName(block).replace(/([/-])/g, '$1\u200B');

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
  selectedSlot,
  onSelectSlot,
  onOpenSlotMenu,
  onSelectIO,
  onMoveBlock,
  onDragActive,
  kindLabel,
  compact = false,
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
  const g = useMemo(() => (available > 0 ? measure(available, compact) : null), [available, compact]);
  const { reduceMotion } = useAccessibilityPreferences();
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

  const renderTile = (block: BlockData, rowIndex: PathIndex, rowLabel: string, column: number, geometry: Geometry) => {
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
    const moveActions = range ? [
      ...(column > range[0] ? [{ name: 'moveEarlier', label: 'Move earlier' }] : []),
      ...(column < range[1] ? [{ name: 'moveLater', label: 'Move later' }] : []),
    ] : [];
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
          ) : (
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
        {geometry.nameMode === 'below' && (
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
    const right = fullRow || segment.mergeColumn === null
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
    const laneStyle = compact ? styles.miniLane : styles.lane;
    return (
      <View style={{ width: geometry.width, gap: compact ? 4 : LANE_GAP }} {...(compact ? {} : responder.panHandlers)}>
        <View style={[laneStyle, { height: geometry.laneHeight, paddingHorizontal: geometry.padH, paddingVertical: geometry.padV }]}>
          <View style={[styles.wire, { left: geometry.padH + geometry.pillW, right: geometry.padH + (compact ? 0 : geometry.pillW), top: geometry.wireY - 1 }]} />
          {connectorColumns.map((column) => (
            <View key={`a-${column}`} style={[styles.connector, { left: columnCenter(geometry, column) - 1, top: geometry.wireY, height: geometry.laneHeight - geometry.wireY }]} />
          ))}
          {renderPill(rowAIndex, 'input', labelA, usableName(ioA.input) ?? 'Input', geometry, false)}
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
              <View key={`b-${column}`} style={[styles.connector, { left: columnCenter(geometry, column) - 1, top: 0, height: geometry.wireY }]} />
            ))}
            {renderPill(rowBIndex, 'input', labelB, segments.some((segment) => segment.splitColumn === null) ? (usableName(ioB.input) ?? 'Input') : 'From split', geometry, true)}
            <View style={{ width: geometry.gap }} />
            {renderDropTarget(rowBIndex, geometry)}
            <View ref={(view) => { trackRefs.current[rowBIndex] = view; }} style={styles.track}>
              {columns.map((column) => renderCell(rowBIndex, labelB, column, geometry, branch.has(column)))}
            </View>
            {!compact && <View style={{ width: geometry.gap }} />}
            {renderPill(rowBIndex, 'output', labelB, allMerged ? `Into ${labelA}` : (usableName(ioB.output) ?? 'Output'), geometry, allMerged)}
          </View>
        ) : (
          <View style={[laneStyle, styles.laneIdle, { height: laneBHeight, paddingHorizontal: geometry.padH }]}>
            <Text style={[compact ? styles.miniLabel : styles.idleRow, { width: geometry.pillW }]} maxFontSizeMultiplier={1.2}>{labelB}</Text>
            {!compact && <Text style={styles.idleText} maxFontSizeMultiplier={1.2}>No split. Add a split block to row {labelA} to branch here.</Text>}
          </View>
        )}

        {connectorColumns.map((column) => (
          <View key={`gap-${column}`} style={[styles.connector, { left: columnCenter(geometry, column) - 1, top: geometry.laneHeight, height: compact ? 4 : LANE_GAP }]} />
        ))}
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
});
