/** Generate page-specific Travelpayouts links for Caesarea, Haifa & Acre tour products. */
import { mkdir, writeFile } from "node:fs/promises";

const projectId = 406243;
const partnerId = 622032;
const links = [
  ["tour-caesarea-haifa-akko-getyourguide", "https://www.getyourguide.com/tel-aviv-l487/israel-s-mediterranean-coast-full-day-tour-from-tel-aviv-t22120/"],
  ["tour-north-coast-small-group-viator", "https://www.viator.com/tours/Tel-Aviv/Caesarea-Haifa-and-Acre-Tiny-group-from-Tel-aviv/d920-58143P8"],
  ["tour-coast-coach-tel-aviv-viator", "https://www.viator.com/tours/Tel-Aviv/Caeserea-Rosh-Hanikra-and-Acre-Day-Trip-from-Tel-Aviv/d920-5209CAESER"],
  ["tour-coast-coach-jerusalem-viator", "https://www.viator.com/tours/Jerusalem/Caeserea-and-Rosh-Hanikra-Day-Trip-from-Jerusalem/d921-5209CAESERJ"],
  ["tour-coast-akko-jerusalem-viator", "https://www.viator.com/tours/Jerusalem/Akko-Nazareth-and-Caesarea-Day-Tour/d921-26254P71"],
  ["tour-coast-private-jerusalem-tel-aviv-viator", "https://www.viator.com/tours/Tel-Aviv/Caesarea-Haifa-and-Acre-Private-Tour-from-Jerusalem/d920-88630P123"],
  ["tour-coast-private-cross-israel-viator", "https://www.viator.com/tours/Tel-Aviv/1-Day-Tel-Aviv-and-Caesarea/d920-101217P9"],
  ["tour-coast-private-rosh-hanikra-viator", "https://www.viator.com/tours/Haifa/Haifa-Walking-City-Tour-from-the-Port-with-the-Licensed-Guide/d4472-368992P3"],
].map(([id, url]) => ({ id, url, sub_id: "tour_northern_coast_" + id.replace(/^tour-/, "").replaceAll("-", "_") }));
for (const { url } of links) {
  const parsed = new URL(url);
  if (parsed.protocol !== "https:" || !["www.viator.com", "www.getyourguide.com"].includes(parsed.hostname) || parsed.username || parsed.password) throw Error("Invalid destination");
}
if (process.argv.includes("--validate")) {
  console.log("Validated " + links.length + " exact Northern coast product links");
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
await writeFile("artifacts/travelpayouts-northern-coast-tours.json", JSON.stringify({ projectId, partnerId, generatedAt: new Date().toISOString(), results }, null, 2) + "\n");
console.log("Northern coast links generated: " + results.filter(x => x.partner_url).length + "/" + results.length);
if (results.some(x => !x.partner_url)) process.exitCode = 1;
