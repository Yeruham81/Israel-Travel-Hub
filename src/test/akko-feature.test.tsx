import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { akkoDestinationContent as content } from "@/components/AkkoAttractionPage";
import { akkoSite } from "@/data/akkoSite";
import { akkoMeta } from "@/routes/attractions.akko-acre";
import { attractionHubCards } from "@/data/attractionsHub";
import { tourProducts } from "@/data/registry";

describe("Old Akko heritage attractions guide", () => {
  it("uses the unified destination design, canonical URL and eight illustrated local sights", () => {
    const route = readFileSync("src/routes/attractions.akko-acre.tsx", "utf8");
    const component = readFileSync("src/components/AkkoAttractionPage.tsx", "utf8");
    expect(route).toContain("component: AkkoAttractionPage");
    expect(component).toContain("AttractionDestinationPage");
    expect(content.path).toBe("/attractions/akko-acre/");
    expect(content.title).toBe(akkoSite.title);
    expect(content.heroTitle).toBe("Old Akko (Acre): Attractions & Walking Guide");
    expect(content.highlightsTitle).toBe("What to see in Old Akko");
    expect(content.intro).toBe(akkoSite.intro);
    expect(content.facts).toHaveLength(6);
    expect(content.nearby).toHaveLength(6);
    expect(new Set(content.nearby!.map(x=>x.to)).size).toBe(6);
    expect(content.planningLinks).toHaveLength(6);
    expect(content.faqs).toHaveLength(5);
    expect(content.itineraryBeforeHighlights).toBe(true);
    expect(content.navigationSections?.length).toBe(12);
    expect(content.foodContent).toBeTruthy();
    expect(content.practicalContent).toBeTruthy();
    expect(component.match(/<AttractionHighlight mobileImageFirst/g)).toHaveLength(8);
    expect(attractionHubCards.find(card => card.to === content.path)?.photo.src).toBe(akkoSite.hero.src);
    expect(content.sources.length).toBeGreaterThanOrEqual(6);
    expect(attractionHubCards.filter(card => card.to === content.path)).toHaveLength(1);
    expect(component.match(/<AttractionHighlight(?:\s|\n)/g)).toHaveLength(8);
    expect(component).toContain('data-testid="akko-walking-routes"');
    const meta = akkoMeta();
    expect(meta.links.find(x => x.rel === "canonical")?.href).toContain(content.path);
    const article = meta.scripts.map(x => JSON.parse(x.children as string))
      .find(x => x["@type"] === "Article");
    expect(article.dateModified).toBe("2026-11-23");
    expect(article.citation).toContain(akkoSite.official.accessibility);
  });

  it("explains combined tickets, distinct opening hours and the tunnel access caveat", () => {
    const component = readFileSync("src/components/AkkoAttractionPage.tsx", "utf8");
    expect(akkoSite.visitor.comboAdult).toBe("₪55");
    expect(component).toContain("Combined heritage ticket");
    expect(component).toContain("Al-Jazzar Mosque");
    expect(component).toContain("Separate admission");
    expect(component).toContain("Templars’ Tunnel");
    expect(component).toContain("temporarily inaccessible for wheelchair users");
    expect(component).toContain("closed on Saturdays and Jewish holidays");
    expect(component).toContain("You can buy the combined ticket online in advance");
    expect(component).toContain("official Old Akko walking map");
    expect(component).toContain("Moat Parking (free)");
    expect(component).toContain("View official tickets and visitor information");
    expect(component).not.toContain("Official ticket options and booking");
    expect(component).not.toContain("What does the combined ticket include?");
    expect(component).not.toContain("Is the Templars’ Tunnel wheelchair accessible?");
    expect(component).toContain("Is Old Akko suitable for families with children?");
    expect(component).toContain("Are the historic attractions open on Saturdays?");
    expect(component).toContain("Free entry");
    expect(component).toContain('data-testid="akko-tour-cards"');
    expect(component).toContain("ExternalTourCard");
    expect(component).toContain('pageId="attractions-akko-acre"');
    expect(content.photoCredits).toBeTruthy();
    expect(component).toContain("Adam Jones (museum collection)");
    expect(component).toContain("Zeev Stein / PikiWiki Israel");
    expect(component).toContain("Yaniv Ben-Arie");
    expect(component).toContain("Deror Avi");
    expect(component).toContain("creativecommons.org/licenses/by-sa/2.0/");
    expect(component).toContain('data-testid="akko-ticket-hours"');
    expect(component).toContain('data-testid="akko-transport"');
    expect(component).toContain('data-testid="akko-arrival-map"');
    expect(component).toContain('data-testid="akko-hours-admission-table"');
    expect(component).toContain('data-testid="akko-food-guide"');
    expect(component).toContain('data-testid="akko-practical-tips"');
    expect(component).toContain("<AkkoAttractionsMap />");
    expect(component).toContain('data-testid="akko-gentler-walk"');
    expect(component).toContain('data-testid="akko-accessibility"');
    expect(component).toContain('href="#contact"');
    expect(component).not.toContain("I am keeping this site in the guide");
    expect(component).not.toContain("Planning a visit to Old Akko?");
  });

  it("renders exactly eight OSM markers and three attributed tour cards", () => {
    const mapComponent = readFileSync("src/components/AkkoAttractionsMap.tsx", "utf8");
    const mapDocument = readFileSync("public/maps/akko-attractions.html", "utf8");
    const page = readFileSync("src/components/AkkoAttractionPage.tsx", "utf8");
    const registry = readFileSync("src/data/registry.ts", "utf8");
    expect(mapComponent.match(/id: "/g)).toHaveLength(8);
    expect(mapComponent).toContain("/maps/akko-attractions.html?points=");
    expect(mapComponent).toContain("Show all");
    expect(mapDocument).toContain("points.length!==8");
    expect(mapDocument).toContain("new maplibregl.Marker");
    expect(mapDocument).toContain("./english-style.json");
    expect(mapDocument).toContain("akko-map-focus");
    expect(mapDocument).toContain("akko-map-selected");
    expect(page).toContain('data-testid="akko-tour-cards"');
    expect(page).toContain("grid gap-4 sm:grid-cols-2 lg:grid-cols-3");
    expect(page).toContain("min-w-[830px]");
    for (const id of [
      "tour-north-coast-small-group-viator@attractions-akko-acre",
      "tour-caesarea-haifa-akko-getyourguide@attractions-akko-acre",
      "tour-coast-coach-tel-aviv-viator@attractions-akko-acre",
    ]) expect(registry).toContain(id);
    expect(["north-coast-small-group", "caesarea-haifa-akko", "coast-coach-tel-aviv"].map(id => tourProducts.find(tour => tour.id === id)?.rating?.value)).toEqual([5, 4.3, 4.4]);
    expect(["north-coast-small-group", "caesarea-haifa-akko", "coast-coach-tel-aviv"].map(id => tourProducts.find(tour => tour.id === id)?.rating?.count)).toEqual([6, 750, 409]);
  });

  it("hosts distinct optimized images locally for all eight attractions", () => {
    const names = [
      "akko-knights-halls.webp",
      "akko-templar-tunnel.webp",
      "akko-turkish-bath.webp",
      "akko-al-jazzar-mosque.webp",
      "akko-market.webp",
      "akko-fishing-harbour.webp",
      "akko-treasures-museum.webp",
      "akko-ramchal-synagogue.webp",
    ];
    for(const name of names) {
      expect(existsSync("public/images/attractions/" + name), name).toBe(true);
    }
    expect(new Set(names).size).toBe(8);
    const component = readFileSync("src/components/AkkoAttractionPage.tsx", "utf8");
    expect(component).not.toContain("upload.wikimedia.org");
  });
});
