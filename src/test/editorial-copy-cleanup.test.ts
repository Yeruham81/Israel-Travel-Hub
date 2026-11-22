import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/** Clear, positive captions and discoverable tables without repetitive interface directions. */
const source = (path: string) => readFileSync(path, "utf8");

describe("visitor-facing editorial copy", () => {
  it("keeps location maps focused on the places being shown", () => {
    const baptism = source("src/components/JordanRiverBaptismGuide.tsx");
    expect(baptism).toContain('pinMode: "locations"');
    expect(baptism).toContain('waypoints: JSON.stringify(baptismMapLocations)');
    expect(baptism).not.toContain("maps?saddr=");
    expect(baptism).not.toContain("not a guaranteed travel time or current road access");

    const telAviv = source("src/components/TelAvivAttractionsGuide.tsx");
    expect(telAviv).not.toContain("Map positions are approximate orientation points, not an itinerary");
    const topTen = source("src/components/TopTenIsraelGuide.tsx");
    expect(topTen).not.toContain("not a suggested driving route");
    const churches = source("src/components/JerusalemChurchesGuide.tsx");
    expect(churches).toContain("20 locations grouped into four colour-coded areas");
  });

  it("preserves scrollable tables while removing repetitive swipe instructions", () => {
    const paths = [
      "src/components/TravelGuide.tsx",
      "src/components/BestTimeIsraelGuide.tsx",
      "src/components/TelAvivBeachesGuide.tsx",
      "src/components/IsraelItineraryPage.tsx",
      "src/components/TopTenIsraelGuide.tsx",
      "src/components/TelAvivAttractionsGuide.tsx",
      "src/components/DeadSeaAttractionsGuide.tsx",
      "src/components/TabghaAttractionPage.tsx",
      "src/components/CapernaumAttractionPage.tsx",
      "src/components/SacredHillPlanningSections.tsx",
      "src/components/JerusalemShoppingGuide.tsx",
      "src/components/JordanRiverBaptismGuide.tsx",
    ];
    for (const path of paths) {
      const body = source(path);
      expect(body, path).not.toMatch(/Swipe the (?:comparison )?table sideways/i);
      expect(body, path).toContain("overflow-x-auto");
    }
  });

  it("retains essential visitor guidance while removing obvious map disclaimers", () => {
    const baptism = source("src/components/JordanRiverBaptismGuide.tsx");
    expect(baptism).toContain("Stay on authorised roads and inside the visitor area.");
    expect(baptism).toContain("you must reserve your visit in advance");
    const christian = source("src/components/ChristianToursGuide.tsx");
    expect(christian).toContain("check current West Bank access conditions");
    const shores = source("src/components/IsraelFoodGuide.tsx");
    expect(shores).toContain("dietary requirements and opening hours");
  });
});
