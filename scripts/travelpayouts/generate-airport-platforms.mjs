/** Generate verified airport-platform Travelpayouts links in the secured CI runner.
 * Each page+provider pair gets its own readable SubID; failed programs retain public URLs.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";

const projectId = 406243;
const publisherId = 622032;
const providers = [
  ["kiwitaxi", "https://kiwitaxi.com/en/israel/ben-gurion-airport"],
  ["welcome", "https://www.welcomepickups.com/tel-aviv/"],
  ["intui", "https://en.intui.travel/tel-aviv-ben-gurion-international-airport-transfer/"],
  ["gettransfer", "https://gettransfer.com/en/directions/israel/tel-aviv"],
];
const pages = [
  ["airport-private-transfers", "hub"],
  ["airport-route-jerusalem", "jerusalem"],
  ["airport-route-tel-aviv", "tel_aviv"],
  ["airport-route-haifa", "haifa"],
  ["airport-route-dead-sea", "ein_bokek"],
];
const original = await readFile("src/data/registry.ts", "utf8");
const links = pages.flatMap(([pageId, slug]) =>
  providers.map(([partnerId, url]) => ({
    pageId,
    partnerId,
    url,
    configKey:
      pageId === "airport-private-transfers"
        ? `airport-${partnerId}`
        : `airport-${partnerId}@${pageId}`,
    subId: `airport_${slug}_${partnerId}`,
  })),
);
if (links.length !== 20 || new Set(links.map((x) => x.configKey)).size !== 20)
  throw Error("Duplicate airport affiliate configuration keys");
for (const item of links) {
  const url = new URL(item.url);
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    !original.includes(JSON.stringify(item.url))
  )
    throw Error("Untrusted or changed provider destination: " + item.partnerId);
}
if (process.argv.includes("--validate")) {
  console.log("Validated source URLs for " + links.length + " airport provider/page combinations");
  process.exit(0);
}
const token = process.env.TRAVELPAYOUTS_API_TOKEN;
if (!token) throw Error("Travelpayouts API token is not configured in repository secrets");
const results = [];
for (const item of links) {
  try {
    const response = await fetch("https://api.travelpayouts.com/links/v1/create", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Access-Token": token },
      body: JSON.stringify({
        trs: projectId,
        marker: publisherId,
        shorten: true,
        links: [{ url: item.url, sub_id: item.subId }],
      }),
      signal: AbortSignal.timeout(25000),
      redirect: "error",
    });
    if (!response.ok) {
      console.log(item.configKey + ": API HTTP " + response.status);
      results.push({ ...item, status: "http_" + response.status, trackingUrl: null });
      continue;
    }
    const payload = await response.json();
    const entry = payload?.result?.links?.find((x) => x.url === item.url);
    let trackingUrl = null;
    if (
      payload.code === "success" &&
      entry?.code === "success" &&
      typeof entry.partner_url === "string"
    ) {
      const url = new URL(entry.partner_url);
      if (
        url.protocol === "https:" &&
        !url.username &&
        !url.password &&
        (url.hostname.endsWith(".tpm.li") ||
          url.hostname.endsWith(".tp.st") ||
          url.hostname === "tp.st")
      )
        trackingUrl = url.toString();
    }
    results.push({ ...item, status: trackingUrl ? "generated" : "not_available", trackingUrl });
    console.log(item.configKey + ": " + (trackingUrl ? "generated" : "no usable approved link"));
  } catch (error) {
    results.push({ ...item, status: "request_failed", trackingUrl: null });
    console.log(
      item.configKey +
        ": request failed (" +
        (error instanceof Error ? error.name : "unknown") +
        ")",
    );
  }
}
await mkdir("artifacts", { recursive: true });
await writeFile(
  "artifacts/travelpayouts-airport-platforms.json",
  JSON.stringify({ projectId, publisherId, results }, null, 2) + "\n",
);
console.log(
  "Generated: " +
    results.filter((x) => x.trackingUrl).length +
    "/20, including " +
    results.filter((x) => x.pageId === "airport-private-transfers" && x.trackingUrl).length +
    "/4 hub links",
);
