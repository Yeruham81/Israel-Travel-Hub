import { describe, expect, it } from "vitest";
import { routeHead } from "@/route-heads/index.head";
import { authorLd } from "@/lib/author";
import {
  CANONICAL_ORIGIN,
  SITE_NAME,
  jsonLd,
  organizationLd,
  organizationPublisherLd,
} from "@/lib/site";
import { mosheBarakAuthor } from "@/data/site-identity";

describe("canonical organization identity", () => {
  it("includes the approved profile, founder, country and logo in the homepage graph", () => {
    const graph = routeHead().scripts.flatMap((script) => JSON.parse(script.children)["@graph"] ?? []);
    const organizations = graph.filter((node) => node["@type"] === "Organization");
    expect(organizations).toHaveLength(1);
    expect(organizations[0]).toEqual(organizationLd());
    expect(organizations[0]).toMatchObject({
      name: SITE_NAME,
      sameAs: [mosheBarakAuthor.reviewsUrl],
      founder: { "@id": authorLd()["@id"] },
      areaServed: { "@type": "Country", name: "Israel" },
      logo: CANONICAL_ORIGIN + "/images/organization-logo.webp",
    });
    expect(graph.find((node) => node["@type"] === "WebSite").publisher["@id"]).toBe(
      organizations[0]["@id"],
    );
  });

  it("uses the same identity for legacy Article publisher declarations", () => {
    const article = {
      "@type": "Article",
      publisher: { "@type": "Organization", name: SITE_NAME, url: CANONICAL_ORIGIN },
    };
    expect(JSON.parse(jsonLd(article).children).publisher).toEqual(organizationPublisherLd());
  });

  it("does not rewrite a third-party organization", () => {
    const publisher = { "@type": "Organization", name: "Other publisher", url: "https://example.com" };
    expect(JSON.parse(jsonLd({ publisher }).children).publisher).toEqual(publisher);
  });

  it("keeps preview identity URLs consistent with the preview origin", () => {
    const preview = "https://preview.example.com";
    const organization = organizationLd(preview);
    expect(organization["@id"]).toBe(preview + "/#organization");
    expect(organization.founder["@id"]).toBe(preview + "/about-me/#moshe-barak");
    expect(organization.logo).toBe(preview + "/images/organization-logo.webp");
  });
});
