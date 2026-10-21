import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Route as AirportRoute } from "@/routes/transfers.index";
import { routeTree } from "@/routeTree.gen";
import { airportTransferRates, affiliateConfig, linksForPage, partners } from "@/data/registry";
import { airportTransferPhotos } from "@/data/airportTransfers";
import { emptyTransferQuote, buildTransferQuoteDraft, validateTransferQuote } from "@/lib/transfer-quote";
import { readOutboundClicks } from "@/lib/outbound";

afterEach(() => { cleanup(); localStorage.clear(); vi.restoreAllMocks(); });
async function renderAirport() {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, history: createMemoryHistory({ initialEntries: ["/transfers/"] }), trailingSlash: "always" });
  await router.load();
  const Airport = AirportRoute.options.component!;
  return { ...render(<RouterContextProvider router={router}><Airport /></RouterContextProvider>), router };
}
function chooseDestination(id: string) {
  const card = screen.getAllByTestId("airport-destination-card").find((item) => item.dataset["destination"] === id)!;
  fireEvent.click(within(card).getByRole("link", { name: "Request a quote" }));
}
function fillRequest() {
  fireEvent.change(screen.getByLabelText("Full name *"), { target: { value: "Jamie Smith" } });
  fireEvent.change(screen.getByLabelText("Email address *"), { target: { value: "jamie+trip@example.com" } });
  fireEvent.change(screen.getByLabelText("Flight arrival date *"), { target: { value: "2099-11-01" } });
  fireEvent.change(screen.getByLabelText("Flight arrival time *"), { target: { value: "23:45" } });
  fireEvent.change(screen.getByLabelText("Flight number"), { target: { value: "LY123" } });
  fireEvent.change(screen.getByLabelText("Drop-off hotel or address"), { target: { value: "Example Hotel, Jerusalem" } });
  fireEvent.click(screen.getByRole("checkbox"));
}

describe("private Ben Gurion transfers", () => {
  it("uses all eleven published ILS starting fares, with four popular destinations and image cards", async () => {
    expect(Object.fromEntries(airportTransferRates.map((r) => [r.id, r.price.amount]))).toEqual({
      "tel-aviv": 330, jerusalem: 550, haifa: 930, "dead-sea": 1300, raanana: 340, herzliya: 340, netanya: 450, ashdod: 480, caesarea: 630, nazareth: 950, eilat: 2700,
    });
    const { container } = await renderAirport();
    const popular = screen.getByRole("region", { name: "Popular private transfers" });
    expect(within(popular).getAllByTestId("airport-destination-card").map((card) => card.dataset["destination"])).toEqual(["tel-aviv", "jerusalem", "haifa", "dead-sea"]);
    expect(screen.getAllByTestId("airport-destination-card")).toHaveLength(12);
    for (const rate of airportTransferRates) {
      expect(rate.price).toMatchObject({ kind: "published_starting_rate", currency: "ILS", basis: "per_vehicle", maxPartySize: 4, sourceId: "moshe-airport-transfers" });
      const card = container.querySelector(`[data-destination="${rate.id}"]`)!;
      const image = within(card as HTMLElement).getByRole("img");
      expect(image).toHaveAttribute("src", airportTransferPhotos[rate.id]!.src);
      expect(image).toHaveAttribute("alt", airportTransferPhotos[rate.id]!.alt);
      expect(image).toHaveAttribute("width", rate.popular ? "360" : "80");
      expect(image).toHaveAttribute("height", rate.popular ? "240" : "80");
      expect(within(card as HTMLElement).getByRole("link", { name: "Request a quote" })).toHaveAttribute("href", "#request-quote");
      expect(card).toHaveTextContent(rate.price.amount.toLocaleString("en-US"));
    }
    const more = screen.getByRole("region", { name: "More destinations from Ben Gurion Airport" });
    expect(within(more).getAllByTestId("airport-destination-card").map((card) => card.dataset["destination"])).toEqual(["raanana", "herzliya", "netanya", "ashdod", "caesarea", "nazareth", "eilat", "other"]);
    expect(new Set(within(more).getAllByRole("img").map((image) => image.getAttribute("src"))).size).toBe(8);
    expect(screen.getByTestId("airport-rate-terms")).toHaveTextContent(/weekday.*up to four.*Night, weekend and holiday/s);
  });

  it("keeps the requested content order and removes public-transport comparisons", async () => {
    const { container, router } = await renderAirport();
    const sections = ["popular-destinations", "more-destinations", "request-quote", "benefits", "useful-information", "faq", "booking-platforms", "keep-planning"];
    for (let i = 1; i < sections.length; i++) expect(container.querySelector(`#${sections[i - 1]}`)!.compareDocumentPosition(container.querySelector(`#${sections[i]}`)!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(container.querySelector("main")!.textContent).not.toMatch(/\b(metered|taxi rank|train|buses)\b/i);
    const related = screen.getByRole("region", { name: "Your ride is only the start" });
    expect(within(related).getAllByRole("link")).toHaveLength(9);
    for (const link of within(related).getAllByRole("link")) {
      const path = link.getAttribute("href")!;
      expect(router.matchRoutes(path).at(-1)?.routeId.replace(/\/$/, "")).toBe(path.replace(/\/$/, ""));
    }
    const head = await AirportRoute.options.head?.({} as never);
    expect(head).toMatchObject({ meta: expect.arrayContaining([{ name: "robots", content: "noindex,nofollow" }, { title: expect.stringContaining("Airport transfers") }]), links: [{ rel: "canonical", href: expect.stringMatching(/\/transfers\/$/) }] });
  });

  it("selects the clicked destination in the form and handles groups and other addresses", async () => {
    const { container } = await renderAirport();
    chooseDestination("netanya");
    expect(screen.getByLabelText("Destination *")).toHaveValue("netanya");
    chooseDestination("jerusalem");
    expect(screen.getByLabelText("Destination *")).toHaveValue("jerusalem");
    fireEvent.change(screen.getByLabelText("Passengers, including children *"), { target: { value: "6" } });
    expect(screen.getByText(/published car starting prices do not apply/)).toBeInTheDocument();
    chooseDestination("other");
    expect(screen.getByLabelText("City or destination *")).toBeRequired();
    expect(screen.getByLabelText("Destination *")).toHaveValue("other");
  });

  it("validates required fields, then sends all journey details directly without browser storage", async () => {
    const { container } = await renderAirport();
    fireEvent.click(screen.getByRole("button", { name: "Send quote request" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Enter your full name");
    expect(screen.queryByRole("link", { name: "Open email to Moshe" })).not.toBeInTheDocument();
    chooseDestination("jerusalem");
    fillRequest();
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockImplementation(async (_url, options) => Response.json({ accepted: true, requestId: JSON.parse(String(options?.body)).requestId }));
    fireEvent.click(screen.getByRole("button", { name: "Send quote request" }));
    expect(await screen.findByText("Thank you for contacting me")).toBeInTheDocument();
    expect(fetchSpy).toHaveBeenCalledOnce();
    expect(fetchSpy).toHaveBeenCalledWith("/api/quote-request/", expect.objectContaining({ method: "POST" }));
    expect(JSON.parse(String(fetchSpy.mock.calls[0]![1]?.body))).toMatchObject({ sourceTitle: "Airport transfers", request: { kind: "transfer", fields: { destinationId: "jerusalem", email: "jamie+trip@example.com", date: "2099-11-01", time: "23:45", flight: "LY123", address: "Example Hotel, Jerusalem", consent: true } } });
    expect(localStorage.length).toBe(0);
    fireEvent.change(screen.getByLabelText("Full name *"), { target: { value: "Another name" } });
    expect(screen.queryByRole("link", { name: "Open email to Moshe" })).not.toBeInTheDocument();
  });

  it("keeps the details and shows an honest error if direct sending is unavailable", async () => {
    const { container } = await renderAirport();
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute("href", "/privacy-policy/");
    expect(screen.queryByText(/Prefer an online form|existing .*contact form/)).not.toBeInTheDocument();
    chooseDestination("tel-aviv");
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json({ error: "Unavailable" }, { status: 503 }));
    fillRequest(); fireEvent.click(screen.getByRole("button", { name: "Send quote request" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Message sending is temporarily unavailable");
    expect(screen.getByLabelText("Full name *")).toHaveValue("Jamie Smith");
    expect(screen.queryByText("Thank you for contacting me")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Copy|Prepare/ })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Open email/ })).not.toBeInTheDocument();
    expect(fetchSpy).toHaveBeenCalledOnce();
  });

  it("shows four branded platform banners without invented affiliate attribution or transferring personal details", async () => {
    await renderAirport();
    const platforms = linksForPage("airport-private-transfers");
    const banners = screen.getAllByTestId("airport-platform-banner");
    expect(platforms.map((p) => p.providerName)).toEqual(["Kiwitaxi", "Welcome Pickups", "Intui.travel", "GetTransfer.com"]);
    for (const [index, platform] of platforms.entries()) {
      const logo = partners.find((partner) => partner.id === platform.partnerId)!.logo!;
      const image = within(banners[index]!).getByRole("img", { name: `${platform.providerName} logo` });
      expect(image).toHaveAttribute("src", logo.src);
      expect(image).toHaveAttribute("width", String(logo.width));
      expect(image).toHaveAttribute("height", String(logo.height));
      expect(image).toHaveAttribute("loading", "lazy");
      expect(within(banners[index]!).getByRole("heading", { name: platform.providerName })).toBeVisible();
      expect(banners[index]).toHaveAttribute("href", platform.url);
      expect(banners[index]).toHaveAttribute("target", "_blank");
      expect(banners[index]).toHaveAttribute("rel", platform.isAffiliate ? "sponsored noopener noreferrer" : "noopener noreferrer");
      expect(platform.isAffiliate).toBe(Boolean(affiliateConfig[platform.id]?.trackingUrl));
    }
    expect(new Set(banners.map((banner) => within(banner).getByRole("img").getAttribute("src"))).size).toBe(4);
    fireEvent.click(banners[0]!);
    expect(readOutboundClicks()).toEqual([expect.objectContaining({ pageId: "airport-private-transfers", productId: "airport-kiwitaxi", offerId: "airport-kiwitaxi" })]);
    expect(JSON.stringify(readOutboundClicks())).not.toContain("email");
  });
});

describe("transfer request validation", () => {
  it("handles group sizes, calendar errors, past Israel time, consent and custom destinations", () => {
    const good = { ...emptyTransferQuote, name: "Jamie", email: "jamie@example.com", date: "2026-10-18", time: "09:00", passengers: "20", destinationId: "jerusalem", consent: true };
    const now = new Date("2026-10-17T14:00:00Z");
    expect(validateTransferQuote(good, now)).toEqual([]);
    expect(validateTransferQuote({ ...good, date: "2026-02-31" }, now)).toContain("Choose a valid flight arrival date.");
    expect(validateTransferQuote({ ...good, date: "2026-10-17", time: "10:00" }, now)).toContain("That arrival time has already passed today in Israel.");
    expect(validateTransferQuote({ ...good, passengers: "0", consent: false }, now)).toHaveLength(2);
    expect(validateTransferQuote({ ...good, destinationId: "other" }, now)).toContain("Enter the city or destination for your request.");
    const custom = { ...good, destinationId: "other", otherDestination: "Akko\r\nBcc: someone@example.com" };
    expect(buildTransferQuoteDraft(custom).subject).not.toMatch(/[\r\n]/);
  });
});
