# Accessibility

HELYON supports VoiceOver on iPhone and iPad and TalkBack on Android. Accessibility semantics are part of the normal controls. The optional list layout provides larger text and explicit buttons for editing and arranging blocks.

## Choosing a layout

Accessibility settings are available on the connection screen, in Settings, and in offline preview:

- **Automatic** uses list layout when the operating system reports an active screen reader.
- **List layout** keeps that layout enabled, including without a screen reader.
- **Visual layout** retains the graphical signal chain. With a screen reader active, parameters and the block list still use accessible controls.

The choice is saved locally. It does not change the device's accessibility settings. Screen-reader and Reduce Motion changes are observed while the app is running.

## Controls

Each block in list layout exposes its name, path, position, enabled state, and selected state. Edit, Enable or Bypass, Options, Move earlier, and Move later are separate controls. Empty positions expose Add block. Reordering uses the editor's existing device operation and does not bypass model, routing, or DSP limits.

Parameters support native increment and decrement actions, explicit increase and decrease buttons, and exact numeric entry. Named option lists also have a Choose value sheet. Display units are converted back to the device's native range. Invalid, blank, and out-of-range numeric entries leave the sheet open with an error instead of silently changing the parameter.

Preset and setlist rows have separate loading and management controls. Snapshot options are available through a visible button. Tabs, selected presets and snapshots, colour choices, switches, search fields, and icon-only controls have accessible labels and states. Matrix mixer rows describe the channel, mute/solo state, level, and pan together.

Sheets identify their title, contain screen-reader navigation, support a close control and the iOS escape gesture, and request focus restoration to their opening control. Screen headings request focus on navigation. Status changes are announced; routine completed background synchronisation is excluded. Reduced Motion removes sheet transitions.

List layout allows system text scaling, removes single-line truncation, increases small text to at least 16 points before scaling, and uses brighter secondary text. Action targets are at least 48 points. Parameter actions wrap as text grows.

## Scope and limits

Offline preview can exercise block selection, bypass, removal, reordering, adding a model, and parameter editing without connecting hardware. Those edits stay local and are discarded on exit.

Tuner Remote exposes the existing tuner settings. The app does not receive live note and pitch readings, so it cannot speak tuning accuracy. Accessibility support does not add functions that the editor does not already provide.

A physical iPad with VoiceOver and a connected Stadium still needs an end-to-end usability session, ideally with a blind musician. Simulator accessibility actions and Android's native accessibility API provide useful regression evidence, but do not establish the quality of the complete spoken experience on hardware.

## Verification

Run the mobile checks from `mobile/`:

```sh
npm run typecheck
npm test
npm run lint
```

The parameter tests cover normalised values and display units, negative ranges, integer and option steps, booleans, bounds, decimal-comma entry, invalid input, and repeated adjustments.

Both local native release builds pass. The mobile suite has 49 passing tests; type checking passes, and lint has no errors (three existing warnings).

Native checks for this change use an iPad Pro 11-inch simulator on iOS 26.5 and an Android API 34 emulator. The iPad accessibility tree exposes parameter values and increment/decrement actions; invoking increment changed Drive from 3.3 to 3.4. The named microphone picker changed 67 Cond to 57 Dynamic through accessibility actions. Numeric entry exposes a modal title, labelled input, and close button, and rejects 99 for a 0–10 range. Android's accessibility service exercised automatic list layout, block movement, parameter adjustment, invalid entry, and exact entry of 4.2. At 200% Android text scale, the test added 122 Rotary through the searchable picker and selected Slow; the native radio states changed to Slow checked and Fast unchecked. The iPad value dialog was also checked at the largest accessibility text category. These are local preview operations, not hardware editing tests.

The Android test service and captured trees are development artifacts under `.codex-artifacts/accessibility/`; the test service is not included in the app. Its adjustable action can return `false` even when the value changes: React Native dispatches the increment event and then returns the superclass result. Verify the resulting value, not that boolean alone.

Before a store accessibility claim, test connection and reconnection, loading and saving a spare preset, snapshots, block management, parameter help and exact entry, inputs and outputs, setlists, matrix readings, and tuner settings using VoiceOver/TalkBack on physical devices. Confirm reading order, spoken feedback, focus after each sheet, large text, and operation with the screen obscured.

The macOS Simulator inspection bridge sometimes retained an earlier role for a recycled view. A test-only UIKit probe confirmed the actual iOS traits: block actions and sheet close controls are buttons, selected block state is present, parameter readouts are adjustable, and named choices report checked/unchecked state. The probe is excluded from the final app.


## Preset creation and Focus View

Empty User slots have an explicit Create preset action. The creation sheet labels the destination and name, supports searching bank labels, announces validation errors, and disables dismissal while creation is in progress.

Focus View offers named tone points, separate adjustable X/Y controls and exact numeric entry. Cabinet mic distance uses quarter-inch steps with two decimal places in the readout and announcements. The touch pad is optional: List layout and screen readers expose the controls without requiring a drag. These additions were checked in the browser component preview; native VoiceOver and TalkBack verification remains part of the next authorized build's device testing.
