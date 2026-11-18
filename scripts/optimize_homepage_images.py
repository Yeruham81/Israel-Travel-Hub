#!/usr/bin/env python3
"""One-time loss-controlled homepage image delivery optimization.

Create smaller, non-cropped mobile transfer card photos and a WebP rendition
of the Timna feature. Preserve all original files, captions and slide crops.
The generated images and code are validated before this workflow commits them.
"""
from __future__ import annotations

import io
import json
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
HOME = ROOT / "src/routes/index.tsx"
TEST = ROOT / "src/test/home-mobile-performance.test.ts"
REPORT = ROOT / "docs/HOMEPAGE_IMAGE_DELIVERY_REPORT.json"

TRANSFER_SLUGS = (
    "jerusalem-tower-of-david",
    "tel-aviv-beach-skyline",
    "haifa-bahai-gardens",
    "ein-bokek-aerial",
)


def replace_once(text: str, old: str, new: str) -> str:
    if text.count(old) != 1:
        raise ValueError(f"Expected exactly one original marker: {old[:100]!r}; found {text.count(old)}")
    return text.replace(old, new, 1)


def convert(photo: Path, result: Path, width: int, ratio: float, ceiling: int) -> dict:
    with Image.open(photo) as opened:
        original = ImageOps.exif_transpose(opened).convert("RGB")
    image = original.copy()
    image.thumbnail((width, 10000), Image.Resampling.LANCZOS)
    if image.width < 350:
        raise ValueError(f"Source too small to serve card: {photo}")
    best = None
    for quality in (82, 79, 76, 73, 70, 67, 64, 61):
        output = io.BytesIO()
        image.save(output, format="WEBP", quality=quality, method=6)
        binary = output.getvalue()
        best = (binary, quality)
        if len(binary) <= min(ceiling, round(photo.stat().st_size * ratio)):
            break
    binary, quality = best
    if len(binary) >= photo.stat().st_size or len(binary) > ceiling:
        raise ValueError(f"No meaningful size improvement: {photo}: {len(binary)} / {photo.stat().st_size}")
    result.parent.mkdir(parents=True, exist_ok=True)
    result.write_bytes(binary)
    with Image.open(result) as check:
        if check.format != "WEBP" or check.size != image.size:
            raise ValueError(f"Corrupt output: {result}")
    return {
        "source": str(photo.relative_to(ROOT)),
        "optimized": str(result.relative_to(ROOT)),
        "originalBytes": photo.stat().st_size,
        "optimizedBytes": len(binary),
        "savedBytes": photo.stat().st_size - len(binary),
        "sourceWidth": original.width,
        "optimizedWidth": image.width,
        "quality": quality,
    }


def main() -> None:
    records = []
    for slug in TRANSFER_SLUGS:
        original = ROOT / f"public/images/home/transfer-{slug}.webp"
        optimized = ROOT / f"public/images/home/transfer-{slug}-mobile.webp"
        records.append(convert(original, optimized, 520, .78, 46000))

    original = ROOT / "src/assets/home/timna-park-feature.jpg"
    optimized = ROOT / "src/assets/home/timna-park-feature-optimized.webp"
    records.append(convert(original, optimized, 1000, .75, 118000))

    text = HOME.read_text()
    if "timna-park-feature-optimized.webp" not in text:
        text = replace_once(text,
            'import timnaParkFeature from "@/assets/home/timna-park-feature.jpg";',
            'import timnaParkFeature from "@/assets/home/timna-park-feature-optimized.webp";')
    if "mobile?: string" not in text:
        text = replace_once(text,
            "type Img = { src: string; alt: string; thumb?: string; tile?: string; pos?: string };",
            "type Img = { src: string; alt: string; thumb?: string; tile?: string; mobile?: string; pos?: string };")
    for slug in TRANSFER_SLUGS:
        old = f'img: {{ src: "/images/home/transfer-{slug}.webp", alt:'
        new = f'img: {{ src: "/images/home/transfer-{slug}.webp", mobile: "/images/home/transfer-{slug}-mobile.webp", alt:'
        if new not in text:
            text = replace_once(text, old, new)

    old = '<img src={c.img.src} alt={c.img.alt} loading="lazy" decoding="async" width={720} height={480} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />'
    new = '''<picture className="absolute inset-0 block">
          {c.img.mobile && <source media="(max-width: 767px)" srcSet={c.img.mobile} type="image/webp" />}
          <img src={c.img.src} alt={c.img.alt} loading="lazy" decoding="async" width={720} height={480} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </picture>'''
    if "srcSet={c.img.mobile}" not in text:
        text = replace_once(text, old, new)
    HOME.write_text(text)

    test = TEST.read_text()
    marker = '  it("sets cache rules for static resources without caching HTML or API responses", () => {'
    if 'it("serves smaller transfer pictures on phones without changing desktop photos"' not in test:
        addition = '''  it("serves smaller transfer pictures on phones without changing desktop photos", () => {
    const home = read("src/routes/index.tsx");
    expect(home).toContain('mobile?: string');
    expect(home).toContain('media="(max-width: 767px)" srcSet={c.img.mobile}');
    expect(home).toContain('loading="lazy" decoding="async"');
    for (const slug of ["jerusalem-tower-of-david", "tel-aviv-beach-skyline", "haifa-bahai-gardens", "ein-bokek-aerial"]) {
      const original = `public/images/home/transfer-${slug}.webp`;
      const mobile = `public/images/home/transfer-${slug}-mobile.webp`;
      expect(bytes(mobile), slug).toBeLessThan(bytes(original));
      expect(bytes(mobile), slug).toBeLessThan(46001);
      expect(home).toContain(`/images/home/transfer-${slug}-mobile.webp`);
      expect(home).toContain(`/images/home/transfer-${slug}.webp`);
    }
    const timnaOriginal = bytes("src/assets/home/timna-park-feature.jpg");
    const timnaOptimized = bytes("src/assets/home/timna-park-feature-optimized.webp");
    expect(timnaOptimized).toBeLessThan(timnaOriginal * .75);
    expect(home).toContain('timna-park-feature-optimized.webp');
  });

'''
        test = replace_once(test, marker, addition + marker)
        TEST.write_text(test)

    total_original = sum(row["originalBytes"] for row in records)
    total_optimized = sum(row["optimizedBytes"] for row in records)
    REPORT.parent.mkdir(exist_ok=True)
    REPORT.write_text(json.dumps({
        "scope": "Four near-top airport transfer cards (mobile only) and Timna feature photo (all viewports)",
        "note": "Independent source-file audit; Google PageSpeed result could not be opened by the assistant. Image variants are cropped identically to the originals (no crop changes).",
        "files": records,
        "originalBytesTotal": total_original,
        "optimizedBytesTotal": total_optimized,
        "savedBytesTotal": total_original-total_optimized,
    }, indent=2)+"\n")
    print(f"Optimized {len(records)} photos; asset bytes {total_original} -> {total_optimized}, saved {total_original-total_optimized}")
    for row in records:
        print(f"{row['optimized']}: {row['optimizedBytes']} bytes (saved {row['savedBytes']}), {row['optimizedWidth']} px", flush=True)


if __name__ == "__main__":
    main()
