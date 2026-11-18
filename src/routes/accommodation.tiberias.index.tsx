import { createFileRoute } from "@tanstack/react-router";
import { HotelDestinationPage } from "@/components/HotelDestinationPage";
import { tiberiasStayGuide } from "@/data/content";
import { hotelGuideMeta } from "@/lib/landing-schema";
const g = tiberiasStayGuide;
export const Route = createFileRoute("/accommodation/tiberias/")({
 head: () => hotelGuideMeta(g, g.name, g.photo.src),
 component: () => <HotelDestinationPage guide={g} />,
});
