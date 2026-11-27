#!/usr/bin/env node
/**
 * Fail deployment before any remote SSH/rsync call unless all sitemap URLs
 * have a real prerendered HTML document and the build has the intended
 * canonical/indexability. Never upload SSR output to static hosting.
 */
import { readFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import assert from "node:assert/strict";
import { verifyEditorialCardHeroes } from "./verify-editorial-card-heroes.mjs";
import { auditSiteMeta } from "./audit-site-meta.mjs";
import { verifyPhotoCredits } from "./verify-photo-credits.mjs";

const root = ".output/public";
const origin = process.env["VITE_CANONICAL_ORIGIN"];
const indexable = process.env["VITE_INDEXABLE"] === "true";
const editorial = process.argv.includes("--editorial");

function verifyContactJump(main, page) {
  const links = [...main.matchAll(/<a\b[^>]*\bhref="#contact"[^>]*>([\s\S]*?)<\/a>/gi)];
  assert(
    links.some(
      ([, content]) => content.replace(/<!--[^]*?-->|<[^>]*>/g, "").trim() === "Contact me",
    ),
    "Missing Contact me jump link: " + page,
  );
  assert(/<section\b[^>]*\bid="contact"/i.test(main), "Missing contact form target: " + page);
}

assert(origin, "Set VITE_CANONICAL_ORIGIN for Hostinger");
const canonical = new URL(origin);
assert(
  canonical.protocol === "https:" && canonical.origin === origin,
  "VITE_CANONICAL_ORIGIN must be an HTTPS origin, without a trailing slash/path",
);
const permanentOrigin = "https://www.israel-taxi.com";
if (indexable) {
  assert.equal(
    origin,
    permanentOrigin,
    "Indexable static exports are only permitted for the permanent www.israel-taxi.com origin",
  );
}

// Check the generated deployable files, not only the source public/ directory.
const exportedRobots = join(root, "robots.txt");
const exportedSitemap = join(root, "sitemap.xml");
assert(existsSync(exportedRobots), "Missing exported robots.txt");
assert(existsSync(exportedSitemap), "Missing exported sitemap.xml");
const robots = readFileSync(exportedRobots, "utf8");
assert(
  robots.includes("Sitemap: " + origin + "/sitemap.xml"),
  "robots.txt must refer to the build's own sitemap",
);
assert(
  robots.includes("User-agent: *\n") && robots.includes("Allow: /\n"),
  "robots.txt should permit crawling of page content",
);
assert(!/^Disallow:/m.test(robots), "Unexpected robots.txt Disallow directive");
assert.equal(
  readFileSync(exportedSitemap, "utf8"),
  readFileSync("public/sitemap.xml", "utf8"),
  "Exported sitemap differs from the generated sitemap",
);

assert(existsSync(join(root, "index.html")), "Missing root index.html");
const xml = readFileSync("public/sitemap.xml", "utf8");
const urlStrings = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert(urlStrings.length >= 50, "Suspiciously small sitemap");
const paths = new Set();
for (const value of urlStrings) {
  const url = new URL(value);
  assert.equal(url.origin, origin, "Sitemap canonical origin mismatch");
  assert(!paths.has(url.pathname), "Duplicate sitemap path");
  paths.add(url.pathname);
  const rel =
    url.pathname === "/" ? "index.html" : `${url.pathname.replace(/^\/|\/$/g, "")}/index.html`;
  const file = join(root, rel);
  assert(existsSync(file), `Missing prerendered HTML for ${url.pathname}`);
  assert(statSync(file).size > 300, `Suspiciously empty HTML for ${url.pathname}`);
  const html = readFileSync(file, "utf8");
  const canonicalLinks = [...html.matchAll(/<link\b[^>]*\brel="canonical"[^>]*>/gi)].map(
    (match) => match[0],
  );
  assert(
    canonicalLinks.length === 1 &&
      canonicalLinks[0].includes('href="' + origin + url.pathname + '"'),
    "Missing or incorrect self-canonical on " + url.pathname,
  );
  const expectedRobots = indexable ? "index,follow" : "noindex,nofollow";
  assert(
    html.includes('name="robots" content="' + expectedRobots + '"'),
    "Unexpected indexability on " + url.pathname,
  );
  const retiredDestinations = new Set([
    "/travel-blog/haifa/",
    "/travel-blog/the-dead-sea/",
    "/travel-blog/sea-of-galilee/",
    "/tickets/",
  ]);
  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)) {
    const target = new URL(href.replaceAll("&amp;", "&"), url);
    if (target.origin === origin) {
      const normalized = target.pathname.replace(/\/+$/, "") + "/";
      assert(
        !retiredDestinations.has(normalized),
        `Obsolete internal link ${href} on ${url.pathname}`,
      );
    }
    if (url.pathname !== "/car-rental/") {
      assert(
        !/(^|\.)discovercars\.(?:tpm\.li|com)$/.test(target.hostname),
        `Car rental referral must lead through the internal guide: ${url.pathname}`,
      );
    }
  }
}
assert(!paths.has("/tickets/"), "Removed tickets page must not appear in sitemap");
assert(
  !existsSync(join(root, "tickets", "index.html")),
  "Removed tickets HTML must not be exported",
);
const rentalHtml = readFileSync(join(root, "car-rental", "index.html"), "utf8");
assert(
  rentalHtml.includes('data-consent-src="/widgets/discovercars.html"'),
  "Missing DiscoverCars search frame",
);
if (editorial)
  assert(
    (rentalHtml.match(/<table\b/g) || []).length === 2,
    "Car rental planning tables are missing",
  );
const rentalWidget = readFileSync(join(root, "widgets", "discovercars.html"), "utf8");
const rentalWidgetSrc = rentalWidget.match(/<script\b[^>]*data-consent-src="([^"]+)"/)?.[1];
assert(rentalWidgetSrc, "Missing official Travelpayouts DiscoverCars script");
const widgetUrl = new URL(rentalWidgetSrc.replaceAll("&amp;", "&"));
assert(widgetUrl.origin === "https://tpwgt.com", "DiscoverCars widget must use Travelpayouts");
for (const [key, value] of Object.entries({
  campaign_id: "117",
  promo_id: "3873",
  trs: "406243",
  shmarker: "622032.car_rental_widget",
  location: "israel/tel-aviv/tlv",
})) {
  assert(widgetUrl.searchParams.get(key) === value, `Unexpected DiscoverCars widget ${key}`);
}
assert(
  !existsSync(join(root, "qa-car-rental-mobile.html")),
  "Local-only mobile harness must never be deployed",
);
for (const [retired, target] of [
  ["/travel-blog/haifa/", "/attractions/haifa/"],
  ["/travel-blog/sea-of-galilee/", "/attractions/sea-of-galilee/"],
  ["/travel-blog/the-dead-sea/", "/attractions/dead-sea/"],
]) {
  assert(!paths.has(retired), `Retired guide must not appear in sitemap: ${retired}`);
  assert(
    !existsSync(join(root, retired.slice(1), "index.html")),
    `Retired guide HTML must not be exported: ${retired}`,
  );
  assert(paths.has(target), `Canonical attraction missing from sitemap: ${target}`);
  assert(
    existsSync(join(root, target.slice(1), "index.html")),
    `Canonical attraction HTML missing: ${target}`,
  );
}
// Preserve established public URLs; titles do not require new slugs.
const preservedRoutes = [
  ...["jerusalem", "tel-aviv", "haifa", "ein-bokek"].map((city) => [
    `/travel-blog/ben-gurion-airport-to-${city}/`,
    `/travel-blog/how-to-get-from-ben-gurion-airport-to-${city}/`,
  ]),
  ["/private-driver-in-israel/", "/private-driver/"],
  ["/about-me/", "/about-moshe-barak/"],
];
for (const [retained, retired] of preservedRoutes) {
  assert(paths.has(retained), `Established URL missing from sitemap: ${retained}`);
  assert(!paths.has(retired), `Unnecessary renamed URL in sitemap: ${retired}`);
  assert(
    !existsSync(join(root, retired, "index.html")),
    `Retired staging HTML exported: ${retired}`,
  );
  const html = readFileSync(join(root, retained, "index.html"), "utf8");
  assert(
    html.includes(`rel="canonical" href="${origin}${retained}"`),
    `Missing self-canonical: ${retained}`,
  );
}

if (editorial) {
  // Verify the four airport journey pages in the deployable HTML, including
  // mobile table parity, internal routes, in-page anchors and image assets.
  for (const city of ["jerusalem", "tel-aviv", "haifa", "ein-bokek"]) {
    const journeyPath = "/travel-blog/ben-gurion-airport-to-" + city + "/";
    const file = join(root, "travel-blog", "ben-gurion-airport-to-" + city, "index.html");
    const html = readFileSync(file, "utf8");
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
    assert(main, "Missing airport editorial content: " + journeyPath);
    const description = html.match(/<meta\b[^>]*name="description"[^>]*content="([^"]*)"/i)?.[1];
    assert(
      description && description.length >= 105 && description.length <= 160,
      "Airport guide SEO description length must be 105–160 characters: " + journeyPath,
    );
    assert.equal([...main.matchAll(/<h1\b/gi)].length, 1, "Expected one H1: " + journeyPath);
    assert(
      main.includes('id="comparison"') && main.includes('id="request-quote"'),
      "Missing comparison or contact form: " + journeyPath,
    );
    assert(
      main.includes('data-testid="airport-journey-comparison"') &&
        main.includes('data-testid="airport-arrival-areas"'),
      "Missing comparison or area table: " + journeyPath,
    );
    assert.equal(
      [...main.matchAll(/<table\b/gi)].length,
      city === "jerusalem" ? 2 : 3,
      "Unexpected table count on " + journeyPath,
    );
    const related = main.match(
      /<section\b[^>]*data-testid="airport-related-guides"[^>]*>([\s\S]*?)<\/section>/i,
    )?.[1];
    assert(related, "Missing related guide grid: " + journeyPath);
    assert(
      related.includes("grid-cols-2") && related.includes("lg:grid-cols-3"),
      "Incorrect mobile/desktop related card grid: " + journeyPath,
    );
    assert.equal([...related.matchAll(/<li\b/g)].length, 6, "Expected six cards: " + journeyPath);
    const ids = new Set([...main.matchAll(/\bid="([^"]+)"/gi)].map((match) => match[1]));
    for (const [, raw] of main.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)) {
      const href = raw.replaceAll("&amp;", "&");
      const target = new URL(href, origin + journeyPath);
      if (target.origin !== origin) continue;
      assert(
        paths.has(target.pathname.replace(/\/+$/, "") + "/"),
        "Broken internal link " + href + " on " + journeyPath,
      );
      if (target.pathname === journeyPath && target.hash) {
        const anchor = decodeURIComponent(target.hash.slice(1));
        assert(ids.has(anchor), "Broken anchor #" + anchor + " on " + journeyPath);
      }
    }
    const imgs = [...main.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/gi)].map((match) =>
      match[1].replaceAll("&amp;", "&"),
    );
    assert(imgs.length >= 9, "Missing illustrated guide cards or article photos: " + journeyPath);
    for (const src of imgs) {
      assert(src.startsWith("/"), "Unexpected remote airport-guide image: " + src);
      const imageFile = join(root, src.split("?")[0].replace(/^\//, ""));
      assert(
        existsSync(imageFile) && statSync(imageFile).size > 100,
        "Airport-guide image missing or empty: " + src + " on " + journeyPath,
      );
    }
    assert(
      !html.includes("police_5_11_26_weather"),
      "Old weather bulletin still linked on " + journeyPath,
    );
  }
  console.log("Airport journey SEO, section anchors, internal links and mobile tables verified.");

  // Keep the three taxi articles complementary: booking/use, meter regulations,
  // and airport-specific procedures. Validate the actual prerendered pages.
  for (const [slug, title, expectedPhoto, required] of [
    [
      "taxis-in-israel",
      "Taxis in Israel: The Complete Guide for Tourists",
      "/images/travel-blog/taxi-in-tel-aviv.webp",
      [
        "Choose the right taxi booking method",
        "How to Find and Book a Taxi in Israel",
        "Need a private transfer or driver in Israel?",
      ],
    ],
    [
      "taxi-fares-in-israel",
      "Taxi Fares in Israel: Meter Rates, Night Prices &amp; Surcharges",
      null,
      [
        "Taxi meter rates at a glance",
        "Taxi tariff times",
        "Common permitted surcharges",
        "Need a private transfer for your journey?",
      ],
    ],
  ]) {
    const file = join(root, "travel-blog", slug, "index.html");
    assert(existsSync(file), "Missing taxi guide: " + slug);
    const html = readFileSync(file, "utf8");
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
    assert(main, "Missing taxi guide article: " + slug);
    assert(main.includes(title), "Unexpected taxi guide title: " + slug);
    verifyContactJump(main, slug);
    assert(main.includes('id="checklist"'), "Missing taxi guide checklist: " + slug);
    assert(main.includes('id="sources"'), "Missing taxi guide sources: " + slug);
    assert(main.includes("Written by"), "Missing taxi guide author: " + slug);
    if (expectedPhoto) assert(main.includes(expectedPhoto), "Taxi guide hero changed: " + slug);
    for (const item of required)
      assert(main.includes(item), "Missing taxi guide content: " + slug + " / " + item);
    const tableCount = [...main.matchAll(/<table\b/gi)].length;
    assert(
      tableCount === (slug === "taxis-in-israel" ? 1 : 3),
      "Unexpected duplicated or missing taxi pricing tables: " + slug + " (" + tableCount + ")",
    );
    const links = [...main.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)].map((match) => match[1]);
    for (const linkedSlug of [
      "taxis-in-israel",
      "taxi-fares-in-israel",
      "ben-gurion-airport-taxis",
    ]) {
      if (linkedSlug === slug) continue;
      assert(
        links.some((href) => href.includes("/travel-blog/" + linkedSlug + "/")),
        "Missing cross-link from " + slug + " to " + linkedSlug,
      );
    }
  }
  console.log(
    "General taxi and fare guides: style, intent-specific tables and cross-links verified.",
  );

  // Shabbat airport travel: protect seasonal bus hours, B/C meter fares and both six-item link groups.
  const shabbatFile = join(root, "travel-blog", "from-ben-gurion-airport-on-shabbat", "index.html");
  assert(existsSync(shabbatFile), "Missing Ben Gurion Shabbat guide HTML");
  const shabbatHtml = readFileSync(shabbatFile, "utf8");
  const shabbatMain = shabbatHtml.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  assert(shabbatMain, "Ben Gurion Shabbat guide has no main content");
  for (const required of [
    "How to Get from Ben Gurion Airport on Shabbat",
    "featured-shabbat-airport.webp",
    "Friday 15:45",
    "Saturday 10:30",
    "daylight-saving-time schedules",
    "Where to get off Line 711 in Tel Aviv",
    "Saturday daytime",
    "Saturday evening/night",
    "Tariff B",
    "Tariff C",
    "Terminal 1",
    "airport-taxi-sign.webp",
    "ben-gurion-rail-platform",
    "Plan the next part of your trip",
  ]) {
    assert(shabbatMain.includes(required), "Missing Shabbat airport update: " + required);
  }
  verifyContactJump(shabbatMain, "Shabbat airport guide");
  assert(
    !/\b(?:Line|route|bus)\s+712\b/i.test(shabbatMain),
    "Airport Shabbat guide must not direct readers to Line 712",
  );
  const shabbatPhotoGrid = shabbatMain.match(
    /<ul\b[^>]*data-testid="stay-trip-photo-grid"[^>]*>([\s\S]*?)<\/ul>/i,
  )?.[1];
  assert(
    shabbatPhotoGrid && [...shabbatPhotoGrid.matchAll(/<li\b/g)].length === 6,
    "Shabbat page must render six illustrated related guides",
  );
  const nextSection = shabbatMain.match(
    /<section\b[^>]*data-testid="icon-trip-planning-links"[^>]*>([\s\S]*?)<\/section>/i,
  )?.[1];
  assert(
    nextSection && [...nextSection.matchAll(/<li\b/g)].length === 6,
    "Shabbat page must retain exactly six Plan the next part of your trip links",
  );
  assert(
    [...nextSection.matchAll(/<svg\b/g)].length === 6,
    "Shabbat next-trip links must have six destination-specific icons",
  );
  assert(
    nextSection.includes("Rental options and Saturday pickup arrangements."),
    "Shabbat next-trip links must show concise descriptions",
  );
  assert(
    shabbatMain.includes("Need a private airport transfer on Shabbat?") &&
      shabbatMain.includes("Share your flight, destination, passengers and luggage.") &&
      shabbatMain.includes("private airport pickup."),
    "Shabbat contact copy must focus on private airport transfers",
  );
  assert(
    !shabbatMain.includes("or ask about Line 711 and onward transport"),
    "Shabbat contact copy must not solicit generic public transport questions",
  );
  const shabbatSourceIndex = shabbatMain.indexOf('id="sources"');
  const shabbatContactIndex = shabbatMain.indexOf('id="contact"');
  assert(
    shabbatContactIndex > 0 && shabbatSourceIndex > shabbatContactIndex,
    "Shabbat sources must appear below the contact form",
  );
  console.log(
    "Shabbat airport guide: seasonal bus, Saturday B/C fares, no 712, six illustrated guides, six next links and contact verified.",
  );

  // Ben Gurion arrivals: guard the concrete steps and editorial hand-offs.
  const arrivalPath = "/travel-blog/ben-gurion-airport-arrival-tips/";
  const arrivalFile = join(root, "travel-blog", "ben-gurion-airport-arrival-tips", "index.html");
  assert(existsSync(arrivalFile), "Missing Ben Gurion arrival tips HTML");
  const arrivalHtml = readFileSync(arrivalFile, "utf8");
  const arrivalMain = arrivalHtml.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  assert(arrivalMain, "Ben Gurion arrivals guide main content missing");
  for (const required of [
    "Ben Gurion Airport Arrivals Guide",
    "featured-ben-gurion-arrival.webp",
    "November 2026",
    "blue entry card",
    "₪25",
    "Where to go / Pickup point",
    "Exit 03",
    "Exit 23",
    "Baggage and ground-handler contacts",
    "Estimated time from landing to the public arrivals hall",
    'data-testid="stay-trip-photo-grid"',
    "Need a private airport pickup?",
  ]) {
    assert(
      arrivalMain.includes(required),
      "Missing updated airport arrival component: " + required,
    );
  }
  const arrivalRelated = arrivalMain.match(
    /<ul\b[^>]*data-testid="stay-trip-photo-grid"[^>]*>([\s\S]*?)<\/ul>/i,
  )?.[1];
  assert(
    arrivalRelated && [...arrivalRelated.matchAll(/<li\b/g)].length === 6,
    "Airport arrival page must include six illustrated related-guide cards",
  );
  verifyContactJump(arrivalMain, "Ben Gurion arrivals guide");
  const arrivalSources = arrivalMain.indexOf('id="sources"');
  const arrivalContact = arrivalMain.indexOf('id="contact"');
  assert(
    arrivalContact > 0 && arrivalSources > arrivalContact,
    "Airport arrivals references must appear after Contact me",
  );
  for (const city of ["tel-aviv", "jerusalem", "haifa", "ein-bokek"]) {
    assert(
      arrivalMain.includes("/travel-blog/ben-gurion-airport-to-" + city + "/"),
      "Arrival guide missing destination link: " + city,
    );
  }
  const arrivalHero = join(root, "images", "travel-blog", "featured-ben-gurion-arrival.webp");
  assert(
    existsSync(arrivalHero) && statSync(arrivalHero).size > 1000,
    "Ben Gurion arrivals guide hero photograph missing",
  );
  console.log(
    "Ben Gurion arrival guide: ETA, baggage, blue card, transport, six related cards, imagery and sources verified.",
  );

  // Airport taxi editorial: independently guard this page, not just the four route guides.
  const taxiPath = "/travel-blog/ben-gurion-airport-taxis/";
  const taxiFile = join(root, "travel-blog", "ben-gurion-airport-taxis", "index.html");
  assert(existsSync(taxiFile), "Missing Ben Gurion airport taxis guide HTML");
  const taxiHtml = readFileSync(taxiFile, "utf8");
  const taxiMain = taxiHtml.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  assert(taxiMain, "Airport taxi guide has no main content");
  for (const required of [
    "Ben Gurion Airport Taxis: Booking, Pickup Points",
    "airport-taxi-sign.webp",
    'data-testid="airport-taxi-booking-steps"',
    'data-testid="airport-taxi-destination-cards"',
    "Estimated daytime fares from Ben Gurion Airport",
    "Need a private airport pickup?",
    "Accessible taxis at Terminal 3",
    "Ministry of Transport",
  ]) {
    assert(taxiMain.includes(required), "Airport taxi guide missing: " + required);
  }
  verifyContactJump(taxiMain, "Ben Gurion airport taxis guide");
  assert(!taxiMain.includes("Contact Moshe"), "Outdated airport taxi contact label returned");
  const taxiCards = taxiMain.match(
    /<nav\b[^>]*data-testid="airport-taxi-destination-cards"[^>]*>([\s\S]*?)<\/nav>/i,
  )?.[1];
  assert(
    taxiCards && [...taxiCards.matchAll(/<li\b/g)].length === 4,
    "Expected four airport taxi destination cards",
  );
  for (const city of ["tel-aviv", "jerusalem", "haifa", "ein-bokek"]) {
    assert(
      taxiCards.includes("/travel-blog/ben-gurion-airport-to-" + city + "/"),
      "Airport taxi destination card missing: " + city,
    );
  }
  const taxiHero = join(root, "images", "travel-blog", "airport-taxi-sign.webp");
  assert(existsSync(taxiHero) && statSync(taxiHero).size > 1000, "Airport taxi main photo missing");
  console.log("Airport taxi pricing, photo, card links, accessibility and contact verified.");
}

// Eilat is one destination attraction, not an independent travel-blog article.
const retiredEilatGuidePath = "/travel-blog/" + "eilat/";
assert(paths.has("/attractions/eilat/"), "Eilat attraction page missing from sitemap");
assert(!paths.has(retiredEilatGuidePath), "Retired Eilat travel guide must not appear in sitemap");
assert(
  !existsSync(join(root, "travel-blog", "eilat", "index.html")),
  "Old Eilat travel-blog HTML must not be exported",
);
if (editorial) {
  const eilatHtml = readFileSync(join(root, "attractions", "eilat", "index.html"), "utf8");
  for (const required of [
    'data-testid="eilat-beach-comparison"',
    'data-testid="eilat-affiliate-tour-cards"',
    "Coral Beach Nature Reserve",
    "Timna Park",
  ]) {
    assert(eilatHtml.includes(required), "Eilat attraction static HTML missing " + required);
  }
  assert(
    !eilatHtml.includes("The booking links use Travelpayouts"),
    "Affiliate disclosure belongs in the global footer",
  );
}

const home = readFileSync(join(root, "index.html"), "utf8");
assert(home.includes(origin + "/"), "Homepage HTML contains the wrong canonical origin");
if (!indexable) assert(/noindex,nofollow/.test(home), "Trial HTML must remain noindex");
if (indexable) assert(/index,follow/.test(home), "Production indexing not enabled");
assert(existsSync(join(root, "assets")), "Missing built assets");
assert(existsSync(join(root, "sitemap.xml")), "Missing sitemap");
assert(existsSync(join(root, "robots.txt")), "Missing robots.txt");

if (editorial) {
  // Haifa museums: the exported page, dedicated ten-pin map and all local
  // responsive image variants must ship together, or the preview is misleading.
  const haifaMuseumsHtmlPath = join(root, "travel-blog", "museums-in-haifa", "index.html");
  assert(existsSync(haifaMuseumsHtmlPath), "Missing prerendered Haifa museum guide");
  const haifaMuseumsHtml = readFileSync(haifaMuseumsHtmlPath, "utf8");
  assert(
    haifaMuseumsHtml.includes("haifa-museums.html?points="),
    "Haifa museum map is not linked from the published guide",
  );
  assert(
    /srcset\s*=/i.test(haifaMuseumsHtml),
    "Responsive museum image srcset missing in rendered HTML",
  );
  const haifaMuseumMapPath = join(root, "maps", "haifa-museums.html");
  assert(existsSync(haifaMuseumMapPath), "Missing dedicated Haifa museums map");
  const haifaMuseumMap = readFileSync(haifaMuseumMapPath, "utf8");
  assert(
    haifaMuseumMap.includes("museums.length !== 10"),
    "Haifa map is not configured for ten curated pins",
  );
  assert(
    haifaMuseumMap.includes("haifa-museum-map-selected"),
    "Haifa map-to-guide selection handler missing",
  );
  for (const id of [
    "art",
    "city",
    "railway",
    "madatech",
    "struck",
    "tikotin",
    "mane-katz",
    "hecht",
    "maritime",
    "naval",
  ]) {
    for (const width of ["", "-360", "-560"]) {
      const asset = join(root, "images", "haifa-museums", id + width + ".webp");
      assert(existsSync(asset), "Missing local Haifa museum image in published export: " + asset);
      assert(statSync(asset).size > 1000, "Empty Haifa museum image: " + asset);
    }
  }

  // Prevent city-template leakage and tour-product mismatches before ANY upload.
  for (const [city, headings] of [
    [
      "haifa",
      ["Where to eat in Haifa", "Practical tips for visiting Haifa", "Getting to and around Haifa"],
    ],
    ["jaffa", ["Where to eat in Jaffa", "Practical tips for visiting Jaffa"]],
  ]) {
    const file = join(root, "attractions", city, "index.html");
    assert(existsSync(file), "Missing prerendered " + city + " guide");
    const html = readFileSync(file, "utf8");
    const actualHeadings = [...html.matchAll(/<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/gi)].map(
      (match) => match[1].replace(/<[^>]*>/g, "").trim(),
    );
    for (const heading of headings) {
      assert(actualHeadings.includes(heading), city + " guide missing heading: " + heading);
    }
    if (city === "haifa") {
      assert(!actualHeadings.some((h) => /jaffa/i.test(h)), "Jaffa title found in Haifa guide");
      assert(
        !html.includes("Guided Haifa city walk from the port"),
        "Obsolete misleading Haifa walking-tour title",
      );
      for (const code of ["368992P3", "22120", "58143P8"]) {
        assert(
          html.includes('data-provider-product-code="' + code + '"'),
          "Missing Haifa tour product " + code,
        );
      }
    }
  }

  // Guard the published Israel travel tips page and prevent silent editorial regressions.
  const israelTipsFile = join(root, "travel-blog", "israel-travel-tips", "index.html");
  assert(existsSync(israelTipsFile), "Missing prerendered Israel travel tips guide");
  const israelTipsHtml = readFileSync(israelTipsFile, "utf8");
  for (const required of [
    "Israel Travel Tips for First-Time Visitors",
    'data-testid="essential-tips"',
    'data-testid="israel-stay-cards"',
    'data-testid="travel-tips-related-guides"',
    "Emergency Information for Tourists",
    'id="contact"',
  ]) {
    assert(
      israelTipsHtml.includes(required),
      "Israel travel tips static HTML missing: " + required,
    );
  }
  assert(
    !israelTipsHtml.includes("/travel-blog/is-it-safe-to-travel-to-israel/"),
    "Unmaintained safety guide must not be linked",
  );

  // Ensure the senior-travel page keeps visitors on the guide until they choose
  // a day trip or the existing contact form. Whole-card links need no extra CTA.
  const seniorGuideFile = join(root, "travel-blog", "israel-tours-for-seniors", "index.html");
  assert(existsSync(seniorGuideFile), "Missing prerendered senior tours guide");
  const seniorGuideHtml = readFileSync(seniorGuideFile, "utf8");
  for (const required of [
    "Israel Tours for Seniors",
    "Plan your day with me",
    "Need a private driver for a comfortable day trip?",
    "data-senior-midpage-cta",
    "data-senior-trip-enquiry",
    'id="contact"',
  ])
    assert(seniorGuideHtml.includes(required), "Senior tours static HTML missing: " + required);
  for (const removed of [
    "How private day trips work",
    "Ask about my private driver service",
    "Ask Moshe about your day",
    "The private driver provides transportation and agreed stops",
  ])
    assert(!seniorGuideHtml.includes(removed), "Redundant senior tours prompt remains: " + removed);

  // Regression gate for the dedicated Jerusalem planning hub on the published static build.
  const jerusalemHubFile = join(root, "travel-blog", "jerusalem-travel-guide", "index.html");
  assert(existsSync(jerusalemHubFile), "Missing prerendered Jerusalem travel planning hub");
  const jerusalemHubHtml = readFileSync(jerusalemHubFile, "utf8");
  for (const required of [
    "Jerusalem Travel Guide: What to See, Where to Stay",
    'data-testid="jerusalem-hub-facts"',
    'data-testid="jerusalem-stay-areas"',
    "East Jerusalem",
    "/accommodation/jerusalem/east-jerusalem/",
    "Explore all Jerusalem tours",
    "Explore more tours and day trips",
    "/attractions/sea-of-galilee/",
    "/travel-blog/attractions-in-tel-aviv/",
    "https://viator.tpm.li/",
    "https://getyourguide.tpm.li/",
    'id="contact"',
  ]) {
    assert(jerusalemHubHtml.includes(required), "Jerusalem hub static HTML missing: " + required);
  }
  assert(
    !jerusalemHubHtml.includes('href="/travel-blog/day-trips-from-jerusalem/"'),
    "Retired Jerusalem day-trip path must not be linked",
  );

  // Ensure that all twelve formerly card-only mobile comparisons now ship
  // the same horizontally scrollable table in the published static HTML.
  const mobileTableRoutes = [
    "/travel-blog/israel-itinerary-3-days/",
    "/travel-blog/israel-itinerary-5-days/",
    "/travel-blog/israel-itinerary-7-days/",
    "/travel-blog/israel-itinerary-10-days/",
    "/travel-blog/baptism-in-the-jordan-river/",
    "/travel-blog/shopping-in-jerusalem/",
    "/travel-blog/top-10-things-to-do-in-israel/",
    "/travel-blog/beaches-in-tel-aviv/",
    "/travel-blog/attractions-in-tel-aviv/",
    "/travel-blog/dead-sea-attractions/",
    "/attractions/capernaum/",
    "/attractions/tabgha/",
  ];
  for (const route of mobileTableRoutes) {
    const file = join(root, route.replace(/^\/|\/$/g, ""), "index.html");
    assert(existsSync(file), "Missing responsive table page: " + route);
    const html = readFileSync(file, "utf8");
    const tags = [...html.matchAll(/<table\b[^>]*>/gi)].map((match) => match[0]);
    assert(
      tags.some((tag) => /min-w-/.test(tag) && !/\bhidden\b|\b(?:sm|md|lg):table\b/.test(tag)),
      "No mobile-visible horizontally scrollable table on " + route,
    );
    for (const obsolete of [
      "baptism-mobile-comparison",
      "capernaum-mobile-visitor-cards",
      "tabgha-mobile-hours",
      "sacred-hours-mobile",
    ]) {
      assert(!html.includes(obsolete), "Obsolete mobile comparison cards on " + route);
    }
  }

  // Sitewide invariant: no published comparison table may disappear at a
  // responsive breakpoint or require users to switch to a separate card view.
  // Audit every sitemap page, not only the twelve historical regression routes.
  let pagesWithTables = 0;
  let auditedTables = 0;
  for (const route of paths) {
    const file = join(
      root,
      route === "/" ? "index.html" : route.replace(/^\/|\/$/g, "") + "/index.html",
    );
    const html = readFileSync(file, "utf8");
    const tables = [...html.matchAll(/<table\b[^>]*>/gi)];
    if (tables.length > 0) pagesWithTables++;
    for (const match of tables) {
      const tag = match[0];
      const classes = tag.match(/\bclass="([^"]*)"/i)?.[1] ?? "";
      const tokens = classes.split(/\s+/);
      assert(
        !tokens.some(
          (token) => token === "hidden" || /^(?:sm|md|lg|xl|2xl):(?:hidden|table)$/.test(token),
        ),
        "A published table has breakpoint-dependent visibility: " + route,
      );
      const preceding = html.slice(Math.max(0, (match.index ?? 0) - 850), match.index);
      assert(
        /\boverflow-(?:x-)?(?:auto|scroll)\b/.test(preceding),
        "A published table has no horizontal scrolling region: " + route,
      );
      auditedTables++;
    }
  }
  assert(pagesWithTables >= 12, "Unexpectedly few pages with real comparison tables");
  console.log(
    "Responsive table parity verified across " +
      pagesWithTables +
      " sitemap pages and " +
      auditedTables +
      " rendered tables.",
  );

  // Long-form editorial content uses the museum-style full-width card layout.
  // Compact related guides and bookable tours are excluded from this assertion.
  const horizontalDetailPages = [
    ["/travel-blog/israel-tours-for-seniors/", 4],
    ["/travel-blog/attractions-in-tel-aviv/", 10],
    ["/travel-blog/dead-sea-attractions/", 10],
    ["/travel-blog/top-10-things-to-do-in-israel/", 10],
    ["/travel-blog/shopping-in-jerusalem/", 10],
    ["/travel-blog/what-to-eat-in-israel/", 10],
    ["/travel-blog/beaches-in-tel-aviv/", 13],
  ];
  let verifiedHorizontalCards = 0;
  for (const [route, expected] of horizontalDetailPages) {
    const file = join(root, route.slice(1, -1), "index.html");
    assert(existsSync(file), "Missing wide editorial card page: " + route);
    const html = readFileSync(file, "utf8");
    const actual = [...html.matchAll(/data-detailed-card="horizontal"/g)].length;
    assert(
      actual === expected,
      "Expected " + expected + " horizontal editorial cards on " + route + "; found " + actual,
    );
    assert(
      html.includes("lg:col-start-2") && html.includes("lg:col-start-1"),
      "Horizontal editorial cards missing desktop right-side photo layout on " + route,
    );
    verifiedHorizontalCards += actual;
  }
  assert(verifiedHorizontalCards === 67, "Long-form editorial card count must total 67");
  console.log(
    "Wide editorial card layout verified in static export: " +
      verifiedHorizontalCards +
      " cards across seven guides.",
  );
}

const privateApi = join(root, "api");
// Never deploy compiled API: Hostinger's manually configured PHP endpoints
// are excluded by rsync, and server-side Vite JS cannot run as static files.
// Verify the actual JSON-LD emitted for both the homepage and the author page.
function structuredNodes(route) {
  const rel = route === "/" ? "index.html" : route.slice(1) + "index.html";
  const html = readFileSync(join(root, rel), "utf8");
  return [
    ...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi),
  ].flatMap((m) => {
    const value = JSON.parse(m[1]);
    return Array.isArray(value["@graph"]) ? value["@graph"] : [value];
  });
}
const homeSchema = structuredNodes("/");
const aboutSchema = structuredNodes("/about-me/");
const findSchema = (nodes, type) => {
  const found = nodes.filter((node) => node["@type"] === type);
  assert.equal(found.length, 1, "Expected exactly one " + type + " schema node");
  return found[0];
};
const website = findSchema(homeSchema, "WebSite");
const organization = findSchema(homeSchema, "Organization");
const about = findSchema(aboutSchema, "AboutPage");
const person = findSchema(aboutSchema, "Person");
const crumbs = findSchema(aboutSchema, "BreadcrumbList");
assert.equal(website.url, origin + "/");
assert.equal(organization.url, origin + "/");
assert.equal(website.publisher["@id"], organization["@id"]);
assert.equal(about.url, origin + "/about-me/");
assert.equal(about.isPartOf["@id"], website["@id"]);
assert.equal(about.mainEntity["@id"], person["@id"]);
assert.equal(findSchema(homeSchema, "Person")["@id"], person["@id"]);
assert.equal(person["@id"], origin + "/about-me/#moshe-barak");
assert.equal(new URL(person.image).origin, origin);
assert.deepEqual(
  crumbs.itemListElement.map((item) => item.item),
  [origin + "/", origin + "/about-me/"],
);
console.log("Homepage and AboutPage structured data verified.");

if (editorial) verifyEditorialCardHeroes({ root, paths });
auditSiteMeta({ root, paths });
verifyPhotoCredits({ root, paths });
console.log(`Hostinger prerender verified: ${paths.size}/${paths.size} sitemap pages.`);
console.log(`Target canonical origin: ${origin}; indexable: ${indexable}`);
console.log(`PHP API source/credentials are not part of this static deployment.`);
