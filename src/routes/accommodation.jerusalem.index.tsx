import { createFileRoute } from "@tanstack/react-router";
import { JerusalemStayHub } from "@/components/JerusalemStayHub";
import { cityStayGuides, jerusalemAreaGuides } from "@/data/content";
import { hotelGuideMeta } from "@/lib/landing-schema";
const g = cityStayGuides.jerusalem;
export const Route = createFileRoute("/accommodation/jerusalem/")({
 head: () => hotelGuideMeta(g, g.city, jerusalemAreaGuides[0]?.photo.src || ""),
 component: () => <JerusalemStayHub g={g} areas={jerusalemAreaGuides} />,
});
