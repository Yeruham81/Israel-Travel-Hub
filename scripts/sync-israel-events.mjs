/**
 * Verified Israel events snapshot updater.
 *
 * Optional GitHub Actions secret: TICKETMASTER_API_KEY
 * Without it, the script exits successfully WITHOUT changing the last snapshot.
 * No browser receives a secret and no source API is silently scraped.
 *
 * Only publish an all-new source snapshot after every API page succeeds.
 * Cancelled/postponed/TBA events never appear. Page-level validation and
 * full project CI run before the publication commit.
 */
import { readFile, writeFile } from "node:fs/promises";
import { normalizeTicketmasterEvent, mergePublishedEvents } from "./israel-events-source.mjs";

const OUTPUT=new URL("../src/data/israelEventFeed.generated.json",import.meta.url);
const ENDPOINT="https://app.ticketmaster.com/discovery/v2/events.json";
const DAY=86400000;
const todayInIsrael=()=>new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Jerusalem",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());
function checkedDay(){
 const parts=new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Jerusalem",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date());
 const part=type=>parts.find(p=>p.type===type)?.value;
 return part("year")+"-"+part("month")+"-"+part("day");
}
async function jsonPage(apiKey,day,page){
 const url=new URL(ENDPOINT);
 url.searchParams.set("apikey",apiKey);
 url.searchParams.set("countryCode","IL");
 url.searchParams.set("locale","en");
 url.searchParams.set("size","200");
 url.searchParams.set("page",String(page));
 url.searchParams.set("sort","date,asc");
 url.searchParams.set("startDateTime",day+"T00:00:00Z");
 url.searchParams.set("includeTBA","no");
 url.searchParams.set("includeTBD","no");
 const controller=new AbortController();
 const timer=setTimeout(()=>controller.abort(),20000);
 try{
   const response=await fetch(url,{headers:{Accept:"application/json"},signal:controller.signal});
   // Never include the URL (and secret key) in logs.
   if(!response.ok)throw new Error("Ticketmaster API returned HTTP "+response.status);
   const raw=await response.text();
   if(raw.length>5000000)throw new Error("Ticketmaster event response exceeded size limit");
   const data=JSON.parse(raw);
   const total=data?.page?.totalPages;
   const number=data?.page?.number;
   if(!Number.isInteger(total)||total<0||total>100000||number!==page)throw new Error("Ticketmaster pagination metadata invalid");
   if(total===0){if(page!==0)return {total:0,items:[]};return {total:0,items:[]};}
   const items=data?._embedded?.events;
   if(!Array.isArray(items))throw new Error("Ticketmaster event list missing");
   return {total,items};
 }finally{clearTimeout(timer);}
}
async function run(){
 if(process.argv.some(s=>s.startsWith("--")))throw new Error("Unexpected argument");
 const key=process.env.TICKETMASTER_API_KEY?.trim();
 if(!key){console.log("No TICKETMASTER_API_KEY configured; retaining verified snapshot and editorial event records.");return;}
 const day=checkedDay(),items=[];
 // Cap to 4 x 200 pages: avoids deep paging and excessive API load.
 const first=await jsonPage(key,day,0);
 items.push(...first.items);
 if(first.total>4)throw new Error("More than four pages of Israel events; refusing incomplete feed publication");
 for(let page=1;page<first.total;page++){
   const response=await jsonPage(key,day,page);
   if(response.total!==first.total)throw new Error("Ticketmaster pagination changed while fetching; retaining previous snapshot");
   items.push(...response.items);
 }
 const accepted=items.map(x=>normalizeTicketmasterEvent(x,day)).filter(Boolean);
 const events=mergePublishedEvents([],accepted,day);
 if(events.length>500)throw new Error("Unusually large accepted event count; refusing snapshot");
 const snapshot={checkedAt:day,source:"ticketmaster",events};
 const old=JSON.parse(await readFile(OUTPUT,"utf8"));
 if(old.source!=="ticketmaster"||!Array.isArray(old.events))throw new Error("Existing event snapshot has an unexpected schema");
 const contents=JSON.stringify(snapshot,null,2)+"\n";
 if(JSON.stringify(old)===JSON.stringify(snapshot)){console.log("Event feed unchanged ("+events.length+" verified listings)");return;}
 await writeFile(OUTPUT,contents);
 console.log("Ticketmaster Israel events refreshed: "+events.length+" valid upcoming listings ("+items.length+" source rows)");
}
run().catch(error=>{console.error("Event refresh failed safely: "+error.message);process.exitCode=1;});
