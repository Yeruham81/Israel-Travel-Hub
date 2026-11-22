import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { mountOlivesDestinationContent as content } from "@/components/MountOlivesAttractionPage";
import { mountOlivesEditorialUpdate } from "@/data/mountOlivesRevision";
import { mountOlivesSite } from "@/data/mountOlivesSite";
import { mountOlivesMeta } from "@/routes/attractions.mount-of-olives";
import { attractionHubCards } from "@/data/attractionsHub";

describe("Mount of Olives upgraded attraction guide", () => {
  it("uses the destination template, clear navigation and site-specific Article metadata", () => {
    const page = readFileSync("src/components/MountOlivesAttractionPage.tsx", "utf8");
    const route = readFileSync("src/routes/attractions.mount-of-olives.tsx", "utf8");
    expect(route).toContain("component: MountOlivesAttractionPage");
    expect(page).toContain("AttractionDestinationPage");
    expect(content.path).toBe("/attractions/mount-of-olives/");
    expect(content.heroTitle).toBe("Mount of Olives, Jerusalem: What to See & How to Visit");
    expect(content.itineraryFirst).toBe(true);
    expect(content.itineraryTitle).toBe("How to plan your Mount of Olives visit");
    expect(content.hero.src).toBe(mountOlivesSite.hero.src);
    expect(content.highlightsTitle).toBe("What to see on the Mount of Olives");
    expect(content.facts).toHaveLength(6);
    expect(content.nearby).toHaveLength(6);
    expect(content.planningLinks).toHaveLength(6);
    expect(content.faqs).toHaveLength(7);
    expect(content.sources).toHaveLength(10);
    expect(attractionHubCards.filter(card => card.to === content.path)).toHaveLength(1);
    const meta = mountOlivesMeta();
    expect(meta.links.find(link => link.rel === "canonical")?.href).toContain(content.path);
    const article = meta.scripts.map(script => JSON.parse(script.children as string)).find(schema => schema["@type"] === "Article");
    expect(article.dateModified).toBe(mountOlivesSite.updatedAt);
    expect(article.citation).toEqual(content.sources.map(source => source.url));
    expect(article.citation).not.toContain(mountOlivesSite.official.moovit);
  });

  it("describes the eight locations with unique local photographs and no misleading access assertions", () => {
    const page = readFileSync("src/components/MountOlivesAttractionPage.tsx", "utf8");
    expect(mountOlivesEditorialUpdate.stops).toHaveLength(8);
    const photos = mountOlivesEditorialUpdate.stops.map(stop => stop.image?.src);
    expect(photos.every(Boolean)).toBe(true);
    expect(new Set(photos).size).toBe(8);
    expect(photos).not.toContain(mountOlivesSite.hero.src);
    for (const image of photos) {
      if (image?.startsWith("/images/")) expect(existsSync("public" + image), image).toBe(true);
    }
    expect(page).toContain("mountOlivesEditorialUpdate.stops.map");
    expect(page).toContain("AttractionHighlight");
    expect(page).toContain('data-testid="mount-olives-hours-fees"');
    expect(page).toContain('data-testid="mount-olives-access"');
    expect(page).toContain('data-testid="mount-olives-access-points"');
    expect(page).toContain("<MountOlivesRouteMap");
    expect(readFileSync("src/components/MountOlivesRouteMap.tsx", "utf8")).toContain('data-testid="mount-olives-map"');
    expect(existsSync("public/maps/mount-of-olives.html")).toBe(true);
    expect(page).toContain('data-testid="mount-olives-walking-routes"');
    expect(page).toContain('data-testid="mount-olives-walking-connections"');
    expect(page).toContain("Pater Noster to Seven Arches");
    expect(page).toContain("Seven Arches to Gethsemane");
    expect(page).toContain("Gethsemane to Lion’s Gate");
    expect(page).toContain("Palm Sunday Road");
    expect(page).toContain("buses 255 and 275");
    expect(page).toContain("at least eight working days");
    expect(page).toContain("14:30–18:00");
    expect(page).toContain('data-tour-id={tour.id}');
    expect(page).toContain("6540P87");
    expect(page).toContain("208675P3");
    expect(page).toContain("CuratedPartnerTourCard");
    expect(page).toContain("viator.tpk.lv/YV4HrN5E");
    expect(page).toContain("mount-olives-visit-choices");
    expect(page).toContain("mobileImageFirst");
    expect(content.photoCredits).toBeTruthy();
    expect(page).toContain("117240P3");
    expect(page).toContain('data-testid="mount-olives-tour-cards"');
    expect(page).toContain("Information Center");
    expect(page).not.toMatch(/Haram al-Sharif|No one has proved/i);
  });

  it("preserves the verified visitor fees and restricted church visiting windows", () => {
    expect(mountOlivesSite.hours).toHaveLength(8);
    const pater = mountOlivesSite.hours.find(item => item.name === "Pater Noster Church");
    const magdalene = mountOlivesSite.hours.find(item => item.name === "Church of St Mary Magdalene");
    const ascension = mountOlivesSite.hours.find(item => item.name === "Chapel of the Ascension");
    expect(pater?.time).toContain("Current temporary hours: Tue & Thu 09:00–12:00");
    expect(pater?.note).toContain("Sat 08:00–12:00");
    expect(pater?.admission).toContain("₪12");
    expect(ascension?.admission).toBe("₪10");
    expect(magdalene?.time).toContain("10:00–12:00");
    expect(content.sources.some(source => source.url === "https://www.cicts.org/our-services/")).toBe(true);
    expect(content.sources.some(source => source.url === mountOlivesSite.official.graveLocator)).toBe(true);
    expect(content.sources.some(source => source.url === mountOlivesSite.official.trailGuide)).toBe(true);
    expect(content.sources.some(source => source.url.includes("6540P87"))).toBe(true);
    expect(content.sources.some(source => source.url.includes("117240P3"))).toBe(true);
    expect(content.sources.some(source => source.url.includes("208675P3"))).toBe(true);
    expect(new Set(content.sources.map(source => source.url)).size).toBe(content.sources.length);
  });
});
