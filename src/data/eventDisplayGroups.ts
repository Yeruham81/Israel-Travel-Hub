import type { ConfirmedEvent } from "./israelEvents";

export type EventDisplayGroup = {
  key:string;
  title:string;
  events:ConfirmedEvent[];
  from:string;
  to:string;
};

export type EventScheduleRow = {
  key:string;
  location:string;
  events:ConfirmedEvent[];
};

/**
 * Group independently confirmed performances by the exact show title and year.
 * Only Ticketmaster edition records are combined: the editorial festival
 * listing remains its own single card. Grouping happens AFTER applying
 * date/region/category filters, so a visitor only sees matching performances.
 */
export function groupEventCards(events:readonly ConfirmedEvent[]):EventDisplayGroup[]{
  const groups=new Map<string,ConfirmedEvent[]>();
  for(const event of events){
    const title=event.title.normalize("NFKC").trim().replace(/\s+/g," ").toLocaleLowerCase("en");
    const isSourceShow=event.id.startsWith("ticketmaster-")&&event.sourceName==="Ticketmaster";
    const key=isSourceShow?"show:"+title+":"+event.from.slice(0,4)+":"+event.category:"edition:"+event.id;
    const group=groups.get(key);
    if(group)group.push(event);
    else groups.set(key,[event]);
  }
  const sortEvent=(a:ConfirmedEvent,b:ConfirmedEvent)=>a.from.localeCompare(b.from)||
    (a.startTime||"").localeCompare(b.startTime||"")||a.location.localeCompare(b.location)||a.id.localeCompare(b.id);
  return [...groups.entries()].map(([key,group])=>{
    const sorted=[...group].sort(sortEvent);
    return {key,title:sorted[0]!.title,events:sorted,from:sorted[0]!.from,
      to:sorted.reduce((max,event)=>event.to>max?event.to:max,sorted[0]!.to)};
  }).sort((a,b)=>a.from.localeCompare(b.from)||a.title.localeCompare(b.title));
}

/**
 * If several dates share a venue AND the same official event URL, one
 * schedule line is enough. Never merge URLs that might book distinct dates.
 */
export function eventScheduleRows(events:readonly ConfirmedEvent[]):EventScheduleRow[]{
  const rows=new Map<string,ConfirmedEvent[]>();
  for(const event of events){
    const key=event.location.toLocaleLowerCase("en")+"|"+event.sourceUrl;
    const row=rows.get(key);
    if(row)row.push(event);
    else rows.set(key,[event]);
  }
  return [...rows.entries()].map(([key,shows])=>({key,location:shows[0]!.location,
    events:[...shows].sort((a,b)=>a.from.localeCompare(b.from)||
    (a.startTime||"").localeCompare(b.startTime||""))}))
    .sort((a,b)=>a.events[0]!.from.localeCompare(b.events[0]!.from)||a.location.localeCompare(b.location));
}
