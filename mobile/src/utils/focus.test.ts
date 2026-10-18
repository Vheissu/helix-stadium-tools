import assert from 'node:assert/strict';
import test from 'node:test';
import native from './fixtures/focus-native.json';
import catalogue from '../data/focusModels.json';
import { FOCUS_POINTS, focusChanges, focusWeights, getFocusDefinition, normalizeFocusPoint, type FocusDefinition } from './focus';

test('Focus interpolation and discrete selection agree with 60 firmware arithmetic fixtures', () => {
  for (const fixture of native.cases) {
    const definition: FocusDefinition = { key: 'fixture', names: [], params: [{
      id: 1, key: 'value', behavior: fixture.behavior ? 'quantize' : 'interpolate',
      type: (['f', 'i', 'b'] as const)[fixture.type], min: 0, max: 100, values: fixture.values,
    }] };
    const actual = focusChanges(definition, fixture)[0].value;
    if (typeof actual === 'boolean') assert.equal(actual, fixture.value);
    else assert.ok(Math.abs(actual - Number(fixture.value)) < 0.00001, JSON.stringify({ fixture, actual }));
  }
});
test('Focus coordinates are bounded, hundredth-stepped and reject invalid numbers', () => {
  assert.deepEqual(normalizeFocusPoint({ x: -3, y: 2 }), { x: -1, y: 1 });
  assert.deepEqual(normalizeFocusPoint({ x: 0.1234, y: -0.126 }), { x: 0.12, y: -0.13 });
  assert.deepEqual(normalizeFocusPoint({ x: 0.125, y: -0.125 }), { x: 0.13, y: -0.13 });
  assert.throws(() => normalizeFocusPoint({ x: NaN, y: 0 }));
  assert.throws(() => normalizeFocusPoint({ x: 0, y: Infinity }));
});
test('the centre and four named corners retain their own values', () => {
  const definition = getFocusDefinition(628)!;
  for (let index = 0; index < FOCUS_POINTS.length; index++) {
    const changes = focusChanges(definition, FOCUS_POINTS[index]);
    changes.forEach((change, param) => assert.ok(Math.abs(Number(change.value) - Number(definition.params[param].values[index])) < 0.00001));
  }
});
test('triangle weights stay nonnegative and sum to one across the pad', () => {
  for (let x = -100; x <= 100; x += 5) for (let y = -100; y <= 100; y += 5) {
    const weights = focusWeights({ x: x / 100, y: y / 100 });
    assert.ok(weights.every(point => point.weight >= 0 && point.weight <= 1));
    assert.ok(Math.abs(weights.reduce((sum, point) => sum + point.weight, 0) - 1) < 0.000001);
  }
});
test('all bundled Focus definitions produce bounded native types at their named points', () => {
  assert.equal(Object.keys(catalogue).length, 670);
  for (const id of Object.keys(catalogue)) {
    const definition = getFocusDefinition(Number(id))!;
    assert.equal(new Set(definition.params.map(param => param.id)).size, definition.params.length);
    for (const point of [...FOCUS_POINTS, { x: 0.6, y: 0.2 }, { x: -0.4, y: 0.7 }]) {
      for (const change of focusChanges(definition, point)) {
        const param = definition.params.find(item => item.id === change.id)!;
        assert.ok(Number(change.value) >= param.min && Number(change.value) <= param.max);
        if (param.type === 'b') assert.equal(typeof change.value, 'boolean');
        if (param.type === 'i') assert.equal(Number.isInteger(change.value), true);
      }
    }
  }
});
test('the legacy modulated delay never sends source points below its supported time range', () => {
  const definition = getFocusDefinition(53)!;
  const time = focusChanges(definition, { x: -1, y: 1 }).find(param => param.key === 'Time');
  assert.equal(time?.value, 0.15);
});
