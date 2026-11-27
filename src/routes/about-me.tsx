import { Link, createFileRoute } from "@tanstack/react-router";
import { Clock3, HeartHandshake, MapPinned } from "lucide-react";
import portrait from "@/assets/airport-transfers/moshe.webp";
import clientCollage from "@/assets/about/moshe-barak-with-clients.webp";
import { airportTransferPhotos } from "@/data/airportTransfers";
import { privateDriverHero } from "@/data/privateDriver";
import { toursHubHero } from "@/data/tours";
import { tripadvisorProfileUrl } from "@/data/homeReviews";
import { HomeContactForm } from "@/components/HomeContactForm";
import { TripadvisorReviewsSection } from "@/components/HomeTestimonials";

export const Route = createFileRoute("/about-me")({
  head: async (ctx) => { const { routeHead } = await import("../route-heads/about-me.head"); return Reflect.apply(routeHead, undefined, [ctx]); },
  component: MosheAbout,
});

const personalApproach = [
  { icon: HeartHandshake, title: "Personal attention", detail: "I take the time to understand your interests, who you're traveling with and the pace that suits you. Your plans shape the journey." },
  { icon: Clock3, title: "Professional service", detail: "Punctuality, careful driving and clear communication are central to the way I work. I pay attention to the details that help your day run smoothly." },
  { icon: MapPinned, title: "Local knowledge", detail: "Years of traveling across Israel help me suggest practical routes, combine destinations naturally and make thoughtful use of your time." },
];

const services = [
  { photo: airportTransferPhotos["other"]!, title: "Airport transfers", detail: "A personal welcome to Israel, with pickup and drop-off arrangements planned around your flight, luggage and destination.", to: "/airport-transfers/" as const },
  { photo: toursHubHero, title: "Tours & day-trip ideas", detail: "Explore places you'd like to visit, from Jerusalem and the Dead Sea to the Galilee, and find ideas for your time in Israel.", to: "/tours/" as const },
  { photo: privateDriverHero, title: "My private driver service", detail: "Tell me the places you have in mind, and I can help plan a flexible private journey around your interests and preferred pace.", to: "/private-driver-in-israel/" as const },
];

function MosheAbout() {
  return <main className="pb-6">
    <section id="moshe-barak" className="scroll-mt-24 border-b bg-secondary/30">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-[minmax(0,1fr)_220px] md:py-14">
        <div>
          <p className="eyebrow">Your local driver in Israel</p>
          <h1 className="guide-page-title mt-3">Let me help you discover Israel</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed sm:text-xl">I'm <strong className="font-semibold">Moshe Barak</strong>, and I've spent more than 20 years welcoming travelers to Israel and helping them explore the country, with personal attention, professional service and the local knowledge that makes a journey easier.</p>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">I was born and raised in Israel. I enjoy sharing the places I know, helping you plan your days and making you feel welcome from the moment you arrive.</p>
          <a href={tripadvisorProfileUrl} target="_blank" rel="noopener noreferrer" aria-label="Read Reviews on TripAdvisor" data-external-icon="none" className="mt-6 inline-flex items-center gap-3 rounded-xl bg-[#34e0a1] px-5 py-3 text-center font-semibold leading-snug text-[#002b1c] transition-colors hover:bg-[#2bc68e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
            <img src="/images/tripadvisor-owl-black.svg" alt="" width={28} height={28} className="size-7" />
            <span>Read Reviews on<br />TripAdvisor</span>
          </a>
        </div>
        <figure className="mx-auto w-full max-w-[200px] overflow-hidden rounded-2xl border bg-card shadow-sm">
          <img src={portrait} alt="Moshe Barak" className="aspect-[4/5] w-full object-cover object-top" width={240} height={300} fetchPriority="high" />
        </figure>
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-4 pb-4 pt-10 sm:pt-12" aria-labelledby="experience-heading">
      <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] lg:gap-10">
        <div>
          <p className="eyebrow">Years of journeys across Israel</p>
          <h2 id="experience-heading" className="mt-2 text-2xl leading-tight sm:text-3xl">Experience that makes the journey easier</h2>
          <p className="mt-4 leading-relaxed">Over the years, I've driven individuals, couples, families and small groups from around the world. I've helped with airport arrivals, city visits and personally planned days exploring Israel's landscapes, history and everyday life.</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">The people I meet are what make this work special. I listen to what matters to you, offer practical suggestions and help bring the details together so you can enjoy your visit at your own pace.</p>
        </div>
        <figure className="min-w-0">
          <img src={clientCollage} alt="Moshe Barak with clients during journeys around Israel" width={681} height={341} loading="lazy" decoding="async" className="h-auto w-full rounded-2xl border bg-card shadow-sm" />
          <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">A few memories with my travelers around Israel.</figcaption>
        </figure>
      </div>
    </section>

    <div id="reviews" className="scroll-mt-24">
      <TripadvisorReviewsSection personal />
    </div>

    <section className="mx-auto max-w-6xl px-4 py-10 sm:py-12" aria-labelledby="approach-heading">
      <h2 id="approach-heading" className="text-2xl sm:text-3xl">The care I bring to your journey</h2>
      <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">I aim to make excellent service part of the whole experience, from your first message to the end of your journey.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {personalApproach.map(({ icon: Icon, title, detail }) => <article key={title} className="rounded-2xl border bg-card p-5 sm:p-6">
          <Icon size={25} className="text-primary" aria-hidden />
          <h3 className="mt-4 text-xl font-semibold">{title}</h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">{detail}</p>
        </article>)}
      </div>
    </section>

    <section className="border-y bg-secondary/30 py-10 sm:py-12" aria-labelledby="services-heading">
      <div className="mx-auto max-w-6xl px-4">
        <h2 id="services-heading" className="text-2xl sm:text-3xl">How I can help you explore Israel</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {services.map(({ photo, title, detail, to }) => <Link key={title} to={to} className="editorial-card-link group flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-colors hover:border-primary/50 hover:bg-secondary/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            <div className="aspect-video overflow-hidden">
              <img src={photo.src} alt={photo.alt} width={640} height={360} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.04]" />
            </div>
            <div className="flex-1 p-5 sm:p-6">
              <h3 className="text-xl font-semibold transition-colors group-hover:text-primary">{title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{detail}</p>
            </div>
          </Link>)}
        </div>
      </div>
    </section>

    <section id="methodology" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-10" aria-labelledby="methodology-heading">
      <h2 id="methodology-heading" className="text-2xl">Experience behind my travel guides</h2>
      <p className="mt-3 max-w-4xl leading-relaxed text-muted-foreground">The content on this website brings together my many years of personal experience in Israel and first-hand feedback from thousands of clients. I share what I've learned in my <Link to="/travel-blog/" className="font-semibold text-primary underline underline-offset-4">Israel travel guides</Link> to help you plan a visit that suits you.</p>
    </section>

    <section className="border-t bg-secondary/30 py-10 sm:py-12" aria-labelledby="direct-contact-heading">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6">
          <h2 id="direct-contact-heading" className="text-2xl sm:text-3xl">Plan your time in Israel with me</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">Tell me when you're visiting, who you're traveling with and the places you'd love to see. I'll reply personally and help you plan the journey.</p>
        </div>
        <HomeContactForm context="about" />
        <p id="privacy" className="mt-4 scroll-mt-24 text-sm leading-relaxed text-muted-foreground">Read my <Link to="/privacy-policy/" className="font-semibold text-primary underline underline-offset-4">Privacy Policy</Link> for information about the details you share when you contact me.</p>
      </div>
    </section>
  </main>;
}
