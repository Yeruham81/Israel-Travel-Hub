import { describe, expect, it } from "vitest";
import { filterGuides, getGuideTopicLabel, guideDirectory, guideTopics, isGuideTopic } from "@/data/travelGuides";

describe("travel guide topic filters and prerender safety", () => {
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

  it("ignores malformed topic parameters rather than crashing filtered or searched pages", () => {
    for (const topic of ["nonexistent", "Transportation", "", ["transportation"], null, 123, {}, undefined]) {
      expect(isGuideTopic(topic)).toBe(false);
      expect(getGuideTopicLabel(topic)).toBeUndefined();
      expect(filterGuides("", topic)).toEqual(guideDirectory);
      expect(filterGuides("airport", topic)).toEqual(filterGuides("airport"));
    }
  });

  it("matches localized topic labels in searches without unsafe non-null assertions", () => {
    expect(filterGuides("transportation").length).toBeGreaterThan(0);
    expect(filterGuides("itineraries").length).toBeGreaterThan(0);
    expect(filterGuides("airport", "transportation").every((guide) => guide.topics.includes("transportation"))).toBe(true);
  });
});
