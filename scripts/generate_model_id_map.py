#!/usr/bin/env python3
"""Generate a mapping of all model keys to model IDs and UI names."""
import argparse
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from scripts.generate_helix_model_json import (  # noqa: E402
    DEFAULT_MODELDEFS,
    DEFAULT_UIDEFS,
    load_modeldefs,
    load_uidefs,
)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--modeldefs", default=DEFAULT_MODELDEFS)
    ap.add_argument("--uidefs", default=DEFAULT_UIDEFS)
    ap.add_argument(
        "--out",
        default=str(Path(__file__).resolve().parents[1] / "generated" / "helix-models" / "model_id_map.json"),
    )
    args = ap.parse_args()

    modeldefs = load_modeldefs(args.modeldefs)
    uidefs = load_uidefs(args.uidefs)

    models = []
    for key, info in modeldefs.items():
        ui = uidefs.get(key, {})
        models.append(
            {
                "key": key,
                "id": info.get("id"),
                "name": ui.get("name"),
                "class": ui.get("class"),
                "category": info.get("category"),
                "stereo_model": ui.get("stereo_model"),
                "dsp": ui.get("dsp"),
            }
        )

    missing = [key for key in uidefs.keys() if key not in modeldefs]
    if missing:
        for key in sorted(missing):
            ui = uidefs.get(key, {})
            models.append(
                {
                    "key": key,
                    "id": None,
                    "name": ui.get("name"),
                    "class": ui.get("class"),
                    "category": None,
                    "stereo_model": ui.get("stereo_model"),
                    "dsp": ui.get("dsp"),
                }
            )

    models.sort(key=lambda m: (m.get("name") or "", m.get("key") or ""))

    payload = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "count": len(models),
        "models": models,
    }

    out_path = Path(args.out)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(payload, indent=2, sort_keys=True), encoding="utf-8")


if __name__ == "__main__":
    main()
