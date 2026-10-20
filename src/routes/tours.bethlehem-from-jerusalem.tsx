import { Link, createFileRoute } from "@tanstack/react-router";
import { ExtLink } from "@/components/Layout";
import { Checklist, EndCta, FaqList, GuideHeader, OnThisPage, ProviderSection, RelatedLinks, Section, SourceList } from "@/components/Guide";
import { getSource, linksForPage } from "@/data/registry";
import { pageMeta } from "@/lib/site";

const PATH = "/tours/bethlehem-from-jerusalem/";
const TITLE = "Bethlehem tours from Jerusalem: how to choose";

export const Route = createFileRoute("/tours/bethlehem-from-jerusalem")({
  head: () =>
    pageMeta({
      title: TITLE,
      description: "How to compare Bethlehem tours from Jerusalem: itinerary, shared vs private, pickup, language, admissions, cancellation and current travel requirements.",
      path: PATH,
      type: "article",
      crumbs: [{ name: "Home", path: "/" }, { name: "Tours", path: "/tours/" }, { name: "Bethlehem from Jerusalem", path: PATH }],
    }),
  component: Bethlehem,
});

const sections = [
  ["overview", "Overview"],
  ["compare", "What to compare"],
  ["format", "Shared vs private"],
  ["requirements", "Travel requirements"],
  ["book", "Tour options"],
  ["faq", "FAQ"],
  ["sources", "Sources"],
] as const;

const faqs = [
  { q: "Is the Bein Harim tour Bethlehem-only?", a: "No. Its itinerary combines sites in Jerusalem and Bethlehem in one day. Check the operator's page for the current stops, pickup cities and dates." },
  { q: "Do I need my passport?", a: "Bring it. Bethlehem is reached via a checkpoint and requirements can change. Ask the operator what documents are needed for your nationality and date." },
  { q: "Are entrance fees included?", a: "It depends on the tour. Ask whether any site admissions are included and whether dress codes apply at religious sites." },
  { q: "Can I get a private tour?", a: "Yes — a private driver or private day trip lets you set your own stops and timing. Confirm whether a licensed guide is included and whether the vehicle can cross." },
  { q: "When is the best time to go?", a: "Mornings are usually calmer. Around Christmas and Easter sites are busier; book early and allow extra time at crossings." },
];

function Bethlehem() {
  const links = linksForPage("bethlehem");
  const bh = getSource("beinharim-jlm-bethlehem");
  return (
    <main>
      <GuideHeader
        crumbs={[{ name: "Home", to: "/" }, { name: "Tours", to: "/tours/" }, { name: "Bethlehem from Jerusalem", to: PATH }]}
        eyebrow="Tours & day trips · From Jerusalem"
        title={TITLE}
        intro="Bethlehem lies just south of Jerusalem, but tours vary a lot: some combine it with Jerusalem's Old City, some are private, and practical details like pickup, language and documents differ."
      />
      <OnThisPage sections={sections} />
      <article className="mx-auto max-w-5xl px-4">
        <Section id="overview" title="Planning a Bethlehem visit">
          <p>Most visitors come for the Church of the Nativity and Manger Square, often as a half or full day from Jerusalem. Going with a tour or private driver avoids arranging transport across the checkpoint yourself.</p>
          <p>Our <Link to="/travel-blog/jerusalem-to-bethlehem/" className="font-semibold text-primary underline">Jerusalem to Bethlehem guide</Link> explains the options for getting there independently.</p>
        </Section>

        <section id="compare" aria-labelledby="compare-h" className="mt-14">
          <h2 id="compare-h" className="text-3xl">What to compare between tours</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Checklist title="Itinerary" items={["Which sites, in which city, and for how long", "Whether Jerusalem stops are included", "Time inside sites vs on the road", "Shopping stops (and whether optional)"]} />
            <Checklist title="Logistics" items={["Pickup location and time", "Tour language", "Group size", "Return drop-off point"]} />
            <Checklist title="Costs" items={["What's included: admissions, guide, lunch", "Per person vs per group pricing", "Tips and extras"]} />
            <Checklist title="Terms" items={["Cancellation deadline", "What happens if the crossing is closed", "Dress code at religious sites"]} />
          </div>
        </section>

        <Section id="format" title="Shared or private?">
          <p><strong>Shared tours</strong> run on set dates with a fixed itinerary and group. They're often the simpler option for solo travellers and couples.</p>
          <p><strong>Private tours or drivers</strong> let you choose timing and stops and suit families or groups. Check whether you're getting a driver only or a licensed guide, and whether the vehicle and driver can take you across.</p>
        </Section>

        <Section id="requirements" title="Current travel requirements">
          <p>Requirements for crossing into Bethlehem can change at short notice. Carry your passport, and ask your operator what applies to your nationality on your travel date. Check your government's current travel advice before booking.</p>
        </Section>

        <ProviderSection
          title="Tour options"
          intro={<>The tour below is listed by the operator as a combined Jerusalem and Bethlehem itinerary, with pickup from several cities including Jerusalem (<ExtLink href={bh.url}>operator page</ExtLink>). Confirm date, pickup, language, travel requirements and availability with the operator.</>}
          links={links}
          pageId="bethlehem"
        />
        <FaqList faqs={faqs} />
        <SourceList ids={["beinharim-jlm-bethlehem", "owner-private-day-trips", "owner-bethlehem-guide"]} />
        <RelatedLinks items={[
          { label: "Hotels in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/" },
          { label: "All tours & day trips", to: "/tours/" },
          { label: "Masada visit & tickets", to: "/travel-blog/masada/" },
          { label: "Airport to Jerusalem", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" },
        ]} />
        <EndCta title="Ready to choose your tour?" links={links} pageId="bethlehem" />
      </article>
    </main>
  );
}
