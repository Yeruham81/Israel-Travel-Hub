import { getShorePort } from "@/data/shoreExcursions";
import cruisePortFeature from "@/assets/home/cruise-port-feature.webp";
import {
  shoreHubDescription,
  shoreHubSourceIds,
  shoreHubTitle,
  SHORE_EXCURSION_UPDATED_DATE,
} from "@/data/shoreHub";
import { publicSources, shorePorts } from "@/data/registry";
import { authorLd } from "@/lib/author";
import { CANONICAL_ORIGIN, jsonLd, pageMeta, SITE_NAME } from "@/lib/site";

const portIds = ["ashdod", "haifa"] as const;
const heroPhoto = {
  src: cruisePortFeature,
  alt: "Cruise passengers walking along a harbour quay toward a waiting vehicle",
  sourceUrl: "",
};
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Shore excursions", path: "/shore-excursions/" },
] as const;
export const routeHead = () => {
  const meta = pageMeta({
    title: "Israel shore excursions from Ashdod & Haifa cruise ports",
    description: shoreHubDescription,
    path: "/shore-excursions/",
    crumbs: [...crumbs],
    image: heroPhoto.src,
    imageAlt: heroPhoto.alt,
  });
  return {
    ...meta,
    scripts: [
      ...meta.scripts,
      jsonLd({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: shoreHubTitle,
        description: shoreHubDescription,
        url: CANONICAL_ORIGIN + "/shore-excursions/",
        inLanguage: "en",
        dateModified: SHORE_EXCURSION_UPDATED_DATE,
        author: authorLd(),
        publisher: { "@type": "Organization", name: SITE_NAME },
        image: new URL(heroPhoto.src, CANONICAL_ORIGIN).href,
        mainEntity: {
          "@type": "ItemList",
          name: "Israel cruise-port excursion guides",
          itemListElement: portIds.map((id, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "WebPage",
              name: getShorePort(id).title,
              url: CANONICAL_ORIGIN + shorePorts[id].path,
            },
          })),
        },
        citation: publicSources(shoreHubSourceIds).map((source) => source.url),
      }),
    ],
  };
};
