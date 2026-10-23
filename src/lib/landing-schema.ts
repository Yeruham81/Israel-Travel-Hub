import { authorLd } from "@/lib/author";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta, type Crumb } from "@/lib/site";
import { publicSources } from "@/data/registry";

/** Individual hotel/neighborhood guide with the appropriate destination breadcrumb. */
export function hotelSubguideMeta(guide: { title: string; metaDescription: string; path: string }, destination: { name: string; path: string; reviewedAt?: string | undefined; sourceIds?: string[] }, label: string, image: string) {
  const crumbs: Crumb[] = [{ name: "Home", path: "/" }, { name: "Accommodation", path: "/accommodation/" }, { name: destination.name, path: destination.path }, { name: label, path: guide.path }];
  return hotelGuideMeta({ ...guide, ...(destination.reviewedAt ? { reviewedAt: destination.reviewedAt } : {}), sourceIds: destination.sourceIds || [] }, label, image, crumbs);
}


/** Metadata for the substantial hotel guides, not a product or live offer. */
export function hotelGuideMeta(guide: { title: string; metaDescription: string; path: string; reviewedAt?: string; sourceIds: string[] }, name: string, image: string, crumbsOverride?: Crumb[]) {
  const crumbs: Crumb[] = [{ name: "Home", path: "/" }, { name: "Accommodation", path: "/accommodation/" }, { name, path: guide.path }];
  const head = pageMeta({ title: guide.title, description: guide.metaDescription, path: guide.path, type: "article", crumbs: crumbsOverride || crumbs, image });
  const url = CANONICAL_ORIGIN + guide.path;
  return { ...head, scripts: [...head.scripts, jsonLd({
    "@context": "https://schema.org", "@type": "Article", "@id": `${url}#article`,
    headline: guide.title, description: guide.metaDescription, mainEntityOfPage: url, inLanguage: "en",
    ...(guide.reviewedAt ? { dateModified: guide.reviewedAt } : {}),
    author: authorLd(), publisher: { "@type": "Organization", name: SITE_NAME, url: CANONICAL_ORIGIN },
    image: new URL(image, CANONICAL_ORIGIN).href,
    citation: publicSources(guide.sourceIds).map((source) => source.url),
  })] };
}