import { SnapshotAssignmentsSheet } from './src/components/SnapshotAssignmentsSheet';
import { populatedSlots, setlistAppendPosition, setlistMovePosition } from './src/utils/librarySlots';
import { LibraryHeading, LibraryButton, LibrarySearch, LibrarySegments, LibraryRow, libraryStyles } from './src/components/LibraryChrome';
import { ShowcaseLibrary } from './src/components/ShowcaseLibrary';
import { presetStorageId } from './src/protocol/presetSave';
import { isEmptyUserSlot } from './src/protocol/presetCreation';
import { MAX_SETLISTS, parseSetlists, SetlistOperationError, validateSetlistName, type SetlistReference } from './src/protocol/setlists';
import { SetlistManagementSheet } from './src/components/SetlistManagementSheet';
import { readFocusValues, type FocusTarget } from './src/protocol/focusSession';
import { getFocusDefinition, type FocusChange } from './src/utils/focus';
import { CreatePresetSheet } from './src/components/CreatePresetSheet';
import { FocusView, focusKind } from './src/components/FocusView';
import { AccessibleText as Text, ScreenHeading } from './src/accessibility/AccessibleText';
import { Action as Pressable, AccessibilitySettings } from './src/accessibility/controls';
import { AccessibilityProvider, useAccessibilityPreferences, announce } from './src/accessibility/AccessibilityPreferences';
import { AccessibleParameter } from './src/accessibility/AccessibleParameter';
import { reorderPathBlocks, movedIndex, matchesMoveSource } from './src/utils/blockMove';
import { branchColumns, computeBranchSegments } from './src/utils/routingLayout';
import { MoveBlockSheet, type MoveDestination } from './src/components/MoveBlockSheet';
import { RoutingControls } from './src/components/RoutingControls';
import { isRoutingModel, isSplitModel, routingInsertReason, routingLinkChoices, routingName, ROUTING_DESCRIPTIONS, SPLIT_MODELS } from './src/utils/routing';
import { readBlockAt } from './src/protocol/blockCommands';
import { PresetEditGuard, blockActionMessage } from './src/protocol/presetEditGuard';
import { blockCopyDestinationReason, type BlockSettingsCopy } from './src/protocol/blockCopy';
import { CopyOperationError } from './src/protocol/copyOperation';
import { blockLimitReason } from './src/utils/blockLimits';
import { derivedIOReason, ioModelAllowed, hasIndependentIO } from './src/utils/ioRouting';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  Keyboard,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Platform,
  useWindowDimensions,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { HelixClient, type HelixEvent, type HelixPathClipboard } from './src/protocol/helixClient';
import { formatLibraryActivity, updateLibraryActivity, type LibraryActivity } from './src/protocol/stadium14';
import blockTypes from './src/data/blockTypes.json';
import ioModels from './src/data/ioModels.json';
import * as SplashScreen from 'expo-splash-screen';
import { BlockIcon } from './src/icons/BlockIcons';
import { BLOCK_IMAGES } from './src/icons/CategoryImages';
import { TabBar } from './src/components/TabBar';
import type { TabKey } from './src/components/TabBar';
import { ConnectionGate } from './src/components/ConnectionGate';
import { BrandMark } from './src/components/BrandMark';
import { settingsFeedback } from './src/utils/settingsFeedback';
import { UtilityIcon, type UtilityIconName } from './src/components/UtilityIcon';
import { SettingsGroup, SettingsRow, SettingsToggle } from './src/components/SettingsGroup';
import { BottomSheet } from './src/components/BottomSheet';
import { ParamKnob } from './src/components/ParamKnob';
import { ParamSlider } from './src/components/ParamSlider';
import { ParamHelpButton } from './src/components/ParamHelpButton';
import { DraggableEffectList } from './src/components/signalFlow/DraggableEffectList';
import { PathLanes } from './src/components/signalFlow/PathLanes';
import { SnapshotStrip } from './src/components/SnapshotStrip';
import samplePreset from './src/data/samplePreset.json';
import { createDemoClient } from './src/protocol/demoClient';
import { VirtualNamBlock } from './src/components/signalFlow/VirtualNamBlock';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getParamHelp } from './src/utils/paramHelp';
import { COLORS as THEME_COLORS, FONT, getBlockAppearance, getBlockColor } from './src/theme/colors';
import type { BlockData, BlockSlot, IOGrid, IOType, PathIndex, SignalFlowGrid } from './src/types/signalFlow';
import { buildConnectionFailureStatus } from './src/utils/connection';
import {
  getNetworkInterfacePreference,
  type ConnectionTransport,
} from './src/utils/connectionTransport';
import { formatTempoBpm, formatPresetPosition } from './src/utils/format';
import { coerceHelixBoolean, extractSnapshots, findFirstKey, findFlows } from './src/utils/helixState';
import { extractStompBanks, type PerformView, type StompBanks } from './src/utils/perform';
import { PerformControls } from './src/components/PerformControls';
import {
  MATRIX_LAYERS,
  MATRIX_MIXER_PROPERTY,
  applyMatrixMixerEvent,
  formatMatrixPan,
  formatMatrixVolume,
  parseMatrixMixerState,
  type MatrixMixerState,
} from './src/utils/matrixMixer';
import { groupModelsByChannel, type ModelSection } from './src/utils/modelSections';
import { detectVirtualNamRoute } from './src/utils/virtualNam';
import { STANDARD_DSP_CAP, EXTENDED_DSP_CAP, getDspLimit, getDspHeadroom, fitsDspBudget } from './src/utils/dspBudget';
import { AppInfo } from './src/components/AppInfo';
import { PresetSaveBar } from './src/components/PresetSaveBar';
import type { StadiumDevice } from './src/utils/stadiumDiscovery';

const COLORS = THEME_COLORS;

// Development only: open the editor on the bundled sample preset without a
// Stadium. Start Metro with EXPO_PUBLIC_DEMO_PRESET=1; EXPO_PUBLIC_DEMO_SELECT
// (for example "0-2") preselects row 1A, position 3.
const DEMO_PRESET = __DEV__ && process.env.EXPO_PUBLIC_DEMO_PRESET === '1';
const DEMO_SELECT = __DEV__ ? process.env.EXPO_PUBLIC_DEMO_SELECT ?? '' : '';

// Keep the native launch screen visible until the first frame is laid out.
void SplashScreen.preventAutoHideAsync().catch(() => {});

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
  description?: string | null;
  faux?: boolean;
  harness?: boolean;
  property_key?: string | null;
};

type BlockModel = {
  id: number;
  key: string;
  name: string;
  based_on?: string | null;
  category: string;
  usage?: number;
  auto_cab_usage?: number;
  params: EditorParam[];
};

type BlockModelGroup = {
  label: string;
  models: BlockModel[];
};

type BlockCatalog = Record<string, BlockModelGroup>;
type BlockTypeKey = keyof typeof blockTypes;

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
type SetlistAddSource = 'user' | 'factory';

const FACTORY_PRESETS_CID = -1;
const USER_PRESETS_CID = -2;
const SETLIST_DIRECTORY_CID = -5;
const SETLIST_ADD_SOURCES: Array<{ key: SetlistAddSource; label: string; containerId: number }> = [
  { key: 'user', label: 'User', containerId: USER_PRESETS_CID },
  { key: 'factory', label: 'Factory', containerId: FACTORY_PRESETS_CID },
];
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
const TUNER_REMOTE_NOTE = 'Note and needle show on the Helix display.';
// iOS drops a sheet presented while another is still dismissing, so menus wait this long before opening the next one.
const SHEET_HANDOFF_MS = 320;

const blockCatalog = blockTypes as BlockCatalog;
const isBlockTypeKey = (kind: string): kind is BlockTypeKey =>
  Object.prototype.hasOwnProperty.call(blockCatalog, kind);

type ControlStyle = 'sliders' | 'knobs';
const CONTROL_STYLE_KEY = 'helix.controlStyle';

export default function App() {
  const onReadyLayout = useCallback(() => {
    void SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }} onLayout={onReadyLayout}>
      <AccessibilityProvider><EditorApp /></AccessibilityProvider>
    </View>
  );
}

function EditorApp() {
  const { accessibleLayout, screenReader } = useAccessibilityPreferences();
  const linearControls = accessibleLayout || screenReader;
  const [libraryActivity, setLibraryActivity] = useState<LibraryActivity>({});
  const libraryActivityLabel = formatLibraryActivity(libraryActivity);

  const clientRef = useRef<HelixClient | null>(null);
  const syncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flowSyncInFlightRef = useRef(false);
  const scheduledSyncOptionsRef = useRef<{ full: boolean; silent: boolean }>({ full: true, silent: false });
  // Tracks param values edited locally within the last ~1.5s so a sync that
  // races the device acknowledgement does not snap UI back to the stale
  // device-side value. Keyed by `path|blockId|paramKey`.
  const recentParamEditsRef = useRef<Map<string, { value: number | boolean; ts: number }>>(new Map());
  // Suspend incoming flow syncs while the user is actively dragging a knob.
  const knobDraggingRef = useRef(false);
  const [editorScrollEnabled, setEditorScrollEnabled] = useState(true);
  const [host, setHost] = useState('');
  const [discoveredDevice, setDiscoveredDevice] = useState<StadiumDevice | null>(null);
  const [connectionTransport, setConnectionTransport] = useState<ConnectionTransport>('auto');
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  // Preview runs the full editor on the bundled sample preset with no Stadium.
  const [previewMode, setPreviewMode] = useState(false);
  const [extendedDspEnabled, setExtendedDspEnabled] = useState(false);
  const dspLimit = getDspLimit(extendedDspEnabled);
  const handleExtendedDsp = (enabled: boolean) => {
    if (!enabled) {
      setExtendedDspEnabled(false);
      return;
    }
    Alert.alert(
      'Allow extended DSP budget?',
      `Raise the app’s estimated budget from ${STANDARD_DSP_CAP} to ${EXTENDED_DSP_CAP} per path for this connection. This does not add processing power. Edits may be rejected, audio may drop out, or the device may become unstable. Back up your presets and use a spare preset. Turning this off will not remove blocks already added.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Enable for this connection', style: 'destructive', onPress: () => { if (clientRef.current) setExtendedDspEnabled(true); } },
      ]
    );
  };
  const [notesVisible, setNotesVisible] = useState(false);
  const [autoCab, setAutoCab] = useState(true);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(true);
  const [showRealBlockNames, setShowRealBlockNames] = useState(false);
  const [blockLabelMode, setBlockLabelMode] = useState(false);
  const [controlStyle, setControlStyleState] = useState<ControlStyle>('sliders');
  const windowDims = useWindowDimensions();
  // Tablets have room for slightly larger controls without scaling up the whole editor.
  const isTablet = Math.min(windowDims.width, windowDims.height) >= 600;
  const isLandscape = windowDims.width > windowDims.height;
  // Tablets keep the signal chain on screen and dock the block editor beneath it.
  const dockEditor = isTablet && !linearControls;
  // Wide tablets move navigation to a side rail to give the lanes more height.
  // Landscape phones have more width than height, so the tabs move to the side rail as well.
  const phoneLandscape = isLandscape && !isTablet;
  const useNavRail = (dockEditor && isLandscape) || (phoneLandscape && !linearControls);
  // Large text moves secondary chrome into menus; accessibility sizes stack rows instead of wrapping them.
  const largeText = windowDims.fontScale >= 1.2;
  const accessibilityText = windowDims.fontScale >= 1.5;
  // Lists in sheets that are not full height stay inside the visible screen.
  const sheetListMaxHeight = Math.max(200, Math.round(windowDims.height * 0.5));
  // At accessibility text sizes and on landscape phones, screen headers scroll with the content so the content keeps its room.
  const scrollChrome = accessibilityText || phoneLandscape;
  const [phonePath, setPhonePath] = useState<1 | 2>(1);
  const [phoneFlowView, setPhoneFlowView] = useState<'grid' | 'list'>('grid');
  // Per-parameter help sheet state. The sheet is shown when the user taps the
  // (?) glyph next to a parameter label.
  const [paramHelp, setParamHelp] = useState<{ title: string; subtitle?: string; body: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    AsyncStorage.getItem(CONTROL_STYLE_KEY)
      .then((raw) => {
        if (cancelled) return;
        if (raw === 'knobs' || raw === 'sliders') setControlStyleState(raw);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const setControlStyle = useCallback((next: ControlStyle) => {
    setControlStyleState(next);
    AsyncStorage.setItem(CONTROL_STYLE_KEY, next).catch(() => {});
  }, []);
  const [blockLabelDraft, setBlockLabelDraft] = useState('');
  const [blockLabelOverrides, setBlockLabelOverrides] = useState<Record<string, string>>({});
  const [notesText, setNotesText] = useState('');
  const [status, setStatus] = useState('Idle');
  const [selectedSlot, setSelectedSlot] = useState<BlockSlot | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerStep, setPickerStep] = useState<'type' | 'model'>('type');
  const [pickerType, setPickerType] = useState<null | BlockTypeKey>(null);
  const [pickerQuery, setPickerQuery] = useState('');
  const [targetSlot, setTargetSlot] = useState({ path: 0, block: 0 });
  const [slotMenuOpen, setSlotMenuOpen] = useState(false);
  const [slotMenuTarget, setSlotMenuTarget] = useState<BlockSlot | null>(null);
  const [blockEditorOpen, setBlockEditorOpen] = useState(false);
  const [blockBusy, setBlockBusy] = useState(false);
  const [moveSource, setMoveSource] = useState<(BlockSlot & { modelId: number; instanceId?: number }) | null>(null);
  const [blockCopy, setBlockCopy] = useState<{ presetId: number; copy: BlockSettingsCopy } | null>(null);
  const blockOperation = useRef(false);
  const presetEditGuard = useRef(new PresetEditGuard());
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
  const [ioModelListOpen, setIoModelListOpen] = useState(false);
  const [presetToolsOpen, setPresetToolsOpen] = useState(false);
  const [previewInfoOpen, setPreviewInfoOpen] = useState(false);
  const [pathMenuPath, setPathMenuPath] = useState<1 | 2 | null>(null);
  useEffect(() => { if (!ioPickerOpen) setIoModelListOpen(false); }, [ioPickerOpen]);
  const [activeTab, setActiveTab] = useState<TabKey>('flow');
  const [settingsSyncing, setSettingsSyncing] = useState(false);
  const [settingsPage, setSettingsPage] = useState<'tempo' | 'tuner' | 'accessibility' | 'advanced' | null>(null);
  const [screen, setScreen] = useState<'main' | 'editor' | 'performance' | 'tuner'>('main');
  const [tunerReturnScreen, setTunerReturnScreen] = useState<'main' | 'performance'>('main');
  const [libraryRoot, setLibraryRootState] = useState<PresetLibraryRoot>('setlists');
  const libraryRootRef = useRef<PresetLibraryRoot>('setlists');
  const setLibraryRoot = (root: PresetLibraryRoot) => { libraryRootRef.current = root; setLibraryRootState(root); };
  const [librarySection, setLibrarySection] = useState<'setlists' | 'showcase'>('setlists');
  const [showcaseBusy, setShowcaseBusy] = useState(false);
  const [setlists, setSetlists] = useState<HelixContentRef[]>([]);
  const [selectedContainerId, setSelectedContainerIdState] = useState<number | null>(null);
  const selectedContainerRef = useRef<number | null>(null);
  const setSelectedContainerId = (id: number | null) => { selectedContainerRef.current = id; setSelectedContainerIdState(id); };
  const [selectedContainerName, setSelectedContainerName] = useState('Setlists');
  const [targetSetlistId, setTargetSetlistId] = useState<number | null>(null);
  const [presetItems, setPresetItems] = useState<HelixContentRef[]>([]);
  const [activePresetContentId, setActivePresetContentId] = useState<number | null>(null);
  const [activePresetRef, setActivePresetRef] = useState<HelixContentRef | null>(null);
  const [snapshotCount, setSnapshotCount] = useState(0);
  const [activeSnapshotIndex, setActiveSnapshotIndex] = useState<number | null>(null);
  const [snapshots, setSnapshots] = useState<SnapshotRef[]>([]);
  const [performView, setPerformView] = useState<PerformView>('snapshots');
  const [stompBanks, setStompBanks] = useState<StompBanks | null>(null);
  const [_activeSnapshotTargets, setActiveSnapshotTargets] = useState<number[] | null>(null);
  const [libraryLoading, setLibraryLoadingState] = useState(false);
  const libraryLoadingRef = useRef(false);
  const setLibraryLoading = (loading: boolean) => { libraryLoadingRef.current = loading; setLibraryLoadingState(loading); };
  const [presetEdited, setPresetEdited] = useState<boolean | null>(null);
  const [presetSaved, setPresetSaved] = useState(false);
  const [presetSaving, setPresetSaving] = useState(false);
  const [createPosition, setCreatePosition] = useState<number | null>(null);
  const [createSlots, setCreateSlots] = useState<HelixContentRef[]>([]);
  const [presetCreating, setPresetCreating] = useState(false);
  const [createError, setCreateError] = useState('');
  const [duplicateSource, setDuplicateSource] = useState<HelixContentRef | null>(null);
  const creationRequest = useRef(0);
  const creationPending = useRef(false);
  const [focusOpen, setFocusOpen] = useState(false);
  const [focusExpanded, setFocusExpanded] = useState(false);
  const [snapshotAssignmentTarget, setSnapshotAssignmentTarget] = useState<(FocusTarget & { name: string; params: EditorParam[] }) | null>(null);
  const [focusBusy, setFocusBusy] = useState(false);
  const focusWrites = useRef(0);
  const presetSaveOperation = useRef<symbol | null>(null);
  const presetSaveRevision = useRef(0);
  const [presetRenameText, setPresetRenameText] = useState('');
  const [setlistRenameText, setSetlistRenameText] = useState('');
  const [snapshotRenameText, setSnapshotRenameText] = useState('');
  const [presetFilter, setPresetFilter] = useState('');
  const [snapshotCopySource, setSnapshotCopySource] = useState<number | null>(null);
  const [snapshotCopyTarget, setSnapshotCopyTarget] = useState<number | null>(null);
  const [pathClipboard, setPathClipboard] = useState<(HelixPathClipboard & { presetId: number }) | null>(null);
  const [setlistPickerOpen, setSetlistPickerOpen] = useState(false);
  const [setlistFilter, setSetlistFilter] = useState('');
  const [setlistAddSheetOpen, setSetlistAddSheetOpen] = useState(false);
  const [setlistAddSource, setSetlistAddSource] = useState<SetlistAddSource>('user');
  const [setlistAddItems, setSetlistAddItems] = useState<HelixContentRef[]>([]);
  const [setlistAddSearch, setSetlistAddSearch] = useState('');
  const [setlistAddLoading, setSetlistAddLoading] = useState(false);
  const [setlistAddError, setSetlistAddError] = useState('');
  const setlistSourceRequest = useRef(0);
  const [selectedSetlistAddIds, setSelectedSetlistAddIds] = useState<number[]>([]);
  const [presetActionTarget, setPresetActionTarget] = useState<HelixContentRef | null>(null);
  const libraryRequest = useRef(0);
  const libraryMutation = useRef(false);
  const [libraryBusy, setLibraryBusy] = useState(false);
  const [libraryRefreshing, setLibraryRefreshing] = useState(false);
  const [presetPanel, setPresetPanel] = useState<'browse' | 'snapshots' | 'notes'>('browse');
  const [setlistOptionsOpen, setSetlistOptionsOpen] = useState(false);
  const [setlistDraft, setSetlistDraft] = useState<{ sourceId?: number; sourceName?: string } | null>(null);
  const [setlistNotice, setSetlistNotice] = useState<{ message: string; error: boolean } | null>(null);
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
  const [matrixMixerState, setMatrixMixerState] = useState<MatrixMixerState | null>(null);
  const [selectedMatrixLayerId, setSelectedMatrixLayerId] = useState<number>(1);

  const modelLookup = useMemo(() => {
    const map = new Map<number, { id: number; key: string; category: string; name: string; realName: string | null; kind: string; usage: number; params: EditorParam[] }>();
    Object.entries(blockCatalog).forEach(([key, group]) => {
      group.models.forEach((item) => {
        map.set(item.id, {
          id: item.id, key: item.key, category: item.category,
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

  const virtualNamRoute = useMemo(
    () => detectVirtualNamRoute(grid, ioGrid),
    [grid, ioGrid]
  );

  const hasSplit1 = useMemo(() => {
    const hasBlocks = grid[1]?.some((b) => b !== null) ?? false;
    const hasIO = hasIndependentIO(ioGrid[1]);
    return hasBlocks || hasIO || grid[0].some(block => block && isRoutingModel(block.id));
  }, [grid, ioGrid]);
  const hasSplit2 = useMemo(() => {
    const hasBlocks = grid[3]?.some((b) => b !== null) ?? false;
    const hasIO = hasIndependentIO(ioGrid[3]);
    return hasBlocks || hasIO || grid[2].some(block => block && isRoutingModel(block.id));
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
  const paramStateKey = (param: EditorParam) => {
    const key = param.id !== null ? String(param.id) : param.property_key ?? param.key;
    return param.harness && param.id !== null ? `h:${param.id}` : key;
  };
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
      const key = paramStateKey(param);
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
  const blockTypeOrder: BlockTypeKey[] = [
    'routing',
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
    const current = grid[targetSlot.path]?.[targetSlot.block];
    const items = blockCatalog[pickerType].models.filter(model => !current || !isRoutingModel(current.id) || (isRoutingModel(model.id) && isSplitModel(model.id) === isSplitModel(current.id)));
    if (pickerType === 'routing') {
      const order: readonly number[] = [...SPLIT_MODELS, 478];
      items.sort((left, right) => order.indexOf(left.id) - order.indexOf(right.id));
    }
    if (!pickerQuery.trim()) return items;
    const q = pickerQuery.trim().toLowerCase();
    return items.filter((item) =>
      item.name.toLowerCase().includes(q) || (item.based_on ?? '').toLowerCase().includes(q)
    );
  }, [pickerType, pickerQuery, grid, targetSlot]);
  const pickerModelSections = useMemo<ModelSection<BlockModel>[]>(
    () => groupModelsByChannel(pickerModels),
    [pickerModels]
  );
  const ioPickerModels = useMemo(() => {
    const items = (ioPickerType === 'input' ? ioData.inputs.models : ioData.outputs.models).filter(model => ioModelAllowed(ioPickerRow, ioPickerType, model.id));
    if (!ioPickerQuery.trim()) return items;
    const q = ioPickerQuery.trim().toLowerCase();
    return items.filter((item) => item.name.toLowerCase().includes(q));
  }, [ioPickerQuery, ioPickerType, ioPickerRow, ioData]);
  const activeIOModel = ioGrid[ioPickerRow]?.[ioPickerType] ?? null;
  const activeIOModelMeta = activeIOModel?.modelId
    ? ioModelLookup.get(activeIOModel.modelId) ?? null
    : null;
  const activeBlock = blockEditorSlot
    ? grid[blockEditorSlot.path]?.[blockEditorSlot.block] ?? null
    : null;
  const activeBlockMeta = activeBlock?.id ? modelLookup.get(activeBlock.id) ?? null : null;
  useEffect(() => {
    if (moveSource && !matchesMoveSource(grid[moveSource.path]?.[moveSource.block], moveSource)) {
      setMoveSource(null);
      setStatus('The block changed. Choose it again before moving.');
    }
  }, [grid, moveSource]);
  const activePresetName = activePresetRef?.name ?? 'None';
  const activePresetStorageId = presetStorageId(activePresetContentId, activePresetRef);
  const isUsefulRealName = (realName?: string | null) =>
    Boolean(realName && realName.trim() && realName.trim().toLowerCase() !== 'line 6 original');
  const getBlockLabelOverrideKey = (path: number, blockId: number | undefined, modelId: number, instanceId?: number) =>
    `${activePresetStorageId ?? 'live'}:${instanceId !== undefined ? `instance-${instanceId}` : `${path}:${blockId ?? 'slot'}`}:${modelId}`;
  const getBlockDisplayName = (block: BlockData | null) => {
    if (!block) return '';
    const customName = block.customName?.trim();
    if (blockLabelMode && customName) return customName;
    if (isRoutingModel(block.id)) return routingName(block.id);
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
  const targetBlock = grid[targetSlot.path]?.[targetSlot.block] ?? null;
  const availableUsage = useMemo(() => {
    return getDspHeadroom(
      targetSlot.path < 2 ? pathUsage.path1 : pathUsage.path2,
      targetBlock?.usage ?? 0,
      extendedDspEnabled
    );
  }, [extendedDspEnabled, pathUsage, targetBlock?.usage, targetSlot.path]);
  const shouldBudgetAutoCab = useCallback(
    (model: Pick<BlockModel, 'category' | 'auto_cab_usage'>) => {
      if (!autoCab || model.category !== 'amp' || !model.auto_cab_usage || targetBlock) {
        return false;
      }
      const row = grid[targetSlot.path] ?? [];
      return targetSlot.block < row.length - 1 && !row[targetSlot.block + 1];
    },
    [autoCab, grid, targetBlock, targetSlot.block, targetSlot.path]
  );
  const getProjectedInsertUsage = useCallback(
    (model: Pick<BlockModel, 'usage' | 'category' | 'auto_cab_usage'>) =>
      (model.usage ?? 0) + (shouldBudgetAutoCab(model) ? model.auto_cab_usage ?? 0 : 0),
    [shouldBudgetAutoCab]
  );
  const activeSetlist = useMemo(
    () => setlists.find((item) => item.cid_ === selectedContainerId) ?? null,
    [selectedContainerId, setlists]
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
      return name.toLowerCase().includes(query) || slot.includes(query) || formatPresetPosition(item.posi).toLowerCase().includes(query);
    });
  }, [presetFilter, presetItems]);
  const filteredSetlistAddItems = useMemo(() => {
    const query = setlistAddSearch.trim().toLowerCase();
    if (!query) return setlistAddItems;
    return setlistAddItems.filter((item) => {
      const name = item.name ?? '';
      const slot = typeof item.posi === 'number' ? String(item.posi + 1) : '';
      return name.toLowerCase().includes(query) || slot.includes(query) || formatPresetPosition(item.posi).toLowerCase().includes(query);
    });
  }, [setlistAddItems, setlistAddSearch]);
  const visibleSetlistAddIds = useMemo(
    () =>
      filteredSetlistAddItems
        .map((item) => item.cid_)
        .filter((contentId): contentId is number => typeof contentId === 'number'),
    [filteredSetlistAddItems]
  );
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
    const end = Math.min(presetItems.length, start + windowSize);
    start = Math.max(0, end - windowSize);
    return presetItems.slice(start, end);
  }, [activePresetIndexInList, presetItems]);
  const selectedMatrixLayer = useMemo(() => {
    if (!matrixMixerState) return null;
    return (
      matrixMixerState.layers.find((layer) => layer.id === selectedMatrixLayerId) ??
      matrixMixerState.layers.find((layer) => layer.id === matrixMixerState.attachedLayer) ??
      matrixMixerState.layers[0] ??
      null
    );
  }, [matrixMixerState, selectedMatrixLayerId]);
  const attachedMatrixLayerLabel = useMemo(() => {
    const attachedId = matrixMixerState?.attachedLayer ?? null;
    if (attachedId === null) return 'Unknown';
    return (
      matrixMixerState?.layers.find((layer) => layer.id === attachedId)?.label ??
      MATRIX_LAYERS.find((layer) => layer.id === attachedId)?.label ??
      `Output ${attachedId}`
    );
  }, [matrixMixerState]);
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
    if (event.libraryOperation) {
      const operation = event.libraryOperation;
      setLibraryActivity((active) => updateLibraryActivity(active, operation));
      return;
    }
    const addr = event.addr.toLowerCase();
    const property = event.property;
    const key = property?.key;
    if (!key) {
      if (
        addr === '/syncmixattachedout' ||
        addr === '/syncmixchannelvolume' ||
        addr === '/syncmixchannelpan' ||
        addr === '/syncmixchannelmute' ||
        addr === '/syncmixchannelsolo'
      ) {
        const layer = coerceNumber(event.vals[2]);
        if (addr === '/syncmixattachedout' && layer !== null) {
          setSelectedMatrixLayerId(Math.trunc(layer));
        }
        setMatrixMixerState((prev) => applyMatrixMixerEvent(prev, event.addr, event.vals));
        return;
      }
      if (
        addr === '/setmodelwithmid' ||
        addr === '/setparamvalue' ||
        addr === '/setblockenable' ||
        addr === '/clrb' ||
        addr === '/clrblock' ||
        addr === '/setsnapshotname' ||
        addr === '/activatesnapshot'
      ) {
        scheduleSync(700, { full: false, silent: true });
      }
      return;
    }

    if (key === MATRIX_MIXER_PROPERTY) {
      const next = parseMatrixMixerState(property);
      if (next) {
        setMatrixMixerState(next);
        if (typeof next.attachedLayer === 'number') {
          setSelectedMatrixLayerId(next.attachedLayer);
        }
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
      presetEditGuard.current.invalidate();
      setBlockEditorOpen(false);
      setBlockEditorSlot(null);
      setPickerOpen(false);
      setSlotMenuOpen(false);
      setMoveSource(null);
      setBlockCopy(null);
      setPathClipboard(null);
      setIoPickerOpen(false);
      setScreen(current => current === 'editor' ? 'main' : current);
      recentParamEditsRef.current.clear();
      const value = coerceNumber(property?.value);
      if (value !== null) {
        setActivePresetContentId(value);
      }
      setStompBanks(null);
      setSnapshots([]);
      setSnapshotCount(0);
      setActiveSnapshotIndex(null);
      scheduleSync(900, { full: true, silent: true });
      return;
    }
    if (key === 'volatile.preset.edited') {
      const edited = coerceBool(property?.value);
      if (!presetSaveOperation.current || edited === true) setPresetEdited(edited);
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
    if (key.startsWith('preset.floorboard.stomp.')) {
      scheduleSync(350, { full: true, silent: true });
      return;
    }
    if (addr === '/setpropertyvalue' && key.startsWith('preset.')) {
      scheduleSync(900, { full: true, silent: true });
    }
  };

  const connect = async () => {
    if (connecting || connected) return;
    if (!host.trim() && !(Platform.OS === 'android' && connectionTransport === 'usb')) {
      setStatus('Connection failed: Enter your device name or IP address.');
      return;
    }
    setExtendedDspEnabled(false);
    setConnecting(true);
    try {
      const networkInterface = getNetworkInterfacePreference(connectionTransport, Platform.OS);
      const port = networkInterface !== 'usb' && discoveredDevice?.host === host.trim() ? discoveredDevice.port : 2001;
      const client = new HelixClient(host.trim(), port, port + 1, networkInterface);
      await client.connect();
      client.startListener(handleClientEvent, () => {
        if (clientRef.current !== client) return;
        disconnect();
        setStatus('Connection failed: Connection lost. Check the USB cable or Wi-Fi and reconnect.');
      });
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
    libraryRequest.current += 1;
    libraryMutation.current = false;
    setLibraryBusy(false);
    setSetlistOptionsOpen(false);
    setSetlistDraft(null);
    setSetlistNotice(null);
    setLibraryLoading(false);
    setLibraryRefreshing(false);
    setSettingsPage(null);
    setSettingsSyncing(false);
    presetEditGuard.current.invalidate();
    setMoveSource(null);
    if (previewMode) {
      setPreviewMode(false);
      setAutoSyncEnabled(true);
    }
    setLibraryActivity({});
    if (syncTimerRef.current) {
      clearTimeout(syncTimerRef.current);
      syncTimerRef.current = null;
    }
    clientRef.current?.close();
    clientRef.current = null;
    flowSyncInFlightRef.current = false;
    setConnected(false);
    setExtendedDspEnabled(false);
    setStatus('Idle');
    setGrid(Array.from({ length: 4 }, () => Array.from({ length: 12 }, () => null)));
    setIoGrid(Array.from({ length: 4 }, () => ({ input: null, output: null })));
    setPickerOpen(false);
    setBlockEditorOpen(false);
    setBlockEditorSlot(null);
    setSelectedSlot(null);
    setBlockCopy(null);
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
    setStompBanks(null);
    setPerformView('snapshots');
    setActiveSnapshotTargets(null);
    setLibraryLoading(false);
    presetSaveRevision.current++;
    presetSaveOperation.current = null;
    setPresetSaving(false);
    setCreatePosition(null);
    setDuplicateSource(null);
    creationRequest.current++;
    setSnapshotAssignmentTarget(null);
    setCreateError('');
    setFocusOpen(false); setFocusExpanded(false);
    setPresetEdited(null);
    setPresetRenameText('');
    setSetlistRenameText('');
    setSnapshotRenameText('');
    setPresetFilter('');
    setSnapshotCopySource(null);
    setSnapshotCopyTarget(null);
    setPathClipboard(null);
    setSetlistPickerOpen(false);
    setSetlistFilter('');
    setSetlistAddSheetOpen(false);
    setlistSourceRequest.current += 1;
    setSetlistAddSource('user');
    setSetlistAddItems([]);
    setSetlistAddSearch('');
    setSetlistAddLoading(false);
    setSetlistAddError('');
    setSelectedSetlistAddIds([]);
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
    setMatrixMixerState(null);
    setSelectedMatrixLayerId(1);
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
    if (blockOperation.current) { setStatus('Finishing the last change…'); return null; }
    if (!clientRef.current) {
      setStatus('Not connected');
      return null;
    }
    return clientRef.current;
  };

  const editLocked = () => {
    if (blockOperation.current || focusWrites.current > 0 || creationPending.current || presetSaveOperation.current) {
      setStatus('Finishing the last change…');
      return true;
    }
    if (!previewMode && !presetEditGuard.current.ready(activePresetContentId)) {
      setStatus('Syncing the current preset. Wait before editing.');
      if (!syncTimerRef.current) scheduleSync(900, { silent: true });
      return true;
    }
    return false;
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
        matrixMixer,
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
        client.getMatrixMixerState().catch(() => null),
        ...TUNER_STRING_CONFIG.map(({ stringNumber }) =>
          client.getProperty(`global.tuner.offset.string.${stringNumber}`).catch(() => null)
        ),
      ]);

      if (clientRef.current !== client) return;
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
      setMatrixMixerState(matrixMixer);
      if (typeof matrixMixer?.attachedLayer === 'number') {
        setSelectedMatrixLayerId(matrixMixer.attachedLayer);
      }
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

  const refreshMatrixMixerContext = async (clientArg?: HelixClient | null) => {
    const client = clientArg ?? requireClient();
    if (!client) return;
    try {
      const next = await client.getMatrixMixerState();
      setMatrixMixerState(next);
      if (typeof next?.attachedLayer === 'number') {
        setSelectedMatrixLayerId(next.attachedLayer);
      }
    } catch (_err) {
      // Keep the last known Matrix Mixer state if a single refresh fails.
    }
  };

  const loadPresetContainer = async (containerId: number, label: string, request = libraryRequest.current) => {
    const client = requireClient();
    if (!client) return;
    const items = await client.getContainerContents(containerId, undefined, true);
    if (clientRef.current !== client || request !== libraryRequest.current) return;
    setSelectedContainerId(containerId);
    setSelectedContainerName(label);
    setPresetItems(containerId > 0 ? populatedSlots(items as HelixContentRef[]) : items as HelixContentRef[]);
  };

  const refreshPresetContext = async (allowMutation = false) => {
    const client = requireClient();
    if (!client) return;
    const saveRevision = presetSaveRevision.current;
    const request = libraryRequest.current;
    try {
      const [activeId, snapshotTotal, snapshotIndex, setlistItems, edited, snapshotItems] = await Promise.all([
        client.getActivePresetContentId(),
        client.getSnapshotCount(),
        client.getActiveSnapshotIndex(),
        client.getContainerContents(SETLIST_DIRECTORY_CID),
        client.hasUnsavedPresetChanges(),
        client.getSnapshots().catch(() => []),
      ]);
      const nextSetlists = (setlistItems as HelixContentRef[]) ?? [];
      const nextSnapshots = (snapshotItems as SnapshotRef[]) ?? [];
      const activeRef = activeId !== null ? ((await client.getContentRef(activeId)) as HelixContentRef | null) : null;
      if (clientRef.current !== client) return;
      if (request === libraryRequest.current && (!libraryMutation.current || allowMutation)) {
        setSetlists(nextSetlists);
        setTargetSetlistId((prev) => {
          if (prev !== null && nextSetlists.some((item) => item.cid_ === prev)) return prev;
          if (typeof activeRef?.ccid === 'number' && nextSetlists.some((item) => item.cid_ === activeRef.ccid)) {
            return activeRef.ccid;
          }
          const firstSetlist = nextSetlists.find((item) => typeof item.cid_ === 'number');
          return typeof firstSetlist?.cid_ === 'number' ? firstSetlist.cid_ : null;
        });
      }
      setActivePresetContentId(activeId);
      setActivePresetRef(activeRef);
      setSnapshotCount(snapshotTotal ?? nextSnapshots.length);
      setActiveSnapshotIndex(snapshotIndex);
      setSnapshots(nextSnapshots);
      if (clientRef.current !== client) return;
      if (!presetSaveOperation.current && saveRevision === presetSaveRevision.current) setPresetEdited(edited);
      await refreshTransportContext(client);
      if (clientRef.current !== client || request !== libraryRequest.current || libraryLoadingRef.current || (libraryMutation.current && !allowMutation)) return;

      if (libraryRootRef.current === 'factory') {
        await loadPresetContainer(FACTORY_PRESETS_CID, 'Factory Presets', request);
        return;
      }
      if (libraryRootRef.current === 'user') {
        await loadPresetContainer(USER_PRESETS_CID, 'User Presets', request);
        return;
      }

      const defaultSetlist =
        nextSetlists.find((item) => item.cid_ === selectedContainerRef.current) ??
        nextSetlists.find((item) => item.cid_ === activeRef?.ccid) ??
        nextSetlists[0] ??
        null;

      if (defaultSetlist && typeof defaultSetlist.cid_ === 'number') {
        await loadPresetContainer(defaultSetlist.cid_, defaultSetlist.name ?? 'Setlist', request);
      } else {
        setSelectedContainerId(null);
        setSelectedContainerName('Setlists');
        setPresetItems([]);
      }
    } catch (error) {
      if (clientRef.current === client && request === libraryRequest.current) setStatus(`Library refresh failed: ${error instanceof Error ? error.message : 'Check the connection'}`);
    }
  };

  const handleLibraryRootChange = async (nextRoot: PresetLibraryRoot) => {
    if (libraryMutation.current) return;
    const request = ++libraryRequest.current;
    setLibraryRoot(nextRoot);
    setSelectedContainerId(null);
    setPresetItems([]);
    setPresetFilter('');
    const client = requireClient();
    if (!client) return;
    setLibraryLoading(true);
    try {
      if (nextRoot === 'factory') {
        await loadPresetContainer(FACTORY_PRESETS_CID, 'Factory Presets', request);
        return;
      }
      if (nextRoot === 'user') {
        await loadPresetContainer(USER_PRESETS_CID, 'User Presets', request);
        return;
      }
      const nextSetlists = setlists.length ? setlists : ((await client.getContainerContents(SETLIST_DIRECTORY_CID)) as HelixContentRef[]);
      if (clientRef.current !== client || request !== libraryRequest.current) return;
      setSetlists(nextSetlists);
      const targetSetlist =
        nextSetlists.find((item) => item.cid_ === targetSetlistId) ??
        nextSetlists.find((item) => item.cid_ === activePresetRef?.ccid) ??
        nextSetlists.find((item) => item.cid_ === selectedContainerId) ??
        nextSetlists[0] ??
        null;
      if (targetSetlist && typeof targetSetlist.cid_ === 'number') {
        await loadPresetContainer(targetSetlist.cid_, targetSetlist.name ?? 'Setlist', request);
      } else {
        setSelectedContainerId(null);
        setSelectedContainerName('Setlists');
        setPresetItems([]);
      }
    } catch {
      if (request === libraryRequest.current) setStatus('Library refresh failed. Check the connection and try again.');
    } finally {
      if (request === libraryRequest.current) setLibraryLoading(false);
    }
  };

  const handleSetlistSelect = async (item: HelixContentRef) => {
    if (libraryMutation.current || typeof item.cid_ !== 'number' || !setlists.some(setlist => setlist.cid_ === item.cid_)) return;
    setSetlistNotice(null);
    const request = ++libraryRequest.current;
    setPresetItems([]);
    setSelectedContainerId(null);
    setPresetFilter('');
    setTargetSetlistId(item.cid_);
    setLibraryLoading(true);
    try {
      await loadPresetContainer(item.cid_, item.name ?? 'Setlist', request);
    } catch {
      if (request === libraryRequest.current) setStatus('Library refresh failed. Check the connection and try again.');
    } finally {
      if (request === libraryRequest.current) setLibraryLoading(false);
    }
  };

  const handleTabChange = (nextTab: TabKey) => {
    if (showcaseBusy || libraryMutation.current) return;
    if (nextTab !== activeTab) setPresetFilter('');
    setActiveTab(nextTab);
    if (nextTab === 'setlists' && libraryRoot !== 'setlists') {
      void handleLibraryRootChange('setlists');
    }
    if (nextTab === 'preset' && libraryRoot === 'setlists') {
      void handleLibraryRootChange('user');
    }
    if (nextTab === 'matrix') {
      void refreshMatrixMixerContext();
    }
  };

  const handlePresetLoad = async (item: HelixContentRef) => {
    if (libraryMutation.current || libraryLoadingRef.current || (libraryRoot === 'setlists' && !activeSetlist)) return;
    Keyboard.dismiss();
    if (creationPending.current) { setStatus('Wait for the new preset to finish creating.'); return; }
    if (presetSaveOperation.current) { setStatus('Wait for the current preset to finish saving.'); return; }
    const client = requireClient();
    if (!client) return;
    if (isPresetActive(item)) {
      setStatus(`Already on ${item.name ?? 'this preset'}`);
      return;
    }
    if (libraryRoot === 'setlists' && activeSetlist && typeof selectedContainerId === 'number' && typeof item.posi === 'number') {
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

  const openPresetCreation = async (position?: number, source: HelixContentRef | null = null) => {
    if (creationPending.current || presetSaveOperation.current) return;
    const client = requireClient();
    if (!client) return;
    const request = ++creationRequest.current;
    try {
      const slots = await client.getContainerContents(USER_PRESETS_CID) as HelixContentRef[] | null;
      if (clientRef.current !== client || creationPending.current || request !== creationRequest.current) return;
      if (!Array.isArray(slots)) throw new Error('Could not read User Presets. Sync the device and try again.');
      const empty = slots.filter(isEmptyUserSlot);
      const target = position === undefined ? empty[0] : empty.find(item => item.posi === position);
      if (!target) throw new Error(position === undefined ? 'There are no empty User Preset slots.' : 'That slot is no longer empty. Choose another slot.');
      setDuplicateSource(source); setCreateSlots(slots); setCreateError(''); setCreatePosition(target.posi!);
    } catch (error) { if (request === creationRequest.current && clientRef.current === client) Alert.alert(source ? 'Cannot duplicate preset' : 'Cannot create preset', (error as Error).message); }
  };

  const handleCreatePreset = async (name: string) => {
    const client = requireClient();
    if (!client || createPosition === null || creationPending.current || presetSaveOperation.current) return;
    const position = createPosition;
    creationPending.current = true; setPresetCreating(true); setCreateError('');
    setStatus(`${duplicateSource ? 'Duplicating' : 'Creating'} ${name} in ${formatPresetPosition(position)}…`);
    try {
      if (duplicateSource && typeof duplicateSource.cid_ !== 'number') throw new Error('The source preset is unavailable. Close this sheet and refresh the library.');
      const result = duplicateSource
        ? await client.duplicatePresetToEmptySlot(duplicateSource.cid_!, position, name)
        : await client.createPresetInEmptySlot(position, name);
      if (clientRef.current !== client) return;
      setCreatePosition(null); setPresetActionTarget(null); setDuplicateSource(null); setLibraryRoot('user');
      await loadPresetContainer(USER_PRESETS_CID, 'User Presets');
      setStatus(`${duplicateSource ? 'Duplicated' : 'Created'} ${name} in ${formatPresetPosition(position)}${result.loaded ? '' : '. Select the slot when you are ready to open it.'}`);
      scheduleSync(150, { full: true });
    } catch (error) {
      if (clientRef.current !== client) return;
      const message = error instanceof Error ? error.message : 'Preset creation was not confirmed. Sync the device and inspect the slot.';
      setCreateError(message); setStatus(`${duplicateSource ? 'Preset duplication' : 'Preset creation'} not confirmed: ${message}`);
      const slots = await client.getContainerContents(USER_PRESETS_CID).catch(() => null);
      if (clientRef.current === client && Array.isArray(slots)) { setCreateSlots(slots); if (selectedContainerId === USER_PRESETS_CID) setPresetItems(slots); }
    } finally { creationPending.current = false; setPresetCreating(false); }
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

  const applyTempoAction = async (action: 'tap' | number) => {
    const client = requireClient();
    if (!client) return;
    try {
      const bpm = await (action === 'tap' ? client.tempo.tap(performance.now()) : client.tempo.adjust(action));
      if (clientRef.current !== client || bpm === null) return;
      setStatus(`Tempo · ${formatTempoBpm(bpm)} BPM`);
      // This value has been acknowledged and read back from the device.
      setLiveTempoBpm(bpm);
      scheduleSync(700);
    } catch (error) {
      if (clientRef.current !== client) return;
      setStatus(formatActionError(action === 'tap' ? 'Tap tempo' : 'Tempo update', error));
    }
  };

  const handleTempoAdjust = (delta: number) => { void applyTempoAction(delta); };

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

  const handleTapTempo = () => { void applyTempoAction('tap'); };

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

  const handleSavePreset = async () => {
    if (previewMode) { setStatus('Preview edits are not saved.'); return; }
    if (creationPending.current) { setStatus('Wait for the new preset to finish creating.'); return; }
    const client = requireClient();
    if (!client || presetSaveOperation.current) return;
    if (activePresetStorageId === null) {
      const message = 'This preset does not have a saved location yet. Save it to a User Preset location on the Stadium first, then sync the app.';
      setStatus(message);
      Alert.alert('Choose a preset location', message);
      return;
    }
    const operation = Symbol('save preset');
    presetSaveRevision.current++;
    presetSaveOperation.current = operation;
    setPresetSaved(false);
    setPresetSaving(true);
    setStatus(`Saving ${activePresetName}...`);
    try {
      await client.savePresetWithCid(activePresetStorageId);
      if (clientRef.current !== client) return;
      setPresetEdited(false);
      setPresetSaved(true);
      setStatus(`Saved ${activePresetName} to the Stadium`);
      scheduleSync(350, { full: true, silent: true });
    } catch (error) {
      if (clientRef.current !== client) return;
      const message = error instanceof Error ? error.message : 'The Stadium has not confirmed the save.';
      setStatus(`Save not confirmed: ${message}`);
      Alert.alert('Save not confirmed', message);
      // Keep the device's existing dirty state. A timeout is not evidence of success.
      scheduleSync(350, { full: true, silent: true });
    } finally {
      if (presetSaveOperation.current === operation) {
        presetSaveRevision.current++;
        presetSaveOperation.current = null;
        setPresetSaving(false);
      }
    }
  };

  useEffect(() => {
    setPresetSaved(false);
  }, [activePresetStorageId, connected]);

  useEffect(() => {
    if (presetEdited) setPresetSaved(false);
  }, [presetEdited]);

  useEffect(() => {
    if (!presetSaved) return;
    const timer = setTimeout(() => setPresetSaved(false), 4000);
    return () => clearTimeout(timer);
  }, [presetSaved]);

  const renderPresetSaveBar = (placement?: 'inline' | 'bottom') => (
    <PresetSaveBar placement={placement} name={activePresetName} edited={presetEdited} saving={presetSaving} saved={presetSaved} preview={previewMode}
      disabled={previewMode || !connected || !activePresetRef || presetCreating || focusBusy || showcaseBusy}
      onSave={() => { void handleSavePreset(); }} />
  );

  const handleRenameContent = async (contentId: number, name: string, label: string) => {
    const client = requireClient();
    if (!client || libraryMutation.current) return;
    setSetlistNotice(null);
    const trimmed = name.trim();
    if (!trimmed) {
      setStatus(`A ${label.toLowerCase()} name is required`);
      return;
    }
    libraryMutation.current = true; setLibraryBusy(true);
    try {
      await client.renameContent(contentId, trimmed);
      if (clientRef.current !== client) return;
      setStatus(`Renamed ${label.toLowerCase()} to ${trimmed}`);
      await refreshPresetContext(true);
    } catch (err) {
      if (clientRef.current !== client) return;
      const message = err instanceof Error ? err.message : String(err);
      setStatus(`Rename failed: ${message}`);
    } finally { if (clientRef.current === client) { libraryMutation.current = false; setLibraryBusy(false); } }
  };

  const reloadSetlistLibrary = async (client: HelixClient, preferredId: number | null, request: number) => {
    const directory = parseSetlists(await client.getContainerContents(SETLIST_DIRECTORY_CID, undefined, true));
    const selected = directory.find(item => item.cid_ === preferredId) ?? directory[0] ?? null;
    const entries = selected ? await client.getContainerContents(selected.cid_, undefined, true) as HelixContentRef[] : [];
    if (clientRef.current !== client || request !== libraryRequest.current) return;
    setSetlists(directory);
    setLibraryRoot('setlists');
    setSelectedContainerId(selected?.cid_ ?? null);
    setSelectedContainerName(selected?.name ?? 'Setlists');
    setTargetSetlistId(selected?.cid_ ?? null);
    setPresetItems(populatedSlots(entries));
    setPresetFilter('');
  };

  const changeSetlist = async (operation: (client: HelixClient) => Promise<SetlistReference | void>, message: string) => {
    const client = requireClient();
    if (!client || libraryMutation.current || libraryLoadingRef.current) return false;
    if (previewMode) { setSetlistNotice({ message: 'Connect to your Stadium to manage setlists.', error: true }); return false; }
    const request = ++libraryRequest.current;
    libraryMutation.current = true;
    setLibraryBusy(true);
    setSetlistNotice(null);
    let completed = false;
    try {
      const result = await operation(client);
      completed = true;
      if (clientRef.current !== client || request !== libraryRequest.current) return false;
      await reloadSetlistLibrary(client, result?.cid_ ?? selectedContainerId, request);
      if (clientRef.current !== client || request !== libraryRequest.current) return false;
      setSetlistNotice({ message, error: false });
      return true;
    } catch (error) {
      if (clientRef.current !== client || request !== libraryRequest.current) return false;
      const detail = error instanceof Error ? error.message : 'Check the connection and refresh before trying again.';
      setSetlistNotice({ message: completed ? `${message} Pull down to refresh the library.` : detail, error: !completed });
      if (!completed) {
        if (error instanceof SetlistOperationError) {
          // Return to the refreshed library instead of leaving an ambiguous write ready to repeat.
          setSetlistDraft(null);
          setSetlistOptionsOpen(false);
        }
        // A timed-out creation may have succeeded. Refresh once, without retrying the write.
        const partialId = error instanceof SetlistOperationError ? error.setlistId : null;
        try { await reloadSetlistLibrary(client, partialId ?? selectedContainerId, request); } catch { /* Keep the original failure visible. */ }
      }
      return completed;
    } finally {
      if (clientRef.current === client) { libraryMutation.current = false; setLibraryBusy(false); }
    }
  };

  const openNewSetlist = (source?: HelixContentRef) => {
    if (libraryMutation.current || libraryLoading || previewMode) return;
    setSetlistNotice(null);
    setSetlistOptionsOpen(false);
    setSetlistPickerOpen(false);
    setSetlistDraft(source ? { sourceId: source.cid_, sourceName: source.name ?? 'Setlist' } : {});
  };

  const submitSetlistName = async (name: string) => {
    if (!setlistDraft) return;
    const sourceId = setlistDraft.sourceId;
    const success = await changeSetlist(client => sourceId === undefined ? client.createSetlist(name) : client.duplicateSetlist(sourceId, name),
      `${sourceId === undefined ? 'Created' : 'Duplicated'} setlist “${name.trim()}”.`);
    if (success) setSetlistDraft(null);
  };

  const confirmDeleteSetlist = () => {
    if (!activeSetlist || typeof activeSetlist.cid_ !== 'number' || libraryMutation.current) return;
    const target = activeSetlist;
    Alert.alert(`Delete “${target.name ?? 'Setlist'}”?`, 'This removes the setlist and its running order. Your presets remain in User Presets and other setlists.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete setlist', style: 'destructive', onPress: () => {
        void changeSetlist(client => client.deleteSetlist(target.cid_!), `Deleted setlist “${target.name ?? 'Setlist'}”.`)
          .then(success => { if (success) setSetlistOptionsOpen(false); });
      } },
    ]);
  };

  const handleAddPresetToSetlist = async (item: HelixContentRef, destinationId = targetSetlistId) => {
    const client = requireClient();
    if (!client || libraryMutation.current) return;
    if (typeof item.cid_ !== 'number') {
      setStatus('Preset is missing a content id');
      return;
    }
    if (typeof destinationId !== 'number' || !setlists.some(setlist => setlist.cid_ === destinationId)) {
      setStatus('Select a target setlist first');
      return;
    }
    setSetlistNotice(null);
    libraryMutation.current = true; setLibraryBusy(true);
    try {
      const targetItems = (await client.getContainerContents(destinationId, undefined, true)) as HelixContentRef[];
      const position = setlistAppendPosition(targetItems, 1);
      await client.addContentsToContainer(destinationId, [item.cid_], position);
      if (clientRef.current !== client) return;
      setStatus(`Added ${item.name ?? 'preset'} to ${setlists.find(setlist => setlist.cid_ === destinationId)?.name ?? 'setlist'}`);
      await refreshPresetContext(true);
    } catch (err) {
      if (clientRef.current !== client) return;
      const message = err instanceof Error ? err.message : String(err);
      setStatus(`Add to setlist failed: ${message}`);
    } finally {
      if (clientRef.current === client) { libraryMutation.current = false; setLibraryBusy(false); }
    }
  };

  const loadSetlistAddSource = async (source: SetlistAddSource) => {
    const client = requireClient();
    if (!client) return;
    const sourceInfo = SETLIST_ADD_SOURCES.find((item) => item.key === source);
    if (!sourceInfo) return;
    const request = ++setlistSourceRequest.current;
    setSetlistAddLoading(true);
    setSetlistAddError('');
    setSelectedSetlistAddIds([]);
    try {
      const items = (await client.getContainerContents(sourceInfo.containerId, undefined, true)) as HelixContentRef[];
      if (clientRef.current !== client || request !== setlistSourceRequest.current) return;
      setSetlistAddItems(populatedSlots(items));
    } catch (err) {
      if (clientRef.current !== client || request !== setlistSourceRequest.current) return;
      const message = err instanceof Error ? err.message : String(err);
      setStatus(`Preset search failed: ${message}`);
      setSetlistAddError(`${sourceInfo.label} presets could not be read. Check the connection and try again.`);
      setSetlistAddItems([]);
    } finally {
      if (clientRef.current === client && request === setlistSourceRequest.current) setSetlistAddLoading(false);
    }
  };

  const handleOpenSetlistAddSheet = () => {
    if (!activeSetlist || typeof selectedContainerId !== 'number') {
      setStatus('Select a setlist first');
      return;
    }
    setSetlistAddSearch('');
    setSelectedSetlistAddIds([]);
    setSetlistAddSheetOpen(true);
    void loadSetlistAddSource(setlistAddSource);
  };

  const handleSetlistAddSourceChange = (source: SetlistAddSource) => {
    setSetlistAddSource(source);
    setSetlistAddSearch('');
    setSelectedSetlistAddIds([]);
    void loadSetlistAddSource(source);
  };

  const handleSetlistAddToggle = (contentId: number) => {
    setSelectedSetlistAddIds((prev) =>
      prev.includes(contentId) ? prev.filter((item) => item !== contentId) : [...prev, contentId]
    );
  };

  const handleSelectVisibleSetlistAddItems = () => {
    setSelectedSetlistAddIds((prev) => Array.from(new Set([...prev, ...visibleSetlistAddIds])));
  };

  const handleAddSelectedPresetsToSetlist = async () => {
    const client = requireClient();
    if (!client || libraryMutation.current) return;
    if (!activeSetlist || typeof selectedContainerId !== 'number') {
      setStatus('Select a setlist first');
      return;
    }
    if (!selectedSetlistAddIds.length) {
      setStatus('Select presets to add');
      return;
    }
    setSetlistNotice(null);
    libraryMutation.current = true; setLibraryBusy(true);
    let addSent = false;
    try {
      const targetItems = (await client.getContainerContents(selectedContainerId, undefined, true)) as HelixContentRef[];
      const position = setlistAppendPosition(targetItems, selectedSetlistAddIds.length);
      addSent = true;
      await client.addContentsToContainer(selectedContainerId, selectedSetlistAddIds, position);
      if (clientRef.current !== client) return;
      const count = selectedSetlistAddIds.length;
      setStatus(`Added ${count} preset${count === 1 ? '' : 's'} to ${activeSetlist?.name ?? selectedContainerName}`);
      setSetlistAddSheetOpen(false);
      setSelectedSetlistAddIds([]);
      await refreshPresetContext(true);
    } catch (err) {
      if (clientRef.current !== client) return;
      const message = err instanceof Error ? err.message : String(err);
      setStatus(`Add to setlist failed: ${message}`);
      if (addSent) {
        setSetlistAddSheetOpen(false);
        setSelectedSetlistAddIds([]);
        setSetlistNotice({ message: 'Adding presets was not confirmed. Check the setlist before adding them again.', error: true });
        await refreshPresetContext(true);
      } else setSetlistAddError(message);
    } finally {
      if (clientRef.current === client) { libraryMutation.current = false; setLibraryBusy(false); }
    }
  };

  const handleRemovePresetFromSetlist = async (item: HelixContentRef) => {
    const client = requireClient();
    if (!client || libraryMutation.current) return;
    if (!activeSetlist || typeof selectedContainerId !== 'number' || typeof item.cid_ !== 'number') {
      setStatus('Select a setlist entry first');
      return;
    }
    setSetlistNotice(null);
    libraryMutation.current = true; setLibraryBusy(true);
    try {
      await client.removeContent(selectedContainerId, [item.cid_]);
      if (clientRef.current !== client) return;
      setStatus(`Removed ${item.name ?? 'preset'} from ${selectedContainerName}`);
      await refreshPresetContext(true);
    } catch (err) {
      if (clientRef.current !== client) return;
      const message = err instanceof Error ? err.message : String(err);
      setStatus(`Remove failed: ${message}`);
    } finally {
      if (clientRef.current === client) { libraryMutation.current = false; setLibraryBusy(false); }
    }
  };

  const handleMoveSetlistPreset = async (item: HelixContentRef, delta: -1 | 1) => {
    const client = requireClient();
    if (!client || libraryMutation.current) return;
    if (!activeSetlist || typeof selectedContainerId !== 'number' || typeof item.cid_ !== 'number' || typeof item.posi !== 'number') {
      setStatus('Only setlist entries can be reordered');
      return;
    }
    const insertionIndex = setlistMovePosition(presetItems, item.posi, delta);
    if (insertionIndex === null) return;
    setSetlistNotice(null);
    libraryMutation.current = true; setLibraryBusy(true);
    try {
      await client.reorderContainerContent(selectedContainerId, [item.cid_], insertionIndex);
      if (clientRef.current !== client) return;
      setStatus(`Moved ${item.name ?? 'preset'} ${delta < 0 ? 'earlier' : 'later'} in the setlist`);
      await refreshPresetContext(true);
    } catch (err) {
      if (clientRef.current !== client) return;
      const message = err instanceof Error ? err.message : String(err);
      setStatus(`Reorder failed: ${message}`);
    } finally {
      if (clientRef.current === client) { libraryMutation.current = false; setLibraryBusy(false); }
    }
  };

  const handleCopyPath = async (pathNum: 1 | 2) => {
    if (editLocked() || previewMode) return;
    const client = requireClient();
    if (!client) return;
    const flowIndex = pathNum - 1;
    const presetId = activePresetContentId;
    if (presetId === null) return;
    blockOperation.current = true; setBlockBusy(true);
    try {
      const clipboard = await client.capturePath(flowIndex, presetId);
      if (clientRef.current !== client) return;
      if (!presetEditGuard.current.ready(presetId)) { setStatus('The preset changed. Sync before copying.'); return; }
      if (!clipboard.entries.some(entry => (entry.position >= 1 && entry.position <= 12) || (entry.position >= 15 && entry.position <= 26))) {
        setStatus(`Path ${pathNum} has no blocks to copy`);
        return;
      }
      setPathClipboard({ ...clipboard, presetId });
      setStatus(`Copied Path ${pathNum}. Select Path ${pathNum === 1 ? 2 : 1} and tap Paste here.`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setStatus(`Copy path failed: ${message}`);
      Alert.alert('Cannot copy this path', message);
    } finally { blockOperation.current = false; setBlockBusy(false); }
  };

  const handlePastePath = async (pathNum: 1 | 2) => {
    if (editLocked()) return;
    const client = requireClient();
    const clipboard = pathClipboard;
    if (!client || !clipboard || clipboard.sourcePath === pathNum - 1 || previewMode) return;
    const presetId = activePresetContentId;
    if (presetId === null) return;
    if (clipboard.presetId !== presetId) { setPathClipboard(null); Alert.alert('Preset changed', 'Copy the path again before pasting.'); return; }
    Alert.alert(`Replace Path ${pathNum}?`, 'This replaces its blocks with the copied settings and routing. Snapshot and controller assignments are not copied. Use the desktop editor for a full preset copy.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Replace path', style: 'destructive', onPress: () => {
        void (async () => {
          if (editLocked()) return;
          blockOperation.current = true; setBlockBusy(true); setStatus('Pasting copied path…');
          try {
            const result = await client.pastePathClipboard(clipboard, pathNum - 1, presetId, getDspLimit(extendedDspEnabled));
            if (clientRef.current !== client) return;
            recentParamEditsRef.current.clear();
            if (result.warning) Alert.alert('Check Auto-Cab', result.warning);
            if (!presetEditGuard.current.ready(presetId)) { setStatus('Paste finished. Syncing the current preset…'); return; }
            applyEditBufferState(result.state);
            setStatus(`Pasted ${result.entryCount} blocks to Path ${pathNum}`);
            setPresetEdited(true);
          } catch (error) {
            const message = blockActionMessage(error);
            setStatus(`Paste not confirmed: ${message}`);
            const detail = error instanceof CopyOperationError && !error.mayHaveChanged ? '' : ' The path may be partly updated. Sync and inspect it before saving.';
            Alert.alert('Paste not confirmed', `${message}${detail}${error instanceof CopyOperationError && error.warning ? `\n\n${error.warning}` : ''}`);
          } finally { blockOperation.current = false; setBlockBusy(false); scheduleSync(200, { silent: true }); }
        })();
      } },
    ]);
  };

  const openPerform = (view: PerformView) => {
    setPerformView(view);
    setScreen('performance');
  };

  const handleSnapshotActivate = (index: number) => {
    if (presetSaving || presetCreating) return;
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

  const insertModel = async (model: BlockModel, kind: string, slot = targetSlot) => {
    if (editLocked()) return;
    const client = requireClient();
    if (!client) return;
    if (blockOperation.current || focusWrites.current > 0 || creationPending.current || presetSaveOperation.current) return;
    const p = slot.path as PathIndex;
    const b = slot.block;
    const current = grid[p]?.[b] ?? null;
    const reason = routingInsertReason(grid, { path: p, block: b as BlockSlot['block'] }, model.id) ??
      blockLimitReason(grid, { path: p, block: b as BlockSlot['block'] }, { id: model.id, kind }, shouldBudgetAutoCab(model));
    if (reason) { Alert.alert('Cannot add block here', reason); return; }
    const blockId = effectBlockIndex(p, b);
    const meta = modelLookup.get(model.id);
    const usage = model.usage ?? 0;
    const requiredUsage = getProjectedInsertUsage(model);
    const headroom = getDspHeadroom(p < 2 ? pathUsage.path1 : pathUsage.path2, current?.usage ?? 0, extendedDspEnabled);
    if (!fitsDspBudget(requiredUsage, headroom)) {
      setStatus('Not enough processing headroom for that block');
      return;
    }
    const flow = rowToFlow(p);
    blockOperation.current = true;
    setBlockBusy(true);
    try {
      if (!previewMode) {
        if (await client.getActivePresetContentId() !== activePresetContentId) throw new Error('The preset changed. Sync before adding a block.');
        const before = readBlockAt(await client.getEditBufferState(), flow, blockId);
        if ((before?.mdls?.[0]?.id__ ?? null) !== (current?.id ?? null) || (current?.instanceId !== undefined && before?.id__ !== current.instanceId)) throw new Error('This position changed. Sync before adding a block.');
        if (clientRef.current !== client || await client.getActivePresetContentId() !== activePresetContentId) throw new Error('The connection or preset changed. Sync before adding a block.');
      }
      await client.setModelWait(flow, blockId, model.id, 0);
      if (!previewMode) {
        const state = await client.getEditBufferState();
        const added = readBlockAt(state, flow, blockId);
        if (await client.getActivePresetContentId() !== activePresetContentId || added?.mdls?.[0]?.id__ !== model.id) throw new Error('The Stadium has not confirmed this block. Sync before trying again.');
        if (current && isRoutingModel(current.id) && added?.bblk !== current.linkPosition) throw new Error('The branch connection changed unexpectedly. Sync and check the routing before continuing.');
        if (!presetEditGuard.current.ready(activePresetContentId)) throw new Error('The preset changed. Sync before editing.');
        recentParamEditsRef.current.clear();
        applyEditBufferState(state);
        setStatus(`${isRoutingModel(model.id) ? routingName(model.id) : model.name} ready on ${rowLabels[p]}`);
        setPresetEdited(true);
        scheduleSync(300, { silent: true });
        setPickerOpen(false);
        return;
      }
    } catch (err) {
      const message = blockActionMessage(err);
      setStatus(`Insert failed: ${message}`);
      Alert.alert('Block change not confirmed', message);
      scheduleSync(150, { silent: true });
      return;
    } finally {
      blockOperation.current = false;
      setBlockBusy(false);
    }
    setStatus(`Inserted ${model.name} into ${rowLabels[p]}-${b + 1}`);
    setGrid((prev) => {
      const next = cloneGrid(prev);
      if (next[p] && next[p][b] !== undefined) {
        next[p][b] = {
          id: model.id,
          name: model.name,
          modelName: model.name,
          realName: meta?.realName ?? null,
          kind,
          usage,
          enabled: true,
          blockId,
          params: buildParamDefaults(meta?.params ?? []),
          ...(isRoutingModel(model.id) ? { linkPosition: current?.linkPosition ?? b + 15 } : {}),
        };
      }
      return next;
    });
    setPickerOpen(false);
    scheduleSync();
  };

  const availableBranchPositions = (row: PathIndex) => row % 2 === 1
    ? [...branchColumns(computeBranchSegments(grid[row - 1], grid[row], hasIndependentIO(ioGrid[row])))] : undefined;

  const selectSlot = (slot: BlockSlot) => {
    if (editLocked()) return;
    setSelectedSlot(slot);
    const existingBlock = grid[slot.path]?.[slot.block] ?? null;
    if (existingBlock) {
      setBlockEditorSlot(slot);
      setBlockEditorOpen(true);
      // Tablets edit in the docked panel; phones open the full-screen editor.
      if (!dockEditor) setScreen('editor');
      return;
    }
    setTargetSlot({ path: slot.path, block: slot.block });
    setPickerStep('type');
    setPickerType(null);
    setPickerQuery('');
    setPickerOpen(true);
  };

  const closeEditor = () => {
    setFocusOpen(false); setFocusExpanded(false);
    setSnapshotAssignmentTarget(null);
    setScreen('main');
    setBlockEditorOpen(false);
    setBlockEditorSlot(null);
    knobDraggingRef.current = false;
    setEditorScrollEnabled(true);
  };

  const openSlotMenu = (slot: BlockSlot) => {
    if (editLocked()) return;
    setSlotMenuTarget(slot);
    setSlotMenuOpen(true);
  };

  const _openBlockEditor = (slot: BlockSlot) => {
    setSelectedSlot(slot);
    setBlockEditorSlot(slot);
    setBlockEditorOpen(true);
    setSlotMenuOpen(false);
  };

  const replaceSlotModel = (slot: BlockSlot) => {
    const existingBlock = grid[slot.path]?.[slot.block] ?? null;
    setSlotMenuOpen(false);
    if (!existingBlock) {
      selectSlot(slot);
      return;
    }
    const typeKey = isBlockTypeKey(existingBlock.kind) ? existingBlock.kind : null;
    setSelectedSlot(slot);
    setTargetSlot({ path: slot.path, block: slot.block });
    setBlockEditorOpen(false);
    setBlockEditorSlot(null);
    setScreen('main');
    setPickerStep(typeKey ? 'model' : 'type');
    setPickerType(typeKey);
    setPickerQuery('');
    setPickerOpen(true);
  };

  const selectBlockType = (typeKey: BlockTypeKey) => {
    setPickerType(typeKey);
    setPickerStep('model');
    setPickerQuery('');
  };

  const selectIO = (row: PathIndex, ioType: IOType) => {
    if (blockOperation.current) return;
    const reason = derivedIOReason(grid, ioGrid, row, ioType);
    if (reason) {
      setStatus(reason);
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
    if (editLocked()) return;
    const client = requireClient();
    if (!client || blockOperation.current) return;
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
      const message = blockActionMessage(err);
      setLocalBlockEnabled(slot, currentEnabled);
      setStatus(`Block toggle failed: ${message}`);
      scheduleSync(150);
    }
  };

  const clearSlot = async (slot: BlockSlot) => {
    if (editLocked()) return;
    const client = requireClient();
    if (!client || blockOperation.current) return;
    const existing = grid[slot.path]?.[slot.block];
    if (!existing) return;
    const clear = async () => {
      if (editLocked()) return;
      blockOperation.current = true;
      setBlockBusy(true);
      try {
        if (!previewMode) {
          if (await client.getActivePresetContentId() !== activePresetContentId) throw new Error('The preset changed. Sync before removing a block.');
          const before = readBlockAt(await client.getEditBufferState(), rowToFlow(slot.path), effectBlockIndex(slot.path, slot.block));
          if (before?.mdls?.[0]?.id__ !== existing.id || (existing.instanceId !== undefined && before.id__ !== existing.instanceId) || clientRef.current !== client || await client.getActivePresetContentId() !== activePresetContentId) throw new Error('The block or preset changed. Sync before removing a block.');
        }
        await client.clearBlock(rowToFlow(slot.path), effectBlockIndex(slot.path, slot.block));
        if (clientRef.current !== client) return;
        if (previewMode) {
          setGrid(previous => { const next = cloneGrid(previous); next[slot.path][slot.block] = null; return next; });
        } else {
          const state = await client.getEditBufferState();
          if (await client.getActivePresetContentId() !== activePresetContentId) throw new Error('The preset changed. Sync to see the current preset.');
          if (readBlockAt(state, rowToFlow(slot.path), effectBlockIndex(slot.path, slot.block))?.mdls?.length) throw new Error('The block is still present. Sync before trying again.');
          applyEditBufferState(state);
          setPresetEdited(true);
        }
        if (blockEditorSlot?.path === slot.path && blockEditorSlot?.block === slot.block) closeEditor();
        setSlotMenuOpen(false);
        setStatus(`Removed ${getBlockDisplayName(existing)}`);
      } catch (error) {
        const message = blockActionMessage(error);
        setStatus(`Remove failed: ${message}`);
        Alert.alert('Block removal not confirmed', message);
      } finally {
        blockOperation.current = false;
        setBlockBusy(false);
        scheduleSync(150, { silent: true });
      }
    };
    if (isRoutingModel(existing.id)) {
      Alert.alert('Remove routing block?', isSplitModel(existing.id)
        ? 'This changes how row B receives its signal. Its effects stay in the preset. Check the input and remaining splits afterwards.'
        : 'Row B will use its own output or the next merge. Its effects stay in the preset. Check the output afterwards.',
      [{ text: 'Cancel', style: 'cancel' }, { text: 'Remove', style: 'destructive', onPress: () => { void clear(); } }]);
    } else await clear();
  };

  const handleRoutingLink = async (slot: BlockSlot, linkedPosition: number) => {
    if (editLocked()) return;
    const client = requireClient();
    const block = grid[slot.path]?.[slot.block];
    if (!client || !block || blockOperation.current || !routingLinkChoices(grid, slot).includes(linkedPosition)) return;
    if (block.linkPosition === linkedPosition) return;
    blockOperation.current = true;
    setBlockBusy(true);
    try {
      if (previewMode) {
        setGrid(previous => {
          const next = cloneGrid(previous);
          next[slot.path][slot.block] = { ...block, linkPosition: linkedPosition };
          return next;
        });
      } else {
        if (activePresetContentId === null) throw new Error('Sync the preset before changing its routing.');
        const state = await client.updateRoutingLink({ presetId: activePresetContentId, flow: rowToFlow(slot.path),
          position: effectBlockIndex(slot.path, slot.block), modelId: block.id, linkedPosition, instanceId: block.instanceId });
        if (clientRef.current !== client) return;
        applyEditBufferState(state);
        setPresetEdited(true);
      }
      setStatus(`Connected ${getBlockDisplayName(block)} to ${rowLabels[slot.path + 1]}, position ${linkedPosition - 14}`);
    } catch (error) {
      const message = blockActionMessage(error);
      setStatus(`Routing change failed: ${message}`);
      Alert.alert('Connection not confirmed', message);
    } finally {
      blockOperation.current = false;
      setBlockBusy(false);
      scheduleSync(150, { silent: true });
    }
  };

  const handleHistory = async (direction: 'undo' | 'redo') => {
    if (editLocked()) return;
    const client = requireClient();
    if (!client || previewMode || blockOperation.current) return;
    blockOperation.current = true;
    setBlockBusy(true);
    try {
      if (await client.getActivePresetContentId() !== activePresetContentId) throw new Error('The preset changed. Sync before using Undo or Redo.');
      const state = await client[direction]();
      if (clientRef.current !== client) return;
      if (await client.getActivePresetContentId() !== activePresetContentId) throw new Error('The preset changed. Sync to see the current preset.');
      recentParamEditsRef.current.clear();
      applyEditBufferState(state);
      closeEditor();
      setStatus(direction === 'undo' ? 'Undid the last edit' : 'Redid the last edit');
    } catch (error) {
      const message = blockActionMessage(error);
      setStatus(message);
      Alert.alert('Edit history unavailable', message);
    } finally {
      blockOperation.current = false;
      setBlockBusy(false);
      scheduleSync(150, { silent: true });
    }
  };

  const moveBlockInPath = async (pIdx: PathIndex, fromDisplay: number, toDisplay: number) => {
    if (editLocked()) return false;
    const client = requireClient();
    if (!client || fromDisplay === toDisplay) return false;
    const currentBlocks = grid[pIdx];
    const available = availableBranchPositions(pIdx);
    const visible = reorderPathBlocks(currentBlocks, fromDisplay, toDisplay, available);
    const moved = currentBlocks[fromDisplay];
    if (!visible || !moved) return false;
    const low = Math.min(fromDisplay, toDisplay), high = Math.max(fromDisplay, toDisplay);
    if (currentBlocks.slice(low, high + 1).some(block => block && (isRoutingModel(block.id) || !modelLookup.has(block.id))) ||
        (available && Array.from({ length: high - low + 1 }, (_, index) => low + index).some(index => !available.includes(index)))) {
      setStatus('Move effects within the same branch. Split and merge positions stay fixed.');
      return false;
    }
    blockOperation.current = true;
    setBlockBusy(true);
    try {
      if (previewMode) {
        setGrid(previous => { const next = cloneGrid(previous); next[pIdx] = visible.map((block, index) => block ? { ...block, blockId: effectBlockIndex(pIdx, index) } : null); return next; });
      } else {
        if (activePresetContentId === null) throw new Error('Sync the preset before moving blocks.');
        const state = await client.reorderBlock({ presetId: activePresetContentId, flow: rowToFlow(pIdx),
          from: effectBlockIndex(pIdx, fromDisplay), to: effectBlockIndex(pIdx, toDisplay), modelId: moved.id, instanceId: moved.instanceId });
        if (clientRef.current !== client || !presetEditGuard.current.ready(activePresetContentId)) return false;
        recentParamEditsRef.current.clear();
        applyEditBufferState(state);
        setPresetEdited(true);
      }
      const slot = { path: pIdx, block: toDisplay as BlockSlot['block'] };
      setSelectedSlot(slot);
      if (blockEditorSlot?.path === pIdx) setBlockEditorSlot({ path: pIdx, block: movedIndex(blockEditorSlot.block, fromDisplay, toDisplay) as BlockSlot['block'] });
      setStatus(`Moved ${getBlockDisplayName(moved)} to path ${rowLabels[pIdx]}, position ${toDisplay + 1}`);
      return true;
    } catch (error) {
      const message = blockActionMessage(error);
      setStatus(`Move not confirmed: ${message}`);
      Alert.alert('Move not confirmed', message);
      return false;
    } finally {
      blockOperation.current = false;
      setBlockBusy(false);
      scheduleSync(200, { silent: true });
    }
  };

  const moveDestinationReason = (source: BlockSlot, destination: BlockSlot) => {
    const block = grid[source.path]?.[source.block];
    if (!block || !modelLookup.has(block.id)) return 'Choose a recognised block to move.';
    if (isRoutingModel(block.id)) {
      if (destination.path !== source.path || destination.path % 2) return 'Move this routing node within its row A.';
      const low = Math.min(source.block, destination.block), high = Math.max(source.block, destination.block);
      if (grid[source.path].slice(low, high + 1).some((node, index) => low + index !== source.block && node && isRoutingModel(node.id))) return 'Keep this node between its neighbouring split and merge.';
    }
    if (grid[destination.path]?.[destination.block]) return 'Choose an empty position.';
    const positions = availableBranchPositions(destination.path);
    if (positions && !positions.includes(destination.block)) return 'This position is outside the branch.';
    const withoutSource = cloneGrid(grid);
    withoutSource[source.path][source.block] = null;
    const reason = blockLimitReason(withoutSource, destination, block);
    if (reason) return reason;
    if (rowToFlow(source.path) !== rowToFlow(destination.path)) {
      const usage = destination.path < 2 ? pathUsage.path1 : pathUsage.path2;
      if (!Number.isFinite(block.usage) || !fitsDspBudget(block.usage!, getDspHeadroom(usage, 0, extendedDspEnabled))) return 'There is not enough processing capacity on this path.';
    }
    return null;
  };

  const moveDestinations: MoveDestination[] = moveSource ? grid.flatMap((row, path) => row.flatMap((block, index) => {
    if (block) return [];
    const moving = grid[moveSource.path]?.[moveSource.block];
    if (moving && isRoutingModel(moving.id) && path !== moveSource.path) return [];
    const slot = { path: path as PathIndex, block: index as BlockSlot['block'] };
    if (path % 2 && !availableBranchPositions(slot.path)?.includes(index)) return [];
    return [{ slot, reason: moveDestinationReason(moveSource, slot) }];
  })) : [];

  const handleMoveTo = async (destination: BlockSlot) => {
    if (!moveSource || editLocked()) return;
    const source = moveSource;
    const block = grid[source.path]?.[source.block];
    const client = requireClient();
    if (!block || !client) return;
    if (!matchesMoveSource(block, source)) { setMoveSource(null); Alert.alert('Block changed', 'Choose the block again before moving it.'); return; }
    const reason = moveDestinationReason(source, destination);
    if (reason) { Alert.alert('Cannot move here', reason); return; }
    blockOperation.current = true; setBlockBusy(true);
    try {
      if (previewMode) {
        setGrid(previous => {
          const next = cloneGrid(previous); next[source.path][source.block] = null;
          next[destination.path][destination.block] = { ...block, blockId: effectBlockIndex(destination.path, destination.block) };
          return next;
        });
      } else {
        if (activePresetContentId === null) throw new Error('Sync the preset before moving a block.');
        const state = await client.moveBlock({ presetId: activePresetContentId, fromFlow: rowToFlow(source.path),
          fromPosition: effectBlockIndex(source.path, source.block), toFlow: rowToFlow(destination.path),
          toPosition: effectBlockIndex(destination.path, destination.block), modelId: block.id, instanceId: block.instanceId, dspLimit: getDspLimit(extendedDspEnabled) });
        if (clientRef.current !== client || !presetEditGuard.current.ready(activePresetContentId)) return;
        recentParamEditsRef.current.clear(); applyEditBufferState(state); setPresetEdited(true);
      }
      setMoveSource(null); setSelectedSlot(destination); setPhonePath(destination.path < 2 ? 1 : 2);
      setStatus(`Moved ${getBlockDisplayName(block)} to ${rowLabels[destination.path]}, position ${destination.block + 1}`);
    } catch (error) {
      const message = blockActionMessage(error); setStatus(`Move not confirmed: ${message}`); Alert.alert('Move not confirmed', message);
    } finally {
      blockOperation.current = false; setBlockBusy(false); scheduleSync(200, { silent: true });
    }
  };

  const openMove = (slot: BlockSlot) => {
    if (editLocked()) return;
    const block = grid[slot.path]?.[slot.block];
    if (!block) return;
    setSlotMenuOpen(false); closeEditor(); setMoveSource({ ...slot, modelId: block.id, instanceId: block.instanceId });
  };

  const openBlockCopy = async (slot: BlockSlot) => {
    if (editLocked() || previewMode) return;
    const client = requireClient();
    const block = grid[slot.path]?.[slot.block];
    const presetId = activePresetContentId;
    if (!client || !block || presetId === null) return;
    blockOperation.current = true; setBlockBusy(true);
    setStatus('Reading block settings…');
    try {
      const copy = await client.captureBlock({ presetId, flow: rowToFlow(slot.path), position: effectBlockIndex(slot.path, slot.block), modelId: block.id, instanceId: block.instanceId });
      if (clientRef.current !== client) return;
      if (!presetEditGuard.current.ready(presetId)) { setStatus('The preset changed. Sync before copying.'); return; }
      setSlotMenuOpen(false); closeEditor(); setMoveSource(null);
      setBlockCopy({ presetId, copy: { ...copy, name: getBlockDisplayName(block) } });
      setStatus('Choose an empty position for the copy.');
    } catch (error) {
      const message = blockActionMessage(error);
      setStatus(message); Alert.alert('Cannot copy this block', message);
    } finally { blockOperation.current = false; setBlockBusy(false); }
  };

  const copyDestinations: MoveDestination[] = blockCopy ? grid.flatMap((row, path) => row.flatMap((block, index) => {
    if (block) return [];
    const slot = { path: path as PathIndex, block: index as BlockSlot['block'] };
    if (path % 2 && !availableBranchPositions(slot.path)?.includes(index)) return [];
    return [{ slot, reason: blockCopyDestinationReason(grid, slot, blockCopy.copy.settings.modelId, getDspLimit(extendedDspEnabled)) }];
  })) : [];

  const handleCopyBlockTo = async (destination: BlockSlot) => {
    if (editLocked() || !blockCopy || previewMode) return;
    const client = requireClient();
    if (!client) return;
    const { presetId, copy } = blockCopy;
    blockOperation.current = true; setBlockBusy(true); setStatus('Copying block settings…');
    try {
      const result = await client.copyBlock(copy, { presetId, flow: rowToFlow(destination.path),
        position: effectBlockIndex(destination.path, destination.block), dspLimit: getDspLimit(extendedDspEnabled) });
      if (clientRef.current !== client) return;
      setBlockCopy(null);
      if (result.warning) Alert.alert('Check Auto-Cab', result.warning);
      if (!presetEditGuard.current.ready(presetId)) { setStatus('Copy finished. Syncing the current preset…'); return; }
      recentParamEditsRef.current.clear(); applyEditBufferState(result.value); setPresetEdited(true);
      setSelectedSlot(destination); setPhonePath(destination.path < 2 ? 1 : 2);
      setStatus(`Copied ${copy.name} to ${rowLabels[destination.path]}, position ${destination.block + 1}`);
    } catch (error) {
      const message = blockActionMessage(error);
      const detail = error instanceof CopyOperationError && !error.mayHaveChanged ? '' : ' The new block may be partly configured. Sync and inspect it before saving.';
      setStatus(`Copy not confirmed: ${message}`);
      setBlockCopy(null);
      Alert.alert('Copy not confirmed', `${message}${detail}${error instanceof CopyOperationError && error.warning ? `\n\n${error.warning}` : ''}`);
    } finally { blockOperation.current = false; setBlockBusy(false); scheduleSync(200, { silent: true }); }
  };

  const setIOModel = async (model: IOModel) => {
    if (editLocked()) return;
    const client = requireClient();
    if (!client || blockOperation.current || derivedIOReason(grid, ioGrid, ioPickerRow, ioPickerType) || !ioModelAllowed(ioPickerRow, ioPickerType, model.id)) return;
    const row = ioPickerRow;
    const position = ioBlockIndex(row, ioPickerType);
    const flow = rowToFlow(row);
    blockOperation.current = true;
    setBlockBusy(true);
    try {
      if (!previewMode && await client.getActivePresetContentId() !== activePresetContentId) throw new Error('The preset changed. Sync before changing its input or output.');
      await client.setModelWait(flow, position, model.id, 0);
      if (clientRef.current !== client) return;
      if (previewMode) {
        setIoGrid(previous => {
          const next = previous.map(entry => ({ ...entry }));
          next[row] = { ...next[row], [ioPickerType]: { blockId: position, modelId: model.id, name: model.name,
            params: buildParamDefaults(model.params) } };
          return next;
        });
      } else {
        const state = await client.getEditBufferState();
        if (clientRef.current !== client || await client.getActivePresetContentId() !== activePresetContentId) throw new Error('The connection or preset changed. Sync to see the current preset.');
        if (readBlockAt(state, flow, position)?.mdls?.[0]?.id__ !== model.id) throw new Error('The Stadium has not confirmed this input or output.');
        applyEditBufferState(state);
        setPresetEdited(true);
      }
      setStatus(`Set ${rowLabels[row]} ${ioPickerType} to ${model.name}`);
    } catch (error) {
      const message = blockActionMessage(error);
      setStatus(`Set ${ioPickerType} failed: ${message}`);
      Alert.alert('Input or output not confirmed', message);
    } finally {
      blockOperation.current = false;
      setBlockBusy(false);
      scheduleSync(200, { silent: true });
    }
  };

  const updateIOParam = (param: IOModelParam, value: number | boolean) => {
    if (editLocked()) return;
    const client = requireClient();
    if (!client) return;
    const row = ioPickerRow;
    const flow = rowToFlow(row);
    const blockId = ioBlockIndex(row, ioPickerType);
    const nextValue = clampParamValue(param, value);
    if (nextValue === null) return;
    const paramKey = paramStateKey(param);
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
      const message = blockActionMessage(err);
      setStatus(`Update failed: ${message}`);
      scheduleSync(150);
      return;
    }
    scheduleSync(350);
  };

  const updateBlockParam = (param: EditorParam, value: number | boolean) => {
    if (editLocked()) return;
    const client = requireClient();
    if (!client || blockOperation.current || !blockEditorSlot || !activeBlock || param.id === null) return;
    const nextValue = clampParamValue(param, value);
    if (nextValue === null || activeBlock.blockId === undefined) return;
    const row = blockEditorSlot.path;
    const paramKey = paramStateKey(param);
    setGrid((prev) => {
      const next = cloneGrid(prev);
      const block = next[row]?.[blockEditorSlot.block];
      if (block) {
        block.params = {
          ...(block.params ?? {}),
          [paramKey]: nextValue,
        };
      }
      return next;
    });
    // Remember this edit so an in-flight sync can't undo it before the device
    // has acknowledged. Keyed by (row, blockId, param key) — blockId may stay
    // stable across syncs even when slot positions shift.
    recentParamEditsRef.current.set(
      `${row}|${activeBlock.blockId}|${paramKey}`,
      { value: nextValue, ts: Date.now() }
    );
    try {
      if (param.harness) {
        client
          .setHarnessParamValueWait(rowToFlow(row), activeBlock.blockId, param.id, nextValue, -1, param.type)
          .then(() => scheduleSync(250))
          .catch((err) => {
            const message = blockActionMessage(err);
            setStatus(`Update failed: ${message}`);
            scheduleSync(150);
          });
        return;
      } else {
        void client.setParamValueWait(rowToFlow(row), activeBlock.blockId, param.id, nextValue, 0, -1, param.type)
          .then(() => scheduleSync(250, { silent: true }))
          .catch(error => {
            if (recentParamEditsRef.current.get(`${row}|${activeBlock.blockId}|${paramKey}`)?.value === nextValue) recentParamEditsRef.current.delete(`${row}|${activeBlock.blockId}|${paramKey}`);
            setStatus(`Parameter update: ${blockActionMessage(error)}`);
            scheduleSync(150, { silent: true });
          });
      }
    } catch (err) {
      const message = blockActionMessage(err);
      setStatus(`Update failed: ${message}`);
      scheduleSync(150);
      return;
    }
    scheduleSync(450);
  };

  const handleBlockLabelApply = () => {
    if (!blockEditorSlot || !activeBlock) return;
    const trimmed = blockLabelDraft.trim();
    const overrideKey = getBlockLabelOverrideKey(blockEditorSlot.path, activeBlock.blockId, activeBlock.id, activeBlock.instanceId);
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

  // Rebuild the grid, I/O, snapshots and footswitch banks from an edit-buffer
  // state. Returns false when the state has no usable flows.
  const applyEditBufferState = (state: unknown, silent = true): boolean => {
    const flows = findFlows(state);
    if (!Array.isArray(flows)) {
      if (!silent) setStatus('Sync failed: no flow data');
      return false;
    }
    if (!flows.length) {
      if (!silent) setStatus('Sync failed: empty flow data');
      return false;
    }
    setStompBanks(extractStompBanks(state, (id, paramId) => {
      const model = modelLookup.get(id);
      const parameter = model?.params.find(param => param.id === paramId);
      return parameter ? `${model!.name} · ${parameter.name}` : model?.name;
    }));
    const liveSnapshots = extractSnapshots(state).filter(item => Number.isInteger(item.index) && item.index < 8) as SnapshotRef[];
    setSnapshots(liveSnapshots);
    setSnapshotCount(liveSnapshots.length ? Math.max(...liveSnapshots.map(item => item.index)) + 1 : 0);
    const controlGraph = findFirstKey(state, 'cg__') as { asnp?: unknown } | null;
    if (typeof controlGraph?.asnp === 'number' && Number.isInteger(controlGraph.asnp) && controlGraph.asnp >= 0 && controlGraph.asnp < 8) {
      setActiveSnapshotIndex(controlGraph.asnp);
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
          previousCustomLabels.set(block.instanceId !== undefined ? `instance-${block.instanceId}` : `${rowIndex}:${block.blockId}:${block.id}`, customName);
        }
      });
    });
    const assignSlot = (
      rowIndex: number,
      slotIndex: number,
      modelId: number | null,
      params: Record<string, number | boolean>,
      blockId: number,
      enabled: boolean,
      linkPosition: number | null,
      instanceId?: number
    ) => {
      if (!nextGrid[rowIndex]) return;
      if (slotIndex < 0 || slotIndex >= 12) return;
      if (typeof modelId === 'number' && modelLookup.has(modelId)) {
        const info = modelLookup.get(modelId)!;
        const overrideKey = getBlockLabelOverrideKey(rowIndex, blockId, modelId, instanceId);
        nextGrid[rowIndex][slotIndex] = {
          id: modelId,
          name: info.name,
          modelName: info.name,
          realName: info.realName,
          customName: blockLabelOverrides[overrideKey] ?? previousCustomLabels.get(instanceId !== undefined ? `instance-${instanceId}` : `${rowIndex}:${blockId}:${modelId}`) ?? null,
          kind: info.kind,
          usage: info.usage,
          enabled,
          blockId,
          instanceId,
          params,
          ...(linkPosition !== null ? { linkPosition } : {}),
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
          instanceId,
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
        const collectParams = (source: any, keyPrefix = '') => {
          if (!source || !Array.isArray(source.parm)) return;
          source.parm.forEach((param: any) => {
            const pid = param?.pid_;
            if (typeof pid !== 'number') return;
            params[`${keyPrefix}${pid}`] = param?.valu ?? 0;
          });
        };
        collectParams(model);
        collectParams(blk.hrns, 'h:');
        const enabled = coerceHelixBoolean(blk?.enbl, true);
        const linkPosition = Number.isInteger(blk?.bblk) ? Number(blk.bblk) : null;

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
          assignSlot(rowA, pos - 1, typeof mid === 'number' ? mid : null, params, pos, enabled, linkPosition, Number.isInteger(blk.id__) ? blk.id__ : undefined);
          return;
        }
        if (pos >= 15 && pos <= 26) {
          assignSlot(rowB, pos - 15, typeof mid === 'number' ? mid : null, params, pos, enabled, linkPosition, Number.isInteger(blk.id__) ? blk.id__ : undefined);
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

    // Preserve param values the user has just touched — the device may not
    // have echoed them back yet, so the freshly-fetched state can be stale
    // for a few hundred ms after a write.
    const RECENT_EDIT_HOLD_MS = 1500;
    const editsMap = recentParamEditsRef.current;
    if (editsMap.size) {
      const cutoff = Date.now() - RECENT_EDIT_HOLD_MS;
      for (const [key, entry] of Array.from(editsMap.entries())) {
        if (entry.ts < cutoff) {
          editsMap.delete(key);
          continue;
        }
        const [rowStr, blockIdStr, paramKey] = key.split('|');
        const rowIdx = Number(rowStr);
        const blockId = Number(blockIdStr);
        if (!Number.isFinite(rowIdx) || !Number.isFinite(blockId)) continue;
        const row = nextGrid[rowIdx];
        if (!row) continue;
        for (const block of row) {
          if (block && block.blockId === blockId) {
            block.params = { ...(block.params ?? {}), [paramKey]: entry.value };
            break;
          }
        }
      }
    }

    // Skip clobbering local state while the user is dragging a knob — the
    // optimistic value is what they're seeing and should not flicker.
    if (knobDraggingRef.current || focusWrites.current > 0) {
      return true;
    }

    setGrid(nextGrid);
    setIoGrid(nextIO);
    return true;
  };

  const handleSync = async (silent = false) => {
    if (blockOperation.current || previewMode) return false;
    const client = requireClient();
    if (!client) return false;
    if (flowSyncInFlightRef.current || blockOperation.current) return false;
    flowSyncInFlightRef.current = true;
    if (!silent) {
      setStatus('Syncing from device...');
    }
    try {
      const revision = presetEditGuard.current.beginSync();
      const beforePreset = await client.getActivePresetContentId();
      const state = await client.getEditBufferState();
      const afterPreset = await client.getActivePresetContentId();
      if (beforePreset === null || afterPreset === null) {
        if (!silent) setStatus('Could not confirm the current preset. Check the connection and sync again.');
        return false;
      }
      if (beforePreset !== afterPreset || revision !== presetEditGuard.current.beginSync()) {
        if (!silent) setStatus('The preset changed. Syncing the current preset…');
        scheduleSync(900, { silent: true, full: true });
        return false;
      }
      if (clientRef.current !== client || blockOperation.current) return false;
      if (!state) {
        if (!silent) setStatus('Sync failed: no response');
        return false;
      }
      if (!applyEditBufferState(state, silent)) return false;
      if (!knobDraggingRef.current && focusWrites.current === 0) {
        presetEditGuard.current.acceptSync(revision, beforePreset);
        setActivePresetContentId(beforePreset);
      }
      // The grid was left alone while a control is being dragged; skip the notes read too.
      if (knobDraggingRef.current || focusWrites.current > 0) return true;
      try {
        const notes = await client.getProperty('preset.meta.info');
        if (clientRef.current !== client) return false;
        if (notes && typeof notes.value === 'string') {
          setNotesText(notes.value);
        } else if (notes && notes.value === null) {
          setNotesText('');
        }
      } catch (_err) {
        // Ignore notes sync failures; block sync succeeded.
      }
      if (clientRef.current !== client) return false;
      if (!silent) {
        setStatus('Synced');
      }
      return true;
    } catch (err) {
      if (clientRef.current !== client) return false;
      const message = err instanceof Error ? err.message : String(err);
      if (!silent) {
        setStatus(`Sync failed: ${message}`);
      }
      return false;
    } finally {
      if (clientRef.current === client) flowSyncInFlightRef.current = false;
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
    const pending = syncTimerRef.current ? scheduledSyncOptionsRef.current : null;
    if (pending?.full && !presetEditGuard.current.isSynced()) return;
    if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
    scheduledSyncOptionsRef.current = {
      full: (options.full ?? true) || !!pending?.full,
      silent: (options.silent ?? false) && (pending?.silent ?? true),
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

  // Every command is accepted locally, so edits show on screen but reach no
  // device. Nothing is saved; leaving the preview clears it.
  const startPreview = () => {
    clientRef.current = createDemoClient();
    applyEditBufferState(samplePreset);
    setActivePresetRef({ name: 'Sample Preset', posi: 5, cid_: -1 });
    setAutoSyncEnabled(false);
    setPreviewMode(true);
    setStatus('Preview');
    setConnected(true);
  };

  useEffect(() => {
    if (!DEMO_PRESET) return;
    startPreview();
    const [row, slot] = DEMO_SELECT.split('-').map(Number);
    if (Number.isInteger(row) && Number.isInteger(slot)) {
      setSelectedSlot({ path: row as PathIndex, block: slot as BlockSlot['block'] });
      setBlockEditorSlot({ path: row as PathIndex, block: slot as BlockSlot['block'] });
      setBlockEditorOpen(true);
      if (!dockEditor) setScreen('editor');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // Runs the next step once a closing sheet has finished dismissing.
  const afterSheetClose = (close: () => void, next: () => void) => {
    close();
    setTimeout(next, SHEET_HANDOFF_MS);
  };

  const renderMenuRow = ({ key, label, hint, icon, onPress, disabled = false, danger = false, accessibilityLabel }: {
    key: string; label: string; hint?: string; icon?: UtilityIconName; onPress: () => void; disabled?: boolean; danger?: boolean; accessibilityLabel?: string;
  }) => (
    <Pressable key={key} accessibilityLabel={accessibilityLabel} disabled={disabled} onPress={onPress}
      style={({ pressed }) => [styles.menuRow, pressed && styles.menuRowPressed, disabled && styles.menuRowDisabled]}>
      {icon ? <UtilityIcon name={icon} size={20} color={danger ? COLORS.danger : COLORS.muted} /> : null}
      <View style={styles.menuRowCopy}>
        <Text style={[styles.menuRowText, danger && styles.menuRowDanger]}>{label}</Text>
        {hint ? <Text style={styles.menuRowHint}>{hint}</Text> : null}
      </View>
    </Pressable>
  );

  const showDspHelp = () => setParamHelp({ title: 'DSP estimates', body: 'DSP is the processing capacity used by amps and effects. These numbers are estimates from the model catalogue, not live CPU percentages. Each path has its own budget. Larger numbers use more of it; bypassing a block does not free its capacity.' });

  // User banks list every slot, including empty ones, so count slots there rather than presets.
  const presetCountLabel = (items: HelixContentRef[]) => {
    const empty = libraryRoot === 'user' ? items.filter(item => isEmptyUserSlot(item)).length : 0;
    if (empty > 0) return `${items.length} slots · ${items.length - empty} used`;
    return `${items.length} ${items.length === 1 ? 'preset' : 'presets'}`;
  };

  const renderIORow = (rowIndex: PathIndex, ioType: IOType) => {
    const entry = ioGrid[rowIndex]?.[ioType] ?? null;
    const isInput = ioType === 'input';
    const derivedLabel = derivedIOReason(grid, ioGrid, rowIndex, ioType);
    const disabled = !!derivedLabel;
    return (
      <Pressable
        accessibilityLabel={`Path ${rowLabels[rowIndex]} ${isInput ? 'input' : 'output'}, ${disabled ? derivedLabel : (entry?.name ?? 'None')}`}
        style={({ pressed }) => [styles.ioRow, disabled && { opacity: 0.4 }, pressed && styles.menuRowPressed]}
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
          <Text style={styles.ioName}>{disabled ? derivedLabel : (entry?.name ?? 'None')}</Text>
        </View>
        <View style={styles.ioTrailing}>
          {!disabled && <UtilityIcon name="chevron" size={16} color={COLORS.muted} />}
        </View>
      </Pressable>
    );
  };

  const renderPathHeader = (pathNum: 1 | 2) => {
    const flowIndex = pathNum - 1;
    const otherPath = pathNum === 1 ? 2 : 1;
    const usage = pathNum === 1 ? pathUsage.path1 : pathUsage.path2;
    const ratio = Math.min(usage / STANDARD_DSP_CAP, 1);
    const overBudget = usage > STANDARD_DSP_CAP;
    const dspColor = overBudget ? COLORS.danger : ratio >= 0.85 ? COLORS.warn : COLORS.accent;
    const clipboardMatches = pathClipboard?.sourcePath === flowIndex;
    const canPasteClipboard = !!pathClipboard && pathClipboard.sourcePath !== flowIndex && !previewMode && !blockBusy && !focusBusy && !presetSaving && !presetCreating;
    const editDisabled = previewMode || blockBusy || focusBusy || presetSaving || presetCreating;
    // Phones in the visual layout show one path at a time, so each header carries history; elsewhere only Path 1 does.
    const showHistory = (!dockEditor && !linearControls) || pathNum === 1;
    return (
      <View style={styles.pathHeaderBlock}>
        {linearControls && <Text accessibilityRole="header" style={styles.pathTitle}>Path {pathNum}</Text>}
        <View style={styles.pathHeader}>
          <Pressable accessibilityLabel={`Path ${pathNum} DSP estimate ${usage.toFixed(1)} of ${STANDARD_DSP_CAP}. Explain processing estimates`}
            onPress={showDspHelp} style={({ pressed }) => [styles.pathDsp, pressed && styles.pressedQuiet]}>
            {dockEditor && <Text maxFontSizeMultiplier={2} style={styles.pathTitle}>Path {pathNum}</Text>}
            <View style={styles.pathDspLine}>
              <View style={styles.dspTrack}>
                <View style={[styles.dspFill, { width: `${ratio * 100}%`, backgroundColor: dspColor }]} />
              </View>
              <Text maxFontSizeMultiplier={2} style={[styles.pathDspText, overBudget && { color: COLORS.danger }]} numberOfLines={1}>
                {usage.toFixed(1)} / {STANDARD_DSP_CAP} DSP
              </Text>
            </View>
          </Pressable>
          <View style={styles.pathTools}>
            {showHistory && (['undo', 'redo'] as const).map(direction => <Pressable key={direction}
              accessibilityLabel={direction === 'undo' ? 'Undo last preset edit' : 'Redo last preset edit'}
              disabled={editDisabled} style={({ pressed }) => [styles.iconAction, pressed && styles.iconActionPressed]}
              onPress={() => { void handleHistory(direction); }}>
              <UtilityIcon name={direction} size={22} color={editDisabled ? COLORS.faint : COLORS.text} />
            </Pressable>)}
            <Pressable accessibilityLabel={`Path ${pathNum} options`} style={({ pressed }) => [styles.iconAction, pressed && styles.iconActionPressed]}
              onPress={() => setPathMenuPath(pathNum)}>
              <UtilityIcon name="more" size={22} color={COLORS.text} />
            </Pressable>
          </View>
        </View>
        {pathClipboard && (clipboardMatches ? (
          <Text style={styles.clipboardNote}>
            Path {pathNum} copied. {dockEditor || linearControls ? `Paste it into Path ${otherPath}.` : `Select Path ${otherPath} above to paste.`}
          </Text>
        ) : (
          <View style={styles.clipboardStrip}>
            <Text style={styles.clipboardText} numberOfLines={2}>Path {pathClipboard.sourcePath + 1} copied</Text>
            <Pressable accessibilityLabel={`Paste copied path into path ${pathNum}`} disabled={!canPasteClipboard}
              style={({ pressed }) => [styles.clipboardAction, pressed && styles.pressedQuiet]} onPress={() => { void handlePastePath(pathNum); }}>
              <Text style={[styles.clipboardActionText, !canPasteClipboard && styles.pathActionTextDisabled]}>Paste here</Text>
            </Pressable>
          </View>
        ))}
      </View>
    );
  };

  const renderEffectList = (row: PathIndex) => (
    <DraggableEffectList
      key={`${activePresetStorageId}:${row}`}
      blocks={decorateDisplayBlocks(grid[row])}
      availablePositions={availableBranchPositions(row)}
      pathIndex={row}
      selectedSlot={selectedSlot}
      onSelectSlot={selectSlot}
      onOpenSlotMenu={openSlotMenu}
      onReorder={moveBlockInPath}
      onToggleEnabled={toggleBlockEnabled}
      kindLabel={kindLabel}
      onDragStart={() => setFlowScrollEnabled(false)}
      onDragEnd={() => setFlowScrollEnabled(true)}
    />
  );

  // A block dropped in the lanes becomes the selected block, wherever it lands.
  const handleLaneMove = (row: PathIndex, from: number, to: number) => {
    void moveBlockInPath(row, from, to).then(moved => {
      if (!moved) return;
      setBlockEditorSlot({ path: row, block: to as BlockSlot['block'] });
      setBlockEditorOpen(true);
      setFocusOpen(false); setFocusExpanded(false);
    });
  };

  const renderPathSection = (pathNum: 1 | 2) => {
    const primary: PathIndex = pathNum === 1 ? 0 : 2;
    const split: PathIndex = pathNum === 1 ? 1 : 3;
    const hasSplit = pathNum === 1 ? hasSplit1 : hasSplit2;

    return (
      <View style={styles.pathSection}>
        {renderPathHeader(pathNum)}
        {extendedDspEnabled && <Text style={styles.labelHint}>Extended budget on · normal limit {STANDARD_DSP_CAP}, maximum estimate {EXTENDED_DSP_CAP}</Text>}

        {pathNum === 1 && virtualNamRoute && <VirtualNamBlock route={virtualNamRoute} />}

        {dockEditor || (!linearControls && phoneFlowView === 'grid') ? (
          <PathLanes
            key={`path-${pathNum}`}
            phone={!dockEditor}
            pathNumber={pathNum}
            rowA={decorateDisplayBlocks(grid[primary])}
            rowB={decorateDisplayBlocks(grid[split])}
            rowBHasIO={hasIndependentIO(ioGrid[split])}
            inputALabel={derivedIOReason(grid, ioGrid, primary, 'input')}
            inputBLabel={derivedIOReason(grid, ioGrid, split, 'input')}
            ioA={{ input: ioGrid[primary]?.input?.name ?? null, output: ioGrid[primary]?.output?.name ?? null }}
            ioB={{ input: ioGrid[split]?.input?.name ?? null, output: ioGrid[split]?.output?.name ?? null }}
            selectedSlot={selectedSlot}
            onSelectSlot={selectSlot}
            onOpenSlotMenu={openSlotMenu}
            onSelectIO={selectIO}
            onMoveBlock={dockEditor ? handleLaneMove : undefined}
            onDragActive={dockEditor ? (active) => setFlowScrollEnabled(!active) : undefined}
            kindLabel={kindLabel}
          />
        ) : (
          <>
            {!linearControls && <Text style={styles.rowHeading}>Row {pathNum}A</Text>}
            {renderIORow(primary, 'input')}
            {renderEffectList(primary)}
            {renderIORow(primary, 'output')}
            {hasSplit && (
              <View style={!linearControls && styles.branchSection}>
                <Text style={styles.rowHeading}>Row {pathNum}B · split branch</Text>
                {renderIORow(split, 'input')}
                {renderEffectList(split)}
                {renderIORow(split, 'output')}
              </View>
            )}
          </>
        )}
      </View>
    );
  };

  const renderPhoneFlowNavigation = () => (
    <View style={[styles.phoneFlowNavigation, accessibilityText && styles.phoneFlowNavigationStacked]}>
      <View accessibilityRole="tablist" accessibilityLabel="Signal path" style={[styles.phoneFlowTabs, accessibilityText && styles.phoneFlowTabsStacked]}>
        {([1, 2] as const).map(path => <Pressable key={path} accessibilityRole="tab"
          accessibilityLabel={`Path ${path}`} accessibilityState={{ selected: phonePath === path }}
          onPress={() => setPhonePath(path)} style={({ pressed }) => [styles.phoneFlowTab, phonePath === path && styles.phoneFlowTabSelected, pressed && styles.pressedQuiet]}>
          <Text maxFontSizeMultiplier={2} style={[styles.phoneFlowTabText, phonePath === path && styles.phoneFlowTabTextSelected]}>Path {path}</Text>
        </Pressable>)}
      </View>
      <View accessibilityRole="tablist" accessibilityLabel="Signal chain view" style={[styles.phoneFlowTabs, accessibilityText && styles.phoneFlowTabsStacked]}>
        {(['grid', 'list'] as const).map(view => <Pressable key={view} accessibilityRole="tab"
          accessibilityLabel={`${view === 'grid' ? 'Grid' : 'List'} view`} accessibilityState={{ selected: phoneFlowView === view }}
          onPress={() => setPhoneFlowView(view)} style={({ pressed }) => [styles.phoneFlowTab, phoneFlowView === view && styles.phoneFlowTabSelected, pressed && styles.pressedQuiet]}>
          <Text maxFontSizeMultiplier={2} style={[styles.phoneFlowTabText, phoneFlowView === view && styles.phoneFlowTabTextSelected]}>{view === 'grid' ? 'Grid' : 'List'}</Text>
        </Pressable>)}
      </View>
    </View>
  );

  const expandedFocus = dockEditor && focusOpen && focusExpanded && blockEditorOpen && !!activeBlock && !!activeBlockMeta &&
    focusKind(activeBlockMeta) !== null && activePresetContentId !== null && activeSnapshotIndex !== null && activeBlock.blockId !== undefined;

  const renderFlowTab = () => {
    if (dockEditor) {
      return (
        <View style={styles.flowDock}>
          {!expandedFocus && <ScrollView keyboardShouldPersistTaps="handled"
            style={styles.flowLanes}
            contentContainerStyle={styles.flowLanesContent}
            showsVerticalScrollIndicator={false}
            scrollEnabled={flowScrollEnabled}
          >
            {renderPathSection(1)}
            {renderPathSection(2)}
          </ScrollView>}
          <View style={[styles.inspector, isLandscape && styles.inspectorLandscape, expandedFocus && { flex: 1, minHeight: 0, maxHeight: '100%', height: undefined }]}>
            {expandedFocus && renderPresetSaveBar()}
            {blockEditorOpen && blockEditorSlot && activeBlock ? renderBlockInspector(true) : (
              <View style={styles.inspectorEmpty}>
                <Text style={styles.inspectorEmptyTitle}>Select a block to edit it here</Text>
                <Text style={styles.inspectorEmptyText}>Tap an empty position to add a block. Touch and hold a block, then drag to move it, or let go for more options.</Text>
              </View>
            )}
          </View>
        </View>
      );
    }
    return (
      <ScrollView keyboardShouldPersistTaps="handled"
        style={styles.tabContent}
        contentContainerStyle={styles.flowPadding}
        showsVerticalScrollIndicator={false}
        scrollEnabled={flowScrollEnabled}
      >
        {scrollChrome && <View style={styles.flowChromeBleed}>{flowChrome}</View>}
        {linearControls ? (
          <>
            {renderPathSection(1)}
            {renderPathSection(2)}
          </>
        ) : (
          <>
            {renderPhoneFlowNavigation()}
            {renderPathSection(phonePath)}
          </>
        )}
      </ScrollView>
    );
  };

  const libraryFeedback = libraryBusy ? 'Updating the setlist…' : /failed|not confirmed/i.test(status) ? 'That action was not confirmed. Refresh and try again.'
    : /^(Added |Removed |Moved |Renamed |Notes |Snapshot |Copied snapshot|Duplicated |Created )/i.test(status) ? status : '';
  const renderLibraryFeedback = () => setlistNotice && libraryRoot === 'setlists'
    ? <Text accessibilityLiveRegion="polite" style={[libraryStyles.muted, setlistNotice.error && { color: COLORS.danger }]}>{setlistNotice.message}</Text>
    : libraryFeedback ? <Text accessibilityLiveRegion="polite" style={libraryStyles.muted}>{libraryFeedback}</Text> : null;

  const refreshLibraryList = async () => {
    if (libraryRefreshing || libraryMutation.current || libraryLoading) return;
    setLibraryRefreshing(true);
    try { await refreshPresetContext(); } finally { setLibraryRefreshing(false); }
  };

  const renderLibraryPresetRow = (item: HelixContentRef) => {
    const empty = libraryRoot === 'user' && isEmptyUserSlot(item);
    return <LibraryRow title={empty ? 'Empty slot' : item.name ?? 'Unnamed preset'} position={formatPresetPosition(item.posi)}
      empty={empty} selected={isPresetActive(item)} disabled={presetCreating || presetSaving || libraryLoading || libraryBusy}
      accessibilityLabel={empty ? `Create preset in empty slot ${formatPresetPosition(item.posi)}` : `Load ${item.name ?? 'preset'}, position ${formatPresetPosition(item.posi)}`}
      onPress={() => { if (empty) void openPresetCreation(item.posi); else void handlePresetLoad(item); }}
      onOptions={!empty ? () => { setPresetRenameText(activePresetName); setPresetActionTarget(item); } : undefined} />;
  };

  const renderPresetTab = () => {
    if (presetPanel !== 'browse') return <ScrollView keyboardShouldPersistTaps="handled" automaticallyAdjustKeyboardInsets keyboardDismissMode="on-drag" style={styles.tabContent} contentContainerStyle={libraryStyles.content}>
      <LibraryButton label="Presets" icon="back" onPress={() => setPresetPanel('browse')} />
      <View style={{ marginTop: 20 }}><LibraryHeading title={presetPanel === 'snapshots' ? 'Snapshots' : 'Preset notes'} focusKey={`preset-${presetPanel}`} /></View>
      {renderPresetSaveBar()}
      <View style={{ gap: 16, paddingTop: 20 }}>
        {renderLibraryFeedback()}
        {presetPanel === 'snapshots' ? <>
        <Text style={libraryStyles.muted}>
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
                  <View key={index} style={[libraryStyles.row, active && libraryStyles.selectedRow]}><Pressable accessibilityState={{ selected: active }} accessibilityLabel={`Activate snapshot ${index + 1}, ${snapshot?.name ?? 'Unnamed'}`}

                    style={libraryStyles.rowMain}
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
                      <Text style={libraryStyles.rowTitle}>
                        {index + 1}. {snapshot?.name ?? `Snapshot ${index + 1}`}
                      </Text>
                    </View>
                    {active && <Text style={styles.libraryActiveBadge}>Active</Text>}
                  </Pressable><Pressable accessibilityLabel={`Options for snapshot ${index + 1}, ${snapshot?.name ?? 'Unnamed'}`} style={libraryStyles.iconButton} onPress={() => setSnapshotActionIndex(index)}><UtilityIcon name="more" /></Pressable></View>
                );
              })}
            </View>

            {activeSnapshot && (
              <>
                <Text style={libraryStyles.section}>Snapshot colour</Text>
                <View style={styles.libraryPills}>
                  {SNAPSHOT_COLOR_OPTIONS.map((option) => (
                    <Pressable accessibilityState={{ selected: activeSnapshot?.colr === option.value }} accessibilityLabel={`Snapshot colour, ${option.label}`}
                      key={`snapshot-color-${option.value}`}
                      style={[
                        libraryStyles.button,
                        activeSnapshot?.colr === option.value && libraryStyles.primary,
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
                <Text style={libraryStyles.section}>Copy snapshot</Text>
                <View style={{ gap: 10 }}>
                  <Text style={libraryStyles.muted}>Source</Text>
                  <View style={styles.libraryPills}>
                    {Array.from({ length: snapshotCount }, (_item, index) => {
                      const active = snapshotCopySource === index;
                      return (
                        <Pressable accessibilityState={{ selected: active }} accessibilityLabel={`Copy from snapshot ${index + 1}`}
                          key={`copy-source-${index}`}
                          style={[libraryStyles.button, active && libraryStyles.primary]}
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
                <View style={{ gap: 10 }}>
                  <Text style={libraryStyles.muted}>Target</Text>
                  <View style={styles.libraryPills}>
                    {Array.from({ length: snapshotCount }, (_item, index) => {
                      const active = snapshotCopyTarget === index;
                      return (
                        <Pressable accessibilityState={{ selected: active }} accessibilityLabel={`Copy to snapshot ${index + 1}`}
                          key={`copy-target-${index}`}
                          style={[libraryStyles.button, active && libraryStyles.primary]}
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
                <LibraryButton label="Copy snapshot" disabled={snapshotCopySource === snapshotCopyTarget} onPress={() => void handleSnapshotCopy()} />
              </>
            )}
          </>
        ) : (
          <Text style={styles.paramHint}>No snapshots loaded. Refresh to read the current preset.</Text>
        )}

        </> : <>
        <SettingsToggle label="Show on device" accessibilityLabel="Show preset notes on device" value={notesVisible} onChange={handleNotesToggle} />
        <TextInput
          style={[styles.textArea, { borderWidth: 0, backgroundColor: COLORS.panel, borderRadius: 16, fontSize: 16, lineHeight: 24, padding: 16 }]}
          accessibilityLabel="Preset notes"
          value={notesText}
          onChangeText={setNotesText}
          multiline
          numberOfLines={10}
          placeholder="Write preset notes..."
          placeholderTextColor={COLORS.muted}
        />
        <LibraryButton label="Send notes" primary onPress={handleNotesSend} />

        </>}
      </View>
    </ScrollView>;
    return <FlatList style={styles.tabContent} contentContainerStyle={libraryStyles.content}
      data={filteredPresetItems} keyExtractor={item => `${item.cid_ ?? 'preset'}-${item.posi ?? 'slot'}`}
      keyboardShouldPersistTaps="handled" automaticallyAdjustKeyboardInsets keyboardDismissMode="on-drag" refreshing={libraryRefreshing} onRefresh={() => { void refreshLibraryList(); }}
      ListHeaderComponent={<>
        <LibraryHeading title="Presets" focusKey="presets" />
        <View style={libraryStyles.header}>
          {renderLibraryFeedback()}
          {renderPresetSaveBar()}
          <View style={libraryStyles.toolbar}>
            <LibraryButton label="Snapshots" icon="snapshots" onPress={() => setPresetPanel('snapshots')} />
            <LibraryButton label="Notes" icon="notes" onPress={() => setPresetPanel('notes')} />
          </View>
          <LibrarySegments label="Preset library" options={[['user', 'User'], ['factory', 'Factory']]} value={libraryRoot === 'factory' ? 'factory' : 'user'}
            disabled={libraryLoading} onChange={key => { void handleLibraryRootChange(key); }} />
          <LibrarySearch value={presetFilter} onChange={setPresetFilter} />
          <View style={[libraryStyles.toolbar, { justifyContent: 'space-between' }]}>
            <Text style={libraryStyles.section}>{presetFilter.trim() ? `${filteredPresetItems.length} of ${presetItems.length}` : presetCountLabel(presetItems)}</Text>
            {libraryRoot === 'user' && <LibraryButton label="New preset" icon="plus" disabled={presetCreating || presetSaving || libraryLoading || libraryBusy} onPress={() => { void openPresetCreation(); }} />}
          </View>
        </View>
      </>}
      ListEmptyComponent={<Text style={libraryStyles.muted}>{libraryLoading ? 'Loading presets…' : presetItems.length ? 'No presets match that search.' : 'No presets here. Pull down to refresh.'}</Text>}
      renderItem={({ item }) => renderLibraryPresetRow(item)} />;
  };

  // At extreme sizes the setlist view scrolls its heading with the list; Showcase keeps it pinned above its own scroller.
  const renderLibraryTop = (inList: boolean) => <View style={inList ? styles.libraryTopInList : [libraryStyles.content, { paddingBottom: 16 }]}>
    <LibraryHeading title="Library" focusKey="library" />
    <LibrarySegments label="Library section" options={[['setlists', 'Setlists'], ['showcase', 'Showcase']]} value={librarySection}
      disabled={showcaseBusy || libraryBusy} onChange={setLibrarySection} />
  </View>;

  let setlistRenameIssue = '';
  try { validateSetlistName(setlistRenameText); } catch (error) { setlistRenameIssue = error instanceof Error ? error.message : 'Enter a setlist name.'; }

  const renderSetlistsTab = () => <View style={styles.tabContent}>
    {!(scrollChrome && librarySection !== 'showcase') && renderLibraryTop(false)}
    {librarySection === 'showcase' ? <ShowcaseLibrary client={clientRef.current} onBusy={setShowcaseBusy}
      onSongChange={() => { void refreshTransportContext(); void handleSync(true); }} /> :
      <FlatList style={styles.tabContent} contentContainerStyle={[libraryStyles.content, { paddingTop: 0 }]}
        keyboardShouldPersistTaps="handled" automaticallyAdjustKeyboardInsets keyboardDismissMode="on-drag" data={filteredPresetItems} keyExtractor={item => `${item.cid_ ?? 'preset'}-${item.posi ?? 'slot'}`}
        refreshing={libraryRefreshing} onRefresh={() => { void refreshLibraryList(); }}
        ListHeaderComponent={<View style={libraryStyles.header}>
          {scrollChrome && renderLibraryTop(true)}
          {renderLibraryFeedback()}
          <View style={[libraryStyles.toolbar, { justifyContent: 'space-between' }]}>
            <Text style={libraryStyles.muted}>{setlists.length} / {MAX_SETLISTS} setlists</Text>
            <LibraryButton label="New setlist" icon="plus" disabled={previewMode || libraryLoading || libraryBusy || setlists.length >= MAX_SETLISTS} onPress={() => openNewSetlist()} />
          </View>
          {previewMode && <Text style={libraryStyles.muted}>Connect to your Stadium to create and manage setlists.</Text>}
          {setlists.length > 0 ? <>
            <View style={[libraryStyles.row, libraryStyles.selectedRow]}>
              <Pressable accessibilityLabel={`Choose setlist, ${activeSetlist?.name ?? 'none selected'}`} disabled={libraryBusy || libraryLoading} onPress={() => { setSetlistFilter(''); setSetlistPickerOpen(true); }} style={libraryStyles.rowMain}>
                <View style={libraryStyles.rowCopy}><Text style={libraryStyles.rowHint}>SETLIST</Text><Text style={libraryStyles.rowTitle}>{activeSetlist?.name ?? 'Select a setlist'}</Text></View>
                <UtilityIcon name="chevron" size={18} />
              </Pressable>
              <Pressable accessibilityLabel="Setlist options" disabled={previewMode || libraryBusy || libraryLoading || !activeSetlist} style={libraryStyles.iconButton} onPress={() => { setSetlistNotice(null); setSetlistRenameText(activeSetlist?.name ?? ''); setSetlistOptionsOpen(true); }}><UtilityIcon name="more" /></Pressable>
            </View>
            <View style={[libraryStyles.toolbar, { justifyContent: 'space-between' }]}>
              <Text style={libraryStyles.muted}>{presetCountLabel(presetItems)}</Text>
              <LibraryButton label="Add presets" icon="plus" primary disabled={libraryLoading || libraryBusy || !activeSetlist} onPress={handleOpenSetlistAddSheet} />
            </View>
            <LibrarySearch value={presetFilter} onChange={setPresetFilter} placeholder="Search this setlist" />
          </> : <Text style={libraryStyles.muted}>{libraryLoading ? 'Loading setlists…' : 'No setlists yet. Create one to build your running order, or pull down to refresh.'}</Text>}
        </View>}
        ListEmptyComponent={setlists.length > 0 ? <Text style={libraryStyles.muted}>{libraryLoading ? 'Loading presets…' : presetItems.length ? 'No presets match that search.' : 'This setlist is empty. Add presets to build your running order.'}</Text> : undefined}
        renderItem={({ item }) => renderLibraryPresetRow(item)} />}
    <SetlistManagementSheet visible={setlistOptionsOpen || setlistDraft !== null} creating={setlistDraft !== null}
      selectedName={activeSetlist?.name} sourceName={setlistDraft?.sourceName} busy={libraryBusy} error={setlistNotice?.error ? setlistNotice.message : ''}
      onClose={() => { if (!libraryBusy) { setSetlistOptionsOpen(false); setSetlistDraft(null); } }}
      onBack={() => { if (!libraryBusy) { setSetlistDraft(null); setSetlistOptionsOpen(true); setSetlistNotice(null); } }}
      onSubmit={name => { void submitSetlistName(name); }}>
      <ScrollView keyboardShouldPersistTaps="handled" automaticallyAdjustKeyboardInsets keyboardDismissMode="on-drag" contentContainerStyle={{ gap: 16 }}>
        {setlistNotice && <Text accessibilityLiveRegion="polite" style={[libraryStyles.muted, setlistNotice.error && { color: COLORS.danger }]}>{setlistNotice.message}</Text>}
        <Text style={libraryStyles.section}>Name</Text>
        <TextInput accessibilityLabel="Setlist name" editable={!libraryBusy} maxLength={64} style={styles.input} value={setlistRenameText} onChangeText={setSetlistRenameText} autoCapitalize="words" autoCorrect={false} />
        <Text style={libraryStyles.muted}>{[...setlistRenameText.trim()].length} / 32 characters</Text>
        {!!setlistRenameText.trim() && !!setlistRenameIssue && <Text accessibilityLiveRegion="polite" style={[libraryStyles.muted, { color: COLORS.danger }]}>{setlistRenameIssue}</Text>}
        <LibraryButton label="Rename setlist" primary disabled={libraryBusy || !activeSetlist || !!setlistRenameIssue || setlistRenameText.trim() === activeSetlist.name} onPress={() => {
          const id = activeSetlist?.cid_;
          if (typeof id === 'number') void changeSetlist(client => client.renameSetlist(id, validateSetlistName(setlistRenameText)), 'Setlist renamed.')
            .then(success => { if (success) setSetlistOptionsOpen(false); });
        }} />
        <View style={styles.menuList}>
          {renderMenuRow({ key: 'duplicate-setlist', label: 'Duplicate setlist', disabled: libraryBusy || !activeSetlist || setlists.length >= MAX_SETLISTS,
            onPress: () => { if (activeSetlist) openNewSetlist(activeSetlist); } })}
          {([-1, 1] as const).map(direction => {
            const index = setlists.findIndex(item => item.cid_ === activeSetlist?.cid_);
            return renderMenuRow({ key: `move-setlist-${direction}`, label: direction < 0 ? 'Move setlist earlier' : 'Move setlist later',
              disabled: libraryBusy || index < 0 || !setlists[index + direction], onPress: () => {
                const id = activeSetlist?.cid_;
                if (typeof id === 'number') void changeSetlist(client => client.moveSetlist(id, direction), 'Setlist order updated.');
              } });
          })}
        </View>
        <Text style={libraryStyles.muted}>Setlists share presets. Editing a preset changes it everywhere it is used.</Text>
        {activeSetlist && activePresetRef?.ccid === activeSetlist.cid_ && <Text style={libraryStyles.muted}>Load a preset outside this setlist before deleting it.</Text>}
        <View style={styles.menuList}>
          {renderMenuRow({ key: 'delete-setlist', label: 'Delete setlist', danger: true, disabled: libraryBusy || !activeSetlist || activePresetRef?.ccid === activeSetlist.cid_, onPress: confirmDeleteSetlist })}
        </View>
      </ScrollView>
    </SetlistManagementSheet>
  </View>;

  const renderMatrixTab = () => (
    <ScrollView keyboardShouldPersistTaps="handled"
      style={styles.tabContent}
      contentContainerStyle={libraryStyles.content}
      showsVerticalScrollIndicator={false}
    >
      <LibraryHeading title="Matrix" focusKey="matrix" />
      <Text style={[libraryStyles.muted, { marginBottom: 20 }]}>Output levels from your Stadium. Adjust these on the device.</Text>
      <View style={{ gap: 16, marginBottom: 24 }}>
        <LibrarySegments label="Matrix output" options={MATRIX_LAYERS.map(layer => [String(layer.id), layer.label] as const)}
          value={String(selectedMatrixLayerId)} onChange={key => setSelectedMatrixLayerId(Number(key))} />
        <View style={styles.matrixStatusRow}>
          <Text style={styles.matrixStatusLabel}>Selected on device</Text>
          <Text style={styles.matrixStatusValue}>{attachedMatrixLayerLabel}</Text>
        </View>
        <LibraryButton label="Refresh levels" onPress={() => void refreshMatrixMixerContext()} />
      </View>
      <SettingsGroup title={selectedMatrixLayer?.label ?? 'Channels'}>
        {!selectedMatrixLayer ? (
          <Text style={styles.paramHint}>Sync after connecting to load Matrix Mixer levels.</Text>
        ) : (
          <View style={styles.matrixChannelList}>
            {selectedMatrixLayer.channels.map((channel) => {
              const muted = channel.mute === true;
              const solo = channel.solo === true;
              return (
                <View
                  key={`matrix-channel-${selectedMatrixLayer.id}-${channel.id}`}
                  accessible accessibilityLabel={`${channel.label}, ${muted ? 'muted' : 'open'}${solo ? ', solo' : ''}, level ${formatMatrixVolume(channel.volumeDb)}, pan ${formatMatrixPan(channel.pan)}`}
                  style={[styles.matrixChannelRow, { borderWidth: 0, borderRadius: 0, backgroundColor: 'transparent', padding: 16 }, windowDims.fontScale > 1.3 && { flexDirection: 'column', alignItems: 'stretch' }]}
                >
                  <View style={styles.matrixChannelMain}>
                    <Text style={styles.matrixChannelName} >{channel.label}</Text>
                    <View style={styles.matrixFlags}>
                      <Text style={[styles.matrixFlagText, muted && styles.matrixFlagTextActive]}>
                        {muted ? 'Muted' : 'Open'}
                      </Text>
                      {solo && <Text style={[styles.matrixFlagText, styles.matrixFlagTextActive]}>Solo</Text>}
                    </View>
                  </View>
                  <View style={styles.matrixValueGroup}>
                    <View style={styles.matrixValueCell}>
                      <Text style={styles.matrixValueLabel}>Level</Text>
                      <Text style={styles.matrixValueText}>{formatMatrixVolume(channel.volumeDb)}</Text>
                    </View>
                    <View style={styles.matrixValueCell}>
                      <Text style={styles.matrixValueLabel}>Pan</Text>
                      <Text style={styles.matrixValueText}>{formatMatrixPan(channel.pan)}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </SettingsGroup>
    </ScrollView>
  );

  const settingsMessage = settingsFeedback(status, { syncing: settingsSyncing, activity: !!libraryActivityLabel, preview: previewMode, connected });
  const syncFromSettings = async () => {
    const client = clientRef.current;
    if (!client || settingsSyncing) return;
    setSettingsSyncing(true);
    try { await handleFullSync(); }
    finally { if (clientRef.current === client) setSettingsSyncing(false); }
  };

  const renderSettingsTab = () => (
    <>
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.tabContent} contentContainerStyle={styles.settingsContent}>
        <View style={styles.settingsHeading}>
          <View style={styles.settingsFlex}><ScreenHeading maxFontSizeMultiplier={1.5} focusKey="settings" style={styles.settingsTitle}>Settings</ScreenHeading></View>
          <BrandMark size={32} />
        </View>

        <View style={styles.connectionSummary}>
          <View style={styles.connectionSummaryTop}>
            <View style={styles.settingsDeviceIcon}><UtilityIcon name="device" size={32} color={COLORS.text} /></View>
            <View style={styles.settingsFlex}>
              <Text style={styles.settingsDeviceName}>{previewMode ? 'Offline preview' : discoveredDevice?.name || host.replace(/\.local\.?$/i, '') || 'Your Stadium'}</Text>
              <View style={styles.settingsConnectionState}><View style={[styles.pillDot, { backgroundColor: connected && !previewMode ? COLORS.signal : COLORS.muted }]} />
                <Text style={styles.settingsHint}>{previewMode ? 'Sample preset · no device connected' : connected ? 'Connected to your Stadium' : 'Not connected'}</Text></View>
            </View>
          </View>
          <View style={styles.settingsConnectionActions}>
            {!previewMode && <Pressable disabled={connecting || blockBusy || showcaseBusy || settingsSyncing} onPress={() => void syncFromSettings()}
              accessibilityLabel={settingsSyncing ? "Syncing with the Stadium" : "Sync with the Stadium"} style={({ pressed }) => [styles.settingsSecondaryButton, pressed && styles.settingsPressed]}>
              <Text style={styles.settingsButtonText}>{settingsSyncing ? 'Syncing…' : 'Sync now'}</Text>
            </Pressable>}
            <Pressable onPress={disconnect}
              style={({ pressed }) => [styles.settingsSecondaryButton, pressed && styles.settingsPressed]}>
              <Text style={styles.settingsButtonText}>{previewMode ? 'Exit preview' : 'Disconnect'}</Text>
            </Pressable>
          </View>
          <Text accessibilityRole={settingsMessage.error ? 'alert' : 'text'} accessibilityLiveRegion="polite" style={settingsMessage.error ? styles.settingsError : styles.settingsHint}>{settingsMessage.text}</Text>
        </View>

        <SettingsGroup title="Stadium">
          <SettingsToggle label="Auto-Cab" hint="Add a matching cab with each amp" accessibilityLabel="Add a matching cab with each amp"
            value={autoCab} onChange={handleAutoCab} disabled={previewMode || blockBusy} />
          <SettingsRow label="Tempo" icon="tempo" value={`${formatTempoBpm(liveTempoBpm ?? globalTempoBpm)} BPM`} onPress={() => setSettingsPage('tempo')} />
          <SettingsRow label="Tuner remote" icon="tuner" value={`${tunerReferencePitch ?? 440} Hz`} onPress={() => setSettingsPage('tuner')} />
        </SettingsGroup>
        <SettingsGroup title="Editing">
          <SettingsToggle label="Background sync" hint="Pick up edits from the Stadium or desktop editor" value={autoSyncEnabled} onChange={setAutoSyncEnabled} />
          <SettingsToggle label="Source model names" hint="Show the original amp, cab and pedal names" accessibilityLabel="Show source model names" value={showRealBlockNames} onChange={setShowRealBlockNames} />
          <SettingsToggle label="Custom block labels" hint="Labels stay in this app" value={blockLabelMode} onChange={setBlockLabelMode} />
          <SettingsToggle label="Knob controls" hint="Use rotary knobs instead of sliders" value={controlStyle === 'knobs'} onChange={value => setControlStyle(value ? 'knobs' : 'sliders')} />
        </SettingsGroup>
        <SettingsGroup title="Preferences">
          <SettingsRow label="Display & accessibility" icon="accessibility" hint="Editor layout and screen-reader controls" onPress={() => setSettingsPage('accessibility')} />
          <SettingsRow label="Advanced" icon="sliders" onPress={() => setSettingsPage('advanced')} />
        </SettingsGroup>
        <View style={styles.settingsAbout}><Text style={styles.settingsGroupTitle}>Help & About</Text><AppInfo /></View>
      </ScrollView>
      <BottomSheet visible={settingsPage !== null} onClose={() => setSettingsPage(null)} title={settingsPage === 'tempo' ? 'Tempo' : settingsPage === 'tuner' ? 'Tuner remote' : settingsPage === 'advanced' ? 'Advanced' : 'Display & accessibility'}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.settingsSheetContent}>
          {settingsPage === 'accessibility' && <AccessibilitySettings showHeading={false} elevated />}
          {settingsPage === 'advanced' && <SettingsGroup elevated title="Processing" footer="Estimates are not measured CPU load. The device can still reject edits. Disconnecting restores the normal budget.">
            <SettingsToggle label="Extended DSP budget" hint={`Allow estimates up to ${EXTENDED_DSP_CAP} per path for this connection. May cause audio dropouts or instability.`}
              value={extendedDspEnabled} onChange={handleExtendedDsp} disabled={previewMode || blockBusy} />
          </SettingsGroup>}
          {settingsPage === 'tempo' && <>
            <View style={styles.settingsReadout}><Text maxFontSizeMultiplier={1.5} style={styles.settingsReadoutValue}>{formatTempoBpm(liveTempoBpm ?? globalTempoBpm)}<Text style={styles.settingsReadoutUnit}> BPM</Text></Text>
              <Text style={styles.settingsHint}>{tempoFollow ? 'Following external tempo' : 'Tap or nudge the tempo'}</Text></View>
            <View style={styles.settingsStepper}>
              {[-5, -1, 1, 5].map(delta => <Pressable key={delta} disabled={previewMode}
                accessibilityLabel={`${delta < 0 ? 'Decrease' : 'Increase'} tempo by ${Math.abs(delta)} BPM`}
                onPress={() => handleTempoAdjust(delta)} style={({ pressed }) => [styles.settingsStepButton, pressed && styles.settingsPressed, previewMode && styles.buttonDisabled]}>
                <Text style={styles.settingsButtonText}>{delta > 0 ? '+' : '−'}{Math.abs(delta)}</Text>
              </Pressable>)}
            </View>
            <Pressable disabled={previewMode} onPress={handleTapTempo} style={({ pressed }) => [tempoFollow ? styles.settingsSecondaryButton : styles.settingsPrimaryButton, pressed && { opacity: 0.8 }, previewMode && styles.buttonDisabled]}>
              <Text style={tempoFollow ? styles.settingsButtonText : styles.settingsPrimaryText}>Tap tempo</Text>
            </Pressable>
            <SettingsGroup elevated title="Tempo source"><SettingsToggle label="Follow external tempo" hint="Use the Stadium’s tempo source" value={Boolean(tempoFollow)} onChange={handleTempoFollowToggle} disabled={previewMode} /></SettingsGroup>
          </>}
          {settingsPage === 'tuner' && <>
            <View style={styles.settingsReadout}><Text maxFontSizeMultiplier={1.5} style={styles.settingsReadoutValue}>{tunerReferencePitch ?? 440}<Text style={styles.settingsReadoutUnit}> Hz</Text></Text>
              <Text style={styles.settingsHint}>{TUNER_REMOTE_NOTE}</Text></View>
            <View style={styles.settingsStepper}>
              {[-1, 1].map(delta => <Pressable key={delta} disabled={previewMode} accessibilityLabel={`${delta < 0 ? 'Decrease' : 'Increase'} reference pitch by 1 hertz`} onPress={() => handleTunerReferenceAdjust(delta)}
                style={({ pressed }) => [styles.settingsStepButton, pressed && styles.settingsPressed, previewMode && styles.buttonDisabled]}><Text style={styles.settingsButtonText}>{delta < 0 ? '−1' : '+1'} Hz</Text></Pressable>)}
            </View>
            <Pressable disabled={previewMode} onPress={() => handleOpenTuner('main')} style={({ pressed }) => [styles.settingsPrimaryButton, pressed && { opacity: 0.8 }, previewMode && styles.buttonDisabled]}><Text style={styles.settingsPrimaryText}>Open tuner on Stadium</Text></Pressable>
            <Pressable disabled={previewMode} onPress={handleExitTuner} style={styles.settingsSecondaryButton}><Text style={styles.settingsButtonText}>Close tuner on Stadium</Text></Pressable>
            <SettingsGroup elevated title="Tuner behaviour">
              <SettingsToggle label="Show in Stomp view" hint="Keep the tuner button in Stomp view" accessibilityLabel="Always show tuner in Stomp view" value={Boolean(tunerAlwaysOnStomp)} onChange={handleTunerAlwaysOnStompToggle} disabled={previewMode} />
              <SettingsToggle label="Show in Play view" hint="Keep the tuner button in Play view" accessibilityLabel="Always show tuner in Play view" value={Boolean(tunerAlwaysOnPlayView)} onChange={handleTunerAlwaysOnPlayViewToggle} disabled={previewMode} />
              <SettingsToggle label="Volume pedal opens tuner" hint="Open the tuner at heel-down" value={Boolean(tunerVolPedalOpens)} onChange={handleTunerVolPedalOpensToggle} disabled={previewMode} />
              <SettingsToggle label="Tuner trails" hint="Let delays and reverbs decay when the tuner opens" value={Boolean(tunerTrails)} onChange={handleTunerTrailsToggle} disabled={previewMode} />
              <SettingsToggle label="Per-string offsets" hint="Custom offsets for alternate tunings" accessibilityLabel="Per-string tuner offsets" value={Boolean(tunerOffsetsEnabled)} onChange={handleTunerOffsetsEnabledToggle} disabled={previewMode} />
            </SettingsGroup>
          </>}
          {previewMode && (settingsPage === 'tempo' || settingsPage === 'tuner' || settingsPage === 'advanced') && <Text style={styles.settingsHint}>Connect your Stadium to use these controls.</Text>}
        </ScrollView>
      </BottomSheet>
    </>
  );

  const renderPerformanceMode = () => {
    const displayedTempo = formatTempoBpm(liveTempoBpm ?? globalTempoBpm);
    const snapshotSummary =
      activeSnapshotIndex !== null
        ? `${activeSnapshotIndex + 1}. ${activeSnapshot?.name ?? `Snapshot ${activeSnapshotIndex + 1}`}`
        : 'No snapshot active';
    const canStepBackward = activePresetIndexInList > 0;
    const canStepForward = activePresetIndexInList >= 0 && activePresetIndexInList < presetItems.length - 1;
    const presetSlot = typeof activePresetRef?.posi === 'number' ? formatPresetPosition(activePresetRef.posi) : 'Live preset';
    const footswitch = (delta: -1 | 1) => {
      const enabled = delta < 0 ? canStepBackward : canStepForward;
      return (
        <Pressable accessibilityLabel={delta < 0 ? 'Previous preset' : 'Next preset'} disabled={presetSaving || !enabled}
          style={({ pressed }) => [styles.footswitch, pressed && styles.toolButtonPressed, !enabled && styles.stepButtonDisabled]}
          onPress={() => handlePerformancePresetStep(delta)}>
          {delta < 0 && <Svg width={22} height={22} viewBox="0 0 24 24" fill="none"><Path d="M15 18l-6-6 6-6" stroke={COLORS.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></Svg>}
          <Text maxFontSizeMultiplier={2} style={styles.footswitchText}>{delta < 0 ? 'Previous' : 'Next'}</Text>
          {delta > 0 && <Svg width={22} height={22} viewBox="0 0 24 24" fill="none"><Path d="M9 18l6-6-6-6" stroke={COLORS.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></Svg>}
        </Pressable>
      );
    };

    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.performanceSafe} edges={['top', 'left', 'right', 'bottom']}>
          <View style={styles.screenHeader}>
            <ScreenHeading focusKey="performance" maxFontSizeMultiplier={2} style={styles.screenTitle}>Perform</ScreenHeading>
            <Pressable accessibilityLabel="Done, leave Perform" style={({ pressed }) => [styles.textAction, pressed && styles.pressedQuiet]} onPress={() => setScreen('main')}>
              <Text maxFontSizeMultiplier={2} style={styles.textActionLabel}>Done</Text>
            </Pressable>
          </View>

          <ScrollView keyboardShouldPersistTaps="handled"
            style={styles.tabContent}
            contentContainerStyle={styles.performanceContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.performanceHero}>
              {activeSetlist && <Text style={styles.performanceHeroKicker} numberOfLines={accessibilityText ? undefined : 1}>{activeSetlist.name}</Text>}
              <Text style={[styles.performanceHeroTitle, accessibilityText && styles.performanceHeroTitleLarge]} numberOfLines={accessibilityText ? 3 : 2}>
                {activePresetName}
              </Text>
              <Text style={styles.performanceHeroMeta} numberOfLines={2}>{presetSlot} {'\u00b7'} {snapshotSummary}</Text>
            </View>
            <View style={[styles.footswitchRow, accessibilityText && styles.footswitchRowStacked]}>
              {footswitch(-1)}
              {footswitch(1)}
            </View>

            <PerformControls view={performView} onViewChange={setPerformView} banks={stompBanks}
              snapshots={snapshots} snapshotCount={snapshotCount} activeSnapshotIndex={activeSnapshotIndex}
              onSnapshot={handleSnapshotActivate} snapshotDisabled={presetSaving || presetCreating}
              onRefresh={() => void handleFullSync()}
              colorFor={value => SNAPSHOT_COLOR_OPTIONS.find(option => option.value === value)?.swatch ?? COLORS.stroke} />

            <View style={styles.performanceSection}>
              <Text accessibilityRole="header" style={styles.performanceSectionTitle}>Tempo</Text>
              <View style={[styles.performTempoRow, accessibilityText && styles.renameRowStacked]}>
                <Text style={styles.performTempoValue} accessibilityLabel={`Tempo ${displayedTempo} BPM`}>
                  {displayedTempo}<Text style={styles.performTempoUnit}> BPM</Text>
                </Text>
                <Pressable accessibilityLabel="Tap tempo" style={({ pressed }) => [styles.performTapButton, pressed && { opacity: 0.85 }]} onPress={handleTapTempo}>
                  <Text maxFontSizeMultiplier={2} style={styles.performTapText}>Tap</Text>
                </Pressable>
              </View>
              <View style={styles.joinedStepper}>
                {[-5, -1, 1, 5].map((delta, index) => (
                  <Pressable key={delta} accessibilityLabel={`${delta < 0 ? 'Decrease' : 'Increase'} tempo by ${Math.abs(delta)} BPM`}
                    style={({ pressed }) => [styles.joinedStepperCell, index > 0 && styles.joinedStepperDivider, pressed && styles.toolButtonPressed]}
                    onPress={() => handleTempoAdjust(delta)}>
                    <Text maxFontSizeMultiplier={2} style={styles.joinedStepperText}>{delta > 0 ? '+' : '\u2212'}{Math.abs(delta)}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {presetEdited && (
              <Pressable disabled={presetSaving} accessibilityState={{ busy: presetSaving }} onPress={() => { void handleSavePreset(); }}
                style={({ pressed }) => [styles.settingsPrimaryButton, pressed && { opacity: 0.85 }, presetSaving && styles.buttonDisabled]}>
                <Text style={styles.settingsPrimaryText}>{presetSaving ? 'Saving\u2026' : 'Save preset'}</Text>
              </Pressable>
            )}

            <SettingsGroup title="Live options">
              {[
                <SettingsToggle key="follow" label="Follow external tempo" value={Boolean(tempoFollow)} onChange={handleTempoFollowToggle} />,
                <SettingsToggle key="notes" label="Show notes on Helix" value={Boolean(notesVisible)} onChange={handleNotesToggle} />,
                <SettingsRow key="tuner" label="Tuner remote" icon="tuner" value={`${tunerReferencePitch ?? 440} Hz`} onPress={() => handleOpenTuner('performance')} />,
                presetEdited ? null : <SettingsRow key="sync" label="Sync now" icon="sync" disabled={presetSaving} onPress={() => { void handleFullSync(); }} />,
              ].filter(Boolean)}
            </SettingsGroup>

            <View style={styles.performanceSection}>
              <View style={styles.performanceSectionHeader}>
                <Text accessibilityRole="header" style={styles.performanceSectionTitle}>Presets</Text>
                <Text style={styles.performanceSectionMeta}>
                  {selectedContainerName}
                </Text>
              </View>
              {performancePresetWindow.length > 0 ? (
                <View style={styles.performancePresetGrid}>
                  {performancePresetWindow.map((item) => {
                    const active = isPresetActive(item);
                    return (
                      <Pressable accessibilityState={{ selected: active }} accessibilityLabel={`Load ${item.name ?? 'preset'}, position ${formatPresetPosition(item.posi)}`}
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
                          {formatPresetPosition(item.posi)}
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

  // Lock the parent ScrollView while a knob is being dragged so vertical drag
  // never doubles as page scroll. Also tracked by `knobDraggingRef` so an
  // in-flight sync doesn't race with the user's gesture.
  const handleKnobDragChange = useCallback((dragging: boolean) => {
    knobDraggingRef.current = dragging;
    setEditorScrollEnabled(!dragging);
  }, []);

  const openParamHelp = useCallback(
    (param: EditorParam, modelName: string | null) => {
      const body = getParamHelp(param);
      setParamHelp({
        title: param.name,
        subtitle: modelName ?? undefined,
        body: body ?? 'No help text is available for this parameter.',
      });
    },
    [],
  );

  /**
   * Help sheet is rendered both inside the full-screen block editor and at the
   * root tree, so it's reachable whether the editor is open or the user is on
   * one of the main tabs.
   */
  const renderParamHelpSheet = () => (
    <BottomSheet
      visible={paramHelp !== null}
      onClose={() => setParamHelp(null)}
      title={paramHelp?.title}
      subtitle={paramHelp?.subtitle}
    >
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.helpSheetBody}>
        <Text style={styles.helpSheetText}>{paramHelp?.body}</Text>
      </ScrollView>
    </BottomSheet>
  );

  const renderParamFields = (
    params: EditorParam[],
    values: Record<string, number | boolean> | undefined,
    onChange: (param: EditorParam, value: number | boolean) => void,
    emptyHint: string,
    blockColor?: string,
    _modelId: number | null = null,
    modelName: string | null = null,
    columns = 1,
  ) => {
    if (!params.length) {
      return <Text style={styles.paramHint}>{emptyHint}</Text>;
    }
    if (linearControls) return <View style={styles.sliderStack}>{params.map((param, index) => {
      const key = paramStateKey(param) ?? param.name;
      return <AccessibleParameter key={`${key}-${index}`} label={param.name} value={values?.[key] ?? param.def ?? 0}
        min={param.min} max={param.max} type={param.type} options={param.options} unit={param.unit}
        displayMin={param.display_min} displayMax={param.display_max} onChange={(value) => onChange(param, value)}
        helpAdornment={getParamHelp(param) ? <ParamHelpButton size={32} label={`Help for ${param.name}`} onPress={() => openParamHelp(param, modelName)} /> : undefined} />;
    })}</View>;
    // Booleans and short option lists always render as pills regardless of
    // control style — sliders don't make sense for hard "stop" values.
    const mainParams: Array<{ param: EditorParam; index: number }> = [];
    const toggleParams: Array<{ param: EditorParam; index: number }> = [];
    params.forEach((param, index) => {
      const options = param.options ?? null;
      if (param.type === 'b' && (!options || options.length <= 2)) {
        toggleParams.push({ param, index });
      } else if (options && options.length > 0 && options.length <= 3) {
        toggleParams.push({ param, index });
      } else {
        mainParams.push({ param, index });
      }
    });

    const accent = blockColor ?? COLORS.accent;
    const useSliders = linearControls || controlStyle === 'sliders';

    const renderHelpButton = (param: EditorParam, color: string) =>
      getParamHelp(param) ? (
        <ParamHelpButton
          label={`Help for ${param.name}`}
          accentColor={color}
          onPress={() => openParamHelp(param, modelName)}
        />
      ) : null;

    return (
      <View style={styles.paramContainer}>
        {/* Continuous numerics + long option lists */}
        {mainParams.length > 0 && (
          <View style={useSliders ? (columns > 1 ? styles.sliderGrid : styles.sliderStack) : styles.knobGrid}>
            {mainParams.map(({ param, index: paramIndex }) => {
              const paramKey = paramStateKey(param) ?? param.name ?? 'param';
              const rowKey = `${paramKey}-${paramIndex}`;
              const current = values?.[paramKey] ?? param.def ?? 0;
              const helpAdornment = renderHelpButton(param, useSliders ? COLORS.muted : accent);
              if (useSliders) {
                const slider = (
                  <ParamSlider
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
                    accentColor={accent}
                    onChange={(val) => onChange(param, val)}
                    onDragChange={handleKnobDragChange}
                    helpAdornment={helpAdornment}
                    rowHeight={isTablet ? 44 : 36}
                  />
                );
                return columns > 1
                  ? <View key={rowKey} style={{ width: `${100 / columns}%`, paddingRight: 28 }}>{slider}</View>
                  : slider;
              }
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
                  accentColor={accent}
                  onChange={(val) => onChange(param, val)}
                  onDragChange={handleKnobDragChange}
                  helpAdornment={helpAdornment}
                />
              );
            })}
          </View>
        )}
        {/* Toggle / short option pills */}
        {toggleParams.length > 0 && (
          <View style={styles.toggleSection}>
            {toggleParams.map(({ param, index: paramIndex }) => {
              const paramKey = paramStateKey(param) ?? param.name ?? 'param';
              const rowKey = `${paramKey}-${paramIndex}`;
              const current = values?.[paramKey] ?? param.def ?? 0;
              const options = param.options ?? null;
              const helpAdornment = renderHelpButton(param, COLORS.muted);
              if (param.type === 'b' && (!options || options.length <= 2)) {
                const isOn = typeof current === 'boolean' ? current : Number(current) > 0;
                const labels = options && options.length === 2 ? options : ['Off', 'On'];
                return (
                  <View key={rowKey} style={styles.toggleRow}>
                    <View style={styles.toggleLabelWrap}>
                      <Text style={styles.toggleLabel}>{param.name}</Text>
                      {helpAdornment}
                    </View>
                    <View style={[styles.toggleLabels, accessibilityText && styles.toggleLabelsStacked]}>
                      {labels.map((lbl, idx) => {
                        const val = idx > 0;
                        const active = val === isOn;
                        return (
                          <Pressable accessibilityState={{ selected: active }} accessibilityLabel={`${param.name}, ${lbl}`}
                            key={`${rowKey}-${idx}`}
                            style={[styles.togglePill, accessibilityText && styles.togglePillStacked, active && styles.togglePillActive]}
                            onPress={() => onChange(param, val)}
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
                  <View style={styles.toggleLabelWrap}>
                    <Text style={styles.toggleLabel}>{param.name}</Text>
                    {helpAdornment}
                  </View>
                  <View style={[styles.toggleLabels, accessibilityText && styles.toggleLabelsStacked]}>
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
                        <Pressable accessibilityState={{ selected: isActive }} accessibilityLabel={`${param.name}, ${optLabel}`}
                          key={`${rowKey}-${value}`}
                          style={[styles.togglePill, accessibilityText && styles.togglePillStacked, isActive && styles.togglePillActive]}
                          onPress={() => onChange(param, value)}
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
      COLORS.accent,
      activeIOModel?.modelId ?? null,
      activeIOModelMeta.name ?? null,
    );
  };

  const renderBlockParams = (columns = 1) => {
    if (!activeBlockMeta || !activeBlock) {
      return <Text style={styles.paramHint}>Long-press a block to edit its parameters.</Text>;
    }
    const blockColor = activeBlock.kind ? getBlockColor(activeBlock.kind) : COLORS.accent;
    return renderParamFields(
      activeBlockMeta.params,
      activeBlock.params,
      updateBlockParam,
      'This block has no editable parameters.',
      blockColor,
      activeBlock.id ?? null,
      activeBlockMeta.name ?? null,
      columns,
    );
  };

  const renderTunerScreen = () => (
    <SafeAreaProvider>
      <SafeAreaView style={styles.performanceSafe} edges={['top', 'left', 'right', 'bottom']}>
        <View style={[styles.screenHeader, styles.screenHeaderWithBack]}>
          <Pressable accessibilityLabel="Back from tuner remote" style={({ pressed }) => [styles.iconAction, pressed && styles.iconActionPressed]} onPress={closeTunerScreen}>
            <Svg width={22} height={22} viewBox="0 0 24 24" fill="none"><Path d="M15 18l-6-6 6-6" stroke={COLORS.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></Svg>
          </Pressable>
          <ScreenHeading focusKey="tuner" maxFontSizeMultiplier={2} style={styles.screenTitle}>Tuner remote</ScreenHeading>
        </View>

        <ScrollView keyboardShouldPersistTaps="handled"
          style={styles.tabContent}
          contentContainerStyle={styles.performanceContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.tunerHero}>
            <Text style={styles.performanceHeroKicker}>Reference pitch</Text>
            <View style={styles.pitchStepper}>
              <Pressable accessibilityLabel="Decrease reference pitch by 1 hertz" onPress={() => handleTunerReferenceAdjust(-1)}
                style={({ pressed }) => [styles.pitchStepperButton, pressed && styles.toolButtonPressed]}>
                <Text maxFontSizeMultiplier={2} style={styles.pitchStepperGlyph}>{'\u2212'}</Text>
              </Pressable>
              <View style={styles.pitchValueWrap}>
                <Text maxFontSizeMultiplier={2} style={styles.pitchValue}>{tunerReferencePitch ?? 440}<Text style={styles.pitchUnit}> Hz</Text></Text>
              </View>
              <Pressable accessibilityLabel="Increase reference pitch by 1 hertz" onPress={() => handleTunerReferenceAdjust(1)}
                style={({ pressed }) => [styles.pitchStepperButton, pressed && styles.toolButtonPressed]}>
                <Text maxFontSizeMultiplier={2} style={styles.pitchStepperGlyph}>+</Text>
              </Pressable>
            </View>
            <Text style={styles.tunerNote}>{TUNER_REMOTE_NOTE}</Text>
          </View>

          <View style={[styles.tunerActions, accessibilityText && styles.tunerActionsStacked]}>
            <Pressable onPress={() => handleOpenTuner(tunerReturnScreen)} style={({ pressed }) => [styles.tunerActionButton, styles.tunerActionPrimary, pressed && { opacity: 0.85 }]}>
              <Text maxFontSizeMultiplier={2} style={styles.settingsPrimaryText}>Open tuner</Text>
            </Pressable>
            <Pressable onPress={handleExitTuner} style={({ pressed }) => [styles.tunerActionButton, pressed && styles.toolButtonPressed]}>
              <Text maxFontSizeMultiplier={2} style={styles.settingsButtonText}>Close tuner</Text>
            </Pressable>
          </View>

          <SettingsGroup title="Tuner behaviour">
            <SettingsToggle label="Show in Stomp view" hint="Keep the tuner button in Stomp view" accessibilityLabel="Always show tuner in Stomp view" value={Boolean(tunerAlwaysOnStomp)} onChange={handleTunerAlwaysOnStompToggle} />
            <SettingsToggle label="Show in Play view" hint="Keep the tuner button in Play view" accessibilityLabel="Always show tuner in Play view" value={Boolean(tunerAlwaysOnPlayView)} onChange={handleTunerAlwaysOnPlayViewToggle} />
            <SettingsToggle label="Volume pedal opens tuner" hint="Open the tuner at heel-down" value={Boolean(tunerVolPedalOpens)} onChange={handleTunerVolPedalOpensToggle} />
            <SettingsToggle label="Tuner trails" hint="Let delays and reverbs decay when the tuner opens" value={Boolean(tunerTrails)} onChange={handleTunerTrailsToggle} />
            <SettingsToggle label="Per-string offsets" hint="Custom offsets for alternate tunings" accessibilityLabel="Per-string tuner offsets" value={Boolean(tunerOffsetsEnabled)} onChange={handleTunerOffsetsEnabledToggle} />
          </SettingsGroup>

          <View style={styles.tunerOffsetSection}>
            <Text accessibilityRole="header" style={styles.performanceSectionTitle}>String offsets</Text>
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
                      <Pressable accessibilityLabel={`Decrease string ${item.stringNumber} offset by one cent`}
                        style={styles.tunerOffsetAdjustButton}
                        disabled={tunerOffsetsEnabled !== true}
                        onPress={() => handleTunerStringOffsetAdjust(item.stringNumber, -1)}
                      >
                        <Text style={styles.tunerOffsetAdjustButtonText}>-1</Text>
                      </Pressable>
                      <Pressable accessibilityLabel={`Increase string ${item.stringNumber} offset by one cent`}
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
  // Every filled position in signal order, for stepping between blocks.
  const editableSlots = useMemo(() => {
    const slots: BlockSlot[] = [];
    ([0, 1, 2, 3] as PathIndex[]).forEach((path) => {
      grid[path]?.forEach((block, index) => {
        if (block) slots.push({ path, block: index as BlockSlot['block'] });
      });
    });
    return slots;
  }, [grid]);

  const stepBlock = (delta: -1 | 1) => {
    if (!blockEditorSlot) return;
    const index = editableSlots.findIndex((slot) => slot.path === blockEditorSlot.path && slot.block === blockEditorSlot.block);
    const next = editableSlots[index + delta];
    if (!next) return;
    setFocusOpen(false); setFocusExpanded(false);
    setSelectedSlot(next);
    setBlockEditorSlot(next);
  };

  // One block menu for long-press in the signal flow and the editor's options button.
  const renderSlotActionsSheet = () => {
    const target = slotMenuTarget;
    const block = target ? grid[target.path]?.[target.block] ?? null : null;
    const name = block ? getBlockDisplayName(block) : 'Block';
    const metaName = block ? getBlockMetaName(block) : null;
    const editingTarget = !!target && blockEditorOpen && blockEditorSlot?.path === target.path && blockEditorSlot?.block === target.block;
    const busy = focusBusy || blockBusy || presetSaving || presetCreating;
    const details = block && target ? [
      kindLabel(block.kind),
      !isRoutingModel(block.id) && metaName && metaName !== name && metaName.trim().toUpperCase() !== 'N/A' ? metaName : null,
      `Row ${rowLabels[target.path]}, position ${target.block + 1}`,
      typeof block.usage === 'number' ? `${block.usage.toFixed(1)}\u00a0DSP` : null,
    ].filter(Boolean).join(' · ') : undefined;
    const closeMenu = () => setSlotMenuOpen(false);
    return (
      <BottomSheet visible={slotMenuOpen} onClose={closeMenu} title={name} subtitle={details}>
        <ScrollView keyboardShouldPersistTaps="handled" automaticallyAdjustKeyboardInsets style={{ maxHeight: sheetListMaxHeight + 120 }}>
          {editingTarget && blockLabelMode && (
            <View style={styles.menuLabelEditor}>
              <Text style={styles.menuSectionTitle}>Block label</Text>
              <View style={[styles.renameRow, accessibilityText && styles.renameRowStacked]}>
                <TextInput
                  style={[styles.input, styles.inlineInput, styles.renameInput]}
                  accessibilityLabel="Block label"
                  value={blockLabelDraft}
                  onChangeText={setBlockLabelDraft}
                  placeholder={block?.modelName ?? block?.name}
                  placeholderTextColor={COLORS.muted}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
                <Pressable style={[styles.button, styles.buttonGhost, styles.inlineButton]}
                  onPress={() => { handleBlockLabelApply(); closeMenu(); }}>
                  <Text style={[styles.buttonText, styles.buttonTextGhost]}>{blockLabelDraft.trim() ? 'Apply' : 'Clear'}</Text>
                </Pressable>
              </View>
            </View>
          )}
          <View style={styles.menuList}>
            {!editingTarget && renderMenuRow({ key: 'edit', label: 'Edit parameters', icon: 'sliders', disabled: !block, onPress: () => {
              if (!target) return;
              setSlotMenuOpen(false);
              setBlockEditorSlot(target);
              setBlockEditorOpen(true);
              setSelectedSlot(target);
              if (!dockEditor) setScreen('editor');
            } })}
            {block && renderMenuRow({ key: 'change', label: 'Change model', disabled: busy, onPress: () => afterSheetClose(closeMenu, () => {
              if (!target) return;
              if (screen === 'editor') closeEditor();
              replaceSlotModel(target);
            }) })}
            {block && modelLookup.has(block.id) && renderMenuRow({ key: 'move', label: 'Move to another position…', disabled: busy,
              onPress: () => afterSheetClose(closeMenu, () => { if (target) openMove(target); }) })}
            {block && !isRoutingModel(block.id) && renderMenuRow({ key: 'copy', label: 'Copy settings to another position…', disabled: previewMode || busy,
              onPress: () => afterSheetClose(closeMenu, () => { if (target) void openBlockCopy(target); }) })}
          </View>
          {block && <>
            <View style={styles.menuGap} />
            <View style={styles.menuList}>
              {renderMenuRow({ key: 'remove', label: 'Remove block', danger: true, disabled: busy,
                onPress: () => afterSheetClose(closeMenu, () => { if (target) void clearSlot(target); }) })}
            </View>
          </>}
        </ScrollView>
      </BottomSheet>
    );
  };

  const renderBlockInspector = (docked: boolean) => {
    if (!activeBlock || !activeBlockMeta || !blockEditorSlot) return null;
    const isEnabled = activeBlock.enabled !== false;
    const appearance = getBlockAppearance(activeBlock.kind, isEnabled, docked ? COLORS.inspector : COLORS.bg);
    const color = appearance.accent;
    const blockImage = BLOCK_IMAGES[activeBlock.kind] ?? null;
    const displayName = getBlockDisplayName(activeBlock);
    const metaName = getBlockMetaName(activeBlock);
    const canFocus = focusKind(activeBlockMeta) !== null && activePresetContentId !== null && activeSnapshotIndex !== null && activeBlock.blockId !== undefined;
    const focusTarget: FocusTarget | null = canFocus ? {
      presetId: activePresetContentId!, snapshotIndex: activeSnapshotIndex!, flow: rowToFlow(blockEditorSlot.path),
      blockId: activeBlock.blockId!, modelId: activeBlockMeta.id,
    } : null;
    const focusListLayout = focusOpen && (linearControls || windowDims.fontScale > 1.3);
    const metaDetail = !isRoutingModel(activeBlock.id) && metaName && metaName !== displayName && metaName.trim().toUpperCase() !== 'N/A' ? metaName : null;
    const positionLabel = `Row ${rowLabels[blockEditorSlot.path]}, position ${blockEditorSlot.block + 1}`;
    // Phones show row and position in the block stepper; the docked header and list layout keep them in the subtitle.
    const showStepper = !docked && !linearControls;
    // Phones leave the DSP estimate to the block menu so the header only identifies the block.
    const subtitle = [
      kindLabel(activeBlock.kind),
      metaDetail,
      showStepper ? null : positionLabel,
      docked && typeof activeBlock.usage === 'number' ? `${activeBlock.usage.toFixed(1)} DSP` : null,
    ].filter(Boolean).join(' · ');
    const slotIndex = editableSlots.findIndex((slot) => slot.path === blockEditorSlot.path && slot.block === blockEditorSlot.block);
    const editBusy = focusBusy || blockBusy || presetSaving || presetCreating;
    const glyph = (size: number, tint: string) => blockImage ? (
      <Image source={blockImage} style={{ width: size, height: size, tintColor: tint }} resizeMode="contain" />
    ) : (
      <BlockIcon type={activeBlock.kind} size={size} color={tint} />
    );

    const chip = (
      <View style={[styles.inspectorChip, { backgroundColor: appearance.fill, borderColor: appearance.outline, borderStyle: appearance.outlineStyle }]}>
        {glyph(26, appearance.icon)}
      </View>
    );
    const titleStack = (
      <View style={styles.inspectorTitleStack}>
        <ScreenHeading focusKey={`editor-${blockEditorSlot.path}-${blockEditorSlot.block}`} style={styles.inspectorTitle}>{displayName}</ScreenHeading>
        <Text style={styles.inspectorSubtitle} numberOfLines={linearControls || accessibilityText ? undefined : 2}>{subtitle}</Text>
      </View>
    );
    // Phones drop the category box: a small tinted glyph leads the metadata line, and long names and models wrap.
    const phoneTitle = (
      <View style={[styles.phoneBlockTitleStack, styles.editorTitleStackAccessible]}>
        <ScreenHeading focusKey={`editor-${blockEditorSlot.path}-${blockEditorSlot.block}`} style={[styles.inspectorTitle, styles.editorBlockTitle]}>{displayName}</ScreenHeading>
      </View>
    );
    const phoneMetadata = (
        <View style={[styles.editorMetaRow, styles.editorMetaRowAccessible]}>
          <View style={styles.editorMetaGlyph} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">{glyph(16, color)}</View>
          <Text style={[styles.inspectorSubtitle, styles.editorMetaText]}>{subtitle}</Text>
        </View>
    );
    const powerButton = (
      <Pressable
        accessibilityRole="switch"
        accessibilityLabel={`${displayName} enabled`}
        accessibilityState={{ checked: isEnabled }}
        disabled={blockBusy || presetSaving || presetCreating}
        onPress={() => { void toggleBlockEnabled(blockEditorSlot); }}
        style={({ pressed }) => [
          docked ? styles.powerPill : styles.phoneBlockPower,
          docked && (isEnabled ? { backgroundColor: appearance.fill, borderColor: color } : styles.powerPillOff),
          pressed && styles.toolButtonPressed,
        ]}
      >
        <View style={[styles.powerDot, { backgroundColor: isEnabled ? color : COLORS.faint }]} />
        <Text maxFontSizeMultiplier={2} style={[styles.powerText, !isEnabled && { color: COLORS.muted }]}>{isEnabled ? 'On' : 'Bypassed'}</Text>
      </Pressable>
    );
    // Move, copy, change model, label and remove share the block menu used by long-press in the signal flow.
    const menuButton = (
      <Pressable accessibilityLabel={`${displayName} options`} disabled={editBusy}
        style={({ pressed }) => [styles.iconAction, pressed && styles.iconActionPressed, editBusy && styles.stepButtonDisabled]}
        onPress={() => openSlotMenu(blockEditorSlot)}>
        <UtilityIcon name="more" size={22} color={COLORS.text} />
      </Pressable>
    );
    const atFirst = slotIndex <= 0;
    const atLast = slotIndex < 0 || slotIndex >= editableSlots.length - 1;
    const stepper = (
      <View style={[styles.stepperTrack, accessibilityText && styles.stepperTrackStacked]}>
        <Pressable accessibilityLabel="Previous block" disabled={focusBusy || atFirst}
          style={({ pressed }) => [styles.stepperCell, pressed && styles.toolButtonPressed, atFirst && styles.stepButtonDisabled]}
          onPress={() => stepBlock(-1)}>
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <Path d="M15 18l-6-6 6-6" stroke={COLORS.text} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </Pressable>
        <View style={styles.stepperLabel} accessible accessibilityLabel={positionLabel}>
          <Text maxFontSizeMultiplier={2} style={styles.stepperLabelText}>{rowLabels[blockEditorSlot.path]} · {blockEditorSlot.block + 1}</Text>
        </View>
        <Pressable accessibilityLabel="Next block" disabled={focusBusy || atLast}
          style={({ pressed }) => [styles.stepperCell, pressed && styles.toolButtonPressed, atLast && styles.stepButtonDisabled]}
          onPress={() => stepBlock(1)}>
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <Path d="M9 18l6-6-6-6" stroke={COLORS.text} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </Pressable>
      </View>
    );
    const viewTab = (focus: boolean, label: string) => {
      const selected = focusOpen === focus;
      return (
        <Pressable key={label} accessibilityRole="tab" accessibilityState={{ selected }} disabled={editBusy}
          style={[styles.segmentItem, !docked && styles.segmentItemFill]} onPress={() => { setFocusOpen(focus); if (!focus) setFocusExpanded(false); }}>
          <View style={[styles.segmentPill, selected && styles.segmentItemActive]}>
            <Text maxFontSizeMultiplier={2} style={[styles.segmentItemText, selected && styles.segmentItemTextActive]}>{label}</Text>
          </View>
        </Pressable>
      );
    };
    const viewTabs = canFocus ? (
      <View accessibilityRole="tablist" style={[styles.segmentTrack, !docked && styles.segmentTrackFill, focusListLayout && styles.segmentTrackStacked]}>
        {viewTab(false, 'Parameters')}
        {viewTab(true, 'Focus View')}
      </View>
    ) : null;

    // Docked headers scroll at accessibility sizes; phone headers also scroll in landscape.
    const headerInScroll = docked ? accessibilityText : scrollChrome;
    // At accessibility sizes the full preset name and status scroll with the editor.
    const saveInScroll = !docked && accessibilityText;
    const backLabel = linearControls || phoneFlowView === 'list' ? 'Back to list' : 'Back to grid';
    const phoneNavigation = (
      <View style={styles.editorTopRow}>
        <Pressable accessibilityLabel={backLabel} disabled={editBusy}
          style={({ pressed }) => [styles.editorReturn, pressed && styles.iconActionPressed, editBusy && styles.stepButtonDisabled]}
          onPress={() => { setFocusOpen(false); setFocusExpanded(false); closeEditor(); }}>
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Path d="M15 18l-6-6 6-6" stroke={COLORS.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
          <Text maxFontSizeMultiplier={2} style={styles.editorReturnText}>{backLabel}</Text>
        </Pressable>
        <View style={styles.flexSpacer} />
        {menuButton}
      </View>
    );
    const header = docked ? (
      <View style={styles.inspectorHeader}>
        {chip}
        {titleStack}
        {viewTabs}
        <View style={styles.inspectorTools}>
          {focusOpen && canFocus && <Pressable accessibilityRole="button" accessibilityLabel={expandedFocus ? 'Restore Focus View and show signal chain' : 'Expand Focus View'}
            accessibilityState={{ expanded: expandedFocus }} style={styles.toolButton} onPress={() => setFocusExpanded(!expandedFocus)}>
            <Text style={styles.toolButtonText}>{expandedFocus ? 'Restore' : 'Expand'}</Text>
          </Pressable>}
          {powerButton}{menuButton}
        </View>
      </View>
    ) : (
      <>
        <View style={styles.editorAccessibleTitle}>{phoneTitle}</View>
        {phoneMetadata}
        <View style={[styles.editorToolRow, accessibilityText && styles.editorToolRowStacked, !saveInScroll && styles.editorToolRowDivided]}>
          {powerButton}
          {showStepper && !accessibilityText && <View style={styles.flexSpacer} />}
          {showStepper && stepper}
        </View>
        {saveInScroll && renderPresetSaveBar()}
      </>
    );

    const body = (
      <ScrollView
        style={styles.tabContent}
        contentContainerStyle={docked ? styles.inspectorParamPad : styles.editorParamPad}
        showsVerticalScrollIndicator={false}
        scrollEnabled={editorScrollEnabled}
        keyboardShouldPersistTaps="handled"
      >
        {headerInScroll && <View style={docked ? styles.inspectorHeaderBleed : styles.editorHeaderBleed}>{header}</View>}
        {isRoutingModel(activeBlock.id) && <RoutingControls
          modelId={activeBlock.id} row={rowLabels[blockEditorSlot.path + 1] ?? 'B'}
          linkPosition={activeBlock.linkPosition} choices={routingLinkChoices(grid, blockEditorSlot)} disabled={blockBusy || presetSaving || presetCreating}
          onType={id => {
            const model = blockCatalog.routing.models.find(item => item.id === id);
            if (model && id !== activeBlock.id) void insertModel(model, 'routing', blockEditorSlot);
          }}
          onLink={position => { void handleRoutingLink(blockEditorSlot, position); }}
        />}
        {activePresetContentId !== null && activeSnapshotIndex !== null && activeBlock.blockId !== undefined && <View style={{ alignSelf: 'flex-start', marginBottom: 12 }}>
          <LibraryButton label="Snapshot controls" icon="snapshots" disabled={previewMode || editBusy}
            onPress={() => setSnapshotAssignmentTarget({ presetId: activePresetContentId, snapshotIndex: activeSnapshotIndex,
              flow: rowToFlow(blockEditorSlot.path), blockId: activeBlock.blockId!, modelId: activeBlockMeta.id,
              name: displayName, params: activeBlockMeta.params })} />
        </View>}
        {focusListLayout && <ScreenHeading focusKey={`focus-${blockEditorSlot.path}-${blockEditorSlot.block}`} style={styles.editorTitle}>{displayName}</ScreenHeading>}
        {!docked && viewTabs}
        {focusOpen && focusTarget ? <FocusView
          key={`${focusTarget.presetId}-${focusTarget.snapshotIndex}-${focusTarget.flow}-${focusTarget.blockId}-${focusTarget.modelId}`}
          model={activeBlockMeta}
          read={async () => {
            const client = requireClient();
            if (!client || await client.getActivePresetContentId() !== focusTarget.presetId) throw new Error('The preset changed. Sync and reopen Focus View.');
            const values = readFocusValues(await client.getEditBufferState(), focusTarget);
            if (await client.getActivePresetContentId() !== focusTarget.presetId) throw new Error('The preset changed. Sync and reopen Focus View.');
            return values;
          }}
          apply={async (changes: FocusChange[]) => {
            if (presetSaveOperation.current || creationPending.current) throw new Error('Wait for the preset to finish saving before adjusting Focus View.');
            const client = requireClient();
            if (!client) throw new Error('Reconnect to the Stadium before adjusting Focus View.');
            const values = await client.applyFocus(focusTarget, changes);
            if (clientRef.current !== client) throw new Error('The connection changed. Reopen Focus View after reconnecting.');
            const focusParams = getFocusDefinition(activeBlockMeta.id)?.params ?? activeBlockMeta.params;
            const keyed = Object.fromEntries(focusParams.filter(param => param.id !== null && values[param.id] !== undefined).map(param => [param.key, values[param.id!]]));
            setGrid(previous => {
              const next = cloneGrid(previous);
              const block = next[blockEditorSlot.path]?.[blockEditorSlot.block];
              if (block?.blockId === focusTarget.blockId && block.id === focusTarget.modelId) block.params = { ...block.params, ...keyed };
              return next;
            });
            return values;
          }}
          onBusy={busy => {
            focusWrites.current = Math.max(0, focusWrites.current + (busy ? 1 : -1));
            setFocusBusy(focusWrites.current > 0);
            if (!busy) scheduleSync(150, { full: true, silent: true });
          }}
          onDrag={handleKnobDragChange}
        /> : renderBlockParams(docked ? (isLandscape ? 3 : 2) : 1)}
      </ScrollView>
    );

    return (
      <>
        {!docked && phoneNavigation}
        {!headerInScroll && header}
        {body}
      </>
    );
  };

  const renderSnapshotAssignments = () => {
    const target = snapshotAssignmentTarget;
    return <SnapshotAssignmentsSheet identity={target ? `${target.presetId}:${target.flow}:${target.blockId}:${target.modelId}:${target.snapshotIndex}` : null}
      name={target?.name ?? ''} parameters={(target?.params ?? []).filter(param => param.id !== null && !param.harness && !param.faux && !param.property_key)
        .map(param => ({ id: param.id!, name: param.name, type: param.type }))}
      read={async () => {
        const client = requireClient();
        if (!client || !target) throw new Error('Reconnect to the Stadium and reopen Snapshot controls.');
        const values = await client.getSnapshotParameterAssignments(target);
        if (clientRef.current !== client) throw new Error('The connection changed. Reopen Snapshot controls.');
        return values;
      }}
      change={async (id, assigned, type) => {
        if (presetSaveOperation.current || creationPending.current) throw new Error('Wait for the current save to finish.');
        const client = requireClient();
        if (!client || !target) throw new Error('Reconnect to the Stadium and reopen Snapshot controls.');
        try {
          const values = await client.setSnapshotParameterAssignment(target, id, assigned, type);
          if (clientRef.current !== client) throw new Error('The connection changed. Reopen Snapshot controls.');
          setPresetEdited(true); setPresetSaved(false);
          return values;
        } catch (error) {
          if (clientRef.current === client) { setPresetEdited(null); setPresetSaved(false); }
          throw error;
        } finally {
          if (clientRef.current === client) scheduleSync(150, { full: true, silent: true });
        }
      }} onClose={() => setSnapshotAssignmentTarget(null)} />;
  };

  const renderEditor = () => {
    if (!activeBlock || !activeBlockMeta || !blockEditorSlot) return null;
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.safe} edges={accessibilityText ? ['top', 'left', 'right', 'bottom'] : ['top', 'left', 'right']}>
          {renderBlockInspector(false)}
          {!accessibilityText && renderPresetSaveBar('bottom')}
          {renderSlotActionsSheet()}
          {renderParamHelpSheet()}
          {renderSnapshotAssignments()}
        </SafeAreaView>
      </SafeAreaProvider>
    );
  };

  useEffect(() => {
    if (!screenReader || /^(Synced|Syncing|Ready|Disconnected)$/.test(status)) return;
    // The block list announces completed moves while restoring focus.
    if (/^Moved .+ to path [12][AB], position \d+$/.test(status)) return;
    const timer = setTimeout(() => announce(status), 350);
    return () => clearTimeout(timer);
  }, [status, screenReader]);

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
        port={discoveredDevice?.host === host.trim() ? discoveredDevice.port : 2001}
        onHostChange={value => { setHost(value); setDiscoveredDevice(null); }}
        onDeviceSelect={device => { setHost(device.host); setDiscoveredDevice(device); }}
        selectedDevice={discoveredDevice}
        transport={connectionTransport}
        onTransportChange={setConnectionTransport}
        onConnect={connect}
        onPreview={startPreview}
        connecting={connecting}
        status={status}
      />
    );
  }

  const snapshotChips = Array.from({ length: Math.min(8, snapshotCount) }, (_, index) => {
    const snapshot = snapshots.find((item) => item.index === index);
    const color = SNAPSHOT_COLOR_OPTIONS.find((option) => option.value === snapshot?.colr)?.swatch ?? SNAPSHOT_COLOR_OPTIONS[0].swatch;
    return { index, name: snapshot?.name?.trim() || `Snapshot ${index + 1}`, color };
  });

  const renderTopBar = () => {
    const canStepBackward = activePresetIndexInList > 0;
    const canStepForward = activePresetIndexInList >= 0 && activePresetIndexInList < presetItems.length - 1;
    const busy = presetSaving || presetCreating || showcaseBusy || blockBusy;
    const saveDisabled = previewMode || !connected || !activePresetRef || presetCreating || focusBusy || showcaseBusy || presetSaving || blockBusy;
    const slotLabel = formatPresetPosition(activePresetRef?.posi);
    const presetLabel = `${slotLabel} ${activePresetName}`;
    const tempo = formatTempoBpm(liveTempoBpm ?? globalTempoBpm);
    const stepPreset = (delta: -1 | 1) => {
      if (busy || (delta < 0 ? !canStepBackward : !canStepForward)) return;
      handlePerformancePresetStep(delta);
    };
    const chevron = (direction: 'left' | 'right') => (
      <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
        <Path d={direction === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} stroke={COLORS.text} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    );
    const titleButton = (
      <Pressable accessibilityLabel={`Preset ${presetLabel}${presetEdited ? ', unsaved changes' : ''}. Open presets`}
        accessibilityActions={[{ name: 'previousPreset', label: 'Previous preset' }, { name: 'nextPreset', label: 'Next preset' }]}
        onAccessibilityAction={({ nativeEvent }) => {
          if (nativeEvent.actionName === 'previousPreset') stepPreset(-1);
          if (nativeEvent.actionName === 'nextPreset') stepPreset(1);
        }}
        style={({ pressed }) => [styles.topPresetName, !isTablet && styles.topPresetNamePhone, pressed && (isTablet ? styles.toolButtonPressed : styles.pressedQuiet)]}
        onPress={() => handleTabChange('preset')}>
        <Text maxFontSizeMultiplier={2} style={styles.topPresetSlot}>{slotLabel}</Text>
        <Text maxFontSizeMultiplier={2} style={styles.topPresetTitle} numberOfLines={accessibilityText ? 2 : 1}>{activePresetName}</Text>
        {presetEdited ? <View style={styles.editedDot} /> : null}
        {!isTablet && <UtilityIcon name="chevron" size={14} color={COLORS.muted} />}
      </Pressable>
    );
    const saveButton = (
      <Pressable accessibilityLabel={`Save ${activePresetName} to the Stadium`} accessibilityState={{ busy: presetSaving }}
        disabled={saveDisabled} onPress={() => { void handleSavePreset(); }}
        style={({ pressed }) => [styles.saveButton, !presetEdited && styles.saveButtonQuiet, saveDisabled && styles.stepButtonDisabled, pressed && { opacity: 0.85 }]}>
        <Text maxFontSizeMultiplier={2} style={[styles.saveButtonText, !presetEdited && styles.saveButtonTextQuiet]}>
          {presetSaving ? 'Saving…' : presetSaved && !presetEdited ? 'Saved' : 'Save'}
        </Text>
      </Pressable>
    );
    const syncIcon = <UtilityIcon name="sync" size={18} color={COLORS.muted} />;

    if (!isTablet) {
      const presetStepper = (
        <View style={styles.stepperTrack}>
          <Pressable accessibilityLabel="Previous preset" disabled={busy || !canStepBackward}
            style={({ pressed }) => [styles.stepperCell, pressed && styles.toolButtonPressed, !canStepBackward && styles.stepButtonDisabled]}
            onPress={() => handlePerformancePresetStep(-1)}>
            {chevron('left')}
          </Pressable>
          <View style={styles.stepperDivider} />
          <Pressable accessibilityLabel="Next preset" disabled={busy || !canStepForward}
            style={({ pressed }) => [styles.stepperCell, pressed && styles.toolButtonPressed, !canStepForward && styles.stepButtonDisabled]}
            onPress={() => handlePerformancePresetStep(1)}>
            {chevron('right')}
          </Pressable>
        </View>
      );
      // The Helix TAP switch shows the tempo it sets, so the readout is the tap target.
      const tempoButton = (
        <Pressable accessibilityLabel="Tap tempo" accessibilityValue={{ text: `${tempo} BPM` }} accessibilityHint="Tap in time to set the tempo"
          disabled={!connected} onPress={handleTapTempo}
          style={({ pressed }) => [styles.tempoTapButton, pressed && styles.toolButtonPressed, !connected && styles.stepButtonDisabled]}>
          <Text maxFontSizeMultiplier={2} style={styles.tempoTapCaption}>TAP</Text>
          <View style={styles.tempoReadout}>
            <Text maxFontSizeMultiplier={2} style={styles.tempoValue} numberOfLines={1}>{tempo}</Text>
            <Text maxFontSizeMultiplier={2} style={styles.tempoUnitCompact}>BPM</Text>
          </View>
        </Pressable>
      );
      const tunerButton = (
        <Pressable style={({ pressed }) => [styles.textAction, styles.pushEnd, pressed && styles.pressedQuiet]} onPress={() => openTunerScreen('main')}>
          <Text maxFontSizeMultiplier={2} style={styles.toolButtonText}>Tuner</Text>
        </Pressable>
      );
      const moreButton = (
        <Pressable accessibilityLabel="More preset tools" style={({ pressed }) => [styles.iconAction, pressed && styles.iconActionPressed]}
          onPress={() => setPresetToolsOpen(true)}>
          <UtilityIcon name="more" size={22} color={COLORS.text} />
        </Pressable>
      );
      if (phoneLandscape && !accessibilityText) {
        return (
          <View style={styles.topBarPhone}>
            <View style={styles.topRowA}>{titleButton}{presetStepper}{tempoButton}{!largeText && tunerButton}{moreButton}{saveButton}</View>
          </View>
        );
      }
      return (
        <View style={styles.topBarPhone}>
          <View style={styles.topRowA}>{titleButton}{saveButton}</View>
          {accessibilityText ? (
            <>
              <View style={styles.topRowB}>{presetStepper}<View style={styles.flexSpacer} />{moreButton}</View>
              <View style={styles.topRowB}>{tempoButton}</View>
            </>
          ) : (
            <View style={styles.topRowB}>{presetStepper}{tempoButton}{largeText ? <View style={styles.flexSpacer} /> : tunerButton}{moreButton}</View>
          )}
        </View>
      );
    }

    // Wide tablets fit one row; otherwise the preset and the tools each get a full row that never wraps.
    const tabletSingleRow = windowDims.width >= 1100 && !largeText;
    const presetRow = (
      <View style={[styles.topPreset, !tabletSingleRow && styles.topRowFull]}>
        <Pressable accessibilityLabel="Previous preset" disabled={busy || !canStepBackward}
          style={({ pressed }) => [styles.topIconButton, pressed && styles.toolButtonPressed, !canStepBackward && styles.stepButtonDisabled]}
          onPress={() => handlePerformancePresetStep(-1)}>
          {chevron('left')}
        </Pressable>
        {titleButton}
        <Pressable accessibilityLabel="Next preset" disabled={busy || !canStepForward}
          style={({ pressed }) => [styles.topIconButton, pressed && styles.toolButtonPressed, !canStepForward && styles.stepButtonDisabled]}
          onPress={() => handlePerformancePresetStep(1)}>
          {chevron('right')}
        </Pressable>
        {saveButton}
      </View>
    );
    const tools = (
      <View style={[styles.topTools, !tabletSingleRow && styles.topRowFull]}>
        <View style={styles.tempoGroup}>
          <Text maxFontSizeMultiplier={2} style={styles.tempoValue} accessibilityLabel={`Tempo ${tempo} BPM`}>{tempo}</Text>
          <Text maxFontSizeMultiplier={2} style={styles.tempoUnit} importantForAccessibility="no">BPM</Text>
          <Pressable accessibilityLabel="Tap tempo" disabled={!connected}
            style={({ pressed }) => [styles.tempoTap, pressed && styles.toolButtonPressed]} onPress={handleTapTempo}>
            <Text maxFontSizeMultiplier={2} style={styles.toolButtonText}>Tap</Text>
          </Pressable>
        </View>
        <Pressable style={({ pressed }) => [styles.toolButton, pressed && styles.toolButtonPressed]} onPress={() => openTunerScreen('main')}>
          <Text maxFontSizeMultiplier={2} style={styles.toolButtonText}>Tuner</Text>
        </Pressable>
        {!accessibilityText && <Pressable disabled={showcaseBusy} style={({ pressed }) => [styles.toolButton, pressed && styles.toolButtonPressed]} onPress={() => openPerform(performView)}>
          <Text maxFontSizeMultiplier={2} style={styles.toolButtonText}>Perform</Text>
        </Pressable>}
        <Pressable accessibilityLabel={`Connection settings, ${connected ? 'connected to ' + host : 'disconnected'}`}
          style={({ pressed }) => [styles.statusButton, styles.statusButtonEnd, pressed && styles.toolButtonPressed]} onPress={() => handleTabChange('settings')}>
          <View style={[styles.pillDot, { backgroundColor: connected ? COLORS.signal : COLORS.danger }]} />
          <Text maxFontSizeMultiplier={2} style={styles.statusButtonText} numberOfLines={1}>{previewMode ? 'Preview' : connected ? host : 'Offline'}</Text>
        </Pressable>
        {accessibilityText ? (
          <Pressable accessibilityLabel="More preset tools" style={({ pressed }) => [styles.iconAction, pressed && styles.iconActionPressed]}
            onPress={() => setPresetToolsOpen(true)}>
            <UtilityIcon name="more" size={22} color={COLORS.text} />
          </Pressable>
        ) : (
          <Pressable accessibilityLabel="Sync with the Stadium" disabled={showcaseBusy}
            style={({ pressed }) => [styles.topIconButton, styles.topIconQuiet, pressed && styles.toolButtonPressed]} onPress={() => void handleFullSync()}>
            {syncIcon}
          </Pressable>
        )}
      </View>
    );
    return (
      <View style={[styles.topBar, styles.topBarWide, !tabletSingleRow && styles.topBarStacked]}>
        {presetRow}
        {tools}
      </View>
    );
  };

  // Preview limits stay visible in one compact strip; the full explanation is a tap away.
  const previewBanner = previewMode ? (
    <View style={[styles.previewBanner, isTablet && styles.previewBannerWide]}>
      <Pressable accessibilityLabel="Preview. Sample preset, no Stadium connected, edits are not saved. Show details"
        style={({ pressed }) => [styles.previewStatus, accessibilityText && styles.previewStatusStacked, pressed && styles.pressedQuiet]}
        onPress={() => setPreviewInfoOpen(true)}>
        <View style={styles.previewStatusLine}>
          <View style={[styles.pillDot, { backgroundColor: COLORS.warn }]} />
          <Text maxFontSizeMultiplier={2} style={styles.previewBannerTitle}>Preview</Text>
          {accessibilityText && <UtilityIcon name="help" size={18} color={COLORS.muted} />}
        </View>
        <Text maxFontSizeMultiplier={2} style={styles.previewBannerText} numberOfLines={accessibilityText ? 2 : 1}>Edits aren’t saved</Text>
        {!accessibilityText && <UtilityIcon name="help" size={18} color={COLORS.muted} />}
      </Pressable>
      <Pressable accessibilityLabel="Exit preview" style={({ pressed }) => [styles.textAction, pressed && styles.pressedQuiet]} onPress={disconnect}>
        <Text maxFontSizeMultiplier={2} style={styles.toolButtonText}>Exit</Text>
      </Pressable>
    </View>
  ) : null;

  const visualChrome = (
    <>
      {renderTopBar()}
      {activeTab === 'flow' && snapshotChips.length > 0 && (
        <View style={[styles.snapshotBar, isTablet && styles.snapshotBarWide]}>
          <SnapshotStrip
            snapshots={snapshotChips}
            activeIndex={activeSnapshotIndex}
            disabled={presetSaving || presetCreating || blockBusy}
            columns={isTablet ? (isLandscape ? 8 : 4) : undefined}
            onActivate={handleSnapshotActivate}
          />
        </View>
      )}
    </>
  );

  const linearChrome = (
    <>
      <View style={[styles.appBar, styles.appBarStacked]}>
        <ScreenHeading focusKey={activeTab} style={styles.appTitle}>{({ flow: 'Signal flow', preset: 'Presets', setlists: 'Library', matrix: 'Matrix mixer', settings: 'Settings' }[activeTab])}</ScreenHeading>
        <View style={[styles.appBarActions, accessibilityText && styles.appBarActionsStacked]}>
          <Pressable style={styles.toolButton} disabled={showcaseBusy} onPress={() => void handleFullSync()} accessibilityLabel="Sync">
            <Text style={styles.toolButtonText}>Sync</Text>
          </Pressable>
          <Pressable disabled={showcaseBusy} style={styles.toolButton} onPress={() => openPerform(performView)}>
            <Text style={styles.toolButtonText}>Perform</Text>
          </Pressable>
          <Pressable accessibilityLabel={`Connection settings, ${connected ? 'connected to ' + host : 'disconnected'}`} style={[styles.statusButton, !accessibilityText && styles.statusButtonEnd]} onPress={() => handleTabChange('settings')}>
            <View style={[styles.pillDot, { backgroundColor: connected ? COLORS.signal : COLORS.danger }]} />
            <Text style={styles.statusButtonText} numberOfLines={accessibilityText ? undefined : 1}>{connected ? host : 'Offline'}</Text>
          </Pressable>
        </View>
      </View>
      <Text style={styles.accessibilityStatus}>{libraryActivityLabel ?? status}</Text>
      {renderPresetSaveBar()}
      <Pressable disabled={showcaseBusy} accessibilityLabel={`Open snapshots${activeSnapshot?.name ? ', active snapshot ' + activeSnapshot.name : ''}`}
        onPress={() => openPerform('snapshots')} style={styles.snapshotShortcut}>
        <Text style={styles.snapshotShortcutTitle}>Snapshots</Text>
        <Text style={styles.snapshotShortcutValue}>
          {activeSnapshotIndex !== null ? `${activeSnapshotIndex + 1}. ${activeSnapshot?.name ?? 'Snapshot ' + (activeSnapshotIndex + 1)}` : 'View snapshots'}
        </Text>
        <Text style={styles.snapshotShortcutTitle}>{'›'}</Text>
      </Pressable>
    </>
  );
  const flowChrome = linearControls ? linearChrome : visualChrome;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <View style={[styles.shell, useNavRail && styles.shellRow]}>
          {useNavRail && <TabBar variant="rail" activeTab={activeTab} onTabChange={handleTabChange} connected={connected} />}
          <View style={styles.shellMain}>
            {previewBanner}
            {activeTab === 'flow' && !expandedFocus && (dockEditor || !scrollChrome) && flowChrome}

            {/* ── Tab content ──────────────────────────────────────── */}
            {activeTab === 'flow' && renderFlowTab()}
            {activeTab === 'preset' && renderPresetTab()}
            {activeTab === 'setlists' && renderSetlistsTab()}
            {activeTab === 'matrix' && renderMatrixTab()}
            {activeTab === 'settings' && renderSettingsTab()}
          </View>
        </View>

        <CreatePresetSheet position={createPosition} slots={createSlots} busy={presetCreating} error={createError}
          sourceName={duplicateSource?.name ?? (duplicateSource ? 'Preset' : undefined)}
          actionTitle={presetActionTarget?.name ?? 'Preset'} actionSubtitle={typeof presetActionTarget?.posi === 'number' ? `Slot ${formatPresetPosition(presetActionTarget.posi)}` : undefined}
          actions={presetActionTarget ? (
          <ScrollView keyboardShouldPersistTaps="handled" automaticallyAdjustKeyboardInsets style={{ maxHeight: sheetListMaxHeight + 120 }}>
            {presetActionTarget && <View style={styles.menuList}>
              {renderMenuRow({ key: 'duplicate', label: 'Duplicate preset', disabled: presetCreating || presetSaving || libraryBusy,
                onPress: () => { void openPresetCreation(undefined, presetActionTarget); } })}
            </View>}
            {presetActionTarget && isPresetActive(presetActionTarget) && activePresetStorageId !== null && (
              <View style={[styles.renameRow, accessibilityText && styles.renameRowStacked]}>
                <TextInput accessibilityLabel="Preset name"
                  style={[styles.input, styles.inlineInput, styles.renameInput]}
                  value={presetRenameText}
                  onChangeText={setPresetRenameText}
                  placeholder="Rename preset"
                  placeholderTextColor={COLORS.muted}
                />
                <Pressable
                  style={[styles.button, styles.buttonGhost, styles.inlineButton]}
                  disabled={libraryBusy || !presetRenameText.trim() || presetRenameText.trim() === activePresetName}
                  onPress={() => {
                    void handleRenameContent(activePresetStorageId, presetRenameText, 'Preset');
                  }}
                >
                  <Text style={[styles.buttonText, styles.buttonTextGhost]}>Rename</Text>
                </Pressable>
              </View>
            )}
            {libraryRoot === 'setlists' && activeSetlist && presetActionTarget && (
              <>
                <View style={styles.menuList}>
                  {([-1, 1] as const).map(direction => renderMenuRow({
                    key: `move-${direction}`,
                    label: direction < 0 ? 'Move earlier' : 'Move later',
                    disabled: setlistMovePosition(presetItems, presetActionTarget.posi, direction) === null,
                    onPress: () => {
                      const target = presetActionTarget;
                      setPresetActionTarget(null);
                      void handleMoveSetlistPreset(target, direction);
                    },
                  }))}
                </View>
                <View style={styles.menuGap} />
                <View style={styles.menuList}>
                  {renderMenuRow({ key: 'remove', label: 'Remove from setlist', danger: true, onPress: () => {
                    const target = presetActionTarget;
                    setPresetActionTarget(null);
                    void handleRemovePresetFromSetlist(target);
                  } })}
                </View>
              </>
            )}
            {(libraryRoot === 'user' || libraryRoot === 'factory') && setlists.length > 0 && <View style={libraryStyles.header}>
              <Text style={libraryStyles.section}>Add to setlist</Text>
              {setlists.map(setlist => <Pressable key={setlist.cid_} style={libraryStyles.rowMain}
                accessibilityLabel={`Add to ${setlist.name ?? 'setlist'}`} onPress={() => {
                  const target = presetActionTarget;
                  setPresetActionTarget(null);
                  if (target && typeof setlist.cid_ === 'number') void handleAddPresetToSetlist(target, setlist.cid_);
                }}><Text style={libraryStyles.rowTitle}>{setlist.name ?? 'Setlist'}</Text><UtilityIcon name="plus" /></Pressable>)}
            </View>}
          </ScrollView>
          ) : undefined}
          onPosition={position => { setCreatePosition(position); setCreateError(''); }}
          onCreate={name => { void handleCreatePreset(name); }} onClose={() => { if (!creationPending.current) { creationRequest.current++; setCreatePosition(null); setPresetActionTarget(null); setDuplicateSource(null); } }} />

        {/* ── Bottom Sheet: Setlist Picker ─────────────────────── */}
        <BottomSheet
          visible={setlistPickerOpen}
          onClose={() => setSetlistPickerOpen(false)}
          title="Select setlist"
          fill
        >
          <LibrarySearch value={setlistFilter} onChange={setSetlistFilter} placeholder="Search setlists" label="Search setlists" />
          <FlatList keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag" style={{ flex: 1 }}
            data={setlists.filter(item => (item.name ?? '').toLowerCase().includes(setlistFilter.trim().toLowerCase()))}
            keyExtractor={item => String(item.cid_)} ListEmptyComponent={<Text style={libraryStyles.muted}>{setlists.length ? 'No matching setlists.' : 'No setlists yet.'}</Text>}
            renderItem={({ item }) => {
              const active = item.cid_ === selectedContainerId;
              return (
                <Pressable accessibilityLabel={`Select ${item.name ?? 'setlist'}`} accessibilityState={{ selected: active }} disabled={libraryBusy}
                  style={[libraryStyles.rowMain, active && libraryStyles.selectedRow]}
                  onPress={() => {
                    setSetlistPickerOpen(false);
                    void handleSetlistSelect(item);
                  }}
                >
                  <Text style={styles.sheetListText}>{item.name ?? `Setlist ${item.posi ?? '\u2014'}`}</Text>
                  {active && <UtilityIcon name="check" />}
                </Pressable>
              );
            }} />
        </BottomSheet>

        {/* ── Bottom Sheet: Add Presets to Setlist ─────────────── */}
        <BottomSheet
          visible={setlistAddSheetOpen}
          closeDisabled={libraryBusy}
          onClose={() => { setSetlistAddSheetOpen(false); setlistSourceRequest.current += 1; setSetlistAddLoading(false); }}
          title="Add presets"
          subtitle={activeSetlist?.name ?? selectedContainerName}
          fill
          footer={
            <View style={[styles.setlistAddFooter, accessibilityText && styles.renameRowStacked]}>
              <View style={styles.setlistAddFooterCopy}>
                <Text style={styles.label} numberOfLines={accessibilityText ? undefined : 1}>Add to {activeSetlist?.name ?? selectedContainerName}</Text>
                <Text style={styles.libraryMeta}>Adds them to the end of the setlist.</Text>
              </View>
              <Pressable
                style={[styles.button, styles.buttonPrimary, !selectedSetlistAddIds.length && styles.buttonDisabled]}
                disabled={setlistAddLoading || libraryBusy || !selectedSetlistAddIds.length}
                onPress={() => {
                  void handleAddSelectedPresetsToSetlist();
                }}
              >
                <Text style={styles.buttonText}>
                  {selectedSetlistAddIds.length ? `Add ${selectedSetlistAddIds.length}` : 'Add'}
                </Text>
              </Pressable>
            </View>
          }
        >
          <View style={styles.segmentedControl}>
            {SETLIST_ADD_SOURCES.map((source, idx) => {
              const active = source.key === setlistAddSource;
              return (
                <Pressable accessibilityState={{ selected: active }}
                  key={`setlist-add-source-${source.key}`}
                  style={[styles.segment, active && styles.segmentActive, idx > 0 && styles.segmentDivider]}
                  disabled={setlistAddLoading || libraryBusy}
                  onPress={() => handleSetlistAddSourceChange(source.key)}
                >
                  <Text style={[styles.segmentText, active && styles.segmentTextActive]}>{source.label}</Text>
                </Pressable>
              );
            })}
          </View>
          {!!setlistAddError && <View style={{ gap: 8, paddingVertical: 12 }}>
            <Text accessibilityLiveRegion="polite" style={[libraryStyles.muted, { color: COLORS.danger }]}>{setlistAddError}</Text>
            <LibraryButton label="Refresh presets" disabled={libraryBusy || setlistAddLoading} onPress={() => { void loadSetlistAddSource(setlistAddSource); }} />
          </View>}
          <View style={styles.searchRow}>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
              <Path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke={COLORS.muted} strokeWidth={2} strokeLinecap="round" />
            </Svg>
            <TextInput accessibilityLabel="Search presets to add"
              style={styles.searchInputInline}
              value={setlistAddSearch}
              onChangeText={setSetlistAddSearch}
              placeholder="Find presets"
              placeholderTextColor={COLORS.muted}
            />
            {setlistAddSearch.trim().length > 0 && (
              <Pressable accessibilityLabel="Clear search" onPress={() => setSetlistAddSearch('')} style={styles.textActionCompact}>
                <Text style={styles.searchClearText}>Clear</Text>
              </Pressable>
            )}
          </View>
          {libraryFeedback ? <Text accessibilityLiveRegion="polite" style={libraryStyles.muted}>{libraryFeedback}</Text> : null}
          <View style={styles.setlistAddToolRow}>
            <Text style={styles.libraryMeta}>
              {selectedSetlistAddIds.length} selected
            </Text>
            <View style={styles.setlistAddToolActions}>
              <Pressable onPress={handleSelectVisibleSetlistAddItems} style={styles.textActionCompact}>
                <Text style={styles.searchClearText}>Select visible</Text>
              </Pressable>
              <Pressable accessibilityLabel="Clear selected presets" onPress={() => setSelectedSetlistAddIds([])} style={styles.textActionCompact}>
                <Text style={styles.searchClearText}>Clear</Text>
              </Pressable>
            </View>
          </View>
          {setlistAddLoading ? (
            <Text style={styles.paramHint}>Loading presets...</Text>
          ) : (
            <FlatList
              style={styles.sheetFillList}
              data={filteredSetlistAddItems}
              keyExtractor={(item, index) => `setlist-add-${String(item.cid_ ?? index)}-${String(item.posi ?? index)}`}
              nestedScrollEnabled
              ListEmptyComponent={
                <Text style={styles.paramHint}>
                  {setlistAddItems.length > 0 ? 'No presets match that search.' : 'No presets loaded.'}
                </Text>
              }
              renderItem={({ item }) => {
                const contentId = typeof item.cid_ === 'number' ? item.cid_ : null;
                const selected = contentId !== null && selectedSetlistAddIds.includes(contentId);
                return (
                  <Pressable accessibilityRole="checkbox" accessibilityState={{ checked: selected }} accessibilityLabel={`${item.name ?? 'Preset'}, ${selected ? 'selected' : 'not selected'}`}
                    style={[styles.sheetListItem, selected && styles.sheetListItemActive, contentId === null && styles.sheetListItemDisabled]}
                    disabled={contentId === null}
                    onPress={() => {
                      if (contentId !== null) handleSetlistAddToggle(contentId);
                    }}
                  >
                    <View style={[styles.selectionDot, selected && styles.selectionDotActive]}>
                      {selected && <Text style={styles.selectionDotText}>✓</Text>}
                    </View>
                    <View style={styles.libraryRowCopy}>
                      <Text style={styles.sheetListText} numberOfLines={linearControls ? undefined : 1}>
                        {item.name ?? `Preset ${formatPresetPosition(item.posi)}`}
                      </Text>
                      <Text style={styles.libraryMeta}>
                        {typeof item.posi === 'number' ? `Slot ${formatPresetPosition(item.posi)}` : 'Preset'}
                      </Text>
                    </View>
                  </Pressable>
                );
              }}
            />
          )}
        </BottomSheet>

        {/* ── Bottom Sheet: Snapshot Actions ───────────────────── */}
        <BottomSheet
          visible={snapshotActionIndex !== null}
          onClose={() => setSnapshotActionIndex(null)}
          title={snapshots.find((s) => s.index === snapshotActionIndex)?.name ?? `Snapshot ${(snapshotActionIndex ?? 0) + 1}`}
          subtitle={`Snapshot ${(snapshotActionIndex ?? 0) + 1}`}
        >
          <View>
            {snapshotActionIndex === activeSnapshotIndex && (
              <View style={[styles.renameRow, accessibilityText && styles.renameRowStacked]}>
                <TextInput accessibilityLabel="Snapshot name"
                  style={[styles.input, styles.inlineInput, styles.renameInput]}
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
              <View style={styles.menuList}>
                {renderMenuRow({ key: 'activate', label: 'Activate snapshot', icon: 'snapshots', onPress: () => {
                  handleSnapshotActivate(snapshotActionIndex);
                  setSnapshotActionIndex(null);
                } })}
              </View>
            )}
          </View>
        </BottomSheet>

        <MoveBlockSheet name={moveSource ? getBlockDisplayName(grid[moveSource.path]?.[moveSource.block] ?? null) : null}
          routing={!!moveSource && isRoutingModel(grid[moveSource.path]?.[moveSource.block]?.id ?? 0)}
          destinations={moveDestinations} busy={blockBusy} onMove={destination => { void handleMoveTo(destination); }}
          onClose={() => { if (!blockOperation.current) setMoveSource(null); }} />

        <MoveBlockSheet action="copy" name={blockCopy?.copy.name ?? null} destinations={copyDestinations} busy={blockBusy}
          onMove={destination => { void handleCopyBlockTo(destination); }} onClose={() => { if (!blockOperation.current) setBlockCopy(null); }} />

        {/* ── Bottom Sheet: Block Actions (shared with the editor) ── */}
        {renderSlotActionsSheet()}

        {/* ── Bottom Sheet: Preview details ─────────────────────── */}
        <BottomSheet visible={previewInfoOpen} onClose={() => setPreviewInfoOpen(false)} title="Preview">
          <ScrollView style={{ maxHeight: sheetListMaxHeight + 120 }} contentContainerStyle={styles.helpSheetBody}>
            <Text style={styles.helpSheetText}>You’re exploring a sample preset with no Stadium connected. Edits stay on this screen, nothing is sent to a device, and changes are not saved.</Text>
            <Text style={[styles.helpSheetText, styles.previewInfoGap]}>Connect your Stadium to edit and save your own presets.</Text>
            <Pressable onPress={() => afterSheetClose(() => setPreviewInfoOpen(false), () => disconnect())}
              style={({ pressed }) => [styles.settingsPrimaryButton, styles.previewInfoGap, pressed && { opacity: 0.85 }]}>
              <Text style={styles.settingsPrimaryText}>Exit preview</Text>
            </Pressable>
          </ScrollView>
        </BottomSheet>

        {/* ── Bottom Sheet: Preset tools (phone overflow) ────────── */}
        <BottomSheet visible={presetToolsOpen} onClose={() => setPresetToolsOpen(false)} title="Preset tools"
          subtitle={`${formatPresetPosition(activePresetRef?.posi)} ${activePresetName}`}>
          <View style={styles.menuList}>
            {largeText && !isTablet && renderMenuRow({ key: 'tuner', label: 'Tuner', icon: 'tuner',
              onPress: () => afterSheetClose(() => setPresetToolsOpen(false), () => openTunerScreen('main')) })}
            {renderMenuRow({ key: 'perform', label: 'Perform', icon: 'play', hint: 'Large snapshot and footswitch controls for playing live', disabled: showcaseBusy,
              onPress: () => afterSheetClose(() => setPresetToolsOpen(false), () => openPerform(performView)) })}
            {renderMenuRow({ key: 'sync', label: 'Sync with Stadium', icon: 'sync', hint: 'Reload the preset, snapshots and settings', disabled: showcaseBusy,
              onPress: () => afterSheetClose(() => setPresetToolsOpen(false), () => { void handleFullSync(); }) })}
          </View>
        </BottomSheet>

        {/* ── Bottom Sheet: Path options ───────────────────────── */}
        {(() => {
          const pathNum = pathMenuPath ?? 1;
          const editDisabled = previewMode || blockBusy || focusBusy || presetSaving || presetCreating;
          const canPaste = !!pathClipboard && pathClipboard.sourcePath !== pathNum - 1 && !editDisabled;
          const close = () => setPathMenuPath(null);
          return (
            <BottomSheet visible={pathMenuPath !== null} onClose={close} title={`Path ${pathNum}`}>
              <View style={styles.menuList}>
                {renderMenuRow({ key: 'copy', label: `Copy Path ${pathNum}`, hint: 'Paste it into the other path', disabled: editDisabled,
                  onPress: () => afterSheetClose(close, () => { void handleCopyPath(pathNum); }) })}
                {pathClipboard && pathClipboard.sourcePath !== pathNum - 1 && renderMenuRow({ key: 'paste', label: `Paste Path ${pathClipboard.sourcePath + 1} here`,
                  hint: `Replaces everything on Path ${pathNum}`, disabled: !canPaste,
                  onPress: () => afterSheetClose(close, () => { void handlePastePath(pathNum); }) })}
                {renderMenuRow({ key: 'dsp', label: 'About DSP estimates', icon: 'help', onPress: () => afterSheetClose(close, showDspHelp) })}
              </View>
            </BottomSheet>
          );
        })()}

        {/* ── Bottom Sheet: IO Picker ──────────────────────────── */}
        {(() => {
          const ioName = ioPickerType === 'input' ? 'input' : 'output';
          const helpStep = ioPickerOpen && paramHelp !== null;
          const modelStep = !helpStep && (ioModelListOpen || !activeIOModel);
          const closeIoPicker = () => { setParamHelp(null); setIoPickerOpen(false); };
          return (
            <BottomSheet
              visible={ioPickerOpen}
              onClose={closeIoPicker}
              fill
              title={helpStep ? paramHelp?.title : modelStep ? `Choose ${ioName}` : `Row ${rowLabels[ioPickerRow]} ${ioName}`}
              subtitle={helpStep ? paramHelp?.subtitle : modelStep ? `Row ${rowLabels[ioPickerRow]}` : undefined}
              onBack={helpStep ? () => setParamHelp(null) : modelStep && activeIOModel ? () => setIoModelListOpen(false) : undefined}
              backLabel="Back to settings"
            >
              {helpStep ? (
                <ScrollView keyboardShouldPersistTaps="handled" style={styles.sheetFillList} contentContainerStyle={styles.helpSheetBody}>
                  <Text style={styles.helpSheetText}>{paramHelp?.body}</Text>
                </ScrollView>
              ) : modelStep ? (
                <>
                  <TextInput accessibilityLabel="Search input and output models"
                    style={styles.searchInput}
                    value={ioPickerQuery}
                    onChangeText={setIoPickerQuery}
                    placeholder={`Search ${ioName}s`}
                    placeholderTextColor={COLORS.muted}
                  />
                  <ScrollView keyboardShouldPersistTaps="handled" style={styles.sheetFillList}>
                    {ioPickerModels.map((model) => {
                      const isActive = activeIOModel?.modelId === model.id;
                      return (
                        <Pressable accessibilityState={{ selected: isActive }}
                          key={model.id}
                          disabled={blockBusy}
                          style={[styles.sheetListItem, isActive && styles.sheetListItemActive]}
                          onPress={() => { void setIOModel(model); setIoModelListOpen(false); }}
                        >
                          <Text style={styles.sheetListText}>{model.name}</Text>
                        </Pressable>
                      );
                    })}
                  </ScrollView>
                </>
              ) : (
                <ScrollView keyboardShouldPersistTaps="handled" style={styles.sheetFillList}>
                  <Pressable accessibilityLabel={`Model, ${activeIOModel?.name ?? 'None'}. Change model`} disabled={blockBusy}
                    style={({ pressed }) => [styles.menuRow, pressed && styles.menuRowPressed]} onPress={() => setIoModelListOpen(true)}>
                    <View style={styles.menuRowCopy}>
                      <Text style={styles.menuRowHint}>Model</Text>
                      <Text style={styles.menuRowText}>{activeIOModel?.name ?? 'None'}</Text>
                    </View>
                    <Text style={styles.clipboardActionText}>Change</Text>
                  </Pressable>
                  <Text style={styles.menuSectionTitle}>Parameters</Text>
                  {renderIOParams()}
                </ScrollView>
              )}
            </BottomSheet>
          );
        })()}

        {/* ── Bottom Sheet: Block Picker ───────────────────────── */}
        <BottomSheet
          visible={pickerOpen}
          onClose={() => { if (!blockOperation.current) setPickerOpen(false); }}
          fill
          title={pickerStep === 'type' ? (targetBlock ? 'Change model' : 'Add block') : blockCatalog[pickerType ?? 'amp']?.label}
          subtitle={`Row ${rowLabels[targetSlot.path]}, position ${targetSlot.block + 1} · ${Math.max(0, availableUsage).toFixed(1)} of ${dspLimit} DSP free${extendedDspEnabled ? ' · Extended budget' : ''}`}
          onBack={pickerStep === 'model' ? () => setPickerStep('type') : undefined}
          backLabel="Back to block categories"
        >
          {pickerStep === 'type' ? (
            <ScrollView keyboardShouldPersistTaps="handled" style={styles.sheetFillList} showsVerticalScrollIndicator={false}>
              <View style={styles.typeGrid}>
                {blockTypeOrder.map((typeKey) => {
                  const group = blockCatalog[typeKey];
                  const color = getBlockColor(typeKey);
                  const unavailable = blockBusy || (typeKey === 'routing' && targetSlot.path % 2 === 1) || (!!targetBlock && isRoutingModel(targetBlock.id) && typeKey !== 'routing');
                  return (
                    <Pressable key={typeKey} disabled={unavailable} style={({ pressed }) => [styles.typeCard, pressed && styles.menuRowPressed, unavailable && styles.menuRowDisabled]} onPress={() => selectBlockType(typeKey)}>
                      <View style={styles.typeIconWrap}>
                        {BLOCK_IMAGES[typeKey] ? (
                          <Image source={BLOCK_IMAGES[typeKey]} style={[styles.typeIcon, { tintColor: color }]} resizeMode="contain" />
                        ) : (
                          <BlockIcon type={typeKey} size={22} color={color} />
                        )}
                      </View>
                      <View style={styles.typeInfo}>
                        <Text style={styles.typeLabel}>{group.label}</Text>
                        <Text style={styles.typeMeta}>{typeKey === 'routing' ? targetSlot.path % 2 ? 'Add on row A' : 'Parallel paths and dual amps' : `${group.models.length} models`}</Text>
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
              <TextInput accessibilityLabel="Search block models"
                style={styles.searchInput}
                value={pickerQuery}
                onChangeText={setPickerQuery}
                placeholder="Search models"
                placeholderTextColor={COLORS.muted}
              />
              <ScrollView keyboardShouldPersistTaps="handled" style={styles.sheetFillList} showsVerticalScrollIndicator={false}>
                {pickerModelSections.map((section, sectionIndex) => (
                  <View key={`${section.title ?? 'models'}-${sectionIndex}`}>
                    {section.title && (
                      <View style={styles.modelSectionHeader}>
                        <Text style={styles.modelSectionTitle}>{section.title}</Text>
                      </View>
                    )}
                    {section.models.map((item) => {
                      const required = getProjectedInsertUsage(item);
                      const routingReason = routingInsertReason(grid, targetSlot as BlockSlot, item.id) ??
                        blockLimitReason(grid, targetSlot as BlockSlot, { id: item.id, kind: pickerType ?? item.category }, shouldBudgetAutoCab(item));
                      const blockedReason = routingReason ?? (!fitsDspBudget(required, availableUsage) ? 'Not enough processing capacity.' : null);
                      const canInsert = !blockBusy && !blockedReason;
                      const color = getBlockColor(pickerType ?? '');
                      const sourceName = isUsefulRealName(item.based_on) ? item.based_on!.trim() : null;
                      const primaryName = isRoutingModel(item.id) ? routingName(item.id) : showRealBlockNames && sourceName ? sourceName : item.name;
                      const secondaryName = blockedReason ?? ROUTING_DESCRIPTIONS[item.id] ?? (showRealBlockNames && sourceName ? item.name : sourceName);
                      return (
                        <Pressable accessibilityLabel={`${primaryName}${secondaryName ? ', ' + secondaryName : ''}, DSP estimate ${required.toFixed(1)}`}
                          key={item.id}
                          style={[styles.sheetListItem, !canInsert && styles.sheetListItemDisabled]}
                          onPress={() => insertModel(item, pickerType ?? 'fx')}
                          disabled={!canInsert}
                        >
                          <View style={[styles.modelDot, { backgroundColor: color }]} />
                          <View style={styles.modelInfo}>
                            <Text style={[styles.sheetListText, !canInsert && styles.sheetListTextDim]}>{primaryName}</Text>
                            {secondaryName && (
                              <Text style={styles.modelMetaText} numberOfLines={linearControls || pickerType === 'routing' ? undefined : 1}>{secondaryName}</Text>
                            )}
                          </View>
                          <Text style={[styles.modelDspText, !canInsert && styles.sheetListTextDim]}>{required.toFixed(1)} DSP</Text>
                        </Pressable>
                      );
                    })}
                  </View>
                ))}
                <Text style={styles.sheetFootnote}>
                  {pickerType === 'routing'
                    ? 'For dual amps, add a split, place one amp on each row, then add a Merge Mixer after them on row A.'
                    : 'DSP numbers estimate processing use. Lower numbers leave room for more effects; they are not CPU percentages.'}
                </Text>
              </ScrollView>
            </>
          )}
        </BottomSheet>

        {/* ── Bottom Sheet: Parameter help ─────────────────────── */}
        {!ioPickerOpen && renderParamHelpSheet()}
        {renderSnapshotAssignments()}

        {/* ── Tab bar ──────────────────────────────────────────── */}
        {!useNavRail && <TabBar activeTab={activeTab} onTabChange={handleTabChange} connected={connected} />}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  accessibilityStatus: { color: COLORS.text, paddingHorizontal: 20, paddingVertical: 8, fontSize: 16 },
  safe: { flex: 1, backgroundColor: COLORS.bg },

  /* ── Shared chrome ─────────────────────────────────────────────── */
  pressedQuiet: { opacity: 0.6 },
  pushEnd: { marginLeft: 'auto' },
  libraryTopInList: { paddingTop: 16, paddingBottom: 16 },
  flowChromeBleed: { marginHorizontal: -16, marginTop: -8, marginBottom: 8 },
  editorHeaderBleed: { marginHorizontal: -16, marginTop: -12, marginBottom: 8 },
  inspectorHeaderBleed: { marginHorizontal: -24, marginTop: -12, marginBottom: 8 },
  flexSpacer: { flex: 1 },
  iconAction: { width: 48, height: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  iconActionPressed: { backgroundColor: COLORS.control },
  textAction: { minHeight: 48, paddingHorizontal: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  textActionCompact: { minHeight: 48, paddingHorizontal: 6, alignItems: 'center', justifyContent: 'center' },
  textActionLabel: { color: COLORS.text, ...FONT.semibold, fontSize: 17 },
  screenHeader: { flexDirection: 'row', alignItems: 'center', gap: 4, minHeight: 56, paddingLeft: 16, paddingRight: 6 },
  screenHeaderWithBack: { paddingLeft: 4, paddingRight: 16 },
  screenTitle: { flex: 1, minWidth: 0, color: COLORS.text, ...FONT.bold, fontSize: 20, lineHeight: 24 },
  stepperTrack: { flexDirection: 'row', alignItems: 'center', borderRadius: 10, backgroundColor: COLORS.control, overflow: 'hidden' },
  stepperTrackStacked: { alignSelf: 'flex-start' },
  stepperCell: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  stepperDivider: { width: StyleSheet.hairlineWidth, height: 24, backgroundColor: COLORS.stroke },
  stepperLabel: { minWidth: 64, paddingHorizontal: 4, alignItems: 'center', justifyContent: 'center' },
  stepperLabelText: { color: COLORS.text, ...FONT.semibold, ...FONT.numeric, fontSize: 15 },
  menuList: {},
  menuRow: {
    flexDirection: 'row', alignItems: 'center', gap: 14, minHeight: 52, paddingVertical: 10, paddingHorizontal: 4,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.stroke,
  },
  menuRowPressed: { backgroundColor: COLORS.control },
  menuRowDisabled: { opacity: 0.4 },
  menuRowCopy: { flex: 1, minWidth: 0, gap: 2 },
  menuRowText: { color: COLORS.text, ...FONT.medium, fontSize: 16, lineHeight: 21 },
  menuRowHint: { color: COLORS.muted, ...FONT.body, fontSize: 13, lineHeight: 18 },
  menuRowDanger: { color: COLORS.danger },
  menuGap: { height: 16 },
  menuSectionTitle: { color: COLORS.muted, ...FONT.semibold, fontSize: 13, lineHeight: 18, marginTop: 16, marginBottom: 6 },
  menuLabelEditor: { marginBottom: 8 },
  renameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  renameRowStacked: { flexDirection: 'column', alignItems: 'stretch' },
  renameInput: { minWidth: 0 },
  sheetFillList: { flex: 1 },
  sheetFootnote: { color: COLORS.muted, ...FONT.body, fontSize: 13, lineHeight: 18, paddingTop: 16, paddingBottom: 8 },
  modelDspText: { color: COLORS.muted, ...FONT.numeric, fontSize: 13 },

  /* ── App bar ──────────────────────────────────────────────────── */
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 10,
  },
  appTitle: { fontSize: 28, color: COLORS.text, ...FONT.bold },
  appBarActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  appBarStacked: { flexDirection: 'column', alignItems: 'stretch', gap: 8, paddingHorizontal: 16 },
  appBarActionsStacked: { flexDirection: 'column', alignItems: 'stretch' },
  performanceLaunchButton: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 4,
    backgroundColor: COLORS.text,
  },
  performanceLaunchText: {
    color: COLORS.bg,
    ...FONT.semibold,
    fontSize: 12.5,
    letterSpacing: 0.2,
  },
  statusPill: {
    flexDirection: 'row', alignItems: 'center', gap: 7,
    paddingVertical: 7, paddingHorizontal: 12,
    backgroundColor: 'transparent',
  },
  pillDot: { width: 6, height: 6, borderRadius: 3 },
  pillText: {
    color: COLORS.muted,
    ...FONT.numeric,
    fontSize: 11.5,
    letterSpacing: -0.1,
  },

  /* ── Performance mode ─────────────────────────────────────────── */
  performanceSafe: { flex: 1, backgroundColor: COLORS.bg },
  performanceBackdrop: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },
  performanceGlowA: { width: 0, height: 0 },
  performanceGlowB: { width: 0, height: 0 },
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
    flex: 1,
    minWidth: 0,
  },
  performanceEyebrow: {
    color: COLORS.muted,
    ...FONT.semibold,
    fontSize: 15,
  },
  performanceHost: {
    color: COLORS.muted,
    ...FONT.body,
    fontSize: 14,
  },
  performanceExitButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 0,
    borderColor: COLORS.stroke,
    backgroundColor: COLORS.control,
  },
  performanceExitText: {
    color: COLORS.text,
    ...FONT.semibold,
    fontSize: 14,
    letterSpacing: 0.1,
  },
  snapshotShortcut: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 10,
    paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.stroke },
  snapshotShortcutTitle: { color: COLORS.text, ...FONT.semibold, fontSize: 15 },
  snapshotShortcutValue: { flex: 1, color: COLORS.muted, ...FONT.body, fontSize: 15 },
  performanceContent: {
    paddingHorizontal: 16,
    paddingBottom: 28,
    gap: 16,
  },
  performanceHero: { paddingTop: 4, gap: 6 },
  performanceHeroTitleLarge: { fontSize: 22, lineHeight: 28 },
  performanceHeroAccent: {
    width: 0, height: 0,
  },
  performanceHeroKicker: { color: COLORS.muted, ...FONT.semibold, fontSize: 13, lineHeight: 18 },
  performanceHeroTitle: { color: COLORS.text, ...FONT.bold, fontSize: 26, lineHeight: 30 },
  performanceHeroMeta: {
    color: COLORS.muted,
    ...FONT.body,
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
    width: 8,
    height: 8,
    borderRadius: 12,
  },
  performanceHeroStatusText: {
    color: COLORS.muted,
    ...FONT.body,
    fontSize: 14,
    letterSpacing: 0.1,
  },
  performanceSection: { gap: 12 },
  footswitchRow: { flexDirection: 'row', gap: 8 },
  footswitchRowStacked: { flexDirection: 'column' },
  footswitch: { flex: 1, minHeight: 64, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingHorizontal: 12, borderRadius: 12, backgroundColor: COLORS.control },
  footswitchText: { color: COLORS.text, ...FONT.semibold, fontSize: 17 },
  performTempoRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  performTempoValue: { flex: 1, color: COLORS.text, ...FONT.bold, ...FONT.numeric, fontSize: 34, lineHeight: 40 },
  performTempoUnit: { color: COLORS.muted, ...FONT.medium, fontSize: 17 },
  performTapButton: { minHeight: 48, minWidth: 96, paddingHorizontal: 20, borderRadius: 10, backgroundColor: COLORS.accent, alignItems: 'center', justifyContent: 'center' },
  performTapText: { color: COLORS.bg, ...FONT.semibold, fontSize: 17 },
  joinedStepper: { flexDirection: 'row', borderRadius: 10, backgroundColor: COLORS.control, overflow: 'hidden' },
  joinedStepperCell: { flex: 1, minHeight: 48, alignItems: 'center', justifyContent: 'center' },
  joinedStepperDivider: { borderLeftWidth: StyleSheet.hairlineWidth, borderLeftColor: COLORS.stroke },
  joinedStepperText: { color: COLORS.text, ...FONT.semibold, ...FONT.numeric, fontSize: 16 },
  tunerHero: { alignItems: 'center', gap: 12, paddingTop: 4 },
  pitchStepper: { flexDirection: 'row', alignSelf: 'stretch', minHeight: 72, borderRadius: 12, backgroundColor: COLORS.control, overflow: 'hidden' },
  pitchStepperButton: { width: 72, alignItems: 'center', justifyContent: 'center' },
  pitchStepperGlyph: { color: COLORS.text, ...FONT.medium, fontSize: 26, lineHeight: 30 },
  pitchValueWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', borderLeftWidth: StyleSheet.hairlineWidth, borderRightWidth: StyleSheet.hairlineWidth, borderColor: COLORS.stroke },
  pitchValue: { color: COLORS.text, ...FONT.bold, ...FONT.numeric, fontSize: 34, lineHeight: 40 },
  pitchUnit: { color: COLORS.muted, ...FONT.medium, fontSize: 17 },
  tunerNote: { color: COLORS.muted, ...FONT.body, fontSize: 14, lineHeight: 20, textAlign: 'center' },
  tunerActions: { flexDirection: 'row', gap: 8 },
  tunerActionsStacked: { flexDirection: 'column' },
  tunerActionButton: { flex: 1, minHeight: 48, paddingHorizontal: 12, borderRadius: 10, backgroundColor: COLORS.control, alignItems: 'center', justifyContent: 'center' },
  tunerActionPrimary: { backgroundColor: COLORS.accent },
  tunerOffsetSection: { gap: 12, marginTop: 12 },
  performanceSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  performanceSectionTitle: { color: COLORS.text, ...FONT.semibold, fontSize: 18 },
  performanceSectionMeta: {
    color: COLORS.muted,
    ...FONT.body,
    fontSize: 14,
    letterSpacing: 0.1,
  },
  performanceActionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  performanceActionCard: {
    width: '100%',
    minHeight: 76,
    padding: 14,
    borderRadius: 12,
    borderWidth: 0,
    borderColor: COLORS.stroke,
    backgroundColor: COLORS.panel,
    justifyContent: 'space-between',
  },
  performanceActionCardActive: {
    borderColor: COLORS.text,
    backgroundColor: COLORS.panel,
  },
  performanceActionCardDisabled: {
    opacity: 0.45,
  },
  performanceActionLabel: {
    color: COLORS.text,
    ...FONT.semibold,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  performanceActionLabelActive: {
    color: COLORS.text,
  },
  performanceActionMeta: {
    color: COLORS.muted,
    ...FONT.body,
    fontSize: 14,
    lineHeight: 16,
  },
  performanceTempoCard: {
    gap: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 0,
    borderColor: COLORS.stroke,
    backgroundColor: COLORS.panel,
  },
  performanceTempoValue: {
    color: COLORS.text,
    ...FONT.bold,
    fontSize: 40,
    letterSpacing: -0.6,
  },
  performanceTempoUnit: {
    color: COLORS.muted,
    ...FONT.semibold,
    fontSize: 15,
  },
  performanceTempoMeta: {
    color: COLORS.muted,
    ...FONT.body,
    fontSize: 14,
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
    borderWidth: 0,
    borderColor: COLORS.stroke,
    backgroundColor: COLORS.panel,
    alignItems: 'center',
  },
  performanceChipAccent: {
    borderColor: COLORS.accentMid,
    backgroundColor: COLORS.accentDim,
  },
  performanceChipText: {
    color: COLORS.text,
    ...FONT.semibold,
    fontSize: 15,
  },
  performanceChipTextAccent: {
    color: COLORS.accent,
  },
  performanceInlineToggleRow: {
    flexWrap: 'wrap',
    gap: 10,
  },
  performanceInlineLabel: {
    color: COLORS.text,
    ...FONT.semibold,
    fontSize: 15,
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
    borderWidth: 0,
    borderColor: COLORS.stroke,
    backgroundColor: COLORS.panel,
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
    ...FONT.semibold,
    fontSize: 14,
  },
  performanceInlinePillTextActive: {
    color: COLORS.accent,
  },
  tunerOffsetHint: {
    color: COLORS.muted,
    ...FONT.body,
    fontSize: 14,
    lineHeight: 18,
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
    borderWidth: 0,
    borderColor: COLORS.stroke,
    backgroundColor: COLORS.panel,
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
    ...FONT.semibold,
    fontSize: 15,
  },
  tunerOffsetShortLabel: {
    color: COLORS.muted,
    ...FONT.semibold,
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  tunerOffsetValue: {
    color: COLORS.accent,
    ...FONT.bold,
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
    borderWidth: 0,
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
    ...FONT.semibold,
    fontSize: 14,
  },
  tunerOffsetAdjustButtonTextAccent: {
    color: COLORS.accent,
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
    borderWidth: 0,
    borderColor: COLORS.stroke,
    backgroundColor: COLORS.panel,
    gap: 8,
  },
  performancePresetCardActive: {
    borderColor: COLORS.accentMid,
    backgroundColor: COLORS.accentDim,
  },
  performancePresetSlot: {
    color: COLORS.muted,
    ...FONT.numeric,
    fontSize: 11,
    letterSpacing: 0.1,
  },
  performancePresetSlotActive: {
    color: COLORS.accent,
  },
  performancePresetName: {
    color: COLORS.text,
    ...FONT.semibold,
    fontSize: 15,
    lineHeight: 20,
  },
  performancePresetNameActive: {
    color: COLORS.accent,
  },
  performanceEmptyText: {
    color: COLORS.muted,
    ...FONT.body,
    fontSize: 15,
    lineHeight: 18,
  },
  transportHeroCard: {
    gap: 6,
    paddingVertical: 12,
  },
  transportHeroValue: {
    color: COLORS.text,
    ...FONT.bold,
    fontSize: 32,
    letterSpacing: -0.4,
  },
  transportHeroUnit: {
    color: COLORS.muted,
    ...FONT.semibold,
    fontSize: 13,
  },
  transportHeroMeta: {
    color: COLORS.muted,
    ...FONT.body,
    fontSize: 12,
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
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    backgroundColor: COLORS.panelAlt,
  },
  transportAdjustButtonAccent: {
    borderColor: COLORS.text,
    backgroundColor: COLORS.panel,
  },
  transportAdjustButtonText: {
    color: COLORS.text,
    ...FONT.semibold,
    fontSize: 13,
  },
  transportAdjustButtonTextAccent: {
    color: COLORS.accent,
  },

  /* ── Flow tab ──────────────────────────────────────────────────── */
  tabContent: { flex: 1 },
  tabPadding: { padding: 16, paddingBottom: 24 },
  flowPadding: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 32 },
  appBarIconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.panelAlt,
    borderWidth: 1,
    borderColor: COLORS.stroke,
  },

  /* ── App shell ─────────────────────────────────────────────────── */
  shell: { flex: 1 },
  shellRow: { flexDirection: 'row' },
  shellMain: { flex: 1, minWidth: 0 },

  /* ── Top bar: preset, save, tempo and tools ─────────────────────── */
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 8,
  },
  topBarWide: { paddingHorizontal: 24, paddingTop: 10, gap: 12 },
  topBarPhone: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 8, gap: 4 },
  topRowA: { flexDirection: 'row', alignItems: 'center', gap: 8, minHeight: 52 },
  topRowB: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  topPresetNamePhone: { flexBasis: 0, minWidth: 0, maxWidth: undefined, paddingHorizontal: 0, gap: 8, justifyContent: 'flex-start', backgroundColor: 'transparent' },
  topPreset: { flexDirection: 'row', alignItems: 'center', gap: 8, flexGrow: 1, flexShrink: 1, flexBasis: 320 },
  topPresetPhone: { flexBasis: 'auto', flexGrow: 0, flexShrink: 0, width: '100%' },
  topIconButton: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: COLORS.control,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topIconQuiet: { backgroundColor: 'transparent' },
  topPresetName: {
    flexShrink: 1,
    flexGrow: 1,
    maxWidth: 420,
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: COLORS.control,
  },
  topPresetSlot: { color: COLORS.muted, ...FONT.numeric, fontSize: 15 },
  topPresetTitle: { flexShrink: 1, color: COLORS.text, ...FONT.semibold, fontSize: 18 },
  editedDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.warn },
  saveButton: {
    minHeight: 48,
    minWidth: 72,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonQuiet: { backgroundColor: COLORS.control },
  saveButtonText: { color: COLORS.bg, ...FONT.semibold, fontSize: 15 },
  saveButtonTextQuiet: { color: COLORS.text },
  topTools: { flexDirection: 'row', alignItems: 'center', gap: 8, marginLeft: 'auto', flexShrink: 1, minWidth: 0 },
  topRowFull: { marginLeft: 0, alignSelf: 'stretch' },
  topBarStacked: { flexDirection: 'column', alignItems: 'stretch' },
  tempoTapButton: { minHeight: 48, justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10, backgroundColor: COLORS.control },
  tempoTapCaption: { color: COLORS.muted, ...FONT.semibold, fontSize: 11, lineHeight: 13, letterSpacing: 0.6 },
  tempoReadout: { flexDirection: 'row', alignItems: 'baseline', gap: 3 },
  tempoUnitCompact: { color: COLORS.muted, ...FONT.body, fontSize: 12 },
  tempoGroup: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.control,
    paddingLeft: 14,
    overflow: 'hidden',
  },
  tempoValue: { color: COLORS.text, ...FONT.semibold, ...FONT.numeric, fontSize: 17 },
  tempoUnit: { color: COLORS.muted, ...FONT.body, fontSize: 13, marginLeft: 6, marginRight: 10 },
  tempoTap: {
    minHeight: 48,
    paddingHorizontal: 14,
    justifyContent: 'center',
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: COLORS.stroke,
  },
  toolButton: {
    minHeight: 48,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: COLORS.control,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolButtonPressed: { backgroundColor: COLORS.stroke },
  toolButtonText: { color: COLORS.text, ...FONT.semibold, fontSize: 15 },
  toolButtonDanger: { color: COLORS.danger },
  statusButton: {
    minHeight: 48,
    maxWidth: 200,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  statusButtonText: { flexShrink: 1, color: COLORS.muted, ...FONT.body, fontSize: 14 },
  statusButtonEnd: { marginLeft: 'auto', flexShrink: 1, minWidth: 0 },
  snapshotBar: { paddingLeft: 16, paddingBottom: 10 },
  previewBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 2,
    paddingLeft: 14,
    paddingRight: 4,
    borderRadius: 12,
    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: COLORS.warn,
  },
  previewBannerWide: { marginHorizontal: 24 },
  previewBannerText: { flexShrink: 1, color: COLORS.muted, ...FONT.body, fontSize: 14, lineHeight: 19 },
  previewBannerTitle: { color: COLORS.text, ...FONT.semibold, fontSize: 15 },
  previewStatus: { flex: 1, minWidth: 0, minHeight: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 8 },
  previewStatusStacked: { flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', gap: 2, paddingVertical: 4 },
  previewStatusLine: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  previewInfoGap: { marginTop: 16 },
  snapshotBarWide: { paddingHorizontal: 24, paddingBottom: 6 },

  /* ── Segmented control ─────────────────────────────────────────── */
  segmentTrack: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    borderRadius: 10,
    backgroundColor: COLORS.control,
  },
  segmentTrackFill: { alignSelf: 'stretch', marginBottom: 12 },
  segmentTrackStacked: { flexDirection: 'column', alignSelf: 'stretch' },
  segmentItem: { minHeight: 48, padding: 4, justifyContent: 'center' },
  segmentItemFill: { flex: 1 },
  segmentPill: { minHeight: 40, paddingHorizontal: 12, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  segmentItemActive: { backgroundColor: COLORS.stroke },
  segmentItemText: { color: COLORS.muted, ...FONT.semibold, fontSize: 14 },
  segmentItemTextActive: { color: COLORS.text },

  /* ── Edit tab ──────────────────────────────────────────────────── */
  flowDock: { flex: 1 },
  flowLanes: { flexGrow: 0, flexShrink: 1 },
  flowLanesContent: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 8, gap: 6 },
  phoneFlowNavigation: { flexDirection: 'row', gap: 12, marginBottom: 8 },
  phoneFlowNavigationStacked: { flexDirection: 'column' },
  phoneFlowTabs: { flex: 1, minWidth: 0, flexDirection: 'row', gap: 4, padding: 4, borderRadius: 12, backgroundColor: COLORS.panel },
  phoneFlowTabsStacked: { flex: 0 },
  phoneFlowTab: { flex: 1, alignItems: 'center', paddingHorizontal: 6, paddingVertical: 8, borderRadius: 8 },
  phoneFlowTabSelected: { backgroundColor: COLORS.raised },
  phoneFlowTabText: { color: COLORS.muted, ...FONT.semibold, fontSize: 15, textAlign: 'center' },
  phoneFlowTabTextSelected: { color: COLORS.text },
  inspector: {
    flex: 1,
    minHeight: 320,
    marginTop: 8,
    backgroundColor: COLORS.inspector,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.stroke,
  },
  inspectorLandscape: { minHeight: 300 },
  inspectorEmpty: { padding: 24, gap: 6 },
  inspectorEmptyTitle: { color: COLORS.text, ...FONT.semibold, fontSize: 17 },
  inspectorEmptyText: { color: COLORS.muted, ...FONT.body, fontSize: 15, lineHeight: 21, maxWidth: 560 },
  inspectorHeader: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 4,
  },
  inspectorChip: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inspectorTitleStack: { flexShrink: 1, flexGrow: 1, flexBasis: 180, gap: 2 },
  phoneBlockTitleStack: { flex: 1, minWidth: 0, paddingVertical: 6 },
  editorTitleStackAccessible: { flex: 0, flexBasis: 'auto', width: '100%', paddingTop: 0 },
  editorMetaRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginTop: -6, paddingLeft: 56, paddingRight: 16, paddingBottom: 10 },
  editorMetaRowAccessible: { paddingLeft: 16, marginTop: 0 },
  editorMetaGlyph: { height: 18, justifyContent: 'center' },
  editorMetaText: { flexShrink: 1 },
  editorAccessibleTitle: { paddingHorizontal: 16, paddingBottom: 8 },
  editorBlockTitle: { fontSize: 20, lineHeight: 24 },
  inspectorTitle: { color: COLORS.text, ...FONT.bold, fontSize: 22, lineHeight: 26 },
  inspectorSubtitle: { color: COLORS.muted, ...FONT.body, fontSize: 14, lineHeight: 18 },
  inspectorTools: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginLeft: 'auto' },
  inspectorParamPad: { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 32 },
  powerPill: {
    minHeight: 48,
    minWidth: 96,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingLeft: 12,
    paddingRight: 16,
    borderRadius: 10,
    borderWidth: 2,
  },
  powerPillOff: { backgroundColor: COLORS.control, borderColor: COLORS.control },
  powerDot: { width: 10, height: 10, borderRadius: 5 },
  powerText: { color: COLORS.text, ...FONT.semibold, fontSize: 15 },
  phoneBlockPower: {
    minHeight: 48,
    minWidth: 88,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: COLORS.control,
  },
  editorTopRow: { flexDirection: 'row', alignItems: 'center', gap: 4, minHeight: 48, paddingHorizontal: 4 },
  editorReturn: { flexDirection: 'row', alignItems: 'center', gap: 6, flexShrink: 1, margin: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, backgroundColor: COLORS.raised },
  editorReturnText: { color: COLORS.text, ...FONT.semibold, fontSize: 15, flexShrink: 1 },


  stepButton: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: COLORS.control,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepButtonDisabled: { opacity: 0.4 },
  editorToolRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingTop: 2, paddingBottom: 10 },
  editorToolRowDivided: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.stroke },
  editorToolRowStacked: { flexDirection: 'column', alignItems: 'flex-start' },
  sliderGrid: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 10, paddingVertical: 4 },

  /* ── Path section ──────────────────────────────────────────────── */
  pathSection: {
    marginBottom: 14,
  },
  pathHeaderBlock: { paddingBottom: 4 },
  pathHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  pathTools: { flexDirection: 'row', alignItems: 'center', marginRight: -12 },
  pathTitle: {
    color: COLORS.text,
    ...FONT.bold,
    fontSize: 17,
  },
  clipboardStrip: { flexDirection: 'row', alignItems: 'center', gap: 8, minHeight: 48, paddingLeft: 14, paddingRight: 4, marginTop: 4, marginBottom: 8, borderRadius: 10, backgroundColor: COLORS.control },
  clipboardText: { flex: 1, color: COLORS.text, ...FONT.body, fontSize: 15 },
  clipboardAction: { minHeight: 48, paddingHorizontal: 10, justifyContent: 'center' },
  clipboardActionText: { color: COLORS.accent, ...FONT.semibold, fontSize: 15 },
  clipboardNote: { color: COLORS.muted, ...FONT.body, fontSize: 13, lineHeight: 18, paddingTop: 4, paddingBottom: 8 },
  pathDsp: { flexGrow: 1, flexShrink: 1, minWidth: 0, minHeight: 48, justifyContent: 'center', gap: 4 },
  pathDspLine: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  pathDspText: { flexShrink: 1, color: COLORS.muted, ...FONT.numeric, fontSize: 13 },
  /* DSP meter — like a chassis level meter */
  dspTrack: {
    width: 64,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.raised,
    overflow: 'hidden',
  },
  dspFill: { height: '100%', borderRadius: 2 },
  pathActionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-end',
    maxWidth: '100%',
    gap: 6,
    marginLeft: 'auto',
  },


  pathActionTextDisabled: {
    color: COLORS.muted,
    opacity: 0.6,
  },
  rowHeading: {
    color: COLORS.muted,
    ...FONT.semibold,
    fontSize: 13,
    paddingLeft: 8,
    paddingTop: 12,
    paddingBottom: 4,
  },
  branchSection: {
    marginTop: 10,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.wire,
  },

  /* ── IO row — input/output endpoints, sit between path actions and chain */
  ioRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    minHeight: 56, paddingVertical: 4, paddingHorizontal: 8,
    borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: COLORS.hairline,
  },
  ioIconWrap: {
    width: 44, height: 44,
    alignItems: 'center', justifyContent: 'center',
  },
  ioTrailing: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  ioInfo: { flex: 1, minWidth: 0, gap: 2 },
  ioLabel: { color: COLORS.muted, ...FONT.body, fontSize: 12, lineHeight: 16 },
  ioName: { color: COLORS.text, ...FONT.semibold, fontSize: 15, lineHeight: 20 },

  /* ── Split divider ─────────────────────────────────────────────── */
  splitDivider: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 0, paddingVertical: 14,
  },
  splitLine: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: COLORS.stroke },
  splitLabel: { color: COLORS.muted, ...FONT.semibold, fontSize: 11, letterSpacing: 0.4 },

  /* ── Full-screen editor ────────────────────────────────────────── */
  editorHeader: {
    flexWrap: 'wrap',
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 16, paddingTop: 6, paddingBottom: 10,
  },
  focusEditorHeader: { flexWrap: 'nowrap' },
  focusEditorTitle: { minWidth: 0, flexBasis: 0 },
  editorBack: { padding: 4 },
  editorTitleStack: { flex: 1, gap: 2 },
  editorEyebrow: {
    ...FONT.semibold,
    fontSize: 13,
  },
  editorTitle: {
    color: COLORS.text,
    ...FONT.bold,
    fontSize: 22,
    letterSpacing: 0.1,
    lineHeight: 26,
  },
  editorActions: {
    flexWrap: 'wrap', flexDirection: 'row', gap: 8 },
  editorActionBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: COLORS.panel, borderWidth: 1, borderColor: COLORS.stroke,
    alignItems: 'center', justifyContent: 'center',
  },

  /* Block plate — composed icon + model name + power, sits below the title */
  editorPlate: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 16, paddingBottom: 14,
  },
  editorPlateIcon: {
    width: 44, height: 44, borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center', justifyContent: 'center',
  },
  editorPlateCopy: { flex: 1, gap: 2 },
  editorPlateModel: {
    color: COLORS.text,
    ...FONT.semibold,
    fontSize: 14,
    letterSpacing: 0.1,
  },
  editorPlateStatus: {
    ...FONT.semibold,
    fontSize: 13,
  },
  editorPower: {
    width: 42, height: 42, borderRadius: 21,
    borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center',
  },

  /* Hairline rule under the plate — accent line over a muted track */
  editorRule: {
    height: 1,
    marginHorizontal: 16,
    marginBottom: 8,
    position: 'relative',
  },
  editorRuleTrack: {
    position: 'absolute',
    left: 0, right: 0, top: 0, bottom: 0,
    backgroundColor: COLORS.stroke,
    opacity: 0.6,
  },
  editorRuleAccent: {
    position: 'absolute',
    left: 0, top: 0, bottom: 0,
    width: 56,
    borderRadius: 1,
  },
  editorParamPad: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 24 },

  /* ── Sections (preset/device tabs) ─────────────────────────────── */
  section: {
    marginTop: 24,
    paddingTop: 18,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.stroke,
  },
  sectionTitle: {
    color: COLORS.text,
    ...FONT.bold,
    fontSize: 16,
    letterSpacing: -0.2,
    marginBottom: 14,
  },
  sectionBody: { gap: 14 },
  row: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  rowBetween: {
    flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rowBetweenInfo: { flex: 1, paddingRight: 12 },

  /* ── Inputs ───────────────────────────────────────────────────── */
  input: {
    padding: 14, borderRadius: 4, borderWidth: 1, borderColor: COLORS.stroke,
    color: COLORS.text, ...FONT.body, fontSize: 15, backgroundColor: COLORS.panelAlt,
  },
  textArea: {
    minHeight: 180, textAlignVertical: 'top', padding: 14, borderRadius: 4,
    borderWidth: 1, borderColor: COLORS.stroke, color: COLORS.text,
    ...FONT.body, fontSize: 14, backgroundColor: COLORS.panelAlt,
  },
  searchInput: {
    padding: 12, borderRadius: 4, borderWidth: 1, borderColor: COLORS.stroke,
    color: COLORS.text, ...FONT.body, fontSize: 14,
    backgroundColor: COLORS.panelAlt, marginBottom: 12,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    backgroundColor: COLORS.panelAlt,
  },
  searchInputInline: {
    flex: 1,
    color: COLORS.text,
    ...FONT.body,
    fontSize: 14,
    paddingVertical: 0,
  },
  searchClearText: {
    color: COLORS.text,
    ...FONT.semibold,
    fontSize: 12,
  },

  /* ── Buttons ──────────────────────────────────────────────────── */
  button: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
  buttonPrimary: { backgroundColor: COLORS.text },
  buttonGhost: { borderWidth: 1, borderColor: COLORS.stroke, backgroundColor: 'transparent' },
  buttonDisabled: { opacity: 0.45 },
  buttonFlex: { flex: 1 },
  buttonText: { color: COLORS.bg, ...FONT.semibold, fontSize: 14, letterSpacing: 0.1 },
  buttonTextGhost: { color: COLORS.text },

  /* ── Labels ───────────────────────────────────────────────────── */
  label: { color: COLORS.text, ...FONT.body, fontSize: 15 },
  labelHint: { color: COLORS.muted, ...FONT.body, fontSize: 12, marginTop: 4, maxWidth: 240, lineHeight: 16 },
  /* ── Active preset bar ─────────────────────────────────── */
  activePresetBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
  },
  activePresetInfo: { flex: 1, gap: 2 },
  activePresetBarName: { color: COLORS.text, ...FONT.semibold, fontSize: 15, flexShrink: 1 },
  compactIconBtn: {
    width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: COLORS.stroke,
  },
  listHeaderRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sheetRenameRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 14, paddingTop: 14, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: COLORS.stroke },
  libraryHeader: { flex: 1, gap: 4, paddingRight: 12 },
  libraryActionStack: { gap: 8 },
  libraryCurrentName: { color: COLORS.text, ...FONT.semibold, fontSize: 17 },
  libraryMeta: { color: COLORS.muted, ...FONT.numeric, fontSize: 11, lineHeight: 16 },
  libraryRefresh: { minWidth: 104, paddingVertical: 10, paddingHorizontal: 12 },
  libraryPills: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 8 },

  /* ── Segmented control ────────────────────────────────── */
  segmentedControl: {
    flexDirection: 'row', borderRadius: 4, borderWidth: 1,
    borderColor: COLORS.stroke, backgroundColor: COLORS.panelAlt, overflow: 'hidden',
  },
  segment: {
    flex: 1, paddingVertical: 10, alignItems: 'center', justifyContent: 'center',
  },
  segmentDivider: { borderLeftWidth: 1, borderLeftColor: COLORS.stroke },
  segmentActive: { backgroundColor: COLORS.panel },
  segmentText: { color: COLORS.muted, ...FONT.semibold, fontSize: 13, letterSpacing: 0.1 },
  segmentTextActive: { color: COLORS.text },
  focusTabsStack: { flexDirection: 'column', marginTop: 12 },
  focusStackSegment: { flex: 0, paddingHorizontal: 12 },
  focusTabText: { color: COLORS.muted, fontSize: 16, fontWeight: '500' },

  /* ── Dropdown button ──────────────────────────────────── */
  dropdownButton: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 14,
    borderRadius: 4, borderWidth: 1, borderColor: COLORS.stroke, backgroundColor: COLORS.panelAlt,
  },
  dropdownContent: { flex: 1, gap: 2 },
  dropdownLabel: {
    color: COLORS.muted, ...FONT.semibold, fontSize: 13,
  },
  dropdownValue: { color: COLORS.text, ...FONT.semibold, fontSize: 15 },
  dropdownChevron: { color: COLORS.muted, fontSize: 18, marginLeft: 8 },

  /* ── Preset row extras ────────────────────────────────── */
  presetSlotNum: { minWidth: 44, flexShrink: 0, color: COLORS.muted, ...FONT.numeric, fontSize: 12, textAlign: 'center' },
  presetSlotNumActive: { color: COLORS.accent },
  presetMoreButton: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  presetMoreText: { color: COLORS.muted, fontSize: 18 },
  setlistRowActions: {
    flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center', gap: 4, flexShrink: 0 },
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
  setlistRowActionText: { color: COLORS.text, ...FONT.semibold, fontSize: 11 },
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
  setlistAddButtonText: { color: COLORS.accent, ...FONT.semibold, fontSize: 12 },
  setlistAddToolRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 10,
    marginBottom: 8,
  },
  setlistAddToolActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  setlistAddFooter: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  setlistAddFooterCopy: { flex: 1, gap: 4 },
  selectionDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.panel,
  },
  selectionDotActive: { borderColor: COLORS.accentMid, backgroundColor: COLORS.accentDim },
  selectionDotText: { color: COLORS.accent, ...FONT.semibold, fontSize: 13 },

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
    color: COLORS.text, ...FONT.semibold, fontSize: 13,
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
  snapshotTargetText: { color: COLORS.text, ...FONT.numeric, fontSize: 12 },

  /* ── Matrix Mixer ─────────────────────────────────────────────── */
  matrixStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.hairline,
  },
  matrixStatusLabel: {
    color: COLORS.muted,
    ...FONT.body,
    fontSize: 13,
  },
  matrixStatusValue: {
    color: COLORS.text,
    ...FONT.semibold,
    fontSize: 13,
  },
  matrixChannelList: {
    gap: 8,
  },
  matrixChannelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 72,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    backgroundColor: COLORS.panelAlt,
  },
  matrixChannelRowMuted: {
    opacity: 0.72,
  },
  matrixChannelMain: {
    flex: 1,
    minWidth: 0,
    gap: 6,
  },
  matrixChannelName: {
    color: COLORS.text,
    ...FONT.semibold,
    fontSize: 14,
  },
  matrixFlags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  matrixFlagText: {
    color: COLORS.muted,
    ...FONT.body,
    fontSize: 11,
  },
  matrixFlagTextActive: {
    color: COLORS.text,
    ...FONT.semibold,
  },
  matrixValueGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  matrixValueCell: {
    width: 72,
    minHeight: 48,
    justifyContent: 'center',
    gap: 3,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: COLORS.panel,
  },
  matrixValueLabel: {
    color: COLORS.muted,
    ...FONT.body,
    fontSize: 10,
  },
  matrixValueText: {
    color: COLORS.text,
    ...FONT.numeric,
    fontSize: 12,
  },

  /* ── Status / events ──────────────────────────────────────────── */
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { color: COLORS.muted, ...FONT.body, fontSize: 13 },

  /* ── Device hero ──────────────────────────────────────────────── */
  settingsContent: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 32, width: '100%', maxWidth: 700, alignSelf: 'center' },
  settingsHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  settingsEyebrow: { color: COLORS.muted, fontSize: 12, letterSpacing: 2.4, ...FONT.semibold, marginBottom: 4 },
  settingsTitle: { color: COLORS.text, fontSize: 28, ...FONT.bold },
  connectionSummary: { padding: 18, backgroundColor: COLORS.panel, borderRadius: 16, gap: 16 },
  connectionSummaryTop: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  settingsDeviceIcon: { width: 44, alignItems: 'center' },
  settingsFlex: { flex: 1, minWidth: 0 },
  settingsDeviceName: { color: COLORS.text, fontSize: 18, ...FONT.semibold, marginBottom: 5 },
  settingsConnectionState: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  settingsHint: { color: COLORS.muted, fontSize: 15, lineHeight: 22, flexShrink: 1 },
  settingsConnectionActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  settingsSecondaryButton: { minHeight: 48, paddingVertical: 12, paddingHorizontal: 18, backgroundColor: COLORS.control, borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexGrow: 1 },
  settingsButtonText: { color: COLORS.text, fontSize: 16, ...FONT.medium },
  settingsPressed: { backgroundColor: COLORS.raised },
  settingsError: { color: COLORS.danger, fontSize: 15, lineHeight: 22 },
  settingsAbout: { marginTop: 24, gap: 10 },
  settingsGroupTitle: { color: COLORS.muted, ...FONT.semibold, fontSize: 15, paddingHorizontal: 4 },
  settingsSheetContent: { paddingBottom: 20, gap: 12 },
  settingsReadout: { alignItems: 'center', paddingVertical: 20, gap: 8 },
  settingsReadoutValue: { color: COLORS.text, fontSize: 48, ...FONT.bold, ...FONT.numeric, letterSpacing: -1.5 },
  settingsReadoutUnit: { color: COLORS.muted, fontSize: 18, ...FONT.medium, letterSpacing: 0 },
  settingsStepper: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  settingsStepButton: { flexGrow: 1, minWidth: 64, backgroundColor: COLORS.control, borderRadius: 10, padding: 14, alignItems: 'center' },
  settingsPrimaryButton: { backgroundColor: COLORS.text, padding: 16, alignItems: 'center', borderRadius: 12 },
  settingsPrimaryText: { color: COLORS.bg, ...FONT.semibold, fontSize: 17 },
  deviceHero: { paddingTop: 12, paddingBottom: 8, gap: 6 },
  deviceTitle: { fontSize: 28, color: COLORS.text, ...FONT.bold, letterSpacing: -0.4 },
  deviceSubtitle: { color: COLORS.muted, ...FONT.body, fontSize: 13, lineHeight: 18 },

  /* ── Hints / footer ───────────────────────────────────────────── */
  hint: { marginTop: 24, alignItems: 'center', paddingHorizontal: 16 },
  hintText: { color: COLORS.muted, ...FONT.body, fontSize: 12, textAlign: 'center', lineHeight: 18, opacity: 0.85 },

  /* ── Bottom sheet: actions ─────────────────────────────────────── */
  sheetActions: { gap: 10 },
  actionButton: { paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  actionButtonPrimary: { backgroundColor: COLORS.accentDim, borderWidth: 1, borderColor: COLORS.accentMid },
  actionButtonPrimaryText: { color: COLORS.accent, ...FONT.semibold, fontSize: 16 },
  actionButtonDanger: { backgroundColor: 'rgba(228,107,97,0.12)', borderWidth: 1, borderColor: 'rgba(228,107,97,0.25)' },
  actionButtonDangerText: { color: COLORS.danger, ...FONT.semibold, fontSize: 16 },
  actionButtonGhost: { borderWidth: 1, borderColor: COLORS.stroke },
  actionButtonText: { color: COLORS.text, ...FONT.semibold, fontSize: 16 },

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
  sheetListText: { flex: 1, color: COLORS.text, ...FONT.body, fontSize: 15 },
  sheetListTextDim: { color: COLORS.muted },

  /* ── Block type picker ─────────────────────────────────────────── */
  typeGrid: {},
  typeCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14, minHeight: 56, paddingVertical: 8, paddingHorizontal: 4,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.stroke,
  },
  typeAccent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, borderTopLeftRadius: 12, borderBottomLeftRadius: 12 },
  typeIconWrap: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  typeIcon: { width: 28, height: 28 },
  typeInfo: { flex: 1 },
  typeLabel: { color: COLORS.text, ...FONT.semibold, fontSize: 15 },
  typeMeta: { color: COLORS.muted, ...FONT.body, fontSize: 12, marginTop: 2 },

  /* ── Model picker ──────────────────────────────────────────────── */
  modelSectionHeader: {
    paddingTop: 12,
    paddingBottom: 6,
    paddingHorizontal: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.hairline,
  },
  modelSectionTitle: {
    color: COLORS.muted,
    ...FONT.semibold,
    fontSize: 13,
  },
  modelDot: { width: 10, height: 10, borderRadius: 5 },
  modelInfo: { flex: 1 },
  modelMetaText: {
    color: COLORS.muted,
    ...FONT.body,
    fontSize: 12,
    marginTop: 3,
  },
  dspBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, backgroundColor: COLORS.panelAlt, borderWidth: 1, borderColor: COLORS.stroke },
  dspBadgeText: { color: COLORS.muted, ...FONT.numeric, fontSize: 11 },
  pickerDspHint: { color: COLORS.muted, ...FONT.body, fontSize: 14, lineHeight: 20, marginBottom: 12 },
  pickerNav: { marginBottom: 12 },
  backButton: {
    alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10,
    borderWidth: 1, borderColor: COLORS.stroke,
  },
  backButtonText: { color: COLORS.text, ...FONT.semibold, fontSize: 13 },

  /* ── Parameter editor: knob grid ───────────────────────────────── */
  paramContainer: { gap: 20 },
  blockLabelEditor: {
    gap: 8,
    paddingBottom: 16,
    marginBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.stroke,
  },
  knobGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    columnGap: 12,
    rowGap: 22,
    paddingVertical: 12,
  },
  sliderStack: {
    gap: 10,
    paddingVertical: 4,
  },
  toggleLabelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minWidth: 0,
  },
  toggleSection: {
    gap: 14,
    paddingTop: 18,
    marginTop: 6,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.stroke,
  },
  toggleRow: { gap: 8 },
  toggleLabel: {
    color: COLORS.text,
    ...FONT.semibold,
    fontSize: 15,
    flexShrink: 1,
  },
  toggleLabels: { flexDirection: 'row', gap: 8 },
  toggleLabelsStacked: { flexDirection: 'column' },
  togglePillStacked: { flex: 0 },
  togglePill: {
    flex: 1,
    minWidth: 0,
    minHeight: 48,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.control,
    backgroundColor: COLORS.control,
  },
  togglePillActive: { borderColor: COLORS.accent, backgroundColor: COLORS.raised },
  togglePillText: { color: COLORS.muted, ...FONT.semibold, fontSize: 15, textAlign: 'center', flexShrink: 1 },
  togglePillTextActive: { color: COLORS.text },
  helpSheetBody: { paddingTop: 4, paddingBottom: 18 },
  helpSheetText: {
    color: COLORS.text,
    ...FONT.body,
    fontSize: 14,
    lineHeight: 22,
  },
  snapshotColorPill: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  snapshotColorSwatch: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },

  /* ── IO parameters ─────────────────────────────────────────────── */
  paramSectionTitle: {
    color: COLORS.text,
    ...FONT.semibold,
    fontSize: 13,
    marginTop: 16,
    marginBottom: 8,
  },
  paramList: { maxHeight: 340 },
  paramHint: { color: COLORS.muted, ...FONT.body, fontSize: 13, textAlign: 'center', paddingVertical: 20, lineHeight: 18 },
});
