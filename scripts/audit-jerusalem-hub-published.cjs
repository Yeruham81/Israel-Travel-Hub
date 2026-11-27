const { allowEditorialMaps } = require("./consent-audit-fixture.cjs");
/* Read-only production-browser regression of the published Jerusalem planning hub. */
const { chromium } = require("playwright");
const fs = require("node:fs");
const path = require("node:path");
const origin = (
  process.env.JERUSALEM_HUB_AUDIT_ORIGIN || "https://saddlebrown-guanaco-454061.hostingersite.com"
).replace(/\/+$/, "");
const url = origin + "/travel-blog/jerusalem-travel-guide/";
const dir = "/tmp/jerusalem-hub-published";
fs.mkdirSync(dir, { recursive: true });
const checks = [],
  errors = [];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function verify(condition, label, details = "") {
  checks.push({ passed: Boolean(condition), label, details });
  console.log((condition ? "PASS " : "FAIL ") + label + (details ? " | " + details : ""));
  if (!condition) errors.push(label);
}
async function scrollAndDecode(page) {
  const images = page.locator("main img");
  const failed = [];
  for (let i = 0; i < (await images.count()); i++) {
    const img = images.nth(i),
      src = await img.getAttribute("src");
    try {
      await img.scrollIntoViewIfNeeded({ timeout: 12000 });
      await sleep(450);
      await img.evaluate((el) => el.decode(), { timeout: 16000 });
    } catch (e) {
      failed.push({ src, error: String(e).slice(0, 180) });
    }
  }
  return failed;
}
async function snapshot(page, label, desktop) {
  const data = await page.evaluate(() => {
    const all = (selector) => [...document.querySelectorAll(selector)];
    const tourCards = all('[data-testid="jerusalem-hub-tour-card"]');
    const editorialPhotos = all(
      "#choose .grid > a img,#day-trips .grid > a img,#explore-more .grid > a img",
    );
    const source = document.getElementById("sources");
    const contact = document.getElementById("contact");
    const scripts = all('script[type="application/ld+json"]').map((el) => {
      try {
        return JSON.parse(el.textContent || "{}");
      } catch {
        return {};
      }
    });
    const photo = (el) => ({
      src: el?.getAttribute("src"),
      loaded: Boolean(el?.complete && el?.naturalWidth > 0),
    });
    const hero = document.querySelector('[data-testid="guide-hero-media"] img');
    const allGuideLinks = all("#choose .grid > a,#day-trips .grid > a,#explore-more .grid > a").map(
      (el) => el.getAttribute("href"),
    );
    return {
      h1: all("h1").map((x) => x.textContent.trim()),
      metaDescription: document.querySelector('meta[name="description"]')?.content,
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      robots: document.querySelector('meta[name="robots"]')?.content,
      updated: document.querySelector("main time")?.getAttribute("datetime"),
      hero: photo(hero),
      author: document
        .querySelector('[aria-label="About the author"]')
        ?.textContent?.includes("Moshe Barak"),
      sections: [
        "at-a-glance",
        "choose",
        "how-many-days",
        "city-tours",
        "where-to-stay",
        "getting-around",
        "day-trips",
        "day-trip-tours",
        "practical",
        "faq",
        "explore-more",
        "contact",
        "sources",
      ].filter((id) => document.getElementById(id)),
      topicCards: all("#choose .grid > a").length,
      days: all("#how-many-days article").length,
      stayAreas: all("#where-to-stay article").length,
      areaLinks: all('#where-to-stay article a[href^="/accommodation/jerusalem/"]').map((a) =>
        a.getAttribute("href"),
      ),
      cityTourDirectory: !!document.querySelector('#city-tours a[href="/tours/jerusalem/"]'),
      dayTourDirectory: !!document.querySelector('#day-trip-tours a[href="/tours/"]'),
      officialRailLink: !!document.querySelector('#getting-around a[href^="https://rail.co.il/"]'),
      stayLinks: all("#where-to-stay a").map((a) => a.getAttribute("href")),
      transport: all("#getting-around [data-testid='jerusalem-transport-links'] > a").map((a) =>
        a.getAttribute("href"),
      ),
      dayTripCards: all("#day-trips .grid > a").length,
      relatedCards: all("#explore-more .grid > a").length,
      allGuideLinks,
      editorialPhotos: editorialPhotos.map(photo),
      allTourLinks: tourCards.map((card) => card.querySelector('a[href*="tpm.li"]')?.href || ""),
      tours: tourCards.map((a) => ({
        group: a.getAttribute("data-group"),
        image: photo(a.querySelector("img")),
        title: a.querySelector("strong")?.textContent,
      })),
      faq: all("#faq details").length,
      articleLd: scripts.find((s) => s["@type"] === "Article"),
      faqLd: scripts.find((s) => s["@type"] === "FAQPage"),
      contact: !!contact?.querySelector("form"),
      portrait: !!contact?.querySelector('[data-photo-role="contact-portrait"]'),
      confirmation: contact?.textContent?.includes("All bookings require confirmation"),
      sourcesLast: !!(
        contact &&
        source &&
        contact.compareDocumentPosition(source) & Node.DOCUMENT_POSITION_FOLLOWING
      ),
      unknownImages: all("main img:not([alt])").map((img) => img.getAttribute("src")),
      placeholderPhotos: all(
        "#choose .grid [aria-label^='Photo of'],#day-trips .grid [aria-label^='Photo of'],#explore-more .grid [aria-label^='Photo of']",
      ).length,
      mainIframe: all("main iframe").length,
      viewport: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      topicColumns: getComputedStyle(
        document.querySelector("#choose .grid"),
      ).gridTemplateColumns.split(" ").length,
    };
  });
  verify(
    data.h1.length === 1 &&
      data.h1[0] === "Jerusalem Travel Guide: What to See, Where to Stay & How to Plan",
    label + ": exact H1",
  );
  verify(data.canonical === url, label + ": original canonical URL preserved", data.canonical);
  verify(
    data.metaDescription?.includes("Plan your Jerusalem visit") && data.robots?.includes("noindex"),
    label + ": focused metadata and staging noindex",
  );
  verify(
    data.updated === "2026-11-21" && data.author,
    label + ": personal author and updated metadata",
  );
  verify(data.hero.loaded, label + ": hero image loads");
  verify(data.sections.length === 13, label + ": dedicated sections", String(data.sections.length));
  verify(
    data.topicCards === 6 && data.days === 3 && data.stayAreas === 6,
    label + ": first-visit cards, 3 day plans and 6 stay areas",
  );
  verify(
    data.stayLinks.includes("/travel-blog/where-to-stay-in-jerusalem/") &&
      data.stayLinks.includes("/accommodation/jerusalem/") &&
      data.areaLinks.length === 6 &&
      new Set(data.areaLinks).size === 6 &&
      data.areaLinks.includes("/accommodation/jerusalem/east-jerusalem/"),
    label + ": six linked stay areas and both accommodation summaries",
  );
  verify(
    data.cityTourDirectory && data.dayTourDirectory && data.officialRailLink,
    label + ": tour directory CTAs and official train source",
  );
  verify(
    data.transport.length === 4 &&
      !data.transport.includes("/travel-blog/airport-to-jerusalem/") &&
      data.transport.some((x) => x.includes("ben-gurion-airport-to-jerusalem")),
    label + ": four precise transport routes",
  );
  verify(
    data.dayTripCards === 6 && data.relatedCards === 6,
    label + ": six day trips and six extra planning guides",
  );
  verify(
    data.allGuideLinks.length === 18 && new Set(data.allGuideLinks).size === 18,
    label + ": unique direct internal guide destinations",
  );
  verify(
    data.editorialPhotos.length === 18 &&
      data.editorialPhotos.every((x) => x.loaded) &&
      new Set(data.editorialPhotos.map((x) => x.src)).size === 18 &&
      data.placeholderPhotos === 0,
    label + ": 18 distinct linked hero photos load",
  );
  verify(
    data.tours.length === 6 &&
      data.tours.every((x) => x.image.loaded) &&
      data.tours.filter((x) => x.group === "city-tours").length === 3 &&
      data.tours.filter((x) => x.group === "day-trip-tours").length === 3,
    label + ": six visible, illustrated and grouped tour products",
  );
  verify(
    data.allTourLinks.every((x) =>
      /^https:\/\/(viator|getyourguide)\.tpm\.li\/[A-Za-z0-9]+\?sub_id=jerusalem_hub_/.test(x),
    ),
    label + ": six page-scoped Travelpayouts booking URLs",
  );
  verify(
    data.faq === 8 &&
      data.faqLd?.mainEntity?.length === 8 &&
      data.articleLd?.dateModified === "2026-11-21",
    label + ": FAQ and Article structured data",
  );
  verify(
    data.contact && data.portrait && data.confirmation && data.sourcesLast,
    label + ": personal contact form, booking warning and sources after form",
  );
  verify(
    data.unknownImages.length === 0 && data.scrollWidth <= data.viewport + 8,
    label + ": accessible images and no horizontal overflow",
    JSON.stringify({
      unknownImages: data.unknownImages,
      scroll: data.scrollWidth,
      viewport: data.viewport,
    }),
  );
  verify(
    data.topicColumns === (desktop ? 3 : 2),
    label + ": responsive card layout with two mobile columns",
    String(data.topicColumns),
  );
  verify(data.mainIframe === 0, label + ": no unnecessary maps or embedded widgets");
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
    page.on("response", (r) => {
      if (r.status() >= 400)
        failedResponses.push({ status: r.status(), url: r.url().slice(0, 160) });
    });
    let response;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
        break;
      } catch (e) {
        console.log("Navigation retry " + (attempt + 1) + ": " + String(e.message).slice(0, 180));
        await sleep(1800);
      }
    }
    verify(
      response?.status() === 200,
      "published Jerusalem hub HTTP 200",
      String(response?.status()),
    );
    if (response?.status() !== 200) throw Error("Published hub not available");
    for (const [label, width, height] of [
      ["desktop-1440", 1440, 900],
      ["mobile-390", 390, 844],
      ["mobile-360", 360, 780],
    ]) {
      await page.setViewportSize({ width, height });
      await sleep(250);
      const failed = await scrollAndDecode(page);
      verify(
        failed.length === 0,
        label + ": all lazy-loaded images decode",
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
      console.log("RESOURCE DELIVERY DIAGNOSTICS:", JSON.stringify(failedResponses.slice(0, 50)));
    verify(jsErrors.length === 0, "no JavaScript page exceptions", JSON.stringify(jsErrors));
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
