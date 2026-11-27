import { ExternalProviderTourCard } from "@/components/ExternalProviderTourCard";
import { tourBookingOffers, tourProducts } from "@/data/registry";
import { recordOutboundClick } from "@/lib/outbound";

/** Provider metadata and tracking stay independent of the shared visual presentation. */
export function CuratedPartnerTourCard({
  title,
  description,
  platform,
  location,
  duration,
  image,
  alt,
  href,
  productId,
  offerId,
  pageId,
  editorialRating,
  editorialPrice,
}: {
  title: string;
  description: string;
  platform: "Viator" | "GetYourGuide";
  location?: string;
  duration?: string;
  image: string;
  alt: string;
  href: string;
  productId: string;
  offerId: string;
  pageId: string;
  editorialRating?: { value: number; count: number };
  editorialPrice?: {
    amount: number;
    currency: "USD" | "EUR";
    basis: "per_person" | "per_group";
    approximate?: boolean;
  };
}) {
  const product = tourProducts.find((tour) => tour.id === productId);
  const offer = tourBookingOffers.find(
    (entry) =>
      entry.productId === productId &&
      entry.partnerId === (platform === "Viator" ? "viator" : "getyourguide"),
  );
  const price = editorialPrice ?? offer?.listedPrice;
  const rating = editorialRating ?? product?.rating;
  return (
    <ExternalProviderTourCard
      image={image}
      alt={alt}
      platform={platform}
      title={title}
      description={description}
      duration={duration ?? product?.duration}
      location={location}
      rating={rating ? { value: rating.value, count: rating.count } : undefined}
      price={
        price
          ? {
              amount: price.amount,
              currency: price.currency,
              basis: price.basis,
              approximate: editorialPrice?.approximate,
              maxPartySize:
                "maxPartySize" in price && typeof price.maxPartySize === "number"
                  ? price.maxPartySize
                  : undefined,
            }
          : undefined
      }
      href={href}
      onClick={() => recordOutboundClick({ pageId, productId, offerId })}
    />
  );
}
