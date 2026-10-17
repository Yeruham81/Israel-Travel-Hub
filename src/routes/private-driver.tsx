import { createFileRoute, Link } from "@tanstack/react-router";
import { Checklist, FaqList, HubHeader, ProviderSection, RelatedLinks, SourceList } from "@/components/Guide";
import { linksForPage } from "@/data/registry";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/private-driver")({
  head: () => pageMeta({
    title: "Private driver in Israel: intercity transfers & day hire",
    description: "Plan hotel-to-hotel journeys, intercity transfers and multi-stop days in Israel with a private driver. Check what to include and request a quote from Moshe Barak.",
    path: "/private-driver/",
    crumbs: [{ name: "Home", path: "/" }, { name: "Private driver", path: "/private-driver/" }],
  }),
  component: PrivateDriver,
});

const journeys = [
  { title: "Intercity transfers", text: "Arrange a one-way journey between cities or hotels. Share the exact pickup and drop-off addresses, your preferred departure time and everything travelling with your party." },
  { title: "Private driver by the day", text: "Plan a day with several stops and an agreed return point. Ask how many hours and kilometres are included, how waiting time works and what happens if the day runs longer." },
  { title: "Multi-stop journeys", text: "Combine a change of hotel with sightseeing stops along the way. Send your proposed route so the operator can confirm timing, vehicle suitability and the full price." },
];

const faqs = [
  { q: "Can I book a transfer between two hotels?", a: "Request a quote with both hotel names, exact addresses, departure date and time, passengers and luggage. The operator confirms the route, vehicle, availability and final price before booking." },
  { q: "Does hiring a driver include a tour guide?", a: "Ask explicitly whether the service is transport with a driver or includes a licensed tour guide. Agree the guide language, itinerary and any separate fee before paying." },
  { q: "Are entrance tickets, meals and waiting included?", a: "Ask for a written list of inclusions and exclusions. Check entrance tickets, meals, parking, tolls, waiting time, extra hours and cancellation terms for your particular itinerary." },
  { q: "Should I hire a driver or rent a car?", a: "Compare the complete driver quote with a rental's total cost, parking and the driving you would do yourself. A private driver can suit a single intercity journey or a planned day with several stops; a rental gives you control of your own daily route." },
];

function PrivateDriver() {
  return (
    <main className="mx-auto max-w-5xl px-4 pb-8">
      <HubHeader
        crumbs={[{ name: "Home", to: "/" }, { name: "Private driver", to: "/private-driver/" }]}
        eyebrow="Intercity & private driver hire"
        title="Private driver in Israel"
        intro="Arrange the journeys between your destinations: hotel-to-hotel transfers, a driver for the day or a route with several stops. Agree your itinerary and price directly with the operator."
      />
      <section aria-labelledby="journeys-h" className="mt-10">
        <h2 id="journeys-h" className="text-3xl">Intercity transfers & day hire</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {journeys.map((journey) => <article key={journey.title} className="rounded-2xl border bg-card p-6"><h3 className="text-2xl">{journey.title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{journey.text}</p></article>)}
        </div>
      </section>
      <section aria-labelledby="planning-h" className="mt-12">
        <h2 id="planning-h" className="text-3xl">Plan the day before requesting a quote</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Checklist title="Tell the operator" items={["Date, pickup address and preferred departure time", "Every stop and the final drop-off address", "All passengers, luggage and children's ages", "Walking, access or vehicle requirements", "Whether you need a driver only or a licensed guide"]} />
          <Checklist title="Confirm in writing" items={["Vehicle size and total price", "Included hours, distance and waiting time", "Parking, tolls, extra stops and overtime", "Entrance tickets and other exclusions", "Payment, cancellation and itinerary changes"]} />
        </div>
        <p className="mt-4 leading-relaxed text-muted-foreground">If you prefer to drive yourself, explore <Link to="/car-rental/" className="font-medium text-primary underline">car rental in Israel</Link> and compare the total cost for your route.</p>
      </section>
      <ProviderSection title="Request a private driver quote" intro="Moshe Barak's local transport business accepts itinerary inquiries. Describe your journey on the operator's website to receive a personal offer." links={linksForPage("private-driver")} pageId="private-driver" />
      <FaqList faqs={faqs} />
      <SourceList ids={["owner-private-driver"]} />
      <RelatedLinks items={[
        { label: "Airport transfers", to: "/transfers/", note: "Arrange your arrival from Ben Gurion Airport" },
        { label: "Car rental", to: "/car-rental/" },
        { label: "Tours & day trips", to: "/tours/" },
        { label: "Shore excursions", to: "/shore-excursions/" },
      ]} />
    </main>
  );
}
