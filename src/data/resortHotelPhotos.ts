/**
 * Unique, local photo per listed Haifa, Tiberias and Dead Sea property.
 * Files in /images/hotel-cards/ are reused from the publisher's connected
 * image library. Their presence is not proof that they show the named hotel:
 * all cards clearly label these images as illustrative.
 * Never link to a private Google Drive image in public HTML.
 */
import type { HotelIllustration } from "@/data/telAvivHotelPhotos";
import haifaPanorama from "@/assets/haifa/panorama.webp";
import deadSeaBeach from "@/assets/dead-sea/beach.webp";
import deadSeaLandscape from "@/assets/dead-sea/landscape.webp";
import deadSeaSunbeds from "@/assets/dead-sea/sunbeds.webp";

const library = (filename: string, alt: string): HotelIllustration => ({
  src: `/images/hotel-cards/${filename}`,
  alt,
  label: "Illustrative accommodation / area photograph",
  credit: "Photo from the publisher's image library",
});

const local = (src: string, alt: string): HotelIllustration => ({
  src,
  alt,
  label: "Illustrative destination photograph",
  credit: "Photo from the publisher's destination image collection",
});

export const resortHotelPhotos: Record<string, HotelIllustration> = {
  "haifa-botanica": library("haifa-botanica.webp", "Illustrative accommodation photograph for a Haifa hotel"),
  "haifa-dan-carmel": library("haifa-dan-carmel.jpg", "Illustrative hotel view in Haifa"),
  "haifa-schumacher": library("haifa-schumacher.webp", "Illustrative heritage-style hotel view in Haifa"),
  "haifa-colony": library("haifa-colony.webp", "Illustrative hotel view near the German Colony in Haifa"),
  "haifa-crowne-plaza": library("haifa-crowne-plaza.jpg", "Illustrative Haifa hotel image"),
  "haifa-leonardo-plaza": library("haifa-leonardo-plaza.jpg", "Illustrative hotel view near the Haifa waterfront"),
  // The Golden Crown image in the old photo library is also used under a
  // Tiberias filename: use a separate Haifa city panorama rather than
  // displaying the same room photograph for two unrelated properties.
  "haifa-golden-crown": local(haifaPanorama, "Haifa city panorama, illustrative of the hotel location"),
  "haifa-nof": library("haifa-nof.webp", "Illustrative Haifa hotel view"),
  "haifa-port-inn": library("haifa-port-inn.webp", "Illustrative accommodation photograph in Haifa"),
  "haifa-loui-talpiot": library("haifa-loui-talpiot.webp", "Illustrative small-hotel photograph in Haifa"),

  "tib-u-boutique": library("tib-u-boutique.webp", "Illustrative guest room photograph for a Tiberias stay"),
  "tib-galei-kinneret": library("tib-galei-kinneret.webp", "Illustrative Tiberias hotel photograph"),
  "tib-scots": library("tib-scots.webp", "Historic hotel building in Tiberias"),
  "tib-gai-beach": library("tib-gai-beach.webp", "Illustrative family hotel near the Sea of Galilee"),
  "tib-leonardo-club": library("tib-leonardo-club.webp", "Illustrative Tiberias hotel image"),
  "tib-caesar": library("tib-caesar.webp", "Illustrative hotel image in central Tiberias"),
  "tib-sofia": library("tib-sofia.webp", "Illustrative Tiberias hotel image"),
  "tib-emily": library("tib-emily.webp", "Illustrative hotel room in Tiberias"),
  "tib-tiberia": library("tib-tiberia.webp", "Illustrative Tiberias accommodation image"),
  "tib-hostel": library("tib-hostel.webp", "Illustrative hostel interior in Tiberias"),

  "ds-kayma": library("ds-kayma.jpg", "Illustrative hotel and resort image near the Dead Sea"),
  "ds-herods": library("ds-herods.jpg", "Illustrative resort setting on the Dead Sea"),
  "ds-milos": library("ds-milos.jpg", "Illustrative spa hotel image at the Dead Sea"),
  "ds-nevo": library("ds-nevo.jpg", "Illustrative swimming pool and resort scene at the Dead Sea"),
  "ds-oasis": library("ds-oasis.jpg", "Illustrative view of the Dead Sea area"),
  "ds-leonardo-club": local(deadSeaBeach, "Ein Bokek beach near the Dead Sea hotels"),
  "ds-vert": local(deadSeaLandscape, "Aerial landscape of the southern Dead Sea hotel district"),
  "ds-noga": local(deadSeaSunbeds, "Beach loungers near the Dead Sea resort district"),
  "ds-leonardo-plaza": local("/images/attractions/dead-sea.webp", "Dead Sea landscape near the southern hotels"),
  "ds-ein-gedi": library("ds-ein-gedi.jpg", "Nature reserve scenery near Ein Gedi accommodation"),
  "ds-hi-ein-gedi": library("ds-hi-ein-gedi.jpg", "Illustrative hostel accommodation at Ein Gedi"),
};

export function resortHotelPhoto(id: string): HotelIllustration {
  const photo = resortHotelPhotos[id];
  if (!photo) throw new Error(`No unique resort hotel image configured for ${id}`);
  return photo;
}
