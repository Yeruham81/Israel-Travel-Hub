/** Staging origin used for canonicals. Override with VITE_CANONICAL_ORIGIN at launch. */
export const CANONICAL_ORIGIN: string =
  (import.meta.env["VITE_CANONICAL_ORIGIN"] as string | undefined) ||
  "https://id-preview--7cd7aae9-57c0-4ced-b1fa-2f0691483fee.lovable.app";

/** Staging: keep every page out of search until launch is explicitly requested. */
export const INDEXABLE = (import.meta.env["VITE_INDEXABLE"] as string | undefined) === "true";

export const SITE_NAME = "Israel Taxi & Travel";

export type Crumb = { name: string; path: string };

export function breadcrumbLd(crumbs: Crumb[]) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: CANONICAL_ORIGIN + c.path })),
    }),
  };
}

export function pageMeta(opts: { title: string; description: string; path: string; type?: string; crumbs?: Crumb[] }) {
  const url = CANONICAL_ORIGIN + opts.path;
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { name: "robots", content: INDEXABLE ? "index,follow" : "noindex,nofollow" },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:type", content: opts.type ?? "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: opts.crumbs ? [breadcrumbLd(opts.crumbs)] : [],
  };
}
