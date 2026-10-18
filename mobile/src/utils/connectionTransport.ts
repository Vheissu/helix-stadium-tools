export type ConnectionTransport = 'auto' | 'usb' | 'wifi';

export type NetworkInterfacePreference = 'usb' | 'wifi' | undefined;

export const getNetworkInterfacePreference = (
  transport: ConnectionTransport,
  platform: string
): NetworkInterfacePreference => {
  // Android USB uses direct USB host access. Apple platforms use the
  // route selected by the operating system for the device address.
  if (platform !== 'android') return undefined;
  if (transport === 'usb') return 'usb';
  if (transport === 'wifi') return 'wifi';
  return undefined;
};

export const getConnectionHint = (transport: ConnectionTransport) => {
  if (transport === 'usb') return 'Connect the USB cable, then keep Remote Access on.';
  if (transport === 'wifi') return 'Use the same Wi-Fi network and keep Remote Access on.';
  return 'Connect by USB or use the same Wi-Fi network.';
};
