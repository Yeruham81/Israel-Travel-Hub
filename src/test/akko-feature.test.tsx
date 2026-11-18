import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { akkoDestinationContent as content } from "@/components/AkkoAttractionPage";
import { akkoSite } from "@/data/akkoSite";
import { akkoMeta } from "@/routes/attractions.akko-acre";
import { attractionHubCards } from "@/data/attractionsHub";

describe("Old Akko heritage attractions guide", () => {
  it("uses the unified destination design, canonical URL and eight illustrated local sights", () => {
    const route = readFileSync("src/routes/attractions.akko-acre.tsx", "utf8");
    const component = readFileSync("src/components/AkkoAttractionPage.tsx", "utf8");
    expect(route).toContain("component: AkkoAttractionPage");
    expect(component).toContain("AttractionDestinationPage");
    expect(content.path).toBe("/attractions/akko-acre/");
    expect(content.title).toBe(akkoSite.title);
    expect(content.heroTitle).toBe("Old Akko (Acre): Attractions & Tickets");
    expect(content.highlightsTitle).toBe("What to see in Old Akko");
    expect(content.intro).toBe(akkoSite.intro);
    expect(content.facts).toHaveLength(6);
    expect(content.nearby).toHaveLength(6);
    expect(new Set(content.nearby!.map(x=>x.to)).size).toBe(6);
    expect(content.planningLinks).toHaveLength(6);
    expect(content.faqs).toHaveLength(5);
    expect(content.sources.length).toBeGreaterThanOrEqual(6);
    expect(attractionHubCards.filter(card => card.to === content.path)).toHaveLength(1);
    expect(component.match(/<AttractionHighlight(?:\s|\n)/g)).toHaveLength(8);
    expect(component).toContain('data-testid="akko-walking-routes"');
    const meta = akkoMeta();
    expect(meta.links.find(x => x.rel === "canonical")?.href).toContain(content.path);
    const article = meta.scripts.map(x => JSON.parse(x.children as string))
      .find(x => x["@type"] === "Article");
    expect(article.dateModified).toBe("2026-11-18");
    expect(article.citation).toContain(akkoSite.official.accessibility);
  });

  it("explains combined tickets, distinct opening hours and the tunnel access caveat", () => {
    const component = readFileSync("src/components/AkkoAttractionPage.tsx", "utf8");
    expect(akkoSite.visitor.comboAdult).toBe("₪55");
    expect(component).toContain("Combined heritage ticket");
    expect(component).toContain("Al-Jazzar Mosque");
    expect(component).toContain("Separate admission");
    expect(component).toContain("Templars’ Tunnel");
    expect(component).toContain("wheelchair access is unavailable");
    expect(component).toContain("closed on Saturdays and Jewish holidays");
    expect(component).toContain("Booking online is recommended but not compulsory");
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
    expect(component).toContain("akkoTourPhoto");
    expect(component).toContain("haifaCoastPhoto");
    expect(content.photoCredits).toBeTruthy();
    expect(component).toContain("Adam Jones (museum collection)");
    expect(component).toContain("Zeev Stein / PikiWiki Israel");
    expect(component).toContain("Yaniv Ben-Arie");
    expect(component).toContain("Deror Avi");
    expect(component).toContain("creativecommons.org/licenses/by-sa/2.0/");
    expect(component).toContain('data-testid="akko-ticket-hours"');
    expect(component).toContain('data-testid="akko-transport"');
    expect(component).toContain('data-testid="akko-map"');
    expect(component).toContain('data-testid="akko-accessibility"');
    expect(component).toContain('href="#contact"');
    expect(component).not.toContain("I am keeping this site in the guide");
    expect(component).not.toContain("Planning a visit to Old Akko?");
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
