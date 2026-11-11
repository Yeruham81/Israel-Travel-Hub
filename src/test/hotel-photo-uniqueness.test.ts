import { describe, expect, it } from "vitest";
import { hotelsInCityCatalog, cityHotelPhoto } from "@/data/cityHotelCatalog";
import { resortHotelPhoto, resortHotelPhotos } from "@/data/resortHotelPhotos";
import { supplementalHotelPhotos } from "@/data/supplementalHotelPhotos";
import { deadSeaHotelRecommendations, tiberiasHotelRecommendations, haifaHotelRecommendations } from "@/data/registry";

describe("unique hotel photo mapping across all destinations", () => {
  const cityHotels = [
    ...hotelsInCityCatalog("jerusalem"),
    ...hotelsInCityCatalog("telaviv"),
  ];
  const resortHotels = [
    ...deadSeaHotelRecommendations,
    ...tiberiasHotelRecommendations,
    ...haifaHotelRecommendations,
  ];

  it("has one dedicated image for each of 87 hotel identities, reused only for that same hotel", () => {
    expect(cityHotels).toHaveLength(56);
    expect(resortHotels).toHaveLength(31);
    expect(Object.keys(supplementalHotelPhotos)).toHaveLength(28);
    expect(Object.keys(resortHotelPhotos)).toHaveLength(31);

    const entries = [
      ...cityHotels.map((hotel) => ({ hotelId: hotel.id, image: cityHotelPhoto(hotel) })),
      ...resortHotels.map((hotel) => ({ hotelId: hotel.id, image: resortHotelPhoto(hotel.id) })),
    ];
    expect(entries).toHaveLength(87);
    expect(new Set(entries.map(({ hotelId }) => hotelId)).size).toBe(87);

    const assignedPaths = entries.map(({ image }) => image.src);
    expect(new Set(assignedPaths).size).toBe(87);
    for (const { hotelId, image } of entries) {
      expect(image.src, hotelId).toMatch(/^(\/|https?:\/\/)/);
      expect(image.alt?.length, hotelId).toBeGreaterThan(12);
      expect(image.credit?.length, hotelId).toBeGreaterThan(5);
    }
  });

  it("shares the exact same image for one property between its neighborhood and city card", () => {
    const jlm = hotelsInCityCatalog("jerusalem").find((hotel) => hotel.id === "jlm-ibis")!;
    const telaviv = hotelsInCityCatalog("telaviv").find((hotel) => hotel.id === "tlv-dan")!;
    expect(cityHotelPhoto(jlm)).toBe(cityHotelPhoto(jlm));
    expect(cityHotelPhoto(telaviv)).toBe(cityHotelPhoto(telaviv));
  });

  it("never recycles an unrelated hotel image for a missing hotel identifier", () => {
    expect(() => resortHotelPhoto("unknown-hotel")).toThrow();
    const invalid = { ...cityHotels[0]!, id: "unknown-city-hotel" };
    expect(() => cityHotelPhoto(invalid)).toThrow();
  });
});
