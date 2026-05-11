export type MatrixMixerChannel = {
  id: number;
  label: string;
  volumeDb: number | null;
  pan: number | null;
  mute: boolean | null;
  solo: boolean | null;
};

export type MatrixMixerLayer = {
  id: number;
  label: string;
  channels: MatrixMixerChannel[];
};

export type MatrixMixerState = {
  attachedLayer: number | null;
  layers: MatrixMixerLayer[];
};

export const MATRIX_MIXER_PROPERTY = 'server.mixer.state';

export const MATRIX_LAYERS = [
  { id: 1, label: '1/4"' },
  { id: 2, label: 'XLR' },
  { id: 3, label: 'Phones' },
] as const;

export const MATRIX_CHANNELS = [
  { id: 1, label: 'Path 1A' },
  { id: 2, label: 'Path 1B' },
  { id: 3, label: 'Path 2A' },
  { id: 4, label: 'Path 2B' },
  { id: 5, label: 'Paths' },
  { id: 6, label: 'Track 1' },
  { id: 7, label: 'Track 2' },
  { id: 8, label: 'Track 3' },
  { id: 9, label: 'Track 4' },
  { id: 10, label: 'Track 5' },
  { id: 11, label: 'Track 6' },
  { id: 12, label: 'Track 7' },
  { id: 13, label: 'Track 8' },
  { id: 14, label: 'Song' },
  { id: 15, label: 'Click' },
  { id: 16, label: 'Count' },
  { id: 17, label: 'USB 1/2' },
  { id: 18, label: 'Bluetooth' },
  { id: 19, label: 'AUX In' },
  { id: 20, label: 'Nexus 1' },
  { id: 21, label: 'Nexus 2' },
  { id: 22, label: 'Nexus 3' },
  { id: 23, label: 'Nexus 4' },
] as const;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const coerceNumber = (value: unknown): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'boolean') return value ? 1 : 0;
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const coerceBool = (value: unknown): boolean | null => {
  if (typeof value === 'boolean') return value;
  const numeric = coerceNumber(value);
  if (numeric === null) return null;
  return numeric !== 0;
};

const pickFirst = (source: Record<string, unknown>, keys: string[]) => {
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(source, key)) return source[key];
  }
  return null;
};

const findFirstKey = (value: unknown, targetKey: string): unknown => {
  const queue: unknown[] = [value];
  const seen = new Set<object>();

  while (queue.length) {
    const current = queue.shift();
    if (!current || typeof current !== 'object') continue;
    if (seen.has(current)) continue;
    seen.add(current);
    if (isRecord(current)) {
      if (Object.prototype.hasOwnProperty.call(current, targetKey)) return current[targetKey];
      queue.push(...Object.values(current));
    } else if (Array.isArray(current)) {
      queue.push(...current);
    }
  }

  return null;
};

const layerLabel = (id: number) => MATRIX_LAYERS.find((layer) => layer.id === id)?.label ?? `Output ${id}`;
const channelLabel = (id: number) => MATRIX_CHANNELS.find((channel) => channel.id === id)?.label ?? `Channel ${id}`;

const emptyChannel = (id: number): MatrixMixerChannel => ({
  id,
  label: channelLabel(id),
  volumeDb: null,
  pan: null,
  mute: null,
  solo: null,
});

const parseChannel = (raw: unknown, fallbackId: number): MatrixMixerChannel => {
  let id: number | null = null;
  let name: string | null = null;
  let volumeDb: number | null = null;
  let pan: number | null = null;
  let mute: boolean | null = null;
  let solo: boolean | null = null;

  if (isRecord(raw)) {
    id = coerceNumber(pickFirst(raw, ['chnl', 'chan', 'ch__', 'cid_', 'id__', 'id', 'idx', 'src_']));
    volumeDb = coerceNumber(pickFirst(raw, ['vol_', 'vol', 'lvl_', 'level', 'gain', 'gain_']));
    pan = coerceNumber(pickFirst(raw, ['pan_', 'pan']));
    mute = coerceBool(pickFirst(raw, ['mute', 'mut_', 'muted']));
    solo = coerceBool(pickFirst(raw, ['solo', 'sol_']));
    name = typeof raw.name === 'string' && raw.name ? raw.name : null;
  } else if (Array.isArray(raw)) {
    id = coerceNumber(raw[0]);
    volumeDb = coerceNumber(raw[1]);
    pan = coerceNumber(raw[2]);
    mute = coerceBool(raw[3]);
    solo = coerceBool(raw[4]);
  }

  const channelId = id !== null ? Math.trunc(id) : fallbackId;
  return {
    id: channelId,
    label: name ?? channelLabel(channelId),
    volumeDb,
    pan,
    mute,
    solo,
  };
};

const layerChannelItems = (raw: Record<string, unknown>) => {
  const items: unknown[] = [];
  const home = raw.home;
  if (isRecord(home)) {
    if (Array.isArray(home.chan)) items.push(...home.chan);
    if (isRecord(home.mix_)) items.push(home.mix_);
  }

  const song = raw.song;
  if (isRecord(song)) {
    if (Array.isArray(song.chan)) items.push(...song.chan);
    if (isRecord(song.mix_)) items.push(song.mix_);
  }

  ['clik', 'cntn', 'usbn', 'bt__', 'auxn'].forEach((key) => {
    const item = raw[key];
    if (isRecord(item)) items.push(item);
  });

  if (Array.isArray(raw.nxus)) {
    items.push(...raw.nxus.filter(isRecord));
  }

  return items;
};

const withKnownChannels = (channels: MatrixMixerChannel[]) => {
  const byId = new Map(channels.map((channel) => [channel.id, channel]));
  MATRIX_CHANNELS.forEach(({ id }) => {
    if (!byId.has(id)) byId.set(id, emptyChannel(id));
  });
  return [...byId.values()].sort((left, right) => left.id - right.id);
};

const parseLayer = (raw: unknown, fallbackId: number): MatrixMixerLayer => {
  let id: number | null = null;
  let name: string | null = null;
  let channelItems: unknown = [];

  if (isRecord(raw)) {
    const output = raw.out_;
    if (isRecord(output)) {
      id = coerceNumber(pickFirst(output, ['dst_', 'dst', 'id', 'src_']));
      name = typeof output.name === 'string' && output.name ? output.name : null;
    }
    if (id === null) {
      id = coerceNumber(pickFirst(raw, ['lyr_', 'lyr', 'layer', 'out_', 'output', 'id__', 'id', 'idx']));
    }
    channelItems = pickFirst(raw, ['chns', 'chans', 'channels', 'chnl', 'strips', 'strip']);
    if (!Array.isArray(channelItems)) {
      channelItems = layerChannelItems(raw);
    }
  } else if (Array.isArray(raw)) {
    channelItems = raw;
  }

  const layerId = id !== null ? Math.trunc(id) : fallbackId;
  const parsedChannels = Array.isArray(channelItems)
    ? channelItems.map((item, index) => parseChannel(item, index + 1))
    : [];
  return {
    id: layerId,
    label: name ?? layerLabel(layerId),
    channels: withKnownChannels(parsedChannels),
  };
};

export const parseMatrixMixerState = (input: unknown): MatrixMixerState | null => {
  const stateValue = isRecord(input) && ('val_' in input || 'val' in input)
    ? input.val_ ?? input.val
    : input;
  const layersValue = findFirstKey(stateValue, 'lyrs');
  if (!Array.isArray(layersValue)) return null;

  const layers = layersValue
    .map((layer, index) => parseLayer(layer, index + 1))
    .sort((left, right) => left.id - right.id);
  const attachedRaw = coerceNumber(findFirstKey(stateValue, 'atto')) ?? coerceNumber(findFirstKey(stateValue, 'aout'));
  const attachedLayer = attachedRaw !== null ? Math.trunc(attachedRaw) : layers[0]?.id ?? null;

  return {
    attachedLayer,
    layers,
  };
};

const ensureLayer = (state: MatrixMixerState, layerId: number) => {
  const existing = state.layers.find((layer) => layer.id === layerId);
  if (existing) return existing;
  const layer: MatrixMixerLayer = {
    id: layerId,
    label: layerLabel(layerId),
    channels: withKnownChannels([]),
  };
  state.layers.push(layer);
  state.layers.sort((left, right) => left.id - right.id);
  return layer;
};

const ensureChannel = (layer: MatrixMixerLayer, channelId: number) => {
  const existing = layer.channels.find((channel) => channel.id === channelId);
  if (existing) return existing;
  const channel = emptyChannel(channelId);
  layer.channels.push(channel);
  layer.channels.sort((left, right) => left.id - right.id);
  return channel;
};

export const applyMatrixMixerEvent = (
  current: MatrixMixerState | null,
  address: string,
  values: unknown[],
): MatrixMixerState | null => {
  const addr = address.toLowerCase();
  if (addr === '/syncmixattachedout') {
    const layer = coerceNumber(values[2]);
    if (layer === null) return current;
    return {
      attachedLayer: Math.trunc(layer),
      layers: current?.layers.map((item) => ({ ...item, channels: item.channels.map((channel) => ({ ...channel })) })) ?? [],
    };
  }

  const field = {
    '/syncmixchannelvolume': 'volumeDb',
    '/syncmixchannelpan': 'pan',
    '/syncmixchannelmute': 'mute',
    '/syncmixchannelsolo': 'solo',
  }[addr] as keyof Pick<MatrixMixerChannel, 'volumeDb' | 'pan' | 'mute' | 'solo'> | undefined;
  if (!field) return current;

  const layer = coerceNumber(values[2]);
  const channel = coerceNumber(values[3]);
  if (layer === null || channel === null) return current;

  const next: MatrixMixerState = {
    attachedLayer: current?.attachedLayer ?? Math.trunc(layer),
    layers: current?.layers.map((item) => ({ ...item, channels: item.channels.map((entry) => ({ ...entry })) })) ?? [],
  };
  const targetLayer = ensureLayer(next, Math.trunc(layer));
  const targetChannel = ensureChannel(targetLayer, Math.trunc(channel));
  const rawValue = values[4];

  if (field === 'mute' || field === 'solo') {
    targetChannel[field] = coerceBool(rawValue);
  } else {
    targetChannel[field] = coerceNumber(rawValue);
  }

  return next;
};

export const formatMatrixVolume = (value: number | null) => {
  if (value === null) return '--';
  const normalised = Math.abs(value) < 0.005 ? 0 : value;
  return `${normalised > 0 ? '+' : ''}${normalised.toFixed(1)} dB`;
};

export const formatMatrixPan = (value: number | null) => {
  if (value === null) return '--';
  if (Math.abs(value) < 0.005) return 'C';
  const side = value < 0 ? 'L' : 'R';
  return `${side}${Math.round(Math.abs(value) * 100)}`;
};
