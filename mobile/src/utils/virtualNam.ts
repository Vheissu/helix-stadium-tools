import type { IOGrid, SignalFlowGrid } from '../types/signalFlow';

const USB_3_4_INPUT_MODEL_ID = 762;
const USB_3_4_OUTPUT_MODEL_ID = 785;
const MONO_GAIN_MODEL_ID = 282;
const LEFT_PAN_VALUE = 0;
const VALUE_TOLERANCE = 0.0001;

export const VIRTUAL_NAM_PROFILE = {
  modelName: 'GRANO V1 - 808 V30',
  displayName: 'Granophyre 808 V30',
  mode: 'Lite',
  engine: 'NAM 0.7',
  captureDescription:
    'Full-rig capture of an Omega Granophyre in low-gain mode, using Voice 1. It includes a 40th Anniversary 808 overdrive and a Mesa 4 by 12 cabinet with V30 speakers.',
  captureCredit: 'Strange Angles Music',
  captureUrl: 'strangeanglesmusic.com/shop/nam',
  nativeNamUsage: 0,
  nativeRouteOverhead: 0.8,
  armAverageEstimateMin: 8,
  armAverageEstimateMax: 10,
} as const;

export type VirtualNamRoute = {
  profile: typeof VIRTUAL_NAM_PROFILE;
  sendName: string;
  returnName: string;
  destinationName: string;
  sendPanIsolated: boolean;
  monoReturnReady: boolean;
  ready: boolean;
};

const isApproximately = (value: unknown, expected: number) =>
  typeof value === 'number' && Math.abs(value - expected) <= VALUE_TOLERANCE;

/**
 * Recognises the owner-installed NAM route from device-visible preset state.
 *
 * The vendor protocol cannot confirm that the external ARM service is alive,
 * so this deliberately reports route readiness rather than service health.
 */
export const detectVirtualNamRoute = (
  grid: SignalFlowGrid,
  io: IOGrid
): VirtualNamRoute | null => {
  const send = io[0]?.output ?? null;
  const returned = io[1]?.input ?? null;
  if (
    send?.modelId !== USB_3_4_OUTPUT_MODEL_ID ||
    returned?.modelId !== USB_3_4_INPUT_MODEL_ID
  ) {
    return null;
  }

  const returnGain = grid[1]?.[0] ?? null;
  const sendPanIsolated = isApproximately(send.params?.['1'], LEFT_PAN_VALUE);
  const monoReturnReady =
    returnGain?.id === MONO_GAIN_MODEL_ID && returnGain.enabled !== false;

  return {
    profile: VIRTUAL_NAM_PROFILE,
    sendName: send.name,
    returnName: returned.name,
    destinationName: io[1]?.output?.name ?? 'Path 1B output',
    sendPanIsolated,
    monoReturnReady,
    ready: sendPanIsolated && monoReturnReady,
  };
};
