/** Shared catalog contracts; the records themselves live in registry.ts. */
import type { IndicativePrice } from "@/data/registry";
export const tourPlaces = [
  { id: "jerusalem", label: "Jerusalem" }, { id: "tel-aviv", label: "Tel Aviv & Jaffa" },
  { id: "masada", label: "Masada" }, { id: "dead-sea", label: "Dead Sea" },
  { id: "ein-gedi", label: "Ein Gedi" }, { id: "bethlehem", label: "Bethlehem" },
  { id: "jericho", label: "Jericho" }, { id: "jordan-river", label: "Jordan River" },
  { id: "nazareth", label: "Nazareth" }, { id: "galilee", label: "Sea of Galilee" },
  { id: "caesarea", label: "Caesarea" }, { id: "haifa", label: "Haifa" },
  { id: "akko", label: "Akko (Acre)" }, { id: "eilat", label: "Eilat & Red Sea" },
] as const;
export type TourPlaceId = typeof tourPlaces[number]["id"];
export const tourTags = [
  { id: "heritage", label: "History & heritage" }, { id: "christian", label: "Christian sites" },
  { id: "food", label: "Food & markets" }, { id: "art", label: "Art & architecture" },
  { id: "nature", label: "Nature & scenery" }, { id: "water", label: "On the water" },
] as const;
export type TourTagId = typeof tourTags[number]["id"];
export type TourFormat = "shared" | "private" | "independent";
export type TourLength = "short" | "full-day";
export interface TourProduct {
  id: string;
  status: "published" | "draft";
  operatorId: string;
  originIds: TourPlaceId[];
  destinationIds: TourPlaceId[];
  tagIds: TourTagId[];
  title: string;
  summary: string;
  duration: string;
  /** Total advertised duration; absent for individually agreed private transport. */
  durationMinutes?: number;
  length: TourLength;
  format: TourFormat;
  formatLabel: string;
  pickup: string;
  inclusions: string;
  /** Owner-published transport rate; external listing snapshots belong to booking offers. */
  price?: IndicativePrice & { basis: "per_vehicle" };
  note?: string;
}
export interface TourBookingOffer {
  id: string;
  productId: string;
  partnerId: "getyourguide" | "viator";
  publicUrl: string;
  checkedAt: string;
  listedPrice?: {
    kind: "published_snapshot";
    amount: number;
    currency: "USD";
    basis: "per_person" | "per_group";
    maxPartySize?: number;
    checkedAt: string;
    sourceId: string;
  };
}
