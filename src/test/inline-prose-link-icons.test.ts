import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const styles = readFileSync("src/styles.css", "utf8");
const seniors = readFileSync("src/components/SeniorToursGuide.tsx", "utf8");

describe("editorial prose links", () => {
  it("hides repeated external/diagonal arrow icons on blue inline links sitewide", () => {
    expect(styles).toContain(":is(p, blockquote, figcaption, td, th, .prose-guide)");
    expect(styles).toContain("a:is(.text-primary, .underline)");
    expect(styles).toContain("li > a:is(.text-primary, .underline)");
    expect(styles).toContain(".lucide-external-link");
    expect(styles).toContain(".lucide-arrow-up-right");
    expect(styles).toContain(".lucide-square-arrow-out-up-right");
    expect(styles).toContain("display: none !important");
    // Do not hide every icon universally: independent buttons and cards retain them.
    expect(styles).not.toMatch(/(?:^|\n)\s*svg\.lucide-external-link\s*\{/);
  });

  it("keeps plain link text and an accessible new-tab description in the senior guide", () => {
    expect(seniors).toContain('rel="noopener noreferrer"');
    expect(seniors).toContain('(opens in a new tab)');
    expect(seniors).not.toContain('<ExternalLink');
  });

  it("removes top-of-article detours and repeats, retaining the floating-contact destination", () => {
    for (const text of [
      "How private day trips work",
      "Ask about my private driver service",
      "The private driver provides transportation and agreed stops",
      "Ask Moshe about your day",
      "I cannot assume or guarantee an accessible vehicle",
    ]) expect(seniors).not.toContain(text);
    expect(seniors).toContain('href="#contact"');
    expect(seniors).toContain('heading:"Send me your trip details"');
    expect(seniors).toContain("Send me your dates, destinations and any walking or vehicle needs");
  });
});
