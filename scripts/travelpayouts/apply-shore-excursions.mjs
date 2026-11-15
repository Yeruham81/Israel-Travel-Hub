import { readFile, writeFile } from "node:fs/promises";
// Only apply exact generated links for known products. Preserve direct links on API failure.
const data = JSON.parse(await readFile("artifacts/travelpayouts-shore-excursions.json", "utf8"));
if (data.projectId !== 406243 || data.publisherId !== 622032 || !Array.isArray(data.results) || data.results.length !== 16) throw Error("Invalid result set");
const path = "src/data/registry.ts";
let source = await readFile(path, "utf8");
const seen = new Set();
let applied = 0;
for (const item of data.results) {
  if (seen.has(item.id) || !/^shore-(gyg|viator)-(haifa|ashdod)-[a-z-]+$/.test(item.id)) throw Error("Unrecognized shore item");
  seen.add(item.id);
  if (item.status !== "generated" || !item.trackingUrl) continue;
  const target = new URL(item.trackingUrl);
  const brand = item.platform === "viator" ? "viator" : item.platform === "getyourguide" ? "getyourguide" : null;
  if (!brand || target.protocol !== "https:" || target.username || target.password || !(target.hostname === brand + ".tpm.li" || target.hostname === "tp.st") || !/^\/[a-zA-Z0-9]+\/?$/.test(target.pathname)) throw Error("Invalid tracking domain " + item.id);
  const before = '"' + item.id + '": undefined,';
  const after = '"' + item.id + '": { trackingUrl: "' + target.href + '" },';
  if (source.includes(after)) continue;
  if (!source.includes(before)) throw Error("Refusing to overwrite existing tracking entry " + item.id);
  source = source.replace(before, after); applied++;
}
if (seen.size !== 16) throw Error("Missing result items");
await writeFile(path, source, "utf8");
console.log("Applied " + applied + " verified shore links; unapproved links remain public URLs");
