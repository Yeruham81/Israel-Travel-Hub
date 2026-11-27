import { createFileRoute } from "@tanstack/react-router";
import { BedDouble, BookOpen, CalendarDays, Smartphone, Sun, TrainFront } from "lucide-react";
import { IconTripPlanningLinks } from "@/components/IconTripPlanningLinks";
import { FaqList, HubHeader } from "@/components/Guide";
import { TourCategoryExplorer, TourCruiseCallout } from "@/components/TourDiscovery";
import { TourPhotoCredits } from "@/components/TourCategoryPage";
import { tourCategories, toursHubFaqs, toursHubTitle, TOURS_UPDATED_DATE } from "@/data/tours";
import { travelGuidePaths } from "@/data/travel-guide-paths";

const planningLinks = [
  {
    title: "Getting around Israel",
    description: "Transport options between destinations.",
    to: travelGuidePaths.israel,
    icon: TrainFront,
  },
  {
    title: "Best time to visit",
    description: "Weather, seasons and trip planning.",
    to: travelGuidePaths.bestTime,
    icon: Sun,
  },
  {
    title: "Where to stay",
    description: "Accommodation and convenient bases.",
    to: "/accommodation/" as const,
    icon: BedDouble,
  },
  {
    title: "Israel travel tips",
    description: "Practical advice before your visit.",
    to: travelGuidePaths.travelTips,
    icon: BookOpen,
  },
  {
    title: "Israel holidays & events",
    description: "Plan around festivals and special dates.",
    to: travelGuidePaths.calendar,
    icon: CalendarDays,
  },
  {
    title: "Travel eSIM for Israel",
    description: "Stay connected during your trip.",
    to: travelGuidePaths.esim,
    icon: Smartphone,
  },
] as const;

export const Route = createFileRoute("/tours/")({
  head: async (ctx) => {
    const { routeHead } = await import("../route-heads/tours.index.head");
    return Reflect.apply(routeHead, undefined, [ctx]);
  },
  component: Tours,
});

function Tours() {
  return (
    <main className="pb-12">
      <HubHeader
        crumbs={[
          { name: "Home", to: "/" },
          { name: "Tours & day trips", to: "/tours/" },
        ]}
        title={toursHubTitle}
        checkedAt={TOURS_UPDATED_DATE}
        intro="Explore Israel's highlights, from Jerusalem and the Dead Sea to the Galilee, Negev and Red Sea. Find guided tours, private experiences and local activities to suit your travel plans."
      />
      <div className="mx-auto max-w-5xl px-4">
        <TourCategoryExplorer />
        <TourCruiseCallout />
        <FaqList faqs={toursHubFaqs} compact />
        <IconTripPlanningLinks
          title="Plan your trip to Israel"
          items={planningLinks}
          id="tour-planning"
        />
        <TourPhotoCredits photos={tourCategories.map((category) => category.photo)} />
      </div>
    </main>
  );
}
