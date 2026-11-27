import { readFile, writeFile } from "node:fs/promises";
import { registry, setTracking } from "./registry-source.mjs";
// Only apply exact generated links for known products. Preserve direct links on API failure.
const data = JSON.parse(await readFile("artifacts/travelpayouts-shore-excursions.json", "utf8"));
if (
  data.projectId !== 406243 ||
  data.publisherId !== 622032 ||
  !Array.isArray(data.results) ||
  data.results.length !== 18
)
  throw Error("Invalid result set");
const path = "src/data/registry.ts";
let source = await readFile(path, "utf8");
const seen = new Set();
let applied = 0;
for (const item of data.results) {
  if (seen.has(item.id) || !/^shore-(gyg|viator)-(haifa|ashdod)-[a-z-]+$/.test(item.id))
    throw Error("Unrecognized shore item");
  seen.add(item.id);
  if (item.status !== "generated" || !item.trackingUrl) continue;
  const target = new URL(item.trackingUrl);
  const brand =
    item.platform === "viator"
      ? "viator"
      : item.platform === "getyourguide"
        ? "getyourguide"
        : null;
  if (
    !brand ||
    target.protocol !== "https:" ||
    target.username ||
    target.password ||
    !(target.hostname === brand + ".tpm.li" || target.hostname === "tp.st") ||
    !/^\/[a-zA-Z0-9]+\/?$/.test(target.pathname)
  )
    throw Error("Invalid tracking domain " + item.id);
  const product = registry(source).shore(item.id);
  if (product.platform !== item.platform || product.url !== item.url)
    throw Error("Product URL or platform changed: " + item.id);
  const next = setTracking(source, item.id, target.href);
  if (next === source) continue;
  source = next;
  applied++;
}
if (seen.size !== 18) throw Error("Missing result items");
await writeFile(path, source, "utf8");
console.log("Applied " + applied + " verified shore links; unapproved links remain public URLs");
