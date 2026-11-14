/** Generate page-specific Travelpayouts links for Bethlehem–Jericho–Qasr al-Yahud tour products. */
import { mkdir, writeFile } from "node:fs/promises";

const projectId = 406243;
const partnerId = 622032;
const links = [
  ["tour-jerusalem-bethlehem-private-getyourguide", "https://www.getyourguide.com/jerusalem-l97/jerusalem-and-bethlehem-private-tour-t411126/"],
  ["tour-jerusalem-bethlehem-shared-getyourguide", "https://www.getyourguide.com/tel-aviv-l487/jerusalem-and-bethlehem-full-day-trip-from-tel-aviv-t22202/"],
  ["tour-bethlehem-jericho-jordan-viator", "https://www.viator.com/tours/Jerusalem/Bethlehem-and-Jericho-Full-Day-Tour-from-Jerusalem-and-Tel-Aviv/d921-115730P10"],
  ["tour-bethlehem-halfday-jerusalem-getyourguide", "https://www.getyourguide.com/jerusalem-l97/from-jerusalem-half-day-bethlehem-guided-tour-t213663/"],
  ["tour-bethlehem-private-halfday-viator", "https://www.viator.com/tours/Jerusalem/Bethlehem-Half-Day-Private-Tour-Free-Hotel-Pick-up-and-Drop-Off-from-Tel-Aviv/d921-115730P7"],
  ["tour-bethlehem-jericho-qasr-small-group-viator", "https://www.viator.com/tours/Jerusalem/Bethlehem-Jericho-and-Jordan-River/d921-421804P3"],
  ["tour-bethlehem-jericho-qasr-tel-aviv-viator", "https://www.viator.com/tours/Tel-Aviv/Bethlehem-and-Jericho-Day-Trip-from-Tel-Aviv/d920-5209TEL214"],
  ["tour-bethlehem-qasr-dead-sea-viator", "https://www.viator.com/tours/Jerusalem/Day-tour-to-Bethlehem-Jericho-Jordan-River-Qasr-al-Yahud-and-the-Dead-Sea/d921-152120P56"],
].map(([id, url]) => ({ id, url, sub_id: "tour_bethlehem_" + id.replace(/^tour-/, "").replaceAll("-", "_") }));
for (const { url } of links) {
  const parsed = new URL(url);
  if (parsed.protocol !== "https:" || !["www.viator.com", "www.getyourguide.com"].includes(parsed.hostname) || parsed.username || parsed.password) throw Error("Invalid destination");
}
if (process.argv.includes("--validate")) {
  console.log("Validated " + links.length + " exact Bethlehem product links");
  process.exit(0);
}
const token = process.env.TRAVELPAYOUTS_API_TOKEN;
if (!token) throw Error("Protected Travelpayouts API token missing");
const results = [];
for (const item of links) {
  try {
    const response = await fetch("https://api.travelpayouts.com/links/v1/create", {
      method: "POST", headers: { "Content-Type": "application/json", "X-Access-Token": token },
      body: JSON.stringify({ trs: projectId, marker: partnerId, shorten: true, links: [{ url: item.url, sub_id: item.sub_id }] }),
      redirect: "error", signal: AbortSignal.timeout(25000)
    });
    if (!response.ok) {
      console.error(item.id + ": API HTTP " + response.status);
      results.push({ ...item, status: "failed_http_" + response.status, partner_url: null });
      continue;
    }
    const payload = await response.json();
    const entry = payload?.result?.links?.find(x => x.url === item.url);
    const candidate = entry?.partner_url;
    let trackingUrl = null;
    if (payload.code === "success" && entry?.code === "success" && typeof candidate === "string") {
      const parsed = new URL(candidate);
      if (parsed.protocol === "https:" && (parsed.hostname.endsWith(".tpm.li") || parsed.hostname.endsWith(".tp.st") || parsed.hostname === "tp.st")) trackingUrl = parsed.toString();
    }
    results.push({ ...item, status: trackingUrl ? "generated_pending_review" : "failed_invalid_response", partner_url: trackingUrl });
    console.log(item.id + ": " + (trackingUrl ? "generated" : "no usable link"));
  } catch (error) {
    console.error(item.id + ": generation exception " + (error instanceof Error ? error.name : "unknown"));
    results.push({ ...item, status: "failed_exception", partner_url: null });
  }
}
await mkdir("artifacts", { recursive: true });
await writeFile("artifacts/travelpayouts-bethlehem-category-tours.json", JSON.stringify({ projectId, partnerId, generatedAt: new Date().toISOString(), results }, null, 2) + "\n");
console.log("Bethlehem links generated: " + results.filter(x => x.partner_url).length + "/" + results.length);
if (results.some(x => !x.partner_url)) process.exitCode = 1;
