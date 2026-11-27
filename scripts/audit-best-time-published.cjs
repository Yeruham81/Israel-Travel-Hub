/**
 * Read-only smoke and responsive layout audit of the PUBLISHED Israel seasons
 * guide. This script never writes to the site; screenshots/JSON are local to CI.
 */
const { chromium } = require("playwright");
const fs = require("node:fs");
const path = require("node:path");
const origin = (
  process.env.AUDIT_ORIGIN || "https://saddlebrown-guanaco-454061.hostingersite.com"
).replace(/\/$/, "");
const url = origin + "/travel-blog/best-time-to-visit-israel/";
const out = "/tmp/best-time-published-audit";
fs.mkdirSync(out, { recursive: true });
const failures = [];
const checks = {};
const assert = (cond, name, details = "") => {
  checks[name] = { passed: !!cond, details };
  if (!cond) failures.push(name + (details ? ": " + details : ""));
};
const inspect = async (page, device) => {
  const values = await page.evaluate(async () => {
    const container = document.querySelector("main");
    const qs = (s) => [...document.querySelectorAll(s)];
    const h1 = qs("h1").map((x) => x.textContent?.trim());
    const hero = document.querySelector("[data-testid='guide-hero-media'] img");
    const intro = document.querySelector("[data-guide-intro]");
    const heroRect = hero?.getBoundingClientRect();
    const introRect = intro?.getBoundingClientRect();
    const monthTable = document.querySelector("#months table");
    const scrollRegion = document.querySelector("#months [role='region']");
    const pageWidth = document.documentElement.scrollWidth;
    const seasons = qs("#seasons article").map((x) => ({
      id: x.id,
      paragraphs: x.querySelectorAll("p").length,
      image: x.querySelector("img")?.getAttribute("src"),
      alt: x.querySelector("img")?.getAttribute("alt"),
    }));
    const grid = (selector) => {
      const el = document.querySelector(selector + " .grid");
      return el ? getComputedStyle(el).gridTemplateColumns.split(" ").filter(Boolean).length : 0;
    };
    const imageEls = qs("main img");
    for (const img of imageEls) {
      img.scrollIntoView({ block: "center" });
      try {
        await img.decode();
      } catch (_) {}
    }
    window.scrollTo(0, 0);
    const broken = imageEls
      .filter((i) => !i.complete || i.naturalWidth === 0)
      .map((i) => i.currentSrc || i.src);
    const tabs = qs("#months button[aria-pressed]").map((x) => ({
      name: x.textContent.trim(),
      pressed: x.getAttribute("aria-pressed"),
    }));
    const links = qs("main a[href]").map((a) => a.getAttribute("href"));
    const photoBySeason = qs("#seasons img").map((img) => ({
      src: img.currentSrc,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      alt: img.alt,
    }));
    const navSources = qs('a[href="#sources"]').length;
    return {
      h1,
      title: document.title,
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      robots: document.querySelector('meta[name="robots"]')?.content,
      intro: intro?.textContent?.trim().slice(0, 180),
      hero: {
        src: hero?.currentSrc,
        alt: hero?.alt,
        width: hero?.naturalWidth,
        height: hero?.naturalHeight,
        rect: heroRect
          ? { x: heroRect.x, y: heroRect.y, right: heroRect.right, bottom: heroRect.bottom }
          : null,
      },
      introRect: introRect
        ? { x: introRect.x, y: introRect.y, right: introRect.right, bottom: introRect.bottom }
        : null,
      months: qs("#months tbody tr").map((x) => x.querySelector("th")?.textContent?.trim()),
      monthCells: qs("#months tbody tr").map((x) => x.querySelectorAll("td").length),
      tableClient: scrollRegion?.clientWidth,
      tableScroll: scrollRegion?.scrollWidth,
      tabs,
      seasons,
      seasonPhotos: photoBySeason,
      regionCount: qs("#regions article").length,
      relatedCards: qs("#explore-more .grid>a").length,
      relatedCardPhotos: qs("#explore-more .grid>a img").length,
      planningCards: qs("#next-trip .grid>a").length,
      relatedCols: grid("#explore-more"),
      planningCols: grid("#next-trip"),
      tourCards: qs("#tours article").length,
      tourCardsWithPhotos: qs("#tours article img").length,
      tourImagesLoaded: qs("#tours article img").filter((img) => img.naturalWidth > 0).length,
      seasonPhotoSrcSets: qs("#seasons article img").map((img) => img.getAttribute("srcset")),
      monthInsightCount: qs("#month-insight").length,
      monthExtraCards: qs("#months .grid > div").length,
      tourLinks: qs('#tours a[href*="tpm.li"]').map((x) => ({ href: x.href, rel: x.rel })),
      faqCount: qs("#faq details").length,
      mainContact: !!document.querySelector("main #contact form"),
      authorPhoto: !!document.querySelector("main #contact [data-photo-role='contact-portrait']"),
      sourcesAfterContact:
        !!document.querySelector("main #contact+ #sources") ||
        (() => {
          const a = document.querySelector("main #contact"),
            b = document.querySelector("main #sources");
          return (
            !!a && !!b && (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0
          );
        })(),
      navSources,
      pageWidth,
      viewportWidth: window.innerWidth,
      imageCount: imageEls.length,
      brokenImages: broken,
      externalSources: links.filter((x) =>
        /ims\.gov\.il|parks\.org\.il|visit\.tel-aviv\.gov\.il/.test(x || ""),
      ),
      internalLinks: links.filter((x) => x?.startsWith("/") && !x.startsWith("//")),
      jsonLd: qs('script[type="application/ld+json"]')
        .map((x) => x.textContent)
        .join("\n"),
    };
  });
  checks[device + "_metrics"] = values;
  assert(
    values.h1.length === 1 && values.h1[0] === "Best Time to Visit Israel",
    device + ": unique H1",
    JSON.stringify(values.h1),
  );
  assert(values.canonical === url, device + ": canonical", values.canonical);
  assert(values.robots?.includes("noindex"), device + ": trial noindex", values.robots);
  assert(
    (values.hero.src || "").includes("best-time-to-visit-israel") && values.hero.width > 0,
    device + ": unchanged working hero",
    values.hero.src,
  );
  assert(
    values.months.length === 12 && values.monthCells.every((n) => n === 5),
    device + ": 12 months and 5 matrix columns",
    JSON.stringify({ rows: values.months.length, cells: values.monthCells }),
  );
  assert(values.regionCount === 5, device + ": five region cards", String(values.regionCount));
  assert(
    values.seasons.length === 4 && values.seasonPhotos.every((x) => x.naturalWidth > 0 && x.alt),
    device + ": four loaded seasonal images",
    JSON.stringify(values.seasonPhotos),
  );
  assert(
    values.relatedCards === 6 && values.planningCards === 6,
    device + ": twelve related guide cards",
    JSON.stringify({ related: values.relatedCards, plan: values.planningCards }),
  );
  assert(
    values.relatedCardPhotos === 6,
    device + ": all six regional guides have genuine hero photos",
    String(values.relatedCardPhotos),
  );
  assert(
    values.internalLinks.includes("/attractions/sea-of-galilee/") &&
      values.internalLinks.includes("/attractions/dead-sea/") &&
      values.internalLinks.includes("/attractions/masada/"),
    device + ": canonical attraction links",
  );
  assert(
    !values.internalLinks.includes("/travel-blog/sea-of-galilee/") &&
      !values.internalLinks.includes("/travel-blog/the-dead-sea/"),
    device + ": no obsolete guide destinations",
  );
  assert(
    values.monthInsightCount === 1 && values.monthExtraCards === 0,
    device + ": one contextual month note, not twelve duplicate cards",
  );
  assert(
    values.seasonPhotoSrcSets.length === 4 &&
      values.seasonPhotoSrcSets.every((s) => s?.includes("320w") && s?.includes("720w")),
    device + ": season images use 320w/720w srcset",
  );
  assert(
    values.jsonLd.includes("hebcal.com/holidays") &&
      values.jsonLd.includes("ims.gov.il/en/ClimateAtlas"),
    device + ": source-backed Article JSON-LD",
  );

  assert(
    values.tourCards === 3 &&
      values.tourLinks.length === 3 &&
      values.tourLinks.every(
        (x) => x.href.includes("sub_id=best_time_israel") && x.rel.includes("sponsored"),
      ),
    device + ": three tracked third-party tours",
    JSON.stringify(values.tourLinks),
  );
  assert(
    values.tourImagesLoaded === 3,
    device + ": three actual tour photographs loaded",
    String(values.tourImagesLoaded),
  );

  assert(values.faqCount === 7, device + ": seven FAQs", String(values.faqCount));
  assert(values.mainContact && values.authorPhoto, device + ": owner contact form and portrait");
  assert(
    values.sourcesAfterContact && values.navSources === 0,
    device + ": sources at end, not in navigation",
  );
  assert(
    values.brokenImages.length === 0,
    device + ": no broken guide images",
    JSON.stringify(values.brokenImages),
  );
  assert(
    values.pageWidth <= values.viewportWidth + 8,
    device + ": no horizontal overflow",
    JSON.stringify({ pageWidth: values.pageWidth, viewportWidth: values.viewportWidth }),
  );
  if (device === "mobile-390") {
    assert(
      values.tableScroll > values.tableClient + 30,
      device + ": horizontally scrollable matrix",
      JSON.stringify({ tableScroll: values.tableScroll, tableClient: values.tableClient }),
    );
    assert(
      values.relatedCols === 2 && values.planningCols === 2,
      device + ": two columns of illustrated related cards",
      JSON.stringify({ related: values.relatedCols, plan: values.planningCols }),
    );
    assert(
      values.hero.rect?.y >= values.introRect?.bottom - 5,
      device + ": hero stacked below introduction",
    );
  } else if (device === "desktop-1440") {
    assert(
      values.relatedCols === 3 && values.planningCols === 3,
      device + ": three columns of related cards",
    );
    assert(
      values.hero.rect?.x > values.introRect?.x + 100,
      device + ": side-by-side intro and hero",
    );
  }
  const spring = page.getByRole("button", { name: "Spring", exact: true });
  await spring.click();
  const filtered = await page.locator("#months tbody tr").count();
  assert(filtered === 3, device + ": seasonal filter shows three months", String(filtered));
  await page.getByRole("button", { name: "All months", exact: true }).click();
  assert(
    (await page.locator("#months tbody tr").count()) === 12,
    device + ": reset shows twelve months",
  );
  await page.getByRole("button", { name: /^April/ }).click();
  const selectedNote = await page.locator("#month-insight").innerText();
  assert(
    selectedNote.includes("April") && selectedNote.includes("Passover"),
    device + ": month selection displays single tailored note",
    selectedNote.slice(0, 120),
  );
  await page.getByRole("button", { name: "Summer", exact: true }).click();
  const resetNote = await page.locator("#month-insight").innerText();
  assert(
    resetNote.includes("Select any month"),
    device + ": changing season resets selected month",
  );
  await page.getByRole("button", { name: "All months", exact: true }).click();

  await page.screenshot({
    path: path.join(out, device + ".png"),
    fullPage: true,
    animations: "disabled",
  });
  return values;
};
(async () => {
  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
  try {
    for (const [device, viewport] of [
      ["desktop-1440", { width: 1440, height: 900 }],
      ["mobile-390", { width: 390, height: 844 }],
      ["mobile-360", { width: 360, height: 780 }],
    ]) {
      const page = await browser.newPage({
        viewport,
        deviceScaleFactor: 1,
        reducedMotion: "reduce",
      });
      const pageErrors = [];
      page.on("pageerror", (e) => pageErrors.push(e.message));
      try {
        const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
        assert(response?.status() === 200, device + ": page HTTP 200", String(response?.status()));
        await page.waitForTimeout(1400);
        await inspect(page, device);
        assert(
          pageErrors.length === 0,
          device + ": no uncaught page errors",
          JSON.stringify(pageErrors),
        );
      } catch (error) {
        failures.push(device + ": browser exception: " + error.message);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
  fs.writeFileSync(
    path.join(out, "audit.json"),
    JSON.stringify({ url, checks, failures }, null, 2),
  );
  console.log("PUBLISHED GUIDE AUDIT SUMMARY");
  for (const [name, check] of Object.entries(checks)) {
    if (name.endsWith("_metrics")) {
      console.log(
        "METRICS " +
          name +
          ": " +
          JSON.stringify({
            hero: check.hero,
            monthCount: check.months.length,
            regions: check.regionCount,
            seasons: check.seasons,
            seasonPhotos: check.seasonPhotos,
            tours: check.tourCards,
            tourPhotos: check.tourCardsWithPhotos,
            relatedCardPhotos: check.relatedCardPhotos,
            faq: check.faqCount,
            images: check.imageCount,
            broken: check.brokenImages,
            related: check.relatedCards,
            planning: check.planningCards,
            relatedCols: check.relatedCols,
            viewport: check.viewportWidth,
            pageWidth: check.pageWidth,
            tableScroll: check.tableScroll,
            sourceLinks: check.externalSources,
          }),
      );
    } else
      console.log(
        (check.passed ? "PASS " : "FAIL ") + name + (check.details ? " | " + check.details : ""),
      );
  }
  console.log("FAILURE COUNT=" + failures.length);
  if (failures.length) process.exitCode = 1;
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
