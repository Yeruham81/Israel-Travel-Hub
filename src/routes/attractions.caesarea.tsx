import { createFileRoute } from "@tanstack/react-router";
import { ExtLink } from "@/components/Layout";
import { Checklist, EndCta, FaqList, GuideHeader, OnThisPage, ProviderSection, RelatedLinks, Section, SourceList } from "@/components/Guide";
import { getSource, linksForPage } from "@/data/registry";
import { pageMeta } from "@/lib/site";

const PATH = "/attractions/caesarea/";
const TITLE = "Caesarea National Park: tickets, Roman ruins and getting there";

export const Route = createFileRoute("/attractions/caesarea")({
  head: () =>
    pageMeta({
      title: TITLE,
      description: "Planning Caesarea National Park? Discover Roman ruins, harbour highlights, official tickets and transport from Tel Aviv or Haifa.",
      path: PATH,
      type: "article",
      crumbs: [{ name: "Home", path: "/" }, { name: "Attractions", path: "/attractions/" }, { name: "Caesarea", path: PATH }],
    }),
  component: Caesarea,
});

const sections = [
  ["overview", "Overview"],
  ["plan", "Planning tips"],
  ["getting-there", "Getting there"],
  ["book", "Visit options"],
  ["faq", "FAQ"],
  ["sources", "Sources"],
] as const;

const faqs = [
  { q: "Do I need to book ahead?", a: "The official parks site has visitor information and a visit reservation link. Check it for your date, especially on weekends and holidays." },
  { q: "How long does a visit take?", a: "Plan a few hours to walk the seafront ruins at a relaxed pace; longer if you add the beach or a meal at the harbour." },
  { q: "Is everything open?", a: "Not necessarily. Individual exhibits or areas can be closed for maintenance or events. Check the official page for current information." },
  { q: "Can I combine Caesarea with other places?", a: "Yes. It sits on the coast between Tel Aviv and Haifa, so it pairs well with a coastal day trip by car or with a driver." },
];

function Caesarea() {
  const links = linksForPage("caesarea");
  const src = getSource("inpa-caesarea");
  return (
    <main>
      <GuideHeader
        crumbs={[{ name: "Home", to: "/" }, { name: "Attractions", to: "/attractions/" }, { name: "Caesarea", to: PATH }]}
        eyebrow="Attractions · Mediterranean coast"
        title={TITLE}
        intro="Caesarea is a coastal archaeological park where ancient ruins meet the Mediterranean — an easy half or full day from Tel Aviv."
      />
      <OnThisPage sections={sections} />
      <article className="mx-auto max-w-5xl px-4">
        <Section id="overview" title="What to expect">
          <p>The <ExtLink href={src.url}>Israel Nature and Parks Authority</ExtLink> manages Caesarea as a national park along the shore, with visitor information and visit reservations on its official site. Expect a walk among excavated remains right by the sea, with the old harbour area alongside.</p>
          <p>Opening hours, admission options and which exhibits are open can change — check the official page rather than relying on older guides.</p>
        </Section>

        <section id="plan" aria-labelledby="plan-h" className="mt-14">
          <h2 id="plan-h" className="text-3xl">Planning tips</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Checklist title="Timing" items={["Mornings and late afternoons are cooler and softer for photos", "Weekends and holidays are busier", "Check closing time for your date"]} />
            <Checklist title="Bring" items={["Comfortable shoes for uneven ground", "Sun protection and water", "Swimwear if you'll visit a nearby beach"]} />
          </div>
        </section>

        <Section id="getting-there" title="Getting there">
          <p>Caesarea lies on the coast between Tel Aviv and Haifa. Driving gives the most flexibility and lets you add other coastal stops; a private driver is an alternative. Public transport is possible but involves a connection from the nearest station.</p>
        </Section>

        <ProviderSection title="Official visit options" links={links} pageId="caesarea" />
        <FaqList faqs={faqs} />
        <SourceList ids={["inpa-caesarea"]} />
        <RelatedLinks items={[
          { label: "Hotels in Tel Aviv", to: "/travel-blog/where-to-stay-in-tel-aviv/" },
          { label: "Car rental", to: "/car-rental/" },
          { label: "Masada visit & tickets", to: "/travel-blog/masada/" },
          { label: "All attractions", to: "/attractions/" },
        ]} />
        <EndCta title="Ready to visit Caesarea?" links={links} pageId="caesarea" />
      </article>
    </main>
  );
}
