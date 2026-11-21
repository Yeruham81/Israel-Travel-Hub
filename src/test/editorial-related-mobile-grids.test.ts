import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/** Editorial six-card link collections must retain a 2x3 phone grid and 3x2 desktop grid.
 * This intentionally excludes affiliate tours, hotel products and non-six-card groups.
 */
const read = (path: string) => readFileSync(path, "utf8");

const sections: [string, string, string][] = [
  ["src/components/IsraelTravelTipsGuide.tsx", 'data-testid="travel-tips-related-guides"', "grid grid-cols-2 gap-4 lg:grid-cols-3"],
  ["src/components/HaifaMuseumsGuide.tsx", 'id="explore-more"', "grid grid-cols-2 gap-4 lg:grid-cols-3"],
  ["src/components/JerusalemMuseumsGuide.tsx", 'id="explore-more"', "grid grid-cols-2 gap-4 lg:grid-cols-3"],
  ["src/components/TelAvivMuseumsGuide.tsx", 'id="explore-more"', "grid grid-cols-2 gap-4 lg:grid-cols-3"],
  ["src/components/TelAvivBeachesGuide.tsx", 'id="explore-more"', "grid grid-cols-2 gap-4 lg:grid-cols-3"],
  ["src/routes/travel-blog.index.tsx", 'id="explore-israel"', "grid grid-cols-2 gap-3 lg:grid-cols-3"],
  ["src/routes/travel-blog.index.tsx", 'id="plan-israel-trip"', "grid grid-cols-2 gap-3 lg:grid-cols-3"],
  ["src/routes/attractions.index.tsx", 'id="attractions-related"', "grid grid-cols-2 gap-3 lg:grid-cols-3"],
  ["src/routes/attractions.index.tsx", 'id="attractions-trip-planning"', "grid grid-cols-2 gap-3 lg:grid-cols-3"],
  ["src/routes/airport-transfers.index.tsx", 'id="keep-planning"', "grid grid-cols-2 gap-3 lg:grid-cols-3"],
  ["src/routes/airport-transfers.index.tsx", 'id="trip-planning"', "grid grid-cols-2 gap-3 lg:grid-cols-3"],
  ["src/routes/private-driver-in-israel.tsx", 'id="travel-guides"', "grid grid-cols-2 gap-3 lg:grid-cols-3"],
  ["src/routes/private-driver-in-israel.tsx", 'id="next-steps"', "grid grid-cols-2 gap-3 lg:grid-cols-3"],
  ["src/routes/shore-excursions.index.tsx", 'id="shore-related-guides"', "grid grid-cols-2 gap-3 lg:grid-cols-3"],
  ["src/routes/shore-excursions.index.tsx", 'id="shore-practical"', "grid grid-cols-2 gap-3 lg:grid-cols-3"],
  ["src/components/PortPage.tsx", 'aria-labelledby="shore-local-h"', "grid grid-cols-2 gap-4 lg:grid-cols-3"],
  ["src/components/PortPage.tsx", 'aria-labelledby="shore-practical-h"', "grid grid-cols-2 gap-3 lg:grid-cols-3"],
  ["src/components/MountOlivesRelatedGuides.tsx", 'data-testid="mount-olives-related-guides"', "grid grid-cols-2 gap-4 lg:grid-cols-3"],
  ["src/components/MountZionRelatedGuides.tsx", 'data-testid="mount-zion-related-guides"', "grid grid-cols-2 gap-4 lg:grid-cols-3"],
];

describe("editorial six-card grid responsive parity", () => {
  it.each(sections)("%s: %s uses two columns on phones and three on desktop", (file, marker, classes) => {
    const source = read(file);
    const index = source.indexOf(marker);
    expect(index).toBeGreaterThanOrEqual(0);
    expect(source.slice(Math.max(0, index - 160), index + 4500)).toContain(classes);
  });

  it("uses the same grid rule in the shared attraction and related-guide components", () => {
    const attraction = read("src/components/AttractionDestinationPage.tsx");
    expect(attraction).toContain('className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-3"');
    const related = read("src/components/Guide.tsx");
    expect(related).toContain('pictured.length === 6 ? "mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3"');
    expect(related).toContain('pairedGuides.length === 6 ? "mt-4 grid grid-cols-2 gap-4 lg:grid-cols-3"');
    expect(related).toContain('items.length === 6 ? "mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3"');
    const jerusalem = read("src/components/JerusalemClusterLinks.tsx");
    expect(jerusalem).toContain('links.length === 6 ? "mt-5 grid grid-cols-2 gap-3 lg:grid-cols-3"');
  });

  it("keeps picture-and-text guide cards stacked instead of cramped on narrow phones", () => {
    for (const [file, marker] of [
      ["src/routes/travel-blog.index.tsx", 'id="explore-israel"'],
      ["src/routes/attractions.index.tsx", 'id="attractions-related"'],
      ["src/routes/airport-transfers.index.tsx", 'id="keep-planning"'],
      ["src/routes/private-driver-in-israel.tsx", 'id="travel-guides"'],
      ["src/routes/shore-excursions.index.tsx", 'id="shore-related-guides"'],
    ]) {
      const source = read(file);
      const start = source.indexOf(marker);
      expect(start, file).toBeGreaterThanOrEqual(0);
      const section = source.slice(start, source.indexOf("</section>", start));
      expect(section, file).toContain("flex-col");
      expect(section, file).toContain("sm:flex-row");
      expect(section, file).toContain("w-full");
    }
  });
});
