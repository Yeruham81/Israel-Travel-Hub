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
import { repeatedPhotos } from "@/lib/photo-uniqueness";

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
      const sectionElement = container.querySelector(`#${section.id}`)! as HTMLElement;
      const photo = within(sectionElement).getByRole("img", { name: section.photo.alt });
      expect(photo).toHaveAttribute("src", section.photo.src);
      const body = sectionElement.querySelector(":scope > div");
      if (section.paragraphs.length > 0) {
        expect(body?.children[0]?.tagName).toBe("P");
        expect(body?.children[1]?.tagName).toBe("FIGURE");
        expect(body?.children[1]).toContainElement(photo);
      }
      if (section.photo.sourceUrl && !isPublisherUrl(section.photo.sourceUrl)) expect(container.querySelector(`#${section.id} a[href="${section.photo.sourceUrl}"]`)).not.toBeNull();
    }
    for (const sourceId of guide.sourceIds) expect(getSource(sourceId)?.url).toMatch(/^https:\/\//);
    expect(container.querySelector("time")).toHaveAttribute("datetime", guide.updatedAt || TRAVEL_GUIDE_CHECK_DATE);
    const displayedMonth = new Date(`${guide.updatedAt || TRAVEL_GUIDE_CHECK_DATE}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
    expect(container.querySelector("time")).toHaveTextContent(displayedMonth);
    const authorCard = screen.getByRole("complementary", { name: "About the author" });
    expect(authorCard).toHaveTextContent("Written by Moshe Barak");
    expect(authorCard).toHaveTextContent("Over 20 years");
    expect(within(authorCard).getByRole("link", { name: /reviews on Tripadvisor/ })).toHaveAttribute("href", mosheBarakAuthor.reviewsUrl);
    expect(authorCard.compareDocumentPosition(screen.getByRole("region", { name: "Quick answer" }))).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(container.textContent).not.toMatch(/editorial team|Adapted from|Source checks and limitations below|Image from the original publisher/);
    expect(container.querySelector('a[href*="israel-taxi.com"]')).toBeNull();
    expect(container.querySelector("a a")).toBeNull();
    const related = screen.getByRole("region", { name: "Related practical guides" });
    const relatedPhotos = [...related.querySelectorAll("li img")].map(photo => photo.getAttribute("src") || "");
    expect(repeatedPhotos(relatedPhotos)).toEqual([]);
    if (related.querySelectorAll("li").length === 6) expect(related.querySelector("ul")?.classList.contains("lg:grid-cols-3")).toBe(true);
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
    const doc = new DOMParser().parseFromString(html, "text/html");
    const cardPhotos = [...doc.querySelectorAll('[data-testid="guide-directory-card"] img')].map(photo => photo.getAttribute("src") || "");
    expect(repeatedPhotos(cardPhotos)).toEqual([]);
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
    expect(travelGuides.uber.answer).toMatch(/Uber does not currently offer passenger rides in Israel/);
    expect(travelGuides.sherut.answer).toMatch(/Jerusalem \(Nesher\).*Haifa.*\(Amal\).*no longer operate/s);
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

  it("uses concise taxi navigation, stronger body contrast and a contextual owner contact form", async () => {
    const router = await routerAt(travelGuidePaths.taxis);
    const Page = TaxiRoute.options.component!;
    const { container } = render(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
    const nav = within(container).getByRole("navigation", { name: "On this page" });
    const airportJump = nav.querySelector('a[href="#airport"].chip');
    expect(airportJump).toHaveTextContent("Airport taxis");
    expect(airportJump).toHaveAttribute("aria-label", "Taking a Taxi from Ben Gurion Airport");
    expect(nav.querySelector('a[href="#contact"]')).toHaveTextContent("Contact Moshe");
    const jumpItems = Array.from(nav.querySelectorAll("ul.grid > li"));
    expect(jumpItems).toHaveLength(16);
    expect(jumpItems.slice(0, 10).every((item) => !item.classList.contains("hidden"))).toBe(true);
    expect(jumpItems[9]).not.toHaveClass("hidden");
    expect(jumpItems[10]).toHaveClass("hidden", "lg:block");
    expect(jumpItems[12]).toHaveClass("hidden", "xl:block");
    expect(jumpItems[15]).toHaveClass("hidden");
    const disclosure = nav.querySelector("details");
    expect(disclosure).not.toBeNull();
    expect(within(disclosure! as HTMLElement).getByText("All sections", { exact: false })).toBeInTheDocument();
    expect(disclosure?.querySelectorAll("a[href^='#']")).toHaveLength(16);
    expect(container.querySelector("#booking > div")).toHaveClass("text-foreground");
    expect(within(container).getByRole("heading", { name: "Ask me about your journey in Israel" })).toBeInTheDocument();
    expect(within(container).getByRole("form", { name: "Taxi guide contact message" })).toBeInTheDocument();
    expect(within(container).getByRole("textbox", { name: /Subject/ })).toHaveValue("Taxis and private transport in Israel");
    expect(within(container).queryByText("Explore more Israel travel guides")).not.toBeInTheDocument();
  });

  it("applies the readable taxi-guide layout and personal inquiry footer to other guides", async () => {
    for (const id of ["uber", "esim", "israel"] as const) {
      const route = cases.find((item) => item.id === id)!.route;
      const router = await routerAt(travelGuidePaths[id]);
      const Page = route.options.component!;
      const { container, unmount } = render(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
      expect(container.textContent).not.toContain("Choose your next step");
      expect(container.textContent).not.toContain("Explore more Israel travel guides");
      expect(within(container).getByRole("form", { name: "Guide contact message" })).toBeInTheDocument();
      expect((within(container).getByRole("textbox", { name: /Subject/ }) as HTMLInputElement).value).toContain(travelGuides[id].title);
      expect(container.querySelector("#" + travelGuides[id].sections[0]!.id + " > div")).toHaveClass("text-foreground");
      expect(container.querySelector('nav[aria-label="On this page"] a[href="#contact"]')).not.toBeNull();
      unmount();
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


  it("expands Getting Around Tel Aviv into a verifiable city transport guide", () => {
    const guide = travelGuides.telAviv;
    expect(guide.title).toMatch(/^Getting Around Tel Aviv: Buses, Red Line/);
    expect(guide.title).not.toMatch(/2026|2027/);
    expect(guide.updatedAt).toBe("2026-11-12");
    expect(guide.sections.map(section => section.id)).toEqual([
      "choose", "paying", "walking", "city-buses", "red-line", "national-rail",
      "taxis", "shared-taxis", "bikes", "shabbat", "driving", "accessibility",
    ]);
    expect(guide.comparison.headers).toHaveLength(5);
    expect(guide.comparison.rows).toHaveLength(9);
    expect(guide.sections.find(section => section.id === "red-line")?.tables?.[0]?.rows).toHaveLength(8);
    expect(guide.sections.find(section => section.id === "national-rail")?.tables?.[0]?.rows).toHaveLength(4);
    expect(guide.sections.find(section => section.id === "paying")?.subsections?.map(sub => sub.id)).toEqual([
      "ta-ravkav", "ta-mobile-payment", "ta-bank-card",
    ]);
    expect(guide.sections.find(section => section.id === "shabbat")?.paragraphs.join(" ")).toMatch(/Terminal 1/);
    expect(guide.sections.find(section => section.id === "bikes")?.paragraphs.join(" ")).toMatch(/minimum age of 16/);
    expect(guide.photo.src).toMatch(/^\/(?:src\/)?assets\//);
    expect(guide.photo.licenseUrl).toBe("https://creativecommons.org/licenses/by/2.5/");
    expect(guide.faqs).toHaveLength(15);
    expect(guide.faqGroups).toHaveLength(3);
    expect(guide.faqGroups!.flatMap(group => group.indexes).sort((a, b) => a - b)).toEqual([...Array(15).keys()]);
    expect(guide.related).toHaveLength(6);
    expect(guide.related).not.toContain("esim");
    expect(guide.services).toHaveLength(4);
    expect(getSource("guide-dan-bank-card-2026").url).toContain("dan.co.il");
    expect(getSource("guide-telaviv-weekend-hours").url).toBe("https://busofash.co.il/");
  });

  it("renders Tel Aviv topics, photo-backed recommendations, tables, FAQs and final sources", async () => {
    const router = await routerAt(travelGuidePaths.telAviv);
    const Page = TelAvivRoute.options.component!;
    const { container } = render(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
    const guide = travelGuides.telAviv;
    expect(container.querySelector('header figure img')?.getAttribute("src")).toBe(guide.photo.src);
    expect(container.querySelector('section[aria-label="Transport planning essentials"]')?.children).toHaveLength(3);
    const weekendMap = container.querySelector<HTMLAnchorElement>('section[aria-label="Transport planning essentials"] a');
    expect(weekendMap).not.toBeNull();
    expect(weekendMap?.textContent).toContain("weekend map");
    expect(weekendMap?.href).toBe("https://experience.arcgis.com/experience/9f4b2c7f7143485a887e8576a15ce8e7/");
    expect(weekendMap).toHaveAttribute("target", "_blank");
    expect(weekendMap).toHaveAttribute("rel", "noopener noreferrer");
    const jumpNav = container.querySelector('nav[aria-label="Quick transport topics"]')!;
    expect(jumpNav.querySelectorAll('a[href^="#"]')).toHaveLength(4);
    for (const anchor of jumpNav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) {
      expect(container.querySelector(anchor.getAttribute("href")!)).not.toBeNull();
    }
    const overview = screen.getByRole("table", { name: guide.comparison.caption });
    expect(overview.querySelectorAll("tbody th a")).toHaveLength(9);
    for (const anchor of overview.querySelectorAll<HTMLAnchorElement>('tbody th a[href^="#"]')) {
      expect(container.querySelector(anchor.getAttribute("href")!)).not.toBeNull();
    }
    expect(container.querySelectorAll('[role="region"] table th.sticky').length).toBeGreaterThanOrEqual(3);
    expect(container.querySelectorAll('.sm\\:hidden')).not.toHaveLength(0);
    const redLineStations = container.querySelector('[aria-label="Red Line stations and nearby places"]')!;
    expect(redLineStations).not.toBeNull();
    expect(redLineStations.querySelectorAll("thead th")).toHaveLength(2);
    expect(redLineStations.querySelectorAll("tbody tr")).toHaveLength(8);
    expect(redLineStations.textContent).not.toMatch(/nearby interests are orientation cues|confirm live service and exits/i);
    expect(container.querySelector(`[aria-label="Tel Aviv's four mainline railway stations"]`)).not.toBeNull();
    const faqs = container.querySelector("#faq")!;
    expect(faqs.querySelectorAll("h3")).toHaveLength(3);
    expect(faqs.querySelectorAll("details")).toHaveLength(15);
    const related = container.querySelector('section[aria-label="Related practical guides"]')!;
    expect(related.querySelectorAll(":scope > ul > li")).toHaveLength(6);
    const cards = [...related.querySelectorAll("li img")];
    expect(cards).toHaveLength(6);
    expect(repeatedPhotos(cards.map(image => image.getAttribute("src") || ""))).toEqual([]);
    const next = container.querySelector('section[aria-label="Plan the next part of your trip"]')!;
    expect(next.querySelectorAll(":scope > ul > li")).toHaveLength(4);
    const form = container.querySelector('form[aria-label="Guide contact message"]')!;
    expect(form).not.toBeNull();
    expect(related.compareDocumentPosition(next) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(next.compareDocumentPosition(form) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(container.querySelector("article")?.lastElementChild?.id).toBe("sources");
    expect(container.querySelector('#sources details:not([open])')).not.toBeNull();
  });

  it("makes Getting Around Israel a usable national transport guide with eight chapters and a complete payment comparison", () => {
    const guide = travelGuides.israel;
    expect(guide.updatedAt).toBe("2026-11-12");
    expect(guide.title).toMatch(/^Getting Around Israel: Trains, Buses, Taxis/);
    expect(guide.title).not.toMatch(/2026|2027/);
    expect(guide.sections.map(section => section.id)).toEqual([
      "choose-transport", "public-transport", "paying", "taxis-and-sherut",
      "destinations", "rental-car", "weekends", "planning",
    ]);
    expect(guide.comparison.headers).toEqual(["Transport", "Best for", "Cost level", "On Shabbat?", "Main limitation"]);
    expect(guide.comparison.rows).toHaveLength(7);
    expect(guide.facts).toHaveLength(3);
    const payment = guide.sections.find(section => section.id === "paying")!;
    expect(payment.tables?.[0]?.rows).toHaveLength(3);
    expect(payment.subsections?.map(sub => sub.id)).toEqual(["israel-ravkav", "israel-payment-apps", "israel-ticket-rules"]);
    expect(guide.sections.find(section => section.id === "destinations")?.subsections?.map(sub => sub.id)).toEqual([
      "israel-tel-aviv", "israel-jerusalem", "israel-haifa", "israel-galilee", "israel-eilat",
    ]);
    expect(guide.sections.find(section => section.id === "planning")?.subsections?.some(sub => sub.id === "israel-accessibility")).toBe(true);
    expect(guide.sections.find(section => section.id === "weekends")?.inlineLinks).toEqual(expect.arrayContaining([
      { text: "Israel's calendar of events", to: "/travel-blog/israel-holidays/" },
      { text: "airport Shabbat transport guide", to: travelGuidePaths.shabbat },
    ]));
    expect(guide.faqs).toHaveLength(18);
    expect(guide.faqGroups).toHaveLength(3);
    expect(guide.faqGroups!.flatMap(group => group.indexes).sort((a, b) => a - b)).toEqual([...Array(18).keys()]);
    expect(guide.photo.src).toMatch(/^\/(?:src\/)?assets\/.*buses-in-tel-aviv.*\.webp$/);
    expect(guide.photo.licenseUrl).toBeUndefined();
    expect(guide.photo.sourceUrl).toBeUndefined();
    const rail = guide.sections.find(section => section.id === "public-transport")!.subsections!.find(sub => sub.id === "israel-trains")!;
    expect(rail.steps).toHaveLength(3);
    expect(rail.steps!.join(" ")).toMatch(/72 hours.*SMS verification.*valid rail ticket/s);
    const bankCard = payment.subsections!.find(sub => sub.id === "israel-ticket-rules")!;
    expect(bankCard.paragraphs.join(" ")).toMatch(/Eilat, Jerusalem and metropolitan Haifa/);
    expect(bankCard.paragraphs.join(" ")).toMatch(/international Visa and Mastercard/);
    expect(bankCard.sourceIds).toContain("guide-egged-card-payment-2026");
    const popular = guide.sections.find(section => section.id === "planning")!.subsections!.find(sub => sub.id === "israel-popular-journeys")!;
    expect(popular.tables?.[0]?.rowLinks).toHaveLength(4);
    expect(guide.related).toHaveLength(6);
    expect(guide.services).toHaveLength(4);
    expect(guide.sourceIds).toEqual(expect.arrayContaining([
      "guide-ravkav-2026", "guide-rental-territory", "guide-egged-accessibility",
      "guide-jerusalem-train-voucher", "guide-weekend-network",
    ]));
    const subsections = guide.sections.flatMap(section => section.subsections || []);
    const links = [...guide.sections, ...subsections].flatMap(section => section.inlineLinks || []);
    for (const link of links) {
      const section = [...guide.sections, ...subsections].find(section => section.inlineLinks?.includes(link))!;
      expect(section.paragraphs.join(" ").split(link.text), link.text).toHaveLength(2);
    }
    expect(links.map(link => link.to)).toEqual(expect.arrayContaining([
      travelGuidePaths.telAviv, travelGuidePaths.taxis, travelGuidePaths.uber,
      travelGuidePaths.taxiFares, travelGuidePaths.sherut, travelGuidePaths.airportTaxis,
      travelGuidePaths.arrival, travelGuidePaths.shabbat, travelGuidePaths.esim,
      "/car-rental/", "/private-driver/", "/tours/",
      "/travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv/",
      "/travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/",
      "/travel-blog/how-to-get-from-ben-gurion-airport-to-haifa/",
      "/travel-blog/how-to-get-from-ben-gurion-airport-to-ein-bokek/",
    ]));
  });

  it("renders national transport subchapters, linked comparisons, relevant images, guide cards and bottom sources", async () => {
    const router = await routerAt(travelGuidePaths.israel);
    const Page = IsraelRoute.options.component!;
    const { container } = render(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
    const guide = travelGuides.israel;
    expect(container.querySelector('section[aria-label="Transport planning essentials"]')?.children).toHaveLength(3);
    expect(container.querySelector('header figure img')?.getAttribute("src")).toBe(guide.photo.src);
    expect(container.querySelector('header figure img[src^="https://"]')).toBeNull();
    const modePhotos = guide.sections.flatMap(section => section.subsections || []).flatMap(section => section.photo ? [section.photo.src] : []);
    expect(modePhotos).toContain(guide.sections.find(section => section.id === "public-transport")!.subsections!.find(sub => sub.id === "israel-light-rail")!.photo!.src);
    expect(modePhotos.every(src => /^\/(?:src\/)?assets\//.test(src))).toBe(true);
    const topicsNav = container.querySelector('nav[aria-label="Quick transport topics"]')!;
    expect(topicsNav.querySelectorAll('a[href^="#"]')).toHaveLength(4);
    for (const link of topicsNav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) {
      expect(container.querySelector(link.getAttribute("href")!)).not.toBeNull();
    }
    const voucher = container.querySelector('#israel-trains [aria-label="Step-by-step instructions"]')!;
    expect(voucher.querySelectorAll("ol > li")).toHaveLength(3);
    expect(voucher.textContent).toMatch(/72 hours/);
    const routeTable = container.querySelector('[aria-label="Common trips: the first option to compare"]')!;
    expect(routeTable.querySelectorAll("tbody th a")).toHaveLength(4);
    expect(container.querySelectorAll('[role="region"] table th.sticky').length).toBeGreaterThanOrEqual(2);
    expect(container.querySelectorAll('.sm\\:hidden')).not.toHaveLength(0);
    const faq = container.querySelector("#faq")!;
    expect(faq.querySelectorAll("h3")).toHaveLength(3);
    expect(faq.querySelectorAll("details")).toHaveLength(18);
    const table = screen.getByRole("table", { name: guide.comparison.caption });
    expect(within(table).getAllByRole("columnheader")).toHaveLength(5);
    expect(within(table).getAllByRole("row")).toHaveLength(8);
    const tableLinks = [...table.querySelectorAll('tbody th a[href^="#"]')];
    expect(tableLinks).toHaveLength(7);
    for (const anchor of tableLinks) expect(container.querySelector(anchor.getAttribute("href")!)).not.toBeNull();
    for (const section of guide.sections) {
      const el = container.querySelector(`#${section.id}`)! as HTMLElement;
      expect(el).toBeTruthy();
      for (const sub of section.subsections || []) {
        const subEl = el.querySelector(`#${sub.id}`)! as HTMLElement;
        expect(subEl, sub.id).not.toBeNull();
        expect(subEl.querySelector("h3")?.nextElementSibling?.firstElementChild?.tagName).toBe("P");
        if (sub.photo) {
          const first = subEl.querySelector(":scope > div")!;
          expect(first.children[1]?.tagName).toBe("FIGURE");
          expect(subEl.querySelector("figure img")?.getAttribute("src")).toBe(sub.photo.src);
        }
        for (const link of sub.inlineLinks || []) {
          const elink = within(subEl).getByRole("link", { name: link.text });
          expect(elink).toHaveAttribute("href", link.to);
          expect(elink.closest("p")).toBeTruthy();
        }
      }
    }
    const related = container.querySelector('section[aria-label="Related practical guides"]')!;
    expect(related.querySelectorAll(":scope > ul > li")).toHaveLength(6);
    expect(related.querySelector("ul")?.classList.contains("lg:grid-cols-3")).toBe(true);
    expect(repeatedPhotos([...related.querySelectorAll("li img")].map(img => img.getAttribute("src") || ""))).toEqual([]);
    const next = container.querySelector('section[aria-label="Plan the next part of your trip"]')!;
    expect(next.querySelectorAll(":scope > ul > li")).toHaveLength(4);
    const form = container.querySelector('form[aria-label="Guide contact message"]')!;
    expect(form).not.toBeNull();
    expect(related.compareDocumentPosition(next) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(next.compareDocumentPosition(form) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(container.querySelector("article")?.lastElementChild?.id).toBe("sources");
    expect(container.querySelector('#sources details:not([open])')).not.toBeNull();
    expect(container.querySelector('#sources a[href="https://www.hertz.co.il/en/GoodToKnow/IsraelContract/"]')).not.toBeNull();
  });

  it("keeps the current Uber and Lyft status with useful licensed-taxi alternatives", () => {
    const guide = travelGuides.uber;
    expect(guide.title).toMatch(/Uber.*Israel.*Gett.*Yango/);
    expect(guide.title).not.toMatch(/2026|2027/);
    expect(guide.updatedAt).toBe("2026-11-11");
    expect(guide.answer).toMatch(/^No\. Uber does not currently offer passenger rides in Israel/);
    expect(guide.answer).toContain("Lyft");
    expect(guide.sourceIds).toContain("guide-uber-availability");
    expect(getSource("guide-uber-availability").url).toBe("https://www.uber.com/il/en/");
    expect(guide.sections.map((section) => section.id)).toEqual([
      "uber-status", "gett", "yango", "booking-without-app", "prices-payments",
      "airport", "locations", "setup-backups", "shabbat",
    ]);
    expect(guide.sections.filter((section) => section.photo)).toHaveLength(1);
    expect(guide.sections.find((s) => s.id === "gett")!.photo).toBeUndefined();
    expect(guide.faqs).toHaveLength(7);
    expect(guide.comparison.rows.map((row) => row[0])).toEqual([
      "Gett", "Yango", "Licensed taxi or hotel dispatcher", "Confirmed private transfer",
    ]);
    expect(guide.sections.find((s) => s.id === "prices-payments")!.inlineLinks?.some((link) => link.to === travelGuidePaths.taxiFares)).toBe(true);
    expect(guide.sections.find((s) => s.id === "airport")!.inlineLinks?.some((link) => link.to === travelGuidePaths.airportTaxis)).toBe(true);
    expect(guide.sections.find((s) => s.id === "shabbat")!.inlineLinks?.some((link) => link.to === travelGuidePaths.shabbat)).toBe(true);
    for (const section of guide.sections) for (const link of section.inlineLinks || []) {
      expect(section.paragraphs.join(" ").split(link.text), `link text ${link.text} should occur once`).toHaveLength(2);
    }
    expect(guide.sections.find((s) => s.id === "uber-status")!.paragraphs.join(" ")).toContain("March 24, 2026");
    expect(guide.sourceIds).toEqual(expect.arrayContaining(["guide-lyft-cities", "guide-ridesharing-bill-2026"]));
    expect(getSource("guide-lyft-cities").url).toBe("https://www.lyft.com/rider/cities");
    expect(getSource("guide-ridesharing-bill-2026").url).toContain("main.knesset.gov.il");
    expect(guide.services.map((service) => service.to)).toEqual([
      travelGuidePaths.esim, "/car-rental/", travelGuidePaths.jerusalem, "/travel-blog/where-to-stay-in-tel-aviv/",
    ]);
    expect(guide.sections.find((s) => s.id === "gett")!.externalLinks?.[0]?.href).toBe("https://www.gett.com/il/");
    expect(guide.sections.find((s) => s.id === "yango")!.externalLinks?.[0]?.href).toBe("https://appli.taxi/rider/");
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
    expect(container.querySelector("#uber-status")?.textContent).toContain("Uber's Israel-facing website");
    const next = within(container).getByRole("region", { name: "Plan the next part of your trip" });
    expect(next.querySelectorAll("li")).toHaveLength(4);
    expect(Array.from(next.querySelectorAll("a")).map((link) => link.getAttribute("href"))).not.toContain("/transfers/");
    for (const [id, url] of [["gett", "https://www.gett.com/il/"], ["yango", "https://appli.taxi/rider/"]] as const) {
      expect(container.querySelector(`#${id} a[href="${url}"]`)).not.toBeNull();
    }
    expect(container.querySelector("#airport")?.textContent).toContain("Terminal 3");
  });

  it("keeps the Sherut guide focused on former airport routes, not the companies themselves", () => {
    const guide = travelGuides.sherut;
    expect(guide.title).toMatch(/sherut.*Ben Gurion Airport/i);
    expect(guide.title).not.toMatch(/2026|2027/);
    expect(guide.updatedAt).toBe("2026-11-11");
    expect(guide.answer).toContain("no longer operate");
    expect(guide.answer).toContain("Do not plan around their old boarding points");
    expect(guide.sections.map((section) => section.id)).toEqual([
      "nesher-amal", "what-is-sherut", "airport-alternatives", "where-to-go", "official-taxi",
      "airport-shuttle", "local-sherut", "booked-shared", "weekend",
    ]);
    expect(guide.sections.filter((section) => section.photo)).toHaveLength(1);
    expect(guide.sections.find((section) => section.id === "airport-alternatives")!.photo).toBeUndefined();
    expect(guide.faqs).toHaveLength(7);
    expect(guide.sections.find((s) => s.id === "where-to-go")!.tables?.[0]?.rows).toHaveLength(4);
    expect(guide.comparison.rows).toHaveLength(6);
    expect(guide.sections.find((s) => s.id === "official-taxi")!.inlineLinks?.map((link) => link.to)).toEqual([
      travelGuidePaths.airportTaxis, travelGuidePaths.taxiFares,
    ]);
    expect(guide.sections.find((s) => s.id === "weekend")!.inlineLinks?.[0]?.to).toBe(travelGuidePaths.shabbat);
    expect(guide.sections.find((s) => s.id === "local-sherut")!.inlineLinks?.map((link) => link.to)).toEqual([
      travelGuidePaths.israel, travelGuidePaths.telAviv,
    ]);
    expect(guide.sections.find((s) => s.id === "where-to-go")!.inlineLinks?.map((link) => link.to)).toEqual([
      "/travel-blog/ben-gurion-airport-to-jerusalem/", "/travel-blog/ben-gurion-airport-to-haifa/", travelGuidePaths.shabbat,
    ]);
    expect(guide.sections.find((s) => s.id === "local-sherut")!.paragraphs.join(" ")).toMatch(/pay individually.*Shabbat/s);
    expect(guide.services.map((item) => item.to)).toEqual([
      "/car-rental/", "/travel-blog/where-to-stay-in-jerusalem/", "/travel-blog/haifa/", travelGuidePaths.esim,
    ]);
    expect(guide.sourceIds).toContain("guide-sherut-regulation");
    expect(getSource("guide-sherut-regulation").url).toContain("gov.il");
    const allText = [guide.title, guide.description, guide.intro, guide.answer,
      ...guide.sections.flatMap((section) => section.paragraphs), ...guide.faqs.map((item) => item.a)].join(" ");
    expect(allText).not.toMatch(/companies (?:themselves|still)|businesses (?:themselves|still)|their companies/i);
    for (const section of guide.sections) for (const link of section.inlineLinks || []) {
      expect(section.paragraphs.join(" ").split(link.text), `link text ${link.text} must occur once`).toHaveLength(2);
    }
    expect(guide.related).toContain("shabbat");
    expect(guide.related).toContain("airportTaxis");
  });

  it("renders Sherut links, four complementary planning cards and one contextual contact form", async () => {
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
    expect(container.querySelector("#nesher-amal")?.textContent).toMatch(/Nesher.*Amal.*no longer operating/s);
    const alternativeSection = container.querySelector("#airport-alternatives") as HTMLElement;
    const contactLink = within(alternativeSection).getByRole("link", { name: /Ask me about your airport journey using the contact form below/ });
    expect(contactLink).toHaveAttribute("href", "#contact");
    expect(alternativeSection.querySelector("form")).toBeNull();
    const related = within(container).getByRole("region", { name: "Related practical guides" });
    const next = within(container).getByRole("region", { name: "Plan the next part of your trip" });
    const contact = within(container).getByRole("form", { name: "Guide contact message" });
    expect(related.querySelectorAll("li")).toHaveLength(6);
    expect(next.querySelectorAll("li")).toHaveLength(4);
    expect(container.querySelectorAll('form[aria-label="Guide contact message"]')).toHaveLength(1);
    expect(within(container).getByRole("heading", { name: "Questions about leaving Ben Gurion Airport?" })).toBeInTheDocument();
    expect((within(contact).getByRole("textbox", { name: /Subject/ }) as HTMLInputElement).value).toContain(travelGuides.sherut.title);
    expect(related.compareDocumentPosition(next) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(next.compareDocumentPosition(contact) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("retains the limited Terminal 1 weekend option without copying old fares or treating it as a universal airport shuttle", () => {
    const shabbat = travelGuides.shabbat;
    expect(shabbat.answer).toMatch(/limited free weekend Line 711/i);
    expect(shabbat.answer).toContain("Terminal 1");
    expect(shabbat.sourceIds).toContain("guide-weekend-711");
    expect(getSource("guide-weekend-711").url).toContain("tel-aviv.gov.il");
    expect(shabbat.sections.find((section) => section.id === "weekend-711")!.paragraphs.join(" ")).toMatch(/not timed to flights/);
    expect(shabbat.sections.find((section) => section.id === "restart")!.paragraphs.join(" ")).toMatch(/Saturday evening arrival.*first actual train or bus for your date and destination/);
    expect(JSON.stringify(shabbat)).not.toMatch(/guaranteed pickup|150–230|300–360|500–600/);
  });

  it("covers distinct Shabbat airport search intents with cited facts and topic-specific images", () => {
    const guide = travelGuides.shabbat;
    expect(guide.sections.map((section) => section.id)).toEqual([
      "shabbat-hours", "arrival-time", "weekend-711", "terminal-transfer",
      "taxis-transfers", "costs", "rental-car", "destinations", "restart", "practical",
    ]);
    expect(guide.sections.filter((section) => section.photo)).toHaveLength(0);
    expect(guide.faqs.length).toBe(6);
    expect(guide.sections.find((section) => section.id === "arrival-time")!.tables?.[0]?.rows).toHaveLength(4);
    expect(guide.sections.find((section) => section.id === "terminal-transfer")!.paragraphs.join(" ")).toMatch(/every 15 minutes.*three steps below/s);
    expect(guide.sections.find((section) => section.id === "taxis-transfers")!.paragraphs.join(" ")).toMatch(/24 hours a day.*Exit 03.*Exit 23/s);
    expect(guide.sections.find((section) => section.id === "destinations")!.tables?.[0]?.rows).toHaveLength(5);
    for (const section of guide.sections) for (const link of section.inlineLinks || []) {
      expect(section.paragraphs.join(" ").split(link.text)).toHaveLength(2);
    }
    expect(guide.sections.find((section) => section.id === "taxis-transfers")!.inlineLinks?.map((link) => link.to)).toEqual([
      travelGuidePaths.airportTaxis, "/transfers/",
    ]);
    const costs = guide.sections.find((section) => section.id === "costs")!;
    expect(costs.paragraphs.join(" ")).toContain("based on Israel's official April 2026 taxi tariff");
    expect(costs.tables?.[0]?.headers).toEqual(["Destination", "Approx. taxi fare", "Typical driving time"]);
    expect(costs.tables?.[0]?.rows).toEqual([
      ["Tel Aviv", "₪180–230", "30–40 min"],
      ["Jerusalem", "₪310–410", "45–65 min"],
      ["Haifa", "₪670–830", "75–105 min"],
    ]);
    expect(costs.tables?.[0]?.note).toMatch(/general estimates.*destination.*pickup time.*traffic.*route/is);
    expect(costs.paragraphs.join(" ") + costs.tables?.[0]?.note).not.toMatch(/₪5\.78|airport.departure charge|example routes of/i);
    expect(costs.paragraphs.join(" ")).not.toMatch(/Tariff [ABC]|16:01|21:01/);
    expect(guide.sections.find((section) => section.id === "weekend-711")!.paragraphs.join(" ")).toMatch(/Friday 17:30 to 01:30.*Saturday 10:30 to 18:30.*every two hours/is);
    expect(guide.sections.find((section) => section.id === "weekend-711")!.sourceIds).toContain("guide-711-hours");
    expect(guide.sections.find((section) => section.id === "shabbat-hours")!.paragraphs.join(" ")).toMatch(/Yom Kippur is a special exception/);
    expect(guide.sections.find((section) => section.id === "destinations")!.paragraphs.join(" ")).toMatch(/no regular walk-up airport sherut service/);
    expect(guide.sections.find((section) => section.id === "taxis-transfers")!.paragraphs.join(" ")).toMatch(/at least two hours before pickup/);
    expect(guide.sections.find((section) => section.id === "taxis-transfers")!.paragraphs.join(" ")).toContain("You can also compare private airport-transfer options.");
    expect(guide.sections.find((section) => section.id === "arrival-time")!.tables?.[0]?.note)
      .toBe("Friday and Saturday service varies with season, destination and holidays.");
    expect(guide.sections.find((section) => section.id === "destinations")!.paragraphs.join(" "))
      .toContain("Ben Gurion Airport to Ein Bokek guide");
    expect(guide.sections.find((section) => section.id === "destinations")!.paragraphs.join(" "))
      .not.toContain("The former Amal airport sherut is discontinued.");
    expect(costs.sourceIds).toEqual(["taxi-fares-2026"]);
    expect(costs.inlineLinks?.[0]?.to).toBe(travelGuidePaths.taxiFares);
    expect(guide.services).toHaveLength(4);
    expect(guide.updatedAt).toBe("2026-11-11");
    expect(getSource("guide-711-hours").note).toContain("Saturday 10:30–18:30");
    expect(guide.sections.find((section) => section.id === "taxis-transfers")!.paragraphs.join(" ")).toMatch(/do not need the Gett app/);
    expect(JSON.stringify(guide)).not.toMatch(/I have not carried over|comparison below/);
  });

  it("never cites or points to legacy travel guides from new guide content", () => {
    for (const guide of Object.values(travelGuides)) {
      const ids = [...guide.sourceIds, ...guide.sections.flatMap((section) => section.sourceIds || [])];
      expect(ids.some((id) => /^(?:guide-original-|m26-original-)/.test(id)), guide.id).toBe(false);
      const prose = [guide.intro, guide.answer, ...guide.sections.flatMap((section) => section.paragraphs)].join(" ");
      expect(prose, guide.id).not.toMatch(/\b(?:the original guide|the previous guide|our old guide)\b/i);
      expect(guide.sections.flatMap((section) => section.inlineLinks || []).every((link) => !String(link.to).includes("israel-taxi.com")), guide.id).toBe(true);
    }
  });

  it("ends the Shabbat guide with six related guides, four complementary next steps and one personal contact form", async () => {
    const router = await routerAt(travelGuidePaths.shabbat);
    const Page = ShabbatRoute.options.component!;
    const { container } = render(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
    const related = within(container).getByRole("region", { name: "Related practical guides" });
    const next = within(container).getByRole("region", { name: "Plan the next part of your trip" });
    const contact = within(container).getByRole("form", { name: "Guide contact message" });
    expect(related.querySelectorAll("li")).toHaveLength(6);
    expect(next.querySelectorAll("li")).toHaveLength(4);
    const nextPaths = Array.from(next.querySelectorAll("a")).map((link) => link.getAttribute("href"));
    expect(nextPaths).toEqual([
      "/car-rental/",
      "/travel-blog/where-to-stay-in-tel-aviv/",
      "/travel-blog/jerusalem-travel-guide/",
      "/travel-blog/dead-sea-attractions/",
    ]);
    expect(nextPaths).not.toContain("/transfers/");
    expect(nextPaths.filter((path) => path?.includes("tel-aviv"))).toHaveLength(1);
    expect(nextPaths).toContain("/travel-blog/jerusalem-travel-guide/");
    expect(nextPaths).toContain("/travel-blog/dead-sea-attractions/");
    expect(new Set(nextPaths).size).toBe(4);
    expect(container.querySelectorAll("#contact")).toHaveLength(1);
    expect(container.querySelector("#request-quote")).toBeNull();
    const taxiSection = container.querySelector("#taxis-transfers") as HTMLElement;
    const contactJump = within(taxiSection).getByRole("link", { name: /Send me your arrival details using the contact form below/i });
    expect(contactJump).toHaveAttribute("href", "#contact");
    expect(contactJump.closest("p")).not.toBeNull();
    expect(taxiSection.querySelector("form")).toBeNull();
    expect(container.querySelector('nav[aria-label="On this page"] a[href="#contact"]')).not.toBeNull();
    expect(container.querySelector('nav[aria-label="On this page"] a[href="#request-quote"]')).toBeNull();
    expect(within(container).getByRole("heading", { name: "Questions about arriving on Shabbat?" })).toBeInTheDocument();
    expect((within(contact).getByRole("textbox", { name: /Subject/ }) as HTMLInputElement).value).toContain(travelGuides.shabbat.title);
    expect(related.compareDocumentPosition(next) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(next.compareDocumentPosition(contact) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    const official = within(container).getByRole("link", { name: /Line 711 stop-by-stop timetable/ });
    expect(official).toHaveAttribute("href", "https://busofash.co.il/?lines=711");
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
    for (const [label, url] of ([
      ["Look up Shabbat times on MyZmanim", "https://www.myzmanim.com/"],
      ["Israel Railways — official timetable", "https://rail.co.il/?lan=en"],
      ["National Public Transport Authority — route planner", "https://route.bus.gov.il/?saveParams=true&tab=source-destination"],
    ] as const)) {
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
    expect(travelGuides.israel.related).toEqual(["telAviv", "taxis", "sherut", "shabbat", "airportTaxis", "arrival"]);
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
  it.each([
    { id: "taxis", route: TaxiRoute, count: 3 },
    { id: "uber", route: UberRoute, count: 2 },
    { id: "sherut", route: SherutRoute, count: 3 },
    { id: "shabbat", route: ShabbatRoute, count: 3 },
  ] as const)("renders descriptive lightbulb links on $id without generic labels", async ({ id, route, count }) => {
    const router = await routerAt(travelGuidePaths[id]);
    const Page = route.options.component!;
    const { container } = render(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
    const cards = [...container.querySelectorAll('[data-testid="highlighted-useful-link"]')];
    expect(cards).toHaveLength(count);
    for (const card of cards) {
      expect(card.querySelector('svg[aria-hidden="true"]')).not.toBeNull();
      expect(card.querySelector("a[href]")).not.toBeNull();
      expect(card.textContent).not.toMatch(/Useful link/i);
      expect(card.querySelectorAll("p")).toHaveLength(2);
    }
    if (id === "sherut") {
      expect(container.querySelector("header p.text-lg")?.textContent).toMatch(/^Shared shuttle taxis once operated from Ben Gurion Airport to Jerusalem and Haifa, but those regular airport services have been discontinued/);
      expect(container.querySelector("#airport-alternatives")?.querySelectorAll('[data-testid="highlighted-useful-link"]')).toHaveLength(2);
    }
    if (id === "shabbat") {
      for (const sectionId of ["shabbat-hours", "weekend-711", "restart"]) {
        const extra = container.querySelector(`#${sectionId}`)?.nextElementSibling;
        const isCallout = extra?.matches('[data-testid="highlighted-useful-link"]');
        expect(isCallout ? 1 : extra?.querySelectorAll('[data-testid="highlighted-useful-link"]').length).toBe(1);
      }
    } else {
      for (const section of travelGuides[id].sections) for (const link of section.highlightedLinks || []) {
        const sectionNode = container.querySelector(`#${section.id}`)!;
        expect(sectionNode.querySelector(`aside[data-testid="highlighted-useful-link"] a[href="${link.href}"]`)).not.toBeNull();
        expect(sectionNode.querySelector(`ul[aria-label="Official resources"] a[href="${link.href}"]`)).toBeNull();
      }
    }
  });

});
