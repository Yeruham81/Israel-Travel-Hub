import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";
import { isPublisherUrl, providerLinks } from "@/data/registry";

function routerAt(path: string) {
  return createRouter({
    routeTree,
    context: { queryClient: new QueryClient() },
    history: createMemoryHistory({ initialEntries: [path] }),
    trailingSlash: "always",
  });
}

describe("replacement-site navigation", () => {
  it("never refers visitors or search engines to legacy pages across all public page routes", async () => {
    const routes = Object.values(routerAt("/").routesById).filter(route => route.id !== "__root__" && route.options.component);
    expect(routes.length).toBeGreaterThan(90);
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
          if (value) expect(isPublisherUrl(value), `${path}: ${attribute}=${value}`).toBe(false);
        }
      }
      // The existing business email remains a valid way to contact Moshe.
      const text = doc.body.textContent?.replace(/[\w.+-]+@israel-taxi\.com/gi, "");
      expect(text, path).not.toMatch(/israel-taxi\.com|Prefer an online form|existing .*contact form|original online form|original operator page/i);
      const head = await route.options.head?.({} as never);
      expect(JSON.stringify(head), `${path}: metadata`).not.toMatch(/israel-taxi\.com/i);
      if (path === "/about-moshe-barak/") expect(doc.querySelector("#privacy")?.textContent).toContain("the form doesn't transmit your message");
      for (const link of doc.querySelectorAll('a[href="/about-moshe-barak/#privacy"]')) {
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
