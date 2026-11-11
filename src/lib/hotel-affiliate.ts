import type { ProviderLink } from "@/data/registry";

/**
 * Travelpayouts supports an overriding ?sub_id= parameter on its short links.
 * Keep one verified deep link per property; add the source page at render time.
 * Never add query parameters to a hotel operator's official, non-affiliate URL.
 *
 * Examples:
 *   itt_stay_area_mamilla_jlm_waldorf
 *   itt_stay_jerusalem_jlm_waldorf
 *
 * Source: https://support.travelpayouts.com/hc/en-us/articles/12729746524050-
 * How-to-dynamically-change-SubID-in-short-affiliate-links
 */
export function hotelClickSubId(pageId: string, hotelId: string): string {
  const normalize = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  const page = normalize(pageId);
  const hotel = normalize(hotelId);
  if (!page || !hotel) throw new Error("Source page and hotel ID are required for affiliate tracking");
  return `itt_${page}_${hotel}`;
}

export function hotelAffiliateUrl(
  booking: Pick<ProviderLink, "url" | "isAffiliate">,
  pageId: string,
  hotelId: string,
): string {
  if (!booking.isAffiliate) return booking.url;
  let url: URL;
  try {
    url = new URL(booking.url);
  } catch {
    return booking.url;
  }
  // Limit this behavior to Travelpayouts short links, whose documented
  // ?sub_id= override is supported. Never rewrite unrelated partner URLs.
  if (url.protocol !== "https:" || !(
    url.hostname === "tp.st" || url.hostname.endsWith(".tpm.li")
  )) return booking.url;
  url.searchParams.set("sub_id", hotelClickSubId(pageId, hotelId));
  return url.toString();
}
