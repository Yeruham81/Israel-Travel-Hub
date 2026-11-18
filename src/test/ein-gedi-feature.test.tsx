import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { einGediDestinationContent as content } from "@/components/EinGediAttractionPage";
import { einGediSite as site } from "@/data/einGediSite";
import { einGediMeta } from "@/routes/attractions.ein-gedi";
import { attractionHubCards } from "@/data/attractionsHub";
import { einGediCardPhoto } from "@/data/einGediCardPhoto";

describe("Ein Gedi upgraded attraction guide", () => {
  it("uses the unified attraction layout, canonical, author and real related pages", () => {
    const route = readFileSync("src/routes/attractions.ein-gedi.tsx", "utf8");
    const shell = readFileSync("src/components/AttractionDestinationPage.tsx", "utf8");
    expect(route).toContain("component: EinGediAttractionPage");
    expect(content.path).toBe("/attractions/ein-gedi/");
    expect(content.title).toBe(site.title);
    expect(content.intro).toBe(site.intro);
    expect(content.facts).toHaveLength(6);
    expect(content.facts.find(x => x.label === "Admission")?.value).toBe("₪31 adult");
    expect(content.visitorNavLabel).toBe("Trails & tickets");
    expect(content.nearby).toHaveLength(6);
    expect(new Set(content.nearby!.map(x => x.to)).size).toBe(6);
    expect(content.planningLinks).toHaveLength(6);
    expect(content.faqs).toHaveLength(8);
    expect(content.sources).toHaveLength(6);
    expect(shell).toContain('["contact", "Contact me"]');
    expect(shell).toContain("<AuthorCard />");
    expect(shell.indexOf("<SourcesDisclosure>")).toBeGreaterThan(shell.indexOf("<HomeContactForm"));
    const card = attractionHubCards.find(x => x.to === content.path);
    expect(card?.photo).toEqual(einGediCardPhoto);
    expect(site.hero).toEqual(einGediCardPhoto);
    const meta = einGediMeta();
    expect(meta.links.find(link => link.rel === "canonical")?.href).toContain("/attractions/ein-gedi/");
    const article = meta.scripts.map(x => JSON.parse(x.children as string)).find(x => x["@type"] === "Article");
    expect(article.dateModified).toBe("2026-11-18");
    expect(article.citation).toEqual(content.sources.map(x => x.url));
  });

  it("shows correct tickets, reservations, flood updates, cutoffs and separate entrances", () => {
    const article = readFileSync("src/components/EinGediAttractionPage.tsx", "utf8");
    expect(site.visit.adult).toBe("₪31");
    expect(site.visit.child).toBe("₪16");
    expect(site.visit.student).toBe("₪26");
    expect(site.visit.activeReservist).toBe("₪23");
    expect(site.visit.antiquitiesAdult).toBe("₪16");
    expect(site.visit.antiquitiesChild).toBe("₪7");
    expect(site.visit.summerRegular).toBe("08:00–17:00");
    expect(site.visit.winterRegular).toBe("08:00–16:00");
    expect(article).toContain("October 2026");
    expect(article).toContain("ten minutes to the first waterfall");
    expect(article).toContain("differing temporary closure statuses");
    expect(article).toContain("Nahal Arugot");
    expect(article).toContain("three hours before closing");
    expect(article).toContain("separate visit reservations");
    expect(article).toContain("antiquities-only");
    expect(article).toContain("accessible");
    expect(article).toContain("flash");
    expect(article).toContain("dead Sea".toLowerCase().replace("dead", "Dead"));
    expect(article).toContain('data-testid="ein-gedi-hours-tickets"');
    expect(article).toContain('data-testid="ein-gedi-trail-booking"');
    expect(article).toContain('data-testid="ein-gedi-three-entrances"');
    expect(article).toContain('data-testid="ein-gedi-map"');
    expect(article).toContain('href="#contact"');
    expect(article).toContain('rel="sponsored noopener noreferrer"');
    expect(article).toContain("carRentalAffiliateUrl");
    expect(article).toContain('to="/tours/masada-dead-sea/"');
  });

  it("uses varied local photos with a separate wide panorama and no repeated source", () => {
    const article = readFileSync("src/components/EinGediAttractionPage.tsx", "utf8");
    const photos = [
      "src/assets/guides/dead-sea-excursions/ein-gedi-waterfall.webp",
      "src/assets/guides/dead-sea-excursions/ein-gedi-rock-gorge.jpg",
      "src/assets/guides/ein-gedi-ibex.webp",
      "src/assets/guides/dead-sea-excursions/ein-gedi-reserve-cliffs.jpg",
      "src/assets/guides/dead-sea-excursions/ein-gedi-dead-sea-overlook.jpg",
      "src/assets/guides/dead-sea-excursions/ein-gedi-canyon-panorama.jpg",
      "src/assets/guides/dead-sea-excursions/dead-sea-salt-shore.webp",
      "src/assets/home/masada-dead-sea-card.webp",
    ];
    for (const path of photos) expect(existsSync(path), path).toBe(true);
    expect(new Set(photos).size).toBe(photos.length);
    expect(article).toContain('data-testid="ein-gedi-wide-panorama"');
    expect(article).toContain("h-auto max-h-[420px] w-full");
    expect(article).toContain("rockGorgePhoto");
    expect(article).not.toContain("oasisPhoto");
    expect(article).toContain("The ancient synagogue and its mosaics");
  });
});
