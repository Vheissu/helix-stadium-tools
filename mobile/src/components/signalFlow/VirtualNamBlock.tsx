import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NamIcon } from '../../icons/BlockIcons';
import {
  COLORS,
  FONTS,
  colorWithAlpha,
  getBlockColor,
} from '../../theme/colors';
import type { VirtualNamRoute } from '../../utils/virtualNam';

interface VirtualNamBlockProps {
  route: VirtualNamRoute;
}

const AMP_COLOR = getBlockColor('amp');

const TechnicalBadge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.badge}>
    <Text style={styles.badgeText}>{children}</Text>
  </View>
);

const RouteEndpoint: React.FC<{ row: string; label: string }> = ({ row, label }) => (
  <View style={styles.endpoint}>
    <Text style={styles.endpointRow}>{row}</Text>
    <Text style={styles.endpointLabel} numberOfLines={1}>{label}</Text>
  </View>
);

/**
 * Editor-only representation of the owner-installed ARM NAM insert. It is
 * intentionally distinct from native Helix blocks because the vendor protocol
 * exposes the USB route but not the external service's process health.
 */
export const VirtualNamBlock: React.FC<VirtualNamBlockProps> = React.memo(({ route }) => {
  const { profile } = route;
  return (
    <View
      style={[styles.container, !route.ready && styles.containerWarning]}
      accessibilityRole="summary"
      accessibilityLabel={`Virtual NAM route, ${profile.modelName}, ${profile.mode} mode`}
    >
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <View style={[styles.statusDot, { backgroundColor: route.ready ? COLORS.signal : COLORS.warn }]} />
          <Text style={styles.eyebrow}>VIRTUAL ARM INSERT</Text>
        </View>
        <Text style={[styles.routeState, !route.ready && styles.routeStateWarning]}>
          {route.ready ? 'ROUTE READY' : 'ROUTE INCOMPLETE'}
        </Text>
      </View>

      <View style={styles.chain}>
        <RouteEndpoint row="1A OUT" label={route.sendName} />
        <View style={styles.connector} />
        <View style={styles.block}>
          <View style={styles.blockBar} />
          <View style={styles.blockIcon}>
            <NamIcon size={27} color={AMP_COLOR} />
          </View>
          <View style={styles.blockCopy}>
            <Text style={styles.blockName}>NAM</Text>
            <Text
              style={styles.modelName}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.72}
            >
              {profile.displayName}
            </Text>
          </View>
          <View style={styles.badges}>
            <TechnicalBadge>ARM</TechnicalBadge>
            <TechnicalBadge>{profile.mode.toUpperCase()}</TechnicalBadge>
          </View>
        </View>
        <View style={styles.connector} />
        <RouteEndpoint row="1B IN" label={route.returnName} />
      </View>

      <View style={styles.metrics}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>NAM NATIVE DSP</Text>
          <Text style={styles.metricValue}>{profile.nativeNamUsage}</Text>
        </View>
        <View style={styles.metricRule} />
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>ARM BUFFER ESTIMATE</Text>
          <Text style={styles.metricValue}>
            {profile.armAverageEstimateMin} to {profile.armAverageEstimateMax}%
          </Text>
        </View>
        <View style={styles.metricRule} />
        <View style={styles.metricWide}>
          <Text style={styles.metricLabel}>ROUTE OVERHEAD</Text>
          <Text style={styles.metricValue}>{profile.nativeRouteOverhead} of 66</Text>
        </View>
      </View>

      {!route.sendPanIsolated && (
        <Text style={styles.warning}>USB send must be panned hard left for AUX6.</Text>
      )}
      {!route.monoReturnReady && (
        <Text style={styles.warning}>Mono Gain return block is missing or bypassed.</Text>
      )}
      <Text style={styles.disclaimer}>
        Route detected from preset state. ARM service health is not exposed by the Helix protocol.
      </Text>
      <View style={styles.captureInfo}>
        <Text style={styles.captureLabel}>CAPTURE</Text>
        <Text style={styles.captureDescription}>{profile.captureDescription}</Text>
        <Text style={styles.captureCredit}>Capture by {profile.captureCredit}</Text>
        <Text style={styles.captureCredit}>More captures: {profile.captureUrl}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: 12,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colorWithAlpha(AMP_COLOR, 0.45),
    borderRadius: 12,
    backgroundColor: colorWithAlpha(AMP_COLOR, 0.045),
  },
  containerWarning: {
    borderColor: colorWithAlpha(COLORS.warn, 0.58),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  headerCopy: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  eyebrow: {
    color: COLORS.muted,
    fontFamily: FONTS.mono,
    fontSize: 9,
    letterSpacing: 1.2,
  },
  routeState: {
    color: COLORS.signal,
    fontFamily: FONTS.mono,
    fontSize: 9,
    letterSpacing: 0.8,
  },
  routeStateWarning: {
    color: COLORS.warn,
  },
  chain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  connector: {
    flex: 1,
    minWidth: 7,
    maxWidth: 18,
    height: 2,
    backgroundColor: colorWithAlpha(COLORS.signal, 0.5),
  },
  endpoint: {
    width: 52,
    alignItems: 'center',
    gap: 3,
  },
  endpointRow: {
    color: COLORS.text,
    fontFamily: FONTS.mono,
    fontSize: 9,
  },
  endpointLabel: {
    color: COLORS.muted,
    fontFamily: FONTS.mono,
    fontSize: 8,
    textTransform: 'uppercase',
    maxWidth: 52,
  },
  block: {
    minWidth: 160,
    flex: 1,
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colorWithAlpha(AMP_COLOR, 0.32),
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: COLORS.panelAlt,
  },
  blockBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 3,
    backgroundColor: AMP_COLOR,
  },
  blockIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorWithAlpha(AMP_COLOR, 0.12),
  },
  blockCopy: {
    minWidth: 0,
    flex: 1,
    gap: 2,
  },
  blockName: {
    color: COLORS.text,
    fontFamily: FONTS.display,
    fontSize: 15,
    letterSpacing: 0.4,
  },
  modelName: {
    color: COLORS.muted,
    fontFamily: FONTS.body,
    fontSize: 10,
  },
  badges: {
    alignItems: 'flex-end',
    gap: 4,
  },
  badge: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    borderRadius: 4,
    backgroundColor: COLORS.panel,
  },
  badgeText: {
    color: COLORS.text,
    fontFamily: FONTS.mono,
    fontSize: 8,
    letterSpacing: 0.7,
  },
  metrics: {
    minHeight: 38,
    flexDirection: 'row',
    alignItems: 'stretch',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.stroke,
    paddingTop: 9,
  },
  metric: {
    minWidth: 70,
    justifyContent: 'center',
    gap: 3,
    paddingHorizontal: 7,
  },
  metricWide: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
    gap: 3,
    paddingLeft: 7,
  },
  metricRule: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.stroke,
  },
  metricLabel: {
    color: COLORS.muted,
    fontFamily: FONTS.mono,
    fontSize: 7.5,
    letterSpacing: 0.45,
  },
  metricValue: {
    color: COLORS.text,
    fontFamily: FONTS.mono,
    fontSize: 12,
  },
  warning: {
    color: COLORS.warn,
    fontFamily: FONTS.bodyMedium,
    fontSize: 11,
  },
  disclaimer: {
    color: COLORS.muted,
    fontFamily: FONTS.body,
    fontSize: 9.5,
    lineHeight: 13,
  },
  captureInfo: {
    gap: 4,
    paddingTop: 9,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.stroke,
  },
  captureLabel: {
    color: AMP_COLOR,
    fontFamily: FONTS.mono,
    fontSize: 8,
    letterSpacing: 0.8,
  },
  captureDescription: {
    color: COLORS.text,
    fontFamily: FONTS.body,
    fontSize: 10.5,
    lineHeight: 15,
  },
  captureCredit: {
    color: COLORS.muted,
    fontFamily: FONTS.mono,
    fontSize: 8.5,
  },
});
