/**
 * Anonymous outbound click events (preview demonstration only).
 * These are CLICKS, not bookings. No contact details or flight data are stored.
 */
export interface OutboundClickEvent {
  event: "outbound_click";
  pageId: string;
  productId: string;
  offerId: string;
  at: string;
}

const KEY = "itt_outbound_clicks_v1";

export function recordOutboundClick(e: Omit<OutboundClickEvent, "event" | "at">) {
  if (typeof window === "undefined") return;
  try {
    const list: OutboundClickEvent[] = JSON.parse(localStorage.getItem(KEY) || "[]");
    list.push({ event: "outbound_click", at: new Date().toISOString(), ...e });
    localStorage.setItem(KEY, JSON.stringify(list.slice(-200)));
  } catch {
    /* storage unavailable */
  }
}

export function readOutboundClicks(): OutboundClickEvent[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function relFor(isAffiliate: boolean) {
  return isAffiliate ? "sponsored noopener noreferrer" : "noopener noreferrer";
}
