#!/usr/bin/env python3
"""Create high-quality WebP hub thumbnails; preserve all source files and crops."""
import io
import json
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
ASSETS = "src/assets/airport-transfers/"
# The first four popular photos already have optimized 420px mobile variants.
CARD_SOURCES = {
    "raanana": "src/assets/airport-transfers/raanana.webp",
    "herzliya": "src/assets/airport-transfers/herzliya.webp",
    "netanya": "src/assets/airport-transfers/netanya.webp",
    "ashdod": "src/assets/airport-transfers/ashdod.webp",
    "caesarea": "src/assets/airport-transfers/caesarea.webp",
    "nazareth": "src/assets/airport-transfers/nazareth.webp",
    "eilat": "src/assets/eilat/waterfront.webp",
    "other": "src/assets/airport-transfers/airport.webp",
}
GUIDE_SOURCES = {
    "arrival": "src/assets/home/ben-gurion-t3.webp",
    "airport-taxis": "public/images/travel-blog/airport-taxi-sign.webp",
    "taxis": "public/images/travel-blog/taxi-in-tel-aviv.webp",
    "israel": "src/assets/guides/2026-11/buses-in-tel-aviv.webp",
    "tel-aviv": "src/assets/home/tel-aviv-coast.webp",
    "sherut": "src/assets/guides/sherut-nesher-airport.webp",
}

def change_once(s, old, new):
    if new in s:
        return s
    if s.count(old) != 1:
        raise ValueError("Expected one matching marker: %s; found %s" % (old[:100], s.count(old)))
    return s.replace(old, new, 1)

def write_variant(label, src, target, width):
    source, output = ROOT/src, ROOT/target
    with Image.open(source) as im:
        original = ImageOps.exif_transpose(im).convert("RGB")
    small = original.copy()
    small.thumbnail((width, 10000), Image.Resampling.LANCZOS)
    best, qbest = None, None
    for quality in (86, 84, 82, 80, 78, 76):
        stream = io.BytesIO()
        small.save(stream, format="WEBP", quality=quality, method=6)
        value = stream.getvalue()
        best, qbest = value, quality
        if len(value) <= source.stat().st_size * .82:
            break
    if len(best) >= source.stat().st_size:
        # An already tiny WebP is safer left intact than compressed again.
        if source.suffix.lower() != ".webp":
            raise ValueError("JPEG image unexpectedly larger after resizing: "+src)
        best = source.read_bytes()
        qbest = "original"
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_bytes(best)
    with Image.open(output) as final:
        assert final.format == "WEBP" and final.width <= original.width
        actual_width = final.width
    return {"name":label,"source":src,"optimized":target,"sourceBytes":source.stat().st_size,
            "optimizedBytes":len(best),"savedBytes":source.stat().st_size-len(best),
            "sourceWidth":original.width,"optimizedWidth":actual_width,"quality":qbest}

def update_files():
    data_file = ROOT/"src/data/airportTransfers.ts"
    data = data_file.read_text()
    for key in CARD_SOURCES:
        identifier = "hub"+key.replace("-", " ").title().replace(" ", "")
        new_import = 'import '+identifier+' from "@/assets/airport-transfers/'+key+'-hub.webp";'
        data = change_once(data,
          'import telAviv from "@/assets/tel-aviv/beachfront.webp";',
          'import telAviv from "@/assets/tel-aviv/beachfront.webp";\n'+new_import)
    hub_src = {
        "jerusalem": '"/images/home/transfer-jerusalem-tower-of-david-mobile.webp"',
        "tel-aviv": '"/images/home/transfer-tel-aviv-beach-skyline-mobile.webp"',
        "haifa": '"/images/home/transfer-haifa-bahai-gardens-mobile.webp"',
        "dead-sea": '"/images/home/transfer-ein-bokek-aerial-mobile.webp"',
    }
    for key in CARD_SOURCES:
        hub_src[key] = "hub"+key.replace("-", " ").title().replace(" ", "")
    map_source = 'export const airportHubPhotoSrc: Record<string, string> = {\n'
    map_source += ''.join('  "'+key+'": '+value+',\n' for key,value in hub_src.items())
    map_source += '};\n\n'
    data = change_once(data,
      'export const airportDestinationCards = airportTransferRates.map((rate) => ({ ...rate, photo: airportHomepageRoutePhotos[rate.id] ?? airportTransferPhotos[rate.id]! }));',
      map_source+'export const airportDestinationCards = airportTransferRates.map((rate) => ({ ...rate, photo: { ...(airportHomepageRoutePhotos[rate.id] ?? airportTransferPhotos[rate.id]!), hubSrc: airportHubPhotoSrc[rate.id] } }));')
    data_file.write_text(data)

    component_file = ROOT/"src/components/AirportDestinationCard.tsx"
    component = component_file.read_text()
    component = change_once(component,
      'photo: Pick<StayGuidePhoto, "src" | "alt">;',
      'photo: Pick<StayGuidePhoto, "src" | "alt"> & { hubSrc?: string };')
    old = '<img src={photo.src}'
    new = '<img src={photo.hubSrc ?? photo.src}'
    if component.count(new) != 2:
        assert component.count(old) == 3
        component = component.replace(old, new, 2)
    component_file.write_text(component)

    route_file = ROOT/"src/routes/airport-transfers.index.tsx"
    route = route_file.read_text()
    for key in GUIDE_SOURCES:
        variable = "guide"+key.replace("-", " ").title().replace(" ", "")+"Thumb"
        imp = 'import '+variable+' from "@/assets/airport-transfers/guide-'+key+'-hub.webp";'
        route = change_once(route,
          'import { createFileRoute, Link } from "@tanstack/react-router";',
          'import { createFileRoute, Link } from "@tanstack/react-router";\n'+imp)
    route = change_once(route,
      'import { AIRPORT_TRANSFER_UPDATED_DATE, airportDestinationCards, airportTransferPhotos,',
      'import { AIRPORT_TRANSFER_UPDATED_DATE, airportDestinationCards, airportHubPhotoSrc, airportTransferPhotos,')
    route = change_once(route,
      'import { GuideHeroMedia } from "@/components/GuideHeroMedia";',
      'import { GuideHeroMedia } from "@/components/GuideHeroMedia";\nimport airportHeroMobile from "@/assets/airport-transfers/airport-mobile.webp";')
    titles = {
      "arrival":"Ben Gurion arrival tips", "airport-taxis":"Official airport taxis",
      "taxis":"Taxis in Israel", "israel":"Getting around Israel",
      "tel-aviv":"Getting around Tel Aviv", "sherut":"Sherut in Israel",
    }
    for key, title in titles.items():
        v = "guide"+key.replace("-", " ").title().replace(" ", "")+"Thumb"
        lines = route.splitlines(keepends=True)
        indexes = [i for i,line in enumerate(lines) if '{ title: "'+title+'"' in line]
        assert len(indexes) == 1, (title,indexes)
        line = lines[indexes[0]]
        if 'thumb: '+v not in line:
            idx=line.rfind(" },")
            assert idx >= 0, line
            lines[indexes[0]] = line[:idx]+", thumb: "+v+line[idx:]
            route=''.join(lines)
    route = change_once(route,
      'image={<GuideHeroMedia src={airportTransferPhotos["other"]!.src} alt={airportTransferPhotos["other"]!.alt} compact />}',
      'image={<GuideHeroMedia src={airportTransferPhotos["other"]!.src} mobileSrc={airportHeroMobile} alt={airportTransferPhotos["other"]!.alt} compact />}')
    route = change_once(route,
      'photo={airportTransferPhotos["other"]!} onChoose={choose} layout="hub-row"',
      'photo={{ ...airportTransferPhotos["other"]!, hubSrc: airportHubPhotoSrc.other }} onChoose={choose} layout="hub-row"')
    route = change_once(route,
      '<img src={guide.photo.src} alt={guide.photo.alt} width={112} height={75}',
      '<img src={guide.thumb} alt={guide.photo.alt} width={112} height={75}')
    route_file.write_text(route)

    hero_file = ROOT/"src/components/GuideHeroMedia.tsx"
    hero = hero_file.read_text()
    hero = change_once(hero, '  srcSet,\n  sizes,\n  width = 1200,',
                            '  srcSet,\n  mobileSrc,\n  sizes,\n  width = 1200,')
    hero = change_once(hero,
      '  srcSet?: string | undefined;\n  sizes?: string | undefined;',
      '  srcSet?: string | undefined;\n  mobileSrc?: string | undefined;\n  sizes?: string | undefined;')
    if 'srcSet={mobileSrc} type="image/webp"' not in hero:
        first=hero.index('      <img\n        src={src}')
        last=hero.index('      />', first)+len('      />')
        tag=hero[first:last]
        markup=(
          '      {mobileSrc ? <picture className="block">\n'
          '        <source media="(max-width: 767px)" srcSet={mobileSrc} type="image/webp" />\n'
          +tag+'\n      </picture> : (\n'+tag+'\n      )}'
        )
        hero=hero[:first]+markup+hero[last:]
    hero_file.write_text(hero)

    test_file = ROOT/"src/test/airport-transfers.test.tsx"
    test = test_file.read_text()
    test=change_once(test,
      'import { airportDestinationCards, airportHomepageRoutePhotos, airportTransferPhotos } from "@/data/airportTransfers";',
      'import { airportDestinationCards, airportHubPhotoSrc, airportTransferPhotos } from "@/data/airportTransfers";')
    test=change_once(test,
      'toHaveAttribute("src", airportHomepageRoutePhotos[rate.id]!.src);',
      'toHaveAttribute("src", airportHubPhotoSrc[rate.id]);')
    test=change_once(test,
      'toHaveAttribute("src", airportDestinationCards.find(item => item.id === rate.id)!.photo.src);',
      'toHaveAttribute("src", airportDestinationCards.find(item => item.id === rate.id)!.photo.hubSrc);')
    test=change_once(test,
      'toHaveAttribute("src", airportTransferPhotos["other"]!.src);\n    const rateTerms',
      'toHaveAttribute("src", airportHubPhotoSrc.other);\n    const rateTerms')
    test_file.write_text(test)

def main():
    output=[]
    for key,src in CARD_SOURCES.items():
        output.append(write_variant(key,src,ASSETS+key+"-hub.webp",320))
    for key,src in GUIDE_SOURCES.items():
        output.append(write_variant("guide-"+key,src,ASSETS+"guide-"+key+"-hub.webp",336))
    update_files()
    original=sum(item["sourceBytes"] for item in output)
    new=sum(item["optimizedBytes"] for item in output)
    assert len(output)==14 and original-new>150000, (original,new)
    report={"scope":"Airport-transfers hub: eight small route thumbnails, six guide thumbnails, plus four existing mobile destination images and one existing mobile hero",
            "originalsPreserved":True,"files":output,"sourceBytes":original,"optimizedBytes":new,"savedBytes":original-new}
    report_path=ROOT/"docs/AIRPORT_HUB_IMAGE_DELIVERY_REPORT.json"
    report_path.parent.mkdir(exist_ok=True)
    report_path.write_text(json.dumps(report,indent=2)+"\n")
    for row in output:
        print(row["name"],row["sourceBytes"],"->",row["optimizedBytes"],"width",row["optimizedWidth"])
    print("Additional derivative savings:",original-new,"bytes")

if __name__=="__main__":
    main()
