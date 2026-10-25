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
const home = readFileSync(join(root, "index.html"), "utf8");
assert(home.includes(origin + "/"), "Homepage HTML contains the wrong canonical origin");
if (!indexable) assert(/noindex,nofollow/.test(home), "Trial HTML must remain noindex");
if (indexable) assert(/index,follow/.test(home), "Production indexing not enabled");
assert(existsSync(join(root, "assets")), "Missing built assets");
assert(existsSync(join(root, "sitemap.xml")), "Missing sitemap");
assert(existsSync(join(root, "robots.txt")), "Missing robots.txt");

const privateApi = join(root, "api");
// Never deploy compiled API: Hostinger's manually configured PHP endpoints
// are excluded by rsync, and server-side Vite JS cannot run as static files.
console.log(`Hostinger prerender verified: ${paths.size}/${paths.size} sitemap pages.`);
console.log(`Target canonical origin: ${origin}; indexable: ${indexable}`);
console.log(`PHP API source/credentials are not part of this static deployment.`);
