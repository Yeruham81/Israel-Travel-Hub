import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

/** Only external provider product cards are covered: editorial guide cards,
 * owner-operated private trips and destination selectors have different layouts. */
const source = (name: string) =>
  readFileSync(resolve(process.cwd(), "src/components", name + ".tsx"), "utf8");

describe("External tour and activity cards use a third-width desktop layout", () => {
  it("uses three desktop columns for shared destination and shore-excursion catalogs", () => {
    const tours = source("TourCatalog");
    expect(tours).toContain('className={compact ? "mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3" : "mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"}');
    expect(tours).toContain("external.length % 3 === 2");
    expect(tours).toContain("<ExternalProviderTourCard");

    const shore = source("ShoreServiceCatalog");
    expect(shore).toContain('className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3"');
    expect(shore).toContain("partnerTours.length % 3 === 2");
    expect(shore).toContain("<ExternalProviderTourCard");
    expect(source("ExternalProviderTourCard")).toContain('className="aspect-[16/9] w-full object-cover"');
  });

  it("uses three desktop columns for independently booked tours in guides and attractions", () => {
    const sections: [string, string][] = [
      ["TelAvivAttractionsGuide", 'sm:grid-cols-2 lg:grid-cols-3" data-testid="tel-aviv-affiliate-tours"'],
      ["OldCityJerusalemAttractionPage", 'sm:grid-cols-2 lg:grid-cols-3" data-testid="jerusalem-old-city-featured-tours"'],
      ["MountOlivesAttractionPage", 'sm:grid-cols-2 lg:grid-cols-3" data-testid="mount-olives-tour-cards"'],
      ["MountZionAttractionPage", 'sm:grid-cols-2 lg:grid-cols-3" data-testid="mount-zion-tour-cards"'],
      ["DeadSeaTourOptions", 'sm:grid-cols-2 lg:grid-cols-3" data-testid="deadsea-tour-options"'],
      ["JerusalemPartnerOffers", 'className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"'],
    ];
    for (const [file, desktopColumns] of sections) {
      expect(source(file), file).toContain(desktopColumns);
    }
  });

  it("curates six distinct, already approved provider activities for Tel Aviv", () => {
    const telAviv = source("TelAvivAttractionsGuide");
    const ids = [...telAviv.matchAll(/id:"(tour-[^"]+@tours-tel-aviv-jaffa)"/g)].map(match => match[1]);
    expect(ids).toHaveLength(6);
    expect(new Set(ids).size).toBe(6);
    expect(ids.filter(id => id?.includes("-getyourguide@")).length).toBeGreaterThanOrEqual(2);
    expect(ids.filter(id => id?.includes("-viator@")).length).toBeGreaterThanOrEqual(2);
  });
});
