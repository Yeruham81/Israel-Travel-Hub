import { createFileRoute, Link } from "@tanstack/react-router";
import { HubCard, HubHeader } from "@/components/Guide";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/tickets")({
  head: () =>
    pageMeta({
      title: "Tickets & admission for Israel's sites — Israel Taxi & Travel",
      description: "Entry tickets for Masada and Caesarea national parks: what admission covers, how it differs from transport-inclusive tours, and where to reserve officially.",
      path: "/tickets/",
      crumbs: [{ name: "Home", path: "/" }, { name: "Tickets & admission", path: "/tickets/" }],
    }),
  component: Tickets,
});

function Tickets() {
  return (
    <main className="mx-auto max-w-5xl px-4 pb-8">
      <HubHeader
        crumbs={[{ name: "Home", to: "/" }, { name: "Tickets & admission", to: "/tickets/" }]}
        eyebrow="Tickets & admission"
        title="Tickets and admission"
        intro="Admission gets you into a site; you arrange transport yourself. Tours bundle transport and often a guide, and may or may not include entry."
      />
      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6">
          <h2 className="text-2xl">Admission only</h2>
          <p className="mt-2 text-muted-foreground">Reserve entry on the official site. Best if you're driving, using a private driver, or already nearby.</p>
        </div>
        <div className="rounded-2xl border bg-card p-6">
          <h2 className="text-2xl">Tour with transport</h2>
          <p className="mt-2 text-muted-foreground">Transport and itinerary handled for you. Always check whether entrance fees are included. <Link to="/tours/" className="text-primary underline">See tours</Link>.</p>
        </div>
      </section>
      <section aria-labelledby="sites-h" className="mt-14">
        <h2 id="sites-h" className="text-3xl">Choose a site</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <HubCard to="/travel-blog/masada/" eyebrow="Official reservations" title="Masada" text="Site entry, cable car, museum and night-show options — each checked separately on the official site." cta="Masada tickets & planning" />
          <HubCard to="/attractions/caesarea/" eyebrow="Official reservations" title="Caesarea" text="Coastal national park; check current hours and admission options for your date." cta="Caesarea visit planning" />
        </div>
      </section>
    </main>
  );
}
