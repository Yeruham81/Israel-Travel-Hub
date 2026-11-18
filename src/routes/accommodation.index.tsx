import { createFileRoute, Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, CheckCircle2, MapPin, ReceiptText } from "lucide-react";
import { AccommodationCard } from "@/components/AccommodationCard";
import { HubHeader, OnThisPage } from "@/components/Guide";
import { accommodationDestinations } from "@/data/content";
import { accommodationEditorial } from "@/data/accommodationEditorial";
import { hotelStyles } from "@/data/hotelHub";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/accommodation/")({
 head: () => pageMeta({ title: "Hotels in Israel: browse by city, area and style",
  description: "Explore hotels in Jerusalem, Tel Aviv, Haifa, Tiberias and the Dead Sea, by neighborhood and accommodation style.",
  path: "/accommodation/",
  crumbs: [{ name: "Home", path: "/" }, { name: "Accommodation", path: "/accommodation/" }] }),
 component: AccommodationHub,
});
const sections = [["destinations", "Hotels by destination"], ["styles", "Hotel styles"], ["planning", "Booking tips"]] as const;
const destinations = accommodationDestinations.filter(d => d.id !== "eilat");
const tips = [
 { title: "Pick your location", icon: MapPin, text: "Compare your actual journeys to sights, beaches and restaurants. Hills, steps and taxi drop-offs matter." },
 { title: "Choose your travel dates", icon: CalendarDays, text: "Holidays, weekends and events can change demand, transport and meals." },
 { title: "Compare the total cost", icon: ReceiptText, text: "Include every guest and child's age. Check the full total, taxes, meals, deposits and cancellation terms." },
 { title: "Confirm room details", icon: CheckCircle2, text: "Check bed layouts, elevators, parking and the facilities that matter for your stay." },
];
function AccommodationHub() {
 return <main className="mx-auto max-w-5xl px-4 pb-12">
  <HubHeader crumbs={[{ name: "Home", to: "/" }, { name: "Accommodation", to: "/accommodation/" }]}
   eyebrow="Accommodation" title="Hotels in Israel"
   intro="Choose your destination, then browse hotels by neighborhood or style. My hotel pages help you compare relevant properties and continue to Expedia when you are ready to check rooms." />
  <OnThisPage sections={sections}/>
  <section id="destinations" aria-labelledby="destinations-h" className="mt-10 scroll-mt-32">
   <p className="eyebrow">First, choose your destination</p>
   <h2 id="destinations-h" className="mt-2 text-3xl">Explore hotels by city</h2>
   <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">Jerusalem and Tel Aviv are grouped by neighborhood. For Haifa, Tiberias and the Dead Sea, choose between the hotel styles that suit your visit.</p>
   <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {destinations.map(d => {
     const planning = accommodationEditorial[d.id as keyof typeof accommodationEditorial];
     return <div key={d.id} className="flex min-w-0 flex-col">
      <AccommodationCard destination={d}/>
      <Link to={planning.path as LinkProps["to"]} className="mt-2 inline-flex items-center gap-1.5 px-2 text-sm font-semibold text-primary underline underline-offset-4">
       Read my area guide <ArrowRight className="h-4 w-4" aria-hidden/>
      </Link>
     </div>;
    })}
   </div>
  </section>
  <section id="styles" aria-labelledby="styles-h" className="mt-14 scroll-mt-32">
   <p className="eyebrow">Know your hotel style?</p><h2 id="styles-h" className="mt-2 text-3xl">Explore by stay style</h2>
   <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">Go straight to a focused hotel shortlist, from boutique properties to beachfront hotels and family-friendly resorts.</p>
   <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {hotelStyles.filter(s => s.link).map(s => <Link key={s.id} to={s.link!.to}
      className="group flex h-full flex-col rounded-2xl border bg-card p-5 transition-colors hover:border-primary">
      <h3 className="text-xl font-semibold">{s.title}</h3><p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{s.advantage}</p>
      <p className="mt-3 text-sm"><strong>Best for:</strong> {s.suits}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">{s.link!.label}<ArrowRight className="h-4 w-4" aria-hidden/></span>
    </Link>)}
   </div>
  </section>
  <section id="planning" aria-labelledby="planning-h" className="mt-14 scroll-mt-32">
   <p className="eyebrow">Before paying</p><h2 id="planning-h" className="mt-2 text-3xl">Four useful booking checks</h2>
   <div className="mt-6 grid gap-4 sm:grid-cols-2">
    {tips.map(t => <div key={t.title} className="rounded-2xl border bg-card p-5">
     <div className="flex items-center gap-3"><t.icon className="h-5 w-5 text-primary" aria-hidden/><h3 className="text-lg font-semibold">{t.title}</h3></div>
     <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
    </div>)}
   </div>
   <p className="mt-5 text-sm leading-relaxed text-muted-foreground">Prices and availability depend on the dates and guests entered on Expedia; I do not display unverified live room rates.</p>
  </section>
 </main>;
}
