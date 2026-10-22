import { createFileRoute } from "@tanstack/react-router";
import { ExtLink } from "@/components/Layout";
import { Checklist, EndCta, FaqList, GuideHeader, OnThisPage, ProviderSection, RelatedLinks, Section, SourceList } from "@/components/Guide";
import { getSource, linksForPage } from "@/data/registry";
import { pageMeta } from "@/lib/site";

const PATH = "/travel-blog/masada/";
const TITLE = "Masada: tickets, cable car and planning your visit";

export const Route = createFileRoute("/travel-blog/masada")({
  head: () =>
    pageMeta({
      title: TITLE,
      description: "Plan a visit to Masada National Park: cable car or hiking, museum and night-show options, heat and timing, and where to reserve on the official site.",
      path: PATH,
      type: "article",
      crumbs: [{ name: "Home", path: "/" }, { name: "Tickets & admission", path: "/tickets/" }, { name: "Masada", path: PATH }],
    }),
  component: Masada,
});

const sections = [
  ["overview", "Overview"],
  ["options", "Visit options"],
  ["heat", "Heat & timing"],
  ["getting-there", "Getting there"],
  ["book", "Tickets & tours"],
  ["faq", "FAQ"],
  ["sources", "Sources"],
] as const;

const faqs = [
  { q: "Do I need to reserve in advance?", a: "The official parks site offers visit reservations. Reserve there for your date and check what is included for the option you choose." },
  { q: "Cable car or Snake Path?", a: "The cable car is the easy option. Hiking up suits fit visitors starting early in cooler weather. Access to trails can be restricted in extreme heat — check official current instructions." },
  { q: "Is the night show on the same side as the cable car?", a: "The official site lists night-show options separately, on the west side of the mountain. That side is reached by a different road, so check carefully before booking." },
  { q: "Should I book a tour instead?", a: "A tour or private driver handles transport and often combines Masada with the Dead Sea. Check whether entrance and cable car are included in the tour price." },
  { q: "How long should I allow?", a: "Allow at least a few hours on site, plus travel time. Combining with the Dead Sea makes a full day." },
];

function Masada() {
  const official = linksForPage("masada").filter((l) => l.relationship === "official");
  const tours = linksForPage("masada").filter((l) => l.relationship !== "official");
  const src = getSource("inpa-masada");
  return (
    <main>
      <GuideHeader
        crumbs={[{ name: "Home", to: "/" }, { name: "Tickets & admission", to: "/tickets/" }, { name: "Masada", to: PATH }]}
        eyebrow="Attractions & tickets · Dead Sea region"
        title={TITLE}
        intro="Masada is a desert fortress above the Dead Sea and one of Israel's best-known national parks. Good planning is mostly about heat, timing and choosing how to get to the top."
      />
      <OnThisPage sections={sections} />
      <article className="mx-auto max-w-5xl px-4">
        <Section id="overview" title="What to expect">
          <p>The fortress sits on a flat-topped plateau with wide views over the Dead Sea and desert. There is little shade on top, so bring water, sun protection and good shoes.</p>
        </Section>

        <section id="options" aria-labelledby="opts-h" className="mt-14">
          <h2 id="opts-h" className="text-3xl">Visit options on the official site</h2>
          <p className="mt-2 max-w-3xl text-muted-foreground">According to the <ExtLink href={src.url}>Israel Nature and Parks Authority</ExtLink>, these are booked or arranged separately — check each for your date:</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              ["Site entry", "Visit reservation for the national park itself."],
              ["Cable car", "Ride up from the east side instead of hiking."],
              ["Hiking ascent", "Walk up by trail; subject to weather-related restrictions."],
              ["Museum", "Listed with its own reservation on the official site."],
              ["Night show", "Listed separately, on the west side of the mountain."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-xl border bg-card p-5"><h3 className="font-serif text-lg">{t}</h3><p className="mt-1 text-sm">{d}</p></li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">I don't reproduce hours or prices here — they change. Use the official page for current details.</p>
        </section>

        <Section id="heat" title="Heat and timing">
          <p>Extreme weather can change access, including trail closures. In warm months, aim for an early start and avoid the midday sun. Check official current instructions on the day.</p>
          <div className="mt-6"><Checklist title="Pack" items={["Plenty of water", "Hat and sunscreen", "Closed walking shoes", "Light layer for early mornings in winter"]} /></div>
        </Section>

        <Section id="getting-there" title="Getting there">
          <p>Masada is usually visited as a day trip from Jerusalem or combined with a Dead Sea stay. Choose between a guided tour, a private driver, or driving yourself — remember the east (cable car) and west (night show) entrances use different roads.</p>
        </Section>

        <ProviderSection title="Official tickets and visit options" links={official} pageId="masada" />
        <ProviderSection id="tours" title="Getting there with a driver" intro="If you prefer not to drive, a private day trip can include Masada. Admission is usually separate unless stated." links={tours} pageId="masada" />

        <FaqList faqs={faqs} />
        <SourceList ids={["inpa-masada", "owner-private-day-trips"]} />
        <RelatedLinks items={[
          { label: "Hotels in Jerusalem", to: "/travel-blog/where-to-stay-in-jerusalem/" },
          { label: "Car rental", to: "/car-rental/" },
          { label: "All tickets & admission", to: "/tickets/" },
          { label: "Caesarea National Park", to: "/attractions/caesarea/" },
        ]} />
        <EndCta title="Ready to plan your Masada visit?" links={[...official, ...tours]} pageId="masada" />
      </article>
    </main>
  );
}
