import { sourceFragment } from "@/test-utils/source-fragment";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const styles = readFileSync("src/styles.css", "utf8");
const seniors = readFileSync("src/components/SeniorToursGuide.tsx", "utf8");

describe("editorial prose links", () => {
  it("keeps external link text without generated symbols or legacy outbound icons", () => {
    expect(styles).not.toContain("--outgoing-link-icon");
    expect(styles).toContain("a svg:is(.lucide-external-link, .lucide-arrow-up-right");
    expect(styles).toContain("display: none !important");
    expect(styles).not.toMatch(/a\[href\^="http"\][^{]*::after/);
    expect(readFileSync("src/components/Layout.tsx", "utf8")).not.toContain("↗");
    expect(styles).toContain("table :is(th, td).sticky.left-0:first-child");
    expect(styles).toContain("max-inline-size: 7.75rem");
  });

  it("keeps plain link text and an accessible new-tab description in the senior guide", () => {
    expect(seniors).toMatch(sourceFragment('rel="noopener noreferrer"'));
    expect(seniors).toMatch(sourceFragment("(opens in a new tab)"));
    expect(seniors).not.toMatch(sourceFragment("<ExternalLink"));
  });

  it("removes top-of-article detours and repeats, retaining the floating-contact destination", () => {
    for (const text of [
      "How private day trips work",
      "Ask about my private driver service",
      "The private driver provides transportation and agreed stops",
      "Ask Moshe about your day",
      "I cannot assume or guarantee an accessible vehicle",
    ])
      expect(seniors).not.toMatch(sourceFragment(text));
    expect(seniors).toMatch(sourceFragment('href="#contact"'));
    expect(seniors).toMatch(
      sourceFragment('heading:"Need a private driver for a comfortable day trip?"'),
    );
    expect(seniors).toMatch(
      sourceFragment("I arrange comfortable private day trips with a driver in Israel"),
    );
  });
});
