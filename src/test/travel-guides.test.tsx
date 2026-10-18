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
    expect(screen.getByRole("table", { name: guide.comparison.caption })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Travel checklist" })).toHaveTextContent("Before you go");
    for (const section of guide.sections) expect(screen.getByRole("heading", { name: section.title })).toBeInTheDocument();
    for (const section of guide.sections) if ("photo" in section && section.photo) {
      expect(within(container.querySelector(`#${section.id}`)! as HTMLElement).getByRole("img", { name: section.photo.alt })).toHaveAttribute("src", section.photo.src);
      if (section.photo.sourceUrl && !isPublisherUrl(section.photo.sourceUrl)) expect(container.querySelector(`#${section.id} a[href="${section.photo.sourceUrl}"]`)).not.toBeNull();
    }
    for (const sourceId of guide.sourceIds) expect(getSource(sourceId)?.url).toMatch(/^https:\/\//);
    expect(container.querySelector("time")).toHaveAttribute("datetime", TRAVEL_GUIDE_CHECK_DATE);
    expect(container.querySelector("time")).toHaveTextContent("October 2026");
    const authorCard = screen.getByRole("complementary", { name: "About the author" });
    expect(authorCard).toHaveTextContent("Written by Moshe Barak");
    expect(authorCard).toHaveTextContent("more than 20 years");
    expect(within(authorCard).getByRole("link", { name: /reviews on Tripadvisor/ })).toHaveAttribute("href", mosheBarakAuthor.reviewsUrl);
    expect(authorCard.compareDocumentPosition(screen.getByRole("region", { name: "Quick answer" }))).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(container.textContent).not.toMatch(/editorial team|Adapted from|Source checks and limitations below|Image from the original publisher/);
    expect(container.querySelector('a[href*="israel-taxi.com"]')).toBeNull();
    expect(container.querySelector("a a")).toBeNull();
    const related = screen.getByRole("region", { name: "Related practical guides" });
    for (const link of within(related).getAllByRole("link")) {
      const href = link.getAttribute("href")!;
      expect(router.matchRoutes(href).at(-1)?.routeId).toBe(href.replace(/\/$/, ""));
      expect(link).not.toHaveAttribute("target");
    }
    const head = await route.options.head?.({} as never);
    expect(head).toMatchObject({ meta: expect.arrayContaining([{ title: guide.title }, { name: "description", content: guide.description }, { name: "robots", content: "noindex,nofollow" }]), links: [{ rel: "canonical", href: expect.stringMatching(new RegExp(`${path}$`)) }] });
    const structured = head!.scripts!.flatMap((script) => typeof script?.children === "string" ? [JSON.parse(script.children)] : []);
    const article = structured.find((item) => item["@type"] === "Article");
    expect(article).toMatchObject({ headline: guide.title, dateModified: TRAVEL_GUIDE_CHECK_DATE, inLanguage: "en", author: { "@type": "Person", name: "Moshe Barak", sameAs: [mosheBarakAuthor.reviewsUrl] } });
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
    expect(guideDirectory).toHaveLength(47);
    expect(new Set(guideDirectory.map((guide) => guide.to)).size).toBe(47);
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
    expect(screen.getAllByTestId("guide-directory-card")).toHaveLength(47);
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "eSIM" } });
    expect(screen.getAllByTestId("guide-directory-card")).toHaveLength(1);
    fireEvent.submit(screen.getByRole("search"));
    await waitFor(() => expect(router.state.location.search).toMatchObject({ q: "eSIM" }));
    const topics = screen.getByRole("navigation", { name: "Filter guides by topic" });
    fireEvent.click(within(topics).getByRole("link", { name: "Attractions" }));
    await screen.findByRole("heading", { name: "No guides match this search" });
    fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    await waitFor(() => expect(screen.getAllByTestId("guide-directory-card")).toHaveLength(47));
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
    expect(travelGuides.arrival.sections.find((section) => section.id === "onward")!.paragraphs.join(" ")).toMatch(/Exit 03.*Level 2, Exit 23/);
    expect(travelGuides.taxis.sections.find((section) => section.id === "airport")!.paragraphs.join(" ")).toMatch(/Exit 03.*Level 2, Exit 23/);
    expect(travelGuides.uber.reviewNote).toMatch(/publisher.*not a live/i);
    expect(travelGuides.sherut.reviewNote).toMatch(/no current operator closure notice/i);
    expect(travelGuides.esim.sections.find((section) => section.id === "calling")!.paragraphs.join(" ")).toMatch(/US phone number.*different from an Israeli/s);
    expect(travelGuides.esim.answer).toMatch(/unlimited.*does not promise unlimited full-speed/i);
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

  it("distinguishes baptism sites, church clusters and region-specific Dead Sea planning without blanket operating claims", () => {
    expect(travelGuides.baptism.answer).toMatch(/Yardenit.*Sea of Galilee.*Qasr el-Yahud.*near Jericho/s);
    expect(travelGuides.baptism.reviewNote).toMatch(/different hour sets|differing hour|different hours/i);
    expect(travelGuides.baptism.sections.find((section) => section.id === "qasr-visit")!.photo?.alt).toContain("Qasr el-Yahud");
    expect(travelGuides.jerusalemChurches.comparison.rows.map((row) => row[0])).toEqual(["Old City", "Mount of Olives / Kidron", "Mount Zion", "Ein Karem"]);
    expect(travelGuides.jerusalemDeadSea.sections[0]!.paragraphs.join(" ")).toContain("not the same destination as Ein Bokek");
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
    expect(travelGuides.israel.related).toContain("jerusalem");
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
