import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { oldCityJerusalemDestinationContent as content } from "@/components/OldCityJerusalemAttractionPage";
import { oldCityJerusalemSite as site } from "@/data/oldCityJerusalemSite";
import { oldCityJerusalemMeta } from "@/routes/attractions.old-city-jerusalem";
import { attractionHubCards } from "@/data/attractionsHub";

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
    expect(content.sources).toHaveLength(6);
    expect(new Set(content.nearby?.map(x => x.to)).size).toBe(6);
    expect(attractionHubCards.filter(card => card.to === content.path)).toHaveLength(1);
    expect((page.match(/<AttractionHighlight\s+title=/g) || [])).toHaveLength(8);
    const meta = oldCityJerusalemMeta();
    expect(meta.links.find(x => x.rel === "canonical")?.href).toContain(content.path);
    const schema = meta.scripts.map(x => JSON.parse(x.children as string)).find(x => x["@type"] === "Article");
    expect(schema.dateModified).toBe("2026-11-18");
    expect(schema.citation).toContain(site.official.unesco);
  });

  it("correctly distinguishes free sacred places, paid tours and limited worship-site access", () => {
    const page = readFileSync("src/components/OldCityJerusalemAttractionPage.tsx", "utf8");
    expect(page).toContain("Temple Mount / Haram al-Sharif");
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
    expect(page).toContain('JerusalemPartnerOffers id="old-city-jerusalem"');
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
