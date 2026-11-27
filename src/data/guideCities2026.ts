import type { TravelGuide } from "@/data/travelGuides";
import { migrationPhotos as P } from "@/data/guideMigrationPhotos";
import { museums as telAvivMuseumEntries, museumAreas as telAvivMuseumAreas } from "@/data/telAvivMuseums";
import { telAvivBeaches as listedTelAvivBeaches } from "@/data/telAvivBeaches";

export const cityCultureGuides = {
  "telAvivBeaches": {
    id: "telAvivBeaches",
    updatedAt: "2026-11-19",
    title: "The Best Beaches in Tel Aviv",
    description: "My guide to Tel Aviv's 13 municipal bathing beaches, with practical picks, a map, lifeguards, safety, accessibility, dog areas and getting around.",
    intro: "From the lively central beaches to quieter northern stretches and the coast around Jaffa, my guide helps you choose where to swim, relax and explore.",
    answer: "For an easy first visit, choose Gordon or Frishman near the central hotel strip; Metzitzim is a good starting point for families and Charles Clore suits a day around Jaffa. Swim only in marked zones with lifeguards on duty, and check current municipal status.",
    topics: ["attractions", "destinations", "tips"],
    photo: P["beaches-in-tel-aviv"],
    facts: [
      { label: "13 listed beaches", text: "From North Tzuk to Givat Aliya" },
      { label: "Central picks", text: "Gordon, Frishman, Bograshov and Jerusalem" },
      { label: "Plan your swim", text: "Check current lifeguards, flags and access" },
    ],
    comparison: {
      caption: "Compare Tel Aviv's thirteen municipally listed bathing beaches",
      headers: ["Beach", "Area", "Best for", "Facilities & access"],
      rows: listedTelAvivBeaches.map(beach => [beach.name, beach.area, beach.bestFor, beach.highlights + " · " + beach.accessShort]),
    },
    sections: [
      {
        id: "choose", title: "Which Tel Aviv beach should you choose?",
        paragraphs: [
          "For a first visit, I usually suggest Gordon or Frishman. Metzitzim is useful for families near the port, while Hilton is known for its LGBTQ+ social scene and Charles Clore works well with a Jaffa outing.",
        ],
      },
      ...(["Northern coast", "Central seafront", "Southern coast and Jaffa"] as const).map(area => ({
        id: area === "Northern coast" ? "north" : area === "Central seafront" ? "center" : "south",
        title: area,
        paragraphs: [listedTelAvivBeaches.filter(beach => beach.area === area).map(beach => beach.name).join(", ") + "."],
        subsections: listedTelAvivBeaches.filter(beach => beach.area === area).map(beach => ({
          id: "beach-" + beach.id, title: beach.name, paragraphs: [beach.summary, beach.tip],
        })),
      })),
      {
        id: "safety", title: "Swimming, lifeguards and accessibility",
        paragraphs: [
          "Visit the municipality's current beach and lifeguard page for seasonal operation and daily conditions. Swim only inside a declared bathing zone with lifeguards on duty.",
          "Accessible routes and bathing assistance vary. North Tzuk has a documented slope limitation, while the city lists water-access chairs and other facilities at several beaches.",
          "There are no lifeguard services at Aviv Beach. This is a water-sports stretch rather than one of the 13 declared bathing beaches.",
        ],
      },
      {
        id: "beyond", title: "More beaches beyond Tel Aviv",
        paragraphs: ["For a different outing, consider Sidna Ali in Herzliya, Ga'ash or Palmahim Beach National Park. These require separate transport and bathing-condition checks."],
      },
    ],
    checklist: [
      "Choose a beach near your hotel or planned sightseeing area",
      "Check active lifeguard supervision and posted flags",
      "Confirm accessibility, family facilities or dog-area signs if relevant",
      "Take water and sun protection",
      "Plan transport back, especially from the northern beaches",
    ],
    faqs: [
      { q: "Which Tel Aviv beach is best for a first visit?", a: "Gordon or Frishman are convenient choices for many visitors staying in central Tel Aviv." },
      { q: "Are Tel Aviv's beaches free?", a: "Access is free; beach-equipment hire and parking can cost extra." },
      { q: "Can I swim all year?", a: "Only with active lifeguard supervision in the designated swimming area. Check current municipal notices, flags and local conditions." },
    ],
    related: ["telAvivMuseums", "food", "bestTime", "topTen"],
    services: [
      { label: "Choose where to stay in Tel Aviv", to: "/travel-blog/where-to-stay-in-tel-aviv/" },
      { label: "Plan getting around Tel Aviv", to: "/travel-blog/getting-around-tel-aviv/" },
      { label: "Explore Jaffa", to: "/attractions/jaffa/" },
    ],
    sourceIds: ["m26-tlv-beaches", "m26-tlv-beach-status", "m26-tlv-city"],
  },
  // This registry entry supplies cards, search metadata and legacy guide readers.
  // Its museum sections and comparison are derived from the same curated data
  // used by the dedicated public Tel Aviv museums article.
  "telAvivMuseums": {
    id: "telAvivMuseums",
    updatedAt: "2026-11-19",
    title: "Best Museums in Tel Aviv & Jaffa",
    description: "Explore Tel Aviv and Jaffa museums: art, natural history, architecture and historic houses, with admission, opening hours and practical route advice.",
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
      { q: "Are some museums temporarily closed?", a: "Independence Hall is closed until further notice for restoration, and MUZA's planetarium is closed as of November 2026. Check the Bauhaus Center's programme directly to confirm guided or self-guided tours are running before your visit." },
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
    "updatedAt": "2026-11-21",
    "title": "Best Museums in Haifa: Visitor Guide to Art, Science and History",
    "description": "My guide to Haifa’s best museums: opening times, admission, maps, tickets and family tips, with realistic routes from downtown to the Carmel and waterfront.",
    "intro": "Plan your museum day in Haifa with my practical recommendations for science, contemporary art, archaeology, Japanese art and maritime heritage.",
    "answer": "Choose MadaTech for families, Haifa Museum of Art or Tikotin for art, the Hecht Museum for archaeology, and the National Maritime Museum for seafaring. My updated guide compares ten institutions by location, admission and opening arrangements, with a note on the temporary closure of Mané-Katz Museum.",
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
            "to": "/attractions/haifa/"
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
        "to": "/attractions/haifa/"
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
