import { ConsentIframe } from "@/components/ConsentIframe";
import { useEffect, useRef, useState } from "react";
import { carRentalAffiliateUrl, DISCOVERCARS_WIDGET_FRAME_SRC } from "@/lib/car-rental-affiliate";
import { recordOutboundClick } from "@/lib/outbound";

export function RentalComparisonLink({
  children,
  className = "",
  placement,
}: {
  children: React.ReactNode;
  className?: string;
  placement: string;
}) {
  return (
    <a
      href={carRentalAffiliateUrl(`/car-rental/${placement}/`)}
      target="_blank"
      rel="sponsored noopener noreferrer"
      className={className}
      onClick={() =>
        recordOutboundClick({
          pageId: "/car-rental/",
          productId: "cars-discovercars",
          offerId: `cars-discovercars-${placement}`,
        })
      }
    >
      {children}
    </a>
  );
}

/** Same-origin outer frame isolates the official Travelpayouts provider script. */
export function DiscoverCarsSearchWidget() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(355);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== frameRef.current?.contentWindow
      )
        return;
      if (event.data?.type === "itt-discovercars-error") setFailed(true);
      if (event.data?.type === "itt-discovercars-height" && Number.isFinite(event.data.height)) {
        setHeight(Math.min(1600, Math.max(355, Math.ceil(event.data.height))));
      }
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, []);

  return (
    <div
      className="mt-5 min-w-0 rounded-2xl border bg-card sm:p-5"
      data-testid="discovercars-search-widget"
    >
      <ConsentIframe
        category="marketing"
        ref={frameRef}
        src={DISCOVERCARS_WIDGET_FRAME_SRC}
        title="DiscoverCars car rental search"
        loading="lazy"
        width="100%"
        height={height}
        className="block w-full border-0"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        onError={() => setFailed(true)}
      />
      {failed && (
        <p role="status" className="mt-3 text-sm text-muted-foreground">
          Car rental search is temporarily unavailable. Use the link below to compare prices
          directly on DiscoverCars.
        </p>
      )}
      <p className="mx-3 mt-4 border-t py-4 text-sm leading-relaxed text-muted-foreground sm:mx-0 sm:pb-0">
        <RentalComparisonLink
          placement="widget-fallback"
          className="font-semibold text-primary underline underline-offset-4"
        >
          Compare car rental prices
        </RentalComparisonLink>{" "}
        to explore available vehicles and the rental conditions for your dates.
      </p>
    </div>
  );
}
