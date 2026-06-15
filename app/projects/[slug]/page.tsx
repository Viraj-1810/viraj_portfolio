import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CaseStudy from "@/components/CaseStudy";
import VideoEmbed from "@/components/VideoEmbed";
import ContactCTA from "@/components/ContactCTA";
import { getAllSlugs, getProjectBySlug } from "@/lib/projects";
import { site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };

  const title = `${project.name} — ${project.tagline}`;
  return {
    title: project.name,
    description: project.summary,
    openGraph: {
      title,
      description: project.summary,
      type: "article",
      url: `${site.url}/projects/${project.slug}`,
      images: [{ url: project.cover, alt: project.coverAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
      images: [project.cover],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article>
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 pt-12 pb-10 sm:px-6 sm:pt-16">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-foreground"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All projects
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted">
            <span className="rounded-full border border-crimson-dim bg-crimson/10 px-3 py-1 font-medium text-crimson">
              {project.status}
            </span>
            <span>{project.year}</span>
            <span aria-hidden="true">·</span>
            <span>{project.role}</span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            {project.name}
          </h1>
          <p className="mt-3 text-lg text-crimson">{project.tagline}</p>
          <p className="mt-4 max-w-2xl text-muted">{project.summary}</p>

          {/* Links */}
          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border-strong px-4 py-2 text-sm font-semibold transition-colors hover:bg-surface-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.36 9.36 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
                </svg>
                View source
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-crimson px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-crimson-bright"
              >
                Live demo
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}
            {!project.links.github && !project.links.demo && project.links.video && (
              <span className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted">
                Paid product — see the demo below
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Media: demo video (paid product) or cover image */}
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        {project.links.video ? (
          <VideoEmbed src={project.links.video} title={`${project.name} demo video`} />
        ) : (
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-border">
            <Image
              src={project.cover}
              alt={project.coverAlt}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        )}
      </div>

      {/* Tech stack */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="sr-only">Technologies used</h2>
        <ul className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-md border border-border bg-surface px-3 py-1 text-sm text-muted"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* Metrics */}
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {project.metrics.map((m) => (
            <div key={m.label} className="rounded-xl border border-border bg-surface p-4">
              <dd className="text-lg font-bold text-gradient">{m.value}</dd>
              <dt className="mt-1 text-xs text-muted">{m.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      {/* Case study body */}
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        <CaseStudy project={project} />
      </div>

      <ContactCTA />
    </article>
  );
}
