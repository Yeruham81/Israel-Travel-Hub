import { StayBookingChecklist } from "@/components/StayBookingChecklist";
import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { accommodationEditorial, type AccommodationEditorialId } from "@/data/accommodationEditorial";
import { hotelCategoryGuides, neighborhoodGuidesForCity, type CityStayGuide, type HotelStayDestination } from "@/data/content";
import { GuideHeader, OnThisPage, Section, FaqList, SourceList } from "@/components/Guide";

const sections = [["overview", "Choosing a base"], ["areas", "Compare areas"], ["tips", "Practical tips"], ["hotels", "Find hotels"], ["faq", "FAQ"]] as const;

/** Planning guides do not reproduce individual Expedia hotel cards. */
export function StayEditorialGuidePage({ guide, id }: { guide: CityStayGuide | HotelStayDestination; id: AccommodationEditorialId }) {
 const info = accommodationEditorial[id];
 const isCity = "city" in guide;
 const name = isCity ? guide.city : guide.name;
 const locations = isCity ? guide.areas.map(a => ({ name: a.name, text: a.text, watch: a.watch })) : guide.locations.map(a => ({ name: a.name, text: a.text, watch: "" }));
 const options = isCity ? neighborhoodGuidesForCity(guide.id).map(a => ({ title: a.shortName, text: a.bestFor, path: a.path }))
   : hotelCategoryGuides.filter(a => a.destinationId === guide.id).map(a => ({ title: a.shortTitle, text: a.summary, path: a.path }));
 const photo = isCity ? neighborhoodGuidesForCity(guide.id)[0]?.photo : guide.photo;
 return <main className="pb-10">
  <GuideHeader crumbs={[{ name: "Home", to: "/" }, { name: "Travel guides", to: "/travel-blog/" }, { name: info.title, to: info.path as LinkProps["to"] }]}
    eyebrow={"Travel guide · " + name} title={info.title} intro={info.intro} {...(photo ? { image: photo } : {})} {...(guide.reviewedAt ? { checkedAt: guide.reviewedAt } : {})} />
  <OnThisPage sections={sections}/>
  <article className="mx-auto max-w-5xl px-4">
   <Section id="overview" title={"Choosing where to stay in " + name} className="scroll-mt-32">
    {guide.overview.map(p => <p key={p}>{p}</p>)}
   </Section>
   <section id="areas" aria-labelledby="areas-h" className="mt-12 scroll-mt-32">
    <p className="eyebrow">Location first</p><h2 id="areas-h" className="mt-2 text-3xl">Compare the main areas</h2>
    <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">Choose the setting that suits your travel plans. When you have an area in mind, compare individual properties in my accommodation pages.</p>
    <div className="mt-6 grid gap-4 sm:grid-cols-2">{locations.map(a => <div key={a.name} className="rounded-2xl border bg-card p-5">
     <h3 className="flex items-start gap-2 text-xl font-semibold"><MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden/>{a.name}</h3>
     <p className="mt-3 text-sm leading-relaxed">{a.text}</p>
     {a.watch && <p className="mt-3 text-sm text-muted-foreground"><strong className="text-foreground">Keep in mind:</strong> {a.watch}</p>}
    </div>)}</div>
   </section>
   <Section id="tips" title="What to check before choosing" className="scroll-mt-32">
    <p>{info.tip}</p><StayBookingChecklist groups={[
        { title: "Location & arrival", items: guide.checklist.slice(0, 3) },
        { title: "Room & booking conditions", items: guide.checklist.slice(3, 6) },
      ]} />
   </Section>
   <section id="hotels" aria-labelledby="hotels-h" className="mt-12 scroll-mt-32">
    <div className="rounded-2xl border bg-secondary/40 p-5 sm:p-7">
     <p className="eyebrow">Ready to compare properties?</p><h2 id="hotels-h" className="mt-2 text-2xl sm:text-3xl">Explore hotels in {name}</h2>
     <p className="mt-3 leading-relaxed text-muted-foreground">My accommodation pages group specific hotels by neighborhood or stay style, with Expedia links for current room rates, availability and booking terms.</p>
     <Link to={guide.path as LinkProps["to"]} className="btn btn-primary mt-5 inline-flex items-center gap-2">Browse {name} hotels <ArrowRight className="h-4 w-4" aria-hidden/></Link>
    </div>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{options.map(o => <Link key={o.path} to={o.path as LinkProps["to"]} className="group flex h-full flex-col rounded-xl border bg-card p-5 transition-colors hover:border-primary">
     <span className="text-lg font-semibold">{o.title}</span>
     <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{o.text}</span>
     <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">See hotels <ArrowRight className="h-4 w-4" aria-hidden/></span>
    </Link>)}</div>
   </section>
   <FaqList faqs={guide.faqs.slice(0,4)}/>
   <SourceList ids={guide.sourceIds}/>
  </article>
 </main>;
}
