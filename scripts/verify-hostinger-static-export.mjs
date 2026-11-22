#!/usr/bin/env node
/**
 * Fail deployment before any remote SSH/rsync call unless all sitemap URLs
 * have a real prerendered HTML document and the build has the intended
 * canonical/indexability. Never upload SSR output to static hosting.
 */
import { readFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import assert from "node:assert/strict";
import { verifyEditorialCardHeroes } from "./verify-editorial-card-heroes.mjs";

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
  const html = readFileSync(file, "utf8");
  const retiredDestinations = new Set([
    "/travel-blog/haifa/", "/travel-blog/the-dead-sea/", "/travel-blog/sea-of-galilee/", "/tickets/",
  ]);
  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)) {
    const target = new URL(href.replaceAll("&amp;", "&"), url);
    if (target.origin === origin) {
      const normalized = target.pathname.replace(/\/+$/, "") + "/";
      assert(!retiredDestinations.has(normalized), `Obsolete internal link ${href} on ${url.pathname}`);
    }
    if (url.pathname !== "/car-rental/") {
      assert(!/(^|\.)discovercars\.(?:tpm\.li|com)$/.test(target.hostname),
        `Car rental referral must lead through the internal guide: ${url.pathname}`);
    }
  }
}
assert(!paths.has("/tickets/"), "Removed tickets page must not appear in sitemap");
assert(!existsSync(join(root, "tickets", "index.html")), "Removed tickets HTML must not be exported");
for (const alias of ["/travel-blog/haifa/", "/travel-blog/the-dead-sea/", "/travel-blog/sea-of-galilee/"]) {
  assert(!paths.has(alias), `Regional alias must not appear in sitemap: ${alias}`);
}
// Preserve established public URLs; titles do not require new slugs.
const preservedRoutes = [
  ...["jerusalem", "tel-aviv", "haifa", "ein-bokek"].map(city => [
    `/travel-blog/ben-gurion-airport-to-${city}/`,
    `/travel-blog/how-to-get-from-ben-gurion-airport-to-${city}/`,
  ]),
  ["/private-driver-in-israel/", "/private-driver/"],
  ["/about-me/", "/about-moshe-barak/"],
];
for (const [retained, retired] of preservedRoutes) {
  assert(paths.has(retained), `Established URL missing from sitemap: ${retained}`);
  assert(!paths.has(retired), `Unnecessary renamed URL in sitemap: ${retired}`);
  assert(!existsSync(join(root, retired, "index.html")), `Retired staging HTML exported: ${retired}`);
  const html = readFileSync(join(root, retained, "index.html"), "utf8");
  assert(html.includes(`rel="canonical" href="${origin}${retained}"`), `Missing self-canonical: ${retained}`);
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

// Guard the published Israel travel tips page and prevent silent editorial regressions.
const israelTipsFile = join(root, "travel-blog", "israel-travel-tips", "index.html");
assert(existsSync(israelTipsFile), "Missing prerendered Israel travel tips guide");
const israelTipsHtml = readFileSync(israelTipsFile, "utf8");
for (const required of ["Israel Travel Tips for First-Time Visitors", 'data-testid="essential-tips"', 'data-testid="israel-stay-cards"', 'data-testid="travel-tips-related-guides"', "Emergency Information for Tourists", 'id="contact"']) {
  assert(israelTipsHtml.includes(required), "Israel travel tips static HTML missing: " + required);
}
assert(!israelTipsHtml.includes("/travel-blog/is-it-safe-to-travel-to-israel/"), "Unmaintained safety guide must not be linked");

// Ensure the senior-travel page keeps visitors on the guide until they choose
// a day trip or the existing contact form. Whole-card links need no extra CTA.
const seniorGuideFile = join(root, "travel-blog", "israel-tours-for-seniors", "index.html");
assert(existsSync(seniorGuideFile), "Missing prerendered senior tours guide");
const seniorGuideHtml = readFileSync(seniorGuideFile, "utf8");
for (const required of [
  "Israel Tours for Seniors",
  "Plan your day with me",
  "Send me your trip details",
  "data-senior-midpage-cta",
  "data-senior-trip-enquiry",
  'id="contact"',
]) assert(seniorGuideHtml.includes(required), "Senior tours static HTML missing: " + required);
for (const removed of [
  "How private day trips work",
  "Ask about my private driver service",
  "Ask Moshe about your day",
  "The private driver provides transportation and agreed stops",
]) assert(!seniorGuideHtml.includes(removed), "Redundant senior tours prompt remains: " + removed);

// Regression gate for the dedicated Jerusalem planning hub on the published static build.
const jerusalemHubFile = join(root, "travel-blog", "jerusalem-travel-guide", "index.html");
assert(existsSync(jerusalemHubFile), "Missing prerendered Jerusalem travel planning hub");
const jerusalemHubHtml = readFileSync(jerusalemHubFile, "utf8");
for (const required of [
  "Jerusalem Travel Guide: What to See, Where to Stay",
  'data-testid="jerusalem-hub-facts"',
  'data-testid="jerusalem-stay-areas"',
  "East Jerusalem",
  "/accommodation/jerusalem/east-jerusalem/",
  "Explore all Jerusalem tours",
  "Explore more tours and day trips",
  "/attractions/sea-of-galilee/",
  "/travel-blog/attractions-in-tel-aviv/",
  "https://viator.tpm.li/",
  "https://getyourguide.tpm.li/",
  'id="contact"',
]) {
  assert(jerusalemHubHtml.includes(required), "Jerusalem hub static HTML missing: " + required);
}
assert(!jerusalemHubHtml.includes('href="/travel-blog/day-trips-from-jerusalem/"'), "Retired Jerusalem day-trip path must not be linked");

// Ensure that all twelve formerly card-only mobile comparisons now ship
// the same horizontally scrollable table in the published static HTML.
const mobileTableRoutes = [
  "/travel-blog/israel-itinerary-3-days/",
  "/travel-blog/israel-itinerary-5-days/",
  "/travel-blog/israel-itinerary-7-days/",
  "/travel-blog/israel-itinerary-10-days/",
  "/travel-blog/baptism-in-the-jordan-river/",
  "/travel-blog/shopping-in-jerusalem/",
  "/travel-blog/top-10-things-to-do-in-israel/",
  "/travel-blog/beaches-in-tel-aviv/",
  "/travel-blog/attractions-in-tel-aviv/",
  "/travel-blog/dead-sea-attractions/",
  "/attractions/capernaum/",
  "/attractions/tabgha/",
];
for (const route of mobileTableRoutes) {
  const file = join(root, route.replace(/^\/|\/$/g, ""), "index.html");
  assert(existsSync(file), "Missing responsive table page: " + route);
  const html = readFileSync(file, "utf8");
  const tags = [...html.matchAll(/<table\b[^>]*>/gi)].map(match => match[0]);
  assert(tags.some(tag => /min-w-/.test(tag) && !/\bhidden\b|\b(?:sm|md|lg):table\b/.test(tag)),
    "No mobile-visible horizontally scrollable table on " + route);
  for (const obsolete of ["baptism-mobile-comparison", "capernaum-mobile-visitor-cards", "tabgha-mobile-hours", "sacred-hours-mobile"]) {
    assert(!html.includes(obsolete), "Obsolete mobile comparison cards on " + route);
  }
}

// Sitewide invariant: no published comparison table may disappear at a
// responsive breakpoint or require users to switch to a separate card view.
// Audit every sitemap page, not only the twelve historical regression routes.
let pagesWithTables = 0;
let auditedTables = 0;
for (const route of paths) {
  const file = join(root, route === "/" ? "index.html" : route.replace(/^\/|\/$/g, "") + "/index.html");
  const html = readFileSync(file, "utf8");
  const tables = [...html.matchAll(/<table\b[^>]*>/gi)];
  if (tables.length > 0) pagesWithTables++;
  for (const match of tables) {
    const tag = match[0];
    const classes = tag.match(/\bclass="([^"]*)"/i)?.[1] ?? "";
    const tokens = classes.split(/\s+/);
    assert(!tokens.some(token => token === "hidden" || /^(?:sm|md|lg|xl|2xl):(?:hidden|table)$/.test(token)),
      "A published table has breakpoint-dependent visibility: " + route);
    const preceding = html.slice(Math.max(0, (match.index ?? 0) - 850), match.index);
    assert(/\boverflow-(?:x-)?(?:auto|scroll)\b/.test(preceding),
      "A published table has no horizontal scrolling region: " + route);
    auditedTables++;
  }
}
assert(pagesWithTables >= 12, "Unexpectedly few pages with real comparison tables");
console.log("Responsive table parity verified across " + pagesWithTables + " sitemap pages and " + auditedTables + " rendered tables.");

// Long-form editorial content uses the museum-style full-width card layout.
// Compact related guides, bookable tours and short beach cards are intentionally
// excluded from this assertion.
const horizontalDetailPages = [
  ["/travel-blog/israel-tours-for-seniors/", 4],
  ["/travel-blog/attractions-in-tel-aviv/", 10],
  ["/travel-blog/dead-sea-attractions/", 10],
  ["/travel-blog/top-10-things-to-do-in-israel/", 10],
  ["/travel-blog/shopping-in-jerusalem/", 10],
  ["/travel-blog/what-to-eat-in-israel/", 10],
  ["/travel-blog/beaches-in-tel-aviv/", 7],
];
let verifiedHorizontalCards = 0;
for (const [route, expected] of horizontalDetailPages) {
  const file = join(root, route.slice(1, -1), "index.html");
  assert(existsSync(file), "Missing wide editorial card page: " + route);
  const html = readFileSync(file, "utf8");
  const actual = [...html.matchAll(/data-detailed-card="horizontal"/g)].length;
  assert(actual === expected, "Expected " + expected + " horizontal editorial cards on " + route + "; found " + actual);
  assert(html.includes("lg:col-start-2") && html.includes("lg:col-start-1"),
    "Horizontal editorial cards missing desktop right-side photo layout on " + route);
  verifiedHorizontalCards += actual;
}
assert(verifiedHorizontalCards === 61, "Long-form editorial card count must total 61");
console.log("Wide editorial card layout verified in static export: " + verifiedHorizontalCards + " cards across seven guides.");

const privateApi = join(root, "api");
// Never deploy compiled API: Hostinger's manually configured PHP endpoints
// are excluded by rsync, and server-side Vite JS cannot run as static files.
verifyEditorialCardHeroes({ root, paths });
console.log(`Hostinger prerender verified: ${paths.size}/${paths.size} sitemap pages.`);
console.log(`Target canonical origin: ${origin}; indexable: ${indexable}`);
console.log(`PHP API source/credentials are not part of this static deployment.`);
