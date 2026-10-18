import type { Attraction } from "@/data/attractionGuideTypes";
import coast from "@/assets/home/tel-aviv-coast.webp";
import jaffaImg from "@/assets/tel-aviv/jaffa.webp";
export const telAvivAttractions: Record<string, Attraction> = {
"attractions-in-tel-aviv":{
 title:"Best attractions in Tel Aviv: beaches, markets and culture",description:"Explore Tel Aviv attractions from Old Jaffa and Carmel Market to the beaches, Neve Tzedek, Rothschild Boulevard and leading museums.",
 region:"Tel Aviv & Jaffa",image:{src:coast,alt:"Tel Aviv Mediterranean coastline and promenade"},
 intro:"Tel Aviv is a patchwork of beach life, lively street markets, modern design and older neighbourhoods. Most central sights are best enjoyed on foot in small groups rather than driving between each landmark.",
 takeaway:"For a first visit, spend time by the sea, explore Old Jaffa, wander Carmel Market and Neve Tzedek, and choose one museum or Bauhaus architecture walk. Group places by area instead of trying to cover the full city in a day.",duration:"1–3 days",
 highlights:[
 {name:"Beaches and seaside promenade",description:"The continuous seafront connects swimming areas, cafés, parks and views toward Jaffa. Central beaches are lively, while other stretches are quieter.",tip:"Swim only in designated areas under active lifeguard supervision; avoid the sea in dangerous conditions."},
 {name:"Carmel Market, Kerem HaTeimanim and Neve Tzedek",description:"Food stalls and market lanes blend into older residential streets, small cafés and carefully restored early-Tel Aviv architecture.",tip:"Market stalls often close for Shabbat; restaurants have their own schedules."},
 {name:"Rothschild Boulevard and the White City",description:"Bauhaus-era buildings, shaded streets and modern cafés make the boulevard a good introduction to the city's built heritage.",tip:"For architecture, take time to look along nearby side streets as well as the boulevard itself."},
 {name:"Tel Aviv Museum of Art",description:"A major modern and contemporary art institution with collections and temporary exhibitions near the city's cultural district.",tip:"Verify temporary exhibitions and reservation details on the official museum website."},
 {name:"Yarkon Park and northern waterfront",description:"Green areas and the redeveloped Old Port give northern Tel Aviv a contrasting, more recreational feel.",tip:"Choose this area if you have extra time; travel from Jaffa to the north can take a while."}],
 arrival:["Ben Gurion Airport trains stop at inland Tel Aviv stations, not the beachfront. Add a final local connection.","Buses, Red Line light rail, walking and taxis serve central neighbourhoods; routes vary on Shabbat.","Most central sightseeing does not require a rental car, which can be difficult to park."],
 planning:["Pair the beach with nearby neighbourhoods rather than making repeated cross-city trips.","Take water and shade breaks in hot weather.","Museums and businesses set independent hours; check holiday changes.","For Jaffa, plan for cobblestone lanes and steps."],
 faqs:[{q:"What are the best free things to do in Tel Aviv?",a:"Seafront walks, public beaches, neighbourhood architecture and park visits are generally free; facilities and museums can charge."},{q:"Is Tel Aviv walkable?",a:"Individual areas are very walkable, although distances between Jaffa and the northern districts are significant."},{q:"What works on Saturday?",a:"Beaches and walking remain options; many shops and public transport services follow special weekend schedules."}],
 official:[{label:"Tel Aviv Museum of Art",url:"https://www.tamuseum.org.il/en/"}],
},
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