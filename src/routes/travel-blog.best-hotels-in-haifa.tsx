import { createFileRoute } from "@tanstack/react-router";
import { HotelDestinationPage } from "@/components/HotelDestinationPage";
import { haifaStayGuide as guide } from "@/data/content";
import { hotelGuideMeta } from "@/lib/landing-schema";

export const Route = createFileRoute("/travel-blog/best-hotels-in-haifa")({
  head: () => hotelGuideMeta(guide, guide.name, guide.photo.src),
  component: () => <HotelDestinationPage guide={guide} />,
});
