import { useState } from 'react';
import { Alert, FlatList, Linking, ScrollView, StyleSheet, View } from 'react-native';
import { AccessibleText as Text } from '../accessibility/AccessibleText';
import { Action } from '../accessibility/controls';
import { BottomSheet } from './BottomSheet';
import { BrandMark } from './BrandMark';
import { UtilityIcon, type UtilityIconName } from './UtilityIcon';
import info from '../data/appInfo.json';
import notices from '../data/thirdPartyNotices.json';
import config from '../../app.json';
import { COLORS, FONT } from '../theme/colors';

export function AppInfo({ compact = false }: { compact?: boolean }) {
  const [page, setPage] = useState<'privacy' | 'help' | 'licenses' | null>(null);
  const [expandedNotice, setExpandedNotice] = useState<string | null>(null);
  const [expandedHelp, setExpandedHelp] = useState<string | null>(null);
  const openLink = async (url: string) => {
    try { await Linking.openURL(url); }
    catch { Alert.alert('Contact support', info.supportEmail); }
  };
  const links: { label: string; icon: UtilityIconName; action: () => void; external?: boolean }[] = [
    { label: 'Help & About', icon: 'help', action: () => setPage('help') },
    { label: 'Privacy policy', icon: 'privacy', action: () => setPage('privacy') },
    { label: 'Support', icon: 'support', action: () => { void openLink(info.supportUrl); }, external: true },
    { label: 'Licenses', icon: 'licenses', action: () => setPage('licenses') },
  ];
  const linkRows = (items: typeof links) => <View style={styles.links}>{items.map((item, index) => <Action key={item.label}
    accessibilityRole={item.external ? 'link' : 'button'} onPress={item.action}
    style={({ pressed }) => [styles.link, index > 0 && styles.separator, pressed && styles.pressed]}>
    <UtilityIcon name={item.icon} /><Text style={styles.linkText}>{item.label}</Text>
    <UtilityIcon name={item.external ? 'arrow' : 'chevron'} size={16} color={COLORS.faint} />
  </Action>)}</View>;
  return <View>
    {compact ? <Action onPress={() => setPage('help')} style={({ pressed }) => [styles.compact, pressed && styles.pressed]}>
      <UtilityIcon name="help" size={19} /><Text style={styles.compactText}>Help & About</Text>
    </Action> : linkRows(links)}
    <BottomSheet visible={page !== null} onClose={() => setPage(null)} title={page === 'privacy' ? 'Privacy policy' : page === 'licenses' ? 'Third-party licenses' : 'Help & About'}
      fill={page === 'licenses'} onBack={page === 'privacy' || page === 'licenses' ? () => setPage('help') : undefined} backLabel="Back to Help & About">
      {page === 'licenses' ? <FlatList style={styles.flex} keyboardShouldPersistTaps="handled" data={notices} keyExtractor={item => `${item.name}@${item.version}`}
        contentContainerStyle={styles.content} renderItem={({ item }) => {
          const key = `${item.name}@${item.version}`;
          return <View style={styles.notice}>
            <Action accessibilityLabel={`${item.name}, ${item.version}, ${item.license}`} accessibilityState={{ expanded: expandedNotice === key }} style={styles.noticeButton} onPress={() => setExpandedNotice(expandedNotice === key ? null : key)}>
              <View style={styles.flex}><Text style={styles.heading}>{item.name}</Text><Text style={styles.body}>{item.version} · {item.license}</Text></View>
              <Text accessible={false} style={styles.expand}>{expandedNotice === key ? '−' : '+'}</Text>
            </Action>
            {expandedNotice === key && <Text selectable style={[styles.body, styles.noticeBody]}>{item.text || 'License terms are available in the package source.'}</Text>}
          </View>;
        }} /> : <ScrollView contentContainerStyle={styles.content}>
        {page === 'help' && <View style={styles.brand}>
          <BrandMark size={38} /><View><Text style={styles.wordmark}>HELYON</Text><Text style={styles.body}>Version {config.expo.version}</Text></View>
        </View>}
        {info[page ?? 'help'].map(section => page === 'help' ? <View key={section.title} style={styles.article}>
          <Action accessibilityLabel={section.title} accessibilityState={{ expanded: expandedHelp === section.title }} onPress={() => setExpandedHelp(expandedHelp === section.title ? null : section.title)}
            style={({ pressed }) => [styles.articleButton, pressed && styles.pressed]}>
            <Text style={[styles.heading, styles.flex]}>{section.title}</Text><Text accessible={false} style={styles.expand}>{expandedHelp === section.title ? '−' : '+'}</Text>
          </Action>
          {expandedHelp === section.title && <Text selectable style={[styles.body, styles.articleBody]}>{section.body}</Text>}
        </View> : <View key={section.title} style={styles.privacySection}>
          <Text accessibilityRole="header" style={styles.heading}>{section.title}</Text><Text selectable style={styles.body}>{section.body}</Text>
        </View>)}
        {page === 'help' && linkRows(links.slice(1))}
        <Text selectable style={styles.disclaimer}>{info.disclaimer}</Text>
        <Text selectable style={styles.body}>{info.supportEmail}</Text>
        {page === 'privacy' && <Action accessibilityRole="link" style={({ pressed }) => [styles.link, styles.inlineLink, pressed && styles.pressed]} onPress={() => void openLink(info.privacyUrl)}>
          <Text style={styles.linkText}>Read the policy online</Text><UtilityIcon name="arrow" size={16} color={COLORS.faint} />
        </Action>}
      </ScrollView>}
    </BottomSheet>
  </View>;
}

const styles = StyleSheet.create({
  links: { borderRadius: 16, backgroundColor: COLORS.panel, overflow: 'hidden' },
  link: { minHeight: 56, paddingHorizontal: 16, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', gap: 14 },
  inlineLink: { borderRadius: 12, backgroundColor: COLORS.control, marginTop: 8 },
  separator: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: COLORS.stroke },
  linkText: { ...FONT.medium, color: COLORS.text, fontSize: 16, lineHeight: 22, flex: 1, minWidth: 0 },
  pressed: { backgroundColor: COLORS.raised },
  content: { gap: 8, paddingBottom: 24 },
  heading: { color: COLORS.text, ...FONT.semibold, fontSize: 17, lineHeight: 22 },
  body: { color: COLORS.muted, ...FONT.body, fontSize: 15, lineHeight: 23 },
  disclaimer: { color: COLORS.muted, fontSize: 14, lineHeight: 21, marginTop: 16 },
  compact: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 8, borderRadius: 10, maxWidth: '100%' },
  compactText: { color: COLORS.muted, fontSize: 14, flexShrink: 1 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 18, paddingVertical: 12, marginBottom: 8 },
  wordmark: { color: COLORS.text, ...FONT.bold, fontSize: 24, letterSpacing: 3, marginBottom: 4 },
  article: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.stroke },
  articleButton: { minHeight: 56, flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 12, paddingHorizontal: 4, borderRadius: 10 },
  articleBody: { paddingHorizontal: 4, paddingBottom: 20 },
  expand: { color: COLORS.muted, fontSize: 22, width: 24, textAlign: 'center', flexShrink: 0 },
  flex: { flex: 1, minWidth: 0 },
  privacySection: { gap: 8, paddingVertical: 10 },
  notice: { backgroundColor: COLORS.control, borderRadius: 12, overflow: 'hidden' },
  noticeButton: { padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 },
  noticeBody: { paddingHorizontal: 16, paddingBottom: 16 },
});
