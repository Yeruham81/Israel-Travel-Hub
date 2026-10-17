import { createFileRoute, Link } from "@tanstack/react-router";
import { HubHeader } from "@/components/Guide";
import { StayPhotoCredits } from "@/components/StayGuideParts";
import { airportDestinationCards, airportTransferPhotos } from "@/data/airportTransfers";
import { AIRPORT_TRANSFER_CHECK_DATE, formatCheckDate, getSource } from "@/data/registry";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/transfers/")({
  head: () =>
    pageMeta({
      title: "Airport transfers in Israel: destinations & private pickups",
      description: "Arrange a private transfer from Ben Gurion Airport to Tel Aviv, Jerusalem, Haifa, the Dead Sea and more. Explore starting prices and request a personal quote.",
      path: "/transfers/",
      crumbs: [{ name: "Home", path: "/" }, { name: "Airport transfers", path: "/transfers/" }],
    }),
  component: AirportTransfers,
});

const popular = airportDestinationCards.filter((card) => card.popular);
const more = airportDestinationCards.filter((card) => !card.popular);

function AirportTransfers() {
  const source = getSource("moshe-airport-transfers");
  return (
    <main className="mx-auto max-w-5xl px-4 pb-8">
      <HubHeader
        crumbs={[{ name: "Home", to: "/" }, { name: "Airport transfers", to: "/transfers/" }]}
        eyebrow="Private airport pickups"
        title="Airport transfers in Israel"
        intro="Arrive with your ride arranged. Explore private, pre-booked transfers from Ben Gurion Airport to your hotel or another agreed destination across Israel."
      />
      <section aria-labelledby="airport-h" className="mt-10">
        <Link to="/transfers/ben-gurion-airport/" className="group grid overflow-hidden rounded-2xl border bg-card hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:grid-cols-2">
          <img src={airportTransferPhotos["other"]!.src} alt={airportTransferPhotos["other"]!.alt} width={600} height={400} className="aspect-[3/2] h-full w-full object-cover" />
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <p className="eyebrow">Ben Gurion Airport · TLV</p>
            <h2 id="airport-h" className="mt-2 text-3xl">From the airport to your destination</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">Choose where you're heading, see Moshe Barak's published starting rates and request a pickup for your party. The full airport page includes the quote form, arrival tips and alternative booking platforms.</p>
            <span className="mt-5 font-semibold text-primary">Explore Ben Gurion Airport transfers →</span>
          </div>
        </Link>
      </section>
      <section aria-labelledby="destinations-h" className="mt-12">
        <p className="eyebrow">Your first stop</p>
        <h2 id="destinations-h" className="mt-2 text-3xl">Popular airport transfer destinations</h2>
        <p className="mt-3 text-muted-foreground">Choose a destination to open your quote request with that destination selected.</p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-4">
          {popular.map((card) => (
            <Link key={card.id} to="/transfers/ben-gurion-airport/" search={{ destination: card.id }} hash="request-quote" className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" data-testid="airport-hub-destination">
              <img src={card.photo.src} alt={card.photo.alt} width={360} height={240} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover" />
              <div className="flex flex-1 flex-col p-3 sm:p-5">
                <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">Ben Gurion Airport to</p>
                <h3 className="mt-1 min-h-12 text-xl leading-tight sm:text-2xl">{card.destination}</h3>
                <p className="mt-3 text-xs text-muted-foreground">From</p>
                <p className="text-2xl font-semibold tabular-nums"><span className="text-sm">ILS </span>{card.price.amount.toLocaleString("en-US")}</p>
                <p className="mt-1 text-xs text-muted-foreground">Per vehicle · up to 4</p>
                <span className="mt-4 text-sm font-semibold text-primary">Request a quote →</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-5 rounded-xl border bg-secondary/40 p-4 text-sm leading-relaxed" data-testid="airport-hub-rate-terms">
          <p><strong>Moshe Barak's published starting rates:</strong> {popular[0]!.price.conditions}</p>
          <p className="mt-2 text-muted-foreground">Prices are per vehicle. Larger groups need a separate quote. <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline">Published operator rates<span className="sr-only"> (opens in a new tab)</span></a> checked {formatCheckDate(AIRPORT_TRANSFER_CHECK_DATE)}.</p>
        </div>
      </section>
      <section aria-labelledby="more-h" className="mt-12">
        <h2 id="more-h" className="text-3xl">More destinations from Ben Gurion Airport</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {more.map((card) => <li key={card.id}><Link to="/transfers/ben-gurion-airport/" search={{ destination: card.id }} hash="request-quote" className="flex h-full flex-wrap items-center justify-between gap-2 rounded-xl border bg-card p-4 hover:border-primary"><span className="font-medium">{card.destination}</span><span className="text-sm text-primary">From ILS {card.price.amount.toLocaleString("en-US")}</span></Link></li>)}
          <li><Link to="/transfers/ben-gurion-airport/" search={{ destination: "other" }} hash="request-quote" className="block h-full rounded-xl border bg-card p-4 font-medium text-primary hover:border-primary">Another destination or a larger group? Request a quote →</Link></li>
        </ul>
      </section>
      <section className="mt-12 rounded-2xl bg-navy p-6 text-navy-foreground sm:p-8" aria-labelledby="quote-h">
        <h2 id="quote-h" className="text-3xl">Arrange your airport pickup with Moshe Barak</h2>
        <p className="mt-3 max-w-3xl leading-relaxed opacity-90">Have your flight date and Israel-local arrival time, hotel address, passenger count and luggage details ready. Your price, vehicle and pickup arrangements are confirmed before booking.</p>
        <Link to="/transfers/ben-gurion-airport/" hash="request-quote" className="btn btn-light mt-5">Start your airport transfer request</Link>
      </section>
      <StayPhotoCredits photos={[airportTransferPhotos["other"]!, ...popular.map((card) => card.photo)]} />
    </main>
  );
}
