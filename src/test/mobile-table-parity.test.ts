import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

/** A single comparison table is shown at all breakpoints, never separate mobile cards. */
const responsiveTablePages = [
  [
    "src/components/IsraelItineraryPage.tsx",
    [
      "/travel-blog/israel-itinerary-3-days/",
      "/travel-blog/israel-itinerary-5-days/",
      "/travel-blog/israel-itinerary-7-days/",
      "/travel-blog/israel-itinerary-10-days/",
    ],
  ],
  ["src/components/JordanRiverBaptismGuide.tsx", ["/travel-blog/baptism-in-the-jordan-river/"]],
  ["src/components/JerusalemShoppingGuide.tsx", ["/travel-blog/shopping-in-jerusalem/"]],
  ["src/components/TopTenIsraelGuide.tsx", ["/travel-blog/top-10-things-to-do-in-israel/"]],
  ["src/components/TelAvivBeachesGuide.tsx", ["/travel-blog/beaches-in-tel-aviv/"]],
  ["src/components/TelAvivAttractionsGuide.tsx", ["/travel-blog/attractions-in-tel-aviv/"]],
  ["src/components/DeadSeaAttractionsGuide.tsx", ["/travel-blog/dead-sea-attractions/"]],
  ["src/components/CapernaumAttractionPage.tsx", ["/attractions/capernaum/"]],
  ["src/components/TabghaAttractionPage.tsx", ["/attractions/tabgha/"]],
] as const;

describe("mobile and desktop comparison table parity", () => {
  it("covers exactly 12 unique published routes", () => {
    const routes = responsiveTablePages.flatMap(([, paths]) => paths);
    expect(routes).toHaveLength(12);
    expect(new Set(routes).size).toBe(12);
    const tree = readFileSync("src/routeTree.gen.ts", "utf8");
    for (const path of routes) expect(tree).toContain(path.replace(/\/$/, ""));
  });
  it.each(responsiveTablePages)(
    "displays a scrollable table, not alternative cards, in %s",
    (file) => {
      const source = readFileSync(file, "utf8");
      expect(source).toContain("overflow-x-auto");
      const tableTags = [...source.matchAll(/<table\b[^>]*>/g)].map((match) => match[0]);
      expect(
        tableTags.some(
          (tag) => /min-w-\[\d+px\]/.test(tag) && !/\bhidden\b|\b(?:sm|md|lg):table\b/.test(tag),
        ),
      ).toBe(true);
      expect(source).not.toMatch(/<table\s+className="hidden [^"]*(?:sm|md|lg):table"/);
      for (const oldCards of [
        "baptism-mobile-comparison",
        "capernaum-mobile-visitor-cards",
        "tabgha-mobile-hours",
        "sacred-hours-mobile",
      ]) {
        expect(source).not.toContain(oldCards);
      }
      expect(source).not.toContain('<ul className="divide-y md:hidden">');
      expect(source).not.toContain('<details className="md:hidden">');
    },
  );
});
