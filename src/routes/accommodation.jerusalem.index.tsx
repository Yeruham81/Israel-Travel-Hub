import { createFileRoute } from "@tanstack/react-router";
import { JerusalemStayHub } from "@/components/JerusalemStayHub";
import { cityStayGuides, jerusalemAreaGuides } from "@/data/content";
import { hotelGuideMeta } from "@/lib/landing-schema";
import jerusalemHeroPhoto from "@/assets/home/hero-refresh-jerusalem-jaffa-gate-v4-medium.webp";
const g = cityStayGuides.jerusalem;
export const Route = createFileRoute("/accommodation/jerusalem/")({
 head: () => hotelGuideMeta(g, g.city, jerusalemHeroPhoto),
 component: () => <JerusalemStayHub g={g} areas={jerusalemAreaGuides} />,
});
