import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { affiliateConfig, providerLinks, shorePorts, shoreServices, type ShorePortId } from "@/data/registry";
import { filterShoreServices, parsePortTransferSearch, parseShoreServiceSearch, servicesForPort, shoreServiceHref } from "@/lib/shore-services";
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

describe("port service catalog", () => {
  it("keeps the actual port context, service identity and multi-stop destinations separate", () => {
    for (const port of ["haifa", "ashdod"] as const) {
      const services = servicesForPort(port);
      expect(services).toHaveLength(7);
      expect(new Set(services.map((service) => service.id)).size).toBe(services.length);
      expect(services.every((service) => service.portId === port && service.provider.pageIds.includes(shorePorts[port].pageId))).toBe(true);
      expect(filterShoreServices(port, { service: "transfer" })).toHaveLength(2);
    }
    const byMasada = filterShoreServices("ashdod", { destination: "masada" });
    const byDeadSea = filterShoreServices("ashdod", { destination: "dead-sea" });
    expect(byMasada.map((service) => service.id)).toEqual(byDeadSea.map((service) => service.id));
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
    expect(cards()).toHaveLength(7);
    expect(screen.queryByRole("search")).not.toBeInTheDocument();
    expect(container.querySelector("a a")).toBeNull();
    fireEvent.change(screen.getByLabelText("Full name *"), { target: { value: "Jamie Cruise" } });
    const types = screen.getByRole("navigation", { name: "Filter port services by type" });
    const destinations = screen.getByRole("navigation", { name: "Filter port services by destination" });
    fireEvent.click(within(types).getByRole("link", { name: "Guided tours" }));
    await waitFor(() => expect(cards()).toHaveLength(1));
    expect(router.state.location.search).toEqual({ service: "guided-tour" });
    const guidedId = cards()[0]!.dataset["serviceId"];
    fireEvent.click(within(destinations).getByRole("link", { name: "Jerusalem" }));
    await waitFor(() => expect(router.state.location.search).toEqual({ service: "guided-tour", destination: "jerusalem" }));
    expect(cards()[0]!.dataset["serviceId"]).toBe(guidedId);
    expect(screen.getByLabelText("Full name *")).toHaveValue("Jamie Cruise");
    await act(async () => { history.back(); });
    await waitFor(() => expect(router.state.location.search).toEqual({ service: "guided-tour" }));
    fireEvent.click(screen.getByRole("link", { name: "Clear filters" }));
    await waitFor(() => expect(cards()).toHaveLength(7));
    expect(router.state.location.search).toEqual({});
    expect(screen.getByLabelText("Full name *")).toHaveValue("Jamie Cruise");
  });

  it("restores combined filters from a direct link and offers a working way out of an empty combination", async () => {
    await pageAt("/haifa-shore-excursions/?service=transfer&destination=jerusalem");
    expect(cards()).toHaveLength(0);
    expect(screen.getByRole("heading", { name: "No services match these tags" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("link", { name: "Clear filters" }));
    await waitFor(() => expect(cards()).toHaveLength(7));
    const tag = within(screen.getByRole("navigation", { name: "Filter port services by type" })).getByRole("link", { name: "Transfers" });
    let preventedByApp = true;
    window.addEventListener("click", (event) => { preventedByApp = event.defaultPrevented; event.preventDefault(); }, { once: true });
    fireEvent.click(tag, { ctrlKey: true });
    expect(preventedByApp).toBe(false);
    expect(cards()).toHaveLength(7);
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
    expect(screen.getByLabelText("Driver or licensed guide?")).toHaveValue("driver-only");
    expect(screen.queryByLabelText("Ship's all-aboard time *")).not.toBeInTheDocument();
    expect((screen.getByLabelText("Child seats or additional requests") as HTMLTextAreaElement).value).toContain(`${shorePorts[port].name} Port`);
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
    const guided = cards()[0]!;
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
});
