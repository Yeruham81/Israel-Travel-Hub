#!/usr/bin/env python3
"""Import a specifically identified CC BY-SA 3.0 Mahane Yehuda food stall photo.

Source: https://commons.wikimedia.org/wiki/File:Mahane_Yehuda_shoppers.jpg
Author: Yoninah; source photograph 2009-12-08. Source may be copied and
adapted under CC BY-SA 3.0 with attribution, share-alike and modifications notice.
Do not edit or replace the food guide's primary hero or existing local photos.
"""
from pathlib import Path
from hashlib import md5
from urllib.request import Request, urlopen
from urllib.parse import quote
import io
import time
from PIL import Image, ImageOps

filename="Mahane_Yehuda_shoppers.jpg"
hashid=md5(filename.encode("utf-8")).hexdigest()
base=f"https://upload.wikimedia.org/wikipedia/commons/{hashid[0]}/{hashid[:2]}/{quote(filename)}"
urls=[
 base,
 "https://commons.wikimedia.org/wiki/Special:Redirect/file/Mahane_Yehuda_shoppers.jpg",
]
blob=None
for url in urls:
 try:
  req=Request(url,headers={"User-Agent":"IsraelTravelHub/1.0 (photographic attribution import; https://github.com/Yeruham81/Israel-Travel-Hub)","Accept":"image/jpeg,image/*"})
  with urlopen(req,timeout=30) as resp:
   blob=resp.read(6_000_000)
  with Image.open(io.BytesIO(blob)) as check:
   check.verify()
  print("verified photo source:",url,"bytes:",len(blob))
  break
 except Exception as exc:
  print("Photo source retry",str(exc)[:260])
  time.sleep(2)
if blob is None:
 raise SystemExit("No confirmed Wikimedia image downloaded: cannot create or commit photo")
with Image.open(io.BytesIO(blob)) as raw:
 image=ImageOps.exif_transpose(raw).convert("RGB")
 if image.width<800 or image.height<500:raise ValueError("too small for 880x550 display")
 image=ImageOps.fit(image,(880,550),method=Image.Resampling.LANCZOS,centering=(0.5,0.48))
 out=Path("public/images/food-guide/mahane-yehuda-food-stalls.webp")
 out.parent.mkdir(parents=True,exist_ok=True)
 image.save(out,format="WEBP",quality=80,method=6)
with Image.open(out) as verify:
 if verify.size!=(880,550):raise ValueError("incorrect dimensions")
print("Created",out,"bytes",out.stat().st_size,"CC BY-SA 3.0; cropped/resized from original")
