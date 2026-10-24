import React, { useState } from 'react';
import { StyleSheet, View, type LayoutChangeEvent, type ViewProps } from 'react-native';

export const GRID_GAP = 8;

/** The most columns from `choices` (widest first) whose cells stay at least `minCell` wide. */
export function gridColumns(width: number, choices: number[], minCell: number, gap = GRID_GAP) {
  if (width <= 0) return choices[0];
  return choices.find(columns => (width - gap * (columns - 1)) / columns >= minCell) ?? choices[choices.length - 1];
}

/**
 * Equal-width cells laid out in explicit rows. The column count comes from the
 * measured width, and the last row is padded so every edge lines up instead of
 * leaving a ragged wrap.
 */
export function EqualGrid({ columns, minCell = 48, gap = GRID_GAP, children, style, onLayout, ...props }: ViewProps & {
  /** Candidate column counts, preferred first. */
  columns: number[];
  minCell?: number;
  gap?: number;
  children: React.ReactNode;
}) {
  const [width, setWidth] = useState(0);
  const count = gridColumns(width, columns, minCell, gap);
  const cells = React.Children.toArray(children);
  const rows: React.ReactNode[][] = [];
  for (let i = 0; i < cells.length; i += count) rows.push(cells.slice(i, i + count));
  const measure = (event: LayoutChangeEvent) => {
    const next = Math.round(event.nativeEvent.layout.width);
    setWidth(previous => previous === next ? previous : next);
    onLayout?.(event);
  };
  return <View {...props} style={[{ gap }, style]} onLayout={measure}>
    {rows.map((row, r) => <View key={r} style={[styles.row, { gap }]}>
      {row.map((cell, c) => <View key={c} style={styles.cell}>{cell}</View>)}
      {Array.from({ length: count - row.length }, (_, i) => <View key={`pad-${i}`} style={styles.cell} />)}
    </View>)}
  </View>;
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'stretch' },
  cell: { flex: 1, minWidth: 0 },
});
