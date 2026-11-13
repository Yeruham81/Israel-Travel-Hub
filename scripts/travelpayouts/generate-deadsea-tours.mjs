/**
 * Generate project-406243 Travelpayouts deep links with page-specific SubIDs
 * for Jerusalem to the Dead Sea (guide: jerusalem-to-the-dead-sea).
 *
 * Does not overwrite an already published link. Review the Action artifact
 * before replacing any previously verified tracking URLs.
 * Never print or persist the Travelpayouts API token.
 */
import { mkdir, writeFile } from "node:fs/promises";

const pageId = "jerusalem-to-the-dead-sea";
const projectId = 406243;
const partnerId = 622032;
const targets = [
  {
    id: "jslm-deadsea-beach-viator",
    url: "https://www.viator.com/tours/Jerusalem/Dead-Sea-Chill-Out-Day-Trip-from-Jerusalem/d921-6540P70",
    sub_id: "jslm_dead_sea_beach_viator",
  },
  {
    id: "jslm-deadsea-masada-viator",
    url: "https://www.viator.com/tours/Jerusalem/Masada-and-the-Dead-Sea-Day-Trip-from-Jerusalem/d921-5209MASDSJ",
    sub_id: "jslm_dead_sea_masada_viator",
  },
  {
    id: "jslm-deadsea-masada-eingedi-viator",
    url: "https://www.viator.com/tours/Jerusalem/Masada-Ein-Gedi-and-Dead-Sea-Tour-from-Jerusalem/d921-6540P7",
    sub_id: "jslm_dead_sea_masada_eingedi_viator",
  },
];

for (const item of targets) {
  const u = new URL(item.url);
  if (u.protocol !== "https:" || !["www.viator.com", "www.getyourguide.com"].includes(u.hostname)) {
    throw new Error("Unapproved source URL");
  }
  if (!/^jslm_dead_sea_(beach|masada|masada_eingedi)_viator$/.test(item.sub_id)) throw new Error("Invalid page SubID");
}
if (process.argv.includes("--validate")) {
  console.log("Validated " + targets.length + " direct destination URLs for page " + pageId);
  process.exit(0);
}

const token = process.env.TRAVELPAYOUTS_API_TOKEN;
if (!token) throw new Error("TRAVELPAYOUTS_API_TOKEN is not configured as a GitHub Actions secret");

const response = await fetch("https://api.travelpayouts.com/links/v1/create", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "X-Access-Token": token,
  },
  body: JSON.stringify({
    trs: projectId,
    marker: partnerId,
    shorten: true,
    links: targets.map(({ url, sub_id }) => ({ url, sub_id })),
  }),
  signal: AbortSignal.timeout(25000),
  redirect: "error",
});
if (!response.ok) throw new Error("Travelpayouts API failed (HTTP " + response.status + ")");
const payload = await response.json();
const returned = payload?.result?.links;
if (payload.code !== "success" || !Array.isArray(returned) || returned.length !== targets.length) {
  throw new Error("Unexpected Travelpayouts API response format");
}
const results = targets.map(item => {
  const match = returned.find(candidate => candidate.url === item.url);
  if (!match || match.code !== "success" || !match.partner_url) {
    return { ...item, status: "failed", partner_url: null, message: String(match?.message || "Link not generated").slice(0, 160) };
  }
  const parsed = new URL(match.partner_url);
  const allowed = parsed.protocol === "https:"
    && !parsed.username && !parsed.password
    && (parsed.hostname.endsWith(".tpm.li") || parsed.hostname.endsWith(".tp.st")
      || parsed.hostname === "tp.st");
  return { ...item, status: allowed ? "generated_pending_review" : "failed", partner_url: allowed ? parsed.toString() : null };
});
await mkdir("artifacts", { recursive: true });
await writeFile("artifacts/travelpayouts-jerusalem-to-the-dead-sea.json",
  JSON.stringify({ pageId, projectId, partnerId, generatedAt: new Date().toISOString(), results }, null, 2) + "\n");
for (const item of results) if (item.partner_url) console.log("APPROVED_CANDIDATE_LINK " + item.id + " " + item.partner_url);
console.log("Travelpayouts Jerusalem to the Dead Sea: " + results.filter(item => item.partner_url).length
  + "/" + targets.length + " candidate links generated; review artifact before publication");
if (results.some(item => !item.partner_url)) process.exitCode = 1;
