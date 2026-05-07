import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SignalPath } from './SignalPath';
import { COLORS, FONTS } from '../../theme/colors';
import type { BlockData, BlockSlot, IOGrid, IOType, PathIndex, SignalFlowGrid } from '../../types/signalFlow';

const DSP_CAP = 66;
const DSP_WARN_RATIO = 0.85;

const buildUsageMeta = (value: number) => {
  const ratio = DSP_CAP > 0 ? value / DSP_CAP : 0;
  const clamped = Math.min(ratio, 1);
  const remaining = Math.max(DSP_CAP - value, 0);
  const over = Math.max(value - DSP_CAP, 0);
  const isOver = over > 0;
  const isNear = !isOver && ratio >= DSP_WARN_RATIO;
  const fillColor = isOver ? COLORS.danger : isNear ? COLORS.warn : COLORS.accent;
  return { clamped, remaining, over, fillColor, isOver };
};

interface SignalFlowSectionProps {
  grid: SignalFlowGrid;
  io: IOGrid;
  selectedSlot: BlockSlot | null;
  onSelectSlot: (slot: BlockSlot) => void;
  onOpenSlotMenu: (slot: BlockSlot) => void;
  onSelectIO: (row: PathIndex, ioType: IOType) => void;
  onSync: () => void;
}

export const SignalFlowSection: React.FC<SignalFlowSectionProps> = ({
  grid,
  io,
  selectedSlot,
  onSelectSlot,
  onOpenSlotMenu,
  onSelectIO,
  onSync,
}) => {
  const usage = useMemo(() => {
    const sumRow = (row: Array<null | BlockData>) =>
      row.reduce((acc, cell) => acc + (cell?.usage ?? 0), 0);
    return {
      path1: sumRow(grid[0]) + sumRow(grid[1]),
      path2: sumRow(grid[2]) + sumRow(grid[3]),
    };
  }, [grid]);

  const renderUsage = (label: string, value: number) => {
    const meta = buildUsageMeta(value);
    return (
      <View style={styles.usageBlock}>
        <View style={styles.usageHeaderRow}>
          <Text style={styles.usageTitle}>{label}</Text>
          <Text style={[styles.usageValue, meta.isOver && styles.usageValueOver]}>
            {value.toFixed(1)}/{DSP_CAP}
          </Text>
        </View>
        <View style={styles.usageTrack}>
          <View
            style={[
              styles.usageFill,
              { width: `${meta.clamped * 100}%`, backgroundColor: meta.fillColor },
            ]}
          />
        </View>
        <Text style={[styles.usageMeta, meta.isOver && styles.usageValueOver]}>
          {meta.isOver ? `Over by ${meta.over.toFixed(1)}` : `Headroom ${meta.remaining.toFixed(1)}`}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>SIGNAL FLOW</Text>
        <Pressable style={styles.syncButton} onPress={onSync}>
          <Text style={styles.syncText}>Sync</Text>
        </Pressable>
      </View>

      <View style={styles.usageGroup}>
        {renderUsage('Path 1 DSP', usage.path1)}
        {renderUsage('Path 2 DSP', usage.path2)}
      </View>

      <View style={styles.paths}>
        <SignalPath
          pathNumber={1}
          grid={grid}
          io={io}
          selectedSlot={selectedSlot}
          onSelectSlot={onSelectSlot}
          onOpenSlotMenu={onOpenSlotMenu}
          onSelectIO={onSelectIO}
        />
        <View style={styles.pathDivider} />
        <SignalPath
          pathNumber={2}
          grid={grid}
          io={io}
          selectedSlot={selectedSlot}
          onSelectSlot={onSelectSlot}
          onOpenSlotMenu={onOpenSlotMenu}
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
    borderRadius: 14,
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
    fontFamily: FONTS.bodySemi,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  usageGroup: {
    gap: 12,
    marginBottom: 16,
  },
  usageBlock: {
    gap: 6,
  },
  usageHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  usageTitle: {
    color: COLORS.muted,
    fontFamily: FONTS.mono,
    fontSize: 10,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  usageValue: {
    color: COLORS.text,
    fontFamily: FONTS.mono,
    fontSize: 11,
  },
  usageValueOver: {
    color: COLORS.danger,
  },
  usageTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.panelAlt,
    overflow: 'hidden',
  },
  usageFill: {
    height: '100%',
    backgroundColor: COLORS.accent,
    borderRadius: 3,
  },
  usageMeta: {
    color: COLORS.muted,
    fontFamily: FONTS.mono,
    fontSize: 10,
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
