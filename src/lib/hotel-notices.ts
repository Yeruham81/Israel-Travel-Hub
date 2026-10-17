import type { HotelRecommendation } from "@/data/registry";
import { israelNow } from "@/lib/israel-time";

/** Stop showing a dated operating notice after its final day in Israel. */
export function activeHotelNotice(hotel: HotelRecommendation, at: Date = new Date()) {
  const notice = hotel.operatingNotice;
  return notice && israelNow(at).date <= notice.expiresOn ? notice : undefined;
}
