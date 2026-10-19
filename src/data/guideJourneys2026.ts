import type { TravelGuide } from "@/data/travelGuides";
import { migrationPhotos as P } from "@/data/guideMigrationPhotos";

export const journeyDestinationGuides = {
  "deadSea": {
    "id": "deadSea",
    "updatedAt": "2026-10-20",
    "title": "The Dead Sea: beaches, floating and a practical visitor guide",
    "description": "Plan a Dead Sea visit around Ein Bokek, a managed beach, hotels and desert attractions. Compare northern and southern destinations and arrange the return journey.",
    "intro": "The Dead Sea combines a hypersaline lake, desert scenery, managed beaches and nearby archaeological sites. The practical choice is not simply whether to visit “the Dead Sea”, but which beach or hotel district you mean. A day at Ein Bokek, a northern beach facility and a Masada-focused outing require different journeys and tickets.",
    "answer": "For a first independent beach visit, compare the managed public-beach area at Ein Bokek with a named private beach or hotel day package. Use designated supervised access, check current facilities and plan the complete return. The northern shore, Ein Gedi, Masada and the southern hotel district are separate stops, not one walkable attraction.",
    "topics": [
      "attractions",
      "destinations",
      "tips"
    ],
    "photo": P["EXISTING:deadSea"],
    "facts": [
      {
        "label": "Choose an address",
        "text": "Ein Bokek, a northern beach or a named hotel"
      },
      {
        "label": "Different products",
        "text": "Public beach, beach-club admission and hotel day use"
      },
      {
        "label": "Plan the return",
        "text": "Stops along the lake are spread far apart"
      }
    ],
    "comparison": {
      "caption": "Choose your Dead Sea visit",
      "headers": [
        "Option",
        "Useful for",
        "Confirm"
      ],
      "rows": [
        [
          "Ein Bokek public-beach area",
          "An independent beach-and-promenade day",
          "Current supervision, facilities, parking and bus stop"
        ],
        [
          "Named northern beach facility",
          "A shorter northern-shore beach plan",
          "Admission, showers, opening and included services"
        ],
        [
          "Hotel stay or day package",
          "A resort or spa-focused visit",
          "What beach, pool, spa and meals are actually included"
        ],
        [
          "Masada or Ein Gedi combination",
          "Archaeology or nature plus a beach",
          "Open routes, separate tickets and real travel time"
        ]
      ]
    },
    "sections": [
      {
        "id": "lake",
        "title": "Understand the lake and the shore",
        "paragraphs": [
          "The Dead Sea lies in the Jordan Rift landscape far below Mediterranean sea level. Its high salt concentration creates the buoyancy for which it is famous. The scenery and shoreline have changed over time, so old photographs and a map pin are not a reliable guide to a safe or currently managed water entrance.",
          "This guide focuses on visits approached from Jerusalem and destinations on the western side. A trip to the Jordanian shore is a separate country and border itinerary. The hotel and beach facilities around Ein Bokek are also distinct from the northern lake landscape."
        ]
      },
      {
        "id": "ein-bokek",
        "title": "Ein Bokek: a practical base for a beach day",
        "paragraphs": [
          "Ein Bokek’s managed public-beach area and promenade sit beside the southern hotel district. Public beach access is different from using a hotel’s pool, changing facilities or spa. Check the exact facilities you intend to use and any parking or equipment charges.",
          "A nearby hotel does not automatically make its entire beachfront private, nor does public beach access grant use of hotel amenities. For a day package, read which changing room, towel, pool, spa or meal is included. For an overnight stay, compare location and the actual route to the water."
        ],
        "links": [
          {
            "label": "Compare Dead Sea hotel areas and styles",
            "to": "/travel-blog/best-dead-sea-hotels/"
          },
          {
            "label": "Compare spa stays",
            "to": "/dead-sea/spa-hotels/"
          }
        ]
      },
      {
        "id": "floating",
        "title": "Enjoy the water through designated facilities",
        "paragraphs": [
          "Use a designated beach while supervision is operating and follow the staff’s instructions. Enter slowly, keep the water away from your face and avoid splashing or diving. Use the provided showers to rinse off. The water experience is different from swimming laps in an ordinary sea.",
          "Do not walk onto an unregulated shore or look for an informal mud pool. Unstable ground and sinkholes affect parts of the region. A hotel spa or packaged mud treatment is a separately offered amenity; choose it by the facility and included service rather than expecting the same experience at every beach."
        ]
      },
      {
        "id": "attractions",
        "title": "Add one clear attraction priority",
        "paragraphs": [
          "Masada offers archaeology and a plateau setting, with cable-car and trail arrangements that need their own check. Ein Gedi is a nature reserve with route-specific opening conditions, not a generic swim stop. Qumran adds another archaeological focus, while Qasr el-Yahud is a separate lower-Jordan pilgrimage destination.",
          "Choose the stop most important to your interests and leave real time for it. An outing that includes a park, a ceremony and a beach may need fewer extra stops rather than a longer list. Admissions and operating windows are separate."
        ],
        "links": [
          {
            "label": "Plan Masada",
            "to": "/travel-blog/masada/"
          },
          {
            "label": "Check the Ein Gedi visit",
            "to": "/travel-blog/ein-gedi/"
          },
          {
            "label": "Explore Qasr el-Yahud",
            "to": "/travel-blog/qasr-el-yahud/"
          },
          {
            "label": "Compare regional attractions",
            "to": "/travel-blog/dead-sea-attractions/"
          }
        ]
      },
      {
        "id": "transport-season",
        "title": "Arrival, season and the return journey",
        "paragraphs": [
          "From Jerusalem, the final destination determines whether a northern beach or the southern hotel strip suits your day. Public transport may work for a defined stop; a driver, rental or organised excursion can fit other combinations. Include the journey to the departure stop and the return after your beach or park closes.",
          "The area can be very hot. Choose the timing and amount of outdoor walking around the local forecast, and check weather and road notices before a desert outing. Use your actual beach or hotel address when asking for a transfer, rather than a broad lake name."
        ],
        "links": [
          {
            "label": "Compare travel from Jerusalem",
            "to": "/travel-blog/jerusalem-to-the-dead-sea/"
          },
          {
            "label": "Choose a season",
            "to": "/travel-blog/best-time-to-visit-israel/"
          },
          {
            "label": "Plan a private journey",
            "to": "/private-driver/"
          }
        ]
      }
    ],
    "checklist": [
      "Choose a named beach or hotel address",
      "Check supervised access and facilities",
      "Distinguish public access from hotel amenities",
      "Use only regulated shore entrances",
      "Select a realistic extra attraction",
      "Plan the complete return before departure"
    ],
    "faqs": [
      {
        "q": "Is every Dead Sea beach suitable for visitors?",
        "a": "No. Use a designated managed beach and follow current supervision and access instructions. Do not enter unregulated shoreline areas."
      },
      {
        "q": "Is Ein Bokek the same as the northern Dead Sea?",
        "a": "No. It is in the southern hotel district. The journey, facilities and nearby attractions differ from northern-shore locations."
      },
      {
        "q": "Does a hotel spa package include everything?",
        "a": "Read the actual package. Beach, pool, spa, changing facilities, towels and meals can be separate inclusions or charges."
      }
    ],
    "related": [
      "jerusalemDeadSea",
      "qasr",
      "bestTime",
      "topTen"
    ],
    "services": [
      {
        "label": "Compare Dead Sea family stays",
        "to": "/dead-sea/family-hotels/"
      },
      {
        "label": "Plan airport transport to Ein Bokek",
        "to": "/travel-blog/ben-gurion-airport-to-ein-bokek/"
      }
    ],
    "sourceIds": [
      "m26-original-the-dead-sea",
      "m26-ein-bokek",
      "m26-deadsea-beaches",
      "inpa-masada",
      "guide-ein-gedi",
      "guide-qasr"
    ]
  },
  "bethlehem": {
    "id": "bethlehem",
    "updatedAt": "2026-10-20",
    "title": "How to get from Jerusalem to Bethlehem: compare your options",
    "description": "Compare Jerusalem–Bethlehem tours, private arrangements, taxis and South Buses services. Understand the last leg, documents, return journey and rental-car limits.",
    "intro": "Jerusalem and Bethlehem are close on a map, but the journey crosses different transport and access arrangements. A bus towards Beit Jala, a taxi to Checkpoint 300 and an organised Bethlehem tour are different products. Choose around the whole journey to your actual destination, including the return, rather than only the first ticket or vehicle.",
    "answer": "An organised tour or a properly confirmed private arrangement can simplify the transfers and return. For independent public transport, South Buses lists line 231 as Beit Jala and line 234 as Bethlehem; confirm the current stops, route and operating day directly. Carry the documents required for your own status and do not assume that every taxi or rental vehicle can enter Bethlehem.",
    "topics": [
      "transportation",
      "destinations",
      "tips",
      "religion"
    ],
    "photo": P["jerusalem-to-bethlehem"],
    "facts": [
      {
        "label": "Choose a complete journey",
        "text": "Account for the crossing and the final leg"
      },
      {
        "label": "Public transport",
        "text": "Check South Buses 231 and 234 individually"
      },
      {
        "label": "Vehicle and documents",
        "text": "Confirm permissions, insurance and personal requirements"
      }
    ],
    "comparison": {
      "caption": "Compare ways to reach Bethlehem",
      "headers": [
        "Option",
        "What it can offer",
        "Confirm before travel"
      ],
      "rows": [
        [
          "Organised tour",
          "A published itinerary and arranged transport",
          "Actual Bethlehem stops, handovers, documents and return"
        ],
        [
          "Private licensed arrangement",
          "A tailored pickup, itinerary and waiting plan",
          "Who performs each leg and where vehicles may operate"
        ],
        [
          "Taxi to Checkpoint 300",
          "Transport to a specific crossing approach",
          "Crossing access and onward transport on the other side"
        ],
        [
          "South Buses service",
          "An independent East Jerusalem-area connection",
          "Correct line, current destination stop, payment and return"
        ],
        [
          "Rental car",
          "A vehicle for an authorised itinerary",
          "Written rental and insurance permission for the exact route"
        ]
      ]
    },
    "sections": [
      {
        "id": "tours",
        "title": "A tour: read the actual Bethlehem itinerary",
        "paragraphs": [
          "A Bethlehem-focused outing and a combined Jerusalem–Bethlehem tour leave different amounts of time at each place. Check whether the Church of the Nativity, Manger Square and any additional stop are actually included, and whether a church interior visit depends on worship or access.",
          "Ask about pickup location, guide language, group size, transfers or guide handovers and the final return point. A tour name alone does not establish a private service or hotel pickup. Use the dedicated tour-comparison page to check the product’s details."
        ],
        "links": [
          {
            "label": "Compare Bethlehem tour formats",
            "to": "/tours/bethlehem-from-jerusalem/"
          }
        ]
      },
      {
        "id": "private-taxi",
        "title": "Private arrangements and taxis",
        "paragraphs": [
          "For a private day, ask who operates each part of the journey and where that vehicle is authorised and insured to travel. A Palestinian driver’s ability to collect in Jerusalem and an Israeli vehicle’s ability to enter Bethlehem depend on permissions; nationality or a general taxi label is not enough.",
          "A taxi to the Checkpoint 300 approach does not include the crossing, a onward ride or guiding unless those elements are explicitly arranged. Agree the meeting point on each side, waiting, the complete price and the return plan. Do not choose an arrangement by assuming a driver can simply continue anywhere."
        ],
        "links": [
          {
            "label": "Questions to ask when arranging a private driver",
            "to": "/private-driver/"
          }
        ]
      },
      {
        "id": "buses",
        "title": "South Buses: distinguish the routes and last legs",
        "paragraphs": [
          "The operator’s Lines and Stations page lists 231 as Beit Jala and 234 as Bethlehem. These are East Jerusalem-area services; they are not departures from Jerusalem’s western Central Bus Station by default. Use the current operator station and timetable information for your chosen boarding point and destination.",
          "Do not treat “Bethlehem bus” as a promise of a stop beside the Church of the Nativity. Confirm the final stop, any remaining walk or local ride and the return boarding location. Check payment and the fare with the operator rather than copying an old travel-blog price."
        ]
      },
      {
        "id": "documents-car",
        "title": "Documents and rental-car permissions",
        "paragraphs": [
          "Check current entry and travel requirements for your nationality and status, carry the required passport and entry documents, and ask the organiser what it needs for the journey. Israeli citizens are generally prohibited from entering Palestinian Authority-controlled Area A, which includes Bethlehem; holding another passport is not a reason to assume that restriction disappears.",
          "For a rental, obtain explicit written permission and confirm insurance for the exact planned route. A route shown in a navigation app does not override rental conditions or access restrictions. Recheck arrangements shortly before departure because crossing operation can change."
        ]
      },
      {
        "id": "visit-return",
        "title": "A focused visit and a planned return",
        "paragraphs": [
          "For a short visit, centre the day on the Nativity complex and Manger Square, adding another place such as the Milk Grotto only if access and time allow. Churches have their own worship and visitor windows, and a queue can take a meaningful part of the day.",
          "Shabbat patterns differ between communities and operators. Check both directions of the actual transport instead of applying Jerusalem’s standard public-transport pattern to every Bethlehem service. Leave time for the crossing and the last leg to your Jerusalem accommodation; avoid a tight flight or onward connection."
        ],
        "links": [
          {
            "label": "Plan time in Jerusalem",
            "to": "/travel-blog/jerusalem-travel-guide/"
          },
          {
            "label": "Choose other church visits",
            "to": "/travel-blog/churches-in-jerusalem/"
          },
          {
            "label": "Check religious dates",
            "to": "/travel-blog/calendar-of-events/"
          }
        ]
      }
    ],
    "checklist": [
      "Choose the complete journey and exact destination",
      "Confirm the current line, stops and return if using buses",
      "Check documents for your own citizenship and status",
      "Verify vehicle permissions and insurance",
      "Agree any handovers, waiting and guiding",
      "Check church visitor windows",
      "Leave a buffer before an onward commitment"
    ],
    "faqs": [
      {
        "q": "Is there a direct train from Jerusalem to Bethlehem?",
        "a": "No. Compare the actual road-based arrangements, including any crossing and final local leg."
      },
      {
        "q": "Is bus 231 the same as bus 234?",
        "a": "No. The operator lists 231 for Beit Jala and 234 for Bethlehem. Check the current stops and timetable to choose the journey that suits your destination."
      },
      {
        "q": "Can any Israeli taxi or rental car drive into Bethlehem?",
        "a": "Do not assume so. Confirm the operator’s permissions and the vehicle’s insurance and rental conditions for the exact route."
      },
      {
        "q": "Can I visit on Shabbat?",
        "a": "Check the actual transport operator, organiser and church arrangements for that date. Different communities and services follow different patterns."
      }
    ],
    "related": [
      "calendar",
      "jerusalemDeadSea",
      "annunciation",
      "travelTips"
    ],
    "services": [
      {
        "label": "Compare organised Bethlehem tours",
        "to": "/tours/bethlehem-from-jerusalem/"
      },
      {
        "label": "Choose a Jerusalem accommodation base",
        "to": "/travel-blog/where-to-stay-in-jerusalem/"
      }
    ],
    "sourceIds": [
      "m26-original-jerusalem-to-bethlehem",
      "m26-south-buses",
      "m26-bethlehem-entry",
      "m26-cicts"
    ]
  },
  "topTen": {
    "id": "topTen",
    "updatedAt": "2026-10-20",
    "title": "Top 10 things to do in Israel: build a trip around experiences",
    "description": "Choose ten Israel experiences: beaches, Jerusalem, food, Tel Aviv evenings, Masada, the Dead Sea, Haifa, Galilee, Eilat and the Ramon Crater night sky.",
    "intro": "A memorable trip is more than a list of sights. These ten experiences preserve the range of the original guide while helping you choose a realistic mix of cities, coast, sacred places and desert. You do not need to do all ten on one trip: start with the experiences that matter most and let geography shape the route.",
    "answer": "For a first visit, choose a manageable combination of Jerusalem, the coast and one regional excursion, then add Galilee, Eilat or the Negev if your time allows. Group nearby experiences and give each a clear purpose. Transport, admission and seasonal conditions matter more than completing a ranking.",
    "topics": [
      "attractions",
      "destinations",
      "itineraries",
      "tips"
    ],
    "photo": P["EXISTING:jerusalem"],
    "facts": [
      {
        "label": "Choose your mix",
        "text": "City, coast, heritage and landscape"
      },
      {
        "label": "Group by region",
        "text": "Avoid repeated long return journeys"
      },
      {
        "label": "Allow real time",
        "text": "A beach, ceremony or park visit is an experience"
      }
    ],
    "comparison": {
      "caption": "Turn experiences into a workable route",
      "headers": [
        "Region or base",
        "Experiences to combine",
        "Keep separate time for"
      ],
      "rows": [
        [
          "Jerusalem",
          "Old City, museums and markets",
          "A Bethlehem or Dead Sea road excursion"
        ],
        [
          "Tel Aviv and the coast",
          "Beaches, food and evenings",
          "A meaningful Haifa or Caesarea visit"
        ],
        [
          "Galilee",
          "Lake scenery, archaeology and pilgrimage",
          "Fixed ceremonies and different site windows"
        ],
        [
          "Dead Sea and Negev",
          "Masada, a managed beach and desert viewpoints",
          "Heat-aware walking and the longer road legs"
        ],
        [
          "Eilat",
          "Reef and Red Sea experiences",
          "A separate southern stay and its transport"
        ]
      ]
    },
    "sections": [
      {
        "id": "beaches",
        "title": "1. Spend time on the Mediterranean coast",
        "paragraphs": [
          "Choose a beach or promenade area that fits your base instead of racing along the whole coast. Tel Aviv offers central urban beaches, while Jaffa adds a different waterfront setting. Use designated bathing areas and current lifeguard instructions; a coastal walk and a swimming visit are different plans."
        ],
        "photo": P["EXISTING:coast"],
        "links": [
          {
            "label": "Choose a Tel Aviv beach",
            "to": "/travel-blog/beaches-in-tel-aviv/"
          },
          {
            "label": "Explore Jaffa",
            "to": "/travel-blog/jaffa/"
          }
        ]
      },
      {
        "id": "jerusalem",
        "title": "2. Explore Jerusalem at a human pace",
        "paragraphs": [
          "Give the Old City, a museum or a neighbourhood walk enough time to become the main experience of the day. Choose a few places important to your interests and respect their separate religious and visitor arrangements. A gate-to-gate route with time for a meal works better than trying every sacred site in one morning."
        ],
        "photo": P["EXISTING:jerusalem"],
        "links": [
          {
            "label": "Plan Jerusalem",
            "to": "/travel-blog/jerusalem-travel-guide/"
          },
          {
            "label": "Choose an Old City route",
            "to": "/travel-blog/old-city-jerusalem/"
          }
        ]
      },
      {
        "id": "food",
        "title": "3. Discover the food and markets",
        "paragraphs": [
          "Use a market or neighbourhood as the focus for a tasting day: a bakery stop, a savoury lunch and a shared dessert. Ask about ingredients and portions, and check each business’s hours. The food reflects many communities and a wider regional tradition; leave room to notice the differences rather than chasing a rigid ranking."
        ],
        "photo": P["what-to-eat-in-israel"],
        "links": [
          {
            "label": "Explore ten dishes",
            "to": "/travel-blog/what-to-eat-in-israel/"
          },
          {
            "label": "Plan Jerusalem market time",
            "to": "/travel-blog/shopping-in-jerusalem/"
          }
        ]
      },
      {
        "id": "evening",
        "title": "4. Enjoy a Tel Aviv evening",
        "paragraphs": [
          "Choose an evening around a meal, a performance, a neighbourhood bar or a promenade walk. Venues, opening patterns and the atmosphere vary, so use a current programme and arrange the return to your accommodation. A late night does not need to mean a named club or an outdated list of supposedly permanent hotspots."
        ],
        "links": [
          {
            "label": "Find current events",
            "to": "/travel-blog/calendar-of-events/"
          },
          {
            "label": "Plan the journey back",
            "to": "/travel-blog/getting-around-tel-aviv/"
          }
        ]
      },
      {
        "id": "masada",
        "title": "5. Visit Masada’s archaeology and landscape",
        "paragraphs": [
          "Choose the appropriate entrance and compare the cable car with any trail that is currently open and suitable for the weather. The plateau deserves time for its story and views, not only the journey up. A sunrise hike is an option to assess carefully, rather than a requirement for enjoying the site."
        ],
        "photo": P["EXISTING:masada"],
        "links": [
          {
            "label": "Plan Masada",
            "to": "/travel-blog/masada/"
          }
        ]
      },
      {
        "id": "dead-sea",
        "title": "6. Experience a managed Dead Sea beach",
        "paragraphs": [
          "Choose a named beach or hotel district, use supervised access and keep the water away from your face. The southern Ein Bokek area and northern beach facilities require different journeys. Leave time to change and rinse, then decide whether a second major attraction will still fit comfortably."
        ],
        "photo": P["EXISTING:deadSea"],
        "links": [
          {
            "label": "Choose your Dead Sea visit",
            "to": "/travel-blog/the-dead-sea/"
          },
          {
            "label": "Compare travel from Jerusalem",
            "to": "/travel-blog/jerusalem-to-the-dead-sea/"
          }
        ]
      },
      {
        "id": "haifa",
        "title": "7. See Haifa’s Bahá’í Gardens setting",
        "paragraphs": [
          "Compare the permitted viewpoints and any currently offered guided route, then pair the visit with the German Colony, a museum or the coast. The terraces are a separately managed religious site; do not assume you can walk freely from top to bottom. Choose transport around Haifa’s elevation changes."
        ],
        "photo": P["EXISTING:haifa"],
        "links": [
          {
            "label": "Explore Haifa",
            "to": "/travel-blog/haifa/"
          },
          {
            "label": "Choose a museum nearby",
            "to": "/travel-blog/museums-in-haifa/"
          }
        ]
      },
      {
        "id": "galilee",
        "title": "8. Slow down around the Sea of Galilee",
        "paragraphs": [
          "Choose a lakeside base or a small group of heritage sites rather than expecting the whole lake in an afternoon. Magdala, Capernaum, Tabgha, the Mount of Beatitudes and Yardenit offer different experiences and visiting windows. A ceremony or a quiet archaeological visit needs real time in the plan."
        ],
        "photo": P["EXISTING:galilee"],
        "links": [
          {
            "label": "Plan the Sea of Galilee",
            "to": "/travel-blog/sea-of-galilee/"
          },
          {
            "label": "Explore Magdala",
            "to": "/travel-blog/magdala/"
          },
          {
            "label": "Plan Yardenit",
            "to": "/travel-blog/yardenit/"
          }
        ]
      },
      {
        "id": "red-sea",
        "title": "9. Explore the Red Sea at Eilat",
        "paragraphs": [
          "Compare a designated reef visit, a suitable snorkelling or diving activity and an aquarium-style experience. Read the operator’s age, ability and ticket conditions, and protect the coral by following the permitted water routes. Eilat is a separate southern stay, not a quick extra stop on a northern day trip."
        ],
        "photo": P["EXISTING:eilat"],
        "links": [
          {
            "label": "Plan Eilat and its attractions",
            "to": "/travel-blog/eilat/"
          }
        ]
      },
      {
        "id": "desert-night",
        "title": "10. Make time for the Ramon Crater landscape and night sky",
        "paragraphs": [
          "Use a signed daytime viewpoint around Mitzpe Ramon and consider an authorised night-sky experience when conditions suit. Cloud, the moon and local light affect what you can see; no operator can guarantee a particular sky. Arrange permitted access, warm layers and the journey back after dark."
        ],
        "photo": P["EXISTING:ramon"],
        "links": [
          {
            "label": "Plan Mitzpe Ramon",
            "to": "/travel-blog/mitzpe-ramon-crater/"
          }
        ]
      }
    ],
    "checklist": [
      "Choose priorities instead of attempting all ten",
      "Group experiences around a few overnight bases",
      "Check season, holiday and venue arrangements",
      "Plan the final leg and the return from excursions",
      "Leave time for meals and unhurried visits"
    ],
    "faqs": [
      {
        "q": "Do I need to include all ten experiences?",
        "a": "No. Treat the list as choices. A focused trip with enough time at each place is usually more rewarding than attempting every region."
      },
      {
        "q": "Is Eilat a simple day trip from Jerusalem or Tel Aviv?",
        "a": "Treat it as a separate southern journey with substantial travel time. Compare an overnight stay and the actual transport options."
      },
      {
        "q": "Should I book a driver for the entire trip?",
        "a": "Choose transport around each segment. City walking and transit, a particular day tour, a rental period or a private journey solve different needs."
      }
    ],
    "related": [
      "bestTime",
      "calendar",
      "food",
      "deadSea"
    ],
    "services": [
      {
        "label": "Browse destinations and accommodation bases",
        "to": "/destinations/"
      },
      {
        "label": "Compare tours and day trips",
        "to": "/tours/"
      }
    ],
    "sourceIds": [
      "m26-original-top-10-things-to-do-in-israel",
      "m26-tlv-beaches",
      "guide-jerusalem-tourism",
      "inpa-masada",
      "m26-bahai",
      "m26-coral",
      "m26-ims"
    ]
  },
  "jerusalemDeadSea": {
    "id": "jerusalemDeadSea",
    "updatedAt": "2026-10-20",
    "title": "How to get from Jerusalem to the Dead Sea: all travel options",
    "description": "Compare buses, organised tours, a private driver and rental driving from Jerusalem to the Dead Sea. Choose a named beach or hotel and plan the return.",
    "intro": "A Dead Sea journey starts with choosing the destination. A northern beach facility, Ein Gedi Nature Reserve, Masada and the Ein Bokek hotel district are different stops along a long corridor. Once you have a specific beach, hotel or park entrance, compare transport for that complete journey rather than an approximate travel time to “the Dead Sea”.",
    "answer": "A bus can suit an independent visit when its actual stop and return timetable fit your beach or hotel. An organised excursion can combine transport and selected visits; a private driver can quote your chosen route and waiting. A rental offers flexibility within its permitted and insured area. Confirm current site access and both directions of the journey before departure.",
    "topics": [
      "transportation",
      "destinations",
      "itineraries"
    ],
    "photo": P["jerusalem-to-the-dead-sea"],
    "facts": [
      {
        "label": "First decision",
        "text": "Choose the beach, hotel or park entrance"
      },
      {
        "label": "Bus plan",
        "text": "Check the exact stop and same-day return"
      },
      {
        "label": "Private or tour",
        "text": "Agree the actual stops and included services"
      }
    ],
    "comparison": {
      "caption": "Compare the complete Jerusalem–Dead Sea journey",
      "headers": [
        "Option",
        "A useful fit",
        "Check first"
      ],
      "rows": [
        [
          "Public bus",
          "An independent visit to a served stop",
          "Departure station, final walk, fare and return"
        ],
        [
          "Organised tour",
          "A published beach or park combination",
          "Named beach, usable visit time and admissions"
        ],
        [
          "Private driver",
          "Your own addresses, stops and waiting plan",
          "Complete quote, return, guiding and extra time"
        ],
        [
          "Rental car",
          "A permitted independent road itinerary",
          "Contract, insurance, parking and weather notices"
        ]
      ]
    },
    "sections": [
      {
        "id": "destination",
        "title": "Northern beaches, Ein Gedi, Masada or Ein Bokek?",
        "paragraphs": [
          "The northern shore can suit a beach facility or a Qumran-area combination. Ein Gedi is a nature reserve with route-specific access; it is not an interchangeable hotel-beach stop. Masada has different entrances and its own cable-car or trail arrangements.",
          "Ein Bokek is the southern hotel and managed public-beach district. Give that exact destination when checking buses or asking for a quote. A travel time quoted for a northern beach should not be applied to Ein Bokek, and a bus serving one stop is not evidence of convenient access to every attraction."
        ],
        "links": [
          {
            "label": "Choose a Dead Sea destination",
            "to": "/travel-blog/the-dead-sea/"
          },
          {
            "label": "Compare regional attractions",
            "to": "/travel-blog/dead-sea-attractions/"
          }
        ]
      },
      {
        "id": "tours",
        "title": "Organised tours: compare what happens at the destination",
        "paragraphs": [
          "Read whether a trip is beach-focused or combines the Dead Sea with Masada, Ein Gedi or another attraction. Check the named beach and how much usable time remains there after the road journey and other visits. Do not assume that all tours use Ein Bokek.",
          "Confirm pickup, guide language, return point and what admission, towels, changing facilities and meals are included. A shorter excursion and a full-day park combination can be different products even when both have “Dead Sea” in the name."
        ],
        "links": [
          {
            "label": "Compare tour formats",
            "to": "/tours/"
          }
        ]
      },
      {
        "id": "private",
        "title": "Private driver: agree the whole day",
        "paragraphs": [
          "A private arrangement can suit a hotel transfer, a beach return or a day with specific stops. State the actual pickup address, beach or hotel, party size, luggage and return time. Ask whether the driver waits, returns later or provides a one-way service.",
          "Agree the total, included waiting and distance, parking, extra-time charges and cancellation terms in writing. Transport does not automatically include a licensed guide, park entry, a hotel day pass or a meal. A fixed appointment such as a baptism needs its own realistic time allowance."
        ],
        "links": [
          {
            "label": "Request a private journey proposal",
            "to": "/private-driver/"
          },
          {
            "label": "Plan a separate Qasr el-Yahud stop",
            "to": "/travel-blog/qasr-el-yahud/"
          }
        ]
      },
      {
        "id": "bus",
        "title": "Public bus: check a precise journey",
        "paragraphs": [
          "Use Egged’s current journey planning for your travel date and the exact destination, including the Jerusalem departure point and any connection. Route numbers, fares and stop patterns should come from the current operator information, not an old article’s fixed timetable.",
          "Find the stop for your beach or hotel and the remaining walking route before booking the rest of the day. Check the return before the outward journey, particularly on Fridays, Saturdays and holidays. A bus near a park entrance does not guarantee an easy walk to the visitor facilities or a convenient later return."
        ]
      },
      {
        "id": "driving",
        "title": "Rental driving and the desert road",
        "paragraphs": [
          "Check that the rental contract and insurance cover the exact route you intend to use. The usual approach descends east from Jerusalem toward the Dead Sea corridor, but navigation must remain consistent with current road instructions and the vehicle’s permitted area.",
          "Plan parking at each named attraction and avoid informal shoreline access or stopping on highway shoulders. Check weather and road notices, including flash-flood warnings affecting the region. Confirm current park and beach opening before making a long drive for a particular facility."
        ]
      },
      {
        "id": "day-plan",
        "title": "Build a day with room for the return",
        "paragraphs": [
          "Choose a main purpose: a beach visit, a substantial Masada visit or a currently open nature route. Add another stop only when driving, admissions, heat and visitor windows leave comfortable time. Several attractions shown near the same lake can still be far apart.",
          "Keep time for changing, rinsing, lunch and the return to Jerusalem. Save the actual pickup point or bus stop and a usable contact method. If you are changing accommodation, compare an onward journey with stops against driving back to Jerusalem only to leave again the next morning."
        ],
        "links": [
          {
            "label": "Plan Masada",
            "to": "/travel-blog/masada/"
          },
          {
            "label": "Check Ein Gedi",
            "to": "/travel-blog/ein-gedi/"
          },
          {
            "label": "Choose a Dead Sea hotel base",
            "to": "/travel-blog/best-dead-sea-hotels/"
          },
          {
            "label": "Check holiday timing",
            "to": "/travel-blog/calendar-of-events/"
          }
        ]
      }
    ],
    "checklist": [
      "Choose an exact beach, hotel or park entrance",
      "Check current transport and site access for the date",
      "Plan the return before the outward journey",
      "Confirm what a tour or private quote includes",
      "Check rental permissions if driving",
      "Leave time for changing, food and the final leg"
    ],
    "faqs": [
      {
        "q": "How long is the journey from Jerusalem?",
        "a": "It depends on whether you mean the northern shore, Ein Gedi, Masada or Ein Bokek, as well as the route and traffic. Plan to a named destination rather than one universal Dead Sea time."
      },
      {
        "q": "Can I use the same bus plan for every Dead Sea attraction?",
        "a": "No. Check the actual stops, final walk and return service for each place. The destinations are spread along the corridor."
      },
      {
        "q": "Does a private taxi include beach or park entry?",
        "a": "Only if the written quote explicitly includes it. Ask separately about transport, waiting, guiding, parking and admission."
      },
      {
        "q": "Is Ein Gedi a beach stop?",
        "a": "Treat it as a nature-reserve visit with a specific open route. Choose a separately designated beach for a Dead Sea water visit."
      }
    ],
    "related": [
      "deadSea",
      "qasr",
      "bestTime",
      "jerusalemDayTrips",
      "bethlehem"
    ],
    "services": [
      {
        "label": "Compare Dead Sea hotels",
        "to": "/travel-blog/best-dead-sea-hotels/"
      },
      {
        "label": "Plan your Jerusalem base",
        "to": "/travel-blog/where-to-stay-in-jerusalem/"
      }
    ],
    "sourceIds": [
      "m26-original-jerusalem-to-the-dead-sea",
      "m26-egged",
      "m26-ein-bokek",
      "guide-ein-gedi",
      "inpa-masada",
      "guide-qasr"
    ]
  }
} satisfies Record<string, TravelGuide>;
