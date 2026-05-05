# Guitar amps and preamps (M to W)

Upload-ready knowledge for guitar amp and preamp blocks.

Generated from the installed Helix Stadium desktop app bundle on 2026-04-19T22:24:30.490746+00:00.

Use display values for normal user-facing answers. Use model keys, IDs, and raw ranges only when the user asks for automation or low-level control details.

Model count: 70

---

## Moo)))n Jump

- Model key: `HD2_AmpMoonJump`
- Model ID: `702`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 14.3
- Based on: Sunn Model T (Jumped channels)
- Agoura model: No

### Parameters

- `Brt Drive` (`key: BrtDrive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the amount of Bright channel gain applied to the signal.
- `Nrm Drive` (`key: NrmDrive`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Controls the amount of Normal channel gain applied to the signal.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5.4`. Raw range `0` to `1`; raw default `0.54`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Presence` (`key: Presence`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Master` (`key: Master`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 13`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Moo)))n Jump

- Model key: `HD2_PreampMoonJump`
- Model ID: `705`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage: 9.8
- Based on: Sunn Model T (Jumped channels)
- Agoura model: No

### Parameters

- `Brt Drive` (`key: BrtDrive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the amount of Bright channel gain applied to the signal.
- `Nrm Drive` (`key: NrmDrive`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Controls the amount of Normal channel gain applied to the signal.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5.4`. Raw range `0` to `1`; raw default `0.54`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Presence` (`key: Presence`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Master` (`key: Master`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Moo)))n Nrm

- Model key: `HD2_AmpMoonNrm`
- Model ID: `701`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 13.0
- Based on: Sunn Model T (Normal channel)
- Agoura model: No

### Parameters

- `Brt Drive` (`key: BrtDrive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Controls the amount of Bright channel gain, which can still add a bit of girth to the signal when the Normal channel is active.
- `Nrm Drive` (`key: NrmDrive`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the amount of Normal channel gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Presence` (`key: Presence`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Master` (`key: Master`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 13`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Moo)))n Nrm

- Model key: `HD2_PreampMoonNrm`
- Model ID: `704`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage: 8.6
- Based on: Sunn Model T (Normal channel)
- Agoura model: No

### Parameters

- `Brt Drive` (`key: BrtDrive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Controls the amount of Bright channel gain, which can still add a bit of girth to the signal when the Normal channel is active.
- `Nrm Drive` (`key: NrmDrive`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the amount of Normal channel gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Presence` (`key: Presence`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Master` (`key: Master`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Oblivion

- Model key: `HD2_AmpLine6Oblivion`
- Model ID: `714`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 13.8
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.7`. Raw range `0` to `1`; raw default `0.57`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `3.1`. Raw range `0` to `1`; raw default `0.31`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `4.8`. Raw range `0` to `1`; raw default `0.48`. Controls the overall level of the Amp block.
- `Boost` (`key: Boost`, `id: 7`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Controls the amount of Drive from the built in Distortion > Stupor OD.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: HumSwitch`, `id: 9`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Bias` (`key: Bias`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Oblivion

- Model key: `HD2_PreampLine6Oblivion`
- Model ID: `715`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage: 13.8
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.7`. Raw range `0` to `1`; raw default `0.57`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `4.8`. Raw range `0` to `1`; raw default `0.48`. Controls the overall level of the Preamp block.
- `Boost` (`key: Boost`, `id: 7`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Controls the amount of Drive from the built in Distortion > Stupor OD.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: HumSwitch`, `id: 9`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## PV Panama

- Model key: `HD2_AmpPVPanama`
- Model ID: `558`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 13.6
- Based on: Peavey 5150
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.3`. Raw range `0` to `1`; raw default `0.53`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `1`. Raw range `0` to `1`; raw default `0.1`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `2.4`. Raw range `0` to `1`; raw default `0.24`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.1`. Raw range `0` to `1`; raw default `0.81`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `4.6`. Raw range `0` to `1`; raw default `0.46`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `3.9`. Raw range `0` to `1`; raw default `0.39`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.
- `Resonance` (`key: Resonance`, `id: 13`, `type: f`): display range `0` to `10` unitless; default `4.9`. Raw range `0` to `1`; raw default `0.49`. Controls the level of low frequencies in the power amp.

---

## PV Panama

- Model key: `HD2_PreampPVPanama`
- Model ID: `559`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage: 8.5
- Based on: Peavey 5150
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.3`. Raw range `0` to `1`; raw default `0.53`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `1`. Raw range `0` to `1`; raw default `0.1`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `4.6`. Raw range `0` to `1`; raw default `0.46`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.1`. Raw range `0` to `1`; raw default `0.81`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## PV Vitriol Clean

- Model key: `HD2_AmpPVVitriolClean`
- Model ID: `723`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 14.6
- Based on: Peavey Invective (Clean channel)
- Agoura model: No

### Parameters

- `Pre Gain` (`key: PreGain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of gain applied to the signal. Higher settings add a bit of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the high frequency EQ of the tonestack.
- `Post Gain` (`key: PostGain`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the Clean channel's level going into the power amp.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the overall level of the entire Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `8.5`. Raw range `0` to `1`; raw default `0.85`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.
- `Presence` (`key: Presence`, `id: 13`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Controls the high frequency response in the power amp.
- `Depth` (`key: Depth`, `id: 14`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Controls the low frequency response in the power amp.

---

## PV Vitriol Clean

- Model key: `HD2_PreampPVVitriolClean`
- Model ID: `728`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage: 10.6
- Based on: Peavey Invective (Clean channel)
- Agoura model: No

### Parameters

- `Pre Gain` (`key: PreGain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of gain applied to the signal. Higher settings add a bit of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the high frequency EQ of the tonestack.
- `Post Gain` (`key: PostGain`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the Clean channel's level going into the power amp.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the overall level of the entire Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `8.5`. Raw range `0` to `1`; raw default `0.85`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## PV Vitriol Crunch

- Model key: `HD2_AmpPVVitriolCrunch`
- Model ID: `708`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 18.4
- Based on: Peavey Invective (Crunch channel)
- Agoura model: No

### Parameters

- `Pre Gain` (`key: PreGain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.2`. Raw range `0` to `1`; raw default `0.62`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5.9`. Raw range `0` to `1`; raw default `0.59`. Controls the high frequency EQ of the tonestack.
- `Post Gain` (`key: PostGain`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `7.3`. Raw range `0` to `1`; raw default `0.73`. Controls the Crunch channel's level going into the power amp.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.2`. Raw range `0` to `1`; raw default `0.82`. Controls the overall level of the entire Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5.6`. Raw range `0` to `1`; raw default `0.56`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.
- `Presence` (`key: Presence`, `id: 13`, `type: f`): display range `0` to `10` unitless; default `3.7`. Raw range `0` to `1`; raw default `0.37`. Controls the high frequency response in the power amp.
- `Depth` (`key: Depth`, `id: 14`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency response in the power amp.

---

## PV Vitriol Crunch

- Model key: `HD2_PreampPVVitriolCrunch`
- Model ID: `722`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage: 13.8
- Based on: Peavey Invective (Crunch channel)
- Agoura model: No

### Parameters

- `Pre Gain` (`key: PreGain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.2`. Raw range `0` to `1`; raw default `0.62`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5.9`. Raw range `0` to `1`; raw default `0.59`. Controls the high frequency EQ of the tonestack.
- `Post Gain` (`key: PostGain`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `7.3`. Raw range `0` to `1`; raw default `0.73`. Controls the Crunch channel's level going into the power amp.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.2`. Raw range `0` to `1`; raw default `0.82`. Controls the overall level of the entire Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5.6`. Raw range `0` to `1`; raw default `0.56`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## PV Vitriol Lead

- Model key: `HD2_AmpPVVitriolLead`
- Model ID: `707`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 18.4
- Based on: Peavey Invective (Lead channel)
- Agoura model: No

### Parameters

- `Pre Gain` (`key: PreGain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.1`. Raw range `0` to `1`; raw default `0.61`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.6`. Raw range `0` to `1`; raw default `0.66`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.4`. Raw range `0` to `1`; raw default `0.44`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the high frequency EQ of the tonestack.
- `Post Gain` (`key: PostGain`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `8.5`. Raw range `0` to `1`; raw default `0.85`. Controls the Lead channel's level going into the power amp.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6.7`. Raw range `0` to `1`; raw default `0.67`. Controls the overall level of the entire Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.
- `Presence` (`key: Presence`, `id: 13`, `type: f`): display range `0` to `10` unitless; default `4.3`. Raw range `0` to `1`; raw default `0.43`. Controls the high frequency response in the power amp.
- `Depth` (`key: Depth`, `id: 14`, `type: f`): display range `0` to `10` unitless; default `5.1`. Raw range `0` to `1`; raw default `0.51`. Controls the low frequency response in the power amp.

---

## PV Vitriol Lead

- Model key: `HD2_PreampPVVitriolLead`
- Model ID: `721`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage: 14.0
- Based on: Peavey Invective (Lead channel)
- Agoura model: No

### Parameters

- `Pre Gain` (`key: PreGain`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.1`. Raw range `0` to `1`; raw default `0.61`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.6`. Raw range `0` to `1`; raw default `0.66`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.4`. Raw range `0` to `1`; raw default `0.44`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the high frequency EQ of the tonestack.
- `Post Gain` (`key: PostGain`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `8.5`. Raw range `0` to `1`; raw default `0.85`. Controls the Lead channel's level going into the power amp.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6.7`. Raw range `0` to `1`; raw default `0.67`. Controls the overall level of the entire Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Placater Clean

- Model key: `HD2_AmpPlacaterClean`
- Model ID: `669`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 10.5
- Based on: Friedman BE-100 (clean channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.6`. Raw range `0` to `1`; raw default `0.56`. Controls the amount of gain applied to the signal. Higher settings add a bit of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3.4`. Raw range `0` to `1`; raw default `0.34`. Controls the low frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.4`. Raw range `0` to `1`; raw default `0.64`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.2`. Raw range `0` to `1`; raw default `0.82`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Bright` (`key: Bright`, `id: 7`, `type: i`): valid values `Off`, `1`, `2`; default `2`. Raw range `0` to `2`; raw default `2`. Selects the amount of overall brightness of the clean channel, enhancing snap and detail.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 13`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 14`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 15`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Placater Clean

- Model key: `HD2_PreampPlacaterClean`
- Model ID: `670`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage: 6.7
- Based on: Friedman BE-100 (clean channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.6`. Raw range `0` to `1`; raw default `0.56`. Controls the amount of gain applied to the signal. Higher settings add a bit of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3.4`. Raw range `0` to `1`; raw default `0.34`. Controls the low frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.4`. Raw range `0` to `1`; raw default `0.64`. Controls the high frequency EQ of the tonestack.
- `Bright` (`key: Bright`, `id: 4`, `type: i`): valid values `Off`, `1`, `2`; default `2`. Raw range `0` to `2`; raw default `2`. Selects the amount of overall brightness of the clean channel, enhancing snap and detail.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.2`. Raw range `0` to `1`; raw default `0.82`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.

---

## Placater Dirty

- Model key: `HD2_AmpPlacaterDirty`
- Model ID: `665`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 12.6
- Based on: Friedman BE-100 (BE/HBE channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.3`. Raw range `0` to `1`; raw default `0.53`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.8`. Raw range `0` to `1`; raw default `0.48`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.1`. Raw range `0` to `1`; raw default `0.61`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5.8`. Raw range `0` to `1`; raw default `0.58`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.5`. Raw range `0` to `1`; raw default `0.85`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5.2`. Raw range `0` to `1`; raw default `0.52`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `HBE` (`key: HBE`, `id: 9`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When off, the amp operates in BE mode, which provides more of a British-style gain. When on, the amp operates in HBE mode, which provides higher gain and heavier distortion.
- `Fat` (`key: Fat`, `id: 10`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. When on, thickens up your tone. Especially helpful for guitars with single coil pickups.
- `C45` (`key: C45`, `id: 11`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. When on, revoices the amp for more of a scooped sound.
- `Saturation` (`key: Saturation`, `id: 12`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, adds saturation and a bit of compression to your tone.
- `Ripple` (`key: Ripple`, `id: 13`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 14`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 15`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Placater Dirty

- Model key: `HD2_PreampPlacaterDirty`
- Model ID: `666`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage: 10.7
- Based on: Friedman BE-100 (BE/HBE channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.3`. Raw range `0` to `1`; raw default `0.53`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.8`. Raw range `0` to `1`; raw default `0.48`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.1`. Raw range `0` to `1`; raw default `0.61`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5.2`. Raw range `0` to `1`; raw default `0.52`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.5`. Raw range `0` to `1`; raw default `0.85`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `HBE` (`key: HBE`, `id: 8`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When off, the amp operates in BE mode, which provides more of a British-style gain. When on, the amp operates in HBE mode, which provides higher gain and heavier distortion.
- `Fat` (`key: Fat`, `id: 9`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. When on, thickens up your tone. Especially helpful for guitars with single coil pickups.
- `C45` (`key: C45`, `id: 10`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. When on, revoices the amp for more of a scooped sound.
- `Saturation` (`key: Saturation`, `id: 11`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, adds saturation and a bit of compression to your tone.

---

## Revv 120 Purple

- Model key: `Agoura_AmpRevvCh3Purple`
- Model ID: `817`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 25.0
- Based on: Revv Generator 120 (Purple/Gain Channel 3)
- Agoura model: Yes

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `7.1`. Raw range `0` to `1`; raw default `0.71`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.2`. Raw range `0` to `1`; raw default `0.42`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7.2`. Raw range `0` to `1`; raw default `0.72`. Controls the high frequency EQ of the tonestack.
- `Contour` (`key: Contour`, `id: 5`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, applies a midrange frequency boost.
- `Bright` (`key: Bright`, `id: 6`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, applies a high frequency boost.
- `Ch Level` (`key: Ch Level`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the output level of the Purple channel into the power amp.
- `Level` (`key: Level`, `id: 8`, `type: f`): display range `-40` to `10` dB; default `-10`. Raw range `-40` to `10`; raw default `-10`. Controls the overall level of the entire Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the Master Volume of the amplifier.
- `Aggression` (`key: Aggression`, `id: 10`, `type: i`): display range `0` to `2` unitless; default `1`. Raw range `0` to `2`; raw default `1`. Selects one of three levels of saturation--Low (0), Mid/Tight (1), and High/Fat (2).
- `Fat` (`key: Fat`, `id: 11`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, applies a low frequency boost.
- `Depth` (`key: Depth`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `4.4`. Raw range `0` to `1`; raw default `0.44`. Controls the low frequency response in the power amp. Be careful here, as higher settings can cause the low end to feel a bit loose.
- `Presence` (`key: Presence`, `id: 13`, `type: f`): display range `0` to `10` unitless; default `2.8`. Raw range `0` to `1`; raw default `0.28`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Sag` (`key: Sag`, `id: 14`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 15`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Z PrePost` (`key: ZPrePost`, `id: 16`, `type: f`): display range `0` to `10` unitless; default `3.1`. Raw range `0` to `1`; raw default `0.31`. Determines the location of speaker impedance characteristics in the power amp, primarily due to negative feedback. Higher values mean the effects of the interaction appear at the output of the power amp (Post) and lower values mean more of the effect is fed back to the input of the power amp (Pre).
- `Hype` (`key: Hype`, `id: 17`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Depending on the amp and/or amp settings, increasing Hype may subtly or dramatically adjust various behind-the-scenes parameters to make the amp sound and feel smoother, fuller, punchier, tighter, and/or more forgiving, but at the expense of accuracy.

---

## Revv 120 Red

- Model key: `Agoura_AmpRevvCh4Red`
- Model ID: `806`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 27.0
- Based on: Revv Generator 120 (Red/High Gain Channel 4)
- Agoura model: Yes

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `7.1`. Raw range `0` to `1`; raw default `0.71`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.2`. Raw range `0` to `1`; raw default `0.42`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7.2`. Raw range `0` to `1`; raw default `0.72`. Controls the high frequency EQ of the tonestack.
- `Contour` (`key: Contour`, `id: 5`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, applies a midrange frequency boost.
- `Bright` (`key: Bright`, `id: 6`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, applies a high frequency boost.
- `Ch Level` (`key: Ch Level`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the output level of the Red channel into the power amp.
- `Level` (`key: Level`, `id: 8`, `type: f`): display range `-40` to `10` dB; default `-10`. Raw range `-40` to `10`; raw default `-10`. Controls the overall level of the entire Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the Master Volume of the amplifier.
- `Aggression` (`key: Aggression`, `id: 10`, `type: i`): display range `0` to `2` unitless; default `1`. Raw range `0` to `2`; raw default `1`. Selects one of three levels of saturation--Low (0), Mid/Tight (1), and High/Fat (2).
- `Fat` (`key: Fat`, `id: 11`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, applies a low frequency boost.
- `Depth` (`key: Depth`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `4.4`. Raw range `0` to `1`; raw default `0.44`. Controls the low frequency response in the power amp. Be careful here, as higher settings can cause the low end to feel a bit loose.
- `Presence` (`key: Presence`, `id: 13`, `type: f`): display range `0` to `10` unitless; default `2.8`. Raw range `0` to `1`; raw default `0.28`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Sag` (`key: Sag`, `id: 14`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 15`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Z PrePost` (`key: XPrePost`, `id: 16`, `type: f`): display range `0` to `10` unitless; default `3.1`. Raw range `0` to `1`; raw default `0.31`. Determines the location of speaker impedance characteristics in the power amp, primarily due to negative feedback. Higher values mean the effects of the interaction appear at the output of the power amp (Post) and lower values mean more of the effect is fed back to the input of the power amp (Pre).
- `Hype` (`key: Hype`, `id: 17`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Depending on the amp and/or amp settings, increasing Hype may subtly or dramatically adjust various behind-the-scenes parameters to make the amp sound and feel smoother, fuller, punchier, tighter, and/or more forgiving, but at the expense of accuracy.

---

## Revv Gen Purple

- Model key: `HD2_AmpRevvGenPurple`
- Model ID: `689`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 14.0
- Based on: Revv Generator 120 (Purple/Gain Ch. 3)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3.9`. Raw range `0` to `1`; raw default `0.39`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.2`. Raw range `0` to `1`; raw default `0.62`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `3.2`. Raw range `0` to `1`; raw default `0.32`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.6`. Raw range `0` to `1`; raw default `0.86`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the Master Volume of the amplifier.
- `Resonance` (`key: Resonance`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `4.6`. Raw range `0` to `1`; raw default `0.46`. Controls the low frequency response in the power amp. Be careful here, as higher settings can cause the low end to feel a bit loose.
- `Aggression` (`key: Aggression`, `id: 9`, `type: i`): display range `0` to `2` unitless; default `1`. Raw range `0` to `2`; raw default `1`. Selects one of three levels of saturation--Low (0), Mid/Tight (1), and High/Fat (2).
- `Sag` (`key: Sag`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 13`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 14`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Revv Gen Purple

- Model key: `HD2_PreampRevvGenPurple`
- Model ID: `690`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage: 10.2
- Based on: Revv Generator 120 (Purple/Gain Ch. 3)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3.9`. Raw range `0` to `1`; raw default `0.39`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.2`. Raw range `0` to `1`; raw default `0.62`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `3.2`. Raw range `0` to `1`; raw default `0.32`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.6`. Raw range `0` to `1`; raw default `0.86`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Aggression` (`key: Aggression`, `id: 7`, `type: i`): display range `0` to `2` unitless; default `1`. Raw range `0` to `2`; raw default `1`. Selects one of three levels of saturation--Low (0), Mid/Tight (1), and High/Fat (2).
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Revv Gen Red

- Model key: `HD2_AmpRevvGenRed`
- Model ID: `675`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 14.0
- Based on: Revv Generator 120 (Red/High Gain Ch. 4)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.1`. Raw range `0` to `1`; raw default `0.41`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.8`. Raw range `0` to `1`; raw default `0.68`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.1`. Raw range `0` to `1`; raw default `0.61`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `3.9`. Raw range `0` to `1`; raw default `0.39`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.4`. Raw range `0` to `1`; raw default `0.84`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the Master Volume of the amplifier.
- `Resonance` (`key: Resonance`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5.8`. Raw range `0` to `1`; raw default `0.58`. Controls the low frequency response in the power amp. Be careful here, as higher settings can cause the low end to feel a bit loose.
- `Aggression` (`key: Aggression`, `id: 9`, `type: i`): display range `0` to `2` unitless; default `2`. Raw range `0` to `2`; raw default `2`. Selects one of three levels of saturation--Low (0), Mid/Tight (1), and High/Fat (2).
- `Sag` (`key: Sag`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 13`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 14`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Revv Gen Red

- Model key: `HD2_PreampRevvGenRed`
- Model ID: `688`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage: 10.4
- Based on: Revv Generator 120 (Red/High Gain Ch. 4)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.1`. Raw range `0` to `1`; raw default `0.41`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.8`. Raw range `0` to `1`; raw default `0.68`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.1`. Raw range `0` to `1`; raw default `0.61`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.4`. Raw range `0` to `1`; raw default `0.84`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Aggression` (`key: Aggression`, `id: 7`, `type: i`): display range `0` to `2` unitless; default `2`. Raw range `0` to `2`; raw default `2`. Selects one of three levels of saturation--Low (0), Mid/Tight (1), and High/Fat (2).
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Solid 100

- Model key: `Agoura_AmpSolid100`
- Model ID: `753`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 22.5
- Based on: Soldano SLO-100 (Normal & Overdrive channels)
- Agoura model: Yes

### Parameters

- `Channel` (`key: Channel`, `id: 1`, `type: b`): valid values `Normal`, `Overdrive`; default `Overdrive`. Raw range `Off` to `On`; raw default `On`. Selects the amp channel--Normal or Overdrive.
- `Normal Mode` (`key: NrmMode`, `id: 2`, `type: b`): valid values `Clean`, `Crunch`; default `Crunch`. Raw range `Off` to `On`; raw default `On`. Selects the mode of the Normal channel--Clean or Crunch. Has no effect when Channel is set to "Overdrive."
- `Drive` (`key: Drive`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `3.6`. Raw range `0` to `1`; raw default `0.36`. Controls the Master Volume of the amplifier.
- `Level` (`key: Level`, `id: 8`, `type: f`): display range `-40` to `10` dB; default `-10`. Raw range `-40` to `10`; raw default `-10`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Presence` (`key: Presence`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Normal Bright` (`key: NrmBright`, `id: 10`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, applies a high frequency boost to the Normal channel. Has no affect when Channel is set to "Overdrive."
- `Sag` (`key: Sag`, `id: 11`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 12`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Z PrePost` (`key: ZPrePost`, `id: 13`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Determines the location of speaker impedance characteristics in the power amp, primarily due to negative feedback. Higher values mean the effects of the interaction appear at the output of the power amp (Post) and lower values mean more of the effect is fed back to the input of the power amp (Pre).
- `Hype` (`key: Hype`, `id: 14`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Depending on the amp and/or amp settings, increasing Hype may subtly or dramatically adjust various behind-the-scenes parameters to make the amp sound and feel smoother, fuller, punchier, tighter, and/or more forgiving, but at the expense of accuracy.

---

## Solo Lead Clean

- Model key: `HD2_AmpSoloLeadClean`
- Model ID: `550`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 13.1
- Based on: Soldano SLO-100 (Clean channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.6`. Raw range `0` to `1`; raw default `0.46`. Controls the amount of gain applied to the signal. At high settings, a bit of saturation can be heard.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.3`. Raw range `0` to `1`; raw default `0.53`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.8`. Raw range `0` to `1`; raw default `0.48`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5.6`. Raw range `0` to `1`; raw default `0.56`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5.4`. Raw range `0` to `1`; raw default `0.54`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5.6`. Raw range `0` to `1`; raw default `0.56`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5.3`. Raw range `0` to `1`; raw default `0.53`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Solo Lead Clean

- Model key: `HD2_PreampSoloLeadClean`
- Model ID: `552`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage: 8.9
- Based on: Soldano SLO-100 (Clean channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.6`. Raw range `0` to `1`; raw default `0.46`. Controls the amount of gain applied to the signal. At high settings, a bit of saturation can be heard.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.3`. Raw range `0` to `1`; raw default `0.53`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.8`. Raw range `0` to `1`; raw default `0.48`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5.6`. Raw range `0` to `1`; raw default `0.56`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5.6`. Raw range `0` to `1`; raw default `0.56`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Solo Lead Crunch

- Model key: `HD2_AmpSoloLeadCrunch`
- Model ID: `551`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 13.2
- Based on: Soldano SLO-100 (Crunch channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.1`. Raw range `0` to `1`; raw default `0.51`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.3`. Raw range `0` to `1`; raw default `0.43`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.1`. Raw range `0` to `1`; raw default `0.61`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5.8`. Raw range `0` to `1`; raw default `0.58`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5.6`. Raw range `0` to `1`; raw default `0.56`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Solo Lead Crunch

- Model key: `HD2_PreampSoloLeadCrunch`
- Model ID: `553`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage: 8.6
- Based on: Soldano SLO-100 (Crunch channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.1`. Raw range `0` to `1`; raw default `0.51`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.3`. Raw range `0` to `1`; raw default `0.43`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.1`. Raw range `0` to `1`; raw default `0.61`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the Master Volume of the amplifier.
- `Level` (`key: Ch Vol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5.6`. Raw range `0` to `1`; raw default `0.56`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Solo Lead OD

- Model key: `HD2_AmpSoloLeadOD`
- Model ID: `548`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 14.8
- Based on: Soldano SLO-100 (Overdrive channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.6`. Raw range `0` to `1`; raw default `0.56`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.6`. Raw range `0` to `1`; raw default `0.56`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.8`. Raw range `0` to `1`; raw default `0.58`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `4.1`. Raw range `0` to `1`; raw default `0.41`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `2.6`. Raw range `0` to `1`; raw default `0.26`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6.3`. Raw range `0` to `1`; raw default `0.63`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Solo Lead OD

- Model key: `HD2_PreampSoloLeadOD`
- Model ID: `549`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage: 10.5
- Based on: Soldano SLO-100 (Overdrive channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.6`. Raw range `0` to `1`; raw default `0.56`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.6`. Raw range `0` to `1`; raw default `0.56`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.8`. Raw range `0` to `1`; raw default `0.58`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `4.1`. Raw range `0` to `1`; raw default `0.41`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6.3`. Raw range `0` to `1`; raw default `0.63`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Soup Pro

- Model key: `HD2_AmpSoupPro`
- Model ID: `546`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 8.0
- Based on: Supro S6616
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack. The original amp didn't have a Bass knob; set to 5.0 for accurate response.
- `Tone` (`key: Tone`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `9.2`. Raw range `0` to `1`; raw default `0.92`. Adjusts the overall tonal character of the amplifier, allowing you to emphasize either the bass or treble frequencies.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ of the tonestack. The original amp didn't have a Treble knob; set to 5.0 for accurate response.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5.8`. Raw range `0` to `1`; raw default `0.58`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Soup Pro

- Model key: `HD2_PreampSoupPro`
- Model ID: `547`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage: 7.7
- Based on: Supro S6616
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack. The original amp didn't have a Bass knob; set to 5.0 for accurate response.
- `Tone` (`key: Tone`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `9.2`. Raw range `0` to `1`; raw default `0.92`. Adjusts the overall tonal character of the amplifier, allowing you to emphasize either the bass or treble frequencies.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ of the tonestack. The original amp didn't have a Treble knob; set to 5.0 for accurate response.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5.8`. Raw range `0` to `1`; raw default `0.58`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Stone Age 185

- Model key: `HD2_AmpStoneAge185`
- Model ID: `544`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 13.2
- Based on: Gibson EH-185
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the amount of gain applied to the signal, which influences the level of distortion. At higher settings, things get gnarly.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.2`. Raw range `0` to `1`; raw default `0.52`. Controls the midrange frequency EQ of the tonestack. The original amp didn't have a Mid knob; set to 5.0 for accurate response.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5.1`. Raw range `0` to `1`; raw default `0.51`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Stone Age 185

- Model key: `HD2_PreampStoneAge185`
- Model ID: `545`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage: 8.1
- Based on: Gibson EH-185
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the amount of gain applied to the signal, which influences the level of distortion. At higher settings, things get gnarly.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.2`. Raw range `0` to `1`; raw default `0.52`. Controls the midrange frequency EQ of the tonestack. The original amp didn't have a Mid knob; set to 5.0 for accurate response.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5.1`. Raw range `0` to `1`; raw default `0.51`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Tweed Blues Brt

- Model key: `HD2_AmpTweedBluesBrt`
- Model ID: `538`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 12.1
- Based on: Fender Bassman (Bright channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.9`. Raw range `0` to `1`; raw default `0.59`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.1`. Raw range `0` to `1`; raw default `0.51`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5.7`. Raw range `0` to `1`; raw default `0.57`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `3.4`. Raw range `0` to `1`; raw default `0.34`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6.2`. Raw range `0` to `1`; raw default `0.62`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `7.3`. Raw range `0` to `1`; raw default `0.73`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Tweed Blues Brt

- Model key: `HD2_PreampTweedBluesBrt`
- Model ID: `540`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage: 6.7
- Based on: Fender Bassman (Bright channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.9`. Raw range `0` to `1`; raw default `0.59`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.1`. Raw range `0` to `1`; raw default `0.51`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5.7`. Raw range `0` to `1`; raw default `0.57`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6.6`. Raw range `0` to `1`; raw default `0.66`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Tweed Blues Nrm

- Model key: `HD2_AmpTweedBluesNrm`
- Model ID: `539`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 12.1
- Based on: Fender Bassman (Normal channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.2`. Raw range `0` to `1`; raw default `0.42`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.4`. Raw range `0` to `1`; raw default `0.54`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.4`. Raw range `0` to `1`; raw default `0.64`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `2.7`. Raw range `0` to `1`; raw default `0.27`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6.2`. Raw range `0` to `1`; raw default `0.62`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5.7`. Raw range `0` to `1`; raw default `0.57`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Tweed Blues Nrm

- Model key: `HD2_PreampTweedBluesNrm`
- Model ID: `541`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage: 6.7
- Based on: Fender Bassman (Normal channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.2`. Raw range `0` to `1`; raw default `0.42`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.4`. Raw range `0` to `1`; raw default `0.54`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.4`. Raw range `0` to `1`; raw default `0.64`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## US 5W Tweed

- Model key: `Agoura_AmpUS5WTweed`
- Model ID: `752`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 20.5
- Based on: Fender Champ 5F1 (Low & High inputs)
- Agoura model: Yes

### Parameters

- `Jack` (`key: Jack`, `id: 1`, `type: i`): valid values `Low`, `High`; default `High`. Raw range `0` to `1`; raw default `1`. Selects the input jack on the amp--Low or High.
- `Drive` (`key: Drive`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.82`. Raw range `0` to `1`; raw default `0.582`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Master` (`key: Master`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 4`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 5`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Boost` (`key: Boost`, `id: 6`, `type: i`): valid values `Off`, `On`; default `Off`. Raw range `0` to `1`; raw default `0`. When on, applies a boost to the signal.
- `Z PrePost` (`key: ZPrePost`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Determines the location of speaker impedance characteristics in the power amp, primarily due to negative feedback. Higher values mean the effects of the interaction appear at the output of the power amp (Post) and lower values mean more of the effect is fed back to the input of the power amp (Pre).
- `Level` (`key: Level`, `id: 8`, `type: f`): display range `-30` to `10` dB; default `-10`. Raw range `-30` to `10`; raw default `-10`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Hype` (`key: Hype`, `id: 9`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Depending on the amp and/or amp settings, increasing Hype may subtly or dramatically adjust various behind-the-scenes parameters to make the amp sound and feel smoother, fuller, punchier, tighter, and/or more forgiving, but at the expense of accuracy.

---

## US Deluxe Nrm

- Model key: `HD2_AmpUSDeluxeNrm`
- Model ID: `536`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 11.7
- Based on: Fender Deluxe Reverb (Normal channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.6`. Raw range `0` to `1`; raw default `0.46`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.3`. Raw range `0` to `1`; raw default `0.53`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `9`. Raw range `0` to `1`; raw default `0.9`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## US Deluxe Nrm

- Model key: `HD2_PreampUSDeluxeNrm`
- Model ID: `537`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage: 6.6
- Based on: Fender Deluxe Reverb (Normal channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.6`. Raw range `0` to `1`; raw default `0.46`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.3`. Raw range `0` to `1`; raw default `0.53`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## US Deluxe Vib

- Model key: `HD2_AmpUSDeluxeVib`
- Model ID: `534`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 13.0
- Based on: Fender Deluxe Reverb (Vibrato channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.2`. Raw range `0` to `1`; raw default `0.52`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `3.9`. Raw range `0` to `1`; raw default `0.39`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `9`. Raw range `0` to `1`; raw default `0.9`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5.3`. Raw range `0` to `1`; raw default `0.53`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## US Deluxe Vib

- Model key: `HD2_PreampUSDeluxeVib`
- Model ID: `535`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage: 8.1
- Based on: Fender Deluxe Reverb (Vibrato channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.2`. Raw range `0` to `1`; raw default `0.52`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `3.9`. Raw range `0` to `1`; raw default `0.39`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `9`. Raw range `0` to `1`; raw default `0.9`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## US Double Black

- Model key: `Agoura_AmpUSDoubleBlack`
- Model ID: `807`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 19.5
- Based on: Fender Twin Reverb AB763 (Normal & Vibrato channels)
- Agoura model: Yes

### Parameters

- `Channel` (`key: Channel`, `id: 1`, `type: i`): valid values `Normal`, `Vibrato`; default `Vibrato`. Raw range `0` to `1`; raw default `1`. Selects the amp channel or which input is connected.
- `Drive` (`key: Drive`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3.7`. Raw range `0` to `1`; raw default `0.37`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bright` (`key: Bright`, `id: 3`, `type: i`): valid values `Off`, `On`; default `Off`. Raw range `0` to `1`; raw default `0`. When on, applies a high frequency boost.
- `Bass` (`key: Bass`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5.8`. Raw range `0` to `1`; raw default `0.58`. Controls the low frequency EQ of the tonestack.
- `Middle` (`key: Mid`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: MasterVol`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Level` (`key: Level`, `id: 8`, `type: f`): display range `-40` to `10` dB; default `-10`. Raw range `-40` to `10`; raw default `-10`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 9`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Z PrePost` (`key: ZPrePost`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `3.3`. Raw range `0` to `1`; raw default `0.33`. Determines the location of speaker impedance characteristics in the power amp, primarily due to negative feedback. Higher values mean the effects of the interaction appear at the output of the power amp (Post) and lower values mean more of the effect is fed back to the input of the power amp (Pre).
- `Hype` (`key: Hype`, `id: 12`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Depending on the amp and/or amp settings, increasing Hype may subtly or dramatically adjust various behind-the-scenes parameters to make the amp sound and feel smoother, fuller, punchier, tighter, and/or more forgiving, but at the expense of accuracy.

---

## US Double Nrm

- Model key: `HD2_AmpUSDoubleNrm`
- Model ID: `532`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 12.1
- Based on: Fender Twin Reverb (Normal channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.4`. Raw range `0` to `1`; raw default `0.44`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.2`. Raw range `0` to `1`; raw default `0.52`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5.7`. Raw range `0` to `1`; raw default `0.57`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `1`. Raw range `0` to `1`; raw default `0.1`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.5`. Raw range `0` to `1`; raw default `0.85`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## US Double Nrm

- Model key: `HD2_PreampUSDoubleNrm`
- Model ID: `533`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage: 6.7
- Based on: Fender Twin Reverb (Normal channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.4`. Raw range `0` to `1`; raw default `0.44`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.2`. Raw range `0` to `1`; raw default `0.52`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5.7`. Raw range `0` to `1`; raw default `0.57`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.5`. Raw range `0` to `1`; raw default `0.85`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## US Double Vib

- Model key: `HD2_AmpUSDoubleVib`
- Model ID: `530`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 13.0
- Based on: Fender Twin Reverb (Vibrato channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.6`. Raw range `0` to `1`; raw default `0.46`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5.2`. Raw range `0` to `1`; raw default `0.52`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.6`. Raw range `0` to `1`; raw default `0.76`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `3.3`. Raw range `0` to `1`; raw default `0.33`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## US Double Vib

- Model key: `HD2_PreampUSDoubleVib`
- Model ID: `531`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage: 7.9
- Based on: Fender Twin Reverb (Vibrato channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.6`. Raw range `0` to `1`; raw default `0.46`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5.2`. Raw range `0` to `1`; raw default `0.52`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.6`. Raw range `0` to `1`; raw default `0.76`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## US Luxe Black

- Model key: `Agoura_AmpUSLuxeBlack`
- Model ID: `751`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 21.0
- Based on: Fender Deluxe Reverb AB763 (Normal & Vibrato channels)
- Agoura model: Yes

### Parameters

- `Channel` (`key: Channel`, `id: 1`, `type: i`): valid values `Normal`, `Vibrato`; default `Vibrato`. Raw range `0` to `1`; raw default `1`. Selects the amp channel or which input is connected.
- `Drive` (`key: Drive`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the low frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 6`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 7`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Level` (`key: Level`, `id: 8`, `type: f`): display range `-40` to `10` dB; default `-10`. Raw range `-40` to `10`; raw default `-10`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Z PrePost` (`key: ZPrePost`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Determines the location of speaker impedance characteristics in the power amp, primarily due to negative feedback. Higher values mean the effects of the interaction appear at the output of the power amp (Post) and lower values mean more of the effect is fed back to the input of the power amp (Pre).
- `Hype` (`key: Hype`, `id: 10`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Depending on the amp and/or amp settings, increasing Hype may subtly or dramatically adjust various behind-the-scenes parameters to make the amp sound and feel smoother, fuller, punchier, tighter, and/or more forgiving, but at the expense of accuracy.

---

## US Princess

- Model key: `HD2_AmpUSPrincess`
- Model ID: `691`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 12.7
- Based on: Fender Princeton Reverb
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.8`. Raw range `0` to `1`; raw default `0.68`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5.2`. Raw range `0` to `1`; raw default `0.52`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## US Princess

- Model key: `HD2_PreampUSPrincess`
- Model ID: `692`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage: 8.3
- Based on: Fender Princeton Reverb
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.8`. Raw range `0` to `1`; raw default `0.68`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## US Princess 76

- Model key: `Agoura_AmpUSPrincess76`
- Model ID: `750`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 15.5
- Based on: Fender Princeton Reverb AA1164
- Agoura model: Yes

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3.8`. Raw range `0` to `1`; raw default `0.38`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Controls the low frequency EQ of the tonestack.
- `Treble` (`key: Treb`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 5`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 6`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Z PrePost` (`key: ZPrePost`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Determines the location of speaker impedance characteristics in the power amp, primarily due to negative feedback. Higher values mean the effects of the interaction appear at the output of the power amp (Post) and lower values mean more of the effect is fed back to the input of the power amp (Pre).
- `Level` (`key: Level`, `id: 8`, `type: f`): display range `-40` to `10` dB; default `-10`. Raw range `-40` to `10`; raw default `-10`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Hype` (`key: Hype`, `id: 9`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Depending on the amp and/or amp settings, increasing Hype may subtly or dramatically adjust various behind-the-scenes parameters to make the amp sound and feel smoother, fuller, punchier, tighter, and/or more forgiving, but at the expense of accuracy.

---

## US Small Tweed

- Model key: `HD2_AmpUSSmallTweed`
- Model ID: `528`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 6.6
- Based on: Fender Champ
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3.6`. Raw range `0` to `1`; raw default `0.36`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.8`. Raw range `0` to `1`; raw default `0.68`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## US Small Tweed

- Model key: `HD2_PreampUSSmallTweed`
- Model ID: `529`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage: 7.1
- Based on: Fender Champ
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3.6`. Raw range `0` to `1`; raw default `0.36`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.8`. Raw range `0` to `1`; raw default `0.68`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## US Super Black

- Model key: `Agoura_AmpUSSuperBlack`
- Model ID: `833`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 20.4
- Based on: Fender Super Reverb (Normal & Vibrato channels)
- Agoura model: Yes

### Parameters

- `Channel` (`key: Channel`, `id: 1`, `type: i`): valid values `Normal`, `Vibrato`; default `Vibrato`. Raw range `0` to `1`; raw default `1`. Selects the amp channel or which input is connected.
- `Drive` (`key: Drive`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bright` (`key: Bright`, `id: 3`, `type: i`): valid values `Off`, `On`; default `Off`. Raw range `0` to `1`; raw default `0`. When on, applies a high frequency boost.
- `Bass` (`key: Bass`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.1`. Raw range `0` to `1`; raw default `0.61`. Controls the low frequency EQ of the tonestack.
- `Middle` (`key: Mid`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `6.8`. Raw range `0` to `1`; raw default `0.68`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6.1`. Raw range `0` to `1`; raw default `0.61`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: MasterVol`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Level` (`key: Level`, `id: 8`, `type: f`): display range `-40` to `10` dB; default `-10`. Raw range `-40` to `10`; raw default `-10`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 9`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Z PrePost` (`key: ZPrePost`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `3.3`. Raw range `0` to `1`; raw default `0.33`. Determines the location of speaker impedance characteristics in the power amp, primarily due to negative feedback. Higher values mean the effects of the interaction appear at the output of the power amp (Post) and lower values mean more of the effect is fed back to the input of the power amp (Pre).
- `Hype` (`key: Hype`, `id: 12`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Depending on the amp and/or amp settings, increasing Hype may subtly or dramatically adjust various behind-the-scenes parameters to make the amp sound and feel smoother, fuller, punchier, tighter, and/or more forgiving, but at the expense of accuracy.

---

## US Super Norm

- Model key: `HD2_AmpUSSuperNorm`
- Model ID: `737`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 10.8
- Based on: Fender Super Reverb (Normal channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.8`. Raw range `0` to `1`; raw default `0.58`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `2.8`. Raw range `0` to `1`; raw default `0.28`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.4`. Raw range `0` to `1`; raw default `0.54`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.7`. Raw range `0` to `1`; raw default `0.77`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.
- `Bright` (`key: Bright`, `id: 13`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, boosts high frequencies. Is more obvious when Drive is set low.

---

## US Super Norm

- Model key: `HD2_PreampUSSuperNorm`
- Model ID: `738`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage: 6.8
- Based on: Fender Super Reverb (Normal channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.8`. Raw range `0` to `1`; raw default `0.58`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `2.8`. Raw range `0` to `1`; raw default `0.28`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.4`. Raw range `0` to `1`; raw default `0.54`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7.7`. Raw range `0` to `1`; raw default `0.77`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Bright` (`key: Bright`, `id: 9`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, boosts high frequencies. Is more obvious when Drive is set low.

---

## US Super Vib

- Model key: `HD2_AmpUSSuperVib`
- Model ID: `739`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 12.5
- Based on: Fender Super Reverb (Vibrato channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3.6`. Raw range `0` to `1`; raw default `0.36`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.4`. Raw range `0` to `1`; raw default `0.64`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `1`. Raw range `0` to `1`; raw default `0.1`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.
- `Bright` (`key: Bright`, `id: 13`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, boosts high frequencies. Is more obvious when Drive is set low.

---

## US Super Vib

- Model key: `HD2_PreampUSSuperVib`
- Model ID: `740`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage: 8.1
- Based on: Fender Super Reverb (Vibrato channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3.6`. Raw range `0` to `1`; raw default `0.36`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.4`. Raw range `0` to `1`; raw default `0.64`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Bright` (`key: Bright`, `id: 9`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. When on, boosts high frequencies. Is more obvious when Drive is set low.

---

## US Tweedman

- Model key: `Agoura_AmpUSTweedman`
- Model ID: `749`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 23.5
- Based on: Fender Bassman 5F6A (Normal, Bright, & Jumped channels)
- Agoura model: Yes

### Parameters

- `Channel` (`key: Channel`, `id: 1`, `type: i`): valid values `Normal`, `Bright`, `Jumped`; default `Jumped`. Raw range `0` to `2`; raw default `2`. Selects the amp channel or which input is connected. "Jumped" jumps between the Normal and Bright channels.
- `Normal Drive` (`key: NormalDrive`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the amount of Normal channel gain applied to the signal. The inactive channel can sometimes "bleed into" the active channel, resulting in interesting interactions.
- `Bright Drive` (`key: BrightDrive`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the amount of Bright channel gain applied to the signal. The inactive channel can sometimes "bleed into" the active channel, resulting in interesting interactions.
- `Bass` (`key: Bass`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.4`. Raw range `0` to `1`; raw default `0.64`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `2.7`. Raw range `0` to `1`; raw default `0.27`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: Level`, `id: 8`, `type: f`): display range `-40` to `10` dB; default `-10`. Raw range `-40` to `10`; raw default `-10`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 10`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 11`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Z PrePost` (`key: ZPrePost`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Determines the location of speaker impedance characteristics in the power amp, primarily due to negative feedback. Higher values mean the effects of the interaction appear at the output of the power amp (Post) and lower values mean more of the effect is fed back to the input of the power amp (Pre).
- `Hype` (`key: Hype`, `id: 13`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Depending on the amp and/or amp settings, increasing Hype may subtly or dramatically adjust various behind-the-scenes parameters to make the amp sound and feel smoother, fuller, punchier, tighter, and/or more forgiving, but at the expense of accuracy.

---

## Ventoux

- Model key: `HD2_AmpLine6Ventoux`
- Model ID: `700`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 8.9
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `HP Filter` (`key: HPF`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Higher values result in tighter distortions and thinner cleans; lower values result in looser distortions and warmer cleans.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the midrange frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Controls the level of high frequencies in the power amp. These actually occur in the circuit just before phase inverter, but they really need the whole power amp to function. They also affect the character of the power amp distortion.
- `Depth` (`key: Depth`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Controls the level of low frequencies in the power amp. These actually occur in the circuit just before phase inverter, but they really need the whole power amp to function. They also affect the character of the power amp distortion.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Ventoux's Master volume exists in an "impossible" place for a physical amp. Generally, you'll want to leave this at 10.0, like a vintage amp with no master volume. However, a variety of textures can be had by reducing the level.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Ventoux

- Model key: `HD2_PreampLine6Ventoux`
- Model ID: `699`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage: 9.0
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `HP Filter` (`key: HPF`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Higher values result in tighter distortions and thinner cleans; lower values result in looser distortions and warmer cleans.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the midrange frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Controls the level of high frequencies in the power amp. These actually occur in the circuit just before phase inverter, but they really need the whole power amp to function. They also affect the character of the power amp distortion.
- `Depth` (`key: Depth`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Controls the level of low frequencies in the power amp. These actually occur in the circuit just before phase inverter, but they really need the whole power amp to function. They also affect the character of the power amp distortion.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Ventoux's Master volume exists in an "impossible" place for a physical amp. Generally, you'll want to leave this at 10.0, like a vintage amp with no master volume. However, a variety of textures can be had by reducing the level.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Voltage

- Model key: `HD2_AmpLine6Voltage`
- Model ID: `709`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 12.5
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the overall level of the Amp block.
- `Boost` (`key: Boost`, `id: 7`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Controls the amount of gain in the extra preamp tube gain stage.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: HumSwitch`, `id: 9`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Bias` (`key: Bias`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Voltage

- Model key: `HD2_PreampLine6Voltage`
- Model ID: `720`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage: 12.9
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the overall level of the Preamp block.
- `Boost` (`key: Boost`, `id: 7`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Controls the amount of gain in the extra preamp tube gain stage.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: HumSwitch`, `id: 9`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Voltage Queen

- Model key: `HD2_AmpVoltageQueen`
- Model ID: `653`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 13.2
- Based on: Victoria Electro King
- Agoura model: No

### Parameters

- `Drive 1` (`key: Drive 1`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `2.8`. Raw range `0` to `1`; raw default `0.28`. Controls the amount of Normal channel gain applied to the signal, which influences the level of distortion.
- `Drive 2` (`key: Drive Trem`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Controls the amount of Tremolo channel gain applied to the signal, which influences the level of distortion.
- `Tone` (`key: Tone`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.2`. Raw range `0` to `1`; raw default `0.62`. Adjusts the overall tonal character of the amplifier, allowing you to emphasize either the bass or treble frequencies. Turning the control clockwise boosts the treble for a brighter sound, while turning it counterclockwise boosts the bass for a warmer tone.
- `Bass` (`key: Bass`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.2`. Raw range `0` to `1`; raw default `0.82`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `8.5`. Raw range `0` to `1`; raw default `0.85`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `6.2`. Raw range `0` to `1`; raw default `0.62`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Voltage Queen

- Model key: `HD2_PreampVoltageQueen`
- Model ID: `654`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage: 9.2
- Based on: Victoria Electro King
- Agoura model: No

### Parameters

- `Drive 1` (`key: Drive 1`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `2.8`. Raw range `0` to `1`; raw default `0.28`. Controls the amount of Normal channel gain applied to the signal, which influences the level of distortion.
- `Drive 2` (`key: Drive 2`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Controls the amount of Tremolo channel gain applied to the signal, which influences the level of distortion.
- `Tone` (`key: Tone`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.2`. Raw range `0` to `1`; raw default `0.62`. Adjusts the overall tonal character of the amplifier, allowing you to emphasize either the bass or treble frequencies. Turning the control clockwise boosts the treble for a brighter sound, while turning it counterclockwise boosts the bass for a warmer tone.
- `Bass` (`key: Bass`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.2`. Raw range `0` to `1`; raw default `0.82`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `8.5`. Raw range `0` to `1`; raw default `0.85`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## WhoWatt 100

- Model key: `HD2_AmpWhoWatt100`
- Model ID: `526`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 13.5
- Based on: Hiwatt DR-103 (Brilliant channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `9`. Raw range `0` to `1`; raw default `0.9`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `3.7`. Raw range `0` to `1`; raw default `0.37`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `2.7`. Raw range `0` to `1`; raw default `0.27`. Boosts upper mid and high frequencies, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## WhoWatt 100

- Model key: `HD2_PreampWhoWatt100`
- Model ID: `527`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage: 8.5
- Based on: Hiwatt DR-103 (Brilliant channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `9`. Raw range `0` to `1`; raw default `0.9`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `3.7`. Raw range `0` to `1`; raw default `0.37`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `2.7`. Raw range `0` to `1`; raw default `0.27`. Boosts upper mid and high frequencies, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## WhoWatt 103

- Model key: `Agoura_AmpWhoWatt103`
- Model ID: `808`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage: 26.5
- Based on: Hiwatt DR-103 (Normal, Bright, & Jumped channels)
- Agoura model: Yes

### Parameters

- `Channel` (`key: Channel`, `id: 1`, `type: i`): valid values `Normal`, `Bright`, `Jumped`; default `Jumped`. Raw range `0` to `2`; raw default `2`. Selects the amp channel or which input is connected. "Jumped" jumps between the Normal and Bright channels.
- `Normal Drive` (`key: NormDrive`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of Normal channel gain applied to the signal. The inactive channel can sometimes "bleed into" the active channel, resulting in interesting interactions.
- `Bright Drive` (`key: BrtDrive`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Controls the amount of Bright channel gain applied to the signal. The inactive channel can sometimes "bleed into" the active channel, resulting in interesting interactions.
- `Bass` (`key: Bass`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the low frequency EQ of the preamp's tonestack.
- `Mid` (`key: Mid`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `4.6`. Raw range `0` to `1`; raw default `0.46`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6.2`. Raw range `0` to `1`; raw default `0.62`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `4.22`. Raw range `0` to `1`; raw default `0.422`. Boosts upper mids and treble frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: Output Volume`, `id: 8`, `type: f`): display range `-40` to `10` dB; default `-10`. Raw range `-40` to `10`; raw default `-10`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 10`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 11`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Z PrePost` (`key: ZPrePost`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Determines the location of speaker impedance characteristics in the power amp, primarily due to negative feedback. Higher values mean the effects of the interaction appear at the output of the power amp (Post) and lower values mean more of the effect is fed back to the input of the power amp (Pre).
- `Hype` (`key: Hype`, `id: 13`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Depending on the amp and/or amp settings, increasing Hype may subtly or dramatically adjust various behind-the-scenes parameters to make the amp sound and feel smoother, fuller, punchier, tighter, and/or more forgiving, but at the expense of accuracy.
