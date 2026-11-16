#!/usr/bin/env python3
"""Reframe ONLY homepage mobile slides 2, 6, 10 and 12 from high-resolution sources."""
from __future__ import annotations
import io
import sys
from pathlib import Path
from PIL import Image, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from scripts.optimize_home_carousel_2048 import full_resolution

ASSETS = ROOT / "src/assets/home"
HERO = ROOT / "src/components/HomeHero.tsx"
UNIT = ROOT / "src/components/HomeHero.test.ts"
PERF = ROOT / "src/test/home-mobile-performance.test.ts"
CREDITS = ROOT / "docs/HOME_CAROUSEL_PHOTO_CREDITS.md"

# center=(x,y); higher x reveals more right-side content in the original.
# All crop output dimensions are <= the underlying input resolution.
SPECS = [
    dict(index=1, slug="tel-aviv-coastline", old="hero-refresh-tel-aviv-coastline-v2-mobile.webp",
         target="hero-refresh-tel-aviv-coastline-v3-mobile.webp",
         local="hero-refresh-tel-aviv-coastline-v2-large.webp",
         size=(780, 600), center=(.03, .52)),
    dict(index=5, slug="jerusalem-jaffa-gate", old="hero-refresh-jerusalem-jaffa-gate-v4-mobile.webp",
         target="hero-refresh-jerusalem-jaffa-gate-v5-mobile.webp",
         commons="חומות העיר העתיקה שער יפו.jpg", license="CC BY-SA 4.0",
         size=(720, 900), center=(.16, .52)),
    dict(index=9, slug="jaffa-port", old="hero-refresh-jaffa-port-v4-mobile.webp",
         target="hero-refresh-jaffa-port-v5-mobile.webp",
         commons="PikiWiki Israel 68163 port of jaffa.jpg", license="CC BY 2.5",
         size=(720, 900), center=(.62, .52)),
    dict(index=11, slug="tel-aviv-sarona", old="hero-refresh-tel-aviv-sarona-v4-mobile.webp",
         target="hero-refresh-tel-aviv-sarona-v5-mobile.webp",
         commons="Sarona CBD 01.jpg", license="CC BY-SA 4.0",
         size=(720, 900), center=(.65, .52)),
]

def generate(rule):
    if "commons" in rule:
        original = full_resolution(rule["commons"], rule["license"], rule["slug"])
    else:
        with Image.open(ASSETS / rule["local"]) as loaded:
            original = loaded.convert("RGB")
            original.load()
    width, height = rule["size"]
    if original.width < width or original.height < height:
        raise RuntimeError("Upscaling prohibited for "+rule["slug"])
    crop = ImageOps.fit(original, rule["size"], method=Image.Resampling.LANCZOS, centering=rule["center"])
    if "commons" in rule:
        crop = crop.filter(ImageFilter.UnsharpMask(radius=.65, percent=42, threshold=3))
    data = b""
    for quality in (84,80,76,72,68,64,60,56,52,48,44):
        buf=io.BytesIO()
        crop.save(buf, format="WEBP", quality=quality, method=6)
        data=buf.getvalue()
        if len(data) <= 98000: break
    if len(data) > 145000:
        raise RuntimeError("Mobile exceeds 145KB: "+rule["slug"]+" "+str(len(data)))
    filename=ASSETS / rule["target"]
    filename.write_bytes(data)
    with Image.open(filename) as check:
        assert check.size == rule["size"] and check.format=="WEBP"
    print("MOBILE", rule["index"]+1, rule["slug"], "native", original.size,
          "crop", crop.size, "center",rule["center"],"bytes",len(data),"quality",quality,flush=True)

def change_refs():
    src=HERO.read_text()
    test=UNIT.read_text()
    perf=PERF.read_text()
    before=[line for line in src.splitlines() if line.startswith("  { src:")]
    assert len(before)==12
    for rule in SPECS:
        if src.count(rule["old"])!=1:
            raise RuntimeError("Mobile source unexpected for "+rule["slug"])
        src=src.replace(rule["old"],rule["target"])
        test=test.replace(rule["old"],rule["target"])
    after=[line for line in src.splitlines() if line.startswith("  { src:")]
    assert before == after, "Desktop slide definitions cannot change"
    bt=chr(96)
    original_test='const file = '+bt+'hero-refresh-${slug}-v4-${variant}.webp'+bt+';'
    replacement='''const file = variant === "mobile" && ["jaffa-port", "tel-aviv-sarona", "jerusalem-jaffa-gate"].includes(slug)
          ? __BT__hero-refresh-${slug}-v5-mobile.webp__BT__
          : __BT__hero-refresh-${slug}-v4-${variant}.webp__BT__;'''.replace("__BT__",bt)
    if perf.count(original_test)!=1:
        raise RuntimeError("Missing current mobile performance assertion")
    perf=perf.replace(original_test,replacement)
    anchor='    expect(slides).toContain("highDensity: true");'
    if perf.count(anchor)!=1: raise RuntimeError("Missing performance test anchor")
    extra='''    expect(slides).toContain("hero-refresh-tel-aviv-coastline-v3-mobile.webp");
    expect(bytes("src/assets/home/hero-refresh-tel-aviv-coastline-v3-mobile.webp")).toBeLessThan(145000);
'''
    perf=perf.replace(anchor,extra+anchor)
    HERO.write_text(src)
    UNIT.write_text(test)
    PERF.write_text(perf)
    with CREDITS.open("a",encoding="utf-8") as f:
        f.write("\n## Mobile-only carousel crop update (slides 2, 6, 10 and 12)\n\n")
        f.write("Only the four mobile WebP files were reframed. Desktop images, "
                "desktop object positioning, the other eight slides, and slide order "
                "are unchanged. Three mobile images were cropped from the original "
                "Commons photographs. Tel Aviv beach was cropped from the available "
                "1800x600 owner-supplied panorama at native size (780x600); the missing "
                "original taller source was not fabricated or upscaled. All four "
                "new mobile image files are under 145 KB and use new cache-safe names.\n")
        for rule in SPECS:
            f.write(f"- Slide {rule['index']+1}: {rule['target']}, horizontal centering {rule['center'][0]}\n")

def main():
    for rule in SPECS: generate(rule)
    change_refs()
    print("SUCCESS: Four mobile-only image replacements, 12 original desktop slides preserved",flush=True)

if __name__=="__main__": main()
