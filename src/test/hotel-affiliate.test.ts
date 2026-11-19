import { describe, expect, it } from "vitest";
import { affiliateConfig, linksForPage, providerLinks } from "@/data/registry";
import { neighborhoodHotelAdditions } from "@/data/neighborhoodHotels";
import { hotelAffiliateUrl, hotelBrowseAffiliateUrl, hotelBrowseSubId, hotelClickSubId } from "@/lib/hotel-affiliate";

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

  it("uses a unique verified Expedia Travelpayouts deep link for every hotel", () => {
    expect(neighborhoodHotelAdditions).toHaveLength(29);
    for (const hotel of neighborhoodHotelAdditions) {
      const key = `hotel-${hotel.id}-expedia`;
      const booking = providerLinks.find((link) => link.id === key);
      const expectedShortLink = affiliateConfig[key]?.trackingUrl;
      expect(booking?.providerName, key).toBe("Expedia");
      expect(expectedShortLink, key).toMatch(
        hotel.id === "jlm-paamonim"
          ? /^https:\/\/expedia\.tpk\.lv\/[a-zA-Z0-9]{8}$/
          : /^https:\/\/expedia\.tpm\.li\/[a-zA-Z0-9]{8}$/,
      );
      expect(booking?.url, key).toBe(expectedShortLink);
      expect(booking?.isAffiliate, key).toBe(true);
      expect(booking?.ctaLabel).toBe("Check rooms on Expedia");
    }
    const allHotelOffers = providerLinks.filter((link) => /^hotel-.*-expedia$/.test(link.id));
    expect(allHotelOffers).toHaveLength(88);
    expect(allHotelOffers.every((link) => link.isAffiliate)).toBe(true);
    expect(new Set(allHotelOffers.map((link) => link.url)).size).toBe(allHotelOffers.length);
    for (const offer of allHotelOffers) {
      const hotelId = offer.id.slice("hotel-".length, -"-expedia".length);
      const sourcePage = offer.pageIds[0]!;
      const destination = new URL(hotelAffiliateUrl(offer, sourcePage, hotelId));
      expect(["expedia.tpm.li", "expedia.tpk.lv"]).toContain(destination.hostname);
      expect(destination.searchParams.getAll("sub_id")).toEqual([hotelClickSubId(sourcePage, hotelId)]);
      expect(destination.origin + destination.pathname).toBe(offer.url);
    }
  });

  it("tracks Paamonim separately in Downtown and in the Jerusalem city hotel catalog", () => {
    const booking = linksForPage("stay-area-downtown").find(
      (item) => item.id === "hotel-jlm-paamonim-expedia",
    )!;
    expect(booking.isAffiliate).toBe(true);
    expect(booking.url).toBe("https://expedia.tpk.lv/wdsf1D6t");
    const area = new URL(hotelAffiliateUrl(booking, "stay-area-downtown", "jlm-paamonim"));
    const city = new URL(hotelAffiliateUrl(booking, "stay-jerusalem", "jlm-paamonim"));
    expect(area.origin + area.pathname).toBe(booking.url);
    expect(city.origin + city.pathname).toBe(booking.url);
    expect(area.searchParams.getAll("sub_id")).toEqual(["itt_stay_area_downtown_jlm_paamonim"]);
    expect(city.searchParams.getAll("sub_id")).toEqual(["itt_stay_jerusalem_jlm_paamonim"]);
    expect(area.searchParams.get("sub_id")).not.toBe(city.searchParams.get("sub_id"));
  });

  it("tracks city/area/category searches by the source page and the search destination, not a hotel", () => {
    const offers = providerLinks.filter((link) => /^(?:hotels|area|category)-[a-z0-9-]+-expedia$/.test(link.id));
    expect(offers).toHaveLength(27);
    for (const booking of offers) {
      expect(booking.isAffiliate).toBe(true);
      const pageId = booking.pageIds[0]!;
      const href = hotelBrowseAffiliateUrl(booking, pageId);
      const url = new URL(href);
      expect(url.origin + url.pathname).toBe(booking.url);
      expect(url.searchParams.get("sub_id")).toBe(hotelBrowseSubId(pageId, booking.id));
      expect(url.searchParams.getAll("sub_id")).toHaveLength(1);
    }
    const sample = offers.find((link) => link.id === "area-mamilla-expedia")!;
    const area = hotelBrowseAffiliateUrl(sample, "stay-area-mamilla");
    const city = hotelBrowseAffiliateUrl(sample, "stay-jerusalem");
    expect(area).not.toBe(city);
    expect(new URL(area).searchParams.get("sub_id")).toBe("itt_stay_area_mamilla_area_mamilla_expedia");
    expect(new URL(city).searchParams.get("sub_id")).toBe("itt_stay_jerusalem_area_mamilla_expedia");
  });

  it("leaves unrelated Expedia hotel deep links and other partner links untouched by general browse tracking", () => {
    const base = "https://expedia.tpm.li/nKcakttc";
    expect(hotelBrowseAffiliateUrl({ id: "hotel-jlm-ibis-expedia", url: base, isAffiliate: true }, "stay-jerusalem")).toBe(base);
    expect(hotelBrowseAffiliateUrl({ id: "area-downtown-expedia", url: "https://www.expedia.com/foo", isAffiliate: false }, "stay-area-downtown")).toBe("https://www.expedia.com/foo");
    expect(hotelBrowseAffiliateUrl({ id: "airport-kiwitaxi", url: "https://kiwitaxi.tpm.li/anything", isAffiliate: true }, "stay-jerusalem")).toBe("https://kiwitaxi.tpm.li/anything");
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
