import { createFileRoute } from "@tanstack/react-router";
import { CityStayHub } from "@/components/CityStayHub";
import { cityStayGuides, telAvivAreaGuides } from "@/data/content";
import { hotelGuideMeta } from "@/lib/landing-schema";
const g = cityStayGuides.telaviv;
export const Route = createFileRoute("/accommodation/tel-aviv/")({
 head: () => hotelGuideMeta(g, g.city, telAvivAreaGuides[0]?.photo.src || ""),
 component: () => <CityStayHub g={g} areas={telAvivAreaGuides} />,
});
