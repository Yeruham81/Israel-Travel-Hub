import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { attractionIds, isRegionalOverview } from "@/data/attractionGuideTypes";
import { travelGuidePaths } from "@/data/registry";

const file = (path: string) => readFileSync(path, "utf8");

describe("Attraction On this page contact labels", () => {
  it("uses Contact me in the shared destination and legacy attraction guides", () => {
    const destination = file("src/components/AttractionDestinationPage.tsx");
    const general = file("src/components/AttractionGuidePage.tsx");
    const sacred = file("src/components/SacredHillGuideContent.tsx");
    expect(destination).toContain('["contact", "Contact me"]');
    expect(general).toContain('["contact","Contact me"]');
    expect(sacred).toContain('["visit-options", "Contact me"]');
    expect(destination).not.toContain('["contact", "Contact"]');
    expect(general).not.toContain('["contact","Contact Moshe"]');
    expect(sacred).not.toContain('["visit-options", "Contact Moshe"]');
  });

  it("uses Contact me in attraction-domain editorial pages but preserves travel-blog labels", () => {
    const travelGuide = file("src/components/TravelGuide.tsx");
    expect(travelGuide).toContain('["contact", travelGuidePaths[id].startsWith("/attractions/") ? "Contact me" : "Contact Moshe"]');
    const attractionIdsInTravelGuide = ["annunciation", "magdala", "precipice", "qasr", "megiddo", "yardenit"] as const;
    for (const id of attractionIdsInTravelGuide) expect(travelGuidePaths[id].startsWith("/attractions/")).toBe(true);
    expect(travelGuidePaths.jerusalemDeadSea.startsWith("/travel-blog/")).toBe(true);
    expect(attractionIds.filter(id => !isRegionalOverview(id)).length).toBeGreaterThan(0);
  });
});
