import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { travelGuidePaths } from "@/data/registry";

const source = (path: string) => readFileSync(path, "utf8");

describe("Jewish holiday cross-links", () => {
  it("uses the existing calendar guide rather than a second holiday page", () => {
    expect(travelGuidePaths.calendar).toBe("/travel-blog/israel-holidays/");
  });

  it.each([
    ["src/components/AkkoAttractionPage.tsx", ">Jewish holidays</Link>"],
    ["src/components/CapernaumAttractionPage.tsx", ">Jewish holiday dates</Link>"],
    ["src/components/MountZionAttractionPage.tsx", ">Jewish holidays</Link>"],
  ])("%s includes exactly one contextually placed calendar link", (path, linkText) => {
    const text = source(path);
    expect(text).toContain(linkText);
    expect(text.match(/to="\/travel-blog\/israel-holidays\/"/g)).toHaveLength(1);
  });

  it("adds one in-paragraph calendar link to each newly updated travel guide", () => {
    const docs = [
      "src/data/travelGuideExpansion.ts",
      "src/data/jerusalemClusterEditorial.ts",
      "src/data/travelGuides.ts",
    ];
    for (const path of docs) {
      const text = source(path);
      expect(text).toContain('{ text: "Jewish holidays", to: travelGuidePaths.calendar }');
      expect(text.match(/\{ text: "Jewish holidays", to: travelGuidePaths.calendar \}/g)).toHaveLength(1);
    }
  });

  it("does not duplicate the calendar link already placed in the Old City guide", () => {
    const text = source("src/components/OldCityJerusalemAttractionPage.tsx");
    expect(text.match(/to="\/travel-blog\/israel-holidays\/"/g)).toHaveLength(1);
    expect(text).toContain(">Special dates</Link>");
  });

  it("respects existing calendar links in the airport connection and transport guides", () => {
    const airport = source("src/components/AirportJourneyPage.tsx");
    const transport = source("src/data/travelGuides.ts");
    expect(airport).toContain('link.to === "/travel-blog/israel-holidays/"');
    expect(transport).toContain('{ text: "Israel\'s calendar of events", to: "/travel-blog/israel-holidays/" }');
  });
});
