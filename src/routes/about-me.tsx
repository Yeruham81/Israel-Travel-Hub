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
  head: async (ctx) => {
    const { routeHead } = await import("../route-heads/about-me.head");
    return Reflect.apply(routeHead, undefined, [ctx]);
  },
  component: MosheAbout,
});

const personalApproach = [
  {
    icon: HeartHandshake,
    title: "Personal attention",
    detail: "I listen to your interests and plan around your travel companions and preferred pace.",
  },
  {
    icon: Clock3,
    title: "Professional service",
    detail: "I value punctuality, careful driving and clear communication throughout your trip.",
  },
  {
    icon: MapPinned,
    title: "Local knowledge",
    detail:
      "I know the roads and distances between destinations, and can help you choose stops that fit your schedule.",
  },
];

const services = [
  {
    photo: airportTransferPhotos["other"]!,
    title: "Airport transfers",
    detail:
      "I arrange airport pickup and transport to your destination, taking your flight and luggage into account.",
    to: "/airport-transfers/" as const,
  },
  {
    photo: toursHubHero,
    title: "Tours & day-trip ideas",
    detail: "Find day-trip ideas for Jerusalem, the Dead Sea, the Galilee and other destinations.",
    to: "/tours/" as const,
  },
  {
    photo: privateDriverHero,
    title: "My private driver service",
    detail: "Choose the places you want to visit and enjoy a private journey at your own pace.",
    to: "/private-driver-in-israel/" as const,
  },
];

function MosheAbout() {
  return (
    <main className="pb-6">
      <section id="moshe-barak" className="scroll-mt-24 border-b bg-secondary/30">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-[minmax(0,1fr)_220px] md:py-14">
          <div>
            <p className="eyebrow">Your local driver in Israel</p>
            <h1 className="guide-page-title mt-3">Let me help you discover Israel</h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed sm:text-xl">
              I'm <strong className="font-semibold">Moshe Barak</strong>, and I've spent more than
              20 years helping visitors get around Israel and explore the country.
            </p>
            <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
              I was born and raised in Israel, and enjoy sharing the places I know and helping
              visitors plan their time here.
            </p>
            <a
              href={tripadvisorProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read Reviews on TripAdvisor"
              data-external-icon="none"
              className="mt-6 inline-flex items-center gap-3 rounded-xl bg-[#34e0a1] px-5 py-3 text-center font-semibold leading-snug text-[#002b1c] transition-colors hover:bg-[#2bc68e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <img
                src="/images/tripadvisor-owl-black.svg"
                alt=""
                width={28}
                height={28}
                className="size-7"
              />
              <span>
                Read Reviews on
                <br />
                TripAdvisor
              </span>
            </a>
          </div>
          <figure className="mx-auto w-full max-w-[200px] overflow-hidden rounded-2xl border bg-card shadow-sm">
            <img
              src={portrait}
              alt="Moshe Barak"
              className="aspect-[4/5] w-full object-cover object-top"
              width={240}
              height={300}
              fetchPriority="high"
            />
          </figure>
        </div>
      </section>

      <section
        className="mx-auto max-w-6xl px-4 pb-4 pt-10 sm:pt-12"
        aria-labelledby="experience-heading"
      >
        <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] lg:gap-10">
          <div>
            <p className="eyebrow">Years of journeys across Israel</p>
            <h2 id="experience-heading" className="mt-2 text-2xl leading-tight sm:text-3xl">
              Experience that makes the journey easier
            </h2>
            <p className="mt-4 leading-relaxed">
              Over the years, I've driven solo travelers, couples, families and small groups from
              around the world, from airport pickups to sightseeing trips across Israel.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              The people I meet are what make this work special. I enjoy helping them discover
              places they might otherwise miss.
            </p>
          </div>
          <figure className="min-w-0">
            <img
              src={clientCollage}
              alt="Moshe Barak with clients during journeys around Israel"
              width={681}
              height={341}
              loading="lazy"
              decoding="async"
              className="h-auto w-full rounded-2xl border bg-card shadow-sm"
            />
            <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A few memories with my travelers around Israel.
            </figcaption>
          </figure>
        </div>
      </section>

      <div id="reviews" className="scroll-mt-24">
        <TripadvisorReviewsSection personal />
      </div>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-12" aria-labelledby="approach-heading">
        <h2 id="approach-heading" className="text-2xl sm:text-3xl">
          The care I bring to your journey
        </h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
          From your first message to your final drop-off, here's what you can expect from me.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {personalApproach.map(({ icon: Icon, title, detail }) => (
            <article key={title} className="rounded-2xl border bg-card p-5 sm:p-6">
              <Icon size={25} className="text-primary" aria-hidden />
              <h3 className="mt-4 text-xl font-semibold">{title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="border-y bg-secondary/30 py-10 sm:py-12"
        aria-labelledby="services-heading"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="services-heading" className="text-2xl sm:text-3xl">
            How I can help you explore Israel
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {services.map(({ photo, title, detail, to }) => (
              <Link
                key={title}
                to={to}
                className="editorial-card-link group flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-colors hover:border-primary/50 hover:bg-secondary/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    width={640}
                    height={360}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex-1 p-5 sm:p-6">
                  <h3 className="text-xl font-semibold transition-colors group-hover:text-primary">
                    {title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{detail}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="methodology"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 py-10"
        aria-labelledby="methodology-heading"
      >
        <h2 id="methodology-heading" className="text-2xl">
          Experience behind my travel guides
        </h2>
        <p className="mt-3 max-w-4xl leading-relaxed text-muted-foreground">
          My website draws on years of experience traveling around Israel and first-hand feedback
          from thousands of clients. I share what I've learned in my{" "}
          <Link
            to="/travel-blog/"
            className="font-semibold text-primary underline underline-offset-4"
          >
            Israel travel guides
          </Link>{" "}
          to help you plan your visit.
        </p>
      </section>

      <section
        className="border-t bg-secondary/30 py-10 sm:py-12"
        aria-labelledby="direct-contact-heading"
      >
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-6">
            <h2 id="direct-contact-heading" className="text-2xl sm:text-3xl">
              Plan your time in Israel with me
            </h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
              Tell me when you're visiting and where you'd like to go. I'll reply personally.
            </p>
          </div>
          <HomeContactForm context="about" />
          <p
            id="privacy"
            className="mt-4 scroll-mt-24 text-sm leading-relaxed text-muted-foreground"
          >
            Read my{" "}
            <Link
              to="/privacy-policy/"
              className="font-semibold text-primary underline underline-offset-4"
            >
              Privacy Policy
            </Link>{" "}
            for information about the details you share when you contact me.
          </p>
        </div>
      </section>
    </main>
  );
}
