import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterContextProvider } from "@tanstack/react-router";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "@/components/Layout";
import { airportTransferContact } from "@/data/registry";
import { routeTree } from "@/routeTree.gen";
import { CANONICAL_ORIGIN, INDEXABLE } from "@/lib/site";

async function legalDocument(path: string) {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() }, history: createMemoryHistory({ initialEntries: [path] }), trailingSlash: "always" });
  await router.load();
  const match = router.matchRoutes(path).at(-1)!;
  expect(match.routeId).not.toBe("__root__");
  const route = router.routesById[match.routeId]!;
  const Page = route.options.component!;
  const html = renderToString(<RouterContextProvider router={router}><Page /></RouterContextProvider>);
  return { doc: new DOMParser().parseFromString(html, "text/html"), route, router };
}

describe("current legal documents", () => {
  it.each([
    ["/privacy-policy/", "Privacy Policy", "/terms-of-use/"],
    ["/terms-of-use/", "Terms of Use", "/privacy-policy/"],
  ])("makes %s readable, internally linked and discoverable", async (path, title, other) => {
    const { doc, route } = await legalDocument(path);
    expect(doc.querySelectorAll("h1")).toHaveLength(1);
    expect(doc.querySelector("h1")?.textContent).toBe(title);
    expect(doc.querySelector("time")?.getAttribute("datetime")).toBe("2026-10-21");
    expect(doc.querySelector(`a[href="${other}"]`)).not.toBeNull();
    expect(doc.querySelector(`a[href="mailto:${airportTransferContact.email}"]`)).not.toBeNull();
    const contents = doc.querySelectorAll('nav[aria-label="On this page"] a');
    expect(contents.length).toBeGreaterThan(0);
    for (const link of contents) {
      const id = link.getAttribute("href")!.slice(1);
      const section = doc.getElementById(id);
      expect(section, id).not.toBeNull();
      expect(section?.querySelector("h2")?.textContent).toContain(link.textContent);
    }
    const head = await route.options.head?.({} as never);
    expect(head!.links).toContainEqual({ rel: "canonical", href: CANONICAL_ORIGIN + path });
    expect(head!.meta).toContainEqual({ name: "robots", content: INDEXABLE ? "index,follow" : "noindex,nofollow" });
    expect(JSON.stringify(head)).not.toMatch(/"@type":"(?:Offer|Product|Article)"/);
  });

  it("explains current data flows and treats the planned integrations conditionally", async () => {
    const { doc } = await legalDocument("/privacy-policy/");
    expect(doc.getElementById("enquiries")?.textContent).toContain("Providing information is voluntary");
    expect(doc.getElementById("enquiries")?.textContent).toContain("Where a form offers direct submission");
    expect(doc.getElementById("enquiries")?.textContent).toContain("currently prepare an email draft");
    expect(doc.getElementById("enquiries")?.textContent).toContain("does not save those enquiry fields in browser storage");
    expect(doc.getElementById("storage")?.textContent).toContain("up to 200 outbound-link clicks");
    expect(doc.getElementById("storage")?.textContent).toContain("does not upload the record");
    expect(doc.getElementById("storage")?.textContent).toContain("continuing to browse, is not a substitute");
    const planned = doc.getElementById("analytics-advertising")?.textContent || "";
    expect(planned).toContain("Google Analytics is planned");
    expect(planned).toMatch(/Advertisements, sponsored banners, affiliate links.*widgets may also be added/);
    expect(planned).toContain("before you click or book");
    expect(planned).toContain("change or withdraw");
    expect(planned).toContain("Google Fonts is currently used");
    expect(doc.getElementById("payments")?.textContent).toContain("does not currently process online payments");
    expect(doc.getElementById("payments")?.textContent).toContain("If online payment facilities are enabled later");
    expect(doc.getElementById("rights")?.textContent).toContain("request access or correction");
    expect(doc.getElementById("children-photos-changes")?.textContent).toContain("separate permission");
  });

  it("keeps shekel pricing, conditional future checkout and mandatory rights clear", async () => {
    const { doc } = await legalDocument("/terms-of-use/");
    const prices = doc.getElementById("prices-payments")?.textContent || "";
    expect(prices).toContain("Prices and charges for services I provide are in Israeli shekels (ILS)");
    expect(prices).toContain("Prices for services offered by external providers may be displayed in foreign currencies");
    expect(prices).toContain("provider presenting a price is solely responsible for that price and its own payment terms");
    expect(prices).toContain("does not change the amount or currency charged");
    expect(prices).toContain("no online checkout on this website at present");
    expect(prices).toContain("service charges will remain in ILS");
    const cancellation = doc.getElementById("cancellations")?.textContent || "";
    expect(cancellation).toContain("12 hours or more before the scheduled pickup");
    expect(cancellation).toContain("mandatory statutory right takes priority");
    expect(cancellation).toContain("other cancellation method available to you by law");
    expect(doc.getElementById("journey-arrangements")?.textContent).toContain("not automatically a licensed tour guide");
    expect(doc.getElementById("content-and-conduct")?.textContent).toContain("separate permission");
    expect(doc.getElementById("rights-and-availability")?.textContent).toContain("cannot lawfully be excluded or limited");
    expect(doc.body.textContent).not.toMatch(/\$40|\$1\b|VAT excluded|exclusive jurisdiction of.*Tel Aviv/i);
  });

  it("includes both documents in the shared homepage footer as local, same-tab links", async () => {
    const { router } = await legalDocument("/");
    const html = renderToString(<RouterContextProvider router={router}><SiteFooter /></RouterContextProvider>);
    const doc = new DOMParser().parseFromString(html, "text/html");
    const links = [...doc.querySelectorAll('footer nav[aria-label="Legal"] a')];
    expect(links.map(link => [link.textContent, link.getAttribute("href")])).toEqual([
      ["Privacy Policy", "/privacy-policy/"], ["Terms of Use", "/terms-of-use/"],
    ]);
    expect(links.every(link => !link.hasAttribute("target"))).toBe(true);
  });
});
