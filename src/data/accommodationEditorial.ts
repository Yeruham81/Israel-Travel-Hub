export const accommodationEditorial = {
  jerusalem: { path: "/travel-blog/where-to-stay-in-jerusalem/", title: "Where to stay in Jerusalem",
    description: "Compare Jerusalem neighbourhoods for Old City access, transport, food and local atmosphere before choosing hotels.",
    intro: "Jerusalem's hills, Old City gates and different neighbourhood rhythms make the location of your hotel especially important. I compare the main areas, from Jaffa Road to the Old City and quieter residential streets, so you can choose a base that suits your trip.",
    tip: "For a first visit, consider the walk to the Old City gates, the light rail, evening dining and where a taxi can stop with your luggage." },
  telaviv: { path: "/travel-blog/where-to-stay-in-tel-aviv/", title: "Where to stay in Tel Aviv",
    description: "Compare Tel Aviv and Jaffa neighborhoods for beaches, food markets, nightlife and transport before booking.",
    intro: "A beachfront hotel, a small place in Jaffa and an address near Rothschild Boulevard can give you very different experiences. I explain the city's main areas and their tradeoffs before you choose a hotel.",
    tip: "Decide how often you want to walk to the sea, which neighborhoods you will visit in the evening and whether you need convenient public transport." },
  haifa: { path: "/travel-blog/best-hotels-in-haifa/", title: "The best hotels in Haifa: where to stay",
    description: "Compare Haifa's Carmel, German Colony, downtown and beach areas before choosing boutique or family hotels.",
    intro: "Haifa stretches from the Mediterranean coast to Mount Carmel. I explain where to stay for city views, the German Colony, sightseeing or beach time before pointing you to the relevant hotel choices.",
    tip: "Haifa is hilly. Check a hotel's elevation, public transport connection and the final walk to attractions." },
  tiberias: { path: "/travel-blog/best-hotels-in-tiberias/", title: "The best hotels in Tiberias: where to stay",
    description: "Find a Tiberias or Sea of Galilee base with practical advice on lakefront, hillside and family stays.",
    intro: "Tiberias works both as a lakeside break and as a base for exploring the Sea of Galilee. Compare the central promenade, hillside views and quieter places around the lake before choosing a hotel.",
    tip: "Plan how you will reach sites around the Sea of Galilee; a hillside view may mean a steep journey back from the waterfront." },
  deadsea: { path: "/travel-blog/best-dead-sea-hotels/", title: "Dead Sea best hotels: where to stay",
    description: "Understand Ein Bokek, the southern Dead Sea resort area and Ein Gedi before choosing a spa or family hotel.",
    intro: "At the Dead Sea, location and facilities can shape your whole stay. I explain the differences between Ein Bokek, the southern hotel district and Ein Gedi before you compare spa resorts, family hotels and quieter options.",
    tip: "Check the exact beach route, meals and transport; a resort in Ein Bokek and a stay in Ein Gedi are very different bases." },
} as const;
export type AccommodationEditorialId = keyof typeof accommodationEditorial;

/** Public transport and access sources shared by Jerusalem guide text and Article schema. */
export const jerusalemStaySourceIds = [
  "israel-rail",
  "jerusalem-light-rail-updates",
  "jerusalem-emek-refaim-works",
] as const;
