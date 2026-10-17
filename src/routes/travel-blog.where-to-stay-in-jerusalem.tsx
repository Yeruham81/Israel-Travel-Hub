import { createFileRoute } from "@tanstack/react-router";
import { CityStayPage } from "@/components/CityStayPage";
import { cityStayGuides } from "@/data/content";
import { hotelGuideMeta } from "@/lib/landing-schema";
import { neighborhoodGuidesForCity } from "@/data/content";

const g = cityStayGuides.jerusalem;

export const Route = createFileRoute("/travel-blog/where-to-stay-in-jerusalem")({
  head: () => hotelGuideMeta(g, g.city, neighborhoodGuidesForCity(g.id)[0]?.photo.src || ""),
  component: StayJerusalem,
});

function StayJerusalem() {
  return <CityStayPage g={g} />;
}
