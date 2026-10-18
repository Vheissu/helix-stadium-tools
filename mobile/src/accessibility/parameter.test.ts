import assert from 'node:assert/strict';
import test from 'node:test';
import { adjustParameter, parameterStep, parseParameterInput } from './parameter';
import { formatParamValue } from '../utils/paramFormat';

test('normalised controls adjust by a displayed tenth and clamp to both endpoints', () => {
  const range = { min: 0, max: 1, displayMin: 0, displayMax: 10, type: 'f' as const };
  assert.equal(parameterStep(range), 0.01);
  assert.equal(adjustParameter(0.5, 1, range), 0.51);
  assert.equal(formatParamValue(0.51, 0, 1, 0, 10, null, 'f'), '5.1');
  assert.equal(adjustParameter(0.999, 1, range), 1);
  assert.equal(adjustParameter(0, -1, range), 0);
});
test('negative values, integers, nonzero option origins and booleans retain their types', () => {
  assert.equal(adjustParameter(-12, -1, { min: -60, max: 12, type: 'f' }), -13);
  assert.equal(adjustParameter(4, 1, { min: 1, max: 8, type: 'i' }), 5);
  assert.equal(adjustParameter(4, 1, { min: 3, max: 20, type: 'i', options: ['A', 'B'] }), 4);
  assert.equal(adjustParameter(false, 1, { min: 0, max: 1, type: 'b' }), true);
  assert.equal(adjustParameter(true, -1, { min: 0, max: 1, type: 'b' }), false);
});
test('exact entry maps display values to native values and accepts decimal comma', () => {
  const range = { min: 0, max: 1, displayMin: -60, displayMax: 12, type: 'f' as const };
  assert.equal(parseParameterInput('-24', range), 0.5);
  assert.equal(parseParameterInput('0,25', { min: 0, max: 1, type: 'f' }), 0.25);
  assert.equal(parseParameterInput('4.8', { min: 0, max: 8, type: 'i' }), 5);
});
test('invalid or out-of-range exact entries never silently reset a parameter', () => {
  const range = { min: 0, max: 10, type: 'f' as const };
  for (const text of ['', ' ', 'Infinity', 'NaN', 'abc', '0x10', '11', '-1', '2..3']) {
    assert.equal(parseParameterInput(text, range), null, text);
  }
});
test('repeated adjustments reach a bound without floating point drift', () => {
  const range = { min: 0, max: 1, displayMin: 0, displayMax: 10, type: 'f' as const };
  let value: number | boolean = 0;
  for (let i = 0; i < 100; i++) value = adjustParameter(value, 1, range);
  assert.equal(value, 1);
});

test('boolean modes speak their actual option names rather than generic on and off', () => {
  assert.equal(formatParamValue(false, 0, 1, undefined, undefined, null, 'b', ['Chorus', 'Vibrato']), 'Chorus');
  assert.equal(formatParamValue(true, 0, 1, undefined, undefined, null, 'b', ['Chorus', 'Vibrato']), 'Vibrato');
  assert.equal(formatParamValue(false, 0, 1, undefined, undefined, null, 'b'), 'Off');
});
