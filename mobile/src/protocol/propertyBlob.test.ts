import assert from 'node:assert/strict';
import test from 'node:test';
import { decode } from '@msgpack/msgpack';
import { Buffer } from 'buffer';
import { buildPropertyBlob } from './propertyBlob';

const keyField = 0x6b65795f, typeField = 0x74797065, valueField = 0x76616c5f;
const unpack = (blob: Buffer) => decode(blob.subarray(8)) as Record<number, unknown>;
const valueOffset = (blob: Buffer) => blob.indexOf(Buffer.from([0xce, 0x76, 0x61, 0x6c, 0x5f])) + 5;

test('float properties encode an actual MessagePack float, including whole BPM values', () => {
  for (const bpm of [20, 120, 121, 120.75, 240]) {
    const blob = buildPropertyBlob('global.tempo.bpm', bpm, 'f');
    assert.equal(blob.subarray(0, 8).toString(), 'lavppgsm');
    assert.deepEqual(unpack(blob), { [keyField]: 'global.tempo.bpm', [typeField]: 'f', [valueField]: bpm });
    assert.equal(blob[valueOffset(blob)], 0xca, 'val_ must be float32, never an integer');
  }
});

test('integer and string properties retain their existing wire representation', () => {
  const integer = buildPropertyBlob('global.tempo.follow', 1, 'i');
  assert.equal(integer[valueOffset(integer)], 0xd2);
  assert.equal(unpack(integer)[valueField], 1);
  const string = buildPropertyBlob('preset.meta.info', 'Verse 🎸', 's');
  assert.equal(string[valueOffset(string)], 0xdb);
  assert.equal(unpack(string)[valueField], 'Verse 🎸');
});

test('boolean properties encode booleans instead of the strings true and false', () => {
  for (const value of [true, false]) {
    assert.equal(unpack(buildPropertyBlob('test.boolean', value, 'b'))[valueField], value);
  }
});

test('invalid and mismatched property values are rejected before encoding', () => {
  for (const value of [NaN, Infinity, -Infinity, 1e40, '120', null, undefined, true]) {
    assert.throws(() => buildPropertyBlob('test.float', value, 'f'));
  }
  for (const value of [1.5, NaN, Infinity, 2 ** 31, -(2 ** 31) - 1, '1', true]) {
    assert.throws(() => buildPropertyBlob('test.integer', value, 'i'));
  }
  assert.throws(() => buildPropertyBlob('test.string', 123, 's'));
  assert.throws(() => buildPropertyBlob('test.boolean', 'false', 'b'));
});
