/**
 * Generate independently traceable Bethlehem tour deep links for the
 * Jerusalem-to-Bethlehem guide, using the existing protected Travelpayouts token.
 * Writes candidates for review; never edits published affiliate links.
 */
import { mkdir, writeFile } from "node:fs/promises";

const pageId = "jerusalem-to-bethlehem";
const projectId = 406243;
const partnerId = 622032;
const targets = [
  { id: "jslm-bethlehem-halfday-viator", url: "https://www.viator.com/tours/Jerusalem/Bethlehem-Half-Day-Tour/d921-115730P1", sub_id: "jslm_bethlehem_halfday_viator" },
  { id: "jslm-bethlehem-halfday-gyg", url: "https://www.getyourguide.com/jerusalem-l97/from-jerusalem-half-day-bethlehem-guided-tour-t213663/", sub_id: "jslm_bethlehem_halfday_gyg" },
  { id: "jslm-bethlehem-jericho-viator", url: "https://www.viator.com/tours/Jerusalem/Bethlehem-and-Jericho-Full-Day-Tour-from-Jerusalem-and-Tel-Aviv/d921-115730P10", sub_id: "jslm_bethlehem_jericho_viator" },
  { id: "jslm-bethlehem-jerusalem-gyg", url: "https://www.getyourguide.com/jerusalem-l97/full-day-tour-of-the-holy-land-from-jerusalem-t22125/", sub_id: "jslm_bethlehem_jerusalem_gyg" },
  { id: "jslm-bethlehem-private-gyg", url: "https://www.getyourguide.com/jerusalem-l97/from-jerusalemtel-aviv-bethlehem-half-day-private-tour-t419447/", sub_id: "jslm_bethlehem_private_gyg" },
  { id: "jslm-bethlehem-private-viator", url: "https://www.viator.com/tours/Jerusalem/Bethlehem-Half-Day-Private-Tour-Free-Hotel-Pick-up-and-Drop-Off-from-Tel-Aviv/d921-115730P7", sub_id: "jslm_bethlehem_private_viator" },
];
const unique = new Set();
for (const item of targets) {
  const url = new URL(item.url);
  if (url.protocol !== "https:" || !["www.viator.com", "www.getyourguide.com"].includes(url.hostname)) throw new Error("Unsupported provider URL");
  if (!/^jslm_bethlehem_(halfday|jericho|jerusalem|private)_(viator|gyg)$/.test(item.sub_id)) throw new Error("Invalid SubID");
  if (unique.has(item.id) || unique.has(item.sub_id) || unique.has(item.url)) throw new Error("Duplicate affiliate target");
  [item.id, item.sub_id, item.url].forEach(value => unique.add(value));
}
if (process.argv.includes("--validate")) {
  console.log("Validated " + targets.length + " product URLs for " + pageId);
  process.exit(0);
}
const token = process.env.TRAVELPAYOUTS_API_TOKEN;
if (!token) throw new Error("Missing protected Travelpayouts token");

const response = await fetch("https://api.travelpayouts.com/links/v1/create", {
  method: "POST",
  headers: { "Content-Type": "application/json", "Accept": "application/json", "X-Access-Token": token },
  body: JSON.stringify({ trs: projectId, marker: partnerId, shorten: true,
    links: targets.map(({ url, sub_id }) => ({ url, sub_id })) }),
  signal: AbortSignal.timeout(25000),
  redirect: "error",
});
if (!response.ok) throw new Error("Travelpayouts API HTTP " + response.status);
const payload = await response.json();
const returned = payload?.result?.links;
if (payload?.code !== "success" || !Array.isArray(returned) || returned.length !== targets.length) throw new Error("Unexpected API payload");
const results = targets.map(item => {
  const result = returned.find(x => x.url === item.url);
  const raw = result?.partner_url;
  let parsed;
  try { if (result?.code === "success" && typeof raw === "string") parsed = new URL(raw); } catch {}
  const valid = parsed?.protocol === "https:" && !parsed.username && !parsed.password
    && (parsed.hostname.endsWith(".tpm.li") || parsed.hostname.endsWith(".tp.st") || parsed.hostname === "tp.st");
  return { ...item, status: valid ? "generated_pending_review" : "failed",
    partner_url: valid ? parsed.toString() : null,
    message: valid ? undefined : String(result?.message || "No valid affiliate link returned").slice(0,160) };
});
await mkdir("artifacts", { recursive: true });
await writeFile("artifacts/travelpayouts-bethlehem-tours.json",
  JSON.stringify({ pageId, projectId, partnerId, generatedAt: new Date().toISOString(), results }, null, 2)+"\n");
for (const item of results) console.log(item.status + " " + item.id + " " + (item.partner_url || item.message));
console.log("Verified-format candidates: " + results.filter(x=>x.partner_url).length + "/" + results.length);
if (results.some(x=>!x.partner_url)) process.exitCode=1;
