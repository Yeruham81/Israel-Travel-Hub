import { describe, expect, it } from "vitest";
import { guideContactCopy, type GuideContactKind } from "@/lib/guide-contact";

describe("contextual personal guide contact", () => {
  it("uses distinct first-person descriptions and subject lines for every guide theme", () => {
    const kinds: GuideContactKind[] = ["airport", "shabbat", "sherut", "transport", "attraction", "itinerary", "accommodation", "connectivity", "general"];
    const descriptions = new Set<string>();
    for (const kind of kinds) {
      const c = guideContactCopy("Test travel guide", kind, "Jerusalem");
      if (kind === "itinerary") {
        expect(c.subject).toBe("");
      } else {
        expect(c.subject).toContain("Test travel guide");
      }
      expect(c.subject.length).toBeLessThanOrEqual(160);
      expect(c.introduction).toMatch(/I'll reply personally/);
      expect(c.introduction).not.toMatch(/\bour team\b|\bwe recommend\b/i);
      descriptions.add(c.introduction);
    }
    expect(descriptions.size).toBe(kinds.length);
  });
  it("allows readers to write their own itinerary enquiry subject", () => {
    const contact = guideContactCopy("Israel in 3 Days: A Realistic First-Time Itinerary", "itinerary");
    expect(contact.subject).toBe("");
    expect(contact.introduction).toContain("airport transfer or private journey");
  });

  it("limits a long title to the form subject field maximum", () => {
    expect(guideContactCopy("a".repeat(240), "general").subject.length).toBe(160);
  });
});
