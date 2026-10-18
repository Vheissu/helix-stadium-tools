import { AccessibleText as Text } from '../accessibility/AccessibleText';
import { Action as Pressable } from '../accessibility/controls';
import { useState } from 'react';
import { Alert, FlatList, Linking, ScrollView, StyleSheet, View } from 'react-native';
import { BottomSheet } from './BottomSheet';
import info from '../data/appInfo.json';
import notices from '../data/thirdPartyNotices.json';
import { COLORS, FONTS } from '../theme/colors';

export function AppInfo() {
  const [page, setPage] = useState<'privacy' | 'help' | 'licenses' | null>(null);
  const [expandedNotice, setExpandedNotice] = useState<string | null>(null);
  const openLink = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('Contact support', info.supportEmail);
    }
  };
  return (
    <View>
      <View style={styles.links}>
        <Pressable accessibilityRole="button" style={styles.link} onPress={() => setPage('help')}><Text style={styles.linkText}>Help & About</Text></Pressable>
        <Pressable accessibilityRole="button" style={styles.link} onPress={() => setPage('privacy')}><Text style={styles.linkText}>Privacy policy</Text></Pressable>
        <Pressable accessibilityRole="link" style={styles.link} onPress={() => void openLink(info.supportUrl)}><Text style={styles.linkText}>Support</Text></Pressable>
        <Pressable accessibilityRole="button" style={styles.link} onPress={() => setPage('licenses')}><Text style={styles.linkText}>Licenses</Text></Pressable>
      </View>
      <BottomSheet visible={page !== null} onClose={() => setPage(null)} title={page === 'privacy' ? 'Privacy policy' : page === 'licenses' ? 'Third-party licenses' : 'Help & About'}>
        {page === 'licenses' ? (
          <FlatList keyboardShouldPersistTaps="handled" data={notices} keyExtractor={(item) => `${item.name}@${item.version}`} renderItem={({ item }) => {
            const key = `${item.name}@${item.version}`;
            return <View>
              <Pressable accessibilityRole="button" accessibilityState={{ expanded: expandedNotice === key }} style={styles.link} onPress={() => setExpandedNotice(expandedNotice === key ? null : key)}>
                <Text style={styles.heading}>{item.name}</Text>
                <Text style={styles.body}>{item.version} · {item.license}</Text>
              </Pressable>
              {expandedNotice === key && <Text selectable style={styles.body}>{item.text || 'License terms are available in the package source.'}</Text>}
            </View>;
          }} />
        ) : <ScrollView contentContainerStyle={styles.content}>
          {info[page ?? 'help'].map((section) => (
            <View key={section.title}>
              <Text accessibilityRole="header" style={styles.heading}>{section.title}</Text>
              <Text selectable style={styles.body}>{section.body}</Text>
            </View>
          ))}
          <Text selectable style={styles.body}>{info.disclaimer}</Text>
          <Text selectable style={styles.body}>{info.supportEmail}</Text>
          {page === 'privacy' && <Pressable accessibilityRole="link" style={styles.link} onPress={() => void openLink(info.privacyUrl)}><Text style={styles.linkText}>Read the policy online</Text></Pressable>}
        </ScrollView>}
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  links: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 4 },
  link: { minHeight: 44, paddingHorizontal: 10, justifyContent: 'center' },
  linkText: { fontFamily: FONTS.body, color: COLORS.accent, fontSize: 14 },
  content: { gap: 20, paddingBottom: 20 },
  heading: { color: COLORS.text, fontFamily: FONTS.bodySemi, fontSize: 17, marginBottom: 6 },
  body: { color: COLORS.muted, fontFamily: FONTS.body, fontSize: 15, lineHeight: 23 },
});
