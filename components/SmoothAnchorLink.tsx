"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";

type SmoothAnchorLinkProps = ComponentProps<typeof Link>;

export default function SmoothAnchorLink({ onClick, href, ...props }: SmoothAnchorLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || typeof href !== "string") return;

    const target = new URL(href, window.location.href);
    const isCurrentPageAnchor = target.pathname === window.location.pathname && target.hash;

    if (!isCurrentPageAnchor) return;

    event.preventDefault();
    window.history.pushState(null, "", `${target.pathname}${target.hash}`);
    window.dispatchEvent(new CustomEvent("smooth-scroll-to", { detail: target.hash }));
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
