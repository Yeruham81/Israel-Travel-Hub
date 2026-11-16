#!/usr/bin/env python3
"""One-time import of the original Commons photographs supplied for the homepage.

The uploaded names identify the exact originals. Download their Commons
thumbnails on the GitHub runner, make local responsive WebP derivatives, and
replace the home carousel entries in a single follow-up commit. The published
site never uses Wikimedia hotlinks.
"""
from __future__ import annotations

import io
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src/assets/home"
HERO = ROOT / "src/components/HomeHero.tsx"
CREDITS = ROOT / "docs/HOME_CAROUSEL_PHOTO_CREDITS.md"
HEADERS = {"User-Agent": "IsraelTaxiTravelEditorial/1.0 (licensed image attribution and web optimization)"}

# Matches the nine user-provided photographs, without AI alteration.
# Center points prioritize identifiable landmarks in narrow mobile crops.
PHOTOS = [
    ("haifa-gardens", "The Hanging Gardens of Haifa, Israel (50099173503) (cropped).jpg",
     "Haifa and the Bahá’í Gardens", "The Bahá’í Gardens, Haifa city and the Mediterranean port seen from Mount Carmel",
     ". Ray in Manila", "CC BY 2.0", (0.50, 0.58)),
    ("masada-dead-sea", "Israel-2013-Aerial 18-Masada.jpg",
     "Masada above the Dead Sea", "Aerial view of Masada's ancient fortress on a sunlit cliff overlooking the Dead Sea",
     "Andrew Shiva", "CC BY-SA 4.0", (0.62, 0.56)),
    ("caesarea-coast", "קיסריה העתיקה.jpg",
     "Caesarea’s ancient harbour", "Aerial view of the ancient harbour, turquoise Mediterranean water and shoreline near Caesarea",
     "Idomeir", "CC BY-SA 4.0", (0.55, 0.54)),
    ("dead-sea-salt", "PikiWiki Israel 37656 Salty sunrise.jpg",
     "Dead Sea salt formations at sunrise", "White salt formations in shallow turquoise Dead Sea water under an orange sunrise sky",
     "ido Meirovich / PikiWiki Israel", "CC BY 2.5", (0.52, 0.54)),
    ("jaffa-port", "ISR-2013-Aerial-Jaffa-Port of Jaffa.jpg",
     "Old Jaffa and its harbour", "Aerial view of historic Old Jaffa stone buildings, the harbour and the Mediterranean shoreline",
     "Andrew Shiva", "CC BY-SA 4.0", (0.50, 0.55)),
    ("eilat-mountains", "הרי אילת.jpg",
     "Eilat Mountains and the Gulf of Aqaba", "Rocky Eilat Mountains overlooking the city of Eilat and the blue Gulf of Aqaba",
     "סמי. עורך", "CC BY-SA 4.0", (0.44, 0.51)),
    ("ramon-crater", "CamelHillMitzpeRamonMar262022 03.jpg",
     "Sunrise over Makhtesh Ramon", "Sun rising over the edge of Makhtesh Ramon beside Camel Hill near Mitzpe Ramon",
     "Hagai Agmon-Snir", "CC BY-SA 4.0", (0.42, 0.51)),
    ("tel-aviv-sarona", "Sarona CBD 01.jpg",
     "Tel Aviv’s modern skyline", "High-rise towers in Tel Aviv's Sarona business district with the Mediterranean Sea in the distance",
     "Ynhockey", "CC BY-SA 4.0", (0.53, 0.52)),
    ("jerusalem-jaffa-gate", "חומות העיר העתיקה שער יפו.jpg",
     "Jerusalem Old City walls at Jaffa Gate", "Visitors walking beside Jerusalem's old city walls near Jaffa Gate and the Tower of David",
     "Orenvo5", "CC BY-SA 4.0", (0.30, 0.56)),
]

SIZES = [
    ("large", (1920, 960), 245_000),
    ("medium", (1280, 720), 145_000),
    ("mobile", (768, 900), 105_000),
]


def get(url: str, limit: int = 7_000_000) -> bytes:
    last_error = None
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=65) as response:
                if response.status != 200:
                    raise RuntimeError(f"HTTP {response.status} from {url}")
                data = response.read(limit + 1)
            if not 100 < len(data) < limit:
                raise RuntimeError(f"Bad response length {len(data)} from {url}")
            return data
        except (urllib.error.URLError, OSError, RuntimeError) as error:
            last_error = error
            if attempt != 3:
                time.sleep(2 + attempt * 3)
    raise RuntimeError(f"Download failed after retries: {last_error}")


def image_for(file_name: str, expected_license: str) -> Image.Image:
    query = urllib.parse.urlencode({
        "action": "query", "format": "json", "formatversion": "2",
        "titles": "File:" + file_name, "prop": "imageinfo",
        "iiprop": "url|extmetadata", "iiurlwidth": "2200",
    })
    import json
    metadata = json.loads(get("https://commons.wikimedia.org/w/api.php?" + query, 1_000_000))
    page = metadata["query"]["pages"][0]
    info = page.get("imageinfo", [{}])[0]
    if not info.get("url"):
        raise RuntimeError(f"File not found on Commons: {file_name} ({page})")
    license_name = re.sub(r"<[^>]+>", "", info.get("extmetadata", {}).get("LicenseShortName", {}).get("value", ""))
    if license_name != expected_license:
        raise RuntimeError(f"Unexpected Commons license for {file_name}: {license_name} != {expected_license}")
    url = info.get("thumburl") or info["url"]
    if not url.startswith(("https://upload.wikimedia.org/", "https://thumb.wikimedia.org/")):
        raise RuntimeError(f"Unrecognized image host for {file_name}: {url}")
    data = get(url)
    with Image.open(io.BytesIO(data)) as incoming:
        photo = ImageOps.exif_transpose(incoming).convert("RGB")
        photo.load()
    if min(photo.size) < 700:
        raise RuntimeError(f"Source lacks sufficient resolution: {file_name} {photo.size}")
    print(f"Verified {file_name}: {photo.size}, {len(data):,} bytes, {license_name}", flush=True)
    return photo


def export_variants(photo: Image.Image, slug: str, center: tuple[float, float]) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for label, dims, max_bytes in SIZES:
        cropped = ImageOps.fit(photo, dims, method=Image.Resampling.LANCZOS, centering=center)
        result = None
        for quality in (83, 80, 77, 74, 71, 68, 65, 62, 59):
            buffer = io.BytesIO()
            cropped.save(buffer, format="WEBP", quality=quality, method=6)
            result = buffer.getvalue()
            if len(result) <= max_bytes:
                break
        if not result or len(result) > max_bytes:
            raise RuntimeError(f"WebP too large for {slug} {label}: {len(result)} > {max_bytes}")
        target = OUT / f"hero-refresh-{slug}-{label}.webp"
        target.write_bytes(result)
        with Image.open(target) as im:
            if im.size != dims or im.format != "WEBP":
                raise RuntimeError(f"Invalid generated WebP at {target}")
        print(f"{target.relative_to(ROOT)}: {len(result):,} bytes, {dims[0]}x{dims[1]}", flush=True)


def update_carousel() -> None:
    original = HERO.read_text(encoding="utf-8")
    lines = re.findall(r"^  \{ src: .*\},$", original, re.M)
    if len(lines) != 9:
        raise RuntimeError(f"Expected the existing 9-slide carousel; got {len(lines)}")
    if not all(key in lines[i] for i, key in [(0, "hJerLarge"), (1, "hTaLarge"), (7, "pAkkoDesktop")]):
        raise RuntimeError("Protected slides 1, 2 or 8 have been modified; refusing to overwrite")

    imports = [
        line for line in original.splitlines()
        if line.startswith("import ") and any(k in line for k in ("HeroCarousel", "hJer", "hTa", "pAkko"))
    ]
    for slug, *_ in PHOTOS:
        ident = "".join(part.title() for part in slug.split("-"))
        for suffix in ("Large", "Medium", "Mobile"):
            imports.append(
                f'import p{ident}{suffix} from "@/assets/home/hero-refresh-{slug}-{suffix.lower()}.webp";'
            )

    def render(photo):
        slug, _, caption, alt, _, _, _ = photo
        ident = "p" + "".join(part.title() for part in slug.split("-"))
        # Caption is deliberately unique so HeroCarousel keys remain stable.
        return (
            f'  {{ src: {ident}Large, srcSm: {ident}Mobile, '
            f'srcMedium: {ident}Medium, caption: "{caption}", '
            f'alt: "{alt}", pos: "center", width: 1920, height: 960 }},'
        )

    slides = [
        lines[0],  # Jerusalem (preserved exactly)
        lines[1],  # Tel Aviv promenade (preserved exactly)
        *(render(p) for p in PHOTOS[:5]),
        lines[7],  # Akko (preserved exactly in slot 8)
        *(render(p) for p in PHOTOS[5:]),
    ]
    if len(slides) != 12 or len(set(slides)) != 12:
        raise RuntimeError("Carousel must contain exactly 12 unique slides")
    tail = original.partition("/** Rendered by the root layout")[2]
    if not tail:
        raise RuntimeError("HomeHero footer not found; refusing to change component")
    rewritten = (
        "\n".join(imports) + "\n\nconst heroSlides: HeroSlide[] = [\n" +
        "\n".join(slides) + "\n];\n\n/** Rendered by the root layout" + tail
    )
    HERO.write_text(rewritten, encoding="utf-8")
    check = HERO.read_text(encoding="utf-8")
    for item in lines[0], lines[1], lines[7]:
        if item not in check:
            raise RuntimeError("One of the preserved slide declarations was altered")


def write_credits() -> None:
    CREDITS.parent.mkdir(parents=True, exist_ok=True)
    content = [
        "# Homepage carousel — original photograph credits",
        "",
        "Nine photograph files supplied by the site owner were identified against their "
        "original Wikimedia Commons records. Responsive derivatives were resized, "
        "cropped and recompressed into local WebP files; no generative changes were made.",
        "",
        "The existing first Jerusalem, second Tel Aviv promenade and eighth Akko photos "
        "were left untouched. The entries below are the nine newly processed images.",
        "",
        "| Carousel image | Photographer / attribution | License | Original image |",
        "|---|---|---|---|",
    ]
    for slug, source, _, _, author, license_name, _ in PHOTOS:
        url = "https://commons.wikimedia.org/wiki/File:" + urllib.parse.quote(source.replace(" ", "_"), safe="_()-.,")
        license_url = {
            "CC BY 2.0": "https://creativecommons.org/licenses/by/2.0/",
            "CC BY 2.5": "https://creativecommons.org/licenses/by/2.5/",
            "CC BY-SA 4.0": "https://creativecommons.org/licenses/by-sa/4.0/",
        }[license_name]
        content.append(f"| {slug} | {author} | [{license_name}]({license_url}) | [Original]({url}) |")
    content += ["", "All nine photos are modified versions (crop, resize, color-mode conversion, WebP compression).", ""]
    CREDITS.write_text("\n".join(content), encoding="utf-8")


def main() -> None:
    for slug, source, caption, alt, author, license_name, center in PHOTOS:
        photo = image_for(source, license_name)
        export_variants(photo, slug, center)
        time.sleep(0.3)  # Commons courtesy spacing
    update_carousel()
    write_credits()
    assert len(list(OUT.glob("hero-refresh-*.webp"))) == 27
    print("SUCCESS: 27 responsive images generated and 12 slides configured", flush=True)


if __name__ == "__main__":
    main()
