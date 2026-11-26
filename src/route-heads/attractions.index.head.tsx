import { attractionHubCards, attractionHubPhotos } from "@/data/attractionsHub";
import { CANONICAL_ORIGIN, jsonLd, pageMeta } from "@/lib/site";
import { Route } from "../routes/attractions.index";

const PATH = "/attractions/";
const TITLE = "Best attractions in Israel: places to visit & things to see";
const DESCRIPTION = "Explore Israel's individual attractions by region, including Jerusalem's Old City, Old Jaffa, Caesarea, Masada and sites across the Galilee and Negev.";
export const routeHead = () => {
    const meta = pageMeta({
      title: TITLE,
      description: DESCRIPTION,
      path: PATH,
      image: attractionHubPhotos.hero.src,
      imageAlt: attractionHubPhotos.hero.alt,
      crumbs: [{ name: "Home", path: "/" }, { name: "Attractions", path: PATH }],
    });
    return {
      ...meta,
      scripts: [
        ...meta.scripts,
        jsonLd({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: TITLE,
          description: DESCRIPTION,
          url: CANONICAL_ORIGIN + PATH,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: attractionHubCards.map((card, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: card.title,
              url: CANONICAL_ORIGIN + String(card.to),
            })),
          },
        }),
      ],
    };
  };