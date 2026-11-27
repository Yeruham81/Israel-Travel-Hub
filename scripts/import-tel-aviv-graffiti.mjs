/** Import a verified CC BY 4.0 photograph of real Florentin murals. */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
const file = "Graffiti Wall in Florentin street Tel Aviv.jpg";
const headers = {
  "User-Agent": "IsraelTravelHub-Editorial/1.0 (licensed Wikimedia photo attributed on guide)",
};
const api = new URL("https://commons.wikimedia.org/w/api.php");
for (const [k, v] of Object.entries({
  action: "query",
  format: "json",
  titles: "File:" + file,
  prop: "imageinfo",
  iiprop: "url|extmetadata",
  iiurlwidth: "1100",
}))
  api.searchParams.set(k, v);
const result = await fetch(api, { headers, signal: AbortSignal.timeout(30000) });
if (!result.ok) throw Error("Commons metadata HTTP " + result.status);
const page = Object.values((await result.json()).query.pages)[0];
const meta = page?.imageinfo?.[0];
if (!meta) throw Error("Commons file missing");
const plain = (x) =>
  String(x || "")
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
const license = plain(meta.extmetadata?.LicenseShortName?.value);
const author = plain(meta.extmetadata?.Artist?.value);
const licenseUrl = plain(meta.extmetadata?.LicenseUrl?.value);
if (
  license !== "CC BY 4.0" ||
  !author ||
  !licenseUrl.startsWith("https://creativecommons.org/licenses/by/4.0")
)
  throw Error("Unexpected license: " + license + " " + author + " " + licenseUrl);
const url = meta.thumburl || meta.url;
if (!/^https:\/\/(?:upload|thumb)\.wikimedia\.org\//.test(url))
  throw Error("Unknown Commons upload host");
const res = await fetch(url, { headers, signal: AbortSignal.timeout(60000) });
if (!res.ok) throw Error("Photo download status " + res.status);
const bytes = Buffer.from(await res.arrayBuffer());
if (bytes.length < 20000 || bytes.length > 7000000)
  throw Error("Unexpected photo byte size " + bytes.length);
await mkdir(join(process.env.RUNNER_TEMP || "/tmp", "tel-aviv-photo"), { recursive: true });
await writeFile(
  join(process.env.RUNNER_TEMP || "/tmp", "tel-aviv-photo", "florentin-graffiti.jpg"),
  bytes,
);
await writeFile(
  "src/data/telAvivGraffitiPhotoCredit.json",
  JSON.stringify(
    {
      file: "florentin-graffiti.webp",
      author,
      license,
      licenseUrl,
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(file.replaceAll(" ", "_")),
      modification: "Cropped and resized to a 16:9 card image",
    },
    null,
    2,
  ) + "\n",
);
console.log("LICENSE VERIFIED", author, license, bytes.length);
