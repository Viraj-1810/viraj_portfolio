import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";

/**
 * Reusable project card. The whole card is a single link to the case study
 * (no nested interactive elements), so it's one clean keyboard stop.
 * `size="large"` is used for the featured grid on the home page.
 */
export default function ProjectCard({
  project,
  priority = false,
  size = "default",
}: {
  project: Project;
  priority?: boolean;
  size?: "default" | "large";
}) {
  const large = size === "large";
  return (
    <article className="group h-full">
      <Link
        href={`/projects/${project.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-crimson hover:shadow-[0_22px_60px_-24px_rgba(0,255,140,0.45)]"
      >
        <div className="relative aspect-video overflow-hidden bg-surface-2">
          <Image
            src={project.cover}
            alt={project.coverAlt}
            fill
            priority={priority}
            sizes={large ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="font-code absolute left-3 top-3 rounded-full border border-border-strong bg-background/70 px-3 py-1 text-xs font-medium backdrop-blur">
            {project.status}
          </span>
        </div>

        <div className={`flex flex-1 flex-col ${large ? "p-6" : "p-5"}`}>
          <div className="flex items-baseline justify-between gap-3">
            <h3 className={`font-bold tracking-tight ${large ? "text-xl" : "text-lg"}`}>
              {project.name}
            </h3>
            <span className="font-code shrink-0 text-xs text-muted">{project.year}</span>
          </div>
          <p className="mt-1 text-sm font-medium text-crimson">{project.tagline}</p>
          <p className={`mt-2.5 text-sm text-muted ${large ? "line-clamp-2" : "line-clamp-3"}`}>
            {project.summary}
          </p>

          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Key technologies">
            {project.tech.slice(0, large ? 5 : 4).map((t) => (
              <li
                key={t}
                className="font-code rounded-md border border-border bg-surface-2 px-2 py-0.5 text-xs text-muted"
              >
                {t}
              </li>
            ))}
            {project.tech.length > (large ? 5 : 4) && (
              <li className="font-code rounded-md px-2 py-0.5 text-xs text-muted">
                +{project.tech.length - (large ? 5 : 4)} more
              </li>
            )}
          </ul>

          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-foreground">
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
