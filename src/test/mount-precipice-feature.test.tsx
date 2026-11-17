import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { mountPrecipiceDestinationContent as content } from "@/components/MountPrecipiceAttractionPage";
import { mountPrecipiceSite as site } from "@/data/mountPrecipiceSite";
import { travelGuides } from "@/data/travelGuides";
import { travelGuideMeta } from "@/components/TravelGuide";
import { attractionHubCards } from "@/data/attractionsHub";

describe("Mount Precipice attraction guide", () => {
  it("uses the shared destination page with synchronized metadata and a single hub card", () => {
    const route = readFileSync("src/routes/attractions.mount-precipice.tsx", "utf8");
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
    expect(article).toContain("Gospel Trail");
    expect(article).toContain("Qafzeh Cave");
    expect(article).toContain("Pope Benedict XVI");
    expect(article).toContain("14 May 2009");
    expect(article).toContain("wheelchair accessible");
    expect(article).toContain("Route 75");
    expect(article).toContain("https://bus.gov.il/en/home");
    expect(article).toContain('carRentalAffiliateUrl("/attractions/mount-precipice/")');
    expect(article).toContain('rel="sponsored noopener noreferrer"');
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
