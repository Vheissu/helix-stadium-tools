import assert from 'node:assert/strict';
import test from 'node:test';
import { settingsFeedback } from './settingsFeedback';

const connected = { syncing: false, activity: false, preview: false, connected: true };
test('settings feedback does not expose native failures and stops reporting old errors during a new sync', () => {
  const nativeError = 'Preset sync failed: ZMTP socket 192.168.1.1:2001 /getPropertyValue';
  assert.deepEqual(settingsFeedback(nativeError, connected), { text: 'Sync was not confirmed. Check the connection and try again.', error: true });
  assert.deepEqual(settingsFeedback(nativeError, { ...connected, syncing: true }), { text: 'Syncing with your Stadium…', error: false });
  assert.equal(settingsFeedback('Synced', connected).text, 'Up to date.');
});
test('preview, disconnect and library activity take precedence over stale status text', () => {
  assert.equal(settingsFeedback('Sync failed: secret', { ...connected, preview: true }).error, false);
  assert.equal(settingsFeedback('Sync failed: secret', { ...connected, connected: false }).text, 'Not connected.');
  assert.equal(settingsFeedback('Synced', { ...connected, activity: true }).text, 'Updating the Stadium library…');
  assert.equal(settingsFeedback('/internal-id 123', connected).text, 'Ready to edit.');
});
