import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeTicketmasterEvent, mergePublishedEvents } from "./israel-events-source.mjs";
const valid = (changes={})=>({
 id:"G5vYZ12345x",name:"Jazz at the Port",url:"https://www.ticketmaster.com/event/123",
 dates:{start:{localDate:"2026-11-12",localTime:"20:30"},status:{code:"onsale"}},
 classifications:[{primary:true,segment:{name:"Music"},genre:{name:"Jazz"}}],
 _embedded:{venues:[{name:"Port Venue",city:{name:"Eilat"},country:{countryCode:"IL"}}]},
 ...changes,
});
test("normalizes Israeli local-date event without claiming tickets or affiliate status",()=>{
 const r=normalizeTicketmasterEvent(valid(),"2026-10-23");
 assert.ok(r);
 assert.equal(r.region,"eilat-south");
 assert.equal(r.from,"2026-11-12");
 assert.equal(r.to,"2026-11-12");
 assert.equal(r.startTime,"20:30");
 assert.equal(r.category,"music");
 assert.equal(r.sourceName,"Ticketmaster");
 assert.ok(!("ticket" in r));
});
test("rejects cancelled, postponed, non-Israeli, TBD and non-HTTPS records",()=>{
 for(const code of ["canceled","postponed","cancelled","unknown"])
   assert.equal(normalizeTicketmasterEvent(valid({dates:{start:{localDate:"2026-11-12"},status:{code}}}),"2026-10-23"),null);
 assert.equal(normalizeTicketmasterEvent(valid({_embedded:{venues:[{name:"Venue",city:{name:"Paris"},country:{countryCode:"FR"}}]}}),"2026-10-23"),null);
 assert.equal(normalizeTicketmasterEvent(valid({dates:{start:{localDate:"2026-11-12",dateTBA:true},status:{code:"onsale"}}}),"2026-10-23"),null);
 assert.equal(normalizeTicketmasterEvent(valid({url:"http://ticketmaster.com/event/1"}),"2026-10-23"),null);
});
test("avoids invented dates, unknown place, invalid IDs and untranslated titles",()=>{
 assert.equal(normalizeTicketmasterEvent(valid({dates:{start:{localDate:"2026-11-31"},status:{code:"onsale"}}}),"2026-10-23"),null);
 assert.equal(normalizeTicketmasterEvent(valid({_embedded:{venues:[]}}),"2026-10-23"),null);
 assert.equal(normalizeTicketmasterEvent(valid({id:"bad/id"}),"2026-10-23"),null);
 assert.equal(normalizeTicketmasterEvent(valid({name:"מופע חדש"}),"2026-10-23"),null);
});
test("deduplicates same venue/date/time but preserves distinct performances",()=>{
 const a=normalizeTicketmasterEvent(valid(),"2026-10-23");
 const b=normalizeTicketmasterEvent(valid({id:"G5vYZABCDE1"}),"2026-10-23");
 const c=normalizeTicketmasterEvent(valid({id:"G5vYZABCDE2",dates:{start:{localDate:"2026-11-12",localTime:"21:30"},status:{code:"onsale"}}}),"2026-10-23");
 const past=normalizeTicketmasterEvent(valid({id:"G5vYZABCDE3",dates:{start:{localDate:"2026-10-01"},status:{code:"onsale"}}}),"2026-10-23");
 const result=mergePublishedEvents([],[a,b,c,past],"2026-10-23");
 assert.equal(result.length,2);
 assert.ok(result.some(e=>e.startTime==="21:30"));
});

test("removes test inventory even if it has a valid event date and Israeli venue",()=>{
 assert.equal(normalizeTicketmasterEvent(valid({name:"Winter 345",url:"https://www.ticketmaster.co.il/event/BDIKA/ALL/en"}),"2026-10-23"),null);
 assert.equal(normalizeTicketmasterEvent(valid({url:"https://www.ticketmaster.co.il/event/TEST/ALL/en"}),"2026-10-23"),null);
});
