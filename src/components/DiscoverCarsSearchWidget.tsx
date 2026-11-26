import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { CarFront, MapPin, SlidersHorizontal, ExternalLink } from "lucide-react";
import { ConsentIframe } from "@/components/ConsentIframe";
import { useEffect, useRef, useState } from "react";
import { carRentalAffiliateUrl, DISCOVERCARS_WIDGET_FRAME_SRC } from "@/lib/car-rental-affiliate";
import { recordOutboundClick } from "@/lib/outbound";

export function RentalComparisonLink({ children, className = "", placement }: {
  children: React.ReactNode;
  className?: string;
  placement: string;
}) {
  return <a href={carRentalAffiliateUrl(`/car-rental/${placement}/`)} target="_blank" rel="sponsored noopener noreferrer" className={className}
    onClick={() => recordOutboundClick({ pageId: "/car-rental/", productId: "cars-discovercars", offerId: `cars-discovercars-${placement}` })}>
    {children}
  </a>;
}

/** Remount on consent withdrawal so a fresh opt-in gets a fresh frame and timer. */
function ActiveRentalFrame() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(355);
  const [state, setState] = useState<"loading" | "ready" | "failed">("loading");

  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frameRef.current?.contentWindow) return;
      if (event.data?.type === "itt-discovercars-error") setState("failed");
      if (event.data?.type === "itt-discovercars-height" && Number.isFinite(event.data.height) && event.data.height > 0) {
        setHeight(Math.min(1600, Math.max(100, Math.ceil(event.data.height))));
        setState(previous => previous === "failed" ? previous : "ready");
      }
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, []);
  useEffect(() => {
    if (state !== "loading") return;
    const timer = window.setTimeout(() => setState("failed"), 15000);
    return () => window.clearTimeout(timer);
  }, [state]);

  if (state === "failed") return <p role="status" className="rounded-lg bg-secondary/40 p-4 text-sm">Car search is temporarily unavailable. Use the link below to compare cars directly on DiscoverCars.</p>;
  return <div className="relative min-w-0" aria-busy={state === "loading"}>
    {state === "loading" && <p role="status" className="absolute inset-x-0 top-0 rounded-lg bg-secondary/70 p-3 text-center text-sm">Loading car search…</p>}
    <ConsentIframe category="marketing" ref={frameRef} src={DISCOVERCARS_WIDGET_FRAME_SRC} title="DiscoverCars car rental search"
      loading="eager" width="100%" height={height} className="block w-full border-0"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
      onError={() => setState("failed")} />
  </div>;
}
export function DiscoverCarsSearchWidget() {
  const allowed = useCookieConsent()?.categories.marketing === true;
  const direct = <RentalComparisonLink placement="widget-fallback" className="btn btn-primary min-h-11 w-full sm:w-auto">Compare cars on DiscoverCars <ExternalLink aria-hidden className="size-4 shrink-0"/></RentalComparisonLink>;
  return <div className="mt-5 min-w-0 rounded-2xl border border-primary/20 bg-card p-3 sm:p-5" data-testid="discovercars-search-widget">
    <p className="mb-3 text-sm font-semibold text-foreground">Powered by DiscoverCars</p>
    {allowed ? <><ActiveRentalFrame/><div className="mt-4 border-t pt-4 text-center">{direct}</div></> : <>
      <div className="mb-4 rounded-xl bg-secondary/40 p-4 text-center"><p className="mb-3 text-sm">Find available vehicles for your travel dates.</p>{direct}</div>
      <ConsentIframe category="marketing" src={DISCOVERCARS_WIDGET_FRAME_SRC} title="DiscoverCars car rental search"/>
    </>}
    <div className="mt-4 grid grid-cols-3 gap-2 border-t pt-4 text-center text-xs text-muted-foreground" aria-label="Rental comparison features">
      {[{icon:CarFront,label:"Compare suppliers"},{icon:MapPin,label:"Airport & city pickup"},{icon:SlidersHorizontal,label:"Compare rental terms"}].map(({icon:Icon,label})=><div key={label} className="min-w-0"><Icon className="mx-auto mb-1 size-5 text-primary" aria-hidden/>{label}</div>)}
    </div>
  </div>;
}
