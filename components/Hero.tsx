import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-border"
    >
      {/* Generated hero art (decorative; sits behind the gradient scrim). */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src="/images/hero.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-start px-4 py-24 sm:px-6 sm:py-32">
        <p className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-4 py-1.5 text-sm text-muted backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-crimson shadow-[0_0_10px_var(--crimson)]" />
          {site.role}
        </p>

        <h1
          id="hero-heading"
          className="mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl"
        >
          I build <span className="text-gradient">AI products</span> that ship.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted">{site.tagline}</p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-xl bg-crimson px-6 py-3 font-semibold text-white transition-colors hover:bg-crimson-bright"
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
      </div>
    </section>
  );
}
