import { createFileRoute } from "@tanstack/react-router";
import { HotelDestinationPage } from "@/components/HotelDestinationPage";
import { haifaStayGuide } from "@/data/content";
import { hotelGuideMeta } from "@/lib/landing-schema";
const g = haifaStayGuide;
export const Route = createFileRoute("/accommodation/haifa/")({
 head: () => hotelGuideMeta(g, g.name, g.photo.src),
 component: () => <HotelDestinationPage guide={g} />,
});
