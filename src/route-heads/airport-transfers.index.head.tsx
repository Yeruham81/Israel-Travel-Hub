import { airportTransferPhotos } from "@/data/airportTransfers";
import { CANONICAL_ORIGIN, jsonLd, pageMeta } from "@/lib/site";

export const routeHead = () => {
  const head = pageMeta({
    title: "Ben Gurion Airport Transfers: Private Pickup & Drop-Off",
    description:
      "Arrange private airport transfers to or from Ben Gurion (TLV), including Jerusalem, Tel Aviv, Haifa and the Dead Sea. See pickup fares and request a quote.",
    path: "/airport-transfers/",
    image: airportTransferPhotos["other"]!.src,
    imageAlt: airportTransferPhotos["other"]!.alt,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Airport transfers", path: "/airport-transfers/" },
    ],
  });
  return {
    ...head,
    scripts: [
      ...head.scripts,
      jsonLd({
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": CANONICAL_ORIGIN + "/airport-transfers/#service",
        name: "Private Ben Gurion Airport transfers",
        description:
          "Private door-to-door pickups and drop-offs between Ben Gurion Airport and destinations in Israel.",
        serviceType: "Private airport transfer",
        provider: { "@type": "Person", name: "Moshe Barak", url: CANONICAL_ORIGIN + "/about-me/" },
        areaServed: { "@type": "Country", name: "Israel" },
        url: CANONICAL_ORIGIN + "/airport-transfers/",
      }),
    ],
  };
};
