import { createFileRoute, Link } from "@tanstack/react-router";
import ashdod from "@/assets/home/ashdod-port.webp";
import haifa from "@/assets/home/haifa-port.webp";
import { HubHeader } from "@/components/Guide";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/shore-excursions")({
  head: () =>
    pageMeta({
      title: "Israel shore excursions from Ashdod and Haifa cruise ports",
      description: "Compare private shore excursions from Ashdod or Haifa to Jerusalem, Galilee, Masada and the coast. Check ship timing and driver quote terms.",
      path: "/shore-excursions/",
      crumbs: [{ name: "Home", path: "/" }, { name: "Shore excursions", path: "/shore-excursions/" }],
    }),
  component: Shore,
});

const ports = [
  { to: "/ashdod-shore-excursions/", name: "From Ashdod Port", text: "Southern port: Jerusalem, Tel Aviv–Jaffa or Masada and the Dead Sea.", img: ashdod, alt: "Aerial view of Ashdod Port" },
  { to: "/haifa-shore-excursions/", name: "From Haifa Port", text: "Northern port: Akko, the Galilee, Nazareth — or a long day to Jerusalem.", img: haifa, alt: "Haifa Port and Haifa Bay from Mount Carmel" },
] as const;

function Shore() {
  return (
    <main className="mx-auto max-w-5xl px-4 pb-8">
      <HubHeader
        crumbs={[{ name: "Home", to: "/" }, { name: "Shore excursions", to: "/shore-excursions/" }]}
        eyebrow="Shore excursions"
        title="Shore excursions from Israel's cruise ports"
        intro="Start with your cruise port and ship's hours ashore. Open the Haifa or Ashdod page to explore destination photos, compare published private-driver starting rates and request a day trip planned around your ship."
      />
      <section aria-labelledby="ports-h" className="mt-10">
        <h2 id="ports-h" className="text-3xl">Choose your port</h2>
        <ul className="mt-5 grid gap-5 sm:grid-cols-2">
          {ports.map((p) => (
            <li key={p.to}>
              <Link to={p.to} className="group block overflow-hidden rounded-2xl border bg-card transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <img src={p.img} alt={p.alt} width={900} height={600} decoding="async" className="aspect-[3/2] w-full object-cover" />
                <div className="p-5">
                  <h3 className="text-2xl group-hover:text-primary">{p.name}</h3>
                  <p className="mt-1.5 text-muted-foreground">{p.text}</p>
                  <span className="mt-3 inline-block font-semibold text-primary">View day trips & starting prices →</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-14 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border bg-card p-6">
          <h2 className="text-2xl">Know your hours</h2>
          <p className="mt-2 text-muted-foreground">Have your ship name, date, disembarkation and all-aboard times ready before comparing options.</p>
        </div>
        <div className="rounded-2xl border bg-card p-6">
          <h2 className="text-2xl">Driver or guide</h2>
          <p className="mt-2 text-muted-foreground">A private driver isn't automatically a licensed guide. Ask which you're booking.</p>
        </div>
        <div className="rounded-2xl border bg-card p-6">
          <h2 className="text-2xl">Confirm the return</h2>
          <p className="mt-2 text-muted-foreground">Meeting points, delay handling and cancellation terms vary by provider — get them in writing.</p>
        </div>
      </section>
    </main>
  );
}
