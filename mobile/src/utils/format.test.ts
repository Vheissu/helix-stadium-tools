import assert from 'node:assert/strict';
import test from 'node:test';

import { formatTempoBpm } from './format';

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
