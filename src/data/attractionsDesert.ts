import type { Attraction } from "@/data/attractionGuideTypes";
import { deadSeaEditorialOverview } from "@/data/deadSeaAttractionsGuide";
import { einGediCardPhoto } from "@/data/einGediCardPhoto";
import ramonCrater from "@/assets/guides/mitzpe-ramon-crater.jpg";
export const desertAttractions: Record<string, Attraction> = {
  "dead-sea-attractions": deadSeaEditorialOverview,
  "mitzpe-ramon-crater": {
    title: "Mitzpe Ramon & Ramon Crater: viewpoints and desert nature",
    description:
      "Visit the Makhtesh Ramon crater, Mitzpe Ramon viewpoints, visitor center, desert trails and stargazing, with weather and access tips.",
    region: "Dead Sea & Negev",
    image: { src: ramonCrater, alt: "Layered desert cliffs and the landscape of Ramon Crater" },
    duration: "Half day to two days",
    intro:
      "Makhtesh Ramon is a huge erosion landform carved through the Negev Highlands, not a volcanic or meteor-impact crater. The town of Mitzpe Ramon stands on its rim and makes a comfortable starting point for scenery, geology and desert experiences.",
    takeaway:
      "Begin at a marked rim viewpoint and the visitor center, then choose a short signed trail or authorised guided experience. Overnight stays let you enjoy cooler walking hours and clear-sky stargazing.",
    highlights: [
      {
        name: "Ramon Crater Visitor Center",
        description:
          "Exhibits interpret the geology, ecology and the legacy of astronaut Ilan Ramon.",
        tip: "Check reservations, opening conditions and guided programmes in advance.",
      },
      {
        name: "Rim viewpoints and promenade",
        description:
          "Lookouts along the town-side cliff reveal the makhtesh's scale and layered rock.",
        tip: "Keep well behind cliff edges and respect wildlife.",
      },
      {
        name: "Marked desert trails",
        description:
          "Walking options differ by difficulty, shade and access; routes at the bottom of the crater need extra planning.",
        tip: "Carry ample water and maps, and check heat and flash-flood warnings.",
      },
      {
        name: "Stargazing and desert experiences",
        description:
          "The remote Negev setting can provide striking night skies; authorised activities vary by provider and weather.",
        tip: "Use a reputable local guide for off-road access and never drive on unmarked trails.",
      },
    ],
    arrival: [
      "Mitzpe Ramon is south of Beersheba, reached via Route 40 by road or relevant intercity buses.",
      "Public transport serves the town, but reaching individual trailheads may require additional transport.",
      "For a desert outing, a rental car or confirmed driver gives more flexibility, with weather constraints.",
    ],
    planning: [
      "Summer midday heat can be dangerous; choose cooler hours.",
      "Do not approach wild ibex or feed animals.",
      "Park only in authorised places and never walk near unstable cliffs.",
      "Check weather, flash floods, trail closures and site access with the parks authority.",
    ],
    faqs: [
      {
        q: "Is Ramon Crater a meteorite crater?",
        a: "No. It is a makhtesh formed mainly through erosion of folded rock layers.",
      },
      {
        q: "Can I enjoy it without hiking?",
        a: "Yes. Several marked viewpoints around Mitzpe Ramon give impressive views.",
      },
      {
        q: "Is stargazing guaranteed?",
        a: "No. Cloud cover, the moon, light pollution and season affect sky visibility.",
      },
    ],
    official: [{ label: "Israel Nature and Parks Authority", url: "https://en.parks.org.il/" }],
  },
  "ein-gedi": {
    title: "Ein Gedi Nature Reserve: waterfalls, trails and visitor advice",
    description:
      "Plan Ein Gedi Nature Reserve near the Dead Sea, including Nahal David, Nahal Arugot, springs, wildlife and current trail restrictions.",
    region: "Dead Sea & Negev",
    image: einGediCardPhoto,
    duration: "2–4 hours for an accessible open route",
    intro:
      "Ein Gedi is a desert oasis beside the Dead Sea, known for springs, ravines and ibex. Its streams and canyon paths are weather-sensitive, and damage from rockfalls and flash floods means the open trail network can change.",
    takeaway:
      "Check the reserve's official, date-specific opening announcement before setting out. Choose only an open trail appropriate to the group's ability and allow for significant heat even when water is present.",
    highlights: [
      {
        name: "Nahal David",
        description:
          "A well-known stream canyon and waterfall area, subject to changing access and repair after damage.",
        tip: "Do not assume the full former walking circuit is open.",
      },
      {
        name: "Nahal Arugot",
        description:
          "A separate canyon route with longer walking opportunities when conditions permit.",
        tip: "Check whether this route is open and whether a timed entrance is required.",
      },
      {
        name: "Oasis wildlife",
        description: "Ibex, hyrax and a variety of birds inhabit the reserve's rocky habitat.",
        tip: "Keep your distance and never feed wild animals.",
      },
      {
        name: "Kibbutz and surrounding Dead Sea area",
        description:
          "Nearby facilities and viewpoints may be visited separately from protected reserve trails.",
        tip: "Distinguish the nature reserve entrance from hotel and spa locations.",
      },
    ],
    arrival: [
      "Ein Gedi lies along Route 90, north of the Ein Bokek resort strip.",
      "Public buses may stop nearby on some dates, but verify the correct stop and last return service.",
      "Driving or an arranged vehicle can simplify a visit, but parking does not guarantee entry or an open trail.",
    ],
    planning: [
      "Rockfall and flash-flood restrictions can change with little warning.",
      "Bring water, closed shoes and sun protection; water in the canyon is not drinking water.",
      "Do not enter closed trail sections or cross barricades.",
      "Pair this with a Dead Sea stop only after confirming the reserve will be open.",
    ],
    faqs: [
      {
        q: "Is Ein Gedi fully open?",
        a: "Trail accessibility changes. Check the current official Israel Nature and Parks Authority alert for the particular route.",
      },
      {
        q: "Can I hike Nahal David and Nahal Arugot on the same visit?",
        a: "Possibly when both are open, but the two trail systems and available time need separate consideration.",
      },
      {
        q: "Can I swim in the Dead Sea at the reserve?",
        a: "Nature-reserve trails are not a supervised Dead Sea swimming facility. Use designated safe beaches elsewhere.",
      },
    ],
    official: [{ label: "Israel Nature and Parks Authority", url: "https://en.parks.org.il/" }],
  },
};
