import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { eilatDestinationContent as content } from "@/components/EilatAttractionPage";
import { eilatSite } from "@/data/eilatSite";
import { eilatMeta } from "@/routes/attractions.eilat";
import { attractionHubRegions, attractionHubCards, attractionRelatedGuides } from "@/data/attractionsHub";
import { attractionSidebarRegions } from "@/data/nav";
import { affiliateConfig } from "@/data/registry";

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
      "Water sports and glass-bottom boat trips",
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
    ];
    expect(new Set(list).size).toBe(list.length);
    for (const image of list) expect(existsSync("public" + image), image).toBe(true);
    expect(page).toContain("@/assets/home/timna-park-feature-optimized.webp");
    expect(page).toContain("@/assets/eilat/waterfront.webp");
    expect(page).toContain("@/assets/eilat/coral-reef.webp");
  });

  it("links the new page in the attractions hub and under Negev & Eilat in the sidebar", () => {
    const region = attractionHubRegions.find(region => region.id === "negev-eilat");
    expect(region?.navLabel).toBe("Negev & Eilat");
    expect(region?.cards.map(card => card.id)).toEqual(["mitzpe-ramon-crater", "eilat"]);
    expect(region?.cards.find(card => card.id === "eilat")?.to).toBe("/attractions/eilat/");
    expect(attractionHubCards.filter(card => card.to === "/attractions/eilat/")).toHaveLength(1);
    const nav = attractionSidebarRegions.find(item => item.label === "Negev & Eilat");
    expect(nav && "children" in nav && nav.children?.some(item => item.label === "Eilat" && item.to === "/attractions/eilat/")).toBe(true);
    expect(attractionRelatedGuides.find(guide => guide.title === "Eilat & the Red Sea")?.to).toBe("/attractions/eilat/");
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
