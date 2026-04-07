import { Platform } from 'react-native';

// Base app colors (from existing App.tsx)
export const COLORS = {
  bg: '#0b0d0f',
  panel: '#14171b',
  panelAlt: '#0f1216',
  stroke: '#2a2f36',
  text: '#f2f2ee',
  muted: '#9ca3ab',
  accent: '#c9c3b1',
  danger: '#e46b61',
  success: '#7bbf9e',
  warn: '#e6b000',
};

// Block type colors (Helix-inspired from HTML mockup)
export const BLOCK_COLORS: Record<string, string> = {
  amp: '#b51b1b',
  preamp: '#b51b1b',
  cab: '#b51b1b',
  distortion: '#e6b000',
  delay: '#00a344',
  reverb: '#d95700',
  modulation: '#2e7de6',
  dynamics: '#00e6de',
  eq: '#e6cc00',
  pitch_synth: '#9e00e6',
  wah_filter: '#8f00b5',
  volume_pan: '#9ca3ab',
  looper: '#2e7de6',
  fx_loop: '#9ca3ab',
};

// Get color for a block type, with fallback
export const getBlockColor = (kind: string): string => {
  return BLOCK_COLORS[kind] ?? COLORS.muted;
};

// Font families
export const FONTS = {
  body: Platform.select({ ios: 'Avenir Next', android: 'sans-serif' }) as string,
  mono: Platform.select({ ios: 'Menlo', android: 'monospace' }) as string,
  display: Platform.select({ ios: 'Georgia', android: 'serif' }) as string,
};

// Layout constants for signal flow
export const SIGNAL_FLOW = {
  blockWidth: 72,
  blockHeight: 88,
  connectorWidth: 10,
  nodeSize: 34,
  splitIconSize: 24,
  borderRadius: 8,
  topBorderHeight: 3,
};
