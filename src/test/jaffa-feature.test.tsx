import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { jaffaDestinationContent as content } from "@/components/JaffaAttractionPage";
import { jaffaSite } from "@/data/jaffaSite";
import { jaffaMeta } from "@/routes/attractions.jaffa";
import { tourProducts } from "@/data/registry";
import { offersForTour, tourSnapshotPrice } from "@/lib/tours";

describe("Jaffa multi-stop city attractions guide", () => {
  it("uses the same flexible attraction template as Akko with route-first city content", () => {
    const component = readFileSync("src/components/JaffaAttractionPage.tsx", "utf8");
    const route = readFileSync("src/routes/attractions.jaffa.tsx", "utf8");
    expect(route).toContain("component: JaffaAttractionPage");
    expect(component).toContain("AttractionDestinationPage");
    expect(content.path).toBe("/attractions/jaffa/");
    expect(content.heroTitle).toBe("Old Jaffa: Attractions & Walking Guide");
    expect(content.facts).toHaveLength(6);
    expect(content.itineraryFirst).toBe(true);
    expect(content.itineraryBeforeHighlights).toBe(true);
    expect(content.itineraryTitle).toMatch(/walking routes/i);
    expect(content.navigationSections).toHaveLength(12);
    expect(content.navigationSections?.[0]).toEqual(["visit-plan", "Walking routes & map"]);
    expect(content.navigationSections?.find(entry => entry[0] === "history")).toBeTruthy();
    expect(content.navigationSections?.find(entry => entry[0] === "trip-planning")).toBeTruthy();
    expect(content.navigationSections?.find((entry) => entry[0] === "food")).toEqual(["food", "Food & cafés"]);
    expect(content.navigationSections?.at(-1)).toEqual(["contact", "Contact me"]);
    expect(content.foodContent).toBeTruthy();
    expect(content.practicalContent).toBeTruthy();
    expect(content.visitorContent).toBeTruthy();
    expect(content.transportContent).toBeTruthy();
    expect(content.nearby).toHaveLength(6);
    expect(new Set(content.nearby!.map(x => x.to)).size).toBe(6);
    expect(content.planningLinks).toHaveLength(6);
    expect(content.sources.length).toBeGreaterThanOrEqual(7);
    expect(component.match(/<AttractionHighlight(?:\s|\n)/g)).toHaveLength(10);
    expect(component.match(/<AttractionHighlight mobileImageFirst/g)).toHaveLength(10);
    expect(component).toContain("src: photos.mosque");
    expect(component).toContain("src: photos.square");
    expect(component).toContain('data-testid="jaffa-walking-routes"');
    expect(component).toContain("around 2–3 hours");
    expect(component).toContain("around 4–5 hours");
    expect(component).toContain("<JaffaAttractionsMap />");
    expect(component).toContain("jaffa-gentler-walk");
    expect(component).toContain("jaffa-hours-admission-table");
    expect(component).toContain("jaffa-parking-directions");
    expect(component).toContain("min-w-[810px]");
    expect(component).toContain('pageId="attractions-jaffa"');
    expect(component).toContain("ExternalTourCard");
    expect(component).toContain("Open short walking route in Google Maps");
    expect(component).toContain("Open half-day walking route in Google Maps");
    expect(component).toContain("Art lovers can add the");
    expect(component).toContain('href={official.museum} target="_blank"');
    expect(component).not.toContain("Ilana Goor Museum on Google Maps");
    expect(component).toContain("Mazal%20Dagim%20Street");
    expect(component).toContain("HaPisga%20Garden");
    expect(component).not.toContain("waypoints=Jaffa%20Clock%20Tower%2C%20Tel%20Aviv-Yafo%2C%20Israel%7CKedumim");
    // Two complete walking routes plus the existing Clock Tower arrival-directions link.
    expect(component.match(/https:\/\/www\.google\.com\/maps\/dir\/\?api=1/g)!.length).toBeGreaterThanOrEqual(7);
    expect(component).toContain('data-testid="jaffa-transport"');
    expect(component).toContain("Shalma");
    expect(component).toContain("DAN KAL");
    expect(component).toContain("href=\"#contact\"");
  });

  it("has canonical SEO, original image assets and verified operator references", () => {
    const meta = jaffaMeta();
    expect(meta.links.find(x => x.rel === "canonical")?.href).toContain(content.path);
    const article = meta.scripts.map(x => JSON.parse(x.children as string)).find(x => x["@type"] === "Article");
    expect(article.dateModified).toBe(jaffaSite.updatedAt);
    expect(article.citation).toContain(jaffaSite.official.municipalWalkingMap);
    const component = readFileSync("src/components/JaffaAttractionPage.tsx", "utf8");
    expect(component).not.toMatch(/https?:\/\/(?:images\.unsplash|upload\.wikimedia)/);
    expect(component).toContain("Na Laga'at Center");
    expect(component).toContain("Ilana Goor Museum");
    expect(component).toContain("₪45 adult");
    expect(component).toMatch(/advance reservations?/i);
    expect(component).toContain("Sun–Thu 09:00–17:00; Fri 09:00–14:00");
    expect(component).toContain("Naim BaSofash weekend service");
    expect(component).toContain("Dr. Avishai Teicher / PikiWiki Israel");
    expect(component).toContain("CC BY 2.5");
    expect(jaffaSite.official.municipalWalkMapShort).toMatch(/\.pdf$/);
    expect(jaffaSite.official.weekendBuses).toContain("naimbesofash");
    expect(component).toContain("2 Marzouk & Azar St");
    expect(component).toContain("position: \"38% center\"");
    expect(jaffaSite.official.touristInformation).toBe("https://visit.tel-aviv.gov.il/info/about");
    expect(jaffaSite.official.municipalWalkingGuide).toContain("oldjaffatour.aspx");
    expect(component).toContain("Uri Geller Museum");
    expect(component).toContain("/travel-blog/calendar-of-events/");
    const names = [
      "jaffa-panorama.webp", "jaffa-clock-tower.webp", "jaffa-mahmoudiya-mosque.webp",
      "jaffa-kedumim-square.webp", "jaffa-st-peters-church.webp", "jaffa-zodiac-alleys.webp",
      "jaffa-summit-garden.webp", "jaffa-port.webp", "jaffa-flea-market.webp",
      "jaffa-ilana-goor-museum.webp", "jaffa-nalagaat-center.webp", "jaffa-food.webp",
    ];
    expect(new Set(names).size).toBe(names.length);
    for (const name of names) {
      expect(existsSync("public/images/attractions/" + name), name).toBe(true);
    }
  });

  it("does not insert invented all-city opening hours or admission fees", () => {
    const component = readFileSync("src/components/JaffaAttractionPage.tsx", "utf8");
    expect(component).toContain("Jaffa is a historic port city and part of modern Tel Aviv–Yafo");
    expect(component).not.toContain("The photo shows the coastal vista");
    expect(component).not.toContain("For help planning your walk, the city lists a");
    expect(component).toContain("bronze plaques depicting the twelve zodiac signs");
    expect(component).toContain("Museums, cultural performances and optional tours set their own prices");
    expect(component).not.toContain("15–30 NIS");
    expect(component).toContain("Sun–Thu & Sat 10:00–16:00");
    expect(component).not.toContain("Built in 1906");
    const mapComponent = readFileSync("src/components/JaffaAttractionsMap.tsx", "utf8");
    expect(mapComponent.match(/query: "/g)).toHaveLength(12);
    expect(mapComponent).toContain("/maps/jaffa-attractions.html?points=");
    expect(mapComponent).toContain("aria-pressed={selectedId === stop.id}");
    expect(mapComponent).toContain("Show all");
    expect(mapComponent).not.toContain("{index + 1}. {selected.name}");
    const staticMap = readFileSync("public/maps/jaffa-attractions.html", "utf8");
    expect(staticMap).toContain("Twelve numbered Old Jaffa attractions");
    expect(staticMap).toContain("new maplibregl.Marker");
    expect(staticMap).toContain("map.fitBounds(bounds");
    expect(staticMap).toContain("jaffa-map-focus");
    expect(staticMap).toContain("jaffa-map-selected");
    expect(staticMap).toContain("./english-style.json");
    expect(staticMap).not.toContain("maps.google.com/maps?q=");
    const registry = readFileSync("src/data/registry.ts", "utf8");
    expect(registry).toContain("tour-old-jaffa-walk-viator@attractions-jaffa");
    expect(registry).toContain("tour-tel-aviv-jaffa-small-group-viator@attractions-jaffa");
    expect(registry).toContain("tour-jaffa-carmel-walk-getyourguide@attractions-jaffa");
    expect(component).toContain('title="Google Maps overview of the Jaffa Clock Tower, historic hill and nearby parking areas"');
    const products = ["old-jaffa-walk", "tel-aviv-jaffa-small-group", "jaffa-carmel-walk"].map(id => tourProducts.find(tour => tour.id === id)!);
    expect(products.map(tour => tour.rating?.value)).toEqual([4.1, 4.6, 4.8]);
    expect(products.map(tour => tour.rating?.count)).toEqual([16, 9, 62]);
    const reviewedOn = new Date("2026-11-23T12:00:00Z");
    expect(tourSnapshotPrice(offersForTour("old-jaffa-walk", "attractions-jaffa")[0]!, reviewedOn)?.amount).toBe(60);
    expect(tourSnapshotPrice(offersForTour("tel-aviv-jaffa-small-group", "attractions-jaffa")[0]!, reviewedOn)?.amount).toBe(169);
    expect(tourSnapshotPrice(offersForTour("jaffa-carmel-walk", "attractions-jaffa")[0]!)).toBeUndefined();
  });
});
