#!/usr/bin/env python3
"""Optimize /shore-excursions/ card imagery without touching any original photos.

Only the hub uses the compact derivatives. Full-size photos, photography
credits, tours and itinerary pages continue to use their original sources.
"""
from __future__ import annotations

import io
import json
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
DIRECTORY = Path("src/assets/shore-hub")
REPORT = ROOT / "docs/SHORE_HUB_IMAGE_DELIVERY_REPORT.json"

# (original, destination, target width, WebP quality)
GENERATE = {
    "coast": ("src/assets/home/hero-jaffa-harbor-desktop.jpg",
              str(DIRECTORY/"jaffa-route.webp"), 400, 89),
    "guide-jerusalem": ("src/assets/home/jerusalem-old-city.webp",
                        str(DIRECTORY/"guide-jerusalem.webp"), 360, 88),
    "guide-galilee": ("src/assets/home/tiberias-lake.webp",
                      str(DIRECTORY/"guide-galilee.webp"), 360, 88),
    "guide-masada": ("src/assets/home/masada-dead-sea.webp",
                     str(DIRECTORY/"guide-masada.webp"), 360, 88),
    "guide-akko": ("src/assets/shore-excursions/akko-port.jpg",
                   str(DIRECTORY/"guide-akko.webp"), 360, 89),
    "guide-jaffa": ("src/assets/tel-aviv/jaffa.webp",
                    str(DIRECTORY/"guide-jaffa.webp"), 360, 88),
    "guide-dead-sea": ("src/assets/dead-sea/beach.webp",
                       str(DIRECTORY/"guide-dead-sea.webp"), 360, 88),
}
REUSE = {
    "port-ashdod": ("src/assets/home/ashdod-port.webp",
                    "src/assets/home/ashdod-port-card.webp"),
    "port-haifa": ("src/assets/home/haifa-port.webp",
                   "src/assets/home/haifa-port-card.webp"),
    "experience-history": ("src/assets/home/jerusalem-old-city-card.webp",
                           "src/assets/home/jerusalem-old-city-card.webp"),
    "experience-galilee": ("src/assets/home/tiberias-lake-card.webp",
                           "src/assets/home/tiberias-lake-card.webp"),
    "experience-desert": ("src/assets/home/masada-cable-car-card.webp",
                          "src/assets/home/masada-cable-car-card.webp"),
}

def replace_once(content: str, old: str, new: str) -> str:
    if new in content:
        return content
    amount = content.count(old)
    if amount != 1:
        raise ValueError(f"Expected one occurrence, found {amount}: {old[:110]!r}")
    return content.replace(old, new, 1)

def create_webp(source_path: str, output_path: str, width: int, quality: int) -> None:
    source, output = ROOT / source_path, ROOT / output_path
    with Image.open(source) as input_file:
        original = ImageOps.exif_transpose(input_file).convert("RGB")
    small = original.copy()
    small.thumbnail((width, 10000), Image.Resampling.LANCZOS)
    buffer = io.BytesIO()
    small.save(buffer, format="WEBP", quality=quality, method=6)
    value = buffer.getvalue()
    if len(value) >= source.stat().st_size:
        # Keep already-compressed sources intact instead of losing quality for
        # no file-size benefit. All originals in this workflow are JPEG/WebP.
        if source.suffix.lower() != ".webp":
            raise ValueError(f"Not possible to optimize JPEG source safely: {source_path}")
        value = source.read_bytes()
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_bytes(value)
    with Image.open(output) as verified:
        assert verified.format == "WEBP", output
        assert verified.width <= original.width, output
        assert verified.width >= 224, output

def measure(label: str, source_name: str, target_name: str, reused: bool) -> dict:
    source, target = ROOT/source_name, ROOT/target_name
    with Image.open(source) as orig, Image.open(target) as thumb:
        if thumb.format != "WEBP" or thumb.width > orig.width:
            raise ValueError(f"Invalid optimized file {target_name}")
        original_dimensions = [orig.width,orig.height]
        served_dimensions = [thumb.width,thumb.height]
    old_bytes,new_bytes=source.stat().st_size,target.stat().st_size
    assert new_bytes <= old_bytes, (label,old_bytes,new_bytes)
    return {
        "label": label, "source":source_name,"served":target_name,
        "sourceBytes":old_bytes,"servedBytes":new_bytes,
        "savedBytes":old_bytes-new_bytes,
        "reusedExistingAsset":reused,
        "sourceDimensions":original_dimensions,"servedDimensions":served_dimensions,
    }

def wire_page() -> None:
    imports = '''import ashdodHubThumb from "@/assets/home/ashdod-port-card.webp";
import haifaHubThumb from "@/assets/home/haifa-port-card.webp";
import coastHubThumb from "@/assets/shore-hub/jaffa-route.webp";
import guideJerusalemThumb from "@/assets/shore-hub/guide-jerusalem.webp";
import guideGalileeThumb from "@/assets/shore-hub/guide-galilee.webp";
import guideMasadaThumb from "@/assets/shore-hub/guide-masada.webp";
import guideAkkoThumb from "@/assets/shore-hub/guide-akko.webp";
import guideJaffaThumb from "@/assets/shore-hub/guide-jaffa.webp";
import guideDeadSeaThumb from "@/assets/shore-hub/guide-dead-sea.webp";
'''
    route_file = ROOT / "src/routes/shore-excursions.index.tsx"
    text = route_file.read_text()
    text = text.replace('import cruisePortPhone from "@/assets/shore-hub/cruise-port-phone.webp";\n', '', 1)
    text = replace_once(text,
        'import masadaFeature from "@/assets/home/masada-cable-car-card.webp";',
        'import masadaFeature from "@/assets/home/masada-cable-car-card.webp";\n'+imports.rstrip())
    text = replace_once(text,
        'const crumbs = [{ name: "Home", path: "/" }, { name: "Shore excursions", path: "/shore-excursions/" }] as const;',
        '''const crumbs = [{ name: "Home", path: "/" }, { name: "Shore excursions", path: "/shore-excursions/" }] as const;

/** Thumbnail selection is local to the shore hub: destination-page source
 * photos and credits are never overwritten by small card variants.
 */
const shoreHubPortThumbnailSources = { ashdod: ashdodHubThumb, haifa: haifaHubThumb } as const;
const shoreHubGuideThumbnailSources: Record<string, string> = {
  "/attractions/old-city-jerusalem/": guideJerusalemThumb,
  "/travel-blog/sea-of-galilee/": guideGalileeThumb,
  "/attractions/masada/": guideMasadaThumb,
  "/attractions/akko-acre/": guideAkkoThumb,
  "/attractions/jaffa/": guideJaffaThumb,
  [travelGuidePaths.deadSea]: guideDeadSeaThumb,
};''')
    text = replace_once(text,
        '  coast: { src: coastFeature, alt: "Old Jaffa harbour and its Mediterranean waterfront" },',
        '  coast: { src: coastHubThumb, alt: "Old Jaffa harbour and its Mediterranean waterfront" },')
    # The original JPEG is not used by the hub after the swap.
    coast_import = 'import coastFeature from "@/assets/home/hero-jaffa-harbor-desktop.jpg";\n'
    if coast_import in text:
        text = text.replace(coast_import, "", 1)
    text = text.replace(
        'image={<GuideHeroMedia src={heroPhoto.src} mobileSrc={cruisePortPhone} alt={heroPhoto.alt} compact />}',
        'image={<GuideHeroMedia src={heroPhoto.src} alt={heroPhoto.alt} compact />}', 1)
    text = replace_once(text,
        '<img src={port.photo.src} alt={port.photo.alt} width={160} height={192}',
        '<img src={shoreHubPortThumbnailSources[id]} alt={port.photo.alt} width={160} height={192}')
    text = replace_once(text,
        '<img src={guide.photo.src} alt={guide.photo.alt} width={112} height={90}',
        '<img src={shoreHubGuideThumbnailSources[String(guide.to)] ?? guide.photo.src} alt={guide.photo.alt} width={112} height={90}')
    route_file.write_text(text)

    test_file=ROOT / "src/test/shore-hub.test.tsx"
    tests=test_file.read_text()
    tests=replace_once(tests,
        'import { shoreHubExperiences } from "@/data/shoreHub";',
        'import { shoreHubExperiences } from "@/data/shoreHub";\nimport { shoreHubGuides } from "@/data/shoreReading";')
    tests=tests.replace(
        '''    const mobileHero = screen.getByTestId("hub-header").querySelector('picture source[media="(max-width: 480px)"]');
    expect(mobileHero?.getAttribute("srcset")).toMatch(/cruise-port-phone/);
''', '', 1)
    tests=replace_once(tests,
        '    expect(within(destinations).getAllByRole("img")).toHaveLength(4);',
        '''    expect(within(destinations).getAllByRole("img")).toHaveLength(4);
    expect(destinations.querySelector('[data-experience="coast"] img')?.getAttribute("src")).toMatch(/jaffa-route/);''')
    tests=replace_once(tests,
        '    expect(ports).toHaveTextContent("The ideal location for touring the northern coast and Galilee region.");',
        '''    expect(ports).toHaveTextContent("The ideal location for touring the northern coast and Galilee region.");
    expect([...ports.querySelectorAll("img")].map(image => image.getAttribute("src")))
      .toEqual(expect.arrayContaining([expect.stringMatching(/ashdod-port-card/), expect.stringMatching(/haifa-port-card/)]));''')
    tests=replace_once(tests,
        '    expect(within(guides).getAllByRole("img")).toHaveLength(6);',
        '''    expect(within(guides).getAllByRole("img")).toHaveLength(6);
    expect([...guides.querySelectorAll("img")].map(image => image.getAttribute("src")))
      .toEqual(shoreHubGuides.map(() => expect.stringMatching(/guide-(jerusalem|galilee|masada|akko|jaffa|dead-sea)/)));''')
    test_file.write_text(tests)

def main() -> None:
    obsolete = ROOT / DIRECTORY / "cruise-port-phone.webp"
    if obsolete.exists():
        obsolete.unlink()
    for original,target,width,q in GENERATE.values():
        create_webp(original,target,width,q)
    items=[measure(k,source,target,False) for k,(source,target,*_) in GENERATE.items()]
    items += [measure(k,source,target,True) for k,(source,target) in REUSE.items()]
    assert len(items)==12
    assert sum(item["savedBytes"] for item in items)>450_000, "Insufficient image-size improvement"
    wire_page()
    report={
        "scope":"Shore excursions hub only: 2 port cards, 4 experience cards, 6 related-guide cards; well-optimized original cover is retained",
        "originalsPreserved":True,
        "createdVariants":len(GENERATE),
        "reusedVariants":len(REUSE),
        "sourceBytes":sum(x["sourceBytes"] for x in items),
        "optimizedBytes":sum(x["servedBytes"] for x in items),
        "savedBytes":sum(x["savedBytes"] for x in items),
        "notes":"The existing 69.6 KiB introduction image was already efficient; its redundant phone derivative was removed. Three already-small experience cards are unchanged. Estimates compare file sizes, not Lighthouse actual network bytes or LCP.",
        "files":items,
    }
    REPORT.parent.mkdir(exist_ok=True)
    REPORT.write_text(json.dumps(report,indent=2,ensure_ascii=False)+"\n")
    for item in items:
        print(item["label"],item["sourceBytes"],"->",item["servedBytes"])
    print("Total nominal source-to-served savings: %d bytes" % report["savedBytes"])

if __name__=="__main__":
    main()
