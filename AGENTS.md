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

## Testing Guidelines

- Run unit tests with:
  ```bash
  python3 -m unittest discover -s tests
  ```
- Validate protocol changes by running `scripts/osc_pcap_dump.py --reassemble` on a capture.
- For device interactions, test against a spare preset before live usage.
- If a capture file is ~24 bytes, no packets were recorded; re‑capture and ensure edits are made in the editor app.

## Commit & Pull Request Guidelines

- This repository does not include git history, so no existing commit style can be inferred.
- If you introduce commits, use short, descriptive messages (e.g., `docs: add protocol details`).
- PRs should include a brief summary, affected files, and any commands run for verification.

## Security & Configuration Tips

- Ensure the Helix Stadium is on the same network as your machine.
- Remote Access must be enabled on the device for control commands to work.
- Use a spare preset while experimenting to avoid accidental live changes.
