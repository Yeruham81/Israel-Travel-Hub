import { describe, expect, it } from "vitest";
import { CONFIRMED_EVENTS, RECURRING_FESTIVALS, filterConfirmedEvents, filterRecurringFestivals, isValidEventDay } from "./israelEvents";
import { EVENT_LINKS, eventLinks, secureEventUrl } from "./eventTicketLinks";

describe("Israel events first-release content",()=>{
  it("only includes source-backed dated editions and stable unique IDs",()=>{
    const ids=[...CONFIRMED_EVENTS,...RECURRING_FESTIVALS].map(e=>e.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(CONFIRMED_EVENTS.length).toBeGreaterThan(2);
    for(const e of CONFIRMED_EVENTS){
      expect(isValidEventDay(e.from)).toBe(true);
      expect(isValidEventDay(e.to)).toBe(true);
      expect(e.from<=e.to).toBe(true);
      expect(e.checkedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(e.sourceUrl.startsWith("https://")).toBe(true);
      expect(eventLinks(e.id).official).toBeTruthy();
    }
  });
  it("filters by actual date overlap, area and event category",()=>{
    expect(filterConfirmedEvents(CONFIRMED_EVENTS,{today:"2026-10-23",start:"2026-11-12",end:"2026-11-13"}).map(x=>x.id))
      .toEqual(["red-sea-jazz-2026","red-sea-bridge-2026"]);
    expect(filterConfirmedEvents(CONFIRMED_EVENTS,{today:"2026-10-23",start:"2026-11-12",end:"2026-11-13",region:"tel-aviv"})).toEqual([]);
    expect(filterConfirmedEvents(CONFIRMED_EVENTS,{today:"2026-10-23",region:"eilat-south",category:"music"}).map(x=>x.id))
      .toEqual(["red-sea-jazz-2026"]);
    expect(filterConfirmedEvents(CONFIRMED_EVENTS,{today:"2026-11-15"}).every(x=>x.to>="2026-11-15")).toBe(true);
  });
  it("does not treat past, invalid or invented dates as confirmed",()=>{
    expect(filterConfirmedEvents(CONFIRMED_EVENTS,{today:"2027-01-01"})).toEqual([]);
    expect(filterConfirmedEvents(CONFIRMED_EVENTS,{today:"2026-10-23",start:"2026-11-18",end:"2026-11-01"})).toEqual([]);
    expect(isValidEventDay("2027-02-29")).toBe(false);
  });
  it("keeps annual festivals without fictitious edition dates",()=>{
    expect(RECURRING_FESTIVALS.every(e=>!("from" in e||"to" in e))).toBe(true);
    expect(filterRecurringFestivals(RECURRING_FESTIVALS,"jerusalem","arts").map(x=>x.id))
      .toEqual(["israel-festival","open-house-jerusalem"]);
  });
  it("keeps ticket links separate and never invents a booking offer",()=>{
    expect(Object.keys(EVENT_LINKS).length).toBeGreaterThan(0);
    expect(eventLinks("red-sea-jazz-2026").ticket).toBeNull();
    expect(eventLinks("red-sea-jazz-2026").affiliate).toBe(false);
    expect(eventLinks("nonexistent").ticket).toBeNull();
    expect(eventLinks("ticketmaster-G5ABC","https://www.ticketmaster.co.il/event/123").official).toContain("ticketmaster.co.il");
    expect(eventLinks("ticketmaster-G5ABC","https://bad.example/event/123").official).toBeNull();
    expect(eventLinks("ticketmaster-G5ABC","https://www.ticketmaster.co.il/event/123").ticket).toBeNull();
    expect(secureEventUrl("http://insecure.example/event")).toBeNull();
    expect(secureEventUrl("https://user:pass@example.com/event")).toBeNull();
    expect(secureEventUrl("javascript:alert(1)")).toBeNull();
    expect(secureEventUrl("https://example.com/event")).toContain("https://example.com/event");
  });
});
