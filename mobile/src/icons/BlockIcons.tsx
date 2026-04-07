import React from 'react';
import Svg, { Path, Rect, Circle, Line, Polyline } from 'react-native-svg';

const iconSize = (size: number) => ({ width: size, height: size });

const AmpIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg viewBox="0 0 24 24" {...iconSize(size)}>
    <Rect x="3" y="6" width="18" height="12" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
    <Circle cx="7" cy="12" r="1.2" fill={color} />
    <Circle cx="11" cy="12" r="1.2" fill={color} />
    <Circle cx="15" cy="12" r="1.2" fill={color} />
  </Svg>
);

const PreampIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg viewBox="0 0 24 24" {...iconSize(size)}>
    <Rect x="4" y="6" width="16" height="12" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
    <Line x1="8" y1="9" x2="8" y2="15" stroke={color} strokeWidth="1.5" />
    <Line x1="12" y1="9" x2="12" y2="15" stroke={color} strokeWidth="1.5" />
    <Line x1="16" y1="9" x2="16" y2="15" stroke={color} strokeWidth="1.5" />
  </Svg>
);

const CabIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg viewBox="0 0 24 24" {...iconSize(size)}>
    <Rect x="5" y="4" width="14" height="16" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
    <Circle cx="12" cy="12" r="3.5" stroke={color} strokeWidth="1.5" fill="none" />
  </Svg>
);

const DistortionIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg viewBox="0 0 24 24" {...iconSize(size)}>
    <Polyline
      points="3,12 6,8 9,16 12,6 15,18 18,10 21,12"
      stroke={color}
      strokeWidth="1.5"
      fill="none"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </Svg>
);

const DelayIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg viewBox="0 0 24 24" {...iconSize(size)}>
    <Circle cx="12" cy="12" r="7" stroke={color} strokeWidth="1.5" fill="none" />
    <Line x1="12" y1="12" x2="12" y2="8" stroke={color} strokeWidth="1.5" />
    <Line x1="12" y1="12" x2="15" y2="12" stroke={color} strokeWidth="1.5" />
  </Svg>
);

const ReverbIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg viewBox="0 0 24 24" {...iconSize(size)}>
    <Path d="M6 8c3 4 9 4 12 0" stroke={color} strokeWidth="1.5" fill="none" />
    <Path d="M6 12c3 4 9 4 12 0" stroke={color} strokeWidth="1.5" fill="none" />
    <Path d="M6 16c3 4 9 4 12 0" stroke={color} strokeWidth="1.5" fill="none" />
  </Svg>
);

const ModIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg viewBox="0 0 24 24" {...iconSize(size)}>
    <Path d="M3 12c3-6 9 6 18 0" stroke={color} strokeWidth="1.5" fill="none" />
  </Svg>
);

const DynamicsIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg viewBox="0 0 24 24" {...iconSize(size)}>
    <Rect x="6" y="6" width="12" height="12" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
    <Line x1="9" y1="15" x2="15" y2="9" stroke={color} strokeWidth="1.5" />
  </Svg>
);

const EqIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg viewBox="0 0 24 24" {...iconSize(size)}>
    <Line x1="6" y1="6" x2="6" y2="18" stroke={color} strokeWidth="1.5" />
    <Line x1="12" y1="8" x2="12" y2="16" stroke={color} strokeWidth="1.5" />
    <Line x1="18" y1="5" x2="18" y2="19" stroke={color} strokeWidth="1.5" />
  </Svg>
);

const PitchIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg viewBox="0 0 24 24" {...iconSize(size)}>
    <Path d="M9 18V7c0-2 6-2 6 0v11" stroke={color} strokeWidth="1.5" fill="none" />
    <Circle cx="9" cy="18" r="2" stroke={color} strokeWidth="1.5" fill="none" />
    <Circle cx="15" cy="18" r="2" stroke={color} strokeWidth="1.5" fill="none" />
  </Svg>
);

const WahIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg viewBox="0 0 24 24" {...iconSize(size)}>
    <Path d="M4 7h16l-3 10H7L4 7z" stroke={color} strokeWidth="1.5" fill="none" />
  </Svg>
);

const VolumeIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg viewBox="0 0 24 24" {...iconSize(size)}>
    <Path d="M6 10h4l4-4v12l-4-4H6z" stroke={color} strokeWidth="1.5" fill="none" />
    <Line x1="18" y1="9" x2="20" y2="15" stroke={color} strokeWidth="1.5" />
  </Svg>
);

const LooperIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg viewBox="0 0 24 24" {...iconSize(size)}>
    <Path d="M6 12a6 6 0 0 1 12 0" stroke={color} strokeWidth="1.5" fill="none" />
    <Polyline points="14,6 18,6 18,10" stroke={color} strokeWidth="1.5" fill="none" />
  </Svg>
);

const FxLoopIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg viewBox="0 0 24 24" {...iconSize(size)}>
    <Polyline points="6,9 3,12 6,15" stroke={color} strokeWidth="1.5" fill="none" />
    <Polyline points="18,9 21,12 18,15" stroke={color} strokeWidth="1.5" fill="none" />
    <Line x1="8" y1="12" x2="16" y2="12" stroke={color} strokeWidth="1.5" />
  </Svg>
);

const RoutingIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg viewBox="0 0 24 24" {...iconSize(size)}>
    <Path d="M4 12h4l4-4h8" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <Path d="M4 12h4l4 4h8" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </Svg>
);

const FallbackIcon = ({ color, size }: { color: string; size: number }) => (
  <Svg viewBox="0 0 24 24" {...iconSize(size)}>
    <Circle cx="12" cy="12" r="6" stroke={color} strokeWidth="1.5" fill="none" />
  </Svg>
);

const ICONS: Record<string, React.FC<{ color: string; size: number }>> = {
  amp: AmpIcon,
  preamp: PreampIcon,
  cab: CabIcon,
  distortion: DistortionIcon,
  delay: DelayIcon,
  reverb: ReverbIcon,
  modulation: ModIcon,
  dynamics: DynamicsIcon,
  eq: EqIcon,
  pitch_synth: PitchIcon,
  wah_filter: WahIcon,
  volume_pan: VolumeIcon,
  looper: LooperIcon,
  fx_loop: FxLoopIcon,
  routing: RoutingIcon,
};

export const BlockIcon = ({ type, color, size = 18 }: { type: string; color: string; size?: number }) => {
  const Icon = ICONS[type] ?? FallbackIcon;
  return <Icon color={color} size={size} />;
};
