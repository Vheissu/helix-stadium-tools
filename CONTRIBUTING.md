# Contributing

Thanks for taking the time to look at this project. It is a small,
unofficial community effort, and contributions from people who love their
Helix and want to help are very welcome.

By participating you agree to abide by the
[Code of Conduct](CODE_OF_CONDUCT.md).

## Ways to contribute

You do not need a Helix Stadium, or even a Helix at all, to help here:

- **Improve docs.** Typos, clarifications, better examples, or rewrites of
  sections that read awkwardly are always welcome.
- **Bug reports.** Even without a fix attached, a clear repro is gold.
- **Feature suggestions and ideas.** Open a Discussion first if you want to
  talk shape; open an issue if you have a concrete request.
- **Code.** Fixes, small features, refactors, or test coverage.
- **Captures.** PCAPs of less-tested editor flows (with snapshots /
  scribble strips / matrix mixer / preset save), de-identified, help fill
  gaps in the protocol notes.
- **Mobile app polish.** UI improvements, accessibility, localisation,
  Android-specific fixes, edge cases on tablets.
- **Help triage.** Reproduce bug reports, ask clarifying questions, link
  related issues.

If you are not sure where to start, look for issues labelled
[`good first issue`](https://github.com/Vheissu/helix-stadium-tools/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
or [`help wanted`](https://github.com/Vheissu/helix-stadium-tools/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22).

## Before you start something large

Open a [Discussion](https://github.com/Vheissu/helix-stadium-tools/discussions)
or an issue first if you are planning anything bigger than a small fix. It
saves you and me time. For protocol or architecture-level proposals, file an
RFC issue using the template.

## Getting set up

Python:

```bash
python3 -m pip install -r requirements-dev.txt
```

Mobile:

```bash
cd mobile
npm install
```

See the [README](README.md) for the full quick start.

## Before opening a PR

Run the Python test suite:

```bash
python3 -m unittest discover -s tests
```

Run the mobile checks:

```bash
cd mobile
npm run typecheck
npm test
```

If you touched generated model data, regenerate the affected JSON and
include the command you used in the PR description.

## Change guidelines

- Prefer small, explicit helpers over large monolithic changes.
- Remove defensive branches only when the real failure mode is understood and
  tests cover the intended behaviour.
- Add tests when they protect protocol decoding, state transforms, or
  user-visible behaviour. Avoid tests that only restate implementation
  details.
- Keep user-facing copy focused on actions and outcomes. Avoid protocol
  jargon in the UI unless it is directly useful for troubleshooting.
- Do not add settings or code paths that bypass DSP, model-count, or routing
  limits enforced by the editor or device. Treat accepted out-of-range
  commands as validation bugs, not supported behaviour.
- When documenting DSP-related behaviour, describe values as
  metadata-derived estimates. Avoid implying hidden or unlockable headroom.
- For live device testing, use a spare preset or setlist slot.
- Do not include code, firmware, or proprietary assets from the Helix editor
  app, the device firmware, or any other third-party source. Generated
  artefacts must be reproducible from a Helix Stadium the contributor owns.

## Hardware testing

A lot of this project depends on a live Helix Stadium. If you cannot test
on hardware, that is fine. Say so in the PR and one of us with a device
will help validate before merge. Tests, docs, and refactors that do not
require a device can be merged without a live test.

If you do have a device:

- Use a spare preset slot or setlist position. Do not test against your
  live performance presets.
- Ensure the device is on the same Wi-Fi network and Remote Access is
  enabled.
- Mention the firmware and editor versions you tested against in the PR
  body.

## Coding style

- Python: 4-space indentation, standard library where reasonable, snake_case
  filenames. Prefer small, named helpers over long inline blocks.
- TypeScript / React Native: keep components small, prefer hooks, avoid
  introducing new state stores unless there is a clear reason.
- JSON output is human-readable and stable. Do not reorder keys without a
  reason.
- Australian English in prose where convenient (colour, behaviour,
  optimised), but do not rename existing CLI flags or JSON keys to chase
  spelling consistency.

## Commits and PR notes

- Use short, descriptive commit messages. Conventional Commits style is
  encouraged (`fix(scripts): ...`, `docs(readme): ...`, `feat(mobile): ...`).
- A PR should include:
  - a short summary of what changed and why
  - the commands you ran to verify it (test output, manual steps)
  - any hardware or firmware assumptions if the change depends on a live
    device
  - screenshots or short clips for mobile UI changes

## Scope and project expectations

This is an unofficial, spare-time project. Reviews and replies may take a
little while. Some things are out of scope, including:

- Reverse-engineering or redistributing Line 6 or Yamaha firmware,
  installers, modeldefs, or proprietary asset files.
- Workarounds that bypass DSP, model-count, or routing limits enforced by
  the device or editor.
- Bundling capture files that contain identifying information (Wi-Fi
  details, account names, custom preset titles you would not want public).

If something is unclear, or if you are not sure whether your idea fits,
open a Discussion and ask. There are no silly questions.
