const assert = require("node:assert/strict");
const fs = require("node:fs");
const { chromium } = require("playwright");
const base = process.env.SHORE_AUDIT_URL || "http://127.0.0.1:4173";
const output = "shore-browser-evidence";
fs.mkdirSync(output, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true, args: ["--enable-webgl", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  const results = [];
  async function scenario(port, width, name, run) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    const external = [];
    try {
      await context.route("**/*", async route => {
        const url = new URL(route.request().url());
        if (url.origin !== base && /^https?:$/.test(url.protocol)) {
          external.push(url.href);
          if (/tpwgt\.com|google-analytics|googletagmanager|doubleclick|googlesyndication/.test(url.hostname)) return route.abort();
        }
        return route.continue();
      });
      page.on("pageerror", error => console.log("PAGE_ERROR", port, width, error.message));
      await run(page);
      results.push({ port, width, name, status: "passed" });
      console.log("SHORE_FUNCTION_PASS", port, width, name);
    } catch (error) {
      results.push({ port, width, name, status: "failed", error: error.message, external: external.slice(-10) });
      console.error("SHORE_FUNCTION_FAIL", port, width, name, error.message);
    } finally {
      await context.close();
    }
  }
  async function open(page, path) {
    const response = await page.goto(base + path, { waitUntil: "domcontentloaded" });
    assert(response?.ok(), "page loads successfully: " + path);
    await page.getByRole("button", { name: "Accept essential", exact: true }).click();
  }
  try {
    for (const width of [390, 1440]) {
      for (const [port, count] of [["haifa", 7], ["ashdod", 8]]) {
        const path = "/shore-excursions/" + port + "/";
        const isPort = url => url.pathname.replace(/\/$/, "") === path.replace(/\/$/, "");
        await scenario(port, width, "hub navigation and catalog filters", async page => {
          await open(page, "/shore-excursions/");
          const hub = page.locator('[aria-label="Cruise port excursion guides"]');
          await hub.locator('a[href*="/shore-excursions/' + port + '"]').click();
          await page.waitForURL(isPort);
          const catalog = page.locator("#itineraries");
          const cards = catalog.getByTestId("shore-service-card");
          await cards.first().waitFor();
          const allIds = await cards.evaluateAll(nodes => nodes.map(n => n.dataset.serviceId));
          assert(allIds.length > 0, "unfiltered catalog has results");
          assert.equal(await catalog.getByRole("navigation", { name: "Filter port services by type" }).count(), 0);
          const destinations = catalog.getByRole("navigation", { name: "Filter port services by destination" });
          const destination = destinations.getByRole("link", { name: "Jerusalem", exact: true });
          await destination.click();
          await page.waitForURL(url => isPort(url) && url.searchParams.get("destination") === "jerusalem" && !url.searchParams.has("format"));
          await destination.and(destinations.locator('a[aria-current="true"]')).waitFor();
          const selectedIds = await cards.evaluateAll(nodes => nodes.map(n => n.dataset.serviceId));
          assert(selectedIds.length > 0 && selectedIds.length < allIds.length && selectedIds.every(id => allIds.includes(id)), "destination narrows catalog");
          assert.deepEqual(new Set(await cards.evaluateAll(nodes => nodes.map(n => n.dataset.serviceKind))), new Set(["guided-tour", "private-driver"]), "both excursion types remain available");
          await catalog.getByRole("link", { name: "Clear filters", exact: true }).click();
          await page.waitForURL(url => isPort(url) && !url.searchParams.has("destination"));
          await destinations.getByRole("link", { name: "All destinations", exact: true }).and(destinations.locator('a[aria-current="true"]')).waitFor();
          assert.deepEqual(await cards.evaluateAll(nodes => nodes.map(n => n.dataset.serviceId)), allIds, "reset restores full catalog");
        });
        await scenario(port, width, "quote selection and form validation", async page => {
          await open(page, path);
          const form = page.locator("#request-quote");
          const select = form.locator('select[name="itinerary"]');
          const quote = page.locator("#my-private-days").getByRole("link", { name: /Request a quote:/ }).first();
          const label = await quote.getAttribute("aria-label");
          await quote.click();
          await page.waitForFunction(() => !!document.querySelector('#request-quote select[name="itinerary"]')?.value);
          const selectedLabel = await select.locator("option:checked").textContent();
          assert(label.includes("Request a quote: " + selectedLabel + " from "), "correct itinerary selected");
          await page.locator("#my-private-days").getByRole("link", { name: "Contact me for a customized itinerary" }).click();
          await page.waitForFunction(() => document.querySelector('#request-quote select[name="itinerary"]')?.value === "other");
          await form.locator('input[name="otherItinerary"]').waitFor();
          await form.getByRole("button", { name: "Send excursion request", exact: true }).click();
          await form.getByRole("alert").filter({ hasText: "Please check these details:" }).waitFor();
          // Only invalid submission is exercised; never send a real inquiry.
        });
        await scenario(port, width, "map consent and pin interaction", async page => {
          await open(page, path);
          const map = page.locator("#shore-map");
          await map.scrollIntoViewIfNeeded();
          const frame = map.locator("iframe[src]");
          assert.equal(await frame.count(), 0, "map must stay blocked without consent");
          await map.getByRole("button", { name: "Cookie settings for External content" }).click();
          await page.getByRole("dialog").getByRole("checkbox").nth(1).check();
          await page.getByRole("button", { name: "Save preferences" }).click();
          await frame.waitFor();
          await frame.scrollIntoViewIfNeeded();
          const inside = page.frameLocator("#shore-map iframe[src]");
          await inside.locator(".shore-pin").nth(count - 1).waitFor({ timeout: 45000 });
          assert.equal(await inside.locator(".shore-pin").count(), count, "all map markers initialized");
          await inside.locator(".shore-pin").first().click();
          await inside.locator(".maplibregl-popup-content").waitFor();
          await page.locator("footer").getByRole("button", { name: "Cookie settings", exact: true }).click();
          await page.getByRole("button", { name: "Accept essential", exact: true }).click();
          await frame.waitFor({ state: "detached" });
        });
      }
    }
  } finally {
    await browser.close();
    fs.writeFileSync(output + "/functional-results.json", JSON.stringify(results, null, 2) + "\n");
  }
  assert.deepEqual(results.filter(result => result.status === "failed"), []);
})().catch(error => { console.error(error); process.exit(1); });
