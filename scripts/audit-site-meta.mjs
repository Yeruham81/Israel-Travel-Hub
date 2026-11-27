#!/usr/bin/env node
/**
 * Read the actual static HTML produced for every sitemap URL. Report editorial
 * SEO problems without changing URLs, titles or indexability on the server.
 * Missing/duplicate critical head elements fail the build; editorial length
 * advice is reported for follow-up instead of deleting valid long titles.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { JSDOM } from "jsdom";

const asFile = (root, pathname) =>
  join(root, pathname === "/" ? "index.html" : pathname.replace(/^\/+|\/+$/g, "") + "/index.html");

export function auditSiteMeta({ root, paths }) {
  const critical = [],
    advice = [],
    titles = new Map(),
    descriptions = new Map();
  let pages = 0,
    withImages = 0;
  for (const pathname of paths) {
    const dom = new JSDOM(readFileSync(asFile(root, pathname), "utf8"));
    const doc = dom.window.document;
    const titlesOnPage = [...doc.head.querySelectorAll("title")].map((el) => el.textContent.trim());
    const descriptionsOnPage = [...doc.head.querySelectorAll('meta[name="description"]')].map(
      (el) => (el.getAttribute("content") || "").trim(),
    );
    const h1s = [...doc.querySelectorAll("main h1")];
    const ogTitles = doc.head.querySelectorAll('meta[property="og:title"]');
    const ogDescriptions = doc.head.querySelectorAll('meta[property="og:description"]');
    const ogImages = doc.head.querySelectorAll('meta[property="og:image"]');
    const title = titlesOnPage[0] || "";
    const description = descriptionsOnPage[0] || "";

    pages++;
    if (titlesOnPage.length !== 1 || !title)
      critical.push(pathname + ": expected one nonempty title");
    if (descriptionsOnPage.length !== 1 || !description)
      critical.push(pathname + ": expected one nonempty meta description");
    if (h1s.length !== 1) critical.push(pathname + ": expected one main H1; found " + h1s.length);
    if (ogTitles.length !== 1 || ogTitles[0]?.getAttribute("content") !== title)
      critical.push(pathname + ": og:title is missing or differs from title");
    if (ogDescriptions.length !== 1 || ogDescriptions[0]?.getAttribute("content") !== description)
      critical.push(pathname + ": og:description is missing or differs from description");
    if (ogImages.length === 1 && ogImages[0]?.getAttribute("content")) withImages++;
    else advice.push(pathname + ": missing one social preview image");
    if (title) {
      if (titles.has(title))
        critical.push(pathname + ": duplicate title also on " + titles.get(title));
      titles.set(title, pathname);
      if (title.length < 27 || title.length > 75)
        advice.push(pathname + ": title length " + title.length + " characters");
    }
    if (description) {
      if (descriptions.has(description))
        advice.push(pathname + ": meta description repeats " + descriptions.get(description));
      descriptions.set(description, pathname);
      if (description.length < 90 || description.length > 165)
        advice.push(pathname + ": description length " + description.length + " characters");
    }
    if (/\b(?:demo|sample|coming soon)\b/i.test(title + " " + description))
      advice.push(pathname + ": possible preview/unfinished language in search snippet");
    dom.window.close();
  }
  console.log(
    "[seo-meta] Audited " +
      pages +
      " sitemap pages; " +
      titles.size +
      " unique page titles; " +
      withImages +
      " social preview images; " +
      critical.length +
      " critical errors and " +
      advice.length +
      " editorial review points.",
  );
  for (const item of advice.slice(0, 100)) console.warn("[seo-meta] REVIEW " + item);
  if (advice.length > 100)
    console.warn("[seo-meta] ...plus " + (advice.length - 100) + " other review points");
  if (critical.length) {
    for (const item of critical.slice(0, 100)) console.error("[seo-meta] ERROR " + item);
    throw new Error(critical.length + " critical sitemap SEO errors");
  }
  return { pages, uniqueTitles: titles.size, withImages, advice };
}
