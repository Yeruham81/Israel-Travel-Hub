import collections, hashlib, json, pathlib, re, sys, xml.etree.ElementTree as ET
from html.parser import HTMLParser
from urllib.parse import urlsplit, urljoin, unquote
base, candidate = [pathlib.Path(s) for s in sys.argv[1:3]]
origin = "https://www.israel-taxi.com"
markers = re.compile(rb"lovable|tanstack_start_ts|7cd7aae9-57c0-4ced-b1fa-2f0691483fee|sandbox-npm-cache", re.I)
def digest(data): return hashlib.sha256(data).hexdigest()
def manifest(root):
    return {str(p.relative_to(root)):p for p in root.rglob("*") if p.is_file()}
old, new = manifest(base), manifest(candidate)
def urls(root):
    return [node.text for node in ET.parse(root/"sitemap.xml").getroot().findall("{*}url/{*}loc")]
old_urls, new_urls = urls(base), urls(candidate)
issues = []
def check(ok, message):
    if not ok: issues.append(message)
check(old_urls == new_urls, "Ordered sitemap URL list changed")
check((base/"robots.txt").read_bytes() == (candidate/"robots.txt").read_bytes(), "robots.txt changed")
old_html, new_html = {p for p in old if p.endswith(".html")}, {p for p in new if p.endswith(".html")}
check(old_html == new_html, "HTML paths differ: removed="+str(sorted(old_html-new_html))+" added="+str(sorted(new_html-old_html)))
def norm(value, root):
    if value is None: return ""
    # Preserve actual image/font identity even if the bundler changes its hashed filename.
    def asset(m):
        path = m.group(0)
        local = root / path.lstrip("/")
        if local.is_file(): return "/asset-content/"+digest(local.read_bytes())
        return path
    value = re.sub(r"/assets/[A-Za-z0-9_.-]+\.(?:webp|avif|png|jpe?g|svg|gif|woff2?|ico)\b",asset,value,flags=re.I)
    return re.sub(r"(?<=:)[rR][a-zA-Z0-9_]+(?=:)", "react-id", value)
class Page(HTMLParser):
    def __init__(self, root):
        super().__init__(convert_charrefs=True)
        self.root=root; self.body=False; self.skip=0; self.title=False; self.schema=False
        self.meta=[]; self.data=[]; self.structure=[]; self.jsonld=[]; self.title_parts=[]; self.links=[]; self.assets=[]; self.schemas=[]; self.forms=0; self.images=0
    def handle_starttag(self,tag,attrs):
        d=dict(attrs)
        if tag=="body": self.body=True
        if tag=="title": self.title=True
        if tag=="meta": self.meta.append(tuple(sorted((k,norm(v,self.root)) for k,v in attrs)))
        if tag=="link" and d.get("rel")=="canonical": self.meta.append(("canonical",d.get("href")))
        if tag=="script":
            self.skip+=1
            if d.get("type")=="application/ld+json": self.schema=True; self.jsonld=[]
        if tag=="style": self.skip+=1
        if tag=="script" and d.get("src"): self.assets.append(d["src"])
        if tag=="link" and d.get("rel") in ("stylesheet","modulepreload","preload") and d.get("href"): self.assets.append(d["href"])
        if not self.body or self.skip or tag=="link": return
        if tag=="form": self.forms+=1
        if tag=="img": self.images+=1
        if tag=="a" and d.get("href"): self.links.append(d["href"])
        for k in ("src","poster","data-consent-src"):
            if d.get(k): self.assets.append(d[k])
        if d.get("srcset"):
            self.assets.extend(s.strip().split()[0] for s in d["srcset"].split(",") if s.strip() and not s.strip().startswith("data:"))
        self.structure.append((tag,tuple(sorted((k,norm(v,self.root)) for k,v in attrs if k not in ("data-tsd-source",)))))
    def handle_startendtag(self,tag,attrs): self.handle_starttag(tag,attrs)
    def handle_endtag(self,tag):
        if tag=="title": self.title=False
        if tag=="script" and self.schema:
            self.schemas.append(json.loads("".join(self.jsonld))); self.schema=False
        if tag in ("script","style"): self.skip=max(0,self.skip-1); return
        if self.body and not self.skip and tag!="link": self.structure.append(("/"+tag,()))
        if tag=="body": self.body=False
    def handle_data(self,data):
        if self.title: self.title_parts.append(data)
        if self.schema: self.jsonld.append(data)
        if self.body and not self.skip:
            s=" ".join(data.split())
            if s:self.data.append(s)
def page(root,url):
    rel=urlsplit(url).path.strip("/")
    p=Page(root)
    p.feed((root/rel/"index.html").read_text(encoding="utf-8"))
    return p
def schema_norm(v,root):
    if isinstance(v,str): return norm(v,root)
    if isinstance(v,list): return [schema_norm(x,root) for x in v]
    if isinstance(v,dict): return {k:schema_norm(x,root) for k,x in v.items()}
    return v
def missing_assets(p,root,url):
    missing=set()
    for a in p.assets:
        if a.startswith(("data:","blob:","#")): continue
        u=urlsplit(urljoin(url,a))
        if u.netloc!="www.israel-taxi.com" or u.path.startswith("/api/"): continue
        path=root/unquote(u.path.lstrip("/"))
        if not path.is_file() and not (path/"index.html").is_file(): missing.add(a)
    return missing
stats=collections.Counter(); by_kind=collections.Counter()
for url in new_urls:
    a,b=page(base,url),page(candidate,url)
    for kind,x,y in [
        ("title",a.title_parts,b.title_parts),("metadata",sorted(map(str,a.meta)),sorted(map(str,b.meta))),
        ("structured data",schema_norm(a.schemas,base),schema_norm(b.schemas,candidate)),
        ("visible text",a.data,b.data),("body tags and attributes",a.structure,b.structure),
        ("links",a.links,b.links),("forms",a.forms,b.forms),("images",a.images,b.images)]:
        if x!=y:
            by_kind[kind]+=1
            if by_kind[kind]<=4:
                if isinstance(x,list) and isinstance(y,list):
                    first=next(((str(xx)[:250],str(yy)[:250]) for xx,yy in zip(x,y) if xx!=yy),("length "+str(len(x)),"length "+str(len(y))))
                    print("DIFFERENCE",url,kind,first)
                else: print("DIFFERENCE",url,kind,str(x)[:150],str(y)[:150])
    added_missing=missing_assets(b,candidate,url)-missing_assets(a,base,url)
    check(not added_missing, "New missing assets on "+url+": "+str(sorted(added_missing)))
    stats.update(pages=1, forms=b.forms, links=len(b.links), images=b.images, schemas=len(b.schemas))
print("PAGE TOTALS",dict(stats))
print("PAGE DIFFERENCES",dict(by_kind))
for kind,n in by_kind.items(): issues.append(str(n)+" pages differ in "+kind)
# Public helpers/data, images and maps must not be altered by the build migration.
for p in sorted(set(old)|set(new)):
    if p.startswith(("maps/","widgets/","images/","data/")):
        check(p in old and p in new and digest(old[p].read_bytes())==digest(new[p].read_bytes()),"Public helper/asset changed: "+p)
for name,p in new.items():
    data=p.read_bytes()
    check(not markers.search(data) and not markers.search(name.encode()),"Legacy marker in generated file "+name)
    check(not (name.endswith(".php") or name.startswith("api/") or name in (".env",".htaccess") or name.endswith(".map")),"Unexpected private/API/source-map export: "+name)
print("GENERATED FILES",len(old),len(new),"HTML",len(old_html),len(new_html))
for ext in (".js",".css",".html"):
    aa=[p.stat().st_size for k,p in old.items() if k.endswith(ext)]
    bb=[p.stat().st_size for k,p in new.items() if k.endswith(ext)]
    print("OUTPUT SIZE",ext,"before",len(aa),sum(aa),"after",len(bb),sum(bb))
print("LEGACY MARKER SCAN AND PARITY ISSUES",len(issues))
for issue in issues[:100]: print("ISSUE",issue)
if issues: sys.exit(1)
print("PASS: page content, metadata, schema, links, forms, public helpers, assets and legacy marker scan")
