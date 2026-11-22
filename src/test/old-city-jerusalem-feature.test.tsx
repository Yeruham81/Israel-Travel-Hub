import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { oldCityJerusalemDestinationContent as content } from "@/components/OldCityJerusalemAttractionPage";
import { oldCityJerusalemSite as site } from "@/data/oldCityJerusalemSite";
import { oldCityJerusalemMeta } from "@/routes/attractions.old-city-jerusalem";
import { attractionHubCards } from "@/data/attractionsHub";
import { affiliateConfig, tourProducts } from "@/data/registry";
import { offersForTour } from "@/lib/tours";

const page = readFileSync("src/components/OldCityJerusalemAttractionPage.tsx", "utf8");
const mapComponent = readFileSync("src/components/OldCityJerusalemRouteMap.tsx", "utf8");
const mapHtml = readFileSync("public/maps/jerusalem-old-city.html", "utf8");

describe("Jerusalem Old City — upgraded visitor guide", () => {
  it("uses the new panoramic hero consistently on the page and linked attraction cards", () => {
    const route = readFileSync("src/routes/attractions.old-city-jerusalem.tsx", "utf8");
    expect(route).toContain("component: OldCityJerusalemAttractionPage");
    expect(content.path).toBe("/attractions/old-city-jerusalem/");
    expect(content.title).toBe(site.title);
    expect(content.heroTitle).toBe("Jerusalem’s Old City: What to See & How to Visit");
    expect(readFileSync("src/data/oldCityJerusalemSite.ts", "utf8")).toContain('import oldCityPanorama from "@/assets/home/jerusalem-old-city.webp"');
    expect(site.hero.src).not.toContain("via-dolorosa");
    expect(existsSync("src/assets/home/jerusalem-old-city.webp")).toBe(true);
    expect(content.hero.src).toBe(site.hero.src);
    expect(attractionHubCards.find(card => card.to === content.path)?.photo.src).toBe(site.hero.src);
    expect((page.match(/<AttractionHighlight mobileImageFirst/g) ?? [])).toHaveLength(8);
    expect(content.itineraryFirst).toBe(true);
    expect(content.itineraryTitle).toBe("Plan your Old City visit");
    expect(content.facts).toHaveLength(6);
    expect(content.faqs).toHaveLength(7);
    expect(content.sources).toHaveLength(8);
    const meta = oldCityJerusalemMeta();
    expect(meta.links.some(link => link.rel === "canonical" && link.href?.includes(content.path))).toBe(true);
    const article = meta.scripts.map(script => JSON.parse(script.children as string)).find(schema => schema["@type"] === "Article");
    expect(article.dateModified).toBe("2026-11-23");
    expect(article.citation).toEqual(content.sources.map(source => source.url));
  });

  it("illustrates the eight local landmarks and provides a multi-pin map of six entrances", () => {
    const images = [
      "old-jerusalem-western-wall.webp", "old-jerusalem-holy-sepulchre.webp",
      "old-jerusalem-via-dolorosa.webp", "old-jerusalem-temple-mount.webp",
      "old-jerusalem-cardo.webp", "old-jerusalem-tower-of-david.webp",
      "old-jerusalem-western-wall-tunnels.webp", "old-jerusalem-damascus-gate.webp",
    ];
    for (const name of images) {
      expect(existsSync("public/images/attractions/" + name), name).toBe(true);
      expect(page).toContain(name);
    }
    expect(page).toContain("<OldCityJerusalemRouteMap />");
    expect(mapComponent).toContain('data-testid="jerusalem-old-city-map"');
    expect(mapComponent).toContain('const overviewUrl = "/maps/jerusalem-old-city.html?points="');
    expect(mapComponent).toContain('type: "jerusalem-old-city-map-focus"');
    expect(mapComponent).toContain("jerusalem-old-city-map-selected");
    expect(mapComponent).toContain('focus("all")');
    expect(mapHtml).toContain("points.length!==14");
    expect(mapHtml).toContain("new maplibregl.Marker");
    expect(mapHtml).toContain("points.forEach");
    expect(mapHtml).toContain('point.type==="site"');
    expect(mapHtml).toContain("www.google.com/maps/search");
    expect(mapHtml).not.toContain("travelmode=driving");
    const sitePins = [...mapComponent.matchAll(/type: "site" \}/g)];
    const gatePins = [...mapComponent.matchAll(/type: "gate" \}/g)];
    expect(sitePins).toHaveLength(8);
    expect(gatePins).toHaveLength(6);
    for (const gate of ["Jaffa Gate", "Dung Gate", "Damascus Gate", "Zion Gate", "Lion's Gate", "New Gate"])
      expect(mapComponent).toContain(gate);
  });

  it("compares hours and admission as a real mobile-scrollable table and offers useful routes", () => {
    for (const required of [
      'data-testid="jerusalem-old-city-hours-fees"',
      'min-w-[830px]', 'overflow-x-auto', 'sticky left-0',
      'data-testid="jerusalem-old-city-visit-choices"',
      'data-testid="jerusalem-old-city-walking-plans"',
      'data-testid="jerusalem-old-city-walking-connections"',
      'data-testid="jerusalem-old-city-access"',
      'data-testid="jerusalem-old-city-entry"',
      'data-testid="jerusalem-old-city-gates"',
      'data-testid="jerusalem-old-city-published-hours"',
      "Two suggested walking routes", "via-dolorosa", "Western Wall Tunnels",
      "Ramparts Walk", "Cathedral of St. James",
    ]) {
      expect(page).toContain(required);
    }
    expect(page).toContain("The Old City's major landmarks");
    expect(page).toContain("Via Dolorosa and the Christian Quarter");
    expect(page).toContain("The <strong>southern route</strong>");
    expect(page).toContain("The <strong>northern route</strong>");
    expect(page).toContain("Sunday–Thursday");
    expect(page).toContain("Accessible JLM");
    expect(page).toContain("Friday and Shabbat:");
    expect((page.match(/<AttractionPracticalTip>/g) ?? [])).toHaveLength(4);
    expect(site.visitor.towerAdult).toBe("₪55");
    expect(site.visitor.rampartsAdult).toBe("₪25");
    expect(page).not.toContain('id="via-dolorosa-guide"');
  });

  it("keeps three Travelpayouts tour cards focused on visitors who are in Jerusalem", () => {
    expect(page).toContain('data-testid="jerusalem-old-city-featured-tours"');
    expect(page).toContain("lg:grid-cols-3");
    expect(page).toContain("<ExternalTourCard");
    expect(page).toContain("<CuratedPartnerTourCard");
    expect(page).toContain("https://viator.tpk.lv/YV4HrN5E");
    expect(page).toContain('pageId="attractions-old-city-jerusalem"');
    expect(page).not.toContain('tour.id === "jerusalem-day-tel-aviv"');
    for (const id of ["jerusalem-old-city-walk", "jerusalem-private-oldcity-walk"]) {
      expect(tourProducts.find(tour => tour.id === id)?.originIds).toContain("jerusalem");
      expect(offersForTour(id, "attractions-old-city-jerusalem").some(offer => offer.provider.isAffiliate)).toBe(true);
    }
    expect(affiliateConfig["tour-jerusalem-old-city-walk-viator@attractions-old-city-jerusalem"]?.trackingUrl).toBe("https://viator.tpm.li/NfTH03Dg");
  });

  it("shows six relevant Jerusalem guides, and reserves the Via Dolorosa link for its future page", () => {
    expect(content.relatedTitle).toBe("Continue exploring Jerusalem");
    const expected = [
      "/attractions/mount-of-olives/", "/attractions/mount-zion/",
      "/travel-blog/jerusalem-travel-guide/", "/travel-blog/churches-in-jerusalem/",
      "/travel-blog/museums-in-jerusalem/", "/attractions/via-dolorosa/",
    ];
    expect(content.nearby?.map(item => item.to)).toEqual(expected);
    expect(content.planningLinks).toHaveLength(6);
    expect(page).toContain("contactIntroduction:");
    expect(page).not.toContain('<Link to="/attractions/via-dolorosa/"');
  });
});
