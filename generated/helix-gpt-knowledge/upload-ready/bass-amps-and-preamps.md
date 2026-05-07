# Bass amps and preamps

Upload-ready knowledge for bass amp and preamp blocks.

Generated from the installed Helix Stadium desktop app bundle on 2026-05-07T22:33:14.224003+00:00.

Use display values for normal user-facing answers. Use model keys, IDs, and raw ranges only when the user asks for automation or low-level control details.

Model count: 40

---

## Agua 51

- Model key: `HD2_AmpAgua51`
- Model ID: `663`
- Type: Amp
- Category: `amp`
- Class: Bass
- DSP usage estimate: 9.6
- Based on: Aguilar DB51
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Controls the Master Volume of the amplifier.
- `Level` (`key: Ch Vol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.2`. Raw range `0` to `1`; raw default `0.72`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Deep` (`key: Deep`, `id: 7`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. When on, applies a 5 dB boost at 30 Hz.
- `Bright` (`key: Bright`, `id: 8`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. When on, applies a 5 dB boost at 5-7 kHz.

---

## Agua 51

- Model key: `HD2_PreampAgua51`
- Model ID: `664`
- Type: Preamp
- Category: `preamp`
- Class: Bass
- DSP usage estimate: 9.4
- Based on: Aguilar DB51
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Controls the Master Volume of the amplifier.
- `Level` (`key: Ch Vol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.2`. Raw range `0` to `1`; raw default `0.72`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Deep` (`key: Deep`, `id: 7`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. When on, applies a 5 dB boost at 30 Hz.
- `Bright` (`key: Bright`, `id: 8`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. When on, applies a 5 dB boost at 5-7 kHz.

---

## Agua 751

- Model key: `Agoura_AmpAgua751`
- Model ID: `809`
- Type: Amp
- Category: `amp`
- Class: Bass
- DSP usage estimate: 11.5
- Based on: Aguilar DB751
- Agoura model: Yes

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.8`. Raw range `0` to `1`; raw default `0.58`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `3.3`. Raw range `0` to `1`; raw default `0.33`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7.7`. Raw range `0` to `1`; raw default `0.77`. Controls the high frequency EQ of the tonestack.
- `Deep` (`key: Deep`, `id: 5`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. When on, applies a 5 dB boost at 30 Hz.
- `Bright` (`key: Bright`, `id: 6`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, applies a 5 dB boost at 5-7 kHz.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the Master Volume of the amplifier.
- `Level` (`key: Level`, `id: 8`, `type: f`): display range `-40` to `10` dB; default `-10`. Raw range `-40` to `10`; raw default `-10`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Hype` (`key: Hype`, `id: 9`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Depending on the amp and/or amp settings, increasing Hype may subtly or dramatically adjust various behind-the-scenes parameters to make the amp sound and feel smoother, fuller, punchier, tighter, and/or more forgiving, but at the expense of accuracy.

---

## Agua Sledge

- Model key: `HD2_AmpAguaSledge`
- Model ID: `726`
- Type: Amp
- Category: `amp`
- Class: Bass
- DSP usage estimate: 4.8
- Based on: Aguilar Tone Hammer
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3.2`. Raw range `0` to `1`; raw default `0.32`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Drive` (`key: Drive`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Adds saturation, a tighter low end, and a more controlled high end, depending on how high the Gain knob is set. When Gain is set to 0.0, Drive does nothing.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency (40 Hz) EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency (4 kHz) EQ of the tonestack.
- `Level` (`key: Ch Vol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the Master Volume of the amplifier.
- `Mid Freq` (`key: Mid Freq`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the Mid band EQ frequency between 180 Hz (0.0) and 1 kHz (10.0).

---

## Agua Sledge

- Model key: `HD2_PreampAguaSledge`
- Model ID: `727`
- Type: Preamp
- Category: `preamp`
- Class: Bass
- DSP usage estimate: 5.2
- Based on: Aguilar Tone Hammer
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3.2`. Raw range `0` to `1`; raw default `0.32`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Drive` (`key: Drive`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Adds saturation, a tighter low end, and a more controlled high end, depending on how high the Gain knob is set. When Gain is set to 0.0, Drive does nothing.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency (40 Hz) EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency (4 kHz) EQ of the tonestack.
- `Level` (`key: Ch Vol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the Master Volume of the amplifier.
- `Mid Freq` (`key: Mid Freq`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the Mid band EQ frequency between 180 Hz (0.0) and 1 kHz (10.0).

---

## Ampeg B-15NF

- Model key: `HD2_AmpTucknGo`
- Model ID: `542`
- Type: Amp
- Category: `amp`
- Class: Bass
- DSP usage estimate: 11.2
- Based on: Ampeg B-15NF Portaflex
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the low frequency EQ of the tonestack.
- `Low Mid` (`key: LowMid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low midrange frequency EQ of the tonestack.
- `High Mid` (`key: HighMid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `6.6`. Raw range `0` to `1`; raw default `0.66`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Ampeg B-15NF

- Model key: `HD2_PreampTucknGo`
- Model ID: `543`
- Type: Preamp
- Category: `preamp`
- Class: Bass
- DSP usage estimate: 6.9
- Based on: Ampeg B-15NF Portaflex
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the low frequency EQ of the tonestack.
- `Low Mid` (`key: LowMid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low midrange frequency EQ of the tonestack.
- `High Mid` (`key: HighMid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Ampeg B15NF 66

- Model key: `Agoura_AmpAmpegB15NF66`
- Model ID: `759`
- Type: Amp
- Category: `amp`
- Class: Bass
- DSP usage estimate: 13.6
- Based on: Ampeg B-15NF Portaflex
- Agoura model: Yes

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the low frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 5`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 6`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Z PrePost` (`key: ZPrePost`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Determines the location of speaker impedance characteristics in the power amp, primarily due to negative feedback. Higher values mean the effects of the interaction appear at the output of the power amp (Post) and lower values mean more of the effect is fed back to the input of the power amp (Pre).
- `Level` (`key: Level`, `id: 8`, `type: f`): display range `-40` to `10` dB; default `-10`. Raw range `-40` to `10`; raw default `-10`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Hype` (`key: Hype`, `id: 9`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Depending on the amp and/or amp settings, increasing Hype may subtly or dramatically adjust various behind-the-scenes parameters to make the amp sound and feel smoother, fuller, punchier, tighter, and/or more forgiving, but at the expense of accuracy.

---

## Ampeg SVT 50th

- Model key: `Agoura_AmpAmpegSVT`
- Model ID: `805`
- Type: Amp
- Category: `amp`
- Class: Bass
- DSP usage estimate: 25.0
- Based on: Ampeg Heritageâ¢ 50th Anniversary SVT (Ch 1 Normal, Ch1 Bright, Ch2 Normal, Ch2 Bright & Jumped channels)
- Agoura model: Yes

### Parameters

- `Channel` (`key: Channel`, `id: 1`, `type: i`): valid values `Ch1 Normal`, `Ch1 Bright`, `Ch2 Normal`, `Ch2 Bright`, `Jumped`; default `Ch1 Normal`. Raw range `0` to `4`; raw default `0`. Selects the amp channel or which input is connected. "Jumped" jumps between the XXXXX and XXXXX channels.
- `1 Drive` (`key: 1Drive`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.2`. Raw range `0` to `1`; raw default `0.42`. Controls the amount of Channel 1 gain applied to the signal, which influences the level of distortion.
- `1 Bass` (`key: 1Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.4`. Raw range `0` to `1`; raw default `0.44`. Controls the low frequency EQ (40 Hz) of the tonestack for Channel 1.
- `1 Mid` (`key: 1Mid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.3`. Raw range `0` to `1`; raw default `0.63`. Controls the midrange frequency EQ of the tonestack for Channel 1.
- `1 Mid Freq` (`key: 1MidFreq`, `id: 5`, `type: i`): valid values `200 Hz`, `800 Hz`, `3 kHz`; default `3 kHz`. Raw range `0` to `2`; raw default `2`. Sets the frequency controlled by the 1 Mid parameter--200 Hz, 800 Hz, or 3 kHz.
- `1 Treble` (`key: 1Treble`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.1`. Raw range `0` to `1`; raw default `0.81`. Controls the high frequency EQ (4 kHz) of the tonestack for Channel 1.
- `1 Ultra Hi` (`key: 1UltraHi`, `id: 7`, `type: i`): valid values `Off`, `On`; default `Off`. Raw range `0` to `1`; raw default `0`. When On, boosts the high frequency of Channel 1.
- `Level` (`key: Level`, `id: 8`, `type: f`): display range `-40` to `10` dB; default `-13`. Raw range `-40` to `10`; raw default `-13`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `1 Ultra Lo` (`key: 1UltraLo`, `id: 9`, `type: i`): valid values `Cut`, `Off`, `On`; default `On`. Raw range `0` to `2`; raw default `2`. When on, boosts the low frequency of Channel 1. When set to "Cut," decreases the low frequency of Channel 1.
- `2 Drive` (`key: 2Drive`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the amount of Channel 2 gain applied to the signal, which influences the level of distortion.
- `2 Bass` (`key: 2Bass`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ (40 Hz) of the tonestack for Channel 2.
- `2 Treble` (`key: 2Treble`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the high frequency EQ (4 kHz) of the tonestack for Channel 2.
- `2 Ultra Hi` (`key: 2UltraHi`, `id: 13`, `type: i`): valid values `Off`, `On`; default `Off`. Raw range `0` to `1`; raw default `0`. When on, boosts the high frequency of Channel 2.
- `2 Ultra Lo` (`key: 2UltraLo`, `id: 14`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, boosts the low frequency of Channel 2.
- `Master` (`key: Master`, `id: 15`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 16`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 17`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Z PrePost` (`key: ZPrePost`, `id: 18`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines the location of speaker impedance characteristics in the power amp, primarily due to negative feedback. Higher values mean the effects of the interaction appear at the output of the power amp (Post) and lower values mean more of the effect is fed back to the input of the power amp (Pre).
- `Hype` (`key: Hype`, `id: 19`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Depending on the amp and/or amp settings, increasing Hype may subtly or dramatically adjust various behind-the-scenes parameters to make the amp sound and feel smoother, fuller, punchier, tighter, and/or more forgiving, but at the expense of accuracy.

---

## Ampeg SVT Brt

- Model key: `HD2_AmpSVBeastBrt`
- Model ID: `554`
- Type: Amp
- Category: `amp`
- Class: Bass
- DSP usage estimate: 14.0
- Based on: Ampeg SVT (bright channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.1`. Raw range `0` to `1`; raw default `0.41`. Controls the low frequency EQ (40 Hz) of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `7.9`. Raw range `0` to `1`; raw default `0.79`. Controls the midrange frequency EQ of the tonestack.
- `Mid Freq` (`key: MidFreq`, `id: 4`, `type: i`): valid values `220 Hz`, `800 Hz`, `3000 Hz`; default `3000 Hz`. Raw range `0` to `2`; raw default `2`. Sets the frequency controlled by the Mid parameter--220 Hz, 800 Hz, or 3 kHz.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `7.7`. Raw range `0` to `1`; raw default `0.77`. Controls the high frequency EQ (4 kHz) of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `3.3`. Raw range `0` to `1`; raw default `0.33`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `7.4`. Raw range `0` to `1`; raw default `0.74`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Ampeg SVT Brt

- Model key: `HD2_PreampSVBeastBrt`
- Model ID: `556`
- Type: Preamp
- Category: `preamp`
- Class: Bass
- DSP usage estimate: 11.0
- Based on: Ampeg SVT (bright channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.1`. Raw range `0` to `1`; raw default `0.41`. Controls the low frequency EQ (40 Hz) of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `7.9`. Raw range `0` to `1`; raw default `0.79`. Controls the midrange frequency EQ of the tonestack.
- `Mid Freq` (`key: MidFreq`, `id: 4`, `type: i`): valid values `220 Hz`, `800 Hz`, `3000 Hz`; default `3000 Hz`. Raw range `0` to `2`; raw default `2`. Sets the frequency controlled by the Mid parameter--220 Hz, 800 Hz, or 3 kHz.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `7.7`. Raw range `0` to `1`; raw default `0.77`. Controls the high frequency EQ (4 kHz) of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `3.3`. Raw range `0` to `1`; raw default `0.33`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Ampeg SVT Nrm

- Model key: `HD2_AmpSVBeastNrm`
- Model ID: `555`
- Type: Amp
- Category: `amp`
- Class: Bass
- DSP usage estimate: 14.0
- Based on: Ampeg SVT (Normal channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.3`. Raw range `0` to `1`; raw default `0.53`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.2`. Raw range `0` to `1`; raw default `0.52`. Controls the low frequency EQ (40 Hz) of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.7`. Raw range `0` to `1`; raw default `0.67`. Controls the midrange frequency EQ of the tonestack.
- `Mid Freq` (`key: MidFreq`, `id: 4`, `type: i`): valid values `220 Hz`, `800 Hz`, `3000 Hz`; default `800 Hz`. Raw range `0` to `2`; raw default `1`. Sets the frequency controlled by the Mid parameter--220 Hz, 800 Hz, or 3 kHz.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `6.8`. Raw range `0` to `1`; raw default `0.68`. Controls the high frequency EQ (4 kHz) of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `9`. Raw range `0` to `1`; raw default `0.9`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `3.3`. Raw range `0` to `1`; raw default `0.33`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Ampeg SVT Nrm

- Model key: `HD2_PreampSVBeastNrm`
- Model ID: `557`
- Type: Preamp
- Category: `preamp`
- Class: Bass
- DSP usage estimate: 11.0
- Based on: Ampeg SVT (Normal channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.3`. Raw range `0` to `1`; raw default `0.53`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.2`. Raw range `0` to `1`; raw default `0.52`. Controls the low frequency EQ (40 Hz) of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.7`. Raw range `0` to `1`; raw default `0.67`. Controls the midrange frequency EQ of the tonestack.
- `Mid Freq` (`key: MidFreq`, `id: 4`, `type: i`): valid values `220 Hz`, `800 Hz`, `3000 Hz`; default `800 Hz`. Raw range `0` to `2`; raw default `1`. Sets the frequency controlled by the Mid parameter--220 Hz, 800 Hz, or 3 kHz.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `6.8`. Raw range `0` to `1`; raw default `0.68`. Controls the high frequency EQ (4 kHz) of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `9`. Raw range `0` to `1`; raw default `0.9`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `3.3`. Raw range `0` to `1`; raw default `0.33`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Ampeg SVT-4 PRO

- Model key: `HD2_AmpSVT4Pro`
- Model ID: `673`
- Type: Amp
- Category: `amp`
- Class: Bass
- DSP usage estimate: 8.5
- Based on: Ampeg SVT-4 PRO
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ (50 Hz) of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the midrange frequency EQ of the tonestack.
- `Mid Freq` (`key: MidFreq`, `id: 4`, `type: i`): valid values `1`, `2`, `3`, `4`, `5`; default `2`. Raw range `0` to `4`; raw default `1`. Sets the frequency controlled by the Mid parameter--1 (220 Hz), 2 (450 Hz), 3 (800 Hz), 4 (1.6 kHz), or 5 (3 kHz).
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ (5 kHz) of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the Master Volume of the amplifier.
- `Ultra Lo` (`key: UltraLo`, `id: 8`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, boosts the low end (40 Hz) output by 2 dB and simultaneously cuts the midrange (500 Hz) by 10dB.
- `Ultra Hi` (`key: UltraHi`, `id: 9`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, boosts the high end (5 kHz) output by 6 dB.
- `Bright` (`key: Bright`, `id: 10`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, boosts the high end response (2 kHz) of the input signal by 6 dB.
- `EQ` (`key: EQ`, `id: 11`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, enables the 9-band graphic EQ.
- `33 Hz` (`key: 33Hz`, `id: 12`, `type: f`): display range `-15` to `15` dB; default `0`. Raw range `-15` to `15`; raw default `0`. Boost or cut up to 12 dB.
- `80 Hz` (`key: 80Hz`, `id: 13`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Boost or cut up to 12 dB.
- `150 Hz` (`key: 150Hz`, `id: 14`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Boost or cut up to 12 dB.
- `300 Hz` (`key: 300Hz`, `id: 15`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Boost or cut up to 12 dB.
- `600 Hz` (`key: 600Hz`, `id: 16`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Boost or cut up to 12 dB.
- `900 Hz` (`key: 900Hz`, `id: 17`, `type: f`): display range `-15` to `15` dB; default `0`. Raw range `-15` to `15`; raw default `0`. Boost or cut up to 12 dB.
- `2 kHz` (`key: 2kHz`, `id: 18`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Boost or cut up to 12 dB.
- `5 kHz` (`key: 5kHz`, `id: 19`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Boost or cut up to 12 dB.
- `8 kHz` (`key: 8kHz`, `id: 20`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Boost or cut up to 12 dB.
- `EQ Level` (`key: EQLevel`, `id: 21`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Controls the output level of the 9-band graphic EQ. If the EQ’d signal is too soft, turn EQ Level up; if it’s too loud, turn EQ Level down.

---

## Ampeg SVT-4 PRO

- Model key: `HD2_PreampSVT4Pro`
- Model ID: `674`
- Type: Preamp
- Category: `preamp`
- Class: Bass
- DSP usage estimate: 7.6
- Based on: Ampeg SVT-4 PRO
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ (50 Hz) of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the midrange frequency EQ of the tonestack.
- `Mid Freq` (`key: MidFreq`, `id: 4`, `type: i`): valid values `1`, `2`, `3`, `4`, `5`; default `2`. Raw range `0` to `4`; raw default `1`. Sets the frequency controlled by the Mid parameter--1 (220 Hz), 2 (450 Hz), 3 (800 Hz), 4 (1.6 kHz), or 5 (3 kHz).
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ (5 kHz) of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the Master Volume of the amplifier.
- `Ultra Lo` (`key: UltraLo`, `id: 8`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, boosts the low end (40 Hz) output by 2 dB and simultaneously cuts the midrange (500 Hz) by 10dB.
- `Ultra Hi` (`key: UltraHi`, `id: 9`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, boosts the high end (5 kHz) output by 6 dB.
- `Bright` (`key: Bright`, `id: 10`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, boosts the high end response (2 kHz) of the input signal by 6 dB.
- `EQ` (`key: EQ`, `id: 11`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, enables the 9-band graphic EQ.
- `33 Hz` (`key: 33Hz`, `id: 12`, `type: f`): display range `-15` to `15` dB; default `0`. Raw range `-15` to `15`; raw default `0`. Boost or cut up to 12 dB.
- `80 Hz` (`key: 80Hz`, `id: 13`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Boost or cut up to 12 dB.
- `150 Hz` (`key: 150Hz`, `id: 14`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Boost or cut up to 12 dB.
- `300 Hz` (`key: 300Hz`, `id: 15`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Boost or cut up to 12 dB.
- `600 Hz` (`key: 600Hz`, `id: 16`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Boost or cut up to 12 dB.
- `900 Hz` (`key: 900Hz`, `id: 17`, `type: f`): display range `-15` to `15` dB; default `0`. Raw range `-15` to `15`; raw default `0`. Boost or cut up to 12 dB.
- `2 kHz` (`key: 2kHz`, `id: 18`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Boost or cut up to 12 dB.
- `5 kHz` (`key: 5kHz`, `id: 19`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Boost or cut up to 12 dB.
- `8 kHz` (`key: 8kHz`, `id: 20`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Boost or cut up to 12 dB.
- `EQ Level` (`key: EQLevel`, `id: 21`, `type: f`): display range `-12` to `12` dB; default `0`. Raw range `-12` to `12`; raw default `0`. Controls the output level of the 9-band graphic EQ. If the EQ’d signal is too soft, turn EQ Level up; if it’s too loud, turn EQ Level down.

---

## Brit MegaBass

- Model key: `Agoura_AmpBritMegaBass`
- Model ID: `757`
- Type: Amp
- Category: `amp`
- Class: Bass
- DSP usage estimate: 14.5
- Based on: Marshall Super Bass 1992 (Normal, Bright & Jumped channels)
- Agoura model: Yes

### Parameters

- `Channel` (`key: Channel`, `id: 1`, `type: i`): valid values `Normal`, `Bright`, `Jumped`; default `Normal`. Raw range `0` to `2`; raw default `0`. Selects the amp channel or which input is connected. "Jumped" jumps between the Normal and Bright channels.
- `Normal Drive` (`key: NrmDrive`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Controls the amount of Normal channel gain applied to the signal. The inactive channel can sometimes "bleed into" the active channel, resulting in interesting interactions.
- `Bright Drive` (`key: BrtDrive`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the amount of Bright channel gain applied to the signal. The inactive channel can sometimes "bleed into" the active channel, resulting in interesting interactions.
- `Bass` (`key: Bass`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: Level`, `id: 8`, `type: f`): display range `-40` to `10` dB; default `-10`. Raw range `-40` to `10`; raw default `-10`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 10`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 11`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Z PrePost` (`key: ZPrePost`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Determines the location of speaker impedance characteristics in the power amp, primarily due to negative feedback. Higher values mean the effects of the interaction appear at the output of the power amp (Post) and lower values mean more of the effect is fed back to the input of the power amp (Pre).
- `Hype` (`key: Hype`, `id: 13`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Depending on the amp and/or amp settings, increasing Hype may subtly or dramatically adjust various behind-the-scenes parameters to make the amp sound and feel smoother, fuller, punchier, tighter, and/or more forgiving, but at the expense of accuracy.

---

## Busy One Ch1

- Model key: `HD2_AmpBusyOneCh1`
- Model ID: `649`
- Type: Amp
- Category: `amp`
- Class: Bass
- DSP usage estimate: 4.3
- Based on: Pearce BC-1 preamp (Channel 1)
- Agoura model: No

### Parameters

- `Drive` (`key: Ch1 Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Ch1 Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Ch1 Mid`, `id: 3`, `type: f`): display range `-15` to `15` dB; default `15`. Raw range `-15` to `15`; raw default `15`. Controls the midrange frequency EQ of the tonestack.
- `Mid Freq` (`key: Ch1 Mid Freq`, `id: 4`, `type: f`): display range `100` to `3000` Hz; default `220`. Raw range `100` to `3000`; raw default `220`. Sets the frequency boosted or cut by the Mid parameter.
- `Treble` (`key: Ch1 Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `1.5`. Raw range `0` to `1`; raw default `0.15`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Ch1 Master`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the Master Volume of the amplifier.
- `Input Pad` (`key: Input Pad`, `id: 7`, `type: i`): valid values `-10dB`, `0dB`, `10dB`; default `0dB`. Raw range `0` to `2`; raw default `1`. Boosts or cuts the input signal into the preamp by 10 dB.
- `Boost` (`key: Ch1 Boost`, `id: 8`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, supplies an additional boost for noticeably more gain and distortion.
- `Limiter` (`key: Limiter`, `id: 9`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. When on, enables the built-in limiter.
- `Threshold` (`key: Threshold`, `id: 10`, `type: f`): display range `-22` to `3` dB; default `-6`. Raw range `-22` to `3`; raw default `-6`. Sets the level above which limiting is applied. Lower values limit more of the signal; higher values limit only louder parts of the signal.
- `Level` (`key: Ch Vol`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.

---

## Busy One Ch1

- Model key: `HD2_PreampBusyOneCh1`
- Model ID: `650`
- Type: Preamp
- Category: `preamp`
- Class: Bass
- DSP usage estimate: 4.0
- Based on: Pearce BC-1 preamp (Channel 1)
- Agoura model: No

### Parameters

- `Drive` (`key: Ch1 Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Ch1 Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Ch1 Mid`, `id: 3`, `type: f`): display range `-15` to `15` dB; default `15`. Raw range `-15` to `15`; raw default `15`. Controls the midrange frequency EQ of the tonestack.
- `Mid Freq` (`key: Ch1 Mid Freq`, `id: 4`, `type: f`): display range `100` to `3000` Hz; default `220`. Raw range `100` to `3000`; raw default `220`. Sets the frequency boosted or cut by the Mid parameter.
- `Treble` (`key: Ch1 Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `1.5`. Raw range `0` to `1`; raw default `0.15`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Ch1 Master`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the Master Volume of the amplifier.
- `Input Pad` (`key: Input Pad`, `id: 7`, `type: i`): valid values `-10dB`, `0dB`, `10dB`; default `0dB`. Raw range `0` to `2`; raw default `1`. Boosts or cuts the input signal into the preamp by 10 dB.
- `Boost` (`key: Ch1 Boost`, `id: 8`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, supplies an additional boost for noticeably more gain and distortion.
- `Limiter` (`key: Limiter`, `id: 9`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. When on, enables the built-in limiter.
- `Threshold` (`key: Threshold`, `id: 10`, `type: f`): display range `-22` to `3` dB; default `-6`. Raw range `-22` to `3`; raw default `-6`. Sets the level above which limiting is applied. Lower values limit more of the signal; higher values limit only louder parts of the signal.
- `Level` (`key: Ch Vol`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the overall level of the Preamp block.

---

## Busy One Ch2

- Model key: `HD2_AmpBusyOneCh2`
- Model ID: `647`
- Type: Amp
- Category: `amp`
- Class: Bass
- DSP usage estimate: 4.3
- Based on: Pearce BC-1 preamp (Channel 2)
- Agoura model: No

### Parameters

- `Drive` (`key: Ch2 Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Ch2 Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `2.14`. Raw range `0` to `1`; raw default `0.214`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Ch2 Mid`, `id: 3`, `type: f`): display range `-15` to `15` dB; default `0`. Raw range `-15` to `15`; raw default `0`. Controls the midrange frequency EQ of the tonestack.
- `Mid Freq` (`key: Ch2 Mid Freq`, `id: 4`, `type: f`): display range `90` to `3000` Hz; default `435.98`. Raw range `90` to `3000`; raw default `435.98`. Sets the frequency boosted or cut by the Mid parameter.
- `Treble` (`key: Ch2 Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `4.16`. Raw range `0` to `1`; raw default `0.416`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Ch2 Master`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.22`. Raw range `0` to `1`; raw default `0.822`. Controls the Master Volume of the amplifier.
- `Input Pad` (`key: Input Pad`, `id: 7`, `type: i`): valid values `-10dB`, `0dB`, `10dB`; default `0dB`. Raw range `0` to `2`; raw default `1`. Boosts or cuts the input signal into the preamp by 10 dB.
- `Boost` (`key: Ch2 Boost`, `id: 8`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, supplies an additional boost for noticeably more gain and distortion.
- `Limiter` (`key: Limiter`, `id: 9`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. When on, enables the built-in limiter.
- `Threshold` (`key: Threshold`, `id: 10`, `type: f`): display range `-22` to `3` dB; default `-6`. Raw range `-22` to `3`; raw default `-6`. Sets the level above which limiting is applied. Lower values limit more of the signal; higher values limit only louder parts of the signal.
- `Level` (`key: Ch Vol`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `8.3`. Raw range `0` to `1`; raw default `0.83`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.

---

## Busy One Ch2

- Model key: `HD2_PreampBusyOneCh2`
- Model ID: `648`
- Type: Preamp
- Category: `preamp`
- Class: Bass
- DSP usage estimate: 4.0
- Based on: Pearce BC-1 preamp (Channel 2)
- Agoura model: No

### Parameters

- `Drive` (`key: Ch2 Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Ch2 Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `2.14`. Raw range `0` to `1`; raw default `0.214`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Ch2 Mid`, `id: 3`, `type: f`): display range `-15` to `15` dB; default `0`. Raw range `-15` to `15`; raw default `0`. Controls the midrange frequency EQ of the tonestack.
- `Mid Freq` (`key: Ch2 Mid Freq`, `id: 4`, `type: f`): display range `90` to `3000` Hz; default `435.98`. Raw range `90` to `3000`; raw default `435.98`. Sets the frequency boosted or cut by the Mid parameter.
- `Treble` (`key: Ch2 Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `4.16`. Raw range `0` to `1`; raw default `0.416`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Ch2 Master`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.22`. Raw range `0` to `1`; raw default `0.822`. Controls the Master Volume of the amplifier.
- `Input Pad` (`key: Input Pad`, `id: 7`, `type: i`): valid values `-10dB`, `0dB`, `10dB`; default `0dB`. Raw range `0` to `2`; raw default `1`. Boosts or cuts the input signal into the preamp by 10 dB.
- `Boost` (`key: Ch2 Boost`, `id: 8`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, supplies an additional boost for noticeably more gain and distortion.
- `Limiter` (`key: Limiter`, `id: 9`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. When on, enables the built-in limiter.
- `Threshold` (`key: Threshold`, `id: 10`, `type: f`): display range `-22` to `3` dB; default `-6`. Raw range `-22` to `3`; raw default `-6`. Sets the level above which limiting is applied. Lower values limit more of the signal; higher values limit only louder parts of the signal.
- `Level` (`key: Ch Vol`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `8.3`. Raw range `0` to `1`; raw default `0.83`. Controls the overall level of the Preamp block.

---

## Busy One Jump

- Model key: `HD2_AmpBusyOneJump`
- Model ID: `645`
- Type: Amp
- Category: `amp`
- Class: Bass
- DSP usage estimate: 6.5
- Based on: Pearce BC-1 preamp (Jumped channels)
- Agoura model: No

### Parameters

- `Ch 1 Drive` (`key: Ch1 Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the amount of Channel 1 gain applied to the signal, which influences the level of distortion.
- `Ch 1 Bass` (`key: Ch1 Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the low frequency EQ of the tonestack on Channel 1.
- `Ch 1 Mid` (`key: Ch1 Mid`, `id: 3`, `type: f`): display range `-15` to `15` dB; default `15`. Raw range `-15` to `15`; raw default `15`. Controls the midrange frequency EQ of the tonestack on Channel 1.
- `Ch 1 Mid Freq` (`key: Ch1 Mid Freq`, `id: 4`, `type: f`): display range `100` to `3000` Hz; default `150`. Raw range `100` to `3000`; raw default `150`. Sets the frequency boosted or cut by the Mid parameter on Channel 1.
- `Ch 1 Treble` (`key: Ch1 Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `1.5`. Raw range `0` to `1`; raw default `0.15`. Controls the high frequency EQ of the tonestack on Channel 1.
- `Ch 1 Master` (`key: Ch1 Master`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the Master Volume of Channel 1.
- `Ch 2 Drive` (`key: Ch2 Drive`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the amount of Channel 2 gain applied to the signal, which influences the level of distortion.
- `Ch 2 Bass` (`key: Ch2 Bass`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Controls the low frequency EQ of the tonestack on Channel 2.
- `Ch 2 Mid` (`key: Ch2 Mid`, `id: 9`, `type: f`): display range `-15` to `15` dB; default `0`. Raw range `-15` to `15`; raw default `0`. Controls the midrange frequency EQ of the tonestack on Channel 2.
- `Ch 2 Mid Freq` (`key: Ch2 Mid Freq`, `id: 10`, `type: f`): display range `90` to `3000` Hz; default `500`. Raw range `90` to `3000`; raw default `500`. Sets the frequency boosted or cut by the Mid parameter on Channel 2.
- `Ch 2 Treble` (`key: Ch2 Treble`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `4.38`. Raw range `0` to `1`; raw default `0.438`. Controls the high frequency EQ of the tonestack on Channel 2.
- `Ch 2 Master` (`key: Ch2 Master`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the Master Volume of Channel 2.
- `Input Pad` (`key: Input Pad`, `id: 13`, `type: i`): valid values `-10dB`, `0dB`, `10dB`; default `0dB`. Raw range `0` to `2`; raw default `1`. Boosts or cuts the input signal into the preamp by 10 dB.
- `Ch 1 Boost` (`key: Ch1 Boost`, `id: 14`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, supplies an additional boost to Channel 1 for noticeably more gain and distortion.
- `Ch 2 Boost` (`key: Ch2 Boost`, `id: 15`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, supplies an additional boost to Channel 2 for noticeably more gain and distortion.
- `Limiter` (`key: Limiter`, `id: 16`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, enables the built-in limiter.
- `Threshold` (`key: Threshold`, `id: 17`, `type: f`): display range `-22` to `3` dB; default `-6`. Raw range `-22` to `3`; raw default `-6`. Sets the level above which limiting is applied. Lower values limit more of the signal; higher values limit only louder parts of the signal.
- `Level` (`key: Ch Vol`, `id: 18`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.

---

## Busy One Jump

- Model key: `HD2_PreampBusyOneJump`
- Model ID: `646`
- Type: Preamp
- Category: `preamp`
- Class: Bass
- DSP usage estimate: 6.6
- Based on: Pearce BC-1 preamp (Jumped channels)
- Agoura model: No

### Parameters

- `Ch 1 Drive` (`key: Ch1 Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the amount of Channel 1 gain applied to the signal, which influences the level of distortion.
- `Ch 1 Bass` (`key: Ch1 Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the low frequency EQ of the tonestack on Channel 1.
- `Ch 1 Mid` (`key: Ch1 Mid`, `id: 3`, `type: f`): display range `-15` to `15` dB; default `15`. Raw range `-15` to `15`; raw default `15`. Controls the midrange frequency EQ of the tonestack on Channel 1.
- `Ch 1 Mid Freq` (`key: Ch1 Mid Freq`, `id: 4`, `type: f`): display range `100` to `3000` Hz; default `150`. Raw range `100` to `3000`; raw default `150`. Sets the frequency boosted or cut by the Mid parameter on Channel 1.
- `Ch 1 Treble` (`key: Ch1 Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `1.5`. Raw range `0` to `1`; raw default `0.15`. Controls the high frequency EQ of the tonestack on Channel 1.
- `Ch 1 Master` (`key: Ch1 Master`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the Master Volume of Channel 1.
- `Ch 2 Drive` (`key: Ch2 Drive`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the amount of Channel 2 gain applied to the signal, which influences the level of distortion.
- `Ch 2 Bass` (`key: Ch2 Bass`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Controls the low frequency EQ of the tonestack on Channel 2.
- `Ch 2 Mid` (`key: Ch2 Mid`, `id: 9`, `type: f`): display range `-15` to `15` dB; default `0`. Raw range `-15` to `15`; raw default `0`. Controls the midrange frequency EQ of the tonestack on Channel 2.
- `Ch 2 Mid Freq` (`key: Ch2 Mid Freq`, `id: 10`, `type: f`): display range `90` to `3000` Hz; default `500`. Raw range `90` to `3000`; raw default `500`. Sets the frequency boosted or cut by the Mid parameter on Channel 2.
- `Ch 2 Treble` (`key: Ch2 Treble`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `4.38`. Raw range `0` to `1`; raw default `0.438`. Controls the high frequency EQ of the tonestack on Channel 2.
- `Ch 2 Master` (`key: Ch2 Master`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the Master Volume of Channel 2.
- `Input Pad` (`key: Input Pad`, `id: 13`, `type: i`): valid values `-10dB`, `0dB`, `10dB`; default `0dB`. Raw range `0` to `2`; raw default `1`. Boosts or cuts the input signal into the preamp by 10 dB.
- `Ch 1 Boost` (`key: Ch1 Boost`, `id: 14`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, supplies an additional boost to Channel 1 for noticeably more gain and distortion.
- `Ch 2 Boost` (`key: Ch2 Boost`, `id: 15`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, supplies an additional boost to Channel 2 for noticeably more gain and distortion.
- `Limiter` (`key: Limiter`, `id: 16`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, enables the built-in limiter.
- `Threshold` (`key: Threshold`, `id: 17`, `type: f`): display range `-22` to `3` dB; default `-6`. Raw range `-22` to `3`; raw default `-6`. Sets the level above which limiting is applied. Lower values limit more of the signal; higher values limit only louder parts of the signal.
- `Level` (`key: Ch Vol`, `id: 18`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the overall level of the Preamp block.

---

## Cali 400 Ch1

- Model key: `HD2_AmpCali400Ch1`
- Model ID: `590`
- Type: Amp
- Category: `amp`
- Class: Bass
- DSP usage estimate: 11.1
- Based on: MESA/Boogie Bass 400+ (channel 1)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.2`. Raw range `0` to `1`; raw default `0.62`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.6`. Raw range `0` to `1`; raw default `0.56`. Controls the midrange frequency EQ of the tonestack.
- `High Mid` (`key: HighMid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `6.4`. Raw range `0` to `1`; raw default `0.64`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.4`. Raw range `0` to `1`; raw default `0.74`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `9`. Raw range `0` to `1`; raw default `0.9`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Cali 400 Ch1

- Model key: `HD2_PreampCali400Ch1`
- Model ID: `592`
- Type: Preamp
- Category: `preamp`
- Class: Bass
- DSP usage estimate: 7.0
- Based on: MESA/Boogie Bass 400+ (channel 1)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.2`. Raw range `0` to `1`; raw default `0.62`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.6`. Raw range `0` to `1`; raw default `0.56`. Controls the midrange frequency EQ of the tonestack.
- `High Mid` (`key: HighMid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `6.4`. Raw range `0` to `1`; raw default `0.64`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.4`. Raw range `0` to `1`; raw default `0.74`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Cali 400 Ch2

- Model key: `HD2_AmpCali400Ch2`
- Model ID: `591`
- Type: Amp
- Category: `amp`
- Class: Bass
- DSP usage estimate: 11.1
- Based on: MESA/Boogie Bass 400+ (channel 2)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.9`. Raw range `0` to `1`; raw default `0.49`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.2`. Raw range `0` to `1`; raw default `0.52`. Controls the midrange frequency EQ of the tonestack.
- `High Mid` (`key: HighMid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.2`. Raw range `0` to `1`; raw default `0.62`. Controls the high midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `8.7`. Raw range `0` to `1`; raw default `0.87`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `7.2`. Raw range `0` to `1`; raw default `0.72`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Cali 400 Ch2

- Model key: `HD2_PreampCali400Ch2`
- Model ID: `593`
- Type: Preamp
- Category: `preamp`
- Class: Bass
- DSP usage estimate: 7.0
- Based on: MESA/Boogie Bass 400+ (channel 2)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.9`. Raw range `0` to `1`; raw default `0.49`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.2`. Raw range `0` to `1`; raw default `0.52`. Controls the midrange frequency EQ of the tonestack.
- `High Mid` (`key: HighMid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.2`. Raw range `0` to `1`; raw default `0.62`. Controls the high midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `8.7`. Raw range `0` to `1`; raw default `0.87`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `7.2`. Raw range `0` to `1`; raw default `0.72`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Cali Bass

- Model key: `HD2_AmpCaliBass`
- Model ID: `588`
- Type: Amp
- Category: `amp`
- Class: Bass
- DSP usage estimate: 6.5
- Based on: MESA/Boogie M9 Carbine
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `2.9`. Raw range `0` to `1`; raw default `0.29`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.4`. Raw range `0` to `1`; raw default `0.64`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.6`. Raw range `0` to `1`; raw default `0.56`. Controls the midrange frequency EQ of the tonestack.
- `High Mid` (`key: HighMid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the high midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `8.6`. Raw range `0` to `1`; raw default `0.86`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Voice` (`key: Voice`, `id: 9`, `type: i`): valid values `Voice 1`, `Voice 2`, `Voice 3`, `Voice 4`, `Voice 5`; default `Voice 4`. Raw range `0` to `4`; raw default `3`. This 5-position parameter changes the overall tonal character of the amp: Voices 1 and 2 are variations of a "scooped" sound, Voices 4 and 5 are variations of a "mid-forward" sound, and Voice 3 is flat.

---

## Cali Bass

- Model key: `HD2_PreampCaliBass`
- Model ID: `589`
- Type: Preamp
- Category: `preamp`
- Class: Bass
- DSP usage estimate: 6.8
- Based on: MESA/Boogie M9 Carbine
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `2.9`. Raw range `0` to `1`; raw default `0.29`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.4`. Raw range `0` to `1`; raw default `0.64`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.6`. Raw range `0` to `1`; raw default `0.56`. Controls the midrange frequency EQ of the tonestack.
- `High Mid` (`key: HighMid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the high midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `8.6`. Raw range `0` to `1`; raw default `0.86`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Voice` (`key: Voice`, `id: 9`, `type: i`): valid values `Voice 1`, `Voice 2`, `Voice 3`, `Voice 4`, `Voice 5`; default `Voice 4`. Raw range `0` to `4`; raw default `3`. This 5-position parameter changes the overall tonal character of the preamp: Voices 1 and 2 are variations of a "scooped" sound, Voices 4 and 5 are variations of a "mid-forward" sound, and Voice 3 is flat.

---

## Del Sol 300

- Model key: `HD2_AmpDelSol300`
- Model ID: `639`
- Type: Amp
- Category: `amp`
- Class: Bass
- DSP usage estimate: 4.3
- Based on: Sunn Coliseum 300
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `8.2`. Raw range `0` to `1`; raw default `0.82`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bright` (`key: Bright`, `id: 2`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. Selects the Input jack configuration--Normal (Off) or Bright (On).
- `Contour` (`key: Contour`, `id: 3`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. When on, acts as a "mid-scoop", reducing the midrange frequencies while boosting the low and high frequencies.
- `Master` (`key: Master`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `62.5 Hz` (`key: 62p5Hz`, `id: 6`, `type: f`): display range `-15` to `15` dB; default `9`. Raw range `-15` to `15`; raw default `9`. Boost or cut up to 15.0 dB.
- `125 Hz` (`key: 125Hz`, `id: 7`, `type: f`): display range `-15` to `15` dB; default `2.5`. Raw range `-15` to `15`; raw default `2.5`. Boost or cut up to 15.0 dB.
- `250 Hz` (`key: 250Hz`, `id: 8`, `type: f`): display range `-15` to `15` dB; default `-3.2`. Raw range `-15` to `15`; raw default `-3.2`. Boost or cut up to 15.0 dB.
- `500 Hz` (`key: 500Hz`, `id: 9`, `type: f`): display range `-15` to `15` dB; default `-2`. Raw range `-15` to `15`; raw default `-2`. Boost or cut up to 15.0 dB.
- `1 kHz` (`key: 1kHz`, `id: 10`, `type: f`): display range `-15` to `15` dB; default `4.5`. Raw range `-15` to `15`; raw default `4.5`. Boost or cut up to 15.0 dB.
- `2 kHz` (`key: 2kHz`, `id: 11`, `type: f`): display range `-15` to `15` dB; default `1.5`. Raw range `-15` to `15`; raw default `1.5`. Boost or cut up to 15.0 dB.
- `4 kHz` (`key: 4kHz`, `id: 12`, `type: f`): display range `-15` to `15` dB; default `5.7`. Raw range `-15` to `15`; raw default `5.7`. Boost or cut up to 15.0 dB.

---

## Del Sol 300

- Model key: `HD2_PreampDelSol300`
- Model ID: `640`
- Type: Preamp
- Category: `preamp`
- Class: Bass
- DSP usage estimate: 2.8
- Based on: Sunn Coliseum 300
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `8.2`. Raw range `0` to `1`; raw default `0.82`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `62.5 Hz` (`key: 62p5Hz`, `id: 2`, `type: f`): display range `-15` to `15` dB; default `9`. Raw range `-15` to `15`; raw default `9`. Boost or cut up to 15.0 dB.
- `125 Hz` (`key: 125Hz`, `id: 3`, `type: f`): display range `-15` to `15` dB; default `2.5`. Raw range `-15` to `15`; raw default `2.5`. Boost or cut up to 15.0 dB.
- `250 Hz` (`key: 250Hz`, `id: 4`, `type: f`): display range `-15` to `15` dB; default `-3.2`. Raw range `-15` to `15`; raw default `-3.2`. Boost or cut up to 15.0 dB.
- `500 Hz` (`key: 500Hz`, `id: 5`, `type: f`): display range `-15` to `15` dB; default `-2`. Raw range `-15` to `15`; raw default `-2`. Boost or cut up to 15.0 dB.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the Master Volume of the amplifier.
- `1 kHz` (`key: 1kHz`, `id: 8`, `type: f`): display range `-15` to `15` dB; default `4.5`. Raw range `-15` to `15`; raw default `4.5`. Boost or cut up to 15.0 dB.
- `2 kHz` (`key: 2kHz`, `id: 9`, `type: f`): display range `-15` to `15` dB; default `1.5`. Raw range `-15` to `15`; raw default `1.5`. Boost or cut up to 15.0 dB.
- `4 kHz` (`key: 4kHz`, `id: 10`, `type: f`): display range `-15` to `15` dB; default `5.7`. Raw range `-15` to `15`; raw default `5.7`. Boost or cut up to 15.0 dB.
- `Bright` (`key: Brite`, `id: 11`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. Selects the Input jack configuration--Normal (Off) or Bright (On).
- `Contour` (`key: Contour`, `id: 12`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. When on, acts as a "mid-scoop", reducing the midrange frequencies while boosting the low and high frequencies.

---

## G Cougar 800

- Model key: `HD2_AmpGCougar800`
- Model ID: `578`
- Type: Amp
- Category: `amp`
- Class: Bass
- DSP usage estimate: 8.7
- Based on: Gallien-Krueger GK 800RB
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `2.6`. Raw range `0` to `1`; raw default `0.26`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the low frequency EQ (60 Hz) of the tonestack.
- `Low Mid` (`key: LowMid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Controls the low midrange frequency EQ (250 Hz) of the tonestack.
- `High Mid` (`key: HighMid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the high midrange frequency EQ (1 kHz) of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the high frequency EQ (4 kHz) of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.8`. Raw range `0` to `1`; raw default `0.88`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Boost` (`key: Boost`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `4.7`. Raw range `0` to `1`; raw default `0.47`. Adds gain to the post-tonestack signal. At higher settings, a bit of overdrive/distortion can be heard.
- `Contour` (`key: Contour`, `id: 9`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. When on, adds a notch filter around 500 Hz to provide a smoother, rounder sound.

---

## G Cougar 800

- Model key: `HD2_PreampGCougar800`
- Model ID: `579`
- Type: Preamp
- Category: `preamp`
- Class: Bass
- DSP usage estimate: 6.6
- Based on: Gallien-Krueger GK 800RB
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `2.6`. Raw range `0` to `1`; raw default `0.26`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the low frequency EQ (60 Hz) of the tonestack.
- `Low Mid` (`key: LowMid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Controls the low midrange frequency EQ (250 Hz) of the tonestack.
- `High Mid` (`key: HighMid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the high midrange frequency EQ (1 kHz) of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the high frequency EQ (4 kHz) of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.8`. Raw range `0` to `1`; raw default `0.88`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Boost` (`key: Boost`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `4.7`. Raw range `0` to `1`; raw default `0.47`. Adds gain to the post-tonestack signal. At higher settings, a bit of overdrive/distortion can be heard.
- `Contour` (`key: Contour`, `id: 9`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. When on, adds a notch filter around 500 Hz to provide a smoother, rounder sound.

---

## Mandarin Bass 200

- Model key: `HD2_AmpMandarinBass200`
- Model ID: `733`
- Type: Amp
- Category: `amp`
- Class: Bass
- DSP usage estimate: 10.8
- Based on: Orange AD200 MkIII
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the low frequency EQ of the tonestack.
- `Middle` (`key: Middle`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `7.58`. Raw range `0` to `1`; raw default `0.758`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Mandarin Bass 200

- Model key: `HD2_PreampMandarinBass200`
- Model ID: `734`
- Type: Preamp
- Category: `preamp`
- Class: Bass
- DSP usage estimate: 7.4
- Based on: Orange AD200 MkIII
- Agoura model: No

### Parameters

- `Gain` (`key: Gain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Middle` (`key: Middle`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Mandarin Plus 200

- Model key: `Agoura_AmpMandarinPlus200`
- Model ID: `754`
- Type: Amp
- Category: `amp`
- Class: Bass
- DSP usage estimate: 16.3
- Based on: Orange AD200 MkIII (Passive & Active inputs)
- Agoura model: Yes

### Parameters

- `Jack` (`key: Jack`, `id: 1`, `type: b`): valid values `Passive`, `Active`; default `Passive`. Raw range `Off` to `On`; raw default `Off`. Selects the input jack on the amp--Passive or Active.
- `Drive` (`key: Drive`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the master volume of the amplifier.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Level` (`key: Level`, `id: 8`, `type: f`): display range `-40` to `10` dB; default `1.5`. Raw range `-40` to `10`; raw default `1.5`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Ripple` (`key: Ripple`, `id: 9`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Z PrePost` (`key: ZPrePost`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Determines the location of speaker impedance characteristics in the power amp, primarily due to negative feedback. Higher values mean the effects of the interaction appear at the output of the power amp (Post) and lower values mean more of the effect is fed back to the input of the power amp (Pre).
- `Hype` (`key: Hype`, `id: 11`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Depending on the amp and/or amp settings, increasing Hype may subtly or dramatically adjust various behind-the-scenes parameters to make the amp sound and feel smoother, fuller, punchier, tighter, and/or more forgiving, but at the expense of accuracy.

---

## US Drip Bass

- Model key: `Agoura_AmpUSDripBass`
- Model ID: `812`
- Type: Amp
- Category: `amp`
- Class: Bass
- DSP usage estimate: 25.1
- Based on: Fender Bassman Silverface (Bass, Normal, & Jumped channels)
- Agoura model: Yes

### Parameters

- `Channel` (`key: Channel`, `id: 1`, `type: i`): valid values `Bass`, `Normal`, `Jumped`; default `Normal`. Raw range `0` to `2`; raw default `1`. Selects the amp channel or which input is connected. "Jumped" jumps between the Bass and Normal channels.
- `Bass Drive` (`key: BasDrive`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Controls the amount of Bass channel gain applied to the signal. The inactive channel can sometimes "bleed into" the active channel, resulting in interesting interactions.
- `Bass Bass` (`key: BasBass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.2`. Raw range `0` to `1`; raw default `0.42`. Controls the low frequency EQ of the Bass channel's tonestack.
- `Bass Treble` (`key: BasTreb`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7.8`. Raw range `0` to `1`; raw default `0.78`. Controls the high frequency EQ of the Bass channel's tonestack.
- `Normal Drive` (`key: NrmDrive`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `2.3`. Raw range `0` to `1`; raw default `0.23`. Controls the amount of Normal channel gain applied to the signal. The inactive channel can sometimes "bleed into" the active channel, resulting in interesting interactions.
- `Normal Bass` (`key: NrmBass`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the low frequency EQ of the Normal channel's tonestack.
- `Normal Treble` (`key: NrmTreb`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `6.4`. Raw range `0` to `1`; raw default `0.64`. Controls the high frequency EQ of the Normal channel's tonestack.
- `Level` (`key: Level`, `id: 8`, `type: f`): display range `-40` to `10` dB; default `-10`. Raw range `-40` to `10`; raw default `-10`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Bass Deep` (`key: BasDeep`, `id: 9`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, applies a low frequency boost.
- `Normal Bright` (`key: NrmBright`, `id: 10`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, applies a high frequency boost to the Normal channel.
- `Master` (`key: Master`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 12`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 13`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Z PrePost` (`key: PrePost`, `id: 14`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Determines the location of speaker impedance characteristics in the power amp, primarily due to negative feedback. Higher values mean the effects of the interaction appear at the output of the power amp (Post) and lower values mean more of the effect is fed back to the input of the power amp (Pre).
- `Hype` (`key: Hype`, `id: 15`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Depending on the amp and/or amp settings, increasing Hype may subtly or dramatically adjust various behind-the-scenes parameters to make the amp sound and feel smoother, fuller, punchier, tighter, and/or more forgiving, but at the expense of accuracy.

---

## US Dripman Norm

- Model key: `HD2_AmpUSDripmanNorm`
- Model ID: `729`
- Type: Amp
- Category: `amp`
- Class: Bass
- DSP usage estimate: 12.3
- Based on: Marshall JCM-800 (2203)
- Agoura model: No

### Parameters

- `Drive` (`key: Norm Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.8`. Raw range `0` to `1`; raw default `0.68`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ of the tonestack.
- `Bright` (`key: Bright`, `id: 5`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. When on, boosts high frequencies. Is more obvious when Drive is set low.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## US Dripman Norm

- Model key: `HD2_PreampUSDripmanNorm`
- Model ID: `730`
- Type: Preamp
- Category: `preamp`
- Class: Bass
- DSP usage estimate: 9.2
- Based on: Marshall JCM-800 (2203)
- Agoura model: No

### Parameters

- `Drive` (`key: Norm Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.8`. Raw range `0` to `1`; raw default `0.68`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ of the tonestack.
- `Bright` (`key: Bright`, `id: 5`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. When on, boosts high frequencies. Is more obvious when Drive is set low.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Woody Blue

- Model key: `HD2_AmpWoodyBlue`
- Model ID: `641`
- Type: Amp
- Category: `amp`
- Class: Bass
- DSP usage estimate: 6.1
- Based on: Acoustic 360
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the low frequency EQ of the tonestack.
- `Variamp` (`key: Variamp`, `id: 3`, `type: i`): valid values `1`, `2`, `3`, `4`, `5`; default `4`. Raw range `0` to `4`; raw default `3`. This 5-position switch acts selects the mid frequency to be boosted or cut with the Effect parameter.
- `Effect` (`key: Effect`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `2.2`. Raw range `0` to `1`; raw default `0.22`. Controls the mid EQ of the tonestack, the frequency of which is controlled by the Variamp parameter.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Level controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone. Level is a great way to level your presets as you can quickly jump to each Amp block by pressing the Amp button.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Bright` (`key: Bright`, `id: 8`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, boosts high frequencies. Is more obvious when Drive is set low.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `2.7`. Raw range `0` to `1`; raw default `0.27`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Tuning Fork` (`key: TuningFork`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Controls the volume of the Tuning Fork's reference tone. Included only in the interest of hyper-accuracy.
- `TF Coarse` (`key: TFCoarse`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `4.7`. Raw range `0` to `1`; raw default `0.47`. Controls the coarse tuning of the Tuning Fork's reference tone.
- `TF Fine` (`key: TFFine`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `3.1`. Raw range `0` to `1`; raw default `0.31`. Controls the fine tuning of the Tuning Fork's reference tone.

---

## Woody Blue

- Model key: `HD2_PreampWoodyBlue`
- Model ID: `642`
- Type: Preamp
- Category: `preamp`
- Class: Bass
- DSP usage estimate: 5.0
- Based on: Acoustic 360
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the low frequency EQ of the tonestack.
- `Variamp` (`key: Variamp`, `id: 3`, `type: i`): valid values `1`, `2`, `3`, `4`, `5`; default `4`. Raw range `0` to `4`; raw default `3`. This 5-position switch acts selects the mid frequency to be boosted or cut with the Effect parameter.
- `Effect` (`key: Effect`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `2.2`. Raw range `0` to `1`; raw default `0.22`. Controls the mid EQ of the tonestack, the frequency of which is controlled by the Variamp parameter.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Level controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone. Level is a great way to level your presets as you can quickly jump to each Amp block by pressing the Amp button.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Bright` (`key: Bright`, `id: 8`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, boosts high frequencies. Is more obvious when Drive is set low.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `2.7`. Raw range `0` to `1`; raw default `0.27`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Tuning Fork` (`key: TuningFork`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Controls the volume of the Tuning Fork's reference tone. Included only in the interest of hyper-accuracy.
- `TF Coarse` (`key: TFCoarse`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `4.7`. Raw range `0` to `1`; raw default `0.47`. Controls the coarse tuning of the Tuning Fork's reference tone.
- `TF Fine` (`key: TFFine`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `3.1`. Raw range `0` to `1`; raw default `0.31`. Controls the fine tuning of the Tuning Fork's reference tone.
