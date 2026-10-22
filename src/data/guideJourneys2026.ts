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
    "updatedAt": "2026-10-23",
    "title": "How to Get from Jerusalem to Bethlehem: Bus, Taxi & Tours",
    "description": "Jerusalem to Bethlehem by bus 231 or 234, taxi, private driver or tour. Find the Damascus Gate departure, understand Checkpoint 300 and plan your return.",
    "intro": "The route depends on how you want to arrive. Bus 231 heads towards Beit Jala; 234 serves the Checkpoint 300 approach. Tours and prearranged vehicles follow different arrangements, so plan the final leg to central Bethlehem and the journey back.",
    "answer": "For independent travel, start with South Buses 231 (Beit Jala) or 234 (Checkpoint 300), normally boarding from the East Jerusalem bus area near Damascus Gate. Check where each service actually ends. A tour may arrange the whole visit, while a taxi to the checkpoint normally leaves you to cross and arrange the onward journey. Verify documents and entry eligibility before setting off.",
    "topics": [
      "transportation",
      "destinations",
      "tips",
      "religion"
    ],
    "photo": P["jerusalem-to-bethlehem"],
    "facts": [
      {
        "label": "Bus departure",
        "text": "East Jerusalem bus station near Damascus Gate / Prophets Terminal"
      },
      {
        "label": "Bus 231",
        "text": "Beit Jala route; confirm your final stop and local transfer"
      },
      {
        "label": "Bus 234",
        "text": "Checkpoint 300 approach; crossing and onward ride are separate"
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
        "title": "Organised day trips from Jerusalem",
        "paragraphs": [
          "Choose a Bethlehem-only visit if the Church of the Nativity is your main reason for travelling. A combined Bethlehem and Jericho day is longer and leaves less time for the church precinct.",
          "Read the departure city, operator, meeting place and return arrangements on the actual booking page. Guiding in Bethlehem and transport across the boundary may involve a local provider or a handover; this should be confirmed rather than assumed. Compare Jerusalem-based Bethlehem tours before choosing a departure."
        ],
        "links": [
          {
            "label": "Browse Bethlehem, Jericho & Jordan River tours",
            "to": "/tours/bethlehem-jericho-jordan-river/"
          }
        ],
        "inlineLinks": [
          {
            "text": "Compare Jerusalem-based Bethlehem tours",
            "to": "/tours/bethlehem-jericho-jordan-river/"
          }
        ]
      },
      {
        "id": "private-taxi",
        "title": "Private driver or taxi: clarify where the journey ends",
        "paragraphs": [
          "For a private visit, ask who drives in Jerusalem, who drives inside Bethlehem and where any handover takes place. A Jerusalem taxi dropping you near Checkpoint 300 is not equivalent to a vehicle authorised and insured for every stage.",
          "Agree the pickup address, route, waiting, any local guide, price and return arrangements in writing. If transport is only to the crossing, you will need to pass through it and arrange a permitted local ride on the other side. My private driver service describes what to include in a transport enquiry, but it does not promise a direct crossing into Bethlehem."
        ],
        "links": [
          {
            "label": "Questions to ask when arranging a private driver",
            "to": "/private-driver/"
          }
        ],
        "inlineLinks": [
          {
            "text": "private driver service",
            "to": "/private-driver/"
          }
        ]
      },
      {
        "id": "buses",
        "title": "Bus 231 or 234: where to board and what happens next",
        "paragraphs": [
          "The Arab bus station is outside Damascus Gate; the nearby Prophets Terminal is listed by South Buses for both 231 and 234. This is not Jerusalem's western Central Bus Station. Confirm the exact boarding bay, direction and stops with the operator on the travel day.",
          "South Buses lists 231 as Beit Jala and 234 as Bethlehem. The first may need a local ride to the centre; the second serves the Checkpoint 300 approach rather than a bus all the way to Manger Square. Plan any crossing formalities and onward local transport.",
          "Check the return stop and the last suitable departure before leaving Jerusalem. South Buses publishes a Rav-Kav payment system; confirm whether cash is accepted on your selected journey and the applicable fare rather than relying on older quoted amounts."
        ],
        "sourceIds": [
          "m26-south-buses",
          "m26-cicts-buses"
        ]
      },
      {
        "id": "documents-car",
        "title": "Checkpoint, passports and rental cars",
        "paragraphs": [
          "Bethlehem is in Palestinian Authority Area A. Israeli citizens are generally prohibited from entering Area A, including if they also hold another passport. Other travellers must check the requirements applying to their own nationality, entry permission and travel documents. Do not assume a checkpoint shown on a map guarantees admission.",
          "A rental car is usually a poor default for Bethlehem. Rental agreements, insurance and legal access may prevent the vehicle from entering. Ask the rental company for explicit written permission for the exact route before attempting to drive.",
          "Crossing procedures and traffic conditions may change without notice. Check official travel advisories and operator instructions close to departure, and carry the documents required for both legs."
        ],
        "sourceIds": [
          "m26-bethlehem-entry"
        ]
      },
      {
        "id": "visit-return",
        "title": "Visiting Bethlehem independently and getting back",
        "paragraphs": [
          "For a short visit, walk the Church of the Nativity and Manger Square area first. Star Street and the Milk Grotto can fit into the same central walk if you have time. Shepherds' Field is outside the centre and usually needs additional transport.",
          "The Grotto of the Nativity entered a restoration programme in 2026; the Custody of the Holy Land reported work continuing towards Christmas. Check access to the grotto separately from access to the church, and leave time for services, queues and local traffic.",
          "Before leaving Bethlehem, confirm where to catch your return transport and whether you must change vehicles at the crossing. Services on Fridays, Saturdays and religious holidays may follow different patterns; leave a generous buffer before a flight or onward train. For other short excursions, see my day trips from Jerusalem guide."
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
        ],
        "inlineLinks": [
          {
            "text": "day trips from Jerusalem guide",
            "to": "/travel-blog/day-trips-from-jerusalem/"
          }
        ],
        "sourceIds": [
          "m26-custodia-nativity-restoration",
          "m26-cicts"
        ]
      }
    ],
    "checklist": [
      "Check your legal entry requirements and carry the right documents",
      "Confirm bus 231 or 234, boarding point, final stop and payment",
      "Plan crossing and onward transport if your bus or taxi ends at Checkpoint 300",
      "Save the return route and allow time for checks or changes",
      "Check current access to the Church and Grotto of the Nativity",
      "Bring water, a local payment option and an offline map"
    ],
    "faqs": [
      {
        "q": "Which Jerusalem bus goes to Bethlehem?",
        "a": "South Buses lists 231 as Beit Jala and 234 as Bethlehem / the Checkpoint 300 approach. Neither route name guarantees a stop beside Manger Square. Check the current operator map and the final leg."
      },
      {
        "q": "Where do buses to Bethlehem leave from?",
        "a": "The East Jerusalem Arab bus station near Damascus Gate and the Prophets Terminal area, not the western Central Bus Station. Verify the boarding bay before travelling."
      },
      {
        "q": "Does bus 234 take me straight to the Church of the Nativity?",
        "a": "No. Plan for the Checkpoint 300 area and onward local transport after any required crossing. Check the current route and crossing arrangements."
      },
      {
        "q": "Can I visit Bethlehem without a guided tour?",
        "a": "Some eligible visitors travel independently using East Jerusalem buses and local transport. Make sure your own entry status allows the visit and arrange both directions before leaving."
      },
      {
        "q": "Can an Israeli taxi or rental car drive into Bethlehem?",
        "a": "Do not assume so. Vehicle authorisation, insurance and entry rules govern the actual journey; an ordinary car hire or taxi fare is not permission to enter Area A."
      },
      {
        "q": "Is the Church of the Nativity grotto open?",
        "a": "Restoration work started in 2026. Church access and grotto access can differ. Check a current church notice or local operator before making the visit."
      },
      {
        "q": "Can I go to Bethlehem on Saturday or Sunday?",
        "a": "Potentially, but bus schedules, crossings and church visitor access vary. Check the date-specific return service as well as the outward journey."
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
        "to": "/tours/bethlehem-jericho-jordan-river/"
      },
      {
        "label": "Day trips from Jerusalem",
        "to": "/travel-blog/day-trips-from-jerusalem/"
      },
      {
        "label": "Jerusalem hotels by area",
        "to": "/travel-blog/where-to-stay-in-jerusalem/"
      }
    ],
    "sourceIds": [
      "m26-original-jerusalem-to-bethlehem",
      "m26-south-buses",
      "m26-bethlehem-entry",
      "m26-cicts",
      "m26-cicts-buses",
      "m26-custodia-nativity-restoration"
    ],
    "reviewNote": "Access and transport arrangements can change at short notice. Israel's Area A entry restrictions apply to Israeli citizens, including dual nationals; check your personal status and the actual route before booking. Church of the Nativity grotto restoration work was underway during 2026, so check present visitor access.",
    "nextSteps": [
      {
        "label": "Check bus routes 231 and 234",
        "to": "/travel-blog/getting-around-israel/"
      },
      {
        "label": "See Bethlehem tour formats",
        "to": "/tours/bethlehem-jericho-jordan-river/"
      }
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
    "updatedAt": "2026-10-23",
    "title": "Jerusalem to the Dead Sea: Bus 486, Tours & Driving",
    "description": "How to reach Ein Bokek, Masada or Ein Gedi from Jerusalem by Egged 486/444, guided tour, private driver or rental car. Stops, return bus and beach tips.",
    "intro": "A visit to the Dead Sea is not one destination. First choose Ein Bokek beach, Masada, Ein Gedi or a northern-shore facility; then match the transport and return timetable to that stop.",
    "answer": "Egged 486 serves Jerusalem and stops along the Dead Sea corridor, including Ein Gedi, Masada and Ein Bokek; the 444 Eilat route also serves parts of the corridor and is on Egged's advance-reservation list. A guided tour or prearranged private driver may suit a day with several stops. If you drive, check road and park access first. Always plan the return before the outward trip.",
    "topics": [
      "transportation",
      "destinations",
      "itineraries"
    ],
    "photo": P["jerusalem-to-the-dead-sea"],
    "facts": [
      {
        "label": "Public bus",
        "text": "Egged 486; 444 may require advance seat booking"
      },
      {
        "label": "Beach day",
        "text": "Ein Bokek public beach and promenade"
      },
      {
        "label": "Multiple stops",
        "text": "Tour, private driver or permitted rental car"
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
        "title": "Ein Bokek, Masada, Ein Gedi or the northern shore?",
        "paragraphs": [
          "For floating and beach facilities, head for Ein Bokek rather than a vague Dead Sea map pin. Tamar Regional Council maintains a free public beach with showers, toilets, changing rooms and shade; paid parking and separately operated hotel services are different.",
          "Masada is an archaeological site with its own entrance, admission and cable-car arrangements. Ein Gedi is a nature reserve; its trails and gates are not interchangeable with the beach. Northern shore facilities have their own charges and access. Choose the actual stop before checking a bus or booking a car."
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
        ],
        "inlineLinks": [
          {
            "text": "Ein Bokek",
            "to": "/travel-blog/the-dead-sea/"
          },
          {
            "text": "Masada",
            "to": "/travel-blog/masada/"
          },
          {
            "text": "Ein Gedi",
            "to": "/travel-blog/ein-gedi/"
          }
        ],
        "sourceIds": [
          "m26-deadsea-ein-bokek-council",
          "m26-inpa-ein-gedi-2026"
        ]
      },
      {
        "id": "tours",
        "title": "Tours from Jerusalem: what is included?",
        "paragraphs": [
          "A Masada-and-beach day is quite different from an Ein Bokek transfer. Check that the booked product departs from Jerusalem, how long it stays at the beach, and whether Masada guiding, cable-car admission and changing facilities are included.",
          "For a combined day, the order of the stops affects the heat and the amount of time left for floating. The Masada & Dead Sea tours catalogue lists independent operators and my private car-and-driver option; the two types of service have different inclusions."
        ],
        "links": [
          {
            "label": "Compare tour formats",
            "to": "/tours/"
          }
        ],
        "inlineLinks": [
          {
            "text": "Masada & Dead Sea tours catalogue",
            "to": "/tours/masada-dead-sea/"
          }
        ]
      },
      {
        "id": "private",
        "title": "Private car and driver: agree the stops and waiting",
        "paragraphs": [
          "For my Masada and Dead Sea private day from Jerusalem, the published weekday starting rate is ₪2,100 per vehicle for up to four travellers, for transport only. Guiding, admissions, meals, parking and tips are separate. Confirm the final quote for your date and itinerary.",
          "A one-way ride to an Ein Bokek hotel is a different job from a return excursion with Masada. Give the driver the precise pickup address, destinations, time at each stop, luggage and whether you need a return journey. You can also read about hiring a private driver in Israel."
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
        ],
        "inlineLinks": [
          {
            "text": "hiring a private driver in Israel",
            "to": "/private-driver/"
          }
        ]
      },
      {
        "id": "bus",
        "title": "Egged 486 and 444: check the stop and return",
        "paragraphs": [
          "Egged line 486 runs between Jerusalem and the Neve Zohar area via the Dead Sea corridor, serving stops for Ein Gedi, Masada and Ein Bokek. Line 444 also travels between Jerusalem and Eilat via Dead Sea stops and appears on Egged's seat-reservation route list; check its purchase rules before travelling.",
          "Find the correct platform at Jerusalem Central Bus Station in the operator's current timetable, then identify the stop nearest the actual beach, park entrance or hotel. Some stops leave a substantial walk in the sun; a highway junction is not necessarily a visitor entrance.",
          "Check the return bus first. Fridays, Saturdays and holidays can substantially reduce the practical choice of return journeys. Do not copy an old platform number, fare or departure time; use Egged for the date you are travelling."
        ],
        "sourceIds": [
          "m26-egged",
          "m26-egged-444-reservation"
        ]
      },
      {
        "id": "driving",
        "title": "Driving from Jerusalem on Routes 1 and 90",
        "paragraphs": [
          "A common approach from Jerusalem follows Route 1 east to the Dead Sea corridor and Route 90 south. Use current navigation to the precise entrance, not simply “Dead Sea”, and confirm your rental agreement permits the intended roads and region. My car rental guide covers insurance and collection questions.",
          "Plan parking at each stop. The desert has long stretches with little shade, and flash floods can close roads and reserve entrances even when the weather in Jerusalem looks fine. Never leave the road for an informal shore access point or walk through sinkhole-risk areas.",
          "Check park hours and whether any Masada access or Ein Gedi trail is closed. Leave adequate time for the drive back instead of combining every nearby-sounding site."
        ],
        "inlineLinks": [
          {
            "text": "car rental guide",
            "to": "/car-rental/"
          }
        ]
      },
      {
        "id": "day-plan",
        "title": "Two realistic days out, plus what to pack",
        "paragraphs": [
          "For an easy first visit, travel directly to Ein Bokek, use the staffed public beach, shower afterwards and return by your pre-checked bus or driver. Bring drinking water, sun protection, a towel, footwear suitable for the salty ground and a change of clothes. Keep saltwater away from your eyes and mouth.",
          "If Masada is the main attraction, start with the fortress while temperatures are lower, then leave enough time for a separate beach stop. Cable-car and national-park tickets are not the same as a hotel day pass.",
          "Ein Gedi can replace, rather than automatically add to, a beach day. The park's trail availability has changed during 2026 restoration work; check the exact route, entry slot and physical demands. For more detail on the place itself, use my Dead Sea visitor guide."
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
        ],
        "inlineLinks": [
          {
            "text": "Dead Sea visitor guide",
            "to": "/travel-blog/the-dead-sea/"
          }
        ],
        "sourceIds": [
          "m26-deadsea-ein-bokek-council",
          "m26-inpa-ein-gedi-2026"
        ]
      }
    ],
    "checklist": [
      "Choose a precise beach, hotel or park entrance",
      "Check Egged 486 or 444 for your travel date and final stop",
      "Confirm the last workable return before departing",
      "Check park, trail, beach and road access",
      "Carry water, sun protection, water shoes and a towel for a beach day",
      "Compare admissions, guiding, parking and waiting in a private or tour quote"
    ],
    "faqs": [
      {
        "q": "Which bus goes from Jerusalem to the Dead Sea?",
        "a": "Egged 486 serves the Dead Sea corridor and Ein Bokek. The 444 intercity route also serves Dead Sea stops on its way to Eilat and is listed among seat-reservation routes. Check the correct stop and current schedule."
      },
      {
        "q": "Can I visit Ein Bokek without a tour?",
        "a": "Yes, if the bus times and the walk from your stop suit you. The public beach has facilities and is open to non-hotel guests; plan the return before travelling."
      },
      {
        "q": "Is there a free beach at the Dead Sea?",
        "a": "Tamar Regional Council operates a free public beach at Ein Bokek, with showers, toilets, changing facilities and shade. Parking and hotel-operated services may carry extra charges."
      },
      {
        "q": "How long does it take from Jerusalem to the Dead Sea?",
        "a": "A drive to the northern shore is shorter than a trip to Ein Bokek. Public buses add stops; allow around two hours for a Jerusalem–Ein Bokek bus journey, then account for the final walk and check live operator timing."
      },
      {
        "q": "Can I go on Shabbat?",
        "a": "Regular Egged service may be restricted around Shabbat and holidays. Confirm the actual outbound and return departures, or arrange another suitable permitted option."
      },
      {
        "q": "Can I combine Masada, Ein Gedi and the beach in one day?",
        "a": "It may be possible with an early start and private transport, but checking Masada entry, Ein Gedi's specific open trails and available beach time is more useful than forcing all three stops into a bus-only day."
      },
      {
        "q": "Is Ein Gedi a Dead Sea bathing beach?",
        "a": "No. Treat Ein Gedi Nature Reserve as a separate hiking visit. Use a designated managed beach such as Ein Bokek for floating."
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
        "label": "Masada & Dead Sea tours from Jerusalem",
        "to": "/tours/masada-dead-sea/"
      },
      {
        "label": "Private driver service",
        "to": "/private-driver/"
      },
      {
        "label": "Dead Sea hotels",
        "to": "/travel-blog/best-dead-sea-hotels/"
      },
      {
        "label": "Rent a car in Israel",
        "to": "/car-rental/"
      }
    ],
    "sourceIds": [
      "m26-original-jerusalem-to-the-dead-sea",
      "m26-egged",
      "m26-ein-bokek",
      "guide-ein-gedi",
      "inpa-masada",
      "guide-qasr",
      "m26-egged-444-reservation",
      "m26-deadsea-ein-bokek-council",
      "m26-inpa-ein-gedi-2026"
    ],
    "reviewNote": "Beach and park access can change after floods or road closures. The Israel Nature and Parks Authority has issued different Ein Gedi trail updates during the 2026 restoration period; check the specific trail and reserve entry before departure.",
    "nextSteps": [
      {
        "label": "Compare Masada & Dead Sea tours",
        "to": "/tours/masada-dead-sea/"
      },
      {
        "label": "Choose a Dead Sea hotel",
        "to": "/travel-blog/best-dead-sea-hotels/"
      }
    ]
  },

} satisfies Record<string, TravelGuide>;
