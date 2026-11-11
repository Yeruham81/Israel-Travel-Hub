#!/usr/bin/env python3
"""Audit photos currently assigned to hotel cards, including visually identical crops.
Run with Pillow installed: python3 scripts/audit-hotel-card-photos.py

Photos are illustrative unless explicitly verified as the actual property.
Only one photo may belong to each different hotel. A hotel may reuse its own
photo across its city and neighborhood/category pages. This checks both
byte-identical uploads and distinct crops of the same underlying photograph.
"""
from pathlib import Path
from PIL import Image
import hashlib

ROOT = Path(__file__).resolve().parents[1]
CARDS = ROOT / "public/images/hotel-cards"

# Prior hotel photos: 12 Jerusalem and 16 Tel Aviv cards.
# Keep this list in sync with src/data/{jerusalem,telAviv}HotelPhotos.ts.
LEGACY = [
 "src/assets/jerusalem/downtown.webp",
 "public/images/city-stays/jerusalem-downtown.webp",
 "src/assets/jerusalem/mamilla.webp",
 "public/images/city-stays/jerusalem-mamilla.webp",
 "src/assets/home/jerusalem-old-city.webp",
 "src/assets/jerusalem/old-city.webp",
 "public/images/hotel-cards/bezalel.webp",
 "src/assets/jerusalem/mahane-yehuda.webp",
 "src/assets/jerusalem/east-jerusalem.webp",
 "public/images/hotels/jerusalem-night.webp",
 "src/assets/jerusalem/german-colony.webp",
 "public/images/jerusalem/first-station.webp",
 "src/assets/home/hero-tel-aviv.webp",
 "src/assets/tel-aviv/beachfront.webp",
 "src/assets/tel-aviv/dizengoff.webp",
 "public/images/hotel-cards/tlv-cinema.webp",
 "src/assets/home/tel-aviv-coast.webp",
 "src/assets/tel-aviv/old-north.webp",
 "src/assets/tel-aviv/neve-tzedek.webp",
 "src/assets/tel-aviv/kerem-hateimanim.webp",
 "src/assets/tel-aviv/jaffa.webp",
 "src/assets/guides/2026-10/beaches-in-tel-aviv.webp",
 "src/assets/tel-aviv/florentin.webp",
 "public/images/city-stays/tel-aviv-jaffa.webp",
 "public/images/attractions/tel-aviv-jaffa.webp",
 "public/images/city-stays/tel-aviv-beachfront.webp",
 "src/assets/tel-aviv/rothschild.webp",
 "public/images/hotel-cards/tlv-65-rothschild.webp",
]
RESORT_LOCAL = [
 "src/assets/haifa/panorama.webp",   # Haifa Golden Crown
 "src/assets/dead-sea/beach.webp",
 "src/assets/dead-sea/landscape.webp",
 "src/assets/dead-sea/sunbeds.webp",
 "public/images/attractions/dead-sea.webp",
]
# This upload was found to contain the same room photo as tib-u-boutique.
# It is deliberately not used in the website.
IGNORED = {"haifa-golden-crown.webp"}

def ahash(path: Path):
    with Image.open(path) as im:
        im = im.convert("L").resize((16, 16), Image.Resampling.LANCZOS)
        pixels = list(im.getdata())
    median = sorted(pixels)[len(pixels)//2]
    return [v > median for v in pixels]

def main():
    files = [ROOT / p for p in LEGACY + RESORT_LOCAL]
    files += sorted(p for p in CARDS.iterdir() if p.suffix.lower() in {".jpg", ".webp", ".jpeg", ".png"} and p.name not in IGNORED)
    files = list(dict.fromkeys(files))  # A few older cards now use photo assets in CARDS.
    assert len(files) == 87, f"Expected 87 used hotel photos; found {len(files)}."
    for p in files:
        if not p.is_file():
            raise AssertionError(f"Missing photo: {p.relative_to(ROOT)}")
    hashes = [(p, hashlib.sha256(p.read_bytes()).hexdigest(), ahash(p)) for p in files]
    print(f"Auditing {len(hashes)} assigned hotel photo assets.")
    identical = []
    visually_identical = []
    for idx, (p, digest, phash) in enumerate(hashes):
        for q, other_digest, other_hash in hashes[:idx]:
            if digest == other_digest:
                identical.append((p, q))
            elif sum(a!=b for a,b in zip(phash,other_hash)) <= 18:
                visually_identical.append((p, q, sum(a!=b for a,b in zip(phash,other_hash))))
    for a,b in identical:
        print(f"EXACT DUPLICATE: {a.relative_to(ROOT)} and {b.relative_to(ROOT)}")
    for a,b,d in visually_identical:
        print(f"LOOKALIKE ({d}/256 differing bits): {a.relative_to(ROOT)} and {b.relative_to(ROOT)}")
    if identical or visually_identical:
        raise SystemExit(f"Found {len(identical)} byte-identical and {len(visually_identical)} closely similar photos. Inspect and replace any reused hotel image.")
    print("PASS: all 87 assigned hotel card images are distinct, including perceptual image comparison.")

if __name__=="__main__":
    main()
