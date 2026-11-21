import { recordOutboundClick } from "@/lib/outbound";

/**
 * Keep the existing anonymous local click log and forward the same non-personal
 * event to GA4 when the site's consent-aware gtag/GTM integration is installed.
 * No GA4 ID is invented or injected by this helper.
 */
export function recordAffiliateTourClick({
  pageId, productId, offerId, provider, linkUrl,
}: {
  pageId: string; productId: string; offerId: string; provider: string; linkUrl: string;
}) {
  recordOutboundClick({ pageId, productId, offerId });
  if (typeof window === "undefined") return;

  const analytics = window as Window & {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
  };
  const parameters = {
    page_id: pageId,
    product_id: productId,
    offer_id: offerId,
    provider,
    link_url: linkUrl,
  };
  try {
    if (typeof analytics.gtag === "function") {
      // gtag forwards this event to the configured GA4 destination.
      analytics.gtag("event", "outbound_click", parameters);
    } else if (Array.isArray(analytics.dataLayer)) {
      // For sites using GTM rather than gtag directly.
      analytics.dataLayer.push({ event: "outbound_click", ...parameters });
    }
  } catch {
    // Never stop a visitor's affiliate navigation because analytics is blocked.
  }
}
