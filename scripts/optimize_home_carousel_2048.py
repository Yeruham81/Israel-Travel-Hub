#!/usr/bin/env python3
"""Re-cut the homepage carousel from the actual full-resolution Commons originals.

Never enlarge a smaller derivative. The first Jerusalem slide is left byte-for-byte
unchanged; Tel Aviv (owner's only known 1800px original) and Akko (already 2048px)
are preserved. No source originals are replaced or modified.
"""
from __future__ import annotations

import io
import json
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src/assets/home"
HERO = ROOT / "src/components/HomeHero.tsx"
UNIT = ROOT / "src/components/HomeHero.test.ts"
PERF = ROOT / "src/test/home-mobile-performance.test.ts"
CREDITS = ROOT / "docs/HOME_CAROUSEL_PHOTO_CREDITS.md"

# Slide index, slug, *full-resolution original* file name, expected Commons license,
# desktop centering, mobile centering. Indexes match the live 12-slide carousel.
ORIGINALS = [
    (2, "haifa-gardens", "The Hanging Gardens of Haifa, Israel (50099173503) (cropped).jpg", "CC BY 2.0", (.50, .60), (.50, .56)),
    (3, "masada-dead-sea", "Israel-2013-Aerial 18-Masada.jpg", "CC BY-SA 4.0", (.62, .56), (.62, .52)),
    (4, "caesarea-coast", "קיסריה העתיקה.jpg", "CC BY-SA 4.0", (.55, .54), (.55, .52)),
    (5, "jerusalem-jaffa-gate", "חומות העיר העתיקה שער יפו.jpg", "CC BY-SA 4.0", (.30, .56), (.30, .52)),
    (6, "dead-sea-salt", "PikiWiki Israel 37656 Salty sunrise.jpg", "CC BY 2.5", (.52, .54), (.52, .52)),
    (8, "eilat-mountains", "הרי אילת.jpg", "CC BY-SA 4.0", (.44, .51), (.44, .51)),
    (9, "jaffa-port", "PikiWiki Israel 68163 port of jaffa.jpg", "CC BY 2.5", (.50, .51), (.50, .52)),
    (10, "ramon-crater", "CamelHillMitzpeRamonMar262022 03.jpg", "CC BY-SA 4.0", (.42, .51), (.42, .52)),
    (11, "tel-aviv-sarona", "Sarona CBD 01.jpg", "CC BY-SA 4.0", (.53, .52), (.53, .52)),
]

SIZES = {"large": (2048, 1024), "medium": (1600, 800), "mobile": (720, 900)}
FALLBACK_SIZES = {"dead-sea-salt": {"large": (1600, 800), "medium": (1280, 640), "mobile": (720, 900)}}
TARGETS = {"large": 360_000, "medium": 240_000, "mobile": 95_000}
CEILINGS = {"large": 480_000, "medium": 300_000, "mobile": 150_000}
UA = {"User-Agent": "IsraelTravelHubImages/1.0 (original photo credit and optimization)"}


def fetch_bytes(url, limit):
    last = None
    for attempt in range(5):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=85) as response:
                data = response.read(limit + 1)
            if not (100 < len(data) <= limit):
                raise ValueError("Unexpected download size")
            return data
        except Exception as error:
            last = error
            if attempt < 4:
                time.sleep(2 + 2 * attempt)
    raise RuntimeError("Download failed: " + str(last))


def full_resolution(name, expected_license, slug):
    args = urllib.parse.urlencode({
        "action": "query", "format": "json", "formatversion": "2",
        "titles": "File:" + name, "prop": "imageinfo", "iiprop": "url|size|extmetadata",
    })
    url = "https://commons.wikimedia.org/w/api.php?" + args
    data = json.loads(fetch_bytes(url, 1_000_000))
    info = data["query"]["pages"][0]["imageinfo"][0]
    license_name = re.sub(r"<[^>]+>", "", info["extmetadata"]["LicenseShortName"]["value"])
    if license_name != expected_license:
        raise ValueError(f"License mismatch: {name} {license_name} vs {expected_license}")
    if not info["url"].startswith("https://upload.wikimedia.org/"):
        raise ValueError("Unexpected full-resolution source host")
    required = FALLBACK_SIZES.get(slug, SIZES)["large"]
    if info["width"] < required[0] or info["height"] < required[1]:
        raise ValueError(f"Cannot crop {required} without enlargement: {name} {info['width']}x{info['height']}")
    raw = fetch_bytes(info["url"], 40_000_000)
    with Image.open(io.BytesIO(raw)) as image:
        im = ImageOps.exif_transpose(image).convert("RGB")
        im.load()
    if im.width < required[0] or im.height < required[1]:
        raise ValueError(f"Source too small after EXIF transpose: {name} {im.size}")
    print(f"ORIGINAL {name}: {im.width}x{im.height}, {len(raw)} bytes", flush=True)
    return im


def save_webp(photo, slug, variant, center):
    dims = FALLBACK_SIZES.get(slug, SIZES)[variant]
    # Fit is always a *crop + downsample*, never a scale-up.
    if photo.width < dims[0] or photo.height < dims[1]:
        raise ValueError(f"Refusing enlargement: {slug}, {photo.size} -> {dims}")
    im = ImageOps.fit(photo, dims, method=Image.Resampling.LANCZOS, centering=center)
    im = im.filter(ImageFilter.UnsharpMask(radius=.65, percent=42, threshold=3))
    best = None
    for quality in (82, 78, 74, 70, 66, 62, 58, 54, 50, 46):
        buf = io.BytesIO()
        im.save(buf, "WEBP", quality=quality, method=6)
        data = buf.getvalue()
        best = (data, quality)
        if len(data) <= TARGETS[variant]:
            break
    if len(best[0]) > CEILINGS[variant]:
        raise ValueError(f"{slug}/{variant} exceeds quality/size ceiling: {len(best[0])}")
    path = OUT / f"hero-refresh-{slug}-v4-{variant}.webp"
    path.write_bytes(best[0])
    with Image.open(path) as check:
        assert check.format == "WEBP" and check.size == dims
    print(f"OUTPUT {path.name}: {dims}, {len(best[0])} bytes, quality={best[1]}", flush=True)
    return path


def replace_slide_paths(code, index, slug):
    lines = code.splitlines(keepends=True)
    slides = [i for i, line in enumerate(lines) if line.startswith("  { src:")]
    assert len(slides) == 12, len(slides)
    current = lines[slides[index]]
    assert f"caption:" in current and "srcMedium:" in current
    # Require the expected name in each of the three imports referenced by this slide.
    import_lines = []
    for marker in ("src:", "srcSm:", "srcMedium:"):
        match = re.search(r"\b" + marker + r"\s*(\w+)", current)
        assert match, (slug, marker)
        variable = match.group(1)
        matches = [j for j, line in enumerate(lines) if line.startswith(f"import {variable} ")]
        assert len(matches) == 1, (slug, variable)
        import_lines.append((matches[0], variable, "mobile" if marker == "srcSm:" else "medium" if marker == "srcMedium:" else "large"))
    for j, variable, variant in import_lines:
        lines[j] = f'import {variable} from "@/assets/home/hero-refresh-{slug}-v4-{variant}.webp";\n'
    wide, tall = FALLBACK_SIZES.get(slug, SIZES)["large"]
    updated = re.sub(r"width:\s*\d+,\s*height:\s*\d+", f"width: {wide}, height: {tall}", current)
    if updated == current:
        raise ValueError("Cannot find dimension metadata for " + slug)
    if "highDensity: true" not in updated:
        updated = updated.replace(f"height: {tall}", f"height: {tall}, highDensity: true")
    lines[slides[index]] = updated
    return "".join(lines)


def update_code(processed):
    before = HERO.read_text()
    slides = [line for line in before.splitlines() if line.startswith("  { src:")]
    assert len(slides) == 12
    protected = {i: slides[i] for i in (0, 1, 7)}
    code = before
    for index, slug in processed:
        code = replace_slide_paths(code, index, slug)
    after_slides = [line for line in code.splitlines() if line.startswith("  { src:")]
    assert len(after_slides) == 12
    assert all(after_slides[i] == old for i, old in protected.items())
    for index, slug in processed:
        width, height = FALLBACK_SIZES.get(slug, SIZES)["large"]
        assert f"width: {width}, height: {height}" in after_slides[index], slug
    HERO.write_text(code)

    # Preserve all the pre-existing behavioral checks, updating only changed path assertions.
    unit = UNIT.read_text()
    for index, slug in processed:
        original_imports = re.findall(r'hero-refresh-' + re.escape(slug) + r'(?:-v[23])?-(?:large|medium|mobile)\.webp', before)
        for name in set(original_imports):
            variant = name.rsplit("-", 1)[1].split(".")[0]
            unit = unit.replace(name, f"hero-refresh-{slug}-v4-{variant}.webp")
    UNIT.write_text(unit)

    # Replace outdated hard-coded large-file allowances with strict generated-file checks.
    perf = PERF.read_text()
    start = perf.index("    // Earlier panoramic photos remain compact and self-hosted.")
    end = perf.index('    expect(slides).toContain("highDensity: true");', start)
    items = repr([slug for index, slug in processed]).replace("'", '"')
    perf = perf[:start] + f'''    // Full-resolution original crops, not enlarged small derivatives.
    const optimizedSlugs = {items};
    for (const slug of optimizedSlugs) {{
      for (const [variant, budget] of [["large", 480000], ["medium", 300000], ["mobile", 150000]] as const) {{
        const file = `hero-refresh-${{slug}}-v4-${{variant}}.webp`;
        expect(slides).toContain(file);
        expect(bytes(`src/assets/home/${{file}}`)).toBeLessThanOrEqual(budget);
      }}
    }}
''' + perf[end:]
    PERF.write_text(perf)
    return protected


def main():
    successes = []
    failures = []
    for index, slug, name, lic, desktop_center, mobile_center in ORIGINALS:
        try:
            source = full_resolution(name, lic, slug)
            for label in SIZES:
                save_webp(source, slug, label, mobile_center if label == "mobile" else desktop_center)
            successes.append((index, slug))
        except Exception as exc:
            failures.append((slug, str(exc)))
            for label in SIZES:
                (OUT / f"hero-refresh-{slug}-v4-{label}.webp").unlink(missing_ok=True)
            print(f"SKIPPED {slug}: {exc}", flush=True)
    if not successes:
        raise RuntimeError("No source photo could be converted; leaving site unchanged")
    update_code(successes)

    text = CREDITS.read_text()
    text += "\n## 2048px responsive carousel update\n\n"
    text += ("Each processed landscape photo was cropped from its actual original Commons image; "
             "not enlarged from a smaller derivative. Normal WebP variants are 2048×1024 desktop, "
             "1600×800 medium and 720×900 mobile. The Dead Sea sunrise original is only "
             "1600px, so its derivatives are 1600×800, 1280×640 and 720×900, without upscaling. "
             "Jerusalem slide 1 remains completely unchanged; Tel Aviv slide 2 retains its "
             "existing 1800×600px asset pending a usable 1920px source file; Akko "
             "already has a 2048px desktop file and a compact mobile variant.\n\n")
    for _, slug in successes:
        original_width = FALLBACK_SIZES.get(slug, SIZES)["large"][0]
        text += f"- {slug}: {original_width}px crop generated from full-resolution original.\n"
    for slug, reason in failures:
        text += f"- {slug}: unchanged because conversion could not be safely completed ({reason}).\n"
    CREDITS.write_text(text)
    (ROOT / "docs/HOME_CAROUSEL_2048_REPORT.json").write_text(json.dumps({
        "processed": [slug for _, slug in successes],
        "unchanged": {"0": "Jerusalem intentionally preserved", "1": "Tel Aviv current 1800px kept (new 1920px image not accessible as a file)",
                      "7": "Akko already 2048px"},
        "skipped": failures
    }, ensure_ascii=False, indent=2) + "\n")
    print("SUCCESS: processed", len(successes), "skipped", len(failures), flush=True)


if __name__ == "__main__":
    main()
