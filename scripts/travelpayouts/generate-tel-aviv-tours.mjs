/** Generate page-specific Travelpayouts links for Tel Aviv–Jaffa tour products. */
import { mkdir, writeFile } from "node:fs/promises";

const projectId = 406243;
const partnerId = 622032;
const links = [
  ["tour-jaffa-carmel-walk-getyourguide", "https://www.getyourguide.com/tel-aviv-l487/tel-aviv-urban-tour-architecture-food-street-art-t203290/"],
  ["tour-tel-aviv-street-art-viator", "https://www.viator.com/tours/Tel-Aviv/Tel-Aviv-Street-Art-and-Graffiti-Tour/d920-58980P2"],
  ["tour-old-jaffa-walk-viator", "https://www.viator.com/tours/Tel-Aviv/Tel-Aviv-Yaffo-Flea-Market-Shuk-Hapishpishim-and-Tel-Aviv-Skyline/d920-15081P474"],
  ["tour-neve-tzedek-walk-getyourguide", "https://www.getyourguide.com/tel-aviv-l487/tel-aviv-neve-tzedek-cultural-walking-tour-t503440/"],
  ["tour-carmel-market-food-tour-viator", "https://www.viator.com/tours/Tel-Aviv/Market-tour-and-Israeli-cooking-workshop/d920-198140P1"],
  ["tour-tel-aviv-cycling-viator", "https://www.viator.com/tours/Tel-Aviv/Tel-Aviv-Cycling-Tour/d920-6540P25"],
  ["tour-white-city-audio-viator", "https://www.viator.com/tours/Tel-Aviv/The-White-City-Delve-into-the-history-of-the-Bauhaus-style-on-an-audio-walk/d920-110804P229"],
  ["tour-tel-aviv-jaffa-small-group-viator", "https://www.viator.com/tours/Tel-Aviv/Tel-Aviv-and-Old-City-of-Jaffa-Tiny-group-from-Tel-Aviv/d920-58143P11"],
].map(([id, url]) => ({ id, url, sub_id: "tour_tel_aviv_" + id.replace(/^tour-/, "").replaceAll("-", "_") }));
for (const { url } of links) {
  const parsed = new URL(url);
  if (parsed.protocol !== "https:" || !["www.viator.com", "www.getyourguide.com"].includes(parsed.hostname) || parsed.username || parsed.password) throw Error("Invalid destination");
}
if (process.argv.includes("--validate")) {
  console.log("Validated " + links.length + " exact Tel Aviv product links");
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
await writeFile("artifacts/travelpayouts-tel-aviv-tours.json", JSON.stringify({ projectId, partnerId, generatedAt: new Date().toISOString(), results }, null, 2) + "\n");
console.log("Tel Aviv links generated: " + results.filter(x => x.partner_url).length + "/" + results.length);
if (results.some(x => !x.partner_url)) process.exitCode = 1;
