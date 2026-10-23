import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

function sources(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = join(dir, entry.name);
    return entry.isDirectory() ? sources(full) : /\.(?:tsx?|mjs|jsx)$/.test(entry.name) ? [full] : [];
  });
}

describe("Accommodation URL and deleted Destinations directory", () => {
  it("does not retain any links to /hotels or /destinations or the removed route imports", () => {
    const oldLinks: string[] = [];
    for (const file of [...sources("src"), ...sources("scripts")]) {
      const content = readFileSync(file, "utf8");
      // Allow historic URLs ONLY inside this regression test's own test patterns.
      if (file.endsWith("accommodation-paths.test.ts")) continue;
      if (/["'\x60]\/(?:hotels|destinations)\/?["'\x60]/.test(content) ||
          /@\/routes\/hotels\b/.test(content) ||
          /\/routes\/destinations(?:\.tsx?)?["'\x60]/.test(content)) oldLinks.push(file);
    }
    expect(oldLinks).toEqual([]);
  });

  it("has one live Accommodation hub in the route tree", () => {
    const routeTree = readFileSync("src/routeTree.gen.ts", "utf8");
    const source = readFileSync("src/routes/accommodation.tsx", "utf8");
    expect(routeTree).toContain("AccommodationRoute");
    expect(routeTree).not.toContain("HotelsRoute");
    expect(routeTree).not.toContain("DestinationsRoute");
    expect(source).toContain('createFileRoute("/accommodation")');
    expect(source).toContain('path: "/accommodation/"');
  });
});
