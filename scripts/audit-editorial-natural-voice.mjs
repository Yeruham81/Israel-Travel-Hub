#!/usr/bin/env node
// Read-only editorial review. Heuristics propose review candidates, not AI authorship.
import fs from "node:fs";
import path from "node:path";
import { JSDOM } from "jsdom";
const root=".output/public", out="editorial-audit", origin=process.env.VITE_CANONICAL_ORIGIN;
fs.mkdirSync(out,{recursive:true});
const norm=s=>String(s??"").replace(/[\u00a0\s]+/g," ").trim();
const key=s=>norm(s).toLowerCase().replace(/[‘’]/g,"'").replace(/[“”]/g,'"');
const walk=(dir)=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const sitemap=[...fs.readFileSync(root+"/sitemap.xml","utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
const exports=walk(root).filter(f=>f.endsWith("/index.html")).map(f=>({file:f,url:"/"+path.relative(root,path.dirname(f)).replaceAll("\\","/").replace(/\/$/,"")+(path.dirname(f)===root?"":"/")})).filter(x=>!/^\/(?:api|maps|widgets|assets)\//.test(x.url));
const paths=new Set(exports.map(e=>e.url));
if(sitemap.some(p=>!paths.has(p)))throw Error("Missing sitemap route");
const src=walk("src").filter(f=>/\.(tsx?|mdx?)$/.test(f)&&!/(?:\/test(?:s|-utils)?\/|\/generated\/|\.test\.|\.spec\.|routeTree\.gen)/.test(f)).map(f=>({file:f,lines:fs.readFileSync(f,"utf8").split("\n").map(l=>key(l.replace(/<[^>]*>/g," ").replace(/\\['"]/g,m=>m[1])))}));
const legal=/^\/(?:privacy-policy|terms-of-use|cookie-policy|disclaimer|accessibility)(?:\/|$)/i;
const rules=[
 ["editorial-instruction",5,/\b(?:editorial snapshot|editorial (?:reference|selection|estimate|note|purposes?)|for editorial purposes|not (?:a|an) (?:itinerary|checklist|guarantee|live (?:offer|quote|availability)|booking confirmation)|not (?:live|real-time) (?:offers?|prices?|availability|quotes?)|sources? (?:do not|does not) imply|not a specific (?:ship|operator)|not a provider speed test|not an automatic (?:addition|third stop)|not (?:a suggested|a recommended) (?:driving|walking) route|swipe (?:the|this) table|select any numbered stop|(?:pins?|markers?) (?:are|show|mark) .*? not |navigation links?, not|ratings? (?:and .*?)?(?:were|was) verified|illustrative (?:example|snapshot))\b/i,"Remove editorial-process wording or state the visitor-facing fact directly."],
 ["unnecessary-negation",3,/\b(?:do not assume|don't assume|cannot be assumed|not necessarily|rather than|instead of|not just|not only|not simply|not automatically|not an automatic|not interchangeable|not a substitute|not intended to|does not mean|does not imply|without assuming|avoid assuming|is not (?:a|an) |are not (?:a|an) |not every|not all|not always|not guaranteed|not included)\b/i,"Prefer a positive, concrete instruction; retain genuine restrictions, inclusions and factual contrasts."],
 ["negative-qualification",2,/\b(?:not|never|cannot|can't|must not|do not|does not|don't|doesn't|no longer|no guarantee|no access|no entry|no service)\b/i,"Review context; retain meaningful facts, prohibitions and safety information."],
 ["generic-promotional",4,/\b(?:journey of discovery|make the most of (?:your|the)|explor(?:e|ing) .*? with confidence|travel with confidence|getting around with confidence|unforgettable (?:journey|experience|memories)|memorable (?:sights|landscapes|experiences|journeys)|something for everyone|rich tapestry|hidden gems|seamless|stress-free|hassle-free|your journey starts here|a different side of Israel|your itinerary your own|turn your stay into|right base for your stay|smoother (?:trip|journey|arrival)|travel smarter|whether you(?:'re| are) (?:looking|planning|traveling|travelling)|from .*? to .*? and beyond)\b/i,"Delete filler or replace with named places, actual decisions, timings or local advice."],
 ["hedging",2,/\b(?:if time and access permit|if time permits|where appropriate|where possible|where applicable|depending on your (?:plans|preferences|needs|interests)|as appropriate|if applicable|when permitted|when available|may (?:vary|depend|require|be subject)|subject to (?:availability|confirmation|change)|can make a difference|generally|typically|in most cases|in many cases|in some cases|potentially|allow for the possibility)\b/i,"State a concrete condition or practical decision; retain uncertainty that is real."],
 ["verify-without-help",3,/\b(?:check (?:current|the latest|exact|official|site-specific|individual)|verify (?:current|the latest|schedules|opening|access|your)|confirm (?:current|the latest|your exact|opening|access|the actual)|recheck|check .*? before (?:your visit|going|departure|setting out|booking))\b/i,"Supply the stable useful fact when available; retain current checks for changing conditions."],
 ["generic-planning",1,/\b(?:practical (?:tips|advice|guidance|guide|information|planning|local)|realistic (?:route|itinerary|plan)|at a glance|plan ahead|allow extra time|suits? your (?:needs|plans|visit|trip|interests)|tailored to your|worth knowing|choose the (?:option|route|base) that (?:fits|suits)|memorable|explore|discover)\b/i,"Check recurrence and specificity; ordinary uses may be entirely appropriate."],
 ["long-dash",1,/[\u2014\u2013]/,"Replace parenthetical dash with comma, colon or separate sentence when natural. Retain number/date ranges and proper typography."],
 ["owner-voice",4,/\b(?:our (?:guides?|services?|team|drivers?|airport transfers?|recommendations?)|we (?:recommend|offer|provide|suggest|specialize|specialise)|ask Moshe|contact Moshe)\b/i,"Review owner voice; distinguish true quotations, business/legal wording and third-party references."]
];
const protectedFact=/\b(?:safety|emergency|insurance|visa|ETA-IL|passport|security|border|crossing|restricted|restriction|closed|closure|religious service|worship|wheelchair|accessib|heat|trail|flood|bathing|swim|lifeguard|medical|health|police|legal|law|licen[cs]e|tax|surcharge|fare|ticket|refund|cancellation|booking|confirmation|opening hours|travel advisory|travel advice|Shabbat|holidays?|not allowed|not open|no entry|no service|dietary|allerg|child seat|luggage)\b/i;
const requiredCopy=/Some images on this website were generated using artificial intelligence|Some links on this page are affiliate links|All bookings require confirmation|cookie consent|privacy policy|terms of use/i;
const patterns=["practical","realistic","memorable","explore","discover","whether","rather than","with confidence","smoother","plan ahead","allow extra time","your exact dates","at a glance","make the most of"];
const segmentation=new Intl.Segmenter("en",{granularity:"sentence"});
function blocks(html){
 const doc=new JSDOM(html).window.document;
 const title=norm(doc.title), description=norm(doc.querySelector('meta[name=description]')?.content), canonical=doc.querySelector('link[rel=canonical]')?.href??"";
 // Remove repeated layout chrome, invisible text and technical content; retain in-page headers and editorial asides.
 doc.querySelectorAll("script,style,noscript,template,svg,iframe,nav,footer,.site-sidebar,.sr-only,[hidden],[aria-hidden=true],body>header,body > div > header.sticky,header.sticky, [role=dialog]").forEach(n=>n.remove());
 const body=doc.querySelector("main")??doc.body;
 const seen=new Set(),rows=[];let heading="";
 const nodes=body.querySelectorAll("h1,h2,h3,h4,h5,h6,p,li,td,th,dt,dd,figcaption,summary,blockquote,label,div,span");
 for(const n of nodes){
  if(n.closest("form")&&!n.matches("p"))continue;
  if(n.matches("div,span")&&(n.querySelector("h1,h2,h3,h4,h5,h6,p,li,td,th,dt,dd,figcaption,summary,blockquote,div")||!n.textContent?.trim()))continue;
  if(n.matches("span")&&n.closest("p,li,td,th,dt,dd,figcaption,summary,blockquote,h1,h2,h3,h4,h5,h6"))continue;
  if(n.matches("li,td,dd,blockquote")&&n.querySelector("p,li,td,dd,blockquote"))continue;
  const text=norm(n.textContent);
  if(text.length<12||text.length>2500||seen.has(key(text)))continue;
  if(n.matches("h1,h2,h3,h4,h5,h6"))heading=text;
  seen.add(key(text));
  rows.push({section:heading,tag:n.tagName.toLowerCase(),text,form:!!n.closest("form"),links:[...n.querySelectorAll("a")].map(a=>({text:norm(a.textContent),href:a.getAttribute("href")}))});
 }
 return {title,description,canonical,blocks:rows};
}
const pages=[], occurrences=new Map(), all=[];
for(const entry of exports.sort((a,b)=>a.url.localeCompare(b.url))){
 const html=fs.readFileSync(entry.file,"utf8"),p=blocks(html);
 // Ignore redirect stubs and non-canonical special error pages; list them explicitly.
 if(!p.canonical||new URL(p.canonical,origin).pathname!==entry.url){pages.push({path:entry.url,status:"noncanonical",canonical:p.canonical});continue}
 const row={path:entry.url,inSitemap:sitemap.includes(entry.url),title:p.title,description:p.description,blocks:p.blocks.length,words:0,legal:legal.test(entry.url),findings:0,termCounts:{},live:"not-checked"};
 const pieces=[{section:"SEO",tag:"title",text:p.title,links:[]},{section:"SEO",tag:"description",text:p.description,links:[]},...p.blocks];
 const pageSeen=new Set();
 for(const b of pieces){
  if(!b.text||requiredCopy.test(b.text))continue;
  for(const sentence of [...segmentation.segment(b.text)].map(x=>norm(x.segment))){
   if(sentence.length<12||pageSeen.has(key(sentence)))continue;pageSeen.add(key(sentence));row.words+=sentence.split(" ").length;
   const k=key(sentence),occ=occurrences.get(k)??{text:sentence,pages:new Set(),sections:new Set()};
   occ.pages.add(entry.url);occ.sections.add(b.section);occurrences.set(k,occ);
   for(const term of patterns){const matches=k.match(new RegExp("\\b"+term+"\\b","g"));if(matches)row.termCounts[term]=(row.termCounts[term]??0)+matches.length;}
   const hit=rules.filter(([id,weight,re])=>re.test(sentence));
   if(!hit.length)continue;
   const fact=protectedFact.test(sentence)||row.legal||b.form;
   const strong=hit.some(h=>h[0]==="editorial-instruction"||h[0]==="generic-promotional"||h[0]==="owner-voice");
   const severity=fact?"protect/review":strong?"high":hit.some(h=>h[1]>=3)?"medium":"low";
   all.push({path:entry.url,section:b.section,tag:b.tag,text:sentence,context:b.text,links:b.links,categories:hit.map(h=>h[0]),severity,protected:fact,action:hit.map(h=>h[3]).join(" ")});
   row.findings++;
  }
 }
 row.status="scanned";pages.push(row);
 // Per-page normalized corpus including headings, paragraphs, FAQ and table text.
 fs.mkdirSync(out+"/pages",{recursive:true});
 fs.writeFileSync(out+"/pages/"+(entry.url==="/"?"home":entry.url.replace(/^\/|\/$/g,"").replaceAll("/","__"))+".json",JSON.stringify({path:entry.url,...p},null,2));
}
// Repetition across distinct pages, excluding normal short UI labels and factual ranges.
const repeated=[...occurrences.values()].filter(x=>x.pages.size>=3&&x.text.split(/\s+/).length>=7).sort((a,b)=>b.pages.size-a.pages.size).map(x=>({text:x.text,count:x.pages.size,pages:[...x.pages],sections:[...x.sections]}));
const repeats=new Map(repeated.map(x=>[key(x.text),x.count]));
const cache=new Map();
function locate(s){
 const k=key(s);if(cache.has(k))return cache.get(k);
 const probes=[k,k.slice(0,Math.min(k.length,85))].filter(x=>x.length>=28);
 const matches=[];
 for(const probe of probes){for(const f of src){for(let i=0;i<f.lines.length;i++){if(f.lines[i].includes(probe)){matches.push({file:f.file,line:i+1,match:probe===k?"exact":"prefix"});if(matches.length>=8)break}}if(matches.length>=8)break}if(matches.length)break}
 cache.set(k,matches);return matches;
}
for(const f of all){f.repeatedOnPages=repeats.get(key(f.text))??1;f.source=locate(f.text);}
// Direct checks of the published copy against the clean export. No content mutation.
let stop=false;
for(const p of pages.filter(p=>p.status==="scanned")){
 if(stop){p.live="not-checked-after-rate-limit";continue}
 try{
  const r=await fetch(origin+p.path,{headers:{"User-Agent":"IsraelTravelHub-EditorialAudit/1.0","Cache-Control":"no-cache"},redirect:"follow",signal:AbortSignal.timeout(20000)});
  if(r.status===429){p.live="429";stop=true;continue}
  if(!r.ok){p.live="http-"+r.status;continue}
  const local=JSON.parse(fs.readFileSync(out+"/pages/"+(p.path==="/"?"home":p.path.replace(/^\/|\/$/g,"").replaceAll("/","__"))+".json","utf8")),live=blocks(await r.text());
  const a=new Set(local.blocks.map(b=>key(b.text))),b=new Set(live.blocks.map(b=>key(b.text)));
  const missing=[...a].filter(t=>!b.has(t)),extra=[...b].filter(t=>!a.has(t));
  p.live=local.title===live.title&&local.description===live.description&&local.canonical===live.canonical&&missing.length===0&&extra.length===0?"match":"difference";
  if(p.live==="difference")p.liveDiff={missing:missing.slice(0,10),extra:extra.slice(0,10),missingCount:missing.length,extraCount:extra.length};
 }catch(e){p.live="error: "+String(e).slice(0,120)}
 await new Promise(r=>setTimeout(r,500));
}
const unique=new Map();
for(const f of all){const k=key(f.text),existing=unique.get(k);if(existing){existing.paths.push(f.path);continue}unique.set(k,{...f,paths:[f.path]})}
const rank={high:0,medium:1,"protect/review":2,low:3};
const findings=[...unique.values()].sort((a,b)=>rank[a.severity]-rank[b.severity]||b.repeatedOnPages-a.repeatedOnPages||a.path.localeCompare(b.path));
const countBy=(xs,fn)=>xs.reduce((o,x)=>{const k=fn(x);o[k]=(o[k]??0)+1;return o},{});
const counts={sitemap:sitemap.length,exports:exports.length,scanned:pages.filter(p=>p.status==="scanned").length,excluded:pages.filter(p=>p.status!=="scanned"),live:countBy(pages.filter(p=>p.status==="scanned"),p=>p.live),occurrences:all.length,unique:findings.length,severity:countBy(findings,f=>f.severity),repeatedSentences:repeated.length,category:countBy(findings.flatMap(f=>f.categories),x=>x),terms:pages.reduce((o,p)=>{for(const [t,n] of Object.entries(p.termCounts??{}))o[t]=(o[t]??0)+n;return o},{})};
fs.writeFileSync(out+"/summary.json",JSON.stringify(counts,null,2));
fs.writeFileSync(out+"/page-inventory.json",JSON.stringify(pages,null,2));
fs.writeFileSync(out+"/findings.json",JSON.stringify(findings,null,2));
fs.writeFileSync(out+"/occurrences.json",JSON.stringify(all,null,2));
fs.writeFileSync(out+"/repetition.json",JSON.stringify(repeated,null,2));
const csvCell=x=>'"'+String(x??"").replaceAll('"','""')+'"';
fs.writeFileSync(out+"/findings.csv",["Priority,Category,Page,Section,Current copy,Pages affected,Source,Review action,Protected context",...findings.map(f=>[f.severity,f.categories.join("; "),f.path,f.section,f.text,f.paths.join("; "),f.source.map(s=>s.file+":"+s.line+" ("+s.match+")").join("; "),f.action,f.protected].map(csvCell).join(","))].join("\n")+"\n");
const high=all.filter(f=>f.severity==="high"||f.severity==="medium");
const priority=pages.filter(p=>p.status==="scanned").map(p=>({...p,high:high.filter(f=>f.path===p.path&&f.severity==="high").length,medium:high.filter(f=>f.path===p.path&&f.severity==="medium").length})).sort((a,b)=>b.high-a.high||b.medium-a.medium);
fs.writeFileSync(out+"/priority-pages.json",JSON.stringify(priority,null,2));
fs.writeFileSync(out+"/review.md",["# Editorial natural-voice audit","Review candidates only. No claims of AI authorship. Protected factual/legal/safety copy needs manual review; do not blanket-delete negations or ranges.","## Coverage",JSON.stringify(counts),"## Highest-priority candidates",...findings.filter(f=>f.severity==="high").map(f=>"- "+f.path+" | "+f.section+" | "+f.text+" | "+f.action+" | "+f.source.map(s=>s.file+":"+s.line).join(", "))].join("\n")+"\n");
console.log("EDITORIAL_SUMMARY",JSON.stringify(counts));
console.log("EDITORIAL_PRIORITY",JSON.stringify(priority.slice(0,25).map(p=>({path:p.path,high:p.high,medium:p.medium,words:p.words,live:p.live}))));
for(const f of findings.filter(f=>f.severity==="high").slice(0,70))console.log("EDITORIAL_FINDING",JSON.stringify({path:f.path,section:f.section,text:f.text,categories:f.categories,affected:f.paths.length,source:f.source.slice(0,2)}));
for(const f of repeated.slice(0,25))console.log("EDITORIAL_REPEAT",JSON.stringify(f));
if(counts.scanned<sitemap.length)throw Error("Incomplete canonical sitemap coverage");
