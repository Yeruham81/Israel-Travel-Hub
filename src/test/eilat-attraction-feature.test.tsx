import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { eilatDestinationContent as content } from "@/components/EilatAttractionPage";
import { eilatSite } from "@/data/eilatSite";
import { eilatMeta } from "@/routes/attractions.eilat";
import { attractionHubRegions, attractionHubCards, attractionRelatedGuides } from "@/data/attractionsHub";
import { attractionSidebarRegions } from "@/data/nav";
import { affiliateConfig, travelGuidePaths } from "@/data/registry";
import { guideDirectory } from "@/data/travelGuides";

const page = readFileSync("src/components/EilatAttractionPage.tsx", "utf8");

describe("Eilat multi-attraction city guide", () => {
  it("uses the established destination template and has city-specific SEO metadata", () => {
    expect(content.path).toBe("/attractions/eilat/");
    expect(content.placeName).toBe("Eilat");
    expect(content.title).toBe(eilatSite.title);
    expect(content.heroTitle).toMatch(/Eilat.*Red Sea/i);
    expect(content.facts).toHaveLength(6);
    expect(content.facts.some(f => f.label === "Cost" && /Free \+ paid/.test(f.value))).toBe(true);
    expect(content.highlightContent).toBeTruthy();
    expect(content.itineraryContent).toBeTruthy();
    expect(content.visitorContent).toBeTruthy();
    expect(content.transportContent).toBeTruthy();
    expect(content.practicalContent).toBeTruthy();
    expect(content.tourContent).toBeTruthy();
    expect(content.faqs?.length).toBeGreaterThanOrEqual(8);
    expect(content.nearby).toHaveLength(6);
    expect(content.planningLinks).toHaveLength(6);
    expect(content.sources.length).toBeGreaterThanOrEqual(10);
    expect(new Set(content.sources.map(x => x.url)).size).toBe(content.sources.length);
    const meta = eilatMeta();
    expect(meta.links?.some(link => link.rel === "canonical" && link.href?.includes("/attractions/eilat/"))).toBe(true);
    const article = meta.scripts.map(script => JSON.parse(script.children as string)).find(x => x["@type"] === "Article");
    expect(article.dateModified).toBe(eilatSite.updatedAt);
    expect(article.citation).toEqual(content.sources.map(source => source.url));
  });

  it("covers coast, marine life, varied desert sites, practical trip planning and an Eilat map", () => {
    for (const phrase of [
      "Coral Beach Nature Reserve",
      "Underwater Observatory Marine Park",
      "Dolphin Reef",
      "North Beach, the promenade and marina",
      "Snorkeling, diving, water sports and boat trips",
      "Eilat Birdwatching Park",
      "Eilat Botanical Garden",
      "Timna Park",
      "Red Canyon and Eilat Mountains",
      "Eilat Birdwatching Park and Botanical Garden",
      "Ramon Airport",
      "Shabbat",
      "flash flooding",
      'data-testid="eilat-city-map"',
      'data-testid="eilat-suggested-itineraries"',
      "Google Maps",
    ]) expect(page).toContain(phrase);
    expect(page).not.toMatch(/Eilat opening hours:|Eilat admission price:/);
  });

  it("reuses distinct, published optimized local imagery without broken paths", () => {
    const list = [
      eilatSite.hero.src,
      "/images/attractions/eilat-coral-beach.webp",
      "/images/attractions/eilat-underwater-observatory.webp",
      "/images/attractions/eilat-dolphin-reef.webp",
      "/images/attractions/eilat-water-sports.webp",
      "/images/attractions/eilat-snorkeling-coral.webp",
      "/images/attractions/eilat-mountains-tour.webp",
      "/images/attractions/eilat-glass-bottom-boat.webp",
      "/images/attractions/eilat-birdwatching-park.webp",
      "/images/attractions/eilat-botanical-garden.webp",
    ];
    expect(new Set(list).size).toBe(list.length);
    for (const image of list) expect(existsSync("public" + image), image).toBe(true);
    expect(page).toContain("@/assets/home/timna-park-feature-optimized.webp");
    expect(page).toContain("eilat-water-sports.webp");
    expect(page).toContain("eilat-beach-comparison");
    expect(page).toContain("eilat-snorkeling-coral.webp");
    expect(page).toContain("photos.glassBottom");
    expect(page).toContain("photos.birdwatching");
    expect(page).toContain("photos.botanical");
    expect(page).not.toContain('title="Water sports and glass-bottom boat trips"');
    expect(page).toContain("official.egged");
    expect(content.sources.some(source => source.url === eilatSite.official.egged)).toBe(true);
  });

  it("links the new page in the attractions hub and under Negev & Eilat in the sidebar", () => {
    const region = attractionHubRegions.find(region => region.id === "negev-eilat");
    expect(region?.navLabel).toBe("Negev & Eilat");
    expect(region?.cards.map(card => card.id)).toEqual(["mitzpe-ramon-crater", "eilat"]);
    expect(region?.cards.find(card => card.id === "eilat")?.to).toBe("/attractions/eilat/");
    expect(attractionHubCards.filter(card => card.to === "/attractions/eilat/")).toHaveLength(1);
    const nav = attractionSidebarRegions.find(item => item.label === "Negev & Eilat");
    expect(nav && "children" in nav && nav.children?.some(item => item.label === "Eilat" && item.to === "/attractions/eilat/")).toBe(true);
    expect(attractionRelatedGuides.find(guide => guide.title === "Eilat: Red Sea attractions")?.to).toBe("/attractions/eilat/");
  });

  it("keeps Eilat as a single attraction, without a parallel travel guide or old direct links", () => {
    expect("eilat" in travelGuidePaths).toBe(false);
    expect(guideDirectory.some(g => g.id === "eilat")).toBe(false);
    expect(existsSync("src/routes/travel-blog.eilat.tsx")).toBe(false);
    const oldPath = "/travel-blog/" + "eilat/";
    const rootDirs = ["src", "scripts"];
    const files: string[] = [];
    const visit = (folder: string) => {
      for (const entry of readdirSync(folder)) {
        const path = folder + "/" + entry;
        if (statSync(path).isDirectory()) { visit(path); continue; }
        if (/\\.(?:tsx?|jsx?|mjs|cjs|json)$/.test(entry)) files.push(path);
      }
    };
    rootDirs.forEach(visit);
    for (const file of files) {
      expect(readFileSync(file, "utf8").includes(oldPath), file).toBe(false);
    }
    expect(readFileSync("public/sitemap.xml", "utf8")).not.toContain(oldPath);
    expect(page).not.toContain("The booking links use Travelpayouts");
  });

  it("uses only existing product-specific Travelpayouts tour cards", () => {
    const ids = [
      "tour-eilat-glass-bottom-boat-getyourguide@tours-eilat-red-sea",
      "tour-eilat-snorkeling-viator@tours-eilat-red-sea",
      "tour-eilat-red-canyon-jeep-viator@tours-eilat-red-sea",
    ];
    for (const id of ids) expect(affiliateConfig[id]?.trackingUrl).toMatch(/^https:\/\/(viator|getyourguide)\.tpm\.li\//);
    expect(page).toContain('rel="sponsored noopener noreferrer"');
    expect(page).toContain('searchParams.set("sub_id", tour.subId)');
    expect(page).not.toContain("https://www.viator.com/tours/");
  });
});
