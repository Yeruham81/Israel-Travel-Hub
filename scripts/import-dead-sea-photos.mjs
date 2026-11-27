/**
 * One-off import of exact Wikimedia Commons photographs used in the Dead Sea
 * attractions guide. Fails closed on unsupported license metadata.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const assets = [
  { id: "nahal-bokek", file: "PikiWiki Israel 38606 Bokek spring.JPG" },
  {
    id: "einot-tsukim",
    file: "PikiWiki Israel 34298 Spring poll in Eint Tsukim (Ein Feshkha).JPG",
  },
  { id: "novomeysky", file: "130605 moshe novomeysky visitor center dead sea PikiWiki Israel.jpg" },
];
const headers = {
  "User-Agent":
    "IsraelTravelHub-Editorial/1.0 (Wikimedia Commons photo reuse, license attribution in guide)",
};
const destination = "public/images/dead-sea-attractions";
const temp = join(process.env.RUNNER_TEMP || "/tmp", "dead-sea-attractions");
await mkdir(destination, { recursive: true });
await mkdir(temp, { recursive: true });
const credits = [];
const plain = (value) =>
  String(value || "")
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
for (const asset of assets) {
  const api = new URL("https://commons.wikimedia.org/w/api.php");
  api.searchParams.set("action", "query");
  api.searchParams.set("format", "json");
  api.searchParams.set("titles", "File:" + asset.file);
  api.searchParams.set("prop", "imageinfo");
  api.searchParams.set("iiprop", "url|extmetadata");
  api.searchParams.set("iiurlwidth", "1200");
  const response = await fetch(api, { headers, signal: AbortSignal.timeout(30000) });
  if (!response.ok)
    throw Error("Commons image metadata HTTP " + response.status + " for " + asset.id);
  const json = await response.json();
  const page = Object.values(json.query?.pages || {})[0];
  const info = page?.imageinfo?.[0];
  if (!info) throw Error("Missing Commons image " + asset.file);
  const license = plain(info.extmetadata?.LicenseShortName?.value);
  if (!/^(Public domain|CC0(?: 1\.0)?|CC BY(?:-SA)? (?:2\.0|2\.5|3\.0|4\.0))$/i.test(license)) {
    throw Error("Unsupported photo license " + asset.id + ": " + license);
  }
  const author = plain(info.extmetadata?.Artist?.value || info.extmetadata?.Attribution?.value);
  if (!author) throw Error("Missing Commons photo attribution " + asset.id);
  const licenseUrl =
    plain(info.extmetadata?.LicenseUrl?.value) ||
    (license === "Public domain" ? "https://creativecommons.org/publicdomain/mark/1.0/" : "");
  if (!licenseUrl.startsWith("https://") && license !== "Public domain")
    throw Error("Missing license URL " + asset.id);
  const sourceUrl =
    "https://commons.wikimedia.org/wiki/File:" +
    encodeURIComponent(asset.file.replaceAll(" ", "_"));
  const url = info.thumburl || info.url;
  if (!url || !/^https:\/\/(?:upload|thumb)\.wikimedia\.org\//.test(url))
    throw Error("Unexpected image host " + asset.id);
  const photo = await fetch(url, { headers, signal: AbortSignal.timeout(60000) });
  if (!photo.ok) throw Error("Failed photo download " + asset.id + " HTTP " + photo.status);
  const bytes = Buffer.from(await photo.arrayBuffer());
  if (bytes.length < 8000 || bytes.length > 5500000)
    throw Error("Unexpected photo size " + asset.id);
  await writeFile(join(temp, asset.id + ".jpg"), bytes);
  credits.push({ id: asset.id, author, license, licenseUrl, sourceUrl });
  console.log(asset.id, license, author, url, bytes.length);
}
await writeFile("src/data/deadSeaPhotoCredits.json", JSON.stringify(credits, null, 2) + "\n");
