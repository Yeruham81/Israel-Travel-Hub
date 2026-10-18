import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { tripadvisorProfileUrl, tripadvisorReviews } from "@/data/homeReviews";
import { TripadvisorReviewCarousel } from "@/components/TripadvisorReviewCarousel";

const originalVerbatimPassages = {
  "Kaye L": "He has always been on time and makes the process of finding him when we land at Ben Gurion airport easy. He drives very well and safely.",
  "Lilach T": "He was on time, easy to communicate with, and very professional throughout. I felt completely safe and taken care of, which made a big difference while traveling.",
  Janet: "The service was easy to coordinate and reasonably priced. It was such a good experience we also used his service to return to the airport after our time in Jerusalem.",
  "Yaniv B": "From airport pickups to full-day tours, he’s consistently professional, punctual, and incredibly kind. His car is spotless, his driving is safe, and his knowledge of the country is unmatched.",
  Marc: "Moshe Barak has picked us up from the airport for many many years, always reliable and super friendly! We can count on him day and night, also he offers trips around the country.",
  david: "Moshe was and is an excellent driver and very helpful for a private day tour. I greatly enjoyed my visit in israel, and especially exploring Mount Tabor.",
} as const;

describe("Tripadvisor review authenticity and uniform cards", () => {
  it("uses actual contiguous review text for all six quotes, not synthesized summaries", () => {
    expect(tripadvisorReviews).toHaveLength(6);
    for (const review of tripadvisorReviews) {
      expect(review).not.toHaveProperty("summary");
      expect(review.excerpt).toBe(originalVerbatimPassages[review.author]);
      const words = review.excerpt.trim().split(/\s+/);
      expect(words.length, review.author).toBeGreaterThanOrEqual(27);
      expect(words.length, review.author).toBeLessThanOrEqual(33);
      expect(review.excerpt).not.toMatch(/\.\.\.$/);
    }
  });

  it("renders authentic blockquotes in equally stretching carousel cards with source links", () => {
    const markup = renderToString(<TripadvisorReviewCarousel />);
    const doc = new DOMParser().parseFromString(markup, "text/html");
    const cards = doc.querySelectorAll('[data-testid="tripadvisor-review-cards"] article');
    expect(cards).toHaveLength(3);
    for (const [i, card] of [...cards].entries()) {
      expect(card.className).toContain("h-full");
      const quote = card.querySelector("blockquote");
      expect(quote).not.toBeNull();
      expect(quote?.getAttribute("cite")).toBe(tripadvisorProfileUrl);
      expect(quote?.textContent).toContain(tripadvisorReviews[i]!.excerpt);
      expect(card.querySelector("a")?.getAttribute("href")).toBe(tripadvisorProfileUrl);
      expect(card.textContent).not.toMatch(/frequent business traveler|appreciated many years|David enjoyed/i);
    }
  });
});
