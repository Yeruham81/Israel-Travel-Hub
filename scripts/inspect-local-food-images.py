#!/usr/bin/env python3
"""Read-only contact sheet for deciding whether existing food photo is appropriate."""
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
candidates=[
 "src/assets/jerusalem/mahane-yehuda.webp",
 "src/assets/travel-blog-hub/mahane-yehuda-c53a05ac52-420.webp",
 "src/assets/tours-hub/food-markets.webp",
 "public/images/jerusalem-shopping/mahane-yehuda.webp",
 "public/images/jerusalem-shopping/old-city-market.webp",
 "public/images/tel-aviv-attractions/carmel-food-tasting.webp",
 "public/images/top-ten-israel/food.webp",
 "public/images/attractions/jaffa-flea-market.webp",
]
canvas=Image.new("RGB",(1200,4*290),(246,246,241));d=ImageDraw.Draw(canvas)
for i,fn in enumerate(candidates):
  p=Path(fn);x=(i%2)*600;y=(i//2)*290
  if p.exists():
    with Image.open(p) as raw:
      picture=ImageOps.fit(ImageOps.exif_transpose(raw).convert("RGB"),(568,236),method=Image.Resampling.LANCZOS)
    canvas.paste(picture,(x+16,y+10))
    d.text((x+16,y+252),p.name,fill=(30,30,30))
    d.text((x+16,y+267),p.parent.as_posix()[:85],fill=(60,60,60))
  else:d.text((x+15,y+15),f"MISSING {fn}",fill=(200,40,40))
out=Path("/tmp/food-review");out.mkdir(parents=True,exist_ok=True)
canvas.save(out/"market-candidates.jpg",quality=86)
print("Created contact sheet of",len(candidates),"existing photos")
