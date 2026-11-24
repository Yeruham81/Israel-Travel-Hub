"""Stage 5: generate responsive copies from audited originals; preserve original URLs and credits."""
from pathlib import Path
from PIL import Image, ImageOps
import hashlib, json, re, subprocess

root = Path(".")
assets = [Path(p) for p in subprocess.check_output(["git","ls-files","src/assets","public/images"],text=True).splitlines()]
audit = """
142198 /assets/jerusalem-old-city-DWSaog3b.webp
105990 /assets/panorama-CKrYchtp.webp
160932 /assets/waterfront-_H4cCrgS.webp
119712 /images/attractions/old-jerusalem-via-dolorosa.webp
100428 /assets/kerem-hateimanim-PR926WCz.webp
105726 /images/attractions/haifa-coast.webp
110806 /assets/ramon-panorama-CKBacpm4.webp
116376 /assets/jerusalem-old-city-market-lanes-B5_ffu5m.webp
111382 /images/attractions/old-jerusalem-western-wall.webp
100758 /assets/neve-tzedek-Dhw-6pD4.webp
105062 /images/attractions/old-jerusalem-holy-sepulchre.webp
125264 /assets/ein-gedi-waterfall-Cex66LJB.webp
141776 /assets/hero-tel-aviv-large-DaOE9dv-.webp
110944 /assets/hero-jerusalem-sm-optimized-J_bF4z8d.webp
101144 /images/city-stays/jerusalem-downtown.webp
150768 /assets/hero-tel-aviv-LkB5rqMC.webp
100556 /assets/hero-refresh-tel-aviv-coastline-medium-C5OUytn0.webp
218244 /assets/hero-refresh-jaffa-port-v4-medium-CxQYRkRM.webp
116840 /images/hotel-cards/tlv-vera.webp
133428 /assets/tel-aviv-coast-DoOYPGBU.webp
126000 /images/attractions/mount-of-olives.webp
141838 /assets/tiberias-lake-B5pZWD95.webp
116518 /assets/haifa-port-BsXYAJjx.webp
153369 /assets/nativity-courtyard-B866hSHz.jpg
131642 /assets/museums-in-jerusalem-tVV2lwTb.jpg
143066 /assets/jerusalem-jewish-quarter-stone-lane-7Hc_KYLa.webp
113716 /assets/moshe-barak-with-clients-B0rCnhfX.webp
239512 /assets/hero-refresh-jerusalem-jaffa-gate-v4-medium-D2Df7ZNq.webp
114518 /images/hotel-cards/jlm-ibis-styles.webp
196260 /assets/east-jerusalem-B-s3g6VK.webp
136316 /images/jerusalem/mount-zion/mount-zion-hillside.webp
103616 /images/hotel-cards/jlm-little-house-baka.webp
131094 /assets/food-7-qM5Lhdfc.webp
126638 /images/hotel-cards/bezalel.webp
106634 /images/hotel-cards/jlm-hashimi.webp
239782 /assets/hero-refresh-tel-aviv-sarona-v4-medium-HenEM5oK.webp
119418 /images/hotel-cards/tlv-carmel-beach-house.jpg
217012 /assets/hero-refresh-tel-aviv-sarona-medium-D3BxKIwH.webp
117698 /images/attractions/annunciation-marian-mosaics.webp
101206 /images/attractions/annunciation-grotto.webp
152230 /assets/caesarea-theatre-D3tI-09n.webp
131758 /images/attractions/capernaum-peters-house.webp
114444 /images/attractions/capernaum-synagogue-aerial.webp
149530 /assets/ein-gedi-oasis-BarI1YSt.webp
109634 /images/attractions/magdala-first-century-synagogue.webp
153804 /assets/hero-masada-large-su00s0ks.webp
102696 /assets/mount-precipice-DX-m2xpj.webp
102150 /images/attractions/mount-tabor-mosaic.webp
174034 /images/jerusalem/mount-zion/zion-gate.webp
283319 /assets/qasr-el-yahud-river-deck-DblcDzHf.jpg
115342 /assets/jordan-river-qasr-al-yahud-BNWqrRJ2.webp
118680 /images/attractions/tabgha-loaves-fishes-mosaic.webp
112658 /assets/tel-megiddo-DZhXmdN5.webp
154098 /images/attractions/jordan-river-baptism.webp
212335 /assets/road-to-jerusalem-B-sMhzMg.jpg
106618 /assets/road-trip-DdXqGLkh.webp
111892 /assets/annunciation-interior-Bd6kycUA.webp
372460 /assets/hero-haifa-CnVqX9FW.webp
107542 /assets/caesarea-dusk-BhUSmS9O.webp
238937 /assets/timna-park-feature-DpYN0SkN.jpg
521939 /assets/nimrod-fortress-DAU3gXYx.jpg
472556 /assets/banias-waterfall-DpahZ7xK.jpg
428101 /assets/el-al-waterfall-DG9tulJv.jpg
388352 /assets/bental-view-P7ro8nm5.jpg
257635 /assets/bental-hill-DbbOdbWr.jpg
254070 /assets/golan-landscape-CCpxU5mx.jpg
217889 /assets/katzrin-DVUkxn8R.jpg
104696 /images/jerusalem/hutzot-hayotzer.webp
166100 /assets/hero-masada-iV1APxoK.webp
122226 /assets/masada-dead-sea-C8irfkzK.webp
103502 /assets/masada-aerial-Dj4UhinE.webp
189302 /assets/hero-galilee-BzIc6mGU.webp
233340 /assets/ben-gurion-t3-l-7GEofm.webp
122120 /assets/hero-refresh-dead-sea-salt-v4-medium-CIrlMuuj.webp
108792 /assets/hotel-room-CQfQKE63.webp
108848 /assets/tel-aviv-light-rail-CHHdqxoj.webp
127630 /assets/where-to-stay-jerusalem-drive-C-zy2KTS.webp
"""
output=Path("public/images/stage5-responsive")
output.mkdir(parents=True,exist_ok=True)
report={"originals":[],"skipped":[],"components":[]}
imports=[]
entries=[]
for line in audit.strip().splitlines():
    size, url = line.split()
    size=int(size)
    if url.startswith("/images/"):
        matches=[Path("public"+url)]
    else:
        name=re.sub(r"-[A-Za-z0-9_-]{8}(?=\.[^.]+$)","",Path(url).name)
        matches=[p for p in assets if p.name==name and str(p).startswith("src/assets/")]
    matches=[p for p in matches if p.is_file() and p.stat().st_size==size]
    if len(matches)!=1:
        report["skipped"].append({"url":url,"reason":"source missing, changed, or ambiguous"})
        continue
    src=matches[0]
    digest=hashlib.sha256(src.read_bytes()).hexdigest()
    with Image.open(src) as original:
        im=ImageOps.exif_transpose(original).convert("RGB")
        variants=[]
        for target, ceiling in ((384,65000),(768,100000),(1152,180000)):
            w=min(im.width,target)
            if w<240 or any(v["width"]==w for v in variants):continue
            photo=im.resize((w,round(im.height*w/im.width)),Image.Resampling.LANCZOS)
            dest=output/f"{src.stem}-{digest[:10]}-{w}.webp"
            for quality in (86,82,78,74):
                photo.save(dest,"WEBP",quality=quality,method=6)
                if dest.stat().st_size<=ceiling:break
            if dest.stat().st_size>=size*0.95:
                dest.unlink()
                continue
            with Image.open(dest) as check:
                assert check.format=="WEBP" and check.size==photo.size
                check.load()
            variants.append({"url":"/"+dest.relative_to("public").as_posix(),"width":w,"bytes":dest.stat().st_size,"quality":quality})
        if not variants:
            report["skipped"].append({"url":url,"reason":"no smaller quality-preserving variant"})
            continue
        assert hashlib.sha256(src.read_bytes()).hexdigest()==digest
        if str(src).startswith("src/assets/"):
            key=f"photo{len(imports)}"
            imports.append(f'import {key} from "@/{src.relative_to("src").as_posix()}";')
        else:
            key=json.dumps("/"+src.relative_to("public").as_posix())
        candidates=", ".join(v["url"]+" "+str(v["width"])+"w" for v in variants)
        expression=json.dumps(candidates)
        if im.width>variants[-1]["width"]:
            expression += ' + ", " + '+key+' + " '+str(im.width)+'w"'
        entries.append(f"  [{key}, {expression}],")
        report["originals"].append({"source":str(src),"auditedUrl":url,"originalBytes":size,"width":im.width,"height":im.height,"sha256":digest,"variants":variants})
assert len([p for p in report["originals"] if "/golan/" in p["source"]])==7, "All seven audited Golan images must resolve"
Path("src/lib/stage5-photo-variants.ts").write_text(
    "// Generated by scripts/optimize_stage5_images.py. Original src remains authoritative.\n"+
    "\n".join(imports)+"\nconst responsive = new Map<string, string>([\n"+"\n".join(entries)+"\n]);\n"+
    "export function stage5PhotoSrcSet(src: string | undefined): string | undefined { return src ? responsive.get(src) : undefined; }\n"
)
# Add responsive sources only when an existing component has no explicit srcset.
# Retain original src, aspect ratio, object position, alt, and all existing editorial source links.
targets={
 "src/components/ExternalProviderTourCard.tsx":"(min-width: 1024px) 340px, (min-width: 768px) 50vw, calc(100vw - 34px)",
 "src/components/AccommodationCard.tsx":"(min-width: 1024px) 176px, 45vw",
 "src/components/CityStayHub.tsx":"(min-width: 1024px) 400px, (min-width: 640px) 50vw, calc(100vw - 34px)",
 "src/components/StayHotelCard.tsx":"(min-width: 1024px) 360px, (min-width: 640px) 50vw, calc(100vw - 34px)",
 "src/components/TelAvivHotelBrowser.tsx":"(min-width: 1024px) 340px, (min-width: 640px) 50vw, calc(100vw - 34px)",
 "src/components/Guide.tsx":"(min-width: 1024px) 360px, (min-width: 640px) 50vw, 45vw",
 "src/components/PortPage.tsx":"(min-width: 1024px) 340px, 45vw",
 "src/components/ShoreReadingGuides.tsx":"(min-width: 640px) 96px, calc(100vw - 48px)",
 "src/components/TourCategoryPage.tsx":"(min-width: 1024px) 340px, 45vw",
 "src/components/TourCatalog.tsx":"(min-width: 1024px) 340px, (min-width: 768px) 50vw, calc(100vw - 34px)",
 "src/components/TravelGuide.tsx":"(min-width: 1024px) 755px, calc(100vw - 34px)",
 "src/components/AttractionsHub.tsx":"(min-width: 1024px) 340px, 45vw",
 "src/components/AttractionHubCard.tsx":"(min-width: 1024px) 340px, 45vw",
}
for name,sizes in targets.items():
    p=Path(name)
    if not p.exists():continue
    old=p.read_text()
    def rewrite(m):
        tag=m.group(0)
        if "srcSet=" in tag or "sizes=" in tag:return tag
        src=re.search(r"\bsrc=\{([^{}]+)\}",tag)
        if not src:return tag
        return tag[:src.end()]+" srcSet={stage5PhotoSrcSet("+src.group(1)+")} sizes="+json.dumps(sizes)+tag[src.end():]
    s=re.sub(r"<img\b[\s\S]*?/>",rewrite,old)
    if name.endswith("/TravelGuide.tsx"):
        s=s.replace("srcSet={responsiveSrcSet} sizes={responsiveSrcSet ?", "srcSet={responsiveSrcSet ?? stage5PhotoSrcSet(displayedPhoto.src)} sizes={(responsiveSrcSet ?? stage5PhotoSrcSet(displayedPhoto.src)) ?")
    if s!=old:
        if 'import { stage5PhotoSrcSet }' not in s:s='import { stage5PhotoSrcSet } from "@/lib/stage5-photo-variants";\n'+s
        p.write_text(s);report["components"].append(name)
hero=Path("src/components/GuideHeroMedia.tsx")
s=hero.read_text()
if "stage5PhotoSrcSet" not in s:
    s='import { stage5PhotoSrcSet } from "@/lib/stage5-photo-variants";\n'+s
    s=s.replace("srcSet={srcSet}","srcSet={srcSet ?? stage5PhotoSrcSet(src)}").replace("sizes={sizes}","sizes={sizes ?? ((srcSet ?? stage5PhotoSrcSet(src)) ? \"(min-width: 1024px) 420px, (min-width: 640px) 600px, calc(100vw - 34px)\" : undefined)}")
    hero.write_text(s);report["components"].append(str(hero))
Path("docs/STAGE5_IMAGE_OPTIMIZATION.json").write_text(json.dumps(report,indent=2)+"\n")
print("IMAGE_OPTIMIZATION",json.dumps({"originals":len(report["originals"]),"variants":sum(len(x["variants"]) for x in report["originals"]),"skipped":report["skipped"],"components":report["components"],"golan":[{"source":x["source"],"originalBytes":x["originalBytes"],"variants":x["variants"]} for x in report["originals"] if "/golan/" in x["source"]]}))
