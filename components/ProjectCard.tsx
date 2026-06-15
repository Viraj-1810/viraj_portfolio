import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";

/**
 * Reusable project card. The whole card is a single link to the case study
 * (no nested interactive elements), so it's one clean keyboard stop.
 * Used by both the home featured grid and the full /projects grid.
 */
export default function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <article className="group h-full">
      <Link
        href={`/projects/${project.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-crimson-dim hover:shadow-[0_18px_50px_-20px_rgba(225,29,52,0.5)]"
      >
        <div className="relative aspect-video overflow-hidden bg-surface-2">
          <Image
            src={project.cover}
            alt={project.coverAlt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-full border border-border-strong bg-background/70 px-3 py-1 text-xs font-medium backdrop-blur">
            {project.status}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-lg font-bold tracking-tight">{project.name}</h3>
            <span className="shrink-0 text-xs text-muted">{project.year}</span>
          </div>
          <p className="mt-1 text-sm font-medium text-crimson">{project.tagline}</p>
          <p className="mt-3 line-clamp-3 text-sm text-muted">{project.summary}</p>

          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Key technologies">
            {project.tech.slice(0, 4).map((t) => (
              <li
                key={t}
                className="rounded-md border border-border bg-surface-2 px-2 py-0.5 text-xs text-muted"
              >
                {t}
              </li>
            ))}
            {project.tech.length > 4 && (
              <li className="rounded-md px-2 py-0.5 text-xs text-muted">
                +{project.tech.length - 4} more
              </li>
            )}
          </ul>

          <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-foreground">
            View case study
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  );
}
