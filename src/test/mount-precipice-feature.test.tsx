import { readRouteSource } from "@/test-utils/read-route-source";
import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { mountPrecipiceDestinationContent as content } from "@/components/MountPrecipiceAttractionPage";
import { mountPrecipiceSite as site } from "@/data/mountPrecipiceSite";
import { travelGuides } from "@/data/travelGuides";
import { travelGuideMeta } from "@/components/TravelGuide";
import { attractionHubCards } from "@/data/attractionsHub";
import { publicSources } from "@/data/registry";

describe("Mount Precipice attraction guide", () => {
  it("uses the shared destination page with synchronized metadata and a single hub card", () => {
    const route = readRouteSource("src/routes/attractions.mount-precipice.tsx");
    const shell = readFileSync("src/components/AttractionDestinationPage.tsx", "utf8");
    expect(route).toContain("component: MountPrecipiceAttractionPage");
    expect(route).toContain('travelGuideMeta("precipice")');
    expect(content.path).toBe("/attractions/mount-precipice/");
    expect(content.title).toBe(site.title);
    expect(content.intro).toBe(site.intro);
    expect(content.updatedAt).toBe("2026-11-17");
    expect(content.facts).toHaveLength(6);
    expect(content.facts.find(f => f.label === "Admission")?.value).toBe("Free");
    expect(content.facts.find(f => f.label === "When to visit")?.value).toBe("During daylight");
    expect(travelGuides.precipice.title).toBe(content.title);
    expect(travelGuides.precipice.description).toBe(site.description);
    expect(travelGuides.precipice.photo).toEqual(site.hero);
    expect(travelGuides.precipice.updatedAt).toBe(site.updatedAt);
    expect(travelGuides.precipice.sections).toHaveLength(0);
    expect(travelGuides.precipice.faqs).toHaveLength(0);
    expect(travelGuides.precipice.comparison.rows).toHaveLength(0);
    expect(travelGuides.precipice.sourceIds).toEqual([
      "m26-precipice-kkl",
      "m26-precipice-jesus-trail",
      "m26-precipice-nazareth-tourism",
    ]);
    const citations = publicSources(travelGuides.precipice.sourceIds).map(source => source.url);
    expect(citations).toEqual(content.sources.map(source => source.url));
    const articleMetadata = travelGuideMeta("precipice").scripts
      .map(script => JSON.parse(script.children as string))
      .find(script => script["@type"] === "Article");
    expect(articleMetadata.citation).toEqual(citations);
    expect(JSON.stringify(travelGuideMeta("precipice").scripts)).toContain("2026-11-17");
    expect(attractionHubCards.filter(card => String(card.to) === String(content.path))).toHaveLength(1);
    expect(shell).toContain('["contact", "Contact me"]');
    expect(shell.split("<HomeContactForm").length - 1).toBe(1);
    expect(shell.indexOf("<SourcesDisclosure>")).toBeGreaterThan(shell.indexOf("<HomeContactForm"));
  });
  it("has correct local photos, grounded walking distinctions and six useful related links", () => {
    const article = readFileSync("src/components/MountPrecipiceAttractionPage.tsx", "utf8");
    expect(existsSync("src/assets/guides/2026-10/mount-precipice.webp")).toBe(true);
    const photos = [
      "/images/attractions/mount-precipice-jezreel-view.webp",
      "/images/attractions/mount-precipice-mount-tabor-view.webp",
    ];
    for (const photo of photos) {
      expect(existsSync("public" + photo), photo).toBe(true);
      expect(article.split(photo).length - 1, photo).toBe(1);
    }
    expect(article).toContain("Three Faiths Lookout");
    expect(article).toContain("Forester's House");
    expect(article).toContain("300 metres");
    expect(article).toContain("Beit Al-Hikma School / Al-Qafza");
    expect(article).toContain("בי״ס בית אל-חכמה/אל-קפזה");
    expect(article).toContain("30–45 minutes — main lookout");
    expect(article).toContain("About 1–2 hours — extended hilltop walk");
    expect(article).toContain("Longer one-way hike towards Iksal");
    expect(site.hero.alt).toContain("small central building");
    expect(article).toContain("Gospel Trail");
    expect(article).toContain("Qafzeh Cave");
    expect(article).toContain("Pope Benedict XVI");
    expect(article).toContain("14 May 2009");
    expect(article).toContain("wheelchair accessible");
    expect(article).toContain("Route 75");
    expect(article).toContain("https://bus.gov.il/en/home");
    expect(article).toContain('to="/car-rental/"');
    expect(article).not.toContain("carRentalAffiliateUrl");
    expect(article).toContain('data-testid="mount-precipice-location-map"');
    expect(article).toContain('data-testid="mount-precipice-visitor-cards"');
    expect(article).toContain('data-testid="mount-precipice-visitor-essentials"');
    expect(article).toContain('href="#contact"');
    expect(content.nearby).toHaveLength(6);
    expect(content.planningLinks).toHaveLength(6);
    expect(content.faqs?.length).toBeGreaterThanOrEqual(6);
    expect(content.sources).toHaveLength(3);
    expect(new Set(content.nearby!.map(item => item.to)).size).toBe(6);
    expect(article).not.toContain("These are options, not a checklist");
    expect(article).not.toContain("Worth knowing");
  });
});
