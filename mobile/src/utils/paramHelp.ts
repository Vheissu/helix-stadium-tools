// Original, general explanations. Model-specific behaviour can differ.
// Do not fall back to descriptions extracted from the desktop editor.
const HELP: Record<string, string> = {
  drive: 'Adjusts the gain entering this model. Higher settings generally add distortion.',
  gain: 'Adjusts gain. The effect on loudness and distortion depends on the model.',
  bass: 'Adjusts the low-frequency balance.',
  mid: 'Adjusts the midrange balance.',
  treble: 'Adjusts the high-frequency balance.',
  presence: 'Adjusts the upper-frequency character of the amp model.',
  level: 'Adjusts the output level of this block.',
  master: 'Adjusts the amp model’s master control. This can change both level and distortion.',
  mix: 'Sets the balance between the original signal and the processed signal.',
  feedback: 'Sets how much processed audio is fed back into the effect. High values can build up quickly.',
  decay: 'Adjusts how long the effect takes to fade.',
  predelay: 'Sets the gap before the reverberation begins.',
  time: 'Adjusts the effect’s timing. The displayed unit shows whether this is a duration or a note division.',
  rate: 'Adjusts how quickly the effect changes over time.',
  speed: 'Adjusts how quickly the effect changes over time.',
  depth: 'Adjusts how far the modulation moves from its centre value.',
  threshold: 'Sets the signal level at which the processor starts responding.',
  ratio: 'Sets how strongly the compressor reduces changes above its threshold.',
  attack: 'Adjusts how quickly the processor responds when triggered.',
  release: 'Adjusts how quickly the processor returns after the signal drops.',
  lowcut: 'Reduces frequencies below the selected cutoff.',
  highcut: 'Reduces frequencies above the selected cutoff.',
  pan: 'Moves the signal between the left and right outputs.',
};

export function getParamHelp(param: { name?: string | null; description?: string | null } | null | undefined): string | null {
  if (!param?.name) return null;
  return HELP[param.name.toLowerCase().replace(/[^a-z0-9]/g, '')] ?? null;
}
