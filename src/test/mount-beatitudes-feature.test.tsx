import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { mountBeatitudesDestinationContent as content } from "@/components/MountBeatitudesAttractionPage";
import { mountBeatitudesSite as site } from "@/data/mountBeatitudesSite";
import { attractionGuides } from "@/data/attractionGuides";
import { attractionMeta } from "@/components/AttractionGuidePage";
import { attractionHubCards } from "@/data/attractionsHub";

describe("Mount of Beatitudes individual attraction upgrade", () => {
  it("centralizes editorial facts, visiting hours and per-person entrance fee", () => {
    expect(content.path).toBe("/attractions/mount-of-beatitudes/");
    expect(content.title).toBe(site.title);
    expect(content.intro).toBe(site.intro);
    expect(content.updatedAt).toBe("2026-11-17");
    expect(content.facts).toHaveLength(6);
    expect(content.facts.find(f => f.label === "Morning hours")?.value).toBe("08:00–11:30");
    expect(content.facts.find(f => f.label === "Afternoon hours")?.value).toBe("14:00–16:30");
    expect(content.facts.find(f => f.label === "Entrance fee")?.value).toBe("₪10");
    expect(content.facts.find(f => f.label === "Entrance fee")?.note).toBe("Per person");
    expect(site.visit.entryPerPerson).toBe("₪10");
    expect(content.visitorTitle).toBe("Opening hours, admission and visitor information");
    expect(content.visitorNavLabel).toBe("Hours & admission");
    expect(attractionGuides["mount-of-beatitudes"].title).toBe(content.title);
    expect(attractionGuides["mount-of-beatitudes"].highlights).toHaveLength(0);
    expect(attractionGuides["mount-of-beatitudes"].arrival).toHaveLength(0);
    expect(attractionGuides["mount-of-beatitudes"].planning).toHaveLength(0);
    expect(attractionGuides["mount-of-beatitudes"].faqs).toHaveLength(0);
    expect(JSON.stringify(attractionMeta("mount-of-beatitudes").scripts)).toContain("2026-11-17");
    expect(attractionHubCards.filter(c => String(c.to) === String(content.path))).toHaveLength(1);
  });

  it("uses original local site photographs, regional referrals and useful next steps", () => {
    const article = readFileSync("src/components/MountBeatitudesAttractionPage.tsx", "utf8");
    const photos = [
      "/images/attractions/beatitudes-church-gardens.jpg",
      "/images/attractions/beatitudes-colonnade-lake.webp",
      "/images/attractions/beatitudes-sea-view.webp",
    ];
    for (const path of photos) {
      expect(existsSync("public" + path)).toBe(true);
      expect(article.split(path).length - 1).toBe(1);
    }
    expect(content.nearby?.map(x => x.to)).toEqual([
      "/attractions/tabgha/",
      "/attractions/capernaum/",
      "/attractions/magdala/",
      "/attractions/yardenit/",
      "/attractions/basilica-of-the-annunciation/",
      "/attractions/mount-tabor/",
    ]);
    expect(content.planningLinks).toHaveLength(6);
    expect(content.faqs?.length).toBeGreaterThanOrEqual(6);
    expect(article).toContain('to="/tours/nazareth-sea-of-galilee/"');
    expect(article).toContain('carRentalAffiliateUrl("/attractions/mount-of-beatitudes/")');
    expect(article).toContain('href="#contact"');
    expect(article).toContain('rel="sponsored noopener noreferrer"');
    expect(article).toContain("three to five stops");
    expect(content.sources).toHaveLength(4);
    expect(content.sources.every(s => s.url.startsWith("https://"))).toBe(true);
  });

  it("uses one pin on Google Maps, clear visiting hours and one shared form", () => {
    const article = readFileSync("src/components/MountBeatitudesAttractionPage.tsx", "utf8");
    const route = readFileSync("src/routes/attractions.mount-of-beatitudes.tsx", "utf8");
    const shell = readFileSync("src/components/AttractionDestinationPage.tsx", "utf8");
    expect(route).toContain("component: MountBeatitudesAttractionPage");
    expect(article).toContain('data-testid="beatitudes-hours-admission"');
    expect(article).toContain('data-testid="beatitudes-location-map"');
    expect(article).toContain('data-testid="beatitudes-visitor-essentials"');
    expect(article).toContain("maps.google.com/maps?q=Church%20of%20the%20Beatitudes");
    expect(article).toContain("www.google.com/maps/search/?api=1&query=Church%20of%20the%20Beatitudes");
    expect(article).not.toContain("openstreetmap");
    expect(article).not.toContain("saddr=");
    expect(article).not.toContain("daddr=");
    expect(article).toContain("https://bus.gov.il/en/home");
    expect(article).toContain("11:30 and 14:00");
    expect(article).toContain("site is closed between 11:30 and 14:00");
    expect(article).toContain("Official shrine hours");
    expect(article).toContain("₪10 per person");
    expect(article).not.toContain("Official parking charges");
    expect(article).not.toContain("₪30");
    expect(article).not.toContain("₪60");
    expect(article).not.toContain("₪100");
    expect(article).not.toContain("source.hoursAndParking");
    expect(site.sources.hours).toContain("cicts.org");
    expect(content.sources[0]?.label).toContain("visiting hours");
    expect(article).toContain("tel:");
    expect(shell.split("<HomeContactForm").length - 1).toBe(1);
    expect(shell.indexOf("<SourcesDisclosure>")).toBeGreaterThan(shell.indexOf("<HomeContactForm"));
  });
});
