import assert from 'node:assert/strict';
import test from 'node:test';

import { getConnectionHint, getNetworkInterfacePreference } from './connectionTransport';

test('Android can prefer the USB Ethernet or Wi-Fi route', () => {
  assert.equal(getNetworkInterfacePreference('usb', 'android'), 'ethernet');
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
