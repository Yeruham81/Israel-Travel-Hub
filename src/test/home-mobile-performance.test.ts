import { describe, expect, it } from "vitest";
import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const read = (p: string) => readFileSync(resolve(process.cwd(), p), "utf-8");
const bytes = (p: string) => statSync(resolve(process.cwd(), p)).size;

describe("home mobile performance optimizations", () => {
  it("uses self-hosted fonts without blocking Google Fonts CSS or external preconnects", () => {
    const root = read("src/routes/__root.tsx");
    const css = read("src/styles.css");
    expect(root).not.toContain("fonts.googleapis.com");
    expect(root).not.toContain("fonts.gstatic.com");
    expect(root).toContain('rel: "preload", href: "/fonts/instrument-sans-latin-wght-normal.woff2"');
    for (const filename of ["instrument-sans-latin-wght-normal.woff2", "newsreader-latin-400.woff2", "newsreader-latin-600.woff2", "newsreader-latin-400-italic.woff2"]) {
      expect(bytes(`public/fonts/${filename}`)).toBeGreaterThan(5000);
      expect(css).toContain(`/fonts/${filename}`);
    }
    expect(css).toMatch(/font-display:\s*swap/);
    expect(bytes("public/fonts/LICENSE-instrument-sans.txt")).toBeGreaterThan(100);
    expect(bytes("public/fonts/LICENSE-newsreader.txt")).toBeGreaterThan(100);
  });

  it("serves thumbnails for small home cards instead of downloading full-size photos", () => {
    const homepage = read("src/routes/index.tsx");
    expect(homepage).toContain("c.img.thumb ?? c.img.src");
    const sources = [
      "src/assets/home/bethlehem-nativity",
      "src/assets/home/jerusalem-old-city",
      "src/assets/home/tel-aviv-coast",
      "src/assets/home/tiberias-lake",
      "src/assets/home/masada-dead-sea",
      "src/assets/home/caesarea-aqueduct",
      "src/assets/haifa/panorama",
      "src/assets/dead-sea/beach",
    ];
    for (const source of sources) {
      const original = bytes(`${source}.webp`);
      const compact = bytes(`${source}-card.webp`);
      expect(compact, source).toBeLessThan(original / 2);
      expect(compact, source).toBeLessThan(35000);
    }
    for (const name of ["jerusalemCard", "telAvivCard", "tiberiasCard", "bethlehemCard", "masadaCard", "caesareaAqueductCard", "deadSeaBeachCard", "haifaHotelsCard"]) {
      expect(homepage).toContain(`thumb: ${name}`);
    }
  });

  it("defers second hero image until after initial render", () => {
    const carousel = read("src/components/HeroCarousel.tsx");
    expect(carousel).toContain("index === 0 ? 2800 : 350");
    expect(carousel).toContain('fetchPriority={i === 0 ? "high" : "auto"}');
    expect(carousel).toContain("prefers-reduced-motion: reduce");
  });

  it("does not fetch the Tripadvisor icon from a third-party CDN", () => {
    const reviews = read("src/components/HomeTestimonials.tsx");
    expect(reviews).toContain('src="/images/tripadvisor.svg"');
    expect(reviews).not.toContain("cdn.simpleicons.org");
    expect(read("public/images/tripadvisor.svg")).toContain('<svg');
  });
});
