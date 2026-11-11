/**
 * Generate Travelpayouts partner-link candidates for manual editorial review.
 * Never embeds an API token in source files, output artifacts or logs.
 * Does not modify published site links or commit generated links.
 *
 * Run: TRAVELPAYOUTS_API_TOKEN=<token> node scripts/travelpayouts/generate-links.mjs
 * Validate file only: node scripts/travelpayouts/generate-links.mjs --validate
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";

const input = process.argv[2] && !process.argv[2].startsWith("--")
  ? process.argv[2]
  : "scripts/travelpayouts/pilot-jerusalem-hotels.json";
const validateOnly = process.argv.includes("--validate");
const config = JSON.parse(await readFile(input, "utf8"));
if (!Number.isSafeInteger(config.project_id) || config.project_id <= 0
  || !Number.isSafeInteger(config.partner_id) || config.partner_id <= 0
  || !Array.isArray(config.links) || config.links.length === 0) {
  throw new Error("Invalid Travelpayouts project, partner or links configuration");
}
const seen = new Set();
for (const item of config.links) {
  if (typeof item.id !== "string" || !/^[a-z0-9-]+$/.test(item.id)
    || typeof item.name !== "string" || item.name.length === 0
    || typeof item.url !== "string") throw new Error("Invalid hotel link entry");
  const parsed = new URL(item.url);
  if (parsed.protocol !== "https:" || !["www.expedia.com", "expedia.com"].includes(parsed.hostname)
    || parsed.username || parsed.password)
    throw new Error("Hotel must have a full direct Expedia.com property URL");
  if (seen.has(item.id) || [...seen].some((id) => id === item.url))
    throw new Error("Duplicate hotel ID");
  seen.add(item.id);
}
if (validateOnly) {
  console.log("Validated " + config.links.length + " hotel source URLs for project " + config.project_id);
  process.exit(0);
}
const token = process.env.TRAVELPAYOUTS_API_TOKEN;
if (!token) throw new Error("Missing TRAVELPAYOUTS_API_TOKEN secret. Configure it in GitHub Actions secrets.");
const endpoint = "https://api.travelpayouts.com/links/v1/create";
const shorten = process.env.TRAVELPAYOUTS_SHORTEN !== "false";
const results = [];
for (let i = 0; i < config.links.length; i += 10) {
  const group = config.links.slice(i, i + 10);
  const body = {
    trs: config.project_id,
    marker: config.partner_id,
    shorten,
    links: group.map((item) => ({
      url: item.url,
      sub_id: "itt_hotel_" + item.id.replaceAll("-", "_"),
    })),
  };
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json", "X-Access-Token": token },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(20000),
    redirect: "error",
  });
  if (!response.ok) throw new Error("Travelpayouts link API returned HTTP " + response.status + "; no links applied.");
  const payload = await response.json();
  const links = payload?.result?.links;
  if (payload?.code !== "success" || !Array.isArray(links) || links.length !== group.length)
    throw new Error("Unexpected Travelpayouts link API response; no links applied.");
  for (const item of group) {
    const match = links.find((link) => link.url === item.url);
    let candidate = null;
    if (match?.code === "success" && typeof match.partner_url === "string") {
      try {
        const parsed = new URL(match.partner_url);
        if (parsed.protocol === "https:" && !parsed.username && !parsed.password) candidate = parsed.toString();
      } catch { /* Report the unsuccessful conversion for manual review. */ }
    }
    results.push({
      id: item.id,
      name: item.name,
      original_url: item.url,
      sub_id: "itt_hotel_" + item.id.replaceAll("-", "_"),
      status: candidate ? "generated_pending_review" : "failed",
      affiliate_url: candidate,
      message: candidate ? "" : String(match?.message ?? "No valid affiliate URL returned").slice(0, 250),
    });
  }
}
await mkdir("artifacts", { recursive: true });
await writeFile("artifacts/travelpayouts-pilot.json",
  JSON.stringify({ generated_at: new Date().toISOString(), project_id: config.project_id,
    partner_id: config.partner_id, shorten, items: results }, null, 2) + "\n");
const columns = ["id", "name", "original_url", "sub_id", "status", "affiliate_url", "message"];
const csv = [columns.join(","), ...results.map((item) => columns.map((key) =>
  '"' + String(item[key] ?? "").replaceAll('"', '""') + '"').join(","))].join("\n") + "\n";
await writeFile("artifacts/travelpayouts-pilot.csv", csv);
const success = results.filter((item) => item.affiliate_url).length;
console.log("Travelpayouts link candidates generated: " + success + "/" + results.length +
  ". Review the Actions artifact before changing any site links.");
if (success !== results.length) process.exitCode = 1;
