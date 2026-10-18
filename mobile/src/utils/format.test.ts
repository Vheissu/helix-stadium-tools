import assert from 'node:assert/strict';
import test from 'node:test';

import { formatTempoBpm, formatPresetPosition } from './format';

test('formatTempoBpm hides floating-point tails', () => {
  assert.equal(formatTempoBpm(82.4490966796875), '82.4');
});

test('formatTempoBpm omits decimals for whole tempo values', () => {
  assert.equal(formatTempoBpm(120), '120');
  assert.equal(formatTempoBpm(120.04), '120');
});

test('formatTempoBpm shows missing values as unavailable', () => {
  assert.equal(formatTempoBpm(null), '\u2014');
  assert.equal(formatTempoBpm(Number.NaN), '\u2014');
});

test('preset positions match Stadium bank labels including the reported twentieth slot', () => {
  assert.equal(formatPresetPosition(0), '1A');
  assert.equal(formatPresetPosition(3), '1D');
  assert.equal(formatPresetPosition(4), '2A');
  assert.equal(formatPresetPosition(19), '5D');
  assert.equal(formatPresetPosition(511), '128D');
});
test('unknown preset positions stay unknown rather than being labelled as the first slot', () => {
  for (const position of [null, undefined, -1, NaN, Infinity, 1.5]) assert.equal(formatPresetPosition(position), '\u2014');
});
