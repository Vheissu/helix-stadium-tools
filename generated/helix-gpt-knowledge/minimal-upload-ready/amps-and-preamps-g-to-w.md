# Amps and preamps (G to W)

Minimal upload pack covering guitar and bass amp and preamp blocks.

Generated from the installed Helix Stadium desktop app bundle on 2026-05-07T22:33:14.224003+00:00.

Use display values for normal user-facing answers. Use model keys, IDs, and raw ranges only when the user asks for automation or low-level control details.

Model count: 122

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

## German Mahadeva

- Model key: `HD2_AmpGermanMahadeva`
- Model ID: `576`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 14.8
- Based on: Bogner Shiva
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3.9`. Raw range `0` to `1`; raw default `0.39`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3.1`. Raw range `0` to `1`; raw default `0.31`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7.6`. Raw range `0` to `1`; raw default `0.76`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `4.8`. Raw range `0` to `1`; raw default `0.48`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## German Mahadeva

- Model key: `HD2_PreampGermanMahadeva`
- Model ID: `577`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 9.8
- Based on: Bogner Shiva
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3.9`. Raw range `0` to `1`; raw default `0.39`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3.1`. Raw range `0` to `1`; raw default `0.31`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7.6`. Raw range `0` to `1`; raw default `0.76`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `4.8`. Raw range `0` to `1`; raw default `0.48`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## German Ubersonic

- Model key: `HD2_AmpGermanUbersonic`
- Model ID: `574`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 14.0
- Based on: Bogner Ãerschall
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.3`. Raw range `0` to `1`; raw default `0.63`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.1`. Raw range `0` to `1`; raw default `0.61`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `2.3`. Raw range `0` to `1`; raw default `0.23`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `6.1`. Raw range `0` to `1`; raw default `0.61`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## German Ubersonic

- Model key: `HD2_PreampGermanUbersonic`
- Model ID: `575`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 9.1
- Based on: Bogner Ãerschall
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.3`. Raw range `0` to `1`; raw default `0.63`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `6.1`. Raw range `0` to `1`; raw default `0.61`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `2.3`. Raw range `0` to `1`; raw default `0.23`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: Ch Vol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.

---

## German Xtra Blue

- Model key: `Agoura_AmpGermanXtraBlue`
- Model ID: `818`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 22.2
- Based on: Bogner Ecstacy 101B, EL34 (Blue channel)
- Agoura model: Yes

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.98`. Raw range `0` to `1`; raw default `0.698`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.7`. Raw range `0` to `1`; raw default `0.67`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.12`. Raw range `0` to `1`; raw default `0.412`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5.88`. Raw range `0` to `1`; raw default `0.588`. Controls the high frequency EQ of the tonestack.
- `Bright` (`key: PreEQ_Brt`, `id: 5`, `type: i`): valid values `Off`, `B1`, `B2`; default `B1`. Raw range `0` to `2`; raw default `1`. Adds two levels of brightness before the tonestack--B1 and B2.
- `Boost` (`key: Boost`, `id: 6`, `type: i`): valid values `Off`, `On`; default `Off`. Raw range `0` to `1`; raw default `0`. When on, boosts the preamp's gain.
- `Structure` (`key: Structure`, `id: 7`, `type: i`): valid values `Low`, `High`; default `Low`. Raw range `0` to `1`; raw default `0`. Adjusts the amount and texture of distortion, providing a subtle EQ shift.
- `Level` (`key: Level`, `id: 8`, `type: f`): display range `-40` to `10` dB; default `0`. Raw range `-40` to `10`; raw default `0`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the master volume of the amplifier.
- `Presence` (`key: Presence`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `6.48`. Raw range `0` to `1`; raw default `0.648`. Adjusts the presence or brightness of the amplifier.
- `Depth` (`key: Excursion_Depth`, `id: 11`, `type: i`): valid values `Tight`, `Medium`, `Loose`; default `Medium`. Raw range `0` to `2`; raw default `1`. This 3-position switch sets the amount of damping. "Tight" maintains balance between the low and high strings, "Loose" provides a notable bass boost, and "Medium" is somewhere in the middle.
- `Style` (`key: Old_New`, `id: 12`, `type: b`): valid values `Triode`, `Pentode`; default `Pentode`. Raw range `Off` to `On`; raw default `On`. When set to "Triode," 3 out of 5 elements in the tubes are active, which can sound a bit smoother. When set to "Pentode," all tube elements are active, which provides more bite and punch.
- `Sag` (`key: Sag`, `id: 13`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 14`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Z PrePost` (`key: ZPrePost`, `id: 15`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Determines the location of speaker impedance characteristics in the power amp, primarily due to negative feedback. Higher values mean the effects of the interaction appear at the output of the power amp (Post) and lower values mean more of the effect is fed back to the input of the power amp (Pre).
- `Hype` (`key: Hype`, `id: 16`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Depending on the amp and/or amp settings, increasing Hype may subtly or dramatically adjust various behind-the-scenes parameters to make the amp sound and feel smoother, fuller, punchier, tighter, and/or more forgiving, but at the expense of accuracy.

---

## German Xtra Blue

- Model key: `HD2_AmpGermanXtraBlue`
- Model ID: `741`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 13.3
- Based on: Bogner Ecstacy 101B, EL34 (Blue channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.12`. Raw range `0` to `1`; raw default `0.412`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.56`. Raw range `0` to `1`; raw default `0.456`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.54`. Raw range `0` to `1`; raw default `0.654`. Controls the high frequency EQ of the tonestack.
- `Bright` (`key: PreEQ_Brt`, `id: 5`, `type: i`): valid values `Off`, `B1`, `B2`; default `B1`. Raw range `0` to `2`; raw default `1`. Adds two levels of brightness before the tonestack--B1 and B2.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Boost` (`key: Boost`, `id: 7`, `type: b`): valid values `Low`, `High`; default `High`. Raw range `Off` to `On`; raw default `On`. When set to "High," boosts the preamp's gain.
- `Structure` (`key: Structure`, `id: 8`, `type: b`): valid values `Low`, `High`; default `Low`. Raw range `Off` to `On`; raw default `Off`. Adjusts the amount and texture of distortion, providing a subtle EQ shift.
- `Master` (`key: Master`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `4.12`. Raw range `0` to `1`; raw default `0.412`. Controls the master volume of the amplifier.
- `Presence` (`key: Presence`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Depth` (`key: Excursion_Depth`, `id: 11`, `type: i`): valid values `Tight`, `Medium`, `Loose`; default `Loose`. Raw range `0` to `2`; raw default `2`. This 3-position switch sets the amount of damping. "Tight" maintains balance between the low and high strings, "Loose" provides a notable bass boost, and "Medium" is somewhere in the middle.
- `Style` (`key: Old_New`, `id: 12`, `type: b`): valid values `Triode`, `Pentode`; default `Pentode`. Raw range `Off` to `On`; raw default `On`. When set to "Triode," 3 out of 5 elements in the tubes are active, which can sound a bit smoother. When set to "Pentode," all tube elements are active, which provides more bite and punch.
- `Class` (`key: Class_AB_A`, `id: 13`, `type: b`): valid values `A`, `AB`; default `AB`. Raw range `Off` to `On`; raw default `On`. Selects the power amp class--A or A/B. Class A generally sounds a bit richer and more compressed while Class A/B exhibits greater punch with better note separation and additional headroom.
- `Sag` (`key: Sag`, `id: 14`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 15`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 16`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 17`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## German Xtra Blue

- Model key: `HD2_PreampGermanXtraBlue`
- Model ID: `744`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 9.1
- Based on: Bogner Ecstacy 101B, EL34 (Blue channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ of the tonestack.
- `Bright` (`key: PreEQ_Brt`, `id: 5`, `type: i`): valid values `Off`, `B1`, `B2`; default `Off`. Raw range `0` to `2`; raw default `0`. Adds two levels of brightness before the tonestack--B1 and B2.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Boost` (`key: Boost`, `id: 7`, `type: b`): valid values `Low`, `High`; default `Low`. Raw range `Off` to `On`; raw default `Off`. When set to "High," boosts the preamp's gain.
- `Structure` (`key: Structure`, `id: 8`, `type: b`): valid values `Low`, `High`; default `Low`. Raw range `Off` to `On`; raw default `Off`. Adjusts the amount and texture of distortion, providing a subtle EQ shift.
- `Master` (`key: Master`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the master volume of the amplifier.

---

## German Xtra Red

- Model key: `Agoura_AmpGermanXtraRed`
- Model ID: `819`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 23.7
- Based on: Bogner Ecstacy 101B, EL34 (Red channel)
- Agoura model: Yes

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `3.62`. Raw range `0` to `1`; raw default `0.362`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.88`. Raw range `0` to `1`; raw default `0.588`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `2.8`. Raw range `0` to `1`; raw default `0.28`. Controls the high frequency EQ of the tonestack.
- `Bright` (`key: PreEQ_Brt`, `id: 5`, `type: i`): valid values `Off`, `B1`, `B2`; default `B1`. Raw range `0` to `2`; raw default `1`. Adds two levels of brightness before the tonestack--B1 and B2.
- `Boost` (`key: Boost`, `id: 6`, `type: i`): valid values `Off`, `On`; default `Off`. Raw range `0` to `1`; raw default `0`. When on, boosts the preamp's gain.
- `Structure` (`key: Structure`, `id: 7`, `type: i`): valid values `Low`, `High`; default `High`. Raw range `0` to `1`; raw default `1`. Adjusts the amount and texture of distortion, providing a subtle EQ shift.
- `Level` (`key: Level`, `id: 8`, `type: f`): display range `-40` to `10` dB; default `-10`. Raw range `-40` to `10`; raw default `-10`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Controls the master volume of the amplifier.
- `Presence` (`key: Presence`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `3.68`. Raw range `0` to `1`; raw default `0.368`. Adjusts the presence or brightness of the amplifier.
- `Depth` (`key: Excursion_Depth`, `id: 11`, `type: i`): valid values `Tight`, `Medium`, `Loose`; default `Tight`. Raw range `0` to `2`; raw default `0`. This 3-position switch sets the amount of damping. "Tight" maintains balance between the low and high strings, "Loose" provides a notable bass boost, and "Medium" is somewhere in the middle.
- `Style` (`key: Old_New`, `id: 12`, `type: b`): valid values `Triode`, `Pentode`; default `Pentode`. Raw range `Off` to `On`; raw default `On`. When set to "Triode," 3 out of 5 elements in the tubes are active, which can sound a bit smoother. When set to "Pentode," all tube elements are active, which provides more bite and punch.
- `Sag` (`key: Sag`, `id: 13`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 14`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Z PrePost` (`key: ZPrePost`, `id: 15`, `type: f`): display range `0` to `10` unitless; default `3.52`. Raw range `0` to `1`; raw default `0.352`. Determines the location of speaker impedance characteristics in the power amp, primarily due to negative feedback. Higher values mean the effects of the interaction appear at the output of the power amp (Post) and lower values mean more of the effect is fed back to the input of the power amp (Pre).
- `Hype` (`key: Hype`, `id: 16`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Depending on the amp and/or amp settings, increasing Hype may subtly or dramatically adjust various behind-the-scenes parameters to make the amp sound and feel smoother, fuller, punchier, tighter, and/or more forgiving, but at the expense of accuracy.

---

## German Xtra Red

- Model key: `HD2_AmpGermanXtraRed`
- Model ID: `742`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 14.7
- Based on: Bogner Ecstacy 101B, EL34 (Red channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `8.1`. Raw range `0` to `1`; raw default `0.81`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.6`. Raw range `0` to `1`; raw default `0.46`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the high frequency EQ of the tonestack.
- `Bright` (`key: PreEQ_Brt`, `id: 5`, `type: i`): valid values `Off`, `B1`, `B2`; default `Off`. Raw range `0` to `2`; raw default `0`. Adds two levels of brightness before the tonestack--B1 and B2.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `4.6`. Raw range `0` to `1`; raw default `0.46`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Boost` (`key: Boost`, `id: 7`, `type: b`): valid values `Low`, `High`; default `High`. Raw range `Off` to `On`; raw default `On`. When set to "High," boosts the preamp's gain.
- `Structure` (`key: Structure`, `id: 8`, `type: b`): valid values `Low`, `High`; default `High`. Raw range `Off` to `On`; raw default `On`. Adjusts the amount and texture of distortion, providing a subtle EQ shift.
- `Master` (`key: Master`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the master volume of the amplifier.
- `Presence` (`key: Presence`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `7.2`. Raw range `0` to `1`; raw default `0.72`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Depth` (`key: Excursion_Depth`, `id: 11`, `type: i`): valid values `Tight`, `Medium`, `Loose`; default `Tight`. Raw range `0` to `2`; raw default `0`. This 3-position switch sets the amount of damping. "Tight" maintains balance between the low and high strings, "Loose" provides a notable bass boost, and "Medium" is somewhere in the middle.
- `Style` (`key: Old_New`, `id: 12`, `type: b`): valid values `Triode`, `Pentode`; default `Pentode`. Raw range `Off` to `On`; raw default `On`. When set to "Triode," 3 out of 5 elements in the tubes are active, which can sound a bit smoother. When set to "Pentode," all tube elements are active, which provides more bite and punch.
- `Class` (`key: Class_AB_A`, `id: 13`, `type: b`): valid values `A`, `AB`; default `AB`. Raw range `Off` to `On`; raw default `On`. Selects the power amp class--A or A/B. Class A generally sounds a bit richer and more compressed while Class A/B exhibits greater punch with better note separation and additional headroom.
- `Sag` (`key: Sag`, `id: 14`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 15`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 16`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 17`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## German Xtra Red

- Model key: `HD2_PreampGermanXtraRed`
- Model ID: `743`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 10.8
- Based on: Bogner Ecstacy 101B, EL34 (Red channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ of the tonestack.
- `Bright` (`key: PreEQ_Brt`, `id: 5`, `type: i`): valid values `Off`, `B1`, `B2`; default `Off`. Raw range `0` to `2`; raw default `0`. Adds two levels of brightness before the tonestack--B1 and B2.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Boost` (`key: Boost`, `id: 7`, `type: b`): valid values `Low`, `High`; default `High`. Raw range `Off` to `On`; raw default `On`. When set to "High," boosts the preamp's gain.
- `Structure` (`key: Structure`, `id: 8`, `type: b`): valid values `Low`, `High`; default `High`. Raw range `Off` to `On`; raw default `On`. Adjusts the amount and texture of distortion, providing a subtle EQ shift.
- `Master` (`key: Master`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Controls the master volume of the amplifier.

---

## Grammatico GSG

- Model key: `HD2_AmpGSG100`
- Model ID: `731`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 15.8
- Based on: Grammatico GSG100
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the low frequency EQ of the tonestack. NOTE: Voicing changes with the Jazz Rock switch.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the midrange frequency EQ of the tonestack. NOTE: Voicing changes with the Jazz Rock switch.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the high frequency EQ of the tonestack. NOTE: Voicing changes with the Jazz Rock switch.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Boosts high frequencies in the power amp by modifying the EQ filtering in the power amp's negative feedback loop.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the master volume of the amplifier. It is located between the preamp and power amp and can be used to get more or less power amp distortion. This amp is VERY loud, and if the Master is cranked, the power amp distortion can be pushed into unpleasant territory.
- `Mid Switch` (`key: MidSwitch`, `id: 8`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. Changes the value of the treble capacitor in the tone stack. When off, the amp has more of a scooped sound; when on, there is a noticeable upper-mid boost.
- `Jazz Rock` (`key: JazzRock`, `id: 9`, `type: b`): valid values `Jazz`, `Rock`; default `Rock`. Raw range `Off` to `On`; raw default `On`. Changes the tonestack's wiring, allowing for two totally separate tonal voices. Jazz is quieter with a lower center frequency for the mids. Rock is louder with a more traditional mid frequency center. Tone controls rarely translate well between the Jazz and Rock settings. If a good sound is achieved in one mode, it is not guaranteed that the same settings in the opposite mode will still sound pleasing.
- `OD Switch` (`key: ODSwitch`, `id: 10`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. Turns the two-gain-stage tube overdrive circuit on and off. This circuit is located AFTER the tone controls and Drive knob. When the overdrive is turned on it's as if third and fourth gain stages are added to the preamp.
- `OD Drive` (`key: ODDrive`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `2.4`. Raw range `0` to `1`; raw default `0.24`. Controls the amount of drive or saturation in the overdrive circuit. Since the whole overdrive circuit is after the amp's regular Drive and Tone controls, the range of OD Drive will change based on those earlier knob settings.
- `OD Level` (`key: ODLevel`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the output level of the overdrive circuit.
- `Bright` (`key: Bright`, `id: 13`, `type: i`): valid values `Off`, `1`, `2`; default `Off`. Raw range `0` to `2`; raw default `0`. Engages one of two different values of bright capacitor, and is more pronounced at lower Drive settings. When Drive is at 10.0, Bright is effectively removed from the amp circuit.
- `FET Boost` (`key: FETBoost`, `id: 14`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. Provides a 7-9 dB FET (Field Effect Transistor) boost and tweaks the EQ a bit. The result is similar to placing a FET boost pedal before the amp.
- `PAB` (`key: PAB`, `id: 15`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. Adds a preamp boost between tube stages 1 and 2, but at the expense of removing the tonestack controls from the circuit.
- `Sag` (`key: Sag`, `id: 16`, `type: f`): display range `0` to `10` unitless; default `3.6`. Raw range `0` to `1`; raw default `0.36`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 17`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 18`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 19`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 20`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Grammatico GSG

- Model key: `HD2_PreampGSG100`
- Model ID: `732`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 11.5
- Based on: Grammatico GSG100
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the low frequency EQ of the tonestack. NOTE: Voicing changes with the Jazz Rock switch.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the midrange frequency EQ of the tonestack. NOTE: Voicing changes with the Jazz Rock switch.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the high frequency EQ of the tonestack. NOTE: Voicing changes with the Jazz Rock switch.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the master volume of the amplifier. It is located between the preamp and power amp and can be used to get more or less power amp distortion. This amp is VERY loud, and if the Master is cranked, the power amp distortion can be pushed into unpleasant territory.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Mid Switch` (`key: MidSwitch`, `id: 7`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. Changes the value of the treble capacitor in the tone stack. When off, the amp has more of a scooped sound; when on, there is a noticeable upper-mid boost.
- `Jazz Rock` (`key: JazzRock`, `id: 8`, `type: b`): valid values `Jazz`, `Rock`; default `Rock`. Raw range `Off` to `On`; raw default `On`. Changes the tonestack's wiring, allowing for two totally separate tonal voices. Jazz is quieter with a lower center frequency for the mids. Rock is louder with a more traditional mid frequency center. Tone controls rarely translate well between the Jazz and Rock settings. If a good sound is achieved in one mode, it is not guaranteed that the same settings in the opposite mode will still sound pleasing.
- `OD Switch` (`key: ODSwitch`, `id: 9`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. Turns the two-gain-stage tube overdrive circuit on and off. This circuit is located AFTER the tone controls and Drive knob. When the overdrive is turned on it's as if third and fourth gain stages are added to the preamp.
- `OD Drive` (`key: ODDrive`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `2.4`. Raw range `0` to `1`; raw default `0.24`. Controls the amount of drive or saturation in the overdrive circuit. Since the whole overdrive circuit is after the amp's regular Drive and Tone controls, the range of OD Drive will change based on those earlier knob settings.
- `OD Level` (`key: ODLevel`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the output level of the overdrive circuit.
- `Bright` (`key: Bright`, `id: 12`, `type: i`): valid values `Off`, `1`, `2`; default `Off`. Raw range `0` to `2`; raw default `0`. Engages one of two different values of bright capacitor, and is more pronounced at lower Drive settings. When Drive is at 10.0, Bright is effectively removed from the amp circuit.
- `FET Boost` (`key: FETBoost`, `id: 13`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. Provides a 7-9 dB FET (Field Effect Transistor) boost and tweaks the EQ a bit. The result is similar to placing a FET boost pedal before the amp.
- `PAB` (`key: PAB`, `id: 14`, `type: b`): valid values `Off`, `On`; default `Off`. Raw range `Off` to `On`; raw default `Off`. Adds a preamp boost between tube stages 1 and 2, but at the expense of removing the tonestack controls from the circuit.
- `Sag` (`key: Sag`, `id: 15`, `type: f`): display range `0` to `10` unitless; default `3.6`. Raw range `0` to `1`; raw default `0.36`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 16`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## GrammaticoLG Brt

- Model key: `HD2_AmpGrammaticoBrt`
- Model ID: `676`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 11.5
- Based on: Grammatico LaGrange (Bright channel)
- Agoura model: No

### Parameters

- `Drive Norm` (`key: DriveNorm`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Controls the amount of Normal channel bleed, even while the Bright channel is active.
- `Drive Bright` (`key: DriveBright`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of Bright channel gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Tone` (`key: Tone`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Adjusts the overall tonal character of the amplifier, allowing you to emphasize either the bass or treble frequencies.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `8.3`. Raw range `0` to `1`; raw default `0.83`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5.7`. Raw range `0` to `1`; raw default `0.57`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `7.6`. Raw range `0` to `1`; raw default `0.76`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `4.1`. Raw range `0` to `1`; raw default `0.41`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## GrammaticoLG Brt

- Model key: `HD2_PreampGrammaticoBrt`
- Model ID: `679`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 7.4
- Based on: Grammatico LaGrange (Bright channel)
- Agoura model: No

### Parameters

- `Drive Norm` (`key: DriveNorm`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Controls the amount of Normal channel bleed, even while the Bright channel is active.
- `Drive Bright` (`key: DriveBright`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of Bright channel gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Tone` (`key: Tone`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Adjusts the overall tonal character of the amplifier, allowing you to emphasize either the bass or treble frequencies.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `8.3`. Raw range `0` to `1`; raw default `0.83`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5.7`. Raw range `0` to `1`; raw default `0.57`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## GrammaticoLG Jmp

- Model key: `HD2_AmpGrammaticoJump`
- Model ID: `677`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 13.7
- Based on: Grammatico LaGrange (Jumped channels)
- Agoura model: No

### Parameters

- `Drive Norm` (`key: DriveNorm`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of Normal channel gain applied to the signal.
- `Drive Bright` (`key: DriveBright`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of Bright channel gain applied to the signal.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.7`. Raw range `0` to `1`; raw default `0.47`. Controls the low frequency EQ of the tonestack.
- `Tone` (`key: Tone`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7.1`. Raw range `0` to `1`; raw default `0.71`. Adjusts the overall tonal character of the amplifier, allowing you to emphasize either the bass or treble frequencies.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5.2`. Raw range `0` to `1`; raw default `0.52`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.2`. Raw range `0` to `1`; raw default `0.72`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `8.1`. Raw range `0` to `1`; raw default `0.81`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5.1`. Raw range `0` to `1`; raw default `0.51`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `7.6`. Raw range `0` to `1`; raw default `0.76`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `4.1`. Raw range `0` to `1`; raw default `0.41`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## GrammaticoLG Jmp

- Model key: `HD2_PreampGrammaticoJump`
- Model ID: `680`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 9.4
- Based on: Grammatico LaGrange (Jumped channels)
- Agoura model: No

### Parameters

- `Drive Norm` (`key: DriveNorm`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of Normal channel gain applied to the signal.
- `Drive Bright` (`key: DriveBright`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of Bright channel gain applied to the signal.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.7`. Raw range `0` to `1`; raw default `0.47`. Controls the low frequency EQ of the tonestack.
- `Tone` (`key: Tone`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7.1`. Raw range `0` to `1`; raw default `0.71`. Adjusts the overall tonal character of the amplifier, allowing you to emphasize either the bass or treble frequencies.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5.2`. Raw range `0` to `1`; raw default `0.52`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.2`. Raw range `0` to `1`; raw default `0.72`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `8.1`. Raw range `0` to `1`; raw default `0.81`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5.1`. Raw range `0` to `1`; raw default `0.51`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## GrammaticoLG Nrm

- Model key: `HD2_AmpGrammaticoNrm`
- Model ID: `678`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 11.5
- Based on: Grammatico LaGrange (Normal channel)
- Agoura model: No

### Parameters

- `Drive Norm` (`key: DriveNorm`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the amount of Normal channel gain applied to the signal, which influences the level of distortion.
- `Drive Bright` (`key: DriveBright`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Controls the amount of Bright channel bleed, even while the Normal channel is active.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Tone` (`key: Tone`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `8.5`. Raw range `0` to `1`; raw default `0.85`. Adjusts the overall tonal character of the amplifier, allowing you to emphasize either the bass or treble frequencies.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `7.9`. Raw range `0` to `1`; raw default `0.79`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5.7`. Raw range `0` to `1`; raw default `0.57`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `7.6`. Raw range `0` to `1`; raw default `0.76`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `8.3`. Raw range `0` to `1`; raw default `0.83`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## GrammaticoLG Nrm

- Model key: `HD2_PreampGrammaticoNrm`
- Model ID: `681`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 7.4
- Based on: Grammatico LaGrange (Normal channel)
- Agoura model: No

### Parameters

- `Drive Norm` (`key: DriveNorm`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the amount of Normal channel gain applied to the signal, which influences the level of distortion.
- `Drive Bright` (`key: DriveBright`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Controls the amount of Bright channel bleed, even while the Normal channel is active.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Tone` (`key: Tone`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `8.5`. Raw range `0` to `1`; raw default `0.85`. Adjusts the overall tonal character of the amplifier, allowing you to emphasize either the bass or treble frequencies.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `7.9`. Raw range `0` to `1`; raw default `0.79`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5.7`. Raw range `0` to `1`; raw default `0.57`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Interstate Zed

- Model key: `HD2_AmpInterstateZed`
- Model ID: `572`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 10.3
- Based on: Dr Z Route 66
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.1`. Raw range `0` to `1`; raw default `0.61`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.9`. Raw range `0` to `1`; raw default `0.69`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `4.9`. Raw range `0` to `1`; raw default `0.49`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `0.8`. Raw range `0` to `1`; raw default `0.08`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `6.8`. Raw range `0` to `1`; raw default `0.68`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `3.8`. Raw range `0` to `1`; raw default `0.38`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Interstate Zed

- Model key: `HD2_PreampInterstateZed`
- Model ID: `573`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 5.9
- Based on: Dr Z Route 66
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.1`. Raw range `0` to `1`; raw default `0.61`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `6.9`. Raw range `0` to `1`; raw default `0.69`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `4.9`. Raw range `0` to `1`; raw default `0.49`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `6.8`. Raw range `0` to `1`; raw default `0.68`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `3.8`. Raw range `0` to `1`; raw default `0.38`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Jazz Rivet 120

- Model key: `HD2_AmpJazzRivet120`
- Model ID: `570`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 6.9
- Based on: Roland JC-120 Jazz Chorus
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `2.8`. Raw range `0` to `1`; raw default `0.28`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.6`. Raw range `0` to `1`; raw default `0.56`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `2.7`. Raw range `0` to `1`; raw default `0.27`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `4.7`. Raw range `0` to `1`; raw default `0.47`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `3`. Raw range `0` to `1`; raw default `0.3`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Bright` (`key: Bright`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Adds additional treble and brightness to the tone. On the original amp, the Bright switch toggles off (0.0) and on (10.0); here you have continuous control (0.0-10.0).

---

## Jazz Rivet 120

- Model key: `HD2_PreampJazzRivet120`
- Model ID: `571`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 4.5
- Based on: Roland JC-120 Jazz Chorus
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `2.8`. Raw range `0` to `1`; raw default `0.28`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.6`. Raw range `0` to `1`; raw default `0.56`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `2.7`. Raw range `0` to `1`; raw default `0.27`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `4.7`. Raw range `0` to `1`; raw default `0.47`. Controls the high frequency EQ of the tonestack.
- `Bright` (`key: Bright`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Adds additional treble and brightness to the tone. On the original amp, the Bright switch toggles off (0.0) and on (10.0); here you have continuous control (0.0-10.0).
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.

---

## Kinetic

- Model key: `HD2_AmpLine6Kinetic`
- Model ID: `711`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 11.2
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `1`. Raw range `0` to `1`; raw default `0.1`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `4.7`. Raw range `0` to `1`; raw default `0.47`. Controls the overall level of the Amp block.
- `Boost` (`key: Boost`, `id: 7`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Adds gain and EQ modifications to simulate classic amp mods.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: HumSwitch`, `id: 9`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Bias` (`key: Bias`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Kinetic

- Model key: `HD2_PreampLine6Kinetic`
- Model ID: `716`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 11.4
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `4.7`. Raw range `0` to `1`; raw default `0.47`. Controls the overall level of the Preamp block.
- `Boost` (`key: Boost`, `id: 7`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Adds gain and EQ modifications to simulate classic amp mods.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: HumSwitch`, `id: 9`, `type: b`): valid values `Off`, `On`; default `On`. Raw range `Off` to `On`; raw default `On`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Litigator

- Model key: `HD2_AmpLine6Litigator`
- Model ID: `633`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 9.0
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.2`. Raw range `0` to `1`; raw default `0.52`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.6`. Raw range `0` to `1`; raw default `0.56`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.5`. Raw range `0` to `1`; raw default `0.85`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `3.8`. Raw range `0` to `1`; raw default `0.38`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Litigator

- Model key: `HD2_PreampLine6Litigator`
- Model ID: `634`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 9.3
- Based on: Line 6 Original
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.2`. Raw range `0` to `1`; raw default `0.52`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.6`. Raw range `0` to `1`; raw default `0.56`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `8.5`. Raw range `0` to `1`; raw default `0.85`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Mail Order Twin

- Model key: `HD2_AmpMailOrderTwin`
- Model ID: `562`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 13.3
- Based on: Silvertone 1484
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.4`. Raw range `0` to `1`; raw default `0.44`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `6`. Raw range `0` to `1`; raw default `0.6`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Mail Order Twin

- Model key: `HD2_PreampMailOrderTwin`
- Model ID: `563`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 9.3
- Based on: Silvertone 1484
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4.4`. Raw range `0` to `1`; raw default `0.44`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Mandarin 80

- Model key: `HD2_AmpMandarin80`
- Model ID: `560`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 13.9
- Based on: Orange OR80
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.3`. Raw range `0` to `1`; raw default `0.53`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.4`. Raw range `0` to `1`; raw default `0.54`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `9`. Raw range `0` to `1`; raw default `0.9`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.
- `FAC` (`key: FAC`, `id: 13`, `type: i`): valid values `1`, `2`, `3`, `4`, `5`, `6`; default `3`. Raw range `0` to `5`; raw default `2`. This 6-position switch selects different capacitors that change the preamp's low frequency cutoff. Higher values cut more of the bass.

---

## Mandarin 80

- Model key: `HD2_PreampMandarin80`
- Model ID: `561`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 7.6
- Based on: Orange OR80
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.3`. Raw range `0` to `1`; raw default `0.53`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.4`. Raw range `0` to `1`; raw default `0.54`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the high frequency EQ of the tonestack.
- `FAC` (`key: FAC`, `id: 5`, `type: i`): valid values `1`, `2`, `3`, `4`, `5`, `6`; default `3`. Raw range `0` to `5`; raw default `2`. This 6-position switch selects different capacitors that change the preamp's low frequency cutoff. Higher values cut more of the bass.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `9`. Raw range `0` to `1`; raw default `0.9`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

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

## Mandarin Rock 3

- Model key: `Agoura_AmpMandarinRockerMk3`
- Model ID: `844`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 27.0
- Based on: Orange Rockerverb 100MKIII
- Agoura model: Yes

### Parameters

- `Channel` (`key: Channel`, `id: 1`, `type: b`): valid values `Normal`, `Overdrive`; default `Overdrive`. Raw range `Off` to `On`; raw default `On`. Selects the amp channel--Normal or Overdrive.
- `Drive` (`key: Drive`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ of the tonestack.
- `OD Master` (`key: ODMaster`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the Master Volume of the Overdrive channel of the amplifier.
- `Attenuator` (`key: Attenuator`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Attenuates the signal between the amp's phase-inverter and power tubes
- `Level` (`key: Level`, `id: 8`, `type: f`): display range `-40` to `10` dB; default `-10`. Raw range `-40` to `10`; raw default `-10`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 9`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Z PrePost` (`key: ZPrePost`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Determines the location of speaker impedance characteristics in the power amp, primarily due to negative feedback. Higher values mean the effects of the interaction appear at the output of the power amp (Post) and lower values mean more of the effect is fed back to the input of the power amp (Pre).
- `Hype` (`key: Hype`, `id: 12`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Depending on the amp and/or amp settings, increasing Hype may subtly or dramatically adjust various behind-the-scenes parameters to make the amp sound and feel smoother, fuller, punchier, tighter, and/or more forgiving, but at the expense of accuracy.

---

## Mandarin Rocker

- Model key: `HD2_AmpMandarinRocker`
- Model ID: `697`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 14.0
- Based on: Orange Rockerverb 100 MkIII (dirty channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.1`. Raw range `0` to `1`; raw default `0.61`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.8`. Raw range `0` to `1`; raw default `0.58`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.2`. Raw range `0` to `1`; raw default `0.52`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6.4`. Raw range `0` to `1`; raw default `0.64`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Mandarin Rocker

- Model key: `HD2_PreampMandarinRocker`
- Model ID: `698`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 9.9
- Based on: Orange Rockerverb 100 MkIII (dirty channel)
- Agoura model: No

### Parameters

- `Drive` (`key: Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `6.1`. Raw range `0` to `1`; raw default `0.61`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5.8`. Raw range `0` to `1`; raw default `0.58`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5.2`. Raw range `0` to `1`; raw default `0.52`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `6.4`. Raw range `0` to `1`; raw default `0.64`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Matchstick 30

- Model key: `Agoura_AmpMatchstick30`
- Model ID: `835`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 25.5
- Based on: Matchless DC30
- Agoura model: Yes

### Parameters

- `Channel` (`key: Channel`, `id: 1`, `type: i`): valid values `Ch 1`, `Ch 2`, `Jumped`; default `Ch 1`. Raw range `0` to `2`; raw default `0`. Selects the amp channel or which input is connected. "Jumped" jumps between Channel 1 and Channel 2.
- `Ch1 Drive` (`key: Ch1Drv`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of Channel 1 gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of Channel 1.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ of Channel 1.
- `Ch2 Drive` (`key: Ch2Drv`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of Channel 2 gain applied to the signal, which influences the level of distortion and overall tone.
- `Ch2 Tone` (`key: Ch2Tone`, `id: 6`, `type: i`): valid values `0`, `1`, `2`, `3`, `4`, `5`; default `0`. Raw range `0` to `5`; raw default `0`. Selects one of 6 settings for varying the width of the tone envelope on Channel 2. Lower values result in thinner sounds; higher values result in thicker sounds.
- `High Cut` (`key: HighCut`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Increasing the parameter attenuates high frequencies, effectively reducing the amp's brightness
- `Level` (`key: Level`, `id: 8`, `type: f`): display range `-30` to `10` dB; default `-7`. Raw range `-30` to `10`; raw default `-7`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 10`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Ripple` (`key: Ripple`, `id: 11`, `type: f`): display range `-10` to `10` Stock; default `0`. Raw range `-1` to `1`; raw default `0`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Z PrePost` (`key: ZPrePost`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Determines the location of speaker impedance characteristics in the power amp, primarily due to negative feedback. Higher values mean the effects of the interaction appear at the output of the power amp (Post) and lower values mean more of the effect is fed back to the input of the power amp (Pre).
- `Hype` (`key: Hype`, `id: 13`, `type: f`): display range `0` to `10` Off; default `0`. Raw range `0` to `1`; raw default `0`. Depending on the amp and/or amp settings, increasing Hype may subtly or dramatically adjust various behind-the-scenes parameters to make the amp sound and feel smoother, fuller, punchier, tighter, and/or more forgiving, but at the expense of accuracy.

---

## Matchstick Ch1

- Model key: `HD2_AmpMatchstickCh1`
- Model ID: `616`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 11.3
- Based on: Matchless DC30 (Channel 1)
- Agoura model: No

### Parameters

- `Drive` (`key: Ch1Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Cut` (`key: Cut`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Increasing this parameter cuts high frequencies, which can be used to soften or lessen any undesirable harshness.
- `Treble` (`key: Treble`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the high frequency EQ of the tonestack.
- `Presence` (`key: Presence`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.8`. Raw range `0` to `1`; raw default `0.78`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5.8`. Raw range `0` to `1`; raw default `0.58`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Matchstick Ch1

- Model key: `HD2_PreampMatchstickCh1`
- Model ID: `619`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 6.8
- Based on: Matchless DC30 (Channel 1)
- Agoura model: No

### Parameters

- `Drive` (`key: Ch1Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the low frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the high frequency EQ of the tonestack.
- `Master` (`key: Master`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5.8`. Raw range `0` to `1`; raw default `0.58`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.8`. Raw range `0` to `1`; raw default `0.78`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Hum` (`key: Hum`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Matchstick Ch2

- Model key: `HD2_AmpMatchstickCh2`
- Model ID: `617`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 11.3
- Based on: Matchless DC30 (Channel 2)
- Agoura model: No

### Parameters

- `Drive` (`key: Ch2Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.3`. Raw range `0` to `1`; raw default `0.53`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Tone` (`key: Tone`, `id: 2`, `type: i`): valid values `1`, `2`, `3`, `4`, `5`, `6`; default `3`. Raw range `0` to `5`; raw default `2`. Selects one of 6 settings for varying the width of the tone envelope. Lower values result in thinner sounds; higher values result in thicker sounds.
- `Cut` (`key: Cut`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Increasing this parameter cuts high frequencies, which can be used to soften or lessen any undesirable harshness.
- `Presence` (`key: Presence`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Master` (`key: Master`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Sag` (`key: Sag`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5.7`. Raw range `0` to `1`; raw default `0.57`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Matchstick Ch2

- Model key: `HD2_PreampMatchstickCh2`
- Model ID: `620`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 6.6
- Based on: Matchless DC30 (Channel 2)
- Agoura model: No

### Parameters

- `Drive` (`key: Ch2Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `5.3`. Raw range `0` to `1`; raw default `0.53`. Controls the amount of gain applied to the signal, which influences the level of distortion.
- `Tone` (`key: Tone`, `id: 2`, `type: i`): valid values `1`, `2`, `3`, `4`, `5`, `6`; default `3`. Raw range `0` to `5`; raw default `2`. Selects one of 6 settings for varying the width of the tone envelope. Lower values result in thinner sounds; higher values result in thicker sounds.
- `Master` (`key: Master`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `6.5`. Raw range `0` to `1`; raw default `0.65`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7`. Raw range `0` to `1`; raw default `0.7`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.

---

## Matchstick Jump

- Model key: `HD2_AmpMatchstickJump`
- Model ID: `618`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 14.4
- Based on: Matchless DC30 (Jumped channels)
- Agoura model: No

### Parameters

- `Ch1 Drive` (`key: Ch1Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the amount of Channel 1 gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3.7`. Raw range `0` to `1`; raw default `0.37`. Controls the low frequency EQ of Channel 1.
- `Treble` (`key: Treble`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ of Channel 1.
- `Ch2 Drive` (`key: Ch2Drive`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the amount of Channel 2 gain applied to the signal, which influences the level of distortion and overall tone.
- `Tone` (`key: Tone`, `id: 5`, `type: i`): valid values `1`, `2`, `3`, `4`, `5`, `6`; default `4`. Raw range `0` to `5`; raw default `3`. Selects one of 6 settings for varying the width of the tone envelope on Channel 2. Lower values result in thinner sounds; higher values result in thicker sounds.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5.8`. Raw range `0` to `1`; raw default `0.58`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Presence` (`key: Presence`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Cut` (`key: Cut`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `7.4`. Raw range `0` to `1`; raw default `0.74`. Increasing this parameter cuts high frequencies, which can be used to soften or lessen any undesirable harshness.
- `Master` (`key: Master`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 13`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 14`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Matchstick Jump

- Model key: `HD2_PreampMatchstickJump`
- Model ID: `621`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 9.7
- Based on: Matchless DC30 (Jumped channels)
- Agoura model: No

### Parameters

- `Ch1 Drive` (`key: Ch1Drive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the amount of Channel 1 gain applied to the signal, which influences the level of distortion.
- `Bass` (`key: Bass`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `3.7`. Raw range `0` to `1`; raw default `0.37`. Controls the low frequency EQ of Channel 1.
- `Treble` (`key: Treble`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ of Channel 1.
- `Ch2 Drive` (`key: Ch2Drive`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the amount of Channel 2 gain applied to the signal, which influences the level of distortion and overall tone.
- `Tone` (`key: Tone`, `id: 5`, `type: i`): valid values `1`, `2`, `3`, `4`, `5`, `6`; default `4`. Raw range `0` to `5`; raw default `3`. Selects one of 6 settings for varying the width of the tone envelope on Channel 2. Lower values result in thinner sounds; higher values result in thicker sounds.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `5.8`. Raw range `0` to `1`; raw default `0.58`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Master` (`key: Master`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `10`. Raw range `0` to `1`; raw default `1`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Moo)))n Brt

- Model key: `HD2_AmpMoonBrt`
- Model ID: `703`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 13.0
- Based on: Sunn Model T (Bright channel)
- Agoura model: No

### Parameters

- `Brt Drive` (`key: BrtDrive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `2.4`. Raw range `0` to `1`; raw default `0.24`. Controls the amount of Bright channel gain applied to the signal, which influences the level of distortion.
- `Nrm Drive` (`key: NrmDrive`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Controls the amount of Normal channel bleed into the Bright channel.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the overall level of the Amp block. Unlike Master Volume, it has no effect on the block's tone.
- `Presence` (`key: Presence`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Master` (`key: Master`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.
- `Ripple` (`key: Ripple`, `id: 11`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls how much AC ripple interacts with your tone. Power amp circuits will sometimes let a little bit of rectified 120Hz hum (that the power supply filter caps can't quite fully remove) into the audio signal when the power supply is being pushed hard. Much like Hum, Ripple provides a bit of non-musical distortion to the power amp at distorted settings.
- `Bias` (`key: Bias`, `id: 12`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the bias of the tubes in the power amp, causing a change in tonality and the distortion characteristic.
- `Bias X` (`key: BiasX`, `id: 13`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Determines how the power amp tubes’ voicing reacts when pushed hard. Set low for a tighter feel. Set high for more tube compression. This parameter is highly reactive with the Drive and Master settings.

---

## Moo)))n Brt

- Model key: `HD2_PreampMoonBrt`
- Model ID: `706`
- Type: Preamp
- Category: `preamp`
- Class: Guitar
- DSP usage estimate: 8.5
- Based on: Sunn Model T (Bright channel)
- Agoura model: No

### Parameters

- `Brt Drive` (`key: BrtDrive`, `id: 1`, `type: f`): display range `0` to `10` unitless; default `2.4`. Raw range `0` to `1`; raw default `0.24`. Controls the amount of Bright channel gain applied to the signal, which influences the level of distortion.
- `Nrm Drive` (`key: NrmDrive`, `id: 2`, `type: f`): display range `0` to `10` unitless; default `0`. Raw range `0` to `1`; raw default `0`. Controls the amount of Normal channel bleed into the Bright channel.
- `Bass` (`key: Bass`, `id: 3`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Controls the low frequency EQ of the tonestack.
- `Mid` (`key: Mid`, `id: 4`, `type: f`): display range `0` to `10` unitless; default `4.5`. Raw range `0` to `1`; raw default `0.45`. Controls the midrange frequency EQ of the tonestack.
- `Treble` (`key: Treble`, `id: 5`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the high frequency EQ of the tonestack.
- `Level` (`key: ChVol`, `id: 6`, `type: f`): display range `0` to `10` unitless; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Controls the overall level of the Preamp block. Unlike Master Volume, it has no effect on the block's tone.
- `Presence` (`key: Presence`, `id: 7`, `type: f`): display range `0` to `10` unitless; default `4`. Raw range `0` to `1`; raw default `0.4`. Boosts upper mid and high frequencies in the power amp, resulting in additional punch and bite.
- `Master` (`key: Master`, `id: 8`, `type: f`): display range `0` to `10` unitless; default `8`. Raw range `0` to `1`; raw default `0.8`. Controls the Master Volume of the amplifier.
- `Sag` (`key: Sag`, `id: 9`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Controls the amount of sag, or how much the power supply compresses or "droops" in response to striking the strings hard. Higher values provide more touch dynamics, sustain, and organic feel that's inherent in vintage tube amps; lower values offer a "tighter" responsiveness for a more modern feel.
- `Hum` (`key: Hum`, `id: 10`, `type: f`): display range `0` to `10` unitless; default `5`. Raw range `0` to `1`; raw default `0.5`. Adjusts the level of power supply hum that interacts with the signal. Preamp tube heaters in tube amps will leak a little bit of 60 cycle hum into the audio signal. When this hum mixes with the distorted audio signal, a non-musical distortion is created at low levels. To some players, this low-level, non-harmonic distortion adds a bit of realism to the amp model.

---

## Moo)))n Jump

- Model key: `HD2_AmpMoonJump`
- Model ID: `702`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 14.3
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
- DSP usage estimate: 9.8
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
- DSP usage estimate: 13.0
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
- DSP usage estimate: 8.6
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
- DSP usage estimate: 13.8
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
- DSP usage estimate: 13.8
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
- DSP usage estimate: 13.6
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
- DSP usage estimate: 8.5
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
- DSP usage estimate: 14.6
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
- DSP usage estimate: 10.6
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
- DSP usage estimate: 18.4
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
- DSP usage estimate: 13.8
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
- DSP usage estimate: 18.4
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
- DSP usage estimate: 14.0
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
- DSP usage estimate: 10.5
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
- DSP usage estimate: 6.7
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
- DSP usage estimate: 12.6
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
- DSP usage estimate: 10.7
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
- DSP usage estimate: 25.0
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
- DSP usage estimate: 27.0
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
- DSP usage estimate: 14.0
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
- DSP usage estimate: 10.2
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
- DSP usage estimate: 14.0
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
- DSP usage estimate: 10.4
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
- DSP usage estimate: 22.5
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
- DSP usage estimate: 13.1
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
- DSP usage estimate: 8.9
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
- DSP usage estimate: 13.2
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
- DSP usage estimate: 8.6
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
- DSP usage estimate: 14.8
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
- DSP usage estimate: 10.5
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
- DSP usage estimate: 8.0
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
- DSP usage estimate: 7.7
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
- DSP usage estimate: 13.2
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
- DSP usage estimate: 8.1
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
- DSP usage estimate: 12.1
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
- DSP usage estimate: 6.7
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
- DSP usage estimate: 12.1
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
- DSP usage estimate: 6.7
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
- DSP usage estimate: 20.5
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
- DSP usage estimate: 11.7
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
- DSP usage estimate: 6.6
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
- DSP usage estimate: 13.0
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
- DSP usage estimate: 8.1
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
- DSP usage estimate: 19.5
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
- DSP usage estimate: 12.1
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
- DSP usage estimate: 6.7
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
- DSP usage estimate: 13.0
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
- DSP usage estimate: 7.9
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

## US Luxe Black

- Model key: `Agoura_AmpUSLuxeBlack`
- Model ID: `751`
- Type: Amp
- Category: `amp`
- Class: Guitar
- DSP usage estimate: 21.0
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
- DSP usage estimate: 12.7
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
- DSP usage estimate: 8.3
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
- DSP usage estimate: 15.5
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
- DSP usage estimate: 6.6
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
- DSP usage estimate: 7.1
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
- DSP usage estimate: 20.4
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
- DSP usage estimate: 10.8
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
- DSP usage estimate: 6.8
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
- DSP usage estimate: 12.5
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
- DSP usage estimate: 8.1
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
- DSP usage estimate: 23.5
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
- DSP usage estimate: 8.9
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
- DSP usage estimate: 9.0
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
- DSP usage estimate: 12.5
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
- DSP usage estimate: 12.9
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
- DSP usage estimate: 13.2
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
- DSP usage estimate: 9.2
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
- DSP usage estimate: 13.5
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
- DSP usage estimate: 8.5
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
- DSP usage estimate: 26.5
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
