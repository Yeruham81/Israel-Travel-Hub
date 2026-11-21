#!/usr/bin/env python3
"""Create local width-targeted WebP derivatives for all ten Haifa museum cards.

The 700/735-pixel source files are already optimized and licensed in this
repository. Derivatives preserve aspect ratio; no image is upscaled.
"""
from pathlib import Path
from PIL import Image, ImageOps

directory = Path("public/images/haifa-museums")
museums = ("art", "city", "railway", "madatech", "struck",
           "tikotin", "mane-katz", "hecht", "maritime", "naval")
for museum in museums:
    original = directory / (museum + ".webp")
    if not original.is_file():
        raise FileNotFoundError(original)
    with Image.open(original) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        source_width, source_height = image.size
        if source_width < 560 or source_height < 200:
            raise ValueError(f"Source too small for responsive variants: {original} {image.size}")
        for width in (360, 560):
            height = round(source_height * width / source_width)
            resized = image.resize((width, height), resample=Image.Resampling.LANCZOS)
            target = directory / f"{museum}-{width}.webp"
            resized.save(target, "WEBP", quality=78, method=6)
            data = target.read_bytes()
            if data[:4] != b"RIFF" or data[8:12] != b"WEBP" or not (1800 < len(data) < 150000):
                raise ValueError(f"Invalid optimized WebP: {target}, {len(data)} bytes")
            print(f"{target}: {width}x{height}, {len(data)} bytes")
print("All 20 local responsive Haifa museum WebP variants generated.")
