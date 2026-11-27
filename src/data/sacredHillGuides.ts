import {
  mountOlivesAttractionUpdate,
  mountOlivesEditorialUpdate,
} from "@/data/mountOlivesRevision";
import { mountZionAttractionUpdate, mountZionEditorialUpdate } from "@/data/mountZionRevision";
import type { Attraction } from "@/data/attractionGuideTypes";

export type SacredHillId = "mount-zion" | "mount-of-olives";

export type Stop = {
  name: string;
  description: string;
  visit: string;
  tipLabel?: string;
  image?: { src: string; alt: string; credit?: { label: string; url: string; licenseUrl: string } };
  link?: { label: string; url: string };
};
type WalkingRoute = {
  name: string;
  time: string;
  bestFor: string;
  steps: string[];
  note: string;
};
type PracticalNote = { title: string; text: string; links?: { label: string; url: string }[] };
export type SacredHillEditorial = {
  eyebrow: string;
  snapshot: { label: string; value: string }[];
  routeIntro: string;
  routes: WalkingRoute[];
  stopIntro: string;
  stops: Stop[];
  transportIntro: string;
  transport: PracticalNote[];
  practical: PracticalNote[];
  historyTitle: string;
  history: string[];
  hotelNote: string;
  relatedHotel: { text: string; to: string };
};

export const sacredHillOverrides: Record<SacredHillId, Partial<Attraction>> = {
  "mount-zion": mountZionAttractionUpdate,
  "mount-of-olives": mountOlivesAttractionUpdate,
};

export const sacredHillEditorial: Record<SacredHillId, SacredHillEditorial> = {
  "mount-zion": mountZionEditorialUpdate,
  "mount-of-olives": mountOlivesEditorialUpdate,
};
