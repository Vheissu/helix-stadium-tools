# Stadium XL Mobile Prototype

Expo (custom dev client) prototype for controlling the Helix Stadium XL over Wi-Fi (TCP ports 2001/2002).

## Setup

```bash
cd mobile
npm install
```

## Build a custom dev client

iOS:
```bash
npx expo run:ios
```

Android:
```bash
npx expo run:android
```

Then start the dev server:
```bash
npx expo start --dev-client
```

## Notes

- Ensure your phone and the Stadium XL are on the same network.
- Use the host field (e.g. `p35x1.local` or the device IP).
- The app uses ZMTP + OSC on TCP 2001/2002 (same protocol as the desktop editor).
- DSP usage meters are based on modeldefs `usage` values and a conservative cap of **70** per path.
- If modeldefs change, refresh usage data with:
  ```bash
  python3 scripts/update_block_types_usage.py
  ```
- To regenerate the full mobile block catalog, including amp/cab/fx parameter metadata, run:
  ```bash
  python3 scripts/generate_mobile_block_types_json.py
  ```

## Prototype features

- Browse preset containers on the device (`Factory`, `User`, and `Setlists`)
- Filter presets by name, slot, or content id inside the mobile library view
- Recall presets from the mobile app using content ids or container positions
- Rename the active preset and the selected setlist from the mobile preset tab
- Add user or factory presets into a selected setlist from the mobile preset tab
- Reorder setlist entries from the mobile preset tab with explicit up/down controls
- Remove setlist entries from the mobile preset tab
- Save the current active preset back to its backing content slot
- Switch active snapshots from the preset tab with live device names and colors
- Rename the active snapshot from the preset tab
- Copy one snapshot over another and inspect the active snapshot's raw target ids
- Send snapshot color changes using the same named colors shown in the desktop app
- Copy Path 1 to Path 2 or Path 2 to Path 1 and overwrite the target path's standard IO/effect slots
- Toggle Notes panel open/close
- Update preset notes text (property `preset.meta.info`)
- Toggle auto-cab (`global.modelselect.addcabblock`)
- Grid-based signal flow editor (1A/1B/2A/2B, 12 slots each)
- Tap a slot to choose block type, then select a model to insert
- Long-press a populated block to edit its parameters, replace the model, or clear it
- DSP-aware picker that greys out models exceeding the 70‑per‑path cap
- Split/join routing nodes are not duplicated by path copy yet, so complex parallel-path routing still needs manual cleanup after a paste
