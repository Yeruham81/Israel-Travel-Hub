import { describe, expect, it } from "vitest";
import { linksForPage } from "@/data/registry";
import { hotelBrowseAffiliateUrl, hotelBrowseSubId } from "@/lib/hotel-affiliate";

const haifaBrowseLinks = [
  ["stay-haifa-luxury-browse", "category-haifa-luxury-expedia"],
  ["stay-haifa-boutique-browse", "category-haifa-boutique-expedia"],
  ["stay-haifa-family-browse", "category-haifa-family-expedia"],
  ["stay-haifa-mid-range-browse", "category-haifa-mid-range-expedia"],
  ["stay-haifa-budget-browse", "category-haifa-budget-expedia"],
  ["stay-haifa-browse", "hotels-haifa-expedia"],
] as const;

describe("Haifa Expedia browse buttons use verified Travelpayouts affiliate links", () => {
  it.each(haifaBrowseLinks)(
    "tracks %s with the correct affiliate offer %s",
    (pageKey, expectedOffer) => {
      const links = linksForPage(pageKey).filter(
        (link) => link.id === expectedOffer && link.partnerId === "expedia" && link.isAffiliate,
      );
      expect(links).toHaveLength(1);
      const [link] = links;
      if (!link) throw new Error("Haifa Expedia affiliate link missing for " + expectedOffer);
      expect(link.url).toMatch(/^https:\/\/expedia\.(?:tpm\.li|tpk\.lv)\/[A-Za-z0-9]+$/);
      const target = new URL(hotelBrowseAffiliateUrl(link, "stay-haifa"));
      expect(target.hostname).toMatch(/^expedia\.(?:tpm\.li|tpk\.lv)$/);
      expect(target.searchParams.get("sub_id")).toBe(hotelBrowseSubId("stay-haifa", expectedOffer));
      expect(target.searchParams.get("sub_id")).not.toContain("hotel_haifa_");
    },
  );

  it("preserves distinct click attribution for city and mid-range browse links", () => {
    const city = linksForPage("stay-haifa-browse").find(
      (link) => link.id === "hotels-haifa-expedia",
    )!;
    const mid = linksForPage("stay-haifa-mid-range-browse").find(
      (link) => link.id === "category-haifa-mid-range-expedia",
    )!;
    expect(city.url).toBe(mid.url);
    expect(hotelBrowseAffiliateUrl(city, "stay-haifa")).not.toBe(
      hotelBrowseAffiliateUrl(mid, "stay-haifa"),
    );
  });
});
