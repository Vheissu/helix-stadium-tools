# Helix Stadium Tools

[![codecov](https://codecov.io/gh/Vheissu/helix-stadium-tools/branch/main/graph/badge.svg)](https://codecov.io/gh/Vheissu/helix-stadium-tools)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Python tooling and an Expo-based mobile companion for exploring the Helix
Stadium editor protocol, controlling a device over Wi-Fi, and working with
structured model metadata.

## This is an unofficial community project

This repository is a fan-made, community-run project. It is **not** an official
product. It is **not affiliated with, endorsed by, or associated with** Line 6,
Yamaha Guitar Group, Yamaha Corporation, or any of their subsidiaries.

It exists because I own a Helix Stadium, love the device, and really wanted a
mobile app to drive it from a phone. So I built one, and shared the tooling
that came out of working on it.

"Helix", "Helix Stadium", "Line 6", "Yamaha", and any related names, logos,
and product designs are trademarks or registered trademarks of their
respective owners. They are referenced here solely for identification and
interoperability. No affiliation or endorsement is implied or intended.

No source code, firmware, or proprietary assets from the Helix editor app
or the device firmware are included in this repository. Everything here is
either independently written or generated from data on a Helix Stadium that
the user already owns and is licensed to use.

If anyone at Line 6 or Yamaha would prefer something here be removed,
renamed, or clarified, please open an issue and I will be happy to work
with you.

The repo includes generated JSON data, so the macOS editor app is not required
for normal development, running the mobile app, reading the docs, or using the
checked-in catalogues. The app bundle is only needed when regenerating data
from a newer desktop app install, or when decoding a capture with local
`modeldefs`.

## Contents

- [What's in this repo](#whats-in-this-repo)
- [Quick start](#quick-start)
- [Mobile app downloads](#mobile-app-downloads)
- [Library example](#library-example)
- [Testing](#testing)
- [Documentation](#documentation)
- [Notes and caution](#notes-and-caution)

## What's in this repo

- `helix/` — reusable Python client pieces: discovery, ZMTP, OSC, edit-buffer
  helpers, and the session API.
- `scripts/` — CLI entry points for capture analysis, device control, and data
  extraction.
- `generated/helix-models/` — JSON catalogues used by downstream tools.
- `generated/helix-gpt-knowledge/` — Markdown, PDF, and upload-plan files for
  AI/project knowledge use.
- `mobile/` — Expo mobile app for connecting to a Helix Stadium over Wi-Fi.
- `mobile/src/data/` — checked-in JSON data used by the mobile app.
- `docs/` — protocol and transport notes, and the full CLI reference.

## Quick start

Python tools:

```bash
python3 -m pip install -r requirements-dev.txt
python3 -m unittest discover -s tests
python3 scripts/helix_control.py discover
```

Mobile app:

```bash
cd mobile
npm install
npm run typecheck
npm test
npm run ios
```

### Requirements

- Python 3.10+ recommended
- `msgpack` (required for modeldefs parsing)
- Standard library for everything else
- Node.js 20+ for the Expo app

## Mobile app downloads

Prebuilt mobile artefacts are published with each tagged release. See the
latest binaries on the [Releases page](https://github.com/Vheissu/helix-stadium-tools/releases).

- Android APK is debug-key signed for sideload testing; it is not a Play Store
  release build.
- iOS IPA is unsigned and must be signed with a valid Apple account,
  provisioning profile, or sideloading tool before installing.

Each artefact ships with a matching `.sha256` checksum file. Verify it before
installing.

## Library example

```python
from helix import HelixSession

with HelixSession(
    None,  # auto-discover via Bonjour
    timeout=5.0,
    retries=2,
    retry_delay=0.1,
    discover_timeout=5.0,
    raise_on_timeout=True,
) as session:
    info = session.get_product_info()
    print(info)
    session.set_snapshot_name(0, "Verse A")
    update = session.recv_update(timeout=1.0)
    print(update)
```

## Testing

Python:

```bash
python3 -m unittest discover -s tests
```

Python with coverage:

```bash
python3 -m coverage run -m unittest discover -s tests
python3 -m coverage report -m
python3 -m coverage xml
```

Mobile:

```bash
cd mobile
npm run typecheck
npm test
```

## Documentation

- [docs/CLI_REFERENCE.md](docs/CLI_REFERENCE.md) — per-script reference and
  worked examples for every tool in `scripts/`.
- [docs/TECHNICAL_DETAILS.md](docs/TECHNICAL_DETAILS.md) — observed editor
  protocol: ZMTP framing, OSC payloads, snapshot and preset operations,
  Matrix Mixer, content library, and more.
- [docs/USB_TRANSPORT_NOTES.md](docs/USB_TRANSPORT_NOTES.md) — current
  findings on USB-C and Bluetooth transport surfaces.
- [mobile/README.md](mobile/README.md) — app-specific setup, commands, and
  feature notes.
- [CONTRIBUTING.md](CONTRIBUTING.md) — contributor workflow and review
  expectations.

### Protocol at a glance

Helix Stadium XL editor traffic uses OSC over TCP on two ports, both wrapped
in a ZeroMQ ZMTP 3.0 handshake and framing layer:

- **Port 2001**: device to editor (SUB/ROUTER). OSC payloads carry a 12-byte
  envelope (version, sequence, length).
- **Port 2002**: editor to device (DEALER/ROUTER). OSC payloads are raw.

See [docs/TECHNICAL_DETAILS.md](docs/TECHNICAL_DETAILS.md) for handshake
details, frame layouts, and the full OSC address catalogue.

## Contributor notes

- Use a spare preset when testing live write operations against hardware.
- Keep end-user copy focused on actions and outcomes; avoid exposing protocol
  internals in the UI unless they help with troubleshooting.
- Prefer focused tests around protocol decoding, state transforms, and
  user-facing helpers over coverage-padding tests.
- See [CONTRIBUTING.md](CONTRIBUTING.md) for the full workflow.

## Notes and caution

- This repository is for research and automation. Ensure your usage complies
  with the Line 6 EULA and local law.
- The protocol details here are observational and may change with firmware or
  editor updates.
- Do not use these tools to bypass limits enforced by the editor or device.
  If a command appears to accept an out-of-range edit, treat that as a
  validation issue rather than supported behaviour.

## Contact

For questions, issues, or contributions, please open an issue or pull request on the GitHub repository. You can also reach me via email at [dwaynecharrington@gmail.com](mailto:dwaynecharrington@gmail.com).

## Licence

Released under the [MIT License](LICENSE).
