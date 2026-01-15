import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BlockRow } from './BlockRow';
import { Connector } from './Connector';
import { SplitMergeIcon } from './SplitMergeIcon';
import { IONode } from './IONode';
import { COLORS } from '../../theme/colors';
import type { IOType, SplitSectionProps } from '../../types/signalFlow';

export const SplitSection: React.FC<SplitSectionProps> = React.memo(({
  pathA,
  pathB,
  pathAIndex,
  pathBIndex,
  io,
  selectedSlot,
  onSelectSlot,
  onSelectIO,
}) => {
  const inputADisabled = pathAIndex % 2 === 1;
  const inputBDisabled = pathBIndex % 2 === 1;
  return (
    <View style={styles.container}>
      <Connector width={8} />
      <SplitMergeIcon type="split" />
      <Connector width={8} />
      <View style={styles.parallelContainer}>
        <View style={styles.row}>
          <IONode
            type="input"
            label="A In"
            value={inputADisabled ? 'From Split' : io?.[pathAIndex]?.input?.name ?? '—'}
            onPress={inputADisabled ? undefined : () => onSelectIO(pathAIndex, 'input' as IOType)}
            disabled={inputADisabled}
          />
        <Connector width={8} />
        <BlockRow
          blocks={pathA}
          pathIndex={pathAIndex}
          selectedSlot={selectedSlot}
          onSelectSlot={onSelectSlot}
          label="A"
        />
        <Connector width={8} />
        <IONode
          type="output"
          label="A Out"
          value={io?.[pathAIndex]?.output?.name ?? '—'}
          onPress={() => onSelectIO(pathAIndex, 'output' as IOType)}
        />
        </View>
        <View style={styles.row}>
          <IONode
            type="input"
            label="B In"
            value={inputBDisabled ? 'From Split' : io?.[pathBIndex]?.input?.name ?? '—'}
            onPress={inputBDisabled ? undefined : () => onSelectIO(pathBIndex, 'input' as IOType)}
            disabled={inputBDisabled}
          />
        <Connector width={8} />
        <BlockRow
          blocks={pathB}
          pathIndex={pathBIndex}
          selectedSlot={selectedSlot}
          onSelectSlot={onSelectSlot}
          label="B"
        />
        <Connector width={8} />
        <IONode
          type="output"
          label="B Out"
          value={io?.[pathBIndex]?.output?.name ?? '—'}
          onPress={() => onSelectIO(pathBIndex, 'output' as IOType)}
        />
        </View>
      </View>
      <Connector width={8} />
      <SplitMergeIcon type="merge" />
      <Connector width={8} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  parallelContainer: {
    borderWidth: 1,
    borderColor: COLORS.stroke,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
