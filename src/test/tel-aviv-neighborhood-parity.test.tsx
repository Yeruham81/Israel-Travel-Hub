import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { telAvivAreaGuides } from "@/data/content";
import { hotelsForArea, linksForPage } from "@/data/registry";
import { hotelAffiliateUrl, hotelBrowseAffiliateUrl, hotelClickSubId, hotelBrowseSubId } from "@/lib/hotel-affiliate";
import { TelAvivHotelTile } from "@/components/TelAvivHotelBrowser";

describe("Tel Aviv neighborhood hotel-page parity and Travelpayouts links", () => {
  it("covers all eight neighborhoods with four individually tracked Expedia hotel links each", () => {
    expect(telAvivAreaGuides).toHaveLength(8);
    const seen = new Set<string>();

    for (const area of telAvivAreaGuides) {
      const pageId = `stay-area-${area.id}`;
      const hotels = hotelsForArea(area.id, "telaviv");
      expect(hotels, area.id).toHaveLength(4);
      for (const hotel of hotels) {
        expect(seen.has(hotel.id), hotel.id).toBe(false);
        seen.add(hotel.id);
        const key = `hotel-${hotel.id}-expedia`;
        const booking = linksForPage(pageId).find((offer) => offer.id === key);
        expect(booking?.isAffiliate, key).toBe(true);
        expect(booking?.url, key).toMatch(/^https:\/\/expedia\.(?:tpm\.li|tpk\.lv)\/[A-Za-z0-9]{8}$/);
        const url = new URL(hotelAffiliateUrl(booking!, pageId, hotel.id));
        expect(url.searchParams.getAll("sub_id")).toEqual([hotelClickSubId(pageId, hotel.id)]);
      }

      const browse = linksForPage(`${pageId}-browse`);
      expect(browse, area.id).toHaveLength(1);
      expect(browse[0].isAffiliate).toBe(true);
      const browseUrl = new URL(hotelBrowseAffiliateUrl(browse[0], pageId));
      expect(browseUrl.searchParams.getAll("sub_id")).toEqual([hotelBrowseSubId(pageId, browse[0].id)]);
    }
    expect(seen.size).toBe(32);
  });

  it("renders the stacked horizontal-photo card with the correct property-specific tracking URL", () => {
    const area = telAvivAreaGuides[0];
    const hotel = hotelsForArea(area.id, "telaviv")[0];
    const pageId = `stay-area-${area.id}`;
    const booking = linksForPage(pageId).find((offer) => offer.id === `hotel-${hotel.id}-expedia`)!;
    const html = renderToStaticMarkup(
      <ul><TelAvivHotelTile hotel={hotel} pageId={pageId} showArea={false} stacked /></ul>,
    );
    expect(html).toContain('data-testid="hotel-recommendation"');
    expect(html).toContain("aspect-[16/9] w-full object-cover");
    expect(html).toContain("Check rooms &amp; rates");
    expect(html).toContain(new URL(hotelAffiliateUrl(booking, pageId, hotel.id)).pathname);
    expect(html).toContain(hotelClickSubId(pageId, hotel.id));
  });
});
