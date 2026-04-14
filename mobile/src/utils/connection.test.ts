import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildConnectionFailureStatus,
  formatConnectionError,
  getConnectionErrorMessage,
} from './connection';

test('formatConnectionError maps DNS failures to a device-not-found message', () => {
  const message = formatConnectionError(new Error('getaddrinfo ENOTFOUND p35x1.local'));
  assert.equal(message, 'Device not found. Check the device name or IP address and try again.');
});

test('formatConnectionError maps timeouts to a Wi-Fi guidance message', () => {
  const message = formatConnectionError(new Error('socket timed out'));
  assert.equal(message, 'Connection timed out. Make sure your Helix Stadium is on the same Wi-Fi network.');
});

test('buildConnectionFailureStatus and getConnectionErrorMessage round-trip cleanly', () => {
  const status = buildConnectionFailureStatus(new Error('ECONNREFUSED'));
  assert.equal(
    getConnectionErrorMessage(status),
    'Connection was refused. Make sure Remote Access is enabled on your Helix Stadium.'
  );
});

test('getConnectionErrorMessage ignores non-connection statuses', () => {
  assert.equal(getConnectionErrorMessage('Connected'), null);
});
