import { describe, expect, it } from "vitest";
import {
  affiliateConfig,
  tourBookingOffers,
  tourProducts,
  travelGuidePaths,
} from "@/data/registry";
import { tourPhotos } from "@/data/tours";
import { travelGuides } from "@/data/travelGuides";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";
import { repeatedPhotos } from "@/lib/photo-uniqueness";
import {
  JERUSALEM_HUB_PATH,
  JERUSALEM_HUB_TITLE,
  JERUSALEM_HUB_DESCRIPTION,
  JERUSALEM_HUB_UPDATED,
  jerusalemTopicCards,
  jerusalemDayPlans,
  jerusalemStayAreas,
  jerusalemDayTripCards,
  jerusalemMoreGuides,
  jerusalemTourGroups,
  jerusalemHubFaqs,
  jerusalemHubSources,
} from "@/data/jerusalemCityHub";

const allEditorialCards = [
  ...jerusalemTopicCards,
  ...jerusalemDayTripCards,
  ...jerusalemMoreGuides,
];
const allTourSelections = [...jerusalemTourGroups[0].products, ...jerusalemTourGroups[1].products];
describe("Jerusalem travel planning hub", () => {
  it("retains the canonical old path and synchronises editorial guide directory and route metadata", () => {
    expect(JERUSALEM_HUB_PATH).toBe("/travel-blog/jerusalem-travel-guide/");
    expect(travelGuidePaths.jerusalem).toBe(JERUSALEM_HUB_PATH);
    expect(travelGuides.jerusalem.title).toBe(JERUSALEM_HUB_TITLE);
    expect(travelGuides.jerusalem.description).toBe(JERUSALEM_HUB_DESCRIPTION);
    expect(travelGuides.jerusalem.updatedAt).toBe(JERUSALEM_HUB_UPDATED);
    expect(travelGuides.jerusalem.photo.src).toBeTruthy();
    expect(jerusalemDayPlans).toHaveLength(3);
    expect(jerusalemStayAreas).toHaveLength(6);
    expect(new Set(jerusalemStayAreas.map((x) => x.to)).size).toBe(6);
    expect(jerusalemStayAreas.some((x) => x.name === "East Jerusalem")).toBe(true);
    expect(jerusalemStayAreas.every((x) => x.to.startsWith("/accommodation/jerusalem/"))).toBe(
      true,
    );
  });
  it("has 18 distinct image-backed canonical internal guide cards in three grids", () => {
    expect([
      jerusalemTopicCards.length,
      jerusalemDayTripCards.length,
      jerusalemMoreGuides.length,
    ]).toEqual([6, 6, 6]);
    expect(new Set(allEditorialCards.map((x) => x.to)).size).toBe(18);
    expect(new Set(allEditorialCards.map((x) => x.cta)).size).toBe(18);
    expect(allEditorialCards.some((x) => x.to === "/travel-blog/attractions-in-tel-aviv/")).toBe(
      true,
    );
    expect(allEditorialCards.some((x) => x.to === "/attractions/sea-of-galilee/")).toBe(true);
    expect(
      allEditorialCards.every((x) => String(x.to) !== "/travel-blog/day-trips-from-jerusalem/"),
    ).toBe(true);
    for (const item of allEditorialCards) {
      expect(item.to).toMatch(/^\/(?:attractions|travel-blog)\//);
      expect(guideHeroPhotoForPath(item.to)?.src, item.to).toBeTruthy();
      expect(guideHeroPhotoForPath(item.to)?.alt, item.to).toBeTruthy();
    }
    const photos = allEditorialCards.map((item) => guideHeroPhotoForPath(item.to)!.src);
    expect(repeatedPhotos(photos)).toEqual([]);
  });
  it("uses six catalogued bookable products and page-scoped Travelpayouts destinations only", () => {
    expect(jerusalemTourGroups.map((x) => x.products.length)).toEqual([3, 3]);
    expect(new Set(allTourSelections.map((x) => x.id)).size).toBe(6);
    for (const item of allTourSelections) {
      const product = tourProducts.find((x) => x.id === item.id);
      const offerId = "tour-" + item.id + "-" + item.partner;
      const offer = tourBookingOffers.find((x) => x.id === offerId);
      const tracking = affiliateConfig[offerId + "@jerusalem-hub"]?.trackingUrl;
      expect(product?.status).toBe("published");
      expect(offer?.productId).toBe(item.id);
      expect(offer?.partnerId).toBe(item.partner);
      expect(tourPhotos[item.id]?.src).toBeTruthy();
      expect(tracking).toMatch(
        /^https:\/\/(?:viator|getyourguide)\.tpm\.li\/[A-Za-z0-9]+\?sub_id=jerusalem_hub_/,
      );
      expect(tracking).not.toBe(offer?.publicUrl);
    }
    expect(allTourSelections.filter((x) => x.partner === "getyourguide")).toHaveLength(1);
  });
  it("answers focused planning questions and uses credible visitor information", () => {
    expect(jerusalemHubFaqs).toHaveLength(8);
    expect(jerusalemHubFaqs.some((x) => x.q.includes("Shabbat"))).toBe(true);
    expect(jerusalemHubFaqs.some((x) => x.q.includes("rental car"))).toBe(true);
    expect(jerusalemHubSources.some((x) => x.url.includes("gov.il"))).toBe(true);
    expect(jerusalemHubSources.some((x) => x.url.includes("rail.co.il"))).toBe(true);
  });
});
