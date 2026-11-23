import type { Attraction } from "@/data/attractionGuideTypes";
import { capernaumSite } from "@/data/capernaumSite";
import { tabghaSite } from "@/data/tabghaSite";
import { mountBeatitudesSite } from "@/data/mountBeatitudesSite";
import { mountTaborSite } from "@/data/mountTaborSite";
import haifaImg from "@/assets/haifa/panorama.webp";
import { akkoSite } from "@/data/akkoSite";
import lake from "@/assets/home/tiberias-lake.webp";
import { roshHanikraSite } from "@/data/roshHanikraSite";
export const northernAttractions: Record<string, Attraction> = {
"sea-of-galilee":{
 title:"Sea of Galilee: shores, historic sites and visitor guide",description:"Discover the Sea of Galilee, Tiberias, Capernaum, Tabgha, Mount of Beatitudes and scenic lakeside sites, with access and planning tips.",
 region:"Sea of Galilee",image:{src:"/images/attractions/sea-of-galilee.webp",alt:"The Sea of Galilee and surrounding hills"},duration:"Full day to two days",
 intro:"Lake Kinneret, known internationally as the Sea of Galilee, combines freshwater shores with landscapes important to Jewish and Christian history. Lakeside towns, sanctuaries and trails spread around the water, so choosing a base matters.",
 takeaway:"Start with Tiberias if you need accommodation and services, or focus on the northwestern shore if your priority is the Gospel sites. A car or driver makes multiple lake stops more practical.",
 highlights:[
 {name:"Tiberias",description:"An established lakeside city with hotels, a promenade and religious and historic sites.",tip:"Check summer heat and whether your chosen beach is designated for swimming."},
 {name:"Capernaum",description:"A lakeside archaeological and Christian pilgrimage area associated with Jesus' Galilean ministry.",tip:"The Franciscan archaeological compound and nearby Greek Orthodox church are distinct sites."},
 {name:"Tabgha",description:"Historic churches commemorate the feeding of the multitude and Peter's primacy beside the northwestern shore.",tip:"Respect worship schedules and keep shoulders and knees covered where requested."},
 {name:"Mount of Beatitudes",description:"A hilltop sanctuary overlooking the lake commemorates the Sermon on the Mount.",tip:"Hours and group access differ from the lakeside churches."},
 {name:"Nature, beaches and scenic stops",description:"Designated swimming spots, walking paths and nearby springs provide a counterpoint to religious landmarks.",tip:"Use regulated beaches and consult notices before entering water."}],
 arrival:["Tiberias is reached by intercity buses from major hubs; lakeside sites can be harder to reach independently.","Allow significant time to get between shores, especially without a car.","A private driver may be worthwhile for multiple small sites; confirm the itinerary and return timing."],
 planning:["Respect religious services, and verify closures and opening times on official sites.","Do not assume every part of the lake shore permits swimming or public access.","Hot days require water and shade breaks.","Combine two or three nearby sanctuaries to avoid a rushed visit."],
 faqs:[{q:"Is the Sea of Galilee actually a sea?",a:"No. It is a freshwater lake, also called Lake Kinneret."},{q:"Can I reach all the Christian sites by foot from Tiberias?",a:"Not comfortably. Most are spread around the northwestern shore and need road transport."},{q:"Where should I stay?",a:"Tiberias offers a broad range of accommodation and transport connections."}],
 official:[{label:"Israel Nature and Parks Authority",url:"https://en.parks.org.il/"}],
},
"akko-acre":{
 title:akkoSite.title,description:akkoSite.description,
 region:"Haifa & northern coast",image:akkoSite.hero,duration:"3–6 hours",
 intro:akkoSite.intro,
 takeaway:"Prioritise the Hospitaller Halls and one or two neighbouring paid heritage sites, then wander the market and harbour. Check combined admission arrangements rather than assuming every site shares a ticket.",
 highlights:[
 {name:"Hospitaller Halls and citadel",description:"Underground Crusader-era ceremonial and service halls reveal the scale of Akko's medieval history.",tip:"Check touring routes and opening times; ticket bundles can change."},
 {name:"Templar Tunnel",description:"A restored passage beneath the old town is linked to the medieval Templar quarter and port.",tip:"Check accessibility and seasonal opening before visiting."},
 {name:"Old market and lanes",description:"A busy mix of food stalls, shops, religious buildings and residential alleys creates the atmosphere of a living historic city.",tip:"Visit respectfully; private homes and courtyards are not tourist exhibits."},
 {name:"Ottoman Khan, walls and harbour",description:"Coastal fortifications and Ottoman-period heritage frame the fishing port and sea views.",tip:"Not all historic buildings are open for independent entry."}],
 arrival:["Akko has a train station outside the old town, followed by a local bus, taxi or a walk.","A visit from Haifa can be relatively straightforward by rail, though Shabbat services are restricted.","Old Town lanes are mostly explored on foot; arrange a road-accessible drop-off."],
 planning:["Check official attraction ticket combinations and any required reservation.","Wear stable shoes on old stone paving and stairs.","Choose half a day rather than squeezing Akko into a short stop.","Leave some time for the harbour and local food."],
 faqs:[{q:"Is Akko the same as Acre?",a:"Yes. Akko, Acre and Akka are names used for the same Mediterranean city."},{q:"Are Crusader halls underground?",a:"Several key parts of the Hospitaller complex are preserved below the present-day street level."},{q:"Can I visit Akko without a car?",a:"Yes, by train plus a local connection or walk, subject to service schedules."}],
 official:[{label:"Old Akko official heritage site",url:"https://www.akko.org.il/en/"}],
},
"rosh-hanikra":{
 title:roshHanikraSite.title,
 description:roshHanikraSite.description,
 region:roshHanikraSite.region,
 image:roshHanikraSite.hero,
 duration:"60–90 minutes, excluding travel",
 intro:roshHanikraSite.intro,
 takeaway:"Visit the sea grottoes by cable car and enjoy the coastal views. Check the operator's daily hours and weather conditions before going.",
 // The visitor article lives in RoshHanikraAttractionPage.
 highlights:[],arrival:[],planning:[],faqs:[],
 official:[
  {label:"Rosh Hanikra — official visitor information",url:roshHanikraSite.sources.info},
  {label:"Rosh Hanikra — official tickets",url:roshHanikraSite.sources.tickets},
  {label:"Rosh Hanikra — accessibility information",url:roshHanikraSite.sources.accessibility},
  {label:"Rosh Hanikra and Old Akko — combined ticket",url:roshHanikraSite.sources.comboAkko},
  {label:"Haifa–Beirut railway history",url:roshHanikraSite.sources.railway}
 ],
},
"haifa":{
 title:"Haifa visitor guide: Bahá’í Gardens, German Colony and coast",description:"Explore Haifa's Bahá’í Gardens, German Colony, Carmel views, museums, Bat Galim and the beach, with transport and visiting tips.",
 region:"Haifa & northern coast",image:{src:haifaImg,alt:"Haifa panorama above the Bahá’í Gardens"},duration:"One to two days",
 intro:"Haifa stretches from an active Mediterranean port to steep neighbourhoods on Mount Carmel. The Bahá’í Gardens and their terraces are a defining landmark, while the German Colony, museums, coastline and viewpoints offer varied city experiences.",
 takeaway:"Plan by elevation: choose a Carmel viewpoint and Bahá’í access point, then continue toward the German Colony or coast. The terraces have controlled visitor routes, so check approved viewpoints and tours rather than assuming free access from top to bottom.",
 highlights:[
 {name:"Bahá’í Gardens and Shrine",description:"Landscaped terraces climb the Carmel hillside around the Shrine of the Báb. Visitors use designated entrances and, for certain areas, guided visits.",tip:"Consult the official Gardens site for current openings, modest-dress rules and reservation requirements."},
 {name:"German Colony",description:"Historic Templer-era houses and restaurants line Ben Gurion Boulevard below the Gardens.",tip:"An excellent area for viewing the Gardens from the foot of the hill."},
 {name:"Mount Carmel and city overlooks",description:"Higher districts provide expansive views of the bay and port.",tip:"The hill can be steep; use transport between upper and lower stops."},
 {name:"Bat Galim and the coast",description:"Promenades, beach areas and maritime views give a very different perspective on the city.",tip:"Check safe bathing zones and waterfront access."},
 {name:"Museums and cultural institutions",description:"The Haifa Museums network and smaller institutions cover art, maritime heritage and local history.",tip:"Choose a museum by its current exhibition and check the specific branch hours."}],
 arrival:["Haifa has multiple railway stations along the coast, including Center HaShmona and Hof HaCarmel.","The Carmelit underground funicular, buses and taxis can help negotiate Carmel's slopes.","If arriving on a cruise, verify the passenger terminal and security gate before making plans."],
 planning:["Check official Bahá’í Gardens access procedures; the full terrace route is not an unrestricted public walkway.","Allow additional journey time between steep neighbourhoods.","Observe religious-site clothing and photography guidance.","A combination of hillside gardens and coast works better than many museum stops in one afternoon."],
 faqs:[{q:"Can I walk through all Bahá’í Garden terraces?",a:"Only designated areas and authorised guided routes may be open; see the official Gardens visit guidance."},{q:"What is the best train stop for downtown Haifa?",a:"Haifa Center HaShmona is useful for much of downtown and the German Colony, but check your exact destination."},{q:"Is Haifa easy to explore on foot?",a:"Individual districts are, but the slopes make cross-neighbourhood walks demanding."}],
 official:[{label:"Bahá’í Gardens official visits",url:"https://ganbahai.org.il/"}],
},
"mount-tabor":{
 title:mountTaborSite.title,description:mountTaborSite.description,region:mountTaborSite.region,
 image:mountTaborSite.hero,duration:mountTaborSite.duration,intro:mountTaborSite.intro,
 takeaway:"Visit the basilica and enjoy the summit views, allowing time for the winding road.",
 highlights:[],arrival:[],planning:[],faqs:[],
 official:[
  {label:"Christian Information Center — visitor hours",url:mountTaborSite.sources.cic},
  {label:"Custody of the Holy Land — sanctuary",url:mountTaborSite.sources.franciscan},
  {label:"Israel Nature and Parks Authority — access",url:mountTaborSite.sources.parks},
  {label:"KKL-JNF — summit trail",url:mountTaborSite.sources.trail},
 ],
},
// The complete Capernaum article has its own destination-page component.
// This registry entry supplies SEO/directory metadata only; do not maintain a
// second, obsolete version of its visitor instructions, highlights and FAQs.
"capernaum":{
 title:capernaumSite.title,
 description:capernaumSite.description,
 region:capernaumSite.region,
 image:capernaumSite.hero,
 duration:capernaumSite.duration,
 intro:capernaumSite.intro,
 takeaway:"Plan around the Franciscan site's midday closure and check the national park or monastery independently.",
 highlights:[], arrival:[], planning:[], faqs:[],
 official:[
  {label:"Christian Information Center — Franciscan entry and opening hours",url:capernaumSite.sources.franciscan},
  {label:"Custody of the Holy Land — Capernaum history",url:capernaumSite.sources.archaeology},
  {label:"Greek Orthodox monastery — official visiting arrangements",url:capernaumSite.sources.orthodox},
  {label:"Israel Nature and Parks Authority — official park details",url:capernaumSite.sources.park},
  {label:"Israel Nature and Parks Authority — published park hours",url:capernaumSite.sources.parkHebrew},
 ],
},
"tabgha":{
 title:tabghaSite.title,
 description:tabghaSite.description,
 region:tabghaSite.region,
 image:tabghaSite.hero,
 duration:tabghaSite.duration,
 intro:tabghaSite.intro,
 takeaway:"Start at the Church of the Multiplication, then visit the Primacy chapel beside the lake.",
 highlights:[], arrival:[], planning:[], faqs:[],
 official:[
  {label:"Benedictine Tabgha Priory — Multiplication church opening hours",url:tabghaSite.sources.multiplicationHours},
   {label:"Christian Information Center — Primacy of Peter visitor hours",url:tabghaSite.sources.primacyHours},
  {label:"Benedictine Tabgha Priory — Church of the Multiplication",url:tabghaSite.sources.benedictineHistory},
  {label:"Benedictine Tabgha Priory — visitor information",url:tabghaSite.sources.benedictineVisitors},
  {label:"Custody of the Holy Land — Primacy of Peter and Tabgha history",url:tabghaSite.sources.franciscan},
 ],
},
"mount-of-beatitudes":{
  title: mountBeatitudesSite.title,
  description: mountBeatitudesSite.description,
  region: mountBeatitudesSite.region,
  image: mountBeatitudesSite.hero,
  duration: "45–60 minutes",
  intro: mountBeatitudesSite.intro,
  takeaway: "Allow time for the octagonal church, gardens and views, and plan around the midday closure.",
  highlights: [], arrival: [], planning: [], faqs: [],
  official: [
    {label: "Christian Information Center — Mount of Beatitudes visiting hours", url: mountBeatitudesSite.sources.hours},
    {label: "Church of the Beatitudes — official history and contact", url: mountBeatitudesSite.sources.churchAbout},
    {label: "Church of the Beatitudes — pilgrim and group arrangements", url: mountBeatitudesSite.sources.visitAndGroups},
    {label: "Jesus Trail — route through the Mount of Beatitudes", url: mountBeatitudesSite.sources.jesusTrail},
  ],
}
};
