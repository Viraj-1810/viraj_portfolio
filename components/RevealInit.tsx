"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Adds a `js` class to <html> (so the reveal CSS only hides content when JS
 * is available) and reveals [data-reveal] elements as they scroll into view.
 * Re-scans on route change. Respects prefers-reduced-motion.
 */
export default function RevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");

    const items = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)"),
    );
    if (items.length === 0) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      items.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
