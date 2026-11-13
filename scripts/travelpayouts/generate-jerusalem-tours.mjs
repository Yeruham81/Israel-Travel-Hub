/** Generate Jerusalem tour partner-link candidates without exposing credentials. */
import { mkdir, writeFile } from "node:fs/promises";

const projectId = 406243;
const partnerId = 622032;
const links = [
  ["tour-jerusalem-old-city-walk-viator", "https://www.viator.com/tours/Jerusalem/Old-Jerusalem-Holy-City-Tour/d921-6540P86"],
  ["tour-jerusalem-private-oldcity-walk-viator", "https://www.viator.com/tours/Jerusalem/Jerusalem-Walking-Tour/d921-254618P1"],
  ["tour-jerusalem-beyond-walls-viator", "https://www.viator.com/tours/Jerusalem/Beyond-the-Walls/d921-41304P1"],
  ["tour-jerusalem-day-tel-aviv-viator", "https://www.viator.com/tours/Tel-Aviv/Old-and-New-Jerusalem-Day-Trip-from-Tel-Aviv/d920-5209TEL211"],
  ["tour-jerusalem-bethlehem-private-getyourguide", "https://www.getyourguide.com/jerusalem-l97/jerusalem-and-bethlehem-private-tour-t411126/"],
  ["tour-jerusalem-bethlehem-shared-getyourguide", "https://www.getyourguide.com/tel-aviv-l487/jerusalem-and-bethlehem-full-day-trip-from-tel-aviv-t22202/"],
  ["tour-mahane-yehuda-tasting-viator", "https://www.viator.com/tours/Jerusalem/Mahane-Yehuda-Market-Tasting-Tour/d921-6540P10"]
].map(([id, url]) => ({ id, url, sub_id: "tour_jerusalem_" + id.replace(/^tour-/, "").replaceAll("-", "_") }));
for (const item of links) {
  const url = new URL(item.url);
  if (url.protocol !== "https:" || !["www.viator.com", "www.getyourguide.com"].includes(url.hostname) || url.username || url.password) throw Error("Invalid product URL");
}
if (process.argv.includes("--validate")) {
  console.log("Validated " + links.length + " Jerusalem tour destinations");
  process.exit(0);
}
const token = process.env.TRAVELPAYOUTS_API_TOKEN;
if (!token) throw Error("Protected Travelpayouts API token is not configured");
const response = await fetch("https://api.travelpayouts.com/links/v1/create", {
  method: "POST",
  headers: { "Content-Type": "application/json", "X-Access-Token": token },
  body: JSON.stringify({ trs: projectId, marker: partnerId, shorten: true, links: links.map(({ url, sub_id }) => ({ url, sub_id })) }),
  signal: AbortSignal.timeout(25000),
  redirect: "error"
});
if (!response.ok) throw Error("API HTTP " + response.status);
const payload = await response.json();
if (payload.code !== "success" || !Array.isArray(payload.result?.links)) throw Error("Unexpected API response");
const results = links.map(item => {
  const entry = payload.result.links.find(x => x.url === item.url);
  let link = null;
  try {
    const parsed = new URL(entry.partner_url);
    if (entry.code === "success" && parsed.protocol === "https:" && (parsed.hostname.endsWith(".tpm.li") || parsed.hostname.endsWith(".tp.st") || parsed.hostname === "tp.st")) link = parsed.toString();
  } catch {}
  return { ...item, status: link ? "generated_pending_review" : "failed", partner_url: link };
});
await mkdir("artifacts", { recursive: true });
await writeFile("artifacts/travelpayouts-jerusalem-tours.json", JSON.stringify({ projectId, partnerId, generatedAt: new Date().toISOString(), results }, null, 2) + "\n");
console.log("Jerusalem tour links generated: " + results.filter(x => x.partner_url).length + "/" + results.length);
if (results.some(x => !x.partner_url)) process.exitCode = 1;
