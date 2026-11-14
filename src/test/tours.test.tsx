import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, isRedirect, RouterContextProvider } from "@tanstack/react-router";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";
import { Route as HubRoute } from "@/routes/tours.index";
import { Route as LegacyBethlehemRoute } from "@/routes/tours.bethlehem-from-jerusalem";
import { tourCategoryMeta } from "@/components/TourCategoryPage";
import { CurrencyRatesContext } from "@/components/CurrencyRates";
import { affiliateConfig, initialReferenceFx, operators, sources, tourBookingOffers, tourProducts, travelGuidePaths } from "@/data/registry";
import { guideDirectory } from "@/data/travelGuides";
import { tourCategories, tourCategoryPaths, tourPhotos } from "@/data/tours";
import homepageCruise from "@/assets/home/cruise-port.webp";
import { repeatedPhotos } from "@/lib/photo-uniqueness";
import { parseTourHubSearch, filterTours, isOwnerTour, offersForTour, parseTourSearch, tourSnapshotPrice, toursForCategory } from "@/lib/tours";
import { CANONICAL_ORIGIN } from "@/lib/site";
import { parsePrivateDriverSearch, privateTourPrefill } from "@/lib/private-driver-search";
import { readOutboundClicks } from "@/lib/outbound";

const historySubscriptions: (() => void)[] = [];
afterEach(() => { cleanup(); historySubscriptions.splice(0).forEach(unsubscribe => unsubscribe()); localStorage.clear(); });
function routerAt(path: string) {
  return createRouter({ routeTree, context: { queryClient: new QueryClient() }, history: createMemoryHistory({ initialEntries: [path] }), trailingSlash: "always" });
}
async function renderPage(path: string) {
  const router = routerAt(path);
  await router.load();
  // Direct leaf rendering omits Transitioner; mirror its history subscription.
  historySubscriptions.push(router.history.subscribe(router.load));
  const routeId = router.matchRoutes(router.state.location.pathname).at(-1)!.routeId;
  const Page = router.routesById[routeId]!.options.component!;
  // Use valid, deterministic exchange-rate values for rendering assertions.
  // The app deliberately hides USD/EUR estimates if its cached rates expire.
  const now = new Date().toISOString();
  const testRates = { ...initialReferenceFx, publishedAt: now.slice(0, 10), checkedAt: now };
  render(<RouterContextProvider router={router}><CurrencyRatesContext.Provider value={{ rates: testRates, status: "fresh", loading: false }}><Page /></CurrencyRatesContext.Provider></RouterContextProvider>);
  return router;
}

describe("shared ordinary tour catalog", () => {
  it("avoids repeated editorial photos but retains Moshe portraits at separated top and bottom sections", async () => {
    const router = routerAt(tourCategoryPaths.jerusalem);
    await router.load();
    const matched = router.matchRoutes(tourCategoryPaths.jerusalem).at(-1)!;
    const Page = router.routesById[matched.routeId]!.options.component!;
    const doc = new DOMParser().parseFromString(
      renderToString(<RouterContextProvider router={router}><Page /></RouterContextProvider>),
      "text/html",
    );
    const author = doc.querySelector('[data-testid="author-card"]')!;
    const contact = doc.querySelector("section#contact")!;
    const topPortrait = author.querySelector('img[data-photo-role="author-portrait"]')!;
    const bottomPortrait = contact.querySelector('img[data-photo-role="contact-portrait"]')!;
    expect(topPortrait).not.toBeNull();
    expect(bottomPortrait).not.toBeNull();
    expect(topPortrait.getAttribute("src")).toBe(bottomPortrait.getAttribute("src"));
    const interveningSections = [...doc.querySelectorAll("main section")].filter(section =>
      !!(author.compareDocumentPosition(section) & Node.DOCUMENT_POSITION_FOLLOWING) &&
      !!(section.compareDocumentPosition(contact) & Node.DOCUMENT_POSITION_FOLLOWING)
    );
    expect(interveningSections.length).toBeGreaterThanOrEqual(3);
    const allImages = [...doc.querySelectorAll("main img")];
    expect(allImages.length).toBeGreaterThanOrEqual(18);
    const editorialSources = allImages.filter(image => !image.hasAttribute("data-photo-role")).map(image => image.getAttribute("src") || "");
    expect(repeatedPhotos(editorialSources)).toEqual([]);
  });

  it("keeps product, operator, booking channel and source identities separate and complete", () => {
    expect(new Set(tourProducts.map(tour => tour.id)).size).toBe(tourProducts.length);
    expect(new Set(tourBookingOffers.map(offer => offer.id)).size).toBe(tourBookingOffers.length);
    for (const tour of tourProducts) {
      expect(operators.some(operator => operator.id === tour.operatorId), tour.id).toBe(true);
      expect(tour.originIds.length).toBeGreaterThan(0);
      expect(tour.destinationIds.length).toBeGreaterThan(0);
      expect(tour.tagIds.length).toBeGreaterThan(0);
      expect(tourPhotos[tour.id]?.alt.length, tour.id).toBeGreaterThan(10);
      if (!isOwnerTour(tour)) expect(offersForTour(tour.id).length, tour.id).toBeGreaterThan(0);
    }
    for (const offer of tourBookingOffers) {
      expect(tourProducts.some(tour => tour.id === offer.productId && !isOwnerTour(tour))).toBe(true);
      expect(["getyourguide.com", "viator.com"]).toContain(new URL(offer.publicUrl).hostname.replace(/^www\./, ""));
      expect(sources.find(source => source.id === offer.id)).toMatchObject({ url: offer.publicUrl, checkedAt: offer.checkedAt });
    }
    for (const category of tourCategories) {
      const products = toursForCategory(category.id);
      expect(products.filter(tour => !isOwnerTour(tour)).length, category.id).toBeGreaterThanOrEqual(2);
      expect(new Set(products.map(tour => tourPhotos[tour.id]!.src)).size, category.id).toBe(products.length);
    }
  });

  it("reuses the same object and affiliate configuration across destination and experience pages", () => {
    const fromCity = toursForCategory("tel-aviv-jaffa").find(tour => tour.id === "jaffa-carmel-walk")!;
    const fromFood = toursForCategory("food-markets").find(tour => tour.id === fromCity.id)!;
    expect(fromFood).toBe(fromCity);
    const offer = offersForTour(fromCity.id)[0]!;
    const before = affiliateConfig[offer.id];
    try {
      affiliateConfig[offer.id] = { trackingUrl: "https://www.getyourguide.com/test-approved-product/?partner_id=example" };
      for (const tour of [fromCity, fromFood]) expect(offersForTour(tour.id)[0]!.provider).toMatchObject({ url: affiliateConfig[offer.id]!.trackingUrl, isAffiliate: true });
    } finally { affiliateConfig[offer.id] = before; }
    expect(offersForTour(fromCity.id)[0]!.provider.isAffiliate).toBe(false);
  });

  it("distinguishes origins from destinations and intersects valid filters without changing the registry", () => {
    expect(filterTours("jerusalem", { origin: "tel-aviv" }).every(tour => tour.originIds.includes("tel-aviv") && tour.destinationIds.includes("jerusalem"))).toBe(true);
    expect(filterTours("jerusalem", { origin: "eilat" })).toEqual([]);
    const food = filterTours("jerusalem", { tag: "food", length: "short", q: "market" });
    expect(food.map(tour => tour.id)).toEqual(["jerusalem-beyond-walls", "mahane-yehuda-tasting"]);
    expect(filterTours("tel-aviv-jaffa", { q: "street art" }).map(tour => tour.id)).toContain("tel-aviv-street-art");
    expect(filterTours("masada-dead-sea", { destination: "ein-gedi", format: "independent" }).map(tour => tour.id)).toEqual(["masada-ein-gedi-dead-sea"]);
    const original = [...tourProducts];
    expect(filterTours("jerusalem", { sort: "duration" })[0]!.id).toBe("jerusalem-street-art-walk");
    expect(tourProducts).toEqual(original);
    expect(parseTourSearch({ origin: "bogus", supplier: "viator", q: "a".repeat(100), format: ["private"], sort: "price" })).toEqual({ q: "a".repeat(80) });
  });

  it("expires reference prices and rejects future, invalid and mismatched snapshots", () => {
    const offer = tourBookingOffers.find(offer => offer.productId === "eilat-glass-bottom-boat")!;
    const now = new Date("2026-10-22T12:00:00Z");
    expect(tourSnapshotPrice(offer, now)?.amount).toBe(24);
    expect(tourSnapshotPrice(offer, new Date("2026-11-23T00:00:00Z"))).toBeUndefined();
    expect(tourSnapshotPrice(offer, new Date("2026-10-21T00:00:00Z"))).toBeUndefined();
    expect(tourSnapshotPrice({ ...offer, listedPrice: { ...offer.listedPrice!, amount: NaN } }, now)).toBeUndefined();
    expect(tourSnapshotPrice({ ...offer, listedPrice: { ...offer.listedPrice!, sourceId: "unrelated" } }, now)).toBeUndefined();
    expect(tourSnapshotPrice({ ...offer, listedPrice: { ...offer.listedPrice!, basis: "per_group" } }, now)).toBeUndefined();
  });
});

describe("tours hub and SEO category pages", () => {
  it("keeps the published two-city private coastal transport rates and source identities", () => {
    for (const [id, origin, amount, duration] of [
      ["my-north-coast-day", "tel-aviv", 2000, 540],
      ["my-north-coast-jerusalem", "jerusalem", 2700, 600],
    ] as const) {
      const tour = tourProducts.find(tour => tour.id === id)!;
      expect(tour.originIds).toEqual([origin]);
      expect(tour.durationMinutes).toBe(duration);
      expect(tour.price).toMatchObject({ kind: "published_starting_rate", amount, currency: "ILS", basis: "per_vehicle", maxPartySize: 4 });
      const source = sources.find(source => source.id === tour.price!.sourceId)!;
      expect(source).toMatchObject({ publisher: "Israel-Taxi.com (Moshe Barak)", checkedAt: "2026-10-22" });
      expect(privateTourPrefill(parsePrivateDriverSearch({ tour: id }))?.itinerary).toContain(origin === "tel-aviv" ? "Tel Aviv" : "Jerusalem");
    }
  });

  it("shows a category gateway with two linked examples each and no owner-promotion block", async () => {
    const router = await renderPage("/tours/");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(document.querySelector('[data-section="moshe-private-tours"]')).toBeNull();
    expect(screen.queryByRole("link", { name: "Plan a private day with me" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Explore tour categories" })).not.toBeInTheDocument();
    expect(document.querySelector("main header .btn")).toBeNull();
    expect(screen.getByTestId("hub-header").querySelector("[data-testid=\"author-card\"]")).toBeInTheDocument();
    expect(screen.getByTestId("hub-header").querySelector("[data-testid=\"guide-hero-media\"]")).toBeNull();
    expect(document.querySelector("main")!.textContent).not.toContain("GetYourGuide");
    expect(document.querySelector("main")!.textContent).not.toContain("Viator");
    const categories = document.querySelectorAll("[data-category-id]");
    expect(categories).toHaveLength(8);
    for (const category of categories) {
      const examples = category.querySelectorAll("[data-product-id]");
      expect(examples).toHaveLength(2);
      for (const example of examples) {
        const link = example.querySelector("a")!;
        const url = new URL(link.href);
        expect(router.matchRoutes(url.pathname).at(-1)?.routeId.replace(/\/$/, "")).toBe(url.pathname.replace(/\/$/, ""));
        expect(url.hash).toBe("#" + example.getAttribute("data-product-id"));
      }
    }
    expect(document.querySelector("a a")).toBeNull();
    expect(screen.getByRole("region", { name: "Inspiration for your next day out" }).querySelectorAll("article")).toHaveLength(4);
    const planning = screen.getByRole("region", { name: "More help planning your trip" });
    expect(within(planning).getAllByRole("article")).toHaveLength(6);
    expect(within(planning).getAllByRole("img")).toHaveLength(6);
    expect(within(planning).getAllByRole("link").every(link => link.textContent === "Read More")).toBe(true);
    expect(planning.querySelector('a[href*="shore-excursions"]')).toBeNull();
    for (const link of planning.querySelectorAll("a")) expect(router.matchRoutes(link.getAttribute("href")!).at(-1)?.routeId.replace(/\/$/, "")).toBe(link.getAttribute("href")!.replace(/\/$/, ""));
    const cruise = screen.getByRole("region", { name: "Arriving in Israel on a cruise?" });
    expect(within(cruise).getByRole("img")).toHaveAttribute("src", homepageCruise);
    expect(within(cruise).getAllByRole("link").map(link => link.getAttribute("href"))).toEqual(["/haifa-shore-excursions/", "/ashdod-shore-excursions/"]);

  });

  it("renders every complete category and resolves all guide, category and product-anchor links", async () => {
    for (const category of tourCategories) {
      const router = routerAt(tourCategoryPaths[category.id]);
      await router.load();
      const matched = router.matchRoutes(tourCategoryPaths[category.id]).at(-1)!;
      const Page = router.routesById[matched.routeId]!.options.component!;
      const doc = new DOMParser().parseFromString(renderToString(<RouterContextProvider router={router}><Page /></RouterContextProvider>), "text/html");
      expect(doc.querySelectorAll("h1"), category.id).toHaveLength(1);
      expect(doc.querySelectorAll('[data-testid="tour-card"]').length, category.id).toBeGreaterThanOrEqual(2);
      if (category.id === "jerusalem" || category.id === "tel-aviv-jaffa" || category.id === "masada-dead-sea" || category.id === "bethlehem-jericho" || category.id === "nazareth-galilee" || category.id === "northern-coast") {
        const localId = category.id === "jerusalem" ? "jerusalem-local-h" : category.id === "tel-aviv-jaffa" ? "tel-aviv-local-h" : category.id === "masada-dead-sea" ? "masada-local-h" : category.id === "bethlehem-jericho" ? "bethlehem-local-h" : category.id === "nazareth-galilee" ? "galilee-local-h" : "northern-coast-local-h";
        const planningId = category.id === "jerusalem" ? "jerusalem-planning-h" : category.id === "tel-aviv-jaffa" ? "tel-aviv-planning-h" : category.id === "masada-dead-sea" ? "masada-planning-h" : category.id === "bethlehem-jericho" ? "bethlehem-planning-h" : category.id === "nazareth-galilee" ? "galilee-planning-h" : "northern-coast-planning-h";
        expect(doc.querySelectorAll(`section[aria-labelledby="${localId}"] a.group img`)).toHaveLength(6);
        expect(doc.querySelectorAll(`section[aria-labelledby="${planningId}"] a.group`)).toHaveLength(6);
      } else {
        expect(doc.querySelectorAll('section[aria-label="Get to know the places on your itinerary"] article')).toHaveLength(4);
      }
      for (const link of doc.querySelectorAll('main a[href^="/"]')) {
        const url = new URL(link.getAttribute("href")!, CANONICAL_ORIGIN);
        expect(router.matchRoutes(url.pathname).at(-1)?.routeId.replace(/\/$/, ""), link.outerHTML).toBe(url.pathname.replace(/\/$/, ""));
      }
      for (const card of doc.querySelectorAll('[data-testid="tour-card"]')) {
        const id = card.getAttribute("data-product-id")!;
        expect(card.id).toBe(id);
        const tour = tourProducts.find(tour => tour.id === id)!;
        expect(tour.operatorId).not.toBe("moshe-barak");
        if (category.id !== "jerusalem" && category.id !== "tel-aviv-jaffa" && category.id !== "masada-dead-sea" && category.id !== "bethlehem-jericho" && category.id !== "nazareth-galilee" && category.id !== "northern-coast") expect(card.textContent).toContain("Operated by");
        else expect(card.textContent).toMatch(/Viator|GetYourGuide/);
        for (const link of card.querySelectorAll('a[target="_blank"]')) {
          expect(link.getAttribute("rel")?.split(/\s+/)).toEqual(expect.arrayContaining(["noopener", "noreferrer"]));
        }
      }
      if (category.id === "jerusalem" || category.id === "tel-aviv-jaffa" || category.id === "masada-dead-sea" || category.id === "bethlehem-jericho" || category.id === "nazareth-galilee" || category.id === "northern-coast") {
        const localId = category.id === "jerusalem" ? "jerusalem-local-h" : category.id === "tel-aviv-jaffa" ? "tel-aviv-local-h" : category.id === "masada-dead-sea" ? "masada-local-h" : category.id === "bethlehem-jericho" ? "bethlehem-local-h" : category.id === "nazareth-galilee" ? "galilee-local-h" : "northern-coast-local-h";
        const more = doc.querySelector(`section[aria-labelledby="${localId}"]`)!;
        expect(more).not.toBeNull();
        expect(more.querySelectorAll("a.group img")).toHaveLength(6);
        expect(doc.querySelector('section[aria-labelledby="more-tour-categories-h"]')).toBeNull();
      } else {
        const more = doc.querySelector('section[aria-labelledby="more-tour-categories-h"]')!;
        expect(more.querySelectorAll("article")).toHaveLength(8);
        expect(more.querySelectorAll("img")).toHaveLength(8);
        expect(more.querySelector(`a[href="${tourCategoryPaths[category.id]}"]`)).toBeNull();
        expect(more.querySelector('a[href="/tours/"]')).not.toBeNull();
      }
            const owner = doc.querySelector('[data-section="moshe-private-tours"]');
      expect(doc.querySelector("#external-tours-h")?.textContent).toBe(category.id === "jerusalem" || category.id === "tel-aviv-jaffa" || category.id === "masada-dead-sea" || category.id === "bethlehem-jericho" || category.id === "nazareth-galilee" || category.id === "northern-coast" ? `Explore ${category.shortTitle} tours` : `${owner ? "More " : ""}${category.title}`);
      expect(doc.body.textContent).not.toMatch(/Other operators' tours & experiences|Independent tour providers/);
      if (owner) {
        expect(owner.className).not.toContain("bg-navy");
        expect(owner.textContent).not.toContain("Arrange directly with me");
        for (const card of owner.querySelectorAll('[data-testid="owner-tour-card"]')) {
          if (category.id === "jerusalem" || category.id === "tel-aviv-jaffa" || category.id === "masada-dead-sea" || category.id === "bethlehem-jericho" || category.id === "nazareth-galilee" || category.id === "northern-coast") {
            expect(card.querySelector('a[href="#contact"]')).not.toBeNull();
          } else {
            const link = card.querySelector('a[href^="/private-driver/?tour="]')!;
            expect(new URL(link.getAttribute("href")!, CANONICAL_ORIGIN).searchParams.get("tour")).toBe(card.getAttribute("data-product-id"));
          }
          if (category.id !== "jerusalem" && category.id !== "tel-aviv-jaffa" && category.id !== "masada-dead-sea" && category.id !== "bethlehem-jericho" && category.id !== "nazareth-galilee" && category.id !== "northern-coast") expect(card.querySelector("dl")?.textContent).toContain("Includes:");
          else expect(card.textContent).toContain("Private car & driver");
        }
      }
      expect(doc.querySelector("a a")).toBeNull();
    }
  });

  it("filters the gateway with destination tags, forwards the destination and restores history", async () => {
    const router = await renderPage("/tours/?destination=jerusalem&q=food&origin=tel-aviv");
    expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    const tags = screen.getByRole("navigation", { name: "Filter tour categories by destination" });
    expect(within(tags).getByRole("button", { name: "Jerusalem" })).toHaveAttribute("aria-pressed", "true");
    expect([...document.querySelectorAll("[data-category-id]")].map(card => card.getAttribute("data-category-id"))).toEqual(["jerusalem", "bethlehem-jericho", "food-markets"]);
    fireEvent.click(within(tags).getByRole("button", { name: "Masada" }));
    await waitFor(() => expect(router.state.location.search).toEqual({ destination: "masada" }));
    expect(document.querySelectorAll("[data-category-id]")).toHaveLength(1);
    for (const example of document.querySelectorAll("[data-product-id]")) expect(tourProducts.find(tour => tour.id === example.getAttribute("data-product-id"))!.destinationIds).toContain("masada");
    const categoryLink = document.querySelector('[data-category-id="masada-dead-sea"] a.btn')!;
    expect(new URL(categoryLink.getAttribute("href")!, CANONICAL_ORIGIN).searchParams.get("destination")).toBe("masada");
    fireEvent.click(within(tags).getByRole("button", { name: "Masada" }));
    await waitFor(() => expect(document.querySelectorAll("[data-category-id]")).toHaveLength(8));
    expect(within(tags).getByRole("button", { name: "All destinations" })).toHaveAttribute("aria-pressed", "true");
    router.history.back();
    await waitFor(() => expect(within(tags).getByRole("button", { name: "Masada" })).toHaveAttribute("aria-pressed", "true"));
    fireEvent.click(within(tags).getByRole("button", { name: "All destinations" }));
    await waitFor(() => expect(router.state.location.search).toEqual({}));
    expect(parseTourHubSearch({ q: "food", origin: "tel-aviv", destination: "unknown" })).toEqual({});
  });

  it("matches the compact Jerusalem pattern for Tel Aviv, including eight tracked bookings and a blank bottom contact form", async () => {
    const router = await renderPage("/tours/tel-aviv-jaffa/");
    const nav = screen.getByRole("navigation", { name: "Filter Tel Aviv & Jaffa tours" });
    const externalCards = screen.getAllByTestId("tour-card");
    expect(externalCards).toHaveLength(8);
    const trackingLinks = externalCards.map(card => within(card).getByRole("link", { name: "View tour ↗" }));
    expect(new Set(trackingLinks.map(link => link.getAttribute("href"))).size).toBe(8);
    for (const link of trackingLinks) {
      expect(new URL(link.getAttribute("href")!).hostname).toMatch(/^(viator|getyourguide)\.tpm\.li$/);
      expect(link.getAttribute("rel")).toContain("sponsored");
    }
    expect(screen.getByTestId("author-card")).toBeInTheDocument();
    const local = document.querySelector('section[aria-labelledby="tel-aviv-local-h"]')!;
    const planning = document.querySelector('section[aria-labelledby="tel-aviv-planning-h"]')!;
    expect(local.querySelectorAll("a.group img")).toHaveLength(6);
    expect(new Set([...local.querySelectorAll("a.group img")].map(image => image.getAttribute("src"))).size).toBe(6);
    expect(planning.querySelectorAll("a.group")).toHaveLength(6);
    const owner = document.querySelector('[data-section="moshe-private-tours"]')!;
    expect(owner.querySelectorAll('[data-testid="owner-tour-card"]')).toHaveLength(1);
    expect(owner.querySelector('a[href="#contact"]')).not.toBeNull();
    const contact = document.querySelector("section#contact")!;
    expect(contact.querySelector('[data-photo-role="contact-portrait"]')).not.toBeNull();
    expect(contact.querySelector('input[name="subject"]')).toHaveValue("");
    expect(contact.querySelector('textarea[name="message"]')).toHaveValue("");
    const localSources = [...document.querySelectorAll('main img')].filter(image => !image.hasAttribute("data-photo-role")).map(image => image.getAttribute("src") || "");
    expect(repeatedPhotos(localSources)).toEqual([]);
    fireEvent.click(within(nav).getByRole("button", { name: "Food & markets" }));
    await waitFor(() => expect(router.state.location.search).toEqual({ tag: "food" }));
    expect(screen.getAllByTestId("tour-card")).toHaveLength(2);
    fireEvent.click(within(nav).getByRole("button", { name: "Private" }));
    await waitFor(() => expect(router.state.location.search).toEqual({ format: "private" }));
    expect(screen.queryAllByTestId("tour-card")).toHaveLength(0);
    expect(screen.getAllByTestId("owner-tour-card")).toHaveLength(1);
    fireEvent.click(within(nav).getByRole("button", { name: "All tours" }));
    await waitFor(() => expect(router.state.location.search).toEqual({}));
    expect(screen.getAllByTestId("tour-card")).toHaveLength(8);
  });

  it("uses the shared compact Masada design with eight exact affiliate tours, six local cards and two private journeys", async () => {
    const router = await renderPage("/tours/masada-dead-sea/");
    const nav = screen.getByRole("navigation", { name: "Filter Masada & the Dead Sea tours" });
    const external = screen.getAllByTestId("tour-card");
    expect(external).toHaveLength(8);
    const ids = external.map(card => card.getAttribute("data-product-id")!);
    expect(new Set(ids).size).toBe(8);
    for (const card of external) {
      const tourId = card.getAttribute("data-product-id")!;
      const link = within(card).getByRole("link", { name: "View tour ↗" });
      const offer = offersForTour(tourId, "tours-masada-dead-sea")[0]!;
      expect(link).toHaveAttribute("href", offer.provider.url);
      expect(new URL(offer.provider.url).hostname).toMatch(/^(viator|getyourguide)\.tpm\.li$/);
      expect(link.getAttribute("rel")).toContain("sponsored");
      expect(link.getAttribute("rel")).toContain("noopener");
    }
    const owner = document.querySelector('[data-section="moshe-private-tours"]')!;
    expect(owner.querySelectorAll('[data-testid="owner-tour-card"]')).toHaveLength(2);
    expect(owner.querySelectorAll('a[href="#contact"]')).toHaveLength(2);
    const externalSection = document.querySelector('[data-section="external-tours"]')!;
    expect(externalSection.compareDocumentPosition(owner) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    for (const [id, city, price, minutes] of [
      ["my-masada-day", "tel-aviv", 2100, 540],
      ["my-masada-jerusalem", "jerusalem", 2100, 480],
    ] as const) {
      const tour = tourProducts.find(tour => tour.id === id)!;
      expect(tour.originIds).toEqual([city]);
      expect(tour.durationMinutes).toBe(minutes);
      expect(tour.price?.amount).toBe(price);
    }
    expect(screen.getByTestId("author-card")).toBeInTheDocument();
    const local = document.querySelector('section[aria-labelledby="masada-local-h"]')!;
    const planning = document.querySelector('section[aria-labelledby="masada-planning-h"]')!;
    expect(local.querySelectorAll("a.group img")).toHaveLength(6);
    expect(planning.querySelectorAll("a.group")).toHaveLength(6);
    const contact = document.querySelector("section#contact")!;
    expect(contact.querySelector('[data-photo-role="contact-portrait"]')).not.toBeNull();
    expect(contact.querySelector('input[name="subject"]')).toHaveValue("");
    expect(contact.querySelector('textarea[name="message"]')).toHaveValue("");
    const displayedPhotos = [...document.querySelectorAll('main img')].filter(img => !img.hasAttribute("data-photo-role")).map(img => img.getAttribute("src") || "");
    expect(repeatedPhotos(displayedPhotos)).toEqual([]);
    fireEvent.click(within(nav).getByRole("button", { name: "From Jerusalem" }));
    await waitFor(() => expect(router.state.location.search).toEqual({ origin: "jerusalem" }));
    expect(screen.getAllByTestId("tour-card")).toHaveLength(4);
    expect(screen.getAllByTestId("owner-tour-card")).toHaveLength(1);
    fireEvent.click(within(nav).getByRole("button", { name: "Sunrise hikes" }));
    await waitFor(() => expect(router.state.location.search).toEqual({ q: "sunrise" }));
    expect(screen.getAllByTestId("tour-card")).toHaveLength(2);
    fireEvent.click(within(nav).getByRole("button", { name: "Dead Sea only" }));
    await waitFor(() => expect(router.state.location.search).toEqual({ q: "relaxation" }));
    expect(screen.getAllByTestId("tour-card")).toHaveLength(2);
    fireEvent.click(within(nav).getByRole("button", { name: "Private driver" }));
    await waitFor(() => expect(router.state.location.search).toEqual({ format: "private" }));
    expect(screen.queryAllByTestId("tour-card")).toHaveLength(0);
    expect(screen.getAllByTestId("owner-tour-card")).toHaveLength(2);
    fireEvent.click(within(nav).getByRole("button", { name: "All tours" }));
    await waitFor(() => expect(router.state.location.search).toEqual({}));
    expect(screen.getAllByTestId("tour-card")).toHaveLength(8);
  });


  it("uses the shared compact Galilee layout with eight tracked offers, two owner journeys, six local guides and responsive filters", async () => {
    const router = await renderPage("/tours/nazareth-sea-of-galilee/");
    const nav = screen.getByRole("navigation", { name: "Filter Nazareth & Sea of Galilee tours" });
    const external = screen.getAllByTestId("tour-card");
    expect(external).toHaveLength(8);
    const links: string[] = [];
    for (const card of external) {
      const id = card.getAttribute("data-product-id")!;
      const offer = offersForTour(id, "tours-nazareth-galilee")[0]!;
      const link = within(card).getByRole("link", { name: "View tour ↗" });
      expect(link).toHaveAttribute("href", offer.provider.url);
      expect(new URL(offer.provider.url).hostname).toMatch(/^(getyourguide|viator)\.tpm\.li$/);
      expect(link.getAttribute("rel")).toContain("sponsored");
      links.push(offer.provider.url);
    }
    expect(new Set(links).size).toBe(8);
    const owner = document.querySelector('[data-section="moshe-private-tours"]')!;
    expect(owner.querySelectorAll('[data-testid="owner-tour-card"]')).toHaveLength(2);
    expect(owner.querySelectorAll('a[href="#contact"]')).toHaveLength(2);
    expect(document.querySelector('[data-section="external-tours"]')!.compareDocumentPosition(owner) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    for (const [id, origin, price] of [
      ["my-galilee-day", "tel-aviv", 2300],
      ["my-galilee-jerusalem", "jerusalem", 2900],
    ] as const) {
      const tour = tourProducts.find(t => t.id === id)!;
      expect(tour.originIds).toEqual([origin]);
      expect(tour.price?.amount).toBe(price);
      expect(tour.formatLabel).toBe("Private car & driver");
    }
    expect(screen.getByTestId("author-card")).toBeInTheDocument();
    const local = document.querySelector('section[aria-labelledby="galilee-local-h"]')!;
    const planning = document.querySelector('section[aria-labelledby="galilee-planning-h"]')!;
    expect(local.querySelectorAll("a.group img")).toHaveLength(6);
    expect(planning.querySelectorAll("a.group")).toHaveLength(6);
    expect(local.textContent).toContain("Yardenit");
    const contact = document.querySelector("section#contact")!;
    expect(contact.querySelector('[data-photo-role="contact-portrait"]')).not.toBeNull();
    expect(contact.querySelector('input[name="subject"]')).toHaveValue("");
    expect(contact.querySelector('textarea[name="message"]')).toHaveValue("");
    expect(repeatedPhotos([...document.querySelectorAll("main img")].filter(img => !img.hasAttribute("data-photo-role")).map(img => img.getAttribute("src") || ""))).toEqual([]);
    fireEvent.click(within(nav).getByRole("button", { name: "From Jerusalem" }));
    await waitFor(() => expect(router.state.location.search).toEqual({ origin: "jerusalem" }));
    expect(screen.getAllByTestId("tour-card")).toHaveLength(4);
    expect(screen.getAllByTestId("owner-tour-card")).toHaveLength(1);
    fireEvent.click(within(nav).getByRole("button", { name: "Jordan River stop" }));
    await waitFor(() => expect(router.state.location.search).toEqual({ destination: "jordan-river" }));
    expect(screen.getAllByTestId("tour-card")).toHaveLength(7);
    fireEvent.click(within(nav).getByRole("button", { name: "Magdala" }));
    await waitFor(() => expect(router.state.location.search).toEqual({ q: "Magdala" }));
    expect(screen.getAllByTestId("tour-card")).toHaveLength(1);
    expect(screen.getByTestId("tour-card")).toHaveAttribute("data-product-id", "nazareth-magdala-private");
    fireEvent.click(within(nav).getByRole("button", { name: "Private tours" }));
    await waitFor(() => expect(router.state.location.search).toEqual({ format: "private" }));
    expect(screen.getAllByTestId("tour-card")).toHaveLength(3);
    expect(screen.getAllByTestId("owner-tour-card")).toHaveLength(2);
    fireEvent.click(within(nav).getByRole("button", { name: "All tours" }));
    await waitFor(() => expect(router.state.location.search).toEqual({}));
    expect(screen.getAllByTestId("tour-card")).toHaveLength(8);
  });

  it("uses the compact northern coast template with eight tracked tours, two owner drivers, six local guides and working chips", async () => {
    const router = await renderPage("/tours/caesarea-haifa-acre/");
    const nav = screen.getByRole("navigation", { name: "Filter Caesarea, Haifa & Acre tours" });
    const external = screen.getAllByTestId("tour-card");
    expect(external).toHaveLength(8);
    const links: string[] = [];
    for (const card of external) {
      const id = card.getAttribute("data-product-id")!;
      const offer = offersForTour(id, "tours-northern-coast")[0]!;
      const link = within(card).getByRole("link", { name: "View tour ↗" });
      expect(link).toHaveAttribute("href", offer.provider.url);
      expect(new URL(offer.provider.url).hostname).toMatch(/^(getyourguide|viator)\.tpm\.li$/);
      expect(link.getAttribute("rel")).toContain("sponsored");
      expect(link.getAttribute("rel")).toContain("noopener");
      links.push(offer.provider.url);
    }
    expect(new Set(links).size).toBe(8);
    const owner = document.querySelector('[data-section="moshe-private-tours"]')!;
    expect(owner.querySelectorAll('[data-testid="owner-tour-card"]')).toHaveLength(2);
    expect(owner.querySelectorAll('a[href="#contact"]')).toHaveLength(2);
    expect(document.querySelector('[data-section="external-tours"]')!.compareDocumentPosition(owner) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByTestId("author-card")).toBeInTheDocument();
    const local = document.querySelector('section[aria-labelledby="northern-coast-local-h"]')!;
    const planning = document.querySelector('section[aria-labelledby="northern-coast-planning-h"]')!;
    expect(local.querySelectorAll("a.group img")).toHaveLength(6);
    expect(planning.querySelectorAll("a.group")).toHaveLength(6);
    expect(local.textContent).toContain("Rosh Hanikra");
    expect(local.textContent).toContain("Akko");
    const contact = document.querySelector("section#contact")!;
    expect(contact.querySelector('[data-photo-role="contact-portrait"]')).not.toBeNull();
    expect(contact.querySelector('input[name="subject"]')).toHaveValue("");
    expect(contact.querySelector('textarea[name="message"]')).toHaveValue("");
    const images = [...document.querySelectorAll("main img")].filter(img => !img.hasAttribute("data-photo-role")).map(img => img.getAttribute("src") || "");
    expect(repeatedPhotos(images)).toEqual([]);
    fireEvent.click(within(nav).getByRole("button", { name: "From Jerusalem" }));
    await waitFor(() => expect(router.state.location.search).toEqual({ origin: "jerusalem" }));
    expect(screen.getAllByTestId("tour-card")).toHaveLength(4);
    expect(screen.getAllByTestId("owner-tour-card")).toHaveLength(1);
    fireEvent.click(within(nav).getByRole("button", { name: "From Tel Aviv" }));
    await waitFor(() => expect(router.state.location.search).toEqual({ origin: "tel-aviv" }));
    expect(screen.getAllByTestId("tour-card")).toHaveLength(6);
    expect(screen.getAllByTestId("owner-tour-card")).toHaveLength(1);
    fireEvent.click(within(nav).getByRole("button", { name: "Rosh Hanikra routes" }));
    await waitFor(() => expect(router.state.location.search).toEqual({ q: "Rosh Hanikra" }));
    expect(screen.getAllByTestId("tour-card")).toHaveLength(3);
    fireEvent.click(within(nav).getByRole("button", { name: "Small groups" }));
    await waitFor(() => expect(router.state.location.search).toEqual({ q: "Small group" }));
    expect(screen.getAllByTestId("tour-card")).toHaveLength(1);
    expect(screen.getByTestId("tour-card")).toHaveAttribute("data-product-id", "north-coast-small-group");
    fireEvent.click(within(nav).getByRole("button", { name: "Private tours" }));
    await waitFor(() => expect(router.state.location.search).toEqual({ format: "private" }));
    expect(screen.getAllByTestId("tour-card")).toHaveLength(3);
    expect(screen.getAllByTestId("owner-tour-card")).toHaveLength(2);
    fireEvent.click(within(nav).getByRole("button", { name: "All tours" }));
    await waitFor(() => expect(router.state.location.search).toEqual({}));
    expect(screen.getAllByTestId("tour-card")).toHaveLength(8);
  });

  it("filters Jerusalem tours using single-click chips and restores browser history", async () => {
    const router = await renderPage("/tours/jerusalem/");
    const nav = screen.getByRole("navigation", { name: "Filter Jerusalem tours" });
    fireEvent.click(within(nav).getByRole("button", { name: "From Tel Aviv" }));
    await waitFor(() => expect(router.state.location.search).toEqual({ origin: "tel-aviv" }));
    expect(screen.getAllByTestId("tour-card")).toHaveLength(2);
    fireEvent.click(within(nav).getByRole("button", { name: "Food & markets" }));
    await waitFor(() => expect(router.state.location.search).toEqual({ tag: "food" }));
    expect(screen.getAllByTestId("tour-card")).toHaveLength(2);
    router.history.back();
    await waitFor(() => expect(router.state.location.search).toEqual({ origin: "tel-aviv" }));
    fireEvent.click(within(nav).getByRole("button", { name: "All tours" }));
    await waitFor(() => expect(router.state.location.search).toEqual({}));
    expect(screen.getAllByTestId("tour-card")).toHaveLength(8);
    fireEvent.click(within(nav).getByRole("button", { name: "Art & architecture" }));
    await waitFor(() => expect(router.state.location.search).toEqual({ tag: "art" }));
    expect(screen.getByTestId("tour-card")).toHaveAttribute("data-product-id", "jerusalem-street-art-walk");
  });


  it("uses the shared Bethlehem template with exact tour links, Qasr al-Yahud filters, six local cards and no unauthorized owner transport offer", async () => {
    const router = await renderPage("/tours/bethlehem-jericho-jordan-river/");
    const nav = screen.getByRole("navigation", { name: "Filter Bethlehem, Jericho & Qasr al-Yahud tours" });
    const cards = screen.getAllByTestId("tour-card");
    expect(cards).toHaveLength(8);
    expect(document.querySelector('[data-section="moshe-private-tours"]')).toBeNull();
    expect(document.querySelector("main")?.textContent).not.toMatch(/Yardenit/i);
    const hrefs: string[] = [];
    for (const card of cards) {
      const id = card.getAttribute("data-product-id")!;
      const offer = offersForTour(id, "tours-bethlehem-jericho")[0]!;
      const link = within(card).getByRole("link", { name: "View tour ↗" });
      expect(link).toHaveAttribute("href", offer.provider.url);
      expect(new URL(offer.provider.url).hostname).toMatch(/^(getyourguide|viator)\.tpm\.li$/);
      expect(link.getAttribute("rel")).toContain("sponsored");
      hrefs.push(offer.provider.url);
    }
    expect(new Set(hrefs).size).toBe(8);
    expect(screen.getByTestId("author-card")).toBeInTheDocument();
    const local = document.querySelector('section[aria-labelledby="bethlehem-local-h"]')!;
    const planning = document.querySelector('section[aria-labelledby="bethlehem-planning-h"]')!;
    expect(local.querySelectorAll("a.group img")).toHaveLength(6);
    expect(planning.querySelectorAll("a.group")).toHaveLength(6);
    const contact = document.querySelector("section#contact")!;
    expect(contact.querySelector('[data-photo-role="contact-portrait"]')).not.toBeNull();
    expect(contact.querySelector('input[name="subject"]')).toHaveValue("");
    expect(contact.querySelector('textarea[name="message"]')).toHaveValue("");
    const photos = [...document.querySelectorAll("main img")].filter(img => !img.hasAttribute("data-photo-role")).map(img => img.getAttribute("src") || "");
    expect(repeatedPhotos(photos)).toEqual([]);
    fireEvent.click(within(nav).getByRole("button", { name: "Qasr al-Yahud" }));
    await waitFor(() => expect(router.state.location.search).toEqual({ destination: "jordan-river" }));
    const qasrTours = screen.getAllByTestId("tour-card");
    expect(qasrTours).toHaveLength(4);
    for (const card of qasrTours) expect(tourProducts.find(t => t.id === card.getAttribute("data-product-id"))!.destinationIds).toContain("jordan-river");
    fireEvent.click(within(nav).getByRole("button", { name: "Half day" }));
    await waitFor(() => expect(router.state.location.search).toEqual({ length: "short" }));
    expect(screen.getAllByTestId("tour-card")).toHaveLength(2);
    fireEvent.click(within(nav).getByRole("button", { name: "Private guided" }));
    await waitFor(() => expect(router.state.location.search).toEqual({ format: "private" }));
    expect(screen.getAllByTestId("tour-card")).toHaveLength(2);
    fireEvent.click(within(nav).getByRole("button", { name: "All tours" }));
    await waitFor(() => expect(router.state.location.search).toEqual({}));
    expect(screen.getAllByTestId("tour-card")).toHaveLength(8);
  });

  it("loads shared filter links and offers Jerusalem departures in the main Bethlehem catalog", async () => {
    await renderPage("/tours/masada-dead-sea/?destination=ein-gedi&format=independent");
    expect(screen.getAllByTestId("tour-card")).toHaveLength(1);
    expect(screen.getByTestId("tour-card")).toHaveAttribute("data-product-id", "masada-ein-gedi-dead-sea");
    cleanup();
    await renderPage("/tours/bethlehem-jericho-jordan-river/?origin=jerusalem");
    const nav = screen.getByRole("navigation", { name: "Filter Bethlehem, Jericho & Qasr al-Yahud tours" });
    expect(within(nav).getByRole("button", { name: "From Jerusalem" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByTestId("tour-card")).toHaveLength(5);
    for (const card of screen.getAllByTestId("tour-card")) expect(tourProducts.find(tour => tour.id === card.getAttribute("data-product-id"))!.originIds).toContain("jerusalem");
    expect(document.querySelector('a[href*="beinharimtours.com"]')).toBeNull();
    expect(screen.getByRole("heading", { level: 2, name: "Explore Bethlehem, Jericho & Qasr al-Yahud tours" })).toBeInTheDocument();
    expect(document.querySelector('section[aria-labelledby="bethlehem-local-h"] a[href="' + travelGuidePaths.bethlehem + '"]')).not.toBeNull();
  });

  it("permanently directs the former Bethlehem tour URL to one informative travel guide", async () => {
    let redirected = false;
    try {
      await LegacyBethlehemRoute.options.beforeLoad?.({ search: { origin: "tel-aviv", q: "tour" }, location: { hash: "tour-catalog" } } as never);
    } catch (error) {
      if (!isRedirect(error)) throw error;
      redirected = true;
      expect(error.status).toBe(301);
      expect(error.options.to).toBe(travelGuidePaths.bethlehem);
      expect(error.options.search).toEqual({});
      expect(error.options.hash).toBe("");
      expect(error.options.replace).toBe(true);
    }
    expect(redirected).toBe(true);
    expect(guideDirectory.filter(guide => guide.to === travelGuidePaths.bethlehem)).toHaveLength(1);
    expect(guideDirectory.some(guide => guide.to === "/tours/bethlehem-from-jerusalem/")).toBe(false);
    await renderPage(travelGuidePaths.bethlehem);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/How to get from Jerusalem to Bethlehem/i);
    const breadcrumbs = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(breadcrumbs).getByRole("link", { name: "Travel guides" })).toHaveAttribute("href", "/travel-blog/");
    expect(document.querySelector("#buses")).not.toBeNull();
    expect(document.querySelector("#private-taxi")).not.toBeNull();
    expect(document.querySelector('[data-testid="tour-card"]')).toBeNull();
    expect(screen.queryByRole("link", { name: "Compare organised Bethlehem tours" })).not.toBeInTheDocument();
    expect(screen.getAllByTestId("bethlehem-tour-card")).toHaveLength(6);
  });

  it("carries a unique owner itinerary into the existing private-driver request without accepting external tours", async () => {
    await renderPage("/private-driver/?tour=my-masada-day#request-quote");
    const form = screen.getByRole("form", { name: "Private driver quote request" });
    expect(form.querySelector('select[name="service"]')).toHaveValue("day-hire");
    expect(form.querySelector('textarea[name="itinerary"]')).toHaveValue("");
    expect(form.querySelector('input[name="pickup"]')).toHaveValue("");
    expect(parsePrivateDriverSearch({ tour: "eilat-snorkeling" })).toEqual({});
    expect(parsePrivateDriverSearch({ tour: "my-masada-day", port: "haifa", transfer: "airport" })).toEqual({ port: "haifa", transfer: "airport" });
  });

  it("tracks the product and offer separately on external booking clicks", async () => {
    await renderPage("/tours/eilat-red-sea/");
    const card = screen.getAllByTestId("tour-card").find(card => card.getAttribute("data-product-id") === "eilat-glass-bottom-boat")!;
    fireEvent.click(within(card).getByRole("link", { name: /View on GetYourGuide/ }));
    expect(readOutboundClicks()[0]).toMatchObject({ pageId: "tours-eilat-red-sea", productId: "eilat-glass-bottom-boat", offerId: "tour-eilat-glass-bottom-boat-getyourguide" });
  });

  it("declares distinct canonical collections, preserves staging noindex and does not invent live offers", async () => {
    const heads = [await HubRoute.options.head?.({} as never), ...tourCategories.map(category => tourCategoryMeta(category.id))];
    const canonicals = new Set<string>();
    for (const head of heads) {
      expect(head?.meta).toContainEqual({ name: "robots", content: "noindex,nofollow" });
      const canonical = head?.links?.find(link => link?.rel === "canonical")?.href;
      expect(canonical).toMatch(/\/$/);
      canonicals.add(canonical!);
      const schemas = (head?.scripts || []).map(script => JSON.parse(String(script?.children)));
      const collection = schemas.find(schema => schema["@type"] === "CollectionPage");
      expect(collection.author.name).toBe("Moshe Barak");
      expect(collection.mainEntity.itemListElement.length).toBeGreaterThanOrEqual(2);
      expect(JSON.stringify(schemas)).not.toMatch(/"(?:offers|aggregateRating|review)"|"@type":"(?:Product|FAQPage)"/);
    }
    expect(canonicals.size).toBe(9);
  });
});
