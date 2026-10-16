import { createFileRoute } from "@tanstack/react-router";
import { ExtLink } from "@/components/Layout";
import { HubCard, HubHeader } from "@/components/Guide";
import { getSource, formatCheckDate, INFO_CHECK_DATE, OWNER_BASE } from "@/data/registry";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/transfers/ben-gurion-airport")({
  head: () =>
    pageMeta({
      title: "Ben Gurion Airport transfers: Jerusalem, Tel Aviv & more",
      description: "Where licensed taxis wait at Ben Gurion Airport (TLV), when to pre-book, and route guides for transfers to Jerusalem and Tel Aviv.",
      path: "/transfers/ben-gurion-airport/",
      crumbs: [{ name: "Home", path: "/" }, { name: "Transfers", path: "/transfers/" }, { name: "Ben Gurion Airport", path: "/transfers/ben-gurion-airport/" }],
    }),
  component: Airport,
});

function Airport() {
  const iaa = getSource("iaa-directions");
  return (
    <main className="mx-auto max-w-5xl px-4 pb-8">
      <HubHeader
        crumbs={[{ name: "Home", to: "/" }, { name: "Transfers", to: "/transfers/" }, { name: "Ben Gurion Airport", to: "/transfers/ben-gurion-airport/" }]}
        eyebrow="Airport transfers · TLV"
        title="Transfers from Ben Gurion Airport"
        intro="Pick your destination for a route guide with arrival tips, what to confirm, and booking options."
      />
      <section aria-labelledby="dest-h" className="mt-10">
        <h2 id="dest-h" className="text-3xl">Where are you heading?</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <HubCard to="/travel-blog/ben-gurion-airport-to-jerusalem/" eyebrow="Route guide" title="To Jerusalem" text="Compare a published local starting rate, transfer platforms and the metered taxi rank, with a journey planner." cta="Open Jerusalem guide" />
          <HubCard to="/travel-blog/ben-gurion-airport-to-tel-aviv/" eyebrow="Route guide" title="To Tel Aviv & Jaffa" text="Taxi rank, pre-booked transfers and the train, with tips for beachfront and Jaffa drop-offs." cta="Open Tel Aviv guide" />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Going elsewhere? See <ExtLink guide href={`${OWNER_BASE}/airport-transfers/`} className="text-primary">airport transfers across Israel</ExtLink> or ask a transfer platform for your address.</p>
      </section>
      <section className="mt-14 prose-guide">
        <h2 className="text-3xl">On arrival: official taxi rank</h2>
        <p>According to the <ExtLink href={iaa.url}>Israel Airports Authority</ExtLink> (checked {formatCheckDate(INFO_CHECK_DATE)}), licensed taxis wait at <strong>Terminal 3, ground floor, Exit 03</strong> and at <strong>Terminal 1</strong> by the domestic arrivals exit. The service runs around the clock on metered fares, and a free shuttle links the terminals. For trains, check <ExtLink href="https://www.rail.co.il/">Israel Railways</ExtLink> for your date.</p>
        <h2 className="mt-10 text-3xl">When to pre-book</h2>
        <ul>
          <li>Late-night or Shabbat/holiday arrivals</li>
          <li>Families needing child seats</li>
          <li>Groups of five or more, or lots of luggage</li>
          <li>Hard-to-find addresses such as Old City guesthouses</li>
        </ul>
      </section>
    </main>
  );
}
