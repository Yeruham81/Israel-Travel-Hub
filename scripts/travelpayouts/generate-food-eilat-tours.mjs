/** Generate source-page-specific Travelpayouts links for Food & Market and Eilat tours.
 * Candidate output is for review only; never silently overwrite public booking URLs.
 */
import { mkdir, writeFile } from "node:fs/promises";
const projectId = 406243;
const partnerId = 622032;
const links = [
  ["food-markets", "tour-jerusalem-beyond-walls-viator", "https://www.viator.com/tours/Jerusalem/Beyond-the-Walls/d921-41304P1"],
  ["food-markets", "tour-jaffa-carmel-walk-getyourguide", "https://www.getyourguide.com/tel-aviv-l487/tel-aviv-urban-tour-architecture-food-street-art-t203290/"],
  ["food-markets", "tour-carmel-market-food-tour-viator", "https://www.viator.com/tours/Tel-Aviv/Market-tour-and-Israeli-cooking-workshop/d920-198140P1"],
  ["food-markets", "tour-mahane-yehuda-tasting-viator", "https://www.viator.com/tours/Jerusalem/Mahane-Yehuda-Market-Tasting-Tour/d921-6540P10"],
  ["food-markets", "tour-levinsky-market-tasting-viator", "https://www.viator.com/tours/Tel-Aviv/Levinsky-Market-Tasting-Tour/d920-58980P5"],
  ["food-markets", "tour-jerusalem-private-market-food-viator", "https://www.viator.com/tours/Jerusalem/Private-Jerusalems-market-Culinary-Tour/d921-268670P2"],
  ["food-markets", "tour-jerusalem-market-food-walk-viator", "https://www.viator.com/tours/Jerusalem/Mahane-Yehuda-Market-Food-Tour-Taste-Jerusalems-Flavors/d921-5677355P3"],
  ["food-markets", "tour-carmel-market-cooking-viator", "https://www.viator.com/tours/Tel-Aviv/Jons-Carmel-Market-Cooking-Class-and-Food-Tour/d920-129348P1"],
  ["eilat-red-sea", "tour-eilat-glass-bottom-boat-getyourguide", "https://www.getyourguide.com/eilat-l2663/eilat-2-hour-glass-bottom-boat-tour-t373525/"],
  ["eilat-red-sea", "tour-eilat-snorkeling-viator", "https://www.viator.com/tours/Eilat/Snorkeling-on-Coral-Reef-in-Eilat/d23242-70978P8"],
  ["eilat-red-sea", "tour-eilat-red-mountains-sea-viator", "https://www.viator.com/tours/Eilat/Red-Mountains-To-Red-Sea/d23242-6540P49"],
  ["eilat-red-sea", "tour-eilat-timna-jeep-viator", "https://www.viator.com/tours/Eilat/Timna-park-Jeep-tour-adventure/d23242-104982P2"],
  ["eilat-red-sea", "tour-eilat-red-canyon-jeep-viator", "https://www.viator.com/tours/Eilat/Red-canyon-jeep-tour-in-Eilat/d23242-104982P4"],
  ["eilat-red-sea", "tour-eilat-mountains-jeep-viator", "https://www.viator.com/tours/Eilat/Jeep-tour-adventure-Eilat-mountains/d23242-104982P1"],
  ["eilat-red-sea", "tour-eilat-morning-jeep-viator", "https://www.viator.com/tours/Eilat/Morning-jeep-tour-in-Eilat-mountains/d23242-104982P3"],
  ["eilat-red-sea", "tour-eilat-private-red-canyon-viator", "https://www.viator.com/tours/Eilat/Unforgettable-Jeep-and-Hiking-Red-Canyon-Tour/d23242-431991P1"],
].map(([category, id, url]) => ({ category, id, url, config_key: id + "@tours-" + category, sub_id: "tours_" + category.replaceAll("-", "_") + "_" + id.replaceAll("-", "_") }));
if (links.length !== 16 || new Set(links.map(x => x.config_key)).size !== links.length) throw Error("Missing or duplicate tour offers");
for (const { url } of links) {
  const parsed = new URL(url);
  if (parsed.protocol !== "https:" || !["www.viator.com", "www.getyourguide.com"].includes(parsed.hostname) || parsed.username || parsed.password) throw Error("Invalid product URL");
}
if (process.argv.includes("--validate")) {
  console.log("Validated " + links.length + " exact food and Eilat tour product URLs");
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
      if (parsed.protocol === "https:" && !parsed.username && !parsed.password && (parsed.hostname.endsWith(".tpm.li") || parsed.hostname.endsWith(".tp.st") || parsed.hostname === "tp.st")) trackingUrl = parsed.toString();
    }
    results.push({ ...item, status: trackingUrl ? "generated_pending_review" : "failed_invalid_response", partner_url: trackingUrl });
    console.log(item.id + ": " + (trackingUrl ? "generated" : "no usable link"));
  } catch (error) {
    console.error(item.id + ": " + (error instanceof Error ? error.name : "unknown"));
    results.push({ ...item, status: "failed_exception", partner_url: null });
  }
}
await mkdir("artifacts", { recursive: true });
await writeFile("artifacts/travelpayouts-food-eilat-tours.json", JSON.stringify({ projectId, partnerId, generatedAt: new Date().toISOString(), results }, null, 2) + "\n");
console.log("Food/Eilat links generated: " + results.filter(x => x.partner_url).length + "/" + results.length);
if (results.some(x => !x.partner_url)) process.exitCode = 1;
