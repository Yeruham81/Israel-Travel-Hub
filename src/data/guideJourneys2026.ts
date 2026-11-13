import type { TravelGuide } from "@/data/travelGuides";
import { carRentalAffiliateUrl } from "@/lib/car-rental-affiliate";
import { migrationPhotos as P } from "@/data/guideMigrationPhotos";
import palestinianTaxiPhoto from "@/assets/guides/bethlehem/palestinian-taxi.jpg";
import mangerSquarePhoto from "@/assets/guides/bethlehem/manger-square.jpg";
import milkGrottoPhoto from "@/assets/guides/bethlehem/milk-grotto.jpg";
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
        "to": "/airport-transfers/ben-gurion-airport-to-ein-bokek/"
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
  "updatedAt": "2026-11-13",
  "title": "How to Get from Jerusalem to Bethlehem: Bus, Taxi & Tours",
  "description": "Compare bus 231 and 234, licensed private drivers, taxis to Checkpoint 300 and Bethlehem tours. Plan your final stop, documents and the return to Jerusalem.",
  "intro": "Planning a trip from Jerusalem to Bethlehem? Despite the short distance, checkpoints and local travel arrangements can complicate the journey. This guide explains the different ways to get there and what to know before you go.",
  "answer": "For an independent visit, bus 231 is generally the more direct low-cost approach towards central Bethlehem, while bus 234 takes you to Checkpoint 300 for a pedestrian crossing and onward local transport. A guided tour or an authorised private driver can simplify the return journey.",
  "topics": [
    "transportation",
    "destinations",
    "tips",
    "religion"
  ],
  "photo": P["jerusalem-to-bethlehem"],
  "facts": [
    {
      "label": "Where to board",
      "text": "East Jerusalem Arab bus area near Damascus Gate; verify the departure bay"
    },
    {
      "label": "Bus 231",
      "text": "Via Beit Jala and the Bab al-Zaqaq area; confirm where to alight"
    },
    {
      "label": "Bus 234",
      "text": "Checkpoint 300 approach; the pedestrian crossing and onward ride are separate"
    }
  ],
  "comparison": {
    "caption": "Compare ways to reach Bethlehem",
    "headers": [
      "Option",
      "Best suited to",
      "What to plan"
    ],
    "rows": [
      [
        "Bus 231",
        "Independent visitors seeking a lower-cost route towards central Bethlehem",
        "Get off near Bab al-Zaqaq / Beit Jala as advised; allow for a final walk or local ride"
      ],
      [
        "Bus 234",
        "Visitors deliberately using the Checkpoint 300 route",
        "Pedestrian crossing, possible checks, and a Palestinian taxi or arranged pickup"
      ],
      [
        "Authorised private driver",
        "Families and groups wanting a flexible visit",
        "Written confirmation of Jerusalem pickup, permissions, insurance, waiting and return"
      ],
      [
        "Taxi to Checkpoint 300",
        "Travellers meeting a local driver after the crossing",
        "Separate transport on each side and possible waiting time"
      ],
      [
        "Organised tour",
        "First-time visitors wanting an itinerary and return arranged",
        "Actual Jerusalem departure, sites, guide handover and access rules"
      ],
      [
        "Rental car",
        "Usually restricted by rental agreements",
        "Most rental companies prohibit this route; written authorisation would be required"
      ]
    ]
  },
  "sections": [
    {
      "id": "entry-rules",
      "title": "Before you go: Area A, entry rules and checkpoints",
      "paragraphs": [
        "Bethlehem is in Palestinian Authority Area A, which Israeli citizens are generally prohibited from entering, including dual citizens. The entry rules for foreign visitors depend on nationality and immigration status. These restrictions explain why not every driver or vehicle can take you from Jerusalem into Bethlehem.",
        "Carry your original passport and any relevant Israeli entry card or visa. US visitors can consult the State Department's Israel, West Bank and Gaza travel guidance for official entry and security advice."
      ],
      "richParagraphs": [
        [
          {
            "text": "Bethlehem is in Palestinian Authority Area A, which Israeli citizens are generally prohibited from entering, including dual citizens. The entry rules for foreign visitors depend on nationality and immigration status. These restrictions explain why not every driver or vehicle can take you from Jerusalem into Bethlehem."
          }
        ],
        [
          {
            "text": "Carry your original passport and any relevant Israeli entry card or visa. US visitors can consult the "
          },
          {
            "text": "State Department's Israel, West Bank and Gaza travel guidance",
            "href": "https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/IsraeltheWestBankandGaza.html"
          },
          {
            "text": " for official entry and security advice."
          }
        ]
      ],
      "sourceIds": [
        "m26-bethlehem-entry"
      ]
    },
    {
      "id": "buses",
      "title": "By bus: choose line 231 or 234",
      "paragraphs": [
        "East Jerusalem buses for Bethlehem leave from the Arab bus station beside Damascus Gate, not Jerusalem's western Central Bus Station. The Christian Information Center's East Jerusalem bus guide identifies the boarding area.",
        "Line 231 passes through the Bab al-Zaqaq / Beit Jala area and is generally better for reaching central Bethlehem. Line 234 serves the Checkpoint 300 approach, where you cross on foot and arrange a local ride.",
        "Use South Buses' routes and timetables to find departure times and the last practical bus back to Jerusalem, and its fares and payment information to see the current ticket price and accepted payment methods."
      ],
      "richParagraphs": [
        [
          {
            "text": "East Jerusalem buses for Bethlehem leave from the Arab bus station beside Damascus Gate, not Jerusalem's western Central Bus Station. The "
          },
          {
            "text": "Christian Information Center's East Jerusalem bus guide",
            "href": "https://www.cicts.org/en/east-jerusalem-bus-lines"
          },
          {
            "text": " identifies the boarding area."
          }
        ],
        [
          {
            "text": "Line 231 passes through the Bab al-Zaqaq / Beit Jala area and is generally better for reaching central Bethlehem. Line 234 serves the Checkpoint 300 approach, where you cross on foot and arrange a local ride."
          }
        ],
        [
          {
            "text": "Use "
          },
          {
            "text": "South Buses' routes and timetables",
            "href": "https://south-buses.com/lines-and-stations/?lang=en"
          },
          {
            "text": " to find departure times and the last practical bus back to Jerusalem, and its "
          },
          {
            "text": "fares and payment information",
            "href": "https://south-buses.com/?lang=en"
          },
          {
            "text": " to see the current ticket price and accepted payment methods."
          }
        ]
      ],
      "subsections": [
        {
          "id": "bus-231",
          "title": "Bus 231: the Bab al-Zaqaq approach",
          "paragraphs": [
            "Line 231 serves Bab al-Zaqaq near Beit Jala, which is closer to central Bethlehem than the Checkpoint 300 approach.",
            "Ask the driver which stop best serves the Church of the Nativity. You may still need to walk or take a local taxi to reach Manger Square."
          ]
        },
        {
          "id": "bus-234",
          "title": "Bus 234: via Checkpoint 300",
          "paragraphs": [
            "Line 234 serves the Rachel's Tomb / Checkpoint 300 approach. It does not take you straight to Manger Square. If the crossing is operating and you are eligible to pass, follow the designated pedestrian route, complete any checks and arrange a local vehicle on the Bethlehem side.",
            "Confirm where a driver or guide will meet you and what happens if the checkpoint is delayed or inaccessible. On the way back, allow time to cross toward Jerusalem before boarding the return bus."
          ]
        }
      ],
      "tip": "Photograph the stop sign and a nearby landmark when you get off at Bab al-Zaqaq. It can be much easier to recognise the correct return boarding point from a photo than from the street name alone.",
      "sourceIds": [
        "m26-south-buses",
        "m26-cicts-buses"
      ]
    },
    {
      "id": "private-taxi",
      "title": "Private driver or taxi: check where the ride ends",
      "paragraphs": [
        "A Palestinian taxi driver with the necessary authorisations and insurance may take eligible visitors directly from Jerusalem into Bethlehem, wait during sightseeing and drive them back. Such taxis can generally be found or arranged in East Jerusalem, but the particular driver and vehicle must be permitted to make the complete journey.",
        "Before booking, agree on the pickup point, route permissions, insurance, waiting time, sightseeing stops, total fare and return arrangements. A driver is not necessarily a licensed tour guide.",
        "An Israeli taxi can take you to the Checkpoint 300 approach, but it is not normally a through-service into Bethlehem. For a journey via the checkpoint, arrange the walk across and a separate Palestinian taxi or guide on the Bethlehem side."
      ],
      "photo": {
        "src": palestinianTaxiPhoto,
        "alt": "Yellow Palestinian taxi photographed on a local street"
      },
      "tip": "For a local taxi on the Bethlehem side of Checkpoint 300, agree on the total fare and the currency before getting in—not just the destination at Manger Square.",
      "sourceIds": [
        "m26-bethlehem-entry"
      ]
    },
    {
      "id": "tours",
      "title": "Organised day trips and guided Bethlehem visits",
      "paragraphs": [
        "A Bethlehem-focused half-day tour can be easier than coordinating bus stops and separate local transfers. Private tours offer more flexibility, while full-day excursions combine Bethlehem with Jerusalem, Jericho or the Jordan River.",
        "Depending on the operator, the journey from Jerusalem and the Bethlehem sightseeing portion may involve different drivers or guides."
      ],
      "sourceIds": [
        "m26-bethlehem-entry"
      ]
    },
    {
      "id": "rental-car",
      "title": "Can you drive a rental car to Bethlehem?",
      "paragraphs": [
        "A rental car is generally not recommended for the Jerusalem–Bethlehem journey. Most Israeli rental companies prohibit driving into Palestinian Authority Area A, including Bethlehem, and the insurance may not cover such a trip.",
        "If you're considering a rental car for other parts of your visit, you can compare available offers, but check the specific provider's restrictions and get written confirmation of any permission to drive into Bethlehem and the applicable insurance terms before booking."
      ],
      "richParagraphs": [
        [
          {
            "text": "A rental car is generally not recommended for the Jerusalem–Bethlehem journey. Most Israeli rental companies prohibit driving into Palestinian Authority Area A, including Bethlehem, and the insurance may not cover such a trip."
          }
        ],
        [
          {
            "text": "If you're considering a "
          },
          {
            "text": "rental car",
            "href": carRentalAffiliateUrl("/travel-blog/jerusalem-to-bethlehem/")
          },
          {
            "text": " for other parts of your visit, you can compare available offers, but check the specific provider's restrictions and get written confirmation of any permission to drive into Bethlehem and the applicable insurance terms before booking."
          }
        ]
      ],
      "sourceIds": [
        "m26-bethlehem-entry"
      ]
    },
    {
      "id": "visit-return",
      "title": "Plan a half-day visit and the journey back",
      "paragraphs": [
        "A half-day is often enough for a focused visit to central Bethlehem, but church queues, travel arrangements and any additional stops should be factored into your plans.",
        "The Church of the Nativity is part of a UNESCO World Heritage site. Because of restoration work, the Christian Information Center's October 2026 notice lists visits to the Grotto of the Nativity from 12:30 to 14:30 on Monday–Saturday and from 11:00 to 15:00 on Sunday. These are grotto visiting hours, not the basilica's overall opening hours.",
        "Set a clear meeting time and pickup location for your journey back to Jerusalem. Checkpoint crossings and connections can take longer than the road distance suggests."
      ],
      "richParagraphs": [
        [
          {
            "text": "A half-day is often enough for a focused visit to central Bethlehem, but church queues, travel arrangements and any additional stops should be factored into your plans."
          }
        ],
        [
          {
            "text": "The Church of the Nativity is part of a UNESCO World Heritage site. Because of restoration work, the "
          },
          {
            "text": "Christian Information Center's October 2026 notice",
            "href": "https://www.cicts.org/bethlehem-basilica-of-the-nativity-cts/"
          },
          {
            "text": " lists visits to the Grotto of the Nativity from 12:30 to 14:30 on Monday–Saturday and from 11:00 to 15:00 on Sunday. These are grotto visiting hours, not the basilica's overall opening hours."
          }
        ],
        [
          {
            "text": "Set a clear meeting time and pickup location for your journey back to Jerusalem. Checkpoint crossings and connections can take longer than the road distance suggests."
          }
        ]
      ],
      "photo": {
        "src": mangerSquarePhoto,
        "alt": "Christmas lights and a decorated tree in Bethlehem's Manger Square"
      },
      "subsections": [
        {
          "id": "bethlehem-sites",
          "title": "What to see around the Church of the Nativity",
          "paragraphs": [
            "Start with the Church of the Nativity and Manger Square. The Milk Grotto and Star Street are within walking distance of the Nativity precinct, while Shepherds' Field in nearby Beit Sahour generally requires a separate ride. Modest clothing and comfortable walking shoes are useful at active worship sites."
          ],
          "photo": {
            "src": milkGrottoPhoto,
            "alt": "Stone arches and a devotional interior at Bethlehem's Milk Grotto"
          }
        }
      ],
      "tip": "If visiting the Grotto of the Nativity is a priority, plan the rest of your day around its limited entry hours and allow time for the queue. Visit nearby sites before or after, rather than counting on being able to return to the grotto later.",
      "sourceIds": [
        "m26-cicts-grotto-hours",
        "m26-custodia-nativity-restoration",
        "m26-unesco-nativity"
      ]
    },
    {
      "id": "shabbat",
      "title": "Can you visit Bethlehem on Saturday or Sunday?",
      "paragraphs": [
        "East Jerusalem buses can operate on Saturday even when many other Israeli transport services are reduced. South Buses publishes departures by day for routes 231 and 234.",
        "Sunday visits to the Grotto of the Nativity follow a different schedule from weekdays, with a current visitor window of 11:00 to 15:00 in the Christian Information Center's grotto notice."
      ],
      "richParagraphs": [
        [
          {
            "text": "East Jerusalem buses can operate on Saturday even when many other Israeli transport services are reduced. "
          },
          {
            "text": "South Buses publishes departures by day",
            "href": "https://south-buses.com/lines-and-stations/?lang=en"
          },
          {
            "text": " for routes 231 and 234."
          }
        ],
        [
          {
            "text": "Sunday visits to the Grotto of the Nativity follow a different schedule from weekdays, with a current visitor window of 11:00 to 15:00 in the "
          },
          {
            "text": "Christian Information Center's grotto notice",
            "href": "https://www.cicts.org/bethlehem-basilica-of-the-nativity-cts/"
          },
          {
            "text": "."
          }
        ]
      ],
      "sourceIds": [
        "m26-south-buses",
        "m26-cicts-grotto-hours"
      ]
    }
  ],
  "checklist": [
    "Carry your original passport and any immigration entry documents.",
    "Save the bus timetable or your driver's contact details for offline use.",
    "Carry some small cash for a local taxi if you are crossing at Checkpoint 300.",
    "Allow time for the return crossing and onward journey before evening plans."
  ],
    "faqs": [
    {
      "q": "What is the cheapest way to travel from Jerusalem to Bethlehem?",
      "a": "An East Jerusalem bus is normally the lowest-cost option. Line 231 serves the Bab al-Zaqaq area towards central Bethlehem; line 234 ends at Checkpoint 300 and usually requires an onward ride."
    },
    {
      "q": "Is bus 231 or bus 234 better for the Church of the Nativity?",
      "a": "Line 231 travels toward the Bab al-Zaqaq / Beit Jala area and generally gets you closer to central Bethlehem. Line 234 serves Checkpoint 300, requiring a pedestrian crossing and onward transport when permitted. Neither bus stops directly at the church."
    },
    {
      "q": "Where do buses to Bethlehem leave from in Jerusalem?",
      "a": "The Arab bus station just outside Damascus Gate in East Jerusalem, rather than the western Central Bus Station."
    },
    {
      "q": "Can a Palestinian driver pick me up in Jerusalem?",
      "a": "Yes, if the driver and vehicle are appropriately authorised and insured for the complete route. Some Palestinian taxis can be found or arranged in East Jerusalem."
    },
    {
      "q": "Can an Israeli taxi take me directly into Bethlehem?",
      "a": "An Israeli-citizen taxi driver cannot make an ordinary through trip into Area A. A taxi may take you to Checkpoint 300, where eligible visitors can arrange the crossing and a separate local ride."
    },
    {
      "q": "Do I need a passport to visit Bethlehem?",
      "a": "Bring your original passport and any applicable Israeli entry card or visa. Israeli citizens, including dual citizens, are generally prohibited from entering Area A."
    },
    {
      "q": "Is half a day enough to visit Bethlehem?",
      "a": "A half-day is often enough for the Church of the Nativity, Manger Square and a nearby site, but allow time for the grotto's restricted visiting hours and the return journey."
    },
    {
      "q": "Is there a train from Jerusalem to Bethlehem?",
      "a": "No. There is no passenger-train service between Jerusalem and Bethlehem; consider an East Jerusalem bus, a permitted private arrangement or an organised tour."
    },
    {
      "q": "Can I visit Bethlehem on Saturday?",
      "a": "East Jerusalem buses may operate on Saturdays; line 231 and 234 departure schedules are published by South Buses. Bethlehem's church visiting hours are separate from the bus timetable."
    },
    {
      "q": "Can I drive an Israeli rental car into Bethlehem?",
      "a": "Usually not. Most Israeli rental agreements prohibit entry into Area A, and insurance may not cover the journey. Seek written permission and confirmed coverage if considering it."
    },
    {
      "q": "Is the Grotto of the Nativity open to visitors?",
      "a": "Yes, but during restoration the current visiting window is 12:30–14:30 Monday–Saturday and 11:00–15:00 Sunday, according to the Christian Information Center's October 2026 notice."
    }
  ],
  "related": [
    "jerusalem",
    "jerusalemChurches",
    "jerusalemDayTrips",
    "jerusalemDeadSea"
  ],
  "services": [],
  "sourceIds": [
    "m26-south-buses",
    "m26-cicts-buses",
    "m26-bethlehem-entry",
    "m26-cicts-grotto-hours",
    "m26-custodia-nativity-restoration",
    "m26-unesco-nativity"
  ],
  "nextSteps": []
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
