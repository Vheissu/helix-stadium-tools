import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS, SIGNAL_FLOW } from '../../theme/colors';

interface ConnectorProps {
  width?: number;
}

export const Connector: React.FC<ConnectorProps> = ({ width = SIGNAL_FLOW.connectorWidth }) => (
  <View style={[styles.connector, { width }]} />
);

const styles = StyleSheet.create({
  connector: {
    height: 2,
    backgroundColor: COLORS.stroke,
    borderRadius: 1,
  },
});
