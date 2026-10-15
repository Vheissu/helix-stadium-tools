import assert from 'node:assert/strict';
import test from 'node:test';
import { encode } from '@msgpack/msgpack';
import { Buffer } from 'buffer';
import {
  formatLibraryActivity,
  decodeLibraryContent,
  parseExpressionPedalPosition,
  parseLibraryOperation,
  updateLibraryActivity,
} from './stadium14';

test('flattened library records decode independently of generic MessagePack arrays', () => {
  const fields = [151, 6, 'Example', 'ALL', 152, 6, 'Second', 'stadium'];
  for (const header of [[0x92], [0xdc, 0, 2], [0xdd, 0, 0, 0, 2]]) {
    const blob = Buffer.concat([Buffer.from(header), ...fields.map((value) => Buffer.from(encode(value)))]);
    assert.deepEqual(decodeLibraryContent(blob)?.[1], { cid_: 152, type: 6, name: 'Second', sku: 'stadium' });
  }
  assert.deepEqual(decodeLibraryContent(Buffer.from([0x90])), []);
});

test('library decoder rejects malformed records, extra fields, and truncated data', () => {
  const fields = [151, 6, 'Example', 'ALL'];
  const valid = Buffer.concat([Buffer.from([0x91]), ...fields.map((value) => Buffer.from(encode(value)))]);
  for (const blob of [Buffer.alloc(0), Buffer.from([0xdc]), Buffer.from([0xdd, 255, 255, 255, 255]),
    valid.subarray(0, -1), Buffer.concat([valid, Buffer.from([1])]),
    Buffer.concat([Buffer.from([0x92]), valid.subarray(1)]), encode([1, 6, 'x', 'ALL']),
    Buffer.concat([Buffer.from([0x91]), Buffer.from(encode(true)), ...fields.slice(1).map((v) => Buffer.from(encode(v)))])]) {
    assert.equal(decodeLibraryContent(blob), null);
  }
});

test('pedal readings retain unavailable positions and opaque detail', () => {
  assert.deepEqual(parseExpressionPedalPosition([1, 0, 4095, 0], 0), { pedalIndex: 0, position: 4095, detail: 0 });
  assert.deepEqual(parseExpressionPedalPosition([2, 1, -1, 0], 1), { pedalIndex: 1, position: -1, detail: 0 });
  for (const values of [null, [1, 0], [1, 1, 4095, 0], [1, 0, NaN, 0], [1, 0, '4095', 0]]) {
    assert.equal(parseExpressionPedalPosition(values, 0), null);
  }
});

test('all twelve library notifications retain their complete payload', () => {
  for (const kind of ['ir', 'clone']) for (const operation of ['Import', 'Delete']) {
    for (const phase of ['Begin', 'Progress', 'End']) {
      const fields = phase === 'Begin' ? [3, 'Example'] : phase === 'Progress' ? [1, 3] :
        operation === 'Import' ? [3, 2, 1, -21] : [3];
      const event = parseLibraryOperation(`/${kind}${operation}${phase}`, [10, 20, ...fields]);
      assert.equal(event?.kind, kind);
      assert.equal(event?.phase, phase.toLowerCase());
      assert.deepEqual(event?.fields, fields);
      assert.equal(event && 'success' in event, false);
    }
  }
});

test('malformed notifications are ignored', () => {
  for (const values of [null, [1, 2, 3], [1, 2, 0.5, 3], [true, 2, 1, 3], [1, 2, NaN, 3], [1, 2, 1, 3, 4]]) {
    assert.equal(parseLibraryOperation('/irImportProgress', values), null);
  }
  assert.equal(parseLibraryOperation('/unknown', [1, 2, 3, 4]), null);
});

test('activity keeps concurrent operations separate and never labels an end as success', () => {
  const importing = parseLibraryOperation('/cloneImportBegin', [1, 2, 5, 'Example'])!;
  const deleting = parseLibraryOperation('/irDeleteProgress', [1, 3, 1, 3])!;
  const finished = parseLibraryOperation('/cloneImportEnd', [1, 4, 3, 2, 1, -21])!;
  const initial = {};
  let active = updateLibraryActivity(initial, importing);
  active = updateLibraryActivity(active, deleting);
  assert.deepEqual(initial, {});
  assert.equal(formatLibraryActivity(active), 'Importing clones… · Deleting IRs…');
  active = updateLibraryActivity(active, finished);
  assert.equal(formatLibraryActivity(active), 'Deleting IRs…');
  active = updateLibraryActivity(active, parseLibraryOperation('/irDeleteEnd', [1, 5, 3])!);
  assert.equal(formatLibraryActivity(active), null);
});
