#!/usr/bin/env python3
"""Render website-ready WebP images from original licensed photos supplied by the user."""
from __future__ import annotations
import io
import json
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path
from PIL import Image, ImageOps, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'src/assets/home'
HEADER = {'User-Agent': 'IsraelTravelHubEditorial/1.0 (licensed photo optimization)'}
SOURCES = [
    ('jaffa-port', 'PikiWiki Israel 68163 port of jaffa.jpg', 0xffcf477266ceedfd, 5000, (.50,.51)),
    ('masada-dead-sea', 'Israel-2013-Aerial 18-Masada.jpg', 0x0f0f1f674e9e3c35, 4500, (.62,.56)),
    ('caesarea-coast', 'קיסריה העתיקה.jpg', 0xff3f0f3fb5970f3e, 5000, (.55,.54)),
    ('ramon-crater', 'CamelHillMitzpeRamonMar262022 03.jpg', 0x61890fe7f83c7f5b, 4300, (.42,.51)),
]
VARIANTS = [
    ('large', (2880,1440), 1600000),
    ('medium',(1920,960), 900000),
    ('mobile',(900,1125), 460000),
]

def get(url, limit):
    last = None
    for attempt in range(5):
        try:
            request = urllib.request.Request(url, headers=HEADER)
            with urllib.request.urlopen(request, timeout=100) as stream:
                data = stream.read(limit + 1)
            if not 100 < len(data) <= limit:
                raise RuntimeError('Unexpected response size ' + str(len(data)))
            return data
        except Exception as exc:
            last = exc
            if attempt < 4:
                time.sleep(2 + attempt * 2)
    raise RuntimeError('Could not download: ' + url) from last

def dhash(image):
    grey = image.convert('L').resize((9,8),Image.Resampling.LANCZOS)
    px = list(grey.get_flattened_data())
    value = 0
    for y in range(8):
        for x in range(8):
            value = (value << 1) | (px[9*y+x] > px[9*y+x+1])
    return value

def import_original(slug, title, expected, min_width):
    query = urllib.parse.urlencode({'action':'query','format':'json','formatversion':'2',
        'titles':'File:' + title, 'prop':'imageinfo','iiprop':'url|size|extmetadata'})
    metadata=json.loads(get('https://commons.wikimedia.org/w/api.php?' + query, 1000000))
    info=metadata['query']['pages'][0]['imageinfo'][0]
    original_url=info['url']
    if not original_url.startswith('https://upload.wikimedia.org/'):
        raise RuntimeError('Wrong source host for ' + title)
    if info['width'] < min_width or info['height'] < 2100:
        raise RuntimeError('Insufficient resolution for ' + title + ': ' + str(info['width']))
    license_name=re.sub(r'<[^>]+>','',info['extmetadata'].get('LicenseShortName',{}).get('value',''))
    if not (license_name.startswith('CC BY ') or license_name.startswith('CC BY-SA ')):
        raise RuntimeError('Unsupported source licence ' + title + ' = ' + license_name)
    photo_bytes=get(original_url, 34000000)
    with Image.open(io.BytesIO(photo_bytes)) as src:
        image=ImageOps.exif_transpose(src).convert('RGB')
        image.load()
    dist=(dhash(image) ^ expected).bit_count()
    print('Original:', title, 'dimensions:', image.size, 'bytes:', len(photo_bytes),
        'license:', license_name, 'dHash distance:', dist, flush=True)
    if dist > 18:
        raise RuntimeError('Original photograph does not match uploaded reference: ' + title)
    return image

def write_variants(image, slug, center):
    OUTPUT.mkdir(parents=True,exist_ok=True)
    for name,dims,budget in VARIANTS:
        anchor = center if name != 'mobile' else (center[0],.52)
        picture=ImageOps.fit(image,dims,method=Image.Resampling.LANCZOS,centering=anchor)
        picture=picture.filter(ImageFilter.UnsharpMask(radius=.82,percent=55,threshold=3))
        content=b''
        for quality in (87,85,83,81,79,77,75,73,70,67,64,61):
            buff=io.BytesIO()
            picture.save(buff,format='WEBP',quality=quality,method=6)
            content=buff.getvalue()
            if len(content) <= budget:
                break
        if len(content) > budget:
            raise RuntimeError('Failed file budget: '+slug+' '+name+' '+str(len(content)))
        dest=OUTPUT/('hero-refresh-'+slug+'-v3-'+name+'.webp')
        dest.write_bytes(content)
        with Image.open(dest) as im:
            assert im.format == 'WEBP' and im.size == dims
        print('OUTPUT',dest.relative_to(ROOT),dims,len(content),'quality',quality,flush=True)

if __name__ == '__main__':
    for slug,title,hash_value,min_width,center in SOURCES:
        photo=import_original(slug,title,hash_value,min_width)
        write_variants(photo,slug,center)
        time.sleep(.5)
    assert len(list(OUTPUT.glob('hero-refresh-*-v3-*.webp'))) == 12
    print('SUCCESS: 12 WebP images from 4 verified full-resolution originals',flush=True)
