import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { COLORS } from '../theme/colors';

export type UtilityIconName = 'wifi' | 'usb' | 'automatic' | 'device' | 'arrow' | 'chevron' | 'check' | 'help' | 'accessibility' | 'sliders' | 'tempo' | 'tuner' | 'privacy' | 'support' | 'licenses' | 'search' | 'close' | 'more' | 'plus' | 'snapshots' | 'notes' | 'back' | 'play' | 'pause' | 'stop';

export function UtilityIcon({ name, size = 22, color = COLORS.muted }: { name: UtilityIconName; size?: number; color?: string }) {
  const paths: Partial<Record<UtilityIconName, string>> = {
    search: 'm21 21-6-6M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0',
    close: 'm6 6 12 12M6 18 18 6',
    more: 'M5 12h.01M12 12h.01M19 12h.01',
    plus: 'M12 5v14M5 12h14',
    snapshots: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
    notes: 'M5 3h14v18H5zM8 8h8m-8 4h8m-8 4h5',
    back: 'm14 5-7 7 7 7',
    play: 'm7 4 13 8-13 8V4',
    pause: 'M8 4v16M16 4v16',
    stop: 'M5 5h14v14H5z',
    wifi: 'M3 8a14 14 0 0 1 18 0M6 12a9 9 0 0 1 12 0M9 16a4 4 0 0 1 6 0M12 20h.01',
    usb: 'M12 20V4m-3 3 3-3 3 3M12 15l-5-4V8m5 5 5-3V7M5 6h4v2H5zM16 5h2v2h-2z',
    automatic: 'm13 3-8 11h6l-1 7 9-12h-6l1-6',
    arrow: 'M4 12h16m-6-6 6 6-6 6',
    chevron: 'm9 5 7 7-7 7',
    check: 'm5 12 4 4L19 6',
    help: 'M9 8a3 3 0 1 1 5 2c-2 1-2 2-2 3m0 4h.01',
    accessibility: 'M4 9h16M12 7v6m0 0-5 7m5-7 5 7',
    sliders: 'M5 4v7m0 4v5M12 4v2m0 4v10M19 4v10m0 4v2M2 11h6m1-5h6m1 8h6',
    tempo: 'm7 20 5-16 5 16H7zm5-7 6-6',
    tuner: 'M8 3v8a4 4 0 0 0 8 0V3M12 15v6M5 3h6m2 0h6',
    privacy: 'M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3zm-4 9 3 3 5-6',
    support: 'M4 13v-1a8 8 0 0 1 16 0v1M4 12H2v6h4v-6H4zm16 0h2v6h-4v-6h2zm0 6c0 3-4 3-8 3',
    licenses: 'M6 3h8l4 4v14H6V3zm8 0v5h4M9 12h6m-6 4h6',
  };
  return <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" accessible={false}>
    {name === 'device' ? <><Rect x={2} y={5} width={20} height={14} rx={3} /><Rect x={5} y={8} width={7} height={5} rx={1} /><Circle cx={16} cy={10} r={1} /><Circle cx={19} cy={10} r={1} /><Path d="M6 16h.01M12 16h.01M18 16h.01" /></> : <Path d={paths[name]} />}
    {name === 'help' && <Circle cx={12} cy={12} r={10} />}
    {name === 'accessibility' && <Circle cx={12} cy={3.5} r={1.5} />}
  </Svg>;
}
