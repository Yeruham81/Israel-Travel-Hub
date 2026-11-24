import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

/** Inspect the route plus its explicitly imported SEO module, not unrelated files. */
export function readRouteSource(file: string): string {
  const route = readFileSync(file, "utf8");
  const matches = [...route.matchAll(/await import\("([^"]*\/route-heads\/[^"]+)"\)/g)];
  if (!matches.length) return route;
  if (matches.length !== 1) throw new Error("Ambiguous route head: " + file);
  const head = resolve(dirname(file), matches[0]![1]! + ".tsx");
  return route + "\n" + readFileSync(head, "utf8");
}
