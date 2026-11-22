import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { qasrElYahudDestinationContent as content } from "@/components/QasrElYahudAttractionPage";
import { qasrElYahudSite as site } from "@/data/qasrElYahudSite";
import { qasrElYahudMeta } from "@/routes/attractions.qasr-el-yahud";
import { attractionHubCards } from "@/data/attractionsHub";

describe("Qasr el-Yahud upgraded attraction guide", () => {
  it("uses the shared attraction design with meaningful links and structured metadata", () => {
    const route = readFileSync("src/routes/attractions.qasr-el-yahud.tsx", "utf8");
    const shell = readFileSync("src/components/AttractionDestinationPage.tsx", "utf8");
    expect(route).toContain("component: QasrElYahudAttractionPage");
    expect(content.path).toBe("/attractions/qasr-el-yahud/");
    expect(content.title).toBe(site.title);
    expect(content.intro).toBe(site.intro);
    expect(content.updatedAt).toBe(site.updatedAt);
    expect(content.facts).toHaveLength(6);
    expect(content.facts.find(x => x.label === "Admission")?.value).toBe("Free");
    expect(content.facts.find(x => x.label === "Time needed")?.value).toBe("45–90 minutes");
    expect(content.visitorNavLabel).toBe("Visit information");
    expect(content.nearby).toHaveLength(6);
    expect(content.nearby?.map(x => x.to)).toContain("/attractions/yardenit/");
    expect(content.nearby?.map(x => x.to)).toContain("/attractions/masada/");
    expect(content.nearby?.map(x => x.to)).toContain("/attractions/old-city-jerusalem/");
    expect(content.planningLinks).toHaveLength(6);
    expect(content.faqs).toHaveLength(8);
    expect(content.sources).toHaveLength(6);
    expect(attractionHubCards.filter(x => x.to === content.path)).toHaveLength(1);
    expect(shell).toContain('["contact", "Contact me"]');
    expect(shell).toContain("<AuthorCard />");
    expect(shell.indexOf("<SourcesDisclosure>")).toBeGreaterThan(shell.indexOf("<HomeContactForm"));
    const meta = qasrElYahudMeta();
    expect(meta.links.find(x => x.rel === "canonical")?.href).toContain("/attractions/qasr-el-yahud/");
    const article = meta.scripts.map(x => JSON.parse(x.children as string)).find(x => x["@type"] === "Article");
    expect(article.dateModified).toBe("2026-11-17");
    expect(article.citation).toEqual(content.sources.map(x => x.url));
  });

  it("displays the verified free admission, mandatory booking and seasonal hours", () => {
    const page = readFileSync("src/components/QasrElYahudAttractionPage.tsx", "utf8");
    expect(site.visit.admission).toBe("Free");
    expect(site.visit.registerSince).toBe("1 January 2026");
    expect(site.visit.summerRegular).toBe("08:00–17:00");
    expect(site.visit.summerFriday).toBe("08:00–16:00");
    expect(site.visit.winterRegular).toBe("08:00–16:00");
    expect(site.visit.winterFriday).toBe("08:00–15:00");
    expect(site.visit.holidayEves).toBe("08:00–13:00");
    expect(site.visit.sitePhone).toBe("02-6504844");
    expect(page).toContain("Free entry — reserve first");
    expect(page).toContain("Book a free Qasr el-Yahud visit");
    expect(page).toContain("up to two weeks in advance");
    expect(page).toContain("href={official.operatorEnglish}");
    expect(page).toContain("free for visitors of all ages");
    expect(page).toContain("Last entry is one hour before closing");
    expect(page).toContain("cover shoulders and knees");
    expect(page).toContain("does not provide clergy");
    expect(page).toContain("official ceremony guidelines");
    expect(page).toContain("separate advance coordination and approval");
    expect(page).toContain("changing rooms and hot showers");
    expect(page).toContain("immersion in the river is not accessible");
    expect(page).toContain("former minefield hazards");
    expect(page).toContain("controlled");
    expect(page).toContain("confirm that your agreement and insurance permit the exact route");
    expect(page).toContain("Kasr el Yahud – The Baptismal Site – The Jordan Pass");
    expect(page).toContain("BusFront");
    expect(page).not.toContain("Footprints");
    expect(page).not.toContain("masadaPhoto");
    expect(page).not.toContain("official.govReserve");
    expect(site.sources.accessibility).toBe("https://www.parks.org.il/new/accessibility/");
    expect(page).toContain('data-testid="qasr-free-reservation"');
    expect(page).toContain('data-testid="qasr-hours-booking"');
    expect(page).toContain('data-testid="qasr-baptism-guidance"');
    expect(page).toContain('data-testid="qasr-location-map"');
    expect(page).toContain('href={"tel:" + visit.sitePhoneInternational}');
    expect(page).toContain('to="/car-rental/"');
    expect(page).not.toContain("carRentalAffiliateUrl");
    expect(page).toContain('to="/tours/bethlehem-jericho-jordan-river/"');
    expect(page).toContain('to="/attractions/yardenit/"');
    expect(page).toContain('to="/travel-blog/baptism-in-the-jordan-river/"');
  });

  it("uses distinct locally available photos without image duplication", () => {
    const page = readFileSync("src/components/QasrElYahudAttractionPage.tsx", "utf8");
    const paths = [
      "src/assets/guides/dead-sea-excursions/qasr-el-yahud-river-deck.jpg",
      "src/assets/guides/dead-sea-excursions/jordan-river-qasr-al-yahud.webp",
      "src/assets/guides/qasr-el-yahud.jpg",
      "public/images/attractions/jordan-river-baptism.webp",
      "src/assets/dead-sea/landscape.webp",
    ];
    for (const path of paths) expect(existsSync(path), path).toBe(true);
    expect(new Set(paths).size).toBe(paths.length);
    expect(site.hero.src).toContain("qasr-el-yahud-river-deck.jpg");
    expect(page).toContain("jordanRiverTourPhoto");
    expect(page).toContain("riverbankPhoto");
    expect(page).toContain('data-testid="qasr-organized-tour"');
    expect(page).toContain('data-testid="qasr-private-journey"');
    expect(page).not.toContain("No published entry prices");
  });
});
