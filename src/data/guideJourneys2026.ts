import type { TravelGuide } from "@/data/travelGuides";
import { topTenExperiences, topTenFaqs, topTenIsraelHero } from "@/data/topTenExperiences";
import { migrationPhotos as P } from "@/data/guideMigrationPhotos";
import palestinianTaxiPhoto from "@/assets/guides/bethlehem/palestinian-taxi.jpg";
import mangerSquarePhoto from "@/assets/guides/bethlehem/manger-square.jpg";
import milkGrottoPhoto from "@/assets/guides/bethlehem/milk-grotto.jpg";
import deadSeaRouteRoadPhoto from "@/assets/guides/dead-sea-route-road.webp";
import einBokekShorePhoto from "@/assets/guides/dead-sea-ein-bokek-shore.webp";

export const journeyDestinationGuides = {
  "deadSea": {
    "id": "deadSea",
    "updatedAt": "2026-10-20",
    "title": "The Dead Sea: beaches, floating and a practical visitor guide",
    "description": "Plan a Dead Sea visit around Ein Bokek, a managed beach, hotels and desert attractions. Compare northern and southern destinations and arrange the return journey.",
    "intro": "The Dead Sea is famous for its exceptionally salty water, desert scenery, bathing beaches and nearby archaeological sites. Start by choosing which beach or hotel area you'd like to visit. Ein Bokek, the northern beaches and Masada offer different day-trip options.",
    "answer": "For a first independent beach visit, compare the managed public-beach area at Ein Bokek with a named private beach or hotel day package. Visit a designated beach with lifeguards, check its facilities and arrange your return transport. Allow travel time between the northern shore, Ein Gedi, Masada and the southern hotel district.",
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
          "The Dead Sea lies in the Jordan Rift landscape far below Mediterranean sea level. Its high salt concentration creates the buoyancy for which it is famous. The Dead Sea shoreline has changed considerably over time. For safe access to the water, use designated beaches that are currently open to visitors.",
          "This guide focuses on visits approached from Jerusalem and destinations on the western side. The hotel and beach facilities around Ein Bokek are also distinct from the northern lake landscape."
        ]
      },
      {
        "id": "ein-bokek",
        "title": "Ein Bokek: a practical base for a beach day",
        "paragraphs": [
          "Ein Bokek’s managed public-beach area and promenade sit beside the southern hotel district. Hotel pools, changing facilities and spas may require a separate payment. Check the exact facilities you intend to use and any parking or equipment charges.",
          "Public beaches are open to visitors, while hotels may reserve their pools, spas and other facilities for paying guests. For a day package, read which changing room, towel, pool, spa or meal is included. If you're staying overnight, consider how far your hotel is from the beach."
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
          "Swim only at designated beaches while lifeguards are on duty, and follow their instructions. Enter slowly, keep the water away from your face and avoid splashing or diving. Use the provided showers to rinse off. The Dead Sea is ideal for floating on your back. Avoid swimming on your stomach.",
          "Do not walk onto an unregulated shore or look for an informal mud pool. Unstable ground and sinkholes affect parts of the region. For a Dead Sea mud treatment, compare the treatments and facilities offered by local hotels and spas."
        ]
      },
      {
        "id": "attractions",
        "title": "Add one clear attraction priority",
        "paragraphs": [
          "Visit Masada for its ancient fortress and panoramic desert views. Check cable-car hours and hiking trail conditions before visiting. Ein Gedi Nature Reserve offers desert hiking trails and waterfalls, with access depending on trail conditions and opening hours. Visit Qumran for its archaeological ruins and connection to the Dead Sea Scrolls, or Qasr el-Yahud for its religious significance as a baptism site.",
          "Prioritize the attractions you'd most like to visit and allow enough time to explore them. If you're combining a nature reserve, a religious ceremony and a beach visit, allow enough time for each activity. Each attraction has its own admission fees and opening hours."
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
          "From Jerusalem, you can visit the northern Dead Sea beaches or travel farther south to the Ein Bokek hotel district. Buses are convenient for visiting one destination. A private driver, rental car or organised tour offers more flexibility for several stops. Allow time to reach your bus stop and check the return timetable before visiting the beach or nature reserve.",
          "The area can be very hot. Choose the timing and amount of outdoor walking around the local forecast, and check weather and road notices before a desert outing. Include the name and address of your Dead Sea beach or hotel when requesting a transfer."
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
            "to": "/private-driver-in-israel/"
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
        "a": "Check whether your day package includes beach access, pools, spa facilities, changing rooms, towels and meals."
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
  "updatedAt": "2026-11-24",
  "title": "How to Get from Jerusalem to Bethlehem: Bus, Taxi & Tours",
  "description": "Travel from Jerusalem to Bethlehem by bus 231 or 234, licensed private driver, taxi or tour. Learn about Checkpoint 300, travel documents and return options.",
  "intro": "Bethlehem is only a short distance from Jerusalem, but getting there requires some planning. Here's how to travel by bus, taxi or organised tour, and what to check before you leave.",
  "answer": "For independent travellers, bus 231 usually reaches Bab al-Zaqaq, closer to central Bethlehem. Bus 234 ends at Checkpoint 300, where eligible passengers can cross on foot when the checkpoint is open and continue by local taxi. Authorised tour vehicles have separate crossing arrangements; confirm access and the return before setting out.",
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
      "text": "Via Beit Jala to Bab al-Zaqaq"
    },
    {
      "label": "Bus 234",
      "text": "Checkpoint 300: pedestrian crossing and transport to Bethlehem"
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
        "Budget travellers heading to central Bethlehem",
        "About 20–30 minutes by bus in normal traffic to Bab al-Zaqaq / Beit Jala Road; continue to Manger Square on foot or by local taxi"
      ],
      [
        "Bus 234",
        "Visitors crossing Checkpoint 300 on foot",
        "About 15–20 minutes by bus, plus checkpoint crossing time and local transport to Bethlehem for eligible travellers"
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
        "Pickup in Jerusalem, places visited, local guides and entry requirements"
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
        "Bethlehem is in Area A of the West Bank. Israeli citizens, including dual citizens, are generally prohibited from entering. Other visitors should check the entry rules that apply to their nationality and status. Drivers and vehicles must have the appropriate permission to enter Bethlehem.",
        "Bring your original passport and any required entry documents. If you're travelling on a US passport, check the State Department's travel advice for current entry and security information.",
        "A 22 November 2026 announcement reported that Checkpoint 300 would reopen to authorised vehicles and tourist coaches from 23 November. Crossing eligibility, operating hours and security restrictions may still change; confirm the crossing arrangements and vehicle permits with your tour or transport operator before travelling."
      ],
      "richParagraphs": [
        [
          {
            "text": "Bethlehem is in Area A of the West Bank. Israeli citizens, including dual citizens, are generally prohibited from entering. Other visitors should check the entry rules that apply to their nationality and status. Drivers and vehicles must have the appropriate permission to enter Bethlehem."
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
        ],
        [
          {
            "text": "A 22 November 2026 announcement "
          },
          {
            "text": "reported that Checkpoint 300 would reopen to authorised vehicles and tourist coaches",
            "href": "https://palsawa.com/en/palestinian-news/2026/11/22/bethlehem-crossing-reopens-to-vehicles-and-tour-buses-after-10-month-closure"
          },
          {
            "text": " from 23 November. Crossing eligibility, operating hours and security restrictions may still change; confirm the crossing arrangements and vehicle permits with your tour or transport operator before travelling."
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
        "South Buses publishes an ₪8 standard cash fare and an ₪8 Rav-Kav fare for journeys up to 15 km. Rav-Kav passengers must validate on each ride; the operator also describes 90-minute transfers under the ticket rules. Check your bus fare and return departure times."
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
            "text": "South Buses "
          },
          {
            "text": "publishes an ₪8 standard cash fare and an ₪8 Rav-Kav fare for journeys up to 15 km",
            "href": "https://south-buses.com/?lang=en"
          },
          {
            "text": ". Rav-Kav passengers must validate on each ride; the operator also describes 90-minute transfers under the ticket rules. Check your bus fare and "
          },
          {
            "text": "return departure times",
            "href": "https://south-buses.com/lines-and-stations/?lang=en"
          },
          {
            "text": "."
          }
        ]
      ],
      "subsections": [
        {
          "id": "bus-231",
          "title": "Bus 231: via Beit Jala towards central Bethlehem",
          "paragraphs": [
            "Bus 231 serves the Bab al-Zaqaq / Beit Jala Road stop, closer to central Bethlehem than Checkpoint 300. Journey planners estimate around 20–30 minutes from the East Jerusalem terminal in ordinary traffic; allow more at busy times.",
            "Get off at Bab al-Zaqaq / Beit Jala Road. Manger Square and the Church of the Nativity are roughly 1 km away, so continue on foot if comfortable or take a short local taxi ride."
          ]
        },
        {
          "id": "bus-234",
          "title": "Bus 234: via Checkpoint 300",
          "paragraphs": [
            "Bus 234 travels from Nevi'im Terminal to Checkpoint 300 / Bethlehem Road, taking about 15–20 minutes in normal traffic. For an independent trip, eligible passengers can use the pedestrian crossing when it is operating, then arrange a local taxi or pickup for Manger Square. The bus itself does not go to the church.",
            "Bus 234 still terminates at Checkpoint 300. Agree a meeting point with your local driver or guide, and leave extra time for checks and your return bus to Jerusalem."
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
        "Visitors who are permitted to enter Bethlehem can arrange a return trip with a Palestinian taxi driver who has the necessary permits and insurance, including time for sightseeing. Confirm that both the driver and vehicle are permitted to complete the journey.",
        "Before booking, confirm the pickup point, permitted route, insurance, sightseeing stops, waiting time and total price, including the return. Remember that a driver may not be a licensed guide.",
        "Eligible travellers can take an Israeli taxi towards Checkpoint 300. Continuing into Bethlehem in the same vehicle requires the appropriate driver permits, vehicle permits and insurance. After crossing on foot, you can arrange a local taxi or guide on the Bethlehem side."
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
            "to": "/car-rental/"
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
        "The Church of the Nativity is a UNESCO World Heritage site. The Christian Information Center lists temporary basilica hours of 05:00–17:00. The Grotto of the Nativity has separate visiting hours during restoration: 12:30–14:30 Monday–Saturday and 11:00–15:00 Sunday. Check both schedules before travelling.",
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
            "text": "The Church of the Nativity is a UNESCO World Heritage site. The Christian Information Center lists "
          },
          {
            "text": "temporary basilica hours of 05:00–17:00",
            "href": "https://www.cicts.org/our-services/"
          },
          {
            "text": ". The "
          },
          {
            "text": "Grotto of the Nativity has separate visiting hours during restoration",
            "href": "https://www.cicts.org/bethlehem-basilica-of-the-nativity-cts/"
          },
          {
            "text": ": 12:30–14:30 Monday–Saturday and 11:00–15:00 Sunday. Check both schedules before travelling."
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
            "Start at the Church of the Nativity and Manger Square. The Milk Grotto and Star Street are within walking distance of Manger Square. Take a taxi to Shepherds' Field in nearby Beit Sahour. Wear modest clothing and comfortable shoes when visiting active places of worship."
          ],
          "photo": {
            "src": milkGrottoPhoto,
            "alt": "Stone arches and a devotional interior at Bethlehem's Milk Grotto"
          }
        }
      ],
      "tip": "Plan your visit to the Grotto of the Nativity around its opening hours, allowing extra time for queues.",
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
    "Allow enough time to cross the checkpoint and return to Jerusalem before your evening plans."
  ],
    "faqs": [
    {
      "q": "What is the cheapest way to travel from Jerusalem to Bethlehem?",
      "a": "An East Jerusalem bus is normally the lowest-cost option. South Buses currently publishes an ₪8 fare for journeys up to 15 km; confirm the fare for your exact ride. Line 231 stops at Bab al-Zaqaq, while eligible passengers on line 234 continue from Checkpoint 300 after crossing."
    },
    {
      "q": "Is bus 231 or bus 234 better for the Church of the Nativity?",
      "a": "Line 231 stops at Bab al-Zaqaq / Beit Jala Road, about 1 km from Manger Square. Line 234 ends at Checkpoint 300, where eligible visitors can cross and continue by local taxi. From Bab al-Zaqaq, continue to the Church of the Nativity on foot or by taxi."
    },
    {
      "q": "Where do buses to Bethlehem leave from in Jerusalem?",
      "a": "Buses depart from the Arab bus station near Damascus Gate in East Jerusalem."
    },
    {
      "q": "Can a Palestinian driver pick me up in Jerusalem?",
      "a": "Yes, provided the driver and vehicle are authorised and insured for the full journey. Some suitable taxis can be arranged in East Jerusalem."
    },
    {
      "q": "Can an Israeli taxi take me directly into Bethlehem?",
      "a": "Both the driver and vehicle need the appropriate permits and insurance to enter Bethlehem. Israeli taxis generally stop before Checkpoint 300; eligible visitors can use the pedestrian crossing when operating and arrange local transport."
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
      "a": "Bethlehem has no passenger railway service. Travel by bus from East Jerusalem, an authorised private vehicle or an organised tour."
    },
    {
      "q": "Can I visit Bethlehem on Saturday?",
      "a": "East Jerusalem buses may operate on Saturdays; line 231 and 234 departure schedules are published by South Buses. Check church opening hours as well as Saturday bus departures."
    },
    {
      "q": "Can I drive an Israeli rental car into Bethlehem?",
      "a": "Usually not. Most Israeli rental agreements prohibit entry into Area A, and insurance may not cover the journey. Seek written permission and confirmed coverage if considering it."
    },
    {
      "q": "Is the Grotto of the Nativity open to visitors?",
      "a": "Yes, with temporary separate hours: the Christian Information Center lists the basilica at 05:00–17:00 and grotto visits at 12:30–14:30 Monday–Saturday or 11:00–15:00 Sunday during restoration. Check for updates before visiting."
    }
  ],
  "related": [
    "jerusalem",
    "jerusalemChurches",
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
    description: "Discover my top ten experiences in Israel: Jerusalem, Tel Aviv, Masada, the Dead Sea, Galilee, Haifa, Eilat and Ramon Crater, with maps and planning tips.",
    intro: "From Jerusalem's Old City to Tel Aviv's coast, the Dead Sea and desert stars, these ten experiences are a starting point for planning your own Israel trip.",
    answer: "I recommend combining Jerusalem, time on the Mediterranean coast and one regional excursion for a first visit. With more time, add the Galilee or a southern journey to the Negev and Eilat.",
    topics: ["attractions", "destinations", "itineraries", "tips"],
    photo: topTenIsraelHero,
    facts: [
      { label: "Ten experiences", text: "Coast, heritage, food, nature and night sky" },
      { label: "Eight regions", text: "Explore Israel's regions and plan your itinerary" },
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
      "updatedAt": "2026-11-24",
      "title": "How to Get from Jerusalem to the Dead Sea: Bus, Taxi, Tours & Car",
      "description": "Jerusalem to the Dead Sea: bus 486 or 444, taxi, private driver, tours or rental car, with driving times, destination stops, beach access and return travel.",
      "intro": "Travelling from Jerusalem to the Dead Sea? First choose your destination: a northern beach, Ein Gedi, Masada or the Ein Bokek hotel area. Then compare public buses, a private ride, an organised tour and a rental car.",
      "answer": "Egged bus 486 is a good budget choice for one Dead Sea destination; line 444 requires an advance seat reservation. For several stops or a flexible return, choose an organised tour, private driver or rental car. Allow roughly 90–110 minutes to drive from central Jerusalem to Ein Bokek, where Ein Bokek Central Beach is free to enter. Confirm your return journey before leaving.",
      "topics": [
        "transportation",
        "destinations",
        "itineraries"
      ],
      "photo": P["jerusalem-to-the-dead-sea"],
      "facts": [
        { "label": "Drive to Ein Bokek", "text": "Around 90–110 minutes from central Jerusalem in normal conditions" },
        { "label": "Public buses", "text": "Egged 486; advance seat reservation on 444" },
        { "label": "Beach access", "text": "Ein Bokek Central Beach is free to enter" }
      ],
      "comparison": {
        "caption": "Jerusalem to the Dead Sea: ways to travel",
        "headers": ["Transport", "Best for", "Journey time or fare", "Booking and planning"],
        "rows": [
          ["Egged buses 486 / 444", "One destination on a budget", "About ₪19 per adult to Ein Bokek; 1¾–2 hours", "Check your stop and return; reserve a seat on line 444"],
          ["Taxi or private driver", "Direct pickup and flexible sightseeing", "Approx. 90–110 minutes by road to Ein Bokek; request a quote", "Specify one-way or return, waiting time and group size"],
          ["Organised day tour", "Combining Masada, Ein Gedi and beach time", "Full-day itinerary; price depends on selected tour", "Confirm Jerusalem departure, beach, admissions and return"],
          ["Rental car", "Several independent stops and a flexible day", "Approx. 90–110 minutes to Ein Bokek, plus stops", "Check route access, parking and weather conditions"]
        ]
      },
            "sections": [
        {
          "id": "destinations",
          "title": "Choose your Dead Sea destination",
          "paragraphs": [
            "The northern beaches, Qumran, Ein Gedi, Masada and Ein Bokek are spread along Route 90. Plan your transport according to the places you want to visit.",
            "These are approximate one-way driving times from central Jerusalem via Routes 1 and 90, in normal conditions. Public buses can take longer, with departure times depending on the stop."
          ],
          "tables": [{
            "caption": "Driving times from Jerusalem to Dead Sea destinations",
            "headers": ["Destination", "Approximate drive", "What to visit"],
            "rows": [
              ["Kalia / northern shore", "35–50 minutes", "Northern beaches with paid facilities"],
              ["Qumran", "40–55 minutes", "Archaeological park and Dead Sea Scrolls history"],
              ["Ein Gedi Nature Reserve", "60–80 minutes", "Desert trails; check current access"],
              ["Masada - east entrance", "75–95 minutes", "Cable car and national-park visitor entrance"],
              ["Ein Bokek Central Beach", "90–110 minutes", "Free public beach, promenade and hotels"]
            ],
            "rowLinks": [
              { "href": "https://kaliadeadsea.com/en/kalia-beach-en/" },
              { "href": "https://en.parks.org.il/reserve-park/qumran-park" },
              { "to": "/attractions/ein-gedi/" },
              { "to": "/attractions/masada/" },
              { "to": "/attractions/dead-sea/" }
            ]
          }],
          "sourceIds": ["m26-ein-bokek", "inpa-masada", "guide-ein-gedi"]
        },
        {
          "id": "bus",
          "title": "By public bus: Egged 486 and 444",
          "paragraphs": [
            "Egged line 486 departs from Jerusalem Central Bus Station along the Dead Sea corridor, serving stops including Ein Gedi, Masada and Ein Bokek. Line 444 continues towards Eilat and requires an advance seat reservation. Get off at the bus stop closest to your hotel or the attraction you plan to visit.",
            "A standard adult single fare from Jerusalem to Ein Bokek is about ₪19. Fares to other Dead Sea stops depend on distance. Check your departure platform, return bus time and walking distance to the beach or hotel. Israel Railways does not serve the Dead Sea.",
            "Buses between individual Dead Sea attractions are infrequent, and the last bus back to Jerusalem may leave early. Friday and holiday timetables are shorter, while ordinary buses generally pause for Shabbat. Check the last return bus from your chosen stop."
          ],
          "sourceIds": [
            "m26-egged",
            "m26-egged-444-reservation"
          ],
          "externalLinks": [
            {
              "label": "Egged - plan your bus trip",
              "href": "https://www.egged.co.il/en"
            },
            {
              "label": "National public transport planner",
              "href": "https://bus.gov.il/en/home"
            },
            {
              "label": "Egged - line 444 seat reservations",
              "href": "https://www.egged.co.il/en/information-for-passengers/tickets-information"
            }
          ],

        },
        {
          "id": "private",
          "title": "By taxi or private driver: direct travel from your hotel",
          "paragraphs": [
            "A taxi or pre-booked private transfer takes you from your Jerusalem pickup address to the chosen Dead Sea hotel, beach or attraction. This suits travellers with luggage, families and visitors travelling outside normal bus hours.",
            "For a one-way transfer, confirm your drop-off address. For a private day trip, agree on the sightseeing stops, driver waiting time at each attraction and return journey to Jerusalem. Guiding and attraction admission should be arranged separately.",
            "For a private Masada and Dead Sea day trip, send me your pickup location in Jerusalem, travel date, passengers, planned stops and return time using the contact form. I'll reply personally with a quote. You can also browse my Masada and Dead Sea tours or read about my private driver service."
          ],
          "inlineLinks": [
            {
              "text": "Masada and Dead Sea tours",
              "to": "/tours/masada-dead-sea/"
            },
            {
              "text": "private driver service",
              "to": "/private-driver-in-israel/"
            }
          ],
        },
        {
          "id": "tours",
          "title": "By organised tour: transport plus sightseeing",
          "paragraphs": [
            "An organised tour is a convenient way to combine a Dead Sea beach visit with Masada or Ein Gedi, with transport between the attractions included.",
            "Some excursions focus on beach time, while others spend much of the day at Masada and Ein Gedi. Confirm that the tour departs from Jerusalem, its return point, the precise beach, time spent there and whether park admission or cable-car tickets are included."
          ],
        },
        {
          "id": "driving",
          "title": "By rental car: the most flexible option",
          "paragraphs": [
            "Renting a car gives you the freedom to visit several attractions around the Dead Sea. From Jerusalem, follow Highway 1 east and Highway 90 south. Set your navigation app to your hotel, beach or attraction entrance. Masada's eastern entrance is accessible from Route 90.",
            "With a rental car, you can leave early and visit several attractions in one day. Allow time for collecting the car, parking and the return drive to Jerusalem. See my car rental guide for details on insurance, fuel policies, pickup hours and permitted roads.",
            "Desert rain can cause sudden flash floods and road closures even when Jerusalem is dry. Check weather warnings and Route 90 status before departure, and use marked beach and parking access points."
          ],
          "photo": { "src": deadSeaRouteRoadPhoto, "alt": "Route 90 curving beside the Dead Sea and Judean Desert cliffs" },
          "inlineLinks": [
            {
              "text": "car rental guide",
              "to": "/car-rental/"
            }
          ],
          "externalLinks": [
            {
              "label": "Israel Meteorological Service - warnings",
              "href": "https://ims.gov.il/en"
            }
          ],
        },
        {
          "id": "beach",
          "title": "Where to go for a Dead Sea beach day",
          "paragraphs": [
            "For swimming and floating, I recommend Ein Bokek Central Beach, where public entry, showers, changing rooms, toilets, shaded areas and chairs and umbrellas are free. The promenade has drinking-water fountains, cafés and shops.",
            "Blue-and-white parking near the central beach is paid, with additional parking above the hotel area. At hotel-operated public beaches, chairs and umbrellas may cost extra for non-guests. Use the marked, supervised swimming area; lifeguard hours vary by season.",
            "Bring drinking water, sun protection and a towel. Ein Bokek Central Beach has an accessible approach and beach wheelchairs available through the lifeguard station. My Dead Sea visitor guide explains bathing and accessibility in more detail."
          ],
          "photo": { "src": einBokekShorePhoto, "alt": "Ein Bokek shoreline and the Dead Sea landscape" },
          "inlineLinks": [
            {
              "text": "Dead Sea visitor guide",
              "to": "/attractions/dead-sea/"
            }
          ],
          "sourceIds": [
            "m26-deadsea-ein-bokek-council",
            "m26-kalia-beach-prices"
          ],
          "externalLinks": [
            {
              "label": "Tamar Regional Council - free Ein Bokek public beach",
              "href": "https://www.deadsea.co.il/attractions/ein-bokek-central-beach/?lang=en"
            },
            {
              "label": "Tamar Regional Council - hotel-beach equipment rules",
              "href": "https://www.deadsea.co.il/attractions/the-hotel-beaches/?lang=en/"
            },
            {
              "label": "Google Maps - Ein Bokek Central Beach",
              "href": "https://www.google.com/maps/search/?api=1&query=Ein+Bokek+Central+Beach"
            }
          ],

        },

      ],
            "checklist": [
        "Pack a bag for wet swimwear and a change of clothes for your return to Jerusalem.",
        "Wear sturdy walking shoes to explore Masada or Ein Gedi.",
        "Have a payment card available for national-park admission and regulated parking."
      ],
      "faqs": [
        {
          "q": "How long does it take to reach the Dead Sea from Jerusalem?",
          "a": "Allow approximately 35–50 minutes by car to a northern beach, 60–80 minutes to Ein Gedi, 75–95 minutes to the Masada east entrance or 90–110 minutes to Ein Bokek. Public buses take longer."
        },
        {
          "q": "Is the public beach at Ein Bokek wheelchair-accessible?",
          "a": "Yes. Ein Bokek Central Beach has an accessible route into the water, and beach wheelchairs can be borrowed from the lifeguard station. If you need assistance or a particular facility, check with the council before your visit."
        },
        {
          "q": "Do buses run to the Dead Sea on Shabbat?",
          "a": "Regular bus services are reduced or suspended from Friday afternoon until Saturday evening. Check the timetable or arrange private transport for Shabbat."
        },
        {
          "q": "Should I stay at the Dead Sea overnight?",
          "a": "A day trip is usually enough for the beach or one major attraction. Stay overnight if you'd like more beach time, a spa visit or a relaxed sightseeing schedule."
        },
        {
          "q": "Can I combine Masada, Ein Gedi, Qumran and Qasr al-Yahud in one day?",
          "a": "For a relaxed day trip from Jerusalem, combine a beach visit with Masada or Ein Gedi if park access is available. Qumran and Qasr al-Yahud can fit a northern-shore itinerary."
        }
      ],
      "related": [
        "deadSea",
        "bestTime"
      ],
      "services": [
        {
          "label": "Masada & Dead Sea tours",
          "to": "/tours/masada-dead-sea/"
        },
        {
          "label": "Private driver service",
          "to": "/private-driver-in-israel/"
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
