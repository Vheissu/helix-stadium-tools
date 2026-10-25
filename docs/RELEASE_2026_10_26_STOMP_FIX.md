# HELYON Stomp fix, 26 October 2026

Source commit: `b0520cef633358fd56778a3993ba3703013ce8e2`.

Steve's TestFlight report on iOS build 15 showed disabled Stomp B buttons.
The app only executed a narrow set of MIDI CC commands. It did not apply
effect bypass or parameter assignments, and it treated the source's current
bypass state as a disabled configuration.

## Changes

- Stomp A and B tiles now apply their assigned bypass and parameter controls
  through the Stadium's controller API. The whole tile is interactive.
- On/Off states follow actual effect values. Intermediate or mixed parameter
  values do not invent a definite switch state.
- Stored immediate Press commands use the device's native executor, including
  Program Changes. The app preserves native duplicate Program Change policy.
- Each action checks the current preset, snapshot, assignments and block
  identities. Controller changes require target readback as well as a successful
  reply. Uncertain commands are not retried, and incomplete assignments stop
  before execution.
- Large text uses one column. Unavailable assignments display a reason.

## Known limits

Release, Hold, Toggle, delayed, momentary and continuous assignments are not
emulated by the tap controls. Their tiles explain that the Stadium footswitch
is required. Dedicated switch commands are excluded.

The native parameter-value API does not update the physical parameter switch's
toggle latch. After an app parameter change, the first physical press can
repeat the current value. Affected tiles explain this limitation. No supported
runtime-only latch setter was found in the editor API. Bypass controllers read
their actual target state and do not have this limitation. The app does not
rewrite assignments or change global MIDI settings to work around it.

## Verification

- All **284 mobile tests** passed, with zero failures or skips.
- TypeScript passed. ESLint reported zero errors and two existing hook warnings.
- Production exports passed for iOS and Android.
- The current client repeatedly switched real Stomp A and B bypass assignments.
- A mixed switch applied reversed bypass endpoints and parameter ranges of
  0.2–0.8 and 0.8–0.2, with every resulting value checked on the device.
- The native phone app switched the real mixed assignment on and off. Its large
  text layout and current state were inspected in iOS Simulator.
- CoreMIDI captured Program Change 119 from the current client and Program
  Change 120 from the phone UI, each exactly once. Native suppression of repeated
  identical Program Changes was retained.
- Testing used temporary preset 936, `HELYON Stomp Fix Test`. It was removed.
  The original `Take You At Your Word F` preset and snapshot 2 were restored.
  Saved preset bytes and the User preset library match the baseline, with no
  unsaved changes.

Evidence is saved locally under `.codex-artifacts/stomp-fix-oct25/`; testing
started on 25 October and finished after midnight in Brisbane.

## Tester builds

Both builds use version 1.0.0 and the existing signing credentials.

| Platform | Build | EAS job |
| --- | ---: | --- |
| iOS | 16 | [7f218da3-fb72-4370-82e9-b310b53ab2f7](https://expo.dev/accounts/beggars/projects/helyon/builds/7f218da3-fb72-4370-82e9-b310b53ab2f7) |
| Android | 17 | [828e0eae-0ad6-44b6-8bdc-f2b76723472b](https://expo.dev/accounts/beggars/projects/helyon/builds/828e0eae-0ad6-44b6-8bdc-f2b76723472b) |

Both builds finished successfully. The signed iOS package was checked for its
bundle identifier, build number and new Stomp implementation; strict signature
verification passed. Android manifest, bundle markers and signature were also
verified.

### TestFlight

iOS **1.0.0 (16)** is **Testing** for all **76 registered testers**: 75 external
and one internal. Beta review is approved, and both internal and external
testing are active. All three existing groups include build 16. Verification at
**12:26 am Brisbane time on 26 October** found 76 covered testers and zero
uncovered testers. Automatic notifications are enabled.

- [Completed iOS upload](https://expo.dev/accounts/beggars/projects/helyon/submissions/f7e60dec-2e46-4b3f-be72-da6c9506538e)
- [TestFlight](https://appstoreconnect.apple.com/apps/6824149078/testflight)

### Google Play

Android **1.0.0 (17)** is **Available to internal testers**, released at
**12:29 am Brisbane time on 26 October**. The Publisher API confirms
`RELEASE_LIFECYCLE_STATE_PUBLISHED` for the internal track.

Closed Alpha build 17 is submitted and **In review**. Build 16 remains available
until Google publishes the update. Managed publishing is off, with no manual
action pending. An approval monitor checks every 15 minutes and will confirm
availability, update this record and stop when Alpha build 17 is published.

Both existing tester lists remain selected on both tracks: HELYON owner testing
has **27 entries**, and Testers has **23**. These counts can overlap and are not
a distinct-user total. Selections were verified after the release submission.

- [Completed Android upload](https://expo.dev/accounts/beggars/projects/helyon/submissions/c377cb94-d38b-4533-875d-4758cee91da9)
- [Internal testing opt-in](https://play.google.com/apps/internaltest/4701590729869450330)
- [Closed testing opt-in](https://play.google.com/apps/testing/com.beggars.stadiumremote)

Two builds and two successful uploads were made for this fix. No replacement
build or upload retry was needed.

| Artifact | Bytes | SHA-256 |
| --- | ---: | --- |
| iOS 16 IPA | 24,173,131 | `1bf3fcba2b51cc94a05c73e9abf811c67cf6d75155f7578f6438d28d5dc3636a` |
| Android 17 AAB | 65,592,898 | `b0c45ad8ee90c640a9f8ad51798dccbb5bd2d9dc42ea7b062cde4f5d39266a13` |

Production tracks and App Store production review are outside this release.
