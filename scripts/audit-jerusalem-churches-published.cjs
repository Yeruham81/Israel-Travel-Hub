const { allowEditorialMaps } = require("./consent-audit-fixture.cjs");
/**
 * Read-only browser audit of the published Jerusalem churches guide.
 * Runs after successful Hostinger deployment. Tests 1440px desktop and 390/360px mobile.
 * Screenshots and findings remain in GitHub Actions artifacts; this script never writes to the site.
 */
const { chromium } = require("playwright");
const fs = require("node:fs");
const path = require("node:path");
const origin = (process.env.CHURCHES_AUDIT_ORIGIN || "https://saddlebrown-guanaco-454061.hostingersite.com").replace(/\/$/, "");
const url = origin + "/travel-blog/churches-in-jerusalem/";
const output = "/tmp/jerusalem-churches-published";
fs.mkdirSync(output, { recursive: true });
const findings = [];
const failures = [];
const check = (ok, subject, details = "") => {
  const record = { ok: !!ok, subject, details };
  findings.push(record);
  if (!ok) failures.push(record);
  console.log((ok ? "PASS" : "FAIL") + " " + subject + (details ? " | " + details : ""));
};
async function inspect(page, viewportName, desktop) {
  const metrics = await page.evaluate(async () => {
    const all = s => [...document.querySelectorAll(s)];
    const cards = all('article[data-church-card="horizontal"]');
    for (const img of all("main img")) {
      img.scrollIntoView({ block: "center" });
      try { await img.decode(); } catch {}
    }
    window.scrollTo(0, 0);
    const card = cards[0];
    const figure = card?.querySelector("figure");
    const textBlock = card?.querySelector("figure + div");
    const img = figure?.querySelector("img");
    const photoSources = all('article[data-church-card="horizontal"] img').map(x => x.getAttribute("src"));
    const related = all("#explore-more .grid > a");
    const tourLinks = all('#tours article a[href*="tpm.li"]');
    return {
      h1: all("h1").map(x => x.textContent?.trim()),
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      robot: document.querySelector('meta[name="robots"]')?.content,
      updated: document.querySelector("main time")?.getAttribute("datetime"),
      cards: cards.length,
      byArea: ["old", "olives", "zion", "karem"].map(id => [id, document.querySelectorAll("#" + id + " article[data-church-card]").length]),
      cardPhotos: photoSources.length,
      uniquePhotos: new Set(photoSources).size,
      firstCardPhoto: img && {
        source: img.currentSrc,
        naturalWidth: img.naturalWidth,
        objectFit: getComputedStyle(img).objectFit,
        ratio: img.getBoundingClientRect().width / img.getBoundingClientRect().height,
        rect: (() => { const r = figure.getBoundingClientRect(); return { x: r.x, y: r.y, right: r.right }; })(),
        textRect: (() => { const r = textBlock.getBoundingClientRect(); return { x: r.x, y: r.y, right: r.right }; })(),
      },
      firstTwoCardY: cards.slice(0, 2).map(x => x.getBoundingClientRect().top),
      brokenPhotos: cards.flatMap(c => [...c.querySelectorAll("img")].filter(im => !im.complete || im.naturalWidth === 0).map(im => im.getAttribute("src"))),
      missingPhotoAlts: cards.flatMap(c => [...c.querySelectorAll("img")].filter(im => !im.alt || im.alt.trim().length < 12).map(im => im.getAttribute("src"))),
      missingSourceBtns: cards.filter(c => !c.querySelector('a[href^="https://"]')).length,
      mapFrame: document.querySelector('iframe[src^="/maps/jerusalem-churches.html"]')?.getAttribute("src"),
      mapLabels: all('#church-map [aria-label="Church areas and map colours"] > div').map(x => x.textContent?.trim()),
      tours: all("#tours article").length,
      tourLinks: tourLinks.map(x => ({ href: x.href, rel: x.rel })),
      prices: all("#tours article").filter(x => x.textContent?.includes("From US$")).length,
      rated: all('#tours article [aria-label^="Rated "]').length,
      faq: all("#faq details").length,
      related: related.length,
      columns: document.querySelector("#explore-more .grid") && getComputedStyle(document.querySelector("#explore-more .grid")).gridTemplateColumns.split(" ").filter(Boolean).length,
      author: !!document.querySelector('[aria-label="About the author"]'),
      contactForm: !!document.querySelector("#contact form"),
      sourceAfterContact: (()=>{const x=document.querySelector("#contact"),y=document.querySelector("#sources");return !!(x&&y&&(x.compareDocumentPosition(y)&Node.DOCUMENT_POSITION_FOLLOWING));})(),
      width: document.documentElement.scrollWidth,
      viewport: window.innerWidth
    };
  });
  check(metrics.h1.length === 1 && metrics.h1[0] === "Churches in Jerusalem: What to See & How to Visit", viewportName + ": correct H1", JSON.stringify(metrics.h1));
  check(metrics.canonical === url, viewportName + ": correct canonical", metrics.canonical);
  check(metrics.robot?.includes("noindex"), viewportName + ": staging remains noindex", metrics.robot);
  check(metrics.updated === "2026-11-21", viewportName + ": date of guide update", metrics.updated);
  check(metrics.cards === 20 && metrics.cardPhotos === 20 && metrics.uniquePhotos === 20, viewportName + ": twenty unique illustrated horizontal cards", JSON.stringify({ cards: metrics.cards, images: metrics.cardPhotos, unique: metrics.uniquePhotos }));
  check(JSON.stringify(metrics.byArea) === JSON.stringify([["old",9],["olives",6],["zion",3],["karem",2]]), viewportName + ": four geographic groups", JSON.stringify(metrics.byArea));
  check(metrics.brokenPhotos.length === 0 && metrics.missingPhotoAlts.length === 0, viewportName + ": every church photo loads and has distinct alt", JSON.stringify({ broken: metrics.brokenPhotos, alt: metrics.missingPhotoAlts }));
  check(metrics.firstCardPhoto?.objectFit === "contain" && Math.abs(metrics.firstCardPhoto.ratio - (16/9)) < 0.04, viewportName + ": photos remain uncropped 16:9", JSON.stringify(metrics.firstCardPhoto));
  const photo = metrics.firstCardPhoto;
  check(desktop ? (photo?.rect?.x > photo?.textRect?.x + 50 && photo?.rect?.y <= photo?.textRect?.y + 8 && metrics.firstTwoCardY[1] > metrics.firstTwoCardY[0] + 90) : (photo?.rect?.y < photo?.textRect?.y && metrics.firstTwoCardY[1] > metrics.firstTwoCardY[0] + 90), viewportName + ": horizontal image-right / stacked mobile card layout", JSON.stringify(photo));
  check(metrics.mapFrame?.includes("points=") && metrics.mapLabels.length === 4, viewportName + ": map and four-color legend", String(metrics.mapLabels));
  check(metrics.tours === 3 && metrics.tourLinks.length === 3 && metrics.tourLinks.every(l => l.href.includes("sub_id=churches_jerusalem_") && l.rel.includes("sponsored")), viewportName + ": three Travelpayouts tracked tour links", JSON.stringify(metrics.tourLinks));
  check(metrics.prices === 2 && metrics.rated === 2, viewportName + ": available supplier price and rating fields", JSON.stringify({ prices:metrics.prices, rated:metrics.rated }));
  check(metrics.faq === 7 && metrics.related === 6 && metrics.contactForm && metrics.sourceAfterContact, viewportName + ": FAQ, guides, contact and source footer", JSON.stringify({faq:metrics.faq,related:metrics.related,contact:metrics.contactForm,sources:metrics.sourceAfterContact}));
  check(metrics.columns === (desktop ? 3 : 2), viewportName + ": responsive related-guide grid", String(metrics.columns));
  check(metrics.width <= metrics.viewport + 8, viewportName + ": no page-wide horizontal overflow", JSON.stringify({width:metrics.width,viewport:metrics.viewport}));
  return metrics;
}
(async()=>{
  let browser;
  const data = {};
  try {
    browser = await chromium.launch({ headless:true, args:["--no-sandbox"] });
    for (const [label,width,height] of [["desktop-1440",1440,900],["mobile-390",390,844],["mobile-360",360,780]]) {
      const page = await browser.newPage({ viewport:{width,height}, deviceScaleFactor:1, reducedMotion:"reduce" });
      await allowEditorialMaps(page);
      const errors = [];
      page.on("pageerror", err => errors.push(err.message));
      try {
        const response = await page.goto(url, { waitUntil:"domcontentloaded", timeout:70000 });
        check(response?.status() === 200, label + ": published page HTTP 200", String(response?.status()));
        await page.waitForTimeout(1000);
        data[label] = await inspect(page,label,width>=1000);
        await page.locator("#church-map-focus").selectOption("ecce-homo");
        check(await page.locator("#church-map-focus").inputValue() === "ecce-homo", label + ": select a map point");
        const frame = page.frameLocator('iframe[src^="/maps/jerusalem-churches.html"]');
        try {
          await frame.locator(".maplibregl-popup-content").filter({ hasText:"Ecce Homo Basilica" }).waitFor({timeout:22000});
          check(true,label + ": embedded map reacts to parent selection and opens accurate pin");
        } catch (e) {
          const status = await frame.locator("#message").textContent().catch(() => "");
          check(false,label + ": embedded map responds to parent selection",String(status).slice(0,200));
        }
        await page.screenshot({ path:path.join(output,label+".png"),fullPage:true,animations:"disabled" });
        check(errors.length===0,label + ": no uncaught page errors",JSON.stringify(errors));
      } catch (e) {
        check(false,label + ": browser audit completed",e.message);
      } finally { await page.close(); }
    }
  } catch (e) {
    check(false,"Browser launched",e.message);
  } finally {
    if (browser) await browser.close();
    fs.writeFileSync(path.join(output,"report.json"),JSON.stringify({url,findings,failures,data},null,2));
  }
  if (failures.length) {
    console.error(failures.length+" published churches audit check(s) failed");
    process.exitCode=1;
  } else console.log("All published Jerusalem churches guide checks passed");
})();
