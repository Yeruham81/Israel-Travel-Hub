/**
 * Central ticket-link registry. Event content and the page layout never embed
 * affiliate parameters. New offers can be added here without changing cards.
 *
 * A ticket link is shown only when manually verified as an exact event/edition
 * URL. Affiliate links must have an explicit approved partner and checked date.
 */
export type TicketLink = {
  url:string;
  kind:"direct"|"affiliate";
  provider:string;
  verifiedAt:string;
};
export type EventLinkConfig = {
  officialUrl:string;
  ticket?:TicketLink;
};
export const EVENT_LINKS:Record<string,EventLinkConfig> = {
  "open-house-jerusalem-2026": {officialUrl:"https://batim.itraveljerusalem.com/en/"},
  "tel-aviv-festival-2026": {officialUrl:"https://telavivfestival.co.il/"},
  "red-sea-jazz-2026": {officialUrl:"https://redseajazz.co.il/"},
  "red-sea-bridge-2026": {officialUrl:"https://www.bridgeredsea.com/"},
  "jerusalem-film-festival": {officialUrl:"https://jff.org.il/en"},
  "haifa-film-festival": {officialUrl:"https://www.haifaff.co.il/eng"},
  "open-house-jerusalem": {officialUrl:"https://batim.itraveljerusalem.com/en/"},
  "red-sea-jazz": {officialUrl:"https://redseajazz.co.il/"},
  "israel-festival": {officialUrl:"https://israel-festival.org/en/"},
  "tel-aviv-pride": {officialUrl:"https://www.visit-tel-aviv.com/en/Events-Festivals"},
};
export function secureEventUrl(value:string|undefined):string|null {
  if(!value)return null;
  try{
    const parsed=new URL(value);
    if(parsed.protocol!=="https:"||!parsed.hostname||parsed.username||parsed.password)return null;
    return parsed.toString();
  }catch{return null;}
}
export function eventLinks(id:string,sourceUrl?:string){
  const item=EVENT_LINKS[id];
  // Only a source-confirmed Ticketmaster listing may use its API event URL
  // as a fallback. This remains an event-details link, NOT an affiliate offer.
  if(!item){
    const fallback=secureEventUrl(sourceUrl);
    const host=fallback?new URL(fallback).hostname.toLowerCase():"";
    const providerHost=host==="ticketmaster.com"||host.endsWith(".ticketmaster.com")||host==="ticketmaster.co.il"||host.endsWith(".ticketmaster.co.il")||host==="universe.com"||host.endsWith(".universe.com");
    return {official:id.startsWith("ticketmaster-")&&providerHost?fallback:null,ticket:null,affiliate:false,provider:null};
  }
  const official=secureEventUrl(item.officialUrl);
  const offered=item.ticket;
  const ticket=offered&&offered.provider.trim()&&/^\d{4}-\d{2}-\d{2}$/.test(offered.verifiedAt)
    ? secureEventUrl(offered.url):null;
  return {official,ticket,affiliate:Boolean(ticket&&offered?.kind==="affiliate"),provider:ticket?offered?.provider:null};
}
