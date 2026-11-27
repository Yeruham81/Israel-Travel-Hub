import { capernaumSite } from "@/data/capernaumSite";
import { tabghaSite } from "@/data/tabghaSite";
import { mountBeatitudesSite } from "@/data/mountBeatitudesSite";
import { mountTaborSite } from "@/data/mountTaborSite";
import { roshHanikraSite } from "@/data/roshHanikraSite";
import { deadSeaAttractionsUpdatedAt } from "@/data/deadSeaAttractionsGuide";
import { telAvivAttractionsUpdatedAt } from "@/data/telAvivAttractionsGuide";
import { attractionGuides } from "@/data/attractionGuides";
import { attractionPath, isRegionalOverview, type AttractionId } from "@/data/attractionGuideTypes";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";

export function attractionMeta(id: AttractionId) {
  const a = attractionGuides[id];
  const path = attractionPath(id);
  const parent = isRegionalOverview(id)
    ? { name: "Travel guides", path: "/travel-blog/" }
    : { name: "Attractions", path: "/attractions/" };
  const base = pageMeta({
    title: a.title,
    description: a.description,
    path,
    type: "article",
    crumbs: [{ name: "Home", path: "/" }, parent, { name: a.title, path }],
    ...(a.image ? { image: a.image.src, imageAlt: a.image.alt } : {}),
  });
  const url = CANONICAL_ORIGIN + path;
  return {
    ...base,
    scripts: [
      ...base.scripts,
      jsonLd({
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": url + "#article",
        mainEntityOfPage: url,
        headline: a.title,
        description: a.description,
        inLanguage: "en",
        dateModified:
          id === "attractions-in-tel-aviv"
            ? telAvivAttractionsUpdatedAt
            : id === "dead-sea-attractions"
              ? deadSeaAttractionsUpdatedAt
              : id === "capernaum"
                ? capernaumSite.updatedAt
                : id === "tabgha"
                  ? tabghaSite.updatedAt
                  : id === "mount-of-beatitudes"
                    ? mountBeatitudesSite.updatedAt
                    : id === "mount-tabor"
                      ? mountTaborSite.updatedAt
                      : id === "rosh-hanikra"
                        ? roshHanikraSite.updatedAt
                        : a.region === "Jerusalem"
                          ? "2026-10-24"
                          : "2026-10-18",
        author: authorLd(),
        publisher: { "@type": "Organization", name: SITE_NAME, url: CANONICAL_ORIGIN },
        ...(a.image ? { image: new URL(a.image.src, CANONICAL_ORIGIN).href } : {}),
        citation: a.official.map((o) => o.url),
      }),
    ],
  };
}
