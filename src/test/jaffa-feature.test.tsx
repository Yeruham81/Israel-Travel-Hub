import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { jaffaDestinationContent as content } from "@/components/JaffaAttractionPage";
import { jaffaSite } from "@/data/jaffaSite";
import { jaffaMeta } from "@/routes/attractions.jaffa";

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
    expect(content.itineraryTitle).toMatch(/walking routes/i);
    expect(content.navigationSections).toHaveLength(8);
    expect(content.navigationSections?.at(-1)).toEqual(["contact", "Contact me"]);
    expect(content.foodContent).toBeTruthy();
    expect(content.practicalContent).toBeTruthy();
    expect(content.visitorContent).toBeTruthy();
    expect(content.transportContent).toBeTruthy();
    expect(content.nearby).toHaveLength(6);
    expect(new Set(content.nearby!.map(x => x.to)).size).toBe(6);
    expect(content.planningLinks).toHaveLength(6);
    expect(content.sources.length).toBeGreaterThanOrEqual(7);
    expect(component.match(/<AttractionHighlight(?:\s|\n)/g)).toHaveLength(8);
    expect(component).toContain('data-testid="jaffa-walking-routes"');
    expect(component).toContain("around 2–3 hours");
    expect(component).toContain("around 4–5 hours");
    expect(component).toContain("Open short walking route in Google Maps");
    expect(component).toContain("Open half-day walking route in Google Maps");
    // Two complete walking routes plus the existing Clock Tower arrival-directions link.
    expect(component.match(/https:\/\/www\.google\.com\/maps\/dir\/\?api=1/g)).toHaveLength(3);
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
    expect(component).toContain("₪45 adult admission");
    expect(component).toContain("There is no walk-in admission");
    expect(component).toContain("2 Marzouk and Azar Street");
    expect(component).toContain("position: \"38% center\"");
    expect(jaffaSite.official.touristInformation).toBe("https://visit.tel-aviv.gov.il/info/about");
    expect(jaffaSite.official.municipalWalkingGuide).toContain("oldjaffatour.aspx");
    expect(component).toContain("Uri Geller Museum");
    expect(component).toContain("/travel-blog/israel-holidays/");
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
    expect(component).toContain("Museums, cultural performances and optional tours set their own prices");
    expect(component).not.toContain("15–30 NIS");
    expect(component).toContain("10:00–16:00 Sunday–Thursday and Saturday");
    expect(component).not.toContain("Built in 1906");
  });
});
