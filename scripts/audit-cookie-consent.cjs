const assert = require("node:assert/strict");
const { chromium } = require("playwright");
const base = process.env.COOKIE_AUDIT_URL || "http://127.0.0.1:4173";
const consentKey = "ith:cookie-consent:v1";
(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1365, height: 900 } });
  const requests = [], errors = [];
  await context.route("**/*", async route => {
    const url = new URL(route.request().url());
    if (url.origin === base || !/^https?:$/.test(url.protocol)) return route.continue();
    requests.push(url.href);
    // Observe attempted requests without sending test traffic or analytics to providers.
    if (url.hostname === "tpwgt.com") return route.fulfill({ contentType: "application/javascript", body: 'document.body.insertAdjacentHTML("beforeend","<p style=\\"height:280px\\">Booking search ready</p>");' });
    return route.fulfill({ status: 200, contentType: route.request().resourceType() === "document" ? "text/html" : "application/javascript", body: "" });
  });
  const page = await context.newPage();
  page.on("pageerror", error => errors.push(error.message));
  const settle = () => page.waitForTimeout(700);
  async function settings() {
    await page.locator("footer").getByRole("button", { name: "Cookie settings", exact: true }).click();
    await page.getByRole("dialog", { name: "Cookie settings" }).waitFor();
  }
  async function necessary() { await page.getByRole("button", { name: "Accept essential", exact: true }).click(); await settle(); assert.equal(await page.getByRole("dialog", { name: "Cookie settings" }).count(), 0); }
  for (const path of ["/car-rental/", "/accommodation/", "/attractions/mount-of-olives/"]) {
    await page.goto(base + path, { waitUntil: "networkidle" });
    await page.getByRole("dialog", { name: "Cookie settings" }).waitFor();
    assert.equal(requests.length, 0, "No provider request before consent at " + path + ": " + requests.join(","));
    await necessary();
    await page.locator("footer").scrollIntoViewIfNeeded();
    await settle();
    assert.equal(requests.length, 0, "Necessary-only must block all providers at " + path);
    assert.equal(await page.locator('iframe[src],iframe[srcdoc]').count(), 0);
    await page.evaluate(key => localStorage.removeItem(key), consentKey);
  }
  await page.goto(base + "/car-rental/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Manage preferences" }).click();
  const boxes = page.getByRole("dialog").getByRole("checkbox");
  assert.equal(await boxes.count(), 4, "Advertising has its own category");
  await boxes.nth(3).check();
  await page.getByRole("button", { name: "Save preferences" }).click();
  await page.locator("footer").scrollIntoViewIfNeeded(); await settle();
  assert.equal(requests.length, 0, "An advertising preference cannot start inactive ads or booking widgets");
  assert.equal(await page.locator('iframe[src],iframe[srcdoc]').count(), 0);
  await settings(); await boxes.nth(3).uncheck();
  await boxes.nth(1).check();
  await page.getByRole("button", { name: "Save preferences" }).click();
  await page.locator("footer").scrollIntoViewIfNeeded(); await settle();
  assert(!requests.some(url => url.includes("tpwgt.com")), "Map consent cannot enable booking widgets");
  await settings(); await boxes.nth(1).uncheck(); await boxes.nth(2).check();
  await page.getByRole("button", { name: "Save preferences" }).click();
  await page.locator('iframe[title="DiscoverCars car rental search"][src]').scrollIntoViewIfNeeded();
  await settle();
  assert(requests.some(url => url.includes("tpwgt.com") && url.includes("campaign_id=117")), "DiscoverCars loads after booking consent");
  assert(!requests.some(url => /google-analytics|googletagmanager/.test(url)), "GA4 stays off on preview");
  await settings(); await necessary();
  assert.equal(await page.locator('iframe[src],iframe[srcdoc]').count(), 0, "Withdrawal destroys optional frames");
  const count = requests.length;
  await page.reload({ waitUntil: "networkidle" }); await page.locator("footer").scrollIntoViewIfNeeded(); await settle();
  assert.equal(requests.length, count, "Rejection persists after reload");
  // Functional and commercial categories enable different provider documents.
  await page.goto(base + "/attractions/mount-of-olives/", { waitUntil: "networkidle" });
  await settings(); await boxes.nth(1).check();
  await page.getByRole("button", { name: "Save preferences" }).click();
  await page.locator('iframe[data-cookie-category="external"][src]').first().scrollIntoViewIfNeeded();
  await settle();
  assert(requests.some(url => /unpkg\.com|maps\.google\.com/.test(url)), "External content enables map resources");
  await settings(); await necessary();
  await page.goto(base + "/accommodation/", { waitUntil: "networkidle" });
  await settings(); await boxes.nth(2).check();
  await page.getByRole("button", { name: "Save preferences" }).click();
  await page.locator('#hotel-search-booking').scrollIntoViewIfNeeded();
  await page.locator('#hotel-search-booking iframe[srcdoc]').waitFor();
  await settle();
  assert(requests.some(url => url.includes("campaign_id=84")), "Booking.com loads in an isolated frame");
  assert.notEqual(await page.locator('#hotel-search-booking iframe[srcdoc]').getAttribute("height"), "320", "Widget resize messages reach the parent");
  assert.equal(await page.locator('script[src*="tpwgt.com"]').count(), 0, "No provider script in the parent page");
  // An explicit change in another tab withdraws active embeds without a page reload.
  const otherTab = await context.newPage();
  await otherTab.goto(base, { waitUntil: "domcontentloaded" });
  await otherTab.evaluate(key => localStorage.setItem(key, JSON.stringify({ version: 1, categories: { analytics: false, external: false, marketing: false }, expiresAt: Date.now() + 86400000 })), consentKey);
  await page.waitForFunction(() => !document.querySelector('iframe[src],iframe[srcdoc]'));
  await otherTab.close();
  const directCount = requests.length;
  for (const path of ["/maps/area.html?bbox=35.20,31.76,35.24,31.79&marker=31.777,35.22", "/widgets/discovercars.html"]) {
    await page.goto(base + path, { waitUntil: "networkidle" }); await settle();
    assert.equal(requests.length, directCount, "Direct helper URL cannot bypass consent");
    assert(await page.getByRole("link", { name: "Cookie settings", exact: true }).isVisible());
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base + "/car-rental/#cookie-settings", { waitUntil: "networkidle" });
  await page.getByRole("dialog", { name: "Cookie settings" }).waitFor();
  for (const label of ["Accept all", "Accept essential", "Manage preferences"]) {
    const box = await page.getByRole("button", { name: label, exact: true }).boundingBox();
    assert(box && box.x >= 0 && box.x + box.width <= 390 && box.y >= 0 && box.y + box.height <= 844, "Mobile choice visible: " + label);
  }
  await necessary();
  assert(await page.locator("#main form").count() > 0, "Enquiry form remains available");
  assert(await page.locator('a[href*="tpm.li"]').count() > 0, "Affiliate click-out remains available");
  assert.deepEqual(errors.filter(error => !/maplibregl|WebGL|map.*unavailable/i.test(error)), []);
  await settings();
  await page.getByRole("button", { name: "Accept all", exact: true }).click();
  await page.locator("footer").scrollIntoViewIfNeeded(); await settle();
  const saved = await page.evaluate(key => JSON.parse(localStorage.getItem(key)), consentKey);
  assert.equal(saved.version, 2);
  assert.equal(saved.categories.advertising, true);
  assert(!requests.some(url => /googlesyndication|doubleclick|googleadservices/.test(url)), "No ad request even after Accept all while ads are inactive");
  // A previous all-categories choice cannot silently become an advertising grant.
  await page.evaluate(key => localStorage.setItem(key, JSON.stringify({ version: 1, categories: { analytics: true, external: true, marketing: true }, expiresAt: Date.now() + 86400000 })), consentKey);
  await page.reload({ waitUntil: "networkidle" }); await settings();
  assert.equal(await boxes.nth(0).isChecked(), true);
  assert.equal(await boxes.nth(1).isChecked(), true);
  assert.equal(await boxes.nth(2).isChecked(), true);
  assert.equal(await boxes.nth(3).isChecked(), false);
  await necessary();
  console.log("PASS: inactive advertising, legacy migration, consent defaults, categories, withdrawal, persistence, helper protection, preview GA4 exclusion and mobile choices");
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
