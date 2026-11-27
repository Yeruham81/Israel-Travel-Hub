import { sourceFragment, sourceIndex } from "@/test-utils/source-fragment";
import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  deadSeaStops,
  deadSeaMapPoints,
  deadSeaRouteIdeas,
  deadSeaFaqs,
  deadSeaEditorialOverview,
} from "@/data/deadSeaAttractionsGuide";
import { attractionGuides } from "@/data/attractionGuides";
import { deadSeaTourCards } from "@/data/deadSeaTourOffers";
import { affiliateConfig } from "@/data/registry";
import photoCredits from "@/data/deadSeaPhotoCredits.json";

describe("Dead Sea attractions editorial guide", () => {
  it("keeps exactly ten distinct attractions with precise maps and current safety notes", () => {
    expect(deadSeaStops).toHaveLength(10);
    expect(new Set(deadSeaStops.map((stop) => stop.id)).size).toBe(10);
    expect(deadSeaFaqs).toHaveLength(6);
    for (const stop of deadSeaStops) {
      expect(stop.title.length).toBeGreaterThan(12);
      expect(stop.description.length).toBeGreaterThan(90);
      expect(stop.practical.length).toBeGreaterThan(70);
      expect(stop.mapLinks.length).toBeGreaterThan(0);
      expect(
        stop.mapLinks.every(
          (link) => link.query.includes("Israel") || /^31\.\d+,35\.\d+$/.test(link.query),
        ),
      ).toBe(true);
      if (stop.official) expect(stop.official.href).toMatch(/^https:\/\//);
      if (stop.guide) expect(stop.guide.to).toMatch(/^\//);
    }
    expect(deadSeaStops.find((stop) => stop.id === "einot-tsukim")?.practical).toContain(
      "does not offer access",
    );
    expect(deadSeaStops.find((stop) => stop.id === "ein-gedi")?.practical).toMatch(
      /strenuous|demanding/,
    );
    expect(deadSeaStops.find((stop) => stop.id === "ein-gedi")?.practical).toMatch(
      /advance (registration|booking)/,
    );
    expect(deadSeaStops.find((stop) => stop.id === "novomeysky")?.practical).toContain(
      "15 minutes early",
    );
    expect(deadSeaStops.find((stop) => stop.id === "desert-adventures")?.title).toContain(
      "Stargazing",
    );
    expect(attractionGuides["dead-sea-attractions"]).toEqual(deadSeaEditorialOverview);
    expect(deadSeaEditorialOverview.highlights).toHaveLength(10);
    expect(deadSeaEditorialOverview.official.length).toBeGreaterThan(6);
  });

  it("shows ten local attraction photographs with original-source credits", () => {
    const images = deadSeaStops.flatMap((stop) => (stop.image ? [stop.image] : []));
    expect(images).toHaveLength(10);
    expect(new Set(images.map((image) => image.src)).size).toBe(10);
    expect(images.every((image) => image.alt.length > 25)).toBe(true);
    const local = ["nahal-bokek", "einot-tsukim", "novomeysky", "mount-sodom"];
    for (const id of local) {
      const path = "/images/dead-sea-attractions/" + id + ".webp";
      expect(existsSync(resolve(process.cwd(), "public" + path))).toBe(true);
      expect(deadSeaStops.find((stop) => stop.id === id)?.image?.src).toBe(path);
    }
    expect(photoCredits).toHaveLength(3);
    for (const credit of photoCredits) {
      expect(local).toContain(credit.id);
      expect(credit.author.length).toBeGreaterThan(2);
      expect(credit.sourceUrl).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
      expect(credit.licenseUrl).toMatch(/^https:\/\/creativecommons\.org\//);
    }
  });

  it("maps eight independently selectable positions with accurate mountain and museum pins", () => {
    expect(deadSeaMapPoints).toHaveLength(8);
    expect(new Set(deadSeaMapPoints.map((point) => point.id)).size).toBe(8);
    expect(
      deadSeaMapPoints.every((point) => Number.isFinite(point.lat) && Number.isFinite(point.lon)),
    ).toBe(true);
    const point = (id: string) => deadSeaMapPoints.find((item) => item.id === id)!;
    expect(point("einot-tsukim").lat).toBeCloseTo(31.747, 3);
    expect(point("mount-sodom").lat).toBeCloseTo(31.0855, 3);
    expect(point("novomeysky").lat).toBeCloseTo(31.07037, 3);
    expect(point("novomeysky").lon).toBeCloseTo(35.39731, 3);
    expect(deadSeaRouteIdeas).toHaveLength(3);
    for (const route of deadSeaRouteIdeas) {
      expect(route.stopIds.length).toBeGreaterThanOrEqual(2);
      expect(route.timeBudget.length).toBeGreaterThan(45);
      expect(route.travel.length).toBeGreaterThan(45);
      for (const id of route.stopIds)
        expect(deadSeaStops.some((stop) => stop.id === id)).toBe(true);
    }
    const map = readFileSync(
      resolve(process.cwd(), "public/maps/dead-sea-attractions.html"),
      "utf8",
    );
    expect(map).toContain("places.length !== 8");
    expect(map).toContain("dead-sea-attractions-map-focus");
    expect(map).toContain("dead-sea-attractions-map-selected");
    expect(map).toContain('"place-labels"');
    expect(map).toContain("Math.min(zoom+0.4,16.2)");
    expect(map).toContain("15.5");
    expect(map).not.toContain("zoom:16.8");
  });

  it("uses three exact Travelpayouts tours alongside the tour category link", () => {
    const ids = [
      "jslm-deadsea-beach-viator",
      "jslm-deadsea-masada-viator",
      "jslm-deadsea-sunrise-gyg",
    ];
    for (const id of ids) {
      const tour = deadSeaTourCards.find((t) => t.id === id);
      expect(tour).toBeTruthy();
      const tracking = affiliateConfig[id]?.trackingUrl;
      expect(tracking).toMatch(/^https:\/\/(?:viator|getyourguide)\.tpm\.li\//);
    }
    const page = readFileSync(
      resolve(process.cwd(), "src/components/DeadSeaAttractionsGuide.tsx"),
      "utf8",
    );
    expect(page).toMatch(sourceFragment('data-testid="deadsea-three-tours"'));
    expect(page).toMatch(sourceFragment('data-testid="deadsea-curated-tour"'));
    expect(page).toMatch(sourceFragment('url.searchParams.set("sub_id"'));
    expect(page).toMatch(sourceFragment('pageId:"dead_sea_attractions"'));
    expect(page).toMatch(sourceFragment('to="/tours/masada-dead-sea/"'));
    expect(page).toMatch(sourceFragment("relFor(true)"));
  });

  it("keeps the content-led order, compact mobile choice grid, comparison, related guides, sources and transport links", () => {
    const page = readFileSync(
      resolve(process.cwd(), "src/components/DeadSeaAttractionsGuide.tsx"),
      "utf8",
    );
    expect(page).toMatch(
      sourceFragment("grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-5"),
    );
    expect(page).not.toMatch(
      sourceFragment("Swipe the table sideways to compare all ten Dead Sea experiences."),
    );
    expect(page).toContain("min-w-[800px]");
    expect(page).toMatch(sourceFragment("Entry & booking"));
    expect(sourceIndex(page, '<section id="experiences"')).toBeLessThan(
      sourceIndex(page, '<section id="area-map"'),
    );
    expect(page).toContain("related.map");
    expect(page).toContain("planning.map");
    expect(page).toContain("HomeContactForm");
    expect(sourceIndex(page, "<HomeContactForm")).toBeLessThan(
      sourceIndex(page, "<SourcesDisclosure>"),
    );
    expect(page).toMatch(sourceFragment("Where to Stay in Israel"));
    expect(page).toContain("ben-gurion-airport-to-ein-bokek");
    expect(page).toContain("<PhotoCreditsDisclosure");
    expect(sourceIndex(page, "</SourcesDisclosure>")).toBeLessThan(sourceIndex(page, "<PhotoCreditsDisclosure"));
    expect(page).not.toContain("israel-taxi.com");
    const route = readFileSync(
      resolve(process.cwd(), "src/routes/travel-blog.dead-sea-attractions.tsx"),
      "utf8",
    );
    expect(route).toMatch(sourceFragment("component: DeadSeaAttractionsGuide"));
  });
});
