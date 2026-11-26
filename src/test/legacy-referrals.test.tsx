import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";
import { isPublisherUrl, providerLinks } from "@/data/registry";
import { CANONICAL_ORIGIN } from "@/lib/site";

function routerAt(path: string) {
  return createRouter({
    routeTree,
    context: { queryClient: new QueryClient() },
    history: createMemoryHistory({ initialEntries: [path] }),
    trailingSlash: "always",
  });
}

// Allow the permanent origin in metadata only for valid current routes and
// local image assets. Retain the prohibition on obsolete publisher referrals.
function isCurrentMetadataUrl(value: string, currentPaths: Set<string>, origin = CANONICAL_ORIGIN) {
  const url = new URL(value);
  if (url.origin !== origin || url.username || url.password) return false;
  const path = url.pathname === "/" ? "/" : url.pathname.replace(/\/+$/, "") + "/";
  return currentPaths.has(path) ||
    /^\/(?:src\/assets|assets|images)\/[^?#]+\.(?:webp|avif|png|jpe?g|svg|gif|ico)$/i.test(url.pathname);
}

describe("replacement-site navigation", () => {
  it("distinguishes current canonical metadata from obsolete or noncanonical publisher URLs", () => {
    const origin = "https://www.israel-taxi.com";
    const paths = new Set(["/", "/about-me/", "/travel-blog/"]);
    expect(isCurrentMetadataUrl(origin + "/#website", paths, origin)).toBe(true);
    expect(isCurrentMetadataUrl(origin + "/about-me/#moshe-barak", paths, origin)).toBe(true);
    expect(isCurrentMetadataUrl(origin + "/src/assets/home/photo.webp", paths, origin)).toBe(true);
    expect(isCurrentMetadataUrl(origin + "/travel-blog/", paths, origin)).toBe(true);
    expect(isCurrentMetadataUrl(origin + "/about/", paths, origin)).toBe(false);
    expect(isCurrentMetadataUrl(origin + "/wp-content/uploads/photo.jpg", paths, origin)).toBe(false);
    expect(isCurrentMetadataUrl("https://israel-taxi.com/about-me/", paths, origin)).toBe(false);
    expect(isCurrentMetadataUrl(origin + ".example.org/about-me/", paths, origin)).toBe(false);
  });
  // The only temporary exception is four owner-authored itineraries awaiting migration.
  // This whitelist MUST be removed when the original slugs are re-created as internal routes.
  const temporaryItineraryLinks = new Set([3, 5, 7, 10].map(days =>
    "https://www.israel-taxi.com/travel-blog/israel-itinerary-" + days + "-days/",
  ));

  it("blocks legacy-site referrals except for the four documented itinerary bridge links", async () => {
    const routes = Object.values(routerAt("/").routesById).filter(route => route.id !== "__root__" && route.options.component);
    expect(routes.length).toBeGreaterThan(90);
    const currentPaths = new Set(routes.map(route => route.fullPath.endsWith("/") ? route.fullPath : route.fullPath + "/"));
    for (const route of routes) {
      const path = route.fullPath.endsWith("/") ? route.fullPath : route.fullPath + "/";
      const router = routerAt(path);
      await router.load();
      const Page = route.options.component!;
      const html = renderToString(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
      const doc = new DOMParser().parseFromString(html, "text/html");
      for (const element of doc.querySelectorAll("[href], [src], [action], [srcset]")) {
        for (const attribute of ["href", "src", "action", "srcset"]) {
          const value = element.getAttribute(attribute);
          if (value) {
            const temporaryItinerary = path === "/hotels/" && attribute === "href" && temporaryItineraryLinks.has(value);
            if (temporaryItinerary) {
              expect(element.tagName, value).toBe("A");
              expect(element.getAttribute("target"), value).toBe("_blank");
              expect(element.getAttribute("rel"), value).toContain("noopener");
              expect(element.getAttribute("rel"), value).toContain("noreferrer");
            } else {
              expect(isPublisherUrl(value), `${path}: ${attribute}=${value}`).toBe(false);
            }
          }
          if (attribute === "href" && value) expect(value, path).not.toMatch(/^\/about(?:\/|[?#]|$)/);
        }
      }
      // The existing business email remains a valid way to contact Moshe.
      const text = doc.body.textContent?.replace(/[\w.+-]+@israel-taxi\.com/gi, "");
      expect(text, path).not.toMatch(/israel-taxi\.com|Prefer an online form|existing .*contact form|original online form|original operator page/i);
      const head = await route.options.head?.({} as never);
      const remainingMetadata = (JSON.stringify(head) ?? "").replace(
        /https:\/\/www\.israel-taxi\.com(?=\/|["\\]|$)[^"\\\s<>]*/gi,
        value => {
          expect(isCurrentMetadataUrl(value, currentPaths), path + ": metadata URL " + value).toBe(true);
          return "[verified current metadata URL]";
        },
      );
      expect(remainingMetadata, path + ": metadata").not.toMatch(/israel-taxi\.com/i);
      if (path === "/about-me/") expect(doc.querySelector('#privacy a[href="/privacy-policy/"]')).not.toBeNull();
      for (const link of doc.querySelectorAll('a[href="/privacy-policy/"]')) {
        expect(link.hasAttribute("target"), path).toBe(false);
      }
    }
  }, 30000);

  it("keeps every local quote destination and its form on the replacement site", async () => {
    for (const link of providerLinks.filter(item => item.relationship === "publisher_operator")) {
      const [path, hash] = link.url.split("#");
      expect(path, link.id).toMatch(/^\/(?!\/)/);
      expect(hash, link.id).toBe("request-quote");
      const router = routerAt(path!);
      await router.load();
      const matched = router.matchRoutes(path!).at(-1)!;
      expect(matched.routeId, link.id).not.toBe("__root__");
      const Page = router.routesById[matched.routeId]!.options.component!;
      const doc = new DOMParser().parseFromString(renderToString(<RouterContextProvider router={router}><Page /></RouterContextProvider>), "text/html");
      expect(doc.querySelector("#request-quote form"), link.id).not.toBeNull();
    }
  });
});
