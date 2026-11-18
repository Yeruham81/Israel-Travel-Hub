#!/usr/bin/env python3
"""Optimize only the 49-card /travel-blog/ hub, including category-filter variants.

Use the runtime manifest captured via Vitest: it reflects uniqueGuideCardPhotos'
actual per-topic selection. No global article images, previews, source copyrights,
crop, photo alt text, or existing page compositions are modified.

Derivatives are protected by:
 * source SHA256 unchanged
 * no stretching or recropping; original aspect ratio maintained
 * >=36dB PSNR against Lanczos-resized original, not a low-quality surrogate
 * original full resolution always remains the final srcset candidate
 * explicit responsive sizes for mobile/tablet/desktop, including Retina.
"""
from __future__ import annotations
import hashlib
import io
import json
import math
import re
from pathlib import Path
from PIL import Image, ImageOps, ImageChops, ImageStat

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "docs/TRAVEL_BLOG_HUB_PHOTO_MANIFEST.json"
REPORT = ROOT / "docs/TRAVEL_BLOG_HUB_IMAGE_DELIVERY_REPORT.json"
OUT = Path("src/assets/travel-blog-hub")
QUALITY_FLOOR = 36.0
CARD_SIZES = '(min-width: 1280px) 360px, (min-width: 640px) calc(50vw - 26px), calc(100vw - 32px)'
EXPLORE_SIZES = '(min-width: 640px) 112px, 96px'
EXPLORE_SOURCES = {
    "hotel-room": "/src/assets/home/hotel-room.webp",
    "road-trip": "/src/assets/home/road-trip.webp",
}

def repo_file(src: str) -> Path:
    if src.startswith("/src/assets/"):
        p = ROOT / src[1:]
    elif src.startswith("/images/"):
        p = ROOT / "public" / src[1:]
    else:
        raise ValueError(f"Not a local image path: {src}")
    if not p.is_file():
        raise FileNotFoundError(f"Selected hub photo is missing: {src} -> {p}")
    return p

def sha256(src: str) -> str:
    return hashlib.sha256(repo_file(src).read_bytes()).hexdigest()

def psnr(a: Image.Image, b: Image.Image) -> float:
    if a.size != b.size:
        raise ValueError("PSNR requires identically sized images")
    rms = ImageStat.Stat(ImageChops.difference(a, b)).rms
    mse = sum(v*v for v in rms)/3
    return 99.0 if mse == 0 else round(20*math.log10(255/math.sqrt(mse)), 2)

def read_rgb(src: str) -> Image.Image:
    with Image.open(repo_file(src)) as f:
        return ImageOps.exif_transpose(f).convert("RGB")

def optimized_name(src: str, width: int) -> str:
    name = repo_file(src).stem
    name = re.sub("[^a-z0-9-]+", "-", name.lower()).strip("-")[:46] or "photo"
    key = hashlib.sha1(src.encode()).hexdigest()[:10]
    return str(OUT / f"{name}-{key}-{width}.webp")

def convert(source: str, original: Image.Image, width: int) -> dict | None:
    if original.width <= width:
        return None
    height = max(1, round(original.height*width/original.width))
    reference = original.resize((width,height),Image.Resampling.LANCZOS)
    raw_bytes = repo_file(source).stat().st_size
    chosen = None
    for quality in (91,93,95,97,99):
        b = io.BytesIO()
        reference.save(b,format="WEBP",quality=quality,method=6)
        payload = b.getvalue()
        with Image.open(io.BytesIO(payload)) as opened:
            measured = psnr(reference,opened.convert("RGB"))
        if measured < QUALITY_FLOOR:
            continue
        # Tiny savings do not warrant introducing another image request.
        if len(payload) >= raw_bytes*0.90 or raw_bytes-len(payload)<3000:
            continue
        chosen=(payload,measured,quality)
        break
    if chosen is None:
        return None
    name = optimized_name(source,width)
    destination=ROOT/name
    destination.parent.mkdir(parents=True,exist_ok=True)
    destination.write_bytes(chosen[0])
    with Image.open(destination) as image:
        if image.format!="WEBP" or image.size!=reference.size:
            raise ValueError(f"Invalid file created: {name}")
        recalc=psnr(reference,image.convert("RGB"))
    if recalc<QUALITY_FLOOR:
        raise ValueError(f"Image fidelity below threshold {name}: {recalc}")
    return {"path":name,"width":width,"height":height,"bytes":len(chosen[0]),"psnrDb":recalc,"quality":chosen[2]}

def responsive_photo_sources() -> tuple[dict, dict]:
    manifest=json.loads(MANIFEST.read_text())
    if manifest["directorySize"]!=49 or manifest["topicCounts"].get("all")!=49:
        raise ValueError("Guide list changed; regenerate and validate manifest")
    items=manifest["sources"]
    if len(items)<42:
        raise ValueError("Too few selected images: missing topic or photos?")
    sources=[row["src"] for row in items]
    if len(sources)!=len(set(sources)):
        raise ValueError("Manifest contains duplicates")
    covers = {source:"directory" for source in sources}
    for source in EXPLORE_SOURCES.values():
        covers.setdefault(source,"explore")
    before={src:sha256(src) for src in covers}
    rows={}
    for source,group in sorted(covers.items()):
        orig=read_rgb(source)
        initial_size=repo_file(source).stat().st_size
        widths = [min(420,orig.width-1)] if orig.width>420 else []
        if group=="directory" and orig.width>=1100:
            widths.append(800)
        if group=="directory" and orig.width>=1700:
            widths.append(1200)
        if group=="explore":
            widths=[min(360,orig.width-1)] if orig.width>360 else []
        # Downscale only. Always keep the native-resolution source for high-DPR.
        results=[v for width in sorted(set(widths)) if (v:=convert(source,orig,width))]
        rows[source]={
            "group":group,
            "originalDimensions":[orig.width,orig.height],
            "originalBytes":initial_size,
            "candidates":results,
            "oneXCandidateBytes":min([v["bytes"] for v in results],default=initial_size),
            "oneXPotentialSavingsBytes":initial_size-min([v["bytes"] for v in results],default=initial_size),
        }
    if {src:sha256(src) for src in covers}!=before:
        raise ValueError("One or more original images were modified")
    return manifest,rows

def to_bundle_src(p: str, declared: dict[str,str]) -> str:
    if p.startswith("src/assets/"):
        if p not in declared:
            declared[p]=f"photo{len(declared)}"
        return declared[p]
    if p.startswith("/src/assets/"):
        return to_bundle_src(p[1:],declared)
    if p.startswith("public/images/"):
        return json.dumps("/"+p[len("public/"):])
    if p.startswith("/images/"):
        return json.dumps(p)
    raise ValueError("Unrecognized image path for bundling: "+p)

def ts_image_map(sources: list[str], rows: dict, declared: dict[str,str], name: str) -> str:
    lines=[]
    for src in sorted(sources):
        native = to_bundle_src(src,declared)
        native_width=rows[src]["originalDimensions"][0]
        choices=[(v["width"],to_bundle_src(v["path"],declared)) for v in rows[src]["candidates"]]
        choices.append((native_width,native))
        choices.sort(key=lambda row:row[0])
        if len({v[0] for v in choices})!=len(choices):
            raise ValueError(f"Repeated srcset image width for {src}")
        value="["+", ".join(token+' + " '+str(width)+'w"' for width,token in choices)+'].join(", ")'
        lines.append(f"  [{native}]: {value},")
    return "export const "+name+": Record<string, string> = {\n"+"\n".join(lines)+"\n};"

def make_ts(manifest: dict,rows: dict) -> str:
    declared={}
    directory=ts_image_map([x["src"] for x in manifest["sources"]],rows,declared,"travelBlogHubImageSets")
    explore=ts_image_map(list(EXPLORE_SOURCES.values()),rows,declared,"travelBlogExploreImageSets")
    head=[
        "// Generated by scripts/optimize_travel_blog_hub_images.py",
        "// Each page/guide retains its original src, alt and attribution.",
        "// The full original is kept in each srcSet for 2x/3x and wide screens.",
    ]
    for path,alias in declared.items():
        if not path.startswith("src/assets/"):
            raise ValueError(f"Invalid relative import: {path}")
        head.append(f'import {alias} from "@/{path.removeprefix("src/")}";')
    return "\n".join(head)+"\n\n"+directory+"\n\n"+explore+"\n"

def unique_replace(text: str, old: str, new: str) -> str:
    if new in text:
        return text
    if text.count(old)!=1:
        raise ValueError(f"Source code marker had {text.count(old)} occurrences, expected 1: {old[:90]}")
    return text.replace(old,new,1)

def wire() -> None:
    comp=ROOT/"src/components/TravelGuide.tsx"
    s=comp.read_text()
    s=unique_replace(
        s,
        'compactHomeLayout = false }: { guide: GuideDirectoryEntry;',
        'compactHomeLayout = false, responsiveSrcSet }: { guide: GuideDirectoryEntry;')
    s=unique_replace(
        s,
        'compactHomeLayout?: boolean }) {',
        'compactHomeLayout?: boolean; responsiveSrcSet?: string }) {')
    s=unique_replace(
        s,
        '<img src={displayedPhoto.src} alt={displayedPhoto.alt} width={600} height={400}',
        '<img src={displayedPhoto.src} srcSet={responsiveSrcSet} '
        'sizes={responsiveSrcSet ? "'+CARD_SIZES+'" : undefined} '
        'alt={displayedPhoto.alt} width={600} height={400}')
    comp.write_text(s)

    route=ROOT/"src/routes/travel-blog.index.tsx"
    t=route.read_text()
    t=unique_replace(
        t,
        'import { travelGuidePaths } from "@/data/registry";',
        'import { travelGuidePaths } from "@/data/registry";\n'
        'import { travelBlogHubImageSets, travelBlogExploreImageSets } from "@/data/travelBlogHubResponsivePhotos";')
    t=unique_replace(
        t,
        '<GuideCard key={guide.id} guide={guide} cardPhoto={cardPhoto || null} />',
        '<GuideCard key={guide.id} guide={guide} cardPhoto={cardPhoto || null} '
        'responsiveSrcSet={travelBlogHubImageSets[cardPhoto?.src ?? ""]} />')
    t=unique_replace(
        t,
        '<img src={item.photo.src} alt={item.photo.alt} width={112} height={75}',
        '<img src={item.photo.src} srcSet={travelBlogExploreImageSets[item.photo.src]} '
        'sizes={travelBlogExploreImageSets[item.photo.src] ? "'+EXPLORE_SIZES+'" : undefined} '
        'alt={item.photo.alt} width={112} height={75}')
    route.write_text(t)

    t=ROOT/"src/test/travel-blog-hub-images.test.ts"
    t.write_text('''import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { guideDirectory, filterGuides, guideTopics } from "@/data/travelGuides";
import { uniqueGuideCardPhotos } from "@/lib/guide-card-photos";
import { travelBlogHubImageSets, travelBlogExploreImageSets } from "@/data/travelBlogHubResponsivePhotos";

const widths = (srcset: string) => srcset.split(", ").map(part => Number(part.match(/ (\\d+)w$/)?.[1]));

describe("travel-blog index responsive WebP delivery", () => {
  it("maps actual unique photos for the 49-card directory and every topic view", () => {
    expect(guideDirectory).toHaveLength(49);
    for (const topic of [undefined, ...guideTopics.map(item => item.id)]) {
      const guides = filterGuides("", topic);
      const pictured = uniqueGuideCardPhotos(guides.map(guide => ({ guide })));
      const photos = pictured.map(x => x.cardPhoto?.src).filter((s): s is string => !!s);
      expect(new Set(photos).size).toBe(photos.length);
      for (const photo of photos) {
        const srcset = travelBlogHubImageSets[photo] ?? "";
        expect(srcset, photo).toBeTruthy();
        const desc = widths(srcset);
        expect(desc.every(n => Number.isInteger(n) && n > 0), photo).toBe(true);
        expect(desc, photo).toEqual([...desc].sort((a,b) => a-b));
        expect(new Set(desc).size, photo).toBe(desc.length);
        expect(srcset.includes(photo), photo).toBe(true);
      }
    }
  });

  it("keeps originals, card aspect ratios, unique-photo assignment, filter UI and URLs intact", () => {
    const source = readFileSync("src/routes/travel-blog.index.tsx","utf8");
    const component = readFileSync("src/components/TravelGuide.tsx","utf8");
    expect(source).toContain('uniqueGuideCardPhotos(guides.map(guide => ({ guide })))');
    expect(source).toContain('responsiveSrcSet={travelBlogHubImageSets[cardPhoto?.src ?? ""]}');
    expect(source).toContain('srcSet={travelBlogExploreImageSets[item.photo.src]}');
    expect(source).toContain('href={topicHref(item.id)}');
    expect(component).toContain("src={displayedPhoto.src} srcSet={responsiveSrcSet}");
    expect(component).toContain("aspect-[3/2] w-full object-cover");
    expect(source).toContain("GuidePhotoCredit");
    expect(source).toContain("guideDirectory.flatMap");
    expect(Object.keys(travelBlogExploreImageSets).length).toBe(2);
  });
});
''')

def viewport_checks(rows: dict,selected: list[str]) -> list[dict]:
    viewports=[
        ("mobile",390,1),("mobile-2x",390,2),("mobile-3x",390,3),
        ("tablet",768,1),("tablet-2x",768,2),
        ("wide-tablet",1180,1),("wide-tablet-2x",1180,2),
        ("desktop",1440,1),("desktop-2x",1440,2),("desktop-3x",1440,3),
    ]
    checks=[]
    for label,viewport,dpr in viewports:
        css = 360 if viewport>=1280 else (viewport/2-26 if viewport>=640 else viewport-32)
        count_small=count_native=0
        for src in selected:
            row=rows[src]
            required=css*dpr
            choices=[(v["width"],False) for v in row["candidates"]]
            choices.append((row["originalDimensions"][0],True))
            choices.sort(key=lambda v:v[0])
            picked=next((v for v in choices if v[0]>=required),choices[-1])
            if picked[0]<min(required,row["originalDimensions"][0]):
                raise ValueError(f"Low-res source for {label}: {src}")
            if picked[1]:
                count_native+=1
            else:
                count_small+=1
        checks.append({"scenario":label,"viewportCssPx":viewport,"dpr":dpr,"optimized":count_small,
                       "native":count_native,"resolutionRegressions":0})
    return checks

def main():
    manifest, rows=responsive_photo_sources()
    selected=[row["src"] for row in manifest["sources"]]
    if not selected:
        raise ValueError("No renderable guides found")
    savings=sum(rows[src]["oneXPotentialSavingsBytes"] for src in selected)
    if savings<400_000:
        raise ValueError(f"Not enough high-quality guide-directory savings: {savings}")
    (ROOT/"src/data/travelBlogHubResponsivePhotos.ts").write_text(make_ts(manifest,rows))
    wire()
    report={
        "scope":"Only /travel-blog/ guide-directory and two oversized Explore Israel further thumbnails",
        "numberOfGuides":49,
        "topicsChecked":["all",*[t for t in manifest["topicCounts"] if t!="all"]],
        "topicCounts":manifest["topicCounts"],
        "uniqueCoverSources":len(selected),
        "nativeSourceFilesPreserved":True,
        "qualityThresholdPSNRdB":QUALITY_FLOOR,
        "variantsCreated":sum(len(row["candidates"]) for row in rows.values()),
        "originalBytesAcrossUniqueDirectoryCovers":sum(rows[src]["originalBytes"] for src in selected),
        "oneXBytesAcrossUniqueDirectoryCovers":sum(rows[src]["oneXCandidateBytes"] for src in selected),
        "oneXPotentialSavingsBytes":savings,
        "extraExplorePotentialSavingsBytes":sum(rows[src]["oneXPotentialSavingsBytes"] for src in EXPLORE_SOURCES.values()),
        "viewportMatrix":viewport_checks(rows,selected),
        "notes":"File-size comparison for default and filtered guide cover source union, not actual PageSpeed network transfer. Native image is preserved as full-resolution srcSet fallback, so savings vary by screen and DPR. PSNR measures derivatives against original resized with Lanczos; it does not replace human screenshots.",
        "photos":rows,
    }
    REPORT.parent.mkdir(exist_ok=True)
    REPORT.write_text(json.dumps(report,indent=2,ensure_ascii=False)+"\n")
    print(f"Unique selected cover sources: {len(selected)}; native originals unchanged")
    print(f"Generated WebP variants: {report['variantsCreated']}")
    print(f"Nominal 1x guide-cover savings: {savings} bytes")
    print(f"Additional explore-card savings: {report['extraExplorePotentialSavingsBytes']} bytes")
    for src in selected:
        print(src, rows[src]["originalBytes"], "->",rows[src]["oneXCandidateBytes"],
              [(v["width"],v["psnrDb"]) for v in rows[src]["candidates"]])
if __name__=="__main__":
    main()
