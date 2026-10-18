import assert from 'node:assert/strict';
import test from 'node:test';

import { getConnectionHint, getNetworkInterfacePreference } from './connectionTransport';

test('Android selects direct USB separately from Wi-Fi routing', () => {
  assert.equal(getNetworkInterfacePreference('usb', 'android'), 'usb');
  assert.equal(getNetworkInterfacePreference('wifi', 'android'), 'wifi');
  assert.equal(getNetworkInterfacePreference('auto', 'android'), undefined);
});

test('Apple platforms leave route selection to the operating system', () => {
  assert.equal(getNetworkInterfacePreference('usb', 'ios'), undefined);
  assert.equal(getNetworkInterfacePreference('wifi', 'ios'), undefined);
});

test('connection hints stay user-facing', () => {
  assert.match(getConnectionHint('usb'), /USB cable/);
  assert.match(getConnectionHint('wifi'), /same Wi-Fi network/);
});
