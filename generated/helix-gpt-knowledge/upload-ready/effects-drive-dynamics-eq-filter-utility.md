# Effects: drive, dynamics, EQ, filter, and utility

Upload-ready knowledge for distortion, dynamics, EQ, filter, FX Loop, looper, and volume/pan blocks.

Generated from the installed Helix Stadium desktop app bundle on 2026-05-07T22:33:14.224003+00:00.

Use display values for normal user-facing answers. Use model keys, IDs, and raw ranges only when the user asks for automation or low-level control details.

Model count: 155

---

## 1 Switch Looper

- Model key: `P35_LooperHelixOneSwitchMono`
- Model ID: `825`
- Type: Looper
- Category: `looper`
- Class: Unknown
- DSP usage estimate: 2.3
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
- DSP usage estimate: 1.7
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

## 3-Band Comp

- Model key: `HX2_Compressor3BandCompMono`
- Model ID: `38`
- Type: Dynamics
- Category: `dynamics`
- Class: 3-Band
- DSP usage estimate: 3.2
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Sidechain` (`key: ControlSource`, `id: 1`, `type: i`): valid values `Off`, `Instrument 1`, `Instrument 2`, `Mic`, `Return 1`, `Return 2`, `Return 3`, `Return 4`, `USB 3`, `USB 4`, `USB 5`, `USB 6`, `USB 7`, `USB 8`; default `Off`. Raw range `0` to `13`; raw default `0`.
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

## Acoustic Sim

- Model key: `L6SPB_AcousGtrSimMono`
- Model ID: `384`
- Type: EQ
- Category: `eq`
- Class: Acoustic Sim
- DSP usage estimate: 2.7
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Mode` (`key: Mode`, `id: 1`, `type: i`): valid values `Standard`, `Jumbo`, `Enhanced`, `Piezo`; default `Standard`. Raw range `0` to `3`; raw default `0`. Selects one of four acoustic guitar sounds: Standard is a traditional acoustic guitar, Jumbo is larger and fuller, Enhanced has a more prominent attack for cutting through a mix, and Piezo approximates the sound of a piezo pickup installed on the guitar.
- `Body` (`key: Body`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adds body resonance, which can provide additional fullness or fatness.
- `Top` (`key: Top`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Accentuates higher end string attack and harmonics.
- `Shimmer` (`key: Shimmer`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `2`. Raw range `0` to `1`; raw default `0.2`. Imparts some motion to the harmonics, reminiscent of how a string's vibration tends to affect the other strings.
- `Level` (`key: Level`, `id: 5`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Alpaca Rouge

- Model key: `HD2_DistAlpacaRougeMono`
- Model ID: `380`
- Type: Distortion
- Category: `distortion`
- Class: Distortion
- DSP usage estimate: 3.6
- Based on: Carvin VLD1 Legacy Drive (Hi Gain Channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3.4`. Raw range `0` to `1`; raw default `0.34`. Controls the amount of distortion applied to the signal.
- `High Cut` (`key: HiCut`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Lower values apply more cut, which makes the sound a bit darker. Higher values apply less cut, which makes the sound a bit brighter.
- `Level` (`key: Volume`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Sets the overall level of the block.

---

## Ampeg Opto Comp

- Model key: `HX2_CompressorOptoCompMono`
- Model ID: `32`
- Type: Dynamics
- Category: `dynamics`
- Class: Compress
- DSP usage estimate: 4.0
- Based on: Ampeg Opto Comp Compressor
- Agoura model: No

### Parameters

- `Sidechain` (`key: ControlSource`, `id: 1`, `type: i`): valid values `Off`, `Instrument 1`, `Instrument 2`, `Mic`, `Return 1`, `Return 2`, `Return 3`, `Return 4`, `USB 3`, `USB 4`, `USB 5`, `USB 6`, `USB 7`, `USB 8`; default `Off`. Raw range `0` to `13`; raw default `0`.
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
- DSP usage estimate: 6.7
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
- DSP usage estimate: 2.5
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
- DSP usage estimate: 5.7
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
- DSP usage estimate: 1.6
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Sidechain` (`key: ControlSource`, `id: 1`, `type: i`): valid values `Off`, `Instrument 1`, `Instrument 2`, `Mic`, `Return 1`, `Return 2`, `Return 3`, `Return 4`, `USB 3`, `USB 4`, `USB 5`, `USB 6`, `USB 7`, `USB 8`; default `Off`. Raw range `0` to `13`; raw default `0`.
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
- DSP usage estimate: 2.0
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Sidechain` (`key: ControlSource`, `id: 1`, `type: i`): valid values `Off`, `Instrument 1`, `Instrument 2`, `Mic`, `Return 1`, `Return 2`, `Return 3`, `Return 4`, `USB 3`, `USB 4`, `USB 5`, `USB 6`, `USB 7`, `USB 8`; default `Off`. Raw range `0` to `13`; raw default `0`.
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
- DSP usage estimate: 6.2
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
- DSP usage estimate: 4.0
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
- DSP usage estimate: 2.6
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

## Cali Q Graphic

- Model key: `HD2_CaliQMono`
- Model ID: `331`
- Type: EQ
- Category: `eq`
- Class: Graphic
- DSP usage estimate: 1.9
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

## Clawthorn Drive

- Model key: `HD2_DistClawthornDriveMono`
- Model ID: `334`
- Type: Distortion
- Category: `distortion`
- Class: Distortion
- DSP usage estimate: 5.5
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

## Compulsive Drive

- Model key: `HD2_DistCompulsiveDriveMono`
- Model ID: `305`
- Type: Distortion
- Category: `distortion`
- Class: Distortion
- DSP usage estimate: 2.1
- Based on: Fulltone OCD
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.6`. Raw range `0` to `1`; raw default `0.66`. Controls the amount of distortion applied to the signal.
- `Tone` (`key: Tone`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the overall tonal balance of the distortion. Lower values are darker and higher values are brighter.
- `Peak Type` (`key: LPHP`, `id: 3`, `type: b`): valid values `Low`, `High`; default `Low`. Raw range `Off` to `On`; raw default `Off`. Low is more transparent, and better for a clean boost. High has more distortion, volume, and exhibits a slight bump in the midrange.
- `Version` (`key: Version`, `id: 4`, `type: b`): valid values `V2`, `V4`; default `V2`. Raw range `Off` to `On`; raw default `Off`. Selects which version of the original pedal to emulate--V2 or V4. V4 has a slight upper mid boost and a bit more sustain.
- `Level` (`key: Level`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the output level of the distortion.

---

## Dark Dove Fuzz

- Model key: `HD2_DistDarkDoveFuzzMono`
- Model ID: `410`
- Type: Distortion
- Category: `distortion`
- Class: Fuzz
- DSP usage estimate: 4.9
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
- DSP usage estimate: 4.0
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
- DSP usage estimate: 4.3
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
- DSP usage estimate: 2.1
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Sidechain` (`key: ControlSource`, `id: 1`, `type: i`): valid values `Off`, `Instrument 1`, `Instrument 2`, `Mic`, `Return 1`, `Return 2`, `Return 3`, `Return 4`, `USB 3`, `USB 4`, `USB 5`, `USB 6`, `USB 7`, `USB 8`; default `Off`. Raw range `0` to `13`; raw default `0`.
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
- DSP usage estimate: 2.7
- Based on: Unknown
- Agoura model: No

### Parameters

- `Playback` (`key: Playback`, `id: 1`, `type: f`): display range `-60` to `0` dB; default `0`. Raw range `-60` to `0`; raw default `0`. Controls the level of looper playback. You may find it useful to turn this down a bit so your live guitar can be slightly louder.
- `Overdub` (`key: Overdub`, `id: 2`, `type: f`): display range `-60` to `0` dB; default `0`. Raw range `-60` to `0`; raw default `0`. Controls the level of your loop *relatively, over time* while overdubbing. For example, if Overdub is set to 90%, each time your loop repeats, its volume will be reduced by 10%, sounding quieter and quieter with each overdub pass.
- `Low Cut` (`key: lowCut`, `id: 3`, `type: f`): display range `20` to `500` Hz; default `20`. Raw range `20` to `500`; raw default `20`. Applies a low cut (high pass) filter to loop playback, letting you remove the effected signal below a certain frequency. Filtering your loop can sometimes improve the mix with your live instrument.
- `High Cut` (`key: highCut`, `id: 4`, `type: f`): display range `500` to `20000` Hz; default `20000`. Raw range `500` to `20000`; raw default `20000`. Applies a high cut (low pass) filter to loop playback, letting you remove the effected signal above a certain frequency. Filtering your loop can sometimes improve the mix with your live instrument.

---

## Deranged Master

- Model key: `HD2_DistDerangedMasterMono`
- Model ID: `368`
- Type: Distortion
- Category: `distortion`
- Class: Overdrive
- DSP usage estimate: 2.7
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
- DSP usage estimate: 25.3
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

## Dyhana Drive

- Model key: `HD2_DistDhyanaDriveMono`
- Model ID: `371`
- Type: Distortion
- Category: `distortion`
- Class: Distortion
- DSP usage estimate: 3.2
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.4`. Raw range `0` to `1`; raw default `0.44`. Controls the amount of distortion applied to the signal.
- `Voice` (`key: Voice`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.6`. Raw range `0` to `1`; raw default `0.56`. Lower values result in a warmer and softer sound. Higher values provide more punchiness, clarity, treble, and gain.
- `Tone` (`key: Tone`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.4`. Raw range `0` to `1`; raw default `0.44`. Controls the overall tonal balance of the distortion. Lower values are darker and higher values are brighter.
- `Level` (`key: Level`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Sets the overall level of the block.

---

## FX Loop 1

- Model key: `HD2_FXLoopMono1`
- Model ID: `277`
- Type: FX Loop
- Category: `fxloop`
- Class: FX Loop
- DSP usage estimate: 1.3
- Based on: N/A
- Agoura model: No

### Parameters

- `Send` (`key: Send`, `id: 1`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Send 1 signal. 0.0 dB is unity gain.
- `Return` (`key: Return`, `id: 2`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Return 1 signal. 0.0 dB is unity gain.
- `Mix` (`key: Mix`, `id: 3`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the amount of signal sent through the FX Loop. When connecting time-based pedals like delays or reverbs, it's best to leave the pedal's Mix at 100% and control the amount of the pedal's effect from the FX Loop block's Mix knob; this helps minimize phase issues and latency. For pedals like distortion, fuzz, or compression, it's common to keep the FX Loop's Mix knob at 100% so the entire signal is effected, although parallel processing can be accomplished at lower values.
- `Trails` (`key: Trails`, `id: 1`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`.

---

## FX Loop 1/2

- Model key: `HD2_FXLoopStereo1_2`
- Model ID: `143`
- Type: FX Loop
- Category: `fxloop`
- Class: FX Loop
- DSP usage estimate: 1.5
- Based on: N/A
- Agoura model: No

### Parameters

- `Send` (`key: Send`, `id: 1`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Send 1/2 signal. 0.0 dB is unity gain.
- `Return` (`key: Return`, `id: 2`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Return 1/2 signal. 0.0 dB is unity gain.
- `Mix` (`key: Mix`, `id: 3`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the amount of signal sent through the FX Loop. When connecting time-based pedals like delays or reverbs, it's best to leave the pedal's Mix at 100% and control the amount of the pedal's effect from the FX Loop block's Mix knob; this helps minimize phase issues and latency. For pedals like distortion, fuzz, or compression, it's common to keep the FX Loop's Mix knob at 100% so the entire signal is effected, although parallel processing can be accomplished at lower values.
- `Trails` (`key: Trails`, `id: 1`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`.

---

## FX Loop 2

- Model key: `HD2_FXLoopMono2`
- Model ID: `278`
- Type: FX Loop
- Category: `fxloop`
- Class: FX Loop
- DSP usage estimate: 1.3
- Based on: N/A
- Agoura model: No

### Parameters

- `Send` (`key: Send`, `id: 1`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Send 2 signal. 0.0 dB is unity gain.
- `Return` (`key: Return`, `id: 2`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Return 2 signal. 0.0 dB is unity gain.
- `Mix` (`key: Mix`, `id: 3`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the amount of signal sent through the FX Loop. When connecting time-based pedals like delays or reverbs, it's best to leave the pedal's Mix at 100% and control the amount of the pedal's effect from the FX Loop block's Mix knob; this helps minimize phase issues and latency. For pedals like distortion, fuzz, or compression, it's common to keep the FX Loop's Mix knob at 100% so the entire signal is effected, although parallel processing can be accomplished at lower values.
- `Trails` (`key: Trails`, `id: 1`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`.

---

## FX Loop 3

- Model key: `HD2_FXLoopMono3`
- Model ID: `279`
- Type: FX Loop
- Category: `fxloop`
- Class: FX Loop
- DSP usage estimate: 1.3
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Send` (`key: Send`, `id: 1`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Send 3 signal. 0.0 dB is unity gain.
- `Return` (`key: Return`, `id: 2`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Return 3 signal. 0.0 dB is unity gain.
- `Mix` (`key: Mix`, `id: 3`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the amount of signal sent through the FX Loop. When connecting time-based pedals like delays or reverbs, it's best to leave the pedal's Mix at 100% and control the amount of the pedal's effect from the FX Loop block's Mix knob; this helps minimize phase issues and latency. For pedals like distortion, fuzz, or compression, it's common to keep the FX Loop's Mix knob at 100% so the entire signal is effected, although parallel processing can be accomplished at lower values.
- `Trails` (`key: Trails`, `id: 1`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`.

---

## FX Loop 3/4

- Model key: `HD2_FXLoopStereo3_4`
- Model ID: `144`
- Type: FX Loop
- Category: `fxloop`
- Class: FX Loop
- DSP usage estimate: 1.5
- Based on: N/A
- Agoura model: No

### Parameters

- `Send` (`key: Send`, `id: 1`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Send 3/4 signal. 0.0 dB is unity gain.
- `Return` (`key: Return`, `id: 2`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Return 3/4 signal. 0.0 dB is unity gain.
- `Mix` (`key: Mix`, `id: 3`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the amount of signal sent through the FX Loop. When connecting time-based pedals like delays or reverbs, it's best to leave the pedal's Mix at 100% and control the amount of the pedal's effect from the FX Loop block's Mix knob; this helps minimize phase issues and latency. For pedals like distortion, fuzz, or compression, it's common to keep the FX Loop's Mix knob at 100% so the entire signal is effected, although parallel processing can be accomplished at lower values.
- `Trails` (`key: Trails`, `id: 1`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`.

---

## FX Loop 4

- Model key: `HD2_FXLoopMono4`
- Model ID: `280`
- Type: FX Loop
- Category: `fxloop`
- Class: FX Loop
- DSP usage estimate: 1.3
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Send` (`key: Send`, `id: 1`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Send 4 signal. 0.0 dB is unity gain.
- `Return` (`key: Return`, `id: 2`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the level of the Return 4 signal. 0.0 dB is unity gain.
- `Mix` (`key: Mix`, `id: 3`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the amount of signal sent through the FX Loop. When connecting time-based pedals like delays or reverbs, it's best to leave the pedal's Mix at 100% and control the amount of the pedal's effect from the FX Loop block's Mix knob; this helps minimize phase issues and latency. For pedals like distortion, fuzz, or compression, it's common to keep the FX Loop's Mix knob at 100% so the entire signal is effected, although parallel processing can be accomplished at lower values.
- `Trails` (`key: Trails`, `id: 1`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`.

---

## Feedbacker

- Model key: `VIC_FeedbackSim`
- Model ID: `482`
- Type: Dynamics
- Category: `dynamics`
- Class: Feedbacker
- DSP usage estimate: 9.9
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

## Gain

- Model key: `HD2_VolPanGainMono`
- Model ID: `282`
- Type: Volume
- Category: `volume`
- Class: Gain
- DSP usage estimate: 0.8
- Based on: Vox AC-15 Tremolo
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `-120` to `12` dB; default `0`. Raw range `-120` to `12`; raw default `0`. Sets the amount of gain. Unity is 0.0 dB. Values above 0.0 dB provide an ultra-transparent boost. A value of -120.0 dB effectively mutes the signal passing though the block.

---

## HD2_CaliQStereo

- Model key: `HD2_CaliQStereo`
- Model ID: `196`
- Type: EQ
- Category: `eq`
- Class: Unknown
- DSP usage estimate: 2.4
- Based on: MESA/Boogie Mark IV Graphic EQ
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
- DSP usage estimate: 5.5
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
- DSP usage estimate: 12.9
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
- DSP usage estimate: 3.9
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
- DSP usage estimate: 11.7
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
- DSP usage estimate: 4.4
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
- DSP usage estimate: 10.8
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
- DSP usage estimate: 3.7
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
- DSP usage estimate: 9.0
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
- DSP usage estimate: 6.4
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
- DSP usage estimate: 7.9
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
- DSP usage estimate: 4.1
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
- DSP usage estimate: 5.1
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
- DSP usage estimate: 4.2
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
- DSP usage estimate: 5.3
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
- DSP usage estimate: 11.2
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
- DSP usage estimate: 10.8
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
- DSP usage estimate: 5.9
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
- DSP usage estimate: 5.3
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
- DSP usage estimate: 14.0
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
- DSP usage estimate: 2.5
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
- DSP usage estimate: 8.6
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
- DSP usage estimate: 8.1
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
- DSP usage estimate: 6.5
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
- DSP usage estimate: 4.0
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
- DSP usage estimate: 13.7
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
- DSP usage estimate: 6.8
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
- DSP usage estimate: 8.0
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
- DSP usage estimate: 6.2
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
- DSP usage estimate: 4.8
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
- DSP usage estimate: 5.2
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
- DSP usage estimate: 4.7
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
- DSP usage estimate: 4.8
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
- DSP usage estimate: 9.2
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
- DSP usage estimate: 9.9
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
- DSP usage estimate: 3.7
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
- DSP usage estimate: 5.3
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
- DSP usage estimate: 4.3
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
- DSP usage estimate: 9.6
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
- DSP usage estimate: 3.4
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
- DSP usage estimate: 4.6
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
- DSP usage estimate: 15.0
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
- DSP usage estimate: 8.3
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
- DSP usage estimate: 7.7
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
- DSP usage estimate: 5.4
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
- DSP usage estimate: 2.2
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
- DSP usage estimate: 1.5
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
- DSP usage estimate: 7.2
- Based on: Moog Moogerfooger MF-105M MuRF Filter
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
- DSP usage estimate: 0.9
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
- DSP usage estimate: 0.9
- Based on: Line 6 Original
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
- DSP usage estimate: 5.8
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
- DSP usage estimate: 1.7
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
- DSP usage estimate: 2.6
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
- DSP usage estimate: 7.3
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
- DSP usage estimate: 6.5
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
- DSP usage estimate: 6.5
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
- DSP usage estimate: 8.8
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
- DSP usage estimate: 3.5
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
- DSP usage estimate: 2.0
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
- DSP usage estimate: 2.1
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
- DSP usage estimate: 1.9
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
- DSP usage estimate: 1.9
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
- DSP usage estimate: 1.8
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
- DSP usage estimate: 2.4
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
- DSP usage estimate: 1.3
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
- DSP usage estimate: 1.2
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Sidechain` (`key: ControlSource`, `id: 1`, `type: i`): valid values `Off`, `Instrument 1`, `Instrument 2`, `Mic`, `Return 1`, `Return 2`, `Return 3`, `Return 4`, `USB 3`, `USB 4`, `USB 5`, `USB 6`, `USB 7`, `USB 8`; default `Off`. Raw range `0` to `13`; raw default `0`.
- `Open Threshold` (`key: OpenThreshold`, `id: 1`, `type: f`): display range `-96` to `0` dB; default `-50`. Raw range `-96` to `0`; raw default `-50`. Sets the level above which the gate "opens," or passes signal through.
- `Close Threshold` (`key: CloseThreshold`, `id: 2`, `type: f`): display range `-96` to `0` dB; default `-60`. Raw range `-96` to `0`; raw default `-60`. Sets the level below which the gate "closes," or stops signal from passing through.
- `Hold Time` (`key: HoldTime`, `id: 3`, `type: f`): display range `10` to `800` ms; default `10`. Raw range `0.01` to `0.8`; raw default `0.01`. Adjusts the length of time after the signal drops below the Close threshold before it is gated. Increase Hold Time if your playing is chopped off too soon.
- `Decay` (`key: Decay`, `id: 4`, `type: f`): display range `10` to `4000` ms; default `10`. Raw range `0.01` to `4`; raw default `0.01`. Controls the length of time it takes for the open noise gate to close once the signal drops below the Close level/threshold. Increase Decay if you want the gate to gradually lower the signal instead of chopping it off abruptly.
- `Level` (`key: Level`, `id: 5`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Hedgehog D9

- Model key: `HD2_DistHedgehogD9Mono`
- Model ID: `287`
- Type: Distortion
- Category: `distortion`
- Class: Distortion
- DSP usage estimate: 2.6
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
- DSP usage estimate: 3.5
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

## Horizon Drive

- Model key: `HD2_DistHorizonDriveMono`
- Model ID: `386`
- Type: Distortion
- Category: `distortion`
- Class: Overdrive
- DSP usage estimate: 6.1
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
- DSP usage estimate: 1.7
- Based on: Horizon Precision Drive - Gate Circuit
- Agoura model: No

### Parameters

- `Sidechain` (`key: ControlSource`, `id: 1`, `type: i`): valid values `Off`, `Instrument 1`, `Instrument 2`, `Mic`, `Return 1`, `Return 2`, `Return 3`, `Return 4`, `USB 3`, `USB 4`, `USB 5`, `USB 6`, `USB 7`, `USB 8`; default `Off`. Raw range `0` to `13`; raw default `0`.
- `Mode` (`key: Mode`, `id: 1`, `type: i`): valid values `Bass`, `Guitar`; default `Guitar`. Raw range `0` to `1`; raw default `1`. Determines whether the gate's response is optimized for bass or guitar.
- `Sensitivity` (`key: Sensitivity`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `8.46`. Raw range `0` to `1`; raw default `0.846`. Lower values eliminate most noise without affecting your tone; higher values can tighten up your bass response, at the expense of note articulation. Note that Horizon Gate isn't a traditional gate as much as it's a dynamic high shelf EQ filter that squashes high end noise while letting lower end signals continue to decay naturally.
- `Gate Range` (`key: Gate Range`, `id: 3`, `type: b`): valid values `Authentic`, `Extended`; default `Authentic`. Raw range `Off` to `On`; raw default `Off`. Determines the range of the dynamic high shelf EQ filter, or how far the signal's high end is attenuated while the gate is active. When set to "Extended," drops the gate's threshold down to -90 dB, which is more attenuation than the real pedal.
- `Level` (`key: Level`, `id: 4`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Industrial Fuzz

- Model key: `HD2_DistIndustrialFuzzMono`
- Model ID: `288`
- Type: Distortion
- Category: `distortion`
- Class: Fuzz
- DSP usage estimate: 5.8
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
- DSP usage estimate: 3.5
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
- DSP usage estimate: 3.2
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
- DSP usage estimate: 4.2
- Based on: Xotic SP Compressor
- Agoura model: No

### Parameters

- `Sidechain` (`key: ControlSource`, `id: 1`, `type: i`): valid values `Off`, `Instrument 1`, `Instrument 2`, `Mic`, `Return 1`, `Return 2`, `Return 3`, `Return 4`, `USB 3`, `USB 4`, `USB 5`, `USB 6`, `USB 7`, `USB 8`; default `Off`. Raw range `0` to `13`; raw default `0`.
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
- DSP usage estimate: 4.3
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
- DSP usage estimate: 3.9
- Based on: Teletronix LA-2A
- Agoura model: No

### Parameters

- `Sidechain` (`key: ControlSource`, `id: 1`, `type: i`): valid values `Off`, `Instrument 1`, `Instrument 2`, `Mic`, `Return 1`, `Return 2`, `Return 3`, `Return 4`, `USB 3`, `USB 4`, `USB 5`, `USB 6`, `USB 7`, `USB 8`; default `Off`. Raw range `0` to `13`; raw default `0`.
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
- DSP usage estimate: 7.4
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
- DSP usage estimate: 1.6
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
- DSP usage estimate: 4.8
- Based on: Klon Centaur
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.2`. Raw range `0` to `1`; raw default `0.42`. Controls the amount of overdrive applied to the signal. At higher settings, you may experience the fabled (1N34A germanium) "magic diodes."
- `Tone` (`key: Tone`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.3`. Raw range `0` to `1`; raw default `0.53`. Controls the overall tonal balance of the distortion. Lower values are darker and higher values are brighter.
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Sets the overall level of the block.

---

## Mutant Filter

- Model key: `HX2_FilterMutantFilterMono`
- Model ID: `19`
- Type: Filter
- Category: `filter`
- Class: Filter
- DSP usage estimate: 1.5
- Based on: Musitronics Mu-Tron III
- Agoura model: No

### Parameters

- `Sidechain` (`key: ControlSource`, `id: 1`, `type: i`): valid values `Off`, `Instrument 1`, `Instrument 2`, `Mic`, `Return 1`, `Return 2`, `Return 3`, `Return 4`, `USB 3`, `USB 4`, `USB 5`, `USB 6`, `USB 7`, `USB 8`; default `Off`. Raw range `0` to `13`; raw default `0`.
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
- DSP usage estimate: 1.6
- Based on: Korg A3
- Agoura model: No

### Parameters

- `Sidechain` (`key: ControlSource`, `id: 1`, `type: i`): valid values `Off`, `Instrument 1`, `Instrument 2`, `Mic`, `Return 1`, `Return 2`, `Return 3`, `Return 4`, `USB 3`, `USB 4`, `USB 5`, `USB 6`, `USB 7`, `USB 8`; default `Off`. Raw range `0` to `13`; raw default `0`.
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
- DSP usage estimate: 1.1
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Sidechain` (`key: ControlSource`, `id: 1`, `type: i`): valid values `Off`, `Instrument 1`, `Instrument 2`, `Mic`, `Return 1`, `Return 2`, `Return 3`, `Return 4`, `USB 3`, `USB 4`, `USB 5`, `USB 6`, `USB 7`, `USB 8`; default `Off`. Raw range `0` to `13`; raw default `0`.
- `Threshold` (`key: Threshold`, `id: 1`, `type: f`): display range `-96` to `0` dB; default `-48`. Raw range `-96` to `0`; raw default `-48`. Sets the noise gate's Threshold. The gate "opens" when the signal's level exceeds the Threshold, to let audio pass through. The gate "closes" when the signal's level drops below the Threshold. Adjust Threshold so only softer, unwanted signals (such as noise or hum) are gated.
- `Decay` (`key: Decay`, `id: 2`, `type: f`): display range `10` to `1000` ms; default `500`. Raw range `0.01` to `1`; raw default `0.5`. Controls the length of time it takes for the open noise gate to close once the signal drops below the Threshold. Increase Decay if you want the gate to gradually lower the signal instead of chopping it off abruptly.
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the block.

---

## Obsidian 7000

- Model key: `HD2_DistObsidian7000Mono`
- Model ID: `333`
- Type: Distortion
- Category: `distortion`
- Class: Distortion
- DSP usage estimate: 4.8
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

## P35_LooperHelixOneSwitchStereo

- Model key: `P35_LooperHelixOneSwitchStereo`
- Model ID: `826`
- Type: Looper
- Category: `looper`
- Class: Unknown
- DSP usage estimate: 2.3
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
- DSP usage estimate: 2.7
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
- DSP usage estimate: 0.9
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
- DSP usage estimate: 1.9
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

## Pillars

- Model key: `HD2_DistPillarsMono`
- Model ID: `406`
- Type: Distortion
- Category: `distortion`
- Class: Overdrive
- DSP usage estimate: 3.8
- Based on: Earthquaker Devices Plumes
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.7`. Raw range `0` to `1`; raw default `0.47`. Controls the amount of distortion.
- `Tone` (`key: Tone`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.2`. Raw range `0` to `1`; raw default `0.62`. Controls the overall tonal balance of the distortion. Lower values are darker and higher values are brighter.
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `2`. Raw range `0` to `1`; raw default `0.2`. Sets the overall output level of the block.
- `Mode` (`key: Mode`, `id: 4`, `type: i`): valid values `1`, `2`, `3`; default `1`. Raw range `0` to `2`; raw default `0`. Chooses the type of clipping circuit. 1 is LED, 2 is Clean Op-amp, 3 is Asymmetrical.

---

## Plugin 1

- Model key: `HD2_PluginMono1`
- Model ID: `416`
- Type: FX Loop
- Category: `fxloop`
- Class: FX Loop
- DSP usage estimate: 0.0
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
- DSP usage estimate: 0.0
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
- DSP usage estimate: 0.0
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
- DSP usage estimate: 0.0
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
- DSP usage estimate: 0.0
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
- DSP usage estimate: 0.0
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
- DSP usage estimate: 2.5
- Based on: Jordan Boss Tone Fuzz
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.94`. Raw range `0` to `1`; raw default `0.494`. Controls the amount of fuzz applied to the signal.
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Sets the overall level of the block.

---

## Prize Drive

- Model key: `HD2_DistPrizeDriveMono`
- Model ID: `411`
- Type: Distortion
- Category: `distortion`
- Class: Overdrive
- DSP usage estimate: 7.2
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
- DSP usage estimate: 4.3
- Based on: Maestro Bass Brassmaster
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `7.42`. Raw range `0` to `1`; raw default `0.742`. Controls the amount of distortion.
- `Filter` (`key: Filter`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `2.8`. Raw range `0` to `1`; raw default `0.28`. Controls the amount of high cut (low pass) filter applied to the distortion, basically letting more treble through (lower values) or filtering it out (higher values).
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.98`. Raw range `0` to `1`; raw default `0.698`. Sets the overall level of the block.

---

## Red Squeeze

- Model key: `HX2_CompressorRedSqueezeMono`
- Model ID: `36`
- Type: Dynamics
- Category: `dynamics`
- Class: Compress
- DSP usage estimate: 5.0
- Based on: MXR Dyna Comp
- Agoura model: No

### Parameters

- `Sidechain` (`key: ControlSource`, `id: 1`, `type: i`): valid values `Off`, `Instrument 1`, `Instrument 2`, `Mic`, `Return 1`, `Return 2`, `Return 3`, `Return 4`, `USB 3`, `USB 4`, `USB 5`, `USB 6`, `USB 7`, `USB 8`; default `Off`. Raw range `0` to `13`; raw default `0`.
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
- DSP usage estimate: 3.7
- Based on: Nobel Preamp Bass DI
- Agoura model: No

### Parameters

- `Bass` (`key: Bass`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.2`. Raw range `0` to `1`; raw default `0.62`. Adds a 150Hz bass boost to the signal. 0.0 is flat.
- `Treble` (`key: Treble`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Adds a 3.5kHz treble boost to the signal. 0.0 is flat.
- `Low Cut` (`key: Low Cut`, `id: 3`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. Applies a 90Hz low cut (high pass) filter to the signal (6dB/octave).
- `Volume` (`key: Volume`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `2.3`. Raw range `0` to `1`; raw default `0.23`. Controls the overall output level of the DI.

---

## Rochester Comp

- Model key: `HX2_CompressorRochesterCompMono`
- Model ID: `31`
- Type: Dynamics
- Category: `dynamics`
- Class: Compress
- DSP usage estimate: 2.5
- Based on: Ashly CLX-52 (in conjunction w/ B. Sheehan)
- Agoura model: No

### Parameters

- `Sidechain` (`key: ControlSource`, `id: 1`, `type: i`): valid values `Off`, `Instrument 1`, `Instrument 2`, `Mic`, `Return 1`, `Return 2`, `Return 3`, `Return 4`, `USB 3`, `USB 4`, `USB 5`, `USB 6`, `USB 7`, `USB 8`; default `Off`. Raw range `0` to `13`; raw default `0`.
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
- DSP usage estimate: 3.3
- Based on: Ibanez TS808 Tube Screamer
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.2`. Raw range `0` to `1`; raw default `0.52`. Controls the amount of distortion applied to the signal. Low Gain and high Level settings are commonly used to tighten up the signal, especially when pushing higher gain amps.
- `Tone` (`key: Tone`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the overall tonal balance of the distortion. Lower values are darker and higher values are brighter.
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.7`. Raw range `0` to `1`; raw default `0.67`. Sets the overall level of the block. Low Gain and high Level settings are commonly used to tighten up the signal, especially when pushing higher gain amps.

---

## Shuffling Looper

- Model key: `VIC_LooperShufflingMono`
- Model ID: `814`
- Type: Looper
- Category: `looper`
- Class: Unknown
- DSP usage estimate: 2.3
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

## Stereo Imager

- Model key: `HD2_VolPanStereoImagerStereo`
- Model ID: `247`
- Type: Volume
- Category: `volume`
- Class: Pan/Image
- DSP usage estimate: 1.8
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
- DSP usage estimate: 1.1
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
- DSP usage estimate: 3.1
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
- DSP usage estimate: 2.9
- Based on: BOSS HM-2 Heavy Metal Distortion (MIJ)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.2`. Raw range `0` to `1`; raw default `0.62`. Controls the amount of distortion applied to the signal.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the distortion.
- `Treble` (`key: Treble`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the high frequency EQ of the distortion.
- `Level` (`key: Level`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Sets the overall level of the block.

---

## Teemah!

- Model key: `HD2_DistTeemahMono`
- Model ID: `327`
- Type: Distortion
- Category: `distortion`
- Class: Distortion
- DSP usage estimate: 3.0
- Based on: Paul Cochrane Timmy Overdrive
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.2`. Raw range `0` to `1`; raw default `0.52`. Controls the amount of overdrive applied to the signal.
- `Bass Cut` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Cuts low end frequencies from the signal before the overdrive circuit.
- `Treble Cut` (`key: Treble`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Cuts high end frequencies from the signal after the overdrive circuit.
- `Clipping` (`key: Clipping`, `id: 4`, `type: i`): valid values `Up`, `Center`, `Down`; default `Up`. Raw range `0` to `2`; raw default `0`. Selects the clipping mode. "Up" provides asymmetrical clipping with a bit of compression and saturation. "Center" provides symmetrical clipping with a bit of saturation and high headroom. "Down" is similar to "Center" except with more saturation and lower headroom.
- `Level` (`key: Level`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `6.3`. Raw range `0` to `1`; raw default `0.63`. Sets the overall level of the block.

---

## Thrifter Fuzz

- Model key: `HD2_DistThrifterFuzzMono`
- Model ID: `338`
- Type: Distortion
- Category: `distortion`
- Class: Fuzz
- DSP usage estimate: 5.1
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

## Tilt

- Model key: `HD2_EQSimpleTiltMono`
- Model ID: `373`
- Type: EQ
- Category: `eq`
- Class: Tilt
- DSP usage estimate: 1.5
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
- DSP usage estimate: 5.4
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
- DSP usage estimate: 2.4
- Based on: DOD OD-250
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the amount of overdrive applied to the signal.
- `Level` (`key: Level`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `8.3`. Raw range `0` to `1`; raw default `0.83`. Sets the overall level of the block.

---

## Triangle Fuzz

- Model key: `HD2_DistTriangleFuzzMono`
- Model ID: `300`
- Type: Distortion
- Category: `distortion`
- Class: Fuzz
- DSP usage estimate: 3.5
- Based on: Electro-Harmonix Big Muff Pi
- Agoura model: No

### Parameters

- `Sustain` (`key: Sustain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `8.3`. Raw range `0` to `1`; raw default `0.83`. Controls the amount of sustain and fuzz applied to the signal.
- `Tone` (`key: Tone`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.6`. Raw range `0` to `1`; raw default `0.56`. Controls the overall tonal balance of the fuzz. Lower values are darker and higher values are brighter.
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `8.1`. Raw range `0` to `1`; raw default `0.81`. Sets the overall level of the block.

---

## Tycoctavia Fuzz

- Model key: `HD2_DistTycoctaviaFuzzMono`
- Model ID: `309`
- Type: Distortion
- Category: `distortion`
- Class: Fuzz
- DSP usage estimate: 2.9
- Based on: Tycobrahe Octavia
- Agoura model: No

### Parameters

- `Fuzz` (`key: Fuzz`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the amount of fuzz applied to the signal.
- `Level` (`key: Level`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.7`. Raw range `0` to `1`; raw default `0.67`. Sets the overall level of the block.

---

## VIC_LooperShufflingStereo

- Model key: `VIC_LooperShufflingStereo`
- Model ID: `815`
- Type: Looper
- Category: `looper`
- Class: Unknown
- DSP usage estimate: 2.4
- Based on: Unknown
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
- DSP usage estimate: 5.3
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
- DSP usage estimate: 2.5
- Based on: Pro Co RAT
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.8`. Raw range `0` to `1`; raw default `0.68`. Controls the amount of distortion applied to the signal.
- `Filter` (`key: Filter`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Applies a filter which gives you brighter tone at lower settings, and darker tone at higher settings.
- `Level` (`key: Level`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `8.5`. Raw range `0` to `1`; raw default `0.85`. Sets the overall level of the block.

---

## Vital Boost

- Model key: `HD2_DistVitalBoostMono`
- Model ID: `405`
- Type: Distortion
- Category: `distortion`
- Class: Boost
- DSP usage estimate: 2.9
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
- DSP usage estimate: 7.8
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
- DSP usage estimate: 0.8
- Based on: N/A
- Agoura model: No

### Parameters

- `Position` (`key: Pedal`, `id: 1`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Adjusts the position of the Volume Pedal. By default, this is assigned to Expression Pedal 2.
- `Curve` (`key: VolumeTaper`, `id: 2`, `type: b`): valid values `Linear`, `Logarithmic`; default `Linear`. Raw range `Off` to `On`; raw default `Off`. Sets the Volume Pedal's taper to "Linear" (consistent level change across the pedal's travel) or "Logarithmic" (concave curve, with more control toward the heel and faster changes toward the toe)

---

## Wringer Fuzz

- Model key: `HD2_DistWringerFuzzMono`
- Model ID: `330`
- Type: Distortion
- Category: `distortion`
- Class: Fuzz
- DSP usage estimate: 4.5
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
- DSP usage estimate: 4.6
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
- DSP usage estimate: 3.5
- Based on: Tech 21 SansAmp Bass Driver DI V1
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the input sensitivity as well as the amount of gain and overdrive applied to the signal.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.9`. Raw range `0` to `1`; raw default `0.59`. Controls the low frequency EQ of the overdrive.
- `Treble` (`key: Treble`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Controls the high frequency EQ of the overdrive.
- `Presence` (`key: Presence`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adds upper harmonic content and increases attack.
- `Blend` (`key: Blend`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the blend between the tube amp emulation circuitry and the dry signal. The Bass and Treble knobs remain active, even when Blend is set to 0.0.
- `Level` (`key: Level`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `4.8`. Raw range `0` to `1`; raw default `0.48`. Sets the overall level of the block.
