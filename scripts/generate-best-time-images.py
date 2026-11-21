#!/usr/bin/env python3
"""Generate carefully downsized local season photos for the Israel timing guide.

Source photographs already belong to this website's local media library.
The guide's original primary/hero photo is deliberately not read or changed.
"""
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw

SOURCES = {
    "spring": Path("public/images/attractions/mount-precipice-jezreel-view.webp"),
    "summer": Path("src/assets/tel-aviv/beachfront.webp"),
    "autumn": Path("src/assets/guides/2026-11/jerusalem-jewish-quarter-stone-lane.webp"),
    "winter": Path("src/assets/home/hero-eilat-mountains-large.webp"),
}
OUTPUT = Path("public/images/best-time-israel")
OUTPUT.mkdir(parents=True, exist_ok=True)
preview = Image.new("RGB", (1440, 880), "white")
draw = ImageDraw.Draw(preview)

for index, (season, source) in enumerate(SOURCES.items()):
    if not source.exists():
        raise FileNotFoundError(source)
    with Image.open(source) as im:
        im = ImageOps.exif_transpose(im).convert("RGB")
        w, h = im.size
        if w < 720 or h < 300:
            raise ValueError(f"Source too small for loss-aware variants: {source}: {im.size}")
        print(f"{season} source={source} size={w}x{h}")
        for target_width in (320, 720):
            height = round(h * target_width / w)
            resized = im.resize((target_width, height), Image.Resampling.LANCZOS)
            dest = OUTPUT / f"{season}-{target_width}.webp"
            resized.save(dest, "WEBP", quality=79, method=6)
            b = dest.read_bytes()
            if b[:4] != b"RIFF" or b[8:12] != b"WEBP":
                raise ValueError(f"Incorrect image header: {dest}")
            if len(b) > 170_000 or len(b) < 1_500:
                raise ValueError(f"Variant size suspicious: {dest}: {len(b)}")
            print(f"{dest} ({target_width}x{height}, {len(b)} bytes)")
        thumbnail = ImageOps.fit(im, (700, 390), method=Image.Resampling.LANCZOS)
        px = (index % 2) * 720 + 10
        py = (index // 2) * 440 + 35
        preview.paste(thumbnail, (px, py))
        draw.text((px + 3, py - 23), f"{season.title()} | {source.as_posix()}", fill=(30, 30, 30))
preview.save("/tmp/best-time-season-photo-contact-sheet.jpg", "JPEG", quality=85)
print("Four seasonal subjects and eight responsive WebP variants created.")
