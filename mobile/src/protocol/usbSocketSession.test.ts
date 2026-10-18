import test from 'node:test';
import assert from 'node:assert/strict';
import { Buffer } from 'buffer';
import { UsbSocketSession, type UsbEvent, type UsbNativeTransport } from './usbSocketSession';
function fixture() {
  const listeners = new Set<(event: UsbEvent) => void>();
  const closed: number[] = [];
  const opened: number[] = [];
  const writes: string[] = [];
  let finish: (() => void) | undefined;
  const native: UsbNativeTransport = {
    open: (id) => { opened.push(id); return new Promise<void>((resolve) => { finish = resolve; }); },
    close: (id) => { closed.push(id); },
    write: (_, data) => { writes.push(data); },
    subscribe: (listener) => { listeners.add(listener); return () => { listeners.delete(listener); }; },
  };
  return { native, closed, opened, writes, listeners, finish: () => finish?.(), emit: (event: UsbEvent) => { for (const l of listeners) l(event); } };
}
test('USB session delivers bytes only to the matching connection', async () => {
  const f = fixture(); const data: Buffer[] = [];
  const s = new UsbSocketSession(f.native, (bytes) => data.push(bytes), () => {});
  const ready = s.connect(2001); f.finish(); await ready;
  f.emit({id: f.opened[0] + 1, kind: 2, data: 'eA=='});
  f.emit({id: f.opened[0], kind: 2, data: 'AAH/gA=='});
  assert.deepEqual(data, [Buffer.from([0,1,255,128])]);
  s.write(Buffer.from([255,0])); assert.equal(f.writes[0], '/wA=');
  s.close(); assert.equal(f.listeners.size, 0);
});
test('cancelling USB permission wait rejects and ignores late connection', async () => {
  const f = fixture(); const s = new UsbSocketSession(f.native, () => {}, () => {});
  const ready = s.connect(2001); s.close();
  await assert.rejects(ready, /cancelled/); f.finish(); await Promise.resolve();
  assert.equal(f.closed.length, 1); assert.equal(f.listeners.size, 0);
  assert.throws(() => s.write(Buffer.from('x')), /closed/);
});
test('USB disconnect fails reads and releases its native session once', async () => {
  const f = fixture(); const errors: Error[] = [];
  const s = new UsbSocketSession(f.native, () => {}, (error) => errors.push(error));
  const ready = s.connect(2002); f.finish(); await ready;
  f.emit({id:f.opened[0],kind:4,message:'USB cable disconnected'}); s.close();
  assert.match(errors[0].message,/disconnected/); assert.equal(f.closed.length,1); assert.equal(f.listeners.size,0);
});
