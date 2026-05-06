import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { BlockIcon } from '../../icons/BlockIcons';
import { BLOCK_IMAGES } from '../../icons/CategoryImages';
import { COLORS, FONTS, colorWithAlpha, getBlockAppearance } from '../../theme/colors';
import type { BlockData, BlockSlot, PathIndex } from '../../types/signalFlow';

interface PathChainStripProps {
  rowLabel: string;
  blocks: (BlockData | null)[];
  pathIndex: PathIndex;
  selectedSlot: BlockSlot | null;
  onSelectSlot: (slot: BlockSlot) => void;
  onOpenSlotMenu?: (slot: BlockSlot) => void;
  ioInputName?: string | null;
  ioOutputName?: string | null;
  onSelectInput?: () => void;
  onSelectOutput?: () => void;
  inputDisabled?: boolean;
  /** Wider screens get bigger tiles to fill space comfortably. */
  tileSize?: number;
}

const DEFAULT_TILE_SIZE = 56;
const TILE_GAP = 6;

const InputIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 12h13m0 0l-4-4m4 4l-4 4M19 6v12" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const OutputIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M21 12H8m0 0l4-4m-4 4l4 4M5 6v12" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const EndpointTile: React.FC<{
  type: 'input' | 'output';
  name: string;
  onPress?: () => void;
  disabled?: boolean;
}> = ({ type, name, onPress, disabled }) => (
  <Pressable onPress={onPress} disabled={!onPress || disabled} style={[styles.endpoint, disabled && styles.endpointDisabled]}>
    <View style={styles.endpointGlyph}>
      {type === 'input' ? <InputIcon size={20} color={COLORS.muted} /> : <OutputIcon size={20} color={COLORS.muted} />}
    </View>
    <Text style={styles.endpointLabel} numberOfLines={1}>
      {name || (type === 'input' ? 'Input' : 'Output')}
    </Text>
  </Pressable>
);

/**
 * Compact horizontal chain strip for one signal-path row (e.g., 1A).
 *
 * Shows the input endpoint, every populated block as a coloured icon tile, then
 * the output endpoint. Read-only-ish: tap a tile to select it (the detail list
 * below the strip handles drag-to-reorder and long-press menus). Empty trailing
 * slots are not rendered — the user adds blocks from the detail list.
 *
 * The visual language deliberately echoes the desktop Helix Editor: each tile
 * is a coloured square with the block's category glyph; the chain reads
 * left-to-right with simple connector lines between tiles.
 */
export const PathChainStrip: React.FC<PathChainStripProps> = React.memo(({
  rowLabel,
  blocks,
  pathIndex,
  selectedSlot,
  onSelectSlot,
  onOpenSlotMenu,
  ioInputName,
  ioOutputName,
  onSelectInput,
  onSelectOutput,
  inputDisabled,
  tileSize: tileSizeProp,
}) => {
  const tileSize = tileSizeProp ?? DEFAULT_TILE_SIZE;
  const tileIconSize = tileSize - 16;
  const tileGlyphSize = tileSize - 24;
  // Show every populated tile, plus one empty trailing tile as an "add" hint
  // so the chain doesn't feel truncated when the row is short.
  const lastPopulated = blocks.reduce((last, b, i) => (b ? i : last), -1);
  const visibleCount = Math.min(lastPopulated + 2, blocks.length);
  const visible = blocks.slice(0, Math.max(visibleCount, 1));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{rowLabel}</Text>
        <View style={styles.rule} />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={{ height: tileSize, justifyContent: 'center' }}>
          <EndpointTile
            type="input"
            name={inputDisabled ? 'From split' : ioInputName ?? '—'}
            onPress={onSelectInput}
            disabled={inputDisabled}
          />
        </View>
        <View style={styles.connector} />
        {visible.map((block, slotIndex) => {
          const isSelected = selectedSlot?.path === pathIndex && selectedSlot?.block === slotIndex;
          const isLast = slotIndex === visible.length - 1;
          return (
            <React.Fragment key={`tile-${pathIndex}-${slotIndex}`}>
              {block ? (
                <Pressable
                  onPress={() => onSelectSlot({ path: pathIndex, block: slotIndex as any })}
                  onLongPress={
                    onOpenSlotMenu
                      ? () => onOpenSlotMenu({ path: pathIndex, block: slotIndex as any })
                      : undefined
                  }
                  delayLongPress={350}
                  style={({ pressed }) => {
                    const enabled = block.enabled !== false;
                    const appearance = getBlockAppearance(block.kind, enabled);
                    return [
                      styles.tile,
                      { width: tileSize, height: tileSize },
                      {
                        backgroundColor: isSelected ? appearance.selectedSurface : appearance.surface,
                        borderColor: isSelected ? appearance.selectedBorder : appearance.border,
                      },
                      pressed && styles.tilePressed,
                    ];
                  }}
                >
                  {(() => {
                    const enabled = block.enabled !== false;
                    const appearance = getBlockAppearance(block.kind, enabled);
                    const blockImage = BLOCK_IMAGES[block.kind] ?? null;
                    return (
                      <>
                        <View style={[styles.tileBar, { backgroundColor: appearance.topBar }]} />
                        <View
                          style={[
                            styles.tileIconWrap,
                            {
                              width: tileIconSize,
                              height: tileIconSize,
                              backgroundColor: appearance.iconSurface,
                            },
                          ]}
                        >
                          {blockImage ? (
                            <Image
                              source={blockImage}
                              style={{ width: tileGlyphSize, height: tileGlyphSize }}
                              resizeMode="contain"
                            />
                          ) : (
                            <BlockIcon type={block.kind} size={Math.round(tileGlyphSize * 0.7)} color={appearance.power} />
                          )}
                        </View>
                        {!enabled && <View style={styles.tileBypassBadge} />}
                      </>
                    );
                  })()}
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => onSelectSlot({ path: pathIndex, block: slotIndex as any })}
                  style={[styles.emptyTile, { width: tileSize, height: tileSize }]}
                >
                  <Text style={styles.emptyPlus}>+</Text>
                </Pressable>
              )}
              {!isLast && <View style={styles.connector} />}
            </React.Fragment>
          );
        })}
        <View style={styles.connector} />
        <View style={{ height: tileSize, justifyContent: 'center' }}>
          <EndpointTile
            type="output"
            name={ioOutputName ?? '—'}
            onPress={onSelectOutput}
          />
        </View>
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    color: COLORS.muted,
    fontFamily: FONTS.mono,
    fontSize: 10.5,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    minWidth: 22,
  },
  rule: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.stroke,
  },
  scrollContent: {
    paddingVertical: 4,
    paddingRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: TILE_GAP,
  },
  tile: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tilePressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
  tileBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 3,
  },
  tileIconWrap: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileBypassBadge: {
    position: 'absolute',
    bottom: 6,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.muted,
    opacity: 0.6,
  },
  emptyTile: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyPlus: {
    color: COLORS.muted,
    fontSize: 18,
    fontFamily: FONTS.body,
    opacity: 0.55,
  },
  connector: {
    width: 14,
    height: 2,
    borderRadius: 1,
    backgroundColor: colorWithAlpha(COLORS.muted, 0.35),
  },
  endpoint: {
    width: 56,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  endpointDisabled: {
    opacity: 0.45,
  },
  endpointGlyph: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.panelAlt,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    alignItems: 'center',
    justifyContent: 'center',
  },
  endpointLabel: {
    color: COLORS.muted,
    fontFamily: FONTS.mono,
    fontSize: 9,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    textAlign: 'center',
    maxWidth: 64,
  },
});
