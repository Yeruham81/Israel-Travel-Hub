import { createFileRoute } from "@tanstack/react-router";
import { HubCard, HubHeader, ProviderSection, RelatedLinks } from "@/components/Guide";
import { linksForPage, travelGuidePaths } from "@/data/registry";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/tours/")({
  head: () =>
    pageMeta({
      title: "Tours & day trips in Israel: shared vs private — Israel Taxi & Travel",
      description: "How to choose between shared and private tours in Israel, with guides to Bethlehem tours from Jerusalem, Masada and private day trips.",
      path: "/tours/",
      crumbs: [{ name: "Home", path: "/" }, { name: "Tours", path: "/tours/" }],
    }),
  component: Tours,
});

function Tours() {
  const links = linksForPage("tours-hub").filter((l) => l.relationship === "publisher_operator");
  return (
    <main className="mx-auto max-w-5xl px-4 pb-8">
      <HubHeader
        crumbs={[{ name: "Home", to: "/" }, { name: "Tours", to: "/tours/" }]}
        eyebrow="Tours & day trips"
        title="Tours and day trips"
        intro="Decide where you'll start from and whether you want a shared group or a private day, then compare the actual itinerary."
      />
      <section aria-labelledby="from-jlm" className="mt-10">
        <h2 id="from-jlm" className="text-3xl">From Jerusalem</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <HubCard to="/tours/bethlehem-from-jerusalem/" eyebrow="Tour guide" title="Bethlehem tours" text="Combined Jerusalem–Bethlehem tours and private options: itinerary, pickup, language and documents." cta="Compare Bethlehem tours" />
          <HubCard to="/travel-blog/masada/" eyebrow="Day trip" title="Masada & the Dead Sea" text="Plan the visit, then choose official tickets or a driver for the day." cta="Plan a Masada day" />
        </div>
      </section>
      <section className="mt-14 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6">
          <h2 className="text-2xl">Shared tours</h2>
          <p className="mt-2 text-muted-foreground">Fixed dates, set itinerary and a group. Usually simplest for solo travellers and couples. Check pickup points, language and what admissions are included.</p>
        </div>
        <div className="rounded-2xl border bg-card p-6">
          <h2 className="text-2xl">Private tours & drivers</h2>
          <p className="mt-2 text-muted-foreground">Your own schedule and stops; good for families and groups. Confirm whether you get a licensed guide or a driver only, and which fees are extra.</p>
        </div>
      </section>
      <ProviderSection title="Private day trips" links={links} pageId="tours-hub" />
      <RelatedLinks title="Plan your day-trip itinerary" items={[
        { label: "Day trips from Jerusalem", to: travelGuidePaths.jerusalemDayTrips },
        { label: "Day trips from Tel Aviv", to: travelGuidePaths.telAvivDayTrips },
        { label: "Jerusalem to the Dead Sea", to: travelGuidePaths.jerusalemDeadSea },
        { label: "Jordan River baptism sites", to: travelGuidePaths.baptism },
      ]} />
    </main>
  );
}
