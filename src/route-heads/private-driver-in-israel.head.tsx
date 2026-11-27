import { privateDriverHero } from "@/data/privateDriver";
import { pageMeta } from "@/lib/site";

export const routeHead = () => pageMeta({
    title: "Private driver in Israel: intercity transfers and day hire",
    description: "Hire a private driver in Israel for hotel-to-hotel journeys, full-day itineraries and multiple stops. Share your route and request a written quote.",
    path: "/private-driver-in-israel/",
    image: privateDriverHero.src,
    imageAlt: privateDriverHero.alt,
    crumbs: [{ name: "Home", path: "/" }, { name: "Private driver", path: "/private-driver-in-israel/" }],
  });