import { useEffect, useMemo, useRef, useState } from "react";
import { ConsentIframe } from "@/components/ConsentIframe";

/** An isolated document can be destroyed completely when permission is withdrawn. */
export function BookingWidgetFrame({ scriptUrl, title }: { scriptUrl: string; title: string }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(320);
  const [failed, setFailed] = useState(false);
  const html = useMemo(() => {
    const source = scriptUrl.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
    return (
      '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="referrer" content="strict-origin-when-cross-origin"><style>html,body{margin:0;padding:0;background:transparent}iframe{max-width:100%;border:0}</style></head><body><script>const send=()=>parent.postMessage({type:"ith-booking-height",height:Math.ceil(document.body.getBoundingClientRect().height)},parent.location.origin);new ResizeObserver(send).observe(document.body);addEventListener("load",send);addEventListener("error",e=>{if(e.target instanceof HTMLScriptElement)parent.postMessage({type:"ith-booking-error"},parent.location.origin)},true);</script><script async charset="utf-8" src="' +
      source +
      '"></script></body></html>'
    );
  }, [scriptUrl]);
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow)
        return;
      if (event.data?.type === "ith-booking-height" && Number.isFinite(event.data.height))
        setHeight(Math.max(260, Math.min(1600, event.data.height + 12)));
      if (event.data?.type === "ith-booking-error") setFailed(true);
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, []);
  return (
    <>
      <ConsentIframe
        ref={frame}
        category="marketing"
        title={title}
        srcDoc={html}
        loading="lazy"
        height={height}
        className="w-full border-0"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
      />
      {failed && (
        <p role="status" className="mt-2 text-sm text-muted-foreground">
          Online booking is temporarily unavailable through this widget.
        </p>
      )}
    </>
  );
}
