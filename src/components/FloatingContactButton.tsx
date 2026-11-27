import { hasCookieConsent } from "@/lib/cookie-consent";
import { useRouterState } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Shared inquiry sections all have a stable id. Require an actual form inside
 * the section so unrelated content and pages without inquiries get no CTA.
 */
const CONTACT_TARGETS =
  "#main #contact, #main #contact-moshe, #main #request-quote, #main [data-contact-form]";

function findContactTarget(): HTMLElement | null {
  return (
    Array.from(document.querySelectorAll<HTMLElement>(CONTACT_TARGETS)).find(
      (element) =>
        element.querySelector("form") && !element.closest("[hidden], [aria-hidden='true']"),
    ) ?? null
  );
}

function recordContactClick(pagePath: string, destination: string) {
  if (!hasCookieConsent("analytics")) return;
  // This emits only when the site has installed its consent-aware analytics.
  // Do not inject an analytics script, GA ID, or personally identifying data.
  const analytics = window as Window & {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
  };
  const properties = { page_path: pagePath, contact_target: destination };
  try {
    if (typeof analytics.gtag === "function") {
      analytics.gtag("event", "floating_contact_click", properties);
    } else if (Array.isArray(analytics.dataLayer)) {
      analytics.dataLayer.push({ event: "floating_contact_click", ...properties });
    }
  } catch {
    // Analytics blockers should never prevent navigation to the inquiry form.
  }
}

/** One global mobile/desktop shortcut, only on pages with an inquiry form. */
export function FloatingContactButton() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [targetId, setTargetId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let target: HTMLElement | null = null;
    let frame = 0;
    let needsDiscovery = false;

    const updateVisibility = () => {
      if (!target?.isConnected) {
        setVisible(false);
        return;
      }

      // Hide once the form enters the lower viewport, and for the entire
      // form/footer after it. No competing button while the form is in use.
      const formTop = target.getBoundingClientRect().top;
      const lowerViewport = Math.min(window.innerHeight * 0.78, window.innerHeight - 120);
      setVisible(window.scrollY > 240 && formTop > lowerViewport);
    };

    const discoverTarget = () => {
      const next = findContactTarget();
      if (next !== target) {
        target = next;
        setTargetId(next?.id || null);
      }
      updateVisibility();
    };

    const schedule = (discover = false) => {
      needsDiscovery = needsDiscovery || discover;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        if (needsDiscovery) {
          needsDiscovery = false;
          discoverTarget();
        } else {
          updateVisibility();
        }
      });
    };

    discoverTarget();
    const content = document.getElementById("main");
    const observer = new MutationObserver(() => schedule(true));
    if (content) observer.observe(content, { childList: true, subtree: true });

    const onScroll = () => schedule();
    const onResize = () => schedule();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  const jumpToForm = () => {
    const target = findContactTarget();
    if (!target) {
      setVisible(false);
      return;
    }
    recordContactClick(pathname, target.id);
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    // Support screen readers and keyboard navigation without interrupting
    // smooth scrolling; the existing scroll-mt-24 offsets the sticky header.
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      data-testid="floating-contact-button"
      aria-label="Contact me — jump to the inquiry form"
      aria-controls={targetId || undefined}
      onClick={jumpToForm}
      className="fixed z-30 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#1766c2] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 hover:bg-[#1053a2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1766c2] motion-safe:transition-colors"
      style={{
        right: "calc(1rem + env(safe-area-inset-right, 0px))",
        bottom:
          "calc(1rem + env(safe-area-inset-bottom, 0px) + var(--floating-contact-bottom-offset, 0px))",
      }}
    >
      <MessageCircle aria-hidden="true" className="h-5 w-5 shrink-0" />
      <span>Contact me</span>
    </button>
  );
}
