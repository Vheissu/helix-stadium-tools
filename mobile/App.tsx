import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Switch,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { HelixClient, type HelixEvent, type HelixPathClipboard } from './src/protocol/helixClient';
import blockTypes from './src/data/blockTypes.json';
import ioModels from './src/data/ioModels.json';
import { useFonts } from 'expo-font';
import { BlockIcon } from './src/icons/BlockIcons';
import { BLOCK_IMAGES } from './src/icons/CategoryImages';
import { TabBar } from './src/components/TabBar';
import type { TabKey } from './src/components/TabBar';
import { ConnectionGate } from './src/components/ConnectionGate';
import { BottomSheet } from './src/components/BottomSheet';
import { ParamKnob } from './src/components/ParamKnob';
import { DraggableEffectList } from './src/components/signalFlow/DraggableEffectList';
import { COLORS as THEME_COLORS, FONTS, colorWithAlpha, getBlockAppearance, getBlockColor } from './src/theme/colors';
import type { BlockData, BlockIndex, BlockSlot, IOGrid, IOType, PathIndex, SignalFlowGrid } from './src/types/signalFlow';
import { buildConnectionFailureStatus } from './src/utils/connection';
import { formatTempoBpm } from './src/utils/format';
import { findFlows } from './src/utils/helixState';

const COLORS = THEME_COLORS;

const FONT_BODY = FONTS.body;
const FONT_BODY_MEDIUM = FONTS.bodyMedium;
const FONT_BODY_SEMI = FONTS.bodySemi;
const FONT_MONO = FONTS.mono;
const FONT_DISPLAY = FONTS.display;
const STANDARD_DSP_CAP = 70;
const EXTENDED_DSP_CAP = 82;
const AUTO_SYNC_INTERVAL_MS = 4500;

type HelixParamType = 'i' | 'f' | 'b';

type EditorParam = {
  id: number | null;
  key: string;
  name: string;
  type: HelixParamType;
  min: number;
  max: number;
  def: number | boolean;
  display_min?: number;
  display_max?: number;
  display_def?: number | boolean;
  unit?: string | null;
  options?: string[] | null;
  description?: string;
  faux?: boolean;
  property_key?: string | null;
};

type BlockModel = {
  id: number;
  key: string;
  name: string;
  based_on?: string | null;
  category: string;
  usage?: number;
  params: EditorParam[];
};

type BlockModelGroup = {
  label: string;
  models: BlockModel[];
};

type BlockCatalog = Record<string, BlockModelGroup>;

type IOModelParam = EditorParam;

type IOModel = {
  id: number;
  key: string;
  name: string;
  params: IOModelParam[];
};

type IOModelGroup = {
  label: string;
  models: IOModel[];
};

type IOModelData = {
  inputs: IOModelGroup;
  outputs: IOModelGroup;
};

type HelixContentRef = {
  altp?: number;
  blck?: number;
  ccid?: number;
  cctp?: number;
  cid_?: number;
  flow?: number;
  name?: string;
  posi?: number;
  rcid?: number;
  type?: number;
  [key: string]: any;
};

type SnapshotRef = {
  index: number;
  name?: string;
  colr?: number;
  si__?: number;
  [key: string]: any;
};

type PresetLibraryRoot = 'setlists' | 'user' | 'factory';

const FACTORY_PRESETS_CID = -1;
const USER_PRESETS_CID = -2;
const SETLIST_DIRECTORY_CID = -5;
const SNAPSHOT_COLOR_OPTIONS = [
  { value: 0, label: 'Auto', swatch: '#A9AFBA' },
  { value: 1, label: 'White', swatch: '#F3F1E7' },
  { value: 2, label: 'Red', swatch: '#D85858' },
  { value: 3, label: 'Dark Orange', swatch: '#B96B2B' },
  { value: 4, label: 'Light Orange', swatch: '#ECA045' },
  { value: 5, label: 'Yellow', swatch: '#D8C347' },
  { value: 6, label: 'Green', swatch: '#63B96E' },
  { value: 7, label: 'Turquoise', swatch: '#37BDB3' },
  { value: 8, label: 'Blue', swatch: '#4D84F5' },
  { value: 9, label: 'Violet', swatch: '#7D65E6' },
  { value: 10, label: 'Pink', swatch: '#D86DB5' },
  { value: 11, label: 'Off', swatch: '#4A5263' },
];
const SNAPSHOT_COLOR_LABELS = Object.fromEntries(
  SNAPSHOT_COLOR_OPTIONS.map((option) => [option.value, option.label])
);
const TUNER_STRING_CONFIG = [
  { stringNumber: 6, label: 'Low E', shortLabel: 'E' },
  { stringNumber: 5, label: 'A', shortLabel: 'A' },
  { stringNumber: 4, label: 'D', shortLabel: 'D' },
  { stringNumber: 3, label: 'G', shortLabel: 'G' },
  { stringNumber: 2, label: 'B', shortLabel: 'B' },
  { stringNumber: 1, label: 'High E', shortLabel: 'E' },
] as const;
const EMPTY_TUNER_STRING_OFFSETS = Object.fromEntries(
  TUNER_STRING_CONFIG.map(({ stringNumber }) => [stringNumber, null])
) as Record<number, number | null>;
const TUNER_REMOTE_META = 'Note and needle stay on the Helix display';
const TUNER_REMOTE_NOTE = 'Note and needle stay on the Helix display';

const blockCatalog = blockTypes as BlockCatalog;

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionBody}>{children}</View>
  </View>
);

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });

  const clientRef = useRef<HelixClient | null>(null);
  const syncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flowSyncInFlightRef = useRef(false);
  const scheduledSyncOptionsRef = useRef<{ full: boolean; silent: boolean }>({ full: true, silent: false });
  const [host, setHost] = useState('p35x1.local');
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [notesVisible, setNotesVisible] = useState(false);
  const [autoCab, setAutoCab] = useState(true);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(true);
  const [extendedDspEnabled, setExtendedDspEnabled] = useState(false);
  const [showRealBlockNames, setShowRealBlockNames] = useState(false);
  const [blockLabelMode, setBlockLabelMode] = useState(false);
  const [blockLabelDraft, setBlockLabelDraft] = useState('');
  const [blockLabelOverrides, setBlockLabelOverrides] = useState<Record<string, string>>({});
  const [notesText, setNotesText] = useState('');
  const [status, setStatus] = useState('Idle');
  const [selectedSlot, setSelectedSlot] = useState<BlockSlot | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerStep, setPickerStep] = useState<'type' | 'model'>('type');
  const [pickerType, setPickerType] = useState<null | keyof typeof blockTypes>(null);
  const [pickerQuery, setPickerQuery] = useState('');
  const [targetSlot, setTargetSlot] = useState({ path: 0, block: 0 });
  const [slotMenuOpen, setSlotMenuOpen] = useState(false);
  const [slotMenuTarget, setSlotMenuTarget] = useState<BlockSlot | null>(null);
  const [blockEditorOpen, setBlockEditorOpen] = useState(false);
  const [blockEditorSlot, setBlockEditorSlot] = useState<BlockSlot | null>(null);
  const [grid, setGrid] = useState<SignalFlowGrid>(() =>
    Array.from({ length: 4 }, () => Array.from({ length: 12 }, () => null))
  );
  const [ioGrid, setIoGrid] = useState<IOGrid>(() =>
    Array.from({ length: 4 }, () => ({ input: null, output: null }))
  );
  const [ioPickerOpen, setIoPickerOpen] = useState(false);
  const [ioPickerRow, setIoPickerRow] = useState<PathIndex>(0);
  const [ioPickerType, setIoPickerType] = useState<IOType>('input');
  const [ioPickerQuery, setIoPickerQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabKey>('flow');
  const [screen, setScreen] = useState<'main' | 'editor' | 'performance' | 'tuner'>('main');
  const [tunerReturnScreen, setTunerReturnScreen] = useState<'main' | 'performance'>('main');
  const [libraryRoot, setLibraryRoot] = useState<PresetLibraryRoot>('setlists');
  const [setlists, setSetlists] = useState<HelixContentRef[]>([]);
  const [selectedContainerId, setSelectedContainerId] = useState<number | null>(null);
  const [selectedContainerName, setSelectedContainerName] = useState('Setlists');
  const [targetSetlistId, setTargetSetlistId] = useState<number | null>(null);
  const [presetItems, setPresetItems] = useState<HelixContentRef[]>([]);
  const [activePresetContentId, setActivePresetContentId] = useState<number | null>(null);
  const [activePresetRef, setActivePresetRef] = useState<HelixContentRef | null>(null);
  const [snapshotCount, setSnapshotCount] = useState(0);
  const [activeSnapshotIndex, setActiveSnapshotIndex] = useState<number | null>(null);
  const [snapshots, setSnapshots] = useState<SnapshotRef[]>([]);
  const [activeSnapshotTargets, setActiveSnapshotTargets] = useState<number[] | null>(null);
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [presetEdited, setPresetEdited] = useState<boolean | null>(null);
  const [presetRenameText, setPresetRenameText] = useState('');
  const [setlistRenameText, setSetlistRenameText] = useState('');
  const [snapshotRenameText, setSnapshotRenameText] = useState('');
  const [presetFilter, setPresetFilter] = useState('');
  const [snapshotCopySource, setSnapshotCopySource] = useState<number | null>(null);
  const [snapshotCopyTarget, setSnapshotCopyTarget] = useState<number | null>(null);
  const [pathClipboard, setPathClipboard] = useState<HelixPathClipboard | null>(null);
  const [setlistPickerOpen, setSetlistPickerOpen] = useState(false);
  const [targetSetlistPickerOpen, setTargetSetlistPickerOpen] = useState(false);
  const [presetActionTarget, setPresetActionTarget] = useState<HelixContentRef | null>(null);
  const [snapshotActionIndex, setSnapshotActionIndex] = useState<number | null>(null);
  const [flowScrollEnabled, setFlowScrollEnabled] = useState(true);
  const [liveTempoBpm, setLiveTempoBpm] = useState<number | null>(null);
  const [globalTempoBpm, setGlobalTempoBpm] = useState<number | null>(null);
  const [tempoFollow, setTempoFollow] = useState<boolean | null>(null);
  const [tunerReferencePitch, setTunerReferencePitch] = useState<number | null>(null);
  const [tunerAlwaysOnStomp, setTunerAlwaysOnStomp] = useState<boolean | null>(null);
  const [tunerAlwaysOnPlayView, setTunerAlwaysOnPlayView] = useState<boolean | null>(null);
  const [tunerVolPedalOpens, setTunerVolPedalOpens] = useState<boolean | null>(null);
  const [tunerTrails, setTunerTrails] = useState<boolean | null>(null);
  const [tunerOffsetsEnabled, setTunerOffsetsEnabled] = useState<boolean | null>(null);
  const [tunerStringOffsets, setTunerStringOffsets] = useState<Record<number, number | null>>(
    EMPTY_TUNER_STRING_OFFSETS
  );

  const modelLookup = useMemo(() => {
    const map = new Map<number, { name: string; realName: string | null; kind: string; usage: number; params: EditorParam[] }>();
    Object.entries(blockCatalog).forEach(([key, group]) => {
      group.models.forEach((item) => {
        map.set(item.id, {
          name: item.name,
          realName: item.based_on ?? null,
          kind: key,
          usage: item.usage ?? 0,
          params: item.params ?? [],
        });
      });
    });
    return map;
  }, []);

  const ioData = ioModels as IOModelData;
  const ioModelLookup = useMemo(() => {
    const map = new Map<number, { name: string; type: IOType; params: IOModelParam[] }>();
    ioData.inputs.models.forEach((model) => {
      map.set(model.id, { name: model.name, type: 'input', params: model.params });
    });
    ioData.outputs.models.forEach((model) => {
      map.set(model.id, { name: model.name, type: 'output', params: model.params });
    });
    return map;
  }, [ioData]);

  const pathUsage = useMemo(() => {
    const sumRow = (row: Array<BlockData | null>) =>
      row.reduce((acc, cell) => acc + (cell?.usage ?? 0), 0);
    return {
      path1: sumRow(grid[0]) + sumRow(grid[1]),
      path2: sumRow(grid[2]) + sumRow(grid[3]),
    };
  }, [grid]);

  const hasSplit1 = useMemo(() => {
    const hasBlocks = grid[1]?.some((b) => b !== null) ?? false;
    const hasIO = (ioGrid[1]?.input?.modelId ?? null) !== null || (ioGrid[1]?.output?.modelId ?? null) !== null;
    return hasBlocks || hasIO;
  }, [grid, ioGrid]);
  const hasSplit2 = useMemo(() => {
    const hasBlocks = grid[3]?.some((b) => b !== null) ?? false;
    const hasIO = (ioGrid[3]?.input?.modelId ?? null) !== null || (ioGrid[3]?.output?.modelId ?? null) !== null;
    return hasBlocks || hasIO;
  }, [grid, ioGrid]);

  const rowLabels = ['1A', '1B', '2A', '2B'];
  const rowToFlow = (row: PathIndex) => (row < 2 ? 0 : 1);
  const ioBlockIndex = (row: PathIndex, ioType: IOType) => {
    if (ioType === 'input') {
      return row % 2 === 0 ? 0 : 14;
    }
    return row % 2 === 0 ? 13 : 27;
  };

  const effectBlockIndex = (row: PathIndex, slot: number) => (row % 2 === 0 ? slot + 1 : slot + 15);
  const cloneGrid = (prev: SignalFlowGrid): SignalFlowGrid =>
    prev.map((row) =>
      row.map((cell) =>
        cell
          ? {
              ...cell,
              params: cell.params ? { ...cell.params } : {},
            }
          : null
      )
    );
  const buildParamDefaults = (params: EditorParam[]) =>
    params.reduce<Record<string, number | boolean>>((acc, param) => {
      const key = param.id !== null ? String(param.id) : param.property_key ?? param.key;
      if (!key || param.def === undefined) return acc;
      acc[key] = param.def;
      return acc;
    }, {});
  const clampParamValue = (param: EditorParam, value: number | boolean) => {
    if (param.type === 'b') {
      return typeof value === 'boolean' ? value : Boolean(Number(value));
    }
    const numeric = typeof value === 'boolean' ? (value ? 1 : 0) : Number(value);
    if (!Number.isFinite(numeric)) {
      return null;
    }
    let next = param.type === 'i' ? Math.round(numeric) : numeric;
    if (typeof param.min === 'number') {
      next = Math.max(param.min, next);
    }
    if (typeof param.max === 'number') {
      next = Math.min(param.max, next);
    }
    return next;
  };
  const blockTypeOrder: Array<keyof typeof blockTypes> = [
    'amp',
    'preamp',
    'cab',
    'distortion',
    'delay',
    'reverb',
    'modulation',
    'dynamics',
    'eq',
    'pitch_synth',
    'wah_filter',
    'volume_pan',
    'looper',
    'fx_loop',
  ];
  const pickerModels = useMemo(() => {
    if (!pickerType) return [];
    const items = blockCatalog[pickerType].models;
    if (!pickerQuery.trim()) return items;
    const q = pickerQuery.trim().toLowerCase();
    return items.filter((item) =>
      item.name.toLowerCase().includes(q) || (item.based_on ?? '').toLowerCase().includes(q)
    );
  }, [pickerType, pickerQuery]);
  const ioPickerModels = useMemo(() => {
    const items = ioPickerType === 'input' ? ioData.inputs.models : ioData.outputs.models;
    if (!ioPickerQuery.trim()) return items;
    const q = ioPickerQuery.trim().toLowerCase();
    return items.filter((item) => item.name.toLowerCase().includes(q));
  }, [ioPickerQuery, ioPickerType, ioData]);
  const activeIOModel = ioGrid[ioPickerRow]?.[ioPickerType] ?? null;
  const activeIOModelMeta = activeIOModel?.modelId
    ? ioModelLookup.get(activeIOModel.modelId) ?? null
    : null;
  const activeBlock = blockEditorSlot
    ? grid[blockEditorSlot.path]?.[blockEditorSlot.block] ?? null
    : null;
  const activeBlockMeta = activeBlock?.id ? modelLookup.get(activeBlock.id) ?? null : null;
  const activePresetName = activePresetRef?.name ?? 'None';
  const activePresetStorageId =
    typeof activePresetRef?.rcid === 'number' ? activePresetRef.rcid : activePresetContentId;
  const dspLimit = extendedDspEnabled ? EXTENDED_DSP_CAP : STANDARD_DSP_CAP;
  const isUsefulRealName = (realName?: string | null) =>
    Boolean(realName && realName.trim() && realName.trim().toLowerCase() !== 'line 6 original');
  const getBlockLabelOverrideKey = (path: number, blockId: number | undefined, modelId: number) =>
    `${activePresetStorageId ?? 'live'}:${path}:${blockId ?? 'slot'}:${modelId}`;
  const getBlockDisplayName = (block: BlockData | null) => {
    if (!block) return '';
    const customName = block.customName?.trim();
    if (blockLabelMode && customName) return customName;
    if (showRealBlockNames && isUsefulRealName(block.realName)) return block.realName!.trim();
    return block.modelName ?? block.name;
  };
  const getBlockMetaName = (block: BlockData | null) => {
    if (!block) return '';
    const modelName = block.modelName ?? block.name;
    if (blockLabelMode && block.customName?.trim()) return modelName;
    if (showRealBlockNames && isUsefulRealName(block.realName)) return modelName;
    return block.realName ?? '';
  };
  const decorateDisplayBlocks = (row: Array<BlockData | null>) =>
    row.map((block) => (block ? { ...block, name: getBlockDisplayName(block) } : null));
  const availableUsage = useMemo(() => {
    const remaining = targetSlot.path < 2 ? dspLimit - pathUsage.path1 : dspLimit - pathUsage.path2;
    return Math.max(0, remaining);
  }, [dspLimit, pathUsage, targetSlot.path]);
  const activeSetlist = useMemo(
    () => setlists.find((item) => item.cid_ === selectedContainerId) ?? null,
    [selectedContainerId, setlists]
  );
  const targetSetlist = useMemo(
    () => setlists.find((item) => item.cid_ === targetSetlistId) ?? null,
    [targetSetlistId, setlists]
  );
  const activeSnapshot = useMemo(
    () => snapshots.find((item) => item.index === activeSnapshotIndex) ?? null,
    [activeSnapshotIndex, snapshots]
  );
  const filteredPresetItems = useMemo(() => {
    const query = presetFilter.trim().toLowerCase();
    if (!query) return presetItems;
    return presetItems.filter((item) => {
      const name = item.name ?? '';
      const slot = typeof item.posi === 'number' ? String(item.posi + 1) : '';
      return name.toLowerCase().includes(query) || slot.includes(query) || String(item.cid_ ?? '').includes(query);
    });
  }, [presetFilter, presetItems]);
  const isPresetActive = (item: HelixContentRef) => {
    const itemId = typeof item.cid_ === 'number' ? item.cid_ : null;
    if (itemId === null) return false;
    if (itemId === activePresetContentId) return true;
    if (typeof activePresetRef?.rcid === 'number' && activePresetRef.rcid === itemId) return true;
    return false;
  };
  const activePresetIndexInList = useMemo(
    () => presetItems.findIndex((item) => isPresetActive(item)),
    [activePresetContentId, activePresetRef, presetItems]
  );
  const performancePresetWindow = useMemo(() => {
    const windowSize = 8;
    if (!presetItems.length) return [];
    if (activePresetIndexInList < 0) return presetItems.slice(0, windowSize);
    let start = Math.max(0, activePresetIndexInList - 3);
    let end = Math.min(presetItems.length, start + windowSize);
    start = Math.max(0, end - windowSize);
    return presetItems.slice(start, end);
  }, [activePresetIndexInList, presetItems]);
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
  const formatSignedValue = (value: number | null) => {
    if (value === null) return '\u2014';
    const rounded = Number.isInteger(value) ? value : Number(value.toFixed(1));
    return rounded > 0 ? `+${rounded}` : `${rounded}`;
  };
  const openTunerScreen = (returnScreen: 'main' | 'performance') => {
    setTunerReturnScreen(returnScreen);
    setScreen('tuner');
  };
  const closeTunerScreen = () => {
    setScreen(tunerReturnScreen);
  };

  const handleClientEvent = (event: HelixEvent) => {
    const addr = event.addr.toLowerCase();
    const property = event.property;
    const key = property?.key;
    if (!key) {
      if (
        addr === '/setmodelwithmid' ||
        addr === '/setparamvalue' ||
        addr === '/setblockenable' ||
        addr === '/clrb' ||
        addr === '/clrblock' ||
        addr === '/setsnapshotname'
      ) {
        scheduleSync(700, { full: false, silent: true });
      }
      return;
    }

    if (key === 'global.tempo.bpm') {
      const value = coerceNumber(property?.value);
      if (value !== null) {
        setGlobalTempoBpm(value);
      }
      return;
    }
    if (key === 'volatile.tempo.bpm' || key === 'preset.tempo.bpm') {
      const value = coerceNumber(property?.value);
      if (value !== null) {
        setLiveTempoBpm(value);
      }
      return;
    }
    if (key === 'global.tempo.follow') {
      setTempoFollow(coerceBool(property?.value));
      return;
    }
    if (key === 'global.tuner.reference.pitch') {
      setTunerReferencePitch(coerceNumber(property?.value));
      return;
    }
    if (key === 'global.tuner.alwaysonstomp') {
      setTunerAlwaysOnStomp(coerceBool(property?.value));
      return;
    }
    if (key === 'global.tuner.alwaysonplayview') {
      setTunerAlwaysOnPlayView(coerceBool(property?.value));
      return;
    }
    if (key === 'global.tuner.volpedalopens') {
      setTunerVolPedalOpens(coerceBool(property?.value));
      return;
    }
    if (key === 'global.tuner.trails') {
      setTunerTrails(coerceBool(property?.value));
      return;
    }
    if (key === 'global.tuner.offsets') {
      setTunerOffsetsEnabled(coerceBool(property?.value));
      return;
    }
    if (key === 'global.modelselect.addcabblock') {
      const value = coerceBool(property?.value);
      if (value !== null) {
        setAutoCab(value);
      }
      return;
    }
    if (key === 'server.active.preset.id') {
      const value = coerceNumber(property?.value);
      if (value !== null) {
        setActivePresetContentId(value);
      }
      scheduleSync(900, { full: true, silent: true });
      return;
    }
    if (key === 'volatile.preset.edited') {
      setPresetEdited(coerceBool(property?.value));
      return;
    }
    if (key === 'preset.meta.info') {
      setNotesText(typeof property.value === 'string' ? property.value : '');
      return;
    }
    const tunerOffsetMatch = key.match(/^global\.tuner\.offset\.string\.(\d)$/);
    if (tunerOffsetMatch) {
      const stringNumber = Number(tunerOffsetMatch[1]);
      const value = coerceNumber(property?.value);
      setTunerStringOffsets((prev) => ({ ...prev, [stringNumber]: value }));
      return;
    }
    if (addr === '/setpropertyvalue' && key.startsWith('preset.')) {
      scheduleSync(900, { full: true, silent: true });
    }
  };

  const connect = async () => {
    if (connecting || connected) return;
    setConnecting(true);
    try {
      const client = new HelixClient(host.trim());
      await client.connect();
      client.startListener(handleClientEvent);
      clientRef.current = client;
      setConnected(true);
      setStatus('Connected');
      await handleFullSync();
    } catch (err) {
      setStatus(buildConnectionFailureStatus(err));
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = () => {
    if (syncTimerRef.current) {
      clearTimeout(syncTimerRef.current);
      syncTimerRef.current = null;
    }
    clientRef.current?.close();
    clientRef.current = null;
    setConnected(false);
    setStatus('Idle');
    setActiveTab('flow');
    setScreen('main');
    setTunerReturnScreen('main');
    setLibraryRoot('setlists');
    setSetlists([]);
    setSelectedContainerId(null);
    setSelectedContainerName('Setlists');
    setTargetSetlistId(null);
    setPresetItems([]);
    setActivePresetContentId(null);
    setActivePresetRef(null);
    setSnapshotCount(0);
    setActiveSnapshotIndex(null);
    setSnapshots([]);
    setActiveSnapshotTargets(null);
    setLibraryLoading(false);
    setPresetEdited(null);
    setPresetRenameText('');
    setSetlistRenameText('');
    setSnapshotRenameText('');
    setPresetFilter('');
    setSnapshotCopySource(null);
    setSnapshotCopyTarget(null);
    setPathClipboard(null);
    setSetlistPickerOpen(false);
    setTargetSetlistPickerOpen(false);
    setPresetActionTarget(null);
    setLiveTempoBpm(null);
    setGlobalTempoBpm(null);
    setTempoFollow(null);
    setTunerReferencePitch(null);
    setTunerAlwaysOnStomp(null);
    setTunerAlwaysOnPlayView(null);
    setTunerVolPedalOpens(null);
    setTunerTrails(null);
    setTunerOffsetsEnabled(null);
    setTunerStringOffsets(EMPTY_TUNER_STRING_OFFSETS);
  };

  useEffect(() => {
    setPresetRenameText(activePresetRef?.name ?? '');
  }, [activePresetRef?.name]);

  useEffect(() => {
    setSetlistRenameText(activeSetlist?.name ?? '');
  }, [activeSetlist?.name]);

  useEffect(() => {
    if (!activeSnapshot) {
      setSnapshotRenameText('');
      return;
    }
    setSnapshotRenameText(activeSnapshot.name ?? `Snapshot ${activeSnapshot.index + 1}`);
  }, [activeSnapshot]);

  useEffect(() => {
    setBlockLabelDraft(activeBlock?.customName ?? '');
  }, [activeBlock?.customName, blockEditorSlot?.block, blockEditorSlot?.path]);

  useEffect(() => {
    if (activeSnapshotIndex === null || snapshotCount <= 0) return;
    setSnapshotCopySource((prev) => (prev === null ? activeSnapshotIndex : prev));
    setSnapshotCopyTarget((prev) => {
      if (prev !== null && prev < snapshotCount) return prev;
      if (snapshotCount <= 1) return activeSnapshotIndex;
      return (activeSnapshotIndex + 1) % snapshotCount;
    });
  }, [activeSnapshotIndex, snapshotCount]);

  useEffect(() => {
    let cancelled = false;
    const client = clientRef.current;
    if (!client || activeSnapshotIndex === null) {
      setActiveSnapshotTargets(null);
      return () => {
        cancelled = true;
      };
    }
    client
      .getSnapshotTargets(activeSnapshotIndex)
      .then((targets) => {
        if (!cancelled) {
          setActiveSnapshotTargets(targets);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setActiveSnapshotTargets(null);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [activeSnapshotIndex, activePresetContentId]);

  const requireClient = () => {
    if (!clientRef.current) {
      setStatus('Not connected');
      return null;
    }
    return clientRef.current;
  };

  const refreshTransportContext = async (clientArg?: HelixClient | null) => {
    const client = clientArg ?? requireClient();
    if (!client) return;
    try {
      const [
        liveTempoProp,
        presetTempoProp,
        globalTempoProp,
        tempoFollowProp,
        tunerReferenceProp,
        tunerAlwaysOnStompProp,
        tunerAlwaysOnPlayProp,
        tunerVolPedalProp,
        tunerTrailsProp,
        tunerOffsetsProp,
        autoCabProp,
        ...tunerOffsetProps
      ] = await Promise.all([
        client.getProperty('volatile.tempo.bpm').catch(() => null),
        client.getProperty('preset.tempo.bpm').catch(() => null),
        client.getProperty('global.tempo.bpm').catch(() => null),
        client.getProperty('global.tempo.follow').catch(() => null),
        client.getProperty('global.tuner.reference.pitch').catch(() => null),
        client.getProperty('global.tuner.alwaysonstomp').catch(() => null),
        client.getProperty('global.tuner.alwaysonplayview').catch(() => null),
        client.getProperty('global.tuner.volpedalopens').catch(() => null),
        client.getProperty('global.tuner.trails').catch(() => null),
        client.getProperty('global.tuner.offsets').catch(() => null),
        client.getProperty('global.modelselect.addcabblock').catch(() => null),
        ...TUNER_STRING_CONFIG.map(({ stringNumber }) =>
          client.getProperty(`global.tuner.offset.string.${stringNumber}`).catch(() => null)
        ),
      ]);

      const nextGlobalTempo = coerceNumber(globalTempoProp?.value);
      const nextLiveTempo =
        coerceNumber(liveTempoProp?.value) ??
        coerceNumber(presetTempoProp?.value) ??
        nextGlobalTempo;

      setLiveTempoBpm(nextLiveTempo);
      setGlobalTempoBpm(nextGlobalTempo);
      setTempoFollow(coerceBool(tempoFollowProp?.value));
      setTunerReferencePitch(coerceNumber(tunerReferenceProp?.value));
      setTunerAlwaysOnStomp(coerceBool(tunerAlwaysOnStompProp?.value));
      setTunerAlwaysOnPlayView(coerceBool(tunerAlwaysOnPlayProp?.value));
      setTunerVolPedalOpens(coerceBool(tunerVolPedalProp?.value));
      setTunerTrails(coerceBool(tunerTrailsProp?.value));
      setTunerOffsetsEnabled(coerceBool(tunerOffsetsProp?.value));
      setAutoCab(coerceBool(autoCabProp?.value) ?? true);
      setTunerStringOffsets(
        TUNER_STRING_CONFIG.reduce<Record<number, number | null>>((acc, { stringNumber }, index) => {
          acc[stringNumber] = coerceNumber(tunerOffsetProps[index]?.value);
          return acc;
        }, {})
      );
    } catch (_err) {
      // Leave the last known transport state in place if a property fetch fails.
    }
  };

  const loadPresetContainer = async (containerId: number, label: string) => {
    const client = requireClient();
    if (!client) return;
    const items = await client.getContainerContents(containerId);
    setSelectedContainerId(containerId);
    setSelectedContainerName(label);
    setPresetItems(items as HelixContentRef[]);
  };

  const refreshPresetContext = async () => {
    const client = requireClient();
    if (!client) return;
    setLibraryLoading(true);
    try {
      const [activeId, snapshotTotal, snapshotIndex, setlistItems, edited, snapshotItems] = await Promise.all([
        client.getActivePresetContentId(),
        client.getSnapshotCount(),
        client.getActiveSnapshotIndex(),
        client.getContainerContents(SETLIST_DIRECTORY_CID),
        client.isPresetEdited(),
        client.getSnapshots().catch(() => []),
      ]);
      const nextSetlists = (setlistItems as HelixContentRef[]) ?? [];
      const nextSnapshots = (snapshotItems as SnapshotRef[]) ?? [];
      const activeRef = activeId !== null ? ((await client.getContentRef(activeId)) as HelixContentRef | null) : null;
      setSetlists(nextSetlists);
      setTargetSetlistId((prev) => {
        if (prev !== null && nextSetlists.some((item) => item.cid_ === prev)) return prev;
        if (typeof activeRef?.ccid === 'number' && nextSetlists.some((item) => item.cid_ === activeRef.ccid)) {
          return activeRef.ccid;
        }
        const firstSetlist = nextSetlists.find((item) => typeof item.cid_ === 'number');
        return typeof firstSetlist?.cid_ === 'number' ? firstSetlist.cid_ : null;
      });
      setActivePresetContentId(activeId);
      setActivePresetRef(activeRef);
      setSnapshotCount(snapshotTotal ?? nextSnapshots.length);
      setActiveSnapshotIndex(snapshotIndex);
      setSnapshots(nextSnapshots);
      setPresetEdited(edited);
      await refreshTransportContext(client);

      if (libraryRoot === 'factory') {
        await loadPresetContainer(FACTORY_PRESETS_CID, 'Factory Presets');
        return;
      }
      if (libraryRoot === 'user') {
        await loadPresetContainer(USER_PRESETS_CID, 'User Presets');
        return;
      }

      const defaultSetlist =
        nextSetlists.find((item) => item.cid_ === activeRef?.ccid) ??
        nextSetlists.find((item) => item.cid_ === selectedContainerId) ??
        nextSetlists[0] ??
        null;

      if (defaultSetlist && typeof defaultSetlist.cid_ === 'number') {
        await loadPresetContainer(defaultSetlist.cid_, defaultSetlist.name ?? 'Setlist');
      } else {
        setSelectedContainerId(null);
        setSelectedContainerName('Setlists');
        setPresetItems([]);
      }
    } finally {
      setLibraryLoading(false);
    }
  };

  const handleLibraryRootChange = async (nextRoot: PresetLibraryRoot) => {
    setLibraryRoot(nextRoot);
    const client = requireClient();
    if (!client) return;
    setLibraryLoading(true);
    try {
      if (nextRoot === 'factory') {
        await loadPresetContainer(FACTORY_PRESETS_CID, 'Factory Presets');
        return;
      }
      if (nextRoot === 'user') {
        await loadPresetContainer(USER_PRESETS_CID, 'User Presets');
        return;
      }
      const nextSetlists = setlists.length ? setlists : ((await client.getContainerContents(SETLIST_DIRECTORY_CID)) as HelixContentRef[]);
      setSetlists(nextSetlists);
      const targetSetlist =
        nextSetlists.find((item) => item.cid_ === activePresetRef?.ccid) ??
        nextSetlists.find((item) => item.cid_ === selectedContainerId) ??
        nextSetlists[0] ??
        null;
      if (targetSetlist && typeof targetSetlist.cid_ === 'number') {
        await loadPresetContainer(targetSetlist.cid_, targetSetlist.name ?? 'Setlist');
      } else {
        setSelectedContainerId(null);
        setSelectedContainerName('Setlists');
        setPresetItems([]);
      }
    } finally {
      setLibraryLoading(false);
    }
  };

  const handleSetlistSelect = async (item: HelixContentRef) => {
    if (typeof item.cid_ !== 'number') return;
    setTargetSetlistId(item.cid_);
    setLibraryLoading(true);
    try {
      await loadPresetContainer(item.cid_, item.name ?? 'Setlist');
    } finally {
      setLibraryLoading(false);
    }
  };

  const handleTabChange = (nextTab: TabKey) => {
    setActiveTab(nextTab);
    if (nextTab === 'setlists' && libraryRoot !== 'setlists') {
      void handleLibraryRootChange('setlists');
    }
    if (nextTab === 'preset' && libraryRoot === 'setlists') {
      void handleLibraryRootChange('user');
    }
  };

  const handlePresetLoad = async (item: HelixContentRef) => {
    const client = requireClient();
    if (!client) return;
    if (isPresetActive(item)) {
      setStatus(`Already on ${item.name ?? 'this preset'}`);
      return;
    }
    if (libraryRoot === 'setlists' && typeof selectedContainerId === 'number' && typeof item.posi === 'number') {
      client.loadPresetAtContainerPosition(selectedContainerId, item.posi);
    } else if (typeof item.cid_ === 'number') {
      client.loadPresetWithCid(item.cid_);
    } else {
      setStatus('Preset is missing a content id');
      return;
    }
    setStatus(`Loading ${item.name ?? 'preset'}...`);
    scheduleSync(900);
  };

  const handlePerformancePresetStep = (delta: -1 | 1) => {
    if (activePresetIndexInList < 0) {
      setStatus('No active preset in this container');
      return;
    }
    const nextItem = presetItems[activePresetIndexInList + delta];
    if (!nextItem) return;
    void handlePresetLoad(nextItem);
  };

  const formatActionError = (label: string, error: unknown) => {
    const detail = error instanceof Error ? error.message : String(error ?? '');
    return detail ? `${label} failed: ${detail}` : `${label} failed`;
  };

  const handleTempoAdjust = (delta: number) => {
    const client = requireClient();
    if (!client) return;
    const base = globalTempoBpm ?? liveTempoBpm ?? 120;
    const next = Math.max(20, Math.min(300, Math.round(base + delta)));
    const previousGlobal = globalTempoBpm;
    const previousLive = liveTempoBpm;
    setGlobalTempoBpm(next);
    setLiveTempoBpm(next);
    void client
      .setPropertyWait('global.tempo.bpm', next, 'i')
      .then(() => {
        setStatus(`Tempo · ${next} BPM`);
        scheduleSync(500);
      })
      .catch((error) => {
        setGlobalTempoBpm(previousGlobal);
        setLiveTempoBpm(previousLive);
        setStatus(formatActionError('Tempo update', error));
      });
  };

  const handleTempoFollowToggle = (value: boolean) => {
    const client = requireClient();
    if (!client) return;
    const previous = tempoFollow;
    setTempoFollow(value);
    void client
      .setPropertyWait('global.tempo.follow', value ? 1 : 0, 'i')
      .then(() => {
        setStatus(value ? 'Following external tempo' : 'Manual tempo');
        scheduleSync(500);
      })
      .catch((error) => {
        setTempoFollow(previous);
        setStatus(formatActionError('Tempo follow update', error));
      });
  };

  const handleTapTempo = () => {
    const client = requireClient();
    if (!client) return;
    void client
      .setPropertyWait('volatile.press.taptempo', 1, 'i')
      .then(() => {
        setStatus('Tap');
        scheduleSync(700);
      })
      .catch((error) => {
        setStatus(formatActionError('Tap tempo', error));
      });
  };

  const handleTunerReferenceAdjust = (delta: number) => {
    const client = requireClient();
    if (!client) return;
    const base = tunerReferencePitch ?? 440;
    const next = Math.max(400, Math.min(480, Math.round(base + delta)));
    const previous = tunerReferencePitch;
    setTunerReferencePitch(next);
    void client
      .setPropertyWait('global.tuner.reference.pitch', next, 'i')
      .then(() => {
        setStatus(`Reference · ${next} Hz`);
        scheduleSync(500);
      })
      .catch((error) => {
        setTunerReferencePitch(previous);
        setStatus(formatActionError('Tuner reference update', error));
      });
  };

  const handleTunerAlwaysOnStompToggle = (value: boolean) => {
    const client = requireClient();
    if (!client) return;
    const previous = tunerAlwaysOnStomp;
    setTunerAlwaysOnStomp(value);
    void client
      .setPropertyWait('global.tuner.alwaysonstomp', value ? 1 : 0, 'i')
      .then(() => {
        setStatus(value ? 'Tuner pinned in Stomp view' : 'Tuner unpinned in Stomp view');
        scheduleSync(500);
      })
      .catch((error) => {
        setTunerAlwaysOnStomp(previous);
        setStatus(formatActionError('Stomp-view tuner update', error));
      });
  };

  const handleTunerAlwaysOnPlayViewToggle = (value: boolean) => {
    const client = requireClient();
    if (!client) return;
    const previous = tunerAlwaysOnPlayView;
    setTunerAlwaysOnPlayView(value);
    void client
      .setPropertyWait('global.tuner.alwaysonplayview', value ? 1 : 0, 'i')
      .then(() => {
        setStatus(value ? 'Tuner pinned in Play view' : 'Tuner unpinned in Play view');
        scheduleSync(500);
      })
      .catch((error) => {
        setTunerAlwaysOnPlayView(previous);
        setStatus(formatActionError('Play-view tuner update', error));
      });
  };

  const handleTunerVolPedalOpensToggle = (value: boolean) => {
    const client = requireClient();
    if (!client) return;
    const previous = tunerVolPedalOpens;
    setTunerVolPedalOpens(value);
    void client
      .setPropertyWait('global.tuner.volpedalopens', value ? 1 : 0, 'i')
      .then(() => {
        setStatus(value ? 'Volume pedal opens the tuner' : 'Volume pedal won’t open the tuner');
        scheduleSync(500);
      })
      .catch((error) => {
        setTunerVolPedalOpens(previous);
        setStatus(formatActionError('Volume-pedal tuner update', error));
      });
  };

  const handleTunerTrailsToggle = (value: boolean) => {
    const client = requireClient();
    if (!client) return;
    const previous = tunerTrails;
    setTunerTrails(value);
    void client
      .setPropertyWait('global.tuner.trails', value ? 1 : 0, 'i')
      .then(() => {
        setStatus(value ? 'Tuner trails on' : 'Tuner trails off');
        scheduleSync(500);
      })
      .catch((error) => {
        setTunerTrails(previous);
        setStatus(formatActionError('Tuner trails update', error));
      });
  };

  const handleTunerOffsetsEnabledToggle = (value: boolean) => {
    const client = requireClient();
    if (!client) return;
    const previous = tunerOffsetsEnabled;
    setTunerOffsetsEnabled(value);
    void client
      .setPropertyWait('global.tuner.offsets', value ? 1 : 0, 'i')
      .then(() => {
        setStatus(value ? 'Per-string offsets on' : 'Per-string offsets off');
        scheduleSync(500);
      })
      .catch((error) => {
        setTunerOffsetsEnabled(previous);
        setStatus(formatActionError('Tuner offset mode update', error));
      });
  };

  const handleTunerStringOffsetAdjust = (stringNumber: number, delta: number) => {
    const client = requireClient();
    if (!client) return;
    const previous = tunerStringOffsets[stringNumber];
    const base = previous ?? 0;
    const next = Math.max(-50, Math.min(50, Number((base + delta).toFixed(1))));
    const valueType: 'i' | 'f' = Number.isInteger(base) && Number.isInteger(next) ? 'i' : 'f';
    setTunerStringOffsets((prev) => ({ ...prev, [stringNumber]: next }));
    void client
      .setPropertyWait(`global.tuner.offset.string.${stringNumber}`, next, valueType)
      .then(() => {
        setStatus(
          `${TUNER_STRING_CONFIG.find((item) => item.stringNumber === stringNumber)?.label ?? `String ${stringNumber}`} offset set to ${formatSignedValue(next)}`
        );
        scheduleSync(500);
      })
      .catch((error) => {
        setTunerStringOffsets((prev) => ({ ...prev, [stringNumber]: previous ?? null }));
        setStatus(formatActionError(`String ${stringNumber} offset update`, error));
      });
  };

  const handleOpenTuner = (returnScreen: 'main' | 'performance') => {
    openTunerScreen(returnScreen);
    const client = requireClient();
    if (!client) return;
    void client
      .setPropertyWait('volatile.held.taptempo', 11, 'i')
      .then(() => {
        setStatus('Tuner open');
      })
      .catch((error) => {
        setStatus(formatActionError('Open tuner', error));
      });
  };

  const handleExitTuner = () => {
    const client = requireClient();
    if (!client) return;
    void client
      .setPropertyWait('volatile.press.exittuner', 11, 'i')
      .then(() => {
        setStatus('Tuner closed');
      })
      .catch((error) => {
        setStatus(formatActionError('Exit tuner', error));
      });
  };

  const handleSavePreset = () => {
    const client = requireClient();
    if (!client) return;
    if (activePresetStorageId === null) {
      setStatus('No active preset to save');
      return;
    }
    client.savePresetWithCid(activePresetStorageId);
    setPresetEdited(false);
    setStatus(`Saving ${activePresetName}...`);
    scheduleSync(1200);
  };

  const handleRenameContent = async (contentId: number, name: string, label: string) => {
    const client = requireClient();
    if (!client) return;
    const trimmed = name.trim();
    if (!trimmed) {
      setStatus(`A ${label.toLowerCase()} name is required`);
      return;
    }
    try {
      await client.renameContent(contentId, trimmed);
      setStatus(`Renamed ${label.toLowerCase()} to ${trimmed}`);
      await refreshPresetContext();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setStatus(`Rename failed: ${message}`);
    }
  };

  const handleAddPresetToSetlist = async (item: HelixContentRef) => {
    const client = requireClient();
    if (!client) return;
    if (typeof item.cid_ !== 'number') {
      setStatus('Preset is missing a content id');
      return;
    }
    if (typeof targetSetlistId !== 'number') {
      setStatus('Select a target setlist first');
      return;
    }
    try {
      const targetItems = (await client.getContainerContents(targetSetlistId)) as HelixContentRef[];
      const position = Array.isArray(targetItems) ? targetItems.length : 0;
      await client.addContentsToContainer(targetSetlistId, [item.cid_], position);
      setStatus(`Added ${item.name ?? 'preset'} to ${targetSetlist?.name ?? 'setlist'}`);
      await refreshPresetContext();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setStatus(`Add to setlist failed: ${message}`);
    }
  };

  const handleRemovePresetFromSetlist = async (item: HelixContentRef) => {
    const client = requireClient();
    if (!client) return;
    if (typeof selectedContainerId !== 'number' || typeof item.cid_ !== 'number') {
      setStatus('Select a setlist entry first');
      return;
    }
    try {
      await client.removeContent(selectedContainerId, [item.cid_]);
      setStatus(`Removed ${item.name ?? 'preset'} from ${selectedContainerName}`);
      await refreshPresetContext();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setStatus(`Remove failed: ${message}`);
    }
  };

  const handleMoveSetlistPreset = async (item: HelixContentRef, delta: -1 | 1) => {
    const client = requireClient();
    if (!client) return;
    if (typeof selectedContainerId !== 'number' || typeof item.cid_ !== 'number' || typeof item.posi !== 'number') {
      setStatus('Only setlist entries can be reordered');
      return;
    }
    const currentIndex = item.posi;
    const nextIndex = currentIndex + delta;
    if (nextIndex < 0 || nextIndex >= presetItems.length) {
      return;
    }
    const insertionIndex = nextIndex > currentIndex ? nextIndex + 1 : nextIndex;
    try {
      await client.reorderContainerContent(selectedContainerId, [item.cid_], insertionIndex);
      setStatus(`Moved ${item.name ?? 'preset'} to slot ${nextIndex + 1}`);
      await refreshPresetContext();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setStatus(`Reorder failed: ${message}`);
    }
  };

  const handleCopyPath = async (pathNum: 1 | 2) => {
    const client = requireClient();
    if (!client) return;
    const flowIndex = pathNum - 1;
    try {
      const clipboard = await client.capturePath(flowIndex);
      if (!clipboard.entries.length) {
        setStatus(`Path ${pathNum} has no devices to copy`);
        return;
      }
      setPathClipboard(clipboard);
      setStatus(`Copied Path ${pathNum} (${clipboard.entries.length} blocks)`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setStatus(`Copy path failed: ${message}`);
    }
  };

  const handlePastePath = async (pathNum: 1 | 2) => {
    const client = requireClient();
    if (!client) return;
    if (!pathClipboard) {
      setStatus('Copy a path first');
      return;
    }
    const targetFlow = pathNum - 1;
    if (pathClipboard.sourcePath === targetFlow) {
      setStatus('Choose a different target path');
      return;
    }
    try {
      const result = await client.pastePathClipboard(pathClipboard, targetFlow);
      const routingNote = result.routingEntryCount > 0 ? `, ${result.routingEntryCount} split/join nodes` : '';
      setStatus(`Pasted Path ${pathClipboard.sourcePath + 1} to Path ${pathNum} (${result.entryCount} blocks${routingNote})`);
      scheduleSync(1800);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setStatus(`Paste path failed: ${message}`);
    }
  };

  const handleSnapshotActivate = (index: number) => {
    const client = requireClient();
    if (!client) return;
    client.activateSnapshot(index);
    setActiveSnapshotIndex(index);
    const snapshotName = snapshots.find((item) => item.index === index)?.name;
    setStatus(`Activating ${snapshotName ? `${index + 1}: ${snapshotName}` : `snapshot ${index + 1}`}`);
    scheduleSync(500);
  };

  const handleSnapshotRename = async () => {
    const client = requireClient();
    if (!client) return;
    if (activeSnapshotIndex === null) {
      setStatus('No active snapshot selected');
      return;
    }
    const trimmed = snapshotRenameText.trim();
    if (!trimmed) {
      setStatus('A snapshot name is required');
      return;
    }
    try {
      await client.setSnapshotName(activeSnapshotIndex, trimmed);
      setSnapshots((prev) =>
        prev.map((item) => (item.index === activeSnapshotIndex ? { ...item, name: trimmed } : item))
      );
      setStatus(`Renamed snapshot ${activeSnapshotIndex + 1} to ${trimmed}`);
      scheduleSync(900);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setStatus(`Snapshot rename failed: ${message}`);
    }
  };

  const handleSnapshotCopy = async () => {
    const client = requireClient();
    if (!client) return;
    if (snapshotCopySource === null || snapshotCopyTarget === null) {
      setStatus('Select both a source and destination snapshot');
      return;
    }
    try {
      await client.copySnapshot(snapshotCopySource, snapshotCopyTarget);
      setStatus(`Copied snapshot ${snapshotCopySource + 1} to ${snapshotCopyTarget + 1}`);
      scheduleSync(900);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setStatus(`Snapshot copy failed: ${message}`);
    }
  };

  const handleSnapshotColor = async (color: number) => {
    const client = requireClient();
    if (!client) return;
    if (activeSnapshotIndex === null) {
      setStatus('No active snapshot selected');
      return;
    }
    try {
      await client.setSnapshotColor(activeSnapshotIndex, color);
      setSnapshots((prev) =>
        prev.map((item) => (item.index === activeSnapshotIndex ? { ...item, colr: color } : item))
      );
      setStatus(
        `Set snapshot ${activeSnapshotIndex + 1} color to ${SNAPSHOT_COLOR_LABELS[color] ?? `enum ${color}`}`
      );
      scheduleSync(700);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setStatus(`Snapshot color failed: ${message}`);
    }
  };

  const handleNotesToggle = (value: boolean) => {
    setNotesVisible(value);
    const client = requireClient();
    if (!client) return;
    client.setNotesVisible(value);
    setStatus(value ? 'Notes shown' : 'Notes hidden');
  };

  const handleAutoCab = (value: boolean) => {
    setAutoCab(value);
    const client = requireClient();
    if (!client) return;
    client.setAutoCab(value);
    setStatus(value ? 'Auto-cab enabled' : 'Auto-cab disabled');
  };

  const handleNotesSend = () => {
    const client = requireClient();
    if (!client) return;
    client.setNotes(notesText);
    setStatus('Notes sent');
  };

  const insertModel = async (modelId: number, name: string, kind: string, usage = 0) => {
    const client = requireClient();
    if (!client) return;
    const p = targetSlot.path as PathIndex;
    const b = targetSlot.block;
    const blockId = effectBlockIndex(p, b);
    const meta = modelLookup.get(modelId);
    if (usage > availableUsage) {
      setStatus(`DSP budget reached (${dspLimit} per path)`);
      return;
    }
    const flow = rowToFlow(p);
    try {
      await client.setModelWait(flow, blockId, modelId, 0);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setStatus(`Insert failed: ${message}`);
      return;
    }
    setStatus(`Inserted ${name} into ${rowLabels[p]}-${b + 1}`);
    setGrid((prev) => {
      const next = cloneGrid(prev);
      if (next[p] && next[p][b] !== undefined) {
        next[p][b] = {
          id: modelId,
          name,
          modelName: name,
          realName: meta?.realName ?? null,
          kind,
          usage,
          enabled: true,
          blockId,
          params: buildParamDefaults(meta?.params ?? []),
        };
      }
      return next;
    });
    setPickerOpen(false);
    scheduleSync();
  };

  const selectSlot = (slot: BlockSlot) => {
    setSelectedSlot(slot);
    const existingBlock = grid[slot.path]?.[slot.block] ?? null;
    if (existingBlock) {
      setBlockEditorSlot(slot);
      setBlockEditorOpen(true);
      setScreen('editor');
      return;
    }
    setTargetSlot({ path: slot.path, block: slot.block });
    setPickerStep('type');
    setPickerType(null);
    setPickerQuery('');
    setPickerOpen(true);
  };

  const closeEditor = () => {
    setScreen('main');
    setBlockEditorOpen(false);
    setBlockEditorSlot(null);
  };

  const openSlotMenu = (slot: BlockSlot) => {
    setSlotMenuTarget(slot);
    setSlotMenuOpen(true);
  };

  const openBlockEditor = (slot: BlockSlot) => {
    setSelectedSlot(slot);
    setBlockEditorSlot(slot);
    setBlockEditorOpen(true);
    setSlotMenuOpen(false);
  };

  const replaceSlotModel = (slot: BlockSlot) => {
    setSlotMenuOpen(false);
    selectSlot(slot);
  };

  const selectBlockType = (typeKey: keyof typeof blockTypes) => {
    setPickerType(typeKey);
    setPickerStep('model');
    setPickerQuery('');
  };

  const selectIO = (row: PathIndex, ioType: IOType) => {
    if (ioType === 'input' && row % 2 === 1) {
      setStatus('1B/2B inputs derive from the split and cannot be set directly');
      return;
    }
    setIoPickerRow(row);
    setIoPickerType(ioType);
    setIoPickerQuery('');
    setIoPickerOpen(true);
  };

  const setLocalBlockEnabled = (slot: BlockSlot, enabled: boolean) => {
    setGrid((prev) => {
      const next = cloneGrid(prev);
      const block = next[slot.path]?.[slot.block];
      if (block) {
        block.enabled = enabled;
      }
      return next;
    });
  };

  const toggleBlockEnabled = async (slot: BlockSlot) => {
    const client = requireClient();
    if (!client) return;
    const block = grid[slot.path]?.[slot.block] ?? null;
    if (!block) return;

    const currentEnabled = block.enabled !== false;
    const nextEnabled = !currentEnabled;
    const flow = rowToFlow(slot.path);
    const blockId = block.blockId ?? effectBlockIndex(slot.path, slot.block);

    setLocalBlockEnabled(slot, nextEnabled);
    setStatus(`${nextEnabled ? 'Enabled' : 'Bypassed'} ${block.name}`);

    try {
      await client.setBlockEnableWait(flow, blockId, nextEnabled);
      scheduleSync(350);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setLocalBlockEnabled(slot, currentEnabled);
      setStatus(`Block toggle failed: ${message}`);
      scheduleSync(150);
    }
  };

  const clearSlot = async (slot: BlockSlot) => {
    const client = requireClient();
    if (!client) return;
    const position = effectBlockIndex(slot.path, slot.block);
    const existingBlock = grid[slot.path]?.[slot.block] ?? null;
    await client.clearBlocks(rowToFlow(slot.path), [position]);
    if (existingBlock) {
      const overrideKey = getBlockLabelOverrideKey(slot.path, existingBlock.blockId, existingBlock.id);
      setBlockLabelOverrides((prev) => {
        if (!prev[overrideKey]) return prev;
        const next = { ...prev };
        delete next[overrideKey];
        return next;
      });
    }
    setGrid((prev) => {
      const next = cloneGrid(prev);
      if (next[slot.path] && next[slot.path][slot.block] !== undefined) {
        next[slot.path][slot.block] = null;
      }
      return next;
    });
    if (blockEditorSlot?.path === slot.path && blockEditorSlot?.block === slot.block) {
      setBlockEditorOpen(false);
      setBlockEditorSlot(null);
    }
    setStatus(`Cleared ${rowLabels[slot.path]}-${slot.block + 1}`);
    setSlotMenuOpen(false);
    scheduleSync(500);
  };

  const moveBlockInPath = async (pIdx: PathIndex, fromDisplay: number, toDisplay: number) => {
    if (fromDisplay === toDisplay) return;
    const client = requireClient();
    if (!client) return;

    const flow = rowToFlow(pIdx);
    const currentBlocks = grid[pIdx];

    // Splice the visible portion to get new order
    const lastPop = currentBlocks.reduce((last: number, b: BlockData | null, i: number) => (b ? i : last), -1);
    const visCount = Math.min(lastPop + 2, 12);
    const visible = currentBlocks.slice(0, visCount);
    const [moved] = visible.splice(fromDisplay, 1);
    visible.splice(toDisplay, 0, moved);

    const minIdx = Math.min(fromDisplay, toDisplay);
    const maxIdx = Math.max(fromDisplay, toDisplay);

    // Update local grid immediately (optimistic)
    setGrid((prev) => {
      const next = cloneGrid(prev);
      for (let i = 0; i < visCount; i++) {
        const blk = visible[i];
        next[pIdx][i] = blk
          ? { ...blk, blockId: effectBlockIndex(pIdx, i), params: blk.params ? { ...blk.params } : {} }
          : null;
      }
      return next;
    });

    setStatus(`Reordered block in ${rowLabels[pIdx]}`);

    // Send protocol commands to the device
    try {
      for (let i = minIdx; i <= maxIdx; i++) {
        const oldBlock = currentBlocks[i];
        if (oldBlock) {
          await client.clearBlock(flow, effectBlockIndex(pIdx, i));
        }
      }
      for (let i = minIdx; i <= maxIdx; i++) {
        const newBlock = visible[i];
        if (newBlock) {
          const pos = effectBlockIndex(pIdx, i);
          await client.setModelWait(flow, pos, newBlock.id, 0);
        }
      }
      for (let i = minIdx; i <= maxIdx; i++) {
        const newBlock = visible[i];
        if (!newBlock) continue;
        const pos = effectBlockIndex(pIdx, i);
        if (newBlock.enabled !== undefined) {
          await client.setBlockEnableWait(flow, pos, newBlock.enabled);
        }
        if (newBlock.params) {
          for (const [key, value] of Object.entries(newBlock.params)) {
            const paramId = parseInt(key, 10);
            if (isNaN(paramId)) continue;
            const vt: 'i' | 'f' | 'b' =
              typeof value === 'boolean' ? 'b' : Number.isInteger(value as number) ? 'i' : 'f';
            await client.setParamValueWait(flow, pos, paramId, value, 0, -1, vt);
          }
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setStatus(`Reorder sync failed: ${msg}`);
    }

    scheduleSync(800);
  };

  const setIOModel = async (model: IOModel) => {
    const client = requireClient();
    if (!client) return;
    const row = ioPickerRow;
    const blockId = ioBlockIndex(row, ioPickerType);
    const flow = rowToFlow(row);
    try {
      await client.setModelWait(flow, blockId, model.id, 0);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setStatus(`Set ${ioPickerType} failed: ${message}`);
      return;
    }
    const nextParams: Record<string, number | boolean> = {};
    model.params.forEach((param) => {
      if (typeof param.def === 'number' || typeof param.def === 'boolean') {
        const key = param.id !== null ? String(param.id) : param.property_key ?? param.key;
        nextParams[key] = param.def;
      }
    });
    setIoGrid((prev) => {
      const next = prev.map((entry) => ({
        input: entry.input ? { ...entry.input } : null,
        output: entry.output ? { ...entry.output } : null,
      }));
      const entry = next[row] ?? { input: null, output: null };
      entry[ioPickerType] = {
        blockId,
        modelId: model.id,
        name: model.name,
        params: nextParams,
      };
      next[row] = entry;
      return next;
    });
    setStatus(`Set ${rowLabels[row]} ${ioPickerType} to ${model.name}`);
    scheduleSync(500);
  };

  const updateIOParam = (param: IOModelParam, value: number | boolean) => {
    const client = requireClient();
    if (!client) return;
    const row = ioPickerRow;
    const flow = rowToFlow(row);
    const blockId = ioBlockIndex(row, ioPickerType);
    const nextValue = clampParamValue(param, value);
    if (nextValue === null) return;
    const paramKey = param.id !== null ? String(param.id) : param.property_key ?? param.key;
    setIoGrid((prev) => {
      const next = prev.map((item) => ({
        input: item.input ? { ...item.input } : null,
        output: item.output ? { ...item.output } : null,
      }));
      const rowEntry = next[row];
      const existing = rowEntry?.[ioPickerType] ?? null;
      if (rowEntry) {
        rowEntry[ioPickerType] = {
          blockId,
          modelId: existing?.modelId ?? null,
          name: existing?.name ?? '\u2014',
          params: {
            ...(existing?.params ?? {}),
            [paramKey]: nextValue,
          },
        };
      }
      return next;
    });
    try {
      if (param.faux && param.property_key) {
        client.setProperty(param.property_key, nextValue, param.type);
      } else if (param.id !== null) {
        client.setParamValue(flow, blockId, param.id, nextValue, 0, -1, param.type);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setStatus(`Update failed: ${message}`);
      scheduleSync(150);
      return;
    }
    scheduleSync(350);
  };

  const updateBlockParam = (param: EditorParam, value: number | boolean) => {
    const client = requireClient();
    if (!client || !blockEditorSlot || !activeBlock || param.id === null) return;
    const nextValue = clampParamValue(param, value);
    if (nextValue === null || activeBlock.blockId === undefined) return;
    const row = blockEditorSlot.path;
    setGrid((prev) => {
      const next = cloneGrid(prev);
      const block = next[row]?.[blockEditorSlot.block];
      if (block) {
        block.params = {
          ...(block.params ?? {}),
          [String(param.id)]: nextValue,
        };
      }
      return next;
    });
    try {
      client.setParamValue(rowToFlow(row), activeBlock.blockId, param.id, nextValue, 0, -1, param.type);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setStatus(`Update failed: ${message}`);
      scheduleSync(150);
      return;
    }
    scheduleSync(350);
  };

  const handleBlockLabelApply = () => {
    if (!blockEditorSlot || !activeBlock) return;
    const trimmed = blockLabelDraft.trim();
    const overrideKey = getBlockLabelOverrideKey(blockEditorSlot.path, activeBlock.blockId, activeBlock.id);
    setBlockLabelOverrides((prev) => {
      const next = { ...prev };
      if (trimmed) {
        next[overrideKey] = trimmed;
      } else {
        delete next[overrideKey];
      }
      return next;
    });
    setGrid((prev) => {
      const next = cloneGrid(prev);
      const block = next[blockEditorSlot.path]?.[blockEditorSlot.block];
      if (block) {
        block.customName = trimmed || null;
      }
      return next;
    });
    setStatus(trimmed ? `Labelled ${activeBlock.modelName ?? activeBlock.name} as ${trimmed}` : `Cleared label for ${activeBlock.modelName ?? activeBlock.name}`);
  };

  const hydrateFauxParams = async (row: PathIndex, ioType: IOType) => {
    const client = clientRef.current;
    if (!client) return;
    const entry = ioGrid[row]?.[ioType];
    if (!entry || entry.modelId === null) return;
    const meta = ioModelLookup.get(entry.modelId);
    if (!meta) return;
    const fauxParams = meta.params.filter((param) => param.faux && param.property_key);
    if (!fauxParams.length) return;
    const updates: Record<string, number | boolean> = {};
    for (const param of fauxParams) {
      const res = await client.getProperty(param.property_key!);
      if (!res) continue;
      let value = res.value;
      if (typeof value === 'boolean') {
        value = value ? 1 : 0;
      } else if (typeof value === 'string') {
        const parsed = Number(value);
        value = Number.isFinite(parsed) ? parsed : value;
      }
      if (typeof value === 'number' || typeof value === 'boolean') {
        const key = param.property_key ?? param.key;
        updates[key] = value as number | boolean;
      }
    }
    if (!Object.keys(updates).length) return;
    setIoGrid((prev) => {
      const next = prev.map((item) => ({
        input: item.input ? { ...item.input } : null,
        output: item.output ? { ...item.output } : null,
      }));
      const rowEntry = next[row];
      if (rowEntry && rowEntry[ioType]) {
        rowEntry[ioType] = {
          ...rowEntry[ioType]!,
          params: {
            ...rowEntry[ioType]!.params,
            ...updates,
          },
        };
      }
      return next;
    });
  };

  useEffect(() => {
    if (!ioPickerOpen) return;
    hydrateFauxParams(ioPickerRow, ioPickerType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ioPickerOpen, ioPickerRow, ioPickerType]);

  const handleSync = async (silent = false) => {
    const client = requireClient();
    if (!client) return false;
    if (flowSyncInFlightRef.current) return false;
    flowSyncInFlightRef.current = true;
    if (!silent) {
      setStatus('Syncing from device...');
    }
    try {
      const state = await client.getEditBufferState();
      if (!state) {
        if (!silent) setStatus('Sync failed: no response');
        return false;
      }
      const flows = findFlows(state);
      if (!Array.isArray(flows)) {
        if (!silent) setStatus('Sync failed: no flow data');
        return false;
      }
      if (!flows.length) {
        if (!silent) setStatus('Sync failed: empty flow data');
        return false;
      }
      const nextGrid: SignalFlowGrid = Array.from({ length: 4 }, () =>
        Array.from({ length: 12 }, () => null)
      );
      const nextIO: IOGrid = Array.from({ length: 4 }, () => ({ input: null, output: null }));
      const previousCustomLabels = new Map<string, string>();
      grid.forEach((row, rowIndex) => {
        row.forEach((block) => {
          const customName = block?.customName?.trim();
          if (block && customName) {
            previousCustomLabels.set(`${rowIndex}:${block.id}`, customName);
          }
        });
      });
      const assignSlot = (
        rowIndex: number,
        slotIndex: number,
        modelId: number | null,
        params: Record<string, number | boolean>,
        blockId: number,
        enabled: boolean
      ) => {
        if (!nextGrid[rowIndex]) return;
        if (slotIndex < 0 || slotIndex >= 12) return;
        if (typeof modelId === 'number' && modelLookup.has(modelId)) {
          const info = modelLookup.get(modelId)!;
          const overrideKey = getBlockLabelOverrideKey(rowIndex, blockId, modelId);
          nextGrid[rowIndex][slotIndex] = {
            id: modelId,
            name: info.name,
            modelName: info.name,
            realName: info.realName,
            customName: blockLabelOverrides[overrideKey] ?? previousCustomLabels.get(`${rowIndex}:${modelId}`) ?? null,
            kind: info.kind,
            usage: info.usage,
            enabled,
            blockId,
            params,
          };
        } else {
          nextGrid[rowIndex][slotIndex] = {
            id: Number(modelId) || 0,
            name: 'Unknown Block',
            modelName: 'Unknown Block',
            realName: null,
            kind: 'fx_loop',
            usage: 0,
            enabled,
            blockId,
            params,
          };
        }
      };

      const assignIO = (
        rowIndex: number,
        ioType: IOType,
        modelId: number | null,
        params: Record<string, number | boolean>
      ) => {
        if (!nextIO[rowIndex]) return;
        const meta = typeof modelId === 'number' ? ioModelLookup.get(modelId) : null;
        const name = meta?.name ?? (modelId === null ? 'None' : 'Unknown I/O');
        const blockId = ioBlockIndex(rowIndex as PathIndex, ioType);
        nextIO[rowIndex][ioType] = {
          blockId,
          modelId,
          name,
          params,
        };
      };

      flows.forEach((flow: any, flowIdx: number) => {
        const rawBlks = flow?.blks ?? flow?.blk ?? flow?.blocks ?? null;
        const bmap = Array.isArray(flow?.bmap) ? flow.bmap : null;
        const rowA = flowIdx * 2;
        const rowB = flowIdx * 2 + 1;
        const posByBlockIndex = new Map<number, number>();
        if (bmap) {
          bmap.forEach((blockIndex: any, pos: number) => {
            if (typeof blockIndex === 'number') {
              posByBlockIndex.set(blockIndex, pos);
            }
          });
        }

        const handleEntry = (pos: number, blk: any) => {
          if (typeof pos !== 'number') return;
          if (!blk || typeof blk !== 'object') return;
          const model = Array.isArray(blk.mdls) ? blk.mdls[0] : null;
          const mid = model?.id__ ?? blk.mid ?? blk.mdid ?? blk.midx ?? blk.model ?? blk.mid_;
          const params: Record<string, number | boolean> = {};
          if (model && Array.isArray(model.parm)) {
            model.parm.forEach((param: any) => {
              const pid = param?.pid_;
              if (typeof pid !== 'number') return;
              params[String(pid)] = param?.valu ?? 0;
            });
          }
          const enabled = blk?.enbl !== false;

          if (pos === 0) {
            assignIO(rowA, 'input', typeof mid === 'number' ? mid : null, params);
            return;
          }
          if (pos === 13) {
            assignIO(rowA, 'output', typeof mid === 'number' ? mid : null, params);
            return;
          }
          if (pos === 14) {
            assignIO(rowB, 'input', typeof mid === 'number' ? mid : null, params);
            return;
          }
          if (pos === 27) {
            assignIO(rowB, 'output', typeof mid === 'number' ? mid : null, params);
            return;
          }

          if (pos >= 1 && pos <= 12) {
            assignSlot(rowA, pos - 1, typeof mid === 'number' ? mid : null, params, pos, enabled);
            return;
          }
          if (pos >= 15 && pos <= 26) {
            assignSlot(rowB, pos - 15, typeof mid === 'number' ? mid : null, params, pos, enabled);
          }
        };

        const resolvePos = (idx: number) => {
          const mapped = posByBlockIndex.get(idx);
          return typeof mapped === 'number' ? mapped : idx;
        };

        if (Array.isArray(rawBlks)) {
          if (rawBlks.length > 1 && typeof rawBlks[0] === 'number' && typeof rawBlks[1] === 'object') {
            for (let i = 1; i < rawBlks.length; i += 2) {
              const pos = rawBlks[i - 1];
              const blk = rawBlks[i];
              handleEntry(pos, blk);
            }
          } else {
            rawBlks.forEach((blk: any, idx: number) => {
              handleEntry(resolvePos(idx), blk);
            });
          }
        } else if (rawBlks && typeof rawBlks === 'object') {
          Object.entries(rawBlks).forEach(([key, blk]) => {
            const idx = Number(key);
            if (!Number.isFinite(idx)) return;
            handleEntry(resolvePos(idx), blk);
          });
        }
      });

      setGrid(nextGrid);
      setIoGrid(nextIO);
      try {
        const notes = await client.getProperty('preset.meta.info');
        if (notes && typeof notes.value === 'string') {
          setNotesText(notes.value);
        } else if (notes && notes.value === null) {
          setNotesText('');
        }
      } catch (_err) {
        // Ignore notes sync failures; block sync succeeded.
      }
      if (!silent) {
        setStatus('Synced');
      }
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (!silent) {
        setStatus(`Sync failed: ${message}`);
      }
      return false;
    } finally {
      flowSyncInFlightRef.current = false;
    }
  };

  const handleFullSync = async (silent = false) => {
    const synced = await handleSync(silent);
    if (!synced) return;
    try {
      await refreshPresetContext();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (!silent) {
        setStatus(`Preset sync failed: ${message}`);
      }
    }
  };

  const scheduleSync = (delayMs = 350, options: { full?: boolean; silent?: boolean } = {}) => {
    if (syncTimerRef.current) {
      clearTimeout(syncTimerRef.current);
    }
    scheduledSyncOptionsRef.current = {
      full: options.full ?? true,
      silent: options.silent ?? false,
    };
    syncTimerRef.current = setTimeout(() => {
      syncTimerRef.current = null;
      const scheduled = scheduledSyncOptionsRef.current;
      if (scheduled.full) {
        void handleFullSync(scheduled.silent);
      } else {
        void handleSync(scheduled.silent);
      }
    }, delayMs);
  };

  useEffect(() => {
    if (!connected || !autoSyncEnabled) return;
    const interval = setInterval(() => {
      scheduleSync(0, { full: false, silent: true });
    }, AUTO_SYNC_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [autoSyncEnabled, connected]);

  /* ── Render helpers ─────────────────────────────────────────────── */

  const kindLabel = (kind: string) => {
    const map: Record<string, string> = {
      amp: 'Amp', preamp: 'Preamp', cab: 'Cabinet', distortion: 'Distortion',
      delay: 'Delay', reverb: 'Reverb', modulation: 'Modulation', dynamics: 'Dynamics',
      eq: 'EQ', pitch_synth: 'Pitch / Synth', wah_filter: 'Wah / Filter',
      volume_pan: 'Volume / Pan', looper: 'Looper', fx_loop: 'FX Loop', routing: 'Routing',
    };
    return map[kind] ?? kind;
  };

  const renderIORow = (rowIndex: PathIndex, ioType: IOType) => {
    const entry = ioGrid[rowIndex]?.[ioType] ?? null;
    const isInput = ioType === 'input';
    const disabled = isInput && rowIndex % 2 === 1;
    return (
      <Pressable
        style={[styles.ioRow, disabled && { opacity: 0.4 }]}
        onPress={disabled ? undefined : () => selectIO(rowIndex, ioType)}
        disabled={disabled}
      >
        <View style={styles.ioIconWrap}>
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            {isInput ? (
              <Path d="M5 12h14M12 5l7 7-7 7" stroke={COLORS.muted} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <Path d="M19 12H5M12 19l-7-7 7-7" stroke={COLORS.muted} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
            )}
          </Svg>
        </View>
        <View style={styles.ioInfo}>
          <Text style={styles.ioLabel}>{isInput ? 'Input' : 'Output'}</Text>
          <Text style={styles.ioName}>{disabled ? 'From Split' : (entry?.name ?? 'None')}</Text>
        </View>
        {!disabled && (
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <Path d="M9 18l6-6-6-6" stroke={COLORS.muted} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        )}
      </Pressable>
    );
  };

  const renderPathSection = (pathNum: 1 | 2) => {
    const primary: PathIndex = pathNum === 1 ? 0 : 2;
    const split: PathIndex = pathNum === 1 ? 1 : 3;
    const flowIndex = pathNum - 1;
    const usage = pathNum === 1 ? pathUsage.path1 : pathUsage.path2;
    const hasSplit = pathNum === 1 ? hasSplit1 : hasSplit2;
    const ratio = Math.min(usage / dspLimit, 1);
    const dspColor = usage > dspLimit ? COLORS.danger : ratio >= 0.85 ? COLORS.warn : COLORS.accent;
    const clipboardMatches = pathClipboard?.sourcePath === flowIndex;
    const canPasteClipboard = !!pathClipboard && pathClipboard.sourcePath !== flowIndex;

    return (
      <View style={styles.pathSection}>
        {/* Path header with DSP bar */}
        <View style={styles.pathHeader}>
          <View style={styles.pathHeaderCopy}>
            <Text style={styles.pathTitle}>Path {pathNum}</Text>
            {clipboardMatches && <Text style={styles.pathClipboardBadge}>Copied</Text>}
          </View>
          <Text style={[styles.pathDsp, { color: dspColor }]}>{usage.toFixed(1)}/{dspLimit}</Text>
        </View>
        <View style={styles.dspTrack}>
          <View style={[styles.dspFill, { width: `${ratio * 100}%`, backgroundColor: dspColor }]} />
        </View>
        <View style={styles.pathActionRow}>
          <Pressable style={[styles.button, styles.buttonGhost, styles.pathActionButton]} onPress={() => { void handleCopyPath(pathNum); }}>
            <Text style={[styles.buttonText, styles.buttonTextGhost]}>Copy</Text>
          </Pressable>
          <Pressable
            style={[
              styles.button,
              styles.buttonGhost,
              styles.pathActionButton,
              !canPasteClipboard && styles.rowActionButtonDisabled,
            ]}
            disabled={!canPasteClipboard}
            onPress={() => {
              void handlePastePath(pathNum);
            }}
          >
            <Text style={[styles.buttonText, styles.buttonTextGhost]}>
              {pathClipboard ? `Paste Path ${pathClipboard.sourcePath + 1}` : 'Paste'}
            </Text>
          </Pressable>
        </View>

        {/* Input */}
        {renderIORow(primary, 'input')}

        {/* Effect chain for Row A */}
        <DraggableEffectList
          blocks={decorateDisplayBlocks(grid[primary])}
          pathIndex={primary}
          selectedSlot={selectedSlot}
          onSelectSlot={selectSlot}
          onOpenSlotMenu={openSlotMenu}
          onReorder={moveBlockInPath}
          onToggleEnabled={toggleBlockEnabled}
          kindLabel={kindLabel}
          onDragStart={() => setFlowScrollEnabled(false)}
          onDragEnd={() => setFlowScrollEnabled(true)}
        />

        {/* Split section */}
        {hasSplit && (
          <>
            <View style={styles.splitDivider}>
              <View style={styles.splitLine} />
              <Text style={styles.splitLabel}>SPLIT</Text>
              <View style={styles.splitLine} />
            </View>
            {renderIORow(split, 'input')}
            <DraggableEffectList
              blocks={decorateDisplayBlocks(grid[split])}
              pathIndex={split}
              selectedSlot={selectedSlot}
              onSelectSlot={selectSlot}
              onOpenSlotMenu={openSlotMenu}
              onReorder={moveBlockInPath}
              onToggleEnabled={toggleBlockEnabled}
              kindLabel={kindLabel}
              onDragStart={() => setFlowScrollEnabled(false)}
              onDragEnd={() => setFlowScrollEnabled(true)}
            />
            {renderIORow(split, 'output')}
          </>
        )}

        {/* Output */}
        {renderIORow(primary, 'output')}
      </View>
    );
  };

  const renderFlowTab = () => (
    <ScrollView
      style={styles.tabContent}
      contentContainerStyle={styles.flowPadding}
      showsVerticalScrollIndicator={false}
      scrollEnabled={flowScrollEnabled}
    >
      {/* Sync button */}
      <Pressable style={styles.syncBtn} onPress={() => void handleFullSync()}>
        <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
          <Path d="M23 4v6h-6M1 20v-6h6" stroke={COLORS.accent} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" stroke={COLORS.accent} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
        <Text style={styles.syncBtnText}>Sync</Text>
      </Pressable>

      {renderPathSection(1)}
      {renderPathSection(2)}
    </ScrollView>
  );

  const renderPresetTab = () => (
    <ScrollView
      style={styles.tabContent}
      contentContainerStyle={styles.tabPadding}
      showsVerticalScrollIndicator={false}
    >
      <Section title="Library">
        {/* Compact active preset bar */}
        <View style={styles.activePresetBar}>
          <View style={styles.activePresetInfo}>
            <Text style={styles.activePresetBarName} numberOfLines={1}>{activePresetName}</Text>
            <Text style={styles.libraryMeta}>
              {activePresetRef
                ? `Slot ${typeof activePresetRef.posi === 'number' ? activePresetRef.posi + 1 : '\u2014'}${presetEdited ? ' \u00b7 Unsaved' : ''}`
                : 'No active preset'}
            </Text>
          </View>
          <Pressable style={styles.compactIconBtn} onPress={refreshPresetContext} hitSlop={8}>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
              <Path d="M23 4v6h-6M1 20v-6h6" stroke={COLORS.muted} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              <Path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" stroke={COLORS.muted} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </Pressable>
          {activePresetStorageId !== null && presetEdited && (
            <Pressable style={styles.compactSaveBtn} onPress={handleSavePreset}>
              <Text style={styles.compactSaveBtnText}>Save</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.segmentedControl}>
          {([
            ['user', 'User'],
            ['factory', 'Factory'],
          ] as Array<[PresetLibraryRoot, string]>).map(([key, label], idx) => {
            const active = libraryRoot === key;
            return (
              <Pressable
                key={key}
                style={[styles.segment, active && styles.segmentActive, idx > 0 && styles.segmentDivider]}
                onPress={() => {
                  void handleLibraryRootChange(key);
                }}
              >
                <Text style={[styles.segmentText, active && styles.segmentTextActive]}>{label}</Text>
              </Pressable>
            );
          })}
        </View>

        {/* Add-to-setlist dropdown (when browsing user/factory) */}
        {(libraryRoot === 'user' || libraryRoot === 'factory') && setlists.length > 0 && (
          <Pressable style={styles.dropdownButton} onPress={() => setTargetSetlistPickerOpen(true)}>
            <View style={styles.dropdownContent}>
              <Text style={styles.dropdownLabel}>Add to Setlist</Text>
              <Text style={styles.dropdownValue}>
                {targetSetlist?.name ?? 'Select target setlist'}
              </Text>
            </View>
            <Text style={styles.dropdownChevron}>{'\u25BE'}</Text>
          </Pressable>
        )}

        {/* Preset list */}
        <View style={styles.libraryList}>
          <View style={styles.rowBetween}>
            <Text style={styles.label}>{selectedContainerName}</Text>
            <View style={styles.listHeaderRight}>
              <Text style={styles.libraryMeta}>
                {filteredPresetItems.length}/{presetItems.length}
              </Text>
            </View>
          </View>
          <View style={styles.searchRow}>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
              <Path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke={COLORS.muted} strokeWidth={2} strokeLinecap="round" />
            </Svg>
            <TextInput
              style={styles.searchInputInline}
              value={presetFilter}
              onChangeText={setPresetFilter}
              placeholder="Search presets..."
              placeholderTextColor={COLORS.muted}
            />
            {presetFilter.trim().length > 0 && (
              <Pressable onPress={() => setPresetFilter('')} hitSlop={8}>
                <Text style={styles.searchClearText}>Clear</Text>
              </Pressable>
            )}
          </View>
          {filteredPresetItems.length === 0 ? (
            <Text style={styles.paramHint}>
              {presetItems.length > 0 ? 'No matches' : 'No presets here'}
            </Text>
          ) : (
            filteredPresetItems.map((item) => {
              const active = isPresetActive(item);
              const canAddToSetlist =
                (libraryRoot === 'user' || libraryRoot === 'factory') && typeof item.cid_ === 'number' && typeof targetSetlistId === 'number';
              const hasActions = active;
              return (
                <Pressable
                  key={`${String(item.cid_ ?? 'preset')}-${String(item.posi ?? 'slot')}`}
                  style={[styles.libraryRow, active && styles.libraryRowActive]}
                  onPress={() => {
                    void handlePresetLoad(item);
                  }}
                  onLongPress={() => setPresetActionTarget(item)}
                >
                  <Text style={[styles.presetSlotNum, active && styles.presetSlotNumActive]}>
                    {typeof item.posi === 'number' ? item.posi + 1 : '\u2014'}
                  </Text>
                  <View style={styles.libraryRowCopy}>
                    <Text style={styles.sheetListText} numberOfLines={1}>
                      {item.name ?? `Preset ${item.posi ?? '\u2014'}`}
                    </Text>
                  </View>
                  {active && <Text style={styles.libraryActiveBadge}>Active</Text>}
                  {canAddToSetlist && (
                    <Pressable
                      style={styles.setlistAddButton}
                      hitSlop={8}
                      onPress={() => {
                        void handleAddPresetToSetlist(item);
                      }}
                    >
                      <Text style={styles.setlistAddButtonText}>Add</Text>
                    </Pressable>
                  )}
                  {hasActions && (
                    <Pressable
                      style={styles.presetMoreButton}
                      hitSlop={8}
                      onPress={() => setPresetActionTarget(item)}
                    >
                      <Text style={styles.presetMoreText}>{'\u22EF'}</Text>
                    </Pressable>
                  )}
                </Pressable>
              );
            })
          )}
        </View>
      </Section>

      <Section title="Snapshots">
        <Text style={styles.libraryMeta}>
          {snapshotCount > 0
            ? `Active ${activeSnapshotIndex !== null ? activeSnapshotIndex + 1 : '\u2014'} of ${snapshotCount}${
                activeSnapshot?.name ? ` \u00b7 ${activeSnapshot.name}` : ''
              }`
            : 'No snapshot data yet'}
        </Text>
        {snapshotCount > 0 ? (
          <>
            <View style={styles.libraryList}>
              {Array.from({ length: snapshotCount }, (_item, index) => {
                const snapshot = snapshots.find((item) => item.index === index) ?? null;
                const active = activeSnapshotIndex === index;
                const colorOption =
                  typeof snapshot?.colr === 'number'
                    ? SNAPSHOT_COLOR_OPTIONS.find((o) => o.value === snapshot.colr) ?? null
                    : null;
                return (
                  <Pressable
                    key={`snapshot-${index}`}
                    style={[styles.libraryRow, active && styles.libraryRowActive]}
                    onPress={() => handleSnapshotActivate(index)}
                    onLongPress={() => setSnapshotActionIndex(index)}
                  >
                    <View
                      style={[
                        styles.snapshotDot,
                        { backgroundColor: colorOption?.swatch ?? COLORS.stroke },
                      ]}
                    />
                    <View style={styles.libraryRowCopy}>
                      <Text style={styles.sheetListText} numberOfLines={1}>
                        {index + 1}. {snapshot?.name ?? `Snapshot ${index + 1}`}
                      </Text>
                    </View>
                    {active && <Text style={styles.libraryActiveBadge}>Active</Text>}
                  </Pressable>
                );
              })}
            </View>

            {activeSnapshot && (
              <>
                <Text style={styles.label}>Snapshot Color</Text>
                <View style={styles.libraryPills}>
                  {SNAPSHOT_COLOR_OPTIONS.map((option) => (
                    <Pressable
                      key={`snapshot-color-${option.value}`}
                      style={[
                        styles.togglePill,
                        styles.snapshotColorPill,
                        activeSnapshot?.colr === option.value && styles.togglePillActive,
                      ]}
                      onPress={() => {
                        void handleSnapshotColor(option.value);
                      }}
                    >
                      <View style={[styles.snapshotColorSwatch, { backgroundColor: option.swatch }]} />
                      <Text
                        style={[
                          styles.togglePillText,
                          activeSnapshot?.colr === option.value && styles.togglePillTextActive,
                        ]}
                      >
                        {option.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </>
            )}

            {snapshotCount > 1 && (
              <>
                <Text style={styles.label}>Copy Snapshot</Text>
                <View style={styles.inlineLabelRow}>
                  <Text style={styles.libraryMeta}>Source</Text>
                  <View style={styles.libraryPills}>
                    {Array.from({ length: snapshotCount }, (_item, index) => {
                      const active = snapshotCopySource === index;
                      return (
                        <Pressable
                          key={`copy-source-${index}`}
                          style={[styles.togglePill, active && styles.togglePillActive]}
                          onPress={() => setSnapshotCopySource(index)}
                        >
                          <Text style={[styles.togglePillText, active && styles.togglePillTextActive]}>
                            {index + 1}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
                <View style={styles.inlineLabelRow}>
                  <Text style={styles.libraryMeta}>Target</Text>
                  <View style={styles.libraryPills}>
                    {Array.from({ length: snapshotCount }, (_item, index) => {
                      const active = snapshotCopyTarget === index;
                      return (
                        <Pressable
                          key={`copy-target-${index}`}
                          style={[styles.togglePill, active && styles.togglePillActive]}
                          onPress={() => setSnapshotCopyTarget(index)}
                        >
                          <Text style={[styles.togglePillText, active && styles.togglePillTextActive]}>
                            {index + 1}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
                <Pressable style={[styles.button, styles.buttonGhost]} onPress={() => void handleSnapshotCopy()}>
                  <Text style={[styles.buttonText, styles.buttonTextGhost]}>Copy Snapshot</Text>
                </Pressable>
              </>
            )}
          </>
        ) : (
          <Text style={styles.paramHint}>Open the Presets tab to load snapshots.</Text>
        )}
      </Section>

      <Section title="Notes">
        <View style={styles.rowBetween}>
          <Text style={styles.label}>Show on device</Text>
          <Switch value={notesVisible} onValueChange={handleNotesToggle} />
        </View>
        <TextInput
          style={styles.textArea}
          value={notesText}
          onChangeText={setNotesText}
          multiline
          numberOfLines={10}
          placeholder="Write preset notes..."
          placeholderTextColor={COLORS.muted}
        />
        <Pressable style={[styles.button, styles.buttonPrimary]} onPress={handleNotesSend}>
          <Text style={styles.buttonText}>Send Notes</Text>
        </Pressable>
      </Section>

    </ScrollView>
  );

  const renderSetlistsTab = () => (
    <ScrollView
      style={styles.tabContent}
      contentContainerStyle={styles.tabPadding}
      showsVerticalScrollIndicator={false}
    >
      <Section title="Setlists">
        {setlists.length > 0 ? (
          <>
            <Pressable style={styles.dropdownButton} onPress={() => setSetlistPickerOpen(true)}>
              <View style={styles.dropdownContent}>
                <Text style={styles.dropdownLabel}>Setlist</Text>
                <Text style={styles.dropdownValue}>
                  {activeSetlist?.name ?? 'Select a setlist'}
                </Text>
              </View>
              <Text style={styles.dropdownChevron}>{'\u25BE'}</Text>
            </Pressable>
            <View style={styles.sheetRenameRow}>
              <TextInput
                style={[styles.input, styles.inlineInput]}
                value={setlistRenameText}
                onChangeText={setSetlistRenameText}
                placeholder="Rename setlist"
                placeholderTextColor={COLORS.muted}
                autoCapitalize="words"
                autoCorrect={false}
              />
              <Pressable
                style={[styles.button, styles.buttonGhost, styles.inlineButton, !activeSetlist && styles.buttonDisabled]}
                disabled={!activeSetlist}
                onPress={() => {
                  if (typeof activeSetlist?.cid_ === 'number') {
                    void handleRenameContent(activeSetlist.cid_, setlistRenameText, 'Setlist');
                  }
                }}
              >
                <Text style={[styles.buttonText, styles.buttonTextGhost]}>Rename</Text>
              </Pressable>
            </View>
          </>
        ) : (
          <Text style={styles.paramHint}>Sync after connecting to load setlists.</Text>
        )}

        <View style={styles.libraryList}>
          <View style={styles.rowBetween}>
            <Text style={styles.label}>{selectedContainerName}</Text>
            <View style={styles.listHeaderRight}>
              <Text style={styles.libraryMeta}>
                {filteredPresetItems.length}/{presetItems.length}
              </Text>
            </View>
          </View>
          <View style={styles.searchRow}>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
              <Path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke={COLORS.muted} strokeWidth={2} strokeLinecap="round" />
            </Svg>
            <TextInput
              style={styles.searchInputInline}
              value={presetFilter}
              onChangeText={setPresetFilter}
              placeholder="Search setlist..."
              placeholderTextColor={COLORS.muted}
            />
            {presetFilter.trim().length > 0 && (
              <Pressable onPress={() => setPresetFilter('')} hitSlop={8}>
                <Text style={styles.searchClearText}>Clear</Text>
              </Pressable>
            )}
          </View>
          {filteredPresetItems.length === 0 ? (
            <Text style={styles.paramHint}>
              {presetItems.length > 0 ? 'No presets match that search.' : 'No presets in this setlist yet.'}
            </Text>
          ) : (
            filteredPresetItems.map((item) => {
              const active = isPresetActive(item);
              const canMoveUp = typeof item.posi === 'number' && item.posi > 0;
              const canMoveDown = typeof item.posi === 'number' && item.posi < presetItems.length - 1;
              return (
                <Pressable
                  key={`${String(item.cid_ ?? 'setlist-preset')}-${String(item.posi ?? 'slot')}`}
                  style={[styles.libraryRow, active && styles.libraryRowActive]}
                  onPress={() => {
                    void handlePresetLoad(item);
                  }}
                  onLongPress={() => setPresetActionTarget(item)}
                >
                  <Text style={[styles.presetSlotNum, active && styles.presetSlotNumActive]}>
                    {typeof item.posi === 'number' ? item.posi + 1 : '\u2014'}
                  </Text>
                  <View style={styles.libraryRowCopy}>
                    <Text style={styles.sheetListText} numberOfLines={1}>
                      {item.name ?? `Preset ${item.posi ?? '\u2014'}`}
                    </Text>
                  </View>
                  {active && <Text style={styles.libraryActiveBadge}>Active</Text>}
                  <View style={styles.setlistRowActions}>
                    <Pressable
                      style={[styles.setlistRowActionButton, !canMoveUp && styles.setlistRowActionButtonDisabled]}
                      hitSlop={8}
                      disabled={!canMoveUp}
                      onPress={() => {
                        void handleMoveSetlistPreset(item, -1);
                      }}
                    >
                      <Text style={[styles.setlistRowActionText, !canMoveUp && styles.setlistRowActionTextDisabled]}>Up</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.setlistRowActionButton, !canMoveDown && styles.setlistRowActionButtonDisabled]}
                      hitSlop={8}
                      disabled={!canMoveDown}
                      onPress={() => {
                        void handleMoveSetlistPreset(item, 1);
                      }}
                    >
                      <Text style={[styles.setlistRowActionText, !canMoveDown && styles.setlistRowActionTextDisabled]}>Down</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.setlistRowActionButton, styles.setlistRowActionDanger]}
                      hitSlop={8}
                      onPress={() => {
                        void handleRemovePresetFromSetlist(item);
                      }}
                    >
                      <Text style={[styles.setlistRowActionText, styles.setlistRowActionDangerText]}>Remove</Text>
                    </Pressable>
                  </View>
                  {active && (
                    <Pressable
                      style={styles.presetMoreButton}
                      hitSlop={8}
                      onPress={() => setPresetActionTarget(item)}
                    >
                      <Text style={styles.presetMoreText}>{'\u22EF'}</Text>
                    </Pressable>
                  )}
                </Pressable>
              );
            })
          )}
        </View>
      </Section>
    </ScrollView>
  );

  const renderSettingsTab = () => (
    <ScrollView
      style={styles.tabContent}
      contentContainerStyle={styles.tabPadding}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.deviceHero}>
        <Text style={styles.deviceTitle}>Settings</Text>
        <Text style={styles.deviceSubtitle}>Manage connection, sync, and app preferences</Text>
      </View>

      <Section title="Connection">
        <TextInput
          style={styles.input}
          value={host}
          onChangeText={setHost}
          placeholder="p35x1.local or IP address"
          placeholderTextColor={COLORS.muted}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View style={styles.row}>
          <Pressable
            style={[styles.button, styles.buttonFlex, connected ? styles.buttonGhost : styles.buttonPrimary]}
            onPress={connect}
          >
            <Text style={[styles.buttonText, connected && styles.buttonTextGhost]}>
              {connecting ? 'Connecting\u2026' : 'Connect'}
            </Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonFlex, styles.buttonGhost]}
            onPress={disconnect}
          >
            <Text style={[styles.buttonText, styles.buttonTextGhost]}>Disconnect</Text>
          </Pressable>
        </View>
        <View style={styles.statusRow}>
          <View
            style={[styles.statusDot, { backgroundColor: connected ? COLORS.success : COLORS.danger }]}
          />
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </Section>

      <Section title="App Settings">
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.label}>Auto-Cab</Text>
            <Text style={styles.labelHint}>Add a matching cab with each amp</Text>
          </View>
          <Switch value={autoCab} onValueChange={handleAutoCab} />
        </View>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.label}>Background Sync</Text>
            <Text style={styles.labelHint}>Pick up edits from the device or desktop editor</Text>
          </View>
          <Switch value={autoSyncEnabled} onValueChange={setAutoSyncEnabled} />
        </View>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.label}>Extended DSP Budget</Text>
            <Text style={styles.labelHint}>Pick blocks up to {EXTENDED_DSP_CAP} per path</Text>
          </View>
          <Switch value={extendedDspEnabled} onValueChange={setExtendedDspEnabled} />
        </View>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.label}>Source Model Names</Text>
            <Text style={styles.labelHint}>Show the original amp, cab, and pedal names</Text>
          </View>
          <Switch value={showRealBlockNames} onValueChange={setShowRealBlockNames} />
        </View>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.label}>Block Labels</Text>
            <Text style={styles.labelHint}>Custom labels stay in the app</Text>
          </View>
          <Switch value={blockLabelMode} onValueChange={setBlockLabelMode} />
        </View>
      </Section>

      <Section title="Tempo">
        <View style={styles.transportHeroCard}>
          <Text style={styles.transportHeroValue}>
            {formatTempoBpm(liveTempoBpm ?? globalTempoBpm)}
            <Text style={styles.transportHeroUnit}> BPM</Text>
          </Text>
          <Text style={styles.transportHeroMeta}>
            {tempoFollow ? 'Following external tempo' : 'Tap, nudge, or set the BPM'}
          </Text>
        </View>
        <View style={styles.transportAdjustRow}>
          {[
            { key: 'dev-tempo--5', label: '-5', onPress: () => handleTempoAdjust(-5) },
            { key: 'dev-tempo--1', label: '-1', onPress: () => handleTempoAdjust(-1) },
            { key: 'dev-tempo-tap', label: 'Tap Tempo', onPress: handleTapTempo, accent: true },
            { key: 'dev-tempo-+1', label: '+1', onPress: () => handleTempoAdjust(1) },
            { key: 'dev-tempo-+5', label: '+5', onPress: () => handleTempoAdjust(5) },
          ].map((action) => (
            <Pressable
              key={action.key}
              style={[
                styles.transportAdjustButton,
                action.accent && styles.transportAdjustButtonAccent,
              ]}
              onPress={action.onPress}
            >
              <Text
                style={[
                  styles.transportAdjustButtonText,
                  action.accent && styles.transportAdjustButtonTextAccent,
                ]}
              >
                {action.label}
              </Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.label}>Follow External Tempo</Text>
            <Text style={styles.labelHint}>Use the device's tempo source instead of the app</Text>
          </View>
          <Switch
            value={Boolean(tempoFollow)}
            onValueChange={handleTempoFollowToggle}
          />
        </View>
      </Section>

      <Section title="Tuner Remote">
        <View style={styles.transportHeroCard}>
          <Text style={styles.transportHeroValue}>
            {tunerReferencePitch ?? 440}
            <Text style={styles.transportHeroUnit}> Hz</Text>
          </Text>
          <Text style={styles.transportHeroMeta}>{TUNER_REMOTE_META}</Text>
        </View>
        <View style={styles.transportAdjustRow}>
          <Pressable style={styles.transportAdjustButton} onPress={() => handleTunerReferenceAdjust(-1)}>
            <Text style={styles.transportAdjustButtonText}>-1 Hz</Text>
          </Pressable>
          <Pressable style={[styles.transportAdjustButton, styles.transportAdjustButtonAccent]} onPress={() => handleTunerReferenceAdjust(1)}>
            <Text style={[styles.transportAdjustButtonText, styles.transportAdjustButtonTextAccent]}>+1 Hz</Text>
          </Pressable>
          <Pressable style={styles.transportAdjustButton} onPress={handleExitTuner}>
            <Text style={styles.transportAdjustButtonText}>Close On Helix</Text>
          </Pressable>
          <Pressable
            style={[styles.transportAdjustButton, styles.transportAdjustButtonAccent]}
            onPress={() => handleOpenTuner('main')}
          >
            <Text style={[styles.transportAdjustButtonText, styles.transportAdjustButtonTextAccent]}>Open On Helix</Text>
          </Pressable>
        </View>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.label}>Always On In Stomp View</Text>
            <Text style={styles.labelHint}>Pin the tuner button in Stomp view</Text>
          </View>
          <Switch
            value={Boolean(tunerAlwaysOnStomp)}
            onValueChange={handleTunerAlwaysOnStompToggle}
          />
        </View>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.label}>Always On In Play View</Text>
            <Text style={styles.labelHint}>Pin the tuner button in Play view</Text>
          </View>
          <Switch
            value={Boolean(tunerAlwaysOnPlayView)}
            onValueChange={handleTunerAlwaysOnPlayViewToggle}
          />
        </View>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.label}>Volume Pedal Opens Tuner</Text>
            <Text style={styles.labelHint}>Heel-down the volume pedal to open the tuner</Text>
          </View>
          <Switch
            value={Boolean(tunerVolPedalOpens)}
            onValueChange={handleTunerVolPedalOpensToggle}
          />
        </View>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.label}>Tuner Trails</Text>
            <Text style={styles.labelHint}>Let delays and reverbs decay when the tuner opens</Text>
          </View>
          <Switch
            value={Boolean(tunerTrails)}
            onValueChange={handleTunerTrailsToggle}
          />
        </View>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.label}>Per-String Offsets</Text>
            <Text style={styles.labelHint}>Custom offsets per string for alternate tunings</Text>
          </View>
          <Switch
            value={Boolean(tunerOffsetsEnabled)}
            onValueChange={handleTunerOffsetsEnabledToggle}
          />
        </View>
      </Section>
    </ScrollView>
  );

  const renderPerformanceMode = () => {
    const displayedTempo = formatTempoBpm(liveTempoBpm ?? globalTempoBpm);
    const snapshotSummary =
      activeSnapshotIndex !== null
        ? `${activeSnapshotIndex + 1}. ${activeSnapshot?.name ?? `Snapshot ${activeSnapshotIndex + 1}`}`
        : 'No snapshot active';
    const canStepBackward = activePresetIndexInList > 0;
    const canStepForward = activePresetIndexInList >= 0 && activePresetIndexInList < presetItems.length - 1;
    const quickActions = [
      {
        key: 'prev',
        label: 'Previous Preset',
        meta: canStepBackward ? 'Previous in container' : 'Start of container',
        active: false,
        disabled: !canStepBackward,
        onPress: () => handlePerformancePresetStep(-1),
      },
      {
        key: 'next',
        label: 'Next Preset',
        meta: canStepForward ? 'Next in container' : 'End of container',
        active: false,
        disabled: !canStepForward,
        onPress: () => handlePerformancePresetStep(1),
      },
      {
        key: 'notes',
        label: notesVisible ? 'Hide Notes' : 'Show Notes',
        meta: notesVisible ? 'Notes shown on the device' : 'Notes hidden on the device',
        active: notesVisible,
        disabled: false,
        onPress: () => handleNotesToggle(!notesVisible),
      },
      {
        key: 'tuner',
        label: 'Tuner Remote',
        meta: 'Open tuner on Helix and show the remote settings panel',
        active: false,
        disabled: false,
        onPress: () => handleOpenTuner('performance'),
      },
      {
        key: 'sync',
        label: presetEdited ? 'Save Preset' : 'Sync Device',
        meta: presetEdited ? 'Commit current preset changes' : 'Refresh preset and snapshot state',
        active: presetEdited === true,
        disabled: presetEdited ? activePresetStorageId === null : false,
        onPress: () => {
          if (presetEdited) {
            handleSavePreset();
            return;
          }
          void handleFullSync();
        },
      },
    ];

    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.performanceSafe} edges={['top', 'left', 'right', 'bottom']}>
          <View style={styles.performanceBackdrop}>
            <View style={styles.performanceGlowA} />
            <View style={styles.performanceGlowB} />
          </View>

          <View style={styles.performanceHeader}>
            <View style={styles.performanceHeaderCopy}>
              <Text style={styles.performanceEyebrow}>Performance Mode</Text>
              <Text style={styles.performanceHost}>{host}</Text>
            </View>
            <Pressable style={styles.performanceExitButton} onPress={() => setScreen('main')}>
              <Text style={styles.performanceExitText}>Exit</Text>
            </Pressable>
          </View>

          <ScrollView
            style={styles.tabContent}
            contentContainerStyle={styles.performanceContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.performanceHero}>
              <View style={styles.performanceHeroAccent} />
              <Text style={styles.performanceHeroKicker}>
                {activeSetlist?.name ?? selectedContainerName}
              </Text>
              <Text style={styles.performanceHeroTitle} numberOfLines={2}>
                {activePresetName}
              </Text>
              <Text style={styles.performanceHeroMeta} numberOfLines={2}>
                {typeof activePresetRef?.posi === 'number' ? `Slot ${activePresetRef.posi + 1}` : 'Live Preset'} {'\u00b7'} {snapshotSummary}
              </Text>
              <View style={styles.performanceHeroStatus}>
                <View
                  style={[
                    styles.performanceHeroStatusDot,
                    { backgroundColor: notesVisible ? COLORS.accent : COLORS.muted },
                  ]}
                />
                <Text style={styles.performanceHeroStatusText}>
                  {notesVisible ? 'Preset notes visible on device' : 'Preset notes hidden on device'}
                </Text>
              </View>
            </View>

            <View style={styles.performanceSection}>
              <View style={styles.performanceSectionHeader}>
                <Text style={styles.performanceSectionTitle}>Quick Actions</Text>
                <Text style={styles.performanceSectionMeta}>
                  {presetEdited ? 'Unsaved changes' : status}
                </Text>
              </View>
              <View style={styles.performanceActionGrid}>
                {quickActions.map((action) => (
                  <Pressable
                    key={action.key}
                    style={[
                      styles.performanceActionCard,
                      action.active && styles.performanceActionCardActive,
                      action.disabled && styles.performanceActionCardDisabled,
                    ]}
                    disabled={action.disabled}
                    onPress={action.onPress}
                  >
                    <Text
                      style={[
                        styles.performanceActionLabel,
                        action.active && styles.performanceActionLabelActive,
                      ]}
                    >
                      {action.label}
                    </Text>
                    <Text style={styles.performanceActionMeta}>{action.meta}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.performanceSection}>
              <View style={styles.performanceSectionHeader}>
                <Text style={styles.performanceSectionTitle}>Tempo</Text>
                <Text style={styles.performanceSectionMeta}>
                  {tempoFollow ? 'Follow on' : 'Manual'}
                </Text>
              </View>
              <View style={styles.performanceTempoCard}>
                <Text style={styles.performanceTempoValue}>
                  {displayedTempo}
                </Text>
                <Text style={styles.performanceTempoUnit}>BPM</Text>
                <Text style={styles.performanceTempoMeta}>
                  {tempoFollow
                    ? 'Device is following incoming tempo.'
                    : 'Use tap tempo or direct BPM nudges here.'}
                </Text>
              </View>
              <View style={styles.performanceChipRow}>
                {[
                  { key: 'tempo--5', label: '-5', onPress: () => handleTempoAdjust(-5) },
                  { key: 'tempo--1', label: '-1', onPress: () => handleTempoAdjust(-1) },
                  { key: 'tempo-tap', label: 'Tap', onPress: handleTapTempo, accent: true },
                  { key: 'tempo-+1', label: '+1', onPress: () => handleTempoAdjust(1) },
                  { key: 'tempo-+5', label: '+5', onPress: () => handleTempoAdjust(5) },
                ].map((action) => (
                  <Pressable
                    key={action.key}
                    style={[
                      styles.performanceChip,
                      action.accent && styles.performanceChipAccent,
                    ]}
                    onPress={action.onPress}
                  >
                    <Text
                      style={[
                        styles.performanceChipText,
                        action.accent && styles.performanceChipTextAccent,
                      ]}
                    >
                      {action.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
              <View style={styles.performanceInlineToggleRow}>
                <Text style={styles.performanceInlineLabel}>Follow External Tempo</Text>
                <View style={styles.performanceInlineActions}>
                  {[
                    { label: 'Off', value: false },
                    { label: 'On', value: true },
                  ].map((option) => {
                    const active = tempoFollow === option.value;
                    return (
                      <Pressable
                        key={`tempo-follow-${option.label}`}
                        style={[styles.performanceInlinePill, active && styles.performanceInlinePillActive]}
                        onPress={() => handleTempoFollowToggle(option.value)}
                      >
                        <Text style={[styles.performanceInlinePillText, active && styles.performanceInlinePillTextActive]}>
                          {option.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            </View>

            <View style={styles.performanceSection}>
              <View style={styles.performanceSectionHeader}>
                <Text style={styles.performanceSectionTitle}>Tuner Remote</Text>
                <Text style={styles.performanceSectionMeta}>
                  {tunerReferencePitch !== null ? `${tunerReferencePitch} Hz` : 'Helix'}
                </Text>
              </View>
              <View style={styles.performanceChipRow}>
                {[
                  { key: 'tuner-open', label: 'Open On Helix', onPress: () => handleOpenTuner('performance'), accent: true },
                  { key: 'tuner-exit', label: 'Close On Helix', onPress: handleExitTuner },
                ].map((action) => (
                  <Pressable
                    key={action.key}
                    style={[
                      styles.performanceChip,
                      action.accent && styles.performanceChipAccent,
                    ]}
                    onPress={action.onPress}
                  >
                    <Text
                      style={[
                        styles.performanceChipText,
                        action.accent && styles.performanceChipTextAccent,
                      ]}
                    >
                      {action.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
              <Text style={styles.performanceTempoMeta}>{TUNER_REMOTE_NOTE}</Text>
              <View style={styles.performanceInlineToggleRow}>
                <Text style={styles.performanceInlineLabel}>Reference Pitch</Text>
                <View style={styles.performanceInlineActions}>
                  {[
                    { key: 'tuner-ref--1', label: '-1', onPress: () => handleTunerReferenceAdjust(-1) },
                    { key: 'tuner-ref-value', label: `${tunerReferencePitch ?? 440} Hz`, onPress: () => {} },
                    { key: 'tuner-ref-+1', label: '+1', onPress: () => handleTunerReferenceAdjust(1) },
                  ].map((action, index) => (
                    <Pressable
                      key={action.key}
                      style={[
                        styles.performanceInlinePill,
                        index === 1 && styles.performanceInlinePillStatic,
                      ]}
                      onPress={action.onPress}
                      disabled={index === 1}
                    >
                      <Text
                        style={[
                          styles.performanceInlinePillText,
                          index === 1 && styles.performanceInlinePillTextActive,
                        ]}
                      >
                        {action.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
              {[
                {
                  key: 'tuner-stompview',
                  label: 'Always On In Stomp View',
                  value: tunerAlwaysOnStomp,
                  onChange: handleTunerAlwaysOnStompToggle,
                },
                {
                  key: 'tuner-playview',
                  label: 'Always On In Play View',
                  value: tunerAlwaysOnPlayView,
                  onChange: handleTunerAlwaysOnPlayViewToggle,
                },
                {
                  key: 'tuner-volpedal',
                  label: 'Volume Pedal Opens Tuner',
                  value: tunerVolPedalOpens,
                  onChange: handleTunerVolPedalOpensToggle,
                },
                {
                  key: 'tuner-trails',
                  label: 'Tuner Trails',
                  value: tunerTrails,
                  onChange: handleTunerTrailsToggle,
                },
              ].map((item) => (
                <View key={item.key} style={styles.performanceInlineToggleRow}>
                  <Text style={styles.performanceInlineLabel}>{item.label}</Text>
                  <View style={styles.performanceInlineActions}>
                    {[
                      { label: 'Off', value: false },
                      { label: 'On', value: true },
                    ].map((option) => {
                      const active = item.value === option.value;
                      return (
                        <Pressable
                          key={`${item.key}-${option.label}`}
                          style={[styles.performanceInlinePill, active && styles.performanceInlinePillActive]}
                          onPress={() => item.onChange(option.value)}
                        >
                          <Text style={[styles.performanceInlinePillText, active && styles.performanceInlinePillTextActive]}>
                            {option.label}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.performanceSection}>
              <View style={styles.performanceSectionHeader}>
                <Text style={styles.performanceSectionTitle}>Snapshots</Text>
                <Text style={styles.performanceSectionMeta}>
                  {snapshotCount > 0 ? `${snapshotCount} ready` : 'None loaded'}
                </Text>
              </View>
              {snapshotCount > 0 ? (
                <View style={styles.performanceSnapshotGrid}>
                  {Array.from({ length: snapshotCount }, (_item, index) => {
                    const snapshot = snapshots.find((item) => item.index === index) ?? null;
                    const active = activeSnapshotIndex === index;
                    const swatch =
                      SNAPSHOT_COLOR_OPTIONS.find((option) => option.value === snapshot?.colr)?.swatch ?? COLORS.stroke;
                    return (
                      <Pressable
                        key={`performance-snapshot-${index}`}
                        style={[
                          styles.performanceSnapshotCard,
                          active && styles.performanceSnapshotCardActive,
                        ]}
                        onPress={() => handleSnapshotActivate(index)}
                      >
                        <View style={[styles.performanceSnapshotSwatch, { backgroundColor: swatch }]} />
                        <Text
                          style={[
                            styles.performanceSnapshotIndex,
                            active && styles.performanceSnapshotIndexActive,
                          ]}
                        >
                          {index + 1}
                        </Text>
                        <Text
                          style={[
                            styles.performanceSnapshotName,
                            active && styles.performanceSnapshotNameActive,
                          ]}
                          numberOfLines={2}
                        >
                          {snapshot?.name ?? `Snapshot ${index + 1}`}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              ) : (
                <Text style={styles.performanceEmptyText}>
                  Sync the preset tab to load snapshot buttons for this preset.
                </Text>
              )}
            </View>

            <View style={styles.performanceSection}>
              <View style={styles.performanceSectionHeader}>
                <Text style={styles.performanceSectionTitle}>Preset Window</Text>
                <Text style={styles.performanceSectionMeta}>
                  {selectedContainerName}
                </Text>
              </View>
              {performancePresetWindow.length > 0 ? (
                <View style={styles.performancePresetGrid}>
                  {performancePresetWindow.map((item) => {
                    const active = isPresetActive(item);
                    return (
                      <Pressable
                        key={`performance-preset-${String(item.cid_ ?? item.posi ?? item.name)}`}
                        style={[
                          styles.performancePresetCard,
                          active && styles.performancePresetCardActive,
                        ]}
                        onPress={() => {
                          void handlePresetLoad(item);
                        }}
                      >
                        <Text
                          style={[
                            styles.performancePresetSlot,
                            active && styles.performancePresetSlotActive,
                          ]}
                        >
                          {typeof item.posi === 'number' ? item.posi + 1 : '\u2014'}
                        </Text>
                        <Text
                          style={[
                            styles.performancePresetName,
                            active && styles.performancePresetNameActive,
                          ]}
                          numberOfLines={2}
                        >
                          {item.name ?? 'Preset'}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              ) : (
                <Text style={styles.performanceEmptyText}>
                  Load a setlist or preset container from the preset tab to populate this live grid.
                </Text>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  };

  const renderParamFields = (
    params: EditorParam[],
    values: Record<string, number | boolean> | undefined,
    onChange: (param: EditorParam, value: number | boolean) => void,
    emptyHint: string,
    blockColor?: string
  ) => {
    if (!params.length) {
      return <Text style={styles.paramHint}>{emptyHint}</Text>;
    }
    // Separate knob-friendly params from option/toggle params
    const knobParams: Array<{ param: EditorParam; index: number }> = [];
    const toggleParams: Array<{ param: EditorParam; index: number }> = [];
    params.forEach((param, index) => {
      const options = param.options ?? null;
      if (param.type === 'b' && (!options || options.length <= 2)) {
        toggleParams.push({ param, index });
      } else if (options && options.length > 0 && options.length <= 3) {
        toggleParams.push({ param, index });
      } else {
        knobParams.push({ param, index });
      }
    });

    return (
      <View style={styles.paramContainer}>
        {/* Knob grid — 4 columns like the delay editor screenshot */}
        {knobParams.length > 0 && (
          <View style={styles.knobGrid}>
            {knobParams.map(({ param, index: paramIndex }) => {
              const paramKey =
                param.id !== null ? String(param.id) : param.property_key ?? param.key ?? param.name ?? 'param';
              const rowKey = `${paramKey}-${paramIndex}`;
              const current = values?.[paramKey] ?? param.def ?? 0;
              return (
                <ParamKnob
                  key={rowKey}
                  label={param.name}
                  value={current}
                  min={param.min}
                  max={param.max}
                  unit={param.unit}
                  displayMin={param.display_min}
                  displayMax={param.display_max}
                  options={param.options}
                  type={param.type}
                  accentColor={blockColor ?? COLORS.accent}
                  onChange={(val) => onChange(param, val)}
                />
              );
            })}
          </View>
        )}
        {/* Toggle/option params rendered as styled pills below the knobs */}
        {toggleParams.length > 0 && (
          <View style={styles.toggleSection}>
            {toggleParams.map(({ param, index: paramIndex }) => {
              const paramKey =
                param.id !== null ? String(param.id) : param.property_key ?? param.key ?? param.name ?? 'param';
              const rowKey = `${paramKey}-${paramIndex}`;
              const current = values?.[paramKey] ?? param.def ?? 0;
              const options = param.options ?? null;
              if (param.type === 'b' && (!options || options.length <= 2)) {
                const isOn = typeof current === 'boolean' ? current : Number(current) > 0;
                const labels = options && options.length === 2 ? options : ['Off', 'On'];
                return (
                  <View key={rowKey} style={styles.toggleRow}>
                    <Text style={styles.toggleLabel}>{param.name}</Text>
                    <View style={styles.toggleLabels}>
                      {labels.map((lbl, idx) => {
                        const val = idx > 0;
                        const active = val === isOn;
                        return (
                          <Pressable
                            key={`${rowKey}-${idx}`}
                            style={[styles.togglePill, active && styles.togglePillActive]}
                            onPress={() => onChange(param, val)}
                            hitSlop={6}
                          >
                            <Text style={[styles.togglePillText, active && styles.togglePillTextActive]}>
                              {lbl}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  </View>
                );
              }
              // Small option set (2-3 options)
              const min = typeof param.min === 'number' ? param.min : 0;
              const max = typeof param.max === 'number' ? param.max : min + (options?.length ?? 1) - 1;
              return (
                <View key={rowKey} style={styles.toggleRow}>
                  <Text style={styles.toggleLabel}>{param.name}</Text>
                  <View style={styles.toggleLabels}>
                    {(options ?? []).map((optLabel, idx) => {
                      let value: number | boolean = idx;
                      if (param.type === 'b') {
                        value = idx > 0;
                      } else if ((options?.length ?? 0) === max - min + 1) {
                        value = min + idx;
                      }
                      const comparableCurrent = param.type === 'b' ? Boolean(current) : Number(current);
                      const comparableValue = param.type === 'b' ? Boolean(value) : Number(value);
                      const isActive = comparableCurrent === comparableValue;
                      return (
                        <Pressable
                          key={`${rowKey}-${value}`}
                          style={[styles.togglePill, isActive && styles.togglePillActive]}
                          onPress={() => onChange(param, value)}
                          hitSlop={6}
                        >
                          <Text style={[styles.togglePillText, isActive && styles.togglePillTextActive]}>
                            {optLabel}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </View>
    );
  };

  const renderIOParams = () => {
    if (!activeIOModelMeta) {
      return <Text style={styles.paramHint}>Select a model to edit parameters.</Text>;
    }
    return renderParamFields(
      activeIOModelMeta.params,
      activeIOModel?.params,
      updateIOParam,
      'Pick a model to edit its parameters.',
      COLORS.accent
    );
  };

  const renderBlockParams = () => {
    if (!activeBlockMeta || !activeBlock) {
      return <Text style={styles.paramHint}>Long-press a block to edit its parameters.</Text>;
    }
    const blockColor = activeBlock.kind ? getBlockColor(activeBlock.kind) : COLORS.accent;
    return renderParamFields(
      activeBlockMeta.params,
      activeBlock.params,
      updateBlockParam,
      'This block has no editable parameters.',
      blockColor
    );
  };

  const renderTunerScreen = () => (
    <SafeAreaProvider>
      <SafeAreaView style={styles.performanceSafe} edges={['top', 'left', 'right', 'bottom']}>
        <View style={styles.performanceBackdrop}>
          <View style={styles.performanceGlowA} />
          <View style={styles.performanceGlowB} />
        </View>

        <View style={styles.performanceHeader}>
          <View style={styles.performanceHeaderCopy}>
            <Text style={styles.performanceEyebrow}>Tuner Remote</Text>
            <Text style={styles.performanceHost}>Tune on the Helix display</Text>
          </View>
          <Pressable style={styles.performanceExitButton} onPress={closeTunerScreen}>
            <Text style={styles.performanceExitText}>Back</Text>
          </Pressable>
        </View>

        <ScrollView
          style={styles.tabContent}
          contentContainerStyle={styles.performanceContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.performanceHero}>
            <View style={[styles.performanceHeroAccent, { backgroundColor: '#f6b93b' }]} />
            <Text style={styles.performanceHeroKicker}>Helix Tuner</Text>
            <Text style={styles.performanceHeroTitle}>{tunerReferencePitch ?? 440} Hz</Text>
            <Text style={styles.performanceHeroMeta}>{TUNER_REMOTE_META}</Text>
            <View style={styles.performanceHeroStatus}>
              <View
                style={[
                  styles.performanceHeroStatusDot,
                  { backgroundColor: '#f6b93b' },
                ]}
              />
              <Text style={styles.performanceHeroStatusText}>{TUNER_REMOTE_NOTE}</Text>
            </View>
            <View style={styles.performanceChipRow}>
              {[
                { key: 'tuner-hero--1', label: '-1 Hz', onPress: () => handleTunerReferenceAdjust(-1) },
                { key: 'tuner-hero-+1', label: '+1 Hz', onPress: () => handleTunerReferenceAdjust(1), accent: true },
                { key: 'tuner-hero-open', label: 'Open On Helix', onPress: () => handleOpenTuner(tunerReturnScreen) },
                { key: 'tuner-hero-exit', label: 'Close On Helix', onPress: handleExitTuner },
              ].map((action) => (
                <Pressable
                  key={action.key}
                  style={[
                    styles.performanceChip,
                    action.accent && styles.performanceChipAccent,
                  ]}
                  onPress={action.onPress}
                >
                  <Text
                    style={[
                      styles.performanceChipText,
                      action.accent && styles.performanceChipTextAccent,
                    ]}
                  >
                    {action.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.performanceSection}>
            <View style={styles.performanceSectionHeader}>
              <Text style={styles.performanceSectionTitle}>Behavior</Text>
              <Text style={styles.performanceSectionMeta}>Helix Settings</Text>
            </View>
            {[
              {
                key: 'tuner-screen-stomp',
                label: 'Always On In Stomp View',
                value: tunerAlwaysOnStomp,
                onChange: handleTunerAlwaysOnStompToggle,
              },
              {
                key: 'tuner-screen-play',
                label: 'Always On In Play View',
                value: tunerAlwaysOnPlayView,
                onChange: handleTunerAlwaysOnPlayViewToggle,
              },
              {
                key: 'tuner-screen-volpedal',
                label: 'Volume Pedal Opens Tuner',
                value: tunerVolPedalOpens,
                onChange: handleTunerVolPedalOpensToggle,
              },
              {
                key: 'tuner-screen-trails',
                label: 'Tuner Trails',
                value: tunerTrails,
                onChange: handleTunerTrailsToggle,
              },
            ].map((item) => (
              <View key={item.key} style={styles.performanceInlineToggleRow}>
                <Text style={styles.performanceInlineLabel}>{item.label}</Text>
                <View style={styles.performanceInlineActions}>
                  {[
                    { label: 'Off', value: false },
                    { label: 'On', value: true },
                  ].map((option) => {
                    const active = item.value === option.value;
                    return (
                      <Pressable
                        key={`${item.key}-${option.label}`}
                        style={[styles.performanceInlinePill, active && styles.performanceInlinePillActive]}
                        onPress={() => item.onChange(option.value)}
                      >
                        <Text style={[styles.performanceInlinePillText, active && styles.performanceInlinePillTextActive]}>
                          {option.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            ))}
          </View>

          <View style={styles.performanceSection}>
            <View style={styles.performanceSectionHeader}>
              <Text style={styles.performanceSectionTitle}>String Offsets</Text>
              <Text style={styles.performanceSectionMeta}>
                {tunerOffsetsEnabled ? 'Enabled' : 'Disabled'}
              </Text>
            </View>
            <View style={styles.performanceInlineToggleRow}>
              <Text style={styles.performanceInlineLabel}>Per-String Offset Mode</Text>
              <View style={styles.performanceInlineActions}>
                {[
                  { label: 'Off', value: false },
                  { label: 'On', value: true },
                ].map((option) => {
                  const active = tunerOffsetsEnabled === option.value;
                  return (
                    <Pressable
                      key={`tuner-offset-mode-${option.label}`}
                      style={[styles.performanceInlinePill, active && styles.performanceInlinePillActive]}
                      onPress={() => handleTunerOffsetsEnabledToggle(option.value)}
                    >
                      <Text style={[styles.performanceInlinePillText, active && styles.performanceInlinePillTextActive]}>
                        {option.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
            <Text style={styles.tunerOffsetHint}>
              Dial in each string individually when you want the tuner to match a specific setup more closely.
            </Text>
            <View style={styles.tunerOffsetGrid}>
              {TUNER_STRING_CONFIG.map((item) => {
                const value = tunerStringOffsets[item.stringNumber] ?? null;
                return (
                  <View
                    key={`tuner-offset-${item.stringNumber}`}
                    style={[
                      styles.tunerOffsetCard,
                      tunerOffsetsEnabled !== true && styles.tunerOffsetCardDisabled,
                    ]}
                  >
                    <View style={styles.tunerOffsetHeader}>
                      <Text style={styles.tunerOffsetLabel}>{item.label}</Text>
                      <Text style={styles.tunerOffsetShortLabel}>{item.shortLabel}</Text>
                    </View>
                    <Text style={styles.tunerOffsetValue}>{formatSignedValue(value)}</Text>
                    <View style={styles.tunerOffsetAdjustRow}>
                      <Pressable
                        style={styles.tunerOffsetAdjustButton}
                        disabled={tunerOffsetsEnabled !== true}
                        onPress={() => handleTunerStringOffsetAdjust(item.stringNumber, -1)}
                      >
                        <Text style={styles.tunerOffsetAdjustButtonText}>-1</Text>
                      </Pressable>
                      <Pressable
                        style={[styles.tunerOffsetAdjustButton, styles.tunerOffsetAdjustButtonAccent]}
                        disabled={tunerOffsetsEnabled !== true}
                        onPress={() => handleTunerStringOffsetAdjust(item.stringNumber, 1)}
                      >
                        <Text style={[styles.tunerOffsetAdjustButtonText, styles.tunerOffsetAdjustButtonTextAccent]}>+1</Text>
                      </Pressable>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );

  /* ── Full-screen parameter editor ──────────────────────────────── */
  const renderEditor = () => {
    if (!activeBlock || !activeBlockMeta || !blockEditorSlot) return null;
    const appearance = getBlockAppearance(activeBlock.kind, activeBlock.enabled !== false);
    const color = appearance.accent;
    const blockImage = BLOCK_IMAGES[activeBlock.kind] ?? null;
    const displayName = getBlockDisplayName(activeBlock);
    const metaName = getBlockMetaName(activeBlock);

    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
          {/* Editor header */}
          <View style={styles.editorHeader}>
            <Pressable style={styles.editorBack} onPress={closeEditor} hitSlop={12}>
              <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                <Path d="M15 18l-6-6 6-6" stroke={COLORS.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </Pressable>
            <Text style={styles.editorTitle}>{displayName}</Text>
            <View style={styles.editorActions}>
              <Pressable
                style={styles.editorActionBtn}
                onPress={() => {
                  closeEditor();
                  replaceSlotModel(blockEditorSlot);
                }}
              >
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke={COLORS.muted} strokeWidth={1.8} strokeLinecap="round" />
                  <Path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke={COLORS.muted} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
              </Pressable>
              <Pressable
                style={styles.editorActionBtn}
                onPress={() => {
                  clearSlot(blockEditorSlot);
                  closeEditor();
                }}
              >
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke={COLORS.danger} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
              </Pressable>
            </View>
          </View>

          {/* Category subtitle + color bar */}
          <View style={styles.editorMeta}>
            <View
              style={[
                styles.editorMetaIcon,
                {
                  backgroundColor: appearance.iconSurface,
                  borderColor: colorWithAlpha(color, activeBlock.enabled === false ? 0.08 : 0.18),
                },
              ]}
            >
              {blockImage ? (
                <Image source={blockImage} style={{ width: 22, height: 22 }} resizeMode="contain" />
              ) : (
                <BlockIcon type={activeBlock.kind} size={22} color={appearance.power} />
              )}
            </View>
            <View style={styles.editorMetaCopy}>
              <Text style={[styles.editorCategory, { color: appearance.meta }]}>
                {kindLabel(activeBlock.kind).toUpperCase()}
              </Text>
              {metaName && <Text style={styles.editorModelName}>{metaName}</Text>}
              <Pressable
                style={[
                  styles.editorStateButton,
                  {
                    borderColor: activeBlock.enabled === false ? appearance.border : appearance.selectedBorder,
                    backgroundColor: activeBlock.enabled === false ? appearance.surface : appearance.selectedSurface,
                  },
                ]}
                onPress={() => {
                  void toggleBlockEnabled(blockEditorSlot);
                }}
              >
                <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M12 3v5M16.24 7.76a6 6 0 11-8.49 0"
                    stroke={appearance.power}
                    strokeWidth={1.8}
                    strokeLinecap="round"
                  />
                </Svg>
                <Text style={[styles.editorStateButtonText, { color: appearance.text }]}>
                  {activeBlock.enabled === false ? 'Bypassed' : 'Active'}
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={[styles.editorColorBar, { backgroundColor: color }]} />

          {/* Parameters */}
          <ScrollView
            style={styles.tabContent}
            contentContainerStyle={styles.editorParamPad}
            showsVerticalScrollIndicator={false}
          >
            {blockLabelMode && (
              <View style={styles.blockLabelEditor}>
                <Text style={styles.paramSectionTitle}>Block Label</Text>
                <View style={styles.inlineEditor}>
                  <TextInput
                    style={[styles.input, styles.inlineInput]}
                    value={blockLabelDraft}
                    onChangeText={setBlockLabelDraft}
                    placeholder={activeBlock.modelName ?? activeBlock.name}
                    placeholderTextColor={COLORS.muted}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                  <Pressable
                    style={[styles.button, styles.buttonGhost, styles.inlineButton]}
                    onPress={handleBlockLabelApply}
                  >
                    <Text style={[styles.buttonText, styles.buttonTextGhost]}>
                      {blockLabelDraft.trim() ? 'Apply' : 'Clear'}
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
            {renderBlockParams()}
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  };

  /* ── Full-screen editor takes over when active ─────────────────── */
  if (screen === 'editor' && blockEditorOpen) {
    return renderEditor();
  }

  if (screen === 'tuner') {
    return renderTunerScreen();
  }

  if (screen === 'performance') {
    return renderPerformanceMode();
  }

  /* ── Connection gate – must connect before using the app ──────── */
  if (!connected && screen !== 'editor') {
    return (
      <ConnectionGate
        host={host}
        onHostChange={setHost}
        onConnect={connect}
        connecting={connecting}
        status={status}
      />
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        {/* ── App bar ──────────────────────────────────────────── */}
        <View style={styles.appBar}>
          <Text style={styles.appTitle}>Stadium</Text>
          <View style={styles.appBarActions}>
            <Pressable style={styles.performanceLaunchButton} onPress={() => setScreen('performance')}>
              <Text style={styles.performanceLaunchText}>Perform</Text>
            </Pressable>
            <Pressable style={styles.statusPill} onPress={() => handleTabChange('settings')}>
              <View style={[styles.pillDot, { backgroundColor: connected ? COLORS.accent : COLORS.danger }]} />
              <Text style={styles.pillText}>{connected ? host : 'Offline'}</Text>
            </Pressable>
          </View>
        </View>

        {/* ── Tab content ──────────────────────────────────────── */}
        {activeTab === 'flow' && renderFlowTab()}
        {activeTab === 'preset' && renderPresetTab()}
        {activeTab === 'setlists' && renderSetlistsTab()}
        {activeTab === 'settings' && renderSettingsTab()}

        {/* ── Bottom Sheet: Setlist Picker ─────────────────────── */}
        <BottomSheet
          visible={setlistPickerOpen}
          onClose={() => setSetlistPickerOpen(false)}
          title="Select Setlist"
        >
          <ScrollView style={styles.sheetList}>
            {setlists.map((item) => {
              const active = item.cid_ === selectedContainerId;
              return (
                <Pressable
                  key={`setlist-pick-${String(item.cid_)}`}
                  style={[styles.sheetListItem, active && styles.sheetListItemActive]}
                  onPress={() => {
                    setSetlistPickerOpen(false);
                    void handleSetlistSelect(item);
                  }}
                >
                  <Text style={styles.sheetListText}>{item.name ?? `Setlist ${item.posi ?? '\u2014'}`}</Text>
                  {active && <Text style={styles.libraryActiveBadge}>Active</Text>}
                </Pressable>
              );
            })}
          </ScrollView>
          {activeSetlist && (
            <View style={styles.sheetRenameRow}>
              <TextInput
                style={[styles.input, styles.inlineInput]}
                value={setlistRenameText}
                onChangeText={setSetlistRenameText}
                placeholder="Rename setlist"
                placeholderTextColor={COLORS.muted}
              />
              <Pressable
                style={[styles.button, styles.buttonGhost, styles.inlineButton]}
                onPress={() => {
                  if (typeof activeSetlist.cid_ === 'number') {
                    void handleRenameContent(activeSetlist.cid_, setlistRenameText, 'Setlist');
                  }
                }}
              >
                <Text style={[styles.buttonText, styles.buttonTextGhost]}>Rename</Text>
              </Pressable>
            </View>
          )}
        </BottomSheet>

        {/* ── Bottom Sheet: Target Setlist Picker ──────────────── */}
        <BottomSheet
          visible={targetSetlistPickerOpen}
          onClose={() => setTargetSetlistPickerOpen(false)}
          title="Add to Setlist"
        >
          <ScrollView style={styles.sheetList}>
            {setlists.map((item) => {
              const active = item.cid_ === targetSetlistId;
              return (
                <Pressable
                  key={`target-pick-${String(item.cid_)}`}
                  style={[styles.sheetListItem, active && styles.sheetListItemActive]}
                  onPress={() => {
                    setTargetSetlistId(item.cid_ ?? null);
                    setTargetSetlistPickerOpen(false);
                  }}
                >
                  <Text style={styles.sheetListText}>{item.name ?? `Setlist ${item.posi ?? '\u2014'}`}</Text>
                  {active && <Text style={styles.libraryActiveBadge}>Active</Text>}
                </Pressable>
              );
            })}
          </ScrollView>
        </BottomSheet>

        {/* ── Bottom Sheet: Preset Actions ─────────────────────── */}
        <BottomSheet
          visible={presetActionTarget !== null}
          onClose={() => setPresetActionTarget(null)}
          title={presetActionTarget?.name ?? 'Preset'}
          subtitle={typeof presetActionTarget?.posi === 'number' ? `Slot ${presetActionTarget.posi + 1}` : undefined}
        >
          <View style={styles.sheetActions}>
            {presetActionTarget && isPresetActive(presetActionTarget) && activePresetStorageId !== null && (
              <View style={styles.sheetRenameRow}>
                <TextInput
                  style={[styles.input, styles.inlineInput]}
                  value={presetRenameText}
                  onChangeText={setPresetRenameText}
                  placeholder="Rename preset"
                  placeholderTextColor={COLORS.muted}
                />
                <Pressable
                  style={[styles.button, styles.buttonGhost, styles.inlineButton]}
                  onPress={() => {
                    void handleRenameContent(activePresetStorageId, presetRenameText, 'Preset');
                  }}
                >
                  <Text style={[styles.buttonText, styles.buttonTextGhost]}>Rename</Text>
                </Pressable>
              </View>
            )}
            {libraryRoot === 'setlists' && typeof selectedContainerId === 'number' && presetActionTarget && (
              <>
                <Pressable
                  style={[
                    styles.actionButton,
                    styles.actionButtonPrimary,
                    (typeof presetActionTarget.posi !== 'number' || presetActionTarget.posi <= 0) && styles.buttonDisabled,
                  ]}
                  disabled={typeof presetActionTarget.posi !== 'number' || presetActionTarget.posi <= 0}
                  onPress={() => {
                    const target = presetActionTarget;
                    setPresetActionTarget(null);
                    void handleMoveSetlistPreset(target, -1);
                  }}
                >
                  <Text style={styles.actionButtonPrimaryText}>Move Up</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.actionButton,
                    styles.actionButtonPrimary,
                    (typeof presetActionTarget.posi !== 'number' || presetActionTarget.posi >= presetItems.length - 1) && styles.buttonDisabled,
                  ]}
                  disabled={typeof presetActionTarget.posi !== 'number' || presetActionTarget.posi >= presetItems.length - 1}
                  onPress={() => {
                    const target = presetActionTarget;
                    setPresetActionTarget(null);
                    void handleMoveSetlistPreset(target, 1);
                  }}
                >
                  <Text style={styles.actionButtonPrimaryText}>Move Down</Text>
                </Pressable>
                <Pressable
                  style={[styles.actionButton, styles.actionButtonDanger]}
                  onPress={() => {
                    const target = presetActionTarget;
                    setPresetActionTarget(null);
                    void handleRemovePresetFromSetlist(target);
                  }}
                >
                <Text style={styles.actionButtonDangerText}>Remove from Setlist</Text>
                </Pressable>
              </>
            )}
            {(libraryRoot === 'user' || libraryRoot === 'factory') && typeof presetActionTarget?.cid_ === 'number' && typeof targetSetlistId === 'number' && (
              <Pressable
                style={[styles.actionButton, styles.actionButtonPrimary]}
                onPress={() => {
                  const target = presetActionTarget;
                  setPresetActionTarget(null);
                  if (target) void handleAddPresetToSetlist(target);
                }}
              >
                <Text style={styles.actionButtonPrimaryText}>Add to {targetSetlist?.name ?? 'Setlist'}</Text>
              </Pressable>
            )}
          </View>
        </BottomSheet>

        {/* ── Bottom Sheet: Snapshot Actions ───────────────────── */}
        <BottomSheet
          visible={snapshotActionIndex !== null}
          onClose={() => setSnapshotActionIndex(null)}
          title={snapshots.find((s) => s.index === snapshotActionIndex)?.name ?? `Snapshot ${(snapshotActionIndex ?? 0) + 1}`}
          subtitle={`Snapshot ${(snapshotActionIndex ?? 0) + 1}`}
        >
          <View style={styles.sheetActions}>
            {snapshotActionIndex === activeSnapshotIndex && (
              <View style={styles.sheetRenameRow}>
                <TextInput
                  style={[styles.input, styles.inlineInput]}
                  value={snapshotRenameText}
                  onChangeText={setSnapshotRenameText}
                  autoCapitalize="words"
                  autoCorrect={false}
                  placeholder="Snapshot name"
                  placeholderTextColor={COLORS.muted}
                />
                <Pressable
                  style={[styles.button, styles.buttonGhost, styles.inlineButton]}
                  onPress={() => {
                    void handleSnapshotRename();
                    setSnapshotActionIndex(null);
                  }}
                >
                  <Text style={[styles.buttonText, styles.buttonTextGhost]}>Rename</Text>
                </Pressable>
              </View>
            )}
            {snapshotActionIndex !== null && snapshotActionIndex !== activeSnapshotIndex && (
              <Pressable
                style={[styles.actionButton, styles.actionButtonPrimary]}
                onPress={() => {
                  handleSnapshotActivate(snapshotActionIndex);
                  setSnapshotActionIndex(null);
                }}
              >
                <Text style={styles.actionButtonPrimaryText}>Activate Snapshot</Text>
              </Pressable>
            )}
          </View>
        </BottomSheet>

        {/* ── Bottom Sheet: Slot Actions ───────────────────────── */}
        <BottomSheet
          visible={slotMenuOpen}
          onClose={() => setSlotMenuOpen(false)}
          title="Block Actions"
          subtitle={
            slotMenuTarget
              ? `${rowLabels[slotMenuTarget.path]} \u00b7 Slot ${slotMenuTarget.block + 1}`
              : undefined
          }
        >
          <View style={styles.sheetActions}>
            <Pressable
              style={[styles.actionButton, styles.actionButtonPrimary]}
              onPress={() => {
                if (!slotMenuTarget) return;
                setSlotMenuOpen(false);
                setBlockEditorSlot(slotMenuTarget);
                setBlockEditorOpen(true);
                setScreen('editor');
              }}
            >
              <Text style={styles.actionButtonPrimaryText}>Edit Parameters</Text>
            </Pressable>
            <Pressable
              style={[styles.actionButton, styles.actionButtonGhost]}
              onPress={() => slotMenuTarget && replaceSlotModel(slotMenuTarget)}
            >
              <Text style={styles.actionButtonText}>Replace Model</Text>
            </Pressable>
            <Pressable
              style={[styles.actionButton, styles.actionButtonDanger]}
              onPress={() => slotMenuTarget && clearSlot(slotMenuTarget)}
            >
              <Text style={styles.actionButtonDangerText}>Clear Block</Text>
            </Pressable>
          </View>
        </BottomSheet>

        {/* ── Bottom Sheet: IO Picker ──────────────────────────── */}
        <BottomSheet
          visible={ioPickerOpen}
          onClose={() => setIoPickerOpen(false)}
          title={`${ioPickerType === 'input' ? 'Input' : 'Output'} Settings`}
          subtitle={`${rowLabels[ioPickerRow]} \u00b7 ${ioPickerType === 'input' ? 'Input' : 'Output'}`}
        >
          <TextInput
            style={styles.searchInput}
            value={ioPickerQuery}
            onChangeText={setIoPickerQuery}
            placeholder={`Search ${ioPickerType === 'input' ? 'inputs' : 'outputs'}\u2026`}
            placeholderTextColor={COLORS.muted}
          />
          <ScrollView style={styles.sheetList} nestedScrollEnabled>
            {ioPickerModels.map((model) => {
              const isActive = activeIOModel?.modelId === model.id;
              return (
                <Pressable
                  key={model.id}
                  style={[styles.sheetListItem, isActive && styles.sheetListItemActive]}
                  onPress={() => setIOModel(model)}
                >
                  <Text style={styles.sheetListText}>{model.name}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
          <Text style={styles.paramSectionTitle}>Parameters</Text>
          <ScrollView style={styles.paramList} nestedScrollEnabled>
            {renderIOParams()}
          </ScrollView>
        </BottomSheet>

        {/* ── Bottom Sheet: Block Picker ───────────────────────── */}
        <BottomSheet
          visible={pickerOpen}
          onClose={() => setPickerOpen(false)}
          title={pickerStep === 'type' ? 'Add Block' : blockCatalog[pickerType ?? 'amp']?.label}
          subtitle={`${rowLabels[targetSlot.path]} \u00b7 Slot ${targetSlot.block + 1} \u00b7 Headroom ${availableUsage.toFixed(1)}/${dspLimit}`}
        >
          {pickerStep === 'type' ? (
            <ScrollView style={styles.sheetList} nestedScrollEnabled showsVerticalScrollIndicator={false}>
              <View style={styles.typeGrid}>
                {blockTypeOrder.map((typeKey) => {
                  const group = blockCatalog[typeKey];
                  const color = getBlockColor(typeKey);
                  return (
                    <Pressable key={typeKey} style={styles.typeCard} onPress={() => selectBlockType(typeKey)}>
                      <View style={[styles.typeAccent, { backgroundColor: color }]} />
                      <View style={[styles.typeIconWrap, { backgroundColor: `${color}18` }]}>
                        {BLOCK_IMAGES[typeKey] ? (
                          <Image source={BLOCK_IMAGES[typeKey]} style={styles.typeIcon} resizeMode="contain" />
                        ) : (
                          <BlockIcon type={typeKey} size={22} color={color} />
                        )}
                      </View>
                      <View style={styles.typeInfo}>
                        <Text style={styles.typeLabel}>{group.label}</Text>
                        <Text style={styles.typeMeta}>{group.models.length} models</Text>
                      </View>
                      <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                        <Path d="M9 18l6-6-6-6" stroke={COLORS.muted} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </Svg>
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>
          ) : (
            <>
              <View style={styles.pickerNav}>
                <Pressable style={styles.backButton} onPress={() => setPickerStep('type')}>
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                    <Path d="M15 18l-6-6 6-6" stroke={COLORS.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </Svg>
                  <Text style={styles.backButtonText}>Back</Text>
                </Pressable>
              </View>
              <TextInput
                style={styles.searchInput}
                value={pickerQuery}
                onChangeText={setPickerQuery}
                placeholder="Search models\u2026"
                placeholderTextColor={COLORS.muted}
              />
              <ScrollView style={styles.sheetModelList} nestedScrollEnabled showsVerticalScrollIndicator={false}>
                {pickerModels.map((item) => {
                  const required = item.usage ?? 0;
                  const canInsert = required <= availableUsage;
                  const color = getBlockColor(pickerType ?? '');
                  const sourceName = isUsefulRealName(item.based_on) ? item.based_on!.trim() : null;
                  const primaryName = showRealBlockNames && sourceName ? sourceName : item.name;
                  const secondaryName = showRealBlockNames && sourceName ? item.name : sourceName;
                  return (
                    <Pressable
                      key={item.id}
                      style={[styles.sheetListItem, !canInsert && styles.sheetListItemDisabled]}
                      onPress={() => insertModel(item.id, item.name, pickerType ?? 'fx', item.usage ?? 0)}
                      disabled={!canInsert}
                    >
                      <View style={[styles.modelDot, { backgroundColor: color }]} />
                      <View style={styles.modelInfo}>
                        <Text style={[styles.sheetListText, !canInsert && styles.sheetListTextDim]}>{primaryName}</Text>
                        {secondaryName && (
                          <Text style={styles.modelMetaText} numberOfLines={1}>{secondaryName}</Text>
                        )}
                      </View>
                      <View style={[styles.dspBadge, !canInsert && { borderColor: 'transparent' }]}>
                        <Text style={[styles.dspBadgeText, !canInsert && styles.sheetListTextDim]}>{required.toFixed(1)}</Text>
                      </View>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </>
          )}
        </BottomSheet>

        {/* ── Tab bar ──────────────────────────────────────────── */}
        <TabBar activeTab={activeTab} onTabChange={handleTabChange} connected={connected} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },

  /* ── App bar ──────────────────────────────────────────────────── */
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 10,
  },
  appTitle: { fontSize: 22, color: COLORS.text, fontFamily: FONT_DISPLAY, letterSpacing: 0.1 },
  appBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  performanceLaunchButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: COLORS.accentDim,
    borderWidth: 1,
    borderColor: COLORS.accentMid,
  },
  performanceLaunchText: {
    color: COLORS.accent,
    fontFamily: FONT_BODY_SEMI,
    fontSize: 13,
    letterSpacing: 0.1,
  },
  statusPill: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20,
    backgroundColor: COLORS.panel, borderWidth: 1, borderColor: COLORS.stroke,
  },
  pillDot: { width: 8, height: 8, borderRadius: 4 },
  pillText: { color: COLORS.muted, fontFamily: FONT_MONO, fontSize: 12 },

  /* ── Performance mode ─────────────────────────────────────────── */
  performanceSafe: { flex: 1, backgroundColor: '#090b10' },
  performanceBackdrop: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  performanceGlowA: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(61,138,247,0.18)',
    top: -70,
    right: -40,
  },
  performanceGlowB: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(0,230,222,0.12)',
    bottom: 90,
    left: -70,
  },
  performanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 10,
  },
  performanceHeaderCopy: {
    gap: 4,
  },
  performanceEyebrow: {
    color: COLORS.accent,
    fontFamily: FONT_MONO,
    fontSize: 11,
    letterSpacing: 2.2,
    textTransform: 'uppercase',
  },
  performanceHost: {
    color: COLORS.muted,
    fontFamily: FONT_MONO,
    fontSize: 12,
  },
  performanceExitButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    backgroundColor: 'rgba(17,20,25,0.92)',
  },
  performanceExitText: {
    color: COLORS.text,
    fontFamily: FONT_BODY_SEMI,
    fontSize: 14,
    letterSpacing: 0.1,
  },
  performanceContent: {
    paddingHorizontal: 16,
    paddingBottom: 28,
    gap: 16,
  },
  performanceHero: {
    position: 'relative',
    overflow: 'hidden',
    padding: 20,
    borderRadius: 26,
    backgroundColor: 'rgba(17,22,29,0.96)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    gap: 10,
  },
  performanceHeroAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: COLORS.accent,
  },
  performanceHeroKicker: {
    color: COLORS.accent,
    fontFamily: FONT_MONO,
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  performanceHeroTitle: {
    color: COLORS.text,
    fontFamily: FONT_DISPLAY,
    fontSize: 30,
    lineHeight: 34,
    letterSpacing: 0.2,
  },
  performanceHeroMeta: {
    color: '#c4cad5',
    fontFamily: FONT_BODY,
    fontSize: 14,
    lineHeight: 20,
  },
  performanceHeroStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  performanceHeroStatusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  performanceHeroStatusText: {
    color: COLORS.muted,
    fontFamily: FONT_MONO,
    fontSize: 11,
    letterSpacing: 0.3,
  },
  performanceSection: {
    gap: 12,
    padding: 16,
    borderRadius: 22,
    backgroundColor: 'rgba(14,18,24,0.94)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  performanceSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  performanceSectionTitle: {
    color: COLORS.text,
    fontFamily: FONT_BODY_SEMI,
    fontSize: 18,
    letterSpacing: 0.2,
  },
  performanceSectionMeta: {
    color: COLORS.muted,
    fontFamily: FONT_MONO,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  performanceActionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  performanceActionCard: {
    width: '48%',
    minHeight: 110,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    backgroundColor: COLORS.panelAlt,
    justifyContent: 'space-between',
  },
  performanceActionCardActive: {
    borderColor: COLORS.accentMid,
    backgroundColor: COLORS.accentDim,
  },
  performanceActionCardDisabled: {
    opacity: 0.45,
  },
  performanceActionLabel: {
    color: COLORS.text,
    fontFamily: FONT_BODY_SEMI,
    fontSize: 16,
    lineHeight: 20,
  },
  performanceActionLabelActive: {
    color: COLORS.accent,
  },
  performanceActionMeta: {
    color: COLORS.muted,
    fontFamily: FONT_MONO,
    fontSize: 11,
    lineHeight: 16,
  },
  performanceTempoCard: {
    gap: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    backgroundColor: COLORS.panelAlt,
  },
  performanceTempoValue: {
    color: COLORS.text,
    fontFamily: FONT_DISPLAY,
    fontSize: 36,
    letterSpacing: 0.4,
  },
  performanceTempoUnit: {
    color: COLORS.accent,
    fontFamily: FONT_MONO,
    fontSize: 12,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  performanceTempoMeta: {
    color: COLORS.muted,
    fontFamily: FONT_MONO,
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: 4,
  },
  performanceChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  performanceChip: {
    minWidth: 58,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    backgroundColor: COLORS.panelAlt,
    alignItems: 'center',
  },
  performanceChipAccent: {
    borderColor: COLORS.accentMid,
    backgroundColor: COLORS.accentDim,
  },
  performanceChipText: {
    color: COLORS.text,
    fontFamily: FONT_BODY_SEMI,
    fontSize: 13,
  },
  performanceChipTextAccent: {
    color: COLORS.accent,
  },
  performanceInlineToggleRow: {
    gap: 10,
  },
  performanceInlineLabel: {
    color: COLORS.text,
    fontFamily: FONT_BODY_SEMI,
    fontSize: 13,
  },
  performanceInlineActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  performanceInlinePill: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    backgroundColor: COLORS.panelAlt,
  },
  performanceInlinePillActive: {
    borderColor: COLORS.accentMid,
    backgroundColor: COLORS.accentDim,
  },
  performanceInlinePillStatic: {
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  performanceInlinePillText: {
    color: COLORS.muted,
    fontFamily: FONT_BODY_SEMI,
    fontSize: 12,
  },
  performanceInlinePillTextActive: {
    color: COLORS.accent,
  },
  tunerOffsetHint: {
    color: COLORS.muted,
    fontFamily: FONT_MONO,
    fontSize: 11,
    lineHeight: 16,
  },
  tunerOffsetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tunerOffsetCard: {
    width: '48%',
    minHeight: 126,
    padding: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    backgroundColor: COLORS.panelAlt,
    gap: 10,
  },
  tunerOffsetCardDisabled: {
    opacity: 0.5,
  },
  tunerOffsetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tunerOffsetLabel: {
    color: COLORS.text,
    fontFamily: FONT_BODY_SEMI,
    fontSize: 13,
  },
  tunerOffsetShortLabel: {
    color: COLORS.muted,
    fontFamily: FONT_MONO,
    fontSize: 10,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  tunerOffsetValue: {
    color: COLORS.accent,
    fontFamily: FONT_DISPLAY,
    fontSize: 26,
    letterSpacing: 0.2,
  },
  tunerOffsetAdjustRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tunerOffsetAdjustButton: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    backgroundColor: COLORS.panel,
    alignItems: 'center',
  },
  tunerOffsetAdjustButtonAccent: {
    borderColor: COLORS.accentMid,
    backgroundColor: COLORS.accentDim,
  },
  tunerOffsetAdjustButtonText: {
    color: COLORS.text,
    fontFamily: FONT_BODY_SEMI,
    fontSize: 12,
  },
  tunerOffsetAdjustButtonTextAccent: {
    color: COLORS.accent,
  },
  performanceSnapshotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  performanceSnapshotCard: {
    width: '23%',
    minHeight: 112,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    backgroundColor: COLORS.panelAlt,
    alignItems: 'center',
    gap: 8,
  },
  performanceSnapshotCardActive: {
    borderColor: COLORS.accentMid,
    backgroundColor: COLORS.accentDim,
  },
  performanceSnapshotSwatch: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  performanceSnapshotIndex: {
    color: COLORS.text,
    fontFamily: FONT_DISPLAY,
    fontSize: 18,
  },
  performanceSnapshotIndexActive: {
    color: COLORS.accent,
  },
  performanceSnapshotName: {
    color: COLORS.muted,
    fontFamily: FONT_BODY,
    fontSize: 11,
    lineHeight: 15,
    textAlign: 'center',
  },
  performanceSnapshotNameActive: {
    color: COLORS.text,
  },
  performancePresetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  performancePresetCard: {
    width: '48%',
    minHeight: 96,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    backgroundColor: COLORS.panelAlt,
    gap: 8,
  },
  performancePresetCardActive: {
    borderColor: COLORS.accentMid,
    backgroundColor: COLORS.accentDim,
  },
  performancePresetSlot: {
    color: COLORS.muted,
    fontFamily: FONT_MONO,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  performancePresetSlotActive: {
    color: COLORS.accent,
  },
  performancePresetName: {
    color: COLORS.text,
    fontFamily: FONT_BODY_SEMI,
    fontSize: 15,
    lineHeight: 20,
  },
  performancePresetNameActive: {
    color: COLORS.accent,
  },
  performanceEmptyText: {
    color: COLORS.muted,
    fontFamily: FONT_MONO,
    fontSize: 12,
    lineHeight: 18,
  },
  transportHeroCard: {
    gap: 6,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    backgroundColor: COLORS.panelAlt,
  },
  transportHeroValue: {
    color: COLORS.text,
    fontFamily: FONT_DISPLAY,
    fontSize: 26,
    letterSpacing: 0.2,
  },
  transportHeroUnit: {
    color: COLORS.muted,
    fontFamily: FONT_MONO,
    fontSize: 13,
  },
  transportHeroMeta: {
    color: COLORS.muted,
    fontFamily: FONT_MONO,
    fontSize: 11,
    lineHeight: 16,
  },
  transportAdjustRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  transportAdjustButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    backgroundColor: COLORS.panelAlt,
  },
  transportAdjustButtonAccent: {
    borderColor: COLORS.accentMid,
    backgroundColor: COLORS.accentDim,
  },
  transportAdjustButtonText: {
    color: COLORS.text,
    fontFamily: FONT_BODY_SEMI,
    fontSize: 13,
  },
  transportAdjustButtonTextAccent: {
    color: COLORS.accent,
  },

  /* ── Flow tab ──────────────────────────────────────────────────── */
  tabContent: { flex: 1 },
  tabPadding: { padding: 16, paddingBottom: 24 },
  flowPadding: { paddingHorizontal: 16, paddingBottom: 32 },

  syncBtn: {
    flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center', gap: 6,
    paddingVertical: 8, paddingHorizontal: 14, borderRadius: 10,
    backgroundColor: COLORS.panel, borderWidth: 1, borderColor: COLORS.stroke,
    marginBottom: 16, marginTop: 4,
  },
  syncBtnText: { color: COLORS.accent, fontFamily: FONT_BODY_SEMI, fontSize: 13, letterSpacing: 0.4 },

  /* ── Path section ──────────────────────────────────────────────── */
  pathSection: {
    marginBottom: 24, borderRadius: 16, backgroundColor: COLORS.panel,
    borderWidth: 1, borderColor: COLORS.stroke, overflow: 'hidden',
  },
  pathHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8,
  },
  pathHeaderCopy: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pathTitle: { color: COLORS.text, fontFamily: FONT_DISPLAY, fontSize: 18, letterSpacing: 0.5 },
  pathClipboardBadge: {
    color: COLORS.accent,
    fontFamily: FONT_MONO,
    fontSize: 10,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  pathDsp: { fontFamily: FONT_MONO, fontSize: 13 },
  dspTrack: {
    height: 4, borderRadius: 2, backgroundColor: COLORS.panelAlt,
    marginHorizontal: 16, marginBottom: 12, overflow: 'hidden',
  },
  dspFill: { height: '100%', borderRadius: 2 },
  pathActionRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  pathActionButton: {
    minWidth: 108,
  },

  /* ── Effect row (populated block) ──────────────────────────────── */
  effectList: { gap: 2 },
  effectRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 14, paddingHorizontal: 16,
    borderWidth: 1, borderColor: 'transparent',
    borderRadius: 0,
  },
  effectColorBar: {
    width: 3, height: 36, borderRadius: 1.5,
  },
  effectIconWrap: {
    width: 40, height: 40, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  effectIcon: { width: 24, height: 24 },
  effectInfo: { flex: 1, gap: 2 },
  effectName: { color: COLORS.text, fontFamily: FONT_BODY_SEMI, fontSize: 15 },
  effectKind: { fontFamily: FONT_MONO, fontSize: 11, letterSpacing: 0.3 },
  powerBtn: {
    width: 36, height: 36, borderRadius: 18,
    borderWidth: 1, borderColor: COLORS.stroke,
    alignItems: 'center', justifyContent: 'center',
  },

  /* ── Empty slot row ────────────────────────────────────────────── */
  emptyRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingVertical: 8, paddingHorizontal: 16, opacity: 0.4,
  },
  emptySlotNum: {
    width: 24, height: 24, borderRadius: 12,
    borderWidth: 1, borderColor: COLORS.stroke, borderStyle: 'dashed',
    alignItems: 'center', justifyContent: 'center',
  },
  emptySlotNumText: { color: COLORS.muted, fontFamily: FONT_MONO, fontSize: 10 },
  moreSlotsBtn: {
    paddingVertical: 10, paddingHorizontal: 16, alignItems: 'center',
  },
  moreSlotsText: { color: COLORS.muted, fontFamily: FONT_MONO, fontSize: 11, opacity: 0.6 },

  /* ── IO row ────────────────────────────────────────────────────── */
  ioRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 12, paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: COLORS.stroke,
  },
  ioIconWrap: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: COLORS.panelAlt, borderWidth: 1, borderColor: COLORS.stroke,
    alignItems: 'center', justifyContent: 'center',
  },
  ioInfo: { flex: 1, gap: 1 },
  ioLabel: { color: COLORS.muted, fontFamily: FONT_MONO, fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.8 },
  ioName: { color: COLORS.text, fontFamily: FONT_BODY, fontSize: 14 },

  /* ── Split divider ─────────────────────────────────────────────── */
  splitDivider: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 16, paddingVertical: 10,
  },
  splitLine: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: COLORS.stroke },
  splitLabel: { color: COLORS.muted, fontFamily: FONT_MONO, fontSize: 10, letterSpacing: 2 },

  /* ── Full-screen editor ────────────────────────────────────────── */
  editorHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12,
  },
  editorBack: { padding: 4 },
  editorTitle: { flex: 1, color: COLORS.text, fontFamily: FONT_DISPLAY, fontSize: 20, letterSpacing: 0.3 },
  editorActions: { flexDirection: 'row', gap: 8 },
  editorActionBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: COLORS.panel, borderWidth: 1, borderColor: COLORS.stroke,
    alignItems: 'center', justifyContent: 'center',
  },
  editorMeta: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 20, paddingBottom: 12,
  },
  editorMetaIcon: {
    width: 32, height: 32, borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center', justifyContent: 'center',
  },
  editorMetaCopy: {
    flex: 1,
    gap: 8,
  },
  editorCategory: { fontFamily: FONT_MONO, fontSize: 12, letterSpacing: 2 },
  editorModelName: {
    color: COLORS.muted,
    fontFamily: FONT_BODY,
    fontSize: 13,
    lineHeight: 18,
  },
  editorStateButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
  },
  editorStateButtonText: {
    fontFamily: FONT_BODY_SEMI,
    fontSize: 12,
    letterSpacing: 0.2,
  },
  editorColorBar: { height: 3, marginHorizontal: 20, borderRadius: 1.5, marginBottom: 8 },
  editorParamPad: { padding: 16, paddingBottom: 40 },

  /* ── Sections (preset/device tabs) ─────────────────────────────── */
  section: {
    marginTop: 16, padding: 16, borderRadius: 14,
    backgroundColor: COLORS.panel, borderWidth: 1, borderColor: COLORS.stroke,
  },
  sectionTitle: {
    color: COLORS.accent, fontFamily: FONT_MONO, fontSize: 11,
    letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14,
  },
  sectionBody: { gap: 14 },
  row: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

  /* ── Inputs ───────────────────────────────────────────────────── */
  input: {
    padding: 14, borderRadius: 12, borderWidth: 1, borderColor: COLORS.stroke,
    color: COLORS.text, fontFamily: FONT_MONO, fontSize: 15, backgroundColor: COLORS.panelAlt,
  },
  textArea: {
    minHeight: 180, textAlignVertical: 'top', padding: 14, borderRadius: 12,
    borderWidth: 1, borderColor: COLORS.stroke, color: COLORS.text,
    fontFamily: FONT_MONO, fontSize: 14, backgroundColor: COLORS.panelAlt,
  },
  searchInput: {
    padding: 12, borderRadius: 12, borderWidth: 1, borderColor: COLORS.stroke,
    color: COLORS.text, fontFamily: FONT_MONO, fontSize: 14,
    backgroundColor: COLORS.panelAlt, marginBottom: 12,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    backgroundColor: COLORS.panelAlt,
  },
  searchInputInline: {
    flex: 1,
    color: COLORS.text,
    fontFamily: FONT_MONO,
    fontSize: 14,
    paddingVertical: 0,
  },
  searchClearText: {
    color: COLORS.accent,
    fontFamily: FONT_BODY_SEMI,
    fontSize: 12,
  },

  /* ── Buttons ──────────────────────────────────────────────────── */
  button: { paddingVertical: 14, paddingHorizontal: 18, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  buttonPrimary: { backgroundColor: COLORS.accent },
  buttonGhost: { borderWidth: 1, borderColor: COLORS.stroke },
  buttonDisabled: { opacity: 0.45 },
  buttonFlex: { flex: 1 },
  buttonText: { color: COLORS.bg, fontFamily: FONT_BODY_SEMI, fontSize: 15, letterSpacing: 0.1 },
  buttonTextGhost: { color: COLORS.text },

  /* ── Labels ───────────────────────────────────────────────────── */
  label: { color: COLORS.text, fontFamily: FONT_BODY, fontSize: 15 },
  labelHint: { color: COLORS.muted, fontFamily: FONT_MONO, fontSize: 11, marginTop: 2, maxWidth: 240 },
  /* ── Active preset bar ─────────────────────────────────── */
  activePresetBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
  },
  activePresetInfo: { flex: 1, gap: 2 },
  activePresetBarName: { color: COLORS.text, fontFamily: FONT_BODY_SEMI, fontSize: 15, flexShrink: 1 },
  compactIconBtn: {
    width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: COLORS.stroke,
  },
  compactSaveBtn: {
    paddingVertical: 8, paddingHorizontal: 14, borderRadius: 10,
    backgroundColor: COLORS.accent,
  },
  compactSaveBtnText: { color: COLORS.bg, fontFamily: FONT_BODY_SEMI, fontSize: 13, letterSpacing: 0.1 },
  listHeaderRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sheetRenameRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 14, paddingTop: 14, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: COLORS.stroke },

  libraryHeader: { flex: 1, gap: 4, paddingRight: 12 },
  libraryActionStack: { gap: 8 },
  libraryCurrentName: { color: COLORS.text, fontFamily: FONT_BODY_SEMI, fontSize: 17 },
  libraryMeta: { color: COLORS.muted, fontFamily: FONT_MONO, fontSize: 11, lineHeight: 16 },
  libraryRefresh: { minWidth: 104, paddingVertical: 10, paddingHorizontal: 12 },
  libraryPills: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },

  /* ── Segmented control ────────────────────────────────── */
  segmentedControl: {
    flexDirection: 'row', borderRadius: 12, borderWidth: 1,
    borderColor: COLORS.stroke, backgroundColor: COLORS.panelAlt, overflow: 'hidden',
  },
  segment: {
    flex: 1, paddingVertical: 10, alignItems: 'center', justifyContent: 'center',
  },
  segmentDivider: { borderLeftWidth: 1, borderLeftColor: COLORS.stroke },
  segmentActive: { backgroundColor: COLORS.accentDim },
  segmentText: { color: COLORS.muted, fontFamily: FONT_BODY_SEMI, fontSize: 13, letterSpacing: 0.3 },
  segmentTextActive: { color: COLORS.accent },

  /* ── Dropdown button ──────────────────────────────────── */
  dropdownButton: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 14,
    borderRadius: 12, borderWidth: 1, borderColor: COLORS.stroke, backgroundColor: COLORS.panelAlt,
  },
  dropdownContent: { flex: 1, gap: 2 },
  dropdownLabel: {
    color: COLORS.muted, fontFamily: FONT_MONO, fontSize: 10,
    textTransform: 'uppercase', letterSpacing: 1,
  },
  dropdownValue: { color: COLORS.text, fontFamily: FONT_BODY_SEMI, fontSize: 15 },
  dropdownChevron: { color: COLORS.muted, fontSize: 18, marginLeft: 8 },

  /* ── Preset row extras ────────────────────────────────── */
  presetSlotNum: { width: 28, color: COLORS.muted, fontFamily: FONT_MONO, fontSize: 12, textAlign: 'center' },
  presetSlotNumActive: { color: COLORS.accent },
  presetMoreButton: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  presetMoreText: { color: COLORS.muted, fontSize: 18 },
  setlistRowActions: { flexDirection: 'row', alignItems: 'center', gap: 4, flexShrink: 0 },
  setlistRowActionButton: {
    minWidth: 34,
    height: 30,
    paddingHorizontal: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    backgroundColor: COLORS.panel,
    alignItems: 'center',
    justifyContent: 'center',
  },
  setlistRowActionButtonDisabled: { opacity: 0.35 },
  setlistRowActionText: { color: COLORS.text, fontFamily: FONT_BODY_SEMI, fontSize: 11 },
  setlistRowActionTextDisabled: { color: COLORS.muted },
  setlistRowActionDanger: { borderColor: 'rgba(228,107,97,0.25)', backgroundColor: 'rgba(228,107,97,0.10)' },
  setlistRowActionDangerText: { color: COLORS.danger },
  setlistAddButton: {
    height: 32,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: COLORS.accentDim,
    borderWidth: 1,
    borderColor: COLORS.accentMid,
    alignItems: 'center',
    justifyContent: 'center',
  },
  setlistAddButtonText: { color: COLORS.accent, fontFamily: FONT_BODY_SEMI, fontSize: 12 },

  /* ── Snapshot dot ─────────────────────────────────────── */
  snapshotDot: {
    width: 10, height: 10, borderRadius: 5,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
  },

  libraryList: { gap: 8 },
  inlineEditor: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  inlineInput: { flex: 1 },
  inlineButton: { minWidth: 96 },
  inlineLabelRow: { gap: 8 },
  libraryRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 12, paddingHorizontal: 14,
    borderRadius: 12, borderWidth: 1, borderColor: COLORS.stroke,
    backgroundColor: COLORS.panelAlt,
  },
  libraryRowActive: { borderColor: COLORS.accentMid, backgroundColor: COLORS.accentDim },
  libraryRowMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  libraryRowCopy: { flex: 1, gap: 4 },
  libraryRowActions: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 8 },
  libraryActiveBadge: {
    color: COLORS.accent, fontFamily: FONT_MONO, fontSize: 11,
    textTransform: 'uppercase', letterSpacing: 1.2,
  },
  rowActionButton: { minWidth: 70, paddingVertical: 8, paddingHorizontal: 10 },
  rowActionButtonDisabled: { opacity: 0.45 },
  snapshotDetailCard: {
    gap: 10,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    backgroundColor: COLORS.panelAlt,
  },
  snapshotTargetChip: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    backgroundColor: COLORS.panel,
  },
  snapshotTargetText: { color: COLORS.text, fontFamily: FONT_MONO, fontSize: 12 },

  /* ── Status / events ──────────────────────────────────────────── */
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
  statusText: { color: COLORS.muted, fontFamily: FONT_MONO, fontSize: 13 },

  /* ── Device hero ──────────────────────────────────────────────── */
  deviceHero: { alignItems: 'center', paddingVertical: 32, gap: 8 },
  deviceTitle: { fontSize: 28, color: COLORS.text, fontFamily: FONT_DISPLAY, letterSpacing: 0.1 },
  deviceSubtitle: { color: COLORS.muted, fontFamily: FONT_MONO, fontSize: 12 },

  /* ── Hints / footer ───────────────────────────────────────────── */
  hint: { marginTop: 24, alignItems: 'center', paddingHorizontal: 16 },
  hintText: { color: COLORS.muted, fontFamily: FONT_MONO, fontSize: 11, textAlign: 'center', lineHeight: 18, opacity: 0.7 },

  /* ── Bottom sheet: actions ─────────────────────────────────────── */
  sheetActions: { gap: 10 },
  actionButton: { paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  actionButtonPrimary: { backgroundColor: COLORS.accentDim, borderWidth: 1, borderColor: COLORS.accentMid },
  actionButtonPrimaryText: { color: COLORS.accent, fontFamily: FONT_BODY_SEMI, fontSize: 16 },
  actionButtonDanger: { backgroundColor: 'rgba(228,107,97,0.12)', borderWidth: 1, borderColor: 'rgba(228,107,97,0.25)' },
  actionButtonDangerText: { color: COLORS.danger, fontFamily: FONT_BODY_SEMI, fontSize: 16 },
  actionButtonGhost: { borderWidth: 1, borderColor: COLORS.stroke },
  actionButtonText: { color: COLORS.text, fontFamily: FONT_BODY_SEMI, fontSize: 16 },

  /* ── Bottom sheet: lists ───────────────────────────────────────── */
  sheetList: { maxHeight: 280 },
  sheetModelList: { maxHeight: 360 },
  sheetListItem: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 13, paddingHorizontal: 8,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.stroke,
  },
  sheetListItemActive: { backgroundColor: COLORS.accentDim, borderRadius: 10 },
  sheetListItemDisabled: { opacity: 0.3 },
  sheetListText: { flex: 1, color: COLORS.text, fontFamily: FONT_BODY, fontSize: 15 },
  sheetListTextDim: { color: COLORS.muted },

  /* ── Block type picker ─────────────────────────────────────────── */
  typeGrid: { gap: 8 },
  typeCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12, borderRadius: 12,
    borderWidth: 1, borderColor: COLORS.stroke, backgroundColor: COLORS.panelAlt,
    paddingVertical: 14, paddingHorizontal: 14, overflow: 'hidden',
  },
  typeAccent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, borderTopLeftRadius: 12, borderBottomLeftRadius: 12 },
  typeIconWrap: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  typeIcon: { width: 28, height: 28 },
  typeInfo: { flex: 1 },
  typeLabel: { color: COLORS.text, fontFamily: FONT_BODY_SEMI, fontSize: 15 },
  typeMeta: { color: COLORS.muted, fontFamily: FONT_MONO, fontSize: 10, marginTop: 2 },

  /* ── Model picker ──────────────────────────────────────────────── */
  modelDot: { width: 10, height: 10, borderRadius: 5 },
  modelInfo: { flex: 1 },
  modelMetaText: {
    color: COLORS.muted,
    fontFamily: FONT_MONO,
    fontSize: 11,
    marginTop: 3,
  },
  dspBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, backgroundColor: COLORS.panelAlt, borderWidth: 1, borderColor: COLORS.stroke },
  dspBadgeText: { color: COLORS.muted, fontFamily: FONT_MONO, fontSize: 11 },
  pickerNav: { marginBottom: 12 },
  backButton: {
    alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10,
    borderWidth: 1, borderColor: COLORS.stroke,
  },
  backButtonText: { color: COLORS.text, fontFamily: FONT_BODY_SEMI, fontSize: 13 },

  /* ── Parameter editor: knob grid ───────────────────────────────── */
  paramContainer: { gap: 20 },
  blockLabelEditor: {
    gap: 8,
    paddingBottom: 16,
    marginBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.stroke,
  },
  knobGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', gap: 8, paddingVertical: 8 },
  toggleSection: { gap: 12, paddingTop: 8, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: COLORS.stroke },
  toggleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  toggleLabel: { color: COLORS.muted, fontFamily: FONT_BODY_SEMI, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5, width: 80 },
  toggleLabels: { flexDirection: 'row', gap: 6, flex: 1, flexWrap: 'wrap' },
  togglePill: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, borderWidth: 1, borderColor: COLORS.stroke, backgroundColor: COLORS.panelAlt },
  togglePillActive: { borderColor: COLORS.accent, backgroundColor: COLORS.accentDim },
  togglePillText: { color: COLORS.muted, fontFamily: FONT_BODY_SEMI, fontSize: 13 },
  togglePillTextActive: { color: COLORS.accent },
  snapshotColorPill: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  snapshotColorSwatch: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },

  /* ── IO parameters ─────────────────────────────────────────────── */
  paramSectionTitle: { color: COLORS.accent, fontFamily: FONT_MONO, fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 16, marginBottom: 8 },
  paramList: { maxHeight: 340 },
  paramHint: { color: COLORS.muted, fontFamily: FONT_MONO, fontSize: 12, textAlign: 'center', paddingVertical: 20, opacity: 0.7 },
});
