import type { ConfirmedEvent } from "./israelEvents";

/**
 * Editor-reviewed traveller-facing inclusions, not an artists' nationality filter.
 *
 * A Ticketmaster catalogue listing is not proof that a performance is suitable
 * for overseas visitors. Add exact *dated editions* only after reviewing their
 * programme, language/accessibility and organiser. Never automatically approve
 * all current/future concerts by a performer name.
 */
export const TOURIST_EVENT_EDITION_APPROVALS: readonly {
  title: string;
  from: string;
  to: string;
  reason: string;
}[] = [
  { title:"Boy George", from:"2026-11-04", to:"2026-11-07", reason:"International touring artist" },
  { title:"Celtic Throne", from:"2026-11-04", to:"2026-11-19", reason:"Dance-led touring production" },
];

/** Suppress individual shows when one verified festival event provides the
 * official programme. Do not infer approval for future editions.
 */
export const FESTIVAL_EDITION_SUPPRESSIONS: readonly {
  festivalId:string;
  from:string;
  to:string;
  region:string;
  venueContains:string;
}[] = [
  {festivalId:"red-sea-jazz-2026",from:"2026-11-11",to:"2026-11-14",region:"eilat-south",venueContains:"eilat port"},
];

const key=(s:string)=>s.toLowerCase().trim().replace(/\s+/g," ");
const isTestListing=(event:ConfirmedEvent)=>
  /(?:\/event\/)(?:bdika|test|dummy)(?:\/|$)/i.test(event.sourceUrl) ||
  /^(?:test(?: event)?|dummy|winter \d{3,})$/i.test(event.title.trim());

const withinFestival=(event:ConfirmedEvent, group:(typeof FESTIVAL_EDITION_SUPPRESSIONS)[number])=>
  event.from>=group.from&&event.to<=group.to&&event.region===group.region&&
  key(event.location).includes(group.venueContains);

/** Only manually reviewed individual performances enter the main listings. */
export function touristHighlights(imported:readonly ConfirmedEvent[]):ConfirmedEvent[] {
  return imported.filter(e=>
    !isTestListing(e)&&
    !FESTIVAL_EDITION_SUPPRESSIONS.some(g=>withinFestival(e,g))&&
    TOURIST_EVENT_EDITION_APPROVALS.some(a=>key(e.title)===key(a.title)&&e.from>=a.from&&e.to<=a.to)
  );
}

