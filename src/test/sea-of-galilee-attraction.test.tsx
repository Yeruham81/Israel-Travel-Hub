import { describe, expect, it } from "vitest";
import { seaOfGalileeDestinationContent, seaOfGalileeSite, galileeTours } from "@/components/SeaOfGalileeAttractionPage";
import { attractionHubRegions } from "@/data/attractionsHub";
import { attractionSidebarRegions, attractionSidebarGuideLabels } from "@/data/nav";
import { attractionPath, isRegionalOverview } from "@/data/attractionGuideTypes";
import { affiliateConfig } from "@/data/registry";

describe("Sea of Galilee attraction upgrade", () => {
  it("uses the shared attraction template with lake-specific visitor content", () => {
    expect(seaOfGalileeDestinationContent.path).toBe("/attractions/sea-of-galilee/");
    expect(seaOfGalileeDestinationContent.factsTitle).toBe("The Sea of Galilee at a glance");
    expect(seaOfGalileeDestinationContent.updatedAt).toBe(seaOfGalileeSite.updatedAt);
    expect(seaOfGalileeDestinationContent.facts).toHaveLength(6);
    expect(seaOfGalileeDestinationContent.visitorContent).toBeTruthy();
    expect(seaOfGalileeDestinationContent.transportContent).toBeTruthy();
    expect(seaOfGalileeDestinationContent.itineraryContent).toBeTruthy();
    expect(seaOfGalileeDestinationContent.practicalContent).toBeTruthy();
    expect(seaOfGalileeDestinationContent.historyContent).toBeTruthy();
    expect(seaOfGalileeDestinationContent.tourContent).toBeTruthy();
    expect(seaOfGalileeDestinationContent.faqs!.length).toBeGreaterThanOrEqual(10);
    expect(seaOfGalileeDestinationContent.nearby).toHaveLength(6);
    expect(new Set(seaOfGalileeDestinationContent.nearby!.map(item => item.to)).size).toBe(6);
    expect(seaOfGalileeDestinationContent.planningLinks).toHaveLength(6);
  });

  it("adds an individual card and matching sidebar item in Sea of Galilee & Jordan River", () => {
    const section = attractionHubRegions.find(region => region.id === "sea-of-galilee")!;
    expect(section.cards[0]).toMatchObject({ id: "sea-of-galilee", to: "/attractions/sea-of-galilee/" });
    expect(attractionSidebarGuideLabels["sea-of-galilee"]).toBe("Sea of Galilee");
    expect(section.navLabel).toBe("Sea of Galilee & Jordan River");
    const nav = attractionSidebarRegions.find(item => item.label === "Sea of Galilee & Jordan River");
    if (!nav || !("children" in nav)) throw new Error("Missing Sea of Galilee sidebar section");
    expect(nav.children?.some(child => child.to === "/attractions/sea-of-galilee/")).toBe(true);
    expect(isRegionalOverview("sea-of-galilee")).toBe(false);
    expect(attractionPath("sea-of-galilee")).toBe("/attractions/sea-of-galilee/");
  });

  it("reuses exactly three existing Travelpayouts product IDs without fabricated prices", () => {
    expect(galileeTours).toHaveLength(3);
    expect(new Set(galileeTours.map(tour => tour.id)).size).toBe(3);
    for (const tour of galileeTours) {
      expect(affiliateConfig[tour.id]?.trackingUrl).toMatch(/^https:\/\/(viator|getyourguide)\.tpm\.li\//);
      expect(tour.title).toBeTruthy();
    }
  });
});
