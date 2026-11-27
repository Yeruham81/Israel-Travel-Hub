/** Apply only approved Travelpayouts short links that match configured public destinations. */
import { readFile, writeFile } from "node:fs/promises";
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
    !contents.includes(JSON.stringify(url))
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
for (const partnerId of ["kiwitaxi", "welcome", "intui", "gettransfer"]) {
  const key = `airport-${partnerId}`;
  const trackingUrl = replacements.get(key);
  if (trackingUrl) {
    const needle = `"${key}": undefined,`;
    if (!contents.includes(needle)) throw Error("Global affiliate placeholder changed: " + key);
    contents = contents.replace(needle, `"${key}": { trackingUrl: "${trackingUrl}" },`);
  }
}
const begin = "  // BEGIN Travelpayouts airport route-specific links";
const end = "  // END Travelpayouts airport route-specific links";
const lines = [...replacements]
  .filter(([key, url]) => key.includes("@") && url)
  .map(([key, url]) => `  "${key}": { trackingUrl: "${url}" },`);
const block = begin + "\n" + lines.join("\n") + "\n" + end + "\n";
if (contents.includes(begin)) {
  const start = contents.indexOf(begin);
  const finish = contents.indexOf(end, start);
  if (finish < 0) throw Error("Truncated route affiliate block");
  contents = contents.slice(0, start) + block + contents.slice(finish + end.length + 1);
} else {
  const anchor = '  "ashdod-shore-beinharim": undefined,';
  if (!contents.includes(anchor)) throw Error("Airport affiliate anchor moved");
  contents = contents.replace(anchor, block + anchor);
}
await writeFile(filename, contents, "utf8");
console.log(
  "Staged " +
    [...replacements.values()].filter(Boolean).length +
    " Travelpayouts airport tracking URLs (failed programs retain their public URLs).",
);
