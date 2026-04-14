# Stadium Remote

Expo app for connecting to a Helix Stadium over Wi-Fi and editing presets from a phone or tablet.

## Requirements

- Node.js 20+
- Xcode for iOS builds or Android Studio for Android builds
- A Helix Stadium on the same Wi-Fi network with Remote Access enabled

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

## App notes

- Use the host field with either the Bonjour name (`p35x1.local`) or the device IP address.
- The app shares the same underlying protocol path as the desktop editor, but the UI keeps language focused on the device and user actions.
- DSP meters use per-model `usage` values from the modeldefs bundle and a conservative **70 usage** cap per path.
- This project only targets native mobile builds; there is no separate web target to maintain.

## Refresh generated app data

Refresh DSP usage values:

```bash
python3 scripts/update_block_types_usage.py
```

Regenerate the mobile block catalog:

```bash
python3 scripts/generate_mobile_block_types_json.py
```

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
