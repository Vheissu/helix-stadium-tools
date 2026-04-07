import { Platform } from 'react-native';

// Base app colors — dark theme with cyan/teal accent
export const COLORS = {
  bg: '#0c0e12',
  panel: '#161a21',
  panelAlt: '#111419',
  stroke: '#252a33',
  text: '#eeeee8',
  muted: '#6e7787',
  accent: '#00e6de',
  accentDim: 'rgba(0, 230, 222, 0.12)',
  accentMid: 'rgba(0, 230, 222, 0.30)',
  danger: '#e46b61',
  success: '#00e6de',
  warn: '#e6b000',
};

// Block type colors (Helix-inspired from HTML mockup)
export const BLOCK_COLORS: Record<string, string> = {
  amp: '#e04040',
  preamp: '#e04040',
  cab: '#e04040',
  distortion: '#e6b000',
  delay: '#00c853',
  reverb: '#ff7733',
  modulation: '#3d8af7',
  dynamics: '#00e6de',
  eq: '#e6cc00',
  pitch_synth: '#b040e6',
  wah_filter: '#9b30d9',
  volume_pan: '#6e7787',
  looper: '#3d8af7',
  fx_loop: '#6e7787',
  routing: '#6e7787',
};

// Get color for a block type, with fallback
export const getBlockColor = (kind: string): string => {
  return BLOCK_COLORS[kind] ?? COLORS.muted;
};

// Font families – Roboto loaded via expo-font in App.tsx
export const FONTS = {
  body: 'Roboto-Regular',
  bodyMedium: 'Roboto-Medium',
  bodySemi: 'Roboto-Medium',
  light: 'Roboto-Light',
  mono: Platform.select({ ios: 'Menlo', android: 'monospace' }) as string,
  display: 'Roboto-Bold',
};

// Layout constants for signal flow
export const SIGNAL_FLOW = {
  blockWidth: 72,
  blockHeight: 88,
  connectorWidth: 10,
  nodeSize: 34,
  splitIconSize: 24,
  borderRadius: 10,
  topBorderHeight: 3,
};
