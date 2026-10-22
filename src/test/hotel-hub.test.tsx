import type { AnchorHTMLAttributes, ReactNode } from "react";
import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { routeTree } from "@/routeTree.gen";
import { Route as HotelHubRoute } from "@/routes/hotels";
import { accommodationDestinations } from "@/data/content";
import { arrivalCards, hotelStyles, itineraryCards, seasons } from "@/data/hotelHub";
import { CANONICAL_ORIGIN } from "@/lib/site";

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual<typeof import("@tanstack/react-router")>("@tanstack/react-router");
  return {
    ...actual,
    Link: ({ to, hash, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; hash?: string; children?: ReactNode }) =>
      <a href={hash ? to + "#" + hash : to} {...props}>{children}</a>,
  };
});

afterEach(cleanup);

function page() {
  const Page = HotelHubRoute.options.component!;
  return render(<Page />);
}

describe("Accommodation hub editorial upgrade", () => {
  it("retains the single H1, six destination cards and the dedicated Eilat hotel-area CTA", () => {
    const { container } = page();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Where to stay in Israel");
    const destinationCards = container.querySelectorAll('[data-testid="accommodation-destination-card"]');
    expect(destinationCards).toHaveLength(6);
    expect(accommodationDestinations).toHaveLength(6);
    const eilat = within(container.querySelector("#destinations") as HTMLElement).getByRole("link", { name: /Explore Eilat Hotels/i });
    expect(eilat).toHaveAttribute("href", "/travel-blog/eilat/#arrival-stay");
    expect(screen.queryByText(/From Mediterranean city breaks to peaceful lakeside mornings/i)).not.toBeInTheDocument();
  });

  it("explains six distinct hotel formats and practical choice criteria", () => {
    const { container } = page();
    expect(container.querySelectorAll("#styles article")).toHaveLength(6);
    expect(hotelStyles).toHaveLength(6);
    for (const style of hotelStyles) {
      expect(screen.getByRole("heading", { name: style.title })).toBeInTheDocument();
      expect(style.link?.to).toBeTruthy();
    }
    expect(screen.getByRole("heading", { name: "What matters when choosing" })).toBeInTheDocument();
    expect(screen.getByText(/deposits & cancellation/i)).toBeInTheDocument();
    expect(screen.getByText(/Steps, elevators & accessibility/i)).toBeInTheDocument();
  });

  it("links season and holiday editorial advice, and presents four travel seasons", () => {
    page();
    for (const season of seasons) expect(screen.getByRole("heading", { name: season.title })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /best time to visit Israel/i })).toHaveAttribute("href", "/travel-blog/best-time-to-visit-israel/");
    expect(screen.getByRole("link", { name: /holidays and events guide/i })).toHaveAttribute("href", "/travel-blog/calendar-of-events/");
    expect(screen.getByText(/Jewish holidays begin at sunset/i)).toBeInTheDocument();
  });

  it("provides real all-mode airport guides rather than replacing them with private-transfer sales pages", () => {
    const { container } = page();
    const cards = container.querySelectorAll('[data-testid="hotel-arrival-card"]');
    expect(cards).toHaveLength(8);
    expect(arrivalCards).toHaveLength(8);
    for (const card of arrivalCards) {
      const link = [...cards].find((item) => item.getAttribute("href") === card.to);
      expect(link, card.id).toBeTruthy();
      expect(link?.querySelector("img")).toHaveAttribute("alt", card.photo.alt);
    }
    for (const place of ["jerusalem", "tel-aviv", "haifa", "ein-bokek"]) {
      expect(arrivalCards.map((c) => c.to)).toContain("/travel-blog/how-to-get-from-ben-gurion-airport-to-" + place + "/");
    }
    expect(arrivalCards.filter((card) => card.to.startsWith("/travel-blog/ben-gurion-airport-to-"))).toHaveLength(0);
  });

  it("links the four migrated itineraries internally at their original URLs", () => {
    const { container } = page();
    const itineraryLinks = container.querySelectorAll<HTMLAnchorElement>('[data-testid="hotel-itinerary-card"]');
    expect(itineraryLinks).toHaveLength(4);
    expect(itineraryCards.map((card) => card.days)).toEqual([3, 5, 7, 10]);
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, trailingSlash: "always" });
    for (const link of itineraryLinks) {
      const path = link.getAttribute("href")!;
      expect(path).toMatch(/^\/travel-blog\/israel-itinerary-(3|5|7|10)-days\/$/);
      expect(link).not.toHaveAttribute("target");
      expect(router.matchRoutes(path).at(-1)?.routeId).not.toBe(rootRouteId);
    }
    expect(screen.queryByText(/existing website in a separate tab/)).not.toBeInTheDocument();
  });

  it("keeps internal paths resolvable and self-canonical staging SEO unchanged", async () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, trailingSlash: "always" });
    for (const destination of accommodationDestinations) {
      if ("to" in destination) {
        const result = router.matchRoutes(destination.to);
        expect(result.at(-1)?.routeId, destination.title).not.toBe(rootRouteId);
      }
    }
    for (const route of [
      ...arrivalCards.map((x) => x.to),
      ...hotelStyles.flatMap((x) => x.link ? [x.link.to] : []),
      "/travel-blog/best-time-to-visit-israel/",
      "/travel-blog/calendar-of-events/",
    ]) {
      expect(router.matchRoutes(route).at(-1)?.routeId, route).not.toBe(rootRouteId);
    }
    const meta = await HotelHubRoute.options.head?.({} as never);
    expect(meta).toMatchObject({
      meta: expect.arrayContaining([{ name: "robots", content: "noindex,nofollow" }]),
      links: [{ rel: "canonical", href: CANONICAL_ORIGIN + "/hotels/" }],
    });
  });

  it("uses meaningful images and gives credits for externally sourced photography", () => {
    const { container } = page();
    expect(container.querySelectorAll('img[alt=""]')).toHaveLength(0);
    expect(container.querySelectorAll("#styles img")).toHaveLength(6);
    expect(container.querySelectorAll("#when img")).toHaveLength(2);
    expect(container.querySelectorAll("#arrival img")).toHaveLength(8);
    expect(screen.getByText("Photo credits")).toBeInTheDocument();
  });
});
