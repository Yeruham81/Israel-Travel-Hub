/**
 * Specific editorial decision aids. These are planning comparisons, not claims
 * that the publisher stayed at, inspected or tested a named property.
 * No live hotel availability, public-transport schedules or room prices.
 */
export type AreaDecision = {
  heading: string;
  choose: string;
  compare: string;
  arrival: string;
};
export const areaDecisionNotes: Record<string, AreaDecision> = {
  downtown: {
    heading: "Jaffa Road convenience or a quieter base?",
    choose: "A room near Zion Square suits visitors who want cafés, the light rail and central walking routes without hiring a car every day.",
    compare: "Mamilla is a stronger comparison when Jaffa Gate is your main destination; the German Colony is worth considering when a residential evening matters more than the central shopping streets.",
    arrival: "Jaffa Road has pedestrian stretches. When arriving with bags, use the hotel's advised vehicle-accessible street, not simply a map pin in the pedestrian mall.",
  },
  mamilla: {
    heading: "Beside Mamilla Avenue or farther down King David Street?",
    choose: "The northern Mamilla end puts the approach to Jaffa Gate close to the hotel. King David Street offers landmark properties, but those farther south add walking to the gate.",
    compare: "Downtown has a broader mix of dining streets and hotel formats. A guesthouse inside the Old City trades easier vehicle access for a stay within the walls.",
    arrival: "A room described as having an Old City view is different from merely booking a hotel near the walls; use the selected room category and the street-side reception entrance.",
  },
  "old-city": {
    heading: "Choose the gate before the hotel transfer",
    choose: "For Christian and Armenian Quarter stays, Jaffa Gate may be a useful reference; Damascus Gate serves northern approaches, while other quarters can require a different gate.",
    compare: "Mamilla or the hotel district north of Damascus Gate may work better if steps, a stroller or door-to-door unloading matter more than sleeping inside the walls.",
    arrival: "Ask your accommodation to specify the gate, permitted drop-off, remaining walk and any luggage help. The nearest gate on a map is not always the best practical access point.",
  },
  "mahane-yehuda": {
    heading: "Market frontage or a Nachlaot side lane?",
    choose: "An Agripas Street or market-facing stay keeps stalls and evening venues close, but the room may hear deliveries as well as nightlife.",
    compare: "An inner Nachlaot lane usually feels more residential. Downtown offers more conventional city-hotel options and easier access to central transport corridors.",
    arrival: "Friday market activity and Shabbat alter the area considerably. For an apartment, check the actual entrance and key collection rather than relying on the neighborhood name.",
  },
  "east-jerusalem": {
    heading: "Near Damascus Gate is a specific location",
    choose: "Nablus Road and the streets by the Garden Tomb offer access to northern Old City entrances and local Palestinian restaurants.",
    compare: "An advertisement saying only 'East Jerusalem' may refer to a much wider area, including addresses not practical for walking to Damascus Gate.",
    arrival: "Use the complete hotel street address when planning a transfer, and confirm the appropriate gate and access arrangements with the accommodation.",
  },
  "german-colony": {
    heading: "Emek Refaim or deeper into Baka?",
    choose: "The German Colony around Emek Refaim suits guests who want cafés and restaurant choices within walking distance of their accommodation.",
    compare: "A property farther south in Baka can feel more residential but usually requires more travel to the Old City and central museums.",
    arrival: "A hotel on the northern edge and an apartment in southern Baka are not interchangeable taxi destinations. Confirm the entrance and the transport needed for your daily sightseeing.",
  },
  "telaviv-beachfront": {
    heading: "A beachfront address does not describe the room",
    choose: "HaYarkon Street and the central beach corridor work well for morning swims and walks along the promenade.",
    compare: "Smaller properties one or two streets inland can provide a different street atmosphere and room format, without a guaranteed sea outlook.",
    arrival: "Check whether the hotel's door is on HaYarkon Street or a side street. The public beach, road crossings and the exact view category matter more than a generic 'beachfront' filter.",
  },
  "telaviv-dizengoff": {
    heading: "Dizengoff Square is not the whole of Dizengoff Street",
    choose: "The square and its nearby blocks make a convenient walking base for cafés, city architecture and routes toward the central beach.",
    compare: "A hotel much farther north on Dizengoff serves a different set of neighborhoods; a central beachfront stay is better for visitors who want the sand immediately nearby.",
    arrival: "Match the actual house number to the square, not the street name alone. The airport railway stations are inland, so the final connection still needs planning.",
  },
  "telaviv-old-north": {
    heading: "Residential Old North or the lively port?",
    choose: "Side streets in the Old North suit longer stays and access to northern beaches and the Yarkon corridor.",
    compare: "Accommodation beside the port can be lively into the evening. Southern-city sights around Carmel Market and Jaffa take a longer onward journey from the northern waterfront.",
    arrival: "The port complex is not one hotel entrance. Give the actual street and building number for drop-off, particularly when traveling with children or bulky luggage.",
  },
  "telaviv-neve-tzedek": {
    heading: "Historic lanes versus the district's edges",
    choose: "The Shabazi Street and Suzanne Dellal area places the restored low-rise streets at the center of the stay.",
    compare: "Properties along Lilienblum, Herzl or surrounding thoroughfares can be convenient for Rothschild Boulevard while feeling less like the quiet historic core.",
    arrival: "Narrow streets, converted buildings and limited vehicle access make the hotel's specific unloading point and lift arrangements important.",
  },
  "telaviv-jaffa": {
    heading: "Sleep on Old Jaffa's hill or beside the flea market?",
    choose: "The historic hill offers stone lanes and a different setting near the old port; it can require slopes and steps with luggage.",
    compare: "Near the Clock Tower and flea market, cafés and evening restaurants are closer to many accommodation entrances, but noise can last later.",
    arrival: "Ask whether a taxi can stop at the actual entrance or whether you must walk uphill through pedestrian lanes. A sea view is room-specific, not a feature of every Jaffa address.",
  },
  "telaviv-florentin": {
    heading: "The same neighborhood has very different nights",
    choose: "Florentin suits independent visitors who want local cafés, Levinsky Market and nightlife more than resort-style hotel facilities.",
    compare: "Visitors needing quiet or full-service reception may prefer parts of Rothschild or Neve Tzedek, even though those districts are nearby.",
    arrival: "For digitally managed rooms, save the entry code and a support contact before travel. A room facing a bar or workshop may feel different from one at the rear.",
  },
  "telaviv-kerem": {
    heading: "Inside the Yemenite Quarter or on the market edge?",
    choose: "The smaller residential streets of Kerem HaTeimanim put the beach and Carmel Market within the same broader walking district.",
    compare: "Listings on Allenby or Nachalat Binyamin may be more exposed to main-road traffic, market deliveries and evening venues than inner-quarter properties.",
    arrival: "Find the actual entrance on a street map: a short distance from the market can still involve pedestrian sections and an extra walk with luggage.",
  },
  "telaviv-rothschild": {
    heading: "Which end of Rothschild fits your itinerary?",
    choose: "The boulevard's southern end suits walks toward Neve Tzedek, Florentin and the Levinsky area; its northern end is closer to Habima and central cultural venues.",
    compare: "For repeated swimming trips, a central beachfront hotel is simpler; Rothschild is an inland urban base with restaurants and architectural streets.",
    arrival: "Check the street number and whether the hotel is on the boulevard or an adjoining lane. Room noise and vehicle access vary by block.",
  },
};

export type BaseChoice = { visitor: string; base: string; reason: string };
export const destinationBaseChoices: Record<string, BaseChoice[]> = {
  deadsea: [
    { visitor: "Want to walk between a resort and nearby services", base: "Ein Bokek", reason: "The central resort strip has managed beach areas and more hotel-to-promenade choices, although the beach route still varies by property." },
    { visitor: "Planning to spend most of the stay inside a resort", base: "Southern hotel district / Neve Zohar", reason: "The resort-led setting makes meal plans and on-site facilities particularly important; outside dining is less convenient." },
    { visitor: "Prioritizing nature and inland scenery", base: "Ein Gedi", reason: "This is not a substitute for a beachfront Ein Bokek booking. Plan separate transport if a managed bathing beach is a main goal." },
  ],
  tiberias: [
    { visitor: "Arriving without a car and visiting the town", base: "Lower town / promenade", reason: "Restaurants and some waterfront walks are closer together, though lakeside location does not guarantee a private swimming beach." },
    { visitor: "Wanting a view and less time in central streets", base: "Hillside hotels", reason: "Expect a climb on the return from the waterfront and allow for a taxi when traveling with luggage or mobility limitations." },
    { visitor: "Building the trip around water activities", base: "A lakeside hotel with verified swimming facilities", reason: "Check the exact beach, pool or water-park access rather than assuming that every room overlooking the lake includes swimming." },
  ],
  haifa: [
    { visitor: "Exploring downtown restaurants and history", base: "German Colony / Lower City", reason: "A lower-city base works for the historic boulevard, Akko outings and some rail connections, without the daily climb to a Carmel hotel." },
    { visitor: "Wanting a hilltop city base", base: "Carmel Center", reason: "The elevated setting offers city viewpoints, but a trip to the beach or port usually needs another journey." },
    { visitor: "Planning a family beach break", base: "Southern beachfront", reason: "A hotel near the promenade differs from a Carmel pool hotel. Include the transport needed for galleries, downtown restaurants and Galilee outings." },
  ],
};

export const categoryDecisionExamples: Record<string, { heading: string; situation: string; decision: string }> = {
  "deadsea:spa": {
    heading: "Example: two guests with different spa priorities",
    situation: "One guest wants mineral-water facilities and treatments; the other mainly wants a comfortable hotel and beach time.",
    decision: "Compare the room-plus-spa entitlement separately for each guest. A hotel's spa branding does not mean treatments are included, and a mineral pool inside the building is different from supervised beach access.",
  },
  "deadsea:family": {
    heading: "Example: a toddler and an older child",
    situation: "Slides and organized activities for one child may not be appropriate for the other, even at an all-inclusive resort.",
    decision: "First match room occupancy and age restrictions, then check the dated pool, club and meal program. A resort with fewer activities may suit the family better when most days are spent outside the hotel.",
  },
  "tiberias:family": {
    heading: "Example: a family dividing time between the hotel and Galilee trips",
    situation: "A water-park stay and a central promenade stay are very different when mornings are spent visiting sites around the lake.",
    decision: "Decide how many full days will be spent at the hotel's own facilities before paying for an activity-heavy format. At Leonardo Club, check the current written meal plan rather than relying solely on the all-inclusive name.",
  },
  "tiberias:luxury": {
    heading: "Example: a multigenerational celebration",
    situation: "A premium lakeside hotel may set a minimum guest age, while another accepts children but limits spa access.",
    decision: "Check every guest's eligibility before selecting the hotel, then compare whether you need a swimming beach, heritage atmosphere or a contemporary room; a lake-view booking does not settle those questions.",
  },
  "haifa:boutique": {
    heading: "Example: a couple choosing between two heritage stays",
    situation: "A preserved facade can hide different room layouts and access arrangements between older and newer wings.",
    decision: "Compare the exact room within the building and available lift access, not only the hotel's style. Adults-only or minimum-age policies should be checked before a family reservation.",
  },
  "haifa:family": {
    heading: "Example: a family spending half the trip at the beach",
    situation: "A Carmel hotel with an indoor pool can be a good city base but still requires travel to and from the actual shore.",
    decision: "Compare total travel effort as well as pool facilities: a seafront hotel may be easier for beach days, while Carmel works better when the family plans viewpoints and city outings.",
  },
};
