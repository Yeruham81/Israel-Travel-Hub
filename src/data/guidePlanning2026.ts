import type { TravelGuide } from "@/data/travelGuides";
import { bestTimeGuide } from "@/data/bestTimeIsrael";
import { migrationPhotos as P } from "@/data/guideMigrationPhotos";

export const planningGuides = {
  bestTime: bestTimeGuide,
  "food": {
    "id": "food",
    "updatedAt": "2026-11-21",
    "title": "What to Eat in Israel: 10 Foods & a First-Timer’s Guide",
    "description": "Discover what to eat in Israel: 10 popular dishes with photos, how to order them, where to taste food in Jerusalem and Tel Aviv, market tips and food tours.",
    "intro": "From a fresh falafel pita to a slow-cooked breakfast and a warm dessert, eating here can be part of the journey. I’ll introduce ten popular dishes, explain what to order and share practical market tips for visitors who are new to the food.",
    "answer": "For an easy first taste, choose falafel or sabich in pita, try hummus as a meal, and add shakshuka or bourekas for breakfast. Save space for malabi or warm kanafeh. If you enjoy food markets, try Mahane Yehuda in Jerusalem or Carmel and Levinsky in Tel Aviv.",
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
            "to": "/attractions/jaffa/"
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
      "guide-mahane-yehuda",
      "m26-tlv-city",
      "guide-tlv-food-money",
      "guide-jerusalem-food-markets"
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
