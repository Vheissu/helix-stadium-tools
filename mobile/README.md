# HELYON

Expo app for connecting to a Helix Stadium over USB or Wi-Fi and editing presets from a phone or tablet.

## Unofficial community project

HELYON is an independent app. It is **not** an official Line 6 or Yamaha
product, and is not affiliated with or endorsed by Line 6, Yamaha Guitar
Group, or Yamaha Corporation. "Helix", "Helix Stadium", "Line 6", and
"Yamaha" are trademarks of their respective owners; they are referenced
here only for identification and interoperability. See the
[project disclaimer](../README.md#this-is-an-unofficial-community-project)
for the full notice.

## Requirements

- Node.js 26 (see `.nvmrc`); Expo SDK 58 also supports recent Node 22/24 releases
- Xcode for iOS builds or Android Studio for Android builds
- A Helix Stadium with firmware 1.4 or later for USB editing, or a device on the
  same Wi-Fi network, with Remote Access enabled

## Setup

```bash
cd mobile
npm install
```

## Development commands

Typecheck:

```bash
npm run typecheck
```

Run the focused unit tests:

```bash
npm test
```

Build and launch the custom dev client:

```bash
npm run ios
# or
npm run android
```

Start the Expo dev server:

```bash
npx expo start --dev-client
```

## Sideload builds

Prebuilt sideload artefacts are published on the project
[Releases page](https://github.com/Vheissu/helix-stadium-tools/releases). Each
build ships with a matching `.sha256` file; verify it before installing.

Android build command used for the current APK:

```bash
CI=1 npx expo prebuild --platform android
ANDROID_HOME="$HOME/Library/Android/sdk" \
ANDROID_SDK_ROOT="$HOME/Library/Android/sdk" \
JAVA_HOME="$(/usr/libexec/java_home -v 21)" \
  ./android/gradlew -p android assembleRelease
```

The Android APK is debug-key signed by the generated native project, so it is
fine for sideload testing but is not a Play Store release build.

iOS sideloading requires signing on the installer's machine or a valid Apple
Development provisioning profile for `com.beggars.stadium-remote`. The checked
in IPA is unsigned, so tools such as Xcode, Apple Configurator, or a sideloading
tool must sign it before a device will install it.

## App notes

- The connection screen finds Stadiums advertised on your local network. Choose
  a device, then tap Connect. Search again refreshes the list; manual device name
  or IP address entry remains available if your network blocks discovery.
- Use the host field with either the Bonjour name (`p35x1.local`) or the device IP address for Wi-Fi and Apple-platform connections.
- On Android, select USB to use direct USB-host access and allow the Android
  USB permission prompt. The plugged-in Stadium is found without an address.
  This path does not require Android to provision an Ethernet network.
- Automatic mode leaves route selection to the operating system. Select USB
  explicitly on Android to use the direct transport. Apple platforms select
  the route for the entered device address automatically.
- Direct phone support depends on the phone acting as USB host. USB-C iPhones
  support USB Ethernet; Android support varies by device and firmware. Physical
  phone testing is still required before treating either platform as universal.
- The app shares the same underlying protocol path as the desktop editor, but the UI keeps language focused on the device and user actions.
- DSP meters and block-picker availability use conservative estimates from the extracted model metadata, and are intended to stay within the same practical limits as the device/editor. When Auto-cab is enabled, amp insertion checks also include the linked cab usage.
- Advanced settings includes an **Extended DSP budget** option. It is off by
  default, requires confirmation, and resets on disconnect. It raises the app's
  per-path estimate from 66 to 82, keeps the normal meter warning, and does not
  remove device validation or increase processing power. Use a spare preset.
- Help, privacy information, third-party notices, and an offline block-editing
  preview are available before connecting. The preview does not produce audio
  or simulate the device's library, routing, snapshots, or save operations.
- This project only targets native mobile builds; there is no separate web target to maintain.

## Store builds

The app is linked to [@beggars/helyon on Expo](https://expo.dev/accounts/beggars/projects/helyon).
EAS builds run from this directory. The root `.easignore` includes only the
mobile app and excludes local native projects, research files, and credentials.

```bash
nvm use
npm ci
npm run licenses:generate
npm run typecheck
npm test
npm run lint
npm run build:stores
```

The production profile builds an Android App Bundle and a signed iOS app.
Version numbers are managed remotely by EAS. iOS signing uses Apple team
`D88WFBKGJD`; submission targets App Store Connect app `6824149078`.
Android retains `com.beggars.stadiumremote`, and iOS retains
`com.beggars.stadium-remote` so existing installs keep their identities.

After choosing and testing the intended build:

```bash
npm run submit:ios
npm run submit:android
```

iOS submission uploads to App Store Connect/TestFlight. Android submission is
configured for a draft internal-test release. Package registration, the first
Play Console upload, and the Google Play service account are configured. The
service account can release to HELYON's testing tracks and has no production
or account-wide access. These commands do not publish a public release.

As of 19 October 2026:

- **Android 1.0.0 (7):** published to [internal testing](https://play.google.com/apps/internaltest/4701590729869450330), including the redesigned Focus View, preset creation and Showcase song uploads. The closed Alpha track remains on build 5.
- **iOS 1.0.0 (3):** submitted for external testing and now **Testing** in the existing Testers group of 26 people.
- **iOS 1.0.0 (2):** remains **Testing** alongside build 3 in the same external group. It was not expired or removed.

See [the release record](../docs/RELEASE_2026_10_19.md) for build IDs, verification and the Android dependency fix.

Store descriptions, privacy declarations, age ratings, free pricing, artwork
and screenshots are saved. Apple remains an unsubmitted public-release draft.
Google has published the owner's closed-test listing and policy submission;
production access is still unavailable.
The hardware demonstration video is linked in Apple review notes. Complete the
physical-device test matrix before public release. Google also requires a closed test
with at least 12 opted-in testers for 14 continuous days before this account
can apply for production access; internal testing does not meet that requirement.

The store name is **HELYON for Helix Stadium**, with **Unofficial mobile editor**
as the Apple subtitle to fit its 30-character limit. The full line, “Unofficial
mobile editor for the Helix Stadium”, is used in the app and store description.
Keep the app free under the confirmed permission for Stadium category icons.

The app uses the HELYON square icon on iOS, with a separately padded Android
adaptive icon and a monochrome version for themed home screens. The native
splash shows the emblem on the app's dark background until its bundled fonts
and first frame are ready. There is no artificial launch delay. Editable
artwork and export notes are in [`assets/brand`](assets/brand/README.md).

Store copy and remaining release requirements are in
[`store/app-store.en-AU.json`](store/app-store.en-AU.json). The live
[privacy policy](https://ilikekillnerds.com/helyon/privacy/) and
[support page](https://ilikekillnerds.com/helyon/support/) are hosted on
ilikekillnerds.com without analytics on those two pages.

### Dependency and verification notes

Expo SDK 58 uses React Native 0.88 and React 19.3.0. React and TypeScript stay on
the versions supported by the installed Expo/tooling combination rather than
forcing incompatible newer releases. AsyncStorage 3.1.1 is an intentional
exception to Expo's suggested 2.x version; both native release builds compile.
Expo Doctor reports one remaining React Native Directory warning because
`react-native-tcp-socket` is not marked as tested with the New Architecture.
This still needs physical-device validation.

The dependency audit on 18 October 2026 reports 25 transitive advisories
(17 high, 8 moderate, none critical), primarily in the Expo/Metro build
toolchain. Do not use `npm audit fix --force`: its suggested resolution
downgrades Expo to an unsupported old SDK. Review patched upstream releases
before public submission.

Earlier store-build verification covered 43 unit tests, TypeScript, production JS exports,
an Android release build, an iOS simulator release build, and the offline
preview flow. ESLint has three existing hook-dependency warnings and no errors.
The repository's 386 Python tests also pass. Signed EAS builds succeed on both
platforms; the Google Play submission credential was checked against the API
and the active internal release, without changing any published release.
The owner reports working Android Wi-Fi and iOS USB-C connections. On a
Galaxy S25 Ultra running Android 16, build 4 no longer crashed but could not
connect over USB. The direct USB transport requires a new physical test;
complete the remaining phone/tablet and connection combinations before public release.
The Android USB crash was reproduced in an API 34 release build and fixed in
the pinned TCP socket dependency. Five native regression tests pass, including
IPv4/IPv6 connections, and five repeated USB attempts without a wired network
show guidance without terminating the app. See [`patches/README.md`](patches/README.md)
for the patch and native test command. The subsequent direct USB transport
has 11 Java tests and a packet-level IPv6/TCP test covering two connections,
10 KB transfers, reconnect, and dropped-packet recovery with sanitizers.
See [`modules/stadium-usb`](modules/stadium-usb/README.md). These tests do not
verify physical phone/USB compatibility.

Record the phone, OS, Stadium firmware, cable/adapter, connection/reconnection,
block edits, snapshots, and save/reload results. The owner supplied a [USB-C hardware demonstration](https://www.youtube.com/watch?v=pFTHOyUoGXY),
which is linked in the Apple review notes and plays without signing in. The
video does not replace the device and connection test matrix above.

## Refresh generated app data

Regenerate the app data from the installed Helix Stadium editor:

```bash
cd ..
python3 scripts/generate_model_id_map.py
python3 scripts/generate_io_models_json.py
python3 scripts/generate_mobile_block_types_json.py
python3 scripts/add_missing_mobile_models.py
python3 scripts/generate_mobile_models_json.py
python3 scripts/extract_param_help.py
```

The importer reads each stereo model's own parameter IDs, defaults, and DSP
estimate. Only its display labels come from the mono model when the desktop
app shares those definitions. IO definitions without desktop display metadata
are excluded from the picker.

See [the 1.4 catalogue update](../docs/APP_1_4_CATALOG_UPDATE.md) for the models
and import corrections verified against the public desktop release.

## Current feature set

- Browse factory presets, user presets, and setlists from the device
- Recall presets by content id or container position
- Rename presets, setlists, and snapshots
- Copy snapshots and set snapshot colors
- Save the active preset back to its source slot
- Create a named blank preset in an empty User slot, with bank-label search and occupied-slot protection
- View and edit signal-flow blocks across 1A, 1B, 2A, and 2B
- Insert, replace, bypass, reorder, and clear blocks
- Edit block parameters and I/O parameters
- Use Focus View with 670 factory tone maps, named points, accessible X/Y controls, cabinet mic placement, and EQ/clone tone controls
- Copy one signal path onto another, including realized split/join routing nodes
- Toggle and edit preset notes
- Toggle auto-cab and transport-related global settings
- Open and close the tuner remotely, while leaving live tuning feedback on the device display

The current release passed 98 mobile tests, TypeScript checking, local Android and iOS release builds, and live Stadium creation, parameter readback and save/reload checks. Focus was checked in the Simulator and installed locally on an iPad. The changes are included in Android build 7 and iOS build 3. See [preset creation and Focus verification](../docs/PRESET_CREATION_AND_FOCUS.md).

## Firmware 1.4 support

The catalogue is regenerated from public desktop app 1.4.0.20 and includes
Brit SL100, Prosecutor, Omega Granophyre, and the six new effects. USB mode
uses the device's USB Ethernet connection; physical Android/iOS cable support
still needs testing on each phone.

The protocol client adds `getExpressionPedalPosition(index)`,
`getLibraryContent(library, sku?)`, and an optional `sku` argument to
`getContainerContents`. Existing calls keep their original wire format.
Pedal readings preserve the raw position and detail values.

IR and clone import/delete notifications appear as activity in the device
status area. The client also supplies a typed `libraryOperation` event with
the complete payload. Counter meanings are not assumed, and an end event
is not presented as proof that every file succeeded.

See [the 1.4 support notes](../docs/FIRMWARE_1_4_SUPPORT.md) for validation
and remaining work.


## Accessibility

VoiceOver and TalkBack automatically enable a list layout with named block actions and adjustable parameters. You can also choose **Accessibility → List layout** on the connection screen, in Settings, or in offline preview. The setting is saved locally. Numeric entry, named option selection, block movement, preset actions, and snapshot options are available without dragging or long-pressing.

See [accessibility support and verification](../docs/ACCESSIBILITY.md) for tested behaviour and the remaining physical-device usability checks. Tuner Remote controls settings; it cannot announce live pitch readings.


## Showcase songs

Open **Library → Showcase** to upload prepared backing tracks, select songs and control playback on the Stadium. Uploads accept 1–8 WAV tracks at 48 kHz/16-bit PCM, up to 13 minutes each, with a microSD card inserted. Stem separation is a separate server feature. See [Showcase setup and verification](../docs/SHOWCASE.md), including the ignored local credential setup and the required configuration for a future release build.

Use a local simulator build for device-connected UI testing when possible. `npx expo run:ios --configuration Release` builds with local Xcode and does not use EAS build credits. The simulator uses the Mac's network connection and can reach the Stadium over Wi-Fi.
