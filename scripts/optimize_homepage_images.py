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
        records.append(convert(original, optimized, 420, .70, 32000))

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

    # PSI mobile audit: the six tours use full desktop photographs, while the
    # airport transfer tiles already have mobile variants. Create derivatives
    # without modifying the source/crop, including the bundled Bethlehem image.
    tour_sources = (
        "public/images/attractions/jerusalem.webp",
        "public/images/attractions/tel-aviv-jaffa.webp",
        "public/images/tours/masada-ruins.webp",
        "src/assets/guides/2026-10/jerusalem-to-bethlehem.webp",
        "public/images/attractions/sea-of-galilee.webp",
        "public/images/attractions/haifa-coast.webp",
    )
    for relative in tour_sources:
        photo = ROOT / relative
        optimized = photo.with_name(photo.stem + "-mobile.webp")
        records.append(convert(photo, optimized, 480, .88, 44000))
        if relative.startswith("public/"):
            src = "/" + relative.removeprefix("public/")
            mobile = "/" + str(optimized.relative_to(ROOT)).removeprefix("public/")
            old = f'img: {{ src: "{src}", alt:'
            new = f'img: {{ src: "{src}", mobile: "{mobile}", alt:'
            if new not in text:
                text = replace_once(text, old, new)

    # Existing desktop assets remain intact. For smaller-screen editorial
    # feature photos, choose an explicitly sized image using <picture>.
    feature_specs = (
        (
            "src/assets/home/guided-tour-feature.webp",
            "src/assets/home/guided-tour-feature-mobile.webp",
            640, 47000,
        ),
        (
            "src/assets/airport-transfers/airport.webp",
            "src/assets/airport-transfers/airport-mobile.webp",
            640, 31000,
        ),
        (
            "src/assets/home/hero-jerusalem-sm-optimized.webp",
            "src/assets/home/hero-jerusalem-psi-mobile.webp",
            720, 96000,
        ),
    )
    for original_name, optimized_name, width, limit in feature_specs:
        records.append(convert(ROOT / original_name, ROOT / optimized_name, width, .94, limit))

    tour_import = 'import bethlehemTourPhoto from "@/assets/guides/2026-10/jerusalem-to-bethlehem.webp";'
    mobile_tour_import = 'import bethlehemTourPhotoMobile from "@/assets/guides/2026-10/jerusalem-to-bethlehem-mobile.webp";'
    if mobile_tour_import not in text:
        text = replace_once(text, tour_import, tour_import + "\n" + mobile_tour_import)
    if 'img: { src: bethlehemTourPhoto, mobile: bethlehemTourPhotoMobile, alt:' not in text:
        text = replace_once(text,
            'img: { src: bethlehemTourPhoto, alt:',
            'img: { src: bethlehemTourPhoto, mobile: bethlehemTourPhotoMobile, alt:')

    for original_import, mobile_import in (
        ('import guidedTour from "@/assets/home/guided-tour-feature.webp";',
         'import guidedTourMobile from "@/assets/home/guided-tour-feature-mobile.webp";'),
        ('import benGurionApronPhoto from "@/assets/airport-transfers/airport.webp";',
         'import benGurionApronPhotoMobile from "@/assets/airport-transfers/airport-mobile.webp";'),
    ):
        if mobile_import not in text:
            text = replace_once(text, original_import, original_import + "\n" + mobile_import)
    if 'feature: { src: guidedTour, mobile: guidedTourMobile, alt:' not in text:
        text = replace_once(text, 'feature: { src: guidedTour, alt:',
                                 'feature: { src: guidedTour, mobile: guidedTourMobile, alt:')
    if 'feature: { src: benGurionApronPhoto, mobile: benGurionApronPhotoMobile, alt:' not in text:
        text = replace_once(text, 'feature: { src: benGurionApronPhoto, alt:',
                                 'feature: { src: benGurionApronPhoto, mobile: benGurionApronPhotoMobile, alt:')

    # Same image elements and object-cover positioning; only the source
    # selection changes on phones. This preserves the approved card crops.
    tour_img = '<img src={c.img.thumb ?? c.img.src} alt={c.img.alt} loading="lazy" decoding="async" width={400} height={300} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />'
    tour_picture = """<picture className="block">
        {c.img.mobile && <source media="(max-width: 767px)" srcSet={c.img.mobile} type="image/webp" />}
        <img src={c.img.thumb ?? c.img.src} alt={c.img.alt} loading="lazy" decoding="async" width={400} height={300} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </picture>"""
    if tour_picture not in text:
        text = replace_once(text, tour_img, tour_picture)

    for original_tag in (
        '<img src={s.feature.src} alt={s.feature.alt} loading="lazy" decoding="async" width={1400} height={880} className="aspect-[16/9] max-h-[260px] w-full min-w-0 rounded-xl object-cover lg:aspect-auto lg:h-full lg:max-h-none" />',
        '<img src={s.feature.src} alt={s.feature.alt} loading="lazy" decoding="async" width={900} height={560} className="aspect-[16/9] max-h-[320px] w-full min-w-0 rounded-xl object-cover lg:aspect-auto lg:h-full lg:max-h-none" />',
    ):
        new_tag = ('<picture className="block h-full min-w-0">'
                   '{s.feature.mobile && <source media="(max-width: 767px)" srcSet={s.feature.mobile} type="image/webp" />}'
                   + original_tag + '</picture>')
        if new_tag not in text:
            text = replace_once(text, original_tag, new_tag)

    # Update both the LCP preload and carousel to the SAME mobile asset.
    old_hero = 'hero-jerusalem-sm-optimized.webp'
    new_hero = 'hero-jerusalem-psi-mobile.webp'
    if new_hero not in text:
        text = replace_once(text, old_hero, new_hero)
    hero_component = ROOT / "src/components/HomeHero.tsx"
    hero_source = hero_component.read_text()
    if new_hero not in hero_source:
        hero_source = replace_once(hero_source, old_hero, new_hero)
        hero_component.write_text(hero_source)

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


    # Preserve static assertions that the preloaded first slide matches the
    # rendered carousel asset, and cover new PSI-specific mobile files.
    marker_psi = '  it("sets cache rules for static resources without caching HTML or API responses", () => {'
    if 'it("uses right-sized mobile tour, feature and LCP images"' not in test:
        snippet = '''  it("uses right-sized mobile tour, feature and LCP images", () => {
    const homepage = read("src/routes/index.tsx");
    const hero = read("src/components/HomeHero.tsx");
    expect(homepage).toContain('<picture className="block">');
    expect(homepage).toContain('width={400} height={300}');
    expect(homepage).toContain('media="(max-width: 767px)" srcSet={c.img.mobile}');
    expect(homepage).toContain('s.feature.mobile && <source');
    for (const path of [
      "public/images/attractions/jerusalem",
      "public/images/attractions/tel-aviv-jaffa",
      "public/images/tours/masada-ruins",
      "public/images/attractions/sea-of-galilee",
      "public/images/attractions/haifa-coast",
      "src/assets/guides/2026-10/jerusalem-to-bethlehem",
    ]) {
      const source = path + ".webp";
      const mobile = path + "-mobile.webp";
      expect(bytes(mobile), mobile).toBeLessThan(bytes(source));
      expect(bytes(mobile), mobile).toBeLessThan(44001);
    }
    for (const name of [
      "src/assets/home/guided-tour-feature-mobile.webp",
      "src/assets/airport-transfers/airport-mobile.webp",
      "src/assets/home/hero-jerusalem-psi-mobile.webp",
    ]) {
      expect(bytes(name), name).toBeGreaterThan(5000);
    }
    expect(bytes("src/assets/home/guided-tour-feature-mobile.webp")).toBeLessThan(bytes("src/assets/home/guided-tour-feature.webp"));
    expect(bytes("src/assets/airport-transfers/airport-mobile.webp")).toBeLessThan(bytes("src/assets/airport-transfers/airport.webp"));
    expect(bytes("src/assets/home/hero-jerusalem-psi-mobile.webp")).toBeLessThan(bytes("src/assets/home/hero-jerusalem-sm-optimized.webp"));
    expect(hero).toContain("hero-jerusalem-psi-mobile.webp");
    expect(homepage).toContain("hero-jerusalem-psi-mobile.webp");
    expect(homepage).toContain("bethlehemTourPhotoMobile");
    expect(homepage).toContain("guidedTourMobile");
    expect(homepage).toContain("benGurionApronPhotoMobile");
  });

'''
        test = replace_once(test, marker_psi, snippet + marker_psi)
    test = test.replace('expect(slides).toContain("hero-jerusalem-sm-optimized.webp");',
                        'expect(slides).toContain("hero-jerusalem-psi-mobile.webp");')
    # Update the legacy baseline assertion to include the new mobile variant.
    test = test.replace(
        "expect(home).toContain('feature: { src: benGurionApronPhoto, alt:');",
        "expect(home).toContain('feature: { src: benGurionApronPhoto, mobile: benGurionApronPhotoMobile, alt:');"
    )
    TEST.write_text(test)

    total_original = sum(row["originalBytes"] for row in records)
    total_optimized = sum(row["optimizedBytes"] for row in records)
    REPORT.parent.mkdir(exist_ok=True)
    REPORT.write_text(json.dumps({
        "scope": "PSI mobile follow-up: six tour tiles, two editorial features and LCP mobile hero; includes existing transfer cards and Timna optimization",
        "note": "Based on supplied PSI screenshots; full desktop photos remain untouched. WebP mobile variants retain the original aspect ratio, content and crop.",
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
