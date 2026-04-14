# Contributing

Thanks for helping improve the project.

## Setup

Python:

```bash
python3 -m pip install -r requirements-dev.txt
```

Mobile:

```bash
cd mobile
npm install
```

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

If you touched generated model data, regenerate the affected JSON and include the command you used in the PR description.

## Change guidelines

- Prefer small, explicit helpers over large monolithic changes.
- Remove defensive branches only when we understand the real failure mode and have tests covering the intended behavior.
- Add tests when they protect protocol decoding, state transforms, or user-visible behavior. Avoid tests that only restate implementation details.
- Keep user-facing copy focused on actions and outcomes. Avoid protocol jargon in the UI unless it is directly useful for troubleshooting.
- For live device testing, use a spare preset or setlist slot.

## PR notes

Include:

- a short summary of what changed
- commands you ran to verify it
- any hardware assumptions or limitations if the change depends on a live device
