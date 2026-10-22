import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";
import { Route as HubRoute } from "@/routes/tours.index";
import { tourCategoryMeta } from "@/components/TourCategoryPage";
import { affiliateConfig, operators, sources, tourBookingOffers, tourProducts } from "@/data/registry";
import { tourCategories, tourCategoryPaths, tourPhotos } from "@/data/tours";
import { filterTours, isOwnerTour, offersForTour, parseTourSearch, tourSnapshotPrice, toursForCategory } from "@/lib/tours";
import { CANONICAL_ORIGIN } from "@/lib/site";
import { parsePrivateDriverSearch } from "@/lib/private-driver-search";
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
  render(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
  return router;
}

describe("shared ordinary tour catalog", () => {
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
    expect(food.map(tour => tour.id)).toEqual(["mahane-yehuda-tasting"]);
    expect(filterTours("tel-aviv-jaffa", { q: "street art" }).map(tour => tour.id)).toContain("tel-aviv-street-art");
    expect(filterTours("masada-dead-sea", { destination: "ein-gedi", format: "independent" }).map(tour => tour.id)).toEqual(["masada-ein-gedi-dead-sea"]);
    const original = [...tourProducts];
    expect(filterTours("jerusalem", { sort: "duration" })[0]!.id).toBe("mahane-yehuda-tasting");
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
  it("shows a category gateway with two linked examples each and no owner-promotion block", async () => {
    const router = await renderPage("/tours/");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(document.querySelector('[data-section="moshe-private-tours"]')).toBeNull();
    expect(screen.queryByRole("link", { name: "Plan a private day with me" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Explore tour categories" })).not.toBeInTheDocument();
    expect(document.querySelector("main header a")).toBeNull();
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
    const cruise = screen.getByRole("region", { name: "A day ashore starts at your cruise port" });
    expect(within(cruise).getByRole("img")).toHaveAttribute("alt", expect.stringMatching(/cruise ship.*Haifa/i));
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
      expect(doc.querySelectorAll('section[aria-label="Get to know the places on your itinerary"] article')).toHaveLength(4);
      for (const link of doc.querySelectorAll('main a[href^="/"]')) {
        const url = new URL(link.getAttribute("href")!, CANONICAL_ORIGIN);
        expect(router.matchRoutes(url.pathname).at(-1)?.routeId.replace(/\/$/, ""), link.outerHTML).toBe(url.pathname.replace(/\/$/, ""));
      }
      for (const card of doc.querySelectorAll('[data-testid="tour-card"]')) {
        const id = card.getAttribute("data-product-id")!;
        expect(card.id).toBe(id);
        const tour = tourProducts.find(tour => tour.id === id)!;
        expect(tour.operatorId).not.toBe("moshe-barak");
        expect(card.textContent).toContain("Operated by");
        for (const link of card.querySelectorAll('a[target="_blank"]')) expect(link.getAttribute("rel")).toBe("noopener noreferrer");
      }
      const more = doc.querySelector('section[aria-labelledby="more-tour-categories-h"]')!;
      expect(more.querySelectorAll("article")).toHaveLength(8);
      expect(more.querySelectorAll("img")).toHaveLength(8);
      expect(more.querySelector(`a[href="${tourCategoryPaths[category.id]}"]`)).toBeNull();
      expect(more.querySelector('a[href="/tours/"]')).not.toBeNull();
      const owner = doc.querySelector('[data-section="moshe-private-tours"]');
      if (owner) {
        expect(owner.className).not.toContain("bg-navy");
        expect(owner.textContent).not.toContain("Arrange directly with me");
        for (const card of owner.querySelectorAll('[data-testid="owner-tour-card"]')) {
          const link = card.querySelector('a[href^="/private-driver/?tour="]')!;
          expect(new URL(link.getAttribute("href")!, CANONICAL_ORIGIN).searchParams.get("tour")).toBe(card.getAttribute("data-product-id"));
          expect(card.querySelector("dl")?.textContent).toContain("Includes:");
        }
      }
      expect(doc.querySelector("a a")).toBeNull();
    }
  });

  it("searches the gateway by interest and departure, forwards choices and restores all categories", async () => {
    const router = await renderPage("/tours/?q=food");
    expect(screen.getByRole("searchbox")).toHaveValue("food");
    expect([...document.querySelectorAll("[data-category-id]")].map(card => card.getAttribute("data-category-id"))).toEqual(["jerusalem", "tel-aviv-jaffa", "food-markets"]);
    fireEvent.change(screen.getByRole("combobox", { name: "Start from" }), { target: { value: "jerusalem" } });
    await waitFor(() => expect(router.state.location.search).toEqual({ q: "food", origin: "jerusalem" }));
    expect(document.querySelectorAll("[data-category-id]")).toHaveLength(2);
    for (const example of document.querySelectorAll("[data-product-id]")) expect(tourProducts.find(tour => tour.id === example.getAttribute("data-product-id"))!.originIds).toContain("jerusalem");
    const foodLink = document.querySelector('[data-category-id="food-markets"] a.btn')!;
    expect(new URL(foodLink.getAttribute("href")!, CANONICAL_ORIGIN).searchParams.get("origin")).toBe("jerusalem");
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "no-such-experience-xyz" } });
    await waitFor(() => expect(screen.getByRole("heading", { name: "No categories match your search" })).toBeInTheDocument());
    fireEvent.click(screen.getByRole("button", { name: "Show all categories" }));
    await waitFor(() => expect(document.querySelectorAll("[data-category-id]")).toHaveLength(8));
    expect(router.state.location.search).toEqual({});
  });

  it("updates the URL, empty state and results, preserves search words, and restores browser history", async () => {
    const router = await renderPage("/tours/jerusalem/");
    fireEvent.change(screen.getByRole("combobox", { name: "Start from" }), { target: { value: "tel-aviv" } });
    await waitFor(() => expect(router.state.location.search).toEqual({ origin: "tel-aviv" }));
    expect(screen.getAllByTestId("tour-card")).toHaveLength(2);
    fireEvent.click(screen.getByRole("button", { name: "Food & markets" }));
    await waitFor(() => expect(screen.getByRole("heading", { name: "No tours match these choices" })).toBeInTheDocument());
    router.history.back();
    await waitFor(() => expect(screen.getAllByTestId("tour-card")).toHaveLength(2));
    fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    await waitFor(() => expect(router.state.location.search).toEqual({}));
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "market " } });
    await waitFor(() => expect(screen.getByRole("searchbox")).toHaveValue("market "));
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "market tasting" } });
    await waitFor(() => expect(screen.getAllByTestId("tour-card")).toHaveLength(1));
    expect(screen.getByTestId("tour-card")).toHaveAttribute("data-product-id", "mahane-yehuda-tasting");
  });

  it("loads shared filter links and keeps the legacy Bethlehem departure page restricted to Jerusalem", async () => {
    await renderPage("/tours/masada-dead-sea/?destination=ein-gedi&format=independent");
    expect(screen.getAllByTestId("tour-card")).toHaveLength(1);
    expect(screen.getByTestId("tour-card")).toHaveAttribute("data-product-id", "masada-ein-gedi-dead-sea");
    cleanup();
    await renderPage("/tours/bethlehem-from-jerusalem/?origin=tel-aviv");
    expect(screen.queryByRole("combobox", { name: "Start from" })).not.toBeInTheDocument();
    expect(screen.getAllByTestId("tour-card")).toHaveLength(2);
    for (const card of screen.getAllByTestId("tour-card")) expect(tourProducts.find(tour => tour.id === card.getAttribute("data-product-id"))!.originIds).toContain("jerusalem");
    expect(document.querySelector('a[href*="beinharimtours.com"]')).toBeNull();
  });

  it("carries a unique owner itinerary into the existing private-driver request without accepting external tours", async () => {
    await renderPage("/private-driver/?tour=my-masada-day#request-quote");
    const form = screen.getByRole("form", { name: "Private driver quote request" });
    expect(form.querySelector('select[name="service"]')).toHaveValue("day-hire");
    expect(form.querySelector('textarea[name="itinerary"]')).toHaveValue("A private day at Masada & the Dead Sea\nPreferred destinations: Masada, Dead Sea.");
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
