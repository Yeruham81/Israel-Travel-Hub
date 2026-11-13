import { Link as RouterLink, useRouterState } from "@tanstack/react-router";
import type { ComponentProps, MouseEventHandler } from "react";
import { carRentalAffiliateUrl, isCarRentalRoute } from "@/lib/car-rental-affiliate";
import { relFor, recordOutboundClick } from "@/lib/outbound";

/**
 * Sitewide link component: only the temporary car-rental landing destination
 * becomes a DiscoverCars affiliate deep link. Everything else retains native
 * TanStack Router link behavior.
 */
type Props = ComponentProps<typeof RouterLink>;

export function SiteLink(props: Props) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  if (!isCarRentalRoute(props.to)) return <RouterLink {...props} />;

  const onClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    recordOutboundClick({
      pageId: pathname,
      productId: "cars-discovercars",
      offerId: "cars-discovercars",
    });
    props.onClick?.(event);
  };

  return (
    <a
      href={carRentalAffiliateUrl(pathname)}
      target="_blank"
      rel={relFor(true)}
      className={typeof props.className === "string" ? props.className : undefined}
      id={props.id}
      style={props.style}
      title={props.title}
      tabIndex={props.tabIndex}
      aria-label={props["aria-label"]}
      aria-hidden={props["aria-hidden"]}
      onClick={onClick}
    >
      {props.children}
      <span className="sr-only"> (opens in a new tab, sponsored link)</span>
    </a>
  );
}
