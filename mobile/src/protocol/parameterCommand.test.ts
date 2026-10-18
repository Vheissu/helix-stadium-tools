import assert from 'node:assert/strict';
import test from 'node:test';
import { parameterValueCommand } from './parameterCommand';
import { buildOsc } from './osc';

test('acknowledged boolean parameter packets contain exactly five integer selectors including command id', () => {
  for (const value of [false, true]) {
    const command = parameterValueCommand(0, 1, 3, value, 0, -1, 'b');
    assert.equal(command.types, value ? 'iiiiTi' : 'iiiiFi');
    const packet = buildOsc(command.address, `i${command.types}`, [17, ...command.args]);
    assert.ok(packet.includes(Buffer.from(value ? ',iiiiiTi\0' : ',iiiiiFi\0')));
    assert.equal(packet.readInt32BE(packet.length - 4), -1);
    assert.equal(packet.length, 52); // 16-byte address, 12-byte tags, six 4-byte integers; the boolean has no payload.
  }
});
test('integer and floating parameter writes preserve their native value representation', () => {
  assert.deepEqual(parameterValueCommand(1, 29, 4, 3.6, 0, -1, 'i').args, [1, 29, 0, 4, 4, -1]);
  assert.equal(parameterValueCommand(0, 1, 1, 0.37).types, 'iiiifi');
  assert.throws(() => parameterValueCommand(0, 1, 1, NaN));
});
