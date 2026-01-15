import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Switch,
  Modal,
  Platform,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { HelixClient } from './src/protocol/helixClient';
import blockTypes from './src/data/blockTypes.json';
import ioModels from './src/data/ioModels.json';
import { BlockIcon } from './src/icons/BlockIcons';
import { SignalFlowSection } from './src/components/signalFlow';
import type { BlockData, BlockSlot, IOGrid, IOType, PathIndex, SignalFlowGrid } from './src/types/signalFlow';

const COLORS = {
  bg: '#0b0d0f',
  panel: '#14171b',
  panelAlt: '#0f1216',
  stroke: '#2a2f36',
  text: '#f2f2ee',
  muted: '#9ca3ab',
  accent: '#c9c3b1',
  danger: '#e46b61',
  success: '#7bbf9e',
};

const FONT_BODY = Platform.select({ ios: 'Avenir Next', android: 'sans-serif' });
const FONT_MONO = Platform.select({ ios: 'Menlo', android: 'monospace' });
const FONT_DISPLAY = Platform.select({ ios: 'Georgia', android: 'serif' });
const DSP_CAP = 70;

type IOModelParam = {
  id: number | null;
  key: string;
  name: string;
  type: 'i' | 'f' | 'b';
  min: number;
  max: number;
  def: number;
  options?: string[] | null;
  faux?: boolean;
  property_key?: string | null;
};

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

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionBody}>{children}</View>
  </View>
);

const findFlows = (state: any): any[] | null => {
  if (!state || typeof state !== 'object') return null;
  const seen = new Set<any>();
  const queue: any[] = [state];
  while (queue.length) {
    const current = queue.shift();
    if (!current || typeof current !== 'object') continue;
    if (seen.has(current)) continue;
    seen.add(current);
    const sfg = current.sfg_;
    if (sfg && typeof sfg === 'object' && Array.isArray(sfg.flow)) return sfg.flow;
    if (Array.isArray(current.flow)) return current.flow;
    if (Array.isArray(current)) {
      current.forEach((item) => queue.push(item));
    } else {
      Object.values(current).forEach((value) => queue.push(value));
    }
  }
  return null;
};

export default function App() {
  const clientRef = useRef<HelixClient | null>(null);
  const syncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [host, setHost] = useState('p35x1.local');
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [notesVisible, setNotesVisible] = useState(false);
  const [autoCab, setAutoCab] = useState(true);
  const [notesText, setNotesText] = useState('');
  const [status, setStatus] = useState('Idle');
  const [lastEvent, setLastEvent] = useState('—');
  const [selectedSlot, setSelectedSlot] = useState<BlockSlot | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerStep, setPickerStep] = useState<'type' | 'model'>('type');
  const [pickerType, setPickerType] = useState<null | keyof typeof blockTypes>(null);
  const [pickerQuery, setPickerQuery] = useState('');
  const [targetSlot, setTargetSlot] = useState({ path: 0, block: 0 });
  const [slotMenuOpen, setSlotMenuOpen] = useState(false);
  const [slotMenuTarget, setSlotMenuTarget] = useState<BlockSlot | null>(null);
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

  const modelLookup = useMemo(() => {
    const map = new Map<number, { name: string; kind: string; usage: number }>();
    Object.entries(blockTypes).forEach(([key, group]) => {
      group.models.forEach((item) => {
        map.set(item.id, { name: item.name, kind: key, usage: item.usage ?? 0 });
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

  const rowLabels = ['1A', '1B', '2A', '2B']; // Used in picker modal
  const rowToFlow = (row: PathIndex) => (row < 2 ? 0 : 1);
  const ioBlockIndex = (row: PathIndex, ioType: IOType) => {
    if (ioType === 'input') {
      return row % 2 === 0 ? 0 : 14;
    }
    return row % 2 === 0 ? 13 : 27;
  };

  const effectBlockIndex = (row: PathIndex, slot: number) => (row % 2 === 0 ? slot + 1 : slot + 15);
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
    const items = blockTypes[pickerType].models;
    if (!pickerQuery.trim()) return items;
    const q = pickerQuery.trim().toLowerCase();
    return items.filter((item) => item.name.toLowerCase().includes(q));
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
  const availableUsage = useMemo(() => {
    const remaining = targetSlot.path < 2 ? DSP_CAP - pathUsage.path1 : DSP_CAP - pathUsage.path2;
    return Math.max(0, remaining);
  }, [pathUsage, targetSlot.path]);

  const connect = async () => {
    if (connecting || connected) return;
    setConnecting(true);
    try {
      const client = new HelixClient(host.trim());
      await client.connect();
      client.startListener((evt) => {
        const summary = `${evt.addr} ${evt.typetags ?? ''} ${JSON.stringify(evt.vals)}`;
        setLastEvent(summary);
      });
      clientRef.current = client;
      setConnected(true);
      setStatus('Connected');
      handleSync();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setStatus(`Connection failed: ${message}`);
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
    setStatus('Disconnected');
  };

  const requireClient = () => {
    if (!clientRef.current) {
      setStatus('Not connected');
      return null;
    }
    return clientRef.current;
  };

  const handleNotesToggle = (value: boolean) => {
    setNotesVisible(value);
    const client = requireClient();
    if (!client) return;
    client.setNotesVisible(value);
    setStatus(value ? 'Notes panel opened' : 'Notes panel closed');
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

  const insertModel = (modelId: number, name: string, kind: string, usage = 0) => {
    const client = requireClient();
    if (!client) return;
    const p = targetSlot.path as PathIndex;
    const b = targetSlot.block;
    const blockId = effectBlockIndex(p, b);
    if (usage > availableUsage) {
      setStatus('DSP cap reached (70 per path)');
      return;
    }
    const flow = rowToFlow(p);
    client.setModel(flow, blockId, modelId, 0);
    setStatus(`Inserted ${name} into ${rowLabels[p]}-${b + 1}`);
    setGrid((prev) => {
      const next = prev.map((row) => row.slice());
      if (next[p] && next[p][b] !== undefined) {
        next[p][b] = { id: modelId, name, kind, usage };
      }
      return next;
    });
    setPickerOpen(false);
    scheduleSync();
  };

  const selectSlot = (slot: BlockSlot) => {
    setSelectedSlot(slot);
    setTargetSlot({ path: slot.path, block: slot.block });
    setPickerStep('type');
    setPickerType(null);
    setPickerQuery('');
    setPickerOpen(true);
  };

  const openSlotMenu = (slot: BlockSlot) => {
    setSlotMenuTarget(slot);
    setSlotMenuOpen(true);
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

  const clearSlot = (slot: BlockSlot) => {
    const client = requireClient();
    if (!client) return;
    const blockId = effectBlockIndex(slot.path, slot.block);
    client.clearBlocks(rowToFlow(slot.path), [blockId]);
    setGrid((prev) => {
      const next = prev.map((row) => row.slice());
      if (next[slot.path] && next[slot.path][slot.block] !== undefined) {
        next[slot.path][slot.block] = null;
      }
      return next;
    });
    setStatus(`Cleared ${rowLabels[slot.path]}-${slot.block + 1}`);
    setSlotMenuOpen(false);
  };

  const setIOModel = (model: IOModel) => {
    const client = requireClient();
    if (!client) return;
    const row = ioPickerRow;
    const blockId = ioBlockIndex(row, ioPickerType);
    const flow = rowToFlow(row);
    client.setModel(flow, blockId, model.id, 0);
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
  };

  const updateIOParam = (param: IOModelParam, value: number | boolean) => {
    const client = requireClient();
    if (!client) return;
    const row = ioPickerRow;
    const flow = rowToFlow(row);
    const blockId = ioBlockIndex(row, ioPickerType);
    if (param.faux && param.property_key) {
      client.setProperty(param.property_key, value, param.type);
    } else if (param.id !== null) {
      client.setParamValue(flow, blockId, param.id, value, 0, -1, param.type);
    }
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
          name: existing?.name ?? '—',
          params: {
            ...(existing?.params ?? {}),
            [paramKey]: value,
          },
        };
      }
      return next;
    });
    setStatus(`Updated ${rowLabels[row]} ${ioPickerType} ${param.name}`);
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

  const handleSync = async () => {
    const client = requireClient();
    if (!client) return;
    setStatus('Syncing from device...');
    try {
      const state = await client.getEditBufferState();
      if (!state) {
        setStatus('Sync failed: no response');
        return;
      }
      const flows = findFlows(state);
      if (!Array.isArray(flows)) {
        setStatus('Sync failed: no flow data');
        return;
      }
      if (!flows.length) {
        setStatus('Sync failed: empty flow data');
        return;
      }
      const nextGrid: SignalFlowGrid = Array.from({ length: 4 }, () =>
        Array.from({ length: 12 }, () => null)
      );
      const nextIO: IOGrid = Array.from({ length: 4 }, () => ({ input: null, output: null }));
      const assignSlot = (rowIndex: number, slotIndex: number, modelId: number | null) => {
        if (!nextGrid[rowIndex]) return;
        if (slotIndex < 0 || slotIndex >= 12) return;
        if (typeof modelId === 'number' && modelLookup.has(modelId)) {
          const info = modelLookup.get(modelId)!;
          nextGrid[rowIndex][slotIndex] = {
            id: modelId,
            name: info.name,
            kind: info.kind,
            usage: info.usage,
          };
        } else {
          nextGrid[rowIndex][slotIndex] = {
            id: Number(modelId) || 0,
            name: 'Block',
            kind: 'fx',
            usage: 0,
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
        const name = meta?.name ?? `ID ${modelId ?? '—'}`;
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
            assignSlot(rowA, pos - 1, typeof mid === 'number' ? mid : null);
            return;
          }
          if (pos >= 15 && pos <= 26) {
            assignSlot(rowB, pos - 15, typeof mid === 'number' ? mid : null);
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
      setStatus('Synced');
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setStatus(`Sync failed: ${message}`);
    }
  };

  const scheduleSync = (delayMs = 350) => {
    if (syncTimerRef.current) {
      clearTimeout(syncTimerRef.current);
    }
    syncTimerRef.current = setTimeout(() => {
      syncTimerRef.current = null;
      handleSync();
    }, delayMs);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Stadium Remote</Text>
          <Text style={styles.subtitle}>Mobile control prototype</Text>
        </View>

        <Section title="Connection">
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              value={host}
              onChangeText={setHost}
              placeholder="p35x1.local or IP"
              placeholderTextColor={COLORS.muted}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Pressable style={[styles.button, connected ? styles.buttonGhost : styles.buttonPrimary]} onPress={connect}>
              <Text style={[styles.buttonText, connected && styles.buttonTextGhost]}>
                {connecting ? '...' : 'Connect'}
              </Text>
            </Pressable>
            <Pressable style={[styles.button, styles.buttonGhost]} onPress={disconnect}>
              <Text style={[styles.buttonText, styles.buttonTextGhost]}>Disconnect</Text>
            </Pressable>
          </View>
          <View style={styles.statusRow}>
            <Text style={[styles.statusDot, { color: connected ? COLORS.success : COLORS.danger }]}>●</Text>
            <Text style={styles.statusText}>{status}</Text>
          </View>
          <Text style={styles.eventText}>Last event: {lastEvent}</Text>
        </Section>

        <Section title="Notes Panel">
          <View style={styles.rowBetween}>
            <Text style={styles.label}>Visible</Text>
            <Switch value={notesVisible} onValueChange={handleNotesToggle} />
          </View>
          <TextInput
            style={styles.textArea}
            value={notesText}
            onChangeText={setNotesText}
            multiline
            numberOfLines={8}
            placeholder="Preset notes"
            placeholderTextColor={COLORS.muted}
          />
          <Pressable style={[styles.button, styles.buttonPrimary]} onPress={handleNotesSend}>
            <Text style={styles.buttonText}>Send Notes</Text>
          </Pressable>
        </Section>

        <Section title="Global">
          <View style={styles.rowBetween}>
            <Text style={styles.label}>Auto-Cab</Text>
            <Switch value={autoCab} onValueChange={handleAutoCab} />
          </View>
          <Text style={styles.sectionHint}>
            Tap a slot to insert a block. Long-press a block for actions.
          </Text>
        </Section>

        <SignalFlowSection
          grid={grid}
          io={ioGrid}
          selectedSlot={selectedSlot}
          onSelectSlot={selectSlot}
          onOpenSlotMenu={openSlotMenu}
          onSelectIO={selectIO}
          onSync={handleSync}
        />

        <Modal
          visible={slotMenuOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setSlotMenuOpen(false)}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Block Actions</Text>
                <Pressable onPress={() => setSlotMenuOpen(false)} accessibilityLabel="Close actions">
                  <Text style={styles.modalClose}>×</Text>
                </Pressable>
              </View>
              <Text style={styles.modalSubtitle}>
                {slotMenuTarget
                  ? `${rowLabels[slotMenuTarget.path]} · Block ${slotMenuTarget.block + 1}`
                  : '—'}
              </Text>
              <Pressable
                style={[styles.button, styles.buttonGhost]}
                onPress={() => slotMenuTarget && clearSlot(slotMenuTarget)}
              >
                <Text style={[styles.buttonText, styles.buttonTextGhost]}>Clear Block</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonPrimary]}
                onPress={() => setSlotMenuOpen(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Modal visible={ioPickerOpen} transparent animationType="fade" onRequestClose={() => setIoPickerOpen(false)}>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {ioPickerType === 'input' ? 'Input' : 'Output'} Settings
                </Text>
                <Pressable onPress={() => setIoPickerOpen(false)} accessibilityLabel="Close IO picker">
                  <Text style={styles.modalClose}>×</Text>
                </Pressable>
              </View>
              <Text style={styles.modalSubtitle}>
                Target: {rowLabels[ioPickerRow]} · {ioPickerType === 'input' ? 'Input' : 'Output'}
              </Text>

              <TextInput
                style={styles.input}
                value={ioPickerQuery}
                onChangeText={setIoPickerQuery}
                placeholder={`Search ${ioPickerType === 'input' ? 'inputs' : 'outputs'}`}
                placeholderTextColor={COLORS.muted}
              />

              <ScrollView style={styles.modalList}>
                {ioPickerModels.map((model) => {
                  const isActive = activeIOModel?.modelId === model.id;
                  return (
                    <Pressable
                      key={model.id}
                      style={[styles.modalListItem, isActive && styles.modalListItemActive]}
                      onPress={() => setIOModel(model)}
                      accessibilityLabel={`Select ${model.name}`}
                    >
                      <Text style={styles.modalListText}>{model.name}</Text>
                      <Text style={styles.modalListMeta}>ID {model.id}</Text>
                    </Pressable>
                  );
                })}
              </ScrollView>

              <Text style={styles.modalSubtitle}>Parameters</Text>
              <ScrollView style={styles.paramList}>
                {activeIOModelMeta ? (
                  activeIOModelMeta.params.map((param) => {
                    const paramKey = param.id !== null ? String(param.id) : param.property_key ?? param.key;
                    const current = activeIOModel?.params?.[paramKey] ?? param.def ?? 0;
                    const options = param.options ?? null;
                    if (options && options.length) {
                      const min = typeof param.min === 'number' ? param.min : 0;
                      const max = typeof param.max === 'number' ? param.max : min + options.length - 1;
                      return (
                        <View key={param.id} style={styles.paramRow}>
                          <Text style={styles.paramLabel}>{param.name}</Text>
                          <View style={styles.paramOptions}>
                            {options.map((label, idx) => {
                              let value = idx;
                              if (param.type === 'b') {
                                value = idx === 0 ? 0 : 1;
                              } else if (options.length === max - min + 1) {
                                value = min + idx;
                              }
                              const isActive = Number(current) === value;
                              return (
                                <Pressable
                                  key={`${param.id}-${value}`}
                                  style={[styles.paramOption, isActive && styles.paramOptionActive]}
                                  onPress={() => updateIOParam(param, value)}
                                >
                                  <Text style={styles.paramOptionText}>{label}</Text>
                                </Pressable>
                              );
                            })}
                          </View>
                        </View>
                      );
                    }
                    return (
                      <View key={param.id} style={styles.paramRow}>
                        <Text style={styles.paramLabel}>{param.name}</Text>
                        <TextInput
                          style={styles.paramInput}
                          defaultValue={String(current)}
                          keyboardType="numeric"
                          onEndEditing={(evt) => {
                            const nextVal = Number(evt.nativeEvent.text);
                            if (Number.isFinite(nextVal)) {
                              updateIOParam(param, nextVal);
                            }
                          }}
                        />
                      </View>
                    );
                  })
                ) : (
                  <Text style={styles.modalHint}>Select an input/output model to edit parameters.</Text>
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>

        <Modal visible={pickerOpen} transparent animationType="fade" onRequestClose={() => setPickerOpen(false)}>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {pickerStep === 'type' ? 'Choose Block Type' : blockTypes[pickerType ?? 'amp']?.label}
                </Text>
                <Pressable onPress={() => setPickerOpen(false)} accessibilityLabel="Close picker">
                  <Text style={styles.modalClose}>×</Text>
                </Pressable>
              </View>

              <Text style={styles.modalSubtitle}>
                Target: {rowLabels[targetSlot.path]} · Block {targetSlot.block + 1}
              </Text>
              <Text style={styles.modalSubtitle}>
                DSP headroom: {availableUsage.toFixed(1)} / {DSP_CAP}
              </Text>

              {pickerStep === 'type' ? (
                <View style={styles.typeGrid}>
                  {blockTypeOrder.map((typeKey) => {
                    const group = blockTypes[typeKey];
                    return (
                      <Pressable
                        key={typeKey}
                        style={styles.typeCard}
                        onPress={() => selectBlockType(typeKey)}
                        accessibilityLabel={`Select ${group.label}`}
                      >
                        <BlockIcon type={typeKey} size={20} color={COLORS.text} />
                        <Text style={styles.typeLabel}>{group.label}</Text>
                        <Text style={styles.typeMeta}>{group.models.length} models</Text>
                      </Pressable>
                    );
                  })}
                </View>
              ) : (
                <>
                  <View style={styles.rowBetween}>
                    <Pressable style={[styles.button, styles.buttonGhost]} onPress={() => setPickerStep('type')}>
                      <Text style={[styles.buttonText, styles.buttonTextGhost]}>Back</Text>
                    </Pressable>
                    <Text style={styles.modalHint}>{blockTypes[pickerType ?? 'amp']?.label}</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    value={pickerQuery}
                    onChangeText={setPickerQuery}
                    placeholder="Search models"
                    placeholderTextColor={COLORS.muted}
                  />
                  <ScrollView style={styles.modalList}>
                    {pickerModels.map((item) => {
                      const required = item.usage ?? 0;
                      const canInsert = required <= availableUsage;
                      return (
                        <Pressable
                          key={item.id}
                          style={[styles.modalListItem, !canInsert && styles.modalListItemDisabled]}
                          onPress={() => insertModel(item.id, item.name, pickerType ?? 'fx', item.usage ?? 0)}
                          accessibilityLabel={`Insert ${item.name}`}
                          disabled={!canInsert}
                        >
                          <BlockIcon type={pickerType ?? ''} size={16} color={COLORS.muted} />
                          <Text style={styles.modalListText}>{item.name}</Text>
                          <Text style={styles.modalListMeta}>ID {item.id}</Text>
                          <Text style={styles.modalListMeta}>{required.toFixed(1)} DSP</Text>
                        </Pressable>
                      );
                    })}
                  </ScrollView>
                </>
              )}
            </View>
          </View>
        </Modal>

        <View style={styles.footer}>
          <Text style={styles.footerText}>TCP 2001/2002 · ZMTP + OSC</Text>
        </View>
      </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  container: {
    padding: 20,
    paddingBottom: 48,
  },
  header: {
    marginBottom: 18,
  },
  title: {
    fontSize: 28,
    color: COLORS.text,
    fontFamily: FONT_DISPLAY,
    letterSpacing: 0.8,
  },
  subtitle: {
    color: COLORS.muted,
    fontFamily: FONT_MONO,
    marginTop: 4,
  },
  section: {
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: COLORS.stroke,
  },
  sectionTitle: {
    color: COLORS.accent,
    fontFamily: FONT_MONO,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  sectionBody: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    color: COLORS.text,
    fontFamily: FONT_MONO,
    backgroundColor: COLORS.panelAlt,
  },
  textArea: {
    minHeight: 160,
    textAlignVertical: 'top',
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    color: COLORS.text,
    fontFamily: FONT_MONO,
    backgroundColor: COLORS.panelAlt,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: COLORS.accent,
  },
  buttonGhost: {
    borderWidth: 1,
    borderColor: COLORS.stroke,
  },
  buttonText: {
    color: COLORS.bg,
    fontFamily: FONT_BODY,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  buttonTextGhost: {
    color: COLORS.text,
  },
  label: {
    color: COLORS.text,
    fontFamily: FONT_BODY,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    fontSize: 18,
  },
  statusText: {
    color: COLORS.muted,
    fontFamily: FONT_MONO,
  },
  eventText: {
    marginTop: 8,
    color: COLORS.muted,
    fontFamily: FONT_MONO,
    fontSize: 11,
  },
  sectionHint: {
    color: COLORS.muted,
    fontFamily: FONT_MONO,
    fontSize: 11,
    marginBottom: 10,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: COLORS.panel,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    padding: 16,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    color: COLORS.text,
    fontFamily: FONT_DISPLAY,
    fontSize: 18,
  },
  modalClose: {
    color: COLORS.text,
    fontFamily: FONT_DISPLAY,
    fontSize: 22,
    paddingHorizontal: 8,
  },
  modalSubtitle: {
    color: COLORS.muted,
    fontFamily: FONT_MONO,
    marginTop: 6,
    marginBottom: 12,
  },
  modalHint: {
    color: COLORS.muted,
    fontFamily: FONT_MONO,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  typeCard: {
    width: '47%',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    backgroundColor: COLORS.panelAlt,
    padding: 12,
    gap: 6,
  },
  typeLabel: {
    color: COLORS.text,
    fontFamily: FONT_BODY,
    fontSize: 14,
  },
  typeMeta: {
    color: COLORS.muted,
    fontFamily: FONT_MONO,
    fontSize: 11,
  },
  modalList: {
    marginTop: 10,
  },
  modalListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.stroke,
  },
  modalListItemActive: {
    backgroundColor: 'rgba(201, 195, 177, 0.12)',
  },
  modalListItemDisabled: {
    opacity: 0.4,
  },
  modalListText: {
    flex: 1,
    color: COLORS.text,
    fontFamily: FONT_BODY,
  },
  modalListMeta: {
    color: COLORS.muted,
    fontFamily: FONT_MONO,
    fontSize: 11,
  },
  paramList: {
    marginTop: 6,
    maxHeight: 220,
  },
  paramRow: {
    marginBottom: 10,
    gap: 6,
  },
  paramLabel: {
    color: COLORS.muted,
    fontFamily: FONT_MONO,
    fontSize: 11,
  },
  paramInput: {
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    color: COLORS.text,
    fontFamily: FONT_MONO,
    backgroundColor: COLORS.panelAlt,
  },
  paramOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  paramOption: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.stroke,
    backgroundColor: COLORS.panelAlt,
  },
  paramOptionActive: {
    borderColor: COLORS.accent,
  },
  paramOptionText: {
    color: COLORS.text,
    fontFamily: FONT_BODY,
    fontSize: 12,
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.muted,
    fontFamily: FONT_MONO,
    fontSize: 12,
  },
});
