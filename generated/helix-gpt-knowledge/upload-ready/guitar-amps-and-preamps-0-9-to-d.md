# Guitar amps and preamps (0-9 to D)

Upload-ready knowledge for guitar amp and preamp blocks.

Generated from the installed Helix Stadium desktop app bundle on 2026-05-07T22:33:14.224003+00:00.

Use display values for normal user-facing answers. Use model keys, IDs, and raw ranges only when the user asks for automation or low-level control details.

Model count: 70

---

## 2204 Mod

- Model key: `HD2_AmpLine62204Mod`
- Model ID: `628`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 11.2
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3.3`. Raw range `0` to `1`; raw default `0.33`. Controls the amount of gain applied to the signal, which influences the level of distortion. This model is based on a hot-rodded 2204, which has more gain than the stock version.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `7.7`. Raw range `0` to `1`; raw default `0.77`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.1`. Raw range `0` to `1`; raw default `0.51`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `8.1`. Raw range `0` to `1`; raw default `0.81`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `3.6`. Raw range `0` to `1`; raw default `0.36`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.7`. Raw range `0` to `1`; raw default `0.77`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `7.6`. Raw range `0` to `1`; raw default `0.76`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Pre Mid` (`key: PreMid`, `id: 9`, `type: f`): display range `-12` to `12` dB; default `4`. Raw range `-12` to `12`; raw default `4`. Controls the level of the modded midrange EQ inserted before the preamp.
- `Pre Mid Fc` (`key: PreMidFc`, `id: 10`, `type: f`): display range `500` to `1000` Hz; default `1000`. Raw range `500` to `1000`; raw default `1000`. Controls the frequency of the modded midrange EQ inserted before the preamp.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## 2204 Mod

- Model key: `HD2_PreampLine62204ModV2`
- Model ID: `632`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 10.2
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3.3`. Raw range `0` to `1`; raw default `0.33`. Controls the amount of gain applied to the signal, which influences the level of distortion. This model is based on a hot-rodded 2204, which has more gain than the stock version.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `7.7`. Raw range `0` to `1`; raw default `0.77`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.1`. Raw range `0` to `1`; raw default `0.51`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `8.1`. Raw range `0` to `1`; raw default `0.81`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `7.6`. Raw range `0` to `1`; raw default `0.76`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.7`. Raw range `0` to `1`; raw default `0.77`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Pre Mid` (`key: PreMid`, `id: 8`, `type: f`): display range `-12` to `12` dB; default `4`. Raw range `-12` to `12`; raw default `4`. Controls the level of the modded midrange EQ inserted before the preamp.
- `Pre Mid Fc` (`key: PreMidFc`, `id: 9`, `type: f`): display range `500` to `1000` Hz; default `1000`. Raw range `500` to `1000`; raw default `1000`. Controls the frequency of the modded midrange EQ inserted before the preamp.

---

## A30 Fawn Brt

- Model key: `HD2_AmpA30FawnBrt`
- Model ID: `612`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 10.1
- Based on: Vox AC-30 Fawn (Bright channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `7.8`. Raw range `0` to `1`; raw default `0.78`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Cut` (`key: Cut`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.6`. Raw range `0` to `1`; raw default `0.66`. Increasing this parameter cuts high frequencies in the negative feedback loop, which can mellow out the overall treble response.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `6.7`. Raw range `0` to `1`; raw default `0.67`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## A30 Fawn Brt

- Model key: `HD2_PreampA30FawnBrt`
- Model ID: `614`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 5.7
- Based on: Vox AC-30 Fawn (Bright channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `7.8`. Raw range `0` to `1`; raw default `0.78`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the overall level of the Preamp block.
- `Hum` (`key: Hum`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## A30 Fawn Nrm

- Model key: `HD2_AmpA30FawnNrm`
- Model ID: `613`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 10.1
- Based on: Vox AC-30 Fawn (Normal channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Cut` (`key: Cut`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Increasing this parameter cuts high frequencies in the negative feedback loop, which can mellow out the overall treble response.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## A30 Fawn Nrm

- Model key: `HD2_PreampA30FawnNrm`
- Model ID: `615`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 6.0
- Based on: Vox AC-30 Fawn (Normal channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Hum` (`key: Hum`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## ANGL Meteor

- Model key: `HD2_AmpANGLMeteor`
- Model ID: `610`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 13.5
- Based on: ENGL Fireball 100
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.6`. Raw range `0` to `1`; raw default `0.46`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.6`. Raw range `0` to `1`; raw default `0.46`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.6`. Raw range `0` to `1`; raw default `0.66`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `8.3`. Raw range `0` to `1`; raw default `0.83`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `4.2`. Raw range `0` to `1`; raw default `0.42`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.
- `Mid Boost` (`key: MidBoost`, `id: 13`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. When on, boosts midrange frequencies. Typically used when soloing.

---

## ANGL Meteor

- Model key: `HD2_PreampANGLMeteor`
- Model ID: `611`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 9.6
- Based on: ENGL Fireball 100
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.6`. Raw range `0` to `1`; raw default `0.46`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.6`. Raw range `0` to `1`; raw default `0.46`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.6`. Raw range `0` to `1`; raw default `0.66`. Controls the high frequency EQ of the tonestack.
- `Mid Boost` (`key: MidBoost`, `id: 5`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. When on, boosts midrange frequencies. Typically used when soloing.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `4.2`. Raw range `0` to `1`; raw default `0.42`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Archetype Clean

- Model key: `HD2_AmpArchetypeClean`
- Model ID: `637`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 12.5
- Based on: Paul Reed Smith Archon (Clean channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the amount of preamp gain applied to the signal. At high settings, a bit of saturation can be heard.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.3`. Raw range `0` to `1`; raw default `0.63`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `7.2`. Raw range `0` to `1`; raw default `0.72`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6.7`. Raw range `0` to `1`; raw default `0.67`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.
- `Depth` (`key: Depth`, `id: 13`, `type: f`): display range `0` to `10` unitless; default `4.2`. Raw range `0` to `1`; raw default `0.42`. Boosts low frequencies in the power amp.
- `Bright` (`key: BrightSW`, `id: 14`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, increases the brightness of the amp.

---

## Archetype Clean

- Model key: `HD2_PreampArchetypeClean`
- Model ID: `638`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 7.9
- Based on: Paul Reed Smith Archon (Clean channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the amount of preamp gain applied to the signal. At high settings, a bit of saturation can be heard.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.3`. Raw range `0` to `1`; raw default `0.63`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `7.2`. Raw range `0` to `1`; raw default `0.72`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6.7`. Raw range `0` to `1`; raw default `0.67`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Bright` (`key: BrightSW`, `id: 9`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, increases the brightness of the amp.

---

## Archetype Lead

- Model key: `HD2_AmpArchetypeLead`
- Model ID: `635`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 13.7
- Based on: Paul Reed Smith Archon (Lead channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.1`. Raw range `0` to `1`; raw default `0.61`. Controls the amount of preamp gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.3`. Raw range `0` to `1`; raw default `0.63`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.3`. Raw range `0` to `1`; raw default `0.53`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.1`. Raw range `0` to `1`; raw default `0.61`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5.1`. Raw range `0` to `1`; raw default `0.51`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.1`. Raw range `0` to `1`; raw default `0.81`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.
- `Depth` (`key: Depth`, `id: 13`, `type: f`): display range `0` to `10` unitless; default `6.1`. Raw range `0` to `1`; raw default `0.61`. Boosts low frequencies in the power amp.

---

## Archetype Lead

- Model key: `HD2_PreampArchetypeLead`
- Model ID: `636`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 9.1
- Based on: Paul Reed Smith Archon (Lead channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.1`. Raw range `0` to `1`; raw default `0.61`. Controls the amount of preamp gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.3`. Raw range `0` to `1`; raw default `0.63`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.3`. Raw range `0` to `1`; raw default `0.53`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.1`. Raw range `0` to `1`; raw default `0.61`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.1`. Raw range `0` to `1`; raw default `0.81`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Aristocrat

- Model key: `HD2_AmpLine6Aristocrat`
- Model ID: `713`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 11.9
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.4`. Raw range `0` to `1`; raw default `0.54`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `4.7`. Raw range `0` to `1`; raw default `0.47`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Boost` (`key: Boost`, `id: 7`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Controls the amount of Drive from the built in Distortion > Kinky Boost.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: HumSwitch`, `id: 9`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Bias` (`key: Bias`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Aristocrat

- Model key: `HD2_PreampLine6Aristocrat`
- Model ID: `717`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 12.1
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.4`. Raw range `0` to `1`; raw default `0.54`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `4.7`. Raw range `0` to `1`; raw default `0.47`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the overall level of the Preamp block.
- `Boost` (`key: Boost`, `id: 7`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Controls the amount of Drive from the built in Distortion > Kinky Boost.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: HumSwitch`, `id: 9`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Badonk

- Model key: `HD2_AmpLine6Badonk`
- Model ID: `643`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 8.9
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.3`. Raw range `0` to `1`; raw default `0.43`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.6`. Raw range `0` to `1`; raw default `0.76`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5.3`. Raw range `0` to `1`; raw default `0.53`. Controls the Master Volume of the amplifier.
- `Depth` (`key: Depth`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `3.7`. Raw range `0` to `1`; raw default `0.37`. Boosts low frequencies in the power amp, resulting in extra weight and thump.
- `Sag` (`key: Sag`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Bias` (`key: Bias`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Badonk

- Model key: `HD2_PreampLine6Badonk`
- Model ID: `644`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 8.3
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.3`. Raw range `0` to `1`; raw default `0.43`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5.3`. Raw range `0` to `1`; raw default `0.53`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.6`. Raw range `0` to `1`; raw default `0.76`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.

---

## Brit 2203

- Model key: `HD2_AmpBrit2203`
- Model ID: `735`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 13.9
- Based on: Marshall JCM-800, 2203, 100W
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.66`. Raw range `0` to `1`; raw default `0.566`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.98`. Raw range `0` to `1`; raw default `0.698`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `2.36`. Raw range `0` to `1`; raw default `0.236`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.
- `Input` (`key: InputType`, `id: 13`, `type: b`): valid values `Low`, `High`; default `High`. Raw range `Off` to `On`; raw default `On`. Selects the input of the amp--Low or High. Like the real amp, the level and gain difference here is significant.

---

## Brit 2203

- Model key: `HD2_PreampBrit2203`
- Model ID: `736`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 14.5
- Based on: Marshall JCM-800, 2203, 100W
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.66`. Raw range `0` to `1`; raw default `0.566`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.98`. Raw range `0` to `1`; raw default `0.698`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `2.36`. Raw range `0` to `1`; raw default `0.236`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Input` (`key: InputType`, `id: 9`, `type: b`): valid values `Low`, `High`; default `High`. Raw range `Off` to `On`; raw default `On`. Selects the input of the amp--Low or High. Like the real amp, the level and gain difference here is significant.

---

## Brit 2203MV

- Model key: `Agoura_AmpBrit2203MV`
- Model ID: `758`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 21.0
- Based on: Marshall JCM-800, 100W, 2203 (Low and High inputs)
- Agoura model: Yes

### Parameters

- `Jack` (`key: Jack`, `id: 1`, `type: i`): valid values `Low`, `High`; default `High`. Raw range `0` to `1`; raw default `1`. Selects the input jack on the amp--Low or High.
- `Drive` (`key: Drive`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `7.6`. Raw range `0` to `1`; raw default `0.76`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `7.1`. Raw range `0` to `1`; raw default `0.71`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.4`. Raw range `0` to `1`; raw default `0.64`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `4.4`. Raw range `0` to `1`; raw default `0.44`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `3.7`. Raw range `0` to `1`; raw default `0.37`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the Master Volume of the amplifier.
- `Level` (`key: Level`, `id: 8`, `type: f`): display range `-40` to `10` dB; default `-10`. Raw range `-40` to `10`; raw default `-10`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 9`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Z PrePost` (`key: ZPrePost`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Determines the location of speaker impedance characteristics in the power amp, primarily due to negative feedback. Higher values mean the effects of the interaction appear at the output of the power amp (Post) and lower values mean more of the effect is fed back to the input of the power amp (Pre).
- `Hype` (`key: Hype`, `id: 12`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Depending on the amp and/or amp settings, increasing Hype may subtly or dramatically adjust various behind-the-scenes parameters to make the amp sound and feel smoother, fuller, punchier, tighter, and/or more forgiving, but at the expense of accuracy.

---

## Brit 2204

- Model key: `HD2_AmpBrit2204`
- Model ID: `608`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 14.2
- Based on: Marshall JCM-800, 2204, 50W
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.8`. Raw range `0` to `1`; raw default `0.58`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.3`. Raw range `0` to `1`; raw default `0.63`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `7.1`. Raw range `0` to `1`; raw default `0.71`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.5`. Raw range `0` to `1`; raw default `0.85`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Brit 2204

- Model key: `HD2_PreampBrit2204`
- Model ID: `609`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 10.1
- Based on: Marshall JCM-800, 2204, 50W
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.8`. Raw range `0` to `1`; raw default `0.58`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.3`. Raw range `0` to `1`; raw default `0.63`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.5`. Raw range `0` to `1`; raw default `0.85`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Brit J45 Brt

- Model key: `HD2_AmpBritJ45Brt`
- Model ID: `604`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 12.6
- Based on: Marshall JTM-45 (Bright channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Brit J45 Brt

- Model key: `HD2_PreampBritJ45Brt`
- Model ID: `606`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 7.6
- Based on: Marshall JTM-45 (Bright channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Brit J45 Nrm

- Model key: `HD2_AmpBritJ45Nrm`
- Model ID: `605`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 12.6
- Based on: Marshall JTM-45 (Normal channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `7.4`. Raw range `0` to `1`; raw default `0.74`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `8.6`. Raw range `0` to `1`; raw default `0.86`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `6.6`. Raw range `0` to `1`; raw default `0.66`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Brit J45 Nrm

- Model key: `HD2_PreampBritJ45Nrm`
- Model ID: `607`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 7.6
- Based on: Marshall JTM-45 (Normal channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `7.4`. Raw range `0` to `1`; raw default `0.74`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `8.6`. Raw range `0` to `1`; raw default `0.86`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Brit Jujube

- Model key: `Agoura_AmpBritJujube`
- Model ID: `834`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 24.0
- Based on: Marshall Silver Jubilee (Rhythm, Rhythm Clip, & Lead channels)
- Agoura model: Yes

### Parameters

- `Channel` (`key: Chan`, `id: 1`, `type: i`): valid values `Rhythm`, `Rhythm Clip`, `Lead`, `Lead No Rhy Clp`; default `Lead`. Raw range `0` to `3`; raw default `2`. Selects the amp channel—Rhythm, Rhythm Clip, Lead, or Lead No Rhythm Clip.
- `Drive` (`key: Drive`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.375`. Raw range `0` to `1`; raw default `0.4375`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `3.68`. Raw range `0` to `1`; raw default `0.368`. Controls the low frequency EQ of the tonestack.
- `Middle` (`key: Mid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.1`. Raw range `0` to `1`; raw default `0.61`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5.66`. Raw range `0` to `1`; raw default `0.566`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `2.74`. Raw range `0` to `1`; raw default `0.274`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Lead Master` (`key: LeadMaster`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `4.12`. Raw range `0` to `1`; raw default `0.412`.
- `Level` (`key: Level`, `id: 8`, `type: f`): display range `-40` to `10` dB; default `-6`. Raw range `-40` to `10`; raw default `-6`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 10`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 11`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Z PrePost` (`key: ZPrePost`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Determines the location of speaker impedance characteristics in the power amp, primarily due to negative feedback. Higher values mean the effects of the interaction appear at the output of the power amp (Post) and lower values mean more of the effect is fed back to the input of the power amp (Pre).
- `Hype` (`key: Hype`, `id: 13`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Depending on the amp and/or amp settings, increasing Hype may subtly or dramatically adjust various behind-the-scenes parameters to make the amp sound and feel smoother, fuller, punchier, tighter, and/or more forgiving, but at the expense of accuracy.

---

## Brit P75 Brt

- Model key: `HD2_AmpBritP75Brt`
- Model ID: `600`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 12.7
- Based on: Park 75 (Bright channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3.8`. Raw range `0` to `1`; raw default `0.38`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.4`. Raw range `0` to `1`; raw default `0.64`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5.2`. Raw range `0` to `1`; raw default `0.52`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Brit P75 Brt

- Model key: `HD2_PreampBritP75Brt`
- Model ID: `602`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 7.4
- Based on: Park 75 (Bright channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3.8`. Raw range `0` to `1`; raw default `0.38`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.4`. Raw range `0` to `1`; raw default `0.64`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5.2`. Raw range `0` to `1`; raw default `0.52`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Brit P75 Nrm

- Model key: `HD2_AmpBritP75Nrm`
- Model ID: `601`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 12.7
- Based on: Park 75 (Normal channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.8`. Raw range `0` to `1`; raw default `0.48`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.7`. Raw range `0` to `1`; raw default `0.67`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `9`. Raw range `0` to `1`; raw default `0.9`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `7.6`. Raw range `0` to `1`; raw default `0.76`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `6.6`. Raw range `0` to `1`; raw default `0.66`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Brit P75 Nrm

- Model key: `HD2_PreampBritP75Nrm`
- Model ID: `603`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 7.4
- Based on: Park 75 (Normal channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.8`. Raw range `0` to `1`; raw default `0.48`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.7`. Raw range `0` to `1`; raw default `0.67`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `9`. Raw range `0` to `1`; raw default `0.9`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6.6`. Raw range `0` to `1`; raw default `0.66`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Brit Plexi

- Model key: `Agoura_AmpBritPlexi`
- Model ID: `756`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 23.0
- Based on: Marshall Super Lead 100 (Normal, Bright & Jumped channels)
- Agoura model: Yes

### Parameters

- `Channel` (`key: Channel`, `id: 1`, `type: i`): valid values `Normal`, `Bright`, `Jumped`; default `Jumped`. Raw range `0` to `2`; raw default `2`. Selects the amp channel or which input is connected. "Jumped" jumps between the Normal and Bright channels.
- `Normal Drive` (`key: NormDrv`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `2.2`. Raw range `0` to `1`; raw default `0.22`. Controls the amount of Normal channel gain applied to the signal. The inactive channel can sometimes "bleed into" the active channel, resulting in interesting interactions.
- `Bright Drive` (`key: BrightDrv`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the amount of Bright channel gain applied to the signal. The inactive channel can sometimes "bleed into" the active channel, resulting in interesting interactions.
- `Bass` (`key: Bass`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `6.4`. Raw range `0` to `1`; raw default `0.64`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5.94`. Raw range `0` to `1`; raw default `0.594`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Level` (`key: Level`, `id: 8`, `type: f`): display range `-40` to `10` dB; default `-10`. Raw range `-40` to `10`; raw default `-10`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Presence` (`key: Presence`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Sag` (`key: Sag`, `id: 10`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 11`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Z PrePost` (`key: ZPrePost`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Determines the location of speaker impedance characteristics in the power amp, primarily due to negative feedback. Higher values mean the effects of the interaction appear at the output of the power amp (Post) and lower values mean more of the effect is fed back to the input of the power amp (Pre).
- `Hype` (`key: Hype`, `id: 13`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Depending on the amp and/or amp settings, increasing Hype may subtly or dramatically adjust various behind-the-scenes parameters to make the amp sound and feel smoother, fuller, punchier, tighter, and/or more forgiving, but at the expense of accuracy.

---

## Brit Plexi Brt

- Model key: `HD2_AmpBritPlexiBrt`
- Model ID: `594`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 14.5
- Based on: Marshall Super Lead 100 (Bright channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `7.4`. Raw range `0` to `1`; raw default `0.74`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `9`. Raw range `0` to `1`; raw default `0.9`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5.7`. Raw range `0` to `1`; raw default `0.57`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Brit Plexi Brt

- Model key: `HD2_PreampBritPlexiBrt`
- Model ID: `597`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 9.7
- Based on: Marshall Super Lead 100 (Bright channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `7.4`. Raw range `0` to `1`; raw default `0.74`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `9`. Raw range `0` to `1`; raw default `0.9`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7.1`. Raw range `0` to `1`; raw default `0.71`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Brit Plexi Jump

- Model key: `HD2_AmpBritPlexiJump`
- Model ID: `595`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 16.3
- Based on: Marshall Super Lead 100 (Normal channel)
- Agoura model: No

### Parameters

- `Brt Drive` (`key: BrtDrive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `7.6`. Raw range `0` to `1`; raw default `0.76`. Controls the amount of Bright channel drive applied to the signal.
- `Nrm Drive` (`key: NrmDrive`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `7.2`. Raw range `0` to `1`; raw default `0.72`. Controls the amount of Normal channel drive applied to the signal.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `9`. Raw range `0` to `1`; raw default `0.9`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `8.1`. Raw range `0` to `1`; raw default `0.81`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `7.3`. Raw range `0` to `1`; raw default `0.73`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Presence` (`key: Presence`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Master` (`key: Master`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 13`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Brit Plexi Jump

- Model key: `HD2_PreampBritPlexiJump`
- Model ID: `598`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 11.2
- Based on: Marshall Super Lead 100 (Normal channel)
- Agoura model: No

### Parameters

- `Brt Drive` (`key: BrtDrive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `7.6`. Raw range `0` to `1`; raw default `0.76`. Controls the amount of Bright channel drive applied to the signal.
- `Nrm Drive` (`key: NrmDrive`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `7.2`. Raw range `0` to `1`; raw default `0.72`. Controls the amount of Normal channel drive applied to the signal.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `9`. Raw range `0` to `1`; raw default `0.9`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `8.1`. Raw range `0` to `1`; raw default `0.81`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `7.3`. Raw range `0` to `1`; raw default `0.73`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Brit Plexi Nrm

- Model key: `HD2_AmpBritPlexiNrm`
- Model ID: `596`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 14.3
- Based on: Marshall Super Lead 100 (Normal channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.1`. Raw range `0` to `1`; raw default `0.51`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3.3`. Raw range `0` to `1`; raw default `0.33`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.6`. Raw range `0` to `1`; raw default `0.66`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `8.3`. Raw range `0` to `1`; raw default `0.83`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `7.2`. Raw range `0` to `1`; raw default `0.72`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Brit Plexi Nrm

- Model key: `HD2_PreampBritPlexiNrm`
- Model ID: `599`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 9.5
- Based on: Marshall Super Lead 100 (Normal channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.1`. Raw range `0` to `1`; raw default `0.51`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3.3`. Raw range `0` to `1`; raw default `0.33`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.6`. Raw range `0` to `1`; raw default `0.66`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `8.3`. Raw range `0` to `1`; raw default `0.83`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Brit Trem Brt

- Model key: `HD2_AmpBritTremBrt`
- Model ID: `657`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 13.9
- Based on: Marshall JTM-50 (Bright channel)
- Agoura model: No

### Parameters

- `Drive` (`key: BrtDrive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `9.2`. Raw range `0` to `1`; raw default `0.92`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `4.7`. Raw range `0` to `1`; raw default `0.47`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Brit Trem Brt

- Model key: `HD2_PreampBritTremBrt`
- Model ID: `660`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 8.9
- Based on: Marshall JTM-50 (Bright channel)
- Agoura model: No

### Parameters

- `Drive` (`key: BrtDrive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `9.2`. Raw range `0` to `1`; raw default `0.92`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `4.7`. Raw range `0` to `1`; raw default `0.47`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Brit Trem Jump

- Model key: `HD2_AmpBritTremJump`
- Model ID: `658`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 15.2
- Based on: Marshall JTM-50 (Jumped channels)
- Agoura model: No

### Parameters

- `Brt Drive` (`key: BrtDrive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `8.3`. Raw range `0` to `1`; raw default `0.83`. Controls the amount of Bright channel drive applied to the signal, which influences the level of distortion.
- `Nrm Drive` (`key: NrmDrive`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the amount of Normal channel drive applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.6`. Raw range `0` to `1`; raw default `0.46`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `4.8`. Raw range `0` to `1`; raw default `0.48`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Presence` (`key: Presence`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Master` (`key: Master`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 13`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Brit Trem Jump

- Model key: `HD2_PreampBritTremJump`
- Model ID: `661`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 10.6
- Based on: Marshall JTM-50 (Jumped channels)
- Agoura model: No

### Parameters

- `Brt Drive` (`key: BrtDrive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `8.3`. Raw range `0` to `1`; raw default `0.83`. Controls the amount of Bright channel drive applied to the signal, which influences the level of distortion.
- `Nrm Drive` (`key: NrmDrive`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the amount of Normal channel drive applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.6`. Raw range `0` to `1`; raw default `0.46`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `4.8`. Raw range `0` to `1`; raw default `0.48`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Brit Trem Nrm

- Model key: `HD2_AmpBritTremNrm`
- Model ID: `659`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 13.9
- Based on: Marshall JTM-50 (Normal channel)
- Agoura model: No

### Parameters

- `Drive` (`key: NrmDrive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3.9`. Raw range `0` to `1`; raw default `0.39`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `9`. Raw range `0` to `1`; raw default `0.9`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `8.6`. Raw range `0` to `1`; raw default `0.86`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Brit Trem Nrm

- Model key: `HD2_PreampBritTremNrm`
- Model ID: `662`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 8.9
- Based on: Marshall JTM-50 (Normal channel)
- Agoura model: No

### Parameters

- `Drive` (`key: NrmDrive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3.9`. Raw range `0` to `1`; raw default `0.39`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `9`. Raw range `0` to `1`; raw default `0.9`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `8.6`. Raw range `0` to `1`; raw default `0.86`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Cali 2C+

- Model key: `Agoura_AmpCali2CPlus`
- Model ID: `832`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 24.7
- Based on: Mesa/Boogie Mark IIC (Normal & Lead channels, all switches)
- Agoura model: Yes

### Parameters

- `Channel` (`key: Channel`, `id: 1`, `type: b`): valid values `Normal`, `Lead`; default `Lead`. Raw range `Off` to `On`; raw default `On`. Selects the amp channel--Normal or Lead.
- `Drive` (`key: Volume1`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.54`. Raw range `0` to `1`; raw default `0.654`. Controls the amount of gain applied to the signal, which influences the level of distortion. This parameter affects both Normal and Lead channels.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `3.23`. Raw range `0` to `1`; raw default `0.323`. Controls the low frequency EQ of the tonestack.
- `Middle` (`key: Middle`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `3.24`. Raw range `0` to `1`; raw default `0.324`.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `7.42`. Raw range `0` to `1`; raw default `0.742`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Deep` (`key: Deep`, `id: 7`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. When on, boosts the bass frequencies before the graphic EQ.
- `Level` (`key: Level`, `id: 8`, `type: f`): display range `-40` to `10` dB; default `-10`. Raw range `-40` to `10`; raw default `-10`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Bass Shift` (`key: ShiftBass`, `id: 9`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, boosts the bass frequencies at the first gain stage.
- `Treble Shift` (`key: ShiftTreble`, `id: 10`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`.
- `Bright` (`key: Bright`, `id: 11`, `type: i`): valid values `Off`, `On`; default `Off`. Raw range `0` to `1`; raw default `0`. When on, applies a high frequency boost. This parameter interacts with the Drive parameter and affects both Normal and Lead channels.
- `Lead Drive` (`key: LeadDrive`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `7.2`. Raw range `0` to `1`; raw default `0.72`. Controls the amount of gain applied to the signal, which influences the level of distortion in the Lead channel.
- `Lead Brite` (`key: LeadBright`, `id: 13`, `type: i`): valid values `Off`, `On`; default `Off`. Raw range `0` to `1`; raw default `0`. When on, applies a high frequency boost. This parameter interacts with the LeadDrive parameter and affects only the Lead channel.
- `Lead Master` (`key: LeadMaster`, `id: 14`, `type: f`): display range `0` to `10` unitless; default `3.68`. Raw range `0` to `1`; raw default `0.368`.
- `Master` (`key: MasterVol`, `id: 15`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the Master Volume of the amplifier. This parameter affects both Normal and Lead channels.
- `Power` (`key: Class`, `id: 16`, `type: b`): valid values `Class A`, `Simulclass`; default `Class A`. Raw range `Off` to `On`; raw default `Off`. Selects the topology of the power amp.
- `80 Hz` (`key: 80 Hz`, `id: 17`, `type: f`): display range `-14` to `14` dB; default `0`. Raw range `-14` to `14`; raw default `0`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `240 Hz` (`key: 240 Hz`, `id: 18`, `type: f`): display range `-14` to `14` dB; default `0`. Raw range `-14` to `14`; raw default `0`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `750 Hz` (`key: 750 Hz`, `id: 19`, `type: f`): display range `-14` to `14` dB; default `0`. Raw range `-14` to `14`; raw default `0`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `2200 Hz` (`key: 2.2 KHz`, `id: 20`, `type: f`): display range `-10` to `10` dB; default `2`. Raw range `-10` to `10`; raw default `2`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `6600 Hz` (`key: 6.6 KHz`, `id: 21`, `type: f`): display range `-11` to `11` dB; default `0`. Raw range `-11` to `11`; raw default `0`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `Sag` (`key: Sag`, `id: 22`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 23`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Z PrePost` (`key: PrePost`, `id: 24`, `type: f`): display range `0` to `10` unitless; default `3.3`. Raw range `0` to `1`; raw default `0.33`. Determines the location of speaker impedance characteristics in the power amp, primarily due to negative feedback. Higher values mean the effects of the interaction appear at the output of the power amp (Post) and lower values mean more of the effect is fed back to the input of the power amp (Pre).
- `Hype` (`key: Hype`, `id: 25`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Depending on the amp and/or amp settings, increasing Hype may subtly or dramatically adjust various behind-the-scenes parameters to make the amp sound and feel smoother, fuller, punchier, tighter, and/or more forgiving, but at the expense of accuracy.

---

## Cali IV Lead

- Model key: `HD2_AmpCaliIVLead`
- Model ID: `626`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 14.5
- Based on: MESA/Boogie Mark IV (Lead channel)
- Agoura model: No

### Parameters

- `Lead Gain` (`key: LeadGain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the amount of gain applied to the signal, which influences the level of distortion. Lead Gain is before the tonestack.
- `Lead Drive` (`key: LeadDrive`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.4`. Raw range `0` to `1`; raw default `0.64`. Controls the amount of additional gain applied to the signal after the tonestack.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `1.4`. Raw range `0` to `1`; raw default `0.14`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `3.3`. Raw range `0` to `1`; raw default `0.33`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `8.1`. Raw range `0` to `1`; raw default `0.81`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.8`. Raw range `0` to `1`; raw default `0.88`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Presence` (`key: Presence`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `3.4`. Raw range `0` to `1`; raw default `0.34`. Boosts upper mid and high frequencies in the preamp.
- `Master` (`key: Master`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `1.5`. Raw range `0` to `1`; raw default `0.15`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.
- `80 Hz` (`key: 80Hz`, `id: 13`, `type: f`): display range `-13.75` to `13.25` dB; default `0`. Raw range `-13.75` to `13.25`; raw default `0`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `240 Hz` (`key: 240Hz`, `id: 14`, `type: f`): display range `-13.25` to `13.25` dB; default `-0.9`. Raw range `-13.25` to `13.25`; raw default `-0.9`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `750 Hz` (`key: 750Hz`, `id: 15`, `type: f`): display range `-13.25` to `13.25` dB; default `-2.9`. Raw range `-13.25` to `13.25`; raw default `-2.9`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `2200 Hz` (`key: 2200Hz`, `id: 16`, `type: f`): display range `-9.625` to `9.5` dB; default `-1.3`. Raw range `-9.625` to `9.5`; raw default `-1.3`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `6600 Hz` (`key: 6600Hz`, `id: 17`, `type: f`): display range `-9.625` to `9.5` dB; default `0`. Raw range `-9.625` to `9.5`; raw default `0`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.

---

## Cali IV Lead

- Model key: `HD2_PreampCaliIVLead`
- Model ID: `627`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 9.5
- Based on: MESA/Boogie Mark IV (Lead channel)
- Agoura model: No

### Parameters

- `Lead Gain` (`key: LeadGain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the amount of gain applied to the signal, which influences the level of distortion. Lead Gain is before the tonestack.
- `Lead Drive` (`key: LeadDrive`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.4`. Raw range `0` to `1`; raw default `0.64`. Controls the amount of additional gain applied to the signal after the tonestack.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `1.4`. Raw range `0` to `1`; raw default `0.14`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `3.3`. Raw range `0` to `1`; raw default `0.33`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `8.1`. Raw range `0` to `1`; raw default `0.81`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.8`. Raw range `0` to `1`; raw default `0.88`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Presence` (`key: Presence`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `3.4`. Raw range `0` to `1`; raw default `0.34`. Boosts upper mid and high frequencies in the preamp.
- `Master` (`key: Master`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `1.5`. Raw range `0` to `1`; raw default `0.15`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `80 Hz` (`key: 80Hz`, `id: 13`, `type: f`): display range `-13.75` to `13.25` dB; default `0`. Raw range `-13.75` to `13.25`; raw default `0`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `240 Hz` (`key: 240Hz`, `id: 14`, `type: f`): display range `-13.25` to `13.25` dB; default `-0.9`. Raw range `-13.25` to `13.25`; raw default `-0.9`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `750 Hz` (`key: 750Hz`, `id: 15`, `type: f`): display range `-13.25` to `13.25` dB; default `-2.9`. Raw range `-13.25` to `13.25`; raw default `-2.9`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `2200 Hz` (`key: 2200Hz`, `id: 16`, `type: f`): display range `-9.625` to `9.5` dB; default `-1.3`. Raw range `-9.625` to `9.5`; raw default `-1.3`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `6600 Hz` (`key: 6600Hz`, `id: 17`, `type: f`): display range `-9.625` to `9.5` dB; default `0`. Raw range `-9.625` to `9.5`; raw default `0`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.

---

## Cali IV Rhythm 1

- Model key: `HD2_AmpCaliIVR1`
- Model ID: `622`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 13.1
- Based on: MESA/Boogie Mark IV (Channel I)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.1`. Raw range `0` to `1`; raw default `0.41`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.3`. Raw range `0` to `1`; raw default `0.63`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.3`. Raw range `0` to `1`; raw default `0.63`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `6.1`. Raw range `0` to `1`; raw default `0.61`. Boosts upper mid and high frequencies in the preamp.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.5`. Raw range `0` to `1`; raw default `0.85`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.
- `80 Hz` (`key: 80Hz`, `id: 12`, `type: f`): display range `-13.75` to `13.25` dB; default `1.6`. Raw range `-13.75` to `13.25`; raw default `1.6`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `240 Hz` (`key: 240Hz`, `id: 13`, `type: f`): display range `-13.25` to `13.25` dB; default `0.1`. Raw range `-13.25` to `13.25`; raw default `0.1`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `750 Hz` (`key: 750Hz`, `id: 14`, `type: f`): display range `-13.25` to `13.25` dB; default `0`. Raw range `-13.25` to `13.25`; raw default `0`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `2200 Hz` (`key: 2200Hz`, `id: 15`, `type: f`): display range `-9.625` to `9.5` dB; default `-0.5`. Raw range `-9.625` to `9.5`; raw default `-0.5`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `6600 Hz` (`key: 6600Hz`, `id: 16`, `type: f`): display range `-9.625` to `9.5` dB; default `0.4`. Raw range `-9.625` to `9.5`; raw default `0.4`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.

---

## Cali IV Rhythm 1

- Model key: `HD2_PreampCaliIVR1`
- Model ID: `624`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 8.2
- Based on: MESA/Boogie Mark IV (Channel I)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.1`. Raw range `0` to `1`; raw default `0.41`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.3`. Raw range `0` to `1`; raw default `0.63`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.3`. Raw range `0` to `1`; raw default `0.63`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `6.1`. Raw range `0` to `1`; raw default `0.61`. Boosts upper mid and high frequencies in the preamp.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.5`. Raw range `0` to `1`; raw default `0.85`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `80 Hz` (`key: 80Hz`, `id: 9`, `type: f`): display range `-13.75` to `13.25` dB; default `1.6`. Raw range `-13.75` to `13.25`; raw default `1.6`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `240 Hz` (`key: 240Hz`, `id: 13`, `type: f`): display range `-13.25` to `13.25` dB; default `0.1`. Raw range `-13.25` to `13.25`; raw default `0.1`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `750 Hz` (`key: 750Hz`, `id: 14`, `type: f`): display range `-13.25` to `13.25` dB; default `0`. Raw range `-13.25` to `13.25`; raw default `0`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `2200 Hz` (`key: 2200Hz`, `id: 15`, `type: f`): display range `-9.625` to `9.5` dB; default `-0.5`. Raw range `-9.625` to `9.5`; raw default `-0.5`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `6600 Hz` (`key: 6600Hz`, `id: 16`, `type: f`): display range `-9.625` to `9.5` dB; default `0.4`. Raw range `-9.625` to `9.5`; raw default `0.4`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.

---

## Cali IV Rhythm 2

- Model key: `HD2_AmpCaliIVR2`
- Model ID: `623`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 13.1
- Based on: MESA/Boogie Mark IV (Channel II)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.4`. Raw range `0` to `1`; raw default `0.54`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `1`. Raw range `0` to `1`; raw default `0.1`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.4`. Raw range `0` to `1`; raw default `0.54`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7.2`. Raw range `0` to `1`; raw default `0.72`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `4.9`. Raw range `0` to `1`; raw default `0.49`. Boosts upper mid and high frequencies in the preamp.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.4`. Raw range `0` to `1`; raw default `0.74`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.
- `80 Hz` (`key: 80Hz`, `id: 13`, `type: f`): display range `-13.75` to `13.25` dB; default `1.4`. Raw range `-13.75` to `13.25`; raw default `1.4`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `240 Hz` (`key: 240Hz`, `id: 14`, `type: f`): display range `-13.25` to `13.25` dB; default `-2`. Raw range `-13.25` to `13.25`; raw default `-2`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `750 Hz` (`key: 750Hz`, `id: 15`, `type: f`): display range `-13.25` to `13.25` dB; default `-5.4`. Raw range `-13.25` to `13.25`; raw default `-5.4`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `2200 Hz` (`key: 2200Hz`, `id: 16`, `type: f`): display range `-9.625` to `9.5` dB; default `-1.7`. Raw range `-9.625` to `9.5`; raw default `-1.7`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `6600 Hz` (`key: 6600Hz`, `id: 17`, `type: f`): display range `-9.625` to `9.5` dB; default `0`. Raw range `-9.625` to `9.5`; raw default `0`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.

---

## Cali IV Rhythm 2

- Model key: `HD2_PreampCaliIVR2`
- Model ID: `625`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 8.2
- Based on: MESA/Boogie Mark IV (Channel II)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.4`. Raw range `0` to `1`; raw default `0.54`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `1`. Raw range `0` to `1`; raw default `0.1`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.4`. Raw range `0` to `1`; raw default `0.54`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7.2`. Raw range `0` to `1`; raw default `0.72`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `4.9`. Raw range `0` to `1`; raw default `0.49`. Boosts upper mid and high frequencies in the preamp.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.4`. Raw range `0` to `1`; raw default `0.74`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `80 Hz` (`key: 80Hz`, `id: 13`, `type: f`): display range `-13.75` to `13.25` dB; default `1.4`. Raw range `-13.75` to `13.25`; raw default `1.4`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `240 Hz` (`key: 240Hz`, `id: 14`, `type: f`): display range `-13.25` to `13.25` dB; default `-2`. Raw range `-13.25` to `13.25`; raw default `-2`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `750 Hz` (`key: 750Hz`, `id: 15`, `type: f`): display range `-13.25` to `13.25` dB; default `-5.4`. Raw range `-13.25` to `13.25`; raw default `-5.4`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `2200 Hz` (`key: 2200Hz`, `id: 16`, `type: f`): display range `-9.625` to `9.5` dB; default `-1.7`. Raw range `-9.625` to `9.5`; raw default `-1.7`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.
- `6600 Hz` (`key: 6600Hz`, `id: 17`, `type: f`): display range `-9.625` to `9.5` dB; default `0`. Raw range `-9.625` to `9.5`; raw default `0`. The amount of boost and cut is not equal for all bands. This is consistent with the real amp.

---

## Cali Rectifire

- Model key: `HD2_AmpCaliRectifire`
- Model ID: `586`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 14.3
- Based on: MESA/Boogie Dual Rectifier
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.8`. Raw range `0` to `1`; raw default `0.68`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `2.6`. Raw range `0` to `1`; raw default `0.26`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.9`. Raw range `0` to `1`; raw default `0.59`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `3.8`. Raw range `0` to `1`; raw default `0.38`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `2`. Raw range `0` to `1`; raw default `0.2`. Boosts upper mid and high frequencies in the preamp.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6.7`. Raw range `0` to `1`; raw default `0.67`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `3.3`. Raw range `0` to `1`; raw default `0.33`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `2.7`. Raw range `0` to `1`; raw default `0.27`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `2`. Raw range `0` to `1`; raw default `0.2`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `4.8`. Raw range `0` to `1`; raw default `0.48`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Cali Rectifire

- Model key: `HD2_PreampCaliRectifire`
- Model ID: `587`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 9.8
- Based on: MESA/Boogie Dual Rectifier
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.8`. Raw range `0` to `1`; raw default `0.68`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `2.6`. Raw range `0` to `1`; raw default `0.26`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.9`. Raw range `0` to `1`; raw default `0.59`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `3.8`. Raw range `0` to `1`; raw default `0.38`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `2`. Raw range `0` to `1`; raw default `0.2`. Boosts upper mid and high frequencies in the preamp.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6.7`. Raw range `0` to `1`; raw default `0.67`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `3.3`. Raw range `0` to `1`; raw default `0.33`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `2.7`. Raw range `0` to `1`; raw default `0.27`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Cali Texas Ch1

- Model key: `HD2_AmpCaliTexasCh1`
- Model ID: `671`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 12.5
- Based on: MESA/Boogie Lone Star (Clean channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.8`. Raw range `0` to `1`; raw default `0.68`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.1`. Raw range `0` to `1`; raw default `0.61`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5.8`. Raw range `0` to `1`; raw default `0.58`. Boosts upper mid and high frequencies in the preamp.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Cali Texas Ch1

- Model key: `HD2_PreampCaliTexasCh1`
- Model ID: `672`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 7.9
- Based on: MESA/Boogie Lone Star (Clean channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.8`. Raw range `0` to `1`; raw default `0.68`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Boosts upper mid and high frequencies in the preamp.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the Master Volume of the amplifier.

---

## Cali Texas Ch2

- Model key: `HD2_AmpCaliTexasCh2`
- Model ID: `667`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 13.9
- Based on: MESA/Boogie Lone Star (Drive channel)
- Agoura model: No

### Parameters

- `Drive 1` (`key: Drive 1`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `8.8`. Raw range `0` to `1`; raw default `0.88`. Controls the amount of Channel 1 gain applied to the signal.
- `Drive 2` (`key: Drive 2`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of Channel 2 gain applied to the signal.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `7.3`. Raw range `0` to `1`; raw default `0.73`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `3.6`. Raw range `0` to `1`; raw default `0.36`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Shape` (`key: TS Shape`, `id: 7`, `type: i`): valid values `Normal`, `Thick`, `Thicker`; default `Normal`. Raw range `0` to `2`; raw default `0`. Selects which frequencies the Treble parameter controls. "Normal" maintains Treble as a traditional high frequency EQ. "Thick" lowers the Treble frequency for a more robust, throatier sound. "Thicker" lowers the treble frequency even further and saturates that region, for singing sustain.
- `Presence` (`key: Presence`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `6.6`. Raw range `0` to `1`; raw default `0.66`. Boosts upper mid and high frequencies in the preamp.
- `Master` (`key: Master`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 14`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Cali Texas Ch2

- Model key: `HD2_PreampCaliTexasCh2`
- Model ID: `668`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 9.3
- Based on: MESA/Boogie Lone Star (Drive channel)
- Agoura model: No

### Parameters

- `Drive 1` (`key: Drive 1`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `8.8`. Raw range `0` to `1`; raw default `0.88`. Controls the amount of Channel 1 gain applied to the signal.
- `Drive 2` (`key: Drive 2`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of Channel 2 gain applied to the signal.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `7.3`. Raw range `0` to `1`; raw default `0.73`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `4.3`. Raw range `0` to `1`; raw default `0.43`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Shape` (`key: TS Shape`, `id: 7`, `type: i`): valid values `Normal`, `Thick`, `Thicker`; default `Normal`. Raw range `0` to `2`; raw default `0`. Selects which frequencies the Treble parameter controls. "Normal" maintains Treble as a traditional high frequency EQ. "Thick" lowers the Treble frequency for a more robust, throatier sound. "Thicker" lowers the treble frequency even further and saturates that region, for singing sustain.
- `Presence` (`key: Presence`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `6.6`. Raw range `0` to `1`; raw default `0.66`. Boosts upper mid and high frequencies in the preamp.
- `Master` (`key: Master`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Controls the Master Volume of the amplifier.

---

## Carillon

- Model key: `HD2_AmpLine6Carillon`
- Model ID: `712`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 11.1
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the overall level of the Amp block.
- `Boost` (`key: Boost`, `id: 7`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Controls the level of the built-in germanium transistor treble booster.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: HumSwitch`, `id: 9`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Bias` (`key: Bias`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Carillon

- Model key: `HD2_PreampLine6Carillon`
- Model ID: `718`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 11.3
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the overall level of the Preamp block.
- `Boost` (`key: Boost`, `id: 7`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Controls the level of the built-in germanium transistor treble booster.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: HumSwitch`, `id: 9`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Cartographer

- Model key: `HD2_AmpCartographer`
- Model ID: `655`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 13.4
- Based on: Ben Adrian Cartographer
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the amount of gain between the first and second tube gain stages. The character of the amp changes drastically depending on where Drive 1 and Drive 2 are set in relation to one another.
- `Drive2` (`key: Drive2`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the amount of gain between the second and third tube gain stages. The character of the amp changes drastically depending on where Drive 1 and Drive 2 are set in relation to one another.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the Master Volume of the amplifier.
- `Presence` (`key: Presence`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `2`. Raw range `0` to `1`; raw default `0.2`. Controls the level of high frequencies in the power amp.
- `Depth` (`key: Depth`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Controls the level of low frequencies in the power amp.
- `Bright 1` (`key: Bright1`, `id: 10`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, adds a high boost after the first tube preamp stage, affecting the character and harmonics of the preamp gain. Can be subtle, especially at higher Drive settings.
- `Bright 2` (`key: Bright2`, `id: 11`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, adds a high boost after the second tube preamp stage, affecting the character and harmonics of the preamp gain. Can be subtle, especially at higher Drive settings.
- `Sag` (`key: Sag`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 13`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 14`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 15`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 16`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Cartographer

- Model key: `HD2_PreampCartographer`
- Model ID: `656`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 9.3
- Based on: Ben Adrian Cartographer
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the amount of gain between the first and second tube gain stages. The character of the amp changes drastically depending on where Drive 1 and Drive 2 are set in relation to one another.
- `Drive2` (`key: Drive2`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the amount of gain between the second and third tube gain stages. The character of the amp changes drastically depending on where Drive 1 and Drive 2 are set in relation to one another.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the Master Volume of the amplifier.
- `Bright 1` (`key: Bright1`, `id: 8`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, adds a high boost after the first tube preamp stage, affecting the character and harmonics of the preamp gain. Can be subtle, especially at higher Drive settings.
- `Bright 2` (`key: Bright2`, `id: 9`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, adds a high boost after the second tube preamp stage, affecting the character and harmonics of the preamp gain. Can be subtle, especially at higher Drive settings.
- `Sag` (`key: Sag`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Clarity

- Model key: `HD2_AmpLine6Clarity`
- Model ID: `710`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 8.6
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3.8`. Raw range `0` to `1`; raw default `0.38`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.2`. Raw range `0` to `1`; raw default `0.62`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `3.8`. Raw range `0` to `1`; raw default `0.38`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `1`. Raw range `0` to `1`; raw default `0.1`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the overall level of the Amp block.
- `Boost` (`key: Boost`, `id: 7`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Adds a tube stage with gentle clipping at lower values and increased distortion at higher values.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: HumSwitch`, `id: 9`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Clarity

- Model key: `HD2_PreampLine6Clarity`
- Model ID: `719`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 8.8
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3.8`. Raw range `0` to `1`; raw default `0.38`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.2`. Raw range `0` to `1`; raw default `0.62`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `3.8`. Raw range `0` to `1`; raw default `0.38`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the overall level of the Preamp block.
- `Boost` (`key: Boost`, `id: 7`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Adds a tube stage with gentle clipping at lower values and increased distortion at higher values.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: HumSwitch`, `id: 9`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Das Benzin Lead

- Model key: `HD2_AmpDasBenzinLead`
- Model ID: `693`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 13.8
- Based on: Diezel VH4 (Lead channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.3`. Raw range `0` to `1`; raw default `0.63`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `6.1`. Raw range `0` to `1`; raw default `0.61`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.2`. Raw range `0` to `1`; raw default `0.82`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5.8`. Raw range `0` to `1`; raw default `0.58`. Controls the Master Volume of the amplifier.
- `Deep` (`key: Deep`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5.3`. Raw range `0` to `1`; raw default `0.53`. Adds low punch (centered around 80 Hz) to the the power amp.
- `Sag` (`key: Sag`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Das Benzin Lead

- Model key: `HD2_PreampDasBenzinLead`
- Model ID: `694`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 9.8
- Based on: Diezel VH4 (Lead channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.3`. Raw range `0` to `1`; raw default `0.63`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5.8`. Raw range `0` to `1`; raw default `0.58`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.2`. Raw range `0` to `1`; raw default `0.82`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.

---

## Das Benzin Mega

- Model key: `HD2_AmpDasBenzinMega`
- Model ID: `695`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 12.6
- Based on: Diezel VH4 (Mega channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.4`. Raw range `0` to `1`; raw default `0.64`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.6`. Raw range `0` to `1`; raw default `0.56`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5.8`. Raw range `0` to `1`; raw default `0.58`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5.4`. Raw range `0` to `1`; raw default `0.54`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `9`. Raw range `0` to `1`; raw default `0.9`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the Master Volume of the amplifier.
- `Deep` (`key: Deep`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5.8`. Raw range `0` to `1`; raw default `0.58`. Adds low punch (centered around 80 Hz) to the the power amp.
- `Sag` (`key: Sag`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 13`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 14`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Das Benzin Mega

- Model key: `HD2_PreampDasBenzinMega`
- Model ID: `696`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 8.5
- Based on: Diezel VH4 (Mega channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.4`. Raw range `0` to `1`; raw default `0.64`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.6`. Raw range `0` to `1`; raw default `0.56`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5.8`. Raw range `0` to `1`; raw default `0.58`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `9`. Raw range `0` to `1`; raw default `0.9`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.

---

## Derailed Ingrid

- Model key: `HD2_AmpDerailedIngrid`
- Model ID: `651`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 13.0
- Based on: Trainwreck Circuits Express
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.1`. Raw range `0` to `1`; raw default `0.61`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.1`. Raw range `0` to `1`; raw default `0.51`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `4.3`. Raw range `0` to `1`; raw default `0.43`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `4.8`. Raw range `0` to `1`; raw default `0.48`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.8`. Raw range `0` to `1`; raw default `0.88`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `8.5`. Raw range `0` to `1`; raw default `0.85`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.
- `Bright` (`key: Bright`, `id: 13`, `type: i`): display range `0` to `2` unitless; default `0`. Raw range `0` to `2`; raw default `0`. Selects the amount of brightness--Off (0), softer brightness (1), or harder, edgy brightness (2). This parameter is more dramatic at lower Drive settings.

---

## Derailed Ingrid

- Model key: `HD2_PreampDerailedIngrid`
- Model ID: `652`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 7.9
- Based on: Trainwreck Circuits Express
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.1`. Raw range `0` to `1`; raw default `0.61`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.1`. Raw range `0` to `1`; raw default `0.51`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `4.3`. Raw range `0` to `1`; raw default `0.43`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `8.5`. Raw range `0` to `1`; raw default `0.85`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.8`. Raw range `0` to `1`; raw default `0.88`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Bright` (`key: Bright`, `id: 9`, `type: i`): display range `0` to `2` unitless; default `0`. Raw range `0` to `2`; raw default `0`. Selects the amount of brightness--Off (0), softer brightness (1), or harder, edgy brightness (2). This parameter is more dramatic at lower Drive settings.

---

## Divided Duo

- Model key: `HD2_AmpDividedDuo`
- Model ID: `584`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 11.7
- Based on: Ã·13 JRT 9/15
- Agoura model: No

### Parameters

- `Drive 1` (`key: Drive 1`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.1`. Raw range `0` to `1`; raw default `0.41`. Controls the amount of Channel 1 gain applied to the signal, which has a bright and clean sound with plenty of headroom. Some breakup can be heard at higher settings.
- `Drive 2` (`key: Drive 2`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3.3`. Raw range `0` to `1`; raw default `0.33`. Controls the amount of Channel 2 gain applied to the signal, which has a thicker low mid response, more overdrive, and lower headroom.
- `Tone` (`key: Tone`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.3`. Raw range `0` to `1`; raw default `0.43`. Adjusts the overall tonal character of the amplifier, allowing you to emphasize either the bass or treble frequencies. Lower settings decreases upper mid and high frequencies and higher settings add mid and high frequencies, with a slight shift in the mids.
- `Cut` (`key: Cut`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5.7`. Raw range `0` to `1`; raw default `0.57`. Increasing this parameter cuts high frequencies, which can be used to soften or lessen any undesirable harshness.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `0.6`. Raw range `0` to `1`; raw default `0.06`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6.8`. Raw range `0` to `1`; raw default `0.68`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `6.7`. Raw range `0` to `1`; raw default `0.67`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Divided Duo

- Model key: `HD2_PreampDividedDuo`
- Model ID: `585`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 6.6
- Based on: Ã·13 JRT 9/15
- Agoura model: No

### Parameters

- `Drive 1` (`key: Drive1`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.1`. Raw range `0` to `1`; raw default `0.41`. Controls the amount of Channel 1 gain applied to the signal, which has a bright and clean sound with plenty of headroom. Some breakup can be heard at higher settings.
- `Drive 2` (`key: Drive2`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3.3`. Raw range `0` to `1`; raw default `0.33`. Controls the amount of Channel 2 gain applied to the signal, which has a thicker low mid response, more overdrive, and lower headroom.
- `Tone` (`key: Tone`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.3`. Raw range `0` to `1`; raw default `0.43`. Adjusts the overall tonal character of the amplifier, allowing you to emphasize either the bass or treble frequencies. Lower settings decreases upper mid and high frequencies and higher settings add mid and high frequencies, with a slight shift in the mids.
- `Master` (`key: Master`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `6.8`. Raw range `0` to `1`; raw default `0.68`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6.7`. Raw range `0` to `1`; raw default `0.67`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
