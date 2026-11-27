import { mkdir, readFile, writeFile } from "node:fs/promises";
import { registry } from "./registry-source.mjs";
// Protected Travelpayouts API is the sole source of affiliate short URLs.
const projectId = 406243,
  publisherId = 622032;
const ids = [
  "shore-gyg-haifa-akko",
  "shore-gyg-haifa-galilee",
  "shore-gyg-ashdod-jerusalem-bethlehem",
  "shore-gyg-ashdod-galilee",
  "shore-gyg-ashdod-masada",
  "shore-viator-haifa-galilee",
  "shore-viator-ashdod-jerusalem-dead-sea",
  "shore-viator-haifa-jerusalem-bethlehem",
  "shore-viator-ashdod-jerusalem-bethlehem",
  "shore-viator-ashdod-jerusalem-bethlehem-smallgroup",
  "shore-viator-ashdod-jerusalem-private",
  "shore-viator-haifa-jerusalem-bethlehem-smallgroup",
  "shore-viator-haifa-jerusalem-private",
  "shore-viator-haifa-caesarea-private",
  "shore-viator-haifa-galilee-private",
  "shore-viator-haifa-akko-private",
  "shore-viator-ashdod-masada-dead-sea",
  "shore-viator-haifa-jerusalem-holy-city",
];
const catalog = registry(await readFile("src/data/registry.ts", "utf8"));
const records = ids.map((id) => {
  const platform = id.startsWith("shore-gyg-") ? "getyourguide" : "viator";
  const product = catalog.shore(id);
  if (!product.url || product.platform !== platform) throw Error("Product/platform mismatch " + id);
  const url = new URL(product.url);
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.hostname !== "www." + (platform === "viator" ? "viator.com" : "getyourguide.com")
  )
    throw Error("Invalid source URL " + id);
  const state = catalog.tracking(id).state;
  if (state === "missing") throw Error("Tracking configuration missing " + id);
  const pending = state === "pending";
  return {
    id,
    url: url.href,
    platform,
    subId: "shore_" + id.replace(/^shore-/, "").replaceAll("-", "_"),
    pending,
  };
});
if (records.length !== 18 || new Set(records.map((x) => x.subId)).size !== 18)
  throw Error("Duplicate tracking IDs");
if (process.argv.includes("--validate")) {
  console.log("Validated " + records.length + " shore product targets");
  process.exit(0);
}
const token = process.env.TRAVELPAYOUTS_API_TOKEN;
if (!token && records.some((item) => item.pending))
  throw Error("Missing protected TRAVELPAYOUTS_API_TOKEN");
const results = [];
for (const item of records) {
  if (!item.pending) {
    results.push({ ...item, trackingUrl: null, status: "already_configured" });
    continue;
  }
  let trackingUrl = null,
    status = "failed";
  try {
    const response = await fetch("https://api.travelpayouts.com/links/v1/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Access-Token": token,
      },
      body: JSON.stringify({
        trs: projectId,
        marker: publisherId,
        shorten: true,
        links: [{ url: item.url, sub_id: item.subId }],
      }),
      signal: AbortSignal.timeout(25000),
      redirect: "error",
    });
    if (response.ok) {
      const payload = await response.json();
      const link = payload?.result?.links?.find((entry) => entry.url === item.url);
      if (
        payload.code === "success" &&
        link?.code === "success" &&
        typeof link.partner_url === "string"
      ) {
        const approved = new URL(link.partner_url);
        const brand = (item.platform === "viator" ? "viator" : "getyourguide") + ".tpm.li";
        if (
          approved.protocol === "https:" &&
          !approved.username &&
          !approved.password &&
          (approved.hostname === brand || approved.hostname === "tp.st") &&
          /^\/[a-zA-Z0-9]+\/?$/.test(approved.pathname)
        ) {
          trackingUrl = approved.href;
          status = "generated";
        }
      }
    } else status = "http_" + response.status;
  } catch {
    status = "request_failed";
  }
  results.push({ ...item, trackingUrl, status });
  console.log(item.id + ": " + status);
}
await mkdir("artifacts", { recursive: true });
await writeFile(
  "artifacts/travelpayouts-shore-excursions.json",
  JSON.stringify({ projectId, publisherId, results }, null, 2) + "\n",
);
console.log("Approved " + results.filter((item) => item.trackingUrl).length + "/" + records.length);
if (results.some((item) => item.pending && !item.trackingUrl)) process.exitCode = 1;
