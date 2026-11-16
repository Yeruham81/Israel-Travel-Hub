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
    expect(heroSlides[1]?.srcSm).toContain("hero-refresh-tel-aviv-coastline-v2-mobile.webp");
    expect(heroSlides[7]?.caption).toBe("Akko Old City and harbour");
    expect(heroSlides[9]?.caption).toBe("Old Jaffa and its harbour");
    expect(heroSlides[9]?.src).toContain("hero-refresh-jaffa-port-v2-large.webp");
    expect(heroSlides[9]?.srcMedium).toContain("hero-refresh-jaffa-port-v2-medium.webp");
    expect(heroSlides[9]?.srcSm).toContain("hero-refresh-jaffa-port-v2-mobile.webp");
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
});
