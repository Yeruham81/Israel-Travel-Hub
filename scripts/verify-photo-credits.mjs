import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";

const regionSelector = 'section[aria-label="Photo credits and licences"]';
const attributionText =
  /\b(?:Wikimedia Commons|Creative Commons|CC\s+BY(?:-SA|-NC|-ND)*\b|CC0\b|PikiWiki|Unsplash|Pexels|photo(?:graph|s|graphs)?\s+(?:credits?|attribution)\b)|\b(?:photo|photograph|image)\s*:\s*$/i;
const sourceTerms =
  /wikimedia|creative\s*commons|\bcc\s+by\b|\bcc0\b|unsplash|pexels|pikiwiki|(?:photo|image|photograph)[ _-]*credit|photo\s*:/i;

function isPhotoSource(href) {
  try {
    const url = new URL(href);
    const host = url.hostname.toLowerCase();
    return (
      (host === "commons.wikimedia.org" &&
        /\/(?:wiki\/)?(?:File:|Special:FilePath)/i.test(url.pathname)) ||
      (host === "creativecommons.org" && /^\/(?:licenses|publicdomain)\//i.test(url.pathname)) ||
      ((host === "unsplash.com" || host === "www.unsplash.com") &&
        /^\/(?:photos\/|license(?:\/|$))/i.test(url.pathname)) ||
      ((host === "pexels.com" || host === "www.pexels.com") &&
        /^\/(?:photo\/|license(?:\/|$))/i.test(url.pathname))
    );
  } catch {
    return false;
  }
}

/** Inspect rendered content, not serialized route state or source comments. */
export function auditPhotoCredits(html, page) {
  const dom = new JSDOM(html);
  try {
    const { document, Node, NodeFilter } = dom.window;
    const main = document.querySelector("#main") ?? document.querySelector("main") ?? document.body;
    const regions = [...main.querySelectorAll(regionSelector)];
    const issues = new Set();
    const add = (message) => issues.add(page + ": " + message);
    if (regions.length > 1) add("more than one page photo-credit disclosure");
    for (const region of regions) {
      const details = region.querySelectorAll("details");
      if (details.length !== 1) add("expected exactly one non-nested details in photo credits");
      if (details[0]?.hasAttribute("open")) add("photo-credit disclosure is open by default");
      if (details[0]?.querySelector("summary")?.textContent.trim() !== "Photo credits & licences")
        add("incorrect photo-credit disclosure title");
      if (!region.querySelector("li")) add("empty photo-credit disclosure");
      for (const before of main.querySelectorAll("#contact, #sources")) {
        if (before.compareDocumentPosition(region) & Node.DOCUMENT_POSITION_PRECEDING)
          add("photo credits precede #" + before.id);
      }
      for (const image of main.querySelectorAll("img")) {
        if (
          !region.contains(image) &&
          region.compareDocumentPosition(image) & Node.DOCUMENT_POSITION_FOLLOWING
        )
          add(
            "content photo after credits: " +
              (image.getAttribute("alt") || image.getAttribute("src") || "(unlabelled)"),
          );
      }
    }
    for (const anchor of main.querySelectorAll("a[href]")) {
      if (!anchor.closest(regionSelector) && isPhotoSource(anchor.getAttribute("href")))
        add("photo source/licence link outside disclosure: " + anchor.getAttribute("href"));
    }
    const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const parent = node.parentElement;
      if (!parent || parent.closest(regionSelector + ", script, style, template, noscript, svg"))
        continue;
      const value = node.textContent.trim().replace(/\s+/g, " ");
      if (attributionText.test(value))
        add("attribution text outside disclosure: " + value.slice(0, 180));
    }
    // Explicit coverage for the two verified regressions; placement alone must
    // not pass if an attribution is simply removed from the rendered page.
    const expected =
      {
        "/travel-blog/jerusalem-to-bethlehem/": [
          "https://commons.wikimedia.org/wiki/File:Shepherds_Field_Chapel,_Roman_Catholic_(Beit_Sahour)-interior_(2).jpg",
          "https://creativecommons.org/licenses/by-sa/4.0/",
        ],
        "/attractions/ein-gedi/": [
          "https://commons.wikimedia.org/wiki/File:Ein_Gedi_synagogue058.JPG",
        ],
      }[page] ?? [];
    for (const href of expected) {
      if (
        !regions.some((region) =>
          [...region.querySelectorAll("a[href]")].some((a) => a.getAttribute("href") === href),
        )
      )
        add("required photo source/licence missing from disclosure: " + href);
    }
    return { issues: [...issues], disclosures: regions.length };
  } finally {
    dom.window.close();
  }
}

/** Inventory all authored component, route and content files, including
 * plain text and metadata. Matches are informational; rendered findings fail CI. */
export function reportPhotoCreditSources(root = "src") {
  let scanned = 0;
  const candidates = [];
  function walk(dir) {
    for (const item of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, item.name);
      if (item.isDirectory()) {
        if (item.name !== "generated") walk(path);
      } else if (/\.(?:tsx?|json)$/.test(item.name) && !/\.test\./.test(item.name)) {
        scanned++;
        const lines = readFileSync(path, "utf8").split("\n");
        const matches = lines.flatMap((line, i) => (sourceTerms.test(line) ? [i + 1] : []));
        if (matches.length) candidates.push({ path, matches });
      }
    }
  }
  for (const dir of ["components", "routes", "data"]) walk(join(root, dir));
  console.log(
    "Photo attribution source inventory: " +
      scanned +
      " files scanned, " +
      candidates.length +
      " candidate files.",
  );
  for (const { path, matches } of candidates) console.log(path + ": " + matches.join(", "));
  return { scanned, candidates };
}

export function verifyPhotoCredits({ root, paths }) {
  reportPhotoCreditSources();
  const issues = [];
  let disclosures = 0;
  for (const page of paths) {
    const file = join(root, page === "/" ? "index.html" : page.slice(1) + "index.html");
    const result = auditPhotoCredits(readFileSync(file, "utf8"), page);
    disclosures += result.disclosures;
    issues.push(...result.issues);
  }
  console.log(
    "Photo credit HTML audit: " +
      paths.size +
      " sitemap pages, " +
      disclosures +
      " disclosures, " +
      issues.length +
      " issues.",
  );
  for (const issue of issues) console.error(issue);
  assert.equal(issues.length, 0, "Rendered photo-credit placement audit failed");
}
