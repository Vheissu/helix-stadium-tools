# All effects

Minimal upload pack covering all effect categories.

Generated from the installed Helix Stadium desktop app bundle on 2026-04-19T22:24:30.490746+00:00.

Use display values for normal user-facing answers. Use model keys, IDs, and raw ranges only when the user asks for automation or low-level control details.

Model count: 325

---

## 1 Switch Looper

- Model key: `P35_LooperHelixOneSwitchMono`
- Model ID: `825`
- Type: Looper
- Category: `looper`
- Class: Unknown
- DSP usage: 2.3
- Based on: Unknown
- Agoura model: No

### Parameters

- `Playback` (`key: Playback`, `id: 1`, `type: f`): display range `-60` to `0` dB; default `0`. Raw range `-60` to `0`; raw default `0`. Controls the level of looper playback. You may find it useful to turn this down a bit so your live guitar can be slightly louder.
- `Overdub` (`key: Overdub`, `id: 2`, `type: f`): display range `-60` to `0` dB; default `0`. Raw range `-60` to `0`; raw default `0`. Controls the level of your loop *relatively, over time* while overdubbing. For example, if Overdub is set to 90%, each time your loop repeats, its volume will be reduced by 10%, sounding quieter and quieter with each overdub pass.
- `Low Cut` (`key: lowCut`, `id: 3`, `type: f`): display range `20` to `500` Hz; default `20`. Raw range `20` to `500`; raw default `20`. Applies a low cut (high pass) filter to loop playback, letting you remove the effected signal below a certain frequency. Filtering your loop can sometimes improve the mix with your live instrument.
- `High Cut` (`key: highCut`, `id: 4`, `type: f`): display range `500` to `20000` Hz; default `20000`. Raw range `500` to `20000`; raw default `20000`. Applies a high cut (low pass) filter to loop playback, letting you remove the effected signal above a certain frequency. Filtering your loop can sometimes improve the mix with your live instrument.

---

## 10 Band Graphic

- Model key: `HD2_EQGraphic10BandMono`
- Model ID: `265`
- Type: EQ
- Category: `eq`
- Class: Graphic
- DSP usage: 1.7
- Based on: MXR 10-Band Graphic EQ
- Agoura model: No

### Parameters

- `31.25 Hz` (`key: 31p25Hz`, `id: 1`, `type: f`): display range `-15` to `15` dB; default `0`. Raw range `-15` to `15`; raw default `0`. Boost or cut up to 15.0 dB.
- `62.5 Hz` (`key: 62p5Hz`, `id: 2`, `type: f`): display range `-15` to `15` dB; default `0`. Raw range `-15` to `15`; raw default `0`. Boost or cut up to 15.0 dB.
- `125 Hz` (`key: 125Hz`, `id: 3`, `type: f`): display range `-15` to `15` dB; default `0`. Raw range `-15` to `15`; raw default `0`. Boost or cut up to 15.0 dB.
- `250 Hz` (`key: 250Hz`, `id: 4`, `type: f`): display range `-15` to `15` dB; default `0`. Raw range `-15` to `15`; raw default `0`. Boost or cut up to 15.0 dB.
- `500 Hz` (`key: 500Hz`, `id: 5`, `type: f`): display range `-15` to `15` dB; default `0`. Raw range `-15` to `15`; raw default `0`. Boost or cut up to 15.0 dB.
- `1 kHz` (`key: 1kHz`, `id: 6`, `type: f`): display range `-15` to `15` dB; default `0`. Raw range `-15` to `15`; raw default `0`. Boost or cut up to 15.0 dB.
- `2 kHz` (`key: 2kHz`, `id: 7`, `type: f`): display range `-15` to `15` dB; default `0`. Raw range `-15` to `15`; raw default `0`. Boost or cut up to 15.0 dB.
- `4 kHz` (`key: 4kHz`, `id: 8`, `type: f`): display range `-15` to `15` dB; default `0`. Raw range `-15` to `15`; raw default `0`. Boost or cut up to 15.0 dB.
- `8 kHz` (`key: 8kHz`, `id: 9`, `type: f`): display range `-15` to `15` dB; default `0`. Raw range `-15` to `15`; raw default `0`. Boost or cut up to 15.0 dB.
- `16 kHz` (`key: 16kHz`, `id: 10`, `type: f`): display range `-15` to `15` dB; default `0`. Raw range `-15` to `15`; raw default `0`. Boost or cut up to 15.0 dB.
- `Level` (`key: Level`, `id: 11`, `type: f`): display range `-15` to `15` dB; default `0`. Raw range `-15` to `15`; raw default `0`. Sets the overall level of the block.

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

## 3-Band Comp

- Model key: `HX2_Compressor3BandCompMono`
- Model ID: `38`
- Type: Dynamics
- Category: `dynamics`
- Class: 3-Band
- DSP usage: 3.2
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Ratio` (`key: Ratio`, `id: 1`, `type: i`): valid values `2:1`, `3:1`, `4:1`, `6:1`, `8:1`, `12:1`, `20:1`; default `4:1`. Raw range `0` to `6`; raw default `2`. Determines how much compression is applied to the signal once it exceeds the Threshold. Higher values mean more compression.
- `Attack` (`key: Attack`, `id: 2`, `type: f`): display range `0.1` to `200` ms; default `35`. Raw range `0.0001` to `0.2`; raw default `0.035`. Controls how quickly compression is applied once the signal exceeds the Threshold. Higher values mean a slower attack, which lets the instrument's initial transient sneak through and only compresses the sustained portion of the signal.
- `Release` (`key: Release`, `id: 3`, `type: f`): display range `50` to `2500` ms; default `200`. Raw range `0.05` to `2.5`; raw default `0.2`. Controls how quickly the signal returns to unity gain after it returns below the Threshold.
- `Lo X Freq` (`key: Lo X Freq`, `id: 4`, `type: f`): display range `20` to `1000` Hz; default `400`. Raw range `20` to `1000`; raw default `400`. Sets the crossover frequency between the Low and Mid bands.
- `Hi X Freq` (`key: Hi X Freq`, `id: 5`, `type: f`): display range `1000` to `20000` Hz; default `3000`. Raw range `1000` to `20000`; raw default `3000`. Sets the crossover frequency between the Mid and High bands.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-120` to `36` dB; default `2`. Raw range `-120` to `36`; raw default `2`. Sets the overall level of the block.
- `Lo Threshold` (`key: Lo Thresh`, `id: 7`, `type: f`): display range `-80` to `0` dB; default `-40`. Raw range `-80` to `0`; raw default `-40`. Sets the level above which compression is applied to the Low band. Lower values compress more of the signal; higher values compress only louder parts of the signal.
- `Lo Gain` (`key: Lo Gain`, `id: 8`, `type: f`): display range `-60` to `30` dB; default `3.5`. Raw range `-60` to `30`; raw default `3.5`. Adjusts the Low band's level to compensate for the reduced level that results from compression.
- `Mid Threshold` (`key: Mid Thresh`, `id: 9`, `type: f`): display range `-80` to `0` dB; default `-35`. Raw range `-80` to `0`; raw default `-35`. Sets the level above which compression is applied to the Mid band. Lower values compress more of the signal; higher values compress only louder parts of the signal.
- `Mid Gain` (`key: Mid Gain`, `id: 10`, `type: f`): display range `-60` to `30` dB; default `4`. Raw range `-60` to `30`; raw default `4`. Adjusts the Mid band's level to compensate for the reduced level that results from compression.
- `Hi Threshold` (`key: Hi Thresh`, `id: 11`, `type: f`): display range `-80` to `0` dB; default `-50`. Raw range `-80` to `0`; raw default `-50`. Sets the level above which compression is applied to the High band. Lower values compress more of the signal; higher values compress only louder parts of the signal.
- `Hi Gain` (`key: Hi Gain`, `id: 12`, `type: f`): display range `-60` to `30` dB; default `-2`. Raw range `-60` to `30`; raw default `-2`. Adjusts the High band's level to compensate for the reduced level that results from compression.

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

## ADT

- Model key: `HD2_DelayADTMono`
- Model ID: `131`
- Type: Delay
- Category: `delay`
- Class: Tape
- DSP usage: 6.5
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Delay 1` (`key: DelayDeck1`, `id: 1`, `type: f`): display range `0` to `20` ms; default `3`. Raw range `0` to `0.02`; raw default `0.003`. Adjusts the delay time of Deck 1. Delay 1 can go up to 20 ms and Delay 2 can go up to 200 ms.
- `Delay 2` (`key: DelayDeck2`, `id: 2`, `type: f`): display range `0` to `200` ms; default `50`. Raw range `0` to `0.2`; raw default `0.05`. Adjusts the delay time of Deck 2. Delay 1 can go up to 20 ms and Delay 2 can go up to 200 ms.
- `Wow/Flutter 1` (`key: WowFlutter1`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Controls how much warbly tape sound is heard from Deck 1.
- `Wow/Flutter 2` (`key: WowFlutter2`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Controls how much warbly tape sound is heard from Deck 2.
- `Saturate 1` (`key: DistDeck1`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Adds analog tape saturation to Deck 1 and at high enough settings, distortion. At lower settings, it's great for simply warming up a tone.
- `Saturate 2` (`key: DistDeck2`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Adds analog tape saturation to Deck 2 and at high enough settings, distortion. At lower settings, it's great for simply warming up a tone.
- `Deck 1 Vol` (`key: Deck1Vol`, `id: 7`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of Deck 1. Deck 2 is a bit lower than Deck 1 by default.
- `Deck 2 Vol` (`key: Deck2Vol`, `id: 8`, `type: f`): display range `-60` to `6` dB; default `-3`. Raw range `-60` to `6`; raw default `-3`. Sets the level of Deck 2. Deck 2 is a bit lower than Deck 1 by default.
- `Deck 2 Pol` (`key: Deck2Pol`, `id: 9`, `type: i`): valid values `Normal`, `Invert`; default `Normal`. Raw range `0` to `1`; raw default `0`. When set to "Invert," inverts the polarity of Deck 2.
- `Mod Rate` (`key: ModRate`, `id: 10`, `type: f`): display range `0.1` to `8` Hz; default `0.5`. Raw range `0.1` to `8`; raw default `0.5`. Controls the rate or speed of modulation applied to Deck 2.
- `Mod Depth` (`key: ModDepth`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Controls the depth or amount of modulation applied to Deck 2.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Tape Speed` (`key: TapeSpeed`, `id: 13`, `type: i`): valid values `7.5 ips`, `15 ips`, `30 ips`; default `15 ips`. Raw range `0` to `2`; raw default `1`. Changes both the rate of the modulation applied by the WowFluttr control and the filtering response of the analog tape emulation.
- `Texture` (`key: Texture`, `id: 14`, `type: f`): display range `0` to `10` unitless; default `6.25`. Raw range `0` to `1`; raw default `0.625`. Adjusts the amount of the NAB tape EQ in the simulated tape path. When Saturation is set to 0.0, the texture is invisible. When Saturation is turned up, the texture will affect the tightness (or looseness) of the distortion.
- `Low Cut` (`key: LowCut`, `id: 15`, `type: f`): display range `19.9` to `1000` Off; default `40`. Raw range `19.9` to `1000`; raw default `40`. Applies a low cut (high pass) filter to the decks, letting you remove the effected signal below a certain frequency.
- `High Cut` (`key: HighCut`, `id: 16`, `type: f`): display range `500` to `20100` Hz; default `12000`. Raw range `500` to `20100`; raw default `12000`. Applies a high cut (low pass) filter to the decks, letting you remove the effected signal above a certain frequency.
- `Envelope Thresh` (`key: Threshold`, `id: 17`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Sets the level above which engages the envelope. When on, picking harder can impart very slight pitch fluctuations by tweaking Deck 2's delay. Subtle, but fun.

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

## Acoustic Sim

- Model key: `L6SPB_AcousGtrSimMono`
- Model ID: `384`
- Type: EQ
- Category: `eq`
- Class: Acoustic Sim
- DSP usage: 2.7
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Mode` (`key: Mode`, `id: 1`, `type: i`): valid values `Standard`, `Jumbo`, `Enhanced`, `Piezo`; default `Standard`. Raw range `0` to `3`; raw default `0`. Selects one of four acoustic guitar sounds: Standard is a traditional acoustic guitar, Jumbo is larger and fuller, Enhanced has a more prominent attack for cutting through a mix, and Piezo approximates the sound of a piezo pickup installed on the guitar.
- `Body` (`key: Body`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adds body resonance, which can provide additional fullness or fatness.
- `Top` (`key: Top`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Accentuates higher end string attack and harmonics.
- `Shimmer` (`key: Shimmer`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `2`. Raw range `0` to `1`; raw default `0.2`. Imparts some motion to the harmonics, reminiscent of how a string's vibration tends to affect the other strings.
- `Level` (`key: Level`, `id: 5`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Adriatic Delay

- Model key: `HD2_DelayAdriaticDelayMono`
- Model ID: `130`
- Type: Delay
- Category: `delay`
- Class: Analog
- DSP usage: 3.8
- Based on: BOSS DM-2 w/ Adrian Mod
- Agoura model: No

### Parameters

- `Time` (`key: Time`, `id: 1`, `type: f`): display range `20` to `1800` ms; default `400`. Raw range `0.02` to `1.8`; raw default `0.4`. Adjusts the length of time before the first repeat. When set to note values, Time follows the system tempo.
- `Feedback` (`key: Feedback`, `id: 2`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the number of delay repeats. When set to 0%, only one repeat is heard. At high values, the Delay may begin to self-oscillate and squeal (perhaps in a good way).
- `Noise` (`key: Noise`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `3.6`. Raw range `0` to `1`; raw default `0.36`. Adds subtle graininess to the repeats, which is inherent in many bucket brigade delays.
- `BBD Size` (`key: BBD Size`, `id: 4`, `type: i`): valid values `1024`, `2048`, `4096`, `8192`; default `4096`. Raw range `0` to `3`; raw default `2`. Sets the clock frequency of the bucket brigade device. Higher values provide a wider frequency response.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the delay repeats and the dry signal. At 0%, no repeats are heard; at 100%, no dry signal is heard. If Dry Thru is off, you'll still hear the tape delay's circuitry when Mix is set to 0%.
- `Rate` (`key: Rate`, `id: 7`, `type: f`): display range `0.1` to `8` Hz; default `0.3`. Raw range `0.1` to `8`; raw default `0.3`. Controls the speed or rate of the pitch modulation applied to the repeats.
- `Depth` (`key: Depth`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `2.2`. Raw range `0` to `1`; raw default `0.22`. Controls the depth or intensity of the pitch modulation applied to the repeats.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Headroom` (`key: Headroom`, `id: 9`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Some delay pedals' internal signal paths exhibit a bit of grit, especially when placed after a high-gain amp block. Negative values increase the perceived amount of grit; positive values clean things up a bit.

---

## Adriatic Swell

- Model key: `HD2_DelaySwellAdriaticMono`
- Model ID: `118`
- Type: Delay
- Category: `delay`
- Class: Analog
- DSP usage: 4.0
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Time` (`key: Time`, `id: 1`, `type: f`): display range `20` to `1800` ms; default `400`. Raw range `0.02` to `1.8`; raw default `0.4`. Adjusts the length of time before the first repeat. When set to note values, Time follows the system tempo.
- `Feedback` (`key: Feedback`, `id: 2`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Feedback controls the number of delay repeats. When set to 0%, only one repeat is heard. At high values, the Delay may begin to self-oscillate and squeal (perhaps in a good way).
- `Noise` (`key: Noise`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `3.6`. Raw range `0` to `1`; raw default `0.36`. Adds subtle graininess to the repeats, which is inherent in many bucket brigade delays.
- `BBD Size` (`key: BBD Size`, `id: 4`, `type: i`): valid values `1024`, `2048`, `4096`, `8192`; default `4096`. Raw range `0` to `3`; raw default `2`. Sets the clock frequency of the bucket brigade device. Higher values provide a wider frequency response.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the delay repeats and the dry signal. At 0%, no repeats are heard; at 100%, no dry signal is heard.
- `Rate` (`key: Rate`, `id: 7`, `type: f`): display range `0.1` to `8` Hz; default `0.3`. Raw range `0.1` to `8`; raw default `0.3`. Controls the speed or rate of the pitch modulation applied to the repeats.
- `Depth` (`key: Depth`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `2.2`. Raw range `0` to `1`; raw default `0.22`. Controls the depth or intensity of the pitch modulation applied to the repeats.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Headroom` (`key: Headroom`, `id: 9`, `type: f`): display range `-12` to `12` dB; default `0.5`. Raw range `-12` to `12`; raw default `0.5`. Some delay pedals' internal signal paths exhibit a bit of grit, especially when placed after a high-gain amp block. Negative values increase the perceived amount of grit; positive values clean things up a bit.
- `Threshold` (`key: Threshold`, `id: 10`, `type: f`): display range `-96` to `0` dB; default `-60`. Raw range `-96` to `0`; raw default `-60`. Sets the level below which the volume swell resets.
- `Attack` (`key: Attack`, `id: 11`, `type: f`): display range `100` to `5000` ms; default `1000`. Raw range `0.1` to `5`; raw default `1`. Sets the ramp time for the volume swell applied to the dry signal, and therefore, any delay repeats.

---

## Alpaca Rouge

- Model key: `HD2_DistAlpacaRougeMono`
- Model ID: `380`
- Type: Distortion
- Category: `distortion`
- Class: Distortion
- DSP usage: 3.6
- Based on: Carvin VLD1 Legacy Drive (Hi Gain Channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3.4`. Raw range `0` to `1`; raw default `0.34`. Controls the amount of distortion applied to the signal.
- `High Cut` (`key: HiCut`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Lower values apply more cut, which makes the sound a bit darker. Higher values apply less cut, which makes the sound a bit brighter.
- `Level` (`key: Volume`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Sets the overall level of the block.

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

## Ampeg Opto Comp

- Model key: `HX2_CompressorOptoCompMono`
- Model ID: `32`
- Type: Dynamics
- Category: `dynamics`
- Class: Compress
- DSP usage: 4.0
- Based on: Ampeg Opto Comp Compressor
- Agoura model: No

### Parameters

- `Compress` (`key: Compression`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much level the compressor detector circuit receives. More level = more compression. (Ampeg Opto Comp has a fixed threshold and ratio.)
- `Release` (`key: Release`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Controls how quickly the effect returns to unity gain after the input signal falls below the threshold. At 0.0, the release is 75 ms; at 10.0, the release is around 600 ms.
- `Mix` (`key: Blend`, `id: 3`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the blend between the compressed and dry signals. At 0%, no compressed signal is heard; at 100%, no dry signal is heard. Values in between provide parallel compression.
- `Level` (`key: Level`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Sets the overall level of the block.

---

## Ampeg Scrambler

- Model key: `HD2_DistAmpegScramblerODMono`
- Model ID: `372`
- Type: Distortion
- Category: `distortion`
- Class: Overdrive
- DSP usage: 6.7
- Based on: Ampeg Scrambler Bass Overdrive
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `7.6`. Raw range `0` to `1`; raw default `0.76`. Controls the amount of overdrive applied to the signal.
- `Blend` (`key: Blend`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.3`. Raw range `0` to `1`; raw default `0.63`. Blends the overdriven signal with the dry signal.
- `Treble` (`key: Treble`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.2`. Raw range `0` to `1`; raw default `0.42`. Controls the high frequency EQ of the overdrive.
- `Level` (`key: Level`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.6`. Raw range `0` to `1`; raw default `0.66`. Sets the overall level of the block.

---

## Arbitrator Fuzz

- Model key: `HD2_DistArbitratorFuzzMono`
- Model ID: `308`
- Type: Distortion
- Category: `distortion`
- Class: Fuzz
- DSP usage: 2.5
- Based on: Arbiter Fuzz Face
- Agoura model: No

### Parameters

- `Fuzz` (`key: Fuzz`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `9`. Raw range `0` to `1`; raw default `0.9`. Controls the amount of fuzz applied to the signal.
- `Level` (`key: Level`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Sets the overall level of the block.

---

## Asheville Pattrn

- Model key: `HD2_FilterAshevillePattrnMono`
- Model ID: `375`
- Type: Filter
- Category: `filter`
- Class: Filter
- DSP usage: 5.7
- Based on: Analogman King of Tone
- Agoura model: No

### Parameters

- `Rate` (`key: Rate`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the rate or speed of the filter step sequence. Has no affect if Pattern is set to "Off."
- `Pattern` (`key: Pattern`, `id: 2`, `type: i`): valid values `Off`, `Stair`, `Cascade`, `Cross`, `Brownian`, `Random`, `Band Exp`, `Down/Up`, `Pulsar`, `Grow/Shrink`, `Dbl Cascade`, `Rhythmicon`, `Double X`, `Perpetual`, `Pyramid`, `Double Dip`, `Inverted`, `Prime`, `Folded`, `Breakbeat`, `Big Beat`; default `Brownian`. Raw range `0` to `20`; raw default `4`. Selects one of 20 different filter sequence patterns. When set to "Off," the LFO can be used.
- `Envelope` (`key: Envelope`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the envelope of all 8 filters. Low values result in choppy steps with a fast attack and slower release. High values result in choppy steps with a slower attack and fast release. Values in the middle result in smoother steps with a noticeably slower attack and release, almost like a tremolo. Has no affect if Pattern is set to "Off."
- `Voice` (`key: Voice`, `id: 4`, `type: b`): valid values `Bass`, `Mid`; default `Mid`. Raw range `Off` to `On`; raw default `On`. Determines whether the 8 filters' fixed frequencies are optimized for Bass ("Bass") or Guitar ("Mid").
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the balance between the filtered and dry signals. At 0%, no filtered signal is heard; at 100%, no dry signal is heard.
- `Output` (`key: Output`, `id: 6`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Sets the overall output level of the effect.
- `Drive` (`key: Drive`, `id: 7`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the input level into the filter section. Higher settings can overdrive the filters, resulting in a bit of (perhaps pleasing) distortion.
- `Direction` (`key: Direction`, `id: 8`, `type: b`): valid values `Forward`, `Reverse`; default `Forward`. Raw range `Off` to `On`; raw default `Off`. When on, reverses direction of the filter step sequence pattern. Has no affect if Pattern is set to "Off."
- `LFO` (`key: LFO`, `id: 9`, `type: f`): display range `0` to `100` %; default `0`. Raw range `0` to `1`; raw default `0`. Controls the speed of the LFO that . Has no affect unless Pattern is set to "Off."
- `Level 1` (`key: Level1`, `id: 11`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the level of the lowpass filter fixed at 110 Hz (Voice set to "Bass") or 200 Hz (Voice set to "Mid").
- `Level 2` (`key: Level2`, `id: 12`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the level of the resonant filter fixed at 160 Hz (Voice set to "Bass") or 300 Hz (Voice set to "Mid").
- `Level 3` (`key: Level3`, `id: 13`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the level of the resonant filter fixed at 240 Hz (Voice set to "Bass") or 450 Hz (Voice set to "Mid").
- `Level 4` (`key: Level4`, `id: 14`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the level of the resonant filter fixed at 350 Hz (Voice set to "Bass") or 675 Hz (Voice set to "Mid").
- `Level 5` (`key: Level5`, `id: 15`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the level of the resonant filter fixed at 525 Hz (Voice set to "Bass") or 1 kHz (Voice set to "Mid").
- `Level 6` (`key: Level6`, `id: 16`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the level of the resonant filter fixed at 775 Hz (Voice set to "Bass") or 1.5 kHz (Voice set to "Mid").
- `Level 7` (`key: Level7`, `id: 17`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the level of the resonant filter fixed at 1.2 kHz (Voice set to "Bass") or 2.2 kHz (Voice set to "Mid").
- `Level 8` (`key: Level8`, `id: 18`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the level of the resonant filter fixed at 1.8 kHz (Voice set to "Bass") or 3.4 kHz (Voice set to "Mid").

---

## Autofilter

- Model key: `HX2_FilterAutoFilterMono`
- Model ID: `18`
- Type: Filter
- Category: `filter`
- Class: Filter
- DSP usage: 1.6
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Mode` (`key: Mode`, `id: 1`, `type: i`): valid values `Low Pass`, `Band Pass`, `High Pass`; default `Band Pass`. Raw range `0` to `2`; raw default `1`. Selects the type of filter effect (Low Pass, Band Pass, or High Pass).
- `Filter Gain` (`key: FilterGain`, `id: 2`, `type: f`): display range `0` to `36` dB; default `18`. Raw range `0` to `36`; raw default `18`. Controls the amount of boost or cut applied to the filtered frequencies.
- `Filter Q` (`key: FilterQ`, `id: 3`, `type: f`): display range `1` to `10` unitless; default `7.5`. Raw range `1` to `10`; raw default `7.5`. Controls the resonance or width of the frequency band affected by the filter.
- `Sensitivity` (`key: Sens`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Determines how Autofilter responds to your playing dynamics. Lower values are less sensitive to pick attack; higher values are more sensitive.
- `Attack` (`key: Attack`, `id: 5`, `type: f`): display range `5` to `2000` ms; default `20`. Raw range `0.005` to `2`; raw default `0.02`. Controls how long it takes for the filter to reach its high frequency (determined by Sensitivity and your playing dynamics) once the transient is detected. Lower values are better for funky rhythmic playing; higher values are better for slow filter sweeps and special effects.
- `Decay` (`key: Decay`, `id: 6`, `type: f`): display range `5` to `3000` ms; default `350`. Raw range `0.005` to `3`; raw default `0.35`. Controls how long it takes for the filter to return to its original cutoff frequency after the Attack stage.
- `Frequency` (`key: Frequency`, `id: 7`, `type: f`): display range `20` to `1000` Hz; default `50`. Raw range `20` to `1000`; raw default `50`. Sets the initial filter frequency when no input signal is detected.
- `Freq Depth` (`key: FreqDepth`, `id: 8`, `type: f`): display range `0` to `10000` Hz; default `3500`. Raw range `0` to `10000`; raw default `3500`. Sets the amount of frequency change. If FreqDepth's value is lower than Frequency's value, the filter frequency remains static.
- `Direction` (`key: Direction`, `id: 9`, `type: b`): valid values `Down`, `Up`; default `Up`. Raw range `Off` to `On`; raw default `On`. Determines whether playing dynamics push the filter frequency higher or lower.
- `Mix` (`key: Mix`, `id: 10`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the balance between the filtered and dry signals. At 0%, no filtered signal is heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 11`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Autoswell

- Model key: `HX2_CompressorAutoSwellMono`
- Model ID: `37`
- Type: Dynamics
- Category: `dynamics`
- Class: Swell
- DSP usage: 2.0
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Threshold` (`key: Threshold`, `id: 1`, `type: f`): display range `-100` to `0` dB; default `-70`. Raw range `-100` to `0`; raw default `-70`. Sets the level above which a swell (fade in) is triggered. To trigger another swell, the signal must drop below this level and then exceed it again.
- `Release Offset` (`key: Rel Offset`, `id: 2`, `type: f`): display range `-40` to `40` dB; default `5`. Raw range `-40` to `40`; raw default `5`. Determines the behavior of the swell's Decay (fade out), relative to the Threshold. When set to 0.0, Attack and Decay have the same Threshold. Negative values cause the Decay to happen immediately after the Attack. Positive values let you continue to play after the Attack stage, preventing the Decay.
- `Attack` (`key: Attack`, `id: 3`, `type: f`): display range `100` to `5000` ms; default `400`. Raw range `0.1` to `5`; raw default `0.4`. Controls how long the swell fades in once the signal exceeds the Threshold.
- `Decay` (`key: Decay`, `id: 4`, `type: f`): display range `1` to `5000` ms; default `15`. Raw range `0.001` to `5`; raw default `0.015`. Controls how long the swell fades out.
- `Taper` (`key: Taper`, `id: 5`, `type: b`): valid values `Linear`, `Logarithmic`; default `Logarithmic`. Raw range `Off` to `On`; raw default `On`. Determines the shape of the Attack (fade in) and Decay (fade out) curves-Linear or Logarithmic.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `36` dB; default `0`. Raw range `-60` to `36`; raw default `0`. Sets the overall level of the block.

---

## Ballistic Fuzz

- Model key: `HD2_DistBallisticFuzzMono`
- Model ID: `387`
- Type: Distortion
- Category: `distortion`
- Class: Fuzz
- DSP usage: 6.2
- Based on: Euthymia ICBM Fuzz
- Agoura model: No

### Parameters

- `Sustain` (`key: Sustain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sustain and fuzz applied to the signal.
- `Tone` (`key: Tone`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the overall tonal balance of the fuzz. Lower values are darker and higher values are brighter.
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Sets the overall level of the block.

---

## Bighorn Fuzz

- Model key: `HD2_DistRamsHeadMono`
- Model ID: `383`
- Type: Distortion
- Category: `distortion`
- Class: Fuzz
- DSP usage: 4.0
- Based on: â73 Electro-Harmonix Ramâs Head Big Muff Pi
- Agoura model: No

### Parameters

- `Sustain` (`key: Sustain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sustain and fuzz applied to the signal.
- `Tone` (`key: Tone`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the overall tonal balance of the fuzz. Lower values are darker and higher values are brighter.
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Sets the overall level of the block.

---

## Bitcrusher

- Model key: `HD2_DistBitcrusherMono`
- Model ID: `321`
- Type: Distortion
- Category: `distortion`
- Class: Bitcrusher
- DSP usage: 2.6
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `48` dB; default `0`. Raw range `0` to `48`; raw default `0`. Controls the amount of distortion applied to the signal.
- `Bit Depth` (`key: BitDepth`, `id: 2`, `type: f`): display range `1` to `24` unitless; default `8`. Raw range `1` to `24`; raw default `8`. Lowers the bit depth of the block for a grungier sound. For more transparent results, set to 24 bits.
- `Sample Rate` (`key: SampleRate`, `id: 3`, `type: f`): display range `100` to `48000` Hz; default `18000`. Raw range `100` to `48000`; raw default `18000`. Lowers the sample rate of the block for a grungier, more vintage digital sound. For more transparent results, set to 48kHz.
- `Low Cut` (`key: LowCut`, `id: 4`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (or high pass) filter to the block, letting you remove the effected signal below a certain frequency.
- `High Cut` (`key: HighCut`, `id: 5`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (or low pass) filter to the block, letting you remove the effected signal above a certain frequency.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-120` to `6` dB; default `0`. Raw range `-120` to `6`; raw default `0`. Sets the overall level of the block.
- `Mix` (`key: Mix`, `id: 7`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the blend between the affected signal and the dry signal. At 0%, no effected signal is heard; at 100%, no dry signal is heard.
- `Open Threshold` (`key: OpenThreshold`, `id: 8`, `type: f`): display range `-96` to `0` dB; default `-70`. Raw range `-96` to `0`; raw default `-70`. Sets the level above which the built-in noise gate "opens," or passes signal through.
- `Close Threshold` (`key: CloseThreshold`, `id: 9`, `type: f`): display range `-96` to `0` dB; default `-70`. Raw range `-96` to `0`; raw default `-70`. Sets the level below which the built-in noise gate "closes," or stops signal from passing through.
- `Hold Time` (`key: HoldTime`, `id: 10`, `type: f`): display range `10` to `800` ms; default `10`. Raw range `0.01` to `0.8`; raw default `0.01`. Adjusts the length of time after the signal drops below the Close threshold before it is gated. Increase Hold Time if your playing is chopped off too soon.
- `Decay` (`key: Decay`, `id: 11`, `type: f`): display range `10` to `4000` ms; default `10`. Raw range `0.01` to `4`; raw default `0.01`. Controls the length of time it takes for the open noise gate to close once the signal drops below the Close level/threshold.

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

## Bucket Brigade

- Model key: `HD2_DelayBucketBrigadeMono`
- Model ID: `128`
- Type: Delay
- Category: `delay`
- Class: Analog
- DSP usage: 3.5
- Based on: BOSS DM-2
- Agoura model: No

### Parameters

- `Time` (`key: Time`, `id: 1`, `type: f`): display range `20` to `300` ms; default `238`. Raw range `0.02` to `0.3`; raw default `0.238`. Adjusts the length of time before the first repeat. When set to note values, Time follows the system tempo. IMPORTANT! The original pedal's delay time was limited to 300 ms, so depending on the tempo, your repeats may appear twice as fast. For longer repeat times, consider using Adriatic Delay.
- `Feedback` (`key: Feedback`, `id: 2`, `type: f`): display range `0` to `100` %; default `43`. Raw range `0` to `1`; raw default `0.43`. Controls the number of delay repeats. When set to 0%, only one repeat is heard. At high values, the Delay may begin to self-oscillate and squeal (perhaps in a good way).
- `Noise` (`key: Noise`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `2.8`. Raw range `0` to `1`; raw default `0.28`. Adds subtle graininess to the repeats, which is inherent in many bucket brigade delays.
- `Mix` (`key: Mix`, `id: 4`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the delay repeats and the dry signal. At 0%, no repeats are heard; at 100%, no dry signal is heard. If Dry Thru is off, you'll still hear the tape delay's circuitry when Mix is set to 0%.
- `Level` (`key: Level`, `id: 5`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Headroom` (`key: Headroom`, `id: 6`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Some delay pedals' internal signal paths exhibit a bit of grit, especially when placed after a high-gain amp block. Negative values increase the perceived amount of grit; positive values clean things up a bit.

---

## Cali Q Graphic

- Model key: `HD2_CaliQMono`
- Model ID: `331`
- Type: EQ
- Category: `eq`
- Class: Graphic
- DSP usage: 1.9
- Based on: MESA/Boogie Mark IV Graphic EQ
- Agoura model: No

### Parameters

- `80Hz` (`key: 80Hz`, `id: 1`, `type: f`): display range `-13.75` to `13.25` dB; default `0`. Raw range `-13.75` to `13.25`; raw default `0`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `240Hz` (`key: 240Hz`, `id: 2`, `type: f`): display range `-13.25` to `13.25` dB; default `0`. Raw range `-13.25` to `13.25`; raw default `0`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `750Hz` (`key: 750Hz`, `id: 3`, `type: f`): display range `-13.25` to `13.25` dB; default `0`. Raw range `-13.25` to `13.25`; raw default `0`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `2200Hz` (`key: 2200Hz`, `id: 4`, `type: f`): display range `-9.625` to `9.5` dB; default `0`. Raw range `-9.625` to `9.5`; raw default `0`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `6600Hz` (`key: 6600Hz`, `id: 5`, `type: f`): display range `-9.625` to `9.5` dB; default `0`. Raw range `-9.625` to `9.5`; raw default `0`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-15` to `15` dB; default `0`. Raw range `-15` to `15`; raw default `0`. Sets the overall level of the block.

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

## Clawthorn Drive

- Model key: `HD2_DistClawthornDriveMono`
- Model ID: `334`
- Type: Distortion
- Category: `distortion`
- Class: Distortion
- DSP usage: 5.5
- Based on: Wounded Paw Battering Ram
- Agoura model: No

### Parameters

- `OD Gain` (`key: ODGain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.4`. Raw range `0` to `1`; raw default `0.44`. Controls the amount of overdrive applied to the signal.
- `OD Tone` (`key: ODTone`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the overall tonal balance of the overdrive.
- `OD Level` (`key: ODLevel`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Controls the level of the overdrive output.
- `Low Boost` (`key: ODLowBoost`, `id: 4`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. Turns a low boost for the overdrive on and off.
- `Fuzz` (`key: Fuzz`, `id: 5`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. Turns the fuzz portion of the circuit on and off.
- `Fuzz Oct` (`key: FuzzOct`, `id: 6`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. When on, changes the fuzz into an octave up fuzz.
- `Fuzz Gain` (`key: FuzzGain`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of fuzz applied to the signal.
- `Fuzz Tone` (`key: FuzzTone`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the tone of the fuzz from cutting the treble (at 0.0) to flat (5.0) to treble boost (10.0).
- `Fuzz Level` (`key: FuzzLevel`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `2`. Raw range `0` to `1`; raw default `0.2`. Controls the level of the fuzz output.

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

## Compulsive Drive

- Model key: `HD2_DistCompulsiveDriveMono`
- Model ID: `305`
- Type: Distortion
- Category: `distortion`
- Class: Distortion
- DSP usage: 2.1
- Based on: Fulltone OCD
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.6`. Raw range `0` to `1`; raw default `0.66`. Controls the amount of distortion applied to the signal.
- `Tone` (`key: Tone`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the overall tonal balance of the distortion. Lower values are darker and higher values are brighter.
- `Peak Type` (`key: LPHP`, `id: 3`, `type: b`): valid values `Low`, `High`; default `Low`. Raw range `Off` to `On`; raw default `Off`. Low is more transparent, and better for a clean boost. High has more distortion, volume, and exhibits a slight bump in the midrange.
- `Version` (`key: Version`, `id: 4`, `type: b`): valid values `V2`, `V4`; default `V2`. Raw range `Off` to `On`; raw default `Off`. Selects which version of the original pedal to emulate--V2 or V4. V4 has a slight upper mid boost and a bit more sustain.
- `Level` (`key: Level`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the output level of the distortion.

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

## Cosmos Echo

- Model key: `HD2_DelayCosmosEchoMono`
- Model ID: `127`
- Type: Delay
- Category: `delay`
- Class: Tape
- DSP usage: 6.3
- Based on: Roland RE-201 Space Echo
- Agoura model: No

### Parameters

- `Time` (`key: Time`, `id: 1`, `type: f`): display range `150` to `2000` ms; default `600`. Raw range `0.15` to `2`; raw default `0.6`. Adjusts the delay time of tape head 3. Cosmos Echo has a maximum delay length of 2 seconds, with the delay time divided evenly between the 3 tape heads. So if Time is set to 1.500 seconds, tape head 1's time is 500 ms (1500 / 3 = 500). When set to note values, Time follows the system tempo.
- `Ramp` (`key: Ramp`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls how fast the tape speed changes when adjusting the Time parameter. Ramp has no affect on the signal except when Time is being adjusted.
- `Feedback` (`key: Feedback`, `id: 3`, `type: f`): display range `0` to `100` %; default `40`. Raw range `0` to `1`; raw default `0.4`. Controls the number of delay repeats for all four tape heads. When set to 0%, only one repeat is heard. At high values, the Delay may begin to self-oscillate and squeal (perhaps in a good way).
- `Wow/Flutter` (`key: WowFlutter`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much warbly tape sound is heard. Lower values result in the sound of a tape echo in pristine condition; higher values result in the sound of a tape echo that may have seen one too many trips in the back of a van.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the delay repeats and the dry signal. At 0%, no repeats are heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Headroom` (`key: Headroom`, `id: 7`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Some delay units' internal signal paths exhibit a bit of grit, especially when placed after a high-gain amp block. Negative values increase the perceived amount of grit; positive values clean things up a bit.
- `Mode` (`key: Mode`, `id: 8`, `type: i`): valid values `Head 1`, `Head 2`, `Head 3`, `Head 1 3`, `Head 2 3`, `Head 1 2 3`; default `Head 2 3`. Raw range `0` to `5`; raw default `4`. Determines which combination of up to three tape heads is active. Head 3 reflects the full delay time (set with the Time parameter). Head 1's time is 1/3 that of Head 3, and Head 2's time is 2/3 that of Head 3.
- `Bass` (`key: Bass`, `id: 9`, `type: f`): display range `-18` to `18` dB; default `0`. Raw range `-18` to `18`; raw default `0`. Controls the low frequency EQ applied to the repeats.
- `Treble` (`key: Treble`, `id: 10`, `type: f`): display range `-18` to `18` dB; default `0`. Raw range `-18` to `18`; raw default `0`. Controls the high frequency EQ applied to the repeats.
- `FB Tone` (`key: FBTone`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `3.8`. Raw range `0` to `1`; raw default `0.38`. Determines how the frequency bandwidth of the repeats changes over time, particularly when Feedback is set high. Lower values gradually roll off more of the highs, approximating the behavior of older tape. Higher values maintain more high end for more repeats, like new tape fresh out of the box.
- `Splice` (`key: Splice`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Controls the level of the tape splice. Like the original unit, Cosmos Echo uses virtual tape with ends that are spliced together. When this spliced area of the tape travels over the heads, a slight warble can be heard. Time also affects how frequently the tape splice occurs.
- `Dry Thru` (`key: DryThru`, `id: 13`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When off, the dry signal is routed through the tape delay's circuitry (even with Mix set to 0%), which can add a bit of warmth and grit. When on, the dry signal bypasses the delay's circuitry.

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

## Crisscross

- Model key: `HD2_DelayCrissCrossMono`
- Model ID: `126`
- Type: Delay
- Category: `delay`
- Class: Digital
- DSP usage: 4.7
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Time A` (`key: TimeA`, `id: 1`, `type: f`): display range `0` to `2000` ms; default `557`. Raw range `0` to `2`; raw default `0.557`. Adjusts the length of time before the first repeat of delay line A. When set to note values, Time follows the system tempo.
- `Time B` (`key: TimeB`, `id: 2`, `type: f`): display range `0` to `2000` ms; default `337`. Raw range `0` to `2`; raw default `0.337`. Adjusts the length of time before the first repeat of delay line B. When set to note values, Time follows the system tempo.
- `Feedback A` (`key: FeedbackA`, `id: 3`, `type: f`): display range `0` to `100` %; default `55.0`. Raw range `0` to `1`; raw default `0.55`. Controls the number of repeats for delay line A. When set to 0%, only one repeat is heard.
- `Feedback B` (`key: FeedbackB`, `id: 4`, `type: f`): display range `0` to `100` %; default `70`. Raw range `0` to `1`; raw default `0.7`. Controls the number of repeats for delay line B. When set to 0%, only one repeat is heard.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `40`. Raw range `0` to `1`; raw default `0.4`. Controls the blend between the delay repeats and the dry signal. At 0%, no repeats are heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Crossfeed` (`key: Crossfeed`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of the A delay line fed back into the B delay line and vice versa.
- `Headroom` (`key: Headroom`, `id: 8`, `type: f`): display range `-12` to `12` dB; default `12`. Raw range `-12` to `12`; raw default `12`. Some delay pedals' internal signal paths exhibit a bit of grit, especially when placed after a high-gain amp block. Negative values increase the perceived amount of grit; positive values clean things up a bit.
- `Mod Rate` (`key: ModRate`, `id: 9`, `type: f`): display range `0.1` to `10` Hz; default `0.75`. Raw range `0.1` to `10`; raw default `0.75`. Controls the rate or speed of modulation.
- `Mod Depth` (`key: ModDepth`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Controls the depth or amount of modulation.
- `Shape` (`key: Shape`, `id: 11`, `type: i`): valid values `Sine`, `Triangle`; default `Triangle`. Raw range `2` to `3`; raw default `3`. Selects the modulation's wave shape (Sine or Triangle).
- `Phase` (`key: Phase`, `id: 12`, `type: i`): valid values `0`, `90`, `180`; default `90`. Raw range `0` to `2`; raw default `1`. Determines the modulation's phase relationship between the two delay lines. At 0, the delay lines modulate together; at 180, modulation is inverted from one another.
- `Bit Depth` (`key: BitDepth`, `id: 13`, `type: i`): valid values `6`, `8`, `10`, `11`, `12`, `14`, `16`, `24`; default `12`. Raw range `0` to `7`; raw default `4`. Lowers the bit depth of the delay repeats for a grungier sound. For more transparent results, set to 24 bits.
- `Sample Rate` (`key: SampleRate`, `id: 14`, `type: i`): valid values `8 kHz`, `11.025 kHz`, `12 kHz`, `16 kHz`, `22.05 kHz`, `24 kHz`, `44.1 kHz`, `48 kHz`; default `16 kHz`. Raw range `0` to `7`; raw default `3`. Lowers the sample rate of the delay repeats for a grungier, more vintage digital sound. For more transparent results, set to 48kHz.
- `Low Cut` (`key: LowCut`, `id: 15`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter to the repeats, letting you remove the effected signal below a certain frequency.
- `High Cut` (`key: HighCut`, `id: 16`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (low pass) filter to the repeats, letting you remove the effected signal above a certain frequency.

---

## Dark Dove Fuzz

- Model key: `HD2_DistDarkDoveFuzzMono`
- Model ID: `410`
- Type: Distortion
- Category: `distortion`
- Class: Fuzz
- DSP usage: 4.9
- Based on: Electro-Harmonix Russian Big Muff Pi
- Agoura model: No

### Parameters

- `Sustain` (`key: Sustain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of fuzz applied to the signal.
- `Tone` (`key: Tone`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the overall tonal balance of the fuzz. Lower values are darker and higher values are brighter.
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Sets the overall output level of the block.

---

## Deez One Mod

- Model key: `HD2_DistDeezOneModMono`
- Model ID: `370`
- Type: Distortion
- Category: `distortion`
- Class: Distortion
- DSP usage: 4.0
- Based on: BOSS DS-1 Distortion (Keeley Electronics modded)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.3`. Raw range `0` to `1`; raw default `0.63`. Controls the amount of distortion applied to the signal.
- `Tone` (`key: Tone`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.2`. Raw range `0` to `1`; raw default `0.62`. Controls the overall tonal balance of the distortion. Lower values are darker and higher values are brighter.
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Sets the overall level of the block.
- `Clipping` (`key: Clipping`, `id: 4`, `type: b`): valid values `Symmetric`, `Asymmetric`; default `Asymmetric`. Raw range `Off` to `On`; raw default `On`. Selects the type of clipping. Symmetric results in a bit more compression, sustain, and distortion. Asymmetric results in a bit more clarity and less compression.

---

## Deez One Vintage

- Model key: `HD2_DistDeezOneVintageMono`
- Model ID: `369`
- Type: Distortion
- Category: `distortion`
- Class: Distortion
- DSP usage: 4.3
- Based on: BOSS DS-1 Distortion (Made-in-Japan)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the amount of distortion applied to the signal.
- `Tone` (`key: Tone`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the overall tonal balance of the distortion. Lower values are darker and higher values are brighter.
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Sets the overall level of the block.

---

## Deluxe Comp

- Model key: `HX2_CompressorDeluxeCompMono`
- Model ID: `33`
- Type: Dynamics
- Category: `dynamics`
- Class: Compress
- DSP usage: 2.1
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Threshold` (`key: Threshold`, `id: 1`, `type: f`): display range `-60` to `0` dB; default `-37.1`. Raw range `-60` to `0`; raw default `-37.1`. Sets the level above which compression is applied. Lower values compress more of the signal; higher values compress only louder parts of the signal.
- `Ratio` (`key: Ratio`, `id: 2`, `type: i`): valid values `2:1`, `3:1`, `4:1`, `6:1`, `10:1`, `20:1`; default `6:1`. Raw range `0` to `5`; raw default `3`. Determines how much compression is applied to the signal once it exceeds the Threshold. Higher values mean more compression.
- `Attack` (`key: Attack`, `id: 3`, `type: f`): display range `0.1` to `200` ms; default `38`. Raw range `0.0001` to `0.2`; raw default `0.038`. Controls how quickly compression is applied once the signal exceeds the Threshold. Higher values mean a slower attack, which lets the instrument's initial transient sneak through and only compresses the sustained portion of the signal.
- `Release` (`key: Release`, `id: 4`, `type: f`): display range `50` to `2500` ms; default `200`. Raw range `0.05` to `2.5`; raw default `0.2`. Controls how quickly the signal returns to unity gain after it returns below the Threshold.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the blend between the compressed and dry signals. At 0%, no compressed signal is heard; at 100%, no dry signal is heard. Values in between provide parallel compression.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `36` dB; default `7`. Raw range `-60` to `36`; raw default `7`. Sets the overall level of the block.
- `Knee` (`key: Knee`, `id: 7`, `type: f`): display range `0` to `20` dB; default `6`. Raw range `0` to `20`; raw default `6`. Controls how smoothly compression kicks in. Higher values cause more of a gradual increase in Ratio as the signal approaches the Threshold.

---

## Deluxe Looper

- Model key: `P35_LooperHelixMono`
- Model ID: `824`
- Type: Looper
- Category: `looper`
- Class: Unknown
- DSP usage: 2.7
- Based on: Unknown
- Agoura model: No

### Parameters

- `Playback` (`key: Playback`, `id: 1`, `type: f`): display range `-60` to `0` dB; default `0`. Raw range `-60` to `0`; raw default `0`. Controls the level of looper playback. You may find it useful to turn this down a bit so your live guitar can be slightly louder.
- `Overdub` (`key: Overdub`, `id: 2`, `type: f`): display range `-60` to `0` dB; default `0`. Raw range `-60` to `0`; raw default `0`. Controls the level of your loop *relatively, over time* while overdubbing. For example, if Overdub is set to 90%, each time your loop repeats, its volume will be reduced by 10%, sounding quieter and quieter with each overdub pass.
- `Low Cut` (`key: lowCut`, `id: 3`, `type: f`): display range `20` to `500` Hz; default `20`. Raw range `20` to `500`; raw default `20`. Applies a low cut (high pass) filter to loop playback, letting you remove the effected signal below a certain frequency. Filtering your loop can sometimes improve the mix with your live instrument.
- `High Cut` (`key: highCut`, `id: 4`, `type: f`): display range `500` to `20000` Hz; default `20000`. Raw range `500` to `20000`; raw default `20000`. Applies a high cut (low pass) filter to loop playback, letting you remove the effected signal above a certain frequency. Filtering your loop can sometimes improve the mix with your live instrument.

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

## Deranged Master

- Model key: `HD2_DistDerangedMasterMono`
- Model ID: `368`
- Type: Distortion
- Category: `distortion`
- Class: Overdrive
- DSP usage: 2.7
- Based on: Dallas Rangemaster Treble Booster
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `7.7`. Raw range `0` to `1`; raw default `0.77`. Controls the amount of distortion applied to the signal.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.22`. Raw range `0` to `1`; raw default `0.522`. Controls the low frequency EQ of the distortion.
- `Treble` (`key: Treble`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the high frequency EQ of the distortion.
- `Level` (`key: Level`, `id: 4`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Distortion Clone

- Model key: `VIC_DistFlexNet`
- Model ID: `839`
- Type: Distortion
- Category: `distortion`
- Class: Clone
- DSP usage: 25.3
- Based on: Unknown
- Agoura model: Yes

### Parameters

- `Pre Gain` (`key: PreGain`, `id: 1`, `type: f`): display range `-40` to `10` dB; default `0`. Raw range `-40` to `10`; raw default `0`.
- `Low Cut` (`key: LowCut`, `id: 3`, `type: f`): display range `19.9` to `1000` Off; default `19.9`. Raw range `19.9` to `1000`; raw default `19.9`.
- `Low` (`key: Low`, `id: 4`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`.
- `Mid` (`key: Mid`, `id: 5`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`.
- `High` (`key: High`, `id: 6`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`.
- `High Cut` (`key: HighCut`, `id: 7`, `type: f`): display range `1000` to `20100` Hz; default `20100`. Raw range `1000` to `20100`; raw default `20100`.
- `Post Gain` (`key: PostGain`, `id: 8`, `type: f`): display range `-40` to `10` dB; default `0`. Raw range `-40` to `10`; raw default `0`.

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

## Double Tank

- Model key: `HD2_ReverbDoubleTankMono`
- Model ID: `102`
- Type: Reverb
- Category: `reverb`
- Class: Spaces
- DSP usage: 7.5
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Decay` (`key: Decay`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.3`. Raw range `0` to `1`; raw default `0.43`. Adjusts the decay time of the reverb effect.
- `Predelay` (`key: Predelay`, `id: 2`, `type: f`): display range `0` to `200` ms; default `0`. Raw range `0` to `0.2`; raw default `0`. Controls the amount of delay heard before the audible onset of reverb. Can sometimes result in more definition between the dry and effected signals.
- `Rate` (`key: Rate`, `id: 3`, `type: f`): display range `0` to `100` %; default `25`. Raw range `0` to `1`; raw default `0.25`. Controls the rate or speed of the modulation.
- `Modulation` (`key: Modulation`, `id: 4`, `type: f`): display range `0` to `100` %; default `40`. Raw range `0` to `1`; raw default `0.4`. Controls the amount or depth of the modulation.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `30`. Raw range `0` to `1`; raw default `0.3`. Controls the blend between the reverb and the dry signal. At 0%, no reverb is heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Low Cut` (`key: LowCut`, `id: 7`, `type: f`): display range `19.9` to `500` Off; default `169`. Raw range `19.9` to `500`; raw default `169`. Applies a low cut (or high pass) filter to the reverb, letting you remove the effected signal below a certain frequency.
- `High Cut` (`key: HighCut`, `id: 8`, `type: f`): display range `500` to `20100` Hz; default `6000`. Raw range `500` to `20100`; raw default `6000`. Applies a high cut (or low pass) filter to the reverb, letting you remove the effected signal above a certain frequency.

---

## Dual Delay

- Model key: `HD2_DelayDualDelayStereo`
- Model ID: `89`
- Type: Delay
- Category: `delay`
- Class: Digital
- DSP usage: 3.7
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Left Time` (`key: Left Time`, `id: 1`, `type: f`): display range `0` to `2000` ms; default `375`. Raw range `0` to `2`; raw default `0.375`. Adjusts the length of time before the left delay's first repeat. When set to note values, Time follows the system tempo.
- `Right Time` (`key: Right Time`, `id: 2`, `type: f`): display range `0` to `2000` ms; default `500`. Raw range `0` to `2`; raw default `0.5`. Adjusts the length of time before the right delay's first repeat. When set to note values, Time follows the system tempo.
- `Left Feedback` (`key: LeftFeedback`, `id: 3`, `type: f`): display range `0` to `100` %; default `30`. Raw range `0` to `1`; raw default `0.3`. Controls the number of repeats for the left delay. When set to 0%, only one repeat is heard; at 100%, the delay repeats forever.
- `Right Feedback` (`key: RightFeedback`, `id: 4`, `type: f`): display range `0` to `100` %; default `40`. Raw range `0` to `1`; raw default `0.4`. Controls the number of repeats for the right delay. When set to 0%, only one repeat is heard; at 100%, the delay repeats forever.
- `Left Mix` (`key: MixL`, `id: 5`, `type: f`): display range `0` to `100` %; default `35`. Raw range `0` to `1`; raw default `0.35`. Controls the blend between the left channel's repeats and the dry signal.
- `Right Mix` (`key: MixR`, `id: 6`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the left channel's repeats and the dry signal.
- `Level` (`key: Level`, `id: 7`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Low Cut` (`key: LowCut`, `id: 8`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (or high pass) filter to the repeats, letting you remove the effected signal below a certain frequency.
- `High Cut` (`key: HighCut`, `id: 9`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (or low pass) filter to the repeats, letting you remove the effected signal above a certain frequency.
- `Mod Mode` (`key: ModulationMode`, `id: 10`, `type: i`): valid values `Off`, `Chorus`, `Vibrato`; default `Chorus`. Raw range `0` to `2`; raw default `1`. Selects the type of modulation applied to the repeats--None ("Off"), Chorus, or Vibrato.
- `Speed` (`key: Speed`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `0.5`. Raw range `0` to `1`; raw default `0.05`. Controls the speed or rate of the modulation. Does nothing if Mod Mode is set to "Off"
- `Depth` (`key: Depth`, `id: 12`, `type: f`): display range `0` to `100` %; default `35`. Raw range `0` to `1`; raw default `0.35`. Controls the depth or intensity of the modulation. Does nothing if Mod Mode is set to "Off"
- `Spread` (`key: Spread`, `id: 13`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the apparent stereo width of the modulation between the left and right channels. Does nothing if Mod Mode is set to "Off"

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

## Ducked Delay

- Model key: `HD2_DelayDuckedDelayMono`
- Model ID: `123`
- Type: Delay
- Category: `delay`
- Class: Digital
- DSP usage: 2.0
- Based on: TC Electronic 2290
- Agoura model: No

### Parameters

- `Time` (`key: Time`, `id: 1`, `type: f`): display range `0` to `8000` ms; default `500`. Raw range `0` to `8`; raw default `0.5`. Adjusts the length of time before the delay's first repeat. When set to note values, Time follows the system tempo.
- `Feedback` (`key: Feedback`, `id: 2`, `type: f`): display range `0` to `100` %; default `37.5`. Raw range `0` to `1`; raw default `0.375`. Controls the number of delay repeats. When set to 0%, only one repeat is heard; at 100%, the delay repeats forever.
- `Low Cut` (`key: LowCut`, `id: 3`, `type: f`): display range `19.9` to `500` Off; default `60`. Raw range `19.9` to `500`; raw default `60`. Applies a low cut (or high pass) filter to the repeats, letting you remove the effected signal below a certain frequency.
- `High Cut` (`key: HighCut`, `id: 4`, `type: f`): display range `500` to `20100` Hz; default `10300`. Raw range `500` to `20100`; raw default `10300`. Applies a high cut (or low pass) filter to the repeats, letting you remove the effected signal above a certain frequency.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the delay repeats and the dry signal. At 0%, no repeats are heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Threshold` (`key: Threshold`, `id: 8`, `type: f`): display range `0` to `100` %; default `49`. Raw range `0` to `1`; raw default `0.49`. Controls the sensitivity of the ducking circuit. Higher values increase the likelihood of ducking to occur.
- `Ducking` (`key: Ducking`, `id: 9`, `type: f`): display range `0` to `100` %; default `61`. Raw range `0` to `1`; raw default `0.61`. Controls the amount of ducking applied. Or rather, how far the repeats drop in volume while playing.
- `Dyn Attack` (`key: DynAttack`, `id: 10`, `type: f`): display range `10` to `2000` ms; default `560`. Raw range `0.01` to `2`; raw default `0.56`. Sets the length of time it takes for ducking to occur (and therefore, repeats to decrease in volume) once you start playing.
- `Dyn Release` (`key: DynRel`, `id: 11`, `type: f`): display range `10` to `5000` ms; default `510`. Raw range `0.01` to `5`; raw default `0.51`. Sets the length of time it takes for ducking to stop (and therefore, repeats to ramp up in volume) once you stop playing.
- `Dynamic Type` (`key: DynType`, `id: 12`, `type: b`): valid values `Ducking`, `Gating`; default `Ducking`. Raw range `Off` to `On`; raw default `Off`. When set to "Ducking," repeats are only heard after you stop playing, which can help maintain note definition. "Gating," inverts the ducking behavior; that is, repeats are only heard while playing, and they're ducked after you stop playing.

---

## Dyhana Drive

- Model key: `HD2_DistDhyanaDriveMono`
- Model ID: `371`
- Type: Distortion
- Category: `distortion`
- Class: Distortion
- DSP usage: 3.2
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.4`. Raw range `0` to `1`; raw default `0.44`. Controls the amount of distortion applied to the signal.
- `Voice` (`key: Voice`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.6`. Raw range `0` to `1`; raw default `0.56`. Lower values result in a warmer and softer sound. Higher values provide more punchiness, clarity, treble, and gain.
- `Tone` (`key: Tone`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.4`. Raw range `0` to `1`; raw default `0.44`. Controls the overall tonal balance of the distortion. Lower values are darker and higher values are brighter.
- `Level` (`key: Level`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Sets the overall level of the block.

---

## Dynamic Ambience

- Model key: `VIC_ReverbDynAmbienceMono`
- Model ID: `104`
- Type: Reverb
- Category: `reverb`
- Class: Spaces
- DSP usage: 5.9
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Room Size` (`key: RoomSize`, `id: 1`, `type: i`): valid values `8 m`, `10 m`, `12 m`; default `8 m`. Raw range `0` to `2`; raw default `0`. Selects the size of the hall (8, 10, or 12 meters).
- `Predelay` (`key: PreDelay`, `id: 2`, `type: f`): display range `0` to `50` ms; default `5`. Raw range `0` to `0.05`; raw default `0.005`. Controls the amount of delay heard before the signal enters the hall. Can sometimes result in more definition between the dry and effected signals.
- `Damping` (`key: Damping`, `id: 3`, `type: f`): display range `500` to `20000` Hz; default `5000`. Raw range `500` to `20000`; raw default `5000`. Determines the frequency above which the reverb will be absorbed. For example, if your hall is full of people wearing fake ocelot jumpsuits, more high frequencies would be absorbed than if the room were empty.
- `Diffusion` (`key: Diffusion`, `id: 4`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of smearing between discrete echoes, sometimes resulting in a softer effected signal.
- `Shape` (`key: EarlyLateBlend`, `id: 5`, `type: f`): display range `-100` to `100` Early; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the blend of the Early and Late reflections. Turning the knob clockwise adds more Late reflections; turning the knob counterclockwise adds more Early reflections.
- `Mix` (`key: Mix`, `id: 6`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the reverb and the dry signal. At 0%, no reverb is heard; at 100%, no dry signal is heard.
- `Low Cut` (`key: LowCut`, `id: 7`, `type: f`): display range `19.9` to `1000` Off; default `100`. Raw range `19.9` to `1000`; raw default `100`. Applies a low cut (or high pass) filter to the reverb, letting you remove the effected signal below a certain frequency.
- `High Cut` (`key: HighCut`, `id: 8`, `type: f`): display range `1000` to `20100` Hz; default `10000`. Raw range `1000` to `20100`; raw default `10000`. Applies a high cut (or low pass) filter to the reverb, letting you remove the effected signal above a certain frequency
- `Level` (`key: Level`, `id: 9`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Dynamic Bloom

- Model key: `VIC_ReverbDynBloomMono`
- Model ID: `500`
- Type: Reverb
- Category: `reverb`
- Class: Spaces
- DSP usage: 14.2
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Decay` (`key: Decay`, `id: 1`, `type: f`): display range `0.1` to `45.1` ms; default `2`. Raw range `0.1` to `45.1`; raw default `2`. Adjusts the decay of the reverb (0.1 sec ~ 45.0 sec, or Infinity).
- `Damping` (`key: Damping`, `id: 2`, `type: f`): display range `500` to `20000` Hz; default `3720`. Raw range `500` to `20000`; raw default `3720`. Determines the frequency above which the reverb will be absorbed. For example, if your hall is full of people wearing fake ocelot jumpsuits, more high frequencies would be absorbed than if the room were empty.
- `Motion Rate` (`key: MatrFreq`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `2`. Raw range `0` to `1`; raw default `0.2`. Motion Rate, or how fast the echoes' intensity changes.
- `Rise Time` (`key: RiseTime`, `id: 4`, `type: i`): valid values `Short`, `Medium`, `Long`; default `Medium`. Raw range `0` to `2`; raw default `1`. Controls how long it takes for the reverb to bloom. Choose Short, Medium (default), or Long.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `40`. Raw range `0` to `1`; raw default `0.4`. Controls the blend between the reverb and the dry signal. At 0%, no reverb is heard; at 100%, no dry signal is heard.
- `Low Freq` (`key: BassFreq`, `id: 6`, `type: f`): display range `20` to `500` Hz; default `100`. Raw range `20` to `500`; raw default `100`. Sets the frequency below which the Low Gain parameter is applied.
- `Low Gain` (`key: BassBoost`, `id: 7`, `type: f`): display range `-15` to `3` dB; default `0`. Raw range `-15` to `3`; raw default `0`. Controls the reverb time for frequencies below the Low Freq value. Values below 0.0 dB mean the bass frequencies decay faster than the treble frequencies; values above 0.0 dB mean the bass frequencies decay slower than the treble frequencies.
- `Low Cut` (`key: LowCut`, `id: 8`, `type: f`): display range `19.9` to `1000` Off; default `100`. Raw range `19.9` to `1000`; raw default `100`. Applies a low cut (or high pass) filter to the reverb, letting you remove the effected signal below a certain frequency.
- `High Cut` (`key: HighCut`, `id: 9`, `type: f`): display range `1000` to `20100` Hz; default `10000`. Raw range `1000` to `20100`; raw default `10000`. Applies a high cut (or low pass) filter to the reverb, letting you remove the effected signal above a certain frequency.
- `Ducking` (`key: DuckingAmount`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `2`. Raw range `0` to `1`; raw default `0.2`. Ducking is applied to the reverb's feedback only, not the entire reverb. For example, if you set Decay high and strum one chord, you'll hear that chord sustain for a long time. While it's ringing out, hit another chord. Without ducking, both chords now sustain together. With Ducking set high, the first chord quickly fades out, and all you'll hear sustaining is the 2nd chord. This can help your bloom from turning into a sloppy mess.
- `Level` (`key: Level`, `id: 11`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Dynamic Hall

- Model key: `VIC_ReverbRotatingMono`
- Model ID: `499`
- Type: Reverb
- Category: `reverb`
- Class: Spaces
- DSP usage: 8.2
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Decay` (`key: Decay`, `id: 1`, `type: f`): display range `0.1` to `45.1` ms; default `4`. Raw range `0.1` to `45.1`; raw default `4`. Sets the decay of the reverb (0.1 sec ~ 45.0 sec, or Infinity). TIP: Assign a second stomp switch to toggle between a lower Decay value and Infinity. Label it "ForEVER ever?"
- `Predelay` (`key: Predelay`, `id: 2`, `type: f`): display range `0` to `200` ms; default `50`. Raw range `0` to `0.2`; raw default `0.05`. Controls the amount of delay heard before the audible onset of reverb. Can sometimes result in more definition between the dry and effected signals.
- `Room Size` (`key: RoomSize`, `id: 3`, `type: i`): valid values `10 m`, `20 m`, `30 m`; default `20 m`. Raw range `0` to `2`; raw default `1`. Sets the size of the hall (10, 20, or 30 meters). NOTE: This parameter actually changes the algorithm so you'll hear a small bump when changing it. Therefore, we don't recommend assigning Room Size to snapshots or other controllers.
- `Diffusion` (`key: Diffusion`, `id: 4`, `type: f`): display range `0` to `100` %; default `70`. Raw range `0` to `1`; raw default `0.7`. Sets the amount of smearing between discrete echoes, sometimes resulting in a softer effected signal.
- `Damping` (`key: Damping`, `id: 5`, `type: f`): display range `500` to `20000` Hz; default `3720`. Raw range `500` to `20000`; raw default `3720`. Determines the frequency above which the reverb will be absorbed. For example, if your hall is full of people wearing inflatable sumo wrestler Halloween costumes, more high frequencies would be absorbed than if the room were empty.
- `Mix` (`key: Mix`, `id: 6`, `type: f`): display range `0` to `100` %; default `39`. Raw range `0` to `1`; raw default `0.39`. Controls the blend between the reverb and the dry signal. At 0%, no reverb is heard; at 100%, no dry signal is heard.
- `Motion` (`key: Motion`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `2.9`. Raw range `0` to `1`; raw default `0.29`. Sets the amount of randomization, which can be helpful to minimize any metallic artifacts common in static reverbs. At higher values, can impart a bit of modulation to the effected signal.
- `Low Freq` (`key: BassFreq`, `id: 8`, `type: f`): display range `20` to `500` Hz; default `100`. Raw range `20` to `500`; raw default `100`. Sets the frequency below which the Low Gain parameter is applied.
- `Low Gain` (`key: BassBoost`, `id: 9`, `type: f`): display range `-15` to `3` dB; default `0`. Raw range `-15` to `3`; raw default `0`. Controls the reverb time for frequencies below the Low Freq value. Values below 0.0dB mean the bass frequencies decay faster than the treble frequencies; values above 0.0dB mean the bass frequencies decay slower than the treble frequencies.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `1000` Off; default `117`. Raw range `19.9` to `1000`; raw default `117`. Applies a low cut (or high pass) filter to the reverb, letting you remove the effected signal below a certain frequency.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `6300`. Raw range `500` to `20100`; raw default `6300`. Applies a high cut (or low pass) filter to the reverb, letting you remove the effected signal above a certain frequency.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Dynamic Plate

- Model key: `VIC_DynPlateMono`
- Model ID: `501`
- Type: Reverb
- Category: `reverb`
- Class: Plate
- DSP usage: 11.1
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Decay` (`key: Decay`, `id: 1`, `type: f`): display range `0.1` to `45.1` ms; default `2`. Raw range `0.1` to `45.1`; raw default `2`. Adjusts the decay of the reverb (0.1 sec ~ 45.0 sec, or Infinity).
- `Predelay` (`key: PreDelay`, `id: 2`, `type: f`): display range `0` to `100` ms; default `10`. Raw range `0` to `0.1`; raw default `0.01`. Controls the amount of delay heard before the signal enters the plate. Can sometimes result in more definition between the dry and effected signals.
- `Damping` (`key: Damping`, `id: 3`, `type: f`): display range `500` to `20000` Hz; default `3720`. Raw range `500` to `20000`; raw default `3720`. Determines the frequency above which the reverb will be absorbed. For example, if your hall is full of people wearing fake ocelot jumpsuits, more high frequencies would be absorbed than if the room were empty.
- `Motion Rate` (`key: MatrFreq`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `3.3`. Raw range `0` to `1`; raw default `0.33`. Controls Motion Rate, or how fast the echoes' intensity changes, due to changes in plate tension or temperature.
- `Motion Range` (`key: VarDelayAmpl`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls Motion Range, or how much the internal delays change. Similar to the modulation control on older tank reverbs.
- `Mix` (`key: Mix`, `id: 6`, `type: f`): display range `0` to `100` %; default `25`. Raw range `0` to `1`; raw default `0.25`. Controls the blend between the reverb and the dry signal. At 0%, no reverb is heard; at 100%, no dry signal is heard.
- `Low Freq` (`key: BassFreq`, `id: 7`, `type: f`): display range `20` to `500` Hz; default `100`. Raw range `20` to `500`; raw default `100`. Sets the frequency below which the Low Gain parameter is applied.
- `Low Gain` (`key: BassBoost`, `id: 8`, `type: f`): display range `-15` to `3` dB; default `0`. Raw range `-15` to `3`; raw default `0`. Sets the reverb time for frequencies below the Low Freq value. Values below 0.0dB mean the bass frequencies decay faster than the treble frequencies; values above 0.0dB mean the bass frequencies decay slower than the treble frequencies
- `Low Cut` (`key: LowCut`, `id: 9`, `type: f`): display range `19.9` to `1000` Off; default `100`. Raw range `19.9` to `1000`; raw default `100`. Applies a low cut (or high pass) filter to the reverb, letting you remove the effected signal below a certain frequency.
- `High Cut` (`key: HighCut`, `id: 10`, `type: f`): display range `1000` to `20100` Hz; default `10000`. Raw range `1000` to `20100`; raw default `10000`. Applies a high cut (or low pass) filter to the reverb, letting you remove the effected signal above a certain frequency.
- `Level` (`key: Level`, `id: 11`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Dynamic Room

- Model key: `VIC_ReverbDynRoomMono`
- Model ID: `103`
- Type: Reverb
- Category: `reverb`
- Class: Spaces
- DSP usage: 9.3
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Decay` (`key: Decay`, `id: 1`, `type: f`): display range `0.1` to `3` ms; default `1.2`. Raw range `0.1` to `3`; raw default `1.2`. Adjusts the decay of the reverb (0.1 sec ~ 3.0 sec)
- `Predelay` (`key: PreDelay`, `id: 2`, `type: f`): display range `0` to `100` ms; default `10`. Raw range `0` to `0.1`; raw default `0.01`. Controls the amount of delay heard before the signal enters the room. Can sometimes result in more definition between the dry and effected signals.
- `Damping` (`key: Damping`, `id: 3`, `type: f`): display range `500` to `20000` Hz; default `3720`. Raw range `500` to `20000`; raw default `3720`. Determines the frequency above which the reverb will be absorbed. For example, if your room is full of people wearing foam high school mascot costumes, more high frequencies would be absorbed than if the room were empty.
- `Diffusion` (`key: Diffusion`, `id: 4`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of smearing between discrete echoes, sometimes resulting in a softer effected signal.
- `Motion Rate` (`key: MatrFreq`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `3.33`. Raw range `0` to `1`; raw default `0.333`. Controls the Motion Rate, or how quickly the room's shape may be changing, due to people moving, doors opening or closing, etc.
- `Mix` (`key: Mix`, `id: 6`, `type: f`): display range `0` to `100` %; default `30`. Raw range `0` to `1`; raw default `0.3`. Controls the blend between the reverb and the dry signal. At 0%, no reverb is heard; at 100%, no dry signal is heard.
- `Low Freq` (`key: BassFreq`, `id: 7`, `type: f`): display range `20` to `500` Hz; default `100`. Raw range `20` to `500`; raw default `100`. Sets the frequency below which the Low Gain parameter is applied.
- `Low Gain` (`key: BassBoost`, `id: 8`, `type: f`): display range `-15` to `3` dB; default `0`. Raw range `-15` to `3`; raw default `0`. Controls the reverb time for frequencies below the Low Freq value. Values below 0.0 dB mean the bass frequencies decay faster than the treble frequencies; values above 0.0 dB mean the bass frequencies decay slower than the treble frequencies.
- `Low Cut` (`key: LowCut`, `id: 9`, `type: f`): display range `19.9` to `1000` Off; default `100`. Raw range `19.9` to `1000`; raw default `100`. Applies a low cut (or high pass) filter to the reverb, letting you remove the effected signal below a certain frequency.
- `High Cut` (`key: HighCut`, `id: 10`, `type: f`): display range `1000` to `20100` Hz; default `10000`. Raw range `1000` to `20100`; raw default `10000`. Applies a high cut (or low pass) filter to the reverb, letting you remove the effected signal above a certain frequency.
- `Early Reflections` (`key: ERLevel`, `id: 11`, `type: f`): display range `0` to `2` unitless; default `0.8`. Raw range `0` to `2`; raw default `0.8`. Controls the amount of early reflective room sound.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

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

## Elephant Man

- Model key: `HD2_DelayElephantManMono`
- Model ID: `129`
- Type: Delay
- Category: `delay`
- Class: Analog
- DSP usage: 3.7
- Based on: Electro-Harmonix Deluxe Memory Man
- Agoura model: No

### Parameters

- `Time` (`key: Time`, `id: 1`, `type: f`): display range `20` to `500` ms; default `375`. Raw range `0.02` to `0.5`; raw default `0.375`. Adjusts the length of time before the first repeat. When set to note values, Time follows the system tempo. IMPORTANT! The original pedal's delay time was limited to 500 ms, so depending on the tempo, your repeats may appear twice as fast.
- `Feedback` (`key: Feedback`, `id: 2`, `type: f`): display range `0` to `100` %; default `39`. Raw range `0` to `1`; raw default `0.39`. Controls the number of delay repeats. When set to 0%, only one repeat is heard. At high values, the Delay may begin to self-oscillate and squeal (perhaps in a good way).
- `Mode` (`key: Mode`, `id: 3`, `type: b`): valid values `Chorus`, `Vibrato`; default `Chorus`. Raw range `Off` to `On`; raw default `Off`. Selects the type of modulation applied to the repeats--Chorus or Vibrato.
- `Depth` (`key: Depth`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `2.8`. Raw range `0` to `1`; raw default `0.28`. Controls the depth or intensity of the modulation applied to the repeats.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the delay repeats and the dry signal. At 0%, no repeats are heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Noise` (`key: Noise`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `1`. Raw range `0` to `1`; raw default `0.1`. Adds subtle graininess to the repeats, which is inherent in many bucket brigade delays.
- `Headroom` (`key: Headroom`, `id: 8`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Some delay pedals' internal signal paths exhibit a bit of grit, especially when placed after a high-gain amp block. Negative values increase the perceived amount of grit; positive values clean things up a bit.

---

## Euclidean Delay

- Model key: `EuclideanDelayMono_Victoria`
- Model ID: `105`
- Type: Delay
- Category: `delay`
- Class: Digital
- DSP usage: 3.7
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Step Time` (`key: Step Time`, `id: 1`, `type: f`): display range `0` to `500` ms; default `136`. Raw range `0` to `0.5`; raw default `0.136`. Sets the time between steps. The total delay time is Time x Steps, so [Time: 1/16 x Steps: 8] is a 1/2-note. When set to note values, Time follows the system tempo.
- `Feedback` (`key: Feedback`, `id: 2`, `type: f`): display range `0` to `100` %; default `0`. Raw range `0` to `1`; raw default `0`. Controls the overall number of repeats heard for the entire sequence. If you want to hear all fills in the sequence only once, set to 0%.
- `Steps` (`key: Steps`, `id: 3`, `type: i`): display range `1` to `16` unitless; default `8`. Raw range `1` to `16`; raw default `8`. Determines the number of steps in the sequence, from 1 to 16.
- `Fill` (`key: Fill`, `id: 4`, `type: i`): display range `1` to `16` unitless; default `3`. Raw range `1` to `16`; raw default `3`. Controls the number of active taps (from 1 to 16), whose spacing is set by Euclidean algorithms. If Fill is higher than Steps, the extra taps are ignored.
- `Rotate` (`key: Rotate`, `id: 5`, `type: i`): display range `0` to `15` unitless; default `0`. Raw range `0` to `15`; raw default `0`. Rotates all fills forward by the same amount (0-15). Used if you like the sound of a repeat pattern but want the fills and gaps shifted forward.
- `Mix` (`key: Mix`, `id: 6`, `type: f`): display range `0` to `100` %; default `42.2`. Raw range `0` to `1`; raw default `0.422`. Controls the blend between the delay sequence and the dry signal. At 0%, no delay sequence is heard; at 100%, no dry signal is heard.
- `Low Cut` (`key: LowCut`, `id: 7`, `type: f`): display range `19.9` to `500` Off; default `80`. Raw range `19.9` to `500`; raw default `80`. Applies a low cut (high pass) filter to the fills, letting you remove the effected signal below a certain frequency.
- `High Cut` (`key: HighCut`, `id: 8`, `type: f`): display range `500` to `20100` Hz; default `20000`. Raw range `500` to `20100`; raw default `20000`. Applies a high cut (low pass) filter to the fills, letting you remove the effected signal above a certain frequency.
- `Level` (`key: Level`, `id: 9`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## EuclideanDelayStereo_Victoria

- Model key: `EuclideanDelayStereo_Victoria`
- Model ID: `44`
- Type: Delay
- Category: `delay`
- Class: Unknown
- DSP usage: 4.8
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## FX Loop 1

- Model key: `HD2_FXLoopMono1`
- Model ID: `277`
- Type: FX Loop
- Category: `fxloop`
- Class: FX Loop
- DSP usage: 1.3
- Based on: N/A
- Agoura model: No

### Parameters

- `Send` (`key: Send`, `id: 1`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Send 1 signal. 0.0 dB is unity gain.
- `Return` (`key: Return`, `id: 2`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Return 1 signal. 0.0 dB is unity gain.
- `Mix` (`key: Mix`, `id: 3`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the amount of signal sent through the FX Loop. When connecting time-based pedals like delays or reverbs, it's best to leave the pedal's Mix at 100% and control the amount of the pedal's effect from the FX Loop block's Mix knob; this helps minimize phase issues and latency. For pedals like distortion, fuzz, or compression, it's common to keep the FX Loop's Mix knob at 100% so the entire signal is effected, although parallel processing can be accomplished at lower values.

---

## FX Loop 1/2

- Model key: `HD2_FXLoopStereo1_2`
- Model ID: `143`
- Type: FX Loop
- Category: `fxloop`
- Class: FX Loop
- DSP usage: 1.5
- Based on: N/A
- Agoura model: No

### Parameters

- `Send` (`key: Send`, `id: 1`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Send 1/2 signal. 0.0 dB is unity gain.
- `Return` (`key: Return`, `id: 2`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Return 1/2 signal. 0.0 dB is unity gain.
- `Mix` (`key: Mix`, `id: 3`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the amount of signal sent through the FX Loop. When connecting time-based pedals like delays or reverbs, it's best to leave the pedal's Mix at 100% and control the amount of the pedal's effect from the FX Loop block's Mix knob; this helps minimize phase issues and latency. For pedals like distortion, fuzz, or compression, it's common to keep the FX Loop's Mix knob at 100% so the entire signal is effected, although parallel processing can be accomplished at lower values.

---

## FX Loop 2

- Model key: `HD2_FXLoopMono2`
- Model ID: `278`
- Type: FX Loop
- Category: `fxloop`
- Class: FX Loop
- DSP usage: 1.3
- Based on: N/A
- Agoura model: No

### Parameters

- `Send` (`key: Send`, `id: 1`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Send 2 signal. 0.0 dB is unity gain.
- `Return` (`key: Return`, `id: 2`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Return 2 signal. 0.0 dB is unity gain.
- `Mix` (`key: Mix`, `id: 3`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the amount of signal sent through the FX Loop. When connecting time-based pedals like delays or reverbs, it's best to leave the pedal's Mix at 100% and control the amount of the pedal's effect from the FX Loop block's Mix knob; this helps minimize phase issues and latency. For pedals like distortion, fuzz, or compression, it's common to keep the FX Loop's Mix knob at 100% so the entire signal is effected, although parallel processing can be accomplished at lower values.

---

## FX Loop 3

- Model key: `HD2_FXLoopMono3`
- Model ID: `279`
- Type: FX Loop
- Category: `fxloop`
- Class: FX Loop
- DSP usage: 1.3
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Send` (`key: Send`, `id: 1`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Send 3 signal. 0.0 dB is unity gain.
- `Return` (`key: Return`, `id: 2`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Return 3 signal. 0.0 dB is unity gain.
- `Mix` (`key: Mix`, `id: 3`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the amount of signal sent through the FX Loop. When connecting time-based pedals like delays or reverbs, it's best to leave the pedal's Mix at 100% and control the amount of the pedal's effect from the FX Loop block's Mix knob; this helps minimize phase issues and latency. For pedals like distortion, fuzz, or compression, it's common to keep the FX Loop's Mix knob at 100% so the entire signal is effected, although parallel processing can be accomplished at lower values.

---

## FX Loop 3/4

- Model key: `HD2_FXLoopStereo3_4`
- Model ID: `144`
- Type: FX Loop
- Category: `fxloop`
- Class: FX Loop
- DSP usage: 1.5
- Based on: N/A
- Agoura model: No

### Parameters

- `Send` (`key: Send`, `id: 1`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Send 3/4 signal. 0.0 dB is unity gain.
- `Return` (`key: Return`, `id: 2`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Return 3/4 signal. 0.0 dB is unity gain.
- `Mix` (`key: Mix`, `id: 3`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the amount of signal sent through the FX Loop. When connecting time-based pedals like delays or reverbs, it's best to leave the pedal's Mix at 100% and control the amount of the pedal's effect from the FX Loop block's Mix knob; this helps minimize phase issues and latency. For pedals like distortion, fuzz, or compression, it's common to keep the FX Loop's Mix knob at 100% so the entire signal is effected, although parallel processing can be accomplished at lower values.

---

## FX Loop 4

- Model key: `HD2_FXLoopMono4`
- Model ID: `280`
- Type: FX Loop
- Category: `fxloop`
- Class: FX Loop
- DSP usage: 1.3
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Send` (`key: Send`, `id: 1`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Send 4 signal. 0.0 dB is unity gain.
- `Return` (`key: Return`, `id: 2`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Return 4 signal. 0.0 dB is unity gain.
- `Mix` (`key: Mix`, `id: 3`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the amount of signal sent through the FX Loop. When connecting time-based pedals like delays or reverbs, it's best to leave the pedal's Mix at 100% and control the amount of the pedal's effect from the FX Loop block's Mix knob; this helps minimize phase issues and latency. For pedals like distortion, fuzz, or compression, it's common to keep the FX Loop's Mix knob at 100% so the entire signal is effected, although parallel processing can be accomplished at lower values.

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

## Feedbacker

- Model key: `VIC_FeedbackSim`
- Model ID: `482`
- Type: Dynamics
- Category: `dynamics`
- Class: Feedbacker
- DSP usage: 9.9
- Based on: Line 6 Original, Feedback Generator
- Agoura model: No

### Parameters

- `Feedback Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the amount of feedback. At higher settings, can easily overwhelm your guitar signal; at lower settings, the feedback can better "sit" between chords. WARNING! Be careful, as this effect can quickly go off the rails, just like real feedback. Consider assigning it to a momentary stomp so feedback only appears while you hold the switch.
- `Feedback Type` (`key: FeedbackType`, `id: 2`, `type: i`): valid values `-Octave`, `Unison`, `+Octave`, `Oct+5th`, `+2 Octaves`, `2 Oct+3rd`, `2 Oct+5th`, `2 Oct+7th`, `Mid to Low`, `High to Low`, `Rndm Trigger`, `Rndm Onset`; default `2 Oct+5th`. Raw range `0` to `11`; raw default `6`. Determines the type of the feedback generated. For Mid to Low (or High to Low), feedback starts on the highest harmonic below 500 Hz (or 1200 Hz) and descends to lower harmonics. Rndm Onset harmonics are selected randomly every time a new note or chord is detected. Rndm Trigger harmonics are selected randomly every time Retrigger is set to "Trigger."
- `Attack` (`key: Attack`, `id: 3`, `type: f`): display range `150` to `6000` ms; default `500`. Raw range `0.15` to `6`; raw default `0.5`. Controls how quickly feedback appears.
- `Release` (`key: ReleaseTime`, `id: 4`, `type: f`): display range `150` to `6000` ms; default `800`. Raw range `0.15` to `6`; raw default `0.8`. Controls how quickly each harmonic dies out or transitions to a different one. At higher values, you may hear more than one harmonic as they transition.
- `Dry Kill` (`key: DryCtrl`, `id: 5`, `type: i`): valid values `Off`, `On`, `Always`; default `Off`. Raw range `0` to `2`; raw default `0`. Determines what happens to the dry signal: Off-The dry signal is controlled by the Dry Level parameter but is unaffected when the block is turned on. On-The dry signal is muted when the block is turned on. Always-The dry signal is muted from the entire path, regardless of whether the block is on or off. Use this setting only when Feedbacker is on a parallel path.
- `Dry Level` (`key: DryLevel`, `id: 6`, `type: f`): display range `-60` to `0` dB; default `0`. Raw range `-60` to `0`; raw default `0`. Adjusts the amount of dry signal through the Feedbacker block.
- `Reference` (`key: Reference`, `id: 7`, `type: i`): valid values `Lowest`, `Loudest`; default `Lowest`. Raw range `0` to `1`; raw default `0`. Determines which note within a chord is referenced by the feedback. "Lowest" prioritizes a chord's lowest-pitched note while "Loudest" prioritizes the loudest note in the chord.
- `Silence Thresh` (`key: SilenceThresh`, `id: 8`, `type: f`): display range `-120` to `-30` dB; default `-100`. Raw range `-120` to `-30`; raw default `-100`. Adjusts the level threshold above which feedback is generated. Below this level, no feedback is generated.
- `Onset Thresh` (`key: OnsetThresh`, `id: 9`, `type: f`): display range `3` to `30` dB; default `10`. Raw range `3` to `30`; raw default `10`. When Feedback Type is set to Rndm Offset, sets the threshold of onsets (plucks) that cause changes to the feedback note. Lower values increase sensitivity to plucking and strumming and higher values reduce sensitivity.
- `Offset Thresh` (`key: OffsetThresh`, `id: 10`, `type: f`): display range `-40` to `-2` dB; default `-6`. Raw range `-40` to `-2`; raw default `-6`. Rapid drops in the signal level by this amount will quickly kill the feedback to prevent warbling.
- `Retrigger` (`key: Retrigger`, `id: 11`, `type: i`): valid values `---`, `Trigger`; default `---`. Raw range `0` to `1`; raw default `0`. Meant to be assigned to a Stomp switch. Every time you press the switch, the feedback changes, depending on the type of mode: Mid to Low or High to Low-Feedback descends to lower harmonics. Rndm Trigger or Rndm Offset-Feedback randomly chooses a different harmonic. All other modes-Feedback regenerates at the mode's selected frequency.
- `Trails` (`key: Trails`, `id: 12`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. Determines whether feedback continues to ring out (for the duration of the Release parameter) after the block is bypassed.

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

## Gain

- Model key: `HD2_VolPanGainMono`
- Model ID: `282`
- Type: Volume
- Category: `volume`
- Class: Gain
- DSP usage: 0.8
- Based on: Vox AC-15 Tremolo
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `-120` to `12` dB; default `0`. Raw range `-120` to `12`; raw default `0`. Sets the amount of gain. Unity is 0.0 dB. Values above 0.0 dB provide an ultra-transparent boost. A value of -120.0 dB effectively mutes the signal passing though the block.

---

## Ganymede

- Model key: `HD2_ReverbGanymedeMono`
- Model ID: `101`
- Type: Reverb
- Category: `reverb`
- Class: Spaces
- DSP usage: 3.7
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Decay` (`key: Decay`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Adjusts the decay time of the reverb effect.
- `Predelay` (`key: Predelay`, `id: 2`, `type: f`): display range `0` to `200` ms; default `40`. Raw range `0` to `0.2`; raw default `0.04`. Controls the amount of delay heard before the audible onset of reverb. Can sometimes result in more definition between the dry and effected signals.
- `Tone` (`key: Tone`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `7.2`. Raw range `0` to `1`; raw default `0.72`. Controls the tonal balance of the reverb. Lower values are darker, higher values are brighter.
- `Modulation` (`key: Modulation`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the amount of modulation applied to the reverb.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `35`. Raw range `0` to `1`; raw default `0.35`. Controls the blend between the reverb and the dry signal. At 0%, no reverb is heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Glitch Delay

- Model key: `VIC_DelayGlitchMono`
- Model ID: `108`
- Type: Delay
- Category: `delay`
- Class: Special FX
- DSP usage: 2.5
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Time` (`key: Time`, `id: 1`, `type: f`): display range `100` to `4000` ms; default `1000`. Raw range `0.1` to `4`; raw default `1`. Adjusts the length of time before the first repeat. When set to note values, Time follows the system tempo.
- `Delay Div` (`key: Delay Div`, `id: 2`, `type: i`): display range `1` to `16` unitless; default `4`. Raw range `1` to `16`; raw default `4`. Divides the delay time into smaller increments.
- `Mix` (`key: Mix`, `id: 3`, `type: f`): display range `0` to `100` %; default `40`. Raw range `0` to `1`; raw default `0.4`. Controls the blend between the delay repeats and the dry signal. At 0%, no repeats are heard; at 100%, no dry signal is heard.
- `Feedback` (`key: Feedback`, `id: 4`, `type: f`): display range `0` to `100` %; default `30`. Raw range `0` to `1`; raw default `0.3`. Controls the overall number of repeats heard for the entire sequence.
- `Slice Fdbk` (`key: SliceFdbk`, `id: 5`, `type: f`): display range `0` to `100` %; default `10`. Raw range `0` to `1`; raw default `0.1`. Controls the number of repeats heard for individual slices. At higher values, you could call this "Super Chaotic Feedback."
- `Shuffle` (`key: Shuffle`, `id: 6`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Determines the likelihood of repeats shuffling/reordering. At 0%, repeats won't shuffle at all; at 100% all repeats will shuffle.
- `Pitch` (`key: Pitch`, `id: 7`, `type: f`): display range `0` to `100` %; default `10`. Raw range `0` to `1`; raw default `0.1`. Determines the likelihood of repeats playing back an interval higher or lower.
- `Reverse` (`key: Reverse`, `id: 8`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Determines the likelihood of repeats playing backward. At 0%, all repeats play forward. At 100%, all repeats play backward.
- `Seq Drift` (`key: Seq Drift`, `id: 9`, `type: f`): display range `0` to `100` %; default `0`. Raw range `0` to `1`; raw default `0`. Determines the likelihood of the entire sequence changing every time it loops around. At 0%, the same sequence loops forever.
- `Smoothing` (`key: Smoothing`, `id: 10`, `type: f`): display range `0` to `50` %; default `10`. Raw range `0` to `0.5`; raw default `0.1`. Higher values apply smoothing between slices and can give a synth-pad type quality; lower values maintain transients. Or set it just high enough to avoid pops and clicks.
- `Interval 1` (`key: Interval 1`, `id: 11`, `type: i`): display range `-12` to `12` unitless; default `-12`. Raw range `-12` to `12`; raw default `-12`. Sets the pitch of some repeats, the likelihood of which is determined by the Pitch parameter (from an octave down to an octave up).
- `Interval 2` (`key: Interval 2`, `id: 12`, `type: i`): display range `-12` to `12` unitless; default `12`. Raw range `-12` to `12`; raw default `12`. Sets the pitch of other repeats, the likelihood of which is determined by the Pitch parameter (from an octave down to an octave up).
- `Low Cut` (`key: Low Cut`, `id: 13`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (or high pass) filter to the slices, letting you remove the effected signal below a certain frequency.
- `High Cut` (`key: High Cut`, `id: 14`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (or low pass) filter to the slices, letting you remove the effected signal above a certain frequency.
- `Level` (`key: Level`, `id: 15`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Glitz

- Model key: `HD2_ReverbGlitzMono`
- Model ID: `100`
- Type: Reverb
- Category: `reverb`
- Class: Spaces
- DSP usage: 5.3
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Decay` (`key: Decay`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.7`. Raw range `0` to `1`; raw default `0.47`. Adjusts the decay time of the reverb effect.
- `Predelay` (`key: Predelay`, `id: 2`, `type: f`): display range `0` to `200` ms; default `10`. Raw range `0` to `0.2`; raw default `0.01`. Controls the amount of delay heard before the audible onset of reverb. Can sometimes result in more definition between the dry and effected signals.
- `Low Cut` (`key: LowCut`, `id: 3`, `type: f`): display range `19.9` to `500` Off; default `118`. Raw range `19.9` to `500`; raw default `118`. Applies a low cut (or high pass) filter to the reverb, letting you remove the effected signal below a certain frequency.
- `High Cut` (`key: HighCut`, `id: 4`, `type: f`): display range `500` to `20100` Hz; default `8000`. Raw range `500` to `20100`; raw default `8000`. Applies a high cut (or low pass) filter to the reverb, letting you remove the effected signal above a certain frequency.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `19`. Raw range `0` to `1`; raw default `0.19`. Controls the blend between the reverb and the dry signal. At 0%, no reverb is heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Delay` (`key: Delay`, `id: 7`, `type: f`): display range `1` to `200` ms; default `44`. Raw range `0.001` to `0.2`; raw default `0.044`. Adjusts the time before the second modulation is applied to the reverb.
- `Rate` (`key: Rate`, `id: 8`, `type: f`): display range `0.1` to `8` Hz; default `1.8`. Raw range `0.1` to `8`; raw default `1.8`. Controls the speed of modulation applied to the reverb.
- `Depth` (`key: Depth`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `3.8`. Raw range `0` to `1`; raw default `0.38`. Controls the depth of modulation applied to the reverb.
- `Xover` (`key: Xover`, `id: 10`, `type: f`): display range `100` to `10000` Hz; default `866`. Raw range `100` to `10000`; raw default `866`. Determines the frequencies above which the second modulation is applied. Frequencies below this value are only affected by the first modulation.
- `Mod Mix` (`key: Mod Mix`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Controls the blend of reverb with and without the second modulation.

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

## HD2_CaliQStereo

- Model key: `HD2_CaliQStereo`
- Model ID: `196`
- Type: EQ
- Category: `eq`
- Class: Unknown
- DSP usage: 2.4
- Based on: MESA/Boogie Mark IV Graphic EQ
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

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

## HD2_DelayADTStereo

- Model key: `HD2_DelayADTStereo`
- Model ID: `95`
- Type: Delay
- Category: `delay`
- Class: Unknown
- DSP usage: 9.9
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DelayAdriaticDelayStereo

- Model key: `HD2_DelayAdriaticDelayStereo`
- Model ID: `93`
- Type: Delay
- Category: `delay`
- Class: Unknown
- DSP usage: 5.9
- Based on: BOSS DM-2 w/Adrian mod
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DelayBucketBrigadeStereo

- Model key: `HD2_DelayBucketBrigadeStereo`
- Model ID: `92`
- Type: Delay
- Category: `delay`
- Class: Unknown
- DSP usage: 5.3
- Based on: BOSS DM-2
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DelayCosmosEchoStereo

- Model key: `HD2_DelayCosmosEchoStereo`
- Model ID: `91`
- Type: Delay
- Category: `delay`
- Class: Unknown
- DSP usage: 10.8
- Based on: Roland RE-201 Space Echo
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DelayCrissCrossStereo

- Model key: `HD2_DelayCrissCrossStereo`
- Model ID: `90`
- Type: Delay
- Category: `delay`
- Class: Unknown
- DSP usage: 5.0
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

## HD2_DelayDuckedDelayStereo

- Model key: `HD2_DelayDuckedDelayStereo`
- Model ID: `86`
- Type: Delay
- Category: `delay`
- Class: Unknown
- DSP usage: 2.8
- Based on: TC Electronic 2290
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DelayElephantManStereo

- Model key: `HD2_DelayElephantManStereo`
- Model ID: `94`
- Type: Delay
- Category: `delay`
- Class: Unknown
- DSP usage: 5.7
- Based on: Electro-Harmonix Deluxe Memory Man
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DelayHeliosphereStereo

- Model key: `HD2_DelayHeliosphereStereo`
- Model ID: `493`
- Type: Delay
- Category: `delay`
- Class: Unknown
- DSP usage: 8.5
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DelayModChorusEchoStereo

- Model key: `HD2_DelayModChorusEchoStereo`
- Model ID: `88`
- Type: Delay
- Category: `delay`
- Class: Unknown
- DSP usage: 3.9
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DelayMultiPassStereo

- Model key: `HD2_DelayMultiPassStereo`
- Model ID: `84`
- Type: Delay
- Category: `delay`
- Class: Unknown
- DSP usage: 3.7
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DelayPitchStereo

- Model key: `HD2_DelayPitchStereo`
- Model ID: `492`
- Type: Delay
- Category: `delay`
- Class: Unknown
- DSP usage: 7.4
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DelayReverseDelayStereo

- Model key: `HD2_DelayReverseDelayStereo`
- Model ID: `82`
- Type: Delay
- Category: `delay`
- Class: Unknown
- DSP usage: 4.0
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DelaySimpleDelayStereo

- Model key: `HD2_DelaySimpleDelayStereo`
- Model ID: `87`
- Type: Delay
- Category: `delay`
- Class: Unknown
- DSP usage: 2.5
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DelaySweepEchoStereo

- Model key: `HD2_DelaySweepEchoStereo`
- Model ID: `80`
- Type: Delay
- Category: `delay`
- Class: Unknown
- DSP usage: 5.5
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DelaySwellAdriaticStereo

- Model key: `HD2_DelaySwellAdriaticStereo`
- Model ID: `79`
- Type: Delay
- Category: `delay`
- Class: Unknown
- DSP usage: 6.7
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DelaySwellVintageDigitalStereo

- Model key: `HD2_DelaySwellVintageDigitalStereo`
- Model ID: `78`
- Type: Delay
- Category: `delay`
- Class: Unknown
- DSP usage: 5.0
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DelayTransistorTapeStereo

- Model key: `HD2_DelayTransistorTapeStereo`
- Model ID: `77`
- Type: Delay
- Category: `delay`
- Class: Unknown
- DSP usage: 5.3
- Based on: Maestro Echoplex EP-3
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DelayVintageDigitalStereoV2

- Model key: `HD2_DelayVintageDigitalStereoV2`
- Model ID: `76`
- Type: Delay
- Category: `delay`
- Class: Unknown
- DSP usage: 4.7
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistAlpacaRougeStereo

- Model key: `HD2_DistAlpacaRougeStereo`
- Model ID: `243`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 5.5
- Based on: Way Huge Red Llama (modded)
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistAmpegScramblerODStereo

- Model key: `HD2_DistAmpegScramblerODStereo`
- Model ID: `509`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 12.9
- Based on: Earthquaker Devices Life (Dist side)
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistArbitratorFuzzStereo

- Model key: `HD2_DistArbitratorFuzzStereo`
- Model ID: `173`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 3.9
- Based on: Dallas Arbiter Fuzz Face
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistBallisticFuzzStereo

- Model key: `HD2_DistBallisticFuzzStereo`
- Model ID: `514`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 11.7
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistBitcrusherStereo

- Model key: `HD2_DistBitcrusherStereo`
- Model ID: `185`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 4.4
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistClawthornDriveStereo

- Model key: `HD2_DistClawthornDriveStereo`
- Model ID: `508`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 10.8
- Based on: Euthymia ICBM Fuzz
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistCompulsiveDriveStereo

- Model key: `HD2_DistCompulsiveDriveStereo`
- Model ID: `170`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 3.7
- Based on: Fulltone OCD
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistDarkDoveFuzzStereo

- Model key: `HD2_DistDarkDoveFuzzStereo`
- Model ID: `516`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 9.0
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistDeezOneModStereo

- Model key: `HD2_DistDeezOneModStereo`
- Model ID: `236`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 6.4
- Based on: BOSS DS-1 Distortion (Keeley modded)
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistDeezOneVintageStereo

- Model key: `HD2_DistDeezOneVintageStereo`
- Model ID: `235`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 7.9
- Based on: BOSS DS-1 Distortion (Made-in-Japan)
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistDerangedMasterStereo

- Model key: `HD2_DistDerangedMasterStereo`
- Model ID: `234`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 4.1
- Based on: Dallas Rangemaster
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistDhyanaDriveStereo

- Model key: `HD2_DistDhyanaDriveStereo`
- Model ID: `237`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 5.1
- Based on: Hermida Zendrive
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistHedgehogD9Stereo

- Model key: `HD2_DistHedgehogD9Stereo`
- Model ID: `149`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 4.2
- Based on: MAXON SD9 Distortion
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistHeirApparentStereo

- Model key: `HD2_DistHeirApparentStereo`
- Model ID: `242`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 5.3
- Based on: Analogman Prince of Tone
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistHorizonDriveStereo

- Model key: `HD2_DistHorizonDriveStereo`
- Model ID: `513`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 11.2
- Based on: Unknown
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistIndustrialFuzzStereo

- Model key: `HD2_DistIndustrialFuzzStereo`
- Model ID: `148`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 10.8
- Based on: Z.Vex Fuzz Factory
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistKWBStereo

- Model key: `HD2_DistKWBStereo`
- Model ID: `187`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 5.9
- Based on: Ben Adrian Kowloon Walled Bunny Distortion
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistKinkyBoostStereo

- Model key: `HD2_DistKinkyBoostStereo`
- Model ID: `202`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 5.3
- Based on: Xotic EP Booster
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistLegendaryDriveStereo

- Model key: `HD2_DistLegendaryDriveStereo`
- Model ID: `512`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 14.0
- Based on: Noble Preamp Bass DI
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistMegaphoneStereo

- Model key: `HD2_DistMegaphoneStereo`
- Model ID: `138`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 2.5
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistMinotaurStereo

- Model key: `HD2_DistMinotaurStereo`
- Model ID: `507`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 8.6
- Based on: Horizon Precision Drive
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistObsidian7000Stereo

- Model key: `HD2_DistObsidian7000Stereo`
- Model ID: `198`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 8.1
- Based on: Darkglass Electronics B7K Ultra
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistPillarsStereo

- Model key: `HD2_DistPillarsStereo`
- Model ID: `255`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 6.5
- Based on: Earthquaker Devices Plumes distortion
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistPocketFuzzStereo

- Model key: `HD2_DistPocketFuzzStereo`
- Model ID: `249`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 4.0
- Based on: Jordan Boss Tone
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistPrizeDriveStereo

- Model key: `HD2_DistPrizeDriveStereo`
- Model ID: `517`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 13.7
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistRamsHeadStereo

- Model key: `HD2_DistRamsHeadStereo`
- Model ID: `245`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 6.8
- Based on: Electro Harmonix Ram's Head Big Muff Pi (1973)
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistRatatouilleDistStereo

- Model key: `HD2_DistRatatouilleDistStereo`
- Model ID: `251`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 8.0
- Based on: Pro Co RAT
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistRegalBassDIStereo

- Model key: `HD2_DistRegalBassDIStereo`
- Model ID: `518`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 6.2
- Based on: Unknown
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistScream808Stereo

- Model key: `HD2_DistScream808Stereo`
- Model ID: `176`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 4.8
- Based on: Ibanez TS808 Tube Screamer
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistStuporODStereo

- Model key: `HD2_DistStuporODStereo`
- Model ID: `197`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 5.2
- Based on: BOSS SD-1 Overdrive
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistSwedishChainsawStereo

- Model key: `HD2_DistSwedishChainsawStereo`
- Model ID: `248`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 4.7
- Based on: BOSS HM-2 Distortion
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistTeemahStereo

- Model key: `HD2_DistTeemahStereo`
- Model ID: `191`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 4.8
- Based on: Paul Cochrane Timmy Overdrive
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistThrifterFuzzStereo

- Model key: `HD2_DistThrifterFuzzStereo`
- Model ID: `200`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 9.2
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistToneSovereignStereo

- Model key: `HD2_DistToneSovereignStereo`
- Model ID: `510`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 9.9
- Based on: Electro Harmonix Russian Big Muff
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistTopSecretODStereo

- Model key: `HD2_DistTopSecretODStereo`
- Model ID: `171`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 3.7
- Based on: DOD OD-250
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistTriangleFuzzStereo

- Model key: `HD2_DistTriangleFuzzStereo`
- Model ID: `169`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 5.3
- Based on: Electro Harmonix Big Muff Pi
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistTycoctaviaFuzzStereo

- Model key: `HD2_DistTycoctaviaFuzzStereo`
- Model ID: `174`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 4.3
- Based on: Tycobrahe Octavia
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistValveDriverStereo

- Model key: `HD2_DistValveDriverStereo`
- Model ID: `506`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 9.6
- Based on: Carvin VLD1 Legacy Drive (Hi Gain Channel)
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistVerminDistStereo

- Model key: `HD2_DistVerminDistStereo`
- Model ID: `172`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 3.4
- Based on: Pro Co RAT
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistVitalBoostStereo

- Model key: `HD2_DistVitalBoostStereo`
- Model ID: `254`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 4.6
- Based on: Earthquaker Devices Life (Boost side)
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistVitalDistStereo

- Model key: `HD2_DistVitalDistStereo`
- Model ID: `515`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 15.0
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistWringerFuzzStereo

- Model key: `HD2_DistWringerFuzzStereo`
- Model ID: `195`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 8.3
- Based on: Garbage's modded BOSS FZ-2
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistXenomorphFuzzStereo

- Model key: `HD2_DistXenomorphFuzzStereo`
- Model ID: `511`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 7.7
- Based on: Nobels ODR-1
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_DistZeroAmpBassDIStereo

- Model key: `HD2_DistZeroAmpBassDIStereo`
- Model ID: `241`
- Type: Distortion
- Category: `distortion`
- Class: Unknown
- DSP usage: 5.4
- Based on: Tech 21 SansAmp Bass Driver DI V1
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_EQGraphic10BandStereo

- Model key: `HD2_EQGraphic10BandStereo`
- Model ID: `137`
- Type: EQ
- Category: `eq`
- Class: Unknown
- DSP usage: 2.2
- Based on: MXR 10-Band Graphic EQ
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_EQSimpleTiltStereo

- Model key: `HD2_EQSimpleTiltStereo`
- Model ID: `238`
- Type: EQ
- Category: `eq`
- Class: Unknown
- DSP usage: 1.5
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_FilterAshevillePattrnStereo

- Model key: `HD2_FilterAshevillePattrnStereo`
- Model ID: `240`
- Type: Filter
- Category: `filter`
- Class: Unknown
- DSP usage: 7.2
- Based on: Moog Moogerfooger MF-105M MuRF Filter
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

## HD2_ReverbDoubleTankStereo

- Model key: `HD2_ReverbDoubleTankStereo`
- Model ID: `75`
- Type: Reverb
- Category: `reverb`
- Class: Unknown
- DSP usage: 7.7
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_ReverbGanymedeStereo

- Model key: `HD2_ReverbGanymedeStereo`
- Model ID: `74`
- Type: Reverb
- Category: `reverb`
- Class: Unknown
- DSP usage: 5.2
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_ReverbGlitzStereo

- Model key: `HD2_ReverbGlitzStereo`
- Model ID: `73`
- Type: Reverb
- Category: `reverb`
- Class: Unknown
- DSP usage: 6.3
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_ReverbHxSpringStereo

- Model key: `HD2_ReverbHxSpringStereo`
- Model ID: `490`
- Type: Reverb
- Category: `reverb`
- Class: Unknown
- DSP usage: 7.6
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_ReverbNonLinearStereo

- Model key: `HD2_ReverbNonLinearStereo`
- Model ID: `489`
- Type: Reverb
- Category: `reverb`
- Class: Unknown
- DSP usage: 9.7
- Based on: Unknown
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_ReverbPlateauxStereo

- Model key: `HD2_ReverbPlateauxStereo`
- Model ID: `70`
- Type: Reverb
- Category: `reverb`
- Class: Unknown
- DSP usage: 6.6
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_ReverbSearchlightsStereo

- Model key: `HD2_ReverbSearchlightsStereo`
- Model ID: `61`
- Type: Reverb
- Category: `reverb`
- Class: Unknown
- DSP usage: 7.0
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

## HD2_VolPanGainStereo

- Model key: `HD2_VolPanGainStereo`
- Model ID: `146`
- Type: Volume
- Category: `volume`
- Class: Unknown
- DSP usage: 0.9
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HD2_VolPanVolStereo

- Model key: `HD2_VolPanVolStereo`
- Model ID: `136`
- Type: Volume
- Category: `volume`
- Class: Unknown
- DSP usage: 0.9
- Based on: Line 6 Original
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

## HX2_Compressor3BandCompStereo

- Model key: `HX2_Compressor3BandCompStereo`
- Model ID: `16`
- Type: Dynamics
- Category: `dynamics`
- Class: Unknown
- DSP usage: 5.8
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HX2_CompressorAutoSwellStereo

- Model key: `HX2_CompressorAutoSwellStereo`
- Model ID: `15`
- Type: Dynamics
- Category: `dynamics`
- Class: Unknown
- DSP usage: 1.7
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HX2_CompressorDeluxeCompStereo

- Model key: `HX2_CompressorDeluxeCompStereo`
- Model ID: `9`
- Type: Dynamics
- Category: `dynamics`
- Class: Unknown
- DSP usage: 2.6
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HX2_CompressorKinkyCompStereo

- Model key: `HX2_CompressorKinkyCompStereo`
- Model ID: `12`
- Type: Dynamics
- Category: `dynamics`
- Class: Unknown
- DSP usage: 7.3
- Based on: Xotic SP Compressor
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HX2_CompressorLAStudioCompStereo

- Model key: `HX2_CompressorLAStudioCompStereo`
- Model ID: `13`
- Type: Dynamics
- Category: `dynamics`
- Class: Unknown
- DSP usage: 6.5
- Based on: Teletronix LA-2A
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HX2_CompressorOptoCompStereo

- Model key: `HX2_CompressorOptoCompStereo`
- Model ID: `11`
- Type: Dynamics
- Category: `dynamics`
- Class: Unknown
- DSP usage: 6.5
- Based on: Ampeg Octo Comp compressor
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HX2_CompressorRedSqueezeStereo

- Model key: `HX2_CompressorRedSqueezeStereo`
- Model ID: `14`
- Type: Dynamics
- Category: `dynamics`
- Class: Unknown
- DSP usage: 8.8
- Based on: MXR Dyna Comp
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HX2_CompressorRochesterCompStereo

- Model key: `HX2_CompressorRochesterCompStereo`
- Model ID: `10`
- Type: Dynamics
- Category: `dynamics`
- Class: Unknown
- DSP usage: 3.5
- Based on: Ashly CLX-52 (in conjunction w/ B. Sheehan)
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HX2_EQParametricStereo

- Model key: `HX2_EQParametricStereo`
- Model ID: `259`
- Type: EQ
- Category: `eq`
- Class: Unknown
- DSP usage: 2.0
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HX2_FilterAutoFilterStereo

- Model key: `HX2_FilterAutoFilterStereo`
- Model ID: `7`
- Type: Filter
- Category: `filter`
- Class: Unknown
- DSP usage: 2.1
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HX2_FilterMutantFilterStereo

- Model key: `HX2_FilterMutantFilterStereo`
- Model ID: `8`
- Type: Filter
- Category: `filter`
- Class: Unknown
- DSP usage: 1.9
- Based on: Musitronics Mu-Tron III
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HX2_FilterMysterFilterStereo

- Model key: `HX2_FilterMysterFilterStereo`
- Model ID: `6`
- Type: Filter
- Category: `filter`
- Class: Unknown
- DSP usage: 1.9
- Based on: Korg A3
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HX2_GateHardGateStereo

- Model key: `HX2_GateHardGateStereo`
- Model ID: `5`
- Type: Dynamics
- Category: `dynamics`
- Class: Unknown
- DSP usage: 1.8
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HX2_GateHorizonGateStereo

- Model key: `HX2_GateHorizonGateStereo`
- Model ID: `4`
- Type: Dynamics
- Category: `dynamics`
- Class: Unknown
- DSP usage: 2.4
- Based on: Horizon Precision Drive - Gate Circuit
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## HX2_GateNoiseGateStereo

- Model key: `HX2_GateNoiseGateStereo`
- Model ID: `3`
- Type: Dynamics
- Category: `dynamics`
- Class: Unknown
- DSP usage: 1.3
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## Hard Gate

- Model key: `HX2_GateHardGateMono`
- Model ID: `23`
- Type: Dynamics
- Category: `dynamics`
- Class: Gate
- DSP usage: 1.2
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Open Threshold` (`key: OpenThreshold`, `id: 1`, `type: f`): display range `-96` to `0` dB; default `-50`. Raw range `-96` to `0`; raw default `-50`. Sets the level above which the gate "opens," or passes signal through.
- `Close Threshold` (`key: CloseThreshold`, `id: 2`, `type: f`): display range `-96` to `0` dB; default `-60`. Raw range `-96` to `0`; raw default `-60`. Sets the level below which the gate "closes," or stops signal from passing through.
- `Hold Time` (`key: HoldTime`, `id: 3`, `type: f`): display range `10` to `800` ms; default `10`. Raw range `0.01` to `0.8`; raw default `0.01`. Adjusts the length of time after the signal drops below the Close threshold before it is gated. Increase Hold Time if your playing is chopped off too soon.
- `Decay` (`key: Decay`, `id: 4`, `type: f`): display range `10` to `4000` ms; default `10`. Raw range `0.01` to `4`; raw default `0.01`. Controls the length of time it takes for the open noise gate to close once the signal drops below the Close level/threshold. Increase Decay if you want the gate to gradually lower the signal instead of chopping it off abruptly.
- `Level` (`key: Level`, `id: 5`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

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

## Harmony Delay

- Model key: `HD2_DelayHarmonyDelayStereo`
- Model ID: `491`
- Type: Delay
- Category: `delay`
- Class: Digital
- DSP usage: 9.3
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Time` (`key: Time`, `id: 1`, `type: f`): display range `0` to `2000` ms; default `750`. Raw range `0` to `2`; raw default `0.75`. Adjusts the length of time before the first repeat. When set to note values, Time follows the system tempo.
- `Feedback` (`key: Feedback`, `id: 2`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Feedback controls the number of repeated pitch sequences. When set to 0%, the two voice/harmony repeats are heard only once, followed by the root note again. At higher values, the three note sequence (root, voice/harmony 1, and voice/harmony 2) cycle repeatedly.
- `Key` (`key: Key`, `id: 3`, `type: i`): valid values `A`, `A#`, `B`, `C`, `C#`, `D`, `D#`, `E`, `F`, `F#`, `G`, `G#`; default `A`. Raw range `0` to `11`; raw default `0`. Along with Scale, specifies the scale reference for V1 Shift and V2 Shift values. For example, if you choose D Minor and then PLAY IN D MINOR (Harmony Delay can't fix bad notes), V1 Shift and V2 Shift will always shift your repeats to pitches in that scale.
- `Scale` (`key: Scale`, `id: 4`, `type: i`): valid values `Major`, `Minor`, `Major Pent`, `Minor Pent`, `Harm Minor`, `Melodic Minor`, `Whole Tone`, `Whole Dim`; default `Major`. Raw range `0` to `7`; raw default `0`. Along with Key, specifies the scale reference for V1 Shift and V2 Shift values. For example, if you choose D Minor and then PLAY IN D MINOR (Harmony Delay can't fix wrong notes), V1 Shift and V2 Shift will shift your repeats to pitches in that scale.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the delay repeats and the dry signal. At 0%, no repeats are heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Voice 1 Shift` (`key: IntervalVoice1`, `id: 7`, `type: i`): display range `-8` to `8` unitless; default `2`. Raw range `-8` to `8`; raw default `2`. Selects voice/harmony 1's note in the specified Key. For example, if Key is set to "D" and Scale is set to "Minor" (which I always find is the saddest of all keys), setting V1 Shift to +3 will repeat an F (or the third note above D in the D minor scale).
- `Voice 1 Level` (`key: LevelVoice1`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the level of the voice/harmony 1 repeats.
- `Voice 1 Pan` (`key: PanVoice1`, `id: 9`, `type: f`): display range `-100` to `100` Left; default `0.25`. Raw range `0` to `1`; raw default `0.25`. Controls the panning of the voice/harmony 1 repeats between the left and right channels.
- `Voice 2 Shift` (`key: IntervalVoice2`, `id: 10`, `type: i`): display range `-8` to `8` unitless; default `4`. Raw range `-8` to `8`; raw default `4`. Selects voice/harmony 2's note in the specified Key. For example, if Key is set to "D" and Scale is set to "Minor" (which I always find is the saddest of all keys), setting V2 Shift to -2 will repeat a Bb (or the second note below D in the D minor scale).
- `Voice 2 Level` (`key: LevelVoice2`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the level of the voice/harmony 2 repeats.
- `Voice 2 Pan` (`key: PanVoice2`, `id: 12`, `type: f`): display range `-100` to `100` Left; default `0.75`. Raw range `0` to `1`; raw default `0.75`. Controls the panning of the voice/harmony 2 repeats between the left and right channels.
- `Voice 1 Scale` (`key: DelayVoice1`, `id: 13`, `type: f`): display range `0` to `100` %; default `33`. Raw range `0` to `1`; raw default `0.33`. Voice/harmony 1's delay time is always some percentage of the root note's time (controlled via Time), and is determined by the V1 Scale parameter. For example, if Time is set to 800 ms and V1 Scale is set to 75%, voice/harmony 1's delay is 600 ms (or 75% of 800 ms). When scale is set to 100%, voice/harmony 1 and root delays are the same.
- `Voice 2 Scale` (`key: DelayVoice2`, `id: 14`, `type: f`): display range `0` to `100` %; default `66`. Raw range `0` to `1`; raw default `0.66`. Voice/harmony 2's delay time is always some percentage of the root note's time (controlled via Time), and is determined by the V2 Scale parameter. For example, if Time is set to 800 ms and V2 Scale is set to 25%, voice/harmony 2's delay is 200 ms (or 25% of 800 ms). When scale is set to 100%, voice/harmony 2 and root delays are the same.
- `Root Level` (`key: LevelRootVoice`, `id: 15`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the level of the root (unpitched) repeats. If you only want to hear the harmony repeats, set Root Level to 0.0.
- `Root Pan` (`key: PanRootVoice`, `id: 16`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the root (unhitched) repeats between the left and right channels.
- `Low Cut` (`key: LowCut`, `id: 17`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter to the repeats, letting you remove the effected signal below a certain frequency.
- `High Cut` (`key: HighCut`, `id: 18`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (low pass) filter to the repeats, letting you remove the effected signal above a certain frequency.

---

## Hedgehog D9

- Model key: `HD2_DistHedgehogD9Mono`
- Model ID: `287`
- Type: Distortion
- Category: `distortion`
- Class: Distortion
- DSP usage: 2.6
- Based on: MAXON SD9 Sonic Distortion
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the amount of distortion applied to the signal.
- `Tone` (`key: Tone`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `2.7`. Raw range `0` to `1`; raw default `0.27`. Controls the overall tonal balance of the distortion. Lower values are darker and higher values are brighter.
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.8`. Raw range `0` to `1`; raw default `0.68`. Sets the overall level of the block.

---

## Heir Apparent

- Model key: `HD2_DistHeirApparentMono`
- Model ID: `378`
- Type: Distortion
- Category: `distortion`
- Class: Distortion
- DSP usage: 3.5
- Based on: Analogman Prince of Tone
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of gain applied to the signal.
- `Tone` (`key: Tone`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the overall tonal balance of the overdrive. Lower values are darker and higher values are brighter.
- `Presence` (`key: Presence`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Adds a bit more high end sparkle.
- `Clipping` (`key: Clipping`, `id: 4`, `type: i`): valid values `Overdrive`, `Boost`, `Distortion`; default `Overdrive`. Raw range `0` to `2`; raw default `0`. Selects the clipping mode. "Overdrive" has a touch of drive and compression. "Clean" is less compressed than "Overdrive" and is ideal for boosting your signal into an amp. "Distortion" provides even more drive and compression.
- `Gain Mod` (`key: GainMod`, `id: 5`, `type: i`): valid values `Normal`, `Higher`; default `Higher`. Raw range `0` to `1`; raw default `1`. The original pedal has different variations available, one with more gain ("Higher").
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6.2`. Raw range `0` to `1`; raw default `0.62`. Sets the overall level of the block.
- `Voltage` (`key: Voltage`, `id: 7`, `type: b`): valid values `9V`, `18V`; default `9V`. Raw range `Off` to `On`; raw default `Off`. The original pedal was designed to be powered by a 9V power supply but could alternatively accommodate 18V, which would provide a bit more headroom. This is especially apparent when Clipping is set to "Boost" and Gain is turned up.

---

## Heliosphere

- Model key: `HD2_DelayHeliosphereMono`
- Model ID: `503`
- Type: Delay
- Category: `delay`
- Class: Special FX
- DSP usage: 4.9
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Time` (`key: Time`, `id: 1`, `type: f`): display range `0` to `4000` ms; default `800`. Raw range `0` to `4`; raw default `0.8`. Adjusts the length of time before the first repeat. When set to note values, Time follows the system tempo.
- `Feedback` (`key: Feedback`, `id: 2`, `type: f`): display range `0` to `100` %; default `85`. Raw range `0` to `1`; raw default `0.85`. Controls the number of delay repeats. When set to 0%, only one repeat is heard.
- `Rate` (`key: Rate`, `id: 3`, `type: f`): display range `0.1` to `8` Hz; default `0.1`. Raw range `0.1` to `8`; raw default `0.1`. Controls the rate or speed of modulation in the effected signal.
- `Depth` (`key: Depth`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `4.42`. Raw range `0` to `1`; raw default `0.442`. Controls the depth or amount of modulation.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `45`. Raw range `0` to `1`; raw default `0.45`. Controls the blend between the delay repeats and the dry signal. At 0%, no repeats are heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Reverb Mix` (`key: VerbMix`, `id: 7`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the reverb and the dry signal inside the delay's feedback loop. At 0%, no reverb is heard.
- `Reverb Decay` (`key: VerbDecay`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the decay of the reverb inside the delay's feedback loop.
- `Headroom` (`key: Headroom`, `id: 9`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Some delay pedals' internal signal paths exhibit a bit of grit, especially when placed after a high-gain amp block. Negative values increase the perceived amount of grit; positive values clean things up a bit.

---

## Horizon Drive

- Model key: `HD2_DistHorizonDriveMono`
- Model ID: `386`
- Type: Distortion
- Category: `distortion`
- Class: Overdrive
- DSP usage: 6.1
- Based on: Horizon Precision Drive
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Controls the amount of distortion, saturation, and sustain.
- `Attack` (`key: Attack`, `id: 2`, `type: i`): valid values `1`, `2`, `3`, `4`, `5`, `6`; default `2`. Raw range `0` to `5`; raw default `1`. Affects the character of the distortion by applying a low cut (high pass) filter to the signal. Higher values increase the low cut filter's frequency.
- `Bright` (`key: Bright`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `3.7`. Raw range `0` to `1`; raw default `0.37`. Controls the brightness of the signal, but acts more like a traditional tone knob. Turn up if your amp is muddy or dark; turn down if the high end appears a bit strident or harsh.
- `Gate` (`key: Gate`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the sensitivity of the dynamic high shelf EQ filter. Lower values eliminate most noise without affecting your tone; higher values can tighten up your bass response, at the expense of note articulation.
- `Gate Range` (`key: Gate Range`, `id: 5`, `type: b`): valid values `Authentic`, `Extended`; default `Authentic`. Raw range `Off` to `On`; raw default `Off`. Determines the range of the dynamic high shelf EQ filter, or how far the signal is attenuated while the gate is active. When set to "Extended," drops the gate's threshold down to -90 dB, which is more attenuation than the real pedal.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Sets the overall level of the block.

---

## Horizon Gate

- Model key: `HX2_GateHorizonGateMono`
- Model ID: `22`
- Type: Dynamics
- Category: `dynamics`
- Class: Gate
- DSP usage: 1.7
- Based on: Horizon Precision Drive - Gate Circuit
- Agoura model: No

### Parameters

- `Mode` (`key: Mode`, `id: 1`, `type: i`): valid values `Bass`, `Guitar`; default `Guitar`. Raw range `0` to `1`; raw default `1`. Determines whether the gate's response is optimized for bass or guitar.
- `Sensitivity` (`key: Sensitivity`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `8.46`. Raw range `0` to `1`; raw default `0.846`. Lower values eliminate most noise without affecting your tone; higher values can tighten up your bass response, at the expense of note articulation. Note that Horizon Gate isn't a traditional gate as much as it's a dynamic high shelf EQ filter that squashes high end noise while letting lower end signals continue to decay naturally.
- `Gate Range` (`key: Gate Range`, `id: 3`, `type: b`): valid values `Authentic`, `Extended`; default `Authentic`. Raw range `Off` to `On`; raw default `Off`. Determines the range of the dynamic high shelf EQ filter, or how far the signal's high end is attenuated while the gate is active. When set to "Extended," drops the gate's threshold down to -90 dB, which is more attenuation than the real pedal.
- `Level` (`key: Level`, `id: 4`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Hot Springs

- Model key: `HD2_ReverbHxSpringMono`
- Model ID: `497`
- Type: Reverb
- Category: `reverb`
- Class: Spring
- DSP usage: 7.6
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Dwell` (`key: Dwell`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the strength of the signal sent into the spring tank. Higher values result in a longer decay.
- `Spring Count` (`key: Spring Count`, `id: 2`, `type: f`): display range `1` to `3` unitless; default `2`. Raw range `1` to `3`; raw default `2`. Selects how many springs are in the tank (1, 2, or 3, and numerous values in between).
- `Drip` (`key: Drip`, `id: 3`, `type: i`): valid values `Low`, `Medium`, `High`; default `Medium`. Raw range `0` to `2`; raw default `1`. Adjusts the intensity of the spring reverb, or how much "ploink" you might hear.
- `Low Cut` (`key: LowCut`, `id: 4`, `type: f`): display range `19.9` to `500` Off; default `200`. Raw range `19.9` to `500`; raw default `200`. Applies a low cut (or high pass) filter to the reverb, letting you remove the effected signal below a certain frequency.
- `High Cut` (`key: HighCut`, `id: 5`, `type: f`): display range `500` to `20100` Hz; default `5000`. Raw range `500` to `20100`; raw default `5000`. Applies a high cut (or low pass) filter to the reverb, letting you remove the effected signal above a certain frequency.
- `Mix` (`key: Mix`, `id: 6`, `type: f`): display range `0` to `100` %; default `37`. Raw range `0` to `1`; raw default `0.37`. Controls the blend between the reverb and the dry signal. At 0%, no reverb is heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 7`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Industrial Fuzz

- Model key: `HD2_DistIndustrialFuzzMono`
- Model ID: `288`
- Type: Distortion
- Category: `distortion`
- Class: Fuzz
- DSP usage: 5.8
- Based on: Z.Vex Fuzz Factory
- Agoura model: No

### Parameters

- `Compress` (`key: Compress`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.7`. Raw range `0` to `1`; raw default `0.57`. The Compress knob doesn't actually control a compressor, it controls the pedal's transistor bias. However, higher values can pinch the dynamics of the signal, much like a compressor.
- `Gate` (`key: Gate`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.2`. Raw range `0` to `1`; raw default `0.52`. Higher values can squelch your sustain, like a gate, but it's more spitty and nasty than a gate, not that there's anything wrong with that.
- `Drive` (`key: Drive`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Adjusts the amount of fuzz applied to the signal. Becomes less effective as Comp is turned up.
- `Stability` (`key: Stability`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7.3`. Raw range `0` to `1`; raw default `0.73`. Controls the amount of voltage the pedal sees. Lower settings can slightly soften or mellow out the fuzz.
- `Oscillator` (`key: Oscillator`, `id: 5`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. Turns the oscillator on and off.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.7`. Raw range `0` to `1`; raw default `0.77`. Sets the overall level of the block.

---

## KWB

- Model key: `HD2_DistKWBMono`
- Model ID: `323`
- Type: Distortion
- Category: `distortion`
- Class: Distortion
- DSP usage: 3.5
- Based on: Benadrian Kowloon Walled Bunny Distortion
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.7`. Raw range `0` to `1`; raw default `0.67`. Controls the amount of distortion applied to the signal.
- `Push Diode` (`key: PushDiode`, `id: 2`, `type: i`): valid values `None`, `Germanium`, `Silicon`, `LED`; default `Germanium`. Raw range `0` to `3`; raw default `1`. Selects the type of clipping diode for the first socket. The original pedal's circuit included sockets so the user could swap out diodes to customize their sound.
- `Pull Diode` (`key: PullDiode`, `id: 3`, `type: i`): valid values `None`, `Germanium`, `Silicon`, `LED`; default `LED`. Raw range `0` to `3`; raw default `3`. Selects the type of clipping diode for the second socket. The original pedal's circuit included sockets so the user could swap out diodes to customize their sound.
- `Bass` (`key: Bass`, `id: 4`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Controls the low frequency EQ of the distortion.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Controls the high frequency EQ of the distortion.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6.92`. Raw range `0` to `1`; raw default `0.692`. Sets the overall level of the block.
- `Asymmetry` (`key: Asym`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Adjusts the amount of clipping symmetry. Lower values are more symmetrical; higher values are more asymmetrical, or more "broken." More audible when running into a clean amp.

---

## Kinky Boost

- Model key: `HD2_DistKinkyBoostMono`
- Model ID: `339`
- Type: Distortion
- Category: `distortion`
- Class: Boost
- DSP usage: 3.2
- Based on: Xotic EP Booster
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the amount of drive applied to the signal.
- `Boost` (`key: Boost`, `id: 2`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. Adds a 3dB boost to the signal via a virtual dip switch.
- `Bright` (`key: Bright`, `id: 3`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. Adds additional brightness via a virtual dip switch.

---

## Kinky Comp

- Model key: `HX2_CompressorKinkyCompMono`
- Model ID: `34`
- Type: Dynamics
- Category: `dynamics`
- Class: Compress
- DSP usage: 4.2
- Based on: Xotic SP Compressor
- Agoura model: No

### Parameters

- `Sensitivity` (`key: Sensitivity`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the sensitivity of the compressor's input. Higher values apply more compression.
- `Mix` (`key: Mix`, `id: 2`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the blend between the compressed and dry signals. At 0%, no compressed signal is heard; at 100%, no dry signal is heard. Values in between provide parallel compression.
- `Attack` (`key: Attack`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Controls how quickly compression responds to increases in input signal level. Higher values mean a slower attack, which lets the instrument's initial transient sneak through and only compresses the sustained portion of the signal.
- `Release` (`key: Release`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls how quickly the signal returns to unity gain after it falls below the threshold.
- `Level` (`key: Level`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Sets the overall level of the block.

---

## L6SPB_AcousGtrSimStereo

- Model key: `L6SPB_AcousGtrSimStereo`
- Model ID: `246`
- Type: EQ
- Category: `eq`
- Class: Unknown
- DSP usage: 4.3
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## LA Studio Comp

- Model key: `HX2_CompressorLAStudioCompMono`
- Model ID: `35`
- Type: Dynamics
- Category: `dynamics`
- Class: Compress
- DSP usage: 3.9
- Based on: Teletronix LA-2A
- Agoura model: No

### Parameters

- `Peak Reduction` (`key: PeakReduction`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `7.8`. Raw range `0` to `1`; raw default `0.78`. Peak Reduction lowers the threshold, controlling how much compression is applied to the input signal.
- `Gain` (`key: Gain`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.2`. Raw range `0` to `1`; raw default `0.62`. Increases the signal's level to compensate for the reduced level that results from compression/peak reduction.
- `Type` (`key: Type`, `id: 3`, `type: b`): valid values `Compress`, `Limit`; default `Compress`. Raw range `Off` to `On`; raw default `Off`. Switches between compression (3:1 ratio) and limiting (Infinity:1 ratio).
- `Emphasis` (`key: Emphasis`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `0.9`. Raw range `0` to `1`; raw default `0.09`. Subtly increases the compression circuit's sensitivity to high frequencies. At 0.0, no emphasis is applied.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the blend between the compressed and dry signals. At 0%, no compressed signal is heard; at 100%, no dry signal is heard. Values in between provide parallel compression.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-120` to `12` dB; default `0`. Raw range `-120` to `12`; raw default `0`. Sets the overall level of the block.

---

## Legendary Drive

- Model key: `HD2_DistLegendaryDriveMono`
- Model ID: `382`
- Type: Distortion
- Category: `distortion`
- Class: Overdrive
- DSP usage: 7.4
- Based on: Carvin VLD1 Legacy Drive (hi gain channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `7.7`. Raw range `0` to `1`; raw default `0.77`. Controls the amount of distortion applied to the signal.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.4`. Raw range `0` to `1`; raw default `0.54`. Controls the low frequency EQ of the distortion.
- `Mid` (`key: Middle`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the midrange frequency EQ of the distortion.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ of the distortion.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Adds a bit more high end sparkle to clean sounds and allows for driven signals to cut through a mix. At lower levels, provides thicker and warmer sounds.
- `Level` (`key: Volume`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the overall level of the block.

---

## Megaphone

- Model key: `HD2_DistMegaphoneMono`
- Model ID: `266`
- Type: Distortion
- Category: `distortion`
- Class: Megaphone
- DSP usage: 1.6
- Based on: Megaphone
- Agoura model: No

### Parameters

- `Grit` (`key: Grit`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `7.6`. Raw range `0` to `1`; raw default `0.76`. Determines how old and distorted the megaphone sounds.
- `Tone` (`key: Tone`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the overall tonal balance of the effect.
- `Focus` (`key: Focus`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Adds more resonance to the effected signal.
- `Space` (`key: Space`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Adds a bit of echo to the effected signal.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `79`. Raw range `0` to `1`; raw default `0.79`. Controls the blend between the effected and the dry signal. At 0%, no effect is heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6.8`. Raw range `0` to `1`; raw default `0.68`. Sets the overall level of the block.

---

## Minotaur

- Model key: `HD2_DistMinotaurMono`
- Model ID: `304`
- Type: Distortion
- Category: `distortion`
- Class: Overdrive
- DSP usage: 4.8
- Based on: Klon Centaur
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.2`. Raw range `0` to `1`; raw default `0.42`. Controls the amount of overdrive applied to the signal. At higher settings, you may experience the fabled (1N34A germanium) "magic diodes."
- `Tone` (`key: Tone`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.3`. Raw range `0` to `1`; raw default `0.53`. Controls the overall tonal balance of the distortion. Lower values are darker and higher values are brighter.
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Sets the overall level of the block.

---

## Mod/Chorus Echo

- Model key: `HD2_DelayModChorusEchoMono`
- Model ID: `124`
- Type: Delay
- Category: `delay`
- Class: Analog
- DSP usage: 2.4
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Time` (`key: Time`, `id: 1`, `type: f`): display range `0` to `8000` ms; default `362`. Raw range `0` to `8`; raw default `0.362`. Adjusts the length of time before the first repeat. When set to note values, Time follows the system tempo.
- `Feedback` (`key: Feedback`, `id: 2`, `type: f`): display range `0` to `100` %; default `28.0`. Raw range `0` to `1`; raw default `0.28`. Controls the number of delay repeats. When set to 0%, only one repeat is heard; at 100%, the delay repeats forever.
- `Low Cut` (`key: LowCut`, `id: 3`, `type: f`): display range `19.9` to `500` Off; default `155`. Raw range `19.9` to `500`; raw default `155`. Applies a low cut (or high pass) filter to the repeats, letting you remove the effected signal below a certain frequency.
- `High Cut` (`key: HighCut`, `id: 4`, `type: f`): display range `500` to `20100` Hz; default `9540`. Raw range `500` to `20100`; raw default `9540`. Applies a high cut (or low pass) filter to the repeats, letting you remove the effected signal above a certain frequency.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `45`. Raw range `0` to `1`; raw default `0.45`. Controls the blend between the delay repeats and the dry signal. At 0%, no repeats are heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Mod Mode` (`key: ModulationMode`, `id: 9`, `type: i`): valid values `Off`, `Chorus`, `Vibrato`; default `Chorus`. Raw range `0` to `2`; raw default `1`. Selects the type of modulation applied to the repeats--None (Off), Chorus, or Vibrato.
- `Speed` (`key: Speed`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `0.22`. Raw range `0` to `1`; raw default `0.022`. Controls the speed or rate of the modulation applied to the repeats.
- `Depth` (`key: Depth`, `id: 8`, `type: f`): display range `0` to `100` %; default `49`. Raw range `0` to `1`; raw default `0.49`. Controls the depth or intensity of the modulation applied to the repeats.

---

## Multi Pass

- Model key: `HD2_DelayMultiPassMono`
- Model ID: `122`
- Type: Delay
- Category: `delay`
- Class: Special FX
- DSP usage: 2.9
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Time` (`key: Time`, `id: 1`, `type: f`): display range `0` to `4000` ms; default `1200`. Raw range `0` to `4`; raw default `1.2`. Adjusts the length of the entire 6-tap delay pattern. When set to note values, Time follows the system tempo.
- `Feedback` (`key: Feedback`, `id: 2`, `type: f`): display range `0` to `100` %; default `45`. Raw range `0` to `1`; raw default `0.45`. Controls how many times the 6-tap delay pattern repeats. When set to 0%, the pattern is heard only once; at 100%, the pattern cycles forever.
- `Pattern` (`key: Pattern`, `id: 3`, `type: i`): valid values `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`; default `1`. Raw range `0` to `7`; raw default `0`. Selects one of 8 preset patterns, all utilizing different sequences of filters. Experiment to see which pattern sounds the best for your application.
- `Mode` (`key: Mode`, `id: 4`, `type: b`): valid values `Delay`, `Echo`; default `Delay`. Raw range `Off` to `On`; raw default `Off`. Determines the type of repeat mode. "Delay" results in cleaner rhythmic patterns, with the same pattern repeating every sequence. "Echo" applies delays within the pattern itself, creating more of a sea of echoes, especially when Feedback is set high.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the delay repeats and the dry signal. At 0%, no repeats are heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Multitap 4

- Model key: `HD2_DelayMultitap4Stereo`
- Model ID: `85`
- Type: Delay
- Category: `delay`
- Class: Multitap
- DSP usage: 5.3
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Time` (`key: Time`, `id: 1`, `type: f`): display range `0` to `4000` ms; default `1000`. Raw range `0` to `4`; raw default `1`. Adjusts the length of time for the 4-tap delay sequence to repeat. When set to note values, Time follows the system tempo.
- `Feedback` (`key: Feedback`, `id: 2`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls how many times the 4-tap delay sequence repeats. When set to 0%, the sequence is heard only once. At high values, the delay taps may begin to self-oscillate.
- `Diffusion` (`key: Diffusion`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the amount of smearing between discrete echoes, sometimes resulting in a softer, less percussive repeats.
- `Low Cut` (`key: LowCut`, `id: 4`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (or high pass) filter to the repeats, letting you remove the effected signal below a certain frequency.
- `High Cut` (`key: HighCut`, `id: 5`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (or low pass) filter to the repeats, letting you remove the effected signal above a certain frequency.
- `Mix` (`key: Mix`, `id: 6`, `type: f`): display range `0` to `100` %; default `43`. Raw range `0` to `1`; raw default `0.43`. Controls the blend between the delay repeats and the dry signal. At 0%, no repeats are heard; at 100%, no dry signal is heard.
- `Tap 1 Scale` (`key: Tap1Delay`, `id: 7`, `type: f`): display range `0` to `100` %; default `24`. Raw range `0` to `1`; raw default `0.24`. For multitap delays, each tap's time is some percentage of the master Time parameter. For example, if Time is set to 500 ms, and T1 Scale is set to 25%, tap 1's delay is 125ms (or 25% of 500 ms).
- `Tap 1 Pan` (`key: Tap1Pan`, `id: 8`, `type: f`): display range `-100` to `100` Left; default `0`. Raw range `0` to `1`; raw default `0`. Controls the panning of delay tap 1 between the left and right channels.
- `Tap 1 Level` (`key: Tap1Level`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the level of delay tap 1. To mute a tap, set its Level to 0.0.
- `Tap 2 Scale` (`key: Tap2Delay`, `id: 10`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. For multitap delays, each tap's time is some percentage of the master Time parameter. For example, if Time is set to 500 ms, and T2 Scale is set to 50%, tap 2's delay is 250ms (or 50% of 500 ms).
- `Tap 2 Pan` (`key: Tap2Pan`, `id: 11`, `type: f`): display range `-100` to `100` Left; default `0.33`. Raw range `0` to `1`; raw default `0.33`. Controls the panning of delay tap 2 between the left and right channels.
- `Tap 2 Level` (`key: Tap2Level`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the level of delay tap 2. To mute a tap, set its Level to 0.0.
- `Tap 3 Scale` (`key: Tap3Delay`, `id: 13`, `type: f`): display range `0` to `100` %; default `75`. Raw range `0` to `1`; raw default `0.75`. For multitap delays, each tap's time is some percentage of the master Time parameter. For example, if Time is set to 500 ms, and T3 Scale is set to 75%, tap 3's delay is 375ms (or 75% of 500 ms).
- `Tap 3 Pan` (`key: Tap3Pan`, `id: 14`, `type: f`): display range `-100` to `100` Left; default `0.66`. Raw range `0` to `1`; raw default `0.66`. Controls the panning of delay tap 3 between the left and right channels.
- `Tap 3 Level` (`key: Tap3Level`, `id: 15`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the level of delay tap 3. To mute a tap, set its Level to 0.0.
- `Tap 4 Scale` (`key: Tap4Delay`, `id: 16`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. For multitap delays, each tap's time is some percentage of the master Time parameter. For example, if Time is set to 500 ms, and T4 Scale is set to 100%, tap 4's delay is also 500ms (or 100% of 500 ms).
- `Tap 4 Pan` (`key: Tap4Pan`, `id: 17`, `type: f`): display range `-100` to `100` Left; default `1`. Raw range `0` to `1`; raw default `1`. Controls the panning of delay tap 4 between the left and right channels.
- `Tap 4 Level` (`key: Tap4Level`, `id: 18`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the level of delay tap 4. To mute a tap, set its Level to 0.0.
- `Mod Mode` (`key: ModulationMode`, `id: 19`, `type: i`): valid values `Off`, `Chorus`, `Vibrato`; default `Chorus`. Raw range `0` to `2`; raw default `1`. Selects the type of modulation applied to the repeats--None (Off), Chorus, or Vibrato.
- `Rate` (`key: Speed`, `id: 20`, `type: f`): display range `0` to `10` unitless; default `1`. Raw range `0` to `1`; raw default `0.1`. Controls the speed or rate of the modulation applied to the repeats.
- `Depth` (`key: Depth`, `id: 21`, `type: f`): display range `0` to `10` unitless; default `3.8`. Raw range `0` to `1`; raw default `0.38`. Controls the depth or intensity of the modulation applied to the repeats.
- `Spread` (`key: Spread`, `id: 22`, `type: f`): display range `0` to `10` unitless; default `5.8`. Raw range `0` to `1`; raw default `0.58`. Subtly controls the apparent stereo width of the modulation.
- `Level` (`key: Level`, `id: 23`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Multitap 6

- Model key: `HD2_DelayMultitap6Stereo`
- Model ID: `81`
- Type: Delay
- Category: `delay`
- Class: Multitap
- DSP usage: 3.0
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Time` (`key: Time`, `id: 1`, `type: f`): display range `0` to `4000` ms; default `1000`. Raw range `0` to `4`; raw default `1`. Adjusts the length of time for the 6-tap delay sequence to repeat. When set to note values, Time follows the system tempo.
- `Feedback` (`key: Feedback`, `id: 2`, `type: f`): display range `0` to `100` %; default `43`. Raw range `0` to `1`; raw default `0.43`. Controls how many times the 6-tap delay sequence repeats. When set to 0%, the sequence is heard only once; at 100%, the sequence cycles forever.
- `Low Cut` (`key: LowCut`, `id: 3`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (or high pass) filter to the repeats, letting you remove the effected signal below a certain frequency.
- `High Cut` (`key: HighCut`, `id: 4`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (or low pass) filter to the repeats, letting you remove the effected signal above a certain frequency.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `40`. Raw range `0` to `1`; raw default `0.4`. Controls the blend between the delay repeats and the dry signal. At 0%, no repeats are heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Tap 1 Scale` (`key: Tap1Delay`, `id: 7`, `type: f`): display range `0` to `100` %; default `10`. Raw range `0` to `1`; raw default `0.1`. For multitap delays, each tap's time is some percentage of the master Time parameter. For example, if Time is set to 1.000 second, and T1 Scale is set to 10%, tap 1's delay is 100ms (or 10% of 1.000 second).
- `Tap 1 Pan` (`key: Tap1Pan`, `id: 8`, `type: f`): display range `-100` to `100` Left; default `0.333`. Raw range `0` to `1`; raw default `0.333`. Controls the panning of delay tap 1 between the left and right channels.
- `Tap 1 Level` (`key: Tap1Level`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the level of delay tap 1. To mute a tap, set its Level to 0.0.
- `Tap 2 Scale` (`key: Tap2Delay`, `id: 10`, `type: f`): display range `0` to `100` %; default `30`. Raw range `0` to `1`; raw default `0.3`. For multitap delays, each tap's time is some percentage of the master Time parameter. For example, if Time is set to 1.000 second, and T2 Scale is set to 30%, tap 2's delay is 300ms (or 30% of 1.000 second).
- `Tap 2 Pan` (`key: Tap2Pan`, `id: 11`, `type: f`): display range `-100` to `100` Left; default `0.666`. Raw range `0` to `1`; raw default `0.666`. Controls the panning of delay tap 2 between the left and right channels.
- `Tap 2 Level` (`key: Tap2Level`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the level of delay tap 2. To mute a tap, set its Level to 0.0.
- `Tap 3 Scale` (`key: Tap3Delay`, `id: 13`, `type: f`): display range `0` to `100` %; default `40`. Raw range `0` to `1`; raw default `0.4`. For multitap delays, each tap's time is some percentage of the master Time parameter. For example, if Time is set to 1.000 second, and T3 Scale is set to 40%, tap 3's delay is 400ms (or 40% of 1.000 second).
- `Tap 3 Pan` (`key: Tap3Pan`, `id: 14`, `type: f`): display range `-100` to `100` Left; default `0.166`. Raw range `0` to `1`; raw default `0.166`. Controls the panning of delay tap 3 between the left and right channels.
- `Tap 3 Level` (`key: Tap3Level`, `id: 15`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the level of delay tap 3. To mute a tap, set its Level to 0.0.
- `Tap 4 Scale` (`key: Tap4Delay`, `id: 16`, `type: f`): display range `0` to `100` %; default `60`. Raw range `0` to `1`; raw default `0.6`. For multitap delays, each tap's time is some percentage of the master Time parameter. For example, if Time is set to 1.000 second, and T4 Scale is set to 60%, tap 4's delay is 600ms (or 60% of 1.000 second).
- `Tap 4 Pan` (`key: Tap4Pan`, `id: 17`, `type: f`): display range `-100` to `100` Left; default `0.666`. Raw range `0` to `1`; raw default `0.666`. Controls the panning of delay tap 4 between the left and right channels.
- `Tap 4 Level` (`key: Tap4Level`, `id: 18`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the level of delay tap 4. To mute a tap, set its Level to 0.0.
- `Tap 5 Scale` (`key: Tap5Delay`, `id: 19`, `type: f`): display range `0` to `100` %; default `82.2`. Raw range `0` to `1`; raw default `0.822`. For multitap delays, each tap's time is some percentage of the master Time parameter. For example, if Time is set to 1.000 second, and T5 Scale is set to 82%, tap 5's delay is 820ms (or 82% of 1.000 second).
- `Tap 5 Pan` (`key: Tap5Pan`, `id: 20`, `type: f`): display range `-100` to `100` Left; default `0`. Raw range `0` to `1`; raw default `0`. Controls the panning of delay tap 5 between the left and right channels.
- `Tap 5 Level` (`key: Tap5Level`, `id: 21`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the level of delay tap 5. To mute a tap, set its Level to 0.0.
- `Tap 6 Scale` (`key: Tap6Delay`, `id: 22`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. For multitap delays, each tap's time is some percentage of the master Time parameter. For example, if Time is set to 1.000 second, and T6 Scale is set to 100%, tap 6's delay is also 1.000 second (or 100% of 1.000 second).
- `Tap 6 Pan` (`key: Tap6Pan`, `id: 23`, `type: f`): display range `-100` to `100` Left; default `1`. Raw range `0` to `1`; raw default `1`. Controls the panning of delay tap 6 between the left and right channels.
- `Tap 6 Level` (`key: Tap6Level`, `id: 24`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the level of delay tap 6. To mute a tap, set its Level to 0.0.

---

## Mutant Filter

- Model key: `HX2_FilterMutantFilterMono`
- Model ID: `19`
- Type: Filter
- Category: `filter`
- Class: Filter
- DSP usage: 1.5
- Based on: Musitronics Mu-Tron III
- Agoura model: No

### Parameters

- `Mode` (`key: Mode`, `id: 1`, `type: i`): valid values `Low Pass`, `Band Pass`, `High Pass`; default `Band Pass`. Raw range `0` to `2`; raw default `1`. Selects the type of filter effect (Low Pass, Band Pass, or High Pass).
- `Peak` (`key: Peak`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the resonance or width of the frequency band affected by the filter.
- `Gain` (`key: Gain`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `1.5`. Raw range `0` to `1`; raw default `0.15`. Adjusts the filter’s sensitivity to the incoming signal.
- `Range` (`key: Range`, `id: 4`, `type: b`): valid values `Low`, `High`; default `Low`. Raw range `Off` to `On`; raw default `Off`. Frequency range of the filter
- `Drive` (`key: Drive`, `id: 5`, `type: b`): valid values `Down`, `Up`; default `Up`. Raw range `Off` to `On`; raw default `On`. Selects whether the filter's cutoff frequency shifts Up or Down in response to the input signal.
- `Mix` (`key: Mix`, `id: 6`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the balance between the filtered and dry signals. At 0%, no filtered signal is heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 7`, `type: f`): display range `-60` to `6` dB; default `1`. Raw range `-60` to `6`; raw default `1`. Sets the overall level of the block.

---

## Mystery Filter

- Model key: `HX2_FilterMysterFilterMono`
- Model ID: `20`
- Type: Filter
- Category: `filter`
- Class: Filter
- DSP usage: 1.6
- Based on: Korg A3
- Agoura model: No

### Parameters

- `Sensitivity` (`key: Sensitivity`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.2`. Raw range `0` to `1`; raw default `0.52`. Controls the filter envelope's input sensitivity. Higher values are more sensitive to your playing dynamics.
- `Frequency` (`key: Frequency`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Sets the highest frequency in the filter sweep. Higher values are more extreme.
- `Resonance` (`key: Resonance`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the resonance or width of the frequency band affected by the filters.
- `Attack` (`key: Attack`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `1.3`. Raw range `0` to `1`; raw default `0.13`. Controls how long it takes for the filter to sweep down (the Attack stage) before sweeping back up (the Release stage). Lower values result in a longer downward filter sweep. Is somewhat interactive with the Sensitivity parameter.
- `Release` (`key: Release`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `9.7`. Raw range `0` to `1`; raw default `0.97`. Controls how long it takes for the filter to sweep back up (the Release Stage) after first sweeping down (the Attack stage).
- `Mix` (`key: Mix`, `id: 6`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the balance between the filtered and dry signals. At 0%, no filtered signal is heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 7`, `type: f`): display range `-60` to `6` dB; default `-1`. Raw range `-60` to `6`; raw default `-1`. Sets the overall level of the block.

---

## Noise Gate

- Model key: `HX2_GateNoiseGateMono`
- Model ID: `21`
- Type: Dynamics
- Category: `dynamics`
- Class: Gate
- DSP usage: 1.1
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Threshold` (`key: Threshold`, `id: 1`, `type: f`): display range `-96` to `0` dB; default `-48`. Raw range `-96` to `0`; raw default `-48`. Sets the noise gate's Threshold. The gate "opens" when the signal's level exceeds the Threshold, to let audio pass through. The gate "closes" when the signal's level drops below the Threshold. Adjust Threshold so only softer, unwanted signals (such as noise or hum) are gated.
- `Decay` (`key: Decay`, `id: 2`, `type: f`): display range `10` to `1000` ms; default `500`. Raw range `0.01` to `1`; raw default `0.5`. Controls the length of time it takes for the open noise gate to close once the signal drops below the Threshold. Increase Decay if you want the gate to gradually lower the signal instead of chopping it off abruptly.
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Nonlinear

- Model key: `HD2_ReverbNonLinearMono`
- Model ID: `496`
- Type: Reverb
- Category: `reverb`
- Class: Spaces
- DSP usage: 9.1
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Decay` (`key: Decay`, `id: 1`, `type: f`): display range `50` to `2000` ms; default `1000`. Raw range `0.05` to `2`; raw default `1`. Sets the decay of the reverb (1.0 ms ~ 2.000 sec). TIP: When set to note values, playing a note/chord 4 beats (Decay set to 1/1) or 2 beats (Decay set to 1/2) before a song transition can cause the reverb to stop right on the downbeat.
- `Predelay` (`key: Predelay`, `id: 2`, `type: f`): display range `0` to `500` ms; default `0`. Raw range `0` to `0.5`; raw default `0`. Controls the amount of delay heard before the audible onset of reverb. Can sometimes result in more definition between the dry and effected signals.
- `Shape` (`key: Shape`, `id: 3`, `type: i`): valid values `Linear`, `Log`, `Inv Log`, `Gauss`, `Inv Gauss`, `Triangle`, `Inv Triangle`, `Full`; default `Log`. Raw range `0` to `7`; raw default `1`. Determines the shape of the reverb's decay. Gauss and Triangle shapes ramp up and then down, Inverse Gauss and Inverse Triangle shapes ramp down and then up, and Full doesn't ramp at all--the reverb is on full blast until the decay length is reached.
- `Late Dry` (`key: Late Dry`, `id: 4`, `type: f`): display range `0` to `100` %; default `0`. Raw range `0` to `1`; raw default `0`. Adds a bit of the original signal as the very last tap. Most audible when playing simple lines with gaussian and triangle shapes.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the reverb and the dry signal. At 0%, no reverb is heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Diffusion` (`key: Diffusion`, `id: 7`, `type: f`): display range `0` to `100` %; default `88`. Raw range `0` to `1`; raw default `0.88`. Controls the amount of smearing between discrete echoes, sometimes resulting in a softer effected signal.
- `Low Cut` (`key: LowCut`, `id: 8`, `type: f`): display range `19.9` to `500` Off; default `80`. Raw range `19.9` to `500`; raw default `80`. Applies a low cut (or high pass) filter to the reverb, letting you remove the effected signal below a certain frequency.
- `High Cut` (`key: HighCut`, `id: 9`, `type: f`): display range `500` to `20100` Hz; default `8600`. Raw range `500` to `20100`; raw default `8600`. Applies a high cut (or low pass) filter to the reverb, letting you remove the effected signal above a certain frequency.
- `Mod` (`key: Mod`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of modulation applied to the reverb.
- `Rate` (`key: Rate`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `0.66`. Raw range `0` to `1`; raw default `0.066`. Controls the rate or speed of modulation applied to the reverb.

---

## Obsidian 7000

- Model key: `HD2_DistObsidian7000Mono`
- Model ID: `333`
- Type: Distortion
- Category: `distortion`
- Class: Distortion
- DSP usage: 4.8
- Based on: Darkglass Electronics Microtubes B7K Ultra
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3.9`. Raw range `0` to `1`; raw default `0.39`. Controls the amount of distortion and saturation applied to the signal.
- `Level` (`key: Level`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the level of the overdriven signal.
- `Blend` (`key: Blend`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Blends in the overdriven signal with the dry, unprocessed signal. At 0.0, no effect is heard.
- `Grunt` (`key: Grunt`, `id: 4`, `type: i`): valid values `Cut`, `Flat`, `Boost`; default `Boost`. Raw range `0` to `2`; raw default `2`. Boosts or cuts low frequencies of the distorted signal. Does not affect the sound when set to "Flat."
- `Attack` (`key: Attack`, `id: 5`, `type: i`): valid values `Cut`, `Flat`, `Boost`; default `Flat`. Raw range `0` to `2`; raw default `1`. Boosts or cuts high frequencies of the distorted signal. Does not affect the sound when set to "Flat."
- `Master` (`key: Master`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Sets the overall level of the block.
- `Bass` (`key: Bass`, `id: 7`, `type: f`): display range `-20` to `20` dB; default `5.5`. Raw range `-20` to `20`; raw default `5.5`. Controls the level of the bass EQ band sent into the distortion.
- `Lo Mid Freq` (`key: LoMidFreq`, `id: 8`, `type: i`): valid values `250 Hz`, `500 Hz`, `1 kHz`; default `250 Hz`. Raw range `0` to `2`; raw default `0`. Sets the frequency of the low mid EQ band sent into the distortion.
- `Lo Mid` (`key: LoMid`, `id: 9`, `type: f`): display range `-15` to `15` dB; default `-5`. Raw range `-15` to `15`; raw default `-5`. Controls the level of the low mid EQ band sent into the distortion.
- `Hi Mid Freq` (`key: HiMidFreq`, `id: 10`, `type: i`): valid values `750 Hz`, `1.5 kHz`, `3 kHz`; default `750 Hz`. Raw range `0` to `2`; raw default `0`. Sets the frequency of the high mid EQ band sent into the distortion.
- `Hi Mid` (`key: HiMid`, `id: 11`, `type: f`): display range `-15` to `15` dB; default `-4.6`. Raw range `-15` to `15`; raw default `-4.6`. Controls the level of the high mid EQ band sent into the distortion.
- `Treble` (`key: Treble`, `id: 12`, `type: f`): display range `-20` to `20` dB; default `-1.4999`. Raw range `-20` to `20`; raw default `-1.4999`. Controls the level of the treble EQ band sent into the distortion.
- `Distortion` (`key: Distortion`, `id: 13`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. Turns the distortion circuit on and off. When off, the EQ parameters remain active.

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

## P35_LooperHelixOneSwitchStereo

- Model key: `P35_LooperHelixOneSwitchStereo`
- Model ID: `826`
- Type: Looper
- Category: `looper`
- Class: Unknown
- DSP usage: 2.3
- Based on: Unknown
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## P35_LooperHelixStereo

- Model key: `P35_LooperHelixStereo`
- Model ID: `827`
- Type: Looper
- Category: `looper`
- Class: Unknown
- DSP usage: 2.7
- Based on: Unknown
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## Pan

- Model key: `HD2_VolPanPanStereo`
- Model ID: `135`
- Type: Volume
- Category: `volume`
- Class: Pan/Image
- DSP usage: 0.9
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Pan` (`key: Pedal`, `id: 1`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the balance between the signal's left and right channels. When set to L 100, only the left signal is passed through the block; when set to R 100, only the right signal is passed through the block.

---

## Parametric

- Model key: `HX2_EQParametricMono`
- Model ID: `413`
- Type: EQ
- Category: `eq`
- Class: Parametric
- DSP usage: 1.9
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Low Cut Enable` (`key: LowCutEnable`, `id: 1`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. Turns the Low Cut filter on and off.
- `Low Cut` (`key: LowCut`, `id: 2`, `type: f`): display range `20` to `20000` Off; default `20`. Raw range `20` to `20000`; raw default `20`. Adjusts the frequency of the Low Cut filter. May be useful in removing undesirable low end rumble.
- `Low Cut Slope` (`key: LowCutSlope`, `id: 3`, `type: i`): valid values `6 dB/oct`, `12 dB/oct`, `18 dB/oct`, `24 dB/oct`; default `12 dB/oct`. Raw range `0` to `3`; raw default `1`. Adjusts the slope of the Low Cut filter. Higher values apply a steeper slope.
- `Low Shelf Enable` (`key: LowShelfEnable`, `id: 11`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. Turns the Low Shelf band on and off.
- `Low Shelf Freq` (`key: LowShelfFreq`, `id: 12`, `type: f`): display range `20` to `20000` Hz; default `80`. Raw range `20` to `20000`; raw default `80`. Adjusts the frequency of the Low Shelf band.
- `Low Shelf Gain` (`key: LowShelfGain`, `id: 13`, `type: f`): display range `-24` to `24` dB; default `0`. Raw range `-24` to `24`; raw default `0`. Adjusts the gain of the Low Shelf band.
- `Low Enable` (`key: LowEnable`, `id: 21`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. Turns the Low band on and off.
- `Low Freq` (`key: LowFreq`, `id: 22`, `type: f`): display range `20` to `20000` Hz; default `150`. Raw range `20` to `20000`; raw default `150`. Adjusts the frequency of the Low Band
- `Low Q` (`key: LowQ`, `id: 23`, `type: f`): display range `0.1` to `20` unitless; default `0.707`. Raw range `0.1` to `20`; raw default `0.707`. Adjusts the bandwidth of the Low band. Lower values apply a wider boost or cut for shaping overall frequency response; higher values apply a precise, surgical boost or cut for accentuating a specific frequency, removing troublesome resonances, or even controlling feedback.
- `Low Gain` (`key: LowGain`, `id: 24`, `type: f`): display range `-24` to `24` dB; default `0`. Raw range `-24` to `24`; raw default `0`. Adjusts the gain of the Low band.
- `Mid Enable` (`key: MidEnable`, `id: 31`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. Turns the Mid band on and off.
- `Mid Freq` (`key: MidFreq`, `id: 32`, `type: f`): display range `20` to `20000` Hz; default `2000`. Raw range `20` to `20000`; raw default `2000`. Adjusts the frequency for the Mid band.
- `Mid Q` (`key: MidQ`, `id: 33`, `type: f`): display range `0.1` to `20` unitless; default `0.707`. Raw range `0.1` to `20`; raw default `0.707`. Adjusts the bandwidth of the Mid band. Lower values apply a wider boost or cut for shaping overall frequency response; higher values apply a precise, surgical boost or cut for accentuating a specific frequency, removing troublesome resonances, or even controlling feedback.
- `Mid Gain` (`key: MidGain`, `id: 34`, `type: f`): display range `-24` to `24` dB; default `0`. Raw range `-24` to `24`; raw default `0`. Adjusts the gain of the Mid band.
- `High Enable` (`key: HighEnable`, `id: 41`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. Turns the high band on and off.
- `High Freq` (`key: HighFreq`, `id: 42`, `type: f`): display range `20` to `20000` Hz; default `5000`. Raw range `20` to `20000`; raw default `5000`. Adjusts the frequency for the High band.
- `High Q` (`key: HighQ`, `id: 43`, `type: f`): display range `0.1` to `20` unitless; default `0.707`. Raw range `0.1` to `20`; raw default `0.707`. Adjusts the bandwidth of the High band. Lower values apply a wider boost or cut for shaping overall frequency response; higher values apply a precise, surgical boost or cut for accentuating a specific frequency, removing troublesome resonances, or even controlling feedback.
- `High Gain` (`key: HighGain`, `id: 44`, `type: f`): display range `-24` to `24` dB; default `0`. Raw range `-24` to `24`; raw default `0`. Adjusts the gain of the High band.
- `High Shelf Enable` (`key: HighShelfEnable`, `id: 51`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. Turns the High Shelf band on and off.
- `High Shelf Freq` (`key: HighShelfFreq`, `id: 52`, `type: f`): display range `20` to `20000` Hz; default `8000`. Raw range `20` to `20000`; raw default `8000`. Adjusts the frequency of the High Shelf band.
- `High Shelf Gain` (`key: HighShelfGain`, `id: 53`, `type: f`): display range `-24` to `24` dB; default `0`. Raw range `-24` to `24`; raw default `0`. Adjusts the gain of the High Shelf band.
- `High Cut Enable` (`key: HighCutEnable`, `id: 61`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. Turns the High Cut filter on and off.
- `High Cut` (`key: HighCut`, `id: 62`, `type: f`): display range `20` to `20000` Hz; default `20000`. Raw range `20` to `20000`; raw default `20000`. Adjusts the frequency of the High Cut filter.
- `High Cut Slope` (`key: HighCutSlope`, `id: 63`, `type: i`): valid values `6 dB/oct`, `12 dB/oct`, `18 dB/oct`, `24 dB/oct`; default `12 dB/oct`. Raw range `0` to `3`; raw default `1`. Controls the slope of the High Cut filter. Higher values apply a steeper slope.
- `Level` (`key: Level`, `id: 71`, `type: f`): display range `-60` to `12` dB; default `0`. Raw range `-60` to `12`; raw default `0`. Sets the overall output level of the EQ block.

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

## Pillars

- Model key: `HD2_DistPillarsMono`
- Model ID: `406`
- Type: Distortion
- Category: `distortion`
- Class: Overdrive
- DSP usage: 3.8
- Based on: Earthquaker Devices Plumes
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.7`. Raw range `0` to `1`; raw default `0.47`. Controls the amount of distortion.
- `Tone` (`key: Tone`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.2`. Raw range `0` to `1`; raw default `0.62`. Controls the overall tonal balance of the distortion. Lower values are darker and higher values are brighter.
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `2`. Raw range `0` to `1`; raw default `0.2`. Sets the overall output level of the block.
- `Mode` (`key: Mode`, `id: 4`, `type: i`): valid values `1`, `2`, `3`; default `1`. Raw range `0` to `2`; raw default `0`. Chooses the type of clipping circuit. 1 is LED, 2 is Clean Op-amp, 3 is Asymmetrical.

---

## Ping Pong

- Model key: `HD2_DelayPingPongStereo`
- Model ID: `83`
- Type: Delay
- Category: `delay`
- Class: Digital
- DSP usage: 2.3
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Time` (`key: Time`, `id: 1`, `type: f`): display range `0` to `8000` ms; default `600`. Raw range `0` to `8`; raw default `0.6`. Adjusts the length of time before the first repeat. When set to note values, Time follows the system tempo.
- `Feedback` (`key: Feedback`, `id: 2`, `type: f`): display range `0` to `100` %; default `40`. Raw range `0` to `1`; raw default `0.4`. Controls the number of delay repeats. When set to 0%, only one repeat is heard; at 100%, the delay repeats forever.
- `Scale` (`key: Scale`, `id: 3`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. For stereo delays, the right side's time is always some percentage of the left sides's time, and is determined by the Scale parameter. For example, if Time is set to 500 ms, and Scale is set to 70%, the left delay is 500 ms and the right delay is 350ms (or 70% of 500 ms). When scale is set to 100%, left and right delays are the same.
- `Spread` (`key: Spread`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the apparent stereo width of the repeats between the left and right channels.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `45`. Raw range `0` to `1`; raw default `0.45`. Controls the blend between the delay repeats and the dry signal. At 0%, no repeats are heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Low Cut` (`key: LowCut`, `id: 7`, `type: f`): display range `19.9` to `500` Off; default `100`. Raw range `19.9` to `500`; raw default `100`. Applies a low cut (or high pass) filter to the repeats, letting you remove the effected signal below a certain frequency.
- `High Cut` (`key: HighCut`, `id: 8`, `type: f`): display range `500` to `20100` Hz; default `8900`. Raw range `500` to `20100`; raw default `8900`. Applies a high cut (or low pass) filter to the repeats, letting you remove the effected signal above a certain frequency.

---

## Pitch Echo

- Model key: `HD2_DelayPitchMono`
- Model ID: `502`
- Type: Delay
- Category: `delay`
- Class: Digital
- DSP usage: 4.2
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Time` (`key: Time`, `id: 1`, `type: f`): display range `0` to `8000` ms; default `250`. Raw range `0` to `8`; raw default `0.25`. Adjusts the length of time before the first repeat. When set to note values, Time follows the system tempo.
- `Feedback` (`key: Feedback`, `id: 2`, `type: f`): display range `0` to `100` %; default `40`. Raw range `0` to `1`; raw default `0.4`. Feedback controls the number of delay repeats. When set to 0%, only one repeat is heard, which is perfect for a simple harmony appearing slightly after your playing (set by the Time parameter). Higher values cause the pitch change to feed back into itself, generating a cascading army of pitched echoes.
- `Interval` (`key: Interval1`, `id: 3`, `type: i`): display range `-13` to `13` unitless; default `5`. Raw range `-13` to `13`; raw default `5`. Sets the interval of the initial repeat and if Feedback is sufficient, the transposition of each subsequent repeat.
- `Cents` (`key: Cents1`, `id: 4`, `type: f`): display range `-50` to `50` unitless; default `0`. Raw range `-50` to `50`; raw default `0`. Sets the fine pitch shift of the initial repeat and if Feedback is sufficient, the shifting of each subsequent repeat.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `40`. Raw range `0` to `1`; raw default `0.4`. Controls the blend between the delay repeats and the dry signal. At 0%, no repeats are heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Low Cut` (`key: LowCut`, `id: 7`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (or high pass) filter to the repeats, letting you remove the effected signal below a certain frequency.
- `High Cut` (`key: HighCut`, `id: 8`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (or low pass) filter to the repeats, letting you remove the effected signal above a certain frequency.

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

## Plateaux

- Model key: `HD2_ReverbPlateauxMono`
- Model ID: `99`
- Type: Reverb
- Category: `reverb`
- Class: Spaces
- DSP usage: 5.4
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Decay` (`key: Decay`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.7`. Raw range `0` to `1`; raw default `0.47`. Adjusts the decay time of the reverb effect.
- `Predelay` (`key: Predelay`, `id: 2`, `type: f`): display range `0` to `200` ms; default `0`. Raw range `0` to `0.2`; raw default `0`. Controls the amount of delay heard before the audible onset of reverb. Can sometimes result in more definition between the dry and effected signals.
- `Tone` (`key: Tone`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Controls the tonal balance of the reverb. Lower values are darker, higher values are brighter.
- `Modulation` (`key: Modulation`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of modulation applied to the reverb.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `33`. Raw range `0` to `1`; raw default `0.33`. Controls the blend between the reverb and the dry signal. At 0%, no reverb is heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Pitch 1` (`key: Pitch1`, `id: 8`, `type: i`): display range `-24` to `24` unitless; default `-12`. Raw range `-24` to `24`; raw default `-12`. Adjusts the first pitch-shifter in semitones, from 2 octaves down to 2 octaves up.
- `Cents 1` (`key: Cents1`, `id: 9`, `type: f`): display range `-50` to `50` unitless; default `-0.8`. Raw range `-50` to `50`; raw default `-0.8`. Adjusts the first pitch-shifter in cents, from -50 to +50
- `Pitch 2` (`key: Pitch2`, `id: 10`, `type: i`): display range `-24` to `24` unitless; default `7`. Raw range `-24` to `24`; raw default `7`. Adjusts the second pitch-shifter in semitones, from 2 octaves down to 2 octaves up.
- `Cents 2` (`key: Cents2`, `id: 11`, `type: f`): display range `-50` to `50` unitless; default `0.4`. Raw range `-50` to `50`; raw default `0.4`. Adjusts the second pitch-shifter in cents, from -50 to +50.
- `Pitch Mix` (`key: PitchMix`, `id: 12`, `type: f`): display range `0` to `100` %; default `24`. Raw range `0` to `1`; raw default `0.24`. Controls the blend between the pitch-shifted signal and dry signal sent to the reverb.

---

## Plugin 1

- Model key: `HD2_PluginMono1`
- Model ID: `416`
- Type: FX Loop
- Category: `fxloop`
- Class: FX Loop
- DSP usage: 0.0
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Send` (`key: Send`, `id: 1`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Send 1 signal. 0.0 dB is unity gain.
- `Return` (`key: Return`, `id: 2`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Return 1 signal. 0.0 dB is unity gain.
- `Mix` (`key: Mix`, `id: 3`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the amount of signal sent through the FX Loop. When connecting time-based pedals like delays or reverbs, it's best to leave the pedal's Mix at 100% and control the amount of the pedal's effect from the FX Loop block's Mix knob; this helps minimize phase issues and latency. For pedals like distortion, fuzz, or compression, it's common to keep the FX Loop's Mix knob at 100% so the entire signal is effected, although parallel processing can be accomplished at lower values.

---

## Plugin 1/2

- Model key: `HD2_PluginStereo1_2`
- Model ID: `262`
- Type: FX Loop
- Category: `fxloop`
- Class: FX Loop
- DSP usage: 0.0
- Based on: Unknown
- Agoura model: No

### Parameters

- `Send` (`key: Send`, `id: 1`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Send 1/2 signal. 0.0 dB is unity gain.
- `Return` (`key: Return`, `id: 2`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Return 1/2 signal. 0.0 dB is unity gain.
- `Mix` (`key: Mix`, `id: 3`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the amount of signal sent through the FX Loop. When connecting time-based pedals like delays or reverbs, it's best to leave the pedal's Mix at 100% and control the amount of the pedal's effect from the FX Loop block's Mix knob; this helps minimize phase issues and latency. For pedals like distortion, fuzz, or compression, it's common to keep the FX Loop's Mix knob at 100% so the entire signal is effected, although parallel processing can be accomplished at lower values.

---

## Plugin 2

- Model key: `HD2_PluginMono2`
- Model ID: `419`
- Type: FX Loop
- Category: `fxloop`
- Class: FX Loop
- DSP usage: 0.0
- Based on: 2x15" MESA/Boogie 2x15 EV
- Agoura model: No

### Parameters

- `Send` (`key: Send`, `id: 1`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Send 2 signal. 0.0 dB is unity gain.
- `Return` (`key: Return`, `id: 2`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Return 2 signal. 0.0 dB is unity gain.
- `Mix` (`key: Mix`, `id: 3`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the amount of signal sent through the FX Loop. When connecting time-based pedals like delays or reverbs, it's best to leave the pedal's Mix at 100% and control the amount of the pedal's effect from the FX Loop block's Mix knob; this helps minimize phase issues and latency. For pedals like distortion, fuzz, or compression, it's common to keep the FX Loop's Mix knob at 100% so the entire signal is effected, although parallel processing can be accomplished at lower values.

---

## Plugin 3

- Model key: `HD2_PluginMono3`
- Model ID: `417`
- Type: FX Loop
- Category: `fxloop`
- Class: FX Loop
- DSP usage: 0.0
- Based on: Unknown
- Agoura model: No

### Parameters

- `Send` (`key: Send`, `id: 1`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Send 3 signal. 0.0 dB is unity gain.
- `Return` (`key: Return`, `id: 2`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Return 3 signal. 0.0 dB is unity gain.
- `Mix` (`key: Mix`, `id: 3`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the amount of signal sent through the FX Loop. When connecting time-based pedals like delays or reverbs, it's best to leave the pedal's Mix at 100% and control the amount of the pedal's effect from the FX Loop block's Mix knob; this helps minimize phase issues and latency. For pedals like distortion, fuzz, or compression, it's common to keep the FX Loop's Mix knob at 100% so the entire signal is effected, although parallel processing can be accomplished at lower values.

---

## Plugin 3/4

- Model key: `HD2_PluginStereo3_4`
- Model ID: `263`
- Type: FX Loop
- Category: `fxloop`
- Class: FX Loop
- DSP usage: 0.0
- Based on: MXR 10-Band Graphic EQ
- Agoura model: No

### Parameters

- `Send` (`key: Send`, `id: 1`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Send signal. 0.0 dB is unity gain.
- `Return` (`key: Return`, `id: 2`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Return signal. 0.0 dB is unity gain.
- `Mix` (`key: Mix`, `id: 3`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the amount of signal sent through the FX Loop. When connecting time-based pedals like delays or reverbs, it's best to leave the pedal's Mix at 100% and control the amount of the pedal's effect from the FX Loop block's Mix knob; this helps minimize phase issues and latency. For pedals like distortion, fuzz, or compression, it's common to keep the FX Loop's Mix knob at 100% so the entire signal is effected, although parallel processing can be accomplished at lower values.

---

## Plugin 4

- Model key: `HD2_PluginMono4`
- Model ID: `418`
- Type: FX Loop
- Category: `fxloop`
- Class: FX Loop
- DSP usage: 0.0
- Based on: Unknown
- Agoura model: No

### Parameters

- `Send` (`key: Send`, `id: 1`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Send 4 signal. 0.0 dB is unity gain.
- `Return` (`key: Return`, `id: 2`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Return 4 signal. 0.0 dB is unity gain.
- `Mix` (`key: Mix`, `id: 3`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the amount of signal sent through the FX Loop. When connecting time-based pedals like delays or reverbs, it's best to leave the pedal's Mix at 100% and control the amount of the pedal's effect from the FX Loop block's Mix knob; this helps minimize phase issues and latency. For pedals like distortion, fuzz, or compression, it's common to keep the FX Loop's Mix knob at 100% so the entire signal is effected, although parallel processing can be accomplished at lower values.

---

## Pocket Fuzz

- Model key: `HD2_DistPocketFuzzMono`
- Model ID: `388`
- Type: Distortion
- Category: `distortion`
- Class: Fuzz
- DSP usage: 2.5
- Based on: Jordan Boss Tone Fuzz
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.94`. Raw range `0` to `1`; raw default `0.494`. Controls the amount of fuzz applied to the signal.
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Sets the overall level of the block.

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

## Poly Sustain

- Model key: `VIC_DelayPolySustain`
- Model ID: `481`
- Type: Delay
- Category: `delay`
- Class: Sustain
- DSP usage: 16.4
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Interval` (`key: Interval`, `id: 1`, `type: i`): display range `-36` to `24` unitless; default `0`. Raw range `-36` to `24`; raw default `0`. Sets the pitch of the sustained note or chord. TIP: This parameter is especially cool for creating massive drones to play over.
- `Attack` (`key: Attack`, `id: 2`, `type: f`): display range `100` to `5000` ms; default `500`. Raw range `0.1` to `5`; raw default `0.5`. Controls the speed at which the sustained note or chord fades in.
- `Decay` (`key: Decay`, `id: 3`, `type: f`): display range `100` to `5000` ms; default `500`. Raw range `0.1` to `5`; raw default `0.5`. Controls the speed at which the sustained note or chord fades out after bypassing the effect.
- `Mod Freq` (`key: ModFreq`, `id: 4`, `type: f`): display range `0.1` to `10` Hz; default `5`. Raw range `0.1` to `10`; raw default `5`. Controls the speed of the built-in modulation.
- `Mod Depth` (`key: ModDepth`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Controls the depth of the built-in modulation.
- `FX Level` (`key: FX Level`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the level of the sustained signal.
- `Rand Depth` (`key: RandDepth`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Higher values increase the randomization of the section of audio being sustained, resulting in a more natural, but less predictable drone.
- `Rand Speed` (`key: RandSpeed`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `1`. Raw range `0` to `1`; raw default `0.1`. Controls how fast the randomization wanders.
- `Level` (`key: Level`, `id: 9`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Auto EQ` (`key: AutoEQ`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Determines how much compensation EQ is applied to the sustained signal. If the sustained signal sounds too harsh when pitched up (or dull when pitched down), adjust this setting to taste. The higher the value, the more EQ is applied at the shift end points; when set to 0.0, no compensation EQ is applied.
- `Operation` (`key: Operation`, `id: 11`, `type: i`): valid values `Mute All`, `Dry Kill`, `Normal`; default `Normal`. Raw range `0` to `2`; raw default `2`. Determines what happens to your signal when Poly Sustain is turned on. When set to "Mute All," THE ENTIRE PATH IS MUTED. When set to "Dry Kill," only the sustained signal is heard. When set to "Normal," both the sustained and dry signals are heard. TIP: With Poly Sustain on a parallel path, assign a second stomp switch to toggle between Mute All and Dry Kill.

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

## Prize Drive

- Model key: `HD2_DistPrizeDriveMono`
- Model ID: `411`
- Type: Distortion
- Category: `distortion`
- Class: Overdrive
- DSP usage: 7.2
- Based on: Nobels ODR-1(bc)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.2`. Raw range `0` to `1`; raw default `0.42`. Controls the amount of distortion.
- `Spectrum` (`key: Spectrum`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `7.4`. Raw range `0` to `1`; raw default `0.74`. When turned down, mids are accentuated; when turned up, lows and highs are accentuated. Could almost be considered a "scoop" control.
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Sets the overall level of the block.
- `Bass Cut` (`key: Bass Cut`, `id: 4`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. When set to "On," slightly attenuates low bass frequencies.
- `Voltage` (`key: Voltage`, `id: 5`, `type: b`): valid values `9V`, `18V`; default `9V`. Raw range `Off` to `On`; raw default `Off`. The original pedal can behave differently depending on how much power it receives. Choose 9V or 18V, the latter of which provides a bit more headroom.

---

## Ratatouille Dist

- Model key: `HD2_DistRatatouilleDistMono`
- Model ID: `390`
- Type: Distortion
- Category: `distortion`
- Class: Distortion
- DSP usage: 4.3
- Based on: Maestro Bass Brassmaster
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `7.42`. Raw range `0` to `1`; raw default `0.742`. Controls the amount of distortion.
- `Filter` (`key: Filter`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `2.8`. Raw range `0` to `1`; raw default `0.28`. Controls the amount of high cut (low pass) filter applied to the distortion, basically letting more treble through (lower values) or filtering it out (higher values).
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.98`. Raw range `0` to `1`; raw default `0.698`. Sets the overall level of the block.

---

## Ratchet

- Model key: `VIC_DelayRatchetMono`
- Model ID: `107`
- Type: Delay
- Category: `delay`
- Class: Digital
- DSP usage: 2.2
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Time` (`key: Time`, `id: 1`, `type: f`): display range `50` to `1000` ms; default `100`. Raw range `0.05` to `1`; raw default `0.1`. Predetermines the length of the audio to be recorded and looped. To loop an entire 4/4 bar, choose 1/1; to stutter your playing, start with 1/16 or 1/32.
- `FX Level` (`key: FX Level`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Sets the level of the Ratchet effect.
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Operation` (`key: Operation`, `id: 4`, `type: i`): valid values `Mute All`, `Dry Kill`, `Normal`; default `Normal`. Raw range `0` to `2`; raw default `2`. Determines what happens to your signal when Ratchet is turned on. When set to "Mute All," THE ENTIRE PATH IS MUTED. When set to "Dry Kill," only the effected signal is heard. When set to "Normal," both the effected and dry signals are heard. TIP: With Ratchet on a parallel path, assign a second stomp switch to toggle between Mute All and Dry Kill.

---

## Red Squeeze

- Model key: `HX2_CompressorRedSqueezeMono`
- Model ID: `36`
- Type: Dynamics
- Category: `dynamics`
- Class: Compress
- DSP usage: 5.0
- Based on: MXR Dyna Comp
- Agoura model: No

### Parameters

- `Sensitivity` (`key: Sensitivity`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.4`. Raw range `0` to `1`; raw default `0.44`. Controls the sensitivity of the compressor's input. Higher values apply more compression.
- `Mix` (`key: Mix`, `id: 2`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the blend between the compressed and dry signals. At 0%, no compressed signal is heard; at 100%, no dry signal is heard. Values in between provide parallel compression.
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `-60` to `12` dB; default `5.4`. Raw range `-60` to `12`; raw default `5.4`. Sets the overall level of the block.

---

## Regal Bass DI

- Model key: `HD2_DistRegalBassDIMono`
- Model ID: `412`
- Type: Distortion
- Category: `distortion`
- Class: Overdrive
- DSP usage: 3.7
- Based on: Nobel Preamp Bass DI
- Agoura model: No

### Parameters

- `Bass` (`key: Bass`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.2`. Raw range `0` to `1`; raw default `0.62`. Adds a 150Hz bass boost to the signal. 0.0 is flat.
- `Treble` (`key: Treble`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Adds a 3.5kHz treble boost to the signal. 0.0 is flat.
- `Low Cut` (`key: Low Cut`, `id: 3`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. Applies a 90Hz low cut (high pass) filter to the signal (6dB/octave).
- `Volume` (`key: Volume`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `2.3`. Raw range `0` to `1`; raw default `0.23`. Controls the overall output level of the DI.

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

## Reverse Delay

- Model key: `HD2_DelayReverseDelayMono`
- Model ID: `121`
- Type: Delay
- Category: `delay`
- Class: Digital
- DSP usage: 2.5
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Time` (`key: Time`, `id: 1`, `type: f`): display range `0` to `4000` ms; default `1000`. Raw range `0` to `4`; raw default `1`. Determines the length of audio captured before playing it backwards. When set to note values, Time follows the system tempo.
- `Feedback` (`key: Feedback`, `id: 2`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the number of reverse delay repeats. When set to 0%, only one reverse repeat is heard; at 100%, the reversed audio repeats forever.
- `Low Cut` (`key: LowCut`, `id: 3`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (or high pass) filter to the repeats, letting you remove the effected signal below a certain frequency.
- `High Cut` (`key: HighCut`, `id: 4`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (or low pass) filter to the repeats, letting you remove the effected signal above a certain frequency.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the delay repeats and the dry signal. At 0%, no repeats are heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Mod Mode` (`key: ModulationMode`, `id: 7`, `type: i`): valid values `Off`, `Chorus`, `Vibrato`; default `Off`. Raw range `0` to `2`; raw default `0`. Selects the type of modulation applied to the repeats--None (Off), Chorus, or Vibrato.
- `Speed` (`key: Speed`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `0.2`. Raw range `0` to `1`; raw default `0.02`. Controls the speed or rate of the modulation applied to the repeats.
- `Depth` (`key: Depth`, `id: 9`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the depth or intensity of the modulation applied to the repeats.

---

## Rochester Comp

- Model key: `HX2_CompressorRochesterCompMono`
- Model ID: `31`
- Type: Dynamics
- Category: `dynamics`
- Class: Compress
- DSP usage: 2.5
- Based on: Ashly CLX-52 (in conjunction w/ B. Sheehan)
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `-15` to `15` dB; default `3`. Raw range `-15` to `15`; raw default `3`. Increases the signal's level to compensate for the reduced level that results from compression.
- `Threshold` (`key: Threshold`, `id: 2`, `type: f`): display range `-40` to `22` dB; default `-24`. Raw range `-40` to `22`; raw default `-24`. Sets the level above which compression is applied. Lower values compress more of the signal; higher values compress only louder parts of the signal.
- `Ratio` (`key: Ratio`, `id: 3`, `type: f`): display range `1` to `40` infinity; default `10`. Raw range `1` to `40`; raw default `10`. Determines how much compression is applied to the signal once it exceeds the Threshold. Higher values mean more compression.
- `Attack` (`key: Attack`, `id: 4`, `type: f`): display range `0.1` to `20` ms; default `10`. Raw range `0.0001` to `0.02`; raw default `0.01`. Controls how quickly compression is applied once the signal exceeds the Threshold. Higher values mean a slower attack, which lets the instrument's initial transient sneak through and only compresses the sustained portion of the signal.
- `Release` (`key: Release`, `id: 5`, `type: f`): display range `100` to `3000` ms; default `100`. Raw range `0.1` to `3`; raw default `0.1`. Controls how quickly the signal returns to unity gain after it returns below the Threshold.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-20` to `20` dB; default `10`. Raw range `-20` to `20`; raw default `10`. Sets the overall level of the block.
- `Knee` (`key: Knee`, `id: 7`, `type: f`): display range `0` to `20` dB; default `0`. Raw range `0` to `20`; raw default `0`. Controls how smoothly compression kicks in. Higher values cause more of a gradual increase in Ratio as the signal approaches the Threshold.
- `Mix` (`key: Mix`, `id: 8`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the blend between the compressed and dry signals. At 0%, no compressed signal is heard; at 100%, no dry signal is heard. Values in between provide parallel compression.

---

## Scream 808

- Model key: `HD2_DistScream808Mono`
- Model ID: `310`
- Type: Distortion
- Category: `distortion`
- Class: Overdrive
- DSP usage: 3.3
- Based on: Ibanez TS808 Tube Screamer
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.2`. Raw range `0` to `1`; raw default `0.52`. Controls the amount of distortion applied to the signal. Low Gain and high Level settings are commonly used to tighten up the signal, especially when pushing higher gain amps.
- `Tone` (`key: Tone`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the overall tonal balance of the distortion. Lower values are darker and higher values are brighter.
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.7`. Raw range `0` to `1`; raw default `0.67`. Sets the overall level of the block. Low Gain and high Level settings are commonly used to tighten up the signal, especially when pushing higher gain amps.

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

## Searchlights

- Model key: `HD2_ReverbSearchlightsMono`
- Model ID: `98`
- Type: Reverb
- Category: `reverb`
- Class: Spaces
- DSP usage: 6.7
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Decay` (`key: Decay`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the decay time of the reverb effect.
- `Predelay` (`key: Predelay`, `id: 2`, `type: f`): display range `0` to `200` ms; default `70`. Raw range `0` to `0.2`; raw default `0.07`. Controls the amount of delay heard before the audible onset of reverb. Can sometimes result in more definition between the dry and effected signals.
- `Low Cut` (`key: LowCut`, `id: 3`, `type: f`): display range `19.9` to `500` Off; default `196`. Raw range `19.9` to `500`; raw default `196`. Applies a low cut (or high pass) filter to the reverb, letting you remove the effected signal below a certain frequency.
- `High Cut` (`key: HighCut`, `id: 4`, `type: f`): display range `500` to `20100` Hz; default `6500`. Raw range `500` to `20100`; raw default `6500`. Applies a high cut (or low pass) filter to the reverb, letting you remove the effected signal above a certain frequency.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `29.0`. Raw range `0` to `1`; raw default `0.29`. Controls the blend between the reverb and the dry signal. At 0%, no reverb is heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Modulation` (`key: Modulation`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Controls the amount of modulation applied to the reverb.
- `Speed` (`key: Speed`, `id: 8`, `type: f`): display range `1` to `10` unitless; default `3.7`. Raw range `0.1` to `1`; raw default `0.37`. Controls the speed of the modulation applied to the reverb.
- `Intensity` (`key: Intensity`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `6.3`. Raw range `0` to `1`; raw default `0.63`. Controls the intensity of the modulation. At higher values, you may hear a phaser-like effect within the reverb.

---

## Shimmer

- Model key: `VIC_ReverbShimmerMono`
- Model ID: `498`
- Type: Reverb
- Category: `reverb`
- Class: Special FX
- DSP usage: 10.2
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Type` (`key: Mode`, `id: 1`, `type: b`): valid values `Luster`, `Sheen`; default `Sheen`. Raw range `Off` to `On`; raw default `On`. Selects the type of shimmer effect applied. "Luster" is more of a traditional, reverb pedal-type shimmer effect with tighter definition in the lustery bits. "Sheen" is more of a lush, studio plugin-type shimmer effect with a massive, sheeny bloom.
- `Pitch A` (`key: Shift1`, `id: 2`, `type: f`): display range `-12` to `12` Oct; default `12`. Raw range `-12` to `12`; raw default `12`. Sets the interval of the first pitch shifter. Set to "Oct Up" for more traditional shimmer sounds; set to "Oct Down" for something a bit creepier. Note that Pitch 1 and Pitch 2 have 0.1 semitone resolution between -1 and +1
- `Pitch B` (`key: Shift2`, `id: 3`, `type: f`): display range `-12` to `12` Oct; default `7`. Raw range `-12` to `12`; raw default `7`. Sets the interval of the second pitch shifter. Set to "Oct Up" for more traditional shimmer sounds; set to "Oct Down" for something a bit creepier. Note that Pitch 1 and Pitch 2 have 0.1 semitone resolution between -1 and +1
- `Intensity` (`key: Intensity`, `id: 4`, `type: f`): display range `0` to `100` %; default `90`. Raw range `0` to `1`; raw default `0.9`. Controls the mix between the pitch-shifted and non-pitch-shifted reverb.
- `Feedback` (`key: Feedback`, `id: 5`, `type: f`): display range `0` to `100` %; default `90`. Raw range `0` to `1`; raw default `0.9`. Controls how many times the pitch shifting recirculates through the reverb.
- `Mix` (`key: Mix`, `id: 6`, `type: f`): display range `0` to `100` %; default `39`. Raw range `0` to `1`; raw default `0.39`. Controls the blend between the reverb and the dry signal. At 0%, no reverb is heard; at 100%, no dry signal is heard.
- `Pitch Blend` (`key: Balance`, `id: 7`, `type: f`): display range `-100` to `100` A; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls how much of Pitch 1 is heard vs. Pitch 2 (set to "Even" by default).
- `Decay` (`key: Decay`, `id: 8`, `type: f`): display range `0.1` to `45.1` ms; default `4`. Raw range `0.1` to `45.1`; raw default `4`. Adjusts the decay of the reverb (0.1 sec ~ 45.0 sec or Infinity)
- `Predelay` (`key: Predelay`, `id: 9`, `type: f`): display range `0` to `200` ms; default `150`. Raw range `0` to `0.2`; raw default `0.15`. Controls the amount of delay heard before the audible onset of reverb. Can sometimes result in more definition between the dry and effected signals.
- `Room Size` (`key: RoomSize`, `id: 10`, `type: i`): valid values `10 m`, `20 m`, `30 m`; default `30 m`. Raw range `0` to `2`; raw default `2`. Selects the size of the room (10, 20, or 30 meters).
- `Damping` (`key: Damping`, `id: 11`, `type: f`): display range `500` to `20000` Hz; default `5000`. Raw range `500` to `20000`; raw default `5000`. Determines the frequency above which the reverb will be absorbed. For example, if your hall is full of people wearing shimmery astronaut costumes, more high frequencies would be absorbed than if the room were empty.
- `Diffusion` (`key: Diffusion`, `id: 12`, `type: f`): display range `0` to `100` %; default `70`. Raw range `0` to `1`; raw default `0.7`. Controls the amount of smearing between discrete echoes, sometimes resulting in a softer effected signal.
- `Motion` (`key: Motion`, `id: 13`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Controls the amount of randomization, which can be helpful to minimize any metallic artifacts common in static reverbs. At higher values, can impart a bit of modulation to the effected signal.
- `Low Cut` (`key: LowCut`, `id: 14`, `type: f`): display range `19.9` to `1000` Off; default `120`. Raw range `19.9` to `1000`; raw default `120`. Applies a low cut (or high pass) filter to the reverb, letting you remove the effected signal below a certain frequency.
- `High Cut` (`key: HighCut`, `id: 15`, `type: f`): display range `500` to `20100` Hz; default `6300`. Raw range `500` to `20100`; raw default `6300`. Applies a high cut (or low pass) filter to the reverb, letting you remove the effected signal above a certain frequency
- `Level` (`key: Level`, `id: 16`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Shuffling Looper

- Model key: `VIC_LooperShufflingMono`
- Model ID: `814`
- Type: Looper
- Category: `looper`
- Class: Unknown
- DSP usage: 2.3
- Based on: Unknown
- Agoura model: No

### Parameters

- `Slices` (`key: Slices`, `id: 1`, `type: i`): valid values `2`, `3`, `4`, `6`, `8`, `12`, `16`, `24`, `32`; default `8`. Raw range `0` to `8`; raw default `4`. Changes the number of slices your loop will be chopped into.
- `Seq Length` (`key: SeqLength`, `id: 2`, `type: i`): valid values `2`, `3`, `4`, `6`, `8`, `12`, `16`, `24`, `32`; default `8`. Raw range `0` to `8`; raw default `4`. Determines the number of slices in the sequence. This can be changed even after recording a loop.
- `Shuffle` (`key: Shuffle`, `id: 3`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Determines the likelihood of slices shuffling/reordering. At 0%, the slices never shuffle; at 100%, they're constantly reshuffling.
- `Pitch` (`key: Pitch`, `id: 4`, `type: f`): display range `0` to `100` %; default `20`. Raw range `0` to `1`; raw default `0.2`. Determines the likelihood of slices playing back an interval higher or lower.
- `Reverse` (`key: Reverse`, `id: 5`, `type: f`): display range `0` to `100` %; default `30`. Raw range `0` to `1`; raw default `0.3`. Determines the likelihood of slices playing backward. At 0%, all slices play forward; at 100% all slices play backward.
- `Repeat` (`key: Repeat`, `id: 6`, `type: f`): display range `0` to `100` %; default `20`. Raw range `0` to `1`; raw default `0.2`. Determines the likelihood of slices repeating. At 0%, no slices repeat; at 100%, all slices repeat.
- `Smoothing` (`key: Smoothing`, `id: 7`, `type: f`): display range `0` to `50` %; default `10`. Raw range `0` to `0.5`; raw default `0.1`. Higher values apply smoothing between slices and can give a synth-pad type quality, lower values maintain transients. Or set it just high enough to avoid pops and clicks.
- `Seq Drift` (`key: Seq Drift`, `id: 8`, `type: f`): display range `0` to `100` %; default `0`. Raw range `0` to `1`; raw default `0`. Determines the likelihood of the entire slice sequence changing every time it loops around. When set to 0%, the same sequence repeats forever; when set to 100%, the sequence changes completely every time it loops.
- `Playback` (`key: Playback`, `id: 9`, `type: f`): display range `-60` to `0` dB; default `0`. Raw range `-60` to `0`; raw default `0`. Sets the overall level of the block.
- `Low Cut` (`key: Low Cut`, `id: 10`, `type: f`): display range `20` to `500` Hz; default `20`. Raw range `20` to `500`; raw default `20`. Applies a low cut (or high pass) filter to the loop, letting you remove the looper signal below a certain frequency.
- `High Cut` (`key: High Cut`, `id: 11`, `type: f`): display range `500` to `20000` Hz; default `20000`. Raw range `500` to `20000`; raw default `20000`. Applies a high cut (or low pass) filter to the loop, letting you remove the looper signal above a certain frequency.
- `Interval 1` (`key: Interval 1`, `id: 12`, `type: i`): display range `-12` to `12` unitless; default `-12`. Raw range `-12` to `12`; raw default `-12`. Sets the pitch of some slices, the likelihood of which is determined by the Pitch parameter (from one octave down to one octave up).
- `Interval 2` (`key: Interval 2`, `id: 13`, `type: i`): display range `-12` to `12` unitless; default `12`. Raw range `-12` to `12`; raw default `12`. Sets the pitch of other slices, the likelihood of which is determined by the Pitch parameter (from -1 octave to +1 octave).

---

## Simple Delay

- Model key: `HD2_DelaySimpleDelayMono`
- Model ID: `125`
- Type: Delay
- Category: `delay`
- Class: Digital
- DSP usage: 1.6
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Time` (`key: Time`, `id: 1`, `type: f`): display range `0` to `8000` ms; default `600`. Raw range `0` to `8`; raw default `0.6`. Adjusts the length of time before the first repeat. When set to note values, Time follows the system tempo.
- `Feedback` (`key: Feedback`, `id: 2`, `type: f`): display range `0` to `100` %; default `35`. Raw range `0` to `1`; raw default `0.35`. Controls the number of delay repeats. When set to 0%, only one repeat is heard; at 100%, the delay repeats forever.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `40`. Raw range `0` to `1`; raw default `0.4`. Controls the blend between the delay repeats and the dry signal. At 0%, no repeats are heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

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

## Stereo Imager

- Model key: `HD2_VolPanStereoImagerStereo`
- Model ID: `247`
- Type: Volume
- Category: `volume`
- Class: Pan/Image
- DSP usage: 1.8
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Mode` (`key: Mode`, `id: 1`, `type: b`): valid values `Mono In`, `Stereo In`; default `Stereo In`. Raw range `Off` to `On`; raw default `On`. Specifies the type of signal sent to the Stereo Imager block. When set to "Mono In", the signal is collapsed to mono before any stereo processing.
- `Width` (`key: Width`, `id: 2`, `type: f`): display range `0` to `200` %; default `150`. Raw range `0` to `2`; raw default `1.5`. Controls the apparent stereo width of the signal. Values greater than 100% increase the signal's apparent stereo width. Values less than 100% narrow the signal's stereo width. At 0%, the signal is collapsed to mono.
- `Pan` (`key: Rotation`, `id: 3`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the balance between the signal's left and right channels. When set to L 100, only the left signal is passed through the block; when set to R 100, only the right signal is passed through the block.
- `Level` (`key: Level`, `id: 4`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Stereo Width

- Model key: `HD2_VolPanStereoWidthStereo`
- Model ID: `201`
- Type: Volume
- Category: `volume`
- Class: Pan/Image
- DSP usage: 1.1
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Width` (`key: Width`, `id: 1`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the apparent stereo width of the signal. When set to "Center," the signal is collapsed to mono. When set to "Wide,", the signal maintains its stereo width.
- `LR In Swap` (`key: LR In Swap`, `id: 2`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When set to "On," swaps the position of left and right channels, so the left signal appears on the right and the right signal appears on the left.
- `Balance` (`key: Balance`, `id: 3`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the balance between the signal's left and right channels. When set to L 100, only the left signal is passed through the block; when set to R 100, only the right signal is passed through the block.
- `Level` (`key: Level`, `id: 4`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `R Polarity` (`key: R Polarity`, `id: 5`, `type: b`): valid values `Normal`, `Inverted`; default `Normal`. Raw range `Off` to `On`; raw default `Off`. Inverts the polarity of the right signal.

---

## Stupor OD

- Model key: `HD2_DistStuporODMono`
- Model ID: `332`
- Type: Distortion
- Category: `distortion`
- Class: Overdrive
- DSP usage: 3.1
- Based on: BOSS SD-1 Overdrive
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.3`. Raw range `0` to `1`; raw default `0.63`. Controls the amount of overdrive applied to the signal.
- `Tone` (`key: Tone`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the overall tonal balance of the distortion. Lower values are darker and higher values are brighter.
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Sets the overall level of the block.

---

## Swedish Chainsaw

- Model key: `HD2_DistSwedishChainsawMono`
- Model ID: `385`
- Type: Distortion
- Category: `distortion`
- Class: Distortion
- DSP usage: 2.9
- Based on: BOSS HM-2 Heavy Metal Distortion (MIJ)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.2`. Raw range `0` to `1`; raw default `0.62`. Controls the amount of distortion applied to the signal.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the distortion.
- `Treble` (`key: Treble`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the high frequency EQ of the distortion.
- `Level` (`key: Level`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Sets the overall level of the block.

---

## Sweep Echo

- Model key: `HD2_DelaySweepEchoMono`
- Model ID: `119`
- Type: Delay
- Category: `delay`
- Class: Special FX
- DSP usage: 3.5
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Time` (`key: Time`, `id: 1`, `type: f`): display range `0` to `8000` ms; default `450`. Raw range `0` to `8`; raw default `0.45`. Adjusts the length of time before the first repeat. When set to note values, Time follows the system tempo.
- `Feedback` (`key: Feedback`, `id: 2`, `type: f`): display range `0` to `100` %; default `58.0`. Raw range `0` to `1`; raw default `0.58`. Feedback controls the number of delay repeats. When set to 0%, only one repeat is heard. At high values, the delay taps may begin to self-oscillate and squeal (perhaps in a good way).
- `Low Cut` (`key: LowCut`, `id: 3`, `type: f`): display range `19.9` to `500` Off; default `120`. Raw range `19.9` to `500`; raw default `120`. Applies a low cut (or high pass) filter to the repeats, letting you remove the effected signal below a certain frequency.
- `High Cut` (`key: HighCut`, `id: 4`, `type: f`): display range `500` to `20100` Hz; default `8000`. Raw range `500` to `20100`; raw default `8000`. Applies a high cut (or low pass) filter to the repeats, letting you remove the effected signal above a certain frequency.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Controls the blend between the delay repeats and the dry signal. At 0%, no repeats are heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Filter` (`key: FilterType`, `id: 7`, `type: i`): valid values `Low Pass`, `Band Pass`, `High Pass`; default `Band Pass`. Raw range `0` to `2`; raw default `1`. Selects the type of filter applied to the repeats--Low Pass (High Cut), Band Pass, or High Pass (Low Cut).
- `Shape` (`key: SweepShape`, `id: 8`, `type: i`): valid values `Triangle`, `Sine`, `Square`, `Inverse Sine`, `Exponential`, `Random`; default `Triangle`. Raw range `0` to `5`; raw default `0`. Selects the wave shape of the filter modulation applied to the repeats.
- `Rate` (`key: SweepSpeed`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `3.4`. Raw range `0` to `1`; raw default `0.34`. Controls the speed or rate of the modulation applied to the repeats. When set to 0.0, Rate freezes the current filter frequency.
- `Start Freq` (`key: SweepStart`, `id: 10`, `type: f`): display range `40` to `465` Hz; default `205`. Raw range `40` to `465`; raw default `205`. Sets the lowest frequency in the sweep modulation.
- `Range` (`key: SweepDepth`, `id: 11`, `type: f`): display range `0` to `3250` Hz; default `2830`. Raw range `0` to `3250`; raw default `2830`. Determines how high the modulation sweeps.
- `Resonance` (`key: SweepResonance`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the resonance or width of the frequency band affected by the filters.
- `Duty Cycle` (`key: SweepSymmetry`, `id: 13`, `type: f`): display range `0` to `100` %; default `50`. Raw range `0` to `1`; raw default `0.5`. Alters the modulation wave shape in differing ways. For example, when Shape is set to "Triangle," 50% is a normal triangle wave and extreme values warp the wave toward a saw down (0%) or saw up (100%) shape. Or with Sine, 50% is a normal sine wave and extreme values warp the wave toward a parabolic down (0%) or parabolic up (100%) shape.
- `Headroom` (`key: Headroom`, `id: 14`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Provides up to 12.0 dB of additional headroom.

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

## Teemah!

- Model key: `HD2_DistTeemahMono`
- Model ID: `327`
- Type: Distortion
- Category: `distortion`
- Class: Distortion
- DSP usage: 3.0
- Based on: Paul Cochrane Timmy Overdrive
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.2`. Raw range `0` to `1`; raw default `0.52`. Controls the amount of overdrive applied to the signal.
- `Bass Cut` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Cuts low end frequencies from the signal before the overdrive circuit.
- `Treble Cut` (`key: Treble`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Cuts high end frequencies from the signal after the overdrive circuit.
- `Clipping` (`key: Clipping`, `id: 4`, `type: i`): valid values `Up`, `Center`, `Down`; default `Up`. Raw range `0` to `2`; raw default `0`. Selects the clipping mode. "Up" provides asymmetrical clipping with a bit of compression and saturation. "Center" provides symmetrical clipping with a bit of saturation and high headroom. "Down" is similar to "Center" except with more saturation and lower headroom.
- `Level` (`key: Level`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `6.3`. Raw range `0` to `1`; raw default `0.63`. Sets the overall level of the block.

---

## Tesselator

- Model key: `VIC_DelayStutterEditMono`
- Model ID: `106`
- Type: Delay
- Category: `delay`
- Class: Digital
- DSP usage: 2.2
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `First` (`key: First`, `id: 1`, `type: f`): display range `50` to `1000` ms; default `100`. Raw range `0.05` to `1`; raw default `0.1`. Determines the length of the repeats at the beginning of the sequence, that is, the length of repeated audio when the block is first engaged. When set to note values, First (Time) follows the system tempo.
- `Last` (`key: Last`, `id: 2`, `type: f`): display range `50` to `1000` ms; default `200`. Raw range `0.05` to `1`; raw default `0.2`. Determines the length of the repeats at the end of the sequence. If shorter than the First step's time, the sequence will get shorter; if longer than the First step's time, the sequence will get longer. If First and Last are the same time, the sequence length remains constant. When set to note values, Last (Time) follows the system tempo.
- `Steps` (`key: Steps`, `id: 3`, `type: i`): display range `1` to `50` unitless; default `8`. Raw range `1` to `50`; raw default `8`. Determines how many steps there are in the sequence (1 to 50), with steps in the middle interpolating repeat length, speed/pitch, and/or filter cutoff. For example, if your first step is 100 ms and your last step is 500 ms, each successive step in the sequence will interpolate between 100 ms and 500 ms.
- `Direction` (`key: Direction`, `id: 4`, `type: i`): valid values `Forward`, `Reverse`, `Fwd/Rev`; default `Forward`. Raw range `0` to `2`; raw default `0`. Determines the direction of the repeats. "Forward" makes each repeat play back normally. "Reverse" causes repeats to play back in reverse. "Fwd/Rev" alternates between forward and reverse.
- `Boomerang` (`key: Boomerang`, `id: 5`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, the sequence plays forward, then backward, then forward again, etc. When off, the end of the sequence repeats indefinitely.
- `Operation` (`key: Operation`, `id: 6`, `type: i`): valid values `Mute All`, `Dry Kill`, `Normal`; default `Normal`. Raw range `0` to `2`; raw default `2`. Determines what happens to your signal when Tesselator is turned on. When set to "Mute All," THE ENTIRE PATH IS MUTED. When set to "Dry Kill," only the effected signal is heard. When set to "Normal," both the effected and dry signals are heard. TIP: With Tesselator on a parallel path, assign a second stomp switch to toggle between Mute All and Dry Kill.
- `Ramp` (`key: Ramp`, `id: 7`, `type: i`): valid values `Speed`, `Pitch`; default `Speed`. Raw range `0` to `1`; raw default `0`. Determines whether any speed/pitch changes across the sequence reference a static or semitone value. "Speed" sets the target speed of the last step; use the Speed parameter to set the specific value (0% ~ 200% speed). "Pitch" sets the target pitch of the last step; use the Pitch parameter to set the value (-12 ~ +12 semitones).
- `Speed` (`key: Speed`, `id: 8`, `type: f`): display range `0` to `200` %; default `100`. Raw range `0` to `2`; raw default `1`. Sets the speed for the last step in the sequence. For example, if set to 200%, the last step's speed will be twice as fast as the first step and if set to 0%, the last step will appear to stop completely, almost like a glitchy tape stop effect. Disabled unless Ramp is set to "Speed."
- `Pitch` (`key: Pitch`, `id: 9`, `type: i`): display range `-12` to `12` unitless; default `0`. Raw range `-12` to `12`; raw default `0`. Sets the pitch shift for the last step in semitones. For example, if set to -12, the last step will be an octave lower than the first step. Disabled unless Ramp is set to "Pitch."
- `HP Filter` (`key: HP Filter`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Controls the high-pass (low cut) filter frequency for the last step. For example, if set to a higher value, each successive step will filter out more bass until the last step of the sequence.
- `LP Filter` (`key: LP Filter`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the low-pass (high cut) filter frequency for the last step. For example, if set to a lower value, each successive step will filter out more treble until the last step of the sequence.
- `FX Level` (`key: FX Level`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the level of the effected signal.
- `Level` (`key: Level`, `id: 13`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Thrifter Fuzz

- Model key: `HD2_DistThrifterFuzzMono`
- Model ID: `338`
- Type: Distortion
- Category: `distortion`
- Class: Fuzz
- DSP usage: 5.1
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the amount of fuzz applied to the signal. Can also affect tone, depending on the Attack knob's setting.
- `Attack` (`key: Attack`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3.6`. Raw range `0` to `1`; raw default `0.36`. Increases the apparent attack of the signal, providing transient punch and a bit of additional gain.
- `Notch Freq` (`key: Notch Freq`, `id: 3`, `type: f`): display range `200` to `2500` Hz; default `1600`. Raw range `200` to `2500`; raw default `1600`. Adjusts the frequency at which the Notch Gain boosts or cuts.
- `Notch Gain` (`key: Notch Gain`, `id: 4`, `type: f`): display range `-10` to `10` dB; default `-3.4`. Raw range `-10` to `10`; raw default `-3.4`. Cuts or boosts the signal at the Notch Frequency.
- `Thick` (`key: Thick`, `id: 5`, `type: i`): valid values `Off`, `On`; default `On`. Raw range `0` to `1`; raw default `1`. Adds a bit more thickness and low end to the fuzz, particularly if Drive is set lower.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Sets the overall level of the block.

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

## Tilt

- Model key: `HD2_EQSimpleTiltMono`
- Model ID: `373`
- Type: EQ
- Category: `eq`
- Class: Tilt
- DSP usage: 1.5
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Tilt` (`key: Tilt`, `id: 1`, `type: f`): display range `-100` to `100` Dark; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Values above "Flat" boost high frequencies while simultaneously cutting low frequencies; values below "Flat" boost low frequencies while simultaneously cutting high frequencies. Great for quickly making tones a bit brighter or darker with the minimum of fuss.
- `Center Freq` (`key: CenterFreq`, `id: 2`, `type: f`): display range `100` to `5000` Hz; default `1000`. Raw range `100` to `5000`; raw default `1000`. Adjusts the frequency around which the boost and cut pivot.
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `-60` to `12` dB; default `0`. Raw range `-60` to `12`; raw default `0`. Sets the overall level of the block.

---

## Tone Sovereign

- Model key: `HD2_DistToneSovereignMono`
- Model ID: `377`
- Type: Distortion
- Category: `distortion`
- Class: Distortion
- DSP usage: 5.4
- Based on: Analogman King of Tone
- Agoura model: No

### Parameters

- `Gain 1` (`key: Gain 1`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of Gain 1 drive applied to the signal.
- `Tone 1` (`key: Tone 1`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the overall tonal balance of Gain 1. Lower values are darker and higher values are brighter.
- `Presence 1` (`key: Presence 1`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Adds a bit more high end sparkle to Gain 1.
- `Clipping 1` (`key: Clipping 1`, `id: 4`, `type: i`): valid values `Overdrive`, `Boost`, `Distortion`; default `Boost`. Raw range `0` to `2`; raw default `1`. Selects the clipping mode for Gain 1. "Overdrive" has a touch of drive and compression. "Clean" is less compressed than "Overdrive" and is ideal for boosting your signal into an amp; it's the default setting for Gain 1. "Distortion" provides even more drive and compression.
- `Gain Mod 1` (`key: GainMod 1`, `id: 5`, `type: i`): valid values `Normal`, `Higher`; default `Normal`. Raw range `0` to `1`; raw default `0`. The original pedal has different variations available, one with more gain ("Higher").
- `Level 1` (`key: Level 1`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Sets the overall output level of Gain 1.
- `Gain 2` (`key: Gain 2`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of Gain 2 drive applied to the signal.
- `Tone 2` (`key: Tone 2`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the overall tonal balance of Gain 2. Lower values are darker and higher values are brighter.
- `Presence 2` (`key: Presence 2`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Adds a bit more high end sparkle to Gain 2.
- `Clipping 2` (`key: Clipping 2`, `id: 10`, `type: i`): valid values `Overdrive`, `Boost`, `Distortion`; default `Overdrive`. Raw range `0` to `2`; raw default `0`. Selects the clipping mode for Gain 2. "Overdrive" has a touch of drive and compression; it's the default setting for Gain 2. "Clean" is less compressed than "Overdrive" and is ideal for boosting your signal into an amp. "Distortion" provides even more drive and compression.
- `Gain Mod 2` (`key: GainMod 2`, `id: 11`, `type: i`): valid values `Normal`, `Higher`; default `Higher`. Raw range `0` to `1`; raw default `1`. The original pedal has different variations available, one with more gain ("Higher").
- `Level 2` (`key: Level 2`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Sets the overall output level of Gain 2.
- `Voltage` (`key: Voltage`, `id: 70`, `type: b`): valid values `9V`, `18V`; default `9V`. Raw range `Off` to `On`; raw default `Off`. The original pedal was designed to be powered by a 9V power supply but could alternatively accommodate 18V, which would provide a bit more headroom. This is especially apparent when Clipping is set to "Boost" and Gain is turned up.

---

## Top Secret OD

- Model key: `HD2_DistTopSecretODMono`
- Model ID: `306`
- Type: Distortion
- Category: `distortion`
- Class: Overdrive
- DSP usage: 2.4
- Based on: DOD OD-250
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the amount of overdrive applied to the signal.
- `Level` (`key: Level`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `8.3`. Raw range `0` to `1`; raw default `0.83`. Sets the overall level of the block.

---

## Transistor Tape

- Model key: `HD2_DelayTransistorTapeMono`
- Model ID: `116`
- Type: Delay
- Category: `delay`
- Class: Tape
- DSP usage: 3.5
- Based on: Maestro Echoplex EP-3
- Agoura model: No

### Parameters

- `Time` (`key: Time`, `id: 1`, `type: f`): display range `0` to `2000` ms; default `507`. Raw range `0` to `2`; raw default `0.507`. Adjusts the length of time before the first repeat. When set to note values, Time follows the system tempo.
- `Feedback` (`key: Feedback`, `id: 2`, `type: f`): display range `0` to `100` %; default `54`. Raw range `0` to `1`; raw default `0.54`. Controls the number of delay repeats. When set to 0%, only one repeat is heard. At high values, the Delay may begin to self-oscillate and squeal (perhaps in a good way).
- `Wow/Flutter` (`key: WowFlutter`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `3.6`. Raw range `0` to `1`; raw default `0.36`. Controls how much warbly tape sound is heard. Lower values result in the sound of a tape echo in pristine condition; higher values result in the sound of a tape echo that may have seen one too many trips in the back of a van.
- `Mix` (`key: Mix`, `id: 4`, `type: f`): display range `0` to `100` %; default `40`. Raw range `0` to `1`; raw default `0.4`. Controls the blend between the delay repeats and the dry signal. At 0%, no repeats are heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 5`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Headroom` (`key: Headroom`, `id: 9`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Some delay devices' internal signal paths exhibit a bit of grit, especially when placed after a high-gain amp block. Negative values increase the perceived amount of grit; positive values clean things up a bit.

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

## Triangle Fuzz

- Model key: `HD2_DistTriangleFuzzMono`
- Model ID: `300`
- Type: Distortion
- Category: `distortion`
- Class: Fuzz
- DSP usage: 3.5
- Based on: Electro-Harmonix Big Muff Pi
- Agoura model: No

### Parameters

- `Sustain` (`key: Sustain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `8.3`. Raw range `0` to `1`; raw default `0.83`. Controls the amount of sustain and fuzz applied to the signal.
- `Tone` (`key: Tone`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.6`. Raw range `0` to `1`; raw default `0.56`. Controls the overall tonal balance of the fuzz. Lower values are darker and higher values are brighter.
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `8.1`. Raw range `0` to `1`; raw default `0.81`. Sets the overall level of the block.

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

## Tycoctavia Fuzz

- Model key: `HD2_DistTycoctaviaFuzzMono`
- Model ID: `309`
- Type: Distortion
- Category: `distortion`
- Class: Fuzz
- DSP usage: 2.9
- Based on: Tycobrahe Octavia
- Agoura model: No

### Parameters

- `Fuzz` (`key: Fuzz`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the amount of fuzz applied to the signal.
- `Level` (`key: Level`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.7`. Raw range `0` to `1`; raw default `0.67`. Sets the overall level of the block.

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

## VIC_DelayGlitchStereo

- Model key: `VIC_DelayGlitchStereo`
- Model ID: `43`
- Type: Delay
- Category: `delay`
- Class: Unknown
- DSP usage: 3.7
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## VIC_DelayRatchetStereo

- Model key: `VIC_DelayRatchetStereo`
- Model ID: `41`
- Type: Delay
- Category: `delay`
- Class: Unknown
- DSP usage: 3.0
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## VIC_DelayStutterEditStereo

- Model key: `VIC_DelayStutterEditStereo`
- Model ID: `42`
- Type: Delay
- Category: `delay`
- Class: Unknown
- DSP usage: 2.8
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## VIC_DynPlateStereo

- Model key: `VIC_DynPlateStereo`
- Model ID: `486`
- Type: Reverb
- Category: `reverb`
- Class: Unknown
- DSP usage: 11.1
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

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

## VIC_LooperShufflingStereo

- Model key: `VIC_LooperShufflingStereo`
- Model ID: `815`
- Type: Looper
- Category: `looper`
- Class: Unknown
- DSP usage: 2.4
- Based on: Unknown
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

## VIC_ReverbDynAmbienceStereo

- Model key: `VIC_ReverbDynAmbienceStereo`
- Model ID: `60`
- Type: Reverb
- Category: `reverb`
- Class: Unknown
- DSP usage: 5.9
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## VIC_ReverbDynBloomStereo

- Model key: `VIC_ReverbDynBloomStereo`
- Model ID: `494`
- Type: Reverb
- Category: `reverb`
- Class: Unknown
- DSP usage: 14.2
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## VIC_ReverbDynRoomStereo

- Model key: `VIC_ReverbDynRoomStereo`
- Model ID: `59`
- Type: Reverb
- Category: `reverb`
- Class: Unknown
- DSP usage: 9.3
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## VIC_ReverbRotatingStereo

- Model key: `VIC_ReverbRotatingStereo`
- Model ID: `485`
- Type: Reverb
- Category: `reverb`
- Class: Unknown
- DSP usage: 8.2
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## VIC_ReverbShimmerStereo

- Model key: `VIC_ReverbShimmerStereo`
- Model ID: `484`
- Type: Reverb
- Category: `reverb`
- Class: Unknown
- DSP usage: 10.2
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## Valve Driver

- Model key: `HD2_DistValveDriverMono`
- Model ID: `286`
- Type: Distortion
- Category: `distortion`
- Class: Overdrive
- DSP usage: 5.3
- Based on: Chandler Tube Driver
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the amount of overdrive applied to the signal.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the low frequency EQ of the overdrive.
- `Treble` (`key: Treble`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the high frequency EQ of the overdrive.
- `Level` (`key: Level`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.6`. Raw range `0` to `1`; raw default `0.66`. Sets the overall level of the block.

---

## Vermin Dist

- Model key: `HD2_DistVerminDistMono`
- Model ID: `307`
- Type: Distortion
- Category: `distortion`
- Class: Distortion
- DSP usage: 2.5
- Based on: Pro Co RAT
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.8`. Raw range `0` to `1`; raw default `0.68`. Controls the amount of distortion applied to the signal.
- `Filter` (`key: Filter`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Applies a filter which gives you brighter tone at lower settings, and darker tone at higher settings.
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `8.5`. Raw range `0` to `1`; raw default `0.85`. Sets the overall level of the block.

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

## Vintage Digital

- Model key: `HD2_DelayVintageDigitalMonoV2`
- Model ID: `115`
- Type: Delay
- Category: `delay`
- Class: Digital
- DSP usage: 2.7
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Time` (`key: Time`, `id: 1`, `type: f`): display range `0` to `8000` ms; default `500`. Raw range `0` to `8`; raw default `0.5`. Time adjusts the length of time before the first repeat. When set to note values, Time follows the system tempo.
- `Feedback` (`key: Feedback`, `id: 2`, `type: f`): display range `0` to `100` %; default `45`. Raw range `0` to `1`; raw default `0.45`. Controls the number of delay repeats. When set to 0%, only one repeat is heard; at 100%, the delay repeats forever.
- `Bit Depth` (`key: BitDepth`, `id: 3`, `type: i`): valid values `6`, `8`, `10`, `11`, `12`, `14`, `16`, `24`; default `12`. Raw range `0` to `7`; raw default `4`. Lowers the bit depth of the repeats for a grungier sound. For more transparent results, set to 24 bits.
- `Sample Rate` (`key: SampleRate`, `id: 4`, `type: i`): valid values `8 kHz`, `11.025 kHz`, `12 kHz`, `16 kHz`, `22.05 kHz`, `24 kHz`, `44.1 kHz`, `48 kHz`; default `16 kHz`. Raw range `0` to `7`; raw default `3`. Lowers the sample rate of the repeats for a grungier, more vintage digital sound. For more transparent results, set to 48kHz.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `45`. Raw range `0` to `1`; raw default `0.45`. Controls the blend between the delay repeats and the dry signal. At 0%, no repeats are heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Rate` (`key: Rate`, `id: 7`, `type: f`): display range `0.1` to `8` Hz; default `0.2`. Raw range `0.1` to `8`; raw default `0.2`. Controls the speed or rate of the pitch modulation applied to the repeats.
- `Depth` (`key: Depth`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `2`. Raw range `0` to `1`; raw default `0.2`. Controls the depth or intensity of the pitch modulation applied to the repeats.
- `Headroom` (`key: Headroom`, `id: 9`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Some older rackmount delays' internal signal paths exhibit a bit of grit, especially when placed after a high-gain amp block. Negative values increase the perceived amount of grit; positive values clean things up a bit.

---

## Vintage Swell

- Model key: `HD2_DelaySwellVintageDigitalMono`
- Model ID: `117`
- Type: Delay
- Category: `delay`
- Class: Digital
- DSP usage: 2.8
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Time` (`key: Time`, `id: 1`, `type: f`): display range `0` to `8000` ms; default `500`. Raw range `0` to `8`; raw default `0.5`. Time adjusts the length of time before the first repeat. When set to note values, Time follows the system tempo.
- `Feedback` (`key: Feedback`, `id: 2`, `type: f`): display range `0` to `100` %; default `75`. Raw range `0` to `1`; raw default `0.75`. Controls the number of delay repeats. When set to 0%, only one repeat is heard; at 100%, the delay repeats forever.
- `Bit Depth` (`key: BitDepth`, `id: 3`, `type: i`): valid values `6`, `8`, `10`, `11`, `12`, `14`, `16`, `24`; default `24`. Raw range `0` to `7`; raw default `7`. Lowers the bit depth of the repeats for a grungier sound. For more transparent results, set to 24 bits.
- `Sample Rate` (`key: SampleRate`, `id: 4`, `type: i`): valid values `8 kHz`, `11.025 kHz`, `12 kHz`, `16 kHz`, `22.05 kHz`, `24 kHz`, `44.1 kHz`, `48 kHz`; default `48 kHz`. Raw range `0` to `7`; raw default `7`. Lowers the sample rate of the repeats for a grungier, more vintage digital sound. For more transparent results, set to 48kHz.
- `Mix` (`key: Mix`, `id: 5`, `type: f`): display range `0` to `100` %; default `45`. Raw range `0` to `1`; raw default `0.45`. Controls the blend between the delay repeats and the dry signal. At 0%, no repeats are heard; at 100%, no dry signal is heard.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.
- `Rate` (`key: Rate`, `id: 7`, `type: f`): display range `0.1` to `8` Hz; default `0.2`. Raw range `0.1` to `8`; raw default `0.2`. Controls the speed or rate of the pitch modulation applied to the repeats.
- `Depth` (`key: Depth`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `2`. Raw range `0` to `1`; raw default `0.2`. Controls the depth or intensity of the pitch modulation applied to the repeats.
- `Headroom` (`key: Headroom`, `id: 9`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Some older rackmount delays' internal signal paths exhibit a bit of grit, especially when placed after a high-gain amp block. Negative values increase the perceived amount of grit; positive values clean things up a bit.
- `Threshold` (`key: Threshold`, `id: 10`, `type: f`): display range `-96` to `0` dB; default `-60`. Raw range `-96` to `0`; raw default `-60`. Sets the level below which the volume swell resets.
- `Attack` (`key: Attack`, `id: 11`, `type: f`): display range `100` to `5000` ms; default `1000`. Raw range `0.1` to `5`; raw default `1`. Sets the ramp time for the volume swell applied to the dry signal, and therefore, any delay repeats.

---

## Vital Boost

- Model key: `HD2_DistVitalBoostMono`
- Model ID: `405`
- Type: Distortion
- Category: `distortion`
- Class: Boost
- DSP usage: 2.9
- Based on: Earthquaker Devices Life - Boost circuit
- Agoura model: No

### Parameters

- `Boost` (`key: Boost`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Sets the output level of the boost circuit.

---

## Vital Dist

- Model key: `HD2_DistVitalDistMono`
- Model ID: `404`
- Type: Distortion
- Category: `distortion`
- Class: Distortion
- DSP usage: 7.8
- Based on: Earthquaker Devices Life - Octave/Distortion circuit
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the amount of distortion.
- `Filter` (`key: Filter`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Applies a high cut (or low pass) filter to the signal, letting you remove treble frequencies. At 0.0, no filter is applied.
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Sets the overall level of the block.
- `Clipping` (`key: Clipping`, `id: 4`, `type: i`): valid values `Opamp`, `Asymmetric`, `Symmetric`; default `Opamp`. Raw range `0` to `2`; raw default `0`. Chooses the type of clipping circuit. Choose Op-amp, Asymmetrical, or Symmetrical.
- `Octave` (`key: Octave`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Blends in a signal one octave up. At 0.0, no octave signal is heard. Works best when playing single notes.

---

## Volume Pedal

- Model key: `HD2_VolPanVolMono`
- Model ID: `268`
- Type: Volume
- Category: `volume`
- Class: Volume Pedal
- DSP usage: 0.8
- Based on: N/A
- Agoura model: No

### Parameters

- `Position` (`key: Pedal`, `id: 1`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Adjusts the position of the Volume Pedal. By default, this is assigned to Expression Pedal 2.
- `Curve` (`key: VolumeTaper`, `id: 2`, `type: b`): valid values `Linear`, `Logarithmic`; default `Linear`. Raw range `Off` to `On`; raw default `Off`. Sets the Volume Pedal's taper to "Linear" (consistent level change across the pedal's travel) or "Logarithmic" (concave curve, with more control toward the heel and faster changes toward the toe)

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

---

## Wringer Fuzz

- Model key: `HD2_DistWringerFuzzMono`
- Model ID: `330`
- Type: Distortion
- Category: `distortion`
- Class: Fuzz
- DSP usage: 4.5
- Based on: Garbageâs modded BOSS FZ-2
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the amount of fuzz applied to the signal.
- `Treble` (`key: Treble`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ of the fuzz.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the fuzz.
- `Level` (`key: Level`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Sets the overall level of the block.
- `Fuzz Type` (`key: FuzzType`, `id: 5`, `type: i`): valid values `Fuzz 1`, `Fuzz 2`; default `Fuzz 1`. Raw range `0` to `1`; raw default `0`. Selects the type of fuzz circuit. Type 1 emphasizes the midrange and upper harmonics. Type 2 has more of a scooped frequency response.

---

## Xenomorph Fuzz

- Model key: `HD2_DistXenomorphFuzzMono`
- Model ID: `379`
- Type: Distortion
- Category: `distortion`
- Class: Fuzz
- DSP usage: 4.6
- Based on: Subdecay Harmonic Antagonizer
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `8.75`. Raw range `0` to `1`; raw default `0.875`. Even at 0.0, Gain is buzzy, fuzzy, and nasty. Higher values provide longer sustain.
- `Tone` (`key: Tone`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the tone or timbre of the fuzz.
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.78`. Raw range `0` to `1`; raw default `0.578`. Controls the overall output of the fuzz.
- `Clipping` (`key: Clipping`, `id: 4`, `type: i`): valid values `Soft`, `Hard`; default `Hard`. Raw range `0` to `1`; raw default `1`. Selects the clipping type--Soft or Hard.
- `Osc Level` (`key: OscLevel`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `6.38`. Raw range `0` to `1`; raw default `0.638`. Controls the level of the triggered oscillator.
- `Osc Tone` (`key: OscTone`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the tonal balance of the triggered oscillator. Higher values provide more harmonics.
- `Min Freq` (`key: MinFreq`, `id: 7`, `type: f`): display range `0` to `6000` Hz; default `55`. Raw range `0` to `6000`; raw default `55`. Sets the minimum frequency of the oscillator.
- `Max Freq` (`key: MaxFreq`, `id: 8`, `type: f`): display range `0` to `6000` Hz; default `880`. Raw range `0` to `6000`; raw default `880`. Sets the maximum frequency of the oscillator.
- `Wave Shape` (`key: WaveShape`, `id: 9`, `type: i`): valid values `Triangle`, `Sine`, `Square`; default `Square`. Raw range `0` to `2`; raw default `2`. Selects the wave shape of the triggered oscillator.
- `Sensitivity` (`key: Sensitivity`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the oscillator's filter envelope. Higher values drives the oscillator into higher frequencies.

---

## ZeroAmp Bass DI

- Model key: `HD2_DistZeroAmpBassDIMono`
- Model ID: `376`
- Type: Distortion
- Category: `distortion`
- Class: Overdrive
- DSP usage: 3.5
- Based on: Tech 21 SansAmp Bass Driver DI V1
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the input sensitivity as well as the amount of gain and overdrive applied to the signal.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.9`. Raw range `0` to `1`; raw default `0.59`. Controls the low frequency EQ of the overdrive.
- `Treble` (`key: Treble`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Controls the high frequency EQ of the overdrive.
- `Presence` (`key: Presence`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adds upper harmonic content and increases attack.
- `Blend` (`key: Blend`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the blend between the tube amp emulation circuitry and the dry signal. The Bass and Treble knobs remain active, even when Blend is set to 0.0.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `4.8`. Raw range `0` to `1`; raw default `0.48`. Sets the overall level of the block.
