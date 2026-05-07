import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getModelChannelMode, groupModelsByChannel } from './modelSections';

test('getModelChannelMode recognises Helix mono and stereo model keys', () => {
  assert.equal(getModelChannelMode({ key: 'HX2_EQParametricMono' }), 'mono');
  assert.equal(getModelChannelMode({ key: 'HD2_FXLoopMono1' }), 'mono');
  assert.equal(getModelChannelMode({ key: 'HX2_EQParametricStereo' }), 'stereo');
  assert.equal(getModelChannelMode({ key: 'HD2_FXLoopStereo1_2' }), 'stereo');
  assert.equal(getModelChannelMode({ key: 'EuclideanDelayStereo_Victoria' }), 'stereo');
  assert.equal(getModelChannelMode({ key: 'Agoura_AmpUSSuperBlack' }), null);
});

test('groupModelsByChannel splits duplicate-looking mono and stereo rows', () => {
  const sections = groupModelsByChannel([
    { key: 'HX2_EQParametricMono', name: 'Parametric' },
    { key: 'HD2_EQSimpleTiltMono', name: 'Tilt' },
    { key: 'HX2_EQParametricStereo', name: 'Parametric' },
    { key: 'HD2_EQSimpleTiltStereo', name: 'Tilt' },
  ]);

  assert.deepEqual(
    sections.map((section) => section.title),
    ['Mono', 'Stereo'],
  );
  assert.deepEqual(
    sections.map((section) => section.models.map((model) => model.key)),
    [
      ['HX2_EQParametricMono', 'HD2_EQSimpleTiltMono'],
      ['HX2_EQParametricStereo', 'HD2_EQSimpleTiltStereo'],
    ],
  );
});

test('groupModelsByChannel leaves unsplit categories flat', () => {
  const models = [
    { key: 'Agoura_AmpUSSuperBlack', name: 'US Super Black' },
    { key: 'HD2_AmpWhoWatt100', name: 'WhoWatt 100' },
  ];

  assert.deepEqual(groupModelsByChannel(models), [{ title: null, models }]);
});
