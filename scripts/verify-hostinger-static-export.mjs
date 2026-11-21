#!/usr/bin/env node
/**
 * Fail deployment before any remote SSH/rsync call unless all sitemap URLs
 * have a real prerendered HTML document and the build has the intended
 * canonical/indexability. Never upload SSR output to static hosting.
 */
import { readFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import assert from "node:assert/strict";

const root = ".output/public";
const origin = process.env["VITE_CANONICAL_ORIGIN"];
const indexable = process.env["VITE_INDEXABLE"] === "true";

assert(origin, "Set VITE_CANONICAL_ORIGIN for Hostinger");
const canonical = new URL(origin);
assert(canonical.protocol === "https:" && canonical.origin === origin,
  "VITE_CANONICAL_ORIGIN must be an HTTPS origin, without a trailing slash/path");
if (canonical.hostname.endsWith(".hostingersite.com")) {
  assert(!indexable, "Do not index the temporary Hostinger domain");
}

assert(existsSync(join(root, "index.html")), "Missing root index.html");
const xml = readFileSync("public/sitemap.xml", "utf8");
const urlStrings = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
assert(urlStrings.length >= 50, "Suspiciously small sitemap");
const paths = new Set();
for (const value of urlStrings) {
  const url = new URL(value);
  assert.equal(url.origin, origin, "Sitemap canonical origin mismatch");
  assert(!paths.has(url.pathname), "Duplicate sitemap path");
  paths.add(url.pathname);
  const rel = url.pathname === "/" ? "index.html" : `${url.pathname.replace(/^\/|\/$/g, "")}/index.html`;
  const file = join(root, rel);
  assert(existsSync(file), `Missing prerendered HTML for ${url.pathname}`);
  assert(statSync(file).size > 300, `Suspiciously empty HTML for ${url.pathname}`);
}
// Eilat is one destination attraction, not an independent travel-blog article.
const retiredEilatGuidePath = "/travel-blog/" + "eilat/";
assert(paths.has("/attractions/eilat/"), "Eilat attraction page missing from sitemap");
assert(!paths.has(retiredEilatGuidePath), "Retired Eilat travel guide must not appear in sitemap");
assert(!existsSync(join(root, "travel-blog", "eilat", "index.html")), "Old Eilat travel-blog HTML must not be exported");
const eilatHtml = readFileSync(join(root, "attractions", "eilat", "index.html"), "utf8");
for (const required of ['data-testid="eilat-beach-comparison"', 'data-testid="eilat-affiliate-tour-cards"', "Coral Beach Nature Reserve", "Timna Park"]) {
  assert(eilatHtml.includes(required), "Eilat attraction static HTML missing " + required);
}
assert(!eilatHtml.includes("The booking links use Travelpayouts"), "Affiliate disclosure belongs in the global footer");

const home = readFileSync(join(root, "index.html"), "utf8");
assert(home.includes(origin + "/"), "Homepage HTML contains the wrong canonical origin");
if (!indexable) assert(/noindex,nofollow/.test(home), "Trial HTML must remain noindex");
if (indexable) assert(/index,follow/.test(home), "Production indexing not enabled");
assert(existsSync(join(root, "assets")), "Missing built assets");
assert(existsSync(join(root, "sitemap.xml")), "Missing sitemap");
assert(existsSync(join(root, "robots.txt")), "Missing robots.txt");

// Haifa museums: the exported page, dedicated ten-pin map and all local
// responsive image variants must ship together, or the preview is misleading.
const haifaMuseumsHtmlPath = join(root, "travel-blog", "museums-in-haifa", "index.html");
assert(existsSync(haifaMuseumsHtmlPath), "Missing prerendered Haifa museum guide");
const haifaMuseumsHtml = readFileSync(haifaMuseumsHtmlPath, "utf8");
assert(haifaMuseumsHtml.includes("haifa-museums.html?points="), "Haifa museum map is not linked from the published guide");
assert(/srcset\s*=/i.test(haifaMuseumsHtml), "Responsive museum image srcset missing in rendered HTML");
const haifaMuseumMapPath = join(root, "maps", "haifa-museums.html");
assert(existsSync(haifaMuseumMapPath), "Missing dedicated Haifa museums map");
const haifaMuseumMap = readFileSync(haifaMuseumMapPath, "utf8");
assert(haifaMuseumMap.includes("museums.length !== 10"), "Haifa map is not configured for ten curated pins");
assert(haifaMuseumMap.includes("haifa-museum-map-selected"), "Haifa map-to-guide selection handler missing");
for(const id of ["art","city","railway","madatech","struck","tikotin","mane-katz","hecht","maritime","naval"]){
  for(const width of ["", "-360", "-560"]){
    const asset=join(root,"images","haifa-museums",id+width+".webp");
    assert(existsSync(asset), "Missing local Haifa museum image in published export: "+asset);
    assert(statSync(asset).size > 1000, "Empty Haifa museum image: "+asset);
  }
}


// Prevent city-template leakage and tour-product mismatches before ANY upload.
for (const [city, headings] of [
  ["haifa", ["Where to eat in Haifa", "Practical tips for visiting Haifa", "Getting to and around Haifa"]],
  ["jaffa", ["Where to eat in Jaffa", "Practical tips for visiting Jaffa"]],
]) {
  const file = join(root, "attractions", city, "index.html");
  assert(existsSync(file), "Missing prerendered " + city + " guide");
  const html = readFileSync(file, "utf8");
  const actualHeadings = [...html.matchAll(/<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/gi)]
    .map(match => match[1].replace(/<[^>]*>/g, "").trim());
  for (const heading of headings) {
    assert(actualHeadings.includes(heading), city + " guide missing heading: " + heading);
  }
  if (city === "haifa") {
    assert(!actualHeadings.some(h => /jaffa/i.test(h)), "Jaffa title found in Haifa guide");
    assert(!html.includes("Guided Haifa city walk from the port"), "Obsolete misleading Haifa walking-tour title");
    for (const code of ["368992P3", "22120", "58143P8"]) {
      assert(html.includes('data-provider-product-code="' + code + '"'), "Missing Haifa tour product " + code);
    }
  }
}

const privateApi = join(root, "api");
// Never deploy compiled API: Hostinger's manually configured PHP endpoints
// are excluded by rsync, and server-side Vite JS cannot run as static files.
console.log(`Hostinger prerender verified: ${paths.size}/${paths.size} sitemap pages.`);
console.log(`Target canonical origin: ${origin}; indexable: ${indexable}`);
console.log(`PHP API source/credentials are not part of this static deployment.`);
