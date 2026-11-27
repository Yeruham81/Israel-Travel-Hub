/** Apply only approved Travelpayouts short links that match configured public destinations. */
import { readFile, writeFile } from "node:fs/promises";
import { registry, setTracking } from "./registry-source.mjs";
const data = JSON.parse(await readFile("artifacts/travelpayouts-airport-platforms.json", "utf8"));
if (
  data.projectId !== 406243 ||
  data.publisherId !== 622032 ||
  !Array.isArray(data.results) ||
  data.results.length !== 20
)
  throw Error("Missing or mismatched Travelpayouts result set");
const filename = "src/data/registry.ts";
let contents = await readFile(filename, "utf8");
const replacements = new Map();
for (const item of data.results) {
  const { partnerId, pageId, configKey, url, trackingUrl, status } = item;
  if (
    !["kiwitaxi", "welcome", "intui", "gettransfer"].includes(partnerId) ||
    ![
      "airport-private-transfers",
      "airport-route-jerusalem",
      "airport-route-tel-aviv",
      "airport-route-haifa",
      "airport-route-dead-sea",
    ].includes(pageId)
  )
    throw Error("Unexpected airport provider/page");
  const expected =
    pageId === "airport-private-transfers"
      ? `airport-${partnerId}`
      : `airport-${partnerId}@${pageId}`;
  if (
    configKey !== expected ||
    replacements.has(configKey) ||
    !registry(contents).airport(partnerId, url)
  )
    throw Error("Unexpected affiliate source or duplicate");
  if (status === "generated") {
    if (
      typeof trackingUrl !== "string" ||
      !/^https:\/\/[a-z0-9.-]+\.(?:tpm\.li|tp\.st)\/[a-zA-Z0-9]+\/?(?:\?[^\s]*)?$/.test(trackingUrl)
    )
      throw Error("Invalid tracking domain: " + configKey);
    replacements.set(configKey, trackingUrl);
  } else replacements.set(configKey, null);
}
for (const [key, url] of replacements) {
  if (!url) continue;
  contents = setTracking(contents, key, url, {
    allowInsert: key.includes("@"),
    allowReplace: key.includes("@"),
  });
}
await writeFile(filename, contents, "utf8");
console.log(
  "Staged " +
    [...replacements.values()].filter(Boolean).length +
    " Travelpayouts airport tracking URLs (failed programs retain their public URLs).",
);
