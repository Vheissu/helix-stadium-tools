// Block type categories matching blockTypes.json
export type BlockKind =
  | 'amp'
  | 'preamp'
  | 'cab'
  | 'distortion'
  | 'delay'
  | 'reverb'
  | 'modulation'
  | 'dynamics'
  | 'eq'
  | 'pitch_synth'
  | 'wah_filter'
  | 'volume_pan'
  | 'looper'
  | 'fx_loop';

// Data for a single block in the signal flow
export interface BlockData {
  id: number;
  name: string;
  kind: string;
  enabled?: boolean;
  usage?: number;
}

// Path indices: 0=1A, 1=1B, 2=2A, 3=2B
export type PathIndex = 0 | 1 | 2 | 3;

// Block slot indices (0-11)
export type BlockIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

// Reference to a specific slot in the grid
export interface BlockSlot {
  path: PathIndex;
  block: BlockIndex;
}

// The 4x12 signal flow grid
export type SignalFlowGrid = (BlockData | null)[][];

export type IOType = 'input' | 'output';

export interface IOBlockState {
  blockId: number | null;
  modelId: number | null;
  name: string;
  params: Record<number, number | boolean>;
}

export interface RowIOState {
  input: IOBlockState | null;
  output: IOBlockState | null;
}

export type IOGrid = RowIOState[];

// Props for BlockCard component
export interface BlockCardProps {
  block: BlockData | null;
  index: number;
  isSelected: boolean;
  showConnector: boolean;
  onPress: () => void;
  onLongPress?: () => void;
}

// Props for BlockRow component
export interface BlockRowProps {
  blocks: (BlockData | null)[];
  pathIndex: PathIndex;
  selectedSlot: BlockSlot | null;
  onSelectSlot: (slot: BlockSlot) => void;
  onOpenSlotMenu?: (slot: BlockSlot) => void;
  label?: string;
}

// Props for SignalPath component
export interface SignalPathProps {
  pathNumber: 1 | 2;
  grid: SignalFlowGrid;
  io: IOGrid;
  selectedSlot: BlockSlot | null;
  onSelectSlot: (slot: BlockSlot) => void;
  onOpenSlotMenu: (slot: BlockSlot) => void;
  onSelectIO: (row: PathIndex, ioType: IOType) => void;
}

// Props for SplitSection component
export interface SplitSectionProps {
  pathA: (BlockData | null)[];
  pathB: (BlockData | null)[];
  pathAIndex: PathIndex;
  pathBIndex: PathIndex;
  io: IOGrid;
  selectedSlot: BlockSlot | null;
  onSelectSlot: (slot: BlockSlot) => void;
  onOpenSlotMenu: (slot: BlockSlot) => void;
  onSelectIO: (row: PathIndex, ioType: IOType) => void;
}

// Path labels for display
export const PATH_LABELS: Record<PathIndex, string> = {
  0: '1A',
  1: '1B',
  2: '2A',
  3: '2B',
};
