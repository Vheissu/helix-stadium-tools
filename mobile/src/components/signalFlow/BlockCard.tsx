import React, { useRef } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { BlockIcon } from '../../icons/BlockIcons';
import { getBlockImage } from '../../icons/CategoryImages';
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
  const longPressHandledRef = useRef(false);
  const borderColor = block ? getBlockColor(block.kind) : COLORS.stroke;
  const isEmpty = block === null;
  const blockImage = block ? getBlockImage(block.kind) : null;

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          if (longPressHandledRef.current) {
            longPressHandledRef.current = false;
            return;
          }
          onPress();
        }}
        onLongPress={
          onLongPress
            ? () => {
                longPressHandledRef.current = true;
                onLongPress();
              }
            : undefined
        }
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
            {blockImage ? (
              <Image source={blockImage} style={styles.blockImage} resizeMode="contain" />
            ) : (
              <BlockIcon type={block.kind} size={18} color={getBlockColor(block.kind)} />
            )}
            <Text style={styles.name} numberOfLines={2}>
              {block.name}
            </Text>
          </>
        ) : (
          <>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyPlus}>+</Text>
            </View>
            <Text style={styles.emptyLabel}>empty</Text>
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
    gap: 3,
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
    top: 3,
    right: 5,
  },
  blockImage: {
    width: 32,
    height: 32,
  },
  name: {
    color: COLORS.text,
    fontFamily: FONTS.bodyMedium,
    fontSize: 9,
    textAlign: 'center',
    paddingHorizontal: 3,
    lineHeight: 12,
  },
  emptyIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
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
