import type { BookingMode, Relationship } from "@/data/registry";

/** Shape a live API quote must have before any price may be shown as "live". None are configured yet. */
export interface LiveQuote {
  providerId: string;
  context: { productId: string; date: string; partySize: number };
  currency: string;
  basis: "per_vehicle" | "per_person" | "per_room";
  amount: number;
  inclusions: string[];
  fetchedAt: string; // ISO timestamp
  expiresAt: string; // ISO timestamp
}

/** A live price is displayable only if it matches the traveler's exact context and has not expired. */
export function isDisplayableLiveQuote(
  q: LiveQuote | null | undefined,
  ctx: { productId: string; date: string; partySize: number },
  now: Date = new Date(),
): boolean {
  if (!q) return false;
  if (q.context.productId !== ctx.productId || q.context.date !== ctx.date || q.context.partySize !== ctx.partySize) return false;
  if (!q.currency || !q.basis || !(q.amount > 0) || !q.fetchedAt) return false;
  return new Date(q.expiresAt).getTime() > now.getTime();
}

export const modeNote: Record<Exclude<BookingMode, "live_quote">, string> = {
  provider_redirect: "Opens the provider's site, where you see current prices for your dates.",
  provider_inquiry: "You request a quote on the provider's site. Nothing is sent from this page.",
  official_info: "Official site with current information and reservations.",
};

export const relationshipLabel: Record<Relationship, string> = {
  publisher_operator: "Publisher's own local business",
  independent_operator: "Tour operator",
  booking_platform: "Booking platform",
  official: "Official / authorized",
};
