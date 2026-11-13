import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { HomeHero } from "@/components/HomeHero";
import { Route as HomeRoute } from "@/routes/index";
import { routeTree } from "@/routeTree.gen";

afterEach(cleanup);

describe("homepage marketing copy and service sections", () => {
  it("shows a welcoming hero introduction without redundant marketing buttons", () => {
    const { container } = render(<HomeHero />);
    expect(screen.getByRole("heading", { level: 1, name: "Discover Israel, Travel Smarter" })).toBeInTheDocument();
    expect(screen.getByText("Your journey starts here")).toBeInTheDocument();
    expect(container.textContent).toContain("From airport arrivals and getting around to memorable day trips");
    expect(container.textContent).toContain("make the most of your time in Israel.");
    const headline = screen.getByRole("heading", { level: 1, name: "Discover Israel, Travel Smarter" });
    expect(headline).toHaveClass("md:text-5xl", "lg:max-w-none", "lg:whitespace-nowrap");
    expect(headline.nextElementSibling).toHaveClass("mt-3");
    const caption = screen.getByText("Jerusalem Old City from the Mount of Olives");
    expect(caption).toHaveClass("text-[10px]", "text-navy-foreground/60");
    expect(caption.parentElement).toHaveClass("mt-16", "md:mt-24");
    expect(screen.queryByRole("link", { name: "Find where to stay" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Browse destinations" })).not.toBeInTheDocument();
    expect(container.querySelectorAll("a")).toHaveLength(0);
    expect(screen.getByRole("region", { name: "Places in Israel" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next place" })).toBeInTheDocument();
  });
  it("shows service sections without the redundant shortcut navigation under the hero", async () => {
    const router = createRouter({
      routeTree, context: { queryClient: new QueryClient() },
      history: createMemoryHistory({ initialEntries: ["/"] }), trailingSlash: "always",
    });
    await router.load();
    const View = HomeRoute.options.component!;
    render(<RouterContextProvider router={router}><View /></RouterContextProvider>);
    expect(screen.queryByRole("navigation", { name: "Services" })).not.toBeInTheDocument();
    // The first section follows the hero with compact spacing, without a second menu.
    const firstSection = document.getElementById("transfers")!;
    expect(firstSection).toBeInTheDocument();
    expect(firstSection.parentElement).toHaveClass("mt-8");
    const sectionHeadings = [
      "Airport Transfers",
      "Tours & Day Trips",
      "Shore Excursions",
      "Where to Stay in Israel",
      "Attractions & Experiences",
      "What Travelers Say",
      "Practical Israel Travel Guides",
      "Personal Messages from Past Clients",
      "Send me a message",
    ];
    const actualHeadings = screen.getAllByRole("heading", { level: 2 }).map(heading => heading.textContent);
    expect(actualHeadings).toEqual(sectionHeadings);
    const attractionSection = document.getElementById("attractions")!;
    const tripadvisorSection = screen.getByRole("heading", { name: "What Travelers Say" }).closest("section")!;
    const guidesSectionForOrder = document.getElementById("guides")!;
    expect(attractionSection.compareDocumentPosition(tripadvisorSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(tripadvisorSection.compareDocumentPosition(guidesSectionForOrder) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    // Every broad-category CTA follows its own cards rather than preceding them.
    for (const [sectionId, linkName, target] of [
      ["transfers", "Explore all airport transfers", "/airport-transfers/"],
      ["tours", "Explore all tours & day trips", "/tours/"],
      ["shore-excursions", "Explore all shore excursions", "/shore-excursions/"],
      ["accommodation", "Explore all accommodation", "/accommodation/"],
      ["attractions", "Explore attractions & experiences", "/attractions/"],
    ] as const) {
      const section = document.getElementById(sectionId)!;
      const button = within(section).getByRole("link", { name: new RegExp(linkName, "i") });
      expect(button).toHaveAttribute("href", target);
      expect(section.querySelector("header")?.contains(button)).toBe(false);
      expect(section.lastElementChild).toContainElement(button);
      expect(section.querySelector('[data-testid="service-layout-' + sectionId + '"]')!.compareDocumentPosition(button) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }
    // Four airport routes use bold, full-photo destination tiles rather than compact text rows.
    const transferSection = document.getElementById("transfers")!;
    const transferDestinations = within(transferSection).getByRole("list", { name: "Airport transfer destinations" });
    expect(transferDestinations).toHaveClass("grid-cols-2", "lg:grid-rows-2", "lg:h-full");
    expect(transferSection.querySelector('[data-testid="service-layout-transfers"]')).toHaveClass("lg:h-[280px]", "lg:items-stretch");
    const transferCards = within(transferDestinations).getAllByRole("link");
    expect(transferCards).toHaveLength(4);
    expect(transferCards.map(card => card.textContent?.trim())).toEqual([
      "To Jerusalem", "To Tel Aviv", "To Haifa", "To Ein Bokek",
    ]);
    expect(transferCards.map(card => card.getAttribute("href"))).toEqual([
      "/airport-transfers/ben-gurion-airport-to-jerusalem/",
      "/airport-transfers/ben-gurion-airport-to-tel-aviv/",
      "/airport-transfers/ben-gurion-airport-to-haifa/",
      "/airport-transfers/ben-gurion-airport-to-ein-bokek/",
    ]);
    for (const card of transferCards) {
      expect(card).toHaveClass("relative", "group");
      expect(card).toHaveClass("aspect-[16/9]", "lg:h-full");
      expect(within(card).getByRole("img")).toHaveClass("h-full", "w-full", "object-cover");
    }
    expect(within(transferSection).getAllByRole("img")).toHaveLength(5);
    expect(transferCards.map(card => within(card).getByRole("img").getAttribute("src"))).toEqual([
      "/images/home/transfer-jerusalem-tower-of-david.webp",
      "/images/home/transfer-tel-aviv-beach-skyline.webp",
      "/images/home/transfer-haifa-bahai-gardens.webp",
      "/images/home/transfer-ein-bokek-aerial.webp",
    ]);
    const transferHeroPhoto = transferSection.querySelector('[data-testid="service-layout-transfers"] > img');
    expect(transferHeroPhoto).toHaveClass("aspect-[16/9]", "lg:h-full");

    // Homepage overview buttons and guide card prompts have no trailing arrows.
    for (const label of [
      "Explore all airport transfers",
      "Explore all tours & day trips",
      "Explore all shore excursions",
      "Explore all accommodation",
      "Explore attractions & experiences",
      "Browse all guides",
    ]) {
      const button = screen.getByRole("link", { name: new RegExp("^" + label + "$", "i") });
      expect(button.textContent?.trim().toLowerCase()).toBe(label.toLowerCase());
      expect(button.textContent).not.toContain("→");
    }
    const homepageGuides = document.getElementById("guides")!;
    const readMoreLabels = within(homepageGuides).getAllByText("Read more");
    expect(readMoreLabels).toHaveLength(6);
    for (const label of readMoreLabels) {
      expect(label.textContent?.trim()).toBe("Read more");
      expect(label.textContent).not.toContain("→");
    }

    // Six distinct destinations link directly to the matching tour-category pages.
    const toursSection = document.getElementById("tours")!;
    const tourList = within(toursSection).getByRole("list", { name: "Tour destinations" });
    const tourTiles = within(tourList).getAllByRole("link");
    expect(tourTiles).toHaveLength(6);
    expect(tourTiles.map(tile => tile.getAttribute("href"))).toEqual([
      "/tours/jerusalem/",
      "/tours/tel-aviv-jaffa/",
      "/tours/masada-dead-sea/",
      "/tours/bethlehem-jericho-jordan-river/",
      "/tours/nazareth-sea-of-galilee/",
      "/tours/caesarea-haifa-acre/",
    ]);
    expect(tourTiles.map(tile => tile.textContent?.trim())).toEqual([
      "Jerusalem",
      "Tel Aviv & Jaffa",
      "Masada & Dead Sea",
      "Bethlehem & Jericho",
      "Nazareth & Galilee",
      "Caesarea, Haifa & Acre",
    ]);
    for (const tile of tourTiles) {
      expect(within(tile).getByRole("img")).toHaveAttribute("loading", "lazy");
      expect(tile).toHaveClass("group", "relative");
    }
    expect(within(toursSection).getAllByRole("img")).toHaveLength(7); // Guide photo + six destinations
    expect(toursSection.querySelector('[data-testid="service-layout-tours"]')).toHaveClass("lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]");

    // Six featured attraction destinations use the same image-tile layout as the tour cards.
    const attractionsSection = document.getElementById("attractions")!;
    const attractionsList = within(attractionsSection).getByRole("list", { name: "Featured attractions" });
    const attractionTiles = within(attractionsList).getAllByRole("link");
    expect(attractionTiles).toHaveLength(6);
    expect(attractionTiles.map(tile => tile.getAttribute("href"))).toEqual([
      "/travel-blog/rosh-hanikra/",
      "/travel-blog/mitzpe-ramon-crater/",
      "/travel-blog/capernaum/",
      "/travel-blog/mount-tabor/",
      "/travel-blog/mount-of-olives/",
      "/travel-blog/eilat/",
    ]);
    expect(attractionTiles.map(tile => tile.textContent?.trim())).toEqual([
      "Rosh Hanikra",
      "Ramon Crater",
      "Capernaum",
      "Mount Tabor",
      "Mount of Olives",
      "Eilat",
    ]);
    for (const tile of attractionTiles) {
      expect(tile).toHaveClass("group", "relative");
      expect(within(tile).getByRole("img")).toHaveAttribute("loading", "lazy");
    }
    expect(attractionsSection.querySelector('[data-testid="service-layout-attractions"]')).toHaveClass("lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]");
    expect(within(attractionsSection).getAllByRole("img")).toHaveLength(7);

    // Shore-port images keep a landscape ratio, and both cards align with the shorter ship photo on desktop.
    const shoreSection = document.getElementById("shore-excursions")!;
    const shoreLayout = shoreSection.querySelector('[data-testid="service-layout-shore-excursions"]')!;
    expect(shoreLayout).toHaveClass("lg:h-[280px]", "lg:grid-cols-2", "lg:items-stretch");
    const shorePhoto = shoreLayout.querySelector(":scope > img")!;
    expect(shorePhoto).toHaveClass("aspect-[16/9]", "lg:h-full", "object-cover");
    const portList = within(shoreSection).getByRole("list", { name: "Shore excursions by port" });
    expect(portList).toHaveClass("gap-3", "lg:h-full", "lg:grid-rows-2");
    const portLinks = within(portList).getAllByRole("link");
    expect(portLinks).toHaveLength(2);
    expect(portLinks.map(link => link.getAttribute("href"))).toEqual([
      "/ashdod-shore-excursions/", "/haifa-shore-excursions/",
    ]);
    expect(portLinks.map(link => link.textContent)).toEqual([
      expect.stringContaining("Explore Ashdod excursions"),
      expect.stringContaining("Explore Haifa excursions"),
    ]);
    expect(portLinks[0]).toHaveTextContent("Tel Aviv–Jaffa, Masada or the Dead Sea");
    expect(portLinks[1]).toHaveTextContent("Akko, Nazareth and the Galilee");
    for (const portLink of portLinks) {
      expect(portLink).toHaveClass("h-full");
      const photo = within(portLink).getByRole("img");
      expect(photo).toHaveClass("h-full", "object-cover");
      expect(photo.parentElement).toHaveClass("aspect-[16/9]", "min-[480px]:aspect-auto");
      expect(portLink.querySelector(".line-clamp-2")).toBeInTheDocument();
      expect(portLink.textContent).not.toContain("→");
    }
    expect(within(shoreSection).getAllByRole("img")).toHaveLength(3);

    // The former bottom destination strip is consolidated into the accommodation section.
    const accommodationSection = document.getElementById("accommodation")!;
    const destinationLinks = within(accommodationSection).getAllByRole("link").filter(link => link.getAttribute("href")?.startsWith("/travel-blog/"));
    expect(destinationLinks).toHaveLength(5);
    // Only the destination name appears over each accommodation image.
    for (const [link, destination] of destinationLinks.map((link, i) => [link, ["Jerusalem", "Tel Aviv & Jaffa", "Tiberias & Galilee", "Dead Sea", "Haifa"][i]!] as const)) {
      expect(link.textContent?.trim()).toBe(destination);
    }
    for (const removedDescription of [
      "Old City, city centre & boutique hotels",
      "Beachfront, Jaffa & city hotels",
      "Lakeside, luxury & family hotels",
      "Spa retreats & beachfront resorts",
      "Carmel views, boutique & family hotels",
    ]) {
      expect(accommodationSection).not.toHaveTextContent(removedDescription);
    }
    expect(destinationLinks.map(link => link.getAttribute("href"))).toEqual([
      "/travel-blog/where-to-stay-in-jerusalem/",
      "/travel-blog/where-to-stay-in-tel-aviv/",
      "/travel-blog/best-hotels-in-tiberias/",
      "/travel-blog/best-dead-sea-hotels/",
      "/travel-blog/best-hotels-in-haifa/",
    ]);
    expect(within(accommodationSection).getAllByRole("img")).toHaveLength(5);
    // The five landscape source images keep more of each destination view than the old portrait crops.
    const stayImages = within(accommodationSection).getAllByRole("img");
    expect(stayImages.map(image => image.getAttribute("src"))).toEqual([
      "/images/home/accommodation-jerusalem-ai.webp",
      "/images/home/accommodation-tel-aviv-jaffa-ai.webp",
      "/images/home/accommodation-tiberias-galilee-ai.webp",
      "/images/home/accommodation-dead-sea-ai.webp",
      "/images/home/accommodation-haifa-ai.webp",
    ]);
    for (const image of stayImages) {
      expect(image).toHaveClass("aspect-[3/2]", "xl:aspect-[6/5]", "object-cover");
    }
    // Photo cards remain bright; destination titles are white with a text-only shadow, not a background.
    for (const photoLink of [...transferCards, ...tourTiles, ...attractionTiles, ...destinationLinks]) {
      expect(photoLink.querySelector('[class*="bg-gradient-to-t"]')).not.toBeInTheDocument();
      const photoTitle = Array.from(photoLink.querySelectorAll("span")).find(label => label.textContent?.trim() === photoLink.textContent?.trim());
      expect(photoTitle).toHaveClass("text-white");
      expect(photoTitle).not.toHaveClass("bg-background/95");
      expect(photoTitle).toHaveStyle({ textShadow: "0 1px 3px rgba(0, 0, 0, 0.95), 0 2px 8px rgba(0, 0, 0, 0.75)" });
    }
    expect(within(accommodationSection).getByRole("link", { name: /Explore all accommodation/i })).toHaveAttribute("href", "/accommodation/");
    expect(screen.queryByText("Where to Base Yourself")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Popular Destinations" })).not.toBeInTheDocument();

    const guidesSection = document.getElementById("guides")!;
    const guideButton = within(guidesSection).getByRole("link", { name: /Browse all guides/i });
    expect(guideButton).toHaveAttribute("href", "/travel-blog/");
    expect(guidesSection.lastElementChild).toContainElement(guideButton);
    expect(guidesSection.querySelector('[data-testid="guide-row-two"]')!.compareDocumentPosition(guideButton) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    expect(screen.queryByRole("heading", { name: /Airport Transfers & Private Drivers/i })).not.toBeInTheDocument();

  });
});
