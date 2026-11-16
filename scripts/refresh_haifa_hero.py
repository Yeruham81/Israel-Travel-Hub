#!/usr/bin/env python3
"""One-time high-resolution Haifa hero replacement from original Commons photograph."""
from __future__ import annotations
import io
import json
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path
from PIL import Image, ImageFilter, ImageOps

ROOT=Path(__file__).resolve().parents[1]
IMAGES=ROOT / "src/assets/home"
HOME=ROOT / "src/components/HomeHero.tsx"
CAROUSEL=ROOT / "src/components/HeroCarousel.tsx"
TEST=ROOT / "src/components/HomeHero.test.ts"
CREDITS=ROOT / "docs/HOME_CAROUSEL_PHOTO_CREDITS.md"
FILENAME="The Hanging Gardens of Haifa, Israel (50099173503) (cropped).jpg"
USER_AGENT="IsraelTravelHubImageOptimization/1.0 (Wikimedia Commons credit)"
SIZES=(
  ("large",(2880,1440),950_000),
  ("medium",(1920,960),530_000),
  ("mobile",(900,1125),290_000),
)

def download(url,max_length):
    for attempt in range(5):
        try:
            request=urllib.request.Request(url,headers={"User-Agent":USER_AGENT})
            with urllib.request.urlopen(request,timeout=90) as response:
                content=response.read(max_length+1)
            if not 100 < len(content) <= max_length:
                raise ValueError(f"Unexpected response length: {len(content)}")
            return content
        except Exception as exc:
            if attempt==4: raise RuntimeError(f"Download failed: {url}") from exc
            time.sleep(2+2*attempt)
    raise AssertionError("unreachable")

def get_original():
    query=urllib.parse.urlencode({
       "action":"query","format":"json","formatversion":"2",
       "titles":"File:"+FILENAME,"prop":"imageinfo",
       "iiprop":"url|size|extmetadata",
    })
    metadata=json.loads(download("https://commons.wikimedia.org/w/api.php?"+query,1_000_000))
    info=metadata["query"]["pages"][0]["imageinfo"][0]
    print("Commons source:",info["width"],info["height"],flush=True)
    if info["width"]<5000 or info["height"]<3000:
        raise RuntimeError("The original source is not a 5K photo")
    licence=re.sub(r"<[^>]*>","",info["extmetadata"]["LicenseShortName"]["value"])
    if licence!="CC BY 2.0": raise RuntimeError(f"Unexpected licence: {licence}")
    if not info["url"].startswith("https://upload.wikimedia.org/"):
        raise RuntimeError("Unexpected source host")
    original_bytes=download(info["url"],32_000_000)
    with Image.open(io.BytesIO(original_bytes)) as loaded:
        source=ImageOps.exif_transpose(loaded).convert("RGB")
        source.load()
    if source.width<5000 or source.height<3000:
        raise RuntimeError("Original download was downsampled")
    print(f"Full-sized source {source.size}; {len(original_bytes):,} bytes",flush=True)
    return source

def write_variants(source):
    IMAGES.mkdir(parents=True,exist_ok=True)
    for name,dims,budget in SIZES:
        center=(.50,.60) if name!="mobile" else (.50,.56)
        image=ImageOps.fit(source,dims,method=Image.Resampling.LANCZOS,centering=center)
        image=image.filter(ImageFilter.UnsharpMask(radius=.85,percent=65,threshold=3))
        data=b""
        for quality in (88,86,84,82,80,78,76,74,72,70):
            buffer=io.BytesIO()
            image.save(buffer,format="WEBP",quality=quality,method=6)
            data=buffer.getvalue()
            if len(data)<=budget: break
        if len(data)>budget: raise RuntimeError(f"Image too big for {name}: {len(data)} > {budget}")
        path=IMAGES / f"hero-refresh-haifa-gardens-v2-{name}.webp"
        path.write_bytes(data)
        with Image.open(path) as check:
            if check.format!="WEBP" or check.size!=dims: raise RuntimeError("WebP validation failed")
        print(f"{path.relative_to(ROOT)} {dims} {len(data):,} bytes quality={quality}",flush=True)

def update_code():
    s=HOME.read_text(encoding="utf-8")
    for v in ("large","medium","mobile"):
        before=f"hero-refresh-haifa-gardens-{v}.webp"
        after=f"hero-refresh-haifa-gardens-v2-{v}.webp"
        if s.count(before)!=1: raise RuntimeError("Haifa import changed: "+before)
        s=s.replace(before,after)
    old=next((line for line in s.splitlines() if 'caption: "Haifa and the Bahá’í Gardens"' in line),"")
    if old.count('pos: "center"')!=1 or 'width: 1680, height: 840' not in old:
        raise RuntimeError("Haifa slide changed; refusing overwrite")
    new=old.replace('pos: "center"','pos: "center 60%"')
    new=new.replace('width: 1680, height: 840','width: 2880, height: 1440, highDensity: true')
    s=s.replace(old,new)
    if len([line for line in s.splitlines() if line.startswith("  { src:")])!=12:
        raise RuntimeError("Carousel must retain twelve slides")
    HOME.write_text(s,encoding="utf-8")

    carousel=CAROUSEL.read_text(encoding="utf-8")
    old_type="height?: number };"
    if carousel.count(old_type)!=1: raise RuntimeError("HeroSlide signature changed")
    carousel=carousel.replace(old_type,"height?: number; highDensity?: boolean };")
    old_src='<source media="(max-width: 1800px)" srcSet={s.srcMedium} />'
    new_src='<source media="(max-width: 1800px)" srcSet={s.highDensity ? s.srcMedium + " 1x, " + s.src + " 2x" : s.srcMedium} />'
    if carousel.count(old_src)!=1: raise RuntimeError("Responsive source declaration changed")
    carousel=carousel.replace(old_src,new_src)
    CAROUSEL.write_text(carousel,encoding="utf-8")

    test=TEST.read_text(encoding="utf-8")
    anchor='    expect(heroSlides[7]?.caption).toBe("Akko Old City and harbour");'
    if test.count(anchor)!=1: raise RuntimeError("Haifa test location missing")
    checks="""    expect(heroSlides[2]?.caption).toBe("Haifa and the Bahá’í Gardens");
    expect(heroSlides[2]?.src).toContain("hero-refresh-haifa-gardens-v2-large.webp");
    expect(heroSlides[2]?.srcMedium).toContain("hero-refresh-haifa-gardens-v2-medium.webp");
    expect(heroSlides[2]?.srcSm).toContain("hero-refresh-haifa-gardens-v2-mobile.webp");
    expect(heroSlides[2]?.highDensity).toBe(true);
"""
    test=test.replace(anchor,checks+anchor)
    TEST.write_text(test,encoding="utf-8")

    docs=CREDITS.read_text(encoding="utf-8")
    docs+="""
- Slide 3 — Haifa and the Bahá’í Gardens: regenerated from the verified
  Wikimedia Commons original 5,268 x 3,136 photograph, rather than a reduced thumbnail.
  Responsive, locally hosted WebP outputs use 2,880 x 1,440, 1,920 x 960,
  and 900 x 1,125 pixels. The slide can request its larger file on
  high-pixel-density desktop screens instead of upscaling the medium image.
  Original photographer and licence are listed in the provenance table above.
"""
    CREDITS.write_text(docs,encoding="utf-8")

if __name__=="__main__":
    source=get_original()
    write_variants(source)
    update_code()
    print("SUCCESS: 5K original used, responsive WebP images generated, twelve slides preserved",flush=True)
