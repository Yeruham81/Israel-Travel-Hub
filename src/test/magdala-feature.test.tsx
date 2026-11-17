import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { magdalaDestinationContent as content } from "@/components/MagdalaAttractionPage";
import { magdalaSite as site } from "@/data/magdalaSite";
import { travelGuides } from "@/data/travelGuides";
import { travelGuideMeta } from "@/components/TravelGuide";
import { attractionHubCards } from "@/data/attractionsHub";

describe("Magdala individual attraction guide upgrade", () => {
  it("unifies the destination, metadata and official daily hours", () => {
    expect(content.path).toBe("/attractions/magdala/");
    expect(content.title).toBe(site.title);
    expect(content.intro).toBe(site.intro);
    expect(content.updatedAt).toBe("2026-11-17");
    expect(content.facts).toHaveLength(6);
    expect(content.facts.find(f => f.label === "Archaeological park")?.value).toBe("08:00–17:30");
    expect(content.facts.find(f => f.label === "Duc In Altum")?.value).toBe("08:00–18:00");
    expect(content.facts.find(f => f.label === "Admission")?.value).toBe("Ask visitor centre");
    expect(content.visitorTitle).toBe("Opening hours, tickets and visitor information");
    expect(content.visitorNavLabel).toBe("Hours & tickets");
    expect(travelGuides.magdala.updatedAt).toBe(site.updatedAt);
    expect(travelGuides.magdala.title).toBe(content.title);
    expect(travelGuides.magdala.description).toBe(site.description);
    expect(JSON.stringify(travelGuideMeta("magdala").scripts)).toContain("2026-11-17");
    expect(attractionHubCards.filter(item => String(item.to) === String(content.path))).toHaveLength(1);
  });

  it("uses distinct local Magdala photographs for the hero and illustrated attractions", () => {
    const article = readFileSync("src/components/MagdalaAttractionPage.tsx", "utf8");
    const paths = [
      "/images/attractions/magdala-duc-in-altum-exterior.webp",
      "/images/attractions/magdala-first-century-synagogue.webp",
      "/images/attractions/magdala-boat-chapel.webp",
      "/images/attractions/magdala-womens-atrium.webp",
    ];
    for (const src of paths) {
      expect(existsSync("public" + src), src).toBe(true);
    }
    expect(site.hero.src).toBe(paths[0]);
    for (const src of paths.slice(1)) {
      expect(article.split(src).length - 1, src).toBe(1);
    }
    expect(content.sources).toHaveLength(5);
    expect(content.sources.every(s => s.url.startsWith("https://"))).toBe(true);
  });

  it("provides a Google Maps pin, current official contacts and no unsupported ticket price", () => {
    const article = readFileSync("src/components/MagdalaAttractionPage.tsx", "utf8");
    const route = readFileSync("src/routes/attractions.magdala.tsx", "utf8");
    const shell = readFileSync("src/components/AttractionDestinationPage.tsx", "utf8");
    expect(route).toContain("component: MagdalaAttractionPage");
    expect(article).toContain('data-testid="magdala-hours-tickets"');
    expect(article).toContain('data-testid="magdala-location-map"');
    expect(article).toContain('data-testid="magdala-visitor-essentials"');
    expect(article).toContain("maps.google.com/maps?q=Magdala%20Archaeological%20Park");
    expect(article).toContain("www.google.com/maps/search/?api=1&query=Magdala%20Archaeological%20Park");
    expect(article).not.toContain("openstreetmap.org");
    expect(article).not.toContain("saddr=");
    expect(article).not.toContain("daddr=");
    expect(article).toContain("https://bus.gov.il/en/home");
    expect(article).toContain("carRentalAffiliateUrl(\"/attractions/magdala/\")");
    expect(article).toContain('rel="sponsored noopener noreferrer"');
    expect(article).toContain('href="#contact"');
    expect(article).toContain('to="/tours/nazareth-sea-of-galilee/"');
    expect(article).toContain("No current official price list online");
    expect(article).not.toContain("₪17");
    expect(article).not.toContain("₪12");
    expect(article).toContain("visit@magdala.org");
    expect(article).toContain("ducinaltum@magdala.org");
    expect(site.visit.visitorPhoneHref).toBe("+97246209900");
    expect(site.visit.prayerPhoneHref).toBe("+972533261622");
    expect(shell).toContain('["contact", "Contact me"]');
    expect(shell.split("<HomeContactForm").length - 1).toBe(1);
    expect(shell.indexOf("<SourcesDisclosure>")).toBeGreaterThan(shell.indexOf("<HomeContactForm"));
  });

  it("plans a manageable Galilee day, with relevant places and six follow-up guides", () => {
    const article = readFileSync("src/components/MagdalaAttractionPage.tsx", "utf8");
    expect(article).toContain("three to five sites");
    expect(article).toContain("The Magdala Stone");
    expect(article).toContain("Streets, marketplace and ritual baths");
    expect(article).toContain("Duc In Altum and the Boat Chapel");
    expect(article).toContain("The Women's Atrium and other chapels");
    expect(article).toContain("does not publish a current admission price list");
    expect(content.nearby?.map(item => item.to)).toEqual([
      "/attractions/tabgha/",
      "/attractions/capernaum/",
      "/attractions/mount-of-beatitudes/",
      "/attractions/yardenit/",
      "/attractions/basilica-of-the-annunciation/",
      "/attractions/mount-tabor/",
    ]);
    expect(content.planningLinks).toHaveLength(6);
    expect(content.faqs?.length).toBeGreaterThanOrEqual(7);
  });
});
