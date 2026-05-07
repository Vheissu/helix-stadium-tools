# All cabs and IRs

Upload-ready knowledge for guitar cabs, bass cabs, and IR cabs.

Generated from the installed Helix Stadium desktop app bundle on 2026-05-07T22:33:14.224003+00:00.

Use display values for normal user-facing answers. Use model keys, IDs, and raw ranges only when the user asks for automation or low-level control details.

Model count: 48

---

## 1x10 US Princess

- Model key: `HD2_CabMicIr_1x10USPrincessWithPan`
- Model ID: `434`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 8x10" Ampeg SVT 810AV Heritage
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `67 Cond`. Raw range `0` to `11`; raw default `11`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `6.3`. Raw range `0` to `1`; raw default `0.63`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `2`. Raw range `1` to `12`; raw default `2`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `45`. Raw range `0` to `45`; raw default `45`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 1x12 Blue Bell

- Model key: `HD2_CabMicIr_1x12BlueBellWithPan`
- Model ID: `453`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 1x12" Vox AC-15 Blue Alnico
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `67 Cond`. Raw range `0` to `11`; raw default `11`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `3.6`. Raw range `0` to `1`; raw default `0.36`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `1`. Raw range `1` to `12`; raw default `1`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `80`. Raw range `19.9` to `500`; raw default `80`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `10400`. Raw range `500` to `20100`; raw default `10400`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 1x12 Cali EXT

- Model key: `HD2_CabMicIr_1x12CaliEXTWithPan`
- Model ID: `448`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: Custom 1x12" open-back cab EVM12L
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `57 Dynamic`. Raw range `0` to `11`; raw default `0`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `3.6`. Raw range `0` to `1`; raw default `0.36`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `1`. Raw range `1` to `12`; raw default `1`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `12000`. Raw range `500` to `20100`; raw default `12000`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 1x12 Cali IV

- Model key: `HD2_CabMicIr_1x12CaliIVWithPan`
- Model ID: `458`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 1x8" Fender Tweed Champ
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `414 Cond`. Raw range `0` to `11`; raw default `9`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `3.3`. Raw range `0` to `1`; raw default `0.33`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `3`. Raw range `1` to `12`; raw default `3`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `11500`. Raw range `500` to `20100`; raw default `11500`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 1x12 Epicenter

- Model key: `HD2_CabMicIr_1x12EpicenterWithPan`
- Model ID: `450`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Bass
- DSP usage estimate: 1.5
- Based on: 2x12" Matchless DC-30 custom G12M-25
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `88 Dynamic`, `52 Dynamic`, `112 Dynamic`, `D6 Dynamic`, `40 Dynamic`, `4038 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `D6 Dynamic`. Raw range `0` to `11`; raw default `6`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `3.5`. Raw range `0` to `1`; raw default `0.35`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `6.25`. Raw range `1` to `12`; raw default `6.25`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `45`. Raw range `0` to `45`; raw default `45`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `40`. Raw range `19.9` to `500`; raw default `40`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `14000`. Raw range `500` to `20100`; raw default `14000`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 1x12 Fullerton

- Model key: `HD2_CabMicIr_1x12FullertonWithPan`
- Model ID: `460`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 4x12" Hiwatt Fane
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `7 Dynamic`. Raw range `0` to `11`; raw default `2`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `1.9`. Raw range `0` to `1`; raw default `0.19`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `1`. Raw range `1` to `12`; raw default `1`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `16000`. Raw range `500` to `20100`; raw default `16000`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 1x12 Grammatico

- Model key: `HD2_CabMicIr_1x12GrammaticoWithPan`
- Model ID: `430`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 4x12" Marshall 1960A T75
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `67 Cond`. Raw range `0` to `11`; raw default `11`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `1.9`. Raw range `0` to `1`; raw default `0.19`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `7`. Raw range `1` to `12`; raw default `7`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 1x12 Open Cast

- Model key: `HD2_CabMicIr_1x12OpenCastWithPan`
- Model ID: `454`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 1x12" Fender Tweed Deluxe
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `906 Dynamic`. Raw range `0` to `11`; raw default `3`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `4`. Raw range `0` to `1`; raw default `0.4`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `2`. Raw range `1` to `12`; raw default `2`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 1x12 Open Cream

- Model key: `HD2_CabMicIr_1x12OpenCreamWithPan`
- Model ID: `455`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 4x12" Marshall "Basketweave" Fill This In
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `906 Dynamic`. Raw range `0` to `11`; raw default `3`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `2.8`. Raw range `0` to `1`; raw default `0.28`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `2`. Raw range `1` to `12`; raw default `2`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 1x12 US Deluxe

- Model key: `HD2_CabMicIr_1x12USDeluxeWithPan`
- Model ID: `428`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 1x10" Fender Princeton Reverb
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `57 Dynamic`. Raw range `0` to `11`; raw default `0`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `1.9`. Raw range `0` to `1`; raw default `0.19`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `1`. Raw range `1` to `12`; raw default `1`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `45`. Raw range `0` to `45`; raw default `45`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 1x15 Ampeg B-15

- Model key: `HD2_CabMicIr_1x15AmpegB15WithPan`
- Model ID: `426`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Bass
- DSP usage estimate: 1.5
- Based on: 4x12" Park 75 G12H-30
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `88 Dynamic`, `52 Dynamic`, `112 Dynamic`, `D6 Dynamic`, `40 Dynamic`, `4038 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `47 Cond FET`. Raw range `0` to `11`; raw default `10`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `7.5`. Raw range `0` to `1`; raw default `0.75`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `9`. Raw range `1` to `12`; raw default `9`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `45`. Raw range `0` to `45`; raw default `45`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 1x8 Small Tweed

- Model key: `HD2_CabMicIr_1x8SmallTweedWithPan`
- Model ID: `464`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 4x12" Soldano Eminence
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `160 Ribbon`. Raw range `0` to `11`; raw default `6`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `3`. Raw range `1` to `12`; raw default `3`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `45`. Raw range `0` to `45`; raw default `45`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `10000`. Raw range `500` to `20100`; raw default `10000`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 2x12 Blue Bell

- Model key: `HD2_CabMicIr_2x12BlueBellWithPan`
- Model ID: `429`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 4x12" MESA/Boogie 4FB V30
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `57 Dynamic`. Raw range `0` to `11`; raw default `0`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `1`. Raw range `1` to `12`; raw default `1`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `90`. Raw range `19.9` to `500`; raw default `90`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `15000`. Raw range `500` to `20100`; raw default `15000`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 2x12 Double C12N

- Model key: `HD2_CabMicIr_2x12DoubleC12NWithPan`
- Model ID: `437`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 2x12" Roland JC-120
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `57 Dynamic`. Raw range `0` to `11`; raw default `0`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `1.6`. Raw range `0` to `1`; raw default `0.16`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `1`. Raw range `1` to `12`; raw default `1`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `80`. Raw range `19.9` to `500`; raw default `80`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `8000`. Raw range `500` to `20100`; raw default `8000`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 2x12 Interstate

- Model key: `HD2_CabMicIr_2x12InterstateWithPan`
- Model ID: `459`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 1 6x9" Supro S6616
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `906 Dynamic`. Raw range `0` to `11`; raw default `3`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `1.9`. Raw range `0` to `1`; raw default `0.19`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `1`. Raw range `1` to `12`; raw default `1`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `11000`. Raw range `500` to `20100`; raw default `11000`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 2x12 Jazz Rivet

- Model key: `HD2_CabMicIr_2x12JazzRivetWithPan`
- Model ID: `443`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 2x12" Vox AC-30 Silver Alnico
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `57 Dynamic`. Raw range `0` to `11`; raw default `0`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `2.3`. Raw range `0` to `1`; raw default `0.23`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `1`. Raw range `1` to `12`; raw default `1`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 2x12 Mail C12Q

- Model key: `HD2_CabMicIr_2x12MailC12QWithPan`
- Model ID: `445`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 4x12" Marshall "Basketweave" G12M-20
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `57 Dynamic`. Raw range `0` to `11`; raw default `0`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `2.3`. Raw range `0` to `1`; raw default `0.23`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `1`. Raw range `1` to `12`; raw default `1`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 2x12 Mandarin 30

- Model key: `HD2_CabMicIr_2x12MandarinWithPan`
- Model ID: `447`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 1x12" Vox AC-15 Blue Alnico
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `67 Cond`. Raw range `0` to `11`; raw default `11`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `1.6`. Raw range `0` to `1`; raw default `0.16`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `1`. Raw range `1` to `12`; raw default `1`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `12000`. Raw range `500` to `20100`; raw default `12000`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 2x12 Match G25

- Model key: `HD2_CabMicIr_2x12MatchG25WithPan`
- Model ID: `456`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 2x15" Fender Silverface Bassman
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `57 Dynamic`. Raw range `0` to `11`; raw default `0`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `5.3`. Raw range `0` to `1`; raw default `0.53`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `1.5`. Raw range `1` to `12`; raw default `1.5`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `60`. Raw range `19.9` to `500`; raw default `60`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `9000`. Raw range `500` to `20100`; raw default `9000`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 2x12 Match H30

- Model key: `HD2_CabMicIr_2x12MatchH30WithPan`
- Model ID: `457`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 6x10" MESA/Boogie
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `57 Dynamic`. Raw range `0` to `11`; raw default `0`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `5.6`. Raw range `0` to `1`; raw default `0.56`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `1`. Raw range `1` to `12`; raw default `1`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `60`. Raw range `19.9` to `500`; raw default `60`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `9000`. Raw range `500` to `20100`; raw default `9000`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 2x12 Silver Bell

- Model key: `HD2_CabMicIr_2x12SilverBellWithPan`
- Model ID: `449`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: Custom 1x12" open-back cab G12M-65
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `67 Cond`. Raw range `0` to `11`; raw default `11`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `5.5`. Raw range `0` to `1`; raw default `0.55`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `1.25`. Raw range `1` to `12`; raw default `1.25`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `90`. Raw range `19.9` to `500`; raw default `90`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `5000`. Raw range `500` to `20100`; raw default `5000`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 2x15 Brute

- Model key: `HD2_CabMicIr_2x15BruteWithPan`
- Model ID: `425`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Bass
- DSP usage estimate: 1.5
- Based on: 4x12" Marshall 1960AV V30
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `88 Dynamic`, `52 Dynamic`, `112 Dynamic`, `D6 Dynamic`, `40 Dynamic`, `4038 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `D6 Dynamic`. Raw range `0` to `11`; raw default `6`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `0.9`. Raw range `0` to `1`; raw default `0.09`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `4.25`. Raw range `1` to `12`; raw default `4.25`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `45`. Raw range `0` to `45`; raw default `45`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `25`. Raw range `19.9` to `500`; raw default `25`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `11500`. Raw range `500` to `20100`; raw default `11500`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 2x15 US Dripman

- Model key: `HD2_CabMicIr_2x15USDripmanWithPan`
- Model ID: `462`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Bass
- DSP usage estimate: 1.5
- Based on: Cab IR
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `88 Dynamic`, `52 Dynamic`, `112 Dynamic`, `D6 Dynamic`, `40 Dynamic`, `4038 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `67 Cond`. Raw range `0` to `11`; raw default `11`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `2.6`. Raw range `0` to `1`; raw default `0.26`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `4.25`. Raw range `1` to `12`; raw default `4.25`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 4x10 Ampeg Pro

- Model key: `HD2_CabMicIr_4x10AmpegProWithPan`
- Model ID: `452`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Bass
- DSP usage estimate: 1.5
- Based on: 1x12" MESA/Boogie Mark IV
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `88 Dynamic`, `52 Dynamic`, `112 Dynamic`, `D6 Dynamic`, `40 Dynamic`, `4038 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `D6 Dynamic`. Raw range `0` to `11`; raw default `6`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `2.4`. Raw range `0` to `1`; raw default `0.24`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `1`. Raw range `1` to `12`; raw default `1`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `45`. Raw range `0` to `45`; raw default `45`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `13800`. Raw range `500` to `20100`; raw default `13800`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 4x10 Garden

- Model key: `HD2_CabMicIr_4x10GardenWithPan`
- Model ID: `444`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Bass
- DSP usage estimate: 1.5
- Based on: 1x12" Epifani Ultralight series
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `88 Dynamic`, `52 Dynamic`, `112 Dynamic`, `D6 Dynamic`, `40 Dynamic`, `4038 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `421 Dynamic`. Raw range `0` to `11`; raw default `1`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `0`. Raw range `0` to `1`; raw default `0`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `3.75`. Raw range `1` to `12`; raw default `3.75`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 4x10 Tweed P10R

- Model key: `HD2_CabMicIr_4x10TweedP10RWithPan`
- Model ID: `442`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 1x12" MESA/Boogie Extension Cab
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `7 Dynamic`. Raw range `0` to `11`; raw default `2`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `2`. Raw range `0` to `1`; raw default `0.2`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `1`. Raw range `1` to `12`; raw default `1`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 4x10 US Super

- Model key: `HD2_CabMicIr_4x10USSuperWithPan`
- Model ID: `469`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 4x10" Fender Super Reverb
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `57 Dynamic`. Raw range `0` to `11`; raw default `0`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `0`. Raw range `0` to `1`; raw default `0`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `1`. Raw range `1` to `12`; raw default `1`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 4x12 1960A T75

- Model key: `HD2_CabMicIr_4x121960AT75WithPan`
- Model ID: `436`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 4x10" Fender Bassman P10R
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `57 Dynamic`. Raw range `0` to `11`; raw default `0`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `3.2`. Raw range `0` to `1`; raw default `0.32`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `1`. Raw range `1` to `12`; raw default `1`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `45`. Raw range `0` to `45`; raw default `45`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 4x12 Blackback H30

- Model key: `HD2_CabMicIr_4x12BlackbackH30WithPan`
- Model ID: `432`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 4x12" Sunn G75T
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `906 Dynamic`. Raw range `0` to `11`; raw default `3`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `3.2`. Raw range `0` to `1`; raw default `0.32`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `1`. Raw range `1` to `12`; raw default `1`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 4x12 Brit V30

- Model key: `HD2_CabMicIr_4x12BritV30WithPan`
- Model ID: `431`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 2x12" Fender Twin
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `7 Dynamic`. Raw range `0` to `11`; raw default `2`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `1.5`. Raw range `0` to `1`; raw default `0.15`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `1`. Raw range `1` to `12`; raw default `1`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `45`. Raw range `0` to `45`; raw default `45`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `12000`. Raw range `500` to `20100`; raw default `12000`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 4x12 Cali V30

- Model key: `HD2_CabMicIr_4x12CaliV30WithPan`
- Model ID: `435`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 4x12" Marshall "Basketweave" G12M-25
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `47 Cond FET`. Raw range `0` to `11`; raw default `10`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `2.3`. Raw range `0` to `1`; raw default `0.23`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `1`. Raw range `1` to `12`; raw default `1`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 4x12 Cartog C90

- Model key: `HD2_CabMicIr_4x12CartogC90WithPan`
- Model ID: `471`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 4x12" Cartographer Mesa C90 Black Shadow
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `57 Dynamic`. Raw range `0` to `11`; raw default `0`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `0`. Raw range `0` to `1`; raw default `0`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `1`. Raw range `1` to `12`; raw default `1`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 4x12 Cartog Guv

- Model key: `HD2_CabMicIr_4x12CartogGuvWithPan`
- Model ID: `472`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 4x12" Cartographer Eminence Governor
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `57 Dynamic`. Raw range `0` to `11`; raw default `0`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `0`. Raw range `0` to `1`; raw default `0`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `1`. Raw range `1` to `12`; raw default `1`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 4x12 Greenback 20

- Model key: `HD2_CabMicIr_4x12Greenback20WithPan`
- Model ID: `451`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 2x12" Matchless DC-30 custom G12H-30
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `4038 Ribbon`. Raw range `0` to `11`; raw default `7`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `2.5`. Raw range `0` to `1`; raw default `0.25`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `5`. Raw range `1` to `12`; raw default `5`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 4x12 Greenback 25

- Model key: `HD2_CabMicIr_4x12Greenback25WithPan`
- Model ID: `441`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 2x12" Orange PPC212 V30
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `57 Dynamic`. Raw range `0` to `11`; raw default `0`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `2.4`. Raw range `0` to `1`; raw default `0.24`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `1`. Raw range `1` to `12`; raw default `1`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 4x12 Greenback 30

- Model key: `HD2_CabMicIr_4x12Greenback30WithPan`
- Model ID: `461`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 4x12" Marshall "Basketweave" Fill This In
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `906 Dynamic`. Raw range `0` to `11`; raw default `3`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `4`. Raw range `0` to `1`; raw default `0.4`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `2`. Raw range `1` to `12`; raw default `2`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `45`. Raw range `0` to `45`; raw default `45`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `11000`. Raw range `500` to `20100`; raw default `11000`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 4x12 MOO)))N T75

- Model key: `HD2_CabMicIr_4x12MOONT75WithPan`
- Model ID: `438`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 4x10" Eden D410XLT
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `906 Dynamic`. Raw range `0` to `11`; raw default `3`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `3.9`. Raw range `0` to `1`; raw default `0.39`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `1.5`. Raw range `1` to `12`; raw default `1.5`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `45`. Raw range `0` to `45`; raw default `45`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `40`. Raw range `19.9` to `500`; raw default `40`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `12000`. Raw range `500` to `20100`; raw default `12000`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 4x12 Mandarin EM

- Model key: `HD2_CabMicIr_4x12MandarinWithPan`
- Model ID: `433`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 4x12" Bogner Uberkab T75
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `160 Ribbon`. Raw range `0` to `11`; raw default `6`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `2.3`. Raw range `0` to `1`; raw default `0.23`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `3.5`. Raw range `1` to `12`; raw default `3.5`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `45`. Raw range `0` to `45`; raw default `45`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 4x12 SoloLead EM

- Model key: `HD2_CabMicIr_4x12SoloLeadEMWithPan`
- Model ID: `470`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 4x12" Soldano Eminence
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `57 Dynamic`. Raw range `0` to `11`; raw default `0`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `0`. Raw range `0` to `1`; raw default `0`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `1`. Raw range `1` to `12`; raw default `1`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 4x12 Uber T75

- Model key: `HD2_CabMicIr_4x12UberT75WithPan`
- Model ID: `439`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 2x12" Silvertone 1481
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `57 Dynamic`. Raw range `0` to `11`; raw default `0`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `3.9`. Raw range `0` to `1`; raw default `0.39`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `1`. Raw range `1` to `12`; raw default `1`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 4x12 Uber V30

- Model key: `HD2_CabMicIr_4x12UberV30WithPan`
- Model ID: `446`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 4x10" Ampeg PR-410HLF
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `47 Cond FET`. Raw range `0` to `11`; raw default `10`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `2.7`. Raw range `0` to `1`; raw default `0.27`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `1`. Raw range `1` to `12`; raw default `1`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `12000`. Raw range `500` to `20100`; raw default `12000`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 4x12 WhoWatt 100

- Model key: `HD2_CabMicIr_4x12WhoWatt100WithPan`
- Model ID: `466`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 4x12" Cartographer Eminence Governor
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `57 Dynamic`. Raw range `0` to `11`; raw default `0`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `1`. Raw range `0` to `1`; raw default `0.1`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `1`. Raw range `1` to `12`; raw default `1`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `10500`. Raw range `500` to `20100`; raw default `10500`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 4x12 XXL V30

- Model key: `HD2_CabMicIr_4x12XXLV30WithPan`
- Model ID: `427`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 4x12" Orange Eminence
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `160 Ribbon`. Raw range `0` to `11`; raw default `6`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `2.7`. Raw range `0` to `1`; raw default `0.27`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `1`. Raw range `1` to `12`; raw default `1`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `40`. Raw range `19.9` to `500`; raw default `40`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `12000`. Raw range `500` to `20100`; raw default `12000`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 6x10 Cali Power

- Model key: `HD2_CabMicIr_6x10CaliPowerWithPan`
- Model ID: `463`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Bass
- DSP usage estimate: 1.5
- Based on: 4x10" Fender Super Reverb
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `88 Dynamic`, `52 Dynamic`, `112 Dynamic`, `D6 Dynamic`, `40 Dynamic`, `4038 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `57 Dynamic`. Raw range `0` to `11`; raw default `0`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `0`. Raw range `0` to `1`; raw default `0`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `3.25`. Raw range `1` to `12`; raw default `3.25`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## 8x10 SVT AV

- Model key: `HD2_CabMicIr_8x10SVTAVWithPan`
- Model ID: `440`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Bass
- DSP usage estimate: 1.5
- Based on: 4x12" Bogner Uberkab V30
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `88 Dynamic`, `52 Dynamic`, `112 Dynamic`, `D6 Dynamic`, `40 Dynamic`, `4038 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `88 Dynamic`. Raw range `0` to `11`; raw default `3`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `0`. Raw range `0` to `1`; raw default `0`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `5`. Raw range `1` to `12`; raw default `5`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `45`. Raw range `0` to `45`; raw default `45`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `37`. Raw range `19.9` to `500`; raw default `37`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `8000`. Raw range `500` to `20100`; raw default `8000`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.

---

## IR

- Model key: `HX2_ImpulseResponseWithPan`
- Model ID: `468`
- Type: IR
- Category: `ir`
- Class: IR
- DSP usage estimate: 0.0
- Based on: Unknown
- Agoura model: No

### Parameters

- `Low Cut` (`key: LowCut`, `id: 11`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 12`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Polarity` (`key: Polarity`, `id: 13`, `type: b`): valid values `Normal`, `Inverted`; default `Normal`. Raw range `Off` to `On`; raw default `Off`. Inverts the polarity of the signal.
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `0` to `50` ms; default `0`. Raw range `0` to `0.05`; raw default `0`. Delays the signal slightly to time-align with the other side of the Cab block (helping to avoid phase issues). It can also be used to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here.
- `Mix` (`key: Mix`, `id: 15`, `type: f`): display range `0` to `100` %; default `100`. Raw range `0` to `1`; raw default `1`. Controls the blend between the incoming “dry” signal and the Cab IR-processed “wet” signal. At 0%, no IR is heard; at 100%, no dry signal is heard. Normally, this should be left at 100%.
- `Level` (`key: Level`, `id: 16`, `type: f`): display range `-60` to `6` dB; default `-18`. Raw range `-60` to `6`; raw default `-18`. Sets the overall level of the IR.
- `Pan` (`key: Pan`, `id: 17`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the IR between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")

---

## No Cab

- Model key: `HD2_CabMicIr_NoCab`
- Model ID: `467`
- Type: Cab
- Category: `cab_ir_interp`
- Class: No Cab
- DSP usage estimate: 1.5
- Based on: Unknown
- Agoura model: No

### Parameters

- No editable parameters were extracted for this model.

---

## Soup Pro Ellipse

- Model key: `HD2_CabMicIr_SoupProEllipseWithPan`
- Model ID: `465`
- Type: Cab
- Category: `cab_ir_interp`
- Class: Guitar
- DSP usage estimate: 1.5
- Based on: 4x12" Cartographer Mesa C90 Black Shadow
- Agoura model: No

### Parameters

- `Mic` (`key: Mic`, `id: 1`, `type: i`): valid values `57 Dynamic`, `421 Dynamic`, `7 Dynamic`, `906 Dynamic`, `30 Dynamic`, `121 Ribbon`, `160 Ribbon`, `4038 Ribbon`, `84 Ribbon`, `414 Cond`, `47 Cond FET`, `67 Cond`; default `47 Cond FET`. Raw range `0` to `11`; raw default `10`. Selects the mic pointed at the cabinet. (Guitar and Bass cabs have different sets of mics available.) Mic selection can have as big an impact on your tone as tweaking the Amp's tonestack or even applying an EQ block, so experimentation is key here.
- `Position` (`key: Position`, `id: 2`, `type: f`): display range `0` to `10` Center; default `2.8`. Raw range `0` to `1`; raw default `0.28`. Sets the lateral location of the mic in relation to the speaker cone, from center of the speaker to the edge. The "Cap Edge" value may appear in a different location depending on the selected cab.
- `Distance` (`key: Distance`, `id: 3`, `type: f`): display range `1` to `12` unitless; default `5.5`. Raw range `1` to `12`; raw default `5.5`. Sets the distance of the mic from the speaker cone. Choose from 1.00" to 12.00" in 1/4" increments.
- `Angle` (`key: Angle`, `id: 4`, `type: f`): display range `0` to `45` degrees; default `0`. Raw range `0` to `45`; raw default `0`. Sets the angle of the mic relative to the front of the speaker cabinet. 0 degrees is pointing directly at the speaker, 45 degrees is pointing off-axis.
- `Low Cut` (`key: LowCut`, `id: 10`, `type: f`): display range `19.9` to `500` Off; default `19.9`. Raw range `19.9` to `500`; raw default `19.9`. Applies a low cut (high pass) filter, letting you remove all audio below a certain frequency. May be useful in removing undesirable low end rumble.
- `High Cut` (`key: HighCut`, `id: 11`, `type: f`): display range `500` to `20100` Hz; default `20100`. Raw range `500` to `20100`; raw default `20100`. Applies a high cut (low pass) filter, letting you remove all audio above a certain frequency. May be useful in removing high end harshness.
- `Level` (`key: Level`, `id: 12`, `type: f`): display range `-60` to `6` dB; default `0`. Raw range `-60` to `6`; raw default `0`. Sets the overall level of the Cab. Use to adjust level against the other side of the Cab block.
- `Pan` (`key: Pan`, `id: 13`, `type: f`): display range `-100` to `100` Left; default `0.5`. Raw range `0` to `1`; raw default `0.5`. Controls the panning of the Cab between the left and right channels. For stereo setups, the Cab block can sound much wider if the two sides are panned opposite of one another ("L 100" and "R 100")
- `Delay` (`key: Delay`, `id: 14`, `type: f`): display range `-0.02` to `50` ms; default `0`. Raw range `-2e-05` to `0.05`; raw default `0`. Delays the signal slightly to purposely impart a bit of phase incoherence or at higher values, increase the Cab block's apparent stereo width. A little goes a long way here. When set to "Auto" (all the way left, before 0.0 ms), it approximates the delay through the air when changing the mic Distance parameter.
