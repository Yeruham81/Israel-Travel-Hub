import { sourceFragment } from "@/test-utils/source-fragment";
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
    expect(route).toMatch(sourceFragment("component: AkkoAttractionPage"));
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
    expect(component.match(/<AttractionHighlight\s+mobileImageFirst/g)).toHaveLength(8);
    expect(attractionHubCards.find(card => card.to === content.path)?.photo.src).toBe(akkoSite.hero.src);
    expect(content.sources.length).toBeGreaterThanOrEqual(6);
    expect(attractionHubCards.filter(card => card.to === content.path)).toHaveLength(1);
    expect(component.match(/<AttractionHighlight(?:\s|\n)/g)).toHaveLength(8);
    expect(component).toMatch(sourceFragment('data-testid="akko-walking-routes"'));
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
    expect(component).toMatch(sourceFragment("Combined heritage ticket"));
    expect(component).toMatch(sourceFragment("Al-Jazzar Mosque"));
    expect(component).toMatch(sourceFragment("Separate admission"));
    expect(component).toMatch(sourceFragment("Templars’ Tunnel"));
    expect(component).toMatch(sourceFragment("temporarily inaccessible for wheelchair users"));
    expect(component).toMatch(sourceFragment("closed on Saturdays and Jewish holidays"));
    expect(component).toMatch(sourceFragment("You can buy the combined ticket online in advance"));
    expect(component).toMatch(sourceFragment("official Old Akko walking map"));
    expect(component).toMatch(sourceFragment("Moat Parking (free)"));
    expect(component).toMatch(sourceFragment("View official tickets and visitor information"));
    expect(component).not.toMatch(sourceFragment("Official ticket options and booking"));
    expect(component).not.toMatch(sourceFragment("What does the combined ticket include?"));
    expect(component).not.toMatch(sourceFragment("Is the Templars’ Tunnel wheelchair accessible?"));
    expect(component).toMatch(sourceFragment("Is Old Akko suitable for families with children?"));
    expect(component).toMatch(sourceFragment("Are the historic attractions open on Saturdays?"));
    expect(component).toMatch(sourceFragment("Free entry"));
    expect(component).toMatch(sourceFragment('data-testid="akko-tour-cards"'));
    expect(component).toContain("ExternalTourCard");
    expect(component).toMatch(sourceFragment('pageId="attractions-akko-acre"'));
    expect(content.photoCredits).toBeTruthy();
    expect(component).toMatch(sourceFragment("Adam Jones (museum collection)"));
    expect(component).toMatch(sourceFragment("Zeev Stein / PikiWiki Israel"));
    expect(component).toMatch(sourceFragment("Yaniv Ben-Arie"));
    expect(component).toMatch(sourceFragment("Deror Avi"));
    expect(component).toContain("creativecommons.org/licenses/by-sa/2.0/");
    expect(component).toMatch(sourceFragment('data-testid="akko-ticket-hours"'));
    expect(component).toMatch(sourceFragment('data-testid="akko-transport"'));
    expect(component).toMatch(sourceFragment('data-testid="akko-arrival-map"'));
    expect(component).toMatch(sourceFragment('data-testid="akko-hours-admission-table"'));
    expect(component).toMatch(sourceFragment('data-testid="akko-food-guide"'));
    expect(component).toMatch(sourceFragment('data-testid="akko-practical-tips"'));
    expect(component).toMatch(sourceFragment("<AkkoAttractionsMap />"));
    expect(component).toMatch(sourceFragment('data-testid="akko-gentler-walk"'));
    expect(component).toMatch(sourceFragment('data-testid="akko-accessibility"'));
    expect(component).toMatch(sourceFragment('href="#contact"'));
    expect(component).not.toMatch(sourceFragment("I am keeping this site in the guide"));
    expect(component).not.toMatch(sourceFragment("Planning a visit to Old Akko?"));
  });

  it("renders exactly eight OSM markers and three attributed tour cards", () => {
    const mapComponent = readFileSync("src/components/AkkoAttractionsMap.tsx", "utf8");
    const mapDocument = readFileSync("public/maps/akko-attractions.html", "utf8");
    const page = readFileSync("src/components/AkkoAttractionPage.tsx", "utf8");
    const registry = readFileSync("src/data/registry.ts", "utf8");
    expect(mapComponent.match(/id: "/g)).toHaveLength(8);
    expect(mapComponent).toMatch(sourceFragment("/maps/akko-attractions.html?points="));
    expect(mapComponent).toMatch(sourceFragment("Show all"));
    expect(mapDocument).toContain("points.length!==8");
    expect(mapDocument).toContain("new maplibregl.Marker");
    expect(mapDocument).toContain("./english-style.json");
    expect(mapDocument).toContain("akko-map-focus");
    expect(mapDocument).toContain("akko-map-selected");
    expect(page).toMatch(sourceFragment('data-testid="akko-tour-cards"'));
    expect(page).toMatch(sourceFragment("grid gap-4 sm:grid-cols-2 lg:grid-cols-3"));
    expect(page).toContain("min-w-[830px]");
    for (const id of [
      "tour-north-coast-small-group-viator@attractions-akko-acre",
      "tour-caesarea-haifa-akko-getyourguide@attractions-akko-acre",
      "tour-coast-coach-tel-aviv-viator@attractions-akko-acre",
    ]) expect(registry).toMatch(sourceFragment(id));
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
