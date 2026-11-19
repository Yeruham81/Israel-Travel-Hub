import type { TravelGuide } from "@/data/travelGuides";
import { migrationPhotos as P } from "@/data/guideMigrationPhotos";
import { museums as telAvivMuseumEntries, museumAreas as telAvivMuseumAreas } from "@/data/telAvivMuseums";

export const cityCultureGuides = {
  "eilat": {
    "id": "eilat",
    "updatedAt": "2026-10-20",
    "title": "Eilat travel guide: beaches, coral reefs and desert days",
    "description": "Plan Eilat’s Red Sea beaches, Coral Beach Nature Reserve, Underwater Observatory, Dolphin Reef and desert outings, with transport and hotel-area advice.",
    "intro": "Eilat brings the Red Sea and desert together at Israel’s southern tip. You can build a stay around snorkelling, a beach, family attractions or a quieter resort break, but these experiences are spread along the coast. Decide whether you want the northern hotel promenade or the southern coral-coast setting before choosing where to stay.",
    "answer": "Give Eilat enough time for the kind of holiday you want: one main water or visitor attraction, beach time and a separate desert outing work better than rushing everything into a day. The central hotel waterfront, Coral Beach, Dolphin Reef and Timna are distinct places with separate access, admission and transport needs.",
    "topics": [
      "destinations",
      "attractions",
      "tips"
    ],
    "photo": P["EXISTING:eilat"],
    "facts": [
      {
        "label": "Coastal choice",
        "text": "Northern hotel promenade or southern coral coast"
      },
      {
        "label": "Main experiences",
        "text": "Managed beaches, reef visits and desert scenery"
      },
      {
        "label": "Plan transport",
        "text": "Ramon Airport is outside the city"
      }
    ],
    "comparison": {
      "caption": "Choose the Eilat experience you want",
      "headers": [
        "Experience",
        "Where to focus",
        "Check first"
      ],
      "rows": [
        [
          "Beach and promenade",
          "Northern hotel area",
          "Actual hotel-to-beach walk and beach supervision"
        ],
        [
          "Reef snorkelling",
          "Coral Beach Nature Reserve",
          "Park reservation, equipment and permitted water areas"
        ],
        [
          "Indoor marine exhibits",
          "Underwater Observatory Marine Park",
          "Current programme and separate activity tickets"
        ],
        [
          "Dolphin Reef",
          "Southern coast",
          "Which visits or water activities are offered"
        ],
        [
          "Desert day",
          "Timna or a suitable marked route",
          "Heat, trail access and the journey back"
        ]
      ]
    },
    "sections": [
      {
        "id": "coral-beach",
        "title": "Coral Beach Nature Reserve and the underwater world",
        "paragraphs": [
          "The reserve on Eilat’s southern coast gives access to a protected reef through designated visitor arrangements. Its managed setting is different from choosing an informal spot beside the sea. Check park admission, equipment and the permitted entry points before going into the water.",
          "Observe coral and marine life without touching or standing on them. Choose a snorkelling or diving experience appropriate to your ability and the operator’s conditions; a shore admission ticket is not automatically a guided dive. A dry-land alternative is the Underwater Observatory, a separate attraction with its own exhibitions and tickets."
        ]
      },
      {
        "id": "dolphin-reef",
        "title": "Dolphin Reef and family attractions",
        "paragraphs": [
          "Dolphin Reef is another separately operated coastal attraction. Read the actual admission and activity descriptions: beach access, pools, diving or other experiences can have different booking and age conditions. Do not interpret a wildlife photograph as a promise of touching an animal or a guaranteed encounter.",
          "For families, choose the main attraction around the children’s ages, shade breaks and comfort in the water. A museum-style or aquarium visit and a supervised beach can be alternatives to compare, rather than compulsory stops on one crowded checklist."
        ]
      },
      {
        "id": "beaches",
        "title": "Choose a beach by what you will do there",
        "paragraphs": [
          "The northern hotel frontage is convenient for central accommodation and a promenade walk. Around the southern coast, named beaches and beach businesses offer different settings, while the reserve protects a specific reef area. Princess Beach and Migdalor are names you may encounter when comparing southern stops; check the exact access and facilities rather than assuming they match the reserve.",
          "Mosh’s and Dekel are often considered for a relaxed beach setting, while Hananya and other central areas offer a busier waterfront. Water-sport providers have separate zones and terms. Use a designated bathing area with active supervision and ask the venue about accessibility, shade and equipment before making a special trip."
        ]
      },
      {
        "id": "desert",
        "title": "Desert scenery: a separate outing",
        "paragraphs": [
          "Timna Park combines desert landscapes with archaeological and geological interest north of Eilat. The Red Canyon and Mount Tzfahot are different walking outings with their own route and weather considerations. Select one that fits the season, the group’s ability and the current conditions.",
          "Start early when appropriate, check the official weather and route information and keep to permitted tracks. Do not use a general beach-weather forecast as a hiking plan. A vehicle ride to a viewpoint can be a better choice than a demanding trail on a hot day."
        ],
        "links": [
          {
            "label": "Consider a Ramon Crater stop on a longer route",
            "to": "/attractions/mitzpe-ramon-crater/"
          }
        ]
      },
      {
        "id": "arrival-stay",
        "title": "Getting to Eilat and choosing your base",
        "paragraphs": [
          "Ramon Airport serves the Eilat area from outside the city; check operating flights and the onward bus, taxi or booked transfer for your actual arrival. Intercity buses and a road journey are other options. Include the last leg to the hotel and avoid assuming a transport service runs at every hour.",
          "For a northern hotel, compare the walk to the promenade, shops and beach. For a southern stay, compare access to the reef attractions and the evening journey for meals. Hotel photographs do not establish beach ownership, included spa facilities or current availability. Summer heat can be intense; a winter or shoulder-season stay still needs a local forecast."
        ],
        "links": [
          {
            "label": "Compare accommodation across Israel",
            "to": "/accommodation/"
          },
          {
            "label": "Arrange a private intercity journey",
            "to": "/private-driver/"
          },
          {
            "label": "Choose a suitable travel season",
            "to": "/travel-blog/best-time-to-visit-israel/"
          }
        ]
      }
    ],
    "checklist": [
      "Choose the coast and hotel location before booking",
      "Check separate attraction and water-activity tickets",
      "Plan shade breaks and designated bathing access",
      "Verify weather and routes for desert outings",
      "Confirm the complete airport or intercity journey"
    ],
    "faqs": [
      {
        "q": "Is Coral Beach the same as the Underwater Observatory?",
        "a": "No. The nature reserve and the marine park are separate attractions, with different experiences and admission arrangements."
      },
      {
        "q": "Should I stay in northern or southern Eilat?",
        "a": "Choose the north for a central hotel-and-promenade base, or compare southern options for proximity to coral-coast attractions. Check the actual hotel address and transport."
      },
      {
        "q": "Can I combine Eilat with the Dead Sea or Mitzpe Ramon?",
        "a": "They can form part of a longer road itinerary, but they are separate destinations. Allow real travel and visit time instead of treating them as nearby Eilat attractions."
      }
    ],
    "related": [
      "bestTime",
      "deadSea",
      "topTen",
      "food"
    ],
    "services": [
      {
        "label": "Plan transport within Israel",
        "to": "/travel-blog/getting-around-israel/"
      },
      {
        "label": "Request an intercity driver",
        "to": "/private-driver/"
      }
    ],
    "sourceIds": [
      "m26-coral",
      "m26-observatory",
      "m26-dolphin",
      "m26-timna",
      "m26-ims"
    ]
  },
  "telAvivBeaches": {
    "id": "telAvivBeaches",
    "updatedAt": "2026-10-20",
    "title": "Tel Aviv beaches: choose your stretch of the coast",
    "description": "Compare Gordon, Frishman, Hilton, Jerusalem, Aviv, Metzitzim, Tel Baruch, HaTzuk, Alma and Givat Aliya beaches, with supervision and access advice.",
    "intro": "Tel Aviv–Yafo’s waterfront changes as you walk it: central beaches beside hotels, northern stretches near parks and a southern coast around Jaffa. Most visitors will enjoy choosing one or two areas and spending time there. The right beach depends on your accommodation, swimming plans, facilities and the kind of atmosphere you prefer.",
    "answer": "For an easy central first visit, compare Gordon, Frishman and Jerusalem beaches. Consider Hilton and Metzitzim farther north, or the Jaffa coast for a different setting. Swim only in designated areas while lifeguards are on duty and follow the current flags; a busy promenade or a familiar beach name is not evidence that swimming is permitted.",
    "topics": [
      "attractions",
      "destinations",
      "tips"
    ],
    "photo": P["beaches-in-tel-aviv"],
    "facts": [
      {
        "label": "Central choice",
        "text": "Gordon, Frishman and Jerusalem beaches"
      },
      {
        "label": "Different setting",
        "text": "Northern beaches or the Jaffa coast"
      },
      {
        "label": "Water access",
        "text": "Use the posted flags and lifeguard instructions"
      }
    ],
    "comparison": {
      "caption": "Compare the beach areas",
      "headers": [
        "Beach or stretch",
        "Why consider it",
        "Planning detail"
      ],
      "rows": [
        [
          "Gordon",
          "Central seafront and an active atmosphere",
          "Allow for a busy urban beach"
        ],
        [
          "Frishman",
          "Convenient central hotel-area beach",
          "Check the actual bathing and sport zones"
        ],
        [
          "Hilton",
          "A well-known social and LGBTQ+ meeting area",
          "Different stretches serve different activities"
        ],
        [
          "Jerusalem / Geula area",
          "A central beach-and-city day",
          "Confirm the beach access point you mean"
        ],
        [
          "Aviv",
          "Southern central seafront and water-sport setting",
          "Separate sport areas from bathing areas"
        ],
        [
          "Metzitzim",
          "Northern seafront near the port",
          "Check family facilities for your date"
        ],
        [
          "Tel Baruch",
          "A northern alternative outside the central strip",
          "Plan the onward and return journey"
        ],
        [
          "HaTzuk",
          "Farther-north beach setting",
          "Confirm accessible paths and available assistance"
        ],
        [
          "Alma / Charles Clore",
          "A promenade and Jaffa-oriented outing",
          "Use designated supervised swimming areas only"
        ],
        [
          "Givat Aliya",
          "A southern Jaffa setting",
          "Check posted facilities, access and animal rules"
        ]
      ]
    },
    "sections": [
      {
        "id": "central",
        "title": "Central beaches: Gordon, Frishman and Jerusalem",
        "paragraphs": [
          "These are useful starting points when you stay near the central beachfront. You can combine time by the sea with a meal or a short walk inland without arranging a separate day trip. Facilities and concessions vary, so check shade, toilets, chair hire and your preferred access point on arrival.",
          "The names of neighbouring beaches, streets and beach businesses are not always used consistently in casual directions. Save a precise meeting point, especially for a taxi or a group. A hotel described as beachfront may still involve a road crossing or a walk to the bathing area."
        ],
        "links": [
          {
            "label": "Compare beachfront hotel areas",
            "to": "/accommodation/tel-aviv/beachfront/"
          }
        ]
      },
      {
        "id": "north",
        "title": "Northern choices: Hilton, Metzitzim, Tel Baruch and HaTzuk",
        "paragraphs": [
          "Hilton is well known as an LGBTQ+ social beach area, but different nearby water zones and stretches have different uses. Metzitzim is convenient to the northern promenade and port area. Farther north, Tel Baruch and HaTzuk require more deliberate transport planning from a central hotel.",
          "Accessibility is specific to a route, facility and service, not a permanent label for an entire beach. Ask about accessible parking, the path across the sand, toilets and any bathing assistance. Nordau, the separate religious beach, has its own gender-specific arrangements; check the municipal information rather than applying those rules to neighbouring beaches."
        ]
      },
      {
        "id": "south",
        "title": "Southern stretches: Aviv, Alma and Givat Aliya",
        "paragraphs": [
          "Aviv is useful to consider alongside the southern central promenade. Alma and Charles Clore connect naturally with a Jaffa-oriented walk, while Givat Aliya lies farther south. These are different settings, not one continuous area with identical bathing facilities.",
          "Do not retain old claims that a particular beach always allows dogs, always has a specific sports activity or is automatically suitable for children. Follow the current signs and municipal rules. For a Jaffa day, include the time and slopes between the beach, harbour, old hill and flea market."
        ],
        "links": [
          {
            "label": "Explore Old Jaffa",
            "to": "/attractions/jaffa/"
          },
          {
            "label": "Choose a Jaffa hotel area",
            "to": "/accommodation/tel-aviv/jaffa/"
          }
        ]
      },
      {
        "id": "bathing",
        "title": "Swimming, facilities and the time of day",
        "paragraphs": [
          "Check the current bathing season and the lifeguard station at the exact beach. Follow the flags and local instructions even if other people enter the water. Keep swimming separate from surfing, boats and other designated sport areas. Children need active adult supervision.",
          "Take water and sun protection, and use an early or later visit when that better suits the weather. A promenade walk remains a different activity from swimming. If conditions do not suit a beach day, a museum or neighbourhood outing can make a useful alternative."
        ],
        "links": [
          {
            "label": "Choose an indoor alternative",
            "to": "/travel-blog/museums-in-tel-aviv/"
          },
          {
            "label": "Compare seasonal conditions",
            "to": "/travel-blog/best-time-to-visit-israel/"
          }
        ]
      },
      {
        "id": "beyond-city",
        "title": "Beaches beyond Tel Aviv need their own plan",
        "paragraphs": [
          "Gaash, Palmachim, Dor/Tantura, Sidna Ali near Herzliya and Caesarea are separate coastal outings beyond the central Tel Aviv beachfront. They are not additional stops on the central Tel Aviv promenade. Check the particular managing authority, parking, supervised beach and return transport.",
          "Choose one based on the experience you want, rather than a promise that leaving the city guarantees a quieter or better beach. For a sightseeing combination, the Caesarea archaeological park and nearby beach access have separate visitor arrangements."
        ],
        "links": [
          {
            "label": "Plan a Caesarea visit",
            "to": "/attractions/caesarea/"
          },
          {
            "label": "Compare day trips from Tel Aviv",
            "to": "/travel-blog/day-trips-from-tel-aviv/"
          }
        ]
      }
    ],
    "checklist": [
      "Choose the beach by location and facilities",
      "Check flags and active lifeguard supervision",
      "Confirm accessibility and sport or animal rules locally",
      "Save a precise meeting point",
      "Include shade, water and the return journey"
    ],
    "faqs": [
      {
        "q": "Which beach is best for a first visit?",
        "a": "A central beach such as Gordon, Frishman or Jerusalem is convenient from many beachfront hotels. Choose around your exact address and current bathing arrangements."
      },
      {
        "q": "Is every part of the waterfront a swimming beach?",
        "a": "No. A pleasant promenade or open stretch of sand is not the same as a designated supervised bathing area."
      },
      {
        "q": "Are beaches outside the city automatically quieter?",
        "a": "No. Demand, access and facilities vary. Treat each as a separate outing and check its own visitor information."
      }
    ],
    "related": [
      "telAvivMuseums",
      "food",
      "bestTime",
      "topTen"
    ],
    "services": [
      {
        "label": "Choose where to stay in Tel Aviv",
        "to": "/travel-blog/where-to-stay-in-tel-aviv/"
      },
      {
        "label": "Plan your local journey",
        "to": "/travel-blog/getting-around-tel-aviv/"
      }
    ],
    "sourceIds": [
      "m26-tlv-beaches",
      "m26-tlv-beach-status",
      "m26-tlv-city"
    ]
  },
  // This registry entry supplies cards, search metadata and legacy guide readers.
  // Its museum sections and comparison are derived from the same curated data
  // used by the dedicated public Tel Aviv museums article.
  "telAvivMuseums": {
    id: "telAvivMuseums",
    updatedAt: "2026-11-19",
    title: "Best Museums in Tel Aviv & Jaffa",
    description: "Explore museums in Tel Aviv and Jaffa, from art and natural history to architecture and historic houses, with visitor prices, booking advice and practical neighbourhood routes.",
    intro: "Discover Tel Aviv and Jaffa's museums through my guide to choosing the right collection, planning a manageable itinerary and checking tickets and opening days.",
    answer: "My first choices are Tel Aviv Museum of Art for exhibitions, ANU for Jewish culture and the Steinhardt Museum for natural history. Bialik Square is ideal for a walk between smaller venues. Check admission, current exhibitions and temporary closure notices before visiting.",
    topics: ["attractions", "destinations", "tips"],
    photo: P["museums-in-tel-aviv"],
    facts: [
      { label: "15 venues", text: "Art, history, architecture and family collections" },
      { label: "Plan by area", text: "Central Tel Aviv, Ramat Aviv, Neve Tzedek or Jaffa" },
      { label: "Rates and hours", text: "Official adult prices and usual opening days, checked November 2026" },
    ],
    comparison: {
      caption: "Tel Aviv and Jaffa museums — regular admission and visiting times",
      headers: ["Museum", "Area", "Adult admission", "Usual opening days"],
      rows: telAvivMuseumEntries.map(museum => [
        museum.name, museum.neighbourhood,
        museum.id === "independence" ? "Closed for restoration" : museum.priceNis === 0 ? "Free general entry" : typeof museum.priceNis === "number" ? "NIS " + museum.priceNis : "Confirm with operator",
        museum.openingDays || "Check with operator",
      ]),
    },
    sections: telAvivMuseumAreas.map(area => ({
      id: "area-" + area.id,
      title: area.name,
      paragraphs: [area.intro],
      subsections: telAvivMuseumEntries.filter(museum => museum.area === area.id).map(museum => ({
        id: "museum-" + museum.id,
        title: museum.name,
        paragraphs: [
          museum.intro,
          "Admission: " + museum.admission + ". Usual opening: " + (museum.openingDays || "check with the museum") + ". " + museum.booking + ".",
          "My tip: " + museum.tip,
          ...(museum.closureNote ? [museum.closureNote] : []),
        ],
        bullets: museum.highlights,
        highlightedLinks: [{ label: "Official museum information", href: museum.url, context: "Current visitor details and operating notices" }],
      })),
    })),
    checklist: [
      "Choose an area and one main museum for the day",
      "Check official admission rates, concessions and opening times",
      "Reserve any timed presentation or family gallery",
      "Check separate historic venues and temporary closure notices",
      "Plan transport, accessibility and a meal or walking break",
    ],
    faqs: [
      { q: "What are the best museums for a first visit?", a: "Tel Aviv Museum of Art for art, ANU for Jewish culture and Steinhardt for natural history are good starting points. Around Bialik Square, several smaller museums are within walking distance." },
      { q: "Can I visit multiple museums in one day?", a: "Yes, particularly around Bialik Square. In Ramat Aviv choose one major museum first and check timings before adding a second." },
      { q: "Are some museums temporarily closed?", a: "Independence Hall is closed until further notice for restoration, MUZA's planetarium is temporarily closed and guided walks at Bauhaus Center are suspended. Their museum entries stay in the guide for future visits." },
    ],
    related: ["telAvivBeaches", "food", "calendar", "haifaMuseums"],
    services: [
      { label: "Explore Tel Aviv attractions", to: "/travel-blog/attractions-in-tel-aviv/" },
      { label: "Plan getting around Tel Aviv", to: "/travel-blog/getting-around-tel-aviv/" },
      { label: "Discover Jaffa", to: "/attractions/jaffa/" },
    ],
    sourceIds: [
      "m26-tamuseum", "m26-muza", "m26-anu", "m26-steinhardt",
      "m26-tlv-museum", "m26-palmach", "m26-rabin", "m26-ilana",
      "m26-independence", "m26-defense-museums", "m26-gutman",
      "m26-geller", "m26-rubin", "m26-liebling", "m26-bialik", "m26-bauhaus",
    ],
  },
  "haifaMuseums": {
    "id": "haifaMuseums",
    "updatedAt": "2026-10-20",
    "title": "Best museums in Haifa: art, science, ships and city history",
    "description": "Compare Haifa’s art, maritime, Japanese-art, science, city-history and railway museums. Plan by hillside location and distinguish museums from garden visits.",
    "intro": "Haifa’s museum day changes with the subject and the hill. Contemporary art, Japanese art, maritime collections and science experiences are spread between downtown, the German Colony, the Carmel and the waterfront. Choose an area and one main institution, then use the actual terrain and transport connections to decide what else fits.",
    "answer": "Compare Haifa Museum of Art for contemporary art, Tikotin for Japanese art, the National Maritime Museum for seafaring and MadaTech for science experiences. Haifa City Museum adds local urban history. Check the specific institution’s current programme and hours; a Haifa Museums bundle does not mean every museum or attraction in the city is included.",
    "topics": [
      "attractions",
      "destinations",
      "tips"
    ],
    "photo": P["museums-in-haifa"],
    "facts": [
      {
        "label": "Art and culture",
        "text": "Haifa Museum of Art and Tikotin"
      },
      {
        "label": "Science and sea",
        "text": "MadaTech and separate maritime institutions"
      },
      {
        "label": "Plan by elevation",
        "text": "Downtown, Carmel and waterfront are distinct"
      }
    ],
    "comparison": {
      "caption": "Choose your Haifa museum focus",
      "headers": [
        "Interest",
        "Museums or visits",
        "Important distinction"
      ],
      "rows": [
        [
          "Contemporary art",
          "Haifa Museum of Art",
          "Check current exhibitions and the specific entrance"
        ],
        [
          "Japanese art",
          "Tikotin Museum of Japanese Art",
          "A Carmel-area visit, separate from downtown"
        ],
        [
          "Seafaring",
          "National Maritime Museum",
          "Separate from the naval and immigration museum"
        ],
        [
          "Science and families",
          "MadaTech",
          "Activity suitability and tickets depend on the programme"
        ],
        [
          "City and community",
          "Haifa City Museum",
          "A German Colony / downtown-oriented stop"
        ],
        [
          "Transport and specialist collections",
          "Railway Museum; specialist venues by arrangement",
          "Confirm current public access before travelling"
        ]
      ]
    },
    "sections": [
      {
        "id": "art",
        "title": "Haifa Museum of Art and Tikotin",
        "paragraphs": [
          "Haifa Museum of Art presents changing exhibitions in the Wadi Nisnas area. Tikotin Museum of Japanese Art is a separate institution on the Carmel. Their subjects, locations and schedules differ, so choose the collection or exhibition that interests you rather than treating the two names as one stop.",
          "The municipal museum network also includes Mané-Katz and Hermann Struck. A combined ticket can be useful only when its current participating museums and validity match your plans. Check the network’s current price and opening pages instead of repeating an old bundle price."
        ]
      },
      {
        "id": "maritime",
        "title": "Two different maritime histories",
        "paragraphs": [
          "The National Maritime Museum covers seafaring and maritime culture. The Clandestine Immigration and Naval Museum, operated through the Ministry of Defense museum system, tells a different story focused on immigration and naval history. They are distinct venues even though both involve ships.",
          "Before setting off, choose which collection you want, confirm the public entrance and check booking, language and age guidance. Do not assume that a ticket issued by the municipal network includes a Ministry of Defense museum."
        ]
      },
      {
        "id": "science-city",
        "title": "MadaTech and Haifa City Museum",
        "paragraphs": [
          "MadaTech focuses on science, technology and interactive experiences. It can suit a family day when the current exhibitions and activities match the children’s ages. Check the actual programme, outdoor elements and ticket conditions directly with the museum.",
          "Haifa City Museum, in the German Colony, explores the city’s communities and urban stories through changing exhibitions. It can pair more naturally with a lower-city walk than a quick trip up and down the Carmel. Allow for a meal and the journey back to your accommodation."
        ]
      },
      {
        "id": "specialist",
        "title": "Railways and specialist collections",
        "paragraphs": [
          "The Israel Railway Museum is a separate railway-history venue with its own visitor arrangements. Check Israel Railways’ current museum information; passing through a working city railway station is not the same as arriving at the museum entrance.",
          "For specialist collections such as the Israeli Personal Computer Museum, arrange visits directly: confirm that public visits are currently offered, the address and any appointment requirement before travelling. Do not rely on a general city-museum timetable for them."
        ]
      },
      {
        "id": "outdoors",
        "title": "The Bahá’í Gardens and sculpture walks are different outings",
        "paragraphs": [
          "The Bahá’í Gardens are a religious and landscaped visitor setting, not a museum. Their permitted viewpoints, guided routes, dress and opening arrangements are controlled separately. A city museum ticket does not grant unrestricted passage through all the terraces.",
          "An outdoor sculpture garden or promenade walk can complement a museum day, but weather, gradients and access still matter. Choose the actual route you can manage rather than planning an ambitious cross-city walk from a flat map."
        ],
        "links": [
          {
            "label": "Plan Haifa’s gardens, viewpoints and coast",
            "to": "/travel-blog/haifa/"
          }
        ]
      },
      {
        "id": "plan",
        "title": "Plan an enjoyable museum day in a hilly city",
        "paragraphs": [
          "Start with one main museum and check whether the next stop is nearby at the same elevation. A bus, taxi or other local connection can leave more useful time than repeated uphill walking. If you arrive by cruise, work backwards from the required port return and the passenger-terminal exit.",
          "Check each institution’s exhibition, last entry and accessibility arrangements. The municipal network’s opening table is useful for its own museums; independent institutions and special events need their own confirmation. A rainy day can make museums appealing, but does not give them identical opening patterns."
        ],
        "links": [
          {
            "label": "Compare Haifa accommodation areas",
            "to": "/travel-blog/best-hotels-in-haifa/"
          },
          {
            "label": "Plan a day from Haifa Port",
            "to": "/shore-excursions/haifa/"
          },
          {
            "label": "Check holiday and event planning",
            "to": "/travel-blog/calendar-of-events/"
          }
        ]
      }
    ],
    "checklist": [
      "Choose the collection before the route",
      "Check the actual museum entrance and elevation",
      "Read the current exhibition and opening information",
      "Verify what a combined ticket includes",
      "Arrange specialist visits directly",
      "Leave time for the return to your hotel or port"
    ],
    "faqs": [
      {
        "q": "Are all Haifa museums covered by one ticket?",
        "a": "No. Check the municipal network’s current bundle and participating venues. MadaTech, railway and Ministry of Defense venues have separate arrangements."
      },
      {
        "q": "Are the Bahá’í Gardens a museum?",
        "a": "No. They are a separately managed religious and landscaped site with their own visiting rules."
      },
      {
        "q": "Can I walk between all the museums?",
        "a": "Individual nearby combinations may work, but the city’s slopes and spread make transport useful for many cross-city visits."
      }
    ],
    "related": [
      "telAvivMuseums",
      "calendar",
      "topTen",
      "bestTime"
    ],
    "services": [
      {
        "label": "Explore Haifa city sights",
        "to": "/travel-blog/haifa/"
      },
      {
        "label": "Browse museums and other attractions",
        "to": "/attractions/"
      }
    ],
    "sourceIds": [
      "m26-haifa-museums",
      "m26-haifa-hours",
      "m26-madatech",
      "m26-railway",
      "m26-defense-museums",
      "m26-bahai",
      "m26-computers"
    ]
  }
} satisfies Record<string, TravelGuide>;
