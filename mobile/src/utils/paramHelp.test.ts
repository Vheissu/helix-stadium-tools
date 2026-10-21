import test from 'node:test';
import assert from 'node:assert/strict';
import { getParamHelp } from './paramHelp';
import catalogue from '../data/blockTypes.json';

test('help uses original explanations and never falls back to imported prose', () => {
  assert.match(getParamHelp({ name: 'Low Cut' })!, /below/);
  assert.equal(getParamHelp({ name: 'Unknown', description: 'Imported vendor prose' }), null);
  assert.notEqual(getParamHelp({ name: 'Drive', description: 'Imported vendor prose' }), 'Imported vendor prose');
  assert.equal(getParamHelp(null), null);
});

test('the shipped model catalogue contains no copied parameter descriptions', () => {
  for (const group of Object.values(catalogue)) {
    for (const model of group.models) {
      for (const param of model.params) assert.equal(param.description, null, `${model.key}: ${param.key}`);
    }
  }
});
