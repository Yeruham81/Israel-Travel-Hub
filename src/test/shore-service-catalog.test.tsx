import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { affiliateConfig, getSource, providerLinks, shorePorts, shoreServices, shoreTourProducts, type ShorePortId } from "@/data/registry";
import { filterShoreServices, parsePortTransferSearch, parseShoreServiceSearch, servicesForPort, shoreServiceHref, shoreSourceIds, shoreListedPrice } from "@/lib/shore-services";
import { getShoreCatalog } from "@/data/shoreExcursions";
import { routeTree } from "@/routeTree.gen";

afterEach(() => { cleanup(); localStorage.clear(); vi.restoreAllMocks(); });

async function pageAt(path: string) {
  const history = createMemoryHistory({ initialEntries: [path] });
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, history, trailingSlash: "always" });
  await router.load();
  const result = render(<RouterProvider router={router} />);
  return { ...result, router, history };
}
const cards = () => screen.queryAllByTestId("shore-service-card");
const catalogSizes = { haifa: 14, ashdod: 12 };

describe("port service catalog", () => {
  it("keeps the actual port context, service identity and multi-stop destinations separate", () => {
    for (const port of ["haifa", "ashdod"] as const) {
      const services = servicesForPort(port);
      expect(services).toHaveLength(catalogSizes[port]);
      expect(new Set(services.map((service) => service.id)).size).toBe(services.length);
      expect(services.every((service) => service.portId === port && service.provider.pageIds.includes(shorePorts[port].pageId))).toBe(true);
      expect(services.every((service) => service.kind !== "transfer")).toBe(true);
    }
    const byMasada = filterShoreServices("ashdod", { destination: "masada" });
    const byDeadSea = filterShoreServices("ashdod", { destination: "dead-sea" });
    expect(byMasada.every((service) => byDeadSea.some((other) => other.id === service.id))).toBe(true);
    expect(byDeadSea.length).toBeGreaterThan(byMasada.length);
    expect(byMasada.some((service) => service.id === "ashdod-masada-jerusalem")).toBe(true);
    expect(filterShoreServices("haifa", { destination: "masada" })).toEqual([]);
  });

  it("ignores invalid URL values and exposes no draft or unresolved provider as a public service", () => {
    expect(parseShoreServiceSearch({ service: "invalid", destination: ["jerusalem"], q: "discard" })).toEqual({});
    expect(parseShoreServiceSearch({ service: "guided-tour", destination: "jerusalem", unrelated: "discard" })).toEqual({ destination: "jerusalem" });
    expect(shoreServiceHref("haifa", { destination: "jerusalem" })).toBe("/shore-excursions/haifa/?destination=jerusalem");
    const sample = { ...shoreServices[0]!, id: "test-unpublished", portId: "haifa" as const, status: "draft" as const };
    shoreServices.push(sample);
    try { expect(servicesForPort("haifa").some((service) => service.id === sample.id)).toBe(false); }
    finally { shoreServices.pop(); }
  });

  it.each([{ port: "haifa" }, { port: "ashdod" }] as const)("shows all $port return tours with destination tags and preserves the inquiry while filtering", async ({ port }) => {
    const { router, history, container } = await pageAt(shorePorts[port].path);
    expect(cards()).toHaveLength(catalogSizes[port]);
    const externalCount = catalogSizes[port] - 4;
    expect(cards().slice(0, externalCount).every(card => card.dataset["serviceKind"] === "guided-tour" && ["getyourguide", "viator"].includes(card.dataset["bookingPlatform"]!))).toBe(true);
    expect(cards().slice(externalCount).every(card => card.dataset["serviceKind"] === "private-driver" && card.dataset["bookingPlatform"] === "direct")).toBe(true);
    expect(screen.queryByRole("search")).not.toBeInTheDocument();
    expect(screen.queryByRole("navigation", { name: "Filter port services by type" })).not.toBeInTheDocument();
    expect(screen.queryByRole("navigation", { name: "Filter port services by booking site" })).not.toBeInTheDocument();
    expect(container.querySelector("a a")).toBeNull();
    const header = screen.getByRole("heading", { level: 1 }).closest("header")!;
    expect(header.querySelectorAll("a.btn")).toHaveLength(0);
    expect(container.querySelector("#request-quote")).toBeInTheDocument();
    expect(header).not.toHaveTextContent(/From ILS|Weekday starting rate|Full-day return transport|Exchange rate|Browse tours|narrow.*tag/i);
    expect(cards().every((card) => card.textContent?.includes(`From ${shorePorts[port].name} Port`))).toBe(true);
    expect(cards().every((card) => !/Price checked|one.way|direct quote/.test(card.textContent || ""))).toBe(true);
    expect(cards().some((card) => card.dataset["serviceKind"] === "transfer")).toBe(false);
    fireEvent.change(screen.getByLabelText("Full name *"), { target: { value: "Jamie Cruise" } });
    const destinations = screen.getByRole("navigation", { name: "Filter port services by destination" });
    expect(within(destinations).queryByRole("link", { name: /Airport|Hotels/ })).not.toBeInTheDocument();
    fireEvent.click(within(destinations).getByRole("link", { name: "Jerusalem" }));
    await waitFor(() => expect(router.state.location.search).toEqual({ destination: "jerusalem" }));
    expect(cards()).toHaveLength(filterShoreServices(port, { destination: "jerusalem" }).length);
    const guidedId = `${port}-shore-viator-${port}-jerusalem-bethlehem`;
    expect(cards().some((card) => card.dataset["serviceId"] === guidedId)).toBe(true);
    fireEvent.click(within(destinations).getByRole("link", { name: "Nazareth" }));
    await waitFor(() => expect(router.state.location.search).toEqual({ destination: "nazareth" }));
    expect(screen.getByLabelText("Full name *")).toHaveValue("Jamie Cruise");
    await act(async () => { history.back(); });
    await waitFor(() => expect(router.state.location.search).toEqual({ destination: "jerusalem" }));
    fireEvent.click(screen.getByRole("link", { name: "Clear filters" }));
    await waitFor(() => expect(cards()).toHaveLength(catalogSizes[port]));
    expect(router.state.location.search).toEqual({});
    expect(screen.getByLabelText("Full name *")).toHaveValue("Jamie Cruise");
  });

  it("restores a destination link and offers a working way out when that port has no matching tour", async () => {
    await pageAt("/shore-excursions/haifa/?destination=masada");
    expect(cards()).toHaveLength(0);
    expect(screen.getByRole("heading", { name: "No tours match this destination" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("link", { name: "Clear filters" }));
    await waitFor(() => expect(cards()).toHaveLength(catalogSizes.haifa));
    const tag = within(screen.getByRole("navigation", { name: "Filter port services by destination" })).getByRole("link", { name: "Akko (Acre)" });
    let preventedByApp = true;
    window.addEventListener("click", (event) => { preventedByApp = event.defaultPrevented; event.preventDefault(); }, { once: true });
    fireEvent.click(tag, { ctrlKey: true });
    expect(preventedByApp).toBe(false);
    expect(cards()).toHaveLength(catalogSizes.haifa);
  });

  it.each(["haifa", "ashdod"] as ShorePortId[])("preserves existing $port transfer inquiry links outside the excursion catalog", async (port) => {
    await pageAt(`/private-driver/?port=${port}&transfer=airport#request-quote`);
    expect(screen.getByLabelText("Type of journey *")).toHaveValue("intercity");
    expect(screen.getByLabelText("Pickup city, hotel or address *")).toHaveValue("");
    expect(screen.getByLabelText("Final drop-off *")).toHaveValue("");
    expect(screen.queryByLabelText("Driver or licensed guide?")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Ship's all-aboard time *")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Additional requests")).toHaveValue("");
  });

  it("requires both valid transfer parameters and leaves an unknown hotel address for the traveler", async () => {
    expect(parsePortTransferSearch({ port: "haifa", transfer: "unknown" })).toEqual({});
    expect(parsePortTransferSearch({ port: "unknown", transfer: "airport" })).toEqual({});
    await pageAt("/private-driver/?port=ashdod&transfer=city");
    expect(screen.getByLabelText("Pickup city, hotel or address *")).toHaveValue("");
    expect(screen.getByLabelText("Final drop-off *")).toHaveValue("");
  });

  it("keeps truthful affiliate flags and records an outbound product click without a booking claim", async () => {
    await pageAt("/shore-excursions/haifa/?service=guided-tour");
    const guided = cards().find((card) => card.dataset["serviceId"] === "haifa-shore-viator-haifa-jerusalem-bethlehem")!;
    expect(guided).not.toHaveTextContent("Sponsored link");
    const link = within(guided).getByRole("link", { name: /View on Viator/ });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "sponsored noopener noreferrer");
    fireEvent.click(link);
    expect(JSON.parse(localStorage.getItem("itt_outbound_clicks_v1")!)[0]).toMatchObject({ event: "outbound_click", pageId: "shore-haifa", productId: "shore-viator-haifa-jerusalem-bethlehem", offerId: "shore-viator-haifa-jerusalem-bethlehem" });
    for (const port of ["haifa", "ashdod"]) {
      const id = `${port}-shore-beinharim`;
      expect(providerLinks.find((provider) => provider.id === id)?.isAffiliate).toBe(Boolean(affiliateConfig[id]?.trackingUrl));
    }
  });

  it("publishes external excursions only through approved booking platforms, with one identity under every destination tag", () => {
    for (const port of ["haifa", "ashdod"] as const) {
      for (const service of servicesForPort(port)) {
        if (service.provider.relationship === "publisher_operator") continue;
        expect(["getyourguide", "viator"]).toContain(service.partner?.id);
        const product = service.product!;
        const link = service.provider;
        expect(product.durationLabel).toMatch(/hours/);
        expect(link.url).toBe(affiliateConfig[product.id]?.trackingUrl || product.publicUrl);
        expect(link.isAffiliate).toBe(Boolean(affiliateConfig[product.id]?.trackingUrl));
        expect(Object.hasOwn(affiliateConfig, product.id)).toBe(true);
        expect(getSource(product.id).checkedAt).toBe(product.checkedAt || "2026-10-21");
        expect(shoreSourceIds(port)).toContain(product.id);
        for (const destination of service.destinationIds) expect(filterShoreServices(port, { destination }).find((item) => item.productId === product.id)?.provider.id).toBe(link.id);
      }
      expect(shoreSourceIds(port).some((id) => id.startsWith("shore-tourist-") || id.startsWith("shore-compass-"))).toBe(false);
    }
    // A direct supplier cannot become public merely by adding a published service row.
    const direct = { ...shoreServices[0]!, id: "test-direct-tourist", portId: "haifa" as const, providerLinkId: "shore-tourist-haifa-jerusalem" };
    shoreServices.push(direct);
    try { expect(servicesForPort("haifa").some((item) => item.id === direct.id)).toBe(false); }
    finally { shoreServices.pop(); }
    expect(servicesForPort("haifa").some((item) => item.operator?.id === "rent-a-guide")).toBe(false);
    const addedIds = [
      "shore-viator-ashdod-jerusalem-bethlehem-smallgroup", "shore-viator-ashdod-jerusalem-private",
      "shore-viator-haifa-jerusalem-bethlehem-smallgroup", "shore-viator-haifa-jerusalem-private",
      "shore-viator-haifa-caesarea-private", "shore-viator-haifa-galilee-private", "shore-viator-haifa-akko-private",
      "shore-viator-ashdod-masada-dead-sea", "shore-viator-haifa-jerusalem-holy-city",
    ];
    const newProducts = shoreTourProducts.filter(p => addedIds.includes(p.id));
    expect(newProducts).toHaveLength(9);
    expect(newProducts.filter(p => p.portIds.includes("ashdod"))).toHaveLength(3);
    expect(newProducts.filter(p => p.portIds.includes("haifa"))).toHaveLength(6);
    expect(new Set(newProducts.map(p => p.publicUrl)).size).toBe(9);
    for (const product of newProducts) {
      expect(product.publicUrl).toMatch(/^https:\/\/www\.viator\.com\/tours\//);
      expect(affiliateConfig).toHaveProperty(product.id);
      expect(servicesForPort(product.portIds[0]!).some(service => service.productId === product.id)).toBe(true);
    }
  });

  it("discards retired service and supplier filters so legacy links cannot hide tours", async () => {
    const { router } = await pageAt("/shore-excursions/haifa/?service=transfer&platform=getyourguide&operator=ilya-pevzner&destination=airport");
    await waitFor(() => expect(cards()).toHaveLength(catalogSizes.haifa));
    fireEvent.click(within(screen.getByRole("navigation", { name: "Filter port services by destination" })).getByRole("link", { name: "Nazareth" }));
    await waitFor(() => expect(router.state.location.search).toEqual({ destination: "nazareth" }));
    expect(cards()).toHaveLength(filterShoreServices("haifa", { destination: "nazareth" }).length);
    expect(new Set(cards().map((card) => card.dataset["bookingPlatform"]))).toEqual(new Set(["getyourguide", "viator", "direct"]));
    expect(parseShoreServiceSearch({ service: "guided-tour", platform: "viator", operator: "ilya-pevzner", destination: "jerusalem" })).toEqual({ destination: "jerusalem" });
  });

  it("uses a distinct credited destination photograph for every excursion across both ports", () => {
    const catalog = [...getShoreCatalog("haifa"), ...getShoreCatalog("ashdod")];
    expect(catalog).toHaveLength(26);
    expect(catalog.filter(service => service.itinerary && service.title === "Classical Jerusalem").every(service => service.photo.alt.includes("Jerusalem"))).toBe(true);
    expect(catalog.every(service => !service.duration.toLowerCase().includes("by agreement"))).toBe(true);
    expect(new Set(catalog.map((service) => service.photo.src)).size).toBe(catalog.length);
    const externalPhotoSources = catalog.map((service) => service.photo.sourceUrl).filter((url): url is string => Boolean(url));
    expect(new Set(externalPhotoSources).size).toBe(externalPhotoSources.length);
    expect(externalPhotoSources.every((url) => /^https:\/\//.test(url))).toBe(true);
    expect(catalog.every((service) => Boolean(service.photo.alt && service.photo.src))).toBe(true);
  });

  it("identifies the actual operator separately from the marketplace and uses the product's own outbound link", async () => {
    await pageAt("/shore-excursions/haifa/?operator=ilya-pevzner&destination=akko");
    expect(cards()).toHaveLength(filterShoreServices("haifa", { destination: "akko" }).length);
    const card = cards().find((card) => card.dataset["productId"] === "shore-gyg-haifa-akko")!;
    expect(card).toHaveAttribute("data-operator-id", "ilya-pevzner");
    expect(card).not.toHaveTextContent("Operated by");
    expect(card).toHaveTextContent("GetYourGuide");
    expect(card).not.toHaveTextContent(/From ILS|Sponsored link/);
    const link = within(card).getByRole("link", { name: /View on GetYourGuide/ });
    expect(link).toHaveAttribute("href", affiliateConfig["shore-gyg-haifa-akko"]?.trackingUrl);
    expect(link).toHaveAttribute("rel", "sponsored noopener noreferrer");
    fireEvent.click(link);
    expect(JSON.parse(localStorage.getItem("itt_outbound_clicks_v1")!)[0]).toMatchObject({ pageId: "shore-haifa", productId: "shore-gyg-haifa-akko", offerId: "shore-gyg-haifa-akko" });
  });

  it("shows duration, port pickup, tour format and a dated published price basis", async () => {
    await pageAt("/shore-excursions/ashdod/?platform=getyourguide");
    const card = cards().find((card) => card.dataset["productId"] === "shore-gyg-ashdod-jerusalem-bethlehem")!;
    expect(card).toHaveTextContent("9–11 hours");
    expect(card).toHaveTextContent("Private tour");
    expect(card).toHaveTextContent("From Ashdod Port");
    expect(card).toHaveTextContent("US$1,009");
    expect(card).toHaveTextContent("Reference price · per group");
    expect(card).not.toHaveTextContent("2026-10-21");
    expect(card).not.toHaveTextContent(/Per person|Best for:|Published car-and-driver starting rate|Check the actual ship date/);
    const masada = cards().find((card) => card.dataset["productId"] === "shore-gyg-ashdod-masada")!;
    expect(masada).toHaveTextContent("US$130");
    expect(masada).toHaveTextContent("Reference price · per person");
    expect(masada).not.toHaveTextContent("per group");
  });

  it("prioritizes tours with verified ratings and prices, and keeps filtered cards in even pairs", async () => {
    const ashdod = getShoreCatalog("ashdod").filter(service => service.partner);
    const haifa = getShoreCatalog("haifa").filter(service => service.partner);
    expect(ashdod).toHaveLength(8);
    expect(haifa).toHaveLength(10);
    expect(ashdod[0]?.productId).toBe("shore-viator-ashdod-jerusalem-bethlehem-smallgroup");
    expect(ashdod[0]?.rating?.value).toBe(4.9);
    expect(ashdod[0]?.listedPrice?.amount).toBe(225);
    expect(haifa[0]?.productId).toBe("shore-viator-haifa-jerusalem-holy-city");
    expect(haifa[0]?.rating?.value).toBe(5);
    expect(haifa[0]?.listedPrice?.amount).toBe(1175);
    await pageAt("/shore-excursions/haifa/?destination=akko");
    const tourGrid = screen.getByRole("list", { name: "Other operators' tours from Haifa Port" });
    expect(tourGrid.children.length % 2).toBe(0);
    expect(within(tourGrid).getByTestId("shore-companion-card")).toBeInTheDocument();
    expect(within(tourGrid).getByRole("link", { name: "Explore all destinations" })).toHaveAttribute("href", "/shore-excursions/haifa/");
    expect(within(tourGrid).queryByLabelText("Rating 4.9 out of 5 from 29 reviews")).toBeNull();
  });

  it("suppresses old, future, unsupported or invalid price snapshots and preserves an honest price fallback", async () => {
    const product = shoreTourProducts.find((item) => item.id === "shore-gyg-ashdod-masada")!;
    const now = new Date("2026-10-21T12:00:00Z");
    expect(shoreListedPrice(product, now)?.amount).toBe(130);
    expect(shoreListedPrice(product, new Date("2026-11-22T12:00:00Z"))).toBeUndefined();
    expect(shoreListedPrice(product, new Date("2026-10-20T12:00:00Z"))).toBeUndefined();
    expect(shoreListedPrice({ ...product, listedPrice: { ...product.listedPrice!, amount: NaN } }, now)).toBeUndefined();
    expect(shoreListedPrice({ ...product, listedPrice: { ...product.listedPrice!, basis: "per_group" } }, now)).toBeUndefined();
    await pageAt("/shore-excursions/haifa/?platform=viator");
    const privateTour = cards().find((card) => card.dataset["productId"] === "shore-viator-haifa-jerusalem-bethlehem")!;
    expect(privateTour).toHaveTextContent("Check current price");
    expect(privateTour).not.toHaveTextContent(/US\$|From ILS/);
  });

});
