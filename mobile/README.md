# Stadium Remote

Expo app for connecting to a Helix Stadium over USB or Wi-Fi and editing presets from a phone or tablet.

## Unofficial community project

Stadium Remote is a fan-made app. It is **not** an official Line 6 or Yamaha
product, and is not affiliated with or endorsed by Line 6, Yamaha Guitar
Group, or Yamaha Corporation. "Helix", "Helix Stadium", "Line 6", and
"Yamaha" are trademarks of their respective owners; they are referenced
here only for identification and interoperability. See the
[project disclaimer](../README.md#this-is-an-unofficial-community-project)
for the full notice.

## Requirements

- Node.js 20+
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

- Use the host field with either the Bonjour name (`p35x1.local`) or the device IP address.
- Automatic mode lets the operating system select USB or Wi-Fi. USB mode asks
  Android to prefer its wired Ethernet route; Apple platforms select the route
  for the device address automatically.
- Direct phone support depends on the phone acting as USB host. USB-C iPhones
  support USB Ethernet; Android support varies by device and firmware. Physical
  phone testing is still required before treating either platform as universal.
- The app shares the same underlying protocol path as the desktop editor, but the UI keeps language focused on the device and user actions.
- DSP meters and block-picker availability use conservative estimates from the extracted model metadata, and are intended to stay within the same practical limits as the device/editor. When Auto-cab is enabled, amp insertion checks also include the linked cab usage.
- This project only targets native mobile builds; there is no separate web target to maintain.

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
- View and edit signal-flow blocks across 1A, 1B, 2A, and 2B
- Insert, replace, bypass, reorder, and clear blocks
- Edit block parameters and I/O parameters
- Copy one signal path onto another, including realized split/join routing nodes
- Toggle and edit preset notes
- Toggle auto-cab and transport-related global settings
- Open and close the tuner remotely, while leaving live tuning feedback on the device display

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
