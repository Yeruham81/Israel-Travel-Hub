import { describe, expect, it } from "vitest";
import { filterGuides, getGuideTopicLabel, guideDirectory, guideTopics, isGuideTopic, travelGuides } from "@/data/travelGuides";
import { formatCheckDate } from "@/data/registry";

describe("travel guide topic filters and prerender safety", () => {
  it("uses different locations in the 3-, 5- and 10-day itinerary directory photos", () => {
    const byId = (id: string) => guideDirectory.find((guide) => guide.id === `israel-itinerary-${id}`)!.photo!;
    const photos = ["3", "5", "10"].map(byId);
    expect(new Set(photos.map((photo) => photo.src)).size).toBe(3);
    expect(byId("3").alt).toMatch(/Jerusalem/);
    expect(byId("5").alt).toMatch(/Caesarea/);
    expect(byId("10").alt).toMatch(/Akko/);
  });

  it("defines a label for every directory topic and accepts every valid topic", () => {
    expect(guideDirectory.length).toBeGreaterThan(50);
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

  it("uses the historical Nesher sherut photo on guide cards without changing the article image", () => {
    const guide = travelGuides.sherut;
    const card = guideDirectory.find(entry => entry.id === "sherut");
    expect(card).toBeDefined();
    expect(card?.photo?.src).toMatch(/sherut-nesher-airport\.webp$/);
    expect(card?.photo?.alt).toMatch(/Former Nesher.*shuttle van.*Ben Gurion Airport/);
    expect(card?.photo?.src).toBe(guide.cardPhoto?.src);
    expect(card?.photo?.src).not.toBe(guide.photo.src);
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
