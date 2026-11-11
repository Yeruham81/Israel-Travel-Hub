import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("instant navigation scrolling", () => {
  it("does not animate global page changes or fragment jumps", () => {
    const css = readFileSync(resolve(process.cwd(), "src/styles.css"), "utf8");
    expect(css).toMatch(/html\s*\{\s*scroll-behavior:\s*auto;\s*scroll-padding-top:\s*5rem;/);
    expect(css).not.toMatch(/scroll-behavior:\s*smooth/);
  });

  it("keeps router scroll restoration and direct anchor navigation enabled", () => {
    const router = readFileSync(resolve(process.cwd(), "src/router.tsx"), "utf8");
    const toc = readFileSync(resolve(process.cwd(), "src/components/Guide.tsx"), "utf8");
    expect(router).toMatch(/scrollRestoration:\s*true/);
    expect(toc).toContain('href={`#${id}`}');
  });
});
