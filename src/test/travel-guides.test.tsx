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
import { guideDirectory, guideTopics, travelGuides } from "@/data/travelGuides";
import { affiliateConfig, getSource, linksForPage, travelGuidePaths, TRAVEL_GUIDE_CHECK_DATE } from "@/data/registry";
import { readOutboundClicks } from "@/lib/outbound";

afterEach(() => { cleanup(); localStorage.clear(); });
const cases = [{ id: "uber", route: UberRoute }, { id: "sherut", route: SherutRoute }, { id: "esim", route: EsimRoute }, { id: "arrival", route: ArrivalRoute }, { id: "israel", route: IsraelRoute }, { id: "telAviv", route: TelAvivRoute }, { id: "taxis", route: TaxiRoute }] as const;
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
    for (const sourceId of guide.sourceIds) expect(getSource(sourceId)?.url).toMatch(/^https:\/\//);
    expect(container.querySelector("time")).toHaveAttribute("datetime", TRAVEL_GUIDE_CHECK_DATE);
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
    expect(article).toMatchObject({ headline: guide.title, dateModified: TRAVEL_GUIDE_CHECK_DATE, inLanguage: "en", author: { "@type": "Organization", name: expect.stringContaining("editorial team") } });
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
    expect(guideDirectory).toHaveLength(17);
    expect(new Set(guideDirectory.map((guide) => guide.to)).size).toBe(17);
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
    expect(screen.getAllByTestId("guide-directory-card")).toHaveLength(17);
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "eSIM" } });
    expect(screen.getAllByTestId("guide-directory-card")).toHaveLength(1);
    fireEvent.submit(screen.getByRole("search"));
    await waitFor(() => expect(router.state.location.search).toMatchObject({ q: "eSIM" }));
    const topics = screen.getByRole("navigation", { name: "Filter guides by topic" });
    fireEvent.click(within(topics).getByRole("link", { name: "Attractions" }));
    await screen.findByRole("heading", { name: "No guides match this search" });
    fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    await waitFor(() => expect(screen.getAllByTestId("guide-directory-card")).toHaveLength(17));
    expect(screen.getByRole("searchbox")).toHaveValue("");
    await act(async () => { await router.navigate({ to: "/guides/", search: { topic: "attractions" } }); });
    expect(screen.getAllByTestId("guide-directory-card")).toHaveLength(3);
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
