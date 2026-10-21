import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { affiliateConfig, getSource, providerLinks, shorePorts, shoreServices, shoreTourProducts, type ShorePortId } from "@/data/registry";
import { filterShoreServices, parsePortTransferSearch, parseShoreServiceSearch, servicesForPort, shoreServiceHref, shoreSourceIds, shoreListedPrice } from "@/lib/shore-services";
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
const catalogSizes = { haifa: 10, ashdod: 11 };

describe("port service catalog", () => {
  it("keeps the actual port context, service identity and multi-stop destinations separate", () => {
    for (const port of ["haifa", "ashdod"] as const) {
      const services = servicesForPort(port);
      expect(services).toHaveLength(catalogSizes[port]);
      expect(new Set(services.map((service) => service.id)).size).toBe(services.length);
      expect(services.every((service) => service.portId === port && service.provider.pageIds.includes(shorePorts[port].pageId))).toBe(true);
      expect(filterShoreServices(port, { service: "transfer" })).toHaveLength(2);
    }
    const byMasada = filterShoreServices("ashdod", { destination: "masada" });
    const byDeadSea = filterShoreServices("ashdod", { destination: "dead-sea" });
    expect(byMasada.every((service) => byDeadSea.some((other) => other.id === service.id))).toBe(true);
    expect(byDeadSea.length).toBeGreaterThan(byMasada.length);
    expect(byMasada.some((service) => service.id === "ashdod-masada-jerusalem")).toBe(true);
    expect(filterShoreServices("haifa", { service: "transfer", destination: "jerusalem" })).toEqual([]);
  });

  it("ignores invalid URL values and exposes no draft or unresolved provider as a public service", () => {
    expect(parseShoreServiceSearch({ service: "invalid", destination: ["jerusalem"], q: "discard" })).toEqual({});
    expect(parseShoreServiceSearch({ service: "guided-tour", destination: "jerusalem", unrelated: "discard" })).toEqual({ service: "guided-tour", destination: "jerusalem" });
    expect(shoreServiceHref("haifa", { service: "guided-tour", destination: "jerusalem" })).toBe("/haifa-shore-excursions/?service=guided-tour&destination=jerusalem");
    const sample = { ...shoreServices[0]!, id: "test-unpublished", portId: "haifa" as const, status: "draft" as const };
    shoreServices.push(sample);
    try { expect(servicesForPort("haifa").some((service) => service.id === sample.id)).toBe(false); }
    finally { shoreServices.pop(); }
  });

  it.each([{ port: "haifa" }, { port: "ashdod" }] as const)("shows all $port services without asking for a search, and filters without changing the request", async ({ port }) => {
    const { router, history, container } = await pageAt(shorePorts[port].path);
    expect(cards()).toHaveLength(catalogSizes[port]);
    expect(cards().slice(0, catalogSizes[port] - 6).every((card) => ["getyourguide", "viator"].includes(card.dataset["bookingPlatform"]!))).toBe(true);
    expect(screen.queryByRole("search")).not.toBeInTheDocument();
    expect(container.querySelector("a a")).toBeNull();
    fireEvent.change(screen.getByLabelText("Full name *"), { target: { value: "Jamie Cruise" } });
    const types = screen.getByRole("navigation", { name: "Filter port services by type" });
    const destinations = screen.getByRole("navigation", { name: "Filter port services by destination" });
    fireEvent.click(within(types).getByRole("link", { name: "Guided tours" }));
    await waitFor(() => expect(cards()).toHaveLength(catalogSizes[port] - 6));
    expect(router.state.location.search).toEqual({ service: "guided-tour" });
    const guidedId = `${port}-shore-viator-${port}-jerusalem-bethlehem`;
    fireEvent.click(within(destinations).getByRole("link", { name: "Jerusalem" }));
    await waitFor(() => expect(router.state.location.search).toEqual({ service: "guided-tour", destination: "jerusalem" }));
    expect(cards().some((card) => card.dataset["serviceId"] === guidedId)).toBe(true);
    expect(screen.getByLabelText("Full name *")).toHaveValue("Jamie Cruise");
    await act(async () => { history.back(); });
    await waitFor(() => expect(router.state.location.search).toEqual({ service: "guided-tour" }));
    fireEvent.click(screen.getByRole("link", { name: "Clear filters" }));
    await waitFor(() => expect(cards()).toHaveLength(catalogSizes[port]));
    expect(router.state.location.search).toEqual({});
    expect(screen.getByLabelText("Full name *")).toHaveValue("Jamie Cruise");
  });

  it("restores combined filters from a direct link and offers a working way out of an empty combination", async () => {
    await pageAt("/haifa-shore-excursions/?service=transfer&destination=jerusalem");
    expect(cards()).toHaveLength(0);
    expect(screen.getByRole("heading", { name: "No services match these tags" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("link", { name: "Clear filters" }));
    await waitFor(() => expect(cards()).toHaveLength(catalogSizes.haifa));
    const tag = within(screen.getByRole("navigation", { name: "Filter port services by type" })).getByRole("link", { name: "Transfers" });
    let preventedByApp = true;
    window.addEventListener("click", (event) => { preventedByApp = event.defaultPrevented; event.preventDefault(); }, { once: true });
    fireEvent.click(tag, { ctrlKey: true });
    expect(preventedByApp).toBe(false);
    expect(cards()).toHaveLength(catalogSizes.haifa);
  });

  it.each(["haifa", "ashdod"] as ShorePortId[])("sends the $port transfer to the one-way form with correct context and no excursion price", async (port) => {
    const result = await pageAt(`${shorePorts[port].path}?service=transfer`);
    expect(cards()).toHaveLength(2);
    const airport = cards().find((card) => card.dataset["serviceId"] === `${port}-airport-transfer`)!;
    expect(airport).toHaveTextContent("Price on request");
    expect(airport).not.toHaveTextContent("From ILS");
    const href = within(airport).getByRole("link", { name: "Request a transfer quote" }).getAttribute("href")!;
    expect(href).toBe(`/private-driver/?port=${port}&transfer=airport#request-quote`);
    result.unmount();
    await pageAt(href);
    expect(screen.getByLabelText("Type of journey *")).toHaveValue("intercity");
    expect(screen.getByLabelText("Pickup city, hotel or address *")).toHaveValue(`${shorePorts[port].name} Port`);
    expect(screen.getByLabelText("Final drop-off *")).toHaveValue("Ben Gurion Airport");
    expect(screen.queryByLabelText("Driver or licensed guide?")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Ship's all-aboard time *")).not.toBeInTheDocument();
    expect((screen.getByLabelText("Additional requests") as HTMLTextAreaElement).value).toContain(`${shorePorts[port].name} Port`);
  });

  it("requires both valid transfer parameters and leaves an unknown hotel address for the traveler", async () => {
    expect(parsePortTransferSearch({ port: "haifa", transfer: "unknown" })).toEqual({});
    expect(parsePortTransferSearch({ port: "unknown", transfer: "airport" })).toEqual({});
    await pageAt("/private-driver/?port=ashdod&transfer=city");
    expect(screen.getByLabelText("Pickup city, hotel or address *")).toHaveValue("Ashdod Port");
    expect(screen.getByLabelText("Final drop-off *")).toHaveValue("");
  });

  it("keeps truthful affiliate flags and records an outbound product click without a booking claim", async () => {
    await pageAt("/haifa-shore-excursions/?service=guided-tour");
    const guided = cards().find((card) => card.dataset["serviceId"] === "haifa-shore-viator-haifa-jerusalem-bethlehem")!;
    expect(guided).not.toHaveTextContent("Sponsored link");
    const link = within(guided).getByRole("link", { name: /View on Viator/ });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
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
        expect(getSource(product.id).checkedAt).toBe("2026-10-21");
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
  });

  it("combines booking site, destination and service tags without clearing the other groups", async () => {
    const { router } = await pageAt("/haifa-shore-excursions/?platform=getyourguide");
    expect(cards()).toHaveLength(2);
    expect(cards().every((card) => card.dataset["bookingPlatform"] === "getyourguide")).toBe(true);
    fireEvent.click(within(screen.getByRole("navigation", { name: "Filter port services by destination" })).getByRole("link", { name: "Nazareth" }));
    await waitFor(() => expect(cards()).toHaveLength(1));
    fireEvent.click(within(screen.getByRole("navigation", { name: "Filter port services by type" })).getByRole("link", { name: "Guided tours" }));
    await waitFor(() => expect(router.state.location.search).toEqual({ service: "guided-tour", destination: "nazareth", platform: "getyourguide" }));
    fireEvent.click(within(screen.getByRole("navigation", { name: "Filter port services by destination" })).getByRole("link", { name: "All destinations" }));
    await waitFor(() => expect(cards()).toHaveLength(2));
    expect(router.state.location.search).toEqual({ service: "guided-tour", platform: "getyourguide" });
    expect(parseShoreServiceSearch({ platform: ["viator"], operator: "tourist-israel" })).toEqual({});
    expect(parseShoreServiceSearch({ platform: "compass-travel" })).toEqual({});
  });

  it("identifies the actual operator separately from the marketplace and uses the product's own outbound link", async () => {
    await pageAt("/haifa-shore-excursions/?operator=ilya-pevzner&destination=akko");
    expect(cards()).toHaveLength(1);
    const card = cards()[0]!;
    expect(card).toHaveTextContent("Operated by Ilya Pevzner Guide Israel");
    expect(card).toHaveTextContent("GetYourGuide");
    expect(card).not.toHaveTextContent(/From ILS|Sponsored link/);
    const link = within(card).getByRole("link", { name: /View on GetYourGuide/ });
    expect(link).toHaveAttribute("href", "https://www.getyourguide.com/haifa-l2051/haifa-acre-and-rosh-anikra-for-cruises-with-licensed-guide-t482201/");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    fireEvent.click(link);
    expect(JSON.parse(localStorage.getItem("itt_outbound_clicks_v1")!)[0]).toMatchObject({ pageId: "shore-haifa", productId: "shore-gyg-haifa-akko", offerId: "shore-gyg-haifa-akko" });
  });

  it("shows duration, pickup, format and a clearly based dated price instead of long repeated card conditions", async () => {
    await pageAt("/ashdod-shore-excursions/?platform=getyourguide");
    const card = cards().find((card) => card.dataset["productId"] === "shore-gyg-ashdod-jerusalem-bethlehem")!;
    expect(card).toHaveTextContent("9–11 hours");
    expect(card).toHaveTextContent("Private tour");
    expect(card).toHaveTextContent("Ashdod Port · pickup & return");
    expect(card).toHaveTextContent("US$1,009");
    expect(card).toHaveTextContent("Per group · up to 3");
    expect(card).toHaveTextContent("Price checked 21 October 2026");
    expect(card).not.toHaveTextContent(/Per person|Best for:|Published car-and-driver starting rate|Check the actual ship date/);
    const masada = cards().find((card) => card.dataset["productId"] === "shore-gyg-ashdod-masada")!;
    expect(masada).toHaveTextContent("US$130");
    expect(masada).toHaveTextContent("Per person");
    expect(masada).not.toHaveTextContent("Per group");
  });

  it("suppresses old, future, unsupported or invalid price snapshots and preserves an honest price fallback", async () => {
    const product = shoreTourProducts.find((item) => item.id === "shore-gyg-ashdod-masada")!;
    const now = new Date("2026-10-21T12:00:00Z");
    expect(shoreListedPrice(product, now)?.amount).toBe(130);
    expect(shoreListedPrice(product, new Date("2026-11-22T12:00:00Z"))).toBeUndefined();
    expect(shoreListedPrice(product, new Date("2026-10-20T12:00:00Z"))).toBeUndefined();
    expect(shoreListedPrice({ ...product, listedPrice: { ...product.listedPrice!, amount: NaN } }, now)).toBeUndefined();
    expect(shoreListedPrice({ ...product, listedPrice: { ...product.listedPrice!, basis: "per_group" } }, now)).toBeUndefined();
    await pageAt("/haifa-shore-excursions/?platform=viator");
    const privateTour = cards().find((card) => card.dataset["productId"] === "shore-viator-haifa-jerusalem-bethlehem")!;
    expect(privateTour).toHaveTextContent("See current price");
    expect(privateTour).not.toHaveTextContent(/US\$|From ILS/);
  });

});
