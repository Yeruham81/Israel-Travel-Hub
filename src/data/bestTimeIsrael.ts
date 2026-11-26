import type { TravelGuide } from "@/data/travelGuides";
import { migrationPhotos } from "@/data/guideMigrationPhotos";

/** Seasonal suitability describes typical outdoor comfort, not a forecast.
 * Winter floods, heat waves and holidays can override any month-level rating.
 * Avoid using this table for safety decisions or guaranteed beach conditions.
 */
export type SeasonalFit = "favourable" | "variable" | "challenging";
export type SeasonKey = "spring" | "summer" | "autumn" | "winter";
export type MonthFit = {
  month: string;
  season: SeasonKey;
  city: SeasonalFit;
  swimming: SeasonalFit;
  north: SeasonalFit;
  deadSea: SeasonalFit;
  desert: SeasonalFit;
  insight: string;
};
export const monthFits: MonthFit[] = [
  {month:"January",season:"winter",city:"variable",swimming:"challenging",north:"variable",deadSea:"favourable",desert:"favourable",insight:"Short daylight and winter rain; favour flexible city days and check desert flood alerts."},
  {month:"February",season:"winter",city:"variable",swimming:"challenging",north:"variable",deadSea:"favourable",desert:"favourable",insight:"Spring flowers may begin in some areas, but wet weather and flood risks remain."},
  {month:"March",season:"spring",city:"favourable",swimming:"challenging",north:"favourable",deadSea:"favourable",desert:"favourable",insight:"Often a strong month for walking; bring layers and watch for rain or holiday dates."},
  {month:"April",season:"spring",city:"favourable",swimming:"variable",north:"favourable",deadSea:"variable",desert:"variable",insight:"A versatile spring choice, though Passover or Easter can affect travel and sites."},
  {month:"May",season:"spring",city:"variable",swimming:"favourable",north:"variable",deadSea:"challenging",desert:"challenging",insight:"The coast warms up; exposed inland walks can already be very hot."},
  {month:"June",season:"summer",city:"variable",swimming:"favourable",north:"variable",deadSea:"challenging",desert:"challenging",insight:"Good for Mediterranean beach time; plan city walks early and use indoor breaks."},
  {month:"July",season:"summer",city:"variable",swimming:"favourable",north:"challenging",deadSea:"challenging",desert:"challenging",insight:"Summer heat and coastal humidity favour supervised beaches over desert hiking."},
  {month:"August",season:"summer",city:"variable",swimming:"favourable",north:"challenging",deadSea:"challenging",desert:"challenging",insight:"Expect hot weather and school-holiday demand; prioritise shade and shorter outings."},
  {month:"September",season:"autumn",city:"variable",swimming:"favourable",north:"variable",deadSea:"challenging",desert:"challenging",insight:"Often still feels like summer; Jewish holiday dates shift by year."},
  {month:"October",season:"autumn",city:"favourable",swimming:"variable",north:"favourable",deadSea:"variable",desert:"variable",insight:"October is a good month for combining city sightseeing and outdoor trips, although hot days and early storms are still possible."},
  {month:"November",season:"autumn",city:"variable",swimming:"challenging",north:"variable",deadSea:"favourable",desert:"favourable",insight:"Expect shorter days and more rain. Check the weather forecast before visiting the desert."},
  {month:"December",season:"winter",city:"variable",swimming:"challenging",north:"variable",deadSea:"favourable",desert:"favourable",insight:"Explore city museums and warmer southern destinations; check rain and road conditions."}
];

export const suitabilityColumns = [
  {key:"city",label:"City sightseeing",short:"Cities",description:"Jerusalem, Tel Aviv, Haifa and urban walks"},
  {key:"swimming",label:"Mediterranean beaches",short:"Beaches",description:"Typical comfort for coastal beach time, subject to lifeguards and sea conditions"},
  {key:"north",label:"Galilee outdoors",short:"North",description:"Open-air visits, gentle walks and northern scenery"},
  {key:"deadSea",label:"Dead Sea / Masada walks",short:"Outdoors",description:"Outdoor sightseeing at Masada, desert viewpoints and exposed Dead Sea stops. Not a swimming suitability rating; resort stays and water conditions vary"},
  {key:"desert",label:"Negev desert walks",short:"Desert",description:"Hiking and outdoor sightseeing, not Red Sea swimming"}
] as const;

export const seasonalFits: Record<SeasonalFit,{label:string;hint:string}> = {
  favourable:{label:"Often suitable",hint:"Usually promising for this kind of visit; check actual conditions"},
  variable:{label:"Plan around conditions",hint:"Weather, daylight or local arrangements may change the plan"},
  challenging:{label:"Less comfortable",hint:"Common heat, rain or sea-temperature limitations; alternatives may work"}
};

export type RegionalRecommendation = {
  id: string;
  name: string;
  goodMonths: string;
  note: string;
  caution: string;
  to: string;
  linkLabel: string;
};
export const regionalRecommendations: RegionalRecommendation[] = [
  {id:"jerusalem",name:"Jerusalem & the Judean Hills",goodMonths:"March–April · October–November",note:"I favour spring and mid-to-late autumn for long walks between historic neighbourhoods.",caution:"Winter evenings can be cold and wet; religious holidays affect access.",to:"/travel-blog/jerusalem-travel-guide/",linkLabel:"My Jerusalem guide"},
  {id:"coast",name:"Tel Aviv & the Mediterranean coast",goodMonths:"May–October for beach days",note:"Summer is ideal for beach holidays, while spring and autumn are more comfortable for exploring cities on foot.",caution:"Humidity, sea conditions and supervised swimming hours matter.",to:"/travel-blog/beaches-in-tel-aviv/",linkLabel:"Explore Tel Aviv beaches"},
  {id:"north",name:"Galilee & the Sea of Galilee",goodMonths:"March–May · October–November",note:"The hills turn green after the winter rains, and spring and autumn are excellent for outdoor sightseeing.",caution:"Summer can be hot and winter rain can change trails and road access.",to:"/attractions/sea-of-galilee/",linkLabel:"My Sea of Galilee guide"},
  {id:"dead-sea",name:"Dead Sea & Masada",goodMonths:"November–March for exposed sightseeing",note:"I prefer visiting Masada and exploring the desert during the cooler months.",caution:"Swimming and hotel facilities are a separate decision; never hike wadis during a flood warning.",to:"/attractions/dead-sea/",linkLabel:"Plan a Dead Sea visit"},
  {id:"eilat",name:"Eilat & the Negev",goodMonths:"October–April for desert walks",note:"The cooler half of the year usually suits Negev hikes, the Ramon Crater and Eilat-area outdoor trips.",caution:"Eilat resort and Red Sea activities can suit other seasons too; summer desert hiking is a different matter.",to:"/attractions/eilat/",linkLabel:"Eilat attractions"}
];

export const seasonDetails = [
  {id:"spring",label:"Spring",months:"March–May",title:"Spring: heritage walks, flowers and the green north",summary:"My first choice for combining Jerusalem, northern scenery and open-air archaeology.",paragraphs:[
    "March and April are often rewarding for mixed itineraries: city walks, Galilee viewpoints and archaeological sites can fit in the same trip. The landscape may still be green after winter rain. By May, daytime heat can make exposed sites less comfortable.",
    "I would build a spring trip around two or three regions, with time to explore each one. Passover and Easter dates can change accommodation demand, religious-site visits and operating hours."
  ],tip:"On a spring sightseeing day, pack a light layer and rain option as well as sun protection; check the forecast for both your morning and afternoon stops.",links:[{label:"Jerusalem walking ideas",to:"/travel-blog/jerusalem-travel-guide/"},{label:"Galilee attractions",to:"/attractions/sea-of-galilee/"}]},
  {id:"summer",label:"Summer",months:"June–August",title:"Summer: the Mediterranean coast and early starts",summary:"Ideal for beach holidays, with indoor attractions and shaded spots during the hottest hours.",paragraphs:[
    "For summer trips, I normally put the Mediterranean coast first. Tel Aviv's beaches and promenade are attractive options, but the coast can be humid and inland or desert sites may be much hotter.",
    "If you include historic sights or outdoor activities, start early, shorten exposed visits and plan an indoor alternative for the middle of the day. Children’s school holidays can raise local demand without guaranteeing any particular hotel price."
  ],tip:"For swimming, use a designated beach during lifeguard hours, follow the flags and check the sea forecast. Avoid treating midday desert hiking as a normal summer sightseeing option.",links:[{label:"Tel Aviv beaches",to:"/travel-blog/beaches-in-tel-aviv/"},{label:"Tel Aviv museums",to:"/travel-blog/museums-in-tel-aviv/"}]},
  {id:"autumn",label:"Autumn",months:"September–November",title:"Autumn: a gradual shift back to sightseeing",summary:"October and November are generally more comfortable for sightseeing than early September.",paragraphs:[
    "September can still feel like high summer, with milder weather generally arriving later in autumn. Later in the season, city walks, the Galilee and southern sightseeing often become easier to combine.",
    "The dates of Rosh Hashanah, Yom Kippur and Sukkot change each year, affecting public transport, opening hours and hotel demand. Rain returns unevenly as autumn progresses."
  ],tip:"Before booking an autumn journey, check the exact holiday calendar for your year and your hotel’s opening and cancellation terms.",links:[{label:"Israeli holidays guide",to:"/travel-blog/calendar-of-events/"},{label:"Discover Masada",to:"/attractions/masada/"}]},
  {id:"winter",label:"Winter",months:"December–February",title:"Winter: museums, cities and the southern landscape",summary:"A flexible winter visit can combine culture with carefully chosen southern excursions.",paragraphs:[
    "Winter brings cooler days, regular rain in the north and centre, and shorter daylight. I often suggest museums, markets and historic city neighbourhoods as options that can be rearranged when the forecast changes.",
    "The Dead Sea, Eilat and the Negev may offer comfortable daytime outings, but even a sunny desert location can be affected by rain upstream. Jerusalem occasionally gets snow in winter."
  ],tip:"For Dead Sea or Negev outings, check official weather warnings and national-park notices shortly before departure. Do not enter desert streambeds if there is a flood warning.",links:[{label:"Museums in Jerusalem",to:"/travel-blog/museums-in-jerusalem/"},{label:"Explore the Dead Sea",to:"/attractions/dead-sea/"}]}
] as const;

export const bestTimeGuide: TravelGuide = {
  id:"bestTime",
  updatedAt:"2026-11-21",
  title:"Best Time to Visit Israel: Weather & Seasons",
  description:"Choose the best month to visit Israel. Compare all 12 months, spring to winter, regional weather, beach trips, desert heat and Jewish holidays.",
  intro:"For a first visit with city walks and sightseeing, I usually start with spring or autumn. If you want Mediterranean beaches or desert landscapes, the answer changes. Use my month-by-month comparison to find dates that fit your itinerary.",
  answer:"March–April and October–November are useful starting points for a varied sightseeing trip, while May–September often suits Mediterranean beach plans. November–March tends to be more comfortable for exposed Dead Sea and desert sightseeing. Your best choice depends on the regions, holiday dates and forecast.",
  topics:["tips","itineraries"],
  photo:migrationPhotos["best-time-to-visit-israel"],
  facts:[
    {label:"Mixed sightseeing",text:"Compare spring and mid-to-late autumn"},
    {label:"Mediterranean beach time",text:"Look at the warmer months, then check lifeguard hours"},
    {label:"Desert outdoors",text:"Prefer cooler months, with flood-warning checks"}
  ],
  comparison:{
    caption:"Seasonal planning at a glance",
    headers:["Season","Often works well for","What to check"],
    rows:[
      ["Spring · March–May","Urban sightseeing, northern scenery, heritage sites","Spring holidays, occasional rain and May heat"],
      ["Summer · June–August","Mediterranean beaches, evening city activities","Heat, humidity, supervised bathing and demand"],
      ["Autumn · September–November","Mixed cities and sightseeing, especially later in the season","September heat, Jewish holidays and early rain"],
      ["Winter · December–February","Museums, flexible city trips and southern outings","Rain, short daylight and desert flood warnings"]
    ]
  },
  sections:seasonDetails.map(s=>({id:s.id,title:s.title,paragraphs:[...s.paragraphs],tip:s.tip})),
  checklist:[
    "Choose the regions and experiences before the month",
    "Compare holiday dates for the specific travel year",
    "Check the local forecast for each day's destinations",
    "Plan indoor alternatives for heat or rain",
    "Check desert flood and park-closure warnings",
    "Compare complete trip costs, arrival day and Shabbat transport"
  ],
  faqs:[
    {q:"What is the best month for a first visit to Israel?",a:"I usually start by comparing March–April with October–November for a mixed sightseeing trip. Check which holidays fall during your dates and which regions you want to explore."},
    {q:"Which months are best for Tel Aviv beaches?",a:"Late spring through early autumn generally gives more opportunities for warm coastal days. Conditions and supervised swimming hours vary by beach, so check current lifeguard service and sea forecasts."},
    {q:"When is it better to visit Masada and the Dead Sea?",a:"November to March often makes exposed outdoor sightseeing more comfortable than summer, although heat waves and flash floods can still affect the plan. A resort or spa stay may suit different dates."},
    {q:"Is September a good month to visit Israel?",a:"It can be, particularly for beaches, but September often remains hot inland. Jewish holidays may fall in September or October and can change transport and opening hours."},
    {q:"Is visiting Israel in winter a good idea?",a:"Yes, for flexible museums, city visits and selected southern excursions. Expect rain in some regions, shorter days and the need to check weather warnings and park notices."},
    {q:"Do Passover and the autumn Jewish holidays make travel difficult?",a:"They can change opening hours, public transport and accommodation demand. The dates shift each year, so use my Israel Holidays Calendar for the exact dates and plan transport ahead."},
    {q:"What is the cheapest time to visit Israel?",a:"There is no reliably cheapest month. Local holidays, school breaks, flight demand, events, location and current travel conditions all influence prices. Compare your full itinerary before booking."}
  ],
  related:["calendar","topTen","travelTips","jerusalemShopping","telAvivBeaches","haifaMuseums"],
  services:[
    {label:"Explore Israel's 3-day itinerary",to:"/travel-blog/israel-itinerary-3-days/"},
    {label:"Compare 7 days in Israel",to:"/travel-blog/israel-itinerary-7-days/"}
  ],
  sourceIds:["m26-ims","m26-ims-warnings","m26-hebcal","m26-parks","guide-jerusalem-tourism"]
};
