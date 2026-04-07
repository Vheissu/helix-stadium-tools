import React, { useRef } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { BlockIcon } from '../../icons/BlockIcons';
import { getBlockImage } from '../../icons/CategoryImages';
import { COLORS, FONTS, SIGNAL_FLOW, getBlockColor } from '../../theme/colors';
import type { BlockCardProps } from '../../types/signalFlow';

const PowerIcon = ({ color, size = 14 }: { color: string; size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 3v6M18.36 7.64a9 9 0 11-12.73 0"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
    />
  </Svg>
);

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
        {/* Power indicator for populated blocks */}
        {block && (
          <View style={styles.powerBadge}>
            <PowerIcon color={COLORS.accent} size={10} />
          </View>
        )}
        <Text style={styles.index}>{index + 1}</Text>
        {block ? (
          <>
            {blockImage ? (
              <Image source={blockImage} style={styles.blockImage} resizeMode="contain" />
            ) : (
              <BlockIcon type={block.kind} size={20} color={getBlockColor(block.kind)} />
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
    gap: 4,
  },
  cardEmpty: {
    borderColor: COLORS.stroke,
    borderTopColor: COLORS.stroke,
    borderStyle: 'dashed',
  },
  cardSelected: {
    borderColor: COLORS.accent,
    backgroundColor: 'rgba(0, 230, 222, 0.06)',
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },
  powerBadge: {
    position: 'absolute',
    top: 4,
    left: 5,
    opacity: 0.6,
  },
  index: {
    color: COLORS.muted,
    fontFamily: FONTS.mono,
    fontSize: 8,
    position: 'absolute',
    top: 4,
    right: 5,
    opacity: 0.5,
  },
  blockImage: {
    width: 30,
    height: 30,
  },
  name: {
    color: COLORS.text,
    fontFamily: FONTS.bodySemi,
    fontSize: 9,
    textAlign: 'center',
    paddingHorizontal: 4,
    lineHeight: 12,
  },
  emptyIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyPlus: {
    color: COLORS.muted,
    fontSize: 16,
    fontWeight: '200',
    opacity: 0.5,
  },
  emptyLabel: {
    color: COLORS.muted,
    fontFamily: FONTS.body,
    fontSize: 9,
    opacity: 0.5,
  },
  connector: {
    width: SIGNAL_FLOW.connectorWidth,
    height: 2,
    backgroundColor: COLORS.stroke,
    borderRadius: 1,
  },
});
