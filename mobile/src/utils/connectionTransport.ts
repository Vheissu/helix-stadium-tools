export type ConnectionTransport = 'auto' | 'usb' | 'wifi';

export type NetworkInterfacePreference = 'ethernet' | 'wifi' | undefined;

export const getNetworkInterfacePreference = (
  transport: ConnectionTransport,
  platform: string
): NetworkInterfacePreference => {
  // react-native-tcp-socket supports route binding on Android. Apple platforms
  // use the route selected by the operating system for the device address.
  if (platform !== 'android') return undefined;
  if (transport === 'usb') return 'ethernet';
  if (transport === 'wifi') return 'wifi';
  return undefined;
};

export const getConnectionHint = (transport: ConnectionTransport) => {
  if (transport === 'usb') return 'Connect the USB cable, then keep Remote Access on.';
  if (transport === 'wifi') return 'Use the same Wi-Fi network and keep Remote Access on.';
  return 'Connect by USB or use the same Wi-Fi network.';
};
