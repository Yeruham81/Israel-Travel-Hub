import { describe,expect,it } from "vitest";
import feed from "./israelEventFeed.generated.json";
import { touristHighlights } from "./touristEventSelection";
import { EVENT_RELATED_GUIDES } from "./eventRelatedGuides";
import { groupEventCards,eventScheduleRows } from "./eventDisplayGroups";
import { filterConfirmedEvents, type ConfirmedEvent } from "./israelEvents";

const source=feed.events as ConfirmedEvent[];
const reviewed=touristHighlights(source);

describe("visitor event card grouping",()=>{
  it("combines repeat performances of the same artist into one card, with all dates",()=>{
    const groups=groupEventCards(reviewed);
    expect(groups.map(x=>x.title).sort()).toEqual(["Boy George","Celtic Throne"]);
    expect(groups.find(x=>x.title==="Boy George")?.events).toHaveLength(2);
    expect(groups.find(x=>x.title==="Celtic Throne")?.events).toHaveLength(7);
    expect(groups.find(x=>x.title==="Celtic Throne")?.from).toBe("2026-11-04");
    expect(groups.find(x=>x.title==="Celtic Throne")?.to).toBe("2026-11-19");
  });
  it("retains the correct performance details per date and venue, merging only identical provider URLs",()=>{
    const celtic=groupEventCards(reviewed).find(x=>x.title==="Celtic Throne")!;
    const rows=eventScheduleRows(celtic.events);
    expect(rows).toHaveLength(4);
    const telAviv=rows.find(x=>x.location.includes("Shlomo Lahat Opera House"))!;
    expect(telAviv.events.map(x=>x.from)).toEqual(["2026-11-04","2026-11-05","2026-11-06"]);
    expect(new Set(telAviv.events.map(x=>x.sourceUrl)).size).toBe(1);
    const boy=groupEventCards(reviewed).find(x=>x.title==="Boy George")!;
    expect(eventScheduleRows(boy.events)).toHaveLength(2);
  });
  it("groups after applying region and travel-date filters",()=>{
    const telAviv=filterConfirmedEvents(reviewed,{today:"2026-10-23",region:"tel-aviv"});
    const cards=groupEventCards(telAviv);
    expect(cards.find(x=>x.title==="Celtic Throne")?.events).toHaveLength(3);
    expect(cards.find(x=>x.title==="Boy George")?.events).toHaveLength(2);
    const week=filterConfirmedEvents(reviewed,{today:"2026-10-23",start:"2026-11-05",end:"2026-11-06"});
    const weekCards=groupEventCards(week);
    expect(weekCards).toHaveLength(1);
    expect(weekCards[0]?.events.map(x=>x.from)).toEqual(["2026-11-05","2026-11-06"]);
  });
  it("never merges separately curated festivals or different years sharing the same title",()=>{
    const sample=reviewed.find(x=>x.title==="Boy George")!;
    const later:ConfirmedEvent={...sample,id:"ticketmaster-later",from:"2027-11-04",to:"2027-11-04"};
    const editorial:ConfirmedEvent={...sample,id:"manual-festival-2026",sourceName:"Editorial"};
    const cards=groupEventCards([sample,later,editorial]);
    expect(cards).toHaveLength(3);
  });
  it("uses exactly eight illustrated, existing and distinct travel guides",()=>{
    expect(EVENT_RELATED_GUIDES).toHaveLength(8);
    expect(new Set(EVENT_RELATED_GUIDES.map(x=>x.to)).size).toBe(8);
    for(const guide of EVENT_RELATED_GUIDES){
      expect(String(guide.to)).toMatch(/^\/travel-blog\//);
      expect(guide.photo.src).toBeTruthy();
      expect(guide.photo.alt).toBeTruthy();
      expect(guide.note.length).toBeGreaterThan(25);
    }
  });
});
