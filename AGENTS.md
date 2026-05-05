# Repository Guidelines

## Project Structure & Module Organization

- `scripts/` contains all tooling (pcap parsing, protocol clients, model extraction, control utilities).
  - Key scripts: `osc_pcap_dump.py`, `osc_session.py`, `helix_control.py`, `generate_helix_model_json.py`.
- `docs/` holds protocol documentation (see `docs/TECHNICAL_DETAILS.md`).
- `generated/` contains output JSON model catalogues (amps/effects/cabs).
- `README.md` is the primary overview and usage entry point.

## Build, Test, and Development Commands

There is no build system. Use Python scripts directly.

- Install runtime dependency:
  ```bash
  python3 -m pip install msgpack
  ```
- Decode a capture:
  ```bash
  python3 scripts/osc_pcap_dump.py --reassemble /tmp/helix-stadium.pcap
  ```
- Capture network traffic (must edit in the macOS editor app):
  ```bash
  sudo tcpdump -i en0 -s 0 -U -w /tmp/helix-stadium.pcap tcp port 2001 or tcp port 2002
  sudo chown "$USER" /tmp/helix-stadium.pcap
  ```
- Control the device (ZMTP handshake included):
  ```bash
  python3 scripts/helix_control.py --host p35x1.local snapshot-name --index 0 --name "Dwayne!"
  ```
- Regenerate model JSON:
  ```bash
  python3 scripts/generate_helix_model_json.py
  ```

## Coding Style & Naming Conventions

- Python scripts use 4‑space indentation and standard library where possible.
- Keep filenames snake_case (e.g., `osc_pcap_dump.py`).
- JSON output is human‑readable and stable; avoid reordering keys without need.
- Prefer small, explicit helper functions over large monolithic scripts.

## User-Facing Copy

- Keep app copy focused on user actions and outcomes.
- Do not expose protocol names, transport layers, port numbers, handshakes, raw event logs, internal IDs, or other implementation details in end-user UI unless they are directly needed for troubleshooting.
- Prefer plain language such as `device name`, `IP address`, `Wi-Fi`, and `Remote Access`.

## Testing Guidelines

- Run unit tests with:
  ```bash
  python3 -m unittest discover -s tests
  ```
- Validate protocol changes by running `scripts/osc_pcap_dump.py --reassemble` on a capture.
- For device interactions, test against a spare preset before live usage.
- If a capture file is ~24 bytes, no packets were recorded; re‑capture and ensure edits are made in the editor app.

## Commit & Pull Request Guidelines

- Use short, descriptive commit messages (e.g., `docs: add protocol details`).
- PRs should include a brief summary, affected files, and any commands run for verification.

## Security & Configuration Tips

- Ensure the Helix Stadium is on the same network as your machine.
- Remote Access must be enabled on the device for control commands to work.
- Use a spare preset while experimenting to avoid accidental live changes.


## Anti-AI-design tropes (banned when decorative)

The tell isn't the shape, it's the function. Pills, chips, badges and cards are part of a real product UI. Codex slop slathers them on as decoration. Use them when they do real work; do not use them when they do not. If this project has a `DESIGN.md` (or equivalent design spec) that opts in to one of these on purpose, the spec wins; otherwise these defaults stand.

### Always banned (no exceptions)
- Inter, Roboto, Geist, Space Grotesk, Plus Jakarta Sans, DM Sans as the default sans. Pick something with character.
- Purple gradients, indigo gradients, blue-to-pink gradients, "VibeCode" purples, any non-photo gradient as background.
- Glassmorphism, frosted glass cards, backdrop blur on translucent panels.
- All-caps section labels with letter-spacing 0.25em–0.4em.
- Three identical icon-topped feature cards in a row.
- Numbered `01 02 03` workflow strips. Stat banner rows (`100+ x • 30+ y • 4 z`).
- Stacked primary CTAs (more than one filled action competing for the same surface).
- Centred long-form headlines.
- Gradient hero backgrounds with radial colour blobs.
- Emojis in navigation, section labels or headings.

### Banned when decorative, fine when functional
- Pill eyebrow tag above a heading (`• PRODUCT TAGLINE`) — banned. A filter chip or rating badge — fine.
- `MVP` / `NEW` / `BETA` badge in a card corner — banned. An award badge tied to a real status — fine.
- Coloured top or left border on a card as decoration — banned. A 1px border around a real card surface — fine.
- Cards with border radius greater than 16px + drop shadow at rest — banned. Cards with ~12px radius and a subtle shadow on hover — fine.

The test before adding any pill, chip, badge or card: if you removed it, would the user lose the ability to do something or understand something concrete? If yes, keep it. If no, delete it.

### Copy tells (always banned)
- Em dashes anywhere in copy. Use a comma, a full stop, or open the sentence.
- Scare quotes anywhere. If a phrase needs hedging, rewrite it.
- American spelling. We write in Australian English: `optimised`, `colour`, `centre`, `behaviour`, `recognise`, `enrol`.
- Hype words: `revolutionary`, `seamless`, `unleash`, `delight`, `magic`, `effortless`, `elevate`, `curated`, `journey`, `ecosystem`.
- Sentences that begin with `In today's world`, `In a world where`, `Imagine`, `It's no secret that`.
- Empty bridging phrases: `As we navigate`, `Whether you're A or B`, `In the realm of`.

### What we use instead
- Whitespace, scale and 1px hairlines for separation, before reaching for borders, cards or shadows.
- Type-led hierarchy. Italic or weight contrast carries display emphasis.
- One primary action per surface, maximum.
- Real photography over stock illustration. No AI-generated photography.
- A small, intentional palette with one accent, not a rainbow of semantic colours.
- Functional chrome (filter chips that filter, rating dots that rate, awards that mark a real status).

### When in doubt
If this project has a `DESIGN.md`, it overrides these defaults. If it does not, these defaults stand. Do not introduce a new font, colour, component variant or motion rule without writing it down somewhere a future agent will read it.
