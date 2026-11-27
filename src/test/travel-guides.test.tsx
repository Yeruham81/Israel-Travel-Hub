import "@/test/consent-fixture";
import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { topTenIsraelHero } from "@/data/topTenExperiences";
import { afterEach, describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";
import { Route as HubRoute } from "@/routes/travel-blog.index";
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
import { Route as ChurchesRoute } from "@/routes/travel-blog.churches-in-jerusalem";
import { Route as ShoppingRoute } from "@/routes/travel-blog.shopping-in-jerusalem";
import { Route as TopTenRoute } from "@/routes/travel-blog.top-10-things-to-do-in-israel";
import { filterGuides, guideDirectory, guideTopics, travelGuides } from "@/data/travelGuides";
import { AIRALO_COMPATIBILITY_AFFILIATE_URL, AIRALO_MENA_AFFILIATE_URL, affiliateConfig, getSource, isPublisherUrl, mosheBarakAuthor, travelGuidePaths, TRAVEL_GUIDE_CHECK_DATE } from "@/data/registry";
import { readOutboundClicks } from "@/lib/outbound";
import { repeatedPhotos } from "@/lib/photo-uniqueness";

afterEach(() => { cleanup(); localStorage.clear(); });
const cases = [{ id: "uber", route: UberRoute }, { id: "sherut", route: SherutRoute }, { id: "esim", route: EsimRoute }, { id: "arrival", route: ArrivalRoute }, { id: "israel", route: IsraelRoute }, { id: "telAviv", route: TelAvivRoute }, { id: "taxis", route: TaxiRoute },
  { id: "shabbat", route: ShabbatRoute }, { id: "travelTips", route: TipsRoute }, { id: "jerusalem", route: JerusalemRoute }, { id: "jerusalemDeadSea", route: DeadSeaRoute }, { id: "baptism", route: BaptismRoute }, { id: "jerusalemChurches", route: ChurchesRoute }, { id: "jerusalemShopping", route: ShoppingRoute }, { id: "topTen", route: TopTenRoute },
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
    // Dedicated Jerusalem churches guide deliberately uses a concise public H1,
    // while the longer descriptive title remains in metadata and Article schema.
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      id === "jerusalemChurches" ? "Churches in Jerusalem" : guide.title
    );
    if (id === "jerusalemChurches") {
      // The dedicated church guide uses a horizontal museum-style layout, with
      // twenty illustrated site cards, four area groups and a selectable map.
      expect(container.querySelectorAll('article[data-church-card="horizontal"]')).toHaveLength(20);
      expect(container.querySelectorAll('#old article[data-church-card="horizontal"]')).toHaveLength(9);
      expect(container.querySelectorAll('#olives article[data-church-card="horizontal"]')).toHaveLength(6);
      expect(container.querySelectorAll('#zion article[data-church-card="horizontal"]')).toHaveLength(3);
      expect(container.querySelectorAll('#karem article[data-church-card="horizontal"]')).toHaveLength(2);
      expect(container.querySelector('iframe[src^="/maps/jerusalem-churches.html"]')).not.toBeNull();
      expect(container.querySelectorAll('#explore-more a')).toHaveLength(6);
      expect(container.querySelectorAll('#contact')).toHaveLength(1);
      expect(container.querySelector("time")).toHaveAttribute("datetime", guide.updatedAt);
      expect(screen.getByRole("complementary", { name: "About the author" })).toHaveTextContent("Written by Moshe Barak");
      const head = await route.options.head?.({} as never);
      expect(head).toMatchObject({ meta: expect.arrayContaining([
        { title: guide.title },
        { name: "description", content: guide.description },
        { name: "robots", content: "noindex,nofollow" },
      ]) });
      const structured = head!.scripts!.flatMap(script => typeof script?.children === "string" ? [JSON.parse(script.children)] : []);
      const article = structured.find(item => item["@type"] === "Article");
      expect(article).toMatchObject({ headline: guide.title, dateModified: guide.updatedAt, inLanguage: "en" });
      return;
    }
    if (id === "jerusalem") {
      // The city overview is now a navigation-first planning hub, not the old
      // generic comparison + checklist layout.
      expect(container.querySelector("#quick-answer")).toHaveTextContent("Old City");
      expect(container.querySelectorAll("#choose .grid > a")).toHaveLength(6);
      expect(container.querySelectorAll("#how-many-days article")).toHaveLength(3);
      expect(container.querySelectorAll("#where-to-stay article")).toHaveLength(6);
      expect(container.querySelectorAll('#where-to-stay article a[href^="/accommodation/jerusalem/"]')).toHaveLength(6);
      expect(container.querySelector('#where-to-stay article a[href="/accommodation/jerusalem/east-jerusalem/"]')).not.toBeNull();
      expect(container.querySelector('#city-tours a[href="/tours/jerusalem/"]')).not.toBeNull();
      expect(container.querySelector('#day-trip-tours a[href="/tours/"]')).not.toBeNull();
      expect(container.querySelectorAll("#getting-around [data-testid='jerusalem-transport-links'] > a")).toHaveLength(4);
      expect(container.querySelectorAll("#day-trips .grid > a")).toHaveLength(6);
      expect(container.querySelectorAll("#explore-more .grid > a")).toHaveLength(6);
      expect(container.querySelectorAll('[data-testid="jerusalem-hub-tour-card"]')).toHaveLength(6);
      expect(container.querySelectorAll("#faq details")).toHaveLength(8);
      expect(container.querySelector('a[href="/travel-blog/where-to-stay-in-jerusalem/"]')).not.toBeNull();
      expect(container.querySelector('a[href="/accommodation/jerusalem/"]')).not.toBeNull();
      expect(container.querySelector('a[href="/travel-blog/calendar-of-events/"]')).not.toBeNull();
      expect(container.querySelector('#contact form')).not.toBeNull();
      expect(container.querySelector('#contact [data-photo-role="contact-portrait"]')).not.toBeNull();
      expect(container.querySelector("time")).toHaveAttribute("datetime",guide.updatedAt);
      expect(screen.getByRole("complementary", { name: "About the author" })).toHaveTextContent("Written by Moshe Barak");
      const contact=container.querySelector("#contact")!;
      const sources=container.querySelector("#sources")!;
      expect(contact.compareDocumentPosition(sources) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
      expect(container.querySelector("main iframe")).toBeNull();
      const head=await route.options.head?.({} as never);
      expect(head).toMatchObject({meta:expect.arrayContaining([
        {title:guide.title},{name:"description",content:guide.description},{name:"robots",content:"noindex,nofollow"},
      ])});
      const ld=head!.scripts!.flatMap(item=>typeof item?.children==="string"?[JSON.parse(item.children)]:[]);
      expect(ld.find(item=>item["@type"]==="Article")).toMatchObject({headline:guide.title,dateModified:guide.updatedAt,inLanguage:"en"});
      expect(ld.find(item=>item["@type"]==="FAQPage")?.mainEntity).toHaveLength(8);
      return;
    }
    if (id === "baptism") {
      // The dedicated Jordan River comparison intentionally replaces the old
      // generic checklist/sections layout with a richer site-focused guide.
      expect(container.querySelector("#quick-answer")).toHaveTextContent("Yardenit");
      expect(container.querySelector("[data-testid='baptism-site-comparison'] table")).not.toBeNull();
      expect(container.querySelector("[data-testid='baptism-mobile-comparison']")).toBeNull();
      expect(container.querySelectorAll("#compare-sites tbody tr")).toHaveLength(6);
      expect(container.querySelectorAll('[data-testid="baptism-tour-card"]')).toHaveLength(6);
      expect(container.querySelectorAll("#attractions .grid > a")).toHaveLength(6);
      expect(container.querySelectorAll("#related .grid > a")).toHaveLength(6);
      expect(container.querySelectorAll("#faq details")).toHaveLength(10);
      expect(container.querySelector("#getting-there iframe")).not.toBeNull();
      expect(container.querySelector('#contact form')).not.toBeNull();
      expect(container.querySelector("#sources")).not.toBeNull();
      expect(container.querySelector("time")).toHaveAttribute("datetime",guide.updatedAt);
      expect(screen.getByRole("complementary", { name: "About the author" })).toHaveTextContent("Written by Moshe Barak");
      const head=await route.options.head?.({} as never);
      expect(head).toMatchObject({meta:expect.arrayContaining([
        {title:guide.title},
        {name:"description",content:guide.description},
        {name:"robots",content:"noindex,nofollow"},
      ])});
      const structured=head!.scripts!.flatMap(script=>typeof script?.children==="string"?[JSON.parse(script.children)]:[]);
      expect(structured.find(item=>item["@type"]==="Article")).toMatchObject({headline:guide.title,dateModified:guide.updatedAt,inLanguage:"en"});
      expect(structured.find(item=>item["@type"]==="FAQPage")?.mainEntity).toHaveLength(10);
      return;
    }
    if (id === "jerusalemShopping") {
      // This guide now uses the shared dedicated layout, with an editorial quick
      // recommendation, ten place cards, a map, photos and a six-card follow-up grid.
      expect(container.querySelectorAll('article[id^="shop-"]')).toHaveLength(10);
      expect(container.querySelector('iframe[src^="/maps/jerusalem-shopping.html"]')).not.toBeNull();
      expect(container.querySelector('#shop-bezalel img[src="/images/jerusalem-shopping/bezalel-arts-fair.webp"]')).not.toBeNull();
      expect(container.querySelector('[data-shopping-photo-slot="bezalel"]')).toBeNull();
      expect(container.querySelectorAll("#explore-more a")).toHaveLength(6);
      expect(screen.getByRole("heading", { name: "Where I'd start" })).toBeInTheDocument();
      expect(screen.getByRole("complementary", { name: "About the author" })).toHaveTextContent("Written by Moshe Barak");
      expect(container.querySelector("time")).toHaveAttribute("datetime", guide.updatedAt);
      expect(container.querySelectorAll("#contact")).toHaveLength(1);
      expect(container.querySelector('a[href*="israel-taxi.com"]')).toBeNull();
      const head = await route.options.head?.({} as never);
      expect(head).toMatchObject({ meta: expect.arrayContaining([
        { title: guide.title },
        { name: "description", content: guide.description },
        { name: "robots", content: "noindex,nofollow" },
      ]) });
      const structured = head!.scripts!.flatMap((script) => typeof script?.children === "string" ? [JSON.parse(script.children)] : []);
      const article = structured.find((item) => item["@type"] === "Article");
      expect(article).toMatchObject({ headline: guide.title, dateModified: guide.updatedAt, inLanguage: "en" });
      return;
    }
    if (id === "topTen") {
      expect(container.querySelectorAll('article[id]')).toHaveLength(10);
      expect(container.querySelector('iframe[src^="/maps/top-ten-israel.html"]')).not.toBeNull();
      expect(container.querySelectorAll('#choose a[href^="#"]')).toHaveLength(10);
      expect(container.querySelectorAll("#compare tbody tr")).toHaveLength(10);
      expect(container.querySelectorAll("#explore-more a")).toHaveLength(6);
      expect(container.querySelectorAll("#plan-trip a")).toHaveLength(7);
      expect(container.querySelectorAll("#faq details")).toHaveLength(6);
      expect(container.querySelectorAll("#contact")).toHaveLength(1);
      const photoPaths = [...container.querySelectorAll('#experiences article[data-detailed-card="horizontal"] img')].map(el => el.getAttribute("src"));
      expect(photoPaths).toHaveLength(10);
      expect(new Set(photoPaths).size).toBe(10);
      expect(container.querySelector('figure[data-testid="guide-hero-media"] img')?.getAttribute("src")).toBe(topTenIsraelHero.src);
      const contact = container.querySelector("#contact")!;
      const sources = container.querySelector("#sources")!;
      expect(contact.compareDocumentPosition(sources) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
      expect(screen.getByRole("complementary", { name: "About the author" })).toHaveTextContent("Written by Moshe Barak");
      expect(container.querySelector("time")).toHaveAttribute("datetime", guide.updatedAt);
      expect(container.querySelector('a[href*="israel-taxi.com"]')).toBeNull();
      const head = await route.options.head?.({} as never);
      expect(head).toMatchObject({ meta: expect.arrayContaining([
        { title: guide.title },
        { name: "description", content: guide.description },
        { name: "robots", content: "noindex,nofollow" },
      ]) });
      const structured = head!.scripts!.flatMap((script) => typeof script?.children === "string" ? [JSON.parse(script.children)] : []);
      const article = structured.find(item => item["@type"] === "Article");
      expect(article).toMatchObject({ headline: guide.title, dateModified: guide.updatedAt, inLanguage: "en" });
      return;
    }
    if (id === "travelTips") {
      // The dedicated first-visitor guide replaces the generic comparison
      // table / quick-answer template with actionable planning sections.
      expect(container.querySelectorAll('[data-testid="essential-tips"] > a')).toHaveLength(10);
      expect(container.querySelectorAll('[data-testid="israel-stay-cards"] > li')).toHaveLength(5);
      expect(container.querySelectorAll('[data-testid="travel-tips-related-guides"] > li')).toHaveLength(6);
      expect(container.querySelectorAll("#faq details")).toHaveLength(8);
      for (const section of ["before-you-travel", "arriving", "plan-your-stay", "everyday"]) {
        expect(container.querySelector(`#${section}`)).not.toBeNull();
      }
      expect(container.querySelector("#contact form")).not.toBeNull();
      expect(container.querySelector("#sources")).not.toBeNull();
      expect(container.querySelector('a[href*="is-it-safe-to-travel-to-israel"]')).toBeNull();
      expect(container.querySelector('a[href*="israel-taxi.com"]')).toBeNull();
      expect(screen.getByRole("complementary", { name: "About the author" })).toHaveTextContent("Written by Moshe Barak");
      expect(container.querySelector("time")).toHaveAttribute("datetime", guide.updatedAt);
      const head = await route.options.head?.({} as never);
      expect(head).toMatchObject({ meta: expect.arrayContaining([
        { title: guide.title },
        { name: "description", content: guide.description },
        { name: "robots", content: "noindex,nofollow" },
      ]) });
      const structured = head!.scripts!.flatMap(script => typeof script?.children === "string" ? [JSON.parse(script.children)] : []);
      expect(structured.find(item => item["@type"] === "Article")).toMatchObject({
        headline: guide.title, dateModified: guide.updatedAt, inLanguage: "en",
      });
      return;
    }
    expect(screen.getByRole("region", { name: "Quick answer" })).toHaveTextContent(guide.answer);
    if (id === "esim") {
      expect(screen.getByRole("region", { name: "Unlimited eSIM plans by duration" })).toBeInTheDocument();
      expect(container.querySelector("#at-a-glance")).toBeNull();
    } else if (id === "jerusalemDeadSea") {
      expect(screen.queryByTestId("journey-option-cards")).not.toBeInTheDocument();
      expect(screen.getByTestId("journey-stop-cards").children).toHaveLength(4);
      expect(screen.getByRole("table", { name: guide.comparison.caption })).toBeInTheDocument();
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
      if (section.photo.sourceUrl && !isPublisherUrl(section.photo.sourceUrl)) expect(container.querySelector(`[aria-label="Photo credits and licences"] a[href="${section.photo.sourceUrl}"]`)).not.toBeNull();
    }
    for (const sourceId of guide.sourceIds) expect(getSource(sourceId)?.url).toMatch(/^https:\/\//);
    expect(container.querySelector("time")).toHaveAttribute("datetime", guide.updatedAt || TRAVEL_GUIDE_CHECK_DATE);
    const displayedMonth = new Date(`${guide.updatedAt || TRAVEL_GUIDE_CHECK_DATE}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
    expect(container.querySelector("time")).toHaveTextContent(displayedMonth);
    const authorCard = screen.getByRole("complementary", { name: "About the author" });
    expect(authorCard).toHaveTextContent("Written by Moshe Barak");
    expect(authorCard).toHaveTextContent("Over 20 years");
    expect(within(authorCard).getByRole("link", { name: /reviews on tripadvisor/i })).toHaveAttribute("href", mosheBarakAuthor.reviewsUrl);
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
    const router = await routerAt("/travel-blog/");
    const Hub = HubRoute.options.component!;
    const html = renderToString(<RouterContextProvider router={router}><Hub /></RouterContextProvider>);
    expect(guideDirectory.length).toBeGreaterThanOrEqual(42);
    const doc = new DOMParser().parseFromString(html, "text/html");
    const cardPhotos = [...doc.querySelectorAll('[data-testid="guide-directory-card"] img')].map(photo => photo.getAttribute("src") || "");
    expect(repeatedPhotos(cardPhotos)).toEqual([]);
    expect(new Set(guideDirectory.map((guide) => guide.to)).size).toBe(guideDirectory.length);
    expect(guideDirectory.some(guide => guide.id === "calendar" && guide.to === "/travel-blog/calendar-of-events/")).toBe(true);
    expect(guideDirectory.some(guide => guide.id === "israel-holidays")).toBe(false);
    for (const guide of guideDirectory) {
      expect(html).toContain(`href="${guide.to}"`);
      expect(router.matchRoutes(String(guide.to)).at(-1)?.routeId).toBe(String(guide.to).replace(/\/$/, ""));
    }
    for (const topic of guideTopics) expect(guideDirectory.some((guide) => guide.topics.includes(topic.id))).toBe(true);
  });

  it("adds six destination/service links and six compact planning guides without changing the directory cards", async () => {
    const router = await routerAt("/travel-blog/");
    const Hub = HubRoute.options.component!;
    const html = renderToString(<RouterContextProvider router={router}><Hub /></RouterContextProvider>);
    const doc = new DOMParser().parseFromString(html, "text/html");
    const cards = doc.querySelectorAll('[data-testid="guide-directory-card"]');
    expect(cards).toHaveLength(guideDirectory.length);
    const explore = doc.querySelector('section#explore-israel')!;
    const planning = doc.querySelector('section#plan-israel-trip')!;
    expect(explore.querySelector("h2")?.textContent).toBe("Explore Israel further");
    expect(planning.querySelector("h2")?.textContent).toBe("Plan your trip to Israel");
    const exploreLinks = [...explore.querySelectorAll("li > a")];
    const planningLinks = [...planning.querySelectorAll("li > a")];
    expect(exploreLinks).toHaveLength(6);
    expect(planningLinks).toHaveLength(6);
    expect(explore.querySelectorAll("li img")).toHaveLength(6);
    expect(new Set([...explore.querySelectorAll("li img")].map(image => image.getAttribute("src"))).size).toBe(6);
    expect(planning.querySelectorAll("img")).toHaveLength(0);
    expect(planning.querySelectorAll("svg")).toHaveLength(6);
    expect(exploreLinks.map(link => link.getAttribute("href"))).toEqual([
      "/attractions/", "/tours/", "/shore-excursions/", "/airport-transfers/", "/accommodation/", "/private-driver-in-israel/",
    ]);
    expect(planningLinks.map(link => link.getAttribute("href"))).toEqual([
      travelGuidePaths.travelTips, travelGuidePaths.bestTime, travelGuidePaths.israel,
      travelGuidePaths.calendar, travelGuidePaths.esim, "/travel-blog/israel-itinerary-7-days/",
    ]);
    for (const link of [...exploreLinks, ...planningLinks]) {
      const to = link.getAttribute("href")!;
      expect(router.matchRoutes(to).at(-1)?.routeId.replace(/\/$/, "")).toBe(to.replace(/\/$/, ""));
    }
    expect(explore.compareDocumentPosition(planning)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    const credits = doc.querySelector("details")!;
    expect(planning.compareDocumentPosition(credits)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  it("uses compact topic chips, shareable URL filters, and no free-text search", async () => {
    const router = await routerAt("/travel-blog/");
    const Hub = HubRoute.options.component!;
    render(<RouterContextProvider router={router}><Hub /></RouterContextProvider>);
    expect(screen.getAllByTestId("guide-directory-card")).toHaveLength(guideDirectory.length);
    expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("search")).not.toBeInTheDocument();
    const topics = screen.getByRole("navigation", { name: "Filter guides by topic" });
    expect(topics).toHaveClass("rounded-xl", "bg-secondary/25");
    expect(within(topics).getAllByRole("link")).toHaveLength(guideTopics.length + 1);
    expect(within(topics).getByRole("link", { name: "All guides" })).toHaveAttribute("aria-current", "true");
    expect(within(topics).getByRole("link", { name: "eSIM & mobile" })).toHaveAttribute("href", "/travel-blog/?topic=connectivity");
    fireEvent.click(within(topics).getByRole("link", { name: "eSIM & mobile" }));
    await waitFor(() => expect(router.state.location.search).toEqual({ topic: "connectivity" }));
    expect(screen.getAllByTestId("guide-directory-card")).toHaveLength(filterGuides("", "connectivity").length);
    expect(within(topics).getByRole("link", { name: "eSIM & mobile" })).toHaveAttribute("aria-current", "true");
    expect(topics.querySelectorAll('[aria-current="true"]')).toHaveLength(1);
    fireEvent.click(within(topics).getByRole("link", { name: "All guides" }));
    await waitFor(() => expect(router.state.location.search).toEqual({}));
    expect(screen.getAllByTestId("guide-directory-card")).toHaveLength(guideDirectory.length);
    await act(async () => { await router.navigate({ to: "/travel-blog/", search: { topic: "attractions" } }); });
    expect(screen.getAllByTestId("guide-directory-card")).toHaveLength(filterGuides("", "attractions").length);
    expect(within(topics).getByRole("link", { name: "Attractions" })).toHaveAttribute("aria-current", "true");
    fireEvent.click(screen.getByRole("link", { name: "Clear filter" }));
    await waitFor(() => expect(router.state.location.search).toEqual({}));
    expect(screen.getAllByTestId("guide-directory-card")).toHaveLength(guideDirectory.length);
  });

  it("ignores deprecated text-search parameters instead of invisibly filtering the directory", async () => {
    const router = await routerAt("/travel-blog/?q=eSIM");
    const Hub = HubRoute.options.component!;
    render(<RouterContextProvider router={router}><Hub /></RouterContextProvider>);
    expect(screen.getAllByTestId("guide-directory-card")).toHaveLength(guideDirectory.length);
    expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
  });

  it("opens article topic tags as valid filtered directory links", async () => {
    const router = await routerAt(travelGuidePaths.esim);
    const Page = EsimRoute.options.component!;
    render(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
    const tags = screen.getByRole("list", { name: "Guide topics" });
    fireEvent.click(within(tags).getByRole("link", { name: "Mobile & connectivity" }));
    await waitFor(() => expect(router.state.location.pathname).toBe("/travel-blog/"));
    expect(router.state.location.search).toEqual({ topic: "connectivity" });
  });

  it("keeps current airport pickup distinctions and attributes uncertain operator status", () => {
    expect(travelGuides.arrival.sections.find((section) => section.id === "leave-airport")!.paragraphs.join(" ")).toMatch(/Exit 03.*Exit 23/);
    expect(travelGuides.taxis.sections.find((section) => section.id === "airport")!.inlineLinks?.some((link) => link.to === travelGuidePaths.airportTaxis)).toBe(true);
    expect(travelGuides.airportTaxis.comparison.rows.join(" ")).toMatch(/Exit 03.*Exit 23/);
    expect(travelGuides.uber.intro).toMatch(/Uber and Lyft do not currently offer passenger rides in Israel/);
    expect(travelGuides.sherut.answer).toMatch(/Regular Nesher sherut rides to Jerusalem and Amal shared taxis to Haifa no longer operate/);
    expect(travelGuides.esim.sections.find((section) => section.id === "calling")!.paragraphs.join(" ")).toMatch(/A data-only eSIM lets you browse, navigate and use WhatsApp/s);
    expect(travelGuides.esim.answer).toMatch(/Saily.*Airalo.*GigSky/s);
  });

  it("covers the complete airport arrival sequence without duplicating specialty transport guides", () => {
    const guide = travelGuides.arrival;
    expect(guide.title).toMatch(/^Ben Gurion Airport Arrivals Guide: Passport Control/);
    expect(guide.title).not.toMatch(/\b20\d{2}\b/);
    expect(guide.description).not.toMatch(/\b20\d{2}\b/);
    expect(guide.answer).toMatch(/Terminal 3.*passport control.*customs.*arrivals hall/s);
    expect(guide.sections.map((s) => s.id)).toEqual([
      "before-you-fly", "arrival-terminal", "passport-control", "baggage", "customs",
      "arrivals-hall", "phones-money", "leave-airport", "arrival-timing", "shabbat", "assistance",
    ]);
    expect(guide.sections.filter((s) => s.photo)).toHaveLength(2);
    expect(guide.faqs).toHaveLength(8);
    expect(guide.sections.find((s) => s.id === "leave-airport")!.tables?.[0]?.rows).toHaveLength(6);
    expect(guide.sourceIds).toEqual(expect.arrayContaining([
      "guide-entry", "guide-iaa-terminal-2026", "guide-customs-tourists",
      "guide-lost-property", "guide-iaa-accessibility", "guide-gett",
    ]));
    expect(guide.sections.find((s) => s.id === "arrival-terminal")!.paragraphs.join(" ")).toMatch(/International arriving flights currently use Terminal 3.*Terminal 1 serves domestic arrivals from Ramon Airport/s);
    expect(guide.sections.find((s) => s.id === "customs")!.paragraphs.join(" ")).toMatch(/green channel.*red channel.*red channel and asking/s);
    expect(guide.sections.find((s) => s.id === "leave-airport")!.inlineLinks?.map((l) => l.to)).toEqual([
      travelGuidePaths.airportTaxis, "/airport-transfers/", travelGuidePaths.sherut, travelGuidePaths.taxiFares,
      "/travel-blog/ben-gurion-airport-to-tel-aviv/", "/travel-blog/ben-gurion-airport-to-jerusalem/",
      "/travel-blog/ben-gurion-airport-to-haifa/", "/travel-blog/ben-gurion-airport-to-ein-bokek/", travelGuidePaths.israel,
    ]);
    expect(guide.sections.find((s) => s.id === "shabbat")!.inlineLinks?.[0]?.to).toBe(travelGuidePaths.shabbat);
    expect(guide.sections.find((s) => s.id === "assistance")!.inlineLinks?.[0]?.to).toBe(travelGuidePaths.taxis);
    for (const section of guide.sections) for (const link of section.inlineLinks || []) {
      expect(section.paragraphs.join(" ").split(link.text), `inline text ${link.text} must occur once`).toHaveLength(2);
    }
  });

  it("publishes the practical arrival upgrade without changing its hero image", () => {
    const guide = travelGuides.arrival;
    expect(guide.updatedAt).toBe("2026-11-24");
    expect(guide.photo.src).toBe("/images/travel-blog/featured-ben-gurion-arrival.webp");
    expect(guide.sections.filter(s => s.photo)).toHaveLength(2);
    expect(guide.related).toHaveLength(6);
    expect(guide.sections.find(s => s.id === "before-you-fly")!.highlightedLinks?.[0]?.href).toBe("https://israel-entry.piba.gov.il/");
    expect(guide.sections.find(s => s.id === "before-you-fly")!.paragraphs.join(" ")).toContain("₪25");
    expect(guide.sections.find(s => s.id === "passport-control")!.paragraphs.join(" ")).toContain("blue entry card");
    expect(guide.sections.find(s => s.id === "baggage")!.externalLinks).toHaveLength(2);
    expect(guide.sections.find(s => s.id === "assistance")!.highlightedLinks?.[0]?.href).toContain("iaa.gov.il");
    const transport = guide.sections.find(s => s.id === "leave-airport")!.tables![0]!;
    expect(transport.headers).toEqual(["Mode", "Useful when", "Where to go / Pickup point"]);
    expect(transport.rows).toEqual(expect.arrayContaining([
      expect.arrayContaining(["Immediate airport taxi", expect.any(String), expect.stringContaining("Exit 03")]),
      expect.arrayContaining(["Gett taxi booked in advance", expect.any(String), expect.stringContaining("Exit 23")]),
    ]));
    const timing = guide.sections.find(s => s.id === "arrival-timing")!.tables![0]!;
    expect(timing.rows).toHaveLength(3);
    expect(timing.note).toContain("Allow additional time for security, immigration or baggage delays.");
  });

  it("renders short airport-arrival navigation, six photo guides and sources after the inquiry", async () => {
    const router = await routerAt(travelGuidePaths.arrival);
    const Page = ArrivalRoute.options.component!;
    const { container } = render(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
    const nav = container.querySelector('nav[aria-label="On this page"]')!;
    expect(nav.querySelectorAll("ul.grid > li")).toHaveLength(11);
    expect(nav.querySelector('a[href="#leave-airport"]')).toHaveTextContent("Transport");
    expect(nav.querySelector('a[href="#contact"]')).toHaveTextContent("Contact me");
    expect(container.querySelector('[data-testid="stay-trip-photo-grid"]')?.querySelectorAll("li")).toHaveLength(6);
    expect(container.querySelector("#contact")).toHaveTextContent("Need a private airport pickup?");
    const sourceSection = container.querySelector("#sources");
    expect(sourceSection).not.toBeNull();
    expect(container.querySelector("#contact")!.compareDocumentPosition(sourceSection!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
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
    expect(airportJump).toHaveAttribute("aria-label", "Airport taxis: Taking a Taxi from Ben Gurion Airport");
    expect(nav.querySelector('a[href="#contact"]')).toHaveTextContent("Contact me");
    const jumpItems = Array.from(nav.querySelectorAll("ul.grid > li"));
    expect(jumpItems).toHaveLength(10);
    expect(jumpItems.every((item) => !item.classList.contains("hidden"))).toBe(true);
    expect(nav.querySelector("details")).toBeNull();
    expect(container.querySelector("#booking > div")).toHaveClass("text-foreground");
    expect(within(container).getByRole("heading", { name: "Need a private transfer or driver in Israel?" })).toBeInTheDocument();
    expect(within(container).getByRole("form", { name: "Taxi guide contact message" })).toBeInTheDocument();
    expect(within(container).getByRole("textbox", { name: /Subject/ })).toHaveValue("");
    expect(within(container).queryByText("Explore more Israel travel guides")).not.toBeInTheDocument();
  });

  it("keeps all three taxi guides on the same contact and navigation design", async () => {
    for (const [id, route] of [["taxis", TaxiRoute], ["taxiFares", TaxiFaresRoute], ["airportTaxis", AirportTaxisRoute]] as const) {
      const router = await routerAt(travelGuidePaths[id]);
      const Page = route.options.component!;
      const { container, unmount } = render(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
      const nav = container.querySelector('nav[aria-label="On this page"]') as HTMLElement;
      expect(nav.querySelector('a[href="#contact"]')).toHaveTextContent("Contact me");
      expect(container.querySelector("#checklist")).not.toBeNull();
      expect(container.querySelector('[data-photo-role="author-portrait"]')).not.toBeNull();
      expect(container.querySelector('[data-photo-role="contact-portrait"]')).not.toBeNull();
      expect(container.querySelector("#contact")).toHaveTextContent(/Contact me/i);
      const source = container.querySelector("#sources");
      expect(source).not.toBeNull();
      expect(container.querySelector("#contact")!.compareDocumentPosition(source!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
      expect(container.querySelector('a[href="/travel-blog/ben-gurion-airport-taxis/"]') || id === "airportTaxis").toBeTruthy();
      unmount();
    }
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
      expect((within(container).getByRole("textbox", { name: /Subject/ }) as HTMLInputElement).value).toBe("");
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


  it("keeps the Tel Aviv transport hub focused on eight chapters with verified fare and weekend essentials", () => {
    const guide = travelGuides.telAviv;
    expect(guide.title).toBe("Getting Around Tel Aviv: Buses, Red Line, Taxis & Shabbat Travel");
    expect(guide.updatedAt).toBe("2026-11-24");
    expect(guide.sections.map(section => section.id)).toEqual([
      "choose", "paying", "red-line", "national-rail", "taxis", "bikes", "shabbat", "accessibility",
    ]);
    expect(guide.comparison.rows).toHaveLength(9);
    expect(guide.comparison.headers).toHaveLength(5);
    expect(guide.facts.find(fact => fact.label === "Standard local fare")?.text).toContain("₪8");
    expect(guide.photo.src).toContain("tel-aviv-light-rail");
    expect(guide.photo.alt).toBe("Tel Aviv light rail tram on the Red Line");
    expect(guide.sections.find(section => section.id === "choose")?.photo?.src).not.toBe(guide.photo.src);
    const paying = guide.sections.find(section => section.id === "paying")!;
    expect(paying.tables?.[0]?.rows).toHaveLength(3);
    expect(paying.paragraphs.join(" ")).toMatch(/₪8.*90 minutes/);
    expect(paying.subsections?.map(sub => sub.id)).toEqual(["ta-ravkav", "ta-bank-card"]);
    expect(paying.subsections?.find(sub => sub.id === "ta-bank-card")?.paragraphs.join(" ")).toMatch(/₪8.*90-minute transfer/);
    const red = guide.sections.find(section => section.id === "red-line")!;
    expect(red.paragraphs.join(" ")).toMatch(/R1.*R2.*R3/s);
    expect(red.paragraphs.join(" ")).toContain("partially operated service");
    expect(red.tables?.[0]?.rows).toHaveLength(8);
    const rail = guide.sections.find(section => section.id === "national-rail")!;
    expect(rail.tables?.[0]?.rows.map(row => row[0])).toEqual([
      "Tel Aviv HaHagana", "Tel Aviv HaShalom", "Tel Aviv Savidor Center", "Tel Aviv University",
    ]);
    expect(rail.tables?.[0]?.rows[2]?.[2]).toContain("Arlozorov");
    expect(guide.sections.find(section => section.id === "taxis")?.inlineLinks?.map(link => link.to)).toEqual([
      travelGuidePaths.uber, travelGuidePaths.taxiFares, travelGuidePaths.sherut,
    ]);
    expect(guide.sections.find(section => section.id === "bikes")?.paragraphs.join(" ")).toMatch(/at least 16.*qualification requirements.*(?:rental car|renting a car for trips outside the city)/s);
    const shabbat = guide.sections.find(section => section.id === "shabbat")!;
    expect(shabbat.paragraphs.join(" ")).toMatch(/Friday 16:30–02:00.*Saturday 09:00–17:30/s);
    expect(shabbat.paragraphs.join(" ")).toContain("Terminal 1");
    expect(shabbat.inlineLinks).toContainEqual({ text: "Ben Gurion Airport on Shabbat guide", to: travelGuidePaths.shabbat });
    expect(guide.faqs).toHaveLength(8);
    expect(guide.faqGroups).toBeUndefined();
    expect(guide.checklist).toHaveLength(6);
    expect(guide.related).toHaveLength(6);
    expect(guide.services.map(service => service.to)).toEqual([
      "/travel-blog/ben-gurion-airport-to-tel-aviv/", "/private-driver-in-israel/",
      "/travel-blog/attractions-in-tel-aviv/", "/attractions/jaffa/",
      travelGuidePaths.telAvivBeaches, "/travel-blog/where-to-stay-in-tel-aviv/",
    ]);
    expect(guide.services.every(service => Boolean(service.note))).toBe(true);
    expect(getSource("guide-dan-bank-card-2026").url).toContain("dan.co.il");
    expect(getSource("guide-telaviv-weekend-hours").url).toBe("https://busofash.co.il/");
  });

  it("renders updated Tel Aviv navigation, local image, real tables, eight FAQs and six illustrated and icon links", async () => {
    const router = await routerAt(travelGuidePaths.telAviv);
    const Page = TelAvivRoute.options.component!;
    const { container } = render(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
    const guide = travelGuides.telAviv;
    expect(container.querySelector('header figure img')?.getAttribute("src")).toBe(guide.photo.src);
    expect(container.querySelector('section[aria-label="Transport planning essentials"]')?.children).toHaveLength(3);
    const official = container.querySelector<HTMLAnchorElement>('section[aria-label="Transport planning essentials"] a')!;
    expect(official).not.toBeNull();
    expect(official).toHaveAttribute("href", "https://busofash.co.il/");
    expect(official).toHaveAttribute("target", "_blank");
    expect(container.querySelector('nav[aria-label="Quick transport topics"]')).toBeNull();
    expect(container.textContent).not.toContain("Swipe horizontally");
    const nav = container.querySelector('nav[aria-label="On this page"]')!;
    expect(nav).not.toBeNull();
    for (const section of guide.sections) {
      expect(nav.querySelector(`a[href="#${section.id}"]`)).not.toBeNull();
      expect(container.querySelector(`#${section.id}`)).not.toBeNull();
    }
    expect(nav.querySelector('a[href="#contact"]')).not.toBeNull();
    const overview = within(container).getByRole("table", { name: guide.comparison.caption });
    expect(overview.querySelectorAll("tbody th a")).toHaveLength(9);
    for (const anchor of overview.querySelectorAll<HTMLAnchorElement>('tbody th a[href^="#"]')) {
      expect(container.querySelector(anchor.getAttribute("href")!)).not.toBeNull();
    }
    const stations = container.querySelector('[aria-label="Useful Red Line stations for visitors"]')!;
    expect(stations.querySelectorAll("tbody tr")).toHaveLength(8);
    const rail = container.querySelector('[aria-label="Tel Aviv railway stations, south to north"]')!;
    expect(rail.querySelectorAll("tbody tr")).toHaveLength(4);
    const payment = container.querySelector('[aria-label="Paying for buses and the Red Line"]')!;
    expect(payment.querySelectorAll("tbody th.sticky")).toHaveLength(3);
    expect(container.querySelectorAll('[role="region"] table th.sticky').length).toBeGreaterThanOrEqual(4);
    const faq = container.querySelector("#faq")!;
    expect(faq.querySelectorAll("details")).toHaveLength(8);
    const related = within(container).getByRole("region", { name: "Related practical guides" });
    expect(related.querySelectorAll(":scope > ul > li")).toHaveLength(6);
    expect(repeatedPhotos([...related.querySelectorAll("li img")].map(image => image.getAttribute("src") || ""))).toEqual([]);
    const next = within(container).getByRole("region", { name: "Plan the next part of your trip" });
    expect(next.querySelectorAll(":scope > ul > li")).toHaveLength(6);
    expect(next.querySelectorAll("li svg")).toHaveLength(6);
    const form = container.querySelector('form[aria-label="Guide contact message"]')!;
    expect(form).not.toBeNull();
    expect(within(container).getByRole("heading", { name: "Need a Private Transfer or Driver in Tel Aviv?" })).toBeInTheDocument();
    expect(container.querySelector('[data-testid="contact-reviews-row"]')?.className).toContain("flex-nowrap");
    expect(related.compareDocumentPosition(next) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(next.compareDocumentPosition(form) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(container.querySelector("article")?.lastElementChild?.id).toBe("sources");
    expect(container.querySelector('#sources details:not([open])')).not.toBeNull();
    expect(container.textContent).not.toContain("References:");
  });

  it("keeps Getting Around Israel concise and up to date without changing its hero image", () => {
    const guide = travelGuides.israel;
    expect(guide.updatedAt).toBe("2026-11-24");
    expect(guide.title).toMatch(/^Getting Around Israel: Trains, Buses, Taxis/);
    expect(guide.photo.src).toBe("/images/travel-blog/featured-getting-around-israel.webp");
    expect(guide.photo.alt).toBe("Traffic on a busy Israeli highway in the Tel Aviv area");
    expect(guide.sections.map(section => section.id)).toEqual([
      "public-transport", "paying", "taxis-and-sherut", "destinations",
      "rental-car", "weekends", "planning",
    ]);
    expect(guide.comparison.headers).toEqual([
      "Transport", "Best for", "Fare basis", "Shabbat service", "Useful detail",
    ]);
    expect(guide.comparison.rows).toHaveLength(7);
    expect(guide.comparison.rows.every(row => row.length === 5)).toBe(true);
    expect(guide.facts).toHaveLength(3);
    expect(guide.facts.find(fact => fact.label === "Local fares")?.text).toContain("₪8");
    const transport = guide.sections.find(section => section.id === "public-transport")!;
    const rail = transport.subsections!.find(sub => sub.id === "israel-trains")!;
    expect(rail.paragraphs.join(" ")).toMatch(/free personal travel voucher.*72 hours/s);
    expect(rail.steps).toBeUndefined();
    expect(rail.highlightedLinks?.some(link => link.href.includes("vouchers-jerusalem"))).toBe(true);
    const lightRail = transport.subsections!.find(sub => sub.id === "israel-light-rail")!;
    expect(lightRail.paragraphs.join(" ")).toMatch(/Green Line L3.*November.*Damascus Gate/s);
    expect(lightRail.sourceIds).toContain("jerusalem-light-rail-updates");
    const payment = guide.sections.find(section => section.id === "paying")!;
    expect(payment.subsections?.map(sub => sub.id)).toEqual(["israel-ravkav", "israel-ticket-rules"]);
    expect(payment.tables?.[0]?.rows).toHaveLength(3);
    expect(payment.paragraphs.join(" ")).toMatch(/₪8.*90-minute/s);
    expect(payment.subsections!.find(sub => sub.id === "israel-ticket-rules")!.paragraphs.join(" ")).toMatch(/international Visa and Mastercard.*Eilat, Jerusalem and metropolitan Haifa/s);
    expect(guide.sections.find(section => section.id === "destinations")?.subsections?.map(sub => sub.id)).toEqual([
      "israel-tel-aviv", "israel-jerusalem", "israel-haifa", "israel-galilee", "israel-eilat",
    ]);
    expect(guide.sections.find(section => section.id === "rental-car")?.subsections?.find(sub => sub.id === "israel-rentals")?.paragraphs.join(" ")).toContain("Area A");
    expect(guide.sections.find(section => section.id === "weekends")?.inlineLinks).toContainEqual({
      text: "Israel's Calendar of Events", to: "/travel-blog/calendar-of-events/",
    });
    const popular = guide.sections.find(section => section.id === "planning")!.subsections!.find(sub => sub.id === "israel-popular-journeys")!;
    expect(popular.tables?.[0]?.rowLinks).toHaveLength(4);
    expect(guide.faqs).toHaveLength(8);
    expect(guide.faqGroups).toBeUndefined();
    expect(guide.checklist).toHaveLength(7);
    expect(guide.related).toHaveLength(6);
    expect(guide.services.map(x => x.to)).toEqual([
      "/airport-transfers/", "/private-driver-in-israel/", "/car-rental/",
      "/travel-blog/ben-gurion-airport-to-jerusalem/",
      "/travel-blog/ben-gurion-airport-to-haifa/", travelGuidePaths.esim,
    ]);
    expect(guide.sourceIds).toEqual(expect.arrayContaining([
      "guide-ravkav-2026", "guide-rental-territory", "guide-egged-accessibility",
      "guide-jerusalem-train-voucher", "guide-weekend-network", "jerusalem-light-rail-updates",
    ]));
    for (const section of guide.sections.flatMap(section => [section, ...(section.subsections ?? [])])) {
      for (const link of section.inlineLinks ?? []) {
        expect(section.paragraphs.join(" ").split(link.text), section.id + "/" + link.text).toHaveLength(2);
      }
    }
  });

  it("keeps the national and Tel Aviv transport guides practical without duplicating specialist content", () => {
    const national = travelGuides.israel, telAviv = travelGuides.telAviv;
    expect(national.intro).toContain("practical advice on fares");
    expect(national.sections.find(section => section.id === "paying")?.subsections?.find(sub => sub.id === "israel-ticket-rules")?.paragraphs.join(" ")).toContain("contactless");
    expect(national.sections.find(section => section.id === "planning")?.subsections?.find(sub => sub.id === "israel-accessibility")?.paragraphs.join(" ")).toContain("Station lifts");
    expect(telAviv.sections.find(section => section.id === "red-line")?.subsections?.find(sub => sub.id === "ta-redline-validation")?.paragraphs.join(" ")).toContain("before boarding");
    expect(telAviv.sections.find(section => section.id === "bikes")?.paragraphs.join(" ")).toContain("passengers");
    expect(telAviv.sections.find(section => section.id === "shabbat")?.paragraphs.join(" ")).toContain("Terminal 1");
    expect(telAviv.sections.find(section => section.id === "taxis")?.paragraphs.join(" ")).not.toContain("should not be presented");
    expect(telAviv.sections.find(section => section.id === "national-rail")?.paragraphs.join(" ")).not.toContain("planned for November 2026");
  });

  it("renders national transport tables, icon links, contact form, and sources without repetitive instructions", async () => {
    const router = await routerAt(travelGuidePaths.israel);
    const Page = IsraelRoute.options.component!;
    const { container } = render(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
    const guide = travelGuides.israel;
    expect(container.querySelector('section[aria-label="Transport planning essentials"]')?.children).toHaveLength(3);
    expect(container.querySelector('header figure img')?.getAttribute("src")).toBe(guide.photo.src);
    expect(container.querySelector('nav[aria-label="Quick transport topics"]')).toBeNull();
    expect(container.querySelector('a[href="#paying"]')).not.toBeNull();
    expect(container.textContent).not.toContain("Swipe horizontally");
    expect(container.querySelector('#israel-trains [aria-label="Step-by-step instructions"]')).toBeNull();
    expect(container.querySelector('#israel-trains a[href*="vouchers-jerusalem"]')).not.toBeNull();
    const main = within(container).getByRole("table", { name: guide.comparison.caption });
    expect(within(main).getAllByRole("columnheader")).toHaveLength(5);
    expect(within(main).getAllByRole("row")).toHaveLength(8);
    expect(main.querySelectorAll('tbody th.sticky')).toHaveLength(7);
    const destinations = container.querySelector('[aria-label="Four common journeys in Israel"]')!;
    expect(destinations.querySelectorAll('tbody th a')).toHaveLength(4);
    const payment = container.querySelector('[aria-label="Rav-Kav, ticketing apps and contactless cards"]')!;
    expect(payment.querySelector('tbody th.sticky')).not.toBeNull();
    for (const section of guide.sections) {
      const el = container.querySelector(`#${section.id}`)!;
      expect(el).not.toBeNull();
      for (const sub of section.subsections ?? []) {
        const child = el.querySelector(`#${sub.id}`)!;
        expect(child).not.toBeNull();
        if (sub.photo) expect(child.querySelector("figure img")?.getAttribute("src")).toBe(sub.photo.src);
        for (const link of sub.inlineLinks ?? []) {
          expect(within(child as HTMLElement).getByRole("link", { name: link.text })).toHaveAttribute("href", link.to);
        }
      }
    }
    expect(container.querySelector('#faq')?.querySelectorAll('details')).toHaveLength(8);
    const related = within(container).getByRole("region", { name: "Related practical guides" });
    expect(related.querySelectorAll(":scope > ul > li")).toHaveLength(6);
    const next = within(container).getByRole("region", { name: "Plan the next part of your trip" });
    expect(next.querySelectorAll(":scope > ul > li")).toHaveLength(6);
    expect(next.querySelectorAll("li svg")).toHaveLength(6);
    const form = container.querySelector('form[aria-label="Guide contact message"]')!;
    expect(form).not.toBeNull();
    expect(within(container).getByRole("heading", { name: "Need a Private Transfer or Driver in Israel?" })).toBeInTheDocument();
    expect(container.querySelector('[data-testid="contact-reviews-row"]')?.className).toContain("flex-nowrap");
    expect(related.compareDocumentPosition(next) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(next.compareDocumentPosition(form) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(container.querySelector("article")?.lastElementChild?.id).toBe("sources");
    expect(container.querySelector('#sources details:not([open])')).not.toBeNull();
    expect(container.querySelector('#sources a[href="https://www.hertz.co.il/en/GoodToKnow/IsraelContract/"]')).not.toBeNull();
    expect(container.textContent).not.toContain("References:");
  });

  it("keeps Uber's current status with concise, helpful alternatives", () => {
    const guide = travelGuides.uber;
    expect(guide.title).toMatch(/Uber.*Israel.*Gett.*Yango/);
    expect(guide.title).not.toMatch(/2026|2027/);
    expect(guide.updatedAt).toBe("2026-11-24");
    expect(guide.intro).toMatch(/^Uber and Lyft do not currently offer passenger rides in Israel/);
    expect(guide.answer).toMatch(/^For app-based taxi booking, try Gett or Yango/);
    expect(guide.sourceIds).toContain("guide-uber-availability");
    expect(getSource("guide-uber-availability").url).toBe("https://www.uber.com/il/en/");
    expect(guide.sections.map((section) => section.id)).toEqual([
      "uber-status", "taxi-apps", "fares-options", "airport", "shabbat", "practical-tips",
    ]);
    expect(guide.sections.filter((section) => section.photo)).toHaveLength(1);
    expect(guide.sections.find((s) => s.id === "taxi-apps")!.photo).toBeUndefined();
    expect(guide.comparison.headers).toEqual(["Service", "How it works", "Pricing", "Best for"]);
    expect(guide.comparison.rows.map((row) => row[0])).toEqual([
      "Gett", "Yango", "Licensed taxi or hotel dispatcher", "Pre-booked private transfer",
    ]);
    expect(guide.comparison.rows.every(row => row.length === 4)).toBe(true);
    expect(guide.faqs).toHaveLength(4);
    expect(guide.faqs.some(faq => faq.q.includes("foreign credit card"))).toBe(true);
    expect(guide.faqs.some(faq => faq.q.includes("accessible vehicle"))).toBe(true);
    expect(guide.sections.find((s) => s.id === "fares-options")!.inlineLinks?.some(link => link.to === travelGuidePaths.taxiFares)).toBe(true);
    expect(guide.sections.find((s) => s.id === "airport")!.inlineLinks?.some(link => link.to === travelGuidePaths.airportTaxis)).toBe(true);
    expect(guide.sections.find((s) => s.id === "shabbat")!.inlineLinks?.some(link => link.to === travelGuidePaths.shabbat)).toBe(true);
    expect(guide.sections.find(s => s.id === "airport")!.paragraphs.join(" ")).toMatch(/Exit 03.*Exit 23/);
    for (const section of guide.sections) for (const link of section.inlineLinks || []) {
      expect(section.paragraphs.join(" ").split(link.text), "Each internal link phrase should occur once").toHaveLength(2);
    }
    expect(guide.sections.find((s) => s.id === "uber-status")!.paragraphs.join(" ")).toContain("24 March 2026");
    expect(guide.sourceIds).toEqual(expect.arrayContaining(["guide-lyft-cities", "guide-ridesharing-bill-2026"]));
    expect(getSource("guide-lyft-cities").url).toBe("https://www.lyft.com/rider/cities");
    expect(getSource("guide-ridesharing-bill-2026").url).toContain("main.knesset.gov.il");
    expect(guide.services.map(service => service.to)).toEqual([
      "/airport-transfers/", "/private-driver-in-israel/", travelGuidePaths.taxis,
      travelGuidePaths.taxiFares, travelGuidePaths.israel, travelGuidePaths.esim,
    ]);
    expect(guide.services.every(service => Boolean(service.note))).toBe(true);
    const stores = guide.sections.find(s => s.id === "taxi-apps")!.externalLinks?.map(link => link.href) ?? [];
    expect(stores).toEqual([
      "https://apps.apple.com/il/app/id412802326",
      "https://play.google.com/store/apps/details?id=com.gettaxi.android",
      "https://apps.apple.com/il/app/id1437157286",
      "https://play.google.com/store/apps/details?id=com.yandex.yango",
    ]);
    expect(travelGuides.taxis.sections.find((s) => s.id === "apps")!.paragraphs.join(" ")).toContain("Uber passenger rides are not currently available in Israel.");
  });

  it("keeps updated Uber and Sherut wording focused, linked and actionable", () => {
    const uber = travelGuides.uber;
    const sherut = travelGuides.sherut;
    expect(uber.intro).toContain("Uber and Lyft do not currently offer");
    expect(uber.sections.find(section => section.id === "shabbat")?.paragraphs.join(" ")).not.toContain("no need to repeat");
    expect(uber.checklist.some(item => item.includes("Install and verify a taxi app"))).toBe(true);
    expect(uber.faqs.some(faq => faq.q === "Can I pay with a foreign credit card?")).toBe(true);
    expect(uber.faqs.find(faq => faq.q.includes("foreign credit card"))?.a).toContain("foreign-issued card");
    expect(sherut.intro).toContain("Nesher and Amal shared taxis");
    expect(sherut.sections.find(section => section.id === "official-taxi")?.paragraphs.join(" ")).not.toContain("without repeating those details here");
    const destinations = sherut.sections.find(section => section.id === "airport-alternatives")!;
    expect(destinations.inlineLinks?.map(link => link.to)).toEqual([
      "/travel-blog/ben-gurion-airport-to-jerusalem/",
      "/travel-blog/ben-gurion-airport-to-tel-aviv/",
      "/travel-blog/ben-gurion-airport-to-haifa/",
      "/travel-blog/ben-gurion-airport-to-ein-bokek/",
      travelGuidePaths.shabbat,
    ]);
    expect(destinations.tables?.[0]?.rows.find(row => row[0] === "Dead Sea / Ein Bokek")?.[1]).toContain("Bus connection via Jerusalem");
    expect(sherut.faqs).toHaveLength(5);
    for (const guide of [uber, sherut]) {
      for (const section of guide.sections) for (const link of section.inlineLinks ?? []) {
        expect(section.paragraphs.join(" ").split(link.text), guide.id + " / " + section.id + " / " + link.text).toHaveLength(2);
      }
    }
  });

  it("renders the focused Uber guide, official apps, airport instructions and six icon links", async () => {
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
    expect(container.querySelector("#uber-status")?.textContent).toContain("Uber and Lyft currently have no passenger ride-booking service");
    const next = within(container).getByRole("region", { name: "Plan the next part of your trip" });
    expect(next.querySelectorAll("li")).toHaveLength(6);
    expect(Array.from(next.querySelectorAll("a")).map(link => link.getAttribute("href"))).toContain("/airport-transfers/");
    expect(next.querySelectorAll("li svg")).toHaveLength(6);
    expect(container.querySelector('#taxi-apps a[href="https://apps.apple.com/il/app/id412802326"]')).not.toBeNull();
    expect(container.querySelector('#taxi-apps a[href="https://play.google.com/store/apps/details?id=com.yandex.yango"]')).not.toBeNull();
    expect(container.querySelector("#airport")?.textContent).toMatch(/Exit 03.*Exit 23/);
    expect(container.querySelector("#sources")).not.toBeNull();
    expect(container.textContent).not.toContain("References:");
    const contactForm = container.querySelector('form[aria-label="Guide contact message"]');
    expect(contactForm).not.toBeNull();
    expect(contactForm!.compareDocumentPosition(container.querySelector("#sources")!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("keeps the Sherut guide focused on current transport and practical shared taxis", () => {
    const guide = travelGuides.sherut;
    expect(guide.title).toMatch(/sherut.*Ben Gurion Airport/i);
    expect(guide.title).not.toMatch(/2026|2027/);
    expect(guide.updatedAt).toBe("2026-11-24");
    expect(guide.answer).toContain("Regular Nesher sherut rides to Jerusalem and Amal shared taxis to Haifa no longer operate");
    expect(guide.answer).toContain("Local sherut minibuses still operate");
    expect(guide.sections.map(section => section.id)).toEqual([
      "nesher-amal", "local-sherut", "airport-alternatives", "official-taxi", "weekend", "booked-shared",
    ]);
    expect(guide.photo.src).toContain("sherut-nesher-airport.webp");
    expect(guide.sections.filter(section => section.photo)).toHaveLength(1);
    const localPhoto = guide.sections.find(section => section.id === "local-sherut")!.photo!;
    expect(localPhoto.src).toContain("sherut-local-taxis");
    expect(localPhoto.src).not.toBe(guide.photo.src);
    expect(localPhoto.sourceUrl).toBe("https://commons.wikimedia.org/wiki/File:Sherut.JPG");
    expect(localPhoto.credit).toContain("public domain");
    expect(localPhoto.src).not.toMatch(/^https?:/);
    expect(guide.sections.find(section => section.id === "nesher-amal")!.photo).toBeUndefined();
    expect(guide.comparison.rows).toHaveLength(4);
    expect(guide.comparison.headers).toEqual(["Ride type", "How it works", "When it is useful"]);
    expect(guide.comparison.rows.every(row => row.length === 3)).toBe(true);
    const destinations = guide.sections.find(section => section.id === "airport-alternatives")!;
    expect(destinations.tables?.[0]?.rows).toHaveLength(4);
    expect(destinations.tables?.[0]?.rows.map(row => row[0])).toEqual([
      "Jerusalem", "Tel Aviv", "Haifa", "Dead Sea / Ein Bokek",
    ]);
    expect(destinations.tables?.[0]?.rowLinks?.map(link => link && "to" in link ? link.to : null)).toEqual([
      "/travel-blog/ben-gurion-airport-to-jerusalem/",
      "/travel-blog/ben-gurion-airport-to-tel-aviv/",
      "/travel-blog/ben-gurion-airport-to-haifa/",
      "/travel-blog/ben-gurion-airport-to-ein-bokek/",
    ]);
    expect(destinations.inlineLinks?.map(link => link.to)).toEqual([
      "/travel-blog/ben-gurion-airport-to-jerusalem/",
      "/travel-blog/ben-gurion-airport-to-tel-aviv/",
      "/travel-blog/ben-gurion-airport-to-haifa/",
      "/travel-blog/ben-gurion-airport-to-ein-bokek/",
      travelGuidePaths.shabbat,
    ]);
    expect(guide.sections.find(s => s.id === "official-taxi")!.paragraphs.join(" ")).toMatch(/Exit 03.*Gate 23.*Gate 01/s);
    expect(guide.sections.find(s => s.id === "official-taxi")!.inlineLinks?.map(link => link.to)).toEqual([
      travelGuidePaths.airportTaxis, travelGuidePaths.taxiFares, travelGuidePaths.arrival,
    ]);
    expect(guide.sections.find(s => s.id === "weekend")!.paragraphs.join(" ")).toMatch(/Line 711.*Terminal 1.*winter and summer/s);
    expect(guide.sections.find(s => s.id === "weekend")!.inlineLinks?.some(link => link.to === travelGuidePaths.shabbat)).toBe(true);
    expect(guide.sections.find(s => s.id === "local-sherut")!.paragraphs.join(" ")).toMatch(/Each passenger pays an individual fare.*fare.*suitcases/s);
    expect(guide.sections.find(s => s.id === "local-sherut")!.inlineLinks?.map(link => link.to)).toEqual([
      travelGuidePaths.israel, travelGuidePaths.telAviv,
    ]);
    expect(guide.faqs).toHaveLength(5);
    expect(guide.services.map(item => item.to)).toEqual([
      "/airport-transfers/", "/private-driver-in-israel/",
      "/travel-blog/ben-gurion-airport-to-jerusalem/",
      "/travel-blog/ben-gurion-airport-to-tel-aviv/",
      "/travel-blog/ben-gurion-airport-to-haifa/", travelGuidePaths.esim,
    ]);
    expect(guide.services.every(item => Boolean(item.note))).toBe(true);
    expect(guide.sourceIds).toContain("guide-sherut-regulation");
    expect(getSource("guide-sherut-regulation").url).toContain("gov.il");
    for (const section of guide.sections) for (const link of section.inlineLinks || []) {
      expect(section.paragraphs.join(" ").split(link.text), `link text ${link.text} must occur once`).toHaveLength(2);
    }
    expect(guide.related).toContain("shabbat");
    expect(guide.related).toContain("airportTaxis");
  });

  it("renders Sherut tables, six planning cards, concise sources and the private pickup contact form", async () => {
    const router = await routerAt(travelGuidePaths.sherut);
    const Page = SherutRoute.options.component!;
    const { container } = render(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
    for (const section of travelGuides.sherut.sections) {
      const element = container.querySelector(`#${section.id}`)! as HTMLElement;
      for (const link of section.inlineLinks || []) {
        const proseLinks = within(element).getAllByRole("link", { name: link.text }).filter((a) => a.closest("p"));
        expect(proseLinks).toHaveLength(1);
        expect(proseLinks[0]).toHaveAttribute("href", link.to);
      }
    }
    const alternativeSection = container.querySelector("#airport-alternatives") as HTMLElement;
    const contactLink = within(alternativeSection).getByRole("link", { name: /ask me about a private airport pickup/i });
    expect(contactLink).toHaveAttribute("href", "#contact");
    expect(alternativeSection.querySelector("form")).toBeNull();
    const destinationTable = within(alternativeSection).getByRole("table", { name: "Ben Gurion Airport transport by destination" });
    expect(destinationTable.querySelectorAll("tbody tr")).toHaveLength(4);
    expect(destinationTable.querySelectorAll("tbody th a")).toHaveLength(4);
    const mainTable = within(container).getByRole("table", { name: "Sherut, shuttle, taxi or private transfer?" });
    expect(mainTable.querySelectorAll("tbody tr")).toHaveLength(4);
    const localSection = container.querySelector("#local-sherut")!;
    expect(localSection.querySelector("figure img")?.getAttribute("src")).toContain("sherut-local-taxis");
    expect(localSection.querySelector("figure img")?.getAttribute("src")).not.toMatch(/^https?:/);
    expect(container.querySelector('[aria-label="Photo credits and licences"] a[href="https://commons.wikimedia.org/wiki/File:Sherut.JPG"]')).not.toBeNull();
    const related = within(container).getByRole("region", { name: "Related practical guides" });
    const next = within(container).getByRole("region", { name: "Plan the next part of your trip" });
    const contact = within(container).getByRole("form", { name: "Guide contact message" });
    expect(related.querySelectorAll("li")).toHaveLength(6);
    expect(next.querySelectorAll("li")).toHaveLength(6);
    expect(next.querySelectorAll("li svg")).toHaveLength(6);
    expect(container.querySelectorAll('form[aria-label="Guide contact message"]')).toHaveLength(1);
    expect(within(container).getByRole("heading", { name: "Need a Private Airport Transfer?" })).toBeInTheDocument();
    expect((within(contact).getByRole("textbox", { name: /Subject/ }) as HTMLInputElement).value).toBe("");
    expect(related.compareDocumentPosition(next) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(next.compareDocumentPosition(contact) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    const sources = container.querySelector("#sources")!;
    expect(sources).not.toBeNull();
    expect(contact.compareDocumentPosition(sources) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(container.textContent).not.toContain("References:");
    const reviewsRow = container.querySelector('[data-testid="contact-reviews-row"]')!;
    expect(reviewsRow.className).toContain("flex-nowrap");
  });

  it("keeps the confirmed Terminal 1 weekend bus and winter/summer service distinction", () => {
    const guide = travelGuides.shabbat;
    expect(guide.answer).toMatch(/free weekend Line 711/i);
    expect(guide.answer).toContain("Terminal 1");
    expect(guide.sourceIds).toContain("guide-weekend-711");
    expect(getSource("guide-weekend-711").url).toContain("tel-aviv.gov.il");
    const bus = guide.sections.find((section) => section.id === "weekend-711")!;
    expect(bus.paragraphs.join(" ")).toMatch(/winter-time.*Friday 15:45–01:30.*Saturday 10:30–16:30.*daylight-saving-time schedules extend/s);
    expect(bus.paragraphs.join(" ")).toContain("Check the timetable for the exact departure times from Terminal 1.");
    expect(guide.faqs.find((faq) => faq.q === "When is the last Line 711 bus from the airport on Saturday?")?.a).toContain("The published operating hours cover the entire route.");
    expect(bus.tables?.[0]?.headers).toEqual(["Line 711 stop / area", "Useful for", "Next step"]);
    expect(bus.tables?.[0]?.rows).toHaveLength(5);
    expect(bus.sourceIds).toContain("guide-711-hours");
    expect(getSource("guide-711-hours").note).toContain("Saturday 10:30–16:30");
    expect(JSON.stringify(guide)).not.toMatch(/(?:Line|bus|route) 712/i);
  });

  it("covers Saturday arrivals, terminal transfers, higher taxi tariffs and useful supporting images", () => {
    const guide = travelGuides.shabbat;
    expect(guide.sections.map((section) => section.id)).toEqual([
      "shabbat-hours", "arrival-time", "weekend-711", "terminal-transfer",
      "taxis-transfers", "costs", "rental-car", "destinations", "restart", "practical",
    ]);
    expect(guide.updatedAt).toBe("2026-11-24");
    expect(guide.photo.src).toBe("/images/travel-blog/featured-shabbat-airport.webp");
    expect(guide.sections.filter((section) => section.photo)).toHaveLength(2);
    expect(guide.sections.find((section) => section.id === "taxis-transfers")!.photo?.src).toContain("airport-taxi-sign.webp");
    expect(guide.sections.find((section) => section.id === "restart")!.photo?.src).toMatch(/ben-gurion-rail-platform/);
    expect(guide.faqs).toHaveLength(6);
    const windows = guide.sections.find((section) => section.id === "arrival-time")!.tables![0]!;
    expect(windows.headers).toEqual(["Arrival window", "Available transport options", "Practical first step"]);
    expect(windows.rows).toHaveLength(4);
    const transfers = guide.sections.find((section) => section.id === "terminal-transfer")!;
    expect(transfers.paragraphs.join(" ")).toMatch(/15-minute frequency.*Line 711 stop/s);
    const taxis = guide.sections.find((section) => section.id === "taxis-transfers")!;
    expect(taxis.paragraphs.join(" ")).toMatch(/24 hours a day.*Exit 03.*Exit 23/s);
    expect(taxis.paragraphs.join(" ")).toMatch(/without the Gett app/);
    expect(taxis.inlineLinks?.map((link) => link.to)).toEqual([
      travelGuidePaths.airportTaxis, "/airport-transfers/",
    ]);
    const costs = guide.sections.find((section) => section.id === "costs")!;
    expect(costs.paragraphs.join(" ")).toMatch(/higher than the corresponding ordinary weekday daytime Tariff A/);
    expect(costs.paragraphs.join(" ")).toMatch(/Saturday daytime generally uses Tariff B.*Saturday evening\/night Tariff C/s);
    expect(costs.tables?.[0]?.headers).toEqual(["Destination", "Saturday daytime · B", "Saturday evening/night · C", "Typical drive"]);
    expect(costs.tables?.[0]?.rows).toHaveLength(3);
    for (const row of costs.tables![0]!.rows) {
      const b = Number(row[1]!.match(/₪(\d+)/)?.[1]);
      const c = Number(row[2]!.match(/₪(\d+)/)?.[1]);
      expect(c).toBeGreaterThan(b);
    }
    expect(costs.tables?.[0]?.note).toMatch(/Tariff B.*Tariff C.*18% VAT.*airport departure supplement/s);
    expect(costs.inlineLinks?.[0]?.to).toBe(travelGuidePaths.taxiFares);
    expect(guide.sections.find((section) => section.id === "destinations")!.tables?.[0]?.rows).toHaveLength(5);
    expect(guide.sections.find((section) => section.id === "shabbat-hours")!.paragraphs.join(" ")).toContain("Yom Kippur is a special exception");
    expect(guide.sections.find((section) => section.id === "restart")!.paragraphs.join(" ")).toMatch(/check when trains and buses to your destination resume/);
    expect(guide.services).toHaveLength(6);
    expect(guide.services.map(item => item.to)).toContain(travelGuidePaths.israel);
    expect(guide.services.map(item => item.to)).toContain(travelGuidePaths.travelTips);
    for (const section of guide.sections) for (const link of section.inlineLinks || []) {
      expect(section.paragraphs.some(p => p.includes(link.text))).toBe(true);
    }
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


  it("renders six illustrated related guides, six additional next steps and one personal contact form", async () => {
    const router = await routerAt(travelGuidePaths.shabbat);
    const Page = ShabbatRoute.options.component!;
    const { container } = render(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
    const related = within(container).getByRole("region", { name: "Related practical guides" });
    const next = within(container).getByRole("region", { name: "Plan the next part of your trip" });
    const contact = within(container).getByRole("form", { name: "Guide contact message" });
    expect(related.querySelector('[data-testid="stay-trip-photo-grid"]')?.querySelectorAll("li")).toHaveLength(6);
    expect(next.querySelectorAll("li")).toHaveLength(6);
    expect(next).toHaveAttribute("data-testid", "icon-trip-planning-links");
    expect(within(next).getAllByRole("link").every(link => link.querySelector("svg") !== null)).toBe(true);
    expect(within(next).getAllByRole("link").every(link => link.querySelectorAll("span").length >= 3)).toBe(true);
    expect(within(next).getByText("Rental options and Saturday pickup arrangements.")).toBeInTheDocument();
    const nextPaths = Array.from(next.querySelectorAll("a")).map(link => link.getAttribute("href"));
    expect(nextPaths).toEqual([
      "/car-rental/",
      "/travel-blog/where-to-stay-in-tel-aviv/",
      "/travel-blog/jerusalem-travel-guide/",
      "/travel-blog/dead-sea-attractions/",
      travelGuidePaths.israel,
      travelGuidePaths.travelTips,
    ]);
    expect(new Set(nextPaths).size).toBe(6);
    expect(container.querySelectorAll("#contact")).toHaveLength(1);
    expect(container.querySelector("#request-quote")).toBeNull();
    const taxiSection = container.querySelector("#taxis-transfers") as HTMLElement;
    const contactJump = within(taxiSection).getByRole("link", { name: /Send me your arrival details using the contact form below/i });
    expect(contactJump).toHaveAttribute("href", "#contact");
    expect(taxiSection.querySelector("form")).toBeNull();
    expect(container.querySelector('nav[aria-label="On this page"] a[href="#contact"]')).not.toBeNull();
    expect(within(container).getByRole("heading", { name: "Need a private airport transfer on Shabbat?" })).toBeInTheDocument();
    expect(within(container).getByText("Share your flight, destination, passengers and luggage. I'll reply personally about arranging your private airport pickup.")).toBeInTheDocument();
    expect(container.querySelector("#contact")?.textContent).not.toContain("Line 711");
    expect((within(contact).getByRole("textbox", { name: /Subject/ }) as HTMLInputElement).value).toBe("");
    const sources = container.querySelector("#sources")!;
    expect(sources).not.toBeNull();
    expect(related.compareDocumentPosition(next) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(next.compareDocumentPosition(contact) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(contact.compareDocumentPosition(sources) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
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
    expect(container.querySelector("#taxis-transfers")?.textContent).toMatch(/official queue/is);
    expect(container.querySelector("#costs")?.textContent).toMatch(/regulated.*meter|meter.*tariff/is);
    for (const [label, url] of ([
      ["Look up Shabbat times on MyZmanim", "https://www.myzmanim.com/"],
      ["Israel Railways - official timetable", "https://rail.co.il/?lan=en"],
      ["National Public Transport Authority - route planner", "https://bus.gov.il/en/home"],
    ] as const)) {
      const link = within(container).getByRole("link", { name: new RegExp(label) });
      expect(link).toHaveAttribute("href", url);
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("keeps the Jerusalem to Dead Sea guide practical, internally linked and quote-driven without a published private price", async () => {
    const guide = travelGuides.jerusalemDeadSea;
    expect(guide.updatedAt).toBe("2026-11-24");
    expect(guide.title).toBe("How to Get from Jerusalem to the Dead Sea: Bus, Taxi, Tours & Car");
    expect(guide.comparison.headers).toEqual(["Transport", "Best for", "Journey time or fare", "Booking and planning"]);
    expect(guide.comparison.rows).toHaveLength(4);
    expect(guide.sections.map(section => section.id)).toEqual([
      "destinations", "bus", "private", "tours", "driving", "beach",
    ]);
    const destinations = guide.sections[0]!;
    expect(destinations.tables?.[0]?.rows).toHaveLength(5);
    expect(destinations.tables?.[0]?.rowLinks).toHaveLength(5);
    expect(destinations.tables?.[0]?.rows.map(row => row[0])).toEqual([
      "Kalia / northern shore", "Qumran", "Ein Gedi Nature Reserve", "Masada - east entrance", "Ein Bokek Central Beach",
    ]);
    const privateSection = guide.sections.find(section => section.id === "private")!;
    expect(privateSection.paragraphs.join(" ")).toMatch(/contact form.*personally with a quote/s);
    expect(JSON.stringify(privateSection)).not.toMatch(/2,100|2100|₪\s*2[,.]?100/);
    const bus = guide.sections.find(section => section.id === "bus")!;
    expect(bus.externalLinks?.some(link => link.href.includes("tickets-information"))).toBe(true);
    const driving = guide.sections.find(section => section.id === "driving")!;
    expect(driving.photo?.src).toContain("dead-sea-route-road");
    expect(driving.photo?.src).not.toBe(guide.photo.src);
    expect(guide.sections.find(section => section.id === "beach")!.paragraphs.join(" ")).toMatch(/chairs and umbrellas.*free.*hotel-operated/s);

    const router = await routerAt(travelGuidePaths.jerusalemDeadSea);
    const Page = DeadSeaRoute.options.component!;
    const { container } = render(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
    expect(container.querySelector('a[href="#destinations"]')).not.toBeNull();
    const main = within(container).getByRole("table", { name: guide.comparison.caption });
    expect(main.querySelectorAll("tbody th.sticky")).toHaveLength(4);
    const table = container.querySelector('[aria-label="Driving times from Jerusalem to Dead Sea destinations"]')!;
    expect(table.querySelectorAll("tbody th.sticky")).toHaveLength(5);
    expect(table.querySelectorAll("tbody th a")).toHaveLength(5);
    expect(table.querySelector('a[href="/attractions/masada/"]')).not.toBeNull();
    const stops = [...container.querySelectorAll('[data-testid="deadsea-attraction-card"]')];
    expect(stops).toHaveLength(4);
    for (const href of ["/attractions/masada/", "/attractions/ein-gedi/", "/attractions/qasr-el-yahud/"]) {
      expect(stops.some(a => a.getAttribute("href") === href)).toBe(true);
    }
    expect(stops.find(a => a.getAttribute("href")?.includes("qumran"))?.getAttribute("target")).toBe("_blank");
    expect(container.querySelectorAll('[data-testid="deadsea-bookable-tour"]')).toHaveLength(6);
    expect(container.querySelectorAll('[data-testid="deadsea-related-guides"] > li')).toHaveLength(6);
    const next = container.querySelector('[data-testid="deadsea-next-steps"]')!;
    expect(next.querySelectorAll("li")).toHaveLength(6);
    expect(next.querySelectorAll("li svg")).toHaveLength(6);
    expect(next.querySelectorAll('a[href^="/"]')).toHaveLength(6);
    expect(next.textContent).not.toContain("Explore Israel's events");
    expect(container.textContent).not.toContain("₪2,100");
    const contact = container.querySelector('form[aria-label="Guide contact message"]')!;
    expect(contact).not.toBeNull();
    expect(screen.getByRole("heading", { name: "Need a Private Transfer or Driver to the Dead Sea?" })).toBeInTheDocument();
    expect(container.querySelector('[data-testid="contact-reviews-row"]')?.className).toContain("flex-nowrap");
    expect(container.querySelector('header time')).toHaveAttribute("datetime", "2026-11-24");
    const source = container.querySelector("#sources")!;
    expect(source).not.toBeNull();
    expect(contact.compareDocumentPosition(source) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(container.textContent).not.toContain("References:");
  });

  it("distinguishes baptism sites, church clusters and region-specific Dead Sea planning without blanket operating claims", () => {
    expect(travelGuides.baptism.answer).toMatch(/Yardenit.*Sea of Galilee.*Qasr el-Yahud.*near Jericho/s);
    expect(travelGuides.baptism.reviewNote).toMatch(/different hour sets|differing hour|different hours/i);
    expect(travelGuides.baptism.sections.find((section) => section.id === "qasr-visit")!.photo?.alt).toContain("Qasr el-Yahud");
    expect(travelGuides.jerusalemChurches.comparison.rows.map((row) => row[0])).toEqual(["Old City", "Mount of Olives / Kidron", "Mount Zion", "Ein Karem"]);
    expect(travelGuides.jerusalemDeadSea.sections.find(section => section.id === "beach")!.paragraphs.join(" ")).toMatch(/free public entry.*showers.*changing rooms|public entry, showers, changing rooms/);
    expect(travelGuides.jerusalemShopping.sections.find((section) => section.id === "shop-bezalel")!.paragraphs.join(" ")).toContain("Friday arts fair");
    expect(JSON.stringify(travelGuides.jerusalemChurches)).not.toMatch(/10-20 ILS|50-80 ILS|open daily.*8:00/i);
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

  it("renders four recommendations, real responsive comparisons and all five tracked providers", async () => {
    const expected = { "esim-airalo": "https://airalo.tpm.li/JmHFDV3v", "esim-saily": "https://saily.tpm.li/nM5mNYzP", "esim-yesim": "https://yesim.tpm.li/6WmqBIJV", "esim-gigsky": "https://gigsky.tpm.li/1lvxdeMq", "esim-drimsim":"https://drimsim.tpm.li/khIJTNaX" };
    const router = await routerAt(travelGuidePaths.esim);
    const Page = EsimRoute.options.component!;
    const { container } = render(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
    const cards = [...screen.getByRole("region",{name:"Choose your eSIM by trip type"}).querySelectorAll("article")];
    expect(cards).toHaveLength(4);
    const ids = ["esim-saily","esim-saily","esim-airalo","esim-gigsky"] as const;
    cards.forEach((card,i)=>{const link=within(card as HTMLElement).getByRole("link");expect(link).toHaveAttribute("href",expected[ids[i]!]);expect(link).toHaveAttribute("rel","sponsored noopener noreferrer");});
    const fixed = screen.getByRole("table",{name:"Prepaid eSIM data plans"});
    for (const price of ["$4.99","$10.79","$16.79","$20.99","$29.19"]) expect(fixed).toHaveTextContent(price);
    expect(fixed.querySelector("del")).toHaveTextContent("$20.99");
    const unlimited=screen.getByRole("table",{name:"Unlimited eSIM plans by duration"});
    for(const label of ["7 days","15 days","30 days","€21.70","€35.00","€55.00","$69.00","$18.79","$33.99","$49.99","$26.99","$48.99","$71.99"]) expect(unlimited).toHaveTextContent(label);
    expect(screen.getByRole("table",{name:"eSIM provider features"})).toBeInTheDocument();
    expect(screen.getByRole("table",{name:"Drimsim pay-as-you-go data costs"})).toHaveTextContent("€50.00");
    for(const table of [fixed,unlimited,screen.getByRole("table",{name:"eSIM provider features"})]) expect(table.parentElement).toHaveClass("overflow-x-auto");
    for(const id of Object.keys(expected) as Array<keyof typeof expected>){
      expect(affiliateConfig[id]!.trackingUrl).toBe(expected[id]);
      expect(container.querySelector('a[href="'+expected[id]+'"][rel="sponsored noopener noreferrer"]')).not.toBeNull();
    }
    const first = within(cards[0] as HTMLElement).getByRole("link");
    first.addEventListener("click",event=>event.preventDefault());
    fireEvent.click(first);
    expect(readOutboundClicks()).toEqual([expect.objectContaining({pageId:"guide-esim",productId:"esim-saily",offerId:"esim-saily"})]);
    expect(within(container.querySelector("#compatibility") as HTMLElement).getByRole("link",{name:/Check whether your phone supports eSIM/})).toHaveAttribute("href",AIRALO_COMPATIBILITY_AFFILIATE_URL);
    expect(within(container.querySelector("#regional") as HTMLElement).getByRole("link",{name:/View Airalo's Middle East/})).toHaveAttribute("href",AIRALO_MENA_AFFILIATE_URL);
    expect(within(container.querySelector("#coverage") as HTMLElement).getByRole("link",{name:/Jerusalem to Bethlehem/})).toBeInTheDocument();
    expect(container.querySelector('nav a[href="#contact"]')).toHaveTextContent("Contact me");
    expect(within(screen.getByTestId("icon-trip-planning-links")).getAllByRole("link")).toHaveLength(6);
    expect(container.querySelector('form[aria-label="Guide contact message"]')).not.toBeNull();
    expect(container.querySelector("article")?.lastElementChild).toBe(container.querySelector("#sources"));
    expect(container).toHaveTextContent("Providers may display prices in your local currency.");
    expect(container.textContent).not.toMatch(/price not verified|price index|previous price|dated reference prices/i);
    expect(container.textContent).not.toContain("References:");
  });
  it.each([
    { id: "taxis", route: TaxiRoute, count: 3 },
    { id: "uber", route: UberRoute, count: 1 },
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
      expect(container.querySelector("header p.text-lg")?.textContent).toMatch(/^The former Nesher and Amal shared taxis from Ben Gurion Airport have ended/);
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
