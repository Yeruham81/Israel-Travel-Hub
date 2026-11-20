import type { Attraction } from "@/data/attractionGuideTypes";
import { telAvivEditorialOverview } from "@/data/telAvivAttractionsGuide";
import jaffaImg from "@/assets/tel-aviv/jaffa.webp";
export const telAvivAttractions: Record<string, Attraction> = {
"attractions-in-tel-aviv": telAvivEditorialOverview,
"jaffa":{
 title:"Old Jaffa: ancient harbour, flea market and walking guide",description:"Walk through historic Jaffa's harbour, Kedumim Square, St Peter's Church, old alleys, Summit Garden and flea market, with tips and transport advice.",
 region:"Tel Aviv & Jaffa",image:{src:jaffaImg,alt:"Historic buildings and streets in Old Jaffa"},
 intro:"Old Jaffa, or Yafo, feels very different from the modern streets just to its north. Stone passageways climb toward churches and viewpoints, while a working harbour and flea-market cafés give the area a lively modern rhythm.",
 takeaway:"Start near Kedumim Square, explore the zodiac-named lanes, visit the port and stroll to the flea market. A relaxed half-day is more rewarding than a rushed checklist, especially if you stay for sunset.",duration:"3–5 hours",
 highlights:[
 {name:"Kedumim Square and the old town",description:"Historic stone buildings, galleries and the hilltop square create a compact centre for exploring. Streets can be stepped and uneven.",tip:"Visit early if you want galleries, then enjoy open viewpoints later in the day."},
 {name:"St Peter's Church",description:"The landmark Franciscan church overlooks the harbour and reflects Jaffa's importance in Christian heritage.",tip:"Check opening and service times; dress modestly."},
 {name:"Jaffa Port",description:"The waterfront combines fishing heritage, working boats, restaurants and views along Tel Aviv's skyline.",tip:"Stay within marked public areas and choose designated viewpoints."},
 {name:"Zodiac alleys and Summit Garden",description:"Winding lanes, public art and the gardens above the sea offer short walks with dramatic coastal views.",tip:"For accessible routes, avoid assuming every alley can accommodate a stroller or wheelchair."},
 {name:"Flea market neighbourhood",description:"Vintage shops, stalls, small studios and cafés line the streets east of the old-town hill.",tip:"Individual shop hours vary; weekend dining can differ from market trading."}],
 arrival:["Reach Jaffa by Red Line light rail, local bus or taxi from central Tel Aviv.","The promenade provides an enjoyable, longer walk from southern Tel Aviv beach districts.","Use a road-accessible drop-off for private transport; the hilltop alleys remain pedestrian."],
 planning:["Plan the historical hill, port and flea market as adjacent but distinct areas.","Use comfortable shoes on stone steps.","Keep photography considerate in residential and worship spaces.","Museum tickets and any guided experiences are separate from public-street access."],
 faqs:[{q:"Is Old Jaffa free to visit?",a:"Its public lanes, harbour and viewpoints are generally free, while museums and special activities may charge."},{q:"Is Jaffa part of Tel Aviv?",a:"Yes. Tel Aviv–Yafo is one municipality with very different historic neighbourhoods."},{q:"Can I visit Jaffa with limited mobility?",a:"Some waterfront routes are relatively accessible, but the old hill includes slopes and steps."}],
 official:[{label:"Tel Aviv–Yafo Municipality",url:"https://www.tel-aviv.gov.il/en"}],
}
};