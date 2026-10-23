import { Link, type LinkProps } from "@tanstack/react-router";

/** Direct, contextual, reciprocal Jerusalem links. No sponsored URLs are invented. */
export type JerusalemClusterKey =
  | "jerusalem" | "jerusalemChurches" | "jerusalemShopping" | "jerusalemDayTrips"
  | "bethlehem" | "jerusalemDeadSea"
  | "old-city-jerusalem" | "mount-of-olives" | "mount-zion" | "museums-in-jerusalem"
  | "tour-jerusalem" | "tour-bethlehem-jericho" | "tour-masada-dead-sea"
  | "tour-food-markets" | "shore-ashdod" | "airport-jerusalem" | "stay-jerusalem";

type Destination = { label: string; to: LinkProps["to"]; why: string };
const L = (label: string, to: LinkProps["to"], why: string): Destination => ({ label, to, why });

export const jerusalemConnections: Record<JerusalemClusterKey, Destination[]> = {
  jerusalem: [
    L("Old City walking guide", "/travel-blog/old-city-jerusalem/", "The four quarters, gates and practical routes"),
    L("Churches in Jerusalem", "/travel-blog/churches-in-jerusalem/", "A pilgrimage-oriented route by district"),
    L("Shopping and markets", "/travel-blog/shopping-in-jerusalem/", "Mahane Yehuda, Old City crafts and the centre"),
    L("Where to stay in Jerusalem", "/travel-blog/where-to-stay-in-jerusalem/", "Match your hotel to the sights you want"),
    L("Jerusalem tours", "/tours/jerusalem/", "Compare guided walks and day itineraries"),
    L("Getting here from Ben Gurion Airport", "/travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/", "Train, bus and road choices"),
  ],
  "old-city-jerusalem": [
    L("Churches of Jerusalem", "/travel-blog/churches-in-jerusalem/", "Plan the Holy Sepulchre and pilgrimage stops"),
    L("Mount Zion", "/travel-blog/mount-zion/", "A walk outside Zion Gate"),
    L("Shopping in Jerusalem", "/travel-blog/shopping-in-jerusalem/", "The Cardo and Old City markets"),
    L("Jerusalem guided tours", "/tours/jerusalem/", "Check walking length, start city and language"),
    L("Jerusalem city guide", "/travel-blog/jerusalem-travel-guide/", "Build a wider city itinerary"),
    L("Old City hotel areas", "/jerusalem/old-city-hotels/", "Check luggage and pedestrian access"),
  ],
  "mount-of-olives": [
    L("Churches of Jerusalem", "/travel-blog/churches-in-jerusalem/", "Connect the viewpoint to Gethsemane and sacred sites"),
    L("Old City walking guide", "/travel-blog/old-city-jerusalem/", "Choose the correct gate and onward walking route"),
    L("Jerusalem tours", "/tours/jerusalem/", "Find guided itineraries including the hill"),
    L("Private driver service", "/private-driver/", "Ask about an upper lookout and a lower pickup"),
    L("Jerusalem city guide", "/travel-blog/jerusalem-travel-guide/", "Fit the hill into a city stay"),
  ],
  "mount-zion": [
    L("Old City and Zion Gate", "/travel-blog/old-city-jerusalem/", "Continue to the Armenian Quarter"),
    L("Churches in Jerusalem", "/travel-blog/churches-in-jerusalem/", "More on Dormition and Gallicantu"),
    L("Jerusalem guided tours", "/tours/jerusalem/", "Check the exact sacred sites covered"),
    L("Jerusalem city guide", "/travel-blog/jerusalem-travel-guide/", "Include Mount Zion without retracing the route"),
  ],
  "museums-in-jerusalem": [
    L("Jerusalem city guide", "/travel-blog/jerusalem-travel-guide/", "Build a museum and Old City itinerary"),
    L("Old City walking guide", "/travel-blog/old-city-jerusalem/", "Pair Tower of David with Jaffa Gate"),
    L("Where to stay in Jerusalem", "/travel-blog/where-to-stay-in-jerusalem/", "Choose a convenient base"),
    L("Jerusalem tours", "/tours/jerusalem/", "Compare guided city and heritage experiences"),
  ],
  jerusalemChurches: [
    L("Old City visitor guide", "/travel-blog/old-city-jerusalem/", "Gates, quarters and navigating the lanes"),
    L("Mount of Olives", "/travel-blog/mount-of-olives/", "Churches and slope-specific visit advice"),
    L("Mount Zion", "/travel-blog/mount-zion/", "Cenacle, Dormition and Gallicantu"),
    L("Jerusalem tours", "/tours/jerusalem/", "Choose a guided pilgrimage visit"),
    L("Bethlehem travel options", "/travel-blog/jerusalem-to-bethlehem/", "For an additional Nativity visit"),
    L("Cruise tours from Ashdod", "/ashdod-shore-excursions/", "Plan around all-aboard time"),
  ],
  jerusalemShopping: [
    L("Old City walking guide", "/travel-blog/old-city-jerusalem/", "Markets and the Cardo alongside historic sites"),
    L("Mahane Yehuda / Nachlaot hotels", "/jerusalem/mahane-yehuda-nachlaot-hotels/", "Stay close to the market"),
    L("Food and market tours", "/tours/food-market-tours/", "Experiences with optional tastings"),
    L("Jerusalem city guide", "/travel-blog/jerusalem-travel-guide/", "Place shopping within a wider visit"),
    L("Jerusalem events calendar", "/travel-blog/calendar-of-events/", "Check fairs and event dates"),
  ],
  jerusalemDayTrips: [
    L("Jerusalem to the Dead Sea", "/travel-blog/jerusalem-to-the-dead-sea/", "Plan an independent bus, car or tour journey"),
    L("Masada and Dead Sea tours", "/tours/masada-dead-sea/", "Compare guided and transport-only options"),
    L("Jerusalem to Bethlehem", "/travel-blog/jerusalem-to-bethlehem/", "Understand the border and local travel"),
    L("Bethlehem and Jericho tours", "/tours/bethlehem-jericho-jordan-river/", "Compare published guided itineraries"),
    L("Private driver", "/private-driver/", "Request a route and complete transport quote"),
    L("Jerusalem accommodation", "/travel-blog/where-to-stay-in-jerusalem/", "Pick a starting base"),
  ],
  bethlehem: [
    L("Bethlehem, Jericho and Jordan River tours", "/tours/bethlehem-jericho-jordan-river/", "Guided options are separate from an independent bus trip"),
    L("Day trips from Jerusalem", "/travel-blog/day-trips-from-jerusalem/", "Compare the destinations and time commitments"),
    L("Churches in Jerusalem", "/travel-blog/churches-in-jerusalem/", "Connect a Nativity trip with city pilgrimage sites"),
    L("Old City and Damascus Gate", "/travel-blog/old-city-jerusalem/", "Plan the bus approach near Damascus Gate"),
    L("Jerusalem city guide", "/travel-blog/jerusalem-travel-guide/", "Fit Bethlehem around the rest of your stay"),
  ],
  jerusalemDeadSea: [
    L("Masada and Dead Sea tours", "/tours/masada-dead-sea/", "Compare complete itineraries and inclusions"),
    L("Masada visitor guide", "/travel-blog/masada/", "National park access and cable car planning"),
    L("Dead Sea attractions", "/travel-blog/dead-sea-attractions/", "Choose a beach, reserve or other stop"),
    L("Day trips from Jerusalem", "/travel-blog/day-trips-from-jerusalem/", "Compare a desert trip with other routes"),
    L("Dead Sea hotels", "/travel-blog/best-dead-sea-hotels/", "For overnight resort visits"),
  ],
  "tour-jerusalem": [
    L("Jerusalem city guide", "/travel-blog/jerusalem-travel-guide/", "Plan your time before selecting a tour"),
    L("Old City walking guide", "/travel-blog/old-city-jerusalem/", "Understand quarters, gates and walking demands"),
    L("Jerusalem churches", "/travel-blog/churches-in-jerusalem/", "Research sacred sites on the itinerary"),
    L("Mount of Olives", "/travel-blog/mount-of-olives/", "Viewpoints and church visits"),
    L("Jerusalem shopping and markets", "/travel-blog/shopping-in-jerusalem/", "Browse the city independently"),
  ],
  "tour-bethlehem-jericho": [
    L("Jerusalem to Bethlehem transport", "/travel-blog/jerusalem-to-bethlehem/", "Independent bus, taxi and crossing choices"),
    L("Jerusalem day trips", "/travel-blog/day-trips-from-jerusalem/", "Choose a workable full-day route"),
    L("Churches in Jerusalem", "/travel-blog/churches-in-jerusalem/", "Build a pilgrimage-focused stay"),
  ],
  "tour-masada-dead-sea": [
    L("Jerusalem to the Dead Sea", "/travel-blog/jerusalem-to-the-dead-sea/", "Buses, driving and local destinations"),
    L("Day trips from Jerusalem", "/travel-blog/day-trips-from-jerusalem/", "Compare other ideas for a day out"),
    L("Masada National Park guide", "/travel-blog/masada/", "Prepare for the fortress and cable car"),
  ],
  "tour-food-markets": [
    L("Jerusalem shopping and markets", "/travel-blog/shopping-in-jerusalem/", "Choose a market to browse"),
    L("Jerusalem city guide", "/travel-blog/jerusalem-travel-guide/", "Plan the market with nearby sightseeing"),
  ],
  "shore-ashdod": [
    L("Jerusalem city guide", "/travel-blog/jerusalem-travel-guide/", "Choose sites that fit the port day"),
    L("Old City walking guide", "/travel-blog/old-city-jerusalem/", "Understand the length and accessibility of the walk"),
    L("Churches in Jerusalem", "/travel-blog/churches-in-jerusalem/", "Prioritise important pilgrimage stops"),
    L("Jerusalem day trips", "/travel-blog/day-trips-from-jerusalem/", "Plan separate excursions during a longer stay"),
  ],
  "airport-jerusalem": [
    L("Jerusalem city guide", "/travel-blog/jerusalem-travel-guide/", "Plan the visit once you reach the city"),
    L("Old City visitor guide", "/travel-blog/old-city-jerusalem/", "Pick the correct gate for a hotel or walking route"),
    L("Where to stay", "/travel-blog/where-to-stay-in-jerusalem/", "Check your final hotel approach"),
    L("Private airport transfer to Jerusalem", "/travel-blog/ben-gurion-airport-to-jerusalem/", "A separate direct booking request"),
  ],
  "stay-jerusalem": [
    L("Jerusalem city guide", "/travel-blog/jerusalem-travel-guide/", "Choose a neighbourhood near your planned sites"),
    L("Old City walking guide", "/travel-blog/old-city-jerusalem/", "Check gate access and luggage walks"),
    L("Jerusalem shopping and markets", "/travel-blog/shopping-in-jerusalem/", "Choose between Mamilla and Mahane Yehuda"),
    L("Airport to Jerusalem", "/travel-blog/how-to-get-from-ben-gurion-airport-to-jerusalem/", "Compare the final journey to your hotel"),
    L("Jerusalem tours", "/tours/jerusalem/", "Find guided visits departing from your area"),
  ],
};

export function JerusalemClusterLinks({ pageKey }: { pageKey: JerusalemClusterKey }) {
  const links = jerusalemConnections[pageKey];
  if (!links?.length) return null;
  return <section aria-labelledby="jerusalem-connections-h" className="mt-12 border-t pt-8" data-testid="jerusalem-cluster-links">
    <h2 id="jerusalem-connections-h" className="text-2xl font-semibold sm:text-3xl">Explore more around Jerusalem</h2>
    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">Find the practical guide, related place or booking options relevant to the next part of your visit.</p>
    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
      {links.map(item => <li key={String(item.to)}>
        <Link to={item.to} className="group block h-full rounded-xl border bg-card p-4 hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          <span className="block font-semibold leading-snug group-hover:text-primary">{item.label} <span aria-hidden="true">→</span></span>
          <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{item.why}</span>
        </Link>
      </li>)}
    </ul>
  </section>;
}
