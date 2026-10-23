import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { guideDirectory } from "@/data/travelGuides";
import { isPublisherUrl } from "@/data/registry";
import type { CityStayGuide } from "@/data/content";
import roadTrip from "@/assets/home/road-trip.webp";
import hotelRoom from "@/assets/home/hotel-room.webp";

type PlanningItem = { title: string; description: string; to: NonNullable<LinkProps["to"]>; image?: { src: string; alt: string } };

const choices: Record<"jerusalem" | "telaviv", PlanningItem[]> = {
  jerusalem: [
    { title: "Getting here from Ben Gurion Airport", description: "Compare rail, buses, taxis and private transfers before planning the final walk to your hotel.", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/" },
    { title: "Arriving on Shabbat", description: "Check weekend travel options and organise your Friday-evening or Saturday hotel arrival.", to: "/travel-blog/from-ben-gurion-airport-on-shabbat/" },
    { title: "Plan a visit to Masada", description: "Pair your Jerusalem hotel base with an early desert outing and the right transport.", to: "/travel-blog/masada/" },
    { title: "Day trips from Jerusalem", description: "Plan worthwhile excursions without changing your accommodation every night.", to: "/travel-blog/day-trips-from-jerusalem/" },
    { title: "Choosing the best season", description: "Understand how Jerusalem's weather and other regional conditions shape your visit.", to: "/travel-blog/best-time-to-visit-israel/" },
    { title: "Explore all accommodation", description: "Compare other city, lakeside, beach and Dead Sea hotel destinations.", to: "/accommodation/", image: { src: hotelRoom, alt: "Illustration of a guest room, representing accommodation choices" } },
  ],
  telaviv: [
    { title: "From Ben Gurion Airport to Tel Aviv", description: "Pick the most practical arrival route and final connection to your chosen hotel area.", to: "/travel-blog/how-to-get-from-ben-gurion-airport-to-tel-aviv/" },
    { title: "Getting around Tel Aviv", description: "Make use of walking routes, city buses, the Red Line and taxis.", to: "/travel-blog/getting-around-tel-aviv/" },
    { title: "Find the right Tel Aviv beach", description: "Compare central beachfront access and quieter stretches along the coast.", to: "/travel-blog/beaches-in-tel-aviv/" },
    { title: "Day trips from Tel Aviv", description: "Explore destinations outside the city while keeping a convenient hotel base.", to: "/travel-blog/day-trips-from-tel-aviv/" },
    { title: "Holidays and special events", description: "Check the dates that can change opening hours, arrival logistics and hotel demand.", to: "/travel-blog/calendar-of-events/" },
    { title: "Car rental for the next leg", description: "Decide if and when a rental car makes sense beyond the walkable city.", to: "/car-rental/", image: { src: roadTrip, alt: "Illustration of a road trip through Israel" } },
  ],
};

export function CityStayPlanning({ city }: { city: CityStayGuide["id"] }) {
  if (city !== "jerusalem" && city !== "telaviv") return null;
  const selected = choices[city].map((item) => {
    const guide = guideDirectory.find((entry) => entry.to === item.to);
    return { ...item, photo: item.image || guide?.photo, credit: guide?.photo };
  });
  const credited = selected.filter((item) => item.credit?.sourceUrl && !isPublisherUrl(item.credit.sourceUrl));
  return (
    <section aria-labelledby="city-planning-h" className="mt-14">
      <p className="eyebrow">After choosing your hotel</p>
      <h2 id="city-planning-h" className="mt-2 text-3xl md:text-4xl">Plan the rest of your trip</h2>
      <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
        The right hotel is only one part of an easy visit. Explore transport, day trips and practical guides that help you spend more time seeing the city and less time organising logistics.
      </p>
      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {selected.map((item) => (
          <li key={item.to} className="min-w-0">
            <Link to={item.to} className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              {item.photo && <img src={item.photo.src} alt={item.photo.alt} loading="lazy" decoding="async" width={600} height={375} className="aspect-[16/10] w-full object-cover" />}
              <span className="flex flex-1 flex-col p-5">
                <span className="text-lg font-semibold leading-snug text-foreground group-hover:text-primary">{item.title}</span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</span>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">Read more <ArrowRight className="h-4 w-4 shrink-0" aria-hidden /></span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {credited.length > 0 && <details className="mt-6 rounded-xl border bg-card p-4 text-xs text-muted-foreground">
        <summary className="cursor-pointer font-semibold">Planning card photo credits</summary>
        <ul className="mt-3 space-y-2">{credited.map((item) => (
          <li key={item.to}><a href={item.credit!.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{item.title} — {item.credit?.credit || "Photo source"}</a>
          {item.credit?.licenseUrl && <> · <a href={item.credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline">License</a></>}</li>
        ))}</ul>
      </details>}
    </section>
  );
}
