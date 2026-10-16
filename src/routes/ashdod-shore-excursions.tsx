import { createFileRoute } from "@tanstack/react-router";
import ashdod from "@/assets/home/ashdod-port.webp";
import { ExtLink } from "@/components/Layout";
import { PortPage } from "@/components/PortPage";
import { getSource } from "@/data/registry";
import { pageMeta } from "@/lib/site";

const PATH = "/ashdod-shore-excursions/";
const TITLE = "Ashdod shore excursions: planning a day ashore";

export const Route = createFileRoute("/ashdod-shore-excursions")({
  head: () =>
    pageMeta({
      title: `${TITLE} — Israel Taxi & Travel`,
      description: "Plan a shore excursion from Ashdod Port: Jerusalem, Tel Aviv/Jaffa or Masada and the Dead Sea, timing around all-aboard, driver vs guide, and what to confirm.",
      path: PATH,
      type: "article",
      crumbs: [{ name: "Home", path: "/" }, { name: "Shore excursions", path: "/shore-excursions/" }, { name: "From Ashdod Port", path: PATH }],
    }),
  component: Ashdod,
});

function Ashdod() {
  return (
    <PortPage
      path={PATH}
      pageId="shore-ashdod"
      port="Ashdod"
      title={TITLE}
      intro="Published excursion options from Ashdod Port reach Jerusalem, the Tel Aviv–Jaffa coast and Masada and the Dead Sea — whether one is feasible depends on your ship's port-call hours."
      image={{ src: ashdod, alt: "Aerial view of Ashdod Port and its breakwater on the Mediterranean" }}
      overview={<>
        <p>Ashdod's port is a working harbour on the southern coast. From here, the published day options spread between Jerusalem inland, the Tel Aviv–Jaffa coast to the north, and a long desert day to Masada and the Dead Sea.</p>
        <p>Road time is the main constraint: pick one region and leave a buffer for the drive back rather than trying to combine distant sites.</p>
      </>}
      itineraryNote={<>Suggested itineraries published by local operators for Ashdod calls. Whether one suits you depends on your ship's actual hours ashore — confirm with the provider.</>}
      itineraries={[
        { name: "Classical Jerusalem", text: "Old City highlights and viewpoints, published as a day option from Ashdod. Plan for walking and modest dress at holy sites." },
        { name: "Jerusalem and Bethlehem", text: "A combined day adding the Church of the Nativity. Carry your passport and check current crossing requirements." },
        { name: "Tel Aviv & Jaffa", text: "Old Jaffa's port and lanes plus the Tel Aviv seafront — a shorter, more relaxed day." },
        { name: "Masada & the Dead Sea", text: "Desert fortress by cable car and a float in the Dead Sea. A long day; only realistic with a long port call." },
      ]}
      providerIntro={<>Moshe Barak's business advertises Ashdod car-and-driver excursions (<ExtLink href={getSource("owner-ashdod-shore").url}>operator page</ExtLink>), with the itinerary and price agreed by inquiry. The combined Jerusalem and Bethlehem day named in the itinerary ideas above is a separate product published by Bein Harim from Ashdod Port (<ExtLink href={getSource("beinharim-ashdod-jlm-bethlehem").url}>operator page</ExtLink>), not part of that car-and-driver offer. No prices or availability are shown here.</>}
      faqs={[
        { q: "Can I see Jerusalem from Ashdod in one day?", a: "It can be — it's a published option for Ashdod calls. How much you see depends on your hours ashore and traffic, so plan the day backwards from all-aboard." },
        { q: "Is Masada realistic from Ashdod?", a: "It's a long round trip. Ask the provider whether it fits your exact disembarkation and all-aboard times before choosing it." },
        { q: "Will the driver meet me at the ship?", a: "Meeting points depend on the operator, your berth and port procedures. Confirm the exact meeting point in writing." },
        { q: "Is a guide included with a private driver?", a: "Not necessarily. Ask whether you're booking a driver only or a licensed tour guide, and what it costs to add one." },
        { q: "What if my ship arrives late?", a: "Terms differ by provider. Ask how they handle delays and cancelled calls, and what refund applies." },
      ]}
      sourceIds={["owner-ashdod-shore", "beinharim-ashdod-jlm-bethlehem"]}
      related={[
        { label: "Shore excursions from Haifa Port", to: "/haifa-shore-excursions/" },
        { label: "All shore excursions", to: "/shore-excursions/" },
        { label: "Bethlehem tours guide", to: "/tours/bethlehem-from-jerusalem/" },
        { label: "Masada visit & tickets", to: "/travel-blog/masada/" },
      ]}
    />
  );
}
