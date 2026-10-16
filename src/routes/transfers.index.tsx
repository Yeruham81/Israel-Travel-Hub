import { createFileRoute } from "@tanstack/react-router";
import { ExtLink } from "@/components/Layout";
import { HubCard, HubHeader, ProviderSection } from "@/components/Guide";
import { linksForPage, OWNER_BASE } from "@/data/registry";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/transfers/")({
  head: () =>
    pageMeta({
      title: "Airport transfers & private transport in Israel — Israel Taxi & Travel",
      description: "Airport taxis and pre-booked transfers from Ben Gurion, plus private drivers for intercity trips and day hire in Israel.",
      path: "/transfers/",
      crumbs: [{ name: "Home", path: "/" }, { name: "Transfers", path: "/transfers/" }],
    }),
  component: Transfers,
});

function Transfers() {
  return (
    <main className="mx-auto max-w-5xl px-4 pb-8">
      <HubHeader
        crumbs={[{ name: "Home", to: "/" }, { name: "Transfers", to: "/transfers/" }]}
        eyebrow="Transfers & private transport"
        title="Transfers and private transport"
        intro="Two different needs: getting from the airport to your first stop, and moving between cities or sights during your trip."
      />
      <section aria-labelledby="types-h" className="mt-10">
        <h2 id="types-h" className="text-3xl">What do you need?</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <HubCard to="/transfers/ben-gurion-airport/" eyebrow="Airport" title="From Ben Gurion Airport" text="Licensed taxi rank vs pre-booked transfer vs train, with route guides to Jerusalem and Tel Aviv." cta="Choose your destination" />
          <div className="flex h-full flex-col rounded-2xl border bg-card p-6">
            <p className="eyebrow">Private transport</p>
            <h3 className="mt-2 text-2xl">Intercity & day hire</h3>
            <p className="mt-2 flex-1 text-muted-foreground">For multi-stop days, hotel-to-hotel transfers or sites poorly served by public transport, a private driver is often simpler than renting. Compare with <a href="/car-rental/" className="text-primary underline">car rental</a> if you're comfortable driving.</p>
            <p className="mt-3 text-sm"><ExtLink guide href={`${OWNER_BASE}/travel-blog/getting-around-israel/`} className="text-primary">Getting around Israel</ExtLink></p>
          </div>
        </div>
      </section>
      <section className="mt-14 prose-guide">
        <h2 className="text-3xl">Airport taxi or pre-booked transfer?</h2>
        <ul>
          <li><strong>On-arrival taxi:</strong> licensed, metered, available around the clock from the official rank. No booking needed.</li>
          <li><strong>Pre-booked transfer:</strong> agreed price and meeting point; best for late arrivals, child seats, groups and heavy luggage.</li>
          <li><strong>Train:</strong> good value when it runs on your date; plan the last leg to your accommodation.</li>
        </ul>
      </section>
      <ProviderSection title="Private driver hire" links={linksForPage("transfers-hub")} pageId="transfers-hub" />
    </main>
  );
}
