"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = {
  href: string;
  label: string;
  icon: React.ReactNode;
  match: (path: string) => boolean;
  accent?: boolean;
};

const I = {
  home: (
    <path d="M3 11.5 12 4l9 7.5M5 10v10h5v-6h4v6h5V10" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  ),
  projects: (
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  ),
  about: (
    <>
      <circle cx="12" cy="8" r="3.4" strokeWidth="1.8" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  contact: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" strokeWidth="1.8" />
      <path d="m4 7 8 6 8-6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

const items: Item[] = [
  { href: "/", label: "Home", icon: I.home, match: (p) => p === "/" },
  { href: "/projects", label: "Projects", icon: I.projects, match: (p) => p.startsWith("/projects") },
  { href: "/about", label: "About", icon: I.about, match: (p) => p.startsWith("/about") },
  { href: "/#contact", label: "Contact", icon: I.contact, match: () => false, accent: true },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed left-1/2 top-4 z-50 -translate-x-1/2"
    >
      <ul className="flex items-center gap-1 rounded-full border border-border-strong bg-surface/70 p-1.5 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.7)] backdrop-blur-xl">
        {items.map((item) => {
          const active = item.match(pathname);
          return (
            <li key={item.href} className="group relative">
              <Link
                href={item.href}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
                  active
                    ? "bg-crimson/15 text-crimson"
                    : item.accent
                      ? "text-crimson hover:bg-crimson/15"
                      : "text-muted hover:bg-surface-2 hover:text-foreground"
                }`}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                  {item.icon}
                </svg>
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-crimson shadow-[0_0_8px_var(--crimson)]"
                  />
                )}
              </Link>
              {/* tooltip */}
              <span
                role="tooltip"
                className="font-code pointer-events-none absolute left-1/2 top-[120%] -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-surface px-2 py-1 text-xs text-foreground opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
              >
                {item.label}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
