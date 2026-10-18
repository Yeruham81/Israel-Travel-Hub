/** Pure launch configuration: no publishing or indexing changes occur here. */
export function siteConfig(env: { VITE_CANONICAL_ORIGIN?: string; VITE_INDEXABLE?: string }) {
  const origin = (env.VITE_CANONICAL_ORIGIN || "https://id-preview--7cd7aae9-57c0-4ced-b1fa-2f0691483fee.lovable.app").replace(/\/+$/, "");
  return { origin, indexable: env.VITE_INDEXABLE === "true" };
}

export const SITE_CONFIG = siteConfig({
  VITE_CANONICAL_ORIGIN: import.meta.env["VITE_CANONICAL_ORIGIN"] || "",
  VITE_INDEXABLE: import.meta.env["VITE_INDEXABLE"] || "",
});
export const CANONICAL_ORIGIN = SITE_CONFIG.origin;
export const INDEXABLE = SITE_CONFIG.indexable;

export const SITE_NAME = "Israel Taxi & Travel";

export type Crumb = { name: string; path: string };

/** Escape HTML-sensitive characters even when structured text contains markup. */
export function jsonLd(value: unknown) {
  return { type: "application/ld+json", children: JSON.stringify(value).replaceAll("<", "\\u003c").replaceAll(">", "\\u003e").replaceAll("&", "\\u0026") };
}

export function breadcrumbLd(crumbs: Crumb[], origin = CANONICAL_ORIGIN) {
  return jsonLd({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: origin + c.path })),
    });
}

export function pageMeta(opts: { title: string; description: string; path: string; type?: string; crumbs?: Crumb[]; image?: string; imageAlt?: string }, config = SITE_CONFIG) {
  const url = config.origin + opts.path;
  const shareImage = opts.image ? new URL(opts.image, config.origin).href : undefined;
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { name: "robots", content: config.indexable ? "index,follow" : "noindex,nofollow" },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:type", content: opts.type ?? "website" },
      { property: "og:url", content: url },
      ...(shareImage ? [
        { property: "og:image", content: shareImage },
        ...(opts.imageAlt ? [{ property: "og:image:alt", content: opts.imageAlt }] : []),
        { name: "twitter:image", content: shareImage },
      ] : []),
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: opts.crumbs ? [breadcrumbLd(opts.crumbs, config.origin)] : [],
  };
}
