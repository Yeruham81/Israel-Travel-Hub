import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { routeTree } from "@/routeTree.gen";
import { Route as AboutRoute } from "@/routes/about-moshe-barak";
import { tripadvisorProfileUrl, tripadvisorReviews } from "@/data/homeReviews";

afterEach(() => { cleanup(); vi.useRealTimers(); });

async function aboutRouter(path = "/about-moshe-barak/") {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, history: createMemoryHistory({ initialEntries: [path] }), trailingSlash: "always" });
  await router.load();
  return router;
}

function renderAbout(router: Awaited<ReturnType<typeof aboutRouter>>) {
  const About = AboutRoute.options.component!;
  return render(<RouterContextProvider router={router}><About /></RouterContextProvider>);
}

describe("one personal About Moshe Barak page", () => {
  it("combines the biography, selection disclosures and a personal contact form", async () => {
    const { container } = renderAbout(await aboutRouter());
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/^About Moshe Barak$/);
    expect(screen.getAllByRole("img", { name: "Moshe Barak" })).toHaveLength(1);
    expect(screen.getByRole("link", { name: /Contact me/ })).toHaveAttribute("href", "#contact");
    expect(screen.getByRole("heading", { name: "Send me a message" })).toBeInTheDocument();
    expect(screen.getByRole("form", { name: "Contact me" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Tell me how I can help…")).toBeInTheDocument();

    const methodology = screen.getByRole("region", { name: "How I put this website together" });
    expect(methodology).toHaveTextContent("Sponsored link");
    expect(methodology).toHaveTextContent("I currently don't display live prices or availability");
    expect(methodology).toHaveTextContent("I haven't personally stayed at every property");
    expect(methodology).toHaveTextContent("I don't attach your personal details or flight information");
    expect(container.querySelector('a[href^="/about/"]')).toBeNull();
    // Guest quotations and visitor form fields retain their own voice.
    const narrative = container.cloneNode(true) as HTMLElement;
    narrative.querySelectorAll("blockquote, form").forEach(element => element.remove());
    expect(narrative.textContent).not.toMatch(/\bwe\b|\bour\b|Moshe's|with Moshe|Send Moshe|Ask Moshe/i);
    const head = await AboutRoute.options.head?.({} as never);
    expect(head!.links).toContainEqual({ rel: "canonical", href: expect.stringMatching(/\/about-moshe-barak\/$/) });
  });

  it("uses the homepage carousel with six-second rotation and reader controls", async () => {
    const router = await aboutRouter();
    vi.useFakeTimers();
    renderAbout(router);
    const carousel = screen.getByRole("region", { name: "Tripadvisor traveler reviews" });
    const cards = within(carousel).getByTestId("tripadvisor-review-cards");
    expect(cards.querySelectorAll("article")).toHaveLength(3);
    expect(cards).toHaveTextContent(tripadvisorReviews[0]!.excerpt);
    act(() => vi.advanceTimersByTime(6000));
    expect(cards).toHaveTextContent(tripadvisorReviews[3]!.excerpt);
    expect(cards).not.toHaveTextContent(tripadvisorReviews[0]!.excerpt);
    fireEvent.click(within(carousel).getByRole("button", { name: "Pause Tripadvisor reviews" }));
    const paused = cards.textContent;
    act(() => vi.advanceTimersByTime(18000));
    expect(cards.textContent).toBe(paused);
    fireEvent.click(within(carousel).getByRole("button", { name: "Next Tripadvisor reviews" }));
    expect(cards).toHaveTextContent(tripadvisorReviews[4]!.excerpt);
    expect(screen.getByRole("link", { name: "Explore all my Tripadvisor reviews" })).toHaveAttribute("href", tripadvisorProfileUrl);
  });

  it("removes the retired route without redirecting old addresses", async () => {
    const router = await aboutRouter("/about/#moshe-barak");
    expect(router.routesById).not.toHaveProperty("/about");
    expect(router.matchRoutes("/about/").at(-1)?.routeId).toBe("__root__");
    expect(router.state.location.pathname).toBe("/about/");
    expect(router.state.location.hash).toBe("moshe-barak");
  });
});
