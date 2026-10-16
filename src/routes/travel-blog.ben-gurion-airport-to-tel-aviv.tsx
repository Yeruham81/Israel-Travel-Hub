import { createFileRoute } from "@tanstack/react-router";
import { ExtLink } from "@/components/Layout";
import { Checklist, EndCta, FaqList, GuideHeader, OnThisPage, ProviderSection, RelatedLinks, Section, SourceList } from "@/components/Guide";
import { getSource, linksForPage } from "@/data/registry";
import { pageMeta } from "@/lib/site";

const PATH = "/travel-blog/ben-gurion-airport-to-tel-aviv/";
const TITLE = "Ben Gurion Airport to Tel Aviv: taxis, transfers & train";

export const Route = createFileRoute("/travel-blog/ben-gurion-airport-to-tel-aviv")({
  head: () =>
    pageMeta({
      title: TITLE,
      description: "Getting from Ben Gurion Airport (TLV) to Tel Aviv and Jaffa: the licensed taxi rank, pre-booked transfers, the train and what to confirm before you book.",
      path: PATH,
      type: "article",
      crumbs: [
        { name: "Home", path: "/" },
        { name: "Transfers", path: "/transfers/" },
        { name: "Ben Gurion Airport", path: "/transfers/ben-gurion-airport/" },
        { name: "Tel Aviv", path: PATH },
      ],
    }),
  component: TelAvivRoute,
});

const sections = [
  ["quick-answer", "Quick answer"],
  ["arrival", "Arrival & pickup"],
  ["areas", "Tel Aviv drop-offs"],
  ["train", "Train"],
  ["book", "Booking options"],
  ["faq", "FAQ"],
  ["sources", "Sources"],
] as const;

const faqs = [
  { q: "Is there a fixed price to Tel Aviv?", a: "We don't publish one for this route. Licensed airport taxis are metered, and pre-booked providers quote for your address, time and party. Compare quotes on the same basis (per vehicle, luggage, time of day)." },
  { q: "Taxi rank or pre-booked transfer?", a: "The rank operates around the clock and suits small parties travelling light. Pre-book for late-night arrivals, child seats, groups or lots of luggage, or if you want a named meeting point." },
  { q: "Can I take the train to Tel Aviv?", a: "Israel Railways serves the airport and several Tel Aviv stations. Check rail.co.il for your exact date — service changes on Shabbat and holidays — and plan the last leg to your hotel." },
  { q: "What about Jaffa or the beachfront hotels?", a: "Give the full address. Beachfront streets and Old Jaffa's lanes can have restricted access, so confirm the drop-off point with your hotel and driver." },
  { q: "Arriving on Friday evening or Saturday?", a: "Public transport is limited during Shabbat. The taxi rank still operates; a pre-booked transfer gives certainty. Ask providers about weekend surcharges." },
];

function TelAvivRoute() {
  const links = linksForPage("tlv-telaviv");
  return (
    <main>
      <GuideHeader
        crumbs={[{ name: "Home", to: "/" }, { name: "Transfers", to: "/transfers/" }, { name: "Ben Gurion Airport", to: "/transfers/ben-gurion-airport/" }, { name: "Tel Aviv", to: PATH }]}
        eyebrow="Airport transfer guide · TLV → Tel Aviv"
        title={TITLE}
        intro="Tel Aviv is the closest big city to Ben Gurion Airport. Your main choices are a licensed taxi from the official rank, a pre-booked private transfer, or the train plus a short last leg."
      />
      <OnThisPage sections={sections} />
      <article className="mx-auto max-w-5xl px-4">
        <Section id="quick-answer" title="Quick answer">
          <p>For most small parties the <strong>licensed taxi rank</strong> is the simplest option: it runs around the clock on a metered fare (<ExtLink href={getSource("iaa-directions").url}>IAA</ExtLink>). <strong>Pre-book</strong> if you land late, need child seats, travel as a group or want a fixed quote in advance. The <strong>train</strong> can work for light travellers when it runs on your date.</p>
          <p>Journey time depends heavily on traffic, especially at weekday rush hours, so don't plan tight onward connections.</p>
        </Section>

        <Section id="arrival" title="Arrival and pickup">
          <p>The Israel Airports Authority lists the licensed taxi rank at <strong>Terminal 3, ground floor, Exit 03</strong>, and at Terminal 1 by the domestic arrivals exit, with a free shuttle between terminals. A pre-booked driver meets you where your confirmation says.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Checklist title="Before you fly" items={["Save your hotel address in English and Hebrew", "Send your flight number if the provider asks", "Request child seats in writing", "Note the provider's phone number offline"]} />
            <Checklist title="What a quote should state" items={["Total price and currency", "Per vehicle or per person", "Waiting time after landing", "Night / weekend / holiday surcharges", "Cancellation and delay policy"]} />
          </div>
        </Section>

        <Section id="areas" title="Getting to your Tel Aviv address">
          <ul>
            <li><strong>Beachfront hotels:</strong> one-way streets and drop-off bays vary; ask your hotel for the best entrance.</li>
            <li><strong>Old Jaffa and the port:</strong> lanes are narrow and partly pedestrian, so confirm the nearest drivable point.</li>
            <li><strong>Neve Tzedek and Florentin:</strong> tight streets — share a map pin with your driver.</li>
            <li><strong>Rental apartments:</strong> get the full building entrance and access code before landing.</li>
          </ul>
        </Section>

        <Section id="train" title="Train and alternatives">
          <p>Israel Railways connects the airport with Tel Aviv's stations. Check the official <ExtLink href="https://www.rail.co.il/">Israel Railways</ExtLink> site for your exact date, including Shabbat and holidays, and plan how you'll reach your accommodation from the station. Our <ExtLink guide href="https://www.israel-taxi.com/travel-blog/getting-around-israel/">getting around Israel</ExtLink> article covers buses and driving.</p>
        </Section>

        <ProviderSection
          title="Booking options"
          intro="Prices are set on each provider's site for your date and party. We don't show a published fare for this route."
          links={links}
          pageId="tlv-telaviv"
        />
        <FaqList faqs={faqs} />
        <SourceList ids={["iaa-directions", "gett-airport", "moshe-airport-transfers", "intui-airport", "gettransfer-home", "israel-rail"]} />
        <RelatedLinks items={[
          { label: "Hotels in Tel Aviv", to: "/travel-blog/where-to-stay-in-tel-aviv/" },
          { label: "Airport to Jerusalem", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" },
          { label: "Caesarea day trip", to: "/attractions/caesarea/" },
          { label: "Car rental", to: "/car-rental/" },
        ]} />
        <EndCta title="Ready to book your ride?" links={links} pageId="tlv-telaviv" />
      </article>
    </main>
  );
}
