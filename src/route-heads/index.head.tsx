import lcpHeroMobile from "@/assets/home/hero-jerusalem-psi-mobile.webp";
import lcpHeroMedium from "@/assets/home/hero-jerusalem-medium.webp";
import lcpHeroLarge from "@/assets/home/hero-jerusalem-large.webp";
import { CANONICAL_ORIGIN, SITE_NAME, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";
import { Route } from "../routes/index";

export const routeHead = () => {
    const meta = pageMeta({
      title: "Israel Travel Guides: Airport Transfers, Tours, Hotels & Attractions",
      description: "Plan Israel airport transfers, tours, shore excursions, accommodation and attractions with practical local travel guides and clear booking options.",
      path: "/",
    });
    // HTML head discovery rather than waiting for the <picture> far below the
    // global navigation. The media constraints match HeroCarousel's sources:
    // the browser fetches ONE asset at the viewport's appropriate size.
    return {
      ...meta,
      scripts: [...meta.scripts, jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "@id": CANONICAL_ORIGIN + "/#website",
            url: CANONICAL_ORIGIN + "/",
            name: SITE_NAME,
            inLanguage: "en",
            publisher: { "@id": CANONICAL_ORIGIN + "/#organization" },
          },
          {
            "@type": "Organization",
            "@id": CANONICAL_ORIGIN + "/#organization",
            name: SITE_NAME,
            url: CANONICAL_ORIGIN + "/",
            description: "Private airport transfers, travel planning and practical Israel travel guides.",
          },
          authorLd(),
        ],
      })],
      links: [
        ...meta.links,
        { rel: "preload", as: "image", type: "image/webp", href: lcpHeroMobile, media: "(max-width: 767px)", fetchPriority: "high" },
        { rel: "preload", as: "image", type: "image/webp", href: lcpHeroMedium, media: "(min-width: 768px) and (max-width: 1800px)", fetchPriority: "high" },
        { rel: "preload", as: "image", type: "image/webp", href: lcpHeroLarge, media: "(min-width: 1801px)", fetchPriority: "high" },
      ],
    };
  };