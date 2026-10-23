import { describe, expect, it } from "vitest";
import { photoIdentity, repeatedPhotos } from "@/lib/photo-uniqueness";
import { attractionHubCards, attractionHubPhotos, attractionHubRegions } from "@/data/attractionsHub";
import { tourCategories, tourCruisePhoto, toursHubGuides, toursHubHero, tourPlanningGuides } from "@/data/tours";
import { accommodationDestinations, jerusalemAreaGuides, telAvivAreaGuides } from "@/data/content";
import { hotelStyles, itineraryCards, arrivalCards, seasonPhoto, eventsPhoto } from "@/data/hotelHub";
import { quickPickPhotos } from "@/components/CityStayHub";
import { services, popularDestinationCards, homeGuideCards } from "@/routes/index";

describe("One photograph per page — site-wide editorial policy", () => {
  it("treats responsive copies and renamed-format variants of a photograph as duplicates", () => {
    expect(photoIdentity("/assets/haifa-panorama-card.webp")).toBe(photoIdentity("/assets/haifa-panorama-tile.webp"));
    expect(photoIdentity("/images/market-300x200.jpg.webp")).toBe(photoIdentity("/images/market.jpg"));
    expect(repeatedPhotos(["/home/masada.webp", "/home/masada-card.webp"])).toEqual(["masada"]);
  });

  it("keeps every displayed Attractions image distinct (hero, region headers and guide cards)", () => {
    const displayed = [attractionHubPhotos.hero.src, ...attractionHubRegions.map(region => region.image.src), ...attractionHubCards.map(card => card.photo.src)];
    expect(repeatedPhotos(displayed)).toEqual([]);
  });

  it("uses a different quick-pick photo than detailed area cards in both city hotel hubs", () => {
    const picksJerusalem = ["downtown", "mamilla", "german-colony"];
    const picksTelAviv = ["telaviv-beachfront", "telaviv-dizengoff", "telaviv-jaffa"];
    for (const [picks, areas] of [
      [picksJerusalem, jerusalemAreaGuides] as const,
      [picksTelAviv, telAvivAreaGuides] as const,
    ]) {
      const displayed = [...picks.map(id => quickPickPhotos[id]!.src), ...areas.map(area => area.photo.src)];
      expect(repeatedPhotos(displayed)).toEqual([]);
    }
  });

  it("uses distinct photos in the Tours landing page", () => {
    const displayed = [toursHubHero.src, tourCruisePhoto.src, ...tourCategories.map(category => category.photo.src),
      ...toursHubGuides.map(guide => guide.photo.src), ...tourPlanningGuides.map(guide => guide.photo.src)];
    expect(repeatedPhotos(displayed)).toEqual([]);
  });

  it("uses distinct photos in the Hotels landing page", () => {
    const displayed = [...accommodationDestinations.map(destination => destination.photo.src), ...hotelStyles.map(style => style.photo.src),
      seasonPhoto.src, eventsPhoto.src, ...itineraryCards.map(card => card.photo.src), ...arrivalCards.map(card => card.photo.src)];
    expect(repeatedPhotos(displayed)).toEqual([]);
  });

  it("does not repeat an image among Home service cards, destinations and guide recommendations", () => {
    const displayed = [...services.flatMap(s => [s.feature.src, ...s.cards.map(card => card.img.src)]),
      ...popularDestinationCards.map(card => card.img.src),
      ...homeGuideCards.first.map(guide => guide.photo?.src || ""), ...homeGuideCards.second.map(guide => guide.photo?.src || "")];
    expect(repeatedPhotos(displayed)).toEqual([]);
  });
});
