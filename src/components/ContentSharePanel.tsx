import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Copy, Mail, Share2 } from "lucide-react";
import { CANONICAL_ORIGIN, SITE_NAME } from "@/lib/site";
import {
  contentShareUrl,
  networkShareUrl,
  type PageShareDetails,
  type ShareNetwork,
} from "@/lib/content-sharing";
import "./ContentSharePanel.css";

const networks: readonly { id: ShareNetwork; label: string; icon: ReactNode }[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: (
      <>
        <path d="M20.4 3.5a10 10 0 0 0-15.7 12L3 22l6.6-1.7A10 10 0 0 0 20.4 3.5Z" />
        <path d="M8.4 6.7c-.5 0-1 .7-1 1.5 0 2.9 4.1 7.1 7.3 7.1.8 0 1.7-.7 1.7-1.1l-2.2-1.3-.9 1c-1.7-.5-3.6-2.3-4.1-3.9l1-.9-1.3-2.4Z" />
      </>
    ),
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: (
      <path
        fill="currentColor"
        stroke="none"
        d="M14.2 21v-8.2H17l.4-3.2h-3.2v-2c0-.9.3-1.5 1.6-1.5h1.7V3.2C17.2 3.1 16.3 3 15 3c-2.5 0-4.2 1.5-4.2 4.4v2.2H8v3.2h2.8V21Z"
      />
    ),
  },
  {
    id: "x",
    label: "X",
    icon: (
      <path
        fill="currentColor"
        stroke="none"
        d="M18.9 3H22l-6.8 7.8L23 21h-6.1l-4.8-6.3L6.6 21H3.4l7.2-8.3L3 3h6.3l4.3 5.7L18.9 3Zm-1.1 16.2h1.7L8.3 4.7H6.5l11.3 14.5Z"
      />
    ),
  },
  {
    id: "telegram",
    label: "Telegram",
    icon: (
      <path
        fill="currentColor"
        stroke="none"
        d="M21.4 3.8 18.3 20c-.2 1.1-.8 1.4-1.7.9l-4.8-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.4-5 9-8.1c.4-.3-.1-.5-.6-.2L6.2 13.8 1.4 12.3c-1-.3-1-1 .2-1.4L20.2 3c.9-.3 1.6.2 1.2.8Z"
      />
    ),
  },
  {
    id: "pinterest",
    label: "Pinterest",
    icon: (
      <path
        fill="currentColor"
        stroke="none"
        d="M12 2a10 10 0 0 0-3.6 19.3c0-.8 0-1.8.2-2.7l1.3-5.6s-.3-.7-.3-1.6c0-1.5.9-2.6 2.1-2.6 1 0 1.4.8 1.4 1.7 0 1-.7 2.6-1 4-.3 1.2.6 2.1 1.8 2.1 2.2 0 3.8-2.3 3.8-5.6 0-2.9-2.1-4.9-5-4.9-3.5 0-5.5 2.6-5.5 5.2 0 1 .4 2.1.9 2.7l.2.5-.3 1.1c0 .2-.2.3-.5.2-1.5-.7-2.4-2.7-2.4-4.4C5.1 7.8 7.7 4.5 13 4.5c4.1 0 7.3 2.9 7.3 6.8 0 4.1-2.6 7.4-6.1 7.4-1.2 0-2.3-.6-2.7-1.3l-.7 2.9c-.3 1.1-.9 2.1-1.4 2.9A10 10 0 1 0 12 2Z"
      />
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: (
      <>
        <rect x="3" y="8" width="4" height="13" rx=".3" fill="currentColor" stroke="none" />
        <circle cx="5" cy="4" r="2.2" fill="currentColor" stroke="none" />
        <path
          fill="currentColor"
          stroke="none"
          d="M10 8h4v1.8c.6-1 1.7-2 3.6-2 3.8 0 4.4 2.4 4.4 5.4V21h-4v-7c0-1.7-.2-3-1.9-3-1.9 0-2.1 1.6-2.1 3V21h-4V8Z"
        />
      </>
    ),
  },
  { id: "email", label: "Email", icon: null },
];

function readPageDetails(url: string): PageShareDetails {
  const title =
    document.querySelector("#main h1")?.textContent?.trim() || document.title || SITE_NAME;
  const rawImage = document.querySelector<HTMLMetaElement>('meta[property="og:image"]')?.content;
  let image: string | undefined;
  if (rawImage) {
    try {
      const resolved = new URL(rawImage, url);
      if (resolved.protocol === "https:" || resolved.protocol === "http:") image = resolved.href;
    } catch {
      /* The rest of the sharing choices remain available. */
    }
  }
  return { url, title, ...(image ? { image } : {}) };
}

/** Local UI only: no social SDK, iframe, tracking pixel or cookie is installed. */
export function ContentSharePanel({ pathname }: { pathname: string }) {
  const headingId = useId();
  const url = contentShareUrl(pathname, CANONICAL_ORIGIN);
  const [page, setPage] = useState<PageShareDetails>({ url, title: SITE_NAME });
  const [nativeAvailable, setNativeAvailable] = useState(false);
  const [status, setStatus] = useState("");
  const [manualCopy, setManualCopy] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const manualInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPage(readPageDetails(url));
    setNativeAvailable(typeof navigator.share === "function");
    return () => clearTimeout(resetTimer.current);
  }, [url]);

  useEffect(() => {
    if (manualCopy) {
      manualInput.current?.focus();
      manualInput.current?.select();
    }
  }, [manualCopy]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setManualCopy(false);
      setStatus("Link copied.");
      clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setStatus(""), 3000);
    } catch {
      setManualCopy(true);
      setStatus("Select and copy the page link.");
    }
  }

  async function nativeShare() {
    try {
      await navigator.share({ title: readPageDetails(url).title, url });
    } catch (error) {
      if ((error as { name?: string })?.name !== "AbortError") {
        setManualCopy(true);
        setStatus("Select and copy the page link.");
      }
    }
  }

  return (
    <section className="content-share-shell" data-content-share-panel aria-labelledby={headingId}>
      <div className="content-share-panel">
        <h2 id={headingId}>Share this page</h2>
        <div className="content-share-buttons">
          {networks.map(({ id, label, icon }) => (
            <a
              key={id}
              className={`content-share-button content-share-${id}`}
              href={networkShareUrl(id, page)}
              target={id === "email" ? undefined : "_blank"}
              rel={id === "email" ? undefined : "noopener noreferrer"}
              referrerPolicy="no-referrer"
              aria-label={id === "email" ? "Share by email" : `Share on ${label}`}
            >
              {id === "email" ? (
                <Mail aria-hidden="true" />
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {icon}
                </svg>
              )}
              <span>{label}</span>
            </a>
          ))}
          <button
            className="content-share-button content-share-copy"
            type="button"
            onClick={copyLink}
          >
            <Copy aria-hidden="true" />
            <span>{status === "Link copied." ? "Copied!" : "Copy link"}</span>
          </button>
          {nativeAvailable && (
            <button
              className="content-share-button content-share-native"
              type="button"
              onClick={nativeShare}
            >
              <Share2 aria-hidden="true" />
              <span>Share</span>
            </button>
          )}
        </div>
        {manualCopy && (
          <label className="content-share-manual">
            Page link
            <input
              ref={manualInput}
              value={url}
              readOnly
              onFocus={(event) => event.currentTarget.select()}
            />
          </label>
        )}
        <p className={status ? "content-share-status" : "sr-only"} role="status" aria-live="polite">
          {status}
        </p>
      </div>
    </section>
  );
}
