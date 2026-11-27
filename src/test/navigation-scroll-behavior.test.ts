import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("instant navigation scrolling", () => {
  it("does not animate global page changes or fragment jumps", () => {
    const css = readFileSync(resolve(process.cwd(), "src/styles.css"), "utf8");
    expect(css).toMatch(/html\s*\{\s*scroll-behavior:\s*auto;\s*scroll-padding-top:\s*5rem;/);
    expect(css).not.toMatch(/scroll-behavior:\s*smooth/);
  });

  it("keeps only the selected blue filter chip compact across shared filter panels", () => {
    const css = readFileSync(resolve(process.cwd(), "src/styles.css"), "utf8");
    const baseChip = css.match(/ {2}\.chip \{([\s\S]*?)\n {2}\}/)?.[1];
    const selectedChip = css.match(
      / {2}\.chip\[aria-pressed="true"\], \.chip\[aria-current="true"\], \.chip\[aria-current="page"\] \{([\s\S]*?)\n {2}\}/,
    )?.[1];
    expect(baseChip).toContain("min-height: 2.5rem");
    expect(baseChip).toContain("padding: .5rem .75rem");
    expect(selectedChip).toContain("min-height: 2.125rem");
    expect(selectedChip).toContain("padding: .3rem .625rem");
    expect(selectedChip).toContain("align-self: center");
    expect(selectedChip).toContain("background: var(--color-primary)");
    expect(selectedChip).toContain("color: var(--color-primary-foreground)");
    // Filter chips in tours, shore excursions, guides and hotel selectors share
    // these active-state attributes; ordinary CTAs do not use this rule.
    const paths = [
      "src/components/TourCatalog.tsx",
      "src/components/ShoreServiceCatalog.tsx",
      "src/routes/travel-blog.index.tsx",
      "src/components/CityStayHub.tsx",
      "src/components/CityStayPage.tsx",
      "src/components/JerusalemHotelBrowser.tsx",
      "src/components/TelAvivHotelBrowser.tsx",
    ];
    for (const path of paths) {
      const source = readFileSync(resolve(process.cwd(), path), "utf8");
      expect(source, path).toContain('className="chip');
      expect(source, path).toMatch(/aria-(pressed|current)=/);
    }
  });

  it("keeps router scroll restoration and direct anchor navigation enabled", () => {
    const router = readFileSync(resolve(process.cwd(), "src/router.tsx"), "utf8");
    const toc = readFileSync(resolve(process.cwd(), "src/components/Guide.tsx"), "utf8");
    expect(router).toMatch(/scrollRestoration:\s*true/);
    expect(toc).toContain("href={`#${id}`}");
  });
});
