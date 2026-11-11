import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const disallowedHost = ["taxitariff", "co", "il"].join(".");
const extensions = /\.(?:ts|tsx|js|jsx|json|html|md|txt|css)$/;

function textFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((item) => {
    const path = join(directory, item.name);
    return item.isDirectory() ? textFiles(path) : item.isFile() && extensions.test(item.name) ? [path] : [];
  });
}

describe("sitewide fare source links", () => {
  it("does not link or refer to the unwanted external taxi calculator in published code", () => {
    const paths = ["src", "public"].flatMap((directory) => textFiles(directory));
    for (const path of paths) {
      const content = readFileSync(path, "utf8");
      expect(content.toLowerCase().includes(disallowedHost), `Unexpected fare-calculator reference in ${path}`).toBe(false);
    }
  });
});
