/**
 * Build-time XML sitemap and robots.txt generator. The source of truth is the
 * TanStack file-route declarations, not a hand-maintained list of slugs.
 *
 * Usage:
 *   node scripts/generate-sitemap.mjs --mode development
 *   node scripts/generate-sitemap.mjs --mode production
 *
 * Vite's loadEnv() includes .env.<mode> plus process.env, matching the app's
 * VITE_CANONICAL_ORIGIN. No indexability / publishing flag is changed.
 */
import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadEnv } from "vite";

const root = process.cwd();
const routesDir = path.join(root, "src/routes");
const publicDir = path.join(root, "public");

// Keep aligned with siteConfig({}) in src/lib/site.ts.
// Override by setting VITE_CANONICAL_ORIGIN for the actual deployment domain.
export const DEFAULT_CANONICAL_ORIGIN = "https://id-preview--7cd7aae9-57c0-4ced-b1fa-2f0691483fee.lovable.app";

function normalizePath(route) {
  if (!route.startsWith("/") || route.includes("?") || route.includes("#")) {
    throw new Error("Unsupported sitemap route: " + route);
  }
  if (route === "/") return "/";
  return route.replace(/\/+$/, "") + "/";
}

async function allRouteFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const batches = await Promise.all(entries.map(async entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return allRouteFiles(full);
    if (!entry.isFile() || !/\.tsx?$/.test(entry.name)) return [];
    return [full];
  }));
  return batches.flat();
}

/** Static HTML pages, excluding API endpoints, layouts, parameters and redirect-only routes. */
export async function collectSitemapPaths(dir = routesDir) {
  const paths = new Set();
  for (const file of await allRouteFiles(dir)) {
    if (path.basename(file) === "__root.tsx") continue;
    const contents = await readFile(file, "utf8");
    const match = contents.match(/createFileRoute\s*\(\s*["'\x60](\/[^"'\x60]*)["'\x60]\s*\)/);
    if (!match) throw new Error("Missing literal createFileRoute in " + file);
    const route = match[1];
    // API handlers, path parameters and catchalls should never appear in XML.
    if (route.startsWith("/api/") || /[$*]/.test(route)) continue;
    // A route that only redirects has no page document; guarded content routes
    // still belong in the sitemap when they declare a component.
    if (/\bbeforeLoad\s*:/.test(contents) && /\b(?:throw|return)\s+redirect\s*\(/.test(contents) && !/\bcomponent\s*[:,]/.test(contents)) continue;
    const canonicalPath = normalizePath(route);
    if (paths.has(canonicalPath)) throw new Error("Duplicate sitemap route: " + canonicalPath);
    paths.add(canonicalPath);
  }
  return [...paths].sort((a, b) => a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b, "en"));
}

export function normalizeOrigin(value) {
  const url = new URL(value.trim());
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || url.search || url.hash || (url.pathname !== "/" && url.pathname !== "")) {
    throw new Error("VITE_CANONICAL_ORIGIN must contain only a valid site origin");
  }
  return url.origin;
}

const escapeXml = text => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");

export function buildSitemap(paths, origin) {
  const site = normalizeOrigin(origin);
  if (paths.length > 50000) throw new Error("Sitemap exceeds the 50,000-URL protocol limit");
  const unique = new Set(paths);
  if (unique.size !== paths.length) throw new Error("Duplicate URL in sitemap");
  const lines = paths.map(p => {
    if (p !== "/" && (!p.startsWith("/") || !p.endsWith("/") || p.includes("?") || p.includes("#"))) throw new Error("Non-canonical path: " + p);
    return "  <url><loc>" + escapeXml(site + p) + "</loc></url>";
  });
  // Deliberately omit <lastmod>, <priority> and <changefreq>:
  // no trustworthy per-URL modification timestamps are currently available.
  return '<?xml version="1.0" encoding="UTF-8"?>\n'
    + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + lines.join("\n") + "\n</urlset>\n";
}

export function buildRobots(origin) {
  return "User-agent: *\nAllow: /\n\nSitemap: " + normalizeOrigin(origin) + "/sitemap.xml\n";
}

async function writeIfDifferent(file, contents) {
  let existing = null;
  try { existing = await readFile(file, "utf8"); }
  catch (error) { if (error?.code !== "ENOENT") throw error; }
  if (existing !== contents) await writeFile(file, contents, "utf8");
}

async function main() {
  const flag = process.argv.indexOf("--mode");
  const mode = flag < 0 ? "production" : process.argv[flag + 1];
  if (!["production", "development"].includes(mode)) throw new Error("Invalid Vite mode: " + mode);
  const env = loadEnv(mode, root, "VITE_");
  const origin = normalizeOrigin(env.VITE_CANONICAL_ORIGIN || DEFAULT_CANONICAL_ORIGIN);
  const pages = await collectSitemapPaths();
  await mkdir(publicDir, { recursive: true });
  await Promise.all([
    writeIfDifferent(path.join(publicDir, "sitemap.xml"), buildSitemap(pages, origin)),
    writeIfDifferent(path.join(publicDir, "robots.txt"), buildRobots(origin)),
  ]);
  console.log("Generated sitemap.xml with " + pages.length + " pages and robots.txt for " + origin);
}

if (process.argv[1] && path.basename(process.argv[1]) === "generate-sitemap.mjs") {
  main().catch(error => { console.error(error); process.exitCode = 1; });
}
