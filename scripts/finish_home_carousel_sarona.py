#!/usr/bin/env python3
"""Finish the one original-resolution carousel conversion deferred by a Wikimedia 429."""
from __future__ import annotations
import json
import re
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from scripts.optimize_home_carousel_2048 import (
    ORIGINALS, full_resolution, save_webp, SIZES, HERO, PERF, CREDITS, ROOT,
    replace_slide_paths,
)

def main():
    index, slug, filename, licence, desktop_center, mobile_center = next(
        item for item in ORIGINALS if item[1] == "tel-aviv-sarona"
    )
    image = full_resolution(filename, licence, slug)
    for kind in SIZES:
        save_webp(image, slug, kind, mobile_center if kind == "mobile" else desktop_center)

    code = HERO.read_text(encoding="utf-8")
    slide_line = next(x for x in code.splitlines() if 'caption: "Tel Aviv’s modern skyline"' in x)
    assert "width: 1680, height: 840" in slide_line
    code = replace_slide_paths(code, index, slug)
    assert "width: 2048, height: 1024" in code
    HERO.write_text(code, encoding="utf-8")

    perf = PERF.read_text(encoding="utf-8")
    pattern = r'(const optimizedSlugs = \[[^\n]*?)(\];)'
    assert re.search(pattern, perf), "Optimized slug array changed"
    perf = re.sub(pattern, lambda m: m.group(1) + ', "tel-aviv-sarona"' + m.group(2), perf, count=1)
    PERF.write_text(perf, encoding="utf-8")

    credits = CREDITS.read_text(encoding="utf-8")
    credits += "\n- tel-aviv-sarona: 2048px original photo crop, 1600px medium and compact 720px mobile. Generated from the verified 5472px Wikimedia Commons photograph.\n"
    CREDITS.write_text(credits, encoding="utf-8")

    report = ROOT / "docs/HOME_CAROUSEL_2048_REPORT.json"
    data = json.loads(report.read_text(encoding="utf-8"))
    assert "tel-aviv-sarona" not in data["processed"]
    data["processed"].append("tel-aviv-sarona")
    data["skipped"] = [entry for entry in data["skipped"] if entry[0] != "tel-aviv-sarona"]
    report.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print("SUCCESS Sarona 2048px from original, verified", flush=True)

if __name__ == "__main__":
    main()
