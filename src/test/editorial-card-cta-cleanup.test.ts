import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(path, "utf8");

/** Entire editorial cards are links, so a repeated CTA footer has no purpose.
 * Real booking, contact and outbound provider buttons remain separate links. */
const editorialCardFiles = [
  "src/components/Guide.tsx",
  "src/components/TravelGuide.tsx",
  "src/components/BestTimeIsraelGuide.tsx",
  "src/components/IsraelHolidayVisitorGuide.tsx",
  "src/components/IsraelFoodGuide.tsx",
  "src/components/IsraelTravelTipsGuide.tsx",
  "src/components/SeniorToursGuide.tsx",
  "src/components/ChristianToursGuide.tsx",
  "src/components/JordanRiverBaptismGuide.tsx",
  "src/components/JerusalemCityHub.tsx",
  "src/components/JerusalemChurchesGuide.tsx",
  "src/components/JerusalemShoppingGuide.tsx",
  "src/components/JerusalemMuseumsGuide.tsx",
  "src/components/TelAvivMuseumsGuide.tsx",
  "src/components/HaifaMuseumsGuide.tsx",
  "src/components/TelAvivBeachesGuide.tsx",
  "src/components/TelAvivAttractionsGuide.tsx",
  "src/components/DeadSeaAttractionsGuide.tsx",
  "src/components/TopTenIsraelGuide.tsx",
  "src/components/IsraelItineraryPage.tsx",
  "src/components/StayTripLinks.tsx",
  "src/components/CityStayPlanning.tsx",
  "src/components/BethlehemGuideFollowUps.tsx",
  "src/components/DeadSeaGuideFollowUps.tsx",
  "src/components/PortPage.tsx",
  "src/components/TourCategoryPage.tsx",
  "src/routes/travel-blog.index.tsx",
  "src/routes/attractions.index.tsx",
  "src/routes/airport-transfers.index.tsx",
  "src/routes/private-driver-in-israel.tsx",
  "src/routes/shore-excursions.index.tsx",
  "src/routes/accommodation.index.tsx",
] as const;

describe("whole-card editorial navigation without redundant CTA footers", () => {
  it.each(editorialCardFiles)("%s uses shared hover and focus styles", (file) => {
    expect(read(file)).toContain("editorial-card-link");
  });

  it("omits repeated explore/read prompts from the related-card template", () => {
    for (const file of editorialCardFiles) {
      const source = read(file);
      expect(source, file).not.toMatch(/<span className="[^"]+">\s*(Explore my guide|Explore guide|Read my guide)\s*(?:<|\{)/);
    }
    const generic = read("src/components/Guide.tsx");
    expect(generic).not.toContain('className="mt-3 text-sm font-semibold text-primary">Read more</span>');
    const directory = read("src/components/TravelGuide.tsx");
    expect(directory).not.toContain(">Read more{showReadMoreArrow");
  });

  it("provides hover and keyboard cues without unnecessary movement", () => {
    const styles = read("src/styles.css");
    expect(styles).toContain(".editorial-card-link:hover");
    expect(styles).toContain(".editorial-card-link:focus-visible");
    expect(styles).toContain("@media (hover: hover) and (pointer: fine)");
    expect(styles).toContain("@media (prefers-reduced-motion: no-preference)");
    expect(styles).toContain("@media (prefers-reduced-motion: reduce)");
  });

  it("preserves separate booking and contact actions", () => {
    expect(read("src/components/ChristianToursGuide.tsx")).toContain("Read related guide");
    expect(read("src/routes/private-driver-in-israel.tsx")).toContain("Request a quote");
    expect(read("src/components/HaifaHotelEditorialGuide.tsx")).toContain("Check rooms & rates");
  });
});
