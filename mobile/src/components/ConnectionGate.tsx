import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, View, useWindowDimensions } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useAccessibilityPreferences } from '../accessibility/AccessibilityPreferences';
import { AccessibleText as Text } from '../accessibility/AccessibleText';
import { Action, AccessibilitySettings } from '../accessibility/controls';
import { AppInfo } from './AppInfo';
import { BottomSheet } from './BottomSheet';
import { BrandMark } from './BrandMark';
import { StadiumSearch } from './StadiumSearch';
import { UtilityIcon } from './UtilityIcon';
import type { StadiumDevice } from '../utils/stadiumDiscovery';
import { COLORS, FONT } from '../theme/colors';
import { getConnectionErrorMessage } from '../utils/connection';
import { getConnectionHint, type ConnectionTransport } from '../utils/connectionTransport';

interface ConnectionGateProps {
  host: string;
  port: number;
  onHostChange: (value: string) => void;
  onDeviceSelect: (device: StadiumDevice) => void;
  selectedDevice?: StadiumDevice | null;
  transport: ConnectionTransport;
  onTransportChange: (value: ConnectionTransport) => void;
  onConnect: () => void;
  onPreview: () => void;
  connecting: boolean;
  status: string;
}

export function ConnectionGate({ host, port, onHostChange, onDeviceSelect, selectedDevice, transport, onTransportChange, onConnect, onPreview, connecting, status }: ConnectionGateProps) {
  const { screenReader } = useAccessibilityPreferences();
  const { width, height, fontScale } = useWindowDimensions();
  const [sheet, setSheet] = useState<'manual' | 'help' | null>(null);
  const [searching, setSearching] = useState(false);
  const compact = height < 900 || fontScale > 1.3;
  const wide = width >= 840 && fontScale <= 1.3 && !screenReader;
  const largeText = fontScale > 1.5;
  // Three equal method columns only while "Automatic", its icon and padding fit.
  const methodColumn = (Math.min(width, 540) - 48 - 16) / 3;
  const methodIcons = methodColumn >= 70 * fontScale + 42;
  const stackMethods = largeText || methodColumn < 70 * fontScale + 18;
  const directUsb = Platform.OS === 'android' && transport === 'usb';
  const error = getConnectionErrorMessage(status);
  const canConnect = !connecting && (directUsb || !!host.trim());
  const connect = () => { if (!connecting) { setSheet(null); onConnect(); } };
  const connectButton = <Action accessibilityLabel={connecting ? 'Connecting to your Stadium' : 'Connect'} accessibilityHint={!canConnect && !connecting ? 'Choose a Stadium or enter its address first' : undefined} disabled={!canConnect}
    onPress={connect} style={({ pressed }) => [styles.connect, pressed && styles.connectPressed, !canConnect && styles.connectBusy]}>
    <Text style={styles.connectLabel}>{connecting ? 'Connecting…' : 'Connect'}</Text>
    {!connecting && <UtilityIcon name="arrow" color={COLORS.bg} />}
  </Action>;

  const brand = <View style={[styles.brand, compact && styles.brandCompact, wide && styles.brandWide]}>
    <View style={[styles.brandIdentity, largeText && styles.brandIdentityCompact]}>
      <View style={!largeText && styles.emblem}><BrandMark size={largeText ? 30 : compact ? 64 : 80} active={connecting || (!directUsb && searching)} /></View>
      <Text accessibilityRole="header" accessibilityLabel="Helyon" maxFontSizeMultiplier={1.2} style={[styles.wordmark, compact && styles.wordmarkCompact, largeText && styles.wordmarkAccessible]}>HELYON</Text>
    </View>
    <Text style={styles.tagline}>Independent Helix Stadium editor</Text>
  </View>;

  return <SafeAreaProvider><SafeAreaView style={styles.safe}>
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={[styles.scroll, wide && styles.scrollWide]}>
        {brand}
        <View style={[styles.connection, wide && styles.connectionWide]}>
          <View style={styles.intro}>
            <Text accessibilityRole="header" style={styles.title}>Connect your Stadium</Text>
            <Text style={styles.hint}>{getConnectionHint(transport)}</Text>
          </View>
          <View style={[styles.transports, stackMethods && styles.transportsStack]} accessibilityRole="radiogroup" accessibilityLabel="Connection method">
            {(['auto', 'usb', 'wifi'] as const).map(option => {
              const selected = transport === option;
              const label = option === 'auto' ? 'Automatic' : option === 'usb' ? 'USB' : 'Wi-Fi';
              return <Action key={option} accessibilityRole="radio" accessibilityLabel={label}
                accessibilityState={{ checked: selected, disabled: connecting }} disabled={connecting}
                onPress={() => onTransportChange(option)}
                style={({ pressed }) => [styles.transport, selected && styles.transportSelected, pressed && styles.pressed, stackMethods && styles.transportStack]}>
                {(methodIcons || stackMethods) && <UtilityIcon name={option === 'auto' ? 'automatic' : option} size={18} color={selected ? COLORS.text : COLORS.muted} />}
                <Text style={[styles.transportLabel, selected && styles.transportLabelSelected]}>{label}</Text>
              </Action>;
            })}
          </View>

          {directUsb ? <View style={styles.usb}>
            <View style={styles.usbIcon}><UtilityIcon name="usb" size={34} color={COLORS.text} /></View>
            <View style={styles.flex}><Text style={styles.usbTitle}>Plug in. Take control.</Text>
              <Text style={styles.hint}>Connect a USB data cable, then tap Connect. Allow USB access when asked.</Text></View>
          </View> : <StadiumSearch host={host} port={port} disabled={connecting} onSelect={onDeviceSelect} onActivityChange={setSearching} />}

          <View style={[styles.manualOptions, fontScale > 1.3 && styles.manualOptionsStacked]}>
          {!directUsb && <Action disabled={connecting} onPress={() => setSheet('manual')} accessibilityLabel="Enter a device name or IP address"
            style={({ pressed }) => [styles.manual, pressed && styles.pressed]}>
            <View style={styles.flex}><Text style={styles.manualTitle}>Enter an address</Text>
              {host.trim() !== '' && !selectedDevice && <Text style={styles.address} numberOfLines={1}>{host.trim()}</Text>}</View>
            <UtilityIcon name="chevron" size={17} />
          </Action>}
          <Action disabled={connecting} accessibilityLabel="Connection help" onPress={() => setSheet('help')} style={[styles.setup, fontScale > 1.3 && styles.setupStacked]}>
            <UtilityIcon name="help" size={17} /><Text style={styles.setupText}>{directUsb ? 'Connection help' : 'Help'}</Text>
          </Action>
          </View>

          {error && <View style={styles.error} accessibilityRole="alert"><UtilityIcon name="help" color={COLORS.danger} />
            <Text style={styles.errorText}>{error}</Text></View>}

          {wide && connectButton}

          {(wide || largeText) && <View style={styles.previewWrap}>
            <Action disabled={connecting} onPress={onPreview} accessibilityLabel="Try offline preview" style={({ pressed }) => [styles.preview, pressed && styles.pressed]}>
              <View style={styles.flex}><Text style={styles.previewTitle}>Explore HELYON</Text><Text style={styles.hint}>Try a sample preset without connecting.</Text></View>
              <UtilityIcon name="arrow" size={20} />
            </Action>
          </View>}
          <View style={styles.footer}><AccessibilitySettings compact /><AppInfo compact /></View>
        </View>
      </ScrollView>
      {!wide && <View style={styles.connectDock}>
        {connectButton}
        {!largeText && <Action disabled={connecting} onPress={onPreview} accessibilityLabel="Try offline preview" accessibilityHint="Explore a sample preset without connecting" style={styles.dockPreview}>
          <Text style={styles.dockPreviewText}>Try offline preview</Text><UtilityIcon name="arrow" size={17} />
        </Action>}
      </View>}
    </KeyboardAvoidingView>
    <BottomSheet visible={sheet === 'manual'} onClose={() => setSheet(null)} title="Connect by address" subtitle="Device name or IP address"
      footer={<Action disabled={connecting || !host.trim()} onPress={connect} style={({ pressed }) => [styles.connect, pressed && styles.connectPressed, (!host.trim() || connecting) && styles.connectBusy]}>
        <Text style={styles.connectLabel}>Connect to this address</Text><UtilityIcon name="arrow" color={COLORS.bg} />
      </Action>}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.sheetContent}>
        <Text style={styles.hint}>On your Stadium, open Menu → Wi-Fi. Its IP address appears at the bottom of the right sidebar.</Text>
        <TextInput accessibilityLabel="Device name or IP address" value={host} onChangeText={onHostChange}
          placeholder="p35x1.local or 192.168.1.10" placeholderTextColor={COLORS.muted}
          style={styles.input} autoCapitalize="none" autoCorrect={false} autoFocus editable={!connecting}
          returnKeyType="go" onSubmitEditing={connect} />
        <Text style={styles.hint}>Set Global Settings → Preferences → Remote Access to Allow on your Stadium.</Text>
      </ScrollView>
    </BottomSheet>
    <BottomSheet visible={sheet === 'help'} onClose={() => setSheet(null)} title="Get connected">
      <ScrollView contentContainerStyle={styles.sheetContent}>
        {[
          { title: 'Allow remote control', body: 'On your Stadium, set Global Settings → Preferences → Remote Access to Allow.' },
          { title: transport === 'usb' ? 'Connect a data cable' : 'Join the same Wi-Fi', body: transport === 'usb' ? 'Use a USB cable that carries data. On Android, allow USB access when prompted. On iPhone or iPad, a compatible USB network connection is required.' : 'Your phone or tablet and Stadium need to be on the same network. Allow Local Network access when your device asks.' },
          { title: 'Choose your Stadium', body: 'Select it from Nearby Stadiums, then tap Connect. If it does not appear, use Enter an address.' },
        ].map((step, index) => <View key={step.title} style={styles.step}>
          <View style={styles.stepNumber}><Text style={styles.stepNumberText}>{index + 1}</Text></View>
          <View style={styles.flex}><Text style={styles.stepTitle}>{step.title}</Text><Text style={styles.hint}>{step.body}</Text></View>
        </View>)}
      </ScrollView>
    </BottomSheet>
  </SafeAreaView></SafeAreaProvider>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  container: { flex: 1 },
  connectDock: { paddingTop: 12, paddingBottom: 8, paddingHorizontal: 24, width: '100%', maxWidth: 540, alignSelf: 'center', borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: COLORS.hairline, backgroundColor: COLORS.bg },
  dockPreview: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  dockPreviewText: { color: COLORS.muted, fontSize: 15, ...FONT.medium },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 22, paddingBottom: 18, maxWidth: 540, width: '100%', alignSelf: 'center' },
  scrollWide: { maxWidth: 1080, flexDirection: 'row', gap: 64, alignItems: 'center', paddingHorizontal: 48 },
  brand: { alignItems: 'center', paddingTop: 4, paddingBottom: 22 },
  brandCompact: { paddingTop: 0, paddingBottom: 20 },
  brandWide: { flex: 1 },
  brandIdentity: { alignItems: 'center' },
  brandIdentityCompact: { flexDirection: 'row', gap: 16, alignSelf: 'flex-start' },
  emblem: { marginBottom: 12 },
  wordmark: { color: COLORS.text, fontWeight: '700', fontSize: 42, letterSpacing: 6, marginLeft: 6 },
  wordmarkCompact: { fontSize: 34 },
  wordmarkAccessible: { fontSize: 25, letterSpacing: 3 },
  tagline: { color: COLORS.muted, fontSize: 15, marginTop: 6, letterSpacing: 0.4 },
  connection: { gap: 14 },
  connectionWide: { flex: 1.1, paddingVertical: 20 },
  intro: { gap: 6 },
  title: { color: COLORS.text, ...FONT.semibold, fontSize: 23, lineHeight: 28 },
  hint: { color: COLORS.muted, ...FONT.body, fontSize: 15, lineHeight: 22 },
  transports: { flexDirection: 'row', padding: 4, backgroundColor: COLORS.panel, borderRadius: 14, gap: 4 },
  transportsStack: { flexDirection: 'column' },
  transport: { flex: 1, minWidth: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 10 },
  transportStack: { flex: 0, justifyContent: 'flex-start', paddingHorizontal: 16 },
  transportSelected: { backgroundColor: COLORS.raised },
  transportLabel: { color: COLORS.muted, ...FONT.medium, fontSize: 15, flexShrink: 1 },
  transportLabelSelected: { color: COLORS.text },
  pressed: { backgroundColor: COLORS.control },
  manualOptions: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  manualOptionsStacked: { flexDirection: 'column', alignItems: 'stretch', gap: 4 },
  manual: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 4, gap: 12, flexGrow: 1, flexShrink: 1, minWidth: 0 },
  manualTitle: { color: COLORS.text, fontSize: 15, ...FONT.medium },
  address: { color: COLORS.muted, fontSize: 14, marginTop: 3 },
  connect: { minHeight: 56, borderRadius: 14, backgroundColor: COLORS.text, paddingHorizontal: 20, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  connectPressed: { backgroundColor: '#d5d1c7' },
  connectBusy: { opacity: 0.6 },
  connectLabel: { color: COLORS.bg, ...FONT.semibold, fontSize: 17, flexShrink: 1 },
  setup: { flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingHorizontal: 4, maxWidth: '100%' },
  setupStacked: { flexShrink: 1, justifyContent: 'flex-start' },
  setupText: { color: COLORS.muted, fontSize: 15, flexShrink: 1 },
  previewWrap: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: COLORS.stroke, paddingTop: 12 },
  preview: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, paddingHorizontal: 4, borderRadius: 8 },
  previewTitle: { color: COLORS.text, fontSize: 16, ...FONT.medium, marginBottom: 3 },
  footer: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center' },
  disclaimer: { color: COLORS.muted, fontSize: 12, lineHeight: 18, textAlign: 'center' },
  flex: { flex: 1, minWidth: 0 },
  error: { padding: 14, backgroundColor: COLORS.panel, borderRadius: 12, flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  errorText: { color: COLORS.danger, fontSize: 15, lineHeight: 22, flex: 1 },
  usb: { backgroundColor: COLORS.panel, padding: 20, borderRadius: 16, flexDirection: 'row', gap: 18, alignItems: 'center' },
  usbIcon: { width: 42, alignItems: 'center' },
  usbTitle: { color: COLORS.text, fontSize: 18, ...FONT.semibold, marginBottom: 6 },
  sheetContent: { gap: 20, paddingBottom: 16 },
  input: { color: COLORS.text, fontSize: 17, backgroundColor: COLORS.bg, padding: 18, borderRadius: 12, borderWidth: 1, borderColor: COLORS.stroke },
  step: { flexDirection: 'row', gap: 16, alignItems: 'flex-start' },
  stepNumber: { width: 30, height: 30, borderRadius: 15, backgroundColor: COLORS.raised, alignItems: 'center', justifyContent: 'center' },
  stepNumberText: { color: COLORS.text, fontSize: 14, ...FONT.semibold },
  stepTitle: { color: COLORS.text, fontSize: 17, ...FONT.semibold, marginBottom: 7 },
});
