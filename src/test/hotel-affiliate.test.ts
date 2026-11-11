import { describe, expect, it } from "vitest";
import { affiliateConfig, linksForPage } from "@/data/registry";
import { hotelAffiliateUrl, hotelClickSubId } from "@/lib/hotel-affiliate";

const pilot = [
  ["jlm-ibis", "downtown", "https://expedia.tpm.li/nKcakttc"],
  ["jlm-ibis-styles", "downtown", "https://expedia.tpm.li/cfGgqry4"],
  ["jlm-david-citadel", "mamilla", "https://expedia.tpm.li/BvIrC40X"],
  ["jlm-waldorf", "mamilla", "https://expedia.tpm.li/sYbVC6QM"],
  ["jlm-hashimi", "old-city", "https://expedia.tpm.li/WU93VyPL"],
] as const;

describe("hotel-level and page-level Travelpayouts attribution", () => {
  it("has five approved, per-property Expedia deep links without duplicating their base URLs", () => {
    for (const [hotelId, area, url] of pilot) {
      const key = `hotel-${hotelId}-expedia`;
      const offer = linksForPage(`stay-area-${area}`).find((link) => link.id === key);
      expect(affiliateConfig[key]?.trackingUrl).toBe(url);
      expect(offer).toBeDefined();
      expect(offer?.url).toBe(url);
      expect(offer?.isAffiliate).toBe(true);
      expect(offer?.partnerId).toBe("expedia");
      expect(offer?.ctaLabel).toBe("Check rooms on Expedia");
    }
  });

  it("distinguishes the same hotel in the city catalog and neighborhood guide", () => {
    const booking = linksForPage("stay-area-mamilla").find((item) => item.id === "hotel-jlm-waldorf-expedia")!;
    const area = new URL(hotelAffiliateUrl(booking, "stay-area-mamilla", "jlm-waldorf"));
    const city = new URL(hotelAffiliateUrl(booking, "stay-jerusalem", "jlm-waldorf"));
    expect(area.origin + area.pathname).toBe(booking.url);
    expect(city.origin + city.pathname).toBe(booking.url);
    expect(area.searchParams.get("sub_id")).toBe("itt_stay_area_mamilla_jlm_waldorf");
    expect(city.searchParams.get("sub_id")).toBe("itt_stay_jerusalem_jlm_waldorf");
    expect(city.searchParams.get("sub_id")).not.toBe(area.searchParams.get("sub_id"));
  });

  it("distinguishes two hotels on the same page", () => {
    expect(hotelClickSubId("stay-area-downtown", "jlm-ibis"))
      .toBe("itt_stay_area_downtown_jlm_ibis");
    expect(hotelClickSubId("stay-area-downtown", "jlm-ibis-styles"))
      .toBe("itt_stay_area_downtown_jlm_ibis_styles");
  });

  it("replaces the previous short-link SubID without leaving duplicates", () => {
    const url = hotelAffiliateUrl({
      url: "https://expedia.tpm.li/Xyz123?sub_id=old_hotel_only&foo=bar",
      isAffiliate: true,
    }, "stay-jerusalem", "jlm-ibis");
    const result = new URL(url);
    expect(result.searchParams.getAll("sub_id")).toEqual(["itt_stay_jerusalem_jlm_ibis"]);
    expect(result.searchParams.get("foo")).toBe("bar");
  });

  it("does not modify non-affiliate hotel links or unrelated providers", () => {
    const direct = "https://www.expedia.com/Hotel.h17228236.Hotel-Information";
    expect(hotelAffiliateUrl({ url: direct, isAffiliate: false }, "stay-area-downtown", "jlm-ibis")).toBe(direct);
    const external = "https://another-provider.example/partner?campaign=1";
    expect(hotelAffiliateUrl({ url: external, isAffiliate: true }, "stay-jerusalem", "jlm-ibis")).toBe(external);
    expect(() => hotelClickSubId("", "jlm-ibis")).toThrow();
  });
});
