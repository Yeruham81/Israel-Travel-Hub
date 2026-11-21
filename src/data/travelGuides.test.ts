import { describe, expect, it } from "vitest";
import { filterGuides, getGuideTopicLabel, guideDirectory, guideTopics, isGuideTopic, travelGuides } from "@/data/travelGuides";
import { AIRALO_COMPATIBILITY_AFFILIATE_URL, AIRALO_MENA_AFFILIATE_URL, formatCheckDate } from "@/data/registry";
import { itineraryIds, itineraries } from "@/data/israelItineraries";
import { migrationPhotos } from "@/data/guideMigrationPhotos";
import { uniqueGuideCardPhotos } from "@/lib/guide-card-photos";

describe("travel guide topic filters and prerender safety", () => {
  it("keeps eSIM buying guidance prominent without a troubleshooting manual", () => {
    const guide = travelGuides.esim;
    expect(guide.title).toContain("Prices, Providers & My Picks");
    expect(guide.sections.map((section) => section.id)).toEqual(["short-trip", "long-trip", "unlimited", "regional", "compatibility", "calling", "coverage", "setup"]);
    expect(guide.comparison.rows).toHaveLength(5);
    expect(guide.comparison.rows.map(row => row[0])).toEqual(["GigSky", "Yesim", "Airalo", "Saily", "Drimsim"]);
    expect(guide.comparison.rows[0]?.[1]).toBe("$56.24");
    expect(guide.comparison.rows[1]?.[1]).toBe("$66.00");
    expect(guide.comparison.rows[2]?.[1]).toBe("$69.00");
    expect(guide.comparison.rows[3]?.[1]).toBe("$71.99");
    expect(guide.comparison.rows[4]?.[1]).toBe("Not offered");
    expect(guide.facts.map(fact => fact.label)).toEqual(["Short trip", "Longer trip", "Heavy data use"]);
    expect(guide.sections.find((section) => section.id === "short-trip")?.paragraphs.join(" ")).toContain("$5.99");
    expect(guide.sections.find((section) => section.id === "long-trip")?.paragraphs.join(" ")).toContain("$11.50");
    for (const section of guide.sections.filter(section => ["short-trip", "long-trip", "unlimited", "regional"].includes(section.id))) {
      expect(section.paragraphs.some(paragraph => /My choice: (Saily|Airalo|GigSky)\./.test(paragraph))).toBe(true);
    }
    expect(guide.sections.find(section => section.id === "compatibility")?.externalLinks?.[0]?.href).toBe(AIRALO_COMPATIBILITY_AFFILIATE_URL);
    const deepLink = new URL(AIRALO_COMPATIBILITY_AFFILIATE_URL);
    expect(deepLink.origin).toBe("https://tp.media");
    expect(deepLink.searchParams.get("marker")).toBe("622032");
    expect(deepLink.searchParams.get("trs")).toBe("406243");
    expect(deepLink.searchParams.get("p")).toBe("8310");
    expect(deepLink.searchParams.get("campaign_id")).toBe("541");
    expect(deepLink.searchParams.get("u")).toBe("https://www.airalo.com/how-airalo-works/device-compatibility");
    expect(guide.sections.find((section) => section.id === "unlimited")?.paragraphs.join(" ")).toContain("$56.24");
    expect(guide.sections.find((section) => section.id === "unlimited")?.paragraphs.join(" ")).toContain("50GB");
    expect(guide.sections.find((section) => section.id === "unlimited")?.paragraphs.join(" ")).toContain("$39");
    expect(guide.sections.find((section) => section.id === "long-trip")?.paragraphs.join(" ")).toContain("one-cent difference");
    expect(guide.sections.find((section) => section.id === "setup")?.paragraphs.join(" ")).toContain("data roaming on your home SIM");
    expect(guide.checklist.some((item) => item.includes("travel eSIM for mobile data"))).toBe(true);
    expect(guide.sections.find((section) => section.id === "regional")?.externalLinks?.[0]?.href).toBe(AIRALO_MENA_AFFILIATE_URL);
    const regionalLink = new URL(AIRALO_MENA_AFFILIATE_URL);
    expect(regionalLink.searchParams.get("marker")).toBe("622032");
    expect(regionalLink.searchParams.get("trs")).toBe("406243");
    expect(regionalLink.searchParams.get("u")).toBe("https://www.airalo.com/middle-east-and-north-africa-esim/mena-30days-5gb");
    expect(guide.faqs).toHaveLength(6);
    expect(guide.faqs.some(faq => /WhatsApp number/.test(faq.q))).toBe(true);
    expect(guide.faqs.some(faq => /Bethlehem or Jericho/.test(faq.q))).toBe(true);
    expect(guide.related).toHaveLength(6);
    expect(guide.sections.find((section) => section.id === "setup")?.paragraphs.length).toBeLessThanOrEqual(2);
    expect(guide.sections.some((section) => /troubleshoot|technical support/i.test(section.title))).toBe(false);
    expect(guide.providerPageId).toBe("guide-esim");
    expect(guide.services).toHaveLength(4);
    expect(guide.services.every((service) => Boolean(service.note))).toBe(true);
  });

  it("uses different locations in the 3-, 5- and 10-day itinerary directory photos", () => {
    const byId = (id: string) => guideDirectory.find((guide) => guide.id === `israel-itinerary-${id}`)!.photo!;
    const photos = ["3", "5", "10"].map(byId);
    expect(new Set(photos.map((photo) => photo.src)).size).toBe(3);
    expect(byId("3").alt).toMatch(/Jerusalem/);
    expect(byId("5").alt).toMatch(/Caesarea/);
    expect(byId("10").alt).toMatch(/Haifa/);
    expect(itineraries["3"].hero).toBe("itinerary-3day-jerusalem-cover");
    expect(itineraries["5"].hero).toBe("itinerary-5day-caesarea-cover");
    expect(itineraries["7"].hero).toBe("EXISTING:galilee");
    expect(itineraries["10"].hero).toBe("itinerary-10day-haifa-port-cover");

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
    expect(guideDirectory[0]?.updatedAt).toBe("2026-11-21");
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
    expect(sherut.sections.find(section => section.id === "nesher-amal")?.photo?.src).toContain("sherut-nesher-airport");
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
