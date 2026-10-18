import { createFileRoute } from "@tanstack/react-router";
import { HotelDestinationPage } from "@/components/HotelDestinationPage";
import { tiberiasStayGuide as g } from "@/data/content";
import { hotelGuideMeta } from "@/lib/landing-schema";

export const Route = createFileRoute("/travel-blog/best-hotels-in-tiberias")({
  head: () => hotelGuideMeta(g, g.name, g.photo.src),
  component: StayTiberias,
});

function StayTiberias() {
  return <HotelDestinationPage guide={g} />;
}
