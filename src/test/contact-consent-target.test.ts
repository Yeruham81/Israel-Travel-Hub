import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

function sources(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const file = join(dir, entry.name);
    return entry.isDirectory() ? sources(file) : file.endsWith(".tsx") ? [file] : [];
  });
}

describe("contact and quote form consent touch targets", () => {
  it("keeps every native enquiry consent checkbox at least 28 CSS pixels with a visible keyboard focus", () => {
    const forms = [...sources("src/components"), ...sources("src/routes")];
    const found: string[] = [];
    for (const file of forms) {
      const source = readFileSync(file, "utf8");
      for (const input of source.matchAll(/<input\b(?:(?!<input\b)[\s\S])*?\/>/g)) {
        const markup = input[0];
        if (!markup.includes('name="consent"') || !markup.includes('type="checkbox"')) continue;
        found.push(file);
        expect(markup, file).toContain("size-7");
        expect(markup, file).toContain("shrink-0");
        expect(markup, file).toContain("focus-visible:outline-2");
        expect(markup, file).toContain("required");
        expect(markup, file).toContain("checked=");
      }
    }
    for (const name of ["HomeContactForm", "PrivateDriverQuoteForm", "SacredHillContactForm", "ShoreQuoteForm", "TransferQuoteForm"]) {
      expect(found).toContain(join("src/components", name + ".tsx"));
    }
  });
});
