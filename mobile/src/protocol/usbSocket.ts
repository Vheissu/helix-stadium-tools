import { NativeEventEmitter, NativeModules } from 'react-native';
import { UsbSocketSession, type UsbNativeTransport, type UsbEvent } from './usbSocketSession';
import type { Buffer } from 'buffer';

export function createUsbSocket(onData: (data: Buffer) => void, onError: (error: Error) => void) {
  const module = NativeModules.StadiumUsb;
  if (!module) throw new Error('USB support is unavailable in this installation. Update HELYON and try again.');
  const events = new NativeEventEmitter(module);
  const native: UsbNativeTransport = {
    open: (id, port) => module.open(id, port),
    write: (id, data) => module.write(id, data),
    close: (id) => module.close(id),
    subscribe: (callback) => {
      const subscription = events.addListener('StadiumUsbSocket', (event) => callback(event as UsbEvent));
      return () => subscription.remove();
    },
  };
  return new UsbSocketSession(native, onData, onError);
}
