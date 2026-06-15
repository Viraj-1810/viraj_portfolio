import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-border"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left: intro / about me */}
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-code inline-flex items-center gap-2 rounded-full border border-crimson-dim bg-crimson/10 px-4 py-1.5 text-sm font-medium text-crimson">
              <span className="pulse-dot h-2 w-2 rounded-full bg-crimson" />
              Available for work
            </span>
            <span className="font-code inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-4 py-1.5 text-sm text-muted backdrop-blur">
              {site.role}
            </span>
          </div>

          <h1
            id="hero-heading"
            className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-6xl"
          >
            Hi, I&apos;m <span className="text-gradient">Viraj</span>.
          </h1>

          <p className="mt-5 max-w-xl text-lg font-medium text-foreground sm:text-xl">
            {site.tagline}
          </p>
          <p className="mt-4 max-w-xl text-muted">{site.heroBio}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-xl bg-crimson px-6 py-3 font-semibold text-background transition-colors hover:bg-crimson-bright"
            >
              View my work
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-xl border border-border-strong px-6 py-3 font-semibold transition-colors hover:bg-surface-2"
            >
              Get in touch
            </Link>
          </div>

          {/* quick proof row */}
          <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-code text-sm">
            <div>
              <dt className="text-muted">clients</dt>
              <dd className="font-semibold text-crimson">5★ · US &amp; UK</dd>
            </div>
            <div>
              <dt className="text-muted">shipped</dt>
              <dd className="font-semibold text-crimson">Achilles (paid)</dd>
            </div>
            <div>
              <dt className="text-muted">cert</dt>
              <dd className="font-semibold text-crimson">AWS Developer</dd>
            </div>
          </dl>
        </div>

        {/* Right: portrait */}
        <div className="relative mx-auto w-full max-w-sm">
          <div
            aria-hidden="true"
            className="absolute -inset-4 -z-10 rounded-3xl bg-[radial-gradient(circle_at_50%_30%,rgba(0,255,102,0.25),transparent_70%)] blur-2xl"
          />
          <figure className="overflow-hidden rounded-2xl border border-border-strong bg-surface">
            <div className="relative aspect-[5/6]">
              <Image
                src={site.photo}
                alt={`Portrait of ${site.name}`}
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 384px"
                className="object-cover"
              />
            </div>
            <figcaption className="font-code flex items-center justify-between border-t border-border px-4 py-2.5 text-xs text-muted">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-crimson" />
                {site.name}
              </span>
              <span>{site.location.split("·")[0].trim()}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
