import { forwardRef, type IframeHTMLAttributes } from "react";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { openCookieSettings, type OptionalCookieCategory } from "@/lib/cookie-consent";

type Props = IframeHTMLAttributes<HTMLIFrameElement> & { category?: OptionalCookieCategory };
/** No src/srcDoc reaches the browser until its category has been approved. */
export const ConsentIframe = forwardRef<HTMLIFrameElement, Props>(function ConsentIframe(
  { category = "external", src, srcDoc, title, onLoad, ...props }, ref,
) {
  const consent = useCookieConsent();
  const allowed = consent?.categories[category] === true;
  const label = category === "marketing" ? "Booking & marketing" : "External content";
  if (allowed) return <iframe {...props} ref={ref} src={src} srcDoc={srcDoc} title={title} data-cookie-category={category} onLoad={event => { event.currentTarget.contentWindow?.postMessage({ type: "ith-embed-consent", category, allowed: true }, window.location.origin); onLoad?.(event); }} />;
  return <div className="flex min-h-44 w-full flex-col items-center justify-center gap-3 rounded-lg border bg-muted/40 p-5 text-center" data-consent-placeholder={category}>
    <iframe {...props} ref={ref} title={title} hidden style={{ display: "none" }} src={undefined} srcDoc={undefined} data-consent-src={src} data-cookie-category={category} />
    <p className="text-sm text-muted-foreground">{category === "marketing" ? "To use this booking widget, allow Booking & marketing in Cookie settings." : "To view this interactive map, allow External content in Cookie settings."}</p>
    <button type="button" onClick={openCookieSettings} className="rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-secondary" aria-label={"Cookie settings for " + label}>Cookie settings</button>
  </div>;
});
