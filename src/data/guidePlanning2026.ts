import type { TravelGuide } from "@/data/travelGuides";
import { migrationPhotos as P } from "@/data/guideMigrationPhotos";

export const planningGuides = {
  "bestTime": {
    "id": "bestTime",
    "updatedAt": "2026-10-20",
    "title": "Best time to visit Israel: seasons, regions and holidays",
    "description": "Choose when to visit Israel by weather, region, beach time, walking plans and holidays. Compare spring, summer, autumn and winter without one-size-fits-all advice.",
    "intro": "A good travel month depends on the trip you want. Jerusalem hills, the Mediterranean coast, the Dead Sea and Eilat can feel very different on the same day. Match your dates to the places and activities that matter most, then check the holiday calendar before arranging hotels and transport.",
    "answer": "Spring and autumn are useful starting points for a mixed sightseeing trip. Summer suits beach-focused plans but brings substantial heat; winter can suit city museums and southern resorts, with rain and shorter daylight to plan around. No season guarantees mild weather, uncrowded attractions or lower hotel prices.",
    "topics": [
      "tips",
      "itineraries"
    ],
    "photo": P["best-time-to-visit-israel"],
    "facts": [
      {
        "label": "Mixed sightseeing",
        "text": "Compare spring and autumn first"
      },
      {
        "label": "Regional variation",
        "text": "Coast, hills and desert need different plans"
      },
      {
        "label": "Before booking",
        "text": "Check holidays, forecast and daylight"
      }
    ],
    "comparison": {
      "caption": "Choose a season for your priorities",
      "headers": [
        "Season",
        "Good reasons to consider it",
        "Plan around"
      ],
      "rows": [
        [
          "Spring · March–May",
          "Walking, flowers and a varied city-and-nature trip",
          "Changing weather, Passover and Easter visits"
        ],
        [
          "Summer · June–August",
          "Mediterranean beaches and long evenings",
          "Heat, humidity and school-holiday demand"
        ],
        [
          "Autumn · September–November",
          "A mix of city visits and warmer coastal days",
          "Early-autumn heat, holiday closures and returning rain"
        ],
        [
          "Winter · December–February",
          "Museums, food, cities and a southern escape",
          "Rain, cool hilltop evenings and limited daylight"
        ]
      ]
    },
    "sections": [
      {
        "id": "regions",
        "title": "Read the map before choosing the month",
        "paragraphs": [
          "The coast has a Mediterranean climate, while the southern and eastern desert areas are much drier. Jerusalem sits higher than the coast, so evenings and winter days can feel noticeably cooler. Do not pack for the entire country using only a Tel Aviv forecast.",
          "Eilat and the Dead Sea are useful alternatives when you want a southern component, but warm daytime conditions are not a promise of comfortable midday walking. Check the forecast for each overnight base and for exposed outings such as Masada or the Ramon Crater."
        ],
        "links": [
          {
            "label": "Plan Eilat and the Red Sea",
            "to": "/travel-blog/eilat/"
          },
          {
            "label": "Choose a Dead Sea visit",
            "to": "/travel-blog/the-dead-sea/"
          }
        ]
      },
      {
        "id": "spring",
        "title": "Spring: combine cities with green landscapes",
        "paragraphs": [
          "Spring can make a mixed itinerary particularly rewarding: Old City walks, outdoor archaeology and northern scenery can fit into the same trip. Conditions change through the season, with cooler spells early on and hot days possible later. Carry layers rather than expecting every day to feel like a mild spring afternoon.",
          "Passover and the different Easter calendars can affect visits, accommodation and services. Choose your essential churches, museums and parks first; check their own holiday arrangements and leave room for worship, queues or an alternative visit."
        ],
        "links": [
          {
            "label": "Check Israel holiday dates",
            "to": "/travel-blog/israel-holidays/"
          },
          {
            "label": "Explore Jerusalem",
            "to": "/travel-blog/jerusalem-travel-guide/"
          }
        ]
      },
      {
        "id": "summer",
        "title": "Summer: build the day around the heat",
        "paragraphs": [
          "For a coastal stay, put a beach visit or walk early in the day and use the warm evenings for a meal or promenade. The Mediterranean coast can be humid, while exposed inland and desert stops require a different pace. Shade and an indoor break should be part of the itinerary.",
          "A summer holiday does not require hiking every major landscape. Use a museum day, a managed beach or a shorter archaeological visit when that fits the weather better. Reserve water activities with the operator and use only designated bathing areas under current supervision."
        ],
        "links": [
          {
            "label": "Choose a Tel Aviv beach",
            "to": "/travel-blog/beaches-in-tel-aviv/"
          },
          {
            "label": "Plan an indoor museum day",
            "to": "/travel-blog/museums-in-tel-aviv/"
          }
        ]
      },
      {
        "id": "autumn-winter",
        "title": "Autumn and winter: plan flexible days",
        "paragraphs": [
          "Early autumn can still be hot. Later autumn brings a gradual change toward the rainy season, so it helps to pair an outdoor priority with an indoor alternative. The autumn Jewish holidays shift against the Gregorian calendar and can affect a trip differently from one year to the next.",
          "In winter, enjoy city food, museums and neighbourhood walks between wet spells. Bring rain protection and warmer layers for Jerusalem and northern hills. Desert rain can affect roads and trails away from where you are standing; use the parks authority and weather service for the actual outing. Snow in Jerusalem is an occasional event, not something to build a holiday around."
        ]
      },
      {
        "id": "booking",
        "title": "Choose dates around the whole journey",
        "paragraphs": [
          "Compare the complete cost and convenience of the dates you are considering: flights, hotel nights, transfers, site reservations and any fixed ceremony or event. A month described as quieter is not a guarantee that your particular hotel or attraction will be inexpensive.",
          "Before committing, check the arrival weekday, Shabbat arrangements, the number of hotel changes and the return from any long day trip. Save the forecast and official venue links, then review them again shortly before travel."
        ],
        "links": [
          {
            "label": "Read the practical travel checklist",
            "to": "/travel-blog/israel-travel-tips/"
          },
          {
            "label": "Compare transport options",
            "to": "/travel-blog/getting-around-israel/"
          }
        ]
      }
    ],
    "checklist": [
      "Choose the main regions before the month",
      "Check the holiday dates for your travel year",
      "Pack separate layers for coast, hills and desert",
      "Leave an indoor alternative for outdoor days",
      "Check the local forecast and park notices",
      "Compare the full trip cost and arrival weekday"
    ],
    "faqs": [
      {
        "q": "What is the best month for a first visit?",
        "a": "Start by comparing spring and autumn for a varied sightseeing trip, then choose around your regions, holidays and actual forecast. There is no single best month for every itinerary."
      },
      {
        "q": "Is winter unsuitable for Israel?",
        "a": "No. A flexible city and southern itinerary can work well, but rain, cooler hilltop conditions and shorter days need planning."
      },
      {
        "q": "Can I visit the Dead Sea in summer?",
        "a": "Plan a managed beach and a heat-aware day. Avoid assuming that a short map distance makes several outdoor stops comfortable in hot conditions."
      }
    ],
    "related": [
      "calendar",
      "food",
      "topTen",
      "travelTips"
    ],
    "services": [
      {
        "label": "Museums for a Haifa city day",
        "to": "/travel-blog/museums-in-haifa/"
      },
      {
        "label": "Choose your accommodation",
        "to": "/accommodation/"
      }
    ],
    "sourceIds": [
      "m26-original-best-time-to-visit-israel",
      "m26-ims",
      "m26-hebcal",
      "guide-jerusalem-tourism"
    ]
  },
  "food": {
    "id": "food",
    "updatedAt": "2026-10-20",
    "title": "What to eat in Israel: 10 dishes, markets and practical tips",
    "description": "Try shawarma, falafel, hummus, shakshuka, sabich, bourekas, jachnun, malabi and kanafeh. Plan food markets, dietary questions and a varied tasting day.",
    "intro": "Food is one of the pleasures of travelling here: bakeries opening in the morning, hummus lunches, market snacks and a dessert shared after dinner. The dishes below reflect the country’s varied communities and wider Middle Eastern and Mediterranean food traditions. Use the list to explore, rather than treating a dish as belonging to just one place or one fixed recipe.",
    "answer": "Start with a few savoury dishes, a bakery stop and one dessert. Jerusalem’s Mahane Yehuda and Tel Aviv’s Carmel Market are useful areas to explore, but individual businesses keep their own hours. Ask about ingredients and portion prices, and arrange an alternative meal if you arrive after market stalls close.",
    "topics": [
      "tips",
      "destinations"
    ],
    "photo": P["what-to-eat-in-israel"],
    "facts": [
      {
        "label": "Savoury choices",
        "text": "Falafel, hummus, shawarma and sabich"
      },
      {
        "label": "Bakery and dessert",
        "text": "Bourekas, jachnun, malabi and kanafeh"
      },
      {
        "label": "Ask first",
        "text": "Ingredients, allergens and what the price includes"
      }
    ],
    "comparison": {
      "caption": "Build a varied food day",
      "headers": [
        "Stop",
        "Ideas",
        "Useful question"
      ],
      "rows": [
        [
          "Breakfast or brunch",
          "Shakshuka, bakery pastries or jachnun",
          "What is included with the main dish?"
        ],
        [
          "Market lunch",
          "Falafel, hummus, sabich or shawarma",
          "Which fillings, toppings and sauces are used?"
        ],
        [
          "Jerusalem evening",
          "Mixed grill or a market-area restaurant",
          "Does this venue open on my chosen evening?"
        ],
        [
          "Something sweet",
          "Malabi or kanafeh",
          "Does this version contain dairy, nuts or other allergens?"
        ]
      ]
    },
    "sections": [
      {
        "id": "shawarma",
        "title": "Shawarma",
        "paragraphs": [
          "Thin slices of spit-roasted meat are served in pita or laffa, or on a plate with salads and sides. Ask which meat is being served and whether the quoted meal includes extras, drinks or an enlarged portion. Different shops season and assemble it differently."
        ],
        "photo": P["food-1"]
      },
      {
        "id": "falafel",
        "title": "Falafel",
        "paragraphs": [
          "Falafel is usually made from chickpeas locally and often served in pita with chopped salad, tahini and pickles. The balls alone do not establish that the complete sandwich is vegan or suitable for an allergy: ask about sauces, bread and shared preparation."
        ],
        "photo": P["food-2"]
      },
      {
        "id": "mixed-grill",
        "title": "Jerusalem mixed grill · meorav Yerushalmi",
        "paragraphs": [
          "This seasoned griddle dish combines cuts of meat and often offal, commonly served with onions in bread or on a plate. Ask about the actual mix if you avoid particular cuts. It is a useful Jerusalem food stop rather than a dish with one universal recipe."
        ],
        "photo": P["food-3"]
      },
      {
        "id": "hummus",
        "title": "Hummus",
        "paragraphs": [
          "A bowl of chickpea purée can be a meal with warm chickpeas, olive oil, tahini, bread and optional toppings. Hummus is shared across regional cuisines, and local styles vary. Choose toppings and portion size before ordering; sesame is an important ingredient to ask about."
        ],
        "photo": P["food-4"]
      },
      {
        "id": "shakshuka",
        "title": "Shakshuka",
        "paragraphs": [
          "Eggs cooked in a spiced tomato-based sauce appear on many breakfast and brunch menus. Heat level, vegetables and optional cheese vary. Bread is often used to scoop the sauce, but confirm what is included rather than assuming every café serves the same breakfast."
        ],
        "photo": P["food-5"]
      },
      {
        "id": "sabich",
        "title": "Sabich",
        "paragraphs": [
          "This pita-based meal is associated with Iraqi Jewish food traditions and commonly combines fried aubergine, hard-boiled egg, potato, salad, tahini and amba. Ask for the combination you want. Removing the egg changes the sandwich, but does not by itself settle every dietary requirement."
        ],
        "photo": P["food-6"]
      },
      {
        "id": "bourekas",
        "title": "Bourekas",
        "paragraphs": [
          "Flaky pastries come with fillings such as cheese, potato or spinach. Their shape is not a reliable guide to the filling in every bakery. Ask whether a pastry contains dairy and whether it is sold individually, by weight or as a larger portion with accompaniments."
        ],
        "photo": P["food-7"]
      },
      {
        "id": "jachnun",
        "title": "Jachnun",
        "paragraphs": [
          "A slow-cooked Yemenite Jewish pastry is commonly paired with grated tomato, a cooked egg and spicy zhug. It is especially associated with a leisurely weekend meal, though availability depends on the business. It is rich and filling; sharing can leave room for other tastes."
        ],
        "photo": P["food-8"]
      },
      {
        "id": "malabi",
        "title": "Malabi",
        "paragraphs": [
          "This chilled pudding is often topped with floral syrup, coconut or nuts. Both dairy and nondairy versions exist, so ask how that particular serving is prepared. Toppings and preparation matter if you have dietary restrictions; a familiar dessert name is not a complete ingredient list."
        ],
        "photo": P["food-9"]
      },
      {
        "id": "kanafeh",
        "title": "Kanafeh · knafeh",
        "paragraphs": [
          "A warm dessert combining fine pastry and syrup, often with cheese and pistachios, is part of the wider Levantine food tradition. Versions and serving sizes vary. Watch it being prepared, ask about the filling and toppings, and consider sharing a freshly made portion."
        ],
        "photo": P["food-10"]
      },
      {
        "id": "markets",
        "title": "Where to explore: markets and neighbourhoods",
        "paragraphs": [
          "Mahane Yehuda is a useful Jerusalem area for shopping and tasting, with food businesses and evening venues around the market. Carmel Market and the surrounding Kerem HaTeimanim streets offer a different Tel Aviv setting. A guided tasting can add context; ask how much food, walking and drink is actually included.",
          "Plan a food outing with the rest of the neighbourhood rather than making repeated cross-city journeys. Do not assume a market, all its stalls and nearby restaurants follow the same opening pattern. On Fridays, holidays and late arrivals, identify a specific place for your next meal."
        ],
        "links": [
          {
            "label": "Explore Mahane Yehuda and Jerusalem markets",
            "to": "/travel-blog/shopping-in-jerusalem/"
          },
          {
            "label": "Combine food with Tel Aviv sights",
            "to": "/travel-blog/attractions-in-tel-aviv/"
          },
          {
            "label": "Explore Jaffa",
            "to": "/travel-blog/jaffa/"
          }
        ]
      },
      {
        "id": "ordering",
        "title": "Dietary needs and ordering without surprises",
        "paragraphs": [
          "Tell the person taking the order exactly what you avoid, including the sauces, garnish and preparation. Sesame, wheat, egg, dairy and nuts occur across many dishes on this list. Vegetarian, vegan, halal and kosher labels answer different questions; confirm your own requirement with the establishment.",
          "Check whether a price is per item, portion or weight and what the accompanying sides cost. Keep a usable payment alternative for small vendors, and ask permission before photographing people at work. A few well-chosen tastes usually make a better day than rushing through all ten dishes."
        ]
      }
    ],
    "checklist": [
      "Choose a neighbourhood and a few dishes",
      "Ask about fillings, sauces and allergens",
      "Confirm portion size and included extras",
      "Check the business’s own holiday and weekend hours",
      "Keep room for a bakery stop or shared dessert"
    ],
    "faqs": [
      {
        "q": "Is vegetarian food easy to find?",
        "a": "The list includes several commonly vegetarian dishes, but ingredients and shared preparation vary. Ask the business about the particular serving."
      },
      {
        "q": "Do all restaurants close on Shabbat?",
        "a": "No. Opening patterns vary by venue and neighbourhood. Check the actual restaurant or market stall you want to visit."
      },
      {
        "q": "Are these dishes unique to Israel?",
        "a": "Many are shared across Levantine, Middle Eastern and Mediterranean cuisines or reflect particular immigrant communities. Local versions are part of that wider food landscape."
      }
    ],
    "related": [
      "calendar",
      "bestTime",
      "telAvivMuseums",
      "jerusalemShopping"
    ],
    "services": [
      {
        "label": "Pair a meal with a Tel Aviv beach walk",
        "to": "/travel-blog/beaches-in-tel-aviv/"
      },
      {
        "label": "Choose a hotel neighbourhood",
        "to": "/accommodation/"
      }
    ],
    "sourceIds": [
      "m26-original-what-to-eat-in-israel",
      "guide-mahane-yehuda",
      "m26-tlv-city"
    ]
  },
  "calendar": {
    "id": "calendar",
    "updatedAt": "2026-10-23",
    "title": "Israel Events Calendar: Festivals & Things to Do",
    "description": "Find Israel's festivals, concerts, films and cultural events. Browse confirmed dates, filter by city and discover annual festivals.",
    "intro": "Find upcoming events in Israel and explore recurring festivals with official organiser links.",
    "answer": "Use the interactive event calendar to narrow confirmed listings by date, region and type. Annual festivals are shown separately until their next dates are announced.",
    "topics": ["tips", "attractions", "itineraries"],
    "photo": P["calendar-of-events"],
    "facts": [
      {"label": "Dates", "text": "Specific dates appear only when checked against a named source"},
      {"label": "Festival editions", "text": "Recurring events do not imply confirmed future dates"},
      {"label": "Tickets", "text": "Follow the organiser for current ticket and entry information"}
    ],
    "comparison": {"caption": "Use the events calendar", "headers": ["Section", "Best use"], "rows": [
      ["Confirmed events", "Find activities with published dates"],
      ["Annual festivals", "Discover recurring cultural events and check upcoming editions"]
    ]},
    "sections": [
      {"id": "event-discovery", "title": "Find events during your visit", "paragraphs": [
        "Select your travel dates and filter by region and type. These listings are checked examples, not a complete national events database.",
        "For each event, check the exact performance time, venue, language and booking conditions with the organiser."
      ]}
    ],
    "checklist": ["Check the exact performance date and venue", "Check the language and registration requirements", "Plan transport after the event"],
    "faqs": [
      {"q": "Are these all events taking place in Israel?", "a": "No. The calendar lists checked events and links to municipal event programmes for additional listings."},
      {"q": "Can I book every event here?", "a": "Only events with verified ticket links will show ticket options. The official organiser's page remains available."}
    ],
    "related": ["bestTime", "travelTips"],
    "services": [{"label": "Israel Holidays Calendar", "to": "/travel-blog/israel-holidays/"}],
    "sourceIds": ["m26-tlv-events", "guide-jerusalem-tourism", "m26-haifa-museums"]
  }
} satisfies Record<string, TravelGuide>;
