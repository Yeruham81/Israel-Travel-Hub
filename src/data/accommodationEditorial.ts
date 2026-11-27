export const accommodationEditorial = {
  jerusalem: {
    path: "/travel-blog/where-to-stay-in-jerusalem/",
    title: "Where to Stay in Jerusalem: Choose Your Base",
    description:
      "Compare Jerusalem neighborhoods for Old City access, transport, food and local atmosphere before choosing hotels.",
    intro:
      "Jerusalem's hills, historic neighborhoods and Old City entrances make hotel location particularly important. I'll help you choose between the city center, the Old City and quieter residential neighborhoods.",
    tip: "For a first visit, consider the walk to the Old City gates, the light rail, evening dining and where a taxi can stop with your luggage.",
  },
  telaviv: {
    path: "/travel-blog/where-to-stay-in-tel-aviv/",
    title: "Where to Stay in Tel Aviv: Beaches & Neighborhoods",
    description:
      "Compare Tel Aviv and Jaffa neighborhoods for beaches, food markets, nightlife and transport before booking.",
    intro:
      "From Mediterranean beaches and historic Jaffa to the cafés of Rothschild Boulevard, Tel Aviv offers a wide variety of places to stay. I'll help you choose the neighborhood that best suits your visit.",
    tip: "Decide how often you want to walk to the sea, which neighborhoods you will visit in the evening and whether you need convenient public transport.",
  },
  haifa: {
    path: "/travel-blog/best-hotels-in-haifa/",
    title: "Best Hotels in Haifa: Where to Stay",
    description:
      "Compare 10 Haifa hotels by location, travel style, beach access and facilities, from the German Colony and Mount Carmel to the southern coast.",
    intro:
      "Haifa's hotel districts range from the historic German Colony and scenic Mount Carmel to the southern beachfront. Here are ten of my recommended hotels, with practical advice on their locations, facilities and transport options.",
    tip: "Match your hotel to the part of Haifa you plan to explore. Haifa's steep hills make walking routes, accessibility and transport connections particularly important.",
  },
  tiberias: {
    path: "/travel-blog/best-hotels-in-tiberias/",
    title: "The best hotels in Tiberias: where to stay",
    description:
      "Compare ten Tiberias hotels for lakefront luxury, family water parks, central convenience and independent stays. See lake access, tips and booking links.",
    intro:
      "Tiberias offers luxury lakeside hotels, family resorts with water parks and central accommodation for exploring the Sea of Galilee. Here are ten of my recommended hotels, with advice on lake access, location and local transport.",
    tip: "Plan transport for sightseeing around the Sea of Galilee, and allow for uphill walks if you're staying above the waterfront.",
  },
  deadsea: {
    path: "/travel-blog/best-dead-sea-hotels/",
    title: "Best Dead Sea hotels: where to stay",
    description:
      "Compare 11 Dead Sea hotels for luxury, spa, family holidays and value. Find practical beach access advice, Ein Gedi alternatives and booking links.",
    intro:
      "Your choice of hotel at the Dead Sea determines much of your holiday experience, from beach access to spa and leisure facilities. I've selected luxury hotels, spa resorts, family accommodation and more affordable options in Ein Bokek, Neve Zohar and Ein Gedi.",
    tip: "Compare beach access, meal plans and transport options when choosing between the southern resorts and Ein Gedi.",
  },
} as const;
export type AccommodationEditorialId = keyof typeof accommodationEditorial;

/** Public transport and access sources shared by Jerusalem guide text and Article schema. */
export const jerusalemStaySourceIds = [
  "israel-rail",
  "jerusalem-light-rail-updates",
  "jerusalem-emek-refaim-works",
] as const;
