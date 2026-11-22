import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { routeTree } from "@/routeTree.gen";
import { Route as AboutRoute } from "@/routes/about-me";
import { tripadvisorProfileUrl, tripadvisorReviews } from "@/data/homeReviews";

afterEach(() => { cleanup(); vi.useRealTimers(); });

async function aboutRouter(path = "/about-me/") {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, history: createMemoryHistory({ initialEntries: [path] }), trailingSlash: "always" });
  await router.load();
  return router;
}

function renderAbout(router: Awaited<ReturnType<typeof aboutRouter>>) {
  const About = AboutRoute.options.component!;
  return render(<RouterContextProvider router={router}><About /></RouterContextProvider>);
}

describe("one personal About Moshe Barak page", () => {
  it("focuses on personal experience, traveler photographs, reviews and a direct contact form", async () => {
    const { container } = renderAbout(await aboutRouter());
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/^About Moshe Barak$/);
    expect(screen.getAllByRole("img", { name: "Moshe Barak" })).toHaveLength(1);
    expect(screen.getByRole("link", { name: "Read Reviews on TripAdvisor" })).toHaveAttribute("href", tripadvisorProfileUrl);
    expect(screen.getByRole("heading", { name: "Send me a message" })).toBeInTheDocument();
    expect(screen.getByRole("form", { name: "Contact me" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Tell me how I can help…")).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: "Personal attention" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Professional service" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Local knowledge" })).toBeInTheDocument();
    const collage = screen.getByRole("img", { name: "Moshe Barak with clients during journeys around Israel" });
    expect(collage).toHaveAttribute("width", "681");
    expect(collage).toHaveAttribute("height", "341");
    expect(collage.className).not.toContain("object-cover");
    const reviews = screen.getByRole("region", { name: "Tripadvisor traveler reviews" });
    expect(collage.compareDocumentPosition(reviews) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    const methodology = screen.getByRole("region", { name: "Experience behind my travel guides" });
    expect(methodology.querySelectorAll("p")).toHaveLength(1);
    expect(methodology).toHaveTextContent("first-hand feedback from thousands of clients");
    expect(screen.queryByText("How I put this website together")).not.toBeInTheDocument();
    expect(container.textContent).not.toMatch(/Coming soon|How I choose information|How I explain prices/);
    expect(container.querySelector('#privacy a[href="/privacy-policy/"]')).toBeInTheDocument();
    expect(container.querySelector('a[href^="/about/"]')).toBeNull();
    // Guest quotations and visitor form fields retain their own voice.
    const narrative = container.cloneNode(true) as HTMLElement;
    narrative.querySelectorAll("blockquote, form").forEach(element => element.remove());
    expect(narrative.textContent).not.toMatch(/\bwe\b|\bour\b|Moshe's|with Moshe|Send Moshe|Ask Moshe/i);
    const head = await AboutRoute.options.head?.({} as never);
    expect(head!.links).toContainEqual({ rel: "canonical", href: expect.stringMatching(/\/about-me\/$/) });
  });

  it("uses the shared six-second Tripadvisor carousel with dot-only navigation", async () => {
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
    const dots = within(carousel).getByRole("group", { name: "Choose a Tripadvisor review" });
    expect(within(dots).getAllByRole("button")).toHaveLength(6);
    expect(within(carousel).queryByRole("button", { name: "Pause Tripadvisor reviews" })).not.toBeInTheDocument();
    fireEvent.click(within(dots).getByRole("button", { name: "Show Tripadvisor review from Marc" }));
    expect(cards).toHaveTextContent(tripadvisorReviews[4]!.excerpt);
    const paused = cards.textContent;
    act(() => vi.advanceTimersByTime(18000));
    expect(cards.textContent).toBe(paused);
    expect(screen.getByRole("link", { name: "Read all my Tripadvisor reviews" })).toHaveAttribute("href", tripadvisorProfileUrl);
  });

  it("removes the retired route without redirecting old addresses", async () => {
    const router = await aboutRouter("/about/#moshe-barak");
    expect(router.routesById).not.toHaveProperty("/about");
    expect(router.matchRoutes("/about/").at(-1)?.routeId).toBe("__root__");
    expect(router.state.location.pathname).toBe("/about/");
    expect(router.state.location.hash).toBe("moshe-barak");
  });
});
