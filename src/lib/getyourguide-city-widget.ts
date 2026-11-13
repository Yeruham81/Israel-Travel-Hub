/**
 * Travelpayouts GetYourGuide "Things to Do in a City" widget.
 * Owner-provided embed:
 * https://tpwgt.com/content?trs=406243&shmarker=622032.3_day&iata=TLV&locale=en-US&powered_by=false&campaign_id=108&promo_id=4040
 *
 * Keep the provided project/partner/campaign IDs fixed. The only city
 * substitution requested for these embeds is the IATA-style location code.
 * Jerusalem uses historical IATA identifier JRS rather than JLM. This fixes
 * the known nonresponsive JLM widget; actual widget inventory remains external.
 * This is an external widget script, not an individual bookable tour offer.
 */
export const getYourGuideWidgetCities = {
  jerusalem: { code: "JRS", name: "Jerusalem", toursPath: "/tours/jerusalem/" },
  telAviv: { code: "TLV", name: "Tel Aviv", toursPath: "/tours/tel-aviv-jaffa/" },
  haifa: { code: "HFA", name: "Haifa", toursPath: "/tours/caesarea-haifa-acre/" },
} as const;

export type GetYourGuideWidgetCity = keyof typeof getYourGuideWidgetCities;
export type GetYourGuideWidgetPage = "3_day" | "5_day" | "7_day" | "10_day";

export function getYourGuideCityWidgetSrc(city: GetYourGuideWidgetCity, page: GetYourGuideWidgetPage): string {
  const params = new URLSearchParams({
    trs: "406243",
    shmarker: `622032.${page}`,
    iata: getYourGuideWidgetCities[city].code,
    locale: "en-US",
    powered_by: "false",
    campaign_id: "108",
    promo_id: "4040",
  });
  return `https://tpwgt.com/content?${params.toString()}`;
}
