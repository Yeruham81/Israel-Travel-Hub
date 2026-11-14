/** Apply only a complete, API-generated set of exact source-page deeplinks.
 * Run after the generator inside the restricted GitHub Actions job.
 */
import { readFile, writeFile } from "node:fs/promises";
const data = JSON.parse(await readFile("artifacts/travelpayouts-food-eilat-tours.json", "utf8"));
const results = data.results;
if (data.projectId !== 406243 || data.partnerId !== 622032 || !Array.isArray(results) || results.length !== 16) throw Error("Incomplete or mismatched Travelpayouts generation");
const seen = new Set();
const lines = [];
const file = "src/data/registry.ts";
let original = await readFile(file, "utf8");
for (const result of results) {
  const { id, category, url, partner_url: partnerUrl, status, config_key: configKey } = result;
  if (!["food-markets", "eilat-red-sea"].includes(category) || typeof id !== "string" || !/^tour-[a-z0-9-]+-(viator|getyourguide)$/.test(id) || configKey !== id + "@tours-" + category || seen.has(configKey)) throw Error("Invalid or repeated affiliate key");
  seen.add(configKey);
  if (status !== "generated_pending_review" || typeof partnerUrl !== "string" || !/^https:\/\/(viator|getyourguide)\.tpm\.li\/[a-zA-Z0-9]+\/?$/.test(partnerUrl)) throw Error("Missing or untrusted affiliate link for " + id);
  const partner = id.endsWith("-getyourguide") ? "getyourguide" : "viator";
  const productId = id.slice(5, -(partner.length + 1));
  if (!original.includes(JSON.stringify([productId, partner, url]).slice(1, -1))) {
    // The catalog's source URLs are authoritative. Never map a tracking URL to a different product.
    const tuple = `["${productId}", "${partner}", "${url}"]`;
    if (!original.includes(tuple)) throw Error("Product URL changed since generation: " + id);
  }
  lines.push(`  "${configKey}": { trackingUrl: "${partnerUrl}" },`);
}
const begin = "  // BEGIN verified Travelpayouts Food & Eilat page-specific deeplinks";
const end = "  // END verified Travelpayouts Food & Eilat page-specific deeplinks";
const block = begin + "\n" + lines.join("\n") + "\n" + end + "\n";
if (original.includes(begin)) {
  const start = original.indexOf(begin);
  const finish = original.indexOf(end, start);
  if (finish < 0) throw Error("Partial affiliate block");
  original = original.slice(0, start) + block + original.slice(finish + end.length + 1);
} else {
  const anchor = "  // Configure an approved product-specific affiliate URL once; all category appearances use it.";
  if (!original.includes(anchor)) throw Error("Affiliate block insertion point moved");
  original = original.replace(anchor, block + anchor);
}
await writeFile(file, original, "utf8");
console.log("Applied 16 product-specific tour affiliate links for review in git");
