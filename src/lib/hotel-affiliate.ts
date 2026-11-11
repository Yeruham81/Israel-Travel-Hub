import type { ProviderLink } from "@/data/registry";

/**
 * Track source-page + destination for Travelpayouts' short links.
 * Travelpayouts documents that ?sub_id= overrides a short link's existing SubID:
 * https://support.travelpayouts.com/hc/en-us/articles/12729746524050-How-to-dynamically-change-SubID-in-short-affiliate-links
 */
function normalizeTrackingId(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

function subId(parts: string[]): string {
  const normalized = parts.map(normalizeTrackingId);
  if (normalized.some((value) => value.length === 0)) {
    throw new Error("Tracking ID requires a source page and a destination");
  }
  return `itt_${normalized.join("_")}`;
}

function withTravelpayoutsSubId(
  booking: Pick<ProviderLink, "url" | "isAffiliate">,
  value: string,
): string {
  if (!booking.isAffiliate) return booking.url;
  let url: URL;
  try {
    url = new URL(booking.url);
  } catch {
    return booking.url;
  }
  // Keep official and unrelated affiliate URLs untouched.
  if (url.protocol !== "https:" || !(
    url.hostname === "tp.st" || url.hostname.endsWith(".tpm.li")
  )) return booking.url;
  url.searchParams.set("sub_id", value);
  return url.toString();
}

/** Exactly one identifiable hotel and one source page. */
export function hotelClickSubId(pageId: string, hotelId: string): string {
  return subId([pageId, hotelId]);
}

export function hotelAffiliateUrl(
  booking: Pick<ProviderLink, "url" | "isAffiliate">,
  pageId: string,
  hotelId: string,
): string {
  return withTravelpayoutsSubId(booking, hotelClickSubId(pageId, hotelId));
}

/**
 * For searches covering a city, area or category, track the source page and
 * the search offer. Never mislabel these clicks as individual hotel bookings.
 */
export function hotelBrowseSubId(pageId: string, offerId: string): string {
  return subId([pageId, offerId]);
}

export function hotelBrowseAffiliateUrl(
  booking: Pick<ProviderLink, "id" | "url" | "isAffiliate">,
  pageId: string,
): string {
  if (!/^(?:hotels|area|category)-[a-z0-9-]+-expedia$/.test(booking.id)) {
    return booking.url;
  }
  return withTravelpayoutsSubId(booking, hotelBrowseSubId(pageId, booking.id));
}
