import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Route as AirportRoute } from "@/routes/airport-transfers.index";
import { routeTree } from "@/routeTree.gen";
import { airportTransferRates, airportTransferRoutes, affiliateConfig, linksForPage, partners } from "@/data/registry";
import { airportDestinationCards, airportHomepageRoutePhotos, airportTransferPhotos } from "@/data/airportTransfers";
import { emptyTransferQuote, buildTransferQuoteDraft, validateTransferQuote } from "@/lib/transfer-quote";
import { readOutboundClicks } from "@/lib/outbound";

afterEach(() => { cleanup(); localStorage.clear(); vi.restoreAllMocks(); });
async function renderAirport() {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, history: createMemoryHistory({ initialEntries: ["/airport-transfers/"] }), trailingSlash: "always" });
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
  it("shows four homepage-matched landscape route images and eight smaller illustrated destinations", async () => {
    expect(Object.fromEntries(airportTransferRates.map((r) => [r.id, r.price.amount]))).toEqual({
      "tel-aviv": 330, jerusalem: 550, haifa: 930, "dead-sea": 1300, raanana: 340, herzliya: 340, netanya: 450, ashdod: 480, caesarea: 630, nazareth: 950, eilat: 2700,
    });
    const { container, router } = await renderAirport();
    const quote = container.querySelector("#request-quote")!;
    const intro = within(quote as HTMLElement).getByTestId("quote-form-intro");
    expect(quote.firstElementChild?.firstElementChild).toBe(intro);
    expect(intro).toHaveClass("bg-navy", "border-b");
    expect(within(quote as HTMLElement).getByTestId("quote-fields-contact")).toHaveClass("sm:grid-cols-2", "xl:grid-cols-3");
    expect(within(quote as HTMLElement).getByTestId("quote-fields-arrival")).toHaveClass("sm:grid-cols-2", "xl:grid-cols-3");
    expect(within(quote as HTMLElement).getByTestId("quote-fields-destination")).toHaveClass("sm:grid-cols-2");
    expect(within(quote as HTMLElement).getByTestId("quote-fields-party")).toHaveClass("xl:grid-cols-3");
    const popular = screen.getByRole("region", { name: "Popular private transfers" });
    expect(within(popular).getAllByTestId("airport-destination-card").map((card) => card.dataset["destination"])).toEqual(["tel-aviv", "jerusalem", "haifa", "dead-sea"]);
    expect(screen.getAllByTestId("airport-destination-card")).toHaveLength(12);
    for (const rate of airportTransferRates) {
      expect(rate.price).toMatchObject({ kind: "published_starting_rate", currency: "ILS", basis: "per_vehicle", maxPartySize: 4, sourceId: "moshe-airport-transfers" });
      const card = container.querySelector(`[data-destination="${rate.id}"]`)! as HTMLElement;
      if (rate.popular) {
        expect(within(card).getByRole("img")).toHaveAttribute("src", airportHomepageRoutePhotos[rate.id]!.src);
        expect(card).toHaveClass("flex-row", "sm:flex-col");
        expect(within(card).getByRole("img")).toHaveClass("w-14", "sm:w-36");
        expect(within(card).getByRole("link", { name: "Request a quote" })).toHaveClass("sm:self-end");
        expect(within(card).getByRole("heading", { level: 3 })).toHaveClass("text-base", "sm:text-xl");
        expect(within(card).getByText(`From ₪${rate.price.amount.toLocaleString("en-US")}`)).toHaveClass("text-[13px]", "font-bold");
        const routeLink = within(card).getByRole("link", { name: /View transfer details/ });
        expect(router.matchRoutes(new URL(routeLink.getAttribute("href")!, "https://example.test").pathname).at(-1)?.routeId).toContain("airport-transfers");
      } else expect(within(card).getByRole("img")).toHaveAttribute("src", airportDestinationCards.find(item => item.id === rate.id)!.photo.src);
      const quoteButton = within(card).getByRole("link", { name: "Request a quote" });
      expect(quoteButton).toHaveAttribute("href", "#request-quote");
      expect(quoteButton).toHaveClass("bg-primary", "text-primary-foreground", "whitespace-nowrap", "shadow-sm", "min-h-9", "px-1.5", "sm:min-h-10", "sm:px-2");
      expect(quoteButton).not.toHaveClass("min-h-11", "px-3");
      expect(quoteButton).not.toHaveClass("bg-primary/10");
      expect(card).toHaveTextContent(rate.price.amount.toLocaleString("en-US"));
      expect(card.querySelector('[data-testid="currency-price"]')).toBeNull();
    }
    const more = screen.getByRole("region", { name: "More destinations from Ben Gurion Airport" });
    expect(within(more).getAllByTestId("airport-destination-card").map((card) => card.dataset["destination"])).toEqual(["raanana", "herzliya", "netanya", "ashdod", "caesarea", "nazareth", "eilat", "other"]);
    expect(within(more).getAllByRole("img")).toHaveLength(8);
    expect(more.querySelector(".auto-rows-fr")).not.toBeNull();
    expect(more.querySelector(".lg\\:grid-cols-2")).not.toBeNull();
    for (const card of within(more).getAllByTestId("airport-destination-card")) {
      expect(card).toHaveClass("grid", "h-full");
      expect(card.children[0]?.tagName).toBe("IMG");
      expect(card.children[1]?.querySelector("h3")).not.toBeNull();
      expect(card.children[1]?.querySelector("h3")).toHaveClass("text-base");
      expect(card.children[2]).toHaveTextContent("Request a quote");
      expect(card.children[2]).toHaveAttribute("href", "#request-quote");
      expect(card.children[2]).toHaveClass("whitespace-nowrap", "bg-primary", "text-primary-foreground", "justify-self-end");
      expect(card.children[2]).not.toHaveClass("col-span-2");
      expect(card).toHaveClass("grid-cols-[3.5rem_minmax(0,1fr)_6.5rem]", "sm:grid-cols-[6.5rem_minmax(0,1fr)_8.75rem]");
      if (card.dataset["destination"] !== "other") {
        expect(card.children[1]?.querySelector("p")).toHaveClass("text-[13px]", "font-bold");
      }
      expect(card.children[0]).toHaveAttribute("width", "128");
      expect(card.children[0]).toHaveAttribute("height", "85");
    }
    expect(new Set(within(more).getAllByRole("img").map(image => image.getAttribute("src"))).size).toBe(8);
    expect(within(more).getByRole("img", { name: airportTransferPhotos["other"]!.alt })).toHaveAttribute("src", airportTransferPhotos["other"]!.src);
    const rateTerms = screen.getByTestId("airport-rate-terms");
    expect(rateTerms).toHaveTextContent(/weekday.*up to four passengers.*Night, weekend and holiday/i);
    expect(rateTerms).not.toHaveTextContent("About starting prices:");
    const priceParagraphs = Array.from(rateTerms.querySelectorAll(":scope > p"));
    expect(priceParagraphs).toHaveLength(3); // Fare terms only; the page update now belongs in the opening header.
    expect(priceParagraphs[0]).toHaveTextContent("All prices are one-way weekday fares");
    expect(priceParagraphs[1]).toHaveTextContent("Larger vehicles for groups and families");
    expect(priceParagraphs[2]).toHaveTextContent("Full price is confirmed in advance.");
    expect(rateTerms).toHaveTextContent("Larger vehicles for groups and families can be provided, requiring a separate quote.");
    expect(screen.getByTestId("airport-fx-note")).toHaveTextContent("Full price is confirmed in advance. All fares are quoted and charged in ILS.");
    expect(screen.getByRole("heading", { name: "Private airport transfers from Ben Gurion Airport" })).toBeInTheDocument();
    expect(screen.getByTestId("hub-header").parentElement?.tagName).toBe("MAIN");
    const hubHeader = screen.getByTestId("hub-header");
    expect(within(hubHeader).getByTestId("guide-hero-media").querySelector("img")).toHaveAttribute("src", airportTransferPhotos["other"]!.src);
    const updateLine = within(hubHeader).getByText(/^Updated/);
    expect(updateLine).toHaveTextContent("Updated November 2026");
    expect(updateLine.querySelector("time")).toHaveAttribute("datetime", "2026-11-15");
    expect(rateTerms.querySelector("time")).toBeNull();
    expect(updateLine.compareDocumentPosition(popular)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(screen.getByRole("link", { name: "Request a personal quote" })).toHaveClass("bg-primary");
  });

  it("uses the lean content order and preserves booking links, benefits, FAQ and guide navigation", async () => {
    const { container, router } = await renderAirport();
    const sections = ["popular-destinations", "more-destinations", "benefits", "request-quote", "useful-information", "booking-platforms", "faq", "keep-planning", "trip-planning"];
    for (let i = 1; i < sections.length; i++) expect(container.querySelector(`#${sections[i - 1]}`)!.compareDocumentPosition(container.querySelector(`#${sections[i]}`)!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect((container.querySelector("#popular-destinations")!.textContent || "") + (container.querySelector("#more-destinations")!.textContent || "")).not.toMatch(/\b(metered|taxi rank|buses)\b/i);
    expect(container.querySelector("#after-request-h")).toBeNull();
    expect(screen.queryByText("Why arrange your airport pickup with me?")).not.toBeInTheDocument();
    const benefits = screen.getByRole("region", { name: "Private transfer benefits" });
    expect(within(benefits).getAllByRole("heading", { level: 3 })).toHaveLength(3);
    expect(benefits).toHaveTextContent("no extra charges");
    expect(benefits).toHaveTextContent("Flight tracking");
    expect(benefits).toHaveTextContent("Free cancellation up to 24 hours");
    const faq = screen.getByRole("region", { name: "Frequently asked questions" });
    expect(faq.querySelectorAll("details")).toHaveLength(5);
    expect(faq).toHaveTextContent("When can I cancel for free?");
    const related = screen.getByRole("region", { name: "Related travel guides" });
    expect(within(related).getAllByRole("link")).toHaveLength(6);
    expect(within(related).getAllByRole("img")).toHaveLength(6);
    expect(new Set(within(related).getAllByRole("img").map(image => image.getAttribute("src"))).size).toBe(6);
    const planning = screen.getByRole("region", { name: "Plan your trip to Israel" });
    expect(within(planning).getAllByRole("link")).toHaveLength(6);
    expect(within(planning).queryAllByRole("img")).toHaveLength(0);
    expect(within(planning).getAllByRole("link").every(link => link.querySelector("svg") !== null)).toBe(true);
    expect(new Set(within(planning).getAllByRole("link").map(link => link.getAttribute("href"))).size).toBe(6);
    expect(within(planning).getByRole("link", { name: /Israel itinerary: 7 days/ })).toHaveAttribute("href", "/travel-blog/israel-itinerary-7-days/");
    const checklist = screen.getByRole("list", { name: "Airport transfer checklist" });
    expect(within(checklist).getAllByRole("listitem")).toHaveLength(5);
    expect(checklist).toHaveTextContent("if you need them.");
    expect(checklist).not.toHaveTextContent("if your party needs them.");
    expect(within(benefits).getByText(/Flight status is monitored/)).toBeInTheDocument();
    expect(within(benefits).getByText(/Direct bookings can be cancelled free/)).toBeInTheDocument();
    for (const link of [...within(related).getAllByRole("link"), ...within(planning).getAllByRole("link")]) {
      const path = link.getAttribute("href")!;
      expect(router.matchRoutes(path).at(-1)?.routeId.replace(/\/$/, "")).toBe(path.replace(/\/$/, ""));
    }
    const head = await AirportRoute.options.head?.({} as never);
    expect(head).toMatchObject({ meta: expect.arrayContaining([{ name: "robots", content: "noindex,nofollow" }, { title: expect.stringContaining("Airport transfers") }]), links: [{ rel: "canonical", href: expect.stringMatching(/\/airport-transfers\/$/) }] });
  });

  it("selects the clicked destination in the form and handles groups and other addresses", async () => {
    const { container } = await renderAirport();
    chooseDestination("netanya");
    expect(screen.getByLabelText("Destination *")).toHaveValue("netanya");
    chooseDestination("jerusalem");
    expect(screen.getByLabelText("Destination *")).toHaveValue("jerusalem");
    fireEvent.change(screen.getByLabelText("Passengers *"), { target: { value: "6" } });
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
    expect(JSON.parse(String(fetchSpy.mock.calls[0]![1]?.body))).toMatchObject({ sourceTitle: "Private airport transfers from Ben Gurion Airport", request: { kind: "transfer", fields: { destinationId: "jerusalem", email: "jamie+trip@example.com", date: "2099-11-01", time: "23:45", flight: "LY123", address: "Example Hotel, Jerusalem", consent: true } } });
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

  it("tracks all four booking brands independently across hub and four route pages", () => {
    const pageIds = ["airport-private-transfers", "airport-route-jerusalem", "airport-route-tel-aviv", "airport-route-haifa", "airport-route-dead-sea"];
    const expectedIds = ["airport-kiwitaxi", "airport-welcome", "airport-intui", "airport-gettransfer"];
    const urls: string[] = [];
    for (const pageId of pageIds) {
      const links = linksForPage(pageId).filter(link => expectedIds.includes(link.id));
      expect(links.map(link => link.id)).toEqual(expectedIds);
      for (const link of links) {
        expect(link.isAffiliate).toBe(true);
        expect(link.url).toMatch(/^https:\/\/(?:[a-z0-9-]+\.)?(?:tpm\.li|tp\.st)\/[A-Za-z0-9]+/);
        if (pageId !== "airport-private-transfers") expect(affiliateConfig[`${link.id}@${pageId}`]?.trackingUrl).toBe(link.url);
        urls.push(link.url);
      }
    }
    expect(new Set(urls).size).toBe(20);
    expect(airportTransferRoutes.map((route) => route.path)).toEqual(["/airport-transfers/jerusalem/", "/airport-transfers/tel-aviv/", "/airport-transfers/haifa/", "/airport-transfers/ein-bokek/"]);
    expect(pageIds).toEqual(["airport-private-transfers", ...airportTransferRoutes.map((route) => `airport-route-${route.id}`)]);
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
    expect(banners.map(banner => banner.textContent)).toEqual([
      expect.stringContaining("Check prices"),
      expect.stringContaining("Book your pickup"),
      expect.stringContaining("Explore transfers"),
      expect.stringContaining("Compare offers"),
    ]);
    const buttonColors = ["bg-emerald-200", "bg-amber-200", "bg-sky-200", "bg-indigo-200"];
    for (const [index, banner] of banners.entries()) {
      const button = banner.querySelector(`.${buttonColors[index]}`);
      expect(button).not.toBeNull();
      expect(button).toHaveClass("border", "shadow-sm");
      expect(banner.querySelector(".bg-navy")).toBeNull();
    }
    const providerSection = screen.getByRole("region", { name: "Prefer to book online?" });
    expect(providerSection).toHaveTextContent("You can also search for an airport transfer on one of the booking websites below.");
    expect(providerSection).toHaveTextContent("Each provider sets its own prices and terms.");
    expect(screen.getByTestId("airport-external-providers-note")).toHaveTextContent("Please review all details carefully before booking.");
    expect(banners.every(banner => Boolean(banner.querySelector(".self-center")))).toBe(true);
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
