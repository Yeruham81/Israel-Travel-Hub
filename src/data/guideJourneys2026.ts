import type { TravelGuide } from "@/data/travelGuides";
import { topTenExperiences, topTenFaqs } from "@/data/topTenExperiences";
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
            "to": "/accommodation/dead-sea/spa/"
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
            "to": "/attractions/masada/"
          },
          {
            "label": "Check the Ein Gedi visit",
            "to": "/attractions/ein-gedi/"
          },
          {
            "label": "Explore Qasr el-Yahud",
            "to": "/attractions/qasr-el-yahud/"
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
        "to": "/accommodation/dead-sea/family/"
      },
      {
        "label": "Plan airport transport to Ein Bokek",
        "to": "/airport-transfers/ein-bokek/"
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
  "intro": "Bethlehem is only a short distance from Jerusalem, but getting there requires some planning. Here's how to travel by bus, taxi or organised tour, and what to check before you leave.",
  "answer": "For independent travellers, bus 231 is generally the easier way to reach central Bethlehem. Bus 234 goes towards Checkpoint 300, where you cross on foot and continue by local transport. A guided tour or an authorised private driver can simplify the return journey.",
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
      "text": "East Jerusalem bus station near Damascus Gate; check your departure point"
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
        "Ask where to get off near Bab al-Zaqaq, then walk or take a local taxi to the centre"
      ],
      [
        "Bus 234",
        "Visitors deliberately using the Checkpoint 300 route",
        "Pedestrian crossing, possible checks, and a Palestinian taxi or arranged pickup"
      ],
      [
        "Authorised private driver",
        "Families and groups wanting a flexible visit",
        "Confirm pickup, route permissions, insurance, waiting time and the return trip"
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
        "Bethlehem is in Area A of the West Bank. Israeli citizens, including dual citizens, are generally prohibited from entering. Other visitors should check the entry rules that apply to their nationality and status. Not every driver or vehicle is permitted to make the journey.",
        "Bring your original passport and any required entry documents. If you're travelling on a US passport, check the State Department's travel advice for current entry and security information."
      ],
      "richParagraphs": [
        [
          {
            "text": "Bethlehem is in Area A of the West Bank. Israeli citizens, including dual citizens, are generally prohibited from entering. Other visitors should check the entry rules that apply to their nationality and status. Not every driver or vehicle is permitted to make the journey."
          }
        ],
        [
          {
            "text": "Bring your original passport and any required entry documents. If you're travelling on a US passport, check the "
          },
          {
            "text": "State Department's travel advice",
            "href": "https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/IsraeltheWestBankandGaza.html"
          },
          {
            "text": " for current entry and security information."
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
        "Buses to Bethlehem leave from the East Jerusalem bus station near Damascus Gate, not Jerusalem Central Bus Station. The Christian Information Center's East Jerusalem bus guide identifies the boarding area.",
        "Check South Buses' routes and timetables for departures and return services, and its fares and payment information for ticket prices and payment options."
      ],
      "richParagraphs": [
        [
          {
            "text": "Buses to Bethlehem leave from the East Jerusalem bus station near Damascus Gate, not Jerusalem Central Bus Station. The "
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
            "text": "Check "
          },
          {
            "text": "South Buses' routes and timetables",
            "href": "https://south-buses.com/lines-and-stations/?lang=en"
          },
          {
            "text": " for departures and return services, and its "
          },
          {
            "text": "fares and payment information",
            "href": "https://south-buses.com/?lang=en"
          },
          {
            "text": " for ticket prices and payment options."
          }
        ]
      ],
      "subsections": [
        {
          "id": "bus-231",
          "title": "Bus 231: via Beit Jala towards central Bethlehem",
          "paragraphs": [
            "Bus 231 passes through the Bab al-Zaqaq area near Beit Jala, making it a more convenient option for central Bethlehem.",
            "Ask the driver where to get off for the Church of the Nativity. From there, you may need to walk or take a short taxi ride to Manger Square."
          ]
        },
        {
          "id": "bus-234",
          "title": "Bus 234: via Checkpoint 300",
          "paragraphs": [
            "Bus 234 takes you towards Checkpoint 300, not directly to Manger Square. If you're eligible to cross and the checkpoint is open, follow the pedestrian route, complete any required checks and arrange a local taxi or pickup on the Bethlehem side.",
            "Agree on a meeting point with your driver or guide and discuss what happens if the checkpoint is delayed or closed. Allow extra time to cross back before catching your bus to Jerusalem."
          ]
        }
      ],
      "tip": "Take a photo of your bus stop and a nearby landmark. It'll make finding the return stop much easier.",
      "sourceIds": [
        "m26-south-buses",
        "m26-cicts-buses"
      ]
    },
    {
      "id": "private-taxi",
      "title": "Private driver or taxi: check where the ride ends",
      "paragraphs": [
        "An appropriately authorised and insured Palestinian taxi may be able to take eligible visitors from Jerusalem to Bethlehem and back, with waiting time for sightseeing. Confirm that both the driver and vehicle are permitted to complete the journey.",
        "Before booking, confirm the pickup point, permitted route, insurance, sightseeing stops, waiting time and total price, including the return. Remember that a driver may not be a licensed guide.",
        "An Israeli taxi can take you towards Checkpoint 300, but it will not normally continue into Bethlehem. Eligible visitors can cross on foot when permitted and arrange a Palestinian taxi or guide on the other side."
      ],
      "photo": {
        "src": palestinianTaxiPhoto,
        "alt": "Yellow Palestinian taxi photographed on a local street"
      },
      "tip": "Before entering a local taxi, agree on the total fare, currency and destination.",
      "sourceIds": [
        "m26-bethlehem-entry"
      ]
    },
    {
      "id": "tours",
      "title": "Organised day trips and guided Bethlehem visits",
      "paragraphs": [
        "A half-day tour of Bethlehem avoids the need to arrange local buses and transfers yourself. Private tours offer more flexibility, while full-day tours may include other destinations.",
        "Some tours use different drivers or guides for the journey and the sightseeing in Bethlehem."
      ],
      "sourceIds": [
        "m26-bethlehem-entry"
      ]
    },
    {
      "id": "rental-car",
      "title": "Can you drive a rental car to Bethlehem?",
      "paragraphs": [
        "A rental car is generally not suitable for the Jerusalem–Bethlehem journey. Most Israeli rental companies prohibit driving into Area A, including Bethlehem, and the insurance may not cover the trip.",
        "If you're considering a rental car for other parts of your trip, check the company's restrictions carefully. Do not drive into Bethlehem without written permission and confirmed insurance coverage."
      ],
      "richParagraphs": [
        [
          {
            "text": "A rental car is generally not suitable for the Jerusalem–Bethlehem journey. Most Israeli rental companies prohibit driving into Area A, including Bethlehem, and the insurance may not cover the trip."
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
            "text": " for other parts of your trip, check the company's restrictions carefully. Do not drive into Bethlehem without written permission and confirmed insurance coverage."
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
        "Half a day is usually enough to see Bethlehem's main central sites. Allow extra time for church queues, transport and any additional stops.",
        "The Church of the Nativity is a UNESCO World Heritage site. During restoration, the Christian Information Center's published notice lists grotto visiting hours as 12:30–14:30 Monday–Saturday and 11:00–15:00 Sunday. These hours apply to the grotto, not the whole basilica. Check for updates before visiting.",
        "Agree on your return pickup time and location in advance. Allow extra time for checkpoints and transport connections."
      ],
      "richParagraphs": [
        [
          {
            "text": "Half a day is usually enough to see Bethlehem's main central sites. Allow extra time for church queues, transport and any additional stops."
          }
        ],
        [
          {
            "text": "The Church of the Nativity is a UNESCO World Heritage site. During restoration, the "
          },
          {
            "text": "Christian Information Center's published notice",
            "href": "https://www.cicts.org/bethlehem-basilica-of-the-nativity-cts/"
          },
          {
            "text": " lists grotto visiting hours as 12:30–14:30 Monday–Saturday and 11:00–15:00 Sunday. These hours apply to the grotto, not the whole basilica. Check for updates before visiting."
          }
        ],
        [
          {
            "text": "Agree on your return pickup time and location in advance. Allow extra time for checkpoints and transport connections."
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
            "Start at the Church of the Nativity and Manger Square. You can walk to the Milk Grotto and Star Street, but Shepherds' Field in nearby Beit Sahour usually requires a separate ride. Wear modest clothing and comfortable shoes when visiting active places of worship."
          ],
          "photo": {
            "src": milkGrottoPhoto,
            "alt": "Stone arches and a devotional interior at Bethlehem's Milk Grotto"
          }
        }
      ],
      "tip": "If the grotto is your priority, allow time for the queue and plan nearby visits around its opening hours.",
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
        "Check both the bus timetable and church visiting hours for your date."
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
            "text": "Check both the bus timetable and church visiting hours for your date."
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
      "a": "Yes, provided the driver and vehicle are authorised and insured for the full journey. Some suitable taxis can be arranged in East Jerusalem."
    },
    {
      "q": "Can an Israeli taxi take me directly into Bethlehem?",
      "a": "An Israeli taxi will not normally take you directly into Bethlehem. Eligible visitors can travel to Checkpoint 300, cross on foot when permitted and arrange onward transport."
    },
    {
      "q": "Do I need a passport to visit Bethlehem?",
      "a": "Bring your original passport and any applicable Israeli entry card or visa. Israeli citizens, including dual citizens, are generally prohibited from entering Area A."
    },
    {
      "q": "Is half a day enough to visit Bethlehem?",
      "a": "Usually, yes. Half a day can cover the Church of the Nativity, Manger Square and one nearby site, provided you allow time for the return trip."
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
      "a": "Yes, but visits to the grotto may be restricted during restoration. Check the Christian Information Center's current notice for visiting hours before you go."
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
    id: "topTen",
    updatedAt: "2026-11-20",
    title: "Top 10 Things to Do in Israel",
    description: "Explore my ten favourite Israel experiences, from Jerusalem and Tel Aviv to Masada, the Dead Sea, the Galilee, Haifa, Eilat and stargazing at Ramon Crater. Compare, map and plan your visit.",
    intro: "From Jerusalem's Old City to Tel Aviv's coast, the Dead Sea and desert stars, these ten experiences are a starting point for planning your own Israel trip.",
    answer: "I recommend combining Jerusalem, time on the Mediterranean coast and one regional excursion for a first visit. With more time, add the Galilee or a southern journey to the Negev and Eilat.",
    topics: ["attractions", "destinations", "itineraries", "tips"],
    photo: { src: "/images/top-ten-israel/hero.webp", alt: "Old Jaffa and the Mediterranean waterfront in Tel Aviv" },
    facts: [
      { label: "Ten experiences", text: "Coast, heritage, food, nature and night sky" },
      { label: "Eight regions", text: "Geographical map to choose a realistic route" },
      { label: "Start planning", text: "Pick priorities, then fit them to your dates" },
    ],
    comparison: {
      caption: "Compare all ten experiences in Israel",
      headers: ["Experience", "Region", "Best for", "Time to allow"],
      rows: topTenExperiences.map(experience => [
        experience.shortTitle, experience.region, experience.bestFor, experience.visitTime,
      ]),
    },
    sections: topTenExperiences.map(experience => ({
      id: experience.id,
      title: experience.title,
      paragraphs: [experience.description, experience.practical, experience.gettingThere, experience.tip],
      photo: experience.photo,
      links: [experience.guide, ...(experience.extraGuide ? [experience.extraGuide] : [])],
      ...(experience.official ? { externalLinks: [experience.official] } : {}),
    })),
    checklist: [
      "Choose a few favourite experiences for the time available",
      "Group destinations by area and decide on overnight bases",
      "Check park access, bathing supervision and the local forecast",
      "Confirm holiday and weekend transport or venue arrangements",
      "Plan the return journey, especially after dark or from desert sites",
    ],
    faqs: topTenFaqs,
    sourceIds: [
      "m26-tlv-beaches", "guide-jerusalem-tourism",
      "inpa-masada", "m26-bahai", "m26-coral", "m26-ims",
    ],
    related: ["bestTime", "calendar", "food", "deadSea"],
    services: [
      { label: "3-day Israel itinerary", to: "/travel-blog/israel-itinerary-3-days/" },
      { label: "5-day Israel itinerary", to: "/travel-blog/israel-itinerary-5-days/" },
      { label: "7-day Israel itinerary", to: "/travel-blog/israel-itinerary-7-days/" },
      { label: "10-day Israel itinerary", to: "/travel-blog/israel-itinerary-10-days/" },
      { label: "Getting around Israel", to: "/travel-blog/getting-around-israel/" },
      { label: "Best time to visit", to: "/travel-blog/best-time-to-visit-israel/" },
    ],
  },
    "jerusalemDeadSea": {
      "id": "jerusalemDeadSea",
      "updatedAt": "2026-11-13",
      "title": "How to Get from Jerusalem to the Dead Sea: Bus, Taxi, Tours & Car",
      "description": "How to travel from Jerusalem to the Dead Sea by bus 486/444, taxi, private driver, group tour or rental car. Compare costs, convenience, return trips and useful stops.",
      "intro": "The Dead Sea is one of the most popular day trips from Jerusalem. You can travel by bus, taxi, private driver, organised tour or rental car. The best option depends on whether you're visiting a beach or combining several attractions.",
      "answer": "For a budget-friendly trip, take Egged bus 486 or reserved-seat bus 444 from Jerusalem. Allow around 1½–2 hours to reach the Ein Bokek hotel area. A taxi or private driver takes you directly to your destination. An organised tour includes planned stops, while a rental car lets you explore at your own pace. For swimming, head to the free public beach at Ein Bokek. Check your return journey before setting out.",
      "topics": [
        "transportation",
        "destinations",
        "itineraries"
      ],
      "photo": P["jerusalem-to-the-dead-sea"],
      "facts": [
        {
          "label": "Public bus",
          "text": "Egged 486 or reserved-seat bus 444"
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
            "The cheapest option for a single destination",
            "Limited departures and difficult connections between attractions",
            "Board at Jerusalem Central Bus Station; check your destination stop and the final bus back"
          ],
          [
            "Taxi or private driver",
            "Direct hotel pickup, comfort and flexible stops",
            "More expensive than a bus, especially for one or two people",
            "Confirm whether you're booking a one-way ride or a full day with waiting and return transport"
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
            "Allow time to collect the car, and check road and weather conditions"
          ]
        ]
      },
            "sections": [
        {
          "id": "bus",
          "title": "By public bus: Egged 486 and 444",
          "paragraphs": [
            "Bus 486 leaves Jerusalem Central Bus Station and stops at several Dead Sea destinations, including Ein Gedi, Masada and Ein Bokek. Bus 444 also serves the area on its way to Eilat but requires an advance seat reservation. Both are affordable options for visiting a single destination.",
            "For a beach day, choose the stop nearest Ein Bokek's public beach. Check the departure platform, fare and timetable before travelling. There is no train to the Dead Sea. Some bus stops are far from beaches and attractions, so check your exact destination.",
            "Buses between Dead Sea attractions can be infrequent, and the last return bus to Jerusalem may leave early. Friday, Shabbat and holiday timetables are especially restrictive. If you're visiting several attractions, a guided tour or private driver may save considerable travel and waiting time."
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
              "href": "https://bus.gov.il/en/home"
            }
          ],
          "tip": "Check the last bus back to Jerusalem from your chosen stop before planning the day's activities."
        },
        {
          "id": "private",
          "title": "By taxi or private driver: direct travel from your hotel",
          "paragraphs": [
            "A taxi or pre-booked transfer takes you directly from your Jerusalem hotel to your chosen Dead Sea destination. This is particularly convenient for families, travellers with luggage and visitors travelling when buses are unavailable.",
            "Book a one-way transfer if you only need a drop-off. For sightseeing at several locations, arrange a driver who can wait and take you back to Jerusalem. Confirm the total price, including stops, waiting time and return transport. Guiding and attraction tickets may cost extra.",
            "Private transport costs more, but sharing the price can make it worthwhile for a family or small group. For a full-day option, see my private Masada and Dead Sea tour, starting at ₪2,100 per vehicle for up to four travellers. Admission and guiding cost extra. For a customised trip, send me your pickup location, group size, preferred stops and return time through my private driver service."
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
            "An organised tour is a convenient way to combine the Dead Sea with attractions such as Masada or Ein Gedi. Transport and sightseeing stops are arranged in advance, so you don't need to coordinate several buses.",
            "Tours follow a fixed schedule, with limited time at each stop. Some excursions focus entirely on swimming; others spend much of the day at archaeological or nature sites. A beach stop may be at a paid northern-shore facility rather than the free public beach at Ein Bokek."
          ],
        },
        {
          "id": "driving",
          "title": "By rental car: the most flexible option",
          "paragraphs": [
            "A rental car lets you leave Jerusalem at your preferred time and visit Ein Bokek or other Dead Sea attractions independently. The usual route follows Highway 1 east and Highway 90 south. Enter your exact beach, hotel or attraction into your navigation app.",
            "Driving is useful for an early start or several stops, but you'll need to arrange parking and handle the return journey yourself. Compare rental prices using DiscoverCars' Israel rental comparison, including insurance, permitted roads, fuel policies and pickup hours.",
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
            "For swimming and floating, I recommend the free public beach at Ein Bokek. The beach offers free access, showers, changing rooms, toilets and shaded areas. Chairs and umbrellas are also available, with drinking-water fountains, cafés and shops along the nearby promenade.",
            "Parking near the central beach is paid, and spaces can fill up quickly on busy days. Float only while lifeguards are on duty; supervised beach hours are shorter in winter. Northern beaches such as Kalia are closer to Jerusalem but charge an entrance fee, sometimes with additional costs for facilities. Check the exact beach in any organised tour itinerary.",
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
          "tip": "Northern beaches are closer to Jerusalem, but most charge admission. If you prefer free beach access, showers and a hotel-area promenade, I recommend Ein Bokek."
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
          "a": "A day trip is usually enough for the beach or one major attraction. Stay overnight if you'd like more beach time, a spa visit or a relaxed sightseeing schedule."
        },
        {
          "q": "Can I combine Masada, Ein Gedi, Qumran and Qasr al-Yahud in one day?",
          "a": "Visiting all four in one day would be too rushed. Choose one major attraction with the beach, or two shorter stops if you have suitable transport and an early start."
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
