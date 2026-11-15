/** One-time fallback for Welcome Pickups when the Tel Aviv destination URL is rejected.
 * Keep the ordinary provider link if neither official address converts for this project.
 */
import { readFile, writeFile } from "node:fs/promises";
const file = "src/data/registry.ts";
const token = process.env.TRAVELPAYOUTS_API_TOKEN;
if (!token) throw Error("Missing protected token");
const targets = [
  "https://www.welcomepickups.com/",
  "https://welcomepickups.com/",
];
const pages = [
  ["airport-private-transfers", "hub"],
  ["airport-route-jerusalem", "jerusalem"],
  ["airport-route-tel-aviv", "tel_aviv"],
  ["airport-route-haifa", "haifa"],
  ["airport-route-dead-sea", "ein_bokek"],
];
async function create(target, subId) {
  const response = await fetch("https://api.travelpayouts.com/links/v1/create", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Access-Token": token },
    body: JSON.stringify({ trs: 406243, marker: 622032, shorten: true, links: [{ url: target, sub_id: subId }] }),
    redirect: "error", signal: AbortSignal.timeout(25000),
  });
  if (!response.ok) return { error: "HTTP " + response.status };
  const data = await response.json();
  const row = data?.result?.links?.find(x => x.url === target);
  if (data.code !== "success" || row?.code !== "success" || typeof row.partner_url !== "string") {
    return { error: String(row?.message || row?.code || data.code || "unsupported").slice(0, 160) };
  }
  const url = new URL(row.partner_url);
  if (url.protocol !== "https:" || url.username || url.password || !["welcome.tpm.li", "welcomepickups.tpm.li", "welcome.tp.st", "welcomepickups.tp.st"].includes(url.hostname)) {
    return { error: "Unexpected approved-link domain " + url.hostname };
  }
  return { trackingUrl: url.toString() };
}
let chosen = null;
let hub = null;
for (const target of targets) {
  const result = await create(target, "airport_hub_welcome");
  console.log("Welcome URL " + new URL(target).hostname + ": " + (result.trackingUrl ? "approved" : result.error));
  if (result.trackingUrl) { chosen = target; hub = result.trackingUrl; break; }
}
if (!hub) { console.log("No verifiable Travelpayouts Welcome Pickup link; original public URL remains unchanged."); process.exit(0); }
let contents = await readFile(file, "utf8");
const old = '"airport-welcome": undefined,';
if (!contents.includes(old)) throw Error("Welcome partner placeholder unexpectedly changed");
contents = contents.replace(old, '"airport-welcome": { trackingUrl: "' + hub + '" },');
const lines = [];
for (const [pageId, slug] of pages.slice(1)) {
  const result = await create(chosen, "airport_" + slug + "_welcome");
  console.log("Welcome " + pageId + ": " + (result.trackingUrl ? "approved" : result.error));
  if (result.trackingUrl) lines.push('  "airport-welcome@' + pageId + '": { trackingUrl: "' + result.trackingUrl + '" },');
}
const end = "  // END Travelpayouts airport route-specific links";
if (!contents.includes(end)) throw Error("Missing route-link insertion marker");
contents = contents.replace(end, lines.join("\n") + (lines.length ? "\n" : "") + end);
await writeFile(file, contents, "utf8");
console.log("Welcome Pickups verified tracking URLs: " + (1 + lines.length) + "/5");
