# Effects: modulation, pitch, synth, and wah

Upload-ready knowledge for modulation, pitch, synth, and wah blocks.

Generated from the installed Helix Stadium desktop app bundle on 2026-04-19T22:24:30.490746+00:00.

Use display values for normal user-facing answers. Use model keys, IDs, and raw ranges only when the user asks for automation or low-level control details.

Model count: 94

---

## 12-String

- Model key: `VIC_PitchTwelveStringMono`
- Model ID: `520`
- Type: Pitch
- Category: `pitch`
- Class: 12-String
- DSP usage: 17.2
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Blend` (`key: Blend`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls how much of the 12-String effect is blended in with the dry signal.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the bass response of the effected signal.
- `Treble` (`key: Treble`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the treble response of the effected signal.
- `Level` (`key: Level`, `id: 4`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Pluck Type` (`key: OnsetThresh`, `id: 5`, `type: i`): valid values `Normal`, `Finger Pick 1`, `Finger Pick 2`; default `Finger Pick 1`. Raw range `0` to `2`; raw default `1`. Optimizes the 12 String emulation for specific types of playing styles.

---

## 122 Rotary

- Model key: `HD2_Rotary122RotaryStereo`
- Model ID: `157`
- Type: Modulation
- Category: `modulation`
- Class: Rotary
- DSP usage: 5.5
- Based on: Leslie 122
- Agoura model: No

### Parameters

- `Speed` (`key: Speed`, `id: 1`, `type: b`): valid values `Slow`, `Fast`; default `Fast`. Raw range `Off` to `On`; raw default `On`. Selects Slow or Fast rotary speed. When changing values, the rotary speaker speed gradually changes, based on the RampTime value.
- `Slow Speed` (`key: SlowSpeed`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `2.4`. Raw range `0` to `1`; raw default `0.24`. Sets the rotary speed when Speed is set to "Slow." When set to note values, SlowSpeed follows the system tempo.
- `Fast Speed` (`key: FastSpeed`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `7.3`. Raw range `0` to `1`; raw default `0.73`. Sets the rotary speed when Speed is set to "Fast." When set to note values, FastSpeed follows the system tempo.
- `Ramp Time` (`key: RampTime`, `id: 4`, `type: i`): valid values `Slow`, `Medium`, `Fast`; default `Medium`. Raw range `0` to `2`; raw default `1`. Determines how fast the rotary speed changes when Speed is changed from "Slow" to "Fast" or vice versa.
- `Drive` (`key: Drive`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `7.1`. Raw range `0` to `1`; raw default `0.71`. Controls how much of the speaker's internal amp is overdriven. At higher values, the speaker imparts more of a gritty sound.
- `Speaker Blend` (`key: Blend`, `id: 6`, `type: f`): display range `-100` to `100` Woofer; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls how much of the woofer speaker is heard vs. the horn speaker. Normally leave this set to "Equal."
- `Mix` (`key: Mix`, `id: 7`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the blend between the rotary effect and the dry signal. At 0%, no rotary effect is heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 8`, `type: f`): display range `-60` to `6` dB; default `-5.7`. Raw range `-60` to `6`; raw default `-5.7`. Sets the overall level of the block.
- `Headroom` (`key: Headroom`, `id: 9`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Provides up to 12.0 dB of additional headroom.

---

## 145 Rotary

- Model key: `HD2_Rotary145RotaryStereo`
- Model ID: `158`
- Type: Modulation
- Category: `modulation`
- Class: Rotary
- DSP usage: 5.5
- Based on: Leslie 145
- Agoura model: No

### Parameters

- `Speed` (`key: Speed`, `id: 1`, `type: b`): valid values `Slow`, `Fast`; default `Fast`. Raw range `Off` to `On`; raw default `On`. Selects Slow or Fast rotary speed. When changing values, the rotary speaker speed gradually changes, based on the RampTime value.
- `Slow Speed` (`key: SlowSpeed`, `id: 2`, `type: f`): display range `0.1` to `10` Hz; default `2.72`. Raw range `0.1` to `10`; raw default `2.72`. Sets the rotary speed when Speed is set to "Slow." When set to note values, SlowSpeed follows the system tempo.
- `Fast Speed` (`key: FastSpeed`, `id: 3`, `type: f`): display range `0.1` to `10` Hz; default `5.3`. Raw range `0.1` to `10`; raw default `5.3`. Sets the rotary speed when Speed is set to "Fast." When set to note values, FastSpeed follows the system tempo.
- `Ramp Time` (`key: RampTime`, `id: 4`, `type: i`): valid values `Slow`, `Medium`, `Fast`; default `Medium`. Raw range `0` to `2`; raw default `1`. Determines how fast the rotary speed changes when Speed is changed from "Slow" to "Fast" or vice versa.
- `Drive` (`key: Drive`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `4.2`. Raw range `0` to `1`; raw default `0.42`. Controls how much of the speaker's internal amp is overdriven. At higher values, the speaker imparts more of a gritty sound.
- `Speaker Blend` (`key: Blend`, `id: 6`, `type: f`): display range `-100` to `100` Woofer; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls how much of the woofer speaker is heard vs. the horn speaker. Normally leave this set to "Equal."
- `Mix` (`key: Mix`, `id: 7`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the blend between the rotary effect and the dry signal. At 0%, no rotary effect is heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 8`, `type: f`): display range `-60` to `6` dB; default `-6`. Raw range `-60` to `6`; raw default `-6`. Sets the overall level of the block.
- `Headroom` (`key: Headroom`, `id: 9`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Provides up to 12.0 dB of additional headroom.

---

## 3 Note Generator

- Model key: `HD2_Synth3NoteGeneratorMono`
- Model ID: `336`
- Type: Synth
- Category: `synth`
- Class: Generator
- DSP usage: 3.6
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Osc 1 Shape` (`key: Osc1Shape`, `id: 1`, `type: i`): valid values `Saw Up`, `Saw Down`, `Triangle`, `Sine`, `Square`; default `Sine`. Raw range `0` to `4`; raw default `3`. Selects the shape of Oscillator 1.
- `Osc 1 Octave` (`key: Osc1Octave`, `id: 2`, `type: i`): display range `0` to `8` unitless; default `3`. Raw range `0` to `8`; raw default `3`. Sets the octave of Oscillator 1, with a 9-octave range.
- `Osc 1 Note` (`key: Osc1Note`, `id: 3`, `type: i`): valid values `C`, `C#`, `D`, `D#`, `E`, `F`, `F#`, `G`, `G#`, `A`, `A#`, `B`; default `C`. Raw range `0` to `11`; raw default `0`. Sets the note of Oscillator 1.
- `Osc 1 Level` (`key: Osc1Level`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the level of Oscillator 1.
- `Osc 1 Glide` (`key: Osc1Glide`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Controls the length of time it takes for Osc1 Oct and Osc1 Note to change when adjusting values manually or via snapshots and controllers. 0.0 causes immediate stepped changes whereas higher values cause the octave or note adjustment to glide smoothly.
- `Osc 2 Shape` (`key: Osc2Shape`, `id: 6`, `type: i`): valid values `Saw Up`, `Saw Down`, `Triangle`, `Sine`, `Square`; default `Sine`. Raw range `0` to `4`; raw default `3`. Selects the shape of Oscillator 2.
- `Osc 2 Octave` (`key: Osc2Octave`, `id: 7`, `type: i`): display range `0` to `8` unitless; default `3`. Raw range `0` to `8`; raw default `3`. Sets the octave of Oscillator 2, with a 9-octave range.
- `Osc 2 Note` (`key: Osc2Note`, `id: 8`, `type: i`): valid values `C`, `C#`, `D`, `D#`, `E`, `F`, `F#`, `G`, `G#`, `A`, `A#`, `B`; default `G`. Raw range `0` to `11`; raw default `7`. Sets the note of Oscillator 2.
- `Osc 2 Level` (`key: Osc2Level`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the level of Oscillator 2.
- `Osc 2 Glide` (`key: Osc2Glide`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Controls the length of time it takes for Osc2 Oct and Osc2 Note to change when adjusting values manually or via snapshots and controllers. 0.0 causes immediate stepped changes whereas higher values cause the octave or note adjustment to glide smoothly.
- `Osc 3 Shape` (`key: Osc3Shape`, `id: 11`, `type: i`): valid values `Saw Up`, `Saw Down`, `Triangle`, `Sine`, `Square`; default `Sine`. Raw range `0` to `4`; raw default `3`. Selects the shape of Oscillator 3.
- `Osc 3 Octave` (`key: Osc3Octave`, `id: 12`, `type: i`): display range `0` to `8` unitless; default `4`. Raw range `0` to `8`; raw default `4`. Sets the octave of Oscillator 3, with a 9-octave range.
- `Osc 3 Note` (`key: Osc3Note`, `id: 13`, `type: i`): valid values `C`, `C#`, `D`, `D#`, `E`, `F`, `F#`, `G`, `G#`, `A`, `A#`, `B`; default `E`. Raw range `0` to `11`; raw default `4`. Sets the note of Oscillator 3.
- `Osc 3 Level` (`key: Osc3Level`, `id: 14`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the level of Oscillator 3.
- `Osc 3 Glide` (`key: Osc3Glide`, `id: 15`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Controls the length of time it takes for Osc3 Oct and Osc3 Note to change when adjusting values manually or via snapshots and controllers. 0.0 causes immediate stepped changes whereas higher values cause the octave or note adjustment to glide smoothly.
- `Attack` (`key: Attack`, `id: 16`, `type: f`): display range `10` to `10000` ms; default `500`. Raw range `0.01` to `10`; raw default `0.5`. Controls how fast the 3 Note Generator fades in when engaged, from 10 ms to 10 sec.
- `Decay` (`key: Decay`, `id: 17`, `type: f`): display range `10` to `10000` ms; default `3000`. Raw range `0.01` to `10`; raw default `3`. Controls how fast the 3 Note Generator fades out when bypassed, from 10 ms to 10 sec.
- `Dry Level` (`key: DryLevel`, `id: 18`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the level of the dry signal.
- `Level` (`key: Level`, `id: 19`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## 3 OSC Synth

- Model key: `HD2_SynthSubtractiveStereo`
- Model ID: `505`
- Type: Synth
- Category: `synth`
- Class: Synth
- DSP usage: 8.5
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Osc 1 Wave` (`key: ShapeVoice1`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Morphs Oscillator 1 from a sine wave (at 0.0) to a triangle wave (at 5.0) to a modified square wave (at 10.0).
- `Osc 1 Duty Cycle` (`key: DutyVoice1`, `id: 2`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the duty cycle of Oscillator 1. Adjusting Duty Cycle to either extreme increases harmonic content of the waveform.
- `Osc 1 Octave` (`key: OctaveVoice1`, `id: 3`, `type: i`): display range `-3` to `2` unitless; default `0`. Raw range `-3` to `2`; raw default `0`. Sets the octave of Oscillator 1, with a 6-octave range.
- `Osc 1 Freq` (`key: PitchVoice1`, `id: 4`, `type: f`): display range `-12` to `12` unitless; default `0`. Raw range `-12` to `12`; raw default `0`. Sets the interval of Oscillator 1, from 1 octave down to 1 octave up, with 0.1 octave resolution.
- `Osc 1 Pan` (`key: PanVoice1`, `id: 5`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of Oscillator 1 between the left and right channels.
- `Osc 1 Level` (`key: LevelVoice1`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the level of Oscillator 1.
- `Osc 2 Wave` (`key: ShapeVoice2`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Morphs Oscillator 2 from a sine wave (at 0.0) to a triangle wave (at 5.0) to a modified square wave (at 10.0).
- `Osc 2 Duty Cycle` (`key: DutyVoice2`, `id: 8`, `type: f`): display range `0` to `100` %; default `30.2`. Raw range `0` to `1`; raw default `0.302`. Controls the duty cycle of Oscillator 2. Adjusting Duty Cycle to either extreme increases harmonic content of the waveform.
- `Osc 2 Octave` (`key: OctaveVoice2`, `id: 9`, `type: i`): display range `-3` to `2` unitless; default `-1`. Raw range `-3` to `2`; raw default `-1`. Sets the octave of Oscillator 2, with a 6-octave range.
- `Osc 2 Freq` (`key: PitchVoice2`, `id: 10`, `type: f`): display range `-12` to `12` unitless; default `-0.1`. Raw range `-12` to `12`; raw default `-0.1`. Sets the interval of Oscillator 2, from 1 octave down to 1 octave up, with 0.1 octave resolution.
- `Osc 2 Pan` (`key: PanVoice2`, `id: 11`, `type: f`): display range `-100` to `100` Left; default `0.544`. Raw range `0` to `1`; raw default `0.544`. Controls the panning of Oscillator 2 between the left and right channels.
- `Osc 2 Level` (`key: LevelVoice2`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the level of Oscillator 2.
- `Osc 3 Wave` (`key: ShapeVoice3`, `id: 13`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Morphs Oscillator 3 from a sine wave (at 0.0) to a triangle wave (at 5.0) to a modified square wave (at 10.0).
- `Osc 3 Duty Cycle` (`key: DutyVoice3`, `id: 14`, `type: f`): display range `0` to `100` %; default `72`. Raw range `0` to `1`; raw default `0.72`. Controls the duty cycle of Oscillator 3. Adjusting Duty Cycle to either extreme increases harmonic content of the waveform.
- `Osc 3 Octave` (`key: OctaveVoice3`, `id: 15`, `type: i`): display range `-3` to `2` unitless; default `-1`. Raw range `-3` to `2`; raw default `-1`. Sets the octave of Oscillator 3, with a 6-octave range.
- `Osc 3 Freq` (`key: PitchVoice3`, `id: 16`, `type: f`): display range `-12` to `12` unitless; default `-0.15`. Raw range `-12` to `12`; raw default `-0.15`. Sets the interval of Oscillator 3, from 1 octave down to 1 octave up, with 0.1 octave resolution.
- `Osc 3 Pan` (`key: PanVoice3`, `id: 17`, `type: f`): display range `-100` to `100` Left; default `0.478`. Raw range `0` to `1`; raw default `0.478`. Controls the panning of Oscillator 3 between the left and right channels.
- `Osc 3 Level` (`key: LevelVoice3`, `id: 18`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the level of Oscillator 3.
- `Filter Preset` (`key: SynthPreset`, `id: 19`, `type: i`): valid values `1`, `2`, `3`, `4`; default `1`. Raw range `0` to `3`; raw default `0`. Choose between 4 filter responses to shape the synth.
- `FM 3 > 1` (`key: FM Voice3to1`, `id: 20`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Controls how much of Oscillator 3 is used to modulate Oscillator 1's frequency.
- `Low Cut` (`key: LowCut`, `id: 21`, `type: f`): display range `19.9` to `1000` Off; default `19.9`. Raw range `19.9` to `1000`; raw default `19.9`. Applies a low cut (or high pass) filter to the synth, letting you remove the effected signal below a certain frequency.
- `High Cut` (`key: HighCut`, `id: 22`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (or low pass) filter to the synth, letting you remove the effected signal above a certain frequency.
- `Mix` (`key: Mix`, `id: 23`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the blend between the synth and the dry signal. At 0%, no synth is heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 24`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## 4 OSC Generator

- Model key: `HD2_Synth4OSCGeneratorMono`
- Model ID: `337`
- Type: Synth
- Category: `synth`
- Class: Generator
- DSP usage: 3.8
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Osc 1 Shape` (`key: Osc1Shape`, `id: 1`, `type: i`): valid values `Saw Up`, `Saw Down`, `Triangle`, `Sine`, `Square`; default `Sine`. Raw range `0` to `4`; raw default `3`. Selects the shape of Oscillator 1.
- `Osc 1 Freq` (`key: Osc1Freq`, `id: 2`, `type: f`): display range `20` to `10000` Hz; default `110`. Raw range `20` to `10000`; raw default `110`. Controls the frequency of Oscillator 1, from 20 Hz to 10.0 kHz.
- `Osc 1 Level` (`key: Osc1Level`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the level of Oscillator 1.
- `Osc 2 Shape` (`key: Osc2Shape`, `id: 4`, `type: i`): valid values `Saw Up`, `Saw Down`, `Triangle`, `Sine`, `Square`; default `Sine`. Raw range `0` to `4`; raw default `3`. Selects the shape of Oscillator 2.
- `Osc 2 Freq` (`key: Osc2Freq`, `id: 5`, `type: f`): display range `20` to `10000` Hz; default `220`. Raw range `20` to `10000`; raw default `220`. Controls the frequency of Oscillator 2, from 20 Hz to 10.0 kHz.
- `Osc 2 Level` (`key: Osc2Level`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the level of Oscillator 2.
- `Osc 3 Shape` (`key: Osc3Shape`, `id: 7`, `type: i`): valid values `Saw Up`, `Saw Down`, `Triangle`, `Sine`, `Square`; default `Sine`. Raw range `0` to `4`; raw default `3`. Selects the shape of Oscillator 3.
- `Osc 3 Freq` (`key: Osc3Freq`, `id: 8`, `type: f`): display range `20` to `10000` Hz; default `440`. Raw range `20` to `10000`; raw default `440`. Controls the frequency of Oscillator 3, from 20 Hz to 10.0 kHz.
- `Osc 3 Level` (`key: Osc3Level`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the level of Oscillator 3.
- `Osc 4 Shape` (`key: Osc4Shape`, `id: 10`, `type: i`): valid values `Saw Up`, `Saw Down`, `Triangle`, `Sine`, `Square`; default `Sine`. Raw range `0` to `4`; raw default `3`. Selects the shape of Oscillator 4.
- `Osc 4 Freq` (`key: Osc4Freq`, `id: 11`, `type: f`): display range `20` to `10000` Hz; default `660`. Raw range `20` to `10000`; raw default `660`. Controls the frequency of Oscillator 4, from 20 Hz to 10.0 kHz.
- `Osc 4 Level` (`key: Osc4Level`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the level of Oscillator 4.
- `Attack` (`key: Attack`, `id: 13`, `type: f`): display range `10` to `10000` ms; default `500`. Raw range `0.01` to `10`; raw default `0.5`. Controls how fast the 4 OSC Generator fades in when engaged, from 10 ms to 10 sec.
- `Decay` (`key: Decay`, `id: 14`, `type: f`): display range `10` to `10000` ms; default `3000`. Raw range `0.01` to `10`; raw default `3`. Controls how fast the 4 OSC Generator fades out when bypassed, from 10 ms to 10 sec.
- `Dry Level` (`key: DryLevel`, `id: 15`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the level of the dry signal.
- `Level` (`key: Level`, `id: 16`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## 4-Voice Chorus

- Model key: `HD2_Chorus4VoiceMono`
- Model ID: `408`
- Type: Modulation
- Category: `modulation`
- Class: Chorus
- DSP usage: 2.5
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Rate` (`key: Speed`, `id: 1`, `type: f`): display range `0.1` to `2` Hz; default `0.5`. Raw range `0.1` to `2`; raw default `0.5`. Controls the speed of the chorus’ low-frequency oscillator (LFO) from slow to fast.
- `Depth` (`key: Depth`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Controls the amplitude of the modulation, from mild to deep.
- `Voices` (`key: NumVoices`, `id: 3`, `type: i`): display range `2` to `4` unitless; default `4`. Raw range `2` to `4`; raw default `4`. Determines the number of voices in the chorus (2, 3, or 4).
- `Low Cut` (`key: HPFFrq`, `id: 4`, `type: f`): display range `40` to `1000` Hz; default `266`. Raw range `40` to `1000`; raw default `266`. Applies a low cut (high pass) filter to the chorus, letting you remove the effected signal below a certain frequency.
- `High Shelf` (`key: HighShelf`, `id: 5`, `type: f`): display range `-6` to `3` dB; default `0`. Raw range `-6` to `3`; raw default `0`. Applies a high cut (low pass) filter to the fills, letting you remove the effected signal above a certain frequency.
- `Mix` (`key: Mix`, `id: 6`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the chorus effect and the dry signal. At 0%, no chorus effect is heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 7`, `type: f`): display range `-60` to `6` dB; default `1`. Raw range `-60` to `6`; raw default `1`. Sets the overall level of the block.

---

## 60s Bias Trem

- Model key: `HD2_Tremolo60sBiasTremMono`
- Model ID: `284`
- Type: Modulation
- Category: `modulation`
- Class: Tremolo
- DSP usage: 1.8
- Based on: Vox AC-15 Tremolo
- Agoura model: No

### Parameters

- `Speed` (`key: Speed`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Controls the speed or rate of the tremolo. When set to note values, Speed follows the system tempo.
- `Intensity` (`key: Intensity`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `7.3`. Raw range `0` to `1`; raw default `0.73`. Controls the depth of the tremolo, or the intensity of the volume fluctuations (or when Mode is set to "Vibrato,", pitch fluctuations).
- `Mode` (`key: Mode`, `id: 3`, `type: b`): valid values `Tremolo`, `Vibrato`; default `Tremolo`. Raw range `Off` to `On`; raw default `Off`. Selects between Tremolo (repeating volume fluctuations) and Vibrato (repeating pitch fluctuations).
- `Level` (`key: Level`, `id: 4`, `type: f`): display range `-60` to `6` dB; default `1`. Raw range `-60` to `6`; raw default `1`. Sets the overall level of the block.

---

## 70s Chorus

- Model key: `HD2_Chorus70sChorusMono`
- Model ID: `298`
- Type: Modulation
- Category: `modulation`
- Class: Chorus
- DSP usage: 3.0
- Based on: BOSS CE-1
- Agoura model: No

### Parameters

- `Chorus Rate` (`key: ChorusIntensity`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.7`. Raw range `0` to `1`; raw default `0.57`. Controls the speed or rate of the chorus. When set to note values, Cho Rate follows the system tempo. Does nothing when Mode is set to "Vibrato."
- `Mode` (`key: Mode`, `id: 2`, `type: b`): valid values `Chorus`, `Vibrato`; default `Chorus`. Raw range `Off` to `On`; raw default `Off`. Selects the type of modulation--Chorus or Vibrato.
- `Vibrato Rate` (`key: VibratoRate`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the speed or rate of the vibrato. When set to note values, Vib Rate follows the system tempo. Does nothing when Mode is set to "Chorus."
- `Vibrato Depth` (`key: VibratoDepth`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the depth or intensity of the vibrato. Does nothing when Mode is set to "Chorus."
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the modulation effect and the dry signal. At 0%, no modulation is heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `1`. Raw range `-60` to `6`; raw default `1`. Sets the overall level of the block.
- `Headroom` (`key: Headroom`, `id: 7`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Some chorus pedals' internal signal paths exhibit a bit of grit, especially when placed after a high-gain amp block. Negative values increase the perceived amount of grit; positive values clean things up a bit.

---

## AM Ring Mod

- Model key: `HD2_RingModulatorAMRingModMono`
- Model ID: `293`
- Type: Modulation
- Category: `modulation`
- Class: Ring Mod
- DSP usage: 2.1
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Frequency` (`key: Frequency`, `id: 1`, `type: f`): display range `5` to `4000` Hz; default `1280`. Raw range `5` to `4000`; raw default `1280`. Controls the frequency of the FM (Frequency Modulation).
- `AM` (`key: AM`, `id: 2`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. When on, adds AM (Amplitude Modulation).
- `AM Freq` (`key: AMFreq`, `id: 3`, `type: f`): display range `200` to `8000` Hz; default `1650.8`. Raw range `200` to `8000`; raw default `1650.8`. Controls the frequency of the AM (Amplitude Modulation).
- `LFO` (`key: LFO`, `id: 4`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, enables the LFO (Low Frequency Oscillator) to modulate the FM and AM frequencies up and down.
- `LFO Rate` (`key: LFORate`, `id: 5`, `type: f`): display range `0.0001` to `10` Hz; default `5`. Raw range `0.0001` to `10`; raw default `5`. Controls the rate or speed of the LFO. When LFO Rate is set to note values, it follows the system tempo. Does nothing if LFO is off.
- `LFO Shape` (`key: LFOShape`, `id: 6`, `type: i`): valid values `Saw Up`, `Saw Down`, `Triangle`, `Sine`, `Square`, `Inverse Sine`; default `Triangle`. Raw range `0` to `5`; raw default `2`. Controls the wave shape of the LFO. Does nothing if LFO is off.
- `Mix` (`key: Mix`, `id: 7`, `type: f`): display range `0` to `100` %; default `67`. Raw range `0` to `1`; raw default `0.67`. Controls the blend between the ring modulation effect and the dry signal. At 0%, no effect is heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 8`, `type: f`): display range `-60` to `6` dB; default `4.5`. Raw range `-60` to `6`; raw default `4.5`. Sets the overall level of the block.

---

## Ampeg Liquifier

- Model key: `HD2_ChorusAmpegLiquifierMono`
- Model ID: `403`
- Type: Modulation
- Category: `modulation`
- Class: Chorus
- DSP usage: 5.1
- Based on: Ampeg Liquifier Chorus
- Agoura model: No

### Parameters

- `Rate` (`key: Rate`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the speed of the chorus’ low-frequency oscillator (LFO) from slow to fast.
- `Depth` (`key: Depth`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amplitude of the modulation, from mild to deep.
- `Mix` (`key: Mix`, `id: 3`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the chorus effect and the dry signal. At 0%, no chorus is heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 4`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Headroom` (`key: Headroom`, `id: 5`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Some mod pedals' internal signal paths exhibit a bit of grit, especially when placed after a high-gain amp block. Negative values increase the perceived amount of grit; positive values clean things up a bit. At 0dB, the model behaves like the original pedal.
- `Type` (`key: Mode`, `id: 6`, `type: b`): valid values `Single`, `Dual`; default `Dual`. Raw range `Off` to `On`; raw default `On`. Liquifier is actually two choruses in one, hence the "Dual" default. If you'd prefer it to behave more like a traditional chorus pedal, choose "Single"

---

## Bleat Chop Trem

- Model key: `HD2_TremoloPatternMono`
- Model ID: `341`
- Type: Modulation
- Category: `modulation`
- Class: Tremolo
- DSP usage: 1.7
- Based on: Lightfoot Labs Goatkeeper
- Agoura model: No

### Parameters

- `Speed` (`key: Speed`, `id: 1`, `type: f`): display range `0` to `15` Hz; default `1`. Raw range `0` to `15`; raw default `1`. Controls the speed or rate of the step sequence. When set to note values, Speed follows the system tempo.
- `Wave Shape` (`key: WaveShape`, `id: 2`, `type: i`): valid values `Saw Up`, `Saw Down`, `Triangle`, `Sine`, `Square`; default `Square`. Raw range `0` to `4`; raw default `4`. Selects the wave shape of the tremolo. "Square" is generally the most audible here.
- `Step 1` (`key: Step1`, `id: 3`, `type: i`): display range `0` to `17` unitless; default `2`. Raw range `0` to `17`; raw default `2`. Determines the number of pulses in the sequence's first step, with higher values resulting in progressively shorter and faster tremolo pulses. "Mute" mutes the signal and "Full" bypasses the tremolo for the entirety of the step.
- `Step 2` (`key: Step2`, `id: 4`, `type: i`): display range `0` to `17` unitless; default `4`. Raw range `0` to `17`; raw default `4`. Determines the number of pulses in the sequence's second step, with higher values resulting in progressively shorter and faster tremolo pulses. "Mute" mutes the signal and "Full" bypasses the tremolo for the entirety of the step.
- `Step 3` (`key: Step3`, `id: 5`, `type: i`): display range `0` to `17` unitless; default `8`. Raw range `0` to `17`; raw default `8`. Determines the number of pulses in the sequence's third step, with higher values resulting in progressively shorter and faster tremolo pulses. "Mute" mutes the signal and "Full" bypasses the tremolo for the entirety of the step.
- `Step 4` (`key: Step4`, `id: 6`, `type: i`): display range `0` to `17` unitless; default `6`. Raw range `0` to `17`; raw default `6`. Determines the number of pulses in the sequence's fourth step, with higher values resulting in progressively shorter and faster tremolo pulses. "Mute" mutes the signal and "Full" bypasses the tremolo for the entirety of the step.
- `Depth` (`key: Depth`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the depth of the tremolo, or the intensity of the volume fluctuations.
- `Level` (`key: Level`, `id: 9`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Boctaver

- Model key: `VIC_PitchBoctaverMono`
- Model ID: `409`
- Type: Pitch
- Category: `pitch`
- Class: Pitch
- DSP usage: 2.5
- Based on: Boss OC-2 Octaver
- Agoura model: No

### Parameters

- `-1 Octave` (`key: Oct1Level`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Sets the level of the signal one octave down.
- `-2 Octave` (`key: Oct2Level`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Sets the level of the signal two octaves down.
- `Dry Level` (`key: DryLevel`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Sets the level of the dry (unaffected) signal.

---

## Bubble Vibrato

- Model key: `HD2_VibratoBubbleVibratoMono`
- Model ID: `299`
- Type: Modulation
- Category: `modulation`
- Class: Chorus
- DSP usage: 3.0
- Based on: BOSS VB-2 Vibrato
- Agoura model: No

### Parameters

- `Speed` (`key: Speed`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.32`. Raw range `0` to `1`; raw default `0.632`. Controls the speed or rate of the phaser. When set to note values, Speed follows the system tempo.
- `Depth` (`key: Depth`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the depth or intensity of the vibrato effect.
- `Rise Time` (`key: RiseTime`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.6`. Raw range `0` to `1`; raw default `0.66`. Controls hot long it takes for the vibrato effect to fade in.
- `Mix` (`key: Mix`, `id: 4`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the blend between the vibrato effect and the dry signal.
- `Level` (`key: Level`, `id: 5`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Headroom` (`key: Headroom`, `id: 6`, `type: f`): display range `-12` to `12` dB; default `3`. Raw range `-12` to `12`; raw default `3`. Provides up to 12.0 dB of additional headroom. Some pedals' internal signal paths exhibit a bit of grit, especially when placed after a high-gain amp block. Negative values increase the perceived amount of grit; positive values clean things up a bit.

---

## Chorus

- Model key: `HD2_ChorusMono`
- Model ID: `267`
- Type: Modulation
- Category: `modulation`
- Class: Chorus
- DSP usage: 2.2
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Speed` (`key: Speed`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Controls the speed or rate of the chorus. When set to note values, Speed follows the system tempo.
- `Depth` (`key: Depth`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `8.1`. Raw range `0` to `1`; raw default `0.81`. Controls the depth or intensity of the chorus. Higher values can get into pretty warbly territory, depending on the WavShape value.
- `Predelay` (`key: Predelay`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `3.2`. Raw range `0` to `1`; raw default `0.32`. Applies a bit of delay to the affected signal which at higher values, can impart a bit of ADT (Automatic Double Tracking) sound. Most evident when Mix is not maxed out or the Chorus block is on a parallel path.
- `Wave Shape` (`key: WaveShape`, `id: 4`, `type: i`): valid values `Saw Up`, `Saw Down`, `Triangle`, `Sine`, `Square`, `Inverse Sine`, `Random`; default `Triangle`. Raw range `0` to `6`; raw default `2`. Selects one of seven wave shapes for the modulation.
- `Tone` (`key: Tone`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the overall tonal balance of the chorus.
- `Mix` (`key: Mix`, `id: 6`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the modulation effect and the dry signal. At 0%, no modulation is heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 7`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Chrome

- Model key: `HD2_WahChromeMono`
- Model ID: `314`
- Type: Wah
- Category: `wah`
- Class: Wah
- DSP usage: 1.3
- Based on: Maestro Boomerang
- Agoura model: No

### Parameters

- `Position` (`key: Pedal`, `id: 1`, `type: f`): display range `0` to `100` %; default `0`. Raw range `0` to `1`; raw default `0`. Adjusts the position or frequency of the wah effect. By default, this is assigned to Expression Pedal 1.
- `Fc Low` (`key: FcLow`, `id: 2`, `type: f`): display range `20` to `500` Hz; default `470`. Raw range `20` to `500`; raw default `470`. Sets the low frequency cutoff of the wah filter. Along with Fc High, sets the frequency range or sweep of the wah.
- `Fc High` (`key: FcHigh`, `id: 3`, `type: f`): display range `500` to `5000` Hz; default `2415`. Raw range `500` to `5000`; raw default `2415`. Sets the high frequency cutoff of the wah filter. Along with Fc Low, sets the frequency range or sweep of the wah.
- `Mix` (`key: Mix`, `id: 4`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the blend between the wah effect and the dry signal. At 0%, no wah effect is heard; at 100%, no dry signal is heard. If the wah effect is a bit strong, consider bringing this down a bit.
- `Level` (`key: Level`, `id: 5`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Wah block.

---

## Chrome Custom

- Model key: `HD2_WahChromeCustomMono`
- Model ID: `313`
- Type: Wah
- Category: `wah`
- Class: Wah
- DSP usage: 1.3
- Based on: Colorsound Wah-fuzz
- Agoura model: No

### Parameters

- `Position` (`key: Pedal`, `id: 1`, `type: f`): display range `0` to `100` %; default `0`. Raw range `0` to `1`; raw default `0`. Adjusts the position or frequency of the wah effect. By default, this is assigned to Expression Pedal 1.
- `Fc Low` (`key: FcLow`, `id: 2`, `type: f`): display range `20` to `500` Hz; default `300`. Raw range `20` to `500`; raw default `300`. Sets the low frequency cutoff of the wah filter. Along with Fc High, sets the frequency range or sweep of the wah.
- `Fc High` (`key: FcHigh`, `id: 3`, `type: f`): display range `500` to `5000` Hz; default `1975`. Raw range `500` to `5000`; raw default `1975`. Sets the high frequency cutoff of the wah filter. Along with Fc Low, sets the frequency range or sweep of the wah.
- `Mix` (`key: Mix`, `id: 4`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the blend between the wah effect and the dry signal. At 0%, no wah effect is heard; at 100%, no dry signal is heard. If the wah effect is a bit strong, consider bringing this down a bit.
- `Level` (`key: Level`, `id: 5`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Wah block.

---

## Colorful

- Model key: `HD2_WahColorfulMono`
- Model ID: `315`
- Type: Wah
- Category: `wah`
- Class: Wah
- DSP usage: 1.3
- Based on: Dunlop Cry Baby Super
- Agoura model: No

### Parameters

- `Position` (`key: Pedal`, `id: 1`, `type: f`): display range `0` to `100` %; default `0`. Raw range `0` to `1`; raw default `0`. Adjusts the position or frequency of the wah effect. By default, this is assigned to Expression Pedal 1.
- `Fc Low` (`key: FcLow`, `id: 2`, `type: f`): display range `20` to `500` Hz; default `280`. Raw range `20` to `500`; raw default `280`. Sets the low frequency cutoff of the wah filter. Along with Fc High, sets the frequency range or sweep of the wah.
- `Fc High` (`key: FcHigh`, `id: 3`, `type: f`): display range `500` to `5000` Hz; default `2101`. Raw range `500` to `5000`; raw default `2101`. Sets the high frequency cutoff of the wah filter. Along with Fc Low, sets the frequency range or sweep of the wah.
- `Mix` (`key: Mix`, `id: 4`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the blend between the wah effect and the dry signal. At 0%, no wah effect is heard; at 100%, no dry signal is heard. If the wah effect is a bit strong, consider bringing this down a bit.
- `Level` (`key: Level`, `id: 5`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Wah block.

---

## Conductor

- Model key: `HD2_WahConductorMono`
- Model ID: `316`
- Type: Wah
- Category: `wah`
- Class: Wah
- DSP usage: 1.3
- Based on: RMC Real McCoy 1
- Agoura model: No

### Parameters

- `Position` (`key: Pedal`, `id: 1`, `type: f`): display range `0` to `100` %; default `0`. Raw range `0` to `1`; raw default `0`. Adjusts the position or frequency of the wah effect. By default, this is assigned to Expression Pedal 1.
- `Fc Low` (`key: FcLow`, `id: 2`, `type: f`): display range `20` to `500` Hz; default `392`. Raw range `20` to `500`; raw default `392`. Sets the low frequency cutoff of the wah filter. Along with Fc High, sets the frequency range or sweep of the wah.
- `Fc High` (`key: FcHigh`, `id: 3`, `type: f`): display range `500` to `5000` Hz; default `922`. Raw range `500` to `5000`; raw default `922`. Sets the high frequency cutoff of the wah filter. Along with Fc Low, sets the frequency range or sweep of the wah.
- `Mix` (`key: Mix`, `id: 4`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the blend between the wah effect and the dry signal. At 0%, no wah effect is heard; at 100%, no dry signal is heard. If the wah effect is a bit strong, consider bringing this down a bit.
- `Level` (`key: Level`, `id: 5`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Wah block.

---

## Courtesan Flange

- Model key: `HD2_FlangerCourtesanFlangeMono`
- Model ID: `295`
- Type: Modulation
- Category: `modulation`
- Class: Flanger/Tape
- DSP usage: 4.0
- Based on: Electro-Harmonix Deluxe Electric Mistress
- Agoura model: No

### Parameters

- `Rate` (`key: Rate`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.3`. Raw range `0` to `1`; raw default `0.43`. Controls the speed or rate of the flanger. When set to note values, Speed follows the system tempo.
- `Range` (`key: Range`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `7.1`. Raw range `0` to `1`; raw default `0.71`. Sets the lower limit of the flanger sweep. Higher values result in wider, more dramatic sweeps. When FreezeLFO is on, sweeps the frequency of the comb filter.
- `Color` (`key: Color`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.3`. Raw range `0` to `1`; raw default `0.53`. Controls the intensity of the flanger sweep by increasing feedback. Higher values result in more of that classic "whoosh."
- `Freeze LFO` (`key: FilterMatrix`, `id: 4`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, disables the automatic flanger sweep (LFO), so Rate no longer affects the sound. Adjusting Range then manually sweeps the frequency of the comb filter.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the modulation effect and the dry signal.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Headroom` (`key: Headroom`, `id: 7`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Provides up to 12.0 dB of additional headroom.

---

## Deluxe Phaser

- Model key: `HD2_PhaserDeluxePhaserMono`
- Model ID: `326`
- Type: Modulation
- Category: `modulation`
- Class: Phaser
- DSP usage: 2.2
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Rate` (`key: Rate`, `id: 1`, `type: f`): display range `0` to `10` Hz; default `0.2`. Raw range `0` to `10`; raw default `0.2`. Controls the speed or rate of the phaser. When set to note values, Speed follows the system tempo.
- `Depth` (`key: Depth`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `1`. Raw range `0` to `1`; raw default `0.1`. Along with Offset, controls the depth or intensity of the phaser. For the most obvious results, set both Depth and Offset to lower values (but not all the way to 0.0).
- `Offset` (`key: Offset`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `0.1`. Raw range `0` to `1`; raw default `0.01`. Along with Depth, controls the depth or intensity of the phaser. For the most obvious results, set both Depth and Offset to lower values (but not all the way to 0.0).
- `Feedback` (`key: Feedback`, `id: 4`, `type: f`): display range `-100` to `100` %; default `25`. Raw range `-1` to `1`; raw default `0.25`. Controls how much of the processed signal feeds back into the input.
- `Wave Shape` (`key: WaveShape`, `id: 5`, `type: i`): valid values `Saw Up`, `Saw Down`, `Triangle`, `Sine`, `Square`, `Inverse Sine`, `Random`; default `Triangle`. Raw range `0` to `6`; raw default `2`. Selects one of seven wave shapes for the phaser sweep.
- `Mix` (`key: Mix`, `id: 6`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the modulation effect and the dry signal.
- `Stages` (`key: Stages`, `id: 7`, `type: i`): display range `2` to `16` unitless; default `8`. Raw range `2` to `16`; raw default `8`. Selects the number of phase stages, thus controlling the degree of out-of-phase-ness. The higher number of stages, the richer the effect.
- `Level` (`key: Level`, `id: 8`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Double Take

- Model key: `HD2_DelayDoubleDoubleMono`
- Model ID: `340`
- Type: Modulation
- Category: `modulation`
- Class: Flanger/Tape
- DSP usage: 8.1
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Doubles` (`key: Doubles`, `id: 1`, `type: i`): valid values `1`, `2`, `3`, `4`; default `1`. Raw range `0` to `3`; raw default `0`. Selects the number of additional voices, 1-4.
- `Slop` (`key: Slop`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the apparent tightness or sloppiness of the additional voices. Higher values result in more slop, or more variation between the voices.
- `Sensitivity` (`key: Sensitivity`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `7.2`. Raw range `0` to `1`; raw default `0.72`. Adjusts the Slop parameter's sensitivity to playing dynamics. At higher values, playing harder generates more slop.
- `Dry Level` (`key: Dry Level`, `id: 4`, `type: f`): display range `-60` to `9` dB; default `0`. Raw range `-60` to `9`; raw default `0`. Controls the level of the dry (uneffected) signal.
- `Wet Level` (`key: Wet Level`, `id: 5`, `type: f`): display range `-60` to `9` dB; default `0`. Raw range `-60` to `9`; raw default `0`. Controls the level of the wet (effected) signal.

---

## Dual Pitch

- Model key: `HD2_PitchDualPitchMono`
- Model ID: `324`
- Type: Pitch
- Category: `pitch`
- Class: Pitch
- DSP usage: 4.1
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Interval 1` (`key: Interval1`, `id: 1`, `type: i`): display range `-24` to `24` unitless; default `7`. Raw range `-24` to `24`; raw default `7`. Sets the pitch of the first pitch-shifted voice in semitones, from 2 octaves down to 2 octaves up.
- `Cents 1` (`key: Cents1`, `id: 2`, `type: f`): display range `-50` to `50` unitless; default `0`. Raw range `-50` to `50`; raw default `0`. Sets the pitch of the first pitch-shifted voice in cents, from -50.0 to +50.0.
- `Delay 1` (`key: Time1`, `id: 3`, `type: f`): display range `0` to `100` ms; default `0`. Raw range `0` to `0.1`; raw default `0`. Delays the first pitch-shifted voice slightly. At lower values, it can thicken up your tone or at higher values, it can kind of emulate strumming from a single note.
- `Voice 1 Level` (`key: LevelVoice1`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the level of the first pitch-shifted voice.
- `Interval 2` (`key: Interval2`, `id: 5`, `type: i`): display range `-24` to `24` unitless; default `16`. Raw range `-24` to `24`; raw default `16`. Sets the pitch of the second pitch-shifted voice in semitones, from 2 octaves down to 2 octaves up.
- `Cents 2` (`key: Cents2`, `id: 6`, `type: f`): display range `-50` to `50` unitless; default `-5`. Raw range `-50` to `50`; raw default `-5`. Sets the pitch of the second pitch-shifted voice in cents, from -50.0 to +50.0.
- `Delay 2` (`key: Time2`, `id: 7`, `type: f`): display range `0` to `100` ms; default `0`. Raw range `0` to `0.1`; raw default `0`. Delays the second pitch-shifted voice slightly. At lower values, it can thicken up your tone or at higher values, it can kind of emulate strumming from a single note.
- `Voice 2 Level` (`key: LevelVoice2`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the level of the second pitch-shifted voice.
- `Mix` (`key: Mix`, `id: 9`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the pitch-shifted signal and the dry signal. At 0%, no pitch-shifted signal is heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 10`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Dynamix Flanger

- Model key: `HD2_FlangerDynamixFlangerMono`
- Model ID: `325`
- Type: Modulation
- Category: `modulation`
- Class: Flanger/Tape
- DSP usage: 2.9
- Based on: MicMix Dyna Flanger
- Agoura model: No

### Parameters

- `Speed` (`key: Speed`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `0.44`. Raw range `0` to `1`; raw default `0.044`. Controls the speed or rate of the flanger when Ctl Select is set to "LFO." When Speed is set to note values, it follows the system tempo. Does nothing when Ctl Select is set to "Envelope" or "Manual."
- `Control Select` (`key: Control Select`, `id: 2`, `type: i`): valid values `LFO`, `Envelope`, `Manual`; default `LFO`. Raw range `0` to `2`; raw default `0`. Selects whether the flanger sweep shifts up and down automatically like a traditional flanger ("LFO"), responds to your playing dynamics ("Envelope"), or is adjusted manually from the Manual knob/slider ("Manual").
- `Depth` (`key: Depth`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.6`. Raw range `0` to `1`; raw default `0.66`. Controls how wide and dramatic the flanging sweep appears.
- `Manual` (`key: Manual`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `4.18`. Raw range `0` to `1`; raw default `0.418`. Manually controls the flanger sweep when Ctl Select is set to "Manual." Does nothing when Ctl Select is set to "LFO" or "Envelope."
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the modulation effect and the dry signal.
- `Phasing` (`key: Phasing`, `id: 6`, `type: f`): display range `-10` to `10` unitless; default `-9.999`. Raw range `-1` to `1`; raw default `-0.9999`. Chooses whether the effect produces in-phase flanging (negative values) or out-of-phase flanging (positive values).
- `Recycle` (`key: Recycle`, `id: 7`, `type: b`): valid values `Out`, `In`; default `In`. Raw range `Off` to `On`; raw default `On`. When on, adds feedback.
- `CV Dynamics` (`key: CV Dynamics`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls how wide the sweep range is based on your playing dynamics when Ctl Select is set to "Envelope." Higher values result in a wider range. Does nothing when Ctl Select is set to "LFO" or "Manual."
- `Max Delay` (`key: Max Delay`, `id: 9`, `type: f`): display range `10` to `99.7` ms; default `10`. Raw range `0.01` to `0.0997`; raw default `0.01`. Sets the longest point of the flanger sweep. Higher values can result in spacey slapback delay and chorus-type sounds.
- `CV Tracking` (`key: CV Tracking`, `id: 10`, `type: b`): valid values `Normal`, `Invert`; default `Normal`. Raw range `Off` to `On`; raw default `Off`. Selects whether the flanger sweep moves from high to low ("Normal") or from low to high ("Inverted").
- `Envelope Lag` (`key: Env Lag`, `id: 11`, `type: f`): display range `0` to `100` ms; default `100`. Raw range `0` to `0.1`; raw default `0.1`. Delays the flanger sweep slightly when Ctl Select is set to "Envelope." Does nothing when Ctl Select is set to "LFO" or "Manual."
- `Envelope Input` (`key: Env Input`, `id: 12`, `type: f`): display range `0` to `70` dB; default `70`. Raw range `0` to `70`; raw default `70`. If your playing dynamics aren't generating the desired flanger sweep range (when Ctl Select is set to "Envelope"), adjust this setting so that your hardest picking triggers the highest point of your ideal sweep. Does nothing when Ctl Select is set to "LFO" or "Manual."
- `CV Decay` (`key: CV Decay`, `id: 13`, `type: i`): valid values `x1`, `x2`, `x4`; default `x4`. Raw range `0` to `2`; raw default `2`. Controls the super quick initial sweep down (or sweep up if CVTrackng is set to "Inverted"). x1 is about 0.5 seconds long, x2 is about 1 second, and x4 is about 2 seconds. Does nothing when Ctl Select is set to "LFO" or "Manual."

---

## Fassel

- Model key: `HD2_WahFasselMono`
- Model ID: `317`
- Type: Wah
- Category: `wah`
- Class: Wah
- DSP usage: 1.3
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Position` (`key: Pedal`, `id: 1`, `type: f`): display range `0` to `100` %; default `0`. Raw range `0` to `1`; raw default `0`. Adjusts the position or frequency of the wah effect. By default, this is assigned to Expression Pedal 1.
- `Fc Low` (`key: FcLow`, `id: 2`, `type: f`): display range `20` to `500` Hz; default `455`. Raw range `20` to `500`; raw default `455`. Sets the low frequency cutoff of the wah filter. Along with Fc High, sets the frequency range or sweep of the wah.
- `Fc High` (`key: FcHigh`, `id: 3`, `type: f`): display range `500` to `5000` Hz; default `2155`. Raw range `500` to `5000`; raw default `2155`. Sets the high frequency cutoff of the wah filter. Along with Fc Low, sets the frequency range or sweep of the wah.
- `Mix` (`key: Mix`, `id: 4`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the blend between the wah effect and the dry signal. At 0%, no wah effect is heard; at 100%, no dry signal is heard. If the wah effect is a bit strong, consider bringing this down a bit.
- `Level` (`key: Level`, `id: 5`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Wah block.

---

## FlexoVibe

- Model key: `VIC_FlexoVibeMono`
- Model ID: `407`
- Type: Modulation
- Category: `modulation`
- Class: Phaser
- DSP usage: 1.7
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Rate` (`key: Speed`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the speed of the chorus’ low-frequency oscillator (LFO) from slow to fast.
- `Intensity` (`key: Intensity`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the amplitude of the modulation, from mild to deep.
- `Warp` (`key: Warp`, `id: 3`, `type: f`): display range `-1` to `1` unitless; default `0`. Raw range `-1` to `1`; raw default `0`. Controls the shape of the LFO. At 0.0, the LFO waveform is a triangle; at +1.0 and -1.0, the waveforms exhibit more chaos, or "warping."
- `Mix` (`key: Mix`, `id: 4`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the effected signal and the dry signal. At 0%, no effect is heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 5`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Gray Flanger

- Model key: `HD2_FlangerGrayFlangerMono`
- Model ID: `296`
- Type: Modulation
- Category: `modulation`
- Class: Flanger/Tape
- DSP usage: 4.0
- Based on: MXR 117 Flanger
- Agoura model: No

### Parameters

- `Rate` (`key: Rate`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `1.6`. Raw range `0` to `1`; raw default `0.16`. Controls the speed or rate of the flanger. When set to note values, Speed follows the system tempo.
- `Width` (`key: Width`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `7.8`. Raw range `0` to `1`; raw default `0.78`. Controls how wide and dramatic the flanging sweep appears.
- `Manual` (`key: Manual`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `7.7`. Raw range `0` to `1`; raw default `0.77`. Controls the degree of phase shifting. Has no affect when Width is set to 100%.
- `Regeneration` (`key: Regen`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5.6`. Raw range `0` to `1`; raw default `0.56`. Controls the amount of feedback in the effected signal.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the modulation effect and the dry signal.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Headroom` (`key: Headroom`, `id: 7`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Provides up to 12.0 dB of additional headroom.

---

## HD2_Chorus4VoiceStereo

- Model key: `HD2_Chorus4VoiceStereo`
- Model ID: `257`
- Type: Modulation
- Category: `modulation`
- Class: Unknown
- DSP usage: 2.9
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_Chorus70sChorusStereo

- Model key: `HD2_Chorus70sChorusStereo`
- Model ID: `167`
- Type: Modulation
- Category: `modulation`
- Class: Unknown
- DSP usage: 4.9
- Based on: BOLine 6 Original CE-1
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_ChorusAmpegLiquifierStereo

- Model key: `HD2_ChorusAmpegLiquifierStereo`
- Model ID: `252`
- Type: Modulation
- Category: `modulation`
- Class: Unknown
- DSP usage: 9.2
- Based on: Ampeg Liquifier Chorus
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_ChorusPlastiChorusStereo

- Model key: `HD2_ChorusPlastiChorusStereo`
- Model ID: `199`
- Type: Modulation
- Category: `modulation`
- Class: Unknown
- DSP usage: 5.7
- Based on: Modded Arion SCH-Z chorus
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_ChorusStereo

- Model key: `HD2_ChorusStereo`
- Model ID: `134`
- Type: Modulation
- Category: `modulation`
- Class: Unknown
- DSP usage: 3.7
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DelayDoubleDoubleStereo

- Model key: `HD2_DelayDoubleDoubleStereo`
- Model ID: `203`
- Type: Modulation
- Category: `modulation`
- Class: Unknown
- DSP usage: 8.9
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_FlangerCourtesanFlangeStereo

- Model key: `HD2_FlangerCourtesanFlangeStereo`
- Model ID: `163`
- Type: Modulation
- Category: `modulation`
- Class: Unknown
- DSP usage: 6.5
- Based on: Electro-Harmonix Deluxe EM
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_FlangerDynamixFlangerStereo

- Model key: `HD2_FlangerDynamixFlangerStereo`
- Model ID: `188`
- Type: Modulation
- Category: `modulation`
- Class: Unknown
- DSP usage: 3.5
- Based on: MicMix Dynaflanger
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_FlangerGrayFlangerStereo

- Model key: `HD2_FlangerGrayFlangerStereo`
- Model ID: `164`
- Type: Modulation
- Category: `modulation`
- Class: Unknown
- DSP usage: 7.5
- Based on: MXR 117 Flanger
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_FlangerHarmonicFlangerStereo

- Model key: `HD2_FlangerHarmonicFlangerStereo`
- Model ID: `165`
- Type: Modulation
- Category: `modulation`
- Class: Unknown
- DSP usage: 6.5
- Based on: A/DA Flanger
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_PhaserDeluxePhaserStereo

- Model key: `HD2_PhaserDeluxePhaserStereo`
- Model ID: `189`
- Type: Modulation
- Category: `modulation`
- Class: Unknown
- DSP usage: 2.7
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_PhaserPebblePhaserStereo

- Model key: `HD2_PhaserPebblePhaserStereo`
- Model ID: `244`
- Type: Modulation
- Category: `modulation`
- Class: Unknown
- DSP usage: 5.0
- Based on: Electro-Harmonix Small Stone
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_PhaserScriptModPhaseStereo

- Model key: `HD2_PhaserScriptModPhaseStereo`
- Model ID: `162`
- Type: Modulation
- Category: `modulation`
- Class: Unknown
- DSP usage: 2.6
- Based on: MXR Phase 90
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_PhaserUbiquitousVibeStereo

- Model key: `HD2_PhaserUbiquitousVibeStereo`
- Model ID: `152`
- Type: Modulation
- Category: `modulation`
- Class: Unknown
- DSP usage: 3.9
- Based on: Shin-ei Uni-Vibe
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_PitchDualPitchStereo

- Model key: `HD2_PitchDualPitchStereo`
- Model ID: `192`
- Type: Pitch
- Category: `pitch`
- Class: Unknown
- DSP usage: 7.8
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_PitchPitchWhamStereo

- Model key: `HD2_PitchPitchWhamStereo`
- Model ID: `156`
- Type: Pitch
- Category: `pitch`
- Class: Unknown
- DSP usage: 4.2
- Based on: Digitech Whammy
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_PitchSimplePitchStereo

- Model key: `HD2_PitchSimplePitchStereo`
- Model ID: `193`
- Type: Pitch
- Category: `pitch`
- Class: Unknown
- DSP usage: 5.5
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_PitchTwinHarmonyStereo

- Model key: `HD2_PitchTwinHarmonyStereo`
- Model ID: `155`
- Type: Pitch
- Category: `pitch`
- Class: Unknown
- DSP usage: 7.7
- Based on: Eventide H3000
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_RetroReelStereo

- Model key: `HD2_RetroReelStereo`
- Model ID: `250`
- Type: Modulation
- Category: `modulation`
- Class: Unknown
- DSP usage: 5.3
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_RingModulatorAMRingModStereo

- Model key: `HD2_RingModulatorAMRingModStereo`
- Model ID: `161`
- Type: Modulation
- Category: `modulation`
- Class: Unknown
- DSP usage: 2.4
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_Synth3NoteGeneratorStereo

- Model key: `HD2_Synth3NoteGeneratorStereo`
- Model ID: `422`
- Type: Synth
- Category: `synth`
- Class: Unknown
- DSP usage: 3.6
- Based on: 1x12" Fender Blackface Deluxe
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_Synth4OSCGeneratorStereo

- Model key: `HD2_Synth4OSCGeneratorStereo`
- Model ID: `421`
- Type: Synth
- Category: `synth`
- Class: Unknown
- DSP usage: 3.8
- Based on: 4x12" ENGL XXL V30
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_Tremolo60sBiasTremStereo

- Model key: `HD2_Tremolo60sBiasTremStereo`
- Model ID: `150`
- Type: Modulation
- Category: `modulation`
- Class: Unknown
- DSP usage: 2.3
- Based on: Vox AC-15 Tremolo
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_TremoloHarmonicStereo

- Model key: `HD2_TremoloHarmonicStereo`
- Model ID: `194`
- Type: Modulation
- Category: `modulation`
- Class: Unknown
- DSP usage: 2.4
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_TremoloOpticalTremStereo

- Model key: `HD2_TremoloOpticalTremStereo`
- Model ID: `151`
- Type: Modulation
- Category: `modulation`
- Class: Unknown
- DSP usage: 2.0
- Based on: Fender optical tremolo circuit
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_TremoloPatternStereo

- Model key: `HD2_TremoloPatternStereo`
- Model ID: `204`
- Type: Modulation
- Category: `modulation`
- Class: Unknown
- DSP usage: 2.1
- Based on: Lightfoot Labs Goatkeeper
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_VibratoBubbleVibratoStereo

- Model key: `HD2_VibratoBubbleVibratoStereo`
- Model ID: `168`
- Type: Modulation
- Category: `modulation`
- Class: Unknown
- DSP usage: 5.0
- Based on: BOSS VB-2 Vibrato
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_WahChromeCustomStereo

- Model key: `HD2_WahChromeCustomStereo`
- Model ID: `177`
- Type: Wah
- Category: `wah`
- Class: Unknown
- DSP usage: 1.9
- Based on: Modded Vox V847
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_WahChromeStereo

- Model key: `HD2_WahChromeStereo`
- Model ID: `178`
- Type: Wah
- Category: `wah`
- Class: Unknown
- DSP usage: 1.9
- Based on: Vox V847
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_WahColorfulStereo

- Model key: `HD2_WahColorfulStereo`
- Model ID: `179`
- Type: Wah
- Category: `wah`
- Class: Unknown
- DSP usage: 1.9
- Based on: Colorsound Wah-fuzz
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_WahConductorStereo

- Model key: `HD2_WahConductorStereo`
- Model ID: `180`
- Type: Wah
- Category: `wah`
- Class: Unknown
- DSP usage: 1.9
- Based on: Maestro Boomerang
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_WahFasselStereo

- Model key: `HD2_WahFasselStereo`
- Model ID: `181`
- Type: Wah
- Category: `wah`
- Class: Unknown
- DSP usage: 1.9
- Based on: Dunlop Cry Baby Super
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_WahTeardrop310Stereo

- Model key: `HD2_WahTeardrop310Stereo`
- Model ID: `153`
- Type: Wah
- Category: `wah`
- Class: Unknown
- DSP usage: 3.1
- Based on: Dunlop Cry Baby Fasel model 310
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_WahTeardropBassQStereo

- Model key: `HD2_WahTeardropBassQStereo`
- Model ID: `261`
- Type: Wah
- Category: `wah`
- Class: Unknown
- DSP usage: 2.0
- Based on: Dunlop Bass Cry Baby Model 105Q
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_WahThroatyStereo

- Model key: `HD2_WahThroatyStereo`
- Model ID: `182`
- Type: Wah
- Category: `wah`
- Class: Unknown
- DSP usage: 1.9
- Based on: RMC Real McCoy 1
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_WahUKWah846Stereo

- Model key: `HD2_WahUKWah846Stereo`
- Model ID: `154`
- Type: Wah
- Category: `wah`
- Class: Unknown
- DSP usage: 3.1
- Based on: Vox V846
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_WahVettaWahStereo

- Model key: `HD2_WahVettaWahStereo`
- Model ID: `183`
- Type: Wah
- Category: `wah`
- Class: Unknown
- DSP usage: 1.9
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_WahWeeperStereo

- Model key: `HD2_WahWeeperStereo`
- Model ID: `184`
- Type: Wah
- Category: `wah`
- Class: Unknown
- DSP usage: 1.9
- Based on: Arbiter Cry Baby
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## Harmonic Flanger

- Model key: `HD2_FlangerHarmonicFlangerMono`
- Model ID: `297`
- Type: Modulation
- Category: `modulation`
- Class: Flanger/Tape
- DSP usage: 3.9
- Based on: A/DA Flanger
- Agoura model: No

### Parameters

- `Rate` (`key: Rate`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Controls the speed or rate of the flanger. When set to note values, Speed follows the system tempo.
- `Width` (`key: Width`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls how wide and dramatic the flanging sweep appears.
- `Manual` (`key: Manual`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `8.4`. Raw range `0` to `1`; raw default `0.84`. Controls the degree of phase shifting. Has no effect when Width is set to 100%.
- `Enhance` (`key: Enhance`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `2.8`. Raw range `0` to `1`; raw default `0.28`. Controls the amount of feedback in the effected signal. WARNING! When set to higher values, Harmonic Flanger can begin to self-oscillate and get really loud.
- `Harmonic` (`key: Harmonic`, `id: 5`, `type: b`): valid values `Odd`, `Even`; default `Even`. Raw range `Off` to `On`; raw default `On`. Selects an Even or Odd harmonic relationship between the passband peaks.
- `Mix` (`key: Mix`, `id: 6`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the modulation effect and the dry signal.
- `Level` (`key: Level`, `id: 7`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Headroom` (`key: Headroom`, `id: 8`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Provides up to 12.0 dB of additional headroom.

---

## Harmonic Tremolo

- Model key: `HD2_TremoloHarmonicMono`
- Model ID: `329`
- Type: Modulation
- Category: `modulation`
- Class: Tremolo
- DSP usage: 2.1
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Speed` (`key: Speed`, `id: 1`, `type: f`): display range `0` to `15` Hz; default `4`. Raw range `0` to `15`; raw default `4`. Controls the speed or rate of the tremolo. When set to note values, Speed follows the system tempo.
- `Intensity` (`key: Intensity`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the depth of the tremolo, or the intensity of the frequency band fluctuations.
- `Wave Shape` (`key: WaveShape`, `id: 3`, `type: i`): valid values `Saw Up`, `Saw Down`, `Triangle`, `Sine`, `Square`, `Inverse Sine`, `Random`; default `Sine`. Raw range `0` to `6`; raw default `3`. Selects the wave shape of the tremolo. Classic tremolo is commonly a sine or triangle wave, but cool choppy sounds can be discovered with square or saw down waves.
- `Duty Cycle` (`key: DutyCycle`, `id: 4`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Alters the wave shape in differing ways. With Triangle, 50% is a normal triangle wave and extreme values warp the wave toward a saw down (0%) or saw up (100%) shape. With Sine, 50% is a normal sine wave and extreme values warp the wave toward a parabolic down (0%) or parabolic up (100%) shape. With Square, 50% is an even square wave, higher values lengthen the signal's on time, and lower values shorten the signal's on time. DutyCycle does not apply to Saw Up or Saw down.
- `Bass Freq` (`key: BassFreq`, `id: 5`, `type: f`): display range `40` to `2000` Hz; default `500`. Raw range `40` to `2000`; raw default `500`. Sets the upper range of the low frequency band. Harmonic Tremolo modulates between the low and high frequency bands.
- `Treble Freq` (`key: TrebFreq`, `id: 6`, `type: f`): display range `100` to `10000` Hz; default `700`. Raw range `100` to `10000`; raw default `700`. Sets the lower range of the high frequency band. Harmonic Tremolo modulates between the low and high frequency bands.
- `Level` (`key: Level`, `id: 7`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Mix` (`key: Mix`, `id: 8`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the blend between the modulation effect and the dry signal. At 0%, no modulation is heard; at 100%, no dry signal is heard.

---

## Optical Trem

- Model key: `HD2_TremoloOpticalTremMono`
- Model ID: `311`
- Type: Modulation
- Category: `modulation`
- Class: Tremolo
- DSP usage: 1.5
- Based on: Fender optical tremolo circuit
- Agoura model: No

### Parameters

- `Speed` (`key: Speed`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.6`. Raw range `0` to `1`; raw default `0.66`. Controls the speed or rate of the tremolo. When set to note values, Speed follows the system tempo.
- `Intensity` (`key: Intensity`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.7`. Raw range `0` to `1`; raw default `0.67`. Controls the depth of the tremolo, or the intensity of the volume fluctuations.
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Pebble Phaser

- Model key: `HD2_PhaserPebblePhaserMono`
- Model ID: `381`
- Type: Modulation
- Category: `modulation`
- Class: Phaser
- DSP usage: 3.1
- Based on: Electro-Harmonix Small Stone
- Agoura model: No

### Parameters

- `Rate` (`key: Rate`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Controls the speed or rate of the phaser. When set to note values, Speed follows the system tempo.
- `Color` (`key: Color`, `id: 2`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When turned on, results in a more pronounced phase shifting effect.
- `Level` (`key: Level`, `id: 4`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Pitch Ring Mod

- Model key: `HD2_RingModulatorPitchRingModStereo`
- Model ID: `160`
- Type: Modulation
- Category: `modulation`
- Class: Ring Mod
- DSP usage: 3.5
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Shape` (`key: Shape`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the shape of the main oscillator used for the AM (Amplitude Modulation) carrier. The oscillator is a sine wave at 0.0, a triangle wave at 5.0, and a square wave at 10.0.
- `Duty Cycle` (`key: DutyCycle`, `id: 2`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Alters the oscillator wave shape in differing ways. For example, when Shape is a triangle wave (5.0), 50% is a normal triangle wave and extreme values warp the wave toward a saw down (0%) or saw up (100%) shape. Or when Shape is a square wave (10.0), 50% is symmetrical and extreme values result in a wave shape that's mostly low (0%) or mostly high (100%).
- `Octave` (`key: Octave`, `id: 3`, `type: i`): display range `-3` to `3` unitless; default `-1`. Raw range `-3` to `3`; raw default `-1`. The frequency of the AM (Amplitude Modulation) carrier follows the pitch of the input signal. Octave shifts the AM carrier in relation to the input signal by up to 3 octaves up or down.
- `Pitch` (`key: Pitch`, `id: 4`, `type: f`): display range `-12` to `12` unitless; default `-2.3999`. Raw range `-12` to `12`; raw default `-2.3999`. The frequency of the AM (Amplitude Modulation) carrier follows the pitch of the input signal. Pitch shifts the AM (Amplitude Modulation) carrier in relation to the input signal by up to 12.0 semitones up or down.
- `Low Cut` (`key: LowCut`, `id: 5`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (or high pass) filter to the ring modulation, letting you remove the effected signal below a certain frequency.
- `High Cut` (`key: HighCut`, `id: 6`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (or low pass) filter to the ring modulation, letting you remove the effected signal above a certain frequency.
- `FM Amount` (`key: FMAmount`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `6.7`. Raw range `0` to `1`; raw default `0.67`. Controls the amount of the FM (Frequency Modulation) modulator applied to the AM carrier. At 0.0, only the AM carrier is applied; at 10.0 the AM carrier is fully modulated by the FM modulator.
- `FM Shape` (`key: FMShape`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `7.7`. Raw range `0` to `1`; raw default `0.77`. Controls the shape of the oscillator used for FM of the AM carrier. The oscillator is a sine wave at 0.0, a triangle wave at 5.0, and a square wave at 10.0.
- `FM Duty` (`key: FMDuty`, `id: 9`, `type: f`): display range `0` to `100` %; default `70`. Raw range `0` to `1`; raw default `0.7`. Alters the FM oscillator wave shape. 50% is symmetrical and extreme values result in a wave shape that's mostly low (0%) or mostly high (100%).
- `FM Octave` (`key: FMOctave`, `id: 10`, `type: i`): display range `-3` to `3` unitless; default `1`. Raw range `-3` to `3`; raw default `1`. The frequency of the FM carrier follows the pitch of the input signal. FM Octave shifts the FM carrier in relation to the input signal by up to 3 octaves up or down.
- `FM Pitch` (`key: FMPitch`, `id: 11`, `type: f`): display range `-12` to `12` unitless; default `1.4`. Raw range `-12` to `12`; raw default `1.4`. The frequency of the FM carrier follows the pitch of the input signal. FM Pitch shifts the FM carrier in relation to the input signal by up to 12.0 semitones up or down.
- `Mix` (`key: Mix`, `id: 12`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the ring modulation effect and the dry signal. At 0%, no effect is heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 13`, `type: f`): display range `-60` to `6` dB; default `5.5`. Raw range `-60` to `6`; raw default `5.5`. Sets the overall level of the block.

---

## Pitch Wham

- Model key: `HD2_PitchPitchWhamMono`
- Model ID: `292`
- Type: Pitch
- Category: `pitch`
- Class: Wham
- DSP usage: 3.5
- Based on: Digitech Whammy
- Agoura model: No

### Parameters

- `Position` (`key: Pedal`, `id: 1`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Adjusts the position of the controller. By default, this is assigned to Expression Pedal 1.
- `Heel Pitch` (`key: Heel`, `id: 2`, `type: i`): display range `-24` to `24` unitless; default `-12`. Raw range `-24` to `24`; raw default `-12`. Sets the pitch when the pedal/controller is in its lowest position.
- `Toe Pitch` (`key: Toe`, `id: 3`, `type: i`): display range `-24` to `24` unitless; default `12`. Raw range `-24` to `24`; raw default `12`. Sets the pitch when the pedal/controller is in its highest position.
- `Mix` (`key: Mix`, `id: 4`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the blend between the pitch-shifted signal and the dry signal. At 0%, no pitch-shifted signal is heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 5`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## PlastiChorus

- Model key: `HD2_ChorusPlastiChorusMono`
- Model ID: `335`
- Type: Modulation
- Category: `modulation`
- Class: Chorus
- DSP usage: 3.7
- Based on: Modded Arion SCH-Z chorus
- Agoura model: No

### Parameters

- `Rate` (`key: Rate`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Controls the speed or rate of the chorus/vibrato. When set to note values, Rate follows the system tempo.
- `Depth` (`key: Depth`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.7`. Raw range `0` to `1`; raw default `0.47`. Controls the depth or intensity of the modulation.
- `Mode` (`key: Mode`, `id: 3`, `type: b`): valid values `Chorus`, `Vibrato`; default `Chorus`. Raw range `Off` to `On`; raw default `Off`. Selects the type of modulation--Chorus or Vibrato.
- `Tone` (`key: Tone`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the overall tonal balance of the modulation.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the modulation effect and the dry signal. At 0%, no modulation is heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Headroom` (`key: Headroom`, `id: 7`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Some chorus pedals' internal signal paths exhibit a bit of grit, especially when placed after a high-gain amp block. Negative values increase the perceived amount of grit; positive values clean things up a bit.

---

## Poly Capo

- Model key: `L6SPB_PolyDowntune`
- Model ID: `523`
- Type: Pitch
- Category: `pitch`
- Class: Pitch
- DSP usage: 16.2
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Interval` (`key: Interval`, `id: 1`, `type: i`): display range `-12` to `12` unitless; default `-2`. Raw range `-12` to `12`; raw default `-2`. Sets the pitch of the effect in semitones, from an octave down to an octave up.
- `Tracking` (`key: Tracking`, `id: 2`, `type: i`): valid values `X Fast`, `Fast`, `Stable`, `X Stable`; default `X Stable`. Raw range `0` to `3`; raw default `3`. Determines how the poly pitch engine reacts to your playing. Leave this set to "X Stable" (fewest artifacts when pitch shifting complex chords) and only select a different setting if you experience too much latency when playing fast lead lines.
- `Auto EQ` (`key: AutoEQ`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Determines how much compensation EQ is applied to the shifted signal. If the effected signal sounds too harsh when pitched up (or dull when pitched down), adjust this setting to taste. The higher the value, the more EQ is applied at the shift end points; when set to 0.0, no compensation EQ is applied.
- `Mix` (`key: Mix`, `id: 4`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the blend between the pitch-shifted signal and the dry signal. At 0%, no pitch-shifted signal is heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 5`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Poly Detune

- Model key: `L6SPB_PolyChorus`
- Model ID: `521`
- Type: Modulation
- Category: `modulation`
- Class: Chorus
- DSP usage: 16.2
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Blend` (`key: Blend`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the blend between the detuned signal and the dry signal. At 0%, no detuning is heard; at 100%, no dry signal is heard.
- `Detune` (`key: Detune`, `id: 2`, `type: f`): display range `-50` to `50` unitless; default `10`. Raw range `-50` to `50`; raw default `10`. Controls the amount of detuning, from -50 cents to +50 cents. Extreme values add more depth or intensity to the chorus-like sound.
- `Low Cut` (`key: LowCut`, `id: 3`, `type: i`): valid values `Off`, `20 Hz`, `50 Hz`, `100 Hz`, `200 Hz`, `500 Hz`, `1 kHz`, `2 kHz`, `5 kHz`; default `Off`. Raw range `0` to `8`; raw default `0`. Applies a low cut (or high pass) filter to the detuning, letting you remove the effected signal below a certain frequency.
- `High Cut` (`key: HighCut`, `id: 4`, `type: i`): valid values `1 kHz`, `2 kHz`, `5 kHz`, `10 kHz`, `Off`; default `Off`. Raw range `0` to `4`; raw default `4`. Applies a high cut (or low pass) filter to the detuning, letting you remove the effected signal above a certain frequency.
- `Level` (`key: Level`, `id: 5`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Poly Pitch

- Model key: `L6SPB_PolyPitch`
- Model ID: `480`
- Type: Pitch
- Category: `pitch`
- Class: Pitch
- DSP usage: 17.5
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Interval` (`key: Interval`, `id: 1`, `type: i`): display range `-24` to `24` unitless; default `7`. Raw range `-24` to `24`; raw default `7`. Sets the pitch of the effect in semitones, from 2 octaves down to 2 octaves up.
- `Cents` (`key: Cents`, `id: 2`, `type: f`): display range `-50` to `50` unitless; default `0`. Raw range `-50` to `50`; raw default `0`. Sets the pitch of the effect in cents, from -50.0 to +50.0.
- `Shift Time` (`key: ShiftTime`, `id: 3`, `type: f`): display range `0` to `8000` ms; default `176`. Raw range `0` to `8`; raw default `0.176`. Determines how long it takes for the signal to ramp up or down to the set pitch when the block is enabled.
- `Shift Curve` (`key: ShiftCurve`, `id: 4`, `type: i`): valid values `Start Slow 5`, `Start Slow 4`, `Start Slow 3`, `Start Slow 2`, `Start Slow 1`, `Linear`, `Start Fast 1`, `Start Fast 2`, `Start Fast 3`, `Start Fast 4`, `Start Fast 5`; default `Linear`. Raw range `-5` to `5`; raw default `0`. Determines the trajectory curve of the pitch shift over time. Start Slow values are concave (slower changes to start, speeding up toward the end); Start Fast values are convex (the opposite). At the knob's extremes (Start Slow 5 and Start Fast 5), the pitch will actually overshoot a little before settling on the target pitch.
- `Return Time` (`key: ReturnTime`, `id: 5`, `type: f`): display range `0` to `8000` ms; default `0`. Raw range `0` to `8`; raw default `0`. Determines how long it takes for the signal to return to normal pitch when the block is bypassed.
- `Return Curve` (`key: ReturnCurve`, `id: 6`, `type: i`): valid values `Start Slow 5`, `Start Slow 4`, `Start Slow 3`, `Start Slow 2`, `Start Slow 1`, `Linear`, `Start Fast 1`, `Start Fast 2`, `Start Fast 3`, `Start Fast 4`, `Start Fast 5`; default `Linear`. Raw range `-5` to `5`; raw default `0`. Determines the trajectory curve when returning to the original pitch. Start Slow values are concave (slower changes to start, speeding up toward the end); Start Fast values are convex (the opposite). At the knob's extremes (Start Slow 5 and Start Fast 5), the pitch will actually overshoot a little before settling on the original pitch.
- `Tracking` (`key: Tracking`, `id: 7`, `type: i`): valid values `X Fast`, `Fast`, `Stable`, `X Stable`; default `X Stable`. Raw range `0` to `3`; raw default `3`. Determines how the poly pitch engine reacts to your playing. Leave this set to "X Stable" (fewest artifacts when pitch shifting complex chords) and only select a different setting if you experience too much latency when playing fast lead lines.
- `Auto EQ` (`key: AutoEQ`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Determines how much compensation EQ is applied to the shifted signal. If the effected signal sounds too harsh when pitched up (or dull when pitched down), adjust this setting to taste. The higher the value, the more EQ is applied at the shift end points; when set to 0.0, no compensation EQ is applied.
- `Mix` (`key: Mix`, `id: 9`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the blend between the pitch-shifted signal and the dry signal. At 0%, no pitch-shifted signal is heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 10`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Poly Wham

- Model key: `L6SPB_PolyWham`
- Model ID: `522`
- Type: Pitch
- Category: `pitch`
- Class: Wham
- DSP usage: 17.5
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Position` (`key: Position`, `id: 1`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Adjusts the position of the controller. By default, this is assigned to Expression Pedal 1.
- `Heel Shift` (`key: HeelShift`, `id: 2`, `type: i`): display range `-36` to `24` unitless; default `0`. Raw range `-36` to `24`; raw default `0`. Sets the pitch when the pedal/controller is in its lowest position.
- `Toe Shift` (`key: ToeShift`, `id: 3`, `type: i`): display range `-36` to `24` unitless; default `12`. Raw range `-36` to `24`; raw default `12`. Sets the pitch when the pedal/controller is in its highest position.
- `Tracking` (`key: Tracking`, `id: 4`, `type: i`): valid values `X Fast`, `Fast`, `Stable`, `X Stable`; default `X Stable`. Raw range `0` to `3`; raw default `3`. Determines how the poly pitch engine reacts to your playing. Leave this set to "X Stable" (fewest artifacts when pitch shifting complex chords) and only select a different setting if you experience too much latency when playing fast lead lines.
- `Auto EQ` (`key: AutoEQ`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Determines how much compensation EQ is applied to the shifted signal. If the effected signal sounds too harsh when pitched up (or dull when pitched down), adjust this setting to taste. The higher the value, the more EQ is applied at the shift end points; when set to 0.0, no compensation EQ is applied.
- `Mix` (`key: Mix`, `id: 6`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the blend between the pitch-shifted signal and the dry signal. At 0%, no pitch-shifted signal is heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 7`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Retro Reel

- Model key: `HD2_RetroReelMono`
- Model ID: `389`
- Type: Modulation
- Category: `modulation`
- Class: Flanger/Tape
- DSP usage: 3.7
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Wow/Flutter` (`key: WowFlutter`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Controls how much warbly tape sound is heard.
- `Saturation` (`key: Saturation`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Adds analog tape saturation and at high enough settings, distortion. At lower settings, it's great for simply warming up a tone.
- `Low Cut` (`key: LowCut`, `id: 3`, `type: f`): display range `19.9` to `1000` Off; default `19.9`. Raw range `19.9` to `1000`; raw default `19.9`. Determines the frequency of the Low Cut (High Pass) filter. At higher settings, can provide a lo-fi effect.
- `High Cut` (`key: HighCut`, `id: 4`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Determines the frequency of the High Cut (Low Pass) filter. At lower settings, can provide the natural high-end roll-off of old tape.
- `Tape Speed` (`key: TapeSpeed`, `id: 5`, `type: i`): valid values `7.5 ips`, `15 ips`, `30 ips`; default `15 ips`. Raw range `0` to `2`; raw default `1`. Changes both the rate of the modulation applied by the WowFluttr control and the filtering response of the analog tape emulation.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Texture` (`key: Texture`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `6.25`. Raw range `0` to `1`; raw default `0.625`. Controls the amount of the NAB tape EQ in the simulated tape path. When Saturation is set to 0.0, the texture is invisible. When Saturation is turned up, the texture will affect the tightness (or looseness) of the distortion.

---

## Script Mod Phase

- Model key: `HD2_PhaserScriptModPhaseMono`
- Model ID: `294`
- Type: Modulation
- Category: `modulation`
- Class: Phaser
- DSP usage: 2.0
- Based on: MXR Phase 90
- Agoura model: No

### Parameters

- `Rate` (`key: Rate`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `1.9`. Raw range `0` to `1`; raw default `0.19`. Controls the speed or rate of the phaser. When set to note values, Speed follows the system tempo.
- `Mix` (`key: Mix`, `id: 2`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the modulation effect and the dry signal. The most intense phasing happens around 50%.
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `-60` to `6` dB; default `1`. Raw range `-60` to `6`; raw default `1`. Sets the overall level of the block.

---

## Simple Pitch

- Model key: `HD2_PitchSimplePitchMono`
- Model ID: `328`
- Type: Pitch
- Category: `pitch`
- Class: Pitch
- DSP usage: 3.5
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Interval` (`key: Interval1`, `id: 1`, `type: i`): display range `-24` to `24` unitless; default `7`. Raw range `-24` to `24`; raw default `7`. Sets the pitch of the effected signal in semitones, from 2 octaves down to 2 octaves up.
- `Cents` (`key: Cents1`, `id: 2`, `type: f`): display range `-50` to `50` unitless; default `0`. Raw range `-50` to `50`; raw default `0`. Sets the pitch of the effected signal in cents, from -50.0 to +50.0.
- `Delay` (`key: Time1`, `id: 3`, `type: f`): display range `0` to `100` ms; default `0`. Raw range `0` to `0.1`; raw default `0`. Delays the pitch-shifted signal slightly. At lower values, it can thicken up your tone or at higher values, it can kind of emulate strumming from a single note.
- `Shift Level` (`key: LevelVoice1`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the level of the pitch-shifted signal.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the pitch-shifted signal and the dry signal. At 0%, no pitch-shifted signal is heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Controls the overall level of the block.

---

## Teardrop 310

- Model key: `HD2_WahTeardrop310Mono`
- Model ID: `289`
- Type: Wah
- Category: `wah`
- Class: Wah
- DSP usage: 2.3
- Based on: Eventide H3000
- Agoura model: No

### Parameters

- `Position` (`key: Pedal`, `id: 1`, `type: f`): display range `0` to `100` %; default `0`. Raw range `0` to `1`; raw default `0`. Adjusts the position or frequency of the wah effect. By default, this is assigned to Expression Pedal 1. Set Min and Max below to restrict the wah's frequency sweep range.
- `Mix` (`key: Mix`, `id: 2`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the blend between the wah effect and the dry signal. At 0%, no wah effect is heard; at 100%, no dry signal is heard. If the wah effect is a bit strong, consider bringing this down a bit.
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Wah block.

---

## Teardrop Bass Q

- Model key: `HD2_WahTeardropBassQMono`
- Model ID: `415`
- Type: Wah
- Category: `wah`
- Class: Wah
- DSP usage: 1.5
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Position` (`key: Pedal`, `id: 1`, `type: f`): display range `0` to `100` %; default `0`. Raw range `0` to `1`; raw default `0`. Adjusts the position or frequency of the wah effect. By default, this is assigned to Expression Pedal 1. Set Min and Max below to restrict the wah's frequency sweep range.
- `Q Trim` (`key: Q Trim`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Q or bandwidth of the effect. Lower values boost a wider frequency band and higher values boost a narrower frequency band.
- `Volume Trim` (`key: Volume Trim`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Emulates the actual pedal's side volume trim knob.
- `Mix` (`key: Mix`, `id: 4`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the blend between the wah effect and the dry signal. At 0%, no wah effect is heard; at 100%, no dry signal is heard. If the wah effect is a bit strong, consider bringing this down a bit.
- `Level` (`key: Level`, `id: 5`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Wah block.

---

## Throaty

- Model key: `HD2_WahThroatyMono`
- Model ID: `318`
- Type: Wah
- Category: `wah`
- Class: Wah
- DSP usage: 1.3
- Based on: Arbiter Cry Baby
- Agoura model: No

### Parameters

- `Position` (`key: Pedal`, `id: 1`, `type: f`): display range `0` to `100` %; default `0`. Raw range `0` to `1`; raw default `0`. Adjusts the position or frequency of the wah effect. By default, this is assigned to Expression Pedal 1.
- `Fc Low` (`key: FcLow`, `id: 2`, `type: f`): display range `20` to `500` Hz; default `310`. Raw range `20` to `500`; raw default `310`. Sets the low frequency cutoff of the wah filter. Along with Fc High, sets the frequency range or sweep of the wah.
- `Fc High` (`key: FcHigh`, `id: 3`, `type: f`): display range `500` to `5000` Hz; default `1735`. Raw range `500` to `5000`; raw default `1735`. Sets the high frequency cutoff of the wah filter. Along with Fc Low, sets the frequency range or sweep of the wah.
- `Mix` (`key: Mix`, `id: 4`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the blend between the wah effect and the dry signal. At 0%, no wah effect is heard; at 100%, no dry signal is heard. If the wah effect is a bit strong, consider bringing this down a bit.
- `Level` (`key: Level`, `id: 5`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Wah block.

---

## Tremolo

- Model key: `HD2_TremoloTremoloMono`
- Model ID: `322`
- Type: Modulation
- Category: `modulation`
- Class: Tremolo
- DSP usage: 1.5
- Based on: BOSS PN-2
- Agoura model: No

### Parameters

- `Speed` (`key: Speed`, `id: 1`, `type: f`): display range `0` to `15` Hz; default `3`. Raw range `0` to `15`; raw default `3`. Controls the speed or rate of the tremolo. When set to note values, Speed follows the system tempo.
- `Intensity` (`key: Intensity`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the depth of the tremolo, or the intensity of the volume fluctuations.
- `Wave Shape` (`key: WaveShape`, `id: 3`, `type: i`): valid values `Saw Up`, `Saw Down`, `Triangle`, `Sine`, `Square`, `Inverse Sine`, `Random`; default `Sine`. Raw range `0` to `6`; raw default `3`. Selects the wave shape of the tremolo. Classic tremolo is commonly a sine or triangle wave, but cool choppy sounds can be discovered with square or saw down waves.
- `Duty Cycle` (`key: DutyCycle`, `id: 4`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Alters the wave shape in differing ways. With Triangle, 50% is a normal triangle wave and extreme values warp the wave toward a saw down (0%) or saw up (100%) shape. With Sine, 50% is a normal sine wave and extreme values warp the wave toward a parabolic down (0%) or parabolic up (100%) shape. With Square, 50% is an even square wave, higher values lengthen the signal's on time, and lower values shorten the signal's on time. DutyCycle does not apply to Saw Up or Saw down.
- `Level` (`key: Level`, `id: 5`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Tremolo/Autopan

- Model key: `HD2_TremoloTremoloStereo`
- Model ID: `186`
- Type: Modulation
- Category: `modulation`
- Class: Unknown
- DSP usage: 1.8
- Based on: BOSS PN-2
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## Trinity Chorus

- Model key: `HD2_ChorusTrinityChorusStereo`
- Model ID: `166`
- Type: Modulation
- Category: `modulation`
- Class: Chorus
- DSP usage: 4.7
- Based on: Dytronics Tri-Stereo Chorus
- Agoura model: No

### Parameters

- `Rate` (`key: Rate`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3.3`. Raw range `0` to `1`; raw default `0.33`. Controls the speed or rate of the chorus. Only active when LFO Man is turned on. When set to note values, Rate follows the system tempo.
- `Left Depth` (`key: Left`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `7.9`. Raw range `0` to `1`; raw default `0.79`. Controls the depth or intensity of the Left delay channel/chorus circuit 1.
- `Center Depth` (`key: Center`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.2`. Raw range `0` to `1`; raw default `0.52`. Controls the depth or intensity of the Center delay channel/chorus circuit 2.
- `Right Depth` (`key: Right`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `8.5`. Raw range `0` to `1`; raw default `0.85`. Controls the depth or intensity of the Right delay channel/chorus circuit 3.
- `LFO Preset` (`key: Preset`, `id: 5`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. When on, engages an "ensemble-style" chorus preset with fixed Rate, L Depth, C Depth, and R Depth.
- `LFO Manual` (`key: Manual`, `id: 6`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. When on, enables control of Rate, L Depth, C Depth, and R Depth. Can be used in conjunction with LFO Prst.
- `Left Boost` (`key: LeftBoost`, `id: 7`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. Adds an enhanced frequency response to the Left delay channel, making it a bit more pronounced.
- `Center Boost` (`key: CenterBoost`, `id: 8`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. Adds an enhanced frequency response to the Center delay channel, making it a bit more pronounced.
- `Right Boost` (`key: RightBoost`, `id: 9`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. Adds an enhanced frequency response to the Right delay channel, making it a bit more pronounced.
- `Mode` (`key: Mode`, `id: 10`, `type: b`): valid values `Mono`, `Stereo`; default `Stereo`. Raw range `Off` to `On`; raw default `On`. Selects whether Trinity Chorus operates in mono or stereo.
- `Mix` (`key: Mix`, `id: 11`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the modulation effect and the dry signal. At 0%, no modulation is heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Triple Rotary

- Model key: `HD2_Rotary3RotorStereo`
- Model ID: `260`
- Type: Modulation
- Category: `modulation`
- Class: Rotary
- DSP usage: 7.2
- Based on: Yamaha RA-200
- Agoura model: No

### Parameters

- `Speed` (`key: Speed`, `id: 1`, `type: b`): valid values `Slow`, `Fast`; default `Slow`. Raw range `Off` to `On`; raw default `Off`. Selects Slow or Fast rotary speed. When changing values, the rotary speaker speed gradually changes, based on the RampTime value.
- `Slow Speed` (`key: SlowSpeed`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Sets the rotary speed when Speed is set to "Slow." When set to note values, SlowSpeed follows the system tempo.
- `Fast Speed` (`key: FastSpeed`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Sets the rotary speed when Speed is set to "Fast." When set to note values, FastSpeed follows the system tempo.
- `Ramp Time` (`key: RampTime`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Determines how fast the rotary speed changes when Speed is changed from "Slow" to "Fast" or vice versa.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the blend between the rotary effect and the dry signal. At 0%, no rotary effect is heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Drive` (`key: Drive`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `2.2`. Raw range `0` to `1`; raw default `0.22`. Controls the amount of drive into the speaker's power amp.
- `Headroom` (`key: Headroom`, `id: 8`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Provides up to 12.0dB of additional headroom.
- `Low Cut` (`key: LowCut`, `id: 9`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter to the speakers, letting you remove the effected signal below a certain frequency.
- `High Cut` (`key: HighCut`, `id: 10`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (low pass) filter to the speakers, letting you remove the effected signal above a certain frequency.
- `Wobble` (`key: Wobble`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Models how evenly the rotating speaker and its ballast weight are balanced about the axis. At zero, the speaker and ballast are perfectly balanced; as the wobble control is increased, the rotation of the speakers becomes more eccentric.
- `Separation` (`key: Separation`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the separation of the stereo field. Practically, this simulates moving the two listening points further apart as the separation knob is increased.
- `Rotor Drift` (`key: RotorFcDrift`, `id: 13`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts how close the three rotor motors are in sync with each other in speed. As each of the rotors were belt driven, there are often some differences in belt or motor wear, and it creates some subtle modulation effects between the three rotors.
- `Rotor 2 Level` (`key: Rotor2Level`, `id: 14`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the individual volume of the second rotor.
- `Rotor 3 Level` (`key: Rotor3Level`, `id: 15`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the individual volume of the third rotor.

---

## Twin Harmony

- Model key: `HD2_PitchTwinHarmonyMono`
- Model ID: `291`
- Type: Pitch
- Category: `pitch`
- Class: Pitch
- DSP usage: 4.0
- Based on: Eventide H3000
- Agoura model: No

### Parameters

- `Voice 1 Key` (`key: KeyVoice1`, `id: 1`, `type: i`): valid values `A`, `A#`, `B`, `C`, `C#`, `D`, `D#`, `E`, `F`, `F#`, `G`, `G#`; default `A`. Raw range `0` to `11`; raw default `0`. Selects the key of the Voice 1 harmony.
- `Voice 1 Scale` (`key: ScaleVoice1`, `id: 2`, `type: i`): valid values `Major`, `Minor`, `Major Pent`, `Minor Pent`, `Harm Minor`, `Melodic Minor`, `Whole Tone`, `Whole Dim`; default `Major`. Raw range `0` to `7`; raw default `0`. Selects the scale of the Voice 1 harmony.
- `Voice 1 Shift` (`key: IntervalVoice1`, `id: 3`, `type: i`): valid values `-9th`, `-8th`, `-7th`, `-6th`, `-5th`, `-4th`, `-3rd`, `-2nd`, `0`, `2nd`, `3rd`, `4th`, `5th`, `6th`, `7th`, `8th`, `9th`; default `-4th`. Raw range `-8` to `8`; raw default `-3`. Sets the interval of the Voice 1 harmony, from a 9th below to a 9th above. When set to 0, the incoming signal is doubled.
- `Voice 1 Level` (`key: LevelVoice1`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the level of the Voice 1 harmony.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the effected signal and the dry signal. At 0%, no effected signal is heard; at 100%, no dry signal is heard.
- `Voice 2 Key` (`key: KeyVoice2`, `id: 7`, `type: i`): valid values `A`, `A#`, `B`, `C`, `C#`, `D`, `D#`, `E`, `F`, `F#`, `G`, `G#`; default `A`. Raw range `0` to `11`; raw default `0`. Selects the key of the Voice 2 harmony.
- `Voice 2 Scale` (`key: ScaleVoice2`, `id: 8`, `type: i`): valid values `Major`, `Minor`, `Major Pent`, `Minor Pent`, `Harm Minor`, `Melodic Minor`, `Whole Tone`, `Whole Dim`; default `Major`. Raw range `0` to `7`; raw default `0`. Selects the scale of the Voice 2 harmony.
- `Voice 2 Shift` (`key: IntervalVoice2`, `id: 9`, `type: i`): valid values `-9th`, `-8th`, `-7th`, `-6th`, `-5th`, `-4th`, `-3rd`, `-2nd`, `0`, `2nd`, `3rd`, `4th`, `5th`, `6th`, `7th`, `8th`, `9th`; default `3rd`. Raw range `-8` to `8`; raw default `2`. Sets the interval of the Voice 2 harmony, from a 9th below to a 9th above. When set to 0, the incoming signal is doubled.
- `Voice 2 Level` (`key: LevelVoice2`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the level of the Voice 2 harmony.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Controls the overall level of the block.

---

## UK Wah 846

- Model key: `HD2_WahUKWah846Mono`
- Model ID: `290`
- Type: Wah
- Category: `wah`
- Class: Wah
- DSP usage: 2.3
- Based on: Digitech Whammy
- Agoura model: No

### Parameters

- `Position` (`key: Pedal`, `id: 1`, `type: f`): display range `0` to `100` %; default `0`. Raw range `0` to `1`; raw default `0`. Adjusts the position or frequency of the wah effect. By default, this is assigned to Expression Pedal 1. Set Min and Max below to restrict the wah's frequency sweep range.
- `Mix` (`key: Mix`, `id: 2`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the blend between the wah effect and the dry signal. At 0%, no wah effect is heard; at 100%, no dry signal is heard. If the wah effect is a bit strong, consider bringing this down a bit.
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `-60` to `6` dB; default `4`. Raw range `-60` to `6`; raw default `4`. Sets the overall level of the Wah block.

---

## Ubiquitous Vibe

- Model key: `HD2_PhaserUbiquitousVibeMono`
- Model ID: `285`
- Type: Modulation
- Category: `modulation`
- Class: Phaser
- DSP usage: 2.4
- Based on: Shin-ei Uni-Vibe
- Agoura model: No

### Parameters

- `Rate` (`key: Rate`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `2.9`. Raw range `0` to `1`; raw default `0.29`. Controls the speed or rate of the effect. When set to note values, Speed follows the system tempo.
- `Intensity` (`key: Intensity`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the depth or intensity of the effect.
- `Mode` (`key: Mode`, `id: 3`, `type: b`): valid values `Chorus`, `Vibrato`; default `Chorus`. Raw range `Off` to `On`; raw default `Off`. Selects Chorus or Vibrato mode.
- `Lamp Bias` (`key: LampBias`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the amount of current going to the original pedal's filament bulb. Lower values result in a smoother LFO sweep (closer to a sine wave); higher values result in a more dramatic LFO sweep (closer to a square wave).
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the modulation effect and the dry signal.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Adjusts the overall output level of the modulation effect

---

## VIC_FlexoVibeStereo

- Model key: `VIC_FlexoVibeStereo`
- Model ID: `256`
- Type: Modulation
- Category: `modulation`
- Class: Unknown
- DSP usage: 2.8
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## VIC_PitchBoctaverStereo

- Model key: `VIC_PitchBoctaverStereo`
- Model ID: `258`
- Type: Pitch
- Category: `pitch`
- Class: Unknown
- DSP usage: 2.9
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## Vetta Wah

- Model key: `HD2_WahVettaWahMono`
- Model ID: `319`
- Type: Wah
- Category: `wah`
- Class: Wah
- DSP usage: 1.3
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Position` (`key: Pedal`, `id: 1`, `type: f`): display range `0` to `100` %; default `0`. Raw range `0` to `1`; raw default `0`. Adjusts the position or frequency of the wah effect. By default, this is assigned to Expression Pedal 1.
- `Fc Low` (`key: FcLow`, `id: 2`, `type: f`): display range `20` to `500` Hz; default `300`. Raw range `20` to `500`; raw default `300`. Sets the low frequency cutoff of the wah filter. Along with Fc High, sets the frequency range or sweep of the wah.
- `Fc High` (`key: FcHigh`, `id: 3`, `type: f`): display range `500` to `5000` Hz; default `2300`. Raw range `500` to `5000`; raw default `2300`. Sets the high frequency cutoff of the wah filter. Along with Fc Low, sets the frequency range or sweep of the wah.
- `Mix` (`key: Mix`, `id: 4`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the blend between the wah effect and the dry signal. At 0%, no wah effect is heard; at 100%, no dry signal is heard. If the wah effect is a bit strong, consider bringing this down a bit.
- `Level` (`key: Level`, `id: 5`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Wah block.

---

## Vibe Rotary

- Model key: `HD2_RotaryVibeRotaryStereo`
- Model ID: `159`
- Type: Modulation
- Category: `modulation`
- Class: Rotary
- DSP usage: 5.5
- Based on: Fender Vibratone
- Agoura model: No

### Parameters

- `Speed` (`key: Speed`, `id: 1`, `type: b`): valid values `Slow`, `Fast`; default `Fast`. Raw range `Off` to `On`; raw default `On`. Selects Slow or Fast rotary speed. When changing values, the rotary speaker speed gradually changes, based on the RampTime value.
- `Slow Speed` (`key: SlowSpeed`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3.3`. Raw range `0` to `1`; raw default `0.33`. Sets the rotary speed when Speed is set to "Slow." When set to note values, SlowSpeed follows the system tempo.
- `Fast Speed` (`key: FastSpeed`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.3`. Raw range `0` to `1`; raw default `0.53`. Sets the rotary speed when Speed is set to "Fast." When set to note values, FastSpeed follows the system tempo.
- `Ramp Time` (`key: RampTime`, `id: 4`, `type: i`): valid values `Slow`, `Medium`, `Fast`; default `Medium`. Raw range `0` to `2`; raw default `1`. Determines how fast the rotary speed changes when Speed is changed from "Slow" to "Fast" or vice versa.
- `Drive` (`key: Drive`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Controls how much of the speaker's internal amp is overdriven. At higher values, the speaker imparts more of a gritty sound. Note that the original speaker Vibe Rotary is based on did not have an amplifier, so for the most authentic sound, leave this set to 0.0.
- `Speaker Blend` (`key: Blend`, `id: 6`, `type: f`): display range `-100` to `100` Woofer; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls how much of the woofer speaker is heard vs. the horn speaker. Normally leave this set to "Equal."
- `Mix` (`key: Mix`, `id: 7`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the blend between the rotary effect and the dry signal. At 0%, no rotary effect is heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 8`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Headroom` (`key: Headroom`, `id: 9`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Provides up to 12.0 dB of additional headroom.

---

## Weeper

- Model key: `HD2_WahWeeperMono`
- Model ID: `320`
- Type: Wah
- Category: `wah`
- Class: Wah
- DSP usage: 1.3
- Based on: BOSS PN-2
- Agoura model: No

### Parameters

- `Position` (`key: Pedal`, `id: 1`, `type: f`): display range `0` to `100` %; default `0`. Raw range `0` to `1`; raw default `0`. Adjusts the position or frequency of the wah effect. By default, this is assigned to Expression Pedal 1.
- `Fc Low` (`key: FcLow`, `id: 2`, `type: f`): display range `20` to `500` Hz; default `435`. Raw range `20` to `500`; raw default `435`. Sets the low frequency cutoff of the wah filter. Along with Fc High, sets the frequency range or sweep of the wah.
- `Fc High` (`key: FcHigh`, `id: 3`, `type: f`): display range `500` to `5000` Hz; default `1901`. Raw range `500` to `5000`; raw default `1901`. Sets the high frequency cutoff of the wah filter. Along with Fc Low, sets the frequency range or sweep of the wah.
- `Mix` (`key: Mix`, `id: 4`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the blend between the wah effect and the dry signal. At 0%, no wah effect is heard; at 100%, no dry signal is heard. If the wah effect is a bit strong, consider bringing this down a bit.
- `Level` (`key: Level`, `id: 5`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Wah block.
