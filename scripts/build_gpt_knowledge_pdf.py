#!/usr/bin/env python3
"""Build a single searchable PDF from the generated Helix GPT knowledge pack."""

import argparse
import textwrap
import unicodedata
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_INPUT_DIR = ROOT / "generated" / "helix-gpt-knowledge" / "upload-ready"
DEFAULT_OUTPUT = ROOT / "generated" / "helix-gpt-knowledge" / "helix-stadium-custom-gpt-knowledge.pdf"

PAGE_WIDTH = 612
PAGE_HEIGHT = 792
MARGIN_X = 48
MARGIN_Y = 48
FONT_NAME = "courier"
FONT_SIZE = 10
LINE_HEIGHT = 12
WRAP_WIDTH = 92
LINES_PER_PAGE = int((PAGE_HEIGHT - (MARGIN_Y * 2)) / LINE_HEIGHT)


def ascii_safe(text: str) -> str:
    replacements = {
        "\u2018": "'",
        "\u2019": "'",
        "\u201c": '"',
        "\u201d": '"',
        "\u2013": "-",
        "\u2014": "-",
        "\u2022": "-",
        "\u2026": "...",
        "\u00a0": " ",
    }
    for src, target in replacements.items():
        text = text.replace(src, target)
    return unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")


def wrap_markdown_text(text: str) -> list[str]:
    wrapped_lines = []
    for raw_line in ascii_safe(text).splitlines():
        line = raw_line.rstrip()
        if not line:
            wrapped_lines.append("")
            continue
        indent = len(line) - len(line.lstrip(" "))
        prefix = " " * indent
        content = line[indent:]
        chunks = textwrap.wrap(
            content,
            width=max(20, WRAP_WIDTH - indent),
            break_long_words=False,
            break_on_hyphens=False,
            replace_whitespace=False,
            drop_whitespace=False,
        )
        if not chunks:
            wrapped_lines.append(prefix)
            continue
        wrapped_lines.extend(prefix + chunk for chunk in chunks)
    return wrapped_lines


def build_bundle_text(input_dir: Path) -> str:
    files = sorted(input_dir.glob("*.md"))
    if not files:
        raise FileNotFoundError(f"No Markdown files found in {input_dir}")

    generated_at = datetime.now(timezone.utc).isoformat()
    parts = [
        "# Helix Stadium Custom GPT Knowledge",
        "",
        "Single-file PDF export for GPT Builder upload testing.",
        f"Generated on {generated_at}.",
        "",
    ]

    for path in files:
        parts.extend(
            [
                f"# Source file: {path.name}",
                "",
                path.read_text(encoding="utf-8").strip(),
                "",
                "",
            ]
        )

    return "\n".join(parts).strip() + "\n"


def paginate_lines(lines: list[str]) -> list[list[str]]:
    pages = []
    for start in range(0, len(lines), LINES_PER_PAGE):
        pages.append(lines[start : start + LINES_PER_PAGE])
    return pages


def write_pdf(lines: list[str], output_path: Path) -> None:
    import fitz

    doc = fitz.open()
    for page_lines in paginate_lines(lines):
        page = doc.new_page(width=PAGE_WIDTH, height=PAGE_HEIGHT)
        y = MARGIN_Y
        for line in page_lines:
            page.insert_text(
                fitz.Point(MARGIN_X, y),
                line,
                fontname=FONT_NAME,
                fontsize=FONT_SIZE,
            )
            y += LINE_HEIGHT
    output_path.parent.mkdir(parents=True, exist_ok=True)
    doc.save(output_path)
    doc.close()


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input-dir", default=str(DEFAULT_INPUT_DIR))
    parser.add_argument("--output", default=str(DEFAULT_OUTPUT))
    return parser.parse_args()


def main():
    args = parse_args()
    input_dir = Path(args.input_dir)
    output_path = Path(args.output)
    bundle_text = build_bundle_text(input_dir)
    lines = wrap_markdown_text(bundle_text)
    write_pdf(lines, output_path)
    print(f"Wrote {output_path}")


if __name__ == "__main__":
    main()
