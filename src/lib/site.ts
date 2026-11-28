import defaultSharePhoto from "@/assets/home/jerusalem-old-city.webp";
import { mosheBarakAuthor } from "@/data/site-identity";

/** Only the permanent www domain may be indexed, even if a preview is misconfigured. */
export const PRODUCTION_CANONICAL_ORIGIN = "https://www.israel-taxi.com";

/** Pure launch configuration: no publishing or indexing changes occur here. */
export function siteConfig(env: { VITE_CANONICAL_ORIGIN?: string; VITE_INDEXABLE?: string }) {
  const configuredOrigin = (env.VITE_CANONICAL_ORIGIN || "").trim().replace(/\/+$/, "");
  const origin = configuredOrigin || PRODUCTION_CANONICAL_ORIGIN;
  // A default canonical address is not permission to index a local/preview build.
  return {
    origin,
    indexable: env.VITE_INDEXABLE === "true" && configuredOrigin === PRODUCTION_CANONICAL_ORIGIN,
  };
}

export const SITE_CONFIG = siteConfig({
  VITE_CANONICAL_ORIGIN: import.meta.env["VITE_CANONICAL_ORIGIN"] || "",
  VITE_INDEXABLE: import.meta.env["VITE_INDEXABLE"] || "",
});
export const CANONICAL_ORIGIN = SITE_CONFIG.origin;
export const INDEXABLE = SITE_CONFIG.indexable;

export const SITE_NAME = "Israel Taxi & Travel";
export const ORGANIZATION_LOGO_PATH = "/images/organization-logo.webp";

export function organizationPublisherLd(origin = CANONICAL_ORIGIN) {
  return {
    "@type": "Organization",
    "@id": `${origin}/#organization`,
    name: SITE_NAME,
    url: `${origin}/`,
  };
}

export function authorEntityId(origin = CANONICAL_ORIGIN) {
  return `${origin}/about-me/#moshe-barak`;
}

export function organizationLd(origin = CANONICAL_ORIGIN) {
  return {
    ...organizationPublisherLd(origin),
    description: "Private airport transfers, travel planning and practical Israel travel guides.",
    sameAs: [mosheBarakAuthor.reviewsUrl],
    founder: { "@id": authorEntityId(origin) },
    areaServed: { "@type": "Country", name: "Israel" },
    logo: `${origin}${ORGANIZATION_LOGO_PATH}`,
  };
}

export type Crumb = { name: string; path: string };

/** Escape HTML-sensitive characters even when structured text contains markup. */
export function jsonLd(value: unknown) {
  return {
    type: "application/ld+json",
    // Give every existing site-publisher declaration the same canonical entity ID.
    // External publishers and reference-only nodes are deliberately left untouched.
    children: JSON.stringify(value, (key, item) => {
      if (key === "publisher" && item?.["@type"] === "Organization" && item.name === SITE_NAME) {
        return { ...item, ...organizationPublisherLd() };
      }
      return item;
    })
      .replaceAll("<", "\\u003c")
      .replaceAll(">", "\\u003e")
      .replaceAll("&", "\\u0026"),
  };
}

export function breadcrumbLd(crumbs: Crumb[], origin = CANONICAL_ORIGIN) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: origin + c.path,
    })),
  });
}

export function pageMeta(
  opts: {
    title: string;
    description: string;
    path: string;
    type?: string;
    crumbs?: Crumb[];
    image?: string;
    imageAlt?: string;
  },
  config = SITE_CONFIG,
) {
  const url = config.origin + opts.path;
  const shareImage = new URL(opts.image || defaultSharePhoto, config.origin).href;
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { name: "robots", content: config.indexable ? "index,follow" : "noindex,nofollow" },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:type", content: opts.type ?? "website" },
      { property: "og:url", content: url },
      ...(shareImage
        ? [
            { property: "og:image", content: shareImage },
            ...(opts.imageAlt ? [{ property: "og:image:alt", content: opts.imageAlt }] : []),
            { name: "twitter:image", content: shareImage },
          ]
        : []),
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: opts.crumbs ? [breadcrumbLd(opts.crumbs, config.origin)] : [],
  };
}
