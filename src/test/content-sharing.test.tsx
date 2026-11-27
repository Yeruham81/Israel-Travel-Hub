import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ContentSharePanel } from "@/components/ContentSharePanel";
import { PageContentSharePanel } from "@/components/PageContentSharePanel";
import { contentShareUrl, isShareableContentPath, networkShareUrl } from "@/lib/content-sharing";
import { CANONICAL_ORIGIN } from "@/lib/site";

let route = {
  location: { pathname: "/travel-blog/jerusalem-travel-guide/" },
  matches: [
    { fullPath: "/travel-blog/jerusalem-travel-guide/", status: "success", _notFound: false },
  ],
};
vi.mock("@tanstack/react-router", () => ({
  useRouterState: ({ select }: { select: (state: typeof route) => unknown }) => select(route),
}));
const path = "/travel-blog/jerusalem-travel-guide/";
const title = "Jerusalem & Jaffa: Tom’s trip + tips";

beforeEach(() => {
  route = {
    location: { pathname: path },
    matches: [{ fullPath: path, status: "success", _notFound: false }],
  };
  document.body.innerHTML = `<main id="main"><h1>${title.replace("&", "&amp;")}</h1><form><input value="private@example.com" /></form></main>`;
  document.head.insertAdjacentHTML(
    "beforeend",
    '<meta data-test-share property="og:image" content="/images/jerusalem.webp">',
  );
});
afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
  document.querySelectorAll("[data-test-share]").forEach((node) => node.remove());
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("approved sharing coverage", () => {
  it("renders the panel for a successful editorial leaf", async () => {
    render(<PageContentSharePanel />);
    expect(await screen.findByRole("region", { name: "Share this page" })).toBeInTheDocument();
  });
  it.each([
    path,
    "/travel-blog/israel-itinerary-3-days/",
    "/travel-blog/israel-itinerary-10-days/",
    "/travel-blog/ben-gurion-airport-to-jerusalem/",
    "/travel-blog/christian-tours-in-israel/",
    "/travel-blog/israel-tours-for-seniors/",
    "/attractions/jaffa/",
    "/accommodation/jerusalem/",
    "/accommodation/tel-aviv/jaffa/",
    "/car-rental/",
  ])("includes the editorial page %s", (candidate) =>
    expect(isShareableContentPath(candidate)).toBe(true),
  );

  it.each([
    "/",
    "/travel-blog/",
    "/travel-guides/",
    "/attractions/",
    "/accommodation/",
    "/tours/",
    "/tours/galilee/",
    "/airport-transfers/",
    "/airport-transfers/jerusalem/",
    "/private-driver-in-israel/",
    "/shore-excursions/haifa/",
    "/about-me/",
    "/contact/",
    "/privacy-policy/",
    "/travel-blog/haifa/",
    "/travel-blog/sea-of-galilee/",
    "/travel-blog/the-dead-sea/",
  ])("excludes the directory, service or alias %s", (candidate) =>
    expect(isShareableContentPath(candidate)).toBe(false),
  );

  it.each(["pending", "error", "notFound"])("omits a leaf with %s status", (status) => {
    route.matches[0]!.status = status;
    render(<PageContentSharePanel />);
    expect(screen.queryByRole("region", { name: "Share this page" })).toBeNull();
  });

  it("omits a 404 caught by a parent and a flagged not-found leaf", () => {
    route.location.pathname = "/travel-blog/missing-page/";
    const view = render(<PageContentSharePanel />);
    expect(screen.queryByRole("region", { name: "Share this page" })).toBeNull();
    route.location.pathname = path;
    route.matches[0]!._notFound = true;
    view.rerender(<PageContentSharePanel />);
    expect(screen.queryByRole("region", { name: "Share this page" })).toBeNull();
  });
});

it("shares only the canonical page path, without form values, queries or fragments", () => {
  const url = contentShareUrl(
    `${path}?email=private%40example.com&utm_campaign=test#contact`,
    "https://www.israel-taxi.com",
  );
  expect(url).toBe(`https://www.israel-taxi.com${path}`);
  const share = new URL(networkShareUrl("telegram", { url, title }));
  expect(share.searchParams.get("url")).toBe(url);
  expect(share.searchParams.get("text")).toBe(title);
  expect(share.href).not.toContain("private");
});

it("encodes email spaces and line breaks for mail clients", () => {
  const href = networkShareUrl("email", {
    title,
    url: "https://www.israel-taxi.com/attractions/jaffa/",
  });
  expect(decodeURIComponent(href.split("subject=")[1]!.split("&body=")[0]!)).toBe(title);
  expect(href).toContain("%20");
  expect(href).toContain("%0D%0A");
});

it("renders all eight local icons and correct destinations with the current page title and image", () => {
  const fetcher = vi.fn();
  vi.stubGlobal("fetch", fetcher);
  const { container } = render(<ContentSharePanel pathname={path} />);
  const expected = {
    WhatsApp: "api.whatsapp.com",
    Facebook: "www.facebook.com",
    X: "x.com",
    Telegram: "t.me",
    Pinterest: "www.pinterest.com",
    LinkedIn: "www.linkedin.com",
  };
  for (const [label, host] of Object.entries(expected)) {
    const link = screen.getByRole("link", {
      name:
        label === "WhatsApp" || label === "Telegram" ? `Share via ${label}` : `Share on ${label}`,
    });
    const target = new URL(link.getAttribute("href")!);
    expect(target.hostname).toBe(host);
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveAttribute("referrerpolicy", "no-referrer");
    expect(decodeURIComponent(target.search)).toContain(CANONICAL_ORIGIN);
    expect(link.querySelector("svg")).not.toBeNull();
  }
  const pinterest = new URL(
    screen.getByRole("link", { name: "Share on Pinterest" }).getAttribute("href")!,
  );
  expect(pinterest.searchParams.get("description")).toBe(title);
  expect(pinterest.searchParams.get("media")).toBe(`${CANONICAL_ORIGIN}/images/jerusalem.webp`);
  expect(container.querySelectorAll(".content-share-button svg")).toHaveLength(8);
  expect(container.querySelectorAll("iframe, script, img")).toHaveLength(0);
  expect(fetcher).not.toHaveBeenCalled();
});

it("copies the public link and announces success only after the clipboard succeeds", async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  vi.stubGlobal("navigator", { clipboard: { writeText } });
  render(<ContentSharePanel pathname={path} />);
  fireEvent.click(screen.getByRole("button", { name: "Copy link" }));
  await waitFor(() =>
    expect(screen.getByRole("status")).toHaveTextContent("Link copied to clipboard."),
  );
  expect(writeText).toHaveBeenCalledExactlyOnceWith(`${CANONICAL_ORIGIN}${path}`);
  expect(screen.getByRole("button", { name: "Copied!" })).toBeInTheDocument();
});

it("offers a selected manual link when clipboard access is blocked", async () => {
  vi.stubGlobal("navigator", {
    clipboard: { writeText: vi.fn().mockRejectedValue(new Error("Denied")) },
  });
  render(<ContentSharePanel pathname={path} />);
  fireEvent.click(screen.getByRole("button", { name: "Copy link" }));
  const input = (await screen.findByRole("textbox", { name: "Page link" })) as HTMLInputElement;
  expect(input).toHaveValue(`${CANONICAL_ORIGIN}${path}`);
  await waitFor(() => expect(input).toHaveFocus());
  await waitFor(() => expect(input.selectionStart).toBe(0));
  expect(input.selectionEnd).toBe(input.value.length);
  expect(screen.queryByText("Copied!")).toBeNull();
});

it("opens device sharing with the page title and handles user cancellation quietly", async () => {
  const share = vi.fn().mockRejectedValue(new DOMException("Cancelled", "AbortError"));
  vi.stubGlobal("navigator", { share });
  render(<ContentSharePanel pathname={path} />);
  fireEvent.click(screen.getByRole("button", { name: "Share" }));
  await waitFor(() =>
    expect(share).toHaveBeenCalledExactlyOnceWith({ title, url: `${CANONICAL_ORIGIN}${path}` }),
  );
  expect(screen.getByRole("status")).toBeEmptyDOMElement();
  expect(screen.queryByRole("textbox", { name: "Page link" })).toBeNull();
});

it("refreshes the shared title and link after navigating to another guide", () => {
  const view = render(<ContentSharePanel pathname={path} />);
  document.querySelector("#main h1")!.textContent = "Jaffa walking guide";
  view.rerender(<ContentSharePanel key="jaffa" pathname="/attractions/jaffa/" />);
  const link = new URL(
    screen.getByRole("link", { name: "Share via Telegram" }).getAttribute("href")!,
  );
  expect(link.searchParams.get("text")).toBe("Jaffa walking guide");
  expect(link.searchParams.get("url")).toBe(`${CANONICAL_ORIGIN}/attractions/jaffa/`);
});
