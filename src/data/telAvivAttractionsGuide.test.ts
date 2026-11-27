import { sourceFragment, sourceIndex } from "@/test-utils/source-fragment";
import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  telAvivExperiences,
  telAvivMapPoints,
  telAvivRoutes,
  telAvivFaqs,
  telAvivEditorialOverview,
  telAvivAttractionsHero,
} from "@/data/telAvivAttractionsGuide";
import { attractionGuides } from "@/data/attractionGuides";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";
import { guideDirectory } from "@/data/travelGuides";
import { attractionRelatedGuides } from "@/data/attractionsHub";
import { affiliateConfig } from "@/data/registry";
import { telAvivRouteNavigation } from "@/data/telAvivAttractionsGuide";
import florentinCredit from "@/data/telAvivGraffitiPhotoCredit.json";

describe("Upgraded Tel Aviv attractions editorial guide", () => {
  it("contains ten distinct city experiences with practical content and meaningful Google Maps destinations", () => {
    expect(telAvivExperiences).toHaveLength(10);
    expect(new Set(telAvivExperiences.map((x) => x.id)).size).toBe(10);
    expect(telAvivFaqs).toHaveLength(6);
    for (const x of telAvivExperiences) {
      expect(x.description.length).toBeGreaterThan(100);
      expect(x.practical.length).toBeGreaterThan(80);
      expect(x.transport.length).toBeGreaterThan(45);
      expect(x.mapLinks.length).toBeGreaterThan(0);
      expect(x.mapLinks.every((p) => p.query.endsWith("Israel"))).toBe(true);
      expect(x.entry.length).toBeGreaterThan(20);
      if (x.guide) expect(x.guide.to).toMatch(/^\//);
      if (x.official) expect(x.official.url).toMatch(/^https:\/\//);
    }
    expect(telAvivExperiences.find((x) => x.id === "beaches")?.practical).toContain("lifeguards");
    expect(telAvivExperiences.find((x) => x.id === "old-jaffa")?.practical).toContain("steps");
    expect(telAvivExperiences.find((x) => x.id === "white-city")?.practical).toContain("UNESCO");
    expect(telAvivExperiences.find((x) => x.id === "carmel-market")?.practical).toContain(
      "Shabbat",
    );
    expect(telAvivExperiences.find((x) => x.id === "beaches")?.official?.url).toContain(
      "/en/visit/beaches/pages/default.aspx",
    );
    expect(telAvivExperiences.find((x) => x.id === "beaches")?.additionalOfficial?.url).toContain(
      "/Visitors/Beaches/Pages/Beaches.aspx",
    );
    expect(
      telAvivExperiences.find((x) => x.id === "carmel-market")?.additionalOfficial?.url,
    ).toContain("nachalatbinyamin-tlv.com");
    expect(telAvivExperiences.find((x) => x.id === "neve-tzedek")?.official?.url).toContain(
      "suzannedellal.org.il",
    );
    expect(telAvivFaqs.find((x) => x.q.includes("Shabbat"))?.a).toContain("Na’im BeSofash");
  });

  it("reuses a shared metadata source rather than a stale five-highlight overview", () => {
    expect(attractionGuides["attractions-in-tel-aviv"]).toEqual(telAvivEditorialOverview);
    expect(telAvivEditorialOverview.highlights).toHaveLength(10);
    expect(telAvivEditorialOverview.official.length).toBeGreaterThan(2);
    const route = readFileSync(
      resolve(process.cwd(), "src/routes/travel-blog.attractions-in-tel-aviv.tsx"),
      "utf8",
    );
    expect(route).toMatch(sourceFragment("component: TelAvivAttractionsGuide"));
  });

  it("shares one canonical cover among the page header, directory and related-guide cards", () => {
    const page = readFileSync(
      resolve(process.cwd(), "src/components/TelAvivAttractionsGuide.tsx"),
      "utf8",
    );
    const destination = "/travel-blog/attractions-in-tel-aviv/";
    const directory = guideDirectory.find((entry) => String(entry.to) === destination);
    const related = attractionRelatedGuides.find((entry) => String(entry.to) === destination);
    expect(page).toMatch(sourceFragment("src={telAvivAttractionsHero.src}"));
    expect(page).toMatch(sourceFragment("alt={telAvivAttractionsHero.alt}"));
    expect(telAvivEditorialOverview.image).toEqual(telAvivAttractionsHero);
    expect(guideHeroPhotoForPath(destination)).toEqual(telAvivAttractionsHero);
    expect(directory?.photo?.src).toBe(telAvivAttractionsHero.src);
    expect(related?.photo).toEqual(telAvivAttractionsHero);
  });

  it("uses the approved I Love Tel Aviv Port photograph as the unique optimized page cover", () => {
    const source = readFileSync(
      resolve(process.cwd(), "src/data/telAvivAttractionsGuide.ts"),
      "utf8",
    );
    expect(source).toMatch(
      sourceFragment('import hero from "@/assets/guides/tel-aviv-attractions-hero.webp"'),
    );
    expect(telAvivAttractionsHero.alt).toContain("Tel Aviv Port");
    const file = resolve(process.cwd(), "src/assets/guides/tel-aviv-attractions-hero.webp");
    expect(existsSync(file)).toBe(true);
    const binary = readFileSync(file);
    expect(binary.subarray(0, 4).toString()).toBe("RIFF");
    expect(binary.subarray(8, 12).toString()).toBe("WEBP");
    expect(binary.length).toBeLessThan(120000);
  });

  it("uses ten different local photos, including four verified Google Drive images", () => {
    expect(new Set(telAvivExperiences.map((x) => x.image.src)).size).toBe(10);
    const slugs = ["carmel-market", "tel-aviv-museum-of-art", "sarona-market", "tel-aviv-port"];
    for (const slug of slugs) {
      const expected = "/images/tel-aviv-attractions/" + slug + ".webp";
      expect(existsSync(resolve(process.cwd(), "public" + expected))).toBe(true);
      expect(telAvivExperiences.some((x) => x.image.src === expected)).toBe(true);
    }
  });

  it("provides ten map points, three realistic city routes and an interactive region map", () => {
    expect(telAvivMapPoints).toHaveLength(10);
    expect(new Set(telAvivMapPoints.map((x) => x.id)).size).toBe(10);
    expect(
      telAvivMapPoints.every(
        (x) => x.lat >= 32.04 && x.lat <= 32.12 && x.lon >= 34.74 && x.lon <= 34.81,
      ),
    ).toBe(true);
    expect(telAvivRoutes).toHaveLength(3);
    expect(telAvivRouteNavigation).toHaveLength(3);
    expect(telAvivRoutes[2]?.ids).toEqual(["carmel-market", "neve-tzedek", "florentin"]);
    for (const nav of telAvivRouteNavigation) {
      expect(nav.origin).toContain("Israel");
      expect(nav.destination).toContain("Israel");
      expect(nav.waypoints.length).toBeGreaterThanOrEqual(1);
    }
    for (const x of telAvivRoutes) {
      expect(x.ids.length).toBeGreaterThan(2);
      expect(x.allow.length).toBeGreaterThan(20);
      for (const id of x.ids) expect(telAvivExperiences.some((e) => e.id === id)).toBe(true);
    }
    const html = readFileSync(
      resolve(process.cwd(), "public/maps/tel-aviv-attractions.html"),
      "utf8",
    );
    expect(html).toContain("places.length !== 10");
    expect(html).toContain("tel-aviv-attractions-map-focus");
    expect(html).toContain("tel-aviv-attractions-map-selected");
    expect(html).toContain("place-labels");
  });

  it("embeds only existing exact Travelpayouts product links and retains tour category links", () => {
    const ids = [
      "tour-jaffa-carmel-walk-getyourguide@tours-tel-aviv-jaffa",
      "tour-old-jaffa-walk-viator@tours-tel-aviv-jaffa",
      "tour-carmel-market-food-tour-viator@tours-tel-aviv-jaffa",
      "tour-tel-aviv-street-art-viator@tours-tel-aviv-jaffa",
      "tour-neve-tzedek-walk-getyourguide@tours-tel-aviv-jaffa",
      "tour-tel-aviv-cycling-viator@tours-tel-aviv-jaffa",
    ];
    for (const id of ids)
      expect(affiliateConfig[id]?.trackingUrl).toMatch(
        /^https:\/\/(?:getyourguide|viator)\.tpm\.li\//,
      );
    const page = readFileSync(
      resolve(process.cwd(), "src/components/TelAvivAttractionsGuide.tsx"),
      "utf8",
    );
    for (const id of ids) expect(page).toMatch(sourceFragment(id));
    expect(page).toContain("tel_aviv_attractions_");
    expect(page).toMatch(sourceFragment("Carmel Market Food-Tasting Tour"));
    expect(page).not.toMatch(sourceFragment("Market Tour & Israeli Cooking Workshop"));
    expect(page).toMatch(sourceFragment("HaCarmel St 43"));
    expect(page).toMatch(sourceFragment("Yefet St 7"));
    expect(page).toContain("florentin-graffiti.webp");
    expect(page).toContain("carmel-food-tasting.webp");
    expect(page).toMatch(sourceFragment("fromUsd:145"));
    expect(page).toContain("walkingDirectionsUrl");
    expect(page).toMatch(sourceFragment('travelmode:"walking"'));
    expect(page).toMatch(sourceFragment("Na'im BeSofash weekend shuttle"));
    expect(page).toContain("telAvivGraffitiPhotoCredit.json");
    expect(page).toMatch(sourceFragment("relFor(true)"));
    expect(page).toMatch(sourceFragment('data-testid="tel-aviv-curated-tour"'));
    expect(page).toMatch(sourceFragment('data-testid="tel-aviv-affiliate-tours"'));
    expect(page).toMatch(
      sourceFragment('sm:grid-cols-2 lg:grid-cols-3" data-testid="tel-aviv-affiliate-tours"'),
    );
    expect(page).toContain('tourPhotos["neve-tzedek-walk"]');
    expect(page).toContain('tourPhotos["tel-aviv-cycling"]');
    expect(page).toMatch(sourceFragment('to="/tours/tel-aviv-jaffa/"'));
    expect(page).toMatch(sourceFragment('to="/tours/food-market-tours/"'));
  });

  it("follows the content-first mobile pattern and connects key local guides", () => {
    const page = readFileSync(
      resolve(process.cwd(), "src/components/TelAvivAttractionsGuide.tsx"),
      "utf8",
    );
    expect(page).toMatch(
      sourceFragment("grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-5"),
    );
    expect(page).not.toMatch(
      sourceFragment("Swipe the table sideways to compare all ten attractions."),
    );
    expect(page).toContain("min-w-[760px]");
    expect(sourceIndex(page, '<section id="explore"')).toBeLessThan(
      sourceIndex(page, '<section id="map"'),
    );
    expect(page).toContain("HomeContactForm");
    expect(sourceIndex(page, "<HomeContactForm")).toBeLessThan(
      sourceIndex(page, "<SourcesDisclosure>"),
    );
    expect(page).toContain("related.map");
    expect(page).toContain("planning.map");
    expect(page).toMatch(sourceFragment("Where to Stay in Israel"));
    expect(
      existsSync(
        resolve(process.cwd(), "public/images/tel-aviv-attractions/carmel-food-tasting.webp"),
      ),
    ).toBe(true);
    expect(
      existsSync(
        resolve(process.cwd(), "public/images/tel-aviv-attractions/florentin-graffiti.webp"),
      ),
    ).toBe(true);
    expect(florentinCredit.license).toBe("CC BY 4.0");
    expect(florentinCredit.author).toBe("Nizzan Cohen");
    expect(florentinCredit.sourceUrl).toContain("commons.wikimedia.org");
    expect(page).toContain("/travel-blog/beaches-in-tel-aviv/");
    expect(page).toContain("/travel-blog/museums-in-tel-aviv/");
    expect(page).toContain("/travel-blog/getting-around-tel-aviv/");
  });
});
