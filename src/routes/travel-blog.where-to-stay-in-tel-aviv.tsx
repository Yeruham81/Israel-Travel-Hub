import { createFileRoute } from "@tanstack/react-router";
import { CityStayPage } from "@/components/CityStayPage";
import { cityStayGuides } from "@/data/content";
import { hotelGuideMeta } from "@/lib/landing-schema";
import { neighborhoodGuidesForCity } from "@/data/content";

const g = cityStayGuides.telaviv;

export const Route = createFileRoute("/travel-blog/where-to-stay-in-tel-aviv")({
  head: () => hotelGuideMeta(g, g.city, neighborhoodGuidesForCity(g.id)[0]?.photo.src || ""),
  component: StayTelAviv,
});

function StayTelAviv() {
  return <CityStayPage g={g} />;
}
