// Round 2: verify exact reviewed issues are gone from rendered copy, not merely from source.
import fs from "node:fs";
const dir="editorial-audit/pages";
const pages=fs.readdirSync(dir).filter(f=>f.endsWith(".json")).map(f=>JSON.parse(fs.readFileSync(dir+"/"+f,"utf8")));
if(pages.length!==120)throw Error("Expected 120 canonical pages");
const text=p=>p.blocks.map(b=>b.text).join("\n").replace(/[‘’]/g,"'").replace(/\s+/g," ");
const rules=[
 ["tour research note",/Product listings were reviewed for advertised itinerary, operator and duration/i],
 ["hotel personal-stay disclaimer",/These recommendations do not claim personal stays at every property/i],
 ["Tel Aviv hotel source process",/Property identity, location and general accommodation style checked against/i],
 ["Jerusalem hotel source process",/Property identity, location and general accommodation style cross-checked/i],
 ["Tiberias hotel source process",/Identity, location and relevant facilities or policies checked against primary operator information/i],
 ["Dead Sea hotel source process",/Property identity, location and general facilities checked against/i],
 ["shore price FAQ disclaimer",/Prices are not live quotes; confirm the total for your actual party/i],
 ["Haifa hotel source process",/Property identity, location and relevant facilities or policies checked against primary operator information/i],
 ["hotel comparison disclaimer",/This is an editorial comparison, with no live room rates/i],
 ["AI image processing details",/Optimized to WebP with separate landscape and portrait crops/i],
 ["Tel Aviv beaches comparison disclaimer",/The table describes their general appeal, not live bathing status/i],
 ["airport arrival editorial ranges",/Editorial planning ranges, not airport-reported waiting times/i],
 ["Tiberias editorial hotel matches",/These are editorial matches for different trips/i],
 ["Ashdod source check",/Product identity, named operator, itinerary and pickup\/return at Ashdod Port checked/i],
 ["Ashdod two-port listing editorial note",/The title mentions both ports, but the detailed return\/inclusions specify Ashdod/i],
 ["Haifa source check",/Product identity, named operator, itinerary and pickup\/return at Haifa Port checked/i],
 ["shore source snapshot",/The displayed USD starting price and per-person\/per-group basis were checked as an indicative snapshot/i],
 ["Tiberia Hotel source disclaimer",/The hotel website lists 17 HaNoter Street.*?Rates and inventory are not live/i],
 ["Tel Aviv hotel comparison disclaimer",/These are relative accommodation styles, not live room rates/i],
 ["Jaffa snapshot disclaimer",/Prices and review scores shown on tour cards are recently checked snapshots/i],
 ["Bethlehem source disclaimer",/These product listings describe published itineraries, not live availability or confirmed entry permissions/i]
];
const results=rules.map(([name,re])=>({name,remaining:pages.filter(p=>re.test(text(p))).map(p=>p.path)}));
const must=[
 ["/","AI-generated views of Jerusalem"],
 ["/accommodation/tiberias/","17 HaNoter Street"],
 ["/shore-excursions/ashdod/","up to four passengers on weekdays"],
 ["/shore-excursions/haifa/","up to four passengers on weekdays"],
 ["/tours/bethlehem-jericho-jordan-river/","entry eligibility for your nationality"],
 ["/travel-blog/beaches-in-tel-aviv/","lifeguard service before swimming"],
 ["/travel-blog/ben-gurion-airport-arrival-tips/","Allow additional time for security, immigration or baggage delays."],
 ["/attractions/jaffa/","Check current prices and reviews on the booking website."]
];
const retained=must.map(([url,phrase])=>({path:url,phrase,present:text(pages.find(p=>p.path===url)).includes(phrase)}));
const report={pageCount:pages.length,results,retained};
fs.writeFileSync("editorial-audit/round2-targeted-verification.json",JSON.stringify(report,null,2));
console.log("ROUND2_TARGETED_VERIFICATION",JSON.stringify(report));
if(results.some(r=>r.remaining.length)||retained.some(r=>!r.present))throw Error("Round 2 targeted copy check failed");
