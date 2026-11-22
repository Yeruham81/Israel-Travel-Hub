import { createFileRoute } from "@tanstack/react-router";
import { CarRentalGuide } from "@/components/CarRentalGuide";
import { CAR_RENTAL_UPDATED, carRentalTitle, carRentalDescription, carRentalHero } from "@/data/carRentalGuide";
import { CANONICAL_ORIGIN, jsonLd, pageMeta } from "@/lib/site";

export const Route = createFileRoute("/car-rental")({
  head: () => {
    const head = pageMeta({ title: carRentalTitle, description: carRentalDescription, path: "/car-rental/",
      image: carRentalHero.src, imageAlt: carRentalHero.alt,
      crumbs: [{ name: "Home", path: "/" }, { name: "Car rental", path: "/car-rental/" }],
    });
    return { ...head, scripts: [...head.scripts, jsonLd({
      "@context": "https://schema.org", "@type": "Article", headline: carRentalTitle,
      description: carRentalDescription, dateModified: CAR_RENTAL_UPDATED,
      mainEntityOfPage: `${CANONICAL_ORIGIN}/car-rental/`,
      image: new URL(carRentalHero.src, CANONICAL_ORIGIN).href,
      author: { "@type": "Person", name: "Moshe Barak", url: `${CANONICAL_ORIGIN}/about-me/` },
    })] };
  },
  component: CarRentalGuide,
});
