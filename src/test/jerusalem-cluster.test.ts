import { describe, expect, it } from "vitest";
import { attractionGuides } from "@/data/attractionGuides";
import { travelGuides } from "@/data/travelGuides";
import { travelGuidePaths } from "@/data/registry";
import { jerusalemConnections } from "@/components/JerusalemClusterLinks";
import { jerusalemAffiliatePageIds } from "@/components/JerusalemPartnerOffers";
import { repeatedPhotos } from "@/lib/photo-uniqueness";

const editorialIds = ["jerusalem", "jerusalemChurches", "jerusalemShopping", "jerusalemDayTrips", "bethlehem", "jerusalemDeadSea"] as const;
const placeIds = ["old-city-jerusalem", "museums-in-jerusalem", "mount-of-olives", "mount-zion"] as const;

describe("Jerusalem content and reciprocal guide cluster", () => {
  it("retains all canonical Jerusalem destination, specialist and travel guides", () => {
    for (const id of editorialIds) {
      const guide = travelGuides[id];
      expect(guide.id).toBe(id);
      expect(travelGuidePaths[id]).toMatch(/^\/travel-blog\/.+\/$/);
      expect(guide.updatedAt).toBe("2026-10-24");
      expect(new Set(guide.sections.map(section => section.id)).size).toBe(guide.sections.length);
      expect(guide.sections.length).toBeGreaterThanOrEqual(6);
      expect(jerusalemConnections[id].length).toBeGreaterThanOrEqual(3);
    }
    for (const id of placeIds) {
      expect(attractionGuides[id].region).toBe("Jerusalem");
      expect(attractionGuides[id].highlights.length).toBeGreaterThanOrEqual(4);
      expect(jerusalemConnections[id].length).toBeGreaterThanOrEqual(4);
    }
  });

  it("restores the museum and shopping topics missing in the shortened WordPress migration", () => {
    const museums = attractionGuides["museums-in-jerusalem"].highlights.map(h => h.name);
    expect(museums.length).toBeGreaterThanOrEqual(12);
    for (const name of ["Israel Museum", "Yad Vashem", "Tower of David", "Bible Lands", "Rockefeller", "Islamic Art", "Science Museum", "Begin", "Friends of Zion", "Time Elevator"]) {
      expect(museums.some(museum => museum.includes(name))).toBe(true);
    }
    const shopping = travelGuides.jerusalemShopping;
    for (const keyword of ["artists-colony", "bezalel-independent-design", "shopping-cardo-and-first-station", "shopping-market-tours"]) {
      expect(shopping.sections.some(section => section.id === keyword)).toBe(true);
    }
    expect(shopping.services.some(x => x.to === "/tours/food-market-tours/")).toBe(true);
  });

  it("uses meaningful inline hyperlinks inside the new editorial content, not only in related-links lists", () => {
    for (const id of editorialIds) {
      const sections = travelGuides[id].sections;
      expect(sections.some(section => section.inlineLinks?.some(link => section.paragraphs.some(text => text.includes(link.text))))).toBe(true);
    }
  });

  it("connects guide↔tour, guide↔transport and guide↔accommodation in both directions", () => {
    const has = (source: keyof typeof jerusalemConnections, target: string) =>
      jerusalemConnections[source].some(link => String(link.to) === target);
    expect(has("jerusalem", "/tours/jerusalem/")).toBe(true);
    expect(has("tour-jerusalem", travelGuidePaths.jerusalem)).toBe(true);
    expect(has("jerusalem", "/travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/")).toBe(true);
    expect(has("airport-jerusalem", travelGuidePaths.jerusalem)).toBe(true);
    expect(has("jerusalem", "/travel-blog/where-to-stay-in-jerusalem/")).toBe(true);
    expect(has("stay-jerusalem", travelGuidePaths.jerusalem)).toBe(true);
    expect(has("jerusalemChurches", "/ashdod-shore-excursions/")).toBe(true);
    expect(has("shore-ashdod", travelGuidePaths.jerusalemChurches)).toBe(true);
    expect(has("bethlehem", "/tours/bethlehem-jericho-jordan-river/")).toBe(true);
    expect(has("tour-bethlehem-jericho", travelGuidePaths.bethlehem)).toBe(true);
    expect(has("jerusalemDeadSea", "/tours/masada-dead-sea/")).toBe(true);
    expect(has("tour-masada-dead-sea", travelGuidePaths.jerusalemDeadSea)).toBe(true);
  });

  it("keeps every internal link unique and allows no old-site redirects", () => {
    for (const [key, links] of Object.entries(jerusalemConnections)) {
      const paths = links.map(link => String(link.to));
      expect(new Set(paths).size, key).toBe(paths.length);
      expect(paths.every(path => path.startsWith("/")), key).toBe(true);
      expect(paths.every(path => !path.startsWith("//")), key).toBe(true);
    }
  });

  it("does not show duplicate photographs within each edited Jerusalem guide", () => {
    for (const id of editorialIds) {
      const g = travelGuides[id];
      expect(repeatedPhotos([g.photo.src, ...g.sections.flatMap(section => section.photo ? [section.photo.src] : [])]), id).toEqual([]);
    }
  });

  it("prepares independent, non-displayed offer slots rather than unapproved affiliate links", () => {
    const slots = Object.values(jerusalemAffiliatePageIds);
    expect(slots.length).toBe(10);
    expect(new Set(slots).size).toBe(slots.length);
    expect(slots.every(slot => /^jerusalem-/.test(slot!))).toBe(true);
  });
});
