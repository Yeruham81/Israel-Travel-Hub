import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { attractionIds, isRegionalOverview } from "@/data/attractionGuideTypes";
import { travelGuidePaths } from "@/data/registry";

const file = (path: string) => readFileSync(path, "utf8");

describe("Attraction On this page contact labels", () => {
  it("uses Contact me in the shared destination attraction guide", () => {
    const destination = file("src/components/AttractionDestinationPage.tsx");
    expect(destination).toContain('["contact", "Contact me"]');
    expect(destination).not.toContain('["contact", "Contact"]');
    expect(destination).not.toContain('["contact", "Contact Moshe"]');
  });

  it("uses first-person contact labels in travel guides", () => {
    const travelGuide = file("src/components/TravelGuide.tsx");
    expect(travelGuide).toContain('["contact", "Contact me"]');
    expect(travelGuide).not.toContain("Contact Moshe");
    const attractionIdsInTravelGuide = ["annunciation", "magdala", "precipice", "qasr", "megiddo", "yardenit"] as const;
    for (const id of attractionIdsInTravelGuide) expect(travelGuidePaths[id].startsWith("/attractions/")).toBe(true);
    expect(travelGuidePaths.jerusalemDeadSea.startsWith("/travel-blog/")).toBe(true);
    expect(attractionIds.filter(id => !isRegionalOverview(id)).length).toBeGreaterThan(0);
  });
});
