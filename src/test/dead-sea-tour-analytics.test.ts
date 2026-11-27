import "@/test/consent-fixture";
import { afterEach, describe, expect, it, vi } from "vitest";
import { recordAffiliateTourClick } from "@/lib/tour-analytics";

const event = {
  pageId: "attractions-dead-sea",
  productId: "jslm-deadsea-masada-viator",
  offerId: "jslm-deadsea-masada-viator",
  provider: "Viator",
  linkUrl: "https://viator.tpm.li/ccE2RHo7",
};
const analytics = window as Window & {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: Array<Record<string, unknown>>;
};

afterEach(() => {
  delete analytics.gtag;
  delete analytics.dataLayer;
  localStorage.clear();
});

describe("consent-aware Dead Sea affiliate click measurement", () => {
  it("preserves the local record and sends the same anonymous event to an installed GA4 tag", () => {
    const gtag = vi.fn();
    analytics.gtag = gtag;
    recordAffiliateTourClick(event);
    expect(gtag).toHaveBeenCalledWith("event", "outbound_click", {
      page_id: event.pageId,
      product_id: event.productId,
      offer_id: event.offerId,
      provider: event.provider,
      link_url: event.linkUrl,
    });
    const saved = JSON.parse(localStorage.getItem("itt_outbound_clicks_v1") || "[]");
    expect(saved[0]).toMatchObject({
      event: "outbound_click",
      pageId: event.pageId,
      productId: event.productId,
    });
  });

  it("uses the GTM dataLayer when gtag is not installed", () => {
    analytics.dataLayer = [];
    recordAffiliateTourClick(event);
    expect(analytics.dataLayer).toContainEqual({
      event: "outbound_click",
      page_id: event.pageId,
      product_id: event.productId,
      offer_id: event.offerId,
      provider: event.provider,
      link_url: event.linkUrl,
    });
  });

  it("does not throw or invent an analytics destination before GA4/GTM is configured", () => {
    expect(() => recordAffiliateTourClick(event)).not.toThrow();
    expect(JSON.parse(localStorage.getItem("itt_outbound_clicks_v1") || "[]")).toHaveLength(1);
  });
});
