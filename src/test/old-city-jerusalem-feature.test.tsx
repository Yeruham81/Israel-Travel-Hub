import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { oldCityJerusalemDestinationContent as content } from "@/components/OldCityJerusalemAttractionPage";
import { oldCityJerusalemSite as site } from "@/data/oldCityJerusalemSite";
import { oldCityJerusalemMeta } from "@/routes/attractions.old-city-jerusalem";
import { attractionHubCards } from "@/data/attractionsHub";
import { affiliateConfig } from "@/data/registry";
import { offersForTour } from "@/lib/tours";

describe("Jerusalem Old City upgraded attractions guide", () => {
  it("uses the shared destination design, current meta and all eight illustrated landmarks", () => {
    const page = readFileSync("src/components/OldCityJerusalemAttractionPage.tsx", "utf8");
    const route = readFileSync("src/routes/attractions.old-city-jerusalem.tsx", "utf8");
    expect(route).toContain("component: OldCityJerusalemAttractionPage");
    expect(page).toContain("AttractionDestinationPage");
    expect(content.path).toBe("/attractions/old-city-jerusalem/");
    expect(content.title).toBe(site.title);
    expect(content.heroTitle).toBe("Jerusalem's Old City: Sights & Visitor Tips");
    expect(content.highlightsTitle).toBe("What to see in Jerusalem's Old City");
    expect(content.facts).toHaveLength(6);
    expect(content.nearby).toHaveLength(6);
    expect(content.planningLinks).toHaveLength(6);
    expect(content.faqs).toHaveLength(5);
    expect(content.sources).toHaveLength(7);
    expect(new Set(content.nearby?.map(x => x.to)).size).toBe(6);
    expect(attractionHubCards.filter(card => card.to === content.path)).toHaveLength(1);
    expect((page.match(/<AttractionHighlight\s+title=/g) || [])).toHaveLength(8);
    const meta = oldCityJerusalemMeta();
    expect(meta.links.find(x => x.rel === "canonical")?.href).toContain(content.path);
    const schema = meta.scripts.map(x => JSON.parse(x.children as string)).find(x => x["@type"] === "Article");
    expect(schema.dateModified).toBe("2026-11-18");
    expect(schema.citation).toEqual(content.sources.map(source => source.url));
    expect(schema.citation).not.toContain(site.official.accessibleJlmIos);
    expect(schema.citation).not.toContain(site.official.jerusalemTransit);
  });

  it("correctly distinguishes free sacred places, paid tours and limited worship-site access", () => {
    const page = readFileSync("src/components/OldCityJerusalemAttractionPage.tsx", "utf8");
    expect(page).toContain('title="Temple Mount"');
    expect(page).not.toMatch(/Haram al-Sharif|Noble Sanctuary/i);
    expect(page).toContain("Non-Muslim visits");
    expect(page).toContain("interiors of Al-Aqsa Mosque and the Dome of the Rock");
    expect(page).toContain("Entry is free");
    expect(page).toContain("advance booking recommended");
    expect(page).toContain("Western Wall Tunnels");
    expect(page).toContain("Tower of David");
    expect(page).toContain("Via Dolorosa");
    expect(page).toContain("Armenian Quarter");
    expect(page).toContain("Damascus Gate");
    expect(page).toContain('data-testid="jerusalem-old-city-hours-fees"');
    expect(page).toContain('data-testid="jerusalem-old-city-entry"');
    expect(page).toContain('data-testid="jerusalem-old-city-access"');
    expect(page).toContain('data-testid="jerusalem-old-city-gates"');
    expect(page).toContain('data-testid="jerusalem-old-city-map"');
    expect(page).toContain('data-testid="jerusalem-old-city-walking-plans"');
    expect(page).toContain('data-testid="jerusalem-old-city-tour-cards"');
    expect(page).toContain('data-testid="jerusalem-old-city-published-hours"');
    expect(page).toContain('<Link to="/travel-blog/israel-holidays/" className={inlineLink}>Special dates</Link>');
    expect(page).toContain('href={official.tunnelsBooking} target="_blank" rel="noopener noreferrer" className={inlineLink}>by reservation</a>');
    expect(page).toContain("Sunday 12:00–17:00");
    expect(page).toContain("opposite Jaffa Gate Plaza");
    expect(page).toContain("Friday and Shabbat:");
    expect(page).toContain("most city buses stop operating");
    expect(page).toContain('title="Damascus Gate and the Muslim Quarter Markets"');
    expect(page).toContain("Ramparts Walk</a> starts at Jaffa Gate");
    expect(page).toContain("<strong>Armenian Quarter:</strong>");
    expect(page).toContain("plan your morning around that limited visiting window");
    expect(page).toContain("Saturday–Thursday 09:00–16:00 in winter");
    expect(page).toContain("Jaffa Gate–New Gate section of the northern route");
    expect(page).toContain("starts at Jaffa Gate, not Damascus Gate");
    expect(page).toContain("not wheelchair accessible or suitable for baby strollers");
    expect(page).toContain("official tour-by-tour accessibility guidance");
    expect(page).toContain("Accessible JLM for iPhone");
    expect(page).toContain("normally limited to Sunday–Thursday");
    expect(page).toContain("Cathedral of St. James");
    expect(page).toContain("Christian Quarter Road");
    expect(page).not.toContain("follows accessible sections of the city walls");
    expect(site.official.tunnels).toBe("https://thekotel.org/en/book-a-tour/");
    expect(content.relatedTitle).toBe("Explore Jerusalem and day trips across Israel");
    expect(page).toContain('data-testid="jerusalem-old-city-featured-tours"');
    expect((page.match(/<AttractionPracticalTip>/g) || [])).toHaveLength(4);
    expect(page).toContain("Following the Via Dolorosa?");
    expect(page).toContain("If you book a Western Wall Tunnels tour");
    expect(page).toContain("Meeting a driver after your walk?");
    expect(page).toContain("Tour details, availability, prices and booking conditions are set by the tour operators");
    expect(page).toContain("cancellation policy directly with the booking provider");
    expect(page).not.toContain("Ratings are previously checked booking-platform snapshots.");
    expect(page).toContain("ExternalTourCard");
    expect(page).not.toContain('JerusalemPartnerOffers id="old-city-jerusalem"');
    expect(affiliateConfig["tour-jerusalem-old-city-walk-viator@attractions-old-city-jerusalem"]?.trackingUrl).toBe("https://viator.tpm.li/NfTH03Dg");
    expect(offersForTour("jerusalem-private-oldcity-walk", "attractions-old-city-jerusalem")[0]?.provider.isAffiliate).toBe(true);
    expect(page).toContain("contactIntroduction:");
    expect(page).not.toContain("Planning a visit to Jerusalem's Old City? Tell me");
    expect(site.visitor.towerAdult).toBe("₪55");
    expect(site.visitor.rampartsAdult).toBe("₪25");
  });

  it("keeps the eight landmark photos optimized, distinct and hosted locally", () => {
    const photoNames = [
      "old-jerusalem-western-wall.webp", "old-jerusalem-holy-sepulchre.webp",
      "old-jerusalem-via-dolorosa.webp", "old-jerusalem-temple-mount.webp",
      "old-jerusalem-cardo.webp", "old-jerusalem-tower-of-david.webp",
      "old-jerusalem-western-wall-tunnels.webp", "old-jerusalem-damascus-gate.webp",
    ];
    const page = readFileSync("src/components/OldCityJerusalemAttractionPage.tsx", "utf8");
    for (const name of photoNames) {
      expect(existsSync("public/images/attractions/" + name), name).toBe(true);
      expect(page.includes(name), name).toBe(true);
    }
    expect(new Set(photoNames).size).toBe(8);
    expect(page).not.toContain("upload.wikimedia.org");
  });
});
