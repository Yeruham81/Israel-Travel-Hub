#!/usr/bin/env python3
"""Read-only HTML audit of all published sitemap routes. Never POST or mutate remote site."""
import collections
import concurrent.futures
import html
from html.parser import HTMLParser
import json
import os
import re
import time
from urllib.parse import urljoin, urlparse, urldefrag
from urllib.request import Request, urlopen
import xml.etree.ElementTree as ET

BASE = "https://saddlebrown-guanaco-454061.hostingersite.com"
DOMAIN = urlparse(BASE).netloc
USER_AGENT = "IsraelTravelHub-prelaunch-quality-audit/1.0"
TIMEOUT = 24
HEADERS = {"User-Agent": USER_AGENT, "Accept": "text/html,application/xml,*/*"}
TOKEN_LIMIT = 90

def get(url, method="GET"):
    last = None
    for attempt in range(3):
        try:
            req = Request(url, headers=HEADERS, method=method)
            with urlopen(req, timeout=TIMEOUT) as r:
                body = r.read(2000000 if method == "GET" else 0)
                return r.status, r.geturl(), body, r.headers.get("Content-Type", "")
        except Exception as e:
            last = e
            time.sleep(0.8 * (attempt + 1))
    return 0, url, b"", str(last)[:160]

class Doc(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = ""; self.desc = ""; self.canonical = ""; self.robots = ""
        self.h1=[];self.h2=[];self.headings=[];self.links=[];self.images=[]
        self.forms=[];self.iframe=[];self.tables=0;self.text=[]
        self._title=False;self._heading=None;self._headingtext=[];self._script=0;self._style=0
        self.meta=[];self.body_classes=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs);l=tag.lower()
        if l=="title": self._title=True
        if l in ("h1","h2","h3","h4"):
            self._heading=l;self._headingtext=[]
        if l=="script":self._script+=1
        if l=="style":self._style+=1
        if l=="meta":
            self.meta.append(a)
            key=(a.get("name") or a.get("property") or "").lower()
            if key=="description":self.desc=a.get("content","")
            if key=="robots":self.robots=a.get("content","")
        if l=="link" and a.get("rel","").lower()=="canonical":self.canonical=a.get("href","")
        if l=="a":self.links.append((a.get("href",""),a.get("aria-label","")))
        if l=="img":self.images.append(a)
        if l=="form":self.forms.append(a)
        if l=="iframe":self.iframe.append(a.get("src",""))
        if l=="table":self.tables+=1
        if l=="body":self.body_classes.append(a.get("class",""))
    def handle_endtag(self,tag):
        l=tag.lower()
        if l=="title":self._title=False
        if l==self._heading:
            t=" ".join("".join(self._headingtext).split())
            self.headings.append((l,t))
            if l=="h1":self.h1.append(t)
            if l=="h2":self.h2.append(t)
            self._heading=None;self._headingtext=[]
        if l=="script":self._script=max(0,self._script-1)
        if l=="style":self._style=max(0,self._style-1)
    def handle_data(self,data):
        if self._title:self.title+=data
        if self._heading:self._headingtext.append(data)
        if not self._script and not self._style and data.strip():self.text.append(data)

def clean_path(u):
    p=urlparse(u)
    if p.scheme not in ("http","https"):return None
    if p.netloc not in (DOMAIN, "www.israel-taxi.com","israel-taxi.com"):return None
    path=p.path or "/"
    if not path.endswith("/") and "." not in path.split("/")[-1]:path+="/"
    return path

def category(path):
    if path=="/":return "Home"
    if path.startswith("/airport-transfers/"):return "Airport services"
    if path.startswith("/accommodation/"):return "Hotels and accommodation"
    if path.startswith("/attractions/"):return "Attractions"
    if path.startswith("/tours/"):return "Tours"
    if path.startswith("/shore-excursions/"):return "Shore excursions"
    if path.startswith("/travel-blog/"):return "Travel guides"
    return "Other"

def audit_page(u):
    status,final,body,ctype=get(u)
    path=urlparse(u).path
    record={"path":path,"status":status,"redirect_to":final if u.rstrip("/")!=final.rstrip("/") else "",
      "errors":[],"warnings":[],"signals":{},"links":[],"images":[]}
    if status!=200:
        record["errors"].append("PAGE_HTTP_"+str(status))
        return record
    if "html" not in ctype.lower() and not body.lstrip().lower().startswith(b"<!doctype html"):
        record["errors"].append("PAGE_NOT_HTML")
        return record
    page=body.decode("utf-8","replace");d=Doc()
    try:d.feed(page)
    except Exception as e:
        record["errors"].append("HTML_PARSER_"+str(e)[:80]);return record
    full_text=" ".join(" ".join(d.text).split())
    title=" ".join(d.title.split())
    expected=BASE+path
    if not d.h1:record["errors"].append("NO_H1")
    if len(d.h1)>1:record["warnings"].append("MULTIPLE_H1_"+str(len(d.h1)))
    if not title:record["errors"].append("NO_TITLE")
    if not d.desc:record["warnings"].append("NO_META_DESCRIPTION")
    if d.canonical!=expected:record["errors"].append("CANONICAL_MISMATCH")
    if len(title)>65:record["warnings"].append("TITLE_LONG_"+str(len(title)))
    if len(d.desc)>170:record["warnings"].append("META_DESCRIPTION_LONG_"+str(len(d.desc)))
    if len(d.desc)<80:record["warnings"].append("META_DESCRIPTION_SHORT_"+str(len(d.desc)))
    if len(full_text)<400:record["warnings"].append("THIN_TEXT_"+str(len(full_text)))
    if re.search(r"check current fare|check the current fare|coming soon|under construction|lorem ipsum|demo (?:price|content)|sample (?:price|content)",full_text,re.I):
        record["warnings"].append("GENERIC_OR_PLACEHOLDER_COPY")
    if re.search(r"last updated 20(?:2[0-5])|updated (?:january|february|march|april|may|june|july|august|september|october|november|december) 202[0-5]",full_text,re.I):
        record["warnings"].append("OLD_EXPLICIT_UPDATED_DATE")
    if re.search(r"\buseful links?\b|\bnot a checklist\b|\beditorial snapshots?\b|\bask moshe\b",full_text,re.I):
        record["warnings"].append("HOUSE_STYLE_LEGACY_COPY")
    if path.startswith("/travel-blog/") or path.startswith("/attractions/"):
        if "Updated November 2026" not in full_text:
            record["warnings"].append("NO_UPDATED_NOVEMBER_2026")
    imgs=d.images
    missing_alt=[i for i in imgs if not (i.get("alt") or "").strip()]
    if missing_alt:record["warnings"].append("IMAGES_WITHOUT_ALT_"+str(len(missing_alt)))
    linkpaths=[]
    for href,label in d.links:
        if not href or href.startswith(("#","mailto:","tel:","javascript:")):continue
        if href.startswith("//"):href="https:"+href
        absolute=urljoin(u,href)
        p=clean_path(absolute)
        if p:linkpaths.append(p)
        if absolute.startswith(("https://www.israel-taxi.com/","http://www.israel-taxi.com/")):
            record["warnings"].append("LINK_TO_OLD_PRODUCTION_DOMAIN")
    if len(set(linkpaths))<2 and path not in ("/privacy-policy/","/terms-of-use/"):
        record["warnings"].append("VERY_FEW_INTERNAL_LINKS")
    record["links"]=sorted(set(linkpaths))
    srcs=[]
    for item in imgs:
        val=item.get("src") or item.get("data-src") or ""
        if val.startswith("/") and not val.startswith("//"):srcs.append(val.split("?")[0])
        elif val.startswith(BASE):srcs.append(urlparse(val).path)
    record["images"]=sorted(set(srcs))
    record["signals"]={
        "category":category(path),"title":title[:135],"h1":d.h1[:3],"description_length":len(d.desc),
        "text_length":len(full_text),"updated_2026":"Updated November 2026" in full_text,
        "author":bool(re.search(r"written by moshe barak",full_text,re.I)),
        "tables":d.tables,"forms":len(d.forms),"images":len(imgs),"internal_links":len(set(linkpaths)),
        "iframes":len(d.iframe),"h2_count":len(d.h2),"canonical":d.canonical,
        "robots":d.robots,"widget_signals":bool(re.search(r"travelpayouts|booking|agoda|getyourguide|viator",page,re.I)),
        "featured_hero":bool(re.search(r"(?:hero|featured|cover)",page[:250000],re.I)),
    }
    # Contextual snippets distinguish real editorial issues from
    # shared footer or decorational-image false positives.
    record["text_flags"]=[]
    patterns={
      "placeholder": r"check current fare|check the current fare|coming soon|under construction|lorem ipsum|demo (?:price|content)|sample (?:price|content)",
      "house_style": r"\\buseful links?\\b|\\bnot a checklist\\b|\\beditorial snapshots?\\b|\\bask moshe\\b",
    }
    for flag, pattern in patterns.items():
        for match in list(re.finditer(pattern,full_text,re.I))[:4]:
            record["text_flags"].append({"kind":flag,"match":match.group()[:80],"around":full_text[max(0,match.start()-65):match.end()+90]})
    record["empty_alt_imgs"]=[(i.get("src") or i.get("data-src") or "")[:250] for i in imgs if not (i.get("alt") or "").strip()][:15]
    record["warnings"]=sorted(set(record["warnings"]))
    return record

def main():
    status,final,xml,_=get(BASE+"/sitemap.xml")
    if status!=200:raise RuntimeError("Cannot load published sitemap: "+str(status)+" "+final)
    root=ET.fromstring(xml)
    urls=[x.text.strip() for x in root.iter() if x.tag.endswith("loc") and x.text]
    urls=[x for x in urls if urlparse(x).netloc==DOMAIN]
    print("AUDIT_BASE",BASE)
    print("SITEMAP_COUNT",len(urls))
    if len(urls)<80:raise RuntimeError("Published sitemap unexpectedly small")
    with concurrent.futures.ThreadPoolExecutor(max_workers=9) as pool:
        pages=list(pool.map(audit_page,urls))
    bypath={x["path"]:x for x in pages}
    internal=set(x for p in pages for x in p["links"] if x not in bypath and x not in ("/sitemap.xml","/robots.txt"))
    resources=set(x for p in pages for x in p["images"])
    def check_item(path,kind):
        stat,url,_,_=get(BASE+path,method="HEAD")
        if stat==0 or stat in (403,405,429):
            stat,url,_,_=get(BASE+path,method="GET")
        return {"path":path,"status":stat,"final":url,"kind":kind}
    # Cross-link targets can legitimately be redirect-only legacy aliases.
    # We follow redirects and only treat a non-2xx outcome as broken.
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as pool:
        link_checks=list(pool.map(lambda p:check_item(p,"internal_link"),sorted(internal)))
    badlinks=[x for x in link_checks if x["status"]!=200]
    # Images are checked with HEAD; limited sample if 600+ assets.
    with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
        image_checks=list(pool.map(lambda p:check_item(p,"image"),sorted(resources)[:700]))
    badimages=[x for x in image_checks if x["status"]!=200]
    titles=collections.defaultdict(list);descs=collections.defaultdict(list);h1s=collections.defaultdict(list)
    counts=collections.Counter(x["signals"].get("category") for x in pages)
    for x in pages:
        sig=x["signals"]
        for dic,key in [(titles,"title"),(descs,"description_length"),(h1s,"h1")]:
            pass
        if sig.get("title"):titles[sig["title"]].append(x["path"])
        if sig.get("h1"):h1s[sig["h1"][0]].append(x["path"])
    duplicates={k:v for k,v in titles.items() if len(v)>1}
    duplicate_h1={k:v for k,v in h1s.items() if len(v)>1}
    issues=collections.Counter(w for x in pages for w in x["warnings"])
    errors=collections.Counter(e for x in pages for e in x["errors"])
    print("CATEGORY_COUNTS",json.dumps(counts,ensure_ascii=False,sort_keys=True))
    print("ERROR_COUNTS",json.dumps(errors,ensure_ascii=False,sort_keys=True))
    print("WARNING_COUNTS",json.dumps(issues,ensure_ascii=False,sort_keys=True))
    print("BROKEN_INTERNAL_LINKS",json.dumps(badlinks,ensure_ascii=False)[:12000])
    print("BROKEN_LOCAL_IMAGES",json.dumps(badimages,ensure_ascii=False)[:12000])
    print("DUPLICATE_TITLES",json.dumps(duplicates,ensure_ascii=False)[:12000])
    print("DUPLICATE_H1",json.dumps(duplicate_h1,ensure_ascii=False)[:12000])
    # Produce one concise machine-readable record per page, for completeness.
    for x in pages:
        compact={"path":x["path"],"http":x["status"],"errors":x["errors"],"warnings":x["warnings"],**x["signals"]}
        print("PAGE_AUDIT",json.dumps(compact,ensure_ascii=False,separators=(",",":")))
        if x.get("text_flags") or x.get("empty_alt_imgs"):
            print("FLAG_CONTEXT",json.dumps({"path":x["path"],"flags":x.get("text_flags"),"empty_alts":x.get("empty_alt_imgs")},ensure_ascii=False,separators=(",",":")))
    print("AUDIT_COMPLETE",json.dumps({"pages":len(pages),"errors":sum(errors.values()),
      "warnings":sum(issues.values()),"badlinks":len(badlinks),"badimages":len(badimages),
      "distinct_link_targets_checked":len(link_checks),"distinct_image_assets_checked":len(image_checks)}))
if __name__=="__main__":
    main()
