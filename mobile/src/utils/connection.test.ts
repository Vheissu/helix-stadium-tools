import { UsbConnectionError } from './usbConnectionError';
import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildConnectionFailureStatus,
  formatConnectionError,
  getConnectionErrorMessage,
} from './connection';

test('missing Android USB networking gives actionable guidance', () => {
  assert.equal(
    formatConnectionError('Interface ethernet unreachable'),
    'No USB connection is available. Check your data cable and your phone’s USB Ethernet support, then try again.'
  );
});

test('missing Android Wi-Fi gives Wi-Fi guidance', () => {
  assert.equal(
    formatConnectionError('Interface wifi unreachable'),
    'Wi-Fi is not available. Connect your phone to the same Wi-Fi network as your Helix Stadium and try again.'
  );
});

test('formatConnectionError maps DNS failures to a device-not-found message', () => {
  const message = formatConnectionError(new Error('getaddrinfo ENOTFOUND p35x1.local'));
  assert.equal(message, 'Device not found. Check the device name or IP address and try again.');
});

test('formatConnectionError maps timeouts to USB and Wi-Fi guidance', () => {
  const message = formatConnectionError(new Error('socket timed out'));
  assert.equal(
    message,
    'Connection timed out. Check the USB cable or make sure your Helix Stadium is on the same Wi-Fi network.'
  );
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


test('direct USB discovery and permission guidance stays intact', () => {
  for (const message of [
    'No Stadium found over USB. Connect a data cable and use firmware 1.4 or later.',
    'Allow HELYON to access the Stadium USB connection, then try again.',
  ]) assert.equal(formatConnectionError(new UsbConnectionError(message)), message);
});
