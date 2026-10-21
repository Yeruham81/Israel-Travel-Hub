import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { affiliateConfig, getSource, providerLinks, shorePorts, shoreServices, shoreTourProducts, type ShorePortId } from "@/data/registry";
import { filterShoreServices, parsePortTransferSearch, parseShoreServiceSearch, servicesForPort, shoreServiceHref, shoreSourceIds } from "@/lib/shore-services";
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
const catalogSizes = { haifa: 19, ashdod: 18 };

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
    expect(screen.queryByRole("search")).not.toBeInTheDocument();
    expect(container.querySelector("a a")).toBeNull();
    fireEvent.change(screen.getByLabelText("Full name *"), { target: { value: "Jamie Cruise" } });
    const types = screen.getByRole("navigation", { name: "Filter port services by type" });
    const destinations = screen.getByRole("navigation", { name: "Filter port services by destination" });
    fireEvent.click(within(types).getByRole("link", { name: "Guided tours" }));
    await waitFor(() => expect(cards()).toHaveLength(catalogSizes[port] - 6));
    expect(router.state.location.search).toEqual({ service: "guided-tour" });
    const guidedId = cards()[0]!.dataset["serviceId"];
    fireEvent.click(within(destinations).getByRole("link", { name: "Jerusalem" }));
    await waitFor(() => expect(router.state.location.search).toEqual({ service: "guided-tour", destination: "jerusalem" }));
    expect(cards()[0]!.dataset["serviceId"]).toBe(guidedId);
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
    const guided = cards().find((card) => card.dataset["serviceId"] === "haifa-guided-jerusalem-bethlehem")!;
    expect(guided).not.toHaveTextContent("Sponsored link");
    const link = within(guided).getByRole("link", { name: /See dates and prices on Bein Harim/ });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    fireEvent.click(link);
    expect(JSON.parse(localStorage.getItem("itt_outbound_clicks_v1")!)[0]).toMatchObject({ event: "outbound_click", pageId: "shore-haifa", productId: "haifa-guided-jerusalem-bethlehem", offerId: "haifa-shore-beinharim" });
    for (const port of ["haifa", "ashdod"]) {
      const id = `${port}-shore-beinharim`;
      expect(providerLinks.find((provider) => provider.id === id)?.isAffiliate).toBe(Boolean(affiliateConfig[id]?.trackingUrl));
    }
  });

  it("retains one product identity across supported ports and verifies every external booking offer", () => {
    const sharedId = "shore-compass-tel-aviv-caesarea";
    const haifa = servicesForPort("haifa").find((item) => item.productId === sharedId)!;
    const ashdod = servicesForPort("ashdod").find((item) => item.productId === sharedId)!;
    expect(haifa.id).not.toBe(ashdod.id);
    expect(haifa.provider.id).toBe(ashdod.provider.id);
    expect(haifa.destinationIds).toEqual(["tel-aviv", "caesarea"]);
    for (const product of shoreTourProducts) {
      const link = providerLinks.find((item) => item.id === product.id)!;
      expect(link.url).toBe(affiliateConfig[product.id]?.trackingUrl || product.publicUrl);
      expect(link.isAffiliate).toBe(Boolean(affiliateConfig[product.id]?.trackingUrl));
      expect(Object.hasOwn(affiliateConfig, product.id)).toBe(true);
      expect(link.operatorId).toBe(product.operatorId);
      expect(link.partnerId).toBe(product.partnerId);
      expect(getSource(product.id).checkedAt).toBe("2026-10-21");
      for (const port of product.portIds) expect(shoreSourceIds(port)).toContain(product.id);
    }
    // These marketplace titles mention both ports, but their detailed return arrangements specify Ashdod.
    expect(servicesForPort("haifa").some((item) => item.operator?.id === "rent-a-guide")).toBe(false);
    expect(filterShoreServices("haifa", { destination: "nazareth", operator: "guided-tours-israel" })[0]?.partner?.name).toBe("Viator");
  });

  it("combines operator, destination and service tags, preserving the other tags when one is cleared", async () => {
    const { router } = await pageAt("/haifa-shore-excursions/?operator=tourist-israel");
    expect(cards()).toHaveLength(5);
    expect(cards().every((card) => card.dataset["operatorId"] === "tourist-israel")).toBe(true);
    fireEvent.click(within(screen.getByRole("navigation", { name: "Filter port services by destination" })).getByRole("link", { name: "Jerusalem" }));
    await waitFor(() => expect(cards()).toHaveLength(3));
    fireEvent.click(within(screen.getByRole("navigation", { name: "Filter port services by type" })).getByRole("link", { name: "Guided tours" }));
    await waitFor(() => expect(router.state.location.search).toEqual({ service: "guided-tour", destination: "jerusalem", operator: "tourist-israel" }));
    fireEvent.click(within(screen.getByRole("navigation", { name: "Filter port services by destination" })).getByRole("link", { name: "All destinations" }));
    await waitFor(() => expect(cards()).toHaveLength(5));
    expect(router.state.location.search).toEqual({ service: "guided-tour", operator: "tourist-israel" });
    expect(parseShoreServiceSearch({ operator: ["tourist-israel"] })).toEqual({});
    expect(parseShoreServiceSearch({ operator: "unknown" })).toEqual({});
  });

  it("identifies the actual operator separately from the marketplace and uses the product's own outbound link", async () => {
    await pageAt("/haifa-shore-excursions/?operator=ilya-pevzner&destination=akko");
    expect(cards()).toHaveLength(1);
    const card = cards()[0]!;
    expect(card).toHaveTextContent("Operated by Ilya Pevzner Guide Israel");
    expect(card).toHaveTextContent("Book on GetYourGuide");
    expect(card).not.toHaveTextContent(/From ILS|Sponsored link/);
    const link = within(card).getByRole("link", { name: /See tour on GetYourGuide/ });
    expect(link).toHaveAttribute("href", "https://www.getyourguide.com/haifa-l2051/haifa-acre-and-rosh-anikra-for-cruises-with-licensed-guide-t482201/");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    fireEvent.click(link);
    expect(JSON.parse(localStorage.getItem("itt_outbound_clicks_v1")!)[0]).toMatchObject({ pageId: "shore-haifa", productId: "shore-gyg-haifa-akko", offerId: "shore-gyg-haifa-akko" });
  });

});
