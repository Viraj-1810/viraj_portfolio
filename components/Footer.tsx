import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-10 sm:flex-row sm:items-center sm:px-6">
        <div>
          <p className="font-bold">{site.name}</p>
          <p className="mt-1 text-sm text-muted">{site.role}</p>
        </div>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
          <li>
            <a className="hover:text-foreground" href={`mailto:${site.email}`}>
              Email
            </a>
          </li>
          {site.socials.github && (
            <li>
              <a
                className="hover:text-foreground"
                href={site.socials.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </li>
          )}
          {site.socials.linkedin && (
            <li>
              <a
                className="hover:text-foreground"
                href={site.socials.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
          )}
          <li>
            <Link className="hover:text-foreground" href="/projects">
              Projects
            </Link>
          </li>
        </ul>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-8 text-xs text-muted sm:px-6">
        © {year} {site.name}. Built with Next.js & Tailwind CSS.
      </div>
    </footer>
  );
}
