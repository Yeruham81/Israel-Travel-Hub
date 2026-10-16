import type { LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Checklist, EndCta, FaqList, GuideHeader, OnThisPage, ProviderSection, RelatedLinks, Section, SourceList } from "@/components/Guide";
import { linksForPage } from "@/data/registry";

export type PortPageProps = {
  path: LinkProps["to"];
  pageId: string;
  port: string;
  title: string;
  intro: string;
  image: { src: string; alt: string };
  overview: ReactNode;
  itineraries: { name: string; text: string }[];
  itineraryNote: ReactNode;
  providerIntro: ReactNode;
  faqs: { q: string; a: string }[];
  sourceIds: string[];
  related: { label: string; to: LinkProps["to"]; note?: string }[];
};

const sections = [
  ["overview", "Overview"],
  ["itineraries", "Itinerary ideas"],
  ["timing", "Timing"],
  ["format", "Driver or guide"],
  ["check", "What to check"],
  ["book", "Excursion options"],
  ["faq", "FAQ"],
  ["sources", "Sources"],
] as const;

/** Information-first port page: planning sections precede the provider area. */
export function PortPage(p: PortPageProps) {
  const links = linksForPage(p.pageId);
  return (
    <main>
      <GuideHeader
        crumbs={[{ name: "Home", to: "/" }, { name: "Shore excursions", to: "/shore-excursions/" }, { name: `From ${p.port} Port`, to: p.path }]}
        eyebrow={`Shore excursions · ${p.port} Port`}
        title={p.title}
        intro={p.intro}
        image={p.image}
      />
      <OnThisPage sections={sections} />
      <article className="mx-auto max-w-5xl px-4">
        <Section id="overview" title={`Planning a day ashore from ${p.port}`}>{p.overview}</Section>

        <section id="itineraries" aria-labelledby="itineraries-h" className="mt-14">
          <h2 id="itineraries-h" className="text-3xl">Itinerary ideas</h2>
          <p className="mt-2 max-w-3xl text-muted-foreground">{p.itineraryNote}</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {p.itineraries.map((it) => (
              <li key={it.name} className="rounded-xl border bg-card p-5">
                <h3 className="font-serif text-xl">{it.name}</h3>
                <p className="mt-1.5 text-muted-foreground">{it.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <Section id="timing" title="Work back from your all-aboard time">
          <p>Before contacting anyone, have your <strong>ship name, port-call date, expected disembarkation time and all-aboard time</strong> to hand — they decide which itineraries are realistic. Ships sometimes change schedules, berths or tender arrangements, so check your cruise line's latest daily programme.</p>
          <p>Allow for passport and security procedures when leaving and re-entering the port, traffic on the way back, and a comfortable buffer before all-aboard. Ask each provider how they plan the return and what happens if there is a delay — terms differ between operators and products, and we can't confirm them for you.</p>
        </Section>

        <Section id="format" title="Private driver, licensed guide or shared tour?">
          <p><strong>Private car and driver:</strong> your own vehicle and timing. A driver can take you between sites but may not be permitted to guide inside them — ask whether a licensed tour guide is included or can be added.</p>
          <p><strong>Private guided tour:</strong> a licensed guide explains the sites; check whether the guide also drives or travels with a separate driver.</p>
          <p><strong>Shared/group excursion:</strong> a set itinerary with other passengers. Check group size, the meeting point and what is included.</p>
        </Section>

        <section id="check" aria-labelledby="check-h" className="mt-14">
          <h2 id="check-h" className="text-3xl">What to check before booking</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Checklist title="Meeting & return" items={["Exact meeting point for your berth or terminal", "How the provider tracks your arrival time (ask — don't assume)", "Planned return time vs your all-aboard time", "What happens if the ship is late or the call is cancelled"]} />
            <Checklist title="What's included" items={["Driver only or licensed guide", "Entrance fees and which sites", "Vehicle size for your party", "Per vehicle or per person price"]} />
            <Checklist title="Terms" items={["Cancellation deadline and refund terms", "Payment method and deposit", "Dress code at religious sites", "Passport needed for any crossing (e.g. Bethlehem)"]} />
            <Checklist title="Your cruise" items={["Ship name and date", "Disembarkation and all-aboard times", "Tender or berth details", "Mobility needs in your group"]} />
          </div>
        </section>

        <ProviderSection title="Excursion options" intro={p.providerIntro} links={links} pageId={p.pageId} />
        <FaqList faqs={p.faqs} />
        <SourceList ids={p.sourceIds} />
        <RelatedLinks items={p.related} />
        <EndCta title={`Ready to plan your day from ${p.port}?`} links={links} pageId={p.pageId} />
      </article>
    </main>
  );
}
