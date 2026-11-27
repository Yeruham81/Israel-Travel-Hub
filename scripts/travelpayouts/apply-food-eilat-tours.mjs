/** Apply only a complete, API-generated set of exact source-page deeplinks.
 * Run after the generator inside the restricted GitHub Actions job.
 */
import { readFile, writeFile } from "node:fs/promises";
import { registry, setTracking } from "./registry-source.mjs";
const data = JSON.parse(await readFile("artifacts/travelpayouts-food-eilat-tours.json", "utf8"));
const results = data.results;
if (
  data.projectId !== 406243 ||
  data.partnerId !== 622032 ||
  !Array.isArray(results) ||
  results.length !== 16
)
  throw Error("Incomplete or mismatched Travelpayouts generation");
const seen = new Set();

const file = "src/data/registry.ts";
let original = await readFile(file, "utf8");
for (const result of results) {
  const { id, category, url, partner_url: partnerUrl, status, config_key: configKey } = result;
  if (
    !["food-markets", "eilat-red-sea"].includes(category) ||
    typeof id !== "string" ||
    !/^tour-[a-z0-9-]+-(viator|getyourguide)$/.test(id) ||
    configKey !== id + "@tours-" + category ||
    seen.has(configKey)
  )
    throw Error("Invalid or repeated affiliate key");
  seen.add(configKey);
  if (
    status !== "generated_pending_review" ||
    typeof partnerUrl !== "string" ||
    !/^https:\/\/(viator|getyourguide)\.tpm\.li\/[a-zA-Z0-9]+\/?$/.test(partnerUrl)
  )
    throw Error("Missing or untrusted affiliate link for " + id);
  const partner = id.endsWith("-getyourguide") ? "getyourguide" : "viator";
  const productId = id.slice(5, -(partner.length + 1));
  if (!registry(original).tour(productId, partner, url)) throw Error("Product URL changed since generation: " + id);
  if (new URL(partnerUrl).hostname !== partner + ".tpm.li") throw Error("Tracking provider mismatch: " + id);
  original = setTracking(original, configKey, partnerUrl, { allowInsert: true, allowReplace: true });
}
await writeFile(file, original, "utf8");
console.log("Applied 16 product-specific tour affiliate links for review in git");
