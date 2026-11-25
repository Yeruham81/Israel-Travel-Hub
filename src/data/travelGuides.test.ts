import { ESIM_UPDATED, esimFixedPlans, esimUnlimitedPlans, esimPicks, esimPlan } from "@/data/esimIsraelPlans";
import { describe, expect, it } from "vitest";
import { filterGuides, getGuideTopicLabel, guideDirectory, guideTopics, isGuideTopic, travelGuides } from "@/data/travelGuides";
import { AIRALO_COMPATIBILITY_AFFILIATE_URL, AIRALO_MENA_AFFILIATE_URL, formatCheckDate } from "@/data/registry";
import { itineraryIds, itineraries } from "@/data/israelItineraries";
import { migrationPhotos } from "@/data/guideMigrationPhotos";
import { uniqueGuideCardPhotos } from "@/lib/guide-card-photos";

describe("travel guide topic filters and prerender safety", () => {
  it("keeps eSIM recommendations consistent with dated plan records and tracked resources", () => {
    const guide = travelGuides.esim;
    expect(guide.title).toContain("Prices, Providers & My Picks");
    expect(guide.updatedAt).toBe(ESIM_UPDATED);
    expect(guide.sections.map(s=>s.id)).toEqual(["short-trip","unlimited","features","long-trip","payg","regional","compatibility","calling","coverage","setup"]);
    expect(guide.facts).toHaveLength(4);
    expect(guide.comparison.rows).toHaveLength(4);
    expect(esimPicks.map(p=>p.plan)).toEqual([esimPlan("Saily",3,30),esimPlan("Saily",5,30),esimPlan("Airalo",10,30),esimPlan("GigSky","Unlimited",30)]);
    expect(esimFixedPlans.filter(p=>p.provider==="GigSky").map(p=>[p.gb,p.days,p.usd])).toEqual([[1,7,4.99],[3,15,10.79],[5,30,16.79],[10,30,29.19]]);
    expect(esimPlan("GigSky",5,30).regularUsd).toBe(20.99);
    expect(esimUnlimitedPlans.filter(p=>p.provider==="GigSky").every(p=>p.evidence==="comparison")).toBe(true);
    expect(esimUnlimitedPlans.filter(p=>p.provider==="Airalo").map(p=>p.days)).toEqual([3,5,7,10,15,30]);
    const plans=[...esimFixedPlans,...esimUnlimitedPlans];
    expect(new Set(plans.map(p=>[p.provider,p.gb,p.days].join("/"))).size).toBe(plans.length);
    expect(plans.every(p=>p.usd>0&&p.days>0&&p.checkedAt<=ESIM_UPDATED&&p.sourceId.startsWith("guide-esim-"))).toBe(true);
    expect(guide.sections.find(s=>s.id==="compatibility")?.externalLinks?.[0]?.href).toBe(AIRALO_COMPATIBILITY_AFFILIATE_URL);
    expect(guide.sections.find(s=>s.id==="regional")?.externalLinks?.[0]?.href).toBe(AIRALO_MENA_AFFILIATE_URL);
    for(const link of [AIRALO_COMPATIBILITY_AFFILIATE_URL,AIRALO_MENA_AFFILIATE_URL]){
      const url=new URL(link);
      expect(url.origin).toBe("https://tp.media");
      expect(url.searchParams.get("marker")).toBe("622032");
      expect(url.searchParams.get("trs")).toBe("406243");
    }
    expect(guide.providerPageId).toBe("guide-esim");
    expect(guide.services).toHaveLength(6);
    expect(guide.related).toHaveLength(6);
    expect(guide.faqs).toHaveLength(6);
    expect(guide.checklist.some(item=>item.includes("travel eSIM for mobile data"))).toBe(true);
  });

  it("uses the distinct original featured images in the 3-, 5- and 10-day itinerary directory cards", () => {
    const byId = (id: string) => guideDirectory.find((guide) => guide.id === `israel-itinerary-${id}`)!.photo!;
    const photos = ["3", "5", "10"].map(byId);
    expect(new Set(photos.map((photo) => photo.src)).size).toBe(3);
    expect(byId("3").alt).toMatch(/Camel.*Ein Gedi/);
    expect(byId("5").alt).toMatch(/camel.*Jerusalem.*Dome of the Rock/i);
    expect(byId("10").alt).toMatch(/Ibex.*Ramon Crater/);
    expect(itineraries["3"].hero).toBe("featured-original-3day");
    expect(itineraries["5"].hero).toBe("featured-original-5day");
    expect(itineraries["7"].hero).toBe("featured-original-7day");
    expect(itineraries["10"].hero).toBe("featured-original-10day");

    for (const id of itineraryIds) {
      expect(byId(id).src).toBe(migrationPhotos[itineraries[id].hero].src);
    }
    const cards = itineraryIds.map((id) => ({
      guide: guideDirectory.find((entry) => entry.id === `israel-itinerary-${id}`)!,
    }));
    const rendered = uniqueGuideCardPhotos(cards);
    expect(rendered.map((entry) => entry.cardPhoto?.src))
      .toEqual(cards.map((entry) => entry.guide.photo?.src));
    expect(new Set(rendered.map((entry) => entry.cardPhoto?.src)).size).toBe(4);
  });

  it("defines a label for every directory topic and accepts every valid topic", () => {
    expect(guideDirectory.length).toBeGreaterThan(40);
    for (const topic of guideTopics) {
      expect(isGuideTopic(topic.id)).toBe(true);
      expect(getGuideTopicLabel(topic.id)).toBe(topic.label);
      expect(filterGuides("", topic.id)).toEqual(guideDirectory.filter((guide) => guide.topics.includes(topic.id)));
    }
    for (const guide of guideDirectory) {
      for (const id of guide.topics) {
        expect(isGuideTopic(id), `Invalid topic "${id}" in ${guide.id}`).toBe(true);
      }
    }
  });

  it("shows the most recently updated guides first, including when a topic is selected", () => {
    const checkRecency = (entries: typeof guideDirectory) => {
      const dates = entries.map((entry) => entry.updatedAt ?? "");
      expect(dates).toEqual([...dates].sort((a, b) => b.localeCompare(a)));
    };
    checkRecency(guideDirectory);
    expect(guideDirectory[0]?.updatedAt).toBe("2026-11-26");
    expect(guideDirectory.find((entry) => entry.id === "stay-haifa")?.updatedAt).toBe("2026-11-25");
    for (const topic of guideTopics) {
      checkRecency(filterGuides("", topic.id));
    }
    expect(guideDirectory.find((entry) => entry.id === "christianTours")?.updatedAt).toBe("2026-11-21");
    expect(guideDirectory.find((entry) => entry.id === "baptism")?.updatedAt).toBe("2026-11-21");
    expect(guideDirectory.find((entry) => entry.id === "attraction-museums-in-jerusalem")?.updatedAt).toBe("2026-11-20");
    expect(guideDirectory.find((entry) => entry.id === "stay-tiberias")?.updatedAt).toBe("2026-11-19");
  });

  it("uses the historical Nesher photo as both page hero and guide-card image", () => {
    const guide = travelGuides.sherut;
    const card = guideDirectory.find(entry => entry.id === "sherut");
    expect(card).toBeDefined();
    expect(card?.photo?.src).toContain("sherut-nesher-airport.webp");
    expect(card?.photo?.alt).toMatch(/Former Nesher.*shuttle van.*Ben Gurion Airport/);
    expect(card?.photo?.src).toBe(guide.photo.src);
  });

  it("uses the real former Nesher sherut image in its historical context and no generic airport pickup artwork", () => {
    const sherut = travelGuides.sherut;
    expect(sherut.photo.src).toContain("sherut-nesher-airport");
    const sectionPhotos = sherut.sections.flatMap(section => section.photo ? [section.photo] : []);
    expect(sectionPhotos).toHaveLength(1);
    expect(sectionPhotos[0]!.src).toContain("sherut-local-taxis");
    expect(sectionPhotos[0]!.src).not.toBe(sherut.photo.src);
    expect(sectionPhotos[0]!.src).not.toMatch(/^https?:/);
    expect(sherut.sections.find(section => section.id === "official-taxi")?.photo).toBeUndefined();
    for (const guide of Object.values(travelGuides)) {
      const photos = [guide.photo, guide.cardPhoto, ...guide.sections.flatMap(section =>
        [section.photo, ...(section.subsections ?? []).map(subsection => subsection.photo)])];
      expect(photos.filter(Boolean).every(photo => !photo!.src.includes("airport-pickup")), guide.id).toBe(true);
    }
  });

  it("ignores malformed topic parameters rather than crashing filtered or searched pages", () => {
    for (const topic of ["nonexistent", "Transportation", "", ["transportation"], null, 123, {}, undefined]) {
      expect(isGuideTopic(topic)).toBe(false);
      expect(getGuideTopicLabel(topic)).toBeUndefined();
      expect(filterGuides("", topic)).toEqual(guideDirectory);
      expect(filterGuides("airport", topic)).toEqual(filterGuides("airport"));
    }
  });

  it("displays editorial check and update dates by month and year across travel guides", () => {
    expect(formatCheckDate("2026-11-12")).toBe("November 2026");
    const exactDayCheck = /\b(?:checked|reviewed|verified|updated)\s+(?:on\s+|in\s+)?(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+20\d{2}\b/i;
    for (const guide of Object.values(travelGuides)) {
      expect(JSON.stringify(guide), guide.id).not.toMatch(exactDayCheck);
    }
  });

  it("keeps travel guide titles, descriptions, intros, section headings and FAQ questions evergreen", () => {
    const year = /\b20\d{2}\b/;
    for (const entry of guideDirectory) {
      expect(entry.title, `Directory card: ${entry.id}`).not.toMatch(year);
      expect(entry.description, `Directory card: ${entry.id}`).not.toMatch(year);
    }
    for (const guide of Object.values(travelGuides)) {
      for (const [field, copy] of [
        ["title", guide.title],
        ["description", guide.description],
        ["intro", guide.intro],
      ] as const) {
        expect(copy, `${guide.id}.${field}`).not.toMatch(year);
      }
      for (const section of guide.sections) {
        expect(section.title, `${guide.id} / ${section.id}`).not.toMatch(year);
        for (const subsection of section.subsections ?? []) {
          expect(subsection.title, `${guide.id} / ${subsection.id}`).not.toMatch(year);
        }
      }
      for (const faq of guide.faqs) {
        expect(faq.q, `${guide.id} / FAQ`).not.toMatch(year);
      }
    }
  });

  it("matches localized topic labels in searches without unsafe non-null assertions", () => {
    expect(filterGuides("transportation").length).toBeGreaterThan(0);
    expect(filterGuides("itineraries").length).toBeGreaterThan(0);
    expect(filterGuides("airport", "transportation").every((guide) => guide.topics.includes("transportation"))).toBe(true);
  });
});
