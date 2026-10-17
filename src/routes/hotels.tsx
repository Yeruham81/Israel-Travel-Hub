import { createFileRoute } from "@tanstack/react-router";
import { AccommodationCard } from "@/components/AccommodationCard";
import { Checklist, HubHeader, RelatedLinks } from "@/components/Guide";
import { StayPhotoCredits } from "@/components/StayGuideParts";
import { accommodationDestinations } from "@/data/content";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/hotels")({
  head: () =>
    pageMeta({
      title: "Hotels & places to stay in Israel by destination — Israel Taxi & Travel",
      description: "Find your stay in Jerusalem, Tel Aviv, Haifa, Tiberias, the Dead Sea or Eilat. Discover neighborhood guides, boutique hotels, beach resorts and family escapes.",
      path: "/hotels/",
      crumbs: [{ name: "Home", path: "/" }, { name: "Accommodation", path: "/hotels/" }],
    }),
  component: Hotels,
});

function Hotels() {
  return (
    <main className="mx-auto max-w-5xl px-4 pb-8">
      <HubHeader
        crumbs={[{ name: "Home", to: "/" }, { name: "Accommodation", to: "/hotels/" }]}
        eyebrow="Accommodation"
        title="Where to stay in Israel"
        intro="Picture your next stay: a boutique hideaway in a historic neighborhood, a room steps from the beach or a resort made for unwinding. Choose your destination, discover the places that suit your trip and find a hotel you'll look forward to returning to."
      />
      <section aria-labelledby="cities-h" className="mt-10">
        <h2 id="cities-h" className="text-3xl">Choose a destination</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">From Mediterranean city breaks to peaceful lakeside mornings and Red Sea beach days, start with the place that inspires you.</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {accommodationDestinations.map((destination) => <AccommodationCard key={destination.id} destination={destination} />)}
        </div>
      </section>
      <StayPhotoCredits photos={accommodationDestinations.map((destination) => destination.photo)} />
      <section aria-labelledby="crit-h" className="mt-14">
        <h2 id="crit-h" className="text-3xl">What matters when choosing</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Checklist title="Location" items={["Walking distance to what you'll actually visit", "Hills and steps, especially in Jerusalem and Haifa", "Taxi drop-off and parking"]} />
          <Checklist title="Timing" items={["Friday-evening and Saturday arrivals (Shabbat)", "Holiday periods book up early", "Summer heat in Tiberias and the Dead Sea"]} />
          <Checklist title="Price" items={["Total with taxes and fees", "Cancellation deadline", "Breakfast and parking included or not"]} />
          <Checklist title="Access" items={["Step-free access or elevator", "Shabbat elevator arrangements", "Family rooms and cots"]} />
        </div>
      </section>
      <RelatedLinks title="Getting to your hotel" items={[
        { label: "Airport to Jerusalem", to: "/travel-blog/ben-gurion-airport-to-jerusalem/" },
        { label: "Airport to Tel Aviv", to: "/travel-blog/ben-gurion-airport-to-tel-aviv/" },
        { label: "All transfers", to: "/transfers/" },
        { label: "Destinations", to: "/destinations/" },
      ]} />
    </main>
  );
}
