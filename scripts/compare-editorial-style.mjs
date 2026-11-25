// Focused editorial comparison, not AI detection. Apply identical rules to frozen baseline and candidate.
import fs from "node:fs";
import path from "node:path";
const dirs=process.argv.slice(2);
if(dirs.length!==2)throw Error("Usage: node compare-editorial-style.mjs baseline/pages candidate/pages");
const normalize=s=>String(s??"").replace(/\s+/g," ").trim();
const key=s=>normalize(s).toLowerCase().replace(/[‘’]/g,"'");
const segmenter=new Intl.Segmenter("en",{granularity:"sentence"});
const exclusions=/^(?:Over 20 years helping|Private transport operator & local travel expert|Written by Moshe Barak|About Moshe Barak|To view this interactive map|Read Reviews on TripAdvisor|All bookings require confirmation|Some images on this website|Some links on this page)/i;
const rules=[
 ["editorial-process",/\b(?:editorial snapshots?|editorial (?:reference|selection|estimate|note|purposes?)|for editorial purposes|provider snapshots?|previously checked provider|short-lived editorial|published provider snapshots?|not (?:a|an) (?:itinerary|checklist|live (?:offer|quote|availability)|booking confirmation)|not (?:live|real-time) (?:offers?|prices?|availability|quotes?)|sources? (?:do not|does not) imply|not a specific (?:ship|operator)|not a provider speed test|not an automatic (?:addition|third stop)|not (?:a suggested|a recommended) (?:driving|walking) route|swipe (?:the|this) table|(?:pins?|markers?) (?:are|show|mark) .*? not |navigation links?, not|["“]checked["”] dates refer to|provider prices, availability and inventory were not verified|product identity, operator, advertised itinerary and duration reviewed|not live availability or confirmed entry permissions)\b/i],
 ["negation-review",/\b(?:do not assume|don't assume|cannot be assumed|not necessarily|rather than|not just|not only|not simply|not automatically|not an automatic|not interchangeable|not a substitute|not intended to|does not mean|does not imply|without assuming|avoid assuming|not every|not all|not always|not guaranteed)\b/i],
 ["hedging-review",/\b(?:where appropriate|where possible|where applicable|as appropriate|if applicable|if time and access permit|depending on your (?:plans|preferences|needs|interests)|allow for the possibility|potentially|in some cases|in many cases)\b/i],
 ["filler-review",/\b(?:each day offers a different side of Israel|the route balances memorable sights with practical transfers|room to choose the experiences that matter most to you|plan your arrivals, excursions and onward travel after choosing your hotel)\b/i],
 ["em-dash-in-prose",/\u2014/]
];
const protectedContext=/\b(?:safety|emergency|insurance|visa|ETA-IL|passport|security|border|crossing|restricted|restriction|closed|closure|religious service|wheelchair|accessibility|heat|trail|flood|bathing|swim|lifeguard|medical|legal|law|licence|license|tax|surcharge|fare|ticket|refund|cancellation|booking|confirmation|opening hours|travel advisory|travel advice|Shabbat|holiday|luggage|no entry|no service|allergy|dietary|child seat)\b/i;
const legal=/^\/(?:privacy-policy|terms-of-use|cookie-policy|disclaimer|accessibility)(?:\/|$)/i;
function scan(dir){
 const pages=fs.readdirSync(dir).filter(f=>f.endsWith(".json")).map(f=>JSON.parse(fs.readFileSync(path.join(dir,f),"utf8")));
 const all=new Map(),repeat=new Map(),counts={};
 for(const p of pages){
  const seen=new Set();
  for(const b of [{section:"SEO",tag:"title",text:p.title},{section:"SEO",tag:"description",text:p.description},...p.blocks]){
   for(const sent of segmenter.segment(normalize(b.text))){
    const s=normalize(sent.segment),k=key(s);
    if(s.length<12||seen.has(k)||exclusions.test(s)||legal.test(p.path)||b.form)continue;
    seen.add(k);
    const item=repeat.get(k)??{text:s,paths:[]};item.paths.push(p.path);repeat.set(k,item);
    const hits=rules.filter(([id,re])=>re.test(s)&&!(id==="em-dash-in-prose"&&/^(?:title|description|h[1-6]|td|th|label|summary)$/.test(b.tag)));
    if(!hits.length)continue;
    const row=all.get(k)??{text:s,paths:[],section:b.section,tag:b.tag,categories:hits.map(h=>h[0]),protected:protectedContext.test(s)};row.paths.push(p.path);all.set(k,row);
   }
  }
 }
 const findings=[...all.values()];
 const repeated=[...repeat.values()].filter(r=>r.paths.length>=3&&r.text.split(/\s+/).length>=10).sort((a,b)=>b.paths.length-a.paths.length);
 for(const [id] of rules){const f=findings.filter(x=>x.categories.includes(id));counts[id]={unique:f.length,occurrences:f.reduce((n,x)=>n+x.paths.length,0),protectedReview:f.filter(x=>x.protected).length}}
 return {pageCount:pages.length,counts,uniqueCandidates:findings.length,occurrences:findings.reduce((n,f)=>n+f.paths.length,0),repeatedReviewCandidates:repeated.length,findings,repeated};
}
const before=scan(dirs[0]),after=scan(dirs[1]);
if(before.pageCount!==120||after.pageCount!==120)throw Error("Expected 120 canonical pages in both snapshots");
const summary=x=>({pages:x.pageCount,counts:x.counts,uniqueCandidates:x.uniqueCandidates,occurrences:x.occurrences,repeatedReviewCandidates:x.repeatedReviewCandidates});
fs.writeFileSync("editorial-audit/focused-style-comparison.json",JSON.stringify({before:summary(before),after:summary(after)},null,2));
fs.writeFileSync("editorial-audit/focused-style-findings.json",JSON.stringify({before:before.findings,after:after.findings,repeatedBefore:before.repeated,repeatedAfter:after.repeated},null,2));
console.log("FOCUSED_EDITORIAL_COMPARISON",JSON.stringify({before:summary(before),after:summary(after)}));
