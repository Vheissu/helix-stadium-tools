# Tempo crash investigation — 22 October 2026

Two users reported a Stadium freeze after changing tempo in HELYON. The supplied message says one device needed maintenance mode and a global-settings reset. It does not establish whether the last action was a tap or a BPM nudge. No crash log, failing traffic capture, or affected firmware version was supplied.

## Confirmed defects

`handleTempoAdjust` sent `global.tempo.bpm` with property type `i`. Stadium defines this property as a float. The mobile property encoder also encoded every JavaScript number as MessagePack INT32, including values explicitly declared as `f`. Changing the caller's type tag alone would leave the payload wrong and truncate fractional values.

The app allowed BPM up to 300. Static inspection of the locally extracted 1.4 server binary shows a default of 120 and float bounds of 20 and 240 in the global-tempo definition (`0x3b8d04` through `0x3b8dbc`). The old range therefore allowed values outside the device's declared limits.

BPM nudges always targeted global tempo, even when the device was using preset or snapshot tempo. The firmware's tempo selection branch (`0x47e4bc`, `0x47e8f8`, `0x47e934`) maps modes 0, 1 and 2 to snapshot, preset and global. Property-key initialization confirms those targets as `server.snapshot.tempo.bpm`, `preset.tempo.bpm` and `global.tempo.bpm`.

Tap used a separate command, `volatile.press.taptempo`, with integer payload 1. The investigation did not establish that this command or payload caused the reported crash. The patch removes this command from the app's tap control rather than relying on an unverified simulated footswitch event.

The malformed persistent BPM write is a plausible explanation for needing to reset global settings. That remains an inference: the reported device failure was not reproduced, and firmware handling of the malformed write was not exercised.

## Patch

- Encode property values according to their declared type. Float values, including whole BPM numbers, use MessagePack FLOAT32. Reject nonfinite and mismatched values before sending.
- Enforce float type and 20–240 BPM at the property boundary in both the mobile client and Python library.
- Calculate tap timing locally with a monotonic clock and up to four valid intervals. The first tap sends nothing. Ignore taps less than 250 ms apart; a gap longer than three seconds starts a new sequence.
- Read the device's tempo mode and current typed BPM before writing. Refuse unknown modes or invalid current values instead of guessing a default.
- Allow one tempo operation at a time. Drop overlapping operations, do not queue delayed taps, and do not retry writes after an error.
- Require acknowledgement and matching readback before reporting success. Reset tap timing and cancel pending work on disconnect, preset change, snapshot change or tempo-mode change.

These changes apply to the shared client used by Wi-Fi and USB. Existing installations still contain the old behavior until an updated build is distributed. The patch does not repair settings on an already affected device.

## Verification

- Mobile suite: 131 passing tests, including packet types, invalid input, all three tempo modes, tap timing, limits, delayed responses, cancellation and readback failures.
- TypeScript check: passes.
- ESLint: no errors; two existing hook-dependency warnings in `App.tsx`.
- Python suite: 392 passing tests.
- Independently decoded 15 mobile-generated OSC packets with Python across all three tempo targets and BPM values 20, 82.19, 120, 121 and 240.
- Ran `python3 scripts/osc_pcap_dump.py --reassemble --decode-properties` on a synthetic capture containing those packets. All 15 decoded with float BPM values. This is an offline packet check, not a capture from hardware.

Local evidence is under `.codex-artifacts/tempo-investigation/`. Firmware files remain in the ignored research directory; they are not included in the patch.

No physical-device commands, store builds or submissions were performed during the investigation. The subsequent owner-authorized builds and store submissions are recorded in [the release record](RELEASE_2026_10_22.md). Before distributing the fix, validate normal tap and nudge behavior on a spare preset in each tempo mode, over both supported connection types. Do not replay the malformed command to reproduce the crash. Affected users' firmware versions and exact final actions would help narrow the remaining cause of the freeze.
