import type { TextStyle } from 'react-native';

// Base app colors — Helix-chassis dark theme.
// Design intent: black anodized chassis with silk-screened bone-white labels.
// `accent` is bone-white (NOT cyan) — primary actions and "active" UI lean on
// neutral white instead of competing with the per-block category colors that
// already do all the content-coloring. The teal is preserved as `signal` for
// actual live-signal indicators (connection state).
//
// Surfaces step up in tone as they rise: ground → lane → control → raised.
// Each signal-chain row sits on a `lane` band so rows read as rows.
export const COLORS = {
  bg: '#0a0a0c',
  // Lane bands and grouped surfaces
  panel: '#151519',
  panelAlt: '#111114',
  // Docked block editor surface
  inspector: '#131316',
  // Secondary buttons, segmented-control tracks
  control: '#1d1d22',
  // Row endpoints, selected segments
  raised: '#24242a',
  stroke: '#2a2a30',
  hairline: '#1f1f24',
  text: '#ece9e1',
  // Secondary text; passes 4.5:1 on every surface above
  muted: '#a2a2ab',
  // Tertiary marks only (positions, disabled glyphs), never body copy
  faint: '#6e6e78',
  // Signal wire between blocks
  wire: '#5a5a64',
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

/**
 * Colours for a block tile drawn on `base` (the lane or list surface).
 *
 * Enabled blocks are filled with a wash of their category colour and carry a
 * solid category outline. Bypassed blocks drop the fill and use a dashed,
 * dimmed outline, so the state reads without relying on hue alone.
 */
export const getBlockAppearance = (kind: string, enabled = true, base: string = COLORS.panel) => {
  const accent = getBlockColor(kind);
  const accentMuted = blendHexColors(base, accent, 0.45);
  const fill = enabled ? blendHexColors(base, accent, 0.2) : base;
  return {
    accent,
    accentMuted,
    fill,
    outline: enabled ? accent : accentMuted,
    outlineStyle: (enabled ? 'solid' : 'dashed') as 'solid' | 'dashed',
    icon: enabled ? accent : accentMuted,
    name: enabled ? COLORS.text : '#8c8c95',
    // Older keys kept for callers that have not moved to the tile treatment.
    topBar: enabled ? accent : accentMuted,
    iconSurface: colorWithAlpha(accent, enabled ? 0.14 : 0.08),
    surface: fill,
    selectedSurface: fill,
    border: enabled ? accent : accentMuted,
    selectedBorder: enabled ? accent : accentMuted,
    power: enabled ? accent : accentMuted,
    text: enabled ? COLORS.text : '#8c8c95',
    meta: enabled ? accent : COLORS.muted,
    glow: colorWithAlpha(accent, enabled ? 0.35 : 0.18),
  };
};

// Text weights use the platform font: SF Pro on iOS, Roboto on Android.
// Values use tabular figures so numbers do not jitter while dragging.
export const FONT: Record<'body' | 'medium' | 'semibold' | 'bold' | 'numeric', TextStyle> = {
  body: { fontWeight: '400' },
  medium: { fontWeight: '500' },
  semibold: { fontWeight: '600' },
  bold: { fontWeight: '700' },
  numeric: { fontVariant: ['tabular-nums'] },
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
