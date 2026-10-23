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
    expect(root).toContain('rel: "preload", href: siteSansUrl');
    expect(root).toContain('rel: "preload", href: siteSerifUrl');
    for (const filename of ["instrument-sans-latin-wght-normal.woff2", "newsreader-latin-400.woff2", "newsreader-latin-600.woff2", "newsreader-latin-400-italic.woff2"]) {
      expect(bytes(`src/assets/fonts/${filename}`)).toBeGreaterThan(5000);
      expect(css).toContain(`./assets/fonts/${filename}`);
      expect(css).not.toContain(`url("/fonts/${filename}")`);
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

  it("provides a head preload for the exact LCP image variant, not every slide", () => {
    const page = read("src/routes/index.tsx");
    for (const key of ["lcpHeroMobile", "lcpHeroMedium", "lcpHeroLarge"]) {
      expect(page).toContain(`href: ${key}`);
    }
    expect(page).toContain('media: "(max-width: 767px)"');
    expect(page).toContain('media: "(min-width: 768px) and (max-width: 1800px)"');
    expect(page).toContain('media: "(min-width: 1801px)"');
    expect(page).toContain('fetchPriority: "high"');
    expect(page.match(/rel: "preload", as: "image"/g)).toHaveLength(3);
  });

  it("skips expensive offscreen paint on phones but does not hide SEO content", () => {
    const page = read("src/routes/index.tsx");
    const css = read("src/styles.css");
    expect(page).toContain('className="home-offscreen');
    expect(page).toContain('<TripadvisorReviewsSection />');
    expect(page).toContain('<PersonalTestimonialsSection />');
    expect(page).toContain('<HomeContactForm />');
    // The first transfer/service section remains on the normal rendering path.
    expect(page).toContain('className={`scroll-mt-6 rounded-2xl border p-5 md:p-8');
    expect(css).toContain('content-visibility: auto;');
    expect(css).toContain('contain-intrinsic-size: auto 850px;');
    expect(css).toContain('@media (max-width: 767px)');
  });

  it("defers second hero image until after initial render", () => {
    const carousel = read("src/components/HeroCarousel.tsx");
    expect(carousel).toContain("index === 0 ? 2800 : 350");
    expect(carousel).toContain('fetchPriority={i === 0 ? "high" : "auto"}');
    expect(carousel).toContain("prefers-reduced-motion: reduce");
  });

  it("uses right-sized first hero on mobile and standard desktop viewports", () => {
    const slides = read("src/components/HomeHero.tsx");
    const carousel = read("src/components/HeroCarousel.tsx");
    expect(slides).toContain("hero-jerusalem-medium.webp");
    expect(slides).toContain("hero-jerusalem-large.webp");
    expect(carousel).toContain('media="(max-width: 767px)"');
    expect(carousel).toContain('media="(max-width: 1800px)"');
    expect(carousel).toContain('fetchPriority={i === 0 ? "high" : "auto"}');
    for (const place of ["jerusalem", "haifa", "tel-aviv", "masada", "caesarea", "galilee"]) {
      const original = bytes(`src/assets/home/hero-${place}.webp`);
      const medium = bytes(`src/assets/home/hero-${place}-medium.webp`);
      expect(medium, place).toBeLessThan(original);
    }
    expect(bytes("src/assets/home/hero-jerusalem-medium.webp")).toBeLessThan(250000);
  });

  it("uses resized hero-adjacent service images and destination tiles", () => {
    const home = read("src/routes/index.tsx");
    for (const name of ["airport-pickup", "guided-tour", "cruise-port", "hotel-room", "caesarea-dusk"]) {
      const base = `src/assets/home/${name}`;
      expect(bytes(`${base}-feature.webp`)).toBeLessThan(bytes(`${base}.webp`));
      expect(home).toContain(`${name}-feature.webp`);
    }
    for (const name of ["jerusalem-old-city", "tel-aviv-coast", "tiberias-lake", "bethlehem-nativity", "masada-dead-sea", "caesarea-aqueduct"]) {
      const base = `src/assets/home/${name}`;
      expect(bytes(`${base}-tile.webp`)).toBeLessThan(bytes(`${base}.webp`));
      expect(home).toContain(`${name}-tile.webp`);
    }
    expect(home).toContain("c.img.tile ?? c.img.src");
  });

  it("sets cache rules for static resources without caching HTML or API responses", () => {
    const rules = read("public/_headers");
    expect(rules).toContain("/fonts/*");
    expect(rules).toContain("/images/*");
    expect(rules).toContain("/assets/*");
    expect(rules).toContain("immutable");
    expect(rules).not.toMatch(/^\/(api\/\*|\*)\s*$/m);
  });

  it("does not fetch the Tripadvisor icon from a third-party CDN", () => {
    const reviews = read("src/components/HomeTestimonials.tsx");
    expect(reviews).toContain('src="/images/tripadvisor.svg"');
    expect(reviews).not.toContain("cdn.simpleicons.org");
    expect(read("public/images/tripadvisor.svg")).toContain('<svg');
    const carousel = read("src/components/TripadvisorReviewCarousel.tsx");
    expect(carousel).toContain('src="/images/tripadvisor.svg"');
    expect(carousel).not.toContain("cdn.simpleicons.org");
  });
});
