import { ImageSourcePropType } from 'react-native';

/**
 * Native block category icons extracted from the Helix Stadium desktop app.
 * 72x72 RGBA PNGs, perfect for block cards and the type picker.
 */
export const BLOCK_IMAGES: Record<string, ImageSourcePropType> = {
  amp: require('../../assets/icons/blocks/amp.png'),
  preamp: require('../../assets/icons/blocks/preamp.png'),
  cab: require('../../assets/icons/blocks/cab.png'),
  distortion: require('../../assets/icons/blocks/distortion.png'),
  delay: require('../../assets/icons/blocks/delay.png'),
  reverb: require('../../assets/icons/blocks/reverb.png'),
  modulation: require('../../assets/icons/blocks/modulation.png'),
  dynamics: require('../../assets/icons/blocks/dynamics.png'),
  eq: require('../../assets/icons/blocks/eq.png'),
  pitch_synth: require('../../assets/icons/blocks/pitch_synth.png'),
  wah_filter: require('../../assets/icons/blocks/wah_filter.png'),
  volume_pan: require('../../assets/icons/blocks/volume_pan.png'),
  looper: require('../../assets/icons/blocks/looper.png'),
  fx_loop: require('../../assets/icons/blocks/fx_loop.png'),
};

export const IO_IMAGES: Record<string, ImageSourcePropType> = {
  input: require('../../assets/icons/io/input.png'),
  output: require('../../assets/icons/io/output.png'),
  io_guitar: require('../../assets/icons/io/io_guitar.png'),
  io_multi: require('../../assets/icons/io/io_multi.png'),
  io_usb: require('../../assets/icons/io/io_usb.png'),
  io_spdif: require('../../assets/icons/io/io_spdif.png'),
  io_return: require('../../assets/icons/io/io_return.png'),
  io_send: require('../../assets/icons/io/io_send.png'),
  io_variax: require('../../assets/icons/io/io_variax.png'),
  io_mic: require('../../assets/icons/io/io_mic.png'),
};

export const getBlockImage = (kind: string): ImageSourcePropType | null => {
  return BLOCK_IMAGES[kind] ?? null;
};

export const getIOImage = (type: 'input' | 'output'): ImageSourcePropType | null => {
  return IO_IMAGES[type] ?? null;
};
