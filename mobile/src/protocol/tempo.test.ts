import assert from 'node:assert/strict';
import test from 'node:test';
import { buildPropertyBlob } from './propertyBlob';
import { buildOsc } from './osc';
import { TapTempo, TempoController, type TempoTransport } from './tempo';

const keys = ['server.snapshot.tempo.bpm', 'preset.tempo.bpm', 'global.tempo.bpm'];
function fixture(mode = 2, initial = 120) {
  let bpm = initial;
  const writes: Array<{ key: string; value: number; type: string }> = [];
  const io: TempoTransport = {
    async getProperty(key) { return { key, type: key === 'global.tempo.select' ? 'i' : 'f', value: key === 'global.tempo.select' ? mode : bpm }; },
    async setPropertyWait(key, value, type) { writes.push({ key, value, type }); bpm = Math.fround(value); },
  };
  return { io, writes, controller: new TempoController(io) };
}

test('tempo packet guard rejects the old integer command and the old 300 BPM ceiling', () => {
  for (const key of keys) {
    assert.throws(() => buildPropertyBlob(key, 121, 'i'));
    for (const value of [0, 19.99, 240.01, 300, NaN, Infinity, -Infinity]) {
      assert.throws(() => buildPropertyBlob(key, value, 'f'));
    }
    const packet = buildOsc('/PropertyValueSet', 'iib', [1, 0, buildPropertyBlob(key, 121, 'f')]);
    assert.ok(packet.includes(Buffer.from([0xca, 0x42, 0xf2, 0, 0])));
  }
});

test('tap measurement needs two beats and preserves fractional BPM', () => {
  const taps = new TapTempo();
  assert.equal(taps.tap(0), null);
  assert.equal(taps.tap(500), 120);
  assert.equal(taps.tap(1000), 120);
  taps.reset();
  assert.equal(taps.tap(0), null);
  assert.equal(taps.tap(730), 82.19);
});

test('duplicate and rapid taps cannot produce excessive or infinite BPM', () => {
  const taps = new TapTempo();
  taps.tap(0);
  for (const time of [0, 1, 10, 100, 249]) assert.equal(taps.tap(time), null);
  assert.equal(taps.tap(250), 240);
  assert.equal(taps.tap(3250), 36.92); // Average of two valid intervals, still within range.
});

test('long gaps, invalid clocks, clock reversal and reset require a fresh pair of taps', () => {
  const taps = new TapTempo();
  taps.tap(100); taps.tap(600);
  assert.equal(taps.tap(4000), null);
  assert.equal(taps.tap(7000), 20);
  assert.equal(taps.tap(6999), null);
  assert.equal(taps.tap(NaN), null);
  assert.equal(taps.tap(8000), null);
  taps.reset(); assert.equal(taps.tap(8500), null);
});

test('nudges use the actual tempo in snapshot, preset and global modes', async () => {
  for (const mode of [0, 1, 2]) {
    const f = fixture(mode, 95);
    assert.equal(await f.controller.adjust(1), 96);
    assert.deepEqual(f.writes, [{ key: keys[mode], value: 96, type: 'f' }]);
  }
});

test('nudges stop at device limits and do not write unchanged values', async () => {
  const high = fixture(2, 239); assert.equal(await high.controller.adjust(5), 240);
  assert.equal(await high.controller.adjust(5), 240); assert.equal(high.writes.length, 1);
  const low = fixture(2, 21); assert.equal(await low.controller.adjust(-5), 20);
  assert.equal(await low.controller.adjust(-5), 20); assert.equal(low.writes.length, 1);
  await assert.rejects(low.controller.adjust(NaN));
});

test('tap tempo sends only bounded float BPM writes, never simulated footswitch presses', async () => {
  const f = fixture(1);
  assert.equal(await f.controller.tap(0), null); assert.equal(f.writes.length, 0);
  assert.equal(await f.controller.tap(750), 80);
  assert.deepEqual(f.writes, [{ key: keys[1], value: 80, type: 'f' }]);
});

test('missing, wrongly typed, invalid and unknown device state prevents any write', async () => {
  for (const state of [null, { key: 'global.tempo.select', type: 'i', value: 3 }, { key: 'global.tempo.select', type: 'f', value: 2 }]) {
    const f = fixture(); f.io.getProperty = async () => state;
    await assert.rejects(f.controller.adjust(1)); assert.equal(f.writes.length, 0);
  }
  for (const value of [null, NaN, Infinity, 0, 300]) {
    const f = fixture(); const get = f.io.getProperty;
    f.io.getProperty = async key => key === 'global.tempo.select' ? get(key) : { key, type: 'f', value };
    await assert.rejects(f.controller.adjust(1)); assert.equal(f.writes.length, 0);
  }
});

test('pending tempo updates do not queue or burst after a delayed response', async () => {
  const f = fixture(); const get = f.io.getProperty;
  let finish!: () => void;
  const wait = new Promise<void>(resolve => { finish = resolve; });
  f.io.getProperty = async key => { await wait; return get(key); };
  const first = f.controller.adjust(1);
  assert.equal(await f.controller.adjust(5), null);
  assert.equal(await f.controller.tap(0), null);
  assert.equal(await f.controller.tap(500), null);
  finish(); await first;
  assert.equal(f.writes.length, 1);
});

test('disconnect while reading prevents writes and late UI success', async () => {
  const f = fixture(); const get = f.io.getProperty;
  f.io.getProperty = async key => { f.controller.close(); return get(key); };
  assert.equal(await f.controller.adjust(1), null); assert.equal(f.writes.length, 0);
  assert.equal(await f.controller.tap(0), null);
  assert.equal(await f.controller.tap(500), null);
});

test('failed acknowledgements and readback mismatches are not retried or reported as success', async () => {
  const f = fixture(); let attempts = 0;
  f.io.setPropertyWait = async () => { attempts++; throw new Error('timed out'); };
  await assert.rejects(f.controller.adjust(1), /timed out/); assert.equal(attempts, 1);
  f.io.setPropertyWait = async () => { attempts++; };
  await assert.rejects(f.controller.adjust(1), /not confirmed/); assert.equal(attempts, 2);
});

test('changing preset, snapshot or tempo mode cancels pending work and resets tap timing', async () => {
  const f = fixture(); const get = f.io.getProperty;
  f.io.getProperty = async key => { f.controller.reset(); return get(key); };
  assert.equal(await f.controller.adjust(1), null); assert.equal(f.writes.length, 0);
  f.io.getProperty = get;
  assert.equal(await f.controller.tap(0), null);
  f.controller.reset();
  assert.equal(await f.controller.tap(500), null); assert.equal(f.writes.length, 0);
  assert.equal(await f.controller.tap(1250), 80);
});

test('disconnect after sending suppresses late success without retrying the write', async () => {
  const f = fixture(); const set = f.io.setPropertyWait;
  f.io.setPropertyWait = async (...args) => { await set(...args); f.controller.close(); };
  assert.equal(await f.controller.adjust(1), null); assert.equal(f.writes.length, 1);
});
