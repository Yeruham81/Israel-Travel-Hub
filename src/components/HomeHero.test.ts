import { describe, expect, it } from "vitest";
import { heroSlides } from "./HomeHero";

describe("homepage hero photo carousel", () => {
  it("has exactly 12 distinct locally sourced responsive slides", () => {
    expect(heroSlides).toHaveLength(12);
    expect(new Set(heroSlides.map((slide) => slide.caption)).size).toBe(12);
    expect(new Set(heroSlides.map((slide) => slide.src)).size).toBe(12);
    for (const slide of heroSlides) {
      expect(slide.src).toBeTruthy();
      expect(slide.srcMedium).toBeTruthy();
      expect(slide.srcSm).toBeTruthy();
      expect(slide.alt.trim()).toBeTruthy();
    }
  });

  it("preserves Jerusalem and Akko, with sharper Tel Aviv at 2 and updated Jaffa at 10", () => {
    expect(heroSlides[0]?.caption).toBe("Jerusalem Old City from the Mount of Olives");
    expect(heroSlides[1]?.caption).toBe("Tel Aviv beachfront skyline");
    expect(heroSlides[1]?.src).toContain("hero-refresh-tel-aviv-coastline-v2-large.webp");
    expect(heroSlides[1]?.srcMedium).toContain("hero-refresh-tel-aviv-coastline-v2-medium.webp");
    expect(heroSlides[1]?.srcSm).toContain("hero-refresh-tel-aviv-coastline-v3-mobile.webp");
    expect(heroSlides[2]?.caption).toBe("Haifa and the Bahá’í Gardens");
    expect(heroSlides[2]?.src).toContain("hero-refresh-haifa-gardens-v4-large.webp");
    expect(heroSlides[2]?.srcMedium).toContain("hero-refresh-haifa-gardens-v4-medium.webp");
    expect(heroSlides[2]?.srcSm).toContain("hero-refresh-haifa-gardens-v4-mobile.webp");
    expect(heroSlides[2]?.highDensity).toBe(true);
    expect(heroSlides[3]?.src).toContain("hero-refresh-masada-dead-sea-v4-large.webp");
    expect(heroSlides[3]?.srcMedium).toContain("hero-refresh-masada-dead-sea-v4-medium.webp");
    expect(heroSlides[3]?.srcSm).toContain("hero-refresh-masada-dead-sea-v4-mobile.webp");
    expect(heroSlides[3]?.highDensity).toBe(true);
    expect(heroSlides[4]?.src).toContain("hero-refresh-caesarea-coast-v4-large.webp");
    expect(heroSlides[4]?.srcMedium).toContain("hero-refresh-caesarea-coast-v4-medium.webp");
    expect(heroSlides[4]?.srcSm).toContain("hero-refresh-caesarea-coast-v4-mobile.webp");
    expect(heroSlides[4]?.highDensity).toBe(true);
    expect(heroSlides[10]?.src).toContain("hero-refresh-ramon-crater-v4-large.webp");
    expect(heroSlides[10]?.srcMedium).toContain("hero-refresh-ramon-crater-v4-medium.webp");
    expect(heroSlides[10]?.srcSm).toContain("hero-refresh-ramon-crater-v4-mobile.webp");
    expect(heroSlides[10]?.highDensity).toBe(true);
    // Move these three existing images slightly upward in the hero frame
    // without changing or resizing the original Jerusalem image.
    expect(heroSlides[0]?.pos).toBe("55% 60%");
    expect(heroSlides[1]?.pos).toBe("center 60%");
    expect(heroSlides[9]?.pos).toBe("center 18%");
    expect(heroSlides[7]?.caption).toBe("Akko Old City and harbour");
    expect(heroSlides[9]?.caption).toBe("Old Jaffa and its harbour");
    expect(heroSlides[9]?.src).toContain("hero-refresh-jaffa-port-v4-large.webp");
    expect(heroSlides[9]?.srcMedium).toContain("hero-refresh-jaffa-port-v4-medium.webp");
    expect(heroSlides[9]?.srcSm).toContain("hero-refresh-jaffa-port-v5-mobile.webp");
    expect(heroSlides[9]?.highDensity).toBe(true);
  });

  it("uses 10 new compressed responsive images, without altering the other nine refreshed slides", () => {
    const changed = heroSlides.filter((_, i) => ![0, 7].includes(i));
    expect(changed).toHaveLength(10);
    for (const slide of changed) {
      expect(slide.src).toContain("hero-refresh-");
      expect(slide.srcMedium).toContain("hero-refresh-");
      expect(slide.srcSm).toContain("hero-refresh-");
      expect(slide.width).toBeGreaterThanOrEqual(1600);
      expect(slide.height).toBeGreaterThanOrEqual(600);
    }
  });
  it("uses the four new mobile-specific crops without changing desktop image sources", () => {
    const expected = [
      [1, "hero-refresh-tel-aviv-coastline-v3-mobile.webp", "hero-refresh-tel-aviv-coastline-v2-large.webp"],
      [5, "hero-refresh-jerusalem-jaffa-gate-v5-mobile.webp", "hero-refresh-jerusalem-jaffa-gate-v4-large.webp"],
      [9, "hero-refresh-jaffa-port-v5-mobile.webp", "hero-refresh-jaffa-port-v4-large.webp"],
      [11, "hero-refresh-tel-aviv-sarona-v5-mobile.webp", "hero-refresh-tel-aviv-sarona-v4-large.webp"],
    ] as const;
    for (const [index, mobile, desktop] of expected) {
      expect(heroSlides[index]?.srcSm).toContain(mobile);
      expect(heroSlides[index]?.src).toContain(desktop);
    }
    expect(heroSlides[0]?.srcSm).toContain("hero-jerusalem-psi-mobile.webp");
  });

});
