/** Status may contain native diagnostics; Settings only presents safe, actionable copy. */
export function settingsFeedback(status: string, { syncing, activity, preview, connected }: {
  syncing: boolean; activity: boolean; preview: boolean; connected: boolean;
}): { text: string; error: boolean } {
  if (preview) return { text: 'Preview changes stay in this app.', error: false };
  if (!connected) return { text: 'Not connected.', error: false };
  if (activity) return { text: 'Updating the Stadium library…', error: false };
  if (syncing || /^Syncing/i.test(status)) return { text: 'Syncing with your Stadium…', error: false };
  if (/failed|not confirmed|could not confirm/i.test(status)) return {
    text: /sync|preset/i.test(status) ? 'Sync was not confirmed. Check the connection and try again.' : 'That change was not confirmed. Sync before trying again.', error: true,
  };
  if (/^Synced$/i.test(status)) return { text: 'Up to date.', error: false };
  if (/^Auto-cab enabled$/i.test(status)) return { text: 'Auto-Cab is on.', error: false };
  if (/^Auto-cab disabled$/i.test(status)) return { text: 'Auto-Cab is off.', error: false };
  return { text: 'Ready to edit.', error: false };
}
