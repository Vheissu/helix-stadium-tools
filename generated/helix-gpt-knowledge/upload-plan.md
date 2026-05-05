# Upload plan

Upload the files in `upload-ready/` as the Custom GPT knowledge set.

This pack is intentionally kept to a small number of text-forward Markdown files so retrieval stays focused and the upload set remains compatible with stricter per-GPT file-count limits.

Upload-ready file count: 8

## Files

- `upload-ready/guitar-amps-and-preamps-0-9-to-d.md`: 70 models, about 219 KB
- `upload-ready/guitar-amps-and-preamps-d-to-m.md`: 69 models, about 218 KB
- `upload-ready/guitar-amps-and-preamps-m-to-w.md`: 70 models, about 223 KB
- `upload-ready/bass-amps-and-preamps.md`: 40 models, about 119 KB
- `upload-ready/all-cabs-and-irs.md`: 48 models, about 149 KB
- `upload-ready/effects-drive-dynamics-eq-filter-utility.md`: 155 models, about 148 KB
- `upload-ready/effects-delay-and-reverb.md`: 76 models, about 134 KB
- `upload-ready/effects-modulation-pitch-synth-wah.md`: 94 models, about 119 KB

## Minimal fallback upload set

If the GPT builder keeps failing to save, try the smaller pack in `minimal-upload-ready/` first.

- `minimal-upload-ready/amps-and-preamps-0-9-to-f.md`: 127 models, about 388 KB
- `minimal-upload-ready/amps-and-preamps-g-to-w.md`: 122 models, about 388 KB
- `minimal-upload-ready/cabs-and-irs.md`: 48 models, about 149 KB
- `minimal-upload-ready/all-effects.md`: 325 models, about 399 KB

## Do not upload

- `custom-gpt-instructions.md`: paste this into the GPT Instructions field instead.
- `model-index.md`: supporting lookup document for humans.
- `README.md`: supporting notes for this folder.
