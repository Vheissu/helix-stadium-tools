import { Platform } from 'react-native';

// Base app colors — Helix-chassis dark theme.
// Design intent: black anodized chassis with silk-screened bone-white labels.
// `accent` is bone-white (NOT cyan) — primary actions and "active" UI lean on
// neutral white instead of competing with the per-block category colors that
// already do all the content-coloring. The teal that used to be `accent` is
// preserved as `signal` for actual live-signal indicators (connection state).
export const COLORS = {
  bg: '#0a0a0c',
  panel: '#131318',
  panelAlt: '#0e0e12',
  stroke: '#22232a',
  hairline: '#1a1b21',
  text: '#ece9e1',
  muted: '#7c7d86',
  // Bone-white — used for primary actions, active states, focus borders
  accent: '#ece9e1',
  accentDim: 'rgba(236, 233, 225, 0.06)',
  accentMid: 'rgba(236, 233, 225, 0.18)',
  // Live-signal teal — connection/active path indicators only
  signal: '#3ad6c5',
  signalDim: 'rgba(58, 214, 197, 0.12)',
  danger: '#e36859',
  success: '#3ad6c5',
  warn: '#e8b432',
};

const clampColorByte = (value: number) => Math.max(0, Math.min(255, Math.round(value)));

const parseHexColor = (value: string) => {
  const normalized = value.replace('#', '');
  const expanded =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => `${char}${char}`)
          .join('')
      : normalized;
  if (expanded.length !== 6) {
    return { r: 255, g: 255, b: 255 };
  }
  return {
    r: Number.parseInt(expanded.slice(0, 2), 16),
    g: Number.parseInt(expanded.slice(2, 4), 16),
    b: Number.parseInt(expanded.slice(4, 6), 16),
  };
};

export const colorWithAlpha = (value: string, alpha: number) => {
  const { r, g, b } = parseHexColor(value);
  const normalizedAlpha = Math.max(0, Math.min(1, alpha));
  return `rgba(${r}, ${g}, ${b}, ${normalizedAlpha})`;
};

export const blendHexColors = (from: string, to: string, amount: number) => {
  const left = parseHexColor(from);
  const right = parseHexColor(to);
  const mix = Math.max(0, Math.min(1, amount));
  const r = clampColorByte(left.r + (right.r - left.r) * mix);
  const g = clampColorByte(left.g + (right.g - left.g) * mix);
  const b = clampColorByte(left.b + (right.b - left.b) * mix);
  return `#${[r, g, b].map((part) => part.toString(16).padStart(2, '0')).join('')}`;
};

// Block type colors mapped from the Helix Stadium desktop category catalogue.
export const BLOCK_COLORS: Record<string, string> = {
  amp: '#ff3c3c',
  preamp: '#ff3c3c',
  cab: '#ff509a',
  distortion: '#ff9b2d',
  delay: '#43ff40',
  reverb: '#ff6828',
  modulation: '#00a5ff',
  dynamics: '#e8d62f',
  eq: '#e8d62f',
  pitch_synth: '#a25dff',
  wah_filter: '#a25dff',
  volume_pan: '#0fffff',
  looper: '#949494',
  fx_loop: '#949494',
  routing: '#989898',
};

// Get color for a block type, with fallback
export const getBlockColor = (kind: string): string => {
  return BLOCK_COLORS[kind] ?? COLORS.muted;
};

export const getBlockAppearance = (kind: string, enabled = true) => {
  const accent = getBlockColor(kind);
  const accentMuted = blendHexColors(accent, COLORS.muted, 0.58);
  return {
    accent,
    accentMuted,
    topBar: enabled ? accent : accentMuted,
    iconSurface: colorWithAlpha(accent, enabled ? 0.14 : 0.08),
    surface: enabled ? COLORS.panelAlt : blendHexColors(COLORS.panelAlt, COLORS.stroke, 0.18),
    selectedSurface: colorWithAlpha(accent, enabled ? 0.12 : 0.06),
    border: enabled ? COLORS.stroke : blendHexColors(COLORS.stroke, accent, 0.16),
    selectedBorder: enabled ? accent : accentMuted,
    power: enabled ? accent : COLORS.muted,
    text: enabled ? COLORS.text : '#aeb6c3',
    meta: enabled ? accent : COLORS.muted,
    glow: colorWithAlpha(accent, enabled ? 0.35 : 0.18),
  };
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
