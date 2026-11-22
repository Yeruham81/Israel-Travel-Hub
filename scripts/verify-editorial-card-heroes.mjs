#!/usr/bin/env node
/**
 * Check ACTUAL prerendered HTML, not just source fixtures.
 * Every image-backed internal guide/attraction link must show its destination's
 * primary hero (the ordinary img src; responsive derivatives may use srcset).
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { JSDOM } from "jsdom";

const toPath = (href) => {
  if (!href || href.startsWith("#")) return null;
  try {
    const url = new URL(href, "https://preview.local");
    if (url.origin !== "https://preview.local" &&
        !url.hostname.endsWith(".hostingersite.com") &&
        url.hostname !== "www.israel-taxi.com" &&
        url.hostname !== "israel-taxi.com") return null;
    const path = url.pathname.replace(/\/+$/, "") + "/";
    return path.startsWith("/travel-blog/") || path.startsWith("/attractions/") ? path : null;
  } catch { return null; }
};

const srcKey = (value) => {
  if (!value) return "";
  try { return new URL(value, "https://preview.local").pathname; }
  catch { return value.split(/[?#]/)[0]; }
};

const asFile = (root, path) => join(root, path === "/" ? "index.html" : path.slice(1) + "index.html");

export function verifyEditorialCardHeroes({ root, paths }) {
  const known = new Set(paths);
  const heroCache = new Map();
  const mismatches = [];
  let scannedCards = 0;
  let scannedPages = 0;
  let noHero = 0;

  const expectedFor = (target) => {
    if (heroCache.has(target)) return heroCache.get(target);
    if (!known.has(target)) { heroCache.set(target, null); return null; }
    const file = asFile(root, target);
    if (!existsSync(file)) { heroCache.set(target, null); return null; }
    const dom = new JSDOM(readFileSync(file, "utf8"));
    const img = dom.window.document.querySelector('main figure[data-testid="guide-hero-media"] img[src]');
    const expected = img?.getAttribute("src") ?? null;
    dom.window.close();
    heroCache.set(target, expected);
    return expected;
  };

  for (const page of known) {
    const file = asFile(root, page);
    if (!existsSync(file)) continue;
    const html = readFileSync(file, "utf8");
    if (!html.includes("<img") ||
        (!html.includes("/travel-blog/") && !html.includes("/attractions/"))) continue;
    const dom = new JSDOM(html);
    scannedPages++;
    for (const link of dom.window.document.querySelectorAll("a[href]")) {
      const target = toPath(link.getAttribute("href"));
      if (!target || !known.has(target) || target === page) continue;
      const img = link.querySelector("img[src]");
      if (!img) continue;
      const actual = img.getAttribute("src");
      const expected = expectedFor(target);
      scannedCards++;
      if (!expected) { noHero++; continue; }
      if (srcKey(actual) !== srcKey(expected)) {
        mismatches.push({ page, target, card: srcKey(actual), hero: srcKey(expected) });
      }
    }
    dom.window.close();
  }

  const unique = [...new Map(mismatches.map(item =>
    [item.page + " => " + item.target + " => " + item.card, item])).values()];
  console.log("[hero-card-parity] Scanned " + scannedPages + " pages and " + scannedCards +
    " illustrated guide/attraction links; " + unique.length + " mismatches; " + noHero +
    " links with no detectable target hero.");
  if (unique.length) {
    for (const item of unique.slice(0, 90)) console.error(
      "[hero-card-parity] " + item.page + " => " + item.target +
      "\n  card: " + item.card + "\n  hero: " + item.hero
    );
    if (unique.length > 90) console.error("[hero-card-parity] ...plus " + (unique.length - 90) + " more.");
    throw new Error(unique.length + " guide/attraction cards do not match destination heroes.");
  }
  return { scannedPages, scannedCards, noHero, mismatches: 0 };
}
