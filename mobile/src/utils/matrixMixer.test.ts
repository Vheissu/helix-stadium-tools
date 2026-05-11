import assert from 'node:assert/strict';
import test from 'node:test';

import {
  applyMatrixMixerEvent,
  formatMatrixPan,
  formatMatrixVolume,
  parseMatrixMixerState,
} from './matrixMixer';

test('parseMatrixMixerState normalises property blobs', () => {
  const state = parseMatrixMixerState({
    key_: 'server.mixer.state',
    type: 'v',
    val_: {
      aout: 2,
      lyrs: [
        {
          chns: [
            { chnl: 2, vol: -12.5, pan: 0.25, mute: 0, solo: 1 },
            { chnl: 1, vol: 0.000337966, pan: 0, mute: 1, solo: 0 },
          ],
        },
        { chns: [] },
        { chns: [] },
      ],
    },
  });

  assert.equal(state?.attachedLayer, 2);
  assert.deepEqual(state?.layers.map((layer) => layer.label), ['1/4"', 'XLR', 'Phones']);
  assert.equal(state?.layers[0].channels.length, 23);
  assert.equal(state?.layers[0].channels[0].label, 'Path 1A');
  assert.equal(state?.layers[0].channels[0].mute, true);
  assert.equal(state?.layers[0].channels[1].solo, true);
  assert.equal(state?.layers[0].channels[1].volumeDb, -12.5);
});

test('applyMatrixMixerEvent updates sparse live events', () => {
  let state = parseMatrixMixerState({ lyrs: [{ chns: [{ chnl: 1, vol: 0, pan: 0 }] }] });

  state = applyMatrixMixerEvent(state, '/syncMixAttachedOut', [10, 20, 3]);
  state = applyMatrixMixerEvent(state, '/syncMixChannelVolume', [10, 21, 3, 18, -24.0]);
  state = applyMatrixMixerEvent(state, '/syncMixChannelPan', [10, 22, 3, 18, -0.65]);
  state = applyMatrixMixerEvent(state, '/syncMixChannelMute', [10, 23, 3, 18, 1]);
  state = applyMatrixMixerEvent(state, '/syncMixChannelSolo', [10, 24, 3, 18, 0]);

  const bluetooth = state?.layers.find((layer) => layer.id === 3)?.channels.find((channel) => channel.id === 18);
  assert.equal(state?.attachedLayer, 3);
  assert.equal(bluetooth?.label, 'Bluetooth');
  assert.equal(bluetooth?.volumeDb, -24);
  assert.equal(bluetooth?.pan, -0.65);
  assert.equal(bluetooth?.mute, true);
  assert.equal(bluetooth?.solo, false);
});

test('parseMatrixMixerState reads grouped live mixer property shape', () => {
  const state = parseMatrixMixerState({
    val_: {
      atto: 1,
      lyrs: [
        {
          out_: { dst_: 1, name: '1/4"' },
          home: {
            chan: [{ src_: 1, name: 'Path 1A', vol_: 0, pan_: 0 }],
            mix_: {
              src_: 5,
              name: 'Paths',
              vol_: -15.519854545593262,
              pan_: 0,
              mute: false,
              solo: false,
            },
          },
          song: { chan: [], mix_: { src_: 14, name: 'Song', vol_: 0 } },
          clik: { src_: 15, name: 'Click', vol_: 0 },
          cntn: { src_: 16, name: 'Count', vol_: 0 },
          usbn: { src_: 17, name: 'USB 1/2', vol_: 0 },
          bt__: { src_: 18, name: 'Bluetooth', vol_: 0 },
          auxn: { src_: 19, name: 'AUX In', vol_: 0 },
          nxus: [{ src_: 20, name: 'Nexus 1', vol_: 0 }],
        },
      ],
    },
  });

  const paths = state?.layers[0].channels.find((channel) => channel.id === 5);
  assert.equal(state?.attachedLayer, 1);
  assert.equal(state?.layers[0].label, '1/4"');
  assert.equal(paths?.label, 'Paths');
  assert.equal(paths?.pan, 0);
  assert.equal(paths?.volumeDb, -15.519854545593262);
});

test('formatMatrix helpers match Helix display conventions', () => {
  assert.equal(formatMatrixVolume(0.000337966), '0.0 dB');
  assert.equal(formatMatrixVolume(6), '+6.0 dB');
  assert.equal(formatMatrixPan(0), 'C');
  assert.equal(formatMatrixPan(-0.65), 'L65');
  assert.equal(formatMatrixPan(0.42), 'R42');
});
