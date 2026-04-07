import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BlockRow } from './BlockRow';
import { Connector } from './Connector';
import { IONode } from './IONode';
import { SplitSection } from './SplitSection';
import { COLORS, FONTS } from '../../theme/colors';
import type { IOType, PathIndex, SignalPathProps } from '../../types/signalFlow';

export const SignalPath: React.FC<SignalPathProps> = React.memo(({
  pathNumber,
  grid,
  io,
  selectedSlot,
  onSelectSlot,
  onOpenSlotMenu,
  onSelectIO,
}) => {
  const primaryIndex: PathIndex = pathNumber === 1 ? 0 : 2;
  const splitIndex: PathIndex = pathNumber === 1 ? 1 : 3;

  const hasSplit = useMemo(() => {
    const hasBlocks = grid[splitIndex]?.some((block) => block !== null) ?? false;
    const inputModel = io?.[splitIndex]?.input?.modelId ?? null;
    const outputModel = io?.[splitIndex]?.output?.modelId ?? null;
    return hasBlocks || inputModel !== null || outputModel !== null;
  }, [grid, io, splitIndex]);

  const renderRow = (rowIndex: PathIndex, label?: string) => {
    const inputDisabled = rowIndex % 2 === 1;
    return (
      <View style={styles.row}>
        <IONode
          type="input"
          label={label ? `${label} In` : 'Input'}
          value={inputDisabled ? 'From Split' : io?.[rowIndex]?.input?.name ?? '—'}
          onPress={inputDisabled ? undefined : () => onSelectIO(rowIndex, 'input' as IOType)}
          disabled={inputDisabled}
        />
      <Connector width={8} />
      <BlockRow
        blocks={grid[rowIndex]}
        pathIndex={rowIndex}
        selectedSlot={selectedSlot}
        onSelectSlot={onSelectSlot}
        onOpenSlotMenu={onOpenSlotMenu}
        label={label}
      />
      <Connector width={8} />
      <IONode
        type="output"
        label={label ? `${label} Out` : 'Output'}
        value={io?.[rowIndex]?.output?.name ?? '—'}
        onPress={() => onSelectIO(rowIndex, 'output' as IOType)}
      />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.pathBadge}>
          <Text style={styles.pathNumber}>{pathNumber}</Text>
        </View>
        <Text style={styles.pathLabel}>Signal Path {pathNumber}</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scroll}
      >
        <View style={styles.flow}>
          {hasSplit ? (
            <SplitSection
              pathA={grid[primaryIndex]}
              pathB={grid[splitIndex]}
              pathAIndex={primaryIndex}
              pathBIndex={splitIndex}
              io={io}
              selectedSlot={selectedSlot}
              onSelectSlot={onSelectSlot}
              onOpenSlotMenu={onOpenSlotMenu}
              onSelectIO={onSelectIO}
            />
          ) : (
            renderRow(primaryIndex)
          )}
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
    paddingHorizontal: 4,
  },
  pathBadge: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: COLORS.stroke,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pathNumber: {
    color: COLORS.text,
    fontFamily: FONTS.mono,
    fontSize: 12,
  },
  pathLabel: {
    color: COLORS.text,
    fontFamily: FONTS.bodySemi,
    fontSize: 14,
    letterSpacing: 0.5,
  },
  scroll: {
    marginHorizontal: -16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  flow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
