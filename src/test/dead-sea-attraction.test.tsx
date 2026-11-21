import { describe, expect, it } from "vitest";
import { deadSeaDestinationContent, deadSeaSite } from "@/components/DeadSeaAttractionPage";
import { attractionHubRegions } from "@/data/attractionsHub";
import { attractionSidebarGuideLabels, attractionSidebarRegions } from "@/data/nav";
import { travelGuidePaths, affiliateConfig } from "@/data/registry";
import { deadSeaTourCards } from "@/data/deadSeaTourOffers";

describe("Individual Dead Sea attraction and its regional navigation", () => {
  it("keeps a dedicated Dead Sea destination in the standard attraction structure", () => {
    expect(deadSeaDestinationContent.path).toBe("/attractions/dead-sea/");
    expect(deadSeaDestinationContent.heroTitle).toBe("The Dead Sea");
    expect(deadSeaDestinationContent.updatedAt).toBe(deadSeaSite.updatedAt);
    expect(deadSeaDestinationContent.facts).toHaveLength(6);
    expect(deadSeaDestinationContent.factsTitle).toBe("The Dead Sea at a glance");
    expect(deadSeaDestinationContent.highlightsTitle).toBe("Experience the Dead Sea");
    expect(deadSeaDestinationContent.visitorContent).toBeTruthy();
    expect(deadSeaDestinationContent.transportContent).toBeTruthy();
    expect(deadSeaDestinationContent.itineraryContent).toBeTruthy();
    expect(deadSeaDestinationContent.practicalContent).toBeTruthy();
    expect(deadSeaDestinationContent.tourContent).toBeTruthy();
    expect(deadSeaDestinationContent.faqs!.length).toBeGreaterThanOrEqual(8);
    expect(deadSeaDestinationContent.nearby).toHaveLength(6);
    expect(new Set(deadSeaDestinationContent.nearby?.map(item => item.to)).size).toBe(6);
    expect(deadSeaDestinationContent.nearby?.some(item => item.to === "/travel-blog/dead-sea-attractions/")).toBe(true);
    expect(deadSeaDestinationContent.planningLinks?.some(item => item.to === "/travel-blog/dead-sea-attractions/")).toBe(false);
    expect(deadSeaDestinationContent.planningLinks).toHaveLength(6);
    expect(deadSeaDestinationContent.sources.length).toBeGreaterThanOrEqual(6);
  });
  it("displays the new guide as an individual Dead Sea & Masada attraction", () => {
    const section = attractionHubRegions.find(region => region.id === "dead-sea-masada")!;
    expect(section.cards[0]?.id).toBe("dead-sea");
    expect(section.cards[0]?.to).toBe("/attractions/dead-sea/");
    expect(section.cards.some(card => card.to === "/attractions/masada/")).toBe(true);
    expect(attractionSidebarGuideLabels["dead-sea"]).toBe("Dead Sea");
    const nav = attractionSidebarRegions.find(item => item.label === "Dead Sea & Masada");
    expect(nav).toBeDefined();
    if (!nav || !("children" in nav)) throw new Error("Missing Dead Sea region submenu");
    expect(nav.children?.some(card => card.to === "/attractions/dead-sea/")).toBe(true);
    expect(travelGuidePaths.deadSea).toBe("/attractions/dead-sea/");
  });
  it("uses three existing, attributable tour products instead of inventing booking links", () => {
    const selected = ["jslm-deadsea-beach-viator", "jslm-deadsea-masada-viator", "jslm-deadsea-masada-gyg"];
    for (const id of selected) {
      expect(deadSeaTourCards.find(t => t.id === id)?.sourceUrl).toMatch(/^https:\/\//);
      expect(affiliateConfig[id]?.trackingUrl).toMatch(/^https:\/\/(viator|getyourguide)\.tpm\.li\//);
    }
  });
  it("refreshes verified tour-review snapshots", () => {
    expect(deadSeaTourCards.find(t => t.id === "jslm-deadsea-masada-viator")).toMatchObject({ reviewCount: 790, rating: 4.3, checkedAt: "2026-11-21" });
    expect(deadSeaTourCards.find(t => t.id === "jslm-deadsea-masada-gyg")).toMatchObject({ reviewCount: 843, rating: 4.4, checkedAt: "2026-11-21" });
  });
});
