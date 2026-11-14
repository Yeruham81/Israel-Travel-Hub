/** Generate page-specific Travelpayouts links for Masada–Dead Sea tour products. */
import { mkdir, writeFile } from "node:fs/promises";

const projectId = 406243;
const partnerId = 622032;
const links = [
  ["tour-masada-dead-sea-tel-aviv-getyourguide", "https://www.getyourguide.com/tel-aviv-l487/masada-the-dead-sea-full-day-tour-from-tel-aviv-t21580/"],
  ["tour-masada-ein-gedi-dead-sea-getyourguide", "https://www.getyourguide.com/tel-aviv-l487/masada-ein-gedi-and-dead-sea-day-trip-from-tel-aviv-t195356/"],
  ["tour-masada-dead-sea-jerusalem-viator", "https://www.viator.com/tours/Jerusalem/Masada-and-the-Dead-Sea-Day-Trip-from-Jerusalem/d921-5209MASDSJ"],
  ["tour-masada-ein-gedi-jerusalem-viator", "https://www.viator.com/tours/Jerusalem/Masada-Ein-Gedi-Dead-Sea-and-Jericho-Tour-from-Tel-Aviv/d921-26254P7"],
  ["tour-masada-sunrise-tel-aviv-viator", "https://www.viator.com/tours/Tel-Aviv/Masada-Sunrise-Ein-Gedi-Dead-Sea/d920-26254P4"],
  ["tour-masada-sunrise-jerusalem-viator", "https://www.viator.com/tours/Jerusalem/Masada-Sunrise-Ein-Gedi-and-Dead-Sea-Tour-from-Jerusalem/d921-26254P6"],
  ["tour-dead-sea-relax-tel-aviv-viator", "https://www.viator.com/tours/Tel-Aviv/Dead-Sea-Spa-and-Wellness-Trip-from-Tel-Aviv/d920-5209SEAHEALTH"],
  ["tour-dead-sea-relax-jerusalem-viator", "https://www.viator.com/tours/Jerusalem/Dead-Sea-Spa-and-Wellness-Trip-from-Jerusalem/d921-5209SEAHEALTHJ"],
].map(([id, url]) => ({ id, url, sub_id: "tour_masada_" + id.replace(/^tour-/, "").replaceAll("-", "_") }));
for (const { url } of links) {
  const parsed = new URL(url);
  if (parsed.protocol !== "https:" || !["www.viator.com", "www.getyourguide.com"].includes(parsed.hostname) || parsed.username || parsed.password) throw Error("Invalid destination");
}
if (process.argv.includes("--validate")) {
  console.log("Validated " + links.length + " exact Masada product links");
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
await writeFile("artifacts/travelpayouts-masada-tours.json", JSON.stringify({ projectId, partnerId, generatedAt: new Date().toISOString(), results }, null, 2) + "\n");
console.log("Masada links generated: " + results.filter(x => x.partner_url).length + "/" + results.length);
if (results.some(x => !x.partner_url)) process.exitCode = 1;
