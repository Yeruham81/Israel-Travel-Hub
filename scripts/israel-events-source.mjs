/**
 * Pure Ticketmaster Discovery API normalizer for Israel travel listings.
 * No affiliate claims: only an approved per-event ticket registry may show a
 * ticket call-to-action. The source URL here is the original event details.
 */
const isDay=s=>typeof s==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&!Number.isNaN(Date.parse(s+"T12:00:00Z"))&&new Date(s+"T12:00:00Z").toISOString().slice(0,10)===s;
const secureUrl=s=>{try{const u=new URL(s);return u.protocol==="https:"&&!u.username&&!u.password&&u.hostname.length>0?u.href:null;}catch{return null;}};
const compact=s=>typeof s==="string"?s.replace(/\s+/g," ").trim():"";
const regionFromCity=city=>{
  const c=compact(city).toLowerCase();
  if(/tel[\s-]?aviv|yafo|jaffa|ramat gan|givatayim|herzliya|petah tikva|rishon lezion|holon|bat yam|bnei brak/.test(c))return "tel-aviv";
  if(/jerusalem|yerushalayim|mevaseret|beit shemesh/.test(c))return "jerusalem";
  if(/haifa|acre|akko|nazareth|tiberias|safed|tsfat|karmiel|nahariya|zichron|kiryat shmona|afula|galilee/.test(c))return "haifa-north";
  if(/eilat|beersheba|beer sheva|mitzpe ramon|dimona|arad|negev/.test(c))return "eilat-south";
  return "other";
};
const categoryFor=classes=>{
 const primary=Array.isArray(classes)?classes.find(c=>c?.primary)||classes[0]:null;
 const seg=(primary?.segment?.name||"").toLowerCase();
 const genre=(primary?.genre?.name||"").toLowerCase();
 if(/music|concert|jazz|rock|pop|classical/.test(seg+" "+genre))return "music";
 if(/film|cinema|movie/.test(seg+" "+genre))return "film";
 if(/food|wine|culinary/.test(seg+" "+genre))return "food";
 if(/sport|football|soccer|basketball|athletic/.test(seg+" "+genre))return "sports";
 if(/family|children|kids/.test(seg+" "+genre))return "family";
 return "arts";
};
export function normalizeTicketmasterEvent(raw,checkedAt){
 if(!raw||typeof raw!=="object"||!isDay(checkedAt))return null;
 const title=compact(raw.name), tmId=compact(raw.id);
 const date=raw.dates?.start?.localDate;
 const venue=raw._embedded?.venues?.[0];
 const country=compact(venue?.country?.countryCode).toUpperCase();
 const city=compact(venue?.city?.name);
 const place=compact(venue?.name);
 const officialUrl=secureUrl(raw.url);
 // Exclude provider test inventory even when the record has otherwise valid metadata.
 const testRecord=/\/event\/(?:bdika|test|dummy)(?:\/|$)/i.test(officialUrl||"")||/^(?:test(?: event)?|dummy|winter \d{3,})$/i.test(title);
 const status=compact(raw.dates?.status?.code).toLowerCase();
 const tba=raw.dates?.start?.dateTBA===true||raw.dates?.start?.dateTBD===true;
 const time=compact(raw.dates?.start?.localTime);
 // Never infer a country from a missing venue. Skip events whose dates or
 // status are not confirmed; explicit cancellations do not reach the listing.
 if(!/^[a-zA-Z0-9_-]{3,85}$/.test(tmId)||title.length<5||title.length>150||
    !/[A-Za-z]{3}/.test(title)||testRecord||!isDay(date)||!officialUrl||!place||!city||
    place.length>120||city.length>65||country!=="IL"||tba||
    status==="canceled"||status==="cancelled"||status==="postponed"||
    !["onsale","offsale","rescheduled"].includes(status))return null;
 if(time&&!/^\d{2}:\d{2}(:\d{2})?$/.test(time))return null;
 const category=categoryFor(raw.classifications);
 return {
   id:"ticketmaster-"+tmId,
   title,from:date,to:date,region:regionFromCity(city),
   location:place+", "+city,category,
   description:"An event listed by Ticketmaster for "+place+" in "+city+".",
   visitorNote:"Check the organiser's event page for language, door times, accessibility and ticket conditions.",
   sourceUrl:officialUrl,checkedAt,
   sourceName:"Ticketmaster",
   ...(time?{startTime:time.slice(0,5)}:{}),
 };
}
export function mergePublishedEvents(current, incoming, today){
 // Only future dated, complete entries; a snapshot must not preserve
 // cancelled/missing events after the next successful API response.
 const kept=new Map();
 for(const event of incoming){
   if(!event||event.to<today||event.from<today||!isDay(event.from)||!isDay(event.to))continue;
   if(event.from>event.to||!secureUrl(event.sourceUrl)||!event.id?.startsWith("ticketmaster-"))continue;
   if(kept.has(event.id))continue;
   const signature=[event.title.toLowerCase().replace(/[^a-z0-9]/g,""),event.from,event.location.toLowerCase().replace(/\s+/g," "),event.startTime||""].join("|");
   if([...kept.values()].some(x=>[x.title.toLowerCase().replace(/[^a-z0-9]/g,""),x.from,x.location.toLowerCase().replace(/\s+/g," "),x.startTime||""].join("|")===signature))continue;
   kept.set(event.id,event);
 }
 return [...kept.values()].sort((a,b)=>a.from.localeCompare(b.from)||a.title.localeCompare(b.title)||a.id.localeCompare(b.id));
}
