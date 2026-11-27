import { sourceFragment, sourceIndex } from "@/test-utils/source-fragment";
import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { yardenitDestinationContent as content } from "@/components/YardenitAttractionPage";
import { yardenitSite as site } from "@/data/yardenitSite";
import { travelGuides } from "@/data/travelGuides";
import { travelGuideMeta } from "@/components/TravelGuide";
import { attractionHubCards } from "@/data/attractionsHub";

describe("Yardenit individual attraction upgrade", () => {
  it("uses the shared attraction page, current metadata and useful glance facts", () => {
    const route = readFileSync("src/routes/attractions.yardenit.tsx", "utf8");
    const article = readFileSync("src/components/YardenitAttractionPage.tsx", "utf8");
    const shell = readFileSync("src/components/AttractionDestinationPage.tsx", "utf8");
    expect(route).toMatch(sourceFragment("component: YardenitAttractionPage"));
    expect(content.path).toBe("/attractions/yardenit/");
    expect(content.title).toBe(site.title);
    expect(content.intro).toBe(site.intro);
    expect(content.updatedAt).toBe("2026-11-17");
    expect(content.facts).toHaveLength(6);
    expect(content.facts.find(f => f.label === "Admission")?.value).toBe("Free entry");
    expect(content.facts.find(f => f.label === "Visitor hours")?.value).toBe("Confirm with Yardenit");
    expect(travelGuides.yardenit.updatedAt).toBe(site.updatedAt);
    expect(travelGuides.yardenit.title).toBe(content.title);
    expect(JSON.stringify(travelGuideMeta("yardenit").scripts)).toContain("2026-11-17");
    expect(attractionHubCards.filter(item => String(item.to) === String(content.path))).toHaveLength(1);
    expect(article).toMatch(sourceFragment("Baptism ends before site closing"));
    expect(content.glanceNote).toBeUndefined();
    expect(article).toMatch(sourceFragment("There is no resident priest"));
    expect(article).toMatch(sourceFragment('data-testid="yardenit-location-map"'));
    expect(article).toMatch(sourceFragment('data-testid="yardenit-hours-baptism"'));
    expect(article).toMatch(sourceFragment('data-testid="yardenit-visitor-essentials"'));
    expect(article).toMatch(sourceFragment("https://bus.gov.il/en/home"));
    expect(article).toMatch(sourceFragment("Beit Yerach Regional School"));
    expect(article).toMatch(sourceFragment("stop 57066"));
    expect(article).toMatch(sourceFragment("Bring a towel, dry clothes"));
    expect(article).toMatch(sourceFragment("established in <strong>1981 by Kibbutz Kinneret"));
    expect(article).toMatch(sourceFragment("more than 80 languages and dialects"));
    expect(article).toMatch(sourceFragment("Pilgrims in white robes taking part in a group baptism"));
    expect(article).toMatch(sourceFragment('to="/car-rental/"'));
    expect(article).not.toContain("carRentalAffiliateUrl");
    expect(article).toMatch(sourceFragment('href="#contact"'));
    expect(article).toMatch(sourceFragment('to="/tours/nazareth-sea-of-galilee/"'));
    expect(shell).toMatch(sourceFragment('["contact", "Contact me"]'));
    expect(shell.split("<HomeContactForm").length - 1).toBe(1);
    expect(sourceIndex(shell, "<SourcesDisclosure>")).toBeGreaterThan(sourceIndex(shell, "<HomeContactForm"));
  });
  it("uses local photos without repeating the hero and keeps relevant links", () => {
    expect(existsSync("src/assets/guides/yardenit.jpg")).toBe(true);
    const photo = "/images/attractions/jordan-river-baptism.webp";
    expect(existsSync("public" + photo)).toBe(true);
    const article = readFileSync("src/components/YardenitAttractionPage.tsx", "utf8");
    expect(article.split(photo).length - 1).toBe(1);
    expect(content.nearby).toHaveLength(6);
    expect(content.planningLinks).toHaveLength(6);
    expect(new Set(content.nearby?.map(item => String(item.to))).size).toBe(6);
    expect(content.faqs?.length).toBeGreaterThanOrEqual(6);
    expect(content.sources).toHaveLength(5);
    expect(content.sources.every(item => item.url.startsWith("https://"))).toBe(true);
    expect(site.sources.wall).toBe("https://www.yardenit.com/wall-of-new-life/");
    expect(content.nearby?.map(item => item.to)).toEqual([
      "/attractions/magdala/",
      "/attractions/tabgha/",
      "/attractions/capernaum/",
      "/attractions/mount-of-beatitudes/",
      "/attractions/basilica-of-the-annunciation/",
      "/attractions/mount-tabor/",
    ]);
    expect(article).not.toMatch(sourceFragment("These are options, not a checklist"));
    expect(article).not.toMatch(sourceFragment("Worth knowing:"));
  });
});
