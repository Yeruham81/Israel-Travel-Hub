import {
  tourCategories,
  tourCategoryPaths,
  toursHubHero,
  toursHubDescription,
  toursHubTitle,
} from "@/data/tours";
import { CANONICAL_ORIGIN, jsonLd, pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";

const hero = toursHubHero;
export const routeHead = () => {
  const meta = pageMeta({
    title: `${toursHubTitle} | Israel Taxi & Travel`,
    description: toursHubDescription,
    path: "/tours/",
    image: hero.src,
    imageAlt: hero.alt,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Tours & day trips", path: "/tours/" },
    ],
  });
  return {
    ...meta,
    scripts: [
      ...meta.scripts,
      jsonLd({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: toursHubTitle,
        description: toursHubDescription,
        url: CANONICAL_ORIGIN + "/tours/",
        author: authorLd(),
        mainEntity: {
          "@type": "ItemList",
          itemListElement: tourCategories.map((category, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: category.title,
            url: CANONICAL_ORIGIN + tourCategoryPaths[category.id],
          })),
        },
      }),
    ],
  };
};
