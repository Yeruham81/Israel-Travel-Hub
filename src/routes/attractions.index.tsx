import { createFileRoute } from "@tanstack/react-router";
import { HubCard, HubHeader, RelatedLinks } from "@/components/Guide";
import { attractionGuides } from "@/data/attractionGuides";
import { attractionIds, attractionPath, type Region } from "@/data/attractionGuideTypes";
import { travelGuides } from "@/data/travelGuides";
import { travelGuidePaths, type TravelGuideId } from "@/data/registry";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/attractions/")({
  head: () =>
    pageMeta({
      title: "Israel attractions: cities, heritage, beaches and nature",
      description: "Explore Israel’s city, museum, beach, pilgrimage and nature guides, from Jerusalem and Galilee to the Dead Sea and Eilat, with practical visiting advice.",
      path: "/attractions/",
      crumbs: [{ name: "Home", path: "/" }, { name: "Attractions", path: "/attractions/" }],
    }),
  component: Attractions,
});

const regions: Region[] = ["Jerusalem", "Tel Aviv & Jaffa", "Dead Sea & Negev", "Haifa & northern coast", "Lower Galilee & Jezreel Valley", "Sea of Galilee", "Eilat & Red Sea"];
const regionalGuides: Partial<Record<Region, TravelGuideId[]>> = {
  "Tel Aviv & Jaffa": ["telAvivBeaches", "telAvivMuseums"],
  "Haifa & northern coast": ["haifaMuseums"],
  "Lower Galilee & Jezreel Valley": ["megiddo", "precipice", "annunciation"],
  "Sea of Galilee": ["magdala", "yardenit"],
  "Dead Sea & Negev": ["deadSea", "qasr"],
  "Eilat & Red Sea": ["eilat"],
};


function Attractions() {
  return (
    <main className="mx-auto max-w-5xl px-4 pb-8">
      <HubHeader
        crumbs={[{ name: "Home", to: "/" }, { name: "Attractions", to: "/attractions/" }]}
        eyebrow="Attractions & experiences"
        title="Attractions and experiences"
        intro="Explore historic cities, sacred sites, museums and remarkable natural landscapes. Choose an area to find practical visitor advice, what to see and how to get there."
      />
      <div className="mt-8"><HubCard to={travelGuidePaths.topTen} eyebrow="Build your itinerary" title={travelGuides.topTen.title} text={travelGuides.topTen.description} cta="Choose your experiences" /></div>
      {regions.map((region) => (
        <section key={region} aria-label={region} className="mt-10">
          <h2 className="text-3xl">{region}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {attractionIds.filter(id => attractionGuides[id].region === region).map(id => (
              <HubCard key={id} to={attractionPath(id)} eyebrow="Attractions & places" title={attractionGuides[id].title}
                text={attractionGuides[id].description} cta="Plan your visit" />
            ))}
            {(regionalGuides[region] || []).map(id => <HubCard key={id} to={travelGuidePaths[id]} eyebrow="Visitor guide" title={travelGuides[id].title} text={travelGuides[id].description} cta="Read more" />)}
            {region === "Dead Sea & Negev" && <HubCard to="/travel-blog/masada/" eyebrow="National park · archaeology" title="Masada National Park" text="Cable car, hiking, archaeology and spectacular views of the Dead Sea." cta="Plan your visit" />}
            {region === "Haifa & northern coast" && <HubCard to="/attractions/caesarea/" eyebrow="National park · archaeology" title="Caesarea National Park" text="Ancient harbour and Roman remains by the Mediterranean." cta="Plan your visit" />}
          </div>
        </section>
      ))}
      <RelatedLinks title="Related" items={[
        { label: "Tours & day trips", to: "/tours/" },
        { label: "Car rental", to: "/car-rental/" },
        { label: "Destinations", to: "/destinations/" },
      ]} />
    </main>
  );
}
