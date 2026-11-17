import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { caesareaDestinationContent as content } from "@/components/CaesareaAttractionPage";
import { caesareaSite as site } from "@/data/caesareaSite";
import { caesareaMeta } from "@/routes/attractions.caesarea";
import { attractionHubCards } from "@/data/attractionsHub";

describe("Caesarea upgraded attraction guide", () => {
  it("uses the shared individual-attraction layout, author, metadata and related links", () => {
    const route = readFileSync("src/routes/attractions.caesarea.tsx", "utf8");
    const shell = readFileSync("src/components/AttractionDestinationPage.tsx", "utf8");
    expect(route).toContain("component: CaesareaAttractionPage");
    expect(route).toContain("caesareaMeta");
    expect(content.path).toBe("/attractions/caesarea/");
    expect(content.title).toBe(site.title);
    expect(content.intro).toBe(site.intro);
    expect(content.updatedAt).toBe(site.updatedAt);
    expect(content.facts).toHaveLength(6);
    expect(content.facts.find(f => f.label === "Admission")?.value).toBe("₪46 adult");
    expect(content.facts.find(f => f.label === "Park hours")?.value).toBe("From 08:00");
    expect(content.visitorNavLabel).toBe("Tickets & hours");
    expect(shell).toContain('["contact", "Contact me"]');
    expect(shell).toContain("<AuthorCard />");
    expect(shell).toContain("<SourcesDisclosure>");
    expect(shell.indexOf("<SourcesDisclosure>")).toBeGreaterThan(shell.indexOf("<HomeContactForm"));
    expect(attractionHubCards.filter(card => card.to === content.path)).toHaveLength(1);
    expect(content.nearby).toHaveLength(6);
    expect(new Set(content.nearby!.map(item => item.to)).size).toBe(6);
    expect(content.planningLinks).toHaveLength(6);
    expect(content.faqs).toHaveLength(8);
    expect(content.sources).toHaveLength(6);
    const meta = caesareaMeta();
    expect(meta.links.find(link => link.rel === "canonical")?.href).toContain("/attractions/caesarea/");
    const article = meta.scripts.map(script => JSON.parse(script.children as string)).find(script => script["@type"] === "Article");
    expect(article.dateModified).toBe("2026-11-17");
    expect(article.citation).toEqual(content.sources.map(source => source.url));
  });

  it("shows verified 2026 park rates, closing rules and separate harbor arrangements", () => {
    const article = readFileSync("src/components/CaesareaAttractionPage.tsx", "utf8");
    expect(site.visit.adult).toBe("₪46");
    expect(site.visit.child).toBe("₪27");
    expect(site.visit.groupAdult).toBe("₪39");
    expect(site.visit.groupChild).toBe("₪23");
    expect(site.visit.israeliSenior).toBe("₪23");
    expect(site.visit.summerRegular).toBe("08:00–17:00");
    expect(site.visit.winterRegular).toBe("08:00–16:00");
    expect(article).toContain("Last park entry is one hour before closing");
    expect(article).toContain("Children under 5 generally enter free");
    expect(article).toContain("harbor visitors' center");
    expect(article).toContain("Caesarea Experience");
    expect(article).toContain('data-testid="caesarea-hours-tickets"');
    expect(article).toContain('data-testid="caesarea-visitor-essentials"');
    expect(article).toContain('data-testid="caesarea-location-map"');
    expect(article).toContain("maps.google.com/maps?q=Caesarea%20National%20Park");
    expect(article).toContain("https://bus.gov.il/en/home");
    expect(article).toContain('carRentalAffiliateUrl("/attractions/caesarea/")');
    expect(article).toContain('rel="sponsored noopener noreferrer"');
    expect(article).toContain('href="#contact"');
    expect(article).toContain('to="/tours/caesarea-haifa-acre/"');
    expect(article).not.toContain("SourceList");
    expect(article).not.toContain("No current official prices");
  });

  it("reuses distinct existing local photos and contains a feasible coastal itinerary", () => {
    const article = readFileSync("src/components/CaesareaAttractionPage.tsx", "utf8");
    for (const path of [
      "src/assets/home/caesarea-dusk-feature.webp",
      "src/assets/home/caesarea-theatre.webp",
      "src/assets/home/hero-caesarea-sm.webp",
      "src/assets/home/caesarea-aqueduct.webp",
      "src/assets/shore-excursions/akko-port.jpg",
      "src/assets/haifa/panorama.webp",
    ]) {
      expect(existsSync(path), path).toBe(true);
    }
    expect(article).toContain("The Roman theater overlooking the sea");
    expect(article).toContain("The hippodrome and promontory palace");
    expect(article).toContain("The ancient harbor and Crusader walls");
    expect(article).toContain("The harbor visitors' center in Herod's vaults");
    expect(article).toContain("The aqueduct on the beach");
    expect(article).toContain("Allow another 20–30 minutes for the aqueduct");
    expect(article).toContain("a separate nearby stop");
    expect(article).toContain("two or three main stops");
  });
});
