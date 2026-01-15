import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BlockCard } from './BlockCard';
import { COLORS, FONTS } from '../../theme/colors';
import type { BlockIndex, BlockRowProps } from '../../types/signalFlow';

const BLOCK_COUNT = 12;

// Pre-generate indices for consistent keys
const BLOCK_INDICES = Array.from({ length: BLOCK_COUNT }, (_, i) => i) as BlockIndex[];

export const BlockRow: React.FC<BlockRowProps> = React.memo(({
  blocks,
  pathIndex,
  selectedSlot,
  onSelectSlot,
  label,
}) => {
  const isSlotSelected = useCallback(
    (blockIndex: BlockIndex): boolean => {
      return selectedSlot?.path === pathIndex && selectedSlot?.block === blockIndex;
    },
    [selectedSlot, pathIndex]
  );

  const handleSelectSlot = useCallback(
    (blockIndex: BlockIndex) => {
      onSelectSlot({ path: pathIndex, block: blockIndex });
    },
    [onSelectSlot, pathIndex]
  );

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.row}>
        {BLOCK_INDICES.map((index) => (
          <BlockCard
            key={`block-${pathIndex}-${index}`}
            block={blocks[index] ?? null}
            index={index}
            isSelected={isSlotSelected(index)}
            showConnector={index < BLOCK_COUNT - 1}
            onPress={() => handleSelectSlot(index)}
          />
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: COLORS.muted,
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '600',
    marginRight: 8,
    width: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
