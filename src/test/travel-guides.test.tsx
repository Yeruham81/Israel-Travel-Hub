import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";
import { Route as HubRoute } from "@/routes/guides";
import { Route as UberRoute } from "@/routes/travel-blog.uber-in-israel";
import { Route as SherutRoute } from "@/routes/travel-blog.sherut-in-israel";
import { Route as EsimRoute } from "@/routes/travel-blog.best-esim-for-israel";
import { Route as ArrivalRoute } from "@/routes/travel-blog.ben-gurion-airport-arrival-tips";
import { Route as IsraelRoute } from "@/routes/travel-blog.getting-around-israel";
import { Route as TelAvivRoute } from "@/routes/travel-blog.getting-around-tel-aviv";
import { Route as TaxiRoute } from "@/routes/travel-blog.taxis-in-israel";
import { Route as TaxiFaresRoute } from "@/routes/travel-blog.taxi-fares-in-israel";
import { Route as AirportTaxisRoute } from "@/routes/travel-blog.ben-gurion-airport-taxis";
import { Route as ShabbatRoute } from "@/routes/travel-blog.from-ben-gurion-airport-on-shabbat";
import { Route as TipsRoute } from "@/routes/travel-blog.israel-travel-tips";
import { Route as JerusalemRoute } from "@/routes/travel-blog.jerusalem-travel-guide";
import { Route as DeadSeaRoute } from "@/routes/travel-blog.jerusalem-to-the-dead-sea";
import { Route as BaptismRoute } from "@/routes/travel-blog.baptism-in-the-jordan-river";
import { Route as JerusalemDayTripsRoute } from "@/routes/travel-blog.day-trips-from-jerusalem";
import { Route as ChurchesRoute } from "@/routes/travel-blog.churches-in-jerusalem";
import { Route as ShoppingRoute } from "@/routes/travel-blog.shopping-in-jerusalem";
import { Route as TelAvivDayTripsRoute } from "@/routes/travel-blog.day-trips-from-tel-aviv";
import { filterGuides, guideDirectory, guideTopics, travelGuides } from "@/data/travelGuides";
import { affiliateConfig, getSource, isPublisherUrl, linksForPage, mosheBarakAuthor, travelGuidePaths, TRAVEL_GUIDE_CHECK_DATE } from "@/data/registry";
import { readOutboundClicks } from "@/lib/outbound";

afterEach(() => { cleanup(); localStorage.clear(); });
const cases = [{ id: "uber", route: UberRoute }, { id: "sherut", route: SherutRoute }, { id: "esim", route: EsimRoute }, { id: "arrival", route: ArrivalRoute }, { id: "israel", route: IsraelRoute }, { id: "telAviv", route: TelAvivRoute }, { id: "taxis", route: TaxiRoute },
  { id: "shabbat", route: ShabbatRoute }, { id: "travelTips", route: TipsRoute }, { id: "jerusalem", route: JerusalemRoute }, { id: "jerusalemDeadSea", route: DeadSeaRoute }, { id: "baptism", route: BaptismRoute }, { id: "jerusalemDayTrips", route: JerusalemDayTripsRoute }, { id: "jerusalemChurches", route: ChurchesRoute }, { id: "jerusalemShopping", route: ShoppingRoute }, { id: "telAvivDayTrips", route: TelAvivDayTripsRoute },
] as const;
async function routerAt(path: string) {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, history: createMemoryHistory({ initialEntries: [path] }), trailingSlash: "always" });
  await router.load();
  return router;
}

describe("migrated practical guides", () => {
  it.each(cases)("renders $id as a complete, sourced internal article with matching metadata", async ({ id, route }) => {
    const guide = travelGuides[id];
    const path = travelGuidePaths[id];
    const router = await routerAt(path);
    const Page = route.options.component!;
    const { container } = render(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
    expect(router.matchRoutes(path).at(-1)?.routeId).toBe(path.replace(/\/$/, ""));
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(guide.title);
    expect(screen.getByRole("region", { name: "Quick answer" })).toHaveTextContent(guide.answer);
    if (id === "jerusalemDeadSea") {
      expect(screen.getByTestId("journey-option-cards").children).toHaveLength(4);
      expect(screen.getByTestId("journey-stop-cards").children).toHaveLength(4);
      expect(screen.queryByRole("table", { name: guide.comparison.caption })).not.toBeInTheDocument();
    } else {
      expect(screen.getByRole("table", { name: guide.comparison.caption })).toBeInTheDocument();
    }
    expect(screen.getByRole("region", { name: "Travel checklist" })).toHaveTextContent("Before you go");
    for (const section of guide.sections) expect(screen.getByRole("heading", { name: section.title })).toBeInTheDocument();
    for (const section of guide.sections) if ("photo" in section && section.photo) {
      expect(within(container.querySelector(`#${section.id}`)! as HTMLElement).getByRole("img", { name: section.photo.alt })).toHaveAttribute("src", section.photo.src);
      if (section.photo.sourceUrl && !isPublisherUrl(section.photo.sourceUrl)) expect(container.querySelector(`#${section.id} a[href="${section.photo.sourceUrl}"]`)).not.toBeNull();
    }
    for (const sourceId of guide.sourceIds) expect(getSource(sourceId)?.url).toMatch(/^https:\/\//);
    expect(container.querySelector("time")).toHaveAttribute("datetime", guide.updatedAt || TRAVEL_GUIDE_CHECK_DATE);
    expect(container.querySelector("time")).toHaveTextContent("October 2026");
    const authorCard = screen.getByRole("complementary", { name: "About the author" });
    expect(authorCard).toHaveTextContent("Written by Moshe Barak");
    expect(authorCard).toHaveTextContent("Over 20 years");
    expect(within(authorCard).getByRole("link", { name: /reviews on Tripadvisor/ })).toHaveAttribute("href", mosheBarakAuthor.reviewsUrl);
    expect(authorCard.compareDocumentPosition(screen.getByRole("region", { name: "Quick answer" }))).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(container.textContent).not.toMatch(/editorial team|Adapted from|Source checks and limitations below|Image from the original publisher/);
    expect(container.querySelector('a[href*="israel-taxi.com"]')).toBeNull();
    expect(container.querySelector("a a")).toBeNull();
    const related = screen.getByRole("region", { name: id === "shabbat" ? "More airport travel guides" : "Related practical guides" });
    for (const link of within(related).getAllByRole("link")) {
      const href = link.getAttribute("href")!;
      expect(router.matchRoutes(href).at(-1)?.routeId).toBe(href.replace(/\/$/, ""));
      expect(link).not.toHaveAttribute("target");
    }
    const head = await route.options.head?.({} as never);
    expect(head).toMatchObject({ meta: expect.arrayContaining([{ title: id === "shabbat" ? "Ben Gurion Airport on Shabbat: Bus 711, Taxis & Trains" : guide.title }, { name: "description", content: guide.description }, { name: "robots", content: "noindex,nofollow" }]), links: [{ rel: "canonical", href: expect.stringMatching(new RegExp(`${path}$`)) }] });
    const structured = head!.scripts!.flatMap((script) => typeof script?.children === "string" ? [JSON.parse(script.children)] : []);
    const article = structured.find((item) => item["@type"] === "Article");
    expect(article).toMatchObject({ headline: guide.title, dateModified: guide.updatedAt || TRAVEL_GUIDE_CHECK_DATE, inLanguage: "en", author: { "@type": "Person", name: "Moshe Barak", sameAs: [mosheBarakAuthor.reviewsUrl] } });
    expect(article.mainEntityOfPage.endsWith(path)).toBe(true);
    for (const url of article.citation) expect(container.querySelector(`a[href="${url}"]`)).not.toBeNull();
    const crumbs = structured.find((item) => item["@type"] === "BreadcrumbList");
    expect(crumbs.itemListElement.map((item: { name: string }) => item.name)).toEqual(["Home", "Travel guides", guide.title]);
    expect(structured.some((item) => item["@type"] === "FAQPage")).toBe(false);
  });

  it("makes all directory guides discoverable in server-rendered markup and every topic useful", async () => {
    const router = await routerAt("/guides/");
    const Hub = HubRoute.options.component!;
    const html = renderToString(<RouterContextProvider router={router}><Hub /></RouterContextProvider>);
    expect(guideDirectory).toHaveLength(69);
    expect(new Set(guideDirectory.map((guide) => guide.to)).size).toBe(69);
    expect(guideDirectory.some(guide => guide.id === "israel-holidays" && guide.to === "/travel-blog/israel-holidays/")).toBe(true);
    for (const guide of guideDirectory) {
      expect(html).toContain(`href="${guide.to}"`);
      expect(router.matchRoutes(String(guide.to)).at(-1)?.routeId).toBe(String(guide.to).replace(/\/$/, ""));
    }
    for (const topic of guideTopics) expect(guideDirectory.some((guide) => guide.topics.includes(topic.id))).toBe(true);
  });

  it("combines search with topic filters, shares the URL and recovers from an empty result", async () => {
    const router = await routerAt("/guides/");
    const Hub = HubRoute.options.component!;
    render(<RouterContextProvider router={router}><Hub /></RouterContextProvider>);
    expect(screen.getAllByTestId("guide-directory-card")).toHaveLength(69);
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "eSIM" } });
    expect(screen.getAllByTestId("guide-directory-card")).toHaveLength(1);
    fireEvent.submit(screen.getByRole("search"));
    await waitFor(() => expect(router.state.location.search).toMatchObject({ q: "eSIM" }));
    const topics = screen.getByRole("navigation", { name: "Filter guides by topic" });
    fireEvent.click(within(topics).getByRole("link", { name: "Attractions" }));
    await screen.findByRole("heading", { name: "No guides match this search" });
    fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    await waitFor(() => expect(screen.getAllByTestId("guide-directory-card")).toHaveLength(69));
    expect(screen.getByRole("searchbox")).toHaveValue("");
    await act(async () => { await router.navigate({ to: "/guides/", search: { topic: "attractions" } }); });
    expect(screen.getAllByTestId("guide-directory-card")).toHaveLength(filterGuides("", "attractions").length);
    expect(within(topics).getByRole("link", { name: "Attractions" })).toHaveAttribute("aria-current", "true");
    expect(within(topics).getByRole("link", { name: "All topics" })).not.toHaveAttribute("aria-current");
    expect(topics.querySelectorAll('[aria-current="true"]')).toHaveLength(1);
  });

  it("opens article topic tags as valid filtered directory links", async () => {
    const router = await routerAt(travelGuidePaths.esim);
    const Page = EsimRoute.options.component!;
    render(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
    const tags = screen.getByRole("list", { name: "Guide topics" });
    fireEvent.click(within(tags).getByRole("link", { name: "Mobile & connectivity" }));
    await waitFor(() => expect(router.state.location.pathname).toBe("/guides/"));
    expect(router.state.location.search).toEqual({ topic: "connectivity" });
  });

  it("keeps current airport pickup distinctions and attributes uncertain operator status", () => {
    expect(travelGuides.arrival.sections.find((section) => section.id === "leave-airport")!.paragraphs.join(" ")).toMatch(/Exit 03.*Level 2, Exit 23/);
    expect(travelGuides.taxis.sections.find((section) => section.id === "airport")!.inlineLinks?.some((link) => link.to === travelGuidePaths.airportTaxis)).toBe(true);
    expect(travelGuides.airportTaxis.comparison.rows.join(" ")).toMatch(/Exit 03.*Exit 23/);
    expect(travelGuides.uber.answer).toMatch(/Uber is not available for passenger rides in Israel in 2026/);
    expect(travelGuides.sherut.answer).toMatch(/Nesher.*Jerusalem.*Amal.*Haifa.*no longer operating/s);
    expect(travelGuides.esim.sections.find((section) => section.id === "calling")!.paragraphs.join(" ")).toMatch(/US phone number.*different from an Israeli/s);
    expect(travelGuides.esim.answer).toMatch(/unlimited.*does not promise unlimited full-speed/i);
  });

  it("covers the complete 2026 airport arrival sequence without duplicating specialty transport guides", () => {
    const guide = travelGuides.arrival;
    expect(guide.title).toMatch(/Ben Gurion Airport Arrivals Guide.*2026/);
    expect(guide.answer).toMatch(/Terminal 3.*passport control.*customs.*arrivals hall/s);
    expect(guide.sections.map((s) => s.id)).toEqual([
      "before-you-fly", "arrival-terminal", "passport-control", "baggage", "customs",
      "arrivals-hall", "phones-money", "leave-airport", "arrival-timing", "shabbat", "assistance",
    ]);
    expect(guide.sections.filter((s) => s.photo)).toHaveLength(2);
    expect(guide.faqs).toHaveLength(15);
    expect(guide.sections.find((s) => s.id === "leave-airport")!.tables?.[0]?.rows).toHaveLength(5);
    expect(guide.sourceIds).toEqual(expect.arrayContaining([
      "guide-entry", "guide-iaa-terminal-2026", "guide-customs-tourists",
      "guide-lost-property", "guide-iaa-accessibility", "guide-gett",
    ]));
    expect(guide.sections.find((s) => s.id === "arrival-terminal")!.paragraphs.join(" ")).toMatch(/international arriving flights continue to use Terminal 3.*Domestic flights arriving from Ramon Airport use Terminal 1/s);
    expect(guide.sections.find((s) => s.id === "customs")!.paragraphs.join(" ")).toMatch(/red and green channels.*red channel and ask/s);
    expect(guide.sections.find((s) => s.id === "leave-airport")!.inlineLinks?.map((l) => l.to)).toEqual([
      travelGuidePaths.airportTaxis, "/transfers/", travelGuidePaths.sherut, travelGuidePaths.taxiFares,
    ]);
    expect(guide.sections.find((s) => s.id === "shabbat")!.inlineLinks?.[0]?.to).toBe(travelGuidePaths.shabbat);
    expect(guide.sections.find((s) => s.id === "assistance")!.inlineLinks?.[0]?.to).toBe(travelGuidePaths.taxis);
    for (const section of guide.sections) for (const link of section.inlineLinks || []) {
      expect(section.paragraphs.join(" ").split(link.text), `inline text ${link.text} must occur once`).toHaveLength(2);
    }
  });

  it("renders arrival-guide links within the paragraphs where travelers need them", async () => {
    const router = await routerAt(travelGuidePaths.arrival);
    const Page = ArrivalRoute.options.component!;
    const { container } = render(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
    for (const section of travelGuides.arrival.sections) {
      const element = container.querySelector(`#${section.id}`)! as HTMLElement;
      for (const link of section.inlineLinks || []) {
        const a = within(element).getByRole("link", { name: link.text });
        expect(a).toHaveAttribute("href", link.to);
        expect(a.closest("p")).toBeTruthy();
      }
    }
  });

  it("integrates three taxi guides with in-paragraph links without duplicating section strips", () => {
    const expected = {
      taxis: [travelGuidePaths.taxiFares, travelGuidePaths.uber, travelGuidePaths.airportTaxis, travelGuidePaths.shabbat, travelGuidePaths.israel],
      taxiFares: [travelGuidePaths.sherut, travelGuidePaths.airportTaxis, travelGuidePaths.shabbat, travelGuidePaths.uber, travelGuidePaths.taxis],
      airportTaxis: [travelGuidePaths.arrival, travelGuidePaths.taxiFares, travelGuidePaths.shabbat],
    } as const;
    for (const id of ["taxis", "taxiFares", "airportTaxis"] as const) {
      const guide = travelGuides[id];
      const sectionLinks = guide.sections.flatMap((section) => section.inlineLinks || []);
      expect(sectionLinks.length).toBeGreaterThanOrEqual(5);
      for (const href of expected[id]) expect(sectionLinks.some((link) => link.to === href)).toBe(true);
      for (const section of guide.sections) for (const link of section.inlineLinks || []) {
        expect(section.paragraphs.join(" ").split(link.text), `missing unique anchor in ${id}/${section.id}: ${link.text}`).toHaveLength(2);
        expect(section.links?.some((extra) => extra.to === link.to) || false).toBe(false);
      }
    }
  });

  it.each([
    ["taxis", TaxiRoute],
    ["taxiFares", TaxiFaresRoute],
    ["airportTaxis", AirportTaxisRoute],
  ] as const)("renders contextual taxi guide links for %s", async (id, route) => {
    const router = await routerAt(travelGuidePaths[id]);
    const Page = route.options.component!;
    const { container } = render(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
    for (const section of travelGuides[id].sections) {
      const element = container.querySelector(`#${section.id}`)! as HTMLElement;
      for (const link of section.inlineLinks || []) {
        expect(within(element).getByRole("link", { name: link.text })).toHaveAttribute("href", link.to);
      }
    }
  });

  it("keeps Getting Around Israel a practical 2026 pillar and delegates specialist detail", () => {
    const guide = travelGuides.israel;
    expect(guide.answer).toMatch(/trains between well-connected cities.*buses and light rail.*licensed taxis.*rental car/is);
    expect(guide.sections.map((s) => s.id)).toEqual([
      "choose-transport", "intercity-trains", "buses", "paying", "city-transport",
      "taxis-apps", "sherut", "airport", "weekends", "rental-car", "day-trips",
    ]);
    expect(guide.sections.filter((section) => section.photo)).toHaveLength(2);
    expect(guide.faqs).toHaveLength(14);
    expect(guide.sourceIds).toEqual(expect.arrayContaining([
      "guide-public-transport-payments", "guide-select-card-payment", "guide-redline-tickets", "israel-rail",
    ]));
    expect(guide.sections.find((s) => s.id === "paying")!.paragraphs.join(" ")).toMatch(/credit-card.*selected bus lines only.*not universally/s);
    const destinations = guide.sections.flatMap((section) => section.inlineLinks || []).map((link) => link.to);
    expect(destinations).toEqual(expect.arrayContaining([
      travelGuidePaths.telAviv, travelGuidePaths.taxis, travelGuidePaths.uber, travelGuidePaths.taxiFares,
      travelGuidePaths.sherut, travelGuidePaths.airportTaxis, travelGuidePaths.arrival, travelGuidePaths.shabbat,
      "/car-rental/", "/private-driver/", "/tours/",
    ]));
    for (const section of guide.sections) for (const link of section.inlineLinks || []) {
      expect(section.paragraphs.join(" ").split(link.text), `unique contextual link: ${link.text}`).toHaveLength(2);
    }
  });

  it("renders Getting Around Israel's related-guide links within the article text", async () => {
    const router = await routerAt(travelGuidePaths.israel);
    const Page = IsraelRoute.options.component!;
    const { container } = render(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
    for (const section of travelGuides.israel.sections) {
      const element = container.querySelector(`#${section.id}`)! as HTMLElement;
      for (const link of section.inlineLinks || []) {
        const a = within(element).getByRole("link", { name: link.text });
        expect(a).toHaveAttribute("href", link.to);
        expect(a.closest("p")).toBeTruthy();
      }
    }
  });

  it("keeps Uber's 2026 unavailability the primary search intent with useful alternatives", () => {
    const guide = travelGuides.uber;
    expect(guide.title).toMatch(/Uber.*Israel.*2026.*Gett.*Yango/);
    expect(guide.answer.startsWith("No. Uber is not available for passenger rides in Israel in 2026.")).toBe(true);
    expect(guide.sourceIds).toContain("guide-uber-availability");
    expect(getSource("guide-uber-availability").url).toBe("https://www.uber.com/il/en/");
    expect(guide.sections.map((section) => section.id)).toEqual([
      "uber-status", "gett", "yango", "booking-without-app", "prices-payments",
      "airport", "locations", "setup-backups", "shabbat",
    ]);
    expect(guide.sections.filter((section) => section.photo)).toHaveLength(2);
    expect(guide.faqs.length).toBeGreaterThanOrEqual(10);
    expect(guide.comparison.rows.map((row) => row[0])).toEqual([
      "Gett", "Yango", "Local taxi or hotel dispatcher", "Pre-booked private transfer",
    ]);
    expect(guide.sections.find((s) => s.id === "prices-payments")!.inlineLinks?.some((link) => link.to === travelGuidePaths.taxiFares)).toBe(true);
    expect(guide.sections.find((s) => s.id === "airport")!.inlineLinks?.some((link) => link.to === travelGuidePaths.airportTaxis)).toBe(true);
    expect(guide.sections.find((s) => s.id === "shabbat")!.inlineLinks?.some((link) => link.to === travelGuidePaths.shabbat)).toBe(true);
    for (const section of guide.sections) for (const link of section.inlineLinks || []) {
      expect(section.paragraphs.join(" ").split(link.text), `link text ${link.text} should occur once`).toHaveLength(2);
    }
    expect(JSON.stringify(guide)).not.toMatch(/legalization bill|knesset|legislation|no current operator closure notice/i);
    expect(travelGuides.taxis.sections.find((s) => s.id === "apps")!.paragraphs.join(" ")).toContain("Uber passenger rides are not available in Israel in 2026");
  });

  it("renders Uber alternatives with relevant inline article links", async () => {
    const router = await routerAt(travelGuidePaths.uber);
    const Page = UberRoute.options.component!;
    const { container } = render(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
    for (const section of travelGuides.uber.sections) {
      const element = container.querySelector(`#${section.id}`)! as HTMLElement;
      for (const link of section.inlineLinks || []) {
        const a = within(element).getByRole("link", { name: link.text });
        expect(a).toHaveAttribute("href", link.to);
        expect(a.closest("p")).toBeTruthy();
      }
    }
    expect(container.querySelector("#uber-status")?.textContent).toContain("Uber does not operate its passenger ride service in Israel");
    expect(container.querySelector("#airport")?.textContent).toContain("Terminal 3");
  });

  it("keeps the Sherut airport guide factual, separate from local shared taxis, and fully linked", () => {
    const guide = travelGuides.sherut;
    expect(guide.title).toMatch(/Nesher.*Amal.*No Longer Operate/);
    expect(guide.answer).toMatch(/As of 2026.*Nesher.*Amal.*no longer operating/s);
    expect(guide.facts.map((fact) => fact.text).join(" ")).toMatch(/discontinued.*discontinued/);
    expect(guide.sections.map((section) => section.id)).toEqual([
      "nesher-amal", "what-is-sherut", "airport-alternatives", "where-to-go", "official-taxi",
      "airport-shuttle", "local-sherut", "booked-shared", "weekend",
    ]);
    expect(guide.sections.filter((section) => section.photo)).toHaveLength(2);
    expect(guide.faqs).toHaveLength(11);
    expect(guide.sections.find((s) => s.id === "where-to-go")!.tables?.[0]?.rows).toHaveLength(4);
    expect(guide.sections.find((s) => s.id === "official-taxi")!.inlineLinks?.map((link) => link.to)).toEqual([
      travelGuidePaths.airportTaxis, travelGuidePaths.taxiFares,
    ]);
    expect(guide.sections.find((s) => s.id === "weekend")!.inlineLinks?.[0]?.to).toEqual(travelGuidePaths.shabbat);
    expect(guide.sections.find((s) => s.id === "local-sherut")!.inlineLinks?.map((link) => link.to)).toEqual([
      travelGuidePaths.israel, travelGuidePaths.telAviv,
    ]);
    for (const section of guide.sections) for (const link of section.inlineLinks || []) {
      expect(section.paragraphs.join(" ").split(link.text), `link text ${link.text} must occur once`).toHaveLength(2);
    }
    expect(JSON.stringify(guide)).not.toMatch(/no current operator closure notice|reported discontinued|might still run as Nesher/i);
    expect(guide.related).toContain("shabbat");
    expect(guide.related).toContain("airportTaxis");
  });

  it("renders Sherut's cross-guide links in their article paragraphs", async () => {
    const router = await routerAt(travelGuidePaths.sherut);
    const Page = SherutRoute.options.component!;
    const { container } = render(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
    for (const section of travelGuides.sherut.sections) {
      const element = container.querySelector(`#${section.id}`)! as HTMLElement;
      for (const link of section.inlineLinks || []) {
        const a = within(element).getByRole("link", { name: link.text });
        expect(a).toHaveAttribute("href", link.to);
        expect(a.closest("p")).toBeTruthy();
      }
    }
    expect(container.querySelector("#nesher-amal")?.textContent).toMatch(/Nesher.*stopped.*Amal.*stopped/s);
  });

  it("retains the limited Terminal 1 weekend option without copying old fares or treating it as a universal airport shuttle", () => {
    const shabbat = travelGuides.shabbat;
    expect(shabbat.answer).toMatch(/limited free weekend Line 711/i);
    expect(shabbat.answer).toContain("Terminal 1");
    expect(shabbat.sourceIds).toContain("guide-weekend-711");
    expect(getSource("guide-weekend-711").url).toContain("tel-aviv.gov.il");
    expect(shabbat.sections.find((section) => section.id === "weekend-711")!.paragraphs.join(" ")).toMatch(/not a frequent.*shuttle/);
    expect(shabbat.sections.find((section) => section.id === "restart")!.paragraphs.join(" ")).toContain("actual Saturday date");
    expect(JSON.stringify(shabbat)).not.toMatch(/guaranteed pickup|150–230|300–360|500–600/);
  });

  it("covers distinct Shabbat airport search intents with cited facts and topic-specific images", () => {
    const guide = travelGuides.shabbat;
    expect(guide.sections.map((section) => section.id)).toEqual([
      "shabbat-hours", "arrival-time", "weekend-711", "terminal-transfer",
      "taxis-transfers", "costs", "rental-car", "destinations", "restart", "practical",
    ]);
    expect(guide.sections.filter((section) => section.photo)).toHaveLength(0);
    expect(guide.faqs.length).toBe(8);
    expect(guide.sections.find((section) => section.id === "arrival-time")!.tables?.[0]?.rows).toHaveLength(4);
    expect(guide.sections.find((section) => section.id === "terminal-transfer")!.paragraphs.join(" ")).toMatch(/Level G near Gate 01.*15-minute frequency/s);
    expect(guide.sections.find((section) => section.id === "taxis-transfers")!.paragraphs.join(" ")).toMatch(/24 hours a day.*Exit 03.*Exit 23/s);
    expect(guide.sections.find((section) => section.id === "destinations")!.tables?.[0]?.rows).toHaveLength(5);
    for (const section of guide.sections) for (const link of section.inlineLinks || []) {
      expect(section.paragraphs.join(" ").split(link.text)).toHaveLength(2);
    }
    expect(guide.sections.find((section) => section.id === "taxis-transfers")!.inlineLinks?.map((link) => link.to)).toEqual([
      travelGuidePaths.airportTaxis, "/transfers/", travelGuidePaths.taxiFares, travelGuidePaths.uber,
    ]);
    const costs = guide.sections.find((section) => section.id === "costs")!;
    expect(costs.paragraphs.join(" ")).toMatch(/₪12.46/);
    expect(costs.tables?.[0]?.headers).toHaveLength(3);
    expect(costs.tables?.[0]?.rows).toEqual([
      ["Tel Aviv", "174–204", "194–230"],
      ["Jerusalem", "309–361", "346–406"],
      ["Haifa", "665–735", "740–822"],
    ]);
    expect(costs.tables?.[0]?.note).toMatch(/booking fee.*airport departure surcharge.*not live prices/is);
    expect(costs.sourceIds).toContain("guide-meter-route-estimates");
    expect(guide.sections.find((section) => section.id === "taxis-transfers")!.paragraphs.join(" ")).toMatch(/do not need the Gett app/);
    expect(JSON.stringify(guide)).not.toMatch(/I have not carried over|comparison below/);
  });

  it("renders contextual Shabbat article links inside the relevant paragraphs rather than only related cards", async () => {
    const router = await routerAt(travelGuidePaths.shabbat);
    const Page = ShabbatRoute.options.component!;
    const { container } = render(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
    for (const section of travelGuides.shabbat.sections) {
      const element = container.querySelector(`#${section.id}`)! as HTMLElement;
      for (const link of section.inlineLinks || []) {
        const withinParagraph = within(element).getByRole("link", { name: link.text });
        expect(withinParagraph).toHaveAttribute("href", link.to);
        expect(withinParagraph.closest("p")).toBeTruthy();
      }
    }
    expect(container.querySelector("#weekend-711")?.textContent).toMatch(/free.*Terminal 1.*timetable/is);
    expect(container.querySelector("#taxis-transfers")?.textContent).toMatch(/regulated meter/is);
    for (const [label, url] of [
      ["Look up Shabbat times on MyZmanim", "https://www.myzmanim.com/"],
      ["Israel Railways — official timetable", "https://rail.co.il/?lan=en"],
      ["National Public Transport Authority — route planner", "https://route.bus.gov.il/?saveParams=true&tab=source-destination"],
      ["Tel Aviv calculation", "https://taxitariff.co.il/ben-gurion-airport/tel-aviv-yafo"],
      ["Jerusalem calculation", "https://taxitariff.co.il/ben-gurion-airport/jerusalem"],
      ["Haifa calculation", "https://taxitariff.co.il/ben-gurion-airport/haifa"],
    ]) {
      const link = within(container).getByRole("link", { name: new RegExp(label) });
      expect(link).toHaveAttribute("href", url);
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("distinguishes baptism sites, church clusters and region-specific Dead Sea planning without blanket operating claims", () => {
    expect(travelGuides.baptism.answer).toMatch(/Yardenit.*Sea of Galilee.*Qasr el-Yahud.*near Jericho/s);
    expect(travelGuides.baptism.reviewNote).toMatch(/different hour sets|differing hour|different hours/i);
    expect(travelGuides.baptism.sections.find((section) => section.id === "qasr-visit")!.photo?.alt).toContain("Qasr el-Yahud");
    expect(travelGuides.jerusalemChurches.comparison.rows.map((row) => row[0])).toEqual(["Old City", "Mount of Olives / Kidron", "Mount Zion", "Ein Karem"]);
    expect(travelGuides.jerusalemDeadSea.sections[0]!.paragraphs.join(" ")).toContain("Tamar Regional Council maintains a free public beach");
    expect(travelGuides.jerusalemShopping.sections.find((section) => section.id === "crafts-and-practicalities")!.paragraphs.join(" ")).toContain("not independently confirmed");
    expect(JSON.stringify(travelGuides.jerusalemChurches)).not.toMatch(/10-20 ILS|50-80 ILS|open daily.*8:00/i);
    expect(travelGuides.jerusalemDayTrips.sections.find((section) => section.id === "tel-aviv-jaffa")).toBeTruthy();
    expect(travelGuides.telAvivDayTrips.sections.find((section) => section.id === "jerusalem-day")).toBeTruthy();
    expect(travelGuides.jerusalemDayTrips.answer).not.toBe(travelGuides.telAvivDayTrips.answer);
  });

  it("makes religion and shopping filters useful and keeps migrated related reading inside the portal", () => {
    expect(filterGuides("baptism", "religion").map((guide) => guide.id)).toContain("baptism");
    expect(filterGuides("Jerusalem", "shopping").map((guide) => guide.id)).toContain("jerusalemShopping");
    for (const guide of Object.values(travelGuides)) {
      for (const reading of guide.reading || []) expect(Object.values(travelGuidePaths).some((path) => reading.href === `https://www.israel-taxi.com${path}`)).toBe(false);
      for (const related of guide.related) expect(travelGuides[related]).toBeTruthy();
    }
    expect(travelGuides.arrival.related).toContain("shabbat");
    expect(travelGuides.israel.related).toEqual(expect.arrayContaining(["taxis", "taxiFares", "uber", "sherut", "airportTaxis", "arrival", "shabbat"]));
  });

  it("preserves exactly the publisher's five eSIM links with sponsored attributes and anonymous click attribution", async () => {
    const expected = { "esim-airalo": "https://airalo.tpm.li/JmHFDV3v", "esim-saily": "https://saily.tpm.li/nM5mNYzP", "esim-yesim": "https://yesim.tpm.li/6WmqBIJV", "esim-gigsky": "https://gigsky.tpm.li/NxqtNVtH", "esim-drimsim": "https://drimsim.tpm.li/khIJTNaX" };
    const router = await routerAt(travelGuidePaths.esim);
    const Page = EsimRoute.options.component!;
    const { container } = render(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
    const providerSection = container.querySelector("#provider-options")!;
    expect(container.querySelector("#checklist")!.compareDocumentPosition(providerSection)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    const cards = screen.getAllByTestId("provider-card");
    expect(cards).toHaveLength(5);
    for (const [index, link] of linksForPage("guide-esim").entries()) {
      expect(affiliateConfig[link.id]!.trackingUrl).toBe(expected[link.id as keyof typeof expected]);
      expect(within(cards[index]!).getByRole("link")).toHaveAttribute("href", expected[link.id as keyof typeof expected]);
      expect(within(cards[index]!).getByRole("link")).toHaveAttribute("rel", "sponsored noopener noreferrer");
      expect(cards[index]).toHaveTextContent("Sponsored link");
      expect(link.mode).toBe("provider_redirect");
    }
    const first = within(cards[0]!).getByRole("link");
    first.addEventListener("click", (event) => event.preventDefault());
    fireEvent.click(first);
    expect(readOutboundClicks()).toEqual([expect.objectContaining({ pageId: "guide-esim", productId: "esim-airalo", offerId: "esim-airalo" })]);
  });
});
