import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { masadaDestinationContent as content } from "@/components/MasadaAttractionPage";
import { masadaSite as site } from "@/data/masadaSite";
import { masadaMeta } from "@/routes/attractions.masada";
import { attractionHubCards } from "@/data/attractionsHub";
import { einGediCardPhoto } from "@/data/einGediCardPhoto";
import { attractionGuides } from "@/data/attractionGuides";

describe("Masada upgraded attraction guide", () => {
  it("uses the shared attraction layout, author, sources, metadata and related guides", () => {
    const route = readFileSync("src/routes/attractions.masada.tsx", "utf8");
    const shell = readFileSync("src/components/AttractionDestinationPage.tsx", "utf8");
    expect(route).toContain("component: MasadaAttractionPage");
    expect(content.path).toBe("/attractions/masada/");
    expect(content.title).toBe(site.title);
    expect(content.intro).toBe(site.intro);
    expect(content.facts).toHaveLength(6);
    expect(content.facts.find(f => f.label === "Entry")?.value).toBe("₪37 adult");
    expect(content.visitorNavLabel).toBe("Tickets & hours");
    expect(content.nearby).toHaveLength(6);
    expect(content.nearby?.map(x => x.to)).toContain("/attractions/mount-of-olives/");
    expect(content.nearby?.map(x => x.to)).toContain("/attractions/mount-zion/");
    expect(content.nearby?.map(x => x.to)).toContain("/attractions/ein-gedi/");
    expect(new Set(content.nearby!.map(x => x.to)).size).toBe(content.nearby!.length);
    expect(content.planningLinks).toHaveLength(6);
    expect(content.faqs).toHaveLength(8);
    expect(content.sources).toHaveLength(8);
    expect(attractionHubCards.filter(card => card.to === content.path)).toHaveLength(1);
    const einGediCard = attractionHubCards.find(card => card.to === "/attractions/ein-gedi/");
    expect(einGediCard?.photo).toEqual(einGediCardPhoto);
    expect(attractionGuides["ein-gedi"].image).toEqual(einGediCardPhoto);
    expect(einGediCardPhoto.src).toContain("ein-gedi-waterfall.webp");
    expect(einGediCardPhoto.alt).toContain("Ein Gedi Nature Reserve");
    expect(shell).toContain('["contact", "Contact me"]');
    expect(shell).toContain("<AuthorCard />");
    expect(shell.indexOf("<SourcesDisclosure>")).toBeGreaterThan(shell.indexOf("<HomeContactForm"));
    const meta = masadaMeta();
    expect(meta.links.find(l => l.rel === "canonical")?.href).toContain("/attractions/masada/");
    const article = meta.scripts.map(script => JSON.parse(script.children as string)).find(s => s["@type"] === "Article");
    expect(article.dateModified).toBe("2026-11-17");
    expect(article.citation).toEqual(content.sources.map(s => s.url));
  });

  it("shows accurate admission and cable prices, weather and east-west access", () => {
    const page = readFileSync("src/components/MasadaAttractionPage.tsx", "utf8");
    expect(site.visit.adult).toBe("₪37");
    expect(site.visit.child).toBe("₪21");
    expect(site.visit.cableOneWayAdult).toBe("₪32");
    expect(site.visit.cableReturnAdult).toBe("₪54");
    expect(site.visit.cableReturnChild).toBe("₪32");
    expect(site.visit.yomKippurEve).toBe("08:00–12:00");
    expect(site.visit.specialHolidayEves).toBe("08:00–13:00");
    expect(page).toContain("groups of more than 30");
    expect(page).toContain("regular park admission");
    expect(page).toContain("time reservation is required");
    expect(page).toContain("Masada East — Route 90");
    expect(page).toContain("Masada West — Road 3199");
    expect(page).toContain("no direct road connection");
    expect(page).toContain("during extreme summer heat");
    expect(page).toContain("special sunrise cable-car departures");
    expect(page).toContain('data-testid="masada-hours-tickets"');
    expect(page).toContain('data-testid="masada-cable-prices"');
    expect(page).toContain('data-testid="masada-visitor-essentials"');
    expect(page).toContain('data-testid="masada-two-entrances"');
    expect(page).toContain('data-testid="masada-location-map"');
    expect(page).toContain("carRentalAffiliateUrl");
    expect(page).toContain('rel="sponsored noopener noreferrer"');
    expect(page).toContain('to="/tours/masada-dead-sea/"');
  });

  it("uses several distinct photos, one panoramic image and a realistic visit plan", () => {
    const page = readFileSync("src/components/MasadaAttractionPage.tsx", "utf8");
    for (const path of [
      "src/assets/home/hero-masada-large.webp",
      "src/assets/guides/dead-sea-excursions/masada-palace.webp",
      "src/assets/guides/dead-sea-excursions/masada-ruins.webp",
      "src/assets/guides/dead-sea-excursions/masada-snake-path.webp",
      "src/assets/home/masada-cable-car-wide.webp",
      "src/assets/home/hero-refresh-masada-dead-sea-v4-large.webp",
      "src/assets/dead-sea/landscape.webp",
    ]) expect(existsSync(path), path).toBe(true);
    expect(page).toContain('data-testid="masada-wide-panorama"');
    expect(page).toContain("desertShorePhoto");
    expect(page).not.toContain("einGediPhoto");
    expect(page).toContain("Herod's Northern Palace");
    expect(page).toContain("The Roman siege camps and ramp");
    expect(page).toContain("Yigael Yadin Masada Museum");
    expect(page).toContain("2–3 hours on the mountain");
    expect(page).not.toContain("I don't reproduce hours or prices here");
  });
});
