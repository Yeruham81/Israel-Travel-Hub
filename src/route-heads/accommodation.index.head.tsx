import { accommodationDestinations } from "@/data/content";
import { CANONICAL_ORIGIN, jsonLd, pageMeta } from "@/lib/site";
import hotelRoomPhoto from "@/assets/home/hotel-room-feature.webp";

const destinations = accommodationDestinations;
export const routeHead = () => {
  const meta = pageMeta({
    title: "Hotels in Israel: where to stay by city, area and style",
    description:
      "Explore hotels in Jerusalem, Tel Aviv, Haifa, Tiberias and the Dead Sea, with neighborhood advice, hotel shortlists and practical booking tips.",
    path: "/accommodation/",
    image: hotelRoomPhoto,
    imageAlt: "A welcoming hotel guest room",
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Accommodation", path: "/accommodation/" },
    ],
  });
  return {
    ...meta,
    scripts: [
      ...meta.scripts,
      jsonLd({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Hotels in Israel",
        description: "Browse hotels and places to stay in Israel by destination.",
        url: CANONICAL_ORIGIN + "/accommodation/",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: destinations.map((destination, i) => ({
            "@type": "ListItem",
            position: i + 1,
            ...(destination.id === "eilat"
              ? { name: "Hotels in Eilat — coming soon" }
              : {
                  item: {
                    "@type": "WebPage",
                    name: destination.title,
                    url:
                      CANONICAL_ORIGIN + ("to" in destination ? destination.to : "/accommodation/"),
                  },
                }),
          })),
        },
      }),
    ],
  };
};
