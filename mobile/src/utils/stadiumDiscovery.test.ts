import assert from 'node:assert/strict';
import test from 'node:test';
import { parseStadiumDevices, startStadiumSearch, type DiscoveryTransport } from './stadiumDiscovery';

const device = { name: 'Stadium XL', host: 'p35x1.local.', port: 2001, type: '_stadiumserver._tcp.' };

test('discovery resolves advertised endpoints, deduplicates interfaces, and sorts device choices', () => {
  assert.deepEqual(parseStadiumDevices([
    device, { ...device, host: 'P35X1.local.' },
    { ...device, name: 'Another Stadium', host: '192.168.1.9', port: 2501 },
    { ...device, name: 'USB Stadium', host: 'fe80::1234%en0' },
  ]), [
    { name: 'Another Stadium', host: '192.168.1.9', port: 2501 },
    { name: 'Stadium XL', host: 'P35X1.local', port: 2001 },
    { name: 'USB Stadium', host: 'fe80::1234%en0', port: 2001 },
  ]);
});

test('unrelated services, malformed addresses, and unusable adjacent ports are rejected', () => {
  for (const invalid of [null, 'bad', {}, { ...device, type: '_http._tcp' },
    { ...device, host: '' }, { ...device, host: 'x/y' }, { ...device, host: '.' },
    { ...device, name: ' ' }, { ...device, port: 0 }, { ...device, port: 65535 },
    { ...device, port: 2001.5 }, { ...device, port: '2001' }]) {
    assert.deepEqual(parseStadiumDevices([invalid]), []);
  }
  assert.deepEqual(parseStadiumDevices(null), []);
});

test('a successful search releases native resources and preserves the advertised port', async () => {
  const stopped: number[] = [];
  const scan = startStadiumSearch({ discover: async () => [{ ...device, port: 3001 }], cancel: id => { stopped.push(id); } });
  assert.deepEqual(await scan.result, [{ name: 'Stadium XL', host: 'p35x1.local', port: 3001 }]);
  scan.cancel();
  assert.equal(stopped.length, 1);
});

test('cancelled searches settle immediately and ignore late results without cancelling a newer search', async () => {
  const pending: ((value: unknown) => void)[] = [];
  const stopped: number[] = [];
  const native: DiscoveryTransport = { discover: () => new Promise(resolve => pending.push(resolve)), cancel: id => { stopped.push(id); } };
  const old = startStadiumSearch(native);
  old.cancel();
  const current = startStadiumSearch(native);
  pending[0]([device]);
  assert.deepEqual(await old.result, []);
  assert.equal(stopped.length, 1);
  pending[1]([device]);
  assert.equal((await current.result).length, 1);
  assert.equal(stopped.length, 2);
  assert.notEqual(stopped[0], stopped[1]);
});

test('missing modules and native search failures keep manual connection available', async () => {
  await assert.rejects(startStadiumSearch(null).result, /enter the Stadium/);
  let stops = 0;
  await assert.rejects(startStadiumSearch({ discover: async () => { throw new Error('Permission denied'); }, cancel: () => { stops++; } }).result, /Permission denied/);
  assert.equal(stops, 1);
});

test('unresponsive native discovery is bounded and cancelled', async context => {
  context.mock.timers.enable({ apis: ['setTimeout'] });
  let stops = 0;
  const scan = startStadiumSearch({ discover: () => new Promise(() => {}), cancel: () => { stops++; } }, 1000);
  const rejected = assert.rejects(scan.result, /timed out/);
  context.mock.timers.tick(2001);
  await rejected;
  assert.equal(stops, 1);
});
