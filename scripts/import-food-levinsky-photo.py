#!/usr/bin/env python3
"""Import Levinsky Market spice-shop photo under CC BY 2.5 (attribution required).

Source: https://commons.wikimedia.org/wiki/File:PikiWiki_Israel_9177_Levinsky_market_in_Tel_Aviv.JPG
Creator: Lior Golgher via PikiWiki Israel.  Source depicts an actual spice shop at
Levinsky Market, Tel Aviv.  Cropped/resized and converted to local 880x550 WebP.
"""
from pathlib import Path
from hashlib import md5
from urllib.request import Request,urlopen
from urllib.parse import quote
from PIL import Image,ImageOps
import io,time

name="PikiWiki_Israel_9177_Levinsky_market_in_Tel_Aviv.JPG"
digest=md5(name.encode("utf-8")).hexdigest()
urls=[
 f"https://upload.wikimedia.org/wikipedia/commons/{digest[0]}/{digest[:2]}/{quote(name)}",
 f"https://commons.wikimedia.org/wiki/Special:Redirect/file/{quote(name)}"
]
blob=None
for url in urls:
 try:
  with urlopen(Request(url,headers={"User-Agent":"IsraelTravelHub/1.0 (licensed-photo importer; https://github.com/Yeruham81/Israel-Travel-Hub)","Accept":"image/jpeg,image/*"}),timeout=30) as response: blob=response.read(8_000_000)
  with Image.open(io.BytesIO(blob)) as im: im.verify()
  print("Verified source",url,"bytes",len(blob))
  break
 except Exception as e:
  print("retry",str(e)[:250]); blob=None;time.sleep(2)
if blob is None:raise SystemExit("Wikimedia photo download failed, no unsupported image generated")
with Image.open(io.BytesIO(blob)) as original:
 im=ImageOps.exif_transpose(original).convert("RGB")
 if im.width<880 or im.height<550:raise ValueError("Image too small")
 im=ImageOps.fit(im,(880,550),method=Image.Resampling.LANCZOS,centering=(0.5,0.5))
 out=Path("public/images/food-guide/levinsky-spice-shop.webp")
 out.parent.mkdir(parents=True,exist_ok=True)
 im.save(out,"WEBP",quality=80,method=6)
with Image.open(out) as check:
 if check.size!=(880,550):raise ValueError("Invalid variant")
print(out,"bytes",out.stat().st_size,"Credit: Lior Golgher, CC BY 2.5, cropped/resized")
