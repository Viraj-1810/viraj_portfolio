import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import SkillsSection from "@/components/SkillsSection";
import ContactCTA from "@/components/ContactCTA";
import { site, experience, certifications, education } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: site.shortBio,
};

const highlights = [
  "Shipped a paid, white-label voice assistant product as a one-click desktop app.",
  "5-star reviews and a 100% completion rate across international freelance clients.",
  "Built RAG systems with FAISS and local HuggingFace embeddings, private and free to run.",
  "Deep-learning experience in medical imaging (ResNet50 plus autoencoder hybrids).",
];

export default function AboutPage() {
  return (
    <>
      <section
        aria-labelledby="about-heading"
        className="mx-auto max-w-3xl px-4 pt-28 sm:px-6 sm:pt-28"
      >
        <SectionHeading
          id="about-heading"
          eyebrow="About"
          title={`Hi, I'm ${site.name}`}
          description={site.role}
        />
        <div className="mt-8 space-y-5 text-muted">
          <p>
            I&apos;m an AI developer who loves turning everyday ideas into
            futuristic tools that feel alive. I build desktop AI assistants,
            automation systems, generative AI apps, and intelligent chatbots
            that work fast, look clean, and run reliably.
          </p>
          <p>
            I&apos;ve shipped everything from AI coding copilots and PDF chat RAG
            systems to traffic prediction apps and custom voice-controlled
            desktop assistants with wake words, themed UIs, and cross-app
            automation. My work blends creativity with solid engineering, so
            clients get tools that feel effortless and genuinely powerful.
          </p>
          <p>
            Recently I delivered Achilles, a white-label voice assistant
            packaged as a one-click desktop app, to a paying client in the US,
            and I keep a 100% completion rate with 5-star reviews across
            international projects.
          </p>
        </div>

        <ul className="mt-10 space-y-3">
          {highlights.map((h) => (
            <li key={h} className="flex gap-3 text-muted">
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson"
              />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Experience */}
      <section
        aria-labelledby="experience-heading"
        className="mx-auto max-w-3xl px-4 py-16 sm:px-6"
      >
        <h2 id="experience-heading" className="text-2xl font-bold tracking-tight">
          Experience
        </h2>
        <ol className="mt-8 space-y-8">
          {experience.map((job) => (
            <li key={`${job.org}-${job.role}`} className="border-l border-border pl-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold">
                  {job.role} · <span className="text-crimson">{job.org}</span>
                </h3>
                <span className="text-sm text-muted">{job.period}</span>
              </div>
              <ul className="mt-3 space-y-2">
                {job.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-muted">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-crimson"
                    />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      {/* Certifications + Education */}
      <section
        aria-labelledby="creds-heading"
        className="mx-auto max-w-3xl px-4 pb-8 sm:px-6"
      >
        <h2 id="creds-heading" className="text-2xl font-bold tracking-tight">
          Certifications &amp; education
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-crimson">
              Certifications
            </h3>
            <ul className="mt-4 space-y-4">
              {certifications.map((c) => (
                <li key={c.name} className="rounded-xl border border-border bg-surface p-4">
                  <p className="font-medium">{c.name}</p>
                  <p className="mt-1 text-sm text-muted">
                    {c.issuer} · {c.date}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-crimson">
              Education
            </h3>
            <ul className="mt-4 space-y-4">
              {education.map((e) => (
                <li key={e.school} className="rounded-xl border border-border bg-surface p-4">
                  <p className="font-medium">{e.degree}</p>
                  <p className="mt-1 text-sm text-muted">{e.school}</p>
                  <p className="text-sm text-muted">{e.location}</p>
                  <p className="mt-2 text-sm text-crimson">{e.period}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SkillsSection />
      <ContactCTA />
    </>
  );
}
