import { describe, expect, it } from "vitest";
import { guideContactCopy, type GuideContactKind } from "@/lib/guide-contact";

describe("contextual personal guide contact", () => {
  it("leaves subjects blank while keeping contextual descriptions for every guide theme", () => {
    const kinds: GuideContactKind[] = ["airport", "shabbat", "sherut", "transport", "attraction", "itinerary", "accommodation", "connectivity", "general"];
    const descriptions = new Set<string>();
    for (const kind of kinds) {
      const c = guideContactCopy("Test travel guide", kind, "Jerusalem");
      expect(c.subject).toBe("");
      expect(c.introduction).toMatch(/I'll reply personally/);
      expect(c.introduction).not.toMatch(/\bour team\b|\bwe recommend\b/i);
      expect(`${c.heading} ${c.introduction}`).toMatch(/private (?:transfer|airport|driver|journey|journeys|transport)|driver|day trip/i);
      expect(c.heading).not.toMatch(/have a question|ask me about|planning a trip|help planning/i);
      descriptions.add(c.introduction);
    }
    expect(descriptions.size).toBe(kinds.length);
  });
  it("allows readers to write their own itinerary enquiry subject", () => {
    const contact = guideContactCopy("Israel in 3 Days: A Realistic First-Time Itinerary", "itinerary");
    expect(contact.subject).toBe("");
    expect(contact.introduction).toMatch(/airport transfers|private journeys|driver/i);
    expect(contact.heading).toMatch(/private transport/i);
  });

  it("does not populate the subject even when a guide title is long", () => {
    expect(guideContactCopy("a".repeat(240), "general").subject).toBe("");
  });
});
