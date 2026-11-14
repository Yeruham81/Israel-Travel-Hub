/** Generate page-specific Travelpayouts links for Negev and Golan category tours. */
import { mkdir, writeFile } from "node:fs/promises";

const projectId = 406243;
const partnerId = 622032;
const links = [
  ["negev-ramon", "tour-ramon-jeep-adventure-viator", "https://www.viator.com/tours/Sde-Boker/Two-hour-guided-jeep-tour-in-to-and-around-the-Ramon-crater/d29363-107499P1"],
  ["negev-ramon", "tour-ramon-guided-jeep-viator", "https://www.viator.com/tours/Sde-Boker/Ramon-crater-jeep-tour/d29363-13060P1"],
  ["negev-ramon", "tour-ramon-jeep-hiking-viator", "https://www.viator.com/tours/Sde-Boker/One-day-jeep-tour-combined-with-hiking-in-Ramon-crater-in-the-Negev-desert/d29363-13060P3"],
  ["negev-ramon", "tour-ramon-twilight-stars-viator", "https://www.viator.com/tours/Sde-Boker/Twilight-time-Jeep-tour-and-stargazing-and-bonfire-in-Ramon-Crater/d29363-13060P4"],
  ["negev-ramon", "tour-ramon-cliff-rappelling-viator", "https://www.viator.com/tours/Sde-Boker/Rappelling-Down-the-Ramon-Crater-Cliff/d29363-67385P1"],
  ["negev-ramon", "tour-ramon-geology-private-viator", "https://www.viator.com/tours/Sde-Boker/Get-To-Know-the-Ramon-Crater-tour/d29363-67385P3"],
  ["negev-ramon", "tour-ramon-in-depth-viator", "https://www.viator.com/tours/Sde-Boker/In-Depth-Introduction-of-the-Ramon-Crater/d29363-67385P6"],
  ["negev-ramon", "tour-ramon-jeep-rappelling-viator", "https://www.viator.com/tours/Sde-Boker/The-Ramon-Crater-and-rappelling-package-tour-an-exciting-combo-tour/d29363-107499P2"],
  ["golan-heights", "tour-golan-coach-tel-aviv-viator", "https://www.viator.com/tours/Tel-Aviv/Golan-Heights-Day-Trip-from-Tel-Aviv/d920-5209TELGOLAN"],
  ["golan-heights", "tour-golan-coach-jerusalem-viator", "https://www.viator.com/tours/Jerusalem/Golan-Heights-Day-Trip-from-Jerusalem/d921-5209JERGOLAN"],
  ["golan-heights", "tour-golan-click-tel-aviv-viator", "https://www.viator.com/tours/Tel-Aviv/Golan-Heights-Day-Trip-from-Tel-Aviv-Netanya-Herzliya-and-More/d920-88630P25"],
  ["golan-heights", "tour-golan-click-jerusalem-viator", "https://www.viator.com/tours/Tel-Aviv/Golan-Heights-Day-Trip-from-Jerusalem/d920-88630P24"],
  ["golan-heights", "tour-golan-jeep-private-viator", "https://www.viator.com/tours/Galilee/Golan-Heights-private-site-seeing-Jeep-Tour/d24328-176202P1"],
  ["golan-heights", "tour-golan-private-tel-aviv-viator", "https://www.viator.com/tours/Tel-Aviv/Golan-Heights-Private-Tour-from-Tel-Aviv/d920-30489P63"],
  ["golan-heights", "tour-golan-heritage-private-viator", "https://www.viator.com/tours/Tel-Aviv/Private-tour-The-Golan-Heights/d920-239141P5"],
  ["golan-heights", "tour-golan-north-premium-viator", "https://www.viator.com/tours/Tel-Aviv/KEDEM-Premium-Off-Road-North-Golan-Adventure/d920-35509P6"],
].map(([category, id, url]) => ({ category, id, url, sub_id: "tours_" + category.replaceAll("-", "_") + "_" + id.replaceAll("-", "_") }));
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
await writeFile("artifacts/travelpayouts-negev-golan-tours.json", JSON.stringify({ projectId, partnerId, generatedAt: new Date().toISOString(), results }, null, 2) + "\n");
console.log("Negev/Golan links generated: " + results.filter(x => x.partner_url).length + "/" + results.length);
if (results.some(x => !x.partner_url)) process.exitCode = 1;
