import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BlockIcon } from '../../icons/BlockIcons';
import { COLORS, FONTS, SIGNAL_FLOW, getBlockColor } from '../../theme/colors';
import type { BlockCardProps } from '../../types/signalFlow';

export const BlockCard: React.FC<BlockCardProps> = React.memo(({
  block,
  index,
  isSelected,
  showConnector,
  onPress,
  onLongPress,
}) => {
  const borderColor = block ? getBlockColor(block.kind) : COLORS.stroke;
  const isEmpty = block === null;

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        style={({ pressed }) => [
          styles.card,
          isEmpty && styles.cardEmpty,
          isSelected && styles.cardSelected,
          { borderTopColor: borderColor },
          pressed && styles.cardPressed,
        ]}
      >
        <Text style={styles.index}>{index + 1}</Text>
        {block ? (
          <>
            <BlockIcon
              type={block.kind}
              size={20}
              color={getBlockColor(block.kind)}
            />
            <Text style={styles.label} numberOfLines={1}>
              {block.kind.toUpperCase()}
            </Text>
          </>
        ) : (
          <>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyPlus}>+</Text>
            </View>
            <Text style={styles.emptyLabel}>—</Text>
          </>
        )}
      </Pressable>
      {showConnector && <View style={styles.connector} />}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    width: SIGNAL_FLOW.blockWidth,
    height: SIGNAL_FLOW.blockHeight,
    borderRadius: SIGNAL_FLOW.borderRadius,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    borderTopWidth: SIGNAL_FLOW.topBorderHeight,
    backgroundColor: COLORS.panelAlt,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  cardEmpty: {
    borderColor: COLORS.stroke,
    borderTopColor: COLORS.stroke,
  },
  cardSelected: {
    borderColor: COLORS.accent,
    backgroundColor: '#1b2026',
  },
  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  index: {
    color: COLORS.muted,
    fontFamily: FONTS.mono,
    fontSize: 9,
    position: 'absolute',
    top: 4,
    right: 6,
  },
  label: {
    color: COLORS.text,
    fontFamily: FONTS.body,
    fontSize: 9,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 2,
    letterSpacing: 0.5,
  },
  emptyIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyPlus: {
    color: COLORS.muted,
    fontSize: 16,
    fontWeight: '300',
  },
  emptyLabel: {
    color: COLORS.muted,
    fontFamily: FONTS.body,
    fontSize: 9,
  },
  connector: {
    width: SIGNAL_FLOW.connectorWidth,
    height: 2,
    backgroundColor: COLORS.stroke,
    borderRadius: 1,
  },
});
