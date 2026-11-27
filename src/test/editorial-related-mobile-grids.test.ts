import { sourceFragment, sourceIndex } from "@/test-utils/source-fragment";
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
  ["src/components/IconTripPlanningLinks.tsx", 'data-testid="icon-trip-planning-links"', "grid grid-cols-2 gap-3 lg:grid-cols-3"],
  ["src/routes/private-driver-in-israel.tsx", 'id="travel-guides"', "grid grid-cols-2 gap-3 lg:grid-cols-3"],
  ["src/routes/private-driver-in-israel.tsx", 'id="next-steps"', "grid grid-cols-2 gap-3 lg:grid-cols-3"],
  ["src/routes/shore-excursions.index.tsx", 'id="shore-related-guides"', "grid grid-cols-2 gap-3 lg:grid-cols-3"],
  ["src/components/PortPage.tsx", 'aria-labelledby="shore-local-h"', "grid grid-cols-2 gap-4 lg:grid-cols-3"],
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

  it("reuses the identical six-icon planning card layout in the airport hub and Shabbat guide", () => {
    const hub = read("src/routes/airport-transfers.index.tsx");
    const guide = read("src/components/TravelGuide.tsx");
    const shared = read("src/components/IconTripPlanningLinks.tsx");
    expect(hub).toMatch(sourceFragment('<IconTripPlanningLinks title="Plan the rest of your stay" items={tripPlanningLinks} />'));
    expect(guide).toMatch(sourceFragment('<IconTripPlanningLinks title="Plan the next part of your trip"'));
    expect(shared).toMatch(sourceFragment('className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3"'));
    expect(shared).toMatch(sourceFragment('size-5 shrink-0 text-primary'));
  });

  it("reuses the shared six-link grid on both shore page templates and stacks hub guide cards", () => {
    for (const file of ["src/routes/shore-excursions.index.tsx","src/components/PortPage.tsx"]) {
      expect(read(file)).toMatch(/<IconTripPlanningLinks\s+id="shore-practical"/);
    }
    expect(read("src/components/IconTripPlanningLinks.tsx")).toMatch(sourceFragment("grid grid-cols-2 gap-3 lg:grid-cols-3"));
    const hub=read("src/routes/shore-excursions.index.tsx");
    const start=sourceIndex(hub, 'id="shore-related-guides"');
    const section=hub.slice(start,sourceIndex(hub, "</section>", start));
    expect(section).toContain("flex-col");
    expect(section).toMatch(sourceFragment("aspect-[16/9] w-full"));
    expect(section).not.toMatch(sourceFragment("sm:flex-row"));
  });

  it("uses the same grid rule in the shared attraction and related-guide components", () => {
    const attraction = read("src/components/AttractionDestinationPage.tsx");
    expect(attraction).toMatch(sourceFragment('className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-3"'));
    const related = read("src/components/Guide.tsx");
    expect(related).toMatch(sourceFragment('pictured.length === 6 ? "mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3"'));
    expect(related).toMatch(sourceFragment('pairedGuides.length === 6 ? "mt-4 grid grid-cols-2 gap-4 lg:grid-cols-3"'));
    expect(related).toMatch(sourceFragment('items.length === 6 ? "mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3"'));
    const jerusalem = read("src/components/JerusalemClusterLinks.tsx");
    expect(jerusalem).toMatch(sourceFragment('links.length === 6 ? "mt-5 grid grid-cols-2 gap-3 lg:grid-cols-3"'));
  });

  it("keeps picture-and-text guide cards stacked instead of cramped on narrow phones", () => {
    for (const [file, marker] of [
      ["src/routes/travel-blog.index.tsx", 'id="explore-israel"'],
      ["src/routes/attractions.index.tsx", 'id="attractions-related"'],
      ["src/routes/airport-transfers.index.tsx", 'id="keep-planning"'],
      ["src/routes/private-driver-in-israel.tsx", 'id="travel-guides"'],
    ] as const) {
      const source = read(file);
      const start = source.indexOf(marker);
      expect(start, file).toBeGreaterThanOrEqual(0);
      const section = source.slice(start, sourceIndex(source, "</section>", start));
      expect(section, file).toContain("flex-col");
      expect(section, file).toMatch(sourceFragment("sm:flex-row"));
      expect(section, file).toContain("w-full");
    }
  });

  it("covers six-card tour-category, itinerary and attraction-region collections", () => {
    const category = read("src/components/TourCategoryPage.tsx");
    expect(category).toMatch(sourceFragment('localCards.length === 6 ? "mt-4 grid grid-cols-2 gap-4 lg:grid-cols-3"'));
    expect(category).toMatch(sourceFragment('jerusalemTourPlanningCards.length === 6 ? "mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3"'));
    const itinerary = read("src/components/IsraelItineraryPage.tsx");
    expect(itinerary).toMatch(sourceFragment('className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-3"'));
    expect(itinerary).toMatch(sourceFragment("group flex h-full flex-col"));
    expect(itinerary).toMatch(sourceFragment("group-hover:scale-[1.04]"));
    const hub = read("src/routes/attractions.index.tsx");
    expect(hub).toMatch(sourceFragment('className="mt-3 grid grid-cols-2 gap-3 sm:mt-4 sm:gap-4 lg:grid-cols-3"'));
    expect(hub).not.toMatch(sourceFragment('region.cards.length === 6 ?'));
  });
});
