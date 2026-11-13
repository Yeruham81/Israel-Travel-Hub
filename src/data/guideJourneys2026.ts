import type { TravelGuide } from "@/data/travelGuides";
import { migrationPhotos as P } from "@/data/guideMigrationPhotos";
import deadSeaSaltIslandPhoto from "@/assets/guides/dead-sea-salt-island.webp";
import einBokekShorePhoto from "@/assets/guides/dead-sea-ein-bokek-shore.webp";

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
    "intro": "A memorable trip is more than a list of sights. These ten experiences offer a realistic mix of cities, coast, sacred places and desert. You do not need to do all ten on one trip: start with the experiences that matter most and let geography shape the route.",
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
        "to": "/accommodation/"
      },
      {
        "label": "Compare tours and day trips",
        "to": "/tours/"
      }
    ],
    "sourceIds": [
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
      "updatedAt": "2026-11-13",
      "title": "How to Get from Jerusalem to the Dead Sea: Bus, Taxi, Tours & Car",
      "description": "How to travel from Jerusalem to the Dead Sea by bus 486/444, taxi, private driver, group tour or rental car. Compare costs, convenience, return trips and useful stops.",
      "intro": "Leaving Jerusalem for the Dead Sea takes you from the city's hills into the striking landscapes of the Judean Desert. Whether you're planning a relaxing beach day or a journey with memorable stops along the way, a little planning will help you make the most of the trip.",
      "answer": "The cheapest way from Jerusalem to the Dead Sea is generally an Egged bus: line 486 runs towards Ein Bokek and line 444 also serves Dead Sea stops, with advance seat reservation requirements. Allow roughly 1½–2 hours to the Ein Bokek hotel area. A taxi or private transfer is more convenient door to door; a guided day tour handles the itinerary, while a rental car offers the most independence. For swimming, head to the free public beach at Ein Bokek. Check your return journey before setting out.",
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
          "text": "Free public beach in the Ein Bokek hotel district"
        },
        {
          "label": "Multiple stops",
          "text": "Tour, private driver or permitted rental car"
        }
      ],
      "comparison": {
        "caption": "Jerusalem to the Dead Sea: ways to travel",
        "headers": [
          "Transport",
          "Why choose it",
          "Main drawback",
          "Good to know"
        ],
        "rows": [
          [
            "Egged bus 486 / 444",
            "Usually the lowest-cost way to reach one Dead Sea stop",
            "Fixed timetable; limited return services and awkward connections between attractions",
            "Board at Jerusalem Central Bus Station; check your destination stop and the final bus back"
          ],
          [
            "Taxi or private driver",
            "Direct hotel pickup, comfort and flexible stops",
            "More expensive than a bus, especially for one or two people",
            "Agree a one-way transfer or a full-day round trip with waiting"
          ],
          [
            "Organised day tour",
            "Transport and sightseeing in one booking; useful for Masada and Ein Gedi",
            "Fixed itinerary, group pace and a beach stop chosen by the operator",
            "Check Jerusalem pickup, attractions, admission and how much beach time is included"
          ],
          [
            "Rental car",
            "Choose your own departure time, beach and sightseeing stops",
            "Driving, parking and rental conditions are your responsibility",
            "Allow time for collecting the car and check desert road and weather conditions"
          ]
        ]
      },
            "sections": [
        {
          "id": "bus",
          "title": "By public bus: Egged 486 and 444",
          "paragraphs": [
            "Egged 486 leaves Jerusalem Central Bus Station and travels along the Dead Sea corridor, with stops near Ein Gedi, Masada and the Ein Bokek hotel district. Egged 444 also passes through the area on its way to Eilat, but requires advance seat reservation. The bus is generally the most economical choice if you are visiting a single destination.",
            "For a beach-only visit, select the stop nearest Ein Bokek's public beach and check the platform and fare in Egged's timetable or the national journey planner. There is no train to the Dead Sea, and not every Highway 90 stop is within easy walking distance of a beach or attraction.",
            "The main disadvantage is the limited flexibility: buses between attractions may be infrequent, and return services to Jerusalem can end early. Friday, Shabbat and holiday timetables are especially restrictive. If you want to visit several sites, compare the total time spent waiting for buses with a guided tour or private ride."
          ],
          "sourceIds": [
            "m26-egged",
            "m26-egged-444-reservation"
          ],
          "externalLinks": [
            {
              "label": "Egged — plan your bus trip",
              "href": "https://www.egged.co.il/en"
            },
            {
              "label": "National public transport planner",
              "href": "https://bus.gov.il/"
            }
          ],
          "tip": "Start by checking the last bus back from your exact stop in Ein Bokek, Masada or Ein Gedi. That departure determines how much time you really have at the Dead Sea."
        },
        {
          "id": "private",
          "title": "By taxi or private driver: direct travel from your hotel",
          "paragraphs": [
            "A taxi or pre-booked private transfer takes you from your Jerusalem hotel straight to the free public beach in the Ein Bokek hotel district, without carrying bags to the central bus station. It is an easy choice for families, visitors with luggage or anyone travelling when bus services are limited.",
            "For a simple drop-off, arrange a one-way transfer and plan your return separately. For a full sightseeing day, arrange a driver who stays with you and takes you between sites. Agree one total price covering your stops, waiting and return; driving does not automatically include guiding or admission.",
            "The main drawback is price, but a private vehicle can be more practical for a small group splitting the cost. For a ready-made full-day option, see my private Masada and Dead Sea tour from Jerusalem, starting at ₪2,100 per vehicle for up to four travellers (admission and guiding are extra). For a different itinerary, tell me your pickup location, passenger count, planned stops and return time when requesting a quote through my private driver service."
          ],
          "inlineLinks": [
            {
              "text": "private Masada and Dead Sea tour",
              "to": "/tours/masada-dead-sea/"
            },
            {
              "text": "private driver service",
              "to": "/private-driver/"
            }
          ],
        },
        {
          "id": "tours",
          "title": "By organised tour: transport plus sightseeing",
          "paragraphs": [
            "A group tour departing from Jerusalem is convenient when you want more than a beach visit, especially a combination of Masada, Ein Gedi and the Dead Sea. Transport and the day's stops are arranged for you, making this easier than trying to connect several bus journeys.",
            "The trade-off is a fixed departure, set time at each stop and less freedom to change the plan. Some excursions focus entirely on swimming; others spend much of the day at archaeological or nature sites. A beach stop may be at a paid northern-shore facility rather than the free public beach at Ein Bokek."
          ],
        },
        {
          "id": "driving",
          "title": "By rental car: the most flexible option",
          "paragraphs": [
            "With a rental car you can leave Jerusalem when you like, drive directly to the free public beach at Ein Bokek and add nearby attractions along the way. The usual route is east on Highway 1 and then south on Highway 90 along the Dead Sea. Use the precise beach, hotel or park entrance in navigation.",
            "This option works well for an early start or several stops, but the driver handles navigation, parking, vehicle pickup and the return. Compare rental offers and conditions with DiscoverCars' Israel rental comparison, including insurance coverage, permitted roads, rental pickup hours and fuel policies.",
            "Winter rain can trigger flash floods and close desert roads even when Jerusalem is dry. Check weather and road alerts before driving, never cross flowing floodwater, and avoid unregulated shoreline areas with sinkhole risks."
          ],
          "photo": { "src": deadSeaSaltIslandPhoto, "alt": "Turquoise Dead Sea water and white salt formations along the shoreline" },
          "inlineLinks": [
            {
              "text": "DiscoverCars' Israel rental comparison",
              "to": "/car-rental/"
            }
          ],
          "externalLinks": [
            {
              "label": "Israel Meteorological Service — warnings",
              "href": "https://ims.gov.il/en"
            }
          ],
        },
        {
          "id": "beach",
          "title": "Where to go for a Dead Sea beach day",
          "paragraphs": [
            "For a relaxed day of floating, choose the free public beach at Ein Bokek in the southern hotel district. Tamar Regional Council provides showers, changing rooms, toilets, shade, chairs and umbrellas without an admission fee. The nearby promenade has drinking-water fountains, food and shops.",
            "Parking near Ein Bokek's central beach is regulated and paid, and the closest spaces can fill up on busy days. Float only while lifeguards are on duty; supervised beach hours are shorter in winter. Northern-shore beaches such as Kalia are closer to Jerusalem but charge admission, and optional facilities can add to the price. Check the exact beach in any organised tour itinerary.",
            "Bring water, sun protection, swimwear and a towel. Float gently, keep the very salty water away from your eyes, and see my Dead Sea visitor guide for more beach and safety advice."
          ],
          "photo": { "src": einBokekShorePhoto, "alt": "Ein Bokek shoreline and the Dead Sea landscape" },
          "inlineLinks": [
            {
              "text": "Dead Sea visitor guide",
              "to": "/travel-blog/the-dead-sea/"
            }
          ],
          "sourceIds": [
            "m26-deadsea-ein-bokek-council",
            "m26-kalia-beach-prices"
          ],
          "externalLinks": [
            {
              "label": "Tamar Regional Council — free Ein Bokek public beach",
              "href": "https://www.deadsea.co.il/attractions/ein-bokek-central-beach/?lang=en"
            },
            {
              "label": "Kalia Beach — admission and facilities",
              "href": "https://kaliadeadsea.com/en/kalia-beach-en/"
            }
          ],
          "tip": "From my experience, the shorter journey to a northern beach rarely compensates for the entrance fees and often disappointing facilities. For a more enjoyable beach day and better value, I recommend continuing south to the free public beach at Ein Bokek."
        },

      ],
            "checklist": [
        "Pack a bag for wet swimwear and a change of clothes for your return to Jerusalem.",
        "Wear sturdy walking shoes rather than beach sandals if you plan to explore Masada or Ein Gedi.",
        "Have a payment card available for national-park admission and regulated parking."
      ],
      "faqs": [
        {
          "q": "How long does it take to reach the Dead Sea from Jerusalem?",
          "a": "The northern shore is closer, but allow roughly 1½–2 hours to Ein Bokek, depending on traffic and your starting point. Add time if you plan to visit Masada or another attraction."
        },
        {
          "q": "Is the public beach at Ein Bokek wheelchair-accessible?",
          "a": "Yes. Tamar Regional Council provides an accessible route into the water at Ein Bokek Central Beach, and beach wheelchairs can be borrowed from the lifeguard station. If you need assistance or a particular facility, check with the council before your visit."
        },
        {
          "q": "Do buses run to the Dead Sea on Shabbat?",
          "a": "Regular buses do not provide a dependable Saturday travel option. Services are reduced or suspended from Friday afternoon until Saturday evening, so check your exact date or arrange other transport."
        },
        {
          "q": "Should I stay at the Dead Sea overnight?",
          "a": "A day trip is enough for a beach visit or one major attraction. Staying overnight is worth considering if you want a slow morning at the beach, spa time or multiple sightseeing stops without rushing back to Jerusalem."
        },
        {
          "q": "Can I combine Masada, Ein Gedi, Qumran and Qasr al-Yahud in one day?",
          "a": "Trying to visit all four would be rushed. Choose one major attraction alongside the beach, or two short stops with an early start and a private car or guided itinerary."
        }
      ],
      "related": [
        "deadSea",
        "jerusalemDayTrips",
        "bestTime"
      ],
      "services": [
        {
          "label": "Masada & Dead Sea tours",
          "to": "/tours/masada-dead-sea/"
        },
        {
          "label": "Private driver service",
          "to": "/private-driver/"
        },
        {
          "label": "Dead Sea hotels",
          "to": "/travel-blog/best-dead-sea-hotels/"
        }
      ],
      "sourceIds": [
        "m26-egged",
        "m26-ein-bokek",
        "guide-ein-gedi",
        "inpa-masada",
        "guide-qasr",
        "m26-egged-444-reservation",
        "m26-deadsea-ein-bokek-council",
        "m26-inpa-ein-gedi-2026",
        "m26-qumran-park",
        "m26-qasr-registration"
      ]
    },

} satisfies Record<string, TravelGuide>;
