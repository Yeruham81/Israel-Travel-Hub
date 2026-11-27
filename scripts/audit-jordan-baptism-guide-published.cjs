const { allowEditorialMaps } = require("./consent-audit-fixture.cjs");
/* Read-only published-page verification for the Jordan River baptism guide. */
const { chromium } = require("playwright");
const fs = require("node:fs");
const path = require("node:path");
const origin = (
  process.env.BAPTISM_AUDIT_ORIGIN || "https://saddlebrown-guanaco-454061.hostingersite.com"
).replace(/\/+$/, "");
const url = origin + "/travel-blog/baptism-in-the-jordan-river/";
const dir = "/tmp/jordan-baptism-published";
fs.mkdirSync(dir, { recursive: true });
const checks = [],
  errors = [];
function verify(condition, label, details = "") {
  checks.push({ passed: Boolean(condition), label, details });
  console.log((condition ? "PASS " : "FAIL ") + label + (details ? " | " + details : ""));
  if (!condition) errors.push(label);
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function scrollAndDecode(page) {
  const images = page.locator("main img");
  const failed = [];
  for (let i = 0; i < (await images.count()); i++) {
    const img = images.nth(i),
      src = await img.getAttribute("src");
    try {
      await img.scrollIntoViewIfNeeded({ timeout: 12000 });
      // Simulate a visitor moving down the page instead of bursting twenty
      // image requests within a single second (Hostinger can return HTTP 429).
      await sleep(650);
      await img.evaluate((el) => el.decode(), { timeout: 16000 });
    } catch (e) {
      failed.push({ src, error: String(e).slice(0, 200) });
    }
  }
  return failed;
}
async function snapshot(page, label, desktop) {
  const data = await page.evaluate(() => {
    const all = (selector) => [...document.querySelectorAll(selector)];
    const photos = all("#attractions .grid>a img, #related .grid>a img");
    const related = all("#related .grid>a");
    const attractions = all("#attractions .grid>a");
    const tours = all('[data-testid="baptism-tour-card"]');
    const hero = document.querySelector('[data-testid="guide-hero-media"] img');
    const structured = all('script[type="application/ld+json"]')
      .map((el) => el.textContent || "")
      .join(" ");
    const contact = document.querySelector("#contact");
    const source = document.querySelector("#sources");
    const comparisonRegion = document.querySelector('[data-testid="baptism-site-comparison"]');
    const comparisonTable = comparisonRegion?.querySelector("table");
    return {
      h1: all("h1").map((x) => x.textContent.trim()),
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      hero: { src: hero?.currentSrc, loaded: !!(hero?.complete && hero.naturalWidth > 0) },
      date: document.querySelector("main time")?.getAttribute("datetime"),
      robots: document.querySelector('meta[name="robots"]')?.content,
      sections: [
        "compare-sites",
        "yardenit",
        "qasr",
        "ceremony",
        "getting-there",
        "galilee-tours",
        "jordan-valley-tours",
        "practical-tips",
        "faq",
        "attractions",
        "related",
        "contact",
        "sources",
      ].filter((x) => document.getElementById(x)),
      comparison: {
        hasTable: !!comparisonTable,
        visible: !!comparisonTable && getComputedStyle(comparisonTable).display !== "none",
        scrollable: !!comparisonRegion && getComputedStyle(comparisonRegion).overflowX === "auto",
        rows: all("#compare-sites tbody tr").length,
      },
      tours: tours.map((el) => ({
        href: el.querySelector('article a[href*="tpm.li"]')?.href || "",
        site: el.getAttribute("data-site"),
        img: el.querySelector("img")?.currentSrc,
        loaded: !!(el.querySelector("img")?.naturalWidth > 0),
        title: el.querySelector("article h3")?.textContent?.trim() || "",
        ratingValid:
          !!el.querySelector('[aria-label^="Rated "]') ||
          el.textContent.includes("Check reviews on provider"),
        priceValid:
          el.textContent.includes("Check current price") ||
          /US\$[\d,.]+|€[\d,.]+|₪[\d,.]+/.test(el.textContent || ""),
      })),
      attractions: attractions.length,
      related: related.length,
      linkedPages: [...attractions, ...related].map((a) => a.getAttribute("href")),
      photos: photos.map((img) => ({
        src: img.getAttribute("src"),
        loaded: img.complete && img.naturalWidth > 0,
        alt: img.getAttribute("alt"),
      })),
      faq: all("#faq details").length,
      structuredFAQ: structured.includes('"FAQPage"'),
      structuredArticle: structured.includes('"Article"'),
      map: document
        .querySelector('[data-testid="baptism-comparison-map"] iframe')
        ?.getAttribute("src"),
      reservation: document
        .querySelector('[data-testid="qasr-reservation-cta"]')
        ?.getAttribute("href"),
      safety: document.querySelector('[data-testid="qasr-access-safety"]')?.textContent,
      yardenitRules: document.getElementById("yardenit")?.textContent,
      relatedChristian: !!document.querySelector(
        '#related a[href="/travel-blog/christian-tours-in-israel/"]',
      ),
      tripadvisor: !!contact?.querySelector(
        '[data-testid="contact-tripadvisor-reviews"] a[href*="tripadvisor"]',
      ),
      contactForm: !!contact?.querySelector("form"),
      portrait: !!contact?.querySelector('[data-photo-role="contact-portrait"]'),
      sourcesAfterContact: !!(
        contact &&
        source &&
        contact.compareDocumentPosition(source) & Node.DOCUMENT_POSITION_FOLLOWING
      ),
      missingAlt: all("main img:not([alt])").map((el) => el.getAttribute("src")),
      width: document.documentElement.scrollWidth,
      viewport: innerWidth,
    };
  });
  verify(
    data.h1.length === 1 &&
      data.h1[0] === "Baptism in the Jordan River: Yardenit vs. Qasr el-Yahud",
    label + ": correct H1",
  );
  verify(data.canonical === url, label + ": preserved URL and canonical", data.canonical);
  verify(data.date === "2026-11-21", label + ": updated editorial date", String(data.date));
  verify(data.robots?.includes("noindex"), label + ": staging remains noindex");
  verify(
    data.hero.loaded && data.hero.src?.includes("featured-jordan-baptism.webp"),
    label + ": primary hero loads",
  );
  verify(data.sections.length === 13, label + ": all guide sections", String(data.sections.length));
  verify(
    data.comparison.rows === 6 &&
      data.comparison.hasTable &&
      data.comparison.visible &&
      data.comparison.scrollable,
    label + ": one accessible scrollable comparison table on desktop and mobile",
  );
  verify(
    data.tours.length === 6 &&
      data.tours.filter((t) => t.site === "galilee-tours").length === 3 &&
      data.tours.filter((t) => t.site === "jordan-valley-tours").length === 3,
    label + ": six grouped tours",
  );
  verify(
    data.tours.every((t) =>
      /^https:\/\/(viator|getyourguide)\.tpm\.li\/[A-Za-z0-9]+\?sub_id=baptism_/.test(t.href),
    ),
    label + ": all booking links are page-scoped Travelpayouts",
  );
  verify(
    data.tours.every((t) => t.loaded),
    label + ": all six bookable tour photos load",
  );
  verify(
    data.attractions === 6 && data.related === 6,
    label + ": twelve illustrated internal cards",
  );
  verify(
    data.photos.length === 12 &&
      data.photos.every((x) => x.loaded && x.alt) &&
      new Set(data.photos.map((x) => x.src)).size === 12,
    label + ": twelve distinct, loaded editorial hero photos",
    JSON.stringify(data.photos.filter((x) => !x.loaded || !x.alt)),
  );
  verify(
    data.linkedPages.includes("/attractions/yardenit/") &&
      data.linkedPages.includes("/attractions/qasr-el-yahud/"),
    label + ": exact site links",
  );
  verify(
    data.faq === 10 && data.structuredFAQ && data.structuredArticle,
    label + ": FAQ and Article structured data",
  );
  verify(
    data.map?.includes("/maps/area.html?") && data.map.includes("waypoints="),
    label + ": embedded two-site pin map with directions",
  );
  verify(
    data.reservation?.includes("en.parks.org.il") && data.reservation?.includes("qasr-al-yahud"),
    label + ": official free visit reservation CTA",
  );
  verify(
    data.safety?.includes("minefields") &&
      data.safety?.includes("authorised") &&
      data.safety?.includes("fences"),
    label + ": precise monastery-area safety guidance",
  );
  verify(
    data.yardenitRules?.includes("up to 40 people") &&
      data.yardenitRules?.includes("larger than 40"),
    label + ": Yardenit advance coordination split",
  );
  verify(data.relatedChristian, label + ": Christian Tours guide card replaces Haifa");
  verify(
    data.tours.every((t) => t.title && t.ratingValid && t.priceValid),
    label +
      ": consistent tour cards show verified details or provider lookups, without invented ratings or prices",
  );
  verify(
    data.contactForm && data.portrait && data.tripadvisor && data.sourcesAfterContact,
    label + ": personal contact, TripAdvisor reviews and footer sources",
  );
  verify(
    data.missingAlt.length === 0 && data.width <= data.viewport + 8,
    label + ": accessible photos and no horizontal overflow",
    JSON.stringify({ missingAlt: data.missingAlt, width: data.width, viewport: data.viewport }),
  );
  return data;
}
(async () => {
  let browser;
  const snapshots = {};
  try {
    browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    await allowEditorialMaps(page);
    const jsErrors = [];
    page.on("pageerror", (e) => jsErrors.push(e.message));
    const failedResponses = [];
    page.on("response", (response) => {
      if (response.status() >= 400)
        failedResponses.push({ status: response.status(), url: response.url().slice(0, 220) });
    });
    page.on("requestfailed", (request) =>
      failedResponses.push({
        status: "network-error",
        url: request.url().slice(0, 220),
        reason: request.failure()?.errorText,
      }),
    );
    const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 75000 });
    verify(response?.status() === 200, "published route HTTP 200", String(response?.status()));
    if (response?.status() !== 200) throw Error("published page not available");
    for (const [label, width, height] of [
      ["desktop-1440", 1440, 900],
      ["mobile-390", 390, 844],
      ["mobile-360", 360, 780],
    ]) {
      await page.setViewportSize({ width, height });
      await sleep(300);
      const failed = await scrollAndDecode(page);
      verify(
        failed.length === 0,
        label + ": every visible and lazy page image decodes",
        JSON.stringify(failed),
      );
      snapshots[label] = await snapshot(page, label, width >= 1024);
      await page.screenshot({
        path: path.join(dir, label + ".png"),
        fullPage: true,
        animations: "disabled",
      });
    }
    if (failedResponses.length)
      console.log("RESOURCE DELIVERY DIAGNOSTICS:", JSON.stringify(failedResponses));
    verify(jsErrors.length === 0, "no JavaScript page errors", JSON.stringify(jsErrors));
    await page.close();
  } catch (e) {
    verify(false, "browser audit completed", String(e.message));
  } finally {
    if (browser) await browser.close();
    fs.writeFileSync(
      path.join(dir, "results.json"),
      JSON.stringify({ url, checks, errors, snapshots }, null, 2),
    );
  }
  console.log("Total: " + checks.length + " checks, failures: " + errors.length);
  if (errors.length) process.exitCode = 1;
})();
