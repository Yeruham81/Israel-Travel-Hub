#!/usr/bin/env python3
"""Right-size only the ten category photos on /tours/; preserve all original imagery.

The other tour-category pages continue to use their original full-size sources.
Existing optimized card photos are reused; three missing assets are generated
at 480px width and high WebP quality without any new crop.
"""
from __future__ import annotations
import io
import json
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "src/assets/tours-hub"
REPORT = ROOT / "docs/TOURS_HUB_IMAGE_DELIVERY_REPORT.json"

SOURCES = {
    "jerusalem": "src/assets/home/jerusalem-old-city.webp",
    "tel-aviv-jaffa": "src/assets/home/tel-aviv-coast.webp",
    "masada-dead-sea": "src/assets/home/masada-dead-sea.webp",
    "bethlehem-jericho": "src/assets/guides/2026-10/jerusalem-to-bethlehem.webp",
    "nazareth-galilee": "src/assets/home/tiberias-lake.webp",
    "northern-coast": "src/assets/airport-transfers/caesarea.webp",
    "negev-ramon": "src/assets/negev/ramon-clouds.webp",
    "golan-heights": "src/assets/golan/bental-view.jpg",
    "food-markets": "src/assets/guides/2026-10/what-to-eat-in-israel.webp",
    "eilat-red-sea": "src/assets/eilat/waterfront.webp",
}

# Already-reviewed small files. They are not recompressed.
REUSE = {
    "jerusalem": "src/assets/home/jerusalem-old-city-card.webp",
    "tel-aviv-jaffa": "src/assets/home/tel-aviv-coast-card.webp",
    "masada-dead-sea": "src/assets/home/masada-dead-sea-card.webp",
    "bethlehem-jericho": "src/assets/guides/2026-10/jerusalem-to-bethlehem-mobile.webp",
    "nazareth-galilee": "src/assets/home/tiberias-lake-card.webp",
    "northern-coast": "src/assets/airport-transfers/caesarea-hub.webp",
    "eilat-red-sea": "src/assets/airport-transfers/eilat-hub.webp",
}
GENERATE = {
    "negev-ramon": "src/assets/tours-hub/ramon-crater.webp",
    "golan-heights": "src/assets/tours-hub/golan-heights.webp",
    "food-markets": "src/assets/tours-hub/food-markets.webp",
}

def replace_once(text: str, old: str, new: str) -> str:
    if new in text:
        return text
    if text.count(old) != 1:
        raise ValueError(f"Expected one marker, found {text.count(old)}: {old[:130]}")
    return text.replace(old,new,1)

def create_webp(original_name: str, optimized_name: str) -> None:
    original = ROOT / original_name
    target = ROOT / optimized_name
    with Image.open(original) as im:
        img = ImageOps.exif_transpose(im).convert("RGB")
    img.thumbnail((480, 10000), Image.Resampling.LANCZOS)
    out = io.BytesIO()
    img.save(out, format="WEBP", quality=88, method=6)
    raw = out.getvalue()
    if len(raw) >= original.stat().st_size:
        raise ValueError(f"Optimized file larger than source: {original_name}")
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(raw)

def inspect(key: str, target_name: str) -> dict:
    source = ROOT / SOURCES[key]
    target = ROOT / target_name
    with Image.open(source) as original, Image.open(target) as optimized:
        assert optimized.format == "WEBP" and optimized.width <= original.width
        dims = {"sourceDimensions": [original.width,original.height],
                "optimizedDimensions":[optimized.width,optimized.height]}
        # Since the card is 112px wide, minimum 224px source width is adequate for 2x devices.
        assert optimized.width >= 224, f"Too little pixel detail: {key} = {optimized.size}"
    old_size,new_size=source.stat().st_size,target.stat().st_size
    return {"categoryId":key,"original":SOURCES[key],"served":target_name,
            "originalBytes":old_size,"servedBytes":new_size,"savedBytes":old_size-new_size,
            "reused":key in REUSE,**dims}

def write_source() -> None:
    code = '''import type { TourCategoryId } from "@/data/tours";
import jerusalem from "@/assets/home/jerusalem-old-city-card.webp";
import telAviv from "@/assets/home/tel-aviv-coast-card.webp";
import masada from "@/assets/home/masada-dead-sea-card.webp";
import bethlehem from "@/assets/guides/2026-10/jerusalem-to-bethlehem-mobile.webp";
import galilee from "@/assets/home/tiberias-lake-card.webp";
import caesarea from "@/assets/airport-transfers/caesarea-hub.webp";
import ramon from "@/assets/tours-hub/ramon-crater.webp";
import golan from "@/assets/tours-hub/golan-heights.webp";
import food from "@/assets/tours-hub/food-markets.webp";
import eilat from "@/assets/airport-transfers/eilat-hub.webp";

/** Photos served only in the compact /tours/ hub cards.
 * Destination-page editorial photos, credits and original crops are unchanged.
 */
export const tourHubThumbnailSources: Record<TourCategoryId, string> = {
  jerusalem,
  "tel-aviv-jaffa": telAviv,
  "masada-dead-sea": masada,
  "bethlehem-jericho": bethlehem,
  "nazareth-galilee": galilee,
  "northern-coast": caesarea,
  "negev-ramon": ramon,
  "golan-heights": golan,
  "food-markets": food,
  "eilat-red-sea": eilat,
};
'''
    (ROOT / "src/data/tourHubThumbnails.ts").write_text(code)
    component = ROOT / "src/components/TourDiscovery.tsx"
    text = component.read_text()
    text = replace_once(text,
        'import { tourCategories, tourCategoryPaths, tourCruisePorts, type TourCategoryId } from "@/data/tours";',
        'import { tourCategories, tourCategoryPaths, tourCruisePorts, type TourCategoryId } from "@/data/tours";\nimport { tourHubThumbnailSources } from "@/data/tourHubThumbnails";')
    text = replace_once(text,
        '<img src={category.photo.src} alt="" width={160} height={192} loading="lazy" decoding="async"',
        '<img src={tourHubThumbnailSources[category.id]} alt="" width={160} height={192} loading="lazy" decoding="async"')
    component.write_text(text)
    tests = ROOT / "src/test/tours.test.tsx"
    test = tests.read_text()
    test = replace_once(test,
        'import { tourCategories, tourCategoryPaths, tourPhotos } from "@/data/tours";',
        'import { tourCategories, tourCategoryPaths, tourPhotos } from "@/data/tours";\nimport { tourHubThumbnailSources } from "@/data/tourHubThumbnails";')
    test = replace_once(test,
        '      expect(category.querySelectorAll("img")).toHaveLength(1);',
        '      expect(category.querySelectorAll("img")).toHaveLength(1);\n      const originalCategory = tourCategories.find(item => item.id === category.getAttribute("data-category-id"))!;\n      expect(category.querySelector("img")).toHaveAttribute("src", tourHubThumbnailSources[originalCategory.id]);\n      expect(category.querySelector("img")).toHaveAttribute("loading", "lazy");\n      expect(tourHubThumbnailSources[originalCategory.id]).not.toBe(originalCategory.photo.src);')
    tests.write_text(test)

def main():
    for key,name in GENERATE.items():
        create_webp(SOURCES[key],name)
    results = [inspect(key, REUSE.get(key) or GENERATE[key]) for key in SOURCES]
    assert len(results) == 10
    assert sum(item["savedBytes"] for item in results) > 700_000
    write_source()
    report = {
        "scope": "Ten /tours/ hub category thumbnails only; no changes to full-size sources or destination pages",
        "sourceTotalBytes": sum(item["originalBytes"] for item in results),
        "servedTotalBytes": sum(item["servedBytes"] for item in results),
        "savedBytes": sum(item["savedBytes"] for item in results),
        "reusedFiles": len(REUSE),
        "generatedFiles": len(GENERATE),
        "sourceFilesUnmodified": True,
        "measurementNote": "Comparison of complete source-file bytes, not the PageSpeed Insights estimate. Lazy loading may defer lower cards, so this does not directly measure LCP.",
        "files":results,
    }
    REPORT.parent.mkdir(exist_ok=True)
    REPORT.write_text(json.dumps(report,indent=2,ensure_ascii=False)+"\n")
    print(f"Optimized {len(results)} category photos; reused {len(REUSE)} existing assets")
    for row in results:
        print(f"{row['categoryId']}: {row['originalBytes']} => {row['servedBytes']} bytes")
    print(f"Total source-to-served reduction: {report['savedBytes']} bytes")

if __name__ == "__main__":
    main()
