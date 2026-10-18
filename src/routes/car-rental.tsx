import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Checklist, FaqList, HubHeader, ProviderSection, RelatedLinks, SourceList } from "@/components/Guide";
import { linksForPage } from "@/data/registry";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/car-rental")({
  head: () =>
    pageMeta({
      title: "Car rental in Israel: Ben Gurion Airport or city pickup?",
      description: "Should you rent a car in Israel? Compare airport and city pickup, parking, Shabbat hours, insurance checks and trips beyond Tel Aviv and Jerusalem.",
      path: "/car-rental/",
      crumbs: [{ name: "Home", path: "/" }, { name: "Car rental", path: "/car-rental/" }],
    }),
  component: CarRental,
});

const contexts = {
  airport: {
    label: "Pick up at Ben Gurion Airport",
    tips: ["Convenient if you head straight to the Galilee, the coast or the Dead Sea", "Rental desks and car parks are at the airport — follow your voucher's instructions", "Avoid it if your first days are in Jerusalem or Tel Aviv, where parking is hard", "Allow time for paperwork after a long flight"],
  },
  city: {
    label: "Pick up in a city (Jerusalem, Tel Aviv)",
    tips: ["Explore the city first without a car, then rent for out-of-town days", "City offices may have shorter hours and close for Shabbat — check for your date", "Ask where to return the car and the fee for one-way rentals", "Plan parking at your hotel before collecting the car"],
  },
} as const;

const faqs = [
  { q: "Do I need a car in Israel?", a: "Not for Jerusalem or Tel Aviv. A car is most useful for the Galilee, the Golan, the Negev and coastal stops like Caesarea." },
  { q: "Is my licence accepted?", a: "Rules depend on your licence and nationality. Check the rental terms and current official guidance before you book." },
  { q: "What about insurance?", a: "Coverage, excess and deposits differ by offer. Read the specific terms on the provider's site rather than assuming a blanket rule." },
  { q: "Can I drive anywhere?", a: "Rental terms can restrict certain areas. Check the specific offer's terms for every area you plan to drive." },
];

function CarRental() {
  const [ctx, setCtx] = useState<keyof typeof contexts>("airport");
  return (
    <main className="mx-auto max-w-5xl px-4 pb-8">
      <HubHeader
        crumbs={[{ name: "Home", to: "/" }, { name: "Car rental", to: "/car-rental/" }]}
        eyebrow="Car rental"
        title="Car rental in Israel"
        intro="Renting makes sense for the countryside and less so for the big cities. Choose a pickup context for tailored tips, then compare rentals on the provider's site."
      />
      <section aria-labelledby="pickup-h" className="mt-10">
        <h2 id="pickup-h" className="text-3xl">Where will you pick up?</h2>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Pickup context">
          {(Object.keys(contexts) as (keyof typeof contexts)[]).map((k) => (
            <button key={k} type="button" className="chip" aria-pressed={ctx === k} onClick={() => setCtx(k)}>{contexts[k].label}</button>
          ))}
        </div>
        <div className="mt-4" aria-live="polite"><Checklist title={contexts[ctx].label} items={[...contexts[ctx].tips]} /></div>
        <p className="mt-2 text-sm text-muted-foreground">Tips only — your choice here isn't sent anywhere. Enter your pickup on the provider's site.</p>
      </section>
      <section className="mt-14 grid gap-4 sm:grid-cols-2">
        <Checklist title="Driving in Israel" items={["Navigation apps work well; download offline maps", "Highway 6 is a toll road billed electronically — ask how the rental handles tolls", "Jerusalem's Old City and many central streets aren't car-friendly", "Fuel up before desert drives"]} />
        <Checklist title="Check in the rental terms" items={["Insurance and excess", "Deposit and credit card", "Minimum driver age", "Permitted driving areas", "Cancellation"]} />
      </section>
      <ProviderSection title="Compare rental cars" links={linksForPage("car-rental")} pageId="car-rental" />
      <FaqList faqs={faqs} />
      <SourceList ids={["discovercars-israel"]} />
      <RelatedLinks items={[
        { label: "Private driver instead", to: "/private-driver/" },
        { label: "Hotels in Tiberias", to: "/travel-blog/best-hotels-in-tiberias/" },
        { label: "Caesarea", to: "/attractions/caesarea/" },
        { label: "Masada", to: "/travel-blog/masada/" },
      ]} />
    </main>
  );
}
