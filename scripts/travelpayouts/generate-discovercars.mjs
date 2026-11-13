/**
 * Generate a verified DiscoverCars Israel Travelpayouts deep link using the
 * existing GitHub Actions secret; never embed tokens in source or logs.
 * One generated short URL can carry different ?sub_id= values per source page.
 */
import { mkdir, writeFile } from "node:fs/promises";

const token = process.env.TRAVELPAYOUTS_API_TOKEN;
if (!token) throw new Error("Missing TRAVELPAYOUTS_API_TOKEN GitHub Actions secret");
const target = "https://www.discovercars.com/israel";
const body = {
  trs: 406243,
  marker: 622032,
  shorten: true,
  links: [{ url: target, sub_id: "itt_car_base" }],
};
const response = await fetch("https://api.travelpayouts.com/links/v1/create", {
  method: "POST",
  headers: { "Content-Type": "application/json", Accept: "application/json", "X-Access-Token": token },
  body: JSON.stringify(body),
  signal: AbortSignal.timeout(20000),
  redirect: "error",
});
if (!response.ok) throw new Error("Travelpayouts API HTTP " + response.status);
const payload = await response.json();
const result = payload?.result?.links?.[0];
if (payload?.code !== "success" || result?.code !== "success" || typeof result.partner_url !== "string") {
  throw new Error("Cannot generate DiscoverCars affiliate link: " + String(result?.message ?? payload?.code ?? "unknown").slice(0, 200));
}
const parsed = new URL(result.partner_url);
if (parsed.protocol !== "https:" || parsed.username || parsed.password ||
    !["tp.st", "tpm.li"].includes(parsed.hostname) &&
    !parsed.hostname.endsWith(".tp.st") && !parsed.hostname.endsWith(".tpm.li")) {
  throw new Error("Travelpayouts did not return an approved short-link domain");
}
await mkdir("artifacts", { recursive: true });
await writeFile("artifacts/discovercars-israel-link.json",
  JSON.stringify({ target, partner_id: 622032, project_id: 406243,
    affiliate_url: parsed.toString(), sub_id: "itt_car_base" }, null, 2) + "\n");
console.log("VERIFIED_DISCOVERCARS_ISRAEL_LINK=" + parsed.toString());
