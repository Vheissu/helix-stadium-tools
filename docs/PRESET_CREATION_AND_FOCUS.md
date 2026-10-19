# Preset creation and Focus View

Implemented and tested against a Helix Stadium on 19 October 2026. Paid builds and store submissions remain on hold; local Simulator builds are used for testing.

## Creating a preset

In User Presets, tap an empty slot or **New preset**. Enter a name, choose an empty destination by its bank label, and select **Create and open preset**. The slot picker supports searching labels such as `44D`.

The app refreshes the User library before allocating content. Occupied slots, invalid names, unreadable state and unsaved edits stop creation. Snapshot names, colours and validity are compared with saved content as well: snapshot renames can leave the device's edited flag clear. If the user changes presets or edits the current preset during creation, the new preset remains saved in its destination and the app leaves the current selection alone.

The device operation is:

1. `/CreateContent ,iiiib [commandId, -2, position, 2, attrs]`. The attrs blob is a MessagePack map with **string** keys: `blck`, `colr`, `dvcp`, `flow`, and `name`.
2. The reply is `/status [commandId, allocatedContentId, result]`. A positive allocated id occupies the field normally used for a zero status code. Treating it as an ordinary status reply incorrectly reports failure.
3. Read the allocated reference and verify its id, User container, position, type and name.
4. Write the blank preset body with `/SetContentData`, then read it back and compare the bytes.
5. Load the new preset only while the previous selection is still unchanged and clean, then confirm the active id.

The blank body preserves the native `_sbepgsm` header, integer map keys and numeric types. It contains two empty flows with their input/output blocks, an initial snapshot, and no effect blocks, controller assignments, notes or user assets. Library attrs and preset bodies have different key encodings; converting the body to string keys is not equivalent.

A timeout or partial write does not trigger another allocation or an automatic deletion. The error identifies the destination to inspect. This avoids duplicate records or deleting content after an ambiguous reply.

## Focus controls

A supported block's editor now has **Parameters** and **Focus View** tabs. Focus is also available in Offline preview.

- 670 models have the factory's five named tone points directly on a photographic touch surface. Tap a name to select its exact tone, or move over the surface to blend. X/Y controls are available under **Adjust precisely**. The current tone is preserved until the first adjustment. **Restore starting tone** restores the parameter values read when the view opened.
- Interpolated cabinets have mic position and distance on the pad, plus mic selection, angle, filters and level controls. Distance uses quarter-inch steps and displays two decimal places.
- EQ models without an X/Y definition show their band levels and parameter controls. Clone models expose their gain and tone controls. The band display represents the control values; it is not a measured response or live spectrum analyzer.
- List layout provides named tone buttons and adjustable controls without requiring a drag. Values can also be entered directly. The pad is hidden when a screen reader is active or the system text scale exceeds 130%. The Focus header and tabs reflow into the scrollable content at large text sizes.

Parameter batches are checked against the active preset, snapshot and model before writing. Discrete controls are sent before continuous values, so settings such as tempo sync are applied before their associated time values. Updates are queued, and the latest requested values are retained while a batch is running. The app reads the values back before confirming a batch. A changed identity, missing parameter, rejected write or mismatched readback stops the adjustment.

The live tests exposed an extra integer tag in the acknowledged boolean-parameter path. Direct and acknowledged parameter writes now share the same command builder, with regression coverage for the correct packet shape.

### Factory mapping and arithmetic

The data comes from the extracted 1.4 filesystem's `opt/factory-defaults/focus-view-xy-defaults`, matched to the installed 1.4 model definitions and mobile catalogue. Native parameter ids, types and ranges are retained, including parameters omitted from the ordinary editor layout. Parameters marked `exclude` in a Focus definition are not changed.

Regenerate the data with:

```sh
python3 scripts/generate_mobile_focus_data.py \
  --source generated/firmware/release-1.4-research/rootfs/opt/factory-defaults/focus-view-xy-defaults
```

The touchscreen's arithmetic routine at `0xf2d320` divides the pad into four triangles. Each blends the centre with the two points on one outside edge. Coordinates are rounded to hundredths; interpolation preserves the firmware's float32 rotations. Quantized parameters take the value from the strongest point, including its tie behavior. Integer and boolean interpolation retain their native output types.

The source binary SHA-256 is `6b40fadccd0c23b05ee6eb4b95f7d8356eace1687ce678f5528f423e2b2ac5be`. An isolated local ARM64 arithmetic harness produced the 60 fixtures in `mobile/src/utils/fixtures/focus-native.json`. An additional 2,646 grid comparisons matched that routine, including continuous, integer, boolean and quantized cases.

Three factory points for the legacy Dig w/Mod delay contain time values below the model's declared minimum. The app clamps the computed result to the declared range; it does not reproduce those out-of-range writes.

## Verification

The actual mobile protocol client ran on the Mac with a Node TCP adapter, connecting to the Stadium over Wi-Fi. This exercised the app's creation, Focus and save code without a native rebuild.

- Created a blank preset through the final app implementation, verified its stored bytes, loaded it, added an amp, adjusted Focus, saved, switched away and back, and checked the values again.
- Verified occupied-slot rejection without altering the existing preset. Verified that parameter edits and snapshot-only edits both prevent creation from discarding unsaved work.
- Checked 18 Focus adjustments and 158 expected values across 2204 Mod, Brit 2203MV, 60s Bias Trem, Dig w/Mod, 1x10 US Princess and 10 Band Graphic. All six models passed save/reload checks. A final creation round trip checked another 12 amp values.
- Confirmed that a stale Focus target is rejected after changing to another preset.
- Removed four temporary test records. The User library then matched its original contents exactly. The user's `HELYON Save Test` at `44C` retained its original stored bytes, remained selected, and had no unsaved edits.

Local backups, device readbacks and harnesses are under `.codex-artifacts/preset-focus/`. `application-stream.pcap` records the final test's forwarded application bytes with synthetic IP/TCP headers; it is not a raw network packet capture. It was decoded successfully with `python3 scripts/osc_pcap_dump.py --reassemble`, including the creation, parameter and save requests, with no device error responses.

The mobile unit suite, type checking, lint and the generator's Python tests cover the code. Browser component checks exercised phone-width layouts, the creation form, slot search, busy and error states, the pad, microphone selection and accessible quarter-inch distance controls. A subsequent free local iOS simulator pass connected to the real Stadium over Wi-Fi. It created `HELYON Simulator QA` in 128D, added 2204 Mod, applied Focus pad positions and Solo Tone, saved through the UI, and verified all 12 parameters after switching away and back. Clone controls share the tested parameter path; no new clone was trained or loaded during these tests.

A short responsiveness check with both event listeners active measured complete amp batches at 153, 465, 3,799 and 526 ms, including identity checks and final readback. The UI coalesces pending movements, but confirmation latency over Wi-Fi can vary. The native-device pass should assess how continuous dragging feels. This check made unsaved edits in `44C`, then reloaded its unchanged saved contents and confirmed a clean state.


### Native simulator gesture limit

The automation's drag and scroll attempts acted as taps in both Focus View and ordinary song lists. Native pad taps, named tones, preset creation and saving were verified. Continuous finger dragging and its feel still need a real touch-device check. Focus now uses page coordinates anchored at gesture start and applies the release position, coalescing repeated positions so a tap does not send the same batch twice.

The simulator follow-up's final pad tap at normalized X 0.49 / Y 0.45 matched all 12 expected 2204 Mod values exactly. Its temporary preset was removed after testing. The User library matched the baseline, 44C's stored bytes were unchanged, and 44C was restored with no unsaved edits.

### Original Focus artwork

The mobile Focus surface uses three original, locally bundled equipment backgrounds: pedal, amplifier and cabinet. These are generic illustrations, not pictures of the named models. No desktop artwork was copied or supplied as image-generation reference material. The files and exact built-in image-generation prompts are in `mobile/assets/focus/`. Labels, selection rings, grid lines and category colours are rendered by native components.

The compact Focus header keeps the block name, back action and bypass control together. Model replacement and removal remain in the Parameters tab. The current tone is preserved on entry, and the existing identity checks, interpolation, write queue and confirmed readback still apply.

The redesign was checked in a free local iOS Simulator build connected to the real Stadium. Big Time Vibe, Wide and Lush, a custom pad position (X -0.50 / Y -0.49), and Restore starting tone each matched all 11 expected 70s Chorus parameters. Browser checks covered 320-point and wide layouts plus the amplifier and cabinet backgrounds. The largest iOS accessibility text size used the list controls with the heading and tabs inside the scrollable content. The temporary chorus was discarded; 44C retained its original saved bytes and ended clean. Screenshots and readbacks are under `.codex-artifacts/focus-redesign/`. Continuous finger dragging still needs the touch-device check described above.
