/** Generate page-specific Travelpayouts links for Nazareth & Sea of Galilee tour products. */
import { mkdir, writeFile } from "node:fs/promises";

const projectId = 406243;
const partnerId = 622032;
const links = [
  ["tour-nazareth-galilee-tel-aviv-getyourguide", "https://www.getyourguide.com/tel-aviv-l487/jerusalem-nazareth-tiberias-and-sea-of-galilee-tour-t21581/"],
  ["tour-galilee-nazareth-jordan-viator", "https://www.viator.com/tours/Tel-Aviv/Highlights-Around-the-Sea-of-Galilee-Tour/d920-26254P72"],
  ["tour-nazareth-galilee-jerusalem-viator", "https://www.viator.com/tours/Jerusalem/Nazareth-Tiberias-and-the-Sea-of-Galilee-Day-Trip-from-Jerusalem/d921-5209NAZAJ"],
  ["tour-galilee-christian-jerusalem-viator", "https://www.viator.com/tours/Jerusalem/Nazareth-Mount-Tabor-Sea-of-Galilee/d921-6803P4"],
  ["tour-nazareth-tiberias-tel-aviv-viator", "https://www.viator.com/tours/Tel-Aviv/Nazareth-Tiberias-and-the-Sea-of-Galilee-Day-Trip-from-Tel-Aviv/d920-88630P11"],
  ["tour-galilee-private-tel-aviv-viator", "https://www.viator.com/tours/Tel-Aviv/Private-Tour-Nazareth-Tiberias-and-Sea-of-Galilee-Day-Trip-from-Tel-Aviv/d920-5209PRVNAZAT"],
  ["tour-galilee-private-jerusalem-viator", "https://www.viator.com/tours/Jerusalem/Private-Tour-Nazareth-Tiberias-and-Sea-of-Galilee-Day-Trip-from-Jerusalem/d921-5209PRVNAZAJ"],
  ["tour-nazareth-magdala-private-viator", "https://www.viator.com/tours/Tel-Aviv/Nazareth-Tiberias-and-the-Sea-of-Galilee/d920-29414P6"],
].map(([id, url]) => ({ id, url, sub_id: "tour_nazareth_galilee_" + id.replace(/^tour-/, "").replaceAll("-", "_") }));
for (const { url } of links) {
  const parsed = new URL(url);
  if (parsed.protocol !== "https:" || !["www.viator.com", "www.getyourguide.com"].includes(parsed.hostname) || parsed.username || parsed.password) throw Error("Invalid destination");
}
if (process.argv.includes("--validate")) {
  console.log("Validated " + links.length + " exact Galilee product links");
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
await writeFile("artifacts/travelpayouts-galilee-tours.json", JSON.stringify({ projectId, partnerId, generatedAt: new Date().toISOString(), results }, null, 2) + "\n");
console.log("Galilee links generated: " + results.filter(x => x.partner_url).length + "/" + results.length);
if (results.some(x => !x.partner_url)) process.exitCode = 1;
