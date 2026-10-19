import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, Mail, MapPin, Star } from "lucide-react";
import portrait from "@/assets/airport-transfers/moshe.webp";
import { pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";
import { mosheBarakAuthor, airportTransferContact } from "@/data/registry";
import { tripadvisorProfileUrl, tripadvisorReviews, customerTestimonials } from "@/data/homeReviews";
import { HomeContactForm } from "@/components/HomeContactForm";

export const Route = createFileRoute("/about-moshe-barak")({
  head: () => {
    const meta = pageMeta({
      title: "Meet Moshe Barak | Private Driver & Airport Transfers in Israel",
      description: "Get to know Moshe Barak, an experienced Israeli private driver helping travelers with airport pickups, tailored day trips and personal service. Read guest reviews and contact Moshe.",
      path: "/about-moshe-barak/",
    });
    return { ...meta, scripts: [...meta.scripts, { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", ...authorLd() }).replaceAll("<", "\\u003c") }] };
  },
  component: MosheAbout,
});

const services = [
  { title: "Airport transfers", detail: "Prearranged pickups and drop-offs at Ben Gurion Airport, with attention to flight arrival times, luggage and your destination.", to: "/transfers/" as const, action: "Explore airport transfers" },
  { title: "Private day trips", detail: "Flexible journeys for travelers who want to explore Israel at their own pace, with an itinerary shaped around their interests.", to: "/tours/" as const, action: "Explore day trips" },
  { title: "Private driver", detail: "Door-to-door transportation for individuals, couples, families and small groups, with the route and vehicle confirmed before travel.", to: "/private-driver/" as const, action: "Learn about private driving" },
];

function MosheAbout() {
  return <main className="pb-6">
    <section className="bg-secondary/50">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-[minmax(0,1fr)_minmax(260px,0.7fr)] md:py-20">
        <div>
          <p className="eyebrow">Meet your local driver</p>
          <h1 className="mt-3 text-4xl leading-tight md:text-5xl">Meet Moshe Barak</h1>
          <p className="mt-5 text-xl leading-relaxed text-muted-foreground">Private transportation and personally planned journeys in Israel, backed by more than 20 years of experience helping visitors travel comfortably.</p>
          <p className="mt-5 leading-relaxed">I'm Moshe. I was born and raised in Israel, and I've spent more than two decades helping visitors get from place to place, discover new destinations and make the most of their time here. I believe a good journey starts with clear communication, thoughtful planning and a driver you can rely on.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#contact" className="btn btn-primary">Ask Moshe a question <ArrowRight size={17} aria-hidden /></a>
            <Link to="/transfers/" className="btn btn-outline">Airport transfer options</Link>
          </div>
          <p className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground"><MapPin size={16} aria-hidden /> Based in Israel · Serving international visitors</p>
        </div>
        <figure className="mx-auto w-full max-w-sm overflow-hidden rounded-3xl border bg-card shadow-sm">
          <img src={portrait} alt="Moshe Barak, private transport operator in Israel" className="aspect-[4/5] w-full object-cover object-top" width={480} height={600} fetchPriority="high" />
        </figure>
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="background-heading">
      <div className="grid gap-10 md:grid-cols-[1.5fr_1fr]">
        <div className="prose-guide">
          <h2 id="background-heading" className="text-3xl">A personal approach to traveling in Israel</h2>
          <p>My experience in logistics has shaped how I approach every trip: listening to what travelers need, allowing time for the journey and working through the practical details before pickup. I help with airport arrivals, private transfers and customized day trips, whether it's a first visit or a return to familiar places.</p>
          <p>Over the years, I've welcomed travelers from different countries and helped them navigate unfamiliar routes, hotel pickups, airport departures and sightseeing days. For me, the goal isn't simply to reach the destination. It's to make the journey feel straightforward and personal.</p>
          <p>On this website I also share practical travel information. The independent travel guides and comparison pages explain alternatives such as public transport and other booking providers; my own private transport service is identified separately.</p>
        </div>
        <aside className="rounded-2xl border bg-card p-6 shadow-sm" aria-label="What to expect">
          <h3 className="text-xl font-semibold">What matters on every journey</h3>
          <ul className="mt-5 space-y-4 text-sm leading-relaxed">
            <li><strong>Clear arrangements:</strong> agree on pickup details and the route before traveling.</li>
            <li><strong>Local knowledge:</strong> practical advice about timing, destinations and getting around Israel.</li>
            <li><strong>Travel at your pace:</strong> discuss luggage, children, stops and other needs in advance.</li>
            <li><strong>Personal communication:</strong> ask questions directly when planning your trip.</li>
          </ul>
        </aside>
      </div>
    </section>

    <section className="bg-secondary/40 py-14" aria-labelledby="services-heading">
      <div className="mx-auto max-w-6xl px-4">
        <h2 id="services-heading" className="text-3xl">How I can help</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">Choose the kind of trip you're planning, then get in touch for details and a personalized quote.</p>
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {services.map(s => <article key={s.title} className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm">
            <h3 className="text-xl font-semibold">{s.title}</h3>
            <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{s.detail}</p>
            <Link to={s.to} className="mt-5 inline-flex items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline">{s.action} <ArrowRight size={16} aria-hidden /></Link>
          </article>)}
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="reviews-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="eyebrow">Words from travelers</p><h2 id="reviews-heading" className="mt-2 text-3xl">What guests say about traveling with Moshe</h2></div>
        <a href={tripadvisorProfileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-primary underline">See reviews on Tripadvisor <ExternalLink size={16} aria-hidden /></a>
      </div>
      <div className="mt-7 grid gap-5 md:grid-cols-3">
        {tripadvisorReviews.slice(0,3).map(review => <figure key={review.author} className="flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-700" aria-label="Five out of five stars"><Star size={18} fill="currentColor" aria-hidden /><span className="text-sm font-semibold">5/5 · Tripadvisor</span></div>
          <blockquote cite={tripadvisorProfileUrl} className="mt-4 flex-1 leading-relaxed">“{review.excerpt}”</blockquote>
          <figcaption className="mt-5 border-t pt-4 text-sm"><strong>{review.author}</strong> · {review.period}</figcaption>
        </figure>)}
      </div>
      <div className="mt-8 rounded-2xl border bg-secondary/40 p-6">
        <p className="text-sm font-semibold text-muted-foreground">A personal note from a past traveler</p>
        <blockquote className="mt-3 text-lg leading-relaxed">“{customerTestimonials[0]!.quote}”</blockquote>
        <p className="mt-4 text-sm font-semibold">{customerTestimonials[0]!.author} · {customerTestimonials[0]!.location}</p>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">These are selected customer comments about Moshe's own transport service, not ratings of the site's independent travel guides or third-party providers.</p>
    </section>

    <section className="bg-secondary/40 py-14" aria-labelledby="photos-heading">
      <div className="mx-auto max-w-6xl px-4">
        <p className="eyebrow">Moments on the road</p>
        <h2 id="photos-heading" className="mt-2 text-3xl">Travel memories with guests</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">A collection of moments from journeys around Israel. Photos with guests will be added here with their permission.</p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Reserved space for future client photos">
          {["Guest photo gallery space one", "Guest photo gallery space two", "Guest photo gallery space three"].map((label, i) =>
            <div key={label} className="flex aspect-[4/3] items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card/70 p-6 text-center">
              <span className="text-sm font-medium text-muted-foreground">Guest photo {i + 1} · Coming soon</span>
            </div>)}
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="direct-contact-heading">
      <div className="mb-7">
        <h2 id="direct-contact-heading" className="text-3xl">Let's plan your journey</h2>
        <p className="mt-3 text-muted-foreground">Tell me where you'd like to go, when you're traveling and what would make the trip comfortable for you.</p>
        <p className="mt-3 flex items-center gap-2 text-sm"><Mail size={17} aria-hidden /> <a className="font-semibold text-primary underline" href={`mailto:${airportTransferContact.email}`}>{airportTransferContact.email}</a></p>
      </div>
      <HomeContactForm context="about" />
    </section>

    <section className="mx-auto max-w-6xl px-4 pb-8 text-sm text-muted-foreground">
      <p>For details about how this website selects travel options, distinguishes independent information from Moshe's services and discloses affiliate partnerships, visit our <Link to="/about/" className="font-semibold text-primary underline">About & methodology</Link> page.</p>
      <p className="mt-2">Read more practical advice in our <Link to="/guides/" className="font-semibold text-primary underline">Israel travel guides</Link>.</p>
    </section>
  </main>;
}
