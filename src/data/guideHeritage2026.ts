import type { TravelGuide } from "@/data/travelGuides";
import { migrationPhotos as P } from "@/data/guideMigrationPhotos";
import { magdalaSite } from "@/data/magdalaSite";
import { yardenitSite } from "@/data/yardenitSite";
import { mountPrecipiceSite } from "@/data/mountPrecipiceSite";
import { telMegiddoSite } from "@/data/telMegiddoSite";

export const heritageGuides = {
  "megiddo": {
    "id": "megiddo",
    "updatedAt": telMegiddoSite.updatedAt,
    "title": telMegiddoSite.title,
    "description": telMegiddoSite.description,
    "intro": telMegiddoSite.intro,
    "answer": "Explore the ancient city gates, excavation layers, viewpoints and water system, with an easy-to-follow visitor route.",
    "topics": ["attractions", "destinations", "religion"],
    "photo": telMegiddoSite.hero,
    // The published page is maintained in TelMegiddoAttractionPage.
    // Keep only SEO, directory and shared metadata here to avoid duplicate editorial content.
    "facts": [],
    "comparison": { "caption": "", "headers": [], "rows": [] },
    "sections": [],
    "checklist": [],
    "faqs": [],
    "related": [],
    "services": [],
    "sourceIds": ["m26-megiddo", "m26-megiddo-reservation", "m26-unesco-tels", "m26-megiddo-water-system"]
  },
  "precipice": {
    "id": "precipice",
    "updatedAt": mountPrecipiceSite.updatedAt,
    "title": mountPrecipiceSite.title,
    "description": mountPrecipiceSite.description,
    "intro": mountPrecipiceSite.intro,
    "answer": "Visit the Three Faiths Lookout for the Jezreel Valley panorama, with longer hilltop walks if you have time.",
    "topics": ["attractions", "destinations", "religion"],
    "photo": mountPrecipiceSite.hero,
    // The published visitor article is maintained only in MountPrecipiceAttractionPage.
    // Retain the TravelGuide shape here solely for SEO, link discovery and shared metadata.
    "facts": [],
    "comparison": { "caption": "", "headers": [], "rows": [] },
    "sections": [],
    "checklist": [],
    "faqs": [],
    "related": [],
    "services": [],
    "sourceIds": ["m26-precipice-kkl", "m26-precipice-jesus-trail", "m26-precipice-nazareth-tourism"]
  },
  "annunciation": {
    "id": "annunciation",
    "updatedAt": "2026-10-20",
    "title": "Basilica of the Annunciation, Nazareth: a visitor guide",
    "description": "Explore Nazareth’s Basilica of the Annunciation, the grotto, upper church and Marian artworks, with worship, dress, accessibility and transport advice.",
    "intro": "The Basilica of the Annunciation is a central landmark of Nazareth and a major Catholic pilgrimage sanctuary. Its modern church shelters layers of earlier worship and the grotto associated in Catholic tradition with the Annunciation. Plan time to experience the spaces quietly, rather than treating the basilica as a brief exterior photograph.",
    "answer": "Visit the lower sanctuary and the upper church when access permits, and look at the international Marian artworks around the complex. Worship, ceremonies and individual visitor arrangements shape what you can enter. This Catholic basilica is distinct from the Greek Orthodox Annunciation church associated with Mary’s Well.",
    "topics": [
      "attractions",
      "destinations",
      "religion"
    ],
    "photo": P["basilica-of-the-annunciation"],
    "facts": [
      {
        "label": "Setting",
        "text": "Central Nazareth, with separate lower and upper spaces"
      },
      {
        "label": "Tradition",
        "text": "Catholic association with the Annunciation"
      },
      {
        "label": "Visit respectfully",
        "text": "Services and posted instructions take priority"
      }
    ],
    "comparison": {
      "caption": "What to see in the sanctuary",
      "headers": [
        "Area",
        "Why it matters",
        "How to approach it"
      ],
      "rows": [
        [
          "Lower sanctuary and grotto",
          "The focus of the Catholic tradition",
          "Respect prayer space and any restricted access"
        ],
        [
          "Upper church",
          "A large worship setting and religious art",
          "Check whether a service is taking place"
        ],
        [
          "Marian artworks",
          "Depictions from different communities and countries",
          "Leave time to look beyond the main grotto"
        ],
        [
          "Nearby Nazareth sites",
          "Additional churches and old-city streets",
          "Separate opening and walking arrangements"
        ]
      ]
    },
    "sections": [
      {
        "id": "tradition",
        "title": "A living sanctuary with a layered history",
        "paragraphs": [
          "The modern basilica stands at a site associated with earlier Christian churches and the Catholic tradition of Mary’s home. Its significance combines religious memory, architecture and continuing worship. Historical building phases and the faith tradition are related subjects, but they should not be described as identical kinds of evidence.",
          "Nazareth contains other Annunciation-related places, including the Greek Orthodox church near Mary’s Well. Confirm which sanctuary you mean when arranging a meeting point or a guide; similar English names do not identify the same entrance."
        ]
      },
      {
        "id": "grotto-upper-church",
        "title": "The grotto and the upper church",
        "paragraphs": [
          "The lower sanctuary focuses attention on the grotto, while the upper church offers a larger worship space. Allow a visit to unfold around services and the permitted visitor route. Not every altar, chapel or ceremonial area is open for casual entry at all times.",
          "The Marian images and mosaics contributed by different countries give the visit an international dimension. Look at them at a respectful pace, follow photography instructions and avoid blocking those coming to pray."
        ],
        "photo": P["annunciation-interior"]
      },
      {
        "id": "worship",
        "title": "Dress, services and organised prayer",
        "paragraphs": [
          "Wear clothing appropriate for a religious site and follow the posted dress instructions. Keep voices low and ask before photographing worshippers. A sightseeing visit is not permission to conduct a private ceremony, use a reserved space or enter during every service.",
          "If your group needs Mass, a particular language or organised prayer, coordinate with the sanctuary before fixing the rest of the day. Religious calendars can affect Nazareth visits differently from a regular weekday timetable."
        ],
        "links": [
          {
            "label": "Check religious calendars",
            "to": "/travel-blog/calendar-of-events/"
          },
          {
            "label": "Compare Jerusalem church visits",
            "to": "/travel-blog/churches-in-jerusalem/"
          }
        ]
      },
      {
        "id": "arrival",
        "title": "Getting to central Nazareth",
        "paragraphs": [
          "Give a driver the exact basilica entrance or a confirmed nearby drop-off rather than only the city name. Parking and old-city walking can take extra time. If arriving by intercity bus, check the remaining local journey and the return service before setting off.",
          "For mobility needs, ask about the actual entrances, levels and assistance needed for your chosen route. A modern building does not guarantee that every adjoining historic area can be reached without steps."
        ]
      },
      {
        "id": "day-plan",
        "title": "Build a focused Nazareth and Galilee day",
        "paragraphs": [
          "A basilica visit and a meal or old-city walk can form the centre of the day. Mount Precipice is a separate viewpoint outing; Mount Tabor and the Sea of Galilee require distinct road journeys. Choose the sites most important to your visit rather than rushing a long list of churches.",
          "For a private journey, agree whether the booking includes a licensed guide, transport only, waiting and admissions. Keep any worship appointment as a fixed time allowance in the itinerary."
        ],
        "links": [
          {
            "label": "Add a Mount Precipice viewpoint",
            "to": "/attractions/mount-precipice/"
          },
          {
            "label": "Explore the Sea of Galilee",
            "to": "/travel-blog/sea-of-galilee/"
          },
          {
            "label": "Discuss a custom journey",
            "to": "/private-driver/"
          }
        ]
      }
    ],
    "checklist": [
      "Confirm the sanctuary and exact entrance",
      "Check visitor access around services",
      "Arrange any ceremony or group prayer separately",
      "Dress respectfully and follow photography rules",
      "Ask about the route between levels if needed",
      "Leave enough time for Nazareth itself"
    ],
    "faqs": [
      {
        "q": "Is this the same church as the one near Mary’s Well?",
        "a": "No. The Catholic basilica and the Greek Orthodox Annunciation church are distinct sanctuaries with different entrances and arrangements."
      },
      {
        "q": "Can I visit during every service?",
        "a": "Worship takes priority. Follow the sanctuary’s current visitor instructions and coordinate organised religious activities in advance."
      },
      {
        "q": "Does a private driver automatically provide guiding inside?",
        "a": "No. Agree whether licensed guiding, admissions and any sanctuary arrangements are included separately from transport."
      }
    ],
    "related": [
      "precipice",
      "magdala",
      "yardenit",
      "calendar"
    ],
    "services": [
      {
        "label": "Plan a northern day from Jerusalem",
        "to": "/travel-blog/day-trips-from-jerusalem/"
      },
      {
        "label": "Plan a northern day from Tel Aviv",
        "to": "/travel-blog/day-trips-from-tel-aviv/"
      }
    ],
    "sourceIds": [
      "m26-annunciation",
      "m26-cicts"
    ]
  },
  "magdala": {
    "id": "magdala",
    "updatedAt": magdalaSite.updatedAt,
    "title": magdalaSite.title,
    "description": magdalaSite.description,
    "intro": magdalaSite.intro,
    "answer": "Choose Magdala for first-century archaeology and the modern Duc In Altum setting, then confirm what your admission and visit include. The ancient settlement is associated with Mary Magdalene’s traditional home region; that association is not archaeological proof of a particular house or a documented birthplace.",
    "topics": [
      "attractions",
      "destinations",
      "religion"
    ],
    "photo": magdalaSite.hero,
    "facts": [
      {
        "label": "Ancient setting",
        "text": "A first-century Jewish settlement and synagogue"
      },
      {
        "label": "Modern sanctuary",
        "text": "Duc In Altum is a separate prayer setting"
      },
      {
        "label": "Plan ahead",
        "text": "Admission, guiding and religious services are distinct"
      }
    ],
    "comparison": {
      "caption": "Understand the different parts of Magdala",
      "headers": [
        "Part",
        "Main interest",
        "Planning question"
      ],
      "rows": [
        [
          "Archaeological park",
          "Synagogue and settlement remains",
          "Which areas and interpretations are open?"
        ],
        [
          "Magdala Stone story",
          "The significance of a notable archaeological find",
          "What is displayed and explained on the visit?"
        ],
        [
          "Duc In Altum",
          "Modern religious architecture and prayer",
          "Does a service affect visitor access?"
        ],
        [
          "Lakeside itinerary",
          "Other northwestern-shore sites",
          "How much driving and visit time remains?"
        ]
      ]
    },
    "sections": [
      {
        "id": "archaeology",
        "title": "The ancient settlement and synagogue",
        "paragraphs": [
          "The archaeological park introduces a Jewish town in the world of first-century Galilee. The synagogue remains and the interpretation of the Magdala Stone help explain communal and religious life. Follow the marked visitor route and the site’s current explanation of the excavations.",
          "Archaeological work and displays can change. Ask what you can actually see rather than expecting every object or area shown in an old photograph to be on the visitor route. A guided introduction can add context when the excavated structures are not immediately easy to interpret."
        ],
        "photo": P["magdala-archaeology"]
      },
      {
        "id": "duc-in-altum",
        "title": "Duc In Altum: a modern place of prayer",
        "paragraphs": [
          "Duc In Altum is the modern prayer center, with architecture and imagery connected to Gospel themes and the lakeside setting. It is part of a living religious complex, not simply another archaeological room. Dress respectfully and keep the atmosphere quiet.",
          "A general visitor admission does not automatically arrange Mass, a private ceremony or a guided visit in your language. Coordinate any religious appointment directly and allow it its own time in the day."
        ]
      },
      {
        "id": "mary-magdalene",
        "title": "Religious association and archaeological evidence",
        "paragraphs": [
          "Magdala is traditionally associated with Mary Magdalene. That tradition is meaningful to many visitors, but it should be presented alongside the evidence for the ancient settlement rather than as proof of every detail of an individual life.",
          "The Jewish archaeological setting and the modern Christian interpretation can both be part of the visit. A careful guide will explain which material belongs to the ancient town and which spaces were built for contemporary worship."
        ]
      },
      {
        "id": "visit",
        "title": "Admission, comfort and the journey",
        "paragraphs": [
          "Use Magdala’s official visit-planning page for the current ticket, visitor route and group arrangements. Ask about accessible paths, shade and rest stops for your particular party. Comfortable footwear helps when moving between outdoor excavations and interior spaces.",
          "The site is on the western side of the Sea of Galilee, with a separate road journey from Tiberias or neighbouring sanctuaries. A town bus stop or a hotel address nearby is not necessarily the visitor entrance. Confirm the final leg and pickup point."
        ]
      },
      {
        "id": "combine",
        "title": "Combine nearby sites without rushing",
        "paragraphs": [
          "Capernaum, Tabgha and the Mount of Beatitudes are separate visits on the northern side of the lake. Yardenit lies by the lake’s southern outlet and is not next door to the northern sanctuaries. Choose a manageable group of sites and account for their different visiting windows.",
          "A quiet archaeological-and-prayer visit can be more rewarding than fitting Magdala between several timed ceremonies. If your day includes a baptism, plan the rest of the route around that appointment."
        ],
        "links": [
          {
            "label": "Explore Capernaum",
            "to": "/attractions/capernaum/"
          },
          {
            "label": "Plan Tabgha",
            "to": "/attractions/tabgha/"
          },
          {
            "label": "Plan a separate Yardenit visit",
            "to": "/attractions/yardenit/"
          }
        ]
      }
    ],
    "checklist": [
      "Use the official admission and group information",
      "Distinguish archaeology from modern worship spaces",
      "Arrange services or guiding separately",
      "Confirm the visitor entrance and pickup",
      "Check the actual display and open route",
      "Choose a manageable lakeside combination"
    ],
    "faqs": [
      {
        "q": "Is Duc In Altum an ancient synagogue?",
        "a": "No. It is a modern prayer center alongside the archaeological park, which includes the ancient synagogue remains."
      },
      {
        "q": "Does the site prove where Mary Magdalene was born?",
        "a": "The traditional association with Magdala is not archaeological proof of a particular birthplace or house."
      },
      {
        "q": "Can I combine Magdala and Yardenit?",
        "a": "They can form part of a planned lake-area day, but they are separate sites. Include the road journey and any fixed ceremony time."
      }
    ],
    "related": [
      "annunciation",
      "yardenit",
      "megiddo",
      "topTen"
    ],
    "services": [
      {
        "label": "Choose a Tiberias or Galilee base",
        "to": "/travel-blog/best-hotels-in-tiberias/"
      },
      {
        "label": "Plan a private lakeside journey",
        "to": "/private-driver/"
      }
    ],
    "sourceIds": [
      "m26-magdala",
      "m26-magdala-duc"
    ]
  },
  "yardenit": {
    "id": "yardenit",
    "updatedAt": yardenitSite.updatedAt,
    "title": yardenitSite.title,
    "description": yardenitSite.description,
    "intro": yardenitSite.intro,
    "answer": "Choose Yardenit for its Galilee location and designated baptism facilities. The operator currently describes entry and conducting a baptism as free, with required white robes rented or purchased and some facilities charged separately. There is no resident priest: organise clergy or a ceremony in advance and confirm the actual visit and last-baptism times directly.",
    "topics": [
      "attractions",
      "destinations",
      "religion"
    ],
    "photo": yardenitSite.hero,
    "facts": [
      {
        "label": "Location",
        "text": "At the Jordan’s outlet from the Sea of Galilee"
      },
      {
        "label": "Baptism clothing",
        "text": "The operator requires special white robes"
      },
      {
        "label": "Ceremony",
        "text": "Arrange clergy; there is no resident priest"
      }
    ],
    "comparison": {
      "caption": "Plan the Yardenit experience",
      "headers": [
        "What you want",
        "Arrange",
        "Do not assume"
      ],
      "rows": [
        [
          "A riverside visit",
          "Visitor opening and group access",
          "That every area or facility has identical access"
        ],
        [
          "A baptism",
          "Required robe, timing and clergy",
          "That a priest will be waiting on site"
        ],
        [
          "A group ceremony",
          "Appointment, numbers and language",
          "That an ordinary tour automatically includes a ceremony"
        ],
        [
          "A Galilee day",
          "Road transfers and other visitor windows",
          "That northern lake sites are next door"
        ]
      ]
    },
    "sections": [
      {
        "id": "site",
        "title": "What Yardenit is and what you will see",
        "paragraphs": [
          "Opened as a modern baptismal setting, Yardenit commemorates the Christian baptism tradition rather than claiming to preserve the exact ancient location of Jesus’ baptism. Its landscaped riverbank, designated entry steps and visitor facilities are designed around contemporary religious visits.",
          "The Wall of New Life displays the baptism passage in many languages on ceramic panels. Visitors can also observe the river and the quiet activity around the ceremony areas. Respect the privacy of people taking part and ask before photographing a group."
        ]
      },
      {
        "id": "ceremony",
        "title": "Arrange the baptism itself",
        "paragraphs": [
          "Yardenit’s operator says there is no resident priest, although it can provide contacts for local clergy. If the ceremony is important to your trip, arrange the officiant, language, time and any denominational requirements before fixing transport. A sightseeing tour does not automatically provide these arrangements.",
          "Special white robes are required for entering the designated baptism water. The operator allows other clothing underneath the robe but does not permit entering in swimwear alone. Ask about robe sizes, rental or purchase, changing rooms and any charges for the facilities you intend to use."
        ]
      },
      {
        "id": "fees-hours",
        "title": "Entry, facilities and visitor timing",
        "paragraphs": [
          "The operator’s current FAQ describes free site entry and no charge for conducting a baptism, with fees for robes and some facilities. Read the exact current terms when arranging your visit; do not bring an old robe-price quote and assume it still applies.",
          "Published pages can display different seasonal hour sets. Confirm the visitor opening, the latest permitted baptism and whether a group needs an appointment. A site’s closing time is not necessarily the time at which a ceremony can begin."
        ]
      },
      {
        "id": "getting-there",
        "title": "Getting to the southern lake outlet",
        "paragraphs": [
          "Yardenit is near Kibbutz Kinneret at the southern end of the lake, with a separate road journey from Tiberias. A car, confirmed driver or suitable tour can make the final leg simpler. For public transport, check the current stop and remaining walk rather than using the city of Tiberias as the complete destination.",
          "Tell an operator whether you want a short visitor stop or an organised baptism with time to change, prepare and reflect. Keep the actual ceremony time fixed and allow a buffer for arrival and the return."
        ]
      },
      {
        "id": "itinerary",
        "title": "A Galilee itinerary or the southern alternative",
        "paragraphs": [
          "Nazareth, Magdala, Capernaum, Tabgha and the Mount of Beatitudes can be considered in a wider Galilee itinerary, but visiting all of them alongside a ceremony makes a demanding day. Choose the few sites most important to your group and leave room for meals and quiet time.",
          "Qasr el-Yahud is near Jericho on the lower Jordan, much farther south. Its geographic setting, traditional significance and visitor arrangements are different. Use the comparison guide if you are choosing between the two."
        ],
        "links": [
          {
            "label": "Explore Qasr el-Yahud",
            "to": "/attractions/qasr-el-yahud/"
          },
          {
            "label": "Compare the two Jordan baptism sites",
            "to": "/travel-blog/baptism-in-the-jordan-river/"
          },
          {
            "label": "Add an archaeological visit at Magdala",
            "to": "/attractions/magdala/"
          }
        ]
      }
    ],
    "checklist": [
      "Arrange clergy and ceremony details before transport",
      "Check current opening and last-baptism time",
      "Confirm robes, changing facilities and any fees",
      "Respect the privacy of other pilgrims",
      "Allow time to prepare and change",
      "Choose a realistic Galilee route"
    ],
    "faqs": [
      {
        "q": "Is Yardenit the exact traditional location of Jesus’ baptism?",
        "a": "It is a modern commemorative baptismal site at the southern Sea of Galilee. Qasr el-Yahud has a different traditional association on the lower Jordan."
      },
      {
        "q": "Is a priest always available?",
        "a": "No. The operator says there is no resident priest. Arrange clergy in advance."
      },
      {
        "q": "Can I enter the baptism water in ordinary swimwear?",
        "a": "The operator requires a special white robe. Other clothing may be worn underneath, but swimwear alone is not accepted."
      }
    ],
    "related": [
      "qasr",
      "magdala",
      "annunciation",
      "baptism"
    ],
    "services": [
      {
        "label": "Choose a Galilee accommodation base",
        "to": "/travel-blog/best-hotels-in-tiberias/"
      },
      {
        "label": "Arrange transport for a pilgrimage route",
        "to": "/private-driver/"
      }
    ],
    "sourceIds": [
      "m26-yardenit-qa",
      "guide-yardenit",
      "guide-yardenit-about"
    ]
  },
  "qasr": {
    "id": "qasr",
    "updatedAt": "2026-10-20",
    "title": "Qasr el-Yahud: the lower Jordan baptismal site",
    "description": "Plan a Qasr el-Yahud visit near Jericho: religious traditions, riverbank access, reservation and transport, with a clear distinction from Yardenit and the Jordanian site.",
    "intro": "Qasr el-Yahud, also written Kasr al-Yahud, is a pilgrimage site on the western bank of the lower Jordan near Jericho in the West Bank. It is associated by Christian tradition with the baptism of Jesus. The designated riverbank visitor area and its current access arrangements are the focus of a practical visit.",
    "answer": "Use the parks authority’s official page to confirm a reservation, visitor access and the open riverbank route before travelling. Coordinate any baptism separately. This is not Yardenit in Galilee, and it is not the same visitor entrance as Bethany Beyond the Jordan / Al-Maghtas on the Jordanian bank.",
    "topics": [
      "attractions",
      "destinations",
      "religion"
    ],
    "photo": P["EXISTING:qasr"],
    "facts": [
      {
        "label": "Setting",
        "text": "The lower Jordan near Jericho"
      },
      {
        "label": "Religious meaning",
        "text": "A traditional baptism location"
      },
      {
        "label": "Before travelling",
        "text": "Confirm the open site, booking and route"
      }
    ],
    "comparison": {
      "caption": "Distinguish three different destinations",
      "headers": [
        "Place",
        "Setting",
        "Planning difference"
      ],
      "rows": [
        [
          "Qasr el-Yahud",
          "Western bank of the lower Jordan near Jericho",
          "Use its own park access and ceremony arrangements"
        ],
        [
          "Yardenit",
          "At the southern outlet of the Sea of Galilee",
          "A modern, separately managed baptismal setting"
        ],
        [
          "Al-Maghtas / Bethany Beyond the Jordan",
          "Jordanian bank",
          "A separate country visit and border itinerary"
        ]
      ]
    },
    "sections": [
      {
        "id": "tradition",
        "title": "The religious landscape of the lower Jordan",
        "paragraphs": [
          "Christian tradition associates this part of the river with Jesus’ baptism by John the Baptist. Other biblical traditions connect the wider Jordan landscape with Joshua and Elijah. Present these as traditions connected to the landscape, rather than as proof that every narrated event has one archaeologically established spot.",
          "The river and the religious sites on its two banks do not create a single unrestricted visitor area. Jordan’s Al-Maghtas World Heritage site has its own entrance and country-access arrangements. A visit here is not permission to cross the river or enter the other site."
        ]
      },
      {
        "id": "riverbank",
        "title": "What to expect at the designated visitor area",
        "paragraphs": [
          "Visitors come to see the river, pray and, when permitted and arranged, take part in a baptism. Use the marked visitor route and follow staff instructions about access to steps and the water. River conditions and operational restrictions can affect the experience.",
          "Keep the ceremony areas quiet and ask before photographing participants. Stay within the authorised visitor zone; surrounding tracks or historic compounds are not automatically open just because the main site is receiving visitors."
        ]
      },
      {
        "id": "baptism",
        "title": "Plan a ceremony rather than assuming one is included",
        "paragraphs": [
          "Agree the officiant, language, religious requirements and time in advance. Ask the site or organiser about changing arrangements, clothing, group size and the current rules for entering the water. Do not carry over Yardenit’s robe policy or an old claim about on-site hire without confirmation.",
          "If visiting with a tour, read whether it includes only a stop, a guided explanation or an actual ceremony. Allow time to change and prepare; a brief photo stop may not be suitable for the experience you want."
        ]
      },
      {
        "id": "arrival",
        "title": "Reservation and the final road approach",
        "paragraphs": [
          "The parks authority gives the approach through the Roads 1 and 90 area north of the Dead Sea, with a signed turn toward the site. Use its current map and instructions, and confirm the visitor entrance and operating status for your date. Public transport toward the region does not guarantee a convenient final leg.",
          "Check current entry and travel requirements for your own circumstances and the exact planned route. Ask a transport provider to confirm the journey it is authorised and insured to undertake. A short map distance from another destination is not a confirmation of access."
        ]
      },
      {
        "id": "combine",
        "title": "A focused outing from Jerusalem or the Dead Sea",
        "paragraphs": [
          "Qumran or a managed northern Dead Sea beach can be considered in a regional day. Ein Bokek, Ein Gedi and Masada are separate destinations farther along the Dead Sea corridor, not immediate neighbours of the riverbank. Decide which visit is the priority and account for driving and site windows.",
          "For a pilgrimage centered on Galilee, Yardenit may fit a different route. Use the dedicated guides to choose the location deliberately and keep the ceremony, transport and site admission as separate arrangements."
        ],
        "links": [
          {
            "label": "Compare a visit to Yardenit",
            "to": "/attractions/yardenit/"
          },
          {
            "label": "Plan a Dead Sea visit",
            "to": "/travel-blog/the-dead-sea/"
          },
          {
            "label": "Compare journeys from Jerusalem",
            "to": "/travel-blog/jerusalem-to-the-dead-sea/"
          }
        ]
      }
    ],
    "checklist": [
      "Confirm current site access and reservation",
      "Use the official road approach and marked visitor zone",
      "Arrange any officiant and ceremony separately",
      "Check the site’s own clothing and water-entry rules",
      "Allow enough time between separate regional stops",
      "Distinguish the western and Jordanian-bank visits"
    ],
    "faqs": [
      {
        "q": "Is Qasr el-Yahud the same as Yardenit?",
        "a": "No. Qasr el-Yahud is near Jericho on the lower Jordan. Yardenit is a modern site at the Sea of Galilee’s southern outlet."
      },
      {
        "q": "Can I walk across to the Jordanian baptism site?",
        "a": "No. The sites have separate country and visitor-access arrangements. A riverbank visit is not a border-crossing permission."
      },
      {
        "q": "Does a site stop automatically include a baptism?",
        "a": "No. Confirm the officiant, ceremony, timing, clothing and permitted water access separately."
      }
    ],
    "related": [
      "yardenit",
      "deadSea",
      "baptism",
      "bethlehem"
    ],
    "services": [
      {
        "label": "Discuss a regional private journey",
        "to": "/private-driver/"
      },
      {
        "label": "Compare day trips from Jerusalem",
        "to": "/travel-blog/day-trips-from-jerusalem/"
      }
    ],
    "sourceIds": [
      "guide-qasr",
      "m26-qasr",
      "m26-unesco-baptism"
    ]
  }
} satisfies Record<string, TravelGuide>;
