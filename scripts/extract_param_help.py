#!/usr/bin/env python3
"""Extract parameter help text from the Helix Stadium desktop editor.

The desktop app ships per-model parameter descriptions at
`Helix Stadium.app/Contents/Resources/meta-data/parameter-meta/<category>/en/*.json`.
Each file looks like:

    {
        "category": "modulation",
        "model_id": 406,
        "display_name": "4-Voice Chorus",
        "parameters-en": {
            "Rate": "Controls the speed of the chorus' LFO...",
            ...
        }
    }

We collapse the catalogue into a single JSON file the mobile app can ship,
keyed by model_id (the same numeric id we receive over the wire).
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

DEFAULT_SOURCE = Path(
    "/Applications/Line6/Helix Stadium.app/Contents/Resources/meta-data/parameter-meta"
)
DEFAULT_OUTPUT = Path(__file__).resolve().parent.parent / "mobile" / "src" / "data" / "paramHelp.json"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--source",
        type=Path,
        default=DEFAULT_SOURCE,
        help=f"Root parameter-meta directory (default: {DEFAULT_SOURCE})",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=DEFAULT_OUTPUT,
        help=f"Output JSON path (default: {DEFAULT_OUTPUT})",
    )
    return parser.parse_args()


def collect_param_help(source: Path) -> dict[str, dict]:
    if not source.is_dir():
        raise FileNotFoundError(
            f"parameter-meta directory not found at {source}. Is the desktop editor installed?"
        )

    catalogue: dict[str, dict] = {}
    for category_dir in sorted(source.iterdir()):
        if not category_dir.is_dir():
            continue
        en_dir = category_dir / "en"
        if not en_dir.is_dir():
            continue
        for json_path in sorted(en_dir.glob("*.json")):
            try:
                payload = json.loads(json_path.read_text(encoding="utf-8"))
            except json.JSONDecodeError as exc:
                print(f"  ! skipping {json_path.name}: {exc}", file=sys.stderr)
                continue
            model_id = payload.get("model_id")
            if not isinstance(model_id, int):
                continue
            params_raw = payload.get("parameters-en") or {}
            params = {
                key: value.strip()
                for key, value in params_raw.items()
                if isinstance(value, str) and value.strip()
            }
            if not params:
                continue
            catalogue[str(model_id)] = {
                "category": payload.get("category"),
                "name": payload.get("display_name"),
                "params": params,
            }
    return catalogue


def main() -> int:
    args = parse_args()
    catalogue = collect_param_help(args.source)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(catalogue, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote {len(catalogue)} models to {args.output}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
