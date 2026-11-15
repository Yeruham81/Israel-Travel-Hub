/**
 * Generate a GigSky Israel deep link through the existing Travelpayouts API
 * secret, preserving publisher/project tracking and a guide-specific SubID.
 * No secret is written to source, logs or artifacts.
 */
import { mkdir, writeFile } from "node:fs/promises";

const token = process.env.TRAVELPAYOUTS_API_TOKEN;
if (!token) throw new Error("Missing TRAVELPAYOUTS_API_TOKEN GitHub Actions secret");

const target = "https://www.gigsky.com/country/esim-in-israel";
const subId = "itt_best_esim_israel_gigsky";
const response = await fetch("https://api.travelpayouts.com/links/v1/create", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Access-Token": token,
  },
  body: JSON.stringify({
    trs: 406243,
    marker: 622032,
    shorten: true,
    links: [{ url: target, sub_id: subId }],
  }),
  signal: AbortSignal.timeout(20000),
  redirect: "error",
});
if (!response.ok) throw new Error("Travelpayouts API HTTP " + response.status);
const payload = await response.json();
const result = payload?.result?.links?.[0];
if (payload?.code !== "success" || result?.code !== "success" ||
    result?.url !== target || typeof result.partner_url !== "string") {
  throw new Error("GigSky destination link was not generated: " +
    String(result?.message ?? payload?.code ?? "unknown").slice(0, 200));
}
const parsed = new URL(result.partner_url);
if (parsed.protocol !== "https:" || parsed.username || parsed.password ||
    !["tp.st", "tpm.li"].includes(parsed.hostname) &&
    !parsed.hostname.endsWith(".tp.st") &&
    !parsed.hostname.endsWith(".tpm.li")) {
  throw new Error("Travelpayouts did not return a trusted link domain");
}
await mkdir("artifacts", { recursive: true });
await writeFile("artifacts/gigsky-israel-link.json", JSON.stringify({
  target, partner_id: 622032, project_id: 406243, sub_id: subId,
  affiliate_url: parsed.toString(),
}, null, 2) + "\n");
console.log("Travelpayouts GigSky Israel deep link generated for review.");
