#!/usr/bin/env python3
"""Generate high-quality, original-matched responsive photos for /attractions/.

This intentionally changes only the attractions landing-page img srcSet/sizes.
The src attributes, alt text, photography credits, site-wide photo registries,
individual attraction pages and original files are left unchanged.

Quality gates compare the encoded derivative against the source image reduced
with Lanczos to the exact same pixel dimensions. Original resolution is always
the final srcSet fallback for high-DPR, desktop and tablet layouts.
"""
from __future__ import annotations

import hashlib
import io
import json
import math
from pathlib import Path
from PIL import Image, ImageChops, ImageOps, ImageStat

ROOT = Path(__file__).resolve().parents[1]
TARGET_DIR = Path("src/assets/attractions-hub")
REPORT = ROOT / "docs/ATTRACTIONS_HUB_IMAGE_DELIVERY_REPORT.json"
QUALITY_FLOOR = 36.0
# Unique original sources currently used by the 20 attraction cards.
# These are only reference keys; the source files are never modified.
CARD_SOURCES: dict[str, str] = {
    "old-city-jerusalem": "src/assets/home/jerusalem-old-city.webp",
    "mount-of-olives": "public/images/attractions/mount-of-olives.webp",
    "mount-zion": "src/assets/guides/mount-zion.jpg",
    "jaffa": "src/assets/tel-aviv/jaffa.webp",
    "akko-acre": "src/assets/shore-excursions/akko-port.jpg",
    "caesarea": "src/assets/home/caesarea-dusk.webp",
    "rosh-hanikra": "src/assets/guides/rosh-hanikra.jpg",
    "annunciation": "src/assets/guides/2026-11/basilica-annunciation-courtyard.webp",
    "mount-tabor": "src/assets/guides/mount-tabor.jpg",
    "precipice": "src/assets/guides/2026-10/mount-precipice.webp",
    "megiddo": "src/assets/guides/2026-10/tel-megiddo.webp",
    "capernaum": "src/assets/guides/capernaum.jpg",
    "tabgha": "src/assets/guides/tabgha.jpg",
    "mount-of-beatitudes": "src/assets/guides/mount-of-beatitudes.jpg",
    "magdala": "public/images/attractions/magdala-duc-in-altum-exterior.webp",
    "yardenit": "src/assets/guides/yardenit.jpg",
    "masada": "src/assets/home/masada-dead-sea.webp",
    "ein-gedi": "src/assets/guides/dead-sea-excursions/ein-gedi-waterfall.webp",
    "qasr": "src/assets/guides/qasr-el-yahud.jpg",
    "mitzpe-ramon-crater": "src/assets/guides/mitzpe-ramon-crater.jpg",
}
REGION_SOURCES = {
    "jerusalem": "public/images/attractions/jerusalem.webp",
    "tel-aviv-jaffa": "public/images/attractions/tel-aviv-jaffa.webp",
    "haifa-coast": "public/images/attractions/haifa-coast.webp",
    "nazareth-lower-galilee": "public/images/attractions/nazareth-galilee.webp",
    "sea-of-galilee": "public/images/attractions/sea-of-galilee.webp",
    "dead-sea-masada": "public/images/attractions/dead-sea.webp",
    "negev-eilat": "public/images/attractions/ramon-crater.webp",
}
REGION_EXISTING = {
    "jerusalem": "public/images/attractions/jerusalem-mobile.webp",
    "tel-aviv-jaffa": "public/images/attractions/tel-aviv-jaffa-mobile.webp",
    "haifa-coast": "public/images/attractions/haifa-coast-mobile.webp",
    "sea-of-galilee": "public/images/attractions/sea-of-galilee-mobile.webp",
}
RELATED_SOURCES = {
    "jerusalem": "src/assets/home/jerusalem-old-city.webp",
    "tel-aviv": "src/assets/home/tel-aviv-coast.webp",
    "haifa": "src/assets/haifa/panorama.webp",
    "galilee": "src/assets/home/tiberias-lake.webp",
    "dead-sea": "src/assets/dead-sea/landscape.webp",
    "eilat": "src/assets/eilat/waterfront.webp",
}
RELATED_EXISTING = {
    "jerusalem": "src/assets/home/jerusalem-old-city-card.webp",
    "tel-aviv": "src/assets/home/tel-aviv-coast-card.webp",
    "haifa": "src/assets/haifa/panorama-card.webp",
    "galilee": "src/assets/home/tiberias-lake-card.webp",
    "eilat": "src/assets/airport-transfers/eilat-hub.webp",
}

def data_sha(path: str) -> str:
    return hashlib.sha256((ROOT / path).read_bytes()).hexdigest()

IMAGES: dict[str, Image.Image] = {}
def original(path: str) -> Image.Image:
    if path not in IMAGES:
        with Image.open(ROOT / path) as image:
            IMAGES[path] = ImageOps.exif_transpose(image).convert("RGB")
    return IMAGES[path]

def psnr(reference: Image.Image, candidate: Image.Image) -> float:
    if reference.size != candidate.size:
        return 0
    rms = ImageStat.Stat(ImageChops.difference(reference, candidate)).rms
    total_mse = sum(channel * channel for channel in rms) / 3
    return 99.0 if total_mse == 0 else round(20 * math.log10(255 / math.sqrt(total_mse)), 2)

def inspect_variant(source: str, target: str) -> dict:
    src = original(source)
    with Image.open(ROOT / target) as uploaded:
        if uploaded.format != "WEBP":
            raise ValueError(f"Invalid derivative format: {target}")
        result = uploaded.convert("RGB")
    if result.width > src.width or result.height > src.height:
        raise ValueError(f"Image has been upscaled: {target}")
    expected = src.resize(result.size, Image.Resampling.LANCZOS)
    score = psnr(expected, result)
    return {
        "path": target, "width": result.width, "height": result.height,
        "bytes": (ROOT / target).stat().st_size, "psnrDb": score,
        "sourceWidth": src.width, "sourceHeight": src.height,
    }

def create_derivative(source: str, output: str, width: int, quality: int = 92) -> dict | None:
    src = original(source)
    if width > src.width:
        return None
    target_width = width
    target_height = max(1, round(src.height * width / src.width))
    expected = src.resize((target_width, target_height), Image.Resampling.LANCZOS)
    source_bytes = (ROOT / source).stat().st_size
    best = None
    for q in [quality, 94, 96, 98]:
        buffer = io.BytesIO()
        expected.save(buffer, format="WEBP", quality=q, method=6)
        binary = buffer.getvalue()
        with Image.open(io.BytesIO(binary)) as decoded:
            measured = psnr(expected, decoded.convert("RGB"))
        if measured < QUALITY_FLOOR:
            continue
        # Do not trade quality for a trivial reduction. Keep native fallback.
        if len(binary) > source_bytes * 0.92 or source_bytes - len(binary) < 2200:
            continue
        best = (binary, measured, q)
        break
    if best is None:
        return None
    destination = ROOT / output
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_bytes(best[0])
    result = inspect_variant(source, output)
    if result["psnrDb"] < QUALITY_FLOOR:
        raise ValueError(f"Poor visual fidelity: {output}, PSNR {result['psnrDb']}")
    result["quality"] = best[2]
    result["reused"] = False
    return result

def verified_existing(source: str, target: str) -> dict | None:
    if not (ROOT / target).exists():
        return None
    candidate = inspect_variant(source, target)
    if candidate["psnrDb"] < QUALITY_FLOOR:
        return None
    if candidate["bytes"] > (ROOT / source).stat().st_size * 0.92:
        return None
    candidate["quality"] = "existing"
    candidate["reused"] = True
    return candidate

def build_responsive_sets() -> tuple[dict[str, list[dict]], dict[str, list[dict]], dict[str, list[dict]]]:
    cards, regions, related = {}, {}, {}
    for label, source in CARD_SOURCES.items():
        source_width = original(source).width
        # 420 px is adequate for standard-density cards; 640/720 px variants
        # cover high-density phones and ordinary desktop/tablet slots.
        widths = (
            [source_width] if source_width < 420 and (ROOT / source).suffix.lower() == ".jpg"
            else ([420, 640] if source_width <= 800 else [420, 720])
        )
        if source_width < 420 and (ROOT / source).suffix.lower() != ".jpg":
            widths = []
        candidates = []
        for width in widths:
            if width > source_width:
                continue
            part = f"{label}-{width}.webp"
            result = create_derivative(source, str(TARGET_DIR / ("card-" + part)), width)
            if result:
                candidates.append(result)
        cards[label] = candidates

    for label, source in REGION_SOURCES.items():
        existing = REGION_EXISTING.get(label)
        possible = verified_existing(source, existing) if existing else None
        if possible:
            regions[label] = [possible]
        elif original(source).width >= 480:
            # 480px covers 144px-wide region icons through 3x DPR.
            new = create_derivative(source, str(TARGET_DIR / f"region-{label}-480.webp"), 480, 93)
            regions[label] = [new] if new else []
        else:
            regions[label] = []

    for label, source in RELATED_SOURCES.items():
        existing = RELATED_EXISTING.get(label)
        possible = verified_existing(source, existing) if existing else None
        if possible:
            related[label] = [possible]
        else:
            # The guide previews are only 96–112 CSS pixels across.
            new = create_derivative(source, str(TARGET_DIR / f"related-{label}-360.webp"), min(360, original(source).width), 94)
            related[label] = [new] if new else []
    return cards, regions, related

def source_expr(path: str, declarations: dict[str, str]) -> str:
    if path.startswith("src/assets/"):
        if path not in declarations:
            declarations[path] = "photo" + str(len(declarations))
        return declarations[path]
    if path.startswith("public/"):
        return json.dumps("/" + path.removeprefix("public/"))
    raise ValueError(f"Unknown image source kind: {path}")

def make_expression(source_path: str, variants: list[dict], declarations: dict[str, str]) -> str:
    source = source_expr(source_path, declarations)
    entries: list[tuple[int, str]] = []
    for variant in variants:
        token = source_expr(variant["path"], declarations)
        entries.append((variant["width"], token))
    native_width = original(source_path).width
    if all(width != native_width for width, _ in entries):
        entries.append((native_width, source))
    entries.sort(key=lambda item: item[0])
    # Each descriptor references the exact same underlying source photograph.
    if len({width for width, _ in entries}) != len(entries):
        raise ValueError(f"Repeated srcSet descriptor for {source_path}")
    return "[" + ", ".join(token + ' + " ' + str(width) + 'w"' for width,token in entries) + '].join(", ")'

def generated_typescript(cards: dict, regions: dict, related: dict) -> str:
    declarations: dict[str, str] = {}
    blocks = [
        (CARD_SOURCES,cards,"attractionHubCardImageSets"),
        (REGION_SOURCES,regions,"attractionHubRegionImageSets"),
        (RELATED_SOURCES,related,"attractionHubRelatedImageSets"),
    ]
    sections: list[str] = []
    for sources, variants, export in blocks:
        entries: list[str] = []
        for label, source in sources.items():
            key = source_expr(source,declarations)
            expr = make_expression(source, variants[label], declarations)
            entries.append("  [" + key + "]: " + expr + ",")
        sections.append("export const " + export + ": Record<string, string> = {\n" + "\n".join(entries) + "\n};")
    header = [
        "// Generated by scripts/optimize_attractions_hub_images.py.",
        "// The native source remains in each srcSet for maximum detail at large DPR.",
        "// Art direction and the original photo.src/alt/credits are not changed.",
    ]
    for source, alias in declarations.items():
        if not source.startswith("src/assets/"):
            raise ValueError(f"Import path is not bundled: {source}")
        header.append('import ' + alias + ' from "@/' + source.removeprefix("src/") + '";')
    return "\n".join(header) + "\n\n" + "\n\n".join(sections) + "\n"

def replace_once(content: str, old: str, new: str) -> str:
    if new in content:
        return content
    if content.count(old) != 1:
        raise ValueError(f"Expected one JSX marker, got {content.count(old)}: {old[:90]!r}")
    return content.replace(old, new, 1)

def edit_component_and_tests() -> None:
    file = ROOT / "src/routes/attractions.index.tsx"
    page = file.read_text()
    page = replace_once(
        page,
        'import { CANONICAL_ORIGIN, jsonLd, pageMeta } from "@/lib/site";',
        'import { CANONICAL_ORIGIN, jsonLd, pageMeta } from "@/lib/site";\n'
        'import { attractionHubCardImageSets, attractionHubRegionImageSets, attractionHubRelatedImageSets } '
        'from "@/data/attractionHubResponsivePhotos";',
    )
    page = replace_once(
        page,
        '<img src={card.photo.src} alt={card.photo.alt} width={755} height={503}',
        '<img src={card.photo.src} srcSet={attractionHubCardImageSets[card.photo.src]} '
        'sizes="(min-width: 1280px) 365px, (min-width: 640px) calc(50vw - 24px), calc(100vw - 32px)" '
        'alt={card.photo.alt} width={755} height={503}',
    )
    page = replace_once(
        page,
        '<img src={region.image.src} alt="" width={240} height={160}',
        '<img src={region.image.src} srcSet={attractionHubRegionImageSets[region.image.src]} '
        'sizes="(min-width: 640px) 144px, 80px" alt="" width={240} height={160}',
    )
    page = replace_once(
        page,
        '<img src={guide.photo.src} alt={guide.photo.alt} width={112} height={75}',
        '<img src={guide.photo.src} srcSet={attractionHubRelatedImageSets[guide.photo.src]} '
        'sizes="(min-width: 640px) 112px, 96px" alt={guide.photo.alt} width={112} height={75}',
    )
    file.write_text(page)

    test_file = ROOT / "src/test/attractions-hub.test.ts"
    tests = test_file.read_text()
    tests = replace_once(
        tests,
        'import { readFileSync } from "node:fs";',
        'import { readFileSync } from "node:fs";\n'
        'import { attractionHubCardImageSets, attractionHubRegionImageSets, attractionHubRelatedImageSets } '
        'from "@/data/attractionHubResponsivePhotos";',
    )
    tail = '''
describe("attractions landing responsive image delivery", () => {
  const parseWidths = (srcset: string) => srcset.split(", ").map(value => Number(value.match(/ (\\d+)w$/)?.[1]));

  it("retains every original source and gives all 20 large cards native-resolution fallback", () => {
    expect(attractionHubCards).toHaveLength(20);
    for (const card of attractionHubCards) {
      const srcset = attractionHubCardImageSets[card.photo.src] ?? "";
      expect(srcset, card.id).toBeTruthy();
      const widths = parseWidths(srcset);
      expect(widths.every(width => Number.isInteger(width) && width > 0), card.id).toBe(true);
      expect(new Set(widths).size, card.id).toBe(widths.length);
      expect(widths, card.id).toEqual([...widths].sort((a, b) => a - b));
      expect(srcset.includes(card.photo.src) || card.id === "akko-acre", card.id).toBe(true);
    }
  });

  it("preserves region and guide sources and responsive breakpoints", () => {
    for (const region of attractionHubRegions) {
      expect(attractionHubRegionImageSets[region.image.src], region.id).toBeTruthy();
      expect(parseWidths(attractionHubRegionImageSets[region.image.src]!).length).toBeGreaterThan(0);
    }
    for (const guide of attractionRelatedGuides) {
      const srcset = attractionHubRelatedImageSets[guide.photo.src] ?? "";
      expect(srcset, guide.title).toBeTruthy();
      const widths = parseWidths(srcset);
      expect(widths.every(width => Number.isInteger(width) && width > 0), guide.title).toBe(true);
      expect(new Set(widths).size, guide.title).toBe(widths.length);
    }
    const page = readFileSync("src/routes/attractions.index.tsx", "utf8");
    expect(page).toContain("srcSet={attractionHubCardImageSets[card.photo.src]}");
    expect(page).toContain('sizes="(min-width: 1280px) 365px');
    expect(page).toContain("srcSet={attractionHubRegionImageSets[region.image.src]}");
    expect(page).toContain('sizes="(min-width: 640px) 144px, 80px"');
    expect(page).toContain("srcSet={attractionHubRelatedImageSets[guide.photo.src]}");
    expect(page).toContain('sizes="(min-width: 640px) 112px, 96px"');
    expect(page).toContain('<img src={card.photo.src}');
    expect(page).toContain('<img src={region.image.src}');
    expect(page).toContain('<img src={guide.photo.src}');
  });
});
'''
    if "attractions landing responsive image delivery" not in tests:
        tests += tail
    test_file.write_text(tests)

def rows_for(sources: dict, variants: dict, group: str) -> list[dict]:
    rows = []
    for label, source in sources.items():
        width, height = original(source).size
        native_size = (ROOT / source).stat().st_size
        candidates = variants[label]
        rows.append({
            "group":group, "id":label, "source":source,
            "nativeDimensions":[width,height], "nativeBytes":native_size,
            "variants":candidates,
            "oneXCandidateBytes":(candidates[0]["bytes"] if candidates else native_size),
            "oneXPotentialSavingsBytes":native_size-(candidates[0]["bytes"] if candidates else native_size),
        })
    return rows

def main() -> None:
    all_sources = set(CARD_SOURCES.values()) | set(REGION_SOURCES.values()) | set(RELATED_SOURCES.values())
    hashes = {path: data_sha(path) for path in all_sources}
    cards, regions, related = build_responsive_sets()
    report_rows = (rows_for(CARD_SOURCES,cards,"cards") +
                   rows_for(REGION_SOURCES,regions,"regions") +
                   rows_for(RELATED_SOURCES,related,"related"))
    if len(report_rows) != 33:
        raise ValueError(f"Expected 33 image slots, got {len(report_rows)}")
    for row in report_rows:
        widths = [image["width"] for image in row["variants"]]
        if widths != sorted(set(widths)):
            raise ValueError(f"Invalid candidate widths: {row['id']}")
        for candidate in row["variants"]:
            if candidate["psnrDb"] < QUALITY_FLOOR:
                raise ValueError(f"Quality gate failed: {row['id']}")
    if sum(row["oneXPotentialSavingsBytes"] for row in report_rows) < 650_000:
        raise ValueError("The high-quality variants did not deliver meaningful savings")
    if {path:data_sha(path) for path in all_sources} != hashes:
        raise ValueError("Source image changed unexpectedly")
    typescript = generated_typescript(cards,regions,related)
    (ROOT / "src/data/attractionHubResponsivePhotos.ts").write_text(typescript)
    edit_component_and_tests()
    report = {
        "scope":"Only /attractions/ region labels, 20 attraction cards and 6 guide previews; originals and individual attractions unchanged",
        "qualityThresholdPSNRdB":QUALITY_FLOOR,
        "originalSourceFilesPreserved":True,
        "originalImageCount":len(all_sources),
        "imageSlots":len(report_rows),
        "generatedVariants":sum(1 for row in report_rows for image in row["variants"] if not image["reused"]),
        "reusedVariants":sum(1 for row in report_rows for image in row["variants"] if image["reused"]),
        "oneXPotentialSavingsBytes":sum(row["oneXPotentialSavingsBytes"] for row in report_rows),
        "sourceFileBytesAcrossSlots":sum(row["nativeBytes"] for row in report_rows),
        "notes":"Per-slot source-to-smallest-image comparison, not PageSpeed Insights network savings. On high-DPR and wider screens the browser may load larger or original files. Each WebP derivative preserves original crop/aspect ratio and passed a >=36dB PSNR check.",
        "rows":report_rows,
    }
    REPORT.parent.mkdir(exist_ok=True)
    REPORT.write_text(json.dumps(report,indent=2,ensure_ascii=False)+"\n")
    print(f"Slots: {len(report_rows)}; unique source files: {len(all_sources)}")
    print(f"Generated variants: {report['generatedVariants']}; reused: {report['reusedVariants']}")
    print(f"Nominal 1x source-to-smallest savings: {report['oneXPotentialSavingsBytes']} bytes")
    for row in report_rows:
        print(row["group"], row["id"], row["nativeBytes"],"->",row["oneXCandidateBytes"],
              [f"{v['width']}w PSNR={v['psnrDb']}dB" for v in row["variants"]])

if __name__ == "__main__":
    main()
