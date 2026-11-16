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

  it("preserves the original Jerusalem, Tel Aviv and Akko slides in slots 1, 2 and 8", () => {
    expect(heroSlides[0].caption).toBe("Jerusalem Old City from the Mount of Olives");
    expect(heroSlides[1].caption).toBe("Tel Aviv beach promenade");
    expect(heroSlides[7].caption).toBe("Akko Old City and harbour");
  });

  it("uses 9 new responsive images for the other slides", () => {
    const changed = heroSlides.filter((_, i) => ![0, 1, 7].includes(i));
    expect(changed).toHaveLength(9);
    for (const slide of changed) {
      expect(slide.src).toContain("hero-refresh-");
      expect(slide.srcMedium).toContain("hero-refresh-");
      expect(slide.srcSm).toContain("hero-refresh-");
      expect(slide.width).toBe(1680);
      expect(slide.height).toBe(840);
    }
  });
});
