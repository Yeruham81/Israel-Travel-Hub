import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";
import { airportJourneyGuides, airportJourneyIds } from "@/data/airportJourneyGuides";
import { airportJourneyMeta, AirportJourneyPage } from "@/components/AirportJourneyPage";
import { getAirportRouteGuide } from "@/data/airportRoutes";
import { repeatedPhotos } from "@/lib/photo-uniqueness";
import { guideHeroPhotoForPath } from "@/lib/guide-hero-photos";

describe("four independent airport transportation comparisons", () => {
  it("separates informational search intent and self canonical from private booking", async () => {
    const titles: string[] = [];
    for (const id of airportJourneyIds) {
      const g = airportJourneyGuides[id];
      const privateId = id === "ein-bokek" ? "dead-sea" : id;
      const privateGuide = getAirportRouteGuide(privateId);
      expect(g.path).not.toBe(privateGuide.path);
      expect(g.title).toMatch(/Ben Gurion Airport to (?:Jerusalem|Tel Aviv|Haifa|Ein Bokek)/i);
      expect(privateGuide.title).toMatch(/^Private transfer/i);
      expect(g.options.some(o => o.id === "rail")).toBe(true);
      expect(g.options.some(o => o.id === "taxi")).toBe(true);
      expect(g.options.some(o => o.id === "private")).toBe(true);
      expect(g.faqs.length).toBeGreaterThanOrEqual(4);
      const meta = airportJourneyMeta(id);
      expect(meta.links).toEqual([{ rel: "canonical", href: expect.stringMatching(new RegExp(g.path.replaceAll("/", "\\/") + "$")) }]);
      expect(meta.meta).toContainEqual({ name: "robots", content: "noindex,nofollow" });
      expect(meta.meta).toContainEqual({ title: g.title });
      expect(meta.meta).toContainEqual({ property: "og:image", content: expect.stringMatching(/^https:\/\//) });
      const article = JSON.parse(meta.scripts[1]!.children);
      expect(article["@type"]).toBe("Article");
      expect(article.author.name).toBe("Moshe Barak");
      expect(article).not.toHaveProperty("offers");
      titles.push(g.title);
      const path = g.path;
      const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, history: createMemoryHistory({ initialEntries: [path] }), trailingSlash: "always" });
      await router.load();
      expect(router.matchRoutes(path).at(-1)?.routeId.replace(/\/$/, "")).toBe(path.replace(/\/$/, ""));
      const html = renderToString(<RouterContextProvider router={router}><AirportJourneyPage id={id}/></RouterContextProvider>);
      const doc = new DOMParser().parseFromString(html, "text/html");
      expect(doc.querySelectorAll("h1")).toHaveLength(1);
      expect(doc.querySelectorAll("table")).toHaveLength(id === "jerusalem" ? 2 : 3);
      expect(doc.querySelector('a[href*="#request-quote"]')).not.toBeNull();
      if (id !== "jerusalem") expect(doc.querySelector('aside a[href="#request-quote"]')?.getAttribute("href")).toBe("#request-quote");
      else expect(doc.querySelector('#option-private a[href="#request-quote"]')?.getAttribute("href")).toBe("#request-quote");
      expect(doc.querySelector("#comparison")?.textContent).toContain("Public-transport fares shown");
      const decisionTable = doc.querySelector<HTMLTableElement>("#comparison table");
      expect(decisionTable).not.toBeNull();
      expect([...decisionTable!.querySelectorAll("thead th")].map(th => th.textContent)).toEqual(["Option", "Travel time", "Cost", "Best for", "Availability"]);
      expect(decisionTable!.textContent).not.toMatch(/₪270–410/);
      expect(decisionTable!.querySelectorAll("thead th")).toHaveLength(5);
      expect(decisionTable!.textContent).not.toContain("To hotel?");
      expect(doc.querySelector('#comparison a[href="https://www.gov.il/he/pages/prices_update_2025"]')).not.toBeNull();
      const byline = doc.querySelector('[data-testid="airport-journey-author-position"]');
      expect(byline?.textContent).toContain("Written by");
      expect(Boolean(doc.querySelector("header time")!.compareDocumentPosition(byline!) & Node.DOCUMENT_POSITION_FOLLOWING)).toBe(true);
      expect(Boolean(byline!.compareDocumentPosition(doc.querySelector("#quick-answer")!) & Node.DOCUMENT_POSITION_FOLLOWING)).toBe(true);
      const destination = doc.querySelector('[data-testid="airport-journey-destination-photo"] img');
      expect(destination?.getAttribute("src")).toBe(g.destinationPhoto?.src);
      expect(doc.querySelector("#options h2")?.textContent).toContain(g.city);
      const privateLinks = doc.querySelector('aside[data-testid="airport-journey-private-links"]');
      expect(privateLinks?.querySelector('a[href="' + g.privatePath + '"]')).not.toBeNull();
      expect(privateLinks?.querySelector('a[href="#request-quote"]')).not.toBeNull();
      const sourceDisclosure = doc.querySelector("#sources details");
      expect(sourceDisclosure).not.toBeNull();
      expect(sourceDisclosure!.hasAttribute("open")).toBe(false);
      expect(sourceDisclosure!.querySelector("summary")?.textContent).toContain("Sources");
      expect(sourceDisclosure!.querySelectorAll("ul a")).toHaveLength(g.sources?.length ?? 0);
      expect(article.citation).toHaveLength(id === "ein-bokek" ? 9 : id === "tel-aviv" ? 7 : 6);
      expect(JSON.stringify(article.citation)).not.toContain("israel-taxi.com");
    }
    expect(new Set(titles).size).toBe(4);
  }, 30000);

  it("makes the upgraded Tel Aviv comparison practical, accurate and distinct from private transfers", () => {
    const g = airportJourneyGuides["tel-aviv"];
    expect(g.updatedAt).toBe("2026-11-23");
    expect(g.historicalPrices).toBe(false);
    expect(g.title).toMatch(/Ben Gurion Airport to Tel Aviv.*Train.*Taxi.*Bus/i);
    expect(g.answer).toMatch(/bus 445/i);
    expect(g.stations.map(station => station.name).join(" ")).toMatch(/HaHagana.*HaShalom.*Savidor Center.*University/s);
    expect(g.options.find(o => o.id === "rail")?.cost).toContain("₪");
    expect(g.options.find(o => o.id === "bus")?.cost).toContain("₪8–14.50");
    expect(g.options.find(o => o.id === "taxi")?.cost).toMatch(/meter/i);
    expect(g.stations).toHaveLength(4);
    expect(g.photos?.station.alt).toMatch(/Terminal 3/);
    expect(g.photos?.onward.alt).toMatch(/Old Jaffa/);
    expect(g.sources).toHaveLength(7);
    expect(g.faqs).toHaveLength(10);
    expect(g.weekend.join(" ")).toMatch(/Shabbat|Saturday/);
    expect(g.weekend.join(" ")).toContain("dedicated airport Shabbat guide");
    const links = g.options.flatMap(option => option.inlineLinks || []);
    for (const link of links) {
      const option = g.options.find(o => o.inlineLinks?.includes(link))!;
      expect(option.paragraphs.join(" ").split(link.text), link.text).toHaveLength(2);
    }
    expect(links.map(x => x.to)).toEqual(expect.arrayContaining([
      "/travel-blog/getting-around-tel-aviv/",
      "/travel-blog/getting-around-israel/",
      "/travel-blog/ben-gurion-airport-taxis/",
      "/travel-blog/taxi-fares-in-israel/",
      "/airport-transfers/tel-aviv/",
      "/travel-blog/from-ben-gurion-airport-on-shabbat/",
    ]));
  });

  it("renders in-paragraph links and two additional photos for the Tel Aviv journey", async () => {
    const g = airportJourneyGuides["tel-aviv"];
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, history: createMemoryHistory({ initialEntries: [g.path] }), trailingSlash: "always" });
    await router.load();
    const html = renderToString(<RouterContextProvider router={router}><AirportJourneyPage id="tel-aviv" /></RouterContextProvider>);
    const doc = new DOMParser().parseFromString(html, "text/html");
    expect(doc.querySelectorAll("article")).toHaveLength(0);
    expect(doc.querySelectorAll("figure img")).toHaveLength(4);
    for (const option of g.options) {
      for (const link of option.inlineLinks || []) {
        const el = doc.querySelector(`#option-${option.id} a[href="${link.to}"]`);
        expect(el, `Missing in-paragraph link ${link.text}`).not.toBeNull();
        expect(el?.closest("p")).not.toBeNull();
      }
    }
    expect(doc.querySelectorAll('section[aria-label="Related practical guides"] img').length).toBeGreaterThanOrEqual(4);
    const gettingAroundCard = doc.querySelector('section[aria-label="Related practical guides"] a[href="/travel-blog/getting-around-tel-aviv/"]');
    expect(gettingAroundCard, "Getting Around Tel Aviv must be displayed as a relevant guide").not.toBeNull();
    expect(gettingAroundCard?.querySelector("img[src]"), "Getting Around Tel Aviv card must show a genuine photo").not.toBeNull();
    expect(doc.querySelector('aside a[href="#request-quote"]')).not.toBeNull();
    expect(doc.body.textContent).not.toMatch(/≈ ₪10–15|≈ ₪8–15|≈ ₪150–230/);
  });


  it("matches Jerusalem's decision-first layout while preserving Tel Aviv-specific details", async () => {
    const g = airportJourneyGuides["tel-aviv"];
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, history: createMemoryHistory({ initialEntries: [g.path] }), trailingSlash: "always" });
    await router.load();
    const html = renderToString(<RouterContextProvider router={router}><AirportJourneyPage id="tel-aviv" /></RouterContextProvider>);
    const doc = new DOMParser().parseFromString(html, "text/html");
    expect(doc.querySelector("header time")?.getAttribute("datetime")).toBe("2026-11-23");
    expect(doc.querySelector("header")?.textContent).not.toMatch(/Approximate distance|Editorial review/);
    expect(doc.querySelector("#quick-answer")?.textContent).not.toContain("This is an independent transport comparison");
    const comparison = doc.querySelector("#comparison table")!;
    expect([...comparison.querySelectorAll("thead th")].map(el => el.textContent)).toEqual(["Option", "Travel time", "Cost", "Best for", "Availability"]);
    expect([...comparison.querySelectorAll("tbody th")].map(el => el.textContent)).toEqual([
      "Train to Tel Aviv", "Official airport taxi", "Advance private transfer", "Bus 445", "Weekend line 711", "Rental car",
    ]);
    expect(doc.querySelector("#station-choice")).toBeNull();
    expect(doc.querySelectorAll('#option-rail table:not([data-testid="airport-arrival-areas"]) tbody tr')).toHaveLength(4);
    expect(doc.querySelectorAll("#option-rail figure img")).toHaveLength(2);
    expect(doc.querySelectorAll("figure img")).toHaveLength(4);
    expect(doc.querySelectorAll('#options p[data-testid="useful-journey-link"]')).toHaveLength(4);
    expect(doc.querySelector("#options")?.textContent).not.toContain("Before choosing this option");
    expect(doc.querySelector('#option-rail a[href="https://www.rail.co.il/"]')).not.toBeNull();
    expect(doc.querySelector('#option-bus a[href="https://bus.gov.il/en/home"]')).not.toBeNull();
    expect(doc.querySelector('#option-taxi a[href="https://www.gett.com/il/airport-en/"]')).not.toBeNull();
    expect(doc.querySelector('#option-weekend a[href="https://busofash.co.il/?lines=711"]')).not.toBeNull();
    expect(doc.querySelector('#option-rail a[href="/travel-blog/where-to-stay-in-tel-aviv/"]')).not.toBeNull();
    expect(doc.querySelector('#shabbat a[href="/travel-blog/sherut-in-israel/"]')).toBeNull();
    expect(doc.querySelector('section[aria-label="Related practical guides"] a[href="/attractions/jaffa/"]')).not.toBeNull();
    expect(doc.querySelector('section[aria-label="Related practical guides"]')?.querySelectorAll("li")).toHaveLength(6);
    expect(doc.querySelector('section[aria-label="Plan the next part of your trip"]')).toBeNull();
    expect(doc.querySelector('section[aria-label="Other airport journey comparisons"]')).toBeNull();
    expect(doc.querySelector("main")?.lastElementChild?.id).toBe("sources");
    expect(doc.querySelectorAll("#sources a")).toHaveLength(7);
  });

  it("keeps the upgraded Jerusalem journey focused on rail, current voucher requirements, bus 485 and hotel connections", () => {
    const g = airportJourneyGuides.jerusalem;
    expect(g.updatedAt).toBe("2026-11-23");
    expect(g.historicalPrices).toBe(false);
    expect(g.title).toMatch(/Ben Gurion Airport to Jerusalem.*Train.*Taxi.*Bus/i);
    expect(g.title).not.toMatch(/2026|2027/);
    expect(g.answer).toMatch(/direct train.*Jerusalem.*Yitzhak Navon/s);
    expect(g.intro).toContain("The best option depends on your arrival time");
    expect(g.intro).not.toMatch(/26–30|bus 485|fare/i);
    expect(g.photo.alt).toMatch(/Tower of David.*Jerusalem/i);
    expect(g.photo.src).toBe("/images/travel-blog/featured-airport-jerusalem.webp");
    expect(g.options.every(o => Boolean(o.comparison?.advantages && o.comparison?.drawbacks))).toBe(true);
    expect(g.stations[0]?.name).toBe("Jerusalem–Yitzhak Navon");
    expect(g.options.find(o => o.id === "rail")!.cost).toContain("₪21");
    expect(g.options.find(o => o.id === "bus")!.cost).toContain("₪14.50");
    expect(g.options.find(o => o.id === "taxi")!.cost).toMatch(/regulated meter/i);
    expect(g.options.find(o => o.id === "bus")!.paragraphs.join(" ")).toContain("Terminal 3, Level 2, Exit 21");
    expect(g.options.find(o => o.id === "rail")!.paragraphs.join(" ")).toContain("getting around Israel guide");
    expect(g.options.find(o => o.id === "rail")!.paragraphs.join(" ")).not.toContain("instructions and official railway links follow here");
    expect(g.options.find(o => o.id === "rail")!.paragraphs.join(" ")).not.toContain("near the beginning of this guide");
    expect(g.weekend.join(" ")).toMatch(/Nesher.*no longer runs/);
    expect(g.weekendLinks).toContainEqual({ text: "Israel's holiday and special dates guide", to: "/travel-blog/calendar-of-events/" });
    expect(g.photos?.station.alt).toMatch(/Yitzhak Navon/);
    expect(g.photos?.onward.alt).toMatch(/Ben Gurion Airport railway station/);
    expect(g.faqs).toHaveLength(7);
    expect(g.related).toHaveLength(6);
    expect(g.planNext).toHaveLength(4);
    expect(g.sources).toHaveLength(6);
    expect(g.sources?.some(x => x.url.includes("vouchers-jerusalem"))).toBe(true);
    expect(g.sources?.some(x => x.url.includes("new-schedule-141126"))).toBe(true);
    const inline = g.options.flatMap(option => option.inlineLinks || []);
    expect(inline.map(x => x.to)).toEqual(expect.arrayContaining([
      "/travel-blog/getting-around-israel/",
      "/travel-blog/ben-gurion-airport-taxis/",
      "/travel-blog/taxi-fares-in-israel/",
      "/airport-transfers/jerusalem/",
      "/car-rental/",
    ]));
    for (const option of g.options) for (const link of option.inlineLinks || []) {
      expect(option.paragraphs.join(" ").split(link.text), link.text).toHaveLength(2);
    }
    for (const link of g.weekendLinks || []) expect(g.weekend.join(" ").split(link.text)).toHaveLength(2);
  });

  it("renders Jerusalem article contextual links, new photos and specialist guide cards", async () => {
    const g = airportJourneyGuides.jerusalem;
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, history: createMemoryHistory({ initialEntries: [g.path] }), trailingSlash: "always" });
    await router.load();
    const html = renderToString(<RouterContextProvider router={router}><AirportJourneyPage id="jerusalem" /></RouterContextProvider>);
    const doc = new DOMParser().parseFromString(html, "text/html");
    expect(doc.querySelectorAll("figure img")).toHaveLength(4);
    const intro = doc.querySelector("header p.text-lg")?.textContent || "";
    expect(intro).toContain("The best option depends on your arrival time");
    expect(doc.querySelector('header time[datetime="2026-11-23"]')?.textContent).toBe("November 2026");
    expect(doc.querySelector("header")?.textContent).not.toMatch(/Approximate distance|Editorial review|45–55 km/);
    expect(doc.querySelector("header figure img")?.getAttribute("alt")).toMatch(/Tower of David.*Jerusalem/i);
    expect(doc.querySelector("header figure img")?.getAttribute("src")).toBe("/images/travel-blog/featured-airport-jerusalem.webp");
    expect(doc.querySelector("main")?.lastElementChild?.id).toBe("sources");
    expect(doc.querySelector("#quick-answer")?.textContent).not.toContain("This is an independent transport comparison");
    const comparison = doc.querySelector("#comparison table")!;
    expect(comparison.querySelectorAll("thead th")).toHaveLength(5);
    expect([...comparison.querySelectorAll("thead th")].map(th => th.textContent)).toEqual(["Option", "Travel time", "Cost", "Best for", "Availability"]);
    expect(comparison.querySelectorAll("tbody tr")).toHaveLength(5);
    expect(comparison.textContent).not.toMatch(/written quote required|illustrative|after pickup|per.vehicle on weekdays/i);
    expect(comparison.textContent).toContain("Varies");
    expect(comparison.textContent).toContain("From ₪");
    const priceNote = comparison.parentElement?.nextElementSibling?.textContent || "";
    expect(priceNote).toMatch(/^Public-transport fares shown/);
    expect(priceNote.length).toBeLessThan(370);
    expect(doc.querySelectorAll("#options h4").length).toBeGreaterThanOrEqual(1);
    expect(doc.querySelector("#options")?.textContent).not.toContain("Before choosing this option");
    const usefulLinks = [...doc.querySelectorAll('#options p[data-testid="useful-journey-link"]')];
    expect(usefulLinks).toHaveLength(2);
    expect(usefulLinks.every(link => link.querySelector("a[href]"))).toBe(true);
    expect(doc.querySelector('#option-rail aside[aria-label="Important Jerusalem train ticket information"] svg[aria-hidden="true"]')).not.toBeNull();
    expect(doc.querySelector('#option-taxi p[data-testid="useful-journey-link"] a[href="https://www.gett.com/il/airport-en/"]')).not.toBeNull();
    expect(doc.querySelector('#option-bus p[data-testid="useful-journey-link"] a[href="https://bus.gov.il/en/home"]')).not.toBeNull();
    expect(doc.querySelector('#option-private a[href="#request-quote"]')).not.toBeNull();
    expect(doc.querySelector('#option-rental p[data-testid="useful-journey-link"]')).toBeNull();
    for (const o of g.options) for (const l of o.inlineLinks || []) {
      const link = doc.querySelector(`#option-${o.id} a[href="${l.to}"]`);
      expect(link).not.toBeNull();
      expect(link?.closest("p")).not.toBeNull();
    }
    expect(doc.querySelector('section[aria-label="Related practical guides"]')).not.toBeNull();
    const rail = doc.querySelector("#option-rail")!;
    const voucher = rail.querySelector('aside[aria-label="Important Jerusalem train ticket information"]')!;
    expect(voucher).not.toBeNull();
    expect(voucher.textContent).toContain("free personal voucher");
    expect(voucher.textContent).not.toContain("scheduled to start on November 14, 2026");
    expect(voucher.querySelector('a[href*="vouchers-jerusalem"]')).not.toBeNull();
    expect(voucher.querySelector('a[href="https://www.rail.co.il/"]')).not.toBeNull();
    expect(rail.querySelectorAll("figure img")).toHaveLength(2);
    expect(rail.querySelector("h3 + figure")).toBeNull();
    expect(doc.querySelector("#options > h2 + figure")).toBeNull();
    expect(doc.querySelector("#station-choice")).toBeNull();
    expect(doc.querySelector("#quick-answer + aside")).toBeNull();
    expect(doc.querySelector('#shabbat a[href="/travel-blog/calendar-of-events/"]')).not.toBeNull();
    expect(doc.querySelector('#option-private a[href="#request-quote"]')?.textContent).toMatch(/send me your flight, hotel and luggage details/i);
    expect(doc.querySelector('aside[aria-label="Private transfer quote for Jerusalem"]')).toBeNull();
    expect(doc.querySelector('#option-private a[href="#request-quote"]')).not.toBeNull();
    expect(doc.querySelector('section[aria-label="Related practical guides"]')?.querySelectorAll("li")).toHaveLength(6);
    expect(doc.querySelector('section[aria-label="Plan the next part of your trip"]')).toBeNull();
    expect(doc.querySelector('section[aria-label="Other airport journey comparisons"]')).toBeNull();
    expect(doc.querySelectorAll('form[aria-label="Private airport transfer quote request"]')).toHaveLength(1);
    expect(doc.querySelector("#options")!.compareDocumentPosition(rail) & Node.DOCUMENT_POSITION_CONTAINED_BY).toBeTruthy();
    expect(rail.compareDocumentPosition(doc.querySelector("#option-taxi")!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(doc.querySelector("#request-quote")!.compareDocumentPosition(doc.querySelector("#sources")!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(doc.querySelector("nav[aria-label='On this page'] a[href='#option-rail']")).not.toBeNull();
    expect(doc.querySelector("nav[aria-label='On this page'] a[href='#station-choice']")).toBeNull();
    expect(doc.body.textContent).not.toMatch(/≈ ₪20–30|≈ ₪300–360/);
  });

  it("covers 2026 Haifa route choices and the narrow bus 905 operating window", () => {
    const g = airportJourneyGuides.haifa;
    expect(g.updatedAt).toBe("2026-11-23");
    expect(g.historicalPrices).toBe(false);
    expect(g.title).toMatch(/Ben Gurion Airport to Haifa.*Train.*Taxi.*Bus/);
    expect(g.stations.map(station => station.name).join(" ")).toMatch(/Hof HaCarmel.*Bat Galim.*HaShmona.*HaMifratz/s);
    expect(g.options.find(o => o.id === "bus")?.paragraphs.join(" ")).toMatch(/905.*Saturday night.*early Sunday/s);
    expect(g.stations).toHaveLength(4);
    expect(g.photos?.station.alt).toContain("Terminal 3");
    expect(g.photos?.onward.alt).toContain("German Colony");
    expect(g.sources).toHaveLength(6);
    expect(g.faqs).toHaveLength(10);
    expect(g.related).toHaveLength(6);
    expect(g.planNext).toHaveLength(4);
    expect(g.options.every(option => Boolean(option.comparison?.advantages && option.comparison?.drawbacks))).toBe(true);
    expect(g.weekend.join(" ")).toContain("The former Amal shared airport taxi service to Haifa has ended.");
    expect(g.options.find(o => o.id === "rail")?.cost).toContain("₪");
    expect(g.options.find(o => o.id === "bus")?.cost).not.toContain("₪");
    expect(g.options.find(o => o.id === "taxi")?.cost).toMatch(/meter/i);
    expect(g.options.find(o => o.id === "bus")?.paragraphs.join(" ")).toMatch(/live timetable and boarding stop/);
    for (const option of g.options) {
      expect(option.inlineLinks?.length).toBeGreaterThan(0);
      for (const link of option.inlineLinks || []) {
        expect(option.paragraphs.join(" ").split(link.text), link.text).toHaveLength(2);
      }
    }
    for (const link of g.weekendLinks || []) {
      expect(g.weekend.join(" ").split(link.text)).toHaveLength(2);
    }
  });

  it("renders Haifa contextual links, images and separate private-booking CTA", async () => {
    const g = airportJourneyGuides.haifa;
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, history: createMemoryHistory({ initialEntries: [g.path] }), trailingSlash: "always" });
    await router.load();
    const html = renderToString(<RouterContextProvider router={router}><AirportJourneyPage id="haifa" /></RouterContextProvider>);
    const doc = new DOMParser().parseFromString(html, "text/html");
    expect(doc.querySelectorAll("figure img")).toHaveLength(4);
    for (const option of g.options) for (const link of option.inlineLinks || []) {
      const a = doc.querySelector(`#option-${option.id} a[href="${link.to}"]`);
      expect(a).not.toBeNull();
      expect(a?.closest("p")).not.toBeNull();
    }
    expect(doc.querySelector('section[aria-label="Related practical guides"]')).not.toBeNull();
    expect(doc.querySelector('#option-private a[href="#request-quote"]')).not.toBeNull();
    expect(doc.querySelector("#station-choice")).toBeNull();
    expect(doc.querySelectorAll('#option-rail table:not([data-testid="airport-arrival-areas"]) tbody tr')).toHaveLength(4);
    expect(doc.querySelector('section[aria-label="Related practical guides"]')?.querySelectorAll("li")).toHaveLength(6);
    expect(doc.querySelector('section[aria-label="Plan the next part of your trip"]')).toBeNull();
    expect(doc.querySelectorAll('#options p[data-testid="useful-journey-link"]')).toHaveLength(3);
    expect(doc.querySelector("#options")?.textContent).not.toContain("Before choosing this option");
    expect(doc.body.textContent).not.toMatch(/≈ ₪30–45|≈ ₪20–30|≈ ₪500–600/);
  });

  it("renders upgraded Ein Bokek advice, contextual links, two supporting photos and guide cards", async () => {
    const g = airportJourneyGuides["ein-bokek"];
    const router = createRouter({
      routeTree,
      context: { queryClient: new QueryClient() },
      history: createMemoryHistory({ initialEntries: [g.path] }),
      trailingSlash: "always",
    });
    await router.load();
    const html = renderToString(<RouterContextProvider router={router}><AirportJourneyPage id="ein-bokek" /></RouterContextProvider>);
    const doc = new DOMParser().parseFromString(html, "text/html");
    expect(doc.querySelectorAll("h1")).toHaveLength(1);
    expect(doc.querySelectorAll("figure img")).toHaveLength(4);
    expect(doc.querySelectorAll("table")).toHaveLength(3);
    expect(doc.querySelector("#option-alternative")).toBeNull();
    expect(g.updatedAt).toBe("2026-11-23");
    expect(g.title).toMatch(/^Ben Gurion Airport to Ein Bokek/);
    expect(g.related).toHaveLength(6);
    expect(g.planNext).toHaveLength(4);
    expect(g.faqs.length).toBeGreaterThanOrEqual(14);
    expect(g.options.every(option => Boolean(option.comparison?.advantages && option.comparison?.drawbacks))).toBe(true);
    expect(doc.querySelector("#station-choice")).toBeNull();
    expect(doc.querySelector("#comparison table thead tr")?.children).toHaveLength(5);
    expect(doc.querySelectorAll('#option-rail table:not([data-testid="airport-arrival-areas"]) tbody tr')).toHaveLength(4);
    expect(doc.querySelectorAll('#option-rail p[data-testid="useful-journey-link"]')).toHaveLength(3);
    expect(doc.querySelectorAll('#options p[data-testid="useful-journey-link"]')).toHaveLength(5);
    expect(doc.querySelector('#option-rail a[href="https://rail.co.il/?lan=en&page=vouchers-jerusalem"]')).not.toBeNull();
    expect(doc.querySelector('#option-rail a[href="https://www.egged.co.il/en/information-for-passengers/tickets-information"]')).not.toBeNull();
    expect(doc.querySelector('#option-rental a[href="https://ims.gov.il/en/warning"]')).not.toBeNull();
    expect(doc.querySelector('#option-rail a[href="/travel-blog/best-dead-sea-hotels/"]')).not.toBeNull();
    expect(doc.querySelector('#option-rail a[href="/travel-blog/ben-gurion-airport-to-tel-aviv/"]')).not.toBeNull();
    expect(doc.querySelector('section[aria-label="Related practical guides"]')?.querySelectorAll("li")).toHaveLength(6);
    expect(doc.querySelector('section[aria-label="Plan the next part of your trip"]')).toBeNull();
    expect(doc.querySelector("main")?.lastElementChild?.id).toBe("sources");

    for (const option of g.options) for (const link of option.inlineLinks || []) {
      const anchor = doc.querySelector(`#option-${option.id} a[href="${link.to}"]`);
      expect(anchor, option.id + " link " + link.text).not.toBeNull();
      expect(anchor?.closest("p")).not.toBeNull();
    }
    for (const link of g.weekendLinks || []) {
      expect(doc.querySelector(`#shabbat a[href="${link.to}"]`)).not.toBeNull();
    }
    expect(doc.querySelector('aside a[href="#request-quote"]')).not.toBeNull();
    expect(doc.querySelector('section[aria-label="Related practical guides"]')).not.toBeNull();
    expect(doc.querySelector('section[aria-label="Other airport journey comparisons"]')).toBeNull();
    expect(doc.querySelectorAll("#sources a")).toHaveLength(9);
    expect(doc.body.textContent).not.toMatch(/≈ ₪35–50|≈ ₪800–1,100/);
  });

  it("uses one compact private-ride callout linking to an in-page fixed-destination quote form on all four guides", async () => {
    for (const id of airportJourneyIds) {
      const g = airportJourneyGuides[id];
      const rateId = id === "ein-bokek" ? "dead-sea" : id;
      const router = createRouter({
        routeTree,
        context: { queryClient: new QueryClient() },
        history: createMemoryHistory({ initialEntries: [g.path] }),
        trailingSlash: "always",
      });
      await router.load();
      const html = renderToString(<RouterContextProvider router={router}><AirportJourneyPage id={id} /></RouterContextProvider>);
      const doc = new DOMParser().parseFromString(html, "text/html");
      const callouts = doc.querySelectorAll('aside[aria-label="Private transfer quote for ' + g.city + '"]');
      if (id === "jerusalem" || id === "tel-aviv" || id === "haifa" || id === "ein-bokek") {
        expect(callouts).toHaveLength(0);
        if (id === "jerusalem") expect(doc.querySelector('#option-rail aside[aria-label="Important Jerusalem train ticket information"]')).not.toBeNull();
        else expect(doc.querySelectorAll('#option-rail table:not([data-testid="airport-arrival-areas"]) tbody tr')).toHaveLength(4);
      } else {
        expect(callouts, id).toHaveLength(1);
        const cta = callouts[0]!;
        expect(cta.querySelector('a[href="#request-quote"]')?.textContent).toContain(g.privateLabel);
        expect(cta.querySelector('img[alt="Moshe Barak"]')).not.toBeNull();
        expect(cta.textContent).toContain("I'll help arrange a door-to-door airport pickup");
        expect(cta.compareDocumentPosition(doc.querySelector("#station-choice")!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
      }
      expect(doc.querySelector('#option-private a[href="#request-quote"]')).not.toBeNull();
      const quote = doc.querySelector("section#request-quote");
      expect(quote, id + ": missing form section").not.toBeNull();
      expect(doc.querySelectorAll('form[aria-label="Private airport transfer quote request"]')).toHaveLength(1);
      expect(quote?.querySelector('input[name="destination"][readonly]')?.getAttribute("value")).toBe(g.city);
      expect(quote?.querySelector('input[name="date"]')).not.toBeNull();
      expect(quote?.querySelector('input[name="flight"]')).not.toBeNull();
      expect(quote?.querySelector('button[type="submit"]')).not.toBeNull();
      if (id === "jerusalem" || id === "tel-aviv" || id === "haifa" || id === "ein-bokek") {
        expect(doc.querySelector("main")?.lastElementChild?.id).toBe("sources");
        expect(doc.querySelector('#sources details:not([open])')).not.toBeNull();
      } else {
        expect(doc.querySelector("main")?.lastElementChild?.id).toBe("request-quote");
      }
      expect(doc.querySelector('nav[aria-label="On this page"] a[href="#request-quote"]')).not.toBeNull();
      expect(doc.body.textContent).not.toContain("The private-transfer page lists its own weekday starting price and conditions.");
      expect(doc.body.textContent).not.toContain("I operate the private transport service promoted on this site;");
      expect(doc.querySelectorAll('aside[aria-label^="Private transfer quote"]')).toHaveLength(0);
      expect(rateId === "dead-sea" ? g.city.includes("Ein Bokek") : g.city.length > 0).toBe(true);
      expect(doc.querySelectorAll("#sources details")).toHaveLength(1);
    }
  }, 30000);

  it("links holiday planning and keeps editorial images below their section introductions", async () => {
    for (const id of airportJourneyIds) {
      const g = airportJourneyGuides[id];
      const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, history: createMemoryHistory({ initialEntries: [g.path] }), trailingSlash: "always" });
      await router.load();
      const html = renderToString(<RouterContextProvider router={router}><AirportJourneyPage id={id} /></RouterContextProvider>);
      const doc = new DOMParser().parseFromString(html, "text/html");
      expect(doc.querySelectorAll('#shabbat a[href="/travel-blog/calendar-of-events/"]'), id).toHaveLength(1);
      if (id === "tel-aviv") {
        const hotelTitle = [...doc.querySelectorAll("#option-rail h4")].find(el => el.textContent?.includes("From the station to the beach"))!;
        expect(hotelTitle.nextElementSibling?.tagName).toBe("P");
        expect(hotelTitle.nextElementSibling?.nextElementSibling?.tagName).toBe("FIGURE");
        expect(doc.querySelectorAll("#option-rail figure img")).toHaveLength(2);
      }
      if (id === "haifa") {
        const heading = [...doc.querySelectorAll("#option-rail h4")].find(el => el.textContent?.includes("From the station to your hotel"))!;
        expect(heading.nextElementSibling?.tagName).toBe("P");
        expect(heading.nextElementSibling?.nextElementSibling?.tagName).toBe("FIGURE");
        expect(doc.querySelectorAll("#option-rail figure img")).toHaveLength(2);
      }
      if (id === "ein-bokek") {
        expect(doc.querySelector("#station-choice")).toBeNull();
        const hotelHeading = [...doc.querySelectorAll("#option-rail h4")].find(el => el.textContent?.includes("Get off at the correct Dead Sea hotel stop"))!;
        expect(hotelHeading.nextElementSibling?.tagName).toBe("P");
        expect(hotelHeading.nextElementSibling?.nextElementSibling?.tagName).toBe("FIGURE");
        expect(doc.querySelectorAll("#option-rail figure img")).toHaveLength(2);
      }
      const related = doc.querySelector('section[aria-label="Related practical guides"]');
      if (related) {
        const cards = [...related.querySelectorAll("ul > li")];
        if (cards.length === 6) expect(related.querySelector("ul")?.classList.contains("lg:grid-cols-3")).toBe(true);
        const photos = [...related.querySelectorAll("li img")].map(img => img.getAttribute("src") || "");
        expect(repeatedPhotos(photos), id).toEqual([]);
      }
    }
  }, 30000);

  it("keeps the four airport journey guides concise, linked and free of duplicate FAQs", () => {
    const jerusalem = airportJourneyGuides.jerusalem;
    const telAviv = airportJourneyGuides["tel-aviv"];
    const haifa = airportJourneyGuides.haifa;
    const deadSea = airportJourneyGuides["ein-bokek"];

    expect(jerusalem.intro).toContain("The best option depends on your arrival time");
    expect(jerusalem.options.find(o => o.id === "rail")?.checklist).toContain("Plan how to get from Yitzhak Navon station to your hotel.");
    expect(jerusalem.options.find(o => o.id === "rail")?.paragraphs.join(" ")).not.toContain("voucher instructions and official railway links follow here");
    expect(telAviv.intro).toContain("where you're staying");
    expect(telAviv.faqs).toHaveLength(10);
    expect(telAviv.faqs.some(faq => faq.q.includes("Can I walk from Tel Aviv railway station"))).toBe(false);
    expect(telAviv.weekend.join(" ")).not.toContain("old shared-taxi descriptions");
    expect(haifa.faqs).toHaveLength(10);
    expect(haifa.faqs.filter(faq => /bus 905/i.test(faq.q))).toHaveLength(3);
    expect(haifa.faqs.filter(faq => /cruise|Haifa Port/i.test(faq.q))).toHaveLength(1);
    expect(haifa.faqs.some(faq => faq.q === "When does airport bus 905 run?")).toBe(true);
    expect(haifa.faqs.some(faq => faq.q === "How do I get from Ben Gurion Airport to Haifa's cruise terminal?")).toBe(true);
    expect(deadSea.exampleJourney.takeaway).toContain("The train and bus are separate services");
    expect(deadSea.options.find(o => o.id === "rail")?.paragraphs.join(" ")).not.toContain("interchange");
    expect(deadSea.options.find(o => o.id === "rail")?.paragraphs.join(" ")).not.toContain("reserved-seat bus 421");
    expect(deadSea.faqs.some(faq => faq.q === "Is bus 421 via Tel Aviv a good alternative?")).toBe(true);
    for (const guide of [jerusalem, telAviv, haifa, deadSea]) {
      expect(guide.intro).not.toContain("In this guide, I compare");
      expect(new Set(guide.faqs.map(faq => faq.q)).size).toBe(guide.faqs.length);
      for (const option of guide.options) for (const link of option.inlineLinks ?? []) {
        expect(option.paragraphs.join(" ").split(link.text), guide.id + ": " + link.text).toHaveLength(2);
      }
    }
  });

  it("keeps destination-area tables and six linked featured-image cards on all four guides", async () => {
    for (const id of airportJourneyIds) {
      const guide = airportJourneyGuides[id];
      expect(guide.arrivalAreas.length).toBeGreaterThanOrEqual(3);
      expect(guide.featuredRelated).toHaveLength(6);
      const router = createRouter({
        routeTree, context: { queryClient: new QueryClient() },
        history: createMemoryHistory({ initialEntries: [guide.path] }),
        trailingSlash: "always",
      });
      await router.load();
      const html = renderToString(<RouterContextProvider router={router}><AirportJourneyPage id={id} /></RouterContextProvider>);
      const doc = new DOMParser().parseFromString(html, "text/html");
      expect(doc.querySelector('header figure img')?.getAttribute("src")).toBe(guide.photo.src);
      const arrival = doc.querySelector<HTMLTableElement>('#option-rail table[data-testid="airport-arrival-areas"]');
      expect(arrival, id + ": missing area connections").not.toBeNull();
      expect(arrival!.querySelectorAll("tbody tr")).toHaveLength(guide.arrivalAreas.length);
      expect(arrival!.closest('[role="region"]')?.className).toContain("overflow-x-auto");

      const related = doc.querySelector('[data-testid="airport-related-guides"]')!;
      const grid = related.querySelector("ul")!;
      expect(grid.className).toContain("grid-cols-2");
      expect(grid.className).toContain("lg:grid-cols-3");
      const cards = [...grid.querySelectorAll("li > a")];
      expect(cards).toHaveLength(6);
      const cardPhotos = cards.map((card, i) => {
        const linked = guide.featuredRelated[i]!;
        expect(card.getAttribute("href")).toBe(linked.to);
        const pageHero = guideHeroPhotoForPath(String(linked.to));
        expect(pageHero, id + ": missing featured image for " + linked.to).toBeDefined();
        const img = card.querySelector("img");
        expect(img?.getAttribute("src")).toBe(pageHero?.src);
        expect(img?.getAttribute("alt")).toBe(pageHero?.alt);
        return img?.getAttribute("src") || "";
      });
      expect(repeatedPhotos(cardPhotos), id).toEqual([]);
      expect(new Set(cardPhotos).size).toBe(6);
      expect(doc.body.textContent).not.toContain("Practical choice:");
      expect(doc.body.textContent).not.toContain("Example only — check");
    }
  }, 30000);

  it("does not invent live transport fares or claim rail on Shabbat", () => {
    for (const id of airportJourneyIds) {
      const g = airportJourneyGuides[id];
      expect(g.weekend.join(" ")).toMatch(/Shabbat/);
      expect(g.options.find(o => o.id === "private")?.cost).toContain("quote");
      expect(g.options.find(o => o.id === "taxi")?.cost).toMatch(/meter/i);
    }
    expect(airportJourneyGuides["ein-bokek"].answer).toContain("connect to bus");
    expect(airportJourneyGuides["tel-aviv"].options.find(o => o.id === "weekend")?.name).toContain("711");
  });
});
