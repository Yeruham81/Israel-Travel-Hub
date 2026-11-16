import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { tabghaDestinationContent as content } from "@/components/TabghaAttractionPage";
import { tabghaSite } from "@/data/tabghaSite";
import { attractionGuides } from "@/data/attractionGuides";
import { attractionHubCards } from "@/data/attractionsHub";
import { attractionMeta } from "@/components/AttractionGuidePage";

describe("Tabgha visitor guide follows the individual-attraction template", () => {
  it("keeps Tabgha metadata, dates and church-specific visitor hours consistent", () => {
    expect(content.path).toBe("/attractions/tabgha/");
    expect(content.title).toBe(tabghaSite.title);
    expect(content.intro).toBe(tabghaSite.intro);
    expect(content.updatedAt).toBe("2026-11-17");
    expect(content.facts).toHaveLength(6);
    expect(content.facts.find(f => f.label === "Multiplication church")?.value).toBe("09:00–15:00");
    expect(content.facts.find(f => f.label === "Admission")?.value).toBe("No published fee");
    expect(tabghaSite.multiplication.closed).toBe("Sunday");
    expect(tabghaSite.primacy.lastEntry).toBe("16:30");
    expect(attractionGuides.tabgha.title).toBe(content.title);
    expect(attractionGuides.tabgha.intro).toBe(content.intro);
    expect(attractionGuides.tabgha.highlights).toHaveLength(0);
    expect(attractionGuides.tabgha.arrival).toHaveLength(0);
    expect(attractionGuides.tabgha.planning).toHaveLength(0);
    expect(attractionGuides.tabgha.faqs).toHaveLength(0);
    expect(JSON.stringify(attractionMeta("tabgha").scripts)).toContain("2026-11-17");
    expect(attractionHubCards.filter(card => String(card.to) === String(content.path))).toHaveLength(1);
  });

  it("uses four different genuine locally stored Tabgha images and related routes", () => {
    const photos = [
      "/images/attractions/tabgha-multiplication-church.webp",
      "/images/attractions/tabgha-loaves-fishes-mosaic.webp",
      "/images/attractions/tabgha-primacy-chapel.webp",
      "/images/attractions/tabgha-primacy-interior.webp",
    ];
    expect(photos.every(path => existsSync("public" + path))).toBe(true);
    const article = readFileSync("src/components/TabghaAttractionPage.tsx", "utf8");
    for (const path of photos) expect(article.split(path).length - 1).toBe(1);
    expect(article).toContain("<AttractionContentImage");
    expect(content.nearby?.map(item => item.to)).toEqual([
      "/attractions/capernaum/",
      "/attractions/mount-of-beatitudes/",
      "/attractions/magdala/",
      "/attractions/yardenit/",
      "/attractions/basilica-of-the-annunciation/",
      "/attractions/mount-tabor/",
    ]);
    expect(content.planningLinks).toHaveLength(6);
    expect(new Set(content.nearby?.map(item => String(item.to))).size).toBe(6);
    expect(content.sources).toHaveLength(5);
    expect(content.sources.every(s => s.url.startsWith("https://"))).toBe(true);
  });

  it("provides practical planning, readable phones, an interactive location map and one form", () => {
    const article = readFileSync("src/components/TabghaAttractionPage.tsx", "utf8");
    const route = readFileSync("src/routes/attractions.tabgha.tsx", "utf8");
    const shell = readFileSync("src/components/AttractionDestinationPage.tsx", "utf8");
    expect(route).toContain("component: TabghaAttractionPage");
    expect(article).toContain('data-testid="tabgha-mobile-hours"');
    expect(article).toContain('data-testid="tabgha-visitor-table"');
    expect(article).toContain('data-testid="tabgha-location-map"');
    expect(article).toContain("hl=en&z=12");
    expect(article).toContain("tabghaSite.multiplication.hours");
    expect(article).toContain("tabghaSite.primacy.hours");
    expect(article).toContain('href={"tel:" + site.phoneHref}');
    expect(article).toContain("whitespace-nowrap");
    expect(article).toContain("A short visit: about one hour");
    expect(article).toContain("A full-day Galilee and Sea of Galilee trip");
    expect(article).toContain("choosing three to five stops");
    expect(article).toContain('to="/tours/nazareth-sea-of-galilee/"');
    expect(article).toContain('href="#contact"');
    expect(article).toContain("Request a quote");
    expect(article.match(/<AttractionPracticalTip>/g)).toHaveLength(2);
    expect(article).not.toContain("Worth knowing:");
    expect(article).not.toContain("Map: OpenStreetMap contributors");
    expect(article).not.toContain("These are options, not a checklist");
    expect(content.contactIntroduction).toMatch(/^Tell me when you’re visiting/);
    expect(content.faqs?.length).toBeGreaterThanOrEqual(6);
    expect(shell.split("<HomeContactForm").length - 1).toBe(1);
    expect(shell.indexOf("<SourcesDisclosure>")).toBeGreaterThan(shell.indexOf("<HomeContactForm"));
  });
});
