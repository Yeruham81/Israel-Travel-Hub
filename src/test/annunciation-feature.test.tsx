import { sourceFragment, sourceIndex } from "@/test-utils/source-fragment";
import { readRouteSource } from "@/test-utils/read-route-source";
import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { annunciationDestinationContent as content } from "@/components/AnnunciationAttractionPage";
import { annunciationSite as site } from "@/data/annunciationSite";
import { travelGuides } from "@/data/travelGuides";
import { travelGuideMeta } from "@/components/TravelGuide";
import { attractionHubCards } from "@/data/attractionsHub";
import { publicSources } from "@/data/registry";

describe("Basilica of the Annunciation attraction guide", () => {
  it("uses the shared attraction layout and synchronized metadata", () => {
    const route = readRouteSource("src/routes/attractions.basilica-of-the-annunciation.tsx");
    const shell = readFileSync("src/components/AttractionDestinationPage.tsx", "utf8");
    expect(route).toMatch(sourceFragment("component: AnnunciationAttractionPage"));
    expect(route).toMatch(sourceFragment('travelGuideMeta("annunciation")'));
    expect(content.path).toBe("/attractions/basilica-of-the-annunciation/");
    expect(content.title).toBe(site.title);
    expect(content.intro).toBe(site.intro);
    expect(content.updatedAt).toBe("2026-11-17");
    expect(content.facts).toHaveLength(6);
    expect(content.facts.find((f) => f.label === "Admission")?.value).toBe("Free entry");
    expect(content.facts.find((f) => f.label === "Visitor hours")?.value).toBe("08:00–18:00");
    expect(travelGuides.annunciation.title).toBe(content.title);
    expect(travelGuides.annunciation.photo).toEqual(site.hero);
    expect(travelGuides.annunciation.updatedAt).toBe(site.updatedAt);
    expect(travelGuides.annunciation.sections).toHaveLength(0);
    expect(travelGuides.annunciation.faqs).toHaveLength(0);
    expect(travelGuides.annunciation.comparison.rows).toHaveLength(0);
    expect(travelGuides.annunciation.sourceIds).toEqual([
      "m26-annunciation",
      "m26-annunciation-hours",
      "m26-annunciation-brochure",
      "m26-annunciation-parish",
    ]);
    const citations = publicSources(travelGuides.annunciation.sourceIds).map(
      (source) => source.url,
    );
    expect(citations).toEqual(content.sources.map((source) => source.url));
    const jsonLd = travelGuideMeta("annunciation")
      .scripts.map((script) => JSON.parse(script.children as string))
      .find((script) => script["@type"] === "Article");
    expect(jsonLd.citation).toEqual(citations);
    expect(jsonLd.dateModified).toBe("2026-11-17");
    expect(attractionHubCards.filter((c) => String(c.to) === String(content.path))).toHaveLength(1);
    expect(shell).toMatch(sourceFragment('["contact", "Contact me"]'));
    expect(shell.split("<HomeContactForm").length - 1).toBe(1);
    expect(sourceIndex(shell, "<SourcesDisclosure>")).toBeGreaterThan(
      sourceIndex(shell, "<HomeContactForm"),
    );
  });

  it("shows meaningful photos, practical visiting details and six connected attractions", () => {
    const article = readFileSync("src/components/AnnunciationAttractionPage.tsx", "utf8");
    expect(existsSync("src/assets/guides/2026-11/basilica-annunciation-courtyard.webp")).toBe(true);
    const images = [
      "/images/attractions/annunciation-grotto.webp",
      "/images/attractions/annunciation-upper-basilica.webp",
      "/images/attractions/annunciation-marian-mosaics.webp",
      "/images/attractions/annunciation-dome.webp",
    ];
    for (const photo of images) {
      expect(existsSync("public" + photo), photo).toBe(true);
      expect(article.split(photo).length - 1, photo).toBe(1);
    }
    expect(site.hours.generalVisitors).toBe("08:00–18:00");
    expect(site.hours.lastEntry).toBe("17:45");
    expect(site.hours.eveningPrayer).toBe("18:00–21:00");
    expect(article).toMatch(sourceFragment("St. Joseph's Church"));
    expect(article).toMatch(sourceFragment("visited on request"));
    expect(article).toMatch(sourceFragment("sanctuary's visitor information"));
    expect(article).toMatch(sourceFragment("Casa Nova Street"));
    expect(article).toMatch(sourceFragment("Franciscan Casa Nova guesthouse"));
    expect(article).toMatch(sourceFragment("Nazareth parish's published Mass schedule"));
    expect(article).toMatch(sourceFragment("Sightseeing ends at 18:00."));
    expect(article).toMatch(sourceFragment("silent prayer only"));
    expect(article).toContain("mount-precipice-jezreel-view.webp");
    expect(article).not.toMatch(sourceFragment('src="/images/attractions/nazareth-galilee.webp"'));
    expect(article).toMatch(sourceFragment("Giovanni Muzio"));
    expect(article).toContain("1969");
    expect(article).toMatch(sourceFragment("Nazareth Central Station / Paul VI Street"));
    expect(article).toMatch(sourceFragment("Holy Thursday"));
    expect(article).toMatch(sourceFragment("Good Friday"));
    expect(article).toMatch(sourceFragment("https://bus.gov.il/en/home"));
    expect(article).toMatch(sourceFragment('to="/car-rental/"'));
    expect(article).not.toContain("carRentalAffiliateUrl");
    expect(article).toMatch(sourceFragment('data-testid="annunciation-location-map"'));
    expect(article).toMatch(sourceFragment('data-testid="annunciation-visitor-hours"'));
    expect(article).toMatch(sourceFragment('data-testid="annunciation-visitor-essentials"'));
    expect(article).toMatch(sourceFragment('href="#contact"'));
    expect(content.nearby).toHaveLength(6);
    expect(new Set(content.nearby!.map((item) => item.to)).size).toBe(6);
    expect(content.planningLinks).toHaveLength(6);
    expect(content.faqs).toHaveLength(8);
    expect(content.sources).toHaveLength(4);
    expect(article).not.toMatch(sourceFragment("These are options, not a checklist"));
  });

  it("never reuses identical images in the hero, highlights or tour cards", () => {
    const imageFiles = [
      "src/assets/guides/2026-11/basilica-annunciation-courtyard.webp",
      "public/images/attractions/annunciation-grotto.webp",
      "public/images/attractions/annunciation-upper-basilica.webp",
      "public/images/attractions/annunciation-marian-mosaics.webp",
      "public/images/attractions/annunciation-dome.webp",
      "public/images/attractions/mount-precipice-jezreel-view.webp",
      "src/assets/guides/2026-10/basilica-of-the-annunciation.webp",
    ];
    const uniqueHashes = new Set(
      imageFiles.map((path) => {
        expect(existsSync(path), path).toBe(true);
        return createHash("sha256").update(readFileSync(path)).digest("hex");
      }),
    );
    expect(uniqueHashes.size).toBe(imageFiles.length);
  });
});
