import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { attractionMeta } from "@/components/AttractionGuidePage";
import { capernaumDestinationContent as content } from "@/components/CapernaumAttractionPage";
import { attractionHubCards } from "@/data/attractionsHub";
import { attractionGuides } from "@/data/attractionGuides";

describe("Capernaum as the first reusable individual-attraction guide", () => {
  it("keeps the approved URL, title, update date and documented visitor facts coherent", () => {
    expect(content.path).toBe("/attractions/capernaum/");
    expect(content.title).toBe("Capernaum (Kfar Nahum): Visitor Guide");
    expect(content.updatedAt).toBe("2026-11-16");
    expect(content.facts).toHaveLength(6);
    expect(content.facts.map(fact => fact.label)).toEqual([
      "Location", "Time needed", "Entry fee", "Opening hours", "Highlights", "Getting there",
    ]);
    expect(content.facts.find(fact => fact.label === "Entry fee")?.value).toBe("₪10");
    expect(content.facts.find(fact => fact.label === "Opening hours")?.value).toContain("14:00–17:00");
    expect(content.sources).toHaveLength(5);
    expect(content.sources.every(source => source.url.startsWith("https://"))).toBe(true);
    expect(content.sources.some(source => source.url.includes("capernaum.info"))).toBe(true);
    expect(content.sources.some(source => source.url.includes("parks.org.il"))).toBe(true);
    expect(attractionGuides.capernaum.title).toBe(content.title);
    expect(attractionGuides.capernaum.intro).toBe(content.intro);
    expect(attractionGuides.capernaum.highlights).toHaveLength(0); // canonical body is the dedicated destination page
    expect(attractionGuides.capernaum.arrival).toHaveLength(0);
    expect(attractionGuides.capernaum.planning).toHaveLength(0);
    expect(attractionGuides.capernaum.faqs).toHaveLength(0);
    expect(JSON.stringify(attractionMeta("capernaum").scripts)).toContain("2026-11-16");
    expect(attractionHubCards.filter(card => card.to === content.path)).toHaveLength(1);
  });

  it("uses three distinct archived photos and links to existing individual attraction pages", () => {
    const photos = [
      "/images/attractions/capernaum-peters-house.webp",
      "/images/attractions/capernaum-peter-memorial-interior.webp",
      "/images/attractions/capernaum-synagogue-aerial.webp",
      "/images/attractions/capernaum-orthodox-church.webp",
      "/images/attractions/capernaum-aerial-overview.webp",
    ];
    expect(photos.every(path => existsSync("public" + path))).toBe(true);
    const article = readFileSync("src/components/CapernaumAttractionPage.tsx", "utf8");
    for (const photo of photos) expect(article.split(photo).length - 1).toBe(1);
    expect(content.nearby.map(item => item.to)).toEqual([
      "/attractions/tabgha/",
      "/attractions/mount-of-beatitudes/",
      "/attractions/magdala/",
      "/attractions/yardenit/",
      "/attractions/basilica-of-the-annunciation/",
      "/attractions/mount-tabor/",
    ]);
    expect(content.nearby).toHaveLength(6);
    expect(content.planningLinks).toHaveLength(6);
    expect(new Set(content.planningLinks?.map(link => String(link.to))).size).toBe(6);
    expect(content.faqs.length).toBeGreaterThanOrEqual(6);
    expect(new Set(content.faqs.map(faq => faq.q)).size).toBe(content.faqs.length);
  });

  it("uses the shared responsive shell, one form and a final collapsed source disclosure", () => {
    const shell = readFileSync("src/components/AttractionDestinationPage.tsx", "utf8");
    const route = readFileSync("src/routes/attractions.capernaum.tsx", "utf8");
    expect(route).toContain("CapernaumAttractionPage");
    expect(shell).toContain("<GuideHeroLayout");
    expect(shell).toContain("<GuideHeroMedia");
    expect(shell).toContain("<AtAGlance");
    expect(shell).toContain('data-testid="attraction-at-a-glance"');
    expect(shell).toContain("<OnThisPage");
    expect(shell).toContain("<FaqList");
    expect(shell).toContain("illustrated maxPhotoCards={content.nearby.length >= 6 ? 6 : 4}");
    expect(shell).toContain('data-testid="attraction-trip-planning"');
    expect(shell).toContain('bg-amber-50/90');
    expect(shell).toContain('data-testid="attraction-practical-tip"');
    expect(shell).not.toContain("Worth knowing:");
    const article = readFileSync("src/components/CapernaumAttractionPage.tsx", "utf8");
    expect(article).toContain('data-testid="capernaum-location-map"');
    expect(article).toContain('data-testid="capernaum-mobile-visitor-cards"');
    expect(article).toContain('data-testid="capernaum-visitor-facilities"');
    expect(article).toContain("publishedSummerFridays");
    expect(article).toContain("capernaum-orthodox-church.webp");
    expect(article).toContain("capernaum-aerial-overview.webp");
    expect(article).toContain("capernaum-synagogue-aerial.webp");
    expect(article).toContain("Facilities and visitor essentials");
    expect(article).not.toContain("If you find a public bench");
    expect(article).toContain('to="/tours/nazareth-sea-of-galilee/"');
    expect(article).not.toContain("viator.tpm.li");
    expect(shell.indexOf('<Section id="visitor-info"')).toBeLessThan(shell.indexOf('<Section id="history"'));
    expect(shell.indexOf('<Section id="visit-plan"')).toBeLessThan(shell.indexOf('<Section id="history"'));
    const siteInfo = readFileSync("src/data/capernaumSite.ts", "utf8");
    expect(siteInfo).toContain("04 672 1059");
    expect(article).toContain("BusFront");
    expect(article.split("<AttractionPracticalTip>").length - 1).toBe(3);
    expect(article).not.toContain("Worth knowing:");
    expect(article).not.toContain("3.5 km lakeside promenade");
    expect(article).not.toContain("Biblical tradition explains why Capernaum became a pilgrimage destination");
    expect(article).not.toContain("Map: OpenStreetMap contributors");
    expect(article).not.toContain("If you are staying in Tiberias, this is a convenient stop");
    expect(article).toContain("hl=en&z=11");
    expect(article).toContain('href="#contact"');
    expect(article).toContain("as a shore excursion from Haifa Port");
    expect(article).toContain("Request a quote");
    expect(article).not.toContain('to="/private-driver/"');
    expect(article.match(/attraction-tour-card/g)).toHaveLength(2);
    expect(content.planningLinks?.every(link => Boolean(link.description && link.icon))).toBe(true);
    const styles = readFileSync("src/styles.css", "utf8");
    expect(styles).toContain(".prose-guide a.attraction-tour-card");
    expect(shell).toContain("planningIcons[item.icon");
    expect(shell).toContain("hover:shadow-md");
    const contact = readFileSync("src/components/HomeContactForm.tsx", "utf8");
    expect(contact).toContain('<section id="contact"');
    expect(shell.split("<HomeContactForm").length - 1).toBe(1);
    expect(shell.indexOf("<SourcesDisclosure>")).toBeGreaterThan(shell.indexOf("<HomeContactForm"));
  });
});
