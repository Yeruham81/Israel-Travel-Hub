import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { travelGuidePaths } from "@/data/registry";

const source = (path: string) => readFileSync(path, "utf8");

describe("Jewish holiday cross-links", () => {
  it("distinguishes the holiday explainer from the dedicated date-checking tool", () => {
    expect(travelGuidePaths.calendar).toBe("/travel-blog/calendar-of-events/");
    expect(source("src/routes/travel-blog.israel-holidays.tsx")).toContain('const PATH = "/travel-blog/israel-holidays/";');
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
      expect(text).toContain('{ text: "Jewish holidays", to: "/travel-blog/israel-holidays/" }');
      expect(text.match(/\{ text: "Jewish holidays", to: "\/travel-blog\/israel-holidays\/" \}/g)).toHaveLength(1);
    }
  });

  it("keeps one holiday link in each taxi guide while preserving the distinct events calendar", () => {
    const text = source("src/data/taxiGuideCluster.ts");
    expect(text.split('{ text: "Jewish holidays", to: "/travel-blog/israel-holidays/" }').length - 1).toBe(2);
    expect(text).not.toContain('text: "Israel\'s Calendar of Events", to: travelGuidePaths.calendar');
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
