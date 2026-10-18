import { AccessibleText as Text } from '../accessibility/AccessibleText';
import { announce, useAccessibilityPreferences } from '../accessibility/AccessibilityPreferences';
import { Action as Pressable, AccessibilitySettings } from '../accessibility/controls';
import { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Switch, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import catalogue from '../data/blockTypes.json';
import { ParamSlider } from './ParamSlider';
import { BottomSheet } from './BottomSheet';
import { AppInfo } from './AppInfo';
import { COLORS, FONTS } from '../theme/colors';
import { fitsDspBudget, getDspHeadroom, STANDARD_DSP_CAP } from '../utils/dspBudget';

type PreviewParam = {
  key: string; name: string; def: number | boolean; min: number; max: number;
  type: 'i' | 'f' | 'b'; unit?: string | null; options?: string[] | null;
  display_min?: number; display_max?: number;
};
type PreviewModel = { id: number; name: string; category: string; usage?: number; params: PreviewParam[] };
type PreviewBlock = { model: PreviewModel; enabled: boolean; values: Record<string, number | boolean> };
const groups = catalogue as Record<string, { models: PreviewModel[] }>;
const models = Object.values(groups).flatMap((group) => group.models);
const makeBlock = (model: PreviewModel): PreviewBlock => ({
  model, enabled: true, values: Object.fromEntries(model.params.map((param) => [param.key, param.def])),
});

// Deliberately has no device client or transport imports: preview edits are local.
export function OfflinePreview({ onClose }: { onClose: () => void }) {
  const { accessibleLayout, screenReader } = useAccessibilityPreferences();
  const [blocks, setBlocks] = useState<PreviewBlock[]>(() =>
    ['amp', 'cab', 'delay'].map((category) => makeBlock(groups[category].models[0]))
  );
  const [selected, setSelected] = useState(0);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const usage = blocks.reduce((sum, block) => sum + (block.model.usage ?? 0), 0);
  const headroom = getDspHeadroom(usage);
  const active = blocks[selected];
  const results = useMemo(() => models.filter((model) =>
    model.name.toLowerCase().includes(query.trim().toLowerCase())
  ), [query]);
  const updateActive = (update: Partial<PreviewBlock>) => setBlocks((previous) =>
    previous.map((block, index) => index === selected ? { ...block, ...update } : block)
  );
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Text accessibilityRole="header" style={styles.title}>Offline preview</Text>
          <Pressable accessibilityRole="button" style={styles.button} onPress={onClose}><Text style={styles.action}>Done</Text></Pressable>
        </View>
        <ScrollView keyboardShouldPersistTaps="handled" scrollEnabled={scrollEnabled} contentContainerStyle={styles.content}>
          <Text style={styles.body}>Try adding blocks, changing parameters, and bypassing effects. No device is connected, no audio is produced, and these edits are discarded when you leave.</Text>
          <Text style={styles.label}>Sample path · DSP estimate {usage.toFixed(1)}/{STANDARD_DSP_CAP}</Text>
          <View style={[styles.blocks, (accessibleLayout || screenReader) && { flexDirection: 'column', flexWrap: 'nowrap', alignItems: 'stretch' }]}>
            {blocks.map((block, index) => (
              <Pressable key={index} accessibilityLabel={`Edit ${block.model.name}, position ${index + 1}, ${block.enabled ? 'enabled' : 'bypassed'}`} accessibilityRole="button" accessibilityState={{ selected: index === selected }} style={[styles.block, index === selected && styles.selected]} onPress={() => setSelected(index)}>
                <Text style={styles.label}>{block.model.name}</Text>
                <Text style={styles.body}>{block.enabled ? 'On' : 'Bypassed'}</Text>
              </Pressable>
            ))}
          </View>
          <Pressable accessibilityRole="button" disabled={blocks.length >= 12} style={styles.button} onPress={() => setPickerOpen(true)}><Text style={styles.action}>{blocks.length >= 12 ? 'Path full' : 'Add block'}</Text></Pressable>
          {active && <View style={styles.header}>
            <Pressable accessibilityLabel={`Move ${active.model.name} earlier`} disabled={selected === 0} onPress={() => {
              if (selected === 0) return;
              const next = [...blocks]; [next[selected - 1], next[selected]] = [next[selected], next[selected - 1]];
              setBlocks(next); setSelected(selected - 1); announce(`${active.model.name}, position ${selected}`);
            }}><Text style={styles.action}>Move earlier</Text></Pressable>
            <Pressable accessibilityLabel={`Move ${active.model.name} later`} disabled={selected === blocks.length - 1} onPress={() => {
              if (selected === blocks.length - 1) return;
              const next = [...blocks]; [next[selected], next[selected + 1]] = [next[selected + 1], next[selected]];
              setBlocks(next); setSelected(selected + 1); announce(`${active.model.name}, position ${selected + 2}`);
            }}><Text style={styles.action}>Move later</Text></Pressable>
          </View>}
          {active && (
            <View style={styles.parameters}>
              <Text accessibilityRole="header" style={styles.title}>{active.model.name}</Text>
              <View style={styles.header}>
                <Text style={styles.label}>Enabled</Text>
                <Switch accessibilityLabel={`${active.model.name} enabled`} value={active.enabled} onValueChange={(enabled) => updateActive({ enabled })} />
                <Pressable accessibilityRole="button" accessibilityLabel={`Remove ${active.model.name}`} style={styles.button} onPress={() => { setBlocks((previous) => previous.filter((_, index) => index !== selected)); setSelected(0); }}><Text style={styles.action}>Remove</Text></Pressable>
              </View>
              {active.model.params.map((param) => (
                <ParamSlider key={`${selected}-${active.model.id}-${param.key}`} label={param.name} value={active.values[param.key] ?? param.def} min={param.min} max={param.max} type={param.type} unit={param.unit} options={param.options} displayMin={param.display_min} displayMax={param.display_max} onDragChange={(dragging) => setScrollEnabled(!dragging)} onChange={(value) => updateActive({ values: { ...active.values, [param.key]: value } })} />
              ))}
            </View>
          )}
          <AccessibilitySettings />
          <AppInfo />
        </ScrollView>
        <BottomSheet visible={pickerOpen} onClose={() => setPickerOpen(false)} title="Add a sample block">
          <TextInput accessibilityLabel="Search models" style={styles.input} placeholder="Search models" placeholderTextColor={COLORS.muted} value={query} onChangeText={setQuery} />
          <FlatList keyboardShouldPersistTaps="handled" data={results} keyExtractor={(model) => String(model.id)} renderItem={({ item }) => {
            const fits = blocks.length < 12 && fitsDspBudget(item.usage ?? 0, headroom);
            return <Pressable accessibilityRole="button" accessibilityState={{ disabled: !fits }} disabled={!fits} style={styles.button} onPress={() => {
              if (!fits) return;
              setBlocks((previous) => [...previous, makeBlock(item)]);
              setSelected(blocks.length);
              setPickerOpen(false);
            }}><Text style={[styles.label, !fits && styles.dim]}>{item.name}{!fits ? ' · Not enough headroom' : ''}</Text></Pressable>;
          }} />
        </BottomSheet>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, gap: 8 },
  content: { padding: 20, gap: 20 },
  title: { fontFamily: FONTS.bodySemi, fontSize: 22, color: COLORS.text, flexShrink: 1 },
  label: { fontFamily: FONTS.bodySemi, color: COLORS.text, fontSize: 16 },
  body: { fontFamily: FONTS.body, color: COLORS.muted, fontSize: 14, lineHeight: 21 },
  button: { minHeight: 48, paddingVertical: 12, paddingHorizontal: 8, justifyContent: 'center' },
  action: { fontFamily: FONTS.bodySemi, color: COLORS.accent, fontSize: 16 },
  blocks: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  block: { padding: 16, borderWidth: 1, borderColor: COLORS.stroke, borderRadius: 8, gap: 8 },
  selected: { borderColor: COLORS.accent },
  parameters: { gap: 16 },
  input: { minHeight: 48, padding: 12, color: COLORS.text, borderWidth: 1, borderColor: COLORS.stroke, borderRadius: 6 },
  dim: { color: COLORS.muted },
});
