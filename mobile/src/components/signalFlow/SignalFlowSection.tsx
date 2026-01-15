import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SignalPath } from './SignalPath';
import { COLORS, FONTS } from '../../theme/colors';
import type { BlockData, BlockSlot, IOGrid, IOType, PathIndex, SignalFlowGrid } from '../../types/signalFlow';

interface SignalFlowSectionProps {
  grid: SignalFlowGrid;
  io: IOGrid;
  selectedSlot: BlockSlot | null;
  onSelectSlot: (slot: BlockSlot) => void;
  onSelectIO: (row: PathIndex, ioType: IOType) => void;
  onSync: () => void;
}

export const SignalFlowSection: React.FC<SignalFlowSectionProps> = ({
  grid,
  io,
  selectedSlot,
  onSelectSlot,
  onSelectIO,
  onSync,
}) => {
  const DSP_CAP = 70;
  const usage = useMemo(() => {
    const sumRow = (row: Array<null | BlockData>) =>
      row.reduce((acc, cell) => acc + (cell?.usage ?? 0), 0);
    return {
      path1: sumRow(grid[0]) + sumRow(grid[1]),
      path2: sumRow(grid[2]) + sumRow(grid[3]),
    };
  }, [grid]);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>SIGNAL FLOW</Text>
        <Pressable style={styles.syncButton} onPress={onSync}>
          <Text style={styles.syncText}>Sync</Text>
        </Pressable>
      </View>

      <View style={styles.usageRow}>
        <Text style={styles.usageLabel}>Path 1: {usage.path1.toFixed(1)}/{DSP_CAP}</Text>
        <View style={styles.usageTrack}>
          <View
            style={[
              styles.usageFill,
              { width: `${Math.min(usage.path1 / DSP_CAP, 1) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.usageLabel}>Path 2: {usage.path2.toFixed(1)}/{DSP_CAP}</Text>
        <View style={styles.usageTrack}>
          <View
            style={[
              styles.usageFill,
              { width: `${Math.min(usage.path2 / DSP_CAP, 1) * 100}%` },
            ]}
          />
        </View>
      </View>

      <View style={styles.paths}>
        <SignalPath
          pathNumber={1}
          grid={grid}
          io={io}
          selectedSlot={selectedSlot}
          onSelectSlot={onSelectSlot}
          onSelectIO={onSelectIO}
        />
        <View style={styles.pathDivider} />
        <SignalPath
          pathNumber={2}
          grid={grid}
          io={io}
          selectedSlot={selectedSlot}
          onSelectSlot={onSelectSlot}
          onSelectIO={onSelectIO}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: COLORS.stroke,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    color: COLORS.accent,
    fontFamily: FONTS.mono,
    fontSize: 12,
    letterSpacing: 2,
  },
  syncButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.stroke,
  },
  syncText: {
    color: COLORS.text,
    fontFamily: FONTS.body,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  usageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  usageLabel: {
    color: COLORS.muted,
    fontFamily: FONTS.mono,
    fontSize: 10,
    minWidth: 70,
  },
  usageTrack: {
    flex: 1,
    minWidth: 60,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.panelAlt,
    overflow: 'hidden',
  },
  usageFill: {
    height: '100%',
    backgroundColor: COLORS.accent,
  },
  paths: {
    gap: 16,
  },
  pathDivider: {
    height: 1,
    backgroundColor: COLORS.stroke,
    marginVertical: 8,
  },
});
