export const accommodationEditorial = {
  jerusalem: { path: "/travel-blog/where-to-stay-in-jerusalem/", title: "Where to Stay in Jerusalem: Choose Your Base",
    description: "Compare Jerusalem neighbourhoods for Old City access, transport, food and local atmosphere before choosing hotels.",
    intro: "Jerusalem's hills, Old City gates and different neighbourhood rhythms make the location of your hotel especially important. I compare the main areas, from Jaffa Road to the Old City and quieter residential streets, so you can choose a base that suits your trip.",
    tip: "For a first visit, consider the walk to the Old City gates, the light rail, evening dining and where a taxi can stop with your luggage." },
  telaviv: { path: "/travel-blog/where-to-stay-in-tel-aviv/", title: "Where to Stay in Tel Aviv: Beaches & Neighborhoods",
    description: "Compare Tel Aviv and Jaffa neighborhoods for beaches, food markets, nightlife and transport before booking.",
    intro: "A beachfront hotel, a small place in Jaffa and an address near Rothschild Boulevard can give you very different experiences. I explain the city's main areas and their tradeoffs before you choose a hotel.",
    tip: "Decide how often you want to walk to the sea, which neighborhoods you will visit in the evening and whether you need convenient public transport." },
  haifa: { path: "/travel-blog/best-hotels-in-haifa/", title: "Best Hotels in Haifa: Where to Stay",
    description: "Compare 10 Haifa hotels by location, travel style, beach access and facilities, from the German Colony and Mount Carmel to the southern coast.",
    intro: "Haifa offers very different hotel locations, from the restaurants of the German Colony to Mount Carmel viewpoints and the southern beachfront. I compare ten places to stay, with practical advice on neighborhoods, getting around and choosing the right hotel.",
    tip: "Match your hotel to the part of Haifa you plan to explore. The city's steep slopes make station choice, stairs and the final walk especially important." },
  tiberias: { path: "/travel-blog/best-hotels-in-tiberias/", title: "The best hotels in Tiberias: where to stay",
    description: "Compare ten Tiberias hotels for lakefront luxury, family water parks, central convenience and independent stays. See lake access, tips and booking links.",
    intro: "Tiberias offers lakeside escapes, family water parks, hotels near the promenade and convenient bases for exploring the Sea of Galilee. In my guide, I compare ten places to stay and share practical advice on lake access, location and getting around.",
    tip: "Plan how you will reach sites around the Sea of Galilee; a hillside view may mean a steep journey back from the waterfront." },
  deadsea: { path: "/travel-blog/best-dead-sea-hotels/", title: "Best Dead Sea hotels: where to stay",
    description: "Compare 11 Dead Sea hotels for luxury, spa, family holidays and value. Find practical beach access advice, Ein Gedi alternatives and booking links.",
    intro: "At the Dead Sea, the hotel can shape your whole holiday. I compare luxury escapes, spa breaks, family resorts and practical stays around Ein Bokek and Neve Zohar, plus quieter options near Ein Gedi, to help you choose what really suits your trip.",
    tip: "Check the exact beach route, meals and transport; a resort in Ein Bokek and a stay in Ein Gedi are very different bases." },
} as const;
export type AccommodationEditorialId = keyof typeof accommodationEditorial;

/** Public transport and access sources shared by Jerusalem guide text and Article schema. */
export const jerusalemStaySourceIds = [
  "israel-rail",
  "jerusalem-light-rail-updates",
  "jerusalem-emek-refaim-works",
] as const;
