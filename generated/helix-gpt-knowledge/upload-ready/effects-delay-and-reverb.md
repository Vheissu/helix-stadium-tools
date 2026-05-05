# Effects: delay and reverb

Upload-ready knowledge for delay and reverb blocks.

Generated from the installed Helix Stadium desktop app bundle on 2026-04-19T22:24:30.490746+00:00.

Use display values for normal user-facing answers. Use model keys, IDs, and raw ranges only when the user asks for automation or low-level control details.

Model count: 76

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
