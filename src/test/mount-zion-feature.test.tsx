import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { mountZionDestinationContent as content } from "@/components/MountZionAttractionPage";
import { mountZionEditorialUpdate } from "@/data/mountZionRevision";
import { mountZionSite } from "@/data/mountZionSite";
import { mountZionMeta } from "@/routes/attractions.mount-zion";
import { attractionHubCards } from "@/data/attractionsHub";

describe("Mount Zion full attraction guide", () => {
  it("uses the unified visitor template and preserves canonical Article metadata", () => {
    const page = readFileSync("src/components/MountZionAttractionPage.tsx", "utf8");
    const route = readFileSync("src/routes/attractions.mount-zion.tsx", "utf8");
    expect(route).toContain("component: MountZionAttractionPage");
    expect(page).toContain("AttractionDestinationPage");
    expect(content.path).toBe("/attractions/mount-zion/");
    expect(content.heroTitle).toContain("Mount Zion");
    expect(content.facts).toHaveLength(6);
    expect(content.nearby).toHaveLength(6);
    expect(content.planningLinks).toHaveLength(6);
    expect(content.faqs).toHaveLength(7);
    expect(content.sources).toHaveLength(9);
    expect(attractionHubCards.filter(card => card.to === content.path)).toHaveLength(1);
    const meta = mountZionMeta();
    expect(meta.links.some(link => link.rel === "canonical" && link.href?.includes(content.path))).toBe(true);
    const article = meta.scripts.map(script => JSON.parse(script.children as string)).find(schema => schema["@type"] === "Article");
    expect(article.dateModified).toBe(mountZionSite.updatedAt);
    expect(article.citation).toEqual(content.sources.map(source => source.url));
  });

  it("preserves seven verified landmarks and locally stored site-specific photos", () => {
    const page = readFileSync("src/components/MountZionAttractionPage.tsx", "utf8");
    expect(mountZionEditorialUpdate.stops).toHaveLength(7);
    const photos = mountZionEditorialUpdate.stops.flatMap(stop => stop.image ? [stop.image] : []);
    expect(photos).toHaveLength(3);
    expect(new Set(photos.map(photo => photo.src)).size).toBe(3);
    for (const photo of photos) {
      if (photo.src.startsWith("/images/")) expect(existsSync("public" + photo.src), photo.src).toBe(true);
    }
    expect(page).toContain("mountZionEditorialUpdate.stops.map");
    expect(page).toContain("AttractionHighlight");
    expect(page).toContain('data-testid="mount-zion-hours-fees"');
    expect(page).toContain('data-testid="mount-zion-accessibility"');
    expect(page).toContain('data-testid="mount-zion-access-points"');
    expect(page).toContain('data-testid="mount-zion-map"');
    expect(page).toContain('data-testid="mount-zion-walking-routes"');
    expect(page).toContain('data-testid="mount-zion-walking-connections"');
    expect(page).toContain('data-testid="mount-zion-tour-cards"');
    expect(page).toContain("Jaffa Gate to Zion Gate");
    expect(page).toContain("Zion Gate to Gallicantu");
    expect(page).toContain("Zion Gate to Western Wall");
    expect(page).not.toMatch(/Haram al-Sharif|not physically proven/i);
  });

  it("provides current, operator-specific Sunday and museum visiting information", () => {
    expect(mountZionSite.hours).toHaveLength(7);
    const abbey = mountZionSite.hours.find(site => site.name === "Dormition Abbey");
    const gallicantu = mountZionSite.hours.find(site => site.name === "St Peter in Gallicantu");
    const museum = mountZionSite.hours.find(site => site.name.includes("Chamber of the Holocaust"));
    expect(abbey?.time).toContain("Sunday 11:30–17:00");
    expect(gallicantu?.time).toContain("closed Sunday");
    expect(museum?.time).toContain("Sun–Thu 09:00–14:00");
    expect(content.sources.some(x => x.url === mountZionSite.official.dormition)).toBe(true);
    expect(content.sources.some(x => x.url === mountZionSite.official.gallicantu)).toBe(true);
    expect(content.sources.some(x => x.url === mountZionSite.official.holocaustChamber)).toBe(true);
    expect(new Set(content.sources.map(source => source.url)).size).toBe(content.sources.length);
  });
});
