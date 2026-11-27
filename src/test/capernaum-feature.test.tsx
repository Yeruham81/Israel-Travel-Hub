import { sourceFragment, sourceIndex } from "@/test-utils/source-fragment";
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
    expect(content.nearby?.map(item => item.to)).toEqual([
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
    expect(content.faqs?.length).toBeGreaterThanOrEqual(6);
    expect(new Set(content.faqs?.map(faq => faq.q) ?? []).size).toBe(content.faqs?.length);
  });

  it("uses the shared responsive shell, one form and a final collapsed source disclosure", () => {
    const shell = readFileSync("src/components/AttractionDestinationPage.tsx", "utf8");
    const route = readFileSync("src/routes/attractions.capernaum.tsx", "utf8");
    expect(route).toContain("CapernaumAttractionPage");
    expect(shell).toMatch(sourceFragment("<GuideHeroLayout"));
    expect(shell).toMatch(sourceFragment("<GuideHeroMedia"));
    expect(shell).toMatch(sourceFragment("<AtAGlance"));
    expect(shell).toMatch(sourceFragment('data-testid="attraction-at-a-glance"'));
    expect(shell).toMatch(sourceFragment("<OnThisPage"));
    expect(shell).toMatch(sourceFragment("<FaqList"));
    expect(shell).toMatch(sourceFragment("illustrated maxPhotoCards={content.nearby.length >= 6 ? 6 : 4}"));
    expect(shell).toMatch(sourceFragment("visitorContent?: ReactNode"));
    expect(shell).toMatch(sourceFragment("transportContent?: ReactNode"));
    expect(shell).toMatch(sourceFragment("itineraryContent?: ReactNode"));
    expect(shell).toMatch(sourceFragment("faqs?:"));
    expect(shell).toMatch(sourceFragment("nearby?:"));
    expect(shell).toMatch(sourceFragment("content.visitorContent && <Section"));
    expect(shell).toMatch(sourceFragment("content.itineraryContent && <Section"));
    expect(shell).toMatch(sourceFragment("!!content.nearby?.length && <section"));
    expect(shell).toMatch(sourceFragment('data-testid="attraction-trip-planning"'));
    expect(shell).toContain('bg-amber-50/90');
    expect(shell).toMatch(sourceFragment('data-testid="attraction-practical-tip"'));
    expect(shell).not.toMatch(sourceFragment("Worth knowing:"));
    const article = readFileSync("src/components/CapernaumAttractionPage.tsx", "utf8");
    expect(article).toMatch(sourceFragment('data-testid="capernaum-location-map"'));
    expect(article).toMatch(sourceFragment('data-testid="capernaum-visitor-table"'));
    expect(article).toContain("overflow-x-auto");
    expect(article).not.toMatch(sourceFragment('data-testid="capernaum-mobile-visitor-cards"'));
    expect(article).toMatch(sourceFragment('data-testid="capernaum-visitor-facilities"'));
    expect(article).toContain("park.fridays");
    expect(article).not.toContain("publishedSummerFridays");
    expect(article).toContain("year-round");
    expect(article).not.toMatch(sourceFragment("in both seasons"));
    expect(article).toMatch(sourceFragment("National park & marine terminal"));
    expect(article).not.toMatch(sourceFragment("National park / marine terminal"));
    expect(article).toMatch(sourceFragment("Admission is <strong>free, with no advance booking required</strong>"));
    expect(article).toMatch(sourceFragment('data-testid="capernaum-facilities-columns"'));
    expect(article).not.toMatch(sourceFragment("An aerial view helps put"));
    expect(article).toMatch(sourceFragment("Message me to arrange a private day trip"));
    expect(article).toMatch(sourceFragment('href="tel:+972532840991"'));
    expect(article).toContain("053-2840991");
    expect(article.match(/whitespace-nowrap/g)).toHaveLength(3);
    expect(article).toMatch(sourceFragment("A full-day Galilee and Sea of Galilee trip"));
    expect(article).toMatch(/I recommend visiting three to five sites, including Capernaum/);
    expect(article).not.toMatch(sourceFragment("These are options, not a checklist for a single day"));
    expect(article).not.toMatch(sourceFragment("Add the Greek Orthodox monastery only if"));
    expect(article).not.toMatch(sourceFragment("A half-day on the northern Sea of Galilee"));
    expect(article).toMatch(sourceFragment("shore excursion from Haifa Port"));
    expect(article).toMatch(sourceFragment('to="/attractions/magdala/"'));
    expect(article).toMatch(sourceFragment('to="/attractions/basilica-of-the-annunciation/"'));
    expect(article).toMatch(sourceFragment('to="/attractions/yardenit/"'));
    expect(article).toMatch(sourceFragment('to="/attractions/mount-tabor/"'));
    expect(article).toMatch(sourceFragment('to="/attractions/sea-of-galilee/"'));
    expect(article).not.toMatch(sourceFragment("The Franciscan ruins, Orthodox monastery and national park are close"));
    expect(article).not.toMatch(sourceFragment("There are three different places to enter"));
    expect(content.contactIntroduction).toMatch(/^Tell me when you plan to visit/);
    expect(content.contactIntroduction).not.toContain("?");
    expect(content.contactIntroduction).toContain("I can arrange a private day trip with a driver"); 
    expect(article).toMatch(sourceFragment('<AttractionContentImage src="/images/attractions/capernaum-peter-memorial-interior.webp"'));
    expect(article).toMatch(sourceFragment("lg:grid-cols-[minmax(0,1fr)_260px]"));
    expect(shell).toMatch(sourceFragment('className="aspect-[4/3] h-auto w-full rounded-lg object-cover"'));
    expect(shell).toMatch(sourceFragment("width={520} height={390}"));
    expect(shell).toMatch(sourceFragment("lg:grid-cols-[minmax(0,1fr)_260px]"));
    expect(shell).toContain("mobileImageFirst");
    expect(shell).toMatch(sourceFragment("<AttractionContentImage src={image.src}"));
    expect(shell).not.toMatch(sourceFragment("aspect-[16/10] max-h-44"));
    const pageLayout = readFileSync("src/components/AttractionDestinationPage.tsx", "utf8");
    expect(pageLayout).toMatch(sourceFragment("Practical guides to help you plan the rest of your journey."));
    expect(shell).toMatch(sourceFragment("contactIntroduction ? { introduction: content.contactIntroduction }"));
    const park = readFileSync("src/data/capernaumSite.ts", "utf8");
    expect(park).toMatch(sourceFragment('fridays: "08:00–15:00"'));
    expect(park).not.toMatch(sourceFragment("13:00–15:00"));
    expect(shell).toContain("aspect-[4/3]");
    expect(shell).not.toMatch(sourceFragment("A few practical guides"));
    expect(content.glanceNote).toBeDefined();
    expect(article).toContain("capernaum-orthodox-church.webp");
    expect(article).toContain("capernaum-aerial-overview.webp");
    expect(article).toMatch(sourceFragment('className="h-52 w-full object-cover object-center sm:h-64"'));
    expect(article).toContain("capernaum-synagogue-aerial.webp");
    expect(article).toMatch(sourceFragment("Facilities and visitor essentials"));
    expect(article).not.toMatch(sourceFragment("If you find a public bench"));
    expect(article).toMatch(sourceFragment('to="/tours/nazareth-sea-of-galilee/"'));
    expect(article).not.toContain("viator.tpm.li");
    expect(sourceIndex(shell, '<Section id="visitor-info"')).toBeLessThan(sourceIndex(shell, '<Section id="history"'));
    expect(sourceIndex(shell, '<Section id="visit-plan"')).toBeLessThan(sourceIndex(shell, '<Section id="history"'));
    const siteInfo = readFileSync("src/data/capernaumSite.ts", "utf8");
    expect(siteInfo).toMatch(sourceFragment('phone: "04-6721059"'));
    expect(siteInfo).toMatch(sourceFragment('phone: "04-6793865"'));
    expect(siteInfo).toMatch(sourceFragment('phoneHref: "+97246721059"'));
    expect(siteInfo).toMatch(sourceFragment('phoneHref: "+97246793865"'));
    expect(article).toContain("BusFront");
    expect(article.split("<AttractionPracticalTip>").length - 1).toBe(3);
    expect(article).not.toMatch(sourceFragment("Worth knowing:"));
    const templateDoc = readFileSync("docs/ATTRACTION_PAGE_TEMPLATE.md", "utf8");
    expect(templateDoc).toContain("08:00–15:00 year-round");
    expect(templateDoc).toContain("optional sections");
    expect(templateDoc).toContain("six genuinely relevant");
    const guideComponent = readFileSync("src/components/Guide.tsx", "utf8");
    expect(guideComponent).toMatch(sourceFragment('pictured.length === 6 ? "mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3"'));
    expect(article).not.toMatch(sourceFragment("3.5 km lakeside promenade"));
    expect(article).not.toMatch(sourceFragment("Biblical tradition explains why Capernaum became a pilgrimage destination"));
    expect(article).not.toMatch(sourceFragment("Map: OpenStreetMap contributors"));
    expect(article).not.toMatch(sourceFragment("If you are staying in Tiberias, this is a convenient stop"));
    expect(article).toMatch(sourceFragment("hl=en&z=11"));
    expect(article).toMatch(sourceFragment('href="#contact"'));
    expect(article).toMatch(sourceFragment("or a shore excursion from Haifa Port"));
    expect(article).toMatch(sourceFragment("Request a quote"));
    expect(article).not.toMatch(sourceFragment('to="/private-driver-in-israel/"'));
    expect(article.match(/attraction-tour-card/g)).toHaveLength(2);
    expect(content.planningLinks?.every(link => Boolean(link.description && link.icon))).toBe(true);
    const styles = readFileSync("src/styles.css", "utf8");
    expect(styles).toContain(".prose-guide a.attraction-tour-card");
    expect(shell).toContain("planningIcons[item.icon");
    expect(shell).toMatch(sourceFragment("hover:shadow-md"));
    const contact = readFileSync("src/components/HomeContactForm.tsx", "utf8");
    expect(contact).toMatch(sourceFragment('<section id="contact"'));
    expect(shell.split("<HomeContactForm").length - 1).toBe(1);
    expect(sourceIndex(shell, "<SourcesDisclosure>")).toBeGreaterThan(sourceIndex(shell, "<HomeContactForm"));
  });
});
