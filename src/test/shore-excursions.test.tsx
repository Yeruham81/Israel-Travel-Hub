import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GlobalNav, SiteHeader } from "@/components/Layout";
import { getShorePort } from "@/data/shoreExcursions";
import { getSource, publicSources, SHORE_EXCURSION_CHECK_DATE, shoreExcursionRates, shorePorts } from "@/data/registry";
import { servicesForPort, shoreSourceIds } from "@/lib/shore-services";
import { buildShoreQuoteDraft, emptyShoreQuote, validateShoreQuote } from "@/lib/shore-quote";
import { routeTree } from "@/routeTree.gen";
import { Route as AshdodRoute } from "@/routes/ashdod-shore-excursions";
import { Route as HaifaRoute } from "@/routes/haifa-shore-excursions";

afterEach(() => { cleanup(); localStorage.clear(); vi.restoreAllMocks(); });
const cases = [{ id: "ashdod", route: AshdodRoute }, { id: "haifa", route: HaifaRoute }] as const;
async function routerAt(path = "/shore-excursions/") {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, history: createMemoryHistory({ initialEntries: [path] }), trailingSlash: "always" });
  await router.load();
  return router;
}

describe("shore excursions", () => {
  it("always shows both port pages under a single sidebar parent and marks the current port", async () => {
    const router = await routerAt();
    const result = render(<RouterContextProvider router={router}><GlobalNav /></RouterContextProvider>);
    const nav = screen.getByRole("navigation", { name: "Explore Israel" });
    expect(within(nav).getAllByRole("link", { name: "Shore excursions" })).toHaveLength(1);
    expect(within(nav).queryByRole("button", { name: "Choose a shore excursion port" })).not.toBeInTheDocument();
    expect(within(nav).getByRole("link", { name: "From Haifa Port" })).toBeVisible();
    const ports = within(nav).getByRole("list", { name: "Shore excursion ports" });
    expect(within(ports).getAllByRole("link").map((link) => link.getAttribute("href"))).toEqual([shorePorts.haifa.path, shorePorts.ashdod.path]);
    fireEvent.click(within(ports).getByRole("link", { name: "From Haifa Port" }));
    await waitFor(() => expect(router.state.location.pathname).toBe(shorePorts.haifa.path));
    expect(within(ports).getByRole("link", { name: "From Haifa Port" })).toHaveAttribute("aria-current", "page");
    result.unmount();
    render(<RouterContextProvider router={router}><GlobalNav /></RouterContextProvider>);
    expect(screen.queryByRole("button", { name: "Choose a shore excursion port" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "From Ashdod Port" })).toBeVisible();
    expect(screen.getByRole("link", { name: "From Haifa Port" })).toBeVisible();
  });

  it("keeps both port choices visible in the mobile drawer without a toggle and closes after navigation", async () => {
    const router = await routerAt();
    render(<RouterContextProvider router={router}><SiteHeader /></RouterContextProvider>);
    fireEvent.click(screen.getByRole("button", { name: "Menu" }));
    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).queryByRole("button", { name: "Choose a shore excursion port" })).not.toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: "From Haifa Port" })).toBeVisible();
    fireEvent.click(within(dialog).getByRole("link", { name: "From Ashdod Port" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(router.state.location.pathname).toBe(shorePorts.ashdod.path));
  });

  it("uses the eight exact published ILS vehicle rates and a separate source for each port", () => {
    expect(Object.fromEntries(shoreExcursionRates.map((rate) => [rate.id, rate.price.amount]))).toEqual({ "ashdod-tel-aviv": 1200, "ashdod-jerusalem": 1700, "ashdod-masada": 2200, "ashdod-masada-jerusalem": 2400, "haifa-akko": 1900, "haifa-tel-aviv": 2100, "haifa-galilee": 2300, "haifa-jerusalem": 2700 });
    for (const rate of shoreExcursionRates) {
      expect(rate.price).toMatchObject({ kind: "published_starting_rate", currency: "ILS", basis: "per_vehicle", maxPartySize: 4, sourceId: shorePorts[rate.portId].sourceId });
      expect(getSource(rate.price.sourceId).checkedAt).toBe(SHORE_EXCURSION_CHECK_DATE);
      expect(rate.price.conditions).toMatch(/Licensed guiding, admission, meals and tips are excluded/);
    }
  });

  it.each(cases)("renders $id with an integrated service catalog, a port-specific inquiry and matching metadata", async ({ id, route }) => {
    const port = getShorePort(id);
    const router = await routerAt(port.path);
    const Page = route.options.component!;
    const { container } = render(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(port.title);
    expect(router.matchRoutes(port.path).at(-1)?.routeId).toBe(port.path.replace(/\/$/, ""));
    const services = screen.getAllByTestId("shore-service-card");
    expect(services).toHaveLength(servicesForPort(id).length);
    const cards = services.filter((card) => card.dataset["serviceKind"] === "private-driver");
    expect(cards).toHaveLength(4);
    cards.forEach((card, index) => {
      const itinerary = port.itineraries[index]!;
      expect(within(card).getByRole("heading", { level: 3 })).toHaveTextContent(itinerary.destination);
      expect(within(card).getByRole("img").getAttribute("alt")).toBeTruthy();
      expect(card).toHaveTextContent(`From ILS ${itinerary.price.amount.toLocaleString("en-US")}`);
      expect(card).toHaveTextContent("Per vehicle · up to 4 · transport only");
      expect(within(card).getByRole("link", { name: `Request ${itinerary.destination} from ${port.name}` })).toHaveAttribute("href", "#request-quote");
    });
    expect(container.querySelector("#itineraries")!.compareDocumentPosition(container.querySelector("#request-quote")!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(screen.getByLabelText("Departure & return port")).toHaveValue(`${port.name} Port`);
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute("href", "/privacy-policy/");
    expect(screen.queryByText(/Prefer an online form|existing .*contact form/)).not.toBeInTheDocument();
    const alternative = services.find((card) => card.dataset["productId"] === `shore-viator-${id}-jerusalem-bethlehem`)!;
    expect(alternative).toHaveTextContent("Bein Harim Tours");
    expect(alternative).not.toHaveTextContent(/From ILS/);
    expect(within(alternative).getByRole("link", { name: /View on Viator/ })).toHaveAttribute("rel", "noopener noreferrer");
    const related = screen.getByRole("region", { name: "Useful guides for your day ashore" });
    expect(within(related).getAllByRole("article")).toHaveLength(6);
    expect(within(related).getAllByRole("img")).toHaveLength(6);
    expect(within(related).getAllByRole("heading", { level: 3 })).toHaveLength(6);
    expect(within(related).getAllByRole("link")).toHaveLength(6);
    expect(related).not.toHaveTextContent("→");
    for (const link of within(related).getAllByRole("link")) {
      expect(link).toHaveTextContent("Read More");
      const href = link.getAttribute("href")!;
      expect(router.matchRoutes(href).at(-1)?.routeId).toBe(href.replace(/\/$/, ""));
    }
    expect(container.querySelector("a a")).toBeNull();
    expect(container.querySelector(`header time[datetime="${SHORE_EXCURSION_CHECK_DATE}"]`)).toBeInTheDocument();
    const head = await route.options.head?.({} as never);
    expect(head).toMatchObject({ meta: expect.arrayContaining([{ title: expect.stringContaining(`${port.name} shore excursions`) }, { name: "robots", content: "noindex,nofollow" }]), links: [{ rel: "canonical", href: expect.stringContaining(port.path) }] });
    const schemas = (head?.scripts || []).map((script) => typeof script?.children === "string" ? JSON.parse(script.children) : null);
    expect(schemas.find((schema) => schema?.["@type"] === "Article")).toMatchObject({ headline: port.title, dateModified: SHORE_EXCURSION_CHECK_DATE, author: { "@type": "Person", name: "Moshe Barak" }, citation: publicSources(shoreSourceIds(id)).map((source) => source.url) });
    expect(schemas.some((schema) => schema?.["@type"] === "FAQPage")).toBe(false);
  });

  it.each(cases)("selects a $id card and sends all ship and itinerary details directly", async ({ id, route }) => {
    const port = getShorePort(id);
    const router = await routerAt(port.path);
    const Page = route.options.component!;
    render(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
    const itinerary = port.itineraries[0]!;
    fireEvent.click(screen.getByRole("link", { name: `Request ${itinerary.destination} from ${port.name}` }));
    expect(screen.getByLabelText("Requested itinerary *")).toHaveValue(itinerary.id);
    fireEvent.click(screen.getByRole("button", { name: "Send excursion request" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Enter your cruise ship's name");
    fireEvent.change(screen.getByLabelText("Full name *"), { target: { value: "Jamie & family" } });
    fireEvent.change(screen.getByLabelText("Email address *"), { target: { value: "jamie+cruise@example.com" } });
    fireEvent.change(screen.getByLabelText("Cruise ship name *"), { target: { value: "Example Voyager" } });
    fireEvent.change(screen.getByLabelText("Excursion date *"), { target: { value: "2099-11-01" } });
    expect(screen.getByLabelText("All-aboard date *")).toHaveValue("2099-11-01");
    fireEvent.change(screen.getByLabelText("Expected disembarkation time *"), { target: { value: "08:00" } });
    fireEvent.change(screen.getByLabelText("Ship's all-aboard time *"), { target: { value: "18:00" } });
    fireEvent.change(screen.getByLabelText("Passengers *"), { target: { value: "6" } });
    expect(screen.getByText(/Your party needs a separate group quote/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("checkbox"));
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockImplementation(async (_url, options) => Response.json({ accepted: true, requestId: JSON.parse(String(options?.body)).requestId }));
    fireEvent.click(screen.getByRole("button", { name: "Send excursion request" }));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(await screen.findByText("Thank you for contacting me")).toBeInTheDocument();
    expect(fetchSpy).toHaveBeenCalledOnce();
    expect(fetchSpy).toHaveBeenCalledWith("/api/quote-request/", expect.objectContaining({ method: "POST" }));
    expect(JSON.parse(String(fetchSpy.mock.calls[0]![1]?.body))).toMatchObject({ sourceTitle: port.title, request: { kind: "shore", portId: id, fields: { ship: "Example Voyager", date: "2099-11-01", pickupTime: "08:00", allAboardDate: "2099-11-01", allAboardTime: "18:00", passengers: "6", itineraryId: itinerary.id, consent: true } } });
    expect(localStorage.length).toBe(0);
    fireEvent.click(screen.getByRole("link", { name: `Request ${port.itineraries[1]!.destination} from ${port.name}` }));
    expect(screen.getByRole("button", { name: "Send excursion request" })).toBeEnabled();
    fireEvent.click(screen.getByRole("link", { name: "Ask for a custom itinerary" }));
    expect(screen.getByLabelText("Requested itinerary *")).toHaveValue("other");
    expect(screen.getByLabelText("Your itinerary or destinations *")).toBeRequired();
  });

  it("validates ship dates, overnight calls, a foreign port itinerary and consent without leaking a fixed price", () => {
    const now = new Date("2026-10-17T18:00:00Z");
    const valid = { ...emptyShoreQuote, name: "Jamie", email: "j@example.com", ship: "Voyager", date: "2026-10-18", pickupTime: "08:00", allAboardDate: "2026-10-18", allAboardTime: "18:00", itineraryId: "haifa-akko", consent: true };
    expect(validateShoreQuote(valid, "haifa", now)).toEqual([]);
    expect(validateShoreQuote({ ...valid, date: "2026-02-30" }, "haifa", now)).toContain("Choose a valid excursion date.");
    expect(validateShoreQuote({ ...valid, date: "2026-10-16" }, "haifa", now).join(" ")).toMatch(/past in Israel/);
    expect(validateShoreQuote({ ...valid, date: "2026-10-17", pickupTime: "20:59" }, "haifa", now).join(" ")).toMatch(/already passed today in Israel/);
    expect(validateShoreQuote({ ...valid, allAboardTime: "07:30" }, "haifa", now).join(" ")).toMatch(/All-aboard must be later/);
    expect(validateShoreQuote({ ...valid, allAboardDate: "2026-10-19", allAboardTime: "07:30" }, "haifa", now)).toEqual([]);
    expect(validateShoreQuote({ ...valid, itineraryId: "ashdod-jerusalem" }, "haifa", now)).toContain("Choose an itinerary from this port.");
    expect(validateShoreQuote({ ...valid, consent: false }, "haifa", now).join(" ")).toMatch(/agree to share/);
    const draft = buildShoreQuoteDraft({ ...valid, itineraryId: "other", otherItinerary: "Caesarea\n& Haifa", notes: "Please add a licensed guide & child seat." }, "haifa");
    const url = new URL(draft.url);
    expect(url.searchParams.get("subject")).toBe("Moshe Barak - Taxi & Travel in Israel / Jamie");
    expect(url.searchParams.get("body")).toContain("Please add a licensed guide & child seat.");
    expect(draft.body).not.toMatch(/ILS|1,900|1900/);
  });
});
