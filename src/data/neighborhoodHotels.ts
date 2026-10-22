/** Verified supplementary neighborhood hotel recommendations, reviewed 2026-10-22.
 * Four cards per neighborhood: two established picks plus two additions.
 * Extra offers deliberately go to hotels' official sites until an approved
 * property-specific affiliate URL is provided; none is invented.
 * The city-wide curated catalogs retain their original smaller shortlists.
 */
import type { HotelRecommendation, SourceReference } from "@/data/registry";

const supplemental: (HotelRecommendation & { officialUrl: string })[] = [
  {
    "id": "jlm-ibis",
    "cityId": "jerusalem",
    "areaId": "downtown",
    "name": "ibis Jerusalem City Center",
    "style": "Central city hotel",
    "summary": "Contemporary rooms near Zion Square, Jaffa Road and the light rail.",
    "bestFor": "Central first visits",
    "watch": "Confirm the exact room size and pedestrian approach for luggage.",
    "sourceId": "hotel-jlm-ibis-official",
    "officialUrl": "https://jerusalemcenterhotels.com/ibis.html"
  },
  {
    "id": "jlm-ibis-styles",
    "cityId": "jerusalem",
    "areaId": "downtown",
    "name": "ibis Styles Jerusalem City Center",
    "style": "Central pedestrian-mall hotel",
    "summary": "Colourful rooms on Ben Yehuda's pedestrian mall, steps from downtown restaurants.",
    "bestFor": "Walkable city breaks",
    "watch": "Check the pedestrian-only access and nearest vehicle drop-off.",
    "sourceId": "hotel-jlm-ibis-styles-official",
    "officialUrl": "https://ibisjerusalemhotels.com/en/ibis-styles-jerusalem/ibis-styles-jerusalem-city-center/"
  },
  {
    "id": "jlm-david-citadel",
    "cityId": "jerusalem",
    "areaId": "mamilla",
    "name": "The David Citadel",
    "style": "Full-service luxury hotel",
    "summary": "Large luxury hotel on King David Street near Mamilla Avenue and Jaffa Gate.",
    "bestFor": "Families seeking luxury facilities",
    "watch": "Compare room views and check which family or wellness facilities are included.",
    "sourceId": "hotel-jlm-david-citadel-official",
    "officialUrl": "https://www.thedavidcitadel.com/the-hotel/"
  },
  {
    "id": "jlm-waldorf",
    "cityId": "jerusalem",
    "areaId": "mamilla",
    "name": "Waldorf Astoria Jerusalem",
    "style": "Historic-style luxury hotel",
    "summary": "Luxury hotel on Agron Street, combining a restored stone façade with an elegant interior.",
    "bestFor": "Grand hotel luxury",
    "watch": "Check room category, parking fees and the walking approach to Jaffa Gate.",
    "sourceId": "hotel-jlm-waldorf-official",
    "officialUrl": "https://www.hilton.com/en/hotels/jrswawa-waldorf-astoria-jerusalem/"
  },
  {
    "id": "jlm-austrian-hospice",
    "cityId": "jerusalem",
    "areaId": "old-city",
    "name": "Austrian Hospice",
    "style": "Pilgrim guesthouse",
    "summary": "Long-established pilgrim guesthouse on Via Dolorosa with private rooms and simpler accommodation.",
    "bestFor": "Pilgrimages and historic stays",
    "watch": "Enquire well ahead; check room facilities, stairs and access through the Old City.",
    "sourceId": "hotel-jlm-austrian-hospice-official",
    "officialUrl": "https://www.austrianhospice.com/en/"
  },
  {
    "id": "jlm-gloria",
    "cityId": "jerusalem",
    "areaId": "old-city",
    "name": "Gloria Hotel",
    "style": "Old City heritage hotel",
    "summary": "Family-run hotel inside Jaffa Gate in the Christian Quarter, close to major pilgrimage sites.",
    "bestFor": "Christian Quarter sightseeing",
    "watch": "Confirm the room building, stairs and luggage arrangements inside the walls.",
    "sourceId": "hotel-jlm-gloria-official",
    "officialUrl": "https://gloria-hotel.com/about-us/"
  },
  {
    "id": "jlm-agripas",
    "cityId": "jerusalem",
    "areaId": "mahane-yehuda",
    "name": "Agripas Hotel",
    "style": "Boutique city hotel",
    "summary": "Boutique-style rooms on Agripas Street within easy walking distance of Mahane Yehuda Market.",
    "bestFor": "Market and downtown exploring",
    "watch": "Ask about room orientation and potential market-side or traffic noise.",
    "sourceId": "hotel-jlm-agripas-official",
    "officialUrl": "https://agripas.com/en/agripas-hotel-en/"
  },
  {
    "id": "jlm-villa-albi",
    "cityId": "jerusalem",
    "areaId": "mahane-yehuda",
    "name": "Villa Albi Machne Yehuda",
    "style": "Boutique suites",
    "summary": "Small design-led accommodation on Nissim Bachar Street in the market-side Nachlaot area.",
    "bestFor": "Independent neighborhood stays",
    "watch": "Confirm self-check-in arrangements and the facilities of your exact suite.",
    "sourceId": "hotel-jlm-villa-albi-official",
    "officialUrl": "https://albihotels.com/"
  },
  {
    "id": "jlm-holy-land",
    "cityId": "jerusalem",
    "areaId": "east-jerusalem",
    "name": "Holy Land Hotel",
    "style": "Midrange hotel near Old City",
    "summary": "A renovated hotel just outside the Old City walls, well placed for nearby holy sites.",
    "bestFor": "Pilgrims and northern Old City",
    "watch": "Confirm the correct entrance, route on foot and the room's actual outlook.",
    "sourceId": "hotel-jlm-holy-land-official",
    "officialUrl": "https://www.holylandhotel.com/"
  },
  {
    "id": "jlm-st-george",
    "cityId": "jerusalem",
    "areaId": "east-jerusalem",
    "name": "St. George Hotel Jerusalem",
    "style": "Contemporary hotel",
    "summary": "Modern hotel north of the Old City with guest rooms and hospitality facilities.",
    "bestFor": "Contemporary East Jerusalem stays",
    "watch": "Confirm opening and seasonal use of facilities and the walking route to Damascus Gate.",
    "sourceId": "hotel-jlm-st-george-official",
    "officialUrl": "https://stgeorgehoteljerusalem.com/"
  },
  {
    "id": "jlm-templer-inn",
    "cityId": "jerusalem",
    "areaId": "german-colony",
    "name": "The Templer Inn",
    "style": "Historic boutique suites",
    "summary": "Restored Templer-era house near the First Station, offering a handful of independent suites.",
    "bestFor": "Heritage suites and couples",
    "watch": "Confirm minimum guest age, room access and kitchenette details.",
    "sourceId": "hotel-jlm-templer-inn-official",
    "officialUrl": "https://templerinn.com/templerinn-en/"
  },
  {
    "id": "jlm-little-house-baka",
    "cityId": "jerusalem",
    "areaId": "german-colony",
    "name": "Little House in Baka",
    "style": "Intimate historic-house hotel",
    "summary": "Smaller hotel in a restored historic Baka house near Bethlehem Road and neighborhood cafés.",
    "bestFor": "Quiet residential neighborhood stays",
    "watch": "Ask about stairs, exact room configuration and transport into central Jerusalem.",
    "sourceId": "hotel-jlm-little-house-baka-official",
    "officialUrl": "https://bakah.jerusalem-hotel.co.il/?language=eng"
  },
  {
    "id": "tlv-dan",
    "cityId": "telaviv",
    "areaId": "telaviv-beachfront",
    "name": "Dan Tel Aviv",
    "style": "Classic seafront luxury hotel",
    "summary": "Long-established luxury hotel on HaYarkon Street across from the Mediterranean promenade.",
    "bestFor": "Classic beachfront luxury",
    "watch": "Verify sea-view categories and current wellness or parking arrangements.",
    "sourceId": "hotel-tlv-dan-official",
    "officialUrl": "https://www.danhotels.com/telavivhotels"
  },
  {
    "id": "tlv-royal-beach",
    "cityId": "telaviv",
    "areaId": "telaviv-beachfront",
    "name": "Royal Beach Tel Aviv",
    "style": "Large beachfront luxury hotel",
    "summary": "Isrotel hotel near the southern part of the central promenade, with multiple room categories.",
    "bestFor": "Full-service beach holidays",
    "watch": "Confirm sea view, parking costs and facilities included in your rate.",
    "sourceId": "hotel-tlv-royal-beach-official",
    "officialUrl": "https://www.isrotel.com/isrotel-hotels/tel-aviv/royal-beach-tel-aviv/"
  },
  {
    "id": "tlv-center-chic",
    "cityId": "telaviv",
    "areaId": "telaviv-dizengoff",
    "name": "Center Chic Hotel",
    "style": "Design-led boutique hotel",
    "summary": "Atlas boutique hotel opposite Dizengoff Square in a historic city-centre setting.",
    "bestFor": "Dizengoff cafés and architecture",
    "watch": "Compare room size, noise and whether breakfast is provided in another building.",
    "sourceId": "hotel-tlv-center-chic-official",
    "officialUrl": "https://www.atlas.co.il/en/our-hotels/hotels-in-tel-aviv/"
  },
  {
    "id": "tlv-dizengoff-garden",
    "cityId": "telaviv",
    "areaId": "telaviv-dizengoff",
    "name": "Dizengoff Garden Hotel",
    "style": "Small urban boutique hotel",
    "summary": "Garden-themed hotel on Dizengoff Street, convenient for shops, cafés and nightlife.",
    "bestFor": "Independent central city breaks",
    "watch": "Check your room's distance from late-night street activity.",
    "sourceId": "hotel-tlv-dizengoff-garden-official",
    "officialUrl": "https://d-garden.co.il/"
  },
  {
    "id": "tlv-shalom",
    "cityId": "telaviv",
    "areaId": "telaviv-old-north",
    "name": "Shalom & Relax Hotel",
    "style": "Seafront boutique hotel",
    "summary": "Atlas boutique hotel beside Independence Park with sea-facing rooftop spaces.",
    "bestFor": "Boutique northern beach breaks",
    "watch": "Check if your booked room actually includes a sea view.",
    "sourceId": "hotel-tlv-shalom-official",
    "officialUrl": "https://www.atlas.co.il/en/our-hotels/hotels-in-tel-aviv/shalom-hotel-tel-aviv/"
  },
  {
    "id": "tlv-tal",
    "cityId": "telaviv",
    "areaId": "telaviv-old-north",
    "name": "Tal by the Beach",
    "style": "Contemporary port-side hotel",
    "summary": "Atlas hotel near Metzitzim Beach and Tel Aviv Port, with a rooftop terrace.",
    "bestFor": "Port access and beach walks",
    "watch": "Confirm parking, meals and the exact room orientation.",
    "sourceId": "hotel-tlv-tal-official",
    "officialUrl": "https://www.atlas.co.il/en/our-hotels/hotels-in-tel-aviv/tal-hotel-tel-aviv/"
  },
  {
    "id": "tlv-trieste",
    "cityId": "telaviv",
    "areaId": "telaviv-neve-tzedek",
    "name": "Trieste Neve Tzedek",
    "style": "Independent heritage suites",
    "summary": "Three distinctive suites in a restored building on Ahad HaAm Street near Neve Tzedek.",
    "bestFor": "Romantic heritage suites",
    "watch": "Check arrival arrangements and your chosen suite's stairs and outdoor space.",
    "sourceId": "hotel-tlv-trieste-official",
    "officialUrl": "https://www.triestetlv.com/"
  },
  {
    "id": "tlv-vera",
    "cityId": "telaviv",
    "areaId": "telaviv-neve-tzedek",
    "name": "The Vera Hotel",
    "style": "Locally styled boutique hotel",
    "summary": "Boutique rooms on Lilienblum Street, on the eastern approach to Neve Tzedek.",
    "bestFor": "Local design and boutique stays",
    "watch": "Compare smaller room categories and routes to Neve Tzedek's quieter lanes.",
    "sourceId": "hotel-tlv-vera-official",
    "officialUrl": "https://theverahotel.com/"
  },
  {
    "id": "tlv-setai",
    "cityId": "telaviv",
    "areaId": "telaviv-jaffa",
    "name": "The Setai Tel Aviv",
    "style": "Luxury heritage hotel",
    "summary": "Historic former Kishle complex beside Jaffa's Clock Tower, with contemporary upscale rooms.",
    "bestFor": "Luxury historic Jaffa stays",
    "watch": "Confirm room outlook, accessible routes and seasonal hotel facilities.",
    "sourceId": "hotel-tlv-setai-official",
    "officialUrl": "https://thesetaihotels.com/en/setai-tel-aviv/rooms-suites/"
  },
  {
    "id": "tlv-margosa",
    "cityId": "telaviv",
    "areaId": "telaviv-jaffa",
    "name": "Margosa Boutique Hotel",
    "style": "Jaffa neighborhood boutique hotel",
    "summary": "Boutique hotel on Even Shushan Street near the flea market and Old Jaffa lanes.",
    "bestFor": "Jaffa markets and cafés",
    "watch": "Ask about balcony type, nearby evening noise and parking availability.",
    "sourceId": "hotel-tlv-margosa-official",
    "officialUrl": "https://www.margosa-hotel.co.il/contact-us"
  },
  {
    "id": "tlv-de-mar",
    "cityId": "telaviv",
    "areaId": "telaviv-florentin",
    "name": "De Mar Florentine Hotel",
    "style": "Self-check-in boutique hotel",
    "summary": "Small hotel on Zevulun Street near Levinsky Market, with a digital check-in approach.",
    "bestFor": "Independent Levinsky Market stays",
    "watch": "Confirm check-in codes, balcony type and on-site support hours.",
    "sourceId": "hotel-tlv-de-mar-official",
    "officialUrl": "https://www.peraia-tlv.com/"
  },
  {
    "id": "tlv-mulan",
    "cityId": "telaviv",
    "areaId": "telaviv-florentin",
    "name": "Mulan Hotel TLV",
    "style": "Contemporary small hotel",
    "summary": "Modern rooms and suites near Levinsky Market at Florentin's eastern side.",
    "bestFor": "Florentin food and longer stays",
    "watch": "Check exact arrival instructions and whether breakfast is off-site.",
    "sourceId": "hotel-tlv-mulan-official",
    "officialUrl": "https://mulanhotel.co.il/en/rooms-suites/"
  },
  {
    "id": "tlv-shell-house",
    "cityId": "telaviv",
    "areaId": "telaviv-kerem",
    "name": "Shell House",
    "style": "Small heritage boutique stay",
    "summary": "Five design-focused rooms inside a restored heritage building on Haim Havshush Street.",
    "bestFor": "Characterful Kerem boutique stays",
    "watch": "Confirm the specific room, arrival details and noise from nearby market lanes.",
    "sourceId": "hotel-tlv-shell-house-official",
    "officialUrl": "https://shellhousetlv.com/en/"
  },
  {
    "id": "tlv-fabric",
    "cityId": "telaviv",
    "areaId": "telaviv-kerem",
    "name": "Fabric Hotel",
    "style": "Creative boutique hotel near market",
    "summary": "Atlas hotel in a former garment-industry building on Nachalat Binyamin, near Carmel Market.",
    "bestFor": "Design and market restaurants",
    "watch": "Consider street and rooftop activity when choosing a room.",
    "sourceId": "hotel-tlv-fabric-official",
    "officialUrl": "https://www.atlas.co.il/en/our-hotels/hotels-in-tel-aviv/fabric-hotel-tel-aviv/"
  },
  {
    "id": "tlv-rothschild22",
    "cityId": "telaviv",
    "areaId": "telaviv-rothschild",
    "name": "Hotel Rothschild 22",
    "style": "Contemporary boulevard hotel",
    "summary": "Business-friendly hotel at Rothschild Boulevard 22 near the lower boulevard's restaurants.",
    "bestFor": "Rothschild business and leisure",
    "watch": "Check room views and availability of business or parking facilities.",
    "sourceId": "hotel-tlv-rothschild22-official",
    "officialUrl": "https://www.leonardo-hotels.com/tel-aviv/hotel-rothschild-22-tel-aviv"
  },
  {
    "id": "tlv-rothschild96",
    "cityId": "telaviv",
    "areaId": "telaviv-rothschild",
    "name": "The Rothschild Hotel",
    "style": "Romantic boutique hotel",
    "summary": "Boutique hotel at 96 Rothschild Boulevard with individual design details.",
    "bestFor": "Couples and boulevard walks",
    "watch": "Compare room sizes, breakfast conditions and nearby traffic or nightlife.",
    "sourceId": "hotel-tlv-rothschild96-official",
    "officialUrl": "https://www.the-rothschild-hotel.com/en/about/"
  }
];

export const neighborhoodHotelAdditions: HotelRecommendation[] = supplemental.map(({ officialUrl: _url, ...hotel }) => hotel);

export const neighborhoodHotelSources: SourceReference[] = supplemental.map((hotel) => ({
  id: hotel.sourceId,
  title: `${hotel.name} — official hotel information`,
  publisher: hotel.name,
  url: hotel.officialUrl,
  checkedAt: "2026-10-22",
  note: "Property identity, neighborhood and described accommodation reviewed against a hotel/operator website. Link goes directly to the official operator; room inventory, total price and opening status on travel dates are not guaranteed.",
}));
