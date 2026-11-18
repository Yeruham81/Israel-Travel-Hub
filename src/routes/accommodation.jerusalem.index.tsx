import { createFileRoute } from "@tanstack/react-router";
import { CityStayHub } from "@/components/CityStayHub";
import { cityStayGuides, jerusalemAreaGuides } from "@/data/content";
import { hotelGuideMeta } from "@/lib/landing-schema";
const g = cityStayGuides.jerusalem;
export const Route = createFileRoute("/accommodation/jerusalem/")({
 head: () => hotelGuideMeta(g, g.city, jerusalemAreaGuides[0]?.photo.src || ""),
 component: () => <CityStayHub g={g} areas={jerusalemAreaGuides} />,
});
