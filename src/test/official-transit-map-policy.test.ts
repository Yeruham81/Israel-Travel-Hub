import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const roots = ["src/components", "src/data", "src/routes", "src/lib", "public/maps"];

function sourceFiles(): string[] {
  const files: string[] = [];
  for (const root of roots) {
    if (!existsSync(root)) continue;
    const visit = (path: string) => {
      for (const entry of readdirSync(path)) {
        const next = join(path, entry);
        if (statSync(next).isDirectory()) visit(next);
        else if (/\.(?:tsx?|jsx?|html)$/.test(next) && !/\.test\.[tj]sx?$/.test(next)) files.push(next);
      }
    };
    visit(root);
  }
  return files;
}

describe("official transit links and map provider policy", () => {
  it("links to the English national public transport home page consistently", () => {
    for (const path of sourceFiles()) {
      const source = readFileSync(path, "utf8");
      const links = source.match(/https:\/\/(?:route\.)?bus\.gov\.il(?:\/[^\s"'`<>]*)?/g) ?? [];
      for (const url of links) {
        expect(url, `Unexpected public transport URL in ${relative(".", path)}`).toBe("https://bus.gov.il/en/home");
      }
    }
  });

  it("never embeds OpenStreetMap resources or Leaflet in website pages", () => {
    for (const path of sourceFiles()) {
      const source = readFileSync(path, "utf8");
      expect(/openstreetmap\.org|(?:unpkg\.com\/)?leaflet(?:@|\/|\.js|\.css)/i.test(source), `Unexpected map provider in ${relative(".", path)}`).toBe(false);
    }
  });
});
