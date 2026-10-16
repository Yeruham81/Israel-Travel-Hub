import { createFileRoute } from "@tanstack/react-router";
import haifa from "@/assets/home/haifa-port.webp";
import { ExtLink } from "@/components/Layout";
import { PortPage } from "@/components/PortPage";
import { getSource } from "@/data/registry";
import { pageMeta } from "@/lib/site";

const PATH = "/haifa-shore-excursions/";
const TITLE = "Haifa shore excursions: planning a day ashore";

export const Route = createFileRoute("/haifa-shore-excursions")({
  head: () =>
    pageMeta({
      title: `${TITLE} — Israel Taxi & Travel`,
      description: "Plan a shore excursion from Haifa Port: Akko and Rosh Hanikra, Nazareth and the Sea of Galilee, Tel Aviv/Jaffa or Jerusalem, with timing and booking checks.",
      path: PATH,
      type: "article",
      crumbs: [{ name: "Home", path: "/" }, { name: "Shore excursions", path: "/shore-excursions/" }, { name: "From Haifa Port", path: PATH }],
    }),
  component: Haifa,
});

function Haifa() {
  return (
    <PortPage
      path={PATH}
      pageId="shore-haifa"
      port="Haifa"
      title={TITLE}
      intro="Haifa sits beneath Mount Carmel in the north. Nearby Akko, the Galilee and the coast make for shorter days; Jerusalem is possible but much further."
      image={{ src: haifa, alt: "Haifa Port and Haifa Bay seen from Mount Carmel" }}
      overview={<>
        <p>Haifa's port is close to the city centre and the Carmel slopes. The north offers several options within easier reach than from the southern ports — crusader-era Akko, the grottoes at Rosh Hanikra, and Nazareth with the Sea of Galilee.</p>
        <p>Tel Aviv–Jaffa and Jerusalem are further south, so they take a bigger share of your time ashore. Check feasibility against your ship's exact hours.</p>
      </>}
      itineraryNote={<>Suggested itineraries published by local operators for Haifa calls. Confirm with the provider that your chosen day fits your port-call time.</>}
      itineraries={[
        { name: "Akko & Rosh Hanikra", text: "Akko's old city and harbour, then the sea grottoes on the northern coast." },
        { name: "Nazareth & the Sea of Galilee", text: "Nazareth's churches and lakeside sites around the Sea of Galilee." },
        { name: "Tel Aviv & Jaffa", text: "Old Jaffa and the Tel Aviv seafront, with a longer drive each way." },
        { name: "Jerusalem (and Bethlehem)", text: "The longest option from Haifa. Some operators offer a combined Jerusalem and Bethlehem day; carry your passport." },
      ]}
      providerIntro={<>Moshe Barak's business publishes the Haifa car-and-driver itineraries above (<ExtLink href={getSource("owner-haifa-shore").url}>operator page</ExtLink>); itinerary and price are agreed directly with him. Bein Harim lists a separate Haifa-port Jerusalem and Bethlehem product (<ExtLink href={getSource("beinharim-haifa-jlm-bethlehem").url}>operator page</ExtLink>). No prices or availability are shown here.</>}
      faqs={[
        { q: "What's the easiest excursion from Haifa?", a: "Northern options such as Akko or the Galilee involve less road time than Jerusalem. Choose based on your hours ashore and interests." },
        { q: "Can I reach Jerusalem from Haifa?", a: "Yes, but it's a long day with much of it on the road. Confirm with the provider that it fits your disembarkation and all-aboard times." },
        { q: "Where will I meet the driver?", a: "It depends on the operator and your berth. Confirm the exact meeting point in writing before the day." },
        { q: "Are entrance fees included?", a: "Ask each provider which site admissions, if any, are included in the price." },
        { q: "What if my port call changes?", a: "Ask about the provider's policy for late arrivals and cancelled calls before you book." },
      ]}
      sourceIds={["owner-haifa-shore", "beinharim-haifa-jlm-bethlehem"]}
      related={[
        { label: "Shore excursions from Ashdod Port", to: "/ashdod-shore-excursions/" },
        { label: "All shore excursions", to: "/shore-excursions/" },
        { label: "Caesarea visit planning", to: "/attractions/caesarea/" },
        { label: "Hotels in Tiberias", to: "/travel-blog/best-hotels-in-tiberias/" },
      ]}
    />
  );
}
