import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import portrait from "@/assets/airport-transfers/moshe.webp";
import { pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";
import { airportTransferContact } from "@/data/registry";
import { customerTestimonials } from "@/data/homeReviews";
import { HomeContactForm } from "@/components/HomeContactForm";
import { TripadvisorReviewsSection } from "@/components/HomeTestimonials";

export const Route = createFileRoute("/about-moshe-barak")({
  head: () => {
    const meta = pageMeta({
      title: "About Moshe Barak | Private Driver & Airport Transfers in Israel",
      description: "I'm Moshe Barak. I've spent more than 20 years helping visitors travel around Israel. Get to know me, read my travelers' reviews and plan your journey with me.",
      path: "/about-moshe-barak/",
    });
    return { ...meta, scripts: [...meta.scripts, { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", ...authorLd() }).replaceAll("<", "\\u003c") }] };
  },
  component: MosheAbout,
});

const services = [
  { title: "Airport transfers", detail: "I arrange pickups and drop-offs at Ben Gurion Airport, with your flight arrival time, luggage and destination in mind.", to: "/transfers/" as const, action: "Explore airport transfers" },
  { title: "Private day trips", detail: "I help you plan a flexible day around the places that interest you, with time to enjoy the journey at your own pace.", to: "/tours/" as const, action: "Explore day-trip options" },
  { title: "Private driver service", detail: "I help individuals, couples, families and small groups with door-to-door journeys, agreeing on the route, vehicle and arrangements before travel.", to: "/private-driver/" as const, action: "Learn about my driving service" },
];

function MosheAbout() {
  return <main className="pb-6">
    <section id="moshe-barak" className="scroll-mt-24 bg-secondary/50">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-[minmax(0,1fr)_220px] md:py-16">
        <div>
          <p className="eyebrow">Hello, I'm Moshe</p>
          <h1 className="mt-3 text-4xl leading-tight md:text-5xl">About Moshe Barak</h1>
          <p className="mt-5 text-xl leading-relaxed text-muted-foreground">I've spent more than 20 years helping visitors travel around Israel, from airport arrivals to personally planned journeys across the country.</p>
          <p className="mt-5 leading-relaxed">I was born and raised in Israel, and I enjoy helping people discover it in a way that feels comfortable and personal. Whether it's your first visit or you're returning to familiar places, I want the practical details to feel straightforward so you can enjoy your time here.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#contact" className="btn btn-primary">Contact me <ArrowRight size={17} aria-hidden /></a>
            <Link to="/transfers/" className="btn btn-outline">Explore airport transfers</Link>
          </div>
          <p className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground"><MapPin size={16} aria-hidden /> I'm based in Israel and welcome travelers from around the world.</p>
        </div>
        <figure className="mx-auto w-full max-w-[200px] overflow-hidden rounded-2xl border bg-card shadow-sm">
          <img src={portrait} alt="Moshe Barak" className="aspect-[4/5] w-full object-cover object-top" width={240} height={300} fetchPriority="high" />
        </figure>
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="background-heading">
      <div className="grid gap-10 md:grid-cols-[1.5fr_1fr]">
        <div className="prose-guide">
          <h2 id="background-heading" className="text-3xl">A personal approach to every journey</h2>
          <p>My background in logistics has shaped the way I work. I listen to what you need, think carefully about routes and timing, and work through the details before pickup. A flight arrival, a hotel transfer and a full day of sightseeing each need a slightly different plan.</p>
          <p>Over the years, I've helped visitors with unfamiliar routes, airport departures, family journeys and days exploring new destinations. I value clear communication, thoughtful planning and the small details that can make a trip feel easier.</p>
          <p>I also share the local knowledge I've gained through the guides on this website. I want you to understand your options, including public transport and other providers, so you can choose what suits your own visit.</p>
        </div>
        <aside className="rounded-2xl border bg-card p-6 shadow-sm" aria-label="What matters to me">
          <h3 className="text-xl font-semibold">What matters to me</h3>
          <ul className="mt-5 space-y-4 text-sm leading-relaxed">
            <li><strong>Clear arrangements:</strong> I agree on the pickup details and route with you before traveling.</li>
            <li><strong>Local knowledge:</strong> I share practical advice about timing, destinations and getting around.</li>
            <li><strong>A journey that fits you:</strong> I ask about luggage, children, stops and any other needs in advance.</li>
            <li><strong>Personal communication:</strong> I welcome your questions as I help you plan your trip.</li>
          </ul>
        </aside>
      </div>
    </section>

    <section className="bg-secondary/40 py-14" aria-labelledby="services-heading">
      <div className="mx-auto max-w-6xl px-4">
        <h2 id="services-heading" className="text-3xl">How I can help</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">Tell me what you have in mind, and I can help you work through the arrangements and a personal quote.</p>
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {services.map(s => <article key={s.title} className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm">
            <h3 className="text-xl font-semibold">{s.title}</h3>
            <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{s.detail}</p>
            <Link to={s.to} className="mt-5 inline-flex items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline">{s.action} <ArrowRight size={16} aria-hidden /></Link>
          </article>)}
        </div>
      </div>
    </section>

    <TripadvisorReviewsSection personal />
    <section className="mx-auto max-w-6xl px-4 pb-14" aria-label="A note from one of my travelers">
      <p className="mt-3 text-xs text-muted-foreground">I share these travelers' comments about my own transport service. The reviews relate to journeys with me.</p>
      <div className="mt-8 rounded-2xl border bg-secondary/40 p-6">
        <h2 className="text-xl">A personal note one traveler sent me</h2>
        <blockquote className="mt-3 text-lg leading-relaxed">“{customerTestimonials[0]!.quote}”</blockquote>
        <p className="mt-4 text-sm font-semibold">{customerTestimonials[0]!.author} · {customerTestimonials[0]!.location}</p>
      </div>
    </section>

    <section id="methodology" className="scroll-mt-24 bg-secondary/40 py-14" aria-labelledby="methodology-heading">
      <div className="mx-auto max-w-6xl px-4">
        <h2 id="methodology-heading" className="text-3xl">How I put this website together</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">I created these guides to help you plan with useful local context. I want to be clear about how I choose information, explain prices and share booking links.</p>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="prose-guide">
            <h3 className="text-xl">How I choose information and options</h3>
            <p>I use official destination and operator information, show when guides were updated and identify what I couldn't confirm. I include options that serve the route or visit being discussed, and I distinguish the company operating a service from a platform selling bookings.</p>
            <p>I choose hotel shortlists for location, travel style and the hotels' own published information. I compare practical details such as beach access, spa facilities, family arrangements and meal plans. I haven't personally stayed at every property, so I don't present these shortlists as reviews of personal stays.</p>
          </div>
          <div className="prose-guide">
            <h3 className="text-xl">How I explain prices and bookings</h3>
            <p>I show published prices with their basis and limitations, such as a per-person fare or a per-vehicle starting rate. I don't invent availability, discounts, ratings or vehicle capacity, and I don't label an incomplete price as a total. I currently don't display live prices or availability.</p>
            <p>I link to providers so you can check your dates, current prices and terms on their own websites. For my transport service, I confirm arrangements directly with you; my prices, reviews and cancellation terms relate to my own service. I don't take payments or complete reservations through this website.</p>
          </div>
          <div className="prose-guide">
            <h3 className="text-xl">How affiliate links work</h3>
            <p>I may earn a commission from some links at no extra cost to you. I mark links covered by an affiliate arrangement as “Sponsored link”; other links are ordinary links. I identify my own local transport business separately, so you can see when I'm describing a service I operate.</p>
            <p>I explain alternatives in the guides so you can decide what fits your plans. When you book through another provider, I ask you to check that provider's inclusions, conditions and payment arrangements.</p>
          </div>
          <div className="prose-guide">
            <h3 className="text-xl">How I handle your enquiry</h3>
            <p>I don't attach your personal details or flight information to outbound booking links. Details you enter in the journey planners stay on the page.</p>
            <p>My message form prepares an email in your browser. You can review it before opening your email app, and the form doesn't transmit your message. I receive it only when you send the email. A message or quote request is the start of a conversation, rather than a confirmed booking.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="photos-heading">
      <p className="eyebrow">Moments on the road</p>
      <h2 id="photos-heading" className="mt-2 text-3xl">Memories with my travelers</h2>
      <p className="mt-3 max-w-3xl text-muted-foreground">I'd like to share more moments from my journeys around Israel here. I'll add photographs with my guests only with their permission.</p>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Space for my future guest photographs">
        {[1, 2, 3].map(number => <div key={number} className="flex aspect-[4/3] items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card/70 p-6 text-center">
          <span className="text-sm font-medium text-muted-foreground">My guest photographs · Coming soon</span>
        </div>)}
      </div>
    </section>

    <section className="bg-secondary/40 py-14" aria-labelledby="direct-contact-heading">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-7">
          <h2 id="direct-contact-heading" className="text-3xl">Let's plan your journey</h2>
          <p className="mt-3 text-muted-foreground">Tell me where you'd like to go, when you're traveling and what would make the trip comfortable for you.</p>
          <p className="mt-3 flex items-center gap-2 text-sm"><Mail size={17} aria-hidden /> <a className="font-semibold text-primary underline" href={"mailto:" + airportTransferContact.email}>{airportTransferContact.email}</a></p>
        </div>
        <HomeContactForm context="about" />
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground">
      <p>I share more practical local advice in my <Link to="/guides/" className="font-semibold text-primary underline">Israel travel guides</Link>.</p>
    </section>
  </main>;
}
