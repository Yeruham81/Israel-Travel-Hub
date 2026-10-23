import autoFeed from "./israelEventFeed.generated.json";
import { touristHighlights } from "./touristEventSelection";

/**
 * Editorial events seed for the first release. Entries require a specific year,
 * named venue/area and a dated organiser or municipal source. No live availability
 * or inferred future performances. A future importer may replace/extend the list.
 */
export type EventRegion = "tel-aviv" | "jerusalem" | "haifa-north" | "eilat-south" | "other";
export type EventCategory = "music" | "arts" | "film" | "food" | "sports" | "family";
export type ConfirmedEvent = {
  id:string;
  title:string;
  from:string;
  to:string;
  region:EventRegion;
  location:string;
  category:EventCategory;
  description:string;
  visitorNote:string;
  sourceUrl:string;
  checkedAt:string;
  languageNote?:string;
  sourceName?:string;
  startTime?:string;
};
export type RecurringFestival = {
  id:string;
  title:string;
  region:EventRegion;
  category:EventCategory;
  usualSeason:string;
  description:string;
  visitorNote:string;
  sourceUrl:string;
};
export const EVENT_CHECK_DATE = "2026-10-23";
export const EVENT_FEED_CHECK_DATE:string|null = autoFeed.checkedAt;
/** Source listings expire after 8 days without a successful provider update. */
function freshImportedEvents(today:string):ConfirmedEvent[]{
  const verified=EVENT_FEED_CHECK_DATE;
  const diff=verified?Date.parse(today+"T12:00:00Z")-Date.parse(verified+"T12:00:00Z"):Infinity;
  const feedCurrent=verified&&Number.isFinite(diff)&&diff>=0&&diff<=8*86400000;
  return feedCurrent?(autoFeed.events as ConfirmedEvent[]):[];
}
/** The main view is curated for overseas visitors, not a raw concert feed. */
export function publishedEvents(today:string):ConfirmedEvent[]{
  const highlights=touristHighlights(freshImportedEvents(today));
  const fingerprints=new Set(CONFIRMED_EVENTS.map(e=>[e.title.toLowerCase().replace(/[^a-z0-9]/g,""),e.from,e.location.toLowerCase()].join("|")));
  return [...CONFIRMED_EVENTS,...highlights.filter(e=>!fingerprints.has([e.title.toLowerCase().replace(/[^a-z0-9]/g,""),e.from,e.location.toLowerCase()].join("|")))];
}

export const EVENT_REGIONS:readonly {id:"all"|EventRegion;label:string}[] = [
  {id:"all",label:"All Israel"},
  {id:"tel-aviv",label:"Tel Aviv & Jaffa"},
  {id:"jerusalem",label:"Jerusalem"},
  {id:"haifa-north",label:"Haifa & North"},
  {id:"eilat-south",label:"Eilat & South"},
  {id:"other",label:"Other areas"},
];
export const EVENT_CATEGORIES:readonly {id:"all"|EventCategory;label:string}[] = [
  {id:"all",label:"All events"},
  {id:"music",label:"Music"},
  {id:"arts",label:"Arts & culture"},
  {id:"film",label:"Film"},
  {id:"food",label:"Food"},
  {id:"sports",label:"Sports & games"},
  {id:"family",label:"Family"},
];
export const CONFIRMED_EVENTS:ConfirmedEvent[] = [
  {
    id:"open-house-jerusalem-2026",title:"Open House Jerusalem 2026",
    from:"2026-10-22",to:"2026-10-24",region:"jerusalem",
    location:"Buildings and neighbourhoods across Jerusalem",category:"arts",
    description:"Architecture and heritage visits to buildings and spaces not normally open to the public.",
    visitorNote:"Visits are free, but many tours need advance registration. Check the chosen building's time and access rules.",
    sourceUrl:"https://batim.itraveljerusalem.com/en/",checkedAt:EVENT_CHECK_DATE,
    languageNote:"Languages and guided-tour availability vary by site",
  },
  {
    id:"tel-aviv-festival-2026",title:"Tel Aviv Festival 2026",
    from:"2026-11-01",to:"2026-11-08",region:"tel-aviv",
    location:"Tel Aviv Museum of Art and other city venues",category:"music",
    description:"A multi-venue programme of music, performance and art in Tel Aviv.",
    visitorNote:"Some performances are in Hebrew. Check the programme, venue and ticket conditions for the specific show.",
    sourceUrl:"https://telavivfestival.co.il/",checkedAt:EVENT_CHECK_DATE,
    languageNote:"Programme and performance languages vary",
  },
  {
    id:"red-sea-jazz-2026",title:"Red Sea Jazz Festival 2026",
    from:"2026-11-11",to:"2026-11-14",region:"eilat-south",
    location:"Eilat port festival venues",category:"music",
    description:"A four-day festival featuring jazz performances by Israeli and international musicians.",
    visitorNote:"Concerts have individual doors and start times; check the festival timetable and return transport.",
    sourceUrl:"https://redseajazz.co.il/faq/",checkedAt:EVENT_CHECK_DATE,
  },
  {
    id:"red-sea-bridge-2026",title:"Red Sea International Bridge Festival 2026",
    from:"2026-11-12",to:"2026-11-22",region:"eilat-south",
    location:"Royal Beach Eilat and Isrotel King Solomon",category:"sports",
    description:"An international contract bridge tournament with a social programme.",
    visitorNote:"Participation requires event registration; this is a tournament rather than a spectator concert.",
    sourceUrl:"https://www.bridgeredsea.com/",checkedAt:EVENT_CHECK_DATE,
    languageNote:"International participation",
  },
];
export const RECURRING_FESTIVALS:RecurringFestival[] = [
  {
    id:"jerusalem-film-festival",title:"Jerusalem Film Festival",region:"jerusalem",category:"film",
    usualSeason:"Usually summer",description:"International and Israeli cinema with screenings and special festival programmes.",
    visitorNote:"Check film subtitles and venue details before booking.",
    sourceUrl:"https://jff.org.il/en",
  },
  {
    id:"haifa-film-festival",title:"Haifa International Film Festival",region:"haifa-north",category:"film",
    usualSeason:"Usually autumn",description:"International and Israeli film screenings, premieres and cinema events.",
    visitorNote:"Check subtitles and ticketed screening locations.",
    sourceUrl:"https://www.haifaff.co.il/eng",
  },
  {
    id:"open-house-jerusalem",title:"Open House Jerusalem",region:"jerusalem",category:"arts",
    usualSeason:"Usually autumn",description:"Free architecture and heritage tours in buildings not usually accessible.",
    visitorNote:"Many tours require advance registration; schedules differ by building.",
    sourceUrl:"https://batim.itraveljerusalem.com/en/",
  },
  {
    id:"red-sea-jazz",title:"Red Sea Jazz Festival",region:"eilat-south",category:"music",
    usualSeason:"Dates vary by edition",description:"Jazz performances in Eilat, with Israeli and international artists.",
    visitorNote:"Check individual concert dates, venues and seating.",
    sourceUrl:"https://redseajazz.co.il/",
  },
  {
    id:"israel-festival",title:"Israel Festival",region:"jerusalem",category:"arts",
    usualSeason:"Usually summer",description:"A multidisciplinary performing-arts festival based in Jerusalem.",
    visitorNote:"Performances may also take place outside Jerusalem; check each venue.",
    sourceUrl:"https://israel-festival.org/en/",
  },
  {
    id:"tel-aviv-pride",title:"Tel Aviv Pride",region:"tel-aviv",category:"arts",
    usualSeason:"Usually early summer",description:"A large annual Pride celebration with associated cultural activities.",
    visitorNote:"Parade routes and road restrictions are announced for each edition.",
    sourceUrl:"https://www.visit-tel-aviv.com/en/Events-Festivals",
  },
];
const byDate=(a:{from:string;title:string},b:{from:string;title:string})=>a.from.localeCompare(b.from)||a.title.localeCompare(b.title);
export function isValidEventDay(day:string):boolean {
  if(!/^\d{4}-\d{2}-\d{2}$/.test(day))return false;
  const date=new Date(day+"T12:00:00Z");
  return !Number.isNaN(date.getTime())&&date.toISOString().slice(0,10)===day;
}
export function filterConfirmedEvents(events:readonly ConfirmedEvent[],options:{
  today:string;start?:string|null;end?:string|null;region?:"all"|EventRegion;category?:"all"|EventCategory;
}):ConfirmedEvent[] {
  const {today,start,end,region="all",category="all"}=options;
  if(start&&(!isValidEventDay(start)||Boolean(end&&(!isValidEventDay(end)||end<start))))return [];
  return events.filter(e=>isValidEventDay(e.from)&&isValidEventDay(e.to)&&e.from<=e.to)
    .filter(e=>e.to>=today)
    .filter(e=>!start||e.to>=start)
    .filter(e=>!end||e.from<=end)
    .filter(e=>region==="all"||e.region===region)
    .filter(e=>category==="all"||e.category===category)
    .sort(byDate);
}
export function filterRecurringFestivals(events:readonly RecurringFestival[],region:"all"|EventRegion,category:"all"|EventCategory):RecurringFestival[]{
  return events.filter(e=>(region==="all"||e.region===region)&&(category==="all"||e.category===category)).sort((a,b)=>a.title.localeCompare(b.title));
}
